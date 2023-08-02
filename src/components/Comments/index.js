import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

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
  state = {
    commentsList:
      JSON.parse(localStorage.getItem('Comment List')) === null
        ? []
        : JSON.parse(localStorage.getItem('Comment List')),
    userName: '',
    comment: '',
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState(
      {
        commentsList: commentsList.filter(comment => commentId !== comment.id),
      },
      this.onAddCommentToLocalStorage,
    )
  }

  toggleIsLiked = id => {
    this.setState(
      prevState => ({
        commentsList: prevState.commentsList.map(eachComment => {
          if (id === eachComment.id) {
            return {...eachComment, isLiked: !eachComment.isLiked}
          }
          return eachComment
        }),
      }),
      this.onAddCommentToLocalStorage,
    )
  }

  onChangeName = event => {
    this.setState({userName: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddCommentToLocalStorage = () => {
    const {commentsList} = this.state

    localStorage.setItem('Comment List', JSON.stringify(commentsList))
  }

  onAddComment = event => {
    event.preventDefault()

    const {userName, comment} = this.state
    const initialContainerBackgroundColorClassNames = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      userName,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialContainerBackgroundColorClassNames,
    }

    this.setState(
      prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        userName: '',
        comment: '',
      }),
      this.onAddCommentToLocalStorage,
    )
  }

  addCommentsToList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  render() {
    const {userName, comment, commentsList} = this.state

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>
          <div className="form-row">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="name-input"
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={this.onChangeName}
              />
              <textarea
                rows="6"
                className="comment-input"
                value={comment}
                placeholder="Your Comment"
                onChange={this.onChangeComment}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-image"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.addCommentsToList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
