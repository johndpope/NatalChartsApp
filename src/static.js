const PLANET_SORT_ORDER = ['Sun', 'Moon', 'Ascendant', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
const HOUSE_DISPLAY_NAMES = {
  'House1':  {num: 1,  roman: 'I'},
  'House2':  {num: 2,  roman: 'II'},
  'House3':  {num: 3,  roman: 'III'},
  'House4':  {num: 4,  roman: 'IV'},
  'House5':  {num: 5,  roman: 'V'},
  'House6':  {num: 6,  roman: 'VI'},
  'House7':  {num: 7,  roman: 'VII'},
  'House8':  {num: 8,  roman: 'VIII'},
  'House9':  {num: 9,  roman: 'IX'},
  'House10': {num: 10, roman: 'X'},
  'House11': {num: 11, roman: 'XI'},
  'House12': {num: 12, roman: 'XII'}
};

const HOUSES_WITH_INFO = {
  "House1": {
    "title": "House I",
    "description": "Your sense of self.",
    "ruling_planet": "Mars",
    "ruling_sign": "Aries"
  },
  "House2": {
    "title": "House II",
    "description": "Security, possessions, and supporting yourself financially.",
    "ruling_planet": "Venus",
    "ruling_sign": "Taurus"
  },
  "House3": {
    "title": "House III",
    "description": "Communication, early education, short journeys, and siblings.",
    "ruling_planet": "Mercury",
    "ruling_sign": "Gemini"
  },
  "House4": {
    "title": "House IV",
    "description": "Home, family, upbringing, and roots.",
    "ruling_planet": "Cancer",
    "ruling_sign": "Moon"
  },
  "House5": {
    "title": "House V",
    "description": "Pleasure, romance, children, play, and performance.",
    "ruling_planet": "Sun",
    "ruling_sign": "Leo"
  },
  "House6": {
    "title": "House VI",
    "description": "Tasks, routine, service, and health.",
    "ruling_planet": "Mercury",
    "ruling_sign": "Virgo"
  },
  "House7": {
    "title": "House VII",
    "description": "Lasting partnerships and matters of the heart.",
    "ruling_planet": "Venus",
    "ruling_sign": "Libra"
  },
  "House8": {
    "title": "House VIII",
    "description": "The money of others, sex, death, and healing.",
    "ruling_planet": "Mars",
    "ruling_sign": "Scorpio"
  },
  "House9": {
    "title": "House IX",
    "description": "Understanding, philosophy, synthesis, and long journeys.",
    "ruling_planet": "Jupiter",
    "ruling_sign": "Sagittarius"
  },
  "House10": {
    "title": "House X",
    "description": "Achievements, social foundations, duty, and public life.",
    "ruling_planet": "Saturn",
    "ruling_sign": "Capricorn"
  },
  "House11": {
    "title": "House XI",
    "description": "Community, friends, liberty, and legislation.",
    "ruling_planet": "Uranus",
    "ruling_sign": "Aquarius"
  },
  "House12": {
    "title": "House XII",
    "description": "The subconscious, spirituality, secrets, self-sacrifice, and endings.",
    "ruling_planet": "Neptune",
    "ruling_sign": "Pisces"
  }
};

const SIGNS_WITH_INFO = {
  "Aries": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_aries.svg",
    "title": "The Ram",
    "element": "Fire",
    "quality": "Cardinal",
    "ruler": "Mars",
    "dates": "3/20 - 4/19",
    "startColor": "#58A054",
    "endColor": "#FD500B"
  },
  "Taurus": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_taurus.svg",
    "title": "The Bull",
    "element": "Earth",
    "quality": "Fixed",
    "ruler": "Venus",
    "dates": "4/19 - 5/20",
    "startColor": "#127A7D",
    "endColor": "#FF8E3B"
  },
  "Gemini": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_gemini.svg",
    "title": "The Twins",
    "element": "Air",
    "quality": "Mutable",
    "ruler": "Mercury",
    "dates": "5/20 - 6/20",
    "startColor": "#91B9BB",
    "endColor": "#F49DF5"
  },
  "Cancer": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_cancer.svg",
    "title": "The Crab",
    "element": "Water",
    "quality": "Cardinal",
    "ruler": "Moon",
    "dates": "6/20 - 7/22",
    "startColor": "#91B9BB",
    "endColor": "#58A054"
  },
  "Leo": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_leo.svg",
    "title": "The Lion",
    "element": "Fire",
    "quality": "Fixed",
    "ruler": "Sun",
    "dates": "7/22 - 8/22",
    "startColor": "#FF8E3B",
    "endColor": "#DF61AB"
  },
  "Virgo": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_virgo.svg",
    "title": "The Virgin",
    "element": "Earth",
    "quality": "Mutable",
    "ruler": "Mercury",
    "dates": "8/22 - 9/22",
    "startColor": "#58A054",
    "endColor": "##127A7D"
  },
  "Libra" : {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_libra.svg",
    "title": "The Scales",
    "element": "Air",
    "quality": "Cardinal",
    "ruler": "Venus",
    "dates": "9/22 - 10/23",
    "startColor": "#5467A1",
    "endColor": "#DF61AB"
  },
  "Scorpio": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_scorpio.svg",
    "title": "The Scorpion",
    "element": "Water",
    "quality": "Fixed",
    "ruler": "Mars",
    "dates": "10/23 - 11/21",
    "startColor": "#127A7D",
    "endColor": "#5467A1"
  },
  "Sagittarius": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_sagittarius.svg",
    "title": "The Archer",
    "element": "Fire",
    "quality": "Mutable",
    "ruler": "Jupiter",
    "dates": "11/21 - 12/21",
    "startColor": "#FD500B",
    "endColor": "#91B9BB"
  },
  "Capricorn": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_capricorn.svg",
    "title": "The Goat",
    "element": "Earth",
    "quality": "Cardinal",
    "ruler": "Saturn",
    "dates": "12/21 - 1/19",
    "startColor": "#F0C8CA",
    "endColor": "#58A054"
  },
  "Aquarius": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_aquarius.svg",
    "title": "The Water Bearer",
    "element": "Air",
    "quality": "Fixed",
    "ruler": "Uranus",
    "dates": "1/19 - 2/18",
    "startColor": "#F0C8CA",
    "endColor": "#91B9BB"
  },
  "Pisces": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_pisces.svg",
    "title": "The Fish",
    "element": "Water",
    "quality": "Mutable",
    "ruler": "Neptune",
    "dates": "2/18 - 3/20",
    "startColor": "#5467A1",
    "endColor": "#F0C8CA"
  }
};

const PLANETS_WITH_INFO = {
  "Sun": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_sun.svg?1495986813996",
    "title": "Conscious Mind",
    "description": "The Sun governs the shape of your life."
  }, 
  "Moon": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_moon.svg?1495986815349",
    "title": "Unconscious Mind",
    "description": "The Moon rules your instincts and emotions."
  },
  "Ascendant": {
    "title": "Body & Ego",
    "description": "Your Ascendant determines how you appear to others and your first reactions."
  },
  "Mercury": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_mercury.svg?1495986815195",
    "title": "Mind & Expression",
    "description": "Mercury controls the way you communicate and investigate."
  }, 
  "Venus": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_venus.svg?1495986814230",
    "title": "Love & Pleasure",
    "description": "Venus indicates how you approach relationships and the tactile world."
  }, 
  "Mars": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_mars.svg?1495986815095",
    "title": "Action & Desire",
    "description": "Mars shows how you initiate and compete, plus your sexual and aggressive natures."
  }, 
  "Jupiter": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_jupiter.svg?1495986814784",
    "title": "Bounty & Fortune",
    "description": "Jupiter governs your instinct for generosity and morality."
  },
  "Saturn": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_saturn.svg?1495986813967",
    "title": "Structure & Responsibility",
    "description": "Saturn indicates how your generation handles limitations, control, and the paternal instinct."
  },
  "Uranus": {
    "title": "Discovery & Surprise",
    "description": "Uranus rules your generation's proclivity for both breakthroughs and chaos, particularly in relation to tech."
  },
  "Neptune": {
    "title": "Intuition & Illusion",
    "description": "Neptune shows how your generation handles enlightenment, art, and compassion, as well as addiction and deception."
  },
  "Pluto": {
    "title": "Power & Change",
    "description": "Pluto governs your generation's approach to exploration and control."
  }
};


export { PLANET_SORT_ORDER, SIGNS_WITH_INFO, PLANETS_WITH_INFO, HOUSES_WITH_INFO };