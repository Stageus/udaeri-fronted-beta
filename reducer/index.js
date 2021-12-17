const initState = {
  userToken: null,
  url: 'http://3.35.67.117:8000/',
  mainColor: '#ff9933',
  grayColor: '#999999',
  largeCatList: null,
  curLargeCat: null,
  curMidCat: null
};

const RESTORE_CUR_LARGECAT = "RESTORE_CUR_LARGECAT";
const RESTORE_TOKEN = "RESTORE_TOKEN";
const RESTORE_CUR_MIDCAT = "RESTORE_CUR_MIDCAT";
const RESTORE_LARGECATLIST = "RESTORE_LARGECATLIST";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
});

export const restoreLargeCatList = (catList) => ({
  type: RESTORE_LARGECATLIST,
  catList,
})

export const restoreCurLargeCat = (cat) => ({
  type: RESTORE_CUR_LARGECAT,
  cat,
})

export const restoreCurMidCat = (cat) => ({
  type: RESTORE_CUR_MIDCAT,
  cat,
})

const reducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
      };
    case RESTORE_LARGECATLIST:
      return {
        ...state,
        largeCatList: action.catlist,
      };
    case RESTORE_CUR_LARGECAT:
      return {
        ...state,
        curLargeCat: action.cat,
      };
    case RESTORE_CUR_MIDCAT:
      return {
        ...state,
        curMidCat: action.cat,
      };
    default:
      return state;
  }
};

export default reducer;
