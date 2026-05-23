import Portfolio from "@/components/portfolio/Portfolio";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katleho Mabala',
  description: 'The personal portfolio for the software developer Katleho Mabala',
}
export default function Home() {
  return (
    <>

      <Portfolio />
    </>
  );
}
