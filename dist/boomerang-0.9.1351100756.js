BOOMR_start=(new Date).getTime(),function(e){var t,n,r,i=e.document;typeof BOOMR=="undefined"&&(BOOMR={});if(BOOMR.version)return;BOOMR.version="0.9.1351100756",t={beacon_url:"",site_domain:e.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase(),user_ip:"",events:{page_ready:[],page_unload:[],dom_loaded:[],visibility_changed:[],before_beacon:[]},vars:{},disabled_plugins:{},fireEvent:function(e,t){var n,r,i;if(!this.events.hasOwnProperty(e))return!1;i=this.events[e];for(n=0;n<i.length;n++)r=i[n],r[0].call(r[2],t,r[1]);return!0}},n={t_start:BOOMR_start,t_end:null,utils:{getCookie:function(e){if(!e)return null;e=" "+e+"=";var t,n;return n=" "+i.cookie+";",(t=n.indexOf(e))>=0?(t+=e.length,n=n.substring(t,n.indexOf(";",t)),n):null},setCookie:function(e,n,r){var s=[],o,u,a,f;if(!e)return!1;for(o in n)n.hasOwnProperty(o)&&s.push(encodeURIComponent(o)+"="+encodeURIComponent(n[o]));return s=s.join("&"),u=e+"="+s,a=[u,"path=/","domain="+t.site_domain],r&&(f=new Date,f.setTime(f.getTime()+r*1e3),f=f.toGMTString(),a.push("expires="+f)),u.length<4e3?(i.cookie=a.join("; "),s===this.getCookie(e)):!1},getSubCookies:function(e){var t,n,r,i,s={};if(!e)return null;t=e.split("&");if(t.length===0)return null;for(n=0,r=t.length;n<r;n++)i=t[n].split("="),i.push(""),s[decodeURIComponent(i[0])]=decodeURIComponent(i[1]);return s},removeCookie:function(e){return this.setCookie(e,{},0)},pluginConfig:function(e,t,n,r){var i,s=0;if(!t||!t[n])return!1;for(i=0;i<r.length;i++)typeof t[n][r[i]]!="undefined"&&(e[r[i]]=t[n][r[i]],s++);return s>0},addListener:function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)},removeListener:function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent("on"+t,n)}},init:function(r){var s,o,u=["beacon_url","site_domain","user_ip"];r||(r={});for(s=0;s<u.length;s++)typeof r[u[s]]!="undefined"&&(t[u[s]]=r[u[s]]);typeof r.log!="undefined"&&(this.log=r.log),this.log||(this.log=function(e,t,n){});for(o in this.plugins){if(r[o]&&"enabled"in r[o]&&r[o].enabled===!1){t.disabled_plugins[o]=1;continue}t.disabled_plugins[o]&&delete t.disabled_plugins[o],this.plugins.hasOwnProperty(o)&&typeof this.plugins[o].init=="function"&&this.plugins[o].init(r)}if(!("autorun"in r)||r.autorun!==!1)"onpagehide"in e?n.utils.addListener(e,"pageshow",BOOMR.page_ready):n.utils.addListener(e,"load",BOOMR.page_ready);n.utils.addListener(e,"DOMContentLoaded",function(){t.fireEvent("dom_loaded")});var a=function(){t.fireEvent("visibility_changed")};return i.webkitVisibilityState?n.utils.addListener(i,"webkitvisibilitychange",a):i.msVisibilityState?n.utils.addListener(i,"msvisibilitychange",a):i.visibilityState&&n.utils.addListener(i,"visibilitychange",a),n.utils.addListener(i,"mouseup",t.onclick_handler),"onpagehide"in e||n.utils.addListener(e,"unload",function(){e=null}),this},page_ready:function(){return t.fireEvent("page_ready"),this},subscribe:function(r,i,s,o){var u,a,f;if(!t.events.hasOwnProperty(r))return this;f=t.events[r];for(u=0;u<f.length;u++){a=f[u];if(a[0]===i&&a[1]===s&&a[2]===o)return this}f.push([i,s||{},o||null]);if(r==="page_unload"){var l=function(){i&&i.call(o,null,s),i=o=s=null};"onpagehide"in e?n.utils.addListener(e,"pagehide",l):(n.utils.addListener(e,"unload",l),n.utils.addListener(e,"beforeunload",l))}return this},addVar:function(e,n){if(typeof e=="string")t.vars[e]=n;else if(typeof e=="object"){var r=e,i;for(i in r)r.hasOwnProperty(i)&&(t.vars[i]=r[i])}return this},removeVar:function(){var e,n;if(!arguments.length)return this;arguments.length===1&&Object.prototype.toString.apply(arguments[0])==="[object Array]"?n=arguments[0]:n=arguments;for(e=0;e<n.length;e++)t.vars.hasOwnProperty(n[e])&&delete t.vars[n[e]];return this},sendBeacon:function(){var e,n,r,s=0;for(e in this.plugins)if(this.plugins.hasOwnProperty(e)){if(t.disabled_plugins[e])continue;if(!this.plugins[e].is_complete())return this}t.vars.v=BOOMR.version,t.vars.u=i.URL.replace(/#.*/,""),t.fireEvent("before_beacon",t.vars);if(!t.beacon_url)return this;n=t.beacon_url+(t.beacon_url.indexOf("?")>-1?"&":"?");for(e in t.vars)t.vars.hasOwnProperty(e)&&(s++,n+="&"+encodeURIComponent(e)+"="+(t.vars[e]===undefined||t.vars[e]===null?"":encodeURIComponent(t.vars[e])));return s&&(r=new Image,r.src=n),this}},delete BOOMR_start;var s=function(e){return function(t,n){return this.log(t,e,"boomerang"+(n?"."+n:"")),this}};n.debug=s("debug"),n.info=s("info"),n.warn=s("warn"),n.error=s("error"),e.YAHOO&&e.YAHOO.widget&&e.YAHOO.widget.Logger?n.log=e.YAHOO.log:typeof e.Y!="undefined"&&typeof e.Y.log!="undefined"?n.log=e.Y.log:typeof console!="undefined"&&typeof console.log!="undefined"&&(n.log=function(e,t,n){console.log(n+": ["+t+"] "+e)});for(r in n)n.hasOwnProperty(r)&&(BOOMR[r]=n[r]);BOOMR.plugins=BOOMR.plugins||{}}(window),function(e){var t=e.document;BOOMR=BOOMR||{},BOOMR.plugins=BOOMR.plugins||{};var n={complete:!1,timers:{},cookie:"RT",cookie_exp:600,strict_referrer:!0,navigationType:0,navigationStart:undefined,responseStart:undefined,t_start:undefined,r:undefined,r2:undefined,setCookie:function(){var e,n=(new Date).getTime();return this.cookie?BOOMR.utils.setCookie(this.cookie,{s:n,r:t.URL.replace(/#.*/,"")},this.cookie_exp)?(e=(new Date).getTime(),e-n>50&&(BOOMR.utils.removeCookie(this.cookie),BOOMR.error("took more than 50ms to set cookie... aborting: "+n+" -> "+e,"rt")),this):(BOOMR.error("cannot set start cookie","rt"),this):this},initFromCookie:function(){var e;this.r=this.r2=t.referrer.replace(/#.*/,"");if(!this.cookie)return;e=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie));if(!e)return;if(e.s&&e.r){this.r=e.r;if(!this.strict_referrer||this.r===this.r2)this.t_start=parseInt(e.s,10)}},checkPreRender:function(){return!!t.webkitVisibilityState&&t.webkitVisibilityState==="prerender"||!!t.msVisibilityState&&t.msVisibilityState===3?(BOOMR.plugins.RT.startTimer("t_load",this.navigationStart),BOOMR.plugins.RT.endTimer("t_load"),BOOMR.plugins.RT.startTimer("t_prerender",this.navigationStart),BOOMR.plugins.RT.startTimer("t_postrender"),BOOMR.subscribe("visibility_changed",BOOMR.plugins.RT.done,null,BOOMR.plugins.RT),!0):!1},initNavTiming:function(){var t,n,r;if(this.navigationStart)return;n=e.performance||e.msPerformance||e.webkitPerformance||e.mozPerformance,n&&n.navigation&&(this.navigationType=n.navigation.type),n&&n.timing?t=n.timing:e.chrome&&e.chrome.csi&&e.chrome.csi().startE?(t={navigationStart:e.chrome.csi().startE},r="csi"):e.gtbExternal&&e.gtbExternal.startE()&&(t={navigationStart:e.gtbExternal.startE()},r="gtb"),t?(BOOMR.addVar("rt.start",r||"navigation"),this.navigationStart=t.navigationStart||t.fetchStart||undefined,this.responseStart=t.responseStart||undefined,navigator.userAgent.match(/Firefox\/[78]\./)&&(this.navigationStart=t.unloadEventStart||t.fetchStart||undefined)):BOOMR.warn("This browser doesn't support the WebTiming API","rt");return},domloaded:function(){BOOMR.plugins.RT.endTimer("t_domloaded")}};BOOMR.plugins.RT={init:function(e){return BOOMR.utils.pluginConfig(n,e,"RT",["cookie","cookie_exp","strict_referrer"]),n.complete?this:(n.complete=!1,n.timers={},BOOMR.subscribe("page_ready",this.done,null,this),BOOMR.subscribe("dom_loaded",n.domloaded,null,n),BOOMR.subscribe("page_unload",n.setCookie,null,n),BOOMR.t_start&&(this.startTimer("boomerang",BOOMR.t_start),this.endTimer("boomerang",BOOMR.t_end),this.endTimer("boomr_fb",BOOMR.t_start)),this)},startTimer:function(e,t){return e&&(e==="t_page"&&this.endTimer("t_resp",t),n.timers[e]={start:typeof t=="number"?t:(new Date).getTime()},n.complete=!1),this},endTimer:function(e,t){return e&&(n.timers[e]=n.timers[e]||{},"end"in n.timers[e]||(n.timers[e].end=typeof t=="number"?t:(new Date).getTime())),this},setTimer:function(e,t){return e&&(n.timers[e]={delta:t}),this},done:function(){var e,t=(new Date).getTime(),r={t_done:1,t_resp:1,t_page:1},i=0,s,o,u=[];n.complete=!1,n.initNavTiming();if(n.checkPreRender())return this;n.responseStart?(this.endTimer("t_resp",n.responseStart),n.timers.t_load?this.setTimer("t_page",n.timers.t_load.end-n.responseStart):this.setTimer("t_page",t-n.responseStart)):n.timers.hasOwnProperty("t_page")&&this.endTimer("t_page"),n.timers.hasOwnProperty("t_postrender")&&(this.endTimer("t_postrender"),this.endTimer("t_prerender")),n.navigationStart?e=n.navigationStart:n.t_start&&n.navigationType!==2?(e=n.t_start,BOOMR.addVar("rt.start","cookie")):(BOOMR.addVar("rt.start","none"),e=undefined),n.initFromCookie(),this.endTimer("t_done",t),BOOMR.removeVar("t_done","t_page","t_resp","r","r2","rt.tstart","rt.bstart","rt.end","t_postrender","t_prerender","t_load"),BOOMR.addVar("rt.tstart",e),BOOMR.addVar("rt.bstart",BOOMR.t_start),BOOMR.addVar("rt.end",n.timers.t_done.end);for(s in n.timers){if(!n.timers.hasOwnProperty(s))continue;o=n.timers[s],typeof o.delta!="number"&&(typeof o.start!="number"&&(o.start=e),o.delta=o.end-o.start);if(isNaN(o.delta))continue;r.hasOwnProperty(s)?BOOMR.addVar(s,o.delta):u.push(s+"|"+o.delta),i++}return i&&(BOOMR.addVar("r",n.r),n.r2!==n.r&&BOOMR.addVar("r2",n.r2),u.length&&BOOMR.addVar("t_other",u.join(","))),n.timers={},n.complete=!0,BOOMR.sendBeacon(),this},is_complete:function(){return n.complete}}}(window),function(e){function n(){t=!0}function r(){return t}function i(){var n=[];n.push("scripts|"+e.getElementsByTagName("script").length),n.push("scriptssrc|"+e.querySelectorAll("script[src]").length),n.push("stylesheets|"+e.querySelectorAll("link[rel=stylesheet]").length),n.push("imgs|"+e.getElementsByTagName("img").length),n.push("loadedimgs|"+(e.getElementsByTagName("img").length-e.querySelectorAll("img[data-src]").length)),n.push("*|"+e.getElementsByTagName("*").length),BOOMR.addVar("domstats",n.join(",")),t=!0}BOOMR=BOOMR||{},BOOMR.plugins=BOOMR.plugins||{};var t;BOOMR.plugins.Domstats={init:function(){return e.querySelectorAll?BOOMR.subscribe("page_ready",i):n(),this},is_complete:r}}(document),function(e){function r(){BOOMR.addVar("jserrors",n),t=!0,BOOMR.sendBeacon()}function i(){return t}function s(){n++}BOOMR=BOOMR||{},BOOMR.plugins=BOOMR.plugins||{};var t,n=0;BOOMR.plugins.JsErrors={init:function(){return BOOMR.utils.addListener(window,"error",s),BOOMR.subscribe("page_ready",r),this},is_complete:i}}(window),function(e){function r(){t=!0}function i(){return t}function s(){BOOMR.utils.setCookie(n,{value:(new Date).getTime()-BOOMR_lstart}),BOOMR.utils.removeListener(e,"mousedown",s)}BOOMR=BOOMR||{},BOOMR.plugins=BOOMR.plugins||{};var t,n="t_ttfc";BOOMR.plugins.TTFC={init:function(){var t=BOOMR.utils.getCookie(n);return t?t=BOOMR.utils.getSubCookies(t):t={value:0},t.value&&(BOOMR.plugins.RT.setTimer(n,parseInt(t.value)),BOOMR.utils.removeCookie(n)),BOOMR_lstart&&BOOMR.utils.addListener(e,"mousedown",s),r(),this},is_complete:i}}(document),BOOMR.t_end=(new Date).getTime();var config;window.boomr_beacon_url?config={beacon_url:window.boomr_beacon_url}:window.BOOMR_GLOBAL_CONFIG&&(config=window.BOOMR_GLOBAL_CONFIG),config!==undefined&&BOOMR.init(config),BOOMR.t_end=(new Date).getTime();