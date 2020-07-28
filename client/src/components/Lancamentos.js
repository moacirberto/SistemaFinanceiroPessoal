import React from 'react';
import Card from './Card';
import Lancamento from './Lancamento';

export default function Lancamentos({Lancamentos,OnhandleActionClick}){
   const handleIconClick = (id, type) => {
      OnhandleActionClick(id, type);
    };
   
   return (
        <div>
          {Lancamentos.map((lancamento, index) => {     
               const {_id} = lancamento;
               return (
                  <div key={_id}>
                      <Card
                         type={lancamento.type}
                      >
                         <Lancamento 
                            position={index + 1}
                            lancamento={lancamento}
                            OnhandleActionClick={handleIconClick}
                         />
                      </Card> 
                  </div>
               )
            })
         
          }
        </div>

    )
}

  
