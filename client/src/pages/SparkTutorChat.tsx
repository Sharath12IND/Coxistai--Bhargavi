import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Mic, 
  Paperclip, 
  Send, 
  User 
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
}

const SparkTutorChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm SparkTutor, your AI learning assistant. I can help you with homework, explain concepts, solve problems, and much more. How can I assist you today?",
      isAI: true,
      timestamp: "10:30 AM"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "That's a great question! Let me help you understand this concept step by step. Would you like me to break it down with examples?",
        isAI: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <main className="relative z-10 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            SparkTutor Chat
          </motion.h1>
          <motion.p 
            className="text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Your AI learning companion is here to help
          </motion.p>
        </div>
        
        <motion.div 
          className="glassmorphism rounded-xl overflow-hidden h-[600px] flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Chat Header */}
          <div className="border-b border-white/10 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">SparkTutor AI</h3>
                <p className="text-sm text-slate-400">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">AI Ready</span>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex items-start space-x-3 ${message.isAI ? '' : 'justify-end'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {message.isAI && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-lg p-3 rounded-lg ${
                  message.isAI 
                    ? 'glassmorphism rounded-tl-none' 
                    : 'bg-blue-500 rounded-tr-none'
                }`}>
                  <p className="text-white">{message.content}</p>
                  <p className="text-xs text-slate-400 mt-2">{message.timestamp}</p>
                </div>
                
                {!message.isAI && (
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 glassmorphism rounded-xl p-3">
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..." 
                  className="w-full bg-transparent resize-none outline-none placeholder-slate-400 text-white"
                  rows={1}
                />
              </div>
              <div className="flex space-x-2">
                <GlassmorphismButton 
                  size="sm" 
                  variant="outline"
                  className="p-3"
                  title="Voice Input"
                >
                  <Mic className="w-5 h-5" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  size="sm" 
                  variant="outline"
                  className="p-3"
                  title="Attach File"
                >
                  <Paperclip className="w-5 h-5" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  size="sm"
                  className="p-3"
                  onClick={handleSendMessage}
                  title="Send Message"
                >
                  <Send className="w-5 h-5" />
                </GlassmorphismButton>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Max file size: 5MB • Supports images, documents, and audio</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default SparkTutorChat;
