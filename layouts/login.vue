<template>
  <v-app>
    <v-main>
      <v-row class="centerClass">
        <Nuxt />
        <ui-alert v-if="showAlert" class="alert" />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import uiAlert from '@/components/settings/ui-alert.vue'
export default {
  components: {
    uiAlert
  },
  computed: {
    ...mapState({
      showAlert: state => state.showAlert
    })
  },
  watch: {
    showAlert () {
      // se observa si hubo cambios en al variable
    }
  }
}
</script>

<style scoped>
.centerClass {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: darkslategrey;
}

.alert{
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
