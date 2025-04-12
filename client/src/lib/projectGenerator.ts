import { useProjectState, CustomFile } from "@/hooks/useProjectState";

// Define ProjectState type
interface ProjectState {
  projectName: string;
  framework: string;
  frameworkVersion: string;
  libraries: string[];
  folders: string[];
  customFolders: string[];
  customFiles: CustomFile[];
}

// File structure types
export interface File {
  name: string;
  path: string;
}

export interface Folder {
  name: string;
  path: string;
  children: (File | Folder)[];
}

// Generate file structure for preview
export function generateFileStructure(state: ProjectState): Folder {
  const { projectName, framework, folders, customFolders, customFiles } = state;
  
  // Base structure common to all projects
  const structure: Folder = {
    name: projectName,
    path: projectName,
    children: [
      {
        name: 'package.json',
        path: 'package.json'
      },
      {
        name: 'README.md',
        path: 'README.md'
      }
    ]
  };
  
  // Framework-specific files
  const sourceFolder: Folder = {
    name: 'src',
    path: 'src',
    children: []
  };
  
  // Add main files based on framework
  switch (framework) {
    case 'none':
      sourceFolder.children.push(
        { name: 'index.html', path: 'src/index.html' },
        { name: 'styles.css', path: 'src/styles.css' },
        { name: 'main.js', path: 'src/main.js' }
      );
      break;
    case 'javascript':
      // For JavaScript projects, add a simple structure
      structure.children.push(
        { name: 'index.html', path: 'index.html' },
        { name: 'css', path: 'css', children: [
          { name: 'styles.css', path: 'css/styles.css' }
        ]},
        { name: 'js', path: 'js', children: [
          { name: 'main.js', path: 'js/main.js' },
          { name: 'utils.js', path: 'js/utils.js' },
          { name: 'app.js', path: 'js/app.js' },
          { name: 'modules', path: 'js/modules', children: [
            { name: 'module1.js', path: 'js/modules/module1.js' },
            { name: 'module2.js', path: 'js/modules/module2.js' }
          ]}
        ]}
      );
      
      // Add custom files at root level for JavaScript projects
      customFiles.forEach(file => {
        structure.children.push({
          name: file.name,
          path: file.name
        });
      });
      
      // Add custom folders at root level for JavaScript projects
      customFolders.forEach(folder => {
        structure.children.push({
          name: folder,
          path: folder,
          children: [
            { name: 'index.js', path: `${folder}/index.js` }
          ]
        });
      });
      
      // We already added files directly to structure, so don't include sourceFolder
      return structure;
    case 'typescript':
      // For TypeScript projects, add a more comprehensive structure
      structure.children.push(
        { name: 'index.html', path: 'index.html' },
        { name: 'css', path: 'css', children: [
          { name: 'styles.css', path: 'css/styles.css' }
        ]},
        { name: 'tsconfig.json', path: 'tsconfig.json' }
      );
      sourceFolder.children.push(
        { name: 'main.ts', path: 'src/main.ts' },
        { name: 'utils.ts', path: 'src/utils.ts' },
        { name: 'app.ts', path: 'src/app.ts' },
        { name: 'types', path: 'src/types', children: [
          { name: 'index.ts', path: 'src/types/index.ts' }
        ]}
      );
      break;
    case 'react':
      sourceFolder.children.push(
        { name: 'index.js', path: 'src/index.js' },
        { name: 'App.js', path: 'src/App.js' },
        { name: 'pages', path: 'src/pages', children: [
          { name: 'Home.js', path: 'src/pages/Home.js' },
          { name: 'About.js', path: 'src/pages/About.js' }
        ] }
      );
      break;
    case 'nextjs':
      sourceFolder.children.push(
        { name: 'app', path: 'src/app', children: [
          { name: 'page.tsx', path: 'src/app/page.tsx' },
          { name: 'layout.tsx', path: 'src/app/layout.tsx' },
          { name: 'globals.css', path: 'src/app/globals.css' },
          { name: 'about', path: 'src/app/about', children: [
            { name: 'page.tsx', path: 'src/app/about/page.tsx' }
          ] },
          { name: 'dashboard', path: 'src/app/dashboard', children: [
            { name: 'page.tsx', path: 'src/app/dashboard/page.tsx' }
          ] }
        ] },
        { name: 'pages', path: 'src/pages', children: [
          { name: '_app.tsx', path: 'src/pages/_app.tsx' },
          { name: 'index.tsx', path: 'src/pages/index.tsx' },
          { name: 'api', path: 'src/pages/api', children: [
            { name: 'hello.ts', path: 'src/pages/api/hello.ts' }
          ] }
        ] }
      );
      break;
    case 'vue':
      sourceFolder.children.push(
        { name: 'main.js', path: 'src/main.js' },
        { name: 'App.vue', path: 'src/App.vue' },
        { name: 'pages', path: 'src/pages', children: [
          { name: 'Home.vue', path: 'src/pages/Home.vue' },
          { name: 'About.vue', path: 'src/pages/About.vue' }
        ] }
      );
      break;
    case 'angular':
      sourceFolder.children.push(
        { name: 'main.ts', path: 'src/main.ts' },
        { name: 'app', path: 'src/app', children: [
          { name: 'app.module.ts', path: 'src/app/app.module.ts' },
          { name: 'app.component.ts', path: 'src/app/app.component.ts' },
          { name: 'app.component.html', path: 'src/app/app.component.html' },
          { name: 'pages', path: 'src/app/pages', children: [
            { name: 'home', path: 'src/app/pages/home', children: [
              { name: 'home.component.ts', path: 'src/app/pages/home/home.component.ts' },
              { name: 'home.component.html', path: 'src/app/pages/home/home.component.html' }
            ] },
            { name: 'about', path: 'src/app/pages/about', children: [
              { name: 'about.component.ts', path: 'src/app/pages/about/about.component.ts' },
              { name: 'about.component.html', path: 'src/app/pages/about/about.component.html' }
            ] }
          ] }
        ] }
      );
      break;
  }
  
  // Add optional folders based on user selection
  folders.forEach((folder: string) => {
    const folderStructure: Folder = {
      name: folder,
      path: `src/${folder}`,
      children: []
    };
    
    // Add some example files based on folder type
    switch (folder) {
      case 'components':
        folderStructure.children.push(
          { name: 'Header.js', path: `src/${folder}/Header.js` },
          { name: 'Footer.js', path: `src/${folder}/Footer.js` },
          { name: 'Button.js', path: `src/${folder}/Button.js` }
        );
        break;
      case 'utils':
        folderStructure.children.push(
          { name: 'helpers.js', path: `src/${folder}/helpers.js` }
        );
        break;
      case 'api':
        folderStructure.children.push(
          { name: 'index.js', path: `src/${folder}/index.js` }
        );
        break;
      case 'hooks':
        folderStructure.children.push(
          { name: 'useAuth.js', path: `src/${folder}/useAuth.js` }
        );
        break;
      case 'assets':
        folderStructure.children.push(
          { name: 'logo.svg', path: `src/${folder}/logo.svg` }
        );
        break;
      case 'styles':
        folderStructure.children.push(
          { name: 'global.css', path: `src/${folder}/global.css` }
        );
        if (state.libraries.includes('sass')) {
          folderStructure.children.push(
            { name: 'variables.scss', path: `src/${folder}/variables.scss` }
          );
        }
        break;
    }
    
    sourceFolder.children.push(folderStructure);
  });
  
  // Add custom folders to src/ directory for non-javascript frameworks
  if (framework !== 'javascript') {
    customFolders.forEach(folder => {
      sourceFolder.children.push({
        name: folder,
        path: `src/${folder}`,
        children: [
          { name: 'index.js', path: `src/${folder}/index.js` }
        ]
      });
    });
  }
  
  // Add public folder for most frameworks
  if (framework !== 'none') {
    structure.children.push({
      name: 'public',
      path: 'public',
      children: [
        { name: 'index.html', path: 'public/index.html' },
        { name: 'favicon.ico', path: 'public/favicon.ico' }
      ]
    });
  }
  
  // Add configuration files based on selected libraries
  state.libraries.forEach((lib: string) => {
    switch (lib) {
      case 'tailwind':
        structure.children.push(
          { name: 'tailwind.config.js', path: 'tailwind.config.js' },
          { name: 'postcss.config.js', path: 'postcss.config.js' }
        );
        break;
      case 'jest':
        structure.children.push(
          { name: 'jest.config.js', path: 'jest.config.js' }
        );
        break;
    }
  });
  
  // Add custom files at root level for non-javascript frameworks
  if (framework !== 'javascript') {
    customFiles.forEach(file => {
      // Check if the file has a directory structure
      if (file.name.includes('/')) {
        // Handle nested custom files
        const parts = file.name.split('/');
        const fileName = parts.pop() || '';
        const folderPath = parts.join('/');
        
        // Check if we need to create nested folders
        if (parts.length > 0) {
          // Here we would need to recursively create folder structure
          // Simplified approach for now: just add to src
          sourceFolder.children.push({
            name: fileName,
            path: `src/${file.name}`
          });
        }
      } else {
        // Simple file at root level
        structure.children.push({
          name: file.name,
          path: file.name
        });
      }
    });
  }
  
  // Add source folder to the structure
  structure.children.push(sourceFolder);
  
  return structure;
}

// Get preview content for selected file
export function getFileContent(filePath: string, state: ProjectState): string {
  const { projectName, framework, frameworkVersion, libraries, customFiles } = state;
  
  // Check if this is a custom file
  const customFile = customFiles.find(file => {
    const relativePath = filePath.startsWith(projectName + '/') 
      ? filePath.substring(projectName.length + 1) 
      : filePath;
      
    return file.name === relativePath || file.name === filePath;
  });
  
  if (customFile) {
    return customFile.content;
  }
  
  // Generate file content based on file path and state
  switch (filePath) {
    case 'package.json':
    case `${projectName}/package.json`:
      return generatePackageJson(projectName, framework, frameworkVersion, libraries);
    case 'README.md':
    case `${projectName}/README.md`:
      return generateReadme(projectName, framework);
    case 'src/index.js':
    case 'src/main.js':
    case `${projectName}/src/index.js`:
    case `${projectName}/src/main.js`:
      return generateEntryPoint(framework);
    case 'src/App.js':
    case 'src/App.vue':
    case `${projectName}/src/App.js`:
    case `${projectName}/src/App.vue`:
      return generateAppFile(framework, libraries);
    case 'tailwind.config.js':
    case `${projectName}/tailwind.config.js`:
      return generateTailwindConfig();
    case 'src/index.html':
    case `${projectName}/src/index.html`:
      return generateHtmlFile(projectName);
    default:
      // Generate default content based on file extension
      const extension = filePath.split('.').pop()?.toLowerCase();
      
      switch (extension) {
        case 'js':
          return `// JavaScript file: ${filePath}\n\n/**\n * Add your code here\n */\n\nconsole.log('${filePath} loaded');\n`;
        case 'ts':
          return `// TypeScript file: ${filePath}\n\n/**\n * Add your code here\n */\n\nconst greet = (name: string): string => {\n  return \`Hello, \${name}!\`;\n};\n\nexport default greet;\n`;
        case 'jsx':
        case 'tsx':
          return `// React component: ${filePath}\n\nimport React from 'react';\n\ninterface Props {\n  title?: string;\n}\n\nconst Component: React.FC<Props> = ({ title = 'Default Title' }) => {\n  return (\n    <div className="component">\n      <h2>{title}</h2>\n      <p>Edit this component to get started!</p>\n    </div>\n  );\n};\n\nexport default Component;\n`;
        case 'css':
          return `/* Styles for ${filePath} */\n\n/* Add your styles here */\n\n`;
        case 'html':
          return `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <!-- Content for ${filePath} -->\n  \n</body>\n</html>`;
        case 'md':
          return `# ${filePath.split('/').pop()?.replace('.md', '') || 'Documentation'}\n\n## Overview\n\nThis is a markdown file generated for ${filePath}.\n\n## Usage\n\nUpdate this file with your project documentation.\n`;
        case 'json':
          return `{\n  "name": "${filePath.split('/').pop()?.replace('.json', '') || 'config'}",\n  "version": "1.0.0",\n  "description": "Generated JSON file"\n}\n`;
        default:
          return `// Content for ${filePath}\n\n// This file would be generated when you download the project`;
      }
  }
}

// Helper functions to generate content for specific files

function generatePackageJson(
  projectName: string, 
  framework: string, 
  version: string,
  libraries: string[]
): string {
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};
  let scripts: Record<string, string> = {
    "start": "npm start",
    "build": "npm run build",
    "test": "npm test"
  };
  
  // Add framework dependencies
  switch (framework) {
    case 'javascript':
      scripts = {
        "start": "serve -s .",
        "test": "echo \"Error: no test specified\" && exit 1"
      };
      dependencies["serve"] = "^14.2.1";
      break;
    case 'typescript':
      dependencies["typescript"] = version === 'latest' ? "^5.0.4" : `^${version}`;
      scripts = {
        "start": "tsc --watch",
        "build": "tsc",
        "test": "echo \"Error: no test specified\" && exit 1"
      };
      devDependencies["@types/node"] = "^20.4.5";
      break;
    case 'react':
      dependencies["react"] = version === 'latest' ? "^18.2.0" : `^${version}`;
      dependencies["react-dom"] = version === 'latest' ? "^18.2.0" : `^${version}`;
      scripts = {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
      };
      break;
    case 'nextjs':
      dependencies["next"] = version === 'latest' ? "^13.4.3" : `^${version}`;
      dependencies["react"] = "^18.2.0";
      dependencies["react-dom"] = "^18.2.0";
      scripts = {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      };
      break;
    case 'vue':
      dependencies["vue"] = version === 'latest' ? "^3.2.47" : `^${version}`;
      if (version.startsWith('3')) {
        scripts = {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview"
        };
        devDependencies["@vitejs/plugin-vue"] = "^4.1.0";
        devDependencies["vite"] = "^4.3.2";
      } else {
        scripts = {
          "serve": "vue-cli-service serve",
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        };
      }
      break;
    case 'angular':
      dependencies["@angular/core"] = version === 'latest' ? "^16.0.0" : `^${version}`;
      dependencies["@angular/common"] = version === 'latest' ? "^16.0.0" : `^${version}`;
      dependencies["@angular/platform-browser"] = version === 'latest' ? "^16.0.0" : `^${version}`;
      scripts = {
        "ng": "ng",
        "start": "ng serve",
        "build": "ng build",
        "watch": "ng build --watch --configuration development",
        "test": "ng test"
      };
      break;
  }
  
  // Add libraries
  libraries.forEach(lib => {
    switch (lib) {
      case 'tailwind':
        devDependencies["tailwindcss"] = "^3.3.2";
        devDependencies["postcss"] = "^8.4.23";
        devDependencies["autoprefixer"] = "^10.4.14";
        break;
      case 'sass':
        devDependencies["sass"] = "^1.62.1";
        break;
      case 'redux':
        dependencies["@reduxjs/toolkit"] = "^1.9.5";
        if (framework === 'react' || framework === 'nextjs') {
          dependencies["react-redux"] = "^8.0.5";
        }
        break;
      case 'jest':
        devDependencies["jest"] = "^29.5.0";
        if (framework === 'react' || framework === 'nextjs') {
          devDependencies["@testing-library/react"] = "^14.0.0";
          devDependencies["@testing-library/jest-dom"] = "^5.16.5";
        }
        break;
      case 'mocha':
        devDependencies["mocha"] = "^10.2.0";
        devDependencies["chai"] = "^4.3.7";
        break;
      case 'gsap':
        dependencies["gsap"] = "^3.11.5";
        break;
      case 'framer':
        dependencies["framer-motion"] = "^10.12.12";
        break;
      case 'shadcn':
        if (framework === 'react' || framework === 'nextjs') {
          dependencies["@radix-ui/react-dialog"] = "^1.0.4";
          dependencies["@radix-ui/react-slot"] = "^1.0.2";
          dependencies["class-variance-authority"] = "^0.6.0";
          dependencies["clsx"] = "^1.2.1";
          dependencies["tailwind-merge"] = "^1.12.0";
        }
        break;
      case 'materialui':
        if (framework === 'react' || framework === 'nextjs') {
          dependencies["@mui/material"] = "^5.13.2";
          dependencies["@emotion/react"] = "^11.11.0";
          dependencies["@emotion/styled"] = "^11.11.0";
        }
        break;
      case 'bootstrap':
        if (framework === 'react' || framework === 'nextjs') {
          dependencies["bootstrap"] = "^5.2.3";
          dependencies["react-bootstrap"] = "^2.7.4";
        } else if (framework === 'vue') {
          dependencies["bootstrap"] = "^5.2.3";
          dependencies["bootstrap-vue"] = "^2.23.1";
        } else if (framework === 'angular') {
          dependencies["@ng-bootstrap/ng-bootstrap"] = "^14.1.1";
          dependencies["bootstrap"] = "^5.2.3";
        } else {
          dependencies["bootstrap"] = "^5.2.3";
        }
        break;
    }
  });
  
  const packageJson = {
    name: projectName.replace(/\s+/g, '-').toLowerCase(),
    version: "0.1.0",
    private: true,
    dependencies,
    devDependencies,
    scripts
  };
  
  return JSON.stringify(packageJson, null, 2);
}

function generateReadme(projectName: string, framework: string): string {
  return `# ${projectName}

## Description
This project was generated with WebGen using the ${getFrameworkDisplay(framework)} template.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation
1. Clone this repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
   or
   \`\`\`
   yarn
   \`\`\`

### Development
Run the development server:
\`\`\`
npm start
\`\`\`

### Building for Production
Create a production build:
\`\`\`
npm run build
\`\`\`

## Project Structure
A brief overview of the project structure:

- \`src/\`: Source files
  - \`components/\`: Reusable components
  - \`assets/\`: Static assets
  - \`styles/\`: CSS/SCSS files
- \`public/\`: Public assets

## License
MIT
`;
}

function generateEntryPoint(framework: string): string {
  switch (framework) {
    case 'react':
      return `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

    case 'vue':
      return `import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

createApp(App).mount('#app')
`;

    default:
      return `// Main entry point for your application
console.log('Application initialized');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  // You can initialize your application here
  initApp();
});

function initApp() {
  // Add your initialization code here
}
`;
  }
}

function generateAppFile(framework: string, libraries: string[]): string {
  switch (framework) {
    case 'react':
      return `import React from 'react';
${libraries.includes('tailwind') ? "import './styles/tailwind.css';" : "import './styles/App.css';"}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to your new React App</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
`;

    case 'vue':
      return `<template>
  <div class="app">
    <header class="app-header">
      <h1>Welcome to your new Vue App</h1>
      <p>
        Edit <code>src/App.vue</code> and save to reload.
      </p>
    </header>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style${libraries.includes('sass') ? ' lang="scss"' : ''}>
.app {
  text-align: center;
  
  &-header {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
`;

    default:
      return `// App component would be generated here
`;
  }
}

function generateTailwindConfig(): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
}

function generateHtmlFile(projectName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <header>
      <h1>Welcome to ${projectName}</h1>
    </header>
    <main>
      <p>This is a starter template for your web project.</p>
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} ${projectName}</p>
    </footer>
  </div>
  
  <script src="main.js"></script>
</body>
</html>
`;
}

function getFrameworkDisplay(frameworkId: string): string {
  switch (frameworkId) {
    case 'none':
      return 'HTML/CSS/JS';
    case 'nextjs':
      return 'Next.js';
    default:
      return frameworkId.charAt(0).toUpperCase() + frameworkId.slice(1);
  }
}
