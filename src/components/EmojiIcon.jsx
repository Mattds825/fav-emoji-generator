import React, { useEffect } from "react";

const EmojiIcon = (props) => {
  const { emojis, color } = props;

  const getEmojiSize = () => {
    if (emojis.length === 1) {
      return "text-8xl";
    } else if (emojis.length === 2) {
      return "text-6xl";
    } else {
      return "text-4xl";
    }
  };

  useEffect(() => {
    console.log("color changed", color);
  }, [color]);

  return (
    <div id="emojiIcon">
      <div
        style={{
          backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
        }}
        className="flex justify-center items-center h-36 w-36 border border-slate-600 border-solid rounded-lg"
      >
        {emojis.map((emoji, index) => (
          <div className="my-auto">
            <span className={getEmojiSize()} key={index}>
              {emoji}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiIcon;
