import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Modal,
  Card,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import {
  CheckCircle,
  Cancel,
  ExpandMore,
  PlayArrow,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import MonacoEditor from '@monaco-editor/react';
import debounce from 'lodash.debounce';
import './Upsolve.css';
import questions from '../data/question.json';
import Footer from './Footer';
import Header from './Header';
import Loader2 from './Loader2';
import Button1 from './Button1';
import Tick from '../Utils/Tick';
import HowTouseModal from '../Utils/HowtouseModal';
import HowTouseModal1 from '../Utils/HowtouseModal1';
import BurgerButton from '../Utils/BurgerButton';
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
}`,
};

const mocktc = [
  { input: '2 3', output: '5' },
  { input: '4 6', output: '10' },
];

const Upsolve = () => {

  const { id } = useParams();
  const selectedQuestion = questions.find((q) => q.id === parseInt(id));

  // state here
  const [code, setCode] = useState(boilerplate.cpp);
  const [testCases, setTestCases] = useState(selectedQuestion?.testCases);
  const [activeTestCase, setActiveTestCase] = useState(0);
  const [testResults, setTestResults] = useState(Array(testCases.length).fill(null));
  const [extraTestCases, setExtraTestCases] = useState(
    selectedQuestion.extraTestCases.map((testCase) => ({
      ...testCase,
      actualOutput: '',
    }))
  );
  const [loading, setLoading] = useState(false);
  const [extraLoading, setExtraLoading] = useState(false);
  const [language, setLanguage] = useState('cpp');
  const [error, setError] = useState('');
  const [solved, setSolved] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);
  const [suggestion, setSuggestion] = useState('');
  const [inlineSuggestion, setInlineSuggestion] = useState('');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLOADING, SetIsLOADING] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showTopics, setShowTopics] = useState(false);
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [mocktcsolved, setMocktcsolved] = useState();
  const [openModal1, setopenmodal1] = useState(false);
  const [mockresults, setmockResults] = useState([]);
  const [successCount, setSuccessCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // handlers
  const handleRunCode = async (index, caseSet = 'main') => {
    setError('');
    const selectedTestCases = caseSet === 'extra' ? extraTestCases : testCases;
    caseSet === 'extra' ? setExtraLoading(true) : setLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('https://codex-api-hsd8.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          input: selectedTestCases[index].input,
          language: language,
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
        const actualOutput = data.output.trim();
        updatedTestCases[index].actualOutput = actualOutput;
        updatedTestCases[index].tle = false;
        if (caseSet === 'main') {
          setTestCases(updatedTestCases);
        } else {
          setExtraTestCases(updatedTestCases);
        }
        updatedResults[index] = actualOutput === selectedTestCases[index].output;
        setTestResults(updatedResults);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        const updatedTestCases = [...selectedTestCases];
        updatedTestCases[index].tle = true;
        caseSet === 'main' ? setTestCases(updatedTestCases) : setExtraTestCases(updatedTestCases);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      caseSet === 'extra' ? setExtraLoading(false) : setLoading(false);
    }
  };

  const handleRunCode1 = async (index) => {
    setError('');
    try {
      const response = await fetch('https://codex-api-hsd8.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          input: mocktc[index].input,
          language: language,
        }),
      });
      const data = await response.json();
      if (data.error) setError(data.error);
      else setError('');
      return data.output.trim() === mocktc[index].output.trim();
    } catch {
      return false;
    }
  };

  const handleCodeChange = (e) => setCode(e.target.value);

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

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', actualOutput: '' }]);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    if (
      window.confirm(
        'Smart, knows to code in different languages. Changing the language will remove your current code. Do you want to proceed?'
      )
    ) {
      setLanguage(newLanguage);
      setCode(boilerplate[newLanguage]);
    }
  };

  const deleteTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    const newActiveIndex = index === activeTestCase ? Math.max(0, activeTestCase - 1) : activeTestCase;
    setTestCases(updatedTestCases);
    setActiveTestCase(newActiveIndex);
  };

  // EFFECTS here
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('savedCodes')) || {};
    if (selectedQuestion?.id && savedData[selectedQuestion.id]) {
      setCode(savedData[selectedQuestion.id]);
    } else {
      setCode(boilerplate.cpp);
    }
    const savedLanguage = localStorage.getItem('savedLanguage');
    setLanguage(savedLanguage || 'cpp');
    setIsLoaded(true);
  }, [selectedQuestion?.id]);

  useEffect(() => {
    if (isLoaded && selectedQuestion?.id) {
      const savedData = JSON.parse(localStorage.getItem('savedCodes')) || {};
      savedData[selectedQuestion.id] = code;
      localStorage.setItem('savedCodes', JSON.stringify(savedData));
      localStorage.setItem('savedLanguage', language);
    }
  }, [code, language, selectedQuestion?.id, isLoaded]);

  useEffect(() => {
    SetIsLOADING(false);
  }, []);

  // modals handler here
  const handleClickOpen = () => {
    setOpen(true);
    document.getElementById('main-content').classList.add('blur-sm');
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById('main-content').classList.remove('blur-sm');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // editor here
  const generateCodeFromGemini = useCallback(
    debounce(async (currentCode) => {
      setCode(currentCode);
      try {
        const response = await fetch(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAL0n5l4b8ih9WBFELTt9n0Ewro2DlMsDY',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
          const generatedText = data.candidates[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            appendInlineSuggestion(generatedText.trim(), currentCode);
          }
        }
      } catch {}
    }, 500),
    []
  );

  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleEditorChange = async (value, event) => {
    setCode(value);
    if (aiSuggestionsEnabled && event.changes[0].text === ';') {
      generateCodeFromGemini(value);
    }
  };

  const appendInlineSuggestion = (suggestion, t) => {
    const editor = editorRef.current;
    const position = editor?.getPosition();
    const newCode = suggestion;
    setCode(newCode);
    editor.setValue(newCode);
    editor.setPosition(position);
  };

  //UI starts here
  const insertText = (symbol) => {
    if (!editorRef.current || !monacoRef.current) return;
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
    editor.setPosition({
      lineNumber: position.lineNumber,
      column: position.column + symbol.length,
    });
    editor.focus();
  };

  const toggleAiSuggestions = () => setAiSuggestionsEnabled((prev) => !prev);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTopicsVisibility = () => setShowTopics(!showTopics);

  const handlePrevSolution = () => {
    if (solutionIndex > 0) setSolutionIndex(solutionIndex - 1);
  };

  const handleNextSolution = () => {
    if (selectedQuestion?.solution && solutionIndex < selectedQuestion.solution.length - 1) {
      setSolutionIndex(solutionIndex + 1);
    }
  };

  const handleRunMockTestCases = async () => {
    const tempResults = [];
    let successCounter = 0;
    for (let i = 0; i < mocktc.length; i++) {
      const isCorrect = await handleRunCode1(i);
      tempResults.push(isCorrect ? 'success' : 'failure');
      if (isCorrect) successCounter += 1;
      setMocktcsolved(tempResults);
      setSuccessCount(successCounter);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setmockResults(tempResults);
  };

  const handleSubmit = () => {
    setopenmodal1(true);
    setMocktcsolved([]);
    handleRunMockTestCases();
  };

  return (
    <>
      <Header />
      {isLOADING ? (
        <div className="flex items-center justify-center">
          <Loader2 />
        </div>
      ) : (
        <Box
          id="main-content"
          sx={{
            p: isMobile ? '10px' : '20px',
            display: isFocusMode ? 'block' : 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Left Section */}
          <HowTouseModal />
          <HowTouseModal1 isModalOpen={isModalOpen} closeModal={closeModal} />
          {!isFocusMode && (
            <Box
              sx={{
                mb: '20px',
                p: '20px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
                flex: isMobile ? 'none' : 1,
                maxWidth: isMobile ? '100%' : '50%',
                maxHeight: '165vh',
                overflowY: 'auto',
              }}
            >
              {/* Question Metadata */}
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, backgroundImage: 'linear-gradient(to right, #007BFF, #20c997)', backgroundClip: 'text', textFillColor: 'transparent' }}>
                {selectedQuestion?.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: '#555', mb: 1 }}>
                Rating: {selectedQuestion?.rating}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#555' }}>
                Difficulty: <b>{selectedQuestion?.difficulty}</b>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#555', display: 'flex', alignItems: 'center' }}>
                Topics:
                {showTopics ? (
                  <b style={{ marginLeft: '8px' }}>{selectedQuestion?.topics.join(', ')}</b>
                ) : (
                  <b style={{ marginLeft: '8px', color: '#555' }}>Hidden</b>
                )}
                <IconButton onClick={toggleTopicsVisibility} sx={{ marginLeft: '10px', color: 'gray' }}>
                  {showTopics ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3, color: '#555' }}>
                Company: <b>{selectedQuestion?.company}</b>
              </Typography>
              {/* Description */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                  Description:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#555', lineHeight: '1.6' }}>
                  {selectedQuestion?.question_description}
                </Typography>
              </Box>
              {/* Function Description */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                  Function Description:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#555', lineHeight: '1.6' }}>
                  {selectedQuestion?.function_description}
                </Typography>
              </Box>
              {/* Input Format */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                  Input Format:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#555', lineHeight: '1.6' }}>
                  {selectedQuestion?.input_format}
                </Typography>
              </Box>
              {/* Output Format */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                  Output Format:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#555', lineHeight: '1.6' }}>
                  {selectedQuestion?.output_format}
                </Typography>
              </Box>
              {/* Solved Indicator */}
              {solved && (
                <Typography variant="body2" sx={{ ml: 1, fontSize: '0.9em', color: 'green', fontWeight: 'bold' }}>
                  ✔️ Solved
                </Typography>
              )}
              {/* Examples */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                  Examples:
                </Typography>
                {selectedQuestion?.examples.map((example, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: '10px',
                      mb: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: '#fff',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      <b>Input:</b> {example.input}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      <b>Output:</b> {example.output}
                    </Typography>
                    {example.explanation && (
                      <Typography variant="body2" sx={{ color: '#555', whiteSpace: 'pre-wrap' }}>
                        <b>Explanation:</b> {example.explanation}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
              {/* Constraints */}
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold', color: '#333' }}>
                  Constraints:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#555', lineHeight: '1.6' }}>
                  {selectedQuestion?.constraints}
                </Typography>
              </Box>
              <br />
              {/* Extra Test Cases */}
              <Box flex={1}>
                <Typography variant="h6">Extra Test Cases</Typography>
                {selectedQuestion.extraTestCases.map((testCase, index) => (
                  <Accordion key={index}>
                    <AccordionSummary expandIcon={isPremium ? <ExpandMore /> : null}>
                      <Typography>Test Case {index + 1}</Typography>
                      {!isPremium && (
                        <div
                          className="ml-8 cursor-pointer"
                          onClick={() => {
                            window.alert('You are not a Premium user Currently. But will Become soon. Contact to get Access');
                          }}
                        >
                          <Premium />
                        </div>
                      )}
                      {isPremium && (
                        <IconButton
                          color={testResults[index] === null ? 'primary' : testResults[index] ? 'success' : 'error'}
                          sx={{ ml: 'auto' }}
                          onClick={() => handleRunCode(index, 'extra')}
                          disabled={extraLoading}
                        >
                          {extraLoading ? <CircularProgress size={24} color="inherit" /> : <PlayArrow />}
                        </IconButton>
                      )}
                    </AccordionSummary>
                    {isPremium && (
                      <AccordionDetails>
                        <Typography variant="subtitle1">Input:</Typography>
                        <TextField fullWidth value={testCase.input} margin="normal" disabled />
                        <Typography variant="subtitle1">Expected Output:</Typography>
                        <TextField fullWidth value={testCase.output} margin="normal" disabled />
                        <Typography variant="subtitle1">Code Output:</Typography>
                        <TextField
                          fullWidth
                          value={testCase.actualOutput || 'Run the code to see output'}
                          margin="normal"
                          disabled
                        />
                        <Box mt={2}>
                          {testResults[index] === true && <CheckCircle style={{ color: 'green' }} />}
                          {testResults[index] === false && <Cancel style={{ color: 'red' }} />}
                        </Box>
                      </AccordionDetails>
                    )}
                  </Accordion>
                ))}
              </Box>
            </Box>
          )}

          {/* Right Section: Code Editor and Controls */}
          <Box
            sx={{
              flex: isMobile ? 'none' : 2,
              width: isMobile ? '100%' : 'auto',
              minWidth: '50%',
              maxWidth: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            <div className="flex gap-2 content-end">
              {isMobile ? (
                <IconButton onClick={toggleDrawer} className="m-2">
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
                  <Button className="m-2 lg:m-4 lg:p-4 w-1/5" variant="contained" color="primary" onClick={openModal}>
                    How to use
                  </Button>
                  <button className="custom-button" onClick={handleSaveCode}>
                    <span className="button-text">Save Code</span>
                    <span className="button-icon">
                      {/* SVG ICON */}
                    </span>
                  </button>
                  <div className="m-2 lg:m-0" onClick={handleClickOpen}>
                    <Button1 />
                  </div>
                </>
              )}
              <div>
                <Drawer anchor="top" open={isDrawerOpen} onClose={toggleDrawer}>
                  <div className="flex flex-col gap-4 p-4">
                    <Button variant="contained" color="primary" onClick={toggleDrawer && openModal}>
                      How to use
                    </Button>
                    <Button
                      className="m-2 lg:m-0"
                      variant="contained"
                      color="primary"
                      onClick={() => setIsFocusMode(!isFocusMode)}
                    >
                      {isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
                    </Button>
                    <div className="m-2 lg:m-0" onClick={handleClickOpen}>
                      <Button1 />
                    </div>
                    <button className="custom-button" onClick={handleSaveCode}>
                      <span className="button-text">Save Code</span>
                      <span className="button-icon">
                        {/* SVG ICON */}
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
                  <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    Here is the accepted solution of the question.
                    <br />
                    {selectedQuestion?.explanation}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                    <IconButton onClick={handlePrevSolution} disabled={solutionIndex === 0} color="primary">
                      <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="body2" style={{ fontStyle: 'italic' }}>
                      Solution {solutionIndex + 1} of {selectedQuestion?.solution?.length || 0}
                    </Typography>
                    <IconButton
                      onClick={handleNextSolution}
                      disabled={solutionIndex === (selectedQuestion?.solution?.length || 1) - 1}
                      color="primary"
                    >
                      <ArrowForwardIosIcon />
                    </IconButton>
                  </div>
                  <div style={{ position: 'relative', marginTop: '16px' }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      style={{ position: 'absolute', top: '8px', right: '24px', zIndex: 1 }}
                      onClick={() => {
                        navigator.clipboard.writeText(selectedQuestion?.solution?.[solutionIndex]);
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
                          {/* SVG PATHS */}
                        </svg>
                      }
                    >
                      {copied ? 'Copied!' : 'DONT COPY 😠'}
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
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      <pre>{selectedQuestion?.solution?.[solutionIndex]}</pre>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        padding: '12px 24px',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.target.innerText = `${selectedQuestion?.time_complexity}`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.innerText = 'TC';
                      }}
                    >
                      TC
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease-in-out',
                        padding: '12px 24px',
                        color: '#fff',
                        borderRadius: '8px',
                      }}
                      onMouseEnter={(e) => {
                        e.target.innerText = `${selectedQuestion?.space_complexity}`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.innerText = 'SC';
                      }}
                    >
                      SC
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
              <div>loading...</div>
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
            {/* Action Bar */}
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
              {['{}', '()', '[]', 'if', 'else', 'for', '<int>', 'vector', 'int', '='].map((symbol, idx) => (
                <Button key={idx} variant="text" size="small" onClick={() => insertText(symbol, code)}>
                  {symbol}
                </Button>
              ))}
            </Box>
            {/* Language bar */}
            <Box mt={3}>
              <Select value={language} onChange={handleLanguageChange} fullWidth>
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </Box>
            {error && (
              <div style={{ marginTop: '16px', color: 'red', whiteSpace: 'pre-line' }}>{error}</div>
            )}
            {/* Tabs for Test Cases */}
            <Box sx={{ maxWidth: '100%', overflowX: 'auto', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <br />
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  if (testCases.length === 1) {
                    window.alert('Sorry ☺️, You cannot delete the last test case present');
                    return;
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
                  border: '1px solid #f87171',
                  borderRadius: '8px',
                  padding: '6px',
                }}
              >
                <CloseIcon />
                <div className="text-sm text-red-500">Delete Last TC</div>
              </IconButton>
              <Tabs
                value={activeTestCase}
                onChange={(event, newValue) => setActiveTestCase(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="Test Cases Tabs"
              >
                {testCases.map((_, index) => (
                  <Tab label={`TestCase ${index + 1}`} key={index} />
                ))}
                <Button onClick={addTestCase} style={{ marginLeft: '10px', flexShrink: 0 }}>
                  <Add /> Add Test Case
                </Button>
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
                value={testCases[activeTestCase].output || ''}
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
                    ? 'TLE'
                    : testCases[activeTestCase]?.actualOutput || 'Run the code to see output'
                }
                margin="normal"
                disabled
              />
              {/* Run Button */}
              <button
                onClick={() => handleRunCode(activeTestCase, 'main')}
                className="relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50 overflow-hidden h-12 w-48 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold"
                disabled={loading}
              >
                <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
                <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
                <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
                <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
                <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
                <p className="z-10">{loading ? <CircularProgress size={24} color="inherit" /> : 'Run'}</p>
              </button>
              <Modal open={openModal1} onClose={() => setopenmodal1(false)}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    p: 4,
                  }}
                >
                  <Card
                    sx={{
                      width: '80%',
                      maxHeight: '80vh',
                      overflowY: 'auto',
                      p: 2,
                      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                      Test Cases
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', py: 2, px: 1 }}>
                      {mocktc.map((tc, index) => (
                        <Box
                          key={index}
                          sx={{
                            minWidth: '200px',
                            p: 2,
                            textAlign: 'center',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            backgroundColor:
                              mockresults[index] === 'success'
                                ? 'green'
                                : mockresults[index] === 'failure'
                                ? 'red'
                                : '#f5f5f5',
                            flexShrink: 0,
                            color:
                              mockresults[index] === 'success' || mockresults[index] === 'failure'
                                ? 'white'
                                : 'black',
                          }}
                        >
                          <Typography variant="body1" fontWeight="bold">
                            Test Case {index + 1}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 4,
                        textAlign: 'center',
                        color: successCount === mocktc.length ? 'green' : 'red',
                      }}
                    >
                      {successCount}/{mocktc.length} Test Cases Passed
                    </Typography>
                  </Card>
                </Box>
              </Modal>
              <Box mt={2}>
                {testResults[activeTestCase] === true && <CheckCircle style={{ color: 'green' }} />}
                {testResults[activeTestCase] === false && <Cancel style={{ color: 'red' }} />}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <Footer />
    </>
  );
};

export default Upsolve;
