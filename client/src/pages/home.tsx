import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Demo from "@/components/home/Demo";
import Pricing from "@/components/home/Pricing";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Vetro AI - Your AI Workforce Platform</title>
        <meta name="description" content="The first-ever AI employee operating system where smart agents think, collaborate, and take action to help grow your business." />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Demo />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
