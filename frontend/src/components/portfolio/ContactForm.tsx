import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { fadeInUp } from "@/utils/animations";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSubmit = new FormData(e.currentTarget);
    formDataToSubmit.append("access_key", "a480134e-5262-4a59-82f6-3246afdc998e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSubmit
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Message Transmitted!",
          description: "Your vision has been received. I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      toast({
        title: "Transmission Error",
        description: "Failed to broadcast message. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-40 relative overflow-hidden bg-background">
      {/* Dynamic Background Element */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-24"
        >
          <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Connection</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Start a <span className="bg-gradient-primary bg-clip-text text-transparent italic">Conversation</span>
          </h2>
          <div className="w-24 h-2 bg-gradient-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Have a project in mind or just want to say hi? <br />
            Let's build something <span className="text-foreground font-black">extraordinary</span> together.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto glass-card p-12 md:p-16 rounded-[3rem] relative overflow-hidden border-white/10"
        >
          {/* Form Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-4 text-muted-foreground">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-16 pl-16 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all font-medium text-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-4 text-muted-foreground">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-16 pl-16 rounded-2xl glass border-white/10 focus:border-primary/50 transition-all font-medium text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest ml-4 text-muted-foreground">Message</label>
              <div className="relative group">
                <MessageSquare className="absolute left-6 top-8 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Textarea
                  name="message"
                  placeholder="Tell me about your vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="pl-16 pt-8 min-h-[200px] rounded-[2rem] glass border-white/10 focus:border-primary/50 transition-all font-medium text-lg resize-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-20 text-xl font-black bg-primary hover:shadow-glow transition-all rounded-2xl group relative overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Transmitting...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Send className="h-6 w-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Broadcast Message
                </div>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
