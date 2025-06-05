import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Share, 
  Download, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Image, 
  Link 
} from "lucide-react";
import { MOCK_NOTES_DATA } from "@/lib/constants";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const NotesHub = () => {
  const [selectedNote, setSelectedNote] = useState(MOCK_NOTES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Math", "Science", "History"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredNotes = MOCK_NOTES_DATA.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || note.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <motion.div 
              className="glassmorphism rounded-xl p-6 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">Notes Hub</h2>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search notes..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full glassmorphism rounded-lg p-3 pl-10 bg-transparent outline-none placeholder-slate-400 text-white"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                        activeCategory === category 
                          ? 'glassmorphism-button' 
                          : 'glassmorphism hover:glassmorphism-button'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Notes List */}
            <div className="space-y-3">
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  className={`glassmorphism rounded-lg p-4 hover:bg-white/5 transition-all cursor-pointer ${
                    selectedNote.id === note.id ? 'border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedNote(note)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="font-semibold text-white">{note.title}</h3>
                  <p className="text-sm text-slate-400">Last edited {note.lastEdited}</p>
                  <div className="flex space-x-2 mt-2">
                    {note.tags.map((tag) => (
                      <span 
                        key={tag}
                        className={`px-2 py-1 rounded text-xs ${
                          tag === 'Math' || tag === 'History' 
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Editor */}
          <div className="lg:w-2/3">
            <motion.div 
              className="glassmorphism rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Editor Header */}
              <div className="border-b border-white/10 p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-white">{selectedNote.title}</h3>
                  <p className="text-sm text-slate-400">
                    {selectedNote.tags.join(' • ')}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                  <GlassmorphismButton size="sm" className="relative group">
                    <Download className="w-4 h-4 inline mr-2" />
                    Export PDF
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Premium Feature
                    </span>
                  </GlassmorphismButton>
                </div>
              </div>
              
              {/* Editor Toolbar */}
              <div className="border-b border-white/10 p-3 flex items-center space-x-3 flex-wrap">
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <Underline className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/20"></div>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <List className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <ListOrdered className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-white/20"></div>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <Link className="w-4 h-4" />
                </button>
              </div>
              
              {/* Editor Content */}
              <div className="p-6 min-h-[400px] text-white">
                <div className="prose prose-invert max-w-none">
                  <h1 className="text-2xl font-bold mb-4">{selectedNote.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: selectedNote.content.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotesHub;
