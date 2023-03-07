export function Tutorial(props) {
    let message ;
    if (props.page === 1){
        
           message =" The Human Brain is a Visual Learner! This Pathfinding Visualiser was developed with the goal of making it easy to understand the working of various pathfinding algorithms with the power of Visualisation."
         
    }
    else if (props.page === 2){
       message = "You can choose your desired positon for the starting point and the ending points, for that you need to click and hold on the point and then move the mouse pointer to your desired location"
         
    }
    else if (props.page === 3){
       
          message =   "To add a block or wall in the path, just press and hold the mouse click and move over the area you want to block"
        
    }
    else {
        message =   "Click the Start BFS Button to see the Breadth First Search Algorithm in action. More Algorithms are under work and will be added soon. Happy Learning!"
    }
    if (props.page < 5){
        return (
            <div className="tutorial">
            <div className="pageno">{props.page}/4</div>
             <h2 className="tuthead">Getting Started</h2> 
             <h3>
               Welcome to the Pathfinding Visualiser!
             </h3>
             <p>{message}</p>
          
          <div className="tutbtn">
               <button className="btn1" onClick={ ()=> {
                  props.setpage((pg)=> {
                     return 6;
                  })
               }}>Skip Tutorial</button>
               <button className = "btn2"onClick={ ()=> {
                  props.setpage((pg)=> {
                     return pg+1;
                  })
               }}>{props.page===4? "Finish":"Next"}</button>
                <button className = "btn3"onClick={ ()=> {
                  props.setpage((pg)=> {
                    if (pg>1){ 
                        return pg-1;
                    }
                    return 1;
                    
                  })
               }}>previous</button>
           
          </div>
             
             </div>
        );
    }
    else {
        return null
    }
   
   


}