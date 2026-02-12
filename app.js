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
        "area": "2.38M km²",
        "greeting": "As-salamu alaykum",
        "dish": "Couscous",
        "landmark": "Maqam Echahid"
    ,
        "animal": "Fennec Fox",
        "climate": "Arid / Mediterranean"},
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
        "area": "1.25M km²",
        "greeting": "Olá",
        "dish": "Moamba de Galinha",
        "landmark": "Kalandula Falls"
    ,
        "animal": "Giant Sable Antelope",
        "climate": "Tropical / Arid"},
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
        "area": "114K km²",
        "greeting": "Boni",
        "dish": "Kuli Kuli",
        "landmark": "Royal Palaces of Abomey"
    ,
        "animal": "Leopard",
        "climate": "Tropical"},
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
        "area": "582K km²",
        "greeting": "Dumela",
        "dish": "Seswaa",
        "landmark": "Okavango Delta"
    ,
        "animal": "Zebra",
        "climate": "Semi-arid"},
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
        "area": "274K km²",
        "greeting": "Bonjour",
        "dish": "Riz Gras",
        "landmark": "Sindou Peaks"
    ,
        "animal": "White Stallion",
        "climate": "Tropical"},
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
        "area": "27K km²",
        "greeting": "Bwakeye",
        "dish": "Boko Boko",
        "landmark": "Karera Waterfalls"
    ,
        "animal": "Lion",
        "climate": "Equatorial"},
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
        "area": "475K km²",
        "greeting": "Bonjour",
        "dish": "Ndole",
        "landmark": "Mount Cameroon"
    ,
        "animal": "Lion",
        "climate": "Tropical"},
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
        "area": "4K km²",
        "greeting": "Olá",
        "dish": "Cachupa",
        "landmark": "Pico do Fogo"
    ,
        "animal": "Manatee",
        "climate": "Arid"},
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
        "area": "622K km²",
        "greeting": "Barra",
        "dish": "Kanda",
        "landmark": "Manovo-Gounda St. Floris"
    ,
        "animal": "Elephant",
        "climate": "Tropical"},
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
        "area": "1.28M km²",
        "greeting": "Lalékou",
        "dish": "Daraba",
        "landmark": "Zakouma National Park"
    ,
        "animal": "Goat / Lion",
        "climate": "Desert / Tropical"},
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
        "area": "2.2K km²",
        "greeting": "Barza",
        "dish": "Langouste a la Vanille",
        "landmark": "Mount Karthala"
    ,
        "animal": "Mongoose Lemur",
        "climate": "Tropical"},
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
        "area": "342K km²",
        "greeting": "Mbote",
        "dish": "Saka Saka",
        "landmark": "Odzala-Kokoua National Park"
    ,
        "animal": "Gorilla",
        "climate": "Tropical"},
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
        "area": "23K km²",
        "greeting": "Salam",
        "dish": "Skoudehkaris",
        "landmark": "Lake Assal"
    ,
        "animal": "Elk",
        "climate": "Desert"},
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
        "area": "1M km²",
        "greeting": "As-salamu alaykum",
        "dish": "Koshary",
        "landmark": "Pyramids of Giza"
    ,
        "animal": "Steppe Eagle",
        "climate": "Desert"},
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
        "area": "28K km²",
        "greeting": "Hola",
        "dish": "Succotash",
        "landmark": "Malabo Cathedral"
    ,
        "animal": "Gorilla",
        "climate": "Tropical"},
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
        "area": "117K km²",
        "greeting": "Selam",
        "dish": "Zigni",
        "landmark": "Fiat Tagliero Building"
    ,
        "animal": "Camel",
        "climate": "Desert"},
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
        "area": "1.1M km²",
        "greeting": "Tena Yistilign",
        "dish": "Doro Wat",
        "landmark": "Lalibela Churches"
    ,
        "animal": "Lion",
        "climate": "Tropical / Alpine"},
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
        "area": "267K km²",
        "greeting": "Mbolo",
        "dish": "Nyembwe Chicken",
        "landmark": "Loango National Park"
    ,
        "animal": "Black Panther",
        "climate": "Tropical"},
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
        "area": "10.6K km²",
        "greeting": "Salaam Aleekum",
        "dish": "Domoda",
        "landmark": "Kunta Kinteh Island"
    ,
        "animal": "Lion",
        "climate": "Tropical"},
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
        "area": "238K km²",
        "greeting": "Akwaaba",
        "dish": "Jollof Rice",
        "landmark": "Cape Coast Castle"
    ,
        "animal": "Golden Eagle",
        "climate": "Tropical"},
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
        "area": "245K km²",
        "greeting": "Bonjour",
        "dish": "Poulet Yassa",
        "landmark": "Mount Nimba"
    ,
        "animal": "Elephant",
        "climate": "Tropical"},
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
        "area": "36K km²",
        "greeting": "Bom dia",
        "dish": "Jollof Rice",
        "landmark": "Bijagós Islands"
    ,
        "animal": "Hippo",
        "climate": "Tropical"},
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
        "area": "322K km²",
        "greeting": "Ayoka",
        "dish": "Garba",
        "landmark": "Basilica of Our Lady of Peace"
    ,
        "animal": "Elephant",
        "climate": "Tropical"},
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
        "area": "580K km²",
        "greeting": "Jambo",
        "dish": "Nyama Choma",
        "landmark": "Maasai Mara",
        "animal": "Lion",
        "climate": "Tropical / Arid"
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
        "area": "30K km²",
        "greeting": "Lumela",
        "dish": "Papa",
        "landmark": "Maletsunyane Falls"
    ,
        "animal": "Black Rhino",
        "climate": "Temperate"},
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
        "area": "111K km²",
        "greeting": "Hello",
        "dish": "Dumboy",
        "landmark": "Sapo National Park"
    ,
        "animal": "Lion",
        "climate": "Tropical"},
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
        "area": "1.76M km²",
        "greeting": "Marhaban",
        "dish": "Bazeen",
        "landmark": "Leptis Magna"
    ,
        "animal": "Hawk",
        "climate": "Desert"},
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
        "area": "587K km²",
        "greeting": "Manao ahoana",
        "dish": "Romazava",
        "landmark": "Avenue of the Baobabs"
    ,
        "animal": "Ring-tailed Lemur",
        "climate": "Tropical"},
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
        "area": "118K km²",
        "greeting": "Muli bwanji",
        "dish": "Chambo",
        "landmark": "Lake Malawi"
    ,
        "animal": "Fish Eagle",
        "climate": "Subtropical"},
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
        "area": "1.24M km²",
        "greeting": "Aw ni sogoma",
        "dish": "Tiguadege Na",
        "landmark": "Great Mosque of Djenne"
    ,
        "animal": "Vulture",
        "climate": "Desert / Tropical"},
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
        "area": "1.03M km²",
        "greeting": "Salaam Aleikum",
        "dish": "Thieboudienne",
        "landmark": "Banc d'Arguin"
    ,
        "animal": "Oryx",
        "climate": "Desert"},
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
        "area": "2K km²",
        "greeting": "Bonzour",
        "dish": "Dholl Puri",
        "landmark": "Le Morne Brabant"
    ,
        "animal": "Dodo (Extinct)",
        "climate": "Tropical"},
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
        "area": "446K km²",
        "greeting": "Salam",
        "dish": "Tagine",
        "landmark": "Hassan II Mosque"
    ,
        "animal": "Barbary Lion",
        "climate": "Mediterranean"},
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
        "area": "801K km²",
        "greeting": "Bom dia",
        "dish": "Xima",
        "landmark": "Island of Mozambique"
    ,
        "animal": "Elephant",
        "climate": "Tropical"},
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
        "area": "825K km²",
        "greeting": "Hello",
        "dish": "Kapana",
        "landmark": "Sossusvlei Dunes"
    ,
        "animal": "Oryx",
        "climate": "Arid"},
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
        "area": "1.27M km²",
        "greeting": "Fofo",
        "dish": "Djerma Stew",
        "landmark": "Agadez Mosque"
    ,
        "animal": "Dama Gazelle",
        "climate": "Desert"},
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
        "area": "923K km²",
        "greeting": "Sannu / Nno / E kaaro",
        "dish": "Jollof Rice",
        "landmark": "Zuma Rock"
    ,
        "animal": "Eagle",
        "climate": "Tropical"},
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
        "area": "2.5K km²",
        "greeting": "Oté",
        "dish": "Rougail Saucisse",
        "landmark": "Piton de la Fournaise"
    ,
        "animal": "White-tailed Tropicbird",
        "climate": "Tropical"},
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
        "area": "26K km²",
        "greeting": "Muraho",
        "dish": "Isombe",
        "landmark": "Volcanoes National Park"
    ,
        "animal": "Gorilla",
        "climate": "Temperate / Tropical"},
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
        "area": "964 km²",
        "greeting": "Olá",
        "dish": "Calulu",
        "landmark": "Pico Cão Grande"
    ,
        "animal": "Parrot",
        "climate": "Tropical"},
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
        "area": "196K km²",
        "greeting": "Salaam Aleekum",
        "dish": "Thieboudienne",
        "landmark": "Lake Retba (Pink Lake)"
    ,
        "animal": "Lion",
        "climate": "Tropical"},
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
        "area": "459 km²",
        "greeting": "Bonzour",
        "dish": "Grilled Fish",
        "landmark": "Anse Source d'Argent"
    ,
        "animal": "Giant Tortoise",
        "climate": "Tropical"},
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
        "area": "71K km²",
        "greeting": "Kushe",
        "dish": "Cassava Leaf Stew",
        "landmark": "Cotton Tree"
    ,
        "animal": "Lion",
        "climate": "Tropical"},
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
        "area": "637K km²",
        "greeting": "Assalamu Alaikum",
        "dish": "Bariis Iskukaris",
        "landmark": "Laas Geel"
    ,
        "animal": "Leopard",
        "climate": "Arid"},
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
        "area": "1.22M km²",
        "greeting": "Sawubona",
        "dish": "Bobotie",
        "landmark": "Table Mountain"
    ,
        "animal": "Springbok",
        "climate": "Temperate / Subtropical"},
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
        "area": "1.86M km²",
        "greeting": "Salam",
        "dish": "Ful Medames",
        "landmark": "Meroë Pyramids"
    ,
        "animal": "Secretary Bird",
        "climate": "Desert"},
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
        "area": "644K km²",
        "greeting": "Salam",
        "dish": "Kisra",
        "landmark": "Sudd Wetland"
    ,
        "animal": "Fish Eagle",
        "climate": "Tropical"},
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
        "area": "17K km²",
        "greeting": "Sawubona",
        "dish": "Karoo Roast",
        "landmark": "Hlane Royal National Park"
    ,
        "animal": "Lion",
        "climate": "Subtropical"},
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
        "area": "945K km²",
        "greeting": "Jambo",
        "dish": "Ugali",
        "landmark": "Mount Kilimanjaro"
    ,
        "animal": "Giraffe",
        "climate": "Tropical"},
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
        "area": "56K km²",
        "greeting": "Woezor",
        "dish": "Fufu",
        "landmark": "Koutammakou"
    ,
        "animal": "Lion",
        "climate": "Tropical"},
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
        "area": "163K km²",
        "greeting": "Aslemah",
        "dish": "Couscous",
        "landmark": "Amphitheatre of El Jem"
    ,
        "animal": "Dromedary",
        "climate": "Mediterranean"},
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
        "area": "241K km²",
        "greeting": "Olyotya",
        "dish": "Matoke",
        "landmark": "Murchison Falls"
    ,
        "animal": "Grey Crowned Crane",
        "climate": "Tropical"},
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
        "area": "266K km²",
        "greeting": "Salam",
        "dish": "Couscous",
        "landmark": "Spanish Cathedral"
    ,
        "animal": "Fennec Fox",
        "climate": "Desert"},
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
        "area": "2.34M km²",
        "greeting": "Mbote",
        "dish": "Moambe Chicken",
        "landmark": "Virunga National Park"
    ,
        "animal": "Okapi",
        "climate": "Tropical"},
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
        "area": "752K km²",
        "greeting": "Muli shani",
        "dish": "Nshima",
        "landmark": "Victoria Falls"
    ,
        "animal": "Fish Eagle",
        "climate": "Tropical"},
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
        "area": "390K km²",
        "greeting": "Mhoro",
        "dish": "Sadza",
        "landmark": "Great Zimbabwe Ruins"
    ,
        "animal": "Sable Antelope",
        "climate": "Tropical"}
};

// --- CONFETTI EFFECT ---
// Physics-Based Canvas Confetti
const canvas = document.getElementById('confetti-canvas');
let ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
window.addEventListener('resize', debounce(resizeCanvas, 200));
resizeCanvas();

let particles = [];
let animationFrameId = null;

function fireConfetti() {
    if (!canvas) return;

    const count = 150;
    const colors = ['#f43f5e', '#fb7185', '#8b5cf6', '#a78bfa', '#2dd4bf', '#fbbf24'];

    for (let i = 0; i < count; i++) {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;

        // Random spread angle
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 15 + 5;

        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity - 2, // Slight upward bias
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1,
            decay: 0.005 + Math.random() * 0.015,
            gravity: 0.4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            shape: Math.random() > 0.5 ? 'circle' : 'rect' // Varied shapes
        });
    }

    if (!animationFrameId) {
        updateConfetti();
    }
}

function updateConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;

        // Friction / Drag
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.rotation += p.rotationSpeed;
        p.life -= p.decay;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);

        if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(updateConfetti);
    } else {
        animationFrameId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// --- MOUSE TRAIL EFFECT ---
class MouseTrail {
    constructor() {
        this.colors = ['#f43f5e', '#fb7185', '#8b5cf6', '#a78bfa', '#2dd4bf'];
        this.pool = [];
        this.maxParticles = 25;
        this.pointer = 0;
        this.lastX = 0;
        this.lastY = 0;

        // Initialize Object Pool
        for (let i = 0; i < this.maxParticles; i++) {
            const p = document.createElement('div');
            p.style.position = 'fixed';
            p.style.borderRadius = '50%';
            p.style.pointerEvents = 'none';
            p.style.zIndex = '9999';
            p.style.opacity = '0'; // Hidden by default
            document.body.appendChild(p);
            this.pool.push(p);
        }
    }

    update(x, y) {
        // Distance check
        const dist = Math.hypot(x - this.lastX, y - this.lastY);
        if (dist < 25) return;

        this.lastX = x;
        this.lastY = y;

        this.activateParticle(x, y);
    }

    activateParticle(x, y) {
        const particle = this.pool[this.pointer];
        this.pointer = (this.pointer + 1) % this.maxParticles;

        const size = Math.random() * 6 + 2;

        // Reset State
        particle.style.transition = 'none';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.transform = 'translate(-50%, -50%) scale(1)';
        particle.style.opacity = '0.6';
        particle.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.boxShadow = `0 0 6px ${particle.style.background}`;

        // Force reflow
        void particle.offsetWidth;

        // Animate out
        particle.style.transition = 'transform 0.6s cubic-bezier(0, 0, 0.2, 1), opacity 0.6s ease';

        const destX = (Math.random() - 0.5) * 30;
        const destY = (Math.random() - 0.5) * 30;

        particle.style.transform = `translate(calc(-50% + ${destX}px), calc(-50% + ${destY}px)) scale(0)`;
        particle.style.opacity = '0';
    }
}

const mouseTrail = new MouseTrail();

// --- CURSOR TOOLTIP LOGIC ---
const cursorTooltip = document.getElementById('cursor-tooltip');
function updateCursorTooltip(x, y) {
    if (cursorTooltip) {
        cursorTooltip.style.left = x + 'px';
        cursorTooltip.style.top = y + 'px';
    }
}

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

// CartoDB Positron (Light) Tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// --- INTERACTION LOGIC & STATE ---
const infoPanel = document.getElementById('info-panel');
const attractionModal = infoPanel.querySelector('.attraction-modal');
const closePanelBtn = document.getElementById('close-panel');
const mobileHandle = infoPanel.querySelector('.mobile-handle');

if (mobileHandle) {
    mobileHandle.addEventListener('click', hidePanel);
}

let lastFocusedElement = null;
let geoJsonLayer;
let selectedFeatureName = null;

// Styles matching CSS variables (Pastel Theme)
const defaultStyle = {
    fillColor: '#94a3b8', // Slate 400 - Neutral default
    weight: 1,
    color: '#cbd5e1', // Slate 300
    opacity: 0.6,
    fillOpacity: 0.2, // Light but visible
    className: 'country-poly'
};

const hoverStyle = {
    fillOpacity: 0.4,
    opacity: 1,
    weight: 2,
    color: '#f43f5e', // Rose 500
    fillColor: '#fda4af' // Rose 300
};

const activeStyle = {
    fillOpacity: 0.7,
    opacity: 1,
    weight: 3,
    color: '#f43f5e', // Rose 500
    fillColor: '#f43f5e'
};

const dimmedStyle = {
    fillColor: '#cbd5e1',
    weight: 0.5,
    color: '#e2e8f0',
    opacity: 0.4,
    fillOpacity: 0.05, // Ghostly
    className: 'country-poly dimmed'
};

function showOnboarding() {
    if (!geoJsonLayer) return;

    // Pick a random country to pulse
    const layers = [];
    geoJsonLayer.eachLayer(layer => layers.push(layer));
    if (layers.length > 0) {
        const randomLayer = layers[Math.floor(Math.random() * layers.length)];
        let path = null;
        if (randomLayer.getElement) {
            path = randomLayer.getElement();
        } else if (randomLayer.getLayers && randomLayer.getLayers().length > 0) {
             // For MultiPolygons, target the first part
             const parts = randomLayer.getLayers();
             if (parts[0].getElement) path = parts[0].getElement();
        }

        if (path) {
            path.classList.add('pulse-animation');

            // Create Toast
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.innerHTML = '<span>👆</span> Tap a country to explore!';
            document.body.appendChild(toast);

            // Dismiss on interaction
            const dismiss = () => {
                path.classList.remove('pulse-animation');
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 600);
                map.off('click', dismiss);
                map.off('movestart', dismiss);
                if (document.getElementById('country-search')) {
                    document.getElementById('country-search').removeEventListener('focus', dismiss);
                }
            };

            map.on('click', dismiss);
            map.on('movestart', dismiss);
            const searchInput = document.getElementById('country-search');
            if (searchInput) searchInput.addEventListener('focus', dismiss);
        }
    }
}

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
                            const tooltip = document.getElementById('cursor-tooltip');
                            if (tooltip) {
                                tooltip.textContent = countryName;
                                tooltip.classList.remove('hidden');
                            }
                            if (selectedFeatureName !== countryName) {
                                e.target.setStyle(hoverStyle);
                                document.getElementById('map-container').style.cursor = 'none'; // Hide default cursor
                            }
                        },
                        mouseout: e => {
                            const tooltip = document.getElementById('cursor-tooltip');
                            if (tooltip) {
                                tooltip.classList.add('hidden');
                            }
                            if (selectedFeatureName !== countryName) {
                                geoJsonLayer.resetStyle(e.target);
                                document.getElementById('map-container').style.cursor = '';
                            }
                        },
                        click: e => {
                            L.DomEvent.stopPropagation(e);
                            if (typeof isQuizActive !== 'undefined' && isQuizActive) {
                                handleQuizAttempt(countryName, layer);
                            } else {
                                openFeature();
                            }
                        },
                        keydown: e => {
                            const key = e.originalEvent ? e.originalEvent.key : e.key;
                            if (key === 'Enter' || key === ' ') {
                                e.preventDefault();
                                if (typeof isQuizActive !== 'undefined' && isQuizActive) {
                                    handleQuizAttempt(countryName, layer);
                                } else {
                                    openFeature();
                                }
                            }
                        }
                    });
                }
            }).addTo(map);

            // Enable interactions now that data is ready
            document.getElementById('country-search').removeAttribute('disabled');
            const randomBtn = document.getElementById('random-country');
            if (randomBtn) randomBtn.removeAttribute('disabled');
            const startQuizBtn = document.getElementById('start-quiz');
            if (startQuizBtn) startQuizBtn.removeAttribute('disabled');

            showOnboarding();

            // Hide Loader
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('fade-out');
                setTimeout(() => loader.remove(), 500);
            }
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            const errorMsg = document.getElementById('error-message');
            errorMsg.innerHTML = `
                <p>Failed to load map data.</p>
                <button id="retry-btn" style="margin-top: 10px; padding: 8px 16px; cursor: pointer; border-radius: 4px; border: none; background: #fb7185; color: white; font-weight: bold;">Retry</button>
            `;
            errorMsg.classList.remove('hidden');

            document.getElementById('retry-btn').addEventListener('click', () => {
                errorMsg.classList.add('hidden');
                // Recreate loader if it was removed
                let loader = document.getElementById('loader');
                if (!loader) {
                     loader = document.createElement('div');
                     loader.id = 'loader';
                     loader.innerHTML = '<div class="spinner"></div>';
                     document.body.appendChild(loader);
                }
                loader.classList.remove('fade-out');

                initializeMap();
            });

            // Hide Loader even on error so user sees message
            const loader = document.getElementById('loader');
            if (loader) loader.classList.add('fade-out');
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

    selectedFeatureName = name;

    // Spotlight Effect: Dim others, highlight current
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(l => {
            const isSelected = l.feature.properties.name === name;
            l.setStyle(isSelected ? activeStyle : dimmedStyle);

            if (isSelected && l.bringToFront) {
                l.bringToFront();
            }

            const applyEffect = (layer, active) => {
                if (layer.getElement) {
                    const el = layer.getElement();
                    if (el) {
                        if (active) el.classList.add('map-feature-lifted');
                        else el.classList.remove('map-feature-lifted');
                    }
                } else if (layer.eachLayer) {
                    layer.eachLayer(child => applyEffect(child, active));
                }
            };

            applyEffect(l, isSelected);
        });
    }

    // Trigger Confetti
    fireConfetti();

    const panelContent = infoPanel.querySelector('.panel-content');

    const html = `
        <div class="anim-stagger-1">
            <h2 class="greeting-text">"${encodeHTML(country.greeting || 'Hello')}"</h2>
            <h2>
                <img src="https://unpkg.com/flag-icons/country-4x3/${country.iso}.svg" class="country-flag" alt="${encodeHTML(country.name)} Flag">
                ${encodeHTML(country.name)}
            </h2>
        </div>

        <div class="anim-stagger-2 cultural-highlights">
             <div class="cultural-badges">
                <span class="culture-badge" title="National Dish">🍲 ${encodeHTML(country.dish || 'Local Cuisine')}</span>
                <span class="culture-badge" title="Famous Landmark">🏛️ ${encodeHTML(country.landmark || 'Historic Sites')}</span>
                <span class="culture-badge" title="National Animal">🐾 ${encodeHTML(country.animal || 'Local Wildlife')}</span>
                <span class="culture-badge" title="Climate">☀️ ${encodeHTML(country.climate || 'Diverse')}</span>
            </div>
        </div>

        <div class="anim-stagger-3 country-stats">
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

        <div class="anim-stagger-4">
            <p class="country-description">${encodeHTML(country.description)}</p>
        </div>

        <div class="anim-stagger-5 fun-fact">
            <span class="fact-icon">💡</span>
            <p>${encodeHTML(country.fact)}</p>
        </div>

        <div class="anim-stagger-5 panel-nav">
             <button class="nav-btn prev" aria-label="Previous Country">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button class="nav-btn next" aria-label="Next Country">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
             </button>
        </div>
    `;

    panelContent.innerHTML = html;

    // Bind Navigation
    const prevBtn = panelContent.querySelector('.nav-btn.prev');
    const nextBtn = panelContent.querySelector('.nav-btn.next');
    if (prevBtn) prevBtn.addEventListener('click', () => navigateCountry(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateCountry(1));

    infoPanel.classList.add('visible');
    infoPanel.setAttribute('aria-hidden', 'false');
    attractionModal.classList.add('visible');

    closePanelBtn.focus();

    // Smart Padding for Mobile vs Desktop
    const isMobile = window.innerWidth <= 768;
    const paddingOptions = isMobile
        ? { paddingBottomRight: [0, window.innerHeight * 0.45], paddingTopLeft: [0, 0] }
        : { paddingBottomRight: [500, 0], paddingTopLeft: [100, 0] };

    map.flyToBounds(layer.getBounds(), {
        paddingTopLeft: paddingOptions.paddingTopLeft,
        paddingBottomRight: paddingOptions.paddingBottomRight,
        maxZoom: 6,
        duration: 1.6,
        easeLinearity: 0.1
    });
}

function hidePanel() {
    if (!infoPanel.classList.contains('visible')) return;

    attractionModal.classList.remove('visible');

    setTimeout(() => {
        infoPanel.classList.remove('visible');
        infoPanel.setAttribute('aria-hidden', 'true');
        infoPanel.style.transform = ''; // Reset tilt
    }, 300);

    selectedFeatureName = null;
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));
    }

    if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
    }

    map.flyTo([1.5, 17], 3.2, {
        duration: 1.8,
        easeLinearity: 0.1
    });
}

closePanelBtn.addEventListener('click', hidePanel);
map.on('click', hidePanel);

// Keyboard Trap
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
const panelGlare = document.querySelector('.panel-glare');

function updatePanelGlare(x, y) {
    if (window.innerWidth <= 768) return;
    if (!infoPanel.classList.contains('visible')) return;

    const normX = x / window.innerWidth;
    const normY = y / window.innerHeight;

    const rotateY = (normX - 0.5) * 8;
    const rotateX = (0.5 - normY) * 8;

    infoPanel.style.transform = `translate3d(0, 0, 0) scale(1) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

    if (panelGlare) {
        const glareX = (normX - 0.5) * 150;
        const glareY = (normY - 0.5) * 150;
        panelGlare.style.transform = `translate(${glareX}%, ${glareY}%)`;
    }
}

// --- GLOBAL EVENT CONTROLLER ---
let isTicking = false;

document.addEventListener('mousemove', (e) => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            if (mouseTrail) mouseTrail.update(x, y);
            updateCursorTooltip(x, y);
            updatePanelGlare(x, y);

            isTicking = false;
        });
        isTicking = true;
    }
});

// --- SEARCH LOGIC ---
const searchInput = document.getElementById('country-search');
const searchResults = document.getElementById('search-results');
const resetViewBtn = document.getElementById('reset-view');

let currentFocus = -1;

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    searchResults.innerHTML = '';
    currentFocus = -1;

    if (query.length < 2) {
        searchResults.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
        return;
    }

    const matches = Object.entries(countryData).filter(([key, country]) =>
        country.name.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
        matches.forEach(([key, country], index) => {
            const li = document.createElement('li');
            li.textContent = country.name;
            li.setAttribute('role', 'option');
            li.id = `search-result-${index}`;
            li.dataset.key = key;

            li.addEventListener('click', () => {
                if (!geoJsonLayer) return;
                let targetLayer;
                geoJsonLayer.eachLayer(layer => {
                    if (layer.feature.properties.name === key) {
                        targetLayer = layer;
                    }
                });

                if (targetLayer) {
                    lastFocusedElement = searchInput;
                    showCountryInfo(key, targetLayer);
                    searchInput.value = '';
                    searchResults.classList.add('hidden');
                    searchInput.setAttribute('aria-expanded', 'false');
                }
            });
            searchResults.appendChild(li);
        });
        searchResults.classList.remove('hidden');
        searchInput.setAttribute('aria-expanded', 'true');
    } else {
        const li = document.createElement('li');
        li.textContent = "No matches found";
        li.style.color = "var(--text-tertiary)";
        li.style.cursor = "default";
        li.style.pointerEvents = "none";
        searchResults.appendChild(li);

        searchResults.classList.remove('hidden');
        searchInput.setAttribute('aria-expanded', 'true');
    }
});

// Accessibility: Keyboard Navigation
searchInput.addEventListener('keydown', function(e) {
    let items = searchResults.querySelectorAll('li:not([style*="pointer-events: none"])');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
        currentFocus++;
        addActive(items);
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        currentFocus--;
        addActive(items);
        e.preventDefault();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentFocus > -1) {
            if (items[currentFocus]) items[currentFocus].click();
        }
    } else if (e.key === 'Escape') {
        searchResults.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
    }
});

function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (items.length - 1);

    items[currentFocus].classList.add('active');
    items[currentFocus].setAttribute('aria-selected', 'true');
    searchInput.setAttribute('aria-activedescendant', items[currentFocus].id);

    items[currentFocus].scrollIntoView({ block: 'nearest' });
}

function removeActive(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
        items[i].removeAttribute('aria-selected');
    }
    searchInput.removeAttribute('aria-activedescendant');
}

document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
        searchInput.setAttribute('aria-expanded', 'false');
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
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
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
            searchInput.value = '';
            searchResults.classList.add('hidden');
        }
    });
}

function navigateCountry(direction) {
    if (!selectedFeatureName) return;

    const keys = Object.keys(countryData).sort(); // Ensure consistent order
    const currentIndex = keys.indexOf(selectedFeatureName);

    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = keys.length - 1;
    if (newIndex >= keys.length) newIndex = 0;

    const newKey = keys[newIndex];
    let targetLayer;

    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(layer => {
            if (layer.feature.properties.name === newKey) {
                targetLayer = layer;
            }
        });
    }

    if (targetLayer) {
        showCountryInfo(newKey, targetLayer);
    }
}

// --- QUIZ LOGIC ---
let isQuizActive = false;
let quizScore = 0;
let quizTarget = null;
let quizPreviousView = null;

const quizUI = document.getElementById('quiz-ui');
const quizScoreVal = document.getElementById('quiz-score-val');
const quizTargetEl = document.getElementById('quiz-target');
const quizFeedback = document.getElementById('quiz-feedback');
const startQuizBtn = document.getElementById('start-quiz');
const stopQuizBtn = document.getElementById('stop-quiz');

if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
}

if (stopQuizBtn) {
    stopQuizBtn.addEventListener('click', stopQuiz);
}

function startQuiz() {
    isQuizActive = true;
    quizScore = 0;
    updateScore();

    // Store current view to restore later
    quizPreviousView = {
        center: map.getCenter(),
        zoom: map.getZoom()
    };

    // UI Updates
    hidePanel(); // Close info panel if open
    document.querySelector('.search-wrapper').classList.add('hidden'); // Hide search
    quizUI.classList.remove('hidden');

    // Zoom out to see whole continent
    map.flyTo([1.5, 17], 3.2, { duration: 1.5 });

    nextQuestion();
}

function stopQuiz() {
    isQuizActive = false;
    quizUI.classList.add('hidden');
    document.querySelector('.search-wrapper').classList.remove('hidden');

    // Reset Map Styles
    if (geoJsonLayer) {
        geoJsonLayer.eachLayer(l => geoJsonLayer.resetStyle(l));
    }

    // Restore view
    if (quizPreviousView) {
        map.flyTo(quizPreviousView.center, quizPreviousView.zoom, { duration: 1.5 });
        quizPreviousView = null;
    } else {
        map.flyTo([1.5, 17], 3.2, { duration: 1.5 });
    }
}

function nextQuestion() {
    const keys = Object.keys(countryData);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    quizTarget = randomKey;

    quizTargetEl.textContent = countryData[randomKey].name;
    quizFeedback.classList.add('hidden');
    quizFeedback.className = 'quiz-feedback hidden'; // Reset classes
}

function updateScore() {
    if (quizScoreVal) quizScoreVal.textContent = quizScore;
}

function handleQuizAttempt(name, layer) {
    if (name === quizTarget) {
        // Correct
        quizScore++;
        updateScore();

        // Large Overlay Feedback
        const overlay = document.createElement('div');
        overlay.id = 'quiz-overlay';
        overlay.innerHTML = '<div class="quiz-msg">CORRECT! 🎉</div>';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 1500);

        quizFeedback.textContent = "Correct! 🎉";
        quizFeedback.className = 'quiz-feedback success';
        quizFeedback.classList.remove('hidden');

        // Visuals
        fireConfetti();
        layer.setStyle({ fillColor: '#10b981', fillOpacity: 0.8, color: '#059669' }); // Green
        layer.bringToFront();

        setTimeout(() => {
            geoJsonLayer.resetStyle(layer);
            nextQuestion();
        }, 1500);

    } else {
        // Wrong
        quizFeedback.textContent = "Try Again! 😅";
        quizFeedback.className = 'quiz-feedback error';
        quizFeedback.classList.remove('hidden');

        // Shake Map
        const mapContainer = document.getElementById('map-container');
        mapContainer.classList.add('shake');
        setTimeout(() => mapContainer.classList.remove('shake'), 500);

        // Overlay Feedback
        const overlay = document.createElement('div');
        overlay.id = 'quiz-overlay';
        overlay.innerHTML = '<div class="quiz-msg" style="color: #ef4444;">TRY AGAIN! 😅</div>';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 1000);

        layer.setStyle({ fillColor: '#ef4444', fillOpacity: 0.6 }); // Red
        layer.bringToFront();

        setTimeout(() => {
            geoJsonLayer.resetStyle(layer);
        }, 500);
    }
}
