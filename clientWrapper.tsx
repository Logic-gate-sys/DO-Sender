'use client'


type clientProps = {
    children?:React.ReactNode
}

export default function ClientWrapper({ children }: clientProps) {
    return (
        <div>{children}</div>
    )
}