import React from 'react'

export default function About(props) {
  let stylestxt={ color: props.mode==='light'?'black':'white' };
  return (
    <>
    <div className='container ' style={stylestxt}>
      <h1>
      HAFIZ MUHAMMAD FAAIZ AZEEM
      </h1>
      <p>I am an undergraduate <strong>Software Engineering</strong> student at UIT-NED</p>
      
    </div>
    </>
  )
}
