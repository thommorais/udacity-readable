import React, {PureComponent} from 'react'
import { connect } from 'react-redux'

class PostHeader extends PureComponent{

  render(){
    const {post} = this.props
    const {author, id, commentCount} = post

    return(
      <header>
        <h4>{post.category}</h4>
        <h1>{post.title}</h1>
        <div className="comment-header">
          {commentCount ? commentCount : 0 } {commentCount === 1 ? 'Comment ' : 'Comments '}
           | Author: {author}
        </div>
      </header>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  }
}


export default connect(mapStateToProps)(PostHeader)
