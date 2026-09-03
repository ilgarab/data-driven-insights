import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Database, FileSpreadsheet, GaugeCircle, RefreshCw, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Database,
    title: "1. Data mənbələrinin birləşdirilməsi",
    text: "ERP, 1C, SAP, POS, CRM, Excel və verilənlər bazalarınız vahid data anbarında birləşdirilir. Manual hesabat yığmağa ehtiyac qalmır.",
  },
  {
    icon: RefreshCw,
    title: "2. Data modelinin qurulması",
    text: "Satış, maliyyə, anbar və əməliyyat göstəriciləri üçün vahid metrik lüğəti hazırlanır - hər şöbə eyni rəqəmi görür.",
  },
  {
    icon: BarChart3,
    title: "3. Dashboard və hesabatların yaradılması",
    text: "Rəhbərlik, maliyyə və satış komandaları üçün interaktiv BI dashboard-lar və gündəlik, həftəlik, aylıq hesabat şablonları qurulur.",
  },
  {
    icon: GaugeCircle,
    title: "4. Avtomatlaşdırma və bildirişlər",
    text: "Hesabatlar avtomatik yenilənir, kritik göstərici dəyişəndə Metric Alert komandanıza bildiriş göndərir.",
  },
];

const outcomes = [
  {
    icon: FileSpreadsheet,
    title: "Excel-dən avtomatik reporting sisteminə",
    text: "Aylarla vaxt aparan manual hesabat hazırlığı avtomatlaşır, insan səhvi riski azalır.",
  },
  {
    icon: ShieldCheck,
    title: "Vahid həqiqət mənbəyi",
    text: "Bütün şöbələr eyni, təsdiqlənmiş data üzərindən işləyir - hesabat mübahisələri bitir.",
  },
  {
    icon: GaugeCircle,
    title: "Real vaxt qərar dəstəyi",
    text: "Göstəricilər gün ərzində yenilənir, problemi ay bağlananda yox, baş verəndə görürsünüz.",
  },
];

export default function ReportingSystem() {
  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader
            badge="Hesabat sistemi"
            as="h1"
            title="Hesabat sisteminin qurulması və reporting avtomatlaşdırılması"
            subtitle="Metric Analytics biznesiniz üçün hesabatların yaradılması, BI dashboard-ların hazırlanması və reporting sisteminin tam avtomatlaşdırılmasını həyata keçirir."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">Pulsuz konsultasiya alın</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Xidmətlərə baxın</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeader
            title="Reporting sistemi necə qurulur?"
            subtitle="Data mənbələrinin birləşdirilməsindən avtomatik bildirişlərə qədər dörd mərhələli iş axını."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((s, i) => (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <s.icon className="mb-4 text-primary" size={26} />
                <h2 className="text-lg font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
                  {s.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50">
        <div className="container">
          <SectionHeader
            title="Nə qazanırsınız?"
            subtitle="Hesabat sisteminin qurulmasından sonra komandanızın gündəlik işində dəyişən nəticələr."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {outcomes.map((o) => (
              <div key={o.title} className="rounded-2xl border border-border bg-background p-6">
                <o.icon className="mb-4 text-primary" size={24} />
                <h2 className="text-base font-semibold">{o.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
                  {o.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Hesabat sisteminizi birlikdə quraq"
        subtitle="Mövcud datanızı təhlil edək və sizə uyğun reporting arxitekturasını təklif edək."
        buttonText="Bizimlə əlaqə"
      />
    </div>
  );
}
