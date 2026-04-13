<script setup>

// import Files
import { storeToRefs } from 'pinia';
import { useAuthorStore } from '../Stores/autherStore';
import { ref } from 'vue';

// define Store

const authorStore = useAuthorStore()
const{newAuthor : author} = storeToRefs(authorStore);

// define Emit
const emit = defineEmits(['search'])

// define Ref Variable
const searchInput = ref('');
const isLoading = ref(false);
const error = ref(null);

// define onSearch Function

async function onSearch(e) {
    e.preventDefault();
    if (searchInput.value.trim()) {
        isLoading.value = true;
        error.value = null;
        try {
            if (searchInput.value) {
                    emit("search", searchInput.value)
                    searchInput.value = ''
                } else {
                    error.value = 'Author not found'
                }
        } catch (error) {
            error.value = 'An error occurred while searching. Please try again.'
        }
        finally {
                isLoading.value = false
            }
    }else {
        alert('Please enter an author name')
    }

} 

</script>

<template>
    <div class="cont">
        <div>
            <h1>All Authors</h1>
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