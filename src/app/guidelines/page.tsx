// src/app/guidelines/page.tsx
export const metadata = {
  title: 'Community Guidelines - ShiftScope',
  description: 'ShiftScope community guidelines for creating helpful, honest reviews and building a supportive community.',
}

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Community Guidelines
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: June 24th 2025
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 prose prose-gray max-w-none">
          
          {/* Mission */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p>
            ShiftScope exists to help restaurant workers make informed decisions about where to work. Every review, comment, and interaction should support this mission of transparency, respect, and community building.
          </p>

          {/* Core Principles */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Core Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">🔍 1. Honesty First</h3>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                <li>Share real experiences: Only review places where you've actually worked</li>
                <li>Be accurate: Stick to facts about your experience</li>
                <li>Update when things change: Consider updating your review if conditions improve or worsen</li>
                <li>Admit uncertainty: If you're not sure about something, say so</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">🤝 2. Respect Everyone</h3>
              <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                <li>Focus on systems, not individuals: Critique management styles, not specific people</li>
                <li>No personal attacks: Avoid naming or attacking individual managers, coworkers, or customers</li>
                <li>Professional tone: You can be critical while remaining constructive</li>
                <li>Cultural sensitivity: Respect diverse backgrounds and experiences</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3">🛡️ 3. Protect Privacy</h3>
              <ul className="list-disc list-inside text-purple-800 text-sm space-y-1">
                <li>Maintain anonymity: Don't reveal your identity or others'</li>
                <li>No personal details: Avoid sharing contact information, addresses, or identifying details</li>
                <li>Respect confidentiality: Don't share proprietary information (recipes, financial data, etc.)</li>
                <li>Safety first: If something could put you or others at risk, report it privately</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-3">🌟 4. Build Community</h3>
              <ul className="list-disc list-inside text-orange-800 text-sm space-y-1">
                <li>Help other workers: Share information that helps people make good decisions</li>
                <li>Support each other: Offer encouragement and practical advice</li>
                <li>Welcome newcomers: Help new users understand how the platform works</li>
                <li>Report problems: Help us maintain a safe, helpful community</li>
              </ul>
            </div>
          </div>

          {/* Great Reviews */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Makes a Great Review</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Helpful Information</h3>
          <p className="text-gray-700 mb-2">Great reviews include details about:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li><strong>Management style:</strong> Are they supportive? Micromanaging? Fair?</li>
              <li><strong>Work environment:</strong> Kitchen culture, front-of-house dynamics, stress levels</li>
              <li><strong>Pay and tips:</strong> How tips are handled, wage practices, payment reliability</li>
            </ul>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li><strong>Scheduling:</strong> Flexibility, advance notice, consistency, time-off policies</li>
              <li><strong>Growth opportunities:</strong> Training, advancement, skill development</li>
              <li><strong>Work-life balance:</strong> Hours, breaks, overtime, burnout factors</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Review Structure Tips</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li><strong>Start with the basics:</strong> Your role, how long you worked there, general experience</li>
            <li><strong>Be specific:</strong> "Management doesn't communicate well" is better than "management sucks"</li>
            <li><strong>Include positives:</strong> Even difficult workplaces usually have some bright spots</li>
            <li><strong>Consider your audience:</strong> What would you want to know before taking this job?</li>
            <li><strong>Rate thoughtfully:</strong> Use the star ratings to reflect your honest assessment</li>
          </ul>

          {/* Content Standards */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Content Standards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">✅ Encouraged Content</h3>
              <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                <li>Workplace condition details: Management quality, scheduling practices, tip policies</li>
                <li>Constructive criticism: Specific issues with suggestions for improvement</li>
                <li>Positive experiences: What makes a workplace great for employees</li>
                <li>Industry insights: General advice about restaurant work</li>
                <li>Support for fellow workers: Encouragement and practical tips</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">❌ Prohibited Content</h3>
              <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                <li>Personal attacks: Naming individuals or making personal insults</li>
                <li>False information: Reviews of places you haven't worked or inaccurate claims</li>
                <li>Confidential information: Trade secrets, proprietary recipes, financial data</li>
                <li>Discriminatory language: Hate speech, slurs, or discriminatory comments</li>
                <li>Threats or harassment: Any content that could be seen as threatening</li>
                <li>Spam or promotion: Irrelevant content, excessive posting, or advertising</li>
                <li>Legal accusations: Claims of wage theft or other legal violations (report these to appropriate authorities)</li>
              </ul>
            </div>
          </div>

          {/* Examples */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Examples by Topic</h2>
          
          <div className="space-y-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Management and Leadership</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-900 mb-1">✅ Good Example:</p>
                  <p className="text-green-800">"Management rarely gives advance notice for schedule changes, making it hard to plan personal life."</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-900 mb-1">❌ Avoid:</p>
                  <p className="text-red-800">"Manager John is an incompetent jerk who doesn't care about employees."</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Pay and Compensation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded">
                  <p className="font-medium text-green-900 mb-1">✅ Good Example:</p>
                  <p className="text-green-800">"Tips are pooled equally among all servers, which creates a team atmosphere but means you can't control your individual earnings."</p>
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-900 mb-1">❌ Avoid:</p>
                  <p className="text-red-800">Specific dollar amounts that could violate confidentiality</p>
                </div>
              </div>
            </div>
          </div>

          {/* For Restaurant Owners */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Restaurant Owners and Managers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">If You Want to Respond</h3>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                <li>Stay professional: Thank reviewers for feedback, even if critical</li>
                <li>Address the issues: Focus on how you're improving conditions</li>
                <li>Don't get defensive: Use criticism as an opportunity to demonstrate your values</li>
                <li>Respect anonymity: Never try to identify reviewers or retaliate</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">What Not to Do</h3>
              <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                <li>Don't demand removal: Honest reviews, even negative ones, should stay up</li>
                <li>Don't threaten legal action: This discourages honest feedback</li>
                <li>Don't post fake reviews: We actively monitor for suspicious activity</li>
                <li>Don't retaliate: Taking action against employees for reviews violates our values</li>
              </ul>
            </div>
          </div>

          {/* Reporting */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reporting and Moderation</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">When to Report Content</h3>
          <p className="text-gray-700 mb-2">Report reviews or comments that:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Violate these guidelines</li>
            <li>Contain false or misleading information</li>
            <li>Include personal attacks or harassment</li>
            <li>Threaten safety or privacy</li>
            <li>Seem fake or promotional</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">How We Handle Reports</h3>
          <ol className="list-decimal list-inside text-gray-700 mb-4">
            <li><strong>Review:</strong> Our moderation team (including industry veterans) reviews all reports</li>
            <li><strong>Context matters:</strong> We consider industry norms and specific circumstances</li>
            <li><strong>Fair process:</strong> Users can appeal moderation decisions</li>
            <li><strong>Education first:</strong> We often work with users to improve content rather than just removing it</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Consequences for Violations</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li><strong>First violation:</strong> Usually a warning and request to edit content</li>
            <li><strong>Repeated violations:</strong> Temporary suspension or content restrictions</li>
            <li><strong>Severe violations:</strong> Account termination for threats, harassment, or fraudulent activity</li>
          </ul>

          {/* Contact */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions and Support</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Content questions: What should I include in my review?</li>
                <li>Technical issues: Problems with the platform or your account</li>
              </ul>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Safety concerns: Worried about retaliation or privacy</li>
                <li>General support: Any other questions or concerns</li>
              </ul>
            </div>
            <p className="text-blue-600 font-medium mt-3">Contact us: help@shiftscope.nyc</p>
          </div>

          {/* Final Message */}
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Remember</h3>
            <p className="mb-4">
              <strong>You are not alone.</strong> The restaurant industry can be challenging, but together we can make it more transparent, fair, and supportive for everyone. Your voice matters, your experience counts, and your participation helps build a better future for restaurant workers.
            </p>
            <div className="bg-gray-800 rounded p-4">
              <p className="text-center font-medium">
                When in doubt, ask: "Does this help restaurant workers make better decisions and build a stronger community?"
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}