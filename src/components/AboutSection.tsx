import { motion } from "framer-motion";
import { Film, Sparkles, Clock, Palette, Monitor, Zap } from "lucide-react";

const highlights = [
  { icon: Clock, text: "4+ years of hands-on editing experience" },
  { icon: Monitor, text: "Expert in Adobe Premiere Pro & After Effects" },
  { icon: Sparkles, text: "Creative eye for storytelling, pacing & visual rhythm" },
  { icon: Zap, text: "Fast turnaround with high-quality results" },
  { icon: Palette, text: "Flexible with different genres and client styles" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">About Me</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">
              Crafting Visual Stories That{" "}
              <span className="text-gradient">Leave a Mark</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm Deepak Jain, a professional video editor with 4+ years of experience turning raw footage 
              into polished, engaging content. I specialize in YouTube videos, social media reels, promotional 
              ads, short films, and digital media projects.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My mission is simple — to help creators, brands, and businesses tell their stories with 
              cinematic quality that stands out in a crowded digital world.
            </p>
          </motion.div>

          {/* Right — skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl glass glow-border"
              >
                <div className="p-2 rounded-lg bg-gradient-primary shrink-0">
                  <h.icon size={20} className="text-primary-foreground" />
                </div>
                <span className="text-foreground">{h.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
