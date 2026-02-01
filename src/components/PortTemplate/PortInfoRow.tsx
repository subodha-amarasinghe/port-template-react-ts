import React, { useState } from 'react'
import type { Port } from './types'; 

interface PortInfoRowProps {
    port: Port
    depth?: number
    onAddChild: (parentId: string) => void
    onRemove: (id: string) => void
    onUpdateName: (id: string, name: string) => void
    onUpdateReadonly: (id: string, readonly: boolean) => void
}
const PortInfoRow: React.FC<PortInfoRowProps> = ({
    port,
    depth = 0,
    onAddChild,
    onRemove,
    onUpdateName,
    onUpdateReadonly,
}) => {
    const [isFocused, setIsFocused] = useState(true)

    const handleAddChild = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        onAddChild(id)
    }
  return (
    <div key={port.id} className="port-box" style={{ marginLeft: depth * 20 }}>
        <div className="port-info-box">
            <input 
                type='text'
                style={{padding: '8px'}}
                value={port.name}
                onChange={(e) => onUpdateName(port.id, e.target.value)}
                disabled={port.readonly}
                // onFocus={() => setIsFocused(true)}
                // onBlur={() => setIsFocused(false)}
            />
            {isFocused && (
                <div className="action-bar">
                    <div className="action-card">
                        <div>
                            <input type="checkbox" checked={port.readonly} onChange={(e) => onUpdateReadonly(port.id, e.target.checked)}/>
                            <label>Read Only</label>
                        </div>
                        <button onClick={() => onRemove(port.id)}>&#128465;</button>
                    </div>
                    <button onClick={(e) => handleAddChild(e, port.id)} title="Add child">+</button>
                </div>
            )}

        </div>
        {port.children.length > 0 && (
                <div className="port-box__children">
                    {port.children.map((child) => (
                        <PortInfoRow
                            key={child.id}
                            port={child}
                            depth={depth + 1}
                            onAddChild={onAddChild}
                            onRemove={onRemove}
                            onUpdateName={onUpdateName}
                            onUpdateReadonly={onUpdateReadonly}
                        />
                    ))}
                </div>
            )}
    </div>
  )
}

export default PortInfoRow