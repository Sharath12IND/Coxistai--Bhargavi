import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Mic, 
  Paperclip, 
  Send, 
  User,
  X,
  FileText,
  Image as ImageIcon
} from "lucide-react";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import FileUpload from "@/components/ui/file-upload";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UploadedFile {
  file: File;
  preview?: string;
  type: 'image' | 'pdf' | 'document' | 'other';
}

interface Message {
  id: string;
  content: string;
  isAI: boolean;
  timestamp: string;
  attachedFiles?: UploadedFile[];
}

const SparkTutorChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm SparkTutor, your AI learning assistant. I can help you with homework, explain concepts, solve problems, and much more. You can also upload files for me to analyze! How can I assist you today?",
      isAI: true,
      timestamp: "10:30 AM"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<UploadedFile[]>([]);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue || "Please analyze the attached files.",
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachedFiles: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setAttachedFiles([]);

    // Simulate AI response based on files
    setTimeout(() => {
      let aiContent = "That's a great question! Let me help you understand this concept step by step.";
      
      if (userMessage.attachedFiles && userMessage.attachedFiles.length > 0) {
        const fileTypes = userMessage.attachedFiles.map(f => f.type);
        if (fileTypes.includes('image')) {
          aiContent = "I can see the image you've uploaded! Based on what I observe, let me analyze this for you. The image appears to contain educational content that I can help explain step by step.";
        } else if (fileTypes.includes('pdf') || fileTypes.includes('document')) {
          aiContent = "I've analyzed the document you uploaded. Let me break down the key concepts and help you understand the material better. What specific part would you like me to focus on?";
        }
        aiContent += " Feel free to ask specific questions about any part of the content!";
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiContent,
        isAI: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFilesChange = (files: UploadedFile[]) => {
    setAttachedFiles(files);
  };

  const removeAttachedFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: UploadedFile['type']) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'pdf': return <FileText className="w-4 h-4 text-red-400" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-400" />;
      default: return <FileText className="w-4 h-4" />;
    }
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
                  {/* Attached Files */}
                  {message.attachedFiles && message.attachedFiles.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {message.attachedFiles.map((file, fileIndex) => (
                        <div
                          key={fileIndex}
                          className="flex items-center space-x-2 p-2 bg-white/10 rounded-lg"
                        >
                          {getFileIcon(file.type)}
                          <span className="text-sm text-white truncate flex-1">
                            {file.file.name}
                          </span>
                          {file.preview && (
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
            {/* Attached Files Preview */}
            <AnimatePresence>
              {attachedFiles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-3 p-3 glassmorphism rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300 font-medium">
                      Attached Files ({attachedFiles.length})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {attachedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-2 bg-white/10 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          {getFileIcon(file.type)}
                          <span className="text-sm text-white truncate">
                            {file.file.name}
                          </span>
                          {file.preview && (
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="w-6 h-6 rounded object-cover"
                            />
                          )}
                        </div>
                        <button
                          onClick={() => removeAttachedFile(index)}
                          className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end space-x-3">
              <div className="flex-1 glassmorphism rounded-xl p-3">
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={attachedFiles.length > 0 ? "Ask a question about your files..." : "Ask me anything about your studies..."} 
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
                  onClick={() => setShowFileDialog(true)}
                >
                  <Paperclip className="w-5 h-5" />
                </GlassmorphismButton>
                <GlassmorphismButton 
                  size="sm"
                  className="p-3"
                  onClick={handleSendMessage}
                  title="Send Message"
                  disabled={!inputValue.trim() && attachedFiles.length === 0}
                >
                  <Send className="w-5 h-5" />
                </GlassmorphismButton>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Max file size: 10MB • Supports images, PDFs, documents
              {attachedFiles.length > 0 && " • Files attached - ready to analyze!"}
            </p>
          </div>
        </motion.div>

        {/* File Upload Dialog */}
        <Dialog open={showFileDialog} onOpenChange={setShowFileDialog}>
          <DialogContent className="max-w-2xl bg-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center space-x-2">
                <Paperclip className="w-5 h-5" />
                <span>Attach Files for Analysis</span>
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <FileUpload
                onFilesChange={handleFilesChange}
                maxFiles={3}
                maxSize={10}
                acceptedTypes={['image/*', '.pdf', '.doc', '.docx', '.txt', '.ppt', '.pptx']}
              />
              <div className="mt-6 flex justify-end space-x-3">
                <GlassmorphismButton
                  variant="outline"
                  onClick={() => setShowFileDialog(false)}
                >
                  Cancel
                </GlassmorphismButton>
                <GlassmorphismButton
                  onClick={() => setShowFileDialog(false)}
                  disabled={attachedFiles.length === 0}
                  className="bg-gradient-to-r from-blue-500 to-green-500"
                >
                  Attach Files ({attachedFiles.length})
                </GlassmorphismButton>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default SparkTutorChat;
