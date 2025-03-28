import React from 'react';
import { Salad, Info, AlertCircle, Check, X } from 'lucide-react';
import type { FoodAnalysis } from '../../types/analysis';

interface FoodInfoCardProps {
  analysis: FoodAnalysis;
  selectedPreferences: string[];
  onTogglePreference: (preference: string) => void;
}

export const FoodInfoCard: React.FC<FoodInfoCardProps> = ({
  analysis,
  selectedPreferences,
  onTogglePreference
}) => {
  // Calculate health score display (1-10 scale)
  const healthScore = Math.min(10, Math.max(1, Math.round(analysis.healthScore)));
  
  // Generate color based on health score
  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'bg-cherry-red';
    if (score >= 6) return 'bg-peach';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Function to check if food aligns with a preference
  const meetsPreference = (preference: string): boolean => {
    switch(preference) {
      case 'Low Carb': 
        return analysis.nutrients.carbs < 15;
      case 'High Protein': 
        return analysis.nutrients.protein > 15;
      case 'Vegetarian': 
        return analysis.dietaryInfo.isVegetarian;
      case 'Vegan': 
        return analysis.dietaryInfo.isVegan;
      case 'Gluten Free': 
        return analysis.dietaryInfo.isGlutenFree;
      case 'Weight Loss':
        return analysis.nutrients.calories < 500;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      {/* Food Identification */}
      <div>
        <h3 className="font-grandstander text-xl font-bold text-gray-800">{analysis.foodName}</h3>
        {analysis.ingredients.length > 0 && (
          <p className="font-figtree text-gray-600 text-sm">
            {analysis.ingredients.join(', ')}
          </p>
        )}
      </div>

      {/* Health Score */}
      <div className="flex items-center">
        <div className="mr-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getHealthScoreColor(healthScore)}`}>
            {healthScore}
          </div>
        </div>
        <div>
          <h4 className="font-grandstander font-semibold text-gray-800">Health Score</h4>
          <p className="font-figtree text-sm text-gray-600">{analysis.healthAssessment}</p>
        </div>
      </div>

      {/* Nutrition Facts */}
      <div className="bg-light-peach rounded-lg p-4">
        <h4 className="font-grandstander font-semibold text-gray-800 mb-2 flex items-center">
          <Info className="w-4 h-4 mr-2 text-cherry-red" />
          Nutrition Facts
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-2 rounded">
            <p className="font-figtree text-xs text-gray-500">Calories</p>
            <p className="font-figtree font-semibold">{analysis.nutrients.calories} kcal</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-figtree text-xs text-gray-500">Carbs</p>
            <p className="font-figtree font-semibold">{analysis.nutrients.carbs}g</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-figtree text-xs text-gray-500">Protein</p>
            <p className="font-figtree font-semibold">{analysis.nutrients.protein}g</p>
          </div>
          <div className="bg-white p-2 rounded">
            <p className="font-figtree text-xs text-gray-500">Fat</p>
            <p className="font-figtree font-semibold">{analysis.nutrients.fat}g</p>
          </div>
          {analysis.nutrients.fiber !== undefined && (
            <div className="bg-white p-2 rounded">
              <p className="font-figtree text-xs text-gray-500">Fiber</p>
              <p className="font-figtree font-semibold">{analysis.nutrients.fiber}g</p>
            </div>
          )}
          {analysis.nutrients.sugar !== undefined && (
            <div className="bg-white p-2 rounded">
              <p className="font-figtree text-xs text-gray-500">Sugar</p>
              <p className="font-figtree font-semibold">{analysis.nutrients.sugar}g</p>
            </div>
          )}
        </div>
      </div>

      {/* Dietary Preferences Check */}
      {selectedPreferences.length > 0 && (
        <div className="bg-light-peach rounded-lg p-4">
          <h4 className="font-grandstander font-semibold text-gray-800 mb-2">Diet Compatibility</h4>
          <div className="space-y-2">
            {selectedPreferences.map(preference => (
              <div key={preference} className="flex items-center font-figtree">
                {meetsPreference(preference) ? (
                  <Check className="w-5 h-5 text-cherry-red mr-2" />
                ) : (
                  <X className="w-5 h-5 text-red-500 mr-2" />
                )}
                <span>{preference}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-light-peach rounded-lg p-4">
        <h4 className="font-grandstander font-semibold text-gray-800 mb-2 flex items-center">
          <Salad className="w-4 h-4 mr-2 text-cherry-red" />
          Kelly's Recommendations
        </h4>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-5 h-5 bg-cherry-red text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                {index + 1}
              </span>
              <span className="font-figtree text-gray-700">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Warnings if any */}
      {analysis.warnings && analysis.warnings.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4">
          <h4 className="font-grandstander font-semibold text-red-800 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-cherry-red" />
            Cautions
          </h4>
          <ul className="space-y-1">
            {analysis.warnings.map((warning, index) => (
              <li key={index} className="font-figtree text-red-700 text-sm">• {warning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};