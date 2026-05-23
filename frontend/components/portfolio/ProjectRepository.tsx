"use client"
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { STACK_COLORS } from '@/lib/colors';

const PROJECTS = [
    {
        name: 'cloud-orchestrator',
        description: 'A distributed container orchestration engine built for multi-region deployments with automatic failover, health monitoring, and zero-downtime rolling updates.',
        stack: ['Go', 'Kubernetes', 'Redis', 'PostgreSQL'],
        type: 'infrastructure',
        stars: 2847,
        forks: 312,
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        name: 'neural-gateway',
        description: 'High-performance API gateway with built-in ML-powered rate limiting, request routing, and real-time analytics dashboard.',
        stack: ['Rust', 'TypeScript', 'React', 'Redis'],
        type: 'backend',
        stars: 1523,
        forks: 187,
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        name: 'type-forge',
        description: 'A TypeScript-first schema validation library with auto-generated documentation, runtime type checking, and VS Code extension.',
        stack: ['TypeScript', 'Node.js'],
        type: 'library',
        stars: 4201,
        forks: 89,
        github: 'https://github.com',
    },
    {
        name: 'api-mesh',
        description: 'GraphQL federation layer that stitches multiple microservice APIs into a single, unified data graph with real-time subscriptions.',
        stack: ['TypeScript', 'GraphQL', 'Node.js', 'Docker'],
        type: 'framework',
        stars: 892,
        forks: 63,
        github: 'https://github.com',
        live: 'https://example.com',
    },
    {
        name: 'deploy-pipeline',
        description: 'CI/CD pipeline framework with declarative YAML config, parallel test execution, and multi-cloud deployment targets.',
        stack: ['Go', 'Docker', 'AWS'],
        type: 'devops',
        stars: 567,
        forks: 42,
        github: 'https://github.com',
    },
    {
        name: 'state-machine',
        description: 'Lightweight finite state machine library for React applications with devtools integration and visual state chart editor.',
        stack: ['TypeScript', 'React'],
        type: 'library',
        stars: 3156,
        forks: 201,
        github: 'https://github.com',
        live: 'https://example.com',
    },
] satisfies { stack: (keyof typeof STACK_COLORS)[];[key: string]: unknown }[]

const FILTERS = ['all', 'infrastructure', 'backend', 'library', 'framework', 'devops'];

export default function ProjectRepository() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered = activeFilter === 'all'
        ? PROJECTS
        : PROJECTS.filter((p) => p.type === activeFilter);

    return (
        <section id="repository" className="py-24 border-b border-border">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                            02
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-foreground">
                        The Repository
                    </h2>
                    <p className="mt-3 text-muted-foreground font-sans max-w-xl">
                        Open-source modules, production systems, and developer tools each built with precision engineering
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                    <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-colors cursor-pointer whitespace-nowrap focus:outline-none focus:ring-none focus:text-gray-50 ${activeFilter === f
                                ? 'border border-[#eb5e28] bg-primary text-gray-50 active:bg-[#588157] active:text-gray-50'
                                : 'border border-[#588157] text-muted-foreground hover:bg-[#588157] hover:text-gray-50 active:bg-[#588157] active:text-gray-50'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((project, i) => (
                        <ProjectCard key={project.name} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}