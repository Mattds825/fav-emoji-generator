import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {

  const saveAs = (blob, fileName) =>{
    var elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
        elem.click();
    } else {
        elem.target = '_blank';
        elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
        }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }

  return (
    <>
      <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-indigo-100 to-transparent ">
        <Header />
        <Main saveAs={saveAs} />
        <Footer />
      </div>
    </>
  );
}

export default App;
