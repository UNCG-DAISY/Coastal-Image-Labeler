(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{146:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return i})),a.d(t,"metadata",(function(){return r})),a.d(t,"rightToc",(function(){return s})),a.d(t,"default",(function(){return l}));var n=a(2),o=(a(0),a(152));const i={id:"imageTaggingProcess",title:"Image Tagging Process",sidebar_label:"Image Tagging Process"},r={id:"user_documentation/imageTaggingProcess",title:"Image Tagging Process",description:"The site",source:"@site/docs\\user_documentation\\tagging_process.md",permalink:"/Coastal-Image-Labeler/docs/user_documentation/imageTaggingProcess",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/user_documentation/tagging_process.md",sidebar_label:"Image Tagging Process",sidebar:"docs",previous:{title:"Overview",permalink:"/Coastal-Image-Labeler/docs/user_documentation/userDocOverview"},next:{title:"Data Sources",permalink:"/Coastal-Image-Labeler/docs/user_documentation/data_sources"}},s=[{value:"The site",id:"the-site",children:[]},{value:"Sign in with Auth0",id:"sign-in-with-auth0",children:[]},{value:"Get permission to label specific catalogs of images",id:"get-permission-to-label-specific-catalogs-of-images",children:[]},{value:"Navigating the site \u2014 Select catalog and archive",id:"navigating-the-site--select-catalog-and-archive",children:[]},{value:"Labeling",id:"labeling",children:[]}],c={rightToc:s};function l({components:e,...t}){return Object(o.b)("wrapper",Object(n.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"the-site"},"The site"),Object(o.b)("p",null,"The first step is to navigate to the site: ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"https://coastalimagelabeler.science"}),"https://coastalimagelabeler.science")),Object(o.b)("h2",{id:"sign-in-with-auth0"},"Sign in with Auth0"),Object(o.b)("p",null,"You will be prompted to log on using Auth0. At the moment, we accept two ways of logging on \u2014 you can use a new account that you generate just for this service OR you can sign in with your google account. We do not store your password, or pull any info from your Google account (besides your name).\nYou might ask why we are asking users to log in to the service. There are xx reasons:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"We want to be able to give credit to people who participate (in the form of authorship on data releases)."),Object(o.b)("li",{parentName:"ul"},"We want to know that users are trained coastal experts."),Object(o.b)("li",{parentName:"ul"},"We want to make sure at least two different people come to a consensus on an image label,  so labels can reflect multiple expert opinions.")),Object(o.b)("h2",{id:"get-permission-to-label-specific-catalogs-of-images"},"Get permission to label specific catalogs of images"),Object(o.b)("p",null,"Once the login is complete, users will need to request permission to be a labeler.\nInstructions on how to do this are available after login. Permission to tag images is given for\nspecific catalogs of images \u2014 each catalog of image is separate. This was done to help users deal\nwith the huge number of options and images that we have uploaded."),Object(o.b)("h2",{id:"navigating-the-site--select-catalog-and-archive"},"Navigating the site \u2014 Select catalog and archive"),Object(o.b)("p",null,"Once you have permission to label images, you can click on the 'Label image' link on the left of screen to be shown a wizard \u2014 which steps a user through the decision of which images to tag. For Hurricane imagery, each storm is its own catalog, and each archive is a set of images taken on a specific day, or on a specific NOAA flight."),Object(o.b)("p",null,"If you are a returning labeler, you will be also be shown your progress in labeling catalogs and archives, and you can resume these tasks."),Object(o.b)("h2",{id:"labeling"},"Labeling"),Object(o.b)("p",null,"Once you select images to label, you are sent to the images and given questions to answer. To familiarize yourselves with the question sets, look at questions for ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"question_sets/storm_impact.md"}),"Storm Impact")," images and questions for the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"question_sets/collision.md"}),"Dune Collision")," images."))}l.isMDXComponent=!0},152:function(e,t,a){"use strict";a.d(t,"a",(function(){return g})),a.d(t,"b",(function(){return m}));var n=a(0),o=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},g=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,r=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),g=u(a),b=n,m=g["".concat(r,".").concat(b)]||g[b]||p[b]||i;return a?o.a.createElement(m,s(s({ref:t},l),{},{components:a})):o.a.createElement(m,s({ref:t},l))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,r=new Array(i);r[0]=b;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,r[1]=s;for(var l=2;l<i;l++)r[l]=a[l];return o.a.createElement.apply(null,r)}return o.a.createElement.apply(null,a)}b.displayName="MDXCreateElement"}}]);