import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Clock,
  ExternalLink,
  Book,
  Video,
  Code,
  Terminal,
  Download,
  Search,
  Plus,
  X,
  Upload
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CodeSpark = () => {
  const [code, setCode] = useState(`print("Hello, World!")
# Write your Python code here`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [customCourse, setCustomCourse] = useState({ name: "", query: "" });
  const [searchQuery, setSearchQuery] = useState("");

  // Default courses with YouTube links
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Python Full Course",
      description: "Complete Python tutorial for beginners",
      duration: "4 hours",
      views: "15M",
      youtubeUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
      thumbnail: "🐍"
    },
    {
      id: 2,
      name: "JavaScript Crash Course",
      description: "Learn JavaScript fundamentals quickly",
      duration: "2.5 hours",
      views: "8M",
      youtubeUrl: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
      thumbnail: "🟨"
    },
    {
      id: 3,
      name: "React Tutorial",
      description: "Modern React development with hooks",
      duration: "3 hours",
      views: "5M",
      youtubeUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      thumbnail: "⚛️"
    },
    {
      id: 4,
      name: "Node.js Backend Course",
      description: "Build APIs and servers with Node.js",
      duration: "6 hours",
      views: "3M",
      youtubeUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
      thumbnail: "🟢"
    },
    {
      id: 5,
      name: "SQL Database Tutorial",
      description: "Master database queries and design",
      duration: "2 hours",
      views: "4M",
      youtubeUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      thumbnail: "🗄️"
    }
  ]);

  const roadmapItems = [
    {
      id: 1,
      title: "Programming Fundamentals",
      description: "Variables, data types, and basic operations",
      completed: true,
      progress: 100,
      color: "green",
      lessons: ["Variables & Data Types", "Basic Operations", "Input/Output"]
    },
    {
      id: 2,
      title: "Control Structures",
      description: "If statements, loops, and conditionals",
      completed: false,
      progress: 75,
      color: "blue",
      current: true,
      lessons: ["If Statements", "For Loops", "While Loops", "Switch Cases"]
    },
    {
      id: 3,
      title: "Functions & Modules",
      description: "Creating reusable code blocks",
      completed: false,
      progress: 30,
      color: "orange",
      lessons: ["Function Definition", "Parameters", "Return Values", "Modules"]
    },
    {
      id: 4,
      title: "Data Structures",
      description: "Arrays, lists, objects, and more",
      completed: false,
      progress: 0,
      color: "gray",
      lessons: ["Arrays", "Objects", "Sets", "Maps"]
    },
    {
      id: 5,
      title: "Object-Oriented Programming",
      description: "Classes, objects, and inheritance",
      completed: false,
      progress: 0,
      color: "gray",
      lessons: ["Classes", "Objects", "Inheritance", "Polymorphism"]
    }
  ];

  const codeExamples: Record<string, Record<string, string>> = {
    python: {
      "Hello World": `print("Hello, World!")
print("Welcome to Python!")`,
      "Variables": `name = "Alice"
age = 25
height = 5.7
print(f"Name: {name}, Age: {age}, Height: {height}")`,
      "If Statement": `age = 18
if age >= 18:
    print("You can vote!")
else:
    print("Wait until you're 18")`,
      "For Loop": `for i in range(5):
    print(f"Count: {i}")
    
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(f"I like {fruit}")`
    },
    javascript: {
      "Hello World": `console.log("Hello, World!");
console.log("Welcome to JavaScript!");`,
      "Variables": `const name = "Alice";
let age = 25;
const height = 5.7;
console.log(\`Name: \${name}, Age: \${age}, Height: \${height}\`);`,
      "If Statement": `const age = 18;
if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("Wait until you're 18");
}`,
      "For Loop": `for (let i = 0; i < 5; i++) {
    console.log(\`Count: \${i}\`);
}

const fruits = ["apple", "banana", "orange"];
fruits.forEach(fruit => {
    console.log(\`I like \${fruit}\`);
});`
    }
  };

  // Code execution function (simulated for client-side)
  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");
    
    // Simulate code execution
    setTimeout(() => {
      try {
        if (selectedLanguage === "python") {
          // Simple Python simulation
          if (code.includes('print(')) {
            const printMatches = code.match(/print\((.*?)\)/g);
            if (printMatches) {
              const outputs = printMatches.map(match => {
                const content = match.replace(/print\(|\)/g, '').replace(/"/g, '').replace(/'/g, '');
                return content;
              });
              setOutput(outputs.join('\n'));
            }
          } else {
            setOutput("Code executed successfully");
          }
        } else if (selectedLanguage === "javascript") {
          // Simple JavaScript simulation
          if (code.includes('console.log(')) {
            const logMatches = code.match(/console\.log\((.*?)\)/g);
            if (logMatches) {
              const outputs = logMatches.map(match => {
                const content = match.replace(/console\.log\(|\)/g, '').replace(/"/g, '').replace(/'/g, '').replace(/`/g, '');
                return content;
              });
              setOutput(outputs.join('\n'));
            }
          } else {
            setOutput("Code executed successfully");
          }
        }
      } catch (error) {
        setOutput("Error: " + error);
      }
      setIsRunning(false);
    }, 1000);
  };

  // Open YouTube course
  const openCourse = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  // Add custom course
  const addCustomCourse = () => {
    if (customCourse.name && customCourse.query) {
      const newCourse = {
        id: courses.length + 1,
        name: customCourse.name,
        description: `Custom course: ${customCourse.query}`,
        duration: "Variable",
        views: "Custom",
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(customCourse.query)}`,
        thumbnail: "🎯"
      };
      setCourses([...courses, newCourse]);
      setCustomCourse({ name: "", query: "" });
      setShowAddCourseDialog(false);
    }
  };

  // Load code example
  const loadExample = (exampleName: string) => {
    const examples = codeExamples[selectedLanguage];
    if (examples && examples[exampleName]) {
      setCode(examples[exampleName]);
      setOutput("");
    }
  };

  // Filter courses based on search
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            CodeSpark Module
          </motion.h1>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Master programming with interactive lessons and hands-on practice
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Roadmap & Resources */}
          <div className="lg:col-span-1 space-y-6">
            {/* Learning Roadmap */}
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-6">Learning Roadmap</h2>
              <div className="space-y-4">
                {roadmapItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex items-start space-x-4 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.completed 
                        ? 'bg-green-500' 
                        : item.current 
                          ? 'bg-blue-500 animate-pulse' 
                          : item.color === 'orange' ? 'bg-orange-500' 
                          : 'glassmorphism'
                    }`}>
                      {item.completed ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-sm font-bold">{item.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        item.completed ? 'text-green-400' : 
                        item.current ? 'text-blue-400' : 
                        item.color === 'orange' ? 'text-orange-400' :
                        'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400">{item.description}</p>
                      {item.lessons && (
                        <div className="mt-1 text-xs text-slate-500">
                          {item.lessons.length} lessons
                        </div>
                      )}
                      <div className={`mt-2 rounded-full h-2 ${
                        item.color === 'green' ? 'bg-green-500/20' :
                        item.color === 'blue' ? 'bg-blue-500/20' :
                        item.color === 'orange' ? 'bg-orange-500/20' :
                        'bg-white/10'
                      }`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            item.color === 'green' ? 'bg-green-500' :
                            item.color === 'blue' ? 'bg-blue-500' :
                            item.color === 'orange' ? 'bg-orange-500' :
                            'bg-white/20'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Learning Resources */}
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Learning Resources</h3>
                <GlassmorphismButton 
                  size="sm" 
                  onClick={() => setShowAddCourseDialog(true)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </GlassmorphismButton>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredCourses.map((course) => (
                  <motion.div 
                    key={course.id}
                    className="glassmorphism rounded-lg p-3 cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => openCourse(course.youtubeUrl)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-xl">
                        {course.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-white truncate">{course.name}</p>
                        <p className="text-xs text-slate-400 truncate">{course.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-500">{course.duration}</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">{course.views} views</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Code Editor and Content */}
          <div className="lg:col-span-2">
            <motion.div 
              className="glassmorphism rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Code Editor Header */}
              <div className="border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Interactive Code Editor</h2>
                  <div className="flex items-center space-x-3">
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-slate-400 mt-2">Practice programming with real-time code execution</p>
              </div>
              
              {/* Code Examples */}
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold mb-4">Code Examples</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(codeExamples[selectedLanguage as keyof typeof codeExamples]).map((example) => (
                    <GlassmorphismButton
                      key={example}
                      variant="outline"
                      size="sm"
                      onClick={() => loadExample(example)}
                      className="text-left justify-start"
                    >
                      <Code className="w-3 h-3 mr-2" />
                      {example}
                    </GlassmorphismButton>
                  ))}
                </div>
              </div>
              
              {/* Code Editor */}
              <div className="p-6">
                <div className="bg-slate-800 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-slate-700 border-b border-slate-600">
                    <span className="text-sm text-slate-300">Code Editor</span>
                    <div className="flex space-x-2">
                      <GlassmorphismButton 
                        size="sm" 
                        onClick={runCode}
                        disabled={isRunning}
                      >
                        <Terminal className="w-3 h-3 mr-1" />
                        {isRunning ? "Running..." : "Run Code"}
                      </GlassmorphismButton>
                      <GlassmorphismButton 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setCode(selectedLanguage === "python" ? `print("Hello, World!")
# Write your Python code here` : `console.log("Hello, World!");
// Write your JavaScript code here`);
                          setOutput("");
                        }}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </GlassmorphismButton>
                    </div>
                  </div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 bg-slate-800 text-green-400 font-mono text-sm resize-none outline-none"
                    spellCheck={false}
                    placeholder={selectedLanguage === "python" ? "# Write Python code here..." : "// Write JavaScript code here..."}
                  />
                </div>
                
                {/* Output */}
                <div className="mt-4">
                  <div className="bg-slate-900 rounded-lg overflow-hidden">
                    <div className="p-3 bg-slate-800 border-b border-slate-700">
                      <span className="text-sm text-slate-300">Output</span>
                    </div>
                    <div className="p-4 min-h-[100px] font-mono text-sm">
                      {output ? (
                        <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                      ) : (
                        <span className="text-slate-500">Click "Run Code" to see output here...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Programming Theory */}
              <div className="p-6 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-4">Programming Concepts</h3>
                <div className="space-y-4">
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Variables & Data Types</h4>
                    <p className="text-slate-400 text-sm">
                      Variables store data values. Common data types include strings (text), integers (whole numbers), 
                      floats (decimal numbers), and booleans (true/false).
                    </p>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-2">Control Flow</h4>
                    <p className="text-slate-400 text-sm">
                      Control structures like if statements and loops allow programs to make decisions and repeat actions. 
                      They control the order in which code executes.
                    </p>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-semibold text-purple-400 mb-2">Functions</h4>
                    <p className="text-slate-400 text-sm">
                      Functions are reusable blocks of code that perform specific tasks. They help organize code 
                      and avoid repetition by allowing you to call the same code multiple times.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Course Dialog */}
      <Dialog open={showAddCourseDialog} onOpenChange={setShowAddCourseDialog}>
        <DialogContent className="max-w-md bg-slate-900 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Add Custom Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Course Name</label>
              <Input
                placeholder="e.g., Advanced React Patterns"
                value={customCourse.name}
                onChange={(e) => setCustomCourse(prev => ({ ...prev, name: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-2 block">Search Query</label>
              <Input
                placeholder="e.g., react hooks tutorial 2024"
                value={customCourse.query}
                onChange={(e) => setCustomCourse(prev => ({ ...prev, query: e.target.value }))}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <GlassmorphismButton
                variant="outline"
                onClick={() => setShowAddCourseDialog(false)}
              >
                Cancel
              </GlassmorphismButton>
              <GlassmorphismButton
                onClick={addCustomCourse}
                disabled={!customCourse.name || !customCourse.query}
              >
                Add Course
              </GlassmorphismButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default CodeSpark;
