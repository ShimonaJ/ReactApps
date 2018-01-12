import * as APIUtil from '../utils/api';
export const ADD_COMMENT ='ADD_COMMENT'
export const UPDATE_COMMENT ='UPDATE_COMMENT'
export const GET_COMMENTS ='GET_COMMENTS'
export const VOTE_ON_COMMENT = 'VOTE_ON_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const receiveComments = (resp,item) => ({
  type: GET_COMMENTS,
  payload:{comments:resp,post:item}
});

export const fetchComments = (item) => dispatch => (
  APIUtil
      .fetchComments(item)
      .then(resp => resp.json())
      .then(resp => dispatch(receiveComments(resp,item)))
);
export const receiveOnVoteOnComment = (resp) => {
 // item.voteScore = resp.voteScore;
 return {
  type: VOTE_ON_COMMENT,
  payload:resp
};
}

export const voteOnComment = (item,val) => dispatch => (
  APIUtil
      .voteOnComment(item.id,val?"upVote":"downVote")
      .then(resp => resp.json())
      .then(resp => dispatch(receiveOnVoteOnComment(resp)))
);
export const receiveOnUpdateComment = (post,comment) => {
 
 return {
  type: UPDATE_COMMENT,
  payload:{post,comment}
};
}

export const updateComment = (post,params) => dispatch => (

  APIUtil
      .updateComment(params)
      .then(resp => resp.json())
      .then(resp => dispatch(receiveOnUpdateComment(post,resp)))
);
export const receiveOnDeleteComment = (resp) => {
 return {
  type: DELETE_COMMENT,
 payload: resp
};
}

export const deleteComment = (params) => dispatch => (
  APIUtil
      .deleteComment(params)
      .then(resp => resp.json())
      .then(resp => dispatch(receiveOnDeleteComment(params)))
);
export const receiveOnAddComment = (post,comment) => {
 
 return {
  type: ADD_COMMENT,
  payload:{post,comment}
};
 
}

export const addComment = (post,params) => dispatch => (

  APIUtil
      .addComment(params)
      .then(resp => resp.json())
      .then(resp =>{ dispatch(receiveOnAddComment(post,resp));
      	})
 
);