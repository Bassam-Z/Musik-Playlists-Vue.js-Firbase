<template>
  <form @submit.prevent="handelSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="Displayname">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Sign Up</button>
    <button v-if="isPending" disabled>Loding</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const {error, signup , isPending} = useSignup()
        const router = useRouter()

        const Displayname = ref('')
        const email = ref('')
        const password = ref('')

        const handelSubmit = async () => {
            const res = await signup(Displayname.value, email.value, password.value)
            if(!error.value){
                console.log('user signed up')
                router.push({name: 'UserPlaylist'})
            }
        }
        return {Displayname, email, password, handelSubmit, isPending, error}
    }

}
</script>

<style>

</style>