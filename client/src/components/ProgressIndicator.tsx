
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProgressIndicatorProps {
  currentStep: number;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "Project Setup" },
    { number: 2, label: "Libraries" },
    { number: 3, label: "Preview" },
    { number: 4, label: "Download" },
  ];

  const getProgressWidth = (start: number, end: number) => {
    if (currentStep >= end) return "100%";
    if (currentStep >= start && currentStep < end) return "50%";
    return "0%";
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.querySelector('.steps-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="mb-10 relative">
      <div className="steps-wrapper relative">
        <Button 
          variant="outline" 
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:hidden sm:flex"
          onClick={() => scrollContainer('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="steps-container overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-between min-w-[600px] md:max-w-4xl max-w-2xl mx-auto px-4">
            {steps.map((step, index) => (
              <div key={`step-${step.number}`} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                    ${currentStep >= step.number ? 'bg-primary text-primary-foreground' : 'bg-card text-card-foreground'}`}
                  >
                    {step.number}
                  </div>
                  <span 
                    className={`text-sm ${currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {step.label}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="w-24 mx-2 relative">
                    <div className="h-1 w-full bg-card">
                      <div 
                        className="h-1 bg-primary transition-all" 
                        style={{ width: getProgressWidth(step.number, step.number + 1) }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button 
          variant="outline" 
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:hidden sm:flex"
          onClick={() => scrollContainer('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
