"use client";

export default function PaymentOptions() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-600">Payment Options</h1>
      <p className="text-center text-gray-600 mt-2">
        Choose from multiple secure payment options for a seamless checkout experience.
      </p>

      {/* Payment Methods Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">Available Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Credit/Debit Cards */}
          <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold">💳 Credit/Debit Cards</h3>
            <p className="text-gray-700 mt-2">
              We accept Visa, MasterCard, American Express, and Rupay. Secure payments with OTP verification.
            </p>
          </div>

          {/* UPI Payments */}
          <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold">📲 UPI Payments</h3>
            <p className="text-gray-700 mt-2">
              Pay easily using Google Pay, PhonePe, Paytm, and other UPI apps. No extra charges.
            </p>
          </div>

          {/* Net Banking */}
          <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold">🏦 Net Banking</h3>
            <p className="text-gray-700 mt-2">
              We support all major banks for net banking transactions.
            </p>
          </div>

          {/* EMI & Pay Later */}
          <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold">💰 EMI & Pay Later</h3>
            <p className="text-gray-700 mt-2">
              Avail no-cost EMI and "Buy Now, Pay Later" options from select banks.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Security */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">🔒 Payment Security</h2>
        <p className="text-gray-700 mt-2">
          Your payment details are encrypted and processed securely. We use **SSL encryption** and comply with **PCI DSS security standards**.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">❓ Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Is my payment information secure?</summary>
            <p className="mt-2 text-gray-700">
              Yes, we use **SSL encryption** and **secure payment gateways** for your safety.
            </p>
          </details>

          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Which cards do you accept?</summary>
            <p className="mt-2 text-gray-700">
              We accept **Visa, MasterCard, American Express, Rupay, and Discover**.
            </p>
          </details>

          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Can I use UPI for payments?</summary>
            <p className="mt-2 text-gray-700">
              Yes! We support **Google Pay, PhonePe, Paytm, and other UPI apps**.
            </p>
          </details>

          <details className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <summary className="font-semibold cursor-pointer">Do you offer EMI options?</summary>
            <p className="mt-2 text-gray-700">
              Yes, you can choose **no-cost EMI** and **pay later** options at checkout.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
