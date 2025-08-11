import { WordRotate } from "@/components/magicui/word-rotate";
import Image from "next/image";

export default function Home() {
  return (
    <div className="items-center flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <WordRotate words={["नमस्ते", "Hello", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "হ্যালো"]}/>
    </div>
  );
}
