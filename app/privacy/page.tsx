import type { Metadata } from 'next'
import { LegalDoc, Section, List } from '@/components/LegalDoc'

export const metadata: Metadata = {
  title: 'Privacy Policy | Even Pinah Services',
  description: 'Privacy Policy for Whats2Eat, operated by Even Pinah Services.',
}

export default function PrivacyPage() {
  return (
    <LegalDoc title="Privacy Policy" lastUpdated="August 23, 2026">
      <Section heading="1. Who we are">
        <p>
          Even Pinah Services (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) operates Whats2Eat, a platform that lets food and
          retail vendors receive and fulfill orders from their customers via WhatsApp and a linked web ordering
          page. This policy explains what data we collect, how we use it, and how it is shared — including data
          processed through our integration with the Meta / WhatsApp Business Platform.
        </p>
        <p>
          Even Pinah Services also provides other, unrelated services (such as website and app design work). This
          policy applies only to the Whats2Eat ordering platform and its use of the Meta / WhatsApp Business
          Platform; it does not govern any other service offered by Even Pinah Services.
        </p>
        <p>This policy applies to:</p>
        <List
          items={[
            "Customers placing orders through a vendor's Whats2Eat ordering page or WhatsApp conversation",
            "Vendors (restaurants and other businesses) using Whats2Eat to manage their menu, orders, and WhatsApp Business Account through our platform",
            'Vendor staff using our order-management applications',
          ]}
        />
      </Section>

      <Section heading="2. Data we collect">
        <div>
          <h3 className="font-semibold text-primary-dark mb-1">From customers</h3>
          <List
            items={[
              'Name and phone number, provided when placing an order',
              'Order details: items selected, quantities, prices, order notes',
              'Delivery or pickup information, where applicable',
              'Payment information: we use a third-party payment processor to tokenize and process card payments; we do not store full card numbers on our own servers',
              'WhatsApp message content and metadata exchanged with a vendor through our platform (e.g. order confirmations, status updates), to the extent required to operate the service',
            ]}
          />
        </div>
        <div>
          <h3 className="font-semibold text-primary-dark mb-1">From vendors</h3>
          <List
            items={[
              'Business name, contact details, and business registration information required for WhatsApp Business Account setup',
              'Menu, pricing, and stock/inventory data entered into our vendor portal',
              'Order history and transaction records',
              "WhatsApp Business Account (WABA) identifiers and phone number information, as required to send and receive messages on the vendor's behalf via the Meta / WhatsApp Business Platform API",
            ]}
          />
        </div>
        <div>
          <h3 className="font-semibold text-primary-dark mb-1">Automatically collected</h3>
          <List
            items={[
              'Basic technical data (device type, IP address, timestamps) for security, fraud prevention, and service reliability',
            ]}
          />
        </div>
      </Section>

      <Section heading="3. How we use data">
        <p>We use collected data to:</p>
        <List
          items={[
            'Process and fulfill orders between customers and vendors',
            'Send order status updates and transactional messages via WhatsApp',
            'Enable vendors to manage their menu, stock, pricing, and incoming orders',
            'Provision and manage WhatsApp Business Accounts on behalf of vendors, as a Meta Tech Provider',
            'Process payments through our payment processing partner',
            'Detect and prevent fraud, abuse, and technical issues',
            'Comply with legal obligations',
          ]}
        />
        <p>
          We do not use customer or vendor data to train third-party AI models, and we do not sell personal data to
          third parties.
        </p>
      </Section>

      <Section heading="4. How data is shared">
        <p>We share data only as necessary to operate the service:</p>
        <List
          items={[
            <>
              <strong>Meta / WhatsApp Business Platform</strong> — to send and receive WhatsApp messages, manage
              WhatsApp Business Accounts, and operate catalog and messaging features on behalf of vendors, in
              accordance with{' '}
              <a
                href="https://www.whatsapp.com/legal/business-data-processing-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary-accent hover:underline"
              >
                Meta&apos;s Platform Terms and WhatsApp Business Data Processing Terms
              </a>
              .
            </>,
            <>
              <strong>Payment processor(s)</strong> (e.g. Tranzila, Bit) — to tokenize and process payments. We do
              not store full payment card details ourselves.
            </>,
            <>
              <strong>The relevant vendor</strong> — order and contact details necessary for that vendor to fulfill
              a customer&apos;s order.
            </>,
            <>
              <strong>Service providers</strong> who support our infrastructure (e.g. hosting, printing/notification
              services), under contractual confidentiality obligations.
            </>,
            <>
              <strong>Legal authorities</strong>, where required by law.
            </>,
          ]}
        />
        <p>We do not share data between unrelated vendors. A vendor only receives data relating to their own customers and orders.</p>
      </Section>

      <Section heading="5. Data retention">
        <p>
          We retain order and account data for as long as necessary to provide the service, meet legal and tax
          obligations, and resolve disputes. Vendors may request deletion of their account data; customers may
          request deletion of their personal data, subject to records we are legally required to retain (e.g.
          transaction records).
        </p>
      </Section>

      <Section heading="6. Your rights, including deletion">
        <p>
          All users — customers and vendors, regardless of location — may request that we delete the personal data
          we have collected about them, at any time and free of charge. Depending on your location, you may also
          have the right to access, correct, or export your personal data.
        </p>
        <p>
          To request deletion or exercise any other right, contact us at the email below. We will act on your
          request promptly, except where we are legally required to retain certain records (for example, completed
          transaction records for tax purposes); in that case we will tell you what, if anything, we are unable to
          delete and why.
        </p>
      </Section>

      <Section heading="7. Data security">
        <p>
          We use reasonable technical and organizational measures to protect personal data, including encrypted
          transmission of payment information and access controls on vendor and order data. No system is completely
          secure, and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section heading="8. Children's privacy">
        <p>Our service is not directed to children, and we do not knowingly collect personal data from children.</p>
      </Section>

      <Section heading="9. Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be reflected by updating the &ldquo;Last
          updated&rdquo; date above.
        </p>
      </Section>

      <Section heading="10. Contact us">
        <p>
          Even Pinah Services
          <br />
          Brazil St. 101, Jerusalem 9678422, Israel
          <br />
          Email:{' '}
          <a href="mailto:even.pinah.services@gmail.com" className="text-secondary-accent hover:underline">
            even.pinah.services@gmail.com
          </a>
        </p>
      </Section>
    </LegalDoc>
  )
}
