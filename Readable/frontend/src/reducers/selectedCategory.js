import {
  SELECT_CATEGORY
} from '../actions/types'
export function selectedCategoryIdReducer(state = 0, action) {
    const { type, payload } = action;
    switch (type) {
    case SELECT_CATEGORY:
        return payload;
    default:
        return state;
    }
}