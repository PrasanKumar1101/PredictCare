# Visualization Extraction and Processing

This document outlines the steps to extract and process visualizations from the guide for integration into the report.

## Prerequisites

1. Install Node.js (v14+ recommended)
2. Install required dependencies:
   ```
   npm install @mermaid-js/mermaid-cli puppeteer
   ```

## Extracting Diagrams

Run the integration script to extract all diagrams from the visualization guide:

```bash
node integration_script.js
# When prompted, select option 1 to generate diagrams
```

## Converting Mermaid Diagrams to Images

Use the Mermaid CLI to convert `.mmd` files to PNG images:

```bash
# For each diagram file
mmdc -i ./diagrams/diagram_1.mmd -o ./diagrams/diagram_1.png -t neutral
mmdc -i ./diagrams/diagram_2.mmd -o ./diagrams/diagram_2.png -t neutral
# Continue for all diagram files
```

## Extracting Tables

Extract all tables from the visualization guide:

```bash
node integration_script.js
# When prompted, select option 2 to extract tables
```

## Full Integration

To automatically integrate all visualizations into the report:

```bash
node integration_script.js
# When prompted, select option 3 to integrate all visualizations
```

This will create an enhanced version of your report with all diagrams and tables inserted at the appropriate locations.

## Manual Insertion

If you prefer to manually insert specific visualizations:

1. For Mermaid diagrams, copy the content from the appropriate `.mmd` file in the `diagrams` folder and insert it into your report between triple backtick mermaid blocks:
   ```
   ```mermaid
   (diagram content here)
   ```
   ```

2. For tables, copy the content from the appropriate `.md` file in the `diagrams` folder and paste it directly into your report.

## Diagram Types and Their Usage

| Diagram Type | Used For | Example File |
|-------------|----------|--------------|
| Flowchart | System architecture, data flow | system_architecture.mmd |
| Pie Chart | Feature importance visualization | heart_feature_importance.mmd |
| Sequence Diagram | User interaction flows | user_interaction.mmd |
| Gantt Chart | Project timeline | project_timeline.mmd |

## Generated Output Structure

After running the integration script, you will have the following structure:

```
project/
├── report.txt                  # Original report
├── report_enhanced.md          # Enhanced report with visualizations
├── integration_script.js       # Integration script
├── visualization_guide.md      # Visualization guide with diagram definitions
├── extract_visuals.md          # This file
└── diagrams/                   # Generated diagrams and tables
    ├── diagram_1.mmd           # Mermaid diagram source
    ├── diagram_1.png           # Generated image
    ├── table_1.md              # Extracted table
    └── ...
``` 