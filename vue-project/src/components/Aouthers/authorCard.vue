<script setup>
defineProps({
    author: Object
})
</script>

<template>

  
  <div class="col-sm-9 col-md-6 col-lg-4 col-xl-3 mb-3">
    <div class="card bg-dark h-100 book-card">
      <img 
        :src="author.avatarUrl" 
        class="card-img-top book-image" 
        alt="Book cover"
      >
      <div class="card-body text-white d-flex flex-column">
        <h5 class="card-title">{{ author.name }}</h5>
        <p class="card-text flex-grow-1">{{ author.bio }}</p>
        <router-link
          class="btn btn-primary mt-auto book-btn" 
          :to="`/authors/${author.id}`"
        >
          Go To Author
        </router-link>
      </div>
    </div>
  </div>

  <router-view />
</template>

<style scoped>
.book-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  overflow: hidden;
}
.book-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);
}

.book-image {
  object-fit: cover; 
  height: 250px;
  transition: transform 0.3s ease;
}
.book-card:hover .book-image {
  transform: scale(1.05);
}

.book-btn {
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.book-btn:hover {
  background-color: #0d6efd;
  transform: scale(1.05);
}

h5 {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: larger;
}
p {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: small;
}
</style>
