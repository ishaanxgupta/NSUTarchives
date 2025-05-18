
import React, { useState, useEffect } from 'react';
import { Search, Code2, Filter, Brain, Building2, Target, Clock, Zap, Sparkles, X } from 'lucide-react';
import questionsData from '../data/question.json';
import Header from  "./Header";
import Footer from './Footer';
import Loader1 from './Loader1';
import Loader from './Loader';
import {useNavigate} from 'react-router-dom';
import CustomSearchComponent from '../Utils/CustomSearchComponent';
import ReactPaginate from "react-paginate";


const topics = ["Array", "Tree", "Linked Lists", "DP","Greedy", "Graphs", "Strings", "Maths", "Two Pointers", "Combinatorics","Hash Table","Binary Search"];
const companies = ["Microsoft", "Goldman Sachs", "Placewit", "Twilio", "Morgan Stanley","Uber","Expedia","IBM","Estee Advisory","Atlassian","LinkedIn"];

function Questions_page() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1,setIsLoading1] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after data "loads"
    }, 1000); // Simulated delay (1.5 seconds)

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);


  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    }; 

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

    const filteredQuestions = questionsData.filter(q => {
    const matchesDifficulty = !selectedDifficulty || q.difficulty === selectedDifficulty;
    const matchesTopic = !selectedTopic || q.topics.includes(selectedTopic);
    const matchesCompany = !selectedCompany || q.company === selectedCompany;
    const matchesSearch = !searchQuery || q.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesTopic && matchesCompany && matchesSearch;
  });

  const handleQuestionClick = (questionId) => {
    navigate(`/upsolve/${questionId}`);
  };


  const questionsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };


  const offset = currentPage * questionsPerPage;
  const currentQuestions = filteredQuestions.slice(
    offset,
    offset + questionsPerPage
  );


  return (
    <>
    <Header />
    <div className="min-h-screen relative overflow-hidden bg-[#0a192f]">
        {/* Loader Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loader /> {/* Display loader when isLoading is true */}
          </div>
        ) : (
          <>  
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(45, 212, 191, 0.15) 0%, rgba(45, 212, 191, 0) 50%)`
        }}
      >
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGMzLjE4IDAgNi4xNzUtLjgyNCA4Ljc3MS0yLjI3MSAyLjU5Ni0xLjQ0NyA0Ljc4OS0zLjQ0IDYuMjI5LTUuODI5IiBzdHJva2U9InJnYmEoNDUsIDIxMiwgMTkxLCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a192f]/80"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, rgba(45, 212, 191, 0) 70%)`,
              animation: `pulse ${Math.random() * 3 + 2}s infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white flex items-center gap-3 mb-2">
              <Code2 className="w-8 h-8 md:w-12 md:h-12 text-teal-400" />
              CrackIT
            </h1>
            <p className="text-gray-400">Master algorithms, one problem at a time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full md:w-72 px-4 py-3 pl-12 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              {/* <CustomSearchComponent /> */}
            </div>
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="md:hidden px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-xl text-white"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Filters */}
          <div className="md:col-span-3">
            <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block fixed md:relative top-0 left-0 w-full md:w-auto h-full md:h-auto z-50 bg-[#0a192f] md:bg-transparent overflow-auto md:overflow-visible p-4 md:p-0`}>
              <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
                <div className="flex items-center justify-between mb-4 mt-8 lg:mt-0">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5 text-teal-400" /> Filters
                  </h3>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="md:hidden text-gray-400 hover:text-white transition-colors mt-16px"
                  >
                    <X className="w-5 h-5 " />
                  </button>
                </div>

                <div className="mb-8">
                  <h4 className="text-gray-400 text-sm mb-3">Difficulty Level</h4>
                  <div className="space-y-3">
                    {['Easy', 'Medium', 'Hard'].map((difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty === selectedDifficulty ? '' : difficulty)}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-between transition-all ${
                          selectedDifficulty === difficulty
                            ? difficulty === 'Easy' 
                              ? 'bg-green-500/20 text-green-400 border-green-500/50'
                              : difficulty === 'Medium'
                              ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
                              : 'bg-red-500/20 text-red-400 border-red-500/50'
                            : 'bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
                        } border`}
                      >
                        {difficulty}
                        <Target className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-gray-400 text-sm mb-3">Topics</h4>
                  <div className="space-y-2">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setSelectedTopic(topic === selectedTopic ? '' : topic)}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-between transition-all ${
                          selectedTopic === topic
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/50'
                            : 'bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
                        } border`}
                      >
                        {topic}
                        <Brain className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-gray-400 text-sm mb-3">Companies</h4>
                  <div className="space-y-2">
                    {companies.map((company) => (
                      <button
                        key={company}
                        onClick={() => setSelectedCompany(company === selectedCompany ? '' : company)}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-between transition-all ${
                          selectedCompany === company
                            ? 'bg-purple-500/20 text-purple-400 border-purple-500/50'
                            : 'bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
                        } border`}
                      >
                        {company}
                        <Building2 className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="md:col-span-9">
          {isLoading ? (
                // Loader component is displayed when loading
                <div className="flex justify-center items-center py-12">
                  <Loader1 />
                </div>
              ) : (
            <div className="space-y-4">
              {currentQuestions.length > 0 ? (
                currentQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionClick(question.id)}
                    className="w-full text-left bg-gray-800/50 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-gray-700/50 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-teal-400/10 group"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:items-center mb-4">
                      <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">
                        {question.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        question.difficulty === 'Easy'
                          ? 'bg-green-500/20 text-green-400'
                          : question.difficulty === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-4">
  
                      <div className="flex items-center gap-2 text-gray-400">
                        <Brain className="w-4 h-4" />
                        <span>{question.topics.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <Building2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <div className="flex flex-wrap gap-2">
                            <span
                              className="px-2 py-1 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400"
                            >
                              {question.company}
                            </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-400" />
                        <span className="text-teal-400">{question.rating}</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
                    <p className="text-gray-400">
                      {searchQuery 
                        ? `No results found for "${searchQuery}"`
                        : 'No questions match the selected filters'}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDifficulty('');
                        setSelectedTopic('');
                        setSelectedCompany('');
                      }}
                      className="mt-4 px-4 py-2 bg-teal-400/20 text-teal-400 rounded-lg hover:bg-teal-400/30 transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
              <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredQuestions.length / questionsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-4 space-x-2"
            pageClassName="px-4 py-2 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-teal-500"
            previousClassName="px-4 py-2 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-teal-500"
            nextClassName="px-4 py-2 rounded-lg bg-gray-700 text-white cursor-pointer hover:bg-teal-500"
            disabledClassName="opacity-50 cursor-not-allowed"
            activeClassName="bg-teal-500 text-white"
          />
            </div>
              )}
          </div>
        </div>
      </div>
      </>
        )}
    </div>
    <Footer/>
    </>
  );
}

export default Questions_page;