<template>
  <div class="form-container">
    <h2 class="form-title">✍ Add New Author</h2>

    <form @submit.prevent="submit" class="author-form">
      <!-- ID -->
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <input v-model="author.id" id="id" type="text" class="form-control" required />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input v-model="author.name" id="name" type="text" class="form-control" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Bio -->
      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea v-model="author.bio" id="bio" class="form-control" rows="3"></textarea>
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Avatar URL -->
      <div class="mb-3">
        <label for="avatarUrl" class="form-label">Avatar URL</label>
        <input v-model="author.avatarUrl" id="avatarUrl" type="url" class="form-control" placeholder="https://example.com/image.jpg" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Created At -->
      <div class="mb-3">
        <label for="createdAt" class="form-label">Created At</label>
        <input v-model="author.createdAt" id="createdAt" type="date" class="form-control" />
      </div>

      <!-- Updated At -->
      <div class="mb-3">
        <label for="updatedAt" class="form-label">Updated At</label>
        <input v-model="author.updatedAt" id="updatedAt" type="date" class="form-control" />
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Add Author</button>
    </form>
  </div>
</template>

<script setup>
import { useAuthorStore } from '@/components/Stores/autherStore'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const authorStore = useAuthorStore()
const{authorList:authors}=storeToRefs(authorStore)

const author = reactive({
  id: '',
  name: '',
  bio: '',
  avatarUrl: '',
  createdAt: '',
  updatedAt: ''
})

const isSubmitting = ref(false)

onMounted(async()=>{
    await authorStore.fetchAuthers()
})

// Validation regex
const idValidation = /^[1-9][0-9]*$/
const nameValidation = /^.{3,50}$/
const bioValidation = /^.{0,2000}$/
const avatarUrlValidation = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i

function validateDuplicateId(id, authors) {
  if (!Array.isArray(authors)) return true
  return !authors.some(a => String(a.id) === String(id))
}


function validateDuplicateName(name, authors) {
  if (!Array.isArray(authors)) return true
  return !authors.some(a => a.name.trim().toLowerCase() === name.trim().toLowerCase())
}


function showError(id, message) {
  const element = document.querySelector(`#${id}`).nextElementSibling
  if (element) {
    element.style.visibility = 'visible'
    element.innerText = message
  }
}

async function validateAuthorForm(author, authors, isEdit = false) {
  let isValid = true

  if (!idValidation.test(author.id.toString())) {
    showError('id', 'ID must be a positive number')
    isValid = false
  } else if (!isEdit && !validateDuplicateId(author.id, authors)) {
    showError('id', 'This ID already exists')
    isValid = false
  }

  if (!nameValidation.test(author.name)) {
    showError('name', 'Name must be 3–50 characters')
    isValid = false
  } else if (!isEdit && !validateDuplicateName(author.name, authors)) {
    showError('name', 'This author already exists')
    isValid = false
  }

  if (!bioValidation.test(author.bio)) {
    showError('bio', 'Bio must be ≤ 2000 characters')
    isValid = false
  }

  if (!avatarUrlValidation.test(author.avatarUrl)) {
    showError('avatarUrl', 'Invalid image URL')
    isValid = false
  }

  return isValid
}

async function submit() {
  const authors = authorStore.authors
  if (!(await validateAuthorForm(author, authors))) {
    return
  }

  isSubmitting.value = true
  await authorStore.addAuthor({ ...author })
  isSubmitting.value = false

  alert('Author added successfully!')
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

