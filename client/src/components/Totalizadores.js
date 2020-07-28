import React from 'react';
import css from './totalizadores.module.css';

export default function Totalizadores({totalizador}){
    const classes = `row ${css.flexRow}`;
    return (
      <div className={classes}>
        <div className="col s3">Lançamentos:  R$ {totalizador.lancamentos}</div>
        <div className="col s3">Receitas:  R$ {totalizador.receitas}</div>
        <div className="col s3">Despesas:  R$ {totalizador.despesas}</div>
        <div class="col s3">Saldo:  R$ {totalizador.saldos}</div>
      </div>
    )
}