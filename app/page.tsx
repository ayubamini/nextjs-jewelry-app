"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";

// Mock data for jewelry items
const jewelryItems = [
  {
    id: 1,
    name: "Royal Sapphire Necklace",
    category: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&crop=faces,center",
    price: "$4,800",
  },
  {
    id: 2,
    name: "Diamond Infinity Bracelet",
    category: "Bracelets",
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=600&fit=crop&crop=faces,center",
    price: "$3,200",
  },
  {
    id: 3,
    name: "Pearl Teardrop Earrings",
    category: "Earrings",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop&crop=faces,center",
    price: "$1,800",
  },
  {
    id: 4,
    name: "Emerald Halo Ring",
    category: "Rings",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&crop=faces,center",
    price: "$5,600",
  },
  {
    id: 5,
    name: "Ruby Cascade Pendant",
    category: "Pendants",
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=600&fit=crop&crop=faces,center",
    price: "$3,900",
  },
  {
    id: 6,
    name: "Gold Filigree Brooch",
    category: "Brooches",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=600&h=600&fit=crop&crop=faces,center",
    price: "$2,400",
  },
];

// Mock data for product details
const products = {
  1: {
    id: 1,
    name: "Royal Sapphire Necklace",
    category: "Necklaces",
    price: "$4,800",
    description:
      "A masterpiece of design featuring a brilliant blue sapphire embraced by hand-set diamonds. Every facet has been carefully crafted to capture light in a mesmerizing dance that brings the piece to life.",
    features: [
      "Ethically sourced 3-carat sapphire",
      "18K white gold setting",
      "Hand-set diamonds (1.2 carats total)",
      "Signature clasp with hidden security",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop&crop=faces,center",
    ],
  },
  2: {
    id: 2,
    name: "Diamond Infinity Bracelet",
    category: "Bracelets",
    price: "$3,200",
    description:
      "The Infinity Bracelet symbolizes endless beauty with its flowing design of diamonds set in premium metal. Each stone is placed to maximize brilliance and create a seamless circle of light.",
    features: [
      "VS clarity diamonds (0.8 carats total)",
      "Available in 18K white, yellow, or rose gold",
      "Adjustable sizing with secure locking mechanism",
      "Custom gift box included",
    ],
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1630019852942-7a3592438490?w=800&h=800&fit=crop&crop=faces,center",
    ],
  },
  3: {
    id: 3,
    name: "Pearl Teardrop Earrings",
    category: "Earrings",
    price: "$1,800",
    description:
      "South Sea pearls of exceptional luster are suspended in a teardrop frame of pavé diamonds. The subtle movement creates a mesmerizing play of light against the creamy iridescence of the pearls.",
    features: [
      "10mm South Sea pearls",
      "18K white gold settings",
      "Pavé-set diamonds (0.5 carats total)",
      "Comfortable secure backs",
    ],
    images: [
      "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop&crop=faces,center",
    ],
  },
  4: {
    id: 4,
    name: "Emerald Halo Ring",
    category: "Rings",
    price: "$5,600",
    description:
      "A stunning Colombian emerald takes center stage in this halo design. The rich green gem is surrounded by meticulously set diamonds that enhance its natural beauty and depth of color.",
    features: [
      "2.1 carat Colombian emerald",
      "Platinum setting",
      "Diamond halo (0.9 carats total)",
      "Comfort-fit band design",
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&h=800&fit=crop&crop=faces,center",
    ],
  },
  5: {
    id: 5,
    name: "Ruby Cascade Pendant",
    category: "Pendants",
    price: "$3,900",
    description:
      "Inspired by flowing water, this cascade pendant features graduated rubies of exceptional color. The stones appear to dance as they catch the light, creating a dynamic piece that draws the eye.",
    features: [
      "Burmese rubies (1.5 carats total)",
      "18K white gold setting",
      "18-inch adjustable chain included",
      "Hand-fabricated by master jewelers",
    ],
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1625302118168-4e30cc0211f9?w=800&h=800&fit=crop&crop=faces,center",
    ],
  },
  6: {
    id: 6,
    name: "Gold Filigree Brooch",
    category: "Brooches",
    price: "$2,400",
    description:
      "This intricate filigree brooch showcases the ancient art of metalwork with its delicate patterns. Each curve and twist is handcrafted by artisans who have perfected this traditional technique.",
    features: [
      "18K yellow gold",
      "Hand-twisted filigree work",
      "Vintage-inspired design",
      "Triple safety clasp",
    ],
    images: [
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.unsplash.com/photo-1631982690223-8aa5853c3301?w=800&h=800&fit=crop&crop=faces,center",
      "https://images.pexels.com/photos/9953654/pexels-photo-9953654.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
    ],
  },
};

interface ProductDetailProps {
  productId: number;
  onClose: () => void;
}

// Navigation Component with Enhanced Animations
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black bg-opacity-85 backdrop-blur-md py-3 border-b border-gold-800"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo with enhanced elegant animation */}
          <motion.a
            href="#home"
            className="relative group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="logo text-4xl tracking-wider text-white">
              AU<span className="text-gold-400">RUM</span>
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></span>
          </motion.a>

          {/* Desktop Navigation with luxury styling and animation */}
          <nav className="hidden md:flex items-center">
            <div className="h-8 mx-6 w-px bg-gradient-to-b from-transparent via-gold-800 to-transparent opacity-30"></div>

            <div className="flex space-x-10 uppercase-tracked text-sm font-light text-white">
              {[
                { name: "Home", href: "#home" },
                { name: "Collection", href: "#gallery" },
                { name: "Craftsmanship", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative group py-1 px-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ y: -3 }}
                >
                  <span className="transition-colors uppercase tracking-widest text-sm font-light text-white group-hover:text-gold-300 transition-all duration-500">
                    {item.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                </motion.a>
              ))}
            </div>

            <div className="h-8 mx-6 w-px bg-gradient-to-b from-transparent via-gold-800 to-transparent opacity-30"></div>

            {/* Book Appointment Button with hover animation */}
            <motion.a
              href="#appointment"
              className={`px-5 py-1.5 border border-gold-700 text-gold-400 hover:bg-gradient-to-r hover:from-gold-900 hover:to-black hover:border-gold-400 hover:text-gold-300 transition-all duration-500 uppercase tracking-widest text-sm font-light ml-2`}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              Book Appointment
            </motion.a>
          </nav>

          {/* Mobile Menu Button with elegant animation */}
          <motion.button
            className="md:hidden focus:outline-none text-white z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-7 h-5">
              <span
                className={`absolute h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 w-7 top-2" : "w-7 top-0"}`}
              ></span>
              <span
                className={`absolute h-0.5 bg-current rounded-full transition-all duration-300 ease-in-out ${isOpen ? "opacity-0 left-3 w-0" : "opacity-100 w-5 left-1 top-2"}`}
              ></span>
              <span
                className={`absolute h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 w-7 top-2" : "w-6 top-4 left-1"}`}
              ></span>
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* Luxurious Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 flex"
          >
            {/* Left blurred dark panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-1/3 bg-black bg-opacity-90 backdrop-blur-lg"
            />

            {/* Main content area */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="flex-1 bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center"
            >
              <div className="px-12">
                {/* Logo in mobile menu with animation */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-4xl tracking-wider text-white">
                    AU<span className="text-gold-400">RUM</span>
                  </span>
                  <motion.div
                    className="h-px w-24 mt-4 bg-gradient-to-r from-gold-600 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "6rem" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.div>
                </motion.div>

                <nav className="flex flex-col space-y-8">
                  {[
                    { name: "Home", href: "#home" },
                    { name: "Collection", href: "#gallery" },
                    { name: "Craftsmanship", href: "#about" },
                    { name: "Contact", href: "#contact" },
                  ].map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
                      className="text-white hover:text-gold-400 transition-colors uppercase tracking-widest text-xl font-light flex items-center group"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 10, color: "#D4AF37" }}
                    >
                      <span className="w-0 group-hover:w-6 h-px bg-gold-400 mr-0 group-hover:mr-4 transition-all duration-300 ease-in-out"></span>
                      {item.name}
                    </motion.a>
                  ))}
                </nav>

                {/* Appointment button in mobile with animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-12"
                >
                  <motion.a
                    href="#appointment"
                    className="inline-block px-6 py-2 border border-gold-700 text-gold-400 hover:bg-gradient-to-r hover:from-gold-900 hover:to-black hover:border-gold-400 hover:text-gold-300 transition-all duration-500 uppercase tracking-widest text-sm font-light"
                    onClick={() => setIsOpen(false)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
                    }}
                  >
                    Book Appointment
                  </motion.a>
                </motion.div>
              </div>

              {/* Decorative element with animation */}
              <motion.div
                className="absolute bottom-0 right-0 w-40 h-40 border-r border-b border-gold-800 opacity-50"
                initial={{ width: 0, height: 0 }}
                animate={{ width: "10rem", height: "10rem" }}
                transition={{ duration: 1, delay: 0.8 }}
              ></motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// About Section Component with Enhanced Animations
const AboutSection = () => {
  // Animation variants for features
  const featureVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: 0.2 * i,
      },
    }),
  };

  return (
    <section id="about" className="bg-gray-950 py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl mb-6 tracking-wide text-gold-400"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            The Art of Fine Jewelry
          </motion.h2>
          <motion.p
            className="text-gray-400 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            At AURUM, we believe that every piece of jewelry tells a story of
            passion, precision, and unparalleled craftsmanship.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 md:order-1"
          >
            <motion.h3
              className="text-2xl mb-6 tracking-wide text-gold-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Handcrafted Excellence
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-6 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Each creation begins as a concept, meticulously designed and
              refined. Our gemologists select only the finest ethically sourced
              stones, ensuring exceptional quality and brilliance in every
              piece.
            </motion.p>
            <motion.p
              className="text-gray-400 mb-8 leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              From the initial sketch to the final polish, our jewelry passes
              through the hands of skilled artisans who have dedicated their
              lives to perfecting their craft. The result is wearable art that
              captures the imagination and becomes a cherished heirloom.
            </motion.p>
            <motion.a
              href="#craftsmanship"
              className="text-xs uppercase tracking-widest border-b border-gold-400 pb-1 text-gold-400 hover:text-gold-300 hover:border-gold-300 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{
                x: 5,
                borderBottomWidth: "2px",
                color: "rgba(212, 175, 55, 0.9)",
              }}
            >
              Discover Our Process
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 md:order-2 relative"
          >
            <motion.div
              className="aspect-[4/5] relative z-10 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=faces,center"
                alt="Jewelry craftsmanship"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-full h-full border border-gold-800 z-0"
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              ),
              title: "Exceptional Materials",
              description:
                "We source only the finest gemstones and precious metals, each personally selected by our master gemologists.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              ),
              title: "Artisanal Craftsmanship",
              description:
                "Each piece is meticulously handcrafted by our artisans, many of whom come from generations of jewelry makers.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: "Ethical Standards",
              description:
                "We adhere to the highest ethical standards in sourcing our materials and are committed to responsible practices.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={featureVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center p-8 transition-all hover:bg-gray-900 border border-gray-800"
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                borderColor: "#D4AF37",
                backgroundColor: "rgba(20, 20, 25, 0.95)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="inline-block mb-6 text-gold-400"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                className="text-xl mb-4 text-gold-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-gray-400 font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Luxury Footer Component with Animations
const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-b from-gray-950 to-black text-gray-300 pt-24 pb-12"
    >
      <div className="container mx-auto px-6">
        {/* Decorative element with animation */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "auto" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="w-20 h-px bg-gradient-to-r from-gold-500 to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          <motion.div
            className="absolute top-3 left-0 w-12 h-px bg-gradient-to-r from-gold-400 to-transparent"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-5xl tracking-wider mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AU
              <motion.span
                className="text-gold-400"
                animate={{
                  color: ["#D4AF37", "#FFF8E1", "#D4AF37"],
                  textShadow: [
                    "0 0 5px rgba(212, 175, 55, 0.3)",
                    "0 0 15px rgba(212, 175, 55, 0.5)",
                    "0 0 5px rgba(212, 175, 55, 0.3)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                RUM
              </motion.span>
            </motion.h3>
            <motion.p
              className="text-gray-300 mb-8 font-light max-w-md text-base leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Handcrafted luxury jewelry that celebrates the art of fine
              craftsmanship and timeless design. Each piece is meticulously
              created by our master artisans to become an heirloom treasure.
            </motion.p>
            <motion.div
              className="flex space-x-8 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Social media icons with elegant hover effect */}
              {/* Social Media Icons */}
              <motion.a
                href="#instagram"
                className="text-gray-400 hover:text-gold-400 transition-all duration-300 relative group"
                aria-label="Instagram"
                whileHover={{ y: -5, color: "#D4AF37" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="h-6 w-6" />
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </motion.a>
              <motion.a
                href="#facebook"
                className="text-gray-400 hover:text-gold-400 transition-all duration-300 relative group"
                aria-label="Facebook"
                whileHover={{ y: -5, color: "#D4AF37" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookF className="h-6 w-6" />
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </motion.a>
              <motion.a
                href="#pinterest"
                className="text-gray-400 hover:text-gold-400 transition-all duration-300 relative group"
                aria-label="Pinterest"
                whileHover={{ y: -5, color: "#D4AF37" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPinterestP className="h-6 w-6" />
                <span className="absolute -bottom-2 left-0 w-full h-px bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3
              className="text-lg uppercase tracking-wider font-medium mb-8 text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore
            </motion.h3>
            <ul className="space-y-5">
              {[
                { name: "Collection", href: "#gallery" },
                { name: "Craftsmanship", href: "#about" },
                { name: "Bespoke Creations", href: "#custom" },
                { name: "Care Guide", href: "#care" },
              ].map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <motion.a
                    href={item.href}
                    className="text-gray-300 hover:text-gold-300 transition-colors text-base font-light relative group inline-block uppercase-tracked"
                    whileHover={{ x: 5, color: "#D4AF37" }}
                  >
                    <span>{item.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h3
              className="text-lg uppercase tracking-wider font-medium mb-8 text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.h3>
            <ul className="space-y-5 text-gray-300 text-base font-light">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="text-gold-500 mr-3 mt-1"
                  animate={{
                    y: [0, -3, 0],
                    color: ["#D4AF37", "#F1DBA3", "#D4AF37"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <HiOutlineLocationMarker className="h-5 w-5" />
                </motion.span>
                <span>
                  15 Artisan Avenue
                  <br />
                  New York, NY 10001
                </span>
              </motion.li>
              <motion.li
                className="flex items-start pt-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="text-gold-500 mr-3 mt-1"
                  animate={{
                    y: [0, -3, 0],
                    color: ["#D4AF37", "#F1DBA3", "#D4AF37"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  <HiOutlineMail className="h-5 w-5" />
                </motion.span>
                <span>appointment@aurum.com</span>
              </motion.li>
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <motion.span
                  className="text-gold-500 mr-3 mt-1"
                  animate={{
                    y: [0, -3, 0],
                    color: ["#D4AF37", "#F1DBA3", "#D4AF37"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                >
                  <HiOutlinePhone className="h-5 w-5" />
                </motion.span>
                <span>+1 (212) 555-0123</span>
              </motion.li>
            </ul>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="#book"
                className="text-sm uppercase tracking-widest border-b border-gold-500 pb-1 text-gold-400 hover:text-gold-300 hover:border-gold-300 transition-colors inline-block"
                whileHover={{
                  x: 5,
                  borderBottomWidth: "2px",
                  color: "#F1DBA3",
                }}
              >
                Book a Private Viewing
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Newsletter signup with animation */}
        <motion.div
          className="mt-20 mb-16 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h4
            className="text-lg uppercase tracking-wider font-medium mb-6 text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join Our Collectors List
          </motion.h4>
          <motion.p
            className="text-gray-400 mb-6 font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Be the first to preview new collections and receive invitations to
            exclusive events.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.input
              type="email"
              placeholder="Your email address"
              className="bg-gray-900 border border-gray-800 py-3 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-700 flex-1"
              whileFocus={{
                borderColor: "#D4AF37",
                boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              className="py-3 px-6 bg-black border border-gold-700 text-gold-400 hover:bg-gradient-to-r hover:from-gold-900 hover:to-black hover:border-gold-400 hover:text-gold-300 transition-all duration-300 uppercase tracking-widest text-sm cursor-pointer"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px rgba(212, 175, 55, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-gray-900 mt-12 pt-10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.p
            className="text-gray-400 text-base mb-6 md:mb-0 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            © {new Date().getFullYear()} AURUM. All rights reserved.
            Handcrafted with passion in New York.
          </motion.p>

          <motion.div
            className="flex space-x-8 text-base text-gray-400 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.a
              href="#privacy"
              className="hover:text-gold-400 transition-colors relative group"
              whileHover={{ color: "#D4AF37" }}
            >
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
            <motion.a
              href="#terms"
              className="hover:text-gold-400 transition-colors relative group"
              whileHover={{ color: "#D4AF37" }}
            >
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

// ProductDetail Component with Enhanced Animations
const ProductDetail = ({ productId, onClose }: ProductDetailProps) => {
  const product = products[productId as keyof typeof products];
  const [activeImage, setActiveImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!product) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      id={`product-${productId}`}
      className="fixed inset-0 bg-white z-50 overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto px-6 py-12 md:py-16">
        <motion.button
          className="absolute right-6 top-6 text-black hover:text-gray-600 z-10 transition-colors"
          onClick={onClose}
          aria-label="Close"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          {/* Product Images with elegant animations */}
          <div className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="overflow-hidden bg-gray-50 aspect-square relative"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onLoad={() => setIsLoaded(true)}
                />
              </AnimatePresence>

              {/* Floating pulse animation on the active product */}
              {isLoaded && (
                <motion.div
                  className="absolute inset-0 border-2 border-black pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.2, 0],
                    scale: [1, 1.03, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4"
            >
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`overflow-hidden aspect-square cursor-pointer border-2 transition-all duration-300 ${
                    activeImage === index
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  onClick={() => setActiveImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: activeImage === index ? 1 : 0.7 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Product Details with staggered animations */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <div className="max-w-md">
              <motion.p
                variants={itemVariants}
                className="text-gray-400 tracking-widest uppercase product-category text-xs mb-1 text-gold-300"
              >
                {product.category}
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-4xl mb-4 text-gray-900 tracking-wide product-name"
              >
                {product.name}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-2xl text-black mb-8 font-light"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {product.price}
                </motion.span>
              </motion.p>

              <motion.div variants={itemVariants} className="mb-10">
                <motion.p
                  className="text-gray-600 leading-relaxed font-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {product.description}
                </motion.p>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-10">
                <motion.h2
                  className="text-sm uppercase tracking-widest mb-4 text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Details
                </motion.h2>
                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start text-gray-600 font-light"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      <motion.span
                        className="text-gray-400 mr-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.7 + index * 0.1 + 0.1,
                        }}
                      >
                        —
                      </motion.span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <motion.button
                  className="w-full py-4 bg-black text-white hover:bg-gray-900 transition duration-300 uppercase tracking-widest text-xs font-light cursor-pointer"
                  whileHover={{
                    backgroundColor: "#1c1c1c",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Private Viewing
                </motion.button>
                <motion.button
                  className="w-full py-4 border border-gray-300 text-gray-900 hover:border-black transition duration-300 uppercase tracking-widest text-xs font-light cursor-pointer"
                  whileHover={{
                    borderColor: "#000",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Wishlist
                </motion.button>
              </motion.div>

              {/* Deluxe badge with animation */}
              <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <motion.div
                  className="inline-flex items-center space-x-2 border border-gray-200 rounded-full px-4 py-1.5"
                  animate={{
                    borderColor: ["#e5e7eb", "#D4AF37", "#e5e7eb"],
                    boxShadow: [
                      "0 0 0 rgba(212, 175, 55, 0)",
                      "0 0 20px rgba(212, 175, 55, 0.3)",
                      "0 0 0 rgba(212, 175, 55, 0)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <svg
                    className="h-4 w-4 text-gold-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-xs text-gray-600 font-medium text-center">
                    AURUM Certified
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Testimonial Section Component with Enhanced Animations
const TestimonialSection = () => {
  // We'll add multiple testimonials
  const testimonials = [
    {
      quote:
        "The craftsmanship behind my Emerald Halo Ring is simply extraordinary. Each detail reveals the passion and expertise that went into creating this piece. It's not just jewelry; it's wearable art that I'll treasure for generations.",
      name: "Elizabeth Clarke",
      location: "New York",
    },
    {
      quote:
        "The Royal Sapphire Necklace exceeded all my expectations. The attention to detail is remarkable, and the way it catches the light is mesmerizing. AURUM has created something truly special that I'm proud to pass down as an heirloom.",
      name: "James Anderson",
      location: "London",
    },
    {
      quote:
        "Working with AURUM on my custom engagement ring was a dream. From selecting the perfect diamond to finalizing the design, their expertise and guidance made the process unforgettable. The result is beyond anything I imagined.",
      name: "Sophia Martinez",
      location: "Paris",
    },
  ];

  const [current, setCurrent] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearTimeout(timer);
  }, [current, testimonials.length]);

  return (
    <section className="bg-black py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative quote icon with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-10 w-10 text-gold-400 mx-auto mb-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </motion.div>

          {/* Testimonial carousel */}
          <div className="relative h-64 md:h-48">
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === current && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="absolute inset-0"
                    >
                      <motion.blockquote
                        className="text-xl md:text-2xl italic mb-8 leading-relaxed text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        &quot{testimonial.quote}&quot
                      </motion.blockquote>
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <p className="font-medium text-gold-300">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">
                          {testimonial.location}
                        </p>
                      </motion.div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Testimonial navigation dots */}
          <div className="flex justify-center space-x-3 mt-10">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full focus:outline-none transition-all duration-300`}
                animate={{
                  backgroundColor:
                    index === current
                      ? "rgba(212, 175, 55, 0.9)"
                      : "rgba(255, 255, 255, 0.3)",
                  scale: index === current ? 1.3 : 1,
                }}
                whileHover={{ scale: 1.5 }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-gold-800 opacity-20"
            initial={{ width: 0, height: 0 }}
            whileInView={{ width: 160, height: 160 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-gold-800 opacity-20"
            initial={{ width: 0, height: 0 }}
            whileInView={{ width: 160, height: 160 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

// Custom Carousel Component for Featured Items with Enhanced Animations
const FeaturedCarousel = ({
  items,
  onSelect,
}: {
  items: {
    id: number;
    name: string;
    category: string;
    image: string;
    price: string;
  }[];
  onSelect: (id: number) => void;
}) => {
  const [current, setCurrent] = useState(0);
  const length = items.length;
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  const nextSlide = () => {
    setDirection(1);
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000); // Auto advance every 5 seconds

    return () => clearTimeout(timer);
  }, [current]);

  // For slide transition variants
  const slideVariants = {
    enterFromRight: {
      x: "100%",
      opacity: 0,
    },
    enterFromLeft: {
      x: "-100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exitToLeft: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.5 },
    },
    exitToRight: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative w-full overflow-hidden h-full">
      {/* Navigation buttons with hover animations */}
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <motion.button
          onClick={prevSlide}
          className="p-2 bg-black bg-opacity-30 backdrop-blur-sm rounded-full text-gold-300 hover:bg-gold-400 hover:text-black transition-all"
          aria-label="Previous item"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(212, 175, 55, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <motion.button
          onClick={nextSlide}
          className="p-2 bg-black bg-opacity-30 backdrop-blur-sm rounded-full text-gold-300 hover:bg-gold-400 hover:text-black transition-all"
          aria-label="Next item"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(212, 175, 55, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>

      <div className="relative h-full">
        <AnimatePresence initial={false} custom={direction}>
          {items.map(
            (item, index) =>
              index === current && (
                <motion.div
                  key={item.id}
                  custom={direction}
                  variants={slideVariants}
                  initial={direction === 1 ? "enterFromRight" : "enterFromLeft"}
                  animate="center"
                  exit={direction === 1 ? "exitToLeft" : "exitToRight"}
                  className="absolute inset-0 z-20"
                >
                  <div className="h-full w-full relative">
                    {/* Image with subtle zoom effect */}
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: "easeOut" }}
                    />

                    {/* Gradient overlay with subtle animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          delay: 0.3,
                          staggerChildren: 0.1,
                        }}
                      >
                        <motion.p
                          className="product-category text-xs mb-1 text-gold-300"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          {item.category}
                        </motion.p>

                        <motion.h2
                          className="text-lg md:text-4xl mb-2 text-white product-name"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {item.name}
                        </motion.h2>

                        <motion.p
                          className="text-xl text-gold-200 mb-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          {item.price}
                        </motion.p>

                        <motion.button
                          onClick={() => onSelect(item.id)}
                          className="px-8 py-3 border border-gold-400 text-gold-300 hover:bg-gold-400 hover:text-black transition-all duration-300 uppercase tracking-widest text-sm cursor-pointer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(212, 175, 55, 0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Discover
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced indicator dots with active state animation */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-3">
        {items.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`w-2 h-2 rounded-full transition-all focus:outline-none`}
            animate={{
              backgroundColor:
                index === current
                  ? "rgba(212, 175, 55, 0.9)"
                  : "rgba(255, 255, 255, 0.5)",
              scale: index === current ? 1.3 : 1,
            }}
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.3 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Collection Gallery Component with Enhanced Animations
const CollectionGallery = ({
  items,
  onSelect,
}: {
  items: {
    id: number;
    name: string;
    category: string;
    image: string;
    price: string;
  }[];
  onSelect: (id: number) => void;
}) => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(items.map((item) => item.category))];

  const filteredItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  // Framer Motion variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section id="gallery" className="bg-black py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl mb-6 tracking-wide text-gold-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our Collection
          </motion.h2>
          <motion.p
            className="text-gray-400 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Explore our curated selection of fine jewelry, each piece a
            testament to the art of craftsmanship and timeless design.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-wrap justify-center space-x-1 md:space-x-2">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-xs tracking-widest uppercase m-1 transition-all cursor-pointer ${
                  filter === category
                    ? "bg-gold-400 text-black"
                    : "bg-gray-900 text-gray-400 hover:text-gold-400 border border-gray-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    filter === category
                      ? "0 0 15px rgba(212, 175, 55, 0.5)"
                      : "0 0 10px rgba(212, 175, 55, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover="hover"
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="group cursor-pointer"
                onClick={() => onSelect(item.id)}
              >
                <div className="overflow-hidden bg-gray-900 relative">
                  <motion.div
                    className="aspect-square overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 product-name"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 1.2 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.7 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <motion.div
                    className="p-6 text-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p
                      className="text-gold-300 tracking-widest uppercase mb-1 product-category text-xs text-gold-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {item.category}
                    </motion.p>
                    <motion.h3
                      className="group-hover:text-gold-200 product-name text-lg mb-2 text-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.h3>
                    <motion.p
                      className="text-gold-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {item.price}
                    </motion.p>

                    {/* Hidden 'View Details' button that appears on hover */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="px-4 py-2 bg-black bg-opacity-70 text-gold-300 text-xs uppercase tracking-widest border border-gold-500"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        View Details
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default function JewelryGallery() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const featuredRef = useRef<HTMLElement>(null);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add a scroll progress indicator state
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="bg-black text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gold-400 z-50"
        style={{
          width: `${scrollProgress}%`,
          opacity: scrollProgress > 3 ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 3 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated cursor follower for luxury effect */}
      <AnimatedCursorFollower />

      {/* Enhanced Navigation */}
      <Navigation />

      {/* Enhanced Hero Section */}
      <section id="home" className="h-screen relative overflow-hidden">
        {/* Video Background with fade-in animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute h-full w-full object-cover"
            poster="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&crop=faces,center"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-jeweler-polishing-a-ring-22737-large.mp4"
              type="video/mp4"
            />
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=1080&fit=crop&crop=faces,center"
              alt="Jewelry craftsmanship"
              className="absolute h-full w-full object-cover"
            />
          </video>
        </motion.div>

        {/* Gradient overlay with pulsing animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Animated logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.h1
              className="text-5xl md:text-7xl mb-6 text-gold-400 tracking-wide"
              initial={{ letterSpacing: "0.05em" }}
              animate={{ letterSpacing: "0.1em" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              AURUM
            </motion.h1>
          </motion.div>

          {/* Text reveal with staggered animation */}
          <motion.p
            className="text-xl md:text-2xl text-gold-100 mb-10 max-w-2xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.span
              initial={{ backgroundPosition: "-100% 0" }}
              animate={{ backgroundPosition: "200% 0" }}
              transition={{ duration: 3, delay: 1.2, ease: "easeInOut" }}
              style={{
                backgroundSize: "200%",
                backgroundImage:
                  "linear-gradient(90deg, #D4AF37, #FFFFFF, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Handcrafted Luxury Jewelry — Each Piece Tells a Unique Story
            </motion.span>
          </motion.p>

          {/* Buttons with staggered entrance and hover effects */}
          <motion.div
            className="space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.a
              href="#gallery"
              className="px-8 py-3 bg-gold-400 text-black hover:bg-gold-300 transition duration-300 uppercase tracking-widest text-xs cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Collection
            </motion.a>
            <motion.button
              onClick={scrollToFeatured}
              className="px-8 py-3 border border-gold-400 text-gold-300 hover:bg-gold-900 hover:text-gold-200 transition duration-300 uppercase tracking-widest text-xs cursor-pointer"
              whileHover={{
                scale: 1.05,
                borderWidth: "2px",
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              Featured Pieces
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator with continuous animation */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        >
          <a href="#featured" className="text-gold-300">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </a>
        </motion.div>
      </section>

      {/* Enhanced Featured Collection */}
      <section ref={featuredRef} id="featured" className="h-screen bg-black">
        <FeaturedCarousel
          items={jewelryItems.slice(0, 4)}
          onSelect={setSelectedProduct}
        />
      </section>

      {/* Enhanced Collection Gallery */}
      <CollectionGallery items={jewelryItems} onSelect={setSelectedProduct} />

      {/* Enhanced About Section */}
      <AboutSection />

      {/* Enhanced Testimonial Section */}
      <TestimonialSection />

      {/* Enhanced Footer */}
      <Footer />

      {/* Enhanced Product Detail Modal */}
      <AnimatePresence mode="wait">
        {selectedProduct && (
          <ProductDetail
            productId={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

// Custom Animated Cursor Follower Component
const AnimatedCursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable elements
      const element = document.elementFromPoint(e.clientX, e.clientY);
      const clickable = element?.closest(
        'a, button, [role="button"], input, select, textarea'
      );
      setIsPointer(!!clickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Large outer circle - follows cursor with delay */}
      <motion.div
        className="fixed w-12 h-12 rounded-full pointer-events-none z-50"
        style={{
          backgroundColor: isPointer
            ? "rgba(212, 175, 55, 0.1)"
            : "transparent",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          mixBlendMode: "difference",
        }}
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.6,
          damping: 20,
          stiffness: 300,
          restDelta: 0.001,
        }}
      />

      {/* Small inner dot - follows cursor exactly */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-gold-300 pointer-events-none z-50"
        style={{ mixBlendMode: "difference" }}
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          damping: 20,
          stiffness: 1000,
          restDelta: 0.001,
        }}
      />
    </>
  );
};
