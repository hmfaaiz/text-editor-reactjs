import React, { useState } from 'react'
import '../index.css';
export default function Textarea(props) {
  const [text, setText] = useState("Write here...");
  const [results, setResults] = useState("Not Found");
  
  let  stylesbg={color: props.mode==='light'?'black':'white' ,backgroundColor: props.mode==='light'?'#FFFFFF ' :'#096C86' };
  let stylestxt={ color: props.mode==='light'?'black':'white' };
  
  function updateText(event) {
    setText(event.target.value)
   

  };


  function upperCase() {
    setText(text.toUpperCase())
    props.updateAlert("Text converted into upper case","success ")
  };

  function lowerCase() {
    setText(text.toLowerCase())
    props.updateAlert("Text converted into lower case","success ")
  };
  function clearText() {
    setText("")

  
    props.updateAlert("Text is cleared","success ");
  };

  function searchWord(event) {

    let a = event.target.value
    let words = text.split(" ");

    // let found = words.find(words => words.startsWith(a));

    // another type of function
    let found = words.find(function (word) {
      return word.startsWith(a);
    });

    if (found) {
      console.log(results)
      setResults("Word Found");
      props.updateAlert("Word is found","success")

    }
    else {
      setResults("Word Not Found");
      props.updateAlert("Word is not found","danger ")

    }
  };

  function copyText() {
    console.log(text)
    navigator.clipboard.writeText(text)
      .then(() => {
        
        props.updateAlert("Text is copied","success ")
      })
      .catch(err => {
      
        props.updateAlert("Text is cleared","danger")
      });
  }



  return (
    <>
      <div className='container'>
     
      <h3 style={stylestxt}>{props.title}</h3>
        <div className="my-3">
    

          <textarea style={{...stylesbg, height: "200px"}} className="form-control" id="floatingTextarea" onChange={updateText} value={text} ></textarea>
      

          <button  disabled={text.length===0} type="button" className="btn btn-primary my-3 mx-3" onClick={upperCase}>Upper Case</button>
          <button disabled={text.length===0}  type="button" className="btn btn-primary my-3 mx-3" onClick={lowerCase}>Lower Case</button>
          <button disabled={text.length===0}  type="button" className="btn btn-primary my-3 mx-3" onClick={clearText}>Clear</button>
          <button  disabled={text.length===0} type="button" className="btn btn-primary my-3 mx-3" onClick={copyText}>Copy Text</button>

        </div>

        <input disabled={text.length===0} style={{ ...stylesbg,...stylestxt}} id="search-input" className="form-control" type="search" placeholder="Search word here" onChange={searchWord} />

      </div>

      <div className='container my-4'>
        <h1 style={stylestxt}>Summary of Text</h1>
        <h5 className='my-2' style={stylestxt}>Total Number of Characters : <span>{text.length}</span></h5>
        <h5 className='my-2' style={stylestxt}>Total Number of Words : <span>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length}</span></h5>
        <h5 className='my-2' style={stylestxt}>Total Time To read words : <span>{0.008 * (text.split((/\s+/)).filter((element)=>{return element.length!==0}).length)} Min.</span></h5>
        <h5 className='my-2' style={stylestxt}>Search : {results}</h5>
      </div>
      <div className='container my-4'>
      <h2  className='my-3' style={stylestxt}> Preview</h2>
        <p style={stylestxt}>{text}</p>
      </div>

    </>
  )
}
