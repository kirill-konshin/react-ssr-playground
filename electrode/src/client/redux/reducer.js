import {combineReducers} from "redux";

const page = (state = "init", {type, payload}) => {
  if (type === "LOAD_PAGE") {
    return payload;
  }
  return state;
};

const checkBox = (state = false, {type}) => {
  if (type === "TOGGLE_CHECK") {
    return !state;
  }
  return state;
};

const number = (state = 0, {type}) => {
  if (type === "INC_NUMBER") {
    return ++state;
  } else if (type === "DEC_NUMBER") {
    return --state;
  }

  return state;
};

export default combineReducers({
  page,
  checkBox,
  number
});
