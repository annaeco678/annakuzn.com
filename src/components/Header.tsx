import Magnetic from './Magnetic';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: 'home') => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-brand-bg transition-all duration-300">
      {/* Top minimal navigation bar copy from the image */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-2 flex justify-between items-center text-xs sm:text-sm font-sans font-light tracking-tight text-brand-muted select-none">
        <Magnetic strength={0.15}>
          <span 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer hover:text-brand-accent transition-colors font-sans font-normal block py-1"
          >
            anna kuznetsova
          </span>
        </Magnetic>
        <div className="flex gap-4 sm:gap-14 items-center">
          <Magnetic strength={0.2}>
            <span 
              onClick={() => scrollToSection('works-section')}
              className="cursor-pointer hover:text-brand-accent transition-colors font-sans font-normal block py-1"
            >
              work
            </span>
          </Magnetic>
          <Magnetic strength={0.2}>
            <span 
              onClick={() => scrollToSection('education-section')}
              className="cursor-pointer hover:text-brand-accent transition-colors font-sans font-normal block py-1"
            >
              about me
            </span>
          </Magnetic>
        </div>
      </div>

      {/* Massive lowercase title based on the uploaded image style */}
      <div className="w-full overflow-hidden text-center select-none pt-4 sm:pt-6 pb-2">
        <h1 className="text-[12.5vw] font-funnel font-semibold lowercase leading-[0.95] tracking-tight text-brand-accent whitespace-nowrap transition-all duration-500 cursor-default">
          anna kuznetsova
        </h1>
      </div>
    </header>
  );
}
