import { useState, useRef } from "react";
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
  Link,
  Upload,
  FileText,
  Trash2,
  Eye,
  Copy,
  Plus,
  X,
  Tag
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import type { Document } from "@shared/schema";

const NotesHub = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadTags, setUploadTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch documents
  const { data: documents = [], isLoading } = useQuery({
    queryKey: ["/api/documents"],
    queryFn: async () => {
      const response = await fetch("/api/documents?userId=1");
      if (!response.ok) throw new Error("Failed to fetch documents");
      return response.json();
    },
  });

  // Upload document mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      setShowUploadDialog(false);
      setSelectedFile(null);
      setUploadTitle("");
      setUploadTags("");
      setIsPublic(false);
      toast({
        title: "Document Uploaded",
        description: "Your document has been added to the library.",
      });
    },
    onError: () => {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document.",
        variant: "destructive",
      });
    },
  });

  // Delete document mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
      setSelectedDocument(null);
      toast({
        title: "Document Deleted",
        description: "Document has been removed from your library.",
      });
    },
  });

  const categories = ["All", "PDF", "Text", "Document"];
  
  const filteredDocuments = (documents as Document[]).filter((doc: Document) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || 
      (activeCategory === "PDF" && doc.fileType.includes("pdf")) ||
      (activeCategory === "Text" && doc.fileType.includes("text")) ||
      (activeCategory === "Document" && (doc.fileType.includes("doc") || doc.fileType.includes("application")));
    return matchesSearch && matchesCategory;
  });

  // Handle file upload
  const handleFileUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", uploadTitle || selectedFile.name);
    formData.append("tags", JSON.stringify(uploadTags.split(",").map(tag => tag.trim()).filter(Boolean)));
    formData.append("isPublic", isPublic.toString());
    formData.append("userId", "1");

    uploadMutation.mutate(formData);
  };

  // Handle sharing
  const handleShare = (document: Document) => {
    if (document.shareCode) {
      const shareUrl = `${window.location.origin}/shared/${document.shareCode}`;
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Share Link Copied",
        description: "Share link has been copied to clipboard.",
      });
    }
  };

  // Format date
  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
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
                <h2 className="text-2xl font-bold">Document Library</h2>
                <GlassmorphismButton
                  onClick={() => setShowUploadDialog(true)}
                  className="bg-gradient-to-r from-blue-500 to-green-500"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </GlassmorphismButton>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
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
            
            {/* Documents List */}
            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center text-slate-400 py-8">Loading documents...</div>
              ) : filteredDocuments.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                  No documents found. Upload your first document to get started.
                </div>
              ) : (
                filteredDocuments.map((doc: Document, index: number) => (
                  <motion.div
                    key={doc.id}
                    className={`glassmorphism rounded-lg p-4 hover:bg-white/5 transition-all cursor-pointer ${
                      selectedDocument?.id === doc.id ? 'border-l-4 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedDocument(doc)}
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
                          <h3 className="font-semibold text-white truncate">{doc.title}</h3>
                        </div>
                        <p className="text-sm text-slate-400">
                          Uploaded {formatDate(doc.createdAt as string)}
                        </p>
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="flex space-x-1 mt-2 flex-wrap">
                            {doc.tags.map((tag: string) => (
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
                            handleShare(doc);
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Share className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMutation.mutate(doc.id);
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
            <motion.div 
              className="glassmorphism rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {selectedDocument ? (
                <>
                  {/* Document Header */}
                  <div className="border-b border-white/10 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white">{selectedDocument.title}</h3>
                      <p className="text-sm text-slate-400">
                        {selectedDocument.fileType} • {formatDate(selectedDocument.createdAt as string)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(selectedDocument)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Share className="w-5 h-5" />
                      </Button>
                      <GlassmorphismButton size="sm">
                        <Download className="w-4 h-4 inline mr-2" />
                        Download
                      </GlassmorphismButton>
                    </div>
                  </div>
                  
                  {/* Document Content */}
                  <div className="p-6 min-h-[400px] text-white">
                    <div className="prose prose-invert max-w-none">
                      <h1 className="text-2xl font-bold mb-4">{selectedDocument.title}</h1>
                      {selectedDocument.tags && selectedDocument.tags.length > 0 && (
                        <div className="flex space-x-2 mb-6">
                          {selectedDocument.tags.map((tag: string) => (
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
                      <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                        {selectedDocument.content || "No content available for this document."}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96 text-slate-400">
                  <div className="text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">No Document Selected</h3>
                    <p>Select a document from the library or upload a new one to get started.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Upload Dialog */}
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogContent className="bg-slate-900 border-white/20">
            <DialogHeader>
              <DialogTitle className="text-white">Upload Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white">File</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full p-3 glassmorphism rounded-lg bg-white/5 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  accept=".pdf,.txt,.doc,.docx"
                />
              </div>
              
              <div>
                <Label className="text-white">Title (Optional)</Label>
                <Input
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Custom title for your document"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Tags (comma separated)</Label>
                <Input
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  placeholder="e.g., study, notes, research"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  id="public-switch"
                />
                <Label htmlFor="public-switch" className="text-white">
                  Make document public (shareable)
                </Label>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowUploadDialog(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleFileUpload}
                  disabled={!selectedFile || uploadMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                >
                  {uploadMutation.isPending ? "Uploading..." : "Upload Document"}
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
