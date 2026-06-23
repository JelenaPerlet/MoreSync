import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// DATENBASIS — buchkonform nach Fast Like a Girl & Eat Like a Girl
// ═══════════════════════════════════════════════════════════════════

const PHASEN = {
  power1: {
    id: "power1", name: "Power Phase 1", subtitle: "Östrogen aufbauen",
    tage: "Tag 1–10", farbe: "#7C9E87", hellFarbe: "#EBF2ED",
    beschreibung: "Östrogen steigt langsam an. Ketobiotic-Ernährung ist ideal: wenig Kohlenhydrate, hochwertiges Fett und Protein unterstützen die Östrogenproduktion. Längere Fastenzeiten sind jetzt gut verträglich.",
    hormoneLevel: { Östrogen: 45, Progesteron: 10, Testosteron: 30 },
    ernährungsstil: ["ketobiotic"],
    fastenEmpfehlung: ["13h","15h","17h","OMAD","24h","36h"],
    naehrstoffe: ["Gesunde Fette","Protein","Kreuzblütler","Fermentierte Lebensmittel","Omega-3"],
    lebensmittelFokus: ["Avocado","Lachs","Eier","Brokkoli","Kimchi","Sauerkraut","Nüsse","Olivenöl","Samen"],
    buchTipp: "Pelz: Ketobiotic, 50g KH/Tag, Protein 0,8g/kg. Sims: Intensivstes Training des Monats — 32% mehr Kraftzuwachs in dieser Phase möglich.",
    simsPhase: "🟢 Low Hormone Phase (Sims)",
    simsKompatibel: true,
    icon: "🌱",
  },
  manifestation: {
    id: "manifestation", name: "Manifestations-Phase", subtitle: "Ovulation & maximale Energie",
    tage: "Tag 11–15", farbe: "#C4845A", hellFarbe: "#FAF0E8",
    beschreibung: "Rund um den Eisprung: Östrogen und Testosteron sind auf dem Höhepunkt — maximale Energie, Fokus und Libido. Pelz empfiehlt hier kurz auf Hormone Feasting umzusteigen: mehr komplexe Kohlenhydrate und Protein. Dies ist die kürzeste, aber kraftvollste Phase.",
    hormoneLevel: { Östrogen: 100, Progesteron: 25, Testosteron: 100 },
    ernährungsstil: ["hormone_feasting"],
    fastenEmpfehlung: ["13h","15h"],
    naehrstoffe: ["Hochwertiges Protein","Bitterpflanzen","Vollkorn","Ballaststoffe","Zink"],
    lebensmittelFokus: ["Rindfleisch","Hülsenfrüchte","Quinoa","Rucola","Chicorée","Kürbiskerne","Sesam","Dunkle Schokolade"],
    buchTipp: "Pelz: Eisprung-Zeit! Hormone Feasting beginnt, Protein 1,0–1,2g/kg, bittere Grüns für Östrogen-Detox. Sims: Ovulations-Peak — dein monatlicher Kraft- und Koordinations-Höhepunkt. Achtung: Gelenke etwas lockerer durch Östrogen → gut aufwärmen.",
    simsPhase: "🟢 Ovulation / Ende Low Hormone Phase (Sims)",
    simsKompatibel: true,
    icon: "✨",
  },
  power2: {
    id: "power2", name: "Power Phase 2", subtitle: "Östrogen entgiften",
    tage: "Tag 16–19", farbe: "#8FAF6E", hellFarbe: "#EEF3E8",
    beschreibung: "Kurz nach dem Eisprung. Östrogen ist noch erhöht, Progesteron beginnt zu steigen. Pelz empfiehlt zurück zu Ketobiotic für einige Tage: Kreuzblütler und Ballaststoffe helfen der Leber beim Östrogen-Abbau, bevor die Nurture-Phase beginnt. Kurzes Fasten wieder möglich.",
    hormoneLevel: { Östrogen: 75, Progesteron: 45, Testosteron: 55 },
    ernährungsstil: ["ketobiotic","hormone_feasting"],
    fastenEmpfehlung: ["13h","15h"],
    naehrstoffe: ["Kreuzblütler","Ballaststoffe","Polyphenole","Phytoöstrogene","Antioxidantien"],
    lebensmittelFokus: ["Leinsamen","Brokkoli","Blumenkohl","Blaubeeren","Edamame","Artischocken","Kurkuma","Grüner Tee"],
    buchTipp: "Pelz: Kurze Rückkehr zu Ketobiotic. Leinsamen & Kreuzblütler für Östrogen-Detox der Leber. Sims: Beginn High Hormone Phase — Progesteron steigt, Intensität langsam reduzieren, mehr Protein.",
    simsPhase: "🟡 Frühe Lutealphase / High Hormone Beginn (Sims)",
    simsKompatibel: true,
    icon: "🌸",
  },
  nurture: {
    id: "nurture", name: "Nurture-Phase", subtitle: "Progesteron & Selbstfürsorge",
    tage: "Tag 20–28", farbe: "#9B7BAD", hellFarbe: "#F3EEF7",
    beschreibung: "Progesteron dominiert und braucht Unterstützung durch Magnesium und Vitamin B6. Komplexe Kohlenhydrate stabilisieren den Blutzucker und reduzieren PMS. Kürzere Fastenzeiten sind jetzt wichtig — Progesteron ist sensibel gegenüber zu viel Stress.",
    hormoneLevel: { Östrogen: 50, Progesteron: 100, Testosteron: 20 },
    ernährungsstil: ["hormone_feasting"],
    fastenEmpfehlung: ["13h"],
    naehrstoffe: ["Magnesium","Vitamin B6","Komplexe Kohlenhydrate","Tryptophan","Zink"],
    lebensmittelFokus: ["Süßkartoffeln","Kürbis","Dunkle Schokolade","Sesam","Hülsenfrüchte","Bananen","Haferflocken","Avocado"],
    buchTipp: "Pelz: Max. 13h fasten, Magnesium + B6 für Progesteron. Sims: High Hormone Phase — Körpertemperatur +0,5°C, Grundumsatz +100–300 kcal, sanftes Training, mehr Schlaf. Beide 100% einig: Jetzt erholen, nicht kämpfen.",
    simsPhase: "🔴 High Hormone Phase / Späte Lutealphase (Sims)",
    simsKompatibel: true,
    icon: "🌙",
  },
};

// ═══════════════════════════════════════════════════════════════════
// AUSFÜHRLICHE PHASEN-INFOS (aus Fast Like a Girl & Eat Like a Girl)
// ═══════════════════════════════════════════════════════════════════

const PHASEN_INFO = {
  power1: {
    hormone: "In den ersten Tagen sind alle drei Sexualhormone (Östrogen, Progesteron, Testosteron) auf dem niedrigsten Stand. Das klingt erstmal nach wenig — ist aber deine größte Stärke. Ohne den Einfluss schwankender Hormone denkst du klar, fühlst dich emotional stabil und belastbar. Ab etwa Tag 5–6 beginnt Östrogen langsam wieder zu steigen, was Energie und Stimmung sanft hebt.",
    gehirn: "Dein Gehirn ist jetzt im 'Reset-Modus'. Studien zeigen: In dieser Phase bist du analytisch, fokussiert und triffst rationale Entscheidungen leichter. Pelz beschreibt es als die Zeit, in der du dem Denken eines durchschnittlichen Mannes am ähnlichsten bist — klar und unbeeinflusst von Hormonschwankungen.",
    stimmung: "Du könntest dich anfangs (während der Blutung) etwas ruhiger oder zurückgezogener fühlen, aber emotional ausgeglichen. Ab Tag 4–5 kehrt die Energie zurück, viele fühlen sich optimistisch, klar und tatkräftig. Wenn du dich antriebslos fühlst: völlig normal an Tag 1–2, gönn dir Ruhe.",
    lifestyle: "Die ideale Zeit für Neuanfänge und klares Denken. Plane hierhin: neue Projekte starten, schwierige Problemlösungen, strategische Planung, Lernen von komplexem Stoff, wichtige Entscheidungen. Dein Gehirn arbeitet effizient und du hast die mentale Klarheit für Großes.",
    dos: ["Neue Projekte & Vorhaben starten", "Komplexe Aufgaben & Problemlösung", "Strategisch planen & Entscheidungen treffen", "Intensiv trainieren (siehe Training-Tab)", "Längeres Fasten ist gut verträglich"],
    donts: ["Dich an Tag 1–2 überfordern, falls Blutung anstrengend ist", "Pausen ganz weglassen — der Körper arbeitet trotzdem"],
    wusstestListe: [
      "An Tag 1 deines Zyklus startet nicht nur deine Periode, sondern auch ein hormoneller Neustart deines Gehirns — wie ein frisch aufgeräumter Schreibtisch.",
      "In dieser Phase verarbeitet dein Körper Kohlenhydrate besonders effizient — ideal, um intensiv zu trainieren und Kraft aufzubauen.",
      "Dein Schmerzempfinden ist jetzt am niedrigsten im ganzen Zyklus. Anstrengende Workouts fühlen sich leichter an als sonst.",
      "Mit niedrigen Hormonen denkst du klar und rational — die perfekte Zeit für wichtige Entscheidungen und strategische Planung.",
      "Östrogen beginnt ab Tag 5–6 langsam zu steigen und hebt deine Energie und Laune ganz sanft an.",
      "Dein Körper kann jetzt längere Fastenzeiten gut verkraften — Pelz empfiehlt sogar bis zu 36 Stunden möglich.",
    ],
  },
  manifestation: {
    hormone: "Östrogen erreicht jetzt seinen absoluten Höhepunkt, und kurz vor dem Eisprung (ca. Tag 14) schießt auch Testosteron nach oben. Diese Kombination ist ein wahres Power-Paket: Du strahlst, fühlst dich selbstbewusst, kommunikativ und voller Energie. Es ist die fruchtbarste und energiereichste Zeit deines Zyklus.",
    gehirn: "Östrogen pusht Serotonin und Dopamin — die Wohlfühl- und Motivations-Botenstoffe. Dein Sprachzentrum ist besonders aktiv: Du findest Worte leichter, wirkst überzeugender und sozialer. Pelz nennt es die 'Manifestations'-Phase, weil du jetzt am besten nach außen wirkst und Dinge in die Welt bringst.",
    stimmung: "Die meisten fühlen sich jetzt am besten: selbstbewusst, gesellig, attraktiv, energiegeladen und optimistisch. Deine Libido ist auf dem Höhepunkt. Wenn du dich in dieser Phase besonders gut fühlst — genieße es, das ist dein hormonelles Hoch!",
    lifestyle: "DIE Zeit für alles Kommunikative und Soziale. Plane hierhin: wichtige Gespräche, Gehaltsverhandlungen, Präsentationen, Vorstellungsgespräche, erste Dates, schwierige Konfliktgespräche, Networking, öffentliche Auftritte. Dein Charme und deine Schlagfertigkeit sind jetzt am größten.",
    dos: ["Wichtige Gespräche & Verhandlungen führen", "Präsentationen & öffentliche Auftritte", "Dates, Socializing, Networking", "Schwierige Themen ansprechen", "Maximale Trainingsleistung abrufen"],
    donts: ["Diese wertvolle Phase mit Routine-Kram verschwenden", "Aufwärmen vor Sport vergessen (Verletzungsrisiko durch lockere Gelenke)"],
    wusstestListe: [
      "Rund um den Eisprung ist dein Sprachzentrum besonders aktiv — kein Wunder, dass du dich jetzt so wortgewandt fühlst. Lege wichtige Gespräche genau in diese Tage!",
      "Östrogen pusht jetzt Serotonin und Dopamin — deine Wohlfühl- und Motivations-Botenstoffe. Deshalb fühlst du dich oft am besten.",
      "Deine Libido erreicht jetzt ihren Höhepunkt — das ist biologisch so gewollt, denn es ist deine fruchtbarste Zeit.",
      "Testosteron schießt kurz vor dem Eisprung nach oben und gibt dir extra Kraft, Selbstbewusstsein und Antrieb.",
      "Studien zeigen: Frauen wirken rund um den Eisprung selbstbewusster und überzeugender — nutze das für Verhandlungen!",
      "Deine Haut sieht in dieser Phase oft besonders gut aus — Östrogen fördert die Kollagenproduktion.",
    ],
  },
  power2: {
    hormone: "Der Eisprung ist vorbei. Östrogen fällt nach dem Peak kurz ab und steigt dann nochmal leicht, während Progesteron langsam anzusteigen beginnt. Es ist eine Übergangsphase — die letzte 'kraftvolle' Zeit, bevor der Körper in den ruhigeren Nurture-Modus wechselt.",
    gehirn: "Noch profitierst du vom Östrogen, aber das steigende Progesteron wirkt bereits leicht beruhigend. Viele fühlen sich jetzt produktiv, aber etwas 'geerdeter' als in der Manifestationsphase. Eine gute Zeit für konzentriertes Abarbeiten statt Brainstorming.",
    stimmung: "Du fühlst dich meist noch energiegeladen, aber ruhiger und fokussierter. Manche bemerken den ersten leichten Stimmungswechsel. Wenn du etwas weniger 'an' bist als rund um den Eisprung — das ist der natürliche Übergang, völlig normal.",
    lifestyle: "Die Zeit zum Abschließen und Organisieren. Plane hierhin: Projekte zu Ende bringen, Details verfeinern, aufräumen, Admin-Aufgaben, Buchhaltung, E-Mails abarbeiten, Listen abhaken. Du hast noch Energie, aber der Fokus verschiebt sich von 'Neues starten' zu 'Bestehendes abschließen'.",
    dos: ["Angefangene Projekte abschließen", "Organisieren, aufräumen, sortieren", "Detailarbeit & Admin-Aufgaben", "Zurück zu Ketobiotic-Ernährung", "Moderates Training"],
    donts: ["Große neue Projekte beginnen (besser für Power 1)", "Dich überfordern, wenn die Energie nachlässt"],
    wusstestListe: [
      "Nach dem Eisprung beginnt dein Körper, sich auf eine mögliche Schwangerschaft vorzubereiten — auch wenn keine eintritt. Deshalb braucht er ab jetzt langsam mehr Nährstoffe und Ruhe.",
      "Progesteron beginnt jetzt zu steigen und wirkt leicht beruhigend — du fühlst dich produktiv, aber geerdeter als rund um den Eisprung.",
      "Diese Phase eignet sich perfekt zum Abschließen von Projekten — dein Fokus verschiebt sich von 'Neues starten' zu 'Bestehendes vollenden'.",
      "Dein Körper kehrt jetzt gut zu einer Ketobiotic-Ernährung zurück — Kreuzblütler unterstützen die Leber beim Östrogen-Abbau.",
      "Die lockeren Gelenke aus der Eisprung-Zeit normalisieren sich wieder — das Verletzungsrisiko beim Sport sinkt.",
    ],
  },
  nurture: {
    hormone: "Progesteron dominiert jetzt und übertrifft das Östrogen. Beide erreichen ihren Höhepunkt etwa 3–5 Tage vor der Periode und fallen dann steil ab — dieser Abfall löst PMS aus. Progesteron ist ein beruhigendes Hormon, reagiert aber sehr empfindlich auf Stress und Cortisol.",
    gehirn: "Progesteron wirkt wie ein natürliches Beruhigungsmittel — du wirst nach innen gekehrter, sensibler und intuitiver. Dein Gehirn ist jetzt weniger auf 'nach außen wirken' und mehr auf 'nach innen spüren' eingestellt. Die Wahrnehmung für die eigenen Bedürfnisse und auch für Probleme wird schärfer. Reizbarkeit oder Traurigkeit vor der Periode kommen vom Hormonabfall — es ist biochemisch, nicht 'du'.",
    stimmung: "Du könntest dich zurückgezogener, sensibler, müder oder reizbarer fühlen — besonders in den letzten Tagen vor der Periode. Heißhunger ist normal (der Körper braucht mehr Energie). Wenn dich Kleinigkeiten mehr berühren als sonst: das ist der Progesteron-Einfluss, sei sanft mit dir.",
    lifestyle: "Die Zeit zum Zurückziehen und Auftanken — NICHT für Großes. Verschiebe wichtige Gespräche, Konfrontationen, Verhandlungen und große Entscheidungen lieber auf die Power- oder Manifestationsphase. Plane hierhin: Reflexion, Tagebuch, Abschluss & Loslassen, gemütliche Zeit, Selbstfürsorge, früh ins Bett. Sage auch mal Termine ab, wenn es dir zu viel wird.",
    dos: ["Zurückziehen & auftanken", "Reflektieren, journaln, nachspüren", "Selbstfürsorge: Bäder, Wärme, früh schlafen", "Sanfte Bewegung (Yoga, Spazieren)", "Komplexe Kohlenhydrate essen gegen PMS"],
    donts: ["Wichtige Gespräche & Konfrontationen (auf Power/Manifestation verschieben!)", "Große Entscheidungen treffen", "Vollen Terminkalender planen", "Intensives Training / langes Fasten", "Hart mit dir selbst sein"],
    wusstestListe: [
      "In der Nurture-Phase nimmt deine Intuition zu und du spürst eher, was in deinem Leben nicht stimmt. Statt dagegen anzukämpfen: notiere diese Gedanken und handle in der nächsten Power-Phase darauf.",
      "Progesteron wirkt wie ein natürliches Beruhigungsmittel — kein Wunder, dass du dich nach innen gekehrter und ruhebedürftiger fühlst.",
      "Reizbarkeit oder Traurigkeit vor der Periode kommen vom steilen Hormonabfall — es ist biochemisch, nicht 'du'. Sei sanft mit dir.",
      "Dein Grundumsatz ist jetzt um 100–300 Kalorien pro Tag erhöht — Heißhunger ist völlig normal, dein Körper braucht mehr Energie.",
      "Progesteron reagiert empfindlich auf Stress. Intensiver Sport oder langes Fasten können es jetzt senken — sanfte Bewegung ist besser.",
      "Komplexe Kohlenhydrate (Süßkartoffeln, Haferflocken) stabilisieren jetzt deinen Blutzucker und lindern PMS-Symptome.",
      "Deine Körpertemperatur ist in dieser Phase um etwa 0,5°C erhöht — deshalb fühlst du dich manchmal wärmer und schläfst unruhiger.",
    ],
  },
};

// Mondzyklus-Phasen-Infos für den Menopausen-Modus (symbolischer Rhythmus, ohne Periode/Eisprung)
const MOND_PHASEN_INFO = {
  power1: {
    kontext: "Neumond-Phase — Neubeginn. Auch ohne Zyklus gibt dir der Mondrhythmus jetzt einen Impuls für Klarheit und frische Energie. Eine gute Zeit, Neues zu planen und den Körper mit aufbauender Ernährung und Krafttraining zu stärken.",
    stimmung: "Viele fühlen sich in dieser Phase klarer und tatkräftiger. Wenn du dich nach dem oft unruhigen Vollmond-Abschnitt jetzt geerdeter fühlst — genieße diese ruhigere, fokussierte Energie. Ein guter Moment, um Dinge anzugehen, die Konzentration brauchen.",
    fokus: ["Neues beginnen", "Klar denken & planen", "Krafttraining", "Ketone aufbauen durch Fasten"],
    wusstestListe: [
      "Auch ohne Periode profitiert dein Körper von einem 30-Tage-Rhythmus — er gibt Struktur für Ernährung, Fasten und Training.",
      "In der Neumond-Phase kannst du gut längere Fastenfenster einbauen, die deine metabolische Flexibilität und Gehirnklarheit fördern.",
      "Krafttraining ist jetzt besonders wertvoll: Es schützt Muskeln und Knochen, die in der Menopause mehr Aufmerksamkeit brauchen.",
    ],
  },
  manifestation: {
    kontext: "Zunehmender Mond — die energiereichste Zeit im Mondzyklus. Nutze diese Tage für alles, was nach außen wirkt: Gespräche, Projekte, soziale Begegnungen. Dein Körper darf jetzt etwas mehr Kohlenhydrate aus Knollen bekommen.",
    stimmung: "In dieser Phase fühlst du dich oft energiegeladener, geselliger und selbstbewusster. Wenn du Lust auf Aktivität und Begegnungen hast — folge dem. Falls Hitzewallungen oder innere Unruhe dich begleiten: Bewegung an der frischen Luft und ausreichend Wasser helfen, die Energie zu kanalisieren.",
    fokus: ["Wichtige Gespräche", "Soziale Aktivitäten", "Etwas mehr Naturkohlenhydrate", "Aktiv & sichtbar sein"],
    wusstestListe: [
      "Der zunehmende Mond steht symbolisch für Fülle und Energie — eine gute Zeit, um aktiv und sichtbar zu sein.",
      "Auch in der Menopause darf dein Körper rund um diese Phase etwas mehr 'Naturkohlenhydrate' aus Knollen bekommen.",
      "Krafttraining mit etwas höherer Intensität passt gut in diese energiereiche Mondphase.",
    ],
  },
  power2: {
    kontext: "Vollmond-Phase — Höhepunkt und Übergang. Eine Zeit zum Abschließen und Organisieren. Danach beginnt der Körper, langsam herunterzufahren — unterstütze ihn mit nährstoffreicher, unverarbeiteter Kost.",
    stimmung: "Rund um den Vollmond fühlen sich manche besonders wach oder schlafen unruhiger. Wenn du innerlich aufgedreht bist, kann das normal sein. Nutze die Energie zum Abschließen, aber plane abends bewusst Ruhe ein — ein kühles Schlafzimmer und Magnesium können jetzt helfen.",
    fokus: ["Abschließen & ordnen", "Detailarbeit", "Unverarbeitet essen", "Moderate Bewegung"],
    wusstestListe: [
      "Der Vollmond markiert traditionell den Höhepunkt — eine gute Zeit, Angefangenes abzuschließen.",
      "Jetzt langsam von intensiver Bewegung zurückfahren und dem Körper mehr Erholung gönnen.",
      "Kreuzblütler und ballaststoffreiche Kost unterstützen jetzt die Entgiftung.",
    ],
  },
  nurture: {
    kontext: "Abnehmender Mond — Zeit zum Zurückziehen und Auftanken. Gerade in der Menopause ist Selbstfürsorge keine Schwäche, sondern Pflicht. Plane jetzt weniger, schlafe viel und sei sanft mit dir.",
    stimmung: "In dieser Phase darfst du dich ruhiger und zurückgezogener fühlen — das ist kein Rückschritt, sondern ein natürliches Bedürfnis nach Erholung. Wenn Müdigkeit, Reizbarkeit oder Sensibilität auftauchen: Sei sanft mit dir. Dein Körper bittet um Ruhe, nicht um Leistung.",
    fokus: ["Zurückziehen & auftanken", "Viel Schlaf", "Sanfte Bewegung", "Selbstfürsorge"],
    wusstestListe: [
      "Der abnehmende Mond lädt zum Loslassen und Auftanken ein — höre auf dein Ruhebedürfnis.",
      "Guter Schlaf ist in der Menopause die Basis für Stimmung, Gehirn und Hormonbalance.",
      "Sanfte Bewegung (Yoga, Spazieren) schützt jetzt vor zu viel Cortisol — intensives Training lieber in energiereichere Mondphasen legen.",
      "Magnesium am Abend kann helfen, wenn Schlafprobleme dich in dieser Phase begleiten.",
    ],
  },
};


// ═══════════════════════════════════════════════════════════════════
// MENOPAUSE-WISSEN (aus "Age Like a Girl" - Dr. Mindy Pelz)
// ═══════════════════════════════════════════════════════════════════

const MENOPAUSE_WISSEN = [
  {
    id: "gehirn", icon: "🧠", titel: "Dein Gehirn in der Menopause",
    text: "Der sogenannte 'Menopause-Nebel' (Konzentrationsprobleme, Wortfindung, Vergesslichkeit) ist real — aber kein Zeichen von Verfall. Dein Gehirn stellt durch den sinkenden Östrogenspiegel seinen Treibstoff um: von Glukose auf Ketone. Pelz beschreibt, dass viele Frauen geistige Klarheit zurückgewinnen, sobald sie ihren Stoffwechsel durch Fasten und die richtige Ernährung flexibel machen. Der Nebel lichtet sich, wenn das Gehirn den Treibstoff bekommt, den es jetzt braucht.",
    tipps: ["Metabolische Flexibilität durch Fasten aufbauen", "Stabiler Blutzucker (siehe Glukose-Hacks)", "Omega-3 (DHA) für die Gehirnzellen", "Neues lernen hält das Gehirn plastisch"],
  },
  {
    id: "emotionen", icon: "💭", titel: "Emotionen & Stimmung",
    text: "Schwankende und sinkende Hormone beeinflussen deine Botenstoffe (Serotonin, Dopamin, GABA, Oxytocin). Stimmungstiefs, Reizbarkeit oder Ängstlichkeit sind biochemisch — nicht ein Versagen. Pelz sieht die Menopause als Übergang zu mehr Klarheit und Selbstvertrauen: Wenn die Hormone der reproduktiven Jahre nachlassen, tritt oft die eigene, authentische Stimme klarer hervor.",
    tipps: ["Dopamin: neue Aktivitäten, kleine Erfolge feiern", "Serotonin: Mittagssonne, Tryptophan-reiche Kost, Erdung", "GABA: Yoga Nidra, Kräutertees, langsame Nasenatmung", "Oxytocin: echte Verbindungen, Umarmungen, Gemeinschaft"],
  },
  {
    id: "ernaehrung", icon: "🥑", titel: "Ernährung & Fasten",
    text: "Mit dem Östrogen-Rückgang verändert sich dein Stoffwechsel. Pelz empfiehlt in der Menopause oft längere Fastenfenster und eine ursprüngliche, unverarbeitete Ernährung (Gemüse, Knollen, gutes Fleisch, gesunde Fette, etwas Obst) — angelehnt an unsere sammelnden Vorfahrinnen. Wichtig ist Abwechslung und Variation statt strikter Dauerregeln. Zucker und ultraverarbeitete Lebensmittel belasten den menopausalen Körper besonders.",
    tipps: ["Längere Fastenfenster sind oft gut verträglich", "Viel Protein für Muskelerhalt", "Unverarbeitete, echte Lebensmittel", "Abwechslung statt strenger Dauerdiät"],
  },
  {
    id: "primal", icon: "🍖", titel: "Die Primal Menopausal Diet",
    text: "Dr. Pelz' Ernährungsplan speziell für die Menopause: viel gesundes Fett, moderates Protein, wenig Kohlenhydrate — aber mit den 'Kohlenhydraten der Natur' (Knollen, Hülsenfrüchte, Obst). Anders als eine strenge Keto-Diät, denn das menopausale Gehirn braucht etwas natürliche Kohlenhydrate. In Kombination mit Fasten produziert dein Körper Ketone — der ideale Treibstoff fürs Gehirn gegen den 'Menopause-Nebel'.\n\nKnollen (Süßkartoffel, Pastinake & Co.) spielen eine Schlüsselrolle: Sie stabilisieren den Blutzucker, füttern das Mikrobiom (wichtig fürs 'Estrobolom', das den Östrogen-Stoffwechsel reguliert) und liefern Vitamin B6 und Magnesium für GABA und Serotonin.\n\nTipp: Im Rezepte-Bereich kannst du mit dem Schalter 'Nur Primal Menopausal Diet' gezielt passende Rezepte anzeigen.",
    tipps: ["✅ Mageres Fleisch, Fisch, Eier, Meeresfrüchte", "✅ Gemüse, Knollen & Wurzelgemüse, etwas Obst", "✅ Nüsse, Samen, gesunde Fette (auch MCT-Öl)", "❌ Getreide, Zucker, Milchprodukte, Verarbeitetes"],
  },
  {
    id: "naehrstoffe", icon: "💊", titel: "Schlüssel-Nährstoffe: Kollagen & Kreatin",
    text: "Zwei Nährstoffe werden in der Menopause besonders wichtig, weil Östrogen sie nicht mehr unterstützt:\n\nKollagen hält Haut, Gelenke und Bindegewebe elastisch. Mangelzeichen: Gelenkschmerzen, schlaffe Haut, Verletzungsanfälligkeit. Quellen: Knochenbrühe, kollagenreiche Lebensmittel, Vitamin C, ggf. Supplement.\n\nKreatin unterstützt Muskeln UND Gehirn. Mangelzeichen: Muskelschwäche, Müdigkeit, geistige Trägheit. Quellen: Krafttraining 2–3x/Woche, Wildfisch, Weidefleisch, Kreatin-Monohydrat als Supplement.",
    tipps: ["Knochenbrühe & Vitamin C für Kollagen", "Krafttraining 2–3x/Woche für Kreatin-Wirkung", "Wildfisch & Weidefleisch", "Supplemente bei Bedarf (ärztlich abklären)"],
  },
  {
    id: "schlaf", icon: "😴", titel: "Besser schlafen",
    text: "Schlafprobleme gehören zu den häufigsten Menopause-Beschwerden — oft durch sinkendes Progesteron (das beruhigend wirkt) und nächtliche Hitzewallungen. Guter Schlaf ist die Grundlage für Stimmung, Gehirn und Hormonbalance.",
    tipps: ["Schlafzimmer kühl halten (gegen Hitzewallungen)", "Magnesium-Threonat oder -Glycinat am Abend", "GABA fördern: Yoga Nidra, Kamillentee", "Feste Schlafenszeiten, Bildschirme früh aus"],
  },
];

// Das 4-Stufen-Trainingsprotokoll aus Age Like a Girl (Appendix D)
const MENOPAUSE_TRAINING = [
  {
    level: 1, name: "Sanfter Bewegungs-Reset", stufe: "Einsteigerin",
    ziel: "Entzündungen reduzieren, Beweglichkeit verbessern, sicher Grundkraft aufbauen",
    fokus: "Gelenkschonend, endorphinfördernd, 'Talk-Test'-tauglich (du kannst dabei reden)",
    farbe: "#7C9E87",
    plan: [
      ["Mo", "Zügiger Spaziergang (20 Min.) + Unterkörper-Band-Zirkel (10 Min.: Kniebeugen, Glute Bridges)"],
      ["Di", "Sanftes Yoga oder Pilates (30 Min.) + Wand-Liegestütze & Trizeps-Dips (2x10)"],
      ["Mi", "Ruhe oder achtsame Bewegung (sanfter Spaziergang, 5.000 Schritte)"],
      ["Do", "Core & Stabilität (Planks auf Knien, seitliche Beinheber, Balance-Halten, 20 Min.)"],
      ["Fr", "Oberkörper mit Band (Bizeps-Curls, Schulterpresse, Rudern; 2x10)"],
      ["Sa", "Naturspaziergang (30+ Min.) + Treppensteigen oder Körpergewicht-Kniebeugen (10 Min.)"],
      ["So", "Ruhe oder leichtes Dehnen (10 Min.)"],
    ],
  },
  {
    level: 2, name: "Ahnen-Rhythmus", stufe: "Mittelstufe",
    ziel: "Kraft aufbauen, Gelenke unterstützen, tägliche Sammel-Bewegungsmuster nachahmen",
    fokus: "Moderate Intensität, Gelenksicherheit, mehr Kollagen",
    farbe: "#8FAF6E",
    plan: [
      ["Mo", "Widerstandsband-Zirkel (30 Min.: Push/Pull/Squat/Core)"],
      ["Di", "40-Min.-Spaziergang oder Schwimmen + leichtes Yoga"],
      ["Mi", "Stabilitätstraining (Balance-Board oder Barfuß-Kraft, 20 Min.)"],
      ["Do", "Ganzkörper-Kraft mit leichten Hanteln (30 Min.: Kniebeugen, Ausfallschritte, Armpressen)"],
      ["Fr", "Naturwanderung oder langer Spaziergang (60 Min.) + Kollagen-Supplement"],
      ["Sa", "Tanz- oder leichter Aerobic-Kurs (30–45 Min.)"],
      ["So", "Ruhe und Achtsamkeitsübung"],
    ],
  },
  {
    level: 3, name: "Hormon-kluge Kraft & Ausdauer", stufe: "Fortgeschrittene Mittelstufe",
    ziel: "Muskeln aufbauen, Cortisol-Spitzen vermeiden, Östrogen-Veränderungen berücksichtigen",
    fokus: "Mehr Kreatin-Unterstützung, HIIT für Wachstumshormon-Produktion",
    farbe: "#C4845A",
    plan: [
      ["Mo", "Krafttraining (schwere Gewichte, wenig Wiederholungen, 45 Min.)"],
      ["Di", "Aktive Erholung (zügiges Gehen, 30 Min.)"],
      ["Mi", "HIIT-Geh-Intervalle (4x 2 Min. schnell + 3 Min. Erholung)"],
      ["Do", "Körpergewicht-Kraft (Ausfallschritte, Liegestütze, Planks, 30 Min.)"],
      ["Fr", "Wandern oder Radfahren (60 Min.)"],
      ["Sa", "Pilates oder Barre-Toning (30 Min.)"],
      ["So", "Ruhe oder restoratives Yoga (Yin-Stil)"],
    ],
  },
  {
    level: 4, name: "Kriegerin-Protokoll", stufe: "Fortgeschritten",
    ziel: "Funktionelle Fitness maximieren, Muskeln erhalten, Gehirnfokus",
    fokus: "Neurotransmitter-Reset, Muskel-Nerven-Koordination, Kollagen UND Kreatin",
    farbe: "#9B7BAD",
    plan: [
      ["Mo", "Power-Kraft-Zirkel (Verbundübungen, 60 Min.)"],
      ["Di", "Gleichmäßiges Cardio (Radfahren oder Rudern, 45 Min.)"],
      ["Mi", "Mobilität & Gelenkpflege (Dehnen + Kollagen, 30 Min.)"],
      ["Do", "Metabolisches Konditionstraining (HIIT oder CrossFit-Stil, max. 30 Min.)"],
      ["Fr", "Lange Ausdauer-Wanderung oder Schwimmen (75+ Min.)"],
      ["Sa", "Funktionelles Spiel (Kickboxen, Trailrun oder Agility-Übungen, 45 Min.)"],
      ["So", "Volle Ruhe mit Achtsamkeit oder Naturspaziergang"],
    ],
  },
];



const FASTEN_TYPEN = [
  { id: "13h", name: "13-Stunden-Fasten", stunden: 13, phasen: ["power1","power2","manifestation","nurture"], icon: "🌙", beschreibung: "Sanfter Einstieg, für alle Phasen geeignet. Hält das Darmmikrobiom gesund.", wirkung: ["Darmgesundheit","Gewichtsmanagement"],
    detail: "Das 13-Stunden-Fasten ist Dr. Pelz' empfohlener Einstieg und die einzige Fastenart, die in JEDER Zyklusphase sicher ist — auch in der Nurture-Phase. Es entspricht dem natürlichen Rhythmus: Abendessen, dann über Nacht fasten, spätes Frühstück. In diesen 13 Stunden bekommt dein Verdauungssystem eine echte Pause, dein Blutzucker stabilisiert sich und dein Darmmikrobiom kann sich regenerieren.",
    fuerWen: "Perfekt für Einsteigerinnen und für jeden Tag. Die Basis-Stufe, auf der alles aufbaut." },
  { id: "15h", name: "15-Stunden-Fasten", stunden: 15, phasen: ["power1","power2","manifestation"], icon: "⏰", beschreibung: "Aktiviert Autophagie. Gut für Phase 1 & 2.", wirkung: ["Autophagie","Fettverbrennung"],
    detail: "Ab etwa 15 Stunden schaltet dein Körper richtig in die Fettverbrennung und startet die Autophagie — den zellulären 'Aufräumprozess', bei dem beschädigte Zellbestandteile recycelt werden. Diese Stufe eignet sich gut für die Power- und Manifestationsphasen, in denen dein Körper Fasten gut verträgt.",
    fuerWen: "Für alle mit etwas Fasten-Erfahrung. Ideal in Power 1, Power 2 und Manifestation." },
  { id: "17h", name: "17-Stunden-Fasten", stunden: 17, phasen: ["power1"], icon: "🔥", beschreibung: "Tiefe Autophagie. Nur in Power Phase 1 empfohlen.", wirkung: ["Tiefe Autophagie","Stammzellaktivierung"],
    detail: "Bei 17+ Stunden vertieft sich die Autophagie deutlich und das Wachstumshormon (HGH) steigt an — wichtig für Muskelerhalt, Hautgesundheit und Regeneration. Diese Stufe gehört in die Power Phase 1, wenn deine Hormone niedrig sind und dein Körper längeres Fasten am besten verträgt.",
    fuerWen: "Für Geübte, am besten in Power Phase 1 (Tag 1–10)." },
  { id: "OMAD", name: "OMAD – 1 Mahlzeit täglich", stunden: 23, phasen: ["power1"], icon: "⚡", beschreibung: "Eine Mahlzeit täglich. Nur in Power Phase 1.", wirkung: ["Maximale Autophagie","Gewichtsverlust"],
    detail: "OMAD ('One Meal A Day') bedeutet, den gesamten Tagesbedarf in einer einzigen Mahlzeit zu essen — also etwa 23 Stunden Fastenfenster. Das bringt sehr tiefe Autophagie und kann beim Gewichtsmanagement helfen. Wichtig: In dieser einen Mahlzeit ausreichend Nährstoffe und Protein aufnehmen!",
    fuerWen: "Für erfahrene Fasterinnen, nur in Power Phase 1. Nicht dauerhaft." },
  { id: "24h", name: "24-Stunden-Gut-Reset", stunden: 24, phasen: ["power1"], icon: "🌿", beschreibung: "Darm-Reset. Nur in Power Phase 1.", wirkung: ["Gut-Reset","Stammzellen"],
    detail: "Das 24-Stunden-Fasten ist Dr. Pelz' 'Gut-Reset'. Nach etwa 24 Stunden beginnt der Körper, Darm-Stammzellen zu aktivieren, die die Darmschleimhaut erneuern. Das kann bei Verdauungsproblemen und einem aus dem Gleichgewicht geratenen Mikrobiom helfen. Brühen sind erlaubt und unterstützen den Prozess.",
    fuerWen: "Für Geübte mit Darm-Fokus, in Power Phase 1. Etwa 1x pro Zyklus." },
  { id: "36h", name: "36-Stunden-Fat-Burner", stunden: 36, phasen: ["power1"], icon: "💫", beschreibung: "Tiefste Fettverbrennung & Zellheilung. Nur Power Phase 1, erfahrene Faster.", wirkung: ["Maximale Fettverbrennung","Tiefe Zellheilung"],
    detail: "Das 36-Stunden-Fasten ist die intensivste Stufe in Fast Like a Girl. Hier erreicht der Körper die tiefste Fettverbrennung und maximale zelluläre Heilung — beschädigte Zellen werden abgebaut (Apoptose) und das Immunsystem regeneriert sich grundlegend. Nur für erfahrene Fasterinnen und ausschließlich in Power Phase 1.",
    fuerWen: "Nur für sehr erfahrene Fasterinnen, ausschließlich Power Phase 1. Maximal selten." },
];

// Was im Körper während des Fastens passiert (Stunden-Zeitleiste, aus Fast Like a Girl)
const FASTEN_ZEITLEISTE = [
  { ab: 4, titel: "Blutzucker sinkt", icon: "🩸", text: "Dein Körper hat die letzte Mahlzeit verdaut. Der Blutzucker normalisiert sich und der Insulinspiegel beginnt zu fallen." },
  { ab: 8, titel: "Zucker-Speicher leeren sich", icon: "📉", text: "Die Glykogenspeicher (gespeicherter Zucker) in der Leber gehen zur Neige. Der Körper bereitet sich vor, auf Fettverbrennung umzuschalten." },
  { ab: 12, titel: "Fettverbrennung startet", icon: "🔥", text: "Der Stoffwechsel schaltet um: Statt Zucker verbrennt dein Körper jetzt Fett. Die Ketonproduktion beginnt — du wirst zum 'Fat Burner'." },
  { ab: 15, titel: "Autophagie beginnt", icon: "♻️", text: "Der zelluläre Selbstreinigungsprozess startet: Beschädigte Zellbestandteile werden recycelt. Das ist Anti-Aging auf Zellebene." },
  { ab: 17, titel: "Wachstumshormon steigt", icon: "💪", text: "Das Wachstumshormon (HGH) steigt deutlich an. Es schützt deine Muskeln, strafft die Haut und unterstützt die Regeneration." },
  { ab: 24, titel: "Darm-Reset & Stammzellen", icon: "🌿", text: "Darm-Stammzellen werden aktiviert und erneuern die Darmschleimhaut. Dein Mikrobiom wird zurückgesetzt — der 'Gut-Reset'." },
  { ab: 36, titel: "Tiefe Zellheilung", icon: "💫", text: "Maximale Fettverbrennung und tiefe Autophagie. Beschädigte Zellen werden abgebaut, das Immunsystem regeneriert sich grundlegend." },
  { ab: 48, titel: "Immunsystem-Reset", icon: "🛡️", text: "Nach 48 Stunden werden alte Immunzellen abgebaut und neue gebildet — eine tiefgreifende Erneuerung des Immunsystems (nur für sehr Erfahrene)." },
  { ab: 72, titel: "Dopamin-Reset", icon: "✨", text: "Nach etwa 72 Stunden setzt sich das Dopamin-System zurück, was Stimmung und Belohnungsempfinden neu kalibriert (nur unter Begleitung)." },
];



// ═══════════════════════════════════════════════════════════════════
// REZEPTE — buchkonform, Zutaten in Verwendungsreihenfolge für TM6
// ═══════════════════════════════════════════════════════════════════

const REZEPTE = {

  // ── FASTED SNACKS (brechen das Fasten NICHT) ──────────────────────
  fasting_crackers: {
    id: "fasting_crackers", name: "Fasting Crackers & Oliventapenade",
    kategorie: "fasted_snack", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 30, kalorien: 180, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 106",
    zutaten: [
      { menge: 90, einheit: "g", name: "Leinsamen, gemahlen", gruppe: "Cracker" },
      { menge: 45, einheit: "g", name: "Hanfsamen", gruppe: "Cracker" },
      { menge: 45, einheit: "g", name: "Chiasamen", gruppe: "Cracker" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Cracker" },
      { menge: 1, einheit: "TL", name: "Knoblauchpulver", gruppe: "Cracker" },
      { menge: 80, einheit: "ml", name: "Wasser", gruppe: "Cracker" },
      { menge: 200, einheit: "g", name: "grüne Oliven, entkernt", gruppe: "Tapenade" },
      { menge: 2, einheit: "EL", name: "Kapern, abgespült", gruppe: "Tapenade" },
      { menge: 3, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Tapenade" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 170°C Ober-/Unterhitze vorheizen.",
      "Leinsamen in den Mixtopf geben und 10 Sek. / Stufe 10 mahlen. Umfüllen.",
      "Alle Cracker-Zutaten in eine Schüssel geben, Wasser einrühren und 5 Min. quellen lassen.",
      "Masse gleichmäßig dünn auf einem mit Backpapier ausgelegten Blech (ca. 3 mm) ausstreichen.",
      "Im Ofen 20–25 Min. backen bis goldbraun. Abkühlen, in Stücke brechen.",
      "Mixtopf spülen. Oliven und Kapern zugeben: 5 Sek. / Stufe 5. Olivenöl dazugeben: 10 Sek. / Stufe 4.",
    ],
    schritte: [
      "Backofen auf 170°C vorheizen.",
      "Alle trockenen Cracker-Zutaten mischen, Wasser einrühren, 5 Min. quellen lassen.",
      "Dünn auf Backpapier streichen, 20–25 Min. backen.",
      "Oliven, Kapern und Olivenöl im Mixer zu einer groben Paste verarbeiten.",
    ],
    hinweis: "✅ Bricht das Fasten NICHT — unter 200 kcal, kein Protein. Ideal für den Fasting-Snack.",
  },

  fasting_herb_salad: {
    id: "fasting_herb_salad", name: "Kräutersalat (Fasting)",
    kategorie: "fasted_snack", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 80, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 108",
    zutaten: [
      { menge: 1, einheit: "EL", name: "Zitronensaft, frisch gepresst", gruppe: "Dressing" },
      { menge: 2, einheit: "EL", name: "MCT-Öl", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Dressing" },
      { menge: 0.25, einheit: "TL", name: "schwarzer Pfeffer, gemahlen", gruppe: "Dressing" },
      { menge: 30, einheit: "g", name: "frische Petersilie, grob gehackt", gruppe: "Salat" },
      { menge: 30, einheit: "g", name: "frischer Koriander, grob gehackt", gruppe: "Salat" },
      { menge: 20, einheit: "g", name: "frische Minze, Blätter", gruppe: "Salat" },
    ],
    thermomix: false,
    schritte: [
      "Zitronensaft, MCT-Öl, Salz und Pfeffer in einer kleinen Schüssel verquirlen.",
      "Alle Kräuter grob hacken und in einer Schüssel vermengen.",
      "Dressing über die Kräuter geben und sofort servieren.",
    ],
    hinweis: "✅ MCT-Öl verlängert das Fastenfenster und aktiviert die Fettverbrennung.",
  },

  acv_turmeric_tea: {
    id: "acv_turmeric_tea", name: "ACV-Kurkuma-Tee",
    kategorie: "fasted_snack", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 15, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 110",
    zutaten: [
      { menge: 240, einheit: "ml", name: "heißes Wasser (nicht kochend, ca. 80°C)", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "Apfelessig (mit Mutter)", gruppe: "Basis" },
      { menge: 0.5, einheit: "TL", name: "Kurkuma, gemahlen", gruppe: "Gewürze" },
      { menge: 0.25, einheit: "TL", name: "Ingwer, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "Prise", name: "schwarzer Pfeffer (aktiviert Kurkuma!)", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Honig oder Stevia (optional)", gruppe: "Optional" },
    ],
    thermomix: true,
    schritte_tm: [
      "Wasser in den Mixtopf: 3 Min. / 80°C / Stufe 1.",
      "Alle Gewürze und Apfelessig zugeben: 10 Sek. / Stufe 4.",
      "In eine Tasse füllen, optional süßen.",
    ],
    schritte: [
      "Wasser auf ca. 80°C erhitzen (nicht kochen).",
      "Apfelessig, Kurkuma, Ingwer und Pfeffer einrühren.",
      "Optional leicht süßen und sofort trinken.",
    ],
    hinweis: "✅ Bricht das Fasten nicht. Unterstützt Leber-Detox und reduziert Entzündungen.",
  },

  lemon_chia_drink: {
    id: "lemon_chia_drink", name: "Zitronen-Basilikum-Chia-Drink",
    kategorie: "fasted_snack", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 90, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 112",
    zutaten: [
      { menge: 360, einheit: "ml", name: "Wasser, kalt", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Zitrone, Saft frisch gepresst", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "Chiasamen", gruppe: "Basis" },
      { menge: 5, einheit: "Blätter", name: "frisches Basilikum, fein gehackt", gruppe: "Aroma" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Elektrolyte" },
      { menge: 1, einheit: "TL", name: "Honig oder Stevia (optional)", gruppe: "Optional" },
    ],
    thermomix: false,
    schritte: [
      "Chiasamen in Wasser einrühren und 5 Min. quellen lassen.",
      "Zitronensaft, Basilikum und Salz dazugeben.",
      "Gut umrühren und kalt servieren.",
    ],
    hinweis: "✅ Elektrolyte und Chiasamen verlängern das Fastenfenster.",
  },

  lime_ginger_mocktail: {
    id: "lime_ginger_mocktail", name: "Limetten-Ingwer-Minz-Mocktail",
    kategorie: "fasted_snack", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 20, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 114",
    zutaten: [
      { menge: 300, einheit: "ml", name: "Mineralwasser, kalt", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Basis" },
      { menge: 1, einheit: "TL", name: "frischer Ingwer, fein gerieben", gruppe: "Aroma" },
      { menge: 5, einheit: "Blätter", name: "frische Minze", gruppe: "Aroma" },
      { menge: 3, einheit: "Stk.", name: "Eiswürfel", gruppe: "Optional" },
    ],
    thermomix: false,
    schritte: [
      "Limettensaft und Ingwer in ein Glas geben.",
      "Mineralwasser vorsichtig aufgießen.",
      "Mit Minze und Eis garnieren.",
    ],
    hinweis: "✅ Erfrischend und bricht das Fasten nicht.",
  },

  // ── BREAK FAST (erste Mahlzeit nach dem Fasten) ────────────────
  pumpkin_pancakes: {
    id: "pumpkin_pancakes", name: "Kürbis-Protein-Pancakes",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegetarisch","gf"],
    zeit: 25, kalorien: 380, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 118",
    zutaten: [
      { menge: 1, einheit: "EL", name: "Kokosöl (zum Braten + für Teig)", gruppe: "Fett" },
      { menge: 2, einheit: "Stk.", name: "Eier, Größe L", gruppe: "Teig" },
      { menge: 120, einheit: "g", name: "Kürbispüree (Dose, pur ohne Zucker)", gruppe: "Teig" },
      { menge: 30, einheit: "g", name: "Vanille-Proteinpulver (pflanzlich)", gruppe: "Teig" },
      { menge: 1, einheit: "TL", name: "Zimt, gemahlen", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Ingwer, gemahlen", gruppe: "Gewürze" },
      { menge: 0.25, einheit: "TL", name: "Muskatnuss, gemahlen", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Backpulver", gruppe: "Teig" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Teig" },
    ],
    thermomix: true,
    schritte_tm: [
      "Eier, Kürbispüree, Proteinpulver, Gewürze, Backpulver und Salz in den Mixtopf: 20 Sek. / Stufe 4 zu glattem Teig verarbeiten.",
      "Bratpfanne bei mittlerer Hitze erhitzen, Kokosöl zugeben.",
      "Je ca. 60 ml Teig pro Pancake einlöffeln, Deckel schließen.",
      "Ca. 3 Min. backen bis die Oberfläche matt wird, dann wenden und weitere 2 Min. fertigbacken.",
      "Warm servieren mit frischen Beeren oder etwas Ahornsirup.",
    ],
    schritte: [
      "Eier und Kürbispüree in einer Schüssel verquirlen.",
      "Proteinpulver, Gewürze, Backpulver und Salz unterrühren.",
      "Kokosöl in der Pfanne erhitzen, je 60 ml Teig pro Pancake backen.",
      "3 Min. pro Seite auf mittlerer Hitze.",
    ],
    hinweis: "💡 Ideale erste Mahlzeit nach dem Fasten: Protein reaktiviert mTOR, kein Blutzuckerspike.",
  },

  granola_parfait: {
    id: "granola_parfait", name: "Nussiges Granola-Parfait",
    kategorie: "break_fast", phasen: ["power2","manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegetarisch","gf"],
    zeit: 20, kalorien: 420, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 120",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Kokosöl, geschmolzen", gruppe: "Granola" },
      { menge: 2, einheit: "EL", name: "Ahornsirup", gruppe: "Granola" },
      { menge: 60, einheit: "g", name: "Mandeln, grob gehackt", gruppe: "Granola" },
      { menge: 40, einheit: "g", name: "Walnüsse, grob gehackt", gruppe: "Granola" },
      { menge: 40, einheit: "g", name: "Kürbiskerne", gruppe: "Granola" },
      { menge: 30, einheit: "g", name: "Chiasamen", gruppe: "Granola" },
      { menge: 30, einheit: "g", name: "Kokosflocken, ungesüßt", gruppe: "Granola" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Granola" },
      { menge: 200, einheit: "g", name: "Kokosjoghurt oder griechischer Joghurt", gruppe: "Parfait" },
      { menge: 150, einheit: "g", name: "gemischte Beeren (Blaubeeren, Himbeeren)", gruppe: "Parfait" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 160°C vorheizen. Backblech mit Backpapier auslegen.",
      "Kokosöl und Ahornsirup in den Mixtopf: 2 Min. / 50°C / Stufe 2 schmelzen.",
      "Nüsse, Kerne, Chiasamen, Kokosflocken und Vanille zugeben: 10 Sek. / Linkslauf / Stufe 2 (sanft vermengen).",
      "Masse auf Backblech verteilen und 12–15 Min. rösten bis goldbraun. Abkühlen lassen.",
      "Zum Servieren: Joghurt in Gläser schichten, Granola und Beeren obenauf.",
    ],
    schritte: [
      "Backofen auf 160°C vorheizen.",
      "Kokosöl und Ahornsirup schmelzen, alle Granola-Zutaten einmischen.",
      "12–15 Min. auf Backblech rösten, abkühlen lassen.",
      "In Schichten mit Joghurt und Beeren servieren.",
    ],
    hinweis: "💡 Kürbiskerne liefern Zink — wichtig für Testosteron in der Manifestationsphase.",
  },

  chia_protein_bars: {
    id: "chia_protein_bars", name: "Chia-Protein-Riegel",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 210, schwierigkeit: "Leicht", portionenBasis: 12,
    buchSeite: "S. 122",
    zutaten: [
      { menge: 90, einheit: "g", name: "Mandelbutter, cremig", gruppe: "Basis" },
      { menge: 3, einheit: "EL", name: "Ahornsirup", gruppe: "Basis" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Basis" },
      { menge: 45, einheit: "g", name: "Proteinpulver (neutral oder Vanille)", gruppe: "Basis" },
      { menge: 60, einheit: "g", name: "Chiasamen", gruppe: "Samen" },
      { menge: 60, einheit: "g", name: "Hanfsamen", gruppe: "Samen" },
      { menge: 30, einheit: "g", name: "Leinsamen, gemahlen", gruppe: "Samen" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Gewürze" },
    ],
    thermomix: true,
    schritte_tm: [
      "Mandelbutter, Ahornsirup und Vanille in den Mixtopf: 2 Min. / 40°C / Stufe 2 erwärmen.",
      "Proteinpulver, Chiasamen, Hanfsamen, Leinsamen und Salz zugeben: 20 Sek. / Linkslauf / Stufe 3.",
      "Masse in eine mit Backpapier ausgelegte Form (20×20 cm) drücken.",
      "Mindestens 1 Stunde kalt stellen, dann in 12 Riegel schneiden.",
    ],
    schritte: [
      "Mandelbutter, Ahornsirup und Vanille sanft erwärmen und verrühren.",
      "Alle trockenen Zutaten einmischen.",
      "In Form drücken, 1 Stunde kühlen, in Riegel schneiden.",
    ],
    hinweis: "💡 Im Kühlschrank bis zu 1 Woche haltbar. Reich an Omega-3 für Hormonproduktion.",
  },

  quinoa_porridge: {
    id: "quinoa_porridge", name: "Lila Quinoa-Porridge",
    kategorie: "break_fast", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 25, kalorien: 350, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 124",
    zutaten: [
      { menge: 180, einheit: "g", name: "schwarzer/lila Quinoa, abgespült", gruppe: "Basis" },
      { menge: 400, einheit: "ml", name: "Kokosmilch, vollfett", gruppe: "Flüssigkeit" },
      { menge: 200, einheit: "ml", name: "Wasser", gruppe: "Flüssigkeit" },
      { menge: 2, einheit: "EL", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 1, einheit: "TL", name: "Zimt, gemahlen", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Vanilleextrakt", gruppe: "Gewürze" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Gewürze" },
      { menge: 100, einheit: "g", name: "Heidelbeeren, frisch oder gefroren", gruppe: "Topping" },
      { menge: 30, einheit: "g", name: "Kokosflocken, geröstet", gruppe: "Topping" },
      { menge: 2, einheit: "EL", name: "Kürbiskerne", gruppe: "Topping" },
    ],
    thermomix: true,
    schritte_tm: [
      "Quinoa in Sieb abspülen bis Wasser klar läuft.",
      "Quinoa, Kokosmilch, Wasser, Ahornsirup, Zimt, Vanille und Salz in den Mixtopf: 20 Min. / 90°C / Linkslauf / Stufe 1.",
      "Prüfen ob Quinoa weich ist (ggf. 3–5 Min. mehr). Konsistenz anpassen.",
      "In Schüsseln füllen und mit Heidelbeeren, Kokosflocken und Kürbiskernen servieren.",
    ],
    schritte: [
      "Quinoa mit Kokosmilch und Wasser aufkochen.",
      "20 Min. auf kleiner Flamme köcheln.",
      "Ahornsirup, Zimt und Vanille einrühren.",
      "Mit Beeren, Kokosflocken und Kürbiskernen servieren.",
    ],
    hinweis: "💡 Kürbiskerne liefern Magnesium — essenziell für Progesteron in der Nurture-Phase.",
  },

  tofu_scramble: {
    id: "tofu_scramble", name: "Tofu-Scramble",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 290, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 126",
    zutaten: [
      { menge: 1, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 0.5, einheit: "Stk.", name: "Zwiebel, fein gewürfelt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 400, einheit: "g", name: "fester Tofu, gut abgetropft und zerkrümelt", gruppe: "Hauptzutat" },
      { menge: 1, einheit: "TL", name: "Kurkuma, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Knoblauchpulver", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Kala Namak (schwarzes Salz – Ei-Geschmack)", gruppe: "Gewürze" },
      { menge: 0.25, einheit: "TL", name: "Paprikapulver, geräuchert", gruppe: "Gewürze" },
      { menge: 100, einheit: "g", name: "Cherrytomaten, halbiert", gruppe: "Gemüse" },
      { menge: 60, einheit: "g", name: "Baby-Spinat", gruppe: "Gemüse" },
      { menge: 2, einheit: "EL", name: "Hefeflocken (für Käse-Note)", gruppe: "Optional" },
    ],
    thermomix: false,
    schritte: [
      "Olivenöl in Pfanne erhitzen, Zwiebel 3 Min. andünsten.",
      "Knoblauch 1 Min. mitbraten.",
      "Tofu zerkrümeln, zugeben und 5 Min. anbraten bis leicht goldbraun.",
      "Kurkuma, Knoblauchpulver, Kala Namak und Paprika einrühren.",
      "Tomaten und Spinat zugeben, 2–3 Min. mitgaren bis Spinat zusammenfällt.",
      "Mit Hefeflocken servieren.",
    ],
    hinweis: "💡 Tofu (Soja) enthält Phytoöstrogene — ideal in Power Phase 2 für sanfte Östrogenunterstützung.",
  },

  lentil_soup: {
    id: "lentil_soup", name: "Linsensuppe",
    kategorie: "break_fast", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 40, kalorien: 310, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 128",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Karotten, in Würfeln", gruppe: "Gemüse" },
      { menge: 2, einheit: "TL", name: "Kreuzkümmel, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Kurkuma, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Koriander, gemahlen", gruppe: "Gewürze" },
      { menge: 300, einheit: "g", name: "rote Linsen, abgespült", gruppe: "Hülsenfrüchte" },
      { menge: 400, einheit: "g", name: "Dosentomaten, gewürfelt", gruppe: "Flüssigkeit" },
      { menge: 1, einheit: "l", name: "Gemüsebrühe, heiß", gruppe: "Flüssigkeit" },
      { menge: 1, einheit: "Stk.", name: "Zitrone, Saft", gruppe: "Abschmecken" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Abschmecken" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel und Knoblauch in den Mixtopf: 3 Sek. / Stufe 5 zerkleinern. Olivenöl zugeben: 3 Min. / 120°C / Stufe 1 andünsten.",
      "Karotten zugeben: 3 Sek. / Stufe 4 grob zerkleinern. 2 Min. / 120°C / Stufe 1 mitdünsten.",
      "Kreuzkümmel, Kurkuma und Koriander zugeben: 1 Min. / 120°C / Stufe 1 rösten.",
      "Linsen, Tomaten und heiße Brühe zugeben: 25 Min. / 100°C / Linkslauf / Stufe 1 köcheln.",
      "Mit Zitronensaft und Salz abschmecken. Nach Wunsch teilweise mit dem Stabmixer pürieren.",
    ],
    schritte: [
      "Öl erhitzen, Zwiebel 5 Min. andünsten, Knoblauch und Karotten zugeben.",
      "Gewürze 1 Min. mitrösten.",
      "Linsen, Tomaten und Brühe zugeben, 25 Min. köcheln.",
      "Mit Zitronensaft abschmecken.",
    ],
    hinweis: "💡 Rote Linsen sind reich an Folsäure — wichtig für hormonelle Balance.",
  },

  gazpacho: {
    id: "gazpacho", name: "Gazpacho",
    kategorie: "break_fast", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 160, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 132",
    zutaten: [
      { menge: 800, einheit: "g", name: "reife Tomaten, grob gewürfelt", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, entkernt und grob gewürfelt", gruppe: "Gemüse" },
      { menge: 0.5, einheit: "Stk.", name: "Salatgurke, geschält und grob gewürfelt", gruppe: "Gemüse" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 0.5, einheit: "Stk.", name: "rote Zwiebel, grob gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Fett" },
      { menge: 2, einheit: "EL", name: "Rotweinessig", gruppe: "Säure" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "schwarzer Pfeffer, gemahlen", gruppe: "Gewürze" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Gemüse grob würfeln und in den Mixtopf geben.",
      "Knoblauch, Zwiebel, Olivenöl, Essig, Salz und Pfeffer zugeben.",
      "30 Sek. / Stufe 10 fein pürieren.",
      "Durch ein feines Sieb passieren für cremige Textur (optional).",
      "Mindestens 2 Stunden kalt stellen. Kalt servieren.",
    ],
    schritte: [
      "Alle Zutaten in den Mixer geben.",
      "Fein pürieren.",
      "Ggf. durch Sieb passieren.",
      "Mindestens 2 Stunden kalt stellen.",
    ],
    hinweis: "💡 Rohes Gemüse maximiert Enzymaktivität und Polyphenol-Gehalt.",
  },

  buddha_bowl: {
    id: "buddha_bowl", name: "Buddha Bowl",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 35, kalorien: 480, schwierigkeit: "Mittel", portionenBasis: 2,
    buchSeite: "S. 134",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 240, einheit: "g", name: "Kichererbsen aus der Dose, abgetropft und trocken getupft", gruppe: "Protein" },
      { menge: 1, einheit: "TL", name: "Paprikapulver, geräuchert", gruppe: "Gewürze Kichererbsen" },
      { menge: 0.5, einheit: "TL", name: "Knoblauchpulver", gruppe: "Gewürze Kichererbsen" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Gewürze Kichererbsen" },
      { menge: 180, einheit: "g", name: "Quinoa, ungekocht", gruppe: "Basis" },
      { menge: 360, einheit: "ml", name: "Wasser oder Gemüsebrühe", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Avocado, in Scheiben", gruppe: "Topping" },
      { menge: 100, einheit: "g", name: "Cherrytomaten, halbiert", gruppe: "Topping" },
      { menge: 100, einheit: "g", name: "Gurke, in Scheiben", gruppe: "Topping" },
      { menge: 60, einheit: "g", name: "Tahini", gruppe: "Dressing" },
      { menge: 2, einheit: "EL", name: "Zitronensaft, frisch", gruppe: "Dressing" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Dressing" },
      { menge: 3, einheit: "EL", name: "Wasser (für Dressing)", gruppe: "Dressing" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 200°C vorheizen.",
      "Kichererbsen mit Öl, Paprika, Knoblauchpulver und Salz vermengen, auf Blech verteilen: 20 Min. rösten.",
      "Quinoa und Wasser in den Mixtopf: 15 Min. / 100°C / Linkslauf / Stufe 1 garen. Umfüllen.",
      "Mixtopf spülen. Tahini, Zitronensaft, Knoblauch und Wasser: 20 Sek. / Stufe 4 zu Dressing verrühren.",
      "Bowls zusammenstellen: Quinoa als Basis, Gemüse und Kichererbsen darauf, Dressing drüber.",
    ],
    schritte: [
      "Kichererbsen bei 200°C 20 Min. rösten.",
      "Quinoa in Brühe 15 Min. garen.",
      "Tahini-Dressing anrühren.",
      "Alle Zutaten in der Bowl anrichten.",
    ],
    hinweis: "💡 Tahini (Sesam) enthält Lignane — unterstützen Östrogen-Metabolisierung.",
  },

  // ── HAUPTGERICHTE – HORMONE FEASTING ──────────────────────────
  chana_masala: {
    id: "chana_masala", name: "Chana Masala",
    kategorie: "hormone_feasting", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 40, kalorien: 390, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 154",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "große Zwiebel, fein gewürfelt", gruppe: "Aromaten" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 20, einheit: "g", name: "frischer Ingwer, gerieben", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "grüne Chilischote, fein gehackt (optional)", gruppe: "Schärfe" },
      { menge: 2, einheit: "TL", name: "Garam Masala", gruppe: "Gewürzmischung" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel, gemahlen", gruppe: "Gewürzmischung" },
      { menge: 1, einheit: "TL", name: "Koriander, gemahlen", gruppe: "Gewürzmischung" },
      { menge: 0.5, einheit: "TL", name: "Kurkuma, gemahlen", gruppe: "Gewürzmischung" },
      { menge: 400, einheit: "g", name: "Dosentomaten, gewürfelt", gruppe: "Sauce" },
      { menge: 480, einheit: "g", name: "Kichererbsen (2 Dosen), abgetropft", gruppe: "Hülsenfrüchte" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Abschmecken" },
      { menge: 0.5, einheit: "Stk.", name: "Zitrone, Saft", gruppe: "Abschmecken" },
      { menge: 1, einheit: "Handvoll", name: "frischer Koriander, gehackt (zum Servieren)", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel in den Mixtopf: 3 Sek. / Stufe 5 zerkleinern. Kokosöl zugeben: 5 Min. / 120°C / Stufe 1.",
      "Knoblauch und Ingwer zugeben: 2 Sek. / Stufe 5. 2 Min. / 120°C / Stufe 1 mitbraten.",
      "Alle Gewürze zugeben: 1 Min. / 120°C / Stufe 1 rösten.",
      "Tomaten zugeben: 3 Min. / 100°C / Linkslauf / Stufe 1.",
      "Kichererbsen und Salz zugeben: 20 Min. / 100°C / Linkslauf / Stufe 1 köcheln.",
      "Mit Zitronensaft abschmecken, mit Koriander garniert servieren.",
    ],
    schritte: [
      "Öl erhitzen, Zwiebel 7 Min. goldbraun andünsten.",
      "Knoblauch und Ingwer 2 Min. mitbraten.",
      "Alle Gewürze einrühren, 1 Min. rösten.",
      "Tomaten zugeben, 3 Min. köcheln.",
      "Kichererbsen zugeben, 20 Min. eindicken lassen.",
      "Mit Zitronensaft und Koriander servieren.",
    ],
    hinweis: "💡 Kichererbsen liefern Tryptophan — Vorstufe von Serotonin, stabilisiert Stimmung in Lutealphase.",
  },

  red_thai_curry: {
    id: "red_thai_curry", name: "Rotes Thai-Curry",
    kategorie: "hormone_feasting", phasen: ["nurture","manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 35, kalorien: 450, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 156",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 2, einheit: "EL", name: "rote Currypaste (ohne Zucker)", gruppe: "Aromaten" },
      { menge: 400, einheit: "ml", name: "Kokosmilch, vollfett", gruppe: "Flüssigkeit" },
      { menge: 240, einheit: "ml", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 300, einheit: "g", name: "Süßkartoffeln, in 2 cm Würfeln", gruppe: "Gemüse" },
      { menge: 200, einheit: "g", name: "Brokkoli, in Röschen", gruppe: "Gemüse" },
      { menge: 400, einheit: "g", name: "fester Tofu, in Würfeln (oder Hühnerbrust)", gruppe: "Protein" },
      { menge: 2, einheit: "EL", name: "Tamari-Sauce oder Fischsauce", gruppe: "Umami" },
      { menge: 1, einheit: "EL", name: "Kokosblütenzucker oder Ahornsirup", gruppe: "Ausgleich" },
      { menge: 100, einheit: "g", name: "Baby-Spinat", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Abschmecken" },
      { menge: 1, einheit: "Handvoll", name: "frisches Thai-Basilikum (optional)", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kokosöl in den Mixtopf: 1 Min. / 120°C / Stufe 1 erwärmen.",
      "Currypaste zugeben: 3 Min. / 120°C / Stufe 1 anrösten.",
      "Kokosmilch und Brühe zugeben: 2 Min. / 100°C / Linkslauf / Stufe 1.",
      "Süßkartoffeln, Brokkoli und Tofu zugeben: 15 Min. / 100°C / Linkslauf / Stufe 1.",
      "Tamari, Zucker und Spinat zugeben: 2 Min. / 100°C / Linkslauf / Stufe 1.",
      "Mit Limettensaft abschmecken und mit Basilikum servieren.",
    ],
    schritte: [
      "Currypaste in Kokosöl 2–3 Min. anrösten.",
      "Kokosmilch und Brühe einrühren.",
      "Süßkartoffeln und Tofu zugeben, 15 Min. köcheln.",
      "Brokkoli und Spinat zugeben, 5 Min. garen.",
      "Mit Tamari, Zucker und Limettensaft abschmecken.",
    ],
    hinweis: "💡 Süßkartoffeln stabilisieren den Blutzucker in der Nurture-Phase — wichtig für Progesteron.",
  },

  chicken_cacciatore: {
    id: "chicken_cacciatore", name: "Hühnchen Cacciatore",
    kategorie: "hormone_feasting", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 60, kalorien: 490, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 179",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 800, einheit: "g", name: "Hühnerschenkel mit Knochen, Haut entfernt", gruppe: "Protein" },
      { menge: 1, einheit: "TL", name: "Meersalz und Pfeffer (zum Würzen)", gruppe: "Würzen" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, halbiert und in Ringe", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, in Streifen", gruppe: "Gemüse" },
      { menge: 150, einheit: "g", name: "Champignons, geviertelt", gruppe: "Gemüse" },
      { menge: 200, einheit: "ml", name: "trockener Rotwein (oder Hühnerbrühe)", gruppe: "Flüssigkeit" },
      { menge: 400, einheit: "g", name: "Dosentomaten, stückig", gruppe: "Sauce" },
      { menge: 2, einheit: "Zweige", name: "frischer Rosmarin", gruppe: "Kräuter" },
      { menge: 3, einheit: "Zweige", name: "frischer Thymian", gruppe: "Kräuter" },
      { menge: 2, einheit: "EL", name: "Kapern (optional)", gruppe: "Optional" },
    ],
    thermomix: false,
    schritte: [
      "Hühnchen mit Salz und Pfeffer würzen.",
      "Öl in Schmortopf erhitzen, Hühnchen von allen Seiten goldbraun anbraten (je 3–4 Min.), herausnehmen.",
      "Zwiebel 5 Min. andünsten, Knoblauch, Paprika und Pilze 3 Min. mitbraten.",
      "Rotwein einköcheln lassen (2 Min.).",
      "Tomaten, Kräuter, Kapern und Hühnchen zugeben.",
      "Zugedeckt 30–35 Min. bei niedriger Hitze schmoren.",
    ],
    hinweis: "💡 Hühnerfleisch liefert alle 9 essentiellen Aminosäuren — wichtig für Testosteron in der Manifestationsphase.",
  },

  spaghetti_bolognese: {
    id: "spaghetti_bolognese", name: "Spaghetti-Linsen-Bolognese",
    kategorie: "hormone_feasting", phasen: ["nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan"],
    zeit: 50, kalorien: 520, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 166",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, fein gewürfelt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Karotten, gerieben", gruppe: "Gemüse" },
      { menge: 2, einheit: "Stk.", name: "Selleriestangen, fein gewürfelt", gruppe: "Gemüse" },
      { menge: 2, einheit: "TL", name: "getrockneter Oregano", gruppe: "Kräuter" },
      { menge: 1, einheit: "TL", name: "getrocknetes Basilikum", gruppe: "Kräuter" },
      { menge: 200, einheit: "g", name: "grüne oder braune Linsen, gekocht", gruppe: "Protein" },
      { menge: 400, einheit: "g", name: "Dosentomaten, passiert", gruppe: "Sauce" },
      { menge: 2, einheit: "EL", name: "Tomatenmark", gruppe: "Sauce" },
      { menge: 100, einheit: "ml", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 320, einheit: "g", name: "Spaghetti (oder Hülsenfrucht-Pasta für GF)", gruppe: "Pasta" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Abschmecken" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel in den Mixtopf: 3 Sek. / Stufe 5. Olivenöl zugeben: 4 Min. / 120°C / Stufe 1.",
      "Knoblauch, Karotten und Sellerie zugeben: 3 Sek. / Stufe 4. 5 Min. / 120°C / Stufe 1.",
      "Kräuter, Tomatenmark und Gewürze zugeben: 1 Min. / 120°C / Stufe 1.",
      "Tomaten, Linsen und Brühe zugeben: 20 Min. / 100°C / Linkslauf / Stufe 1.",
      "Pasta separat nach Packungsanweisung kochen. Mit Sauce servieren.",
    ],
    schritte: [
      "Zwiebel, Karotten und Sellerie in Öl 7 Min. andünsten.",
      "Knoblauch und Kräuter kurz mitbraten.",
      "Tomatenmark einrühren, Tomaten und Linsen zugeben.",
      "20–25 Min. köcheln bis dickflüssig.",
      "Mit Pasta servieren.",
    ],
    hinweis: "💡 Linsen sind reich an Folsäure und Ballaststoffen — ideal für Progesteron-Unterstützung.",
  },

  sweet_potato_tacos: {
    id: "sweet_potato_tacos", name: "Süßkartoffel-Tempeh-Tacos",
    kategorie: "hormone_feasting", phasen: ["nurture","manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 40, kalorien: 420, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 168",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 400, einheit: "g", name: "Tempeh, in 1 cm Würfeln", gruppe: "Protein" },
      { menge: 2, einheit: "Stk.", name: "Süßkartoffeln, in kleinen Würfeln", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "rote Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 2, einheit: "TL", name: "Kreuzkümmel, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Paprikapulver, geräuchert", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Chili-Flocken", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Gewürze" },
      { menge: 8, einheit: "Stk.", name: "kleine Mais-Tortillas (GF)", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Avocado, zerdrückt", gruppe: "Topping" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Topping" },
      { menge: 1, einheit: "Handvoll", name: "frischer Koriander", gruppe: "Garnitur" },
    ],
    thermomix: false,
    schritte: [
      "Backofen auf 200°C vorheizen.",
      "Süßkartoffeln mit 1 EL Öl, Salz und Paprikapulver auf Backblech: 20 Min. rösten.",
      "Tempeh in restlichem Öl 5–7 Min. von allen Seiten anbraten.",
      "Zwiebel, Knoblauch und Kreuzkümmel zugeben, 3 Min. mitbraten.",
      "Tortillas in trockener Pfanne kurz erwärmen.",
      "Tortillas mit Avocado, Tempeh, Süßkartoffeln und Koriander belegen.",
    ],
    hinweis: "💡 Tempeh enthält fermentiertes Soja — probiotisch und reich an Phytoöstrogenen.",
  },

  // ── KETOBIOTIC HAUPTGERICHTE ──────────────────────────────────
  tahini_kale_salad: {
    id: "tahini_kale_salad", name: "Tahini-Grünkohl-Salat",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 290, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 211",
    zutaten: [
      { menge: 60, einheit: "g", name: "Tahini (Sesampaste)", gruppe: "Dressing" },
      { menge: 3, einheit: "EL", name: "Zitronensaft, frisch gepresst", gruppe: "Dressing" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Dressing" },
      { menge: 3, einheit: "EL", name: "Wasser (für Konsistenz)", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Dressing" },
      { menge: 200, einheit: "g", name: "Grünkohl, Stiele entfernt und fein gestreift", gruppe: "Salat" },
      { menge: 30, einheit: "g", name: "Pinienkerne, 3 Min. trocken geröstet", gruppe: "Topping" },
      { menge: 2, einheit: "EL", name: "Leinsamen, gemahlen", gruppe: "Topping" },
      { menge: 0.5, einheit: "Stk.", name: "Avocado, in Würfeln (optional)", gruppe: "Topping" },
    ],
    thermomix: true,
    schritte_tm: [
      "Tahini, Zitronensaft, Knoblauch, Wasser und Salz in den Mixtopf: 20 Sek. / Stufe 4 zu cremigem Dressing verarbeiten.",
      "Grünkohl in eine große Schüssel geben.",
      "Dressing über den Grünkohl geben und mit den Händen 2–3 Min. massieren bis er weich wird.",
      "Mit Pinienkernen, Leinsamen und Avocado servieren.",
    ],
    schritte: [
      "Dressing aus Tahini, Zitronensaft, Knoblauch, Wasser und Salz verrühren.",
      "Grünkohl in Streifen schneiden, mit Dressing 3 Min. massieren.",
      "Mit Pinienkernen, Leinsamen und Avocado servieren.",
    ],
    hinweis: "💡 Sesam enthält Sesamin — unterstützt Östrogen-Entgiftung in der Leber.",
  },

  mediterranean_quinoa: {
    id: "mediterranean_quinoa", name: "Mediterraner Quinoa-Salat",
    kategorie: "ketobiotic", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 30, kalorien: 380, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 216",
    zutaten: [
      { menge: 180, einheit: "g", name: "Quinoa, weiß oder tricolor, abgespült", gruppe: "Basis" },
      { menge: 360, einheit: "ml", name: "Gemüsebrühe oder Wasser", gruppe: "Kochflüssigkeit" },
      { menge: 4, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Dressing" },
      { menge: 2, einheit: "EL", name: "Zitronensaft, frisch", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "getrockneter Oregano", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Dressing" },
      { menge: 150, einheit: "g", name: "Cherrytomaten, halbiert", gruppe: "Gemüse" },
      { menge: 100, einheit: "g", name: "Gurke, gewürfelt", gruppe: "Gemüse" },
      { menge: 80, einheit: "g", name: "Kalamata-Oliven, halbiert", gruppe: "Gemüse" },
      { menge: 30, einheit: "g", name: "rote Zwiebel, fein gewürfelt", gruppe: "Gemüse" },
      { menge: 100, einheit: "g", name: "Feta-Käse, zerbröselt (oder veganer Feta)", gruppe: "Protein" },
      { menge: 1, einheit: "Handvoll", name: "frische Petersilie, gehackt", gruppe: "Kräuter" },
    ],
    thermomix: true,
    schritte_tm: [
      "Quinoa und Brühe in den Mixtopf: 15 Min. / 100°C / Linkslauf / Stufe 1. Umfüllen und abkühlen lassen.",
      "Dressing: Olivenöl, Zitronensaft, Oregano und Salz in Mixtopf: 10 Sek. / Stufe 3.",
      "Abgekühlten Quinoa mit Tomaten, Gurke, Oliven, Zwiebel und Petersilie vermengen.",
      "Dressing unterheben, Feta darüber bröckeln.",
    ],
    schritte: [
      "Quinoa in Brühe 15 Min. köcheln, abkühlen lassen.",
      "Dressing anrühren.",
      "Alle Zutaten vermengen, Feta obenauf.",
    ],
    hinweis: "💡 Quinoa ist eines der wenigen kompletten pflanzlichen Proteine — alle 9 Aminosäuren.",
  },

  salmon_furikake: {
    id: "salmon_furikake", name: "Lachs mit Furikake",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 20, kalorien: 460, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 238",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Tamari-Sauce", gruppe: "Marinade" },
      { menge: 1, einheit: "EL", name: "Sesamöl, geröstet", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "frischer Ingwer, fein gerieben", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "Ahornsirup oder Honig", gruppe: "Marinade" },
      { menge: 4, einheit: "Stk.", name: "Lachsfilets (à ca. 150 g, mit Haut)", gruppe: "Protein" },
      { menge: 3, einheit: "EL", name: "Furikake (japanisches Sesam-Nori-Würzpulver)", gruppe: "Kruste" },
    ],
    thermomix: false,
    schritte: [
      "Backofen auf 200°C vorheizen, Backblech mit Backpapier auslegen.",
      "Marinade aus Tamari, Sesamöl, Ingwer und Ahornsirup verrühren.",
      "Lachsfilets mit der Fleischseite in die Marinade legen, 10 Min. marinieren.",
      "Lachs auf Backblech (Haut nach unten), Furikake gleichmäßig auf der Oberseite verteilen.",
      "12–15 Min. backen bis der Lachs gerade gar ist (innen noch leicht glasig).",
    ],
    hinweis: "💡 Lachs liefert Omega-3-Fettsäuren — Grundbausteine für alle Steroidhormone.",
  },

  spinach_frittata: {
    id: "spinach_frittata", name: "Spinat-Grünkohl-Frittata mit Ziegenkäse",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 30, kalorien: 390, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 224",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, fein gewürfelt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 100, einheit: "g", name: "Grünkohl, fein geschnitten (Stiele entfernt)", gruppe: "Gemüse" },
      { menge: 100, einheit: "g", name: "Baby-Spinat", gruppe: "Gemüse" },
      { menge: 8, einheit: "Stk.", name: "Eier, Größe L", gruppe: "Basis" },
      { menge: 3, einheit: "EL", name: "Mandelmilch oder normaler Schuss Milch", gruppe: "Basis" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 0.25, einheit: "TL", name: "schwarzer Pfeffer, gemahlen", gruppe: "Würzen" },
      { menge: 120, einheit: "g", name: "Ziegenkäse, zerbröckelt", gruppe: "Topping" },
    ],
    thermomix: false,
    schritte: [
      "Backofen auf 190°C vorheizen.",
      "Ovensafe-Pfanne: Öl erhitzen, Zwiebel 3 Min. andünsten, Knoblauch 1 Min. mitbraten.",
      "Grünkohl zugeben und 3 Min. mitgaren bis er weich wird, dann Spinat zugeben bis er zusammenfällt.",
      "Eier mit Milch, Salz und Pfeffer verquirlen, über das Gemüse gießen.",
      "Ziegenkäse darüber bröckeln.",
      "5 Min. auf dem Herd, dann 10–12 Min. im Ofen bis fest und goldbraun.",
    ],
    hinweis: "💡 Eier enthalten alle für Östrogen nötigen Aminosäuren und Cholesterin als Hormonvorstufe.",
  },

  avocado_brazil_salad: {
    id: "avocado_brazil_salad", name: "Avocado-Paranuss-Salat",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 340, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 214",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Dressing" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz und Pfeffer", gruppe: "Dressing" },
      { menge: 100, einheit: "g", name: "gemischte Blattsalate (Rucola, Feldsalat)", gruppe: "Basis" },
      { menge: 2, einheit: "Stk.", name: "Avocados, reif, in Würfeln", gruppe: "Fette" },
      { menge: 60, einheit: "g", name: "Paranüsse, grob gehackt (max. 3 Stk./Tag!)", gruppe: "Nüsse" },
      { menge: 1, einheit: "EL", name: "Leinsamen, gemahlen", gruppe: "Samen" },
    ],
    thermomix: false,
    schritte: [
      "Dressing aus Olivenöl, Limettensaft, Salz und Pfeffer verrühren.",
      "Salat auf Teller verteilen.",
      "Avocado und Paranüsse obenauf.",
      "Mit Dressing und Leinsamen servieren.",
    ],
    hinweis: "💡 2–3 Paranüsse täglich decken den gesamten Selenium-Bedarf — essenziell für Schilddrüse und Östrogen-Metabolismus.",
  },

  miso_poke_bowl: {
    id: "miso_poke_bowl", name: "Miso-Ingwer-Poke Bowl",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 25, kalorien: 510, schwierigkeit: "Mittel", portionenBasis: 2,
    buchSeite: "S. 236",
    zutaten: [
      { menge: 2, einheit: "EL", name: "weißes Miso", gruppe: "Marinade" },
      { menge: 1, einheit: "EL", name: "Reisessig", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "Sesamöl, geröstet", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "frischer Ingwer, gerieben", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "Tamari-Sauce", gruppe: "Marinade" },
      { menge: 300, einheit: "g", name: "Thunfisch oder Lachs, Sashimi-Qualität, gewürfelt", gruppe: "Protein" },
      { menge: 200, einheit: "g", name: "Blumenkohlreis (oder gedämpfter Naturreis)", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Avocado, in Scheiben", gruppe: "Topping" },
      { menge: 100, einheit: "g", name: "Edamame (Sojabohnen), aus der Schote", gruppe: "Topping" },
      { menge: 0.5, einheit: "Stk.", name: "Gurke, in dünnen Scheiben", gruppe: "Topping" },
      { menge: 2, einheit: "TL", name: "Sesam, geröstet", gruppe: "Garnitur" },
      { menge: 2, einheit: "Blatt", name: "Nori-Algen, in Streifen", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Marinade: Miso, Reisessig, Sesamöl, Ingwer und Tamari in Mixtopf: 10 Sek. / Stufe 3.",
      "Fisch in Marinade 10–15 Min. ziehen lassen (im Kühlschrank).",
      "Für Blumenkohlreis: Blumenkohl in Röschen in den Mixtopf: 5 Sek. / Stufe 5 zerkleinern. 5 Min. / Varoma / Linkslauf / Stufe 1 dämpfen.",
      "Bowls zusammenstellen: Blumenkohlreis als Basis, alle Toppings anrichten, Fisch obenauf.",
      "Mit Sesam und Nori garnieren.",
    ],
    schritte: [
      "Marinade verrühren, Fisch 10–15 Min. darin marinieren.",
      "Blumenkohl im Foodprocessor zu Reis zerkleinern, kurz anbraten.",
      "Alle Komponenten in Bowls anrichten.",
    ],
    hinweis: "💡 Miso (fermentiert) + Edamame (Phytoöstrogene) = Doppelunterstützung in Power Phase 2.",
  },

  // ── DESSERTS ──────────────────────────────────────────────────
  chocolate_chia_pudding: {
    id: "chocolate_chia_pudding", name: "Schokoladen-Mandel-Chia-Pudding",
    kategorie: "dessert", phasen: ["nurture","power1"],
    ernährungsstil: ["hormone_feasting","ketobiotic"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 310, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 182",
    zutaten: [
      { menge: 360, einheit: "ml", name: "Mandelmilch, ungesüßt", gruppe: "Flüssigkeit" },
      { menge: 3, einheit: "EL", name: "roher Kakao oder Kakaopulver, ungesüßt", gruppe: "Schokolade" },
      { menge: 2, einheit: "EL", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Aroma" },
      { menge: 60, einheit: "g", name: "Chiasamen", gruppe: "Basis" },
      { menge: 30, einheit: "g", name: "Mandeln, grob gehackt (zum Servieren)", gruppe: "Topping" },
    ],
    thermomix: true,
    schritte_tm: [
      "Mandelmilch, Kakao, Ahornsirup, Vanille und Salz in den Mixtopf: 20 Sek. / Stufe 4 verquirlen.",
      "Chiasamen einrühren: 10 Sek. / Stufe 3.",
      "In Gläser füllen und mindestens 30 Min. (besser über Nacht) im Kühlschrank fest werden lassen.",
      "Mit gehackten Mandeln servieren.",
    ],
    schritte: [
      "Alle Flüssigkeiten und Kakao verquirlen.",
      "Chiasamen einrühren.",
      "Mindestens 30 Min. kühlen.",
      "Mit Mandeln servieren.",
    ],
    hinweis: "💡 Dunkle Schokolade (Kakao) enthält Magnesium — das Anti-PMS-Mineral der Nurture-Phase.",
  },

  maple_peanut_fudge: {
    id: "maple_peanut_fudge", name: "Ahornsirup-Erdnuss-Fudge",
    kategorie: "dessert", phasen: ["nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 180, schwierigkeit: "Leicht", portionenBasis: 16,
    buchSeite: "S. 184",
    zutaten: [
      { menge: 80, einheit: "ml", name: "Kokosöl, sanft geschmolzen", gruppe: "Fett" },
      { menge: 240, einheit: "g", name: "Erdnussbutter (oder Mandelbutter), cremig, ungesüßt", gruppe: "Basis" },
      { menge: 4, einheit: "EL", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 0.5, einheit: "TL", name: "Meersalz, grob", gruppe: "Finish" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kokosöl in den Mixtopf: 2 Min. / 40°C / Stufe 2 schmelzen.",
      "Erdnussbutter, Ahornsirup und Vanille zugeben: 30 Sek. / Stufe 4 cremig rühren.",
      "In eine mit Backpapier ausgelegte Form (20×20 cm) gießen, Meersalz darüber streuen.",
      "Mindestens 2 Stunden im Gefrierschrank fest werden lassen.",
      "In ca. 16 Würfel schneiden. Im Tiefkühler aufbewahren.",
    ],
    schritte: [
      "Kokosöl sanft schmelzen.",
      "Alle Zutaten cremig verrühren.",
      "In Form gießen, Salz drüber.",
      "2 Stunden einfrieren, dann in Würfel schneiden.",
    ],
    hinweis: "💡 Erdnussbutter liefert Tryptophan — die Serotonin-Vorstufe für bessere Stimmung in der Lutealphase.",
  },

  keto_cheesecake: {
    id: "keto_cheesecake", name: "Keto Baskischer Käsekuchen",
    kategorie: "dessert", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 65, kalorien: 420, schwierigkeit: "Mittel", portionenBasis: 8,
    buchSeite: "S. 262",
    zutaten: [
      { menge: 500, einheit: "g", name: "Frischkäse (Vollfett), Raumtemperatur", gruppe: "Basis" },
      { menge: 150, einheit: "g", name: "Erythritol oder Birkenzucker", gruppe: "Süße" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 3, einheit: "Stk.", name: "Eier, Größe L, Raumtemperatur", gruppe: "Bindung" },
      { menge: 200, einheit: "ml", name: "Schlagsahne (35% Fett)", gruppe: "Cremigkeit" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Geschmack" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 220°C Ober-/Unterhitze vorheizen. Springform (20 cm) mit Backpapier auslegen — Papier über den Rand hinaus.",
      "Frischkäse, Erythritol und Vanille in den Mixtopf: 30 Sek. / Stufe 4 cremig rühren.",
      "Eier einzeln zugeben, je 10 Sek. / Stufe 3 unterrühren.",
      "Sahne und Salz zugeben: 20 Sek. / Stufe 3.",
      "Masse in die Form gießen und auf mittlerer Schiene 50–55 Min. backen (muss oben sehr dunkel werden!).",
      "Vollständig abkühlen, dann mindestens 3 Stunden kalt stellen.",
    ],
    schritte: [
      "Frischkäse cremig rühren.",
      "Erythritol, Vanille und Salz einrühren.",
      "Eier einzeln unterrühren.",
      "Sahne unterheben.",
      "In Springform bei 220°C ca. 55 Min. backen (dunkel lassen!).",
    ],
    hinweis: "💡 Ohne Kohlenhydrate, vollfett — ideal für Ketobiotic in Power Phase 1.",
  },

  // ── SMOOTHIES ──────────────────────────────────────────────────
  wild_blueberry_smoothie: {
    id: "wild_blueberry_smoothie", name: "Wildblaubeer-Smoothie",
    kategorie: "smoothie", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 280, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 192",
    zutaten: [
      { menge: 240, einheit: "ml", name: "Mandelmilch, ungesüßt, kalt", gruppe: "Flüssigkeit" },
      { menge: 150, einheit: "g", name: "Wildblaubeeren, gefroren", gruppe: "Frucht" },
      { menge: 30, einheit: "g", name: "Vanille-Proteinpulver (pflanzlich)", gruppe: "Protein" },
      { menge: 1, einheit: "EL", name: "Leinsamen, gemahlen", gruppe: "Omega-3" },
      { menge: 1, einheit: "TL", name: "Maca-Pulver", gruppe: "Adaptogen" },
      { menge: 5, einheit: "Stk.", name: "Eiswürfel", gruppe: "Konsistenz" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in den Mixtopf geben.",
      "1 Min. / Stufe 10 mixen bis cremig.",
      "Sofort trinken.",
    ],
    schritte: ["Alle Zutaten in den Mixer, 60 Sek. auf höchster Stufe. Sofort trinken."],
    hinweis: "💡 Wildblaubeeren haben 3× mehr Antioxidantien als kultivierte — unterstützen Östrogen-Entgiftung.",
  },

  heal_body_smoothie: {
    id: "heal_body_smoothie", name: "Heal Your Body Smoothie",
    kategorie: "smoothie", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 240, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 194",
    zutaten: [
      { menge: 240, einheit: "ml", name: "Kokoswasser, kalt", gruppe: "Flüssigkeit" },
      { menge: 60, einheit: "g", name: "Baby-Spinat, frisch", gruppe: "Grün" },
      { menge: 0.5, einheit: "Stk.", name: "Avocado, reif", gruppe: "Fett" },
      { menge: 1, einheit: "TL", name: "Ashwagandha-Pulver", gruppe: "Adaptogen" },
      { menge: 1, einheit: "TL", name: "Cordyceps-Pulver (optional)", gruppe: "Adaptogen" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Säure" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Elektrolyte" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in den Mixtopf geben.",
      "1 Min. / Stufe 10 mixen.",
      "Ggf. etwas Wasser für gewünschte Konsistenz zugeben.",
    ],
    schritte: ["Alle Zutaten in Mixer, 2 Min. bis cremig."],
    hinweis: "💡 Ashwagandha ist das wichtigste Adaptogen für Cortisol-Reduktion und Hormonbalance.",
  },

  choco_maca_smoothie: {
    id: "choco_maca_smoothie", name: "Choco-Maca-Smoothie",
    kategorie: "smoothie", phasen: ["manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 310, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 190",
    zutaten: [
      { menge: 240, einheit: "ml", name: "Mandelmilch, ungesüßt", gruppe: "Flüssigkeit" },
      { menge: 30, einheit: "g", name: "Schokoladen-Proteinpulver", gruppe: "Protein" },
      { menge: 2, einheit: "TL", name: "Maca-Pulver", gruppe: "Adaptogen" },
      { menge: 1, einheit: "EL", name: "roher Kakao", gruppe: "Schokolade" },
      { menge: 1, einheit: "EL", name: "Mandelbutter", gruppe: "Fett" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 5, einheit: "Stk.", name: "Eiswürfel", gruppe: "Konsistenz" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in den Mixtopf: 1 Min. / Stufe 10. Sofort trinken."],
    schritte: ["Alle Zutaten mixen bis cremig."],
    hinweis: "💡 Maca steigert Testosteron und Libido — ideal in der Manifestationsphase rund um den Eisprung.",
  },

  // ── BRÜHEN & FERMENTIERTES ────────────────────────────────────
  bone_broth_beef: {
    id: "bone_broth_beef", name: "Rinder-Knochenbrühe",
    kategorie: "broth", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 720, kalorien: 40, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 266",
    zutaten: [
      { menge: 1.5, einheit: "kg", name: "Rinderknochen (Markknochen + Gelenkknochen gemischt)", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Apfelessig (mit Mutter!) — löst Mineralien", gruppe: "Schlüsselzutat" },
      { menge: 2, einheit: "Stk.", name: "Karotten, grob gehackt", gruppe: "Gemüse" },
      { menge: 2, einheit: "Stk.", name: "Selleriestangen, grob gehackt", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, halbiert (ungeschält für Farbe)", gruppe: "Aromaten" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen, angedrückt", gruppe: "Aromaten" },
      { menge: 1, einheit: "TL", name: "schwarze Pfefferkörner", gruppe: "Gewürze" },
      { menge: 2, einheit: "Zweige", name: "frischer Thymian oder Rosmarin", gruppe: "Kräuter" },
      { menge: 3, einheit: "l", name: "kaltes Wasser", gruppe: "Flüssigkeit" },
    ],
    thermomix: false,
    schritte: [
      "Backofen auf 200°C vorheizen. Knochen auf Backblech 30 Min. rösten bis braun.",
      "Knochen in großen Topf geben, mit Wasser und Apfelessig bedecken.",
      "30 Min. stehen lassen (Essig zieht Mineralien heraus), dann aufkochen.",
      "Schaum abschöpfen, Gemüse und Gewürze zugeben.",
      "Hitze reduzieren: 12–24 Stunden auf kleinstem Feuer köcheln (oder 8h im Slowcooker).",
      "Durch feines Sieb abseihen, abkühlen lassen, Fettschicht entfernen.",
      "In Gläser füllen: 5 Tage im Kühlschrank oder 3 Monate gefroren haltbar.",
    ],
    hinweis: "💡 Apfelessig ist PFLICHT — ohne ihn werden die Mineralien nicht aus den Knochen gelöst. Glycin aus dem Kollagen unterstützt die Leberfunktion und Hormon-Entgiftung.",
  },

  mushroom_broth: {
    id: "mushroom_broth", name: "Funktionelle Pilzbrühe",
    kategorie: "broth", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 45, kalorien: 25, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 272",
    zutaten: [
      { menge: 1.5, einheit: "l", name: "Wasser", gruppe: "Flüssigkeit" },
      { menge: 30, einheit: "g", name: "getrocknete Reishi-Pilze", gruppe: "Heilpilze" },
      { menge: 20, einheit: "g", name: "getrocknete Shiitake-Pilze", gruppe: "Heilpilze" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, angedrückt", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "Ingwerstück (3 cm), in Scheiben", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Tamari-Sauce", gruppe: "Umami" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Abschmecken" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in den Mixtopf geben.",
      "40 Min. / 95°C / Linkslauf / Stufe 1 köcheln.",
      "Durch feines Sieb abseihen.",
      "Warm in Tassen servieren oder einfrieren.",
    ],
    schritte: [
      "Alle Zutaten in Topf geben, aufkochen.",
      "30 Min. auf kleiner Flamme köcheln.",
      "Abseihen und warm trinken.",
    ],
    hinweis: "💡 Reishi: Adaptogen, senkt Cortisol. Shiitake: Vitamin D2, Immunbooster. Ideal als Fastenbrühe.",
  },

  turmeric_sauerkraut: {
    id: "turmeric_sauerkraut", name: "Kurkuma-Sauerkraut",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 30, kalorien: 20, schwierigkeit: "Mittel", portionenBasis: 16,
    buchSeite: "S. 282",
    zutaten: [
      { menge: 1, einheit: "Stk.", name: "Weißkohl (ca. 900 g), fein gehobelt", gruppe: "Basis" },
      { menge: 1.5, einheit: "TL", name: "Meersalz (nicht jodiert!)", gruppe: "Fermentation" },
      { menge: 2, einheit: "TL", name: "Kurkuma, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel, gemahlen", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "frischer Ingwer, gerieben", gruppe: "Gewürze" },
      { menge: 1, einheit: "Prise", name: "schwarzer Pfeffer (aktiviert Kurkuma)", gruppe: "Gewürze" },
    ],
    thermomix: false,
    schritte: [
      "Kohl fein hobeln, in große Schüssel geben.",
      "Salz zugeben und 10 Min. kräftig massieren bis Flüssigkeit austritt.",
      "Kurkuma, Kreuzkümmel, Ingwer und Pfeffer einmassieren.",
      "Masse in sauberes Einmachglas drücken, Flüssigkeit muss den Kohl bedecken.",
      "3–7 Tage bei Raumtemperatur fermentieren lassen (täglich eindrücken).",
      "Im Kühlschrank bis zu 2 Monate haltbar.",
    ],
    hinweis: "💡 Fermentiertes Gemüse enthält lebende Probiotika — stärken das Mikrobiom für optimale Hormonsignalisierung.",
  },

  // ── BREAK FAST ERGÄNZUNGEN ──────────────────────────────────
  all_greens_bowl: {
    id: "all_greens_bowl", name: "All the Greens Bowl",
    kategorie: "break_fast", phasen: ["power2","manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 340, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 148",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 100, einheit: "g", name: "Brokkoli-Röschen", gruppe: "Gemüse" },
      { menge: 100, einheit: "g", name: "Zucchini, in Scheiben", gruppe: "Gemüse" },
      { menge: 100, einheit: "g", name: "Erbsen, frisch oder gefroren", gruppe: "Gemüse" },
      { menge: 60, einheit: "g", name: "Baby-Spinat", gruppe: "Gemüse" },
      { menge: 180, einheit: "g", name: "Quinoa oder Naturreis, gekocht", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Tahini", gruppe: "Dressing" },
      { menge: 2, einheit: "EL", name: "Zitronensaft", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: false,
    schritte: [
      "Öl erhitzen, Knoblauch 1 Min. andünsten.",
      "Brokkoli und Zucchini 5 Min. garen.",
      "Erbsen und Spinat 2 Min. mitgaren.",
      "Tahini und Zitronensaft zu Dressing verrühren.",
      "Quinoa in Bowls, Gemüse obenauf, Dressing darüber.",
    ],
    hinweis: "💡 Brokkoli enthält DIM — unterstützt aktiv den Östrogen-Abbau in der Leber.",
  },

  fettuccine_alfredo: {
    id: "fettuccine_alfredo", name: "Fettuccine Alfredo (vegan)",
    kategorie: "break_fast", phasen: ["nurture","manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan"],
    zeit: 30, kalorien: 490, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 136",
    zutaten: [
      { menge: 320, einheit: "g", name: "Fettuccine (oder Hülsenfrucht-Pasta)", gruppe: "Pasta" },
      { menge: 1, einheit: "TL", name: "Meersalz (Nudelwasser)", gruppe: "Pasta" },
      { menge: 150, einheit: "g", name: "Cashews, über Nacht eingeweicht", gruppe: "Sauce" },
      { menge: 240, einheit: "ml", name: "Nudelkochwasser (aufbewahren!)", gruppe: "Sauce" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Sauce" },
      { menge: 3, einheit: "EL", name: "Hefeflocken", gruppe: "Sauce" },
      { menge: 2, einheit: "EL", name: "Zitronensaft", gruppe: "Sauce" },
      { menge: 1, einheit: "EL", name: "weißes Miso", gruppe: "Sauce" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Sauce" },
      { menge: 2, einheit: "EL", name: "frische Petersilie, gehackt", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Pasta in gesalzenem Wasser kochen. 240 ml Nudelwasser aufbewahren!",
      "Cashews, Nudelwasser, Knoblauch, Hefeflocken, Zitronensaft, Miso und Salz: 1 Min. / Stufe 10.",
      "Abgetropfte Pasta unterheben. Mit Petersilie servieren.",
    ],
    schritte: [
      "Pasta kochen, Nudelwasser aufbewahren.",
      "Cashews mit Nudelwasser, Knoblauch, Hefeflocken, Zitronensaft und Miso cremig mixen.",
      "Mit Pasta vermengen.",
    ],
    hinweis: "💡 Cashews liefern Magnesium und Zink — essenziell für Progesteron.",
  },

  lasagna: {
    id: "lasagna", name: "Vegane Lasagne",
    kategorie: "break_fast", phasen: ["nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan"],
    zeit: 75, kalorien: 520, schwierigkeit: "Mittel", portionenBasis: 6,
    buchSeite: "S. 138",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 400, einheit: "g", name: "Linsen, gekocht", gruppe: "Füllung" },
      { menge: 400, einheit: "g", name: "Dosentomaten, passiert", gruppe: "Füllung" },
      { menge: 2, einheit: "TL", name: "getrockneter Oregano", gruppe: "Kräuter" },
      { menge: 150, einheit: "g", name: "Cashews, eingeweicht", gruppe: "Béchamel" },
      { menge: 300, einheit: "ml", name: "Mandelmilch", gruppe: "Béchamel" },
      { menge: 3, einheit: "EL", name: "Hefeflocken", gruppe: "Béchamel" },
      { menge: 0.5, einheit: "TL", name: "Muskatnuss, gemahlen", gruppe: "Béchamel" },
      { menge: 100, einheit: "g", name: "Baby-Spinat", gruppe: "Füllung" },
      { menge: 250, einheit: "g", name: "Lasagneplatten", gruppe: "Pasta" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 190°C vorheizen.",
      "Zwiebel: 3 Sek./Stufe 5. Öl: 4 Min./120°C/Stufe 1.",
      "Knoblauch, Tomaten, Linsen, Oregano: 15 Min./100°C/Linkslauf/Stufe 1. Umfüllen.",
      "Cashews, Mandelmilch, Hefeflocken, Muskat: 1 Min./Stufe 10 zu Béchamel.",
      "Schichten: Sauce, Platten, Spinat, Béchamel. 45 Min. backen.",
    ],
    schritte: [
      "Linsensauce kochen.",
      "Cashew-Béchamel mixen.",
      "Schichten und 45 Min. bei 190°C backen.",
    ],
  },

  protein_banana_donuts: {
    id: "protein_banana_donuts", name: "Protein-Bananen-Donut-Holes",
    kategorie: "break_fast", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 25, kalorien: 130, schwierigkeit: "Leicht", portionenBasis: 12,
    buchSeite: "S. 141",
    zutaten: [
      { menge: 2, einheit: "Stk.", name: "reife Bananen, zerdrückt", gruppe: "Basis" },
      { menge: 60, einheit: "g", name: "Mandelmehl", gruppe: "Basis" },
      { menge: 30, einheit: "g", name: "Vanille-Proteinpulver", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Chiasamen", gruppe: "Basis" },
      { menge: 1, einheit: "TL", name: "Zimt, gemahlen", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Backpulver", gruppe: "Triebmittel" },
      { menge: 1, einheit: "TL", name: "Kokosöl (zum Einfetten)", gruppe: "Fett" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 180°C vorheizen. Mini-Muffinform fetten.",
      "Bananen: 10 Sek./Stufe 4. Alle Zutaten: 20 Sek./Stufe 4.",
      "In Mini-Muffinform füllen. 18–20 Min. backen.",
    ],
    schritte: ["Bananen zerdrücken, alles vermengen, in Mini-Muffin-Form 18–20 Min. bei 180°C backen."],
    hinweis: "💡 Bananen: Vitamin B6 für Progesteron und Serotonin-Produktion.",
  },

  orange_chia_muffins: {
    id: "orange_chia_muffins", name: "Orangen-Chia-Muffins",
    kategorie: "break_fast", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 35, kalorien: 180, schwierigkeit: "Leicht", portionenBasis: 12,
    buchSeite: "S. 188",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Leinsamen gemahlen + 6 EL Wasser (= 3 Leinsamen-Eier)", gruppe: "Bindung" },
      { menge: 2, einheit: "Stk.", name: "Orangen, Schale und Saft", gruppe: "Aroma" },
      { menge: 80, einheit: "ml", name: "Kokosöl, geschmolzen", gruppe: "Fett" },
      { menge: 80, einheit: "ml", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 200, einheit: "g", name: "Mandelmehl", gruppe: "Mehl" },
      { menge: 50, einheit: "g", name: "Hafermehl (GF)", gruppe: "Mehl" },
      { menge: 3, einheit: "EL", name: "Chiasamen", gruppe: "Extra" },
      { menge: 1.5, einheit: "TL", name: "Backpulver", gruppe: "Triebmittel" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Leinsamen-Eier 10 Min. quellen lassen.",
      "Orangenschale, -saft, Kokosöl, Ahornsirup: 20 Sek./Stufe 3.",
      "Restliche Zutaten: 20 Sek./Stufe 4.",
      "In Muffinform füllen, 22–25 Min. bei 180°C backen.",
    ],
    schritte: ["Leinsamen-Eier quellen, alle Zutaten vermengen, 22–25 Min. bei 180°C backen."],
    hinweis: "💡 Orangenschale enthält Hesperidin — moduliert Östrogen-Rezeptoren.",
  },

  // ── SUPPEN ────────────────────────────────────────────────────
  navy_bean_soup: {
    id: "navy_bean_soup", name: "Toskanische Weißbohnen-Grünkohl-Suppe",
    kategorie: "hormone_feasting", phasen: ["nurture","manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 35, kalorien: 360, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 150",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Selleriestangen, gewürfelt", gruppe: "Gemüse" },
      { menge: 2, einheit: "Stk.", name: "Karotten, gewürfelt", gruppe: "Gemüse" },
      { menge: 1, einheit: "TL", name: "getrockneter Thymian", gruppe: "Kräuter" },
      { menge: 480, einheit: "g", name: "weiße Bohnen (2 Dosen), abgetropft", gruppe: "Hülsenfrüchte" },
      { menge: 1, einheit: "l", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 150, einheit: "g", name: "Grünkohl, grob gehackt", gruppe: "Gemüse" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel: 3 Sek./Stufe 5. Öl: 4 Min./120°C/Stufe 1.",
      "Knoblauch, Sellerie, Karotten, Thymian: 3 Min./120°C/Stufe 1.",
      "Bohnen und Brühe: 20 Min./100°C/Linkslauf/Stufe 1.",
      "Grünkohl: 5 Min./100°C/Linkslauf/Stufe 1.",
    ],
    schritte: ["Gemüse andünsten, Bohnen und Brühe zugeben, 20 Min. köcheln, Grünkohl zugeben."],
    hinweis: "💡 Weiße Bohnen: hoher Folsäure- und Magnesiumgehalt für die Nurture-Phase.",
  },

  black_bean_soup: {
    id: "black_bean_soup", name: "Schwarze-Bohnen-Suppe",
    kategorie: "hormone_feasting", phasen: ["nurture","manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 30, kalorien: 330, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 149",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "grüne Paprika, gewürfelt", gruppe: "Gemüse" },
      { menge: 2, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Chiliflocken", gruppe: "Gewürze" },
      { menge: 720, einheit: "g", name: "schwarze Bohnen (3 Dosen), abgetropft", gruppe: "Hülsenfrüchte" },
      { menge: 720, einheit: "ml", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Abschmecken" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel: 3 Sek./Stufe 5. Öl: 4 Min./120°C/Stufe 1.",
      "Knoblauch, Paprika, Gewürze: 3 Min./120°C/Stufe 1.",
      "Bohnen und Brühe: 20 Min./100°C/Linkslauf/Stufe 1.",
      "Halb pürieren: 20 Sek./Stufe 7. Limette einrühren.",
    ],
    schritte: ["Gemüse andünsten, Bohnen und Brühe 20 Min. köcheln, teilweise pürieren."],
  },

  split_pea_soup: {
    id: "split_pea_soup", name: "Erbsensuppe mit Kichererbsen-Crunchies",
    kategorie: "hormone_feasting", phasen: ["nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 45, kalorien: 380, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 130",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Karotten, gewürfelt", gruppe: "Gemüse" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Kurkuma", gruppe: "Gewürze" },
      { menge: 300, einheit: "g", name: "gelbe Schälerbsen, gespült", gruppe: "Hülsenfrüchte" },
      { menge: 1.2, einheit: "l", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 240, einheit: "g", name: "Kichererbsen (1 Dose), trockengetupft", gruppe: "Crunchies" },
      { menge: 1, einheit: "TL", name: "Paprikapulver geräuchert (für Crunchies)", gruppe: "Crunchies" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kichererbsen mit etwas Öl und Paprika auf Blech: 200°C, 25 Min. rösten.",
      "Zwiebel: 3 Sek./Stufe 5. Öl: 3 Min./120°C/Stufe 1.",
      "Gemüse, Erbsen, Brühe: 35 Min./100°C/Linkslauf/Stufe 1.",
      "Pürieren: 40 Sek./Stufe 8. Mit Crunchies servieren.",
    ],
    schritte: ["Kichererbsen rösten. Suppe kochen und pürieren. Mit Crunchies servieren."],
  },

  pumpkin_soup: {
    id: "pumpkin_soup", name: "Kürbissuppe",
    kategorie: "ketobiotic", phasen: ["power1","power2","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 35, kalorien: 220, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 204",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "Ingwer (2 cm), gerieben", gruppe: "Aromaten" },
      { menge: 800, einheit: "g", name: "Hokkaido-Kürbis, gewürfelt (Schale bleibt!)", gruppe: "Basis" },
      { menge: 1, einheit: "TL", name: "Kurkuma", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Muskatnuss", gruppe: "Gewürze" },
      { menge: 800, einheit: "ml", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 200, einheit: "ml", name: "Kokosmilch, vollfett", gruppe: "Cremigkeit" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Abschmecken" },
      { menge: 2, einheit: "EL", name: "Kürbiskerne, geröstet", gruppe: "Topping" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel: 3 Sek./Stufe 5. Öl: 3 Min./120°C/Stufe 1.",
      "Knoblauch, Ingwer, Kürbis, Gewürze: 3 Min./120°C/Linkslauf/Stufe 1.",
      "Brühe und Kokosmilch: 25 Min./100°C/Linkslauf/Stufe 1.",
      "1 Min./Stufe 10 pürieren. Mit Limette abschmecken.",
    ],
    schritte: ["Aromaten andünsten, Kürbis mitbraten, Brühe und Kokosmilch zugeben, 25 Min. köcheln, pürieren."],
    hinweis: "💡 Kürbiskerne = beste Magnesiumquelle für die Nurture-Phase.",
  },

  zucchini_string_bean_soup: {
    id: "zucchini_string_bean_soup", name: "Zucchini-Grüne-Bohnen-Suppe",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 30, kalorien: 180, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 202",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Zucchini, in Scheiben", gruppe: "Gemüse" },
      { menge: 200, einheit: "g", name: "grüne Bohnen, halbiert", gruppe: "Gemüse" },
      { menge: 1, einheit: "l", name: "Gemüsebrühe", gruppe: "Flüssigkeit" },
      { menge: 1, einheit: "Handvoll", name: "frisches Basilikum", gruppe: "Kräuter" },
      { menge: 2, einheit: "EL", name: "Zitronensaft", gruppe: "Abschmecken" },
    ],
    thermomix: true,
    schritte_tm: [
      "Zwiebel: 3 Sek./Stufe 5. Öl: 3 Min./120°C/Stufe 1.",
      "Zucchini, Bohnen, Brühe: 20 Min./100°C/Linkslauf/Stufe 1.",
      "Basilikum und Zitronensaft: 20 Sek./Stufe 8 pürieren.",
    ],
    schritte: ["Gemüse andünsten, Brühe zugeben, 20 Min. köcheln, mit Basilikum pürieren."],
  },

  beef_stew: {
    id: "beef_stew", name: "Rindfleisch-Eintopf mit Bier",
    kategorie: "hormone_feasting", phasen: ["manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 120, kalorien: 540, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 152",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 800, einheit: "g", name: "Rindergulasch, in Würfeln", gruppe: "Protein" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 330, einheit: "ml", name: "dunkles Bier (GF nach Wunsch)", gruppe: "Flüssigkeit" },
      { menge: 500, einheit: "ml", name: "Rinderbrühe", gruppe: "Flüssigkeit" },
      { menge: 3, einheit: "Stk.", name: "Karotten, in Stücken", gruppe: "Gemüse" },
      { menge: 3, einheit: "Stk.", name: "Kartoffeln, in Würfeln", gruppe: "Gemüse" },
      { menge: 2, einheit: "Zweige", name: "Thymian", gruppe: "Kräuter" },
    ],
    thermomix: false,
    schritte: [
      "Fleisch anbraten, herausnehmen.",
      "Zwiebel und Knoblauch andünsten.",
      "Bier einköcheln, Brühe und Fleisch zugeben: 45 Min. köcheln.",
      "Karotten und Kartoffeln: 30 Min. weich garen.",
    ],
    hinweis: "💡 Rindfleisch: Zink und B12 für Testosteron in der Manifestationsphase.",
  },

  portuguese_pork_stew: {
    id: "portuguese_pork_stew", name: "Portugiesischer Schweinefleisch-Grünkohl-Eintopf",
    kategorie: "hormone_feasting", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 60, kalorien: 480, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 131",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 600, einheit: "g", name: "Schweineschulter, in Würfeln", gruppe: "Protein" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 200, einheit: "ml", name: "Weißwein (trocken)", gruppe: "Flüssigkeit" },
      { menge: 400, einheit: "g", name: "Dosentomaten", gruppe: "Sauce" },
      { menge: 400, einheit: "g", name: "Kartoffeln, in Würfeln", gruppe: "Gemüse" },
      { menge: 200, einheit: "g", name: "Grünkohl, gehackt", gruppe: "Gemüse" },
      { menge: 1, einheit: "TL", name: "geräuchertes Paprikapulver", gruppe: "Gewürze" },
    ],
    thermomix: false,
    schritte: [
      "Fleisch anbraten.",
      "Zwiebel, Knoblauch, Wein einköcheln.",
      "Tomaten, Fleisch, Paprika: 30 Min. schmoren.",
      "Kartoffeln: 15 Min. garen.",
      "Grünkohl: 5 Min. mitgaren.",
    ],
  },

  // ── SALATE, BOWLS, HAUPTGERICHTE ─────────────────────────────
  black_eyed_pea_salad: {
    id: "black_eyed_pea_salad", name: "Black-Eyed-Pea-Crunch-Salat",
    kategorie: "ketobiotic", phasen: ["power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 310, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 212",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Dressing" },
      { menge: 2, einheit: "EL", name: "Apfelessig", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "Dijon-Senf", gruppe: "Dressing" },
      { menge: 480, einheit: "g", name: "schwarze Augenbohnen (2 Dosen), abgetropft", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, gewürfelt", gruppe: "Gemüse" },
      { menge: 0.5, einheit: "Stk.", name: "Gurke, gewürfelt", gruppe: "Gemüse" },
      { menge: 1, einheit: "Handvoll", name: "frische Petersilie", gruppe: "Kräuter" },
      { menge: 50, einheit: "g", name: "Sonnenblumenkerne, geröstet", gruppe: "Crunch" },
    ],
    thermomix: false,
    schritte: ["Dressing verrühren, alle Zutaten mischen, mit Sonnenblumenkernen toppen."],
  },

  arugula_salad: {
    id: "arugula_salad", name: "Rucola-Salat",
    kategorie: "ketobiotic", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 10, kalorien: 220, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 210",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Dressing" },
      { menge: 1, einheit: "EL", name: "Balsamico-Essig", gruppe: "Dressing" },
      { menge: 120, einheit: "g", name: "Rucola, frisch", gruppe: "Basis" },
      { menge: 60, einheit: "g", name: "Parmesan oder veganer Käse, gehobelt", gruppe: "Topping" },
      { menge: 30, einheit: "g", name: "Pinienkerne, geröstet", gruppe: "Topping" },
      { menge: 100, einheit: "g", name: "Kirschtomaten", gruppe: "Topping" },
    ],
    thermomix: false,
    schritte: ["Dressing verrühren. Rucola anrichten, Toppings drauf, Dressing kurz vor dem Servieren."],
    hinweis: "💡 Rucola: bitteres Grün — aktiviert Gallenproduktion für Östrogen-Entgiftung.",
  },

  cauliflower_rice_bowl: {
    id: "cauliflower_rice_bowl", name: "Blumenkohlreis-Bowl",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 280, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 220",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen, gehackt", gruppe: "Aromaten" },
      { menge: 600, einheit: "g", name: "Blumenkohl-Röschen", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Tamari-Sauce", gruppe: "Würzen" },
      { menge: 1, einheit: "TL", name: "Sesamöl", gruppe: "Würzen" },
      { menge: 100, einheit: "g", name: "Edamame, gegart", gruppe: "Protein" },
      { menge: 1, einheit: "Stk.", name: "Avocado, in Scheiben", gruppe: "Topping" },
      { menge: 2, einheit: "TL", name: "Sesam, geröstet", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Blumenkohl: 5 Sek./Stufe 5 zerkleinern.",
      "In Pfanne mit Öl, Knoblauch 5–7 Min. anrösten. Tamari und Sesamöl einrühren.",
      "Mit Edamame, Avocado, Sesam servieren.",
    ],
    schritte: ["Blumenkohl zu Reis zerkleinern, mit Knoblauch anrösten, würzen, mit Belag servieren."],
    hinweis: "💡 Blumenkohl: Sulforaphan — starkes Entgiftungsmittel für Östrogen.",
  },

  probiotic_bowl: {
    id: "probiotic_bowl", name: "Probiotik-Bowl",
    kategorie: "ketobiotic", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegetarisch","gf"],
    zeit: 10, kalorien: 320, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 222",
    zutaten: [
      { menge: 200, einheit: "g", name: "griechischer Joghurt oder Kokosjoghurt", gruppe: "Basis" },
      { menge: 100, einheit: "g", name: "Sauerkraut (roh, unpasteurisiert)", gruppe: "Probiotika" },
      { menge: 60, einheit: "g", name: "Kimchi", gruppe: "Probiotika" },
      { menge: 1, einheit: "Stk.", name: "Avocado, gewürfelt", gruppe: "Fett" },
      { menge: 100, einheit: "g", name: "Gurke, in Scheiben", gruppe: "Gemüse" },
      { menge: 2, einheit: "EL", name: "Leinsamen, gemahlen", gruppe: "Omega-3" },
      { menge: 1, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Dressing" },
    ],
    thermomix: false,
    schritte: ["Joghurt in Bowls, alle fermentierten Lebensmittel und Gemüse anrichten, mit Leinsamen und Öl fertigstellen."],
    hinweis: "💡 Mehrere fermentierte Lebensmittel = maximale Mikrobiom-Vielfalt.",
  },

  kimchi_edamame_bowl: {
    id: "kimchi_edamame_bowl", name: "Kimchi-Edamame-Bowl",
    kategorie: "ketobiotic", phasen: ["power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 350, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 218",
    zutaten: [
      { menge: 2, einheit: "TL", name: "Sesamöl", gruppe: "Dressing" },
      { menge: 1, einheit: "EL", name: "Tamari", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "Reisessig", gruppe: "Dressing" },
      { menge: 180, einheit: "g", name: "brauner Reis oder Blumenkohlreis, gekocht", gruppe: "Basis" },
      { menge: 150, einheit: "g", name: "Edamame, aus der Schote", gruppe: "Protein" },
      { menge: 100, einheit: "g", name: "Kimchi", gruppe: "Probiotika" },
      { menge: 1, einheit: "Stk.", name: "Avocado, in Scheiben", gruppe: "Fett" },
      { menge: 2, einheit: "TL", name: "Sesam, geröstet", gruppe: "Garnitur" },
    ],
    thermomix: false,
    schritte: ["Dressing verrühren. Alle Zutaten in Bowls anrichten, Dressing und Sesam drüber."],
    hinweis: "💡 Kimchi + Edamame = Probiotika und Phytoöstrogene kombiniert.",
  },

  chickpea_omelet: {
    id: "chickpea_omelet", name: "Kichererbsen-Omelett",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 300, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 158",
    zutaten: [
      { menge: 120, einheit: "g", name: "Kichererbsenmehl", gruppe: "Teig" },
      { menge: 240, einheit: "ml", name: "Wasser", gruppe: "Teig" },
      { menge: 2, einheit: "EL", name: "Hefeflocken", gruppe: "Teig" },
      { menge: 0.5, einheit: "TL", name: "Kala Namak (schwarzes Salz)", gruppe: "Teig" },
      { menge: 0.5, einheit: "TL", name: "Kurkuma", gruppe: "Teig" },
      { menge: 1, einheit: "EL", name: "Olivenöl (zum Braten)", gruppe: "Fett" },
      { menge: 100, einheit: "g", name: "Baby-Spinat", gruppe: "Füllung" },
      { menge: 100, einheit: "g", name: "Cherrytomaten, halbiert", gruppe: "Füllung" },
      { menge: 0.5, einheit: "Stk.", name: "Avocado", gruppe: "Füllung" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kichererbsenmehl, Wasser, Hefeflocken, Kala Namak, Kurkuma: 20 Sek./Stufe 4. 5 Min. ruhen.",
      "In geölter Pfanne 3 Min. backen, wenden.",
      "Mit Spinat, Tomaten und Avocado füllen.",
    ],
    schritte: ["Teig anrühren, in Pfanne backen, mit Spinat, Tomaten und Avocado füllen."],
  },

  tortilla_espanola: {
    id: "tortilla_espanola", name: "Tortilla Española",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 40, kalorien: 380, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 160",
    zutaten: [
      { menge: 100, einheit: "ml", name: "Olivenöl extra vergine", gruppe: "Fett" },
      { menge: 600, einheit: "g", name: "Kartoffeln, dünn gehobelt", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "große Zwiebel, in Ringe", gruppe: "Aromaten" },
      { menge: 6, einheit: "Stk.", name: "Eier, Größe L", gruppe: "Bindung" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: false,
    schritte: [
      "Kartoffeln und Zwiebel in Öl bei niedriger Hitze 20 Min. weich garen.",
      "Kartoffeln abgießen, mit verquirlten Eiern mischen, 5 Min. ruhen.",
      "In Pfanne 8–10 Min. bei niedriger Hitze stocken, dann wenden, 3–4 Min. fertiggaren.",
    ],
    hinweis: "💡 Eier und Olivenöl = alle Hormon-Grundbausteine in einem Gericht.",
  },

  chili_sweet_potato: {
    id: "chili_sweet_potato", name: "Chili-gefüllte Süßkartoffel",
    kategorie: "hormone_feasting", phasen: ["nurture","manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 55, kalorien: 440, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 162",
    zutaten: [
      { menge: 4, einheit: "Stk.", name: "Süßkartoffeln", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 1, einheit: "TL", name: "Chili-Pulver", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
      { menge: 240, einheit: "g", name: "schwarze Bohnen (1 Dose), abgetropft", gruppe: "Füllung" },
      { menge: 200, einheit: "g", name: "Dosentomaten, gewürfelt", gruppe: "Füllung" },
      { menge: 1, einheit: "Stk.", name: "Avocado, zerdrückt (Topping)", gruppe: "Topping" },
      { menge: 1, einheit: "Handvoll", name: "frischer Koriander", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Süßkartoffeln bei 200°C 45 Min. backen.",
      "Zwiebel: 3 Sek./Stufe 5. Öl: 3 Min./120°C/Stufe 1.",
      "Knoblauch, Gewürze, Bohnen, Tomaten: 15 Min./100°C/Linkslauf/Stufe 1.",
      "Süßkartoffeln füllen, mit Avocado und Koriander toppen.",
    ],
    schritte: ["Süßkartoffeln backen. Chili-Füllung kochen. Füllen und servieren."],
  },

  southwest_steak_hash: {
    id: "southwest_steak_hash", name: "Southwest Steak & Süßkartoffel-Hash",
    kategorie: "hormone_feasting", phasen: ["manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 35, kalorien: 510, schwierigkeit: "Mittel", portionenBasis: 2,
    buchSeite: "S. 170",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 300, einheit: "g", name: "Süßkartoffeln, kleine Würfel", gruppe: "Basis" },
      { menge: 0.5, einheit: "Stk.", name: "rote Zwiebel, gewürfelt", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, gewürfelt", gruppe: "Gemüse" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "Paprikapulver, geräuchert", gruppe: "Gewürze" },
      { menge: 400, einheit: "g", name: "Rumpsteak oder Hüftsteak", gruppe: "Protein" },
      { menge: 1, einheit: "Stk.", name: "Avocado, in Würfeln", gruppe: "Topping" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Finish" },
    ],
    thermomix: false,
    schritte: [
      "Süßkartoffeln 10 Min. anbraten, Zwiebel, Paprika, Gewürze 5 Min. mitgaren.",
      "Steak separat 3–4 Min. pro Seite braten, 5 Min. ruhen, aufschneiden.",
      "Mit Avocado und Limette servieren.",
    ],
    hinweis: "💡 Rotes Fleisch: maximiert Zink und Eisen für Testosteron-Peak.",
  },

  okonomiyaki: {
    id: "okonomiyaki", name: "Japanischer Herzhafter Pfannkuchen (Okonomiyaki)",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 30, kalorien: 340, schwierigkeit: "Mittel", portionenBasis: 2,
    buchSeite: "S. 173",
    zutaten: [
      { menge: 100, einheit: "g", name: "Kichererbsenmehl oder Reismehl", gruppe: "Teig" },
      { menge: 120, einheit: "ml", name: "Wasser", gruppe: "Teig" },
      { menge: 2, einheit: "Stk.", name: "Eier, Größe L", gruppe: "Teig" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Teig" },
      { menge: 200, einheit: "g", name: "Weißkohl, fein gehobelt", gruppe: "Gemüse" },
      { menge: 3, einheit: "Stk.", name: "Frühlingszwiebeln, in Ringe", gruppe: "Gemüse" },
      { menge: 150, einheit: "g", name: "Shrimps oder Thunfisch (optional)", gruppe: "Protein" },
      { menge: 2, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 2, einheit: "EL", name: "Tamari-Sauce", gruppe: "Sauce" },
      { menge: 1, einheit: "TL", name: "Sesam, geröstet", gruppe: "Garnitur" },
    ],
    thermomix: false,
    schritte: [
      "Mehl, Wasser, Eier, Salz zu Teig verrühren.",
      "Kohl, Frühlingszwiebeln und Protein einrühren.",
      "In geölter Pfanne 5–6 Min. pro Seite backen.",
      "Mit Tamari und Sesam servieren.",
    ],
    hinweis: "💡 Kohl enthält Indol-3-Carbinol — unterstützt Östrogen-Entgiftung.",
  },

  sardine_tostadas: {
    id: "sardine_tostadas", name: "Sardinen-Tostadas",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 20, kalorien: 380, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 176",
    zutaten: [
      { menge: 2, einheit: "EL", name: "Olivenöl (zum Einpinseln)", gruppe: "Fett" },
      { menge: 4, einheit: "Stk.", name: "kleine Mais-Tortillas", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Avocado, zerdrückt", gruppe: "Aufstrich" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Aufstrich" },
      { menge: 2, einheit: "Dosen", name: "Sardinen in Olivenöl (à 110 g), abgetropft", gruppe: "Protein" },
      { menge: 0.5, einheit: "Stk.", name: "rote Zwiebel, fein gehackt", gruppe: "Topping" },
      { menge: 1, einheit: "Handvoll", name: "frischer Koriander", gruppe: "Garnitur" },
    ],
    thermomix: false,
    schritte: [
      "Tortillas mit Öl einpinseln, in Pfanne knusprig braten.",
      "Avocado mit Limettensaft zerdrücken, auf Tostadas streichen.",
      "Sardinen, Zwiebel, Koriander obenauf.",
    ],
    hinweis: "💡 Sardinen: eine der reichsten Omega-3-Quellen für Hormonrezeptoren.",
  },


  lemongrass_chicken: {
    id: "lemongrass_chicken", name: "Zitronengras-Hähnchen",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 35, kalorien: 380, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 178",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 4, einheit: "Stk.", name: "Hähnchenschenkel, ohne Haut", gruppe: "Protein" },
      { menge: 2, einheit: "Stk.", name: "Zitronengrasstängel, fein gehackt", gruppe: "Aromaten" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 1, einheit: "EL", name: "frischer Ingwer, gerieben", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Tamari", gruppe: "Würzen" },
      { menge: 1, einheit: "EL", name: "Limettensaft", gruppe: "Säure" },
      { menge: 1, einheit: "TL", name: "Kurkuma", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 2, einheit: "EL", name: "frischer Koriander, gehackt", gruppe: "Garnitur" },
    ],
    thermomix: false,
    schritte_tm: [
      "Kokosöl 3 Min. / Varoma / Stufe 1 erhitzen.",
      "Hähnchen, Zitronengras, Knoblauch, Ingwer zugeben: 5 Min. / Varoma / Sanftrühren.",
      "Tamari, Limettensaft, Kurkuma, Salz einrühren: 20 Min. / 100°C / Sanftrühren.",
      "Mit Koriander bestreuen und servieren.",
    ],
    schritte: [
      "Kokosöl in Pfanne erhitzen. Hähnchen von allen Seiten anbraten (je 4 Min.).",
      "Zitronengras, Knoblauch, Ingwer dazugeben, 2 Min. mitbraten.",
      "Tamari, Limettensaft, Kurkuma einrühren. Hitze reduzieren.",
      "Zugedeckt 20 Min. bei mittlerer Hitze garen.",
      "Mit Koriander bestreuen und servieren.",
    ],
    hinweis: "💡 Zitronengras unterstützt die Verdauung und wirkt entzündungshemmend.",
  },

  greek_lamb: {
    id: "greek_lamb", name: "Griechische Lammkoteletts mit Feta-Creme",
    kategorie: "hormone_feasting", phasen: ["manifestation"],
    ernährungsstil: ["hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 30, kalorien: 560, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 182",
    zutaten: [
      { menge: 8, einheit: "Stk.", name: "Lammkoteletts", gruppe: "Protein" },
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 3, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 1, einheit: "TL", name: "getrockneter Oregano", gruppe: "Kräuter" },
      { menge: 1, einheit: "TL", name: "getrockneter Rosmarin", gruppe: "Kräuter" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 200, einheit: "g", name: "Feta, zerbröckelt", gruppe: "Feta-Creme" },
      { menge: 150, einheit: "g", name: "griechischer Joghurt", gruppe: "Feta-Creme" },
      { menge: 1, einheit: "EL", name: "Zitronensaft", gruppe: "Feta-Creme" },
      { menge: 1, einheit: "EL", name: "frische Minze, gehackt", gruppe: "Feta-Creme" },
    ],
    thermomix: true,
    schritte_tm: [
      "Feta, Joghurt, Zitronensaft, Minze in den Mixtopf: 20 Sek. / Stufe 4 zu Creme. Umfüllen.",
      "Lammkoteletts mit Olivenöl, Knoblauch, Oregano, Rosmarin marinieren.",
      "In heißer Grillpfanne je 3–4 Min. pro Seite grillen (TM6 nicht geeignet für Grillen).",
      "Auf Feta-Creme anrichten und sofort servieren.",
    ],
    schritte: [
      "Lammkoteletts mit Olivenöl, Knoblauch, Oregano, Rosmarin marinieren.",
      "Grillpfanne auf hohe Hitze. Koteletts je 3–4 Min. pro Seite grillen.",
      "Feta mit Joghurt, Zitronensaft und Minze cremig verrühren.",
      "Koteletts auf Feta-Creme anrichten.",
    ],
    hinweis: "💡 Lamm ist reich an Zink und B12 – wichtig für Testosteron in der Manifestationsphase.",
  },

  miso_pork: {
    id: "miso_pork", name: "Miso-mariniertes Schweinefilet",
    kategorie: "hormone_feasting", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 40, kalorien: 430, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 186",
    zutaten: [
      { menge: 600, einheit: "g", name: "Schweinefilet", gruppe: "Protein" },
      { menge: 3, einheit: "EL", name: "weißes Miso", gruppe: "Marinade" },
      { menge: 2, einheit: "EL", name: "Tamari", gruppe: "Marinade" },
      { menge: 1, einheit: "EL", name: "Sesamöl", gruppe: "Marinade" },
      { menge: 1, einheit: "EL", name: "Reisessig", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "frischer Ingwer, gerieben", gruppe: "Marinade" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Marinade" },
      { menge: 1, einheit: "EL", name: "Sesamsamen", gruppe: "Garnitur" },
      { menge: 2, einheit: "Stk.", name: "Frühlingszwiebeln, in Ringe", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Miso, Tamari, Sesamöl, Reisessig, Ingwer, Knoblauch in Mixtopf: 20 Sek. / Stufe 4 mixen.",
      "Marinade auf Filet streichen, mind. 30 Min. ruhen lassen.",
      "Im Backofen 200°C / 25 Min. garen.",
      "In Scheiben schneiden, mit Sesam und Frühlingszwiebeln servieren.",
    ],
    schritte: [
      "Miso, Tamari, Sesamöl, Reisessig, Ingwer, Knoblauch zu Marinade verrühren.",
      "Schweinefilet damit einreiben, mind. 30 Min. marinieren.",
      "Ofen auf 200°C. Filet 20–25 Min. backen.",
      "In Scheiben schneiden, mit Sesam und Frühlingszwiebeln servieren.",
    ],
    hinweis: "💡 Miso ist lebendige Fermentation – stärkt das Darmmikrobiom aktiv.",
  },

  spanish_shrimp: {
    id: "spanish_shrimp", name: "Spanische Knoblauch-Garnelen (Gambas al Ajillo)",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 15, kalorien: 320, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 190",
    zutaten: [
      { menge: 500, einheit: "g", name: "große Garnelen, geschält", gruppe: "Protein" },
      { menge: 80, einheit: "ml", name: "Olivenöl extra vergine", gruppe: "Fett" },
      { menge: 6, einheit: "Stk.", name: "Knoblauchzehen, in Scheiben", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "getrocknete Chilischote", gruppe: "Schärfe" },
      { menge: 100, einheit: "ml", name: "trockener Weißwein oder Fischfond", gruppe: "Flüssigkeit" },
      { menge: 1, einheit: "EL", name: "frische Petersilie, gehackt", gruppe: "Garnitur" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 1, einheit: "Stk.", name: "Zitrone, in Spalten", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Olivenöl: 2 Min. / Varoma / Stufe 1 erhitzen.",
      "Knoblauch und Chili zugeben: 2 Min. / Varoma / Sanftrühren.",
      "Garnelen, Weißwein, Salz zugeben: 4 Min. / Varoma / Sanftrühren.",
      "Mit Zitronensaft und Petersilie servieren.",
    ],
    schritte: [
      "Olivenöl in Pfanne bei mittlerer Hitze erwärmen.",
      "Knoblauch und Chili 1–2 Min. anbraten (nicht verbrennen!).",
      "Garnelen zugeben, je 1–2 Min. pro Seite braten bis rosa.",
      "Weißwein angießen, 1 Min. einkochen.",
      "Mit Zitronensaft und Petersilie servieren.",
    ],
    hinweis: "💡 Garnelen liefern Iod und Selen – essenziell für die Schilddrüsenhormone.",
  },

  spanish_tuna_salad: {
    id: "spanish_tuna_salad", name: "Spanischer Tomaten-Thunfisch-Salat",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 15, kalorien: 290, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 194",
    zutaten: [
      { menge: 2, einheit: "Dosen", name: "Thunfisch in Olivenöl (à 160g), abgetropft", gruppe: "Protein" },
      { menge: 4, einheit: "Stk.", name: "reife Tomaten, in Würfel", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "rote Zwiebel, fein gehackt", gruppe: "Gemüse" },
      { menge: 100, einheit: "g", name: "grüne Oliven, entkernt", gruppe: "Topping" },
      { menge: 50, einheit: "g", name: "Kapern", gruppe: "Topping" },
      { menge: 3, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Dressing" },
      { menge: 2, einheit: "EL", name: "Sherryessig", gruppe: "Dressing" },
      { menge: 1, einheit: "EL", name: "frische Petersilie, gehackt", gruppe: "Garnitur" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: false,
    schritte_tm: [],
    schritte: [
      "Tomaten, Zwiebel, Oliven und Kapern in Schüssel geben.",
      "Thunfisch in Stücken dazugeben.",
      "Olivenöl und Sherryessig darüber träufeln.",
      "Mit Petersilie abschmecken. 10 Min. ziehen lassen.",
    ],
    hinweis: "💡 Thunfisch in Olivenöl enthält Omega-3 und fettlösliche Vitamine in einem.",
  },

  turkish_eggs: {
    id: "turkish_eggs", name: "Türkische Eier mit Joghurt (Çilbir)",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 15, kalorien: 380, schwierigkeit: "Mittel", portionenBasis: 2,
    buchSeite: "S. 112",
    zutaten: [
      { menge: 200, einheit: "g", name: "griechischer Joghurt", gruppe: "Basis" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Basis" },
      { menge: 4, einheit: "Stk.", name: "Eier, sehr frisch", gruppe: "Protein" },
      { menge: 2, einheit: "EL", name: "Essig (zum Pochieren)", gruppe: "Pochieren" },
      { menge: 3, einheit: "EL", name: "Butter oder Ghee", gruppe: "Paprikabutter" },
      { menge: 1, einheit: "TL", name: "Paprikapulver, geräuchert", gruppe: "Paprikabutter" },
      { menge: 0.5, einheit: "TL", name: "Chiliflocken", gruppe: "Paprikabutter" },
      { menge: 1, einheit: "EL", name: "frischer Dill oder Petersilie", gruppe: "Garnitur" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Joghurt, Knoblauch, Salz in Mixtopf: 10 Sek. / Stufe 3. Auf Teller verteilen.",
      "Wasser im Varoma-Topf erhitzen. Eier im Varoma-Einsatz: 12 Min. / Varoma / Stufe 2 pochieren.",
      "Butter, Paprika, Chili: 3 Min. / 80°C / Stufe 1 zu Paprikabutter.",
      "Eier auf Joghurt setzen, Paprikabutter darüber, mit Dill garnieren.",
    ],
    schritte: [
      "Joghurt mit Knoblauch und Salz verrühren, auf Teller verteilen.",
      "Wasser mit Essig aufkochen, Hitze reduzieren.",
      "Eier einzeln einpochiern: 3–4 Min.",
      "Butter mit Paprika und Chili in kleiner Pfanne erhitzen.",
      "Eier auf Joghurt, Paprikabutter darüber, mit Dill garnieren.",
    ],
    hinweis: "💡 Joghurt + Ei = vollständige Aminosäuren mit Probiotika für den Darm.",
  },

  soft_scrambled_eggs: {
    id: "soft_scrambled_eggs", name: "Weiches Rührei mit Za'atar & Feta",
    kategorie: "break_fast", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegetarisch","gf"],
    zeit: 10, kalorien: 340, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 116",
    zutaten: [
      { menge: 4, einheit: "Stk.", name: "Eier", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Butter oder Ghee", gruppe: "Fett" },
      { menge: 2, einheit: "EL", name: "Za'atar-Gewürzmischung", gruppe: "Würzen" },
      { menge: 60, einheit: "g", name: "Feta, zerbröckelt", gruppe: "Topping" },
      { menge: 2, einheit: "EL", name: "frische Minze, gehackt", gruppe: "Garnitur" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 1, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Finish" },
    ],
    thermomix: true,
    schritte_tm: [
      "Eier, Salz, Butter in den Mixtopf: 4 Min. / 80°C / Stufe 2 zu cremigem Rührei garen.",
      "In Schüssel füllen.",
      "Mit Za'atar, Feta, Minze und Olivenöl garnieren.",
    ],
    schritte: [
      "Eier mit Salz leicht verquirlen.",
      "Butter in Pfanne bei niedriger Hitze schmelzen.",
      "Eier langsam mit Spatel von außen nach innen schieben bis cremig-weich.",
      "Mit Za'atar, Feta, Minze und Olivenöl garnieren.",
    ],
    hinweis: "💡 Za'atar (Thymian, Oregano, Sesam, Sumach) ist reich an Antioxidantien.",
  },

  turmeric_eggs_salmon: {
    id: "turmeric_eggs_salmon", name: "Kurkuma-Eier mit Räucherlachs",
    kategorie: "break_fast", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["omnivor","gf"],
    zeit: 15, kalorien: 420, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 120",
    zutaten: [
      { menge: 4, einheit: "Stk.", name: "Eier", gruppe: "Basis" },
      { menge: 1, einheit: "TL", name: "Kurkuma, gemahlen", gruppe: "Würzen" },
      { menge: 0.5, einheit: "TL", name: "schwarzer Pfeffer (aktiviert Kurkuma!)", gruppe: "Würzen" },
      { menge: 2, einheit: "EL", name: "Kokosöl oder Ghee", gruppe: "Fett" },
      { menge: 100, einheit: "g", name: "Räucherlachs", gruppe: "Protein" },
      { menge: 2, einheit: "EL", name: "Kapern", gruppe: "Topping" },
      { menge: 1, einheit: "EL", name: "frischer Dill", gruppe: "Garnitur" },
      { menge: 1, einheit: "Stk.", name: "Zitrone, in Scheiben", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Eier, Kurkuma, Pfeffer, Ghee in den Mixtopf: 4 Min. / 80°C / Stufe 2 zu Rührei garen.",
      "Auf Teller anrichten, Räucherlachs drapieren.",
      "Mit Kapern, Dill und Zitronenscheiben servieren.",
    ],
    schritte: [
      "Eier mit Kurkuma und Pfeffer verquirlen.",
      "Kokosöl in Pfanne erhitzen, Ei-Masse zu weichem Rührei garen.",
      "Auf Teller, Räucherlachs drauflegen, mit Kapern, Dill und Zitrone servieren.",
    ],
    hinweis: "💡 Schwarzer Pfeffer erhöht die Bioverfügbarkeit von Kurkuma um bis zu 2000%.",
  },

  tempeh_broccoli: {
    id: "tempeh_broccoli", name: "Tempeh & Brokkoli mit Forbidden Rice",
    kategorie: "hormone_feasting", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 40, kalorien: 440, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 198",
    zutaten: [
      { menge: 300, einheit: "g", name: "schwarzer Reis (Forbidden Rice)", gruppe: "Basis" },
      { menge: 400, einheit: "g", name: "Tempeh, in Würfel", gruppe: "Protein" },
      { menge: 1, einheit: "Stk.", name: "großer Brokkoli, in Röschen", gruppe: "Gemüse" },
      { menge: 3, einheit: "EL", name: "Tamari", gruppe: "Sauce" },
      { menge: 2, einheit: "EL", name: "Sesamöl", gruppe: "Sauce" },
      { menge: 1, einheit: "EL", name: "Reisessig", gruppe: "Sauce" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 1, einheit: "TL", name: "frischer Ingwer, gerieben", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Sesamsamen", gruppe: "Garnitur" },
      { menge: 2, einheit: "Stk.", name: "Frühlingszwiebeln", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Reis mit 600ml Wasser in Mixtopf: 35 Min. / 100°C / Stufe 1. Umfüllen.",
      "Tamari, Sesamöl, Essig, Knoblauch, Ingwer in Mixtopf: 20 Sek. / Stufe 3. Umfüllen.",
      "Tempeh separat in Pfanne goldbraun anbraten.",
      "Brokkoli im Varoma 10 Min. / Varoma / Stufe 2 dämpfen.",
      "Alles mit Sauce mischen, auf Reis servieren. Mit Sesam und Frühlingszwiebeln garnieren.",
    ],
    schritte: [
      "Schwarzen Reis nach Packungsanweisung kochen.",
      "Tamari, Sesamöl, Essig, Knoblauch, Ingwer zu Sauce verrühren.",
      "Tempeh in Pfanne mit etwas Öl goldbraun anbraten.",
      "Brokkoli dazugeben, 5 Min. mitbraten.",
      "Sauce darüber, auf Reis servieren. Mit Sesam und Frühlingszwiebeln garnieren.",
    ],
    hinweis: "💡 Schwarzer Reis ist reich an Anthocyanen – starke Antioxidantien für die Hormonbalance.",
  },

  quinoa_tofu_tabbouleh: {
    id: "quinoa_tofu_tabbouleh", name: "Quinoa-Tabbouleh mit gebratenem Tofu",
    kategorie: "hormone_feasting", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 30, kalorien: 390, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 202",
    zutaten: [
      { menge: 200, einheit: "g", name: "Quinoa", gruppe: "Basis" },
      { menge: 400, einheit: "g", name: "fester Tofu, in Würfel", gruppe: "Protein" },
      { menge: 1, einheit: "EL", name: "Tamari (zum Braten)", gruppe: "Tofu" },
      { menge: 1, einheit: "Bund", name: "frische Petersilie, fein gehackt", gruppe: "Tabbouleh" },
      { menge: 0.5, einheit: "Bund", name: "frische Minze, fein gehackt", gruppe: "Tabbouleh" },
      { menge: 3, einheit: "Stk.", name: "Tomaten, in Würfel", gruppe: "Tabbouleh" },
      { menge: 1, einheit: "Stk.", name: "Salatgurke, in Würfel", gruppe: "Tabbouleh" },
      { menge: 4, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Dressing" },
      { menge: 3, einheit: "EL", name: "Zitronensaft", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Quinoa mit 400ml Wasser: 15 Min. / 100°C / Stufe 1. Umfüllen, abkühlen lassen.",
      "Petersilie, Minze in Mixtopf: 5 Sek. / Stufe 5 hacken.",
      "Mit Quinoa, Tomaten, Gurke, Öl, Zitronensaft und Kreuzkümmel mischen.",
      "Tofu separat in Pfanne mit Tamari goldbraun braten. Obenauf anrichten.",
    ],
    schritte: [
      "Quinoa 15 Min. kochen, abkühlen lassen.",
      "Petersilie, Minze, Tomaten, Gurke mit Quinoa mischen.",
      "Mit Olivenöl, Zitronensaft, Kreuzkümmel abschmecken.",
      "Tofu in Pfanne mit Tamari goldbraun braten, obenauf anrichten.",
    ],
    hinweis: "💡 Petersilie enthält mehr Vitamin C als Orangen – gut für die Kollagenproduktion.",
  },

  kelp_noodle_pad_thai: {
    id: "kelp_noodle_pad_thai", name: "Kelp-Nudel Pad Thai",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 25, kalorien: 310, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 166",
    zutaten: [
      { menge: 400, einheit: "g", name: "Kelp-Nudeln, abgespült", gruppe: "Basis" },
      { menge: 200, einheit: "g", name: "Edamame, gegart", gruppe: "Protein" },
      { menge: 2, einheit: "Stk.", name: "Karotten, in Julienne", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, in Streifen", gruppe: "Gemüse" },
      { menge: 3, einheit: "EL", name: "Tamari", gruppe: "Sauce" },
      { menge: 2, einheit: "EL", name: "Erdnussmus oder Mandelmus", gruppe: "Sauce" },
      { menge: 1, einheit: "EL", name: "Sesamöl", gruppe: "Sauce" },
      { menge: 1, einheit: "EL", name: "Limettensaft", gruppe: "Sauce" },
      { menge: 1, einheit: "TL", name: "Ahornsirup", gruppe: "Sauce" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Sauce" },
      { menge: 50, einheit: "g", name: "geröstete Erdnüsse, gehackt", gruppe: "Topping" },
      { menge: 2, einheit: "Stk.", name: "Frühlingszwiebeln", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Tamari, Erdnussmus, Sesamöl, Limettensaft, Ahornsirup, Knoblauch: 20 Sek. / Stufe 4 zu Sauce mixen.",
      "Karotten und Paprika: 5 Min. / Varoma / Sanftrühren anbraten.",
      "Kelp-Nudeln (vorher 10 Min. eingeweicht) und Edamame zugeben: 3 Min. / 80°C / Sanftrühren.",
      "Mit Sauce mischen. Mit Erdnüssen und Frühlingszwiebeln servieren.",
    ],
    schritte: [
      "Kelp-Nudeln 10 Min. in warmem Wasser einweichen.",
      "Sauce aus Tamari, Erdnussmus, Sesamöl, Limettensaft, Ahornsirup, Knoblauch verrühren.",
      "Karotten und Paprika in Pfanne 3–4 Min. anbraten.",
      "Nudeln, Edamame und Sauce zugeben, gut mischen.",
      "Mit Erdnüssen und Frühlingszwiebeln servieren.",
    ],
    hinweis: "💡 Kelp-Nudeln = kalorienfrei + reichhaltig an Iod für die Schilddrüse.",
  },

  socca_pizza: {
    id: "socca_pizza", name: "Socca-Pizza (Kichererbsen-Teig)",
    kategorie: "ketobiotic", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 35, kalorien: 350, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 206",
    zutaten: [
      { menge: 200, einheit: "g", name: "Kichererbsenmehl", gruppe: "Teig" },
      { menge: 300, einheit: "ml", name: "Wasser", gruppe: "Teig" },
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Teig" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Teig" },
      { menge: 200, einheit: "ml", name: "Tomatensoße", gruppe: "Belag" },
      { menge: 1, einheit: "Stk.", name: "Zucchini, in Scheiben", gruppe: "Belag" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, geröstet, in Streifen", gruppe: "Belag" },
      { menge: 50, einheit: "g", name: "schwarze Oliven", gruppe: "Belag" },
      { menge: 2, einheit: "EL", name: "frisches Basilikum", gruppe: "Garnitur" },
      { menge: 1, einheit: "TL", name: "getrockneter Oregano", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kichererbsenmehl, Wasser, Olivenöl, Salz in Mixtopf: 30 Sek. / Stufe 4 zu Teig mixen.",
      "30 Min. ruhen lassen.",
      "Teig auf geöltem heißem Blech (230°C) verteilen: 12 Min. backen.",
      "Tomatensoße, Gemüse und Oliven drauf: weitere 10 Min. im Ofen.",
      "Mit Basilikum und Oregano servieren.",
    ],
    schritte: [
      "Kichererbsenmehl, Wasser, Olivenöl, Salz zu Teig verrühren. 30 Min. ruhen lassen.",
      "Ofen auf 230°C. Teig auf geöltes Blech gießen, 12 Min. backen.",
      "Belegen und weitere 10 Min. backen.",
    ],
    hinweis: "💡 Kichererbsenmehl: glutenfrei, reich an Proteinen und Magnesium.",
  },

  walnut_pate: {
    id: "walnut_pate", name: "Walnuss-Pastete mit Kräutern",
    kategorie: "ketobiotic", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 200, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 170",
    zutaten: [
      { menge: 200, einheit: "g", name: "Walnüsse, roh", gruppe: "Basis" },
      { menge: 100, einheit: "g", name: "sonnengetrocknete Tomaten (in Öl), abgetropft", gruppe: "Umami" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "frische Petersilie", gruppe: "Kräuter" },
      { menge: 1, einheit: "EL", name: "frischer Rosmarin", gruppe: "Kräuter" },
      { menge: 2, einheit: "EL", name: "Tamari", gruppe: "Umami" },
      { menge: 1, einheit: "EL", name: "Olivenöl", gruppe: "Fett" },
      { menge: 1, einheit: "TL", name: "geräuchertes Paprikapulver", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in den Mixtopf geben.",
      "10 Sek. / Stufe 6 – grobe Textur bewahren, nicht zu fein mixen!",
      "In Glas füllen. Hält im Kühlschrank 5 Tage.",
    ],
    schritte: [
      "Alle Zutaten in Foodprocessor geben.",
      "Pulsieren bis grobe, formbare Masse entsteht (nicht zu glatt!).",
      "In Glas füllen.",
    ],
    hinweis: "💡 Walnüsse: die einzige Nuss mit signifikanten ALA-Omega-3-Fettsäuren.",
  },

  pomegranate_asparagus: {
    id: "pomegranate_asparagus", name: "Gegrillter Spargel mit Cashew-Ricotta & Granatapfel",
    kategorie: "ketobiotic", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 25, kalorien: 310, schwierigkeit: "Mittel", portionenBasis: 4,
    buchSeite: "S. 174",
    zutaten: [
      { menge: 150, einheit: "g", name: "Cashews, 4h eingeweicht", gruppe: "Cashew-Ricotta" },
      { menge: 2, einheit: "EL", name: "Zitronensaft", gruppe: "Cashew-Ricotta" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe", gruppe: "Cashew-Ricotta" },
      { menge: 3, einheit: "EL", name: "Wasser", gruppe: "Cashew-Ricotta" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Cashew-Ricotta" },
      { menge: 500, einheit: "g", name: "grüner Spargel, Enden abgebrochen", gruppe: "Spargel" },
      { menge: 3, einheit: "EL", name: "Olivenöl", gruppe: "Spargel" },
      { menge: 80, einheit: "g", name: "Granatapfelkerne", gruppe: "Topping" },
      { menge: 2, einheit: "EL", name: "frische Minze", gruppe: "Garnitur" },
      { menge: 1, einheit: "EL", name: "Balsamico-Creme", gruppe: "Finish" },
    ],
    thermomix: true,
    schritte_tm: [
      "Eingeweichte Cashews, Zitronensaft, Knoblauch, Wasser, Salz in Mixtopf: 1 Min. / Stufe 9 cremig pürieren.",
      "Spargel mit Olivenöl und Salz im Varoma: 10 Min. / Varoma / Stufe 2 dämpfen (oder Grillpfanne).",
      "Cashew-Ricotta auf Platte verteilen, Spargel darauf anrichten.",
      "Mit Granatapfelkernen, Minze und Balsamico garnieren.",
    ],
    schritte: [
      "Cashews (nach Einweichen) mit Zitronensaft, Knoblauch, Wasser und Salz cremig mixen.",
      "Spargel mit Öl in Grillpfanne 3–4 Min. pro Seite grillen.",
      "Cashew-Ricotta auf Platte, Spargel darauf.",
      "Mit Granatapfelkernen, Minze und Balsamico garnieren.",
    ],
    hinweis: "💡 Granatapfelkerne: reich an Punicalagin – unterstützt Östrogen-Balance.",
  },

  guacamole_chips: {
    id: "guacamole_chips", name: "Guacamole mit bunten Gemüsechips",
    kategorie: "fasted_snack", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 260, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 96",
    zutaten: [
      { menge: 3, einheit: "Stk.", name: "reife Avocados", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Limette, Saft", gruppe: "Säure" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Aromaten" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 0.5, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
      { menge: 1, einheit: "EL", name: "frischer Koriander, gehackt", gruppe: "Kräuter" },
      { menge: 2, einheit: "Stk.", name: "Karotten, in Stifte", gruppe: "Chips" },
      { menge: 1, einheit: "Stk.", name: "rote Paprika, in Streifen", gruppe: "Chips" },
      { menge: 1, einheit: "Stk.", name: "Salatgurke, in Scheiben", gruppe: "Chips" },
    ],
    thermomix: true,
    schritte_tm: [
      "Avocado, Limettensaft, Knoblauch, Salz, Kreuzkümmel in Mixtopf: 5 Sek. / Stufe 4 mixen (grob lassen!).",
      "Koriander unterrühren.",
      "Mit Gemüsestiften servieren.",
    ],
    schritte: [
      "Avocados zerdrücken (grob – Stücke sind gut!).",
      "Limettensaft sofort einrühren.",
      "Salz, Knoblauch, Kreuzkümmel und Koriander unterrühren.",
      "Mit Gemüsestiften servieren.",
    ],
    hinweis: "💡 Avocado enthält gesunde Fette die Hormone und Zellmembranen aufbauen.",
  },

  tahini_dressing: {
    id: "tahini_dressing", name: "Tahini-Dressing",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 110, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 222",
    zutaten: [
      { menge: 60, einheit: "g", name: "Tahini", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Zitronensaft", gruppe: "Säure" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Aromaten" },
      { menge: 3, einheit: "EL", name: "Wasser (zum Verdünnen)", gruppe: "Konsistenz" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 0.5, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 20 Sek. / Stufe 4. Mit Wasser auf Konsistenz verdünnen."],
    schritte: ["Alle Zutaten verrühren. Mit Wasser auf gewünschte Konsistenz verdünnen.", "Im Kühlschrank bis zu 1 Woche haltbar."],
    hinweis: "💡 Sesam enthält Lignane die helfen, überschüssiges Östrogen zu binden.",
  },

  miso_ginger_dressing: {
    id: "miso_ginger_dressing", name: "Miso-Ingwer-Dressing",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 80, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 224",
    zutaten: [
      { menge: 2, einheit: "EL", name: "weißes Miso", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "frischer Ingwer, gerieben", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Reisessig", gruppe: "Säure" },
      { menge: 1, einheit: "EL", name: "Tamari", gruppe: "Umami" },
      { menge: 1, einheit: "TL", name: "Sesamöl", gruppe: "Aroma" },
      { menge: 1, einheit: "TL", name: "Ahornsirup", gruppe: "Balance" },
      { menge: 2, einheit: "EL", name: "Wasser", gruppe: "Konsistenz" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 20 Sek. / Stufe 4."],
    schritte: ["Alle Zutaten in ein Glas geben und gut schütteln."],
    hinweis: "💡 Miso ist lebendige Fermentation – unterstützt das Darmmikrobiom.",
  },

  lemon_dressing: {
    id: "lemon_dressing", name: "Zitronen-Dressing",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 90, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 226",
    zutaten: [
      { menge: 4, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "frischer Zitronensaft", gruppe: "Säure" },
      { menge: 1, einheit: "TL", name: "Zitronenabrieb", gruppe: "Aroma" },
      { menge: 1, einheit: "TL", name: "Dijon-Senf", gruppe: "Emulgator" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 0.5, einheit: "TL", name: "schwarzer Pfeffer", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 10 Sek. / Stufe 4 emulgieren."],
    schritte: ["Alle Zutaten in Glas geben, verschließen und kräftig schütteln."],
    hinweis: "💡 Olivenöl + Zitrone: das mediterrane Duo für Herzgesundheit und Entgiftung.",
  },

  sherry_vinaigrette: {
    id: "sherry_vinaigrette", name: "Spanische Sherry-Vinaigrette",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 95, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 228",
    zutaten: [
      { menge: 4, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Sherryessig", gruppe: "Säure" },
      { menge: 1, einheit: "TL", name: "Dijon-Senf", gruppe: "Emulgator" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Aromaten" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 15 Sek. / Stufe 4 emulgieren."],
    schritte: ["Sherryessig, Senf, Knoblauch, Salz verrühren. Olivenöl einrühren bis emulgiert."],
    hinweis: "💡 Sherryessig hat ein komplexes Aroma und unterstützt die Verdauung.",
  },

  chimichurri: {
    id: "chimichurri", name: "Chimichurri",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 120, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 230",
    zutaten: [
      { menge: 1, einheit: "Bund", name: "frische Petersilie", gruppe: "Kräuter" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "rote Chilischote", gruppe: "Schärfe" },
      { menge: 80, einheit: "ml", name: "Olivenöl extra vergine", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Rotweinessig", gruppe: "Säure" },
      { menge: 1, einheit: "TL", name: "getrockneter Oregano", gruppe: "Kräuter" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Petersilie, Knoblauch, Chili in Mixtopf: 5 Sek. / Stufe 5 hacken.",
      "Öl, Essig, Oregano, Salz zugeben: 10 Sek. / Stufe 3.",
      "Mind. 10 Min. ziehen lassen vor dem Servieren.",
    ],
    schritte: [
      "Petersilie, Knoblauch, Chili fein hacken.",
      "Mit Olivenöl, Essig, Oregano und Salz mischen.",
      "Mind. 10 Min. ziehen lassen.",
    ],
    hinweis: "💡 Frische Petersilie ist reich an Apigenin – unterstützt die Östrogenbalance.",
  },

  catalan_plancha_sauce: {
    id: "catalan_plancha_sauce", name: "Katalanische Plancha-Sauce (Romesco)",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 80, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 232",
    zutaten: [
      { menge: 2, einheit: "Stk.", name: "rote Paprika, geröstet (aus dem Glas)", gruppe: "Basis" },
      { menge: 50, einheit: "g", name: "Mandeln, geröstet", gruppe: "Basis" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Tomatenmark", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Sherry-Essig", gruppe: "Säure" },
      { menge: 4, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Fett" },
      { menge: 1, einheit: "TL", name: "geräuchertes Paprikapulver", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 1 Min. / Stufe 8 zu glatter Sauce mixen."],
    schritte: ["Alle Zutaten in Mixer geben und zu glatter Sauce mixen."],
    hinweis: "💡 Mandeln + Paprika = Vitamin E + C – schützt Hormon-produzierende Drüsen.",
  },

  keto_ketchup: {
    id: "keto_ketchup", name: "Keto-Ketchup",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 20, schwierigkeit: "Leicht", portionenBasis: 12,
    buchSeite: "S. 234",
    zutaten: [
      { menge: 400, einheit: "g", name: "Tomaten (Dose, gehackt)", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Apfelessig", gruppe: "Säure" },
      { menge: 1, einheit: "EL", name: "Tamari", gruppe: "Umami" },
      { menge: 1, einheit: "TL", name: "Zwiebelpulver", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Knoblauchpulver", gruppe: "Gewürze" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 1, einheit: "Prise", name: "Zimt", gruppe: "Gewürze" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in Mixtopf: 15 Min. / 100°C / Stufe 1 einkochen.",
      "1 Min. / Stufe 9 fein mixen. In sterilisiertes Glas abfüllen.",
    ],
    schritte: ["Alle Zutaten aufkochen, 15 Min. einkochen lassen. Fein mixen. Hält 2 Wochen im Kühlschrank."],
    hinweis: "💡 Zuckerfrei und ohne Zusatzstoffe – ideal für Ketobiotic-Phasen.",
  },

  calabrian_chili_dressing: {
    id: "calabrian_chili_dressing", name: "Italienisches Calabrian-Chili-Dressing",
    kategorie: "sauce", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 95, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 236",
    zutaten: [
      { menge: 4, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "Calabrian-Chili-Paste oder Harissa", gruppe: "Schärfe" },
      { menge: 1, einheit: "EL", name: "Rotweinessig", gruppe: "Säure" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Aromaten" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
      { menge: 1, einheit: "TL", name: "frisches Basilikum, gehackt", gruppe: "Kräuter" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 10 Sek. / Stufe 4 mixen."],
    schritte: ["Alle Zutaten in Glas geben und gut schütteln."],
    hinweis: "💡 Capsaicin regt den Stoffwechsel an und wirkt entzündungshemmend.",
  },

  salted_caramel_sauce: {
    id: "salted_caramel_sauce", name: "Gesalzene Karamell-Sauce (Keto)",
    kategorie: "sauce", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegetarisch","gf"],
    zeit: 15, kalorien: 85, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 257",
    zutaten: [
      { menge: 200, einheit: "ml", name: "Kokosmilch, vollfett", gruppe: "Basis" },
      { menge: 4, einheit: "EL", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 2, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 0.5, einheit: "TL", name: "Meersalzflocken", gruppe: "Finish" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kokosmilch, Ahornsirup: 10 Min. / Varoma / Stufe 2 einkochen.",
      "Kokosöl, Vanille, Salz zugeben: 20 Sek. / Stufe 4 einrühren. Abkühlen lassen.",
    ],
    schritte: ["Kokosmilch und Ahornsirup aufkochen, 8–10 Min. unter Rühren einkochen.", "Kokosöl, Vanille und Salz einrühren. Abkühlen lassen (dickt beim Abkühlen weiter ein)."],
    hinweis: "💡 Zu Datteln-Bark, Keto-Käsekuchen oder als Dip für Äpfel.",
  },

  chicken_bone_broth: {
    id: "chicken_bone_broth", name: "Hühner-Knochenbrühe",
    kategorie: "broth", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 480, kalorien: 35, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 244",
    zutaten: [
      { menge: 1, einheit: "Stk.", name: "Hühnerkarkasse oder 1 kg Hühnerknochen", gruppe: "Basis" },
      { menge: 2, einheit: "Stk.", name: "Karotten, grob gehackt", gruppe: "Gemüse" },
      { menge: 2, einheit: "Stk.", name: "Selleriestauden, grob gehackt", gruppe: "Gemüse" },
      { menge: 1, einheit: "Stk.", name: "Zwiebel, halbiert", gruppe: "Aromaten" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Apfelessig (zieht Mineralien aus Knochen!)", gruppe: "Schlüssel" },
      { menge: 2, einheit: "l", name: "Wasser", gruppe: "Flüssigkeit" },
      { menge: 2, einheit: "Stk.", name: "Lorbeerblätter", gruppe: "Kräuter" },
      { menge: 1, einheit: "TL", name: "schwarze Pfefferkörner", gruppe: "Gewürze" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in Mixtopf: 4 Stunden / 95°C / Stufe 1 (oder Kochprogramm Brühe).",
      "Durch feines Sieb abseihen. Abkühlen lassen, Fett entfernen.",
    ],
    schritte: [
      "Alle Zutaten in großen Topf, aufkochen, Schaum abschöpfen.",
      "Bei kleinster Flamme mind. 4 Stunden (besser 8–12h) köcheln.",
      "Abseihen, abkühlen, Fett entfernen.",
    ],
    hinweis: "💡 Hühnerkollagen liefert Glycin und Glutamin – nährt die Darmschleimhaut.",
  },

  vegetable_broth: {
    id: "vegetable_broth", name: "Gemüsebrühe",
    kategorie: "broth", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 90, kalorien: 20, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 248",
    zutaten: [
      { menge: 3, einheit: "Stk.", name: "Karotten, grob gehackt", gruppe: "Gemüse" },
      { menge: 3, einheit: "Stk.", name: "Selleriestauden, grob gehackt", gruppe: "Gemüse" },
      { menge: 2, einheit: "Stk.", name: "Zwiebeln, halbiert", gruppe: "Aromaten" },
      { menge: 1, einheit: "Stk.", name: "Lauchstange, grob geschnitten", gruppe: "Gemüse" },
      { menge: 4, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 2, einheit: "Stk.", name: "Lorbeerblätter", gruppe: "Kräuter" },
      { menge: 1, einheit: "Bund", name: "frische Petersilie", gruppe: "Kräuter" },
      { menge: 1, einheit: "TL", name: "schwarze Pfefferkörner", gruppe: "Gewürze" },
      { menge: 2, einheit: "l", name: "Wasser", gruppe: "Flüssigkeit" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 60 Min. / 95°C / Stufe 1 köcheln. Abseihen."],
    schritte: ["Alle Zutaten in großen Topf, aufkochen, 60–90 Min. köcheln. Abseihen.", "Hält 5 Tage im Kühlschrank, 3 Monate eingefroren."],
    hinweis: "💡 Selbstgemachte Gemüsebrühe ohne Glutamat – ideal als tägliche Basis.",
  },

  dashi_broth: {
    id: "dashi_broth", name: "Dashi (japanische Umami-Brühe)",
    kategorie: "broth", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["omnivor","gf"],
    zeit: 30, kalorien: 15, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 250",
    zutaten: [
      { menge: 1, einheit: "l", name: "Wasser, kalt", gruppe: "Basis" },
      { menge: 15, einheit: "g", name: "Kombu (getrocknete Meeresalge, ca. 10×10 cm)", gruppe: "Umami" },
      { menge: 20, einheit: "g", name: "Bonitoflocken (Katsuobushi)", gruppe: "Umami" },
    ],
    thermomix: true,
    schritte_tm: [
      "Wasser mit Kombu in Mixtopf: 20 Min. / 80°C / Stufe 1 ziehen lassen (NICHT kochen!).",
      "Kombu entnehmen. Bonitoflocken zugeben: 5 Min. / 80°C / Stufe 1.",
      "Durch feines Tuch abseihen (nicht ausdrücken).",
    ],
    schritte: [
      "Kombu in kaltes Wasser geben, 30 Min. einweichen.",
      "Langsam auf 60°C erhitzen (nicht kochen!), Kombu entnehmen.",
      "Bonitoflocken einstreuen, 3 Min. bei 80°C ziehen lassen.",
      "Durch feines Tuch abseihen.",
    ],
    hinweis: "💡 Kombu ist reich an Iod – natürliche Schilddrüsenunterstützung.",
  },

  fat_bomb_smoothie: {
    id: "fat_bomb_smoothie", name: "Fat-Bomb-Smoothie",
    kategorie: "smoothie", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 380, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 144",
    zutaten: [
      { menge: 250, einheit: "ml", name: "Kokosmilch, vollfett", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "Kokosöl", gruppe: "Fett" },
      { menge: 1, einheit: "EL", name: "Mandelmus", gruppe: "Fett" },
      { menge: 1, einheit: "EL", name: "Kakaopulver, roh", gruppe: "Schokolade" },
      { menge: 0.5, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Finish" },
      { menge: 3, einheit: "Stk.", name: "Eiswürfel", gruppe: "Konsistenz" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 1 Min. / Stufe 9 cremig mixen. Sofort trinken."],
    schritte: ["Alle Zutaten in Mixer, 60 Sek. auf höchster Stufe. Sofort trinken."],
    hinweis: "💡 MCT-Fette aus Kokos liefern sofortige Energie ohne Blutzuckerspike.",
  },

  cherry_mint_mocktail: {
    id: "cherry_mint_mocktail", name: "Kirsch-Minz-Mocktail",
    kategorie: "smoothie", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 60, schwierigkeit: "Leicht", portionenBasis: 2,
    buchSeite: "S. 148",
    zutaten: [
      { menge: 200, einheit: "g", name: "Kirschen, frisch oder gefroren, entsteint", gruppe: "Frucht" },
      { menge: 250, einheit: "ml", name: "Kokoswasser", gruppe: "Basis" },
      { menge: 10, einheit: "Blätter", name: "frische Minze", gruppe: "Aroma" },
      { menge: 1, einheit: "EL", name: "Limettensaft", gruppe: "Säure" },
      { menge: 200, einheit: "ml", name: "Mineralwasser mit Kohlensäure", gruppe: "Finish" },
      { menge: 3, einheit: "Stk.", name: "Eiswürfel", gruppe: "Konsistenz" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kirschen, Kokoswasser, Minze, Limettensaft: 30 Sek. / Stufe 8 mixen.",
      "Durch Sieb in Glas passieren.",
      "Mit Mineralwasser auffüllen und sofort servieren.",
    ],
    schritte: ["Kirschen, Kokoswasser, Minze, Limettensaft mixen.", "Durch Sieb passieren, mit Mineralwasser auffüllen."],
    hinweis: "💡 Kirschen enthalten Melatonin-Vorstufen – ideal für die Nurture-Phase.",
  },

  best_workout_smoothie: {
    id: "best_workout_smoothie", name: "Best Workout Smoothie",
    kategorie: "smoothie", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 5, kalorien: 350, schwierigkeit: "Leicht", portionenBasis: 1,
    buchSeite: "S. 150",
    zutaten: [
      { menge: 250, einheit: "ml", name: "Mandelmilch, ungesüßt", gruppe: "Basis" },
      { menge: 1, einheit: "Stk.", name: "Banane, gefroren", gruppe: "Kohlenhydrate" },
      { menge: 30, einheit: "g", name: "veganes Proteinpulver, Vanille", gruppe: "Protein" },
      { menge: 1, einheit: "EL", name: "Maca-Pulver", gruppe: "Adaptogen" },
      { menge: 1, einheit: "EL", name: "Erdnussmus", gruppe: "Fett" },
      { menge: 1, einheit: "TL", name: "Zimt", gruppe: "Blutzucker" },
      { menge: 3, einheit: "Stk.", name: "Eiswürfel", gruppe: "Konsistenz" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten in Mixtopf: 1 Min. / Stufe 9 cremig mixen."],
    schritte: ["Alle Zutaten 60 Sekunden cremig mixen. 30–60 Min. vor/nach Training trinken."],
    hinweis: "💡 Maca unterstützt die Nebennieren und hilft Stresshormone auszubalancieren.",
  },

  korean_pickled_cucumbers: {
    id: "korean_pickled_cucumbers", name: "Koreanisch eingelegte Gurken",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 20, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 264",
    zutaten: [
      { menge: 2, einheit: "Stk.", name: "Salatgurken, in dünnen Scheiben", gruppe: "Basis" },
      { menge: 1, einheit: "TL", name: "Meersalz (nicht jodiert)", gruppe: "Salzen" },
      { menge: 2, einheit: "EL", name: "Reisessig", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "Sesamöl", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "Gochugaru (koreanische Chiliflocken)", gruppe: "Dressing" },
      { menge: 1, einheit: "Stk.", name: "Knoblauchzehe, gepresst", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "Sesamsamen, geröstet", gruppe: "Garnitur" },
      { menge: 2, einheit: "Stk.", name: "Frühlingszwiebeln, in Ringe", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Gurkenscheiben mit Salz mischen, 10 Min. stehen lassen, Wasser ausdrücken.",
      "Dressing-Zutaten in Mixtopf: 10 Sek. / Stufe 3 mixen.",
      "Über Gurken geben, mit Sesam und Frühlingszwiebeln mischen. Sofort servieren.",
    ],
    schritte: [
      "Gurken salzen, 10 Min. ziehen, ausdrücken.",
      "Dressing verrühren, über Gurken geben.",
      "Mit Sesam und Frühlingszwiebeln garnieren.",
    ],
    hinweis: "💡 Für probiotische Version 24h bei Raumtemperatur stehen lassen.",
  },

  korean_pickled_radishes: {
    id: "korean_pickled_radishes", name: "Koreanisch eingelegte Radieschen",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 20, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 266",
    zutaten: [
      { menge: 400, einheit: "g", name: "Daikon oder Radieschen, in dünnen Scheiben", gruppe: "Basis" },
      { menge: 1, einheit: "EL", name: "Meersalz (nicht jodiert)", gruppe: "Salzen" },
      { menge: 3, einheit: "EL", name: "Reisessig", gruppe: "Marinade" },
      { menge: 1, einheit: "EL", name: "Ahornsirup", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "Gochugaru oder Chiliflocken", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "Sesamöl", gruppe: "Marinade" },
    ],
    thermomix: true,
    schritte_tm: [
      "Radieschen mit Salz mischen, 15 Min. ziehen, abgießen.",
      "Marinade-Zutaten in Mixtopf: 10 Sek. / Stufe 3 mixen.",
      "Über Radieschen geben, 1h kühlstellen.",
    ],
    schritte: ["Radieschen salzen, 15 Min. ziehen, abgießen.", "Marinade verrühren, über Radieschen geben. 1h kühlstellen."],
    hinweis: "💡 Rettich enthält Enzyme die Leberfunktion und Entgiftung unterstützen.",
  },

  pickled_red_onions: {
    id: "pickled_red_onions", name: "Eingelegte Rote Zwiebeln",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 15, schwierigkeit: "Leicht", portionenBasis: 10,
    buchSeite: "S. 268",
    zutaten: [
      { menge: 2, einheit: "Stk.", name: "rote Zwiebeln, in dünne Ringe", gruppe: "Basis" },
      { menge: 150, einheit: "ml", name: "Apfelessig", gruppe: "Sud" },
      { menge: 150, einheit: "ml", name: "Wasser", gruppe: "Sud" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Sud" },
      { menge: 1, einheit: "TL", name: "Ahornsirup (optional)", gruppe: "Sud" },
      { menge: 5, einheit: "Stk.", name: "schwarze Pfefferkörner", gruppe: "Gewürze" },
    ],
    thermomix: true,
    schritte_tm: [
      "Essig, Wasser, Salz, Ahornsirup, Pfeffer: 5 Min. / 100°C / Stufe 1 aufkochen.",
      "Zwiebelringe in sauberes Glas geben, heißen Sud darüber gießen.",
      "Abkühlen lassen. Nach 1h verwendbar, nach 24h perfekt.",
    ],
    schritte: ["Zwiebelringe in Glas geben.", "Sud aufkochen, darüber gießen, abkühlen lassen."],
    hinweis: "💡 Hält 2 Wochen im Kühlschrank – immer vorrätig haben!",
  },

  daikon_carrot_slaw: {
    id: "daikon_carrot_slaw", name: "Daikon-Karotten-Slaw",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 20, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 270",
    zutaten: [
      { menge: 300, einheit: "g", name: "Daikon-Rettich, in Julienne-Streifen", gruppe: "Basis" },
      { menge: 200, einheit: "g", name: "Karotten, in Julienne-Streifen", gruppe: "Basis" },
      { menge: 2, einheit: "EL", name: "Reisessig", gruppe: "Dressing" },
      { menge: 1, einheit: "EL", name: "Sesamöl", gruppe: "Dressing" },
      { menge: 1, einheit: "TL", name: "Ahornsirup", gruppe: "Dressing" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Dressing" },
      { menge: 1, einheit: "EL", name: "Sesamsamen, geröstet", gruppe: "Garnitur" },
    ],
    thermomix: true,
    schritte_tm: [
      "Daikon und Karotten grob einschneiden: 5 Sek. / Stufe 5 raspeln.",
      "Dressing-Zutaten zugeben: 10 Sek. / Stufe 3 mischen.",
      "30 Min. ziehen lassen, mit Sesam bestreut servieren.",
    ],
    schritte: ["Daikon und Karotten raspeln.", "Dressing verrühren, drüber geben. 30 Min. ziehen lassen."],
    hinweis: "💡 Daikon unterstützt Verdauungsenzyme und hilft beim Fettabbau.",
  },

  mexican_pickled_jalapenos: {
    id: "mexican_pickled_jalapenos", name: "Mexikanisch eingelegte Jalapeños",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 10, schwierigkeit: "Leicht", portionenBasis: 10,
    buchSeite: "S. 272",
    zutaten: [
      { menge: 300, einheit: "g", name: "Jalapeños, in Ringe", gruppe: "Basis" },
      { menge: 2, einheit: "Stk.", name: "Karotten, in Scheiben", gruppe: "Basis" },
      { menge: 200, einheit: "ml", name: "Weißweinessig", gruppe: "Sud" },
      { menge: 200, einheit: "ml", name: "Wasser", gruppe: "Sud" },
      { menge: 1, einheit: "TL", name: "Meersalz", gruppe: "Sud" },
      { menge: 1, einheit: "TL", name: "Ahornsirup", gruppe: "Sud" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen", gruppe: "Aromaten" },
      { menge: 1, einheit: "TL", name: "Kreuzkümmel", gruppe: "Gewürze" },
      { menge: 1, einheit: "TL", name: "getrockneter Oregano", gruppe: "Kräuter" },
    ],
    thermomix: true,
    schritte_tm: [
      "Essig, Wasser, Salz, Ahornsirup, Kreuzkümmel, Oregano: 5 Min. / 100°C / Stufe 1 aufkochen.",
      "Jalapeños, Karotten, Knoblauch in sauberes Glas geben, heißen Sud darüber gießen.",
      "Abkühlen, verschließen. Mind. 24h ziehen lassen.",
    ],
    schritte: ["Jalapeños und Karotten in Glas geben.", "Lake aufkochen, darüber gießen. Abkühlen, mind. 24h ziehen lassen."],
    hinweis: "💡 Capsaicin steigert den Stoffwechsel und wirkt entzündungshemmend.",
  },

  keto_pickled_ginger: {
    id: "keto_pickled_ginger", name: "Keto-Ingwer-Pickles",
    kategorie: "fermented", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 10, schwierigkeit: "Leicht", portionenBasis: 10,
    buchSeite: "S. 274",
    zutaten: [
      { menge: 200, einheit: "g", name: "frischer Ingwer, hauchdünn geschält und gehobelt", gruppe: "Basis" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Salzen" },
      { menge: 100, einheit: "ml", name: "Reisessig", gruppe: "Sud" },
      { menge: 50, einheit: "ml", name: "Wasser", gruppe: "Sud" },
      { menge: 1, einheit: "Prise", name: "Rote-Bete-Pulver (für rosa Farbe, optional)", gruppe: "Farbe" },
    ],
    thermomix: true,
    schritte_tm: [
      "Ingwer mit Salz mischen, 10 Min. ziehen lassen.",
      "Essig, Wasser: 3 Min. / 100°C / Stufe 1 aufkochen.",
      "Ingwer in Glas geben, heißen Sud darüber gießen.",
      "Abkühlen, 24h kühlstellen vor dem Servieren.",
    ],
    schritte: ["Ingwer hobeln, salzen, 10 Min. ziehen.", "Sud aufkochen, über Ingwer gießen, abkühlen, 24h kühlstellen."],
    hinweis: "💡 Ingwer-Pickles: natürliches Antiemetikum und Verdauungshelfer.",
  },

  basic_brine: {
    id: "basic_brine", name: "Basis-Einlegeflüssigkeit",
    kategorie: "fermented", phasen: ["power1","power2","manifestation","nurture"],
    ernährungsstil: ["ketobiotic","hormone_feasting"], diät: ["vegan","gf"],
    zeit: 10, kalorien: 5, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 276",
    zutaten: [
      { menge: 500, einheit: "ml", name: "Wasser", gruppe: "Basis" },
      { menge: 250, einheit: "ml", name: "Weißweinessig oder Apfelessig", gruppe: "Säure" },
      { menge: 1, einheit: "EL", name: "Meersalz (nicht jodiert!)", gruppe: "Salz" },
      { menge: 1, einheit: "EL", name: "Süßungsmittel (Ahornsirup, Honig oder Erythritol)", gruppe: "Süße" },
    ],
    thermomix: true,
    schritte_tm: ["Alle Zutaten: 5 Min. / 100°C / Stufe 1 bis Salz aufgelöst.", "Über vorbereitetes Gemüse in saubere Gläser gießen."],
    schritte: ["Alle Zutaten erhitzen bis Salz aufgelöst ist. Über Gemüse gießen."],
    hinweis: "💡 Verhältnis 2:1 Wasser zu Essig ist die klassische Basis für alle Pickles.",
  },

  date_bark: {
    id: "date_bark", name: "Datteln-Bark (Schokolade)",
    kategorie: "dessert", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 160, schwierigkeit: "Leicht", portionenBasis: 8,
    buchSeite: "S. 258",
    zutaten: [
      { menge: 200, einheit: "g", name: "dunkle Schokolade (mind. 70%), gehackt", gruppe: "Basis" },
      { menge: 12, einheit: "Stk.", name: "Medjool-Datteln, entsteint und halbiert", gruppe: "Basis" },
      { menge: 50, einheit: "g", name: "Tahini", gruppe: "Schicht" },
      { menge: 50, einheit: "g", name: "Mandeln, grob gehackt", gruppe: "Topping" },
      { menge: 1, einheit: "Prise", name: "Meersalzflocken", gruppe: "Finish" },
    ],
    thermomix: true,
    schritte_tm: [
      "Schokolade in Mixtopf: 5 Min. / 50°C / Stufe 2 schmelzen.",
      "Auf Backpapier (ca. 20×30 cm) dünn ausgießen.",
      "Datteln auf der Schokolade verteilen und leicht andrücken.",
      "Tahini in Fäden darüber träufeln, Mandeln und Meersalz drüberstreuen.",
      "Mind. 30 Min. im Kühlschrank fest werden lassen, dann in Stücke brechen.",
    ],
    schritte: [
      "Schokolade im Wasserbad schmelzen.",
      "Auf Backpapier gießen, mit Datteln, Tahini, Mandeln und Salz belegen.",
      "30 Min. kühlstellen, in Stücke brechen.",
    ],
    hinweis: "💡 Datteln: natürlicher Zucker + Ballaststoffe + Magnesium – ideal in der Nurture-Phase.",
  },

  coconut_oil_fudge: {
    id: "coconut_oil_fudge", name: "Kokosöl-Fudge",
    kategorie: "dessert", phasen: ["power1","power2"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 145, schwierigkeit: "Leicht", portionenBasis: 12,
    buchSeite: "S. 260",
    zutaten: [
      { menge: 200, einheit: "g", name: "Kokosöl, fest", gruppe: "Basis" },
      { menge: 4, einheit: "EL", name: "Kakaopulver, roh", gruppe: "Schokolade" },
      { menge: 3, einheit: "EL", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 0.5, einheit: "TL", name: "Meersalzflocken", gruppe: "Finish" },
      { menge: 50, einheit: "g", name: "Nüsse nach Wahl, grob gehackt", gruppe: "Optional" },
    ],
    thermomix: true,
    schritte_tm: [
      "Kokosöl: 3 Min. / 37°C / Stufe 2 schmelzen.",
      "Kakao, Ahornsirup, Vanille, Salz zugeben: 20 Sek. / Stufe 4 mixen.",
      "Nüsse unterheben. In Silikonform oder Muffinform gießen.",
      "20 Min. im Gefrierfach fest werden lassen.",
    ],
    schritte: [
      "Kokosöl leicht schmelzen (nur flüssig).",
      "Kakao, Ahornsirup, Vanille, Salz einrühren.",
      "Nüsse unterheben, in Form gießen, einfrieren.",
    ],
    hinweis: "💡 MCT-Fette aus Kokosöl: Ketone als sofortige Gehirnenergie.",
  },

  strawberry_cream_popsicles: {
    id: "strawberry_cream_popsicles", name: "Erdbeer-Sahne-Protein-Popsicles",
    kategorie: "dessert", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegan","gf"],
    zeit: 15, kalorien: 120, schwierigkeit: "Leicht", portionenBasis: 6,
    buchSeite: "S. 262",
    zutaten: [
      { menge: 300, einheit: "g", name: "Erdbeeren, frisch oder gefroren", gruppe: "Frucht" },
      { menge: 200, einheit: "ml", name: "Kokosmilch, vollfett", gruppe: "Cremigkeit" },
      { menge: 30, einheit: "g", name: "veganes Proteinpulver, Vanille", gruppe: "Protein" },
      { menge: 2, einheit: "EL", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
    ],
    thermomix: true,
    schritte_tm: [
      "Alle Zutaten in Mixtopf: 1 Min. / Stufe 9 cremig mixen.",
      "In Eis-am-Stiel-Formen gießen, Stiele einsetzen.",
      "Mind. 4 Stunden einfrieren.",
    ],
    schritte: ["Alle Zutaten cremig mixen. In Formen gießen und mind. 4h einfrieren."],
    hinweis: "💡 Erdbeeren: reich an Folsäure und Vitamin C – gut für Progesteron.",
  },

  almond_chocolate_torte: {
    id: "almond_chocolate_torte", name: "Mandelmehl-Schokoladen-Torte (glutenfrei)",
    kategorie: "dessert", phasen: ["manifestation","nurture"],
    ernährungsstil: ["hormone_feasting"], diät: ["vegetarisch","gf"],
    zeit: 50, kalorien: 380, schwierigkeit: "Mittel", portionenBasis: 10,
    buchSeite: "S. 256",
    zutaten: [
      { menge: 200, einheit: "g", name: "Mandelmehl", gruppe: "Mehl" },
      { menge: 100, einheit: "g", name: "dunkle Schokolade (mind. 70%), geschmolzen", gruppe: "Schokolade" },
      { menge: 3, einheit: "Stk.", name: "Eier, Größe L", gruppe: "Bindung" },
      { menge: 80, einheit: "g", name: "Ahornsirup", gruppe: "Süße" },
      { menge: 60, einheit: "g", name: "Kokosöl, geschmolzen", gruppe: "Fett" },
      { menge: 2, einheit: "EL", name: "Kakaopulver, roh", gruppe: "Schokolade" },
      { menge: 1, einheit: "TL", name: "Vanilleextrakt", gruppe: "Aroma" },
      { menge: 0.5, einheit: "TL", name: "Backpulver (glutenfrei)", gruppe: "Triebmittel" },
      { menge: 1, einheit: "Prise", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Backofen auf 175°C vorheizen. Springform (22cm) fetten.",
      "Schokolade, Kokosöl: 5 Min. / 50°C / Stufe 2 schmelzen.",
      "Eier, Ahornsirup, Vanille zugeben: 30 Sek. / Stufe 4.",
      "Mandelmehl, Kakao, Backpulver, Salz unterheben: 20 Sek. / Stufe 3.",
      "In Form gießen. 30–35 Min. backen (Stäbchentest!).",
    ],
    schritte: [
      "Ofen auf 175°C vorheizen.",
      "Schokolade und Kokosöl schmelzen.",
      "Eier, Ahornsirup, Vanille aufschlagen, Schokolade einrühren.",
      "Mandelmehl, Kakao, Backpulver, Salz unterheben.",
      "In gefettete Form, 30–35 Min. backen.",
    ],
    hinweis: "💡 Mandelmehl statt Weizen: mehr Protein, kein Gluten, niedriger glykämischer Index.",
  },

  marinated_mushroom_salad: {
    id: "marinated_mushroom_salad", name: "Marinierter Pilzsalat",
    kategorie: "ketobiotic", phasen: ["power1","power2","manifestation"],
    ernährungsstil: ["ketobiotic"], diät: ["vegan","gf"],
    zeit: 20, kalorien: 180, schwierigkeit: "Leicht", portionenBasis: 4,
    buchSeite: "S. 162",
    zutaten: [
      { menge: 3, einheit: "EL", name: "Olivenöl extra vergine", gruppe: "Fett" },
      { menge: 500, einheit: "g", name: "gemischte Pilze (Champignons, Shiitake, Austernpilze)", gruppe: "Basis" },
      { menge: 2, einheit: "Stk.", name: "Knoblauchzehen, gepresst", gruppe: "Aromaten" },
      { menge: 2, einheit: "EL", name: "Tamari", gruppe: "Marinade" },
      { menge: 2, einheit: "EL", name: "Apfelessig", gruppe: "Marinade" },
      { menge: 1, einheit: "TL", name: "frischer Thymian", gruppe: "Kräuter" },
      { menge: 1, einheit: "EL", name: "frische Petersilie, gehackt", gruppe: "Garnitur" },
      { menge: 0.5, einheit: "TL", name: "Meersalz", gruppe: "Würzen" },
    ],
    thermomix: true,
    schritte_tm: [
      "Olivenöl: 3 Min. / Varoma / Stufe 1 erhitzen.",
      "Pilze zugeben: 8 Min. / Varoma / Sanftrühren braten bis goldbraun.",
      "Tamari, Essig, Knoblauch, Thymian, Salz zugeben: 2 Min. / Varoma / Sanftrühren.",
      "Mit Petersilie servieren.",
    ],
    schritte: [
      "Pilze in Pfanne mit Öl bei hoher Hitze 5–7 Min. goldbraun braten.",
      "Tamari, Essig, Knoblauch zugeben, 2 Min. weiterbraten.",
      "Mit Thymian, Petersilie und Salz abschmecken.",
    ],
    hinweis: "💡 Shiitake-Pilze enthalten Lentinan – stärkt das Immunsystem nachweislich.",
  },

};

// ═══════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════

// Lokaler Datums-Key (YYYY-MM-DD) ohne UTC-Zeitzonenverschiebung
function datumKey(d) {
  const dt = new Date(d);
  const j = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const t = String(dt.getDate()).padStart(2, "0");
  return `${j}-${m}-${t}`;
}

function getPhaseVonTag(tag) {
  if (tag <= 10) return "power1";
  if (tag <= 15) return "manifestation";
  if (tag <= 19) return "power2";
  return "nurture";
}

function getRezepteFuerPhase(phaseId, maxAnzahl = 99) {
  return Object.values(REZEPTE).filter(r => r.phasen.includes(phaseId)).slice(0, maxAnzahl);
}

// Primal Menopausal Diet (Age Like a Girl): high fat, moderate protein, low carb + Knollen.
// Erkennung anhand vorhandener Rezept-Eigenschaften.
function istPrimalGeeignet(r) {
  // Desserts und Saucen sind keine eigenständigen Primal-Gerichte
  if (r.kategorie === "dessert" || r.kategorie === "sauce") return false;
  // Brühen (Kollagen) & Fermentiertes (Mikrobiom/Estrobolom) passen ideal
  if (r.kategorie === "broth" || r.kategorie === "fermented") return true;
  // Fasted Snacks sind kalorienarm/low carb → passen
  if (r.kategorie === "fasted_snack") return true;
  const stil = r.ernährungsstil || [];
  // Ketobiotic = low carb / high fat → Kern der Primal Diet (bei echten Mahlzeiten)
  if (stil.includes("ketobiotic") && (r.kategorie === "break_fast" || r.kategorie === "hormone_feasting" || r.kategorie === "ketobiotic")) return true;
  return false;
}

// Kuratierte Empfehlungen für die Hauptseite: 1 Fasting-Snack + 2 Hauptmahlzeiten
function getHauptseiteEmpfehlungen(phaseId) {
  const alle = Object.values(REZEPTE).filter(r => r.phasen.includes(phaseId));
  
  // Kategorie-Priorität je Phase
  const hauptkategorien = {
    power1:       ["ketobiotic", "break_fast", "smoothie"],
    manifestation:["hormone_feasting", "break_fast", "ketobiotic"],
    power2:       ["ketobiotic", "hormone_feasting", "break_fast"],
    nurture:      ["hormone_feasting", "break_fast", "ketobiotic"],
  };
  
  const prioritaet = hauptkategorien[phaseId] || ["ketobiotic", "hormone_feasting"];
  
  // 1 Fasting-Snack
  const snack = alle.find(r => r.kategorie === "fasted_snack") || null;
  
  // 2 Hauptmahlzeiten (aus den Prioritätskategorien, keine snacks/dressings/fermented)
  const hauptmahlzeitKats = ["ketobiotic", "hormone_feasting", "break_fast"];
  const hauptmahlzeiten = [];
  
  for (const kat of prioritaet) {
    if (!hauptmahlzeitKats.includes(kat)) continue;
    const kandidaten = alle.filter(r =>
      r.kategorie === kat &&
      r.kalorien >= 250 &&  // echte Mahlzeit, kein Snack
      !hauptmahlzeiten.find(h => h.id === r.id)
    );
    if (kandidaten.length > 0) {
      hauptmahlzeiten.push(kandidaten[0]);
    }
    if (hauptmahlzeiten.length >= 2) break;
  }
  
  // Fallback falls nicht genug Hauptmahlzeiten
  if (hauptmahlzeiten.length < 2) {
    const rest = alle.filter(r =>
      hauptmahlzeitKats.includes(r.kategorie) &&
      r.kalorien >= 250 &&
      !hauptmahlzeiten.find(h => h.id === r.id)
    );
    while (hauptmahlzeiten.length < 2 && rest.length > 0) {
      hauptmahlzeiten.push(rest.shift());
    }
  }
  
  return { snack, hauptmahlzeiten };
}

function formatZeit(min) {
  if (min >= 120) return `${Math.floor(min / 60)}h`;
  if (min >= 60) return `${Math.floor(min / 60)}h ${min % 60 > 0 ? min % 60 + "min" : ""}`.trim();
  return `${min} min`;
}

function konsolidierteEinkaufsliste(rezeptIds, portionenMap) {
  const liste = {};
  rezeptIds.forEach(rid => {
    const r = REZEPTE[rid];
    if (!r) return;
    const faktor = (portionenMap[rid] || r.portionenBasis) / r.portionenBasis;
    r.zutaten.forEach(z => {
      const key = z.name.toLowerCase().replace(/[,().]/g, "").trim();
      const menge = z.menge * faktor;
      if (liste[key]) {
        if (liste[key].einheit === z.einheit) {
          liste[key].menge += menge;
        } else {
          liste[key].extraMengen = [...(liste[key].extraMengen || []), { menge, einheit: z.einheit }];
        }
      } else {
        liste[key] = { name: z.name, menge, einheit: z.einheit };
      }
    });
  });
  return Object.values(liste).sort((a, b) => a.name.localeCompare(b.name, "de"));
}

const KATEGORIE_NAMEN = {
  fasted_snack: "🌙 Fasting-Snacks", break_fast: "🌅 Fasten brechen",
  hormone_feasting: "✨ Hormone Feasting", ketobiotic: "🥑 Ketobiotic",
  dessert: "🍫 Desserts", smoothie: "🥤 Smoothies", broth: "🍵 Brühen", fermented: "🫙 Fermentiertes",
};

const KATEGORIE_INFO = {
  fasted_snack: "Diese Snacks haben so wenig Kalorien und Kohlenhydrate, dass sie deinen Fastenzustand kaum unterbrechen. Sie eignen sich, wenn du während eines längeren Fastens etwas Kleines brauchst — ohne die Vorteile des Fastens (Autophagie, Fettverbrennung) ganz zu verlieren.",
  break_fast: "Gerichte, mit denen du dein Fasten sanft brichst. Nach längerem Fasten ist der Körper empfindlich — diese Rezepte sind leicht verdaulich und bauen die Verdauung behutsam wieder auf.",
  hormone_feasting: "Nährstoffreiche Hauptmahlzeiten für die Hormone-Feasting-Phasen (Manifestation & Nurture). Mehr komplexe Kohlenhydrate und Protein, um Östrogen und Progesteron zu unterstützen.",
  ketobiotic: "Kohlenhydratarme, fettreiche Gerichte für die Power-Phasen. Wenig Zucker, viel gesundes Fett und Protein — ideal um Östrogen aufzubauen und in der Fettverbrennung zu bleiben.",
  dessert: "Süßes mit niedrigem Zuckergehalt, das den Blutzucker möglichst wenig belastet. Am besten als Dessert direkt nach einer Mahlzeit genießen (siehe Blutzucker-Hacks).",
  smoothie: "Flüssige Nährstoffbomben — schnell gemacht und gut verdaulich. Je nach Zutaten zum Fastenbrechen oder als Mahlzeitenergänzung.",
  broth: "Knochen- und Gemüsebrühen sind reich an Mineralien und Kollagen. Sie liefern Elektrolyte beim Fasten und unterstützen Darm und Gelenke — oft auch im Fastenzustand erlaubt.",
  fermented: "Fermentierte Lebensmittel wie Sauerkraut oder Kimchi liefern Probiotika für ein gesundes Darmmikrobiom — eine wichtige Basis für die Hormonbalance.",
};

// ═══════════════════════════════════════════════════════════════════
// APP KOMPONENTE
// ═══════════════════════════════════════════════════════════════════


// ═══════════════════════════════════════════════════════════════════
// GLUKOSE-HACKS (basierend auf "Glucose Revolution" - Jessie Inchauspé)
// ═══════════════════════════════════════════════════════════════════

const GLUKOSE_HACKS = [
  {
    nr: 1, icon: "🥗", titel: "Iss in der richtigen Reihenfolge",
    kurz: "Erst Gemüse, dann Protein & Fett, zuletzt Kohlenhydrate & Zucker.",
    detail: "Die Reihenfolge beim Essen verändert die Blutzuckerreaktion enorm. Wenn du zuerst Ballaststoffe (Gemüse) isst, dann Proteine und Fette, und Stärke/Zucker zuletzt, reduzierst du deine Glukosespitze um bis zu 73% und deine Insulinspitze um 48%. Die Ballaststoffe bilden ein Netz im Darm, das die Zuckeraufnahme verlangsamt.",
    beleg: "73% niedrigere Glukosespitze, 48% niedrigere Insulinspitze",
  },
  {
    nr: 2, icon: "🥬", titel: "Beginne mit einer grünen Vorspeise",
    kurz: "Ein kleiner Salat oder gedünstetes Gemüse vor der Hauptmahlzeit.",
    detail: "Eine ballaststoffreiche Vorspeise (z.B. Blattsalat mit Olivenöl-Dressing) legt eine schützende Schicht im Verdauungstrakt an. Die Ballaststoffe verlangsamen die Aufnahme der Kohlenhydrate, die danach kommen. Je mehr Ballaststoffe, desto besser der Effekt.",
    beleg: "Ballaststoffe verlangsamen die Glukoseaufnahme",
  },
  {
    nr: 3, icon: "🔢", titel: "Höre auf, Kalorien zu zählen",
    kurz: "Nicht die Menge zählt, sondern die Qualität & Molekülart.",
    detail: "100 Kalorien Fruktose wirken im Körper völlig anders als 100 Kalorien Glukose oder Fett. Kalorien sind nicht gleich Kalorien — die Art des Moleküls bestimmt, was im Körper passiert. Konzentriere dich auf die Zusammensetzung statt auf Zahlen.",
    beleg: "Die Molekülart bestimmt die Wirkung, nicht die Kalorienzahl",
  },
  {
    nr: 4, icon: "🍳", titel: "Wähle ein herzhaftes Frühstück",
    kurz: "Salzig statt süß — mit Protein, Fett und Ballaststoffen.",
    detail: "Ein süßes Frühstück (Müsli, Saft, Croissant) verursacht morgens auf nüchternen Magen die größte Glukosespitze des Tages — gefolgt von einem Crash und Heißhunger. Ein herzhaftes Frühstück mit Eiern, Avocado oder griechischem Joghurt hält den Blutzucker flach und sättigt länger.",
    beleg: "Süßes Frühstück = größte Glukosespitze + Crash + Heißhunger",
  },
  {
    nr: 5, icon: "🍬", titel: "Zucker ist Zucker — wähle nach Geschmack",
    kurz: "Honig, Kokosblütenzucker & Co. sind nicht 'gesünder'.",
    detail: "Egal ob Honig, Agavendicksaft, brauner Zucker oder Kokosblütenzucker — für deinen Körper ist es alles Glukose und Fruktose. 'Natürliche' Zucker sind nicht besser. Wenn du Zucker isst, dann wähle den, der dir wirklich schmeckt, und genieße ihn bewusst und in Maßen.",
    beleg: "Alle Zuckerarten wirken gleich auf den Blutzucker",
  },
  {
    nr: 6, icon: "🍰", titel: "Iss Süßes als Dessert, nicht als Snack",
    kurz: "Nach der Mahlzeit statt auf leeren Magen zwischendurch.",
    detail: "Süßes auf nüchternen Magen (als Snack zwischendurch) verursacht eine heftige Glukosespitze. Wenn du dasselbe Süße direkt nach einer vollständigen Mahlzeit isst, sind bereits Ballaststoffe, Protein und Fett im Magen, die die Zuckeraufnahme abpuffern. Spare dir Süßes also für direkt nach dem Essen auf.",
    beleg: "Süßes nach der Mahlzeit = abgepufferte Glukoseaufnahme",
  },
  {
    nr: 7, icon: "🍶", titel: "Greife vor dem Essen zum Essig",
    kurz: "1 EL Essig in einem großen Glas Wasser, kurz vor dem Essen.",
    detail: "Ein bis zwei Esslöffel Essig (z.B. Apfelessig) in einem großen Glas Wasser, getrunken kurz vor einer kohlenhydratreichen Mahlzeit, senkt die Glukosespitze deutlich. Essigsäure verlangsamt die Aufspaltung von Stärke in Zucker und verbessert die Aufnahme von Glukose in die Muskeln. Mit Strohhalm trinken schützt die Zähne.",
    beleg: "Essigsäure verlangsamt Stärke-Aufspaltung & senkt Glukosespitze",
  },
  {
    nr: 8, icon: "🚶", titel: "Bewege dich nach dem Essen",
    kurz: "10 Minuten Bewegung innerhalb von 70 Min. nach der Mahlzeit.",
    detail: "Schon 10 Minuten moderate Bewegung nach einer Mahlzeit (Spaziergang, Treppensteigen — oder dein Fitness-Trampolin!) glätten die Glukosespitze deutlich. Deine arbeitenden Muskeln verbrauchen die Glukose direkt, sodass sie gar nicht erst als Spitze im Blut landet. Ideal innerhalb von 70 Minuten nach dem Essen.",
    beleg: "10 Min. Bewegung = arbeitende Muskeln verbrauchen die Glukose direkt",
  },
  {
    nr: 9, icon: "🧀", titel: "Wenn du snackst, dann herzhaft",
    kurz: "Lieber herzhafte Snacks als süße zwischendurch.",
    detail: "Wenn dich zwischen den Mahlzeiten der Hunger packt, wähle etwas Herzhaftes statt Süßes: eine Handvoll Nüsse, ein gekochtes Ei, Gemüsesticks mit Hummus, ein Stück Käse. Herzhafte Snacks halten deinen Blutzucker stabil, während süße Snacks auf leeren Magen eine Spitze auslösen.",
    beleg: "Herzhafte Snacks halten den Blutzucker stabil",
  },
  {
    nr: 10, icon: "👗", titel: "Ziehe deine Kohlenhydrate an",
    kurz: "Kohlenhydrate nie 'nackt' — immer mit Fett, Protein oder Ballaststoffen.",
    detail: "Lass Stärke und Zucker nie allein ('nackt'). Kombiniere sie immer mit Fett, Protein oder Ballaststoffen — das 'kleidet sie an' und verlangsamt die Glukoseaufnahme. Beispiele: Toast mit Avocado statt pur, Reis mit Gemüse und Protein, Obst mit einer Handvoll Nüssen. So bleibt die Glukosereaktion flach.",
    beleg: "Kohlenhydrate + Fett/Protein/Ballaststoffe = flachere Glukosekurve",
  },
];

// ═══════════════════════════════════════════════════════════════════
// TRAINING DATEN (basierend auf ROAR - Stacy Sims & Fast Like a Girl - Mindy Pelz)
// ═══════════════════════════════════════════════════════════════════

const TRAINING_PHASEN = {
  power1: {
    titel: "Power Phase 1 — Dein stärkster Block",
    untertitel: "Tag 1–10 · Niedriger Hormonspiegel",
    farbe: "#7C9E87",
    hellFarbe: "#EBF2ED",
    intensitaet: "Hoch",
    intensitaetSterne: 5,
    wissenschaft: "Pelz & Sims sind sich einig: Tag 1–10 ist deine kraftvollste Trainingsphase. Östrogen und Progesteron sind niedrig → du bist physiologisch am ähnlichsten zu einem Mann (Sims, ROAR) — Kohlenhydrate werden effizienter verarbeitet, Schmerztoleranz ist am höchsten, Regeneration am schnellsten. Pelz nennt es \"Power Phase 1\" und empfiehlt Ketobiotic-Ernährung zur Östrogenproduktion. Sims nennt es \"Low Hormone Phase\" und empfiehlt die intensivsten Trainingseinheiten des Monats hier. ✅ Beide zeigen in dieselbe Richtung: Jetzt ALLES geben.",
    schwerpunkt: ["Krafttraining (schwer)", "HIIT", "Intervalle", "Neue persönliche Bestleistungen"],
    vermeiden: ["Zu viel Erholung einplanen — du brauchst sie kaum", "Unterforderung"],
    ernaehrungTipp: "Ketobiotic-Phase: wenig Kohlenhydrate, viel Protein und gesunde Fette. Vor intensivem Training dennoch leichte Kohlenhydrate erlaubt.",
    uebungen: [
      {
        name: "🏋️ Kraft-Trampolin-HIIT",
        geraet: "Fitness-Trampolin",
        dauer: "25–30 Min.",
        beschreibung: "Aufwärmen 3 Min. leicht springen. Dann: 8x (30 Sek. maximale Intensität Hochspringen / Treppenspringen, 30 Sek. langsam). Cool-down 3 Min. Arme aktiv mitführen für mehr Kalorienverbrauch.",
        warum: "In der niedrigen Hormonphase reagiert der Körper optimal auf HIIT — maximale Fettvebrennung und Kraftzuwachs gleichzeitig.",
        intensitaet: "🔴 Hoch",
      },
      {
        name: "💫 Hula-Hoop Kraft-Intervall",
        geraet: "Fitness-Hula-Hoop",
        dauer: "20–25 Min.",
        beschreibung: "3 Runden à 6 Min.: 2 Min. Hula-Hoop drehen (maximale Geschwindigkeit), 1 Min. Pause. Wechsel der Drehrichtung jede Runde. Kern aktiv halten, leicht in den Knien.",
        warum: "Hula-Hoop trainiert Taille, Hüfte und Core — in Phase 1 kannst du die volle Intensität geben ohne hormonale Erschöpfung.",
        intensitaet: "🔴 Hoch",
      },
      {
        name: "🦵 Kraft + Sprung-Kombination",
        geraet: "Trampolin",
        dauer: "30 Min.",
        beschreibung: "5 Runden: 10 Kniebeugen (am Boden), 20x Sprünge auf Trampolin (Knie hoch ziehen), 10 Ausfallschritte, 20x Jumping Jacks auf Trampolin. 60 Sek. Pause zwischen Runden.",
        warum: "Kombiniert Kraft und Ausdauer — beides optimiert in der Follikelphase. Maximiert die Stärkegewinne laut Sims-Forschung.",
        intensitaet: "🔴 Hoch",
      },
      {
        name: "🏃 Laufen / Walken (schnell)",
        geraet: "Draußen",
        dauer: "30–45 Min.",
        beschreibung: "Tempolauf oder schnelles Nordic Walking. Intervalle möglich: 5 Min. schnell, 2 Min. langsam. Dein Körper ist jetzt am schmerztolerantesten.",
        warum: "Niedrigster Schmerzempfinden-Level im Zyklus — ideal für herausfordernde Ausdauereinheiten.",
        intensitaet: "🟠 Mittel–Hoch",
      },
    ],
    fastenTraining: "Nüchterntraining ist in Phase 1 gut verträglich. Leichte bis moderate Einheiten nüchtern möglich. Für intensive Einheiten: kleiner Snack 30 Min. vorher (z.B. Handvoll Nüsse).",
    erholung: "1–2 Ruhetage pro Woche reichen. Regeneration ist schnell.",
    roarTipp: "'Die Frauen die ihr Krafttraining in die niedrige Hormonphase legten sahen 32% mehr Kraftzuwachs — mehr als doppelt so viel.' — Stacy Sims, ROAR",
    pelzTipp: "'Power Phase 1: Längere Fastenzeiten sind gut verträglich. Ketobiotic-Ernährung unterstützt Östrogenproduktion.' — Dr. Mindy Pelz",
    preWorkout: "30–45 Min. vorher: 150–200 kcal mit 15–20g Protein + Kohlenhydrate. Z.B. griechischer Joghurt mit Beeren, 2 Reiswaffeln mit Mandelbutter, oder Banane + Hanf-Protein. Frauen performen besser im gefütterten Zustand.",
    postWorkout: "⚡ Innerhalb 30 Min.: 25–30g Protein + stärkereiches Gemüse oder Obst. Dein Erholungsfenster ist kürzer als bei Männern — 2,5h später sinkt die Glykogenspeicherrate um 50%. Nicht warten!",
    schlafTipp: "Körpertemperatur niedrig → optimales Einschlafen. 7–8h Schlaf reichen. Kein besonderer Optimierungsbedarf. Tart-Cherry-Saft vor dem Schlafen kann Tiefschlaf verbessern.",
    knochenInfo: "🦴 Trampolin & Sprünge sind aktiv knochenaufbauend — die mechanische Belastung durch Sprünge erhöht die Knochendichte nachweislich (ROAR, Kap. Knochengesundheit). Ideal in dieser Phase!",
  },
  manifestation: {
    titel: "Manifestations-Phase — Ovulations-Power",
    untertitel: "Tag 11–15 · Ovulation & maximale Energie",
    farbe: "#C4845A",
    hellFarbe: "#FAF0E8",
    intensitaet: "Hoch",
    intensitaetSterne: 5,
    wissenschaft: "Tag 11–15 ist dein absoluter Leistungshöhepunkt — die Manifestationsphase rund um den Eisprung. Östrogen erreicht den Peak, Testosteron surgt kurz vor der Ovulation (ca. Tag 14) → maximale Kraft, Koordination und Ausdauer. Pelz: 'Eisprung-Energie nutzen, Hormone Feasting beginnt — mehr Protein und komplexe Kohlenhydrate.' Sims (ROAR): 'Ende der Low Hormone Phase — dein monatlicher PR-Moment für Kraft und Koordination.' ⚠️ Achtung: Gelenke durch Östrogen-Peak etwas lockerer → gut aufwärmen vor Sprüngen. Beide einig: JETZT ist deine stärkste Zeit. ✅",
    schwerpunkt: ["Maximale Leistung", "Persönliche Bestleistungen", "Ausdauer", "Koordination"],
    vermeiden: ["Verletzungsrisiken unterschätzen", "Aufwärmen überspringen"],
    ernaehrungTipp: "Phytoöstrogene (Leinsamen, Edamame) und Kreuzblütler für Östrogen-Detox. Mehr Protein für die Muskeln. Ballaststoffe für die Leber.",
    uebungen: [
      {
        name: "🌟 Trampolin Peak-Performance",
        geraet: "Fitness-Trampolin",
        dauer: "30 Min.",
        beschreibung: "Dein bestes Training des Monats! 5 Min. Aufwärmen. 20 Min. wechselnde Intensitäten: 1 Min. maximale Sprünge, 1 Min. Laufen auf der Stelle, 30 Sek. Knie-Hochziehen, 30 Sek. Erholung. 5 Min. Cool-down.",
        warum: "Östrogen- und Testosteron-Peak: Du bist stärker, koordinierter und erholst dich schneller. Ideal für dein intensivstes Training.",
        intensitaet: "🔴 Maximal",
      },
      {
        name: "💃 Hula-Hoop Ausdauer-Challenge",
        geraet: "Fitness-Hula-Hoop",
        dauer: "25–30 Min.",
        beschreibung: "10 Min. kontinuierliches Hula-Hoop drehen (Ausdauer), dann: 3x abwechselnd 2 Min. mit Arm-Bewegungen, 2 Min. schnelle Rotation. Finish: 5 Min. Dehnen. Höchste Intensität des Monats.",
        warum: "Koordination und Ausdauer sind auf dem Höhepunkt. Nutze die Energie für die längste und intensivste Hula-Hoop-Session des Monats.",
        intensitaet: "🔴 Maximal",
      },
      {
        name: "🧘 Yoga + Mobility (Bonus)",
        geraet: "Yogamatte",
        dauer: "20 Min.",
        beschreibung: "Dynamisches Yoga: Sun Salutations, Krieger-Posen, tiefe Hüftöffner. Wichtig: Aufwärmen wegen lockererer Gelenke. Keine extremen Dehnungen in kaltem Zustand.",
        warum: "Östrogen macht Ligamente lockerer — extra wichtig für Mobilität und Verletzungsprävention. Ideal als Ergänzung zu Kraft- und HIIT-Training.",
        intensitaet: "🟡 Leicht–Mittel",
      },
    ],
    fastenTraining: "Moderate Fastenzeiten (13–15h) passen gut. Für intensive Einheiten ausreichend essen — du brauchst Energie für die Leistungsspitzen.",
    erholung: "Ausreichend schlafen besonders wichtig. 1–2 Ruhetage, aktive Erholung (Spazieren, leichtes Yoga) möglich.",
    roarTipp: "'Kurz vor der Ovulation haben Frauen ihren persönlichen Kraft- und Koordinations-Höhepunkt — nutze dieses Fenster für PRs.' — Stacy Sims, ROAR",
    pelzTipp: "'Power Phase 2: Östrogen entgiften durch Kreuzblütler und Ballaststoffe. Phytoöstrogene jetzt besonders wertvoll.' — Dr. Mindy Pelz",
    preWorkout: "30–45 Min. vorher: Wie Phase 1 — 150–200 kcal, 15–20g Protein. Achtung: Gelenke durch Östrogen-Peak etwas lockerer → ausreichend aufwärmen vor Sprüngen und HIIT!",
    postWorkout: "⚡ Innerhalb 30 Min.: 25–30g Protein (z.B. Whey-Isolat, Erbsenprotein mit mind. 3g Leucin) + Kohlenhydrate. Maximale Muskelanpassung jetzt möglich — nutze das Fenster.",
    schlafTipp: "Östrogen hemmt Melatonin leicht → etwas schwieriger einzuschlafen. Blaulicht-Filter ab 20 Uhr, Raum kühler halten. Tart-Cherry-Saft (120ml) 30 Min. vor Bett hilft.",
    knochenInfo: "🦴 Dein Knochenstoffwechsel ist durch den Östrogen-Peak optimal aktiv. Krafttraining und Sprünge (Trampolin) jetzt besonders effektiv für Knochenaufbau.",
  },
  power2: {
    titel: "Power Phase 2 — Sanfter Übergang",
    untertitel: "Tag 16–19 · Nach dem Eisprung",
    farbe: "#8FAF6E",
    hellFarbe: "#EEF3E8",
    intensitaet: "Mittel–Hoch",
    intensitaetSterne: 4,
    wissenschaft: "Tag 16–19 ist der Übergang nach dem Eisprung — Pelz' kurze zweite Power Phase. Östrogen ist noch erhöht, aber Progesteron beginnt zu steigen. Pelz: 'Kurze Rückkehr zu Ketobiotic, Kreuzblütler für Östrogen-Detox der Leber.' Sims (ROAR): 'Beginn der High Hormone Phase — Progesteron steigt, Erholung dauert langsam länger, Protein-Bedarf +12%.' 📌 Praxis: Noch gut belastbar, aber langsam von maximaler Intensität zurückfahren. Höre auf deinen Körper — an guten Tagen Kraft, an müden Tagen moderat. ✅ Beide empfehlen: mittlere bis hohe Intensität, gut essen, Erholung einplanen.",
    schwerpunkt: ["Ausdauer", "Moderate Kraft", "Muskelerhalt", "Bewusste Intensität"],
    vermeiden: ["Maximale HIIT-Einheiten wenn Energie sinkt", "Kohlenhydratmangel vor Training"],
    ernaehrungTipp: "Hormone Feasting beginnt: mehr komplexe Kohlenhydrate erlaubt. Viel Protein für Muskelreparatur (1,0–1,2g/kg). Bitterpflanzen für Östrogen-Detox.",
    uebungen: [
      {
        name: "🎯 Trampolin Ausdauer-Session",
        geraet: "Fitness-Trampolin",
        dauer: "25–35 Min.",
        beschreibung: "Kontinuierliches Bouncing bei mittlerer Intensität. 5 Min. warm up, 20–25 Min. gleichmäßiges Springen mit moderaten Intensitätswechseln (alle 5 Min. kurz intensiver), 5 Min. cool down. Musik hilft!",
        warum: "Ausdauer ist jetzt stark, HIIT-Recovery ist etwas schwieriger. Mittlere, konstante Intensität für maximale Lymph-Aktivierung und Fettverbrennung.",
        intensitaet: "🟠 Mittel",
      },
      {
        name: "🌀 Hula-Hoop + Kraft-Kombi",
        geraet: "Fitness-Hula-Hoop",
        dauer: "25 Min.",
        beschreibung: "5 Min. Hula-Hoop, 5 Kniebeugen, 5 Min. Hula-Hoop, 10 Ausfallschritte, 5 Min. Hula-Hoop, 10 Liegestütze, 5 Min. Dehnen. Höre auf deinen Körper.",
        warum: "Kombiniert Ausdauer (Hula-Hoop) mit Kraft (Körpergewicht) — gut geeignet wenn Energie variiert.",
        intensitaet: "🟠 Mittel",
      },
      {
        name: "🚶 Spazierengehen / Nordic Walking",
        geraet: "Draußen",
        dauer: "30–60 Min.",
        beschreibung: "Flotter Spaziergang oder Nordic Walking. Natürliches Licht, frische Luft — ideal für Stimmung und Cortisol-Regulierung. Wenn die Energie da ist: schnelleres Tempo einbauen.",
        warum: "Bewegung in der Natur senkt Cortisol und unterstützt Progesteron. Sanft aber effektiv.",
        intensitaet: "🟡 Leicht–Mittel",
      },
    ],
    fastenTraining: "Fastenzeiten auf 13–15h reduzieren. Mehr Kohlenhydrate vor intensiveren Einheiten wichtig — der Körper verarbeitet sie in Lutealphase weniger effizient.",
    erholung: "Mehr Schlaf als in Phase 1 und 2. 2 Ruhetage empfohlen. Aktive Erholung (Yoga, Spazieren) ist ideal.",
    roarTipp: "'In der Lutealphase steigt der Grundumsatz um 100–300 kcal täglich — esse mehr und trainiere smarter, nicht unbedingt härter.' — Stacy Sims, ROAR",
    pelzTipp: "'Manifestationsphase: Maximal Protein für Muskelaufbau, bittere Grüns für Östrogen-Entgiftung der Leber.' — Dr. Mindy Pelz",
    preWorkout: "Vor moderaten Einheiten: 150–200 kcal, mehr Kohlenhydrate als in Phase 1+2 (Körper verarbeitet Kohlenhydrate in Lutealphase weniger effizient → trotzdem wichtig). 1 Scheibe Toast + Erdnussbutter + Banane.",
    postWorkout: "⚡ Innerhalb 30 Min.: 25–30g Protein + kohlenhydratreiches Gemüse. In der Lutealphase steigt der Proteinbedarf um ~12% — Progesteron fördert Muskelabbau. Mehr Protein schützt die Muskeln.",
    schlafTipp: "Progesteron erhöht die Körpertemperatur → schwereres Einschlafen. Raum kühl halten (18°C ideal). Kein Sport 4h vor Bett. Bildschirmzeit reduzieren. 8h+ anstreben.",
    knochenInfo: "🦴 Sanfte bis moderate Bewegung. Kein maximales Sprungtraining. Knochen profitieren weiterhin von regelmäßigem Trampolin-Bouncing auch bei niedrigerer Intensität.",
  },
  nurture: {
    titel: "Nurture-Phase — Sanft & regenerativ",
    untertitel: "Tag 20–28 · Progesteron dominiert",
    farbe: "#9B7BAD",
    hellFarbe: "#F3EEF7",
    intensitaet: "Leicht–Mittel",
    intensitaetSterne: 2,
    wissenschaft: "Pelz & Sims sind sich hier am meisten einig: Tag 20–28 ist Regenerationszeit. Sims (ROAR): 'High Hormone Phase — Progesteron dominiert, Körpertemperatur erhöht (+0,5°C), Erholung dauert länger, HIIT fühlt sich schwerer an, Grundumsatz steigt um 100–300 kcal täglich.' Pelz: 'Nurture-Phase — Progesteron braucht Unterstützung durch Magnesium, Vitamin B6, kurze Fastenzeiten (max. 13h) und Selbstfürsorge.' 📌 Beide sind sich einig: Intensives Training jetzt ist kontraproduktiv — es erhöht Cortisol und kann Progesteron unterdrücken. Sanfte Bewegung, gutes Essen, viel Schlaf. ✅ Nutze diese Zeit zur Vorbereitung auf die nächste Power Phase.",
    schwerpunkt: ["Regeneration", "Sanfte Bewegung", "Yin Yoga", "Spazieren", "Mobilität"],
    vermeiden: ["Intensive HIIT", "Schweres Krafttraining", "Langes Nüchterntraining", "Überanstrengung"],
    ernaehrungTipp: "Hormone Feasting voll aktiv: komplexe Kohlenhydrate, Magnesium (Kürbiskerne, Schokolade), Vitamin B6 (Bananen, Kichererbsen). Blutzucker stabil halten.",
    uebungen: [
      {
        name: "🌸 Sanftes Trampolin-Bouncing",
        geraet: "Fitness-Trampolin",
        dauer: "15–20 Min.",
        beschreibung: "Leichtes, rhythmisches Bouncing ohne hohe Sprünge. Einfach der Schwerkraft nachgeben, Beine leicht beugen. Angenehme Musik. Keine Intervalle — gleichmäßig und entspannend. Ideal morgens.",
        warum: "Sanftes Rebouncing aktiviert das Lymphsystem ohne Cortisol zu erhöhen — perfekt für PMS-Beschwerden und Wassereinlagerungen. Hebt die Stimmung durch Endorphine.",
        intensitaet: "🟢 Sehr leicht",
      },
      {
        name: "💜 Hula-Hoop Entspannung",
        geraet: "Fitness-Hula-Hoop",
        dauer: "10–15 Min.",
        beschreibung: "Gemütliches Hula-Hoop ohne Leistungsdruck. Langsame Rotation, Bauch entspannen, atmen. Wärmt Taille und Hüfte sanft auf. Ideal bei Unterleibsschmerzen als sanfte Massage.",
        warum: "Sanfte Kreisbewegungen können Menstruationsbeschwerden lindern und den Bauch wärmen. Keine Überanstrengung in dieser Phase.",
        intensitaet: "🟢 Sehr leicht",
      },
      {
        name: "🧘 Yin Yoga / Stretching",
        geraet: "Yogamatte",
        dauer: "20–30 Min.",
        beschreibung: "Langsame, gehaltene Posen (je 2–5 Min.): Kindpose, liegender Schmetterling, Beine an die Wand, Savasana. Kein Power-Yoga. Tiefes Atmen. Lasse Spannung los.",
        warum: "Yin Yoga aktiviert das parasympathische Nervensystem — senkt Cortisol, unterstützt Progesteron. Ideal in der PMS-Zeit.",
        intensitaet: "🟢 Sehr leicht",
      },
      {
        name: "🌿 Spazierengehen in der Natur",
        geraet: "Draußen",
        dauer: "20–40 Min.",
        beschreibung: "Entspannter Spaziergang — kein Tempo, kein Ziel. Natur wirkt als natürlicher Stressreduzierer. Wenn Energie da ist: leichtes Nordic Walking. Wichtig: Wärm dich gut an (erhöhte Körpertemperatur).",
        warum: "Bewegung in der Natur senkt Cortisol nachweislich um 20%. Frische Luft + Tageslicht reguliert Melatonin für besseren Schlaf in der PMS-Phase.",
        intensitaet: "🟡 Leicht",
      },
    ],
    fastenTraining: "Fastenzeiten auf 13h begrenzen! Kein intensives Nüchterntraining. Progesteron ist empfindlich gegenüber Fasten-Stress. Gut frühstücken vor dem Sport.",
    erholung: "2–3 Ruhetage pro Woche. Viel Schlaf (8–9h). Wärme (Wärmflasche, Bad) unterstützt Progesteron.",
    roarTipp: "'Frauen die in der Luteal/PMS-Phase Erholung einbauten statt durchzupowern, zeigten bessere Langzeit-Anpassungen.' — Stacy Sims, ROAR",
    pelzTipp: "'Nurture-Phase: Kurze Fastenzeiten (13h). Magnesium und Vitamin B6 für Progesteron. Selbstfürsorge ist kein Luxus — sie ist Pflicht.' — Dr. Mindy Pelz",
    preWorkout: "Vor sanften Einheiten: leichter Snack optional. KEIN Nüchterntraining — Progesteron ist stress-sensitiv. Gut frühstücken. Warme Speisen bevorzugen (beruhigt Nervensystem).",
    postWorkout: "Nach sanften Einheiten: normale Mahlzeit reicht. Magnesium-reiche Lebensmittel nach dem Sport besonders wertvoll (Kürbiskerne, dunkle Schokolade, Mandeln). Unterstützt Progesteron und Schlaf.",
    schlafTipp: "Schlaf-Qualität oft reduziert vor der Periode. Tart-Cherry-Saft (120ml) 30 Min. vor Bett. Magnesium-Glycinat am Abend. Wärmflasche auf Bauch/Füße. 8–9h einplanen. Kein Sport 4h vor Bett.",
    knochenInfo: "🦴 Sanftes Rebounding (leichtes Trampolin-Bouncing) aktiviert das Lymphsystem und unterstützt Entgiftung — ohne Cortisol-Stress. Ideal als tägliche 10-Min.-Routine auch in dieser Phase.",
  },
};



// Symptome & Stimmungen fürs Tagebuch
const TAGEBUCH_SYMPTOME = [
  "Krämpfe", "Kopfschmerzen", "Blähungen", "Brustspannen", "Rückenschmerzen",
  "Heißhunger", "Übelkeit", "Akne", "Schlafprobleme", "Müdigkeit",
  "Reizbarkeit", "Ängstlichkeit", "Stimmungstief", "Wassereinlagerung", "Verdauung",
];
const STIMMUNGEN = [
  { wert: "super", icon: "😄", label: "Super" },
  { wert: "gut", icon: "🙂", label: "Gut" },
  { wert: "ok", icon: "😐", label: "Okay" },
  { wert: "schlecht", icon: "😟", label: "Schlecht" },
  { wert: "mies", icon: "😢", label: "Mies" },
];

function MenopauseTab({ phase }) {
  const [offenWissen, setOffenWissen] = useState("gehirn");

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #9B7BAD, #B89BC9)", borderRadius: 16, padding: "18px 18px 16px", marginBottom: 14, color: "#fff" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>🌸 Wechseljahre</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>Dein Begleiter durch die Menopause — nach "Age Like a Girl" von Dr. Mindy Pelz</p>
      </div>

      {/* Einleitung */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          Die Menopause ist kein Verfall, sondern ein kraftvoller Übergang. Dr. Pelz beschreibt sie über die "Grandmother Hypothesis": Die Energie, die früher in die Fortpflanzung floss, steht dir jetzt für ein neues, selbstbestimmtes Lebenskapitel zur Verfügung. Mit der richtigen Ernährung, Bewegung und Selbstfürsorge kannst du in dieser Phase aufblühen.
        </p>
      </div>

      {/* WISSEN */}
      <p style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "#333" }}>📖 Verstehen, was passiert</p>
      {MENOPAUSE_WISSEN.map(w => {
        const offen = offenWissen === w.id;
        return (
          <div key={w.id} style={{ background: "#fff", borderRadius: 14, marginBottom: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
            <button onClick={() => setOffenWissen(offen ? null : w.id)}
              style={{ width: "100%", background: offen ? "#F3EEF7" : "none", border: "none", padding: "13px 15px", cursor: "pointer", textAlign: "left", display: "flex", gap: 11, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{w.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "#222" }}>{w.titel}</span>
              <span style={{ fontSize: 15, color: "#9B7BAD" }}>{offen ? "−" : "+"}</span>
            </button>
            {offen && (
              <div style={{ padding: "0 15px 15px" }}>
                <p style={{ margin: "0 0 10px", fontSize: 12.5, color: "#555", lineHeight: 1.7, whiteSpace: "pre-line" }}>{w.text}</p>
                <div style={{ background: "#F3EEF7", borderRadius: 10, padding: "10px 12px" }}>
                  <p style={{ margin: "0 0 6px", fontSize: 11, fontWeight: 700, color: "#9B7BAD" }}>💡 Das kannst du tun:</p>
                  {w.tipps.map((t, i) => (
                    <div key={i} style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5, paddingLeft: 14, position: "relative", marginBottom: 2 }}>
                      <span style={{ position: "absolute", left: 0, color: "#9B7BAD" }}>•</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Hinweis auf Training-Tab */}
      <div style={{ background: "#F3EEF7", borderRadius: 14, padding: "13px 15px", marginTop: 12, marginBottom: 12, border: "1px solid #E1BEE7" }}>
        <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 700, color: "#9B7BAD" }}>💪 Training "the Menopause Way"</p>
        <p style={{ margin: 0, fontSize: 12, color: "#777", lineHeight: 1.5 }}>Dein 4-Stufen-Trainingsprotokoll für die Menopause findest du jetzt direkt im <strong>Training-Tab</strong> (💪 in der unteren Leiste).</p>
      </div>

      {/* Quelle */}
      <div style={{ background: "#F3F4F6", borderRadius: 10, padding: "11px 13px", marginBottom: 80 }}>
        <p style={{ margin: 0, fontSize: 11, color: "#888", lineHeight: 1.55, fontStyle: "italic" }}>
          Quelle: "Age Like a Girl" von Dr. Mindy Pelz. Diese Inhalte ersetzen keine medizinische Beratung. Bei starken Beschwerden in den Wechseljahren bitte ärztliche Begleitung suchen.
        </p>
      </div>
    </div>
  );
}

function MenopauseTrainingTab({ phase }) {
  const [offenLevel, setOffenLevel] = useState(1);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #9B7BAD, #B89BC9)", borderRadius: 16, padding: "18px 18px 16px", marginBottom: 14, color: "#fff" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>💪 Training "the Menopause Way"</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>Dein 4-Stufen-Protokoll nach "Age Like a Girl" von Dr. Mindy Pelz</p>
      </div>

      {/* Einleitung: 4 Schlüsselbereiche */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#333" }}>Worauf es in der Menopause ankommt</p>
        <p style={{ margin: "0 0 10px", fontSize: 12, color: "#555", lineHeight: 1.65 }}>
          In den Wechseljahren verändert sich dein Körper: Muskeln und Knochen brauchen mehr Schutz, Gelenke mehr Schonung. Statt stundenlangem Ausdauersport (der Cortisol und Verletzungsrisiko erhöht) setzt Pelz auf vier Schlüsselbereiche:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[["💪","Kraft"],["🧘","Flexibilität"],["⚖️","Balance"],["🏃","Ausdauer"]].map(([icon, label]) => (
            <span key={label} style={{ fontSize: 12, background: "#F3EEF7", color: "#9B7BAD", padding: "5px 12px", borderRadius: 20, fontWeight: 600 }}>{icon} {label}</span>
          ))}
        </div>
      </div>

      <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888", lineHeight: 1.5 }}>
        Wechsle frei zwischen den Leveln — höre auf deinen Körper. Eine Woche Level 4, die nächste nur Level 1? Völlig okay.
      </p>

      {/* Level-Auswahl */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {MENOPAUSE_TRAINING.map(lvl => (
          <button key={lvl.level} onClick={() => setOffenLevel(lvl.level)}
            style={{ flex: 1, background: offenLevel === lvl.level ? lvl.farbe : "#f4f4f4", color: offenLevel === lvl.level ? "#fff" : "#666", border: "none", borderRadius: 10, padding: "10px 4px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>
            L{lvl.level}
          </button>
        ))}
      </div>
      {MENOPAUSE_TRAINING.filter(l => l.level === offenLevel).map(lvl => (
        <div key={lvl.level} style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `2px solid ${lvl.farbe}` }}>
          <p style={{ margin: "0 0 2px", fontSize: 16, fontWeight: 800, color: lvl.farbe }}>Level {lvl.level}: {lvl.name}</p>
          <p style={{ margin: "0 0 10px", fontSize: 11, color: "#999", fontWeight: 600 }}>{lvl.stufe}</p>
          <div style={{ background: lvl.farbe + "18", borderRadius: 10, padding: "10px 12px", marginBottom: 12 }}>
            <p style={{ margin: "0 0 4px", fontSize: 12, color: "#555", lineHeight: 1.5 }}><strong>Ziel:</strong> {lvl.ziel}</p>
            <p style={{ margin: 0, fontSize: 11.5, color: "#777", lineHeight: 1.5 }}><strong>Fokus:</strong> {lvl.fokus}</p>
          </div>
          {lvl.plan.map(([tag, uebung], i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < lvl.plan.length - 1 ? "1px solid #f3f3f3" : "none" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: lvl.farbe, background: lvl.farbe + "18", borderRadius: 6, padding: "2px 0", width: 32, textAlign: "center", flexShrink: 0, height: "fit-content" }}>{tag}</span>
              <span style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>{uebung}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Quelle */}
      <div style={{ background: "#F3F4F6", borderRadius: 10, padding: "11px 13px", marginBottom: 80 }}>
        <p style={{ margin: 0, fontSize: 11, color: "#888", lineHeight: 1.55, fontStyle: "italic" }}>
          Quelle: "Age Like a Girl" von Dr. Mindy Pelz. Diese Inhalte ersetzen keine medizinische Beratung. Bei starken Beschwerden in den Wechseljahren bitte ärztliche Begleitung suchen.
        </p>
      </div>
    </div>
  );
}


function TagebuchTab({ phase, zyklusTag, tagebuch, heuteKey, wasserLog, onSetEintrag, onToggleSymptom, onSetWasser }) {
  const eintrag = tagebuch[heuteKey] || {};
  const wasser = wasserLog[heuteKey] || 0;
  const eintraege = Object.entries(tagebuch).filter(([k, v]) => v && (v.stimmung || (v.symptome && v.symptome.length) || v.notiz || v.energie || v.schlaf)).sort((a, b) => new Date(b[0]) - new Date(a[0]));

  const heuteDatum = new Date().toLocaleDateString("de-AT", { weekday: "long", day: "2-digit", month: "long" });

  return (
    <div>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${phase.farbe}, ${phase.farbe}DD)`, borderRadius: 16, padding: "18px 18px 16px", marginBottom: 14, color: "#fff" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>📔 Tagebuch</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>{heuteDatum} · {phase.icon} {phase.name} (Tag {zyklusTag})</p>
      </div>

      {/* Stimmung */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>Wie fühlst du dich heute?</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
          {STIMMUNGEN.map(s => (
            <button key={s.wert} onClick={() => onSetEintrag(heuteKey, "stimmung", eintrag.stimmung === s.wert ? null : s.wert)}
              style={{ flex: 1, background: eintrag.stimmung === s.wert ? phase.hellFarbe : "#f8f8f8", border: eintrag.stimmung === s.wert ? `2px solid ${phase.farbe}` : "2px solid transparent", borderRadius: 12, padding: "10px 2px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontSize: 9.5, color: "#666", fontWeight: 600 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Energie & Schlaf */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>⚡ Energie</span>
            <span style={{ fontSize: 12, color: phase.farbe, fontWeight: 700 }}>{eintrag.energie || 0}/5</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => onSetEintrag(heuteKey, "energie", eintrag.energie === n ? 0 : n)}
                style={{ flex: 1, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: (eintrag.energie || 0) >= n ? phase.farbe : "#f0f0f0" }} />
            ))}
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>😴 Schlafqualität</span>
            <span style={{ fontSize: 12, color: phase.farbe, fontWeight: 700 }}>{eintrag.schlaf || 0}/5</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => onSetEintrag(heuteKey, "schlaf", eintrag.schlaf === n ? 0 : n)}
                style={{ flex: 1, height: 32, borderRadius: 8, border: "none", cursor: "pointer", background: (eintrag.schlaf || 0) >= n ? phase.farbe : "#f0f0f0" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Wasser */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>💧 Wasser</span>
          <span style={{ fontSize: 13, color: "#2196F3", fontWeight: 700 }}>{wasser} / 8 Gläser</span>
        </div>
        <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
          {[1,2,3,4,5,6,7,8].map(n => (
            <button key={n} onClick={() => onSetWasser(heuteKey, wasser >= n ? n - 1 : n)}
              style={{ flex: 1, minWidth: 28, height: 36, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 16, background: wasser >= n ? "#E3F2FD" : "#f8f8f8" }}>
              {wasser >= n ? "💧" : ""}
            </button>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 11, color: "#999", lineHeight: 1.4 }}>Beim Fasten besonders wichtig: ausreichend trinken und Elektrolyte ergänzen.</p>
      </div>

      {/* Symptome */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>Symptome heute</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TAGEBUCH_SYMPTOME.map(sym => {
            const aktiv = (eintrag.symptome || []).includes(sym);
            return (
              <button key={sym} onClick={() => onToggleSymptom(heuteKey, sym)}
                style={{ background: aktiv ? phase.farbe : "#f4f4f4", color: aktiv ? "#fff" : "#666", border: "none", borderRadius: 20, padding: "7px 13px", cursor: "pointer", fontSize: 12, fontWeight: aktiv ? 600 : 400 }}>
                {sym}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notiz */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700 }}>📝 Notiz</p>
        <textarea value={eintrag.notiz || ""} onChange={e => onSetEintrag(heuteKey, "notiz", e.target.value)}
          placeholder="Wie war dein Tag? Was möchtest du festhalten?"
          style={{ width: "100%", minHeight: 70, borderRadius: 10, border: "1px solid #ddd", padding: "10px 12px", fontSize: 13, fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }} />
      </div>

      {/* Verlauf */}
      {eintraege.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 80, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 700 }}>📅 Dein Verlauf</p>
          {eintraege.slice(0, 14).map(([key, v]) => {
            const stim = STIMMUNGEN.find(s => s.wert === v.stimmung);
            return (
              <div key={key} style={{ padding: "9px 0", borderBottom: "1px solid #f3f3f3" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#444" }}>{new Date(key).toLocaleDateString("de-AT", { weekday: "short", day: "2-digit", month: "short" })}</span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {stim && <span style={{ fontSize: 16 }}>{stim.icon}</span>}
                    {v.energie ? <span style={{ fontSize: 10, color: "#888" }}>⚡{v.energie}</span> : null}
                    {v.schlaf ? <span style={{ fontSize: 10, color: "#888" }}>😴{v.schlaf}</span> : null}
                  </div>
                </div>
                {v.symptome && v.symptome.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
                    {v.symptome.map(s => <span key={s} style={{ fontSize: 10, background: phase.hellFarbe, color: phase.farbe, borderRadius: 8, padding: "1px 7px" }}>{s}</span>)}
                  </div>
                )}
                {v.notiz && <p style={{ margin: "5px 0 0", fontSize: 11.5, color: "#777", lineHeight: 1.4, fontStyle: "italic" }}>"{v.notiz}"</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EinstellungenTab({ phase, modus, onModusWechseln, mondStart, onSetMondStart, onExport, onImport, onOnboarding }) {
  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${phase.farbe}, ${phase.farbe}DD)`, borderRadius: 16, padding: "18px 18px 16px", marginBottom: 14, color: "#fff" }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>⚙️ Einstellungen</h2>
      </div>

      {/* Modus */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700 }}>🌙 Tracking-Modus</p>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888", lineHeight: 1.5 }}>Hast du einen regelmäßigen Zyklus oder bist du in den Wechseljahren?</p>
        <div style={{ display: "flex", gap: 8, marginBottom: modus === "menopause" ? 14 : 0 }}>
          <button onClick={() => onModusWechseln("zyklus")}
            style={{ flex: 1, background: modus === "zyklus" ? phase.farbe : "#f4f4f4", color: modus === "zyklus" ? "#fff" : "#666", border: "none", borderRadius: 10, padding: "12px 10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            🩸 Zyklus
          </button>
          <button onClick={() => onModusWechseln("menopause")}
            style={{ flex: 1, background: modus === "menopause" ? phase.farbe : "#f4f4f4", color: modus === "menopause" ? "#fff" : "#666", border: "none", borderRadius: 10, padding: "12px 10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            🌙 Wechseljahre
          </button>
        </div>
        {modus === "menopause" && (
          <div style={{ background: phase.hellFarbe, borderRadius: 10, padding: "12px 14px" }}>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "#555", lineHeight: 1.6 }}>
              <strong>Warum der Mondzyklus?</strong> Ohne Periode fehlt dem Körper sein natürlicher Monatsrhythmus. Dr. Pelz empfiehlt in <em>Fast Like a Girl</em>, sich stattdessen am Mondzyklus zu orientieren: Der <strong>Neumond gilt als "Tag 1"</strong>. So gibst du deinem Körper weiterhin einen ~30-Tage-Rhythmus und kannst zwischen aufbauenden (Power), energiereichen (Manifestation) und ruhigeren (Nurture) Phasen wechseln — inklusive passendem Fasten, Essen und Training.
            </p>
            <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Datum des letzten Neumonds</label>
            <input type="date" max={new Date().toISOString().split("T")[0]}
              value={mondStart ? datumKey(mondStart) : ""}
              onChange={e => { if (e.target.value) onSetMondStart(new Date(e.target.value + "T12:00:00").toISOString()); }}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, boxSizing: "border-box" }} />
            <p style={{ margin: "8px 0 0", fontSize: 10.5, color: "#999", lineHeight: 1.4 }}>
              Tipp: Den aktuellen Mondkalender findest du online. Im Wechseljahre-Bereich (☰ Mehr) findest du außerdem die Primal Menopausal Diet und das passende Trainingsprotokoll.
            </p>
          </div>
        )}
      </div>

      {/* Backup */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 700 }}>💾 Daten sichern</p>
        <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888", lineHeight: 1.5 }}>Deine Daten liegen nur auf diesem Gerät. Erstelle regelmäßig ein Backup, damit nichts verloren geht.</p>
        <button onClick={onExport} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
          ⬇️ Backup herunterladen
        </button>
        <label style={{ display: "block", width: "100%", background: "#f4f4f4", color: "#666", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 13, fontWeight: 700, textAlign: "center", boxSizing: "border-box" }}>
          ⬆️ Backup wiederherstellen
          <input type="file" accept="application/json" onChange={onImport} style={{ display: "none" }} />
        </label>
        <p style={{ margin: "8px 0 0", fontSize: 10.5, color: "#bbb", lineHeight: 1.4 }}>Beim Wiederherstellen werden die aktuellen Daten überschrieben.</p>
      </div>

      {/* Einführung nochmal */}
      <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 80, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700 }}>❓ Hilfe</p>
        <button onClick={onOnboarding} style={{ width: "100%", background: "#f4f4f4", color: "#444", border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
          📖 Einführung nochmal ansehen
        </button>
      </div>
    </div>
  );
}


function FastenTab({ phase, zyklusTag, aktivFasten, fastenStart, fastenEnde, now, fastenLogs, onStart, onBeenden }) {
  const [offenerTyp, setOffenerTyp] = useState(null);

  const fortschritt = aktivFasten && fastenStart ? Math.min(100, ((now - fastenStart) / (aktivFasten.stunden * 3600000)) * 100) : 0;
  const verstrichenH = aktivFasten && fastenStart ? (now - fastenStart) / 3600000 : 0;
  const restMs = fastenEnde ? Math.max(0, fastenEnde - now) : 0;
  const restH = Math.floor(restMs / 3600000);
  const restM = Math.floor((restMs % 3600000) / 60000);

  // Aktuell erreichte Zeitleisten-Stufe
  const erreichteStufen = FASTEN_ZEITLEISTE.filter(s => verstrichenH >= s.ab);

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #6A4C93, #9B7BAD)", borderRadius: 16, padding: "18px 18px 16px", marginBottom: 14, color: "#fff" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>⏰ Fasten</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>Dein Fasten-Begleiter nach Dr. Mindy Pelz (Fast Like a Girl)</p>
      </div>

      {/* AKTIVER TIMER */}
      {aktivFasten ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: `2px solid ${phase.farbe}` }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, color: "#888" }}>Aktives Fasten</p>
          <p style={{ margin: "0 0 12px", fontSize: 18, fontWeight: 800 }}>{aktivFasten.icon} {aktivFasten.name}</p>
          <div style={{ background: "#f0f0f0", borderRadius: 8, height: 14, marginBottom: 8, overflow: "hidden" }}>
            <div style={{ width: `${fortschritt}%`, height: "100%", background: `linear-gradient(90deg, ${phase.farbe}, #C4845A)`, borderRadius: 8, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 14 }}>
            <span>Verstrichen: {verstrichenH.toFixed(1)}h</span>
            <span>Noch: {restH}h {restM}min</span>
          </div>

          {/* Live Zeitleiste */}
          <div style={{ background: phase.hellFarbe, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
            <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: phase.farbe }}>Was gerade in deinem Körper passiert:</p>
            {erreichteStufen.length > 0 ? (
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#333" }}>
                  {erreichteStufen[erreichteStufen.length - 1].icon} {erreichteStufen[erreichteStufen.length - 1].titel}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 12, color: "#555", lineHeight: 1.55 }}>
                  {erreichteStufen[erreichteStufen.length - 1].text}
                </p>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: 12, color: "#777", lineHeight: 1.5 }}>Dein Körper verdaut noch die letzte Mahlzeit. Die ersten Effekte beginnen ab Stunde 4.</p>
            )}
          </div>

          <button onClick={onBeenden} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✅ Fasten beenden & speichern</button>
        </div>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Fastenkur wählen & starten</p>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: "#888", lineHeight: 1.5 }}>Tippe auf eine Kur für die Erklärung, oder starte sie direkt. Du kannst jede Kur starten — auch wenn sie nicht zu deiner aktuellen Phase passt.</p>
          {FASTEN_TYPEN.map(f => {
            const passt = f.phasen.includes(phase.id);
            const offen = offenerTyp === f.id;
            return (
              <div key={f.id} style={{ marginBottom: 8 }}>
                <div style={{ background: offen ? phase.hellFarbe : "#f8f8f8", border: `1px solid ${offen ? phase.farbe + "44" : "#eee"}`, borderRadius: 12, overflow: "hidden" }}>
                  <button onClick={() => setOffenerTyp(offen ? null : f.id)}
                    style={{ width: "100%", background: "none", border: "none", padding: "12px 14px", cursor: "pointer", textAlign: "left", display: "flex", gap: 11, alignItems: "center" }}>
                    <span style={{ fontSize: 24 }}>{f.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#222" }}>{f.name}</span>
                        <span style={{ fontSize: 15, color: phase.farbe }}>{offen ? "−" : "+"}</span>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, color: "#fff", background: phase.farbe, borderRadius: 8, padding: "1px 7px" }}>{f.stunden}h</span>
                        {passt
                          ? <span style={{ fontSize: 10, color: "#2E7D32", background: "#E8F5E9", borderRadius: 8, padding: "1px 7px" }}>✓ Für deine Phase</span>
                          : <span style={{ fontSize: 10, color: "#999", background: "#f0f0f0", borderRadius: 8, padding: "1px 7px" }}>Andere Phase empfohlen</span>}
                      </div>
                    </div>
                  </button>
                  {offen && (
                    <div style={{ padding: "0 14px 14px" }}>
                      <p style={{ margin: "0 0 8px", fontSize: 12, color: "#555", lineHeight: 1.65 }}>{f.detail}</p>
                      <div style={{ background: "#fff", borderRadius: 8, padding: "8px 10px", marginBottom: 8 }}>
                        <p style={{ margin: 0, fontSize: 11, color: "#777", lineHeight: 1.5 }}><strong>Für wen:</strong> {f.fuerWen}</p>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                        {f.wirkung.map(w => <span key={w} style={{ fontSize: 10, background: phase.hellFarbe, color: phase.farbe, padding: "2px 8px", borderRadius: 10 }}>{w}</span>)}
                      </div>
                      {!passt && (
                        <div style={{ background: "#FFF3E0", borderRadius: 8, padding: "8px 10px", marginBottom: 10, border: "1px solid #FFE0B2" }}>
                          <p style={{ margin: 0, fontSize: 11, color: "#E65100", lineHeight: 1.5 }}>⚠️ Diese Kur ist eigentlich für eine andere Zyklusphase gedacht. Du kannst sie trotzdem starten, aber höre besonders gut auf deinen Körper.</p>
                        </div>
                      )}
                      <button onClick={() => onStart(f)} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                        {f.icon} {f.name} starten
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FASTEN-ZEITLEISTE (Übersicht) */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
        <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>🕐 Was beim Fasten im Körper passiert</p>
        <p style={{ margin: "0 0 14px", fontSize: 12, color: "#888", lineHeight: 1.5 }}>Je länger du fastest, desto tiefer die Heilungsprozesse. Diese Stufen durchläufst du nacheinander:</p>
        <div style={{ position: "relative" }}>
          {FASTEN_ZEITLEISTE.map((s, i) => {
            const aktiv = aktivFasten && verstrichenH >= s.ab;
            return (
              <div key={s.ab} style={{ display: "flex", gap: 12, marginBottom: i < FASTEN_ZEITLEISTE.length - 1 ? 14 : 0, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: aktiv ? phase.farbe : phase.hellFarbe, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0, border: aktiv ? `2px solid ${phase.farbe}` : "none" }}>{s.icon}</div>
                  {i < FASTEN_ZEITLEISTE.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 20, background: "#eee", marginTop: 2 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: phase.farbe, background: phase.hellFarbe, borderRadius: 8, padding: "1px 8px" }}>ab {s.ab}h</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>{s.titel}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#666", lineHeight: 1.55 }}>{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FASTING CYCLE: Welches Fasten wann */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
        <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>🔄 Welches Fasten in welcher Phase?</p>
        <p style={{ margin: "0 0 14px", fontSize: 12, color: "#888", lineHeight: 1.5 }}>Dr. Pelz' 'Fasting Cycle' — passe dein Fasten an deinen Zyklus an:</p>
        {Object.values(PHASEN).map(p => {
          const fastenFuerPhase = FASTEN_TYPEN.filter(f => f.phasen.includes(p.id));
          const istAktuell = p.id === phase.id;
          return (
            <div key={p.id} style={{ background: istAktuell ? p.hellFarbe : "#fafafa", borderRadius: 10, padding: "11px 13px", marginBottom: 8, border: istAktuell ? `1px solid ${p.farbe}44` : "1px solid #f0f0f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: p.farbe }}>{p.icon} {p.name}</span>
                <span style={{ fontSize: 10, color: "#aaa" }}>{p.tage}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {fastenFuerPhase.map(f => (
                  <span key={f.id} style={{ fontSize: 10.5, background: "#fff", color: p.farbe, padding: "2px 8px", borderRadius: 10, border: `1px solid ${p.farbe}33` }}>{f.icon} {f.stunden}h</span>
                ))}
              </div>
              {p.id === "nurture" && <p style={{ margin: "6px 0 0", fontSize: 11, color: "#888", lineHeight: 1.4 }}>In der Nurture-Phase nur sanftes Fasten (max. 13h) — Progesteron braucht Energie und Ruhe.</p>}
              {p.id === "power1" && <p style={{ margin: "6px 0 0", fontSize: 11, color: "#888", lineHeight: 1.4 }}>Power Phase 1 ist ideal für alle Fastenarten — auch die längeren Resets.</p>}
            </div>
          );
        })}
      </div>

      {/* HISTORIE */}
      {fastenLogs.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 80, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
          <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>📊 Deine Fasten-Historie</p>
          {fastenLogs.slice(0, 10).map(log => (
            <div key={log.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid #f3f3f3" }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#333" }}>{log.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "#999" }}>{new Date(log.start).toLocaleDateString("de-AT", { day: "2-digit", month: "short" })} · Tag {log.zyklusTag}</p>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: phase.farbe }}>{log.dauer}h</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function GlukoseTab({ phase, modus }) {
  const [offenerHack, setOffenerHack] = useState(null);
  const istNurture = phase.id === "nurture";

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #C2185B, #E91E63)", borderRadius: 16, padding: "18px 18px 16px", marginBottom: 14, color: "#fff" }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 800 }}>🩸 Blutzucker-Hacks</h2>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>10 wissenschaftliche Tipps für stabilen Blutzucker — nach Jessie Inchauspé (Glucose Goddess)</p>
      </div>

      {/* Warum wichtig */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, color: "#333" }}>Warum Blutzucker für deine Hormone zählt</p>
        <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.65 }}>
          Stabiler Blutzucker bedeutet weniger Heißhunger, mehr Energie, bessere Stimmung und eine ausgeglichenere Hormonbalance. Glukosespitzen belasten den Körper und können PMS, Müdigkeit und Hautprobleme verstärken. Dr. Mindy Pelz verweist in "Eat Like a Girl" direkt auf Inchauspés Arbeit.
        </p>
      </div>

      {/* Phasen-Hinweis */}
      <div style={{ background: phase.hellFarbe, borderRadius: 14, padding: "12px 16px", marginBottom: 12, border: `1px solid ${phase.farbe}33` }}>
        <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
          {modus === "menopause"
            ? "💜 In der Menopause ist stabiler Blutzucker besonders wichtig: Mit dem Östrogen-Rückgang wird der Körper insulinempfindlicher. Diese Hacks helfen gegen Heißhunger, Energietiefs und den 'Menopause-Nebel'."
            : (istNurture
              ? "💜 Du bist gerade in der Nurture-Phase — hier ist stabiler Blutzucker besonders wichtig! Progesteron reagiert empfindlich auf Schwankungen. Diese Hacks helfen aktiv gegen PMS, Heißhunger und Stimmungstiefs."
              : "💡 Stabiler Blutzucker unterstützt deine Hormonbalance in jeder Phase — besonders wertvoll wird er in der Nurture-Phase (vor der Periode).")}
        </p>
      </div>

      {/* Hacks */}
      {GLUKOSE_HACKS.map((hack) => (
        <div key={hack.nr} style={{ marginBottom: 8 }}>
          <button onClick={() => setOffenerHack(offenerHack === hack.nr ? null : hack.nr)}
            style={{ width: "100%", background: offenerHack === hack.nr ? phase.hellFarbe : "#fff", border: `1px solid ${offenerHack === hack.nr ? phase.farbe + "44" : "#eee"}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", textAlign: "left", display: "flex", gap: 11, alignItems: "flex-start", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <span style={{ fontSize: 22, lineHeight: 1.1 }}>{hack.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#222" }}>{hack.nr}. {hack.titel}</span>
                <span style={{ fontSize: 16, color: phase.farbe, marginLeft: 6 }}>{offenerHack === hack.nr ? "−" : "+"}</span>
              </div>
              <p style={{ margin: "3px 0 0", fontSize: 12, color: "#777", lineHeight: 1.5 }}>{hack.kurz}</p>
            </div>
          </button>
          {offenerHack === hack.nr && (
            <div style={{ background: phase.hellFarbe, borderRadius: "0 0 12px 12px", padding: "12px 14px", border: `1px solid ${phase.farbe}22`, borderTop: "none", marginTop: -4 }}>
              <p style={{ margin: "0 0 8px", fontSize: 12, color: "#444", lineHeight: 1.65 }}>{hack.detail}</p>
              <div style={{ background: "#fff", borderRadius: 8, padding: "8px 10px", border: `1px solid ${phase.farbe}22` }}>
                <p style={{ margin: 0, fontSize: 11, color: phase.farbe, fontWeight: 600, lineHeight: 1.4 }}>📊 {hack.beleg}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Quelle */}
      <div style={{ background: "#F3F4F6", borderRadius: 10, padding: "11px 13px", marginTop: 10, marginBottom: 80 }}>
        <p style={{ margin: 0, fontSize: 11, color: "#888", lineHeight: 1.55, fontStyle: "italic" }}>
          Quelle: "Glucose Revolution" von Jessie Inchauspé. Diese Tipps ersetzen keine medizinische Beratung — bei Diabetes oder Blutzuckererkrankungen bitte ärztlich abklären.
        </p>
      </div>
    </div>
  );
}

function TrainingTab({ phase, zyklusTag }) {
  const [offenUebung, setOffenUebung] = useState(null);
  const training = TRAINING_PHASEN[phase.id];

  const intensitaetFarbe = (level) => {
    if (level.includes("Maximal") || level.includes("Hoch")) return "#E53935";
    if (level.includes("Mittel")) return "#FB8C00";
    if (level.includes("Leicht")) return "#43A047";
    return "#7CB342";
  };

  return (
    <div>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${phase.farbe}, ${phase.farbe}cc)`, borderRadius: 16, padding: "18px 18px 14px", marginBottom: 14, color: "#fff" }}>
        <p style={{ margin: "0 0 2px", fontSize: 11, opacity: 0.85 }}>Tag {zyklusTag} · {phase.name}</p>
        <h2 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>{training.titel}</h2>
        <p style={{ margin: "0 0 10px", fontSize: 12, opacity: 0.9 }}>{training.untertitel}</p>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, opacity: 0.85 }}>Intensität:</span>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ fontSize: 14, opacity: i <= training.intensitaetSterne ? 1 : 0.3 }}>⚡</span>
          ))}
          <span style={{ fontSize: 11, opacity: 0.85, marginLeft: 2 }}>{training.intensitaet}</span>
        </div>
      </div>

      {/* Wissenschaft */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#333" }}>🔬 Warum jetzt so trainieren?</p>
        <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.65 }}>{training.wissenschaft}</p>
      </div>

      {/* Übungen */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#333" }}>🏋️ Empfohlene Übungen</p>
        {training.uebungen.map((u, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <button onClick={() => setOffenUebung(offenUebung === idx ? null : idx)}
              style={{ width: "100%", background: offenUebung === idx ? phase.hellFarbe : "#f8f8f8", border: `1px solid ${offenUebung === idx ? phase.farbe + "44" : "#eee"}`, borderRadius: 12, padding: "12px 14px", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#222" }}>{u.name}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                  <span style={{ fontSize: 10, color: "#888" }}>🎯 {u.geraet}</span>
                  <span style={{ fontSize: 10, color: "#888" }}>⏱ {u.dauer}</span>
                  <span style={{ fontSize: 10, color: intensitaetFarbe(u.intensitaet), fontWeight: 600 }}>{u.intensitaet}</span>
                </div>
              </div>
              <span style={{ fontSize: 16, color: phase.farbe }}>{offenUebung === idx ? "▲" : "▼"}</span>
            </button>
            {offenUebung === idx && (
              <div style={{ background: phase.hellFarbe, borderRadius: "0 0 12px 12px", padding: "12px 14px", border: `1px solid ${phase.farbe}22`, borderTop: "none" }}>
                <p style={{ margin: "0 0 8px", fontSize: 12, color: "#444", lineHeight: 1.6 }}><strong>Ablauf:</strong> {u.beschreibung}</p>
                <p style={{ margin: 0, fontSize: 12, color: phase.farbe, lineHeight: 1.5 }}>💡 {u.warum}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ernährungs-Tipp */}
      <div style={{ background: "#FFF8E1", borderRadius: 14, padding: "12px 16px", marginBottom: 10, border: "1px solid #FFE082" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#E65100" }}>🥗 Ernährung & Training</p>
        <p style={{ margin: 0, fontSize: 12, color: "#5D4037", lineHeight: 1.6 }}>{training.ernaehrungTipp}</p>
      </div>

      {/* Fasten + Training */}
      <div style={{ background: "#E8F5E9", borderRadius: 14, padding: "12px 16px", marginBottom: 10, border: "1px solid #C8E6C9" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#2E7D32" }}>⏰ Fasten & Training kombinieren</p>
        <p style={{ margin: 0, fontSize: 12, color: "#1B5E20", lineHeight: 1.6 }}>{training.fastenTraining}</p>
      </div>

      {/* Erholung */}
      <div style={{ background: "#F3E5F5", borderRadius: 14, padding: "12px 16px", marginBottom: 10, border: "1px solid #E1BEE7" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#6A1B9A" }}>💤 Erholung & Schlaf</p>
        <p style={{ margin: 0, fontSize: 12, color: "#4A148C", lineHeight: 1.6 }}>{training.erholung}</p>
      </div>

      {/* Schwerpunkte */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#333" }}>✅ Jetzt fokussieren auf</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
          {training.schwerpunkt.map(s => <span key={s} style={{ fontSize: 11, background: phase.hellFarbe, color: phase.farbe, padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>{s}</span>)}
        </div>
        <p style={{ margin: "8px 0 4px", fontSize: 12, fontWeight: 700, color: "#888" }}>❌ Jetzt besser vermeiden</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {training.vermeiden.map(v => <span key={v} style={{ fontSize: 11, background: "#FFF3F3", color: "#C62828", padding: "4px 10px", borderRadius: 20 }}>{v}</span>)}
        </div>
      </div>

      {/* Pre/Post Workout */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#333" }}>🍽️ Vor & nach dem Training essen</p>
        <div style={{ background: "#E3F2FD", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
          <p style={{ margin: "0 0 3px", fontSize: 11, color: "#1565C0", fontWeight: 700 }}>VOR dem Training</p>
          <p style={{ margin: 0, fontSize: 12, color: "#0D47A1", lineHeight: 1.6 }}>{training.preWorkout}</p>
        </div>
        <div style={{ background: "#E8F5E9", borderRadius: 10, padding: "10px 12px" }}>
          <p style={{ margin: "0 0 3px", fontSize: 11, color: "#2E7D32", fontWeight: 700 }}>NACH dem Training</p>
          <p style={{ margin: 0, fontSize: 12, color: "#1B5E20", lineHeight: 1.6 }}>{training.postWorkout}</p>
        </div>
      </div>

      {/* Schlaf */}
      <div style={{ background: "#EDE7F6", borderRadius: 14, padding: "12px 16px", marginBottom: 10, border: "1px solid #D1C4E9" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#4527A0" }}>🌙 Schlaf-Tipp für diese Phase</p>
        <p style={{ margin: 0, fontSize: 12, color: "#311B92", lineHeight: 1.6 }}>{training.schlafTipp}</p>
      </div>

      {/* Knochengesundheit */}
      <div style={{ background: "#FFF3E0", borderRadius: 14, padding: "12px 16px", marginBottom: 10, border: "1px solid #FFE0B2" }}>
        <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#E65100" }}>🦴 Knochengesundheit & Trampolin</p>
        <p style={{ margin: 0, fontSize: 12, color: "#BF360C", lineHeight: 1.6 }}>{training.knochenInfo}</p>
      </div>

      {/* Experten-Tipps */}
      <div style={{ background: "#fff", borderRadius: 14, padding: "12px 16px", marginBottom: 80, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <p style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#333" }}>📚 Aus den Büchern</p>
        <div style={{ background: "#F3F4F6", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
          <p style={{ margin: "0 0 2px", fontSize: 10, color: "#888", fontWeight: 600 }}>ROAR — Stacy Sims PhD</p>
          <p style={{ margin: 0, fontSize: 12, color: "#444", lineHeight: 1.5, fontStyle: "italic" }}>{training.roarTipp}</p>
        </div>
        <div style={{ background: "#F3F4F6", borderRadius: 10, padding: "10px 12px" }}>
          <p style={{ margin: "0 0 2px", fontSize: 10, color: "#888", fontWeight: 600 }}>Fast Like a Girl / Eat Like a Girl — Dr. Mindy Pelz</p>
          <p style={{ margin: 0, fontSize: 12, color: "#444", lineHeight: 1.5, fontStyle: "italic" }}>{training.pelzTipp}</p>
        </div>
      </div>
    </div>
  );
}



function ZyklusKalender({ periodenStart, periodenHistorie, zyklusLaenge, zyklusTag, onTagKlick, modus }) {
  const [monatOffset, setMonatOffset] = useState(0); // 0 = aktueller Monat

  const heute = new Date();
  heute.setHours(0, 0, 0, 0);
  const anzeigeMonat = new Date(heute.getFullYear(), heute.getMonth() + monatOffset, 1);
  const jahr = anzeigeMonat.getFullYear();
  const monat = anzeigeMonat.getMonth();

  const monatsNamen = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
  const wochentage = ["Mo","Di","Mi","Do","Fr","Sa","So"];

  // Phasenfarben
  const phasenFarbe = {
    power1: "#7C9E87", manifestation: "#C4845A", power2: "#8FAF6E", nurture: "#9B7BAD",
  };

  // Lokaler Datums-Key (YYYY-MM-DD) ohne UTC-Verschiebung
  function lokalerKey(d) {
    const j = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const t = String(d.getDate()).padStart(2, "0");
    return `${j}-${m}-${t}`;
  }

  // Set aller Periodentage (für schnelle Suche). Periode = ca. 5 Tage ab jedem Start.
  const periodenTage = new Set();
  (periodenHistorie || []).forEach(startISO => {
    const start = new Date(startISO);
    for (let i = 0; i < 5; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      periodenTage.add(lokalerKey(d));
    }
  });

  // Eisprung-Tage schätzen: ca. Tag 14 nach jedem Periodenstart (Manifestationsphase-Mitte).
  const eisprungTage = new Set();
  const fruchtbareTage = new Set();
  function markiereEisprung(startISO) {
    const start = new Date(startISO);
    const eisprung = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 13); // Tag 14
    eisprungTage.add(lokalerKey(eisprung));
    // Fruchtbares Fenster: 5 Tage vor Eisprung + Eisprungtag (Spermien überleben bis 5 Tage)
    for (let i = 5; i >= 0; i--) {
      const tag = new Date(eisprung.getFullYear(), eisprung.getMonth(), eisprung.getDate() - i);
      fruchtbareTage.add(lokalerKey(tag));
    }
  }
  if (modus !== "menopause") {
    (periodenHistorie || []).forEach(markiereEisprung);
    if (periodenStart) markiereEisprung(periodenStart);
  }

  // Phase für ein bestimmtes Datum berechnen (basierend auf aktuellem Periodenstart)
  function phaseFuerDatum(datum) {
    if (!periodenStart) return null;
    const start = new Date(periodenStart);
    const startTag = Math.floor(new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime() / 86400000);
    const dTag = Math.floor(new Date(datum.getFullYear(), datum.getMonth(), datum.getDate()).getTime() / 86400000);
    const diff = dTag - startTag;
    if (diff < 0 || diff > zyklusLaenge * 2) return null; // nur nahe am aktuellen Zyklus
    const tag = (diff % zyklusLaenge) + 1;
    if (tag <= 10) return "power1";
    if (tag <= 15) return "manifestation";
    if (tag <= 19) return "power2";
    return "nurture";
  }

  // Kalender-Grid aufbauen
  const ersterTag = new Date(jahr, monat, 1);
  let startWochentag = ersterTag.getDay() - 1; // Mo = 0
  if (startWochentag < 0) startWochentag = 6;
  const tageImMonat = new Date(jahr, monat + 1, 0).getDate();

  const zellen = [];
  for (let i = 0; i < startWochentag; i++) zellen.push(null);
  for (let t = 1; t <= tageImMonat; t++) zellen.push(t);

  const heuteKey = lokalerKey(heute);

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
      {/* Monats-Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <button onClick={() => setMonatOffset(monatOffset - 1)} style={{ background: "#f0f0f0", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>‹</button>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#333" }}>{monatsNamen[monat]} {jahr}</p>
        <button onClick={() => setMonatOffset(monatOffset + 1)} style={{ background: "#f0f0f0", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>›</button>
      </div>

      {/* Wochentage */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 4 }}>
        {wochentage.map(w => <div key={w} style={{ textAlign: "center", fontSize: 10, color: "#aaa", fontWeight: 600 }}>{w}</div>)}
      </div>

      {/* Tage */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {zellen.map((t, i) => {
          if (t === null) return <div key={"e" + i} />;
          const datum = new Date(jahr, monat, t);
          const key = lokalerKey(datum);
          const istPeriode = periodenTage.has(key);
          const istEisprung = eisprungTage.has(key);
          const istFruchtbar = fruchtbareTage.has(key) && !istEisprung;
          const istHeute = key === heuteKey;
          // Neumond-Tag im Menopausen-Modus (Tag 1 des Mondzyklus)
          const istNeumond = modus === "menopause" && periodenStart && lokalerKey(new Date(periodenStart)) === key;
          const ph = phaseFuerDatum(datum);
          const bgFarbe = istPeriode ? "#E91E63" : (ph ? phasenFarbe[ph] + "33" : "transparent");
          const textFarbe = istPeriode ? "#fff" : "#444";

          return (
            <button key={key} onClick={() => onTagKlick(datum)}
              style={{ height: 40, border: istHeute ? "2px solid #333" : (istFruchtbar ? "1.5px dashed #26A69A" : "1px solid transparent"), borderRadius: 8, background: bgFarbe, color: textFarbe, cursor: "pointer", fontSize: 12, fontWeight: istHeute ? 700 : 400, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", padding: 0 }}>
              <span>{t}</span>
              {istEisprung && !istPeriode && <span style={{ fontSize: 8, lineHeight: 1 }}>✨</span>}
              {istFruchtbar && !istPeriode && <span style={{ fontSize: 7, lineHeight: 1, color: "#26A69A" }}>●</span>}
              {istPeriode && <span style={{ fontSize: 8, lineHeight: 1 }}>🩸</span>}
              {istNeumond && <span style={{ fontSize: 8, lineHeight: 1 }}>🌑</span>}
            </button>
          );
        })}
      </div>

      {/* Legende */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12, justifyContent: "center" }}>
        {modus !== "menopause" && <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: "#E91E63", display: "inline-block" }} />🩸 Periode</span>}
        {modus !== "menopause" && <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 3 }}>✨ Eisprung (geschätzt)</span>}
        {modus !== "menopause" && <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 3 }}><span style={{ color: "#26A69A" }}>●</span> fruchtbar (geschätzt)</span>}
        {modus === "menopause" && <span style={{ fontSize: 10, color: "#888", display: "flex", alignItems: "center", gap: 3 }}>🌑 Neumond (Tag 1)</span>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8, justifyContent: "center" }}>
        {[["power1","🌱 P1"],["manifestation","✨ Mani"],["power2","🌸 P2"],["nurture","🌙 Nurture"]].map(([id, label]) => (
          <span key={id} style={{ fontSize: 9, color: "#888", display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: phasenFarbe[id] + "55", display: "inline-block" }} />{label}
          </span>
        ))}
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 10, color: "#bbb", textAlign: "center", lineHeight: 1.4 }}>
        {modus === "menopause"
          ? "Tippe auf einen Tag, um den Neumond (Tag 1 deines Mondzyklus) für dieses Datum zu setzen."
          : "Tippe auf einen Tag, um deine Periode für dieses Datum einzutragen."}
      </p>
      {/* Sicherheitshinweis fruchtbares Fenster */}
      {modus !== "menopause" && <div style={{ background: "#E0F2F1", borderRadius: 10, padding: "10px 12px", marginTop: 12, border: "1px solid #B2DFDB" }}>
        <p style={{ margin: 0, fontSize: 10.5, color: "#00695C", lineHeight: 1.5 }}>
          ⚠️ Das fruchtbare Fenster (grün) und der Eisprung sind nur <strong>grobe Schätzungen</strong> auf Basis deiner Zykluslänge. Der echte Eisprung schwankt von Zyklus zu Zyklus. <strong>Nicht zur Verhütung oder Empfängnisplanung geeignet</strong> — dafür bitte zusätzliche Methoden (z.B. Temperaturmessung, Ovulationstests) oder ärztliche Beratung nutzen.
        </p>
      </div>}
    </div>
  );
}



export default function App() {
  const [tab, setTab] = useState("home");
  const [periodenStart, setPeriodenStart] = useState(null); // ISO-Datum des letzten Periodenbeginns
  const [periodenHistorie, setPeriodenHistorie] = useState([]); // Array aller Periodenstart-Daten (ISO)
  const [zyklusLaenge, setZyklusLaenge] = useState(28);
  const [logs, setLogs] = useState([]);
  const [fastenLogs, setFastenLogs] = useState([]);
  const [offenRezept, setOffenRezept] = useState(null);
  const [portionen, setPortionen] = useState({});
  const [filter, setFilter] = useState({ phase: "alle", stil: "alle", diät: "alle", suche: "" });
  const [aktivFasten, setAktivFasten] = useState(null);
  const [fastenStart, setFastenStart] = useState(null);
  const [fastenEnde, setFastenEnde] = useState(null);
  const [now, setNow] = useState(new Date());
  const [einkaufsliste, setEinkaufsliste] = useState([]);
  const [einkaufsAuswahl, setEinkaufsAuswahl] = useState({});
  const [einkaufsPortionen, setEinkaufsPortionen] = useState({});
  const [einkaufsModus, setEinkaufsModus] = useState("tag"); // "tag" | "phase" | "manuell"
  const [erledigtItems, setErledigtItems] = useState({});
  const [tagesplan, setTagesplan] = useState({});
  const [phasenBanner, setPhasenBanner] = useState(null); // {phaseId} wenn neue Phase erreicht
  const [setupOffen, setSetupOffen] = useState(false);
  const [periodeBestaetigen, setPeriodeBestaetigen] = useState(false);
  const [modus, setModus] = useState("zyklus"); // "zyklus" | "menopause"
  const [mondStart, setMondStart] = useState(null); // ISO: für Menopausen-Modus (Mondzyklus)
  const [tagebuch, setTagebuch] = useState({}); // { "2026-06-18": { stimmung, energie, schlaf, symptome:[], notiz } }
  const [tagebuchOffen, setTagebuchOffen] = useState(null); // Datum-Key oder null
  const [wasserLog, setWasserLog] = useState({}); // { "2026-06-18": glaeser }
  const [onboardingOffen, setOnboardingOffen] = useState(false);
  const [onboardingSchritt, setOnboardingSchritt] = useState(0);
  const [mehrOffen, setMehrOffen] = useState(false);
  const [primalNur, setPrimalNur] = useState(false);

  // Zyklustag berechnen — im Menopausen-Modus auf Basis des Mondzyklus (29,5 Tage)
  function berechneZyklusTag(startISO, laenge, jetzt = new Date()) {
    if (!startISO) return 1;
    const start = new Date(startISO);
    const heute = new Date(jetzt);
    // Auf lokale Mitternacht normalisieren und in reine Tageszahlen umrechnen (zeitzonensicher)
    const startTag = Math.floor(new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime() / 86400000);
    const heuteTag = Math.floor(new Date(heute.getFullYear(), heute.getMonth(), heute.getDate()).getTime() / 86400000);
    const diffTage = heuteTag - startTag;
    if (diffTage < 0) return 1;
    return (diffTage % laenge) + 1;
  }

  // Im Menopausen-Modus: Mondzyklus (Neumond = Tag 1, 30 Tage gerundet)
  const effektiverStart = modus === "menopause" ? mondStart : periodenStart;
  const effektiveLaenge = modus === "menopause" ? 30 : zyklusLaenge;
  const zyklusTag = berechneZyklusTag(effektiverStart, effektiveLaenge, now);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("ealg_v2") || "{}");
      if (d.modus) setModus(d.modus);
      if (d.mondStart) setMondStart(d.mondStart);
      if (d.tagebuch) setTagebuch(d.tagebuch);
      if (d.wasserLog) setWasserLog(d.wasserLog);

      if (d.periodenStart) {
        setPeriodenStart(d.periodenStart);
      } else if (d.zyklusTag) {
        const heute = new Date();
        heute.setHours(0,0,0,0);
        const start = new Date(heute.getTime() - (d.zyklusTag - 1) * 86400000);
        setPeriodenStart(start.toISOString());
        speichern({ periodenStart: start.toISOString() });
      } else if (!d.modus && !d.mondStart) {
        // Erststart: Onboarding zeigen (statt nur Setup)
        setOnboardingOffen(true);
      }
      if (d.zyklusLaenge) setZyklusLaenge(d.zyklusLaenge);
      if (d.periodenHistorie) setPeriodenHistorie(d.periodenHistorie);
      if (d.logs) setLogs(d.logs);
      if (d.fastenLogs) setFastenLogs(d.fastenLogs);
      if (d.tagesplan) setTagesplan(d.tagesplan);

      // Phasenwechsel-Banner prüfen
      const startFuerBanner = (d.modus === "menopause") ? d.mondStart : d.periodenStart;
      const laengeFuerBanner = (d.modus === "menopause") ? 30 : (d.zyklusLaenge || 28);
      if (startFuerBanner) {
        const aktuellePhase = getPhaseVonTag(berechneZyklusTag(startFuerBanner, laengeFuerBanner));
        const letzteGezeigtePhase = d.letzteGezeigtePhase;
        if (letzteGezeigtePhase && letzteGezeigtePhase !== aktuellePhase) {
          setPhasenBanner(aktuellePhase);
        }
        speichern({ letzteGezeigtePhase: aktuellePhase });
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  function speichern(updates) {
    try {
      const current = JSON.parse(localStorage.getItem("ealg_v2") || "{}");
      localStorage.setItem("ealg_v2", JSON.stringify({ ...current, ...updates }));
    } catch (e) {}
  }

  const heuteKey = datumKey(new Date());

  // Tagebuch-Eintrag speichern
  function setTagebuchEintrag(datumKey, feld, wert) {
    setTagebuch(prev => {
      const eintrag = { ...(prev[datumKey] || {}), [feld]: wert };
      const neu = { ...prev, [datumKey]: eintrag };
      speichern({ tagebuch: neu });
      return neu;
    });
  }

  // Symptom togglen
  function toggleSymptom(datumKey, symptom) {
    setTagebuch(prev => {
      const eintrag = { ...(prev[datumKey] || {}) };
      const symptome = eintrag.symptome || [];
      eintrag.symptome = symptome.includes(symptom) ? symptome.filter(s => s !== symptom) : [...symptome, symptom];
      const neu = { ...prev, [datumKey]: eintrag };
      speichern({ tagebuch: neu });
      return neu;
    });
  }

  // Wasser
  function setWasser(datumKey, glaeser) {
    setWasserLog(prev => {
      const neu = { ...prev, [datumKey]: Math.max(0, glaeser) };
      speichern({ wasserLog: neu });
      return neu;
    });
  }

  // Modus wechseln (Zyklus <-> Menopause)
  function modusWechseln(neuerModus) {
    setModus(neuerModus);
    speichern({ modus: neuerModus });
  }

  // Mondzyklus-Start setzen (Menopause)
  function setMondStartDatum(datumISO) {
    setMondStart(datumISO);
    const neuePhase = getPhaseVonTag(berechneZyklusTag(datumISO, 30));
    speichern({ mondStart: datumISO, letzteGezeigtePhase: neuePhase, modus: "menopause" });
    setModus("menopause");
  }

  // Daten exportieren (Backup als JSON-Download)
  function datenExportieren() {
    try {
      const daten = localStorage.getItem("ealg_v2") || "{}";
      const blob = new Blob([daten], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eat-like-a-girl-backup-${heuteKey}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {}
  }

  // Daten importieren (aus Backup-Datei)
  function datenImportieren(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const daten = JSON.parse(e.target.result);
        localStorage.setItem("ealg_v2", JSON.stringify(daten));
        window.location.reload();
      } catch (err) {}
    };
    reader.readAsText(file);
  }

  // Periodenbeginn setzen (Tag 1 = heute oder gewähltes Datum) + Historie pflegen
  function setPeriodenStartDatum(datumISO) {
    setPeriodenStart(datumISO);
    const neuePhase = getPhaseVonTag(berechneZyklusTag(datumISO, zyklusLaenge));

    // Datum (nur Tag) in Historie aufnehmen, Duplikate vermeiden
    const tagKey = datumKey(datumISO);
    const aktuelleHistorie = JSON.parse(localStorage.getItem("ealg_v2") || "{}").periodenHistorie || [];
    const ohneDuplikat = aktuelleHistorie.filter(h => datumKey(h) !== tagKey);
    const neueHistorie = [...ohneDuplikat, datumISO].sort((a, b) => new Date(a) - new Date(b));
    setPeriodenHistorie(neueHistorie);

    // Zykluslänge automatisch aus den letzten Abständen lernen (Durchschnitt)
    let gelernteLaenge = zyklusLaenge;
    if (neueHistorie.length >= 2) {
      const abstaende = [];
      for (let i = 1; i < neueHistorie.length; i++) {
        const tage = Math.round((new Date(neueHistorie[i]) - new Date(neueHistorie[i - 1])) / 86400000);
        if (tage >= 21 && tage <= 40) abstaende.push(tage); // nur plausible Abstände
      }
      if (abstaende.length > 0) {
        // letzte bis zu 6 Zyklen mitteln
        const letzte = abstaende.slice(-6);
        gelernteLaenge = Math.round(letzte.reduce((a, b) => a + b, 0) / letzte.length);
        setZyklusLaenge(gelernteLaenge);
      }
    }

    speichern({ periodenStart: datumISO, letzteGezeigtePhase: neuePhase, periodenHistorie: neueHistorie, zyklusLaenge: gelernteLaenge });
    setSetupOffen(false);
  }

  // Einzelnen Periodentag aus Historie löschen
  function loeschePeriodenEintrag(datumISO) {
    const tagKey = datumKey(datumISO);
    const neueHistorie = periodenHistorie.filter(h => datumKey(h) !== tagKey);
    setPeriodenHistorie(neueHistorie);
    // Falls der gelöschte der aktuelle Start war: auf letzten der Historie zurücksetzen
    let updates = { periodenHistorie: neueHistorie };
    if (datumKey(periodenStart) === tagKey) {
      const letzter = neueHistorie.length ? neueHistorie[neueHistorie.length - 1] : null;
      setPeriodenStart(letzter);
      updates.periodenStart = letzter;
    }
    speichern(updates);
  }

  // Manuelle Tag-Korrektur (verschiebt den Periodenstart entsprechend)
  function setZyklusTagS(t) {
    const laenge = modus === "menopause" ? 30 : zyklusLaenge;
    const v = Math.max(1, Math.min(t, laenge));
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const neuerStart = new Date(heute.getTime() - (v - 1) * 86400000);
    const neuePhase = getPhaseVonTag(v);
    if (modus === "menopause") {
      setMondStart(neuerStart.toISOString());
      speichern({ mondStart: neuerStart.toISOString(), letzteGezeigtePhase: neuePhase });
    } else {
      setPeriodenStart(neuerStart.toISOString());
      speichern({ periodenStart: neuerStart.toISOString(), letzteGezeigtePhase: neuePhase });
    }
  }

  function setZyklusLaengeS(l) {
    setZyklusLaenge(l);
    speichern({ zyklusLaenge: l });
  }

  const phase = PHASEN[getPhaseVonTag(zyklusTag)];
  const empfohleneFasten = FASTEN_TYPEN.filter(f => f.phasen.includes(phase.id));

  function fastenStarten(typ) {
    const start = new Date();
    const ende = new Date(start.getTime() + typ.stunden * 3600000);
    setAktivFasten(typ);
    setFastenStart(start);
    setFastenEnde(ende);
  }

  function fastenBeenden() {
    if (!aktivFasten || !fastenStart) return;
    const dauer = ((now - fastenStart) / 3600000).toFixed(1);
    const log = { id: Date.now(), typId: aktivFasten.id, name: aktivFasten.name, start: fastenStart.toISOString(), ende: now.toISOString(), dauer, zyklusTag };
    const neu = [log, ...fastenLogs].slice(0, 30);
    setFastenLogs(neu);
    speichern({ fastenLogs: neu });
    setAktivFasten(null); setFastenStart(null); setFastenEnde(null);
  }

  function rezeptLoggen(rezeptId) {
    const r = REZEPTE[rezeptId];
    const log = { id: Date.now(), rezeptId, name: r.name, datum: new Date().toISOString(), zyklusTag, phase: phase.id };
    const neu = [log, ...logs].slice(0, 100);
    setLogs(neu);
    speichern({ logs: neu });
    setOffenRezept(null);
  }

  function rezeptInTagesplanToggle(rezeptId, slot) {
    const key = `${zyklusTag}-${slot}`;
    const neu = { ...tagesplan };
    if (neu[key] === rezeptId) delete neu[key];
    else neu[key] = rezeptId;
    setTagesplan(neu);
    speichern({ tagesplan: neu });
  }

  function einkaufslisteBauen() {
    const selected = Object.entries(einkaufsAuswahl).filter(([, v]) => v).map(([k]) => k);
    if (selected.length === 0) return;
    const liste = konsolidierteEinkaufsliste(selected, einkaufsPortionen);
    setEinkaufsliste(liste);
    setErledigtItems({});
    setTab("einkauf_anzeige");
  }

  function einkaufslisteAusPhaseBauen(phaseId) {
    const rezepte = getRezepteFuerPhase(phaseId, 10);
    const ids = rezepte.map(r => r.id);
    const portMap = {};
    ids.forEach(id => { portMap[id] = REZEPTE[id].portionenBasis; });
    const liste = konsolidierteEinkaufsliste(ids, portMap);
    setEinkaufsliste(liste);
    setErledigtItems({});
    setTab("einkauf_anzeige");
  }

  // ── FILTER ──
  let gefiltert = Object.values(REZEPTE);
  if (filter.phase !== "alle") gefiltert = gefiltert.filter(r => r.phasen.includes(filter.phase));
  if (filter.stil !== "alle") gefiltert = gefiltert.filter(r => r.ernährungsstil.includes(filter.stil));
  if (filter.diät !== "alle") gefiltert = gefiltert.filter(r => r.diät.includes(filter.diät));
  if (filter.suche) gefiltert = gefiltert.filter(r => r.name.toLowerCase().includes(filter.suche.toLowerCase()));
  if (primalNur) gefiltert = gefiltert.filter(istPrimalGeeignet);

  const fastenFortschritt = aktivFasten && fastenStart ? Math.min(100, ((now - fastenStart) / (aktivFasten.stunden * 3600000)) * 100) : 0;
  const fastenRest = fastenEnde ? Math.max(0, fastenEnde - now) : 0;
  const fastenRestH = Math.floor(fastenRest / 3600000);
  const fastenRestM = Math.floor((fastenRest % 3600000) / 60000);

  const getPortionen = (rid) => einkaufsPortionen[rid] || REZEPTE[rid]?.portionenBasis || 2;

  // ═══════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", maxWidth: 480, margin: "0 auto", background: "#F8F6F2", minHeight: "100vh" }}>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${phase.farbe}, ${phase.farbe}CC)`, padding: "18px 18px 14px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.75)", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>MoreSync</p>
            <h1 style={{ margin: "2px 0 0", color: "#fff", fontSize: 20, fontWeight: 800 }}>
              {phase.icon} Tag {zyklusTag} · {phase.name}
            </h1>
          </div>
          {aktivFasten && (
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 12px", textAlign: "center" }}>
              <p style={{ margin: 0, color: "#fff", fontSize: 11 }}>⏰ Fasten</p>
              <p style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: 700 }}>{fastenRestH}h {fastenRestM}m</p>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding: "14px 14px 80px" }}>

        {/* PHASENWECHSEL-BANNER */}
        {phasenBanner && PHASEN[phasenBanner] && (
          <div style={{ background: `linear-gradient(135deg, ${PHASEN[phasenBanner].farbe}, ${PHASEN[phasenBanner].farbe}DD)`, borderRadius: 14, padding: "14px 16px", marginBottom: 14, color: "#fff", boxShadow: `0 4px 16px ${PHASEN[phasenBanner].farbe}44`, position: "relative" }}>
            <button onClick={() => setPhasenBanner(null)}
              style={{ position: "absolute", top: 10, right: 12, background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 24, height: 24, color: "#fff", cursor: "pointer", fontSize: 14, lineHeight: 1 }}>×</button>
            <div style={{ display: "flex", gap: 12, alignItems: "center", paddingRight: 24 }}>
              <span style={{ fontSize: 34 }}>{PHASEN[phasenBanner].icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: 11, opacity: 0.9, fontWeight: 600 }}>NEUE PHASE ERREICHT</p>
                <p style={{ margin: "2px 0 4px", fontSize: 16, fontWeight: 800 }}>{PHASEN[phasenBanner].name}</p>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.92, lineHeight: 1.45 }}>{PHASEN[phasenBanner].subtitle} · {PHASEN[phasenBanner].tage}</p>
              </div>
            </div>
            <button onClick={() => { setTab("zyklus"); setPhasenBanner(null); }}
              style={{ width: "100%", marginTop: 10, background: "rgba(255,255,255,0.22)", border: "none", borderRadius: 10, padding: "9px", color: "#fff", cursor: "pointer", fontSize: 12.5, fontWeight: 700 }}>
              Mehr zur Phase ansehen →
            </button>
          </div>
        )}

        {/* ──────────── HOME ──────────── */}
        {tab === "home" && (
          <div>
            {modus === "menopause" && (
              <button onClick={() => setTab("menopause")}
                style={{ width: "100%", background: "linear-gradient(135deg, #9B7BAD, #B89BC9)", border: "none", borderRadius: 14, padding: "14px 16px", marginBottom: 12, cursor: "pointer", textAlign: "left", color: "#fff", boxShadow: "0 2px 10px rgba(155,123,173,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                    <span style={{ fontSize: 26 }}>🌸</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 800 }}>Wechseljahre-Bereich</p>
                      <p style={{ margin: "1px 0 0", fontSize: 11.5, opacity: 0.92 }}>Wissen, Training & Ernährung für die Menopause</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 18, opacity: 0.8 }}>→</span>
                </div>
              </button>
            )}
            {/* Buchempfehlung-Card */}
            <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.06)", borderLeft: `4px solid ${phase.farbe}` }}>
              <p style={{ margin: "0 0 4px", fontSize: 11, color: phase.farbe, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>📖 {modus === "menopause" ? "Mond-Phase" : `Buchempfehlung · ${phase.tage}`}</p>
              <p style={{ margin: "0 0 10px", fontSize: 14, color: "#333", lineHeight: 1.6 }}>{modus === "menopause" ? (MOND_PHASEN_INFO[phase.id]?.kontext || phase.beschreibung) : phase.beschreibung}</p>
              <div style={{ background: phase.hellFarbe, borderRadius: 10, padding: "8px 12px" }}>
                <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.5 }}><strong>Heute:</strong> {modus === "menopause" ? "Orientiere dich am Mondrhythmus und an der Primal Menopausal Diet (siehe Wechseljahre-Bereich)." : phase.buchTipp}</p>
              </div>
            </div>

            {/* Stimmungs- & Wissens-Tipp des Tages (rotierend, jeden Tag anders) */}
            {PHASEN_INFO[phase.id] && (() => {
              const istMeno = modus === "menopause";
              const info = PHASEN_INFO[phase.id];
              const mondInfo = MOND_PHASEN_INFO[phase.id];

              // Tipp-Pool bauen: Stimmung + alle Wusstest-Fakten gemischt → jeden Tag ein anderer
              const pool = [];
              if (istMeno) {
                if (mondInfo?.stimmung) pool.push({ label: "💭 WIE DU DICH HEUTE FÜHLST", text: mondInfo.stimmung });
                if (mondInfo?.kontext) pool.push({ label: "🌙 DEINE MOND-PHASE", text: mondInfo.kontext });
                (mondInfo?.wusstestListe || []).forEach(f => pool.push({ label: "💡 WUSSTEST DU?", text: f }));
              } else {
                if (info.stimmung) pool.push({ label: "💭 WIE DU DICH HEUTE FÜHLST", text: info.stimmung });
                (info.wusstestListe || []).forEach(f => pool.push({ label: "💡 WUSSTEST DU?", text: f }));
              }
              if (pool.length === 0) return null;

              // Tages-Index: wechselt garantiert jeden Kalendertag (nicht nur pro Zyklustag)
              const heuteNummer = Math.floor(new Date().getTime() / 86400000);
              const aktuell = pool[heuteNummer % pool.length];
              const label = aktuell.label;
              const text = aktuell.text;
              return (
                <div style={{ background: `linear-gradient(135deg, ${phase.farbe}, ${phase.farbe}DD)`, borderRadius: 14, padding: "14px 16px", marginBottom: 12, color: "#fff", boxShadow: `0 2px 10px ${phase.farbe}33` }}>
                  <p style={{ margin: "0 0 5px", fontSize: 11, fontWeight: 700, opacity: 0.9, letterSpacing: 0.3 }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>{text}</p>
                  <button onClick={() => setTab("zyklus")}
                    style={{ marginTop: 10, background: "rgba(255,255,255,0.22)", border: "none", borderRadius: 8, padding: "7px 12px", color: "#fff", cursor: "pointer", fontSize: 11.5, fontWeight: 600 }}>
                    Mehr über deine Phase →
                  </button>
                </div>
              );
            })()}

            {/* Hormone — im Zyklus-Modus die Kurve, im Menopausen-Modus ein Hinweis */}
            {modus !== "menopause" ? (
              <div style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#333" }}>📊 Hormonspiegel heute</p>
                {Object.entries(phase.hormoneLevel).map(([name, val]) => (
                  <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ width: 90, fontSize: 12, color: "#666" }}>{name}</span>
                    <div style={{ flex: 1, height: 7, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ width: `${val}%`, height: "100%", background: `linear-gradient(90deg, ${phase.farbe}88, ${phase.farbe})`, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#999", width: 32 }}>{val}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700, color: "#333" }}>🌙 Dein Rhythmus</p>
                <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.6 }}>In den Wechseljahren schwanken die Hormone nicht mehr im Monatszyklus. Der Mondrhythmus gibt dir stattdessen eine sanfte Struktur für Ernährung, Fasten und Training — ohne starre Hormonkurve.</p>
              </div>
            )}

            {/* Tagesplan */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 14, marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>🗓️ Mein Tagesplan</p>
                <button onClick={() => setTab("rezepte")} style={{ background: "none", border: "none", color: phase.farbe, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+ Rezept</button>
              </div>
              {["Frühstück","Mittagessen","Abendessen","Snack"].map(slot => {
                const key = `${zyklusTag}-${slot}`;
                const rid = tagesplan[key];
                const r = rid ? REZEPTE[rid] : null;
                return (
                  <div key={slot} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f5f5f5" }}>
                    <span style={{ width: 90, fontSize: 12, color: "#888" }}>{slot}</span>
                    {r ? (
                      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#333" }} onClick={() => setOffenRezept(r)}>{r.name}</span>
                        <button onClick={() => rezeptInTagesplanToggle(rid, slot)} style={{ background: "none", border: "none", fontSize: 16, cursor: "pointer", color: "#ccc" }}>✕</button>
                      </div>
                    ) : (
                      <button onClick={() => setTab("rezepte")} style={{ background: phase.hellFarbe, border: `1px dashed ${phase.farbe}66`, borderRadius: 8, padding: "4px 12px", cursor: "pointer", color: phase.farbe, fontSize: 12 }}>Auswählen</button>
                    )}
                  </div>
                );
              })}
              {Object.values(["Frühstück","Mittagessen","Abendessen","Snack"]).some(s => tagesplan[`${zyklusTag}-${s}`]) && (
                <button onClick={() => {
                  const ids = ["Frühstück","Mittagessen","Abendessen","Snack"].map(s => tagesplan[`${zyklusTag}-${s}`]).filter(Boolean);
                  const portMap = {};
                  ids.forEach(id => { portMap[id] = REZEPTE[id]?.portionenBasis || 2; });
                  setEinkaufsliste(konsolidierteEinkaufsliste(ids, portMap));
                  setErledigtItems({});
                  setTab("einkauf_anzeige");
                }} style={{ width: "100%", marginTop: 10, background: phase.farbe, color: "#fff", border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
                  🛒 Einkaufsliste für heute erstellen
                </button>
              )}
            </div>

            {/* Blutzucker-Tipp des Tages (rotierend) */}
            {(() => {
              const tippIndex = (zyklusTag - 1) % GLUKOSE_HACKS.length;
              const tipp = GLUKOSE_HACKS[tippIndex];
              return (
                <button onClick={() => setTab("glukose")}
                  style={{ width: "100%", background: "linear-gradient(135deg, #C2185B, #E91E63)", border: "none", borderRadius: 14, padding: "13px 15px", marginBottom: 12, cursor: "pointer", textAlign: "left", color: "#fff", boxShadow: "0 2px 10px rgba(233,30,99,0.25)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>🩸 BLUTZUCKER-TIPP</span>
                    <span style={{ fontSize: 11, opacity: 0.8 }}>Alle 10 →</span>
                  </div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 26 }}>{tipp.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>{tipp.titel}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 11.5, opacity: 0.92, lineHeight: 1.45 }}>{tipp.kurz}</p>
                    </div>
                  </div>
                </button>
              );
            })()}

            {/* Wasser-Mini-Tracker */}
            {(() => {
              const wasser = wasserLog[heuteKey] || 0;
              return (
                <div style={{ background: "#fff", borderRadius: 14, padding: "13px 15px", marginBottom: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#333" }}>💧 Wasser heute</span>
                    <span style={{ fontSize: 12, color: "#2196F3", fontWeight: 700 }}>{wasser}/8 Gläser</span>
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <button key={n} onClick={() => setWasser(heuteKey, wasser >= n ? n - 1 : n)}
                        style={{ flex: 1, height: 30, borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, background: wasser >= n ? "#E3F2FD" : "#f4f4f4" }}>
                        {wasser >= n ? "💧" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Rezepte heute - kuratiert: Snack + 2 Hauptmahlzeiten */}
            {(() => {
              const { snack, hauptmahlzeiten } = getHauptseiteEmpfehlungen(phase.id);
              return (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>🥗 Heute empfohlen</p>
                    <button onClick={() => setTab("rezepte")} style={{ background: "none", border: "none", color: phase.farbe, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Alle →</button>
                  </div>
                  {/* Hauptmahlzeiten */}
                  {hauptmahlzeiten.map((r, i) => (
                    <div key={r.id}>
                      <p style={{ margin: "0 0 4px", fontSize: 11, color: "#aaa", fontWeight: 600 }}>
                        {i === 0 ? "🍽️ HAUPTMAHLZEIT 1" : "🍽️ HAUPTMAHLZEIT 2"}
                      </p>
                      <RezeptKarte r={r} phase={phase} onClick={() => setOffenRezept(r)}
                        tagesplanSlots={["Frühstück","Mittagessen","Abendessen","Snack"]}
                        tagesplan={tagesplan} zyklusTag={zyklusTag}
                        onAddToTagesplan={slot => rezeptInTagesplanToggle(r.id, slot)} />
                    </div>
                  ))}
                  {/* Fasting Snack */}
                  {snack && (
                    <div>
                      <p style={{ margin: "4px 0 2px", fontSize: 11, color: "#aaa", fontWeight: 600 }}>🌙 FASTING SNACK</p>
                      <p style={{ margin: "0 0 6px", fontSize: 10.5, color: "#bbb", lineHeight: 1.4 }}>Kalorienarm — unterbricht dein Fasten kaum, falls du etwas Kleines brauchst.</p>
                      <RezeptKarte r={snack} phase={phase} onClick={() => setOffenRezept(snack)}
                        tagesplanSlots={["Frühstück","Mittagessen","Abendessen","Snack"]}
                        tagesplan={tagesplan} zyklusTag={zyklusTag}
                        onAddToTagesplan={slot => rezeptInTagesplanToggle(snack.id, slot)} />
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Fasten */}
            {!aktivFasten ? (
              <div style={{ background: "#fff", borderRadius: 14, padding: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700 }}>⏰ Fasten starten</p>
                {empfohleneFasten.slice(0, 3).map(f => (
                  <button key={f.id} onClick={() => fastenStarten(f)} style={{ width: "100%", background: phase.hellFarbe, border: `1px solid ${phase.farbe}33`, borderRadius: 10, padding: "10px 14px", marginBottom: 6, cursor: "pointer", textAlign: "left", display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 22 }}>{f.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{f.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#888" }}>{f.beschreibung}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: `2px solid ${phase.farbe}` }}>
                <p style={{ margin: "0 0 4px", fontSize: 11, color: "#888" }}>Aktives Fasten</p>
                <p style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 800 }}>{aktivFasten.icon} {aktivFasten.name}</p>
                <div style={{ background: "#f0f0f0", borderRadius: 6, height: 10, marginBottom: 8 }}>
                  <div style={{ width: `${fastenFortschritt}%`, height: "100%", background: `linear-gradient(90deg, ${phase.farbe}, #C4845A)`, borderRadius: 6 }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 12 }}>
                  <span>Verstrichen: {((now - fastenStart) / 3600000).toFixed(1)}h</span>
                  <span>Noch: {fastenRestH}h {fastenRestM}min</span>
                </div>
                <button onClick={fastenBeenden} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>✅ Fasten beenden & speichern</button>
              </div>
            )}
          </div>
        )}

        {/* ──────────── ZYKLUS ──────────── */}
        {tab === "zyklus" && (
          <div>
            {modus === "menopause" && (
              <div style={{ background: "linear-gradient(135deg, #9B7BAD, #B89BC9)", borderRadius: 14, padding: "14px 16px", marginBottom: 14, color: "#fff" }}>
                <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 800 }}>🌙 Wechseljahre-Modus aktiv</p>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.92, lineHeight: 1.5 }}>Deine Phasen richten sich nach dem Mondzyklus (Neumond = Tag 1). Den Neumond-Start änderst du in den Einstellungen (☰ Mehr).</p>
              </div>
            )}
            <div style={{ background: "#fff", borderRadius: 16, padding: 18, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>📅 {modus === "menopause" ? "Mondzyklus-Einstellungen" : "Zykluseinstellungen"}</p>

              {/* Automatik-Hinweis */}
              <div style={{ background: phase.hellFarbe, borderRadius: 10, padding: "10px 12px", marginBottom: 14, border: `1px solid ${phase.farbe}22` }}>
                <p style={{ margin: 0, fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>
                  ✨ Die App zählt automatisch jeden Tag weiter und erkennt deine Phasen von selbst. Du musst nichts manuell umstellen.
                </p>
              </div>

              {/* Periodenbeginn — nur im Zyklus-Modus */}
              {modus !== "menopause" && <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Beginn der letzten Periode</label>
                <input type="date" max={new Date().toISOString().split("T")[0]}
                  value={periodenStart ? datumKey(periodenStart) : ""}
                  onChange={e => { if (e.target.value) setPeriodenStartDatum(new Date(e.target.value + "T12:00:00").toISOString()); }}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", fontSize: 14, boxSizing: "border-box" }} />
              </div>

              {/* Neue Periode begonnen */}
              <button onClick={() => setPeriodeBestaetigen(true)}
                style={{ width: "100%", background: "#E91E63", color: "#fff", border: "none", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 13, fontWeight: 700, marginBottom: periodeBestaetigen ? 8 : 14 }}>
                🩸 Meine Periode hat heute begonnen
              </button>
              {periodeBestaetigen && (
                <div style={{ background: "#FCE4EC", borderRadius: 10, padding: "10px 12px", marginBottom: 14, border: "1px solid #F8BBD0" }}>
                  <p style={{ margin: "0 0 8px", fontSize: 12, color: "#880E4F", lineHeight: 1.5 }}>Zyklus neu starten? Tag 1 wird auf heute gesetzt.</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => { setPeriodenStartDatum(new Date().toISOString()); setPeriodeBestaetigen(false); }}
                      style={{ flex: 1, background: "#E91E63", color: "#fff", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Ja, neu starten</button>
                    <button onClick={() => setPeriodeBestaetigen(false)}
                      style={{ flex: 1, background: "#f0f0f0", color: "#666", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 12 }}>Abbrechen</button>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Zykluslänge: <strong>{zyklusLaenge} Tage</strong></label>
                <input type="range" min={21} max={35} value={zyklusLaenge} onChange={e => setZyklusLaengeS(parseInt(e.target.value))} style={{ width: "100%", accentColor: phase.farbe }} />
              </div>
              </>}

              {/* Mondzyklus-Hinweis im Menopausen-Modus */}
              {modus === "menopause" && (
                <div style={{ background: "#F3EEF7", borderRadius: 10, padding: "10px 12px", marginBottom: 14, border: "1px solid #E1BEE7" }}>
                  <p style={{ margin: 0, fontSize: 12, color: "#9B7BAD", lineHeight: 1.55 }}>🌙 Dein Rhythmus folgt dem Mondzyklus (30 Tage, Neumond = Tag 1). Den Neumond-Start passt du in den Einstellungen an (☰ Mehr → ⚙️).</p>
                </div>
              )}

              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6 }}>Heute ist {modus === "menopause" ? "Mond-Tag" : "Zyklustag"}: <strong>{zyklusTag}</strong> <span style={{ color: "#bbb", fontWeight: 400 }}>(manuell korrigieren)</span></label>
                <input type="range" min={1} max={modus === "menopause" ? 30 : zyklusLaenge} value={zyklusTag} onChange={e => setZyklusTagS(parseInt(e.target.value))} style={{ width: "100%", accentColor: phase.farbe }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setZyklusTagS(zyklusTag - 1)} style={{ flex: 1, background: "#f0f0f0", border: "none", borderRadius: 10, padding: 10, cursor: "pointer", fontSize: 13 }}>◀ Zurück</button>
                <button onClick={() => setZyklusTagS(zyklusTag + 1)} style={{ flex: 1, background: phase.farbe, color: "#fff", border: "none", borderRadius: 10, padding: 10, cursor: "pointer", fontSize: 13 }}>Vor ▶</button>
              </div>
            </div>

            {/* KALENDER */}
            <ZyklusKalender
              periodenStart={modus === "menopause" ? mondStart : periodenStart}
              periodenHistorie={periodenHistorie}
              zyklusLaenge={modus === "menopause" ? 30 : zyklusLaenge}
              zyklusTag={zyklusTag}
              modus={modus}
              onTagKlick={(datum) => {
                const heuteD = new Date(); heuteD.setHours(0,0,0,0);
                if (datum > heuteD) return; // keine Zukunft
                if (modus === "menopause") {
                  setMondStartDatum(datum.toISOString());
                } else {
                  setPeriodenStartDatum(datum.toISOString());
                }
              }}
            />

            {/* PERIODEN-HISTORIE */}
            {modus !== "menopause" && periodenHistorie.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>🩸 Perioden-Verlauf</p>
                {[...periodenHistorie].reverse().map((startISO, idx, arr) => {
                  const datum = new Date(startISO);
                  const naechster = arr[idx - 1]; // weil reversed
                  let abstand = null;
                  if (naechster) abstand = Math.round((new Date(naechster) - datum) / 86400000);
                  return (
                    <div key={startISO} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: idx < arr.length - 1 ? "1px solid #f3f3f3" : "none" }}>
                      <div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#333" }}>{datum.toLocaleDateString("de-AT", { day: "2-digit", month: "long", year: "numeric" })}</p>
                        {abstand && <p style={{ margin: "2px 0 0", fontSize: 11, color: "#999" }}>Zyklus war {abstand} Tage lang</p>}
                      </div>
                      <button onClick={() => loeschePeriodenEintrag(startISO)} style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: 16, padding: 4 }}>🗑</button>
                    </div>
                  );
                })}
                {periodenHistorie.length >= 2 && (
                  <div style={{ background: phase.hellFarbe, borderRadius: 10, padding: "10px 12px", marginTop: 10 }}>
                    <p style={{ margin: 0, fontSize: 12, color: phase.farbe, fontWeight: 600 }}>
                      ⌀ Deine durchschnittliche Zykluslänge: {zyklusLaenge} Tage
                    </p>
                    <p style={{ margin: "3px 0 0", fontSize: 10.5, color: "#999", lineHeight: 1.4 }}>
                      Wird automatisch aus deinen letzten Zyklen berechnet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Alle Phasen */}
            {Object.values(PHASEN).map(p => (
              <PhasenKarte key={p.id} p={p} aktiv={p.id === phase.id} zyklusTag={zyklusTag} modus={modus} />
            ))}
          </div>
        )}


        {/* ──────────── FASTEN ──────────── */}
        {tab === "fasten" && (
          <FastenTab phase={phase} zyklusTag={zyklusTag}
            aktivFasten={aktivFasten} fastenStart={fastenStart} fastenEnde={fastenEnde}
            now={now} fastenLogs={fastenLogs}
            onStart={fastenStarten} onBeenden={fastenBeenden} />
        )}

        {/* ──────────── TRAINING ──────────── */}
        {tab === "training" && (
          modus === "menopause"
            ? <MenopauseTrainingTab phase={phase} />
            : <TrainingTab phase={phase} zyklusTag={zyklusTag} />
        )}

        {/* ──────────── GLUKOSE ──────────── */}
        {tab === "glukose" && (
          <GlukoseTab phase={phase} modus={modus} />
        )}

        {/* ──────────── TAGEBUCH ──────────── */}
        {tab === "tagebuch" && (
          <TagebuchTab phase={phase} zyklusTag={zyklusTag} tagebuch={tagebuch}
            heuteKey={heuteKey} wasserLog={wasserLog}
            onSetEintrag={setTagebuchEintrag} onToggleSymptom={toggleSymptom} onSetWasser={setWasser} />
        )}

        {/* ──────────── EINSTELLUNGEN ──────────── */}
        {tab === "einstellungen" && (
          <EinstellungenTab phase={phase} modus={modus} onModusWechseln={modusWechseln}
            mondStart={mondStart} onSetMondStart={setMondStartDatum}
            onExport={datenExportieren} onImport={datenImportieren} onOnboarding={() => { setOnboardingOffen(true); setOnboardingSchritt(0); }} />
        )}

        {/* ──────────── REZEPTE ──────────── */}
        {tab === "rezepte" && (
          <div>
            {modus === "menopause" && (
              <div style={{ background: primalNur ? "linear-gradient(135deg, #9B7BAD, #B89BC9)" : "#fff", borderRadius: 12, padding: "12px 14px", marginBottom: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: primalNur ? "none" : "1px solid #E1BEE7" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: primalNur ? "#fff" : "#9B7BAD" }}>🌸 Nur Primal Menopausal Diet</p>
                    <p style={{ margin: "2px 0 0", fontSize: 11, color: primalNur ? "rgba(255,255,255,0.9)" : "#999", lineHeight: 1.4 }}>Zeigt nur Rezepte, die zur menopause-gerechten Ernährung passen (viel Fett, moderates Protein, wenig Kohlenhydrate).</p>
                  </div>
                  <button onClick={() => setPrimalNur(!primalNur)}
                    style={{ marginLeft: 12, width: 48, height: 28, borderRadius: 14, border: "none", cursor: "pointer", background: primalNur ? "rgba(255,255,255,0.4)" : "#ddd", position: "relative", flexShrink: 0 }}>
                    <span style={{ position: "absolute", top: 3, left: primalNur ? 23 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
                  </button>
                </div>
              </div>
            )}
            <input type="text" placeholder="🔍 Rezept suchen…" value={filter.suche} onChange={e => setFilter(f => ({ ...f, suche: e.target.value }))}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1px solid #e0e0e0", fontSize: 14, background: "#fff", boxSizing: "border-box", marginBottom: 10 }} />

            <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 6, marginBottom: 6 }}>
              {[["alle","Alle Phasen"], ...Object.values(PHASEN).map(p => [p.id, `${p.icon} ${p.name.split(" ")[0]}`])].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(f => ({ ...f, phase: val }))} style={{ background: filter.phase === val ? (val === "alle" ? "#333" : PHASEN[val]?.farbe || "#333") : "#fff", color: filter.phase === val ? "#fff" : "#444", border: `1px solid ${filter.phase === val ? "transparent" : "#ddd"}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>{label}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 5, overflowX: "auto", paddingBottom: 6, marginBottom: 12 }}>
              {[["alle","Alle"],["ketobiotic","Keto"],["hormone_feasting","HF"],["vegan","🌱"],["vegetarisch","🥚"],["omnivor","🥩"],["gf","GF"]].map(([val, label]) => (
                <button key={val} onClick={() => setFilter(f => ({ ...f, stil: val }))} style={{ background: filter.stil === val ? phase.farbe : "#fff", color: filter.stil === val ? "#fff" : "#444", border: `1px solid ${filter.stil === val ? "transparent" : "#ddd"}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", fontSize: 11, whiteSpace: "nowrap" }}>{label}</button>
              ))}
            </div>

            <p style={{ margin: "0 0 10px", color: "#aaa", fontSize: 12 }}>{gefiltert.length} Rezepte</p>

            {/* Gruppiert nach Kategorie */}
            {Object.entries(KATEGORIE_NAMEN).map(([kat, katName]) => {
              const items = gefiltert.filter(r => r.kategorie === kat);
              if (items.length === 0) return null;
              return (
                <div key={kat} style={{ marginBottom: 16 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 700, color: "#555" }}>{katName}</p>
                  {KATEGORIE_INFO[kat] && <p style={{ margin: "0 0 10px", fontSize: 11, color: "#999", lineHeight: 1.5 }}>{KATEGORIE_INFO[kat]}</p>}
                  {items.map(r => (
                    <RezeptKarte key={r.id} r={r} phase={phase} onClick={() => setOffenRezept(r)}
                      tagesplanSlots={["Frühstück","Mittagessen","Abendessen","Snack"]}
                      tagesplan={tagesplan} zyklusTag={zyklusTag}
                      onAddToTagesplan={slot => rezeptInTagesplanToggle(r.id, slot)} />
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ──────────── EINKAUFSLISTE ──────────── */}
        {tab === "einkauf" && (
          <div>
            <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>🛒 Einkaufsliste erstellen</p>

            {/* Modus-Auswahl */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[["tag","📅 Für heute"],["phase","🌙 Für Phase"],["manuell","✏️ Manuell"]].map(([m, l]) => (
                <button key={m} onClick={() => setEinkaufsModus(m)} style={{ flex: 1, background: einkaufsModus === m ? phase.farbe : "#fff", color: einkaufsModus === m ? "#fff" : "#444", border: `1px solid ${einkaufsModus === m ? "transparent" : "#ddd"}`, borderRadius: 10, padding: "8px 4px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>{l}</button>
              ))}
            </div>

            {einkaufsModus === "tag" && (
              <div>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>Wähle Rezepte für Tag {zyklusTag} ({phase.name}):</p>
                {getRezepteFuerPhase(phase.id).map(r => (
                  <div key={r.id} style={{ background: "#fff", borderRadius: 12, padding: "10px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
                    <input type="checkbox" checked={!!einkaufsAuswahl[r.id]} onChange={() => setEinkaufsAuswahl(a => ({ ...a, [r.id]: !a[r.id] }))} style={{ width: 18, height: 18, accentColor: phase.farbe }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{r.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>S. {r.buchSeite} · {formatZeit(r.zeit)}</p>
                    </div>
                    {einkaufsAuswahl[r.id] && (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <button onClick={() => setEinkaufsPortionen(p => ({ ...p, [r.id]: Math.max(1, getPortionen(r.id) - 1) }))} style={{ background: "#eee", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer" }}>−</button>
                        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{getPortionen(r.id)}</span>
                        <button onClick={() => setEinkaufsPortionen(p => ({ ...p, [r.id]: getPortionen(r.id) + 1 }))} style={{ background: "#eee", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer" }}>+</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {einkaufsModus === "phase" && (
              <div>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>Einkaufsliste für eine ganze Phase erstellen:</p>
                {Object.values(PHASEN).map(p => (
                  <button key={p.id} onClick={() => einkaufslisteAusPhaseBauen(p.id)} style={{ width: "100%", background: "#fff", border: `1px solid ${p.farbe}44`, borderRadius: 12, padding: "12px 16px", marginBottom: 8, cursor: "pointer", textAlign: "left", display: "flex", gap: 12, alignItems: "center", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    <span style={{ fontSize: 26 }}>{p.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: p.farbe }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#aaa" }}>{p.tage} · {getRezepteFuerPhase(p.id).length} Rezepte</p>
                    </div>
                    <span style={{ marginLeft: "auto", color: p.farbe, fontSize: 18 }}>→</span>
                  </button>
                ))}
              </div>
            )}

            {einkaufsModus === "manuell" && (
              <div>
                <p style={{ fontSize: 13, color: "#666", marginBottom: 10 }}>Alle Rezepte — wähle beliebig aus:</p>
                {Object.entries(KATEGORIE_NAMEN).map(([kat, katName]) => {
                  const items = Object.values(REZEPTE).filter(r => r.kategorie === kat);
                  if (!items.length) return null;
                  return (
                    <div key={kat} style={{ marginBottom: 12 }}>
                      <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: "#888" }}>{katName}</p>
                      {items.map(r => (
                        <div key={r.id} style={{ background: "#fff", borderRadius: 10, padding: "8px 12px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
                          <input type="checkbox" checked={!!einkaufsAuswahl[r.id]} onChange={() => setEinkaufsAuswahl(a => ({ ...a, [r.id]: !a[r.id] }))} style={{ width: 16, height: 16, accentColor: phase.farbe }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>{r.name}</p>
                            <p style={{ margin: 0, fontSize: 10, color: "#aaa" }}>{r.buchSeite}</p>
                          </div>
                          {einkaufsAuswahl[r.id] && (
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <button onClick={() => setEinkaufsPortionen(p => ({ ...p, [r.id]: Math.max(1, getPortionen(r.id) - 1) }))} style={{ background: "#eee", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 14 }}>−</button>
                              <span style={{ fontSize: 12, fontWeight: 700 }}>{getPortionen(r.id)}</span>
                              <button onClick={() => setEinkaufsPortionen(p => ({ ...p, [r.id]: getPortionen(r.id) + 1 }))} style={{ background: "#eee", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", fontSize: 14 }}>+</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}

            {(einkaufsModus === "tag" || einkaufsModus === "manuell") && Object.values(einkaufsAuswahl).some(Boolean) && (
              <button onClick={einkaufslisteBauen} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", fontSize: 15, fontWeight: 800, marginTop: 10 }}>
                🛒 {Object.values(einkaufsAuswahl).filter(Boolean).length} Rezepte → Liste erstellen
              </button>
            )}
          </div>
        )}

        {/* ──────────── EINKAUFSLISTE ANZEIGE ──────────── */}
        {tab === "einkauf_anzeige" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>🛒 Einkaufsliste</p>
              <button onClick={() => setTab("einkauf")} style={{ background: "none", border: "none", color: phase.farbe, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>← Neu erstellen</button>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 12, color: "#aaa" }}>{einkaufsliste.filter(i => !erledigtItems[i.name]).length} von {einkaufsliste.length} übrig</p>
            {einkaufsliste.map(item => {
              const erledigt = !!erledigtItems[item.name];
              const menge = Number.isInteger(item.menge) ? item.menge : item.menge.toFixed(1);
              return (
                <div key={item.name} onClick={() => setErledigtItems(e => ({ ...e, [item.name]: !e[item.name] }))}
                  style={{ background: erledigt ? "#f9f9f9" : "#fff", borderRadius: 10, padding: "11px 14px", marginBottom: 6, display: "flex", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 1px 5px rgba(0,0,0,0.05)", opacity: erledigt ? 0.5 : 1 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: erledigt ? phase.farbe : "#fff", border: `2px solid ${erledigt ? phase.farbe : "#ddd"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {erledigt && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
                  </div>
                  <span style={{ flex: 1, fontSize: 14, textDecoration: erledigt ? "line-through" : "none", color: "#333" }}>{item.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: phase.farbe }}>{menge} {item.einheit}</span>
                </div>
              );
            })}
            <button onClick={() => setErledigtItems({})} style={{ width: "100%", background: "#f5f5f5", border: "none", borderRadius: 10, padding: "11px", cursor: "pointer", fontSize: 13, color: "#888", marginTop: 10 }}>↺ Alle zurücksetzen</button>
          </div>
        )}

        {/* ──────────── MENOPAUSE ──────────── */}
        {tab === "menopause" && (
          <MenopauseTab phase={phase} />
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #eee", display: "flex", zIndex: 200, boxShadow: "0 -2px 16px rgba(0,0,0,0.08)" }}>
        {[
          ["home","🏠","Heute"],
          ["zyklus","🌙","Zyklus"],
          ["fasten","⏰","Fasten"],
          ["training","💪","Training"],
          ["tagebuch","📔","Tagebuch"],
        ].map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: "none", border: "none", padding: "9px 0 7px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <span style={{ fontSize: 8.5, color: tab === id ? phase.farbe : "#bbb", fontWeight: tab === id ? 700 : 400 }}>{label}</span>
            {tab === id && <div style={{ width: 18, height: 2, background: phase.farbe, borderRadius: 1 }} />}
          </button>
        ))}
        {/* Mehr-Button */}
        <button onClick={() => setMehrOffen(true)} style={{ flex: 1, background: "none", border: "none", padding: "9px 0 7px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ fontSize: 16 }}>☰</span>
          <span style={{ fontSize: 8.5, color: ["rezepte","einkauf","einkauf_anzeige","glukose","einstellungen","menopause"].includes(tab) ? phase.farbe : "#bbb", fontWeight: ["rezepte","einkauf","einkauf_anzeige","glukose","einstellungen","menopause"].includes(tab) ? 700 : 400 }}>Mehr</span>
          {["rezepte","einkauf","einkauf_anzeige","glukose","einstellungen","menopause"].includes(tab) && <div style={{ width: 18, height: 2, background: phase.farbe, borderRadius: 1 }} />}
        </button>
      </div>

      {/* MEHR-MENÜ */}
      {mehrOffen && (
        <div onClick={() => setMehrOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 250, display: "flex", alignItems: "flex-end" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", padding: "20px 18px 30px", width: "100%", maxWidth: 480, margin: "0 auto", boxShadow: "0 -4px 24px rgba(0,0,0,0.15)" }}>
            <div style={{ width: 40, height: 4, background: "#ddd", borderRadius: 2, margin: "0 auto 16px" }} />
            <p style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: "#333" }}>Mehr</p>
            {[
              ...(modus === "menopause" ? [["menopause","🌸","Wechseljahre","Wissen & Training für die Menopause"]] : []),
              ["rezepte","🥗","Rezepte","Alle Rezepte für deine Phase"],
              ["einkauf","🛒","Einkaufsliste","Zutaten planen & einkaufen"],
              ["glukose","🩸","Blutzucker-Hacks","10 Tipps für stabilen Blutzucker"],
              ["einstellungen","⚙️","Einstellungen","Modus, Backup & mehr"],
            ].map(([id, icon, label, sub]) => (
              <button key={id} onClick={() => { setTab(id); setMehrOffen(false); }}
                style={{ width: "100%", background: tab === id ? phase.hellFarbe : "#f8f8f8", border: "none", borderRadius: 12, padding: "13px 15px", marginBottom: 8, cursor: "pointer", textAlign: "left", display: "flex", gap: 13, alignItems: "center" }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#222" }}>{label}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 11.5, color: "#888" }}>{sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* REZEPT MODAL */}
      {offenRezept && (
        <RezeptModal r={offenRezept} phase={phase} portionen={portionen[offenRezept.id] || offenRezept.portionenBasis}
          setPortionen={p => setPortionen(prev => ({ ...prev, [offenRezept.id]: p }))}
          onClose={() => setOffenRezept(null)}
          onLog={() => rezeptLoggen(offenRezept.id)}
          tagesplanSlots={["Frühstück","Mittagessen","Abendessen","Snack"]}
          tagesplan={tagesplan} zyklusTag={zyklusTag}
          onAddToTagesplan={slot => { rezeptInTagesplanToggle(offenRezept.id, slot); setOffenRezept(null); }} />
      )}

      {/* ONBOARDING / EINFÜHRUNG */}
      {onboardingOffen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: "24px 22px", maxWidth: 400, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", maxHeight: "85vh", overflowY: "auto" }}>
            {onboardingSchritt === 0 && (
              <>
                <p style={{ margin: "0 0 8px", fontSize: 32, textAlign: "center" }}>🌸</p>
                <h2 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 800, textAlign: "center", color: "#333" }}>Willkommen bei MoreSync</h2>
                <p style={{ margin: "0 0 18px", fontSize: 13.5, color: "#666", textAlign: "center", lineHeight: 1.6 }}>
                  Diese App hilft dir, dein Essen, Fasten, Training und deinen Lifestyle an deinen weiblichen Zyklus anzupassen — nach den Büchern von Dr. Mindy Pelz, Stacy Sims und Jessie Inchauspé.
                </p>
                <button onClick={() => setOnboardingSchritt(1)} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 12, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Los geht's →</button>
              </>
            )}
            {onboardingSchritt === 1 && (
              <>
                <p style={{ margin: "0 0 8px", fontSize: 28, textAlign: "center" }}>🌙</p>
                <h2 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, textAlign: "center", color: "#333" }}>Die 4 Phasen deines Zyklus</h2>
                <div style={{ marginBottom: 16 }}>
                  {Object.values(PHASEN).map(p => (
                    <div key={p.id} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8, background: p.hellFarbe, borderRadius: 10, padding: "8px 12px" }}>
                      <span style={{ fontSize: 20 }}>{p.icon}</span>
                      <div>
                        <p style={{ margin: 0, fontSize: 12.5, fontWeight: 700, color: p.farbe }}>{p.name} <span style={{ color: "#aaa", fontWeight: 400 }}>· {p.tage}</span></p>
                        <p style={{ margin: 0, fontSize: 11, color: "#777" }}>{p.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ margin: "0 0 16px", fontSize: 12, color: "#888", lineHeight: 1.55, textAlign: "center" }}>
                  Jede Phase hat eigene Bedürfnisse beim Essen, Fasten und Training. Die App zeigt dir automatisch, wo du gerade bist.
                </p>
                <button onClick={() => setOnboardingSchritt(2)} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 12, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Weiter →</button>
              </>
            )}
            {onboardingSchritt === 2 && (
              <>
                <p style={{ margin: "0 0 8px", fontSize: 28, textAlign: "center" }}>📅</p>
                <h2 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 800, textAlign: "center", color: "#333" }}>Wie trackst du?</h2>
                <p style={{ margin: "0 0 16px", fontSize: 13, color: "#666", textAlign: "center", lineHeight: 1.55 }}>
                  Hast du einen regelmäßigen Zyklus, oder bist du in den Wechseljahren?
                </p>
                <button onClick={() => setOnboardingSchritt(3)}
                  style={{ width: "100%", background: phase.hellFarbe, border: `2px solid ${phase.farbe}`, borderRadius: 12, padding: "14px", cursor: "pointer", marginBottom: 10, textAlign: "left" }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: phase.farbe }}>🩸 Ich habe einen Zyklus</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#777" }}>Tracking nach deiner Periode</p>
                </button>
                <button onClick={() => { modusWechseln("menopause"); setOnboardingSchritt(4); }}
                  style={{ width: "100%", background: "#f4f4f4", border: "2px solid transparent", borderRadius: 12, padding: "14px", cursor: "pointer", textAlign: "left" }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#9B7BAD" }}>🌙 Wechseljahre / kein Zyklus</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#777" }}>Tracking nach dem Mondzyklus</p>
                </button>
              </>
            )}
            {onboardingSchritt === 3 && (
              <>
                <p style={{ margin: "0 0 8px", fontSize: 28, textAlign: "center" }}>🩸</p>
                <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, textAlign: "center", color: "#333" }}>Wann war deine letzte Periode?</h2>
                <p style={{ margin: "0 0 16px", fontSize: 13, color: "#666", textAlign: "center", lineHeight: 1.55 }}>
                  Damit berechnet die App deine aktuelle Phase und zählt automatisch weiter.
                </p>
                <input type="date" max={new Date().toISOString().split("T")[0]}
                  onChange={e => { if (e.target.value) { setPeriodenStartDatum(new Date(e.target.value + "T12:00:00").toISOString()); setOnboardingOffen(false); } }}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: `2px solid ${phase.farbe}`, fontSize: 15, boxSizing: "border-box", marginBottom: 12, textAlign: "center" }} />
                <button onClick={() => { setPeriodenStartDatum(new Date().toISOString()); setOnboardingOffen(false); }}
                  style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 12, padding: "13px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                  Meine Periode hat heute begonnen
                </button>
              </>
            )}
            {onboardingSchritt === 4 && (
              <>
                <p style={{ margin: "0 0 8px", fontSize: 28, textAlign: "center" }}>🌙</p>
                <h2 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, textAlign: "center", color: "#333" }}>Wann war der letzte Neumond?</h2>
                <p style={{ margin: "0 0 16px", fontSize: 13, color: "#666", textAlign: "center", lineHeight: 1.55 }}>
                  In den Wechseljahren orientiert sich Dr. Pelz am Mondzyklus — der Neumond ist dein "Tag 1".
                </p>
                <input type="date" max={new Date().toISOString().split("T")[0]}
                  onChange={e => { if (e.target.value) { setMondStartDatum(new Date(e.target.value + "T12:00:00").toISOString()); setOnboardingOffen(false); } }}
                  style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "2px solid #9B7BAD", fontSize: 15, boxSizing: "border-box", marginBottom: 12, textAlign: "center" }} />
                <p style={{ margin: 0, fontSize: 11, color: "#aaa", textAlign: "center", lineHeight: 1.4 }}>Den Mondkalender findest du online. Du kannst das später in den Einstellungen ändern.</p>
              </>
            )}
            {onboardingSchritt < 3 && (
              <button onClick={() => setOnboardingOffen(false)} style={{ width: "100%", background: "none", color: "#aaa", border: "none", padding: "10px", cursor: "pointer", fontSize: 12, marginTop: 8 }}>Überspringen</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PhasenKarte({ p, aktiv, zyklusTag, modus }) {
  const [detailsOffen, setDetailsOffen] = useState(aktiv);
  const info = PHASEN_INFO[p.id];

  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 16, marginBottom: 10, border: aktiv ? `2px solid ${p.farbe}` : "1px solid #f0f0f0", boxShadow: aktiv ? `0 4px 16px ${p.farbe}25` : "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 28 }}>{p.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: p.farbe }}>{p.name}</p>
            <span style={{ fontSize: 11, color: "#aaa" }}>{p.tage}</span>
          </div>
          <p style={{ margin: "2px 0 4px", fontSize: 12, color: "#888" }}>{p.subtitle}</p>
          {modus !== "menopause" && p.simsPhase && <p style={{ margin: "0 0 6px", fontSize: 11, background: "#F5F5F5", borderRadius: 6, padding: "3px 8px", display: "inline-block", color: "#555" }}>{p.simsPhase}</p>}
          <p style={{ margin: "0 0 8px", fontSize: 13, color: "#555", lineHeight: 1.6 }}>{modus === "menopause" ? (MOND_PHASEN_INFO[p.id]?.kontext || p.beschreibung) : p.beschreibung}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {p.naehrstoffe.map(n => <span key={n} style={{ fontSize: 10, background: p.hellFarbe, color: p.farbe, padding: "2px 7px", borderRadius: 10 }}>{n}</span>)}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
        {p.lebensmittelFokus.map(l => <span key={l} style={{ fontSize: 10, background: p.hellFarbe, color: p.farbe, padding: "2px 7px", borderRadius: 10 }}>🌿 {l}</span>)}
      </div>

      <div style={{ background: p.hellFarbe, borderRadius: 10, padding: "8px 12px", marginBottom: 6 }}>
        <p style={{ margin: 0, fontSize: 12, color: "#555" }}><strong>⏰ Fasten:</strong> {FASTEN_TYPEN.filter(f => f.phasen.includes(p.id)).map(f => f.name).join(", ")}</p>
      </div>

      {modus !== "menopause" && (
        <div style={{ background: "#F9F9F9", borderRadius: 10, padding: "8px 12px", marginBottom: 6, border: "1px solid #eee" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#666", lineHeight: 1.55 }}>📖 {p.buchTipp}</p>
        </div>
      )}

      {TRAINING_PHASEN[p.id] && (
        <div style={{ background: p.hellFarbe, borderRadius: 10, padding: "8px 12px", marginBottom: 8, border: `1px solid ${p.farbe}33` }}>
          <p style={{ margin: 0, fontSize: 11, color: p.farbe, fontWeight: 600 }}>💪 Training: {TRAINING_PHASEN[p.id].intensitaet} · {TRAINING_PHASEN[p.id].schwerpunkt.slice(0,2).join(", ")}</p>
        </div>
      )}

      {aktiv && <div style={{ marginBottom: 8, fontSize: 12, color: p.farbe, fontWeight: 700 }}>✓ Du bist jetzt hier (Tag {zyklusTag})</div>}

      {/* Aufklappbarer Detail-Bereich: Hormone, Stimmung, Lifestyle */}
      {info && (
        <>
          <button onClick={() => setDetailsOffen(!detailsOffen)}
            style={{ width: "100%", background: detailsOffen ? p.farbe : p.hellFarbe, color: detailsOffen ? "#fff" : p.farbe, border: `1px solid ${p.farbe}44`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", fontSize: 12.5, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
            <span>🧠 Hormone, Stimmung & Lifestyle</span>
            <span>{detailsOffen ? "▲" : "▼"}</span>
          </button>

          {detailsOffen && (
            <div style={{ marginTop: 10 }}>
              {modus === "menopause" ? (
                <>
                  {/* Mond-Kontext */}
                  {MOND_PHASEN_INFO[p.id] && (
                    <>
                      <div style={{ marginBottom: 12 }}>
                        <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, color: p.farbe }}>🌙 Diese Mond-Phase</p>
                        <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.65 }}>{MOND_PHASEN_INFO[p.id].kontext}</p>
                      </div>
                      <div style={{ marginBottom: 4 }}>
                        <p style={{ margin: "0 0 5px", fontSize: 12, fontWeight: 700, color: p.farbe }}>✨ Fokus jetzt</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {MOND_PHASEN_INFO[p.id].fokus.map((f, i) => (
                            <span key={i} style={{ fontSize: 11, background: p.hellFarbe, color: p.farbe, padding: "3px 9px", borderRadius: 12 }}>{f}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Hormone */}
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, color: p.farbe }}>🌸 Deine Hormone jetzt</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.65 }}>{info.hormone}</p>
                  </div>

                  {/* Gehirn */}
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, color: p.farbe }}>🧠 Dein Gehirn & Fokus</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.65 }}>{info.gehirn}</p>
                  </div>

                  {/* Lifestyle */}
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, color: p.farbe }}>💼 Lifestyle & Timing</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#555", lineHeight: 1.65 }}>{info.lifestyle}</p>
                  </div>

                  {/* Fruchtbarkeits-Hinweis nur für Manifestationsphase */}
                  {p.id === "manifestation" && (
                    <div style={{ background: "#E0F2F1", borderRadius: 10, padding: "10px 12px", marginBottom: 12, border: "1px solid #B2DFDB" }}>
                      <p style={{ margin: "0 0 3px", fontSize: 12, fontWeight: 700, color: "#00695C" }}>🌱 Fruchtbarste Zeit</p>
                      <p style={{ margin: 0, fontSize: 11.5, color: "#00695C", lineHeight: 1.55 }}>
                        Diese Phase enthält den Eisprung und ist deine fruchtbarste Zeit im Zyklus. Das fruchtbare Fenster umfasst etwa die 5 Tage davor plus den Eisprungtag. Hinweis: Das ist nur eine Schätzung und <strong>nicht zur Verhütung geeignet</strong>.
                      </p>
                    </div>
                  )}

                  {/* Do's */}
                  <div style={{ marginBottom: 8 }}>
                    <p style={{ margin: "0 0 5px", fontSize: 12, fontWeight: 700, color: "#2E7D32" }}>✅ Jetzt ideal</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {info.dos.map((d, i) => (
                        <div key={i} style={{ fontSize: 11.5, color: "#444", lineHeight: 1.4, paddingLeft: 16, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: "#2E7D32" }}>•</span>{d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Don'ts */}
                  <div style={{ marginBottom: 4 }}>
                    <p style={{ margin: "0 0 5px", fontSize: 12, fontWeight: 700, color: "#C62828" }}>❌ Jetzt besser vermeiden</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      {info.donts.map((d, i) => (
                        <div key={i} style={{ fontSize: 11.5, color: "#444", lineHeight: 1.4, paddingLeft: 16, position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: "#C62828" }}>•</span>{d}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// UNTER-KOMPONENTEN
// ═══════════════════════════════════════════════════════════════════

function RezeptKarte({ r, phase, onClick, tagesplanSlots, tagesplan, zyklusTag, onAddToTagesplan }) {
  const [menuOffen, setMenuOffen] = useState(false);
  const bereitsImPlan = tagesplanSlots.some(s => tagesplan[`${zyklusTag}-${s}`] === r.id);
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "12px 14px", marginBottom: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.05)", border: bereitsImPlan ? `1px solid ${phase.farbe}44` : "1px solid transparent" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ flex: 1, cursor: "pointer" }} onClick={onClick}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <p style={{ margin: "0 0 2px", fontSize: 14, fontWeight: 700, color: "#222", flex: 1, lineHeight: 1.3 }}>{r.name}</p>
            {r.thermomix && <span style={{ fontSize: 10, background: "#E3F2FD", color: "#1565C0", padding: "2px 6px", borderRadius: 8, marginLeft: 6, whiteSpace: "nowrap" }}>🌀 TM6</span>}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#aaa" }}>⏱ {formatZeit(r.zeit)}</span>
            <span style={{ fontSize: 11, color: "#aaa" }}>·</span>
            <span style={{ fontSize: 11, color: "#aaa" }}>🔥 {r.kalorien} kcal</span>
            <span style={{ fontSize: 11, color: "#aaa" }}>·</span>
            <span style={{ fontSize: 10, color: "#aaa" }}>{r.buchSeite}</span>
          </div>
          <div style={{ display: "flex", gap: 4, marginTop: 5, flexWrap: "wrap" }}>
            {r.diät.map(d => <span key={d} style={{ fontSize: 10, background: "#f5f5f5", color: "#888", padding: "1px 6px", borderRadius: 8 }}>{d === "vegan" ? "🌱 Vegan" : d === "vegetarisch" ? "🥚 Veg" : d === "omnivor" ? "🥩 Omni" : d === "gf" ? "🌾 GF" : d}</span>)}
          </div>
        </div>
        <button onClick={() => setMenuOffen(m => !m)} style={{ background: menuOffen ? phase.farbe : phase.hellFarbe, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", color: menuOffen ? "#fff" : phase.farbe, fontSize: 16, flexShrink: 0 }}>+</button>
      </div>
      {menuOffen && (
        <div style={{ marginTop: 10, borderTop: "1px solid #f5f5f5", paddingTop: 10 }}>
          <p style={{ margin: "0 0 6px", fontSize: 11, color: "#aaa" }}>Zum Tagesplan hinzufügen:</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tagesplanSlots.map(slot => {
              const key = `${zyklusTag}-${slot}`;
              const belegt = tagesplan[key] === r.id;
              return (
                <button key={slot} onClick={() => { onAddToTagesplan(slot); setMenuOffen(false); }}
                  style={{ background: belegt ? phase.farbe : phase.hellFarbe, color: belegt ? "#fff" : phase.farbe, border: "none", borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600 }}>
                  {belegt ? "✓ " : ""}{slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function RezeptModal({ r, phase, portionen, setPortionen, onClose, onLog, tagesplanSlots, tagesplan, zyklusTag, onAddToTagesplan }) {
  const [tmModus, setTmModus] = useState(false);
  const faktor = portionen / r.portionenBasis;
  const schritte = tmModus && r.thermomix ? r.schritte_tm : r.schritte;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: "20px 20px 0 0", maxWidth: 480, width: "100%", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.2)" }}>
        {/* Modal Header */}
        <div style={{ position: "sticky", top: 0, background: "#fff", padding: "16px 18px 12px", borderBottom: "1px solid #f5f5f5", zIndex: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 2px", fontSize: 11, color: "#aaa" }}>{r.buchSeite} · {KATEGORIE_NAMEN[r.kategorie]}</p>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#222", lineHeight: 1.2 }}>{r.name}</h2>
            </div>
            <button onClick={onClose} style={{ background: "#f0f0f0", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 14, marginLeft: 10, flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 12, color: "#888" }}>
            <span>⏱ {formatZeit(r.zeit)}</span>
            <span>🔥 {r.kalorien} kcal</span>
            <span>👩‍🍳 {r.schwierigkeit}</span>
            {r.thermomix && <span style={{ color: "#1565C0" }}>🌀 TM6</span>}
          </div>
        </div>

        <div style={{ padding: "14px 18px 20px" }}>
          {/* Hinweis */}
          {r.hinweis && <div style={{ background: "#FFF8E1", border: "1px solid #FFE082", borderRadius: 10, padding: "8px 12px", marginBottom: 14, fontSize: 12, color: "#5D4037", lineHeight: 1.5 }}>{r.hinweis}</div>}

          {/* TM6 Toggle */}
          {r.thermomix && (
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <button onClick={() => setTmModus(false)} style={{ flex: 1, background: !tmModus ? "#333" : "#f5f5f5", color: !tmModus ? "#fff" : "#666", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🍳 Standard</button>
              <button onClick={() => setTmModus(true)} style={{ flex: 1, background: tmModus ? "#1565C0" : "#f5f5f5", color: tmModus ? "#fff" : "#666", border: "none", borderRadius: 8, padding: "8px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>🌀 Thermomix TM6</button>
            </div>
          )}

          {/* Portionen */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f8f8f8", borderRadius: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: "#555", flex: 1 }}>Portionen</span>
            <button onClick={() => setPortionen(Math.max(1, portionen - 1))} style={{ background: "#e0e0e0", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16 }}>−</button>
            <span style={{ fontSize: 18, fontWeight: 800, minWidth: 24, textAlign: "center", color: phase.farbe }}>{portionen}</span>
            <button onClick={() => setPortionen(portionen + 1)} style={{ background: "#e0e0e0", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 16 }}>+</button>
          </div>

          {/* Zutaten — IN VERWENDUNGSREIHENFOLGE */}
          <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#333" }}>🛒 Zutaten ({portionen} {portionen === 1 ? "Portion" : "Portionen"})</p>
          {r.zutaten.map((z, i) => {
            const m = z.menge * faktor;
            const anzeige = Number.isInteger(m) ? m : m < 1 ? m.toFixed(2).replace(/0+$/, "").replace(/\.$/, "") : m.toFixed(1);
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f5f5f5", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, color: "#333" }}>{z.name}</span>
                  {z.gruppe && <span style={{ fontSize: 10, color: "#ccc", marginLeft: 6 }}>{z.gruppe}</span>}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: phase.farbe, marginLeft: 10, whiteSpace: "nowrap" }}>{anzeige} {z.einheit}</span>
              </div>
            );
          })}

          {/* Zubereitung */}
          <p style={{ margin: "16px 0 8px", fontSize: 13, fontWeight: 700, color: "#333" }}>
            {tmModus ? "🌀 Thermomix TM6 – Zubereitung" : "📝 Zubereitung"}
          </p>
          <ol style={{ margin: "0 0 16px", padding: "0 0 0 18px" }}>
            {(schritte || r.schritte).map((s, i) => (
              <li key={i} style={{ marginBottom: 10, fontSize: 13, color: "#444", lineHeight: 1.6 }}>{s}</li>
            ))}
          </ol>

          {/* Zum Tagesplan hinzufügen */}
          <p style={{ margin: "0 0 8px", fontSize: 12, color: "#aaa" }}>Zum Tagesplan hinzufügen:</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {tagesplanSlots.map(slot => {
              const key = `${zyklusTag}-${slot}`;
              const belegt = tagesplan[key] === r.id;
              return (
                <button key={slot} onClick={() => onAddToTagesplan(slot)} style={{ background: belegt ? phase.farbe : phase.hellFarbe, color: belegt ? "#fff" : phase.farbe, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                  {belegt ? "✓ " : ""}{slot}
                </button>
              );
            })}
          </div>

          {/* Log Button */}
          <button onClick={onLog} style={{ width: "100%", background: phase.farbe, color: "#fff", border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", fontSize: 15, fontWeight: 800 }}>
            ✅ Als gegessen eintragen
          </button>
        </div>
      </div>
    </div>
  );
}
