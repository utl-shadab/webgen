import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { projectGenerationSchema } from "@shared/schema";
import archiver from "archiver";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Generate file content based on project configuration
function generateFileContent(filePath: string, projectConfig: any): string {
  const { projectName, framework, frameworkVersion, libraries } = projectConfig;
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  
  // Generate package.json with all selected libraries
  if (fileName === 'package.json') {
    const packageJson: any = {
      name: projectName.replace(/\s+/g, '-').toLowerCase(),
      version: "0.1.0",
      private: true,
      description: `${projectName} - A project generated with WebGen`,
      dependencies: {},
      devDependencies: {},
      scripts: {
        "start": "npm start",
        "build": "npm run build",
        "test": "npm test"
      }
    };
    
    // Add framework dependencies with specified versions
    switch (framework) {
      case 'javascript':
        // Basic JavaScript doesn't need special libraries
        packageJson.scripts = {
          "start": "serve -s .",
          "test": "echo \"Error: no test specified\" && exit 1"
        };
        break;
      case 'typescript':
        packageJson.dependencies["typescript"] = frameworkVersion === 'latest' ? "^5.0.4" : `^${frameworkVersion}`;
        packageJson.scripts = {
          "start": "tsc --watch",
          "build": "tsc",
          "test": "echo \"Error: no test specified\" && exit 1"
        };
        packageJson.devDependencies["@types/node"] = "^20.4.5";
        break;
      case 'react':
        packageJson.dependencies["react"] = frameworkVersion === 'latest' ? "^18.2.0" : `^${frameworkVersion}`;
        packageJson.dependencies["react-dom"] = frameworkVersion === 'latest' ? "^18.2.0" : `^${frameworkVersion}`;
        packageJson.scripts = {
          "start": "react-scripts start",
          "build": "react-scripts build",
          "test": "react-scripts test",
          "eject": "react-scripts eject"
        };
        break;
      case 'nextjs':
        packageJson.dependencies["next"] = frameworkVersion === 'latest' ? "^13.4.12" : `^${frameworkVersion}`;
        packageJson.dependencies["react"] = "^18.2.0";
        packageJson.dependencies["react-dom"] = "^18.2.0";
        packageJson.scripts = {
          "dev": "next dev",
          "build": "next build",
          "start": "next start",
          "lint": "next lint"
        };
        break;
      case 'vue':
        packageJson.dependencies["vue"] = frameworkVersion === 'latest' ? "^3.3.4" : `^${frameworkVersion}`;
        if (frameworkVersion.startsWith('3')) {
          packageJson.scripts = {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          };
          packageJson.devDependencies["@vitejs/plugin-vue"] = "^4.2.3";
          packageJson.devDependencies["vite"] = "^4.4.7";
        } else {
          packageJson.scripts = {
            "serve": "vue-cli-service serve",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
          };
        }
        break;
      case 'angular':
        packageJson.dependencies["@angular/core"] = frameworkVersion === 'latest' ? "^16.1.6" : `^${frameworkVersion}`;
        packageJson.dependencies["@angular/common"] = frameworkVersion === 'latest' ? "^16.1.6" : `^${frameworkVersion}`;
        packageJson.dependencies["@angular/platform-browser"] = frameworkVersion === 'latest' ? "^16.1.6" : `^${frameworkVersion}`;
        packageJson.dependencies["rxjs"] = "^7.8.1";
        packageJson.dependencies["zone.js"] = "~0.13.1";
        packageJson.scripts = {
          "ng": "ng",
          "start": "ng serve",
          "build": "ng build",
          "watch": "ng build --watch --configuration development",
          "test": "ng test"
        };
        break;
    }
    
    // Add libraries with latest versions
    libraries.forEach((lib: string) => {
      switch (lib) {
        case 'tailwind':
          packageJson.devDependencies["tailwindcss"] = "^3.3.3";
          packageJson.devDependencies["postcss"] = "^8.4.27";
          packageJson.devDependencies["autoprefixer"] = "^10.4.14";
          break;
        case 'sass':
          packageJson.devDependencies["sass"] = "^1.64.2";
          break;
        case 'redux':
          packageJson.dependencies["@reduxjs/toolkit"] = "^1.9.5";
          if (framework === 'react' || framework === 'nextjs') {
            packageJson.dependencies["react-redux"] = "^8.1.2";
          }
          break;
        case 'zustand':
          packageJson.dependencies["zustand"] = "^4.4.0";
          break;
        case 'recoil':
          packageJson.dependencies["recoil"] = "^0.7.7";
          break;
        case 'jest':
          packageJson.devDependencies["jest"] = "^29.6.2";
          if (framework === 'react' || framework === 'nextjs') {
            packageJson.devDependencies["@testing-library/react"] = "^14.0.0";
            packageJson.devDependencies["@testing-library/jest-dom"] = "^5.17.0";
          }
          break;
        case 'mocha':
          packageJson.devDependencies["mocha"] = "^10.2.0";
          packageJson.devDependencies["chai"] = "^4.3.7";
          break;
        case 'vitest':
          packageJson.devDependencies["vitest"] = "^0.34.1";
          if (framework === 'react' || framework === 'nextjs') {
            packageJson.devDependencies["@testing-library/react"] = "^14.0.0";
          }
          break;
        case 'gsap':
          packageJson.dependencies["gsap"] = "^3.12.2";
          break;
        case 'framer':
          packageJson.dependencies["framer-motion"] = "^10.15.0";
          break;
        case 'shadcn':
          if (framework === 'react' || framework === 'nextjs') {
            packageJson.dependencies["@radix-ui/react-dialog"] = "^1.0.4";
            packageJson.dependencies["@radix-ui/react-slot"] = "^1.0.2";
            packageJson.dependencies["class-variance-authority"] = "^0.7.0";
            packageJson.dependencies["clsx"] = "^2.0.0";
            packageJson.dependencies["tailwind-merge"] = "^1.14.0";
          }
          break;
        case 'materialui':
          if (framework === 'react' || framework === 'nextjs') {
            packageJson.dependencies["@mui/material"] = "^5.14.3";
            packageJson.dependencies["@emotion/react"] = "^11.11.1";
            packageJson.dependencies["@emotion/styled"] = "^11.11.0";
          }
          break;
        case 'bootstrap':
          if (framework === 'react' || framework === 'nextjs') {
            packageJson.dependencies["bootstrap"] = "^5.3.1";
            packageJson.dependencies["react-bootstrap"] = "^2.8.0";
          } else if (framework === 'vue') {
            if (frameworkVersion.startsWith('3')) {
              packageJson.dependencies["bootstrap"] = "^5.3.1";
              packageJson.dependencies["bootstrap-vue-3"] = "^0.5.1";
            } else {
              packageJson.dependencies["bootstrap"] = "^5.3.1";
              packageJson.dependencies["bootstrap-vue"] = "^2.23.1";
            }
          } else if (framework === 'angular') {
            packageJson.dependencies["@ng-bootstrap/ng-bootstrap"] = "^15.1.0";
            packageJson.dependencies["bootstrap"] = "^5.3.1";
          } else {
            packageJson.dependencies["bootstrap"] = "^5.3.1";
          }
          break;
      }
    });
    
    return JSON.stringify(packageJson, null, 2);
  }
  
  // Generate README.md
  if (fileName === 'README.md') {
    let frameworkDisplay = framework;
    switch (framework) {
      case 'nextjs': frameworkDisplay = 'Next.js'; break;
      case 'typescript': frameworkDisplay = 'TypeScript'; break;
      case 'javascript': frameworkDisplay = 'JavaScript'; break;
      case 'react': frameworkDisplay = 'React'; break;
      case 'vue': frameworkDisplay = 'Vue.js'; break;
      case 'angular': frameworkDisplay = 'Angular'; break;
    }
    
    let libraryList = '';
    if (libraries.length > 0) {
      libraryList = '\n\n## Libraries and Tools\n\n';
      libraries.forEach((lib: string) => {
        libraryList += `- ${lib.charAt(0).toUpperCase() + lib.slice(1)}\n`;
      });
    }
    
    return `# ${projectName}

## Description
This project was generated with WebGen using the ${frameworkDisplay} ${frameworkVersion} template.
${libraryList}
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
  
  // For other file types, use more basic templates
  switch (ext) {
    case '.js':
    case '.ts':
      return `// ${path.basename(filePath)}
// Generated for ${projectName} with ${framework} ${frameworkVersion}
// Created with WebGen

${framework === 'react' || framework === 'nextjs' ? 
  "import React from 'react';\n\n" : ""}
console.log('Hello from ${framework}!');

// This file would contain actual implementation code in a real project
// It has been generated as a placeholder to demonstrate the project structure
`;
    case '.jsx':
    case '.tsx':
      return `// ${path.basename(filePath)}
// Generated for ${projectName} with ${framework} ${frameworkVersion}
// Created with WebGen

import React from 'react';

export default function ${path.basename(filePath, ext)}() {
  return (
    <div>
      <h1>${path.basename(filePath, ext)} Component</h1>
      <p>This is a placeholder for your actual component implementation.</p>
    </div>
  );
}
`;
    case '.html':
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName}</title>
  ${libraries.includes('bootstrap') ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">' : ''}
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="${framework === 'react' || framework === 'vue' ? 'root' : 'app'}">
    <header>
      <h1>Welcome to ${projectName}</h1>
    </header>
    <main>
      <p>This is a starter template for your ${framework} project.</p>
    </main>
    <footer>
      <p>&copy; ${new Date().getFullYear()} ${projectName}</p>
    </footer>
  </div>
  
  ${libraries.includes('bootstrap') ? '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>' : ''}
  <script src="main.js"></script>
</body>
</html>`;
    case '.css':
      let cssContent = `/* Styles for ${projectName} */
${libraries.includes('tailwind') ? '/* Tailwind CSS will be imported here */' : ''}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
}

footer {
  text-align: center;
  padding: 20px 0;
  margin-top: 30px;
  border-top: 1px solid #eee;
}
`;
      return cssContent;
    case '.scss':
      return `// SCSS Variables
$primary-color: #4a90e2;
$secondary-color: #50e3c2;
$text-color: #333;
$background-color: #f9f9f9;

// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Base styles
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: $text-color;
  background-color: $background-color;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

// Generated for ${projectName} with ${framework} ${frameworkVersion}
`;
    default:
      return `// ${path.basename(filePath)}
// Generated for ${projectName} with ${framework} ${frameworkVersion}
// Created with WebGen

// This file would contain actual implementation code in a real project
// It has been generated as a placeholder to demonstrate the project structure
`;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to generate and download project
  app.post("/api/generate", async (req, res) => {
    try {
      // Validate request body against schema
      const projectConfig = projectGenerationSchema.parse(req.body);
      
      // Log the generation request
      console.log(`Generating project: ${projectConfig.projectName} with framework: ${projectConfig.framework}`);
      
      // Create a zip file
      const archive = archiver('zip', {
        zlib: { level: 9 } // Compression level
      });
      
      // Set the headers for file download
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=${projectConfig.projectName}.zip`);
      
      // Pipe the archive to the response
      archive.pipe(res);
      
      // Generate files based on project configuration
      const { projectName, framework, frameworkVersion, libraries, folders } = projectConfig;
      
      // Create base structure
      archive.append(generateFileContent('README.md', projectConfig), { name: `${projectName}/README.md` });
      archive.append(generateFileContent('package.json', projectConfig), { name: `${projectName}/package.json` });
      
      // Create src directory with base files based on framework
      switch (framework) {
        case 'none':
          archive.append(generateFileContent('index.html', projectConfig), { name: `${projectName}/src/index.html` });
          archive.append(generateFileContent('styles.css', projectConfig), { name: `${projectName}/src/styles.css` });
          archive.append(generateFileContent('main.js', projectConfig), { name: `${projectName}/src/main.js` });
          break;
        case 'javascript':
          // Create basic JavaScript project structure
          archive.append(generateFileContent('index.html', projectConfig), { name: `${projectName}/index.html` });
          archive.append(generateFileContent('styles.css', projectConfig), { name: `${projectName}/css/styles.css` });
          archive.append(generateFileContent('main.js', projectConfig), { name: `${projectName}/js/main.js` });
          archive.append(generateFileContent('utils.js', projectConfig), { name: `${projectName}/js/utils.js` });
          archive.append(generateFileContent('app.js', projectConfig), { name: `${projectName}/js/app.js` });
          
          // Add basic module structure
          archive.append(generateFileContent('module1.js', projectConfig), { name: `${projectName}/js/modules/module1.js` });
          archive.append(generateFileContent('module2.js', projectConfig), { name: `${projectName}/js/modules/module2.js` });
          break;
        case 'typescript':
          // Create TypeScript project structure
          archive.append(generateFileContent('index.html', projectConfig), { name: `${projectName}/index.html` });
          archive.append(generateFileContent('styles.css', projectConfig), { name: `${projectName}/css/styles.css` });
          archive.append(generateFileContent('main.ts', projectConfig), { name: `${projectName}/src/main.ts` });
          archive.append(generateFileContent('utils.ts', projectConfig), { name: `${projectName}/src/utils.ts` });
          archive.append(generateFileContent('app.ts', projectConfig), { name: `${projectName}/src/app.ts` });
          
          // Add TypeScript configuration
          archive.append(`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "./dist",
    "sourceMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}`, { name: `${projectName}/tsconfig.json` });
          
          // Add type definitions
          archive.append(`export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AppConfig {
  apiUrl: string;
  theme: 'light' | 'dark';
  language: string;
}
`, { name: `${projectName}/src/types/index.ts` });
          break;
        case 'react':
          archive.append(generateFileContent('index.js', projectConfig), { name: `${projectName}/src/index.js` });
          archive.append(generateFileContent('App.js', projectConfig), { name: `${projectName}/src/App.js` });
          archive.append(generateFileContent('index.css', projectConfig), { name: `${projectName}/src/index.css` });
          // Add pages folder
          archive.append(generateFileContent('Home.js', projectConfig), { name: `${projectName}/src/pages/Home.js` });
          archive.append(generateFileContent('About.js', projectConfig), { name: `${projectName}/src/pages/About.js` });
          break;
        case 'nextjs':
          // App directory structure (App Router)
          archive.append(generateFileContent('page.tsx', projectConfig), { name: `${projectName}/src/app/page.tsx` });
          archive.append(generateFileContent('layout.tsx', projectConfig), { name: `${projectName}/src/app/layout.tsx` });
          archive.append(generateFileContent('globals.css', projectConfig), { name: `${projectName}/src/app/globals.css` });
          archive.append(generateFileContent('about/page.tsx', projectConfig), { name: `${projectName}/src/app/about/page.tsx` });
          archive.append(generateFileContent('dashboard/page.tsx', projectConfig), { name: `${projectName}/src/app/dashboard/page.tsx` });
          
          // Pages directory structure (Pages Router)
          archive.append(generateFileContent('_app.tsx', projectConfig), { name: `${projectName}/src/pages/_app.tsx` });
          archive.append(generateFileContent('index.tsx', projectConfig), { name: `${projectName}/src/pages/index.tsx` });
          archive.append(generateFileContent('api/hello.ts', projectConfig), { name: `${projectName}/src/pages/api/hello.ts` });
          break;
        case 'vue':
          archive.append(generateFileContent('main.js', projectConfig), { name: `${projectName}/src/main.js` });
          archive.append(generateFileContent('App.vue', projectConfig), { name: `${projectName}/src/App.vue` });
          // Add pages folder
          archive.append(generateFileContent('Home.vue', projectConfig), { name: `${projectName}/src/pages/Home.vue` });
          archive.append(generateFileContent('About.vue', projectConfig), { name: `${projectName}/src/pages/About.vue` });
          break;
        case 'angular':
          archive.append(generateFileContent('main.ts', projectConfig), { name: `${projectName}/src/main.ts` });
          archive.append(generateFileContent('app.module.ts', projectConfig), { name: `${projectName}/src/app/app.module.ts` });
          archive.append(generateFileContent('app.component.ts', projectConfig), { name: `${projectName}/src/app/app.component.ts` });
          archive.append(generateFileContent('app.component.html', projectConfig), { name: `${projectName}/src/app/app.component.html` });
          // Add pages folder
          archive.append(generateFileContent('home.component.ts', projectConfig), { name: `${projectName}/src/app/pages/home/home.component.ts` });
          archive.append(generateFileContent('home.component.html', projectConfig), { name: `${projectName}/src/app/pages/home/home.component.html` });
          archive.append(generateFileContent('about.component.ts', projectConfig), { name: `${projectName}/src/app/pages/about/about.component.ts` });
          archive.append(generateFileContent('about.component.html', projectConfig), { name: `${projectName}/src/app/pages/about/about.component.html` });
          break;
      }
      
      // Add folders based on user selection
      folders.forEach(folder => {
        switch (folder) {
          case 'components':
            archive.append(generateFileContent('Header.js', projectConfig), { name: `${projectName}/src/${folder}/Header.js` });
            archive.append(generateFileContent('Footer.js', projectConfig), { name: `${projectName}/src/${folder}/Footer.js` });
            break;
          case 'utils':
            archive.append(generateFileContent('helpers.js', projectConfig), { name: `${projectName}/src/${folder}/helpers.js` });
            break;
          case 'api':
            archive.append(generateFileContent('index.js', projectConfig), { name: `${projectName}/src/${folder}/index.js` });
            break;
          case 'assets':
            // Create an empty directory
            archive.append('', { name: `${projectName}/src/${folder}/.gitkeep` });
            break;
          case 'styles':
            archive.append(generateFileContent('global.css', projectConfig), { name: `${projectName}/src/${folder}/global.css` });
            if (libraries.includes('sass')) {
              archive.append(generateFileContent('variables.scss', projectConfig), { name: `${projectName}/src/${folder}/variables.scss` });
            }
            break;
          case 'hooks':
            archive.append(generateFileContent('useAuth.js', projectConfig), { name: `${projectName}/src/${folder}/useAuth.js` });
            break;
        }
      });
      
      // Add config files for libraries
      libraries.forEach((lib: string) => {
        switch (lib) {
          case 'tailwind':
            archive.append(generateFileContent('tailwind.config.js', projectConfig), { name: `${projectName}/tailwind.config.js` });
            archive.append(generateFileContent('postcss.config.js', projectConfig), { name: `${projectName}/postcss.config.js` });
            break;
          case 'jest':
            archive.append(generateFileContent('jest.config.js', projectConfig), { name: `${projectName}/jest.config.js` });
            break;
        }
      });
      
      // Public directory for web assets
      if (framework !== 'none') {
        archive.append(generateFileContent('index.html', projectConfig), { name: `${projectName}/public/index.html` });
        // Create empty favicon placeholder
        archive.append('', { name: `${projectName}/public/favicon.ico` });
      }
      
      // Store the generated project record
      await storage.createGeneratedProject({
        name: projectName,
        framework,
        frameworkVersion,
        libraries: JSON.stringify(libraries),
        folders: JSON.stringify(folders),
        generatedAt: new Date().toISOString(),
        downloadCount: 1
      });
      
      // Finalize the archive
      await archive.finalize();
      
    } catch (error) {
      console.error('Error generating project:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: 'Invalid project configuration', details: error.errors });
      } else {
        res.status(500).json({ error: 'Failed to generate project' });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
