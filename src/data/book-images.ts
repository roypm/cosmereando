import type { ImageMetadata } from 'astro';
import arcanumUnbounded from '../assets/images/books/arcanum_unbounded.webp';
import dawnshard from '../assets/images/books/dawnshard.webp';
import edgedancer from '../assets/images/books/edgedancer.webp';
import elantris from '../assets/images/books/elantris.webp';
import elsecaller from '../assets/images/books/elsecaller.webp';
import islesOfTheEmberdark from '../assets/images/books/isles_of_emberdark.webp';
import kingLopen from '../assets/images/books/king_lopen.webp';
import mistborn from '../assets/images/books/mistborn.webp';
import oathbringer from '../assets/images/books/oathbringer.webp';
import rhythmOfWar from '../assets/images/books/rhythm_of_war.webp';
import secretHistory from '../assets/images/books/secret_history.webp';
import shadowsForSilence from '../assets/images/books/shadows_for_silence_in_the_forests_of_hell.webp';
import shadowsOfSelf from '../assets/images/books/shadows_of_self.webp';
import sixthOfTheDusk from '../assets/images/books/sixth_of_the_dusk.webp';
import theAlloyOfLaw from '../assets/images/books/the_alloy_of_law.webp';
import theBandsOfMourning from '../assets/images/books/the_bands_of_mourning.webp';
import theHeroOfAges from '../assets/images/books/the_hero_of_ages.webp';
import theEmperorsSoul from '../assets/images/books/the_emperors_soul.webp';
import theEleventhMetal from '../assets/images/books/the_eleven_metal.webp';
import theLostMetal from '../assets/images/books/the_lost_metal.webp';
import theSunlitMan from '../assets/images/books/the_sunlit_man.webp';
import theWayOfKings from '../assets/images/books/the_way_of_kings.webp';
import theWellOfAscension from '../assets/images/books/the_well_of_ascension.webp';
import tressOfTheEmeraldSea from '../assets/images/books/tress_of_the_emerald_sea.webp';
import warbreaker from '../assets/images/books/warbreaker.webp';
import whiteSandOmnibus from '../assets/images/books/white_sand_graphic_novel.webp';
import whiteSandVolume1 from '../assets/images/books/white_sand_volume_1.webp';
import whiteSandVolume2 from '../assets/images/books/white_sand_volume_2.webp';
import whiteSandVolume3 from '../assets/images/books/white_sand_volume_3.webp';
import windAndTruth from '../assets/images/books/wind_and_truth.webp';
import wordsOfRadiance from '../assets/images/books/words_of_radiance.webp';
import yumiAndTheNightmarePainter from '../assets/images/books/yumi_and_the_nightmare_painter.webp';
import type { WorkData } from './types';

const bookImages: Record<string, ImageMetadata> = {
  'arcanum-unbounded': arcanumUnbounded,
  dawnshard,
  edgedancer,
  elantris,
  elsecaller,
  'isles-of-the-emberdark': islesOfTheEmberdark,
  'king-lopen-the-first-of-alethkar': kingLopen,
  mistborn,
  'the-final-empire': mistborn,
  oathbringer,
  'rhythm-of-war': rhythmOfWar,
  'mistborn-secret-history': secretHistory,
  'shadows-for-silence': shadowsForSilence,
  'shadows-of-self': shadowsOfSelf,
  'sixth-of-the-dusk': sixthOfTheDusk,
  'the-alloy-of-law': theAlloyOfLaw,
  'the-bands-of-mourning': theBandsOfMourning,
  'the-hero-of-ages': theHeroOfAges,
  'the-emperors-soul': theEmperorsSoul,
  'the-eleventh-metal': theEleventhMetal,
  'the-lost-metal': theLostMetal,
  'the-sunlit-man': theSunlitMan,
  'the-way-of-kings': theWayOfKings,
  'the-well-of-ascension': theWellOfAscension,
  'tress-of-the-emerald-sea': tressOfTheEmeraldSea,
  warbreaker,
  'white-sand-omnibus': whiteSandOmnibus,
  'white-sand-volume-1': whiteSandVolume1,
  'white-sand-volume-2': whiteSandVolume2,
  'white-sand-volume-3': whiteSandVolume3,
  'wind-and-truth': windAndTruth,
  'words-of-radiance': wordsOfRadiance,
  'yumi-and-the-nightmare-painter': yumiAndTheNightmarePainter,
};

export const getBookImage = (work: WorkData): ImageMetadata => {
  const image = bookImages[work.id];
  if (image) return image;

  if (work.collectionIds?.includes('arcanum-unbounded')) return arcanumUnbounded;

  throw new Error(`Missing book image for work: ${work.id}`);
};
