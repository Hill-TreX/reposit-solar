import Header from "../components/Header";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main>
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}