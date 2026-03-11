import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

const screenshots = [
  "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616077168712-fc6c788db4af?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=800&auto=format&fit=crop",
];

export function Screenshots() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [Autoplay({ delay: 3000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Section className="overflow-hidden">
      <SectionHeader 
        title="App Interface" 
        subtitle="Experience a clean, intuitive, and modern user interface designed for maximum earnings."
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 py-10">
            {screenshots.map((src, index) => (
              <div key={index} className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_25%] min-w-0">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative mx-auto w-full max-w-[280px] aspect-[9/19] bg-dark-800 rounded-[2.5rem] border-[6px] border-dark-700 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 inset-x-0 h-5 bg-dark-700 rounded-b-2xl w-32 mx-auto z-20" />
                  <img 
                    src={src} 
                    alt={`App Screenshot ${index + 1}`} 
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors z-10 hidden md:flex"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors z-10 hidden md:flex"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </Section>
  );
}
