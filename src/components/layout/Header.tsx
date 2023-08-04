"use client";

import Link from "next/link";
import Image from "next/image";
import { ConnectFour, ConnectFour2 } from "@icons/index";

export default function Header() {
  return (
    <Link href="/">
      <h1 className="text-4xl mb-[5rem] flex space-x-3 font-bold">
        <span>Connect Four</span>
        <Image
          src={ConnectFour2}
          alt="connect four image"
          className="ml-2"
          width={60}
          height={60}
        />
      </h1>
    </Link>
  )
}