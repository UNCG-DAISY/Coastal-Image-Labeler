(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{166:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(2),r=n(9),l=(n(0),n(178)),o={id:"overview",title:"Full Deployment Cycle",sidebar_label:"Full Deployment Cycle"},i={id:"code_doc/deployment/overview",title:"Full Deployment Cycle",description:"Pre VM Tasks",source:"@site/docs/code_doc/deployment/overview.md",permalink:"/Coastal-Image-Labeler/docs/code_doc/deployment/overview",editUrl:"https://github.com/UNCG-DAISY/Coastal-Image-Labeler/edit/master/docs/docs/code_doc/deployment/overview.md",sidebar_label:"Full Deployment Cycle",sidebar:"docs",previous:{title:"Certbot",permalink:"/Coastal-Image-Labeler/docs/code_doc/ssl/certbot"},next:{title:"Tools",permalink:"/Coastal-Image-Labeler/docs/code_doc/tools"}},c=[{value:"Pre VM Tasks",id:"pre-vm-tasks",children:[]},{value:"VM Install",id:"vm-install",children:[{value:"Node js",id:"node-js",children:[]},{value:"PM2",id:"pm2",children:[]},{value:"Code-Server",id:"code-server",children:[]},{value:"Jpegoptim",id:"jpegoptim",children:[]},{value:"NGINX",id:"nginx",children:[]},{value:"Certbot",id:"certbot",children:[]}]},{value:"VM Setup",id:"vm-setup",children:[]}],s={rightToc:c};function b(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"pre-vm-tasks"},"Pre VM Tasks"),Object(l.b)("ol",null,Object(l.b)("li",{parentName:"ol"},"Create Auth0 Applications. Create the 2 Tenants(development and production)."),Object(l.b)("li",{parentName:"ol"},"Create database with proper IP whitelisting as mentioned ",Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"../database/connection"}),"here"))),Object(l.b)("h2",{id:"vm-install"},"VM Install"),Object(l.b)("p",null,"There are a few packages/things to install."),Object(l.b)("h3",{id:"node-js"},"Node js"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash",metastring:'title="Install node js"',title:'"Install',node:!0,'js"':!0}),"sudo apt update\nsudo apt install nodejs\nsudo apt install npm\nnodejs -v\n\ncurl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -\nsudo apt-get install -y nodejs\n")),Object(l.b)("h3",{id:"pm2"},"PM2"),Object(l.b)("p",null,"This will require node js to be installed. ",Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://pm2.keymetrics.io/"}),"PM2")," is a node js package that runs the node server in the background"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash",metastring:'title="Install PM2 globally"',title:'"Install',PM2:!0,'globally"':!0}),"npm i pm2 -g\npm2 install pm2-logrotate\n")),Object(l.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(l.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-heading"}),Object(l.b)("h5",{parentName:"div"},Object(l.b)("span",Object(a.a)({parentName:"h5"},{className:"admonition-icon"}),Object(l.b)("svg",Object(a.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(l.b)("path",Object(a.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"Log Folder")),Object(l.b)("div",Object(a.a)({parentName:"div"},{className:"admonition-content"}),Object(l.b)("p",{parentName:"div"},"Looking at ",Object(l.b)("inlineCode",{parentName:"p"},"src/dashboard/ecosystem.config.js")," Log files will be created at ",Object(l.b)("inlineCode",{parentName:"p"},"../../../../pm2Logs/${timestamp}/")," where ",Object(l.b)("inlineCode",{parentName:"p"},"timestamp")," is  ",Object(l.b)("inlineCode",{parentName:"p"},"month-day-year_hour.minutes.seconds"),". Please make sure to create the folder ",Object(l.b)("inlineCode",{parentName:"p"},"../../../../pm2Logs/"),". PM2 will do the rest."))),Object(l.b)("h3",{id:"code-server"},"Code-Server"),Object(l.b)("p",null,Object(l.b)("strong",{parentName:"p"},"Optional")),Object(l.b)("p",null,"Found ",Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/cdr/code-server"}),"here"),". Basically run the commands"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash",metastring:'title="Installing Code-Server"',title:'"Installing','Code-Server"':!0}),"curl -fsSL https://code-server.dev/install.sh | sh\n")),Object(l.b)("p",null,"And then set up the config in ",Object(l.b)("inlineCode",{parentName:"p"},"/home/YOUR_USER_NAME/.config/code-server"),". Mine looks like"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="code-server config.yaml"',title:'"code-server','config.yaml"':!0}),"auth: password\npassword: PUT UR PASSWORD HERE\nhost: 0.0.0.0\nport: 1337\n")),Object(l.b)("p",null,"Make sure the port is setup in the firewall"),Object(l.b)("h3",{id:"jpegoptim"},"Jpegoptim"),Object(l.b)("p",null,Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/tjko/jpegoptim"}),"repo")," and\n",Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://vitux.com/optimize-jpeg-jpg-images-in-ubuntu-with-jpegoptim/"}),"useage"),".\nThe rest of the jpegoptim stuff is handled by the bash scripts in ",Object(l.b)("inlineCode",{parentName:"p"},"Coastal-Image-Labeler\\src\\cli\\bash")),Object(l.b)("h3",{id:"nginx"},"NGINX"),Object(l.b)("p",null,"This is a reverse proxy that runs on ports 80 and 443 and redirects traffic to\nthe node server so that it doesnt have to run in sudo mode."),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash",metastring:'title="Install NGINX"',title:'"Install','NGINX"':!0}),"sudo apt update\nsudo apt install nginx\n")),Object(l.b)("p",null,"Check to see its running with "),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"sudo systemctl status nginx\n")),Object(l.b)("h3",{id:"certbot"},"Certbot"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash",metastring:'title="Install Certbot"',title:'"Install','Certbot"':!0}),"sudo add-apt-repository ppa:certbot/certbot\nsudo apt-get update\nsudo apt-get install python-certbot-nginx\n")),Object(l.b)("h2",{id:"vm-setup"},"VM Setup"),Object(l.b)("ol",null,Object(l.b)("li",{parentName:"ol"},"Setup NGINX ",Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"../ssl/nginx"}),"here")," and Certbot ",Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"../ssl/certbot"}),"here")),Object(l.b)("li",{parentName:"ol"},"Go to ",Object(l.b)("inlineCode",{parentName:"li"},"Coastal-Image-Labeler/src/dashboard")," and install dependencies with ",Object(l.b)("inlineCode",{parentName:"li"},"npm install")),Object(l.b)("li",{parentName:"ol"},"Create the ",Object(l.b)("inlineCode",{parentName:"li"},".env.*.local")," files like ",Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"../auth0/auth0"}),"here"),", get their values like ",Object(l.b)("a",Object(a.a)({parentName:"li"},{href:"../auth0/auth0Values"}),"here"),"."),Object(l.b)("li",{parentName:"ol"},"Run the server with ",Object(l.b)("inlineCode",{parentName:"li"},"npm run pm2")," which will build and start the site in production mode. If need to run the site in development mode, run ",Object(l.b)("inlineCode",{parentName:"li"},"npm run dev"),".")),Object(l.b)("p",null,"As a note, ",Object(l.b)("inlineCode",{parentName:"p"},"sudo pm2 list")," will show all pm2 processes. To stop the server type "),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"sudo pm2 stop all\nsudo pm2 delete all\n")),Object(l.b)("p",null,"so that next time theres a clean restart."))}b.isMDXComponent=!0},178:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return u}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),b=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=b(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=b(n),m=a,u=p["".concat(o,".").concat(m)]||p[m]||d[m]||l;return n?r.a.createElement(u,i(i({ref:t},s),{},{components:n})):r.a.createElement(u,i({ref:t},s))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=n[s];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);