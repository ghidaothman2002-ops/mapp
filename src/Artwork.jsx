import {atlasCells} from './data/tourism';
export const atlasUrl=`${import.meta.env.BASE_URL}art/tourism-atlas.png`;
export function Artwork({kind='palms',className='',label='تصور فني، لا يمثل موقعًا حقيقيًا'}){
 const bounds=atlasCells[kind]||atlasCells.palms;
 return <svg className={`artwork ${className}`} viewBox={bounds.join(' ')} role="img" aria-label={label}><image href={atlasUrl} width="1536" height="1024"/></svg>;
}
export function MapArtwork({kind,x,y,width}){
 const bounds=atlasCells[kind];const height=width*bounds[3]/bounds[2];
 return <svg x={x-width/2} y={y-height/2} width={width} height={height} viewBox={bounds.join(' ')} overflow="hidden"><image href={atlasUrl} width="1536" height="1024"/></svg>;
}
