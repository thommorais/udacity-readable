import {GET_CATEGORIES, SET_CURRENT_CATEGORY } from './actions'


export function categories(state = [], action) {

  const {type, categories} = action

  switch (type) {

    case GET_CATEGORIES:
      return [...state, ...categories.categories]

    default:
      return state
  }
}

export function currentCategory(state = null,  action) {

  const {type} = action

  switch (type) {

    case SET_CURRENT_CATEGORY:
      const {currentCategory} = action
      return currentCategory

    default:
      return state
  }
}

