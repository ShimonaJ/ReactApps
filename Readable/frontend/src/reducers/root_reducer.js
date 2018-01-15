import { combineReducers } from 'redux'
import { orm } from '../orm/model';
import { createReducer } from 'redux-orm';
import { selectedCategoryIdReducer} from './selectedCategory'
import { selectedSortByReducer} from './selectedSortBy'

export default combineReducers({
    orm: createReducer(orm),
    selectedCategory: selectedCategoryIdReducer,
    sortBy:selectedSortByReducer
})