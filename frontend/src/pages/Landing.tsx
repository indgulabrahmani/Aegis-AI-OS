import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Building2, User, ArrowRight } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 glow-primary"
          >
            <Building2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold text-text mb-4">Welcome to Aegis</h1>
          <p className="text-xl text-textMuted max-w-2xl mx-auto">
            AI-powered startup operating system. Choose your portal to continue.
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
              <div className="glass-strong rounded-3xl p-8 h-full relative overflow-hidden border-2 border-transparent group-hover:border-primary/50 transition-all duration-300">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:glow-primary transition-all duration-300"
                  >
                    <Crown className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-text mb-3">Founder Portal</h2>
                  <p className="text-textMuted mb-6 leading-relaxed">
                    Manage company operations, AI agents, approvals, analytics, legal, finance and employees.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-accent rounded-xl text-white font-semibold flex items-center justify-center gap-3 group-hover:glow-primary transition-all duration-300"
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
              <div className="glass-strong rounded-3xl p-8 h-full relative overflow-hidden border-2 border-transparent group-hover:border-emerald-500/50 transition-all duration-300">
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
                  
                  <h2 className="text-2xl font-bold text-text mb-3">Employee Portal</h2>
                  <p className="text-textMuted mb-6 leading-relaxed">
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
          <p className="text-sm text-textMuted">
            Secure role-based access • AI-powered operations • Enterprise-grade security
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
