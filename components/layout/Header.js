// Header component with navigation
import Link from 'next/link';
import { Search, MapPin, Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Accueil', icon: null },
    { href: '/recherche', label: 'Recherche', icon: Search },
    { href: '/carte', label: 'Carte', icon: MapPin },
    { href: '/carte-gl', label: 'Carte GL', icon: MapPin },
    { href: '/collection', label: 'Ma Collection', icon: Heart },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">C</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              ChichaAroundMe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.icon && <item.icon size={18} />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon && <item.icon size={18} />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
