import {Component} from 'react'
import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {userName: '', userComment: '', commentsList: []}

  onAddComment = event => {
    event.preventDefault()
    const {userName, userComment} = this.state

    const initialIndex = Math.ceil(Math.random() * 6)

    const initialClassName = `initial ${initialContainerBackgroundClassNames[initialIndex]}`
    const newComment = {
      id: uuidv4(),
      dateTime: formatDistanceToNow(new Date()),
      userName,
      userComment,
      initialClassName,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      userName: '',
      userComment: '',
    }))
  }

  onEnterName = event => {
    this.setState({userName: event.target.value})
  }

  onEnterComment = event => {
    this.setState({userComment: event.target.value})
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => id !== eachComment.id,
      ),
    }))
  }

  render() {
    const initialIndex = Math.ceil(Math.random() * 6)
    const {commentsList, userName, userComment} = this.state
    return (
      <div className="app-container">
        <h1 className="comments-heading">Comments</h1>
        <div className="add-comments-container">
          <div>
            <p className="heading">Say Something about 4.0 technologies</p>
            <form
              className="comment-input-container"
              onSubmit={this.onAddComment}
            >
              <input
                value={userName}
                onChange={this.onEnterName}
                type="text"
                placeholder="Your Name"
                className="input"
              />
              <textarea
                value={userComment}
                onChange={this.onEnterComment}
                rows="5"
                placeholder="Your Comment"
              >
                {' '}
              </textarea>
              <button
                onClick={this.onClickAddComment}
                type="submit"
                className="button"
              >
                Add Comment
              </button>
            </form>
          </div>
          <img
            className="comments-image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
            alt="comments"
          />
        </div>

        <br />
        <hr className="separator" />
        <div className="notification">
          <p className="notification-count">{commentsList.length}</p>
          <p className="comments">Comments</p>
        </div>

        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              onDeleteComment={this.onDeleteComment}
              onLikeComment={this.onLikeComment}
              initialColor={initialContainerBackgroundClassNames[initialIndex]}
              comment={eachComment}
              key={eachComment.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
