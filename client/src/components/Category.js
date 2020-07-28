import React from 'react'

export default function Category({children}) {
    return (
        <div style={{ fontWeight: 'bold'}}>
            {children}
        </div>
    )
}