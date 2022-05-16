export default {
  strategies: {
    custom: {
      scheme: 'oauth2',
      token: {
        type: 'Bearer'
      },
      user: {
        property: 'user'
      }
    }
  }
}
