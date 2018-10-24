import { fetchPosts, addPost } from '../utils/API'
import { api } from '../enviroments'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SAVE_POST = 'SAVE_POST'
export const GET_POST = 'GET_POST'
export const IS_LOADING = 'IS_LOADING'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'
export const NEW_POST = 'NEW_POST'

export function isLoading(isLoading) {
    return {
        type: IS_LOADING,
        isLoading
    }
}

// get all posts
export function fetchPostsAction(posts = []) {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export function getPosts(url = 'posts') {
    return async(dispatch) => {
        await dispatch(isLoading(true))
        const posts = await fetchPosts(`${api}/${url}`)
        await dispatch(fetchPostsAction(posts))
        await dispatch(isLoading(true))
    }
}



// update comment vote
const postVoteAction = (id, {option}) => {
  return {
    type: UPDATE_POST_VOTE,
    id,
    option
  }
}

export function updatePostVote(vote, id){

    const url = `${api}/posts/${id}`

    return async(dispatch) => {
        await addPost(url, vote)
        await dispatch(postVoteAction(id, vote))
    }

}

// add new post
const newPostAction = post => {
  return {
    type: NEW_POST,
    post
  }
}

export function newPost(post){

    const url = `${api}/posts`

    return async(dispatch) => {
        await dispatch(newPostAction(post))
        await addPost(url, post)
    }

}