
 function CallBFS1 (props) {
    function tracker (cell,path) {
        
        const arr = []
        var r1 = Math.floor(cell/49)
        var c1 = cell%49
        cell = path[cell]
        while (true) {
            
             r1 = Math.floor(cell/50);
             c1 = cell%50;
             
             
          
            if ((r1 === props.start[0]) && (c1 === props.start[1])){
                console.log("break condition1")
                arr.reverse();
                return arr;
            }
            if (!cell){
                console.log("break condition2")
                console.log(arr);
                arr.reverse();
                return arr;
            }
            arr.push({row:r1, col:c1})
            cell = path[cell] 
           
            
              
        }
        
       }
    function BFSanimator (pos,x) {
        const i =0
        const j =1
        var r = pos[i]
        var c = pos[j]
        const ans = []
        const queue = []
        var b = [...x]
        var path = [1000]
        //topleft
        
      
      
       
        //top
        queue.push({row: r, col: c})
       
        while (queue.length !== 0){
            
            r = queue[0].row
            c = queue[0].col
            b[r][c].status = "visited"
          
            queue.shift();
            
           
          
            if (r-1 >= 0 && (b[r-1][c].status=== "space" || b[r-1][c].status=== "end")){
                if (b[r-1][c].status=== "end"){
                   
                    const abc = tracker((r-1)*50 + c,path)
                    console.log ({a:abc.length, b:ans.concat(abc)}) 
                    return {a:abc.length, x:ans}
                }
                queue.push({row: r-1, col: c})
                ans.push({row: r-1, col: c})
                path[(r-1)*50 + c] = r*50 + c
               
                b[r-1][c].status= "visited"
                
            }
            // //right
            if (c+1 < 50 && (b[r][c+1].status=== "space" || b[r][c+1].status=== "end")){
                if (b[r][c+1].status=== "end"){
                    path[(r)*50 + c+1] = r*50 + c
                     const abc = tracker((r)*50 + c+1,path)
                     console.log ({a:abc, b:ans}) 
                     return {a:abc.length, x:ans.concat(abc)}
                }
                queue.push({row: r, col: c+1});
                ans.push({row: r, col: c+1});
                path[(r)*50 + c+1] = r*50 + c
              
                b[r][c+1].status= "visited"
        
             }
             // //bottom
             if ( r+1<20 && (b[r+1][c].status=== "space" ||  b[r+1][c].status=== "end")){
                if (b[r+1][c].status=== "end"){
                    path[(r+1)*50 + c] = r*50 + c
                    const abc = tracker((r+1)*50 + c,path)
                    console.log ({a:abc, b:ans}) 
                    return {a:abc.length, x:ans.concat(abc)}
                }
                queue.push({row: r+1, col: c});
                ans.push({row: r+1, col: c});
                path[(r+1)*50 + c] = r*50 + c
               
                b[r+1][c].status= "visited"
        
            }
        
           
             
              //left
            if ( c-1>=0 && (b[r][c-1].status=== "space" || b[r][c-1].status=== "end")){
                if (b[r][c-1].status=== "end"){
                    path[(r)*50 + c-1] = r*50 + c
                    const abc = tracker((r)*50 + c-1,path)
                    console.log ({a:abc, b:ans}) 
                    return {a:abc.length, x:ans.concat(abc)}
                }
                queue.push({row: r, col: c-1});
                ans.push({row: r, col: c-1});
                path[(r)*50 + c-1] = r*50 + c
    
                b[r][c-1].status= "visited"
        
            }
        }
        
        return {a:0, x:ans};
       
        
    
        
    }
    function BFS () {
        const a = [];
        for (var i = 0; i<20; i++){
           a.push([]);
            for (var j=0; j<50; j++){
              var obj  = {x: i, y:j , status: props.canvas[i][j].status}
              a[i].push(obj)
               
           }
        }
        const b = BFSanimator([props.start[0],props.start[1]],a)
        const len = b.a
        var t = 8;
        for (let i=0; i<b.x.length; i++ ){
           var add = 8;
          
           
           if (i>=b.x.length - len){
             add = 80;
           }
           t+= add;
           
              setTimeout(() => {
                 props.setcanvas((prev) => {
                    const curr = [...prev]
                    if (i<b.x.length - len){
                       curr[b.x[i].row][b.x[i].col].status = "visited"
                    }
     
                    else {
                       curr[b.x[i].row][b.x[i].col].status = "path"
                      
                    }
                    return curr
                 })
                }, t);
           
           
         
        }  
      
    
     }
     return  <button onClick ={BFS}> <label className="btnlabel">Start BFS!</label> </button>
    

 }

export default CallBFS1;