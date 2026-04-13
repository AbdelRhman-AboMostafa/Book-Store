<script setup>
import { storeToRefs } from 'pinia';
import { useBookStore } from '../Stores/bookStore';
import { onMounted, ref } from 'vue';
import BookCard from '../Books/bookCard.vue';
import BookStart from '../Books/bookstart.vue';

// Get the store
const bookStore = useBookStore();
const { booksList: books } = storeToRefs(bookStore);
const isLoading = ref(true);
const error = ref(null);

// Search function based on author ID
const search = async (id) => {
    try {
        error.value = null;
        await bookStore.fetchBookByAuthorId(id);
        if (!books.value.length) {
            error.value = 'No books found for this author';
        }
    } catch (err) {
        error.value = 'Failed to fetch books. Please try again.';
    }
};

// Load all books when the component mounts
onMounted(async () => {
    try {
        await bookStore.fetchBooks();
    } catch (err) {
        error.value = 'Failed to load books. Please try again.';
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="container my-4">
        <BookStart @Search="search" />
        <div v-if="isLoading" class="text-center my-4">
            <p>Loading...</p>
        </div>
        <div v-else-if="error" class="text-center my-4 text-danger">
            <p>{{ error }}</p>
        </div>
        <div v-else-if="books.length" class="row g-3" aria-label="Book list">
            <BookCard
                v-for="book in books"
                :key="book.id"
                :book="book"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
            />
        </div>
        <div v-else class="text-center my-4">
            <p>No books available</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    margin-top: 2rem;
}
.text-danger {
    color: red;
}
</style>
