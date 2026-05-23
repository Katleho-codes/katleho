"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Calendar, Zap } from 'lucide-react';

const NOW_BUILDING = [
    {
        label: 'Primary',
        name: 'Kapitec',
        desc: 'A simulation bank backend from transactions, users, etc.',
        status: 'In Progress',
        pct: 68,
    },
    {
        label: 'Primary',
        name: 'Deliva',
        desc: 'An online marketplace full of local spaza shops, making accessibility easier and secure',
        status: 'In Progress',
        pct: 68,
    },
];

const TECH_STACK = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'C#'];

interface LayoutProps {
    heroImage: string;
}

export default function HeroSection({ heroImage }: LayoutProps) {
    return (
        <section id="hero" className="min-h-screen relative border-b border-border">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Center Pane — The Kernel */}
                <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-24 lg:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Prefix */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-accent" />
                            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                                Available for work
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight leading-none text-foreground">
                            Katleho
                            <br />
                            <span className="text-primary">Mabala</span>
                        </h1>

                        {/* Title */}
                        <p className="mt-6 text-lg md:text-xl font-sans font-light text-muted-foreground max-w-xl leading-relaxed">
                            Backend and frontend engineer transitioning into enterprise/backend systems
                        </p>

                        {/* Meta */}
                        <div className="mt-6 flex flex-wrap gap-4 text-sm font-mono text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" /> Johannesburg
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" /> 2+ years professional experience
                            </span>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {TECH_STACK.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 text-xs font-mono font-medium border border-border rounded-sm bg-card text-foreground hover:border-primary hover:text-primary transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Now Building */}
                        <div className="mt-12 border-t border-border pt-6">
                            <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-4 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-primary" />
                // Now Building
                            </h3>
                            <div className="space-y-4">
                                {NOW_BUILDING.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                                        className="group"
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-[10px] text-muted-foreground border border-border rounded-sm px-1.5 py-0.5">
                                                    {item.label}
                                                </span>
                                                <span className="font-mono text-sm font-semibold text-foreground">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className={`font-mono text-xs ${item.status === 'In Progress' ? 'text-accent' :
                                                item.status === 'Alpha' ? 'text-primary' : 'text-muted-foreground'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{item.desc}</p>
                                        <div className="h-0.5 bg-border rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.pct}%` }}
                                                transition={{ delay: 0.8 + i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                                className="h-full bg-primary rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Pane — 3D Render */}
                <div className="hidden lg:block w-[35%] relative border-l border-border overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        <img
                            src={heroImage}
                            alt="Abstract 3D rendering of interconnected data nodes"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-l from-transparent to-background/20" />
                    </motion.div>

                    {/* Career highlights overlay */}
                    <div className="absolute bottom-8 right-8 left-8 space-y-2">
                        {[
                            { company: 'The Learning Studio', role: 'Moodle Software Developer', period: '2025—now', dot: 'bg-accent' },
                            { company: 'MM ALL ELECTRONICS', role: 'Software Developer', period: '2023—25', dot: 'bg-primary' },
                        ].map((h) => (
                            <div key={h.company} className="flex items-center gap-3 bg-foreground/85 backdrop-blur-sm text-background px-4 py-2.5 rounded-sm">
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${h.dot}`} />
                                <span className="font-mono text-xs font-bold text-background flex-1">{h.company}</span>
                                <span className="font-mono text-xs text-background/70">{h.role}</span>
                                <span className="font-mono text-xs text-background/50">{h.period}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-[calc(50%+2rem)]"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ArrowDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
        </section>
    );
}