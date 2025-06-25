// src/app/privacy/page.tsx
export const metadata = {
  title: 'Privacy Policy - ShiftScope',
  description: 'ShiftScope privacy policy explaining how we protect worker anonymity and handle personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: June 24th 2025
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 prose prose-gray max-w-none">
          
          {/* Introduction */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p>
            ShiftScope ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our restaurant worker review platform.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6">
            <p className="font-semibold text-blue-900 mb-2">Our Core Promise</p>
            <p className="text-blue-800 text-sm">
              We prioritize worker anonymity and will never share your personal information with employers or third parties without your explicit consent.
            </p>
          </div>

          {/* Information We Collect */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Information</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Email address (for account creation and communication)</li>
            <li>Anonymous display name (generated automatically or chosen by you)</li>
            <li>Password (encrypted and stored securely)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Information</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Star ratings and written reviews</li>
            <li>Employment role (Server, Cook, Bartender, etc.)</li>
            <li>Employment status and duration (optional)</li>
            <li>Restaurant workplace information</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>IP address (for security and moderation purposes)</li>
            <li>Browser type and device information</li>
            <li>Usage analytics (pages visited, time spent)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Information We DO NOT Collect</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Real names (unless voluntarily provided)</li>
            <li>Phone numbers or addresses</li>
            <li>Social security numbers or government IDs</li>
          </ul>

          {/* How We Use Information */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Core Platform Functions</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Display anonymous reviews to help other workers</li>
            <li>Authenticate your account and prevent fraud</li>
            <li>Moderate content for quality and safety</li>
            <li>Improve our platform based on usage patterns</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Communications</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Send account-related notifications (password resets, etc.)</li>
            <li>Notify you of responses to your reviews (if enabled)</li>
            <li>Share platform updates and important announcements</li>
          </ul>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-6">
            <h3 className="font-semibold text-red-900 mb-2">What We Will NEVER Do</h3>
            <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
              <li>Share your identity with restaurant owners or employers</li>
              <li>Sell your personal information to third parties</li>
              <li>Use your information for targeted advertising by employers</li>
              <li>Require real names for review submission</li>
            </ul>
          </div>

          {/* Information Sharing */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Public Information</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Anonymous reviews and ratings are publicly visible</li>
            <li>Display names are public but not linked to your real identity</li>
            <li>Aggregate statistics may be shared (e.g., "average rating for tipping practices")</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Sharing</h3>
          <p className="text-gray-700 mb-2">We may share information only in these specific circumstances:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Legal Requirements:</strong> If required by law enforcement or court order</li>
            <li><strong>Safety Concerns:</strong> To prevent harm to individuals or investigate abuse</li>
            <li><strong>Business Transfer:</strong> If ShiftScope is acquired (users will be notified)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Never Shared</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Email addresses with restaurant owners</li>
            <li>Real names or personal identifiers</li>
            <li>Individual user activity or browsing patterns</li>
          </ul>

          {/* Data Security */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Protection Measures</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>All data encrypted in transit and at rest</li>
            <li>Secure authentication system with password protection</li>
            <li>Regular security audits and monitoring</li>
            <li>Limited access to personal data by staff</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Security Role</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Use a strong, unique password</li>
            <li>Don't share your account credentials</li>
            <li>Log out from shared computers</li>
            <li>Report suspicious activity immediately</li>
          </ul>

          {/* Your Rights */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Control</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Access:</strong> View all information we have about you</li>
            <li><strong>Correction:</strong> Update your account information anytime</li>
            <li><strong>Deletion:</strong> Delete your account and associated reviews</li>
            <li><strong>Anonymity:</strong> Your reviews remain anonymous even if you delete your account</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Management</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Edit or delete your reviews at any time</li>
            <li>Choose your level of detail in reviews</li>
            <li>Opt out of email notifications</li>
            <li>Report inappropriate content</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Portability</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Download a copy of all your data</li>
            <li>Export your reviews in a standard format</li>
          </ul>

          {/* Contact */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy Questions</h3>
              <p className="text-blue-600">privacy@shiftscope.nyc</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Requests</h3>
              <p className="text-blue-600">data@shiftscope.nyc</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Security Issues</h3>
              <p className="text-blue-600">security@shiftscope.nyc</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <p className="text-blue-800 text-sm font-medium">
              Remember: Your anonymity is our priority. We built ShiftScope to empower workers, not to expose them. 
              If you have any concerns about privacy or security, please don't hesitate to contact us.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}