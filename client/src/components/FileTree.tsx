import { useState, useEffect } from "react";

interface File {
  name: string;
  path: string;
}

interface Folder {
  name: string;
  path: string;
  children: (File | Folder)[];
}

interface FileTreeProps {
  structure: Folder;
  onSelectFile: (path: string) => void;
  selectedFile: string;
  areAllFoldersExpanded: boolean;
}

interface FolderComponentProps {
  folder: Folder;
  onSelectFile: (path: string) => void;
  selectedFile: string;
  level?: number;
  isExpanded: boolean;
  toggleExpanded: (path: string) => void;
}

// Function to get file icon based on extension
function getFileIcon(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
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
}

// Function to get folder icon based on name
function getFolderIcon(folderName: string, isExpanded: boolean): string {
  // Common folder names mapped to specific icons
  const folderNameLower = folderName.toLowerCase();
  
  if (isExpanded) {
    return 'folder_open';
  }
  
  switch (folderNameLower) {
    case 'src':
      return 'source';
    case 'components':
      return 'widgets';
    case 'pages':
      return 'web';
    case 'api':
      return 'api';
    case 'assets':
      return 'perm_media';
    case 'public':
      return 'public';
    case 'node_modules':
      return 'integration_instructions';
    case 'styles':
    case 'css':
      return 'style';
    case 'utils':
      return 'build';
    case 'hooks':
      return 'share';
    case 'app':
      return 'apps';
    default:
      return 'folder';
  }
}

function FolderComponent({ 
  folder, 
  onSelectFile, 
  selectedFile, 
  level = 0, 
  isExpanded,
  toggleExpanded
}: FolderComponentProps) {
  const handleToggle = () => {
    toggleExpanded(folder.path);
  };

  const folderIcon = getFolderIcon(folder.name, isExpanded);

  return (
    <div className="tree-view-item">
      <div 
        className={`tree-toggle cursor-pointer ${isExpanded ? 'expanded' : ''} py-1 flex items-center`}
        onClick={handleToggle}
      >
        <span className="material-icons text-amber-500 text-lg mr-1.5">{folderIcon}</span>
        <span>{folder.name}</span>
      </div>
      <div 
        className={`tree-view ml-6 transition-all duration-200 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {folder.children.map((item) => {
          if ('children' in item) {
            return (
              <FolderComponent 
                key={item.path}
                folder={item as Folder}
                onSelectFile={onSelectFile}
                selectedFile={selectedFile}
                level={level + 1}
                isExpanded={isExpanded}
                toggleExpanded={toggleExpanded}
              />
            );
          } else {
            const fileItem = item as File;
            const fileIcon = getFileIcon(fileItem.name);
            let iconColor = 'text-blue-500';
            
            // Customize icon colors based on file type
            if (fileItem.name.endsWith('.js') || fileItem.name.endsWith('.jsx')) {
              iconColor = 'text-yellow-500';
            } else if (fileItem.name.endsWith('.ts') || fileItem.name.endsWith('.tsx')) {
              iconColor = 'text-blue-500';
            } else if (fileItem.name.endsWith('.css') || fileItem.name.endsWith('.scss')) {
              iconColor = 'text-purple-500';
            } else if (fileItem.name.endsWith('.json')) {
              iconColor = 'text-yellow-300';
            } else if (fileItem.name.endsWith('.html')) {
              iconColor = 'text-orange-500';
            } else if (fileItem.name.endsWith('.md')) {
              iconColor = 'text-slate-400';
            } else if (fileItem.name.endsWith('.vue')) {
              iconColor = 'text-green-500';
            }
            
            return (
              <div 
                key={item.path}
                className={`tree-view-item cursor-pointer py-1 flex items-center ${selectedFile === item.path ? 'text-primary font-medium' : ''}`}
                onClick={() => onSelectFile(item.path)}
              >
                <span className={`material-icons text-sm mr-1.5 ${iconColor}`}>{fileIcon}</span>
                <span>{fileItem.name}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default function FileTree({ 
  structure, 
  onSelectFile, 
  selectedFile,
  areAllFoldersExpanded
}: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    [structure.path]: true
  });

  const toggleExpanded = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Update all folders when areAllFoldersExpanded changes
  const setAllFoldersExpanded = (expanded: boolean) => {
    const newExpandedState: Record<string, boolean> = { [structure.path]: true };
    
    const processFolder = (folder: Folder) => {
      folder.children.forEach(item => {
        if ('children' in item) {
          newExpandedState[item.path] = expanded;
          processFolder(item as Folder);
        }
      });
    };
    
    processFolder(structure);
    setExpandedFolders(newExpandedState);
  };

  // Effect to handle areAllFoldersExpanded prop change
  useEffect(() => {
    setAllFoldersExpanded(areAllFoldersExpanded);
  }, [areAllFoldersExpanded]);

  const rootFolderIcon = getFolderIcon(structure.name, expandedFolders[structure.path]);

  return (
    <div className="tree-view text-sm border rounded-md p-4 bg-background/50">
      <div className="tree-view-item">
        <div 
          className={`tree-toggle cursor-pointer font-medium ${expandedFolders[structure.path] ? 'expanded' : ''} py-1 flex items-center`}
          onClick={() => toggleExpanded(structure.path)}
        >
          <span className="material-icons text-amber-500 text-lg mr-1.5">{rootFolderIcon}</span>
          <span>{structure.name}</span>
        </div>
        <div 
          className={`tree-view ml-6 transition-all duration-200 ${expandedFolders[structure.path] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          {structure.children.map((item) => {
            if ('children' in item) {
              return (
                <FolderComponent 
                  key={item.path}
                  folder={item as Folder}
                  onSelectFile={onSelectFile}
                  selectedFile={selectedFile}
                  isExpanded={Boolean(expandedFolders[item.path])}
                  toggleExpanded={toggleExpanded}
                />
              );
            } else {
              const fileItem = item as File;
              const fileIcon = getFileIcon(fileItem.name);
              let iconColor = 'text-blue-500';
              
              // Customize icon colors based on file type
              if (fileItem.name.endsWith('.js') || fileItem.name.endsWith('.jsx')) {
                iconColor = 'text-yellow-500';
              } else if (fileItem.name.endsWith('.ts') || fileItem.name.endsWith('.tsx')) {
                iconColor = 'text-blue-500';
              } else if (fileItem.name.endsWith('.css') || fileItem.name.endsWith('.scss')) {
                iconColor = 'text-purple-500';
              } else if (fileItem.name.endsWith('.json')) {
                iconColor = 'text-yellow-300';
              } else if (fileItem.name.endsWith('.html')) {
                iconColor = 'text-orange-500';
              } else if (fileItem.name.endsWith('.md')) {
                iconColor = 'text-slate-400';
              } else if (fileItem.name.endsWith('.vue')) {
                iconColor = 'text-green-500';
              }
              
              return (
                <div 
                  key={item.path}
                  className={`tree-view-item cursor-pointer py-1 flex items-center ${selectedFile === item.path ? 'text-primary font-medium' : ''}`}
                  onClick={() => onSelectFile(item.path)}
                >
                  <span className={`material-icons text-sm mr-1.5 ${iconColor}`}>{fileIcon}</span>
                  <span>{fileItem.name}</span>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
