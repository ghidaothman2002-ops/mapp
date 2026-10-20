import {useId} from 'react';

// Original vector illustrations; only their paint palette changes here.
// All paths remain decorative; the real geographic region receives input.
const green='#386b43', light='var(--symbol-leaf-light)', earth='#875438', gold='var(--symbol-grain)';
const leaves='var(--symbol-leaf)';
function Palm({dates=false}){
 return <><path d="M31 56c3-12 3-23 1-36" fill="none" stroke={earth} strokeWidth="4"/><path d="m31 33 4-2m-5 10 5-2m-6 10 5-2" stroke="#d7ac79"/>
 <path d="M32 22C21 7 10 10 5 16c11-1 18 3 27 6ZM32 22C35 6 45 4 52 8c-10 2-15 8-20 14ZM32 22C21 17 9 21 7 31c9-6 17-8 25-9ZM32 22c11-12 23-8 27 1-11-3-18-2-27-1ZM32 22C19 23 15 34 17 40c3-8 8-13 15-18ZM32 22c12 0 18 10 17 18-5-8-10-14-17-18Z" fill={leaves}/>
 {dates&&<g fill="var(--symbol-date)" stroke="#683b2a" strokeWidth=".8"><ellipse cx="25" cy="31" rx="3" ry="5" transform="rotate(22 25 31)"/><ellipse cx="40" cy="30" rx="3" ry="5" transform="rotate(-15 40 30)"/></g>}</>;
}
function Olive(){return <><path d="M17 55C28 41 33 29 44 10" fill="none" stroke={earth}/><g fill={leaves}><path d="M26 44C13 43 10 33 11 28c10 2 16 7 15 16ZM33 33C21 31 18 21 20 16c9 4 14 9 13 17ZM39 22C31 15 34 7 40 4c4 6 5 11-1 18Z"/><path d="M29 39c3-13 13-15 20-12-4 9-10 14-20 12ZM37 26c5-12 14-12 20-8-7 8-12 10-20 8Z" fill={light}/></g><g><ellipse fill="var(--symbol-olive-green)" cx="22" cy="43" rx="5" ry="7" transform="rotate(23 22 43)"/><ellipse fill="var(--symbol-olive-purple)" cx="38" cy="42" rx="5" ry="7" transform="rotate(-18 38 42)"/></g><path d="m23 39 2-3m12 2-1-5" stroke={earth}/><path d="M20 42v2m16-3v2" stroke="#b7c493"/></>;}
function Wheat(){return <><path d="M31 57V13M27 57 17 29m17 28 12-31" fill="none" stroke={earth}/><g fill={gold} stroke="#93671e" strokeWidth=".7">{[19,27,35,43].map(y=><g key={y}><path d={`M31 ${y+6}q-9-3-8-10 8 1 8 10Z`}/><path d={`M32 ${y+6}q9-3 8-10-8 1-8 10Z`}/></g>)}<path d="M31 17q-5-7 0-12 5 6 0 12ZM20 38q-10-2-10-9 9-1 10 9Zm3 7q6-9 3-14-7 3-3 14ZM43 37q-5-8-1-13 7 4 1 13Zm-2 9q9-1 12-8-9-3-12 8Z"/></g><path d="M28 55c-11-1-13-5-15-9m22 10c9-1 14-5 16-10" fill="none" stroke={green}/></>;}
function Mango(){return <><path d="M20 21q12-11 30-8M32 14v14m10-14 4 13" stroke={earth} fill="none"/><path d="M32 14C26 0 13 3 8 7c9 8 14 10 24 7Z" fill={leaves}/><path d="M34 15C42 3 53 3 60 8c-7 7-16 10-26 7Z" fill={light}/><path d="M31 25c-11-4-19 7-16 20 3 10 12 10 19 3 8-8 10-21-3-23Z" fill="var(--symbol-mango-gold)" stroke="#ad7329"/><path d="M45 25c10-2 15 8 11 17-3 7-11 10-17 7 9-4 4-16 6-24Z" fill="var(--symbol-mango-orange)" stroke="#ac632b"/><path d="M22 32q-4 6-2 11" fill="none" stroke="#ffe0a0"/></>;}
function Pomegranate(){return <><path d="M33 19V8m0 4q-9-8-17-5c2 8 8 10 17 5Z" fill={light} stroke={green}/><path d="m29 20-4-7 7 2 5-3-1 8" fill="#b14638" stroke="#88382e"/><path d="M33 19C14 14 7 29 14 44c4 10 24 13 32 3 12-15 5-30-13-28Z" fill="var(--symbol-pomegranate)" stroke="#892f32"/><path d="M32 25c-11-3-18 7-12 16 6 7 15 8 22 0 5-9-1-17-10-16Z" fill="#f8dfb9" stroke="none"/><g fill="#a62c3b" stroke="none">{[[27,30],[35,30],[23,36],[31,37],[39,36],[28,43],[36,43]].map(([cx,cy])=><circle key={cx+','+cy} cx={cx} cy={cy} r="2.2"/>)}</g></>;}
function Mountains({terraces=false}){return <><path d="M4 49 21 18 32 34 43 10 62 49Z" fill="var(--symbol-mountain)" stroke="var(--symbol-rock-outline)" strokeLinejoin="round"/><path d="m14 32 7-14 7 10-6-2Zm24-10 5-12 7 14-7-5Z" fill="var(--symbol-rock-light)" stroke="none"/><path d="m22 28 3 15m18-24-5 24" stroke="var(--symbol-rock-ridge)" fill="none"/>{terraces&&<><path d="M3 53q9-20 30-12t29 0v15H3Z" fill="var(--symbol-terrace)" stroke={green}/><path d="M9 47q14-7 26-2t24-1M6 53q15-7 29-2t25-1" fill="none" stroke={green}/><path d="M18 45v-5m0 2-3-2m3 1 3-3m23 10v-6m0 3-3-2m3 1 3-3" stroke={green}/></>}</>;}
function Desert(){return <><path d="M3 54q12-10 29-3t29-1" fill="none" stroke="#ac8954"/><path d="M29 50V28m0 13-9-9m9 3 7-11m-14 9-4-11m18 4 9-4" fill="none" stroke={green}/><path d="M29 28c-8-8-7-15-2-19 5 7 7 14 2 19ZM20 32c-9 0-15-7-13-12 8 0 13 6 13 12ZM36 26c-1-9 3-15 10-15 1 8-3 13-10 15ZM44 23c6-7 12-7 16-3-5 6-10 7-16 3Z" fill={light} stroke={green} strokeWidth=".8"/><path d="m9 53-1-9m3 9 4-8m33 8 3-9m0 9 6-4" stroke={green}/></>;}
// IDs are unique even when two regions use the same crop symbol.
const gradients={
 leaf:['#629250','#2e623e'],
 'leaf-light':['#88a856','#537e43'],
 date:['#b16a3c','#7b3d2a'],
 grain:['#edc65b','#c18a24'],
 'olive-green':['#6c8436','#365632'],
 'olive-purple':['#766071','#473744'],
 'mango-gold':['#f4c34e','#dda02e'],
 'mango-orange':['#eea344','#cf772e'],
 pomegranate:['#d25b48','#af3038'],
 terrace:['#82a85c','#497b48'],
};
export default function MapSymbol({kind,x,y,size,label}){
 const id=`crop-${useId().replace(/[^a-zA-Z0-9_-]/g,'')}`;
 const paints={...gradients,mountain:kind==='terraces'?['#a6a79f','#747a74']:['#a28b72','#6f7774']};
 const style=Object.fromEntries(Object.keys(paints).map(name=>[`--symbol-${name}`,`url(#${id}-${name})`]));
 Object.assign(style,{'--symbol-rock-outline':kind==='terraces'?'#61675f':'#685d50','--symbol-rock-light':kind==='terraces'?'#ddd9cc':'#e1d4c0','--symbol-rock-ridge':kind==='terraces'?'#656d64':'#75634e'});
 return <svg className={`map-symbol symbol-${kind}`} data-symbol={kind} x={x-size/2} y={y-size/2} width={size} height={size} viewBox="0 0 64 64" overflow="visible" role="img" aria-label={label} style={style}>
 <defs>{Object.entries(paints).map(([name,colors])=><linearGradient key={name} id={`${id}-${name}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor={colors[0]}/><stop offset="100%" stopColor={colors[1]}/></linearGradient>)}</defs>
 <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="32" cy="57" rx="26" ry="3" fill="#a5946720"/>
 {kind==='olive'?<Olive/>:kind==='wheat'?<Wheat/>:kind==='mango'?<Mango/>:kind==='pomegranate'?<Pomegranate/>:kind==='mountain'?<Mountains/>:kind==='terraces'?<Mountains terraces/>:kind==='desert'?<Desert/>:<><Palm dates={kind==='dates'}/>{kind==='farm'&&<g fill="none" stroke={green} strokeWidth="1.3"><path d="M5 58q14-11 27-2t28-2M5 62q14-10 27-2t28-2"/><path d="M8 51v-7m0 3-3-2m3 1 3-3m43 9v-8m0 3-3-2m3 1 3-3"/></g>}</>}
 </g></svg>;
}
