# Model Performance Visualizations

## Performance Metrics Class Diagram

```mermaid
classDiagram
    class HeartModelPerformance {
        +Accuracy: 88.5%
        +Sensitivity: 87.3%
        +Specificity: 89.4%
        +Precision: 89.0%
        +F1 Score: 88.1%
        +AUC-ROC: 0.934
        +AUC-PR: 0.911
    }
    
    class DiabetesModelPerformance {
        +Accuracy: 91.2%
        +Sensitivity: 86.8%
        +Specificity: 93.7%
        +Precision: 89.3%
        +F1 Score: 88.0%
        +AUC-ROC: 0.952
        +AUC-PR: 0.923
    }
    
    class KidneyModelPerformance {
        +Accuracy: 87.3%
        +Sensitivity: 90.1%
        +Specificity: 85.6%
        +Precision: 86.4%
        +F1 Score: 88.2%
        +AUC-ROC: 0.938
        +AUC-PR: 0.905
    }
    
    HeartModelPerformance --|> ModelPerformance
    DiabetesModelPerformance --|> ModelPerformance
    KidneyModelPerformance --|> ModelPerformance
    
    class ModelPerformance {
        <<interface>>
        +Accuracy
        +Sensitivity
        +Specificity
        +Precision
        +F1 Score
        +AUC-ROC
        +AUC-PR
    }
```

## Accuracy Comparison Graph

```mermaid
graph TD
    subgraph "Model Accuracy Comparison"
        A[Heart Disease: 88.5%] --> D[Overall System]
        B[Diabetes: 91.2%] --> D
        C[Kidney Disease: 87.3%] --> D
    end
    
    subgraph "External Validation Results"
        E[Heart: 86.2%] --> H[Cross-validation]
        F[Diabetes: 89.3%] --> H
        G[Kidney: 84.2%] --> H
    end
    
    D --> I[Clinical Validation]
    H --> I
    
    style A fill:#f9d5e5,stroke:#333,stroke-width:1px
    style B fill:#eeac99,stroke:#333,stroke-width:1px
    style C fill:#e06377,stroke:#333,stroke-width:1px
    style D fill:#5b9aa0,stroke:#333,stroke-width:1px
    style E fill:#d6eadf,stroke:#333,stroke-width:1px
    style F fill:#c6dabf,stroke:#333,stroke-width:1px
    style G fill:#b9ac92,stroke:#333,stroke-width:1px
```

## Feature Importance Charts

```mermaid
pie title "Heart Disease Feature Importance"
    "ST depression" : 21.4
    "Number of major vessels" : 18.7
    "Chest pain type" : 16.5
    "Maximum heart rate" : 12.3
    "Age" : 10.8
    "Other factors" : 20.3
```

```mermaid
pie title "Diabetes Feature Importance"
    "Plasma glucose" : 38.2
    "Body mass index" : 21.5
    "Diabetes pedigree function" : 12.4
    "Age" : 11.8
    "Serum insulin" : 7.3
    "Other factors" : 8.8
```

```mermaid
pie title "Kidney Disease Feature Importance"
    "Serum creatinine" : 24.7
    "Blood urea" : 19.3
    "Hemoglobin" : 15.8
    "Specific gravity" : 9.4
    "Albumin" : 8.6
    "Other factors" : 22.2
```

## ROC Curve Comparison

```mermaid
xychart-beta
    title "ROC Curves Comparison"
    x-axis [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    y-axis "True Positive Rate" [0, 0.2, 0.4, 0.6, 0.8, 1.0]
    line [0, 0.63, 0.74, 0.82, 0.88, 0.92, 0.96, 0.98, 0.99, 1.0, 1.0] "Heart (AUC=0.934)"
    line [0, 0.68, 0.79, 0.85, 0.91, 0.94, 0.96, 0.98, 0.99, 1.0, 1.0] "Diabetes (AUC=0.952)"
    line [0, 0.67, 0.78, 0.85, 0.89, 0.93, 0.95, 0.97, 0.99, 1.0, 1.0] "Kidney (AUC=0.938)"
    line [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] "Random"
```

## Development Timeline

```mermaid
gantt
    title Model Development and Validation Timeline
    dateFormat  YYYY-MM-DD
    section Heart Disease
    Data Collection       :done, h1, 2022-01-10, 30d
    Preprocessing         :done, h2, after h1, 15d
    Model Training        :done, h3, after h2, 20d
    Optimization          :done, h4, after h3, 15d
    Validation            :done, h5, after h4, 25d
    
    section Diabetes
    Data Collection       :done, d1, 2022-01-15, 30d
    Preprocessing         :done, d2, after d1, 15d
    Model Training        :done, d3, after d2, 20d
    Optimization          :done, d4, after d3, 15d
    Validation            :done, d5, after d4, 25d
    
    section Kidney Disease
    Data Collection       :done, k1, 2022-01-20, 30d
    Preprocessing         :done, k2, after k1, 15d
    Model Training        :done, k3, after k2, 20d
    Optimization          :done, k4, after k3, 15d
    Validation            :done, k5, after k4, 25d
    
    section Integration
    System Design         :done, s1, 2022-02-15, 25d
    UI Development        :done, s2, after s1, 35d
    Integration Testing   :done, s3, after s2, 20d
    Clinical Validation   :done, s4, after s3, 40d
    Deployment            :done, s5, after s4, 15d
```

## Prediction Process Workflow

```mermaid
flowchart TD
    A[User Input] --> B{Input Validation}
    B -->|Valid| C[Preprocessing]
    B -->|Invalid| D[Error Feedback]
    D --> A
    
    C --> E{Offline Mode?}
    E -->|Yes| F[Use Cached Models]
    E -->|No| G[Load Latest Models]
    
    F --> H[Generate Prediction]
    G --> H
    
    H --> I[Calculate Confidence]
    I --> J[Feature Importance]
    J --> K[Result Visualization]
    
    K --> L{Save History?}
    L -->|Yes| M[Encrypt & Store]
    L -->|No| N[Display Only]
    
    style A fill:#f9f9f9,stroke:#333,stroke-width:1px
    style H fill:#e8f4f9,stroke:#333,stroke-width:1px
    style K fill:#e8f4f9,stroke:#333,stroke-width:1px
```

## System Architecture Diagram

```mermaid
flowchart TD
    %% Define the layers as subgraphs
    subgraph UILayer["User Interface Layer"]
        HeartUI["Heart Disease\nModule UI"]
        DiabetesUI["Diabetes\nModule UI"]
        KidneyUI["Kidney\nModule UI"]
    end

    subgraph AppLayer["Application Logic Layer"]
        HeartController["Heart Disease\nController"]
        DiabetesController["Diabetes\nController"]
        KidneyController["Kidney\nController"]
        SharedServices["Shared Application Services"]
    end

    subgraph PredictionLayer["Prediction Engine Layer"]
        HeartEngine["Heart Model\nEngine"]
        DiabetesEngine["Diabetes\nModel"]
        KidneyEngine["Kidney\nModel"]
        CoreMLServices["Core ML Services\n(Preprocessing, Explanation, Ensemble)"]
    end

    subgraph DataLayer["Data Layer"]
        HeartData["Heart Disease\nData Services"]
        DiabetesData["Diabetes\nData"]
        KidneyData["Kidney\nData"]
        SharedDataServices["Shared Data Services\n(Local Storage, Model Storage, Config)"]
    end

    %% Connect the layers
    UILayer --> AppLayer
    AppLayer --> PredictionLayer
    PredictionLayer --> DataLayer

    %% Style the diagram
    classDef layerStyle fill:#f9f9f9,stroke:#333,stroke-width:1px
    class UILayer,AppLayer,PredictionLayer,DataLayer layerStyle
``` 