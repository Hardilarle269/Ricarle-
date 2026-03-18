import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

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
    href: 'tel:+6281265074129',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Banda Aceh, Indonesia',
    href: '#',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: 'Rica Hardila',
    email: 'ricarlehardilaa@gmail.com',
    subject: "Ricarle's Portfolio",
    message:
      'Perjalanan membuat portfolio ini tidak selalu mudah, sempat menghadapi beberapa error dan almost gave up. Namun, I kept learning and improving hingga akhirnya bisa menyelesaikan ini dengan hasil yang memuaskan. A meaningful step in my journey as a student.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: any) => {
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
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Pesan Terkirim! ✨',
        description: 'Terima kasih telah menghubungi saya.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Gagal Mengirim',
        description: 'Terjadi kesalahan.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="
      relative py-20 md:py-32 overflow-hidden

      bg-gradient-to-br 
      from-[#020617] via-[#020617] to-[#0f172a]

      before:absolute before:inset-0
      before:bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.25),transparent_40%)]

      after:absolute after:inset-0
      after:bg-[radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.2),transparent_40%)]
      "
    >
      <div className="container mx-auto px-4 relative z-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-300 font-medium mb-2 block">
            Contact
          </span>

          <h2 className="
            text-3xl md:text-5xl font-bold mb-4
            bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400
            bg-clip-text text-transparent
          ">
            Get In Touch
          </h2>

          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Let’s Work Together 💯
              </h3>

              <p className="text-white/70 leading-relaxed">
                Punya ide atau project sederhana? Let’s talk.  
                Aku masih belajar, tapi terbuka untuk kolaborasi dan mencoba hal baru together.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="
                  flex items-center gap-4 p-4
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  rounded-xl

                  hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]
                  transition-all group
                  "
                >
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <info.icon className="h-5 w-5 text-purple-300" />
                  </div>

                  <div>
                    <p className="text-sm text-white/50">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <form
              onSubmit={handleSubmit}
              className="
              space-y-6 p-6
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl

              shadow-[0_0_40px_rgba(236,72,153,0.2)]
              "
            >
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />

              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white"
              />

              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white"
              />

              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-white/5 border-white/10 text-white"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                w-full
                bg-gradient-to-r from-purple-500 to-pink-500
                hover:opacity-90
                "
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}