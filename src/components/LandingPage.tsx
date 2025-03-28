import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Salad, Camera, Trophy } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/assets/food-background.jpg" 
            alt="Healthy food" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 py-20 h-full flex flex-col justify-center">
            <div className="max-w-xl space-y-8">
              {/* Main Title */}
              <div>
                <h1 className="font-grandstander text-4xl md:text-6xl font-bold text-white mb-4">
                  Meet Kelly.
                  <span className="block text-cherry-red">Your Food AI.</span>
                </h1>
                <p className="font-figtree text-xl text-gray-300">
                  Your personal nutrition assistant just a snap away.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Camera className="w-5 h-5 text-cherry-red" />
                  </div>
                  <div>
                    <h3 className="font-grandstander text-lg font-semibold text-white">Instant Food Analysis</h3>
                    <p className="font-figtree text-gray-400">Snap a photo of your meal and get nutritional insights in seconds</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Salad className="w-5 h-5 text-cherry-red" />
                  </div>
                  <div>
                    <h3 className="font-grandstander text-lg font-semibold text-white">Personalized Nutrition</h3>
                    <p className="font-figtree text-gray-400">Receive tailored recommendations for your dietary goals</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <Trophy className="w-5 h-5 text-cherry-red" />
                  </div>
                  <div>
                    <h3 className="font-grandstander text-lg font-semibold text-white">Track Your Progress</h3>
                    <p className="font-figtree text-gray-400">Monitor your eating habits and nutritional intake over time</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  onClick={() => navigate('/analysis')}
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-cherry-red rounded-full overflow-hidden transition-all duration-300 hover:bg-peach focus:outline-none focus:ring-2 focus:ring-cherry-red focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  <Camera className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Analyze Your Food
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-grandstander text-3xl font-bold text-gray-900 text-center mb-12">
            Your Path to Healthier Eating
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-light-peach rounded-xl p-6 space-y-4 shadow-md">
              <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="font-grandstander text-xl font-semibold text-gray-900">Capture</h3>
              <p className="font-figtree text-gray-600">
                Take a photo or quick video of your meal using our simple interface
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-light-peach rounded-xl p-6 space-y-4 shadow-md">
              <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="font-grandstander text-xl font-semibold text-gray-900">Analyze</h3>
              <p className="font-figtree text-gray-600">
                Get instant insights about your food's nutritional content and health impact
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-light-peach rounded-xl p-6 space-y-4 shadow-md">
              <div className="w-12 h-12 bg-cherry-red rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="font-grandstander text-xl font-semibold text-gray-900">Eat Smarter</h3>
              <p className="font-figtree text-gray-600">
                Follow your personalized recommendations for healthier eating habits
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button 
              onClick={() => navigate('/analysis')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-cherry-red border-2 border-cherry-red rounded-full hover:bg-cherry-red hover:text-white transition-colors duration-300"
            >
              <Salad className="w-5 h-5" />
              Start Now
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-grandstander text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose HeySalad AI Kelly?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-cherry-red">
              <h3 className="font-grandstander text-xl font-semibold text-gray-900 mb-4">Accurate Nutrition Facts</h3>
              <p className="font-figtree text-gray-600">
                Our advanced AI can identify ingredients and provide detailed nutritional information with high accuracy, 
                helping you make informed decisions about your diet.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-peach">
              <h3 className="font-grandstander text-xl font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
              <p className="font-figtree text-gray-600">
                Kelly learns your preferences and dietary restrictions to provide tailored suggestions 
                that align with your health goals.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-peach">
              <h3 className="font-grandstander text-xl font-semibold text-gray-900 mb-4">Meal Planning Assistant</h3>
              <p className="font-figtree text-gray-600">
                Get help planning balanced meals and creating shopping lists based on your nutritional needs 
                and favorite foods.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-t-4 border-cherry-red">
              <h3 className="font-grandstander text-xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="font-figtree text-gray-600">
                Monitor your eating habits over time and see how your food choices impact your overall health 
                and wellness journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;