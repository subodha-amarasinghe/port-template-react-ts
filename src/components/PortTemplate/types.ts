export interface Port {
    id: string
    name: string
    readonly: boolean
    children: Port[]
}
