import React from 'react';
import css from './card.module.css';


export default function Card({children,type}){
    const classes = `card ${css.cardExtra}`;
    const typeLancamento = type === '+' ? styles.receita : styles.despesa;

    return (
      <div style={typeLancamento} className={classes}>
        {children}
      </div>
    )
}

const styles = {
    receita: {
      background: '#7bed9f',
    },
  
    despesa: {
      background: '#ff6b81',
    },
  
  };

