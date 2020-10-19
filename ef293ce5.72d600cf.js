(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{186:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var r=n(2),i=n(9),o=(n(0),n(193)),a={id:"setup",title:"Setting up CLI",sidebar_label:"Setting up CLI"},c={id:"code_doc/cli/setup",title:"Setting up CLI",description:"The CLI is called cil-import. It is found at src/cli. Before using the CLI it is reccomended to always build it to ensure the latest verision is being used.",source:"@site/docs/code_doc/cli/cli.md",permalink:"/Coastal-Image-Labeler/docs/code_doc/cli/setup",editUrl:"https://github.com/UNCG-DAISY/Coastal-Image-Labeler/edit/master/docs/docs/code_doc/cli/cli.md",sidebar_label:"Setting up CLI",sidebar:"docs",previous:{title:"Overview",permalink:"/Coastal-Image-Labeler/docs/code_doc/cli/overview"},next:{title:"NGINX",permalink:"/Coastal-Image-Labeler/docs/code_doc/ssl/nginx"}},l=[{value:"Build CLI",id:"build-cli",children:[]}],u={rightToc:l};function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The CLI is called ",Object(o.b)("inlineCode",{parentName:"p"},"cil-import"),". It is found at ",Object(o.b)("inlineCode",{parentName:"p"},"src/cli"),". Before using the CLI it is reccomended to always build it to ensure the latest verision is being used."),Object(o.b)("h2",{id:"build-cli"},"Build CLI"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Go to ",Object(o.b)("inlineCode",{parentName:"li"},"src/cli")),Object(o.b)("li",{parentName:"ol"},Object(o.b)("inlineCode",{parentName:"li"},"npm install")),Object(o.b)("li",{parentName:"ol"},"run ",Object(o.b)("inlineCode",{parentName:"li"},"sudo npm run link")," to create the CLI."),Object(o.b)("li",{parentName:"ol"},"Check with ",Object(o.b)("inlineCode",{parentName:"li"},"cil-import -V")," that the verision is the same as ",Object(o.b)("inlineCode",{parentName:"li"},"package.json"))))}p.isMDXComponent=!0},193:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var r=n(0),i=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),p=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},s=function(e){var t=p(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},b=i.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,a=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(n),b=r,m=s["".concat(a,".").concat(b)]||s[b]||d[b]||o;return n?i.a.createElement(m,c(c({ref:t},u),{},{components:n})):i.a.createElement(m,c({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,a[1]=c;for(var u=2;u<o;u++)a[u]=n[u];return i.a.createElement.apply(null,a)}return i.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);