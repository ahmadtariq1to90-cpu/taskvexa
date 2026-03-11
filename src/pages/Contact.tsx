import { Section, SectionHeader } from "../components/ui/Section";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Contact() {
  return (
    <Section className="pt-32 pb-20">
      <SectionHeader 
        title="Contact Support" 
        subtitle="We're here to help. Reach out to us if you have any questions or issues."
      />
      
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <div className="space-y-8">
          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <p className="text-gray-400 mb-2">For general inquiries and support.</p>
              <a href="mailto:support@taskvexa.app" className="text-brand-400 hover:underline">support@taskvexa.app</a>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <p className="text-gray-400 mb-2">Mon-Fri from 9am to 5pm EST.</p>
              <a href="tel:+15551234567" className="text-brand-400 hover:underline">+1 (555) 123-4567</a>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Office</h3>
              <p className="text-gray-400">
                123 Earning Street, Suite 400<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full h-12 px-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
              <textarea 
                placeholder="How can we help you?" 
                rows={4}
                className="w-full p-4 rounded-xl glass bg-dark-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
              ></textarea>
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </Section>
  );
}
