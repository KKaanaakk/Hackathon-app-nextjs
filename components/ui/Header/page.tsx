"use client";

import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 h-16">
      <div className="container mx-auto flex justify-start items-center py-2 px-12">
        <Image
          src="/assets/logo/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
