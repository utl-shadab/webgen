import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use WebGen to quickly generate project templates
          </p>
        </motion.div>
        
        <Tabs defaultValue="getting-started" value={activeTab} onValueChange={setActiveTab}>
          <div className="tabs-list-container">
            <TabsList className="grid min-w-[600px] md:min-w-full w-full grid-cols-4">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="libraries">Libraries</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
          </TabsList>
          </div>
          
          <TabsContent value="getting-started">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with WebGen</CardTitle>
                <CardDescription>
                  Learn the basics of using WebGen to create your project templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-medium mb-3">Step 1: Project Setup</h3>
                  <div className="mb-4 space-y-2">
                    <p>Start by naming your project and selecting a framework:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Enter a project name (e.g., "my-awesome-app")</li>
                      <li>Select a framework from the dropdown (JavaScript, TypeScript, React, etc.)</li>
                      <li>Choose the framework version (latest or specific version)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-md">
                    <p className="font-medium mb-2">Pro Tip:</p>
                    <p>Always use clear, descriptive project names. The name will be used in package.json and other configuration files.</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-3">Step 2: Library Selection</h3>
                  <div className="mb-4 space-y-2">
                    <p>Choose the libraries you want to include in your project:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Styling libraries (Tailwind CSS, SASS, etc.)</li>
                      <li>State management libraries (Redux, Zustand, etc.)</li>
                      <li>Testing libraries (Jest, Mocha, etc.)</li>
                      <li>Animation libraries (Framer Motion, GSAP, etc.)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-md">
                    <p className="font-medium mb-2">Pro Tip:</p>
                    <p>Only select the libraries you actually need. Including too many dependencies can bloat your project.</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-medium mb-3">Step 3: Project Preview</h3>
                  <div className="mb-4 space-y-2">
                    <p>Preview your project structure and files:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Navigate the file tree to explore your project structure</li>
                      <li>Select files to preview their content</li>
                      <li>Use "Expand All" to view the entire file structure</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-md">
                    <p className="font-medium mb-2">Pro Tip:</p>
                    <p>The preview shows exactly what your downloaded project will contain. Review the structure carefully.</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-medium mb-3">Step 4: Download</h3>
                  <div className="mb-4 space-y-2">
                    <p>Generate and download your project:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Click the "Generate Project" button to create your project</li>
                      <li>The project will be downloaded as a ZIP file</li>
                      <li>Extract the ZIP and you're ready to start developing</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-secondary/20 rounded-md">
                    <p className="font-medium mb-2">Installation after download:</p>
                    <pre className="bg-secondary/10 p-3 rounded overflow-x-auto">
                      <code>
                        # Navigate to your project folder<br/>
                        cd your-project-name<br/><br/>
                        # Install dependencies<br/>
                        npm install<br/><br/>
                        # Start development server<br/>
                        npm start
                      </code>
                    </pre>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="frameworks">
            <Card>
              <CardHeader>
                <CardTitle>Supported Frameworks</CardTitle>
                <CardDescription>
                  Overview of all the frameworks supported by WebGen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="material-icons text-primary text-3xl mr-3">javascript</span>
                      <h3 className="text-xl font-medium">JavaScript</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Simple JavaScript project with modern ES6+ features and a basic folder structure.</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>ES6 and newer versions</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Module-based structure</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Basic HTML/CSS setup</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="material-icons text-primary text-3xl mr-3">code</span>
                      <h3 className="text-xl font-medium">TypeScript</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">TypeScript project with type definitions, tsconfig and proper project structure.</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Latest TypeScript versions</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Preconfigured tsconfig.json</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Type definitions included</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="material-icons text-primary text-3xl mr-3">hub</span>
                      <h3 className="text-xl font-medium">React</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Modern React applications with hooks, components, and routing.</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>React 18+ setup</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Component structure</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>CSS/SCSS modules</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="material-icons text-primary text-3xl mr-3">auto_awesome</span>
                      <h3 className="text-xl font-medium">Next.js</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Next.js projects with both App Router and Pages Router options.</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>App Router (recommended)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Pages Router (classic)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>API routes setup</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="material-icons text-primary text-3xl mr-3">view_compact</span>
                      <h3 className="text-xl font-medium">Vue</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Vue.js applications with component structure and Vue Router.</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Vue 3 Composition API</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Vue Router setup</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Single-file components</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="material-icons text-primary text-3xl mr-3">change_history</span>
                      <h3 className="text-xl font-medium">Angular</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Angular applications with modules, components, and services.</p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Latest Angular setup</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Module structure</span>
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-2">check_circle</span>
                        <span>Angular routing</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="libraries">
            <Card>
              <CardHeader>
                <CardTitle>Library Options</CardTitle>
                <CardDescription>
                  Learn about the libraries and tools that can be included in your projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-medium mb-4">Styling Libraries</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Tailwind CSS</h4>
                      <p className="text-sm text-muted-foreground">Utility-first CSS framework for rapid UI development</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">SASS/SCSS</h4>
                      <p className="text-sm text-muted-foreground">CSS preprocessor with variables, nesting and mixins</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Shadcn UI</h4>
                      <p className="text-sm text-muted-foreground">UI component library built on Radix UI primitives</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Material UI</h4>
                      <p className="text-sm text-muted-foreground">React components implementing Google's Material Design</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Bootstrap</h4>
                      <p className="text-sm text-muted-foreground">Popular CSS framework with responsive components</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-4">State Management</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Redux Toolkit</h4>
                      <p className="text-sm text-muted-foreground">Modern state management with RTK Query for data fetching</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Zustand</h4>
                      <p className="text-sm text-muted-foreground">Lightweight state management with hooks</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Recoil</h4>
                      <p className="text-sm text-muted-foreground">Atomic state management for React applications</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Vuex/Pinia</h4>
                      <p className="text-sm text-muted-foreground">State management for Vue applications</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">NgRx</h4>
                      <p className="text-sm text-muted-foreground">Redux-inspired state management for Angular</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 className="text-xl font-medium mb-4">Testing Libraries</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Jest</h4>
                      <p className="text-sm text-muted-foreground">JavaScript testing framework with built-in mocking</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Mocha</h4>
                      <p className="text-sm text-muted-foreground">Flexible testing framework with Chai assertions</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Vitest</h4>
                      <p className="text-sm text-muted-foreground">Next-generation testing framework powered by Vite</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-xl font-medium mb-4">Animation Libraries</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">Framer Motion</h4>
                      <p className="text-sm text-muted-foreground">Production-ready animation library for React</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-medium mb-2">GSAP</h4>
                      <p className="text-sm text-muted-foreground">Professional animation library for all frameworks</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customization">
            <Card>
              <CardHeader>
                <CardTitle>Customizing Your Project</CardTitle>
                <CardDescription>
                  Learn how to further customize your generated projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-medium mb-3">Custom Folders and Files</h3>
                  <p className="mb-4">
                    You can customize the folder structure of your project by selecting which folders to include:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">components/</h4>
                      <p className="text-sm text-muted-foreground">Reusable UI components for your application</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">utils/</h4>
                      <p className="text-sm text-muted-foreground">Utility functions and helper methods</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">api/</h4>
                      <p className="text-sm text-muted-foreground">API integration and data fetching utilities</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">hooks/</h4>
                      <p className="text-sm text-muted-foreground">Custom React hooks for state and logic</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">assets/</h4>
                      <p className="text-sm text-muted-foreground">Static assets like images and fonts</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">styles/</h4>
                      <p className="text-sm text-muted-foreground">CSS/SCSS files and style utilities</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-medium mb-3">Post-Generation Modifications</h3>
                  <p className="mb-4">After generating your project, you may want to make additional customizations:</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/20 rounded-md">
                      <h4 className="font-medium mb-2">Adding Custom Dependencies</h4>
                      <p className="mb-2">To add more dependencies to your project:</p>
                      <pre className="bg-secondary/10 p-3 rounded overflow-x-auto">
                        <code>
                          # npm<br/>
                          npm install package-name<br/><br/>
                          # yarn<br/>
                          yarn add package-name
                        </code>
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-secondary/20 rounded-md">
                      <h4 className="font-medium mb-2">Configuration Files</h4>
                      <p>The generated project includes configuration files like:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>package.json - For dependencies and scripts</li>
                        <li>tsconfig.json - TypeScript configuration</li>
                        <li>tailwind.config.js - Tailwind CSS settings</li>
                        <li>.eslintrc.js - Linting rules</li>
                      </ul>
                      <p className="mt-2">These files can be modified to suit your specific project needs.</p>
                    </div>
                    
                    <div className="p-4 bg-secondary/20 rounded-md">
                      <h4 className="font-medium mb-2">Project Structure</h4>
                      <p>You can reorganize the folder structure after generating the project:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Add new folders and files as needed</li>
                        <li>Move components into domain-specific folders</li>
                        <li>Create feature folders for larger applications</li>
                        <li>Add test files alongside your components</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}