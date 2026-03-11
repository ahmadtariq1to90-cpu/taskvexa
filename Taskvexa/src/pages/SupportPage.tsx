import { motion } from "motion/react";
import { Mail, SendHorizontal } from "lucide-react";
import { Button } from "../components/ui/Button";

export function SupportPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Help & <span className="text-gradient">Support</span></h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Need assistance? We're here to help. Reach out to us through any of the channels below or fill out the contact form.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6">Contact Channels</h2>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <a href="mailto:support@taskvexa.app" className="text-lg font-medium hover:text-brand-400 transition-colors">support@taskvexa.app</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-[#25D366]">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.031 0C5.396 0 .016 5.38.016 12.016c0 2.122.553 4.195 1.605 6.014L.03 24l6.125-1.605a11.96 11.96 0 005.876 1.53h.005c6.634 0 12.016-5.38 12.016-12.015C24.052 5.38 18.669 0 12.031 0zm0 21.94c-1.796 0-3.555-.483-5.093-1.395l-.365-.217-3.784.992.992-3.69-.238-.379a9.98 9.98 0 01-1.528-5.236c0-5.513 4.488-10.002 10.016-10.002 5.526 0 10.014 4.489 10.014 10.002 0 5.514-4.488 10.002-10.014 10.002zm5.494-7.513c-.301-.15-1.784-.881-2.061-.982-.276-.1-.477-.15-.678.15-.201.301-.778.982-.954 1.183-.176.201-.352.226-.653.076-.301-.15-1.273-.469-2.424-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.928-2.236-.244-.588-.492-.508-.678-.517-.176-.008-.377-.008-.578-.008-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.51 0 1.481 1.079 2.912 1.23 3.113.15.201 2.122 3.238 5.14 4.54.718.309 1.278.494 1.716.632.72.228 1.375.196 1.893.119.581-.086 1.784-.73 2.035-1.435.251-.705.251-1.31.176-1.435-.075-.125-.276-.2-.578-.351z"/></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">WhatsApp Number</p>
                  <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#25D366] hover:text-[#128C7E] transition-colors">+1 (555) 123-4567</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-[#25D366]">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.031 0C5.396 0 .016 5.38.016 12.016c0 2.122.553 4.195 1.605 6.014L.03 24l6.125-1.605a11.96 11.96 0 005.876 1.53h.005c6.634 0 12.016-5.38 12.016-12.015C24.052 5.38 18.669 0 12.031 0zm0 21.94c-1.796 0-3.555-.483-5.093-1.395l-.365-.217-3.784.992.992-3.69-.238-.379a9.98 9.98 0 01-1.528-5.236c0-5.513 4.488-10.002 10.016-10.002 5.526 0 10.014 4.489 10.014 10.002 0 5.514-4.488 10.002-10.014 10.002zm5.494-7.513c-.301-.15-1.784-.881-2.061-.982-.276-.1-.477-.15-.678.15-.201.301-.778.982-.954 1.183-.176.201-.352.226-.653.076-.301-.15-1.273-.469-2.424-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.135-.135.301-.351.452-.527.15-.176.201-.301.301-.502.1-.201.05-.376-.025-.527-.075-.15-.678-1.634-.928-2.236-.244-.588-.492-.508-.678-.517-.176-.008-.377-.008-.578-.008-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.51 0 1.481 1.079 2.912 1.23 3.113.15.201 2.122 3.238 5.14 4.54.718.309 1.278.494 1.716.632.72.228 1.375.196 1.893.119.581-.086 1.784-.73 2.035-1.435.251-.705.251-1.31.176-1.435-.075-.125-.276-.2-.578-.351z"/></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">WhatsApp Channel</p>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#25D366] hover:text-[#128C7E] transition-colors">Join our Channel</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-[#0088cc]">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telegram Channel</p>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#0088cc] hover:text-[#006699] transition-colors">@TaskvexaChannel</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-[#0088cc]">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telegram Username</p>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#0088cc] hover:text-[#006699] transition-colors">@TaskvexaSupport</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
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
              
              <Button type="submit" className="w-full gap-2 mt-2">
                <SendHorizontal size={18} />
                Submit Form
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
