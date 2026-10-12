import { SideNav } from './components/SideNav';
import { ThemeToggle } from './components/ThemeToggle';
import { About } from './sections/About';
import { CV } from './sections/CV';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import './sections/sections.css';

export default function App() {
  return (
    <>
      <SideNav />
      <ThemeToggle />
      <main className="page">
        <Hero />
        <About />
        <Work />
        <CV />
      </main>
    </>
  );
}
