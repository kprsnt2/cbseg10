
export interface Paper {
    id: string;
    year: string;
    subjectId: string;
    set?: string;
    region?: string; // e.g., 'Delhi', 'Outside Delhi', 'Foreign'
    url: string;
    title: string;
}

export interface QuickQuestion {
    id: string;
    subjectId: string;
    chapterId?: string; // Optional linkage to specific chapter
    question: string;
    answer: string;
    examFrequency?: string; // e.g., 'Asked in 2023, 2020'
    tags?: string[]; // e.g., 'Concept', 'Formula', 'Derivation'
}

export const previousYearsPapers: Paper[] = [
    // MATHEMATICS STANDARD (18 Papers Structure)
    // Assuming structure: 3 Sets * 6 Regions/Types approx. 
    // Mapping existing files from public/Papers/Mathematics_Standard/
    { id: 'math-2024-s1-1', year: '2024', subjectId: 'mathematics', set: 'Set 1', region: 'Type 1', title: 'Math Standard 30/1/1', url: '/Papers/Mathematics_Standard/30-1-1_Mathematics Standard.pdf' },
    { id: 'math-2024-s1-2', year: '2024', subjectId: 'mathematics', set: 'Set 2', region: 'Type 1', title: 'Math Standard 30/1/2', url: '/Papers/Mathematics_Standard/30-1-2_Mathematics Standard.pdf' },
    { id: 'math-2024-s1-3', year: '2024', subjectId: 'mathematics', set: 'Set 3', region: 'Type 1', title: 'Math Standard 30/1/3', url: '/Papers/Mathematics_Standard/30-1-3_Mathematics Standard.pdf' },

    { id: 'math-2024-s2-1', year: '2024', subjectId: 'mathematics', set: 'Set 1', region: 'Type 2', title: 'Math Standard 30/2/1', url: '/Papers/Mathematics_Standard/30-2-1_Mathematics Standard.pdf' },
    { id: 'math-2024-s2-2', year: '2024', subjectId: 'mathematics', set: 'Set 2', region: 'Type 2', title: 'Math Standard 30/2/2', url: '/Papers/Mathematics_Standard/30-2-2_Mathematics Standard.pdf' },
    { id: 'math-2024-s2-3', year: '2024', subjectId: 'mathematics', set: 'Set 3', region: 'Type 2', title: 'Math Standard 30/2/3', url: '/Papers/Mathematics_Standard/30-2-3_Mathematics Standard.pdf' },

    { id: 'math-2024-s3-1', year: '2024', subjectId: 'mathematics', set: 'Set 1', region: 'Type 3', title: 'Math Standard 30/3/1', url: '/Papers/Mathematics_Standard/30-3-1_Mathematics Standard.pdf' },
    { id: 'math-2024-s3-2', year: '2024', subjectId: 'mathematics', set: 'Set 2', region: 'Type 3', title: 'Math Standard 30/3/2', url: '/Papers/Mathematics_Standard/30-3-2_Mathematics Standard.pdf' },
    { id: 'math-2024-s3-3', year: '2024', subjectId: 'mathematics', set: 'Set 3', region: 'Type 3', title: 'Math Standard 30/3/3', url: '/Papers/Mathematics_Standard/30-3-3_Mathematics Standard.pdf' },

    { id: 'math-2024-s4-1', year: '2024', subjectId: 'mathematics', set: 'Set 1', region: 'Type 4', title: 'Math Standard 30/4/1', url: '/Papers/Mathematics_Standard/30-4-1_Mathematics Standard.pdf' },
    { id: 'math-2024-s4-2', year: '2024', subjectId: 'mathematics', set: 'Set 2', region: 'Type 4', title: 'Math Standard 30/4/2', url: '/Papers/Mathematics_Standard/30-4-2_Mathematics Standard.pdf' },
    { id: 'math-2024-s4-3', year: '2024', subjectId: 'mathematics', set: 'Set 3', region: 'Type 4', title: 'Math Standard 30/4/3', url: '/Papers/Mathematics_Standard/30-4-3_Mathematics Standard.pdf' },

    { id: 'math-2024-s5-1', year: '2024', subjectId: 'mathematics', set: 'Set 1', region: 'Type 5', title: 'Math Standard 30/5/1', url: '/Papers/Mathematics_Standard/30-5-1_Mathematics Standard.pdf' },
    { id: 'math-2024-s5-2', year: '2024', subjectId: 'mathematics', set: 'Set 2', region: 'Type 5', title: 'Math Standard 30/5/2', url: '/Papers/Mathematics_Standard/30-5-2_Mathematics Standard.pdf' },
    { id: 'math-2024-s5-3', year: '2024', subjectId: 'mathematics', set: 'Set 3', region: 'Type 5', title: 'Math Standard 30/5/3', url: '/Papers/Mathematics_Standard/30-5-3_Mathematics Standard.pdf' },

    { id: 'math-2024-s6-1', year: '2024', subjectId: 'mathematics', set: 'Set 1', region: 'Type 6', title: 'Math Standard 30/6/1', url: '/Papers/Mathematics_Standard/30-6-1_Mathematics Standard.pdf' },
    { id: 'math-2024-s6-2', year: '2024', subjectId: 'mathematics', set: 'Set 2', region: 'Type 6', title: 'Math Standard 30/6/2', url: '/Papers/Mathematics_Standard/30-6-2_Mathematics Standard.pdf' },
    { id: 'math-2024-s6-3', year: '2024', subjectId: 'mathematics', set: 'Set 3', region: 'Type 6', title: 'Math Standard 30/6/3', url: '/Papers/Mathematics_Standard/30-6-3_Mathematics Standard.pdf' },

    // OTHER SUBJECTS
    { id: 'ai-2024-main', year: '2024', subjectId: 'ai', title: 'Artificial Intelligence (AI 417)', url: '/Papers/104_Artificial_Intelleigence_NEW.pdf' },
    { id: 'telugu-2024-main', year: '2024', subjectId: 'telugu', title: 'Telugu Telangana', url: '/Papers/Telugu_Telangana.pdf' },
    { id: 'english-2024-comm', year: '2024', subjectId: 'english', title: 'English Communicative', url: '/Papers/English_communicative.pdf' },
];

export const quickReviewQuestions: QuickQuestion[] = [
    // MATHEMATICS
    {
        id: 'math-q1',
        subjectId: 'mathematics',
        question: 'Prove that √2 is an irrational number.',
        answer: 'Assume √2 is rational (p/q). Square both sides: 2 = p²/q² => p² = 2q². This implies p is even. Let p=2k. Then (2k)² = 2q² => 4k² = 2q² => q² = 2k², so q is also even. This contradicts that p and q are co-prime. Hence √2 is irrational.',
        examFrequency: 'Very High',
        tags: ['Real Numbers', 'Proof']
    },
    {
        id: 'math-q2',
        subjectId: 'mathematics',
        question: 'State and prove Basic Proportionality Theorem (BPT/Thales Theorem).',
        answer: 'If a line is drawn parallel to one side of a triangle intersecting the other two sides in distinct points, then the other two sides are divided in the same ratio.',
        examFrequency: 'High',
        tags: ['Triangles', 'Theorem']
    },
    {
        id: 'math-q3',
        subjectId: 'mathematics',
        question: 'Find the nature of roots of quadratic equation ax² + bx + c = 0.',
        answer: 'Discriminant D = b² - 4ac. If D > 0, two distinct real roots. If D = 0, two equal real roots. If D < 0, no real roots.',
        examFrequency: 'Medium',
        tags: ['Quadratic Equations', 'Formula']
    },
    {
        id: 'math-q4',
        subjectId: 'mathematics',
        question: 'Relationship between zeroes and coefficients of a quadratic polynomial ax² + bx + c.',
        answer: 'Sum of zeroes (α+β) = -b/a. Product of zeroes (αβ) = c/a.',
        examFrequency: 'High',
        tags: ['Polynomials', 'Formula']
    },
    {
        id: 'math-q5',
        subjectId: 'mathematics',
        question: 'What is the condition for a pair of linear equations to have infinitely many solutions?',
        answer: 'a₁/a₂ = b₁/b₂ = c₁/c₂ (Coincident lines).',
        examFrequency: 'Values',
        tags: ['Linear Equations']
    },

    // AI (Code 417)
    {
        id: 'ai-q1',
        subjectId: 'ai',
        question: 'What are the three domains of AI?',
        answer: '1. Data Science (Input is data), 2. Computer Vision (Input is images/video), 3. Natural Language Processing (Input is text/speech). (Rec: Gemini 2.5 Pro)',
        examFrequency: 'High',
        tags: ['Basics', 'Gemini']
    },
    {
        id: 'ai-q2',
        subjectId: 'ai',
        question: 'Explain the AI Project Cycle.',
        answer: '1. Problem Scoping, 2. Data Acquisition, 3. Data Exploration, 4. Modelling, 5. Evaluation. (Rec: Claude 4.5 Haiku)',
        examFrequency: 'High',
        tags: ['Project Cycle', 'Claude']
    },
    {
        id: 'ai-q3',
        subjectId: 'ai',
        question: 'What is F1 Score?',
        answer: 'F1 Score = 2 * (Precision * Recall) / (Precision + Recall). Crucial for imbalanced datasets. (Rec: DeepSeek 3.2)',
        examFrequency: 'Medium',
        tags: ['Evaluation', 'DeepSeek']
    },
    {
        id: 'ai-q4',
        subjectId: 'ai',
        question: 'Difference between Supervised and Unsupervised Learning.',
        answer: 'Supervised: Model is trained on labelled data. Unsupervised: Model finds patterns in unlabelled data. (Rec: All Models)',
        examFrequency: 'High',
        tags: ['Modelling']
    },
    {
        id: 'ai-q5',
        subjectId: 'ai',
        question: 'What is a Neural Network?',
        answer: 'A system modeled on the human brain with Input, Hidden, and Output layers. (Rec: Gemini 2.5 Pro)',
        examFrequency: 'High',
        tags: ['Neural Networks']
    },
    // New Additions from Multi-Agent Review
    {
        id: 'math-q6',
        subjectId: 'mathematics',
        question: 'State Pythagoras Theorem.',
        answer: 'In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides. (Rec: Claude 4.5 Haiku)',
        examFrequency: 'Very High',
        tags: ['Triangles', 'Claude']
    },
    {
        id: 'math-q7',
        subjectId: 'mathematics',
        question: 'Find the distance between two points (x1, y1) and (x2, y2).',
        answer: 'Distance = √[(x2 - x1)² + (y2 - y1)²]. (Rec: DeepSeek 3.2)',
        examFrequency: 'High',
        tags: ['Coordinate Geometry', 'DeepSeek']
    },
    {
        id: 'ai-q6',
        subjectId: 'ai',
        question: 'Define Confusion Matrix.',
        answer: 'A table used to describe the performance of a classification model. It contains True Positives, True Negatives, False Positives, and False Negatives. (Rec: DeepSeek 3.2)',
        examFrequency: 'High',
        tags: ['Evaluation', 'DeepSeek']
    },
    {
        id: 'ai-q7',
        subjectId: 'ai',
        question: 'What is Natural Language Processing (NLP)?',
        answer: 'Goal is to enable computers to understand, interpret, and generate human language. Applications: Chatbots, Translation. (Rec: Gemini 2.5 Pro)',
        examFrequency: 'Medium',
        tags: ['NLP', 'Gemini']
    }
];
