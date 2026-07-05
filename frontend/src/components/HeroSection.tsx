import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0A0B14' }}>
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blob 1: Violet, top-left */}
        <motion.div
          className="absolute w-[480px] h-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(110,90,224,0.35) 0%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: '0.35',
            top: '-100px',
            left: '-100px',
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Blob 2: Blue, bottom-right */}
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62,111,224,0.35) 0%, transparent 70%)',
            filter: 'blur(90px)',
            opacity: '0.35',
            bottom: '-100px',
            right: '-100px',
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full"
            style={{
              backgroundColor: 'rgba(180,170,240,0.5)',
              left: `${15 + i * 15}%`,
              bottom: '-20px',
            }}
            animate={{
              y: [-20, window.innerHeight + 20],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 14 + (i % 3) * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: isScrolled ? 'rgba(12,13,22,0.55)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6E5AE0] to-[#3E6FE0] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>
                Aegis
              </span>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-white/50 text-xs">AI Executive Operating System</span>
            </div>
          </div>

          {/* Center nav - hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors text-sm">
              How It Works
            </a>
            <a href="#about" className="text-white/70 hover:text-white transition-colors text-sm">
              About Us
            </a>
          </div>

          {/* Sign In button */}
          <Link to="/login/founder">
            <button className="px-5 py-2 border border-white/20 rounded-lg text-white text-sm hover:bg-white/5 transition-colors">
              Sign In
            </button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                backgroundColor: 'rgba(124,106,232,0.12)',
                border: '1px solid rgba(124,106,232,0.3)',
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#7C6AE8' }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-sm" style={{ color: '#B7ADF3' }}>
                AI Executive Operating System
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[52px] leading-[1.12] font-semibold"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
              }}
            >
              <span className="text-[#EDEDF4]">Run your company with an </span>
              <span
                className="bg-gradient-to-r from-[#9C8CF2] to-[#5C8CF0] bg-clip-text text-transparent"
              >
                AI executive team.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[16.5px] leading-[1.65] max-w-[500px]"
              style={{ color: '#A9AAC2' }}
            >
              Aegis coordinates a team of specialized AI agents — HR, Finance, Legal, and Marketing — under a single orchestrator, Atlas, so founders can run every function of their company from one command center.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/login/founder">
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(124,106,232,0.5)' }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-lg text-white font-medium"
                  style={{
                    background: 'linear-gradient(90deg, #7C6AE8, #4E7FE0)',
                    boxShadow: '0 0 24px rgba(124,106,232,0.35)',
                  }}
                >
                  Get started
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-lg text-white font-medium border border-white/20"
              >
                See how it works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Floating dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            {/* Floating card */}
            <motion.div
              className="relative rounded-2xl p-6"
              style={{
                backgroundColor: 'rgba(22,23,36,0.65)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
              animate={{
                y: [0, -12, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Glow behind card */}
              <div
                className="absolute inset-0 rounded-2xl -z-10"
                style={{
                  background: 'radial-gradient(circle, rgba(124,106,232,0.3) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-white font-medium text-sm">Founder Dashboard</span>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>

              {/* Stat tiles */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-white/60 text-xs mb-1">Runway</div>
                  <div className="text-white font-semibold">14 mo</div>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-white/60 text-xs mb-1">Mission success</div>
                  <div className="text-white font-semibold">96%</div>
                </div>
              </div>

              {/* Weekly task volume */}
              <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <div className="text-white/60 text-xs mb-3">Weekly task volume</div>
                <div className="flex items-end gap-2 h-12">
                  {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        background: 'linear-gradient(90deg, #7C6AE8, #4E7FE0)',
                        height: `${height}%`,
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                    />
                  ))}
                </div>
              </div>

              {/* Agent status pills */}
              <div className="flex gap-2">
                {[
                  { name: 'Nova', status: 'active' },
                  { name: 'Ledger', status: 'active' },
                  { name: 'Lex', status: 'progress' },
                  { name: 'Pulse', status: 'active' },
                ].map((agent) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: agent.status === 'active' ? '#22c55e' : '#f59e0b',
                      }}
                    />
                    <span className="text-white text-xs">{agent.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating chip pills */}
            <motion.div
              className="absolute -top-4 -right-4 px-3 py-2 rounded-lg flex items-center gap-2"
              style={{
                backgroundColor: 'rgba(22,23,36,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-white text-xs">Mission complete</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 px-3 py-2 rounded-lg flex items-center gap-2"
              style={{
                backgroundColor: 'rgba(22,23,36,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#7C6AE8' }} />
              <span className="text-white text-xs">Atlas is thinking…</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
