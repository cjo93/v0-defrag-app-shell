export const metadata = {
  title: 'Terms | Defrag',
  description: 'Terms for using Defrag.',
}

const sections = [
  {
    title: 'Using Defrag',
    body: [
      'Defrag is designed to help people understand difficult interactions more clearly. It is a product for reflection, interpretation, and communication support.',
      'Defrag is not therapy, medical care, legal advice, crisis support, or emergency response. You should not rely on Defrag as a substitute for licensed professional care or legal counsel.',
    ],
  },
  {
    title: 'Accounts',
    body: [
      'You are responsible for maintaining the confidentiality of your account and for the activity that occurs under it.',
      'You must provide accurate information when creating an account and keep that information reasonably up to date.',
    ],
  },
  {
    title: 'Plans and billing',
    body: [
      'Paid plans are billed according to the pricing and billing terms presented at the time of purchase. By subscribing, you authorize recurring charges for the selected plan until you cancel, if recurring billing applies to that plan.',
      'You can cancel future renewal at any time before the next billing cycle. Unless otherwise stated at checkout, charges already processed are non-refundable. If a refund or credit is issued, it is at Defrag’s discretion.',
      'If you have questions about billing, plan changes, or account access, contact info@defrag.app.',
    ],
  },
  {
    title: 'Acceptable use',
    body: [
      'You may not use Defrag to violate the law, infringe others’ rights, attempt unauthorized access, disrupt the service, or submit content you do not have the right to use.',
      'You may not use Defrag to generate or distribute harmful, abusive, fraudulent, or illegal content.',
    ],
  },
  {
    title: 'Termination and suspension',
    body: [
      'Defrag may suspend or terminate access if these terms are violated, if required by law, or if necessary to protect the service, users, or third parties.',
      'We may also discontinue or modify parts of the service over time. Where reasonably possible, material changes will be reflected in the product or on this page.',
    ],
  },
  {
    title: 'Governing law and jurisdiction',
    body: [
      'These terms are governed by the laws of the State of California, without regard to conflict-of-law principles.',
      'Any dispute arising from these terms or the use of Defrag will be brought in the state or federal courts located in San Francisco, California, unless applicable law requires otherwise.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions about these terms, billing, or account-related issues, contact info@defrag.app.',
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0b0c0e] text-stone-100">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-stone-400">
            Terms
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Clear terms for a product built for personal situations.
          </h1>
          <p className="mt-5 text-base leading-7 text-stone-300 sm:text-lg">
            Please read these terms carefully before using Defrag.
          </p>
        </div>

        <div className="mt-12 space-y-6 sm:mt-14">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/4 p-6 sm:p-8"
            >
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-stone-300 sm:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
