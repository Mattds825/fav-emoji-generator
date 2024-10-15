import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col h-screen bg-gradient-to-t from-indigo-100 to-transparent">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default App;
