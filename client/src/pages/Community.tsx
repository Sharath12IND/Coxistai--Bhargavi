import { motion } from "framer-motion";
import { 
  Pin, 
  MessageSquare, 
  Eye, 
  Download, 
  Heart, 
  Plus 
} from "lucide-react";
import { MOCK_COMMUNITY_DATA } from "@/lib/constants";

const Community = () => {
  const categories = [
    { emoji: "📚", name: "Study Groups", count: 234 },
    { emoji: "❓", name: "Q&A", count: 567 },
    { emoji: "📝", name: "Shared Notes", count: 123 },
    { emoji: "🎯", name: "Project Help", count: 89 }
  ];

  const topContributors = [
    { name: "Alex Johnson", initials: "A", helpfulAnswers: 245 },
    { name: "Sarah Chen", initials: "S", helpfulAnswers: 189 }
  ];

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
            SparkHub Community
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center space-x-4 text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>500 users online</span>
            </div>
            <span>•</span>
            <span>12,847 total members</span>
          </motion.div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="glassmorphism rounded-xl p-6 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <motion.a
                    key={category.name}
                    href="#"
                    className="block p-3 rounded-lg hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.emoji} {category.name}</span>
                      <span className="text-sm text-slate-400">{category.count}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="font-bold mb-4">Top Contributors</h3>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.name}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                      index === 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gradient-to-r from-green-500 to-blue-500'
                    }`}>
                      {contributor.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{contributor.name}</p>
                      <p className="text-xs text-slate-400">{contributor.helpfulAnswers} helpful answers</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {MOCK_COMMUNITY_DATA.map((thread, index) => (
                <motion.div
                  key={thread.id}
                  className={`glassmorphism rounded-xl p-6 hover:bg-white/5 transition-all duration-300 ${
                    thread.isPinned ? 'border-l-4 border-green-500' : ''
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {thread.isPinned && <Pin className="w-4 h-4 text-green-500" />}
                      {thread.isPinned && (
                        <span className="px-2 py-1 bg-green-500/20 rounded text-xs font-semibold text-green-400">
                          Pinned
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${
                        thread.category === 'Study Groups' ? 'bg-blue-500/20 text-blue-400' :
                        thread.category === 'Q&A' ? 'bg-orange-500/20 text-orange-400' :
                        thread.category === 'Shared Notes' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {thread.category}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">{thread.timeAgo}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{thread.title}</h3>
                  <p className="text-slate-400 mb-3">{thread.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      {thread.replies !== undefined && (
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{thread.replies} replies</span>
                        </div>
                      )}
                      {thread.views && (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{thread.views} views</span>
                        </div>
                      )}
                      {thread.downloads && (
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{thread.downloads} downloads</span>
                        </div>
                      )}
                      {thread.likes && (
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{thread.likes} likes</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        thread.avatar === 'MT' ? 'bg-gradient-to-r from-blue-500 to-green-500' :
                        thread.avatar === 'J' ? 'bg-gray-500' :
                        'bg-blue-500'
                      }`}>
                        {thread.avatar}
                      </div>
                      <span className="text-sm font-semibold">{thread.author}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Floating Action Button */}
            <motion.button 
              className="fixed bottom-8 right-8 w-14 h-14 glassmorphism-button rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Community;
