<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handelDelete">Delete Playlist</button>
    </div>

    <!-- song-list -->
    <div class="song-list">
      <h3>Sond list here</h3>
    </div>

  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage';

export default {
    props: ['id'],
    setup(props) {
      // documents name gendärt zu playlist
      const { error, documents: playlist } = getDocument('playlisten', props.id)
      const { user } = getUser()
      const { err, isPanding, deleteDoc } = useDocument('playlisten', props.id)
      const { deleteImage } = useStorage()
      const router = useRouter()

      // Computed gnutzt um die Ownership Aktull zu bleiben beim login und logout und die user modify zu ermöglichen
      const ownership = computed(() => {
        //wenn die drei Bedingungen erfüllt, wird true zurück gegeben ansonst false // uid ist schlüsellwort von Firebase
        return playlist.value && user.value && user.value.uid == playlist.value.userId
      })

      const handelDelete = async () => {
        await deleteDoc()
        await deleteImage(playlist.value.filePath)
        router.push({name: 'Home'})
      }

      return { error, playlist, ownership, handelDelete }
    }

}
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}

.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}

.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.playlist-info {
  text-align: center;
}

.username {
  color: #999;
}

.description {
  text-align: left;
}

</style>