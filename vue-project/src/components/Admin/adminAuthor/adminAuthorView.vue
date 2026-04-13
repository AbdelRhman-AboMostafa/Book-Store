<template>
<!--  start page -->

    <div class="container my-5 ">
        <h1 class="mb-4">📊 All Authors</h1>

        <div class="row g-4">
            <div class="col-12 ">
            <div class="card text-center shadow-sm border-0">
                <div class="card-body">
                <router-link to="/authors"><h5 class="card-title">✍️  Authors</h5></router-link>
                </div>
            <router-link to="/authorForm" class="btn btn-primary p-3 ">Creat Author</router-link>
            </div>
            </div>
        </div>
    </div>

    <div v-if="isloading">
        <h5 class="text-center">Loading.......</h5>
    </div>

    <div v-else-if="authors.length" class="table-responsive">
        <table class="table table-success table-striped-columns">
        <thead>
            <td>ID</td>
            <td>Name</td>
            <td>Bio</td>
            <td>Edit</td>
            <td>Delete</td>
        </thead>
        <tbody>
            <AdminAuthorRow
            v-for="(author , index) in authors"
            :key="author.id"
            :author="author"
            @deleteAuthor="handelDelete"
            />
        </tbody>
    </table>
    </div>

    <div v-else-if="error">
        <h5 class="alert alert-danger text-center">{{error}}</h5>
    </div>
    


</template>
<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useAuthorStore } from '@/components/Stores/autherStore';
import AdminAuthorRow from './adminAuthorRow.vue';


// get Store
const authorStore = useAuthorStore()
const {authorList :authors , isLoading:isloading} = storeToRefs(authorStore)

// define Ref Variable
const error = ref(null);


// delete book By id 
async function handelDelete(id) {
    if (id) {
        error.value = null
        await authorStore.deleteAuthorById(id)
    }else{
        error.value = "there is something wronge with id"
    }
} 


// fetch all authors
onMounted( async()=>{
    await authorStore.fetchAuthers()
})

</script>

<style scoped>
.container {
  max-width: 1200px;
}

.table {
  border-radius: 10px;
  overflow: hidden;
}

h1 {
  font-weight: bold;
  text-align: center;
}

.text-center {
  font-size: 1.2rem;
}

.card {
  border-radius: 12px;
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: translateY(-5px);
}


.btn-primary {
  border-radius: 8px;
  font-size: 1rem;
}


.table-responsive {
  margin-top: 20px;
}


thead td {
  font-weight: bold;
  background-color: #198754 !important;
  color: white;
}


@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .btn-primary {
    font-size: 0.9rem;
    padding: 8px 12px;
  }

  .card-body h5 {
    font-size: 1rem;
  }

  .table {
    font-size: 0.85rem;
  }
}

</style>