import React, { Component } from 'react'
import Posts from './AllPosts'
import Categories from './Categories'
import Single from './Single'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Link } from 'react-router-dom'
import { getPosts } from './AllPosts/actions'
import { setCategory } from './Categories/actions'

class App extends Component {

  state = {
    posts: []
  }

  filterByCategory(posts, category) {
    return posts.filter(post => post.category === category)
  }

  filterById(posts, id) {
    return posts.filter(post => post).filter(post => post.id === id)
  }

  setCat = (catName) => {
     this.props.changeCat(catName)
  }

  async componentDidMount(){
    await this.props.getPosts()
  }

  // shouldComponentUpdate({posts}, prevState){
  //   const found = this.props.posts.find( (post, x) => post.voteScore !== posts[x].voteScore )
  //   return found ? false : true
  // }

  render() {

    const {posts, currentCategory} = this.props

    return (
      <main>
        <nav className="navigation">
          <h1><Link to={`/`} onClick={this.setCat.bind(this, null)} >Readable </Link></h1>
          <Categories currentCategory={currentCategory} />
        </nav>
        <section>
          <Switch>
            <Route exact path='/' render={ () => <Posts posts={posts} />} />
            <Route exact path='/:category' render={ ({ match }) => ( <Posts posts={this.filterByCategory(posts, match.params.category)} /> )} />
            <Route exact path='/:category/:id' render={ ({ match }) => ( <Single post={this.filterById(posts, match.params.id)} currentCategory={match.params.category} /> )} />
          </Switch>
        </section>
      </main>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    loading: state.listState,
    currentCategory: state.currentCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: category => dispatch(getPosts(category)),
    changeCat: (category) => dispatch(setCategory(category)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
