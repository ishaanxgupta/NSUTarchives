
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
  Drawer,

} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { CheckCircle, Cancel, ExpandMore, PlayArrow } from '@mui/icons-material';
import Close from '@mui/icons-material/Close';
import CloseIcon from '@mui/icons-material/Close';
import MonacoEditor from '@monaco-editor/react';
import debounce from 'lodash.debounce';
import './Upsolve.css';
import questions from "../data/question.json";
import Footer from './Footer';
import Header from './Header';
import Loader2 from './Loader2';
import Button1 from './Button1';
import Tick from '../Utils/Tick';
import HowTouseModal from '../Utils/HowtouseModal';
import HowTouseModal1 from '../Utils/HowtouseModal1';
import BurgerButton from '../Utils/BurgerButton';
import MenuIcon from '@mui/icons-material/Menu';
import Premium from './Premium';
import Add from './Add';

const boilerplate = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,

  python: `def main():

if __name__ == "__main__":
    main()`,

  java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`
};


const Upsolve = () => {
  const { id } = useParams(); // Get question ID from the URL
  const selectedQuestion = questions.find((q) => q.id === parseInt(id)); // Find question by ID
  const [code, setCode] = useState(boilerplate.cpp);
  const [testCases, setTestCases] = useState(selectedQuestion?.testCases);
  const [activeTestCase, setActiveTestCase] = useState(0); // Index for current active test case
  const [testResults, setTestResults] = useState(Array(testCases.length).fill(null));
  // const [extraTestCases, setExtraTestCases] = useState([{ input: '', expectedOutput: '', actualOutput: '' }]); // Pass/fail status of each test case
 
  const [extraTestCases, setExtraTestCases] = useState(
    selectedQuestion.extraTestCases.map((testCase) => ({
      ...testCase,
      actualOutput: '', // Add a field to store the output from the compiler
    }))
  );
  const [loading, setLoading] = useState(false); // Loading state for initial test cases
  const [extraLoading, setExtraLoading] = useState(false); // Loading state for extra test cases
  const [language, setLanguage] = useState('cpp');
  const [error, setError] = useState(''); // Add this line to define an error state
  const [solved, setSolved] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFocusMode,setIsFocusMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [suggestion,setSuggestion] = useState('');

 const [inlineSuggestion, setInlineSuggestion] = useState('');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const [copied,setCopied] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false); 
  const [isLOADING,SetIsLOADING] = useState(true);  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPremium,setIsPremium] = useState(false);



  // const handleRunCode = async (index, caseSet = 'main') => {
  //   // setLoading(true);  //yeh glti lag rhi iss line ko hata skte hai
  //   setError(''); 

  //   const selectedTestCases = caseSet === 'extra' ? extraTestCases : testCases;

  //   // Set loading based on the case set
  //   if (caseSet === 'extra') {
  //     setExtraLoading(true);
  //   } else {
  //     setLoading(true);
  //   }

  //   try {
  //     const response = await fetch('https://api.codex.jaagrav.in', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         code,
  //         input: selectedTestCases[index].input,
  //         language: 'cpp',
  //       }),
  //     });
  //     const data = await response.json();
  //     if (data.error) {
  //       setError(data.error); 
  //       testCases[index].output = ''; 
  //   } else {  
  //       testCases[index].output = data.output.trim();
  //       setError(''); 
  //   }
    
  //     const updatedTestCases = [...selectedTestCases];
  //     updatedTestCases[index].output = data.output.trim();

  //     // Check if the output matches the expected output
  //     const updatedResults = [...testResults];
  //     if (updatedTestCases[index].output === selectedTestCases[index].output) {
  //       updatedResults[index] = true; // Test passed
  //       setSolved(true);
  //     } else {
  //       updatedResults[index] = false; // Test failed
  //     }
  //     setTestResults(updatedResults);
  //     if (caseSet === 'extra') {
  //       setTestResults(updatedTestCases);
  //     }
  //   } catch (error) {
  //     setError('An unexpected error occurred. Please try again.');
  //   } finally { 
  //   if (caseSet === 'extra') {
  //     setExtraLoading(false);
  //   } else {
  //     setLoading(false);
  //   }}
  //   // setLoading(false); //yeh bhi htado
  // };


  // const handleRunCode = async (index, caseSet = 'main') => {
  //   setError(''); 
  
  //   const selectedTestCases = caseSet === 'extra' ? extraTestCases : testCases;
  
  //   // Set loading based on the case set
  //   if (caseSet === 'extra') {
  //     setExtraLoading(true);
  //   } else {
  //     setLoading(true);
  //   }
  
  //   try {
  //     const response = await fetch('https://api.codex.jaagrav.in', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         code,
  //         input: selectedTestCases[index].input,
  //         language: 'cpp',
  //       }),
  //     });
  //     const data = await response.json();
  //     if (data.error) {
  //       setError(data.error); 
  //     } else {  
  //       setError('');
  //       const updatedTestCases = [...selectedTestCases];
        
  //       // Store the actual output in a new field
  //       updatedTestCases[index].actualOutput = data.output.trim();
  
  //       // Check if the actual output matches the expected output
  //       const updatedResults = [...testResults];
  //       if (updatedTestCases[index].actualOutput === selectedTestCases[index].output) {
  //         updatedResults[index] = true; // Test passed
  //       } else {
  //         updatedResults[index] = false; // Test failed
  //       }
  
  //       if (caseSet === 'main') {
  //         setTestCases(updatedTestCases); // Update main test cases
  //       } else {
  //         setExtraTestCases(updatedTestCases); // Update extra test cases
  //       }
  //       setTestResults(updatedResults);
  //     }
  //   } catch (error) {
  //     setError('An unexpected error occurred. Please try again.');
  //   } finally { 
  //     if (caseSet === 'extra') {
  //       setExtraLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleRunCode = async (index, caseSet = 'main') => {
    setError('');
    const selectedTestCases = caseSet === 'extra' ? extraTestCases : testCases;
    caseSet === 'extra' ? setExtraLoading(true) : setLoading(true);
  
    try {
      const controller = new AbortController(); // Create a new AbortController
      const timeoutId = setTimeout(() => controller.abort(), 3500); 
  
      const response = await fetch('https://api.codex.jaagrav.in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          input: selectedTestCases[index].input,
          language: 'cpp',
        }),
        signal: controller.signal, 
      });
  
      clearTimeout(timeoutId); 
      const data = await response.json();
  
      if (data.error) {
        setError(data.error);
      } else {
        setError('');
  
        const updatedTestCases = [...selectedTestCases];
        const updatedResults = [...testResults];
        //hi
  
        // Store the actual output
        const actualOutput = data.output.trim();
        updatedTestCases[index].actualOutput = actualOutput;
  
        // Ensure the TLE status is cleared
        updatedTestCases[index].tle = false;
  
        // Update state based on the case set
        if (caseSet === 'main') {
          setTestCases(updatedTestCases);
        } else {
          setExtraTestCases(updatedTestCases);
        }
  
        // Compare outputs for results
        updatedResults[index] = actualOutput === selectedTestCases[index].output;
        setTestResults(updatedResults);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // Handle timeout by marking TLE but not overwriting actualOutput
        const updatedTestCases = [...selectedTestCases];
        updatedTestCases[index].tle = true; // Mark as TLE
        caseSet === 'main' ? setTestCases(updatedTestCases) : setExtraTestCases(updatedTestCases);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      caseSet === 'extra' ? setExtraLoading(false) : setLoading(false);
    }
  };
  

const handleCodeChange = (e) => {
    setCode(e.target.value); 
};
  const handleSaveCode = () => {
    const file = new Blob([code], { type: 'text/plain' });
    const fileName = `${selectedQuestion.name}.${language}`; 
    const url = URL.createObjectURL(file); 
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; 
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link); 

    URL.revokeObjectURL(url); 
};
  // Run all extra test cases one by one
  const handleRunExtraTestCases = async () => {
    setExtraLoading(true);
    for (let i = 0; i < extraTestCases.length; i++) {
      await handleRunCode(i, 'extra');
      await new Promise(resolve => setTimeout(resolve, 2000)); 
    }
    setExtraLoading(false);
  };

  // Add new test case to main test cases
  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', actualOutput: '' }]);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    if (window.confirm('Smart, knows to code in different languages😏. Changing the language will remove your current code. Do you want to proceed?')) {
      setLanguage(newLanguage);
      setCode(boilerplate[newLanguage]); 
    }
  };

  const deleteTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    const newActiveIndex = index === activeTestCase
      ? Math.max(0, activeTestCase - 1) 
      : activeTestCase;
  
    setTestCases(updatedTestCases);
    setActiveTestCase(newActiveIndex);
  };

  
  // useEffect(() => {
  //   // Retrieve saved code and language from localStorage on component mount
  //   const savedCode = localStorage.getItem('savedCode');
  //   const savedLanguage = localStorage.getItem('savedLanguage');
  //   const savedID = localStorage.getItem('savedID');
  
  //   // Check and set the retrieved code and language
  //   if (savedCode !== null) {
  //     console.log(savedCode)
  //     console.log("inside the if")
  //     setCode(savedCode);
  //   }else{
  //     setCode(boilerplate.cpp);
  //   }
  
  //   setLanguage(savedLanguage); 

  //   setIsLoaded(true);
  // }, [5000]);

  // useEffect(() => {
  //   // Save code and language to localStorage whenever they change
  //   if (isLoaded) { // Only save after initial load
  //     localStorage.setItem('savedCode', code);
  //     localStorage.setItem('savedLanguage', language);
  //     localStorage.setItem('savedID', selectedQuestion.id);
  //   }
  // }, [code, language,selectedQuestion.id, isLoaded]);


  useEffect(() => {
    // Retrieve saved data on component mount
    const savedData = JSON.parse(localStorage.getItem("savedCodes")) || {};
  
    if (selectedQuestion?.id && savedData[selectedQuestion.id]) {
      setCode(savedData[selectedQuestion.id]);
    } else {
      setCode(boilerplate.cpp);
    }
  
    const savedLanguage = localStorage.getItem("savedLanguage");
    setLanguage(savedLanguage || "cpp");
  
    setIsLoaded(true);
  }, [selectedQuestion?.id]); // Only re-run when the selected question ID changes
  
  useEffect(() => {
    // Save the code and language to localStorage whenever they change
    if (isLoaded && selectedQuestion?.id) { 
      const savedData = JSON.parse(localStorage.getItem("savedCodes")) || {};
  
      // Update the code for the current question ID
      savedData[selectedQuestion.id] = code;
      localStorage.setItem("savedCodes", JSON.stringify(savedData));
      localStorage.setItem("savedLanguage", language);
    }
  }, [code, language, selectedQuestion?.id, isLoaded]);




  
  


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
  }, 500), 
  []
);

const handleEditorMount = (editor, monaco) => {
  editorRef.current = editor;
  monacoRef.current = monaco;
  // console.log('Editor initialized:', editor);
  // console.log('Monaco initialized:', monaco);
};

setTimeout(() => {
  SetIsLOADING(false);
},[1000])

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
    const position = editor?.getPosition(); 
    const newCode = suggestion;
    setCode(newCode);

    editor.setValue(newCode); 
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

  editor.focus();
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

const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);


const toggleDrawer = () => {
  setIsDrawerOpen(!isDrawerOpen);
};

  return (
    <>
    <Header/>
    {isLOADING ?(
        <div className='flex items-center justify-center'><Loader2/></div>
    ):(
  
    <Box id="main-content" sx={{ p: isMobile ? '10px' : '20px', display: isFocusMode ? 'block' : 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', overflow: 'hidden' }}>
  {/* <Box sx={{ display: 'flex', gap: '20px', padding: '20px' }}> */}

  {/* Left Section */}
  <HowTouseModal/>
  <HowTouseModal1 isModalOpen={isModalOpen} closeModal={closeModal} />
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
       maxWidth: isMobile ? "100%" : "50%", // Restrict maximum width for the left section
       maxHeight: "165vh", // Set maximum height for the container
       overflowY: "auto", // Enable vertical scrolling
     }}
   >
     {/* Question Name */}
  <Typography
    variant="h5"
    sx={{
      fontWeight: "bold",
      mb: 1,
      backgroundImage: "linear-gradient(to right, #007BFF, #20c997)",
      backgroundClip: "text",
      textFillColor: "transparent",
    }}
  >
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
      {/* <Box flex={1}>
        <Typography variant="h6">Extra Test Cases</Typography>
        {selectedQuestion.extraTestCases.map((testCase, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Test Case {index + 1}</Typography>
              <IconButton
                color={testResults[index] === null ? 'primary' : testResults[index] ? 'success' : 'error'}
                sx={{ ml: 'auto' }}
                onClick={() => handleRunCode(index, 'extra')}
                disabled={extraLoading} // Disable button while code is running
              >
                {extraLoading ? <CircularProgress size={24} color="inherit" /> : <PlayArrow />}
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
                value={testCase.output}
                margin="normal"
                disabled
              />
              <Typography variant="subtitle1">Code Output:</Typography>
              <TextField
                fullWidth
                value={extraTestCases.actualOutput || 'Run the code to see output'}//yaha correction krna hai jab output ayega toh yaha dikhna chhiaye na
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
      </Box> */}
      <Box flex={1}>
  <Typography variant="h6">Extra Test Cases</Typography>
  {selectedQuestion.extraTestCases.map((testCase, index) => (
    <Accordion key={index} >
      <AccordionSummary expandIcon={isPremium ? <ExpandMore /> : null}>
        <Typography>Test Case {index + 1}</Typography>
        {!isPremium && (
          <div className='ml-8 cursor-pointer' onClick={() => {
            window.alert("You are not a Premium user Currently. But will Become soon. Contact to get Access");
          }}><Premium/></div>
        )}
        {isPremium && (
          <IconButton
            color={testResults[index] === null ? 'primary' : testResults[index] ? 'success' : 'error'}
            sx={{ ml: 'auto' }}
            onClick={() => handleRunCode(index, 'extra')}
            disabled={extraLoading} // Disable button while code is running
          >
            {extraLoading ? <CircularProgress size={24} color="inherit" /> : <PlayArrow />}
          </IconButton>
        )}
      </AccordionSummary>
      {isPremium && (
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
            value={testCase.output}
            margin="normal"
            disabled
          />
          <Typography variant="subtitle1">Code Output:</Typography>
          <TextField
            fullWidth
            value={testCase.actualOutput || 'Run the code to see output'}
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
      )}
    </Accordion>
  ))}
</Box>

      </Box>
  )}



      {/* Right side: Code Editor and Language Selection */}
      <Box sx={{ flex: isMobile ? 'none' : 2, width: isMobile ? '100%' : 'auto' , minWidth: '50%', maxWidth: '100%',  overflowX: 'hidden',overflowY: 'auto'}}>
        <div className='flex gap-2 content-end'>
        {isMobile ? (
        // If mobile, show the burger button to open drawer
        <IconButton onClick={toggleDrawer} className="m-2">
        <MenuIcon />
      </IconButton>
      ) : (
        <>
        <Button className='m-2 lg:m-4 lg:p-4 w-1/5' variant="contained" color="primary" onClick={openModal}> How to use  </Button>
      {/* <Button className="m-2 lg:m-0" variant="contained" color="primary" onClick={() => setIsFocusMode(!isFocusMode)}>
  {isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
</Button> */}
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


 <div className='m-2 lg:m-0' onClick={handleClickOpen}>
<Button1>
</Button1>
</div>
</>
      )}
<div>
      <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer}>
        <div className="flex flex-col gap-4 p-4">
          <Button variant="contained" color="primary" onClick={toggleDrawer && openModal}>
            How to use
          </Button>
          <Button className="m-2 lg:m-0" variant="contained" color="primary" onClick={() => setIsFocusMode(!isFocusMode)}>
  {isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
</Button>
<div className='m-2 lg:m-0' onClick={handleClickOpen}>
<Button1>
</Button1>
</div>
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
        </div>
      </Drawer>
      </div>



<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  <DialogTitle className="flex justify-between items-center">
    Correct Answer
    <button className="bg-red-500 ml-4 p-0 rounded" onClick={handleClose}>
      <CloseIcon />
    </button>
  </DialogTitle>
  <DialogContent>
    <Typography variant="body1" gutterBottom>
       Here is the accepted solution of the question.
       ({selectedQuestion?.explanation})
    </Typography>
    <div style={{ position: 'relative', marginTop: '16px' }}>
    <Button
        variant="outlined"
        color="secondary"
        size="small"
        style={{ position: 'absolute', top: '8px', right: '24px', zIndex: 1 }}
        onClick={() => {
          navigator.clipboard.writeText(`${selectedQuestion?.solution}`);
          setCopied(true); 
          setTimeout(() => setCopied(false), 3000); 
        }}
        startIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: '20px', height: '20px' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9h6m-6 4h6m-5-9h4.25A2.75 2.75 0 0117 6.75v12.5A2.75 2.75 0 0114.25 22H6.75A2.75 2.75 0 014 19.25V6.75A2.75 2.75 0 016.75 4H8.5M8.5 4V3.5a2 2 0 012-2h3a2 2 0 012 2V4"
            />
          </svg>
        }
      >
        {copied ? 'Copying code is bad habit 🤦' : 'DONT COPY 😠'}
      </Button>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          height: '200px',
          overflowY: 'scroll',
          fontFamily: 'monospace',
          fontSize: '14px',
        }}
      >
        <pre>{selectedQuestion?.solution}</pre>
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
      <Button variant="contained" color="primary">
       TC of solution: {selectedQuestion?.time_complexity}
      </Button>
      <Button variant="contained" color="primary">
        SC of solution: {selectedQuestion?.space_complexity}
      </Button>
    </div>
  </DialogContent>
</Dialog>


      <div className="flex items-center gap-1 lg:gap-3">
    <span className="text-sm text-gray-600 ml-40 lg:ml-48">AI Suggestions</span>
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

{!isLoaded ? (
      <div>loading...</div> // Show a loading indicator while initializing
    ) : (
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
    )}   

<div className="flex items-center text-black rounded-md relative animate-fade-in-out">
  <div className="mr-1">
    <Tick />
  </div>
  <span>Code Saved Locally</span>
</div>


  {/* yeh woh action bar hai  */}
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
      {['{}', '()', '[]', 'if', 'else', 'for','<int>','vector','int','='].map((symbol, idx) => (
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
      <MenuItem value="java">Java</MenuItem>
    </Select>
  </Box>


  {error && (
    <div style={{ marginTop: '16px', color: 'red', whiteSpace: 'pre-line' }}>
        {error}
    </div>
)}
          {/* this issue */}
        {/* Tabs for Test Cases */}
        <Box sx={{ maxWidth: '100%', overflowX: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>
          <br></br>
          <IconButton
  size="small"
  color="error"
  onClick={() => {
    if (testCases.length === 1) {
      window.alert("Sorry Boss ☺️, You cannot delete the last test case present"); // Correct use of window.alert
      return; // Exit the function to prevent further execution
    }
    if (testCases.length > 1) {
      deleteTestCase(testCases.length - 1);
      if (activeTestCase >= testCases.length - 1) {
        setActiveTestCase(Math.max(0, activeTestCase - 1));
      }
    }
  }}
  style={{
    marginLeft: '5px',
    border: '1px solid #f87171', // Add border with color
    borderRadius: '8px', // Optional: Adjust border radius
    padding: '6px', // Optional: Adjust padding inside the button
  }}
>
  <Close />
  <div className="text-sm text-red-500">Delete Last TC</div>
</IconButton>

  <Tabs
    value={activeTestCase}
    onChange={(event, newValue) => setActiveTestCase(newValue)}
    variant="scrollable"
    scrollButtons="auto"
  //   textColor="secondary"
  // indicatorColor="secondary"
    allowScrollButtonsMobile
    aria-label="Test Cases Tabs"
  >
    {testCases.map((_, index) => (
      <Tab label={`TestCase ${index + 1}`} key={index} />
    ))}
    <Button onClick={addTestCase} style={{ marginLeft: '10px', flexShrink: 0 }}> <Add/> Add Test Case</Button>
  </Tabs>
</Box>

         

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
              value={testCases[activeTestCase].output || ""}
              margin="normal"
              onChange={(e) => {
                const updatedTestCases = [...testCases];
                updatedTestCases[activeTestCase].output = e.target.value;
                setTestCases(updatedTestCases);
              }}
            />

            <Typography variant="subtitle1">Code Output:</Typography>
            <TextField
              fullWidth
              value={
                testCases[activeTestCase]?.tle
                  ? "TLE"
                  : testCases[activeTestCase]?.actualOutput || "Run the code to see output"
              }
              margin="normal"
              disabled
            />
             
            {/* Run Button  */}
           <button 
                onClick={() => handleRunCode(activeTestCase,"main")} 
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
    )}
    <Footer/>
    </>
  );
};

export default Upsolve;