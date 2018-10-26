import React, {PureComponent} from 'react'
// import { connect } from 'react-redux'
// import { loadPost } from './actions'
import PostHeader from '../AllPosts/PostHeader'
import PostBody from '../AllPosts/PostBody'
import {removePostById} from '../AllPosts/actions'
import CommentList from '../Comments'
import CommentForm from '../CommentForm'
import VoteControl from '../voteControl'
import { setCategory } from '../Categories/actions'
import { connect } from 'react-redux'
import NewPostForm from '../newPost'

class Single extends PureComponent{

  state = {
    editingPost : false,
    creatingAcomment: false
  }

  componentDidMount(){
    const {currentCategory, changeCat} = this.props
    changeCat(currentCategory)
  }

  editCurrentPost = () => {
    this.setState(({editingPost}) => ({editingPost: !editingPost}))
  }

  createComment = () => {
      this.setState(({creatingAcomment}) => ({creatingAcomment: !creatingAcomment}))
  }

  render(){

    const {editingPost, creatingAcomment} = this.state
    const {post, deletePost} = this.props

    if (!post.length){
      return <h2>You have deleted a post that was here for decades</h2>
    }

    return <React.Fragment>
      {
          post.map(post => (
            <article key={post.id} className="post single">
              <div className="single-wrp">
                <PostHeader post={post} />
                <VoteControl currentCount={post.voteScore} id={post.id} type="posts" />
                <PostBody post={post} />
                <div className="post-tools">
                  <button className="button small" type="button" id="delete-post" onClick={() => deletePost(post.id)}>✕</button>
                  <button className="button small" type="button" id="edit-post" onClick={this.editCurrentPost}>✎</button>
                </div>
              </div>
              <CommentList id={post.id} />
              {!creatingAcomment && <button type="button" onClick={this.createComment}>ok, share your amazing opinion</button>}
              {!!creatingAcomment && <CommentForm id={post.id} closer={this.createComment} mode="addComment" />}
            </article>
          ))
      }
      {!!editingPost && <NewPostForm post={{...post[0]}} mode="editPost" closer={this.editCurrentPost} />}
    </React.Fragment>

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCat: (category) => dispatch(setCategory(category)),
    deletePost: postId => dispatch(removePostById(postId))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Single)
