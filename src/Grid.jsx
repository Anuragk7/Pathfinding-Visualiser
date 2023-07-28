import { useState,useEffect } from "react";
import { RecursizeMaze } from "./Maze-algorithms/RecursiveMaze.jsx";
import { Tutorial} from "./Tutorial";
import AlgoManager from "./AlgoManager";
import Algoselect from "./Algoselect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import Switch from '@mui/material/Switch';


function Grid (){
const [algo, setalgo] = useState("");
const [press, setpress] = useState(false);
const  [weight, setweight] = useState(false);
 const [canvas, setcanvas] = useState([[]]);
 const [starter, setstarter] = useState(false);
 const [ends, setends] = useState(false);
 const [endpos, setendpos] = useState([8,40]);
 const [start, setstart] = useState([8,10]);
 const[page,setpage] = useState(1);
 const l1 = "wall"
 const handleenter = (row, col) => {
  
if (press &&  !starter && !ends && canvas[row][col].status!== "starter"&& canvas[row][col].status!== "end" && !weight){
      setcanvas((c) => {
         const a = [...c];
        
         a[row][col].status = "wall"
         return a
      })
   }
   if (press && !starter && !ends && canvas[row][col].status!== "starter"&& canvas[row][col].status!== "end" && weight){
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
         setendpos([row,col]);
         return a
      })

   }

    
 }

 function handlepress(status) {
      setpress(true);
      if (status === "starter") {
         setstarter(true);
      }
      if (status === "end") {
         setends(true);
      }

   }
 const handleup = () => {
   setstarter(false)
   setends(false)
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
           if (x[i][j].status === "visited" || x[i][j].status === "path" ){
              x[i][j].status = "space";
           }
           else if ( x[i][j].status === "weightvisit" || x[i][j].status === "weightpath") {
            x[i][j].status = "weight";
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
 setendpos([8,40]);
 

 }
 function clear () {
   setcanvas((prev)=> {
      const a = [...prev]
      for (var i=0; i<20; i++){
         for (var j=0; j<50; j++){
            if (a[i][j].status !== "starter" && a[i][j].status !== "end"){
               a[i][j].status = "space"
            }
         }
      }
     return a;
   })

 }
 useEffect(create,[]);
//  useEffect(()=> {setstart([8,10])},[]);
//grid

    const m = canvas.map((objlist,index1)=> {
        return (objlist.map((obj,index) => {
            const cls = `cell  ${obj.status}`;
            let row = obj.x
            let col = obj.y
         
            return (
            <div   tabIndex={-1}  key = {`${index1} ${index}`} className = {cls}
                 onMouseEnter ={()=> {handleenter(row,col)} }
                 onMouseDown = { (e) => {
                  e.preventDefault(e)
                  handlepress(obj.status)
                  }
                  }
                 onMouseUp = {()=> {handleup()}}

                 
             
              >
              { (obj.status === "starter" )&& <FontAwesomeIcon icon={faAngleRight} size = "lg"/>}
              { (obj.status === "end" )&& <FontAwesomeIcon icon={faLocationDot} color = "red" size= "lg"/>}
              { (obj.status === "weight" || obj.status === "weightvisit" || obj.status === "weightpath"  ) && <FontAwesomeIcon icon={faCar}  />}
            </div>);
        }));
    
    });

    const setw = ()=> {
      setweight(!weight);
    }

//return fragment

    return( <>
      
      <div className="tab">
       <h2>Pathfinding Visualiser</h2>
      
      <div className="controls">
         <Algoselect setalgo = {setalgo} algo = {algo}/>
         <button onClick ={resetpath} className="tabbtn"> <label className="btnlabel">Reset Path</label> </button>
         <button onClick ={clear} className="tabbtn"> <label className="btnlabel">Clear Board</label> </button>
        
         <RecursizeMaze canvas = {canvas} setcanvas = {setcanvas} weight = {weight}/>
         <AlgoManager start = {start} canvas = {canvas} setcanvas ={setcanvas} algo = {algo} endpos = {endpos}/>
         <Switch
            checked={weight}
            onChange={setw}
            inputProps={{ 'aria-label': 'controlled'}}

         />
         
         <label style={{color:'white'}}>Weight</label>
  

      </div>
      </div>
      <div className="canvas"  > {m}</div>
     <Tutorial page = {page} setpage = {setpage}/>

      </>
     )


}
export default Grid;