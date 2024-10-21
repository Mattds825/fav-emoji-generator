import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Loading from "./Loading";
import DesignSection from "./DesignSection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
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

  const [showCode, setShowCode] = useState(false);

  const htmlCode = `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">`;

  const webManifestCode = `{"name":"","short_name":"","icons":
  [{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],
  "theme_color":"#ffffff","background_color":"#ffffff","display":"standalone"}`;

  useEffect(() => {
    if (imagesLoaded) {
      console.log("zipping and downloading images");
      zipAndDownload(imagesDataMaps);
      setImagesLoaded(false);
      setShowCode(true);
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

  const reset = () => {
    setEmojis([]);
    setColor({ h: 0, s: 1, l: 0.5 });
    setImagesDataMaps([]);
    setImagesLoaded(false);
    setShowCode(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    if (emojis.length >= MAX_EMOJIS) {
      console.log(emojis);
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

    console.log("setting emoji", [...emojis]);
    setEmojis((prev) => {
      console.log("prev", prev);
      return [...prev, emojiObject.emoji];
    });
  };

  const removeEmoji = () => {
    if (emojis.length === 0) return;
    const newEmojis = emojis.filter((_, index) => index !== emojis.length - 1);

    console.log("newEmojis", newEmojis);

    setEmojis(newEmojis);

    console.log("emojis", emojis);

    console.log(emojis.length);
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  function zipAndDownload(imgMaps) {
    var zip = new JSZip();

    zip.file("site.webmanifest", webManifestCode);

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
  };

  return (
    <main className="flex flex-col gap-5 flex-1 justify-center items-center">
      <DesignSection
        emojiPickerIsOpen={emojiPickerIsOpen}
        color={color}
        emojis={emojis}
        onEmojiClick={onEmojiClick}
        handleColorChange={handleColorChange}
        removeEmoji={removeEmoji}
        handleGenerateClick={() => {
          console.log("loading started");
          setLoading(true);
          // handleGenerateClick();
        }}
        showCode={showCode}
        code={htmlCode}
        language={"html"}
        reset={reset}
      />
      {loading && <Loading />}

      <ToastContainer />
    </main>
  );
};

export default Main;
