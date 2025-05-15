/**
 * Report Visualization Integration Script
 * 
 * This script automates the integration of visualizations, diagrams, and tables
 * into the report document. It reads the source report file, processes it to identify
 * sections for enhancement, and inserts the corresponding visualizations.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const REPORT_PATH = './report.txt';
const ENHANCED_REPORT_PATH = './report_enhanced.md';
const DIAGRAM_FOLDER = './diagrams';
const OUTPUT_FORMAT = 'markdown'; // 'markdown' or 'text'

// Mapping of sections to visualizations
const SECTION_MAPPINGS = {
  'System Design and Implementation': {
    subsection: 'System Architecture',
    visuals: ['system_architecture.mmd'],
    insertAfter: 'System Architecture'
  },
  'Data Processing': {
    subsection: 'Data Flow',
    visuals: ['data_flow.mmd'],
    insertAfter: 'Data Flow'
  },
  'Model Training and Evaluation': {
    subsection: 'Feature Importance Analysis',
    visuals: ['heart_feature_importance.mmd', 'diabetes_feature_importance.mmd', 'kidney_feature_importance.mmd'],
    insertAfter: 'Feature Importance Analysis'
  },
  'Results and Analysis': {
    subsection: 'Model Performance',
    visuals: ['heart_performance.md', 'diabetes_performance.md', 'kidney_performance.md'],
    insertAfter: 'Model Performance Metrics'
  },
  'Model Comparison': {
    subsection: 'ROC Analysis',
    visuals: ['roc_comparison.mmd'],
    insertAfter: 'ROC Analysis'
  },
  'Validation against Medical Standards': {
    subsection: 'Validation Results',
    visuals: ['validation_results.md'],
    insertAfter: 'Validation Results'
  }
};

// Generate Mermaid diagrams based on visualization_guide.md
function generateDiagrams() {
  console.log('Generating diagrams from visualization_guide.md...');
  
  if (!fs.existsSync(DIAGRAM_FOLDER)) {
    fs.mkdirSync(DIAGRAM_FOLDER);
  }
  
  const guide = fs.readFileSync('./visualization_guide.md', 'utf8');
  const mermaidRegex = /```mermaid([\s\S]*?)```/g;
  let match;
  let diagramCount = 0;
  
  while ((match = mermaidRegex.exec(guide)) !== null) {
    diagramCount++;
    const diagramContent = match[1].trim();
    const filename = path.join(DIAGRAM_FOLDER, `diagram_${diagramCount}.mmd`);
    
    fs.writeFileSync(filename, diagramContent);
    console.log(`Saved diagram ${diagramCount} to ${filename}`);
  }
  
  console.log(`Generated ${diagramCount} diagrams.`);
  return diagramCount;
}

// Extract tables from visualization_guide.md
function extractTables() {
  console.log('Extracting tables from visualization_guide.md...');
  
  if (!fs.existsSync(DIAGRAM_FOLDER)) {
    fs.mkdirSync(DIAGRAM_FOLDER);
  }
  
  const guide = fs.readFileSync('./visualization_guide.md', 'utf8');
  const tableRegex = /\n\| .+\|\n\|[-\s\|]+\|\n(\|.+\|\n)+/g;
  let match;
  let tableCount = 0;
  
  while ((match = tableRegex.exec(guide)) !== null) {
    tableCount++;
    const tableContent = match[0].trim();
    const filename = path.join(DIAGRAM_FOLDER, `table_${tableCount}.md`);
    
    fs.writeFileSync(filename, tableContent);
    console.log(`Saved table ${tableCount} to ${filename}`);
  }
  
  console.log(`Extracted ${tableCount} tables.`);
  return tableCount;
}

// Process the report and integrate visualizations
async function integrateVisualizations() {
  console.log('Starting visualization integration...');
  
  // Generate assets first
  await generateDiagrams();
  await extractTables();
  
  // Read the report
  const report = fs.readFileSync(REPORT_PATH, 'utf8');
  const lines = report.split('\n');
  let enhancedReport = [];
  
  // Process each line
  let currentSection = '';
  let currentSubsection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    enhancedReport.push(line);
    
    // Detect sections (assuming sections are formatted as "4.2 System Design")
    const sectionMatch = line.match(/^\d+\.\d+\s+(.*)/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      currentSubsection = '';
      console.log(`Found section: ${currentSection}`);
    }
    
    // Detect subsections (assuming subsections are formatted as "4.2.1 System Architecture")
    const subsectionMatch = line.match(/^\d+\.\d+\.\d+\s+(.*)/);
    if (subsectionMatch) {
      currentSubsection = subsectionMatch[1].trim();
      console.log(`Found subsection: ${currentSubsection}`);
    }
    
    // Check if we need to insert visualizations
    Object.keys(SECTION_MAPPINGS).forEach(section => {
      const mapping = SECTION_MAPPINGS[section];
      
      if (currentSection.includes(section) || 
          (mapping.subsection && currentSubsection.includes(mapping.subsection))) {
        
        // Check if this line contains the text we want to insert after
        if (line.includes(mapping.insertAfter)) {
          console.log(`Inserting visualizations for ${section} - ${mapping.subsection}`);
          
          // Add a blank line
          enhancedReport.push('');
          
          // Insert each visualization
          mapping.visuals.forEach(visual => {
            const visualPath = path.join(DIAGRAM_FOLDER, visual);
            
            // Check if this is a Mermaid diagram or a table
            if (visual.endsWith('.mmd')) {
              if (OUTPUT_FORMAT === 'markdown') {
                enhancedReport.push('```mermaid');
                const diagramContent = fs.readFileSync(visualPath, 'utf8');
                enhancedReport.push(diagramContent);
                enhancedReport.push('```');
              } else {
                enhancedReport.push(`[Figure: ${visual.replace('.mmd', '')}]`);
                enhancedReport.push(`(See generated diagram at ${visualPath})`);
              }
            } else if (visual.endsWith('.md')) {
              const tableContent = fs.readFileSync(visualPath, 'utf8');
              enhancedReport.push(tableContent);
            }
            
            enhancedReport.push('');
          });
        }
      }
    });
  }
  
  // Save the enhanced report
  fs.writeFileSync(ENHANCED_REPORT_PATH, enhancedReport.join('\n'));
  console.log(`Enhanced report saved to ${ENHANCED_REPORT_PATH}`);
}

// Interactive command-line interface
async function interactive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  console.log('Report Visualization Integration Tool');
  console.log('------------------------------------');
  console.log('1. Generate diagrams from visualization guide');
  console.log('2. Extract tables from visualization guide');
  console.log('3. Integrate all visualizations into report');
  console.log('4. Preview specific visualization');
  console.log('5. Exit');
  
  rl.question('Select an option (1-5): ', async (answer) => {
    switch (answer) {
      case '1':
        await generateDiagrams();
        rl.close();
        break;
      case '2':
        await extractTables();
        rl.close();
        break;
      case '3':
        await integrateVisualizations();
        rl.close();
        break;
      case '4':
        rl.question('Enter visualization name (e.g., diagram_1.mmd): ', (name) => {
          const visualPath = path.join(DIAGRAM_FOLDER, name);
          if (fs.existsSync(visualPath)) {
            console.log(`Content of ${name}:`);
            console.log(fs.readFileSync(visualPath, 'utf8'));
          } else {
            console.log(`Visualization ${name} not found.`);
          }
          rl.close();
        });
        break;
      case '5':
        console.log('Exiting...');
        rl.close();
        break;
      default:
        console.log('Invalid option. Exiting...');
        rl.close();
    }
  });
}

// Run the interactive interface if called directly
if (require.main === module) {
  interactive();
} else {
  // Export functions for use in other scripts
  module.exports = {
    generateDiagrams,
    extractTables,
    integrateVisualizations
  };
} 