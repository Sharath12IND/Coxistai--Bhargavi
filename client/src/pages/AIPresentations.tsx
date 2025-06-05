import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Sparkles, 
  Image, 
  BarChart, 
  Lightbulb 
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const AIPresentations = () => {
  const [slideData, setSlideData] = useState({
    title: "The Solar System",
    subtitle: "An Introduction to Our Cosmic Neighborhood",
    content: "",
    backgroundStyle: "gradient1"
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, background: "from-purple-500 to-blue-600" },
    { id: 2, background: "from-green-500 to-teal-600" },
    { id: 3, background: "from-red-500 to-pink-600" },
    { id: 4, background: "from-yellow-500 to-orange-600" }
  ];

  const aiSuggestions = [
    "💡 Add a comparison chart showing planet sizes",
    "🌟 Include fascinating facts about each planet",
    "🚀 Add timeline of space exploration missions"
  ];

  const handleInputChange = (field: string, value: string) => {
    setSlideData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Slide updated:", slideData);
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
            AI Presentations
          </motion.h1>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Create stunning presentations with AI assistance
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Slide Preview */}
          <div className="order-2 lg:order-1">
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Slide Preview</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <GlassmorphismButton size="sm">
                    <Download className="w-4 h-4 inline mr-2" />
                    Export PPT
                  </GlassmorphismButton>
                </div>
              </div>
              
              {/* Slide Canvas */}
              <motion.div 
                className="aspect-video glassmorphism rounded-lg p-8 mb-4 bg-gradient-to-br from-purple-500 to-blue-600 flex flex-col justify-center items-center text-center text-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-bold mb-4">{slideData.title}</h1>
                <h2 className="text-xl mb-6">{slideData.subtitle}</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="w-5 h-5 bg-red-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
              </motion.div>
              
              {/* Slide Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {slides.map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    className={`flex-shrink-0 w-24 h-16 glassmorphism rounded cursor-pointer transition-all ${
                      currentSlide === index ? 'border-2 border-blue-500' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={`w-full h-full rounded bg-gradient-to-br ${slide.background} flex items-center justify-center`}>
                      <span className="text-xs text-white font-bold">
                        {index === slides.length - 1 ? '+' : slide.id}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Content Editor */}
          <div className="order-1 lg:order-2">
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Slide Content</h2>
                <GlassmorphismButton size="sm">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  AI Enhance
                </GlassmorphismButton>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-semibold mb-2">Slide Title</label>
                  <input 
                    type="text" 
                    value={slideData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Subtitle</label>
                  <input 
                    type="text" 
                    value={slideData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Content</label>
                  <textarea 
                    rows={6} 
                    value={slideData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none resize-none text-white"
                    placeholder="Add your slide content here..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-2">Background Style</label>
                  <select 
                    value={slideData.backgroundStyle}
                    onChange={(e) => handleInputChange('backgroundStyle', e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 bg-transparent outline-none text-white"
                  >
                    <option value="gradient1" className="bg-slate-800">Purple Gradient</option>
                    <option value="gradient2" className="bg-slate-800">Blue Gradient</option>
                    <option value="solid" className="bg-slate-800">Solid Color</option>
                    <option value="image" className="bg-slate-800">Custom Image</option>
                  </select>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="button" 
                    className="flex-1 glassmorphism rounded-lg p-3 hover:bg-white/10 transition-colors"
                  >
                    <Image className="w-4 h-4 inline mr-2" />
                    Add Image
                  </button>
                  <button 
                    type="button" 
                    className="flex-1 glassmorphism rounded-lg p-3 hover:bg-white/10 transition-colors"
                  >
                    <BarChart className="w-4 h-4 inline mr-2" />
                    Add Chart
                  </button>
                </div>
                
                <GlassmorphismButton type="submit" className="w-full">
                  Update Slide
                </GlassmorphismButton>
              </form>
              
              {/* AI Suggestions */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="w-4 h-4 mr-2 text-green-500" />
                  AI Suggestions
                </h3>
                <div className="space-y-2">
                  {aiSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={index}
                      className="w-full text-left p-3 glassmorphism rounded-lg text-sm hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AIPresentations;
