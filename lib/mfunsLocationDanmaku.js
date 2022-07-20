(()=>{"use strict";var t;const e=(t=100,function(e){void 0===e&&(e=8);for(var i=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],n=[],o=Number(e),s=i.length,a=0;a<o;a++)n.push(i[Math.floor(Math.random()*s)]);return t++,n.join("")+"".concat(t)});var i=function(){function t(){}return t.prototype.parse=function(t){try{var i=JSON.parse(t.content);console.log(i);var n=t.id||null,o=e(8),s=i.start||t.time||0,a=this.getDuration(i);return{danmaku:i,id:n,rid:o,start:s,duration:a,end:s+a}}catch(e){console.log("弹幕格式错误-id:".concat(t.id))}},t.prototype.getDuration=function(t){var e,i=t.duration||0;return null===(e=t.animations)||void 0===e||e.forEach((function(t){i+=t.duration||0})),i},t}(),n=function(){function t(){this.list=[]}return t.prototype.add=function(t){var e=Math.floor(t.start/1e3);this.listAdd(e,t)},t.prototype.remove=function(t){var e,i,n=Math.floor(t.start/1e3),o=null===(e=this.list[n])||void 0===e?void 0:e.indexOf(t);o&&-1!=o&&(null===(i=this.list[n])||void 0===i||i.splice(o,1))},t.prototype.getSegList=function(t){return this.listGet(t)},t.prototype.clear=function(){this.list=[]},t.prototype.listAdd=function(t,e){this.list[t]||(this.list[t]=[]),this.list[t].push(e)},t.prototype.listGet=function(t){return this.list[t]||[]},t}(),o=function(){function t(){this.list=[]}return t.prototype.add=function(t){for(var e=Math.floor(t.start/6e4),i=Math.floor(t.end/6e4),n=e;n<=i;n++)this.listAdd(n,t)},t.prototype.remove=function(t){for(var e,i,n=Math.floor(t.start/6e4),o=Math.floor(t.end/6e4),s=n;s<=o;s++){var a=null===(e=this.list[s])||void 0===e?void 0:e.indexOf(t);a&&-1!=a&&(null===(i=this.list[s])||void 0===i||i.splice(a,1))}},t.prototype.getSegList=function(t){return this.listGet(t)},t.prototype.clear=function(){this.list=[]},t.prototype.listAdd=function(t,e){var i;this.list[t]||(this.list[t]=[]),null===(i=this.list[t])||void 0===i||i.push(e)},t.prototype.listGet=function(t){return this.list[t]||[]},t}(),s=function(){function t(){this.shortSegLine=new n,this.longSegLine=new o}return t.prototype.getNextList=function(t){return this.shortSegLine.getSegList(t+1)},t.prototype.getSeekList=function(t){var e=Math.floor(t/1e3),i=this.shortSegLine.getSegList(e),n=this.shortSegLine.getSegList(e+1),o=this.getBeforeDanmaku(t),s=this.getLongDanmaku(t),a=[];return a.concat(s,o,i,n)},t.prototype.getBeforeDanmaku=function(t){for(var e=Math.floor(t/1e3),i=[],n=e<60?0:e-60;n<e;n++){var o=this.shortSegLine.list[n];null==o||o.forEach((function(e){e.end>t&&i.push(e)}))}return i},t.prototype.getLongDanmaku=function(t){var e=Math.floor(t/1e3),i=Math.floor(t/6e4),n=[],o=this.longSegLine.list[i];return null==o||o.forEach((function(i){i.start<1e3*(e-60)&&i.end>t&&n.push(i)})),n},t.prototype.clear=function(){this.shortSegLine.clear(),this.longSegLine.clear()},t.prototype.add=function(t){this.shortSegLine.add(t),t.duration>6e4&&this.longSegLine.add(t)},t.prototype.remove=function(t){this.shortSegLine.remove(t),t.duration>6e4&&this.longSegLine.remove(t)},t}(),a=function(){function t(t){var e=t.timeline,i=t.getTime,n=t.onCurrentDanmaku;this.isPlaying=!1,this.timeline=e,this.getTime=i,this.seconds=0,this.milliseconds=0,this.onCurrentDanmaku=n||function(){}}return t.prototype.seek=function(){var t=this.getTime();return this.seconds=Math.floor(t/1e3),this.milliseconds=t%1e3,this.timeline.getSeekList(t)},t.prototype.play=function(){var t=this;this.isPlaying||(this.isPlaying=!0,this.timeoutTimer=window.setTimeout((function(){t.seconds++,t.intervalTimer=window.setInterval((function(){t.emitCurrentDanmaku(t.timeline.getNextList(t.seconds)),t.seconds++}),1e3),t.milliseconds=0,window.clearTimeout(t.timeoutTimer)}),1e3-this.milliseconds))},t.prototype.pause=function(){this.isPlaying&&(this.isPlaying=!1,window.clearTimeout(this.timeoutTimer),window.clearInterval(this.intervalTimer),this.milliseconds=this.getTime()-1e3*this.seconds)},t.prototype.emitCurrentDanmaku=function(t){this.onCurrentDanmaku(t)},t}(),r=function(){function t(t){this.stageSize=t||[1920,1080]}return t.prototype.createDom=function(t){var e,i,n=t.danmaku,o=document.createElement("div");o.classList.add("location-danmaku-item","location-danmaku-item-".concat(t.rid)),o.setAttribute("data-id",String(t.id)),o.setAttribute("r-id",t.rid),o.style.position="absolute",o.style.display="inline-block",o.style.transformOrigin="left top";var s=document.createElement("div");return s.classList.add("location-danmaku-item-content"),s.innerHTML=n.content,s.style.whiteSpace="pre",s.style.transform=n.anchor?"translate(".concat(100*-n.anchor[0],"%, ").concat(100*-n.anchor[1],"%)"):"",s.style.fontSize=this.setRelativeSize(n.size,n.relative)+"px",s.style.color=this.getColorString(n.color),s.style.fontWeight=n.bold?"700":"400",s.style.fontFamily=n.font||"SimHei",s.style.textShadow=(null===(e=n.effects)||void 0===e?void 0:e.shadow)?"".concat(this.setRelativeSize(n.effects.shadow[1],n.relative),"px ").concat(this.setRelativeSize(n.effects.shadow[2],n.relative),"px ").concat(this.setRelativeSize(n.effects.shadow[3],n.relative),"px ").concat(this.getColorString(n.effects.shadow[0])," "):"",s.style.webkitTextStroke=(null===(i=n.effects)||void 0===i?void 0:i.stroke)?"".concat(this.setRelativeSize(n.effects.stroke[1],n.relative),"px ").concat(this.getColorString(n.effects.stroke[0])):"",o.appendChild(s),o},t.prototype.setRelativeSize=function(t,e){return t?t/(e||800)*this.stageSize[0]:0},t.prototype.getColorString=function(t){return"number"==typeof t?"#".concat(t.toString(16).padStart(6,"0")):t},t}(),c=function(){function t(t){this.stageSize=t||[1920,1080]}return t.prototype.addAnimation=function(t,e){var i=this.getStyleSheet(t);e.appendChild(i)},t.prototype.getStyleSheet=function(t){var e,i=this,n=t.danmaku,o=document.createElement("style"),s="danmaku-A-"+t.rid,a=n.location||[0,0,0],r=n.rotation||[0,0,0],c=n.scale||[1,1];return o.innerText+=".location-danmaku-item-".concat(t.rid," { transform: ").concat(this.getCssTransform(a,r,c)," }"),null===(e=n.animations)||void 0===e||e.forEach((function(t,e){t.location&&(a=t.location),t.rotation&&(r=t.rotation),t.scale&&(c=t.scale),o.innerText+="@keyframes ".concat(s,"-").concat(e+1," { to { transform: ").concat(i.getCssTransform(a,r,c)," } }")})),o.innerText+="@keyframes ".concat(s,"-E { }"),o.innerText+=".location-danmaku-item-".concat(t.rid," { animation: ").concat(this.getCssAnimation(t),"; animation-delay: ").concat(this.getCssAnimationDelay(t.danmaku),"; animation-fill-mode: forwards; }"),o},t.prototype.getCssTransform=function(t,e,i){var n="translate3d(".concat(t[0]*this.stageSize[0],"px, ").concat(t[1]*this.stageSize[1],"px, 0)"),o="rotateX(".concat(e[0],"deg)"),s="rotateY(".concat(e[1],"deg)"),a="rotateZ(".concat(e[2],"deg)"),r="scale(".concat(i[0],", ").concat(i[1],")");return"".concat(n," ").concat(o," ").concat(s," ").concat(a," ").concat(r)},t.prototype.getCssAnimation=function(t){var e,i=[];return null===(e=t.danmaku.animations)||void 0===e||e.forEach((function(e,n){i.push("danmaku-A-".concat(t.rid,"-").concat(n+1," ").concat(e.duration||0,"ms ").concat(["linear","ease-in","ease-out","ease-in-out"][e.ease||0]))})),i.push("danmaku-A-".concat(t.rid,"-E ").concat(t.danmaku.duration||0,"ms linear")),i.join(", ")},t.prototype.getCssAnimationDelay=function(t,e){var i;void 0===e&&(e=0);var n=0,o=[];return null===(i=t.animations)||void 0===i||i.forEach((function(t){o.push(n+e+"ms"),n+=t.duration||0})),o.push(n+e+"ms"),o.join(", ")},t}(),l=function(){function t(t){this.domRenderer=new r(t),this.animationRenderer=new c(t)}return t.prototype.render=function(t){var e=this.domRenderer.createDom(t);return this.animationRenderer.addAnimation(t,e),e},t}(),h=function(){function t(t){var e=t.container,i=t.size,n=t.perspective,o=t.getTime;this.container=e,this.container.style.position="relative",this.size=i||[1920,1080],this.perspective=n||this.size[0],this.scale=1,this.getTime=o,this.el=document.createElement("div"),this.el.classList.add("location-danmaku-stage"),this.el.style.width=this.size[0]+"px",this.el.style.height=this.size[1]+"px",this.el.style.position="absolute",this.el.style.transformOrigin="left top",this.el.style.transformStyle="preserve-3d",this.el.style.perspective=this.perspective+"px",this.container.appendChild(this.el),this.resize(),this.stylesheet=document.createElement("style"),this.stylesheet.innerText+=".location-danmaku-stage.paused .location-danmaku-item { animation-play-state: paused }",this.stylesheet.innerText+=".location-danmaku-item.location-danmaku-invisible { visibility: hidden }",this.stylesheet.innerText+=".location-danmaku-item-content { -webkit-text-size-adjust: none; text-size-adjust: none}",this.container.appendChild(this.stylesheet),this.renderer=new l(this.size),this.pause()}return t.prototype.addFromList=function(t){var e=this;t.forEach((function(t){e.add(t)}))},t.prototype.add=function(t){var e=this;if(t.end>this.getTime()){var i=this.renderer.render(t);return i.classList.add("location-danmaku-invisible"),i.addEventListener("animationstart",(function(){i.classList.remove("location-danmaku-invisible")}),{once:!0}),i.addEventListener("animationend",(function(t){"E"==t.animationName.substring(t.animationName.length-1)&&e.el.removeChild(i)})),i.style.animationDelay=this.renderer.animationRenderer.getCssAnimationDelay(t.danmaku,t.start-this.getTime()),this.mount(i),i}console.log("弹幕已结束: id-".concat(t.id," ").concat(t.end," < ").concat(this.getTime()))},t.prototype.mount=function(t){this.el.appendChild(t)},t.prototype.remove_id=function(t){var e=this.el.querySelector("[data-id=".concat(t,"]"));e&&this.el.removeChild(e)},t.prototype.remove_rid=function(t){var e=this.el.querySelector(".location-danmaku-item-".concat(t));e&&this.el.removeChild(e)},t.prototype.clear=function(){this.el.innerHTML=""},t.prototype.play=function(){this.el.classList.remove("paused")},t.prototype.pause=function(){this.el.classList.add("paused")},t.prototype.resize=function(){var t=this.container.getBoundingClientRect(),e=t.width,i=t.height;e/this.size[0]<i/this.size[1]?(this.scale=e/this.size[0],this.el.style.transform="scale(".concat(e/this.size[0],", ").concat(e/this.size[0],")"),this.el.style.left="0px",this.el.style.top=(i-this.size[1]*this.scale)/2+"px"):(this.scale=i/this.size[1],this.el.style.transform="scale(".concat(i/this.size[1],", ").concat(i/this.size[1],")"),this.el.style.left=(e-this.size[0]*this.scale)/2+"px",this.el.style.top="0px")},t}(),u=function(){function t(t){var e=t.stageSize,n=t.container,o=this;this.playTime=0,this.startStamp=0,this.isPaused=!0,this.danmakuParser=new i,this.timeline=new s,this.timelineDriver=new a({timeline:this.timeline,getTime:function(){return o.getTime()},onCurrentDanmaku:function(t){o.stage.addFromList(t||[])}}),this.container=n,this.stage=new h({container:this.container,size:e,getTime:function(){return o.getTime()}})}return t.prototype.getTime=function(){return this.isPaused?this.playTime:Date.now()-this.startStamp},t.prototype.loadDanmaku=function(t){var e=this;t.forEach((function(t){e.addDanmaku(t)}))},t.prototype.addDanmaku=function(t){var e=this.danmakuParser.parse(t);e&&this.timeline.add(e)},t.prototype.playDanmaku=function(t){var e=this.danmakuParser.parse(t);e&&this.stage.add(e)},t.prototype.play=function(){this.isPaused&&(this.isPaused=!1,this.startStamp=Date.now()-this.playTime,this.stage.play(),this.timelineDriver.play())},t.prototype.pause=function(){this.isPaused||(this.isPaused=!0,this.playTime=Date.now()-this.startStamp,this.startStamp=0,this.stage.pause(),this.timelineDriver.pause())},t.prototype.seek=function(t){this.playTime=t,this.isPaused||(this.startStamp=Date.now()-this.playTime),this.refresh()},t.prototype.refresh=function(){var t=this.timelineDriver.seek();this.stage.clear(),this.stage.addFromList(t)},t.prototype.clearDanmaku=function(){this.timeline.clear(),this.stage.clear()},t.prototype.reset=function(){this.pause(),this.timeline.clear(),this.seek(0)},t}(),d=function(){function t(t){var e=this;this.controller=new u({stageSize:t.stageSize||[1920,1080],container:t.container}),this.getDanmaku=t.getDanmaku||function(){return[]},t.getDanmaku&&this.controller.loadDanmaku(this.getDanmaku()),window.addEventListener("resize",(function(){e.controller.stage.resize()}))}return t.prototype.play=function(){this.controller.play()},t.prototype.pause=function(){this.controller.pause()},t.prototype.seek=function(t){this.controller.seek(t)},t.prototype.time=function(){return this.controller.getTime()},t.prototype.resize=function(){this.controller.stage.resize()},t.prototype.reload=function(){this.controller.clearDanmaku(),this.controller.loadDanmaku(this.getDanmaku()),this.controller.refresh()},t.prototype.reset=function(){this.controller.reset(),this.controller.loadDanmaku(this.getDanmaku()),this.controller.refresh()},t.prototype.addDanmaku=function(t){this.controller.addDanmaku(t)},t.prototype.playDanmaku=function(t){this.controller.playDanmaku(t)},t}();"undefined"!=typeof globalThis?globalThis.mfunsLocationDanmaku=d:window.mfunsLocationDanmaku=d})();
//# sourceMappingURL=mfunsLocationDanmaku.js.map