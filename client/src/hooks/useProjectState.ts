import { useState, useEffect } from "react";

const PROJECT_STATE_KEY = 'webgen_project_state';

// Interface for custom file
export interface CustomFile {
  name: string;
  content: string;
}

interface ProjectStateData {
  projectName: string;
  framework: string;
  frameworkVersion: string;
  libraries: string[];
  folders: string[];
  customFolders: string[];
  customFiles: CustomFile[];
}

interface ProjectState extends ProjectStateData {
  setProjectName: (name: string) => void;
  setFramework: (framework: string) => void;
  setFrameworkVersion: (version: string) => void;
  toggleLibrary: (library: string) => void;
  toggleFolder: (folder: string) => void;
  addCustomFolder: (folder: string) => void;
  removeCustomFolder: (folder: string) => void;
  addCustomFile: (file: CustomFile) => void;
  removeCustomFile: (fileName: string) => void;
  reset: () => void;
}

// Default state values
const defaultState: ProjectStateData = {
  projectName: 'my-awesome-project',
  framework: 'none',
  frameworkVersion: 'latest',
  libraries: [],
  folders: ['components', 'utils', 'api', 'assets', 'styles'],
  customFolders: [],
  customFiles: []
};

// Helper function to load state from localStorage
const loadStateFromStorage = (): ProjectStateData => {
  try {
    const storedState = localStorage.getItem(PROJECT_STATE_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      
      // Handle potential missing fields in stored state (backward compatibility)
      if (!parsedState.customFolders) {
        parsedState.customFolders = [];
      }
      if (!parsedState.customFiles) {
        parsedState.customFiles = [];
      }
      
      return parsedState;
    }
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
  }
  return defaultState;
};

// Helper function to save state to localStorage
const saveStateToStorage = (state: ProjectStateData): void => {
  try {
    localStorage.setItem(PROJECT_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};

export function useProjectState(): ProjectState {
  // Initialize state from localStorage if available
  const [state, setState] = useState<ProjectStateData>(loadStateFromStorage());

  // Destructure state for easier access
  const { projectName, framework, frameworkVersion, libraries, folders, customFolders, customFiles } = state;

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  // Specific state setters
  const setProjectName = (name: string) => {
    setState(prev => ({ ...prev, projectName: name }));
  };

  const setFramework = (framework: string) => {
    setState(prev => ({ ...prev, framework }));
  };

  const setFrameworkVersion = (version: string) => {
    setState(prev => ({ ...prev, frameworkVersion: version }));
  };

  const toggleLibrary = (library: string) => {
    setState(prev => ({
      ...prev,
      libraries: prev.libraries.includes(library)
        ? prev.libraries.filter(l => l !== library)
        : [...prev.libraries, library]
    }));
  };

  const toggleFolder = (folder: string) => {
    setState(prev => ({
      ...prev,
      folders: prev.folders.includes(folder)
        ? prev.folders.filter(f => f !== folder)
        : [...prev.folders, folder]
    }));
  };

  const addCustomFolder = (folder: string) => {
    setState(prev => {
      // Don't add if it already exists
      if (prev.customFolders.includes(folder)) {
        return prev;
      }
      return {
        ...prev,
        customFolders: [...prev.customFolders, folder]
      };
    });
  };

  const removeCustomFolder = (folder: string) => {
    setState(prev => ({
      ...prev,
      customFolders: prev.customFolders.filter(f => f !== folder)
    }));
  };

  const addCustomFile = (file: CustomFile) => {
    setState(prev => {
      // Replace if file with same name exists
      const filtered = prev.customFiles.filter(f => f.name !== file.name);
      return {
        ...prev,
        customFiles: [...filtered, file]
      };
    });
  };

  const removeCustomFile = (fileName: string) => {
    setState(prev => ({
      ...prev,
      customFiles: prev.customFiles.filter(f => f.name !== fileName)
    }));
  };

  const reset = () => {
    setState(defaultState);
  };

  return {
    projectName,
    framework,
    frameworkVersion,
    libraries,
    folders,
    customFolders,
    customFiles,
    
    setProjectName,
    setFramework,
    setFrameworkVersion,
    toggleLibrary,
    toggleFolder,
    addCustomFolder,
    removeCustomFolder,
    addCustomFile,
    removeCustomFile,
    reset
  };
}
