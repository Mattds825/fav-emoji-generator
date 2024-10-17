import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between max-w-3xl w-full mx-auto my-3 px-5">
      <h1 className="text-4xl">
        ✌️✌️Fav
        <span className="decoration-indigo-400 decoration-4 line-through text-slate-600">
          icon
        </span>{" "}
        <span className="text-indigo-400">Emoji</span>
      </h1>
      <a
        href="/"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-indigo-400 specialBtn"
      >
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </a>
    </div>
  );
};

export default Header;
