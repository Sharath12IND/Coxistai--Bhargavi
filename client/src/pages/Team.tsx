import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Users } from "lucide-react";
import { TEAM_DATA } from "@/lib/constants";

const Team = () => {
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 glassmorphism rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">Meet Our Team</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              The Minds Behind Coexist AI
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              Our diverse team of educators, engineers, and researchers is dedicated to revolutionizing 
              education through artificial intelligence and innovative learning technologies.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="text-center glassmorphism rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
            <div className="text-sm text-slate-400">Team Members</div>
          </div>
          <div className="text-center glassmorphism rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">8</div>
            <div className="text-sm text-slate-400">Countries</div>
          </div>
          <div className="text-center glassmorphism rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-sm text-slate-400">Years Combined Experience</div>
          </div>
          <div className="text-center glassmorphism rounded-xl p-6">
            <div className="text-3xl font-bold text-orange-400 mb-2">3</div>
            <div className="text-sm text-slate-400">AI Patents</div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {TEAM_DATA.map((member, index) => (
            <motion.div
              key={member.id}
              className="glassmorphism rounded-2xl p-8 hover:scale-105 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${member.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                  {member.image}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#21223a] flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-blue-400 font-semibold mb-1">{member.role}</div>
                <div className="text-sm text-slate-400 mb-4">{member.designation}</div>
                <p className="text-slate-300 text-sm leading-relaxed">{member.bio}</p>
              </div>

              {/* Contact Links */}
              <div className="flex justify-center space-x-4">
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glassmorphism rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </motion.a>
                <motion.a
                  href={`mailto:${member.email}`}
                  className="w-10 h-10 glassmorphism rounded-lg flex items-center justify-center hover:bg-green-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-5 h-5 text-green-400" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Culture */}
        <motion.div 
          className="mt-20 glassmorphism rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              We believe that education should be accessible, engaging, and personalized for every learner. 
              Our team combines cutting-edge AI research with deep educational expertise to create tools 
              that adapt to each student's unique learning style and pace.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Collaboration</h3>
                <p className="text-sm text-slate-400">Working together to solve complex educational challenges</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Global Impact</h3>
                <p className="text-sm text-slate-400">Reaching learners across continents and cultures</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-slate-400">Pushing the boundaries of AI-powered education</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Join Us Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-slate-400 mb-6">We're always looking for passionate individuals who share our vision.</p>
          <motion.button
            className="glassmorphism-button px-8 py-4 rounded-xl font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Open Positions
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default Team;