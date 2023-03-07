import { useState } from "react"

export function Inouttester() {
    const [color, setcolor] = useState("black");
    return (
    <div 
    className="test"
    style={{backgroundColor:color}}
    onMouseEnter={ ()=> {setcolor("red")}}
    onMouseLeave={ ()=> {setcolor("blue")}}>

    </div>);
}