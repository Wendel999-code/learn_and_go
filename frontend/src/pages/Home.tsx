import Courses from "@/pages/landing/Courses";
import Features from "@/pages/landing/Features";
import Footer from "@/pages/landing/Footer";
import Hero from "@/pages/landing/Hero";

function Home() {
  return (
    <div className="min-h-screen bg-theme">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      <Courses />

      <Footer />
    </div>
  );
}

export default Home;


