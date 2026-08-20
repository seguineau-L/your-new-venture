import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Tarifs from "./pages/Tarifs";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import CGV from "./pages/CGV";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHours from "./pages/AdminHours";
import AdminPricing from "./pages/AdminPricing";
import AdminTexts from "./pages/AdminTexts";
import AdminMedia from "./pages/AdminMedia";
import ServicePage from "./pages/ServicePage";
import ScrollToTop from "@/components/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/reparation-smartphone" element={<ServicePage serviceKey="smartphone" />} />
            <Route path="/reparation-pc" element={<ServicePage serviceKey="pc" />} />
            <Route path="/reparation-console" element={<ServicePage serviceKey="console" />} />
            <Route path="/micro-soudure-carte-electronique" element={<ServicePage serviceKey="microsoudure" />} />

            {/* ADMIN */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/horaires" element={<AdminHours />} />
            <Route path="/admin/tarifs" element={<AdminPricing />} />
            <Route path="/admin/textes" element={<AdminTexts />} />
            <Route path="/admin/media" element={<AdminMedia />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
