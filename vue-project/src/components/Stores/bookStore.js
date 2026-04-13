import axios from 'axios';
import { defineStore } from 'pinia';

export const useBookStore = defineStore('books', {
    state:()=>({
        booksList:[],
        threeBooks:[],
        newBook:{},
        isloading : true,
        author:{},

    }),
    actions:{
        // http://localhost:3000/books
        // http://localhost:3000/authors
        async fetchBooks() {
            // if (this.booksList.length > 0) return;
            try {
                const res = await axios.get(`http://localhost:3000/books`);
                this.booksList = res.data;
                this.isloading = false;
            } catch (error) {
                alert("there is error with fetching data")
            }
        },

        async fetchBookById(id){
            try {
                const res = await axios.get(`http://localhost:3000/books/${id}`);
                this.newBook = res.data;
            } catch (error) {
                alert("there is error with fetching data By id")
            }
            
        },
        async fetchBookByAuthorId(authorId) {
            try {
            const res = await axios.get(`http://localhost:3000/books?authorId=${authorId}`);
            this.booksList = res.data;
            } catch (error) {
            alert("there is error with fetching data By author id");
            }
        },
        async fetch3Books() {
            try {
            const res = await axios.get(`http://localhost:3000/books`);
            this.booksList = res.data;
            this.threeBooks = this.booksList.slice(0, 4);
            this.isloading = false;
            } catch (error) {
            alert("there is error with fetching data");
            }
        },
        async deleteBookById(id){
            try {
                const res = await axios.delete(`http://localhost:3000/books/${id}`);
                this.booksList = this.booksList.filter((book) => book.id !== id);
                this.isloading = false;
            } catch (error) {
                alert("faild deleting")
            }
        },
        

        async fetchAuthor(id){
            try {
                const res = await axios.get(`http://localhost:3000/authors/${id}`);
                this.author = res.data;
            } catch (error) {
                alert("there is error with fetching author By id")
            }
            
        },

        async addBook(book){
            try {
            const res = await axios.post('http://localhost:3000/books', book);
            this.booksList.push(res.data);
            } catch (error) {
            alert('Error adding movie');
            console.error('Add movie error:', error);
            }
        },
        async updateBook(updatedData) {
            try {
                const bookId = String(updatedData.id)
                await axios.put(`http://localhost:3000/books/${bookId}`, updatedData)
                console.log(`Book with ID ${bookId} updated successfully!`)
                const index = this.booksList.findIndex(b => String(b.id) === bookId)
                if (index !== -1) {
                    this.booksList[index] = updatedData
                }
            } catch (error) {
                console.error('Error updating book:', error)
            }
}

        }
})
