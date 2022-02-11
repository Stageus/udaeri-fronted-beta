const initState = {
  tokenCheck: false,
  userNickname: null,
  sponsorCheck: null,
  loginTime: null,
  tokenExpiredTime: null,
  url: "https://udaeri.com",
  mainColor: "#ffaa56",
  BGColor1: "#F1F1F5",
  BGColor2: "#F8F8FA",
  fontColor1: "#191919",
  fontColor2: "#767676",
  fontColor3: "#999999",
  lineColor1: "#191919",
  lineColor2: "#D3D3D3",
  lineColor3: "#EDEDED",
  largeCatList: null,
  midCatList: null,
  curLargeCat: null,
  curMidCat: null,

  curMidCatList: null,
  storeReviews: null,
  curStore: null,
  jjimStore: null,
  jjimState: null,

  recentSearchList: [],
};

const CHECK_TOKEN = "CHECK_TOKEN";
const RESOTRE_USER_NICKNAME = "RESOTRE_USER_NICKNAME";
const CHECK_SPONSOR = "CHECK_SPONSOR";
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
const RESTORE_STORE_REVIEWS = "RESTORE_STORE_REVIEWS";
const CHECK_JJIM = "CHECK_JJIM";
const ADD_JJIM = "ADD_JJIM";
const DELETE_JJIM = "DELETE_JJIM";

const RESTORE_RECENT_SEARCH = "RESTORE_RECENT_SEARCH";
const ADD_RECENT_SEARCH = "ADD_RECENT_SEARCH";
const DELETE_RECENT_SEARCH = "DELETE_RECENT_SEARCH";

export const checkToken = (token) => ({
  type: CHECK_TOKEN,
  token,
});

export const restoreUserNickname = (nickname) => ({
  type: RESOTRE_USER_NICKNAME,
  nickname,
});

export const checkSponsor = (value) => ({
  type: CHECK_SPONSOR,
  value,
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

export const restoreStoreReviews = (storeReviews) => ({
  type: RESTORE_STORE_REVIEWS,
  storeReviews,
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

export const addJjim = (storeList, store, category) => ({
  type: ADD_JJIM,
  storeList,
  store,
  category,
});

export const deleteJjim = (storeList, store) => ({
  type: DELETE_JJIM,
  storeList,
  store,
});

export const restoreSearchWord = (searchList) => ({
  type: RESTORE_RECENT_SEARCH,
  searchList,
});

export const addSearchWord = (searchWordList, word) => ({
  type: ADD_RECENT_SEARCH,
  searchWordList,
  word,
});

export const deleteSearchWord = (searchWordList, word) => ({
  type: DELETE_RECENT_SEARCH,
  searchWordList,
  word,
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    // case RESTORE_TOKEN:
    //   return {
    //     ...state,
    //     userToken: action.token,
    //   };
    case CHECK_TOKEN:
      return {
        ...state,
        tokenCheck: action.token,
      };
    case RESOTRE_USER_NICKNAME:
      return {
        ...state,
        userNickname: action.nickname,
      };
    case CHECK_SPONSOR:
      return {
        ...state,
        sponsorCheck: action.value,
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
    case RESTORE_STORE_REVIEWS:
      return {
        ...state,
        storeReviews: action.storeReviews,
      };
    case ADD_CUR_MIDCATLIST:
      state.curMidCatList[action.curMidCat] = state.curMidCatList[
        action.curMidCat
      ].concat(action.addStoreList);
      return {
        ...state,
        curMidCatList: state.curMidCatList,
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
      jjimList.push({ store_name: action.store, l_category: action.category });
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
    case RESTORE_RECENT_SEARCH:
      return {
        ...state,
        recentSearchList: action.searchList,
      };
    case ADD_RECENT_SEARCH:
      let searchList;
      if (!action.searchWordList) {
        searchList = [];
        searchList.unshift(action.word);
      } else {
        searchList = [...action.searchWordList];
        const idx2 = searchList.indexOf(action.word);
        if (idx2 === -1) {
          searchList.unshift(action.word);
        } else {
          searchList.splice(idx2, 1);
          searchList.unshift(action.word);
        }
      }

      return {
        ...state,
        recentSearchList: searchList,
      };
    case DELETE_RECENT_SEARCH:
      const searchList2 = [...action.searchWordList];
      const idx3 = searchList2.indexOf(action.word);
      searchList2.splice(idx3, 1);
      return {
        ...state,
        recentSearchList: searchList2,
      };
    default:
      return state;
  }
};

export default reducer;
