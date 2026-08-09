/**
 * ============================================================================
 * TAMARAVIBES - CENTRAL PRODUCT & BRAND DATA ARCHITECTURE
 * ============================================================================
 * 
 * HOW TO UPDATE THIS FILE:
 * 
 * 1. TO ADD A NEW ETSY PRODUCT:
 *    Copy one of the objects in `etsyProducts` array and update its fields:
 *    - `id`: Unique identifier (e.g. "etsy-mug-03")
 *    - `title`: Full title of your product
 *    - `category`: Matches one of the category IDs ("mugs", "apparel", "gifts", "digital")
 *    - `price`: Listed price (e.g. "$17.99")
 *    - `image`: Relative path to image or external image URL
 *    - `url`: Direct Etsy listing URL or https://tamaravibes.etsy.com
 *    - `featured`: true to display on homepage showcase, false otherwise
 * 
 * 2. TO ADD A NEW AMAZON BOOK:
 *    Copy one of the objects in `amazonBooks` array and update:
 *    - `asin`: Amazon ASIN (e.g. "B0HBLJSJYC")
 *    - `url`: Public Amazon product link (https://www.amazon.com/dp/YOUR_ASIN)
 * 
 * 3. TO UPDATE REVIEWS OR SOCIAL LINKS:
 *    Modify the `customerReviews` or `socialLinks` objects below.
 * ============================================================================
 */

// BRAND CONFIGURATION
const brandConfig = {
  name: "TamaraVibes",
  tagline: "Creative Finds. Made to Bring Joy.",
  subTagline: "Discover unique designs, thoughtful gifts and imaginative children's books from TamaraVibes.",
  etsyShopUrl: "https://tamaravibes.etsy.com",
  amazonAuthorUrl: "https://www.amazon.com/dp/B0HBLJSJYC",
  location: "Hialeah, Florida, USA",
  yearEstablished: "2024"
};

// CATEGORIES METADATA
// CATEGORIES METADATA
const categories = [
  {
    id: "all",
    name: "All Creations",
    icon: "sparkles",
    countText: "Browse All Items"
  },
  {
    id: "tshirts",
    name: "T-shirts",
    description: "Graphic ultra-cotton tees featuring bold anime artwork, humor & pop culture.",
    image: "assets/images/cat_tshirts.jpg",
    icon: "shirt"
  },
  {
    id: "mugs",
    name: "Mugs",
    description: "Vibrant ceramic coffee mugs & office humor drinkware for everyday joy.",
    image: "assets/images/cat_mugs.jpg",
    icon: "coffee"
  },
  {
    id: "digital",
    name: "Digital",
    description: "Downloadable artwork, digital printables, and instant creative activity packs.",
    image: "assets/images/about_story.jpg",
    icon: "download"
  },
  {
    id: "sweatshirts",
    name: "Sweatshirts",
    description: "Cozy fleece-lined crewnecks & hoodies designed for warmth and style.",
    image: "assets/images/sweatshirt_nezuko.jpg",
    icon: "layers"
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Waterproof vinyl stickers, keychains, phone grips & unique daily finds.",
    image: "assets/images/cat_accessories.jpg",
    icon: "tag"
  },
  {
    id: "homedecor",
    name: "Home Decor",
    description: "Aesthetic art prints, wall posters, and decorative accents for your space.",
    image: "assets/images/cat_homedecor.jpg",
    icon: "home"
  },
  {
    id: "entertainment",
    name: "Entertainment & Fun",
    description: "Creative jigsaw puzzles, family board games, coloring books & activity sets.",
    image: "assets/images/cat_puzzle_family.jpg",
    icon: "puzzle"
  }
];

// ETSY PRODUCTS DATA
const etsyProducts = [
  // --- 12 T-SHIRTS ---
  {
    id: "etsy-tshirt-zenitsu-4372921118",
    title: "Zenitsu Demon Slayer T-Shirt",
    category: "tshirts",
    price: "$30.93+",
    originalPrice: "$41.24+",
    image: "assets/images/tshirt_zenitsu_demon_slayer.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4372921118/zenitsu-demon-slayer-t-shirt",
    featured: true,
    badge: "25% OFF Sale",
    description: "This Zenitsu themed T-shirt is perfect for Demon Slayer and manga fans. It exudes a casual and relaxed vibe, making it ideal for everyday wear or lounging around. A great gift for anime lovers, otakus, and Demon Slayer enthusiasts. Relevant for birthdays, anime conventions, or simply celebrating your love for Japanese culture."
  },
  {
    id: "etsy-tshirt-father-daughter-4541512753",
    title: "Father Daughter Line Art Shirt | Minimalist Dad Tee, Family Love Graphic",
    category: "tshirts",
    price: "$21.81+",
    originalPrice: "$29.08+",
    image: "assets/images/tshirt_father_daughter.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4541512753/father-daughter-line-art-shirt",
    featured: true,
    badge: "25% OFF Sale",
    description: "Some moments last forever. This original minimalist line art design captures one of the most meaningful moments between a father and his daughter—the instant she runs into his open arms. Inspired by real family love, this artwork symbolizes a bond that never fades. As children grow, they may outgrow their father’s arms, but they never outgrow his heart. Designed with clean, timeless lines, this shirt is perfect for fathers who cherish every hug, every memory, and every moment."
  },
  {
    id: "etsy-tshirt-akaza-4373682383",
    title: "Akaza Fan Art T-Shirt",
    category: "tshirts",
    price: "$23.48+",
    originalPrice: "$31.31+",
    image: "assets/images/tshirt_akaza_fan_art.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4373682383/akaza-fan-art-t-shirt-demon-slayer-anime",
    featured: true,
    badge: "25% OFF Sale",
    description: "This T-Shirt features beautiful Akaza fan art from the Demon Slayer anime, perfect for fans of the series. The unisex softstyle design ensures a comfortable fit and a versatile style that can be worn on any occasion. Ideal for adults and those who appreciate unique anime-inspired apparel. Great for gifting during birthdays, holidays, or anime conventions."
  },
  {
    id: "etsy-tshirt-zenitsu-attack-4374505614",
    title: "Zenitsu Attack Demon Slayer T-Shirt",
    category: "tshirts",
    price: "$23.43+",
    originalPrice: "$31.24+",
    image: "assets/images/tshirt_zenitsu_attack.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4374505614/zenitsu-attack-demon-slayer-t-shirt",
    featured: true,
    badge: "25% OFF Sale",
    description: "Demon slayer fan art “zenitsu” T-Shirt perfect for serious anime fans and otakus. This top 10 hit design gives off an action-packed vibe, ideal for those who love Demon Slayer. It's a must-have for anime enthusiasts and can be worn for casual outings, anime conventions, or as a statement piece during cosplay events."
  },
  {
    id: "etsy-tshirt-solo-leveling-4381922770",
    title: "Solo Leveling Arise T-Shirt: Unisex Ring-Spun Cotton Anime Tee",
    category: "tshirts",
    price: "$22.49+",
    originalPrice: "$29.99+",
    image: "assets/images/tshirt_solo_leveling.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4381922770/solo-leveling-arise-t-shirt-unisex-ring",
    featured: true,
    badge: "25% OFF Sale",
    description: "A soft and comfortable unisex T-shirt featuring a design inspired by Solo Leveling - Arise. This shirt is perfect for fans of the series looking to show off their love for the story. The classic fit and crew neckline make it versatile for any occasion, whether it's casual wear or a special event. Ideal for adults and made with durable ring-spun cotton, this T-shirt feels blissful to wear all year round."
  },
  {
    id: "etsy-tshirt-custom-4513208577",
    title: "Custom T-Shirt | Upload Your Design, Logo, Artwork (100% US Cotton)",
    category: "tshirts",
    price: "$31.83+",
    originalPrice: "$42.44+",
    image: "assets/images/tshirt_custom.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4513208577/custom-t-shirt-upload-your-design-logo",
    featured: true,
    badge: "25% OFF Sale",
    description: "Create your own one-of-a-kind personalized t-shirt! 🎨👕 Upload any design, logo, artwork, text, or photo and we’ll print it just for you. Perfect for gifts, birthdays, small businesses, events, couples, family trips, or everyday style."
  },
  {
    id: "etsy-tshirt-zenitsu-action-4374001198",
    title: "Zenitsu - Demon Slayer T-Shirt",
    category: "tshirts",
    price: "$28.12",
    originalPrice: "$37.49",
    image: "assets/images/tshirt_zenitsu_action.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4374001198/zenitsu-demon-slayer-t-shirt",
    featured: true,
    badge: "25% OFF Sale",
    description: "An action-packed design featuring Zenitsu from Demon Slayer, perfect for anime fans and otakus. This unisex heavy cotton tee offers comfort and durability, making it ideal for everyday wear or cosplay events. A must-have for anime enthusiasts and those looking to express their love for the series."
  },
  {
    id: "etsy-tshirt-akaza-graphic-4372946100",
    title: "Akaza Fan Art T-Shirt | Demon Slayer Anime Graphic Tee",
    category: "tshirts",
    price: "$31.78+",
    originalPrice: "$42.38+",
    image: "assets/images/tshirt_akaza_graphic_tee.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4372946100/akaza-demon-slayer-fan-art-tee-anime",
    featured: true,
    badge: "25% OFF Sale",
    description: "This oversized boxy tee carries the fierce energy of Akaza in bold, fan-made artwork. The print sits high on the chest, catching the eye with its sharp lines and crimson accents that echo Akaza’s intensity. Wear it when you want to channel that restless, driven spirit — whether you’re heading to a convention, sketching fan art at a cafe, or just vibing with fellow Demon Slayer fans. The roomy silhouette and dropped shoulders let the design breathe, while the midweight cotton keeps the shirt grounded and comfortable. It feels lived-in from the first wear, like an homage you already own."
  },
  {
    id: "etsy-tshirt-rengoku-4420870007",
    title: "Rengoku Demon Slayer Poster T-Shirt | Anime Flame Hashira Tee",
    category: "tshirts",
    price: "$23.43+",
    originalPrice: "$31.24+",
    image: "assets/images/tshirt_rengoku.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4420870007/tanjiro-and-nezuko-demon-slayer-action",
    featured: true,
    badge: "25% OFF Sale",
    description: "This lightweight cotton tee brings warm, vintage anime energy into everyday wear. The soft, breathable fabric drapes easily over the body and showcases a bold, poster-style graphic with distressed tones and cinematic typography. Wear it on slow mornings with jeans and sneakers, at anime nights, or layered under a jacket for a casual, lived-in look. The relaxed crew neck and classic fit let the artwork take center stage while staying comfortable through long days and late-night marathons."
  },
  {
    id: "etsy-tshirt-muzan-4421497880",
    title: "Muzan - Demon king Fan Art T-Shirt | Demon Slayer Anime Graphic Tee",
    category: "tshirts",
    price: "$23.43+",
    originalPrice: "$31.24+",
    image: "assets/images/tshirt_muzan.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4421497880/tanjiro-and-nezuko-demon-slayer-brother",
    featured: true,
    badge: "25% OFF Sale",
    description: "A soft, breathable cotton tee that wears like a quiet statement. The muted, vintage-style portrait print gives this shirt a film-noir edge—shadowed lines, Japanese characters, and a fedora silhouette that feels more like a memory than a logo. Lightweight and smooth against the skin, it drapes easily for everyday layering or slow Sunday lounging. Wear it when you want to read in a café, wander city streets at dusk, or anchor a relaxed outfit with an artful, nostalgic touch."
  },
  {
    id: "etsy-tshirt-zenitsu-sword-4424192908",
    title: "Zenitsu the Lightning Sword | T-Shirt, Demon Slayer Glow Design",
    category: "tshirts",
    price: "$23.43+",
    originalPrice: "$31.24+",
    image: "assets/images/tshirt_zenitsu_lightning_sword.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4424192908/zenitsu-lightning-sword-t-shirt-demon",
    featured: true,
    badge: "25% OFF Sale",
    description: "A lightweight, fan-focused tee that channels the pulse of lightning and the quiet focus of a sword-master. This shirt puts “Zenitsu” energy into your wardrobe: sudden, electric, and undeniably bold. The glow-inspired Demon Slayer motif sits bright against soft ring-spun cotton so each movement feels charged—like the moment right before a strike. Wear it when you want to carry that flash of bravery on a night out, at conventions, or while rewatching your favorite episodes. It sits comfortably under a jacket or stands alone as a statement piece for fans who know the story behind the thunder."
  },
  {
    id: "etsy-tshirt-akaza-3rdmoon-4381925806",
    title: "Akaza Demon Slayer T-Shirt, Anime Graphic Tee, Unisex Top, Manga Fan Gift",
    category: "tshirts",
    price: "$22.49+",
    originalPrice: "$29.99+",
    image: "assets/images/tshirt_akaza_3rd_moon.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4381925806/akaza-demon-slayer-t-shirt-anime-graphic",
    featured: true,
    badge: "25% OFF Sale",
    description: "This Akaza - Demon Slayer - 3rd Moon T-Shirt exudes a blend of fierce and mysterious vibes, perfect for fans of the anime and manga series. With its soft ring-spun cotton fabric and classic fit, it offers versatility and comfort for everyday wear. Ideal for adult anime enthusiasts, this T-Shirt is a great addition to any collection and a perfect gift for birthdays, holidays, and anime conventions."
  },

  // --- 12 MUGS ---
  {
    id: "etsy-mug-stitch-4520600198",
    title: "Stitch Character Mug | Blue Ceramic Coffee Tea Cup (11 oz or 15 oz)",
    category: "mugs",
    price: "$19.23+",
    originalPrice: "$25.64+",
    image: "assets/images/mug_stitch_blue.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4520600198/stitch-character-mug-blue-ceramic-coffee",
    featured: true,
    badge: "25% OFF Sale",
    description: "Bright, glossy ceramic mug featuring a playful blue alien character on a vibrant blue background. Each sip feels a little more joyful as the cheerful design peeks around the curve of the mug. The sturdy C-handle sits comfortably in your hand while the shiny finish highlights the crisp, saturated colors. This mug slips easily into daily routines — morning coffee, afternoon tea, late-night cocoa — and brings a lighthearted, nostalgic spark whenever you reach for it. Sized for bedside tables and office desks alike, it layers personality into everyday moments and small rituals."
  },
  {
    id: "etsy-mug-spiderman-comics-4513144842",
    title: "Spider-Man Comics Mug | Ceramic Comic Book Superhero Coffee Cup | 11oz",
    category: "mugs",
    price: "$19.84",
    originalPrice: "$26.45",
    image: "assets/images/mug_spiderman_comics.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4513144842/spider-man-comics-mug-ceramic-comic-book",
    featured: true,
    badge: "25% OFF Sale",
    description: "A glossy ceramic mug wrapped in high-contrast comic panels, with a bold spider emblem at the center. Each mug feels like a small tribute to classic comic-book energy — a morning companion that turns coffee into a moment of action. The sturdy C-handle and bright print make the mug easy to hold and a standout on the desk or kitchen shelf. Choose a bit more coffee with the 15oz size, or keep it compact with the 11oz."
  },
  {
    id: "etsy-mug-onepiece-comic-4423525633",
    title: "One piece Comic Panel Mug | Black and White Anime Collage Ceramic",
    category: "mugs",
    price: "$18.42",
    originalPrice: "$24.56",
    image: "assets/images/mug_onepiece_comic.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4423525633/focus-typography-mug-minimalist",
    featured: true,
    badge: "25% OFF Sale",
    description: "This 11 oz ceramic mug wraps your morning coffee in high-contrast, black-and-white comic panels that hum with adventure. The collage-style print shows expressive characters and dynamic scenes, giving every sip a little rush of story. It feels like settling into a quick escape between tasks — a quiet moment surrounded by bold inked lines and familiar faces. Easy to handle, the rounded C-handle fits comfortably whether you’re scrolling through panels on a break or settling in to read. The sturdy white ceramic keeps the art looking sharp while standing up to daily use in the kitchen."
  },
  {
    id: "etsy-mug-zenitsu-lightning-4420055286",
    title: "Zenitsu Agatsuma Lightning Design Mug | Demon Slayer Anime Ceramic Mug",
    category: "mugs",
    price: "$18.70",
    originalPrice: "$24.93",
    image: "assets/images/mug_zenitsu_lightning_design.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4420055286/zenitsu-agatsuma-lightning-design-mug",
    featured: true,
    badge: "25% OFF Sale",
    description: "Feel the crackle of lightning with every sip. This ceramic mug channels Zenitsu Agatsuma’s electric energy—bold yellow streaks and dynamic lightning motifs wrap around a glossy white canvas. Hold it in the morning as you brace for a long day of training, bingeing episodes, or sketching fan art; the fast, vibrant print keeps the scene alive while the sturdy C-handle feels familiar and steady in your grip. It pairs naturally with late-night anime marathons, cosplay prep, or quiet moments of focus before conventions. There’s a rush in the design that speaks to fans who love high-voltage emotion and fast-moving scenes—this mug brings that pulse into everyday rituals."
  },
  {
    id: "etsy-mug-demonslayer-crew-4420141552",
    title: "Demon Slayer Characters Tanjiro Nezuko Zenitsu Inosuke Ceramic Mug",
    category: "mugs",
    price: "$18.74",
    originalPrice: "$24.99",
    image: "assets/images/mug_demonslayer_chibi_crew.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4420141552/demon-slayer-characters-tanjiro-nezuko",
    featured: true,
    badge: "25% OFF Sale",
    description: "Morning light catches the glossy surface and the familiar faces of Tanjiro, Nezuko, Zenitsu, and Inosuke come alive. This ceramic mug turns a simple coffee or tea pause into a quiet moment with the Demon Slayer crew — laughter from Zenitsu, quiet resolve from Tanjiro, wild energy from Inosuke, and the warm presence of Nezuko. Slip your hands around the C-handle, feel the smooth shine, and let the colors pull you into that rush of adventure before the day begins or during a late-night binge session. It sits on your desk, shelf, or bedside table like a small flag for fellow fans: a subtle way to bring fandom into everyday rituals and to share a grin with anyone who recognizes the art."
  },
  {
    id: "etsy-mug-you-keep-me-sane-4520719239",
    title: "You Keep Me sane | Fuck This Shit patterned black & white mug | 11oz",
    category: "mugs",
    price: "$17.14+",
    originalPrice: "$22.85+",
    image: "assets/images/mug_you_keep_me_sane.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4520719239/you-keep-me-sane-fuck-this-shit",
    featured: true,
    badge: "25% OFF Sale",
    description: "A warm, everyday mug that carries a calm, hand-drawn rhythm across its surface. Thin, repetitive banded patterns wrap around the glossy ceramic, giving the mug a subtle, meditative look that fits a quiet morning or an evening pause. The comfortable C-handle and smooth finish invite slow sips and small rituals — whether the mug begins a workday, accompanies a study session, or becomes part of a cozy night in."
  },
  {
    id: "etsy-mug-minion-wall-4520608193",
    title: "Breaking Wall Minion Mug | Ceramic Mug",
    category: "mugs",
    price: "$19.18",
    originalPrice: "$25.57",
    image: "assets/images/mug_minion_breaking_wall.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4520608193/breaking-wall-minion-mug-ceramic-mug",
    featured: true,
    badge: "25% OFF Sale",
    description: "Bright, glossy ceramic mug featuring playful characters breaking through a cracked-wall design. The clean white background makes the colorful figures pop, bringing a burst of energy to morning coffee, afternoon tea, or a desk-side cold drink. The comfortable C-handle and smooth shiny finish add everyday comfort. Choose 11oz for a classic cup or 15oz when you want an extra pour. Durable, lead- and BPA-free, and printed with vibrant inks that resist fading, this mug adds a playful, animated touch to routines and work breaks."
  },
  {
    id: "etsy-mug-squidward-tuesday-4520605561",
    title: "It's Still Tuesday Mug | Squidward Tentacles: SpongeBob and Patrick's grumpy | Ceramic Coffee Cup",
    category: "mugs",
    price: "$19.18",
    originalPrice: "$25.57",
    image: "assets/images/mug_squidward_tuesday.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4520605561/its-still-tuesday-mug-squidward",
    featured: true,
    badge: "25% OFF Sale",
    description: "Sip slowly and smile — this glossy ceramic mug carries a quiet, wry moment: a soft teal backdrop with hand-lettered text that reads \"It's Still Tuesday.\" The gentle palette and casual script make it feel like a private joke between mornings. It’s the kind of cup you reach for when the week feels long but steady: warm coffee, a slow inhale, and the reminder that small, ordinary moments persist."
  },
  {
    id: "etsy-mug-simpsons-4520594247",
    title: "Simpsons Cartoon Character Mug | Funny Coffee Tea Cup",
    category: "mugs",
    price: "$19.10",
    originalPrice: "$25.47",
    image: "assets/images/mug_simpsons.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4520594247/simpsons-cartoon-character-mug-funny",
    featured: true,
    badge: "25% OFF Sale",
    description: "Bright, glossy ceramic mug that brings a playful, nostalgic energy to everyday coffee and tea rituals. The vivid, full-color print wraps around the mug and pops against the white ceramic, while the comfortable C-handle keeps each sip easy. Use it for morning routines, late-night snacks, or as a cheerful companion on busy workdays — the sturdy construction and dishwasher/microwave-safe finish mean the design stays vibrant through regular use. Lead- and BPA-free for confident daily drinking."
  },
  {
    id: "etsy-mug-onepiece-black-4419478620",
    title: "One Piece Fan Art Mug | Black 11oz 15oz",
    category: "mugs",
    price: "$18.88+",
    originalPrice: "$25.18+",
    image: "assets/images/mug_onepiece_black.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4419478620/one-piece-fan-art-mug-black-11oz-15oz",
    featured: true,
    badge: "25% OFF Sale",
    description: "This black ceramic mug brings a touch of fandom to slow mornings and late-night sketches. The glossy deep-black surface makes colors pop — that one-piece fan art jumps off the cup with crisp, vibrant tones. Hold it by the C-shaped handle and feel the weight of something made for quiet, focused moments: sipping strong coffee between episodes, sketching fan scenes, or trading theories with friends. It’s designed for adults who treat their mug as part of their ritual — a small stage for beloved characters and bold artwork during streaming marathons, convention prep, or a calm weekend at the desk."
  },
  {
    id: "etsy-mug-onepiece-white-4513261516",
    title: "One Piece Fan Art Mug | White 11oz 15oz",
    category: "mugs",
    price: "$18.62+",
    originalPrice: "$24.83+",
    image: "assets/images/mug_onepiece_white.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4513261516/one-piece-fan-art-mug-white-11oz-15oz",
    featured: true,
    badge: "25% OFF Sale",
    description: "Sip your morning brew with a wink of adventure. This glossy ceramic mug lines your desk with tiny, cheeky skull-and-crossbones characters—each one a playful nod to sailor stories and treasure-maps. The artwork wraps around the cup so every raise reveals a new face: bold colors pop against the bright white ceramic, and the smooth C-handle feels steady in hand. It’s the kind of mug that starts conversations, brightens slow mornings, and keeps your coffee ritual feeling a little more mischievous."
  },
  {
    id: "etsy-mug-king-of-pop-4420053828",
    title: "King of Pop Fan Art Ceramic Mug | white 11oz 15oz",
    category: "mugs",
    price: "$18.07+",
    originalPrice: "$24.10+",
    image: "assets/images/mug_king_of_pop.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4420053828/tanjiro-and-nezuko-demon-slayer-mug",
    featured: true,
    badge: "25% OFF Sale",
    description: "Abstract Sketch Art Mug – Minimalist Black Ink Illustration Coffee Cup – Artistic Gift for Music Lovers & Creatives\nThis unique ceramic mug showcases expressive hand-drawn sketch artwork with a modern minimalist aesthetic. Designed with bold black ink lines and emotional abstract movement, this mug is perfect for anyone who loves contemporary art and creative designs.\nWhether you’re sipping coffee at work or relaxing at home, this artistic mug adds personality and style to every moment."
  },

  // --- OTHER CATEGORIES ---
  // --- SWEATSHIRTS (2 Items) ---
  {
    id: "etsy-sweatshirt-nezuko-4374532507",
    title: "Nezuko Demon Slayer Serious Mode Sweatshirt | Anime Manga",
    category: "sweatshirts",
    price: "$35.62+",
    originalPrice: "$47.49+",
    image: "assets/images/sweatshirt_nezuko_serious.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4374532507/nezuko-demon-slayer-serious-mode",
    featured: true,
    badge: "25% OFF Sale",
    description: "This crewneck sweatshirt channels the fierce calm of Nezuko’s Serious Mode—quiet strength rendered in clean lines and thoughtful details. The heavyweight, 50/50 cotton-poly fabric sits substantial against the skin, offering a steady, comforting weight when you want to feel grounded. Embroidered and DTG/DTF-printed elements echo the character’s intensity without shouting, so the piece works whether you’re layering for a convention, settling in for an anime marathon, or wearing a subtle nod to your fandom on a coffee run. The classic crew silhouette and reinforced stitching mean it moves with you and holds up wash after wash. It’s for fans who appreciate authenticity: understated, durable, and made with careful finishes that honor both craft and comfort."
  },
  {
    id: "etsy-sweatshirt-akaza-longsleeve-4374521754",
    title: "Akaza - Demon Slayer - Unisex Ultra Cotton Long Sleeve Tee",
    category: "sweatshirts",
    price: "$24.37+",
    originalPrice: "$32.49+",
    image: "assets/images/sweatshirt_akaza_longsleeve.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4374521754/akaza-demon-slayer-unisex-ultra-cotton",
    featured: true,
    badge: "25% OFF Sale",
    description: "This demon slayer-inspired Tee exudes action-packed manga vibes, perfect for fans of the genre. The design features Akaza, Fit for adults, this Tee is a must-have for anime enthusiasts and fans of demon slayer. Ideal for gifting on birthdays, holidays, and special occasions."
  },

  // --- DIGITAL & ACCESSORIES ---
  {
    id: "etsy-digital-baby-cat-4371118833",
    title: "Baby and Cat Cuddle Art Print: Nursery Decor (Digital Download)",
    category: "digital",
    price: "$3.20",
    originalPrice: "$4.28",
    image: "assets/images/digital_baby_cat.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4371118833/baby-and-cat-cuddle-art-print-nursery",
    featured: true,
    badge: "25% OFF Sale",
    description: "Bring warmth and tenderness to your home with this beautiful digital artwork of a peaceful baby sleeping while cuddling a cat. The soft colors, gentle details, and dreamy atmosphere make it a perfect addition to any nursery, bedroom, or cozy corner."
  },
  {
    id: "etsy-accessory-phonecase-4425482448",
    title: "Anime Thunder Swordsman Phone Case | Yellow Lightning Manga Art",
    category: "accessories",
    price: "$28.12",
    originalPrice: "$37.49",
    image: "assets/images/accessory_phonecase_thunder.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4425482448/anime-inspired-thunder-demon-slayer",
    featured: true,
    badge: "25% OFF Sale",
    description: "This anime-inspired phone case is inspired by a legendary thunder swordsman known for his yellow lightning style and calm focus before battle. Designed with a bold manga aesthetic, this phone case is perfect for fans of anime and powerful warrior art."
  },

  // --- HOME DECOR (2 Items) ---
  {
    id: "etsy-homedecor-anime-poster-4519110532",
    title: "All time trend Anime Poster — Home Decoration - Otaku - Rolled Art Print",
    category: "homedecor",
    price: "$20.99+",
    originalPrice: "$27.99+",
    image: "assets/images/homedecor_anime_poster.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4519110532/all-time-trend-anime-poster-home",
    featured: true,
    badge: "25% OFF Sale",
    description: "A rolled poster that brings a favorite story to the wall with painterly textures and rich, archival color. Each design feels like a page torn from an illustrated travel journal — vintage paper tones, hand-sketched details and vibrant character art combine to make a quiet, adventurous mood. Hang the poster in a studio, dorm room, or living space to recall afternoons lost in stories and the small, restless joy of exploring new worlds."
  },
  {
    id: "etsy-homedecor-modern-posters-4519131125",
    title: "Decorative Rolled Posters - Modern Home Painting decorative art",
    category: "homedecor",
    price: "$20.05+",
    originalPrice: "$26.74+",
    image: "assets/images/homedecor_modern_posters.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4519131125/decorative-rolled-posters-modern-home",
    featured: true,
    badge: "25% OFF Sale",
    description: "A rolled poster that brings gallery-quality artwork into everyday spaces. Rich giclée color and textured paper options give each composition depth — from storm-worn lighthouses to quiet equine portraits — so the image feels alive on the wall. Choose the weight and finish that suits your room: delicate, textured fine art; crisp semi-gloss; or understated matte. Each poster arrives rolled for safe shipping and invites a moment of calm, wonder, or drama when unrolled and displayed."
  },
  {
    id: "etsy-entertainment-puzzle-4520612009",
    title: "Nostalgia - inspired Character Collage Puzzle 520 Piece | Jigsaw Puzzle",
    category: "entertainment",
    price: "$52.61",
    originalPrice: "$70.15",
    image: "assets/images/entertainment_jigsaw_puzzle.jpg",
    platform: "etsy",
    url: "https://tamaravibes.etsy.com/listing/4520612009/nostalgia-inspired-character-collage",
    featured: true,
    badge: "25% OFF Sale",
    description: "A warmly nostalgic jigsaw that brings a bustling, storybook scene to life piece by piece. Rich, glossy colors and tight printing reveal tiny characters and hidden details with every connection — a comforting, focused escape for anyone who loves slow, imaginative evenings. As you assemble the chipboard pieces, familiar faces and whimsical creatures emerge, turning a quiet table into a portal to memory and wonder. The sturdy box keeps artwork safe between sessions, and multiple piece-count options let you choose a quick, cozy challenge or a longer, meditative build. Display the finished puzzle on a wall or return it to the box as a cherished keepsake."
  }
];

// AMAZON KDP BOOKS DATA
const amazonBooks = [
  {
    id: "book-abc-alphabet",
    asin: "B0HBLJSJYC",
    title: "The Big ABC Alphabet Coloring Book for Kids",
    subtitle: "Learn Letters with Animals, Fruits, Ocean Creatures, Vehicles, Farm Animals, Dinosaurs, Nature & Everyday Objects",
    author: "Tamara Vibes",
    description: "Introduce your little learner to the exciting world of the alphabet! Every page features large, easy-to-color illustrations paired with A-Z letters to help children improve letter recognition, creativity, and fine motor skills.",
    cover: "assets/images/book_abc_coloring.jpg",
    platform: "amazon",
    url: "https://www.amazon.com/dp/B0HBLJSJYC",
    format: "Paperback Activity Book",
    ageRange: "Ages 3 – 6 Years",
    featured: true,
    badge: "Amazon KDP Book",
    highlights: [
      "A-Z Alphabet Coloring Pages (Animals, Fruits, Vehicles & Dinosaurs)",
      "Large, simple illustrations perfect for little hands",
      "Single-sided pages to reduce bleed-through",
      "Ideal for preschool, kindergarten & homeschooling"
    ]
  },
  {
    id: "book-magic-donuts",
    asin: "B0HBKQHSKN",
    title: "Tamara and the Magic Donuts",
    subtitle: "A Magical Bedtime Adventure About Kindness, Curiosity, and Friendship",
    author: "Tamara Vibes",
    description: "Join Tamara on a magical adventure! When a delicious smell of fresh donuts leads Tamara to a mysterious factory, she discovers sparkling sprinkles, friendly donut fairies, and learns that the greatest magic comes from kindness, bravery, and helping others.",
    cover: "assets/images/book_magic_donuts.jpg",
    platform: "amazon",
    url: "https://www.amazon.com/dp/B0HBKQHSKN",
    format: "Hardcover / Paperback",
    ageRange: "Ages 4 – 12 Years",
    featured: true,
    badge: "Amazon KDP Book",
    highlights: [
      "Sparkling sprinkles & friendly donut fairies",
      "Teaches kindness, bravery & empathy",
      "Encourages imagination & curiosity",
      "Perfect for bedtime & family story time"
    ]
  }
];

// CUSTOMER REVIEWS (VERIFIED ETSY SHOP REVIEWS - TAMARAVIBES)
const customerReviews = [
  {
    id: "rev-1",
    author: "Jessica L.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Dec 2025",
    productName: "Spider-Man Comics Mug",
    comment: "Great gift and customer service was amazing! They made an extra effort to ensure we got it for Christmas. Highly recommend ordering from this company!"
  },
  {
    id: "rev-2",
    author: "Michael B.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Jan 2026",
    productName: "Akaza Fan Art T-Shirt",
    comment: "Good quality product! The fit was perfect and the material feels premium. Shirt arrived quickly too."
  },
  {
    id: "rev-3",
    author: "Amanda K.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Jan 2026",
    productName: "Stitch Character Mug",
    comment: "Bought for a coworker and he loved it! High-quality ceramic and print. The design pops so nicely."
  },
  {
    id: "rev-4",
    author: "Rachel S.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Feb 2026",
    productName: "Zenitsu Lightning Mug",
    comment: "Seller was wonderfully communicative and friendly! Shipping was fast and the item is even cuter in person."
  },
  {
    id: "rev-5",
    author: "Daniel P.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Feb 2026",
    productName: "One Piece Comic Panel Mug",
    comment: "Awesome anime mug! The black and white manga collage detail is super sharp and clear. Extremely satisfied with this purchase."
  },
  {
    id: "rev-6",
    author: "Samantha W.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Mar 2026",
    productName: "Nezuko Serious Mode Sweatshirt",
    comment: "Super comfortable sweatshirt! Super cozy fleece lining and the print quality is top notch. Will definitely buy again!"
  },
  {
    id: "rev-7",
    author: "Brandon M.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Apr 2026",
    productName: "It's Still Tuesday Mug",
    comment: "Gave this to my husband as a fun gift for his home office. The print text and color look exactly like the listing photos. 5 stars!"
  },
  {
    id: "rev-8",
    author: "Emily H.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "May 2026",
    productName: "Simpsons Cartoon Mug",
    comment: "Fast shipping and fantastic customer service! The bright colors on Homer and donuts are so fun. Loved it!"
  },
  {
    id: "rev-9",
    author: "Christopher G.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Jun 2026",
    productName: "All time trend Anime Poster",
    comment: "Print quality is remarkable! Beautiful archival paper, packaged safely in a sturdy tube. Looks amazing framed on my wall."
  },
  {
    id: "rev-10",
    author: "Hannah T.",
    location: "Verified Etsy Buyer",
    rating: 5,
    date: "Jul 2026",
    productName: "Baby & Cat Cuddle Digital Art",
    comment: "Such a heartwarming digital print for our nursery room. High-resolution file printed crisp and clear. Thank you!"
  }
];

// SOCIAL MEDIA LINKS
const socialLinks = {
  facebook: "https://www.facebook.com/tamtamvibes",
  pinterest: "https://www.pinterest.com/tamaravibes",
  instagram: "https://www.instagram.com/bymohamedgaafer"
};
