import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/themes/prism-tomorrow.css';

interface FilePreviewProps {
  filename: string;
  content: string;
}

const getLanguageFromFileName = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'jsx';
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'tsx';
    case 'json':
      return 'json';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
    case 'sass':
      return 'scss';
    case 'md':
      return 'markdown';
    case 'yml':
    case 'yaml':
      return 'yaml';
    case 'sh':
    case 'bash':
      return 'bash';
    default:
      return 'javascript';
  }
};

const getFileIcon = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  // Map file extensions to material icons
  switch (extension) {
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
      return 'style';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascript';
    case 'ts':
      return 'code';
    case 'tsx':
      return 'code';
    case 'json':
      return 'data_object';
    case 'md':
      return 'article';
    case 'svg':
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'image';
    case 'vue':
      return 'view_compact';
    case 'ico':
      return 'favicon';
    default:
      return 'description';
  }
};

const getIconColor = (filename: string): string => {
  if (filename.endsWith('.js') || filename.endsWith('.jsx')) {
    return 'text-yellow-500';
  } else if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
    return 'text-blue-500';
  } else if (filename.endsWith('.css') || filename.endsWith('.scss')) {
    return 'text-purple-500';
  } else if (filename.endsWith('.json')) {
    return 'text-yellow-300';
  } else if (filename.endsWith('.html')) {
    return 'text-orange-500';
  } else if (filename.endsWith('.md')) {
    return 'text-slate-400';
  } else if (filename.endsWith('.vue')) {
    return 'text-green-500';
  } else {
    return 'text-blue-500';
  }
};

export default function FilePreview({ filename, content }: FilePreviewProps) {
  const codeRef = useRef<HTMLElement>(null);
  const language = getLanguageFromFileName(filename);
  const fileIcon = getFileIcon(filename);
  const iconColor = getIconColor(filename);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [content, language]);

  const lineCount = content.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join('\n');

  return (
    <div className="bg-background rounded-lg overflow-hidden border">
      <div className="flex items-center bg-muted px-4 py-2 text-sm">
        <span className={`material-icons text-lg mr-2 ${iconColor}`}>{fileIcon}</span>
        <span className="font-medium">{filename}</span>
      </div>
      <div className="relative">
        <pre className="line-numbers bg-[#2d2d2d] p-4 text-sm overflow-auto max-h-[400px] text-foreground font-mono">
          <code ref={codeRef} className={`language-${language}`}>
            {content}
          </code>
        </pre>
        <div className="absolute top-0 left-0 p-4 text-gray-600 select-none opacity-60 font-mono">
          {lineNumbers}
        </div>
      </div>
    </div>
  );
}
