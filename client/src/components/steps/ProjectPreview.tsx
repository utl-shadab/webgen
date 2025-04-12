import { useState } from "react";
import { useProjectState } from "@/hooks/useProjectState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import FileTree from "@/components/FileTree";
import FilePreview from "@/components/FilePreview";
import { generateFileStructure, getFileContent } from "@/lib/projectGenerator";
import AnimatedCard from "@/components/AnimatedCard";
import { motion } from "framer-motion";

interface ProjectPreviewProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ProjectPreview({ onNext, onBack }: ProjectPreviewProps) {
  const projectState = useProjectState();
  const [selectedFile, setSelectedFile] = useState('package.json');
  const [areAllFoldersExpanded, setAreAllFoldersExpanded] = useState(false);
  
  const fileStructure = generateFileStructure(projectState);
  const fileContent = getFileContent(selectedFile, projectState);

  const toggleAllFolders = () => {
    setAreAllFoldersExpanded(!areAllFoldersExpanded);
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
            3. Project Preview
          </motion.h2>
          
          <motion.div 
            className="mb-6 p-4 bg-background rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <motion.h3 
                className="font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                File Structure
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  variant="outline"
                  className="text-sm px-3 py-1 border rounded w-full sm:w-auto"
                  onClick={toggleAllFolders}
                >
                  {areAllFoldersExpanded ? 'Collapse All' : 'Expand All'}
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <FileTree 
                structure={fileStructure} 
                onSelectFile={setSelectedFile}
                selectedFile={selectedFile}
                areAllFoldersExpanded={areAllFoldersExpanded}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.h3 
              className="font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              File Preview
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <FilePreview 
                filename={selectedFile}
                content={fileContent}
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex justify-between mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Button 
              onClick={onBack}
              variant="outline"
              className="px-6 py-3 border text-foreground rounded-lg flex items-center"
            >
              <span className="material-icons mr-2">arrow_back</span>
              Back
            </Button>
            
            <Button 
              onClick={onNext}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg flex items-center hover:bg-opacity-90"
            >
              Next
              <span className="material-icons ml-2">arrow_forward</span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
}
