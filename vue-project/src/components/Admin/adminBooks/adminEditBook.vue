<template>
  <div class="container mt-4">
    <h2>Edit Book</h2>
    <form @submit.prevent="updateRecentBook">
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input type="text" v-model="book.id" id="id" class="form-control" readonly />
      </div>

      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" v-model="book.title" id="title" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="authorId" class="form-label">Author ID</label>
        <input type="number" v-model="book.authorId" id="authorId" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input type="number" v-model="book.year" id="year" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="tags" class="form-label">Tags (comma separated)</label>
        <input type="text" v-model="tagsInput" id="tags" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="coverUrl" class="form-label">Cover URL</label>
        <input type="text" v-model="book.coverUrl" id="coverUrl" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="book.description" id="description" class="form-control"></textarea>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Updating...' : 'Update Book' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookStore } from '@/components/Stores/bookStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()
const {booksList :books} = storeToRefs(bookStore)

const book = reactive({
  id: '',
  title: '',
  authorId: 0,
  year: '',
  tags: [],
  coverUrl: '',
  description: ''
})
const tagsInput = ref('')
const isSubmitting = ref(false)

onMounted(async() => {
    const id = Number(route.params.id)
    if (isNaN(id)) {
        alert('Invalid book ID!')
    } else {
        await bookStore.fetchBooks()
        const existingBook =books.value.find(b => String(b.id) === String(id))
        if (!existingBook) {
            alert('Book not found!')
            router.push('/admin')
            return
        }
        Object.assign(book, existingBook)
        tagsInput.value = book.tags.join(', ')
    }

})

async function updateRecentBook() {
  book.tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t)

  isSubmitting.value = true
  await bookStore.updateBook({ ...book }) 
  isSubmitting.value = false

  alert('Book updated successfully!')
  router.push('/adminBookView')
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
