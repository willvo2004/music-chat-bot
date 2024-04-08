"use client";

import logo from "../public/logo.jpg";
import Image from "next/image";
import { useRef } from "react";
import { fetchAIResponse } from "./lib/data";
import { SideBarNav } from "./ui/SideBarNav";

export default function Home() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyPress = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (textareaRef.current) {
        const ai = await fetchAIResponse(textareaRef.current.value);
        console.log(ai);
        (textareaRef.current as HTMLTextAreaElement).value = "";
      }
    }
}

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden">
      <SideBarNav />
    <main className="flex flex-col items-center h-full w-full flex-1 overflow-auto transition-width">
      <div className="text-5xl text-black my-16 font-semibold flex flex-col items-center">
        <Image
          src={logo}
          alt="Spotify Logo"
          height={74}
          className="rounded-full my-5"
        />
        <h1 className="text-2xl text-black ">
          What are you in the mood for?
        </h1>
      </div>
      <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
        <form
          className="self-stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
        >
          <div className="h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] relative">
            <textarea
              contentEditable
              name=""
              id=""
              rows={1}
              tabIndex={0}
              placeholder="Message"
              data-enable-grammarly="true"
              ref={textareaRef}
              onKeyUp={handleKeyPress}
              className=" text-slate-800 max-h-[25dvh] h-[52px] w-full m-0 py-[10px] pr-10 pl-2 md:pr-12 md:pl-[10px] resize-none border-2 bg-transparent focus:ring-0 focus-visible:ring-0 dark:bg-transparent overflow-y-hidden rounded-md"
            ></textarea>
            <button className="absolute right-0 top-0 my-1.5 mr-1.5 px-1.5 rounded-full border border-black bg-black text-white transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-gray-400">
              +
            </button>
          </div>
        </form>
      </div>
    </main>
    </div>
  );
}
