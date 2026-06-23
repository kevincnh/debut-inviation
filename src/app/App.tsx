import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// ─── data ────────────────────────────────────────────────────────────────────

interface Photo {
  id: number;
  src: string;
  alt: string;
  category: "showcase" | "gallery";
  caption: string;
  year?: string;
  span?: "wide" | "tall" | "normal";
  description?: string;
}

const photos: Photo[] = [
  // showcase (timeline)
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=1600&fit=crop&auto=format",
    alt: "Young Sofia playing in sunlight",
    category: "showcase",
    caption: "A Joyful Beginning",
    year: "2008",
    description: "The earliest memories bathed in golden sunlight, where every fallen leaf and gentle breeze held a new discovery.",
    span: "tall",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=1600&fit=crop&auto=format",
    alt: "Childhood garden",
    category: "showcase",
    caption: "Roots in the Garden",
    year: "2013",
    description: "A quiet sanctuary of blooming flowers where imagination ran wild and the seeds of creativity were first planted.",
    span: "tall",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=1600&fit=crop&auto=format",
    alt: "Ballet recital",
    category: "showcase",
    caption: "Pointe and Grace",
    year: "2018",
    description: "Countless hours of discipline, worn-out slippers, and the beautiful pursuit of perfection on stage.",
    span: "tall",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&h=1600&fit=crop&auto=format",
    alt: "Portrait in golden light",
    category: "showcase",
    caption: "Edge of Eighteen",
    year: "2024",
    description: "A quiet moment of reflection, poised on the edge of adulthood. The calm before a beautiful storm of celebration.",
    span: "tall",
  },

  // gallery (pre-debut shoot)
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop&auto=format",
    alt: "Debut portrait in gown",
    category: "gallery",
    caption: "Elegance",
    span: "tall",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=800&fit=crop&auto=format",
    alt: "Grand ballroom entrance",
    category: "gallery",
    caption: "The Grandeur",
    span: "wide",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop&auto=format",
    alt: "Debut gown detail",
    category: "gallery",
    caption: "Details in Champagne",
    span: "normal",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=1200&h=800&fit=crop&auto=format",
    alt: "Cotillion waltz",
    category: "gallery",
    caption: "The Waltz",
    span: "wide",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=1200&fit=crop&auto=format",
    alt: "Flowers and celebration",
    category: "gallery",
    caption: "Dusty Rose",
    span: "tall",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop&auto=format",
    alt: "Dinner reception",
    category: "gallery",
    caption: "Gathered with Love",
    span: "wide",
  },
];

const showcasePhotos = photos.filter(p => p.category === "showcase");
const galleryPhotos = photos.filter(p => p.category === "gallery");

// ─── lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-foreground/60 hover:text-primary transition-colors z-10"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-12 text-foreground/40 hover:text-primary transition-colors z-10"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-12 text-foreground/40 hover:text-primary transition-colors z-10"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      <div
        className="max-w-5xl w-full mx-12 flex flex-col items-center gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[80vh] w-auto object-contain shadow-2xl"
        />
        <div className="text-center">
          <p
            className="text-foreground/90 text-2xl md:text-3xl"
            style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}
          >
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Immersive Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=2000&h=2400&fit=crop&auto=format&q=80"
          alt="Sofia's debut portrait"
          className="w-full h-full object-cover object-[center_15%] opacity-60"
        />
        {/* Gradients to seamlessly blend image into background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content integrated into the image */}
      <div className="relative z-10 text-center px-6 w-full flex flex-col items-center justify-center h-full pt-32">
        <Sparkles className="text-primary mb-8" strokeWidth={1} size={28} />
        
        <p className="text-primary text-xs md:text-sm tracking-[0.5em] uppercase mb-6 font-['Jost'] font-light">
          You are joyfully invited
        </p>

        {/* Text overlapping heavily, extremely grand */}
        <div className="relative">
          <h1
            className="text-[6rem] md:text-[12rem] lg:text-[16rem] text-foreground leading-[0.7] tracking-tight"
            style={{ fontFamily: "'Gloock', serif" }}
          >
            Sofia
          </h1>
          <h1
            className="text-[4rem] md:text-[8rem] lg:text-[10rem] text-primary leading-none absolute top-1/2 left-1/2 -translate-x-1/2 md:translate-y-8 translate-y-4 whitespace-nowrap"
            style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}
          >
            Reyes
          </h1>
        </div>

        <div className="w-px h-32 bg-gradient-to-b from-primary to-transparent mx-auto mt-32 mb-12" />

        <p className="text-foreground/90 text-xl md:text-2xl tracking-[0.3em] uppercase font-['Jost'] font-light">
          June 28, 2026 &nbsp;·&nbsp; Manila
        </p>
      </div>
    </section>
  );
}

// ─── invitation details ───────────────────────────────────────────────────────

function EventDetails() {
  return (
    <section className="relative py-40 overflow-hidden bg-background">
      {/* Seamless background image for the event details */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=2000&h=1000&fit=crop&auto=format"
          alt="Elegant texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 text-center">
        <h2
          className="text-5xl md:text-7xl lg:text-8xl text-foreground mb-8"
          style={{ fontFamily: "'Gloock', serif" }}
        >
          The Celebration
        </h2>
        <p className="text-foreground/70 font-['Jost'] font-light text-xl md:text-2xl max-w-2xl mx-auto mb-32 leading-relaxed">
          Join us for an evening of elegance, fine dining, and dancing as we celebrate eighteen beautiful years and the exciting journey ahead.
        </p>

        {/* Elegant typography-focused details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-primary/20">
          <div className="flex flex-col items-center justify-center pt-10 md:pt-0">
            <span className="text-primary text-sm tracking-[0.4em] uppercase font-['Jost'] mb-6">When</span>
            <p className="text-3xl md:text-4xl text-foreground mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
              Saturday
            </p>
            <p className="text-2xl text-foreground/80 font-['Jost'] font-light">June 28, 2026</p>
            <p className="text-xl text-primary mt-4 font-['Jost'] font-light">6:00 in the evening</p>
          </div>
          
          <div className="flex flex-col items-center justify-center pt-20 md:pt-0">
            <span className="text-primary text-sm tracking-[0.4em] uppercase font-['Jost'] mb-6">Where</span>
            <p className="text-3xl md:text-4xl text-foreground mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
              The Grand Ballroom
            </p>
            <p className="text-2xl text-foreground/80 font-['Jost'] font-light">Makati Shangri-La</p>
            <p className="text-xl text-primary mt-4 font-['Jost'] font-light">Manila</p>
          </div>

          <div className="flex flex-col items-center justify-center pt-20 md:pt-0">
            <span className="text-primary text-sm tracking-[0.4em] uppercase font-['Jost'] mb-6">Attire</span>
            <p className="text-3xl md:text-4xl text-foreground mb-2" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
              Formal / Black Tie
            </p>
            <p className="text-xl text-primary mt-4 font-['Jost'] font-light">Champagne Gold & Noir</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── editorial showcase ───────────────────────────────────────────────────────

function Showcase() {
  return (
    <section className="py-40 bg-background overflow-hidden">
      <div className="text-center mb-40 px-5">
        <p className="text-primary text-sm tracking-[0.4em] uppercase mb-8 font-['Jost'] font-light">
          A glimpse into the past
        </p>
        <h2
          className="text-6xl md:text-8xl text-foreground"
          style={{ fontFamily: "'Gloock', serif" }}
        >
          The Woman <br/>
          <span className="text-primary" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
            She Is Becoming
          </span>
        </h2>
      </div>

      <div className="flex flex-col gap-40 md:gap-64">
        {showcasePhotos.map((photo, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={photo.id} className="relative w-full max-w-[100rem] mx-auto px-5">
              <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                
                {/* Seamless Image Area */}
                <div className={`md:col-span-8 relative ${isEven ? 'md:col-start-5' : 'md:col-start-1'} order-2 md:order-none`}>
                  <div className="relative group overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-[60vh] md:h-[90vh] object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    {/* Fade edges to blend into background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? 'from-background via-transparent to-transparent' : 'from-transparent via-transparent to-background'} opacity-80 hidden md:block`} />
                  </div>
                </div>

                {/* Overlapping Text Area */}
                <div 
                  className={`md:col-span-6 relative z-10 -mt-20 md:mt-0 ${
                    isEven 
                      ? 'md:col-start-1 md:row-start-1 md:text-left text-center' 
                      : 'md:col-start-7 md:row-start-1 md:text-right text-center'
                  } order-1 md:order-none`}
                >
                  <div className="bg-background/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-8 md:p-0">
                    <span className="inline-block text-primary text-sm md:text-base tracking-[0.4em] font-['Jost'] mb-6">
                      {photo.year}
                    </span>
                    <h3
                      className="text-5xl md:text-7xl lg:text-[6rem] text-foreground leading-[1.1] mb-8"
                      style={{ fontFamily: "'Gloock', serif" }}
                    >
                      {photo.caption.split(' ').map((word, wIdx, arr) => (
                        wIdx === arr.length - 1 ? (
                          <span key={wIdx} className="text-primary block md:inline" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
                            {' '}{word}
                          </span>
                        ) : (
                          <span key={wIdx}>{word} </span>
                        )
                      ))}
                    </h3>
                    <p className={`text-foreground/80 font-['Jost'] font-light text-xl md:text-2xl leading-relaxed max-w-lg ${isEven ? 'mx-auto md:ml-0' : 'mx-auto md:mr-0'}`}>
                      {photo.description}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── seamless gallery ─────────────────────────────────────────────────────────

function PreDebutGallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section className="py-40 bg-background">
      <div className="text-center mb-24 px-5">
        <p className="text-primary text-sm tracking-[0.4em] uppercase mb-8 font-['Jost'] font-light">
          Pre-Debut Portraits
        </p>
        <h2
          className="text-6xl md:text-8xl text-foreground"
          style={{ fontFamily: "'Gloock', serif" }}
        >
          Captured Elegance
        </h2>
      </div>

      {/* Grid with virtually no gaps for a seamless mural effect */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1">
        {galleryPhotos.map((photo, i) => (
          <div
            key={photo.id}
            className={`group relative cursor-pointer overflow-hidden bg-muted ${
              photo.span === "wide" ? "col-span-2 md:col-span-2 row-span-2" : 
              photo.span === "tall" ? "col-span-1 row-span-2" : "col-span-1 row-span-1"
            }`}
            onClick={() => onOpen(i)}
            style={{ minHeight: photo.span === "wide" ? "50vh" : "40vh" }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-out opacity-80 group-hover:opacity-100"
            />
            {/* Elegant overlay integrating the caption softly */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8 md:p-12">
              <p
                className="text-foreground text-3xl md:text-4xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700"
                style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}
              >
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── rsvp & footer ────────────────────────────────────────────────────────────

function RSVP() {
  return (
    <section className="py-48 px-5 text-center relative overflow-hidden bg-background">
      {/* Soft integrated background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2
          className="text-6xl md:text-8xl lg:text-9xl text-foreground mb-12"
          style={{ fontFamily: "'Gloock', serif" }}
        >
          Join The <br className="md:hidden"/>
          <span className="text-primary" style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
            Celebration
          </span>
        </h2>
        
        <p className="text-foreground/80 font-['Jost'] font-light text-2xl md:text-3xl mb-16 leading-relaxed">
          Kindly grace us with your presence. <br/>
          Please RSVP by the 1st of June, 2026.
        </p>

        <button className="bg-transparent border border-primary text-primary hover:bg-primary hover:text-background px-16 py-6 tracking-[0.3em] uppercase font-['Jost'] text-sm transition-colors duration-500">
          Respond Here
        </button>

        <div className="w-px h-32 bg-gradient-to-b from-primary to-transparent mx-auto mt-32 mb-20" />

        <p
          className="text-3xl md:text-5xl text-foreground/90 mb-12 leading-tight"
          style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}
        >
          "We can't wait to share this magical evening with you."
        </p>
        
        <p className="text-primary text-sm tracking-[0.4em] uppercase font-['Jost']">
          With Love, The Reyes Family
        </p>
      </div>
    </section>
  );
}

// ─── app ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const nextPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryPhotos.length);
  }, [lightboxIndex]);

  const prevPhoto = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + galleryPhotos.length) % galleryPhotos.length);
  }, [lightboxIndex]);

  return (
    <div className="bg-background min-h-screen text-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden selection:bg-primary/20 selection:text-primary">
      <Hero />
      <EventDetails />
      <Showcase />
      <PreDebutGallery onOpen={openLightbox} />
      <RSVP />

      {lightboxIndex !== null && (
        <Lightbox
          photos={galleryPhotos}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrev={prevPhoto}
        />
      )}
    </div>
  );
}
