function Astar(props) {
    let cost = []
    let startcell = props.start[0]*50 +  props.start[1];
    let endcell = props.endpos[0]*50 + props.endpos[1];
    let parent = new Array(1000);
    for (let i=0; i<1000; i++) {
        if (i!== startcell) {
            cost.push(1000000);
        }
        else {
            cost.push(0);
        }
    }
  
    function dist(i){
        let tempr = Math.floor(i/50);
        let tempc = i%50;
        return Math.sqrt((Math.pow(tempr-props.endpos[0],2) + Math.pow(tempc-props.endpos[1],2)))
    }
    const astar_animator = (b)=> {
        let mem = new Set()
        let ans = []
        let curr =  startcell
       let count1 = 0
        while (curr!== endcell) {
            count1++
            console.log(cost)
            mem.add(curr)
            let r = Math.floor(curr/50)
            let c = curr%50
            if (r+1 < 20 && b[r+1][c].status !== "wall" && mem.has((r+1)*50 + c)=== false) {
                
                let lcell = (r+1)*50 + c
                let add = 1
                if (b[r+1][c].status === "weight") {
                    add = 4
                }
                if (cost[curr] + add < cost[lcell] ) {
                    parent[lcell] = curr
                   cost[lcell] =   cost[curr] + add;
                  
                }
                // if (lcell === endcell) {
                //     break;
                // }
                
            } 
            if (c+1 < 50 && b[r][c+1].status !== "wall" && mem.has((r)*50 + c+1)=== false){
                let lcell = (r)*50 + c+1
               let add = 1
                if (b[r][c+1].status === "weight") {
                    add = 4
                }
                if (cost[curr] + add < cost[lcell] ) {
                    parent[lcell] = curr
                   cost[lcell] =   cost[curr] + add;
                  
                }
                // if (lcell === endcell) {
                //     break;
                // }
            }
            
            if (r-1 >= 0 && b[r-1][c].status !== "wall" && mem.has((r-1)*50 + c)=== false){
                let lcell = (r-1)*50 + c
               let add = 1
                if (b[r-1][c].status === "weight") {
                    add = 4
                }
                if (cost[curr] + add < cost[lcell] ) {
                    parent[lcell] = curr
                   cost[lcell] =   cost[curr] + add;
                  
                }
                // if (lcell === endcell) {
                //     break;
                // }
            }
            if (c-1 >= 0 && b[r][c-1].status !== "wall" && mem.has((r)*50 + c-1)=== false){
                let lcell = (r)*50 + c-1
                let add = 1
                if (b[r][c-1].status === "weight") {
                    add = 4
                }
                if (cost[curr] + add < cost[lcell] ) {
                    parent[lcell] = curr
                   cost[lcell] =   cost[curr] + add;
                  
                }
                // if (lcell === endcell) {
                //     break;
                // }
            }
            ans.push(curr)
            cost[curr] = 100000.00
            let find =0
            let prev = 100000.00
            for ( let x=0; x<1000; x++ ) {
                if ( (cost[x] + dist(x) <= prev  )&& mem.has(x)===false){
                    prev = cost[x] + dist(x)
                    find = x
                }
            }
            curr = find
            
        }
        console.log(dist[431])
        console.log(dist[480])
        ans.shift()
        curr = parent[endcell]
        let count = 0
        while (curr!== startcell) {
            count++;
            ans.push(curr)
           curr = parent[curr]
            
        }
        return {steps:ans, pl:ans.length - count};
    }
    const handleclick = ()=> {
        const a = [];
        for (var i = 0; i<20; i++){
           a.push([]);
            for (var j=0; j<50; j++){
              var obj  = {x: i, y:j , status: props.canvas[i][j].status}
              a[i].push(obj)
               
           }
           
        }
        let obj1 = astar_animator(a)
        let ans = obj1.steps
        let len = obj1.pl

        
        let t = 80
        for (let i=0; i<ans.length ; i++){
            if (i<len) {
                t+=30
            }
            else {
                t+=190
            }
            setTimeout(() => {
                props.setcanvas((prev) => {
                    
                   const curr = [...prev]
                    let r1 = Math.floor(ans[i]/50)
                    let c1 = Math.floor(ans[i]%50)
                    if (i<len){
                        console.log(prev[r1][c1].status)
                        if (prev[r1][c1].status === "weight" ) {
                            curr[r1][c1].status = "weightvisit"
                            
                        }
                        else if (prev[r1][c1].status === "space") {
                            curr[r1][c1].status = "visited"
                        }
                  
                    }
                    
                    else {
                        if (prev[r1][c1].status === "weightvisit") {
                            curr[r1][c1].status = "weightpath"
                        }
                        else if (prev[r1][c1].status === "visited") {
                            curr[r1][c1].status = "path"
                        }
                    }
                   return curr
                })
               }, t);
        }
       
    }
    return (<button className="mbtn" onClick={handleclick}>
        <label className="btnlabel">Visualise A*</label>
    </button>);
}
export default Astar;