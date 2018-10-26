import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { updateCommentVote } from '../Comments/actions'
import { updatePostVote } from '../AllPosts/actions'

class voteControl extends PureComponent {

  state = {
      currentCount: 1
  }

  updateVote = vote =>{

     const option = (vote === 1) ? 'upVote' : 'downVote'

     this.setState( prevState => ({
        currentCount: prevState.currentCount + vote
     }))

    const {type} = this.props

    this.props[type]({option}, this.props.id)

  }

  componentDidMount(){
      const {currentCount} = this.props
      this.setState({currentCount})
  }

  render(){

    const {currentCount} = this.state
    const { type} = this.props

    return (
        <div className={`vote-control ${type}`}>
            <button type="button" className="voteUp" onClick={() => this.updateVote(1)}>▲</button>
            <span>{currentCount}</span>
            <button type="button" className="voteDown" onClick={() => this.updateVote(-1)}>▼</button>
        </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    comments: (update, id) => dispatch(updateCommentVote(update, id)),
    posts: (update, id) => dispatch(updatePostVote(update, id))
  }
}

export default connect(
    null,
    mapDispatchToProps
  )(voteControl)

