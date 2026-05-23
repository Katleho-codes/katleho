"use client";
import { motion } from 'framer-motion';
import { Building2, Calendar } from 'lucide-react';

const EXPERIENCE = [
    {
        role: 'Moodle Software Developer',
        company: 'The Learning Studio',
        period: '2025 — Present',
        description: 'Designed and built customized moodle plugins (course formats, themes, local, ai) for clients, one the sites\' that used the ai plugin decreased time wasted searching across the entire site for course summary, creation and questions by 10%',
        stack: ['TypeScript', 'PHP', 'Node.js', 'Linux', 'React.js', 'Ionic', 'SQL'],
    },
    {
        role: 'Software Developer',
        company: 'MM ALL ELECTRONICS',
        period: '2023 — 2025',
        description: 'Developed and merged two existing company internal systems into one, to better decrease time spent switching between two internal system which increased productivity',
        stack: ['PostgreSQL', 'TypeScript', 'React.js', 'Node.js'],
    },
];

export default function ExperienceTimeline() {
    return (
        <section className="py-24 border-b border-border bg-card">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              // experience
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-foreground">
                        Execution Log
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-[#eb5e28]" />

                    <div className="space-y-8">
                        {EXPERIENCE.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-12 md:pl-20"
                            >
                                {/* Dot */}
                                <div className="absolute left-2.5 md:left-6.5 top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background" />

                                <div className="border border-border rounded-sm p-5 bg-background hover:border-primary/30 transition-colors">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-lg font-sans font-bold text-foreground tracking-tight">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Building2 className="w-3.5 h-3.5" />
                                                <span className="font-medium">{exp.company}</span>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exp.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 text-xs font-mono border border-border rounded-sm text-muted-foreground"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}