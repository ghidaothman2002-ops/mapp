// Crop examples, not production rankings or claims about every city.
// Each entry has region-specific evidence; national totals and market prices
// were deliberately not used to infer where a crop is grown.
export const cropCheckedAt='2026-10-20';
export const cropReferences={
 yearbook:{title:'وزارة البيئة والمياه والزراعة: الكتاب الإحصائي ٢٠٢٤',shortTitle:'إحصاءات الوزارة ٢٠٢٤',url:'https://www.mewa.gov.sa/ar/InformationCenter/Researchs/Reports/GeneralReports/TheStatisticalBook.pdf',year:2024,pdfPages:159},
 calendar:{title:'وزارة البيئة والمياه والزراعة: المفكرة الزراعية ٢٠١٨–٢٠١٩',shortTitle:'المفكرة الزراعية',url:'https://www.mewa.gov.sa/ar/InformationCenter/AwarenessCenter/AgricultureCalendar/Documents/agire3.pdf',year:2019},
 jawfOlives:{title:'وكالة الأنباء السعودية: مزارع الزيتون في الجوف، ٢٠٢٤ — نسخة ويكيميديا كومنز',shortTitle:'واس: زيتون الجوف',url:'https://commons.wikimedia.org/wiki/File:%D9%85%D8%B2%D8%A7%D8%B1%D8%B9_%D8%A7%D9%84%D8%B2%D9%8A%D8%AA%D9%88%D9%86_%D9%81%D9%8A_%D8%A7%D9%84%D8%AC%D9%88%D9%81.jpg',year:2024},
};
const crop=(name,reference,pages,evidence)=>({name,reference,pages,evidence});
const dates=()=>crop('التمور','yearbook',[63],'جدول مساحات وإنتاج مزارع النخيل العضوية وتحت التحول: إنتاج مسجل للمنطقة في عمود ٢٠٢٤.');
const coffee=()=>crop('البن','yearbook',[81],'جدول عدد أشجار البن المثمرة وكمية الإنتاج: إنتاج مسجل للمنطقة في صف ٢٠٢٤.');
const mango=()=>crop('المانجو','yearbook',[89],'جدول الإعانات الممنوحة للمزارعين حسب المنطقة: قيمة موجبة لمحصول المانجو في ٢٠٢٤؛ لا تستخدم لترتيب الإنتاج.');
const grain=()=>crop('الحبوب','yearbook',[65],'جدول مزارع الحبوب العضوية وتحت التحول: إنتاج موجب للمنطقة في ٢٠٢٤؛ لا يفصل نوع الحبوب.');
const vegetables=()=>crop('الخضروات','yearbook',[64],'جدول مزارع الخضار العضوية وتحت التحول: إنتاج موجب للمنطقة في ٢٠٢٤؛ لا يفصل أنواع الخضار.');
const calendarCrop=(name,pages,evidence)=>crop(name,'calendar',pages,evidence);
export const regionalCrops={
 'SA.RI':[dates(),calendarCrop('الطماطم',[61],'المفكرة تذكر زراعة بذور الطماطم في سدير، وهي ضمن منطقة الرياض.'),calendarCrop('الفلفل',[61],'المفكرة تذكر زراعة الفلفل في سدير، وهي ضمن منطقة الرياض.')],
 'SA.QS':[dates(),calendarCrop('البطاطس',[60],'تقويم يناير يذكر البطاطس والطماطم في القصيم بالاسم.'),calendarCrop('الطماطم',[60],'تقويم يناير يذكر الطماطم في القصيم بالاسم.')],
 'SA.TB':[dates(),calendarCrop('الطماطم',[61],'تقويم فبراير يذكر بذور الطماطم في تبوك بالاسم.'),calendarCrop('الباذنجان',[61],'تقويم فبراير يذكر بذور الباذنجان في تبوك بالاسم.')],
 'SA.JF':[crop('الزيتون','jawfOlives',[],'توثيق مصور لواس بعنوان مزارع الزيتون في الجوف، ووصفه يحدد الجوف والسنة ٢٠٢٤؛ دليل على وجود الزراعة، وليس على حجم إنتاجها.'),dates(),vegetables()],
 'SA.AS':[coffee(),mango(),calendarCrop('الطماطم',[60],'تقويم يناير يذكر الطماطم في عسير بالاسم.')],
 'SA.JZ':[mango(),coffee(),dates()],
 'SA.NJ':[dates(),mango(),coffee()],
 'SA.SH':[dates(),calendarCrop('البطاطس',[60],'تقويم يناير يذكر البطاطس في المنطقة الشرقية بالاسم.'),calendarCrop('الطماطم',[60],'تقويم يناير يذكر الطماطم في المنطقة الشرقية بالاسم.')],
 'SA.MD':[dates(),calendarCrop('القرعيات',[61],'تقويم فبراير يذكر زراعة القرعيات في المدينة المنورة؛ أبقي التصنيف كما هو دون اختلاق أنواع.'),calendarCrop('الجرجير',[62],'تقويم مارس يذكر الجرجير في المدينة المنورة بالاسم.')],
 'SA.HA':[grain(),calendarCrop('البطاطس',[60],'تقويم يناير يذكر البطاطس في حائل بالاسم.'),calendarCrop('الطماطم',[60],'تقويم يناير يذكر الطماطم في حائل بالاسم.')],
 'SA.HS':[dates(),grain(),vegetables()],
 'SA.BA':[coffee(),calendarCrop('الفاصوليا',[61],'تقويم فبراير يذكر الفاصوليا واللوبيا في الباحة بالاسم.'),calendarCrop('اللوبيا',[61],'تقويم فبراير يذكر اللوبيا في الباحة بالاسم.')],
 'SA.MK':[dates(),mango(),coffee()],
};
export function getCropProfile(id){
 const entries=regionalCrops[id]||[];
 const grouped=new Map();
 for(const entry of entries){
  if(!grouped.has(entry.reference))grouped.set(entry.reference,new Set());
  entry.pages.forEach(page=>grouped.get(entry.reference).add(page));
 }
 return {crops:entries.map(entry=>entry.name),cropEvidence:entries,cropCheckedAt,cropSources:[...grouped].map(([key,pages])=>{
  const sorted=[...pages].sort((a,b)=>a-b),reference=cropReferences[key];
  return {...reference,key,pages:sorted,href:reference.url+(sorted.length?`#page=${sorted[0]}`:'')};
 })};
}
