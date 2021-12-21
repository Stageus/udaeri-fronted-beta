const initState = {
  userToken: null,
  url: "http://3.35.67.117:8000/",
  mainColor: "#ff9933",
  grayColor: "#999999",
  largeCatList: null,
  midCatList: null,
  curLargeCat: null,
  curMidCat: null,
  curStore: null,
  jjimStore: null,
};

const RESTORE_TOKEN = "RESTORE_TOKEN";
const RESTORE_CUR_LARGECAT = "RESTORE_CUR_LARGECAT";
const RESTORE_CUR_MIDCAT = "RESTORE_CUR_MIDCAT";
const RESTORE_LARGECATLIST = "RESTORE_LARGECATLIST";
const RESTORE_MIDCATLIST = "RESTORE_MIDCATLIST";
const RESTORE_CUR_STORE = "RESTORE_CUR_STORE";
const RESTORE_JJIM_STORE = "RESTORE_JJIM_STORE";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
});

export const restoreLargeCatList = (catList) => ({
  type: RESTORE_LARGECATLIST,
  catList,
});

export const restoreMiddleCatList = (catList) => ({
  type: RESTORE_MIDDLECATLIST,
  catList,
});

export const restoreCurLargeCat = (cat) => ({
  type: RESTORE_CUR_LARGECAT,
  cat,
});

export const restoreMidCatList = (catList) => ({
  type: RESTORE_MIDCATLIST,
  catList,
});

export const restoreCurMidCat = (cat) => ({
  type: RESTORE_CUR_MIDCAT,
  cat,
});

export const restoreCurStore = (store) => ({
  type: RESTORE_CUR_STORE,
  store,
});

export const restoreJjimStore = (storeList) => ({
  type: RESTORE_JJIM_STORE,
  storeList,
});

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
        largeCatList: action.catList,
      };
    case RESTORE_MIDCATLIST:
      return {
        ...state,
        midCatList: action.catList,
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
    case RESTORE_CUR_STORE:
      return {
        ...state,
        curStore: action.store,
      };
    case RESTORE_JJIM_STORE:
      return {
        ...state,
        jjimStore: action.storeList,
      };
    default:
      return state;
  }
};

export default reducer;
