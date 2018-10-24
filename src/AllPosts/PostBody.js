import React from 'react'

export default function PostBody(props){
  const {post} = props
  return <p className="post-body">{post.body}</p>
}

