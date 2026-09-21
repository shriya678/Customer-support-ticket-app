import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { NewTicketInput } from '../types/ticket'
import { TITLE_MAX_LENGTH, validateTicketInput } from '../utils/validation'
import type { TicketFormErrors } from '../utils/validation'

interface TicketFormProps {
  /** Saves the ticket. May throw if storage fails; the form shows the error. */
  onSubmit: (input: NewTicketInput) => void
  onCancel: () => void
}

const EMPTY_FORM: NewTicketInput = {
  title: '',
  description: '',
  customerName: '',
  orderNumber: '',
  phoneNumber: '',
}

function TicketForm({ onSubmit, onCancel }: TicketFormProps) {
  const [values, setValues] = useState<NewTicketInput>(EMPTY_FORM)
  const [errors, setErrors] = useState<TicketFormErrors>({})
  const [submitError, setSubmitError] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as keyof NewTicketInput
    setValues((current) => ({ ...current, [field]: event.target.value }))
    // Clear a field's error as soon as the user edits it.
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')

    const validationErrors = validateTicketInput(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    try {
      onSubmit(values)
    } catch {
      setSubmitError('Could not save the ticket. Browser storage may be full or unavailable.')
    }
  }

  function renderError(field: keyof NewTicketInput) {
    const message = errors[field]
    return message ? (
      <p className="field-error" id={`${field}-error`} role="alert">
        {message}
      </p>
    ) : null
  }

  function describedBy(field: keyof NewTicketInput) {
    return errors[field] ? `${field}-error` : undefined
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>New ticket</h2>

      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          maxLength={TITLE_MAX_LENGTH}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={describedBy('title')}
        />
        {renderError('title')}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={describedBy('description')}
        />
        {renderError('description')}
      </div>

      <div className="field">
        <label htmlFor="customerName">Customer name</label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          value={values.customerName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.customerName)}
          aria-describedby={describedBy('customerName')}
        />
        {renderError('customerName')}
      </div>

      <div className="field">
        <label htmlFor="orderNumber">Order number</label>
        <input
          id="orderNumber"
          name="orderNumber"
          type="text"
          value={values.orderNumber}
          onChange={handleChange}
          aria-invalid={Boolean(errors.orderNumber)}
          aria-describedby={describedBy('orderNumber')}
        />
        {renderError('orderNumber')}
      </div>

      <div className="field">
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="+1 555 123 4567"
          value={values.phoneNumber}
          onChange={handleChange}
          aria-invalid={Boolean(errors.phoneNumber)}
          aria-describedby={describedBy('phoneNumber')}
        />
        {renderError('phoneNumber')}
      </div>

      {submitError && (
        <p className="banner banner-error" role="alert">
          {submitError}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Create ticket
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default TicketForm
