import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { FaGoogle, FaGithub, FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import GlassmorphismButton from "@/components/ui/glassmorphism-button";

const Signup = () => {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions!");
      return;
    }
    // Redirect to home page (no backend authentication)
    setLocation("/");
  };

  const handleSocialSignup = (provider: string) => {
    // Redirect to home page (no backend authentication)
    setLocation("/");
  };

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glassmorphism rounded-2xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join Coexist AI
            </motion.h1>
            <motion.p 
              className="text-slate-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create your account and start learning
            </motion.p>
          </div>

          {/* Social Signup Buttons */}
          <motion.div 
            className="space-y-3 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialSignup("google")}
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span>Sign up with Google</span>
            </GlassmorphismButton>

            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialSignup("github")}
            >
              <FaGithub className="w-5 h-5 text-white" />
              <span>Sign up with GitHub</span>
            </GlassmorphismButton>

            <GlassmorphismButton
              variant="outline"
              className="w-full py-3 flex items-center justify-center space-x-3"
              onClick={() => handleSocialSignup("apple")}
            >
              <FaApple className="w-5 h-5 text-white" />
              <span>Sign up with Apple</span>
            </GlassmorphismButton>
          </motion.div>

          {/* Divider */}
          <motion.div 
            className="flex items-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Separator className="flex-1 bg-white/20" />
            <span className="px-4 text-sm text-slate-400">or</span>
            <Separator className="flex-1 bg-white/20" />
          </motion.div>

          {/* Signup Form */}
          <motion.form 
            onSubmit={handleSignup}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                  className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1 border-white/20 data-[state=checked]:bg-blue-500"
              />
              <Label htmlFor="terms" className="text-sm text-slate-400 leading-5">
                I agree to the{" "}
                <Link href="/terms">
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    Terms of Service
                  </span>
                </Link>
                {" "}and{" "}
                <Link href="/privacy">
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    Privacy Policy
                  </span>
                </Link>
              </Label>
            </div>

            {/* Signup Button */}
            <GlassmorphismButton
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
            >
              Create Account
            </GlassmorphismButton>
          </motion.form>

          {/* Login Link */}
          <motion.div 
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">
                  Sign in here
                </span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Signup;