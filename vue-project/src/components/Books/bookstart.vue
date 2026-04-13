<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthorStore } from '../Stores/autherStore'




const authorStore = useAuthorStore()
const{newAuthor:author} = storeToRefs(authorStore)


const searchInput = ref('')
const isLoading = ref(false)
const error = ref(null)

const emit = defineEmits(['Search'])

async function onSearch(e) {
    e.preventDefault()
    if (searchInput.value.trim()) {
        isLoading.value = true
        error.value = null
        try {
            await authorStore.fetchAuthorByName(searchInput.value.trim())
            if (author.value && author.value.id) {
                emit("Search", author.value.id)
                searchInput.value = ''
            } else {
                error.value = 'Author not found'
            }
        } catch (err) {
            error.value = 'An error occurred while searching. Please try again.'
        } finally {
            isLoading.value = false
        }
    } else {
        alert('Please enter an author name')
    }
}
</script>

<template>
    <div class="cont">
        <div>
            <h1>All Books</h1>
        </div>
        <div>
            <form @submit="onSearch">
                <input 
                    v-model="searchInput" 
                    type="search" 
                    placeholder="Search by author name" 
                    aria-label="Search for an book by auther name"
                    :disabled="isLoading"
                >
                <button type="submit" :disabled="isLoading" aria-label="Search for author">Search</button>
            </form>
            <p v-if="isLoading">Loading...</p>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </div>
</template>

<style scoped>
.cont {
    text-align: center;
    padding: 10px;
    margin: 10px auto;
}
.cont div:nth-child(2) {    
    display: flex;
    justify-content: flex-end;
}
.cont div:nth-child(2) button, .cont div:nth-child(2) input {
    padding: 5px;
    border-radius: 5px;
    border: none;
    margin: 2px;
    box-shadow: 1px 1px 5px rgb(119, 153, 197), -1px -1px 5px rgb(119, 153, 197);
}
.error {
    color: red;
}
</style>