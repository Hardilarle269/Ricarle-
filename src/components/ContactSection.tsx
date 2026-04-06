import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

// Skema validasi
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nama harus diisi').max(100),
  email: z.string().trim().email('Email tidak valid').max(255),
  subject: z.string().trim().min(1, 'Subjek harus diisi').max(200),
  message: z.string().trim().min(1, 'Pesan harus diisi').max(2000),
});

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ricarlehardilaa@gmail.com',
    href: 'mailto:ricarlehardilaa@gmail.com',
  },
  {
    icon: Phone,
    label: 'Telepon',
    value: '+62 812 65074129',
    href: 'https://wa.me/6281265074129',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Banda Aceh, Indonesia',
    href: 'https://maps.app.goo.gl/Yp7qmx76Kks4rE8c9',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Hapus error saat user mulai mengetik lagi
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Pastikan Edge Function 'send-contact-email' sudah dibuat di Supabase
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Pesan Terkirim! ✨',
        description: 'Terima kasih sudah menghubungi aku 💙',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      toast({
        title: 'Gagal Mengirim 😢',
        description: error.message || 'Coba lagi nanti ya',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]"
    >
      <div className="container mx-auto px-4 relative z-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-300 font-medium mb-2 block">
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* LEFT: Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <a 
                key={info.label} 
                href={info.href}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group"
              >
                <div className="p-3 bg-white/5 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <info.icon className="text-cyan-300 w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/50 text-sm">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT: Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
          >
            <div className="space-y-2">
              <label className="text-white/70 text-sm ml-1">Name</label>
              <Input
                name="name"
                placeholder="Your Name ✨"
                value={formData.name}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-400 transition-all ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <span className="text-red-400 text-xs">{errors.name}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-white/70 text-sm ml-1">Email</label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com 📩"
                value={formData.email}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-400 transition-all ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-white/70 text-sm ml-1">Subject</label>
              <Input
                name="subject"
                placeholder="Subject 💬"
                value={formData.subject}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-400 transition-all ${errors.subject ? 'border-red-500' : ''}`}
              />
              {errors.subject && <span className="text-red-400 text-xs">{errors.subject}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-white/70 text-sm ml-1">Message</label>
              <Textarea
                name="message"
                placeholder="Write your message... 🚀"
                value={formData.message}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-400 transition-all min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
              />
              {errors.message && <span className="text-red-400 text-xs">{errors.message}</span>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-6 rounded-xl transition-all transform active:scale-95"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                'Kirim Pesan'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}