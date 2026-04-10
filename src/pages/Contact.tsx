import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const contactInfo = [
  { icon: MapPin, title: "Adresse", value: "À venir — Momuy, Landes (40)" },
  { icon: Phone, title: "Téléphone", value: "À venir" },
  { icon: Mail, title: "Email", value: "À venir" },
  { icon: Clock, title: "Horaires", value: "À venir" },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const scrollRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message envoyé !", description: "Nous vous répondrons dans les plus brefs délais." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24" ref={scrollRef}>
        <div className="container mx-auto px-4">
          <div className="scroll-reveal text-center mb-14">
            <h1 className="text-2xl md:text-4xl font-bold font-heading">
              <span className="text-gradient">Contactez</span>-nous
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8 scroll-reveal">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:shadow-premium-glow transition-all duration-300">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-base">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="card-premium p-8 md:p-10 space-y-6 scroll-reveal">
              <h2 className="text-lg font-bold font-heading mb-2">Envoyez-nous un message</h2>
              <Input
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-background/50 border-border/40 focus:border-accent transition-colors h-12"
              />
              <Input
                type="email"
                placeholder="Votre email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-background/50 border-border/40 focus:border-accent transition-colors h-12"
              />
              <Input
                type="tel"
                placeholder="Votre téléphone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="bg-background/50 border-border/40 focus:border-accent transition-colors h-12"
              />
              <Textarea
                placeholder="Votre message..."
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="bg-background/50 border-border/40 focus:border-accent transition-colors resize-none"
              />
              <button type="submit" className="btn-premium w-full py-3.5 rounded-xl text-sm">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
