import React, { useState, useEffect } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import EmojiIcon from "./EmojiIcon";
import { HslColorPicker } from "react-colorful";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Loading from "./Loading";
import DesignSection from "./DesignSection";

const Main = (props) => {
  //   const { saveAs } = props;

  const MAX_EMOJIS = 3;
  const IMG_SIZES = [128, 64, 48, 32, 16];

  const [emojis, setEmojis] = useState([]); // Array to store up to 3 emojis
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(true);
  const [color, setColor] = useState({ h: 0, s: 1, l: 0.5 });

  const [loading, setLoading] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imagesDataMaps, setImagesDataMaps] = useState([]);

  useEffect(() => {
    if (imagesLoaded) {
      console.log("zipping and downloading images");
      zipAndDownload(imagesDataMaps);
      setImagesLoaded(false);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    if (loading) {
        console.log("loading started");
        setTimeout(() => {
            handleGenerateClick();
        }, 100);
    }else{
        console.log("loading stopped");
    }
  }, [loading]);


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

  function zipAndDownload(imgMaps) {
    var zip = new JSZip();

    imgMaps.forEach((imgMap) => {
      const { image, size } = imgMap;
      zip.file(`favicon-${size}x${size}.png`, image.split(",")[1], {
        base64: true,
      });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "favicons.zip");
    });
  }

  const getImageData = async (scale, index) => {
    await html2canvas(document.querySelector("#emojiIcon"), {
      scale: scale,
    }).then((canvas) => {
      var image = canvas.toDataURL("image/png");

      setImagesDataMaps((prev) => [...prev, { image, size: IMG_SIZES[index] }]);

      console.log(`image ${scale}`, image);

      if (index === 4) {
        setLoading(false);
        setImagesLoaded(true);
        console.log("finished loading images");
      }
    });
  };

  const handleGenerateClick = () => {
    const sizes = [128, 64, 48, 32, 16];
    const scales = [
      sizes[0] / 128,
      sizes[1] / 128,
      sizes[2] / 128,
      sizes[3] / 128,
      sizes[4] / 128,
    ];
    const images = [];

    scales.forEach((scale, index) => {
      console.log("scale", scale);
      getImageData(scale, index);
    });
  };

  return (
    <main className="flex flex-col gap-5 flex-1 justify-center items-center">
      <DesignSection
        emojiPickerIsOpen={emojiPickerIsOpen}
        color={color}
        emojis={emojis}
        onEmojiClick={onEmojiClick}
        handleColorChange={handleColorChange}
        handleGenerateClick={()=>{
            console.log("loading started");
            setLoading(true);
            // handleGenerateClick();
        }}
      />
      {loading && <Loading />}
    </main>
  );
};

export default Main;
