'use client';

import { useState } from 'react';
import { generateQuiz } from '@/app/actions';
import { Button, Card, CardContent } from '@/components/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, BrainCircuit, RefreshCw } from 'lucide-react';

interface Question {
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

export default function Quiz() {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const startQuiz = async () => {
        if (!topic) return;
        setLoading(true);
        setQuestions([]);
        setCurrentIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);

        try {
            const data = await generateQuiz(topic);
            if (Array.isArray(data) && data.length > 0) {
                setQuestions(data);
            } else {
                alert('Could not generate quiz. Try again.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionSelect = (option: string) => {
        if (selectedOption !== null) return; // Prevent changing answer
        setSelectedOption(option);

        if (option === questions[currentIndex].answer) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(i => i + 1);
            setSelectedOption(null);
            setShowResult(false);
        } else {
            setShowResult(true);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-purple-100">
            <CardContent className="p-6">
                <div className="flex items-center space-x-2 text-purple-600 mb-6">
                    <BrainCircuit className="w-6 h-6" />
                    <h2 className="text-xl font-bold">Concept Master Quiz</h2>
                </div>

                {questions.length === 0 ? (
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter topic for quiz (e.g., 'Carbon Compounds')"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                                onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
                            />
                            <Button
                                onClick={startQuiz}
                                disabled={loading || !topic}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Start Quiz'}
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500">
                            Generating a quiz might take a few seconds. The AI creates fresh questions every time!
                        </p>
                    </div>
                ) : showResult ? (
                    <div className="text-center space-y-6 py-8">
                        <h3 className="text-2xl font-bold text-gray-800">Quiz Completed!</h3>
                        <div className="text-6xl font-black text-purple-600 mb-4">
                            {Math.round((score / questions.length) * 100)}%
                        </div>
                        <p className="text-gray-600">
                            You got <span className="font-bold text-gray-900">{score}</span> out of <span className="font-bold text-gray-900">{questions.length}</span> correct.
                        </p>
                        <Button onClick={() => setQuestions([])} className="bg-gray-800 hover:bg-gray-900">
                            Try Another Topic
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between text-sm text-gray-500 font-medium">
                            <span>Question {currentIndex + 1} of {questions.length}</span>
                            <span>Score: {score}</span>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900">
                            {questions[currentIndex].question}
                        </h3>

                        <div className="space-y-3">
                            {questions[currentIndex].options.map((option, idx) => {
                                const isSelected = selectedOption === option;
                                const isCorrect = option === questions[currentIndex].answer;
                                const showCorrect = selectedOption !== null && isCorrect;
                                const showWrong = isSelected && !isCorrect;

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={selectedOption !== null}
                                        className={cn(
                                            "w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center justify-between",
                                            selectedOption === null && "hover:bg-gray-50 hover:border-purple-300",
                                            showCorrect && "bg-green-50 border-green-500 text-green-900",
                                            showWrong && "bg-red-50 border-red-500 text-red-900",
                                            selectedOption !== null && !showCorrect && !showWrong && "opacity-50"
                                        )}
                                    >
                                        <span>{option}</span>
                                        {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                                        {showWrong && <XCircle className="w-5 h-5 text-red-600" />}
                                    </button>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {selectedOption && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800"
                                >
                                    <span className="font-bold block mb-1">Explanation:</span>
                                    {questions[currentIndex].explanation}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {selectedOption && (
                            <div className="flex justify-end pt-4">
                                <Button onClick={nextQuestion} className="bg-purple-600 hover:bg-purple-700">
                                    {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
