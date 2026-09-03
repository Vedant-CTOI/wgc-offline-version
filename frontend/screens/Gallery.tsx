import React, { useState } from 'react';
import { Button, Card } from '../components/UI';
import { THEMES, ASPECT_RATIOS, MOCK_CREATIVES, getAspectRatioClass } from '../constants';
import { Creative } from '../types';
import { Eye, X, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';

interface GalleryProps {
  onNext: (creativeIds: string[]) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onNext }) => {
  const [activeTheme, setActiveTheme] = useState('All');
  const [activeRatio, setActiveRatio] = useState('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewCreative, setPreviewCreative] = useState<Creative | null>(null);
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  const filteredCreatives = MOCK_CREATIVES.filter(c => {
    const matchesTheme = activeTheme === 'All' || c.theme === activeTheme;
    const matchesRatio = activeRatio === 'All' || c.aspectRatio === activeRatio;
    return matchesTheme && matchesRatio;
  });

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else if (selectedIds.length >= 3) {
      setShowLimitPopup(true);
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleContinue = () => {
    if (selectedIds.length > 0) onNext(selectedIds);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text mb-2">Select creatives to personalize</h1>
        <p className="text-brand-textMuted">Choose up to 3 base designs that fit your current promotion.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-brand-textMuted w-16">Theme:</span>
          {THEMES.map(theme => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeTheme === theme 
                  ? 'bg-brand-primary text-white border-brand-primary' 
                  : 'bg-white border-brand-border text-brand-textMuted hover:bg-gray-50'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-brand-textMuted w-16">Ratio:</span>
          {ASPECT_RATIOS.map(ratio => (
            <button
              key={ratio}
              onClick={() => setActiveRatio(ratio)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeRatio === ratio 
                  ? 'bg-brand-primary text-white border-brand-primary' 
                  : 'bg-white border-brand-border text-brand-textMuted hover:bg-gray-50'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {filteredCreatives.map(creative => {
          const isSelected = selectedIds.includes(creative.id);
          return (
            <div key={creative.id} className="break-inside-avoid mb-6">
              <Card 
                className={`relative overflow-hidden cursor-pointer transition-all duration-200 ${
                  isSelected ? 'ring-2 ring-brand-primary border-transparent shadow-md' : 'hover:shadow-md'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-brand-primary text-white rounded-full p-1 z-20 shadow-sm">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
                <div 
                  className={`relative bg-gray-200 w-full ${getAspectRatioClass(creative.aspectRatio)}`}
                  onClick={() => toggleSelection(creative.id)}
                >
                  {/* Inset Circle Placeholder - Bottom Right */}
                  <div className="absolute right-4 bottom-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center shadow-sm z-10">
                    <ImageIcon size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="p-4 border-t border-brand-border bg-white flex flex-col gap-2" onClick={() => toggleSelection(creative.id)}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-brand-text truncate pr-2">{creative.title}</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPreviewCreative(creative); }}
                      className="text-brand-textMuted hover:text-brand-primary transition-colors p-1 -m-1"
                      title="Preview"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-brand-textMuted">{creative.theme}</p>
                    <p className="text-xs font-medium text-brand-textMuted bg-gray-100 px-2 py-0.5 rounded">{creative.aspectRatio}</p>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 flex justify-end px-6 md:px-12">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <span className="text-sm font-medium text-brand-text">
            {selectedIds.length} / 3 creatives selected
          </span>
          <Button onClick={handleContinue} disabled={selectedIds.length === 0}>
            Add Details
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      {previewCreative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-brand-border">
              <h3 className="font-semibold text-brand-text">{previewCreative.title}</h3>
              <button onClick={() => setPreviewCreative(null)} className="text-brand-textMuted hover:text-brand-text">
                <X size={20} />
              </button>
            </div>
            <div className="relative flex-1 overflow-auto bg-gray-100 p-6 flex justify-center items-center">
               <div className={`relative w-full max-w-sm shadow-md bg-gray-200 ${getAspectRatioClass(previewCreative.aspectRatio)}`}>
                  <div className="absolute right-4 bottom-4 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                    <ImageIcon size={24} className="text-gray-400" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Limit Reached Popup */}
      {showLimitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative max-w-sm w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col p-6 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-brand-text mb-2">Selection Limit Reached</h3>
            <p className="text-sm text-brand-textMuted mb-6">
              Limit is to select 3 only. Please deselect a creative if you want to add more.
            </p>
            <Button onClick={() => setShowLimitPopup(false)} className="w-full">
              Got it
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
