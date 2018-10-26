import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addComment, editComment } from '../Comments/actions'
import {updateCommentCount} from '../AllPosts/actions'

class CommentForm extends PureComponent {

  state = {
    createComment : false,
    author: '',
    body: ''
  }

  handleName = event =>{
    this.setState({author: event.target.value})
  }

  handleComment = event =>{
    this.setState({body: event.target.value})
  }

  handleSubmit = event => {

    event.preventDefault()

    const {author, body, id, mode, parentId, voteScore} = this.state

    this.props[mode]({
      author,
      body,
      parentId,
      voteScore: voteScore || 0,
      timestamp : Date.now(),
      id: id || Math.random().toString(24).substr(2, 24),
    })

    this.setState( () => ({ author:'', body:'' }), () => this.props.closer())

    this.props.updateCommentCount({parentId, count: 1})

  }

  createComment = () => {
    const createComment = !this.state.createComment
    this.setState({createComment})
  }

  componentDidMount(){

    const {comment, mode} = this.props
    const parentId = this.props.id || comment.parentId

    if(comment){

      const {body, id, author, voteScore } = comment

      this.setState({
        body,
        author,
        voteScore,
        id: id || Math.random().toString(24).substr(2, 24)
      })

    }

    this.setState({mode, parentId})

  }

  render(){

    const {author, body} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="author">Author</label>
          <input type="text" defaultValue={author} id="author" name="author" onChange={this.handleName} />
        </div>
        <div className="field">
          <label htmlFor="comment">Comment</label>
          <textarea id="Comment" onChange={this.handleComment} value={body}></textarea>
        </div>
        <div className="field">
          <button type="submit" disabled={!author || !body}>Enviar</button>
        </div>
      </form>
    )

  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: comment => dispatch(addComment(comment)),
    editComment: comment => dispatch(editComment(comment)),
    updateCommentCount: updateComment =>  dispatch(updateCommentCount(updateComment))
  }
}

export default connect(
    null,
    mapDispatchToProps
  )(CommentForm)

