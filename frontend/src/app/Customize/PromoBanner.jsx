import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  // DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

const PromoBanner = () => {
  const [showContinueDialog, setShowContinueDialog] = React.useState(false);
  const navigate = useNavigate();

  const handlePersonalize = () => {
    setShowContinueDialog(true);
  };

  const handleStartOver = () => {
    setShowContinueDialog(false);
    navigate('/customize');
    // Reset form data if needed
  };

  const handleContinue = () => {
    setShowContinueDialog(false);
    navigate('/customize');
    // Load previous data if needed
  };

  return (
    <section className="bg-yellow-50 overflow-hidden">
      <div className="container mx-auto py-10 md:py-16 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <span className="text-sm md:text-base font-medium text-gray-700">15% off flavors with code BULK</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-candy-brown mt-3 mb-6 leading-tight">
              celebrate their<br />
              <span className="text-candy-orange">sweet success</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors relative overflow-hidden group"
                onClick={handlePersonalize}
              >
                <span className="font-bold">personalize yours</span>
                <div className="bg-white rounded-full p-1 ml-1 relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-pink-500">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <span className="absolute right-0 w-12 h-full bg-white/20 skew-x-[30deg] transform -translate-x-20 transition-transform duration-700 group-hover:translate-x-32"></span>
              </button>
              <button className="border-2 border-candy-brown text-candy-brown hover:bg-candy-brown hover:text-white px-6 py-3 rounded-full font-bold transition-colors">
                shop favors
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-candy-orange rounded-full overflow-hidden flex items-center justify-center shadow-xl">
                <img 
                  src="/lovable-uploads/33be80f9-b022-4be6-975e-fdeba9bae6a5.png" 
                  alt="Graduation candy assortment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white text-xs font-bold px-2 py-1 rounded-full">
                CLASS OF
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-xs font-bold px-2 py-1 rounded-full">
                grad gift
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Dialog */}
      <Dialog open={showContinueDialog} onOpenChange={setShowContinueDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Would you like to continue from where you left off?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-center gap-4 sm:justify-center mt-4">
            <button 
              onClick={handleStartOver}
              className="border-2 border-gray-300 bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-medium transition-colors"
            >
              no, start over
            </button>
            <button 
              onClick={handleContinue}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-2 rounded-full font-medium transition-colors"
            >
              <div className="relative">
                yes
                <span className="absolute -right-4 -top-2">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M8 12.5L11 15.5L16 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PromoBanner;
