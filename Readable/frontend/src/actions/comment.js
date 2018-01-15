import * as APIUtil from '../utils/api';

import {ADD_COMMENT,UPDATE_COMMENT,VOTE_ON_COMMENT,DELETE_COMMENT} from './types'
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