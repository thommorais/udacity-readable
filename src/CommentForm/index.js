import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../Comments/actions'

class CommentForm extends Component {

  state = {
    createComment : false,
    author: '',
    comment: ''
  }

  handleName = (event) =>{
    // if(!target || !target.value ) return
    this.setState({author: event.target.value})
  }

  handleComment = (event) =>{
    // if(!target || !target.value ) return
    this.setState({body: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const {author, body} = this.state
    const parentId = this.props.id
    const id = Math.random().toString(24).substr(2, 24)

    this.props.addComment({
      author,
      body,
      id,
      parentId,
      voteScore: 0,
      timestamp : Date.now()
    })

    this.setState( () => ({
      author : '',
      body : ''
    }))

  }

  createComment = () => {
    const createComment = !this.state.createComment
    this.setState({createComment})
  }

  render(){

    const {createComment, author, body} = this.state

    if(!createComment)
      return <button type="button" onClick={this.createComment}>ok, share your amazing opinion</button>
    else
       return <form onSubmit={this.handleSubmit}>

         <div className="field">
           <label htmlFor="author">Author</label>
           <input type="text" value={author} id="author" name="author" onChange={this.handleName} />
         </div>

         <div className="field">
           <label htmlFor="comment">Comment</label>
           <textarea id="Comment" onChange={this.handleComment} value={body}></textarea>
         </div>

         <div className="field">
           <button type="submit" disabled={!author || !body}>Enviar</button>
         </div>

       </form>
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: comment => dispatch(addComment(comment))
  }
}

export default connect(
    null,
    mapDispatchToProps
  )(CommentForm)

