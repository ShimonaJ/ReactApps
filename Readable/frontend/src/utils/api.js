const BASE_PATH='http://localhost:3001'
const header={ 'Authorization': 'ok',"Content-Type":"application/json" }

export const fetchPosts = (data) => fetch(BASE_PATH+'/posts'+(data?'/'+data:''),{method:'GET',headers: header});
export const fetchCategories = () => fetch(BASE_PATH+'/categories',{method:'GET',headers: header});
export const fetchComments = (post) => fetch(BASE_PATH+'/posts/'+post.id+'/comments',{method:'GET',headers: { 'Authorization': 'none' }});
export const vote = (id,option) => {
    return fetch(BASE_PATH+'/posts/'+id,{method:'POST',headers:header,
body:JSON.stringify({
      option
    })})};
export const updatePost = (post) => {
    return fetch(BASE_PATH+'/posts/'+post.id,{method:'PUT',headers:header,
body:JSON.stringify({
      ...post
    })})};
export const addPost = (post) => {
    return fetch(BASE_PATH+'/posts',{method:'POST',headers:header,
body:JSON.stringify({
      ...post
    })})};
export const deletePost = (post) => fetch(BASE_PATH+'/posts/'+post.id,{method:'DELETE',headers: { 'Authorization': 'none' }});
export const deleteComment = (comment) => fetch(BASE_PATH+'/comments/'+comment.id,{method:'DELETE',headers: { 'Authorization': 'none' }});
export const voteOnComment = (id,option) => {
    return fetch(BASE_PATH+'/comments/'+id,{method:'POST',headers:header,
body:JSON.stringify({
      option
    })})};
export const updateComment = (comment) => {
    return fetch(BASE_PATH+'/comments/'+comment.id,{method:'PUT',headers:header,
body:JSON.stringify({
      ...comment
    })})};
export const addComment = (comment) => {
    return fetch(BASE_PATH+'/comments',{method:'POST',headers:header,
body:JSON.stringify({
      ...comment
    })})};