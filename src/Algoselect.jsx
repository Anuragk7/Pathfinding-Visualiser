import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
export default function Algoselect(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleClose1 = () => {
    props.setalgo("bfs");
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    props.setalgo("astar");
    setAnchorEl(null);
  };

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
        Algorithm
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
        <MenuItem onClick={handleClose1}>Visulaise BFS!</MenuItem>
        <MenuItem onClick={handleClose2}>Visualise A*</MenuItem>
      </Menu>
    </div>
  );
}
