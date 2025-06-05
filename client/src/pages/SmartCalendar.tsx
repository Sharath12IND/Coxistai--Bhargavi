import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Clock, 
  Users, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const SmartCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState("December 2024");
  const [selectedView, setSelectedView] = useState("Month");

  const quickActions = [
    { icon: Plus, label: "Add Event", variant: "default" as const },
    { icon: Clock, label: "Schedule Study Session", variant: "outline" as const },
    { icon: Users, label: "Group Study", variant: "outline" as const },
    { icon: CalendarIcon, label: "Sync Google Calendar", variant: "outline" as const }
  ];

  const todaysTasks = [
    { id: 1, task: "Review calculus notes", completed: false },
    { id: 2, task: "Complete chemistry lab", completed: true },
    { id: 3, task: "Study group @ 3 PM", completed: false }
  ];

  const aiSuggestions = [
    "📚 Schedule 2-hour study block for upcoming exam",
    "☕ Take a 15-minute break in 1 hour",
    "🏃 Plan exercise session for stress relief"
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const eventDays = [15, 17, 22]; // Days with events

  const views = ["Month", "Week", "Day"];

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
            Smart Calendar
          </motion.h1>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Intelligent scheduling with AI-powered suggestions
          </motion.p>
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
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <GlassmorphismButton 
                      variant={action.variant}
                      className="w-full justify-start"
                    >
                      <action.icon className="w-4 h-4 inline mr-2" />
                      {action.label}
                    </GlassmorphismButton>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="glassmorphism rounded-xl p-6 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="font-semibold mb-3">Today's Tasks</h3>
              <div className="space-y-3">
                {todaysTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <input 
                      type="checkbox" 
                      checked={task.completed}
                      className="w-4 h-4 rounded border-white/20 bg-transparent"
                      readOnly
                    />
                    <span className={`text-sm ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {task.task}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="font-semibold mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-green-500" />
                AI Suggestions
              </h3>
              <div className="space-y-2 text-sm">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="p-2 glassmorphism rounded cursor-pointer hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {suggestion}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Calendar */}
          <div className="lg:col-span-3">
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{currentMonth}</h2>
                <div className="flex items-center space-x-3">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <GlassmorphismButton size="sm">Today</GlassmorphismButton>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="flex space-x-1 ml-4">
                    {views.map((view) => (
                      <button
                        key={view}
                        onClick={() => setSelectedView(view)}
                        className={`px-3 py-1 rounded text-sm transition-all duration-300 ${
                          selectedView === view 
                            ? 'glassmorphism-button' 
                            : 'glassmorphism hover:bg-white/10'
                        }`}
                      >
                        {view}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {/* Header */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 text-slate-400 font-semibold">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {calendarDays.map((day) => (
                  <motion.div
                    key={day}
                    className="aspect-square p-1"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: day * 0.01, duration: 0.3 }}
                  >
                    <div className={`h-full glassmorphism rounded text-center text-sm pt-1 transition-all duration-300 hover:bg-white/10 cursor-pointer ${
                      day === 22 ? 'border-2 border-blue-500' : ''
                    }`}>
                      <div className={`font-semibold ${day === 22 ? 'text-blue-400' : 'text-white'}`}>
                        {day}
                      </div>
                      {eventDays.includes(day) && (
                        <div className={`text-xs rounded mt-1 py-1 mx-1 ${
                          day === 15 ? 'bg-blue-500 text-white' :
                          day === 17 ? 'bg-green-500 text-white' :
                          'bg-purple-500 text-white'
                        }`}>
                          {day === 15 ? 'Math Exam' :
                           day === 17 ? 'Study Group' :
                           'Project Due'}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Event Legend */}
              <motion.div 
                className="flex items-center space-x-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Exams</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Study Sessions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Assignments</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SmartCalendar;
