// Rose Laboratories — product catalogue data
const CATEGORIES = [
  {
    "id": "c1",
    "letter": "R",
    "quadrant": "tl",
    "title": "Proprietary Therapeutics",
    "subtitle": "Patent Drugs — OTC",
    "pricing": ""
  },
  {
    "id": "c2",
    "letter": "O",
    "quadrant": "tr",
    "title": "Proprietary Therapeutics",
    "subtitle": "Patent Drugs — Institutional Only",
    "pricing": ""
  },
  {
    "id": "c3",
    "letter": "S",
    "quadrant": "bl",
    "title": "Traditional Formulations",
    "subtitle": "Classical Medicines — OTC",
    "pricing": ""
  },
  {
    "id": "c4",
    "letter": "E",
    "quadrant": "br",
    "title": "Traditional Formulations",
    "subtitle": "Classical Medicines — Institutional Only",
    "pricing": ""
  }
];

const PRODUCTS = [
  {
    "id": "rose-gynosol-syrup",
    "name": "ROSE GYNOSOL Syrup",
    "packaging": "225 ml / 450 ml",
    "description": "Indicated for corporate gynecological therapeutics including secondary amenorrhea, dysmenorrhea, dysfunctional uterine bleeding (DUB), and leukorrhea.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rose-gynosol-syrup.jpg",
    "pricing": "135/-, 195/-"
  },
  {
    "id": "rose-gynosol-capsule",
    "name": "ROSE GYNOSOL Capsule",
    "packaging": "30 Caps",
    "description": "Indicated for secondary amenorrhea, dysmenorrhea, dysfunctional uterine bleeding (DUB), and leukorrhea.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rose-gynosol-capsule.jpg",
    "pricing": "135/-"
  },
  {
    "id": "rubina-syrup",
    "name": "RUBINA Syrup",
    "packaging": "100 ml / 180 ml / 450 ml",
    "description": "Advanced blood purifier and skin tonic. Indicated for persistent acne, pimples, boils, ringworm, and systemic detoxification. Helps balance lipid profiles and lower cholesterol levels.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rubina-syrup.jpg",
    "pricing": "110/-, 180/-, 350/-"
  },
  {
    "id": "rubina-capsule",
    "name": "RUBINA Capsule",
    "packaging": "30 Caps/ 60 Caps",
    "description": "Advanced blood purifier and skin tonic. Indicated for persistent acne, pimples, boils, ringworm, and systemic detoxification. Helps balance lipid profiles and lower cholesterol levels.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rubina-capsule.jpg",
    "pricing": "184/-, 360/-"
  },
  {
    "id": "rositone-s-syrup",
    "name": "ROSITONE S. Syrup",
    "packaging": "200 ml",
    "description": "Comprehensive neuro-tonic formulated to enhance cognitive memory, improve cardiac health, regulate sleep patterns, alleviate palpitations, and manage borderline systemic blood pressure.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rositone-s-syrup.jpg",
    "pricing": "180/-"
  },
  {
    "id": "rositone-s-capsule",
    "name": "ROSITONE S. Capsule",
    "packaging": "30 Caps",
    "description": "Comprehensive neuro-tonic formulated to enhance cognitive memory, improve cardiac health, regulate sleep patterns, alleviate palpitations, and manage borderline systemic blood pressure.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rositone-s-capsule.jpg",
    "pricing": "280/-"
  },
  {
    "id": "strength-fort-capsule",
    "name": "STRENGTH FORT Capsule",
    "packaging": "30 Caps/ 60 Caps",
    "description": "Premium restorative formulation for metabolic strength and vitality in men and women. Increases absolute physical endurance, supports gut microbiome health, and aids in managing menopausal transitions.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/strength-fort-capsule.jpg",
    "pricing": "260/-"
  },
  {
    "id": "pd-0-90-drops",
    "name": "PD 0.90 Drops",
    "packaging": "15 ml/ 60 ml/ 100 ml",
    "description": "Fast-acting pediatric and adult gastrointestinal drops. Indicated for Irritable Bowel Syndrome (IBS), acute dyspepsia, flatulence, hyperacidity, heartburn, nausea, and minor upper respiratory tract congestion (cough and cold).",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/pd-0-90-drops.jpg",
    "pricing": "60/-, 240/-, 460/-"
  },
  {
    "id": "pidana-oil",
    "name": "PIDANA Oil",
    "packaging": "60 ml / 100 ml",
    "description": "Highly penetrative topical analgesic for profound muscular pain, skeletal arthralgia, joint inflammation, cephalalgia (headache), and localized neuralgias.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/pidana-oil.jpg",
    "pricing": "150/-, 260/-"
  },
  {
    "id": "haven-hair-lotion",
    "name": "HAVEN Hair Lotion",
    "packaging": "225 ml",
    "description": "Intensive trichological solution designed to halt premature alopecia (hair fall), eliminate stubborn dandruff, remediate dry/rough shafts, and stimulate robust follicular hair regrowth.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/haven-hair-lotion.jpg",
    "pricing": "310/-"
  },
  {
    "id": "haven-body-massage-oil",
    "name": "HAVEN Body Massage Oil",
    "packaging": "110 ml / 225 ml",
    "description": "Advanced dermatological cell-rejuvenating oil. Reduces hyperpigmentation, smooths fine wrinkles, enhances natural skin glow, and promotes restorative deep sleep patterns.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/haven-body-massage-oil.jpg",
    "pricing": "360/-, 640/-"
  },
  {
    "id": "forest-rose-baby-massage-oil",
    "name": "FOREST ROSE Baby Massage Oil",
    "packaging": "60 ml / 110 ml / 225 ml",
    "description": "Pure, hypoallergenic pediatric formulation. Clinically balanced to accelerate cognitive development, strengthen musculoskeletal integrity, and build resilient defenses against pediatric skin infections.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/forest-rose-baby-massage-oil.jpg",
    "pricing": "125/-, 260/-, 400/-"
  },
  {
    "id": "livrose-syrup",
    "name": "LIVROSE Syrup",
    "packaging": "100 ml / 180 ml",
    "description": "Hepatic stimulant and hepatoprotective tonic. Indicated for chronic liver and spleen disorders, sluggish liver function, localized flatulence, and systemic digestive optimization.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/livrose-syrup.jpg",
    "pricing": "110/-, 180/-"
  },
  {
    "id": "livrose-capsule",
    "name": "LIVROSE Capsule",
    "packaging": "30 Caps/ 60 Caps",
    "description": "Hepatic stimulant and hepatoprotective tonic. Indicated for chronic liver and spleen disorders, sluggish liver function, localized flatulence, and systemic digestive optimization.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/livrose-capsule.jpg",
    "pricing": "135/-, 260/-"
  },
  {
    "id": "livrose-drops",
    "name": "LIVROSE Drops",
    "packaging": "60 ml",
    "description": "Pediatric hepatic stimulant and hepatoprotective formulation. Indicated for neonatal and pediatric jaundice symptoms, sluggish liver function, and sluggish digestion.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/livrose-drops.jpg",
    "pricing": "98/-"
  },
  {
    "id": "zymol-syrup",
    "name": "ZYMOL Syrup",
    "packaging": "100 ml / 180 ml",
    "description": "Advanced carminative enzyme formulation. Instantly remediates functional indigestion, acute flatulence, meteorism, and gastric hyperacidity.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/zymol-syrup.jpg",
    "pricing": "70/-, 125/-"
  },
  {
    "id": "zymol-capsule",
    "name": "ZYMOL Capsule",
    "packaging": "30 Caps / 60 Caps",
    "description": "Advanced carminative enzyme formulation. Instantly remediates functional indigestion, acute flatulence, meteorism, and gastric hyperacidity.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "120/-, 210/-"
  },
  {
    "id": "rahat-cough-syrup",
    "name": "RAHAT Cough Syrup",
    "packaging": "60 ml / 100 ml",
    "description": "Fast-acting, non-drowsy herbal expectorant. Remediates acute spasmodic coughs, pertussis (whooping cough), chronic bronchitis, and dry irritating cough profiles.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/rahat-cough-syrup.jpg",
    "pricing": "70/-, 115/-"
  },
  {
    "id": "kesh-hari-oil",
    "name": "KESH HARI Oil",
    "packaging": "200 ml",
    "description": "Nourishing herbal hair oil that strengthens roots, reduces hair fall and dandruff, and promotes healthy, lustrous hair growth.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/kesh-hari-oil.jpg",
    "pricing": "260/-"
  },
  {
    "id": "amla-mulethi-oil",
    "name": "AMLA MULETHI Oil",
    "packaging": "50 ml / 100 ml",
    "description": "Soothing topical formulation for scalp nourishment, hair conditioning, and calming thermal properties.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": "64/-, 120/-"
  },
  {
    "id": "ayurprovit-drops",
    "name": "AYURPROVIT Drops",
    "packaging": "60 ml",
    "description": "Concentrated pediatric nutritional supplement. Fortified with essential herbal bio-enhancers to boost metabolic immunity and safe systemic development.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/drops.jpg",
    "pricing": "130/-"
  },
  {
    "id": "ayurzyme-oil",
    "name": "AYURZYME Oil",
    "packaging": "100 ml",
    "description": "Specialized oil formulated for Improving digestive system, flatulence and recover from dropsy",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": "315/-"
  },
  {
    "id": "ayurzyme-capsule",
    "name": "AYURZYME Capsule",
    "packaging": "30 Caps/ 60 Caps/ 100 Caps",
    "description": "Potent carminative and digestive enzyme formulation designed to eliminate chronic dyspepsia and restore normal nutrient absorption.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "130/-, 210/-, 400/-"
  },
  {
    "id": "badshahi-chyawanprash",
    "name": "BADSHAHI CHYAWANPRASH",
    "packaging": "500 gm / 1 kg",
    "description": "Premium, gold-and-silver enriched immunomodulator paste. Preserves respiratory pathways, builds deep tissue integrity, and prevents seasonal infections.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/tonic.jpg",
    "pricing": "1500/-, 2800/-"
  },
  {
    "id": "bazi-rasayan-churna",
    "name": "BAZI RASAYAN Churna",
    "packaging": "60 gm / 100 gm",
    "description": "Potent Ayurvedic revitalizer and adaptogen designed to eliminate stress-induced weakness, enhance cellular stamina, and optimize physical vigor.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "375/-, 650/-"
  },
  {
    "id": "bazi-rasayan-capsule",
    "name": "BAZI RASAYAN Capsule",
    "packaging": "30 Caps",
    "description": "Potent Ayurvedic revitalizer and adaptogen designed to eliminate stress-induced weakness, enhance cellular stamina, and optimize physical vigor.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "590/-"
  },
  {
    "id": "bazigrah-capsule",
    "name": "BAZIGRAH Capsule",
    "packaging": "30 Caps",
    "description": "High-potency formulation targeting corporate lifestyle exhaustion, low stamina, and male/female metabolic reproductive vitality.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "490/-"
  },
  {
    "id": "bivai-ointment",
    "name": "BIVAI Ointment",
    "packaging": "15 gm",
    "description": "Broad-spectrum antiseptic and soothing dermal cream for superficial cuts, grazes, minor burns, and infected dermatoses.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": ""
  },
  {
    "id": "bernovit-ointment",
    "name": "BERNOVIT Ointment",
    "packaging": "15 gm",
    "description": "Advanced burn repair ointment with tissue-regenerating properties. Alleviates pain and prevents scarring from secondary thermal injuries.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": "160/-"
  },
  {
    "id": "calrose-syrup",
    "name": "CALROSE Syrup",
    "packaging": "100 ml/ 200 ml",
    "description": "Bio-available natural calcium supplement derived from premium marine resources. Accelerates osteogenesis, strengthens bone mineral density, and bridges nutritional deficits.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "90/-, 170/-"
  },
  {
    "id": "dadna-ointment",
    "name": "DADNA Ointment",
    "packaging": "15 gm",
    "description": "High-potency fungicidal topical formulation specifically targeting stubborn tinea infections, ringworm, eczema, and localized pruritus.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": "115/-"
  },
  {
    "id": "dadna-powder",
    "name": "DADNA Powder",
    "packaging": "50 gm",
    "description": "Absorbent, cooling antifungal dusting powder designed to eliminate excessive perspiration, prevent dermatomycoses, and stop skin chafing.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "230/-"
  },
  {
    "id": "febno-capsule",
    "name": "FEBNO Capsule",
    "packaging": "30 Caps",
    "description": "Herbal antipyretic and analgesic. Optimizes corporate immune response during viral fevers, malaria, and general systemic infectious profiles.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "300/-"
  },
  {
    "id": "ferfoslim-liquid",
    "name": "FERFOSLIM Liquid",
    "packaging": "200 ml / 450 ml",
    "description": "Specialized natural formulation designed to correct corporate lipid metabolic disorders, assist in healthy weight management, and tone digestion.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "310/-, 560/-"
  },
  {
    "id": "ferose-syrup",
    "name": "FEROSE Syrup",
    "packaging": "200 ml",
    "description": "Highly bio-available organic iron tonic. Promotes rapid hematopoiesis (blood generation), elevates hemoglobin counts, and eradicates chronic fatigue syndrome.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "195/-"
  },
  {
    "id": "haritaki-powder",
    "name": "HARITAKI Powder",
    "packaging": "100 gm",
    "description": "Standardized single-herb mild laxative and colon cleanser. Enhances natural gut motility, neutralizes hyperacidity, and assists in systemic detoxification.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "90/-"
  },
  {
    "id": "haven-antiseptic-lotion",
    "name": "HAVEN Antiseptic Lotion",
    "packaging": "60 ml/ 100 ml / 200 ml/ 450 ml",
    "description": "Medical-grade herbal antiseptic solution for thorough wound irrigation, post-minor surgical sanitization, and broad-spectrum antimicrobial skin protection.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": "90/-, 170/-, 320/-, 560/-"
  },
  {
    "id": "khansari-syrup",
    "name": "KHANSARI Syrup",
    "packaging": "100 ml",
    "description": "Traditional demulcent cough syrup formulated to soothe highly inflamed pharyngeal passages and clear sticky bronchial mucous.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "115/-"
  },
  {
    "id": "karan-bindu-ear-drops",
    "name": "KARAN BINDU Ear Drops",
    "packaging": "10 ml",
    "description": "Therapeutic ear drops with potent antimicrobial and anti-inflammatory properties to address otalgia (earache), tinnitus, and minor ear canal congestion.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/drops.jpg",
    "pricing": ""
  },
  {
    "id": "krimix-liquid",
    "name": "KRIMIX Liquid",
    "packaging": "60 ml",
    "description": "Broad-spectrum natural anthelmintic formulation for safe, thorough intestinal deworming in pediatric and adult profiles.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/tonic.jpg",
    "pricing": ""
  },
  {
    "id": "lucosol-syrup",
    "name": "LUCOSOL Syrup",
    "packaging": "225 ml",
    "description": "Advanced uterine tonic explicitly targeting chronic leucorrhea, non-specific vaginal discharge, and associated pelvic backache.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "280/-"
  },
  {
    "id": "lucosol-capsule",
    "name": "LUCOSOL Capsule",
    "packaging": "30 Caps",
    "description": "Advanced uterine capsule explicitly targeting chronic leucorrhea, non-specific vaginal discharge, and associated pelvic backache.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "330/-"
  },
  {
    "id": "luceliya-syrup",
    "name": "LUCELIYA Syrup",
    "packaging": "200 ml",
    "description": "Nutritional and hormonal balancing syrup formulated for young female adults to regularize irregular menstrual cycles and boost energy.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "290/-"
  },
  {
    "id": "motise-dant-manjan",
    "name": "MOTISE DANT MANJAN",
    "packaging": "60 gm / 100 gm",
    "description": "Premium non-abrasive herbal toothpowder. Strengthens periodontal tissue (gums), eliminates halitosis (bad breath), prevents dental caries, and tightens loose teeth.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "65/-, 105/-"
  },
  {
    "id": "pidana-balm",
    "name": "PIDANA Balm",
    "packaging": "10 gm / 25 gm / 50 gm",
    "description": "Hyperthermic counter-irritant balm for immediate relief from acute spasmodic neck pain, shoulder stiffness, and tension headaches.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": "36/-, 75/-, 320/-"
  },
  {
    "id": "pilyana-capsule",
    "name": "PILYANA Capsule",
    "packaging": "30 Caps",
    "description": "Targeted hepatobiliary formulation designed to remediate obstructive jaundice, fatty liver degeneration, and acute loss of appetite.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "370/-"
  },
  {
    "id": "pilyana-ointment",
    "name": "PILYANA Ointment",
    "packaging": "15 gm",
    "description": "Soothing topical cream designed to accelerate healing in external anal fissures, painful hemorrhoidal masses, and perianal itching.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": "180/-"
  },
  {
    "id": "rose-ointment",
    "name": "ROSE Ointment",
    "packaging": "15 gm",
    "description": "Multi-purpose cell-regenerating skin barrier ointment for chronic non-healing ulcers, cracked heels, and extreme dry skin conditions.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/ointment.jpg",
    "pricing": "109/-"
  },
  {
    "id": "rosiplex-syrup",
    "name": "ROSIPLEX Syrup",
    "packaging": "200 ml",
    "description": "High-potency herbal B-complex alternative. Combats mouth ulcers, tongue inflammation, chronic lethargy, and neural nutritional deficiencies.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "190/-"
  },
  {
    "id": "yakritone-syrup",
    "name": "YAKRITONE Syrup",
    "packaging": "100 ml / 200 ml",
    "description": "Elite-tier premium Liver Tonic. Rejuvenates compromised hepatocytes, neutralizes toxic damage from long-term medication use, and normalizes metabolic digestion.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "100/-, 180/-"
  },
  {
    "id": "yakritone-drops",
    "name": "YAKRITONE Drops",
    "packaging": "60 ml",
    "description": "Pediatric liver and appetite stimulant. Ensures healthy weight gain and clears localized metabolic disturbances in infants.",
    "cat": "c1",
    "stock": 40,
    "image": "assets/products/placeholder/drops.jpg",
    "pricing": "100/-"
  },
  {
    "id": "betsolin-capsule",
    "name": "BETSOLIN Capsule",
    "packaging": "10 cap/ 30 cap/ 60 cap / 100 cap",
    "description": "Immunity modulator. Clinically indicated for Irritable Bowel Syndrome (IBS), Gastrointestinal Disorders (GID), and Urinary Tract Infections (UTI). Provides excellent results in hemorrhoids (piles), leukorrhea, and internal/external inflammatory conditions.",
    "cat": "c2",
    "stock": 40,
    "image": "assets/products/betsolin-capsule.jpg",
    "pricing": "239/-, 700/-, 1400/-, 2250/-"
  },
  {
    "id": "asmago-liquid",
    "name": "ASMAGO Liquid",
    "packaging": "100 ml / 200 ml",
    "description": "Bronchodilator and respiratory tonic formulated to alleviate bronchial asthma, chronic dyspnea, and recurring pulmonary allergies.",
    "cat": "c2",
    "stock": 40,
    "image": "assets/products/placeholder/tonic.jpg",
    "pricing": "135/-, 265/-"
  },
  {
    "id": "ba-ha-syrup",
    "name": "BA-HA Syrup",
    "packaging": "200 ml",
    "description": "Rejuvenating systemic tonic for overall vitality, strength, and accelerated recovery from chronic post-viral debility.",
    "cat": "c2",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "215/-"
  },
  {
    "id": "herbo-state-capsule",
    "name": "HERBO STATE Capsule",
    "packaging": "30 Caps",
    "description": "Premium organic wellness and vitality booster formulated to manage day-to-day work stress and physical depletion.",
    "cat": "c2",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": ""
  },
  {
    "id": "ashwagandha-capsule",
    "name": "ASHWAGANDHA Capsule",
    "packaging": "30 Caps / 60 Caps",
    "description": "Potent adaptogen and neuroprotective agent. Clinically proven to reduce corporate anxiety, enhance long-term memory retention, mitigate systemic inflammation, increase absolute muscle strength, and significantly elevate immune parameters.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/capsule.jpg",
    "pricing": "180/-, 350/-"
  },
  {
    "id": "ashwagandha-churna",
    "name": "ASHWAGANDHA Churna",
    "packaging": "60 gm / 90 gm",
    "description": "Traditional standardized powder of Withania somnifera. Used as a systemic rejuvenator, muscle tonic, and highly effective sleep regulator.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "120/-, 180/-"
  },
  {
    "id": "satavari-churna",
    "name": "SATAVARI Churna",
    "packaging": "60 gm / 90 gm",
    "description": "Premium single-herb nutritional support for female reproductive health and endocrinal balance. Acts as a potent antioxidant, immunomodulator, and aids in regulating blood glucose thresholds.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "180/-, 260/-"
  },
  {
    "id": "arjuna-churna",
    "name": "ARJUNA Churna",
    "packaging": "60 gm / 90 gm",
    "description": "Cardio-protective bark powder of Terminalia arjuna. Strengthens myocardial muscles, exhibits powerful anti-inflammatory, antioxidant, and antimicrobial properties, and supports optimal vascular tone.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "75/-, 105/-"
  },
  {
    "id": "shilajit-resin",
    "name": "SHILAJIT Resin",
    "packaging": "10 gm / 20 gm",
    "description": "Ultra-pure, purified mineral exudate. Acts as a premier cellular rejuvenator ('Rasayana'), core antioxidant, mitochondrial energy enhancer, and performance vitalizer.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/avaleha.jpg",
    "pricing": "165/-, 310/-"
  },
  {
    "id": "triphala-churna",
    "name": "TRIPHALA Churna",
    "packaging": "90 gm / 200 gm / 500 gm / 1 kg",
    "description": "Synergistic tri-herbal formulation for master digestive rejuvenation. Promotes deep physiological detoxification, accelerates colon cleansing, supports ocular health, and assists in blood sugar homeostasis.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "82/-, 180/-, 450/-, 900/-"
  },
  {
    "id": "triphala-syrup",
    "name": "TRIPHALA Syrup",
    "packaging": "450 ml",
    "description": "Palatable liquid formulation of classic Triphala. Ensures smooth gastrointestinal motility, relieves chronic constipation, and neutralizes hyperacidity.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": "130/-"
  },
  {
    "id": "isabgol-husk",
    "name": "ISABGOL Husk",
    "packaging": "90 gm",
    "description": "Premium mechanical dietary fiber. Indicated for regularizing physiological bowel habits, treating spastic chronic constipation, absorbing colon toxins, and supporting long-term cardiovascular health.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "200/-"
  },
  {
    "id": "sitopaladi-churna",
    "name": "SITOPALADI Churna",
    "packaging": "50 gm / 90 gm",
    "description": "Classic Ayurvedic immunomodulatory and anti-inflammatory powder for respiratory health. Quickly resolves productive coughs, congestion, allergic rhinitis, and low-grade intermitting fevers.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "110/-, 205/-"
  },
  {
    "id": "hingvastak-churna",
    "name": "HINGVASTAK Churna",
    "packaging": "50 gm / 90 gm",
    "description": "Traditional carminative powder targeting severe abdominal flatulence, intestinal colic, and functional dyspepsia. Enhances 'Agni' (the core digestive fire) for rapid assimilation.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "140/-, 250/-"
  },
  {
    "id": "lavan-bhaskar-churna",
    "name": "LAVAN BHASKAR Churna",
    "packaging": "50 gm / 90 gm",
    "description": "Highly celebrated therapeutic saline powder for gastric distress. Resolves clinical bloating, chronic loss of appetite, intestinal gas stagnation, and minor acid reflux.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": "50/-, 90/-"
  },
  {
    "id": "chyawanprash-avaleha",
    "name": "CHYAWANPRASH AVALEHA",
    "packaging": "500 gm / 1 kg",
    "description": "Time-tested poly-herbal biological shield. Rich in Vitamin C, optimizes absolute pulmonary capacity, reverses tissue aging, and stabilizes core immunity.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/chawan.jpg",
    "pricing": ""
  },
  {
    "id": "balkutjawaleha",
    "name": "BALKUTJAWALEHA",
    "packaging": "250 gm",
    "description": "Specialized therapeutic herbal paste designed to resolve persistent chronic diarrhea, bacillary dysentery, and malabsorption syndromes.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/avaleha.jpg",
    "pricing": ""
  },
  {
    "id": "sobhagya-sunthi-paka",
    "name": "SOBHAGYA SUNTHI Paka",
    "packaging": "250 gm / 500 gm",
    "description": "Traditional post-natal restorative formulation. Strengthens uterine walls, cleanses reproductive tracts, improves lactation quality, and prevents postpartum joint pain.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/avaleha.jpg",
    "pricing": ""
  },
  {
    "id": "bilvadi-churna",
    "name": "BILVADI Churna",
    "packaging": "50 gm / 100 gm",
    "description": "Astringent gastrointestinal formulation. Indicated for amoebic dysentery, recurring loose motions, mucous-laden stools, and irritable bowel flare-ups.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": ""
  },
  {
    "id": "jatifaladi-churna",
    "name": "JATIFALADI Churna",
    "packaging": "50 gm / 90 gm",
    "description": "Calming gastrointestinal and nervous system formulation. Indicated for sprue, chronic diarrhea, persistent insomnia, and severe abdominal cramping.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": ""
  },
  {
    "id": "markandeya-churna",
    "name": "MARKANDEYA Churna",
    "packaging": "50 gm / 100 gm",
    "description": "Traditional poly-herbal compound used for blood purification, treating systemic skin diseases, and regularizing metabolic liver parameters.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/churna.jpg",
    "pricing": ""
  },
  {
    "id": "ashokarishta",
    "name": "ASHOKARISHTA",
    "packaging": "450 ml",
    "description": "Premier fermented liquid uterine tonic. Regulates painful or heavy menstrual cycles, mitigates pelvic congestion, and preserves female reproductive vitality.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/tonic.jpg",
    "pricing": ""
  },
  {
    "id": "dashmoolarishta",
    "name": "DASHMOOLARISHTA",
    "packaging": "450 ml",
    "description": "Fermented ten-root health restorer. Combats fatigue, eliminates structural joint pain, improves nervous system health, and acts as an excellent post-partum recovery tonic.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/tonic.jpg",
    "pricing": ""
  },
  {
    "id": "maha-narayan-tel",
    "name": "MAHA NARAYAN Tel",
    "packaging": "50 ml / 100 ml / 200 ml",
    "description": "Elite-tier classical medicated oil. Profoundly restores joint mobility, lubricates arthritic cartilage, and eliminates structural stiffness and sciatic neuralgias.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": ""
  },
  {
    "id": "maha-mash-tel",
    "name": "MAHA MASH Tel",
    "packaging": "50 ml / 100 ml",
    "description": "High-density neurological massage oil. Indicated for localized paralysis, facial palsy, muscular dystrophy, and acute localized body tremors.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": ""
  },
  {
    "id": "bhringraj-tel",
    "name": "BHRINGRAJ Tel",
    "packaging": "100 ml / 200 ml",
    "description": "Premier trichological oil. Deeply cools the cerebral cortex, promotes deep REM sleep, halts advanced hair loss, and arrests premature hair greying.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": "99/-, 170/-"
  },
  {
    "id": "shankhpushpi-tel",
    "name": "SHANKHPUSHPI Tel",
    "packaging": "100 ml",
    "description": "Soothing pediatric and adult neuro-massage oil. Calms hyperactivity, sharpens mental focus, and optimizes nervous system developmental health.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": "270/-"
  },
  {
    "id": "dashmool-tel",
    "name": "DASHMOOL Tel",
    "packaging": "100 ml",
    "description": "Anti-inflammatory and warming medicated oil. Formulated to clear localized fluid retention, relieve muscular spasms, and alleviate severe lower backaches.",
    "cat": "c3",
    "stock": 40,
    "image": "assets/products/placeholder/oil.jpg",
    "pricing": "190/-"
  },
  {
    "id": "makardhwaj-vati",
    "name": "MAKARDHWAJ Vati",
    "packaging": "10 Tab / 20 Tab",
    "description": "High-potency mineralo-herbal rejuvenator and cardiac stimulant. Combats age-related tissue decay, restores nervous energy, and boosts acute immune resilience.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/tablet.jpg",
    "pricing": ""
  },
  {
    "id": "chandraprabha-vati",
    "name": "CHANDRAPRABHA Vati",
    "packaging": "40 Tab / 80 Tab",
    "description": "Master urinary tract cleanser and metabolic regularizer. Indicated for localized painful micturition, frequent urination, lower back pain, and prostate size stabilization.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/tablet.jpg",
    "pricing": ""
  },
  {
    "id": "kasis-bhasma",
    "name": "KASIS BHASMA",
    "packaging": "10 gm",
    "description": "Purified iron-sulfate formulation. Highly potent hematinic agent indicated for rapid iron-deficiency anemia correction and resolving splenomegaly.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "140/-"
  },
  {
    "id": "trivanga-bhasma",
    "name": "TRIVANGA BHASMA",
    "packaging": "5 gm",
    "description": "Advanced metallic preparation for the genitourinary system. Indicated for persistent diabetes-induced weakness, nocturnal emissions, and chronic leucorrhea.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "175/-"
  },
  {
    "id": "mandoor-bhasma",
    "name": "MANDOOR BHASMA",
    "packaging": "10 gm",
    "description": "Calcined iron ore formulation. Premier therapeutic choice for hemolytic jaundice, severe anemia, liver congestion, and localized edematous conditions.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "100/-"
  },
  {
    "id": "mukta-shukti-bhasma",
    "name": "MUKTA SHUKTI BHASMA",
    "packaging": "5 gm",
    "description": "Purified mother-of-pearl preparation. Unmatched natural antacid and calcium source for treating severe peptic ulcers, acid gastritis, and bone weakness.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "35/-"
  },
  {
    "id": "loh-bhasma",
    "name": "LOH BHASMA",
    "packaging": "5 gm / 10 gm",
    "description": "Therapeutically calcined pure iron. Enhances cellular oxygenation, eliminates profound physical weakness, and optimizes functional liver-spleen output.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "30/-, 60/-"
  },
  {
    "id": "sphatika-bhasma",
    "name": "SPHATIKA BHASMA",
    "packaging": "10 gm",
    "description": "Purified alum formulation. Highly valued for its potent styptic, systemic hemostatic (stops bleeding), and external antimicrobial properties.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "70/-"
  },
  {
    "id": "swarna-makshik-bhasma",
    "name": "SWARNA MAKSHIK BHASMA",
    "packaging": "5 gm",
    "description": "Calcined copper-iron pyrite. Highly bio-available tonic for correcting nutritional iron deficits, nervous exhaustion, and chronic skin conditions.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "75/-"
  },
  {
    "id": "swarna-bhasma",
    "name": "SWARNA BHASMA",
    "packaging": "100 mg / 500 mg",
    "description": "Ultra-premium, chemically inert calcined nano-gold. Supreme cell regenerator, deep nerve vitalizer, and highly potent biological immunomodulator for advanced therapeutic recovery.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "5000/-, 25000/-"
  },
  {
    "id": "abhrak-bhasma",
    "name": "ABHRAK BHASMA",
    "packaging": "2.5 gm / 5 gm",
    "description": "Calcined biotite mica. Indicated for chronic debilitating respiratory disorders, structural nervous system decay, and long-term cellular anti-aging therapy.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/bhasma.jpg",
    "pricing": "30/-, 70/-"
  },
  {
    "id": "kshar-sutra",
    "name": "KSHAR SUTRA",
    "packaging": "1 Box (Standard)",
    "description": "Medicated surgical thread coated with specific alkaline plant ashes. Used in standard specialized surgical clinics for the minimal-invasive eradication of complex anal fistulas and hemorrhoids.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/kshar-sutra.jpg",
    "pricing": ""
  },
  {
    "id": "sobhagya-sunthi-ras",
    "name": "SOBHAGYA SUNTHI Ras",
    "packaging": "10 gm",
    "description": "Potent mineral-infused adaptation of Sunthi. Specially indicated for correcting deep gastric imbalances, chronic malabsorption, and severe rheumatoid arthralgia.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/syrup.jpg",
    "pricing": ""
  },
  {
    "id": "shuddha-guggulu",
    "name": "SHUDDHA GUGGULU",
    "packaging": "30 Caps / 60 gm",
    "description": "Purified oleo-gum resin of Commiphora mukul. Acts as a premier systemic anti-inflammatory, joint pain protector, and powerful lipid/cholesterol optimizer.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/tablet.jpg",
    "pricing": "300/-, 600/-"
  },
  {
    "id": "lakshadi-guggulu",
    "name": "LAKSHADI GUGGULU",
    "packaging": "40 Tab / 80 Tab",
    "description": "Targeted Guggulu compound fortified for skeletal repairs. Significantly accelerates bone fracture union, mends torn ligaments, and reduces localized bone swelling.",
    "cat": "c4",
    "stock": 40,
    "image": "assets/products/placeholder/tablet.jpg",
    "pricing": ""
  }
];
