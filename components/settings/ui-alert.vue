<template>
  <v-alert
    :type="type"
  >
    {{ message }}
  </v-alert>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      type: state => state.type,
      message: state => state.message
    })
  },
  watch: {
    type () {},
    message () {}
  }
}
</script>
