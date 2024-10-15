import React, { useState } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import EmojiIcon from "./EmojiIcon";
import { HslColorPicker } from "react-colorful";

const Main = () => {
  const MAX_EMOJIS = 3;

  const [emojis, setEmojis] = useState([]); // Array to store up to 3 emojis
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(true);
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

  const handleEmojiPickerToggle = () => {
    console.log("minimize");
    setEmojiPickerIsOpen(false);
  };

  return (
    <main className="flex flex-col gap-5 flex-1 justify-center items-center">
      <h3 className="text-3xl text-indigo-400 bg">🎨 Design 🎨</h3>
      <div className="flex flex-col gap-5 md:flex-row min-h-80 md:min-h-40">
        <div className="my-auto">
          <EmojiPicker
            searchDisabled={true}
            allowExpandReactions={true}
            reactionsDefaultOpen={emojiPickerIsOpen}
            onEmojiClick={(emojiObject, event) => {
              onEmojiClick(event, emojiObject);
            }}
          />
        </div>
        <div className="min-h-40">
        <HslColorPicker
          color={color}
          onChange={handleColorChange}
          className="myColorPicker mx-auto"
        />
        </div>
      </div>
      <hr className="bg-indigo-200 h-1 w-7/12 my-3 rounded-full" />
      <h3 className="text-3xl text-indigo-400 bg">🔮 Output 🔮</h3>
      <div>
        <EmojiIcon emojis={emojis} color={color} />
      </div>
      {/* <Emoji unified="1f423" size="25" /> */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-xl text-indigo-400 specialBtn">
        <p>Generate</p>
        <i className="fa-solid fa-plus"></i>
      </button>
    </main>
  );
};

export default Main;
