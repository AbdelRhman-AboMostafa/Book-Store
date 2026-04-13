<template>
  <div class="container mt-4">
    <h2>Edit Author</h2>
    <form @submit.prevent="updateRecentAuthor" novalidate>
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input type="number" v-model="author.id" id="id" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input 
          type="text" 
          v-model="author.name" 
          id="name" 
          class="form-control"
          required
          minlength="2"
          maxlength="60"
        />
      </div>

      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea 
          v-model="author.bio" 
          id="bio" 
          class="form-control"
          maxlength="800"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="avatarUrl" class="form-label">Avatar URL</label>
        <input 
          type="url" 
          v-model="author.avatarUrl" 
          id="avatarUrl" 
          class="form-control"
          pattern="https?://.+"
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Updating...' : 'Update Author' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthorStore } from '@/components/Stores/autherStore'

const route = useRoute()
const router = useRouter()
const authorStore = useAuthorStore()
const {authorList : authors } = storeToRefs(authorStore)

const author = reactive({
  id: 0,
  name: '',
  bio: '',
  avatarUrl: ''
})

const isSubmitting = ref(false)

onMounted(async () => {
  const id = Number(route.params.id)
  if (isNaN(id)) {
    alert('Invalid author ID!')
  } else {
    await authorStore.fetchAuthers()
    const existingAuthor = authors.value.find(a => String(a.id) === String(id))
    if (!existingAuthor) {
      alert('Author not found!')
      router.push('/admin')
      return
    }
    Object.assign(author, existingAuthor)
  }
})

async function updateRecentAuthor() {
  // Validation
  if (author.name.trim().length < 2 || author.name.trim().length > 60) {
    alert('Name must be between 2 and 60 characters.')
    return
  }
  if (author.bio && author.bio.length > 800) {
    alert('Bio cannot exceed 800 characters.')
    return
  }
  if (author.avatarUrl && !/^https?:\/\/.+/.test(author.avatarUrl)) {
    alert('Please enter a valid URL.')
    return
  }

  isSubmitting.value = true
  await authorStore.updateAuthor({ ...author })
  isSubmitting.value = false

  alert('Author updated successfully!')
  router.push('/adminAuthorView')
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.form-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  color: #0d6efd;
}

.book-form .form-label {
  font-weight: bold;
}

.book-form .form-control {
  transition: all 0.3s ease;
}

.book-form .form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 5px rgba(13, 110, 253, 0.5);
}

.btn-primary {
  background: linear-gradient(90deg, #0d6efd, #0dcaf0);
  border: none;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  left: 42%;
}

.btn-primary:hover {
  transform: scale(1.03);
}
</style>
