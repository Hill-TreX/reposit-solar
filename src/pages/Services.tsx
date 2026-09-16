import Header from "../components/Header";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function ServicesPage() {
  return (
    <div>
      <Header />
      <main>
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}