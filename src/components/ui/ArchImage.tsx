'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { media } from '@/data/media'
import { BLUR_DATA_URL } from '@/lib/format'

interface ArchImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imageClassName?: string
  fill?: boolean
  sizes?: string
  vector?: boolean
  priority?: boolean
}

export function ArchImage({
  src,
  alt,
  width = 800,
  height = 1000,
  className = '',
  imageClassName = '',
  fill = false,
  sizes = '(max-width: 768px) 90vw, 45vw',
  vector = false,
  priority = false,
}: ArchImageProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`arch relative overflow-hidden bg-sand ${className}`}
      initial={{ scale: reduced ? 1 : 1.06 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0.25 : 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder={vector ? undefined : 'blur'}
        blurDataURL={media.find(photo=>photo.src === src)?.blurDataURL ?? BLUR_DATA_URL}
        unoptimized={vector}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </motion.div>
  )
}
