import { createStore } from "redux"; //스토어 생성을 위한 모듈
import reducer from "../reducer/index"; //스토어에서 실질적으로 일을 할 리덕서 import

export const store = createStore(reducer); //스토어 생성
