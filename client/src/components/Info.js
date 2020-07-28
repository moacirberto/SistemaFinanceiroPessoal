import React from 'react'

export default function Info({children}) {
    return (
        <div
          style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "50%",
           }}
        >
            {children}
        </div>
    )
}
