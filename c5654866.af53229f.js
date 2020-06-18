(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{136:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return r})),t.d(n,"metadata",(function(){return i})),t.d(n,"rightToc",(function(){return s})),t.d(n,"default",(function(){return c}));var a=t(2),o=(t(0),t(152));const r={id:"adding_new_question_set",title:"Adding a new Question Set",sidebar_label:"Adding a new Question Set"},i={id:"code_documentation/extensions/form/adding_new_question_set",title:"Adding a new Question Set",description:"Question sets are a group of questions (Radio,Checkbox,Input,Textfield) that are",source:"@site/docs\\code_documentation\\extensions\\form\\question_set.md",permalink:"/Coastal-Image-Labeler/docs/code_documentation/extensions/form/adding_new_question_set",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/code_documentation/extensions/form/question_set.md",sidebar_label:"Adding a new Question Set",sidebar:"docs",previous:{title:"New Images",permalink:"/Coastal-Image-Labeler/docs/code_documentation/extensions/form/new_images"},next:{title:"Overview",permalink:"/Coastal-Image-Labeler/docs/user_documentation/userDocOverview"}},s=[{value:"General Format",id:"general-format",children:[]},{value:"Extending",id:"extending",children:[]}],l={rightToc:s};function c({components:e,...n}){return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Question sets are a group of questions (Radio,Checkbox,Input,Textfield) that are\nassigned at the Catalog level. What that means is every for every Image that\nbelongs to an Archive under a Catalog will have the same question asked when\ntagging. Editing and assigning a Question Set to a Catalog is done through the\nDatabase and any changes will be reflected when the page refreshes."),Object(o.b)("h2",{id:"general-format"},"General Format"),Object(o.b)("p",null,"The general structure of the Question Set is as follows,with 1 example for each question type with all possible fields."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'{\n    //Array of questions, they will be shown in this order\n    "questions": \n    [\n        //Radio question\n        {\n            "type": "radioGroup",\n            "docLink": "",\n            "errorMessage": "Please select 1",\n            "required": true,\n            "label": "Development Type",\n            "key": "devType", // must be unique\n            "buttons": \n            [\n                {\n                    "name": "Undeveloped",\n                    "value": "undeveloped" //value that gets sent to DB\n                }, \n                {\n                    "name": "Developed",\n                    "value": "developed"\n                }\n            ]\n        }, \n        {\n            "type": "checkboxGroup",\n            "errorMessage": "Select 0 or more",\n            "docLink": "",\n            "mix": 0, //can be left out,if so min is 0\n            "max": 4 //can be left out, if so max is the length of the button array down below\n            "required": false,\n            "label": "Impact Type(s)",\n            "key": "impactType",\n            "buttons": [\n                {\n                    "name": "Swash",\n                    "value": "swash"\n                }, \n                {\n                    "name": "Collision",\n                    "value": "collision"\n                }, \n                {\n                    "name": "Overwash",\n                    "value": "overwash"\n                }, \n                {\n                    "name": "Inundation",\n                    "value": "inundation"\n                }\n            ]\n        }, \n        {\n            "type": "textField",\n            "required": false,\n            "label": "Additional Comments",\n            "docLink": "",\n            "key": "additionalComments",\n            "multiline": true,\n            "rows": 5\n        }\n    ],\n    "name": "Coastal Storm Questions",\n    "description": "\ud83c\udf00",\n    "__v": 0\n    //This value is used to assign to a catalog\n    "_id":"5ed82a588896022158fa0852"\n}\n')),Object(o.b)("h2",{id:"extending"},"Extending"),Object(o.b)("p",null,"To add more questions to a Question Set, or make your own, simply edit the\n",Object(o.b)("inlineCode",{parentName:"p"},"questionsets")," collection in the Database. "),Object(o.b)("div",{className:"admonition admonition-danger alert alert--danger"},Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(o.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})))),"danger")),Object(o.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"Due to the large range in possible values and the manual entry, there isnt\nmuch in the way of error checking ",Object(o.b)("strong",{parentName:"p"},Object(o.b)("em",{parentName:"strong"},"for now")),", so please make sure all fields are\nentered correctly. The best way is to copy a existing working Question Set. "))))}c.isMDXComponent=!0},152:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return b}));var a=t(0),o=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=o.a.createContext({}),u=function(e){var n=o.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},d=function(e){var n=u(e.components);return o.a.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},m=o.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(t),m=a,b=d["".concat(i,".").concat(m)]||d[m]||p[m]||r;return t?o.a.createElement(b,s(s({ref:n},c),{},{components:t})):o.a.createElement(b,s({ref:n},c))}));function b(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<r;c++)i[c]=t[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}m.displayName="MDXCreateElement"}}]);