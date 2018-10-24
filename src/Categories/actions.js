import { api, } from '../enviroments'
import { fetchPosts } from '../utils/API'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

// load categories
const getCategories = categories => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export function loadCategories(url = 'categories') {
    return async(dispatch) => {
        const categories = await fetchPosts(`${api}/${url}`)
        await dispatch(getCategories(categories))
    }
}


// set category
export const setCategory = (category = null) => {
  return {
    type: SET_CURRENT_CATEGORY,
    currentCategory: category
  }
}
