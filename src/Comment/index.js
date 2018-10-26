import React, {PureComponent} from 'react'
import VoteControl from '../voteControl'
import { connect } from 'react-redux'
import { deleteComment } from '../Comments/actions'
import CommentForm from '../CommentForm'
import {updateCommentCount} from '../AllPosts/actions'

class Comment extends PureComponent{

  state = {
    editing: false
  }

  editPost = () => {
    this.setState( ({editing}) => ({editing: !editing}) )
  }

  deleteComment = () => {
    const { deleteComment, comment, updateCommentCount} = this.props
    const {parentId, id} = comment
    deleteComment(id)
    updateCommentCount({parentId, count: -1})
  }

  render(){

    const {comment} = this.props
    const {id, body, author, voteScore} = comment
    const { editing } = this.state

    return (<React.Fragment>
      {
        !editing ? <article className="comment" key={id}>
          <h5>{author}</h5>
          <p>{body}</p>
          <VoteControl currentCount={voteScore} id={id} type="comments" />
          <div className="post-tools">
            <button className="button small" type="button" id="delete-post" onClick={ () => this.deleteComment(id)}>✕</button>
            <button className="button small" type="button" id="edit-post"  onClick={ () => this.editPost() } >✎</button>
          </div>
        </article> :
        <CommentForm closer={this.editPost} comment={comment} mode="editComment" />
      }
    </React.Fragment>)

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    updateCommentCount: updateComment =>  dispatch(updateCommentCount(updateComment))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Comment)
