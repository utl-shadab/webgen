import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressIndicator from "@/components/ProgressIndicator";
import ProjectSetup from "@/components/steps/ProjectSetup";
import LibrarySelection from "@/components/steps/LibrarySelection";
import ProjectPreview from "@/components/steps/ProjectPreview";
import DownloadProject from "@/components/steps/DownloadProject";
import { useProjectState } from "@/hooks/useProjectState";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const projectState = useProjectState();

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    projectState.reset();
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-medium mb-2">Create Web Project</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Generate a starter template with your preferred framework and libraries</p>
        </div>
        
        <ProgressIndicator currentStep={currentStep} />
        
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && (
            <ProjectSetup onNext={handleNextStep} />
          )}
          
          {currentStep === 2 && (
            <LibrarySelection onNext={handleNextStep} onBack={handlePrevStep} />
          )}
          
          {currentStep === 3 && (
            <ProjectPreview onNext={handleNextStep} onBack={handlePrevStep} />
          )}
          
          {currentStep === 4 && (
            <DownloadProject onBack={handlePrevStep} onReset={handleReset} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
