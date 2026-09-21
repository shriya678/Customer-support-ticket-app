import { useState } from 'react'
import type { FormEvent } from 'react'
import { getSavedAuthor, saveAuthor } from '../services/ticketService'
import type { NewCommentInput } from '../types/ticket'
import { validateCommentInput } from '../utils/validation'
import type { CommentFormErrors } from '../utils/validation'

interface CommentFormProps {
  /** Saves the comment. May throw if storage fails; the form shows the error. */
  onSubmit: (input: NewCommentInput) => void
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState(getSavedAuthor)
  const [text, setText] = useState('')
  const [errors, setErrors] = useState<CommentFormErrors>({})
  const [submitError, setSubmitError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')

    const validationErrors = validateCommentInput({ author, text })
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      onSubmit({ author, text })
    } catch {
      setSubmitError('Could not save the comment. Browser storage may be full or unavailable.')
      return
    }
    saveAuthor(author.trim())
    setText('')
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit} noValidate>
      <h4>Add a comment</h4>

      <div className="field">
        <label htmlFor="comment-author">Your name</label>
        <input
          id="comment-author"
          type="text"
          value={author}
          onChange={(event) => {
            setAuthor(event.target.value)
            setErrors((current) => ({ ...current, author: undefined }))
          }}
          aria-invalid={Boolean(errors.author)}
          aria-describedby={errors.author ? 'comment-author-error' : undefined}
        />
        {errors.author && (
          <p className="field-error" id="comment-author-error" role="alert">
            {errors.author}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          rows={3}
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            setErrors((current) => ({ ...current, text: undefined }))
          }}
          aria-invalid={Boolean(errors.text)}
          aria-describedby={errors.text ? 'comment-text-error' : undefined}
        />
        {errors.text && (
          <p className="field-error" id="comment-text-error" role="alert">
            {errors.text}
          </p>
        )}
      </div>

      {submitError && (
        <p className="banner banner-error" role="alert">
          {submitError}
        </p>
      )}

      <button type="submit" className="btn btn-primary">
        Add comment
      </button>
    </form>
  )
}

export default CommentForm
