import React from 'react'
import type { Port } from '../../types/port.types'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faAdd } from '@fortawesome/free-solid-svg-icons';

interface PortInfoRowProps {
    port: Port
    depth?: number
    selectedId: string | null
    onSelect: (id: string) => void
    onAddChild: (parentId: string) => void
    onRemove: (id: string) => void
    onUpdateName: (id: string, name: string) => void
    onUpdateReadonly: (id: string, readonly: boolean) => void
}
const PortInfoRow: React.FC<PortInfoRowProps> = ({
    port,
    depth = 0,
    selectedId,
    onSelect,
    onAddChild,
    onRemove,
    onUpdateName,
    onUpdateReadonly,
}) => {
    const isSelected = port.id === selectedId

    const handleAddChild = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault()
        onAddChild(id)
    }
  return (
    <div key={port.id} className="port-box">
        <div className="port-info-box" onClick={() => onSelect(port.id)}>
            <input 
                type='text'
                style={{ padding: '8px', ...(port.readonly ? { pointerEvents: 'none' as const } : {}) }}
                value={port.name}
                onChange={(e) => onUpdateName(port.id, e.target.value)}
                disabled={port.readonly}
                onFocus={() => onSelect(port.id)}
            />
            {isSelected && (
                <div className="action-bar" onClick={(e) => e.stopPropagation()}>
                    <div className="action-card">
                        <div className='readonly-toogle-wrapper'>
                            {/* <input type="checkbox" checked={port.readonly} onChange={(e) => onUpdateReadonly(port.id, e.target.checked)}/>
                            <label>Read Only</label> */}

                            <label className="toggle-label">
                                <input
                                    type="checkbox"
                                    className="toggle-input"
                                    checked={port.readonly}
                                    onChange={(e) => onUpdateReadonly(port.id, e.target.checked)}
                                />
                                <span className="toggle-track">
                                    <span className="toggle-thumb" />
                                </span>
                                <span>Readonly</span>
                            </label>
                        </div>
                        <button onClick={() => onRemove(port.id)} className='delete-button'>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                    <button onClick={(e) => handleAddChild(e, port.id)} title="Add child" className='add-button dashed-button'>
                        <FontAwesomeIcon icon={faAdd} />
                    </button>
                </div>
            )}

        </div>
        {port.children.length > 0 && (
                <div className="port-box-children">
                    {port.children.map((child) => (
                        <PortInfoRow
                            key={child.id}
                            port={child}
                            depth={depth + 1}
                            selectedId={selectedId}
                            onSelect={onSelect}
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