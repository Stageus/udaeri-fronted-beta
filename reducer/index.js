const initState = {
  userToken: null,
  url: 'http://3.35.67.117:8000/',
  mainColor: '#ff9933',
  grayColor: '#999999',
  curCat: null
};

const RESTORE_TOKEN = "RESTORE_TOKEN";
const RESTORE_CURCAT = "RESTORE_CURCAT";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
});

export const restoreCurCat = (curCat) => ({
  type: RESTORE_CURCAT,
  curCat,
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
      };
    case RESTORE_CURCAT:
      return {
        ...state,
        curCat: action.curCat,
      };
    default:
      return state;
  }
};

export default reducer;
