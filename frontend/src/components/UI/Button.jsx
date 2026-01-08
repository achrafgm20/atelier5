import React from 'react'

export default function Button({text ,onClick}) {
  return (
    <div onClick={onClick} className="bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">{text}</div>
  )
}
