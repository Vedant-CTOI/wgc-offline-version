import React, { useState } from 'react';
import { TopBar } from './components/UI';
import { Landing } from './screens/Landing';
import { Gallery } from './screens/Gallery';
import { DetailsForm } from './screens/DetailsForm';
import { Success } from './screens/Success';
import { HelpSupport, TermsConditions, PrivacyPolicy } from './screens/CMSPages';
import { AppStep, Creative, FormData } from './types';
import { MOCK_CREATIVES } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LANDING);
  const [selectedCreativeIds, setSelectedCreativeIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleStart = () => setCurrentStep(AppStep.GALLERY);
  
  const handleCreativeSelect = (ids: string[]) => {
    setSelectedCreativeIds(ids);
    setCurrentStep(AppStep.FORM);
  };

  const handleFormBack = () => setCurrentStep(AppStep.GALLERY);

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setCurrentStep(AppStep.SUCCESS);
    // In a real app, you would send `data` and `selectedCreativeIds` to a backend here.
    console.log('Submitted:', { creativeIds: selectedCreativeIds, data });
  };

  const handleReset = () => {
    setSelectedCreativeIds([]);
    setFormData(null);
    setCurrentStep(AppStep.LANDING);
  };

  const selectedCreatives = MOCK_CREATIVES.filter(c => selectedCreativeIds.includes(c.id));

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-bg">
      <TopBar onNavigate={setCurrentStep} />
      
      <main className="flex-1 flex flex-col relative">
        {currentStep === AppStep.LANDING && (
          <Landing onNext={handleStart} />
        )}
        
        {currentStep === AppStep.GALLERY && (
          <Gallery onNext={handleCreativeSelect} />
        )}
        
        {currentStep === AppStep.FORM && selectedCreatives.length > 0 && (
          <DetailsForm 
            creatives={selectedCreatives} 
            onBack={handleFormBack} 
            onSubmit={handleFormSubmit} 
          />
        )}
        
        {currentStep === AppStep.SUCCESS && (
          <Success onHome={handleReset} />
        )}

        {/* CMS Pages */}
        {currentStep === AppStep.HELP && <HelpSupport />}
        {currentStep === AppStep.TERMS && <TermsConditions />}
        {currentStep === AppStep.PRIVACY && <PrivacyPolicy />}
      </main>
    </div>
  );
};

export default App;
