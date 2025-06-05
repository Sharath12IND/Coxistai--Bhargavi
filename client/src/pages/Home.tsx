import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { 
  MessageCircle, 
  NotebookPen, 
  Users, 
  GraduationCap, 
  Presentation, 
  Calendar, 
  Code,
  ArrowRight,
  Sparkles
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const Home = () => {
  const [, setLocation] = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: "SparkTutor Chat",
      description: "AI-powered tutoring with text, voice, and image support for instant learning assistance.",
      path: "/chat",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: NotebookPen,
      title: "Notes Hub",
      description: "Smart note-taking with advanced search, tagging, and PDF export capabilities.",
      path: "/notes",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Users,
      title: "SparkHub Community",
      description: "Connect with fellow learners, share notes, and collaborate on projects.",
      path: "/community",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: GraduationCap,
      title: "College Recommender",
      description: "AI-powered college recommendations based on your profile and preferences.",
      path: "/college",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Presentation,
      title: "AI Presentations",
      description: "Create stunning presentations with AI assistance and export to PowerPoint.",
      path: "/presentations",
      gradient: "from-blue-500 to-green-500"
    },
    {
      icon: Calendar,
      title: "Smart Calendar",
      description: "Intelligent scheduling with Google Calendar sync and AI-powered suggestions.",
      path: "/calendar",
      gradient: "from-green-500 to-blue-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <main className="relative z-10 pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Coexist AI
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your AI-powered education assistant that transforms learning through intelligent tutoring, note management, and collaborative study tools.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <GlassmorphismButton 
                size="lg"
                onClick={() => setLocation('/chat')}
                className="group"
              >
                Start Learning Today
                <ArrowRight className="inline w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </GlassmorphismButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl font-bold mb-4">Powerful Learning Tools</h2>
            <p className="text-slate-400 text-lg">Everything you need to excel in your studies</p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glassmorphism rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
                variants={itemVariants}
                onClick={() => setLocation(feature.path)}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 mb-4">{feature.description}</p>
                <button className="text-blue-500 hover:text-green-500 transition-colors duration-300 group-hover:translate-x-1 transition-transform">
                  Try Now <ArrowRight className="inline w-4 h-4 ml-1" />
                </button>
              </motion.div>
            ))}

            {/* CodeSpark Feature - Full Width */}
            <motion.div
              className="lg:col-span-3 glassmorphism rounded-xl p-8 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              variants={itemVariants}
              onClick={() => setLocation('/code')}
            >
              <div className="flex flex-col lg:flex-row items-center text-center lg:text-left">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-3">CodeSpark Module</h3>
                  <p className="text-slate-400 mb-4">Master programming with interactive lessons, code editor, and structured learning paths.</p>
                  <GlassmorphismButton>
                    Start Coding <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </GlassmorphismButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
