# HealthPredict - AI-Powered Disease Prediction

HealthPredict is a cutting-edge web application that leverages machine learning and AI to predict the risk of various diseases including diabetes, heart disease, and kidney disease based on clinical parameters. The application features a brain health chatbot powered by Google's Gemini API.

## Features

- **Disease Prediction**: Get predictions for diabetes, heart disease, and kidney disease using advanced machine learning models
- **AI Chatbot**: Ask questions about brain health and get educational information
- **Dark Mode Support**: Toggle between light and dark themes
- **User Authentication**: Secure user accounts with Clerk authentication
- **Responsive Design**: Works on all device sizes from mobile to desktop

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Machine Learning**: TensorFlow.js
- **Authentication**: Clerk
- **AI Integration**: Google Gemini API
- **Styling**: Tailwind CSS, shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd healthpredict
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following environment variables:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     GEMINI_API_KEY=your_gemini_api_key
     ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Model Conversion

To use real machine learning models instead of mock predictions:

1. Install the Python requirements:
   ```
   pip install -r requirements.txt
   ```

2. Run the model conversion script:
   ```
   python convert_models.py
   ```

3. The converted models will be saved in the `public/models` directory.

## Authentication

This project uses Clerk for authentication. To configure:

1. Create an account at [clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy your API keys to your environment variables

## License

[MIT](LICENSE)
#   P r e d i c t C a r e  
 