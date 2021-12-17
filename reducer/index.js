const initState = {
  userToken: null,
  url: "http://3.35.67.117:8000",
  mapMiddleCatBtn: null, // map에서 선택된 중분류
  largeCat: null, // home에서 대분류 목록 아예 가져옴
  middleCat: {},
};

const RESTORE_TOKEN = "RESTORE_TOKEN";
const MAP_MIDDLECAT_BTN = "MAP_MIDDLECAT_BTN";
const LARGE_CATEGORY = "LARGE_CATEGORY";

export const restoreToken = (token) => ({
  type: RESTORE_TOKEN,
  token,
});

export const mapMiddleCatClick = (cat) => ({
  type: MAP_MIDDLECAT_BTN,
  cat,
});

export const largeCategory = (cat) => ({
  type: LARGE_CATEGORY,
  cat,
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
      };
    case MAP_MIDDLECAT_BTN:
      return {
        ...state,
        mapMiddleCatBtn: action.cat,
      };
    case LARGE_CATEGORY:
      return {
        ...state,
        largeCat: action.cat,
      };
    default:
      return state;
  }
};

export default reducer;
