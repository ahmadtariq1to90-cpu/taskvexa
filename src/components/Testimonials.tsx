import { motion } from "motion/react";
import { Section, SectionHeader } from "./ui/Section";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ali Raza",
    location: "Lahore, Pakistan",
    rating: 5,
    review: "I've been using this app for 2 months and already made over $150 just by doing simple tasks in my free time. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    review: "The instant withdrawal feature is amazing. I completed a few app install tasks and got paid directly to my PayPal within minutes.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Rahul Sharma",
    location: "Mumbai, India",
    rating: 4,
    review: "Great app for students. I use it during my commute to earn some extra pocket money. The referral system is also very rewarding.",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Emma Wilson",
    location: "London, UK",
    rating: 5,
    review: "I love the variety of tasks. From watching ads to following Instagram pages, there's always something to do to earn coins.",
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Ahmed Hassan",
    location: "Cairo, Egypt",
    rating: 5,
    review: "Best earning app I've tried. The interface is clean, and the support team is very responsive if you ever have an issue.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
];

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4000 })]);

  return (
    <Section className="bg-dark-800/30">
      <SectionHeader 
        title="What Our Users Say" 
        subtitle="Join thousands of satisfied users who are already earning money every day."
      />
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 py-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-[0_0_90%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl h-full flex flex-col"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-8 flex-grow italic">"{testimonial.review}"</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full border-2 border-brand-500/30"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-brand-400">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
