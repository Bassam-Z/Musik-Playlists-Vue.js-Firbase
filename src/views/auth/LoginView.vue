<template>
  <form @submit.prevent="handelSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loding</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {

    setup() {
        const { error, login, isPending} = useLogin()
        const router = useRouter()

        const email = ref('')
        const password = ref ('')
        

        const handelSubmit = async () => {
            const res = await login(email.value, password.value)
            // console.log(res)
            if(!error.value){
                console.log ('user logged in')
                router.push({name: 'UserPlaylist'})
            }else {
              console.log ('user not logged in')
            }
        }

        return {email, password, handelSubmit, error, isPending}
    }

}
</script>

<style>

</style>