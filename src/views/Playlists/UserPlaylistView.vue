<template>
    <die class="user-playlistes">
        <h1>My Playlists View</h1>
        <div v-if="playlists">
            <ListView :playlisten="playlists" />
        </div>
        <router-link :to="{name: 'CreatePlayList'}" class="btn">Create a new Playlist</router-link>
    </die>
</template>

<script>
import getUser from '@/composables/getUser';
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
    components: { ListView },
    setup(){
        const { user } = getUser()
        const { documents: playlists } = getCollection('playlisten',['userId', '==', user.value.uid ])

        console.log(playlists)

        return { playlists }
    }
}
</script>

<style>

</style>