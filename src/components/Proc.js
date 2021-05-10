

import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const Proc = ({proc, onStatusToItem, onAvail}) => {

    return (
        
        <div className = {`task ${proc.available ? 'reminder' : ''}`} onDoubleClick={() => onAvail(proc.id)}>
            <h3>{proc.ProcId} <button className="btn2" onClick={() => onStatusToItem(proc)} >Manage Items</button></h3>
            <p>Date: {proc.Date}</p>
        </div>
    )
}

export default Proc