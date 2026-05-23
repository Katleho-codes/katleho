"use client"
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, ChevronRight } from 'lucide-react';
import axios from 'axios';

const HISTORY = [
    { type: 'system', text: 'Connection established. Terminal v3.2.1' },
    { type: 'system', text: 'Type your message or use --help for commands.' },
];
type Field = 'name' | 'email' | 'message';

const PROMPTS: Record<Field, string> = {
    name: 'Enter your name:',
    email: 'Enter your email:',
    message: 'Enter your message:',
};

const FIELD_ORDER: Field[] = ['name', 'email', 'message'];
export default function TerminalFooter() {
    const [input, setInput] = useState('');
    const [lines, setLines] = useState(HISTORY);
    const [step, setStep] = useState<Field | 'done'>('name');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const prompt = step !== 'done' ? PROMPTS[step] : '';

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!input.trim() || step === 'done') return;

        const value = input.trim();

        if (input === '--help') {
            setLines(prev => [
                ...prev,
                { type: 'command', text: `guest@portfolio:~$ ${input}` },
                { type: 'system', text: 'Available: --email katlehomabala3@gmail.com | --github github.com/Katleho-codes | --linkedin linkedin.com/in/katleho-mabala' },
            ]);
            setInput('');
            return;
        }

        // Basic email validation
        if (step === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setLines(prev => [
                ...prev,
                { type: 'command', text: `guest@portfolio:~$ ${value}` },
                { type: 'error', text: '→ Invalid email address. Try again.' },
            ]);
            setInput('');
            return;
        }

        const updatedData = { ...formData, [step]: value };
        setFormData(updatedData);

        const currentIndex = FIELD_ORDER.indexOf(step);
        const nextStep = FIELD_ORDER[currentIndex + 1] as Field | undefined;

        const newLines: typeof lines = [
            ...lines,
            { type: 'command', text: `guest@portfolio:~$ ${value}` },
        ];

        if (nextStep) {
            newLines.push({ type: 'system', text: `→ ${PROMPTS[nextStep]}` });
            setStep(nextStep);
        } else {
            // All fields collected — send
            setStep('done');
            newLines.push({ type: 'system', text: '→ Sending...' });

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/contact`, updatedData);
                if (response.status === 200) {
                    newLines.push({
                        type: 'success',
                        text: '→ Message queued for delivery. Response ETA: <24h. Thank you',
                    });
                }
                newLines.push({
                    type: 'system',
                    text: response?.data?.error,
                });
            } catch (error) {
                newLines.push({ type: 'error', text: '→ Message not sent. $Try again.' });
                if (process.env.NEXT_PUBLIC_NODE_ENV === 'development') console.error('Could not send email', error);
                // Let them retry
                setStep('name');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setLines(prev => [...prev, { type: 'system', text: '→ Enter your name:' }]);
                }, 800);
            }
        }

        setLines(newLines);
        setInput('');
    };


    return (
        <footer id="terminal" className="bg-foreground text-background">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-background/50 tracking-widest uppercase">
                            04
                        </span>
                        <div className="h-px flex-1 bg-background/10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-background">
                        The Terminal
                    </h2>
                    <p className="mt-3 text-background/60 font-sans max-w-xl">
                        Direct line. No forms, no friction — just send your message.
                    </p>
                </motion.div>

                {/* Terminal window */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-background/20 rounded-sm overflow-hidden max-w-3xl"
                >
                    {/* Title bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-background/10">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-destructive/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-accent/80" />
                        </div>
                        <span className="font-mono text-xs text-background/40 ml-3">contact@portfolio — bash</span>
                    </div>

                    {/* Terminal body */}
                    <div ref={scrollRef} className="p-4 h-48 overflow-y-auto font-mono text-sm space-y-1.5">
                        {lines.map((line, i) => (
                            <div
                                key={i}
                                className={
                                    line.type === 'system'
                                        ? 'text-background/40'
                                        : line.type === 'success'
                                            ? 'text-accent'
                                            : 'text-background/80'
                                }
                            >
                                {line.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="border-t border-background/10 flex items-center">
                        <span className="pl-4 font-mono text-xs text-background/40 shrink-0">
                            <ChevronRight className="w-3.5 h-3.5 inline" />{' '}
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={step === 'done'}
                            placeholder={
                                step === 'done'
                                    ? 'Message sent — refresh to send another'
                                    : `${prompt}`
                            }
                            className="flex-1 bg-transparent text-background font-mono text-sm py-3 px-2 focus:outline-none placeholder:text-background/30"
                        />
                        <button
                            type="submit"
                            className="w-11 h-11 flex items-center justify-center text-background/60 hover:text-accent transition-colors mr-2 focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
                            aria-label="Send message"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="font-mono text-xs text-background/40">
                        © {new Date().getFullYear()} Katleho Mabala
                    </div>
                    <div className="flex gap-6">
                        {[
                            { label: 'GitHub', href: 'https://github.com/Katleho-codes' },
                            { label: 'LinkedIn', href: 'https://linkedin.com/in/katleho-mabala' },
                            { label: 'Email', href: 'mailto:katlehomabala3@gmail.com' },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-xs text-background/50 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-sm"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}