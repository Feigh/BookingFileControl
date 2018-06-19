import { createStore } from "redux";
import { enthusiasm } from "../reducers/index";
import {IStoreState} from "../types/index";

export default function configureStore(intialState: IStoreState) {
  return createStore<IStoreState>(enthusiasm, intialState);
}