import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { newPost } from '../AllPosts/actions'
import { Debounce } from 'react-throttle'

class NewPostForm extends PureComponent{

  state = {
    title: '',
    author: '',
    body: '',
    category: '',
    showForm: false,
    enableSubmission: false
  }

  enableSubmission = () => {

    const {title, body, author, category} = this.state

    console.log(body.length)

    if(!title || !body.length || !category || !author)
      this.setState( ({enableSubmission}) =>  ({enableSubmission: false}) )
    else
      this.setState( ({enableSubmission}) =>  ({enableSubmission: true}) )

  }

  updateTitle = ({target}) => {
    console.log(target.value)
    this.setState({title: target.value})
    this.enableSubmission()
  }

  updateAuthor = ({target}) => {
    this.setState({author: target.value})
    this.enableSubmission()
  }

  updateBody = ({target}) => {
     this.setState({body: target.value})
     this.enableSubmission()
  }

  updateCategory = ({target}) => {
    this.setState({category: target.value})
    this.enableSubmission()
  }

  handleSubmit = event => {
    event.preventDefault()

    const {title, body, author, category} = this.state

    this.props.newPost({
        id : Math.random().toString(24).substr(2, 24),
        timestamp: Date.now(),
        title,
        body,
        author,
        category,
        voteScore: 1
    })

    this.clearForm()
    this.showForm()

  }

  showForm = () => {
    this.setState(({showForm}) => ({showForm: !this.state.showForm}))
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

  render(){

    const {categories} = this.props
    const { showForm, enableSubmission} = this.state

    if(!!categories.lenght) return <div></div>

    if(!showForm) return <button onClick={this.showForm} type="button">New Post</button>

    return !showForm ?
      <button onClick={this.showForm} type="button">New Post</button> :
      (<div className="overlay modal">
        <h1>Create your amazing post</h1>
        <form onSubmit={this.handleSubmit} className="new-post-form">

          <div className="field">
            <Debounce time="200" handler="onChange">
              <input type="text" name="title" placeholder="Title" onChange={(e) => this.updateTitle(e)} />
            </Debounce>
          </div>

          <div className="field">
            <Debounce time="200" handler="onChange">
              <input type="text" name="author" placeholder="Author" autoComplete="name"  onChange={this.updateAuthor} />
            </Debounce>
          </div>

          <div className="field">
            <select id="category"  onChange={this.updateCategory}>
              <option value="">Category</option>
              {categories.map(category => <option key={category.path} value={category.path}>{category.name}</option>)}
            </select>
          </div>

          <div className="field">
            <Debounce time="200" handler="onChange">
              <textarea placeholder="Post" onChange={this.updateBody}></textarea>
            </Debounce>
          </div>

          <div className="field">
            <button type="button" onClick={this.showForm} className="cancel-published">cancel</button>
            <button type="submit" disabled={enableSubmission ? false : true}>Publish</button>
          </div>
        </form>

        <div className="background" onClick={this.showForm} ></div>
      </div>)
  }

}

const mapStateToProps = ({categories}) => {
  return {categories}
}

const mapDispatchToProps = dispatch => {
  return {
    newPost: post => dispatch(newPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm)


