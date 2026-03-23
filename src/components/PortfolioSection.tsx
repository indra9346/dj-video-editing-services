import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Utensils,
  Music,
  Dumbbell,
  Calendar,
  Heart,
  Mic
} from "lucide-react";

/* ===============================
   PORTFOLIO DATA
================================= */

const portfolioData = {
  Food: {
    icon: <Utensils className="w-6 h-6" />,
    description: "Mouth-watering culinary edits and food storytelling.",
    bannerImg:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
    videos: [
      "FN0VWR3SlWY",
      "Nf9jAmS5B6A",
      "q-FLyFRsmgE"
    ]
  },

  /* ⭐ UPDATED AMBIENCE BANNER */

  Ambience: {
    icon: <Music className="w-6 h-6" />,
    description: "Atmospheric environmental visuals and cinematic ambience editing.",
    bannerImg:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070", // ⭐ Cinematic ambience restaurant/lounge
    videos: [
      "UNgdV9PwZ_w",
      "fI63c3qoZeI",
      "4egEYDsl31c",
      "CQH7xp2r-vI"
    ]
  },

  Gym: {
    icon: <Dumbbell className="w-6 h-6" />,
    description: "High-energy fitness edits.",
    bannerImg:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070",
    videos: [
      "X2KIJ_EsmpE",
      "GA3qjVYAtFM",
      "ylO6i9-Ixzo",
      "tc0y5id6o0w",
      "VTvj1OJyv9Q"
    ]
  },

  Events: {
    icon: <Calendar className="w-6 h-6" />,
    description: "Special moments and gatherings.",
    bannerImg:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
    videos: [
      "YiykrAOtxkI",
      "i3j7W6kj4XI"
    ]
  },

  Wedding: {
    icon: <Heart className="w-6 h-6" />,
    description: "Romantic wedding storytelling.",
    bannerImg:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
    videos: [
      "CEW2E5R8wDE",
      "-1PAf-s_mYY"
    ]
  },

  Podcast: {
    icon: <Mic className="w-6 h-6" />,
    description: "Professional podcast edits.",
    bannerImg:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070",
    videos: [
      "345f8wrJ-sQ",
      "Bctc0gKD4mM",
      "y_6PfnMMrhI"
    ]
  }
};

/* ===============================
   AUTOPLAY + LOOP EMBED
================================= */

const getEmbedUrl = (id: string) => {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`;
};

/* ===============================
   COMPONENT
================================= */

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<string | null>(null);

  const currentCategoryData =
    selectedCategory
      ? portfolioData[
          selectedCategory as keyof typeof portfolioData
        ]
      : null;

  return (
    <section
      id="portfolio"
      className="py-24 relative overflow-hidden bg-background"
    >
      <div className="max-w-7xl mx-auto px-4">

        <AnimatePresence mode="wait">

          {!selectedCategory ? (

            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >

              {Object.entries(portfolioData).map(
                ([name, data]) => (

                  <motion.div
                    key={name}
                    whileHover={{ y: -8 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      setSelectedCategory(name)
                    }
                    className="group cursor-pointer p-8 rounded-3xl glass glow-border relative overflow-hidden h-[250px] flex flex-col justify-end"
                  >

                    <div
                      className="absolute inset-0 group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${data.bannerImg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />

                    {/* ⭐ Better overlay */}

                    <div className="absolute inset-0 bg-black/65 group-hover:bg-black/45 transition-all duration-300" />

                    <div className="relative z-10">

                      <div className="mb-3 inline-flex p-2 rounded-xl bg-primary/20 text-primary">
                        {data.icon}
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-1">
                        {name}
                      </h3>

                      <p className="text-gray-300 text-sm">
                        {data.description}
                      </p>

                    </div>

                  </motion.div>

                )
              )}

            </motion.div>

          ) : (

            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              <div className="relative h-[230px] rounded-3xl overflow-hidden mb-10">

                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${currentCategoryData?.bannerImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                />

                <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-10">

                  <button
                    onClick={() =>
                      setSelectedCategory(null)
                    }
                    className="flex items-center text-primary hover:text-white mb-4 transition"
                  >

                    <ArrowLeft size={20} className="mr-2" />

                    Back to Categories

                  </button>

                  <h2 className="text-4xl font-bold text-white">
                    {selectedCategory} Projects
                  </h2>

                </div>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {currentCategoryData?.videos.map(
                  (id, i) => (

                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg"
                    >

                      <iframe
                        src={getEmbedUrl(id)}
                        title={`video-${id}`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />

                    </motion.div>

                  )
                )}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </div>
    </section>
  );
};

export default PortfolioSection;