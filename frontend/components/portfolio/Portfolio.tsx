"use client"
import MonolithSidebar from './MonolithSidebar';

import ExperienceTimeline from './ExperienceTimeline';
import HeroSection from './HeroSection';
import ProjectRepository from './ProjectRepository';
import SkillsSection from './SkillsSection';
import TerminalFooter from './TerminalFooter';


const HERO_IMAGE = 'https://media.base44.com/images/public/6a0c16ad7ca5ce65ff286199/eec6f1460_generated_0a65056d.png';

export default function Portfolio() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <MonolithSidebar />

            {/* Main content — offset for sidebar on lg+ */}
            <main className="lg:ml-16">
                <HeroSection heroImage={HERO_IMAGE as string} />
                <SkillsSection />
                <ProjectRepository />
                <ExperienceTimeline />
                <TerminalFooter />
            </main>
        </div>
    );
}