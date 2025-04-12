import { useProjectState } from "@/hooks/useProjectState";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  getStylingLibraries, 
  getStateLibraries, 
  getTestingLibraries, 
  getAnimationLibraries 
} from "@/lib/templates";
import AnimatedCard from "@/components/AnimatedCard";
import { motion } from "framer-motion";

interface LibrarySelectionProps {
  onNext: () => void;
  onBack: () => void;
}

interface LibraryGroupProps {
  title: string;
  libraries: Array<{ id: string; name: string }>;
  selectedLibraries: string[];
  onToggleLibrary: (id: string) => void;
}

function LibraryGroup({ title, libraries, selectedLibraries, onToggleLibrary }: LibraryGroupProps) {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3 
        className="font-medium mb-4 pb-2 border-b border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h3>
      <div className="space-y-4">
        {libraries.map((lib, index) => (
          <motion.div 
            key={lib.id} 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
          >
            <Checkbox 
              id={`lib-${lib.id}`}
              checked={selectedLibraries.includes(lib.id)}
              onCheckedChange={() => onToggleLibrary(lib.id)}
            />
            <Label htmlFor={`lib-${lib.id}`} className="cursor-pointer">
              {lib.name}
            </Label>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function LibrarySelection({ onNext, onBack }: LibrarySelectionProps) {
  const { 
    framework,
    libraries, 
    toggleLibrary,
    folders,
    toggleFolder
  } = useProjectState();

  const stylingLibraries = getStylingLibraries(framework);
  const stateLibraries = getStateLibraries(framework);
  const testingLibraries = getTestingLibraries();
  const animationLibraries = getAnimationLibraries(framework);

  const folderOptions = [
    { id: 'components', name: 'components/' },
    { id: 'utils', name: 'utils/' },
    { id: 'api', name: 'api/' },
    { id: 'hooks', name: 'hooks/' },
    { id: 'assets', name: 'assets/' },
    { id: 'styles', name: 'styles/' },
  ];

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
            2. Library Selection
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-8">
            <div>
              <LibraryGroup 
                title="Styling"
                libraries={stylingLibraries}
                selectedLibraries={libraries}
                onToggleLibrary={toggleLibrary}
              />
            </div>
            
            <div>
              {stateLibraries.length > 0 && (
                <LibraryGroup 
                  title="State Management"
                  libraries={stateLibraries}
                  selectedLibraries={libraries}
                  onToggleLibrary={toggleLibrary}
                />
              )}
              
              <LibraryGroup 
                title="Testing"
                libraries={testingLibraries}
                selectedLibraries={libraries}
                onToggleLibrary={toggleLibrary}
              />
              
              {animationLibraries.length > 0 && (
                <LibraryGroup 
                  title="Animation"
                  libraries={animationLibraries}
                  selectedLibraries={libraries}
                  onToggleLibrary={toggleLibrary}
                />
              )}
            </div>
          </div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.h3 
              className="font-medium mb-4 pb-2 border-b border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Project Structure
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {folderOptions.map((folder, index) => (
                <motion.div 
                  key={folder.id} 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.05) }}
                >
                  <Checkbox 
                    id={`folder-${folder.id}`}
                    checked={folders.includes(folder.id)}
                    onCheckedChange={() => toggleFolder(folder.id)}
                  />
                  <Label htmlFor={`folder-${folder.id}`} className="cursor-pointer">
                    {folder.name}
                  </Label>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex justify-between mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
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
