import React, {PureComponent} from 'react'

export default class PostHeader extends PureComponent{

  render(){
    const {post} = this.props
    const {commentCount} = post

    return(
      <header>
        <h4>{post.category}</h4>
        <h1>{post.title}</h1>
        <div className="comment-header">
          {commentCount ? commentCount : 0 } {commentCount === 1 ? 'Comment' : 'Comments'}
        </div>
      </header>
    )
  }
}
