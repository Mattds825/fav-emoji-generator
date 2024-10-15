import React, { useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import EmojiIcon from "./EmojiIcon";
import { HslColorPicker } from "react-colorful";

const Main = () => {
  const MAX_EMOJIS = 3;

  const [emojis, setEmojis] = useState([]); // Array to store up to 3 emojis
  const [color, setColor] = useState({ h: 0, s: 1, l: 0.5 });

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    console.log("current emojis: ", emojis);
    if (emojis.length < MAX_EMOJIS) {
      console.log("setting emoji");
      setEmojis([...emojis, emojiObject.emoji]);
    }
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return (
    <main className="flex flex-col gap-5 flex-1 justify-center items-center">
      <EmojiPicker
        reactionsDefaultOpen={true}
        onEmojiClick={(emojiObject, event) => {
          // console.log("event: ", event);
          // console.log("emojiObject", emojiObject);
          onEmojiClick(event, emojiObject);
        }}
      />
      <HslColorPicker color={color} onChange={handleColorChange} />
      <p>Chosen Emojis: </p>
      <div>
        <EmojiIcon emojis={emojis} color={color}/>
      </div>
      {/* <Emoji unified="1f423" size="25" /> */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-indigo-400 specialBtn">
        <p>Generate</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </main>
  );
};

export default Main;
