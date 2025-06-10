import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/Navigation";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import Home from "@/pages/Home";
import SparkTutorChat from "@/pages/SparkTutorChat";
import NotesHub from "@/pages/NotesHub";
import Community from "@/pages/Community";
import CollegeRecommender from "@/pages/CollegeRecommender";
import AIPresentations from "@/pages/AIPresentations";
import SmartCalendar from "@/pages/SmartCalendar";
import CodeSpark from "@/pages/CodeSpark";
import Team from "@/pages/Team";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import LoadingDemo from "@/pages/LoadingDemo";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/chat" component={SparkTutorChat} />
      <Route path="/notes" component={NotesHub} />
      <Route path="/community" component={Community} />
      <Route path="/college" component={CollegeRecommender} />
      <Route path="/presentations" component={AIPresentations} />
      <Route path="/calendar" component={SmartCalendar} />
      <Route path="/code" component={CodeSpark} />
      <Route path="/team" component={Team} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/demo" component={LoadingDemo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingProvider>
          <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
            <AnimatedBackground />
            <Navigation />
            <Router />
            <Toaster />
          </div>
        </LoadingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
