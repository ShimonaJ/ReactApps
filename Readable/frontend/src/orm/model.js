
import {ORM,fk, many, attr, Model} from 'redux-orm';
import {
    GET_POSTS,
    GET_CATEGORIES,
    VOTE,ADD_POST,DELETE_POST,UPDATE_POST,GET_COMMENTS,ADD_COMMENT,VOTE_ON_COMMENT,UPDATE_COMMENT,DELETE_COMMENT
    
} from '../actions/types';

export class Post extends Model {
    toString() {
        return `Post: ${this.title}`;
    }
    static get fields() {
        return {
           id: attr(),
            title: attr(),
            body: attr(),
            comments: many('Comment', 'posts'),
            author: fk('User', 'posts'),
            category: fk('Category', 'posts'),
            commentCount: attr(),
            deleted: attr(),
            voteScore:attr()
        }
     }
     static get modelName() { return 'Post'}
      static  reducer(action, SessionSpecificMyModel, session) {
             debugger;
          const { payload, type } = action;
        switch (type) {
        case ADD_POST:
            const props = Object.assign({}, payload, { comments: [] });
            SessionSpecificMyModel.create(props);
            break;
     
        case DELETE_POST:
        if(SessionSpecificMyModel.hasId(payload.id)){
                SessionSpecificMyModel.withId(payload.id).delete();
        }
            break;
          case UPDATE_POST:
            SessionSpecificMyModel.upsert(payload);
            break;
           
           case VOTE:
            SessionSpecificMyModel.withId(payload.id).voteScore = payload.voteScore;
            break;
        case GET_POSTS:
            
            for (let item in payload){
               SessionSpecificMyModel.create(Object.assign({}, payload[item], { comments: [] }));
            }
            break;
         case GET_COMMENTS:
            //let a = SessionSpecificMyModel.withId(payload.id).comments;
            debugger;
            SessionSpecificMyModel.withId(payload.post.id).comments.clear();
                
            for (const [key, value] of Object.entries(payload.comments)) {
             SessionSpecificMyModel.withId(payload.post.id).comments.add(value)
              
            }
            break;
         case ADD_COMMENT:
            SessionSpecificMyModel.withId(payload.post.id).commentCount++;
            SessionSpecificMyModel.withId(payload.post.id).comments.add(payload.comment);
            break;
         case DELETE_COMMENT:
         debugger;
            SessionSpecificMyModel.withId(payload.parentId).commentCount--;
            SessionSpecificMyModel.withId(payload.parentId).comments.delete(payload.comment);
            break;
        }

     
    }
}

export class Category extends Model {
    toString() {
        return `Category: ${this.name}`;
    }
     static get fields() {
        return {
           id: attr(), // non-relational field for any value; optional but highly recommended
           name: attr(),
           path: attr()
        }
     }
     static get modelName() { return 'Category'}
      static  reducer(action, SessionSpecificMyModel, session) {
             
          const { payload, type } = action;
        switch (type) {
        // case ADD_COMMENT:
        //     SessionSpecificMyModel.withId(payload).comments = payload;
        //     break;
     
        case GET_CATEGORIES:
            for (let item in payload){
               SessionSpecificMyModel.create(Object.assign({}, payload[item]));
            }
            break;
        
        }
      }
    
}

export class Comment extends Model {
    toString() {
        return `Comment: ${this.body}`;
    }
   static get fields() {
        return {
            id: attr(), // non-relational field for any value; optional but highly recommended
            parentId:  attr(),
            body: attr(),
            voteScore:attr(),
            author: fk('User', 'comments'),
            deleted: attr(),
            parentDeleted:attr()
        }
     }
     static get modelName() { return 'Comment'}
       static  reducer(action, SessionSpecificMyModel, session) {
             
          const { payload, type } = action;
        switch (type) {
              case DELETE_COMMENT:
        if(SessionSpecificMyModel.hasId(payload.id)){
                SessionSpecificMyModel.withId(payload.id).delete();
        }
            break;
        case ADD_COMMENT:
            SessionSpecificMyModel.create(Object.assign({}, payload.comment,{parentId:payload.post.id}));
            break;
        case UPDATE_COMMENT:
            SessionSpecificMyModel.upsert(payload.comment);
            break;
        case GET_COMMENTS:
        
            for (let item in payload.comments){
             if(!SessionSpecificMyModel.hasId(payload.comments[item].id)){
                SessionSpecificMyModel.create(Object.assign({}, payload.comments[item]));
             }
            }
            break;
          case VOTE_ON_COMMENT:
            SessionSpecificMyModel.withId(payload.id).voteScore = payload.voteScore;
            break;
        }
        
      }
}


export class User extends Model {
    toString() {
        return `User: ${this.name}`;
    }
     static get fields() {
        return {
             id: attr(), 
             name: attr()
        }
     }
     static get modelName() { return 'User'}
    
}

export const orm = new ORM();
orm.register(Post, User, Comment,Category);
export default orm;