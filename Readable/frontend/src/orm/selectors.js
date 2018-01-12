// selectors.js

import { orm } from './model';
import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
// Selects the state managed by Redux-ORM.
export const ormSelector = state => state.orm;

// Redux-ORM selectors work with reselect. To feed input
// selectors to a Redux-ORM selector, we use the reselect `createSelector` function.
export const posts = createSelector(
    // The first input selector should always be the orm selector.
    // Behind the scenes, `schema.createSelector` begins a Redux-ORM
    // session with the value returned by `ormSelector` and passes
    // that Session instance as an argument instead.
    // So `orm` below is a Session instance.
    ormSelector,
    state => state.selectedCategory,
     state =>state.sortBy,
    //schema.createSelector((orm, categoryId) => {
    ormCreateSelector(orm, (session, selectedCategory,sortBy) => {
        console.log('Running todos selector' +sortBy);
        
        let obj =session.Post.all();
        
        if(selectedCategory!==undefined && selectedCategory!==""){
            obj = obj.filter({ category: selectedCategory });
        }
        return obj.toModelArray().map(post => {
            // `todo.ref` is a direct reference to the state,
            // so we need to be careful not to mutate it.
            //
            // We want to add a denormalized `tags` attribute
            // to each of our todos, so we make a shallow copy of `todo.ref`.
            const obj = Object.assign({}, post.ref);
            obj.comments = session.Comment.all().toRefArray().filter(comment => comment.parentId===post.id);

            return obj;
        }).sort((a,b)=>{
            if( sortBy==="votescore"){
                return Number(a.voteScore)<Number(b.voteScore)
            }
             return Number(a.timestamp)<Number(b.timestamp)
        });
    })
);

export const category = createSelector(
    ormSelector,
    state => state.selectedCategoryId,
    ormCreateSelector(orm, (session, selectedCategoryId) => {
        console.log('Running user selector');
        // .ref returns a reference to the plain
        // JavaScript object in the store.
        // It includes the id and name that we need.
        return orm.Category.withId(selectedCategoryId).ref;
    })
);

export const categories = createSelector(
    ormSelector,
     ormCreateSelector(orm, session => {
        console.log('Running users selector');

        // `.toRefArray` returns a new Array that includes
        // direct references to each User object in the state.
        return session.Category.all().toRefArray();
    })
);