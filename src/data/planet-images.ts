import type { ImageMetadata } from 'astro';
import ashyn from '../assets/images/general/ashyn_burning_world_banner.webp';
import canticle from '../assets/images/general/sunlit_man_endpaper.webp';
import firstOfTheSun from '../assets/images/general/first_of_the_sun_islands_banner.webp';
import komashi from '../assets/images/general/komashi_hion_city_banner.webp';
import lumar from '../assets/images/general/lumar_spore_sea_banner.webp';
import nalthis from '../assets/images/general/nalthis_feature.webp';
import roshar from '../assets/images/general/stormlight_arc_collage.webp';
import scadrial from '../assets/images/general/scadrial_red_fields.webp';
import sel from '../assets/images/general/elantris_feature.webp';
import taldain from '../assets/images/general/taldain_sandscape.webp';
import threnody from '../assets/images/general/threnody_forest_banner.webp';

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
  'first-of-the-sun': firstOfTheSun,
  ashyn,
};
