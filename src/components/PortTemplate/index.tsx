import React, { useState } from 'react'
import PortInfoRow from './PortInfoRow'
import type { Port } from '../../types/port.types'
import './PortTemplate.css'
import { addChildToTree, removeFromTree, updatePortInTree, newPort } from '../../utils/portData.utils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from '@fortawesome/free-solid-svg-icons';

export type { Port }

const PortTemplate: React.FC = () => {
    const [ports, setPorts] = useState<Port[]>([])

    const addPort = (parentId: string | null = null) => {
        setPorts((prev) => addChildToTree(prev, parentId, newPort()))
    }

    const removePort = (id: string) => {
        setPorts((prev) => removeFromTree(prev, id))
    }

    const updatePortName = (id: string, name: string) => {
        setPorts((prev) => updatePortInTree(prev, id, (p) => ({ ...p, name })))
    }

    const updatePortReadonly = (id: string, readonly: boolean) => {
        setPorts((prev) => updatePortInTree(prev, id, (p) => ({ ...p, readonly })))
    }
    return (
        <div className='port-template'>
            <h1 className="port-template-header">Port Template</h1>
            <button className="add-button dashed-button port-template-add-root" onClick={() => addPort(null)}>
                <FontAwesomeIcon icon={faAdd} />
            </button>
            <div className='port-rows-container'>
                {ports.map((port) => (
                    <PortInfoRow
                        key={port.id}
                        port={port}
                        onAddChild={addPort}
                        onRemove={removePort}
                        onUpdateName={updatePortName}
                        onUpdateReadonly={updatePortReadonly}
                    />
                ))}
            </div>

        </div>
    )
}

export default PortTemplate
