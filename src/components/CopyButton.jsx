import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyButton = (props) => {
  const { code } = props;
  return (
    <button className="absolute right-3 mx-auto cursor-pointer">
      <CopyToClipboard text={code} onCopy={() => alert("copied!")}>
        <div>
          <i className="fa-solid fa-copy text-indigo-950"></i>
        </div>
      </CopyToClipboard>
    </button>
  );
};

export default CopyButton;
