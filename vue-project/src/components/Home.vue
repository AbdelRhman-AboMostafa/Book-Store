<script setup>
import { storeToRefs } from 'pinia';
import { useBookStore } from './Stores/bookStore';
import { onMounted } from 'vue';
import { useAuthorStore } from './Stores/autherStore';


defineProps({
  books:Array,
  authors:Array,
})

const bookStore = useBookStore()
const {threeBooks : books} = storeToRefs(bookStore)

const authorStore = useAuthorStore()
const {fourAuthors : authors} = storeToRefs(authorStore)


onMounted(()=>{
  bookStore.fetch3Books();
})
onMounted(()=>{
  authorStore.fetch4Authors();
})

</script>

<template>
  <div class="container">
    <!-- welcome image -->
    <div class="container row cont">
      <h1>
        Welcome to our Book Store
      </h1>
      <div class="col-12 col-xl-9 m-2 welcome">
        <h3>
          Read and explore your book from our book store
        </h3>
        <p>
          Find and read more your'll love, and keep track of the books you want to read.
          Be part of the word's largeest community of book lovers on Goodreads.
        </p>
      </div>
    </div>

    <!-- Recent Books -->
    <div class="container-fluid row recent-books">
      <div class="col-12">
        <h2 style="color:brown;">Recent Books</h2>
      </div>
        <div class="container-fluid recent-books">
      <div class="row g-4">
        <div
          v-for="(book, idx) in books"
          :key="idx +1"
          class="col-12 col-sm-6 col-lg-4 col-xl-3"
        >
          <div class="card bg-dark h-100">
            <img
              :src="book.coverUrl"
              class="card-img-top"
              alt="Book cover"
              style="object-fit: cover; height: 250px;"
            >
            <div class="card-body text-white d-flex flex-column">
              <h5 class="card-title">{{ book.title }}</h5>
              <p class="card-text flex-grow-1">{{ book.description }}</p>
              <router-link class="btn btn-primary mt-auto" :to="`/books/${book.id}`">
                Go To Book
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
    <div class="button">
      <router-link type="button" class="btn btn-secondary" to="/books">View More Books</router-link>
    </div>

    <!-- Recent Authors -->
    <div class="container-fluid row recent-books">
      <div class="col-12">
        <h2 style="color:brown;">Recent Authors</h2>
      </div>
        <div class="container-fluid recent-books">
      <div class="row g-4">
        <div
          v-for="(author, idx) in authors"
          :key="idx +1"
          class="col-12 col-sm-6 col-lg-4 col-xl-3"
        >
          <div class="card bg-dark h-100">
            <img
              :src="author.avatarUrl"
              class="card-img-top"
              alt="Book cover"
              style="object-fit: cover; height: 250px;"
            >
            <div class="card-body text-white d-flex flex-column">
              <h5 class="card-title">{{ author.name  }}</h5>
              <p class="card-text flex-grow-1">{{ author.bio }}</p>
              <router-link class="btn btn-primary mt-auto" :to="`/authors/${author.id}`">
                Go To Author
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    </div>
    <div class="button">
      <router-link type="button" class="btn btn-secondary" to="/authors">View More Authors</router-link>
    </div>

  </div>

  <router-view />
</template>

<style scoped>

.welcome{
  padding: 5px;
  margin-right: 20px;

}
h1{
  color: rgb(0, 0, 0);
  font-family: Georgia, 'Times New Roman', Times, serif;
  text-align: center;
  margin: auto;
  margin-bottom:50px ;
}
.cont{
  width: 90vw;
  height: 80vh;
  padding: 20px;
  margin: 15px auto ;
  display: flex;
  justify-content: center;
  text-align: center;
  background-image: url("../assets/images/Seattle-Bookstore-Hero-1.jpg");
  opacity: 0.7;
  border: 2px solid rgb(139, 118, 118);
    box-shadow: 1px 1px 5px rgb(8, 7, 7),
    -1px -1px 5px rgb(8, 7, 7);
 
}

.welcome h3{
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: rgb(0, 0, 0);
}
.welcome p{
  color: rgb(0, 0, 0);
}
/* img{
  width:238px;
  height: 238px;
 
} */

.button{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.button button{
  padding: 10px;
}
.card p{
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: smaller;
}
.card h5{
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: larger;
}
.card{
  display: flex;
  justify-content: center;
  text-align: center;
}

</style>
