import Image from "next/image"

export function botaoTrash({onClick}: {onClick: () => void}) {
    return (
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={onClick}
        ><Image src="/icons/trash.png" alt="Remover" width={20} height={20}/></button>
    )
}