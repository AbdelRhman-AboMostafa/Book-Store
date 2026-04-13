<script setup>
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useBookStore } from '../Stores/bookStore';
import { useAuthorStore } from '../Stores/autherStore';

const bookStore = useBookStore();
const authorStore = useAuthorStore();

const { booksList :books } = storeToRefs(bookStore);
const { authorList:authorList } = storeToRefs(authorStore);

onMounted(async () => {
  await bookStore.fetchBooks();
  await authorStore.fetchAuthers();
});
</script>

<template>
  <div class="container my-5">
    <h1 class="mb-4">📊 Dashboard Overview</h1>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card text-center shadow-sm border-0">
          <div class="card-body">
            <router-link to="/books"><h5 class="card-title">📚 Books</h5></router-link>
            <p class="display-5 fw-bold">{{ books.length }}</p>
          </div>
        <router-link to="/adminBookView" class="btn btn-primary p-3 ">Book Admin </router-link>
          
        </div>
      </div>

      <div class="col-md-6">
        <div class="card text-center shadow-sm border-0">
          <div class="card-body">
            <router-link to="/authors"><h5 class="card-title">✍️ Authors</h5></router-link>
            <p class="display-5 fw-bold">{{ authorList.length }}</p>
          </div>
      <router-link to="/adminAuthorView" class="btn btn-primary p-3">Author Admin </router-link>

        </div>
      </div>
    </div>
  </div>
</template>
