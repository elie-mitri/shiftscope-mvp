// src/app/terms/page.tsx
export const metadata = {
  title: 'Terms of Service - ShiftScope',
  description: 'ShiftScope terms of service outlining platform rules, acceptable use, and user responsibilities.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: June 24th 2025
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 prose prose-gray max-w-none">
          
          {/* Agreement */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
          <p>
            By using ShiftScope ("the Service"), you agree to these Terms of Service ("Terms"). If you don't agree to these Terms, please don't use ShiftScope.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-6">
            <p className="font-semibold text-green-900 mb-2">Simple Version</p>
            <p className="text-green-800 text-sm">
              We want to provide a safe platform for restaurant workers to share honest reviews. Be respectful, be honest, and help build a better industry.
            </p>
          </div>

          {/* Eligibility */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who Can Use ShiftScope</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Eligibility</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>You must be at least 18 years old</li>
            <li>You must have worked in the restaurant/hospitality industry</li>
            <li>You must provide accurate information during registration</li>
            <li>You cannot be prohibited from using the service under applicable law</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Requirements</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>One account per person</li>
            <li>You're responsible for keeping your account secure</li>
            <li>You must notify us of any unauthorized use</li>
            <li>We may terminate accounts that violate these Terms</li>
          </ul>

          {/* Acceptable Use */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">✅ What You Can Do</h3>
              <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                <li>Submit honest reviews based on your actual work experience</li>
                <li>Browse reviews to make informed job decisions</li>
                <li>Share constructive feedback about workplace conditions</li>
                <li>Report inappropriate content or behavior</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">❌ What You Cannot Do</h3>
              <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                <li>Post false information or fake reviews</li>
                <li>Identify individuals by name</li>
                <li>Share personal information</li>
                <li>Harass or threaten others</li>
                <li>Spam or post promotional content</li>
                <li>Impersonate others</li>
                <li>Violate laws</li>
              </ul>
            </div>
          </div>

          {/* Review Guidelines */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Review Guidelines</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Standards</h3>
          <p className="text-gray-700 mb-2">Reviews should be:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><strong>Based on personal experience:</strong> Only review places you've actually worked</li>
            <li><strong>Focused on workplace conditions:</strong> Management, pay, scheduling, work environment</li>
            <li><strong>Constructive:</strong> Help other workers make informed decisions</li>
            <li><strong>Recent and relevant:</strong> Focus on current or recent working conditions</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Prohibited Content</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Defamatory statements or personal attacks</li>
            <li>Confidential business information (recipes, financial data, etc.)</li>
            <li>Discriminatory language based on race, gender, religion, etc.</li>
            <li>Sexual content or inappropriate personal details</li>
            <li>Legal advice or claims about wage theft (direct users to proper authorities)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Ownership</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>You retain ownership of your reviews</li>
            <li>You grant ShiftScope permission to display your content</li>
            <li>You can edit or delete your reviews at any time</li>
            <li>ShiftScope may moderate content for quality and safety</li>
          </ul>

          {/* Platform Rules */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Platform Rules</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Moderation</h3>
          <p className="text-gray-700 mb-2">We reserve the right to:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Remove content that violates these Terms</li>
            <li>Suspend or terminate accounts for repeated violations</li>
            <li>Investigate suspicious activity or abuse reports</li>
            <li>Cooperate with law enforcement when legally required</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">No Guarantee of Accuracy</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Reviews represent individual opinions and experiences</li>
            <li>ShiftScope doesn't verify the accuracy of all reviews</li>
            <li>Use reviews as one factor in your decision-making</li>
            <li>We encourage users to report false or misleading content</li>
          </ul>

          {/* Business Owners */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Business Owner Participation</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Claiming Your Business</h3>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Restaurant owners may claim their business page</li>
            <li>Must verify ownership through our process</li>
            <li>Can respond to reviews professionally</li>
            <li>Cannot demand removal of honest reviews</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Owner Responsibilities</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Responses must be professional and constructive</li>
            <li>Cannot threaten, intimidate, or retaliate against reviewers</li>
            <li>Must respect worker anonymity</li>
            <li>Cannot post fake positive reviews</li>
          </ul>

          {/* Termination */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Your Right to Terminate</h3>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>You can delete your account at any time</li>
                <li>Your reviews may remain anonymous after account deletion</li>
                <li>Contact us if you want all content removed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Right to Terminate</h3>
              <p className="text-gray-700 text-sm mb-2">We may suspend or terminate accounts for:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>Violating these Terms or our Community Guidelines</li>
                <li>Posting false, misleading, or harmful content</li>
                <li>Threatening or harassing other users</li>
                <li>Legal or regulatory requirements</li>
              </ul>
            </div>
          </div>

          {/* Legal */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Matters</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Governing Law</h3>
          <p className="text-gray-700 mb-4">These Terms are governed by New York State law.</p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Dispute Resolution</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>We encourage resolving disputes through direct communication</li>
            <li>For legal disputes, you agree to binding arbitration when possible</li>
            <li>Some claims may be resolved in New York State courts</li>
          </ul>

          {/* Contact */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">General Questions</h3>
              <p className="text-blue-600">hello@shiftscope.nyc</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Report Violations</h3>
              <p className="text-blue-600">report@shiftscope.nyc</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Legal Matters</h3>
              <p className="text-blue-600">legal@shiftscope.nyc</p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Community Guidelines Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-2">Remember Our Mission</p>
                <p className="text-gray-300">ShiftScope exists to help restaurant workers make informed decisions and build a more transparent industry.</p>
              </div>
              <div className="space-y-2">
                <p><strong>Be Honest:</strong> Share your real experience to help other workers.</p>
                <p><strong>Be Respectful:</strong> Focus on workplace conditions, not personal attacks.</p>
                <p><strong>Be Safe:</strong> Protect your anonymity and respect others' privacy.</p>
                <p><strong>Be Constructive:</strong> Help build a better industry for everyone.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}