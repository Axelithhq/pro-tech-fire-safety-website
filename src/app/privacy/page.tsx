import Container from '@/components/ui/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <Container className="max-w-3xl">
        <h1 className="font-heading text-4xl font-bold text-navy-900 md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-navy-400">Last updated: January 2026</p>
        <div className="mt-10 space-y-6 text-navy-500 leading-relaxed">
          <p>
            Pro-Tech Fire & Safety respects your privacy. This policy describes how
            we collect, use, and protect your personal information.
          </p>
          <h2 className="text-lg font-bold text-navy-900">1. Information We Collect</h2>
          <p>
            We collect information you provide directly, such as your name, email
            address, phone number, and company details when you fill out forms on
            our website.
          </p>
          <h2 className="text-lg font-bold text-navy-900">2. How We Use Your Information</h2>
          <p>
            We use your information to respond to inquiries, provide services,
            improve our website, and communicate with you about our products and
            services.
          </p>
          <h2 className="text-lg font-bold text-navy-900">3. Data Protection</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, or disclosure.
          </p>
          <h2 className="text-lg font-bold text-navy-900">4. Contact</h2>
          <p>
            For privacy-related inquiries, please contact us at{' '}
            <a href="mailto:privacy@protechfire.com" className="text-gold-600 hover:underline">
              privacy@protechfire.com
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  )
}
