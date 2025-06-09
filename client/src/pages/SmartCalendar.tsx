import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Clock, 
  Users, 
  Calendar as CalendarIcon, 
  Sparkles,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Bell,
  X
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay, getYear, getMonth, startOfWeek, endOfWeek } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  duration: number; // in minutes
  location?: string;
  type: 'study' | 'exam' | 'assignment' | 'personal' | 'group';
  color: string;
  reminder?: number; // minutes before
  googleEventId?: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  priority: 'low' | 'medium' | 'high';
}

const SmartCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [showYearSelector, setShowYearSelector] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  
  // Event and task storage (localStorage for now)
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('smart-calendar-events');
    return saved ? JSON.parse(saved).map((e: any) => ({ ...e, date: new Date(e.date) })) : [];
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('smart-calendar-tasks');
    return saved ? JSON.parse(saved).map((t: any) => ({ ...t, date: new Date(t.date) })) : [];
  });

  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    time: '09:00',
    duration: 60,
    type: 'study',
    color: '#3B82F6',
    reminder: 15
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('smart-calendar-events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('smart-calendar-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Event type colors
  const eventColors = {
    study: '#3B82F6',
    exam: '#EF4444',
    assignment: '#F59E0B',
    personal: '#10B981',
    group: '#8B5CF6'
  };

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  // Get calendar days for current view
  const getCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  // Get tasks for a specific date
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(task.date, date));
  };

  // Add or update event
  const saveEvent = () => {
    if (!newEvent.title || !selectedDate) return;

    const eventData: CalendarEvent = {
      id: editingEvent?.id || Date.now().toString(),
      title: newEvent.title!,
      description: newEvent.description,
      date: selectedDate,
      time: newEvent.time!,
      duration: newEvent.duration!,
      location: newEvent.location,
      type: newEvent.type!,
      color: eventColors[newEvent.type!],
      reminder: newEvent.reminder
    };

    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === editingEvent.id ? eventData : e));
    } else {
      setEvents(prev => [...prev, eventData]);
    }

    resetEventDialog();
  };

  // Delete event
  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  };

  // Reset event dialog
  const resetEventDialog = () => {
    setShowEventDialog(false);
    setEditingEvent(null);
    setNewEvent({
      title: '',
      description: '',
      time: '09:00',
      duration: 60,
      type: 'study',
      color: '#3B82F6',
      reminder: 15
    });
    setSelectedDate(null);
  };

  // Open event dialog for specific date with optional event type preset
  const openEventDialog = (date: Date, event?: CalendarEvent, eventType?: 'study' | 'exam' | 'assignment' | 'personal' | 'group') => {
    setSelectedDate(date);
    if (event) {
      setEditingEvent(event);
      setNewEvent({
        title: event.title,
        description: event.description,
        time: event.time,
        duration: event.duration,
        location: event.location,
        type: event.type,
        reminder: event.reminder
      });
    } else if (eventType) {
      // Pre-set the event type and title based on the button clicked
      const typeDefaults = {
        study: { title: 'Study Session', duration: 60 },
        exam: { title: 'Exam', duration: 120 },
        assignment: { title: 'Assignment Due', duration: 30 },
        group: { title: 'Group Study', duration: 90 },
        personal: { title: 'Personal Event', duration: 60 }
      };
      
      setNewEvent({
        title: typeDefaults[eventType].title,
        description: '',
        time: '09:00',
        duration: typeDefaults[eventType].duration,
        type: eventType,
        color: eventColors[eventType],
        reminder: 15
      });
    }
    setShowEventDialog(true);
  };

  // Year and month navigation
  const navigateToYear = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setShowYearSelector(false);
  };

  const navigateToMonth = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    setCurrentDate(newDate);
    setShowMonthSelector(false);
  };

  // Generate year range for selector
  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Toggle task completion
  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  // Add new task
  const addTask = (title: string, date: Date, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      date,
      priority
    };
    setTasks(prev => [...prev, newTask]);
  };

  // Generate Google Calendar link
  const generateGoogleCalendarLink = (event: CalendarEvent) => {
    const startDate = new Date(event.date);
    const [hours, minutes] = event.time.split(':').map(Number);
    startDate.setHours(hours, minutes);
    
    const endDate = new Date(startDate.getTime() + event.duration * 60000);
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: event.description || '',
      location: event.location || ''
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  // AI suggestions based on current schedule
  const getAISuggestions = () => {
    const today = new Date();
    const todaysEvents = getEventsForDate(today);
    const upcomingExams = events.filter(e => e.type === 'exam' && e.date > today).length;
    
    const suggestions = [];
    
    if (todaysEvents.length === 0) {
      suggestions.push("📚 Your schedule is free today - perfect time for focused study!");
    }
    
    if (upcomingExams > 0) {
      suggestions.push(`⚡ You have ${upcomingExams} upcoming exam${upcomingExams > 1 ? 's' : ''} - schedule review sessions`);
    }
    
    if (todaysEvents.length > 3) {
      suggestions.push("⏰ Busy day ahead - consider scheduling short breaks between sessions");
    }
    
    suggestions.push("🎯 Set up study reminders 15 minutes before each session");
    
    return suggestions;
  };

  const calendarDays = getCalendarDays();
  const todaysTasks = getTasksForDate(new Date());
  const aiSuggestions = getAISuggestions();

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
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <GlassmorphismButton
                  onClick={() => openEventDialog(new Date())}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </GlassmorphismButton>
                <GlassmorphismButton
                  onClick={() => openEventDialog(new Date(), undefined, 'study')}
                  variant="outline"
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Study Session
                </GlassmorphismButton>
                <GlassmorphismButton
                  onClick={() => openEventDialog(new Date(), undefined, 'group')}
                  variant="outline"
                  className="w-full"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Group Study
                </GlassmorphismButton>
                <GlassmorphismButton
                  onClick={navigateToToday}
                  variant="outline"
                  className="w-full"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Go to Today
                </GlassmorphismButton>
              </div>
            </motion.div>

            {/* Today's Tasks */}
            <motion.div 
              className="glassmorphism rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="font-semibold mb-3">Today's Tasks</h3>
              <div className="space-y-2">
                {todaysTasks.length === 0 ? (
                  <p className="text-slate-400 text-sm">No tasks for today</p>
                ) : (
                  todaysTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      className="flex items-center space-x-2 p-2 glassmorphism rounded cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                      whileHover={{ scale: 1.02 }}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-400" />
                      )}
                      <span className={`text-sm flex-1 ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
            
            {/* AI Suggestions */}
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
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowMonthSelector(true)}
                      className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
                    >
                      {format(currentDate, 'MMMM')}
                    </button>
                    <button
                      onClick={() => setShowYearSelector(true)}
                      className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
                    >
                      {format(currentDate, 'yyyy')}
                    </button>
                  </div>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm">Month View</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 text-slate-400 font-semibold">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const dayTasks = getTasksForDate(day);
                  const isCurrentMonth = getMonth(day) === getMonth(currentDate);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  
                  return (
                    <motion.div
                      key={day.toISOString()}
                      className={`min-h-[120px] p-2 border border-white/10 rounded-lg cursor-pointer transition-all duration-300 ${
                        isToday(day) ? 'border-blue-500 bg-blue-500/10' :
                        isSelected ? 'border-green-500 bg-green-500/10' :
                        isCurrentMonth ? 'hover:bg-white/5' : 'opacity-50'
                      }`}
                      onClick={() => setSelectedDate(day)}
                      onDoubleClick={() => openEventDialog(day)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01, duration: 0.3 }}
                    >
                      <div className={`text-sm font-semibold mb-1 ${
                        isToday(day) ? 'text-blue-400' :
                        isCurrentMonth ? 'text-white' : 'text-slate-500'
                      }`}>
                        {format(day, 'd')}
                      </div>
                      
                      {/* Events */}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded text-white truncate"
                            style={{ backgroundColor: event.color }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openEventDialog(day, event);
                            }}
                          >
                            {event.time} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-slate-400">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                      
                      {/* Tasks indicator */}
                      {dayTasks.length > 0 && (
                        <div className="mt-1 flex items-center">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                          <span className="text-xs text-slate-400">{dayTasks.length}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Year Selector Dialog */}
        <Dialog open={showYearSelector} onOpenChange={setShowYearSelector}>
          <DialogContent className="max-w-md bg-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Select Year</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-4 gap-2 mt-4 max-h-60 overflow-y-auto">
              {getYearRange().map((year) => (
                <button
                  key={year}
                  onClick={() => navigateToYear(year)}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    year === getYear(currentDate)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Month Selector Dialog */}
        <Dialog open={showMonthSelector} onOpenChange={setShowMonthSelector}>
          <DialogContent className="max-w-md bg-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Select Month</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => navigateToMonth(index)}
                  className={`p-3 rounded-lg text-sm transition-colors ${
                    index === getMonth(currentDate)
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Event Dialog */}
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogContent className="max-w-2xl bg-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{editingEvent ? 'Edit Event' : 'Add New Event'}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Event Title *
                </label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter event title..."
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <Textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Event description..."
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Time
                  </label>
                  <Input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Location
                </label>
                <Input
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Event location..."
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Event Type
                  </label>
                  <Select 
                    value={newEvent.type} 
                    onValueChange={(value: 'study' | 'exam' | 'assignment' | 'personal' | 'group') => setNewEvent(prev => ({ ...prev, type: value, color: eventColors[value as keyof typeof eventColors] }))}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="study">Study Session</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                      <SelectItem value="group">Group Study</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Reminder (minutes before)
                  </label>
                  <Select 
                    value={newEvent.reminder?.toString()} 
                    onValueChange={(value) => setNewEvent(prev => ({ ...prev, reminder: parseInt(value) }))}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="0">No reminder</SelectItem>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <div className="flex space-x-2">
                  {editingEvent && (
                    <GlassmorphismButton
                      variant="outline"
                      onClick={() => {
                        deleteEvent(editingEvent.id);
                        resetEventDialog();
                      }}
                      className="text-red-400 border-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </GlassmorphismButton>
                  )}
                  {editingEvent && (
                    <GlassmorphismButton
                      variant="outline"
                      onClick={() => window.open(generateGoogleCalendarLink(editingEvent), '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Add to Google
                    </GlassmorphismButton>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <GlassmorphismButton variant="outline" onClick={resetEventDialog}>
                    Cancel
                  </GlassmorphismButton>
                  <GlassmorphismButton 
                    onClick={saveEvent}
                    disabled={!newEvent.title}
                    className="bg-gradient-to-r from-blue-500 to-green-500"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </GlassmorphismButton>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default SmartCalendar;