import { useState } from 'react';
import { Loader, Sparkles, RotateCcw, Salad, Camera } from 'lucide-react';
import { analyzeFoodMedia } from '../api/foodAnalysis';
import { FoodInfoCard } from '../components/analysis/FoodInfoCard';
import { MediaCapture } from '../components/analysis/MediaCapture';
import type { FoodAnalysis } from '../types/analysis';

const FoodAnalysisPage = () => {
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handleReset = () => {
    setMedia(null);
    setAnalysis(null);
    setError(null);
    setSelectedPreferences([]);
  };

  const handleMediaCaptured = (mediaUrl: string, type: 'image' | 'video') => {
    setMedia(mediaUrl);
    setMediaType(type);
    setAnalysis(null);
    setError(null);
  };

  const handleAnalysis = async () => {
    if (!media) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(media);
      const blob = await response.blob();
      const file = new File([blob], `food-${mediaType}.${mediaType === 'video' ? 'webm' : 'jpg'}`, { 
        type: mediaType === 'video' ? 'video/webm' : 'image/jpeg'
      });
      
      const result = await analyzeFoodMedia(file, mediaType);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[76px] md:pt-[96px]">
      <div className="max-w-md mx-auto p-4">
        <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-4 flex justify-between items-center bg-cherry-red text-white">
            <div>
              <h2 className="font-grandstander text-xl font-bold">Food Analysis</h2>
              <p className="font-figtree text-sm text-white/90">Kelly's Nutritional Insights</p>
            </div>
            {media && (
              <button
                onClick={handleReset}
                className="btn btn-ghost btn-circle"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Media Preview */}
          <div className="w-full aspect-[4/5] bg-gray-100 relative">
            {media ? (
              <>
                {mediaType === 'video' ? (
                  <video 
                    src={media} 
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={media} 
                    alt="Captured Food" 
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Action Buttons after capture */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-4">
                  <button
                    onClick={handleReset}
                    className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 border-none shadow-lg"
                  >
                    Retake
                  </button>
                  <button
                    onClick={handleAnalysis}
                    className="btn bg-cherry-red hover:bg-peach text-white border-none shadow-lg transition-colors duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Salad className="w-5 h-5" />
                        Analyze
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full h-full">
                <MediaCapture 
                  onMediaCaptured={handleMediaCaptured}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4">
              <div className="bg-red-100 border-l-4 border-cherry-red text-red-700 p-4">
                <p className="font-figtree">{error}</p>
                <button 
                  onClick={handleReset}
                  className="mt-2 px-4 py-2 bg-cherry-red text-white rounded hover:bg-peach transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="p-4">
              <FoodInfoCard
                analysis={analysis}
                selectedPreferences={selectedPreferences}
                onTogglePreference={togglePreference}
              />
            </div>
          )}

          {/* Dietary Preferences/Goals Selection */}
          {!analysis && !media && (
            <div className="p-4">
              <h3 className="font-grandstander font-semibold text-gray-700 mb-2">Set Your Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {['Low Carb', 'High Protein', 'Vegetarian', 'Vegan', 'Gluten Free', 'Weight Loss'].map(pref => (
                  <button
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`px-3 py-1 rounded-full text-sm font-figtree transition-colors duration-300 ${
                      selectedPreferences.includes(pref)
                        ? 'bg-cherry-red text-white'
                        : 'bg-light-peach text-gray-700 hover:bg-peach hover:text-white'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodAnalysisPage;