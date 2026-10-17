import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Tarifs from "./pages/Tarifs";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import CGV from "./pages/CGV";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";
import ServicePage from "./pages/ServicePage";
import Diagnostic from "./pages/Diagnostic";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import { HelmetProvider } from "react-helmet-async";

// Chargement différé (Code-splitting) pour l'espace administration
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminHours = lazy(() => import("./pages/AdminHours"));
const AdminPricing = lazy(() => import("./pages/AdminPricing"));
const AdminTexts = lazy(() => import("./pages/AdminTexts"));
const AdminMedia = lazy(() => import("./pages/AdminMedia"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
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
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/diagnostic" element={<Diagnostic />} />
            <Route path="/reparation-smartphone" element={<ServicePage serviceKey="smartphone" />} />
            <Route path="/reparation-pc" element={<ServicePage serviceKey="pc" />} />
            <Route path="/reparation-console" element={<ServicePage serviceKey="console" />} />
            <Route path="/micro-soudure-carte-electronique" element={<ServicePage serviceKey="microsoudure" />} />

            {/* ADMIN (Chargement à la demande) */}
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={null}>
                  <AdminLogin />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                <Suspense fallback={null}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="/admin/horaires"
              element={
                <Suspense fallback={null}>
                  <AdminHours />
                </Suspense>
              }
            />
            <Route
              path="/admin/tarifs"
              element={
                <Suspense fallback={null}>
                  <AdminPricing />
                </Suspense>
              }
            />
            <Route
              path="/admin/textes"
              element={
                <Suspense fallback={null}>
                  <AdminTexts />
                </Suspense>
              }
            />
            <Route
              path="/admin/media"
              element={
                <Suspense fallback={null}>
                  <AdminMedia />
                </Suspense>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieBanner />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
