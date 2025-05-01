import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image de fond avec zoom lent */}
      <img
        src="/hero.webp"
        alt="Nettoyage de toiture"
        className="absolute inset-0 w-full h-full object-cover scale-100 animate-slow-zoom"
      />

      {/* Overlay dégradé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"
      />

      {/* Contenu */}
      <div className="relative z-10 text-center text-white max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold text-blue-300 mb-3 tracking-wider"
        >
          SERVICE PROFESSIONNEL DE NETTOYAGE À HAUTE PRESSION
        </motion.div>

        <motion.h2
          initial={false} // pas d'animation d'apparition
          animate={{ y: 0 }} // ou rien du tout
          transition={{ duration: 0 }} // instantané
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md"
        >
          Redonnez vie à vos surfaces{" "}
          <span className="text-blue-300">extérieures</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
        >
          Un nettoyage puissant et précis pour transformer l'apparence de votre
          propriété
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 hover:scale-105 transform"
          >
            Estimation gratuite
            <ArrowRight size={20} />
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white/20 backdrop-blur-sm text-white border border-white/40 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/30 transition-all duration-300 hover:border-white/60"
          >
            Nos services
          </a>
        </motion.div>
      </div>
    </div>
  );
}
