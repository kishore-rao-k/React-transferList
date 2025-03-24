

import { useState } from 'react'

function LeftContainer({leftItems,selectedItems,handleCheckboxChange}){
 
  return( <div>
    {leftItems.map((item,index)=>{
      return(<label key = {index}>
        <input type='checkbox' value={item} checked={selectedItems.includes(item)} onChange={()=>handleCheckboxChange(item)}/>{item}
      </label>)
    })}
  </div>
  )
}
function RightContainer({rightItems,selectedItems,handleCheckboxChange}){

  return( <div>
    {rightItems.map((item,index)=>{
      return(<label key = {index}>
        <input type='checkbox' value={item} checked={selectedItems.includes(item)} onChange={()=>handleCheckboxChange(item)} />{item}
      </label>)
    })}
  </div>
  )
}

function MoveLeft({handleMoveLeft}){
return <button onClick={handleMoveLeft}> {"<"} </button>
}
function MoveLeftAll({handleMoveLeftAll}){
return <button onClick={handleMoveLeftAll}> {"<<"} </button>
}
function MoveRight({handleMoveRight}){
return <button onClick={handleMoveRight}> {">"} </button>
}
function MoveRightAll({handleMoveRightAll}){
  return <button onClick={handleMoveRightAll}> {">>"} </button>
}


function App() {

  const [leftItems, setLeftItems] = useState(["HTML", "CSS", "JS", "React"]);
  const [rightItems, setRightItems] = useState(["C", "C++", "Java", "Ruby"]);
  const [selectedItems, setSelectedItems] = useState([]);

  function handleCheckboxChange(item) {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  function handleMoveRight() {
    setRightItems((prev) => [...prev, ...selectedItems.filter(item => leftItems.includes(item))]);
    setLeftItems((prev) => prev.filter((item) => !selectedItems.includes(item)));
    setSelectedItems((prev) => prev.filter(item => rightItems.includes(item)));
}

function handleMoveLeft() {
  setLeftItems((prev) => [...prev, ...selectedItems.filter(item => rightItems.includes(item))]);
  setRightItems((prev) => prev.filter((item) => !selectedItems.includes(item)));
  setSelectedItems((prev) => prev.filter(item => leftItems.includes(item)));
}


  function handleMoveLeftAll() {
    setLeftItems((prev) => [...prev, ...rightItems]); 
    setRightItems([]); 
  }

  function handleMoveRightAll() {
    setRightItems((prev) => [...prev, ...leftItems]); 
    setLeftItems([]); 
  }
  return (
    <>
    <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{display:'flex', flexDirection:"column" ,border:"1px solid black",padding:"10px",gap:'10px',width:'200px'}}>
    <LeftContainer leftItems={leftItems} handleCheckboxChange={handleCheckboxChange}  selectedItems={selectedItems}/>
      </div>
      <div style={{display:'flex', flexDirection:"column" ,border:"1px solid black",padding:"10px",gap:'10px'}}>
    <MoveLeft  handleMoveLeft={handleMoveLeft}/>
    <MoveLeftAll  handleMoveLeftAll = {handleMoveLeftAll}/>
    <MoveRight  handleMoveRight={handleMoveRight}/>
    <MoveRightAll  handleMoveRightAll={handleMoveRightAll}/>
    </div> 
      <div style={{display:'flex', flexDirection:"column" ,border:"1px solid black",padding:"10px",gap:'10px',width:'200px'}}>
        <RightContainer rightItems={rightItems} handleCheckboxChange={handleCheckboxChange}  selectedItems={selectedItems}/>
      </div>
    </div>
    </>
  )
}

export default App
