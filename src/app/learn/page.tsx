import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/motion-primitives/accordion";
import { financialTips, type Tip } from "./tips";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

interface TipCardProps {
  tip: Tip;
}

function TipCard({ tip }: TipCardProps) {
  const isDo = tip.type === "do";
  const borderColor = isDo ? "border-green-100" : "border-red-100";
  const hoverColor = isDo ? "hover:bg-green-50" : "hover:bg-red-50";
  const badgeColor = isDo
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
  const iconBgColor = isDo ? "bg-green-100" : "bg-red-100";
  const exampleColor =
    tip.example.type === "warning"
      ? "bg-red-50 border-red-400"
      : tip.example.type === "success"
      ? "bg-green-50 border-green-400"
      : "bg-yellow-50 border-yellow-400";
  const exampleTextColor =
    tip.example.type === "warning"
      ? "text-red-800"
      : tip.example.type === "success"
      ? "text-green-800"
      : "text-yellow-800";

  return (
    <AccordionItem
      value={tip.id}
      className={`bg-white rounded-xl shadow-sm border ${borderColor} overflow-hidden`}
    >
      <AccordionTrigger
        className={`w-full text-left p-6 ${hoverColor} transition-colors`}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <Image
                src={tip.icon}
                alt={tip.title}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <span
                className={`inline-block ${badgeColor} px-3 py-1 rounded-full text-sm font-medium mb-2`}
              >
                {isDo ? "✓ DO" : "✗ DON'T"}
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                {tip.title}
              </h3>
            </div>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="px-6 pb-6">
          <p className="text-gray-600 mb-4">{tip.description}</p>
          {tip.details && <p className="text-gray-600 mb-4">{tip.details}</p>}
          <div className={`${exampleColor} border-l-4 p-4 mb-4`}>
            <p className={`text-sm ${exampleTextColor}`}>
              <strong>{tip.example.title}</strong> {tip.example.content}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            <strong>Tip:</strong> {tip.tip}
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-violet-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16 mt-32">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <PointerHighlight
              rectangleClassName="bg-blue-100 border-green-300 leading-loose"
              pointerClassName="text-green-500 h-3 w-3"
              containerClassName="inline-block ml-1"
            >
              <span className="relative z-10 p-2">Financial</span>
            </PointerHighlight>{" "}
            Do&apos;s &amp; Don&apos;ts
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Master essential financial safety practices to protect yourself from
            fraud and build lasting wealth. Your financial security starts with
            smart decisions and awareness.
          </p>
        </div>

        {/* Tips Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            className="flex w-full flex-col space-y-4"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {financialTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </Accordion>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Image
                  src="/bee-props/grow-and-save.png"
                  alt="Grow and Save"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold">Stay Safe, Stay Smart!</h3>
              </div>
              <p className="text-green-100 mb-6">
                Download RupeeBee to get personalized financial safety tips and
                fraud alerts tailored just for you.
              </p>
              <button className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors">
                Download RupeeBee App
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
