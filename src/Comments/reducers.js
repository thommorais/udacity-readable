import {GET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT_VOTE} from './actions'


// [...state, ...comments].filter((comment, index, self) =>
//   index === self.findIndex(({id}) => id === comment.id )
// )

 export function comments(state = [], action) {

  const { type, comments } = action

  switch (type) {

    case GET_COMMENTS:

      return [...comments]

    case ADD_COMMENT:

      const { comment } = action
      return [...state, comment]

    case UPDATE_COMMENT_VOTE:

      const {id, option} = action

      const update = state.map(comment => {
          if(comment.id === id)
              comment.voteScore = comment.voteScore + (option === 'downVote' ? -1 : 1)
          return comment
      })

      return [...update]

    default:
      return state

  }

}