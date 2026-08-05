import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-navy-900 md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: January 2026</p>
        <div className="mt-10 space-y-6 text-navy-500 leading-relaxed">
          <p>
            These Terms of Service govern your use of the Pro-Tech Fire & Safety
            website and services. By accessing or using our website, you agree to
            be bound by these terms.
          </p>
          <h2 className="text-lg font-bold text-navy-900">1. Services</h2>
          <p>
            Pro-Tech Fire & Safety provides fire protection engineering services
            including but not limited to design, installation, maintenance, and
            consulting for fire detection, suppression, and safety systems.
          </p>
          <h2 className="text-lg font-bold text-navy-900">2. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images,
            and software, is the property of Pro-Tech Fire & Safety and is
            protected by applicable intellectual property laws.
          </p>
          <h2 className="text-lg font-bold text-navy-900">3. Limitation of Liability</h2>
          <p>
            Pro-Tech Fire & Safety shall not be liable for any indirect,
            incidental, special, or consequential damages arising from the use or
            inability to use our services or website.
          </p>
          <h2 className="text-lg font-bold text-navy-900">4. Contact</h2>
          <p>
            For questions about these terms, please contact us at{' '}
            <a href="mailto:info@protechfire.com" className="text-gold-600 hover:underline">
              info@protechfire.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  )
}
