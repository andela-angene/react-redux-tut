import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypesEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(
  state = initialState.numAjaxCallsInProgress, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (actionTypesEndsInSuccess(action.type)
    || action.type === types.END_AJAX_CALL) {
    return state - 1;
  }

  return state;
}
