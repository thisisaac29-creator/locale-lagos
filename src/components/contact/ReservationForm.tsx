'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { contact } from '@/data/site'
import { whatsappLink } from '@/lib/format'

type FieldName = 'name' | 'phone' | 'date' | 'time' | 'guests' | 'preference' | 'notes'

type FormValues = Record<FieldName, string>

type FormErrors = Partial<Record<FieldName, string>>

const initialValues: FormValues = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  preference: '',
  notes: '',
}

const requiredFields: FieldName[] = ['name', 'phone', 'date', 'time', 'guests']

const inputClass =
  'min-h-[52px] w-full rounded-none border border-ink/20 bg-paper px-4 py-3 text-base leading-normal text-ink placeholder:text-umber/80 transition-colors focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/25'

const textareaClass = `${inputClass} min-h-[132px] resize-y`

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  for (const field of requiredFields) {
    if (!values[field].trim()) errors[field] = 'This field is required.'
  }

  if (values.guests.trim() && Number(values.guests) < 1) {
    errors.guests = 'Enter at least 1 guest.'
  }

  return errors
}

/** Matches the plain-text reservation format used across the site. */
function buildMessage(values: FormValues): string {
  const guests = values.guests.trim()
  const date = values.date.trim()
  const time = values.time.trim()
  const name = values.name.trim()
  const phone = values.phone.trim()
  const preference = values.preference.trim()
  const notes = values.notes.trim()

  const parts = [
    `Hello Locale, I'd like to reserve a table for ${guests} on ${date} at ${time}.`,
    `Name: ${name}.`,
    `Phone: ${phone}.`,
  ]

  if (preference) parts.push(`Seating preference: ${preference}.`)
  if (notes) parts.push(`Notes: ${notes}.`)

  return parts.join(' ')
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} role="alert" className="text-sm text-terracotta">
      {message}
    </p>
  )
}

export function ReservationForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [fallbackHref, setFallbackHref] = useState(() =>
    whatsappLink(contact.reservationMessage, contact.whatsappNumber),
  )

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as FieldName
    const value = event.target.value

    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitted(false)
      const firstInvalid = requiredFields.find((field) => nextErrors[field])
      if (firstInvalid) document.getElementById(`res-${firstInvalid}`)?.focus()
      return
    }

    setErrors({})
    const href = whatsappLink(buildMessage(values), contact.whatsappNumber)
    setFallbackHref(href)
    setSubmitted(true)

    const opened = window.open(href, '_blank', 'noopener,noreferrer')
    if (opened) opened.opener = null
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="res-name" className="label text-umber/80">
            Full name
          </label>
          <input
            id="res-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'res-name-error' : undefined}
            className={`${inputClass} ${errors.name ? 'border-terracotta' : ''}`}
            placeholder="Your name"
          />
          <FieldError id="res-name-error" message={errors.name} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="res-phone" className="label text-umber/80">
            Phone number
          </label>
          <input
            id="res-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'res-phone-error' : undefined}
            className={`${inputClass} ${errors.phone ? 'border-terracotta' : ''}`}
            placeholder="Your phone number"
          />
          <FieldError id="res-phone-error" message={errors.phone} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="res-date" className="label text-umber/80">
            Date
          </label>
          <input
            id="res-date"
            name="date"
            type="date"
            required
            value={values.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'res-date-error' : undefined}
            className={`${inputClass} ${errors.date ? 'border-terracotta' : ''}`}
          />
          <FieldError id="res-date-error" message={errors.date} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="res-time" className="label text-umber/80">
            Time
          </label>
          <input
            id="res-time"
            name="time"
            type="time"
            required
            value={values.time}
            onChange={handleChange}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? 'res-time-error' : undefined}
            className={`${inputClass} ${errors.time ? 'border-terracotta' : ''}`}
          />
          <FieldError id="res-time-error" message={errors.time} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="res-guests" className="label text-umber/80">
            Guests
          </label>
          <input
            id="res-guests"
            name="guests"
            type="number"
            min={1}
            max={99}
            inputMode="numeric"
            required
            value={values.guests}
            onChange={handleChange}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? 'res-guests-error' : undefined}
            className={`${inputClass} ${errors.guests ? 'border-terracotta' : ''}`}
            placeholder="2"
          />
          <FieldError id="res-guests-error" message={errors.guests} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="res-preference" className="label text-umber/80">
            Seating preference <span className="normal-case tracking-normal text-umber/80">(optional)</span>
          </label>
          <input
            id="res-preference"
            name="preference"
            type="text"
            value={values.preference}
            onChange={handleChange}
            className={inputClass}
            placeholder="Any particular table?"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="res-notes" className="label text-umber/80">
          Notes <span className="normal-case tracking-normal text-umber/80">(optional)</span>
        </label>
        <textarea
          id="res-notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={handleChange}
          className={textareaClass}
          placeholder="Anything we should know?"
        />
      </div>

      <div className="mt-2 border-t border-ink/15 pt-6">
        <button
          type="submit"
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-3 bg-terracotta px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-paper transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta sm:w-auto"
        >
          Send reservation request
          <span aria-hidden="true">↗</span>
        </button>

        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-umber/80">
          {submitted ? (
            <>
              Your WhatsApp should open in a new tab. If it didn&apos;t,{' '}
              <a
                href={fallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-terracotta underline underline-offset-4 transition-colors hover:text-ink"
              >
                use this reservation link
              </a>
              .
            </>
          ) : (
            <>
              Nothing is stored here — your details go straight into a WhatsApp message. Prefer to skip the form?{' '}
              <a
                href={fallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-terracotta underline underline-offset-4 transition-colors hover:text-ink"
              >
                Open WhatsApp
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  )
}
