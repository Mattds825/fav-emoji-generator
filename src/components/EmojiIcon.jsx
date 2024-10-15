import React from 'react'

const EmojiIcon = (props) => {
    const { emojis } = props

    const getEmojiSize = () => {
        if (emojis.length === 1) {
            return 'text-8xl'
        } else if (emojis.length === 2) {
            return 'text-6xl'
        } else {
            return 'text-4xl'
        }
    }
  return (
    <div className='flex justify-center items-center h-36 w-36 border border-slate-600 border-solid rounded-lg'>
        {emojis.map((emoji, index) => (
          <span className={getEmojiSize()} key={index}>{emoji}</span>
        ))}
    </div>
  )
}

export default EmojiIcon