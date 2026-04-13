<script setup>
//  import files
    import { useRoute } from 'vue-router'
    import { onMounted } from 'vue'
    import { storeToRefs } from 'pinia'
    import { useAuthorStore } from '../Stores/autherStore'

    // define Routes
    const route = useRoute()
    const authorId = Number(route.params.id)

    // define Store
    const authorStore = useAuthorStore()
    const { newAuthor: author, isLoading: isloading } = storeToRefs(authorStore)
    onMounted(async () => {
        await authorStore.fetchAuthorById(authorId)
        if (author.value && author.value.authorId) {
            await authorStore.fetchAuthorById(author.value.authorId)
        }
    })
</script>



<template>
    
  <div v-if="author && !isloading" class="container des row gap-4 mt-4">
        <div class="col-12 col-sm-9 col-md-5 ">
            <img :src="author.avatarUrl" alt="Book cover" class="img-fluid mb-3" style="max-width:300px;">
        </div>
        <div class="col-12 col-sm-9 col-md-5"> 
            <h2><strong>Name :</strong></h2>
            <h5>{{ author.name }}</h5>
            <br>
            
            <p><strong>About the Author :</strong></p>
            
            <p>{{ author.bio }}</p>
          </div>          
        </div>

  <div v-else-if="isloading" class="container mt-4">
    <p>Loading book details...</p>
  </div>

  <div v-else class="container mt-4">
    <p>Author not found</p>
  </div>
</template>

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