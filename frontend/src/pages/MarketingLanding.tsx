import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Users, 
  DollarSign, 
  Scale, 
  Megaphone, 
  LayoutDashboard, 
  BarChart3, 
  CheckCircle, 
  Bell,
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

// Feature data
const features = [
  {
    icon: Bot,
    title: "AI Orchestrator (Atlas)",
    description: "Interprets your goals and delegates them across your AI executive team."
  },
  {
    icon: Users,
    title: "HR Agent (Nova)",
    description: "Handles hiring plans, job descriptions, and onboarding — end to end."
  },
  {
    icon: DollarSign,
    title: "Finance Agent (Ledger)",
    description: "Tracks runway, budgets, and burn rate in real time."
  },
  {
    icon: Scale,
    title: "Legal Agent (Lex)",
    description: "Drafts contracts, NDAs, and offer letters ready for your review."
  },
  {
    icon: Megaphone,
    title: "Marketing Agent (Pulse)",
    description: "Builds go-to-market plans and positioning on demand."
  },
  {
    icon: LayoutDashboard,
    title: "Employee Workspace",
    description: "A dedicated portal where your team executes approved work."
  },
  {
    icon: LayoutDashboard,
    title: "Founder Command Center",
    description: "Every function of your company, visible from one dashboard."
  },
  {
    icon: BarChart3,
    title: "Live Analytics",
    description: "Real-time visibility into productivity, spend, and mission progress."
  },
  {
    icon: CheckCircle,
    title: "Approval Workflow",
    description: "Every high-stakes AI decision waits for your sign-off."
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description: "Stay informed the moment something needs your attention."
  }
];

// Timeline steps
const timelineSteps = [
  {
    step: 1,
    title: "You state the goal.",
    description: "The founder enters a business objective in plain language."
  },
  {
    step: 2,
    title: "Atlas analyzes the mission.",
    description: "The orchestrator breaks the goal into concrete, assignable tasks."
  },
  {
    step: 3,
    title: "Atlas delegates to the team.",
    description: "Work is routed to Nova (HR), Ledger (Finance), Lex (Legal), and Pulse (Marketing)."
  },
  {
    step: 4,
    title: "Each agent executes independently.",
    description: "Specialists work in parallel, within their domain expertise."
  },
  {
    step: 5,
    title: "You review the recommendations.",
    description: "Every output — and every high-stakes action — surfaces for founder approval."
  },
  {
    step: 6,
    title: "Approved work reaches your team.",
    description: "Employees automatically receive tasks the moment they're greenlit."
  },
  {
    step: 7,
    title: "Your team executes and reports back.",
    description: "Employees complete the work and submit updates through their workspace."
  },
  {
    step: 8,
    title: "Atlas keeps watch.",
    description: "Progress is tracked continuously, with executive summaries generated for you automatically."
  }
];

// Stats data (placeholder values)
const stats = [
  { label: "Projects Managed", value: 1247 },
  { label: "Tasks Completed", value: 8432 },
  { label: "Employee Productivity", value: 87, suffix: "%" },
  { label: "Mission Success Rate", value: 94, suffix: "%" }
];

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Navbar component
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track which section is in view
      const sections = ["how-it-works", "about-us"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "glass-strong border-b border-border/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text">Aegis</h1>
            <p className="text-xs text-textMuted">AI Executive Operating System</p>
          </div>
        </Link>

        {/* Center Nav Pill */}
        <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === "how-it-works"
                ? "bg-primary/20 text-primary"
                : "text-textMuted hover:text-text"
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("about-us")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeSection === "about-us"
                ? "bg-primary/20 text-primary"
                : "text-textMuted hover:text-text"
            }`}
          >
            About Us
          </button>
        </div>

        {/* Sign In */}
        <Link
          to="/portal"
          className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    </motion.nav>
  );
}

// Hero section
function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -200]);

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center pt-20">
      {/* Background blobs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 glass rounded-full mb-6"
            >
              <span className="text-sm text-primary font-medium">AI Executive Operating System</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight"
            >
              Run Your Company With an{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI Executive Team.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-textMuted mb-8 max-w-xl"
            >
              Aegis coordinates a team of specialized AI agents — HR, Finance, Legal, and Marketing — under a single orchestrator, Atlas, so founders can run every function of their company from one command center.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              <Link
                to="/portal"
                className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 border border-border/50 text-text rounded-xl font-medium hover:bg-surface/50 transition-colors"
              >
                See How It Works
              </button>
            </motion.div>
          </motion.div>

          {/* Right - Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="glass-strong rounded-2xl p-6 border border-border/30 relative"
            >
              {/* Abstract dashboard preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-32 bg-surface/50 rounded-lg" />
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <div className="w-3 h-3 rounded-full bg-warning" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass rounded-lg p-4">
                      <div className="h-4 w-16 bg-surface/50 rounded mb-2" />
                      <div className="h-8 w-12 bg-primary/30 rounded" />
                    </div>
                  ))}
                </div>
                <div className="glass rounded-lg p-4">
                  <div className="h-4 w-24 bg-surface/50 rounded mb-3" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface/50" />
                        <div className="flex-1 h-3 bg-surface/30 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating chips */}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                className="absolute -top-4 -right-4 glass rounded-lg px-3 py-2 text-sm text-success"
              >
                Mission Complete ✓
              </motion.div>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-lg px-3 py-2 text-sm text-primary"
              >
                Atlas is thinking...
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-textMuted"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Features section
function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text mb-4">
            Everything Your Startup Needs — Run by AI.
          </h2>
          <p className="text-xl text-textMuted max-w-2xl mx-auto">
            One platform replacing the dozen tools founders juggle before they have a team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass rounded-xl p-6 hover:bg-surface/30 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-textMuted text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// How It Works section
function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text mb-4">
            From Goal to Execution — Automatically.
          </h2>
          <p className="text-xl text-textMuted max-w-2xl mx-auto">
            Here's what happens the moment you give Atlas a mission.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-accent/50 hidden md:block" />

          <div className="space-y-8">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-20 md:pl-0"
              >
                {/* Step number circle */}
                <div className="absolute left-0 top-0 w-16 h-16 glass rounded-full flex items-center justify-center border-2 border-primary/50">
                  <span className="text-2xl font-bold text-primary">{step.step}</span>
                </div>

                {/* Content */}
                <div className="md:ml-20 glass rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-text mb-2">{step.title}</h3>
                  <p className="text-textMuted">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// About Us section
function AboutUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about-us" ref={ref} className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text mb-8">About Aegis</h2>
          <p className="text-lg text-textMuted mb-8 leading-relaxed">
            Aegis is an AI executive operating system built for founders who are moving too fast to manage everything themselves. Instead of stitching together separate tools for HR, finance, legal, and marketing, founders delegate that work to a coordinated team of specialized AI agents — orchestrated by Atlas, our AI executive layer.
          </p>
          <p className="text-lg text-textMuted mb-8 leading-relaxed">
            Our mission is straightforward: simplify startup operations, sharpen decision-making, remove repetitive busywork, and give lean teams the operating leverage of a much larger company.
          </p>
          <div className="glass rounded-xl p-6 inline-block">
            <p className="text-text font-semibold mb-2">Our Vision</p>
            <p className="text-textMuted">
              To become the operating system every modern company runs on.
            </p>
          </div>
        </motion.div>

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {["Innovation", "Automation", "Transparency", "Collaboration", "Security"].map((value) => (
            <div key={value} className="glass rounded-full px-6 py-3 text-text font-medium">
              {value}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-6 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-textMuted text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-text">Aegis</h1>
            </div>
            <p className="text-sm text-textMuted">AI Executive Operating System</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-text mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/portal" className="block text-textMuted hover:text-text transition-colors text-sm">
                Sign In
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="block text-textMuted hover:text-text transition-colors text-sm"
              >
                How It Works
              </button>
              <Link to="/privacy" className="block text-textMuted hover:text-text transition-colors text-sm">
                Privacy
              </Link>
              <Link to="/terms" className="block text-textMuted hover:text-text transition-colors text-sm">
                Terms
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-text mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 text-textMuted hover:text-text transition-colors text-sm">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="#" className="flex items-center gap-2 text-textMuted hover:text-text transition-colors text-sm">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-2 text-textMuted hover:text-text transition-colors text-sm">
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          </div>

          {/* Empty for balance */}
          <div />
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-textMuted">
            © {new Date().getFullYear()} Aegis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main landing page component
export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-[#0A0B14]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <AboutUs />
      <Footer />
    </div>
  );
}
