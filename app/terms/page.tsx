import type { Metadata } from 'next'
import { LegalDoc, Section, List } from '@/components/LegalDoc'

export const metadata: Metadata = {
  title: 'Terms of Service | Even Pinah Services',
  description: 'Terms of Service for Whats2Eat, operated by Even Pinah Services.',
}

export default function TermsPage() {
  return (
    <LegalDoc title="Terms of Service" lastUpdated="August 23, 2026">
      <Section heading="1. Who we are and what this covers">
        <p>
          Even Pinah Services (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) operates Whats2Eat, a platform that lets food and
          retail vendors (&ldquo;Vendors&rdquo;) receive and fulfill orders from their customers (&ldquo;Customers&rdquo;) via WhatsApp
          and a linked web ordering page.
        </p>
        <p>
          Even Pinah Services also provides other, unrelated services (such as website and app design work). These
          Terms apply only to the Whats2Eat ordering platform; they do not govern any other service offered by Even
          Pinah Services.
        </p>
        <p>By placing an order through Whats2Eat, or by using Whats2Eat as a Vendor, you agree to these Terms.</p>
      </Section>

      <Section heading="2. What Whats2Eat is — and isn't">
        <p>
          Whats2Eat is a platform that connects Customers and Vendors and facilitates ordering, payment, and
          order-status communication. We are not the seller of any food or product ordered through the platform,
          and we do not prepare, handle, or deliver any items.
        </p>
        <List
          items={[
            <>
              <strong>Vendors</strong> are solely responsible for the accuracy of their menu, pricing, stock levels,
              food safety, preparation, quality, and fulfillment of orders.
            </>,
            <>
              <strong>Customers</strong> are placing an order directly with the Vendor; the contract of sale is
              between the Customer and the Vendor, not with Even Pinah Services.
            </>,
          ]}
        />
      </Section>

      <Section heading="3. Orders">
        <List
          items={[
            'An order is submitted through the Whats2Eat ordering page and is not final until the Vendor accepts it.',
            'Vendors may decline an order (for example, if an item is unavailable or the Vendor cannot fulfill it at that time).',
            'Once an order is accepted, changes are handled directly with the Vendor and are not guaranteed.',
          ]}
        />
      </Section>

      <Section heading="4. Payment">
        <List
          items={[
            'Payment is collected through Whats2Eat at the time an order is accepted by the Vendor, using a third-party payment processor.',
            'If a Vendor declines an order, no charge is made.',
            'Refunds for accepted orders (for example, due to a Vendor being unable to complete an order) are handled on a case-by-case basis between the Customer, the Vendor, and Even Pinah Services.',
          ]}
        />
      </Section>

      <Section heading="5. WhatsApp communication">
        <p>
          By placing an order, you agree to receive order-related messages via WhatsApp (such as order confirmations
          and status updates) from Even Pinah Services on behalf of the Vendor. These are transactional messages
          necessary to fulfill your order.
        </p>
      </Section>

      <Section heading="6. Vendor responsibilities">
        <p>Vendors using Whats2Eat agree to:</p>
        <List
          items={[
            'Provide accurate menu, pricing, and stock information',
            'Fulfill accepted orders in a timely and professional manner',
            'Comply with applicable food safety, business licensing, and consumer protection laws',
            'Not use the platform for any unlawful purpose',
          ]}
        />
      </Section>

      <Section heading="7. Limitation of liability">
        <p>
          Even Pinah Services provides the Whats2Eat platform on an &ldquo;as is&rdquo; basis. To the extent
          permitted by law, we are not liable for the quality, safety, timeliness, or accuracy of any Vendor&apos;s
          products or service, or for any dispute between a Customer and a Vendor. Our role is limited to providing
          the technology that connects the two parties.
        </p>
      </Section>

      <Section heading="8. Changes to these Terms">
        <p>
          We may update these Terms from time to time. Material changes will be reflected by updating the &ldquo;Last
          updated&rdquo; date above.
        </p>
      </Section>

      <Section heading="9. Governing law">
        <p>
          These Terms are governed by the laws of the State of Israel, without regard to conflict-of-law principles.
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
