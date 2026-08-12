import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ServicesContact from "@/components/ServicesContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <BeforeAfterGallery />
        <ServicesContact />
      </main>
      <Footer />
    </>
  );
}
