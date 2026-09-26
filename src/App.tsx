import { lang } from "./i18n";
import { LightboxProvider } from "./site/Lightbox";
import { Hero, Intro, Nav } from "./site/Top";
import { Facilities, Homes } from "./site/Middle";
import { Enquiry, Faq, Footer, Gallery, Location, WhatsAppFloat } from "./site/Bottom";

// Cappella Embassy (formerly D'Rapport Residences): light brochure design, English at "/", Chinese at "/zh".
export default function App() {
  return (
    <LightboxProvider>
      <div lang={lang === "zh" ? "zh-CN" : "en"} className={`min-h-screen bg-paper text-ink ${lang === "zh" ? "zh" : ""}`}>
        <Nav />
        <main>
          <Hero />
          <Intro />
          <Facilities />
          <Homes />
          <Location />
          <Gallery />
          <Enquiry />
          <Faq />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LightboxProvider>
  );
}
