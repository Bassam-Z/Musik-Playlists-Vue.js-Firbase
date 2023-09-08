<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new PlayList</h4>
    <input type="text" required placeholder="Playlist title" v-model="title">
    <textarea required placeholder="Playlist description..." v-model="description"></textarea>
    
    <!-- Playlist Foto hochladen -->
    <label> uplaoad playlist cover </label>
    <input type="file" @change="handleChange">
    <div class="error"> {{ fileError }}</div>

    <!-- Error handle -->
    <!-- <div class="error">{{ error }}</div> -->
    <button>Create</button>
  </form>
</template>

<script>
import { ref } from 'vue'
export default {

    setup() {
        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)

        const handleSubmit  = () => {
            if(file.value){
                console.log(title.value, description.value, file.value )
            }
        }

        //erlaubte file types
        const types = [ 'image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected)

            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            }else {
                file.value = null
                fileError.value = 'Please selct an image file (png or jpge)'
            }
        }
        return {title, description, handleSubmit, handleChange, fileError}
    }

}
</script>

<style>
form {
    background: white;
}

input[type= "file"] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

button {
    margin-top: 20px;
}

</style>