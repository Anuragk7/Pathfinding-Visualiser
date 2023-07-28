import shuffle from "./shuffle"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export function RecursizeMaze(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    let steps = []
    function maze () {
        handleClose();
        mazeAnimator(1,1);
        let step2 = new Array(999);
        for (let i=0; i<step2.length; i++){
            step2[i] = 0;
        }
       
        for (let i =0; i<steps.length; i++){
            step2[steps[i]] = 1;
        }
        for (let i =0; i<step2.length; i++){
            setTimeout(() => {
                props.setcanvas((c) => {
                    let temp = [...c];
                    if (step2[i] === 0){
                        let x = Math.floor(i/50);
                        let y = i%50;
                        if (temp[x][y].status !== "end" && temp[x][y].status!== "starter"){
                            if (props.weight === false){
                            temp[x][y].status = "wall";}
                        
                            else {
                                temp[x][y].status = "weight";
                            }
                        }
                        
                    }
                   
                    return temp;
                })
            }, i*10);
        }
    }
    var vis = new Array(999)
   
    for (let i=0; i<1000; i++){
        vis[i] = 0
    }
    function mazeAnimator (r, c) {
       
        let arr = ["N", "S", "W", "E"]
       shuffle(arr);
        let cell = r*50 + c
        console.log(cell)
        steps.push(cell)
        vis[cell] = 1
      
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
        <div>
          <Button
          className='tabbtn button'
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Maze
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={maze}>{props.weight === false? "Recursive Maze Algortihm": "Recursize weight maze"}</MenuItem>
          </Menu>
        </div>
      );

}


