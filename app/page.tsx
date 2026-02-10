'use client';

import { useState } from 'react';
import Explainer from '@/components/Explainer';
import Quiz from '@/components/Quiz';
import { motion } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'learn' | 'quiz'>('learn');

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elemnts */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-b-[3rem] shadow-xl z-0" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">
            CBSE Ace <span className="text-yellow-300">Grade 10</span>
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl font-light">
            Your personal AI Tutor for rapid revision.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-8 bg-white/20 backdrop-blur-md p-1 rounded-full w-fit mx-auto shadow-lg">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-8 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'learn'
                  ? 'bg-white text-indigo-600 shadow-md transform scale-105'
                  : 'text-indigo-100 hover:bg-white/10'
                }`}
            >
              Learn Concepts
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-8 py-2 rounded-full font-semibold transition-all duration-300 ${activeTab === 'quiz'
                  ? 'bg-white text-purple-600 shadow-md transform scale-105'
                  : 'text-purple-100 hover:bg-white/10'
                }`}
            >
              Take Quiz
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'learn' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'learn' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'learn' ? <Explainer /> : <Quiz />}
          </motion.div>
        </div>

        <footer className="mt-20 text-center text-gray-500 text-sm">
          <p>Powered by Gemini & Next.js • Built for Success</p>
        </footer>
      </div>
    </main>
  );
}
