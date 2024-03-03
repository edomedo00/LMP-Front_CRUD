export const state = () => ({
  type: '',
  showAlert: false,
  message: '',
  token: ''
})

export const mutations = {
  modifyType (state, type) {
    state.type = type
  },
  modifyAlert (state, showAlert) {
    state.showAlert = showAlert
  },
  modifyText (state, message) {
    state.message = message
  },
  modifyToken (state, token) {
    state.token = token
  }
}
