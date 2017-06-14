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

const SIGNS_WITH_INFO = {
  "Aries": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_aries.svg",
    "title": "The Ram",
    "element": "Fire",
    "quality": "Cardinal",
    "ruler": "Mars",
    "dates": "3/20 - 4/19"
  },
  "Taurus": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_taurus.svg",
    "title": "The Bull",
    "element": "Earth",
    "quality": "Fixed",
    "ruler": "Venus",
    "dates": "4/19 - 5/20"
  },
  "Gemini": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_gemini.svg",
    "title": "The Twins",
    "element": "Air",
    "quality": "Mutable",
    "ruler": "Mercury",
    "dates": "5/20 - 6/20"
  },
  "Cancer": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_cancer.svg",
    "title": "The Crab",
    "element": "Water",
    "quality": "Cardinal",
    "ruler": "Moon",
    "dates": "6/20 - 7/22"
  },
  "Leo": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_leo.svg",
    "title": "The Lion",
    "element": "Fire",
    "quality": "Fixed",
    "ruler": "Sun",
    "dates": "7/22 - 8/22"
  },
  "Virgo": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_virgo.svg",
    "title": "The Virgin",
    "element": "Earth",
    "quality": "Mutable",
    "ruler": "Mercury",
    "dates": "8/22 - 9/22"
  },
  "Libra" : {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_libra.svg",
    "title": "The Scales",
    "element": "Air",
    "quality": "Cardinal",
    "ruler": "Venus",
    "dates": "9/22 - 10/23"
  },
  "Scorpio": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_scorpio.svg",
    "title": "The Scorpion",
    "element": "Water",
    "quality": "Fixed",
    "ruler": "Mars",
    "dates": "10/23 - 11/21"
  },
  "Sagittarius": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_sagittarius.svg",
    "title": "The Archer",
    "element": "Fire",
    "quality": "Mutable",
    "ruler": "Jupiter",
    "dates": "11/21 - 12/21"
  },
  "Capricorn": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_capricorn.svg",
    "title": "The Goat",
    "element": "Earth",
    "quality": "Cardinal",
    "ruler": "Saturn",
    "dates": "12/21 - 1/19"
  },
  "Aquarius": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_aquarius.svg",
    "title": "The Water Bearer",
    "element": "Air",
    "quality": "Fixed",
    "ruler": "Uranus",
    "dates": "1/19 - 2/18"
  },
  "Pisces": {
    "icon": "https://cdn.glitch.com/e4e4a6b3-d941-4ce7-83d9-950d6528f824%2Fic_pisces.svg",
    "title": "The Fish",
    "element": "Water",
    "quality": "Mutable",
    "ruler": "Neptune",
    "dates": "2/18 - 3/20"
  }
};


export { PLANET_SORT_ORDER, HOUSE_DISPLAY_NAMES, SIGNS_WITH_INFO };