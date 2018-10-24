import {GET_ALL_POSTS, UPDATE_POST_VOTE, NEW_POST} from './actions'

export default function getAllPosts(state = [], action) {

    const {type, posts} = action

    switch(type){
        case NEW_POST:
            const { post } = action
            return [...state, post]

        case GET_ALL_POSTS:
            return [...state, ...posts]

        case UPDATE_POST_VOTE:

            const {id, option} = action

            const update = state.map(post => {
                if(post.id === id)
                    post.voteScore = post.voteScore + (option === 'downVote' ? -1 : 1)
                return post
            })

            return [...update]

        default:
            return [...state]
    }

}
