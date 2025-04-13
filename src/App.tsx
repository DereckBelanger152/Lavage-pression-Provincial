import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  Check,
  ArrowRight,
  Building2,
  Home,
  Factory,
  Shield,
  ArrowUp,
  Menu,
  X,
  Star,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaInstagram, FaTiktok } from "react-icons/fa";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import ContactForm from "./components/ContactForm";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // New function to handle smooth scrolling when navbar links are clicked
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Get the navbar height to offset the scroll position
      const navbarElement = document.querySelector("nav");
      const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;

      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close the mobile menu if it's open
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Merci pour votre message! Nous vous contacterons bientôt.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const navItems = [
    { href: "#about", label: "À Propos" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Galerie" },
    { href: "#testimonials", label: "Témoignages" },
    { href: "#contact", label: "Contact" },
  ];

  const galleryImages = [
    {
      image: "/gallerie1.jpg",
      title: "Projet Résidentiel",
      description: "Application de scellant sur une toiture métallique.",
    },
    {
      image: "/gallerie2.jpg",
      title: "Toiture Commerciale",
      description: "Produit final de décapage de toiture métallique.",
    },
    {
      image: "/gallerie3.jpg",
      title: "Toiture Métallique",
      description: "Avant/Après de notre service de décapage.",
    },
    {
      image: "/gallerie4.jpg",
      title: "Toiture Grande Surface",
      description: "Nettoyage en profondeur d'une usine.",
    },
    {
      image: "/gallerie5.jpg",
      title: "Toiture de Grange",
      description: "Avant/Après de notre service de décapage.",
    },
    {
      image: "/gallerie6.jpg",
      title: "Toiture Résidentielle",
      description: "Nettoyage et entretien de toiture.",
    },
  ];

  const advantages = [
    {
      icon: <Shield size={32} />,
      title: "Entièrement Assuré",
      description:
        "Tranquillité d'esprit totale avec notre couverture d'assurance complète.",
    },
    {
      icon: <Check size={32} />,
      title: "Satisfaction Garantie",
      description: "Nous ne sommes pas satisfaits tant que vous ne l'êtes pas.",
    },
    {
      icon: <Clock size={32} />,
      title: "Service Rapide",
      description: "Intervention rapide et efficace pour tous vos besoins.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Company Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center cursor-pointer"
              onClick={scrollToTop}
            >
              <img
                src="/logonobackground.png"
                alt="Lavage à pression Provincial Logo"
                className="w-10 h-10 mr-3"
                width="40"
                height="40"
              />
              <h1 className="text-blue-600 text-xl md:text-2xl font-bold">
                Lavage à pression Provincial
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavLinkClick(e, item.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:(581)996-0767" // Updated number
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <Phone size={18} />
                <span>Appelez-Nous</span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <div className="py-2 px-3">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 rounded-md transition-colors"
                      onClick={(e) => handleNavLinkClick(e, item.href)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="tel:5819960767"
                    className="flex items-center gap-2 text-blue-600 font-semibold py-3 px-2 mt-2 hover:bg-blue-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone size={18} />
                    <span>Appelez-nous</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/headerpressure.mp4"
          autoPlay
          loop
          muted
          playsInline
        ></video>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 backdrop-blur-sm"
        />
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative text-center w-full max-w-4xl px-4 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-semibold text-blue-400 mb-3"
          >
            SERVICE PROFESSIONNEL DE NETTOYAGE À HAUTE PRESSION
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Redonnez vie à vos surfaces{" "}
            <span className="text-blue-400">extérieures</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Un nettoyage puissant et précis pour transformer l'apparence de
            votre propriété
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
            >
              Estimation gratuite
              <ArrowRight size={20} />
            </a>
            <a
              href="#services"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Nos services
            </a>
          </motion.div>
        </motion.div>
      </div>
      {/* Quick Info Bar */}
      <div className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>(581) 996-0767</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>contact@lavageapressionprovincial.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>Québec, Canada</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>Lun-Ven: 8h-18h</span>
            </div>
          </div>
        </div>
      </div>
      {/* About Section */}
      <div id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-lg z-0"></div>
                <img
                  src="/notreequipe.jpg"
                  alt="Notre équipe"
                  className="rounded-lg shadow-xl relative z-10 w-full h-auto"
                  width="600"
                  height="400"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-lg z-0"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-2 text-blue-600 font-semibold">
                À PROPOS DE NOUS
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                À propos de Lavage à pression Provincial
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Découvrez notre expertise dans le nettoyage haute pression.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Équipement professionnel</p>
                    <p className="text-gray-600 text-sm">
                      Technologie de pointe
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Personnel qualifié</p>
                    <p className="text-gray-600 text-sm">
                      Formé aux techniques modernes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Écologique</p>
                    <p className="text-gray-600 text-sm">
                      Produits respectueux de l'environnement
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-1">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Service complet</p>
                    <p className="text-gray-600 text-sm">
                      De l'évaluation à la finition
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">2+</h3>
                  <p className="text-gray-600 text-sm">Années d'expérience</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">50+</h3>
                  <p className="text-gray-600 text-sm">Clients satisfaits</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">
                    100%
                  </h3>
                  <p className="text-gray-600 text-sm">Satisfaction garantie</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-2 text-blue-600 font-semibold">
              CE QUE NOUS OFFRONS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Services de nettoyage haute pression professionnels
            </h2>
            <p className="text-lg text-gray-600">
              De l'entretien résidentiel aux projets commerciaux et industriels,
              nous avons l'expertise et l'équipement nécessaires pour tous vos
              besoins de nettoyage extérieur.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Building2 size={32} />}
              title="Décapage de Toiture Métallique"
              description="Préparation experte des toits métalliques avant peinture, assurant une adhérence et une longévité parfaites. Notre procédé élimine rouille, débris et anciens revêtements pour garantir une surface idéale pour l'application de nouveaux traitements protecteurs."
            />
            <ServiceCard
              icon={<Home size={32} />}
              title="Nettoyage Extérieur Résidentiel"
              description="Nettoyage complet du revêtement, des soffites et des gouttières pour maintenir l'apparence de votre maison. Notre service élimine moisissures, algues et saletés incrustées, redonnant à votre propriété son éclat d'origine tout en prolongeant la durée de vie de vos matériaux extérieurs."
            />
            <ServiceCard
              icon={<Factory size={32} />}
              title="Nettoyage de bâtiments agricoles"
              description="Je vous propose un service professionnel de lavage à haute pression et de désinfection, adapté aux bâtiments agricoles comme les porcheries. On respecte les normes de biosécurité en vigueur, on utilise des produits approuvés par le MAPAQ et l'ACIA, et on s'assure que tout est fait dans les règles."
            />
            <ServiceCard
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 7H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 11V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15 11V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="Nettoyage de Terrasse & Patio"
              description="Restaurez l'éclat de vos espaces extérieurs avec notre service de nettoyage professionnel pour terrasses et patios. Notre équipement spécialisé élimine en profondeur les taches, la mousse et les moisissures, redonnant vie à vos bois, composites ou dalles sans les endommager, pour des espaces de vie extérieurs impeccables."
            />
            <ServiceCard
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 8C21 12.4183 16.9706 16 12 16C7.02944 16 3 12.4183 3 8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M14 19L12 16L10 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 16V21" stroke="currentColor" strokeWidth="2" />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
              title="Nettoyage de Gouttières"
              description="Protégez votre propriété contre les dégâts d'eau avec notre service d'entretien et de nettoyage des gouttières. Nous délogeons feuilles, débris et accumulations qui obstruent l'écoulement, prévenons l'infiltration d'eau et les dommages structurels, et prolongeons la durée de vie de votre système d'évacuation des eaux pluviales."
            />
            <ServiceCard
              icon={
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 12L12 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 12L16 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              title="Nettoyage sous pression"
              description="Éliminez efficacement la saleté, les moisissures et les taches tenaces de toutes vos surfaces extérieures. Notre équipement de pointe ajuste la pression selon le matériau traité pour un nettoyage en profondeur sans dommage. Idéal pour les entrées, murs, clôtures et toute surface nécessitant une remise à neuf éclatante."
            />
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">
                Transformez l'apparence de votre propriété dès aujourd'hui
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                Contactez-nous dès aujourd'hui pour une évaluation gratuite et
                découvrez comment notre expertise peut vous aider.
              </p>
              <div className="flex flex-wrap gap-4">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                  >
                    <div className="text-white">{advantage.icon}</div>
                    <span>{advantage.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <a
                href="#contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Obtenir un devis gratuit
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery Section */}
      <div id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-2 text-blue-600 font-semibold">
              NOS RÉALISATIONS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Galerie de projets de nettoyage haute pression
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez nos transformations les plus spectaculaires à travers
              notre galerie de projets complétés.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-64 overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white w-full">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-gray-200 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonials Section */}
      <div id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-2 text-blue-600 font-semibold">
              CE QUE DISENT NOS CLIENTS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Témoignages de nos clients satisfaits
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez ce que nos clients satisfaits disent de notre service et
              de notre expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              text="Service exceptionnel ! Ils ont complètement transformé l'apparence de ma maison. L'équipe était professionnelle et efficace du début à la fin."
              author="Marie Dubois"
              role="Propriétaire"
            />
            <TestimonialCard
              text="Professionnels, ponctuels et efficaces. Je les recommande vivement pour tout projet commercial. Notre façade n'a jamais été aussi propre."
              author="Jean Tremblay"
              role="Gestionnaire Commercial"
            />
            <TestimonialCard
              text="Excellent travail sur notre toiture métallique. Résultat impeccable ! La préparation avant peinture était exactement ce dont nous avions besoin."
              author="Sophie Martin"
              role="Entrepreneur"
            />
          </div>
        </div>
      </div>
      {/* Process Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="mb-2 text-blue-600 font-semibold">
              NOTRE APPROCHE
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Notre processus de nettoyage en 4 étapes
            </h2>
            <p className="text-lg text-gray-600">
              Un processus simple et efficace pour des résultats exceptionnels.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Consultation",
                description: "Évaluation gratuite de vos besoins spécifiques.",
              },
              {
                number: "02",
                title: "Planification",
                description: "Élaboration d'un plan de nettoyage adapté.",
              },
              {
                number: "03",
                title: "Exécution",
                description:
                  "Nettoyage professionnel avec équipement de pointe.",
              },
              {
                number: "04",
                title: "Inspection",
                description:
                  "Vérification finale pour garantir votre satisfaction.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-blue-50 rounded-lg p-6 h-full">
                  <div className="text-5xl font-bold text-blue-200 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="text-blue-300" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {/* Commitment Section */}
      <div id="engagement" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <Shield size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              Engagement de Lavage à pression Provincial
            </h2>
            <p className="text-xl mb-8">
              Peu importe la surface — si elle peut être nettoyée sous pression,
              nous pouvons nous en occuper !
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Check size={24} />
                <span>Évaluation gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={24} />
                <span>Technique experte</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={24} />
                <span>Équipement haute performance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Contact Section */}
      <ContactForm />
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Lavage à pression Provincial - Services professionnels
              </h3>
              <p className="text-gray-400">
                Services professionnels de nettoyage haute pression pour tous
                vos besoins.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contactez-nous</h3>
              <div className="space-y-2">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400"
                >
                  <Phone size={20} />
                  (581) 996-0767
                </a>
                <a
                  href="mailto:info@example.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400"
                >
                  <Mail size={20} />
                  contact@lavageapressionprovincial.com
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">
                Suivez-nous sur les réseaux sociaux
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61561781400841"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/tonprofil"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/tonprofil"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@lavage.pression.pr?fbclid=IwY2xjawJnzFFleHRuA2FlbQIxMAABHtNOTj0aA11fbww1DhHM_uPTT9Z__ZHbKP4Wfbq63B8WQovgb2JJd2_62jQj_aem_RgbKAm-LbHTy1sxtm7_hMg"
                  className="text-gray-400 hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2025 Dereck Bélanger - Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Add Analytics */}
      <Analytics />
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function TestimonialCard({
  text,
  author,
  role,
}: {
  text: string;
  author: string;
  role: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-1 text-yellow-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} fill="currentColor" />
        ))}
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}

export default App;
