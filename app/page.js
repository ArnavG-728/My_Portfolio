import HomeSection from '@/components/sections/Home';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Achievements from '@/components/sections/Achievements';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import NavigationDock from '@/components/common/NavigationDock';
import MobileTopMenu from '@/components/common/MobileTopMenu';

export default function RootPage() {
  return (
    <main className="min-h-screen transition-colors duration-300 bg-white text-gray-900 dark:bg-dark-950 dark:text-white">
      <NavigationDock />
      <MobileTopMenu />
      <div>
        <HomeSection />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Projects />
      </div>
      <div>
        <Experience />
      </div>
      <div>
        <Skills />
      </div>
      <div>
        <Achievements />
      </div>
      <div>
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
