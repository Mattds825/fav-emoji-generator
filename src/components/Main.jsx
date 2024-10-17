import React, { useState, useEffect } from "react";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import EmojiIcon from "./EmojiIcon";
import { HslColorPicker } from "react-colorful";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Loading from "./Loading";
import DesignSection from "./DesignSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = (props) => {
  //   const { saveAs } = props;

  const MAX_EMOJIS = 3;
  const IMG_SIZES = [192, 512, 180, 32, 16, 48];
  const OG_ICON_SIZE = 128;

  const sizeToNameMap = {
    192: "android-chrome-192x192.png",
    512: "android-chrome-512x512.png",
    180: "apple-touch-icon.png",
    32: "favicon-32x32.png",
    16: "favicon-16x16.png",
    48: "favicon.ico",
  };

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
    } else {
      console.log("loading stopped");
    }
  }, [loading]);

  const onEmojiClick = (event, emojiObject) => {
    if (emojis.length >= MAX_EMOJIS) {
      toast.warn("Max emojis reached 😳", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    console.log("setting emoji");
    setEmojis([...emojis, emojiObject.emoji]);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  function zipAndDownload(imgMaps) {
    var zip = new JSZip();

    imgMaps.forEach((imgMap) => {
      const { image, size } = imgMap;
      zip.file(sizeToNameMap[size], image.split(",")[1], {
        base64: true,
      });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "favicons.zip");
    });
  }

  const getImageData = async (size, scale, index) => {
    await html2canvas(document.querySelector("#emojiIcon"), {
      scale: scale,
    }).then((canvas) => {
      // the 48x48 image is for the favicon.ico file
      var image =
        sizeToNameMap[size] === 48
          ? canvas.toDataURL("image/x-icon")
          : canvas.toDataURL("image/png");

      setImagesDataMaps((prev) => [...prev, { image, size: IMG_SIZES[index] }]);

      console.log(`image ${scale}`, image);

      if (index === IMG_SIZES.length - 1) {
        setLoading(false);
        setImagesLoaded(true);
        console.log("finished loading images");
      }
    });
  };

  const handleGenerateClick = () => {
    IMG_SIZES.forEach((size, index) => {
      getImageData(size, size / OG_ICON_SIZE, index);
    });

    // scales.forEach((scale, index) => {
    //   console.log("scale", scale);
    //   getImageData(scale, index);
    // });
  };

  return (
    <main className="flex flex-col gap-5 flex-1 justify-center items-center">
      <DesignSection
        emojiPickerIsOpen={emojiPickerIsOpen}
        color={color}
        emojis={emojis}
        onEmojiClick={onEmojiClick}
        handleColorChange={handleColorChange}
        handleGenerateClick={() => {
          console.log("loading started");
          setLoading(true);
          // handleGenerateClick();
        }}
      />
      {loading && <Loading />}
      <ToastContainer />
    </main>
  );
};

export default Main;
