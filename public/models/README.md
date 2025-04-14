# TensorFlow.js Models

This directory will contain the TensorFlow.js models converted from the original ML models.

## Directory Structure

- `diabetes/` - Diabetes prediction model
- `heart/` - Heart disease prediction model
- `kidney/` - Kidney disease prediction model

## Generating Models

To generate these models, run the conversion script from the project root:

```bash
python convert_models.py
```

This will convert the scikit-learn models from `ml/saved_models/` to TensorFlow.js format and place them in this directory. 