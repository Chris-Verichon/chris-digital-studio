import type { Project } from "@/types/project";

/**
 * Placeholder portfolio cases.
 * Replace titles, descriptions and `url` with real content when available;
 * the rendering layer is fully driven by this array.
 */
export const projects: Project[] = [
  {
    id: "digital-twin",
    title: { fr: "Jumeau Numérique", en: "Digital Twin" },
    tagline: {
      fr: "Configurateur 3D temps réel",
      en: "Real-time 3D configurator",
    },
    description: {
      fr: "Une expérience produit interactive où l'utilisateur manipule, configure et explore un objet en 3D dans son navigateur.",
      en: "An interactive product experience where users manipulate, configure and explore a 3D object right in the browser.",
    },
    tags: ["WebGL", "React Three Fiber", "Configurator"],
    accent: "#5ef3ff",
  },
  {
    id: "spatial-estate",
    title: { fr: "Immobilier Spatial", en: "Spatial Estate" },
    tagline: {
      fr: "Visite immersive et navigation 3D",
      en: "Immersive tour and 3D navigation",
    },
    description: {
      fr: "Une plateforme immobilière immersive : visites virtuelles fluides, navigation spatiale et mise en scène cinématique des espaces.",
      en: "An immersive real-estate platform: smooth virtual tours, spatial navigation and cinematic staging of spaces.",
    },
    tags: ["Three.js", "GSAP", "UX"],
    accent: "#b15bff",
  },
  {
    id: "saas-nebula",
    title: { fr: "SaaS Nebula", en: "SaaS Nebula" },
    tagline: {
      fr: "Dataviz complexe & UI/UX",
      en: "Complex dataviz & UI/UX",
    },
    description: {
      fr: "Un tableau de bord SaaS où la donnée complexe devient lisible grâce à la profondeur, au mouvement et à une UI soignée.",
      en: "A SaaS dashboard where complex data becomes legible through depth, motion and a polished UI.",
    },
    tags: ["Next.js", "Dataviz", "Design System"],
    accent: "#6effa6",
  },
];
