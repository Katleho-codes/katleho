"use client"
import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
    {
        title: 'Frontend',
        items: [
            { name: 'React / Next.js' },
            { name: 'Tailwind CSS' },
            { name: 'Laravel' },
        ],
    },
    {
        title: 'Backend',
        items: [
            { name: 'Node.js' },
            { name: 'PostgreSQL' },
            { name: 'C# .NET' },
            { name: 'PHP' },
            { name: 'Redis' },
        ],
    },
];

export default function SkillsSection() {
    return (
        <section className="py-24 border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                            01
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-foreground">
                        Tech Stack
                    </h2>
                    <p className="mt-3 text-muted-foreground font-sans max-w-xl">
                        Proficiency matrix, measured by production hours, not tutorial completions
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SKILL_CATEGORIES.map((category, ci) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.1 }}
                            className="border border-border rounded-sm p-6 bg-card"
                        >
                            <h3 className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-5">
                // {category.title}
                            </h3>
                            <div className={`flex flex-wrap gap-2 ${category.title === 'Languages' ? '' : 'space-y-0'}`}>
                                {category.items.map((skill) => (
                                    category.title === 'Languages' ? (
                                        <span
                                            key={skill.name}
                                            className="px-3 py-1.5 text-sm font-mono font-medium border border-border rounded-sm text-foreground bg-background hover:border-primary hover:text-primary transition-colors"
                                        >
                                            {skill.name}
                                        </span>
                                    ) : (
                                        <div key={skill.name} className="w-full">
                                            <div className="mb-1.5">
                                                <span className="text-sm font-sans font-medium text-foreground">{skill.name}</span>
                                            </div>

                                        </div>
                                    )
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}