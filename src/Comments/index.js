import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadComments } from './actions'
import { withRouter } from "react-router"
import Comment from '../Comment'

class CommentList extends PureComponent {

  componentDidMount(){
    this.props.loadComments(this.props.id)
  }

  render() {

    const { comments , id} = this.props

    return (
      <section className="comments">
        <br />
        <h2 className='heading'>Comments</h2>
           {comments.length === 0 ?
            <h3><i>There is no comment, and please keep that way</i></h3> :
            comments.filter(comment => comment.parentId === id)
            .map(comment => <Comment comment={comment} key={comment.id} />)
          }
      </section>
    )

  }

}

const mapStateToProps = ({comments}) => {
  return { comments }
}

const mapDispatchToProps = dispatch => {
  return {
    loadComments: id => dispatch(loadComments(id))
  }
}

export default withRouter(
   connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentList)
)
