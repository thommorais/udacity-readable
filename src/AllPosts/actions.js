import { fetchPosts, addPost, removePost } from '../utils/API'
import { api } from '../enviroments'

export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const SAVE_POST = 'SAVE_POST'
export const GET_POST = 'GET_POST'
export const IS_LOADING = 'IS_LOADING'
export const UPDATE_POST_VOTE = 'UPDATE_POST_VOTE'
export const NEW_POST = 'NEW_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const COMMENTS_COUNT = 'COMMENTS_COUNT'

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

// remove post
const removePostByIdAction = postID => {
  return {
    type: REMOVE_POST,
    postID
  }
}


export function removePostById(postId){
    const url = `${api}/posts/${postId}`
    return async(dispatch) => {
        await dispatch(removePostByIdAction(postId))
        await removePost(url)
    }
}

// Edit Post
const editPostAction = post => {
  return {
    type: EDIT_POST,
    post
  }
}

export function editPost(post){

    const url = `${api}/posts/${post.id}`

    return async(dispatch) => {
        await addPost(url, post, 'PUT')
        await dispatch(editPostAction(post))
    }

}

export function updateCommentCount(updateComment) {
    return {
        type: COMMENTS_COUNT,
        updateComment
    }
}