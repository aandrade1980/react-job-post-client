const initialState = {
  user: {
    avatar_url:
      'https://lh3.googleusercontent.com/a-/AAuE7mDpye2cUha0uDA4_W6vwO1Qbr_QvrfGbMwLSaMGfQ',
    confirmed_at: '2019-09-05T19:30:36Z',
    created_at: '2019-09-05T19:29:17Z',
    email: 'varito1@gmail.com',
    full_name: 'Alvaro Andrade',
    id: '14bfc532-d5ac-4bea-b146-4460e5f874d2',
    provider: 'google'
  }
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
