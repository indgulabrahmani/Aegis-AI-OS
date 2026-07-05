import { HeroSection } from '../components/HeroSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, User, ArrowRight } from 'lucide-react';

export function Landing() {
  return (
    <>
      <HeroSection />
      
      {/* Portal Selection Section */}
      <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: '#0A0B14' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-5xl"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Choose Your Portal</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              AI-powered startup operating system. Select your access level.
            </p>
          </motion.div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder Portal Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link to="/login/founder">
                <div className="rounded-3xl p-8 h-full relative overflow-hidden border-2 border-transparent group-hover:border-purple-500/50 transition-all duration-300"
                     style={{ backgroundColor: 'rgba(22,23,36,0.65)', backdropFilter: 'blur(20px)' }}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C6AE8] to-[#4E7FE0] flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      <Crown className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-white mb-3">Founder Portal</h2>
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Manage company operations, AI agents, approvals, analytics, legal, finance and employees.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 px-6 bg-gradient-to-r from-[#7C6AE8] to-[#4E7FE0] rounded-xl text-white font-semibold flex items-center justify-center gap-3 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300"
                    >
                      <span>Continue as Founder</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Employee Portal Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link to="/login/employee">
                <div className="rounded-3xl p-8 h-full relative overflow-hidden border-2 border-transparent group-hover:border-emerald-500/50 transition-all duration-300"
                     style={{ backgroundColor: 'rgba(22,23,36,0.65)', backdropFilter: 'blur(20px)' }}>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300"
                    >
                      <User className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-white mb-3">Employee Portal</h2>
                    <p className="text-white/60 mb-6 leading-relaxed">
                      Manage daily work, projects, meetings, attendance and personal performance.
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white font-semibold flex items-center justify-center gap-3 group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300"
                    >
                      <span>Continue as Employee</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-white/40">
              Secure role-based access • AI-powered operations • Enterprise-grade security
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
