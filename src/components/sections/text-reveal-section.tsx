import { TextReveal } from "@/components/magicui/text-reveal";

// not used
export default function TextRevealSection() {
  return (
    <section className="py-16 -mt-10 bg-gradient-to-tr from-green-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        <TextReveal className="bg-transparent">
          Financial literacy is not just about money, it's about freedom, security, and the power to make informed decisions that shape your future.
        </TextReveal>
      </div>
    </section>
  );
}
