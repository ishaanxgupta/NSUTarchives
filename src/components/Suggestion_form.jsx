import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const SuggestionForm = () => {
  const [state, handleSubmit, reset] = useForm("mnnqjlda");

  const handleNewSuggestion = () => {
    reset();
  };

  return (
    <div className=" py-16 flex justify-start pl-64"> {/* Add padding-left here for spacing */}
  <div className="bg-teal-600 border border-slate-700 rounded-xl p-4 text-sm w-96">
    {state.succeeded ? (
      <div className="text-center text-green-500">
        <p className="font-semibold">Thanks for your suggestion!</p>
        <button
          onClick={handleNewSuggestion}
          className="mt-4 stroke-slate-300 bg-slate-700 focus:stroke-blue-200 focus:bg-blue-600 border border-slate-600 hover:border-slate-300 rounded-lg p-2 duration-300 flex justify-center items-center"
        >
          <span>Send Another Suggestion</span>
        </button>
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-2">
        <h1 className="text-center text-white text-xl font-bold col-span-6">Send Feedback</h1>
        
        <label htmlFor="name" className="sr-only">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          className="bg-teal-900 text-teal-300 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-6 outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
          placeholder="Your name..."
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />

        <label htmlFor="email" className="sr-only">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          className="bg-teal-900 text-teal-300 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-6 outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
          placeholder="Your email..."
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />

        <label htmlFor="message" className="sr-only">Suggestion</label>
        <textarea
          id="message"
          name="message"
          className="bg-teal-900 text-teal-300 placeholder:text-slate-300 placeholder:opacity-50 border border-slate-600 col-span-6 h-28 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-300"
          placeholder="Your suggestion..."
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />

        <button
          type="submit"
          disabled={state.submitting}
          className="col-span-6 stroke-slate-300 bg-teal-900 focus:stroke-blue-200 focus:bg-blue-600 border border-slate-600 hover:border-slate-300 rounded-lg p-2 duration-300 flex justify-center items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7.4 6.32L15.89 3.49C19.7 2.22 21.77 4.3 20.51 8.11L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.92 14.08L7.4 13.24C1.69 11.34 1.69 8.23 7.4 6.32Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M10.11 13.65L13.69 10.06" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span className="ml-2 text-white">Send</span>
        </button>
      </form>
    )}
  </div>
</div>


  );
};

export default SuggestionForm;
