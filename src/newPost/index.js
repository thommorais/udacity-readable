import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { newPost, editPost } from '../AllPosts/actions'

class NewPostForm extends PureComponent{

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
    enableSubmission: false
  }

  enableSubmission = () => {

    const {title, body, author, category} = this.state

    if (title.length > 5 && body.length > 5 && !!category && author.length > 1){
      this.setState( () =>  ({enableSubmission: true}) )
    } else {
      this.setState( () =>  ({enableSubmission: false}) )
    }

  }

  updateTitle = ({target}) => {
    this.setState(({title}) => ({title: target.value}), () => this.enableSubmission() )
  }

  updateAuthor = ({target}) => {
    this.setState( ({author}) => ({author: target.value}), () => this.enableSubmission())
  }

  updateBody = ({target}) => {
     this.setState( ({body}) => ({body: target.value}), () => this.enableSubmission() )
  }

  updateCategory = ({target}) => {
    this.setState( ({category}) => ({category: target.value}), () => this.enableSubmission() )
  }

  handleSubmit = event => {
    event.preventDefault()

    const {title, body, author, category, id, voteScore} = this.state
    const {mode} = this.props

    this.props[mode]({
        id : id || Math.random().toString(24).substr(2, 24),
        timestamp: Date.now(),
        title,
        body,
        author,
        category,
        voteScore: voteScore || 1
    })

    this.showForm()
  }

  showForm = () => {
    this.props.closer()
    this.clearForm()
  }

  clearForm = () => {
    this.setState( () => ({
      title: '',
      author : '',
      body : '',
      category: null
    }))
  }

  componentDidMount(){

    if(this.props.post){
        const {title, author, body, category, id} = this.props.post

        this.setState({
          title,
          author,
          body,
          category,
          id
        }, () => this.enableSubmission())
    }

  }

  render(){

    const {categories} = this.props
    const {enableSubmission, title, author, category, body } = this.state

    return (<div className="overlay modal">
              <h1>Create your amazing post</h1>
              <form onSubmit={this.handleSubmit} className="new-post-form">
                <div className="field">
                    <input type="text" name="title" placeholder="Title" defaultValue={title} onChange={this.updateTitle} />
                </div>
                <div className="field">
                    <input type="text" name="author" placeholder="Author" autoComplete="name" defaultValue={author} onChange={this.updateAuthor} />
                </div>
                <div className="field">
                    <select id="category" onChange={this.updateCategory} value={category}>
                      <option value="">Category</option>
                      {categories.map(cat => <option key={cat.path} value={cat.name} >{cat.name}</option>)}
                    </select>
                </div>
                <div className="field">
                    <textarea placeholder="Post" onChange={this.updateBody} value={body}></textarea>
                </div>
                <div className="field">
                  <button type="button" onClick={this.showForm} className="cancel-published">cancel</button>
                  <button type="submit" disabled={enableSubmission ? false : true}>Publish</button>
                </div>
              </form>
              <div className="background" onClick={this.showForm}></div>
          </div>)
  }

}

const mapStateToProps = ({categories}) => {
  return {categories}
}

const mapDispatchToProps = dispatch => {
  return {
    newPost: post => dispatch(newPost(post)),
    editPost: post => dispatch(editPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm)

