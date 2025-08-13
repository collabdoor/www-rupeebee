import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

const testimonials = [
  { name: "Priya", role: "Student", content: "RupeeBee helped me save ₹50,000 in 6 months!" },
  { name: "Rahul", role: "Professional", content: "No more falling for financial scams. Thank you!" },
  { name: "Anita", role: "Entrepreneur", content: "Best financial literacy app in India." },
  { name: "Vikash", role: "Teacher", content: "Teaching my students to be financially smart." },
  { name: "Meera", role: "Mother", content: "Protecting my family's financial future." },
];

export default function TestimonialsSection() {
  return (
    <section id="community" className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-heading mb-4">
            What Our <span className="text-green-700">Community</span> Says
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands who've transformed their financial lives
          </p>
        </div>

        <Marquee pauseOnHover className="[--duration:20s]">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 mx-4 shadow-sm border border-green-100 min-w-[300px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src={`/bee-props/${[15, 20, 25, 30, 35][idx % 5]}.png`} 
                    alt={testimonial.name}
                    width={40} 
                    height={40}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-700">"{testimonial.content}"</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
