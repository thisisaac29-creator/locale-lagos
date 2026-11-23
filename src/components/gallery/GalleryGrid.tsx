'use client'

import { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { GalleryImage } from '@/data/gallery'
import { galleryCategories, galleryImages } from '@/data/gallery'
import { galleryVideos } from '@/data/videos'
import { BLUR_DATA_URL } from '@/lib/format'
import { Reveal } from '@/components/motion/Reveal'
import { Lightbox } from './Lightbox'

type Category = (typeof galleryCategories)[number]

interface GalleryTileProps {
  image: GalleryImage
  index: number
  reduced: boolean
  onOpen: (index: number, trigger: HTMLButtonElement) => void
}

/** A photograph with a reserved aspect ratio and a hover caption. */
function GalleryTile({ image, index, reduced, onOpen }: GalleryTileProps) {
  const vector = Boolean(image.vector)

  return (
    <div className="mb-4 break-inside-avoid sm:mb-5">
      <Reveal immediate={index < 3} delay={(index % 3) * 0.06}>
        <div>
          <button
            type="button"
            data-gallery-trigger={image.id}
            onClick={(event) => onOpen(index, event.currentTarget)}
            aria-label={`Enlarge ${image.alt}`}
            className="group relative block w-full overflow-hidden bg-sand text-left"
          >
            <motion.div
              layoutId={reduced ? undefined : `gallery-image-${image.id}`}
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${image.width} / ${image.height}` }}
              transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                priority={index === 0}
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 31vw"
                placeholder={vector ? undefined : 'blur'}
                blurDataURL={vector ? undefined : image.blurDataURL ?? BLUR_DATA_URL}
                unoptimized={vector}
                className="object-cover transition-transform duration-[900ms] ease-silky group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-[opacity,transform] duration-500 ease-silky group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="label shrink-0 text-paper">{image.category}</span>
                <span className="text-right text-[13px] leading-snug text-paper/85">{image.caption}</span>
              </span>
            </motion.div>
          </button>
          <p className="mt-3 text-[13px] leading-relaxed text-umber/80">{image.caption}</p>
        </div>
      </Reveal>
    </div>
  )
}

export function GalleryGrid() {
  const [visibleCount, setVisibleCount] = useState(12)
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const reduced = Boolean(useReducedMotion())

  const visibleImages = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory],
  )

  const handleOpen = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger
    setActiveIndex(index)
  }, [])
  const handleClose = useCallback(() => setActiveIndex(null), [])

  const activeImage = activeIndex === null ? undefined : visibleImages[activeIndex]

  return (
    <div>
      <div
        role="group"
        aria-label="Filter gallery by category"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
      >
        {galleryCategories.map((category) => {
          const selected = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => {setActiveCategory(category);setVisibleCount(12)}}
              className={`label shrink-0 border px-4 py-3 transition-colors duration-300 ${
                selected
                  ? 'border-terracotta bg-terracotta text-paper'
                  : 'border-ink/20 text-umber hover:border-terracotta hover:text-terracotta'
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.985 }}
          transition={{ duration: reduced ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3"
        >
          {visibleImages.slice(0, visibleCount).map((image, index) => (
            <GalleryTile
              key={image.id}
              image={image}
              index={index}
              reduced={reduced}
              onOpen={handleOpen}
            />
          ))}

        </motion.div>
      </AnimatePresence>

      {visibleCount < visibleImages.length && <button type="button" className="my-8 border border-ink px-6 py-3 text-ink" onClick={()=>setVisibleCount(count=>count+12)}>Show more photographs ({visibleImages.length-visibleCount} remaining)</button>}
      <div className="mt-8 columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
          {galleryVideos.filter(video=>activeCategory === 'All' || activeCategory === video.category).map(video=><LazyVideo key={video.id} video={video}/>)}
      </div>
      <AnimatePresence>
        {activeIndex !== null && activeImage && (
          <Lightbox
            key="gallery-lightbox"
            images={visibleImages}
            index={activeIndex}
            reduced={reduced}
            triggerId={activeImage.id}
            triggerRef={triggerRef}
            onClose={handleClose}
            onNavigate={setActiveIndex}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function LazyVideo({video}:{video:(typeof galleryVideos)[number]}) {
 const ref=useRef<HTMLElement>(null)
 const [near,setNear]=useState(false)
 useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setNear(true);observer.disconnect()}},{rootMargin:'250px'});observer.observe(node);return()=>observer.disconnect()},[])
 return <figure ref={ref} className="mb-6 break-inside-avoid"><div className="bg-sand" style={{aspectRatio:`${video.width}/${video.height}`}}>{near && <video controls muted playsInline preload="none" poster={video.poster} aria-label={video.alt} width={video.width} height={video.height} className="h-auto w-full"><source src={video.webm} type="video/webm"/><source src={video.src} type="video/mp4"/></video>}</div><figcaption className="mt-3 text-sm text-umber">{video.alt}</figcaption></figure>
}
