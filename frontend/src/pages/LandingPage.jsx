import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-teal-600 fill-teal-600" />
              <span className="text-2xl text-gray-900">Happy Vet Clinic</span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-gray-700 hover:text-teal-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-teal-600 transition-colors">About</a>
              <a href="#team" className="text-gray-700 hover:text-teal-600 transition-colors">Team</a>
              <a href="#contact" className="text-gray-700 hover:text-teal-600 transition-colors">Contact</a>
            </div>
            <a href="/login" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              Login
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl text-gray-900 mb-6">
                Caring for Your Pets Like Family
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Professional veterinary care with compassion and expertise. We're here to keep your furry friends healthy and happy.
              </p>
              <div className="flex gap-4">
                <a href="/login" className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                  Book Appointment
                </a>
                <a href="#services" className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                  Our Services
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Veterinarian with pet"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive care for all your pet's needs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl text-gray-900">Wellness Exam</h4>
                <span className="text-2xl text-teal-600">$60</span>
              </div>
              <p className="text-gray-600">Full physical exam including weight check, vitals, and overall health assessment.</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl text-gray-900">Emergency Exam</h4>
                <span className="text-2xl text-teal-600">$110</span>
              </div>
              <p className="text-gray-600">Urgent care exam for pets requiring immediate medical attention.</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl text-gray-900">Vaccinations</h4>
                <span className="text-2xl text-teal-600">$45</span>
              </div>
              <p className="text-gray-600">Core vaccines to protect your pet against common diseases.</p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl text-gray-900">Surgery</h4>
                <span className="text-2xl text-teal-600">$200+</span>
              </div>
              <p className="text-gray-600">Safe and effective surgical procedures with full anesthesia monitoring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1725409796872-8b41e8eca929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Veterinarian examining kitten"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl text-gray-900 mb-6">About Happy Vet Clinic</h2>
              <p className="text-lg text-gray-600 mb-4">
                Since 2010, Happy Vet Clinic has been providing exceptional veterinary care to pets in our community. Our team of experienced veterinarians and staff are dedicated to treating every animal with the love and respect they deserve.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We believe in preventive care and client education, working closely with pet owners to ensure their companions live long, healthy lives.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Licensed and experienced veterinarians</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">State-of-the-art medical equipment</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Compassionate and personalized care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals who care about your pets</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1644675443401-ea4c14bad0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Dr. Amanda Reed"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl text-gray-900 mb-2">Dr. Amanda Reed</h3>
              <p className="text-teal-600 mb-2">General Care</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1733783489145-f3d3ee7a9ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Dr. Samuel Ortiz"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl text-gray-900 mb-2">Dr. Samuel Ortiz</h3>
              <p className="text-teal-600 mb-2">Exotic Animals</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1654895622553-cf4a29be9499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Dr. Mia Thompson"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl text-gray-900 mb-2">Dr. Mia Thompson</h3>
              <p className="text-teal-600 mb-2">Surgery</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Dr. Jordan Hale"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl text-gray-900 mb-2">Dr. Jordan Hale</h3>
              <p className="text-teal-600 mb-2">Dermatology</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1725409796872-8b41e8eca929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                alt="Dr. Emily Carter"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl text-gray-900 mb-2">Dr. Emily Carter</h3>
              <p className="text-teal-600 mb-2">General Care</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600">We're here to answer your questions</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">(555) 123-4567</p>
              <p className="text-sm text-gray-500 mt-1">Mon-Fri: 8am-6pm</p>
              <p className="text-sm text-gray-500">Sat: 9am-4pm</p>
              <p className="text-sm text-gray-500">Sun: Closed</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@happyvetclinic.com</p>
              <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">123 Pet Care Lane</p>
              <p className="text-gray-600">Happyville, HV 12345</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-teal-400 fill-teal-400" />
                <span className="text-xl">Happy Vet Clinic</span>
              </div>
              <p className="text-gray-400">Providing compassionate care for your beloved pets since 2010.</p>
            </div>
            <div>
              <h4 className="text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-teal-400 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-teal-400 transition-colors">About Us</a></li>
                <li><a href="#team" className="hover:text-teal-400 transition-colors">Our Team</a></li>
                <li><a href="/login" className="hover:text-teal-400 transition-colors">Book Appointment</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Wellness Exams</li>
                <li>Vaccinations</li>
                <li>Surgery</li>
                <li>Emergency Care</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg mb-4">Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 8am - 6pm</li>
                <li>Saturday: 9am - 4pm</li>
                <li>Sunday: Closed</li>
                <li className="text-teal-400">Emergency: 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Happy Vet Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}