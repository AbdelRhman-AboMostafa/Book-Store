<template>
  <nav class="navbar navbar-expand-lg nav " style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Book Store Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/books" active-class="active">Books</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/authors" active-class="active">Authers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin" active-class="active">Admin</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script setup>



</script>

<style scoped>
.navbar-nav .nav-link {
  cursor: pointer;
}
:dir(rtl) {
  .navbar-brand,
  .nav-link {
    text-align: right;
  }
}
.nav{
  padding: 10px;
}
</style>
