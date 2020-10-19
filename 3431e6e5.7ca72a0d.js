(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{149:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return c}));var o=t(2),a=t(9),r=(t(0),t(193)),s={id:"sandbox",title:"Sandbox",sidebar_label:"Sandbox"},i={id:"code_doc/misc/sandbox",title:"Sandbox",description:"The sandbox file (Coastal-Image-Labeler\\src\\dashboard\\server\\sandbox.ts) is used to access and edit the database within Node.js to have all the bells and whistles that come with it (Such as Mongoose). This is so that you dont have to direclty connect to the database and interact with that, but rather through the same layer that the dashboard does. It can be ran with npm run sandbox and has all the imports needed to do basic stuff like querying.",source:"@site/docs/code_doc/misc/sandbox.md",permalink:"/Coastal-Image-Labeler/docs/code_doc/misc/sandbox",editUrl:"https://github.com/UNCG-DAISY/Coastal-Image-Labeler/edit/master/docs/docs/code_doc/misc/sandbox.md",sidebar_label:"Sandbox",sidebar:"docs",previous:{title:"What Tags store",permalink:"/Coastal-Image-Labeler/docs/code_doc/misc/tags"},next:{title:"Tools",permalink:"/Coastal-Image-Labeler/docs/code_doc/tools"}},l=[],d={rightToc:l};function c(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},d,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"The sandbox file (",Object(r.b)("inlineCode",{parentName:"p"},"Coastal-Image-Labeler\\src\\dashboard\\server\\sandbox.ts"),") is used to access and edit the database within Node.js to have all the bells and whistles that come with it (Such as Mongoose). This is so that you dont have to direclty connect to the database and interact with that, but rather through the same layer that the dashboard does. It can be ran with ",Object(r.b)("inlineCode",{parentName:"p"},"npm run sandbox")," and has all the imports needed to do basic stuff like querying. "),Object(r.b)("p",null,"This is the basic code for the sandbox"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-js",metastring:'title="sandbox"',title:'"sandbox"'}),"import 'module-alias/register'\n// import * as Types from '@/interfaces/index'\nimport dotenv from 'dotenv'\n\n// Load env vars\ndotenv.config({\n  path: './.env.sandbox.local',\n})\n\nimport { connectDB, closeConnection } from './db'\nimport { log } from '@/utils/logger'\nimport { RegisterModels, RegisterModelDefaults } from '@/models/index'\n\n//Remember if some modles are not used, make sure to comment them out.\n//THe linter will cry about unused imports\nimport { ArchiveModel } from '@/models/Archive'\nimport { AssignedImageModel } from '@/models/AssignedImages'\nimport { CatalogModel } from '@/models/Catalog'\nimport { ImageModel } from '@/models/Image'\nimport { QuestionSetModel } from '@/models/QuestionSet'\nimport { TagModel } from '@/models/Tag'\nimport { UserModel } from '@/models/User'\n\nasync function main() {\n  await connectDB()\n\n  RegisterModels()\n  await RegisterModelDefaults()\n\n  await sandbox()\n\n  await closeConnection()\n}\n\nasync function sandbox() {\n  log({\n    message: 'Starting sandbox function',\n    type: 'ok',\n  })\n\n  const [\n    archiveRes,\n    assingedImagesRes,\n    catalogRes,\n    imageRes,\n    questionSetRes,\n    tagRes,\n    userRes,\n  ] = await Promise.all([\n    ArchiveModel.find({}),\n    AssignedImageModel.find({}),\n    CatalogModel.find({}),\n    ImageModel.find({}),\n    QuestionSetModel.find({}),\n    TagModel.find({}),\n    UserModel.find({}),\n  ])\n\n  log({\n    message: `# of Archives: ${archiveRes.length}`,\n    type: 'info',\n  })\n  log({\n    message: `# of Assinged Images: ${assingedImagesRes.length}`,\n    type: 'info',\n  })\n  log({\n    message: `# of Catalogs: ${catalogRes.length}`,\n    type: 'info',\n  })\n  log({\n    message: `# of Images: ${imageRes.length}`,\n    type: 'info',\n  })\n  log({\n    message: `# of Question sets: ${questionSetRes.length}`,\n    type: 'info',\n  })\n  log({\n    message: `# of Tags: ${tagRes.length}`,\n    type: 'info',\n  })\n  log({\n    message: `# of Users: ${userRes.length}`,\n    type: 'info',\n  })\n\n  log({\n    message: 'Ending sandbox function',\n    type: 'ok',\n  })\n}\nmain()\n\n\n")))}c.isMDXComponent=!0},193:function(e,n,t){"use strict";t.d(n,"a",(function(){return m})),t.d(n,"b",(function(){return p}));var o=t(0),a=t.n(o);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var d=a.a.createContext({}),c=function(e){var n=a.a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},m=function(e){var n=c(e.components);return a.a.createElement(d.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},g=a.a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=c(t),g=o,p=m["".concat(s,".").concat(g)]||m[g]||u[g]||r;return t?a.a.createElement(p,i(i({ref:n},d),{},{components:t})):a.a.createElement(p,i({ref:n},d))}));function p(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=t.length,s=new Array(r);s[0]=g;var i={};for(var l in n)hasOwnProperty.call(n,l)&&(i[l]=n[l]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var d=2;d<r;d++)s[d]=t[d];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,t)}g.displayName="MDXCreateElement"}}]);