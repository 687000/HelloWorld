/*! svg.resize.js v1.4.3 MIT*/;!function(){"use strict";(function(){function t(t){t.remember("_resizeHandler",this),this.el=t,this.parameters={},this.lastUpdateCall=null,this.p=t.doc().node.createSVGPoint()}t.prototype.transformPoint=function(t,e,i){return this.p.x=t-(this.offset.x-window.pageXOffset),this.p.y=e-(this.offset.y-window.pageYOffset),this.p.matrixTransform(i||this.m)},t.prototype._extractPosition=function(t){return{x:null!=t.clientX?t.clientX:t.touches[0].clientX,y:null!=t.clientY?t.clientY:t.touches[0].clientY}},t.prototype.init=function(t){var e=this;if(this.stop(),"stop"!==t){this.options={};for(var i in this.el.resize.defaults)this.options[i]=this.el.resize.defaults[i],void 0!==t[i]&&(this.options[i]=t[i]);this.el.on("lt.resize",function(t){e.resize(t||window.event)}),this.el.on("rt.resize",function(t){e.resize(t||window.event)}),this.el.on("rb.resize",function(t){e.resize(t||window.event)}),this.el.on("lb.resize",function(t){e.resize(t||window.event)}),this.el.on("t.resize",function(t){e.resize(t||window.event)}),this.el.on("r.resize",function(t){e.resize(t||window.event)}),this.el.on("b.resize",function(t){e.resize(t||window.event)}),this.el.on("l.resize",function(t){e.resize(t||window.event)}),this.el.on("rot.resize",function(t){e.resize(t||window.event)}),this.el.on("point.resize",function(t){e.resize(t||window.event)}),this.update()}},t.prototype.stop=function(){return this.el.off("lt.resize"),this.el.off("rt.resize"),this.el.off("rb.resize"),this.el.off("lb.resize"),this.el.off("t.resize"),this.el.off("r.resize"),this.el.off("b.resize"),this.el.off("l.resize"),this.el.off("rot.resize"),this.el.off("point.resize"),this},t.prototype.resize=function(t){var e=this;this.m=this.el.node.getScreenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset};var i=this._extractPosition(t.detail.event);if(this.parameters={type:this.el.type,p:this.transformPoint(i.x,i.y),x:t.detail.x,y:t.detail.y,box:this.el.bbox(),rotation:this.el.transform().rotation},"text"===this.el.type&&(this.parameters.fontSize=this.el.attr()["font-size"]),void 0!==t.detail.i){var s=this.el.array().valueOf();this.parameters.i=t.detail.i,this.parameters.pointCoords=[s[t.detail.i][0],s[t.detail.i][1]]}switch(t.type){case"lt":this.calc=function(t,e){var i=this.snapToGrid(t,e);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y+i[1]).size(this.parameters.box.width-i[0],this.parameters.box.height-i[1])}};break;case"rt":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i,!0),this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).size(this.parameters.box.width+i[0],this.parameters.box.height-i[1])}};break;case"rb":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x-i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize+i[0]);i=this.checkAspectRatio(i),this.el.move(this.parameters.box.x,this.parameters.box.y).size(this.parameters.box.width+i[0],this.parameters.box.height+i[1])}};break;case"lb":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0&&this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return this.el.move(this.parameters.box.x+i[0],this.parameters.box.y),void this.el.attr("font-size",this.parameters.fontSize-i[0]);i=this.checkAspectRatio(i,!0),this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).size(this.parameters.box.width-i[0],this.parameters.box.height+i[1])}};break;case"t":this.calc=function(t,e){var i=this.snapToGrid(t,e,2);if(this.parameters.box.height-i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y+i[1]).height(this.parameters.box.height-i[1])}};break;case"r":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.width+i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).width(this.parameters.box.width+i[0])}};break;case"b":this.calc=function(t,e){var i=this.snapToGrid(t,e,0);if(this.parameters.box.height+i[1]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x,this.parameters.box.y).height(this.parameters.box.height+i[1])}};break;case"l":this.calc=function(t,e){var i=this.snapToGrid(t,e,1);if(this.parameters.box.width-i[0]>0){if("text"===this.parameters.type)return;this.el.move(this.parameters.box.x+i[0],this.parameters.box.y).width(this.parameters.box.width-i[0])}};break;case"rot":this.calc=function(t,e){var i={x:t+this.parameters.p.x,y:e+this.parameters.p.y},s=Math.atan2(this.parameters.p.y-this.parameters.box.y-this.parameters.box.height/2,this.parameters.p.x-this.parameters.box.x-this.parameters.box.width/2),r=Math.atan2(i.y-this.parameters.box.y-this.parameters.box.height/2,i.x-this.parameters.box.x-this.parameters.box.width/2),a=this.parameters.rotation+180*(r-s)/Math.PI+this.options.snapToAngle/2;this.el.center(this.parameters.box.cx,this.parameters.box.cy).rotate(a-a%this.options.snapToAngle,this.parameters.box.cx,this.parameters.box.cy)};break;case"point":this.calc=function(t,e){var i=this.snapToGrid(t,e,this.parameters.pointCoords[0],this.parameters.pointCoords[1]),s=this.el.array().valueOf();s[this.parameters.i][0]=this.parameters.pointCoords[0]+i[0],s[this.parameters.i][1]=this.parameters.pointCoords[1]+i[1],this.el.plot(s)}}this.el.fire("resizestart",{dx:this.parameters.x,dy:this.parameters.y,event:t}),SVG.on(window,"touchmove.resize",function(t){e.update(t||window.event)}),SVG.on(window,"touchend.resize",function(){e.done()}),SVG.on(window,"mousemove.resize",function(t){e.update(t||window.event)}),SVG.on(window,"mouseup.resize",function(){e.done()})},t.prototype.update=function(t){if(!t)return void(this.lastUpdateCall&&this.calc(this.lastUpdateCall[0],this.lastUpdateCall[1]));var e=this._extractPosition(t),i=this.transformPoint(e.x,e.y),s=i.x-this.parameters.p.x,r=i.y-this.parameters.p.y;this.lastUpdateCall=[s,r],this.calc(s,r),this.el.fire("resizing",{dx:s,dy:r,event:t})},t.prototype.done=function(){this.lastUpdateCall=null,SVG.off(window,"mousemove.resize"),SVG.off(window,"mouseup.resize"),SVG.off(window,"touchmove.resize"),SVG.off(window,"touchend.resize"),this.el.fire("resizedone")},t.prototype.snapToGrid=function(t,e,i,s){var r;return void 0!==s?r=[(i+t)%this.options.snapToGrid,(s+e)%this.options.snapToGrid]:(i=null==i?3:i,r=[(this.parameters.box.x+t+(1&i?0:this.parameters.box.width))%this.options.snapToGrid,(this.parameters.box.y+e+(2&i?0:this.parameters.box.height))%this.options.snapToGrid]),t<0&&(r[0]-=this.options.snapToGrid),e<0&&(r[1]-=this.options.snapToGrid),t-=Math.abs(r[0])<this.options.snapToGrid/2?r[0]:r[0]-(t<0?-this.options.snapToGrid:this.options.snapToGrid),e-=Math.abs(r[1])<this.options.snapToGrid/2?r[1]:r[1]-(e<0?-this.options.snapToGrid:this.options.snapToGrid),this.constraintToBox(t,e,i,s)},t.prototype.constraintToBox=function(t,e,i,s){var r,a,o=this.options.constraint||{};return void 0!==s?(r=i,a=s):(r=this.parameters.box.x+(1&i?0:this.parameters.box.width),a=this.parameters.box.y+(2&i?0:this.parameters.box.height)),void 0!==o.minX&&r+t<o.minX&&(t=o.minX-r),void 0!==o.maxX&&r+t>o.maxX&&(t=o.maxX-r),void 0!==o.minY&&a+e<o.minY&&(e=o.minY-a),void 0!==o.maxY&&a+e>o.maxY&&(e=o.maxY-a),[t,e]},t.prototype.checkAspectRatio=function(t,e){if(!this.options.saveAspectRatio)return t;var i=t.slice(),s=this.parameters.box.width/this.parameters.box.height,r=this.parameters.box.width+t[0],a=this.parameters.box.height-t[1],o=r/a;return o<s?(i[1]=r/s-this.parameters.box.height,e&&(i[1]=-i[1])):o>s&&(i[0]=this.parameters.box.width-a*s,e&&(i[0]=-i[0])),i},SVG.extend(SVG.Element,{resize:function(e){return(this.remember("_resizeHandler")||new t(this)).init(e||{}),this}}),SVG.Element.prototype.resize.defaults={snapToAngle:.1,snapToGrid:1,constraint:{},saveAspectRatio:!1}}).call(this)}();

/*! svg.select.js v3.0.1 MIT*/;!function(){"use strict";function i(t){(this.el=t).remember("_selectHandler",this),this.pointSelection={isSelected:!1},this.rectSelection={isSelected:!1},this.pointsList={lt:[0,0],rt:["width",0],rb:["width","height"],lb:[0,"height"],t:["width",0],r:["width","height"],b:["width","height"],l:[0,"height"]},this.pointCoord=function(t,e,i){var o="string"!=typeof t?t:e[t];return i?o/2:o},this.pointCoords=function(t,e){var i=this.pointsList[t];return{x:this.pointCoord(i[0],e,"t"===t||"b"===t),y:this.pointCoord(i[1],e,"r"===t||"l"===t)}}}i.prototype.init=function(t,e){var i=this.el.bbox();this.options={};var o=this.el.selectize.defaults.points;for(var s in this.el.selectize.defaults)this.options[s]=this.el.selectize.defaults[s],void 0!==e[s]&&(this.options[s]=e[s]);var n=["points","pointsExclude"];for(var s in n){var r=this.options[n[s]];"string"==typeof r?r=0<r.length?r.split(/\s*,\s*/i):[]:"boolean"==typeof r&&"points"===n[s]&&(r=r?o:[]),this.options[n[s]]=r}this.options.points=[o,this.options.points].reduce(function(t,e){return t.filter(function(t){return-1<e.indexOf(t)})}),this.options.points=[this.options.points,this.options.pointsExclude].reduce(function(t,e){return t.filter(function(t){return e.indexOf(t)<0})}),this.parent=this.el.parent(),this.nested=this.nested||this.parent.group(),this.nested.matrix(new SVG.Matrix(this.el).translate(i.x,i.y)),this.options.deepSelect&&-1!==["line","polyline","polygon"].indexOf(this.el.type)?this.selectPoints(t):this.selectRect(t),this.observe(),this.cleanup()},i.prototype.selectPoints=function(t){return this.pointSelection.isSelected=t,this.pointSelection.set||(this.pointSelection.set=this.parent.set(),this.drawPoints()),this},i.prototype.getPointArray=function(){var e=this.el.bbox();return this.el.array().valueOf().map(function(t){return[t[0]-e.x,t[1]-e.y]})},i.prototype.drawPoints=function(){for(var s=this,t=this.getPointArray(),e=0,i=t.length;e<i;++e){var o=function(o){return function(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation();var e=t.pageX||t.touches[0].pageX,i=t.pageY||t.touches[0].pageY;s.el.fire("point",{x:e,y:i,i:o,event:t})}}(e),n=this.drawPoint(t[e][0],t[e][1]).addClass(this.options.classPoints).addClass(this.options.classPoints+"_point").on("touchstart",o).on("mousedown",o);this.pointSelection.set.add(n)}},i.prototype.drawPoint=function(t,e){var i=this.options.pointType;switch(i){case"circle":return this.drawCircle(t,e);case"rect":return this.drawRect(t,e);default:if("function"==typeof i)return i.call(this,t,e);throw new Error("Unknown "+i+" point type!")}},i.prototype.drawCircle=function(t,e){return this.nested.circle(this.options.pointSize).stroke(this.options.pointStroke).fill(this.options.pointFill).center(t,e)},i.prototype.drawRect=function(t,e){return this.nested.rect(this.options.pointSize,this.options.pointSize).stroke(this.options.pointStroke).fill(this.options.pointFill).center(t,e)},i.prototype.updatePointSelection=function(){var e=this.getPointArray();this.pointSelection.set.each(function(t){this.cx()===e[t][0]&&this.cy()===e[t][1]||this.center(e[t][0],e[t][1])})},i.prototype.updateRectSelection=function(){var o=this,s=this.el.bbox();if(this.rectSelection.set.get(0).attr({width:s.width,height:s.height}),this.options.points.length&&this.options.points.map(function(t,e){var i=o.pointCoords(t,s);o.rectSelection.set.get(e+1).center(i.x,i.y)}),this.options.rotationPoint){var t=this.rectSelection.set.length();this.rectSelection.set.get(t-1).center(s.width/2,20)}},i.prototype.selectRect=function(t){var s=this,n=this.el.bbox();function r(o){return function(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation();var e=t.pageX||t.touches[0].pageX,i=t.pageY||t.touches[0].pageY;s.el.fire(o,{x:e,y:i,event:t})}}if(this.rectSelection.isSelected=t,this.rectSelection.set=this.rectSelection.set||this.parent.set(),this.rectSelection.set.get(0)||this.rectSelection.set.add(this.nested.rect(n.width,n.height).addClass(this.options.classRect)),this.options.points.length&&this.rectSelection.set.length()<2){this.options.points.map(function(t,e){var i=s.pointCoords(t,n),o=s.drawPoint(i.x,i.y).attr("class",s.options.classPoints+"_"+t).on("mousedown",r(t)).on("touchstart",r(t));s.rectSelection.set.add(o)}),this.rectSelection.set.each(function(){this.addClass(s.options.classPoints)})}if(this.options.rotationPoint&&(this.options.points&&!this.rectSelection.set.get(9)||!this.options.points&&!this.rectSelection.set.get(1))){var e=function(t){(t=t||window.event).preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation();var e=t.pageX||t.touches[0].pageX,i=t.pageY||t.touches[0].pageY;s.el.fire("rot",{x:e,y:i,event:t})},i=this.drawPoint(n.width/2,20).attr("class",this.options.classPoints+"_rot").on("touchstart",e).on("mousedown",e);this.rectSelection.set.add(i)}},i.prototype.handler=function(){var t=this.el.bbox();this.nested.matrix(new SVG.Matrix(this.el).translate(t.x,t.y)),this.rectSelection.isSelected&&this.updateRectSelection(),this.pointSelection.isSelected&&this.updatePointSelection()},i.prototype.observe=function(){var t=this;if(MutationObserver)if(this.rectSelection.isSelected||this.pointSelection.isSelected)this.observerInst=this.observerInst||new MutationObserver(function(){t.handler()}),this.observerInst.observe(this.el.node,{attributes:!0});else try{this.observerInst.disconnect(),delete this.observerInst}catch(t){}else this.el.off("DOMAttrModified.select"),(this.rectSelection.isSelected||this.pointSelection.isSelected)&&this.el.on("DOMAttrModified.select",function(){t.handler()})},i.prototype.cleanup=function(){!this.rectSelection.isSelected&&this.rectSelection.set&&(this.rectSelection.set.each(function(){this.remove()}),this.rectSelection.set.clear(),delete this.rectSelection.set),!this.pointSelection.isSelected&&this.pointSelection.set&&(this.pointSelection.set.each(function(){this.remove()}),this.pointSelection.set.clear(),delete this.pointSelection.set),this.pointSelection.isSelected||this.rectSelection.isSelected||(this.nested.remove(),delete this.nested)},SVG.extend(SVG.Element,{selectize:function(t,e){return"object"==typeof t&&(e=t,t=!0),(this.remember("_selectHandler")||new i(this)).init(void 0===t||t,e||{}),this}}),SVG.Element.prototype.selectize.defaults={points:["lt","rt","rb","lb","t","r","b","l"],pointsExclude:[],classRect:"svg_select_boundingRect",classPoints:"svg_select_points",pointSize:7,rotationPoint:!0,deepSelect:!1,pointType:"circle",pointFill:"#000",pointStroke:{width:1,color:"#000"}}}();
/*! svg.draw.js - v2.0.3 - 2017-06-19
* https://github.com/svgdotjs/svg.draw.js
* Copyright (c) 2017 Ulrich-Matthias Schäfer; Licensed MIT */
/* Include min code here since there is no CDN for svg.draw.js */
(function(){function a(a,b,c){this.el=a,a.remember("_paintHandler",this);var d=this,e=this.getPlugin();this.parent=a.parent(SVG.Nested)||a.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=null,this.startPoint=null,this.lastUpdateCall=null,this.options={};for(var f in this.el.draw.defaults)this.options[f]=this.el.draw.defaults[f],"undefined"!=typeof c[f]&&(this.options[f]=c[f]);e.point&&(e.pointPlugin=e.point,delete e.point);for(var f in e)this[f]=e[f];b||this.parent.on("click.draw",function(a){d.start(a)})}a.prototype.transformPoint=function(a,b){return this.p.x=a-(this.offset.x-window.pageXOffset),this.p.y=b-(this.offset.y-window.pageYOffset),this.p.matrixTransform(this.m)},a.prototype.start=function(a){var b=this;this.m=this.el.node.getScreenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset},this.options.snapToGrid*=Math.sqrt(this.m.a*this.m.a+this.m.b*this.m.b),this.startPoint=this.snapToGrid(this.transformPoint(a.clientX,a.clientY)),this.init&&this.init(a),this.el.fire("drawstart",{event:a,p:this.p,m:this.m}),SVG.on(window,"mousemove.draw",function(a){b.update(a)}),this.start=this.point},a.prototype.point=function(a){return this.point!=this.start?this.start(a):this.pointPlugin?this.pointPlugin(a):void this.stop(a)},a.prototype.stop=function(a){a&&this.update(a),this.clean&&this.clean(),SVG.off(window,"mousemove.draw"),this.parent.off("click.draw"),this.el.forget("_paintHandler"),this.el.draw=function(){},this.el.fire("drawstop")},a.prototype.update=function(a){!a&&this.lastUpdateCall&&(a=this.lastUpdateCall),this.lastUpdateCall=a,this.calc(a),this.el.fire("drawupdate",{event:a,p:this.p,m:this.m})},a.prototype.done=function(){this.calc(),this.stop(),this.el.fire("drawdone")},a.prototype.cancel=function(){this.stop(),this.el.remove(),this.el.fire("drawcancel")},a.prototype.snapToGrid=function(a){var b=null;if(a.length)return b=[a[0]%this.options.snapToGrid,a[1]%this.options.snapToGrid],a[0]-=b[0]<this.options.snapToGrid/2?b[0]:b[0]-this.options.snapToGrid,a[1]-=b[1]<this.options.snapToGrid/2?b[1]:b[1]-this.options.snapToGrid,a;for(var c in a)b=a[c]%this.options.snapToGrid,a[c]-=(b<this.options.snapToGrid/2?b:b-this.options.snapToGrid)+(0>b?this.options.snapToGrid:0);return a},a.prototype.param=function(a,b){this.options[a]=null===b?this.el.draw.defaults[a]:b,this.update()},a.prototype.getPlugin=function(){return this.el.draw.plugins[this.el.type]},SVG.extend(SVG.Element,{draw:function(b,c,d){b instanceof Event||"string"==typeof b||(c=b,b=null);var e=this.remember("_paintHandler")||new a(this,b,c||{});return b instanceof Event&&e.start(b),e[b]&&e[b](c,d),this}}),SVG.Element.prototype.draw.defaults={snapToGrid:1},SVG.Element.prototype.draw.extend=function(a,b){var c={};"string"==typeof a?c[a]=b:c=a;for(var d in c){var e=d.trim().split(/\s+/);for(var f in e)SVG.Element.prototype.draw.plugins[e[f]]=c[d]}},SVG.Element.prototype.draw.plugins={},SVG.Element.prototype.draw.extend("rect image",{init:function(a){var b=this.startPoint;this.el.attr({x:b.x,y:b.y,height:0,width:0})},calc:function(a){var b={x:this.startPoint.x,y:this.startPoint.y},c=this.transformPoint(a.clientX,a.clientY);b.width=c.x-b.x,b.height=c.y-b.y,this.snapToGrid(b),b.width<0&&(b.x=b.x+b.width,b.width=-b.width),b.height<0&&(b.y=b.y+b.height,b.height=-b.height),this.el.attr(b)}}),SVG.Element.prototype.draw.extend("line polyline polygon",{init:function(a){this.set=new SVG.Set;var b=this.startPoint,c=[[b.x,b.y],[b.x,b.y]];this.el.plot(c),this.drawCircles()},calc:function(a){var b=this.el.array().valueOf();if(b.pop(),a){var c=this.transformPoint(a.clientX,a.clientY);b.push(this.snapToGrid([c.x,c.y]))}this.el.plot(b)},point:function(a){if(this.el.type.indexOf("poly")>-1){var b=this.transformPoint(a.clientX,a.clientY),c=this.el.array().valueOf();return c.push(this.snapToGrid([b.x,b.y])),this.el.plot(c),this.drawCircles(),void this.el.fire("drawpoint",{event:a,p:{x:b.x,y:b.y},m:this.m})}this.stop(a)},clean:function(){this.set.each(function(){this.remove()}),this.set.clear(),delete this.set},drawCircles:function(){var a=this.el.array().valueOf();this.set.each(function(){this.remove()}),this.set.clear();for(var b=0;b<a.length;++b){this.p.x=a[b][0],this.p.y=a[b][1];var c=this.p.matrixTransform(this.parent.node.getScreenCTM().inverse().multiply(this.el.node.getScreenCTM()));this.set.add(this.parent.circle(5).stroke({width:1}).fill("#ccc").center(c.x,c.y))}}}),SVG.Element.prototype.draw.extend("circle",{init:function(a){var b=this.startPoint;this.el.attr({cx:b.x,cy:b.y,r:1})},calc:function(a){var b=this.transformPoint(a.clientX,a.clientY),c={cx:this.startPoint.x,cy:this.startPoint.y,r:Math.sqrt((b.x-this.startPoint.x)*(b.x-this.startPoint.x)+(b.y-this.startPoint.y)*(b.y-this.startPoint.y))};this.snapToGrid(c),this.el.attr(c)}})}).call(this);
var drawing = SVG('drawing').size(1200, 450);
var shapes = [];
let index = 0;
let shape;
/********/
var dragging=false;
var penEnabled=false;
var eraserEnabled=false;
var hlEnabled=false;
var recEnabled=false;
var pendraggy=false;
var hldraggy=false;
var recdraggy=false;
var colorpicker='black';
var widthpicker=3;
function selectColor(e){
  colorpicker=window.getComputedStyle(e.target, null).backgroundColor;
}
function selectWidth(id){
  if(id=="thin"){
    widthpicker=3;
  }
  else if(id=="thick"){
    widthpicker=8;
  }
}
black.onclick=function(){
    unselect();
    dragging=false;
    black.classList.add('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
}
red.onclick=function(){
    unselect();
    dragging=false;
    red.classList.add('active');
    black.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
}
yellow.onclick=function(){
    unselect();
    dragging=false;
    yellow.classList.add('active');
    black.classList.remove('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    green.classList.remove('active');
}
blue.onclick=function(){
    unselect();
    dragging=false;
    blue.classList.add('active');
    black.classList.remove('active');
    yellow.classList.remove('active');
    red.classList.remove('active');
    green.classList.remove('active');
}
green.onclick=function(){
    unselect();
    dragging=false;
    green.classList.add('active');
    black.classList.remove('active');
    yellow.classList.remove('active');
    blue.classList.remove('active');
    red.classList.remove('active');
}
/*
selectMode.onclick=function(){
  selectMode.classList.add('active');
  pen.classList.remove('active');
  rec.classList.remove('active');
 }
 */
pen.onclick=function(){
    unselect();
    dragging=false;
    pendraggy=true;
    hldraggy=false;
    recdraggy=false;
    penEnabled=true;
    eraserEnabled=false;
    hlEnabled=false;
    recEnabled=false;
    pen.classList.add('active');
    eraser.classList.remove('active');
    highlighter.classList.remove('active');
    rec.classList.remove('active');
    zoom_in.classList.remove('active');
    zoom_out.classList.remove('active');
  //  selectMode.classList.remove('active');
 }
eraser.onclick=function(){
    unselect();
    dragging=false;
    pendraggy=false;
    hldraggy=false;
    recdraggy=false;
    penEnabled=false;
    eraserEnabled=true;
    hlEnabled=false;
    recEnabled=false;
    pen.classList.remove('active');
    eraser.classList.add('active');
    highlighter.classList.remove('active');
    rec.classList.remove('active');
    zoom_in.classList.remove('active');
    zoom_out.classList.remove('active');
  //  selectMode.classList.remove('active');
}
highlighter.onclick=function(){
    unselect();
    dragging=false;
    pendraggy=false;
    hldraggy=true;
    recdraggy=false;
    penEnabled=false;
    eraserEnabled=false;
    hlEnabled=true;
    recEnabled=false;
    pen.classList.remove('active');
    highlighter.classList.add('active');
    eraser.classList.remove('active');
    rec.classList.remove('active');
    zoom_in.classList.remove('active');
    zoom_out.classList.remove('active');
  //  selectMode.classList.remove('active');
 }
rec.onclick=function(){
    unselect();
    dragging=false;
    pendraggy=false;
    hldraggy=false;
    recdraggy=true;
    penEnabled=false;
    eraserEnabled=false;
    hlEnabled=false;
    recEnabled=true;
    pen.classList.remove('active');
    eraser.classList.remove('active');
    highlighter.classList.remove('active');
    rec.classList.add('active');
    zoom_in.classList.remove('active');
    zoom_out.classList.remove('active');
  //  selectMode.classList.remove('active');
}
var viewwidth=drawing.width();
var viewheight=drawing.height();
var coordinateX=0;
var coordinateY=0;
zoom_in.onmousedown=function(){
  viewwidth=viewwidth*0.8;
  viewheight=viewheight*0.8;
  drawing.viewbox(coordinateX, coordinateY, viewwidth,viewheight);
    pen.classList.remove('active');
    eraser.classList.remove('active');
    highlighter.classList.remove('active');
    rec.classList.remove('active');
    zoom_in.classList.add('active');
 }
zoom_in.onmouseup=function(){
    zoom_in.classList.remove('active');
 }
document.getElementById("drawing").addEventListener("keydown", function(event){
  const key = event.key.toLowerCase();
  if(key=="arrowdown"){
    coordinateY+=(viewheight*0.05);
    drawing.viewbox(coordinateX,coordinateY, viewwidth,viewheight);
  }
  if(key=="arrowup"){
    coordinateY-=(viewheight*0.05);
    drawing.viewbox(coordinateX,coordinateY, viewwidth,viewheight);
  }
  if(key=="arrowright"){
    coordinateX+=(viewwidth*0.05);
    drawing.viewbox(coordinateX,coordinateY, viewwidth,viewheight);
  }
  if(key=="arrowleft"){
    coordinateX-=(viewwidth*0.05);
    drawing.viewbox(coordinateX,coordinateY, viewwidth,viewheight);
  }
  console.log(key);
});
zoom_out.onmousedown=function(){
  viewwidth=viewwidth*1.25;
  viewheight=viewheight*1.25;
  drawing.viewbox(coordinateX, coordinateY, viewwidth,viewheight);
    pen.classList.remove('active');
    eraser.classList.remove('active');
    highlighter.classList.remove('active');
    rec.classList.remove('active');
    zoom_out.classList.add('active');
 }
zoom_out.onmouseup=function(){
    zoom_out.classList.remove('active');
 }
clear.onclick=function(){
  shapes = [];
  index=0;
  pen.classList.remove('active');
  eraser.classList.remove('active');
  highlighter.classList.remove('active');
  rec.classList.remove('active');
  drawing.clear();
  coordinateX=0;
  coordinateY=0;
  viewwidth=1200;
  viewheight=450;
  drawing.viewbox(coordinateX, coordinateY, viewwidth,viewheight);
//  selectMode.classList.remove('active');
}
download.onmousedown=function(){
    unselect();
    dragging=false;
    pendraggy=false;
    hldraggy=false;
    recdraggy=false;
    penEnabled=false;
    eraserEnabled=false;
    hlEnabled=false;
    recEnabled=false;
    pen.classList.remove('active');
    eraser.classList.remove('active');
    highlighter.classList.remove('active');
    rec.classList.remove('active');
    zoom_in.classList.remove('active');
    zoom_out.classList.remove('active');
    download.classList.add('active');
    var svg = document.getElementById("drawing");
  var serializer = new XMLSerializer();
  var source = serializer.serializeToString(svg);
  console.log(source);
  var index= source.search(/viewBox=/);
  var k=0;
  var replaceViewBox="";
  for(k=index+9;k<source.length-index-9;k++){
    if(source[k]=="\""||source[k]=="\'"){
      break;
    }
    replaceViewBox+=source[k];
  }
  source= source.replace(replaceViewBox, "0,0,1200,450");
  if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');}
  if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');}
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href=url;
    a.download='My Annotation';
    a.click();
  //  selectMode.classList.remove('active');
 }
download.onmouseup=function(){
    download.classList.remove('active');
 }
//User can copy current SVG content
copybutton.onclick=function(){
  var textBox = document.getElementById("code");
  textBox.select();
  document.execCommand("copy");
}
//User can empty SVG content in the SVG text area
emptybutton.onclick=function(){
  document.getElementById("code").value ="";
}
applybutton.onclick=function(){
  drawing.clear();
   var textBox = document.getElementById("code").value;
  drawing.svg(textBox);
}
//User can draw a rectangle
//User can draw use a pen 
const getDrawObject = () => {
  option = {
  'stroke': colorpicker,
  'stroke-width': widthpicker,
  'stroke-opacity': 1,
  'fill':'none'
};
  if(dragging==true){
    return;
  }
  if(penEnabled==true){
    return drawing.polyline().attr(option);
  }   
  else if(hlEnabled==true){
    option = {
      'stroke': colorpicker,
      'stroke-width': widthpicker,
      'stroke-opacity':0.5,
      'fill':'none'
    };
    return drawing.polyline().attr(option);
  }
  else if(recEnabled==true){
       opacity=1;
       return drawing.rect().attr(option);
  }
}
drawing.on('mousedown', event => {
  selected=1;
  const shape = getDrawObject();
  shapes[index] = shape;
  shape.draw(event);
});
drawing.on('mousemove', event => {
  if ((penEnabled==true && shapes[index])||(hlEnabled==true && shapes[index])) {
    shapes[index].draw('point', event);
  }
});
drawing.on('mouseup', event => {
  if (penEnabled==true||hlEnabled==true) {
    shapes[index].draw('stop', event);
    var origin=shapes[index].attr("points");
    const shape =BezierCurve(origin,colorpicker,widthpicker);
    const newshape=drawing.path(shape).attr(option);
   shapes[index].replace(newshape);
   shapes[index]=newshape;
    
    if(newshape.length()<=2){
      document.getElementById("code").value ="";
      shapes[index].remove();
      index--;
    }
    else{
      if(penEnabled==true){document.getElementById("code").value="<path d=\""+shapes[index].attr('d')+"\" style=\"stroke-width:"+widthpicker+";stroke:"+colorpicker+";fill-opacity:0\"/>";}
      else if(hlEnabled==true){document.getElementById("code").value="<path d=\""+shapes[index].attr('d')+"\" style=\"stroke-width:"+widthpicker+";stroke:"+colorpicker+";stroke-opacity:0.5;fill-opacity:0\"/>";
        
      }
    }
  } else {
    shapes[index].draw(event);
    if(recEnabled==true){
      if(shapes[index].attr('width')<=1&&shapes[index].attr('height')<=1){
        document.getElementById("code").value ="";
        shapes[index].remove();
        index--;
      }
      else{
        document.getElementById("code").value="<rect x=\""+shapes[index].attr('x')+"\" y=\""+shapes[index].attr('y')+"\" width=\""+shapes[index].attr('width')+"\"height=\""+shapes[index].attr('height')+"\" style=\"stroke-width:"+widthpicker+";stroke:"+colorpicker+";fill-opacity:0\"/>";
      }
    }
    else{     
      document.getElementById("code").value ="";    
    }
  }
  index++;
});
//User can view the SVG content once draw an element 
//User can select SVG content
function unselect(){
  var i;
  for(i=0;i<index;i++){
    if (typeof shapes[i].fixed === "function") {
      shapes[i].fixed();
    } 
    shapes[i].selectize(false, {deepSelect:true}).resize('stop');
  }
}
var click = function() {
  unselect();
  if(penEnabled==true||hlEnabled==true){
    if(this.toString().includes("Path")){
      this.selectize({deepSelect:true}).resize();
      this.draggy();
      dragging=true;
      selected--;
    }
    else{
      return;
    }
  }
  else if(recEnabled==true){
    if(this.toString().includes("Rect")){
      this.selectize({deepSelect:true}).resize();
      this.draggy();
      dragging=true;
      selected--;
    }
    else{
      return;
    }
  }
  else if(eraserEnabled==true){
    this.style({stroke:"none"});
    this.selectize(false, {deepSelect:true});
  }
}
var selected=1;
drawing.on("mousedown", event => {
  if(eraserEnabled==true){
    started=true;
  }
  var i=0;
  for(i=0;i<index;i++){
    shapes[i].on('click', click);
  }
});
var mouseovererase = function(){
  this.style({stroke:"none"});
  this.selectize(false, {deepSelect:true});
}
var started=false;
var selected=1;
drawing.on("mousedown", event => {
  if(eraserEnabled==true){
    started=true;
  }
  var i=0;
  for(i=0;i<index;i++){
    shapes[i].on('click', click);
  }
});
drawing.on("mousemove", event => {
  if(eraserEnabled==true){
    if(started==true){
      var i=0;
      for(i=0;i<index;i++){
        shapes[i].on('mouseover', mouseovererase);
      }
    }
  }
});
drawing.on("mouseup", event => {
  started=false;       
  if(selected==1){
      unselect();
      dragging=false; 
  }
  
});
// This is custom extension of line, polyline, polygon which doesn't draw the circle on the line. 
SVG.Element.prototype.draw.extend('line polyline polygon', {

  init:function(e){
    // When we draw a polygon, we immediately need 2 points.
    // One start-point and one point at the mouse-position
    this.set = new SVG.Set();
    var p = this.startPoint,
        arr = [
          [p.x, p.y],
          [p.x, p.y]
        ];

    this.el.plot(arr);
  },
  // The calc-function sets the position of the last point to the mouse-position (with offset ofc)
  calc:function (e) {
    var arr = this.el.array().valueOf();
    arr.pop();

    if (e) {
      var p = this.transformPoint(e.clientX, e.clientY);
      arr.push(this.snapToGrid([p.x, p.y]));
    }

    this.el.plot(arr);
  },
  point:function(e){

    if (this.el.type.indexOf('poly') > -1) {
      // Add the new Point to the point-array
      var p = this.transformPoint(e.clientX, e.clientY),
          arr = this.el.array().valueOf();

      arr.push(this.snapToGrid([p.x, p.y]));

      this.el.plot(arr);

      // Fire the `drawpoint`-event, which holds the coords of the new Point
      this.el.fire('drawpoint', {event:e, p:{x:p.x, y:p.y}, m:this.m});

      return;
    }

    // We are done, if the element is no polyline or polygon
    this.stop(e);

  },
  clean:function(){

    // Remove all circles
    this.set.each(function () {
      this.remove();
    });
    this.set.clear();
    delete this.set;
  },
});
function BezierCurve(str,colorpicker,widthpicker){
  var words = str.split(' ');
  var size =1; 
  var arrayOfArrays = "";
for (var i=1; i<words.length; i+=size) {
  arrayOfArrays+="\["
                        +words.slice(i,i+size)+"\], ";
}
  const smoothing = 0.12
  const svg = document.getElementById('drawing')
  const points = eval('\['+arrayOfArrays + '\]');
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];
    return {
      length: Math.sqrt(Math.pow(lengthX, 2)+ Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }
  const controlPoint = (lineCalc, smooth) => (current, previous, next, reverse) =>{
    const p = previous || current;
    const n = next || current;
    const l = lineCalc(p, n);
    const angle = l.angle + (reverse ? Math.PI : 0);
    const length = l.length * smooth;
    const x= current[0]+Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  }
  const bezierCommand = (controlPointCalc) => (point, i, a) => {
    const [cpsX, cpsY] = controlPointCalc(a[i - 1], a[i - 2], point);
    const [cpeX, cpeY] = controlPointCalc(point, a[i - 1], a[i + 1], true);
    return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
  }
  var d;
  const svgPath = (points, command) => {
    d = points.reduce((acc, point, i, a) => i === 0
      ? `M ${point[0]},${point[1]}`
      : `${acc} ${command(point, i, a)}`
  , '')
    return `<path d="${d}" fill="none" stroke="${colorpicker}" stroke-width=${widthpicker}>`
  }
  const controlPointCalc = controlPoint(line, smoothing);
  const bezierCommandCalc = bezierCommand(controlPointCalc);
  svgPath(points, bezierCommandCalc);
  //svg.innerHTML+=svgPath(points, bezierCommandCalc);
  return d;
}
