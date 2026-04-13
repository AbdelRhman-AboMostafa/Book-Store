<script setup>
import { useBookStore } from '@/components/Stores/bookStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import AdminBookRow from './adminBookRow.vue';
import { useAuthorStore } from '@/components/Stores/autherStore';


// get Store
const bookStore = useBookStore()
const {booksList : books , isloading :isloading } = storeToRefs(bookStore)

const authorStore = useAuthorStore()
const {authorList :authors} = storeToRefs(authorStore)

// define Ref Variable
const error = ref(null);
const author = ref({});

// delete book By id 
async function handelDelete(id) {
    if (id) {
        error.value = null
        await bookStore.deleteBookById(id)
    }else{
        error.value = "there is something wronge with id"
    }
} 


// fetch all books
onMounted( async()=>{
    await bookStore.fetchBooks()
    await authorStore.fetchAuthers()
})

// get Author Name
function getAuthorName(authorId) {
  const author = authors.value.find(a => Number(a.id) === Number(authorId));
  return author ? author.name : 'Unkown';
}

</script>

<template>
<!--  start page -->

    <div class="container my-5 ">
        <h1 class="mb-4">📊 All Books</h1>

        <div class="row g-4">
            <div class="col-12 ">
            <div class="card text-center shadow-sm border-0">
                <div class="card-body">
                <router-link to="/books"><h5 class="card-title">📚 Books</h5></router-link>
                </div>
            <router-link to="/bookForm" class="btn btn-primary p-3 ">Creat Book</router-link>
            </div>
            </div>
        </div>
    </div>

    <div v-if="isloading">
        <h5 class="text-center">Loading.......</h5>
    </div>

    <div v-else-if="books.length" class="table-responsive">
        <table class="table table-success table-striped-columns">
        <thead>
            <td>ID</td>
            <td>Title</td>
            <td>Author name</td>
            <td>Year</td>
            <td>Edit</td>
            <td>Delete</td>
        </thead>
        <tbody>
            <AdminBookRow
            v-for="(book , index) in books"
            :key="book.id"
            :book="book"
            :authorName="getAuthorName(book.authorId)"
            @deleteBook="handelDelete"
            />
        </tbody>
    </table>
    </div>

    <div v-else-if="error">
        <h5 class="alert alert-danger text-center">{{error}}</h5>
    </div>
    


</template>

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
