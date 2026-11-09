"use strict";
/* Mes Quêtes 2 — quêtes quotidiennes façon jeu de rôle, avec propositions du jour,
   leçons validées par la bonne réponse et perte de niveau quand la série est rompue.
   Les contenus (prières, séances, leçons…) sont dans contenu.js. Données gardées sur l'appareil. */

// ------------------------------------------------------------------ constantes
const CLE = "mesquetes.v1";
const VERSION_DONNEES = 2;
const CATS = {
  force: { nom: "Force", c: "var(--force)", f: "var(--force-f)", aide: "Sport, exercices" },
  savoir: { nom: "Savoir", c: "var(--savoir)", f: "var(--savoir-f)", aide: "Leçons, lecture" },
  esprit: { nom: "Esprit", c: "var(--esprit)", f: "var(--esprit-f)", aide: "Prière, chapelet" },
  vitalite: { nom: "Vitalité", c: "var(--vitalite)", f: "var(--vitalite-f)", aide: "Sommeil, eau, repas" },
  discipline: { nom: "Discipline", c: "var(--discipline)", f: "var(--discipline-f)", aide: "Habitudes, rangement, écrans" },
};
const MOMENTS = { matin: "Matin", journee: "Journée", soir: "Soir", libre: "À tout moment" };
const CONTENUS = {
  "": "Aucune", priere_matin: "Prière du matin", priere_soir: "Prière du soir", chapelet: "Chapelet", exercices: "Séance d'exercices",
  course: "Séance de course", lecture: "Idée de lecture", lecon: "Leçons à réussir",
};
const JOURS_COURTS = ["L", "M", "M", "J", "V", "S", "D"];
const JOURS_NOMS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const XP_CHOIX = [10, 20, 30, 40, 50, 60, 80, 100];
const BONUS_COFFRE = 100;
const ESSAIS_LECON = 3;

const ICONES = {
  soleil: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  lune: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
  bougie: '<path d="M9 10h6v11H9zM12 10V8M12 8c-1.3-1-1.3-2.6 0-4.2 1.3 1.6 1.3 3.2 0 4.2z"/>',
  croix: '<path d="M12 3v18M7 8h10"/>',
  chapelet: '<circle cx="12" cy="9" r="6"/><circle cx="12" cy="3" r="1"/><circle cx="6" cy="9" r="1"/><circle cx="18" cy="9" r="1"/><path d="M12 15v6M10 18h4"/>',
  livre_ouvert: '<path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/>',
  livre: '<path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3zM4 17a3 3 0 0 1 3-3h11"/>',
  crayon: '<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
  eclair: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  haltere: '<path d="M6 7v10M18 7v10M3 10v4M21 10v4M6 12h12"/>',
  goutte: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  pomme: '<path d="M12 7c-2-1.5-6-1-6 4 0 4 3 9 6 7 3 2 6-3 6-7 0-5-4-5.5-6-4zM12 7c0-2 1-3 3-4"/>',
  lit: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11.5" r="1.5"/>',
  coeur: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  feuille: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15M5 19l7-7"/>',
  musique: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  cible: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6"/>',
  horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  etoile: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  flacon: '<path d="M9 3h6M10 3v6L5 19a1.5 1.5 0 0 0 1.4 2h11.2a1.5 1.5 0 0 0 1.4-2l-5-10V3M7.5 15h9"/>',
  // icônes d'interface
  coche: '<path d="M5 12l5 5 9-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  moins: '<path d="M5 12h14"/>',
  croixFermer: '<path d="M6 6l12 12M18 6 6 18"/>',
  epee: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  bouclier: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/>',
  bouclierOk: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  bouclierBrise: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="M12 6l-2 5 3 2-2 5"/>',
  calendrier: '<path d="M8 2v4M16 2v4M3 9h18M5 5h14v16H5z"/>',
  reglages: '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2.5"/><circle cx="15" cy="17" r="2.5"/>',
  coffre: '<path d="M3 10h18v10H3zM3 10l2-5h14l2 5M12 10v10M10 14h4"/>',
  cadenas: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  gauche: '<path d="M15 5l-7 7 7 7"/>',
  droite: '<path d="M9 5l7 7-7 7"/>',
  haut: '<path d="M6 15l6-6 6 6"/>',
  modifier: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  des: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/>',
  lecture: '<path d="M8 5v14l11-7z"/>',
  calcul: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2"/>',
};
const ICONES_QUETE = ["soleil", "lune", "croix", "chapelet", "bougie", "livre_ouvert", "livre", "crayon", "eclair", "haltere", "goutte", "pomme",
  "lit", "coeur", "feuille", "musique", "cible", "horloge", "etoile", "flacon"];

const TITRES = [[1, "Novice"], [3, "Apprenti"], [5, "Apprenti assidu"], [8, "Érudit discipliné"], [10, "Compagnon"], [13, "Aventurier aguerri"],
  [16, "Chevalier du quotidien"], [20, "Maître de soi"], [25, "Sage"], [30, "Légende"], [40, "Mythe vivant"]];

const SURPRISES = [
  ["Appeler un proche pour prendre de ses nouvelles", "coeur", "esprit", 30],
  ["Ranger un tiroir ou une étagère", "cible", "discipline", 30],
  ["10 minutes de silence devant Dieu", "bougie", "esprit", 30],
  ["Écrire trois choses pour lesquelles je rends grâce", "crayon", "esprit", 25],
  ["Pas de réseaux sociaux avant midi", "horloge", "discipline", 40],
  ["Apprendre 10 mots d'une langue étrangère", "livre_ouvert", "savoir", 30],
  ["Faire un compliment sincère à quelqu'un", "coeur", "esprit", 25],
  ["Cuisiner un repas maison", "pomme", "vitalite", 35],
  ["Se coucher avant 23 h", "lit", "vitalite", 35],
  ["10 minutes d'étirements", "haltere", "force", 30],
  ["Donner ou jeter 10 objets inutiles", "cible", "discipline", 35],
  ["Lire un article de fond jusqu'au bout", "livre", "savoir", 25],
  ["Rendre service à quelqu'un sans qu'il le demande", "coeur", "esprit", 35],
  ["Prendre l'escalier toute la journée", "eclair", "force", 25],
  ["Planifier la journée de demain", "calendrier", "discipline", 25],
  ["Sortir prendre l'air 15 minutes", "feuille", "vitalite", 25],
  ["2 minutes de gainage", "haltere", "force", 30],
  ["Réviser une leçon passée", "livre_ouvert", "savoir", 30],
  ["Ranger mon bureau", "cible", "discipline", 25],
  ["Envoyer un message d'encouragement", "coeur", "esprit", 25],
  ["Apprendre par cœur un verset de la Bible", "croix", "esprit", 30],
  ["Un repas sans écran", "pomme", "discipline", 25],
  ["Lire l'Évangile du jour", "croix", "esprit", 25],
  ["Marcher 20 minutes après un repas", "eclair", "force", 30],
  ["Écrire une page de journal", "crayon", "savoir", 30],
];

const HAUTS_FAITS = [
  { id: "premier", nom: "Premier pas", desc: "1re quête accomplie", ic: "etoile", v: s => s.quetes, max: 1 },
  { id: "parfait", nom: "Journée parfaite", desc: "Toutes les quêtes du jour", ic: "cible", v: s => s.parfaits, max: 1 },
  { id: "invaincu", nom: "Invaincu", desc: "7 jours réussis de suite", ic: "bouclierOk", v: s => s.record, max: 7 },
  { id: "inebranlable", nom: "Inébranlable", desc: "30 jours réussis de suite", ic: "bouclierOk", v: s => s.record, max: 30 },
  { id: "indomptable", nom: "Indomptable", desc: "100 jours réussis de suite", ic: "bouclierOk", v: s => s.record, max: 100 },
  { id: "semaine", nom: "Semaine parfaite", desc: "7 journées parfaites de suite", ic: "cible", v: s => s.recordParfait, max: 7 },
  { id: "eleve", nom: "Bon élève", desc: "50 bonnes réponses", ic: "livre_ouvert", v: s => s.lecons, max: 50 },
  { id: "savant", nom: "Savant", desc: "300 bonnes réponses", ic: "flacon", v: s => s.lecons, max: 300 },
  { id: "lecteur", nom: "Rat de bibliothèque", desc: "500 pages lues", ic: "livre", v: s => s.pages, max: 500 },
  { id: "guerrier", nom: "Guerrier", desc: "50 quêtes de Force", ic: "haltere", v: s => s.parCat.force, max: 50 },
  { id: "erudit", nom: "Érudit", desc: "50 quêtes de Savoir", ic: "livre_ouvert", v: s => s.parCat.savoir, max: 50 },
  { id: "ame", nom: "Âme fidèle", desc: "50 quêtes d'Esprit", ic: "croix", v: s => s.parCat.esprit, max: 50 },
  { id: "increvable", nom: "Increvable", desc: "50 quêtes de Vitalité", ic: "goutte", v: s => s.parCat.vitalite, max: 50 },
  { id: "roc", nom: "Roc", desc: "50 quêtes de Discipline", ic: "cible", v: s => s.parCat.discipline, max: 50 },
  { id: "explorateur", nom: "Explorateur", desc: "20 quêtes surprises", ic: "des", v: s => s.surprises, max: 20 },
  { id: "chroniqueur", nom: "Chroniqueur", desc: "10 pages de journal", ic: "crayon", v: s => s.notes, max: 10 },
  { id: "centurion", nom: "Centurion", desc: "100 quêtes accomplies", ic: "epee", v: s => s.quetes, max: 100 },
  { id: "veteran", nom: "Vétéran", desc: "1 000 quêtes accomplies", ic: "epee", v: s => s.quetes, max: 1000 },
  { id: "compagnon", nom: "Compagnon", desc: "Atteindre le niveau 10", ic: "bouclier", v: s => s.niveau, max: 10 },
  { id: "maitre", nom: "Maître de soi", desc: "Atteindre le niveau 20", ic: "bouclier", v: s => s.niveau, max: 20 },
];

const TOUS = [0, 1, 2, 3, 4, 5, 6];
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
function quetesParDefaut() {
  return [
    { id: "q1", nom: "Prière du matin", detail: "Une prière proposée chaque jour", cat: "esprit", xp: 30, type: "case", jours: TOUS, moment: "matin", icone: "soleil", contenu: "priere_matin", actif: true },
    { id: "q2", nom: "Exercices", detail: "La séance du jour au poids du corps", cat: "force", xp: 40, type: "case", jours: TOUS, moment: "matin", icone: "haltere", contenu: "exercices", actif: true },
    { id: "q3", nom: "Apprendre", detail: "Réponds juste aux leçons du jour", cat: "savoir", xp: 50, type: "compteur", objectif: 3, unite: "leçons", pas: 1, jours: TOUS, moment: "journee", icone: "livre_ouvert", contenu: "lecon", actif: true },
    { id: "q4", nom: "Lecture", detail: "Un bon livre", cat: "savoir", xp: 40, type: "compteur", objectif: 20, unite: "pages", pas: 5, jours: TOUS, moment: "journee", icone: "livre", contenu: "lecture", actif: true },
    { id: "q5", nom: "Sport", detail: "La séance de course du jour", cat: "force", xp: 60, type: "case", jours: [0, 2, 4, 5], moment: "journee", icone: "eclair", contenu: "course", actif: true },
    { id: "q6", nom: "Hydratation", detail: "Environ 2 litres", cat: "vitalite", xp: 20, type: "compteur", objectif: 8, unite: "verres", pas: 1, jours: TOUS, moment: "libre", icone: "goutte", contenu: "", actif: true },
    { id: "q7", nom: "Prière du soir", detail: "Examen de conscience et prière", cat: "esprit", xp: 30, type: "case", jours: TOUS, moment: "soir", icone: "lune", contenu: "priere_soir", actif: true },
    { id: "q8", nom: "Sans écran au coucher", detail: "Pas de téléphone la dernière heure", cat: "discipline", xp: 40, type: "case", jours: TOUS, moment: "soir", icone: "lit", contenu: "", actif: false },
    { id: "q10", nom: "Chapelet", detail: "Une dizaine avec le mystère du jour", cat: "esprit", xp: 40, type: "compteur", objectif: 1, unite: "dizaine", pas: 1, jours: TOUS, moment: "soir", icone: "chapelet", contenu: "chapelet", actif: false },
  ];
}
function etatInitial() {
  return { v: VERSION_DONNEES, nom: "Nence", quetes: quetesParDefaut(), jours: {}, succes: {}, lecVues: [], penalitesVues: 0, depuis: iso(new Date()),
    params: { seuil: 0.5, son: true, surprise: true, debut: 0, penalite: "rupture", matieres: ["culture", "francais", "sciences", "logique", "calcul"] },
    cree: new Date().toISOString() };
}

// ------------------------------------------------------------------ stockage
function valide(s) { return s && Array.isArray(s.quetes) && s.jours && typeof s.jours === "object"; }
function completer(s) {
  const d = etatInitial();
  s.params = Object.assign({}, d.params, s.params || {});
  if (!Array.isArray(s.params.matieres)) s.params.matieres = d.params.matieres.slice();
  s.succes = s.succes || {};
  s.lecVues = Array.isArray(s.lecVues) ? s.lecVues : [];
  s.penalitesVues = s.penalitesVues || 0;
  s.nom = s.nom == null ? d.nom : s.nom;
  s.cree = s.cree || new Date().toISOString();
  s.depuis = s.depuis || iso(new Date(s.cree));
  if ((s.v || 1) < 2) { // version 1 -> 2 : propositions, leçons, chapelet
    const liens = { q1: "priere_matin", q7: "priere_soir", q2: "exercices", q5: "course", q4: "lecture" };
    for (const q of s.quetes) {
      if (liens[q.id] && q.contenu == null) q.contenu = liens[q.id];
      if (q.id === "q3") Object.assign(q, { nom: "Apprendre", detail: "Réponds juste aux leçons du jour", type: "compteur", objectif: 3, unite: "leçons", pas: 1, contenu: "lecon", icone: "livre_ouvert" });
      if (q.contenu == null) q.contenu = "";
    }
    if (!s.quetes.some(q => q.contenu === "chapelet")) s.quetes.push(quetesParDefaut().find(q => q.id === "q10"));
    s.depuis = iso(new Date()); // les jours d'avant la mise à jour ne font pas perdre de niveau
    s.v = 2;
  }
  return s;
}
function charger() {
  try {
    const t = localStorage.getItem(CLE);
    if (!t) return null;
    const s = JSON.parse(t);
    return valide(s) ? completer(s) : null;
  } catch (e) { return null; }
}
let S = charger() || etatInitial();
function sauver() { try { localStorage.setItem(CLE, JSON.stringify(S)); } catch (e) { /* stockage indisponible */ } }
try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* facultatif */ }

// ------------------------------------------------------------------ outils
const esc = t => String(t == null ? "" : t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const nf = n => Math.round(n).toLocaleString("fr-FR");
function ic(nom, couleur = "currentColor", taille = 20, epais = 2) {
  return `<svg width="${taille}" height="${taille}" viewBox="0 0 24 24" fill="none" stroke="${couleur}" stroke-width="${epais}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nom] || ICONES.etoile}</svg>`;
}
const deIso = k => { const [a, m, j] = k.split("-").map(Number); return new Date(a, m - 1, j); };
const decale = (k, n) => { const d = deIso(k); d.setDate(d.getDate() + n); return iso(d); };
const jourSemaine = k => (deIso(k).getDay() + 6) % 7;
const numJour = k => Math.round((deIso(k) - new Date(2020, 0, 6)) / 864e5); // jours depuis un lundi de référence
function aujourdhui() { return iso(new Date(Date.now() - (S.params.debut || 0) * 3600e3)); }
function dateLongue(k) { const d = deIso(k); return `${JOURS_NOMS[jourSemaine(k)]} ${d.getDate()} ${MOIS[d.getMonth()]}`; }
const majuscule = t => t.charAt(0).toUpperCase() + t.slice(1);
function hash(t) { let h = 2166136261; for (const c of String(t)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
const pluriel = (n, mot) => n + " " + mot + (n > 1 ? (/(au|eu)$/.test(mot) ? "x" : "s") : "");

// ------------------------------------------------------------------ journées
function queteId(id) { return S.quetes.find(q => q.id === id); }
function prevues(k) { const js = jourSemaine(k); return S.quetes.filter(q => q.actif && (q.jours || TOUS).includes(js)); }
function jour(k, creer = true) {
  let j = S.jours[k];
  if (!j && !creer) return null;
  if (!j) j = S.jours[k] = { liste: [], q: {}, gains: {}, coffre: false, note: "", humeur: "", energie: "" };
  if (k === aujourdhui()) { // la liste du jour suit la configuration actuelle
    const ids = prevues(k).map(q => q.id);
    const faites = Object.keys(j.q).filter(id => !ids.includes(id) && queteId(id));
    j.liste = ids.concat(faites);
  } else if (!j.liste.length && !Object.keys(j.q).length) {
    j.liste = prevues(k).map(q => q.id);
  }
  return j;
}
function estFaite(q, v) { return q && q.type === "compteur" ? (Number(v) || 0) >= (q.objectif || 1) : !!v; }
function bilanJour(k) {
  const j = S.jours[k];
  if (!j) { const t = prevues(k).length; return { total: t, faites: 0, ratio: 0, xp: 0 }; }
  const liste = j.liste.length ? j.liste : prevues(k).map(q => q.id);
  const total = liste.length, faites = liste.filter(id => j.gains[id]).length;
  const xp = Object.values(j.gains).reduce((a, g) => a + g.xp, 0);
  return { total, faites, ratio: total ? faites / total : 0, xp };
}
function besoin(k) { const b = bilanJour(k); return Math.ceil(b.total * S.params.seuil - 1e-9); }
function reussi(k) { const b = bilanJour(k); return b.total > 0 && b.faites >= besoin(k); }
function jourSansQuete(k) { return prevues(k).length === 0 && !(S.jours[k] && S.jours[k].liste.length); }
function surpriseDu(k) {
  if (!S.params.surprise) return null;
  const j = jour(k);
  if (!j.surprise) j.surprise = { i: hash(k) % SURPRISES.length, change: 0 };
  const [nom, icone, cat, xp] = SURPRISES[j.surprise.i];
  return { nom, icone, cat, xp, fait: !!j.gains._surprise, change: j.surprise.change };
}

// ------------------------------------------------------------------ niveaux, séries et pénalités
function seuilNiveau(L) { return 50 * L * (L - 1); } // XP cumulée pour atteindre le niveau L
function niveauDe(xp) { let L = 1; while (xp >= seuilNiveau(L + 1)) L++; return L; }
function titreDe(L) { let t = TITRES[0][1]; for (const [n, nom] of TITRES) if (L >= n) t = nom; return t; }
function prochainTitre(L) { return TITRES.find(([n]) => n > L) || null; }
function perdreNiveau(xp) {
  // redescend d'un niveau en gardant la même progression relative dans le niveau
  const L = niveauDe(xp);
  if (L <= 1) return 0;
  const frac = (xp - seuilNiveau(L)) / (seuilNiveau(L + 1) - seuilNiveau(L));
  return Math.floor(seuilNiveau(L - 1) + frac * (seuilNiveau(L) - seuilNiveau(L - 1)));
}
function debutJeu() {
  const cles = Object.keys(S.jours).sort();
  const cree = iso(new Date(S.cree));
  return cles.length && cles[0] < cree ? cles[0] : cree;
}

function stats() {
  const st = { xp: 0, parCat: { force: 0, savoir: 0, esprit: 0, vitalite: 0, discipline: 0 },
    xpCat: { force: 0, savoir: 0, esprit: 0, vitalite: 0, discipline: 0 },
    quetes: 0, surprises: 0, pages: 0, parfaits: 0, notes: 0, lecons: 0, serie: 0, record: 0, recordParfait: 0, penalites: [] };
  const auj = aujourdhui();
  let serie = 0, serieP = 0, enEchec = false;
  for (let k = debutJeu(); k <= auj; k = decale(k, 1)) {
    const j = S.jours[k];
    if (j) {
      for (const [id, g] of Object.entries(j.gains)) {
        st.xp += g.xp;
        if (id === "_coffre") continue;
        if (g.cat && st.parCat[g.cat] != null) { st.parCat[g.cat]++; st.xpCat[g.cat] += g.xp; }
        if (id === "_surprise") st.surprises++; else st.quetes++;
      }
      for (const [id, v] of Object.entries(j.q)) {
        const q = queteId(id);
        if (q && q.type === "compteur" && /page/i.test(q.unite || "")) st.pages += Number(v) || 0;
      }
      st.lecons += j.lecOk || 0;
      if ((j.note || "").trim()) st.notes++;
    }
    if (jourSansQuete(k)) continue;
    const b = bilanJour(k), ok = reussi(k), parfait = b.total > 0 && b.ratio >= 1;
    if (parfait) st.parfaits++;
    if (k === auj) { // aujourd'hui n'est jugé qu'une fois terminé
      if (ok) serie++;
      if (parfait) serieP++;
    } else if (ok) {
      serie++; enEchec = false;
      serieP = parfait ? serieP + 1 : 0;
    } else {
      serie = 0; serieP = 0;
      if (k >= S.depuis && (!enEchec || S.params.penalite === "jour")) {
        const avantL = niveauDe(st.xp);
        st.xp = perdreNiveau(st.xp);
        st.penalites.push({ k, de: avantL, a: niveauDe(st.xp), faites: b.faites, total: b.total });
      }
      enEchec = true;
    }
    st.record = Math.max(st.record, serie);
    st.recordParfait = Math.max(st.recordParfait, serieP);
  }
  st.serie = serie;
  st.niveau = niveauDe(st.xp);
  return st;
}

// ------------------------------------------------------------------ leçons
function normaliser(t) {
  return String(t).toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[’'`]/g, " ").replace(/[^a-z0-9.,\- ]/g, " ").replace(/\s+/g, " ").trim()
    .replace(/^(le|la|les|l|un|une|des|du|de|d|en|au|aux|c est|cest|il s agit de) /, "").trim();
}
function enNombre(t) {
  const s = String(t).replace(/\s/g, "").replace(",", ".").replace(/[^0-9.\-]/g, "");
  return s && /\d/.test(s) && !isNaN(Number(s)) ? Number(s) : null;
}
function reponseJuste(saisie, lecon) {
  const n = enNombre(saisie), ns = normaliser(saisie);
  if (!ns) return false;
  for (const r of lecon.r) {
    const nr = enNombre(r);
    if (nr != null && /^[\d\s.,\-]+$/.test(String(r).trim())) {
      if (n != null && Math.abs(n - nr) <= (lecon.tol || 0) + 1e-9) return true;
    } else if (ns === normaliser(r)) return true;
  }
  return false;
}
function leconParId(id) {
  if (!id) return null;
  if (id.startsWith("calc:")) return genererCalcul(Number(id.slice(5)));
  return LECONS.find(l => l.id === id) || null;
}
function nouvelleLecon(k) {
  const j = jour(k);
  const mats = S.params.matieres.length ? S.params.matieres : ["calcul"];
  const n = j.lecSeq || 0;
  j.lecSeq = n + 1;
  const m = mats[(hash(k) + n) % mats.length];
  let id;
  if (m === "calcul") id = "calc:" + hash(k + ":" + n);
  else {
    let pool = LECONS.filter(l => l.m === m && !S.lecVues.includes(l.id));
    if (!pool.length) { // toutes vues : on recommence cette matière
      S.lecVues = S.lecVues.filter(v => !LECONS.some(l => l.id === v && l.m === m));
      pool = LECONS.filter(l => l.m === m);
    }
    id = pool[hash(k + "#" + n) % pool.length].id;
  }
  j.lecon = { id, essais: 0, etat: "question", saisie: "" };
  return j.lecon;
}
function verifierLecon(qid, saisie, ev) {
  const k = aujourdhui(), j = jour(k), q = queteId(qid), cur = j.lecon, l = leconParId(cur && cur.id);
  if (!l || cur.etat !== "question") return;
  cur.saisie = saisie;
  if (!String(saisie).trim()) { cur.message = "Écris ta réponse avant de vérifier."; rendreFeuille(); return; }
  memoriser();
  if (reponseJuste(saisie, l)) {
    cur.etat = "juste"; cur.message = "";
    j.lecOk = (j.lecOk || 0) + 1;
    if (!l.id.startsWith("calc:") && !S.lecVues.includes(l.id)) S.lecVues.push(l.id);
    if (q) {
      j.q[qid] = (Number(j.q[qid]) || 0) + 1;
      if (!j.liste.includes(qid)) j.liste.push(qid);
      if (estFaite(q, j.q[qid]) && !j.gains[qid]) { j.gains[qid] = { xp: q.xp, cat: q.cat }; flotte(ev, "+" + q.xp + " XP"); }
    }
    son("quete");
  } else {
    cur.essais++;
    j.lecKo = (j.lecKo || 0) + 1;
    if (cur.essais >= ESSAIS_LECON) {
      cur.etat = "revele"; cur.message = "";
      if (!l.id.startsWith("calc:") && !S.lecVues.includes(l.id)) S.lecVues.push(l.id);
    } else {
      cur.message = `Ce n'est pas la bonne réponse. Relis la leçon et réessaie (${ESSAIS_LECON - cur.essais} essai${ESSAIS_LECON - cur.essais > 1 ? "s" : ""} restant${ESSAIS_LECON - cur.essais > 1 ? "s" : ""}).`;
      son("erreur");
    }
  }
  apres();
}

// ------------------------------------------------------------------ actions sur les quêtes
let avant = null;
function memoriser() { if (!avant) avant = { niveau: stats().niveau }; }
function gagner(j, id, q) { j.gains[id] = { xp: q.xp, cat: q.cat }; }
function basculer(id, ev, k) {
  k = k || aujourdhui();
  const j = jour(k), q = queteId(id);
  if (!q || q.contenu === "lecon") return;
  memoriser();
  if (j.gains[id]) { delete j.gains[id]; delete j.q[id]; }
  else {
    j.q[id] = q.type === "compteur" ? q.objectif : true;
    gagner(j, id, q);
    if (k === aujourdhui()) { flotte(ev, "+" + q.xp + " XP"); son("quete"); }
  }
  if (!j.liste.includes(id)) j.liste.push(id);
  apres();
}
function compter(id, sens, ev, k) {
  k = k || aujourdhui();
  const j = jour(k), q = queteId(id);
  if (!q || q.contenu === "lecon") return;
  memoriser();
  const v = Math.max(0, Math.min((q.objectif || 1) * 5, (Number(j.q[id]) || 0) + sens * (q.pas || 1)));
  if (v > 0) j.q[id] = v; else delete j.q[id];
  const fait = estFaite(q, v);
  if (fait && !j.gains[id]) { gagner(j, id, q); if (k === aujourdhui()) { flotte(ev, "+" + q.xp + " XP"); son("quete"); } }
  if (!fait && j.gains[id]) delete j.gains[id];
  if (!j.liste.includes(id)) j.liste.push(id);
  apres();
}
function surpriseFaite(ev) {
  const j = jour(aujourdhui()), s = surpriseDu(aujourdhui());
  if (!s) return;
  memoriser();
  if (j.gains._surprise) delete j.gains._surprise;
  else { j.gains._surprise = { xp: s.xp, cat: s.cat }; flotte(ev, "+" + s.xp + " XP"); son("quete"); }
  apres();
}
function changerSurprise() {
  const j = jour(aujourdhui());
  if (!j.surprise || j.surprise.change >= 1 || j.gains._surprise) return;
  j.surprise.i = (j.surprise.i + 7 + (hash(aujourdhui() + "x") % (SURPRISES.length - 8))) % SURPRISES.length;
  j.surprise.change++;
  sauver(); rendre();
}
function ouvrirCoffre() {
  const k = aujourdhui(), j = jour(k), b = bilanJour(k);
  if (j.coffre || !b.total || b.faites < b.total) return;
  memoriser();
  j.coffre = true;
  j.gains._coffre = { xp: BONUS_COFFRE, cat: null };
  son("coffre");
  celebrer({ grand: "+" + BONUS_COFFRE + " XP", moyen: "Coffre du jour ouvert", texte: "Toutes les quêtes du jour sont accomplies. Bravo !", icone: "coffre" });
  apres(true);
}
function apres(differer) {
  sauver();
  const st = stats();
  for (const h of HAUTS_FAITS) {
    if (!S.succes[h.id] && h.v(st) >= h.max) { S.succes[h.id] = aujourdhui(); toast("Haut fait débloqué : " + h.nom, h.desc); }
  }
  sauver();
  if (avant && st.niveau > avant.niveau) {
    const c = () => { son("niveau"); celebrer({ grand: "Niveau " + st.niveau, moyen: titreDe(st.niveau), texte: "Tu montes de niveau. Continue sur cette lancée !", icone: "bouclier" }); };
    if (differer) setTimeout(c, 2600); else c();
  }
  avant = null;
  rendre();
}

// ------------------------------------------------------------------ effets
let audio = null;
function son(type) {
  if (!S.params.son) return;
  try {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { niveau: [523, 659, 784, 1047], coffre: [392, 523, 659, 784], fin: [880, 660, 880, 1175], erreur: [330, 247], perte: [392, 330, 262] }[type] || [660, 990];
    const t0 = audio.currentTime;
    notes.forEach((f, i) => {
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = type === "erreur" || type === "perte" ? "sine" : "triangle"; o.frequency.value = f;
      const t = t0 + i * 0.1;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.14, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.32);
      o.connect(g); g.connect(audio.destination);
      o.start(t); o.stop(t + 0.34);
    });
  } catch (e) { /* son indisponible */ }
}
function flotte(ev, texte) {
  const el = document.createElement("div");
  el.className = "flotte";
  el.textContent = texte;
  const r = ev && ev.target && ev.target.closest ? ev.target.closest("button,.quete") : null;
  const b = r ? r.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 0 };
  el.style.left = (b.left + b.width / 2) + "px";
  el.style.top = (b.top - 6) + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}
let fileToasts = Promise.resolve();
function toast(titre, texte) { fileToasts = fileToasts.then(() => new Promise(fin => { afficherToast(titre, texte); setTimeout(fin, 3300); })); }
function afficherToast(titre, texte) {
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  el.innerHTML = `${ic("etoile", "var(--or)", 26)}<div><b>${esc(titre)}</b><span>${esc(texte)}</span></div>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3700);
}
function celebrer({ grand, moyen, texte, icone, defaite }) {
  const el = document.createElement("div");
  el.className = "celebration" + (defaite ? " defaite" : "");
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-label", grand);
  let eclats = "";
  if (!defaite) {
    const couleurs = ["var(--or)", "var(--force)", "var(--savoir)", "var(--esprit)", "var(--vitalite)", "var(--discipline)"];
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2, d = 120 + (i * 37) % 120;
      eclats += `<i class="etincelle" style="background:${couleurs[i % couleurs.length]};--dx:${Math.round(Math.cos(a) * d)}px;--dy:${Math.round(Math.sin(a) * d)}px;animation-delay:${(i % 6) * 0.03}s"></i>`;
    }
  }
  el.innerHTML = `${defaite ? "" : '<div class="rayons"></div>'}${eclats}<div class="${defaite ? "chute" : "coffre-anim"}">${ic(icone, defaite ? "var(--rouge)" : "var(--or)", 64, 1.6)}</div>
    <div class="grand">${esc(grand)}</div><div class="moyen">${esc(moyen)}</div><p>${esc(texte)}</p>
    <button class="btn-or" data-a="fermer-celebration">${defaite ? "Je relève le défi" : "Continuer"}</button>`;
  document.body.appendChild(el);
  el.querySelector("button").focus();
}
function annoncerPenalites() {
  const st = stats();
  if (st.penalites.length > S.penalitesVues) {
    const p = st.penalites[st.penalites.length - 1], n = st.penalites.length - S.penalitesVues;
    S.penalitesVues = st.penalites.length;
    sauver();
    son("perte");
    const perdus = st.penalites.slice(-n).reduce((s, x) => s + (x.de - x.a), 0);
    celebrer({ defaite: true, icone: "bouclierBrise", grand: perdus ? "−" + pluriel(perdus, "niveau") : "XP perdue",
      moyen: n > 1 ? "Série rompue " + n + " fois" : "Série rompue",
      texte: `${majuscule(dateLongue(p.k))} : ${p.faites} quête${p.faites > 1 ? "s" : ""} sur ${p.total}, il en fallait ${Math.ceil(p.total * S.params.seuil - 1e-9)}. ` +
        (perdus ? `Tu es maintenant niveau ${st.niveau} (${titreDe(st.niveau)}). Remonte la pente dès aujourd'hui !` : "Ton expérience du niveau 1 est remise à zéro.") });
  }
}

// ------------------------------------------------------------------ minuteur (séances)
let MINUTEUR = null, verrou = null;
function lancerMinuteur(sec, label) {
  MINUTEUR = { fin: Date.now() + sec * 1000, label };
  try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(v => { verrou = v; }).catch(() => {}); } catch (e) { /* facultatif */ }
  majMinuteur();
}
function arreterMinuteur() { MINUTEUR = null; try { if (verrou) verrou.release(); } catch (e) { /* rien */ } verrou = null; majMinuteur(); }
function majMinuteur() {
  const el = document.getElementById("minuteur");
  if (!MINUTEUR) { if (el) el.hidden = true; return; }
  const reste = Math.max(0, Math.ceil((MINUTEUR.fin - Date.now()) / 1000));
  if (el) {
    el.hidden = false;
    el.querySelector("b").textContent = Math.floor(reste / 60) + ":" + String(reste % 60).padStart(2, "0");
    el.querySelector("span").textContent = MINUTEUR.label;
  }
  if (reste === 0) { const l = MINUTEUR.label; arreterMinuteur(); son("fin"); toast("Temps écoulé", l); }
}
setInterval(majMinuteur, 250);

// ------------------------------------------------------------------ navigation et rendu
let VUE = "quetes", JOUR_SEL = null, MOIS_VU = null, EDITION = null, CONFIRMER = null, SAUVEGARDE_TXT = "", IMPORT_MSG = "";
let FEUILLE = null; // proposition ouverte : { qid }

const racine = document.getElementById("app");
const nav = document.getElementById("nav");
function rendre() {
  const vues = { quetes: vueQuetes, heros: vueHeros, journal: vueJournal, reglages: vueReglages };
  racine.innerHTML = vues[VUE]();
  nav.innerHTML = `<div class="interne gouttiere">${[["quetes", "Quêtes", "epee"], ["heros", "Héros", "bouclier"], ["journal", "Journal", "calendrier"], ["reglages", "Réglages", "reglages"]]
    .map(([v, t, i]) => `<button data-a="vue" data-v="${v}" ${VUE === v ? 'aria-current="page"' : ""}>${ic(i, "currentColor", 22)}${t}</button>`).join("")}</div>`;
  if (EDITION) rendreEditeur();
  if (FEUILLE) rendreFeuille();
}
function salut() { const h = new Date().getHours(); return h < 5 ? "Bonne nuit" : h < 12 ? "Bonjour" : h < 18 ? "Bon après-midi" : "Bonsoir"; }

function enteteHeros(st) {
  const L = st.niveau, bas = seuilNiveau(L), haut = seuilNiveau(L + 1);
  const pct = Math.min(100, Math.round(100 * (st.xp - bas) / (haut - bas)));
  const pt = prochainTitre(L), k = aujourdhui(), b = bilanJour(k), il_faut = besoin(k);
  const protege = b.total === 0 || b.faites >= il_faut;
  const manque = Math.max(0, il_faut - b.faites);
  return `<header class="entete gouttiere">
    <div class="ligne-heros">
      <div class="blason" aria-label="Niveau ${L}"><small>Niv.</small><b class="num">${L}</b></div>
      <div class="qui"><span>${salut()}${S.nom ? ", " + esc(S.nom) : ""}</span><h1>${esc(titreDe(L))}</h1></div>
      <button class="garde ${protege ? "ok" : ""}" data-a="vue" data-v="heros" aria-label="${protege ? "Niveau protégé aujourd'hui" : "Niveau en jeu aujourd'hui"}">
        ${ic(protege ? "bouclierOk" : "bouclier", protege ? "var(--vitalite)" : "var(--rouge)", 20)}<span class="num">${b.faites}/${il_faut}</span></button>
    </div>
    <div class="xp">
      <div class="xp-haut"><span>Expérience</span><span class="num"><strong>${nf(st.xp - bas)}</strong> / ${nf(haut - bas)} XP</span></div>
      <div class="barre" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div>
      <span class="xp-bas">Encore ${nf(haut - st.xp)} XP avant le niveau ${L + 1}${pt && pt[0] === L + 1 ? " : « " + pt[1] + " »" : ""}</span>
    </div>
    ${b.total ? `<div class="enjeu ${protege ? "ok" : ""}">${protege
      ? `${ic("bouclierOk", "var(--vitalite)", 18)}<span>Niveau protégé pour aujourd'hui. Chaque quête en plus rapporte de l'XP.</span>`
      : `${ic("bouclier", "var(--rouge)", 18)}<span>Encore <b>${pluriel(manque, "quête")}</b> aujourd'hui, sinon tu perds un niveau à minuit.</span>`}</div>` : ""}
  </header>`;
}

function carteQuete(q, j) {
  const v = j.q[q.id], fait = !!j.gains[q.id], cat = CATS[q.cat] || CATS.discipline;
  const rarete = q.xp >= 80 ? "epique" : q.xp >= 60 ? "rare" : "";
  const aProposition = !!q.contenu;
  const ouvrable = q.contenu === "lecon" || q.contenu === "chapelet";
  let controle, sousTexte = esc(q.detail || "");
  if (q.type === "compteur") sousTexte = `${Number(v) || 0} / ${q.objectif || 1} ${esc(q.unite || "")}${q.detail ? " · " + esc(q.detail) : ""}`;
  if (ouvrable) {
    controle = fait ? `<button class="coche" data-a="ouvrir" data-id="${q.id}" aria-label="Quête ${esc(q.nom)} accomplie, revoir">${ic("coche", "var(--sur-or)", 16, 3)}</button>`
      : `<button class="btn-mini" data-a="ouvrir" data-id="${q.id}">${(Number(v) || 0) ? "Continuer" : "Commencer"}</button>`;
  } else if (q.type === "compteur") {
    controle = `<div class="compteur">
      <button data-a="moins" data-id="${q.id}" aria-label="Retirer ${q.pas || 1} ${esc(q.unite || "")} à ${esc(q.nom)}">${ic("moins", "currentColor", 16, 2.5)}</button>
      <button data-a="plus" data-id="${q.id}" aria-label="Ajouter ${q.pas || 1} ${esc(q.unite || "")} à ${esc(q.nom)}" ${fait ? 'class="plein"' : ""}>${ic(fait ? "coche" : "plus", "currentColor", 16, 2.5)}</button></div>`;
  } else {
    controle = `<button class="coche" data-a="basculer" data-id="${q.id}" aria-pressed="${fait}" aria-label="${fait ? "Annuler" : "Valider"} la quête ${esc(q.nom)}">${fait ? ic("coche", "var(--sur-or)", 16, 3) : ""}</button>`;
  }
  const barre = q.type === "compteur" ? `<div class="mini"><i style="width:${Math.min(100, Math.round(100 * (Number(v) || 0) / (q.objectif || 1)))}%"></i></div>` : "";
  const actionCorps = aProposition ? "ouvrir" : (q.type === "compteur" ? "plus" : "basculer");
  return `<div class="quete ${fait ? "fait" : rarete}">
    <div class="tuile" style="background:${cat.f}">${ic(q.icone, cat.c, 20)}</div>
    <button class="corps" data-a="${actionCorps}" data-id="${q.id}" ${aProposition ? "" : 'tabindex="-1" aria-hidden="true"'}>
      <span class="nom">${esc(q.nom)}${rarete && !fait ? ` <span class="tag ${rarete}">${rarete === "epique" ? "Épique" : "Rare"}</span>` : ""}</span>
      <span class="detail">${cat.nom} · ${sousTexte}</span>${barre}
      ${aProposition && !fait ? `<span class="proposition">${ic("lecture", "currentColor", 12, 2.4)} ${q.contenu === "lecon" ? "Ouvrir la leçon" : "Proposition du jour"}</span>` : ""}
    </button>
    <span class="gain num">+${q.xp}</span>
    ${controle}
  </div>`;
}

function vueQuetes() {
  const st = stats(), k = aujourdhui(), j = jour(k), b = bilanJour(k);
  const quetes = j.liste.map(queteId).filter(Boolean);
  let html = enteteHeros(st) + `<div class="vue gouttiere">`;
  html += `<div class="titre-section"><h2>Quêtes du jour</h2><span class="num"><strong>${b.faites}</strong> / ${b.total} accomplies</span></div>`;
  if (!quetes.length) {
    html += `<div class="vide">${ic("lune", "var(--doux)", 32)}<b>Jour de repos</b><span>Aucune quête prévue aujourd'hui.</span>
      <button class="btn" data-a="vue" data-v="reglages">Gérer mes quêtes</button></div>`;
  } else {
    for (const m of Object.keys(MOMENTS)) {
      const qs = quetes.filter(q => (q.moment || "libre") === m);
      if (qs.length) html += `<div class="moment">${MOMENTS[m]}</div><div class="liste">${qs.map(q => carteQuete(q, j)).join("")}</div>`;
    }
  }
  const s = surpriseDu(k);
  if (s) {
    const cat = CATS[s.cat];
    html += `<div class="quete surprise ${s.fait ? "fait" : ""}">
      <div class="tuile" style="background:${cat.f}">${ic(s.icone, cat.c, 20)}</div>
      <div class="corps"><span class="etiquette">Quête surprise · bonus</span><span class="nom">${esc(s.nom)}</span>
        <span class="detail">${cat.nom}${!s.fait && s.change < 1 ? ` · <button class="lien-bouton" data-a="changer-surprise">en tirer une autre</button>` : ""}</span></div>
      <span class="gain num">+${s.xp}</span>
      <button class="coche" data-a="surprise" aria-pressed="${s.fait}" aria-label="${s.fait ? "Annuler" : "Valider"} la quête surprise">${s.fait ? ic("coche", "var(--sur-or)", 16, 3) : ""}</button>
    </div>`;
  }
  if (b.total) {
    const reste = b.total - b.faites;
    if (j.coffre) html += `<div class="coffre">${ic("coffre", "var(--or)", 28, 1.8)}<div class="txt"><b>Coffre du jour ouvert</b><span>+${BONUS_COFFRE} XP gagnés. À demain pour le suivant !</span></div></div>`;
    else if (reste === 0) html += `<div class="coffre pret">${ic("coffre", "var(--or)", 28, 1.8)}<div class="txt"><b>Le coffre est prêt</b><span>Toutes les quêtes sont accomplies.</span></div><button class="btn-or" data-a="coffre">Ouvrir</button></div>`;
    else html += `<div class="coffre">${ic("coffre", "var(--or)", 28, 1.8)}<div class="txt"><b>Coffre du jour</b><span>Termine toutes les quêtes : +${BONUS_COFFRE} XP bonus</span></div><span class="gain num">${reste} restante${reste > 1 ? "s" : ""}</span></div>`;
  }
  return html + `</div>`;
}

function vueHeros() {
  const st = stats(), L = st.niveau;
  let html = `<header class="portrait gouttiere">
    <div class="embleme">${ic("bouclier", "var(--or)", 52, 1.5)}<b class="num">${L}</b></div>
    <h1>${esc(S.nom || "Héros")}</h1>
    <span class="sous num">Niveau ${L} · ${esc(titreDe(L))} · ${nf(st.xp)} XP</span>
    <div class="pilules"><span class="pilule">${pluriel(st.serie, "jour")} réussi${st.serie > 1 ? "s" : ""} de suite</span>
      <span class="pilule" style="color:${st.penalites.length ? "var(--rouge)" : "var(--doux)"}">${pluriel(st.penalites.length, "niveau")} perdu${st.penalites.length > 1 ? "s" : ""}</span></div>
  </header><div class="vue gouttiere">`;
  html += `<div class="carte regle">${ic("bouclierBrise", "var(--rouge)", 22)}<p>Règle du jeu : accomplis au moins ${Math.round(S.params.seuil * 100)} % de tes quêtes chaque jour.
    Sinon, tu perds un niveau${S.params.penalite === "jour" ? " par jour manqué" : " (plusieurs jours manqués d'affilée ne coûtent qu'un niveau)"}.</p></div>`;
  html += `<h2 class="or">Caractéristiques</h2><div class="stats">`;
  for (const [id, c] of Object.entries(CATS)) {
    const xp = st.xpCat[id], pts = 1 + Math.floor(xp / 100), pct = xp % 100;
    html += `<div class="stat"><div class="h"><span>${c.nom}</span><b class="num" style="color:${c.c}">${pts}</b></div>
      <div class="b"><i style="width:${pct}%;background:${c.c}"></i></div><small>${c.aide} · ${pluriel(st.parCat[id], "quête")}</small></div>`;
  }
  html += `</div><h2 class="or">Hauts faits</h2><div class="badges">`;
  const tries = [...HAUTS_FAITS].sort((a, b) => (S.succes[b.id] ? 1 : 0) - (S.succes[a.id] ? 1 : 0));
  for (const h of tries) {
    const ok = !!S.succes[h.id];
    html += ok ? `<div class="badge">${ic(h.ic, "var(--or)", 30, 1.8)}<b>${esc(h.nom)}</b><small>${esc(h.desc)}</small></div>`
      : `<div class="badge verrou">${ic("cadenas", "#6E7390", 30, 1.8)}<b>${esc(h.nom)}</b><small class="num">${nf(Math.min(h.v(st), h.max))} / ${nf(h.max)}</small></div>`;
  }
  html += `</div>`;
  const auj = aujourdhui(), lundi = decale(auj, -jourSemaine(auj));
  let barres = "", tot = 0, faites = 0;
  for (let i = 0; i < 7; i++) {
    const k = decale(lundi, i), b = bilanJour(k);
    if (k <= auj) { tot += b.total; faites += b.faites; }
    barres += k > auj ? `<i class="futur" style="height:6%"></i>` : `<i class="${k < auj && !jourSansQuete(k) && !reussi(k) ? "rate" : ""}" style="height:${Math.max(4, Math.round(100 * b.ratio))}%" title="${b.faites}/${b.total}"></i>`;
  }
  html += `<div class="carte"><div class="h"><b>Cette semaine</b><span class="num">${faites} / ${tot} quêtes</span></div>
    <div class="semaine">${barres}</div><div class="jours7">${JOURS_COURTS.map(x => `<span>${x}</span>`).join("")}</div></div>`;
  html += `<div class="carte"><div class="chiffres">
    <div><b class="num">${nf(st.quetes)}</b><span>quêtes accomplies</span></div>
    <div><b class="num">${nf(st.lecons)}</b><span>bonnes réponses</span></div>
    <div><b class="num">${nf(st.record)}</b><span>meilleure série</span></div></div></div>`;
  return html + `</div>`;
}

function anneau(ratio, parfait, rate) {
  const r = 15, c = 2 * Math.PI * r;
  if (parfait) return `<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="var(--or)"/></svg>`;
  return `<svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="${r}" fill="none" stroke="${rate ? "var(--rouge-f)" : "var(--releve)"}" stroke-width="3"/>
    ${ratio > 0 ? `<circle cx="18" cy="18" r="${r}" fill="none" stroke="var(--or)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${(ratio * c).toFixed(1)} ${c.toFixed(1)}" transform="rotate(-90 18 18)"/>` : ""}</svg>`;
}
function vueJournal() {
  const auj = aujourdhui(), st = stats();
  const penal = new Set(st.penalites.map(p => p.k));
  if (!MOIS_VU) MOIS_VU = auj.slice(0, 7);
  if (!JOUR_SEL) JOUR_SEL = auj;
  const [a, m] = MOIS_VU.split("-").map(Number);
  const decal = jourSemaine(`${MOIS_VU}-01`), nbJours = new Date(a, m, 0).getDate(), debut = debutJeu();
  let html = `<div class="vue gouttiere"><div class="mois"><button class="rond" data-a="mois" data-s="-1" aria-label="Mois précédent">${ic("gauche")}</button>
    <h1>${majuscule(MOIS[m - 1])} ${a}</h1>
    <button class="rond" data-a="mois" data-s="1" aria-label="Mois suivant" ${MOIS_VU >= auj.slice(0, 7) ? "disabled" : ""}>${ic("droite")}</button></div>
    <div class="cal">${JOURS_COURTS.map(x => `<span class="jsem">${x}</span>`).join("")}`;
  for (let i = 0; i < decal; i++) html += `<span></span>`;
  for (let d = 1; d <= nbJours; d++) {
    const k = `${MOIS_VU}-${String(d).padStart(2, "0")}`, futur = k > auj, avantJeu = k < debut;
    const b = futur || avantJeu ? { ratio: 0, total: 0 } : bilanJour(k), parfait = b.total > 0 && b.ratio >= 1;
    html += `<button class="jour ${k === auj ? "auj" : ""} ${k === JOUR_SEL ? "sel" : ""} ${futur || avantJeu ? "hors" : ""} ${parfait ? "parfait" : ""} ${penal.has(k) ? "penal" : ""}"
      data-a="jour" data-k="${k}" ${futur || avantJeu ? "disabled" : ""}
      aria-label="${dateLongue(k)}${futur || avantJeu ? "" : ", " + Math.round(b.ratio * 100) + " %"}${penal.has(k) ? ", niveau perdu" : ""}">${futur || avantJeu ? "" : anneau(b.ratio, parfait, penal.has(k))}<span class="num">${d}</span></button>`;
  }
  html += `</div><p class="note legende"><i class="pt or"></i> journée parfaite <i class="pt rouge"></i> niveau perdu</p>`;
  const k = JOUR_SEL, j = jour(k), b = bilanJour(k), p = st.penalites.find(x => x.k === k);
  html += `<div class="carte"><div class="h"><b>${majuscule(dateLongue(k))}</b><span class="num">${b.faites} / ${b.total} · +${nf(b.xp)} XP</span></div>`;
  if (p) html += `<p class="note alerte">${ic("bouclierBrise", "var(--rouge)", 16)} Série rompue ce jour-là : niveau ${p.de} → ${p.a}.</p>`;
  if (k !== auj) html += `<p class="note" style="margin:0">Tu peux corriger une quête oubliée. Les leçons, elles, ne se valident qu'en répondant juste le jour même.</p>`;
  html += `<div>`;
  const ids = j.liste.length ? j.liste : prevues(k).map(q => q.id);
  for (const id of ids) {
    const q = queteId(id);
    if (!q) continue;
    const fait = !!j.gains[id];
    const val = q.type === "compteur" ? `${Number(j.q[id]) || 0} / ${q.objectif} ${esc(q.unite || "")}` : "";
    const verrouille = q.contenu === "lecon";
    html += `<div class="ligne-jour">${ic(q.icone, (CATS[q.cat] || CATS.discipline).c, 18)}<span class="n">${esc(q.nom)} <span class="x">${val}</span></span>
      ${verrouille ? `<span class="coche petite ${fait ? "on" : ""}" aria-label="${fait ? "Réussie" : "Non réussie"}">${fait ? ic("coche", "var(--sur-or)", 14, 3) : ""}</span>`
        : `<button class="coche petite" data-a="basculer-jour" data-id="${id}" aria-pressed="${fait}" aria-label="${fait ? "Annuler" : "Valider"} ${esc(q.nom)}">${fait ? ic("coche", "var(--sur-or)", 14, 3) : ""}</button>`}</div>`;
  }
  if (!ids.length) html += `<p class="note">Aucune quête prévue ce jour-là.</p>`;
  html += `</div></div>`;
  html += `<div class="carte"><div class="champ"><label for="note-jour">Ce que je retiens de cette journée</label>
    <textarea id="note-jour" data-k="${k}" placeholder="Une victoire, une difficulté, une idée pour demain…">${esc(j.note)}</textarea></div>
    <div class="champ"><span class="lab">Humeur</span><div class="puces">${["Rayonnante", "Bonne", "Neutre", "Fatiguée", "Difficile"].map(h =>
      `<button class="puce ${j.humeur === h ? "on" : ""}" data-a="humeur" data-h="${h}" aria-pressed="${j.humeur === h}">${h}</button>`).join("")}</div></div>
    <div class="champ"><span class="lab">Énergie</span><div class="puces">${["Haute", "Moyenne", "Basse"].map(h =>
      `<button class="puce ${j.energie === h ? "on" : ""}" data-a="energie" data-h="${h}" aria-pressed="${j.energie === h}">${h}</button>`).join("")}</div></div></div>`;
  return html + `</div>`;
}

// ------------------------------------------------------------------ propositions du jour
function ouvrirFeuille(qid) { FEUILLE = { qid }; rendreFeuille(); }
function fermerFeuille() { FEUILLE = null; arreterMinuteur(); const f = document.getElementById("feuille"); if (f) f.remove(); rendre(); }
function rendreFeuille() {
  const q = queteId(FEUILLE.qid);
  if (!q) { FEUILLE = null; return; }
  const k = aujourdhui(), j = jour(k), fait = !!j.gains[q.id];
  const corps = { priere_matin: feuillePriere, priere_soir: feuillePriere, chapelet: feuilleChapelet, exercices: feuilleExercices,
    course: feuilleCourse, lecture: feuilleLecture, lecon: feuilleLecon }[q.contenu] || feuillePriere;
  let el = document.getElementById("feuille");
  if (!el) { // la coque n'est créée qu'une fois : pas d'animation à chaque mise à jour
    el = document.createElement("div"); el.id = "feuille";
    el.innerHTML = `<div class="voile" data-a="fermer-feuille-fond"><div class="feuille gouttiere grande" role="dialog" aria-modal="true" aria-labelledby="titre-feuille"></div></div>`;
    document.body.appendChild(el);
  }
  const f = el.querySelector(".feuille"), garderDefilement = f.scrollTop;
  const cat = CATS[q.cat] || CATS.discipline;
  f.innerHTML = `<div class="tete-feuille"><div class="tuile" style="background:${cat.f}">${ic(q.icone, cat.c, 20)}</div>
      <div class="t"><h2 id="titre-feuille">${esc(q.nom)}</h2><span>${esc(majuscule(dateLongue(k)))} · +${q.xp} XP</span></div>
      <button class="icone-btn" data-a="fermer-feuille" aria-label="Fermer">${ic("croixFermer", "currentColor", 18)}</button></div>
    <div id="minuteur" class="minuteur" hidden><b class="num">0:00</b><span></span><button class="btn" data-a="stop-minuteur">Arrêter</button></div>
    ${corps(q, j, k, fait)}`;
  f.scrollTop = garderDefilement;
  majMinuteur();
}
function boutonValider(q, fait, texte) {
  return fait ? `<div class="bandeau-ok">${ic("coche", "var(--vitalite)", 18, 3)} Quête accomplie. Bravo !</div>`
    : `<button class="btn-or large" data-a="valider-feuille" data-id="${q.id}">${texte}</button>`;
}
function bloc(titre, texte, cls = "") { return `<section class="bloc ${cls}"><h3>${esc(titre)}</h3><p>${esc(texte).replace(/\n/g, "<br>")}</p></section>`; }

function feuillePriere(q, j, k, fait) {
  const n = numJour(k);
  if (q.contenu === "priere_soir") {
    const p = PRIERES_SOIR[n % PRIERES_SOIR.length];
    return `<p class="note">Prends un moment au calme, avant de dormir.</p>` + bloc("Signe de croix", P.signe) +
      `<section class="bloc"><h3>Examen de conscience</h3><ol class="etapes">${EXAMEN.map(e => `<li>${esc(e)}</li>`).join("")}</ol></section>` +
      bloc(p.titre, p.texte, "fort") + bloc("Je vous salue Marie", P.ave) + bloc("Pour finir", P.remets) +
      boutonValider(q, fait, "J'ai prié · valider la quête");
  }
  const p = PRIERES_MATIN[n % PRIERES_MATIN.length], parole = PAROLES[n % PAROLES.length], intention = INTENTIONS[(n * 5) % INTENTIONS.length];
  return `<p class="note">Commence la journée avec Dieu : 5 à 10 minutes suffisent.</p>` + bloc("Signe de croix", P.signe) +
    bloc("Offrande de la journée", P.offrande) + bloc(p.titre, p.texte, "fort") +
    `<section class="bloc parole"><h3>Parole à méditer</h3><p>« ${esc(parole[0])} »</p><small>${esc(parole[1])}</small></section>` +
    bloc("Intention du jour", intention) + bloc("Notre Père", P.notrePere) + bloc("Gloire au Père", P.gloire) +
    boutonValider(q, fait, "J'ai prié · valider la quête");
}

function feuilleChapelet(q, j, k, fait) {
  const type = MYSTERES_DU_JOUR[jourSemaine(k)], mysteres = MYSTERES[type];
  const total = q.objectif || 1;
  const c = j.chapelet || (j.chapelet = { d: 0, ave: 0, debut: false });
  const faites = Number(j.q[q.id]) || 0;
  const premier = total >= 5 ? 0 : numJour(k) % 5; // une dizaine : le mystère change chaque jour
  let html = `<p class="note">Mystères ${type} (${JOURS_NOMS[jourSemaine(k)]}). ${total === 1 ? "Une dizaine aujourd'hui." : pluriel(total, "dizaine") + " aujourd'hui."}</p>
    <ol class="mysteres">${mysteres.map((m, i) => {
      const idx = total >= 5 ? i : (i === premier ? 0 : -1);
      const etat = idx < 0 ? "" : idx < faites ? "fini" : idx === faites ? "actuel" : "";
      return `<li class="${etat}">${esc(majuscule(m))}</li>`;
    }).join("")}</ol>`;
  if (!c.debut && faites === 0) {
    html += `<section class="bloc"><h3>Pour commencer</h3><p>Signe de croix, puis le Je crois en Dieu, un Notre Père, trois Je vous salue Marie et un Gloire au Père.</p>
      <details><summary>Afficher le Je crois en Dieu</summary><p>${esc(P.credo)}</p></details></section>
      <button class="btn-or large" data-a="chapelet-debut">C'est fait, j'entre dans la première dizaine</button>`;
    return html;
  }
  if (faites >= total) return html + boutonValider(q, true, "");
  const mystere = total >= 5 ? mysteres[faites] : mysteres[premier];
  html += `<section class="bloc fort"><h3>Dizaine ${faites + 1}${total > 1 ? " sur " + total : ""} : ${esc(mystere)}</h3>
    <p>Annonce le mystère, prie un Notre Père, puis dix Je vous salue Marie en méditant la scène.</p></section>
    <button class="grain" data-a="ave" aria-label="Je vous salue Marie, ${c.ave} sur 10">
      <span class="num">${c.ave}<small>/10</small></span><em>Je vous salue Marie</em></button>
    <div class="grains" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<i class="${i < c.ave ? "on" : ""}"></i>`).join("")}</div>
    <details><summary>Le texte du Je vous salue Marie</summary><p>${esc(P.ave)}</p></details>`;
  if (c.ave >= 10) html += `<section class="bloc"><h3>Gloire au Père</h3><p>${esc(P.gloire)}</p><p class="note">Puis : « Ô mon Jésus, pardonnez-nous nos péchés, préservez-nous du feu de l'enfer, conduisez au ciel toutes les âmes, surtout celles qui ont le plus besoin de votre miséricorde. »</p></section>
    <button class="btn-or large" data-a="dizaine-finie" data-id="${q.id}">Dizaine terminée</button>`;
  return html;
}

function seanceDuJour(k) {
  const s = SEANCES[jourSemaine(k)], semaine = Math.floor(numJour(k) / 7);
  const debut = semaine % s.exos.length;
  const ids = Array.from({ length: Math.min(5, s.exos.length) }, (_, i) => s.exos[(debut + i) % s.exos.length]);
  return { titre: s.titre, exos: ids.map(id => Object.assign({ id }, EXOS[id])) };
}
function feuilleExercices(q, j, k, fait) {
  const s = seanceDuJour(k), tours = 3, coches = j.seance || {};
  let html = `<p class="note">Séance « ${esc(s.titre)} » · environ 25 min · ${tours} tours du circuit, 30 s de repos entre les exercices, 90 s entre les tours.</p>
    <section class="bloc"><h3>Échauffement (4 min)</h3><ul class="liste-simple">${ECHAUFFEMENT.map(([n, d]) => `<li><span>${esc(n)}</span><b>${esc(d)}</b></li>`).join("")}</ul></section>
    <section class="bloc fort"><h3>Circuit</h3>`;
  s.exos.forEach((e, i) => {
    html += `<div class="exo"><div class="exo-t"><b>${esc(e.nom)}</b><span class="num">${e.m === "sec" ? e.v + " s" : e.v + " répétitions"}</span></div>
      <p>${esc(e.c)}</p><div class="exo-b">${Array.from({ length: tours }, (_, t) => {
        const cle = i + "_" + t, on = !!coches[cle];
        return `<button class="tour ${on ? "on" : ""}" data-a="tour" data-c="${cle}" aria-pressed="${on}" aria-label="${esc(e.nom)}, tour ${t + 1}">${t + 1}</button>`;
      }).join("")}${e.m === "sec" ? `<button class="btn-mini" data-a="minuteur" data-s="${e.v}" data-l="${esc(e.nom)}">${ic("lecture", "currentColor", 12, 2.4)} ${e.v} s</button>` : ""}</div></div>`;
  });
  html += `<div class="rangee"><button class="btn" data-a="minuteur" data-s="30" data-l="Repos">Repos 30 s</button><button class="btn" data-a="minuteur" data-s="90" data-l="Repos entre deux tours">Repos 90 s</button></div></section>
    <section class="bloc"><h3>Retour au calme</h3><ul class="liste-simple">${RETOUR_CALME.map(([n, d]) => `<li><span>${esc(n)}</span><b>${esc(d)}</b></li>`).join("")}</ul></section>
    <p class="note">Trop facile ? Ajoute 2 répétitions ou 10 secondes. Douleur articulaire : arrête l'exercice.</p>`;
  return html + boutonValider(q, fait, "Séance terminée · valider la quête");
}
function feuilleCourse(q, j, k, fait) {
  const c = COURSES[numJour(k) % COURSES.length];
  return `<p class="note">Séance du jour · ${esc(c.duree)}</p>
    <section class="bloc fort"><h3>${esc(c.titre)}</h3><ol class="etapes">${c.etapes.map(e => `<li>${esc(e)}</li>`).join("")}</ol></section>
    <div class="rangee"><button class="btn" data-a="minuteur" data-s="600" data-l="Échauffement">Minuteur 10 min</button><button class="btn" data-a="minuteur" data-s="1800" data-l="Course">Minuteur 30 min</button></div>
    <p class="note">Bois avant et après. En cas de douleur, passe à la marche rapide.</p>` + boutonValider(q, fait, "Séance terminée · valider la quête");
}
function feuilleLecture(q, j, k, fait) {
  const idee = LECTURES[numJour(k) % LECTURES.length], v = Number(j.q[q.id]) || 0;
  return `<section class="bloc fort"><h3>Idée de lecture</h3><p>${esc(idee)}</p></section>
    <section class="bloc"><h3>Mes pages aujourd'hui</h3><div class="compteur grand-compteur">
      <button data-a="moins" data-id="${q.id}" aria-label="Retirer ${q.pas || 1} pages">${ic("moins", "currentColor", 18, 2.5)}</button>
      <output class="num">${v} / ${q.objectif} ${esc(q.unite || "")}</output>
      <button data-a="plus" data-id="${q.id}" aria-label="Ajouter ${q.pas || 1} pages">${ic("plus", "currentColor", 18, 2.5)}</button></div></section>` +
    (fait ? boutonValider(q, true, "") : `<p class="note">La quête est validée dès que tu atteins ${q.objectif} ${esc(q.unite || "pages")}.</p>`);
}
function feuilleLecon(q, j, k, fait) {
  const obj = q.objectif || 1, ok = Number(j.q[q.id]) || 0;
  if (!j.lecon) nouvelleLecon(k);
  const cur = j.lecon, l = leconParId(cur.id);
  let html = `<div class="progres-lecon">${Array.from({ length: obj }, (_, i) => `<i class="${i < ok ? "on" : ""}"></i>`).join("")}<span class="num">${Math.min(ok, obj)} / ${obj} réussies${ok > obj ? " (+" + (ok - obj) + " en bonus)" : ""}</span></div>
    <section class="bloc lecon"><span class="matiere">${ic(l.m === "calcul" ? "calcul" : l.m === "sciences" ? "flacon" : "livre_ouvert", "currentColor", 14)} ${esc(MATIERES[l.m] || "")}</span>
      <h3>${esc(l.t)}</h3><p>${esc(l.x)}</p></section>
    <section class="bloc question"><h3>Question</h3><p class="q">${esc(l.q)}</p>`;
  if (cur.etat === "question") {
    html += `<form data-form="lecon" data-id="${q.id}" autocomplete="off"><label for="reponse" class="lab">Ta réponse</label>
      <div class="ligne-reponse"><input type="text" id="reponse" value="${esc(cur.saisie || "")}" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done">
      <button class="btn-or" type="submit">Vérifier</button></div></form>`;
    if (cur.message) html += `<p class="retour ko" role="alert">${esc(cur.message)}</p>`;
  } else if (cur.etat === "juste") {
    html += `<p class="retour ok" role="status">${ic("coche", "var(--vitalite)", 16, 3)} Bonne réponse : ${esc(cur.saisie)}</p>`;
  } else {
    html += `<p class="retour ko" role="status">La réponse était : <b>${esc(l.r[0])}</b>. Retiens-la, elle reviendra plus tard.</p>`;
  }
  html += `</section>`;
  if (cur.etat !== "question") {
    html += fait && ok >= obj ? `<div class="bandeau-ok">${ic("coche", "var(--vitalite)", 18, 3)} Quête « ${esc(q.nom)} » accomplie !</div>
      <button class="btn large" data-a="lecon-suivante">Encore une leçon (pour le plaisir)</button>`
      : `<button class="btn-or large" data-a="lecon-suivante">Leçon suivante</button>`;
  }
  return html;
}

function resumeJours(js) {
  js = js || TOUS;
  if (js.length === 7) return "Tous les jours";
  const k = [...js].sort().join(",");
  if (k === "0,1,2,3,4") return "En semaine";
  if (k === "5,6") return "Le week-end";
  return [...js].sort().map(i => JOURS_NOMS[i].slice(0, 3)).join(", ");
}
function interrupteur(action, actif, label, id) {
  return `<button class="interrupteur" role="switch" aria-checked="${!!actif}" aria-label="${esc(label)}" data-a="${action}"${id ? ` data-id="${id}"` : ""}></button>`;
}
function vueReglages() {
  const p = S.params;
  let html = `<div class="vue gouttiere"><h1 class="page-titre">Réglages</h1>
    <div class="carte"><div class="champ"><label for="nom-heros">Nom du héros</label><input type="text" id="nom-heros" value="${esc(S.nom)}" maxlength="30" autocomplete="off"></div></div>
    <div class="titre-section"><h2 style="font-size:17px">Mes quêtes</h2><button class="btn-or" data-a="nouvelle">${ic("plus", "currentColor", 16, 2.5)} Nouvelle</button></div>
    <div class="carte" style="gap:0">`;
  S.quetes.forEach((q, i) => {
    const c = CATS[q.cat] || CATS.discipline;
    html += `<div class="q-ligne ${q.actif ? "" : "inactive"}">
      <div class="tuile" style="width:36px;height:36px;background:${c.f}">${ic(q.icone, c.c, 18)}</div>
      <div class="t"><b>${esc(q.nom)}</b><span>${c.nom} · +${q.xp} XP · ${esc(resumeJours(q.jours))}${q.contenu ? " · " + CONTENUS[q.contenu] : ""}</span></div>
      <button class="icone-btn" data-a="monter" data-i="${i}" aria-label="Monter ${esc(q.nom)}" ${i === 0 ? "disabled" : ""}>${ic("haut", "currentColor", 16)}</button>
      <button class="icone-btn" data-a="modifier" data-id="${q.id}" aria-label="Modifier ${esc(q.nom)}">${ic("modifier", "currentColor", 16)}</button>
      ${interrupteur("activer", q.actif, (q.actif ? "Désactiver " : "Activer ") + q.nom, q.id)}
    </div>`;
  });
  html += `</div>
    <h2 style="font-size:17px">Leçons</h2>
    <div class="carte"><span class="lab">Matières proposées dans la quête « Apprendre »</span><div class="puces">${Object.entries(MATIERES).map(([m, t]) =>
      `<button class="puce ${p.matieres.includes(m) ? "on" : ""}" data-a="matiere" data-v="${m}" aria-pressed="${p.matieres.includes(m)}">${t}</button>`).join("")}</div>
      <p class="note" style="margin:0">${LECONS.length} leçons écrites et un calcul mental renouvelé sans fin. Le nombre de leçons par jour se règle dans la quête « Apprendre ».</p></div>
    <h2 style="font-size:17px">Règles du jeu</h2>
    <div class="carte" style="gap:0">
      <div class="reglage"><div class="t"><b>Jour réussi</b><span>Part minimale des quêtes à accomplir pour ne pas perdre de niveau</span></div>
        <select id="seuil" aria-label="Jour réussi">${[[0.5, "50 %"], [0.7, "70 %"], [1, "100 %"]].map(([v, t]) => `<option value="${v}" ${p.seuil === v ? "selected" : ""}>${t}</option>`).join("")}</select></div>
      <div class="reglage"><div class="t"><b>Perte de niveau</b><span>Quand la journée n'est pas réussie</span></div>
        <select id="penalite" aria-label="Perte de niveau"><option value="rupture" ${p.penalite !== "jour" ? "selected" : ""}>Une fois par série rompue</option><option value="jour" ${p.penalite === "jour" ? "selected" : ""}>À chaque jour manqué</option></select></div>
      <div class="reglage"><div class="t"><b>Début de la journée</b><span>Pour les couche-tard : une quête faite à 1 h compte pour la veille</span></div>
        <select id="debut" aria-label="Début de la journée">${[0, 1, 2, 3, 4, 5].map(h => `<option value="${h}" ${p.debut === h ? "selected" : ""}>${h === 0 ? "Minuit" : h + " h"}</option>`).join("")}</select></div>
      <div class="reglage"><div class="t"><b>Quête surprise</b><span>Une quête bonus différente chaque jour (ne compte pas pour le jour réussi)</span></div>${interrupteur("param-surprise", p.surprise, "Quête surprise")}</div>
      <div class="reglage"><div class="t"><b>Sons</b><span>Carillon des quêtes et fin des minuteurs</span></div>${interrupteur("param-son", p.son, "Sons")}</div>
    </div>
    <h2 style="font-size:17px">Sauvegarde</h2>
    <div class="carte">
      <p class="note" style="margin:0">Tes données restent sur cet appareil. Exporte-les de temps en temps (et avant de changer de téléphone) pour ne rien perdre.</p>
      <div class="rangee"><button class="btn" data-a="exporter">Exporter</button><label class="btn" for="fichier-import" style="display:inline-flex;align-items:center">Importer un fichier</label>
        <input type="file" id="fichier-import" accept=".json,application/json" hidden></div>
      ${SAUVEGARDE_TXT ? `<div class="champ"><span class="lab">Ta sauvegarde (à copier dans une note ou un e-mail)</span><code class="bloc-code" id="txt-sauvegarde">${esc(SAUVEGARDE_TXT)}</code>
        <div class="rangee"><button class="btn" data-a="copier">Copier</button></div></div>` : ""}
      <div class="champ"><label for="coller-import">…ou colle ici une sauvegarde</label><textarea id="coller-import" style="min-height:60px" placeholder="{&quot;v&quot;:2, …}"></textarea>
        <div class="rangee"><button class="btn" data-a="importer-texte">Restaurer ce texte</button></div></div>
      ${IMPORT_MSG ? `<p class="note" style="margin:0;color:var(--or)">${esc(IMPORT_MSG)}</p>` : ""}
      ${CONFIRMER && CONFIRMER.type === "import" ? `<div class="rangee"><button class="btn danger" data-a="confirmer-import">Remplacer toutes mes données</button><button class="btn" data-a="annuler">Annuler</button></div>` : ""}
    </div>
    <h2 style="font-size:17px">Installer sur l'iPhone</h2>
    <div class="carte note"><ol>
      <li>Ouvre l'adresse de Mes Quêtes dans <b>Safari</b>.</li>
      <li>Touche le bouton <b>Partager</b> (carré avec une flèche).</li>
      <li>Choisis <b>« Sur l'écran d'accueil »</b>, puis <b>Ajouter</b>.</li></ol>
      L'app s'ouvre alors en plein écran et fonctionne sans connexion.</div>
    <div class="carte">
      ${CONFIRMER && CONFIRMER.type === "reset" ? `<p class="note" style="margin:0">Tout effacer : niveau, historique, journal et quêtes personnalisées ?</p>
        <div class="rangee"><button class="btn danger" data-a="confirmer-reset">Oui, tout effacer</button><button class="btn" data-a="annuler">Annuler</button></div>`
      : `<button class="btn danger" data-a="reset">Recommencer à zéro</button>`}
    </div>
    <p class="note" style="text-align:center">Mes Quêtes 2.0</p>
  </div>`;
  return html;
}

// ------------------------------------------------------------------ éditeur de quête
function ouvrirEditeur(id) {
  const q = id ? queteId(id) : { id: "", nom: "", detail: "", cat: "savoir", xp: 30, type: "case", objectif: 10, unite: "min", pas: 5, jours: TOUS, moment: "journee", icone: "etoile", contenu: "", actif: true };
  EDITION = JSON.parse(JSON.stringify(q));
  EDITION.jours = EDITION.jours || TOUS;
  EDITION.contenu = EDITION.contenu || "";
  CONFIRMER = null;
  rendre();
}
function rendreEditeur() {
  const e = EDITION, imposeCompteur = e.contenu === "lecon" || e.contenu === "chapelet";
  let ed = document.getElementById("editeur");
  if (!ed) { ed = document.createElement("div"); ed.id = "editeur"; document.body.appendChild(ed); }
  ed.innerHTML = `<div class="voile" data-a="fermer-editeur-fond"><div class="feuille gouttiere" role="dialog" aria-modal="true" aria-labelledby="titre-ed">
    <h2 id="titre-ed">${e.id ? "Modifier la quête" : "Nouvelle quête"}</h2>
    <div class="champ"><label for="ed-nom">Nom</label><input type="text" id="ed-nom" value="${esc(e.nom)}" maxlength="40" placeholder="Ex. : Lecture" autocomplete="off"></div>
    <div class="champ"><label for="ed-detail">Précision</label><input type="text" id="ed-detail" value="${esc(e.detail)}" maxlength="60" placeholder="Ex. : 20 pages d'un roman" autocomplete="off"></div>
    <div class="champ"><label for="ed-contenu">Proposition du jour</label><select id="ed-contenu">${Object.entries(CONTENUS).map(([v, t]) => `<option value="${v}" ${e.contenu === v ? "selected" : ""}>${t}</option>`).join("")}</select></div>
    <div class="champ"><span class="lab">Caractéristique</span><div class="puces">${Object.entries(CATS).map(([k, c]) =>
      `<button class="puce ${e.cat === k ? "on" : ""}" data-a="ed-cat" data-v="${k}" aria-pressed="${e.cat === k}">${c.nom}</button>`).join("")}</div></div>
    <div class="champ"><span class="lab">Récompense (60 XP et plus : quête rare, 80 et plus : épique)</span><div class="puces">${XP_CHOIX.map(x =>
      `<button class="puce num ${e.xp === x ? "on" : ""}" data-a="ed-xp" data-v="${x}" aria-pressed="${e.xp === x}">+${x}</button>`).join("")}</div></div>
    ${imposeCompteur ? `<div class="champ"><label for="ed-obj">${e.contenu === "lecon" ? "Leçons à réussir par jour" : "Dizaines par jour (5 = chapelet complet)"}</label>
        <input type="number" id="ed-obj" min="1" max="${e.contenu === "lecon" ? 20 : 5}" value="${e.objectif || 1}" inputmode="numeric"></div>`
      : `<div class="champ"><span class="lab">Type</span><div class="puces">
      <button class="puce ${e.type === "case" ? "on" : ""}" data-a="ed-type" data-v="case" aria-pressed="${e.type === "case"}">À cocher</button>
      <button class="puce ${e.type === "compteur" ? "on" : ""}" data-a="ed-type" data-v="compteur" aria-pressed="${e.type === "compteur"}">À compter (pages, minutes, verres…)</button></div></div>
    ${e.type === "compteur" ? `<div class="deux"><div class="champ"><label for="ed-obj">Objectif</label><input type="number" id="ed-obj" min="1" max="10000" value="${e.objectif || 10}" inputmode="numeric"></div>
      <div class="champ"><label for="ed-unite">Unité</label><input type="text" id="ed-unite" value="${esc(e.unite || "")}" maxlength="12" placeholder="pages"></div></div>
      <div class="champ"><label for="ed-pas">Ajout à chaque appui</label><input type="number" id="ed-pas" min="1" max="1000" value="${e.pas || 1}" inputmode="numeric"></div>` : ""}`}
    <div class="champ"><span class="lab">Jours</span><div class="puces">${JOURS_COURTS.map((x, i) =>
      `<button class="puce ${e.jours.includes(i) ? "on" : ""}" data-a="ed-jour" data-v="${i}" aria-pressed="${e.jours.includes(i)}" aria-label="${JOURS_NOMS[i]}" style="min-width:40px">${x}</button>`).join("")}</div>
      <div class="puces"><button class="lien-bouton" data-a="ed-jours" data-v="tous">Tous les jours</button><button class="lien-bouton" data-a="ed-jours" data-v="semaine">En semaine</button><button class="lien-bouton" data-a="ed-jours" data-v="weekend">Le week-end</button></div></div>
    <div class="champ"><span class="lab">Moment</span><div class="puces">${Object.entries(MOMENTS).map(([k, t]) =>
      `<button class="puce ${e.moment === k ? "on" : ""}" data-a="ed-moment" data-v="${k}" aria-pressed="${e.moment === k}">${t}</button>`).join("")}</div></div>
    <div class="champ"><span class="lab">Icône</span><div class="grille-icones">${ICONES_QUETE.map(n =>
      `<button class="${e.icone === n ? "on" : ""}" data-a="ed-icone" data-v="${n}" aria-label="Icône ${n.replace("_", " ")}" aria-pressed="${e.icone === n}">${ic(n, e.icone === n ? (CATS[e.cat] || CATS.savoir).c : "var(--doux)", 22)}</button>`).join("")}</div></div>
    <p class="note" id="ed-erreur" style="margin:0;color:var(--rouge)" hidden></p>
    <div class="rangee"><button class="btn-or" data-a="ed-enregistrer" style="flex:1">Enregistrer</button><button class="btn" data-a="fermer-editeur">Annuler</button></div>
    ${e.id ? (CONFIRMER && CONFIRMER.type === "suppr" ? `<div class="rangee"><button class="btn danger" data-a="ed-supprimer-ok" style="flex:1">Supprimer définitivement</button><button class="btn" data-a="annuler-ed">Garder</button></div>`
      : `<button class="btn danger" data-a="ed-supprimer">Supprimer cette quête</button>`) : ""}
  </div></div>`;
}
function lireEditeur() {
  const v = id => { const el = document.getElementById(id); return el ? el.value : null; };
  if (v("ed-nom") != null) EDITION.nom = v("ed-nom");
  if (v("ed-detail") != null) EDITION.detail = v("ed-detail");
  if (v("ed-obj") != null) EDITION.objectif = Math.max(1, parseInt(v("ed-obj"), 10) || 1);
  if (v("ed-unite") != null) EDITION.unite = v("ed-unite");
  if (v("ed-pas") != null) EDITION.pas = Math.max(1, parseInt(v("ed-pas"), 10) || 1);
  if (v("ed-contenu") != null) appliquerContenu(v("ed-contenu"));
}
function appliquerContenu(c) {
  const e = EDITION;
  if (c === e.contenu) return;
  e.contenu = c;
  if (c === "lecon") Object.assign(e, { type: "compteur", objectif: Math.min(e.objectif || 3, 20) || 3, unite: "leçons", pas: 1 });
  if (c === "chapelet") Object.assign(e, { type: "compteur", objectif: 1, unite: "dizaine", pas: 1 });
  if (c === "lecture" && e.type !== "compteur") Object.assign(e, { type: "compteur", objectif: 20, unite: "pages", pas: 5 });
}
function fermerEditeur() { EDITION = null; CONFIRMER = null; const ed = document.getElementById("editeur"); if (ed) ed.remove(); rendre(); }
function enregistrerEditeur() {
  lireEditeur();
  const e = EDITION, err = document.getElementById("ed-erreur");
  e.nom = (e.nom || "").trim();
  if (!e.nom) { err.textContent = "Donne un nom à la quête."; err.hidden = false; return; }
  if (!e.jours.length) { err.textContent = "Choisis au moins un jour."; err.hidden = false; return; }
  if (e.contenu === "chapelet") e.objectif = Math.min(5, e.objectif || 1);
  if (e.contenu === "chapelet") e.unite = e.objectif > 1 ? "dizaines" : "dizaine";
  e.jours.sort();
  if (e.id) { const i = S.quetes.findIndex(q => q.id === e.id); S.quetes[i] = e; }
  else { e.id = "q" + Date.now().toString(36); S.quetes.push(e); }
  sauver();
  fermerEditeur();
  toast("Quête enregistrée", e.nom);
}

// ------------------------------------------------------------------ sauvegarde
function exporter() {
  const texte = JSON.stringify(S);
  SAUVEGARDE_TXT = texte;
  try {
    const url = URL.createObjectURL(new Blob([texte], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url; a.download = "mes-quetes-" + aujourdhui() + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  } catch (e) { /* le texte reste affiché pour être copié */ }
  rendre();
}
function preparerImport(texte) {
  try {
    const s = JSON.parse(texte);
    if (!valide(s)) throw new Error();
    CONFIRMER = { type: "import", donnees: completer(s) };
    IMPORT_MSG = `Sauvegarde lue : ${Object.keys(s.jours).length} jour(s) d'historique, ${s.quetes.length} quête(s).`;
  } catch (e) { CONFIRMER = null; IMPORT_MSG = "Ce texte n'est pas une sauvegarde de Mes Quêtes."; }
  rendre();
}

// ------------------------------------------------------------------ événements
document.addEventListener("click", ev => {
  const el = ev.target.closest("[data-a]");
  if (!el) return;
  const a = el.dataset.a, id = el.dataset.id;
  if (a === "fermer-editeur-fond") { if (ev.target === el) fermerEditeur(); return; }
  if (a === "fermer-feuille-fond") { if (ev.target === el) fermerFeuille(); return; }
  switch (a) {
    case "vue": VUE = el.dataset.v; EDITION = null; CONFIRMER = null; IMPORT_MSG = ""; rendre(); scrollTo(0, 0); break;
    case "basculer": basculer(id, ev); break;
    case "plus": compter(id, 1, ev); break;
    case "moins": compter(id, -1, ev); break;
    case "basculer-jour": basculer(id, ev, JOUR_SEL); break;
    case "ouvrir": ouvrirFeuille(id); break;
    case "fermer-feuille": fermerFeuille(); break;
    case "valider-feuille": { const j = jour(aujourdhui()); if (!j.gains[id]) basculer(id, ev); break; }
    case "minuteur": lancerMinuteur(Number(el.dataset.s), el.dataset.l); break;
    case "stop-minuteur": arreterMinuteur(); break;
    case "tour": { const j = jour(aujourdhui()); j.seance = j.seance || {}; j.seance[el.dataset.c] = !j.seance[el.dataset.c]; sauver(); rendreFeuille(); break; }
    case "lecon-suivante": nouvelleLecon(aujourdhui()); sauver(); rendreFeuille(); setTimeout(() => { const i = document.getElementById("reponse"); if (i) i.focus(); }, 50); break;
    case "chapelet-debut": { const j = jour(aujourdhui()); j.chapelet = j.chapelet || { d: 0, ave: 0 }; j.chapelet.debut = true; sauver(); rendreFeuille(); break; }
    case "ave": { const j = jour(aujourdhui()); j.chapelet = j.chapelet || { d: 0, ave: 0, debut: true }; if (j.chapelet.ave < 10) j.chapelet.ave++; if (j.chapelet.ave === 10) son("quete"); sauver(); rendreFeuille(); break; }
    case "dizaine-finie": {
      const j = jour(aujourdhui()), q = queteId(id);
      memoriser();
      j.q[id] = (Number(j.q[id]) || 0) + 1;
      j.chapelet = { d: j.q[id], ave: 0, debut: true };
      if (estFaite(q, j.q[id]) && !j.gains[id]) { gagner(j, id, q); flotte(ev, "+" + q.xp + " XP"); son("quete"); }
      if (!j.liste.includes(id)) j.liste.push(id);
      apres(); break;
    }
    case "surprise": surpriseFaite(ev); break;
    case "changer-surprise": changerSurprise(); break;
    case "coffre": ouvrirCoffre(); break;
    case "fermer-celebration": el.closest(".celebration").remove(); break;
    case "mois": { const [y, m] = MOIS_VU.split("-").map(Number); const d = new Date(y, m - 1 + Number(el.dataset.s), 1); MOIS_VU = iso(d).slice(0, 7); rendre(); break; }
    case "jour": JOUR_SEL = el.dataset.k; rendre(); break;
    case "humeur": case "energie": { const j = jour(JOUR_SEL); j[a] = j[a] === el.dataset.h ? "" : el.dataset.h; sauver(); rendre(); break; }
    case "nouvelle": ouvrirEditeur(null); break;
    case "modifier": ouvrirEditeur(id); break;
    case "activer": { const q = queteId(id); q.actif = !q.actif; sauver(); rendre(); break; }
    case "monter": { const i = Number(el.dataset.i); if (i > 0) { [S.quetes[i - 1], S.quetes[i]] = [S.quetes[i], S.quetes[i - 1]]; sauver(); rendre(); } break; }
    case "matiere": { const m = el.dataset.v, ms = S.params.matieres; S.params.matieres = ms.includes(m) ? ms.filter(x => x !== m) : [...ms, m]; if (!S.params.matieres.length) S.params.matieres = [m]; sauver(); rendre(); break; }
    case "param-surprise": S.params.surprise = !S.params.surprise; sauver(); rendre(); break;
    case "param-son": S.params.son = !S.params.son; sauver(); rendre(); if (S.params.son) son("quete"); break;
    case "exporter": exporter(); break;
    case "copier": {
      const repli = () => { const c = document.getElementById("txt-sauvegarde"); const r = document.createRange(); r.selectNodeContents(c); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast("Texte sélectionné", "Copie-le avec le menu de ton appareil."); };
      try { navigator.clipboard.writeText(SAUVEGARDE_TXT).then(() => toast("Sauvegarde copiée", "Colle-la dans une note ou un e-mail."), repli); } catch (e) { repli(); }
      break;
    }
    case "importer-texte": preparerImport(document.getElementById("coller-import").value); break;
    case "confirmer-import": S = CONFIRMER.donnees; S.penalitesVues = Math.max(S.penalitesVues, stats().penalites.length); CONFIRMER = null; IMPORT_MSG = "Données restaurées."; SAUVEGARDE_TXT = ""; sauver(); rendre(); break;
    case "reset": CONFIRMER = { type: "reset" }; rendre(); break;
    case "confirmer-reset": S = etatInitial(); CONFIRMER = null; SAUVEGARDE_TXT = ""; IMPORT_MSG = ""; sauver(); VUE = "quetes"; rendre(); break;
    case "annuler": CONFIRMER = null; IMPORT_MSG = ""; rendre(); break;
    // éditeur
    case "annuler-ed": CONFIRMER = null; rendreEditeur(); break;
    case "ed-cat": lireEditeur(); EDITION.cat = el.dataset.v; rendreEditeur(); break;
    case "ed-xp": lireEditeur(); EDITION.xp = Number(el.dataset.v); rendreEditeur(); break;
    case "ed-type": lireEditeur(); EDITION.type = el.dataset.v; rendreEditeur(); break;
    case "ed-moment": lireEditeur(); EDITION.moment = el.dataset.v; rendreEditeur(); break;
    case "ed-icone": lireEditeur(); EDITION.icone = el.dataset.v; rendreEditeur(); break;
    case "ed-jour": { lireEditeur(); const i = Number(el.dataset.v), js = EDITION.jours; EDITION.jours = js.includes(i) ? js.filter(x => x !== i) : [...js, i]; rendreEditeur(); break; }
    case "ed-jours": lireEditeur(); EDITION.jours = { tous: TOUS.slice(), semaine: [0, 1, 2, 3, 4], weekend: [5, 6] }[el.dataset.v]; rendreEditeur(); break;
    case "ed-enregistrer": enregistrerEditeur(); break;
    case "fermer-editeur": fermerEditeur(); break;
    case "ed-supprimer": lireEditeur(); CONFIRMER = { type: "suppr" }; rendreEditeur(); break;
    case "ed-supprimer-ok": S.quetes = S.quetes.filter(q => q.id !== EDITION.id); sauver(); fermerEditeur(); break;
  }
});
document.addEventListener("submit", ev => {
  const f = ev.target;
  if (f.dataset.form === "lecon") {
    ev.preventDefault();
    verifierLecon(f.dataset.id, document.getElementById("reponse").value, { target: f.querySelector("button") });
    const i = document.getElementById("reponse");
    if (i) i.focus();
  }
});
document.addEventListener("input", ev => {
  const t = ev.target;
  if (t.id === "note-jour") { jour(t.dataset.k).note = t.value; sauver(); }
  else if (t.id === "nom-heros") { S.nom = t.value.trim(); sauver(); }
  else if (t.id === "reponse") { const j = jour(aujourdhui()); if (j.lecon) j.lecon.saisie = t.value; }
});
document.addEventListener("change", ev => {
  const t = ev.target;
  if (t.id === "seuil") { S.params.seuil = Number(t.value); sauver(); }
  else if (t.id === "penalite") { S.params.penalite = t.value; sauver(); }
  else if (t.id === "debut") { S.params.debut = Number(t.value); sauver(); }
  else if (t.id === "ed-contenu") { lireEditeur(); rendreEditeur(); }
  else if (t.id === "fichier-import" && t.files && t.files[0]) {
    const r = new FileReader();
    r.onload = () => preparerImport(String(r.result));
    r.readAsText(t.files[0]);
  }
});
document.addEventListener("keydown", ev => {
  if (ev.key === "Escape") {
    const c = document.querySelector(".celebration");
    if (c) c.remove(); else if (EDITION) fermerEditeur(); else if (FEUILLE) fermerFeuille();
  }
});
// changement de jour pendant que l'app est ouverte
let dernierJour = aujourdhui();
function verifierJour() { if (aujourdhui() !== dernierJour) { dernierJour = aujourdhui(); JOUR_SEL = null; MOIS_VU = null; if (FEUILLE) fermerFeuille(); rendre(); annoncerPenalites(); } }
document.addEventListener("visibilitychange", () => { if (!document.hidden) verifierJour(); });
setInterval(verifierJour, 60000);

// premier lancement : les jours passés avant l'installation ne comptent pas
if (!S.penalitesVues) S.penalitesVues = 0;
sauver();
rendre();
annoncerPenalites();
if ("serviceWorker" in navigator && window.isSecureContext && location.protocol !== "file:" && !/claude|anthropic/.test(location.hostname)) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
