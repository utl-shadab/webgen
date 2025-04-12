import { useState } from "react";
import { useProjectState } from "@/hooks/useProjectState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import {
  Checkbox
} from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { frameworks, getFrameworkVersions } from "@/lib/templates";
import AnimatedCard from "@/components/AnimatedCard";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectSetupProps {
  onNext: () => void;
}

// Common folder options with descriptions
const folderOptions = [
  { id: 'components', label: 'Components', description: 'Reusable UI components' },
  { id: 'pages', label: 'Pages', description: 'Page components or routes' },
  { id: 'utils', label: 'Utils', description: 'Utility functions and helpers' },
  { id: 'hooks', label: 'Hooks', description: 'Custom React hooks' },
  { id: 'api', label: 'API', description: 'API integration and data fetching' },
  { id: 'assets', label: 'Assets', description: 'Images, fonts, and other static assets' },
  { id: 'styles', label: 'Styles', description: 'Global styles and CSS modules' },
  { id: 'app', label: 'App', description: 'App directory for Next.js app router' },
  { id: 'context', label: 'Context', description: 'React Context providers' },
  { id: 'types', label: 'Types', description: 'TypeScript type definitions' },
  { id: 'services', label: 'Services', description: 'Service classes or functions' },
  { id: 'helpers', label: 'Helpers', description: 'Helper functions and utility code' },
];

export default function ProjectSetup({ onNext }: ProjectSetupProps) {
  const { 
    projectName, 
    setProjectName,
    framework,
    setFramework,
    frameworkVersion,
    setFrameworkVersion,
    folders,
    toggleFolder,
    customFolders,
    addCustomFolder,
    removeCustomFolder,
    customFiles,
    addCustomFile,
    removeCustomFile,
  } = useProjectState();

  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');
  const [activeTab, setActiveTab] = useState('structure');

  const frameworkVersions = getFrameworkVersions(framework);
  
  const handleNextClick = () => {
    if (projectName.trim() === '') {
      // Default project name if empty
      setProjectName('my-awesome-project');
    }
    onNext();
  };

  const handleAddCustomFolder = () => {
    if (newFolderName.trim()) {
      addCustomFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  const handleAddCustomFile = () => {
    if (newFileName.trim()) {
      addCustomFile({
        name: newFileName.trim(),
        content: newFileContent || '// Empty file'
      });
      setNewFileName('');
      setNewFileContent('');
    }
  };

  return (
    <AnimatedCard>
      <Card className="p-6 bg-card mb-6">
        <CardContent className="p-0">
          <motion.h2 
            className="text-xl font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            1. Project Setup
          </motion.h2>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Label htmlFor="project-name" className="block mb-2 text-muted-foreground">Project Name</Label>
            <Input 
              id="project-name"
              type="text" 
              className="w-full p-3 rounded bg-background border text-foreground focus:border-primary" 
              placeholder="my-awesome-project" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Label className="block mb-2 text-muted-foreground">Framework</Label>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
              {frameworks.map((fw, index) => (
                <motion.div 
                  key={fw.id} 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                >
                  <input 
                    type="radio" 
                    id={`framework-${fw.id}`} 
                    name="framework" 
                    value={fw.id} 
                    className="hidden" 
                    checked={framework === fw.id}
                    onChange={() => {
                      setFramework(fw.id);
                      setFrameworkVersion(fw.defaultVersion);
                    }}
                  />
                  <label 
                    htmlFor={`framework-${fw.id}`} 
                    className={`flex flex-col items-center p-2 sm:p-4 border rounded-lg cursor-pointer hover:border-primary transition-colors
                      ${framework === fw.id ? 'border-primary bg-primary/5' : 'border-border'}`}
                  >
                    <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2 text-xl sm:text-2xl">
                      <span className={`material-icons ${framework === fw.id ? 'text-primary' : ''}`}>{fw.icon}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-center">{fw.name}</span>
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Label htmlFor="framework-version" className="block mb-2 text-muted-foreground">Framework Version</Label>
            <Select 
              value={frameworkVersion}
              onValueChange={setFrameworkVersion}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {frameworkVersions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <Tabs defaultValue="structure" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="structure">Project Structure</TabsTrigger>
                <TabsTrigger value="customization">Custom Files</TabsTrigger>
              </TabsList>
              
              <TabsContent value="structure">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Structure</CardTitle>
                    <CardDescription>
                      Choose which folders to include in your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {folderOptions.map((folder) => (
                        <div
                          key={folder.id}
                          className="flex items-start space-x-2"
                        >
                          <Checkbox
                            id={folder.id}
                            checked={folders.includes(folder.id)}
                            onCheckedChange={() => toggleFolder(folder.id)}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor={folder.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {folder.label}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {folder.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Custom folders */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Custom Folders</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {customFolders.map((folder, index) => (
                          <div key={index} className="flex items-center bg-muted px-3 py-1.5 rounded-lg text-sm">
                            <span className="material-icons text-sm mr-1.5">folder</span>
                            <span>{folder}</span>
                            <button 
                              onClick={() => removeCustomFolder(folder)}
                              className="ml-2 text-muted-foreground hover:text-destructive"
                            >
                              <span className="material-icons text-sm">close</span>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="New folder name"
                          value={newFolderName}
                          onChange={(e) => setNewFolderName(e.target.value)}
                          className="flex-1"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddCustomFolder()}
                        />
                        <Button onClick={handleAddCustomFolder} size="sm">
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="customization">
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Files</CardTitle>
                    <CardDescription>
                      Add custom files to your project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Label htmlFor="custom-files" className="block mb-2 text-muted-foreground">Current Custom Files</Label>
                      {customFiles.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No custom files added yet.</div>
                      ) : (
                        <div className="space-y-2">
                          {customFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between border p-3 rounded">
                              <div className="flex items-center">
                                <span className="material-icons text-blue-500 mr-2">description</span>
                                <span>{file.name}</span>
                              </div>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>{file.name}</DialogTitle>
                                      <DialogDescription>File content preview</DialogDescription>
                                    </DialogHeader>
                                    <div className="bg-muted p-4 rounded-md overflow-auto max-h-[400px]">
                                      <pre className="text-sm">{file.content}</pre>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => removeCustomFile(file.name)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="new-file" className="block mb-2 text-muted-foreground">Add New File</Label>
                      <Input
                        id="new-file"
                        placeholder="Filename (e.g. config.js, .env, README.md)"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="mb-2"
                      />
                      <Label htmlFor="file-content" className="block mb-2 text-muted-foreground">File Content</Label>
                      <textarea
                        id="file-content"
                        placeholder="Enter file content..."
                        value={newFileContent}
                        onChange={(e) => setNewFileContent(e.target.value)}
                        className="w-full p-3 rounded bg-background border text-foreground min-h-[150px]"
                      />
                      
                      <Button 
                        onClick={handleAddCustomFile}
                        className="mt-4"
                      >
                        Add File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <div className="flex justify-between mt-10">
            <div></div>
            <Button 
              onClick={handleNextClick}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg flex items-center hover:bg-opacity-90"
            >
              Next
              <span className="material-icons ml-2">arrow_forward</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}
