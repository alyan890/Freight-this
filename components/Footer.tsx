import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f5f0e6] border-t border-[#e0d9c7] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              Freight<span className="text-amber-700">This</span>
            </h3>
            <p className="text-sm text-gray-600">
              Your trusted source for the right connections & opportunities
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/supporters" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Supporters
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Get Started</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/signup" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-amber-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#e0d9c7]">
          <p className="text-center text-sm text-gray-600">
            © {currentYear} FreightThis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
