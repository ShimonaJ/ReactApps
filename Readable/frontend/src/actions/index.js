import * as APIUtil from '../utils/api';
export const GET_POSTS = 'GET_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const VOTE = 'VOTE'

export const UPDATE_POST = 'UPDATE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST ='DELETE_POST'
export const SELECT_CATEGORY ='SELECT_CATEGORY'
export const SORT_BY ='SORT_BY'



export const receiveCategories = resp => ({
  type: GET_CATEGORIES,
  payload:resp
});

export const fetchCategories = () => dispatch => (
  APIUtil
      .fetchCategories()
      .then(resp => resp.json())
      .then(resp => dispatch(receiveCategories(resp)))
);

export const receivePosts = resp => ({
  type: GET_POSTS,
  payload:resp
});

export const fetchPosts = (data) => dispatch => (
  APIUtil
      .fetchPosts(data)
      .then(resp => resp.json())
      .then(resp => dispatch(receivePosts(resp)))
);
export const receiveOnVote = (resp) => {
 // item.voteScore = resp.voteScore;
 return {
  type: VOTE,
  payload:resp
};
}

export const vote = (item,val) => dispatch => (
  APIUtil
      .vote(item.id,val?"upVote":"downVote")
      .then(resp => resp.json())
      .then(resp => dispatch(receiveOnVote(resp)))
);

export const receiveOnUpdatePost = (resp) => {
 
 return {
  type: UPDATE_POST,
  payload:resp
};
}

export const updatePost = (params) => dispatch => (

  APIUtil
      .updatePost(params)
      .then(resp => resp.json())
      .then(resp => dispatch(receiveOnUpdatePost(resp)))
);
export const receiveOnAddPost = (resp) => {
 
 return {
  type: ADD_POST,
  payload:resp
};
 
}

export const addPost = (params) => dispatch => (

  APIUtil
      .addPost(params)
      .then(resp => resp.json())
      .then(resp =>{ dispatch(receiveOnAddPost(resp));
      	})
 
);
export const receiveOnDeletePost = (resp) => {
 return {
  type: DELETE_POST,
 payload: resp
};
}

export const deletePost = (params) => dispatch => (
  APIUtil
      .deletePost(params)
      .then(resp => resp.json())
      .then(resp => dispatch(receiveOnDeletePost(params)))
);
export const receiveOnSelectCategory = (name) => {
 return {
  type: SELECT_CATEGORY,
  payload:name
};
}
export const selectCategory = (name) => dispatch => (
  dispatch(receiveOnSelectCategory(name))
);
export const receiveOnSortBy = (name) => {
 return {
  type: SORT_BY,
  payload:name
};
}
export const selectSortBy = (name) => dispatch => (
  dispatch(receiveOnSortBy(name))
);
