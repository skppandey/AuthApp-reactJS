import React from 'react';

 const MemeComponent =({template, onClick}) =>{
    return(
        <img 
        style={{width:250}} 
        key={template.id} 
        src={template.url} 
        alt={template.name} 
        onClick={onClick} />
    )
}

export default MemeComponent;