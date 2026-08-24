import type { ImageMetadata } from "astro";
import ashyn from "../assets/images/general/ashyn_scientific_ruins.webp";
import canticle from "../assets/images/general/canticle_scientific_thermal.webp";
import firstOfTheSun from "../assets/images/general/first_of_the_sun_scientific_islands.webp";
import komashi from "../assets/images/general/komashi_scientific_steam.webp";
import lumar from "../assets/images/general/lumar_scientific_ocean.webp";
import nalthis from "../assets/images/general/nalthis_scientific_biosphere.webp";
import roshar from "../assets/images/general/roshar_scientific_landscape.webp";
import scadrial from "../assets/images/general/scadrial_scientific_landscape.webp";
import sel from "../assets/images/general/sel_scientific_regions.webp";
import taldain from "../assets/images/general/taldain_scientific_desert.webp";
import threnody from "../assets/images/general/threnody_scientific_forest.webp";
import rosharGeology from "../assets/images/general/roshar_geology_study.webp";
import canticleThermalBoundary from "../assets/images/general/canticle_thermal_boundary.webp";
import scadrialRedFields from "../assets/images/general/scadrial_red_fields.webp";
import nalthisFeature from "../assets/images/general/nalthis_feature.webp";
import taldainSandscape from "../assets/images/general/taldain_sandscape.webp";
import lumarSporeSea from "../assets/images/general/lumar_spore_sea_banner.webp";

export const planetImages: Record<string, ImageMetadata> = {
  scadrial,
  roshar,
  nalthis,
  sel,
  taldain,
  lumar,
  canticle,
  komashi,
  threnody,
  "first-of-the-sun": firstOfTheSun,
  ashyn,
};

export interface PlanetDetailImage {
  section: "geology" | "climate" | "biosphere" | "habitats";
  image: ImageMetadata;
  variant: "feature" | "portrait" | "square";
}

export const planetDetailImages: Record<string, PlanetDetailImage> = {
  roshar: { section: "geology", image: rosharGeology, variant: "feature" },
  canticle: {
    section: "climate",
    image: canticleThermalBoundary,
    variant: "portrait",
  },
  scadrial: {
    section: "climate",
    image: scadrialRedFields,
    variant: "feature",
  },
  nalthis: { section: "biosphere", image: nalthisFeature, variant: "feature" },
  taldain: { section: "climate", image: taldainSandscape, variant: "portrait" },
  lumar: { section: "habitats", image: lumarSporeSea, variant: "feature" },
};
