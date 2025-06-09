import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const GlassmorphismButton = ({ 
  children, 
  className, 
  variant = "default", 
  size = "md",
  ...props 
}: GlassmorphismButtonProps) => {
  const baseClasses = "font-semibold transition-all duration-300 border border-white/20 flex items-center justify-center";
  
  const variants = {
    default: "glassmorphism-button text-white",
    outline: "glassmorphism text-white hover:glassmorphism-button"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl"
  };

  const { onAnimationStart, onAnimationEnd, ...buttonProps } = props;
  
  return (
    <motion.button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};

export default GlassmorphismButton;
