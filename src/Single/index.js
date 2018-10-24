import React, {PureComponent} from 'react'
// import { connect } from 'react-redux'
// import { loadPost } from './actions'
import PostHeader from '../AllPosts/PostHeader'
import PostBody from '../AllPosts/PostBody'
import CommentList from '../Comments'
import CommentForm from '../CommentForm'
import VoteControl from '../voteControl'
import { setCategory } from '../Categories/actions'
import { connect } from 'react-redux'

class Single extends PureComponent{

  componentDidMount(){
    const {currentCategory, changeCat} = this.props
    changeCat(currentCategory)
  }

  render(){
    const {post} = this.props
    return post.map(post => (
      <article key={post.id} className="post single">
        <div className="single-wrp">
          <PostHeader post={post} />
          <VoteControl currentCount={post.voteScore} id={post.id} type="posts" />
          <PostBody post={post} />
        </div>
        <CommentList id={post.id} />
        <CommentForm id={post.id} />
      </article>
    ))
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCat: (category) => dispatch(setCategory(category)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Single)
