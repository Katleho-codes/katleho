"use client"
import { Activity, Layers, Mail, Menu, Terminal, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image'


const NAV_ITEMS = [
    { label: 'HERO', href: '#hero', icon: Terminal },
    { label: 'PROJECTS', href: '#repository', icon: Layers },
    { label: 'CONTACT', href: '#terminal', icon: Mail },
];

const STATUS_LIGHTS = [
    { label: 'GitHub', status: 'active' },
    { label: 'Deploy', status: 'active' },
];

export default function MonolithSidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNav = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed top-4 left-3 z-60 lg:hidden w-11 h-11 flex items-center justify-center bg-[#eb5e28] text-background rounded-sm border border-[#eb5e28]"
                aria-label="Toggle navigation"
            >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-foreground/40 z-49 lg:hidden" onClick={() => setMobileOpen(false)} />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen w-16 bg-gray-100 text-sidebar-foreground border-r border-gray-100 z-50 flex flex-col items-center justify-between py-8 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo mark */}
                <div className="flex flex-col items-center gap-8">
                    <div className="w-8 h-8 border-2 border-primary rounded-sm items-center justify-center hidden lg:flex">
                        <span className="font-mono text-xs font-bold text-primary">&lt;/&gt;</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-1 mt-10">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => handleNav(item.href)}
                                className="group relative w-11 h-11 flex items-center justify-center rounded-sm text-sidebar-foreground/60 hover:text-primary hover:bg-[#588157] hover:text-gray-50 transition-colors focus:outline-none focus:ring-0"
                                aria-label={item.label}
                            >
                                <item.icon className="w-4 h-4" />
                                <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs font-mono rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* System status */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col gap-2">
                        {STATUS_LIGHTS.map((s) => (
                            <div key={s.label} className="group relative flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs font-mono rounded-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                                    {s.label}: {s.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Social links */}
                    <div className="flex flex-col gap-1 pt-4 border-t border-sidebar-border">

                        <a
                            key={'GitHub'}
                            href={'https://github.com/Katleho-codes'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 flex items-center justify-center text-sidebar-foreground/60 hover:text-primary transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label={'GitHub'}
                        >
                            <img alt="github icon" src={"/github.svg"} className="w-4 h-4" />
                        </a>
                        <a
                            key={'LinkedIn'}
                            href={'https://linkedin.com/in/katleho-mabala'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 flex items-center justify-center text-sidebar-foreground/60 hover:text-primary transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label={'LinkedIn'}
                        >
                            <img alt="linkedin icon" src={"/linkedin.png"} className="w-4 h-4" />
                        </a>

                    </div>
                </div>
            </aside>
        </>
    );
}