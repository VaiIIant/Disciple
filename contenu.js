"use strict";
/* Mes Quêtes — contenus proposés : prières, chapelet, séances d'exercices, course, leçons, lectures. */

// ================================================================== PRIÈRES (tradition catholique)
const P = {
  signe: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.",
  notrePere: "Notre Père, qui es aux cieux, que ton nom soit sanctifié, que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel. Donne-nous aujourd'hui notre pain de ce jour. Pardonne-nous nos offenses, comme nous pardonnons aussi à ceux qui nous ont offensés. Et ne nous laisse pas entrer en tentation, mais délivre-nous du Mal. Amen.",
  ave: "Je vous salue, Marie, pleine de grâce ; le Seigneur est avec vous. Vous êtes bénie entre toutes les femmes, et Jésus, le fruit de vos entrailles, est béni. Sainte Marie, Mère de Dieu, priez pour nous, pauvres pécheurs, maintenant et à l'heure de notre mort. Amen.",
  gloire: "Gloire au Père, et au Fils, et au Saint-Esprit, comme il était au commencement, maintenant et toujours, et pour les siècles des siècles. Amen.",
  credo: "Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre. Et en Jésus-Christ, son Fils unique, notre Seigneur, qui a été conçu du Saint-Esprit, est né de la Vierge Marie, a souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli, est descendu aux enfers, le troisième jour est ressuscité des morts, est monté aux cieux, est assis à la droite de Dieu le Père tout-puissant, d'où il viendra juger les vivants et les morts. Je crois en l'Esprit Saint, à la sainte Église catholique, à la communion des saints, à la rémission des péchés, à la résurrection de la chair, à la vie éternelle. Amen.",
  offrande: "Mon Dieu, je vous offre toutes les actions de cette journée : faites qu'elles soient toutes selon votre sainte volonté et pour votre plus grande gloire. Amen.",
  contrition: "Mon Dieu, j'ai un très grand regret de vous avoir offensé, parce que vous êtes infiniment bon, infiniment aimable, et que le péché vous déplaît. Je prends la ferme résolution, avec le secours de votre sainte grâce, de ne plus vous offenser et de faire pénitence. Amen.",
  remets: "En tes mains, Seigneur, je remets mon esprit. Garde-moi cette nuit sous ta protection, et que je me réveille demain pour te servir. Amen.",
};

const PRIERES_MATIN = [
  { titre: "Prière à l'ange gardien", texte: "Ange de Dieu, qui êtes mon gardien, et à qui j'ai été confié par la bonté divine, éclairez-moi, gardez-moi, dirigez-moi et gouvernez-moi. Amen." },
  { titre: "Viens, Esprit Saint", texte: "Viens, Esprit Saint, remplis le cœur de tes fidèles et allume en eux le feu de ton amour. Envoie ton Esprit et tout sera créé, et tu renouvelleras la face de la terre. Amen." },
  { titre: "Prière de saint François", texte: "Seigneur, fais de moi un instrument de ta paix. Là où est la haine, que je mette l'amour. Là où est l'offense, que je mette le pardon. Là où est la discorde, que je mette l'union. Là où est l'erreur, que je mette la vérité. Là où est le doute, que je mette la foi. Là où est le désespoir, que je mette l'espérance. Là où sont les ténèbres, que je mette la lumière. Là où est la tristesse, que je mette la joie. Ô Maître, que je ne cherche pas tant à être consolé qu'à consoler, à être compris qu'à comprendre, à être aimé qu'à aimer. Car c'est en se donnant qu'on reçoit, c'est en s'oubliant qu'on se retrouve, c'est en pardonnant qu'on est pardonné, c'est en mourant qu'on ressuscite à l'éternelle vie." },
  { titre: "Prends, Seigneur (saint Ignace)", texte: "Prends, Seigneur, et reçois toute ma liberté, ma mémoire, mon intelligence et toute ma volonté, tout ce que j'ai et possède. C'est toi qui m'as tout donné : à toi, Seigneur, je le rends. Tout est à toi, disposes-en selon ton entière volonté. Donne-moi ton amour et ta grâce : c'est assez pour moi." },
  { titre: "Je crois en Dieu", texte: P.credo },
  { titre: "Que rien ne te trouble (sainte Thérèse d'Avila)", texte: "Que rien ne te trouble, que rien ne t'effraie. Tout passe, Dieu ne change pas. La patience obtient tout. Celui qui possède Dieu ne manque de rien. Dieu seul suffit." },
  { titre: "L'Angélus", texte: "L'ange du Seigneur apporta l'annonce à Marie, et elle conçut du Saint-Esprit. — Je vous salue Marie…\nVoici la servante du Seigneur : qu'il me soit fait selon votre parole. — Je vous salue Marie…\nEt le Verbe s'est fait chair, et il a habité parmi nous. — Je vous salue Marie…\nPriez pour nous, sainte Mère de Dieu, afin que nous soyons rendus dignes des promesses du Christ.\nPrions : Que ta grâce, Seigneur notre Père, se répande en nos cœurs : par le message de l'ange, tu nous as fait connaître l'incarnation de ton Fils bien-aimé ; conduis-nous, par sa passion et par sa croix, jusqu'à la gloire de la résurrection. Par Jésus, le Christ, notre Seigneur. Amen." },
  { titre: "Âme du Christ", texte: "Âme du Christ, sanctifie-moi. Corps du Christ, sauve-moi. Sang du Christ, enivre-moi. Eau du côté du Christ, lave-moi. Passion du Christ, fortifie-moi. Ô bon Jésus, exauce-moi. Dans tes blessures, cache-moi. Ne permets pas que je sois séparé de toi. De l'ennemi, défends-moi. À l'heure de ma mort, appelle-moi, et ordonne-moi de venir à toi, pour qu'avec tes saints je te loue, dans les siècles des siècles. Amen." },
];

const PRIERES_SOIR = [
  { titre: "Acte de contrition", texte: P.contrition },
  { titre: "Souvenez-vous (saint Bernard)", texte: "Souvenez-vous, ô très miséricordieuse Vierge Marie, qu'on n'a jamais entendu dire qu'aucun de ceux qui ont eu recours à votre protection, imploré votre assistance ou réclamé vos suffrages, ait été abandonné. Animé d'une pareille confiance, ô Vierge des vierges, ô ma Mère, je cours vers vous, et gémissant sous le poids de mes péchés, je me prosterne à vos pieds. Ô Mère du Verbe incarné, ne méprisez pas mes prières, mais écoutez-les favorablement et daignez les exaucer. Amen." },
  { titre: "Prière d'abandon (Charles de Foucauld)", texte: "Mon Père, je m'abandonne à toi, fais de moi ce qu'il te plaira. Quoi que tu fasses de moi, je te remercie. Je suis prêt à tout, j'accepte tout. Pourvu que ta volonté se fasse en moi, en toutes tes créatures, je ne désire rien d'autre, mon Dieu. Je remets mon âme entre tes mains. Je te la donne, mon Dieu, avec tout l'amour de mon cœur, parce que je t'aime, et que ce m'est un besoin d'amour de me donner, de me remettre entre tes mains, sans mesure, avec une infinie confiance, car tu es mon Père." },
  { titre: "Salut, ô Reine (Salve Regina)", texte: "Salut, ô Reine, Mère de miséricorde, notre vie, notre douceur, notre espérance, salut ! Enfants d'Ève, exilés, nous crions vers toi ; vers toi nous soupirons, gémissant et pleurant dans cette vallée de larmes. Ô toi, notre avocate, tourne vers nous ton regard miséricordieux. Et, après cet exil, montre-nous Jésus, le fruit béni de ton sein. Ô clémente, ô miséricordieuse, ô douce Vierge Marie !" },
  { titre: "Sous l'abri de ta miséricorde", texte: "Sous l'abri de ta miséricorde, nous nous réfugions, sainte Mère de Dieu. Ne méprise pas nos prières quand nous sommes dans l'épreuve, mais de tous les dangers délivre-nous toujours, Vierge glorieuse et bénie." },
  { titre: "Reste avec nous, Seigneur", texte: "Reste avec nous, Seigneur, car le soir approche et déjà le jour baisse (Luc 24, 29). Merci pour cette journée, pour ses joies et pour ses peines. Pardonne-moi ce qui n'a pas été selon ton cœur, garde ceux que j'aime, et donne le repos à ceux qui souffrent. Amen." },
];

const INTENTIONS = [
  "Pour ma famille et ceux que j'aime.", "Pour une personne malade ou qui souffre.", "Pour la paix dans le monde.",
  "Pour quelqu'un avec qui j'ai du mal à m'entendre.", "Pour les personnes seules.", "Pour mon travail et mes projets de la journée.",
  "Pour les défunts de ma famille.", "Pour l'Église et pour le pape.", "Pour ceux qui cherchent un sens à leur vie.",
  "Pour les personnes sans travail ou sans logement.", "Pour mes amis.", "Pour savoir rendre grâce de ce que j'ai reçu.",
];

const PAROLES = [
  ["Venez à moi, vous tous qui peinez sous le poids du fardeau, et moi, je vous procurerai le repos.", "Matthieu 11, 28"],
  ["Le Seigneur est mon berger : je ne manque de rien.", "Psaume 22 (23), 1"],
  ["Ne crains pas, car je suis avec toi.", "Isaïe 41, 10"],
  ["Aimez-vous les uns les autres comme je vous ai aimés.", "Jean 15, 12"],
  ["Demandez, on vous donnera ; cherchez, vous trouverez ; frappez, on vous ouvrira.", "Matthieu 7, 7"],
  ["Je suis la lumière du monde. Celui qui me suit ne marchera pas dans les ténèbres.", "Jean 8, 12"],
  ["L'amour prend patience ; l'amour rend service.", "1re lettre aux Corinthiens 13, 4"],
  ["Heureux les artisans de paix, car ils seront appelés fils de Dieu.", "Matthieu 5, 9"],
  ["Je puis tout en celui qui me donne la force.", "Lettre aux Philippiens 4, 13"],
  ["Cherchez d'abord le royaume de Dieu et sa justice, et tout cela vous sera donné par surcroît.", "Matthieu 6, 33"],
  ["Soyez dans la joie, priez sans relâche, rendez grâce en toute circonstance.", "1re lettre aux Thessaloniciens 5, 16-18"],
  ["Voici que je suis avec vous tous les jours jusqu'à la fin du monde.", "Matthieu 28, 20"],
];

const EXAMEN = [
  "Remercier : pour quoi puis-je dire merci aujourd'hui ? Une rencontre, un moment, une grâce reçue.",
  "Demander la lumière : « Seigneur, aide-moi à voir ma journée avec ton regard. »",
  "Relire la journée : où ai-je aimé ? Où ai-je manqué d'amour, de patience, de vérité ?",
  "Demander pardon pour ce qui n'a pas été juste.",
  "Regarder demain : quelle résolution concrète, même petite, pour la journée qui vient ?",
];

const MYSTERES = {
  joyeux: ["l'Annonciation", "la Visitation", "la Nativité", "la Présentation de Jésus au Temple", "le Recouvrement de Jésus au Temple"],
  lumineux: ["le Baptême de Jésus", "les Noces de Cana", "l'Annonce du Royaume", "la Transfiguration", "l'Institution de l'Eucharistie"],
  douloureux: ["l'Agonie à Gethsémani", "la Flagellation", "le Couronnement d'épines", "le Portement de la croix", "la Crucifixion"],
  glorieux: ["la Résurrection", "l'Ascension", "la Pentecôte", "l'Assomption de Marie", "le Couronnement de Marie"],
};
// lundi = 0 … dimanche = 6
const MYSTERES_DU_JOUR = ["joyeux", "douloureux", "glorieux", "lumineux", "douloureux", "joyeux", "glorieux"];

// ================================================================== EXERCICES (maison, sans matériel, intermédiaire)
// m : "reps" ou "sec" ; v : valeur ; c : consigne
const EXOS = {
  pompes: { nom: "Pompes", m: "reps", v: 12, c: "Mains un peu plus larges que les épaules, corps gainé de la tête aux talons, la poitrine frôle le sol." },
  pompes_diamant: { nom: "Pompes diamant", m: "reps", v: 8, c: "Mains en losange sous la poitrine, coudes serrés le long du corps." },
  pompes_declinees: { nom: "Pompes déclinées", m: "reps", v: 10, c: "Pieds posés sur une chaise, mains au sol : on travaille le haut des pectoraux." },
  pompes_pike: { nom: "Pompes « pike » (épaules)", m: "reps", v: 8, c: "Fesses en l'air, corps en V renversé : plier les coudes pour amener le front vers le sol." },
  dips: { nom: "Dips sur chaise", m: "reps", v: 12, c: "Mains au bord d'une chaise stable, descendre en pliant les coudes à 90°, dos près de la chaise." },
  superman: { nom: "Superman", m: "reps", v: 12, c: "Allongé sur le ventre, lever bras et jambes ensemble, tenir 2 secondes, redescendre." },
  squats: { nom: "Squats", m: "reps", v: 20, c: "Pieds largeur d'épaules, descendre jusqu'aux cuisses parallèles au sol, talons au sol, dos droit." },
  squats_sautes: { nom: "Squats sautés", m: "reps", v: 12, c: "Squat puis saut explosif ; atterrir en douceur, genoux souples." },
  fentes: { nom: "Fentes alternées", m: "reps", v: 24, c: "Un grand pas en avant, genou arrière proche du sol, buste droit. 12 par jambe." },
  fentes_bulgares: { nom: "Fentes bulgares", m: "reps", v: 20, c: "Pied arrière posé sur une chaise, descendre sur la jambe avant. 10 par jambe." },
  chaise: { nom: "Chaise contre le mur", m: "sec", v: 45, c: "Dos au mur, cuisses parallèles au sol, genoux à 90°." },
  pont: { nom: "Pont fessier", m: "reps", v: 15, c: "Allongé sur le dos, pieds au sol, monter le bassin en serrant les fessiers, tenir 1 seconde." },
  mollets: { nom: "Montées sur la pointe des pieds", m: "reps", v: 25, c: "Debout, monter lentement sur la pointe des pieds puis redescendre." },
  planche: { nom: "Planche (gainage)", m: "sec", v: 45, c: "Sur les avant-bras, corps aligné, ventre et fessiers serrés, sans creuser le dos." },
  planche_laterale: { nom: "Gainage latéral", m: "sec", v: 30, c: "Sur un avant-bras, corps aligné de profil. 30 secondes de chaque côté." },
  mountain: { nom: "Mountain climbers", m: "sec", v: 40, c: "En position de pompe, ramener les genoux vers la poitrine en alternance, rapidement." },
  releves: { nom: "Relevés de jambes", m: "reps", v: 12, c: "Allongé sur le dos, mains sous les fesses, monter les jambes tendues à la verticale sans élan." },
  banane: { nom: "Gainage « banane »", m: "sec", v: 30, c: "Sur le dos, bas du dos plaqué au sol, épaules et jambes décollées, bras tendus derrière la tête." },
  velo: { nom: "Crunchs vélo", m: "reps", v: 20, c: "Coude vers le genou opposé, en alternance, sans tirer sur la nuque." },
  burpees: { nom: "Burpees", m: "reps", v: 10, c: "Accroupi, mains au sol, pieds en arrière, pompe, retour accroupi, saut bras en l'air." },
  jumping: { nom: "Jumping jacks", m: "sec", v: 45, c: "Sauter en écartant bras et jambes, puis les ramener." },
  genoux: { nom: "Montées de genoux", m: "sec", v: 40, c: "Course sur place en montant les genoux à hauteur des hanches." },
  patineur: { nom: "Sauts du patineur", m: "reps", v: 20, c: "Sauts latéraux d'une jambe sur l'autre, comme un patineur de vitesse." },
};
const ECHAUFFEMENT = [["Jumping jacks", "1 min"], ["Rotations des bras et des épaules", "30 s"], ["Montées de genoux", "30 s"], ["Squats lents", "10"]];
const RETOUR_CALME = [["Étirement des quadriceps", "30 s par jambe"], ["Étirement des ischio-jambiers", "30 s par jambe"], ["Étirement des pectoraux contre un mur", "30 s"], ["Posture de l'enfant", "45 s"]];
// Thème de la séance selon le jour (lundi = 0)
const SEANCES = [
  { titre: "Haut du corps", exos: ["pompes", "dips", "pompes_pike", "superman", "pompes_diamant", "pompes_declinees"] },
  { titre: "Bas du corps", exos: ["squats", "fentes", "pont", "chaise", "mollets", "fentes_bulgares", "squats_sautes"] },
  { titre: "Gainage", exos: ["planche", "planche_laterale", "releves", "banane", "velo", "mountain", "superman"] },
  { titre: "Corps entier", exos: ["burpees", "pompes", "squats", "planche", "fentes", "mountain"] },
  { titre: "Cardio", exos: ["jumping", "burpees", "genoux", "patineur", "mountain", "squats_sautes"] },
  { titre: "Force (haut et bas)", exos: ["pompes_declinees", "fentes_bulgares", "dips", "pont", "pompes", "chaise"] },
  { titre: "Gainage et souplesse", exos: ["planche", "pont", "banane", "planche_laterale", "superman"] },
];

// ================================================================== COURSE (séances de 30 à 40 minutes)
const COURSES = [
  { titre: "Footing en endurance", duree: "30 min", etapes: ["30 min à allure facile : tu dois pouvoir parler en courant.", "Finis par 5 min de marche et quelques étirements."] },
  { titre: "Fractionné 30/30", duree: "35 min", etapes: ["10 min de footing facile pour s'échauffer.", "2 séries de 8 × (30 s rapide + 30 s en trottinant).", "3 min de trot entre les deux séries.", "5 min de retour au calme en trottinant."] },
  { titre: "Côtes", duree: "35 min", etapes: ["10 min de footing facile jusqu'à une côte.", "8 montées de 45 s à allure soutenue, retour en trottinant dans la descente.", "10 min de footing facile pour rentrer."] },
  { titre: "Fartlek (jeu d'allures)", duree: "30 min", etapes: ["10 min faciles.", "6 × (1 min vite + 2 min lent), en suivant ses sensations.", "2 min de trot pour finir."] },
  { titre: "Progressif", duree: "30 min", etapes: ["10 min lentes.", "10 min à allure moyenne.", "10 min à allure soutenue, sans être à fond.", "Marche et étirements."] },
  { titre: "Pyramide", duree: "35 min", etapes: ["10 min de footing facile.", "Rapide 1 min, 2 min, 3 min, 2 min, 1 min, avec autant de récupération en trottinant après chaque effort.", "8 min de retour au calme."] },
  { titre: "Marche rapide (récupération active)", duree: "40 min", etapes: ["40 min de marche rapide, bras actifs, respiration ample.", "Idéal après une grosse séance ou en cas de fatigue."] },
];

// ================================================================== LECTURE
const LECTURES = [
  "L'Évangile selon saint Marc : le plus court, à lire en 16 jours, un chapitre par jour.",
  "« Histoire d'une âme », de sainte Thérèse de Lisieux.",
  "« Les Confessions », de saint Augustin.",
  "« L'Imitation de Jésus-Christ » : un court chapitre suffit pour la journée.",
  "« Les Misérables », de Victor Hugo.",
  "« Le Comte de Monte-Cristo », d'Alexandre Dumas.",
  "« Vingt mille lieues sous les mers », de Jules Verne.",
  "« L'Origine des espèces », de Charles Darwin (version abrégée).",
  "« Une brève histoire du temps », de Stephen Hawking.",
  "« Sapiens », de Yuval Noah Harari.",
  "« Le Seigneur des anneaux », de J. R. R. Tolkien.",
  "« Les Fiancés », d'Alessandro Manzoni.",
  "« Cyrano de Bergerac », d'Edmond Rostand.",
  "« Introduction à la vie dévote », de saint François de Sales.",
];

// ================================================================== LEÇONS
// m : matière ; t : titre ; x : leçon ; q : question ; r : réponses acceptées ; tol : tolérance numérique
const LECONS = [
  // ---------- culture générale
  { id: "c1", m: "culture", t: "La prise de la Bastille", x: "Le 14 juillet 1789, les Parisiens prennent la forteresse de la Bastille, symbole de l'arbitraire royal. Cette date marque le début de la Révolution française et devient la fête nationale en 1880.", q: "En quelle année a eu lieu la prise de la Bastille ?", r: ["1789"] },
  { id: "c2", m: "culture", t: "Charlemagne", x: "Charlemagne, roi des Francs, est couronné empereur à Rome par le pape Léon III le jour de Noël de l'an 800. Il encourage les écoles et la copie des manuscrits.", q: "En quelle année Charlemagne est-il couronné empereur ?", r: ["800"] },
  { id: "c3", m: "culture", t: "Jeanne d'Arc", x: "En 1429, pendant la guerre de Cent Ans, Jeanne d'Arc délivre Orléans assiégée par les Anglais, puis fait sacrer Charles VII à Reims. Elle est brûlée à Rouen en 1431.", q: "Quelle ville Jeanne d'Arc a-t-elle délivrée en 1429 ?", r: ["Orléans"] },
  { id: "c4", m: "culture", t: "L'imprimerie", x: "Vers 1450, à Mayence, Johannes Gutenberg met au point l'imprimerie à caractères mobiles en métal. Son premier grand ouvrage est une Bible. Les livres deviennent moins chers et les idées circulent plus vite.", q: "Qui a mis au point l'imprimerie à caractères mobiles en Europe ?", r: ["Gutenberg", "Johannes Gutenberg"] },
  { id: "c5", m: "culture", t: "1492", x: "En 1492, Christophe Colomb, financé par les rois d'Espagne, traverse l'Atlantique en cherchant une route vers les Indes. Il atteint les Bahamas le 12 octobre.", q: "Quel navigateur atteint l'Amérique en 1492 ?", r: ["Christophe Colomb", "Colomb"] },
  { id: "c6", m: "culture", t: "Le baptême de Clovis", x: "Clovis, roi des Francs, se fait baptiser à Reims par l'évêque Remi, vers 496-499. Les rois de France seront ensuite sacrés dans la cathédrale de cette ville.", q: "Dans quelle ville Clovis a-t-il été baptisé ?", r: ["Reims"] },
  { id: "c7", m: "culture", t: "L'édit de Nantes", x: "En 1598, le roi Henri IV signe l'édit de Nantes, qui accorde la liberté de culte aux protestants et met fin aux guerres de Religion.", q: "Quel roi a signé l'édit de Nantes ?", r: ["Henri IV", "Henri 4", "Henri quatre"] },
  { id: "c8", m: "culture", t: "Le Roi-Soleil", x: "Louis XIV règne de 1643 à 1715, soit 72 ans : le plus long règne de l'histoire de France. Il fait du château de Versailles le centre du pouvoir.", q: "Combien d'années a duré le règne de Louis XIV ?", r: ["72"] },
  { id: "c9", m: "culture", t: "Napoléon", x: "Napoléon Bonaparte se fait sacrer empereur des Français le 2 décembre 1804 à Notre-Dame de Paris. Il est définitivement battu à Waterloo, en Belgique, en 1815.", q: "Dans quelle bataille Napoléon est-il définitivement vaincu en 1815 ?", r: ["Waterloo"] },
  { id: "c10", m: "culture", t: "L'armistice de 1918", x: "La Première Guerre mondiale se termine par l'armistice signé le 11 novembre 1918 dans un wagon, en forêt de Compiègne. Ce jour est férié en France.", q: "Quel jour de novembre l'armistice de 1918 a-t-il été signé ?", r: ["11", "11 novembre", "onze"] },
  { id: "c11", m: "culture", t: "La fin de la guerre en Europe", x: "L'Allemagne nazie capitule sans condition le 8 mai 1945 : c'est la fin de la Seconde Guerre mondiale en Europe. La guerre continue contre le Japon jusqu'en septembre.", q: "En quelle année s'est terminée la Seconde Guerre mondiale ?", r: ["1945"] },
  { id: "c12", m: "culture", t: "Les premiers pas sur la Lune", x: "Le 21 juillet 1969 (heure française), Neil Armstrong est le premier homme à marcher sur la Lune lors de la mission Apollo 11. Buzz Aldrin le rejoint quelques minutes plus tard.", q: "Qui est le premier homme à avoir marché sur la Lune ?", r: ["Neil Armstrong", "Armstrong"] },
  { id: "c13", m: "culture", t: "Le mur de Berlin", x: "Construit en 1961 pour empêcher les habitants de Berlin-Est de fuir vers l'Ouest, le mur de Berlin tombe le 9 novembre 1989. L'Allemagne est réunifiée l'année suivante.", q: "En quelle année le mur de Berlin est-il tombé ?", r: ["1989"] },
  { id: "c14", m: "culture", t: "La Ve République", x: "La Constitution de la Ve République est adoptée par référendum en 1958, à l'initiative du général de Gaulle, qui en devient le premier président.", q: "En quelle année la Constitution de la Ve République a-t-elle été adoptée ?", r: ["1958"] },
  { id: "c15", m: "culture", t: "La Tour Eiffel", x: "La tour Eiffel a été construite pour l'Exposition universelle de 1889, centenaire de la Révolution. Elle devait être démontée au bout de 20 ans, mais son utilité pour la radio l'a sauvée.", q: "Pour quelle Exposition universelle (année) la tour Eiffel a-t-elle été construite ?", r: ["1889"] },
  { id: "c16", m: "culture", t: "La Joconde", x: "La Joconde a été peinte par Léonard de Vinci au début du XVIe siècle. Le tableau est conservé au musée du Louvre, à Paris.", q: "Dans quel musée la Joconde est-elle exposée ?", r: ["Louvre", "musée du Louvre"] },
  { id: "c17", m: "culture", t: "Victor Hugo", x: "Victor Hugo publie « Les Misérables » en 1862, alors qu'il est en exil à Guernesey. Le roman suit Jean Valjean, ancien bagnard, poursuivi par l'inspecteur Javert.", q: "Quel est le prénom du héros des Misérables, Valjean ?", r: ["Jean"] },
  { id: "c18", m: "culture", t: "Molière", x: "Molière est le nom de scène de Jean-Baptiste Poquelin (1622-1673), auteur de « L'Avare », « Le Misanthrope » ou « Le Malade imaginaire ». On appelle le français « la langue de Molière ».", q: "Quel est le vrai nom de famille de Molière ?", r: ["Poquelin", "Jean-Baptiste Poquelin"] },
  { id: "c19", m: "culture", t: "Le plus grand océan", x: "L'océan Pacifique couvre environ un tiers de la surface de la Terre : c'est le plus grand et le plus profond des océans. La fosse des Mariannes y dépasse 10 900 m de profondeur.", q: "Quel est le plus grand océan du monde ?", r: ["Pacifique", "océan Pacifique"] },
  { id: "c20", m: "culture", t: "La capitale de l'Australie", x: "Contrairement à une idée répandue, la capitale de l'Australie n'est ni Sydney ni Melbourne, mais Canberra, ville construite au début du XXe siècle pour départager les deux rivales.", q: "Quelle est la capitale de l'Australie ?", r: ["Canberra"] },
  { id: "c21", m: "culture", t: "Le plus long fleuve de France", x: "La Loire est le plus long fleuve de France, avec environ 1 000 km. Elle prend sa source au mont Gerbier-de-Jonc, en Ardèche, et se jette dans l'Atlantique à Saint-Nazaire.", q: "Quel est le plus long fleuve de France ?", r: ["Loire", "la Loire"] },
  { id: "c22", m: "culture", t: "Le Mont-Blanc", x: "Le Mont-Blanc, à la frontière franco-italienne, culmine à environ 4 805 m. C'est le plus haut sommet des Alpes et de l'Europe occidentale.", q: "Quel est le plus haut sommet des Alpes ?", r: ["Mont-Blanc", "Mont Blanc"] },
  { id: "c23", m: "culture", t: "L'hymne européen", x: "L'hymne de l'Union européenne reprend l'« Ode à la joie », dernier mouvement de la 9e symphonie de Ludwig van Beethoven, composée alors qu'il était presque sourd.", q: "Quel compositeur a écrit l'Ode à la joie ?", r: ["Beethoven", "Ludwig van Beethoven"] },
  { id: "c24", m: "culture", t: "L'euro", x: "Les pièces et billets en euros ont été mis en circulation le 1er janvier 2002. En France, 1 euro valait 6,55957 francs.", q: "En quelle année les billets en euros ont-ils été mis en circulation ?", r: ["2002"] },
  { id: "c25", m: "culture", t: "Le Sahara", x: "Le Sahara est le plus grand désert chaud du monde, avec plus de 9 millions de km², presque la taille des États-Unis. (Les deux plus grands déserts au sens strict sont froids : l'Antarctique et l'Arctique.)", q: "Quel est le plus grand désert chaud du monde ?", r: ["Sahara", "le Sahara"] },
  { id: "c26", m: "culture", t: "Guernica", x: "« Guernica » est une immense toile peinte par Pablo Picasso en 1937, après le bombardement de cette ville basque pendant la guerre d'Espagne. Elle est exposée à Madrid.", q: "Quel peintre a réalisé Guernica ?", r: ["Picasso", "Pablo Picasso"] },
  { id: "c27", m: "culture", t: "La capitale du Canada", x: "La capitale du Canada est Ottawa, en Ontario, et non Toronto ni Montréal. La reine Victoria l'a choisie en 1857.", q: "Quelle est la capitale du Canada ?", r: ["Ottawa"] },

  // ---------- français
  { id: "f1", m: "francais", t: "Le participe passé avec avoir", x: "Avec l'auxiliaire avoir, le participe passé s'accorde avec le complément d'objet direct (COD) seulement s'il est placé avant le verbe. « J'ai cueilli des fleurs » mais « les fleurs que j'ai cueillies ».", q: "Complète : « Les lettres que j'ai (écrire) … »", r: ["écrites"] },
  { id: "f2", m: "francais", t: "Quand ou quant ?", x: "« Quand » indique le temps (quand viendras-tu ?). « Quant » s'emploie toujours dans « quant à », qui signifie « en ce qui concerne ».", q: "Complète : « … à moi, je reste ici. »", r: ["Quant"] },
  { id: "f3", m: "francais", t: "Le futur de courir et mourir", x: "Courir, mourir et acquérir prennent deux r au futur et au conditionnel : je courrai, il mourra, nous acquerrons. On entend bien les deux r en prononçant.", q: "Conjugue « courir » au futur avec « je ».", r: ["courrai", "je courrai"] },
  { id: "f4", m: "francais", t: "Le subjonctif de faire", x: "Le subjonctif présent de faire est irrégulier : que je fasse, que tu fasses, qu'il fasse, que nous fassions, que vous fassiez, qu'ils fassent.", q: "Complète : « Il faut que tu (faire) … tes devoirs. »", r: ["fasses"] },
  { id: "f5", m: "francais", t: "Le passé simple de venir", x: "Venir et tenir ont un passé simple en -in : je vins, tu vins, il vint, nous vînmes, vous vîntes, ils vinrent.", q: "Conjugue « venir » au passé simple avec « ils ».", r: ["vinrent", "ils vinrent"] },
  { id: "f6", m: "francais", t: "Appeler et jeter", x: "Appeler et jeter doublent leur consonne devant un e muet : j'appelle, ils jettent ; mais nous appelons, vous jetez.", q: "Conjugue « appeler » au présent avec « ils ».", r: ["appellent", "ils appellent"] },
  { id: "f7", m: "francais", t: "Les pluriels en -oux", x: "Sept noms en -ou prennent un x au pluriel : bijou, caillou, chou, genou, hibou, joujou, pou. Les autres prennent un s : des clous, des trous.", q: "Quel est le pluriel de « genou » ?", r: ["genoux", "des genoux"] },
  { id: "f8", m: "francais", t: "Les pluriels en -al", x: "La plupart des noms en -al font leur pluriel en -aux (un cheval, des chevaux), sauf quelques-uns qui prennent un s : bal, carnaval, chacal, festival, récital, régal.", q: "Quel est le pluriel de « festival » ?", r: ["festivals", "des festivals"] },
  { id: "f9", m: "francais", t: "Vingt et cent", x: "Vingt et cent prennent un s quand ils sont multipliés et terminent le nombre : quatre-vingts, deux cents. Mais quatre-vingt-trois, deux cent dix.", q: "Écris en lettres le nombre 300.", r: ["trois cents", "trois-cents"] },
  { id: "f10", m: "francais", t: "Demi", x: "« Demi » placé avant le nom est invariable et suivi d'un trait d'union : une demi-heure. Placé après, il s'accorde en genre : une heure et demie.", q: "Complète : « Il est midi et … »", r: ["demi"] },
  { id: "f11", m: "francais", t: "Leur ou leurs ?", x: "Devant un verbe, « leur » est un pronom (= à eux) et ne prend jamais de s : je leur parle. Devant un nom pluriel, le déterminant prend un s : leurs enfants.", q: "Complète : « Je … ai donné un livre » (à eux).", r: ["leur"] },
  { id: "f12", m: "francais", t: "Tout", x: "« Tout » adverbe (= tout à fait) est invariable, sauf devant un adjectif féminin commençant par une consonne ou un h aspiré : ils sont tout contents, elles sont toutes contentes.", q: "Complète : « Elles sont … surprises. »", r: ["toutes"] },
  { id: "f13", m: "francais", t: "Les verbes pronominaux", x: "Dans « elle s'est lavée », le participe s'accorde avec le COD « s' ». Mais dans « elle s'est lavé les mains », le COD est « les mains », placé après : pas d'accord.", q: "Complète : « Elle s'est (laver) … les mains. »", r: ["lavé"] },
  { id: "f14", m: "francais", t: "Le palindrome", x: "Un palindrome est un mot ou une phrase qui se lit de la même façon dans les deux sens : kayak, radar, « Ésope reste ici et se repose ».", q: "Comment appelle-t-on un mot qui se lit dans les deux sens, comme « radar » ?", r: ["palindrome", "un palindrome"] },
  { id: "f15", m: "francais", t: "L'oxymore", x: "L'oxymore rapproche deux mots de sens opposés : « cette obscure clarté qui tombe des étoiles » (Corneille), « un silence assourdissant ».", q: "Quelle figure de style rapproche deux mots opposés, comme « obscure clarté » ?", r: ["oxymore", "un oxymore", "oxymoron"] },
  { id: "f16", m: "francais", t: "Éphémère", x: "Est éphémère ce qui ne dure qu'un temps très court. Le mot vient du grec « hêmera », le jour : l'éphémère est un insecte qui ne vit qu'un jour à l'âge adulte.", q: "Donne un synonyme d'« éphémère ».", r: ["passager", "bref", "fugace", "court", "temporaire", "provisoire", "momentané", "fugitif", "transitoire"] },
  { id: "f17", m: "francais", t: "Altruiste", x: "Une personne altruiste se soucie des autres et agit pour leur bien, sans intérêt personnel. Son contraire est l'égoïste, qui ne pense qu'à lui.", q: "Quel est le contraire d'« altruiste » ?", r: ["égoïste", "egocentrique", "égocentrique", "individualiste"] },
  { id: "f18", m: "francais", t: "L'impératif d'aller", x: "À l'impératif, « aller » s'écrit « va » sans s. Mais on ajoute un s devant « y » pour faciliter la prononciation : vas-y.", q: "Complète l'ordre : « … chercher le pain ! » (aller, 2e personne du singulier)", r: ["va"] },
  { id: "f19", m: "francais", t: "Ces, ses, c'est", x: "« Ces » montre (ces livres-là), « ses » indique la possession (ses livres à lui), « c'est » = cela est.", q: "Complète : « Il a perdu … clés » (les siennes).", r: ["ses"] },
  { id: "f20", m: "francais", t: "L'œil", x: "Le pluriel d'œil est yeux. On dit pourtant « des œils-de-bœuf » pour les fenêtres rondes, et « des œils-de-chat » pour certaines pierres.", q: "Quel est le pluriel de « œil » ?", r: ["yeux", "des yeux"] },
  { id: "f21", m: "francais", t: "Bonhomme", x: "Dans « bonhomme », les deux éléments s'accordent au pluriel : des bonshommes. De même : des messieurs, des mesdames, des gentilshommes.", q: "Quel est le pluriel de « bonhomme » ?", r: ["bonshommes", "des bonshommes"] },
  { id: "f22", m: "francais", t: "Un pléonasme", x: "Le pléonasme répète une idée inutilement : « monter en haut », « descendre en bas », « prévoir à l'avance ». Il est en général à éviter.", q: "Comment s'appelle une répétition inutile comme « monter en haut » ?", r: ["pléonasme", "un pléonasme"] },
  { id: "f23", m: "francais", t: "Le passé simple d'être", x: "Être au passé simple : je fus, tu fus, il fut, nous fûmes, vous fûtes, ils furent. À ne pas confondre avec le subjonctif imparfait « qu'il fût ».", q: "Conjugue « être » au passé simple avec « nous ».", r: ["fûmes", "nous fûmes"] },
  { id: "f24", m: "francais", t: "Résoudre", x: "Au présent, résoudre fait : je résous, tu résous, il résout, nous résolvons, vous résolvez, ils résolvent. Son participe passé est « résolu ».", q: "Conjugue « résoudre » au présent avec « il ».", r: ["résout", "il résout"] },
  { id: "f25", m: "francais", t: "Ou et où", x: "« Ou » sans accent marque un choix (= ou bien). « Où » avec accent indique un lieu ou un moment : où vas-tu ? le jour où il est venu.", q: "Complète : « La ville … je suis né. »", r: ["où"] },

  // ---------- sciences
  { id: "s1", m: "sciences", t: "La vitesse de la lumière", x: "Dans le vide, la lumière parcourt environ 300 000 km par seconde (exactement 299 792,458 km/s). Elle met environ 8 minutes à nous parvenir du Soleil.", q: "Combien de minutes la lumière du Soleil met-elle environ pour atteindre la Terre ?", r: ["8"], tol: 0.5 },
  { id: "s2", m: "sciences", t: "Le newton", x: "En physique, une force se mesure en newtons (N), en hommage à Isaac Newton. Sur Terre, un objet de 1 kg pèse environ 9,8 N.", q: "Quelle est l'unité de mesure d'une force ?", r: ["newton", "newtons", "N"] },
  { id: "s3", m: "sciences", t: "La loi d'Ohm", x: "La loi d'Ohm relie tension, résistance et intensité : U = R × I. La tension U est en volts, la résistance R en ohms, l'intensité I en ampères. Donc I = U ÷ R.", q: "Une résistance de 4 ohms est soumise à 12 volts. Quelle est l'intensité, en ampères ?", r: ["3"] },
  { id: "s4", m: "sciences", t: "Le zéro absolu", x: "Le zéro absolu, la température la plus basse possible, vaut 0 kelvin, soit −273,15 °C. À cette température, l'agitation des particules est minimale.", q: "À combien de degrés Celsius correspond le zéro absolu (arrondi à l'unité) ?", r: ["-273"], tol: 0.2 },
  { id: "s5", m: "sciences", t: "Le son et le vide", x: "Le son est une vibration qui se propage dans la matière (air, eau, solides). Dans le vide de l'espace, il n'y a rien pour la transmettre : aucun son ne peut s'y propager.", q: "Le son se propage-t-il dans le vide ? (oui ou non)", r: ["non"] },
  { id: "s6", m: "sciences", t: "E = mc²", x: "Dans la célèbre formule d'Einstein E = mc², E est l'énergie, m la masse et c la vitesse de la lumière. Une toute petite masse correspond à une énergie énorme.", q: "Dans E = mc², que représente la lettre c ?", r: ["vitesse de la lumière", "la vitesse de la lumière", "célérité de la lumière", "la lumière"] },
  { id: "s7", m: "sciences", t: "La pesanteur", x: "Sur Terre, un objet qui tombe sans frottement accélère d'environ 9,81 m/s² : c'est l'intensité de la pesanteur, notée g. Sur la Lune, elle est environ six fois plus faible.", q: "Combien de fois la pesanteur est-elle plus faible sur la Lune que sur Terre (environ) ?", r: ["6"], tol: 0.3 },
  { id: "s8", m: "sciences", t: "L'eau", x: "La molécule d'eau, H₂O, est formée de deux atomes d'hydrogène et d'un atome d'oxygène. Au niveau de la mer, l'eau pure bout à 100 °C.", q: "Combien d'atomes d'hydrogène contient une molécule d'eau ?", r: ["2", "deux"] },
  { id: "s9", m: "sciences", t: "Le symbole du sodium", x: "Dans le tableau périodique, le sodium a pour symbole Na, de son nom latin « natrium ». Le sel de cuisine est du chlorure de sodium, NaCl.", q: "Quel est le symbole chimique du sodium ?", r: ["Na"] },
  { id: "s10", m: "sciences", t: "Le symbole de l'or", x: "L'or a pour symbole Au, du latin « aurum ». C'est un métal très peu réactif : il ne rouille pas, ce qui explique qu'on retrouve des bijoux intacts après des millénaires.", q: "Quel est le symbole chimique de l'or ?", r: ["Au"] },
  { id: "s11", m: "sciences", t: "Le pH", x: "Le pH mesure l'acidité d'une solution, sur une échelle de 0 à 14. Un pH de 7 est neutre (eau pure), en dessous c'est acide (citron, environ 2), au-dessus c'est basique (savon).", q: "Quelle est la valeur du pH d'une solution neutre ?", r: ["7"] },
  { id: "s12", m: "sciences", t: "L'air que l'on respire", x: "L'air est composé d'environ 78 % de diazote, 21 % de dioxygène et 1 % d'autres gaz, dont l'argon et le dioxyde de carbone.", q: "Quel gaz est le plus abondant dans l'air ?", r: ["azote", "diazote", "N2"] },
  { id: "s13", m: "sciences", t: "Le numéro atomique", x: "Le numéro atomique d'un élément est le nombre de protons dans son noyau. L'hydrogène a 1 proton, le carbone 6, l'oxygène 8.", q: "Quel est le numéro atomique du carbone ?", r: ["6"] },
  { id: "s14", m: "sciences", t: "Le tableau périodique", x: "En 1869, le chimiste russe Dmitri Mendeleïev classe les éléments chimiques par masse et par propriétés, et laisse des cases vides pour des éléments encore inconnus, qui seront découverts ensuite.", q: "Quel chimiste russe a créé le tableau périodique des éléments ?", r: ["Mendeleïev", "Mendeleiev", "Dmitri Mendeleïev"] },
  { id: "s15", m: "sciences", t: "Les chromosomes", x: "Chaque cellule humaine (sauf les ovules et les spermatozoïdes) contient 46 chromosomes, répartis en 23 paires. Ils portent notre ADN.", q: "Combien de chromosomes contient une cellule humaine ordinaire ?", r: ["46"] },
  { id: "s16", m: "sciences", t: "La photosynthèse", x: "Grâce à la lumière, les plantes fabriquent du sucre à partir de dioxyde de carbone et d'eau, et rejettent du dioxygène. C'est la photosynthèse, qui a lieu dans les chloroplastes.", q: "Quel gaz les plantes rejettent-elles pendant la photosynthèse ?", r: ["oxygène", "dioxygène", "O2"] },
  { id: "s17", m: "sciences", t: "La mitochondrie", x: "La mitochondrie est la « centrale énergétique » de la cellule : elle utilise l'oxygène pour transformer le sucre en énergie utilisable.", q: "Quel organite est la centrale énergétique de la cellule ?", r: ["mitochondrie", "la mitochondrie", "mitochondries"] },
  { id: "s18", m: "sciences", t: "L'ADN", x: "L'ADN a la forme d'une double hélice, découverte en 1953 par James Watson et Francis Crick, grâce aux images de Rosalind Franklin.", q: "Quelle forme a la molécule d'ADN ? (deux mots)", r: ["double hélice", "une double hélice"] },
  { id: "s19", m: "sciences", t: "La fin des dinosaures", x: "Les dinosaures non aviens ont disparu il y a environ 66 millions d'années, à la fin du Crétacé, probablement après la chute d'un astéroïde au Mexique (cratère de Chicxulub). Les oiseaux sont leurs descendants.", q: "Il y a combien de millions d'années les dinosaures non aviens ont-ils disparu ?", r: ["66"], tol: 1 },
  { id: "s20", m: "sciences", t: "Le Tyrannosaure", x: "Tyrannosaurus rex a vécu à la toute fin du Crétacé, il y a 68 à 66 millions d'années, en Amérique du Nord. Il est donc plus proche de nous dans le temps que du Stégosaure, qui vivait au Jurassique.", q: "À quelle période géologique vivait le Tyrannosaure ?", r: ["Crétacé", "le Crétacé"] },
  { id: "s21", m: "sciences", t: "Archaeopteryx", x: "Archaeopteryx, découvert en Allemagne en 1861, vivait au Jurassique. Avec ses plumes, ses dents et sa longue queue osseuse, il montre le lien entre dinosaures et oiseaux.", q: "Quel animal fossile montre le lien entre dinosaures et oiseaux (découvert en 1861) ?", r: ["Archaeopteryx", "Archéoptéryx", "archeopteryx"] },
  { id: "s22", m: "sciences", t: "Lucy", x: "Lucy est un squelette d'australopithèque découvert en 1974 en Éthiopie. Elle a vécu il y a environ 3,2 millions d'années et marchait déjà sur deux jambes.", q: "Dans quel pays Lucy a-t-elle été découverte ?", r: ["Éthiopie", "Ethiopie"] },
  { id: "s23", m: "sciences", t: "Les plus anciens Homo sapiens", x: "Les plus anciens fossiles connus d'Homo sapiens, découverts à Jebel Irhoud au Maroc, ont environ 300 000 ans.", q: "Dans quel pays ont été trouvés les plus anciens fossiles connus d'Homo sapiens ?", r: ["Maroc"] },
  { id: "s24", m: "sciences", t: "La Pangée", x: "Il y a environ 300 millions d'années, les continents étaient réunis en un seul supercontinent, la Pangée, entouré d'un océan unique. Il s'est fragmenté à partir de 200 millions d'années.", q: "Comment s'appelle le supercontinent qui réunissait toutes les terres ?", r: ["Pangée", "la Pangée", "Pangea"] },
  { id: "s25", m: "sciences", t: "Les trilobites", x: "Les trilobites sont des arthropodes marins apparus il y a plus de 520 millions d'années. Ils ont disparu à la fin du Paléozoïque (ère primaire), il y a 252 millions d'années.", q: "Les trilobites vivaient-ils dans la mer ou sur terre ?", r: ["mer", "dans la mer", "océan", "la mer"] },
  { id: "s26", m: "sciences", t: "Le carbone 14", x: "Le carbone 14 permet de dater des restes organiques (os, bois, charbon) jusqu'à environ 50 000 ans. Au-delà, il en reste trop peu : on utilise d'autres méthodes pour les fossiles de dinosaures.", q: "Jusqu'à combien d'années environ peut-on dater avec le carbone 14 ?", r: ["50000"], tol: 5000 },
  { id: "s27", m: "sciences", t: "La plus grosse planète", x: "Jupiter est la plus grosse planète du Système solaire : on pourrait y loger plus de 1 300 Terres. C'est une géante gazeuse, surtout faite d'hydrogène et d'hélium.", q: "Quelle est la plus grosse planète du Système solaire ?", r: ["Jupiter"] },
  { id: "s28", m: "sciences", t: "L'âge de la Terre", x: "La Terre s'est formée il y a environ 4,5 milliards d'années, en même temps que le reste du Système solaire.", q: "Quel âge a la Terre, en milliards d'années (environ) ?", r: ["4.5", "4,5"], tol: 0.1 },
  { id: "s29", m: "sciences", t: "La planète la plus proche du Soleil", x: "Mercure est la planète la plus proche du Soleil et la plus petite du Système solaire. Elle fait le tour du Soleil en 88 jours.", q: "Quelle est la planète la plus proche du Soleil ?", r: ["Mercure"] },
  { id: "s30", m: "sciences", t: "La distance de la Lune", x: "La Lune est en moyenne à 384 400 km de la Terre. La lumière met un peu plus d'une seconde pour faire ce trajet.", q: "À environ combien de milliers de km la Lune se trouve-t-elle ? (ex. : 384)", r: ["384"], tol: 6 },
  { id: "s31", m: "sciences", t: "Le noyau de la Terre", x: "Le noyau terrestre est surtout composé de fer, avec un peu de nickel. Le noyau externe est liquide : ses mouvements créent le champ magnétique terrestre.", q: "Quel métal compose principalement le noyau de la Terre ?", r: ["fer", "le fer"] },
  { id: "s32", m: "sciences", t: "Marie Curie", x: "Marie Curie est la première personne à avoir reçu deux prix Nobel : en physique (1903) pour la radioactivité, et en chimie (1911) pour la découverte du polonium et du radium.", q: "Combien de prix Nobel Marie Curie a-t-elle reçus ?", r: ["2", "deux"] },

  // ---------- logique
  { id: "l1", m: "logique", t: "Les machines", x: "Raisonne par machine : regarde combien de temps met une seule machine pour fabriquer un objet.", q: "5 machines fabriquent 5 objets en 5 minutes. Combien de minutes faut-il à 100 machines pour fabriquer 100 objets ?", r: ["5"] },
  { id: "l2", m: "logique", t: "La batte et la balle", x: "Méfie-toi de la première réponse qui vient à l'esprit : pose l'équation. Si la balle coûte x, la batte coûte x + 1 €.", q: "Une batte et une balle coûtent 1,10 € en tout. La batte coûte 1 € de plus que la balle. Combien coûte la balle, en centimes ?", r: ["5"] },
  { id: "l3", m: "logique", t: "Les nénuphars", x: "Quand une quantité double chaque jour, la veille elle valait la moitié.", q: "Des nénuphars doublent de surface chaque jour et couvrent tout le lac en 48 jours. En combien de jours couvrent-ils la moitié du lac ?", r: ["47"] },
  { id: "l4", m: "logique", t: "Les mois", x: "Lis la question mot à mot : on ne demande pas « seulement 28 jours ».", q: "Combien de mois de l'année ont 28 jours ?", r: ["12", "douze"] },
  { id: "l5", m: "logique", t: "La course", x: "Imagine la situation : tu prends la place de celui que tu dépasses.", q: "Dans une course, tu doubles le deuxième. À quelle place es-tu maintenant ? (un nombre)", r: ["2", "deuxième", "2e"] },
  { id: "l6", m: "logique", t: "Les chaussettes", x: "Pense au pire des cas : chaque chaussette tirée pourrait être d'une couleur différente.", q: "Un tiroir contient des chaussettes noires et blanches mélangées. Combien faut-il en prendre, dans le noir, pour être sûr d'avoir une paire de la même couleur ?", r: ["3", "trois"] },
  { id: "l7", m: "logique", t: "Les poignées de main", x: "Chaque personne serre la main de toutes les autres une fois : n personnes donnent n × (n − 1) ÷ 2 poignées de main.", q: "6 personnes se serrent toutes la main une fois. Combien y a-t-il de poignées de main ?", r: ["15", "quinze"] },
  { id: "l8", m: "logique", t: "L'âge du père", x: "Écris les deux âges : le père a 4 fois l'âge du fils aujourd'hui. Dans 20 ans, il n'en aura plus que le double.", q: "Un père a 4 fois l'âge de son fils. Dans 20 ans, il aura le double de son âge. Quel âge a le fils aujourd'hui ?", r: ["10", "dix"] },
];

const MATIERES = {
  culture: "Culture générale", francais: "Français", sciences: "Sciences", logique: "Logique", calcul: "Calcul mental",
};

// Calcul mental : questions générées sans fin, à partir d'une graine
function genererCalcul(graine) {
  let s = graine >>> 0;
  const r = (a, b) => { s = (Math.imul(s ^ (s >>> 15), 2246822507) + 0x9E3779B9) >>> 0; return a + (s % (b - a + 1)); };
  const types = [
    () => { const a = r(13, 49), b = r(3, 9); return { t: "Multiplier de tête", x: "Astuce : décompose le grand nombre. " + a + " × " + b + " = (" + (a - a % 10) + " × " + b + ") + (" + (a % 10) + " × " + b + ").", q: a + " × " + b + " = ?", r: [String(a * b)] }; },
    () => { const p = [10, 15, 20, 25, 30, 40, 50, 75][r(0, 7)], n = r(2, 24) * 20; return { t: "Pourcentage", x: "Astuce : 10 % = diviser par 10 ; 5 % = la moitié de 10 % ; 25 % = le quart.", q: p + " % de " + n + " = ?", r: [String(p * n / 100)] }; },
    () => { const b = r(6, 15), q = r(12, 35); return { t: "Division", x: "Astuce : cherche le multiple de " + b + " le plus proche, puis complète.", q: (b * q) + " ÷ " + b + " = ?", r: [String(q)] }; },
    () => { const a = r(11, 25); return { t: "Carré", x: "Astuce : (a + b)² = a² + 2ab + b². Par exemple 13² = 100 + 60 + 9 = 169.", q: a + "² = ?", r: [String(a * a)] }; },
    () => { const a = r(120, 899), b = r(110, 799); return { t: "Addition", x: "Astuce : ajoute d'abord les centaines, puis les dizaines, puis les unités.", q: a + " + " + b + " = ?", r: [String(a + b)] }; },
    () => { const b = r(120, 499), a = b + r(110, 499); return { t: "Soustraction", x: "Astuce : complète jusqu'à la centaine supérieure, puis ajoute le reste.", q: a + " − " + b + " = ?", r: [String(a - b)] }; },
    () => { const d = r(2, 9), u = r(3, 9), k = r(2, 6); return { t: "Fraction d'un nombre", x: "Pour prendre les " + k + "/" + d + " d'un nombre : divise par " + d + ", puis multiplie par " + k + ".", q: k + "/" + d + " de " + (d * u * 4) + " = ?", r: [String(k * u * 4)] }; },
    () => { const v = [60, 80, 90, 100, 120][r(0, 4)], h = [1.5, 2, 2.5, 3][r(0, 3)]; return { t: "Vitesse et distance", x: "Distance = vitesse × durée. 1 h 30 = 1,5 h ; 2 h 30 = 2,5 h.", q: "À " + v + " km/h pendant " + String(h).replace(".", ",") + " h, combien de km parcourt-on ?", r: [String(v * h)] }; },
    () => { const a = r(1, 9), d = r(3, 9); const suite = [a, a + d, a + 2 * d, a + 3 * d]; return { t: "Suite logique", x: "Cherche ce qui change d'un nombre au suivant : on ajoute toujours la même valeur.", q: "Quel nombre vient ensuite : " + suite.join(", ") + ", … ?", r: [String(a + 4 * d)] }; },
    () => { const a = r(1, 4), k = r(2, 3); const suite = [a, a * k, a * k * k, a * k * k * k]; return { t: "Suite logique", x: "Ici, on multiplie toujours par le même nombre.", q: "Quel nombre vient ensuite : " + suite.join(", ") + ", … ?", r: [String(a * k ** 4)] }; },
    () => { const h = r(2, 5), m = [15, 30, 45][r(0, 2)]; return { t: "Conversion de durées", x: "1 heure = 60 minutes. Multiplie les heures par 60, puis ajoute les minutes.", q: h + " h " + m + " = combien de minutes ?", r: [String(h * 60 + m)] }; },
  ];
  const l = types[r(0, types.length - 1)]();
  l.m = "calcul";
  l.id = "calc:" + graine;
  return l;
}
