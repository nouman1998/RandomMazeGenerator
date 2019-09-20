var canvas=document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');
let cols, rows;
let scaling = 40;
let grid = [];
let current;
let prev;
let stack = [];
var timer1;
var timer;
var array;
var rect;
var count=0;
var timer3;


function grpMembers(){
  ctx.font="30px Arial";
  ctx.fillText("Group Members",20,50);
  ctx.font="20px Arial";
 if(count==90){
  ctx.fillText("1- Nouman Ejaz",30,120)}
  if(count==180){
    ctx.fillText("2- Ifrah Sohail",30,190)}
    if(count==270){
      ctx.fillText("3- BMK",30,260)}

      ctx.font="30px Arial";
      if(count==400){
  ctx.fillText("Submitted to Humera Tariq",20,350);}
      if(count==450){
        clearInterval(timer3);
      }
      count++;
}

function setup() {
  
console.log("SETUP");
  cols = Math.floor(canvas.width/scaling);
  rows = Math.floor(canvas.height/scaling);
  grid=[];
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      let cell = new Cell(x, y);
      grid.push(cell);
    }
  }
  
  current = grid[0];
  prev=current;
}



function draw1()
{
  for (var i = 0; i < grid.length; i++) {
      grid[i].show();
      
      
  }
  console.log(current);  
  if(current.row==rows-1&&current.col==cols-1  )
  {
      clearInterval(timer1);
      alert("Founded a Path");

     
  }
   
  current.getwall=true;
  current.highlight();
 console.log(current);
  var bcd= current.getwalls();
  bcd.getwall=true;   
  // console.log(bcd);
  current=bcd;

}




function draw() {
     console.log("draw");
  ctx.fillStyle="black";
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  
  let next = current.checkNeighbors();
  if(next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

window.addEventListener('keypress',function(e){
  console.log("manual game");
  for (var i = 0; i < grid.length; i++) {
      grid[i].
      show();
  }
     
      current.getwall=true;
  var bcd=current.abc(e.keyCode)   
   prev=bcd;
   current=bcd;
   current.highlight();
   if(current.col==rows-1&&current.row==cols-1  )
 { 
     alert("Founded a Path");
    
      current.highlight();

        
 }
})



function Cell (r, c){
  // constructor {
    this.col = c;
    this.row = r;
    this.getwall=false;
    this.walls=[true,true,true,true];     
    this.visited = false;
  // }
  
  this.show=function() {
    let x = this.row*scaling;
    let y= this.col*scaling;
//     stroke(255);
// ctx.strokeStyle="black";
    if( this.walls[0] ) {
     //  line(x, y, x+scaling, y);
     ctx.beginPath();
     ctx.moveTo(x,y);
     ctx.lineTo(x+scaling,y);
    }
    if( this.walls[1]) {
     ctx.moveTo(x+scaling,y);
     ctx.lineTo(x+scaling,y+scaling)
    }
    if( this.walls[2] ) {
     ctx.moveTo(x+scaling,y+scaling);
     ctx.lineTo(x,y+scaling);
    }
    if( this.walls[3] ) {
     ctx.moveTo(x,y+scaling);
     ctx.lineTo(x,y);
    }
    
    if( this.visited ) {
     ctx.strokeStyle="black";
     ctx.fillStyle="pink";
    ctx.fillRect(x,y,scaling,scaling);
     
    }
  

    if(this.row==cols-1&&this.col==rows-1)
     {ctx.fillStyle="red";
        ctx.fillRect(canvas.height-scaling,canvas.height-scaling,scaling,scaling);
        ctx.stroke();
        
     }    
     ctx.stroke();
  }

  this.getwalls=function (){
    var arry=[];
    var nxt;
    var nextIndex;
    
    for (let index = 0; index < this.walls.length; index++) {
        if(this.walls[index]==false)
        {
            arry.push(index);
        }
    
       
        
    }
    console.log(arry);
   
    
    nxt=Math.floor(Math.random()*arry.length);
    while((this.row==0&&arry[nxt]==3)||(this.col==0&&arry[nxt]==0)||(this.row==rows-1&&arry[nxt]==1)||(this.col==cols-1&&arry[nxt]==2)){
         console.log("while  "+arry[nxt]);

        nxt=Math.floor(Math.random()*arry.length);

    }
    console.log(arry[nxt])
    // console.log(arry[nxt]);
    // console.log(i+" "+j)
    if(arry[nxt]==0 )//&&  !(grid[index(this.row,this.col-1)]).walls[2]
    {

    
        nextIndex=  grid[index(this.row,this.col-1)];
    } 
    if(arry[nxt]==1)// &&!(grid[index(this.row,this.col+1)]).walls[3]
    {

    
         nextIndex=   grid[index(this.row+1,this.col)];
    }
    if(arry[nxt]==2 )//&& !(  grid[index(this.row+1,this.col)]).walls[0]
    {

    
         nextIndex=   grid[index(this.row,this.col+1)];
    }
    if(arry[nxt]==3)// &&  !(grid[index(this.row,this.col-1)]).walls[1]
    {

    
         nextIndex=   grid[index(this.row-1,this.col)];
    }
    
 {  return nextIndex;}
    
    
    }
   
  this.checkNeighbors=function() {
    let neighbors = [];
    
    let top = grid[index(this.row-1, this.col)];
    let right = grid[index(this.row, this.col+1)];
    let bottom = grid[index(this.row+1, this.col)];
    let left = grid[index(this.row, this.col-1)];
    
    if(top && !top.visited) {
      neighbors.push(top);
    }    
    if(right && !right.visited) {
      neighbors.push(right);
    }
    if(bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if(left && !left.visited) {
      neighbors.push(left);
    }
    
    if( neighbors.length > 0 ) {
      let r = Math.floor(Math.random()*neighbors.length );
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  
  this.highlight=function() {
    let x = this.row*scaling;
    let y = this.col*scaling;
    ctx.strokeStyle="none";
  ctx.fillStyle="black";
    ctx.fillRect(x, y, scaling, scaling);
  }

  
  
  
  
  

 this.abc= function(e){
  // alert(e);
  console.log("value of e"+e);
var array=[];
var nxt;
var nextIndex;
console.log("walls"+this.walls);
console.log("this"+current)
for (let index = 0; index < this.walls.length; index++) {
  if(this.walls[index]==false)
  {
      array.push(index);
  }}
  console.log(array);
  if((this.row==0&&e==97)||(this.col==0&&e==119)||(this.row==rows-1&&e==100)||(this.col==cols-1&&e==115)){
      // alert("You cannot go there");
      return prev;
  }
      
if(e==97&& array.includes(3)   )//left &&!(grid[index(this.row,this.col-1)]).walls[1]
{
  console.log("left")
  nextIndex=   grid[index(this.row-1  ,this.col)];
}
else if(e==119 && array.includes(0) )//top&&  !(grid[index(this.row-1,this.col)]).walls[2]
{
  console.log("top")
  nextIndex=   grid[index(this.row,this.col-1)];
}
else if(e==100 && array.includes(1) ){//right &&!(grid[index(this.row,this.col+1)]).walls[3]
  console.log("right")
  nextIndex=   grid[index(this.row+1,this.col)];
}
else if(e== 115&& array.includes(2)  )//bottom&& !(  grid[index(this.row+1,this.col)]).walls[0]
{
  console.log("bottom")
  nextIndex=   grid[index(this.row,this.col+1)];
}
console.log(nextIndex);
if(nextIndex!=undefined){
return nextIndex;}
else{
  // alert("Cannot go to that position");
  console.log(prev);
  return prev;
}

}














  
}//End of Cell

function index(j, i) {
  if(i < 0 || j < 0 || i > rows-1 || j >cols -1) {
    return -1;
  }
  return j + i * cols;
}

function removeWalls(a, b) {
  let x = a.row - b.row;
  if(x == 1) {
    a.walls[3]=false;
    b.walls[1]=false;
  } else if (x == -1) {
    a.walls[1]=false;
        b.walls[3]=false;
  }
  let y = a.col - b.col;
  if(y == 1) {
    a.walls[0]=false;
    b.walls[2]=false;
  } else if (y == -1) {
    a.walls[2]=false;
    b.walls[0]=false;
  }
}




var autoButton= document.getElementById("mybtn");
function auto(e){
    
autoButton.disabled=true;
  ctx.fillStyle="red";
  ctx.fillRect(360,360,scaling,scaling);
  ctx.stroke()
      clearInterval(timer);
    //  current=grid[0];
      draw();
  
 
;
   

  timer1=setInterval( draw1,100);
}
function myFunction1(){
  // clearInterval(timer);
  clearInterval(timer1);
}

// window.onkeypress=function()
// {
//     clearInterval(timer);
// }


var mybutton= document.getElementById("mybtn")
var mybutton1= document.getElementById("mybtn1")
var mybutton2= document.getElementById("mybtn2")

function easy(){
  clearInterval(timer3)
  canvas.style.border="2px solid";
  scaling=40;
canvas.height=400;
canvas.width=400;
setup();
draw();
timer= setInterval(draw,1) ;
mybutton.disabled=false;
mybutton1.disabled=false
mybutton2.disabled=false
}


function medium(){
  clearInterval(timer3)
  canvas.height=600;
  canvas.width=600;
  scaling=30;
  setup();

  draw();
  timer= setInterval(draw,1) ;
  mybutton.disabled=false;
mybutton1.disabled=false
mybutton2.disabled=false
  }

  function hard(){
    clearInterval(timer3)
    canvas.height=800;
    canvas.width=800;
    scaling=20;
    setup();
    draw();
    timer= setInterval(draw,0.1) ;
    mybutton.disabled=false;
mybutton1.disabled=false
mybutton2.disabled=false

  }
  function reload(){
    location.reload();
  }
var size;
var square;
var submit;

  function custom(){
    clearInterval(timer3)
   size= document.getElementById('size');
   square= document.getElementById('rows');
   submit=document.getElementById('submit');

   size.type="text";
   square.type="text";
   submit.style.display="inline-block";

  }
  function enter(){
    mybutton.disabled=false;
mybutton1.disabled=false
mybutton2.disabled=false
    console.log(size.value)
    console.log(square.value)
      
    canvas.height= parseInt(square.value);
    canvas.width= parseInt(square.value);
    scaling= parseInt(size.value);
    setup();

  draw();
  timer= setInterval(draw,1) ;

   
  }


  timer3=setInterval(grpMembers,10);