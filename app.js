document.body.classList.add('js-enabled');

// --- DATA and ASSETS ---
const countryData = {
    "Algeria": {
        "id": "algeria",
        "name": "Algeria",
        "capital": "Algiers",
        "population": "44M",
        "languages": "Arabic, Tamazight",
        "currency": "Algerian Dinar",
        "description": "The largest country in Africa, featuring the Sahara Desert and ancient Roman ruins like Timgad.",
        "fact": "Algeria has seven UNESCO World Heritage Sites.",
        "iso": "dz",
        "gdp": "$193B",
        "area": "2.38M km²"
    },
    "Angola": {
        "id": "angola",
        "name": "Angola",
        "capital": "Luanda",
        "population": "35M",
        "languages": "Portuguese",
        "currency": "Kwanza",
        "description": "Known for its vast oil reserves and the spectacular Kalandula Falls.",
        "fact": "The giant sable antelope, thought to be extinct, was rediscovered here.",
        "iso": "ao",
        "gdp": "$106B",
        "area": "1.25M km²"
    },
    "Benin": {
        "id": "benin",
        "name": "Benin",
        "capital": "Porto-Novo",
        "population": "13M",
        "languages": "French",
        "currency": "West African CFA franc",
        "description": "The birthplace of the Vodun (Voodoo) religion and home to the Royal Palaces of Abomey.",
        "fact": "Benin was the seat of one of the oldest and most powerful African kingdoms, Dahomey.",
        "iso": "bj",
        "gdp": "$19B",
        "area": "114K km²"
    },
    "Botswana": {
        "id": "botswana",
        "name": "Botswana",
        "capital": "Gaborone",
        "population": "2.6M",
        "languages": "English, Setswana",
        "currency": "Pula",
        "description": "A premier safari destination, home to the Okavango Delta and large elephant populations.",
        "fact": "Botswana is home to the world’s largest concentration of African elephants.",
        "iso": "bw",
        "gdp": "$20B",
        "area": "582K km²"
    },
    "Burkina Faso": {
        "id": "burkina_faso",
        "name": "Burkina Faso",
        "capital": "Ouagadougou",
        "population": "22M",
        "languages": "French",
        "currency": "West African CFA franc",
        "description": "Known for its rich musical traditions and the annual FESPACO film festival.",
        "fact": "The country’s name means 'Land of Incorruptible People'.",
        "iso": "bf",
        "gdp": "$20B",
        "area": "274K km²"
    },
    "Burundi": {
        "id": "burundi",
        "name": "Burundi",
        "capital": "Gitega",
        "population": "13M",
        "languages": "Kirundi, French, English",
        "currency": "Burundian Franc",
        "description": "A small nation with a big heart, known for its drumming traditions and Lake Tanganyika.",
        "fact": "The Royal Drummers of Burundi are world-famous for their synchronized drumming.",
        "iso": "bi",
        "gdp": "$4B",
        "area": "27K km²"
    },
    "Cameroon": {
        "id": "cameroon",
        "name": "Cameroon",
        "capital": "Yaoundé",
        "population": "27M",
        "languages": "French, English",
        "currency": "Central African CFA franc",
        "description": "Often called 'Africa in miniature' for its geological and cultural diversity.",
        "fact": "It is home to over 200 different linguistic groups.",
        "iso": "cm",
        "gdp": "$49B",
        "area": "475K km²"
    },
    "Cape Verde": {
        "id": "cape_verde",
        "name": "Cape Verde",
        "capital": "Praia",
        "population": "0.6M",
        "languages": "Portuguese",
        "currency": "Cape Verdean Escudo",
        "description": "An island nation known for its Creole Portuguese-African culture and Morna music.",
        "fact": "Charles Darwin visited Cape Verde on his voyage with the HMS Beagle.",
        "iso": "cv",
        "gdp": "$2B",
        "area": "4K km²"
    },
    "Central African Republic": {
        "id": "central_african_republic",
        "name": "Central African Republic",
        "capital": "Bangui",
        "population": "5M",
        "languages": "Sango, French",
        "currency": "Central African CFA franc",
        "description": "Rich in biodiversity, with vast rainforests and wildlife populations.",
        "fact": "It is one of the best places to see forest elephants and western lowland gorillas.",
        "iso": "cf",
        "gdp": "$2.7B",
        "area": "622K km²"
    },
    "Chad": {
        "id": "chad",
        "name": "Chad",
        "capital": "N'Djamena",
        "population": "17M",
        "languages": "French, Arabic",
        "currency": "Central African CFA franc",
        "description": "Home to the Tibesti Mountains and Lake Chad, a vital water source for the region.",
        "fact": "Lake Chad has shrunk by 95% since the 1960s but remains a critical ecosystem.",
        "iso": "td",
        "gdp": "$12B",
        "area": "1.28M km²"
    },
    "Comoros": {
        "id": "comoros",
        "name": "Comoros",
        "capital": "Moroni",
        "population": "0.9M",
        "languages": "Comorian, French, Arabic",
        "currency": "Comorian Franc",
        "description": "A volcanic archipelago known as the 'Perfume Islands' for its fragrant plant life.",
        "fact": "It is the world’s largest producer of ylang-ylang essence.",
        "iso": "km",
        "gdp": "$1.3B",
        "area": "2.2K km²"
    },
    "Congo": {
        "id": "congo",
        "name": "Congo",
        "capital": "Brazzaville",
        "population": "6M",
        "languages": "French",
        "currency": "Central African CFA franc",
        "description": "Home to the Odzala-Kokoua National Park and western lowland gorillas.",
        "fact": "The Congo River is the deepest river in the world.",
        "iso": "cg",
        "gdp": "$15B",
        "area": "342K km²"
    },
    "Djibouti": {
        "id": "djibouti",
        "name": "Djibouti",
        "capital": "Djibouti City",
        "population": "1M",
        "languages": "French, Arabic",
        "currency": "Djiboutian Franc",
        "description": "Located at the Horn of Africa, known for its unique geological landscapes like Lake Assal.",
        "fact": "Lake Assal is the lowest point on land in Africa and the third lowest on Earth.",
        "iso": "dj",
        "gdp": "$3.8B",
        "area": "23K km²"
    },
    "Egypt": {
        "id": "egypt",
        "name": "Egypt",
        "capital": "Cairo",
        "population": "111M",
        "languages": "Arabic",
        "currency": "Egyptian Pound",
        "description": "Home to the Pyramids of Giza, one of the Seven Wonders of the Ancient World, and the Nile River.",
        "fact": "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.",
        "iso": "eg",
        "gdp": "$476B",
        "area": "1M km²"
    },
    "Equatorial Guinea": {
        "id": "equatorial_guinea",
        "name": "Equatorial Guinea",
        "capital": "Malabo",
        "population": "1.6M",
        "languages": "Spanish, French, Portuguese",
        "currency": "Central African CFA franc",
        "description": "The only Spanish-speaking country in Africa, consisting of a mainland and islands.",
        "fact": "Its capital city, Malabo, is located on an island, not on the mainland.",
        "iso": "gq",
        "gdp": "$16B",
        "area": "28K km²"
    },
    "Eritrea": {
        "id": "eritrea",
        "name": "Eritrea",
        "capital": "Asmara",
        "population": "3.6M",
        "languages": "Tigrinya, Arabic, English",
        "currency": "Nakfa",
        "description": "Known for its Italian colonial architecture in Asmara and Red Sea coastline.",
        "fact": "Asmara is a UNESCO World Heritage site for its Modernist architecture.",
        "iso": "er",
        "gdp": "$2.6B",
        "area": "117K km²"
    },
    "Ethiopia": {
        "id": "ethiopia",
        "name": "Ethiopia",
        "capital": "Addis Ababa",
        "population": "123M",
        "languages": "Amharic",
        "currency": "Birr",
        "description": "The cradle of humanity, home to Lalibela's rock-hewn churches and the Simien Mountains.",
        "fact": "Ethiopia is the only African nation never to be colonized.",
        "iso": "et",
        "gdp": "$156B",
        "area": "1.1M km²"
    },
    "Gabon": {
        "id": "gabon",
        "name": "Gabon",
        "capital": "Libreville",
        "population": "2.3M",
        "languages": "French",
        "currency": "Central African CFA franc",
        "description": "A haven for nature lovers, with over 10% of its land protected as national parks.",
        "fact": "Gabon is home to the 'surfing hippos' found on its beaches.",
        "iso": "ga",
        "gdp": "$22B",
        "area": "267K km²"
    },
    "Gambia": {
        "id": "gambia",
        "name": "Gambia",
        "capital": "Banjul",
        "population": "2.7M",
        "languages": "English",
        "currency": "Dalasi",
        "description": "The smallest country on mainland Africa, known for its diverse birdlife along the Gambia River.",
        "fact": "It is completely surrounded by Senegal, except for its coastline.",
        "iso": "gm",
        "gdp": "$2.2B",
        "area": "10.6K km²"
    },
    "Ghana": {
        "id": "ghana",
        "name": "Ghana",
        "capital": "Accra",
        "population": "33M",
        "languages": "English",
        "currency": "Cedi",
        "description": "Famous for its friendly people, historic slave castles, and vibrant Kente cloth.",
        "fact": "Lake Volta is the largest man-made lake in the world by surface area.",
        "iso": "gh",
        "gdp": "$77B",
        "area": "238K km²"
    },
    "Guinea": {
        "id": "guinea",
        "name": "Guinea",
        "capital": "Conakry",
        "population": "14M",
        "languages": "French",
        "currency": "Guinean Franc",
        "description": "Rich in minerals and the source of the Niger, Gambia, and Senegal rivers.",
        "fact": "Guinea possesses over a quarter of the world's bauxite reserves.",
        "iso": "gn",
        "gdp": "$21B",
        "area": "245K km²"
    },
    "Guinea-Bissau": {
        "id": "guinea_bissau",
        "name": "Guinea-Bissau",
        "capital": "Bissau",
        "population": "2M",
        "languages": "Portuguese",
        "currency": "West African CFA franc",
        "description": "Known for the Bijagós Archipelago, a UNESCO Biosphere Reserve.",
        "fact": "The Bijagós islands are home to rare saltwater hippos.",
        "iso": "gw",
        "gdp": "$1.9B",
        "area": "36K km²"
    },
    "Ivory Coast": {
        "id": "ivory_coast",
        "name": "Ivory Coast",
        "capital": "Yamoussoukro",
        "population": "28M",
        "languages": "French",
        "currency": "West African CFA franc",
        "description": "The world's largest producer of cocoa and home to the Basilica of Our Lady of Peace.",
        "fact": "The Basilica in Yamoussoukro is the largest church in the world.",
        "iso": "ci",
        "gdp": "$79B",
        "area": "322K km²"
    },
    "Kenya": {
        "id": "kenya",
        "name": "Kenya",
        "capital": "Nairobi",
        "population": "54M",
        "languages": "Swahili, English",
        "currency": "Kenyan Shilling",
        "description": "A top safari destination with the Maasai Mara and diverse landscapes from savannahs to mountains.",
        "fact": "Kenya is home to the 'Big Five' game animals.",
        "iso": "ke",
        "gdp": "$116B",
        "area": "580K km²"
    },
    "Lesotho": {
        "id": "lesotho",
        "name": "Lesotho",
        "capital": "Maseru",
        "population": "2.3M",
        "languages": "Sesotho, English",
        "currency": "Loti",
        "description": "The 'Kingdom in the Sky', the only country in the world entirely above 1,000m elevation.",
        "fact": "It is one of only three enclaved countries in the world.",
        "iso": "ls",
        "gdp": "$2.5B",
        "area": "30K km²"
    },
    "Liberia": {
        "id": "liberia",
        "name": "Liberia",
        "capital": "Monrovia",
        "population": "5.3M",
        "languages": "English",
        "currency": "Liberian Dollar",
        "description": "Africa's oldest republic, founded by freed slaves from the United States.",
        "fact": "Its capital, Monrovia, is named after U.S. President James Monroe.",
        "iso": "lr",
        "gdp": "$4.3B",
        "area": "111K km²"
    },
    "Libya": {
        "id": "libya",
        "name": "Libya",
        "capital": "Tripoli",
        "population": "7M",
        "languages": "Arabic",
        "currency": "Libyan Dinar",
        "description": "Home to the Sahara Desert and the spectacular Roman ruins of Leptis Magna.",
        "fact": "Libya has the longest Mediterranean coastline of any African nation.",
        "iso": "ly",
        "gdp": "$40B",
        "area": "1.76M km²"
    },
    "Madagascar": {
        "id": "madagascar",
        "name": "Madagascar",
        "capital": "Antananarivo",
        "population": "29M",
        "languages": "Malagasy, French",
        "currency": "Ariary",
        "description": "An island continent with unique wildlife like lemurs and the Avenue of the Baobabs.",
        "fact": "Over 90% of its wildlife is found nowhere else on Earth.",
        "iso": "mg",
        "gdp": "$16B",
        "area": "587K km²"
    },
    "Malawi": {
        "id": "malawi",
        "name": "Malawi",
        "capital": "Lilongwe",
        "population": "20M",
        "languages": "English, Chichewa",
        "currency": "Malawian Kwacha",
        "description": "Known as the 'Warm Heart of Africa', dominated by the massive Lake Malawi.",
        "fact": "Lake Malawi contains more fish species than any other lake in the world.",
        "iso": "mw",
        "gdp": "$13B",
        "area": "118K km²"
    },
    "Mali": {
        "id": "mali",
        "name": "Mali",
        "capital": "Bamako",
        "population": "22M",
        "languages": "Bambara, French",
        "currency": "West African CFA franc",
        "description": "Home to the historic city of Timbuktu and the Great Mosque of Djenne.",
        "fact": "Mansa Musa, ruler of the Mali Empire, is considered the richest person in history.",
        "iso": "ml",
        "gdp": "$19B",
        "area": "1.24M km²"
    },
    "Mauritania": {
        "id": "mauritania",
        "name": "Mauritania",
        "capital": "Nouakchott",
        "population": "4.7M",
        "languages": "Arabic",
        "currency": "Ouguiya",
        "description": "Where the desert meets the ocean, home to the Banc d'Arguin National Park.",
        "fact": "The rich coastal waters make fishing a primary industry.",
        "iso": "mr",
        "gdp": "$10B",
        "area": "1.03M km²"
    },
    "Mauritius": {
        "id": "mauritius",
        "name": "Mauritius",
        "capital": "Port Louis",
        "population": "1.3M",
        "languages": "English, French",
        "currency": "Mauritian Rupee",
        "description": "A tropical paradise known for its beaches, lagoons, and reefs.",
        "fact": "It was the only known home of the dodo bird before its extinction.",
        "iso": "mu",
        "gdp": "$11.5B",
        "area": "2K km²"
    },
    "Morocco": {
        "id": "morocco",
        "name": "Morocco",
        "capital": "Rabat",
        "population": "37M",
        "languages": "Arabic, Tamazight",
        "currency": "Moroccan Dirham",
        "description": "A land of medinas, souks, and the Atlas Mountains, blending Arab, Berber, and European influences.",
        "fact": "The University of Al Quaraouiyine is the oldest existing, continually operating educational institution in the world.",
        "iso": "ma",
        "gdp": "$142B",
        "area": "446K km²"
    },
    "Mozambique": {
        "id": "mozambique",
        "name": "Mozambique",
        "capital": "Maputo",
        "population": "33M",
        "languages": "Portuguese",
        "currency": "Metical",
        "description": "Known for its stunning coastline, coral reefs, and the Bazaruto Archipelago.",
        "fact": "The Chapel of Nossa Senhora de Baluarte is considered the oldest European building in the Southern Hemisphere.",
        "iso": "mz",
        "gdp": "$20B",
        "area": "801K km²"
    },
    "Namibia": {
        "id": "namibia",
        "name": "Namibia",
        "capital": "Windhoek",
        "population": "2.5M",
        "languages": "English",
        "currency": "Namibian Dollar",
        "description": "Home to the Namib Desert, the oldest in the world, and the wildlife of Etosha National Park.",
        "fact": "It has the highest sand dunes in the world at Sossusvlei.",
        "iso": "na",
        "gdp": "$13B",
        "area": "825K km²"
    },
    "Niger": {
        "id": "niger",
        "name": "Niger",
        "capital": "Niamey",
        "population": "26M",
        "languages": "French",
        "currency": "West African CFA franc",
        "description": "Named after the Niger River, featuring the Air Mountains and Tenere Desert.",
        "fact": "It is home to the 'Tree of Ténéré', once considered the most isolated tree on Earth.",
        "iso": "ne",
        "gdp": "$15B",
        "area": "1.27M km²"
    },
    "Nigeria": {
        "id": "nigeria",
        "name": "Nigeria",
        "capital": "Abuja",
        "population": "218M",
        "languages": "English",
        "currency": "Naira",
        "description": "The most populous country in Africa, a cultural powerhouse known for Nollywood and Afrobeats.",
        "fact": "Over 500 indigenous languages are spoken in Nigeria.",
        "iso": "ng",
        "gdp": "$477B",
        "area": "923K km²"
    },
    "La Reunion": {
        "id": "la_reunion",
        "name": "La Réunion",
        "capital": "Saint-Denis",
        "population": "0.9M",
        "languages": "French",
        "currency": "Euro",
        "description": "A French overseas department known for its volcanic landscape and hiking trails.",
        "fact": "Piton de la Fournaise is one of the most active volcanoes in the world.",
        "iso": "re",
        "gdp": "$20B",
        "area": "2.5K km²"
    },
    "Rwanda": {
        "id": "rwanda",
        "name": "Rwanda",
        "capital": "Kigali",
        "population": "13M",
        "languages": "Kinyarwanda, English, French",
        "currency": "Rwandan Franc",
        "description": "The 'Land of a Thousand Hills', famous for its mountain gorillas and clean capital, Kigali.",
        "fact": "Rwanda has the highest percentage of women in parliament in the world.",
        "iso": "rw",
        "gdp": "$13B",
        "area": "26K km²"
    },
    "Sao Tome and Principe": {
        "id": "sao_tome_and_principe",
        "name": "Sao Tome and Principe",
        "capital": "São Tomé",
        "population": "0.2M",
        "languages": "Portuguese",
        "currency": "Dobra",
        "description": "An island nation known for its cocoa production and dramatic volcanic spires.",
        "fact": "It was one of the first countries in Africa to grow cocoa.",
        "iso": "st",
        "gdp": "$0.5B",
        "area": "964 km²"
    },
    "Senegal": {
        "id": "senegal",
        "name": "Senegal",
        "capital": "Dakar",
        "population": "17M",
        "languages": "French, Wolof",
        "currency": "West African CFA franc",
        "description": "Known for its musical heritage, hospitality (Teranga), and the pink Lake Retba.",
        "fact": "Dakar is the westernmost city on the African mainland.",
        "iso": "sn",
        "gdp": "$31B",
        "area": "196K km²"
    },
    "Seychelles": {
        "id": "seychelles",
        "name": "Seychelles",
        "capital": "Victoria",
        "population": "0.1M",
        "languages": "Seychellois Creole, English, French",
        "currency": "Seychellois Rupee",
        "description": "An archipelago of 115 islands, home to giant tortoises and pristine beaches.",
        "fact": "It has the smallest population of any sovereign African country.",
        "iso": "sc",
        "gdp": "$1.7B",
        "area": "459 km²"
    },
    "Sierra Leone": {
        "id": "sierra_leone",
        "name": "Sierra Leone",
        "capital": "Freetown",
        "population": "8.6M",
        "languages": "English",
        "currency": "Leone",
        "description": "Known for its white-sand beaches and the chimpanzee sanctuary at Tacugama.",
        "fact": "Freetown is home to the Cotton Tree, a historic symbol of freedom for former slaves.",
        "iso": "sl",
        "gdp": "$4B",
        "area": "71K km²"
    },
    "Somalia": {
        "id": "somalia",
        "name": "Somalia",
        "capital": "Mogadishu",
        "population": "17M",
        "languages": "Somali, Arabic",
        "currency": "Somali Shilling",
        "description": "Has the longest coastline on Africa's mainland and a rich oral poetic tradition.",
        "fact": "Laas Geel contains some of the earliest known cave paintings in the Horn of Africa.",
        "iso": "so",
        "gdp": "$8B",
        "area": "637K km²"
    },
    "South Africa": {
        "id": "south_africa",
        "name": "South Africa",
        "capital": "Pretoria (Exec), Cape Town (Legis), Bloemfontein (Judic)",
        "population": "60M",
        "languages": "11 Official Languages",
        "currency": "Rand",
        "description": "A 'Rainbow Nation' with diverse cultures, Table Mountain, and Kruger National Park.",
        "fact": "It is the only country in the world with three capital cities.",
        "iso": "za",
        "gdp": "$405B",
        "area": "1.22M km²"
    },
    "Sudan": {
        "id": "sudan",
        "name": "Sudan",
        "capital": "Khartoum",
        "population": "46M",
        "languages": "Arabic, English",
        "currency": "Sudanese Pound",
        "description": "Home to more pyramids than Egypt, remnants of the ancient Kingdom of Kush.",
        "fact": "The Meroë pyramids are smaller and steeper than their Egyptian counterparts.",
        "iso": "sd",
        "gdp": "$30B",
        "area": "1.86M km²"
    },
    "South Sudan": {
        "id": "south_sudan",
        "name": "South Sudan",
        "capital": "Juba",
        "population": "11M",
        "languages": "English",
        "currency": "South Sudanese Pound",
        "description": "The world's youngest nation, home to the Sudd wetland and vast wildlife migrations.",
        "fact": "The Sudd is one of the world's largest wetlands.",
        "iso": "ss",
        "gdp": "$5B",
        "area": "644K km²"
    },
    "Swaziland": {
        "id": "swaziland",
        "name": "Eswatini",
        "capital": "Mbabane",
        "population": "1.2M",
        "languages": "Swazi, English",
        "currency": "Lilangeni",
        "description": "Now known as Eswatini, a kingdom known for its wilderness reserves and festivals.",
        "fact": "It is one of the world's last remaining absolute monarchies.",
        "iso": "sz",
        "gdp": "$4.8B",
        "area": "17K km²"
    },
    "Tanzania": {
        "id": "tanzania",
        "name": "Tanzania",
        "capital": "Dodoma",
        "population": "65M",
        "languages": "Swahili, English",
        "currency": "Tanzanian Shilling",
        "description": "Home to Mount Kilimanjaro, the Serengeti migration, and the spice island of Zanzibar.",
        "fact": "Mount Kilimanjaro is the tallest free-standing mountain in the world.",
        "iso": "tz",
        "gdp": "$76B",
        "area": "945K km²"
    },
    "Togo": {
        "id": "togo",
        "name": "Togo",
        "capital": "Lomé",
        "population": "8.8M",
        "languages": "French",
        "currency": "West African CFA franc",
        "description": "Known for its palm-lined beaches and hilltop villages.",
        "fact": "Lomé's Grand Marché is famous for its Nana Benz, wealthy female textile merchants.",
        "iso": "tg",
        "gdp": "$8B",
        "area": "56K km²"
    },
    "Tunisia": {
        "id": "tunisia",
        "name": "Tunisia",
        "capital": "Tunis",
        "population": "12M",
        "languages": "Arabic",
        "currency": "Tunisian Dinar",
        "description": "Features the ruins of Carthage and the white-and-blue village of Sidi Bou Said.",
        "fact": "The ancient city of Carthage was once the capital of the Punic empire which dominated the Mediterranean.",
        "iso": "tn",
        "gdp": "$46B",
        "area": "163K km²"
    },
    "Uganda": {
        "id": "uganda",
        "name": "Uganda",
        "capital": "Kampala",
        "population": "47M",
        "languages": "English, Swahili",
        "currency": "Ugandan Shilling",
        "description": "Winston Churchill's 'Pearl of Africa', home to the source of the Nile and mountain gorillas.",
        "fact": "Uganda is home to about half of the world's remaining mountain gorilla population.",
        "iso": "ug",
        "gdp": "$45B",
        "area": "241K km²"
    },
    "Western Sahara": {
        "id": "western_sahara",
        "name": "Western Sahara",
        "capital": "Laayoune (de facto)",
        "population": "0.6M",
        "languages": "Arabic",
        "currency": "Moroccan Dirham",
        "description": "A disputed territory with vast desert landscapes and a coastline on the Atlantic.",
        "fact": "It has one of the lowest population densities in the world.",
        "iso": "eh",
        "gdp": "N/A",
        "area": "266K km²"
    },
    "DR Congo": {
        "id": "dr_congo",
        "name": "DR Congo",
        "capital": "Kinshasa",
        "population": "99M",
        "languages": "French",
        "currency": "Congolese Franc",
        "description": "A vast country with immense biodiversity, including the Okapi Wildlife Reserve.",
        "fact": "Kinshasa and Brazzaville are the two closest capital cities in the world (excluding Vatican City/Rome).",
        "iso": "cd",
        "gdp": "$58B",
        "area": "2.34M km²"
    },
    "Zambia": {
        "id": "zambia",
        "name": "Zambia",
        "capital": "Lusaka",
        "population": "20M",
        "languages": "English",
        "currency": "Kwacha",
        "description": "Home to the thundering Victoria Falls and walking safaris in South Luangwa.",
        "fact": "The Victoria Falls are locally known as Mosi-oa-Tunya, 'The Smoke That Thunders'.",
        "iso": "zm",
        "gdp": "$27B",
        "area": "752K km²"
    },
    "Zimbabwe": {
        "id": "zimbabwe",
        "name": "Zimbabwe",
        "capital": "Harare",
        "population": "16M",
        "languages": "16 Official Languages",
        "currency": "USD, ZIG",
        "description": "Known for Victoria Falls, Hwange National Park, and the Great Zimbabwe ruins.",
        "fact": "Great Zimbabwe is the largest collection of medieval ruins in sub-Saharan Africa.",
        "iso": "zw",
        "gdp": "$26B",
        "area": "390K km²"
    }
};

// --- MAP INITIALIZATION ---
// Center on Africa
const map = L.map('map-container', {
    zoomControl: false,
    attributionControl: false,
    minZoom: 2,
    maxZoom: 6,
    zoomSnap: 0.1,
    zoomDelta: 0.5,
    wheelPxPerZoomLevel: 120
}).setView([1.5, 17], 3.2);

// CartoDB Dark Matter Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// --- INTERACTION LOGIC & STATE ---
const infoPanel = document.getElementById('info-panel');
const attractionModal = infoPanel.querySelector('.attraction-modal');
const closePanelBtn = document.getElementById('close-panel');

let lastFocusedElement = null;
let geoJsonLayer;
let selectedFeatureName = null;

// Styles matching CSS variables
const defaultStyle = {
    fillColor: '#38bdf8', /* Sky 400 */
    weight: 0.5,
    color: '#38bdf8',
    opacity: 0.3,
    fillOpacity: 0.1, // Visible but subtle
    className: 'country-poly'
};

const hoverStyle = {
    fillOpacity: 0.2,
    opacity: 0.8,
    weight: 1.5,
    color: '#38bdf8'
};

const activeStyle = {
    fillOpacity: 0.3,
    opacity: 1,
    weight: 2.5,
    color: '#818cf8' /* Indigo 400 accent */
};

initializeMap();

function initializeMap() {
    fetch('africa.geojson')
        .then(response => response.json())
        .then(data => {
            // Filter features to only those in countryData
            const relevantFeatures = data.features.filter(feature =>
                countryData.hasOwnProperty(feature.properties.name)
            );

            geoJsonLayer = L.geoJSON(relevantFeatures, {
                style: () => defaultStyle,
                onEachFeature: (feature, layer) => {
                    const countryName = feature.properties.name;

                    // Accessibility Setup
                    const applyA11y = (l) => {
                        if (l.getElement) {
                             const element = l.getElement();
                             if (element) setupA11y(element, countryName);
                             else l.on('add', () => {
                                const el = l.getElement();
                                if (el) setupA11y(el, countryName);
                             });
                        }
                    };

                    if (layer.eachLayer) {
                        layer.eachLayer(applyA11y);
                    } else {
                        applyA11y(layer);
                    }

                    const openFeature = () => {
                        lastFocusedElement = document.activeElement;
                        showCountryInfo(countryName, layer);
                    };

                    layer.on({
                        mouseover: e => {
                            if (selectedFeatureName !== countryName) {
                                e.target.setStyle(hoverStyle);
                                document.getElementById('map-container').style.cursor = 'pointer';
                            }
                        },
                        mouseout: e => {
                            if (selectedFeatureName !== countryName) {
                                geoJsonLayer.resetStyle(e.target);
                                document.getElementById('map-container').style.cursor = '';
                            }
                        },
                        click: e => {
                            L.DomEvent.stopPropagation(e);
                            openFeature();
                        },
                        keydown: e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openFeature();
                            }
                        }
                    });
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            document.getElementById('error-message').textContent = 'Failed to load map data.';
            document.getElementById('error-message').classList.remove('hidden');
        });
}

function setupA11y(element, name) {
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', `View info about ${name}`);
    element.classList.add('map-feature');
}

function encodeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function showCountryInfo(name, layer) {
    const country = countryData[name];
    if (!country) return;

    // Reset previous selection
    if (selectedFeatureName && selectedFeatureName !== name) {
        geoJsonLayer.eachLayer(l => {
            geoJsonLayer.resetStyle(l);
        });
    }

    selectedFeatureName = name;

    // Highlight current
    if (layer) {
        layer.setStyle(activeStyle);
        layer.bringToFront();
    }

    map.stop();

    const panelContent = infoPanel.querySelector('.panel-content');

    const html = `
        <h2>
            <img src="https://unpkg.com/flag-icons/country-4x3/${country.iso}.svg" class="country-flag" alt="${encodeHTML(country.name)} Flag">
            ${encodeHTML(country.name)}
        </h2>

        <div class="country-stats">
            <div class="stat-item">
                <span class="stat-label">Capital</span>
                <span class="stat-value">${encodeHTML(country.capital)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Population</span>
                <span class="stat-value">${encodeHTML(country.population)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Currency</span>
                <span class="stat-value">${encodeHTML(country.currency)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Languages</span>
                <span class="stat-value">${encodeHTML(country.languages)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">GDP</span>
                <span class="stat-value">${encodeHTML(country.gdp)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Area</span>
                <span class="stat-value">${encodeHTML(country.area)}</span>
            </div>
        </div>

        <p class="country-description">${encodeHTML(country.description)}</p>

        <div class="fun-fact">
            <span class="fact-icon">💡</span>
            <p>${encodeHTML(country.fact)}</p>
        </div>
    `;

    panelContent.innerHTML = html;

    infoPanel.classList.add('visible');
    infoPanel.setAttribute('aria-hidden', 'false');
    attractionModal.classList.add('visible');

    closePanelBtn.focus();

    // Smart Padding for Mobile vs Desktop
    const isMobile = window.innerWidth <= 768;

    // Desktop: Panel is on right (width ~400px incl margins) -> Pad Right
    // Mobile: Panel is on bottom (height ~40-50%) -> Pad Bottom
    const paddingOptions = isMobile
        ? { paddingBottomRight: [0, window.innerHeight * 0.45], paddingTopLeft: [0, 0] }
        : { paddingBottomRight: [500, 0], paddingTopLeft: [100, 0] };

    // Cinematography: Slower, smoother camera movement
    map.flyToBounds(layer.getBounds(), {
        paddingTopLeft: paddingOptions.paddingTopLeft,
        paddingBottomRight: paddingOptions.paddingBottomRight,
        maxZoom: 6, // Don't zoom in *too* close, keep context
        duration: 1.6, // Slower for elegance
        easeLinearity: 0.1 // More curve
    });
}

function hidePanel() {
    if (!infoPanel.classList.contains('visible')) return;

    attractionModal.classList.remove('visible');

    // Wait for the pop-out animation to finish before hiding the container
    setTimeout(() => {
        infoPanel.classList.remove('visible');
        infoPanel.setAttribute('aria-hidden', 'true');
        infoPanel.style.transform = ''; // Reset tilt
    }, 300); // Matches animation duration

    // Reset selection state
    selectedFeatureName = null;
    geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    // Return to full view with matching elegant ease
    // Center on Africa roughly
    map.flyTo([1.5, 17], 3.2, {
        duration: 1.8,
        easeLinearity: 0.1
    });
}

closePanelBtn.addEventListener('click', hidePanel);
map.on('click', hidePanel);

// Keyboard Trap for Accessibility
infoPanel.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        hidePanel();
    }

    if (e.key === 'Tab') {
        const focusableElements = infoPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// --- DESKTOP PARALLAX TILT EFFECT ---
// Adds a subtle 3D tilt to the panel based on mouse position
const panelGlare = document.querySelector('.panel-glare');

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Desktop only
    if (!infoPanel.classList.contains('visible')) return;

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Calculate rotation (range: -4deg to 4deg for subtlety)
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    // Apply transform while maintaining the scale
    infoPanel.style.transform = `translate3d(0, 0, 0) scale(1) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    // Glare effect logic
    if (panelGlare) {
        // Calculate glare movement
        // We move the gradient background to simulate light reflection
        // The gradient is large, so we shift it across the panel
        const glareX = (x - 0.5) * 150;
        const glareY = (y - 0.5) * 150;

        panelGlare.style.transform = `translate(${glareX}%, ${glareY}%)`;
    }
});

// --- SEARCH LOGIC ---
const searchInput = document.getElementById('country-search');
const searchResults = document.getElementById('search-results');
const resetViewBtn = document.getElementById('reset-view');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';

    if (query.length < 2) {
        searchResults.classList.add('hidden');
        return;
    }

    const matches = Object.values(countryData).filter(country =>
        country.name.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
        matches.forEach(country => {
            const li = document.createElement('li');
            li.textContent = country.name;
            li.setAttribute('role', 'option');
            li.addEventListener('click', () => {
                // Find the layer associated with this country
                let targetLayer;
                geoJsonLayer.eachLayer(layer => {
                    if (layer.feature.properties.name === country.name) {
                        targetLayer = layer;
                    }
                });

                if (targetLayer) {
                    showCountryInfo(country.name, targetLayer);
                    searchInput.value = '';
                    searchResults.classList.add('hidden');
                }
            });
            searchResults.appendChild(li);
        });
        searchResults.classList.remove('hidden');
    } else {
        searchResults.classList.add('hidden');
    }
});

// Hide results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
    }
});

resetViewBtn.addEventListener('click', () => {
    hidePanel();
    searchInput.value = '';
    map.flyTo([1.5, 17], 3.2, {
        duration: 1.8,
        easeLinearity: 0.1
    });
});

// --- RANDOM DISCOVERY ---
const randomBtn = document.getElementById('random-country');

if (randomBtn) {
    randomBtn.addEventListener('click', () => {
        const keys = Object.keys(countryData);
        if (keys.length === 0) return;

        // Simple random selection
        const randomKey = keys[Math.floor(Math.random() * keys.length)];

        // Find the layer associated with this country
        let targetLayer;
        if (geoJsonLayer) {
            geoJsonLayer.eachLayer(layer => {
                if (layer.feature.properties.name === randomKey) {
                    targetLayer = layer;
                }
            });
        }

        if (targetLayer) {
            showCountryInfo(randomKey, targetLayer);
            // Optional: clear search if it was used
            searchInput.value = '';
            searchResults.classList.add('hidden');
        }
    });
}
