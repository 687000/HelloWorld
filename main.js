/*
- Bug: unable to select if drawing’s path out of canvas
- Bug: Unselect after dragging if the mouse’ final position if out of the range of the object. When zoom out the speed of mouse is too fast so the selection will be deleted after dragging.
*/
/*! svg.draw.js - v2.0.3 - 2017-06-19
* https://github.com/svgdotjs/svg.draw.js
* Copyright (c) 2017 Ulrich-Matthias Schäfer; Licensed MIT */
/* Include min code here since there is no CDN for svg.draw.js */
(function(){function a(a,b,c){this.el=a,a.remember("_paintHandler",this);var d=this,e=this.getPlugin();this.parent=a.parent(SVG.Nested)||a.parent(SVG.Doc),this.p=this.parent.node.createSVGPoint(),this.m=null,this.startPoint=null,this.lastUpdateCall=null,this.options={};for(var f in this.el.draw.defaults)this.options[f]=this.el.draw.defaults[f],"undefined"!=typeof c[f]&&(this.options[f]=c[f]);e.point&&(e.pointPlugin=e.point,delete e.point);for(var f in e)this[f]=e[f];b||this.parent.on("click.draw",function(a){d.start(a)})}a.prototype.transformPoint=function(a,b){return this.p.x=a-(this.offset.x-window.pageXOffset),this.p.y=b-(this.offset.y-window.pageYOffset),this.p.matrixTransform(this.m)},a.prototype.start=function(a){var b=this;this.m=this.el.node.getScreenCTM().inverse(),this.offset={x:window.pageXOffset,y:window.pageYOffset},this.options.snapToGrid*=Math.sqrt(this.m.a*this.m.a+this.m.b*this.m.b),this.startPoint=this.snapToGrid(this.transformPoint(a.clientX,a.clientY)),this.init&&this.init(a),this.el.fire("drawstart",{event:a,p:this.p,m:this.m}),SVG.on(window,"mousemove.draw",function(a){b.update(a)}),this.start=this.point},a.prototype.point=function(a){return this.point!=this.start?this.start(a):this.pointPlugin?this.pointPlugin(a):void this.stop(a)},a.prototype.stop=function(a){a&&this.update(a),this.clean&&this.clean(),SVG.off(window,"mousemove.draw"),this.parent.off("click.draw"),this.el.forget("_paintHandler"),this.el.draw=function(){},this.el.fire("drawstop")},a.prototype.update=function(a){!a&&this.lastUpdateCall&&(a=this.lastUpdateCall),this.lastUpdateCall=a,this.calc(a),this.el.fire("drawupdate",{event:a,p:this.p,m:this.m})},a.prototype.done=function(){this.calc(),this.stop(),this.el.fire("drawdone")},a.prototype.cancel=function(){this.stop(),this.el.remove(),this.el.fire("drawcancel")},a.prototype.snapToGrid=function(a){var b=null;if(a.length)return b=[a[0]%this.options.snapToGrid,a[1]%this.options.snapToGrid],a[0]-=b[0]<this.options.snapToGrid/2?b[0]:b[0]-this.options.snapToGrid,a[1]-=b[1]<this.options.snapToGrid/2?b[1]:b[1]-this.options.snapToGrid,a;for(var c in a)b=a[c]%this.options.snapToGrid,a[c]-=(b<this.options.snapToGrid/2?b:b-this.options.snapToGrid)+(0>b?this.options.snapToGrid:0);return a},a.prototype.param=function(a,b){this.options[a]=null===b?this.el.draw.defaults[a]:b,this.update()},a.prototype.getPlugin=function(){return this.el.draw.plugins[this.el.type]},SVG.extend(SVG.Element,{draw:function(b,c,d){b instanceof Event||"string"==typeof b||(c=b,b=null);var e=this.remember("_paintHandler")||new a(this,b,c||{});return b instanceof Event&&e.start(b),e[b]&&e[b](c,d),this}}),SVG.Element.prototype.draw.defaults={snapToGrid:1},SVG.Element.prototype.draw.extend=function(a,b){var c={};"string"==typeof a?c[a]=b:c=a;for(var d in c){var e=d.trim().split(/\s+/);for(var f in e)SVG.Element.prototype.draw.plugins[e[f]]=c[d]}},SVG.Element.prototype.draw.plugins={},SVG.Element.prototype.draw.extend("rect image",{init:function(a){var b=this.startPoint;this.el.attr({x:b.x,y:b.y,height:0,width:0})},calc:function(a){var b={x:this.startPoint.x,y:this.startPoint.y},c=this.transformPoint(a.clientX,a.clientY);b.width=c.x-b.x,b.height=c.y-b.y,this.snapToGrid(b),b.width<0&&(b.x=b.x+b.width,b.width=-b.width),b.height<0&&(b.y=b.y+b.height,b.height=-b.height),this.el.attr(b)}}),SVG.Element.prototype.draw.extend("line polyline polygon",{init:function(a){this.set=new SVG.Set;var b=this.startPoint,c=[[b.x,b.y],[b.x,b.y]];this.el.plot(c),this.drawCircles()},calc:function(a){var b=this.el.array().valueOf();if(b.pop(),a){var c=this.transformPoint(a.clientX,a.clientY);b.push(this.snapToGrid([c.x,c.y]))}this.el.plot(b)},point:function(a){if(this.el.type.indexOf("poly")>-1){var b=this.transformPoint(a.clientX,a.clientY),c=this.el.array().valueOf();return c.push(this.snapToGrid([b.x,b.y])),this.el.plot(c),this.drawCircles(),void this.el.fire("drawpoint",{event:a,p:{x:b.x,y:b.y},m:this.m})}this.stop(a)},clean:function(){this.set.each(function(){this.remove()}),this.set.clear(),delete this.set},drawCircles:function(){var a=this.el.array().valueOf();this.set.each(function(){this.remove()}),this.set.clear();for(var b=0;b<a.length;++b){this.p.x=a[b][0],this.p.y=a[b][1];var c=this.p.matrixTransform(this.parent.node.getScreenCTM().inverse().multiply(this.el.node.getScreenCTM()));this.set.add(this.parent.circle(5).stroke({width:1}).fill("#ccc").center(c.x,c.y))}}}),SVG.Element.prototype.draw.extend("circle",{init:function(a){var b=this.startPoint;this.el.attr({cx:b.x,cy:b.y,r:1})},calc:function(a){var b=this.transformPoint(a.clientX,a.clientY),c={cx:this.startPoint.x,cy:this.startPoint.y,r:Math.sqrt((b.x-this.startPoint.x)*(b.x-this.startPoint.x)+(b.y-this.startPoint.y)*(b.y-this.startPoint.y))};this.snapToGrid(c),this.el.attr(c)}})}).call(this);
var drawing = SVG('drawing').size(1200, 450);
const shapes = [];
const styles = [];
let index = 0;
let shape;
/********/
var dragging=false;
var penEnabled=false;
var recEnabled=false;
var pendraggy=false;
var recdraggy=false;
var colorpicker='black';
var widthpicker=3;
var option = {
  'stroke': 'black',
  'stroke-width': 3,
  'fill':'none'
};
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
pen.onclick=function(){
    unselect();
    dragging=false;
    pendraggy=true;
    recdraggy=false;
    penEnabled=true;
    eraserEnabled=false;
    recEnabled=false;
    pen.classList.add('active');
    rec.classList.remove('active');
    zoom_in.classList.remove('active');
 }
rec.onclick=function(){
    unselect();
    dragging=false;
    pendraggy=false;
    recdraggy=true;
    penEnabled=false;
    eraserEnabled=false;
    recEnabled=true;
    pen.classList.remove('active');
    rec.classList.add('active');
    zoom_in.classList.remove('active');
}
var viewwideth=drawing.width();
var viewheight=drawing.height();
zoom_in.onmousedown=function(){
  viewwideth=viewwideth*0.8;
  viewheight=viewheight*0.8;
  drawing.viewbox(0, 0, viewwideth,viewheight);
    pen.classList.remove('active');
    rec.classList.remove('active');
    zoom_in.classList.add('active');
 }
zoom_in.onmouseup=function(){
    zoom_in.classList.remove('active');
 }
zoom_out.onmousedown=function(){
  viewwideth=viewwideth*1.25;
  viewheight=viewheight*1.25;
  drawing.viewbox(0, 0, viewwideth,viewheight);
    pen.classList.remove('active');
    rec.classList.remove('active');
    zoom_out.classList.add('active');
 }
zoom_out.onmouseup=function(){
    zoom_out.classList.remove('active');
 }
clear.onclick=function(){
  //document.getElementById("drawing").innerHTML='';
  drawing.clear();
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
//User can draw a rectangle
//User can draw use a pen 
const getDrawObject = () => {
  
  option = {
  'stroke': colorpicker,
  'stroke-width': widthpicker,
  'fill':'none'
};
  if(dragging==true){
    return;
  }
  if(recEnabled==true){
       return drawing.rect().attr(option);
  }
  else if(penEnabled==true){
    return drawing.polyline().attr(option);
  }   
}
var clickoption=false;
var array = [];
drawing.on('mousedown', event => {
  var color="";
  var objectstyle=JSON.stringify(option);
  for(k=11;k!=objectstyle.length;k++){
    if(objectstyle[k]=="'"||objectstyle[k]=="\""){
      break;
    }
    color+=objectstyle[k];
  }
  const shape = getDrawObject();
  const style =color;
  shapes[index] = shape;
  styles[index] = style;
  shape.draw(event);
  //shapes[0].style('stroke:blue');});}
   
});
drawing.on('mousemove', event => {
  if (penEnabled==true && shapes[index]) {
    shapes[index].draw('point', event);
  }
});
drawing.on('mouseup', event => {
  if (penEnabled==true) {
    shapes[index].draw('stop', event);
    
  } else {
    shapes[index].draw(event);
  }
  index++;
  here=1;
  dragging=false;
  grap=[]; 
});
//User can view the SVG content once draw an element 
//User can select SVG content
var here=1;
var grap=[];
function unselect(){
  var i;
  for(i=0;i<index;i++){
    if (typeof shapes[i].fixed === "function") {
      
      shapes[i].fixed();
    } 
    shapes[i].style({stroke:styles[i+1]});
  }
}
function select(){
  var i=0;
  for(i=0;i<index;i++){
    if(here==1){
      shapes[i].click(function(){
        here--;
        grap.push(i);
      });
    }
    else{      
      unselect();
      
      if(pendraggy==true){
        if((shapes[grap[0]-1]).toString().includes("Polyline")){
          shapes[grap[0]-1].style('stroke:blue');
          shapes[grap[0]-1].draggy();
          dragging=true;
        }
        else{
          unselect(); 
        } 
      } 
      else if(recdraggy==true){
        if((shapes[grap[0]-1]).toString().includes("Rect")){
          shapes[grap[0]-1].style('stroke:blue');
          shapes[grap[0]-1].draggy();
          dragging=true;
        }
        else{
          unselect();
        } 
      }   
      grap=[];
      break;
    }
  }
}
drawing.on("click", event => {
  if(here!=1){
    unselect();
    dragging=false;
    
  }
  select();
  var target=shapes[shapes.length-1];
    if (penEnabled==true) {    document.getElementById("code").value="<polyline points=\""+target.attr('points')+"\" style=\"stroke-width:"+widthpicker+";stroke:"+colorpicker+";fill-opacity:0\"/>";
  } else if(recEnabled==true){
  document.getElementById("code").value="<rect x=\""+target.attr('x')+"\" y=\""+target.attr('y')+"\" width=\""+target.attr('width')+"\"height=\""+target.attr('height')+"\" style=\"stroke-width:"+widthpicker+";stroke:"+colorpicker+";fill-opacity:0\"/>";
  }else{
  document.getElementById("code").value ="";
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
applybutton.onclick=function(){
   var textBox = document.getElementById("code").value;
  drawing.svg(textBox);
}




