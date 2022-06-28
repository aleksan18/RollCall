import { createState } from "@hookstate/core";
import {useState as stateHandler} from "@hookstate/core";

const initialState = {
  lecturesToDisplay:{},
  errors:[]
};

const lectureState = createState(initialState);
/**
 * 
 * Hook element to consume
*/

export const useLectureState = () => {
  return stateHandler(lectureState);
};