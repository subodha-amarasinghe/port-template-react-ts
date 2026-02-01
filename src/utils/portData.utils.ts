import type { Port } from "../components/PortTemplate"
import { v4 as uuidv4 } from 'uuid'

export const  updatePortInTree = (ports: Port[], id: string, update: (p: Port) => Port): Port[] => {
    return ports.map((port) =>
        port.id === id ? update(port) : { ...port, children: updatePortInTree(port.children, id, update) }
    )
}

export const addChildToTree = (ports: Port[], parentId: string | null, child: Port): Port[] => {
    console.log('addChildToTree', ports, parentId, child)
    if (parentId === null) return [...ports, child]
    return ports.map((port) =>
        port.id === parentId
            ? { ...port, children: [...port.children, child] }
            : { ...port, children: addChildToTree(port.children, parentId, child) }
    )
}

export const  removeFromTree = (ports: Port[], id: string): Port[] => {
    return ports
        .filter((port) => port.id !== id)
        .map((port) => ({ ...port, children: removeFromTree(port.children, id) }))
}

export const newPort = (): Port => ({ id: uuidv4(), name: '', readonly: false, children: [] })