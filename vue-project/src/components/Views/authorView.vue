<script setup>
import { storeToRefs } from 'pinia';
import AuthorStart from '../Aouthers/ِauthorStart.vue';
import { useAuthorStore } from '../Stores/autherStore';
import { onMounted, ref } from 'vue';
import AuthorCard from '../Aouthers/authorCard.vue';

// define Store
const authorStore = useAuthorStore()
const{ authorList : authors , isLoading :isloading } = storeToRefs(authorStore)
const error = ref(null);

// search Function
const search = async (name) => {
    try {
        error.value = null;
        await authorStore.getAuthorByName(name)
        if (!authors.value.length) {
            error.value = 'No Author found ';
        }
    } catch (error) {
        error.value = 'Failed to search for this Author. Please try again.';
        
    }
}

// Load all Authors when the component mounts
onMounted(async () => {
    try {
        await authorStore.fetchAuthers();
    } catch (err) {
        error.value = 'Failed to load books. Please try again.';
    } finally {
        isloading.value = false;
    }
});


</script>

<template>
    <div class="container my-4">
        <AuthorStart @search="search"/>
        <div v-if="isloading" class="text-center my-4" >
            <p>Loading....</p>            
        </div>
        <div v-else-if="error" class="text-center my-4 text-danger">
            <p>{{ error }}</p>
        </div>
        <div v-else-if="authors.length" class="row g-3" aria-label="Author list">
            <AuthorCard
                v-for="author in authors"
                :key="author.id"
                :author="author"
                class="col-12 col-sm-6 col-md-4 col-lg-3"
            />
        </div>
        <div v-else class="text-center my-4">
            <p>No authors available</p>
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