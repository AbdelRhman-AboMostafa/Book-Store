<script setup>

defineProps({
    book:Object,
    authorName:String
})


const emit = defineEmits(['deleteBook'])
</script>

<template>
    <tr>
        <td>{{ book.id }}</td>
        <td>{{ book.title }}</td>
        <td>{{ authorName}}</td>
        <td>{{ book.year}}</td>
        <td><router-link :to="`/editBook/${book.id}`"><button type="button" class="btn btn-warning">Edit</button></router-link></td>
        <td><button type="button" class="btn btn-danger" @click='emit("deleteBook" , book.id ) '>Delete</button></td>
    </tr>
    
    
</template>

<style scoped>

</style>
