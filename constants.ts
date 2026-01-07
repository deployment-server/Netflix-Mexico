import { Category, Movie } from "./types";

// Reliable MP4 sources from Google's GTV sample bucket to ensure playback on all devices without CORS/Embed errors.

const VIDEO_SOURCES = {
  sintel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  tears: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  bunny: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  elephants: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  blazes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  escapes: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  fun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  joyrides: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  meltdowns: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  subaru: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  bullrun: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  gti: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  car: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4'
};

export const HERO_MOVIE: Movie = {
  id: 'hero-1',
  title: 'Stranger Things 5',
  description: 'In the epic conclusion, the Hawkins gang faces their biggest threat yet. As the Upside Down bleeds into reality, they must band together one last time to save their town—and the world.',
  imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_3t/24520.jpg', 
  matchScore: 99,
  year: 2025,
  duration: 'Final Season',
  genre: ['Sci-Fi', 'Horror', 'Drama'],
  trailerUrl: VIDEO_SOURCES.sintel // Epic fantasy feel
};

export const MOCK_CATEGORIES: Category[] = [
  {
    title: "Trending Now",
    movies: [
      {
        id: 'trend-1',
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRPhm3vDEq079ZkbNQPpSuBNVZOordMM9acj7oeDTYVIL_Gbnd&s',
        matchScore: 98,
        year: 2010,
        duration: '2h 28m',
        genre: ['Sci-Fi', 'Action'],
        trailerUrl: VIDEO_SOURCES.tears // Sci-fi/Action
      },
      {
        id: 'trend-2',
        title: 'Interstellar',
        description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1XbZgxI_evXsTjw9bzd5NbTyvxloeNy5tgovAJDr50YdINNar&s',
        matchScore: 96,
        year: 2014,
        duration: '2h 49m',
        genre: ['Sci-Fi', 'Adventure'],
        trailerUrl: VIDEO_SOURCES.escapes // Cinematic/Adventure
      },
      {
        id: 'trend-3',
        title: 'The Dark Knight',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDr3l1H5A4qLAHrOOwXQ2XMjCbDHyKFboFSEGO6PCJvsiF1b4&s',
        matchScore: 99,
        year: 2008,
        duration: '2h 32m',
        genre: ['Action', 'Crime'],
        trailerUrl: VIDEO_SOURCES.blazes // Action/Intense
      },
      {
        id: 'trend-4',
        title: 'Blade Runner 2049',
        description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUw3UKyjUtQVu87OUzxY9EIEaV4b1WYEAiL2TacCXlCzdQNFQ&s',
        matchScore: 95,
        year: 2017,
        duration: '2h 44m',
        genre: ['Sci-Fi', 'Action'],
        trailerUrl: VIDEO_SOURCES.meltdowns // High-tech/Drama
      },
      {
        id: 'trend-5',
        title: 'Dune',
        description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0wjTeT1ESDZJCBv8OIDMSNoFranBlPTi5JLLDE-0CK67AB6G3&s',
        matchScore: 94,
        year: 2021,
        duration: '2h 35m',
        genre: ['Sci-Fi', 'Adventure'],
        trailerUrl: VIDEO_SOURCES.elephants // Surreal/Sci-fi
      },
      {
        id: 'trend-6',
        title: 'Avengers: Endgame',
        description: 'After the devastating events of Infinity War, the universe is in ruins.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCIe20Ux3kZZEMbPyS73TLfkND13p_59FtQp8OxRjNT5IAZrD1&s',
        matchScore: 97,
        year: 2019,
        duration: '3h 2m',
        genre: ['Action', 'Sci-Fi'],
        trailerUrl: VIDEO_SOURCES.joyrides // Action/Ensemble
      }
    ],
  },
  {
    title: "Movies",
    movies: [
      {
        id: 'movie-1',
        title: 'John Wick',
        description: 'An ex-hit-man comes out of retirement to track down the gangsters that killed his dog.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_v/19903.jpg',
        matchScore: 94,
        year: 2014,
        duration: '1h 41m',
        genre: ['Action', 'Thriller'],
        trailerUrl: VIDEO_SOURCES.bullrun // Fast cars/Action
      },
      {
        id: 'movie-2',
        title: 'Mad Max: Fury Road',
        description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs/14022.jpg',
        matchScore: 97,
        year: 2015,
        duration: '2h 0m',
        genre: ['Action', 'Adventure'],
        trailerUrl: VIDEO_SOURCES.subaru // Dirt/Action
      },
      {
        id: 'movie-3',
        title: 'Gladiator',
        description: 'A former Roman General sets out to exact vengeance against the corrupt emperor.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_2t/21659.jpg',
        matchScore: 95,
        year: 2000,
        duration: '2h 35m',
        genre: ['Action', 'Drama'],
        trailerUrl: VIDEO_SOURCES.tears // Epic feel
      },
      {
        id: 'movie-4',
        title: 'Heat',
        description: 'A group of professional bank robbers start to feel the heat from police.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_2t/24947.jpg',
        matchScore: 92,
        year: 1995,
        duration: '2h 50m',
        genre: ['Crime', 'Action'],
        trailerUrl: VIDEO_SOURCES.gti // Urban/Car
      },
      {
        id: 'movie-5',
        title: 'Skyfall',
        description: 'James Bond\'s loyalty to M is tested when her past comes back to haunt her.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_2t/24951.jpg',
        matchScore: 91,
        year: 2012,
        duration: '2h 23m',
        genre: ['Action', 'Adventure'],
        trailerUrl: VIDEO_SOURCES.escapes // Spy/Adventure
      }
    ]
  },
  {
    title: "Shows",
    movies: [
      {
        id: 'scifi-1',
        title: 'The Matrix',
        description: 'A computer hacker learns from mysterious rebels about the true nature of his reality.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_v/19903.jpg',
        matchScore: 96,
        year: 1999,
        duration: '2h 16m',
        genre: ['Sci-Fi', 'Action'],
        trailerUrl: VIDEO_SOURCES.tears // Cyberpunk/Sci-Fi
      },
      {
        id: 'scifi-2',
        title: 'Arrival',
        description: 'A linguist works with the military to communicate with alien lifeforms.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs/14022.jpg',
        matchScore: 93,
        year: 2016,
        duration: '1h 56m',
        genre: ['Sci-Fi', 'Drama'],
        trailerUrl: VIDEO_SOURCES.sintel // Atmospheric
      },
      {
        id: 'scifi-3',
        title: 'Ex Machina',
        description: 'A young programmer is selected to participate in a ground-breaking experiment.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_2t/21659.jpg',
        matchScore: 92,
        year: 2014,
        duration: '1h 48m',
        genre: ['Sci-Fi', 'Thriller'],
        trailerUrl: VIDEO_SOURCES.elephants // Psychological/Weird
      },
      {
        id: 'scifi-4',
        title: 'Cyberpunk: Edgerunners',
        description: 'A street kid strives to become an outlaw mercenary in a technology-obsessed future.',
        imageUrl: 'https://4kwallpapers.com/images/walls/thumbs_3t/24520.jpg',
        matchScore: 98,
        year: 2022,
        duration: '1 Season',
        genre: ['Anime', 'Sci-Fi'],
        trailerUrl: VIDEO_SOURCES.blazes // High energy
      },
      {
        id: 'scifi-5',
        title: 'Altered Carbon',
        description: 'After 250 years on ice, a prisoner returns to life in a new body.',
        imageUrl: 'https://picsum.photos/seed/altered/400/225',
        matchScore: 88,
        year: 2018,
        duration: '2 Seasons',
        genre: ['Sci-Fi', 'Action'],
        trailerUrl: VIDEO_SOURCES.escapes // Future/Noir
      }
    ]
  },
  {
    title: "Series",
    movies: [
      {
        id: 'series-1',
        title: 'The Family Man',
        description: 'A middle-class man working for the National Investigation Agency must protect the nation while protecting his family from his secretive job.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8JL_BmiM9vWEuxjvUS22hXLfq3P3O9t9F8-McAhFqDr5IyQ&s',
        matchScore: 98,
        year: 2019,
        duration: '2 Seasons',
        genre: ['Action', 'Comedy', 'Thriller'],
        trailerUrl: VIDEO_SOURCES.car // Grounded/Comedy tone
      },
      {
        id: 'series-2',
        title: 'Mirzapur',
        description: 'A shocking incident at a wedding procession ignites a series of events entangling the lives of two families in the lawless city of Mirzapur.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFsmmS8mWIcKmqM__aLNp9FJPZf51ryZkxd3GzMbrRlpYNYjI&s',
        matchScore: 96,
        year: 2018,
        duration: '3 Seasons',
        genre: ['Crime', 'Action', 'Thriller'],
        trailerUrl: VIDEO_SOURCES.blazes // Intense/Drama
      },
      {
        id: 'series-3',
        title: 'Sacred Games',
        description: 'A link in their pasts leads an honest cop to a fugitive gang boss, whose cryptic warning spurs the officer on a quest to save Mumbai from cataclysm.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiG6tR7gMopFj_hjZ4eSDe02xMolS32sU930j2osW3ng7qzEw&s',
        matchScore: 97,
        year: 2018,
        duration: '2 Seasons',
        genre: ['Crime', 'Thriller'],
        trailerUrl: VIDEO_SOURCES.meltdowns // Dark/Thriller
      },
      {
        id: 'series-4',
        title: 'Scam 1992',
        description: 'Set in 1980s and 90s Bombay, it follows the life of Harshad Mehta, a stockbroker who took the stock market to dizzying heights and his catastrophic downfall.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbkEQgCkOIW4V3cugqQsVdX37VEWwcg9-UBR_-hs_KfN-7YbGt&s',
        matchScore: 99,
        year: 2020,
        duration: '1 Season',
        genre: ['Biography', 'Drama', 'Crime'],
        trailerUrl: VIDEO_SOURCES.joyrides // Rise and fall/Energetic
      },
      {
        id: 'series-5',
        title: 'Panchayat',
        description: 'An engineering graduate, unable to find a better job, joins as a Secretary of a Panchayat office in a remote village of Uttar Pradesh.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3sDhrDZwkj3tJ-oHIt_LTqX_w2J9IG6PIaKRV-JOZZ0KT7xsB&s',
        matchScore: 95,
        year: 2020,
        duration: '3 Seasons',
        genre: ['Comedy', 'Drama'],
        trailerUrl: VIDEO_SOURCES.bunny // Lighthearted
      }
    ]
  },
  {
    title: "K-Drama",
    movies: [
      {
        id: 'kdrama-1',
        title: 'Squid Game',
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUK0bXq-Yf3MvY-fYiXcgxf8c-LiwQ1zWrR8snJ3mXoZsOkPvf&s',
        matchScore: 99,
        year: 2021,
        duration: '1 Season',
        genre: ['Thriller', 'Drama'],
        trailerUrl: VIDEO_SOURCES.blazes // Intense competition
      },
      {
        id: 'kdrama-2',
        title: 'All of Us Are Dead',
        description: 'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out — or turn into one of the rabid infected.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCJeKjZn6ToR-d-VncLkeQrulP76rChRgpcR0rlhpLRCiwRbM&s',
        matchScore: 96,
        year: 2022,
        duration: '1 Season',
        genre: ['Horror', 'Zombie'],
        trailerUrl: VIDEO_SOURCES.tears // Action/Horror feel
      },
      {
        id: 'kdrama-3',
        title: 'Sweet Home',
        description: 'As humans turn into savage monsters and wreak terror, one troubled teenager and his apartment neighbors fight to survive — and to hold on to their humanity.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpuh8ZDOszJjiZ50FASqAdEp_QPSHPsvhIq55ZENLAHqXOTXxH&s',
        matchScore: 95,
        year: 2020,
        duration: '2 Seasons',
        genre: ['Horror', 'Supernatural'],
        trailerUrl: VIDEO_SOURCES.elephants // Strange/Supernatural
      },
      {
        id: 'kdrama-4',
        title: 'The Glory',
        description: 'Years after surviving horrific abuse in high school, a woman puts an elaborate revenge scheme in motion to make the perpetrators pay for their crimes.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzEv8GDhq89PZbNg60aylIUzQRyj29TiYL17QVpLRRBRkg1M&s',
        matchScore: 98,
        year: 2022,
        duration: '1 Season',
        genre: ['Thriller', 'Revenge'],
        trailerUrl: VIDEO_SOURCES.meltdowns // Dramatic/Serious
      },
      {
        id: 'kdrama-5',
        title: 'Vincenzo',
        description: 'During a visit to his motherland, a Korean-Italian mafia lawyer gives an unrivaled conglomerate a taste of its own medicine with a side of justice.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsqf3h3daV5wcRqV25Z9XO__0_hx5Uo5BeHN5DaXue5hkXyQY&s',
        matchScore: 97,
        year: 2021,
        duration: '1 Season',
        genre: ['Crime', 'Comedy'],
        trailerUrl: VIDEO_SOURCES.gti // Sleek/Stylish
      },
      {
        id: 'kdrama-6',
        title: 'Business Proposal',
        description: 'In disguise as her friend, Ha-ri scares off blind dates. But the plan goes awry when he turns out to be her CEO — and makes a proposal.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2LWWM2ScWct3kmY7B1YPIpTtrq2hlgKJsnfaewvPSOb8hC_b&s',
        matchScore: 94,
        year: 2022,
        duration: '1 Season',
        genre: ['Romance', 'Comedy'],
        trailerUrl: VIDEO_SOURCES.fun // Romance/Comedy
      }
    ]
  },
  {
    title: "Anime",
    movies: [
      {
        id: 'anime-1',
        title: 'Demon Slayer',
        description: 'A family is attacked by demons and only two members survive.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxcrbcRAvYtZEDi2i0dvFfFzUet9Q0g8lftmGQr5SOrkez_8&s',
        matchScore: 99,
        year: 2019,
        duration: '4 Seasons',
        genre: ['Anime', 'Action'],
        trailerUrl: VIDEO_SOURCES.sintel // Action/Fantasy
      },
      {
        id: 'anime-2',
        title: 'One Piece',
        description: 'Monkey D. Luffy sets off on an adventure with his pirate crew.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6wHb9QRmbb7aeWvOTCrotM28ZDwtYcFZLh9sjudjmJG1O_DS6&s',
        matchScore: 98,
        year: 1999,
        duration: '20 Seasons',
        genre: ['Anime', 'Adventure'],
        trailerUrl: VIDEO_SOURCES.bunny // Adventure/Fun
      },
      {
        id: 'anime-3',
        title: 'Attack on Titan',
        description: 'After his hometown is destroyed and his mother is killed, young Eren Yeager vows to cleanse the earth of the giant humanoid Titans.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1pCDJ11PKXv1c8P77utg7W2-hLPTmt_9lwVN8uAkCR3MZgDM&s',
        matchScore: 100,
        year: 2013,
        duration: '4 Seasons',
        genre: ['Anime', 'Action'],
        trailerUrl: VIDEO_SOURCES.tears // Epic War/Action
      },
      {
        id: 'anime-4',
        title: 'Jujutsu Kaisen',
        description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSZPz7ObqEs-h4Lmd8QvRtAlYJZ_xsgKtzdV98qfK6bG-G5MQ&s',
        matchScore: 97,
        year: 2020,
        duration: '2 Seasons',
        genre: ['Anime', 'Supernatural'],
        trailerUrl: VIDEO_SOURCES.blazes // Supernatural Action
      },
      {
        id: 'anime-5',
        title: 'Spy x Family',
        description: 'A spy has to build a family to execute a mission.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ97IyNxAYdOL-I7mxWJTEsLMP59a_qzmIjiUGtrFlA3LrpK8&s',
        matchScore: 96,
        year: 2022,
        duration: '2 Seasons',
        genre: ['Anime', 'Comedy'],
        trailerUrl: VIDEO_SOURCES.fun // Comedy/Action
      },
      {
        id: 'anime-6',
        title: 'Death Note',
        description: 'An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRV8yJ5pp7Oqaxv-O4Huz4hfRc0noTMCjzzhed8g837IMvpSkY&s',
        matchScore: 99,
        year: 2006,
        duration: '1 Season',
        genre: ['Anime', 'Thriller'],
        trailerUrl: VIDEO_SOURCES.elephants // Psychological/Dark
      }
    ]
  }
];