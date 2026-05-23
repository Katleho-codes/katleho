"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork, Code2 } from 'lucide-react';
import Image from 'next/image'
import { STACK_COLORS } from '@/lib/colors';



interface Project {
    description: string

    stack: (keyof typeof STACK_COLORS)[]
    href?: string
    title?: string
    repo?: string
    github?: string
    forks?: number
    stars?: number
    name?: string
    type?: string
    live?: string
}
interface ProjectCardProps {
    project: Project
    index: number
}


export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [hovered, setHovered] = useState(false);
    const primaryColor = STACK_COLORS[project.stack?.[0]] || '217 91% 60%';

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative border border-border rounded-sm overflow-hidden bg-card transition-all duration-300 hover:border-primary/40"
            style={{
                backgroundColor: hovered ? `hsla(${primaryColor}, 0.04)` : undefined,
            }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: `hsl(${primaryColor})` }} />
                    <span className="font-mono text-xs text-muted-foreground">{project.type || 'module'}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                    {project.stars && (
                        <span className="flex items-center gap-1 text-xs font-mono">
                            <Star className="w-3 h-3" /> {project.stars}
                        </span>
                    )}
                    {project.forks && (
                        <span className="flex items-center gap-1 text-xs font-mono">
                            <GitFork className="w-3 h-3" /> {project.forks}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                    {project.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                {/* Stack */}
                <div className="mt-4 flex flex-wrap gap-1.5 overflow-hidden max-h-16 group-hover:max-h-40 transition-all duration-500">
                    {project.stack?.map((tech: any) => (
                        <span
                            key={tech}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono border border-border rounded-sm text-muted-foreground"
                        >
                            <Code2 className="w-3 h-3" />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex border-t border-border">
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors border-r border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                    >
                        <img alt="github icon" src={"/github.svg"} className="w-3.5 h-3.5" />
                        source
                    </a>
                )}
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 text-xs font-mono text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        live
                    </a>
                )}
            </div>
        </motion.article>
    );
}