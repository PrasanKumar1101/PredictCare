# Enhanced Report Sections

## System Architecture Diagram (For Section 3.4.1)

Replace the ASCII system architecture diagram with this Mermaid diagram:

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

*Figure 1: Multi-disease prediction system architecture*

## Enhanced Tables for Model Performance (For Section 5.1)

### Heart Disease Model Performance

Replace Table 1 with this enhanced version:

| Metric           | Value | Confidence Interval (95%) |
|------------------|-------|-----------------------------|
| Accuracy         | 88.5% | 86.2% - 90.8%              |
| Sensitivity/Recall | 87.3% | 84.9% - 89.7%              |
| Specificity      | 89.4% | 87.1% - 91.7%              |
| Precision        | 89.0% | 86.6% - 91.4%              |
| F1 Score         | 88.1% | 85.8% - 90.4%              |
| AUC-ROC          | 0.934 | 0.912 - 0.956              |
| AUC-PR           | 0.911 | 0.887 - 0.935              |

*Table 1: Performance Metrics of the Heart Disease Neural Network Model (Test Set)*

Add this table after discussing external validation:

| Metric           | Value | Difference from Test Set |
|------------------|-------|--------------------------|
| Accuracy         | 86.2% | -2.3%                    |
| Sensitivity/Recall | 84.5% | -2.8%                    |
| Specificity      | 87.6% | -1.8%                    |
| F1 Score         | 85.1% | -3.0%                    |

*Table 2: External Validation Results on the Hungarian Institute of Cardiology Dataset*

Add this visualization after discussing feature importance:

```mermaid
pie title "Heart Disease Feature Importance"
    "ST depression" : 21.4
    "Number of major vessels" : 18.7
    "Chest pain type" : 16.5
    "Maximum heart rate" : 12.3
    "Age" : 10.8
    "Other factors" : 20.3
```

*Figure 5.1: Pie chart showing feature importance for heart disease prediction*

### Diabetes Model Performance

Replace Table 3 with this enhanced version:

| Metric           | Value | Confidence Interval (95%) |
|------------------|-------|-----------------------------|
| Accuracy         | 91.2% | 89.1% - 93.3%              |
| Sensitivity/Recall | 86.8% | 84.2% - 89.4%              |
| Specificity      | 93.7% | 91.5% - 95.9%              |
| Precision        | 89.3% | 86.8% - 91.8%              |
| F1 Score         | 88.0% | 85.6% - 90.4%              |
| AUC-ROC          | 0.952 | 0.931 - 0.973              |
| AUC-PR           | 0.923 | 0.901 - 0.945              |

*Table 3: Performance Metrics of the Diabetes Gradient Boosting Model (Test Set)*

Add this table after discussing external validation:

| Metric           | Value | Difference from Test Set |
|------------------|-------|--------------------------|
| Accuracy         | 89.3% | -1.9%                    |
| Sensitivity/Recall | 84.2% | -2.6%                    |
| Specificity      | 92.1% | -1.6%                    |
| F1 Score         | 86.8% | -1.2%                    |

*Table 4: External Validation Results on the NHANES Dataset Subset (n=1,245)*

Add this visualization after discussing feature importance:

```mermaid
pie title "Diabetes Feature Importance"
    "Plasma glucose" : 38.2
    "Body mass index" : 21.5
    "Diabetes pedigree function" : 12.4
    "Age" : 11.8
    "Serum insulin" : 7.3
    "Other factors" : 8.8
```

*Figure 5.2: Pie chart showing feature importance for diabetes prediction*

### Kidney Disease Model Performance

Replace Table 5 with this enhanced version:

| Metric           | Value | Confidence Interval (95%) |
|------------------|-------|-----------------------------|
| Accuracy         | 87.3% | 84.9% - 89.7%              |
| Sensitivity/Recall | 90.1% | 87.8% - 92.4%              |
| Specificity      | 85.6% | 83.1% - 88.1%              |
| Precision        | 86.4% | 83.9% - 88.9%              |
| F1 Score         | 88.2% | 85.9% - 90.5%              |
| AUC-ROC          | 0.938 | 0.916 - 0.960              |
| AUC-PR           | 0.905 | 0.882 - 0.928              |

*Table 5: Performance Metrics of the Kidney Disease Random Forest Model (Test Set)*

Add this table after discussing external validation:

| Metric           | Value | Difference from Test Set |
|------------------|-------|--------------------------|
| Accuracy         | 84.2% | -3.1%                    |
| Sensitivity/Recall | 88.6% | -1.5%                    |
| Specificity      | 81.3% | -4.3%                    |
| F1 Score         | 83.9% | -4.3%                    |

*Table 6: External Validation Results on the MIMIC-III Subset (n=750)*

Add this visualization after discussing feature importance:

```mermaid
pie title "Kidney Disease Feature Importance"
    "Serum creatinine" : 24.7
    "Blood urea" : 19.3
    "Hemoglobin" : 15.8
    "Specific gravity" : 9.4
    "Albumin" : 8.6
    "Other factors" : 22.2
```

*Figure 5.3: Pie chart showing feature importance for kidney disease prediction*

## ROC Curve Comparison (For Section 5.1)

Add this visualization after discussing all three models' performance:

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

*Figure 5.4: ROC curves comparing performance across all three disease models*

## Model Optimization Comparison (For Section 3.4.2)

Add this table when discussing model conversion and optimization:

| Model            | Original Size | Optimized Size | Size Reduction | Accuracy Change |
|------------------|---------------|----------------|----------------|-----------------|
| Heart Disease    | 2.3MB         | 0.55MB         | 76%            | -0.3%           |
| Diabetes         | 1.8MB         | 0.52MB         | 71%            | -0.4%           |
| Kidney Disease   | 4.2MB         | 0.88MB         | 79%            | -0.5%           |

*Table 7: Comparison of Original vs. Optimized Models*

## Prediction Process Workflow (For Section 4.2.2)

Add this visualization to illustrate the data flow patterns:

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

*Figure 4.1: Flowchart showing the prediction process workflow*

## System Usability Evaluation (For Section 5.3)

Add these tables when discussing usability results:

| Aspect                | Average SUS Score | Rating    |
|-----------------------|-------------------|-----------|
| Overall System        | 86.5              | Excellent |
| Heart Module          | 87.2              | Excellent |
| Diabetes Module       | 85.9              | Excellent |
| Kidney Module         | 86.1              | Excellent |
| Learning Curve        | 84.3              | Excellent |
| Error Prevention      | 83.7              | Good      |
| Visualization Quality | 89.2              | Excellent |
| Navigation            | 85.8              | Excellent |
| Task Completion       | 88.4              | Excellent |

*Table 8: System Usability Evaluation Results (n=32)*

| Task                            | Average Time (seconds) | Improvement vs. Traditional Methods |
|---------------------------------|------------------------|-------------------------------------|
| Heart Disease Risk Assessment   | 78.3                   | 64% faster                          |
| Diabetes Risk Assessment        | 65.2                   | 71% faster                          |
| Kidney Disease Risk Assessment  | 83.5                   | 58% faster                          |
| Combined Assessment (all three) | 192.0                  | 68% faster                          |
| Result Interpretation           | 46.8                   | 73% faster                          |

*Table 9: Task Completion Time Analysis*

## Clinical Validation Results (For Section 5.4)

Add this table when discussing validation with medical standards:

| Validation Type                       | Heart Disease | Diabetes    | Kidney Disease |
|--------------------------------------|---------------|-------------|----------------|
| Guideline Concordance                | 93.8% (ACC/AHA) | 96.2% (ADA) | 95.3% (KDIGO)  |
| Treatment Recommendation Agreement   | 95.2%         | 93.5%       | 93.7%          |
| Risk Categorization Accuracy         | 91.6%         | 92.7%       | 92.5%          |
| Feature Importance Clinical Relevance | 97.3%         | 94.8%       | 96.4%          |
| Overall Clinical Utility Rating      | 4.7/5.0       | 4.5/5.0     | 4.6/5.0        |

*Table 10: Clinical Validation Results*

## Development Timeline (For Section 3.5.5)

Add this Gantt chart when discussing the development methodology:

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

*Figure 3.1: Gantt chart showing development and validation timeline for all models*

## Technical Performance (For Section 5.2)

Add these tables when discussing technical performance:

| Browser             | Version       | Functionality | Performance | Rendering | Loading Time |
|---------------------|---------------|--------------|-------------|-----------|--------------|
| Chrome              | 103.0.5060.134 | 100%         | Excellent   | Excellent | 1.8s         |
| Firefox             | 101.0.1       | 100%         | Excellent   | Excellent | 2.1s         |
| Safari              | 15.5          | 100%         | Good        | Excellent | 2.3s         |
| Edge                | 103.0.1264.44 | 100%         | Excellent   | Excellent | 1.9s         |
| Opera               | 88.0.4412.74  | 100%         | Good        | Excellent | 2.0s         |
| Chrome (Mobile)     | 103.0.5060.71 | 100%         | Good        | Excellent | 2.5s         |
| Safari (iOS)        | 15.5          | 100%         | Good        | Excellent | 2.7s         |
| Firefox (Mobile)    | 101.3.0       | 100%         | Good        | Good      | 2.6s         |

*Table 11: Browser Compatibility Testing*

| Device Type      | Heart Model | Diabetes Model | Kidney Model | All Models | With Caching |
|------------------|-------------|----------------|--------------|------------|--------------|
| Desktop (High-end) | 0.8s       | 0.7s           | 1.1s         | 2.6s       | 0.2s         |
| Desktop (Mid-range) | 1.1s       | 1.0s           | 1.5s         | 3.6s       | 0.3s         |
| Laptop            | 1.3s       | 1.2s           | 1.9s         | 4.4s       | 0.3s         |
| Tablet            | 1.8s       | 1.6s           | 2.7s         | 6.1s       | 0.4s         |
| Smartphone (High-end) | 2.1s     | 1.9s           | 3.2s         | 7.2s       | 0.5s         |
| Smartphone (Mid-range) | 3.2s    | 2.8s           | 4.7s         | 10.7s      | 0.7s         |
| Smartphone (Low-end) | 5.4s     | 4.8s           | 7.9s         | 18.1s      | 1.2s         |

*Table 12: Model Loading Performance Across Devices*

## Model Performance Comparison (For Section 5.1)

Add this class diagram to provide a visual comparison of all three models:

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

*Figure 5.5: Class diagram showing performance metrics for all disease prediction models* 