import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Fleet from "@/components/Fleet";
import Benefits from "@/components/Benefits";
import Coverage from "@/components/Coverage";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingSidebar from "@/components/FloatingSidebar";
import AIAssistant from "@/components/AIAssistant";
import RightSideGamePopup from "@/components/RightSideGamePopup";

export default function Home() {
  return (
    <>
      <RightSideGamePopup />
      {/* tu contenido normal */}
      <main>...</main>
    </>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Fleet />
      <Benefits />
      <Coverage />
      <AboutUs />
      <Testimonials />
      <Contact />
      <Footer />

      {/* Floating Elements */}
      <FloatingSidebar />
      <AIAssistant />

      {/* Scroll to Top Button (Optional but good for UX) */}
      <div className="fixed bottom-24 right-6 z-40 hidden md:block">
        <a
          href="#inicio"
          className="bg-primary/20 backdrop-blur-md hover:bg-primary hover:text-white text-primary p-3 rounded-full transition-all border border-primary/20 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
        </a>
      </div>
    </main>
  );
}
