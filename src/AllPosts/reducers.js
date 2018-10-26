import {GET_ALL_POSTS, UPDATE_POST_VOTE, NEW_POST, REMOVE_POST, EDIT_POST, COMMENTS_COUNT} from './actions'

export default function getAllPosts(state = [], action) {

    switch(action.type){

        case NEW_POST: {
            const {post} = action
            return [...state, post]
        }

        case GET_ALL_POSTS: {
            const {posts} = action
            return [...state, ...posts]
        }

        case UPDATE_POST_VOTE: {

            const {id, option} = action

            const update = state.map(post => {
                if(post.id === id) {
                    return {
                        ...post,
                        voteScore: post.voteScore + (option === 'downVote' ? -1 : 1)
                    }
                }
                return post
            })

            return update
        }

        case COMMENTS_COUNT: {

            const {updateComment} = action

            const update = state.map(post => {
                if(post.id === updateComment.parentId) {
                    return {
                        ...post,
                        commentCount: (post.commentCount ? post.commentCount : 0) + updateComment.count
                    }
                }
                return post
            })

            return update
        }

        case REMOVE_POST: {
            const { postID } = action
            return state.filter(post => post.id !== postID)
        }

        case EDIT_POST: {
            const { post } = action
			return [...state.filter(each => each.id !== post.id ), post]
        }

        default:{
            return state
        }

    }

}
