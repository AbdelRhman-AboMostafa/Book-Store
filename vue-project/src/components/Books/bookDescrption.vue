<template>
    
  <div v-if="book && !isloading" class="container des row gap-4 mt-4">
        <div class="col-12 col-sm-9 col-md-5 ">
            <img :src="book.coverUrl" alt="Book cover" class="img-fluid mb-3" style="max-width:300px;">
        </div>
        <div class="col-12 col-sm-9 col-md-5"> 
            <h2><strong>Title:</strong>{{ book.title }}</h2>
            <p>{{ book.description }}</p>
            <p><strong>Author Name:</strong> {{ authorObject.name }}</p>
            <p><strong>Year:</strong> {{ book.year }}</p>
            <p><strong>Tags:</strong>  {{ book.tags ? book.tags.join(', ') : 'No tags' }}</p>
          </div>          
        </div>

  <div v-else-if="isloading" class="container mt-4">
    <p>Loading book details...</p>
  </div>

  <div v-else class="container mt-4">
    <p>Book not found</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useBookStore } from '../Stores/bookStore'
import { storeToRefs } from 'pinia'

const route = useRoute()
const bookId = Number(route.params.id)

const bookStore = useBookStore()
const { newBook: book, author: authorObject, isloading } = storeToRefs(bookStore)

onMounted(async () => {
  await bookStore.fetchBookById(bookId)
  if (book.value && book.value.authorId) {
    await bookStore.fetchAuthor(book.value.authorId)
  }
})
</script>
<style scoped>
.des {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 20px auto;
  padding: 20px;
  flex-wrap: wrap;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-in-out;
}

.des img {
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4);
  width: 75%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.des img:hover {
  transform: scale(1.05);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.5);
}

.des div:nth-child(2) {
  text-align: start;
  padding: 10px;
  margin: 20px;
  animation: slideUp 0.6s ease-in-out;
}

.des h2, .des p {
  transition: color 0.3s ease;
}

.des h2:hover, .des p:hover {
  color: #007bff;
}

/* Animation Keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>