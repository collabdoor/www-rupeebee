'use client';

import React, { useRef, useEffect, useState } from "react";
import { Eye, EyeOff, Building2, Shield, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Helper function to merge class names
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

// Component and interfaces start here

// RupeeBee-themed animated background component
const RupeeBeeVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const generateFinancialDots = (width: number, height: number) => {
    const dots = [];
    const gap = 25;
    const dotRadius = 1.5;

    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        // Create subtle honeycomb-like pattern
        const isHexPattern = (Math.floor(x / gap) + Math.floor(y / gap)) % 2 === 0;
        
        if (Math.random() > 0.5) {
          dots.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            radius: dotRadius + Math.random() * 0.5,
            opacity: Math.random() * 0.2 + 0.1,
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * Math.PI * 2,
            color: isHexPattern ? '#15803d' : '#f59e0b', // Green and yellow for RupeeBee
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

    const dots = generateFinancialDots(dimensions.width, dimensions.height);
    let animationFrameId: number;
    const startTime = Date.now();

    function animate() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      const currentTime = (Date.now() - startTime) / 1000;
      
      dots.forEach(dot => {
        const opacity = dot.opacity + Math.sin(currentTime * dot.speed + dot.offset) * 0.1;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}${Math.floor(Math.max(0, Math.min(1, opacity)) * 255).toString(16).padStart(2, '0')}`;
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
      {/* Subtle decorative bee props images */}
      <div className="absolute top-1/4 left-1/4 opacity-5">
        <Image
          src="/bee-props/security.png"
          alt="Security"
          width={120}
          height={120}
          className="animate-pulse"
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 opacity-5">
        <Image
          src="/bee-props/calculator-tools.png"
          alt="Calculator"
          width={100}
          height={100}
          className="animate-pulse"
        />
      </div>
      <div className="absolute top-1/2 right-1/3 opacity-5">
        <Image
          src="/bee-props/grow-and-save.png"
          alt="Growth"
          width={110}
          height={110}
          className="animate-pulse"
        />
      </div>
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
  backgroundSubtitle = "Secure access to your financial learning platform and module management"
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
    <div className="min-h-screen w-full relative bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Full screen animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <RupeeBeeVisualization />
      </div>
      
      {/* Centered form container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-white/85 backdrop-blur-sm border-0">
          <CardContent className="p-8">
            {/* Logo section */}
            <div className="text-center mb-8">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <Image
                  src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/logo-variants/green-dark-logo.webp"
                  alt="RupeeBee"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                  unoptimized
                />
                <Image
                  src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/psbpsb.png"
                  alt="Punjab & Sind Bank"
                  width={36}
                  height={36}
                  className="object-contain rounded-full"
                  priority
                  unoptimized
                />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent mb-2"
              >
                {logoText}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-sm text-gray-600"
              >
                {backgroundSubtitle}
              </motion.p>
            </div>

            {/* Form header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600 text-sm">{subtitle}</p>
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field, index) => (
                <motion.div 
                  key={field.name} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (0.1 * index), duration: 0.3 }}
                  className="space-y-1"
                >
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'password' ? (
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={isPasswordVisible[field.name] ? "text" : "password"}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={cn(
                          "h-11 text-sm pr-10 border-gray-200 focus:border-green-400 focus:ring-green-400",
                          fieldErrors[field.name] && "border-red-300 focus:border-red-400 focus:ring-red-400"
                        )}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        onClick={() => togglePasswordVisibility(field.name)}
                      >
                        {isPasswordVisible[field.name] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      {field.icon && (
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 z-10">
                          {field.icon}
                        </div>
                      )}
                      <Input
                        id={field.name}
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        className={cn(
                          "h-11 text-sm border-gray-200 focus:border-green-400 focus:ring-green-400",
                          field.icon ? "pl-10" : "",
                          fieldErrors[field.name] && "border-red-300 focus:border-red-400 focus:ring-red-400"
                        )}
                      />
                    </div>
                  )}
                  {fieldErrors[field.name] && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-600"
                    >
                      {fieldErrors[field.name]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  )}
                  {submitText}
                </Button>
              </motion.div>
              
              {/* Footer */}
              {(footerText || footerLink) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  className="text-center mt-6 space-y-2"
                >
                  {footerText && (
                    <p className="text-xs text-gray-500">{footerText}</p>
                  )}
                  {footerLink && (
                    <div>
                      {footerLink.onClick ? (
                        <button
                          type="button"
                          onClick={footerLink.onClick}
                          className="text-green-600 hover:text-green-700 text-sm transition-colors font-medium"
                        >
                          {footerLink.text}
                        </button>
                      ) : (
                        <a
                          href={footerLink.href}
                          className="text-green-600 hover:text-green-700 text-sm transition-colors font-medium"
                        >
                          {footerLink.text}
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UnifiedAuthForm;