# Integration Guide for Visualizations

This guide provides instructions for integrating Mermaid diagrams and enhanced tables from the visualization guides into the main report document.

## Overview

The visualizations to be integrated include:
- System architecture diagrams
- Data flow architecture
- Feature importance visualizations
- ROC curve comparisons
- Model timelines
- User interaction flows
- Enhanced performance tables

## Key Integration Locations

### 1. System Architecture Section (Section 4.2)

**Target Location:** Around line 865-903 in report.txt
**Current Content:** ASCII architecture diagram
**Action:** Replace with the "Overall System Architecture" Mermaid diagram.

### 2. Data Flow Section (Section 4.4)

**Target Location:** Section 4.4 (around line 1500-1600)
**Action:** Add "Data Flow Architecture" diagram before the prediction workflow subsection.

### 3. Feature Importance Section (Section 4.6 or Section 5.1)

**Target Location:** Around line 1588-1617 where feature importance is discussed
**Action:** Replace text descriptions with feature importance visualizations for each disease.

### 4. ROC Curve Comparison (Section 5.1 or 5.2)

**Target Location:** Around line 1620 where ROC curves are mentioned
**Action:** Add the ROC curve comparison visualization.

### 5. Model Development Timeline (Section 3.3 or Section 4)

**Target Location:** In Methodology section where model development is discussed
**Action:** Add the model development timeline visualization.

### 6. User Interaction Flow (Section 4.4 or 4.6)

**Target Location:** Where user interaction is discussed
**Action:** Add the sequence diagram showing user interaction flow.

### 7. Enhanced Performance Tables (Section 5.1)

**Target Location:** Around line 1620-1630 where model performance is discussed
**Action:** Replace basic performance tables with enhanced versions including confidence intervals and baselines.

### 8. Model Size and Performance Tradeoffs (Section 4.5)

**Target Location:** Where model optimization is discussed
**Action:** Add the model size and performance tradeoff table.

### 9. External Validation and Usability Results (Section 5.4)

**Target Location:** Where external validation is discussed
**Action:** Add the external validation and usability evaluation tables.

### 10. Model Comparison with Literature (Section 5.2)

**Target Location:** Where comparison with other research is discussed
**Action:** Add the model comparison with literature table.

## Implementation Steps

1. Open report.txt in your preferred editor
2. Locate each target section mentioned above
3. Replace placeholder references or add new visualizations at the appropriate locations
4. Update any figure/table numbers to maintain sequential ordering
5. Ensure proper Mermaid syntax is preserved in the report
6. Update any textual references to figures/tables as needed

## Handling Mermaid Diagrams

If your document processor supports Mermaid:
- Use the code blocks directly with ```mermaid syntax

If not:
- Convert Mermaid diagrams to images using tools like mermaid-cli
- Replace code blocks with image references

## Additional Considerations

1. **Text References**: Update references to figures/tables in the text
2. **Numbering**: Ensure sequential numbering within sections
3. **Captions**: Keep consistent style for all captions
4. **Cross-References**: Update table of contents and cross-references
5. **File Size**: Consider splitting visuals to separate files if the main document becomes too large
