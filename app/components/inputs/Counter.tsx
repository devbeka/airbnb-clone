'use client'

import { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface CointerProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: number) => void
}

const Counter: React.FC<CointerProps> = ({
  title,
  subtitle,
  onChange,
  value,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1)
  }, [onChange, value])

  const onReduce = useCallback(() => {
    if (value === 1) {
      return
    }
    onChange(value - 1)
  }, [onChange, value])

  return (
    <div className="flex flex-row items-center justify-between mt-6">
      <div className="flex flex-col">
        <h1 className="font-medium">{title}</h1>
        <h2 className="font-ligth text-gray-600">{subtitle}</h2>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onReduce}
          className=" w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlineMinus />
        </button>
        <span className="font-light text-xltext-neutral-600">{value}</span>
        <button
          onClick={onAdd}
          className=" w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  )
}

export default Counter
