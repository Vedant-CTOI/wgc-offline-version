import React, { useState } from 'react';
import { Button, Card, Input, FileUpload } from '../components/UI';
import { Creative, FormData } from '../types';
import { getAspectRatioClass } from '../constants';
import { Upload, Image as ImageIcon, ArrowLeft, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DetailsFormProps {
  creatives: Creative[];
  onBack: () => void;
  onSubmit: (data: FormData) => void;
}

export const DetailsForm: React.FC<DetailsFormProps> = ({ creatives, onBack, onSubmit }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const initialSpecific: Record<string, { address: string; phone: string; jewelryFile: File | null }> = {};
    creatives.forEach(c => {
      initialSpecific[c.id] = { address: '', phone: '', jewelryFile: null };
    });
    
    return {
      storeName: '',
      email: '',
      logoFile: null,
      applyToAll: true,
      globalAddress: '',
      globalPhone: '',
      globalJewelryFile: null,
      specificDetails: initialSpecific,
    };
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCreative = creatives[currentIndex];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecificChange = (creativeId: string, field: 'phone' | 'address' | 'jewelryFile', value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      specificDetails: {
        ...prev.specificDetails,
        [creativeId]: {
          ...prev.specificDetails[creativeId],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
    }, 1500);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? creatives.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === creatives.length - 1 ? 0 : prev + 1));
  };

  const isFormValid = formData.storeName && formData.email && (
    formData.applyToAll || creatives.length === 1
      ? formData.globalJewelryFile !== null
      : creatives.every(c => formData.specificDetails[c.id]?.jewelryFile !== null)
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-brand-textMuted hover:text-brand-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Gallery
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text mb-2">Add your details</h1>
        <p className="text-brand-textMuted">Provide the information to personalize your selected creatives.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left: Preview Context (Carousel) */}
        <div className="w-full md:w-1/3 shrink-0 sticky top-24">
          <Card className="p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">Selected Designs</p>
              <span className="text-xs font-medium text-brand-textMuted bg-gray-200 px-2 py-0.5 rounded-full">
                {currentIndex + 1} of {creatives.length}
              </span>
            </div>
            
            <div className="relative">
              <div className={`relative rounded-md overflow-hidden shadow-sm border border-brand-border bg-gray-200 w-full transition-all duration-300 ${getAspectRatioClass(currentCreative.aspectRatio)}`}>
                <div className="absolute right-4 bottom-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                   <ImageIcon size={16} className="text-gray-400" />
                </div>
              </div>

              {creatives.length > 1 && (
                <>
                  <button 
                    type="button"
                    onClick={handlePrev} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-brand-text p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    type="button"
                    onClick={handleNext} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-brand-text p-1.5 rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {creatives.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-4">
                {creatives.map((_, idx) => (
                  <button 
                    key={idx} 
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-brand-primary' : 'bg-gray-300 hover:bg-gray-400'}`} 
                  />
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-md border border-brand-border shadow-sm">
              <div className="truncate pr-2">
                <p className="text-sm font-semibold text-brand-text truncate">{currentCreative.title}</p>
                <p className="text-xs text-brand-textMuted mt-1">Ratio: {currentCreative.aspectRatio}</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowPreview(true)}
                className="text-brand-textMuted hover:text-brand-primary transition-colors p-2 shrink-0"
                title="Preview"
              >
                <Eye size={20} />
              </button>
            </div>
          </Card>
        </div>

        {/* Right: Form */}
        <Card className="w-full md:w-2/3 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Store Name *" 
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                placeholder="e.g. Royal Jewellers"
                required
              />
              <FileUpload 
                label="Store Logo" 
                accept="image/*"
                icon={<Upload size={16} />}
                onChange={(file) => setFormData(prev => ({ ...prev, logoFile: file }))}
              />
            </div>

            {/* Contact, Address & Jewelry Section */}
            <div className="border-t border-brand-border pt-6 mt-2">
              {creatives.length > 1 && (
                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    id="applyToAll"
                    checked={formData.applyToAll}
                    onChange={(e) => setFormData(prev => ({ ...prev, applyToAll: e.target.checked }))}
                    className="w-4 h-4 rounded border-brand-border text-brand-primary focus:ring-brand-primary cursor-pointer"
                  />
                  <label htmlFor="applyToAll" className="text-sm font-medium text-brand-text cursor-pointer">
                    Use same contact number, address, and jewelry piece for all selected creatives
                  </label>
                </div>
              )}

              {formData.applyToAll || creatives.length === 1 ? (
                <div className="space-y-6">
                  <Input 
                    label="Contact Number" 
                    name="globalPhone"
                    type="tel"
                    value={formData.globalPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-brand-text">Store Address</label>
                    <textarea 
                      name="globalAddress"
                      value={formData.globalAddress}
                      onChange={handleChange}
                      rows={2}
                      className="border border-brand-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-shadow bg-white resize-none"
                      placeholder="Enter full address"
                    />
                  </div>
                  <FileUpload 
                    label="Jewelry Piece for Insert *" 
                    accept="image/*"
                    icon={<ImageIcon size={16} />}
                    onChange={(file) => setFormData(prev => ({ ...prev, globalJewelryFile: file }))}
                    helperText="Best Practices: Use a high-resolution image with a clean, solid background (preferably white or transparent) for best results."
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  {creatives.map((creative, index) => (
                    <div key={creative.id} className="p-5 bg-gray-50 rounded-md border border-brand-border space-y-5">
                      <h4 className="text-sm font-semibold text-brand-text border-b border-brand-border pb-2">
                        {index + 1}. {creative.title}
                      </h4>
                      <Input 
                        label="Contact Number" 
                        value={formData.specificDetails[creative.id]?.phone || ''}
                        onChange={(e) => handleSpecificChange(creative.id, 'phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                      />
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-brand-text">Store Address</label>
                        <textarea 
                          value={formData.specificDetails[creative.id]?.address || ''}
                          onChange={(e) => handleSpecificChange(creative.id, 'address', e.target.value)}
                          rows={2}
                          className="border border-brand-border rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-shadow bg-white resize-none"
                          placeholder="Enter full address"
                        />
                      </div>
                      <FileUpload 
                        label="Jewelry Piece for Insert *" 
                        accept="image/*"
                        icon={<ImageIcon size={16} />}
                        onChange={(file) => handleSpecificChange(creative.id, 'jewelryFile', file)}
                        helperText="Best Practices: Use a high-resolution image with a clean, solid background (preferably white or transparent) for best results."
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-brand-border pt-6 mt-2">
              <Input 
                label="Email ID *" 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="store@example.com"
                required
                helperText="Your personalized creatives will be shared via this email."
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={!isFormValid || isSubmitting} className="w-full md:w-auto px-8">
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-brand-border">
              <h3 className="font-semibold text-brand-text">{currentCreative.title}</h3>
              <button onClick={() => setShowPreview(false)} className="text-brand-textMuted hover:text-brand-text">
                <X size={20} />
              </button>
            </div>
            <div className="relative flex-1 overflow-auto bg-gray-100 p-6 flex justify-center items-center">
               <div className={`relative w-full max-w-sm shadow-md bg-gray-200 ${getAspectRatioClass(currentCreative.aspectRatio)}`}>
                  <div className="absolute right-4 bottom-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                    <ImageIcon size={24} className="text-gray-400" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
