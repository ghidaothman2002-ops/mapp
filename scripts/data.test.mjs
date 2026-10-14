import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {regions,regionNames} from '../src/data/regions.js';
const geo=JSON.parse(fs.readFileSync(new URL('../src/data/saudi-regions.geojson',import.meta.url)));
test('13 identifiable regions with geographic polygon coordinates',()=>{
 assert.equal(geo.features.length,13);assert.equal(new Set(geo.features.map(f=>f.id)).size,13);
 for(const f of geo.features){assert.ok(regionNames[f.id]);assert.ok(['Polygon','MultiPolygon'].includes(f.geometry.type));const visit=v=>{if(typeof v[0]==='number'){assert.ok(v[0]>=34&&v[0]<=56);assert.ok(v[1]>=15&&v[1]<=33);}else v.forEach(visit);};visit(f.geometry.coordinates);}
});
test('six regions with complete content and valid city filters and local images',()=>{
 assert.equal(Object.keys(regions).length,6);const ids=[];
 for(const [id,r]of Object.entries(regions)){assert.ok(geo.features.some(f=>f.id===id));assert.ok(r.description&&r.crops.length&&r.cities.length&&r.experiences.length);assert.ok(fs.existsSync(new URL(`../public/images/${r.image}.svg`,import.meta.url)));for(const e of r.experiences){assert.ok(r.cities.includes(e.city));assert.ok(e.description&&e.title&&e.status.includes('مقترحة'));assert.ok(fs.existsSync(new URL(`../public/images/${e.image}.svg`,import.meta.url)));ids.push(e.id);}for(const city of r.cities)assert.ok(r.experiences.some(e=>e.city===city));}
 assert.equal(new Set(ids).size,ids.length);
});

test('all 13 tourism cards have licensed region photos, proposed ideas, and valid city filters',async()=>{
 const {tourismRegions,atlasCells,regionArt}=await import('../src/data/tourism.js');assert.equal(Object.keys(tourismRegions).length,13);
 for(const [id,r]of Object.entries(tourismRegions)){assert.ok(regionNames[id]);assert.ok(atlasCells[r.art]);assert.ok(regionArt[id]);assert.ok(r.description);assert.ok(r.experiences.length>=2);assert.ok(r.photo?.src&&r.photo?.licenseUrl&&r.photo?.artist);assert.equal(r.verified,false);assert.deepEqual(r.farms,[]);for(const e of r.experiences){assert.ok(r.cities.includes(e.city));assert.ok(e.status.includes('مقترحة'));}}
});


test('all local photos retain attribution, match their hashes, and are unique across regions',async()=>{
 const photos=JSON.parse(fs.readFileSync(new URL('../src/data/photos.json',import.meta.url)));const {createHash}=await import('node:crypto');const owners=new Map();let count=0;
 assert.equal(Object.keys(photos).length,13);
 for(const [id,items]of Object.entries(photos)){assert.ok(regionNames[id]);assert.ok(items.length);for(const p of items){assert.match(p.src,/^photos\/[a-z]{2}-\d+\.jpg$/);assert.ok(p.artist&&p.caption&&p.description&&p.license);assert.equal(new URL(p.page).hostname,'commons.wikimedia.org');assert.equal(new URL(p.licenseUrl).hostname,'creativecommons.org');const b=fs.readFileSync(new URL('../public/'+p.src,import.meta.url));const hash=createHash('sha256').update(b).digest('hex');assert.equal(hash,p.localSha256);assert.ok(!owners.has(hash)||owners.get(hash)===id,'photo reused across regions');owners.set(hash,id);count++;}}
 assert.equal(count,26);
});
