// Define the food analysis types

export interface FoodAnalysis {
    foodName: string;
    ingredients: string[];
    nutrients: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber?: number;
      sugar?: number;
      sodium?: number;
    };
    dietaryInfo: {
      isVegan: boolean;
      isVegetarian: boolean;
      isGlutenFree: boolean;
      isDairyFree: boolean;
      isNutFree?: boolean;
    };
    healthScore: number; // 1-10 scale
    healthAssessment: string;
    recommendations: string[];
    warnings?: string[];
  }
  
  // Additional types can be added as needed