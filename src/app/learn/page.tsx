import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../../components/motion-primitives/accordion';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-violet-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16 mt-32">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Do's & Don'ts
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Learn essential financial safety practices to protect yourself from fraud and make smart money decisions. 
            Your financial security starts with awareness.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion
            className="flex w-full flex-col space-y-4"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* DO: Verify sender before clicking links */}
            <AccordionItem value="verify-sender" className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-green-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/13.png" 
                        alt="Verify Sender" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✓ DO</span>
                      <h3 className="text-xl font-semibold text-gray-800">Verify sender before clicking links</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Always verify the sender's identity before clicking any links in messages, emails, or notifications. 
                    Fraudsters often impersonate banks and legitimate companies.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-sm text-yellow-800">
                      <strong>Real Example:</strong> You receive an SMS saying "Your account will be blocked. Click here to verify immediately." 
                      A legitimate bank will never ask you to verify through suspicious links.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Tip:</strong> Contact your bank directly using official phone numbers to verify any suspicious messages.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DON'T: Share OTP or PIN */}
            <AccordionItem value="dont-share-otp" className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-red-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/15.png" 
                        alt="Don't Share OTP" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✗ DON'T</span>
                      <h3 className="text-xl font-semibold text-gray-800">Share OTP or PIN with anyone</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Never share your OTP (One-Time Password) or PIN with anyone, including people claiming to be bank representatives. 
                    These are confidential and meant only for you.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <p className="text-sm text-red-800">
                      <strong>Common Scam:</strong> Fraudsters call pretending to be from your bank and ask for OTP to "verify your account" 
                      or "update KYC details." Banks NEVER ask for OTP over phone calls.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Remember:</strong> OTP is like giving someone the key to your bank account. Keep it secret!
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DO: Use strong passwords */}
            <AccordionItem value="strong-passwords" className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-green-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/20.png" 
                        alt="Strong Passwords" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✓ DO</span>
                      <h3 className="text-xl font-semibold text-gray-800">Use strong, unique passwords</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Create strong, unique passwords for each of your financial accounts. Use a combination of letters, numbers, 
                    and special characters.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Good Practice:</strong> Use passwords like "MyBank@2025!" instead of simple ones like "123456" or "password". 
                      Consider using a password manager to generate and store unique passwords.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Tip:</strong> Change your banking passwords every 3-6 months and never reuse them across different platforms.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DON'T: Use public Wi-Fi for banking */}
            <AccordionItem value="no-public-wifi" className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-red-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/25.png" 
                        alt="No Public WiFi" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✗ DON'T</span>
                      <h3 className="text-xl font-semibold text-gray-800">Use public Wi-Fi for banking</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Avoid accessing your bank accounts or making financial transactions over public Wi-Fi networks in cafes, 
                    airports, or shopping malls. These networks are often unsecured.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <p className="text-sm text-red-800">
                      <strong>Risk:</strong> Hackers can easily intercept data transmitted over public Wi-Fi, including your login credentials 
                      and transaction details. This puts your account at serious risk.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Alternative:</strong> Use your mobile data or a secure VPN if you must access banking services while out.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DO: Set up transaction notifications */}
            <AccordionItem value="transaction-alerts" className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-green-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/30.png" 
                        alt="Transaction Alerts" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✓ DO</span>
                      <h3 className="text-xl font-semibold text-gray-800">Set up app notifications for all transactions</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Enable instant notifications for all transactions, no matter how small. This helps you track your spending 
                    and quickly identify any unauthorized transactions.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Smart Move:</strong> Set up both SMS and app notifications. If you receive a transaction alert for something 
                      you didn't do, contact your bank immediately to block the card and report fraud.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Tip:</strong> Review your transaction history weekly to spot any unusual activity early.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DON'T: Respond to urgent messages without verification */}
            <AccordionItem value="no-urgent-response" className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-red-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/35.png" 
                        alt="No Urgent Response" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✗ DON'T</span>
                      <h3 className="text-xl font-semibold text-gray-800">Respond to urgent-sounding messages without checking</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Fraudsters create fake urgency to make you act without thinking. Messages like "Account will be closed in 2 hours" 
                    or "Immediate action required" are red flags.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <p className="text-sm text-red-800">
                      <strong>Scammer Tactic:</strong> "Your account has been compromised! Click here within 10 minutes to secure it." 
                      Real banks give you proper time and alternative contact methods to resolve issues.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Remember:</strong> Take time to verify. If it's truly urgent, your bank will have multiple ways to reach you.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DO: Use official banking apps */}
            <AccordionItem value="official-apps" className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
              <AccordionTrigger className="w-full text-left p-6 hover:bg-green-50 transition-colors">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image 
                        src="/bee-props/calculator-tools.png" 
                        alt="Official Apps" 
                        width={40} 
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">✓ DO</span>
                      <h3 className="text-xl font-semibold text-gray-800">Use official banking apps and websites only</h3>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-200 group-data-expanded:rotate-180" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">
                    Always download banking apps from official app stores and visit bank websites by typing the URL directly. 
                    Avoid clicking links in emails or messages.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Safety Check:</strong> Verify the app developer name matches your bank exactly. Look for official verification badges 
                      in app stores and check user reviews for authenticity.
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    <strong>Tip:</strong> Bookmark your bank's official website to avoid typing the wrong URL accidentally.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
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
                Download RupeeBee to get personalized financial safety tips and fraud alerts.
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
