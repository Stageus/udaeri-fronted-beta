const initState = {
  userToken: null,
  tokenCheck: false,
  loginTime: null,
  tokenExpiredTime: null,
  url: "http://3.35.67.117:8000/",
  mainColor: "#ff9933",
  grayColor: "#999999",
  largeCatList: null,
  midCatList: null,
  curLargeCat: null,
  curMidCat: null,

  curMidCatList: null,

  curStore: null,
  jjimStore: null,
  jjimState: null,
};

const RESTORE_TOKEN = "RESTORE_TOKEN";
const CHECK_TOKEN = "CHECK_TOKEN";
const RESTORE_LOGIN_TIME = "RESTORE_LOGIN_TIME";
const RESTORE_TOKEN_EXPIRED_TIME = "RESTORE_TOKEN_EXPIRED_TIME";
const RESTORE_CUR_LARGECAT = "RESTORE_CUR_LARGECAT";
const RESTORE_CUR_MIDCAT = "RESTORE_CUR_MIDCAT";

const RESTORE_CUR_MIDCATLIST = "RESTORE_CUR_MIDCATLIST";
const ADD_CUR_MIDCATLIST = "ADD_CUR_MIDCATLIST";

const RESTORE_LARGECATLIST = "RESTORE_LARGECATLIST";
const RESTORE_MIDCATLIST = "RESTORE_MIDCATLIST";
const RESTORE_CUR_STORE = "RESTORE_CUR_STORE";
const RESTORE_JJIM_STORE = "RESTORE_JJIM_STORE";
const CHECK_JJIM = "CHECK_JJIM";
const ADD_JJIM = "ADD_JJIM";
const DELETE_JJIM = "DELETE_JJIM";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
});

export const checkToken = (token) => ({
  type: CHECK_TOKEN,
  token,
});

export const restoreLoginTime = (time) => ({
  type: RESTORE_LOGIN_TIME,
  time,
});

export const restoreExpiredTime = (time) => ({
  type: RESTORE_TOKEN_EXPIRED_TIME,
  time,
});

export const restoreLargeCatList = (catList) => ({
  type: RESTORE_LARGECATLIST,
  catList,
});

export const restoreMiddleCatList = (catList) => ({
  type: RESTORE_MIDCATLIST,
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

export const restoreCurMidCatList = (storeList) => ({
  type: RESTORE_CUR_MIDCATLIST,
  storeList,
});

export const addCurMidCatList = (curMidCat, addStoreList) => ({
  type: ADD_CUR_MIDCATLIST,
  curMidCat,
  addStoreList,
});

export const restoreCurStore = (store) => ({
  type: RESTORE_CUR_STORE,
  store,
});

export const restoreJjimStore = (storeList) => ({
  type: RESTORE_JJIM_STORE,
  storeList,
});

export const jjimCheck = (boolean) => ({
  type: CHECK_JJIM,
  boolean,
});

export const addJjim = (store, storeList) => ({
  type: ADD_JJIM,
  storeList,
  store,
});

export const deleteJjim = (store, storeList) => ({
  type: DELETE_JJIM,
  storeList,
  store,
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
      };
    case CHECK_TOKEN:
      return {
        ...state,
        tokenCheck: action.token,
      };
    case RESTORE_TOKEN_EXPIRED_TIME:
      return {
        ...state,
        tokenExpiredTime: action.time,
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
    case RESTORE_CUR_MIDCATLIST:
      return {
        ...state,
        curMidCatList: action.storeList,
      };
    case ADD_CUR_MIDCATLIST:
      state.curMidCatList[action.curMidCat] = state.curMidCatList[action.curMidCat].concat(action.addStoreList)
      return {
        ...state,
        curMidCatList: state.curMidCatList
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
    case CHECK_JJIM:
      return {
        ...state,
        jjimState: action.boolean,
      };
    case ADD_JJIM:
      const jjimList = [...action.storeList];
      jjimList.push({ store_name: action.store });
      return {
        ...state,
        jjimStore: jjimList,
      };
    case DELETE_JJIM:
      const jjimStoreList = [...action.storeList];
      const idx = jjimStoreList.findIndex(function (item) {
        return item.store_name === action.store;
      });
      jjimStoreList.splice(idx, 1);
      return {
        ...state,
        jjimStore: jjimStoreList,
      };
    default:
      return state;
  }
};

export default reducer;
