import React from 'react'
import css from './value.module.css';

export default function Value({children}) {
    return (
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "15%",
           }}
        >
            R$ {children}
        </div>
    )
}