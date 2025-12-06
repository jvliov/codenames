// Word bank with ~400 common words for Codenames
export const WORD_BANK = [
  // Animals
  'HORSE', 'DOG', 'CAT', 'MOUSE', 'ELEPHANT', 'LION', 'TIGER', 'BEAR', 'EAGLE', 'SHARK',
  'WHALE', 'DUCK', 'CHICKEN', 'SNAKE', 'SPIDER', 'BUTTERFLY', 'BEE', 'ANT', 'FISH', 'BIRD',
  'RABBIT', 'WOLF', 'FOX', 'DEER', 'MONKEY', 'PENGUIN', 'KANGAROO', 'GIRAFFE', 'ZEBRA', 'RHINO',

  // Places
  'PARK', 'BEACH', 'MOUNTAIN', 'RIVER', 'OCEAN', 'DESERT', 'FOREST', 'CITY', 'TOWN', 'VILLAGE',
  'SCHOOL', 'HOSPITAL', 'BANK', 'HOTEL', 'RESTAURANT', 'STORE', 'MALL', 'AIRPORT', 'STATION', 'PORT',
  'BRIDGE', 'TOWER', 'CASTLE', 'TEMPLE', 'CHURCH', 'MUSEUM', 'THEATER', 'STADIUM', 'LIBRARY', 'MARKET',

  // Objects
  'TABLE', 'CHAIR', 'DOOR', 'WINDOW', 'CLOCK', 'LAMP', 'BOOK', 'PEN', 'PAPER', 'PHONE',
  'COMPUTER', 'CAMERA', 'MIRROR', 'GLASS', 'CUP', 'PLATE', 'KNIFE', 'FORK', 'SPOON', 'BOX',
  'KEY', 'LOCK', 'ROPE', 'CHAIN', 'WHEEL', 'SWORD', 'SHIELD', 'GUN', 'BOMB', 'FLAG',
  'BALL', 'RING', 'CROWN', 'COIN', 'DIAMOND', 'GOLD', 'SILVER', 'IRON', 'STEEL', 'WOOD',

  // Body Parts
  'HEAD', 'HAND', 'FOOT', 'ARM', 'LEG', 'EYE', 'EAR', 'NOSE', 'MOUTH', 'TOOTH',
  'HEART', 'BRAIN', 'BONE', 'BLOOD', 'SKIN', 'HAIR', 'NAIL', 'FINGER', 'THUMB', 'KNEE',

  // Nature
  'SUN', 'MOON', 'STAR', 'CLOUD', 'RAIN', 'SNOW', 'WIND', 'STORM', 'THUNDER', 'LIGHTNING',
  'FIRE', 'WATER', 'EARTH', 'AIR', 'ICE', 'STONE', 'ROCK', 'SAND', 'GRASS', 'TREE',
  'FLOWER', 'LEAF', 'ROOT', 'SEED', 'FRUIT', 'BERRY', 'PLANT', 'VINE', 'BUSH', 'MOSS',

  // Food
  'BREAD', 'CHEESE', 'MEAT', 'MILK', 'EGG', 'RICE', 'PASTA', 'PIZZA', 'BURGER', 'SALAD',
  'SOUP', 'CAKE', 'PIE', 'COOKIE', 'CANDY', 'CHOCOLATE', 'SUGAR', 'SALT', 'PEPPER', 'SAUCE',
  'APPLE', 'ORANGE', 'BANANA', 'GRAPE', 'LEMON', 'LIME', 'CHERRY', 'PEACH', 'PEAR', 'PLUM',

  // Actions/Verbs (as nouns)
  'FALL', 'SPRING', 'JUMP', 'RUN', 'WALK', 'DANCE', 'SING', 'PLAY', 'WORK', 'REST',
  'SLEEP', 'WAKE', 'RISE', 'FALL', 'CLIMB', 'SWIM', 'FLY', 'DIVE', 'SAIL', 'DRIVE',

  // Abstract Concepts
  'TIME', 'SPACE', 'LIFE', 'DEATH', 'LOVE', 'HATE', 'PEACE', 'WAR', 'POWER', 'FORCE',
  'LIGHT', 'DARK', 'DAY', 'NIGHT', 'SHADOW', 'DREAM', 'FEAR', 'HOPE', 'LUCK', 'CHANCE',
  'CHANGE', 'CHOICE', 'VOICE', 'SOUND', 'MUSIC', 'SONG', 'WORD', 'NAME', 'TITLE', 'RANK',

  // Professions
  'KING', 'QUEEN', 'PRINCE', 'KNIGHT', 'GUARD', 'SOLDIER', 'CAPTAIN', 'PILOT', 'SAILOR', 'COOK',
  'DOCTOR', 'NURSE', 'TEACHER', 'STUDENT', 'ARTIST', 'WRITER', 'ACTOR', 'SINGER', 'DANCER', 'PLAYER',
  'WORKER', 'FARMER', 'HUNTER', 'FISHER', 'MINER', 'BUILDER', 'MAKER', 'SELLER', 'BUYER', 'TRADER',

  // Colors & Appearance
  'RED', 'BLUE', 'GREEN', 'YELLOW', 'BLACK', 'WHITE', 'GRAY', 'BROWN', 'PINK', 'PURPLE',
  'ORANGE', 'VIOLET', 'GOLD', 'SILVER', 'BRIGHT', 'DARK', 'PALE', 'DEEP', 'LIGHT', 'SHADE',

  // Numbers/Quantity
  'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN',
  'HALF', 'QUARTER', 'DOUBLE', 'TRIPLE', 'SINGLE', 'PAIR', 'DOZEN', 'SCORE', 'HUNDRED', 'THOUSAND',

  // Directions/Positions
  'NORTH', 'SOUTH', 'EAST', 'WEST', 'LEFT', 'RIGHT', 'UP', 'DOWN', 'TOP', 'BOTTOM',
  'CENTER', 'MIDDLE', 'SIDE', 'EDGE', 'CORNER', 'FRONT', 'BACK', 'INSIDE', 'OUTSIDE', 'UNDER',

  // Games & Sports
  'GAME', 'SPORT', 'RACE', 'MATCH', 'CHESS', 'CARD', 'DICE', 'BOARD', 'PIECE', 'MOVE',
  'SCORE', 'POINT', 'GOAL', 'WIN', 'LOSE', 'TIE', 'TEAM', 'CLUB', 'LEAGUE', 'CUP',

  // Science & Tech
  'ATOM', 'CELL', 'GENE', 'VIRUS', 'WAVE', 'RAY', 'BEAM', 'CHARGE', 'FIELD', 'FORCE',
  'ENGINE', 'MOTOR', 'MACHINE', 'ROBOT', 'WIRE', 'CHIP', 'CODE', 'DATA', 'NET', 'WEB',

  // Clothing
  'HAT', 'CAP', 'BOOT', 'SHOE', 'SOCK', 'SHIRT', 'COAT', 'JACKET', 'DRESS', 'SKIRT',
  'PANTS', 'BELT', 'TIE', 'GLOVE', 'SCARF', 'SUIT', 'ROBE', 'CLOAK', 'CAPE', 'MASK',

  // Transportation
  'CAR', 'BUS', 'TRAIN', 'PLANE', 'SHIP', 'BOAT', 'BIKE', 'TRUCK', 'VAN', 'TAXI',
  'ROCKET', 'JET', 'HELICOPTER', 'SUBMARINE', 'CART', 'WAGON', 'SLED', 'SKATE', 'BOARD', 'RAIL',

  // Communication
  'LETTER', 'MAIL', 'POST', 'MESSAGE', 'NOTE', 'SIGN', 'SIGNAL', 'CALL', 'TALK', 'SPEECH',
  'LANGUAGE', 'TONGUE', 'ACCENT', 'TONE', 'PITCH', 'VOLUME', 'ECHO', 'WHISPER', 'SHOUT', 'CRY',

  // Miscellaneous
  'WALL', 'FLOOR', 'ROOF', 'GATE', 'FENCE', 'YARD', 'ROAD', 'PATH', 'STREET', 'LANE',
  'LINE', 'CIRCLE', 'SQUARE', 'TRIANGLE', 'STAR', 'CROSS', 'POINT', 'DOT', 'MARK', 'SPOT',
  'HOLE', 'GAP', 'CRACK', 'BREAK', 'CUT', 'TEAR', 'SCRATCH', 'DENT', 'CHIP', 'STAIN',
  'STICK', 'POLE', 'POST', 'BAR', 'BEAM', 'PLANK', 'BOARD', 'SHEET', 'STRIP', 'BAND',
  'TUBE', 'PIPE', 'WIRE', 'CABLE', 'CORD', 'STRING', 'THREAD', 'YARN', 'CLOTH', 'FABRIC'
];

/**
 * Randomly selects 25 unique words from the word bank
 */
export function getRandomWords(count = 25) {
  const shuffled = [...WORD_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
