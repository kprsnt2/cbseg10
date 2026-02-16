'use client';

import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Paper, previousYearsPapers } from '@/lib/paper-data';

interface PreviousYearsProps {
    subject: string;
    lang: 'en' | 'te';
}

export default function PreviousYears({ subject, lang }: PreviousYearsProps) {
    const filteredPapers = previousYearsPapers.filter(p => p.subjectId === subject);

    if (filteredPapers.length === 0) {
        return (
            <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/40">
                <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600">
                    {lang === 'en' ? 'No papers found' : 'పత్రాలు కనుగొనబడలేదు'}
                </h3>
                <p className="text-gray-500 mt-2">
                    {lang === 'en'
                        ? 'We are adding papers for this subject soon!'
                        : 'ఈ విషయానికి సంబంధించిన పత్రాలను త్వరలో జోడిస్తున్నాము!'}
                </p>
            </div>
        );
    }

    // Group papers by year for better formatting if needed, currently just listing
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper, index) => (
                <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-100 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">{paper.title}</h4>
                            <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-1">
                                <span className="bg-slate-100 px-2 py-0.5 rounded-full">{paper.year}</span>
                                {paper.set && <span className="bg-slate-100 px-2 py-0.5 rounded-full">{paper.set}</span>}
                                {paper.region && <span className="bg-slate-100 px-2 py-0.5 rounded-full">{paper.region}</span>}
                            </div>
                        </div>
                    </div>

                    <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white transition-colors"
                        title={lang === 'en' ? 'View Paper' : 'పత్రాన్ని చూడండి'}
                    >
                        <ExternalLink className="w-5 h-5" />
                    </a>
                </motion.div>
            ))}
        </div>
    );
}
