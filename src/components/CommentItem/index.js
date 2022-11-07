import './index.css'

const CommentItem = props => {
  const {comment, onLikeComment, onDeleteComment} = props
  const {
    userName,
    initialClassName,
    userComment,
    isLiked,
    dateTime,
    id,
  } = comment

  const initial = userName.slice(0, 1)

  const icon = {
    liked:
      'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png',
    delete:
      'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png',
    like: 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png',
  }

  const likeStatus = isLiked ? icon.liked : icon.like
  const likeColor = isLiked ? 'like-icon-label like-color' : 'like-icon-label'
  const onClickLike = () => {
    onLikeComment(id)
  }

  const onDelete = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="name-details">
        <p className={initialClassName}>{initial}</p>
        <h1 className="name">{userName}</h1>
        <p className="time">{dateTime}</p>
      </div>
      <p className="comment">{userComment}</p>
      <div className="icons-container">
        <button type="button" className="icon-button" onClick={onClickLike}>
          <img className="icon" src={likeStatus} id="likeId" alt="like" />
          <label className={likeColor} htmlFor="likeId">
            Like
          </label>
        </button>
        <button
          type="button"
          onClick={onDelete}
          testid="delete"
          className="icon-button"
        >
          <img className="icon" src={icon.delete} alt="delete" />
        </button>
      </div>
    </li>
  )
}
export default CommentItem
