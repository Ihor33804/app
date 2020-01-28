export default {
  authReducer: {
    dataUser: {},
    user_id: '',
    phone: '',
    email: '',
    photo: '',
    name: '',
    token: null,
    senders: [],
    chats: {},
    error: null,
    confirmation_code: {},
    isRequest: false,
    profileData: {}
  },
  notificationReducer: {
    message: {},
  },
  userReducer: {
    isRequest: false,
    senders: [],
    contracts: []
  },
  senderReducer: {
    listUsers: []
  }
};
