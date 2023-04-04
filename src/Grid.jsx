import { useState } from "react";
import { RecursizeMaze } from "./RecursiveMaze";
import { useEffect } from "react";
import CallBFS1 from "./CallBFS1";
import { Tutorial} from "./Tutorial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";


function Grid (){
const [press, setpress] = useState(false);
const  [weight, setweight] = useState(false);
 const [canvas, setcanvas] = useState([[]]);
 const [starter, setstarter] = useState(false);
 const [ends, setends] = useState(false);
 const [start, setstart] = useState([8,10]);
 const[page,setpage] = useState(1);

 const handleenter = (row, col) => {
  
if (press &&  !starter && !ends && canvas[row][col].status!== "starter"&& canvas[row][col].status!== "end" && !weight){
      setcanvas((c) => {
         const a = [...c];
        
         a[row][col].status = "wall"
         return a
      })
   }
   if ( !starter && !ends && canvas[row][col].status!== "starter"&& canvas[row][col].status!== "end" && weight){
      setcanvas((c) => {
         const a = [...c];
         a[row][col].status = "weight"
         return a
      })
   }
   else if (press && starter && !ends){
      setcanvas((c) => {
         const a = [...c];
         for (var i = 0; i<20; i++){
            
             for (var j=0; j<50; j++){
              
              if (a[i][j].status === "starter" ) {
               a[i][j].status ="space"
              }
             
                
            }
         }
         
         a[row][col].status = "starter"
        
         return a
      })
      setstart ((c) => {
         const x =[...c]
         x[0] = row
         x[1] = col
         console.log("start")
         console.log(x)
         return x
      })

   }
   else if (press && ends){
      setcanvas((c) => {
         const a = [...c];
         for (var i = 0; i<20; i++){
            
            for (var j=0; j<50; j++){
             
             if (a[i][j].status === "end" ) {
              a[i][j].status ="space"
             }
            
               
           }
        }
         a[row][col].status = "end"
         setends([row,col]);
         return a
      })

   }

    
 }

 const handlepress = (status) => {
   setpress(true)
   if (status === "starter"){
      setstarter(true)
   }
   if (status === "end"){
      setends(true)
   }
    
 }
 const handleup = () => {
   setstarter(false)
   setends(false)
   setweight(false)
   setpress((p)=> {
      const a = p
      if (!a){
         return false;
      }
      else 
      return false;
   })
    
 }



 const resetpath = () => {
   setcanvas((a)=>{
      const x = [...a]
      for (var i = 0; i<20; i++){
          for (var j=0; j<50; j++){
           if (x[i][j].status === "visited" || x[i][j].status === "path"){
              x[i][j].status = "space";
           }
           
             
         }
      }
    
      return x
   })
 }

 
 
const create =  () => {
    let a = [];
 for (var i = 0; i<20; i++){
    a.push([]);
     for (var j=0; j<50; j++){
      if (i ===  8 && j === 10){
         var obj = {x: i, y: j,  status: "starter"};

        a[i].push(obj);
      }
      else if (i === 8 && j===40) {
         obj = {x: i, y: j,  status: "end"};
        a[i].push(obj);
      }
      else {
          obj = {x: i, y: j, status: "space"};
        a[i].push(obj);
      }
    }
 }
 setcanvas(a);
 setstart([8,10]);
 

 }
 useEffect(create,[]);
//  useEffect(()=> {setstart([8,10])},[]);

    const m = canvas.map((objlist,index1)=> {
        return (objlist.map((obj,index) => {
            const cls = `cell ${obj.x} ${obj.y} ${obj.status}`;
            let row = obj.x
            let col = obj.y
         
            return (
            <div tabIndex = "0" key = {`${index1} ${index}`} className = {cls}
                 onMouseEnter ={()=> {handleenter(row,col)}}
                 onMouseDown = {(e) => {
                  e.preventDefault(e)
                  handlepress(obj.status)
                  
               }
               }
                 onMouseUp = {()=> {handleup()}}
              >
              {obj.status === "starter" && <FontAwesomeIcon icon={faAngleRight} size = "lg"/>}
              {obj.status === "end" && <FontAwesomeIcon icon={faLocationDot} color = "red" size= "lg"/>}
              {obj.status === "weight" && <FontAwesomeIcon icon={faCar}  />}
            </div>);
        }));
    
    });
    return( <>
      <div className="tab">
       <h2>Pathfinding Visualiser</h2>
      
      <div className="controls">
         <button onClick ={resetpath} className="tabbtn"> <label className="btnlabel">Reset Path</label> </button>
         <button onClick ={create} className="tabbtn"> <label className="btnlabel">Clear Board</label> </button>
         <CallBFS1 canvas = {canvas} setcanvas = {setcanvas} start ={start}/>
         <RecursizeMaze setcanvas = {setcanvas}/>
      </div>
      </div>
      <div className="canvas" > {m}</div>
     <Tutorial page = {page} setpage = {setpage}/>

      </>
     
      
     )
    


}
export default Grid;