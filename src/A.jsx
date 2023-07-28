const A = () => {
    const handleKeyDown = event => {
      console.log('User pressed: ', event.key);
    };
  
    return (
      <div>
        <div tabIndex={0} onKeyDown={handleKeyDown}>
          <h2>hello world</h2>
        </div>
      </div>
    );
  };
  
  export default A;
  