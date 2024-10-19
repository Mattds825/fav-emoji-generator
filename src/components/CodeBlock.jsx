import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import CopyButton from "./CopyButton";

const CodeBlock = (props) => {
  const { code, language } = props;
  return (
    <div className="relative flex flex-col gap-3 w-[90vw] md:w-full  text-center">
      <h3 className="text-3xl text-indigo-400 bg">
        🧑‍💻 Add this code to your index.html page 👩‍💻
      </h3>
      <div className=" bg-indigo-100 p-2 rounded-md">
        <CopyButton code={code} />
        <SyntaxHighlighter
          language={language}
          showLineNumbers={true}
          showInlineLineNumbers={false}
          customStyle={{
            marginTop: "1rem",
            background: "none",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
