import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Pesan berhasil dikirim ✨");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "bakwannbeku@gmail.com",
      href: "mailto:bakwannbeku@gmail.com",
    },
    {
      icon: Phone,
      label: "Telepon",
      value: "+62 85373819128",
      href: "https://wa.me/6285373819128",
    },
    {
      icon: MapPin,
      label: "Lokasi",
      value: "Banda Aceh, Indonesia",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden 
      bg-gradient-to-br from-[#fde68a] via-[#fcd34d] to-[#fbbf24]"
    >
      {/* 🌼 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/50 via-yellow-300/40 to-yellow-400/50 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-yellow-700 font-medium mb-2 block">
            Contact
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-900">
            Get In Touch ✨
          </h2>

          <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* LEFT */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.href}
                className="flex items-center gap-4 p-4 
                bg-yellow-200/50 border border-yellow-300 
                rounded-xl hover:bg-yellow-200/70 transition-all group"
              >
                <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-300 transition">
                  <info.icon className="text-yellow-800 w-6 h-6" />
                </div>
                <div>
                  <p className="text-yellow-700 text-sm">{info.label}</p>
                  <p className="text-yellow-900 font-medium">
                    {info.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 
            bg-yellow-200/50 border border-yellow-300 
            rounded-2xl backdrop-blur-sm"
          >
            <input
              name="name"
              placeholder="Nama kamu ✨"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-yellow-100 border border-yellow-300 outline-none"
            />

            <input
              name="email"
              type="email"
              placeholder="Email kamu 📩"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-yellow-100 border border-yellow-300 outline-none"
            />

            <input
              name="subject"
              placeholder="Subject 💬"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-yellow-100 border border-yellow-300 outline-none"
            />

            <textarea
              name="message"
              placeholder="Pesan kamu 🚀"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-yellow-100 border border-yellow-300 min-h-[150px] outline-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl 
              bg-yellow-400 hover:bg-yellow-500 
              text-yellow-900 font-bold transition"
            >
              {isSubmitting ? "Sending..." : "Kirim Pesan"}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}