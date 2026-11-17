import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Capabilities from "@/components/Capabilities";
import Approach from "@/components/Approach";
import Toolkit from "@/components/Toolkit";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import QuoteMarquee from "@/components/QuoteMarquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Approach />
        <Toolkit />
        <Work />
        <Contact />
        <QuoteMarquee />
      </main>
      <Footer />
    </>
  );
}
