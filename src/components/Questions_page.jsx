import React, { useState, useEffect } from 'react';
import questionsData from '../data/question.json';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Questions.css';

const Questions_page = () => {
    const [questions, setQuestions] = useState([]);
    const [filters, setFilters] = useState({
        rating: 'All',
        difficulty: 'All',
        topic: 'All',
        search: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        setQuestions(questionsData); // Ensure you have questionsData defined
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredQuestions = questions.filter((question) => {
        return (
            (filters.rating === 'All' || question.rating >= parseFloat(filters.rating)) &&
            (filters.difficulty === 'All' || question.difficulty === filters.difficulty) &&
            (filters.topic === 'All' || question.topics.includes(filters.topic)) &&
            (filters.search === '' || question.name.toLowerCase().includes(filters.search.toLowerCase()))
        );
    });

    const handleSolve = (questionID) => {
        navigate(`/upsolve/${questionID}`);
    };

    return (
        <div className="container flex">
            <div className="left-panel flex flex-col w-1/2 p-4">
                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search by name"
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>

                {/* Topic Tabs */}
                <div className="mb-4 flex space-x-2">
                    {['All', 'Array', 'Hash Table', 'Dynamic Programming', 'Trees', 'Math'].map((topic) => (
                        <button
                            key={topic}
                            className={`py-2 px-4 rounded ${filters.topic === topic ? 'bg-teal-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            onClick={() => setFilters({ ...filters, topic })}
                        >
                            {topic}
                        </button>
                    ))}
                </div>

                {/* Difficulty Select */}
                <div className="mb-4">
                    <div className="flex border-[2px] border-grey-400 rounded-xl select-none">
                        {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                            <label key={level} className="radio flex  items-center justify-center rounded-lg p-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value={level}
                                    className="peer hidden"
                                    checked={filters.difficulty === level}
                                    onChange={handleFilterChange}
                                />
                                <span
                                    className={`tracking-widest peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-teal-700 peer-checked:text-white text-white p-2 rounded-lg transition duration-150 ease-in-out`}
                                >
                                    {level}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Select */}
                <div className="mb-4">
                    <FormControl variant="outlined" className="min-w-[120px] w-full">
                        <InputLabel id="rating-label">Rating</InputLabel>
                        <Select
                            labelId="rating-label"
                            name="rating"
                            value={filters.rating}
                            onChange={handleFilterChange}
                            label="Rating"
                            className="border border-gray-300"
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="800">800</MenuItem>
                            <MenuItem value="1000">1000</MenuItem>
                            <MenuItem value="1200">1200</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Questions List */}
                <div className="question-list mt-4">
                    {filteredQuestions.map((question) => (
                        <div key={question.id} className="card1 mb-2 p-4 border border-gray-300 rounded shadow">
                            <h3 className="font-bold">{question.name}</h3>
                            <p className="small">Topics: {question.topics.join(', ')}</p>
                            <p className="small">Difficulty: {question.difficulty}</p>
                            <p className="small">Rating: {question.rating}</p>
                            <div className="go-corner cursor-pointer" onClick={() => handleSolve(question.id)}>
                                <div className="go-arrow">→</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="right-panel">
                <img src="/Coding1.png" alt="Coding illustration" className="w-2/3 h-auto" />
            </div>
        </div>
    );
};

export default Questions_page;