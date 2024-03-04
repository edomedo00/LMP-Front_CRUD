<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      class="pt-4"
      color="grey-lighten-3"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/90.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>Edmundo Medel</v-list-item-title>
        <v-btn color="blue" icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />
      <v-list>
        <v-list-item
          v-for="option in options"
          :key="option.title"
          :to="option.path"
          link
        >
          <v-list-item-icon>
            <v-icon color="blue darkeen-3">
              {{ option.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ option.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
      <ui-alert v-if="showAlert" class="alert" />
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
  data () {
    return {
      drawer: true,
      mini: true,
      options: [
        { title: 'Users', icon: 'mdi-account', path: '/dashboard/users' }
      ]
    }
  },
  computed: {
    ...mapState({
      showAlert: state => state.showAlert
    })
  }
}
</script>
