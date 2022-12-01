import{registerVersion as e,_registerComponent as t,_getProvider as n,getApp as i}from"./firebase-app.js";class a extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,a.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,o.prototype.create)}}class o{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],s=o?function(e,t){return e.replace(r,((e,n)=>{const i=t[n];return null!=i?String(i):`<${n}?>`}))}(o,n):"Error",c=`${this.serviceName}: ${s} (${i}).`;return new a(i,c,n)}}const r=/\{\$([^}]+)}/g;function s(e){return e&&e._delegate?e._delegate:e}class c{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}let u,d;const p=new WeakMap,f=new WeakMap,l=new WeakMap,g=new WeakMap,w=new WeakMap;let h={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return f.get(e);if("objectStoreNames"===t)return e.objectStoreNames||l.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return y(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function m(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(d||(d=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(v(this),t),y(p.get(this))}:function(...t){return y(e.apply(v(this),t))}:function(t,...n){const i=e.call(v(this),t,...n);return l.set(i,t.sort?t.sort():[t]),y(i)}}function b(e){return"function"==typeof e?m(e):(e instanceof IDBTransaction&&function(e){if(f.has(e))return;const t=new Promise(((t,n)=>{const i=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",o),e.removeEventListener("abort",o)},a=()=>{t(),i()},o=()=>{n(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",a),e.addEventListener("error",o),e.addEventListener("abort",o)}));f.set(e,t)}(e),t=e,(u||(u=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,h):e);var t}function y(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,n)=>{const i=()=>{e.removeEventListener("success",a),e.removeEventListener("error",o)},a=()=>{t(y(e.result)),i()},o=()=>{n(e.error),i()};e.addEventListener("success",a),e.addEventListener("error",o)}));return t.then((t=>{t instanceof IDBCursor&&p.set(t,e)})).catch((()=>{})),w.set(t,e),t}(e);if(g.has(e))return g.get(e);const t=b(e);return t!==e&&(g.set(e,t),w.set(t,e)),t}const v=e=>w.get(e);function k(e,t,{blocked:n,upgrade:i,blocking:a,terminated:o}={}){const r=indexedDB.open(e,t),s=y(r);return i&&r.addEventListener("upgradeneeded",(e=>{i(y(r.result),e.oldVersion,e.newVersion,y(r.transaction))})),n&&r.addEventListener("blocked",(()=>n())),s.then((e=>{o&&e.addEventListener("close",(()=>o())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),s}function I(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",(()=>t())),y(n).then((()=>{}))}const S=["get","getKey","getAll","getAllKeys","count"],T=["put","add","delete","clear"],D=new Map;function C(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(D.get(t))return D.get(t);const n=t.replace(/FromIndex$/,""),i=t!==n,a=T.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!a&&!S.includes(n))return;const o=async function(e,...t){const o=this.transaction(e,a?"readwrite":"readonly");let r=o.store;return i&&(r=r.index(t.shift())),(await Promise.all([r[n](...t),a&&o.done]))[0]};return D.set(t,o),o}h=(e=>({...e,get:(t,n,i)=>C(t,n)||e.get(t,n,i),has:(t,n)=>!!C(t,n)||e.has(t,n)}))(h);const j="@firebase/installations",E=new o("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function P(e){return e instanceof a&&e.code.includes("request-failed")}function O({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function _(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function M(e,t){const n=(await t.json()).error;return E.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function A({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function K(e,{refreshToken:t}){const n=A(e);return n.append("Authorization",function(e){return`FIS_v2 ${e}`}(t)),n}async function N(e){const t=await e();return t.status>=500&&t.status<600?e():t}function x(e){return new Promise((t=>{setTimeout(t,e)}))}const B=/^[cdef][\w-]{21}$/;function $(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}(e);return B.test(t)?t:""}catch(e){return""}}function L(e){return`${e.appName}!${e.appId}`}const q=new Map;function F(e,t){const n=L(e);R(n,t),function(e,t){const n=function(){!H&&"BroadcastChannel"in self&&(H=new BroadcastChannel("[Firebase] FID Change"),H.onmessage=e=>{R(e.data.key,e.data.fid)});return H}();n&&n.postMessage({key:e,fid:t});0===q.size&&H&&(H.close(),H=null)}(n,t)}function R(e,t){const n=q.get(e);if(n)for(const e of n)e(t)}let H=null;const W="firebase-installations-store";let V=null;function U(){return V||(V=k("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(W)}})),V}async function G(e,t){const n=L(e),i=(await U()).transaction(W,"readwrite"),a=i.objectStore(W),o=await a.get(n);return await a.put(t,n),await i.done,o&&o.fid===t.fid||F(e,t.fid),t}async function z(e){const t=L(e),n=(await U()).transaction(W,"readwrite");await n.objectStore(W).delete(t),await n.done}async function J(e,t){const n=L(e),i=(await U()).transaction(W,"readwrite"),a=i.objectStore(W),o=await a.get(n),r=t(o);return void 0===r?await a.delete(n):await a.put(r,n),await i.done,!r||o&&o.fid===r.fid||F(e,r.fid),r}async function Y(e){let t;const n=await J(e.appConfig,(n=>{const i=function(e){return X(e||{fid:$(),registrationStatus:0})}(n),a=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(E.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=async function(e,t){try{const n=await async function({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const i=O(e),a=A(e),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}const r={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.5.16"},s={method:"POST",headers:a,body:JSON.stringify(r)},c=await N((()=>fetch(i,s)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:_(e.authToken)}}throw await M("Create Installation",c)}(e,t);return G(e.appConfig,n)}catch(n){throw P(n)&&409===n.customData.serverCode?await z(e.appConfig):await G(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Q(e)}:{installationEntry:t}}(e,i);return t=a.registrationPromise,a.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Q(e){let t=await Z(e.appConfig);for(;1===t.registrationStatus;)await x(100),t=await Z(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Y(e);return n||t}return t}function Z(e){return J(e,(e=>{if(!e)throw E.create("installation-not-found");return X(e)}))}function X(e){return 1===(t=e).registrationStatus&&t.registrationTime+1e4<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t}async function ee({appConfig:e,heartbeatServiceProvider:t},n){const i=function(e,{fid:t}){return`${O(e)}/${t}/authTokens:generate`}(e,n),a=K(e,n),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&a.append("x-firebase-client",e)}const r={installation:{sdkVersion:"w:0.5.16",appId:e.appId}},s={method:"POST",headers:a,body:JSON.stringify(r)},c=await N((()=>fetch(i,s)));if(c.ok){return _(await c.json())}throw await M("Generate Auth Token",c)}async function te(e,t=!1){let n;const i=await J(e.appConfig,(i=>{if(!ie(i))throw E.create("not-registered");const a=i.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(a))return i;if(1===a.requestStatus)return n=async function(e,t){let n=await ne(e.appConfig);for(;1===n.authToken.requestStatus;)await x(100),n=await ne(e.appConfig);const i=n.authToken;return 0===i.requestStatus?te(e,t):i}(e,t),i;{if(!navigator.onLine)throw E.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(i);return n=async function(e,t){try{const n=await ee(e,t),i=Object.assign(Object.assign({},t),{authToken:n});return await G(e.appConfig,i),n}catch(n){if(!P(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await G(e.appConfig,n)}else await z(e.appConfig);throw n}}(e,t),t}}));return n?await n:i.authToken}function ne(e){return J(e,(e=>{if(!ie(e))throw E.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+1e4<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n}))}function ie(e){return void 0!==e&&2===e.registrationStatus}async function ae(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await Y(e);t&&await t}(n);return(await te(n,t)).token}function oe(e){return E.create("missing-app-config-values",{valueName:e})}const re=e=>{const t=e.getProvider("app").getImmediate(),i=n(t,"installations").getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:i}=await Y(t);return i?i.catch(console.error):te(t).catch(console.error),n.fid}(i),getToken:e=>ae(i,e)}};t(new c("installations",(e=>{const t=e.getProvider("app").getImmediate(),i=function(e){if(!e||!e.options)throw oe("App Configuration");if(!e.name)throw oe("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw oe(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:i,heartbeatServiceProvider:n(t,"heartbeat"),_delete:()=>Promise.resolve()}}),"PUBLIC")),t(new c("installations-internal",re,"PRIVATE")),e(j,"0.5.16"),e(j,"0.5.16","esm2017");const se="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4";var ce,ue;function de(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function pe(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=atob(t),i=new Uint8Array(n.length);for(let e=0;e<n.length;++e)i[e]=n.charCodeAt(e);return i}!function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"}(ce||(ce={})),function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}(ue||(ue={}));const fe="firebase-messaging-store";let le=null;function ge(){return le||(le=k("firebase-messaging-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(fe)}})),le}async function we(e){const t=me(e),n=await ge(),i=await n.transaction(fe).objectStore(fe).get(t);if(i)return i;{const t=await async function(e){if("databases"in indexedDB){const e=(await indexedDB.databases()).map((e=>e.name));if(!e.includes("fcm_token_details_db"))return null}let t=null;return(await k("fcm_token_details_db",5,{upgrade:async(n,i,a,o)=>{var r;if(i<2)return;if(!n.objectStoreNames.contains("fcm_token_object_Store"))return;const s=o.objectStore("fcm_token_object_Store"),c=await s.index("fcmSenderId").get(e);if(await s.clear(),c)if(2===i){const e=c;if(!e.auth||!e.p256dh||!e.endpoint)return;t={token:e.fcmToken,createTime:null!==(r=e.createTime)&&void 0!==r?r:Date.now(),subscriptionOptions:{auth:e.auth,p256dh:e.p256dh,endpoint:e.endpoint,swScope:e.swScope,vapidKey:"string"==typeof e.vapidKey?e.vapidKey:de(e.vapidKey)}}}else if(3===i){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:de(e.auth),p256dh:de(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:de(e.vapidKey)}}}else if(4===i){const e=c;t={token:e.fcmToken,createTime:e.createTime,subscriptionOptions:{auth:de(e.auth),p256dh:de(e.p256dh),endpoint:e.endpoint,swScope:e.swScope,vapidKey:de(e.vapidKey)}}}}})).close(),await I("fcm_token_details_db"),await I("fcm_vapid_details_db"),await I("undefined"),function(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}(t)?t:null}(e.appConfig.senderId);if(t)return await he(e,t),t}}async function he(e,t){const n=me(e),i=(await ge()).transaction(fe,"readwrite");return await i.objectStore(fe).put(t,n),await i.done,t}function me({appConfig:e}){return e.appId}const be=new o("messaging","Messaging",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."});async function ye(e,t){var n;const i={method:"DELETE",headers:await ke(e)};try{const n=await fetch(`${ve(e.appConfig)}/${t}`,i),a=await n.json();if(a.error){const e=a.error.message;throw be.create("token-unsubscribe-failed",{errorInfo:e})}}catch(e){throw be.create("token-unsubscribe-failed",{errorInfo:null===(n=e)||void 0===n?void 0:n.toString()})}}function ve({projectId:e}){return`https://fcmregistrations.googleapis.com/v1/projects/${e}/registrations`}async function ke({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Ie({p256dh:e,auth:t,endpoint:n,vapidKey:i}){const a={web:{endpoint:n,auth:t,p256dh:e}};return i!==se&&(a.web.applicationPubKey=i),a}async function Se(e){const t=await async function(e,t){const n=await e.pushManager.getSubscription();if(n)return n;return e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:pe(t)})}(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:de(t.getKey("auth")),p256dh:de(t.getKey("p256dh"))},i=await we(e.firebaseDependencies);if(i){if(function(e,t){const n=t.vapidKey===e.vapidKey,i=t.endpoint===e.endpoint,a=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&i&&a&&o}(i.subscriptionOptions,n))return Date.now()>=i.createTime+6048e5?async function(e,t){try{const n=await async function(e,t){var n;const i=await ke(e),a=Ie(t.subscriptionOptions),o={method:"PATCH",headers:i,body:JSON.stringify(a)};let r;try{const n=await fetch(`${ve(e.appConfig)}/${t.token}`,o);r=await n.json()}catch(e){throw be.create("token-update-failed",{errorInfo:null===(n=e)||void 0===n?void 0:n.toString()})}if(r.error){const e=r.error.message;throw be.create("token-update-failed",{errorInfo:e})}if(!r.token)throw be.create("token-update-no-token");return r.token}(e.firebaseDependencies,t),i=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await he(e.firebaseDependencies,i),n}catch(t){throw await Te(e),t}}(e,{token:i.token,createTime:Date.now(),subscriptionOptions:n}):i.token;try{await ye(e.firebaseDependencies,i.token)}catch(e){console.warn(e)}return De(e.firebaseDependencies,n)}return De(e.firebaseDependencies,n)}async function Te(e){const t=await we(e.firebaseDependencies);t&&(await ye(e.firebaseDependencies,t.token),await async function(e){const t=me(e),n=(await ge()).transaction(fe,"readwrite");await n.objectStore(fe).delete(t),await n.done}(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();return!n||n.unsubscribe()}async function De(e,t){const n=await async function(e,t){var n;const i=await ke(e),a=Ie(t),o={method:"POST",headers:i,body:JSON.stringify(a)};let r;try{const t=await fetch(ve(e.appConfig),o);r=await t.json()}catch(e){throw be.create("token-subscribe-failed",{errorInfo:null===(n=e)||void 0===n?void 0:n.toString()})}if(r.error){const e=r.error.message;throw be.create("token-subscribe-failed",{errorInfo:e})}if(!r.token)throw be.create("token-subscribe-no-token");return r.token}(e,t),i={token:n,createTime:Date.now(),subscriptionOptions:t};return await he(e,i),i.token}function Ce(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return function(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const i=t.notification.body;i&&(e.notification.body=i);const a=t.notification.image;a&&(e.notification.image=a);const o=t.notification.icon;o&&(e.notification.icon=o)}(t,e),function(e,t){if(!t.data)return;e.data=t.data}(t,e),function(e,t){var n,i,a,o,r;if(!t.fcmOptions&&!(null===(n=t.notification)||void 0===n?void 0:n.click_action))return;e.fcmOptions={};const s=null!==(a=null===(i=t.fcmOptions)||void 0===i?void 0:i.link)&&void 0!==a?a:null===(o=t.notification)||void 0===o?void 0:o.click_action;s&&(e.fcmOptions.link=s);const c=null===(r=t.fcmOptions)||void 0===r?void 0:r.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}(t,e),t}function je(e,t){const n=[];for(let i=0;i<e.length;i++)n.push(e.charAt(i)),i<t.length&&n.push(t.charAt(i));return n.join("")}function Ee(e){return be.create("missing-app-config-values",{valueName:e})}je("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),je("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");class Pe{constructor(e,t,n){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const i=function(e){if(!e||!e.options)throw Ee("App Configuration Object");if(!e.name)throw Ee("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const e of t)if(!n[e])throw Ee(e);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}(e);this.firebaseDependencies={app:e,appConfig:i,installations:t,analyticsProvider:n}}_delete(){return Promise.resolve()}}async function Oe(e){var t;try{e.swRegistration=await navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"}),e.swRegistration.update().catch((()=>{}))}catch(e){throw be.create("failed-service-worker-registration",{browserErrorMessage:null===(t=e)||void 0===t?void 0:t.message})}}async function _e(e,t){if(!navigator)throw be.create("only-available-in-window");if("default"===Notification.permission&&await Notification.requestPermission(),"granted"!==Notification.permission)throw be.create("permission-blocked");return await async function(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=se)}(e,null==t?void 0:t.vapidKey),await async function(e,t){if(t||e.swRegistration||await Oe(e),t||!e.swRegistration){if(!(t instanceof ServiceWorkerRegistration))throw be.create("invalid-sw-registration");e.swRegistration=t}}(e,null==t?void 0:t.serviceWorkerRegistration),Se(e)}async function Me(e,t,n){const i=function(e){switch(e){case ue.NOTIFICATION_CLICKED:return"notification_open";case ue.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(i,{message_id:n["google.c.a.c_id"],message_name:n["google.c.a.c_l"],message_time:n["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)})}const Ae="@firebase/messaging",Ke=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:e=>_e(t,e)}};async function Ne(){try{await new Promise(((e,t)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(i);a.onsuccess=()=>{a.result.close(),n||self.indexedDB.deleteDatabase(i),e(!0)},a.onupgradeneeded=()=>{n=!1},a.onerror=()=>{var e;t((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}catch(e){return!1}return"undefined"!=typeof window&&"object"==typeof indexedDB&&!("undefined"==typeof navigator||!navigator.cookieEnabled)&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function xe(e=i()){return Ne().then((e=>{if(!e)throw be.create("unsupported-browser")}),(e=>{throw be.create("indexed-db-unsupported")})),n(s(e),"messaging").getImmediate()}async function Be(e,t){return _e(e=s(e),t)}function $e(e){return async function(e){if(!navigator)throw be.create("only-available-in-window");return e.swRegistration||await Oe(e),Te(e)}(e=s(e))}function Le(e,t){return function(e,t){if(!navigator)throw be.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}(e=s(e),t)}t(new c("messaging",(e=>{const t=new Pe(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",(e=>async function(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===ue.PUSH_RECEIVED&&("function"==typeof e.onMessageHandler?e.onMessageHandler(Ce(n)):e.onMessageHandler.next(Ce(n)));const i=n.data;var a;"object"==typeof(a=i)&&a&&"google.c.a.c_id"in a&&"1"===i["google.c.a.e"]&&await Me(e,n.messageType,i)}(t,e))),t}),"PUBLIC")),t(new c("messaging-internal",Ke,"PRIVATE")),e(Ae,"0.11.0"),e(Ae,"0.11.0","esm2017");export{$e as deleteToken,xe as getMessaging,Be as getToken,Ne as isSupported,Le as onMessage};

//# sourceMappingURL=firebase-messaging.js.map