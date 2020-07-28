import React from 'react';


export default function NovoLancamento({description,OnhandleDescription,OnhandleInsert}){
    const handleChangeDescription = (event) => {
        OnhandleDescription(event);
    }

    const handleInsert = () =>{
      OnhandleInsert();
    }

    return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
             <button 
                className="waves-effect waves-light btn"
                style={{ width: "250px", marginRight: "10px" }}
                onClick={handleInsert}
                >Novo Lançamento
             </button>
             <input 
                 id="filtro" 
                 placeholder="Filtro"
                 type="text" 
                 onChange={handleChangeDescription}>
             </input>
        </div>
    )
}


