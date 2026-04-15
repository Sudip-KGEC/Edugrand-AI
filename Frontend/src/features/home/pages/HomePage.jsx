import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/app/context/useLanguage";
import { useAuth } from "@/app/context/useAuth";
import { lazy, Suspense } from "react";

import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import HowItWorks from "../components/HowItWorks";

import "./home.scss";
import Testimonials from "../components/Testimonials";
import Stats from "../components/Stats";
import Categories from "../components/Categories";
import CTA from "../components/CTA";

const ChatBot = lazy(() => import("@/features/chatbot/components/ChatBot"));

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, loading, openAuth } = useAuth();

  return (
    <div className="home">
      <HeroSection
        t={t}
        navigate={navigate}
        user={user}
        loading={loading}
        openAuth={openAuth}
      />

      <ServicesSection t={t} />

      <HowItWorks />

      <Testimonials />
      <Stats />
      <Categories />
      <CTA />

      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </div>
  );
}