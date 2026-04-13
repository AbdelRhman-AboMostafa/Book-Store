<script setup>
defineProps({
    author: Object,
})

const emit = defineEmits(['deleteAuthor'])
</script>

<template>
    <tr>
        <td>{{ author.id }}</td>
        <td>{{ author.name }}</td>
        <td>{{ author.bio }}</td>
        
        <td>
            <router-link :to="`/editauthor/${author.id}`">
                <button type="button" class="btn btn-warning">Edit</button>
            </router-link>
        </td>
        <td>
            <button type="button" class="btn btn-danger" @click='emit("deleteAuthor", author.id)'>
                Delete
            </button>
        </td>
    </tr>
</template>
