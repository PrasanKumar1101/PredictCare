# Improved Tables for Report

## Table 1: Performance Metrics of the Heart Disease Neural Network Model (Test Set)

| Metric           | Value | Confidence Interval (95%) |
|------------------|-------|-----------------------------|
| Accuracy         | 88.5% | 86.2% - 90.8%              |
| Sensitivity/Recall | 87.3% | 84.9% - 89.7%              |
| Specificity      | 89.4% | 87.1% - 91.7%              |
| Precision        | 89.0% | 86.6% - 91.4%              |
| F1 Score         | 88.1% | 85.8% - 90.4%              |
| AUC-ROC          | 0.934 | 0.912 - 0.956              |
| AUC-PR           | 0.911 | 0.887 - 0.935              |

## Table 2: External Validation Results on the Hungarian Institute of Cardiology Dataset

| Metric           | Value | Difference from Test Set |
|------------------|-------|--------------------------|
| Accuracy         | 86.2% | -2.3%                    |
| Sensitivity/Recall | 84.5% | -2.8%                    |
| Specificity      | 87.6% | -1.8%                    |
| F1 Score         | 85.1% | -3.0%                    |

## Table 3: Performance Metrics of the Diabetes Gradient Boosting Model (Test Set)

| Metric           | Value | Confidence Interval (95%) |
|------------------|-------|-----------------------------|
| Accuracy         | 91.2% | 89.1% - 93.3%              |
| Sensitivity/Recall | 86.8% | 84.2% - 89.4%              |
| Specificity      | 93.7% | 91.5% - 95.9%              |
| Precision        | 89.3% | 86.8% - 91.8%              |
| F1 Score         | 88.0% | 85.6% - 90.4%              |
| AUC-ROC          | 0.952 | 0.931 - 0.973              |
| AUC-PR           | 0.923 | 0.901 - 0.945              |

## Table 4: External Validation Results on the NHANES Dataset Subset (n=1,245)

| Metric           | Value | Difference from Test Set |
|------------------|-------|--------------------------|
| Accuracy         | 89.3% | -1.9%                    |
| Sensitivity/Recall | 84.2% | -2.6%                    |
| Specificity      | 92.1% | -1.6%                    |
| F1 Score         | 86.8% | -1.2%                    |

## Table 5: Performance Metrics of the Kidney Disease Random Forest Model (Test Set)

| Metric           | Value | Confidence Interval (95%) |
|------------------|-------|-----------------------------|
| Accuracy         | 87.3% | 84.9% - 89.7%              |
| Sensitivity/Recall | 90.1% | 87.8% - 92.4%              |
| Specificity      | 85.6% | 83.1% - 88.1%              |
| Precision        | 86.4% | 83.9% - 88.9%              |
| F1 Score         | 88.2% | 85.9% - 90.5%              |
| AUC-ROC          | 0.938 | 0.916 - 0.960              |
| AUC-PR           | 0.905 | 0.882 - 0.928              |

## Table 6: External Validation Results on the MIMIC-III Subset (n=750)

| Metric           | Value | Difference from Test Set |
|------------------|-------|--------------------------|
| Accuracy         | 84.2% | -3.1%                    |
| Sensitivity/Recall | 88.6% | -1.5%                    |
| Specificity      | 81.3% | -4.3%                    |
| F1 Score         | 83.9% | -4.3%                    |

## Table 7: Comparison of Original vs. Optimized Models

| Model            | Original Size | Optimized Size | Size Reduction | Accuracy Change |
|------------------|---------------|----------------|----------------|-----------------|
| Heart Disease    | 2.3MB         | 0.55MB         | 76%            | -0.3%           |
| Diabetes         | 1.8MB         | 0.52MB         | 71%            | -0.4%           |
| Kidney Disease   | 4.2MB         | 0.88MB         | 79%            | -0.5%           |

## Table 8: System Usability Evaluation Results (n=32)

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

## Table 9: Task Completion Time Analysis

| Task                            | Average Time (seconds) | Improvement vs. Traditional Methods |
|---------------------------------|------------------------|-------------------------------------|
| Heart Disease Risk Assessment   | 78.3                   | 64% faster                          |
| Diabetes Risk Assessment        | 65.2                   | 71% faster                          |
| Kidney Disease Risk Assessment  | 83.5                   | 58% faster                          |
| Combined Assessment (all three) | 192.0                  | 68% faster                          |
| Result Interpretation           | 46.8                   | 73% faster                          |

## Table 10: Clinical Validation Results

| Validation Type                       | Heart Disease | Diabetes    | Kidney Disease |
|--------------------------------------|---------------|-------------|----------------|
| Guideline Concordance                | 93.8% (ACC/AHA) | 96.2% (ADA) | 95.3% (KDIGO)  |
| Treatment Recommendation Agreement   | 95.2%         | 93.5%       | 93.7%          |
| Risk Categorization Accuracy         | 91.6%         | 92.7%       | 92.5%          |
| Feature Importance Clinical Relevance | 97.3%         | 94.8%       | 96.4%          |
| Overall Clinical Utility Rating      | 4.7/5.0       | 4.5/5.0     | 4.6/5.0        |

## Table 11: Browser Compatibility Testing

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

## Table 12: Model Loading Performance Across Devices

| Device Type      | Heart Model | Diabetes Model | Kidney Model | All Models | With Caching |
|------------------|-------------|----------------|--------------|------------|--------------|
| Desktop (High-end) | 0.8s       | 0.7s           | 1.1s         | 2.6s       | 0.2s         |
| Desktop (Mid-range) | 1.1s       | 1.0s           | 1.5s         | 3.6s       | 0.3s         |
| Laptop            | 1.3s       | 1.2s           | 1.9s         | 4.4s       | 0.3s         |
| Tablet            | 1.8s       | 1.6s           | 2.7s         | 6.1s       | 0.4s         |
| Smartphone (High-end) | 2.1s     | 1.9s           | 3.2s         | 7.2s       | 0.5s         |
| Smartphone (Mid-range) | 3.2s    | 2.8s           | 4.7s         | 10.7s      | 0.7s         |
| Smartphone (Low-end) | 5.4s     | 4.8s           | 7.9s         | 18.1s      | 1.2s         | 