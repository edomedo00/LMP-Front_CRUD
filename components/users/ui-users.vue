<template>
  <div>
    <v-row class="mt-2 mb-2">
      <v-btn block color="primary" @click="showDialog = true">
        <v-icon>mdi-account</v-icon>
        Add user
      </v-btn>
    </v-row>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="users"
        class="elevation-2"
      >
        <template #[`item.actions`]="{ item }">
          <!-- <v-row>
            {{ item }}
          </v-row> -->
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-tooltip bottom color="red">
                <template #activator="{on, attrs}">
                  <v-btn icon color="red" v-bind="attrs" @click="deleteUser(item)" v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete user: {{ item.user }}</span>
              </v-tooltip>
            </v-col>
            <v-col cols="6">
              <v-tooltip bottom color="green">
                <template #activator="{on, attrs}">
                  <v-btn icon color="green darkeen-4" v-bind="attrs" @click="updateUser(item)" v-on="on">
                    <v-icon>mdi-updates</v-icon>
                  </v-btn>
                </template>
                <span>Update user: {{ item.user }}</span>
              </v-tooltip>
              <v-icon>mdi-updates</v-icon>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog v-model="showDialog" width="600" persistent>
      <v-card color="lime lighten-3">
        <v-card-title>User Data</v-card-title>
        <v-card-text>
          <v-form ref="frmUser" v-model="frmUser">
            <v-text-field
              v-model="user.name"
              type="text"
              label="Name"
              placeholder="Type user name"
              :rules="[required, length3]"
            />
            <v-text-field
              v-model="user.firstLN"
              type="text"
              label="Surname"
              placeholder="Type first last name"
              :rules="[required]"
            />
            <v-text-field
              v-model="user.secondLN"
              type="text"
              label="(second) surname"
              placeholder="Type second last name"
              :rules="[required]"
            />
            <v-text-field
              v-model="user.phoneNr"
              type="text"
              label="Phone Number"
              placeholder="Type phone number"
            />
            <v-text-field
              v-model="user.user"
              type="text"
              label="User"
              placeholder="Type user"
              :rules="[required]"
            />
            <v-text-field
              v-model="user.password"
              type="password"
              label="Password"
              placeholder="Type password"
              :rules="[required, length6]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showDialog = false">
            <v-icon>
              mdi-cancel
            </v-icon>
            Cancel
          </v-btn>
          <v-btn @click="saveUser">
            <v-icon>
              mdi-account
            </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="350" persistent>
      <v-card color="lime lighten-4">
        <v-card-title class="text-h5">
          Delete user
        </v-card-title>
        <v-card-text>
          Are you sure?
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = postDelete()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogUpdate" width="600" persistent>
      <v-card color="green lighten-3">
        <v-card-title>User Data</v-card-title>
        <v-card-text>
          <v-form ref="frmUserUpdate" v-model="frmUserUpdate">
            <v-text-field
              v-model="user.name"
              type="text"
              label="Type your name"
              placeholder="name"
              :rules="[required, length3]"
            />
            <v-text-field
              v-model="user.firstLN"
              type="text"
              label="firstLN"
              placeholder="Type your first last name"
              :rules="[required]"
            />
            <v-text-field
              v-model="user.secondLN"
              type="text"
              label="secondLN"
              placeholder="Type your second last name"
              :rules="[required]"
            />
            <v-text-field
              v-model="user.phoneNr"
              type="text"
              label="phoneNr"
              placeholder="Type your phone number"
            />
            <v-text-field
              v-model="user.user"
              type="text"
              label="user"
              placeholder="Type your user"
              :rules="[required]"
              style="display: none;"
            />
            <v-text-field
              v-model="user.password"
              type="password"
              label="password"
              placeholder="Type your password"
              :rules="[required, length6]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogUpdate = false">
            <v-icon>
              mdi-cancel
            </v-icon>
            Cancel
          </v-btn>
          <v-btn @click="UpdateUser">
            <v-icon>
              mdi-accpunt-arrow-up
            </v-icon>
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      users: [],
      headers: [
        { text: 'Name', align: 'center', sortable: true, value: 'name' },
        { text: 'First LN', align: 'center', sortable: true, value: 'firstLN' },
        { text: 'Second LN', align: 'center', sortable: true, value: 'secondLN' },
        { text: 'Phone Nr.', align: 'center', sortable: true, value: 'phoneNr' },
        { text: 'User', align: 'center', sortable: true, value: 'user' },
        { text: 'Actions', align: 'center', sortable: false, value: 'actions' }
      ],
      showDialog: false,
      frmUser: false,
      user: {
        name: '',
        firstLN: '',
        secondLN: '',
        phoneNr: '',
        user: '',
        password: ''
      },
      required: value => !!value || 'Required.',
      length3: value => value.length > 2 || 'Name must be at least 3 chars.',
      length6: value => value.length > 5 || 'Password must be at least 6 chars.',
      dialogDelete: false,
      userDelete: '',
      dialogUpdate: false,
      frmUserUpdate: false
    }
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  },
  mounted () {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers () {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token
      }
      const response = await this.$axios.get('get-all', headers)
      if (response.data.alert === 'success') {
        this.users = response.data.data
      }
      console.log('@@@ response ', response)
    },
    saveUser () {
      this.frmUser = this.$refs.frmUser.validate()
      if (this.frmUser) {
        this.$axios.post('signup', this.user)
          .then((result) => {
            console.log('@@ result => ', result)
            if (result.data.alert === 'success') {
              this.$store.commit('modifyAlert', true)
              this.$store.commit('modifyType', 'success')
              this.$store.commit('modifyText', 'User registered')
              setTimeout(() => {
                this.$store.commit('modifyAlert', false)
                this.getAllUsers()
                this.showDialog = false
              }, 3000)
            }
          }).catch((err) => {
            console.log('@@ error => ', err)
          })
      } else {
        console.log('@@@ Missing data')
        this.$store.commit('modifyAlert', true)
        this.$store.commit('modifyType', 'error')
        this.$store.commit('modifyText', 'Missing data')
        setTimeout(() => {
          this.$store.commit('modifyAlert', false)
        }, 3000)
      }
    },
    deleteUser (user) {
      this.userDelete = user
      this.dialogDelete = true
    },
    postDelete () {
      if (this.userDelete !== '') {
        const user = {
          user: this.userDelete
        }
        const headers = {
          'Content-Typwe': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
        this.$axios.post('delete-user', user, { headers }) // En peticiones post se utiliza este orden y se envian los headers como objetos
          .then((result) => {
            console.log('@@ result => ', result)
            if (result.data.alert === 'user was deleted') {
              this.getAllUsers()
              this.dialogDelete = false
            }
          })
          .catch((err) => {
            console.log('@@ error => ', err)
          })
      }
    },
    updateUser (user) {
      this.user.name = user.name
      this.user.firstLN = user.firstLN
      this.user.secondLN = user.secondLN
      this.user.phoneNr = user.phoneNr
      this.user.user = user.user
      this.user.password = ''
      this.dialogUpdate = true // FALTA CODIGO
    },
    UpdateUser () {
      this.frmUserUpdate = this.$refs.frmUpdate.validate()
      if (this.frmUserUpdate) {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
        this.$axios.post('update-user', this.user, { headers })
          .then((result) => {
            console.log('@@ result => ', result)
          })
          .catch((err) => {
            console.log('@@ error => ', err)
          })
      } else {
        //  algo esta mal en los campos
      }
    }
  }
}
</script>
