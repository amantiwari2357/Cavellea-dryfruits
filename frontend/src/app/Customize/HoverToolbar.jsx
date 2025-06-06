"use client";

import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from "@/components/ui/hover-card";
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import { 
  HelpCircle,
  RotateCcw, 
  Share2, 
  Sparkles 
} from 'lucide-react';

import { toast } from 'sonner';

const HoverToolbar = ({ onReset }) => {
  const handleFAQClick = () => toast.info("FAQ dialog would open here");
  const handleResetClick = () => {
    if (typeof onReset === 'function') onReset();
    toast.success("Colors reset successfully");
  };
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };
  const handleInspirationClick = () => toast.info("Inspiration gallery would open here");

  return (
    <TooltipProvider>
      <div className="fixed right-6 top-32 ">
        <div className="flex flex-col gap-3 z-999">
          {/* FAQ */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleFAQClick}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <HelpCircle className="text-gray-700" size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">FAQs</TooltipContent>
              </Tooltip>
            </HoverCardTrigger>
            <HoverCardContent side="left" className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">Frequently Asked Questions</h4>
                <p className="text-sm text-gray-500">Learn more about customizing your candy mix and available options.</p>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Reset */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleResetClick}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <RotateCcw className="text-gray-700" size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">Reset Selection</TooltipContent>
              </Tooltip>
            </HoverCardTrigger>
            <HoverCardContent side="left" className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">Reset Your Selection</h4>
                <p className="text-sm text-gray-500">Clear your current color selections and start over.</p>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Share */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleShareClick}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="text-gray-700" size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">Share</TooltipContent>
              </Tooltip>
            </HoverCardTrigger>
            <HoverCardContent side="left" className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">Share Your Creation</h4>
                <p className="text-sm text-gray-500">Copy a link to share your candy mix with friends and family.</p>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Inspiration */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={handleInspirationClick}
                    className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Sparkles className="text-gray-700" size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">Inspiration</TooltipContent>
              </Tooltip>
            </HoverCardTrigger>
            <HoverCardContent side="left" className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">Get Inspired</h4>
                <p className="text-sm text-gray-500">Browse popular candy mixes and design ideas from our gallery.</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default HoverToolbar;
