import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Sparkles } from "lucide-react";
import { MOCK_COLLEGE_DATA } from "@/lib/constants";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const CollegeRecommender = () => {
  const [formData, setFormData] = useState({
    satScore: "",
    gpa: "",
    major: "",
    location: "",
    schoolSize: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <main className="relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            College Recommender
          </motion.h1>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Find your perfect college match with AI-powered recommendations
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-6">Your Profile</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold mb-2">SAT Score</label>
                  <input 
                    type="number" 
                    placeholder="1450" 
                    value={formData.satScore}
                    onChange={(e) => handleInputChange('satScore', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none placeholder-slate-400 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">GPA</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    placeholder="3.8" 
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none placeholder-slate-400 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Intended Major</label>
                  <select 
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none text-white"
                  >
                    <option value="" className="bg-slate-800">Select a major</option>
                    <option value="cs" className="bg-slate-800">Computer Science</option>
                    <option value="engineering" className="bg-slate-800">Engineering</option>
                    <option value="business" className="bg-slate-800">Business</option>
                    <option value="medicine" className="bg-slate-800">Pre-Med</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Location</label>
                  <select 
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none text-white"
                  >
                    <option value="" className="bg-slate-800">Any location</option>
                    <option value="west" className="bg-slate-800">West Coast</option>
                    <option value="east" className="bg-slate-800">East Coast</option>
                    <option value="midwest" className="bg-slate-800">Midwest</option>
                    <option value="south" className="bg-slate-800">South</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">School Size Preference</label>
                  <select 
                    value={formData.schoolSize}
                    onChange={(e) => handleInputChange('schoolSize', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none text-white"
                  >
                    <option value="" className="bg-slate-800">No preference</option>
                    <option value="small" className="bg-slate-800">Small (&lt; 5,000)</option>
                    <option value="medium" className="bg-slate-800">Medium (5,000 - 15,000)</option>
                    <option value="large" className="bg-slate-800">Large (&gt; 15,000)</option>
                  </select>
                </div>
                
                <GlassmorphismButton type="submit" className="w-full">
                  Get Recommendations
                  <Sparkles className="inline w-4 h-4 ml-2" />
                </GlassmorphismButton>
              </form>
            </motion.div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <motion.h2 
                className="text-xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Recommended Colleges
              </motion.h2>
              <motion.div 
                className="flex items-center space-x-2 text-sm text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Filter className="w-4 h-4" />
                <span>Sorted by match score</span>
              </motion.div>
            </div>
            
            <div className="grid gap-6">
              {MOCK_COLLEGE_DATA.map((college, index) => (
                <motion.div
                  key={college.id}
                  className="glassmorphism rounded-xl p-6 hover:scale-[1.02] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${college.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                        {college.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{college.name}</h3>
                        <p className="text-slate-400">{college.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 font-semibold text-sm">
                        {college.matchScore}% Match
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">#{college.rank}</p>
                      <p className="text-xs text-slate-400">National Rank</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{college.acceptanceRate}%</p>
                      <p className="text-xs text-slate-400">Acceptance Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{college.avgSAT}</p>
                      <p className="text-xs text-slate-400">Avg SAT</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-400">{college.students}</p>
                      <p className="text-xs text-slate-400">Students</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-4">{college.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {college.tags.map((tag) => (
                        <span 
                          key={tag}
                          className={`px-2 py-1 rounded text-xs ${
                            tag.includes('Computer') || tag.includes('Engineering') || tag.includes('Large')
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <GlassmorphismButton size="sm">
                      Learn More
                    </GlassmorphismButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CollegeRecommender;
