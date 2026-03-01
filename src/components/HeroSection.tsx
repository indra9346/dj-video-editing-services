import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg1.mp4";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      {/* Background video container */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroBg} type="video/mp4" />
        </video>
        
        {/* Darker overlay for significantly better text readability */}
        <div className="absolute inset-0 bg-background/65 z-[1]" />
        
        {/* Film strip lines */}
        <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-20 z-[2]" />
        <div className="absolute top-0 right-8 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent opacity-20 z-[2]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/60 backdrop-blur-md mb-8"
        >
          <Play size={14} className="text-primary fill-primary" />
          <span className="text-sm font-medium text-foreground">Freelance Video Editor — YouTube, Reels & Ads</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 drop-shadow-2xl text-white"
        >
          Professional Video Editing
          <br />
          Services That{" "}
          <span className="text-gradient drop-shadow-none">Drive Results</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-foreground/90 max-w-2xl mx-auto mb-10 drop-shadow-md font-medium"
        >
          Elevate Your Content with professional video editing for YouTube, Instagram,
          ads, corporate films, and short projects - cinematic visuals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/918302803076?text=Hi%20Deepak,%20I'm%20interested%20in%20your%20video%20editing%20services!"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-xl"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.12 1.52 5.853L.057 23.764l6.063-1.418A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82a9.796 9.796 0 01-5.39-1.606l-.386-.23-3.601.843.906-3.484-.252-.4A9.818 9.818 0 012.18 12c0-5.424 4.396-9.82 9.82-9.82S21.82 6.576 21.82 12s-4.396 9.82-9.82 9.82z"/>
            </svg>
            Message on WhatsApp
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3.5 rounded-full border border-border bg-card/60 text-white font-bold hover:bg-card/80 transition-colors flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm"
          >
            <Play size={18} className="text-primary" />
            View My Work
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { num: "4+", label: "Years Experience" },
            { num: "500+", label: "Projects Delivered" },
            { num: "50+", label: "Happy Clients" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient drop-shadow-sm">{s.num}</div>
              <div className="text-xs sm:text-sm text-foreground font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown size={24} className="text-white drop-shadow-md" />
      </motion.div>
    </section>
  );
};

export default HeroSection;