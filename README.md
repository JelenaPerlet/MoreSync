# MoreSync 🌸

**MoreSync** ist eine Progressive Web App (PWA) für Frauengesundheit, die Ernährung, Fasten, Training und Lifestyle an die weiblichen Hormone in jeder Lebensphase anpasst.

Live: [moresync.netlify.app](https://moresync.netlify.app)

---

## Was ist MoreSync?

MoreSync begleitet Frauen mit auf ihre jeweilige Lebensphase zugeschnittenen Inhalten — vom Zyklus über die Schwangerschaft bis zu den Wechseljahren, und mit einer eigenen Variante für junge Frauen in der Pubertät. Die App ist ein Handlungs-Dashboard: Sie zeigt jeden Tag, was gerade guttut, ohne zu bewerten.

Das gesammelte Wissen stammt aus mehreren Fachbüchern und wird in der App verständlich, buchtreu und über die Quellen hinweg konsistent aufbereitet (Widersprüche zwischen Autorinnen werden erklärt, nicht versteckt).

---

## Modi

Die App passt sich dem Lebensabschnitt der Nutzerin an:

- **Zyklus** — Tracking nach der Periode, mit den vier Phasen (Power 1, Manifestation, Power 2, Nurture) und passender Ernährung, Fasten und Training. Enthält eine eigene **Teenager-Variante** (11–19 Jahre) ohne Fasten-, Supplement- oder Fettabbau-Inhalte.
- **Schwangerschaft** — Begleitung durch alle Trimester (plus Stillzeit), mit Trimester-gerechter Ernährung (Blutzucker, Cholin, Protein, DHA, Jod), Bewegung und Rezepten.
- **Menopause** — sanfte Struktur nach dem Mondrhythmus (Neumond = Tag 1), mit der Primal Menopausal Diet, Menopause-Fasten, Adaptogenen und Inhalten zu Knochen, Gehirn, Schlaf und sexueller Gesundheit.

---

## Funktionen

- **Startseite (Heute):** aktuelle Phase, sanfte Erinnerungen (inkl. Wasser mit „+1 Glas"), Tagesplan mit Rezept-Vorschlägen, 5×5×5-Tool und Fasten
- **Ernährung:** phasengerechte Empfehlungen, Blutzucker- & Glukose-Hacks, Nährstoffe & Supplemente, „besser weglassen"-Liste
- **Wissensbereich (Dein Körper / Wechseljahre):** Hormone, Zyklus, Aufklärung, urogenitale & sexuelle Gesundheit
- **Fasten:** Fastenfenster & -protokolle passend zur Phase (bei jungen Frauen ausgeblendet)
- **Training:** phasengerechtes Training mit Krafttraining als Basis
- **5×5×5-Tool** (nach Dr. William Li): täglich ein Lebensmittel für jedes der fünf Verteidigungssysteme (Angiogenese, Regeneration, Mikrobiom, DNA-Schutz, Immunsystem) — inklusive der markierten **Grand Slammers**, die alle fünf Systeme auf einmal aktivieren
- **Tipp des Tages:** täglich ein wechselnder Tipp aus über 40 Wissensquellen, modus- und altersgerecht
- **Tagesplan, Tagebuch, Rezepte, Einkaufsliste** und Einstellungen (über das „Mehr"-Menü)
- Zentraler **Zurück-Button** auf allen Unterseiten

---

## Wissensquellen

Die Inhalte basieren buchtreu auf:

- **Dr. Mindy Pelz** — *Fast Like a Girl*, *Eat Like a Girl*, *Age Like a Girl*
- **Dr. Stacy Sims** — *Roar*, *Next Level*
- **Jessie Inchauspé** — *Glucose Revolution*, *9 Months That Count Forever*
- **Dr. William Li** — *Eat to Beat Disease*, *Eat to Beat Your Diet*
- **Dr. Rachel Rubin** — sexuelle & urogenitale Gesundheit
- **Dr. Rhonda Patrick** — Supplemente & Nährstoffe
- **Dr. Lucia Aronica** — Ernährungs-Epigenetik

Bei Themen, wo sich Quellen scheinbar widersprechen (z.B. Protein-Mengen bei Pelz vs. Sims, oder Milchprodukte in der Primal-Diät), erklärt die App beide Perspektiven mit Kontext, statt eine zu verschweigen.

---

## Technik

- **Framework:** React (Single-Page-App als PWA)
- **Hosting:** [Netlify](https://www.netlify.com/) — automatischer Build aus `Src/App.jsx`
- **Speicherung:** lokal im Browser (localStorage) — keine Server, keine Konten, keine Weitergabe von Daten
- **Sprache:** Deutsch (österreichische Lebensmittelbegriffe außerhalb der Rezepte, z.B. Marille, Karfiol, Melanzani)

> ⚠️ **Wichtig fürs Deployment:** Netlify baut aus dem Ordner `Src/` (großes **S**). Die Hauptdatei ist `Src/App.jsx`.

---

## Projektstruktur

Die gesamte App liegt in einer einzelnen großen Datei: **`Src/App.jsx`**. Sie enthält alle Modi, Wissensinhalte, Rezepte und UI-Komponenten. Änderungen werden über GitHub hochgeladen.

---

## Hinweis

MoreSync ersetzt keine ärztliche Beratung. Die Inhalte dienen der Information und Selbstfürsorge. Bei gesundheitlichen Fragen, in der Schwangerschaft oder bei Beschwerden sollte immer eine Ärztin oder ein Arzt hinzugezogen werden.

---

*Mit Liebe entwickelt für Frauen, die mehr über ihren Körper wissen wollen. 🌸*
