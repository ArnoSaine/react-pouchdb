(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{44:function(e,t,n){"use strict";(function(e){var r=n(3),a=n.n(r),c=n(8),o=n.n(c),u=n(9),i=n.n(u),l=n(30),s=n.n(l),f=function(e){return new Promise(function(t){var n=new FileReader;n.onload=function(){return t(new Uint8Array(n.result))},n.readAsArrayBuffer(e)})};t.a="object"===("undefined"===typeof e?"undefined":s()(e))&&e.Buffer?function(e){return e}:function(){var e=i()(a.a.mark(function e(t){var n,r,c,u,i,l;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n={},r=0,c=Object.entries(t);case 2:if(!(r<c.length)){e.next=10;break}return u=o()(c[r],2),i=u[0],l=u[1].data,e.next=6,f(l);case 6:n[i]=e.sent;case 7:r++,e.next=2;break;case 10:return e.abrupt("return",n);case 11:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()}).call(this,n(21))},49:function(e,t,n){e.exports={"learn-bar":"styles_learn-bar__3daVq"}},53:function(e){e.exports={a:"/react-pouchdb"}},55:function(e,t,n){e.exports=n(81)},81:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(43),o=n.n(c),u=(n(60),n(61),n(28)),i=n(17),l=n.n(i),s=n(8),f=n.n(s),p=n(22),d=n(23),m=n.n(d),v=n(24),b=n.n(v),h=n(35);function y(){var e=new Map;return function(t,n){function r(n){var r=n.onCleanup,a=n.value;null===r||void 0===r||r(a);var c=e,o=t.map(function(e){var t={parent:c,key:e};return c=c.get(e),t});!function e(){var t=o.pop(),n=t.parent,r=t.key;n.delete(r),!n.size&&o.length&&e()}()}var a=b()(t),c=a.pop(),o=a.reduce(function(e,t){return h.a.call(e,t,function(){return new Map})},e),u=h.a.call(o,c,function(){var e=n(function(){return r(a)}),t=f()(e,2),a={value:t[0],onCleanup:t[1],referenceCounter:0};return a});return u.referenceCounter=u.referenceCounter+1,[u.value,function(){u.referenceCounter=u.referenceCounter-1,u.referenceCounter||r(u)}]}}var x=Object(r.createContext)(),w=x,O=(x.Consumer,x.Provider);function g(e){var t=e.synchronousAPITemporarySubscriptionCleanupDelay,n=e.debounceUpdatesWait,r=e.debounceUpdatesMaxWait,a=e.maxListeners,c=l()(e,["synchronousAPITemporarySubscriptionCleanupDelay","debounceUpdatesWait","debounceUpdatesMaxWait","maxListeners"]),o=new p.a(c);return a&&o.setMaxListeners(a),Object.assign(o,{reactPouchDBOptions:{synchronousAPITemporarySubscriptionCleanupDelay:t,debounceUpdatesWait:n,debounceUpdatesMaxWait:r}})}var E=y();function j(e){var t="string"===typeof e?{name:e}:e,n=m()(t),a=Object(r.useMemo)(function(){return t},[n]),c=[a],o=Object(r.useMemo)(function(){return void 0===n?[]:E([n],function(){return[a?g(a):void 0,function(e){null===e||void 0===e||e.close()}]})},c),u=f()(o,2),i=u[0],l=u[1];return Object(r.useEffect)(function(){return l},c),i}function k(e){var t,n,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=a.callee,o=void 0===c?"useDB":c,u=a.example,i=void 0===u?"useDB(options)":u,l=e instanceof p.a?e:void 0,s=j(l?void 0:e),f=Object(r.useContext)(w),d=null!==(t=null!==(n=l)&&void 0!==n?n:s)&&void 0!==t?t:f;if(!d)throw new Error(o?"`".concat(o,"` was called without `db` and database is not in context. Provide database using <PouchDB> or `").concat(i,"`"):"Database is not in context. Provide database using <PouchDB>");return d}var C=function(e,t){return function(n){var a=function(){var t;return t=n.apply(void 0,arguments),e(t)};return function(e){var n,c=e.db,o=e.children,u=l()(e,["db","children"]),i={db:k(c,t)};return Object.assign(i,c?a(c,u):a(u)),"function"===typeof o?(null===(n=o.prototype)||void 0===n?void 0:n.isReactComponent)?Object(r.createElement)(o,i):o(i):Object(r.cloneElement)(r.Children.only(o),i)}}},D=C(function(e){return{docs:e}},{callee:"<Find>",example:"<Find db={name|options} ... />"}),P=C(function(e){return{doc:e}},{callee:"<Get>",example:"<Get db={name|options} ... />"}),_=n(3),N=n.n(_),B=n(32),S=n.n(B),W=n(30),A=n.n(W),M=n(9),U=n.n(M),F=n(54),I=n(2),R=n(4),T=function(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return e.call.apply(e,[this].concat(b()(n.reverse())))}},$=function(e){var t;return function(){var n=U()(N.a.mark(function n(){var r,a,c,o=this,u=arguments;return N.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:for(r=u.length,a=new Array(r),c=0;c<r;c++)a[c]=u[c];return t=U()(N.a.mark(function n(){return N.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t;case 2:return n.abrupt("return",e.call.apply(e,[o].concat(a)));case 3:case"end":return n.stop()}},n)}))(),n.abrupt("return",t);case 3:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}()},G=y();function L(e,t){var n=this,r=G([this,e],function(){return[n.changes(e),function(e){e.cancel()}]}),a=f()(r,2),c=a[0],o=a[1],u=$(t);return c.on("change",u),function(){c.removeListener("change",u),o()}}function V(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?V(n,!0).forEach(function(t){S()(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):V(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}p.a.plugin(F.a);var J={live:!0,include_docs:!0,since:"now",return_docs:!1},K=n(44);function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function H(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(n,!0).forEach(function(t){S()(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Q=["attachments","ajax","binary","id"];function X(e,t){return Y.apply(this,arguments)}function Y(){return(Y=U()(N.a.mark(function e(t,n){return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||!n||n._deleted){e.next=11;break}return e.t1=H,e.t2={},e.t3=n,e.next=6,Object(K.a)(n._attachments);case 6:e.t4=e.sent,e.t5={_attachments:e.t4},e.t0=(0,e.t1)(e.t2,e.t3,e.t5),e.next=12;break;case 11:e.t0=n;case 12:return e.abrupt("return",e.t0);case 13:case"end":return e.stop()}},e)}))).apply(this,arguments)}var Z=n(45);function ee(e,t){var n,r,a=new Set;return{getCurrentValue:function(){return n},subscribe:function(c){return a.add(c),1===a.size&&(r=U()(N.a.mark(function t(){return N.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e(function(e){n=[null,e],a.forEach(function(e){return e()})});case 3:return t.abrupt("return",t.sent);case 6:t.prev=6,t.t0=t.catch(0),n=[t.t0],a.forEach(function(e){return e()});case 10:case"end":return t.stop()}},t,null,[[0,6]])}))()),U()(N.a.mark(function e(){var n;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a.delete(c),a.size){e.next=7;break}return t(),e.next=5,r;case 5:null===(n=e.sent)||void 0===n||n();case 7:case"end":return e.stop()}},e)}))}}}var te=y();function ne(e,t,n){var a=m()(t);return Object(r.useMemo)(function(){return function(e,t,n){return te([e,t],function(e){return[ee(n,e)]})[0]}(e,a,n)},[e,a,n])}var re,ae=n(46),ce=(re=function(e,t){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4;if(!e.getCurrentValue())throw new Promise(function(n){var r=e.subscribe(n);setTimeout(r,t)});return Object(Z.useSubscription)(e)}(e,t.reactPouchDBOptions.synchronousAPITemporarySubscriptionCleanupDelay)},function(e,t,n){var a;return a=ne(e,t,Object(r.useCallback)(function(t){var r,a;return a=t,r=function(e){var t=e.reactPouchDBOptions,n=e.reactPouchDBOptions,r=n.debounceUpdatesWait,a=void 0===r?100:r,c=n.debounceUpdatesMaxWait,o=void 0===c?1e3:c;return null===t.debounceUpdatesWait?function(e){return e}:function(e){return Object(ae.debounce)(e,a,{leading:!0,trailing:!0,maxWait:o})}}(e)(a),n(r)},[e,n])),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=f()(e,2),n=t[0],r=t[1];if(n)throw n;return r}(re(a,e))});function oe(e){var t=e.children,n=l()(e,["children"]);return a.a.createElement(O,{value:j(n)},t)}var ue=n(47),ie=n.n(ue),le=n(48),se=n.n(le),fe=(T(function(e,t){return Object(r.forwardRef)(se()(Object.assign(function(n,r){return a.a.createElement(e,ie()({},n,{db:k(t,{callee:"withDB",example:"withDB(name|options, Component)"}),ref:r}))},{displayName:"withDB(".concat(e.displayName||e.name,")"),WrappedComponent:e}),e))}),function(e){return T(function(t,n){n=k(n,{callee:"useFind",example:"useFind(db, options)"});var r=t.selector,a=t.limit,c=t.skip,o=t.sort;return e(n,t,function(){var e=U()(N.a.mark(function e(u){var i,l,s,p;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!o){e.next=3;break}return e.next=3,n.createIndex({index:{fields:o.map(function(e){return"object"===A()(e)?Object.keys(e)[0]:e})}});case 3:return e.next=5,n.find(t);case 5:return l=e.sent,s=l.docs,(p=function(){return u(b()(s))})(),e.abrupt("return",(i=n,L).call(i,J,function(){var e=U()(N.a.mark(function e(u){var i,l,d,m,v,b,h,y,x,w,O,g,E,j,k,C,D;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(l=u.deleted,d=u.doc,m=null===(i=s)||void 0===i?void 0:i.findIndex(function(e){var t=e._id;return d._id===t}),v=-1!==m,!(l||r&&!Object(R.g)(d,r))){e.next=17;break}if(!v){e.next=15;break}if(s.splice(m,1),(b=s.length)+1!==a){e.next=14;break}return e.next=10,n.find(z({},t,{limit:1,skip:(t.skip||0)+b}));case 10:h=e.sent,y=f()(h.docs,1),(x=y[0])&&s.push(x);case 14:p();case 15:e.next=36;break;case 17:if(v?s[m]=d:(s||(s=[]),s.push(d)),o&&(w=o.map(function(e){return"object"===A()(e)?Object.entries(e)[0]:[e,"asc"]}),s.sort(function(e,t){var n=!0,r=!1,a=void 0;try{for(var c,o=w[Symbol.iterator]();!(n=(c=o.next()).done);n=!0){var u=f()(c.value,2),i=u[0],l=u[1],s=Object(I.a)(e[i],t[i]);if(0!==s)return"asc"===l?s:-s}}catch(p){r=!0,a=p}finally{try{n||null==o.return||o.return()}finally{if(r)throw a}}return 0})),O=s.findIndex(function(e){var t=e._id;return d._id===t}),!v||O+1!==a){e.next=27;break}return e.next=23,n.find(z({},t,{limit:1,skip:(t.skip||0)+O}));case 23:g=e.sent,E=f()(g.docs,1),(null===(j=E[0])||void 0===j?void 0:j._id)!==d._id&&(s[O]=j);case 27:if(!c||0!==O){e.next=34;break}return e.next=30,n.find(z({},t,{limit:1}));case 30:k=e.sent,C=f()(k.docs,1),(null===(D=C[0])||void 0===D?void 0:D._id)!==d._id&&(s[0]=D);case 34:s.length>a&&s.splice(a),p();case 36:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()));case 10:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())})}(ce)),pe=function(e){return T(function(t,n){n=k(n,{callee:"useGet",example:"useGet(db, options)"});var a=t.id,c=t.attachments,o=l()(t,["id","attachments"]),u="u8a"===c,i=Object(r.useMemo)(function(){return H({binary:u},o,{attachments:!!c})},[u,m()(o),!!c]),s=Object(r.useMemo)(function(){return H({},i,{live:!0,include_docs:!0,since:"now",doc_ids:[a]})},[i,a]);return e(n,t,function(){var e=U()(N.a.mark(function e(r){var c;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=r,e.t1=X,e.t2=u,e.next=6,n.get(a,i);case 6:return e.t3=e.sent,e.next=9,(0,e.t1)(e.t2,e.t3);case 9:e.t4=e.sent,(0,e.t0)(e.t4),e.next=18;break;case 13:if(e.prev=13,e.t5=e.catch(0),404===e.t5.status){e.next=17;break}throw e.t5;case 17:r(null);case 18:if(!Object.keys(t).every(function(e){return Q.includes(e)})){e.next=20;break}return e.abrupt("return",(c=n,L).call(c,s,function(){var e=U()(N.a.mark(function e(t){var n;return N.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.doc,e.t0=r,e.next=4,X(u,n);case 4:e.t1=e.sent,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()));case 20:case"end":return e.stop()}},e,null,[[0,13]])}));return function(t){return e.apply(this,arguments)}}())})}(ce),de=(D(fe),P(pe),function(){return a.a.createElement("aside",{className:"learn"},a.a.createElement("header",null,a.a.createElement("h3",null,"react-pouchdb"),a.a.createElement("h5",null,"Example"),a.a.createElement("a",{href:"https://github.com/ArnoSaine/react-pouchdb/tree/master/todoapp"},"Source")),a.a.createElement("hr",null),a.a.createElement("h4",null,"Official Resources"),a.a.createElement("ul",null,[{url:"https://github.com/ArnoSaine/react-pouchdb",text:"react-pouchdb"},{url:"https://pouchdb.com",text:"PouchDB"},{url:"http://couchdb.apache.org",text:"CouchDB"}].map(function(e){var t=e.text,n=e.url;return a.a.createElement("li",{key:n},a.a.createElement("a",{href:n},t))})))}),me=n(49),ve=n.n(me),be=function(e){var t=e.children;return a.a.createElement("div",{className:"learn-bar ".concat(ve.a["learn-bar"])},a.a.createElement(de,null),t)},he=n(20);function ye(){var e=fe({selector:{completed:!0}}),t=k().bulkDocs,n=e.length;return n?a.a.createElement("button",{className:"clear-completed",onClick:function(){return t(e.map(function(e){return Object(he.a)({},e,{_deleted:!0})}))},type:"button"},"Clear completed (",n,")"):null}function xe(){var e=fe({selector:{completed:{$ne:!0}}}).length;return a.a.createElement("span",{className:"todo-count"},e," ",1===e?"item":"items"," left")}function we(){return a.a.createElement("ul",{className:"filters"},[{path:"",title:"All"},{path:"active",title:"Active"},{path:"completed",title:"Completed"}].map(function(e){var t=e.path,n=e.title;return a.a.createElement("li",{key:t},a.a.createElement(u.b,{activeClassName:"selected",exact:!0,replace:!0,to:"/".concat(t)},n))}))}function Oe(){return fe({selector:{}}).length?a.a.createElement("footer",{className:"footer"},a.a.createElement(xe,null),a.a.createElement(we,null),a.a.createElement(ye,null)):null}function ge(){var e=k().post;return a.a.createElement("input",{autoFocus:!0,className:"new-todo",onKeyDown:function(t){var n=t.keyCode,r=t.target,a=r.value.trim();13===n&&a&&(e({title:a,timestamp:Date.now()}),r.value="")},placeholder:"What needs to be done?",type:"text"})}var Ee=n(18),je=n(38),ke=n(52),Ce=n.n(ke);function De(e){var t=e.doc,n=e.doc,c=n.completed,o=void 0!==c&&c,u=n.title,i=k(),l=i.put,s=i.remove,f=Object(r.useState)(),p=Object(je.a)(f,2),d=p[0],m=p[1],v=Object(r.useState)(),b=Object(je.a)(v,2),h=b[0],y=b[1],x=Object(r.useRef)();function w(){y(!1),l(Object(he.a)({},t,{title:x.current.value.trim()}))}return Object(r.useEffect)(function(){d&&(x.current.focus(),m(!1))},[d,m]),a.a.createElement("li",{className:Ce()(o&&"completed",h&&"editing"),onDoubleClick:function(){m(!0),y(!0)}},a.a.createElement("div",{className:"view"},a.a.createElement("input",{className:"toggle",checked:o,onChange:function(){return l(Object(he.a)({},t,{completed:!o}))},type:"checkbox"}),a.a.createElement("label",null,u),a.a.createElement("button",{className:"destroy",onClick:function(){return s(t)},type:"button"})),a.a.createElement("input",{className:"edit",ref:x,type:"text",defaultValue:u,onKeyDown:function(e){13===e.keyCode&&w()},onBlur:w}))}var Pe={active:{$ne:!0},completed:!0};function _e(e){var t=e.match.params.filter,n=fe({selector:{timestamp:{$gte:null},completed:Pe[t]},sort:["timestamp"]});return a.a.createElement("ul",{className:"todo-list"},n.map(function(e){return a.a.createElement(De,{key:e._id,doc:e})}))}function Ne(){return a.a.createElement(Ee.a,{path:"/:filter?",component:_e})}function Be(){var e=fe({selector:{timestamp:{$gte:null}}}),t=k().bulkDocs;return e.length?function(){var n=e.every(function(e){return e.completed});return a.a.createElement(a.a.Fragment,null,a.a.createElement("input",{id:"toggle-all",className:"toggle-all",checked:n,onChange:function(){return t(e.map(function(e){return Object(he.a)({},e,{completed:!n})}))},type:"checkbox"}),a.a.createElement("label",{htmlFor:"toggle-all"}))}():null}var Se=n(53).a;var We=function(){return a.a.createElement(r.Suspense,{fallback:"loading..."},a.a.createElement(be,null,a.a.createElement(oe,{name:"todoapp"},a.a.createElement(u.a,{basename:Se},a.a.createElement("section",{className:"todoapp"},a.a.createElement("header",null,a.a.createElement("h1",null,"todos")),a.a.createElement(ge,null),a.a.createElement("section",{className:"main"},a.a.createElement(Be,null),a.a.createElement(Ne,null),a.a.createElement(Oe,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(We,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[55,1,2]]]);
//# sourceMappingURL=main.5db402da.chunk.js.map