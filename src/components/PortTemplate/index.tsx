import React, { useState } from 'react'
import PortInfoRow from './PortInfoRow'
import type { Port } from './types'
import './PortTemplate.css'
import { addChildToTree, removeFromTree, updatePortInTree, newPort } from '../../utils/portData.utils'

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
            <h1 className="port-template__header">Port Template</h1>
            <button className="port-template__add-root" onClick={() => addPort(null)}>+</button>

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
    )
}

export default PortTemplate
