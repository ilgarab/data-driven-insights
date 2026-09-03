import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, LineChart, PieChart, ShieldAlert, Target, Workflow } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import CTABanner from "@/components/CTABanner";
import { Button } from "@/components/ui/button";

const areas = [
  {
    icon: PieChart,
    title: "Biznes analitikası (BI)",
    text: "Satış, maliyyə, anbar və müştəri göstəricilərini vahid BI dashboard-da toplayırıq. Rəhbərlik bir ekrandan bütün biznesi izləyir.",
  },
  {
    icon: LineChart,
    title: "Data analitikası və modelləşdirmə",
    text: "Xam datanı təmizləyir, strukturlaşdırır və biznes suallarına cavab verən analitik modellərə çeviririk.",
  },
  {
    icon: Workflow,
    title: "Hesabatların yaradılması",
    text: "Gündəlik, həftəlik və aylıq hesabatlar avtomatlaşır - manual Excel işi aradan qalxır.",
  },
  {
    icon: Brain,
    title: "AI və proqnozlaşdırma",
    text: "Metric AI tələb proqnozu, müştəri davranışı və trend analizi ilə gələcək ssenariləri hesablayır.",
  },
  {
    icon: ShieldAlert,
    title: "Fraud aşkarlama",
    text: "Metric Fraud əməliyyatlardakı anomaliyaları aşkarlayır və itkilərin qarşısını əvvəlcədən alır.",
  },
  {
    icon: Target,
    title: "KPI və hədəf izləmə",
    text: "Şirkət, şöbə və işçi səviyyəsində KPI-lar təyin olunur, icra real vaxtda izlənir.",
  },
];

export default function DataAnalytics() {
  return (
    <div className="pt-16">
      <section className="hero-gradient section-padding">
        <div className="container">
          <SectionHeader
            badge="Analitika şirkəti"
            as="h1"
            title="Data analitikası və biznes analitikası xidmətləri"
            subtitle="Metric Analytics - Bakıda yerləşən analitika şirkətidir. Data analitikası, biznes analitikası, BI dashboard və hesabat həlləri ilə şirkətlərə data əsaslı qərar verməyə kömək edirik."
          />
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">Demo istəyin</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/hesabat-sistemi">Hesabat sistemi</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <SectionHeader
            title="Analitika istiqamətlərimiz"
            subtitle="Data toplanmasından proqnozlaşdırmaya qədər bütün analitika zəncirini əhatə edirik."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <a.icon className="mb-4 text-primary" size={26} />
                <h2 className="text-lg font-semibold">{a.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground" style={{ lineHeight: "1.7" }}>
                  {a.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-card/50">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold md:text-3xl">Niyə Metric Analytics?</h2>
          <p className="mt-4 text-muted-foreground" style={{ lineHeight: "1.8" }}>
            Komandamız pərakəndə, maliyyə, istehsal və xidmət sektorlarında data layihələri həyata keçirib. Hər layihədə
            eyni prinsipi izləyirik: əvvəlcə biznes sualını müəyyən edirik, sonra data arxitekturasını qururuq və yalnız
            bundan sonra dashboard hazırlayırıq. Nəticədə hesabat yalnız gözəl görünmür - qərar verməyə xidmət edir.
          </p>
          <p className="mt-4 text-muted-foreground" style={{ lineHeight: "1.8" }}>
            Metric BI, Metric Alert, Metric AI və Metric Fraud modulları bir-birini tamamlayır: göstəriciləri izləyir,
            sapmaları bildirir, gələcəyi proqnozlaşdırır və riskləri aşkarlayır.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/services">Xidmətlərimiz</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/about">Haqqımızda</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABanner
        title="Datanızı dəyərə çevirək"
        subtitle="Qısa görüşdə mövcud hesabat prosesinizi qiymətləndirək və uyğun analitika həllini təklif edək."
        buttonText="Bizimlə əlaqə"
      />
    </div>
  );
}
