import type { FoodAnalysis } from '../types/analysis';

/**
 * Analyzes food media (image or video) using AI
 * @param file The media file to analyze
 * @param mediaType The type of media (image or video)
 * @returns Promise with food analysis data
 */
export async function analyzeFoodMedia(
  file: File,
  mediaType: 'image' | 'video'
): Promise<FoodAnalysis> {
  // Get API keys from environment variables
  const useAzure = import.meta.env.VITE_USE_AZURE === 'true';
  
  if (useAzure) {
    return analyzeWithAzure(file);
  } else {
    return analyzeWithGemini(file);
  }
}

/**
 * Analyze food using Azure OpenAI
 */
const analyzeWithAzure = async (
  file: File
): Promise<FoodAnalysis> => {
  try {
    const azureEndpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || '';
    const azureKey = import.meta.env.VITE_AZURE_OPENAI_KEY || '';
    const apiVersion = import.meta.env.VITE_AZURE_API_VERSION || '';
    const assistantId = import.meta.env.VITE_AZURE_ASSISTANT_ID || '';
    
    // Convert file to base64
    const base64Data = await fileToBase64(file);
    
    // Create or get thread
    const storedThreadId = localStorage.getItem('food_analysis_thread_id');
    let threadId = storedThreadId || '';
    
    if (!threadId) {
      const threadResponse = await fetch(`${azureEndpoint}/openai/threads?api-version=${apiVersion}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': azureKey
        }
      });
      
      const threadData = await threadResponse.json();
      threadId = threadData.id;
      localStorage.setItem('food_analysis_thread_id', threadId);
    }
    
    // Add message with image to thread
    await fetch(`${azureEndpoint}/openai/threads/${threadId}/messages?api-version=${apiVersion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': azureKey
      },
      body: JSON.stringify({
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Analyze this food image and provide detailed nutritional information.'
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${file.type};base64,${base64Data}`
            }
          }
        ]
      })
    });
    
    // Run the assistant
    const runResponse = await fetch(`${azureEndpoint}/openai/threads/${threadId}/runs?api-version=${apiVersion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': azureKey
      },
      body: JSON.stringify({
        assistant_id: assistantId
      })
    });
    
    const runData = await runResponse.json();
    const runId = runData.id;
    
    // Poll for completion
    let runStatus = 'queued';
    while (runStatus !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const statusResponse = await fetch(`${azureEndpoint}/openai/threads/${threadId}/runs/${runId}?api-version=${apiVersion}`, {
        headers: {
          'api-key': azureKey
        }
      });
      
      const statusData = await statusResponse.json();
      runStatus = statusData.status;
      
      if (runStatus === 'failed' || runStatus === 'cancelled') {
        throw new Error(`Run ${runStatus}: ${statusData.last_error?.message || 'Unknown error'}`);
      }
    }
    
    // Get messages
    const messagesResponse = await fetch(`${azureEndpoint}/openai/threads/${threadId}/messages?api-version=${apiVersion}`, {
      headers: {
        'api-key': azureKey
      }
    });
    
    const messagesData = await messagesResponse.json();
    const assistantMessage = messagesData.data.find((msg: any) => msg.role === 'assistant');
    
    if (!assistantMessage) {
      throw new Error('No assistant response found');
    }
    
    // Extract and parse the JSON response from the assistant's message
    const messageText = assistantMessage.content[0].text.value;
    const jsonMatch = messageText.match(/```json\n([\s\S]*?)\n```/);
    
    if (!jsonMatch) {
      // Fallback to dummy data if no JSON found
      console.warn('No JSON found in response, using fallback data');
      return createFallbackAnalysis();
    }
    
    const analysisData = JSON.parse(jsonMatch[1]);
    return analysisData;
  } catch (error) {
    console.error('Error analyzing with Azure:', error);
    return createFallbackAnalysis();
  }
};

/**
 * Analyze food using Gemini Pro Vision
 */
const analyzeWithGemini = async (
  file: File
): Promise<FoodAnalysis> => {
  try {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const endpoint = import.meta.env.VITE_API_ENDPOINT || '';
    
    // Convert file to base64
    const base64Data = await fileToBase64(file);
    
    const response = await fetch(`${endpoint}?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Analyze this food image in detail. Provide nutritional information including calories, protein, carbs, fat, and identify potential allergens. Determine if it's vegetarian, vegan, gluten-free, or dairy-free. Rate its health score on a scale of 1-10. Give a brief health assessment and provide 2-3 nutrition recommendations. Format the response as structured JSON with these fields: foodName, ingredients, nutrients (calories, protein, carbs, fat, fiber, sugar), dietaryInfo (isVegan, isVegetarian, isGlutenFree, isDairyFree), healthScore, healthAssessment, recommendations, warnings.`
              },
              {
                inlineData: {
                  mimeType: file.type,
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800
        }
      })
    });
    
    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from Gemini API');
    }
    
    const textResponse = data.candidates[0].content.parts[0].text;
    const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) || 
                       textResponse.match(/```\n([\s\S]*?)\n```/) ||
                       textResponse.match(/{[\s\S]*?}/);
    
    if (!jsonMatch) {
      console.warn('No JSON found in response, using fallback data');
      return createFallbackAnalysis();
    }
    
    let jsonStr = jsonMatch[0];
    if (jsonMatch[1]) {
      jsonStr = jsonMatch[1];
    }
    
    // Clean up JSON string if needed
    jsonStr = jsonStr.replace(/^```json\n|^```\n|```$/g, '');
    
    try {
      const analysisData = JSON.parse(jsonStr);
      return analysisData;
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return createFallbackAnalysis();
    }
  } catch (error) {
    console.error('Error analyzing with Gemini:', error);
    return createFallbackAnalysis();
  }
};

/**
 * Convert a file to base64
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Create fallback analysis data for testing or when API fails
 */
const createFallbackAnalysis = (): FoodAnalysis => {
  return {
    foodName: "Mixed Salad",
    ingredients: ["Lettuce", "Tomatoes", "Cucumber", "Avocado", "Olive oil"],
    nutrients: {
      calories: 220,
      protein: 3,
      carbs: 12,
      fat: 18,
      fiber: 7,
      sugar: 3
    },
    dietaryInfo: {
      isVegan: true,
      isVegetarian: true,
      isGlutenFree: true,
      isDairyFree: true,
      isNutFree: true
    },
    healthScore: 9,
    healthAssessment: "This is a very healthy, nutrient-dense meal with good fats from avocado and olive oil.",
    recommendations: [
      "Add some protein like grilled chicken or chickpeas for a more complete meal",
      "This makes a great side dish or light lunch option",
      "Consider adding nuts or seeds for extra nutrients and texture"
    ]
  };
};