import React, { useEffect, useState } from 'react'
import '../index.css';
import axios from "axios"
export default function Textarea(props) {
  const [text, setText] = useState("Write here...");
  const [results, setResults] = useState("Not Found");
  const [option, setOption] = useState([])
  const [output, setOutput] = useState([])
  const [source, setSource] = useState("en")
  const [target, setTarget] = useState("tr")

  let stylesbg = { color: props.mode === 'light' ? 'black' : 'white', backgroundColor: props.mode === 'light' ? '#FFFFFF ' : '#096C86' };
  let stylestxt = { color: props.mode === 'light' ? 'black' : 'white' };


  const Translates = () => {
    console.log("Click", target, source)

    const params = new URLSearchParams();
    params.append('q', text);
    params.append('source', source);
    params.append('target', target);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');


    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data)
      setOutput(res.data.translatedText)
    })
  }


  useEffect(() => {
    axios
      .get('https://libretranslate.de/languages', {
        headers: { accept: 'application/json' },
      })
      .then((res) => {
        console.log(res.data);
        setOption(res.data);
      });
  }, []);





  function updateText(event) {
    setText(event.target.value)


  };


  function upperCase() {
    setText(text.toUpperCase())
    props.updateAlert("Text converted into upper case", "success ")
  };

  function lowerCase() {
    setText(text.toLowerCase())
    props.updateAlert("Text converted into lower case", "success ")
  };
  function clearText() {
    setText("")


    props.updateAlert("Text is cleared", "success ");
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
      props.updateAlert("Word is found", "success")

    }
    else {
      setResults("Word Not Found");
      props.updateAlert("Word is not found", "danger ")

    }
  };

  function copyText() {
    console.log(text)
    navigator.clipboard.writeText(text)
      .then(() => {

        props.updateAlert("Text is copied", "success ")
      })
      .catch(err => {

        props.updateAlert("Text is cleared", "danger")
      });
  }



  return (
    <>
      <div className='container'>


        <h3 style={stylestxt}>{props.title}</h3>
        <div className="my-3">
          <div style={{ display: "flex", gap: '3%', alignItems: 'center' }}>

            <textarea style={{ ...stylesbg, height: "200px", width: '55%', border: '1px solid #000' }} className="form-control" id="floatingTextarea" onChange={updateText} value={text} ></textarea>
            <textarea style={{ ...stylesbg, height: "200px", width: '55%', border: '1px solid #000' }} className="form-control" value={output}></textarea>
          </div>

          <div className='my-4' style={{ display: "flex", gap: '3%', alignItems: 'center' }}>

            <select onClick={e => setSource(e.target.value)} className="form-select" aria-label="Disabled select example" style={{ width: '50%', border: '1px solid #000' }}>
              {option && Array.isArray(option) ?
                (
                  option.map(op => <option key={op.code} value={op.code} >{op.name}</option>))
                : (
                  console.log('option is not an array or is null/undefined')
                )
              }


            </select>
            <h3 style={{ margin: '10px 0', color: 'red' }}>To</h3>

            <select onClick={e => setTarget(e.target.value)} className="form-select" aria-label="Disabled select example" style={{ width: '50%', border: '1px solid #000' }}>
              {option && Array.isArray(option) ?
                (
                  option.map(op => <option key={op.code} value={op.code}>{op.name}</option>))
                : (
                  console.log('option is not an array or is null/undefined')
                )
              }


            </select>
          </div>


          <button disabled={text.length === 0} type="button" className="btn btn-primary my-3 mx-3" onClick={upperCase}>Upper Case</button>
          <button disabled={text.length === 0} type="button" className="btn btn-primary my-3 mx-3" onClick={lowerCase}>Lower Case</button>
          <button disabled={text.length === 0} type="button" className="btn btn-primary my-3 mx-3" onClick={clearText}>Clear</button>
          <button disabled={text.length === 0} type="button" className="btn btn-primary my-3 mx-3" onClick={copyText}>Copy Text</button>
          <button disabled={text.length === 0} type="button" className="btn btn-danger my-3 mx-3" onClick={Translates}>Translate</button>


        </div>



      </div>

      <div className='container my-4'>
        <h1 style={stylestxt}>Summary of Text</h1>
        <h5 className='my-2' style={stylestxt}>Total Number of Characters : <span>{text.length}</span></h5>
        <h5 className='my-2' style={stylestxt}>Total Number of Words : <span>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length}</span></h5>
        <h5 className='my-2' style={stylestxt}>Total Time To read words : <span>{0.008 * (text.split((/\s+/)).filter((element) => { return element.length !== 0 }).length)} Min.</span></h5>
        <h5 className='my-2' style={stylestxt}>Search : {results}</h5>
        <input disabled={text.length === 0} style={{ ...stylesbg, ...stylestxt, width: '50%', border: '1px solid #000' }} id="search-input" className="form-control" type="search" placeholder="Search word here" onChange={searchWord} />
      </div>
      <div className='container my-4'>
        <h2 className='my-3' style={stylestxt}> Preview</h2>
        <p className='my-5' style={stylestxt}>{text}</p>
      </div>

    </>
  )
}
