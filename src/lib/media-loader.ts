'use client'
import type { ImageLoaderProps } from 'next/image'
/** Pre-generated WebP variants: deterministic sizing, no runtime image encoder. */
export default function mediaLoader({src,width}:ImageLoaderProps) {
 if (!src.endsWith('.webp')) return src
 const size=[360,640,960,1440].find(size=>size>=width) ?? 1440
 return src.replace(/\.webp$/,`-w${size}.webp`)
}
