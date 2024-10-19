import React from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import EmojiIcon from "./EmojiIcon";
import { HslColorPicker } from "react-colorful";
import Loading from "./Loading";
import CodeBlock from "./CodeBlock";

const DesignSection = (props) => {
  const {
    emojiPickerIsOpen,
    color,
    emojis,
    onEmojiClick,
    handleColorChange,
    handleGenerateClick,
    removeEmoji,
    showCode,
    code,
    language,
    setShowCode,
  } = props;

  return showCode ? (
    <section className="flex flex-col gap-5 flex-1 justify-center items-center">
      <CodeBlock code={code} language={language} />
      <button
        onClick={() => setShowCode(false)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xl text-indigo-400 specialBtn"
      >
        <p>Reset</p>
      </button>
    </section>
  ) : (
    <section className="flex flex-col gap-5 flex-1 justify-center items-center">
      <h3 className="text-3xl text-indigo-400 bg">🎨 Design 🎨</h3>
      <div className="flex flex-col gap-5 md:flex-row min-h-80 md:min-h-40">
        <div className="my-auto">
          <EmojiPicker
            searchDisabled={false}
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
      {emojis.length > 0 && (
        <button
          onClick={removeEmoji}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-indigo-400 text-white specialBtnSec"
        >
          <p>undo emoji</p>
        </button>
      )}
      <hr className="bg-indigo-200 h-1 w-7/12 my-3 rounded-full" />
      <h3 className="text-3xl text-indigo-400 bg">🔮 Output 🔮</h3>
      <div>
        <EmojiIcon emojis={emojis} color={color} />
      </div>
      {/* <Emoji unified="1f423" size="25" /> */}
      <button
        onClick={handleGenerateClick}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xl text-indigo-400 specialBtn"
      >
        <p>Zip & Download</p>
      </button>
    </section>
  );
};

export default DesignSection;
