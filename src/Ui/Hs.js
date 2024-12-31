'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {  Lock, Search, FileText, ImageIcon, BarChart2, Users ,   ChevronDown, Github, Twitter, Linkedin, Mail, Phone, MapPin, Clock, Check, AlertTriangle, Zap, PlayCircle } from 'lucide-react';

const Hs = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Progress', id: 'progress' },
    { name: 'Team', id: 'team' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);

      const sections = navItems.map((item) => item.id);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navsignin = () => {
    navigate('/signin'); // Change the path to your component's route
  };
  const navdashboard = () => {
    navigate('/dashboard'); // Change the path to your component's route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden">
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 z-50"
        style={{ scaleX: scrollProgress }}
      />

      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-90 shadow-md backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-2xl font-bold text-indigo-600 flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-6 h-6 mr-2" />
              VPACS
            </motion.h1>
            <div className="hidden md:flex space-x-6 items-center">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`text-indigo-600 hover:text-indigo-800 ${activeSection === item.id ? 'font-bold' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.name}
                </motion.button>
              ))}
              {/* New Navbar Button */}
              <motion.button
                className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navsignin}
              >
               Sign-In
              </motion.button>
            </div>
            <button
              className="md:hidden text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className="text-2xl text-indigo-600 hover:text-indigo-800"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                className="text-2xl text-indigo-600 hover:text-indigo-800 mt-8"
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-5xl sm:text-6xl font-extrabold text-indigo-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Secure Access Control for the Modern Era
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            VPACS revolutionizes restricted area security with cutting-edge technology, providing seamless, efficient, and adaptable access management for vehicles and passengers.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Updated Get Started Button */}
            <motion.button
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navdashboard}
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      
     

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: 'Secure Authentication', icon: Lock, description: 'Multi-factor authentication and role-based access control ensure only authorized personnel can access the system.' },
              { title: 'Advanced Search', icon: Search, description: 'Powerful search functionality allows quick retrieval of driver, passenger, and vehicle information.' },
              { title: 'CNIC Scanning', icon: FileText, description: 'Automated data extraction from CNIC images indigouces manual input errors and speeds up the registration process.' },
              { title: 'Image Processing', icon: ImageIcon, description: 'Cutting-edge image recognition for enhanced security and identification of vehicles and passengers.' },
              { title: 'Comprehensive Reporting', icon: BarChart2, description: 'Generate detailed daily reports on all access activities, entries, and exits for better security monitoring.' },
              { title: 'User Management', icon: Users, description: 'Easily manage user roles, permissions, and access levels with our intuitive admin interface.' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gradient-to-br from-indigo-50 to-indigo-50 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-8">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-indigo-600 mb-4">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">How It Works</h3>
          <div className="max-w-4xl mx-auto">
            {[
              { title: 'Vehicle Approach', description: 'As a vehicle approaches the restricted area, it is detected by our advanced sensors.' },
              { title: 'Driver Authentication', description: 'The driver presents their cindigoentials, which are quickly verified through our secure system.' },
              { title: 'Passenger Verification', description: 'If applicable, passenger information is checked against the approved database.' },
              { title: 'Vehicle Inspection', description: 'The vehicle undergoes a swift yet thorough inspection process.' },
              { title: 'Access Grant', description: 'Upon successful verification, access is granted, and the barrier is lifted.' },
              { title: 'Logging and Reporting', description: 'All entry and exit activities are logged for comprehensive reporting and auditing.' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="flex items-start mb-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 text-xl font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-indigo-600 mb-3">{step.title}</h4>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section id="progress" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">Project Progress</h3>
          <div className="max-w-3xl mx-auto">
            {[
              { title: 'User Authentication', progress: 80, description: 'Implementing super user roles and admin access control.' },
              { title: 'CNIC Scanning', progress: 65, description: 'Developing image processing for CNIC data extraction.' },
              { title: 'Reporting System', progress: 90, description: 'Finalizing comprehensive daily activity reports.' },
              // { title: 'Mobile App Integration', progress: 40, description: 'Building cross-platform mobile app for on-the-go access.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="mb-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-2xl font-semibold text-indigo-600">{item.title}</h4>
                  <span className="text-gray-600 font-semibold text-xl">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <motion.div
                    className="bg-indigo-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 rounded rounded-xl">
            {[
              { name: 'John Doe', role: 'Project Lead', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Jane Smith', role: 'Security Expert', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Mike Johnson', role: 'Software Architect', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Emily Brown', role: 'UI/UX Designer', image: '/placeholder.svg?height=300&width=300' },
              { name: 'David Lee', role: 'Database Administrator', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Sarah Wilson', role: 'Quality Assurance', image: '/placeholder.svg?height=300&width=300' },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-indigo-600 mb-2">{member.name}</h4>
                  <p className="text-gray-600 text-lg">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">Frequently Asked Questions</h3>
          <div className="max-w-3xl mx-auto">
            {[
              { question: 'How secure is VPACS?', answer: 'VPACS employs state-of-the-art encryption and multi-factor authentication to ensure the highest level of security for your restricted areas.' },
              { question: 'Can VPACS integrate with existing systems?', answer: 'Yes, VPACS is designed to be highly adaptable and can integrate seamlessly with most existing security and management systems.' },
              { question: 'What kind of support do you offer?', answer: 'We offer 24/7 technical support, regular system updates, and personalized training for your staff to ensure smooth operation of VPACS.' },
              { question: 'Is VPACS suitable for small businesses?', answer: 'VPACS is scalable and can be customized to fit the needs of businesses of all sizes, from small operations to large enterprises.' },
            ].map((item, index) => (
              <motion.div
                key={item.question}
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-xl font-semibold text-indigo-600 mb-3">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-indigo-600 mb-12">Contact Us</h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                className="bg-white rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-2xl font-semibold text-indigo-600 mb-6">Get in Touch</h4>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                    <textarea id="message" rows="4" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
              <motion.div
                className="bg-white rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-2xl font-semibold text-indigo-600 mb-6">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-indigo-600 mr-4" />
                    <p>123 Security Street, Safetown, ST 12345</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-indigo-600 mr-4" />
                    <p>+1 (123) 456-7890</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-indigo-600 mr-4" />
                    <p>info@vpacs.com</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-indigo-600 mr-4" />
                    <p>Monday - Friday: 9am - 5pm</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h5 className="text-xl font-semibold text-indigo-600 mb-4">Follow Us</h5>
                  <div className="flex space-x-4">
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                      <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-indigo-600 hover:text-indigo-800 transition duration-300">
                      <Github className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                VPACS
              </h4>
              <p className="mb-4">Secure, Efficient, and Adaptable Access Management for Restricted Areas</p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-indigo-300 transition duration-300">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-indigo-300 transition duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-indigo-300 transition duration-300">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-indigo-300 transition duration-300"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(item.id);
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-xl font-semibold mb-4">Newsletter</h5>
              <p className="mb-4">Stay updated with our latest features and releases.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-indigo-700 mt-8 pt-8 text-center">
            <p>&copy; 2023 VPACS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hs;