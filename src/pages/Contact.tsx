import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waLink, setWaLink] = useState("");

  const { t } = useTranslation();

  const serviceOptions = [
    "Metric BI",
    "Metric Alert",
    "Metric AI",
    "Metric Fraud",
    t("contact.other"),
  ];

  const WHATSAPP_NUMBER = "994516524945";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => (fd.get(k) as string)?.trim() || "-";
    const text = [
      "Yeni müraciət - metric.az",
      `Ad: ${get("name")}`,
      `Şirkət: ${get("company")}`,
      `E-poçt: ${get("email")}`,
      `Telefon: ${get("phone")}`,
      `Xidmət: ${get("service")}`,
      `Mesaj: ${get("message")}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    // Popup blokerlərinə qarşı: real link klikini simulyasiya edirik
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setWaLink(url);
    setLoading(false);
    setSubmitted(true);
  };




  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader as="h1" badge={t("contact.badge")} title={t("contact.title")} subtitle={t("contact.subtitle")} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-5">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="mb-6 text-xl font-bold">{t("contact.info")}</h3>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Mail size={18} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("contact.email")}</p>
                      <p className="font-medium">info@metric.az</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Phone size={18} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("contact.phone")}</p>
                      <p className="font-medium">+994 51 652 49 45</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><MapPin size={18} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("contact.address")}</p>
                      <p className="font-medium">{t("contact.addressValue")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.4!2d49.8519!3d40.3791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d079efb5163%3A0x2a9cc64060b6b76e!2sAjami%20Nakhchivani!5e0!3m2!1sen!2saz!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Metric Analytics"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              {submitted ? (
                <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card p-12 text-center">
                  <div>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Send size={28} />
                    </div>
                    <h3 className="text-xl font-bold">{t("contact.successTitle")}</h3>
                    <p className="mt-2 text-muted-foreground">{t("contact.successText")}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glow-card space-y-5 p-6 md:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">{t("contact.name")} *</label>
                      <input name="name" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">{t("contact.company")}</label>
                      <input name="company" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">{t("contact.email")} *</label>
                      <input name="email" type="email" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">{t("contact.phone")}</label>
                      <input name="phone" type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("contact.serviceQuestion")}</label>
                    <select name="service" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="">{t("contact.select")}</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("contact.message")} *</label>
                    <textarea name="message" required rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full active:scale-[0.97]" disabled={loading}>
                    {loading ? t("contact.sending") : t("contact.send")}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
