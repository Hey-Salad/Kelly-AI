# HeySalad - AI-Powered Food Analysis

![HeySalad Logo](public/HeySalad%20Logo_Tagline%20Black.png)

## 🏆 Azure Hackathon Project

HeySalad is an innovative app that uses Azure AI services to analyze food, provide nutritional insights, and deliver personalized recommendations for healthier eating habits.

## 🌟 Features

- **Instant Food Analysis**: Take a photo of your meal and get nutritional information in seconds
- **Personalized Recommendations**: Receive tailored suggestions based on your dietary goals and preferences
- **Camera Integration**: Easily capture food photos or videos for analysis
- **Dietary Preference Tracking**: Set and track preferences like Low Carb, High Protein, Vegan, etc.
- **Health Scoring**: Get a health score for each meal with detailed explanations
- **Mobile-Friendly Design**: Optimized for use on the go

## 🧠 How it Works

HeySalad leverages Azure's AI and machine learning services to:

1. Identify food items from photos
2. Calculate nutritional content
3. Generate personalized recommendations 
4. Track eating patterns over time

## ⚙️ Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **State Management**: React Hooks
- **Styling**: Custom CSS with HeySalad brand colors and fonts
- **Image Processing**: Azure Computer Vision
- **AI Analysis**: Azure Machine Learning & OpenAI
- **Hosting**: Azure Static Web Apps
- **Authentication**: Azure AD B2C
- **Backend APIs**: Azure Functions
- **Database**: Azure Cosmos DB

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Azure account with necessary services enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/heysalad.git
   cd heysalad
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then fill in your Azure service credentials in `.env.local`

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## 🔧 Azure Setup

### Required Azure Services

1. **Azure Computer Vision**: For food recognition
2. **Azure Functions**: For backend APIs
3. **Azure Cosmos DB**: For user data and preferences
4. **Azure Static Web Apps**: For hosting the frontend
5. **Azure AD B2C**: For user authentication

### Deployment to Azure

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy to Azure Static Web Apps:
   ```bash
   # Follow the Azure Static Web Apps deployment process
   # This can be automated through GitHub Actions
   ```

## 🎨 Brand Information

HeySalad uses the following brand colors:
- Cherry Red: #ed4c4c
- Peach: #faa09a
- Light Peach: #ffd0cd
- White: #ffffff

Fonts:
- Headings: Grandstander
- Body: Figtree

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Alex Johnson - Frontend Developer
- Maya Peterson - AI Specialist
- Carlos Rodriguez - Azure DevOps
- Sarah Kim - UX/UI Designer

## 🙏 Acknowledgements

- Azure for providing the platform and services
- The hackathon organizers
- All the judges and mentors