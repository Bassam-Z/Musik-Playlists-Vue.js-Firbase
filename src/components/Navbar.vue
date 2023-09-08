<template>
  <div class="navbar">
    <nav>
        <img src="../assets/favicon.png" alt="">
        <h1><router-link :to="{name: 'Home'}">Musik Play-List</router-link></h1>
        <div class="links">
            <div v-if="user">
                <button @click="handelClick" >Logout</button>
            </div>
            <div v-else>
                <router-link class="btn" :to="{name: 'Signup'}">Signup</router-link>
                <router-link class="btn" :to="{name: 'Login'}">Log in</router-link>
            </div>
        </div>
    </nav>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import useLogout from '@/composables/useLogout';
import getUser from '@/composables/getUser';

export default {
    setup(){
        const {error, logout} = useLogout();

        const router = useRouter()

        //User Data Aufreuf
        const { user } = getUser();

        const handelClick = async () => {
            await logout()
            if(!error.value){
                // context.emit('logout')
                console.log('user logged out')
                router.push({ name: 'Login'})
            }
        }

        return {error, handelClick, user}

    }

}
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}

nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

nav h1 {
    margin-left: 20px;
}

nav .links {
    margin-left: auto;
}

nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
}

nav img {
    max-height: 60px;
}
</style>