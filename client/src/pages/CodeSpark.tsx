import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Check, 
  Play, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Clock 
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const CodeSpark = () => {
  const [code, setCode] = useState(`# Write your FizzBuzz solution here
for i in range(1, 11):
    # Your code here
    pass`);

  const roadmapItems = [
    {
      id: 1,
      title: "Python Basics",
      description: "Variables, data types, and basic operations",
      completed: true,
      progress: 100,
      color: "green"
    },
    {
      id: 2,
      title: "Control Structures",
      description: "If statements, loops, and conditionals",
      completed: false,
      progress: 75,
      color: "blue",
      current: true
    },
    {
      id: 3,
      title: "Functions & Modules",
      description: "Creating reusable code blocks",
      completed: false,
      progress: 0,
      color: "gray"
    },
    {
      id: 4,
      title: "Object-Oriented Programming",
      description: "Classes, objects, and inheritance",
      completed: false,
      progress: 0,
      color: "gray"
    },
    {
      id: 5,
      title: "Web Development",
      description: "Flask, Django, and APIs",
      completed: false,
      progress: 0,
      color: "gray"
    }
  ];

  const codeExamples = [
    {
      title: "Age Checker",
      code: `age = 18

if age >= 18:
    print("You are an adult!")
    print("You can vote.")
else:
    print("You are a minor.")
    print("Wait until you're 18 to vote.")

print("Thanks for checking!")`
    },
    {
      title: "Counting Loop",
      code: `fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(f"I like {fruit}!")

for i in range(5):
    print(f"Count: {i}")`
    }
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
          {/* Learning Roadmap */}
          <div className="lg:col-span-1">
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
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.completed 
                        ? 'bg-green-500' 
                        : item.current 
                          ? 'bg-blue-500 animate-pulse' 
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
                        'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-400">{item.description}</p>
                      <div className={`mt-2 rounded-full h-2 ${
                        item.color === 'green' ? 'bg-green-500/20' :
                        item.color === 'blue' ? 'bg-blue-500/20' :
                        'bg-white/10'
                      }`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            item.color === 'green' ? 'bg-green-500' :
                            item.color === 'blue' ? 'bg-blue-500' :
                            'bg-white/20'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold mb-3">Learning Resources</h3>
                <motion.div 
                  className="glassmorphism rounded-lg p-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Python Tutorial Series</p>
                      <p className="text-xs text-slate-400">15 videos • 3.2M views</p>
                    </div>
                  </div>
                </motion.div>
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
              {/* Lesson Header */}
              <div className="border-b border-white/10 p-6">
                <h2 className="text-2xl font-bold mb-2">Lesson 2: Control Structures</h2>
                <p className="text-slate-400">Learn how to control the flow of your Python programs using if statements and loops.</p>
              </div>
              
              {/* Lesson Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">If Statements</h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    If statements allow your program to make decisions based on conditions. They execute different code blocks depending on whether a condition is true or false.
                  </p>
                  
                  {/* Code Example */}
                  <motion.div 
                    className="glassmorphism rounded-lg p-4 mb-4"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold">Example: Age Checker</span>
                      <GlassmorphismButton size="sm">
                        <Play className="w-3 h-3 inline mr-1" />
                        Run
                      </GlassmorphismButton>
                    </div>
                    <pre className="text-sm text-green-400 font-mono">
                      <code>{codeExamples[0].code}</code>
                    </pre>
                  </motion.div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">For Loops</h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">
                    For loops allow you to repeat code a specific number of times or iterate through collections like lists.
                  </p>
                  
                  <motion.div 
                    className="glassmorphism rounded-lg p-4 mb-4"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold">Example: Counting Loop</span>
                      <GlassmorphismButton size="sm">
                        <Play className="w-3 h-3 inline mr-1" />
                        Run
                      </GlassmorphismButton>
                    </div>
                    <pre className="text-sm text-green-400 font-mono">
                      <code>{codeExamples[1].code}</code>
                    </pre>
                  </motion.div>
                </div>
                
                {/* Interactive Exercise */}
                <motion.div 
                  className="glassmorphism rounded-lg p-6 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Practice Exercise</h3>
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">
                      Interactive
                    </span>
                  </div>
                  <p className="text-slate-400 mb-4">
                    Write a program that prints numbers from 1 to 10, but replaces multiples of 3 with "Fizz" and multiples of 5 with "Buzz".
                  </p>
                  
                  {/* Monaco Editor Placeholder */}
                  <div className="bg-slate-800 rounded-lg p-4 font-mono text-sm min-h-[200px] relative">
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <GlassmorphismButton size="sm" variant="outline">
                        <Play className="w-3 h-3" />
                      </GlassmorphismButton>
                      <GlassmorphismButton size="sm" variant="outline">
                        <RotateCcw className="w-3 h-3" />
                      </GlassmorphismButton>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-full bg-transparent resize-none outline-none text-green-400 font-mono"
                      spellCheck={false}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <GlassmorphismButton>
                        Check Solution
                      </GlassmorphismButton>
                      <GlassmorphismButton variant="outline">
                        Get Hint
                      </GlassmorphismButton>
                    </div>
                    <div className="text-sm text-slate-400">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Est. time: 10 minutes
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Navigation */}
              <div className="border-t border-white/10 p-6 flex items-center justify-between">
                <GlassmorphismButton variant="outline">
                  <ChevronLeft className="w-4 h-4 inline mr-2" />
                  Previous Lesson
                </GlassmorphismButton>
                <GlassmorphismButton>
                  Next Lesson
                  <ChevronRight className="w-4 h-4 inline ml-2" />
                </GlassmorphismButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CodeSpark;
