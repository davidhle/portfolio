import { ThemeToggle } from './components/ThemeToggle';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Hero } from './sections/Hero';
import { Work } from './sections/Work';
import './sections/sections.css';

export default function App() {
  return (
    <>
      <ThemeToggle />
      <main className="page">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </>
  );
}
