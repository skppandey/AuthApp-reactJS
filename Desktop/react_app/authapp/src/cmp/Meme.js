import React, {useState,useEffect} from 'react';
import MemeComponent from './MemeComponent'
import { Input } from '@material-ui/core';
import "../App.css";

const ObjectToQueryParam = (obj) => {
   const params = Object.entries(obj).map(([key,value]) => `${key}=${value}`)
   return '?' + params.join('&')
}

function Meme(){
    const[templates,setTemplates] = useState([]);
    const[template,setTemplate] = useState(null);
    const[topText, setTopText] = useState('');
    const[bottomText, setBottomText] = useState('');
    const[meme, setMeme] = useState('');

    function download(){
        var element = document.createElement('a');
        var file = new Blob([meme], { type: 'image/*' });
        element.href = URL.createObjectURL(file);
        element.download = 'meme.jpg';
        element.click();
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes').then(x => x.json()
        .then(response => setTemplates(response.data.memes))
        );
    }, [])
      if(meme){
          return <div style={{textAlign:"center"}}>
              <button className="button1" onClick={() => setMeme('')} > Back </button><br />
              <a className="navColor" href={meme} target="_blank" rel="noopener noreferrer" download>
              <img style={{width:300}} src={meme} alt="Custom Meme" />
              <br />
              Download
              </a><br />
              {/* <button className="button1" onClick={download} > Download </button><br /> */}
          </div>
      }
        return (
            <div style={{textAlign:"center"}}>
                {template && (
                <form onSubmit={async e => {
                    e.preventDefault()

                    const params = {
                        template_id:template.id,
                        text0: topText,
                        text1: bottomText,
                        username: 'shubhamkumarPandey',
                        password: 'Shubham@123'
                    }
                    const response = await fetch(
                        `https://api.imgflip.com/caption_image${ObjectToQueryParam(
                            params
                        )}`
                    );
              const jsonData =  await response.json();
              setMeme(jsonData.data.url);
                }}>
                <button className="button1" onClick={() => setTemplate(null)} > Back </button><br />
                <MemeComponent template={template} /> <br />
                <Input className="inputBox" type="text" required placeholder="Top Text" value={topText} onChange={e => {
                    setTopText(e.target.value)
                }} /> <br />
                <Input className="inputBox" type="text" required placeholder="Bottom Text" value={bottomText} onChange={e => {
                    setBottomText(e.target.value)
                }}/> <br />
                <button className="button" type="Submit" > Generate </button>
                </form>
                )}
                {
                !template && templates.map(template => {
                    return (
                    <MemeComponent
                    template={template} 
                    onClick={() => {
                        setTemplate(template)
                    }} />
                    )
                })}
                
            </div>
        );
    
}

export default Meme;