import React from 'react';
import { Button, Card } from '../components/UI';
import { CheckCircle2 } from 'lucide-react';

interface SuccessProps {
  onHome: () => void;
}

export const Success: React.FC<SuccessProps> = ({ onHome }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-brand-text mb-4">Thank You!</h1>
        
        <p className="text-brand-text mb-2">
          Your request has been submitted successfully.
        </p>
        <p className="text-sm text-brand-textMuted mb-8">
          Please allow up to 24 hours to receive your personalized creative. Kindly check your email for confirmation.
        </p>
        
        <Button variant="outline" onClick={onHome} className="w-full">
          Back to Home
        </Button>
      </Card>
    </div>
  );
};
