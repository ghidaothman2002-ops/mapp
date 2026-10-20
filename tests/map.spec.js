import {test,expect} from '@playwright/test';
import {regionNames} from '../src/data/regions.js';
import {tourismRegions} from '../src/data/tourism.js';
import {mapSymbols} from '../src/data/mapSymbols.js';
const url='http://127.0.0.1:5173/mapp/';
test('الشاشة الأولى خريطة كاملة بلا بطاقة، مع 13 اسمًا و13 منطقة',async({page})=>{
 await page.goto('./');await expect(page.locator('.region-panel')).toHaveCount(0);await expect(page.locator('path.region')).toHaveCount(13);await expect(page.locator('.region-label text')).toHaveCount(13);for(const name of Object.values(regionNames))await expect(page.locator('.region-label text').filter({hasText:name})).toBeVisible();
 await expect(page.locator('h1')).toContainText('لكل أرض');await expect(page.locator('.map-symbol')).toHaveCount(13);await expect(page.locator('.saudi-map image')).toHaveCount(0);
});
test('الضغط الفعلي على المناطق الـ13 يعرض بطاقاتها وتجاربها',async({page})=>{
 await page.setViewportSize({width:1440,height:1200});await page.goto('./');
 for(const [id,name]of Object.entries(regionNames)){
  const point=await page.locator(`path[data-region="${id}"]`).evaluate(n=>{const b=n.getBBox();let p;for(let y=.1;y<1&&!p;y+=.1)for(let x=.1;x<1&&!p;x+=.1){const q=new DOMPoint(b.x+b.width*x,b.y+b.height*y);if(n.isPointInFill(q))p=q;}if(!p)throw Error('No interior point');const q=p.matrixTransform(n.getScreenCTM());return {x:q.x,y:q.y};});
  await page.mouse.click(point.x,point.y);await expect(page.locator('.region-hero h2')).toHaveText(name);await expect(page.locator(`path[data-region="${id}"]`)).toHaveAttribute('aria-pressed','true');await expect(page.locator('.experience-body h4')).toHaveText(tourismRegions[id].experiences[0].title);await expect(page.locator('.crop-tags span').first()).toBeVisible();await page.getByRole('button',{name:'إغلاق بطاقة المنطقة',exact:true}).click();await expect(page.locator('.region-panel')).toHaveCount(0);
 }
});
test('لوحة المفاتيح، التصفية، أسهم التجارب، التفاصيل والعودة',async({page})=>{
 await page.goto('./');await page.locator('path[data-region="SA.JF"]').focus();await page.keyboard.press('Enter');await expect(page.locator('.region-hero h2')).toHaveText('الجوف');await expect(page.locator('.experience-body h4')).toHaveText('رحلة حبة زيتون');
 await page.getByRole('button',{name:'التجربة التالية',exact:true}).click();await expect(page.locator('.experience-body h4')).toHaveText('من الشجرة إلى الزيت');await page.getByRole('button',{name:'التجربة السابقة',exact:true}).click();await expect(page.locator('.experience-body h4')).toHaveText('رحلة حبة زيتون');
 await page.getByRole('button',{name:'سكاكا',exact:true}).click();await expect(page.getByRole('button',{name:'التجربة التالية',exact:true})).toBeDisabled();await page.locator('.experience-open').click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.getByRole('dialog')).toContainText('ليست حجزًا');await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 await page.getByRole('combobox',{name:'اختيار منطقة أخرى',exact:true}).selectOption('SA.NJ');await expect(page.locator('.region-hero h2')).toHaveText('نجران');await page.getByRole('button',{name:'العودة إلى الخريطة',exact:true}).click();await expect(page.locator('.region-panel')).toHaveCount(0);await expect(page.locator('path[data-region="SA.NJ"]')).toBeFocused();
});
test('الرسومات والخطوط المحلية لا تسبب أخطاء أو طلبات فاشلة',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});await page.goto('./');await page.evaluate(()=>document.fonts.ready);await page.locator('path[data-region="SA.QS"]').focus();await page.keyboard.press('Enter');await expect(page.locator('.region-panel')).toBeVisible();await expect(page.locator('.region-hero img')).toBeVisible();await expect(page.locator('.region-hero .photo-credit')).toContainText('CC');
 expect(await page.locator('.brand img').evaluate(async i=>{await i.decode();return i.naturalWidth>0&&i.naturalHeight>i.naturalWidth;})).toBe(true);await page.getByRole('button',{name:'عن الرحلة'}).click();await expect(page.getByRole('dialog')).toContainText('المصادر');await page.getByRole('button',{name:'إغلاق التفاصيل',exact:true}).click();expect(errors).toEqual([]);
});
test('الكمبيوتر والجهاز اللوحي: البطاقة بجانب الخريطة ولا يوجد تمرير أفقي',async({page})=>{
 for(const [width,height]of [[1440,1000],[1024,1366]]){await page.setViewportSize({width,height});await page.goto('./');await page.locator('path[data-region="SA.AS"]').focus();await page.keyboard.press('Enter');const map=await page.locator('.map-section').boundingBox(),card=await page.locator('.region-panel').boundingBox();expect(map.x).toBeLessThan(card.x);expect(map.x+map.width).toBeLessThanOrEqual(card.x);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);}
});
test('الجوال: بطاقة سفلية وتمريرها وتصغيرها، واختيار منطقة أخرى',async({browser})=>{
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await ctx.newPage();await page.goto(url);await expect(page.locator('.region-panel')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const pt=await page.locator('path[data-region="SA.RI"]').evaluate(n=>{const b=n.getBBox();const p=new DOMPoint(b.x+b.width*.5,b.y+b.height*.5).matrixTransform(n.getScreenCTM());return {x:p.x,y:p.y};});await page.touchscreen.tap(pt.x,pt.y);await expect(page.locator('.region-hero h2')).toHaveText('الرياض');await expect.poll(async()=>{const r=await page.locator('.region-panel').boundingBox();return r.y+r.height;}).toBeCloseTo(844,0);const rect=await page.locator('.region-panel').boundingBox();expect(rect.height).toBeLessThan(844*.7);
 const visibleNames=await page.evaluate(()=>{const sheetTop=document.querySelector('.region-panel').getBoundingClientRect().top;return [...document.querySelectorAll('.region-label text')].filter(n=>{const r=n.getBoundingClientRect();return r.top>77&&r.bottom<sheetTop;}).length;});expect(visibleNames).toBeGreaterThanOrEqual(3);
 await page.locator('.panel-scroll').evaluate(e=>e.scrollTo(0,e.scrollHeight));await page.getByRole('combobox',{name:'اختيار منطقة أخرى'}).selectOption('SA.JZ');await expect(page.locator('.region-hero h2')).toHaveText('جازان');await page.getByRole('button',{name:'تصغير بطاقة المنطقة'}).tap();await expect(page.locator('.panel-scroll')).not.toBeVisible();await page.getByRole('button',{name:'توسيع بطاقة المنطقة'}).tap();await expect(page.locator('.panel-scroll')).toBeVisible();await page.getByRole('button',{name:'إغلاق بطاقة المنطقة',exact:true}).tap();await expect(page.locator('.region-panel')).toHaveCount(0);await ctx.close();
});
test('إصبعان للتكبير، والسحب وإعادة الضبط',async({browser})=>{
 const ctx=await browser.newContext({viewport:{width:800,height:1100},isMobile:true,hasTouch:true});const page=await ctx.newPage();await page.goto(url);const box=await page.locator('.saudi-map').boundingBox();const x=box.x+box.width/2,y=box.y+box.height/2;const client=await ctx.newCDPSession(page);const touch=(type,pts)=>client.send('Input.dispatchTouchEvent',{type,touchPoints:pts.map((p,i)=>({x:p[0],y:p[1],id:i+1}))});await touch('touchStart',[[x-25,y],[x+25,y]]);await touch('touchMove',[[x-45,y],[x+45,y]]);await touch('touchEnd',[]);await expect(page.locator('.map-world')).not.toHaveAttribute('transform',/scale\(1\)/);const old=await page.locator('.map-world').getAttribute('transform');await touch('touchStart',[[x,y]]);await touch('touchMove',[[x+30,y+20]]);await touch('touchEnd',[]);await expect(page.locator('.map-world')).not.toHaveAttribute('transform',old);await page.getByRole('button',{name:'إعادة ضبط الخريطة',exact:true}).tap();await expect(page.locator('.map-world')).toHaveAttribute('transform',/scale\(1\)/);await expect(page.locator('.region-panel')).toHaveCount(0);await ctx.close();
});


test('26 credited region photos decode from local URLs with no broken images',async({page})=>{
 await page.goto('./');const {default:photos}=await import('../src/data/photos.json',{with:{type:'json'}});const urls=Object.values(photos).flat().map(p=>'http://127.0.0.1:5173/mapp/'+p.src);const failures=await page.evaluate(async urls=>{const results=await Promise.all(urls.map(async url=>{try{const im=new Image();im.src=url;await im.decode();return im.naturalWidth>500?null:url;}catch{return url;}}));return results.filter(Boolean);},urls);expect(failures).toEqual([]);
 await page.locator('path[data-region="SA.JF"]').focus();await page.keyboard.press('Enter');await expect(page.locator('.region-hero img')).toHaveAttribute('src',/photos\/jf-1\.jpg$/);await page.getByRole('button',{name:'عن الرحلة'}).click();await expect(page.getByRole('dialog')).toContainText('وكالة الأنباء السعودية');await expect(page.getByRole('dialog')).toContainText('CC BY-SA 4.0');
});

test('الأسماء والرموز لا تتداخل، وكل منطقة تحتفظ برمز داخل حدودها',async({page})=>{
 for(const [width,height] of [[1440,1000],[1024,1366],[768,1024],[390,844],[360,800]]){
  await page.setViewportSize({width,height});await page.goto('./');await page.evaluate(()=>document.fonts.ready);
  const problems=await page.evaluate(symbols=>{
   const texts=[...document.querySelectorAll('.region-label text')].map(n=>({name:n.textContent,rect:n.getBoundingClientRect()}));
   const icons=[...document.querySelectorAll('.map-symbol')].map(n=>({name:n.getAttribute('aria-label'),rect:n.getBoundingClientRect()}));
   const intersects=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
   const problems=texts.flatMap(t=>icons.filter(i=>intersects(t.rect,i.rect)).map(i=>`${t.name}: ${i.name}`));
   texts.forEach((t,index)=>texts.slice(index+1).forEach(other=>{if(intersects(t.rect,other.rect))problems.push(`${t.name}: ${other.name}`);}));
   for(const [id,s]of Object.entries(symbols)){
    const region=document.querySelector(`path[data-region="${id}"]`);
    if(!region.isPointInFill(new DOMPoint(s.x,s.y)))problems.push(`${id}: symbol outside region`);
    if(!region.isPointInFill(new DOMPoint(...s.name)))problems.push(`${id}: label anchor outside region`);
   }
   const frame=document.querySelector('.map-canvas').getBoundingClientRect();
   for(const text of texts)if(text.rect.left<frame.left||text.rect.right>frame.right||text.rect.top<frame.top||text.rect.bottom>frame.bottom)problems.push(`${text.name}: clipped`);
   return problems;
  },mapSymbols);
  expect(problems,`viewport ${width} × ${height}`).toEqual([]);
 }
});
