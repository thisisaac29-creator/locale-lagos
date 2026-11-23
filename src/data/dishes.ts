import { media } from './media'
export interface SignatureDish { id:string; name:string; description?:string; image:string; alt:string }
export const signatureDishes:SignatureDish[] = [
 ['image-23','Korean Fried Chicken Wings'],['image-29','Spicy Pork Rigatoni'],['image-35','Buffalo Fried Chicken Bao'],['image-38','Locale Fish & Rice'],['image-53','Pork Ribs'],
].map(([id,name])=>{const photo=media.find(m=>m.id===id)!;return {id,name,image:photo.src,alt:photo.alt}})
