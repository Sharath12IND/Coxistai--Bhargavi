import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Plus,
  FileText,
  Trash2,
  Edit3,
  Save,
  X,
  Tag
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

const NotesHub = () => {
  const { toast } = useToast();
  
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNewNoteDialog, setShowNewNoteDialog] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteTags, setNewNoteTags] = useState("");
  const [newNoteCategory, setNewNoteCategory] = useState("Math");
  const [isEditing, setIsEditing] = useState(false);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('coexist-notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        
        // Load default notes if none exist
        if (parsedNotes.length === 0) {
          loadDefaultNotes();
        }
      } catch (error) {
        console.error('Error parsing saved notes:', error);
        loadDefaultNotes();
      }
    } else {
      loadDefaultNotes();
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('coexist-notes', JSON.stringify(notes));
  }, [notes]);

  const loadDefaultNotes = () => {
    const defaultNotes: Note[] = [
      {
        id: "1",
        title: "Calculus Derivatives",
        content: `<h1>Calculus Derivatives</h1>
        
<h2>Definition</h2>
<p>The derivative of a function measures the rate at which the function's value changes with respect to changes in its input. It represents the slope of the tangent line to the function's graph at any given point.</p>

<h2>Basic Formula</h2>
<p><strong>f'(x) = lim(h→0) [f(x+h) - f(x)] / h</strong></p>

<h2>Common Derivatives</h2>
<ul>
  <li><strong>d/dx(x^n) = nx^(n-1)</strong></li>
  <li><strong>d/dx(sin x) = cos x</strong></li>
  <li><strong>d/dx(cos x) = -sin x</strong></li>
  <li><strong>d/dx(e^x) = e^x</strong></li>
</ul>

<h2>Chain Rule</h2>
<p>For composite functions: <strong>d/dx[f(g(x))] = f'(g(x)) · g'(x)</strong></p>`,
        tags: ["Math", "Calculus"],
        category: "Math",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Organic Chemistry Basics",
        content: `<h1>Organic Chemistry Basics</h1>
        
<h2>Hydrocarbons</h2>
<p>Organic compounds consisting entirely of hydrogen and carbon atoms.</p>

<h3>Types:</h3>
<ul>
  <li><strong>Alkanes</strong> - Single bonds only (saturated)</li>
  <li><strong>Alkenes</strong> - One or more double bonds</li>
  <li><strong>Alkynes</strong> - One or more triple bonds</li>
</ul>

<h2>Functional Groups</h2>
<p>Specific arrangements of atoms that give organic molecules their characteristic properties.</p>`,
        tags: ["Chemistry"],
        category: "Science",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        title: "World War II Timeline",
        content: `<h1>World War II Timeline</h1>
        
<h2>Key Events</h2>
<ul>
  <li><strong>1939</strong> - Germany invades Poland, Britain and France declare war</li>
  <li><strong>1940</strong> - Battle of Britain, Blitz begins</li>
  <li><strong>1941</strong> - Pearl Harbor attack, US enters war</li>
  <li><strong>1942</strong> - Battle of Stalingrad begins</li>
  <li><strong>1944</strong> - D-Day invasion of Normandy</li>
  <li><strong>1945</strong> - Germany surrenders, atomic bombs dropped on Japan</li>
</ul>`,
        tags: ["History"],
        category: "History",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    setNotes(defaultNotes);
  };

  const categories = ["All", "Math", "Science", "History", "Literature", "Physics", "Chemistry"];
  
  const filteredNotes = notes.filter((note: Note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || note.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your note.",
        variant: "destructive",
      });
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: `<h1>${newNoteTitle}</h1><p>Start writing your notes here...</p>`,
      tags: newNoteTags.split(",").map(tag => tag.trim()).filter(Boolean),
      category: newNoteCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setShowNewNoteDialog(false);
    setNewNoteTitle("");
    setNewNoteTags("");
    setNewNoteCategory("Math");

    toast({
      title: "Note Created",
      description: "Your new note has been created successfully.",
    });
  };

  const handleUpdateNote = (content: string) => {
    if (!selectedNote) return;

    const updatedNote = {
      ...selectedNote,
      content,
      updatedAt: new Date().toISOString(),
    };

    setNotes(prev => prev.map(note => 
      note.id === selectedNote.id ? updatedNote : note
    ));
    setSelectedNote(updatedNote);
  };

  const handleSaveNote = () => {
    setIsEditing(false);
    toast({
      title: "Note Saved",
      description: "Your note has been saved successfully.",
    });
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setIsEditing(false);
    }
    toast({
      title: "Note Deleted",
      description: "Note has been removed from your library.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Notes Hub</h2>
                <GlassmorphismButton
                  onClick={() => setShowNewNoteDialog(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-500"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Note
                </GlassmorphismButton>
              </div>
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
              {filteredNotes.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  No notes found. Create your first note to get started.
                </div>
              ) : (
                filteredNotes.map((note: Note, index: number) => (
                  <motion.div
                    key={note.id}
                    className={`glassmorphism rounded-lg p-4 hover:bg-white/5 transition-all cursor-pointer ${
                      selectedNote?.id === note.id ? 'border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => {
                      setSelectedNote(note);
                      setIsEditing(false);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <h3 className="font-semibold text-white truncate">{note.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400">
                          {formatDate(note.updatedAt)}
                        </p>
                        <p className="text-xs text-green-400 mb-2">{note.category}</p>
                        {note.tags.length > 0 && (
                          <div className="flex space-x-1 flex-wrap">
                            {note.tags.map((tag: string) => (
                              <span 
                                key={tag}
                                className="px-2 py-1 rounded text-xs bg-blue-500/20 text-blue-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNote(note.id);
                          }}
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          
          {/* Editor */}
          <div className="lg:w-2/3">
            {selectedNote ? (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Note Header */}
                <div className="glassmorphism rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white">{selectedNote.title}</h3>
                    <p className="text-sm text-slate-400">
                      {selectedNote.category} • Last edited {formatDate(selectedNote.updatedAt)}
                    </p>
                    {selectedNote.tags.length > 0 && (
                      <div className="flex space-x-2 mt-2">
                        {selectedNote.tags.map((tag: string) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400"
                          >
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <GlassmorphismButton 
                        onClick={handleSaveNote}
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-blue-500"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </GlassmorphismButton>
                    ) : (
                      <GlassmorphismButton 
                        onClick={() => setIsEditing(true)}
                        size="sm"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </GlassmorphismButton>
                    )}
                  </div>
                </div>
                
                {/* Rich Text Editor */}
                {isEditing ? (
                  <RichTextEditor
                    content={selectedNote.content}
                    onUpdate={handleUpdateNote}
                    title={selectedNote.title}
                  />
                ) : (
                  <motion.div 
                    className="glassmorphism rounded-xl p-6 min-h-[400px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="prose prose-invert max-w-none text-white"
                      dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="glassmorphism rounded-xl flex items-center justify-center h-96 text-slate-400"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">No Note Selected</h3>
                  <p>Select a note from the library or create a new one to get started.</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* New Note Dialog */}
        <Dialog open={showNewNoteDialog} onOpenChange={setShowNewNoteDialog}>
          <DialogContent className="bg-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Title</Label>
                <Input
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Enter note title"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Category</Label>
                <select
                  value={newNoteCategory}
                  onChange={(e) => setNewNoteCategory(e.target.value)}
                  className="w-full p-3 glassmorphism rounded-lg bg-white/5 border-white/20 text-white"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category} className="bg-slate-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-white">Tags (comma separated)</Label>
                <Input
                  value={newNoteTags}
                  onChange={(e) => setNewNoteTags(e.target.value)}
                  placeholder="e.g., calculus, derivatives, math"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowNewNoteDialog(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateNote}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  Create Note
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default NotesHub;