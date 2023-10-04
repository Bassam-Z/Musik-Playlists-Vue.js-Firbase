<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents" class="document">
      <!-- <div v-for="doc in documents" :key="doc.id">  {{ doc.title }}</div> -->
      <div class="no-Playlistes" v-if="!documents.length">Is no Playlists to display</div>
      <ListView :playlisten="documents"/>
    </div>
    <!-- <p>HomeView</p> -->
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';

export default {
  name: 'HomeView',
  components: {ListView},
  setup(){
    const { error, documents } = getCollection('playlisten')

    return {error, documents}
  }
}
</script>

<style scoped>
.no-Playlistes {
  text-align: center;
}
</style>
