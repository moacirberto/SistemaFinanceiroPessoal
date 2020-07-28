import React from 'react';
import css from './filtrodata.module.css'

export default function FiltroData({allDatas,OnhandleChangeDate,OnhandleNextData,OnhandlePriorData,currentPeriod}) {
    
    const handleChangeDate = (event) => {
        OnhandleChangeDate(event);  
    }

    const handleNextData = (event) => {
        OnhandleNextData(event);
    }

    const handlePriorData = (event) => {
        OnhandlePriorData(event);
    }
    const classes = `${css.flexRowFilter}`;

    return (
     <div 
       style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
     >
         <button className="waves-effect waves-light btn" onClick={handleNextData}>Próximo</button>
         <select className='browser-default' 
                 value={currentPeriod} 
                 style={{ width: "150px", marginRight: "10px", marginLeft: "10px" }}
                 onChange={handleChangeDate}>
             {allDatas.map((x) => {
               return (
                  <option key={x}>{x}</option>
                  )
               })
             }
         </select>
         <button className="waves-effect waves-light btn" onClick={handlePriorData}>Anterior</button>
      </div>  
    )
}
