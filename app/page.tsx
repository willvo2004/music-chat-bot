import logo from "../public/logo.jpg";
import Image from "next/image";
import { SideBarNav } from "./ui/SideBarNav";
import { TextInputArea } from "./ui/TextInputArea";

export default function Home() {
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
        <TextInputArea />
      </main>
    </div>
  );
}
