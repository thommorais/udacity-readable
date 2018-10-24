import { api, } from '../enviroments'
import { fetchPosts, addPost } from '../utils/API'

export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT_VOTE = 'UPDATE_COMMENT_VOTE'

// load categories
const getCommentsAction = comments => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function loadComments(id) {

    const url = `${api}/posts/${id}/comments`

    return async(dispatch) => {
        const comments = await fetchPosts(url)
        await dispatch(getCommentsAction(comments))
    }
}

// create comment
const createCommentAction = comment => {
  return {
    type: ADD_COMMENT,
    comment
  }
}


export function addComment(comment){

    const url = `${api}/comments`

    return async(dispatch) => {
        await addPost(url, comment)
        await dispatch(createCommentAction(comment))
    }
}


// // update comment vote
const updateCommentVoteAction = ({option}, id) => {
  return {
    type: UPDATE_COMMENT_VOTE,
    option,
    id
  }
}

export function updateCommentVote(vote, id){

    const url = `${api}/comments/${id}`

    return async(dispatch) => {
        await addPost(url, vote)
        await dispatch(updateCommentVoteAction(vote, id))
    }

}
