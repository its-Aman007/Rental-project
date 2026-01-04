import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ResidentLogin from "./pages/ResidentLogin.tsx";
import ResidentBrowse from "./pages/ResidentBrowse.tsx";
import ResidentBookings from "./pages/ResidentBookings.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import AdminBookings from "./pages/AdminBookings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Resident Portal Routes */}
          <Route path="/resident/login" element={<ResidentLogin />} />
          <Route path="/resident/browse" element={<ResidentBrowse />} />
          <Route path="/resident/bookings" element={<ResidentBookings />} />
          {/* Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

declare global {
  interface Window {
    __appRoot?: ReturnType<typeof createRoot>;
    __appInitialized?: boolean;
  }
}

function initializeApp() {
  // Prevent multiple initializations
  if (window.__appInitialized) {
    // Root already exists, just update it
    if (window.__appRoot) {
      window.__appRoot.render(<App />);
    }
    return;
  }

  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found");
    return;
  }

  // Mark as initialized before creating root to prevent re-entrance
  window.__appInitialized = true;

  // Create and store the root
  window.__appRoot = createRoot(rootElement);
  window.__appRoot.render(<App />);
}

// Prevent DOMContentLoaded from firing if already done
let initialized = false;

function handleInit() {
  if (initialized) return;
  initialized = true;
  initializeApp();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", handleInit, { once: true });
} else {
  handleInit();
}

// Handle HMR
if (import.meta.hot) {
  import.meta.hot.accept(["./pages/Index.tsx", "./pages/ResidentLogin.tsx", "./pages/ResidentBrowse.tsx", "./pages/ResidentBookings.tsx", "./pages/AdminLogin.tsx", "./pages/AdminDashboard.tsx", "./pages/AdminBookings.tsx", "./pages/NotFound.tsx"], () => {
    if (window.__appRoot) {
      window.__appRoot.render(<App />);
    }
  });
}
