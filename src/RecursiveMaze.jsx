import shuffle from "./shuffle"
export function RecursizeMaze(props) {
    let steps = []
    function maze () {
        mazeAnimator(1,0);
        let step2 = new Array(1000);
        for (let i=0; i<step2.length; i++){
            step2[i] = 0;
        }
       
        for (let i =0; i<steps.length; i++){
            step2[steps[i]] = 1;
        }
       
        console.log(step2)
        for (let i =0; i<step2.length; i++){
            setTimeout(() => {
                props.setcanvas((c) => {
                    let temp = [...c];
                    if (step2[i] === 0){
                        let x = Math.floor(i/50);
                        let y = i%50;
                        console.log(x,y)
                        if (temp[x][y].status !== "end" && temp[x][y].status!== "starter")
                        temp[x][y].status = "wall";
                        
                    }
                   
                    return temp;
                })
            }, i*7);
        }
    }
    var vis = new Array(1001)
    let count = 0
    for (let i=0; i<1001; i++){
        vis[i] = 0
    }
    function mazeAnimator (r, c) {
       
        let arr = ["N", "S", "W", "E"]
       shuffle(arr);
        let cell = r*50 + c
        console.log(cell)
        steps.push(cell)
        vis[cell] = 1
        let i = 0
        for (let j =0; j<4; j++) {
            if (arr[j] === "N")
            {
                if (r >= 2 && vis[(r-2)*50 + c] !== 1) {
                    steps.push((r-1)*50 + c)
                    mazeAnimator(r-2,c)
                   
                }
            }
          
            else if (arr[j] === "S")
            {
                if (r < 18 && vis[(r+2)*50 + c] !== 1) {
                    steps.push((r+1)*50 + c)
                    mazeAnimator(r+2,c )
                   
                }
            }
           
            else if (arr[j] === "W")
            {
                if (c >= 2 && vis[(r)*50 + c-2] !== 1) {
                    steps.push((r)*50 + c-1)
                    mazeAnimator(r,c-2 )
                  
                }
            }
           
            else if (arr[j] === "E")
            {
                if (c <= 47 && vis[(r)*50 + c+2] !== 1) {
                    steps.push((r)*50 + c+1)
                    mazeAnimator(r,c+2 )
                   
                }
            }

        }
           
        
    }
    return (
        <button onClick={maze}> Maze! </button>
    )

}


