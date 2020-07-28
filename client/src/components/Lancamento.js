import React from 'react';
import css from './lancamento.module.css';
import Description from './Description';
import Position from './Position';
import Info from './Info';
import Category from './Category';
import Value from './Value';
import Action from './Action';

export default function Lancamento(props){
  
  const {position,lancamento,OnhandleActionClick} = props;

  const handleIconClick = (id, type) => {
    OnhandleActionClick(id, type);
  };

  return (
        <div className={css.flexRow}>
          <Position>{position}</Position> 
          <Info>
             <Category>{lancamento.category}</Category>
             <Description>{lancamento.description}</Description>
          </Info>
          <Value>{lancamento.value}</Value>
          <div
             style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "30%",
                   }}
          >
            <Action
               id={lancamento._id}
               onActionClick={handleIconClick}

               type="delete"
            />
            <Action
               onActionClick={handleIconClick}
               id={lancamento._id}
               type='edit'
            />
          </div>
        </div>
    )
}