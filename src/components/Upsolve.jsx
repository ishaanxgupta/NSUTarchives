
import React, { useState, useEffect,useRef,useCallback } from 'react';
import {
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  MenuItem,
  Select,
  useMediaQuery,
  Dialog,
  DialogTitle, 
  DialogContent,

} from '@mui/material';
import { useParams } from 'react-router-dom';
import { CheckCircle, Cancel, ExpandMore, PlayArrow } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import MonacoEditor from '@monaco-editor/react';
import debounce from 'lodash.debounce';
import './Upsolve.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import questions from "../data/question.json";

const boilerplate = {

};
const testCasesInitial = [
  { input: '3 5', expectedOutput: '8', output: '' },
  { input: '2 3', expectedOutput: '5', output: '' },
  { input: '7 4', expectedOutput: '11', output: '' },
];

const extraTestCases = [
  { input: '1 2', expectedOutput: '3', output: '' },
  { input: '4 5', expectedOutput: '9', output: '' },
  { input: '6 1', expectedOutput: '7', output: '' },
  { input: '2 8', expectedOutput: '10', output: '' },
  { input: '10 20', expectedOutput: '30', output: '' }
];
const theme = createTheme();
const Upsolve = () => {
  const [code, setCode] = useState(boilerplate.cpp);
  const [testCases, setTestCases] = useState(testCasesInitial);
  const [activeTestCase, setActiveTestCase] = useState(0); // Index for current active test case
  const [testResults, setTestResults] = useState(Array(testCases.length).fill(null));
  const [extraTestCases, setExtraTestCases] = useState([{ input: '', expectedOutput: '', output: '' }]); // Pass/fail status of each test case
  const [loading, setLoading] = useState(false); // Loading state for initial test cases
  const [extraLoading, setExtraLoading] = useState(false); // Loading state for extra test cases
  const [language, setLanguage] = useState('cpp');
  const [error, setError] = useState(''); // Add this line to define an error state
  const [solved, setSolved] = useState(false);
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [isFocusMode,setIsFocusMode] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = false;
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [suggestion,setSuggestion] = useState('');

 const [inlineSuggestion, setInlineSuggestion] = useState('');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);

  const { id } = useParams(); // Get question ID from the URL
  const selectedQuestion = questions.find((q) => q.id === parseInt(id)); // Find question by ID


  const handleRunCode = async (index, caseSet = 'main') => {
    setLoading(true);
    setError(''); // Clear previous errors

    const selectedTestCases = caseSet === 'extra' ? extraTestCases : testCases;

    // Set loading based on the case set
    if (caseSet === 'extra') {
      setExtraLoading(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch('https://api.codex.jaagrav.in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          input: selectedTestCases[index].input,
          language: 'cpp',
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error); 
        testCases[index].output = ''; 
    } else {  
        testCases[index].output = data.output.trim();
        setError(''); 
    }
    
      const updatedTestCases = [...selectedTestCases];
      updatedTestCases[index].output = data.output.trim();

      // Check if the output matches the expected output
      const updatedResults = [...testResults];
      if (updatedTestCases[index].output === selectedTestCases[index].expectedOutput) {
        updatedResults[index] = true; // Test passed
        setSolved(true);
      } else {
        updatedResults[index] = false; // Test failed
      }
      setTestResults(updatedResults);
      if (caseSet === 'extra') {
        setTestResults(updatedTestCases);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally { 
    if (caseSet === 'extra') {
      setExtraLoading(false);
    } else {
      setLoading(false);
    }}
    setLoading(false);
  };


const handleCodeChange = (e) => {
    setCode(e.target.value); // Update the code as user types
    // handleGetSuggestions(); // Get suggestions on every change or debounce as needed
};
  const handleSaveCode = () => {
    const file = new Blob([code], { type: 'text/plain' }); // Creates a text file with code content
    const fileName = `${code}.${language}`; // Names the file based on selected language
    const url = URL.createObjectURL(file); // Blob URL

    // Create a temporary link to download the file
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // Sets the download filename
    document.body.appendChild(link);
    link.click(); // Triggers the download
    document.body.removeChild(link); // Removes link after download

    URL.revokeObjectURL(url); // Frees up the Blob URL
};
  // Run all extra test cases one by one
  const handleRunExtraTestCases = async () => {
    setExtraLoading(true);
    for (let i = 0; i < extraTestCases.length; i++) {
      await handleRunCode(i, 'extra');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
    }
    setExtraLoading(false);
  };

  // Add new test case to main test cases
  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', output: '' }]);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    if (window.confirm('Changing the language will remove your current code. Do you want to proceed?')) {
      setLanguage(newLanguage);
      setCode(boilerplate[newLanguage]); // Set the boilerplate for the selected language
    }
  };

  // Save code to local storage
  useEffect(() => {
    const savedCode = localStorage.getItem('savedCode');
    const savedLanguage = localStorage.getItem('savedLanguage');
    if (savedCode) {
      setCode(savedCode);
      setLanguage(savedLanguage || 'cpp');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedCode', code);
    localStorage.setItem('savedLanguage', language);
  }, [code, language]);

  // useEffect(() => {
  //   console.log('EditorRef:', editorRef.current);
  //   console.log('MonacoRef:', monacoRef.current);
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
    document.getElementById('main-content').classList.add('blur-sm');
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById('main-content').classList.remove('blur-sm');
}





const generateCodeFromGemini = useCallback(
  debounce(async (currentCode) => {
    // f(currentCode);
    setCode(currentCode);
    console.log(currentCode);
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAL0n5l4b8ih9WBFELTt9n0Ewro2DlMsDY', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `I am making a automatic code filler based on this code which i provide. You just have to complete the c++ code on the basis of this code without any explanation and comments. Here is the code: ${currentCode}.`,
         },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // Log the response for debugging
        console.log('Gemini API response:', data.candidates[0]?.content?.parts?.[0]?.text);
        console.log(currentCode);
        // Safely access nested properties to prevent errors
        const generatedText =
           data.candidates[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
          appendInlineSuggestion(generatedText.trim(),currentCode); // Set the suggestion if available
          // setSuggestion(generatedText.trim());
        } else {
          console.warn('No valid suggestion returned from Gemini');
        }
      } else {
        console.error('Failed to generate code from Gemini:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating suggestion:', error);
    }
  }, 500), // 500ms debounce
  []
);

const handleEditorMount = (editor, monaco) => {
  editorRef.current = editor;
  monacoRef.current = monaco;
  // console.log('Editor initialized:', editor);
  // console.log('Monaco initialized:', monaco);
};

const handleEditorChange = async (value, event) => {
  setCode(value);
  if (aiSuggestionsEnabled && event.changes[0].text == ';') {
    generateCodeFromGemini(value);
  }
};

const appendInlineSuggestion = (suggestion,t) => { 
  console.log(suggestion);
  console.log(t);
 
    const editor = editorRef.current;
    const position = editor?.getPosition(); // current cursor position 
    const newCode = suggestion; // Append the suggestion directly to code
    setCode(newCode);

    editor.setValue(newCode); // Update the editor with the new code

    // Optionally, move the cursor back to the original position
    editor.setPosition(position);

};


const insertText = (symbol) => {
  if (!editorRef.current || !monacoRef.current) {
    console.error('Editor or Monaco is not initialized.');
    return;
  }

  const editor = editorRef.current;
  const monaco = monacoRef.current;

  const position = editor.getPosition();
  const range = new monaco.Range(
    position.lineNumber,
    position.column,
    position.lineNumber,
    position.column
  );

  editor.executeEdits('', [
    {
      range: range,
      text: symbol,
      forceMoveMarkers: true,
    },
  ]);

  // Move cursor to the end of the inserted symbol
  editor.setPosition({
    lineNumber: position.lineNumber,
    column: position.column + symbol.length,
  });

  editor.focus(); // Refocus the editor
};


// const addSuggestionDecoration = () => {
//   if (!suggestion) return;
//   // console.log(suggestion);
//   const monaco = monacoRef.current;
//   const editor = editorRef.current;
//   const position = editor.getPosition(); // Get cursor position
//   const lineNumber = position.lineNumber;
//   const column = position.column;

//   const range = new monaco.Range(lineNumber, column, lineNumber, column + suggestion.length);

//   // Create a decoration with lighter text
//   const decoration = {
//     range: range,
//     options: {
//       inlineClassName: 'suggestion-text', // Custom CSS class for lighter text
//     },
//   };
// console.log(decoration);
//   // Apply decoration
//   decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [decoration]);
// };

// // Handle accepting the suggestion with the Tab key
// const handleTabPress = (event) => {
//   console.log("hello");
//   if (suggestion && event.key === 'Tab') {
//     setCode((prevCode) => prevCode + suggestion);
//     setSuggestion(""); // Clear suggestion after acceptance
//   }
// };

// useEffect(() => {
//   if (editorRef.current) {
//     addSuggestionDecoration();
//   }
// }, [suggestion]); // Update decorations when the suggestion changes

// useEffect(() => {
//   const editor = editorRef.current;
//   const monaco = monacoRef.current;

//   // Listen for Tab key press to insert suggestion
//   editor?.addCommand(monaco.KeyCode.Tab, handleTabPress);
// }, [suggestion]);

const toggleAiSuggestions = () => {
  setAiSuggestionsEnabled((prev) => !prev);
};

  return (
    
    <Box id="main-content" sx={{ p: isMobile ? '10px' : '20px', display: isFocusMode ? 'block' : 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
  {/* <Box sx={{ display: 'flex', gap: '20px', padding: '20px' }}> */}
  {/* Left Section: Question Title */}
  {!isFocusMode && (
     <Box
     sx={{
       mb: "20px",
       p: "20px",
       border: "1px solid #ccc",
       borderRadius: "8px",
       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
       backgroundColor: "#f9f9f9",
       flex: isMobile ? "none" : 1,
     }}
   >
     {/* Question Name */}
     <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, color: "#333" }}>
       {selectedQuestion?.name}
     </Typography>
   
     {/* Metadata */}
     <Typography
       variant="subtitle1"
       sx={{ fontStyle: "italic", color: "#555", mb: 1 }}
     >
       Rating: {selectedQuestion?.rating}
     </Typography>
     <Typography variant="subtitle1" sx={{ mb: 1, color: "#555" }}>
       Difficulty: <b>{selectedQuestion?.difficulty}</b>
     </Typography>
     <Typography variant="subtitle1" sx={{ mb: 1, color: "#555" }}>
       Topics: <b>{selectedQuestion?.topics.join(", ")}</b>
     </Typography>
     <Typography variant="subtitle1" sx={{ mb: 3, color: "#555" }}>
       Company: <b>{selectedQuestion?.company}</b>
     </Typography>
   
     {/* Description */}
     <Box sx={{ mb: 3 }}>
       <Typography
         variant="subtitle1"
         sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
       >
         Description:
       </Typography>
       <Typography
         variant="body2"
         sx={{
           whiteSpace: "pre-line",
           color: "#555",
           lineHeight: "1.6",
         }}
       >
         {selectedQuestion?.question_description}
       </Typography>
     </Box>
   
     {/* Function Description */}
     <Box sx={{ mb: 3 }}>
       <Typography
         variant="subtitle1"
         sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
       >
         Function Description:
       </Typography>
       <Typography
         variant="body2"
         sx={{
           whiteSpace: "pre-line",
           color: "#555",
           lineHeight: "1.6",
         }}
       >
         {selectedQuestion?.function_description}
       </Typography>
     </Box>
   
     {/* Input Format */}
     <Box sx={{ mb: 3 }}>
       <Typography
         variant="subtitle1"
         sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
       >
         Input Format:
       </Typography>
       <Typography
         variant="body2"
         sx={{
           whiteSpace: "pre-line",
           color: "#555",
           lineHeight: "1.6",
         }}
       >
         {selectedQuestion?.input_format}
       </Typography>
     </Box>
   
     {/* Output Format */}
     <Box sx={{ mb: 3 }}>
       <Typography
         variant="subtitle1"
         sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
       >
         Output Format:
       </Typography>
       <Typography
         variant="body2"
         sx={{
           whiteSpace: "pre-line",
           color: "#555",
           lineHeight: "1.6",
         }}
       >
         {selectedQuestion?.output_format}
       </Typography>
     </Box>
   
     {/* Solved Indicator */}
     {solved && (
       <Typography
         variant="body2"
         sx={{
           ml: 1,
           fontSize: "0.9em",
           color: "green",
           fontWeight: "bold",
         }}
       >
         ✔️ Solved
       </Typography>
     )}
   
     {/* Examples */}
     <Box sx={{ mb: 3 }}>
       <Typography
         variant="subtitle1"
         sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
       >
         Examples:
       </Typography>
       {selectedQuestion?.examples.map((example, index) => (
         <Box
           key={index}
           sx={{
             p: "10px",
             mb: "10px",
             border: "1px solid #ddd",
             borderRadius: "8px",
             backgroundColor: "#fff",
           }}
         >
           <Typography variant="body2" sx={{ color: "#555" }}>
             <b>Input:</b> {example.input}
           </Typography>
           <Typography variant="body2" sx={{ color: "#555" }}>
             <b>Output:</b> {example.output}
           </Typography>
           {example.explanation && (
             <Typography variant="body2" sx={{ color: "#555" }}>
               <b>Explanation:</b> {example.explanation}
             </Typography>
           )}
         </Box>
       ))}
     </Box>
   
     {/* Constraints */}
     <Box>
       <Typography
         variant="subtitle1"
         sx={{ mb: 1, fontWeight: "bold", color: "#333" }}
       >
         Constraints:
       </Typography>
       <Typography
         variant="body2"
         sx={{
           whiteSpace: "pre-line",
           color: "#555",
           lineHeight: "1.6",
         }}
       >
         {selectedQuestion?.constraints}
       </Typography>
     </Box>
     <br></br>
   
   
        {/* Left side: Extra Test Cases in Accordions */}
      <Box flex={1}>
        <Typography variant="h6">Extra Test Cases</Typography>
        {extraTestCases.map((testCase, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Test Case {index + 1}</Typography>
              <IconButton
                color={testResults[index] === null ? 'primary' : testResults[index] ? 'success' : 'error'}
                sx={{ ml: 'auto' }}
                onClick={() => handleRunCode(index, 'extra')}
                disabled={loading || extraLoading} // Disable button while code is running
              >
                {loading || extraLoading ? <CircularProgress size={24} color="inherit" /> : <PlayArrow />}
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">Input:</Typography>
              <TextField
                fullWidth
                value={testCase.input}
                margin="normal"
                disabled
              />
              <Typography variant="subtitle1">Expected Output:</Typography>
              <TextField
                fullWidth
                value={testCase.expectedOutput}
                margin="normal"
                disabled
              />
              <Typography variant="subtitle1">Code Output:</Typography>
              <TextField
                fullWidth
                value={testCase.output || 'Run the code to see output'}
                margin="normal"
                disabled
              />
              <Box mt={2}>
                {testResults[index] === true && (
                  <CheckCircle style={{ color: 'green' }} />
                )}
                {testResults[index] === false && (
                  <Cancel style={{ color: 'red' }} />
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      </Box>
  )}

      {/* Right side: Code Editor and Language Selection */}
      <Box sx={{ flex: isMobile ? 'none' : 2, width: isMobile ? '100%' : 'auto'  }}>
        <div className='flex gap-2 content-end'>

          {/* focus button - by ishaan */}
      <Button className="" variant="contained" color="secondary" onClick={() => setIsFocusMode(!isFocusMode)}>
  {isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
</Button>
{/* download button - by ishaan */}
<button class="custom-button" onClick={handleSaveCode}>
  <span class="button-text">Save Code</span>
  <span class="button-icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 35 35"
      class="svg-icon"
    >
      <path
        d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"
      ></path>
      <path
        d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"
      ></path>
      <path
        d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"
      ></path>
    </svg>
  </span>
</button>

{/* show solution button by ishaan */}
<Button variant="contained" color="primary" onClick={handleClickOpen}>
        Solution
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="flex gap-x-72">Answer to the Question <div className="justify-end"><button className='bg-red-500 ml-4' onClick={handleClose}><CloseIcon></CloseIcon></button></div></DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Here is the detailed solution to the question. The response includes explanations and code snippets to provide a comprehensive understanding of the solution approach.
          </Typography>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
            {`def example_function():  # Code snippet\n    return "Example Output"`}
          </pre>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
            <Button variant="contained" color="primary">
              Analyze Time Complexity
            </Button>
            <Button variant="contained" color="primary">
              Analyze Space Complexity
            </Button>
          </div>
        </DialogContent>
      </Dialog> 


      <div className="flex items-center gap-3">
    <span className="text-sm text-gray-600 ml-64">AI Suggestions</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={aiSuggestionsEnabled}
        onChange={toggleAiSuggestions}
      />
      <div className="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
    </label>
  </div>
</div>


<MonacoEditor
        height="500px"
        language="cpp"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        options={{
          fontFamily: 'Courier New, monospace',
          fontSize: 14,
          lightbulb: { enabled: true },
        }}
        
      />    
  {/* yeh woh action bar hai jo chal ni rha */}
     <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: { xs: 1, sm: 1, md: 3 }, 
      backgroundColor: '#f5f5f5',
      p: 0.5,  
      mt: { xs: 2, sm: 2, md: 3 },  
      borderRadius: '4px',
      boxShadow: { xs: 1, sm: 2, md: 3 },  
      width: { xs: 'auto', sm: 'auto' },
      flexWrap: 'wrap',   
    }}
    
  
    >
      {['{}', '()', '[]', 'if', 'else', 'for','<>','vector'].map((symbol, idx) => (
        <Button key={idx} variant="text" size="small" onClick={() => insertText(symbol,code)}>
          {symbol}
        </Button>
      ))}
    </Box>

{/* Language bar */}
  <Box mt={3}>
    <Select
      value={language}
      onChange={handleLanguageChange}
      fullWidth
    >
      <MenuItem value="cpp">C++</MenuItem>
      <MenuItem value="python">Python</MenuItem>
      <MenuItem value="javascript">JavaScript</MenuItem>
      <MenuItem value="java">Java</MenuItem>
    </Select>
  </Box>
  {error && (
    <div style={{ marginTop: '16px', color: 'red', whiteSpace: 'pre-line' }}>
        {error}
    </div>
)}


        {/* Tabs for Test Cases */}
        <Box mt={3}>
          <Tabs
            value={activeTestCase}
            onChange={(event, newValue) => setActiveTestCase(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="Test Cases Tabs"
          >
            {testCases.map((_, index) => (
              <Tab label={`TestCase ${index + 1}`} key={index} />
            ))}
            <Button onClick={addTestCase} style={{ marginLeft: '10px' }}>+ Add Test Case</Button>
          </Tabs>

          <Box p={2} border={1} borderRadius={2} style={{ backgroundColor: '#f8f9fa' }}>
            <Typography variant="subtitle1">Input:</Typography>
            <TextField
              fullWidth
              value={testCases[activeTestCase].input}
              margin="normal"
              onChange={(e) => {
                const updatedTestCases = [...testCases];
                updatedTestCases[activeTestCase].input = e.target.value;
                setTestCases(updatedTestCases);
              }}
            />

            <Typography variant="subtitle1">Expected Output:</Typography>
            <TextField
              fullWidth
              value={testCases[activeTestCase].expectedOutput}
              margin="normal"
              onChange={(e) => {
                const updatedTestCases = [...testCases];
                updatedTestCases[activeTestCase].expectedOutput = e.target.value;
                setTestCases(updatedTestCases);
              }}
            />

            <Typography variant="subtitle1">Code Output:</Typography>
            <TextField
              fullWidth
              value={testCases[activeTestCase].output || 'Run the code to see output'}
              margin="normal"
              disabled
            />
             
            {/* Run Button  */}
           <button 
                onClick={() => handleRunCode(activeTestCase)} 
                className={`relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50 
                            overflow-hidden h-12 w-48 rounded-md bg-sky-800 p-2 flex justify-center items-center 
                            font-extrabold`}
                disabled={loading} // Disable button while code is running
            >
                <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
                <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
                <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
                <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
                <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
                <p className="z-10">{loading ? <CircularProgress size={24} color="inherit" /> : 'Run'}</p>
            </button>

            <Box mt={2}>
              {testResults[activeTestCase] === true && (
                <CheckCircle style={{ color: 'green' }} />
              )}
              {testResults[activeTestCase] === false && (
                <Cancel style={{ color: 'red' }} />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Upsolve;