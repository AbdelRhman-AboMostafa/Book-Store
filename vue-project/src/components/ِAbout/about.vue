<!-- src/Views/About.vue -->
<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    q: 'What is this app?',
    a: 'A simple Vue 3 + Pinia demo to manage books and authors with a mock JSON server.'
  },
  {
    q: 'How do I add a new book?',
    a: 'Go to the Admin section, then Books, and click “New”. Fill out the form and submit.'
  },
  {
    q: 'Where does data come from?',
    a: 'Data is served by json-server at http://localhost:3000 with /books and /authors endpoints.'
  },
  {
    q: 'Can I search by author name?',
    a: 'Yes. On the Books page, use the search to filter by author name.'
  }
])
</script>

<template>
  <div class="container py-5">
    <!-- heading -->
    <header class="mb-4 text-center">
      <h1 class="display-6 fw-bold">About Our Book Store</h1>
      <p class="lead text-muted">
        Manage books and authors, explore recent titles, and learn how the app works.
      </p>
    </header>

    <!-- intro text -->
    <section class="mb-5">
      <h2 class="h4 fw-semibold">What you can do</h2>
      <p class="mb-2">
        Browse books, view author details, and use the admin dashboard to create, edit, and delete records.
      </p>
      <p class="mb-0">
        This project uses Vue 3 (Composition API), Pinia for state, Vue Router, Bootstrap for UI, and json-server as a mock API.
      </p>
    </section>

    <!-- FAQ Accordion -->
    <section aria-labelledby="faq-title">
      <h2 id="faq-title" class="h4 fw-semibold mb-3">FAQ</h2>

      <div class="accordion" id="faqAccordion">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="accordion-item border-0 mb-2 shadow-sm rounded-3"
        >
          <h2 class="accordion-header" :id="`heading-${i}`">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapse-${i}`"
              aria-expanded="false"
              :aria-controls="`collapse-${i}`"
            >
              {{ item.q }}
            </button>
          </h2>
          <div
            :id="`collapse-${i}`"
            class="accordion-collapse collapse"
            :aria-labelledby="`heading-${i}`"
            data-bs-parent="#faqAccordion"
          >
            <div class="accordion-body">
              {{ item.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <div class="text-center mt-5">
      <router-link to="/admin" class="btn btn-primary me-2">Go to Admin</router-link>
      <router-link to="/books" class="btn btn-secondary me-2">Browse Books</router-link>
      <router-link to="/authors" class="btn btn-info">Browse Authors</router-link>
    </div>
  </div>
</template>

<style scoped>
.accordion-button { border-radius: 1rem !important; }
.accordion-item   { overflow: hidden; }
</style>
