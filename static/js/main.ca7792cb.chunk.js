(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{124:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(52),r=a.n(l),o=(a(68),a(70),a(126)),u=a(6),m=function(){return c.a.createElement("aside",{className:"learn"},c.a.createElement("header",null,c.a.createElement("h3",null,"react-pouchdb"),c.a.createElement("h5",null,"Example"),c.a.createElement("a",{href:"https://github.com/ArnoSaine/react-pouchdb/tree/master/todoapp"},"Source")),c.a.createElement("hr",null),c.a.createElement("h4",null,"Official Resources"),c.a.createElement("ul",null,[{url:"https://github.com/ArnoSaine/react-pouchdb",text:"react-pouchdb"},{url:"https://pouchdb.com",text:"PouchDB"},{url:"http://couchdb.apache.org",text:"CouchDB"}].map(function(e){var t=e.text,a=e.url;return c.a.createElement("li",{key:a},c.a.createElement("a",{href:a},t))})))},i=a(59),s=a.n(i),p=function(e){var t=e.children;return c.a.createElement("div",{className:"learn-bar ".concat(s.a["learn-bar"])},c.a.createElement(m,null),t)},d=a(17);function b(){var e=Object(u.b)().bulkDocs,t=Object(u.c)({selector:{completed:!0}}),a=t.length;return a?c.a.createElement("button",{className:"clear-completed",onClick:function(){return e(t.map(function(e){return Object(d.a)({},e,{_deleted:!0})}))},type:"button"},"Clear completed (",a,")"):null}function h(){var e=Object(u.c)({selector:{completed:{$ne:!0}}}).length;return c.a.createElement("span",{className:"todo-count"},e," ",1===e?"item":"items"," left")}var E=a(127),f=function(){return c.a.createElement("ul",{className:"filters"},[{path:"",title:"All"},{path:"active",title:"Active"},{path:"completed",title:"Completed"}].map(function(e){var t=e.path,a=e.title;return c.a.createElement("li",{key:t},c.a.createElement(E.a,{activeClassName:"selected",exact:!0,replace:!0,to:"/".concat(t)},a))}))},v=function(){return c.a.createElement("footer",{className:"footer"},c.a.createElement(h,null),c.a.createElement(f,null),c.a.createElement(b,null))};function g(){var e=Object(u.b)().post;return c.a.createElement("input",{autoFocus:!0,className:"new-todo",onKeyDown:function(t){var a=t.keyCode,n=t.target,c=n.value.trim();13===a&&c&&(e({title:c,timestamp:Date.now()}),n.value="")},placeholder:"What needs to be done?",type:"text"})}var O=a(125),j=a(26),k=a(61),N=a.n(k);function w(e){var t=e.doc,a=e.doc.completed,l=void 0!==a&&a,r=Object(u.b)(),o=r.put,m=r.remove,i=Object(n.useState)(),s=Object(j.a)(i,2),p=s[0],b=s[1],h=Object(n.useState)(),E=Object(j.a)(h,2),f=E[0],v=E[1],g=Object(n.useState)(t.title),O=Object(j.a)(g,2),k=O[0],w=O[1],y=Object(n.useRef)();return Object(n.useEffect)(function(){p&&(y.current.focus(),b(!1))}),c.a.createElement("li",{className:N()(l&&"completed",f&&"editing"),onDoubleClick:function(){b(!0),v(!0)}},c.a.createElement("div",{className:"view"},c.a.createElement("input",{className:"toggle",checked:l,onChange:function(){return o(Object(d.a)({},t,{completed:!l}))},type:"checkbox"}),c.a.createElement("label",null,k),c.a.createElement("button",{className:"destroy",onClick:function(){return m(t)},type:"button"})),c.a.createElement("input",{className:"edit",ref:y,type:"text",value:k,onChange:function(e){var t=e.target.value;return w(t)},onBlur:function(){v(!1),o(Object(d.a)({},t,{title:k}))}}))}var y={active:{$ne:!0},completed:!0};function x(e){var t=e.match.params.filter,a=Object(u.c)({selector:{timestamp:{$gte:null},completed:y[t]},sort:["timestamp"]});return c.a.createElement("ul",{className:"todo-list"},a.map(function(e){return c.a.createElement(w,{key:e._id,doc:e})}))}var C=function(){return c.a.createElement(O.a,{path:"/:filter?",component:x})};function S(){var e=Object(u.c)({selector:{timestamp:{$gte:null}}}),t=Object(u.b)().bulkDocs;return e.length?function(){var a=e.every(function(e){return e.completed});return c.a.createElement(c.a.Fragment,null,c.a.createElement("input",{id:"toggle-all",className:"toggle-all",checked:a,onChange:function(){return t(e.map(function(e){return Object(d.a)({},e,{completed:!a})}))},type:"checkbox"}),c.a.createElement("label",{htmlFor:"toggle-all"}))}():null}var D=a(62).a;var B=function(){return c.a.createElement(n.Suspense,{fallback:"loading..."},c.a.createElement(p,null,c.a.createElement(u.a,{name:"todoapp"},c.a.createElement(o.a,{basename:D},c.a.createElement("section",{className:"todoapp"},c.a.createElement("header",null,c.a.createElement("h1",null,"todos")),c.a.createElement(g,null),c.a.createElement("section",{className:"main"},c.a.createElement(S,null),c.a.createElement(C,null),c.a.createElement(v,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},59:function(e,t,a){e.exports={"learn-bar":"styles_learn-bar__2qN9S"}},62:function(e){e.exports={a:"/react-pouchdb"}},63:function(e,t,a){e.exports=a(124)}},[[63,2,1]]]);
//# sourceMappingURL=main.ca7792cb.chunk.js.map