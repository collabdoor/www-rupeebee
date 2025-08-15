export interface Tip {
  id: string;
  type: 'do' | 'dont';
  title: string;
  description: string;
  details: string;
  example: {
    type: 'warning' | 'success' | 'info';
    title: string;
    content: string;
  };
  tip: string;
  icon: string;
}

export const financialTips: Tip[] = [
  // DO's
  {
    id: 'verify-sender',
    type: 'do',
    title: 'Verify sender before clicking links',
    description: 'Always verify the sender\'s identity before clicking any links in messages, emails, or notifications. Fraudsters often impersonate banks and legitimate companies.',
    details: 'Authentic banks and financial institutions will never ask for sensitive information through suspicious links or urgent messages.',
    example: {
      type: 'warning',
      title: 'Real Example:',
      content: 'You receive an SMS saying "Your account will be blocked. Click here to verify immediately." A legitimate bank will never ask you to verify through suspicious links.'
    },
    tip: 'Contact your bank directly using official phone numbers to verify any suspicious messages.',
    icon: '/bee-props/13.png'
  },
  {
    id: 'strong-passwords',
    type: 'do',
    title: 'Use strong, unique passwords',
    description: 'Create strong, unique passwords for each of your financial accounts. Use a combination of letters, numbers, and special characters.',
    details: 'Strong passwords are your first line of defense against unauthorized access to your financial accounts.',
    example: {
      type: 'success',
      title: 'Good Practice:',
      content: 'Use passwords like "MyBank@2025!" instead of simple ones like "123456" or "password". Consider using a password manager to generate and store unique passwords.'
    },
    tip: 'Change your banking passwords every 3-6 months and never reuse them across different platforms.',
    icon: '/bee-props/20.png'
  },
  {
    id: 'transaction-alerts',
    type: 'do',
    title: 'Set up app notifications for all transactions',
    description: 'Enable instant notifications for all transactions, no matter how small. This helps you track your spending and quickly identify any unauthorized transactions.',
    details: 'Real-time transaction alerts are one of the most effective ways to detect fraud early and protect your money.',
    example: {
      type: 'success',
      title: 'Smart Move:',
      content: 'Set up both SMS and app notifications. If you receive a transaction alert for something you didn\'t do, contact your bank immediately to block the card and report fraud.'
    },
    tip: 'Review your transaction history weekly to spot any unusual activity early.',
    icon: '/bee-props/30.png'
  },
  {
    id: 'official-apps',
    type: 'do',
    title: 'Use official banking apps and websites only',
    description: 'Always download banking apps from official app stores and visit bank websites by typing the URL directly. Avoid clicking links in emails or messages.',
    details: 'Fake banking apps and websites are common tools used by fraudsters to steal your login credentials and personal information.',
    example: {
      type: 'success',
      title: 'Safety Check:',
      content: 'Verify the app developer name matches your bank exactly. Look for official verification badges in app stores and check user reviews for authenticity.'
    },
    tip: 'Bookmark your bank\'s official website to avoid typing the wrong URL accidentally.',
    icon: '/bee-props/calculator-tools.png'
  },
  {
    id: 'budget-tracking',
    type: 'do',
    title: 'Track your expenses regularly',
    description: 'Monitor your spending patterns and create a monthly budget to understand where your money goes. This helps identify unnecessary expenses and fraud.',
    details: 'Regular expense tracking helps you build financial discipline and catch unauthorized transactions quickly.',
    example: {
      type: 'success',
      title: 'Best Practice:',
      content: 'Use budgeting apps or maintain a simple expense diary. Categorize expenses like food, transport, entertainment to see spending patterns clearly.'
    },
    tip: 'Follow the 50-30-20 rule: 50% needs, 30% wants, 20% savings and debt payment.',
    icon: '/bee-props/calculator-tools.png'
  },
  {
    id: 'emergency-fund',
    type: 'do',
    title: 'Build an emergency fund',
    description: 'Save at least 3-6 months of expenses in a separate, easily accessible account for unexpected situations like job loss or medical emergencies.',
    details: 'An emergency fund protects you from financial stress and prevents you from falling into debt during tough times.',
    example: {
      type: 'success',
      title: 'Smart Strategy:',
      content: 'Start small - even ₹500 per month can build a substantial emergency fund over time. Keep it in a separate savings account that earns interest.'
    },
    tip: 'Automate your emergency fund contributions so you save consistently without thinking about it.',
    icon: '/bee-props/grow-and-save.png'
  },
  {
    id: 'investment-research',
    type: 'do',
    title: 'Research before investing',
    description: 'Never invest in schemes that promise guaranteed high returns. Always research the company, read reviews, and understand the risks involved.',
    details: 'Legitimate investments carry risk, and higher returns usually mean higher risk. Be skeptical of "guaranteed" returns.',
    example: {
      type: 'success',
      title: 'Due Diligence:',
      content: 'Check if investment companies are registered with SEBI. Read offer documents carefully and consult financial advisors for major investments.'
    },
    tip: 'Diversify your investments across different asset classes to reduce risk.',
    icon: '/bee-props/security.png'
  },
  {
    id: 'tax-planning',
    type: 'do',
    title: 'Plan your taxes in advance',
    description: 'Keep track of tax-saving investments and deductions throughout the year. Don\'t wait until the last minute to file your returns.',
    details: 'Proper tax planning can save you thousands of rupees and help you avoid penalties for late filing.',
    example: {
      type: 'success',
      title: 'Tax Strategy:',
      content: 'Use 80C deductions like PPF, ELSS, and life insurance. Keep all receipts organized and consider digital tax filing for faster processing.'
    },
    tip: 'Start tax planning at the beginning of the financial year for maximum benefits.',
    icon: '/bee-props/calculator-tools.png'
  },

  // DON'Ts
  {
    id: 'dont-share-otp',
    type: 'dont',
    title: 'Share OTP or PIN with anyone',
    description: 'Never share your OTP (One-Time Password) or PIN with anyone, including people claiming to be bank representatives. These are confidential and meant only for you.',
    details: 'Your OTP and PIN are like keys to your bank account. Sharing them is equivalent to handing over your money to strangers.',
    example: {
      type: 'warning',
      title: 'Common Scam:',
      content: 'Fraudsters call pretending to be from your bank and ask for OTP to "verify your account" or "update KYC details." Banks NEVER ask for OTP over phone calls.'
    },
    tip: 'OTP is like giving someone the key to your bank account. Keep it secret!',
    icon: '/bee-props/15.png'
  },
  {
    id: 'no-public-wifi',
    type: 'dont',
    title: 'Use public Wi-Fi for banking',
    description: 'Avoid accessing your bank accounts or making financial transactions over public Wi-Fi networks in cafes, airports, or shopping malls. These networks are often unsecured.',
    details: 'Public Wi-Fi networks are hunting grounds for cybercriminals who can easily intercept your sensitive financial data.',
    example: {
      type: 'warning',
      title: 'Risk:',
      content: 'Hackers can easily intercept data transmitted over public Wi-Fi, including your login credentials and transaction details. This puts your account at serious risk.'
    },
    tip: 'Use your mobile data or a secure VPN if you must access banking services while out.',
    icon: '/bee-props/25.png'
  },
  {
    id: 'no-urgent-response',
    type: 'dont',
    title: 'Respond to urgent-sounding messages without checking',
    description: 'Fraudsters create fake urgency to make you act without thinking. Messages like "Account will be closed in 2 hours" or "Immediate action required" are red flags.',
    details: 'Urgency is a classic manipulation tactic used by scammers to bypass your logical thinking and make you act impulsively.',
    example: {
      type: 'warning',
      title: 'Scammer Tactic:',
      content: '"Your account has been compromised! Click here within 10 minutes to secure it." Real banks give you proper time and alternative contact methods to resolve issues.'
    },
    tip: 'Take time to verify. If it\'s truly urgent, your bank will have multiple ways to reach you.',
    icon: '/bee-props/35.png'
  },
  {
    id: 'no-loan-guarantees',
    type: 'dont',
    title: 'Fall for instant loan approval scams',
    description: 'Be wary of messages promising instant loans without documentation or credit checks. Legitimate lenders always verify your creditworthiness.',
    details: 'Instant loan scams are designed to steal your personal information or charge upfront fees for loans that never materialize.',
    example: {
      type: 'warning',
      title: 'Red Flag:',
      content: '"Get ₹5 lakh loan in 5 minutes! No documents needed!" Real banks and NBFCs always require proper documentation and credit verification.'
    },
    tip: 'Only approach registered lenders and always read loan terms carefully before signing.',
    icon: '/bee-props/15.png'
  },
  {
    id: 'no-investment-pressure',
    type: 'dont',
    title: 'Invest under pressure or FOMO',
    description: 'Never invest because someone is pressuring you or because others are making money. Take time to research and understand any investment before committing.',
    details: 'Pressure tactics and fear of missing out (FOMO) are common strategies used to sell bad investments or fraudulent schemes.',
    example: {
      type: 'warning',
      title: 'Warning Sign:',
      content: '"This offer expires today! My friend made 50% returns in one month!" Legitimate investments don\'t require immediate decisions or promise unrealistic returns.'
    },
    tip: 'Sleep on major investment decisions and consult multiple sources before investing large amounts.',
    icon: '/bee-props/25.png'
  },
  {
    id: 'no-overspending',
    type: 'dont',
    title: 'Spend more than you earn',
    description: 'Avoid lifestyle inflation and spending beyond your means. Credit cards and loans might seem convenient, but they can lead to debt traps.',
    details: 'Living beyond your means is a path to financial stress and debt accumulation that can take years to recover from.',
    example: {
      type: 'warning',
      title: 'Debt Trap:',
      content: 'Using credit cards to fund lifestyle expenses without ability to pay full amount leads to high interest charges and debt spiral.'
    },
    tip: 'Follow the pay-yourself-first principle: save money before spending on wants.',
    icon: '/bee-props/35.png'
  },
  {
    id: 'no-insurance-skip',
    type: 'dont',
    title: 'Skip health and life insurance',
    description: 'Don\'t postpone buying adequate health and life insurance. Medical emergencies can drain your savings if you\'re not properly insured.',
    details: 'Insurance is not an expense but a crucial financial safety net that protects your family and savings from unexpected events.',
    example: {
      type: 'warning',
      title: 'Financial Risk:',
      content: 'A major medical emergency without insurance can cost ₹5-10 lakhs, wiping out years of savings in a few days.'
    },
    tip: 'Buy term life insurance when young for lower premiums and ensure health coverage for your entire family.',
    icon: '/bee-props/security.png'
  },
  {
    id: 'no-emotional-decisions',
    type: 'dont',
    title: 'Make financial decisions when emotional',
    description: 'Avoid making important financial decisions when you\'re stressed, angry, or overly excited. Emotions can cloud your judgment.',
    details: 'Emotional decision-making often leads to poor financial choices that you might regret later.',
    example: {
      type: 'warning',
      title: 'Common Mistake:',
      content: 'Panic selling stocks during market crashes or making large purchases when emotionally high often results in financial losses.'
    },
    tip: 'Take a 24-hour cooling-off period before making any major financial decision.',
    icon: '/bee-props/15.png'
  }
];

export default financialTips;
