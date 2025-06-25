// src/app/about/page.tsx
import Link from 'next/link'

export const metadata = {
  title: 'About ShiftScope - Real Reviews from Real Restaurant Workers',
  description: 'ShiftScope was created by restaurant workers, for restaurant workers. Anonymous reviews of NYC restaurants focusing on management, pay, work-life balance, and scheduling.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Real reviews from real workers.<br />
            <span className="text-blue-600">For a better restaurant industry.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ShiftScope was created by restaurant workers, for restaurant workers. 
            We believe every person deserves to know what they're getting into before they take a job.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why ShiftScope Exists</h2>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              The restaurant industry employs over 300,000 people in NYC alone, but finding honest 
              information about what it's actually like to work at a restaurant has always been nearly impossible. Until now.
            </p>
            
            <p className="text-gray-700 mb-6">
              ShiftScope was created by restaurant workers, for restaurant workers. We believe every person 
              deserves to know what they're getting into before they take a job – whether that's the real 
              tipping policy, how management treats staff, or if you'll actually get the schedule flexibility 
              they promised in the interview.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-700">
              ShiftScope started when two friends – one a veteran of NYC's restaurant scene, the other a 
              developer – got tired of watching good people walk into bad work situations. Too many talented 
              servers, cooks, and bartenders were getting burned by restaurants with toxic management, unfair 
              tip policies, or impossible scheduling demands.
            </p>
            <p className="text-gray-700 mt-4">
              We realized that while customers can read hundreds of reviews before choosing where to eat, 
              workers had no equivalent resource for choosing where to work. So we built one.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Anonymous & Safe</h3>
              <p className="text-sm text-gray-600">
                Your identity is protected. We use anonymous display names and never share personal information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Worker-Focused</h3>
              <p className="text-sm text-gray-600">
                We ask about management quality, pay & tipping, work-life balance, and scheduling fairness.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Data</h3>
              <p className="text-sm text-gray-600">
                Integrated with Google Places to ensure every NYC restaurant can be reviewed.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">What We Review</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                <strong>Management Quality:</strong> Are they respectful? Do they have your back?
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                <strong>Pay & Tipping:</strong> Real talk about compensation and tip pools
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                <strong>Work-Life Balance:</strong> Can you actually get time off?
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                <strong>Scheduling:</strong> Last-minute changes? Predictable shifts?
              </li>
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🌞 Transparency First</h3>
              <p className="text-gray-700 text-sm mb-4">
                We believe sunlight is the best disinfectant. By making workplace conditions visible, 
                we help both workers make better choices and restaurants improve their culture.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">💪 Worker Empowerment</h3>
              <p className="text-gray-700 text-sm mb-4">
                This platform is by workers, for workers. We'll never charge workers to access reviews 
                or prioritize restaurant owners over the people who actually do the work.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🤝 Community Building</h3>
              <p className="text-gray-700 text-sm mb-4">
                Beyond reviews, we're building a community where restaurant workers can support each other, 
                share advice, and advocate for better working conditions.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✅ Authenticity Matters</h3>
              <p className="text-gray-700 text-sm mb-4">
                We have systems in place to verify that reviews come from real workers, while maintaining 
                complete anonymity. Quality information requires real experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">About the Founders</h2>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-4">
              <strong>[Industry Co-founder Name]</strong> has spent [X years] working in NYC restaurants, 
              from [roles/experience]. They've seen firsthand how information asymmetry hurts workers and 
              wanted to level the playing field.
            </p>
            
            <p className="text-gray-700 mb-4">
              <strong>[Developer Co-founder Name]</strong> is a [background] developer who believes 
              technology should serve working people. They've used AI-assisted development to build a 
              platform that prioritizes user experience and data security.
            </p>
            
            <p className="text-gray-700">
              Together, we're committed to building something that actually serves the restaurant community – 
              not just another tech platform extracting value from workers.
            </p>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Community Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Our Commitment to Quality</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  Reviews must be based on actual work experience
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  Personal attacks on individuals are not allowed
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  We focus on workplace conditions, not personal grievances
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                  Constructive feedback helps everyone improve
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Safety & Privacy</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                  All reviews are anonymous by default
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                  We never share personal information with employers
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                  Our moderation team includes industry veterans
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
                  Zero tolerance for doxxing or retaliation
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="bg-blue-50 rounded-lg border border-blue-200 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Vision</h2>
          
          <div className="prose prose-gray max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Beyond Reviews</h3>
            <p className="text-gray-700 mb-4">ShiftScope is just the beginning. We envision a future where:</p>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                Workers have access to real salary data and benefit information
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                Restaurants compete on workplace culture, not just wages
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                The industry becomes more transparent and accountable
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                Good employers are recognized and bad actors are held responsible
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">Growing Together</h3>
            <p className="text-gray-700">
              We're starting in NYC because that's where we know the scene best. But we plan to expand to 
              other cities where restaurant workers need better information and stronger community connections.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-900 rounded-lg p-6 sm:p-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Ready to Make a Difference?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white mb-8">
            <div>
              <h3 className="font-semibold mb-2">For Workers</h3>
              <p className="text-sm text-gray-300 mb-4">
                Share your experience and help fellow restaurant workers make informed decisions.
              </p>
              <Link
                href="/reviews/new"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Write a Review
              </Link>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">For Restaurant Owners</h3>
              <p className="text-sm text-gray-300 mb-4">
                Claim your business page and engage constructively with feedback.
              </p>
              <Link
                href="/restaurants"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Find Your Restaurant
              </Link>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">For Everyone</h3>
              <p className="text-sm text-gray-300 mb-4">
                Help us build a better restaurant industry, one review at a time.
              </p>
              <Link
                href="/restaurants"
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Browse Reviews
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-lg shadow-sm border p-6 sm:p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">General Questions</h3>
              <p className="text-blue-600">[email]</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Press Inquiries</h3>
              <p className="text-blue-600">[email]</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Issues</h3>
              <p className="text-blue-600">[email]</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Guidelines</h3>
              <p className="text-blue-600">[link to detailed guidelines]</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
            <p>
              ShiftScope is a worker-led initiative dedicated to transparency and fairness in the restaurant industry. 
              We are not affiliated with any restaurant group, union, or corporate entity. Our funding comes from 
              [funding source] and we are committed to maintaining independence from industry pressures.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}