type SankBarPro = { 
  message: string, 
  isOpen: boolean, 
  onClose: Function 
}

export default function SankBar({ message, isOpen, onClose }: SankBarPro) {
  if (!isOpen) {
    return <></>
  }
  return (
    <p className={`` + "fixed bottom-20 right-10 flex items-center gap-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50"}>
      <span className="text-sm grow">{message}</span>
      <button onClick={() => onClose()} className="ml-2 text-gray-400 hover:text-white">&times;</button>
    </p>
  )
}