import {Artwork} from './Artwork';
export const photoUrl=photo=>photo.src.startsWith('data:')?photo.src:`${import.meta.env.BASE_URL}${photo.src}`;
export function RegionImage({region,kind,className='',photo=region.photo,lazy=false}){
 return photo?<img className={className} src={photoUrl(photo)} alt={photo.alt} loading={lazy?'lazy':'eager'} decoding="async"/>:<Artwork kind={kind||region.art} className={className} label={`تصور فني لطبيعة ${region.name}، وليس صورة لموقع حقيقي`}/>;
}
export function PhotoCredit({photo}){
 return <span className="photo-credit"><a href={photo.page} target="_blank" rel="noreferrer">{photo.artist} · {photo.license}</a></span>;
}
