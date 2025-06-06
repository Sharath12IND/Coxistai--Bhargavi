import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Palette,
  Type,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useState, useCallback } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface RichTextEditorProps {
  content?: string
  onUpdate?: (content: string) => void
  title?: string
  className?: string
}

const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat'
]

const fontSizes = [
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '48px'
]

const colors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000', '#800000'
]

export default function RichTextEditor({ content = '', onUpdate, title = 'Untitled Note', className = '' }: RichTextEditorProps) {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[400px] p-6 bg-transparent text-white focus:outline-none',
      },
    },
  })

  const setFontFamily = useCallback((fontFamily: string) => {
    if (editor) {
      editor.chain().focus().setFontFamily(fontFamily).run()
    }
  }, [editor])

  const setFontSize = useCallback((fontSize: string) => {
    if (editor) {
      editor.chain().focus().setMark('textStyle', { fontSize }).run()
    }
  }, [editor])

  const setColor = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setColor(color).run()
    }
  }, [editor])

  const setHighlight = useCallback((color: string) => {
    if (editor) {
      editor.chain().focus().setHighlight({ color }).run()
    }
  }, [editor])

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      if (linkText) {
        editor.chain().focus().insertContent(`<a href="${linkUrl}">${linkText}</a>`).run()
      } else {
        editor.chain().focus().setLink({ href: linkUrl }).run()
      }
      setLinkUrl('')
      setLinkText('')
      setIsLinkDialogOpen(false)
    }
  }, [editor, linkUrl, linkText])

  const exportToPDF = useCallback(async () => {
    if (!editor) return

    const editorElement = document.querySelector('.ProseMirror')
    if (!editorElement) return

    try {
      const canvas = await html2canvas(editorElement as HTMLElement, {
        backgroundColor: '#1e293b',
        scale: 2,
        useCORS: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add title
      pdf.setFontSize(16)
      pdf.setTextColor(255, 255, 255)
      pdf.setFillColor(30, 41, 59)
      pdf.rect(0, 0, 210, 297, 'F')
      pdf.text(title, 20, 20)

      // Add content
      pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.setFillColor(30, 41, 59)
        pdf.rect(0, 0, 210, 297, 'F')
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${title}.pdf`)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
    }
  }, [editor, title])

  if (!editor) {
    return null
  }

  return (
    <div className={`glassmorphism rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-white/10 p-4 space-y-3">
        {/* First Row - Basic Formatting */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={editor.isActive('bold') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="p-2"
          >
            <Bold className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('italic') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="p-2"
          >
            <Italic className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('underline') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="p-2"
          >
            <UnderlineIcon className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <Button
            variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-2"
          >
            <List className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="p-2"
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <Button
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className="p-2"
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className="p-2"
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          
          <Button
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'ghost'}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className="p-2"
          >
            <AlignRight className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20 mx-2" />

          <Popover open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={editor.isActive('link') ? 'default' : 'ghost'}
                size="sm"
                className="p-2"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-slate-800 border-white/20">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-white">URL</label>
                  <Input
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-white">Text (optional)</label>
                  <Input
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Link text"
                    className="bg-white/5 border-white/20 text-white"
                  />
                </div>
                <Button onClick={addLink} size="sm" className="w-full">
                  Add Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Second Row - Font and Color Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select onValueChange={setFontFamily}>
            <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
              <Type className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Font Family" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font} className="text-white hover:bg-white/10">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setFontSize}>
            <SelectTrigger className="w-20 bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-white/20">
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size} className="text-white hover:bg-white/10">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Palette className="w-4 h-4" />
                <span className="ml-2 text-sm">Text Color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-slate-800 border-white/20">
              <div className="grid grid-cols-8 gap-1 p-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setColor(color)}
                    className="w-6 h-6 rounded border border-white/20 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Palette className="w-4 h-4" />
                <span className="ml-2 text-sm">Highlight</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-slate-800 border-white/20">
              <div className="grid grid-cols-8 gap-1 p-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setHighlight(color)}
                    className="w-6 h-6 rounded border border-white/20 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div className="ml-auto">
            <Button
              onClick={exportToPDF}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[400px] bg-slate-900/50">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
        }
        
        .ProseMirror ul.tiptap-bullet-list {
          list-style-type: disc;
          margin-left: 1.5rem;
          padding-left: 0;
        }
        
        .ProseMirror ol.tiptap-ordered-list {
          list-style-type: decimal;
          margin-left: 1.5rem;
          padding-left: 0;
        }
        
        .ProseMirror li {
          margin: 0.5rem 0;
        }
        
        .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .ProseMirror a:hover {
          color: #60a5fa;
        }
        
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0;
        }
        
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }
        
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }
        
        .ProseMirror p {
          margin: 0.5rem 0;
        }
        
        .ProseMirror strong {
          font-weight: bold;
        }
        
        .ProseMirror em {
          font-style: italic;
        }
        
        .ProseMirror u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}