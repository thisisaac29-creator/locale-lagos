'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { GalleryImage } from '@/data/gallery'
import { BLUR_DATA_URL } from '@/lib/format'

interface LightboxProps {
  images: GalleryImage[]
  index: number
  reduced: boolean
  triggerId: string
  triggerRef: RefObject<HTMLButtonElement | null>
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({
  images,
  index,
  reduced,
  triggerId,
  triggerRef,
  onClose,
  onNavigate,
}: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const initialTriggerId = useRef(triggerId)
  const image = images[index]

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate((index + 1) % images.length)
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate((index - 1 + images.length) % images.length)
        return
      }
      if (event.key === 'Tab') {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => element.tabIndex >= 0)
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [images.length, index, onClose, onNavigate])

  useEffect(() => {
    const stored = triggerRef.current
    const triggerId = initialTriggerId.current
    return () => {
      const fallback = document.querySelector<HTMLButtonElement>(
        `[data-gallery-trigger="${triggerId}"]`,
      )
      const trigger = stored && document.body.contains(stored) ? stored : fallback
      trigger?.focus()
    }
  }, [triggerRef])

  if (!image) return null

  const captionId = `lightbox-caption-${image.id}`
  const vector = Boolean(image.vector)
  const previous = () => onNavigate((index - 1 + images.length) % images.length)
  const next = () => onNavigate((index + 1) % images.length)

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={captionId}
      className="fixed inset-0 z-[100] bg-ink/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.18 : 0.32, ease: 'easeOut' }}
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <div
        ref={dialogRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-16 sm:px-10"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose()
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-paper/40 text-paper transition-colors hover:bg-paper hover:text-ink sm:right-8 sm:top-8"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        </button>

        <div className="flex w-full max-w-5xl items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous image"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>

          <div className="relative flex min-w-0 flex-1 items-center justify-center">
            <motion.div
              key={image.id}
              layoutId={reduced ? undefined : `gallery-image-${image.id}`}
              className="relative mx-auto w-full"
              style={{ aspectRatio: `${image.width} / ${image.height}`, maxHeight: '70svh' }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 80vw, 70vw"
                placeholder={vector ? undefined : 'blur'}
                blurDataURL={vector ? undefined : image.blurDataURL ?? BLUR_DATA_URL}
                unoptimized={vector}
                className="object-contain"
              />
            </motion.div>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="flex h-11 w-11 shrink-0 items-center justify-center border border-paper/30 text-paper transition-colors hover:border-paper hover:bg-paper/10"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <motion.div
          id={captionId}
          initial={{ opacity: 0, y: reduced ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0.18 : 0.4, delay: reduced ? 0 : 0.15 }}
          className="mt-5 flex w-full max-w-5xl items-end justify-between gap-4 text-paper"
        >
          <div>
            <p className="label text-clay">{image.category}</p>
            <p className="mt-2 font-serif text-xl leading-tight">{image.caption}</p>
          </div>
          <p className="label shrink-0 text-paper/60">
            {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
