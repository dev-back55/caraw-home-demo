
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import Dashboard from "./pages/Dashboard";
import Asociados from "./pages/Asociados";
import Cuotas from "./pages/Cuotas";
import Pagos from "./pages/Pagos";
import Reportes from "./pages/Reportes";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { SearchProvider } from "@/context/SearchContext";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import React from "react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Ruta pública - Landing Page */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<LandingPage />} />
          {/* Rutas privadas - Sistema de gestión */}
          <Route path="/dashboard" element={
            <SignedIn>
              <SearchProvider>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-gray-50">
                    <AppSidebar />
                    <div className="flex-1 overflow-hidden">
                      <Header />
                      <main className="p-6 overflow-y-auto">
                        <Dashboard />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </SearchProvider>
            </SignedIn>
          } />
          
          <Route path="/asociados" element={
            <SignedIn>
              <SearchProvider>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-gray-50">
                    <AppSidebar />
                    <div className="flex-1 overflow-hidden">
                      <Header />
                      <main className="p-6 overflow-y-auto">
                        <Asociados />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </SearchProvider>
            </SignedIn>
          } />
          
          <Route path="/cuotas" element={
            <SignedIn>
              <SearchProvider>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-gray-50">
                    <AppSidebar />
                    <div className="flex-1 overflow-hidden">
                      <Header />
                      <main className="p-6 overflow-y-auto">
                        <Cuotas />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </SearchProvider>
            </SignedIn>
          } />
          
          <Route path="/pagos" element={
            <SignedIn>
              <SearchProvider>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-gray-50">
                    <AppSidebar />
                    <div className="flex-1 overflow-hidden">
                      <Header />
                      <main className="p-6 overflow-y-auto">
                        <Pagos />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </SearchProvider>
            </SignedIn>
          } />
          
          <Route path="/reportes" element={
            <SignedIn>
              <SearchProvider>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full bg-gray-50">
                    <AppSidebar />
                    <div className="flex-1 overflow-hidden">
                      <Header />
                      <main className="p-6 overflow-y-auto">
                        <Reportes />
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </SearchProvider>
            </SignedIn>
          } />
          
          {/* Redirección para usuarios no autenticados */}
          <Route path="*" element={
            <SignedOut>
              <NotFound />
            </SignedOut>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
