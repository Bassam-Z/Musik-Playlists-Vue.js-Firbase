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
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Seving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import  { timestamp }  from '@/firebase/Config'

export default {

    setup() {
        const {url, filePath, uploadImage } = useStorage()
        const { error, addDoc} = useCollection('playlisten')
        const { user } = getUser()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const isPending = ref(false)
        

        const handleSubmit  = async () => {
            if(file.value){
                console.log(title.value, description.value, file.value.name )
                isPending.value = true;
                await uploadImage(file.value)
                await addDoc({
                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })
                isPending.value = false
                // console.log(filePaht.value)
                if(!error.value){
                    console.log('Playlist added')
                }else {
                    console.log(error.value)
                }
            }
        }

        //erlaubte file types
        const types = [ 'image/png', 'image/jpeg']

        const handleChange = (e) => {
            const selected = e.target.files[0]
            console.log(selected.name)

            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            }else {
                file.value = null
                fileError.value = 'Please selct an image file (png or jpge)'
            }
        }
        return {title, description, handleSubmit, handleChange, fileError, isPending}
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