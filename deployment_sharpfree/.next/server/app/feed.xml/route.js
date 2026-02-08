"use strict";(()=>{var e={};e.id=6246,e.ids=[6246],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},79368:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>c,routeModule:()=>p,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m});var i={};r.r(i),r.d(i,{GET:()=>d,revalidate:()=>u});var n=r(49303),a=r(88716),s=r(60670),o=r(10124),l=r(95167);let u=3600;async function d(){try{let e=await o.client.fetch(`
      *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        "authorName": author->name
      }[0...20]
    `),t="https://therichgradstudent.com",r=e.map(e=>{let r=`${t}/${e.slug.current}`,i=new Date(e.publishedAt).toUTCString(),n="";if(e.mainImage){let t=(0,l.u)(e.mainImage).width(600).height(300).url();n=`<media:content url="${t}" medium="image" />`}return`
    <item>
      <title><![CDATA[${e.title}]]></title>
      <link>${r}</link>
      <guid isPermaLink="true">${r}</guid>
      <pubDate>${i}</pubDate>
      <description><![CDATA[${e.excerpt||""}]]></description>
      ${n}
      <dc:creator><![CDATA[${e.authorName||"The Rich Grad Student"}]]></dc:creator>
    </item>`}).join(""),i=`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>The Rich Grad Student</title>
    <link>${t}</link>
    <description>Millionaire Style Travel, GRAD STUDENT BUDGET</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${t}/feed.xml" rel="self" type="application/rss+xml" />
    ${r}
  </channel>
</rss>`;return new Response(i,{headers:{"Content-Type":"application/xml","Cache-Control":"public, s-maxage=3600, stale-while-revalidate=1800"}})}catch(e){return console.error("Error generating RSS feed:",e),new Response("Error generating feed",{status:500})}}let p=new n.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/feed.xml/route",pathname:"/feed.xml",filename:"route",bundlePath:"app/feed.xml/route"},resolvedPagePath:"C:\\Users\\sbots\\OneDrive\\Desktop\\TheRichGradStudent\\src\\app\\feed.xml\\route.ts",nextConfigOutput:"standalone",userland:i}),{requestAsyncStorage:c,staticGenerationAsyncStorage:m,serverHooks:h}=p,g="/feed.xml/route";function x(){return(0,s.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}},49303:(e,t,r)=>{e.exports=r(30517)},95167:(e,t,r)=>{r.d(t,{u:()=>o});var i=r(49935),n=r.n(i),a=r(10124);let s=n()(a.client);function o(e){return s.image(e).auto("format").fit("max")}},10124:(e,t,r)=>{r.d(t,{client:()=>o,s:()=>l});var i=r(57484);let n="92vz1asq",a="production",s="2024-01-01",o=(0,i.eI)({projectId:n,dataset:a,apiVersion:s,useCdn:!0});function l(e){return(0,i.eI)({projectId:n,dataset:a,apiVersion:s,useCdn:!e,perspective:e?"previewDrafts":"published",token:e?.token||process.env.SANITY_API_TOKEN})}}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[8948,7484,9935],()=>r(79368));module.exports=i})();