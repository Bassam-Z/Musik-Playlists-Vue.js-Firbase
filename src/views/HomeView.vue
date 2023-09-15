<template>
  <div class="home">
    <div v-if="error" class="error">Could not fetch the data</div>
    <div v-if="documents" class="document">
      <div v-for="doc in documents" :key="doc.id"> {{ doc.title }}</div>
    </div>
    <!-- <p>HomeView</p> -->
  </div>
</template>

<script>
// @ is an alias to /src
import getCollection from '@/composables/getCollection';

export default {
  name: 'HomeView',
  components: {},
  setup(){
    const { error, documents } = getCollection('playlisten')

    return {error, documents}
  }
}
</script>
