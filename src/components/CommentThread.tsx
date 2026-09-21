import type { Comment } from '../types/ticket'
import { formatDateTime } from '../utils/format'

function CommentThread({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="muted">No comments yet.</p>
  }

  return (
    <ul className="comment-thread">
      {comments.map((comment) => (
        <li key={comment.id} className="comment">
          <div className="comment-header">
            <strong>{comment.author}</strong>
            <time dateTime={comment.createdAt} className="muted">
              {formatDateTime(comment.createdAt)}
            </time>
          </div>
          <p className="comment-text">{comment.text}</p>
        </li>
      ))}
    </ul>
  )
}

export default CommentThread
