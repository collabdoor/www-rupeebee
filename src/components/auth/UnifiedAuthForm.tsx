'use client';

import React, { useRef, useEffect, useState } from "react";
import { Eye, EyeOff, ArrowRight, Building, User, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to merge class names
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// Custom Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
  isLoading?: boolean;
}

const Button = ({ 
  children, 
  variant = "default", 
  className = "", 
  isLoading = false,
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6";
  
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Custom Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = ({ className = "", label, error, icon, required, ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-blue-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border bg-gray-50 border-gray-200 px-3 py-2 text-sm text-gray-800 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-10" : "",
            error ? "border-red-500 focus-visible:ring-red-500" : "",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Animated Bee/Finance visual component (replacing travel map for banking theme)
const FinanceVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const generateDots = (width: number, height: number) => {
    const dots = [];
    const gap = 15;
    const dotRadius = 1.5;

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        // Create a pattern that resembles financial/banking icons
        const isInShape = Math.random() > 0.4;
        
        if (isInShape) {
          dots.push({
            x: x + (Math.random() - 0.5) * 5,
            y: y + (Math.random() - 0.5) * 5,
            radius: dotRadius + Math.random() * 0.5,
            opacity: Math.random() * 0.6 + 0.2,
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * Math.PI * 2,
          });
        }
      }
    }
    return dots;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    });

    resizeObserver.observe(canvas.parentElement as Element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = generateDots(dimensions.width, dimensions.height);
    let animationFrameId: number;
    let startTime = Date.now();

    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      dots.forEach(dot => {
        const opacity = dot.opacity + Math.sin(currentTime * dot.speed + dot.offset) * 0.3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${Math.max(0, Math.min(1, opacity))})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export interface AuthField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel';
  placeholder: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: AuthField[];
  submitText: string;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  footerText?: string;
  footerLink?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  logoText?: string;
  logoIcon?: React.ReactNode;
  backgroundTitle?: string;
  backgroundSubtitle?: string;
}

const UnifiedAuthForm = ({
  title,
  subtitle,
  fields,
  submitText,
  onSubmit,
  isLoading = false,
  error,
  footerText,
  footerLink,
  logoText = "RupeeBee",
  logoIcon,
  backgroundTitle = "Banking Portal",
  backgroundSubtitle = "Secure access to your financial learning platform"
}: AuthFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState<Record<string, boolean>>({});

  const handleChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const errors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });

    // Password confirmation validation
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    await onSubmit(formData);
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setIsPasswordVisible(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  return (
    <div className="min-h-screen w-full flex bg-gray-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full overflow-hidden flex bg-white"
      >
        {/* Left side - Branding */}
        <div className="hidden lg:flex w-1/2 h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex-col items-center justify-center p-12">
          <FinanceVisualization />
          
          {/* Logo and text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mb-8"
            >
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center shadow-lg">
                {logoIcon || <ArrowRight className="text-white h-8 w-8" />}
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"
            >
              {logoText}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-base text-center text-gray-600 max-w-md leading-relaxed"
            >
              {backgroundSubtitle}
            </motion.p>
          </div>
        </div>
        
        {/* Right side - Auth Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white min-h-screen max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center shadow-lg mx-auto mb-4">
                {logoIcon || <ArrowRight className="text-white h-6 w-6" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{logoText}</h2>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900">{title}</h1>
            <p className="text-gray-600 mb-10 text-lg">{subtitle}</p>
            {/* Error Display */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map(field => (
                <div key={field.name} className="space-y-2">
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-900">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'password' ? (
                    <div className="relative">
                      <input
                        id={field.name}
                        type={isPasswordVisible[field.name] ? "text" : "password"}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={cn(
                          "w-full h-12 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base",
                          fieldErrors[field.name] && "border-red-500 focus:ring-red-500"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                        onClick={() => togglePasswordVisibility(field.name)}
                      >
                        {isPasswordVisible[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      {field.icon && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                          {field.icon}
                        </div>
                      )}
                      <input
                        id={field.name}
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={cn(
                          "w-full h-12 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base",
                          field.icon ? "pl-12" : "",
                          fieldErrors[field.name] && "border-red-500 focus:ring-red-500"
                        )}
                      />
                    </div>
                  )}
                  {fieldErrors[field.name] && (
                    <p className="text-sm text-red-600">{fieldErrors[field.name]}</p>
                  )}
                </div>
              ))}
              
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="pt-6"
              >
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-base font-medium"
                >
                  {submitText}
                </Button>
              </motion.div>
              
              {/* Footer */}
              {(footerText || footerLink) && (
                <div className="text-center mt-6 space-y-2">
                  {footerText && (
                    <p className="text-sm text-gray-600">{footerText}</p>
                  )}
                  {footerLink && (
                    <div>
                      {footerLink.onClick ? (
                        <button
                          type="button"
                          onClick={footerLink.onClick}
                          className="text-blue-600 hover:text-blue-700 text-sm transition-colors underline"
                        >
                          {footerLink.text}
                        </button>
                      ) : (
                        <a
                          href={footerLink.href}
                          className="text-blue-600 hover:text-blue-700 text-sm transition-colors underline"
                        >
                          {footerLink.text}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnifiedAuthForm;