import React, { useState } from 'react'
import {  Tag } from "antd";


function FilterChip({item,header,onChange,id}) {
    const [flag,setFlag]=useState(false)
  return (
    <>
    <input
      type="checkbox"
      id={id}
      className="filterCheckBox"
      onChange={(e) => {
        onChange(header, item, e);
       setFlag(!flag)
      }}
    />
<Tag color="magenta" className='cross' style={{display:'flex', flexDirection:'row', justifyContent:'center'}} htmlFor={`${!flag?id:''}`}>
<label key={id} className="filter_lists_item" htmlFor={`${!flag?id:''}`}>
      {item}
      {/* <Checkbox onChange={checkedNot} onClick={(e)=>chageData(header, item, e)}>{item}</Checkbox> */}
      {/* <Text className="filter_lists_item-count">{1}</Text> */}
      
    </label>
    { flag&& <label className="cross" htmlFor={id} style={{ fontSize:'2em'}}>
    &times;
      </label>}
</Tag>


    
      
  </>
  )
}

export default FilterChip