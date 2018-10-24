import {combineReducers} from 'redux'
import posts from './AllPosts/reducers'
import {categories, currentCategory} from './Categories/reducers'
import {comments} from './Comments/reducers'

export default combineReducers({
    posts,
    comments,
    categories,
    currentCategory
})