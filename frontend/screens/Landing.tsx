import React from 'react';
import { Button } from '../components/UI';

interface LandingProps {
  onNext: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onNext }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto mt-10">
      <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-6 tracking-tight leading-tight">
        Lorem ipsum dolor sit amet consectetur.
      </h1>
      <p className="text-lg md:text-xl text-brand-textMuted mb-12 leading-relaxed max-w-2xl">
        Choose a template, add your store details once, and generate professional marketing materials for all your social channels instantly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onNext} className="text-base px-8 py-3 w-full sm:w-auto">
          Select Creative
        </Button>
      </div>
    </div>
  );
};
