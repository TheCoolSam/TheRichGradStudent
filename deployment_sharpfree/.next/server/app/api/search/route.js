"use strict";(()=>{var e={};e.id=280,e.ids=[280],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},36266:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>m,patchFetch:()=>x,requestAsyncStorage:()=>d,routeModule:()=>u,serverHooks:()=>h,staticGenerationAsyncStorage:()=>l});var s={};t.r(s),t.d(s,{GET:()=>c});var a=t(49303),o=t(88716),i=t(60670),n=t(87070),p=t(10124);async function c(e){let r=e.nextUrl.searchParams.get("q");if(!r||0===r.trim().length)return n.NextResponse.json({articles:[],posts:[],creditCards:[]});try{let e=`*[
      _type in ["article", "post", "creditCard"] && 
      (
        title match $searchTerm ||
        name match $searchTerm ||
        metaDescription match $searchTerm
      )
    ] | order(_type asc) {
      _id,
      _type,
      title,
      name,
      slug
    }[0...30]`,t=await p.client.fetch(e,{searchTerm:`*${r}*`}),s={articles:[],posts:[],creditCards:[]};for(let e of t)"article"===e._type&&s.articles.length<10?s.articles.push(e):"post"===e._type&&s.posts.length<10?s.posts.push(e):"creditCard"===e._type&&s.creditCards.length<10&&s.creditCards.push(e);return n.NextResponse.json(s)}catch(e){return console.error("Search error:",e),n.NextResponse.json({error:"Failed to perform search"},{status:500})}}let u=new a.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/search/route",pathname:"/api/search",filename:"route",bundlePath:"app/api/search/route"},resolvedPagePath:"C:\\Users\\sbots\\OneDrive\\Desktop\\TheRichGradStudent\\src\\app\\api\\search\\route.ts",nextConfigOutput:"standalone",userland:s}),{requestAsyncStorage:d,staticGenerationAsyncStorage:l,serverHooks:h}=u,m="/api/search/route";function x(){return(0,i.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:l})}},10124:(e,r,t)=>{t.d(r,{client:()=>n,s:()=>p});var s=t(57484);let a="92vz1asq",o="production",i="2024-01-01",n=(0,s.eI)({projectId:a,dataset:o,apiVersion:i,useCdn:!0});function p(e){return(0,s.eI)({projectId:a,dataset:o,apiVersion:i,useCdn:!e,perspective:e?"previewDrafts":"published",token:e?.token||process.env.SANITY_API_TOKEN})}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[8948,7484,5972],()=>t(36266));module.exports=s})();