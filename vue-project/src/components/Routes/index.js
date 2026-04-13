import { createMemoryHistory, createRouter } from 'vue-router'


import Home from '../Home.vue'
import BookView from '../Views/bookView.vue';
import BookDescrption from '../Books/bookDescrption.vue';
import AuthorView from '../Views/authorView.vue';
import AuthorDescreption from '../Aouthers/authorDescreption.vue';
import About from '../ِAbout/about.vue';
import AdminDashboard from '../Admin/adminDashboard.vue';
import AdminBookView from '../Admin/adminBooks/adminBookView.vue';
import AdminBookForm from '../Admin/adminBooks/adminBookForm.vue';
import AdminAuthorForm from '../Admin/adminAuthor/adminAuthorForm.vue';
import AdminAuthorView from '../Admin/adminAuthor/adminAuthorView.vue';
import AdminEditBook from '../Admin/adminBooks/adminEditBook.vue';
import AdminEditAuthor from '../Admin/adminAuthor/adminEditAuthor.vue';



const routes = [
  { path: '/', component: Home },
  { path: '/books', component: BookView },
  { path: '/books/:id', component: BookDescrption },
  { path: '/authors', component: AuthorView },
  { path: '/authors/:id', component: AuthorDescreption },
  { path: '/about', component:About },
  { path: '/admin', component:AdminDashboard },
  { path: '/adminBookView', component:AdminBookView },
  { path: '/bookForm', component:AdminBookForm},
  { path: '/authorForm', component:AdminAuthorForm},
  { path: '/adminAuthorView', component:AdminAuthorView},
  { path: '/editBook/:id', component:AdminEditBook},
  { path: '/editauthor/:id', component:AdminEditAuthor},

]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
export default router; 