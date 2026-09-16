import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import SolarCalculator from "./components/SolarCalculator";
import TestimonialsSection from "./components/TestimonialsSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FeaturesSection from "./components/FeaturesSection";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BlogIndexPage from "./pages/BlogIndex";
import BlogPostPage from "./pages/BlogPost";
import PrivacyPage from "./pages/Privacy";
import TermsPage from "./pages/Terms";
import LegalBar from "./components/LegalBar";
import SmoothCursor from "./components/smooth-cursor/smooth-cursor";
import FloatingChatWidget from "./components/floating-chat-widget";
import CookieBanner from "./components/cookie-banner";

function Home() {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <Header />
        <Hero />
      </div>
      <FeaturesSection />
      <Services />
      <About />
      <SolarCalculator />
      <TestimonialsSection />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <SmoothCursor size={15} />
      <FloatingChatWidget />
      <CookieBanner />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
      <LegalBar />
    </>
  );
}
