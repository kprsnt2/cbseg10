'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2, Zap } from 'lucide-react';
import { QuickQuestion, quickReviewQuestions } from '@/lib/paper-data';

interface QuickReviewProps {
    subject: string;
    lang: 'en' | 'te';
}

export default function QuickReview({ subject, lang }: QuickReviewProps) {
    const filteredQuestions = quickReviewQuestions.filter(q => q.subjectId === subject);
    const [expandedIds, setExpandedIds] = useState<string[]>([]);

    const toggleQuestion = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
        );
    };

    if (filteredQuestions.length === 0) {
        return (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40">
                <Zap className="w-16 h-16 mx-auto text-yellow-500/50 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">
                    {lang === 'en' ? 'No quick review items' : 'సమీక్షా అంశాలు లేవు'}
                </h3>
                <p className="text-gray-500 mt-2">
                    {lang === 'en'
                        ? 'Check back later for important questions!'
                        : 'ముఖ్యమైన ప్రశ్నల కోసం తర్వాత తనిఖీ చేయండి!'}
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
                <Zap className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold text-amber-800">
                        {lang === 'en' ? 'Quick Review Mode' : 'త్వరిత సమీక్ష మోడ్'}
                    </h4>
                    <p className="text-sm text-amber-700 mt-1">
                        {lang === 'en'
                            ? 'These are high-frequency questions from previous years. Try to answer them before expanding!'
                            : 'ఇవి గత సంవత్సరాల నుండి ఎక్కువగా అడిగే ప్రశ్నలు. విస్తరించడానికి ముందు సమాధానం చెప్పడానికి ప్రయత్నించండి!'}
                    </p>
                </div>
            </div>

            {filteredQuestions.map((q, index) => (
                <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${expandedIds.includes(q.id) ? 'shadow-md border-indigo-100' : 'shadow-sm border-slate-100 hover:border-indigo-100'
                        }`}
                >
                    <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full text-left p-5 flex items-start gap-4"
                    >
                        <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${expandedIds.includes(q.id) ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'
                            }`}>
                            <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-slate-800 text-lg leading-snug">
                                {q.question}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {q.tags?.map(tag => (
                                    <span key={tag} className="text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md">
                                        {tag}
                                    </span>
                                ))}
                                {q.examFrequency && (
                                    <span className="text-xs font-medium px-2 py-0.5 bg-green-50 text-green-600 rounded-md flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> {q.examFrequency}
                                    </span>
                                )}
                            </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedIds.includes(q.id) ? 'rotate-180' : ''
                            }`} />
                    </button>

                    <AnimatePresence>
                        {expandedIds.includes(q.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-50/50 border-t border-slate-100 px-5 py-4 pl-14"
                            >
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-slate-700 leading-relaxed font-medium">
                                        {q.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}
