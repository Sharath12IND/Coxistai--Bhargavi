import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema } from "@shared/schema";
import multer from "multer";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Document routes
  
  // Get all documents for a user
  app.get("/api/documents", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const documents = await storage.getDocuments(userId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  // Get a specific document
  app.get("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch document" });
    }
  });

  // Get document by share code
  app.get("/api/shared/:shareCode", async (req, res) => {
    try {
      const { shareCode } = req.params;
      const document = await storage.getDocumentByShareCode(shareCode);
      
      if (!document) {
        return res.status(404).json({ error: "Shared document not found" });
      }
      
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch shared document" });
    }
  });

  // Upload and create a new document
  app.post("/api/documents", upload.single("file"), async (req, res) => {
    try {
      const { title, tags, isPublic, userId } = req.body;
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Extract text content from file (basic implementation)
      let content = "";
      if (file.mimetype === "text/plain") {
        content = file.buffer.toString("utf-8");
      } else if (file.mimetype === "application/pdf") {
        content = "PDF content extraction not implemented - file uploaded successfully";
      } else {
        content = "File uploaded successfully - content extraction not supported for this file type";
      }

      const documentData = {
        title: title || file.originalname,
        filename: file.originalname,
        fileType: file.mimetype,
        content,
        tags: tags ? JSON.parse(tags) : [],
        isPublic: isPublic === "true",
        userId: parseInt(userId) || 1, // Default user for demo
      };

      const validatedData = insertDocumentSchema.parse(documentData);
      const document = await storage.createDocument({ ...validatedData, userId: documentData.userId });
      
      res.status(201).json(document);
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Failed to upload document" });
    }
  });

  // Update a document
  app.put("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const document = await storage.updateDocument(id, updates);
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: "Failed to update document" });
    }
  });

  // Delete a document
  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDocument(id);
      
      if (!success) {
        return res.status(404).json({ error: "Document not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete document" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
