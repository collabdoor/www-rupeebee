import { WordRotate } from "@/components/magicui/word-rotate";
import Image from "next/image";
import Android from "@/components/magicui/android";
import Iphone15Pro from "./magicui/iphone-15-pro";

export default function Landing() {
  return (
    <div className="items-center flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="grid grid-cols-2 ">
        <div>
          <WordRotate words={["नमस्ते", "Hello", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "হ্যালো"]} />
        </div>
        <div className="relative ">
          <Android
            className="size-[500px]"
            src="/assets/loading.png"
          />
          <Iphone15Pro className="size-[500px]" src="/assets/logo.png" />
        </div>
      </div>
    </div>
  );
}
