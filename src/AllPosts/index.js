import React, {PureComponent} from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import VoteControl from '../voteControl'
import NewPostForm from '../newPost/'
import Sorter from './Sorter'

export default class ListOfPosts extends PureComponent{

  state = {
    sorter: 'timestamp',
    addNewPost: false
  }

  sortBy = modifier => {
    this.setState( ({sorter}) => ( {
      sorter: modifier
    }))
  }

  addNewPost = () => this.setState(({addNewPost}) => ({addNewPost: !addNewPost}))

  render(){

    const {posts} = this.props
    const {sorter, addNewPost} = this.state
    const sortedPosts = sorter ? [...posts].sort( (p, n) => p[sorter] < n[sorter] ) : posts

    return (
      <React.Fragment>
        <div className="tools">
          <Sorter func={(modifier) => this.sortBy(modifier)} />
          <button onClick={this.addNewPost} type="button">New Post</button>
          {!!addNewPost && <NewPostForm mode="newPost" closer={this.addNewPost} />}
        </div>
        <div className="post-wrp">
          {!sortedPosts.length && <h1>The Udacity team made only two shitty post, sorry greater user</h1>}
          {!!sortedPosts.length && sortedPosts.filter(post => post).map(post => (
              <article key={post.id} className="post">
                <Link to={`/${post.category}/${post.id}`}>
                  <PostHeader post={post} />
                </Link>
                <VoteControl currentCount={post.voteScore} id={post.id} type="posts"/>
              </article>
            ))
          }
        </div>
      </React.Fragment>
    )

  }

}
