const initState = {
  userToken: null,
};

const RESTORE_TOKEN = "RESTORE_TOKEN";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
