import os
import pickle
import numpy as np
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(
    title="Kidney Disease Prediction API",
    description="API for predicting chronic kidney disease using machine learning",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Mount static directory for CSS, JS, etc.
if os.path.exists("static"):
    app.mount("/static", StaticFiles(directory="static"), name="static")

# Load the model
MODEL_PATH = os.getenv("MODEL_PATH", "model/kidney_model.pkl")

def load_model():
    try:
        with open(MODEL_PATH, "rb") as f:
            return pickle.load(f)
    except Exception as e:
        print(f"Error loading model: {e}")
        # If model fails to load, return dummy model that always predicts 0.5
        class DummyModel:
            def predict_proba(self, X):
                return np.array([[0.5, 0.5]] * len(X))
        return DummyModel()

model = load_model()

# Define input data model
class KidneyData(BaseModel):
    age: float
    bloodPressure: float
    specificGravity: float
    albumin: float
    sugar: float
    redBloodCells: str  # 'normal' or 'abnormal'
    pus: float
    pusCellClumps: str  # 'present' or 'notpresent'
    bacteria: str  # 'present' or 'notpresent'
    bloodGlucose: float
    bloodUrea: float
    serumCreatinine: float
    sodium: float
    potassium: float
    hemoglobin: float
    packedCellVolume: float
    whiteBloodCellCount: float
    redBloodCellCount: float
    hypertension: str  # 'yes' or 'no'
    diabetesMellitus: str  # 'yes' or 'no'
    coronaryArteryDisease: str  # 'yes' or 'no'
    appetite: str  # 'good' or 'poor'
    pedalEdema: str  # 'yes' or 'no'
    anemia: str  # 'yes' or 'no'

# Setup Jinja2 templates
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Serve the prediction form"""
    try:
        return templates.TemplateResponse("index.html", {"request": request})
    except Exception as e:
        # If templates directory doesn't exist, return simple HTML
        html_content = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Kidney Disease Prediction</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h1>Kidney Disease Prediction API</h1>
                <p>This is a machine learning API for chronic kidney disease prediction.</p>
                <p>To use this API, send a POST request to <code>/predict</code> with the required parameters.</p>
                
                <h3 class="mt-4">API Documentation</h3>
                <p>Visit <a href="/docs">/docs</a> for the Swagger documentation.</p>
            </div>
        </body>
        </html>
        """
        return HTMLResponse(content=html_content)

def preprocess_input(data):
    """Convert categorical variables to numerical values the model can use"""
    processed = {}
    
    # Copy all numerical values
    numerical_fields = [
        "age", "bloodPressure", "specificGravity", "albumin", "sugar", 
        "pus", "bloodGlucose", "bloodUrea", "serumCreatinine", "sodium", 
        "potassium", "hemoglobin", "packedCellVolume", "whiteBloodCellCount", 
        "redBloodCellCount"
    ]
    
    for field in numerical_fields:
        processed[field] = getattr(data, field)
    
    # Convert categorical values
    # Red Blood Cells
    processed["redBloodCells"] = 1 if data.redBloodCells.lower() == "normal" else 0
    
    # Pus Cell Clumps
    processed["pusCellClumps"] = 1 if data.pusCellClumps.lower() == "present" else 0
    
    # Bacteria
    processed["bacteria"] = 1 if data.bacteria.lower() == "present" else 0
    
    # Binary yes/no fields
    binary_fields = [
        "hypertension", "diabetesMellitus", "coronaryArteryDisease", 
        "pedalEdema", "anemia"
    ]
    for field in binary_fields:
        processed[field] = 1 if getattr(data, field).lower() == "yes" else 0
    
    # Appetite
    processed["appetite"] = 1 if data.appetite.lower() == "good" else 0
    
    return list(processed.values())

@app.post("/predict")
async def predict(data: KidneyData):
    """Endpoint to predict kidney disease risk based on input features"""
    try:
        # Preprocess and convert input data to numpy array for prediction
        processed_data = preprocess_input(data)
        input_data = np.array([processed_data])
        
        # Make prediction
        prediction_proba = model.predict_proba(input_data)[0]
        probability = prediction_proba[1]  # Probability of having kidney disease
        prediction = probability >= 0.5
        
        # Generate response message
        if prediction:
            message = "High risk of chronic kidney disease. Please consult with a healthcare professional immediately."
        else:
            message = "Low risk of chronic kidney disease. Maintain a healthy lifestyle and regular check-ups."
        
        # Return prediction results
        return {
            "has_kidney_disease": bool(prediction),
            "probability": float(probability),
            "message": message
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# For testing locally
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=7860, reload=True) 