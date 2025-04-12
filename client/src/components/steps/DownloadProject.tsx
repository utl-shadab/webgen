import { useMutation } from "@tanstack/react-query";
import { useProjectState } from "@/hooks/useProjectState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { 
  getFrameworkDisplay, 
  getLibraryNames, 
  getFolderDisplay 
} from "@/lib/templates";
import AnimatedCard from "@/components/AnimatedCard";
import { motion } from "framer-motion";

interface DownloadProjectProps {
  onBack: () => void;
  onReset: () => void;
}

export default function DownloadProject({ onBack, onReset }: DownloadProjectProps) {
  const projectState = useProjectState();
  
  const downloadMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate", projectState);
      return response.blob();
    },
    onSuccess: (blob) => {
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectState.projectName}.zip`;
      
      // Append to the DOM, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      URL.revokeObjectURL(url);
    }
  });

  const handleDownload = () => {
    downloadMutation.mutate();
  };
  
  const frameworkDisplay = getFrameworkDisplay(projectState.framework);
  const libraryNames = getLibraryNames(projectState.libraries);
  const foldersDisplay = getFolderDisplay(projectState.folders);

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
            4. Download Project
          </motion.h2>
          
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.div 
              className="bg-background rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.span 
                className="material-icons text-primary text-5xl"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                check_circle
              </motion.span>
            </motion.div>
            
            <motion.h3 
              className="text-xl font-medium mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Your project is ready!
            </motion.h3>
            
            <motion.p 
              className="text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Your starter template has been generated successfully.
            </motion.p>
            
            <motion.div 
              className="max-w-lg mx-auto p-4 bg-background rounded-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.h4 
                className="text-lg mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Project Summary
              </motion.h4>
              
              <motion.ul className="space-y-2 text-left">
                {[
                  { icon: "folder", label: "Project Name", value: projectState.projectName },
                  { icon: "code", label: "Framework", value: `${frameworkDisplay} (${projectState.frameworkVersion})` },
                  { icon: "extension", label: "Libraries", value: libraryNames.length ? libraryNames.join(', ') : 'None' },
                  { icon: "folder_special", label: "Special Folders", value: foldersDisplay.length ? foldersDisplay.join(', ') : 'None' }
                ].map((item, index) => (
                  <motion.li 
                    key={item.label}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + (index * 0.1) }}
                  >
                    <span className="material-icons text-primary mr-2">{item.icon}</span>
                    <div>
                      <strong>{item.label}:</strong> {item.value}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleDownload}
                disabled={downloadMutation.isPending}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-medium hover:bg-opacity-90"
              >
                {downloadMutation.isPending ? (
                  <>
                    <span className="material-icons animate-spin mr-2">refresh</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <span className="material-icons mr-2">download</span>
                    Download ZIP
                  </>
                )}
              </Button>
            </motion.div>
            
            <motion.p 
              className="mt-4 text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              Once downloaded, extract the ZIP file and follow the instructions in the README.md file to get started.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="bg-background p-4 rounded-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.h3 
              className="font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              Next Steps
            </motion.h3>
            
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              {[
                "Extract the ZIP file to your desired location.",
                "Open a terminal and navigate to the project directory.",
                "Run <code className=\"bg-card px-2 py-1 rounded text-sm\">npm install</code> to install the dependencies.",
                "Run <code className=\"bg-card px-2 py-1 rounded text-sm\">npm start</code> to start the development server.",
                "Open your browser and navigate to <code className=\"bg-card px-2 py-1 rounded text-sm\">http://localhost:3000</code>."
              ].map((step, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7 + (index * 0.1) }}
                  dangerouslySetInnerHTML={{ __html: step }}
                />
              ))}
            </ol>
          </motion.div>
          
          <motion.div 
            className="flex justify-between mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onBack}
                variant="outline"
                className="px-6 py-3 border text-foreground rounded-lg flex items-center"
              >
                <span className="material-icons mr-2">arrow_back</span>
                Back
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onReset}
                variant="outline"
                className="px-6 py-3 border text-foreground rounded-lg flex items-center"
              >
                <span className="material-icons mr-2">add</span>
                Create New Project
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}
