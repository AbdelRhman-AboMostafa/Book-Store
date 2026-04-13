<template>
  <div class="form-container">
    <h2 class="form-title">📚 Add New Book</h2>

    <form @submit.prevent="submit" class="book-form">
      <!-- ID -->
      <div class="mb-3">
        <label for="id" class="form-label">ID</label>
        <small class="text-danger" style="visibility: hidden;"></small>
        <input v-model="book.id" id="id" type="text" class="form-control" required />
      </div>

      <!-- Title -->
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input v-model="book.title" id="title" type="text" class="form-control" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Author Id -->
      <div class="mb-3">
        <label for="authorId" class="form-label">Author ID</label>
        <input v-model.number="book.authorId" id="authorId" type="number" class="form-control" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Year -->
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input v-model.number="book.year" id="year" type="number" class="form-control" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Tags -->
      <div class="mb-3">
        <label for="tags" class="form-label">Tags</label>
        <input v-model="tagsInput" id="tags" type="text" class="form-control" placeholder="e.g. fiction, drama" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Cover URL -->
      <div class="mb-3">
        <label for="coverUrl" class="form-label">Cover URL</label>
        <input v-model="book.coverUrl" id="coverUrl" type="url" class="form-control" placeholder="https://example.com/image.jpg" />
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Description -->
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea v-model="book.description" id="description" class="form-control" rows="3"></textarea>
        <small class="text-danger" style="visibility: hidden;"></small>
      </div>

      <!-- Created At -->
      <div class="mb-3">
        <label for="createdAt" class="form-label">Created At</label>
        <input v-model="book.createdAt" id="createdAt" type="date" class="form-control" />
      </div>

      <!-- Updated At -->
      <div class="mb-3">
        <label for="updatedAt" class="form-label">Updated At</label>
        <input v-model="book.updatedAt" id="updatedAt" type="date" class="form-control" />
      </div>

      <!-- Submit -->
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Add Book</button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useBookStore } from '@/components/Stores/bookStore'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// Router
const router = useRouter()

// Reactive form data
const book = reactive({
  id: '',
  title: '',
  authorId: '',
  year: '',
  tags: [],
  coverUrl: '',
  description: '',
  createdAt: '',
  updatedAt: '',
})

const tagsInput = ref('')
const isSubmitting = ref(false)
const bookStore = useBookStore()
const { booksList: books } = storeToRefs(bookStore)

// Validation regex
const idValidation = /^[1-9][0-9]*$/ 
const titleValidation = /^.{3,100}$/
const yearValidation = /^(18[0-9]{2}|19[0-9]{2}|20[0-9]{2}|202[0-5])$/
const tagValidation = /^.{2,20}$/
const coverUrlValidation = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i
const descriptionValidation = /^.{0,2000}$/

async function validateAuthorId(authorId) {
  try {
    const res = await fetch(`http://localhost:3000/authors/${authorId}`)
    return res.status === 200
  } catch {
    return false
  }
}

function validateTags(tags) {
  if (!Array.isArray(tags)) return false
  if (tags.length > 8) return false
  return tags.every(tag => tagValidation.test(tag.trim()))
}

function validateDuplicateId(id, booksArray) {
  const arr = booksArray?.value || booksArray || []
  return !arr.some(b => String(b.id) === String(id))
}

function validateDuplicateTitle(title, authorId, booksArray) {
  const arr = booksArray?.value || booksArray || []
  return !arr.some(
    b =>
      String(b.title).trim().toLowerCase() === String(title).trim().toLowerCase() &&
      String(b.authorId) === String(authorId)
  )
}

function showError(id, message) {
  const element = document.querySelector(`#${id}`)?.nextElementSibling
  if (element) {
    element.style.visibility = 'visible'
    element.innerText = message
  }
}

async function validateBookForm(book, booksArray, isEdit = false) {
  let isValid = true
  const booksList = booksArray?.value || booksArray || []

  // تحويل كل القيم لـ string قبل التحقق
  const idStr = String(book.id)
  const titleStr = String(book.title)
  const authorIdStr = String(book.authorId)
  const yearStr = String(book.year)
  const coverUrlStr = String(book.coverUrl)
  const descriptionStr = String(book.description)

  // ID validation
  if (!idValidation.test(idStr)) {
    showError('id', 'ID must be a positive number')
    isValid = false
  } else if (!isEdit && !validateDuplicateId(idStr, booksList)) {
    showError('id', 'This ID already exists')
    isValid = false
  }

  // Title validation
  if (!titleValidation.test(titleStr)) {
    showError('title', 'Title must be 3–100 characters')
    isValid = false
  } else if (!isEdit && !validateDuplicateTitle(titleStr, authorIdStr, booksList)) {
    showError('title', 'This book already exists for this author')
    isValid = false
  }

  // Author validation
  if (!(await validateAuthorId(authorIdStr))) {
    showError('authorId', 'Author does not exist')
    isValid = false
  }

  // Year validation
  if (!yearValidation.test(yearStr)) {
    showError('year', `Year must be between 1800 and ${new Date().getFullYear()}`)
    isValid = false
  }

  // Tags validation
  if (!validateTags(book.tags)) {
    showError('tags', 'Tags must be 0–8 items, each 2–20 chars')
    isValid = false
  }

  // Cover URL validation
  if (!coverUrlValidation.test(coverUrlStr)) {
    showError('coverUrl', 'Invalid image URL')
    isValid = false
  }

  // Description validation
  if (!descriptionValidation.test(descriptionStr)) {
    showError('description', 'Description must be ≤ 2000 characters')
    isValid = false
  }

  return isValid
}

async function submit() {
  book.tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
  book.id = String(book.id)
  book.title = String(book.title)
  book.authorId = (book.authorId)
  book.year = (book.year)
  book.coverUrl = String(book.coverUrl)
  book.description = String(book.description)
  book.createdAt = String(book.createdAt)
  book.updatedAt = String(book.updatedAt)

  if (!(await validateBookForm(book, books))) return

  isSubmitting.value = true
  await bookStore.addBook({ ...book })
  isSubmitting.value = false

  alert('Book added successfully!')
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
