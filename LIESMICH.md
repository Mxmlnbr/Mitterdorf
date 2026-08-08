# Mitterdorf-App

Eine installierbare Web-App (PWA) mit Vereinsterminen, Ortsmeldungen und Abfuhrterminen.
Läuft ohne Server und ohne Datenbank – alle Inhalte stehen in einer einzigen Datei.

## Die Dateien

| Datei | Wofür |
|---|---|
| `index.html` | Die App selbst |
| `redaktion.html` | Oberfläche zum Pflegen der Inhalte |
| `daten.json` | **Alle Inhalte.** Die einzige Datei, die sich im Betrieb ändert |
| `manifest.json` | Damit die App auf dem Homescreen landet |
| `sw.js` | Service Worker, macht die App offline lesbar |
| `icon.svg`, `icon-maskable.svg` | App-Symbol |
| `.nojekyll` | Verhindert, dass GitHub die Dateien umbaut |

## Auf GitHub Pages veröffentlichen

1. Auf github.com anmelden, oben rechts **New repository**.
2. Name z. B. `mitterdorf`, **Public** wählen, anlegen.
3. **Add file → Upload files**, alle Dateien aus diesem Ordner hineinziehen, **Commit changes**.
4. **Settings → Pages**: unter *Source* „Deploy from a branch“, Branch `main`, Ordner `/ (root)`, **Save**.
5. Nach ein bis zwei Minuten ist die App erreichbar unter
   `https://DEINBENUTZERNAME.github.io/mitterdorf/`

Die Redaktionsoberfläche liegt dann unter `.../mitterdorf/redaktion.html`.

> **Wichtig:** Das Repository ist öffentlich, also auch `redaktion.html`. Die Seite kann
> zwar nichts am Server verändern – gespeichert wird erst durch deinen Commit – aber
> jeder kann sie sehen. Wenn dich das stört, lade `redaktion.html` nicht hoch und öffne
> sie nur lokal.

## Inhalte pflegen

1. `redaktion.html` öffnen (online oder lokal).
2. Termine, Meldungen, Abfuhrtermine oder Vereine bearbeiten.
3. Unten auf **daten.json herunterladen** klicken.
4. Im GitHub-Repository die alte `daten.json` anklicken → Papierkorbsymbol oder
   **Upload files** und die neue Datei mit gleichem Namen hineinziehen → **Commit changes**.
5. Nach etwa einer Minute ist die App aktuell.

Die Redaktionsseite speichert nichts von selbst. Solange du die Datei nicht
heruntergeladen und hochgeladen hast, ist nichts veröffentlicht.

## Abfuhrtermine automatisch übernehmen

1. Auf **entsorgung-cham.de** die Adresse eingeben.
2. „Kalender als ICS-Datei herunterladen“ wählen.
3. In `redaktion.html` unter *Müllabfuhr* die Datei einlesen.

Die Tonnenart wird aus dem Termintitel erkannt (Restmüll, Bio, Papier, Gelber Sack).
Der Import ersetzt alle bisherigen Abfuhrtermine.

## Lokal testen

Ein Doppelklick auf `index.html` funktioniert **nicht** – Browser dürfen dann keine
lokalen Dateien nachladen. Stattdessen im Ordner ein Terminal öffnen:

```
python3 -m http.server
```

Dann `http://localhost:8000` aufrufen.

## Was noch fehlt, bevor das öffentlich beworben wird

- **Impressum und Datenschutzerklärung.** Bei einem öffentlich zugänglichen Angebot
  in Deutschland Pflicht. Am einfachsten als zusätzliche Seite `impressum.html`,
  verlinkt im Fußbereich.
- **Klärung, wer Betreiber ist.** Ein Verein als Träger ist besser als eine
  Privatperson – wegen Haftung und weil eine private App sonst schnell wie ein
  amtliches Mitteilungsblatt wirkt.
- **Haftungshinweis bei Sperrungen und Warnungen.** Wer sich auf eine Angabe verlässt,
  muss wissen, dass die verbindliche Quelle woanders liegt.

## Wenn es größer wird

Sobald mehrere Leute gleichzeitig pflegen sollen, wird das Herunterladen und Hochladen
lästig. Sinnvolle nächste Stufen:

- **Decap CMS** (früher Netlify CMS): Login über GitHub, Bearbeiten direkt im Browser,
  der Commit passiert automatisch. Bleibt kostenlos und ohne eigenen Server.
- **Supabase oder Firebase**: echte Datenbank mit Benutzerkonten, wenn Vereine selbst
  eintragen sollen. Erst sinnvoll, wenn wirklich mehrere Vereine mitmachen – vorher
  ist redaktionelle Pflege einfacher und die Qualität besser.
