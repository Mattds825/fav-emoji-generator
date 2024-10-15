import React, { useState } from "react";
import EmojiPicker, {Emoji} from "emoji-picker-react";

const Main = () => {
  const MAX_EMOJIS = 3;

  const [emojis, setEmojis] = useState([]); // Array to store up to 3 emojis

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    console.log("current emojis: ", emojis);
    if (emojis.length < MAX_EMOJIS) {
        console.log("setting emoji");
      setEmojis([...emojis, emojiObject.emoji]);
    }
  };

  return (
    <main className="flex flex-col gap-3 flex-1 justify-center items-center">
      <EmojiPicker
        onEmojiClick={(emojiObject, event) =>
          {
            // console.log("event: ", event);
            // console.log("emojiObject", emojiObject);
            onEmojiClick(event, emojiObject)
          }
        }
      />
      <p>Chosen Emojis: </p>
      <div>
        {emojis.map((emoji, index) => (
          <span className="text-5xl" key={index}>{emoji}</span>
        ))}
      </div>
      {/* <Emoji unified="1f423" size="25" /> */}
    </main>
  );
};

export default Main;
