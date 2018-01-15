import {
 
  SORT_BY
} from '../actions/types'


export function selectedSortByReducer(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
    case SORT_BY:
        return payload;
    default:
        return state;
    }
}