'use client';

import { useState } from 'react';
// import { readStreamableValue } from 'ai/rsc';
import { explainTopic } from '@/app/actions';
import { Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, BookOpen } from 'lucide-react';

export default function Explainer() {
    const [topic, setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [simplify, setSimplify] = useState(false);

    const handleExplain = async () => {
        if (!topic) return;
        setLoading(true);
        setExplanation('');

        try {
            const text = await explainTopic(topic, simplify);
            setExplanation(text || "No explanation generated.");
        } catch (error) {
            console.error(error);
            setExplanation("Sorry, I couldn't generate an explanation right now.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg border-indigo-100">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-indigo-600 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <h2 className="text-xl font-bold">Concept Explainer</h2>
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter a connection (e.g., 'Ohm's Law' or 'Photosynthesis')"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleExplain()}
                    />
                    <Button onClick={handleExplain} disabled={loading || !topic} className="min-w-[100px]">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Explain'}
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="simplify"
                        checked={simplify}
                        onChange={(e) => setSimplify(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="simplify" className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer select-none">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        Explain like I'm 5
                    </label>
                </div>

                {explanation && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 prose prose-indigo max-w-none bg-indigo-50/50 p-4 rounded-lg border border-indigo-100"
                    >
                        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                            {explanation}
                        </div>
                    </motion.div>
                )}
            </CardContent>
        </Card>
    );
}
