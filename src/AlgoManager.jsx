import Astar from "./Algorithms/Astar";
import CallBFS1 from "./Algorithms/CallBFS1";
export default function AlgoManager (props) {
    if (props.algo == "") {
        return <button className="mbtn"> <label >Visualise</label> </button>
    }
    if (props.algo == "bfs")
   return  ( <CallBFS1 canvas = {props.canvas}  setcanvas = {props.setcanvas} start ={props.start}/>);
   if (props.algo ==  "astar") {
        return <Astar canvas = {props.canvas}  setcanvas = {props.setcanvas} start ={props.start} endpos = {props.endpos}/>
   }
}

