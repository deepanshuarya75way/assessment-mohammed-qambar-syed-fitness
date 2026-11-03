"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Zap, Shield, Sparkles } from "lucide-react";
import { Magnetic } from "./Magnetic";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change / escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Method", href: "#method" },
    { label: "Journal", href: "/journal" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-8 py-6 md:px-14 flex justify-between items-center pointer-events-none transition-colors duration-500">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col pointer-events-auto">
          <span className="font-serif text-3xl sm:text-4xl italic tracking-tighter text-white hover:text-gold-leaf transition-colors duration-500 logo-svora font-bold">
            SVORA
          </span>
          <div className="h-[1px] w-0 bg-gold-leaf group-hover:w-full transition-all duration-700" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-16 pointer-events-auto items-center">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/70 hover:text-gold-leaf transition-colors duration-500 relative group overflow-hidden font-medium"
            >
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                {item.label}
              </span>
              <span className="absolute top-0 left-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-gold-leaf">
                {item.label}
              </span>
            </Link>
          ))}

          <Magnetic>
            <Link
              href="/uplink"
              className="btn-kinetic px-8 py-3 bg-white text-black font-bold hover:bg-gold-leaf hover:text-black transition-all"
            >
              Initialize
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-3 pointer-events-auto">
          <Link
            href="/uplink"
            className="px-4 py-2 bg-white text-black font-bold uppercase tracking-widest text-[9px] rounded-full hover:bg-gold-leaf transition-colors shadow-md"
          >
            Build Plan
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:border-gold-leaf transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} className="text-gold-leaf" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (Framer Motion Animated) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 pt-28 pb-10 px-8 bg-black/95 backdrop-blur-2xl border-b border-gold-leaf/30 z-40 lg:hidden flex flex-col gap-6 shadow-2xl overflow-hidden"
          >
            {/* System Status Chip */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-glow animate-ping" />
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-gold-leaf">Neural Link // Active</span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/50">v2.6</span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 py-2">
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (index + 1), duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif italic text-white/90 hover:text-gold-leaf flex items-center justify-between py-2 transition-colors border-b border-white/5"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={16} className="text-gold-leaf/50" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="pt-2"
            >
              <Link
                href="/uplink"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:bg-gold-leaf transition-all"
              >
                <Zap size={14} className="text-black" />
                Initialize Protocol
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
