import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppStep } from '../types';

interface TopBarProps {
  onNavigate: (step: AppStep) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (step: AppStep) => {
    onNavigate(step);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-brand-surface border-b border-brand-border h-16 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => handleNav(AppStep.LANDING)}
      >
        <div className="bg-brand-primary text-white w-7 h-7 flex items-center justify-center rounded font-bold text-sm">
          P
        </div>
        <span className="font-bold text-xl text-brand-text tracking-tight">Platform</span>
      </div>

      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 text-brand-text hover:bg-gray-100 rounded-md transition-colors border border-transparent hover:border-brand-border"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-brand-border z-50 py-2">
              <button onClick={() => handleNav(AppStep.HELP)} className="block w-full text-left px-4 py-2.5 text-sm text-brand-text hover:bg-gray-50 transition-colors">Help & Support</button>
              <div className="border-t border-brand-border my-2"></div>
              <button onClick={() => handleNav(AppStep.TERMS)} className="block w-full text-left px-4 py-2.5 text-sm text-brand-text hover:bg-gray-50 transition-colors">Terms & Conditions</button>
              <button onClick={() => handleNav(AppStep.PRIVACY)} className="block w-full text-left px-4 py-2.5 text-sm text-brand-text hover:bg-gray-50 transition-colors">Privacy Policy</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-5 py-2.5 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-primaryHover shadow-sm",
    secondary: "bg-gray-100 text-brand-text hover:bg-gray-200",
    outline: "bg-white border border-brand-border text-brand-text hover:bg-gray-50 shadow-sm",
    text: "text-brand-text hover:bg-gray-100 px-3"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-brand-surface rounded-xl border border-brand-border shadow-sm ${className}`}>
    {children}
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({ label, helperText, className = '', ...props }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-sm font-medium text-brand-text">{label}</label>
    <input 
      className="border border-brand-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-shadow bg-white"
      {...props}
    />
    {helperText && <span className="text-xs text-brand-textMuted">{helperText}</span>}
  </div>
);

interface FileUploadProps {
  label: string;
  helperText?: string;
  accept?: string;
  onChange: (file: File | null) => void;
  icon?: React.ReactNode;
}

export const FileUpload: React.FC<FileUploadProps> = ({ label, helperText, accept, onChange, icon }) => {
  const [fileName, setFileName] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : null);
    onChange(file);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-brand-text">{label}</label>
      <div className="relative">
        <input 
          type="file" 
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="border border-brand-border border-dashed rounded-md px-4 py-5 text-sm bg-gray-50 flex flex-col items-center justify-center gap-2 text-brand-textMuted hover:bg-gray-100 transition-colors">
          {icon}
          <span className="text-center">{fileName ? fileName : 'Click or drag file to upload'}</span>
        </div>
      </div>
      {helperText && <span className="text-xs text-brand-textMuted">{helperText}</span>}
    </div>
  );
};
