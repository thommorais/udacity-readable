import React from 'react'
import VoteControl from '../voteControl'

export default function Comment({comment}){

  const {id, body, author, voteScore} = comment

  return (
    <article className="comment" key={id}>
      <h5>{author}</h5>
      <p>{body}</p>
      <VoteControl currentCount={voteScore} id={id} type="comments" />
    </article>
  )
}