import React from "react";
import Link from "next/link";

const AppBar = () => {
  return (
    <div className="bg-white fixed inset-x-0 z-10 shadow-md top-0 px-4 py-3 flex">
      <Link href="/">
        <h4 className="font-semibold text-2xl cursor-pointer text-black">
          Notes App
        </h4>
      </Link>
    </div>
  );
};

export default AppBar;
