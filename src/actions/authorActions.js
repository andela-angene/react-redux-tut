import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import { beginAjaxCall, endAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then((authors) => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch((error) => {
      dispatch(endAjaxCall());
      throw (error);
    });
  };
}
