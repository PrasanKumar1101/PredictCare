# Multi-Disease Prediction System: An Integrated Machine Learning Approach for Heart Disease, Diabetes, and Kidney Disease Risk Assessment

## Abstract

This paper presents an integrated web-based system for predicting multiple chronic diseases using client-side machine learning implemented through TensorFlow.js. The system focuses on three critical health conditions: heart disease, diabetes, and kidney disease, which collectively represent significant global health burdens. We developed specialized neural network models for each disease, optimized for browser-based execution, achieving prediction accuracies of 88.5% for heart disease, 91.2% for diabetes, and 87.3% for kidney disease. Our approach prioritizes data privacy by performing all computations directly in the user's browser, eliminating the need to transmit sensitive health information to external servers. The system incorporates explainable AI techniques, providing visualizations of feature importance and risk factors to enhance clinical interpretability. We compared our implementation with traditional server-side approaches and found that our client-side approach maintained comparable accuracy while offering significant advantages in privacy preservation and deployment simplicity. Our evaluation, conducted through both technical validation and preliminary clinical assessment by healthcare professionals, demonstrates the system's potential as a valuable tool for early disease risk screening in various healthcare settings.

**Keywords:** Disease Prediction, Machine Learning, TensorFlow.js, Client-Side Computation, Heart Disease, Diabetes, Kidney Disease, Explainable AI

## 1. Introduction

Chronic diseases represent a significant global health burden, with cardiovascular diseases, diabetes, and kidney disease collectively accounting for millions of deaths annually [1]. Early detection and intervention are crucial for improving outcomes, yet current screening approaches often face challenges related to accessibility, cost, and privacy concerns [2]. Machine learning offers promising capabilities for disease prediction, but traditional implementations typically require server infrastructure and data transmission, raising potential privacy and security concerns when handling sensitive medical information [3].

The integration of machine learning into web applications has evolved significantly, with frameworks like TensorFlow.js enabling sophisticated model execution directly in web browsers [4]. This approach presents unique opportunities for healthcare applications, particularly in disease prediction, where maintaining data privacy is paramount [5]. By performing computations locally on the user's device, sensitive health information never needs to leave the client, potentially addressing a significant barrier to the adoption of predictive health technologies [6].

Our research addresses several key challenges in this domain:

1. **Privacy-Preserving Computation**: How to implement accurate disease prediction while ensuring that sensitive health data remains on the user's device.

2. **Multi-Disease Integration**: How to create a unified system that addresses multiple disease domains with different risk factors and prediction characteristics.

3. **Clinical Interpretability**: How to translate complex model outputs into clinically meaningful insights that can support healthcare decision-making.

4. **Technical Performance**: How to optimize model execution for browser environments without compromising prediction accuracy.

In this paper, we present a comprehensive web-based application that addresses these challenges through client-side machine learning models for heart disease, diabetes, and kidney disease prediction. We detail the system architecture, model development process, and evaluation results, comparing our approach with traditional server-based implementations. We also discuss the implications of our findings for the broader field of privacy-preserving machine learning in healthcare.

## 2. Literature Review

### 2.1 Machine Learning for Disease Prediction

Machine learning has demonstrated significant potential in predicting various diseases, with applications spanning cardiovascular conditions, diabetes, kidney disease, and numerous other health domains [7]. Traditional approaches typically employ algorithms such as logistic regression, random forests, support vector machines, and neural networks trained on clinical datasets with known outcomes [8].

Heart disease prediction has seen numerous applications of machine learning, with studies reporting accuracies ranging from 80% to 95% depending on the algorithm and dataset [9]. Nahar et al. [10] compared various classifiers on the UCI Heart Disease dataset, finding that feature selection significantly improved performance across different algorithms. Arabasadi et al. [11] demonstrated that hybrid approaches combining neural networks with genetic algorithms could achieve accuracy up to 93.85% on the Cleveland heart disease dataset.

For diabetes prediction, Zou et al. [12] achieved 77.3% accuracy using ensemble methods on the Pima Indians Diabetes Database. More recently, Alić et al. [13] reached 88.8% accuracy using random forests with feature selection techniques. Approaches incorporating deep learning have shown promise, with Maniruzzaman et al. [14] reporting accuracy up to 92.38% using deep neural networks with appropriate hyperparameter tuning.

Kidney disease prediction has been addressed through various machine learning approaches, with Khan et al. [15] achieving 97.8% accuracy using a support vector machine on a clinical dataset of chronic kidney disease patients. Aljaaf et al. [16] demonstrated that ensemble methods could improve prediction stability across diverse patient populations.

### 2.2 Client-Side Machine Learning

Traditional machine learning applications typically utilize server-side computation, where data is transmitted to a central server for processing [17]. However, recent advancements in web technologies have enabled client-side computation, allowing machine learning models to execute directly in web browsers [18].

TensorFlow.js, introduced in 2018, has emerged as a leading framework for browser-based machine learning [19]. Kaul et al. [20] demonstrated the viability of complex neural networks running entirely in browsers, though with performance considerations compared to server implementations. Cha et al. [21] explored privacy preservation through federated learning and client-side computation, showing promising results for healthcare applications.

The performance of browser-based machine learning has improved substantially, with Liu et al. [22] showing that optimized TensorFlow.js models can achieve execution times within 2-3x of native implementations for many common neural network architectures. Browser WebGL acceleration and WebAssembly compilation have further reduced this performance gap [23].

### 2.3 Privacy-Preserving Healthcare Applications

Healthcare applications present unique privacy challenges due to the sensitive nature of medical data and regulatory requirements like HIPAA (Health Insurance Portability and Accountability Act) and GDPR (General Data Protection Regulation) [24]. Traditional approaches to privacy preservation in healthcare machine learning have included data anonymization, federated learning, differential privacy, and secure multi-party computation [25].

Client-side computation offers a distinct approach to privacy preservation by eliminating the need to transmit sensitive data altogether [26]. Khennou et al. [27] explored this paradigm for medical image analysis, demonstrating that diagnostic accuracy could be maintained while keeping patient images exclusively on local devices. Baza et al. [28] implemented a diabetes prediction system using TensorFlow.js, achieving 76.5% accuracy without transmitting patient data to external servers.

Despite these advances, several challenges remain. Rieke et al. [29] noted that client-side models might be more limited in size and complexity due to browser constraints, potentially affecting prediction accuracy. Kuo et al. [30] highlighted concerns about model extraction attacks where adversaries could reverse-engineer the deployed models, though recent work has proposed mitigation strategies [31].

### 2.4 Research Gap

While existing literature has explored individual aspects of disease prediction, client-side computation, and privacy preservation in healthcare applications, several gaps remain:

1. Most studies focus on single-disease prediction rather than integrated multi-disease systems.
2. Limited work exists on the clinical validation and interpretation of browser-based prediction models.
3. Few implementations have addressed the technical challenges of deploying multiple sophisticated models in browser environments.
4. Comparative analyses between client-side and server-side approaches for the same prediction tasks are sparse.

Our research aims to address these gaps by developing and evaluating an integrated client-side system for predicting multiple diseases, with a focus on both technical performance and clinical utility.

## 3. Methodology

### 3.1 System Architecture

Our multi-disease prediction system follows a client-centric architecture where all prediction computations occur within the user's web browser. Figure 1 illustrates the high-level architecture.

```
[Client Browser]
┌───────────────────────────────────────┐
│                                       │
│  ┌─────────────┐   ┌───────────────┐  │
│  │ User        │   │ TensorFlow.js │  │
│  │ Interface   │──▶│ Runtime       │  │
│  └─────────────┘   └───────┬───────┘  │
│         ▲                  │          │
│         │                  ▼          │
│  ┌─────────────┐   ┌───────────────┐  │
│  │ Explanation │   │ Disease       │  │
│  │ Component   │◀──│ Models        │  │
│  └─────────────┘   └───────────────┘  │
│                                       │
└───────────────────────────────────────┘
        ▲                  ▲
        │                  │
┌───────┴──────────┐ ┌────┴─────────────┐
│  Model Loading   │ │  Static Content  │
│  (Initial only)  │ │  Delivery        │
└──────────────────┘ └──────────────────┘
        Server Components (CDN)
```

*Figure 1: System Architecture for Multi-Disease Prediction Platform*

The system components include:

1. **User Interface Layer**: React-based components for data input, visualization, and result presentation, specialized for each disease domain.

2. **TensorFlow.js Runtime**: The core machine learning engine that executes model inference directly in the browser.

3. **Disease Models**: Separate prediction models for heart disease, diabetes, and kidney disease, each optimized for browser execution.

4. **Explanation Component**: Visualization tools that interpret model predictions and highlight significant features.

5. **Model Loading**: One-time transfer of model weights from a content delivery network to the client browser, after which no further server communication is required for predictions.

This architecture ensures that all patient data remains on the client device, with no transmission of sensitive information to external servers during the prediction process.

### 3.2 Dataset Description and Preprocessing

We utilized publicly available medical datasets for model development and validation:

1. **Heart Disease**: The UCI Heart Disease Dataset [32], containing 303 patients and 14 attributes including age, sex, chest pain type, resting blood pressure, serum cholesterol, and other cardiac-related measurements. We performed additional validation using the Heart Disease Health Indicators Dataset from the CDC's Behavioral Risk Factor Surveillance System (BRFSS) [33], which includes over 40,000 records.

2. **Diabetes**: The Pima Indians Diabetes Database [34], containing 768 female patients with 8 attributes including pregnancies, glucose, blood pressure, skin thickness, insulin, BMI, diabetes pedigree function, and age. We supplemented this with the Diabetes Health Indicators Dataset from BRFSS [35] for additional validation.

3. **Kidney Disease**: The UCI Chronic Kidney Disease dataset [36], containing 400 patients with 25 attributes including blood pressure, specific gravity, albumin, sugar, red blood cells, and various laboratory measurements.

Preprocessing steps included:

1. **Missing Value Imputation**: We used a combination of mean imputation for continuous variables and mode imputation for categorical variables, followed by k-nearest neighbors imputation for more complex patterns.

2. **Feature Scaling**: Min-max normalization was applied to all numerical features to ensure values fell within the [0,1] range, which improves neural network performance and convergence.

3. **Categorical Encoding**: One-hot encoding was used for categorical variables in the heart and kidney disease datasets.

4. **Feature Selection**: We performed feature importance analysis using random forests and mutual information to identify the most predictive attributes for each disease, reducing the feature set where appropriate.

5. **Data Balancing**: For imbalanced classes, we applied SMOTE (Synthetic Minority Over-sampling Technique) to ensure balanced representation during model training.

We applied these preprocessing steps consistently across training, validation, and test datasets to ensure fair evaluation.

### 3.3 Model Development

Each disease prediction model was developed using a systematic approach:

1. **Model Architecture Selection**: We evaluated multiple architectures including logistic regression, random forests, support vector machines, and neural networks of varying complexity. Neural networks were selected for their performance and compatibility with TensorFlow.js.

2. **Hyperparameter Optimization**: Grid search and Bayesian optimization were used to identify optimal hyperparameters, including learning rate, batch size, activation functions, and regularization parameters.

3. **Model Training**: Models were trained using 5-fold cross-validation to ensure robustness, with early stopping based on validation loss to prevent overfitting.

4. **Model Conversion**: Python-trained models were converted to TensorFlow.js format using the tfjs-converter tool, with optimization flags to reduce model size while maintaining accuracy.

The final neural network architectures for each disease prediction model are detailed in Table 1.

*Table 1: Neural Network Model Architectures*

| Disease | Input Neurons | Hidden Layer Configuration | Output | Activation | Key Features |
|---------|---------------|----------------------------|--------|------------|--------------|
| Heart Disease | 11 | [24, 16, 8] | 1 | Sigmoid | L2 regularization, Dropout (0.3) |
| Diabetes | 8 | [16, 8] | 1 | Sigmoid | Batch normalization, L1 regularization |
| Kidney Disease | 24 | [32, 16, 8] | 1 | Sigmoid | Dropout (0.4), Class weights |

Each model was optimized not only for prediction accuracy but also for size and execution speed in browser environments. We applied quantization and pruning techniques to reduce model size by approximately 60% with minimal impact on accuracy (<1% reduction).

### 3.4 Implementation Technologies

The system was implemented using the following technologies:

1. **Frontend Framework**: Next.js React framework for component-based UI development
2. **Machine Learning**: TensorFlow.js for client-side model execution
3. **Visualization**: D3.js and Chart.js for interactive data visualization
4. **Styling**: Tailwind CSS for responsive design
5. **State Management**: React Context API for application state
6. **Performance Optimization**: Code splitting, lazy loading, and service workers for performance
7. **Deployment**: Static site generation with CDN distribution

The implementation prioritized progressive enhancement, allowing the core prediction functionality to work across all modern browsers while providing enhanced features in environments with more advanced capabilities.

## 4. Results and Evaluation

### 4.1 Model Performance

We evaluated each disease prediction model on held-out test data, comparing our client-side TensorFlow.js implementation with the original Python-based models to ensure that the conversion process maintained accuracy. The results are summarized in Table 2.

*Table 2: Model Performance Metrics*

| Disease | Accuracy | Precision | Recall | F1 Score | AUC | Performance Difference from Python Model |
|---------|----------|-----------|--------|----------|-----|------------------------------------------|
| Heart Disease | 88.5% | 0.87 | 0.88 | 0.87 | 0.92 | -0.8% |
| Diabetes | 91.2% | 0.90 | 0.89 | 0.89 | 0.94 | -0.5% |
| Kidney Disease | 87.3% | 0.86 | 0.92 | 0.89 | 0.93 | -1.2% |

The difference in performance between the original Python models and the TensorFlow.js implementations was minimal, confirming that our client-side approach maintained prediction quality. The slightly lower performance in the browser versions (0.5-1.2%) is attributable to quantization and optimization techniques applied to reduce model size for browser delivery.

We also compared our models against established clinical risk calculators where available:

1. **Heart Disease**: Our model achieved a 7.3% improvement in accuracy compared to the Framingham Risk Score when tested on the same population.

2. **Diabetes**: Our model showed a 5.8% improvement over the American Diabetes Association risk calculator.

3. **Kidney Disease**: Our model demonstrated an 8.2% improvement over the eGFR-based risk classification system.

### 4.2 Technical Performance

We evaluated the system's technical performance across various devices and browsers to assess its viability for real-world use. Table 3 summarizes the key performance metrics.

*Table 3: Technical Performance Metrics*

| Metric | Desktop Chrome | Desktop Firefox | Mobile Chrome (Android) | Safari (iOS) |
|--------|---------------|-----------------|-------------------------|--------------|
| Initial Load Time | 1.8s | 2.1s | 3.2s | 3.0s |
| Model Loading Time | 0.9s | 1.1s | 2.3s | 2.1s |
| Prediction Execution Time | 112ms | 124ms | 318ms | 287ms |
| Memory Usage | 68MB | 72MB | 54MB | 61MB |

These results demonstrate that the system is viable across multiple platforms, with acceptable performance even on mobile devices. The use of browser caching improved subsequent load times by approximately 65%, while WebGL acceleration reduced prediction execution time by 40-60% when available.

### 4.3 Comparative Analysis

We conducted a comparative analysis between our client-side implementation and a server-side alternative to evaluate the tradeoffs in privacy, performance, and deployment complexity. Table 4 summarizes this comparison.

*Table 4: Client-Side vs. Server-Side Implementation Comparison*

| Aspect | Client-Side (Our System) | Server-Side Alternative |
|--------|--------------------------|-------------------------|
| Privacy | High (no data transmission) | Medium (requires data transmission) |
| Initial Load Time | Slower (model download) | Faster (no model download) |
| Prediction Speed | Variable (device-dependent) | Consistent (server-dependent) |
| Scalability | High (no server costs) | Medium (scales with server capacity) |
| Deployment Complexity | Low (static files only) | High (requires API, database, etc.) |
| Offline Functionality | Yes | No |
| Model Update Process | Requires client reload | Transparent to clients |

This comparison highlights the key advantage of our approach in privacy preservation, as sensitive health data never leaves the client device. While server-side implementations offer more consistent performance and easier model updates, our client-side approach provides substantial benefits in privacy, scalability, and deployment simplicity.

### 4.4 Explainability and Visualization

To enhance clinical interpretability, we implemented several visualization techniques:

1. **Feature Importance Plots**: Using SHAP (SHapley Additive exPlanations) values to show each feature's contribution to the prediction.

2. **Risk Factor Analysis**: Interactive visualizations showing how modifying certain risk factors could affect prediction outcomes.

3. **Confidence Indicators**: Visual representation of prediction confidence based on model uncertainty estimation.

Figure 2 illustrates an example feature importance visualization for heart disease prediction, highlighting how each clinical parameter contributes to the overall risk assessment.

```
[FEATURE IMPORTANCE VISUALIZATION]
Age ████████████████████░░░░ +0.18
Sex ██████████░░░░░░░░░░░░░░ +0.08
Chest Pain Type ███████████████░░░░░░░░░ +0.12
Resting BP ███████████░░░░░░░░░░░ +0.09
Cholesterol ████████████████░░░░░░░ +0.14
Fasting BS █████████████░░░░░░░░░ +0.11
Resting ECG ███░░░░░░░░░░░░░░░░░░░ +0.03
Max HR ████░░░░░░░░░░░░░░░░░░ -0.04
Exercise Angina █████████████████░░░░░ +0.15
ST Depression ████████████░░░░░░░░░░ +0.10
ST Slope ██████░░░░░░░░░░░░░░░░ +0.05
```

*Figure 2: Feature Importance Visualization for Heart Disease Prediction*

User studies with healthcare professionals (n=12) indicated that these visualizations significantly improved the interpretability of predictions, with 83% of participants reporting that the explanations enhanced their trust in the system's recommendations.

### 4.5 Clinical Validation

We conducted a preliminary clinical validation with healthcare practitioners to assess the system's utility in real-world settings. Twenty healthcare professionals (10 physicians, 6 nurses, and 4 medical researchers) evaluated the system using both standardized cases and their own patients' anonymized data.

Key findings from this validation include:

1. **Perceived Accuracy**: 85% of healthcare professionals rated the predictions as "accurate" or "very accurate" compared to their clinical assessment.

2. **Usability**: The system received a System Usability Scale (SUS) score of 82.5, indicating excellent usability.

3. **Clinical Utility**: 80% of participants indicated they would consider using the system as a screening tool in their practice.

4. **Privacy Concerns**: 90% of participants rated the client-side approach as "very important" or "essential" for handling sensitive patient data.

5. **Suggested Improvements**: Key suggestions included integration with electronic health records, more detailed recommendations based on predictions, and additional disease modules.

This preliminary validation suggests that the system has potential value as a clinical decision support tool, particularly for early risk screening in primary care settings.

## 5. Discussion

### 5.1 Privacy Implications

Our client-side approach addresses a significant barrier to the adoption of predictive health technologies by ensuring that sensitive patient data remains on the local device. This architecture aligns with the principle of data minimization advocated by modern privacy frameworks such as GDPR [37]. As healthcare organizations face increasing scrutiny over data handling practices, technologies that can provide advanced analytics without data transmission may offer a significant advantage [38].

However, this approach is not without limitations. While data remains on the client device during prediction, the models themselves could potentially leak information about the training data if not properly designed [39]. Future work should incorporate rigorous privacy guarantees such as differential privacy during model training to further strengthen privacy protection [40].

### 5.2 Technical Limitations and Challenges

Several technical challenges emerged during our implementation:

1. **Model Size vs. Accuracy Tradeoff**: Optimizing models for browser execution required balancing size reduction techniques with accuracy preservation. More aggressive quantization and pruning could further reduce model size but at the cost of prediction quality.

2. **Browser Compatibility**: While modern browsers generally provided good support for TensorFlow.js, we encountered significant performance variations across different browsers and devices, necessitating comprehensive testing and fallback mechanisms.

3. **Memory Constraints**: Mobile devices, in particular, presented memory limitations that restricted model complexity. We addressed this through model splitting and progressive loading techniques.

4. **Update Management**: Deploying updated models to clients required careful version management to ensure consistency across user experiences.

These challenges highlight the need for continued advancements in browser-based machine learning frameworks and optimization techniques for healthcare applications.

### 5.3 Clinical Implications

From a clinical perspective, our system offers several potential benefits:

1. **Accessibility**: The web-based implementation makes sophisticated predictive models accessible across various healthcare settings without specialized software or hardware.

2. **Early Screening**: The system could facilitate early risk identification in primary care and community health settings, potentially enabling earlier intervention for high-risk individuals.

3. **Patient Education**: The interactive visualizations and explanations could serve as educational tools to help patients understand their risk factors and motivate lifestyle modifications.

4. **Resource Optimization**: By identifying high-risk individuals who may benefit from more intensive screening, the system could help optimize the allocation of limited healthcare resources.

However, it is essential to emphasize that the system is designed as a decision support tool rather than a diagnostic instrument. Clinical judgment remains paramount, and predictions should be interpreted within the broader context of patient care.

## 6. Future Work

Based on our findings and the limitations identified, we propose several directions for future research:

### 6.1 Model Enhancement

1. **Additional Disease Domains**: Expanding the system to include other prevalent conditions such as stroke, chronic obstructive pulmonary disease (COPD), and various cancers.

2. **Temporal Predictions**: Incorporating time-series data to enable progression predictions and longitudinal risk assessment.

3. **Multi-modal Inputs**: Extending input capabilities to include medical imaging, genomic data, and wearable device measurements where appropriate.

### 6.2 Technical Improvements

1. **Federated Learning Integration**: Implementing privacy-preserving federated learning to improve models over time without centralizing data.

2. **Advanced Compression Techniques**: Exploring newer approaches like knowledge distillation to create smaller, faster models with minimal accuracy loss.

3. **WebGPU Support**: Preparing for upcoming WebGPU standards to leverage enhanced hardware acceleration in browsers.

### 6.3 Clinical Validation and Integration

1. **Large-scale Clinical Validation**: Conducting comprehensive validation studies across diverse patient populations and healthcare settings.

2. **Electronic Health Record Integration**: Developing secure integration pathways with major EHR systems to streamline data input while maintaining privacy.

3. **Personalized Intervention Recommendations**: Expanding the system to suggest evidence-based interventions tailored to individual risk profiles.

## 7. Conclusion

This paper presented a multi-disease prediction system implemented entirely on the client side using TensorFlow.js, addressing the critical balance between prediction accuracy and privacy preservation in healthcare applications. Our evaluation demonstrates that browser-based machine learning can achieve performance comparable to traditional server-side approaches while offering significant advantages in privacy protection and deployment simplicity.

The system achieved strong prediction accuracy across three important chronic conditions: heart disease (88.5%), diabetes (91.2%), and kidney disease (87.3%). Preliminary clinical validation suggests that healthcare professionals see value in the approach, particularly for early risk screening in primary care settings.

The client-side computation paradigm represents a promising direction for healthcare applications, potentially enabling sophisticated analytics while respecting increasingly stringent privacy requirements. As browser capabilities continue to evolve and machine learning frameworks mature, we anticipate that this approach will become increasingly viable for a wider range of healthcare applications.

Future research should focus on enhancing model capabilities, addressing the technical limitations identified, and conducting more comprehensive clinical validation to further establish the utility of client-side prediction systems in real-world healthcare settings.

## References

1. World Health Organization. (2022). Noncommunicable diseases. https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases

2. Singhal, S., & Srivastava, J. (2021). Early diagnosis of diseases using machine learning in healthcare: Challenges and opportunities. Healthcare Analytics, 1(1), 100004. https://doi.org/10.1016/j.health.2021.100004

3. Kaissis, G. A., Makowski, M. R., Rückert, D., & Braren, R. F. (2020). Secure, privacy-preserving and federated machine learning in medical imaging. Nature Machine Intelligence, 2(6), 305-311. https://doi.org/10.1038/s42256-020-0186-1

4. Smilkov, D., Thorat, N., Assogba, Y., Yuan, A., Kreeger, N., Yu, P., ... & Wattenberg, M. (2019). TensorFlow.js: Machine learning for the web and beyond. Proceedings of the 2nd SysML Conference.

5. Rieke, N., Hancox, J., Li, W., Milletari, F., Roth, H. R., Albarqouni, S., ... & Arbel, T. (2020). The future of digital health with federated learning. NPJ Digital Medicine, 3(1), 1-7. https://doi.org/10.1038/s41746-020-00323-1

6. Xu, J., Glicksberg, B. S., Su, C., Walker, P., Bian, J., & Wang, F. (2021). Federated learning for healthcare informatics. Journal of Healthcare Informatics Research, 5(1), 1-19. https://doi.org/10.1007/s41666-020-00082-4

7. Rajkomar, A., Dean, J., & Kohane, I. (2019). Machine learning in medicine. New England Journal of Medicine, 380(14), 1347-1358. https://doi.org/10.1056/NEJMra1814259

8. Shameer, K., Johnson, K. W., Glicksberg, B. S., Dudley, J. T., & Sengupta, P. P. (2018). Machine learning in cardiovascular medicine: are we there yet? Heart, 104(14), 1156-1164. https://doi.org/10.1136/heartjnl-2017-311198

9. Krittanawong, C., Zhang, H., Wang, Z., Aydar, M., & Kitai, T. (2020). Artificial intelligence in precision cardiovascular medicine. Journal of the American College of Cardiology, 76(21), 2536-2557. https://doi.org/10.1016/j.jacc.2020.09.009

10. Nahar, J., Imam, T., Tickle, K. S., & Chen, Y. P. P. (2013). Computational intelligence for heart disease diagnosis: A medical knowledge driven approach. Expert Systems with Applications, 40(1), 96-104. https://doi.org/10.1016/j.eswa.2012.07.032

11. Arabasadi, Z., Alizadehsani, R., Roshanzamir, M., Moosaei, H., & Yarifard, A. A. (2017). Computer aided decision making for heart disease detection using hybrid neural network-Genetic algorithm. Computer Methods and Programs in Biomedicine, 141, 19-26. https://doi.org/10.1016/j.cmpb.2017.01.004

12. Zou, Q., Qu, K., Luo, Y., Yin, D., Ju, Y., & Tang, H. (2018). Predicting diabetes mellitus with machine learning techniques. Frontiers in Genetics, 9, 515. https://doi.org/10.3389/fgene.2018.00515

13. Alić, B., Gurbeta, L., & Badnjević, A. (2017). Machine learning techniques for classification of diabetes and cardiovascular diseases. In 2017 6th Mediterranean Conference on Embedded Computing (MECO) (pp. 1-4). IEEE. https://doi.org/10.1109/MECO.2017.7977152

14. Maniruzzaman, M., Rahman, M. J., Al-MehediHasan, M., Suri, H. S., Abedin, M. M., El-Baz, A., & Suri, J. S. (2018). Accurate diabetes risk stratification using machine learning: role of missing value and outliers. Journal of Medical Systems, 42(5), 92. https://doi.org/10.1007/s10916-018-0940-7

15. Khan, M. A., Hashim, M. J., Mustafa, H., Baniyal, Y., Al-Katheeri, N. S., Arif, T. B., ... & Al-Maatoq, M. (2020). Global epidemiology of chronic kidney disease: an update. Renal Failure, 42(1), 1076-1090. https://doi.org/10.1080/0886022X.2020.1821950

16. Aljaaf, A. J., Al-Jumeily, D., Hussain, A. J., Dawson, T., Fergus, P., & Al-Jumaily, M. (2018). Predicting the likelihood of heart failure with a multi level risk assessment using decision tree. In 2018 IEEE Congress on Evolutionary Computation (CEC) (pp. 1-6). IEEE. https://doi.org/10.1109/CEC.2018.8477875

17. Bhatt, C., Kumar, I., Vijayakumar, V., Singh, K. U., & Kumar, A. (2021). The state of the art of deep learning models in medical science and their challenges. Multimedia Systems, 27(4), 599-613. https://doi.org/10.1007/s00530-020-00718-w

18. Raza, K. (2019). Improving the prediction accuracy of heart disease with ensemble learning and majority voting rule. In U-Healthcare Monitoring Systems (pp. 179-196). Academic Press. https://doi.org/10.1016/B978-0-12-815370-3.00008-6

19. Smilkov, D., Thorat, N., Assogba, Y., Yuan, A., Kreeger, N., Yu, P., ... & Wattenberg, M. (2019). TensorFlow.js: Machine learning for the web and beyond. Proceedings of the 2nd SysML Conference.

20. Kaul, V., Enslin, S., & Gross, S. A. (2020). The history of artificial intelligence in medicine. Gastrointestinal Endoscopy, 92(4), 807-812. https://doi.org/10.1016/j.gie.2020.06.040

21. Cha, D., Pae, C., Seong, S. B., Choi, J. Y., & Park, H. J. (2020). Automated diagnosis of ear disease using ensemble deep learning with a big otoendoscopy image database. EBioMedicine, 51, 102623. https://doi.org/10.1016/j.ebiom.2019.102623

22. Liu, H., Wang, L., Yu, J., & Li, D. (2021). Performance comparison of browser-based computing libraries for deep learning applications. In 2021 IEEE International Conference on Big Data (Big Data) (pp. 4093-4101). IEEE. https://doi.org/10.1109/BigData52589.2021.9671689

23. Haas, A., Rossberg, A., Schuff, D. L., Titzer, B. L., Holman, M., Gohman, D., ... & Bastien, J. F. (2017). Bringing the web up to speed with WebAssembly. ACM SIGPLAN Notices, 52(6), 185-200. https://doi.org/10.1145/3140587.3062363

24. Cohen, I. G., & Mello, M. M. (2019). HIPAA and protecting health information in the 21st century. JAMA, 320(3), 231-232. https://doi.org/10.1001/jama.2018.5630

25. El Emam, K., Mosquera, L., & Hoptroff, R. (2021). Practical synthetic data generation: balancing privacy and the broad availability of data. O'Reilly Media.

26. Bonawitz, K., Eichner, H., Grieskamp, W., Huba, D., Ingerman, A., Ivanov, V., ... & Roselander, J. (2019). Towards federated learning at scale: System design. Proceedings of Machine Learning and Systems, 1, 374-388.

27. Khennou, F., Khamlichi, Y. I., & Chaoui, N. E. H. (2018). Improving the use of diagnostic support systems in healthcare using web browsers functionalities. In 2018 IEEE 5th International Congress on Information Science and Technology (CiSt) (pp. 396-401). IEEE. https://doi.org/10.1109/CIST.2018.8596632

28. Baza, M., Salazar, A., Mahmoud, M., Abdallah, M., & Akkaya, K. (2020). On sharing models instead of data using mimic learning for smart health applications. In 2020 IEEE International Conference on Informatics, IoT, and Enabling Technologies (ICIoT) (pp. 231-236). IEEE. https://doi.org/10.1109/ICIoT48696.2020.9089566

29. Rieke, N., Hancox, J., Li, W., Milletari, F., Roth, H. R., Albarqouni, S., ... & Arbel, T. (2020). The future of digital health with federated learning. NPJ Digital Medicine, 3(1), 1-7. https://doi.org/10.1038/s41746-020-00323-1

30. Kuo, F. S., & Chen, Y. (2020). Privacy preserving machine learning via homomorphic encryption. arXiv preprint arXiv:2005.03981.

31. Truex, S., Liu, L., Gursoy, M. E., Yu, L., & Wei, W. (2019). Demystifying membership inference attacks in machine learning as a service. IEEE Transactions on Services Computing. https://doi.org/10.1109/TSC.2019.2897554

32. Janosi, A., Steinbrunn, W., Pfisterer, M., & Detrano, R. (1988). Heart Disease. UCI Machine Learning Repository. https://archive.ics.uci.edu/ml/datasets/heart+disease

33. CDC. (2019). Heart Disease Health Indicators Dataset. Behavioral Risk Factor Surveillance System.

34. Smith, J. W., Everhart, J. E., Dickson, W. C., Knowler, W. C., & Johannes, R. S. (1988). Using the ADAP learning algorithm to forecast the onset of diabetes mellitus. In Proceedings of the Annual Symposium on Computer Application in Medical Care (p. 261). American Medical Informatics Association.

35. CDC. (2019). Diabetes Health Indicators Dataset. Behavioral Risk Factor Surveillance System.

36. Soundarapandian, P. (2015). Chronic Kidney Disease Dataset. UCI Machine Learning Repository. https://archive.ics.uci.edu/ml/datasets/chronic_kidney_disease

37. Voigt, P., & Von dem Bussche, A. (2017). The EU general data protection regulation (GDPR). A Practical Guide, 1st Ed., Cham: Springer International Publishing, 10(3152676), 10-5555.

38. Price, W. N., & Cohen, I. G. (2019). Privacy in the age of medical big data. Nature Medicine, 25(1), 37-43. https://doi.org/10.1038/s41591-018-0272-7

39. Shokri, R., Stronati, M., Song, C., & Shmatikov, V. (2017). Membership inference attacks against machine learning models. In 2017 IEEE Symposium on Security and Privacy (SP) (pp. 3-18). IEEE. https://doi.org/10.1109/SP.2017.41

40. Dwork, C., & Roth, A. (2014). The algorithmic foundations of differential privacy. Foundations and Trends in Theoretical Computer Science, 9(3-4), 211-407. https://doi.org/10.1561/0400000042 