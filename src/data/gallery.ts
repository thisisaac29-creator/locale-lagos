import { media } from './media'
export type GalleryCategory = 'Space' | 'Food' | 'Drinks' | 'Courtyard' | 'About' | 'Detail'
export interface GalleryImage { id:string; src:string; alt:string; category:GalleryCategory; caption:string; width:number; height:number; vector?:boolean; blurDataURL?:string }
export const galleryCategories: Array<'All' | GalleryCategory> = ['All','Space','Food','Drinks','Courtyard','About','Detail']
export const galleryImages: GalleryImage[] = media.filter(image=>!image.duplicateOf && image.id!=='image-01')
