BOOMR_start=(new Date).getTime();function BOOMR_check_doc_domain(domain){var test;if(!domain){if(window.parent===window||!document.getElementById("boomr-if-as")){return true}domain=document.domain}if(domain.indexOf(".")===-1){return false}try{test=window.parent.document;return test!==undefined}catch(err){document.domain=domain}try{test=window.parent.document;return test!==undefined}catch(err){domain=domain.replace(/^[\w\-]+\./,"")}return BOOMR_check_doc_domain(domain)}BOOMR_check_doc_domain();!function(w){var impl,boomr,d,myurl,createCustomEvent;if(w.parent!==w&&document.getElementById("boomr-if-as")&&document.getElementById("boomr-if-as").nodeName.toLowerCase()==="script"){w=w.parent;myurl=document.getElementById("boomr-if-as").src}d=w.document;if(w.BOOMR===undefined){w.BOOMR={}}BOOMR=w.BOOMR;if(BOOMR.version){return}BOOMR.version="0.9.1427980968";BOOMR.window=w;!function(){try{if(new w.CustomEvent("CustomEvent")!==undefined){createCustomEvent=function(e_name,params){return new w.CustomEvent(e_name,params)}}}catch(ignore){}try{if(!createCustomEvent&&d.createEvent&&d.createEvent("CustomEvent")){createCustomEvent=function(e_name,params){var evt=d.createEvent("CustomEvent");params=params||{cancelable:false,bubbles:false};evt.initCustomEvent(e_name,params.bubbles,params.cancelable,params.detail);return evt}}}catch(ignore){}if(!createCustomEvent&&d.createEventObject){createCustomEvent=function(e_name,params){var evt=d.createEventObject();evt.type=evt.propertyName=e_name;evt.detail=params.detail;return evt}}if(!createCustomEvent){createCustomEvent=function(){return undefined}}}();function dispatchEvent(e_name,e_data){var ev=createCustomEvent(e_name,{detail:e_data});if(!ev){return}BOOMR.setImmediate(function(){if(d.dispatchEvent){d.dispatchEvent(ev)}else if(d.fireEvent){d.fireEvent("onpropertychange",ev)}})}impl={beacon_url:"",beacon_type:"AUTO",site_domain:w.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase(),user_ip:"",strip_query_string:false,onloadfired:false,handlers_attached:false,events:{page_ready:[],page_unload:[],dom_loaded:[],visibility_changed:[],before_beacon:[],onbeacon:[],xhr_load:[],click:[],form_submit:[]},public_events:{before_beacon:"onBeforeBoomerangBeacon",onbeacon:"onBoomerangBeacon",onboomerangloaded:"onBoomerangLoaded"},vars:{},errors:{},disabled_plugins:{},onclick_handler:function(ev){var target;if(!ev){ev=w.event}if(ev.target){target=ev.target}else if(ev.srcElement){target=ev.srcElement}if(target.nodeType===3){target=target.parentNode}if(target&&target.nodeName.toUpperCase()==="OBJECT"&&target.type==="application/x-shockwave-flash"){return}impl.fireEvent("click",target)},onsubmit_handler:function(ev){var target;if(!ev){ev=w.event}if(ev.target){target=ev.target}else if(ev.srcElement){target=ev.srcElement}if(target.nodeType===3){target=target.parentNode}impl.fireEvent("form_submit",target)},fireEvent:function(e_name,data){var i,handler,ev;e_name=e_name.toLowerCase();if(!this.events.hasOwnProperty(e_name)){return false}if(this.public_events.hasOwnProperty(e_name)){dispatchEvent(this.public_events[e_name],data)}ev=this.events[e_name];for(i=0;i<ev.length;i++){try{handler=ev[i];handler.fn.call(handler.scope,data,handler.cb_data)}catch(err){BOOMR.addError(err,"fireEvent."+e_name)}}return true}};boomr={t_lstart:null,t_start:BOOMR_start,t_end:null,url:myurl,utils:{objectToString:function(o,separator,nest_level){var value=[],k;if(!o||typeof o!=="object"){return o}if(separator===undefined){separator="\n "}if(!nest_level){nest_level=0}if(Object.prototype.toString.call(o)==="[object Array]"){for(k=0;k<o.length;k++){if(nest_level>0&&o[k]!==null&&typeof o[k]==="object"){value.push(this.objectToString(o[k],separator+(separator==="\n  "?" ":""),nest_level-1))}else{value.push(encodeURIComponent(o[k]))}}separator=","}else{for(k in o){if(Object.prototype.hasOwnProperty.call(o,k)){if(nest_level>0&&o[k]!==null&&typeof o[k]==="object"){value.push(encodeURIComponent(k)+"="+this.objectToString(o[k],separator+(separator==="\n "?" ":""),nest_level-1))}else{value.push(encodeURIComponent(k)+"="+encodeURIComponent(o[k]))}}}}return value.join(separator)},getCookie:function(name){if(!name){return null}name=" "+name+"=";var i,cookies;cookies=" "+d.cookie+";";if((i=cookies.indexOf(name))>=0){i+=name.length;cookies=cookies.substring(i,cookies.indexOf(";",i));return cookies}return null},setCookie:function(name,subcookies,max_age){var value,nameval,savedval,c,exp;if(!name||!impl.site_domain){BOOMR.debug("No cookie name or site domain: "+name+"/"+impl.site_domain);return false}value=this.objectToString(subcookies,"&");nameval=name+"="+value;c=[nameval,"path=/","domain="+impl.site_domain];if(max_age){exp=new Date;exp.setTime(exp.getTime()+max_age*1e3);exp=exp.toGMTString();c.push("expires="+exp)}if(nameval.length<500){d.cookie=c.join("; ");savedval=this.getCookie(name);if(value===savedval){return true}BOOMR.warn("Saved cookie value doesn't match what we tried to set:\n"+value+"\n"+savedval)}else{BOOMR.warn("Cookie too long: "+nameval.length+" "+nameval)}return false},getSubCookies:function(cookie){var cookies_a,i,l,kv,gotcookies=false,cookies={};if(!cookie){return null}if(typeof cookie!=="string"){BOOMR.debug("TypeError: cookie is not a string: "+typeof cookie);return null}cookies_a=cookie.split("&");for(i=0,l=cookies_a.length;i<l;i++){kv=cookies_a[i].split("=");if(kv[0]){kv.push("");cookies[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]);gotcookies=true}}return gotcookies?cookies:null},removeCookie:function(name){return this.setCookie(name,{},-86400)},cleanupURL:function(url){if(!url){return""}if(impl.strip_query_string){return url.replace(/\?.*/,"?qs-redacted")}return url},hashQueryString:function(url,stripHash){if(!url){return url}if(url.match(/^\/\//)){url=location.protocol+url}if(!url.match(/^(https?|file):/)){BOOMR.error("Passed in URL is invalid: "+url);return""}if(stripHash){url=url.replace(/#.*/,"")}if(!BOOMR.utils.MD5){return url}return url.replace(/\?([^#]*)/,function(m0,m1){return"?"+(m1.length>10?BOOMR.utils.MD5(m1):m1)})},pluginConfig:function(o,config,plugin_name,properties){var i,props=0;if(!config||!config[plugin_name]){return false}for(i=0;i<properties.length;i++){if(config[plugin_name][properties[i]]!==undefined){o[properties[i]]=config[plugin_name][properties[i]];props++}}return props>0},addListener:function(el,type,fn){if(el.addEventListener){el.addEventListener(type,fn,false)}else if(el.attachEvent){el.attachEvent("on"+type,fn)}},removeListener:function(el,type,fn){if(el.removeEventListener){el.removeEventListener(type,fn,false)}else if(el.detachEvent){el.detachEvent("on"+type,fn)}},pushVars:function(arr,vars,prefix){var k,i,n=0;for(k in vars){if(vars.hasOwnProperty(k)){if(Object.prototype.toString.call(vars[k])==="[object Array]"){for(i=0;i<vars[k].length;++i){n+=BOOMR.utils.pushVars(arr,vars[k][i],k+"["+i+"]")}}else{++n;arr.push(encodeURIComponent(prefix?prefix+"["+k+"]":k)+"="+(vars[k]===undefined||vars[k]===null?"":encodeURIComponent(vars[k])))}}}return n},postData:function(urlenc){var iframe=document.createElement("iframe"),form=document.createElement("form"),input=document.createElement("input");iframe.name="boomerang_post";iframe.style.display=form.style.display="none";form.method="POST";form.action=impl.beacon_url;form.target=iframe.name;input.name="data";if(window.JSON){form.enctype="text/plain";input.value=JSON.stringify(impl.vars)}else{form.enctype="application/x-www-form-urlencoded";input.value=urlenc}document.body.appendChild(iframe);form.appendChild(input);document.body.appendChild(form);BOOMR.utils.addListener(iframe,"load",function(){document.body.removeChild(form);document.body.removeChild(iframe)});form.submit()}},init:function(config){var i,k,properties=["beacon_url","beacon_type","site_domain","user_ip","strip_query_string"];BOOMR_check_doc_domain();if(!config){config={}}for(i=0;i<properties.length;i++){if(config[properties[i]]!==undefined){impl[properties[i]]=config[properties[i]]}}if(config.log!==undefined){this.log=config.log}if(!this.log){this.log=function(){return}}for(k in this.plugins){if(this.plugins.hasOwnProperty(k)){if(config[k]&&config[k].hasOwnProperty("enabled")&&config[k].enabled===false){impl.disabled_plugins[k]=1;continue}if(impl.disabled_plugins[k]){delete impl.disabled_plugins[k]}if(typeof this.plugins[k].init==="function"){try{this.plugins[k].init(config)}catch(err){BOOMR.addError(err,this.plugins[k]+".init")}}}}if(impl.handlers_attached){return this}if(!impl.onloadfired&&(config.autorun===undefined||config.autorun!==false)){if(d.readyState&&d.readyState==="complete"){this.setImmediate(BOOMR.page_ready,null,null,BOOMR)}else{if(w.onpagehide||w.onpagehide===null){boomr.utils.addListener(w,"pageshow",BOOMR.page_ready)}else{boomr.utils.addListener(w,"load",BOOMR.page_ready)}}}boomr.utils.addListener(w,"DOMContentLoaded",function(){impl.fireEvent("dom_loaded")});!function(){var fire_visible,forms,iterator;fire_visible=function(){impl.fireEvent("visibility_changed")};if(d.webkitVisibilityState){boomr.utils.addListener(d,"webkitvisibilitychange",fire_visible)}else if(d.msVisibilityState){boomr.utils.addListener(d,"msvisibilitychange",fire_visible)}else if(d.visibilityState){boomr.utils.addListener(d,"visibilitychange",fire_visible)}boomr.utils.addListener(d,"mouseup",impl.onclick_handler);forms=d.getElementsByTagName("form");for(iterator=0;iterator<forms.length;iterator++){boomr.utils.addListener(forms[iterator],"submit",impl.onsubmit_handler)}if(!w.onpagehide&&w.onpagehide!==null){boomr.utils.addListener(w,"unload",function(){BOOMR.window=w=null})}}();impl.handlers_attached=true;return this},page_ready:function(ev){if(!ev){ev=w.event}if(!ev){ev={name:"load"}}if(impl.onloadfired){return this}impl.fireEvent("page_ready",ev);impl.onloadfired=true;return this},setImmediate:function(fn,data,cb_data,cb_scope){var cb=function(){fn.call(cb_scope||null,data,cb_data||{});cb=null};if(w.setImmediate){w.setImmediate(cb)}else if(w.msSetImmediate){w.msSetImmediate(cb)}else if(w.webkitSetImmediate){w.webkitSetImmediate(cb)}else if(w.mozSetImmediate){w.mozSetImmediate(cb)}else{setTimeout(cb,10)}},subscribe:function(e_name,fn,cb_data,cb_scope){var i,handler,ev,unload_handler;e_name=e_name.toLowerCase();if(!impl.events.hasOwnProperty(e_name)){return this}ev=impl.events[e_name];for(i=0;i<ev.length;i++){handler=ev[i];if(handler.fn===fn&&handler.cb_data===cb_data&&handler.scope===cb_scope){return this}}ev.push({fn:fn,cb_data:cb_data||{},scope:cb_scope||null});if(e_name==="page_ready"&&impl.onloadfired){this.setImmediate(fn,null,cb_data,cb_scope)}if(e_name==="page_unload"){unload_handler=function(ev){if(fn){fn.call(cb_scope,ev||w.event,cb_data)}};if(w.onpagehide||w.onpagehide===null){boomr.utils.addListener(w,"pagehide",unload_handler)}else{boomr.utils.addListener(w,"unload",unload_handler)}boomr.utils.addListener(w,"beforeunload",unload_handler)}return this},addError:function(err,src){if(typeof err!=="string"){err=String(err)}if(src!==undefined){err="["+src+":"+(new Date).getTime()+"] "+err}if(impl.errors[err]){impl.errors[err]++}else{impl.errors[err]=1}},addVar:function(name,value){if(typeof name==="string"){impl.vars[name]=value}else if(typeof name==="object"){var o=name,k;for(k in o){if(o.hasOwnProperty(k)){impl.vars[k]=o[k]}}}return this},removeVar:function(arg0){var i,params;if(!arguments.length){return this}if(arguments.length===1&&Object.prototype.toString.apply(arg0)==="[object Array]"){params=arg0}else{params=arguments}for(i=0;i<params.length;i++){if(impl.vars.hasOwnProperty(params[i])){delete impl.vars[params[i]]}}return this},requestStart:function(name){var t_start=(new Date).getTime();BOOMR.plugins.RT.startTimer("xhr_"+name,t_start);return{loaded:function(data){BOOMR.responseEnd(name,t_start,data)}}},responseEnd:function(name,t_start,data){BOOMR.plugins.RT.startTimer("xhr_"+name,t_start);impl.fireEvent("xhr_load",{name:"xhr_"+name,data:data})},sendBeacon:function(){var k,data,url,img,nparams,errors=[];BOOMR.debug("Checking if we can send beacon");for(k in this.plugins){if(this.plugins.hasOwnProperty(k)){if(impl.disabled_plugins[k]){continue}if(!this.plugins[k].is_complete()){BOOMR.debug("Plugin "+k+" is not complete, deferring beacon send");return false}}}impl.vars.v=BOOMR.version;impl.vars.u=BOOMR.utils.cleanupURL(d.URL.replace(/#.*/,""));if(w!==window){impl.vars["if"]=""}for(k in impl.errors){if(impl.errors.hasOwnProperty(k)){errors.push(k+(impl.errors[k]>1?" (*"+impl.errors[k]+")":""))}}if(errors.length>0){impl.vars.errors=errors.join("\n")}impl.errors={};impl.fireEvent("before_beacon",impl.vars);if(!impl.beacon_url){BOOMR.debug("No beacon_url, but would have sent: "+BOOMR.utils.objectToString(impl.vars));return true}data=[];nparams=BOOMR.utils.pushVars(data,impl.vars);this.setImmediate(impl.fireEvent,"onbeacon",impl.vars,impl);if(!nparams){return this}data=data.join("&");if(impl.beacon_type==="POST"){BOOMR.utils.postData(data)}else{url=impl.beacon_url+(impl.beacon_url.indexOf("?")>-1?"&":"?")+data;if(url.length>2e3&&impl.beacon_type==="AUTO"){BOOMR.utils.postData(data)}else{BOOMR.debug("Sending url: "+url.replace(/&/g,"\n "));img=new Image;img.src=url}}return true}};delete BOOMR_start;if(typeof BOOMR_lstart==="number"){boomr.t_lstart=BOOMR_lstart;delete BOOMR_lstart}else if(typeof BOOMR.window.BOOMR_lstart==="number"){boomr.t_lstart=BOOMR.window.BOOMR_lstart}!function(){var make_logger;if(w.YAHOO&&w.YAHOO.widget&&w.YAHOO.widget.Logger){boomr.log=w.YAHOO.log}else if(w.Y&&w.Y.log){boomr.log=w.Y.log}else if(typeof console==="object"&&console.log!==undefined&&w.debug){boomr.log=function(m,l,s){console.log(s+": ["+l+"] "+m)}}make_logger=function(l){return function(m,s){this.log(m,l,"boomerang"+(s?"."+s:""));return this}};boomr.debug=make_logger("debug");boomr.info=make_logger("info");boomr.warn=make_logger("warn");boomr.error=make_logger("error")}();!function(){var ident;for(ident in boomr){if(boomr.hasOwnProperty(ident)){BOOMR[ident]=boomr[ident]}}}();BOOMR.plugins=BOOMR.plugins||{};dispatchEvent("onBoomerangLoaded",{BOOMR:BOOMR})}(window);!function(w){var d=w.document,impl;BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};impl={onloadfired:false,unloadfired:false,visiblefired:false,initialized:false,complete:false,timers:{},cookie:w.performance||w.msPerformance||w.webkitPerformance||w.mozPerformance?false:"RT",cookie_exp:600,strict_referrer:true,navigationType:0,navigationStart:undefined,responseStart:undefined,t_start:undefined,cached_t_start:undefined,t_fb_approx:undefined,r:undefined,r2:undefined,basic_timers:{t_done:1,t_resp:1,t_page:1},updateCookie:function(params,timer){var t_end,t_start,subcookies,k;if(!this.cookie){return false}subcookies=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie))||{};if(typeof params==="object"){for(k in params){if(params.hasOwnProperty(k)){if(params[k]===undefined){if(subcookies.hasOwnProperty(k)){delete subcookies[k]}}else{if(k==="nu"||k==="r"){params[k]=BOOMR.utils.hashQueryString(params[k],true)}subcookies[k]=params[k]}}}}t_start=(new Date).getTime();if(timer){subcookies[timer]=t_start}BOOMR.debug("Setting cookie (timer="+timer+")\n"+BOOMR.utils.objectToString(subcookies),"rt");if(!BOOMR.utils.setCookie(this.cookie,subcookies,this.cookie_exp)){BOOMR.error("cannot set start cookie","rt");return false}t_end=(new Date).getTime();if(t_end-t_start>50){BOOMR.utils.removeCookie(this.cookie);BOOMR.error("took more than 50ms to set cookie... aborting: "+t_start+" -> "+t_end,"rt")}return true},initFromCookie:function(){var url,subcookies;subcookies=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie));if(!subcookies){return}subcookies.s=Math.max(+subcookies.ul||0,+subcookies.cl||0);BOOMR.debug("Read from cookie "+BOOMR.utils.objectToString(subcookies),"rt");if(subcookies.s&&(subcookies.r||subcookies.nu)){this.r=subcookies.r;url=BOOMR.utils.hashQueryString(d.URL,true);BOOMR.debug(this.r+" =?= "+this.r2,"rt");BOOMR.debug(subcookies.s+" <? "+(+subcookies.cl+15),"rt");BOOMR.debug(subcookies.nu+" =?= "+url,"rt");if(!this.strict_referrer||subcookies.nu&&subcookies.nu===url&&subcookies.s<+subcookies.cl+15||subcookies.s===+subcookies.ul&&this.r===this.r2){this.t_start=subcookies.s;if(+subcookies.hd>subcookies.s){this.t_fb_approx=parseInt(subcookies.hd,10)}}else{this.t_start=this.t_fb_approx=undefined}}this.updateCookie({s:undefined,r:undefined,nu:undefined,ul:undefined,cl:undefined,hd:undefined})},getBoomerangTimings:function(){var res,k,urls,url;if(BOOMR.t_start){BOOMR.plugins.RT.startTimer("boomerang",BOOMR.t_start);BOOMR.plugins.RT.endTimer("boomerang",BOOMR.t_end);BOOMR.plugins.RT.endTimer("boomr_fb",BOOMR.t_start);if(BOOMR.t_lstart){BOOMR.plugins.RT.endTimer("boomr_ld",BOOMR.t_lstart);BOOMR.plugins.RT.setTimer("boomr_lat",BOOMR.t_start-BOOMR.t_lstart)}}try{if(window.performance&&window.performance.getEntriesByName){urls={"rt.bmr.":BOOMR.url};for(url in urls){if(urls.hasOwnProperty(url)&&urls[url]){res=window.performance.getEntriesByName(urls[url]);if(!res||res.length===0){continue}res=res[0];for(k in res){if(res.hasOwnProperty(k)&&k.match(/(Start|End)$/)&&res[k]>0){BOOMR.addVar(url+k.replace(/^(...).*(St|En).*$/,"$1$2"),res[k])}}}}}}catch(e){BOOMR.addError(e,"rt.getBoomerangTimings")}},checkPreRender:function(){if(!(d.visibilityState&&d.visibilityState==="prerender")&&!(d.msVisibilityState&&d.msVisibilityState===3)){return false}BOOMR.plugins.RT.startTimer("t_load",this.navigationStart);BOOMR.plugins.RT.endTimer("t_load");BOOMR.plugins.RT.startTimer("t_prerender",this.navigationStart);BOOMR.plugins.RT.startTimer("t_postrender");BOOMR.subscribe("visibility_changed",BOOMR.plugins.RT.done,"visible",BOOMR.plugins.RT);return true},initFromNavTiming:function(){var ti,p,source;if(this.navigationStart){return}p=w.performance||w.msPerformance||w.webkitPerformance||w.mozPerformance;if(p&&p.navigation){this.navigationType=p.navigation.type}if(p&&p.timing){ti=p.timing}else if(w.chrome&&w.chrome.csi&&w.chrome.csi().startE){ti={navigationStart:w.chrome.csi().startE};source="csi"}else if(w.gtbExternal&&w.gtbExternal.startE()){ti={navigationStart:w.gtbExternal.startE()};source="gtb"}if(ti){BOOMR.addVar("rt.start",source||"navigation");this.navigationStart=ti.navigationStart||ti.fetchStart||undefined;this.responseStart=ti.responseStart||undefined;if(navigator.userAgent.match(/Firefox\/[78]\./)){this.navigationStart=ti.unloadEventStart||ti.fetchStart||undefined}}else{BOOMR.warn("This browser doesn't support the WebTiming API","rt")}return},setPageLoadTimers:function(t_done){impl.initFromCookie();impl.initFromNavTiming();if(impl.checkPreRender()){return false}if(impl.responseStart){BOOMR.plugins.RT.endTimer("t_resp",impl.responseStart);if(impl.timers.t_load){BOOMR.plugins.RT.setTimer("t_page",impl.timers.t_load.end-impl.responseStart)}else{BOOMR.plugins.RT.setTimer("t_page",t_done-impl.responseStart)}}else if(impl.timers.hasOwnProperty("t_page")){BOOMR.plugins.RT.endTimer("t_page")}else if(impl.t_fb_approx){BOOMR.plugins.RT.endTimer("t_resp",impl.t_fb_approx);BOOMR.plugins.RT.setTimer("t_page",t_done-impl.t_fb_approx)}if(impl.timers.hasOwnProperty("t_postrender")){BOOMR.plugins.RT.endTimer("t_postrender");BOOMR.plugins.RT.endTimer("t_prerender")}return true},setSupportingTimestamps:function(t_start){BOOMR.addVar("rt.tstart",t_start);if(typeof impl.t_start==="number"&&impl.t_start!==t_start){BOOMR.addVar("rt.cstart",impl.t_start)}BOOMR.addVar("rt.bstart",BOOMR.t_start);if(BOOMR.t_lstart){BOOMR.addVar("rt.blstart",BOOMR.t_lstart)}BOOMR.addVar("rt.end",impl.timers.t_done.end)},determineTStart:function(ename,pgname){var t_start;if(ename==="xhr"&&pgname&&impl.timers[pgname]){t_start=impl.timers[pgname].start;BOOMR.addVar("rt.start","manual")}else if(impl.navigationStart){t_start=impl.navigationStart}else if(impl.t_start&&impl.navigationType!==2){t_start=impl.t_start;BOOMR.addVar("rt.start","cookie")}else if(impl.cached_t_start){t_start=impl.cached_t_start}else{BOOMR.addVar("rt.start","none");t_start=undefined}BOOMR.debug("Got start time: "+t_start,"rt");impl.cached_t_start=t_start;return t_start},page_ready:function(){this.onloadfired=true},visibility_changed:function(){if(!(d.hidden||d.msHidden||d.webkitHidden)){impl.visiblefired=true}},page_unload:function(edata){BOOMR.debug("Unload called with "+BOOMR.utils.objectToString(edata)+" when unloadfired = "+this.unloadfired,"rt");if(!this.unloadfired){BOOMR.plugins.RT.done(edata,"unload")}this.updateCookie({r:d.URL},edata.type==="beforeunload"?"ul":"hd");this.unloadfired=true},_iterable_click:function(name,element,etarget,value_cb){var value;if(!etarget){return}BOOMR.debug(name+" called with "+etarget.nodeName,"rt");while(etarget&&etarget.nodeName.toUpperCase()!==element){etarget=etarget.parentNode}if(etarget&&etarget.nodeName.toUpperCase()===element){BOOMR.debug("passing through","rt");value=value_cb(etarget);this.updateCookie({nu:value},"cl");BOOMR.addVar("nu",BOOMR.utils.cleanupURL(value))}},onclick:function(etarget){impl._iterable_click("Click","A",etarget,function(t){return t.href})},onsubmit:function(etarget){impl._iterable_click("Submit","FORM",etarget,function(t){var v=t.action||d.URL||"";return v.match(/\?/)?v:v+"?"})},domloaded:function(){BOOMR.plugins.RT.endTimer("t_domloaded")}};BOOMR.plugins.RT={init:function(config){BOOMR.debug("init RT","rt");if(w!==BOOMR.window){w=BOOMR.window;d=w.document}BOOMR.utils.pluginConfig(impl,config,"RT",["cookie","cookie_exp","strict_referrer"]);impl.r=impl.r2=BOOMR.utils.hashQueryString(d.referrer,true);impl.initFromCookie();impl.getBoomerangTimings();if(impl.initialized){return this}impl.complete=false;impl.timers={};BOOMR.subscribe("page_ready",impl.page_ready,null,impl);impl.visiblefired=!(d.hidden||d.msHidden||d.webkitHidden);if(!impl.visiblefired){BOOMR.subscribe("visibility_changed",impl.visibility_changed,null,impl)}BOOMR.subscribe("page_ready",this.done,"load",this);BOOMR.subscribe("xhr_load",this.done,"xhr",this);BOOMR.subscribe("dom_loaded",impl.domloaded,null,impl);BOOMR.subscribe("page_unload",impl.page_unload,null,impl);BOOMR.subscribe("click",impl.onclick,null,impl);BOOMR.subscribe("form_submit",impl.onsubmit,null,impl);BOOMR.subscribe("before_beacon",this.addTimersToBeacon,"beacon",this);impl.initialized=true;return this},startTimer:function(timer_name,time_value){if(timer_name){if(timer_name==="t_page"){this.endTimer("t_resp",time_value)}impl.timers[timer_name]={start:typeof time_value==="number"?time_value:(new Date).getTime()}}return this},endTimer:function(timer_name,time_value){if(timer_name){impl.timers[timer_name]=impl.timers[timer_name]||{};if(impl.timers[timer_name].end===undefined){impl.timers[timer_name].end=typeof time_value==="number"?time_value:(new Date).getTime()}}return this},setTimer:function(timer_name,time_delta){if(timer_name){impl.timers[timer_name]={delta:time_delta}}return this},addTimersToBeacon:function(vars,source){var t_name,timer,t_other=[];for(t_name in impl.timers){if(impl.timers.hasOwnProperty(t_name)){timer=impl.timers[t_name];if(typeof timer.delta!=="number"){if(typeof timer.start!=="number"){timer.start=impl.cached_t_start}timer.delta=timer.end-timer.start}if(isNaN(timer.delta)){continue}if(impl.basic_timers.hasOwnProperty(t_name)){BOOMR.addVar(t_name,timer.delta)}else{t_other.push(t_name+"|"+timer.delta)}}}if(t_other.length){BOOMR.addVar("t_other",t_other.join(","))}if(source==="beacon"){impl.timers={};impl.complete=false}},done:function(edata,ename){BOOMR.debug("Called done with "+BOOMR.utils.objectToString(edata)+", "+ename,"rt");var t_start,t_done=(new Date).getTime(),subresource=false;impl.complete=false;if(ename==="load"||ename==="visible"){if(!impl.setPageLoadTimers(t_done)){return this}}if(ename==="xhr"&&edata&&edata.data){subresource=edata.data.subresource}t_start=impl.determineTStart(ename,edata?edata.name:null);this.endTimer("t_done",t_done);BOOMR.removeVar("t_done","t_page","t_resp","t_postrender","t_prerender","t_load","t_other","r","r2","rt.tstart","rt.cstart","rt.bstart","rt.end","rt.subres","rt.abld");impl.setSupportingTimestamps(t_start);this.addTimersToBeacon();if(ename!=="xhr"){BOOMR.addVar("r",BOOMR.utils.cleanupURL(impl.r));if(impl.r2!==impl.r){BOOMR.addVar("r2",BOOMR.utils.cleanupURL(impl.r2))}}if(subresource){BOOMR.addVar("rt.subres",1)}impl.updateCookie();if(ename==="unload"){BOOMR.addVar("rt.quit","");if(!impl.onloadfired){BOOMR.addVar("rt.abld","")}if(!impl.visiblefired){BOOMR.addVar("rt.ntvu","")}}impl.complete=true;BOOMR.sendBeacon();return this},is_complete:function(){return impl.complete}}}(BOOMR.window);!function(d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;function done(){complete=true}function iscomplete(){return complete}function count(){var tags=[];tags.push("scripts|"+d.getElementsByTagName("script").length);tags.push("scriptssrc|"+d.querySelectorAll("script[src]").length);tags.push("stylesheets|"+d.querySelectorAll("link[rel=stylesheet]").length);var imgsNumber=d.getElementsByTagName("img").length;tags.push("imgs|"+imgsNumber);tags.push("loadedimgs|"+(imgsNumber-d.querySelectorAll("img[data-frz-src]").length));BOOMR.addVar("optimized",!!BOOMR.window.fstrz);BOOMR.addVar("domstats",tags.join(","));complete=true;BOOMR.sendBeacon()}BOOMR.plugins.Domstats={init:function(){if(!d.querySelectorAll){done()}else{BOOMR.subscribe("page_ready",count)}return this},is_complete:iscomplete}}(BOOMR.window.document);BOOMR.addVar("cust",BOOMR.window.FRZ_GLOBAL_CUSTOMER_KEY);!function(d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;function done(){complete=true}function iscomplete(){return complete}function isSessionStorageSupported(){try{return"sessionStorage"in BOOMR.window&&BOOMR.window["sessionStorage"]!==null}catch(e){return false}}function countPageView(){if(isSessionStorageSupported()){var preloadItem=JSON.parse(sessionStorage.getItem("preload-"+location.href));if(preloadItem&&preloadItem.status==="preloaded"){BOOMR.addVar("p_id",preloadItem.uuid);BOOMR.addVar("p_method",preloadItem.method);BOOMR.addVar("p_status","view");preloadItem.status="done";sessionStorage.setItem("preload-"+location.href,JSON.stringify(preloadItem))}}complete=true;BOOMR.sendBeacon()}function countPagePreload(){if(isSessionStorageSupported()){var preloadItem=JSON.parse(sessionStorage.getItem("preload-"+location.href));if(preloadItem&&preloadItem.status==="preloading"){var img=new Image;img.src=BOOMR.window.BOOMR_GLOBAL_CONFIG.beacon_url+"?p_id="+preloadItem.uuid+"&p_method="+preloadItem.method+"&p_status=preload"+"&u="+location.href+"&r="+preloadItem.referer+"&cust="+BOOMR.window.FRZ_GLOBAL_CUSTOMER_KEY;preloadItem.status="preloaded";sessionStorage.setItem("preload-"+location.href,JSON.stringify(preloadItem))}}}BOOMR.plugins.Preload={init:function(){if(!d.querySelectorAll){done()}else{countPagePreload();BOOMR.subscribe("page_ready",countPageView)}return this},is_complete:iscomplete}}(BOOMR.window.document);!function(w){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete,jserrors=0;function done(){BOOMR.addVar("jserrors",jserrors);complete=true;BOOMR.sendBeacon()}function iscomplete(){return complete}function newError(){jserrors++}BOOMR.plugins.JsErrors={init:function(){BOOMR.utils.addListener(w,"error",newError);BOOMR.subscribe("page_ready",done);return this},is_complete:iscomplete}}(BOOMR.window);!function(w,d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete,name="t_ttfc";function done(){complete=true;BOOMR.sendBeacon()}function iscomplete(){return complete}function clicked(){if(w.sessionStorage){w.sessionStorage.setItem(name,(new Date).getTime()-w.BOOMR_lstart)}else{BOOMR.utils.setCookie(name,{value:(new Date).getTime()-w.BOOMR_lstart})}BOOMR.utils.removeListener(d,"mousedown",clicked)}BOOMR.plugins.TTFC={init:function(){if(w.sessionStorage){var ttfc=w.sessionStorage.getItem(name)||"0";if(ttfc){BOOMR.plugins.RT.setTimer(name,parseInt(ttfc));w.sessionStorage.removeItem(name)}}else{var ttfc=BOOMR.utils.getCookie(name);if(ttfc){ttfc=BOOMR.utils.getSubCookies(ttfc)}else{ttfc={value:0}}if(ttfc.value){BOOMR.plugins.RT.setTimer(name,parseInt(ttfc.value));BOOMR.utils.removeCookie(name)}}if(w.BOOMR_lstart){BOOMR.utils.addListener(d,"mousedown",clicked)}done();return this},is_complete:iscomplete}}(BOOMR.window,BOOMR.window.document);!function(w,d){if(w.performance||w.msPerformance||w.webkitPerformance||w.mozPerformance){return}BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;function iscomplete(){return true}BOOMR.plugins.Legacy={init:function(){BOOMR.plugins.RT.startTimer("t_page",w.BOOMR_lstart);BOOMR.sendBeacon();return this},is_complete:iscomplete}}(BOOMR.window,BOOMR.window.document);!function(w){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;var impl={complete:false,done:function(){var firstPaint;if(w.chrome&&w.chrome.loadTimes){var chromeTimes=w.chrome.loadTimes();if(chromeTimes.firstPaintTime===0){return setTimeout(impl.done.bind(this),100)}firstPaint=chromeTimes.firstPaintTime*1e3}else if(typeof w.performance.timing.msFirstPaint==="number"){firstPaint=w.performance.timing.msFirstPaint}if(firstPaint){BOOMR.addVar({startRender:firstPaint-w.performance.timing.navigationStart})}this.complete=true;BOOMR.sendBeacon()}};BOOMR.plugins.StartRender={init:function(){BOOMR.subscribe("page_ready",impl.done,null,impl);return this},is_complete:function(){return impl.complete}}}(BOOMR.window);var RUMSpeedIndex=function(win){win=win||window;var doc=win.document;var GetElementViewportRect=function(el){var intersect=false;if(el.getBoundingClientRect){var elRect=el.getBoundingClientRect();intersect={top:Math.max(elRect.top,0),left:Math.max(elRect.left,0),bottom:Math.min(elRect.bottom,win.innerHeight||doc.documentElement.clientHeight),right:Math.min(elRect.right,win.innerWidth||doc.documentElement.clientWidth)};if(intersect.bottom<=intersect.top||intersect.right<=intersect.left){intersect=false}else{intersect.area=(intersect.bottom-intersect.top)*(intersect.right-intersect.left)}}return intersect};var CheckElement=function(el,url){if(url){var rect=GetElementViewportRect(el);if(rect){rects.push({url:url,area:rect.area,rect:rect})}}};var GetRects=function(){var elements=doc.getElementsByTagName("*");var re=/url\((http.*)\)/gi;for(var i=0;i<elements.length;i++){var el=elements[i];var style=win.getComputedStyle(el);if(el.tagName=="IMG"){CheckElement(el,el.src)}if(style["background-image"]){re.lastIndex=0;var matches=re.exec(style["background-image"]);if(matches&&matches.length>1)CheckElement(el,matches[1])}if(el.tagName=="IFRAME"){try{var rect=GetElementViewportRect(el);if(rect){var tm=RUMSpeedIndex(el.contentWindow);if(tm){rects.push({tm:tm,area:rect.area,rect:rect})}}}catch(e){}}}};var GetRectTimings=function(){var timings={};var requests=win.performance.getEntriesByType("resource");for(var i=0;i<requests.length;i++)timings[requests[i].name]=requests[i].responseEnd;for(var j=0;j<rects.length;j++){if(!("tm"in rects[j]))rects[j].tm=timings[rects[j].url]!==undefined?timings[rects[j].url]:0}};var GetFirstPaint=function(){if("msFirstPaint"in win.performance.timing)firstPaint=win.performance.timing.msFirstPaint-navStart;if("chrome"in win&&"loadTimes"in win.chrome){var chromeTimes=win.chrome.loadTimes();if("firstPaintTime"in chromeTimes&&chromeTimes.firstPaintTime>0){var startTime=chromeTimes.startLoadTime;if("requestTime"in chromeTimes)startTime=chromeTimes.requestTime;if(chromeTimes.firstPaintTime>=startTime)firstPaint=(chromeTimes.firstPaintTime-startTime)*1e3}}if(firstPaint===undefined||firstPaint<0||firstPaint>12e4){firstPaint=win.performance.timing.responseStart-navStart;var headURLs={};var headElements=doc.getElementsByTagName("head")[0].children;for(var i=0;i<headElements.length;i++){var el=headElements[i];if(el.tagName=="SCRIPT"&&el.src&&!el.async)headURLs[el.src]=true;if(el.tagName=="LINK"&&el.rel=="stylesheet"&&el.href)headURLs[el.href]=true}var requests=win.performance.getEntriesByType("resource");var doneCritical=false;for(var j=0;j<requests.length;j++){if(!doneCritical&&headURLs[requests[j].name]&&(requests[j].initiatorType=="script"||requests[j].initiatorType=="link")){var requestEnd=requests[j].responseEnd;
if(firstPaint===undefined||requestEnd>firstPaint)firstPaint=requestEnd}else{doneCritical=true}}}firstPaint=Math.max(firstPaint,0)};var CalculateVisualProgress=function(){var paints={0:0};var total=0;for(var i=0;i<rects.length;i++){var tm=firstPaint;if("tm"in rects[i]&&rects[i].tm>firstPaint)tm=rects[i].tm;if(paints[tm]===undefined)paints[tm]=0;paints[tm]+=rects[i].area;total+=rects[i].area}var pixels=Math.max(doc.documentElement.clientWidth,win.innerWidth||0)*Math.max(doc.documentElement.clientHeight,win.innerHeight||0);if(pixels>0){pixels=Math.max(pixels-total,0)*pageBackgroundWeight;if(paints[firstPaint]===undefined)paints[firstPaint]=0;paints[firstPaint]+=pixels;total+=pixels}if(total){for(var time in paints){if(paints.hasOwnProperty(time)){progress.push({tm:time,area:paints[time]})}}progress.sort(function(a,b){return a.tm-b.tm});var accumulated=0;for(var j=0;j<progress.length;j++){accumulated+=progress[j].area;progress[j].progress=accumulated/total}}};var CalculateSpeedIndex=function(){if(progress.length){SpeedIndex=0;var lastTime=0;var lastProgress=0;for(var i=0;i<progress.length;i++){var elapsed=progress[i].tm-lastTime;if(elapsed>0&&lastProgress<1)SpeedIndex+=(1-lastProgress)*elapsed;lastTime=progress[i].tm;lastProgress=progress[i].progress}}else{SpeedIndex=firstPaint}};var rects=[];var progress=[];var firstPaint;var SpeedIndex;var pageBackgroundWeight=.1;try{var navStart=win.performance.timing.navigationStart;GetRects();GetRectTimings();GetFirstPaint();CalculateVisualProgress();CalculateSpeedIndex()}catch(e){console.error(e)}return SpeedIndex};!function(w,d){BOOMR=BOOMR||{};BOOMR.plugins=BOOMR.plugins||{};var complete;var impl={complete:false,done:function(){var speedIndex=RUMSpeedIndex(w);if(speedIndex){BOOMR.addVar({speedIndex:speedIndex})}this.complete=true;BOOMR.sendBeacon()}};BOOMR.plugins.SpeedIndex={init:function(){BOOMR.subscribe("page_ready",impl.done,null,impl);return this},is_complete:function(){return impl.complete}}}(BOOMR.window,BOOMR.window.document);var config;if(BOOMR.window.boomr_beacon_url){config={beacon_url:BOOMR.window.boomr_beacon_url}}else if(BOOMR.window.BOOMR_GLOBAL_CONFIG){config=BOOMR.window.BOOMR_GLOBAL_CONFIG}if(config!==undefined){BOOMR.init(config)}BOOMR.t_end=(new Date).getTime();
