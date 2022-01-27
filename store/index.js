import { createStore, applyMiddleware } from "redux"; //스토어 생성을 위한 모듈
import thunk from 'redux-thunk'
import reducer from "../reducer/index"; //스토어에서 실질적으로 일을 할 리덕서 import
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(reducer, applyMiddleware(thunk)); //스토어 생성
