<template>
  <v-card width="400" color="darkgrey">
    <v-card-title>Welcome</v-card-title>
    <v-card-text>
      <v-form ref="frmLogin" v-model="valid">
        <v-text-field
          v-model="user"
          type="text"
          placeholder="Type your username"
          label="Username"
          :rules="[rules.required]"
        />
        <v-text-field
          v-model="password"
          type="password"
          placeholder="Type your password"
          label="Password"
          :rules="[rules.required, rules.password]"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block elevation="0" color="darkgrey" @click="loginUser">
        <v-icon color="lightgrey">
          mdi-account
        </v-icon>
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      user: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        password: value => value.length > 5 || 'Password must be at least 6 characters'
      }
    }
  },
  methods: {
    loginUser () {
      this.valid = this.$refs.frmLogin.validate()
      // console.log('Button pressed', this.valid)

      if (this.valid) {
        const sentData = {
          user: this.user,
          password: this.password
        }

        this.$axios.post('login', sentData)
          .then((result) => {
            console.log('@@@ result => ', result)
            if (result.data.alert === 'success') {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyText', 'Welcome!!')
              this.$store.commit('modifyToken', result.data.token)
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.$router.push('/dashboard')
              }, 3000)
            } else {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'error')
              this.$store.commit('modifyText', result.data.alert)
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.$router.push('/login')
              }, 3000)
            }
          }).catch((err) => {
            console.log('@@@ error => ', err)
          })
      } else {
        //
      }
    }
    // eslint-disble-next-line no-console
    // console.log('Button pressed', this.valid)
  }
}

</script>

<style scoped>
</style>
