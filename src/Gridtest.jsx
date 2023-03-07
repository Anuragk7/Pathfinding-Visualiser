import { useState } from "react";

import { useEffect } from "react";

function Gridtest (){
const [press, setpress] = useState(false);
 const [canvas, setcanvas] = useState([[]]);
 const [starter, setstarter] = useState(false);


    
 const handleenter = (row, col) => {
    
 
}
 const handlepress = (e) => {
   e.preventDefault()
   console.log("press")
   setpress(true);
    
 }
 const handleup = () => {
   
   setstarter(false)

   setpress(false)
    
 }

const handleleave1 = (row, col ) => {
  
   
    console.log("leave")
    const a = []
    for (var i = 0; i<50; i++){
     a.push([]);
      for (var j=0; j<20; j++){
        if (i=== row && j === col){
           var obj = {x: i, y: j,  status: "space"};
           a[i].push(obj);
        }
        else {
            obj = canvas[i][j];
           a[i].push(obj);
        }
    
     }
  }
  
    

   setcanvas(a);   
}
 
 
const create =  () => {
    let a = [];
 for (var i = 0; i<50; i++){
    a.push([]);
     for (var j=0; j<20; j++){
      if (i === 10 && j === 10){
         var obj = {x: i, y: j,  status: "starter"};
        a[i].push(obj);
      }
      else {
          obj = {x: i, y: j, status: "space"};
        a[i].push(obj);
      }
        
    }
 }
 setcanvas(a);

 }
 useEffect(create, []);
 
    
    const m = canvas.map((objlist,index)=> {
        return (<div key = {index} className = "row"> {
            objlist.map((obj,index) => {
            const cls = `cell ${obj.x} ${obj.y} ${obj.status}`;
            let row = obj.x
            let col = obj.y
            
            return (
            <div key = {index} className = {cls}
                 onMouseEnter ={()=> {handleenter(row,col)}}
                 onMouseOut = {()=> { handleleave1(row,col) }}>
            </div>);
        }) }

        </div>);
    
    });
    return <div>
      <div className="tab">
         <button onClick ={create}> <label className="btnlabel">Reset Walls</label> </button>
      </div>
      <div className="canvas"> {m}</div>;

    </div> 

}
export default Gridtest;