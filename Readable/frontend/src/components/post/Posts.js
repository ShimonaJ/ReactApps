import React from 'react'
import TopToolbar from '../common/ToolBar'
import Post from './Post';

export const Posts=(props)=>{

    let {posts,onLike,onDelete,fetchComments,onLikeComment,onSortChange,sortBy} = props;
   
    return (<div style={{ marginLeft: '280px', padding: '80px 20px 20px 10px' }}>
      <TopToolbar sortByValue={sortBy} showBack={false} onSortChange={onSortChange} title="All posts"></TopToolbar>
      <div>
        {Object.values(posts).map((op) =>
         <Post fetchComments={fetchComments}
         onDelete={onDelete} onLikeComment={onLikeComment}
          isDetailPage={false} onUpdate={(params)=>props.onUpdate(params,op)} key={op.id} onLike={onLike} item={op} ></Post>
        )}
      </div>
      
    </div>);
  
}
