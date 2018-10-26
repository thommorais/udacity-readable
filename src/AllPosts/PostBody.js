import React, {PureComponent} from 'react'

export default class PostBody extends PureComponent{

  render(){
    const {post} = this.props
    return <p className="post-body">{post.body}</p>
  }

}
