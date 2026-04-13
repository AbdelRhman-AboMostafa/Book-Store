import axios from "axios";
import { defineStore } from "pinia";



export const useAuthorStore = defineStore('author' , {
    state:()=>({
        authorList: [] ,
        isLoading : true,
        newAuthor : {},
        fourAuthors:[],
    }),

    actions:{

        async fetchAuthers(){
            try {
                const res = await axios.get('http://localhost:3000/authors')
                this.authorList = res.data; 
                this.isLoading = false
            } catch (error) {
                alert("there is an error with fetching authors ")
            }
        },

        async fetchAuthorById(id){
            try {
                const res = await axios.get(`http://localhost:3000/authors/${id}`)
                this.newAuthor = res.data;
                this.isLoading = false;
            } catch (error) {
                alert("there is an error with fetching author by id ")
                
            }
        },
    

        async fetchAuthorByName(name){
            try {
                const res = await axios.get(`http://localhost:3000/authors?name=${name}`)
                this.newAuthor = res.data[0] || {};
                // this.isLoading = false;
            } catch (error) {
                alert("there is an error with fetching author by name ")
                
            }
        },
        
        async getAuthorByName(name){
            try {
                const res = await axios.get(`http://localhost:3000/authors?name=${name}`)
                this.authorList = res.data;
                this.isLoading = false;
            } catch (error) {
                alert("there is an error with fetching author by id ")
                
            }
        },
        async fetch4Authors() {
            try {
            const res = await axios.get('http://localhost:3000/authors')
            this.authorList = res.data;
            this.fourAuthors = this.authorList.slice(0, 4);
            this.isloading = false;
            } catch (error) {
            alert("there is error with fetching 4 Authors");
            }
        },
        async deleteAuthorById(id){
            try {
                const res = await axios.delete(`http://localhost:3000/authors/${id}`);
                this.authorList = this.authorList.filter((author) => author.id !== id);
                this.isloading = false;
            } catch (error) {
                alert("faild deleting")
            }
        },
        async updateAuthor(updatedData) {
            try {
                const authorId = String(updatedData.id)
                await axios.put(`http://localhost:3000/authors/${authorId}`, updatedData)
                console.log(`Author with ID ${authorId} updated successfully!`)

                const index = this.authorsList.findIndex(a => String(a.id) === authorId)
                if (index !== -1) {
                    Object.assign(this.authorsList[index], updatedData) 
                }
            } catch (error) {
                console.error('Error updating author:', error)
            }
},
            async addAuthor(author){
                try {
                const res = await axios.post('http://localhost:3000/authors', author);
                this.authorList.push(res.data);
                } catch (error) {
                alert('Error adding movie');
                console.error('Add movie error:', error);
                }
            }

    }
})