import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Strikethrough, List, ListOrdered,
  Heading2, Heading3, Link2, Image as ImageIcon,
  Minus, Undo, Redo, Code
} from 'lucide-react';
import './RichTextEditor.css';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt('Link URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const buttons = [
    { action: () => editor.chain().focus().toggleBold().run(), icon: <Bold size={15}/>, active: editor.isActive('bold'), title: 'Bold' },
    { action: () => editor.chain().focus().toggleItalic().run(), icon: <Italic size={15}/>, active: editor.isActive('italic'), title: 'Italic' },
    { action: () => editor.chain().focus().toggleStrike().run(), icon: <Strikethrough size={15}/>, active: editor.isActive('strike'), title: 'Strikethrough' },
    { action: () => editor.chain().focus().toggleCode().run(), icon: <Code size={15}/>, active: editor.isActive('code'), title: 'Inline Code' },
    null, // separator
    { action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), icon: <Heading2 size={15}/>, active: editor.isActive('heading', { level: 2 }), title: 'Heading 2' },
    { action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), icon: <Heading3 size={15}/>, active: editor.isActive('heading', { level: 3 }), title: 'Heading 3' },
    null,
    { action: () => editor.chain().focus().toggleBulletList().run(), icon: <List size={15}/>, active: editor.isActive('bulletList'), title: 'Bullet List' },
    { action: () => editor.chain().focus().toggleOrderedList().run(), icon: <ListOrdered size={15}/>, active: editor.isActive('orderedList'), title: 'Numbered List' },
    null,
    { action: setLink, icon: <Link2 size={15}/>, active: editor.isActive('link'), title: 'Add Link' },
    { action: addImage, icon: <ImageIcon size={15}/>, active: false, title: 'Add Image' },
    { action: () => editor.chain().focus().setHorizontalRule().run(), icon: <Minus size={15}/>, active: false, title: 'Divider' },
    null,
    { action: () => editor.chain().focus().undo().run(), icon: <Undo size={15}/>, active: false, title: 'Undo', disabled: !editor.can().undo() },
    { action: () => editor.chain().focus().redo().run(), icon: <Redo size={15}/>, active: false, title: 'Redo', disabled: !editor.can().redo() },
  ];

  return (
    <div className="rte-toolbar">
      {buttons.map((btn, i) =>
        btn === null ? (
          <div key={i} className="rte-sep" />
        ) : (
          <button
            key={i}
            type="button"
            onClick={btn.action}
            className={`rte-btn ${btn.active ? 'rte-btn-active' : ''}`}
            title={btn.title}
            disabled={btn.disabled}
          >
            {btn.icon}
          </button>
        )
      )}
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder = 'Write your article content here...' }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rte-wrapper">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
};

export default RichTextEditor;
