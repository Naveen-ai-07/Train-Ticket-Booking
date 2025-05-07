import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
            Book Your Indian Railways Journey
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fadeIn">
            Safe, comfortable travel across all states and districts in India
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeIn">
            <Link href="/search" className="btn-primary text-lg py-3 px-8">
              Book Now
            </Link>
            <Link href="/pnr" className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg">
              Check PNR Status
            </Link>
          </div>
        </div>
      </section>

      {/* Search Box */}
      <section className="py-8 -mt-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Search Trains</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">From</label>
                <select className="input-field">
                  <option value="">Select State/City</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="chennai">Chennai</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">To</label>
                <select className="input-field">
                  <option value="">Select State/City</option>
                  <option value="delhi">Delhi</option>
                  <option value="mumbai">Mumbai</option>
                  <option value="chennai">Chennai</option>
                  <option value="kolkata">Kolkata</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date of Journey</label>
                <input type="date" className="input-field" />
              </div>
              <div className="flex items-end">
                <button type="submit" className="btn-primary w-full">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Why Choose Our Booking Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Booking</h3>
              <p className="text-gray-600">
                Book your tickets in just a few clicks with our streamlined booking process.
              </p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600">
                Your payment information is always secure with our encrypted payment system.
              </p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our customer support team is available round the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="train-card flex items-center">
                <div className="w-full">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{route.from} to {route.to}</h3>
                    <span className="text-blue-600 font-semibold">₹{route.price}</span>
                  </div>
                  <div className="text-gray-600 mt-1">
                    <span>{route.duration} • {route.trainName}</span>
                  </div>
                  <Link href={`/search?from=${route.from}&to=${route.to}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm mt-2 inline-block">
                    View Trains →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who book their train tickets with us every day
          </p>
          <Link href="/register" className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg inline-block">
            Create Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Indian Railways</h3>
              <p className="text-gray-400">
                Your trusted platform for booking train tickets across India.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/search" className="text-gray-400 hover:text-white">Search Trains</Link></li>
                <li><Link href="/pnr" className="text-gray-400 hover:text-white">PNR Status</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link href="/register" className="text-gray-400 hover:text-white">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQs</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Indian Railways. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Sample data for popular routes
const popularRoutes = [
  { from: 'Delhi', to: 'Mumbai', price: 1500, duration: '16h 30m', trainName: 'Rajdhani Express' },
  { from: 'Mumbai', to: 'Bangalore', price: 1200, duration: '12h 45m', trainName: 'Udyan Express' },
  { from: 'Chennai', to: 'Hyderabad', price: 800, duration: '8h 15m', trainName: 'Chennai Express' },
  { from: 'Kolkata', to: 'Delhi', price: 1300, duration: '17h 20m', trainName: 'Poorva Express' },
  { from: 'Bangalore', to: 'Chennai', price: 600, duration: '6h 30m', trainName: 'Shatabdi Express' },
  { from: 'Hyderabad', to: 'Mumbai', price: 1100, duration: '10h 45m', trainName: 'Mumbai Express' },
]; 