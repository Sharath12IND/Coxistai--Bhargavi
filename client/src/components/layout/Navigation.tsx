import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";

const Navigation = () => {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleNavigation = (path: string) => {
    setLocation(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => handleNavigation('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg" />
              <span className="text-xl font-bold">Coexist AI</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2">
              {NAVIGATION_ITEMS.map((item) => (
                <motion.button
                  key={item.id}
                  className={`nav-link px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden glassmorphism mt-2 mx-4 rounded-lg overflow-hidden ${
            mobileMenuOpen ? 'block' : 'hidden'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-2 space-y-2">
            {NAVIGATION_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`nav-link block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path) ? 'active' : ''
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navigation;
