import { combineReducers } from 'redux'
import { orm } from '../orm/model';
import { createReducer } from 'redux-orm';
import {
  SELECT_CATEGORY,
  SORT_BY
} from '../actions'


//const normalizedData = normalize(originalData, article);
 function selectedCategoryIdReducer(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
    case SELECT_CATEGORY:
        return payload;
    default:
        return state;
    }
}
function selectedSortByReducer(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
    case SORT_BY:
        return payload;
    default:
        return state;
    }
}

export default combineReducers({
    orm: createReducer(orm),
    selectedCategory: selectedCategoryIdReducer,
    sortBy:selectedSortByReducer
})