import {GET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT_VOTE, REMOVE_COMMENT, EDIT_COMMENT, COMMENTS_COUNT} from './actions'

 export function comments(state = [], action) {

  const { type, comments } = action

  switch (type) {

    case GET_COMMENTS:{
        return [...comments]
    }

    case ADD_COMMENT:{
      const { comment } = action
      return [...state, comment]
    }

    case EDIT_COMMENT:{
      const { comment } = action
      return [...state.filter(each => each.id !== comment.id ), comment]
    }

    case REMOVE_COMMENT: {
      const { commentID } = action
      return state.filter(comment => comment.id !== commentID)
    }

    case UPDATE_COMMENT_VOTE:{

      const {id, option} = action
      const update = state.map(comment => {
          if(comment.id === id)
              comment.voteScore = comment.voteScore + (option === 'downVote' ? -1 : 1)
          return comment
      })

      return [...update]
    }

    default: {
      return state
    }


  }

}
