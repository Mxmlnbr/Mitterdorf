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

## Inhalte pflegen — mit direktem Veröffentlichen (empfohlen)

Einmalig einrichten, danach entfällt das Herunterladen und Hochladen:

1. Auf github.com unter `Settings → Developer settings → Personal access tokens →
   Fine-grained tokens` einen Schlüssel erzeugen. Bei *Repository access* nur dieses
   Repository wählen, bei *Permissions* nur `Contents: Read and write`, dazu eine Laufzeit.
2. In `redaktion.html` den Reiter **Veröffentlichen** öffnen, Benutzername, Repository und
   Schlüssel eintragen, **Zugang prüfen** klicken.
3. Ab jetzt genügt unten der Knopf **Veröffentlichen**. Nach etwa einer Minute ist die App aktuell.

Der Schlüssel bleibt im Browser des jeweiligen Geräts und landet nie im Repository.
Nicht an fremden oder geteilten Rechnern einrichten. Bei Verlust auf github.com widerrufen.

## Inhalte pflegen — ohne Zugang

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

## Vorschläge aus der Bevölkerung

Im Reiter *Termine* der App gibt es unten den Knopf „Termin vorschlagen“. Wer ihn ausfüllt,
bekommt eine fertig formulierte Nachricht, die er selbst per WhatsApp oder E-Mail abschickt.
Es gibt keinen Server, keine Anmeldung und keine Datenspeicherung — die Nachricht landet
einfach in deinem Posteingang.

Zum Übernehmen: In der Redaktion unter *Termine* den Text in das Feld
„Vorschlag aus einer Nachricht übernehmen“ einfügen und auf *Ins Formular übertragen* klicken.
Verein und Ortsteil werden über den Namen zugeordnet, unbekannte Angaben werden angezeigt
statt stillschweigend verworfen. Der Name des Melders erscheint nur als Hinweis und wandert
nicht in die veröffentlichten Daten.

Welche Knöpfe erscheinen, steuerst du unter *Kontakt für Vorschläge*: ohne WhatsApp-Nummer
gibt es nur E-Mail und „Text kopieren“.

## Vergangene Termine

Die App zeigt nur, was noch bevorsteht — vergangene Einzeltermine bleiben aber in der Datei
stehen. Unter *Termine → Aufräumen* lassen sie sich sammelweise entfernen. Wiederkehrende
Termine sind davon nie betroffen, weil dort nur die Regel gespeichert ist.

## Wiederkehrende Termine

Beim Anlegen eines Termins lässt sich eine Wiederholung wählen. Die Regel ergibt sich aus dem
gewählten Datum:

| Auswahl | Beispiel |
|---|---|
| Jede Woche | Training jeden Dienstag |
| Alle zwei Wochen | Probe alle zwei Wochen |
| Monatlich am gleichen Wochentag | Gerätepflege jeden ersten Dienstag |
| Monatlich am gleichen Datum | Abrechnung immer am 15. |
| Jährlich | Jahreshauptversammlung |

Bei „monatlich am gleichen Wochentag“ schlägt die Redaktion aus dem Datum vor, der wievielte
im Monat gemeint ist — änderbar, unter anderem auf *letzter*. Eine Vorschau zeigt sofort die
nächsten fünf Termine.

Optional lassen sich ein Enddatum und einzelne Ausnahmen angeben (etwa 24.12.2026), an denen
der Termin ausfällt.

In der Datei steht nur die Regel, nicht jeder Einzeltermin. Die App rechnet daraus zwölf Monate
im Voraus die konkreten Termine aus.

## Ortsteile

Die Kopfzeile der App enthält ein Auswahlfeld für den Ortsteil. Jeder Termin, jede Meldung,
jeder Verein und jeder Service-Eintrag bekommt in der Redaktion einen Ortsteil zugewiesen.
Wer „Ganze Stadt“ wählt, erscheint überall — richtig für Notrufnummern, Rathaus und Wertstoffhof.

Die Auswahl wird auf dem Gerät gemerkt, sodass jeder beim nächsten Öffnen gleich seinen
Ortsteil sieht. Voreingestellt ist „Alle Ortsteile“.

Die Liste der Ortsteile pflegst du in der Redaktion im eigenen Reiter *Ortsteile*. Ein Ortsteil lässt sich
nur entfernen, solange ihm keine Einträge zugeordnet sind.

## Wenn es größer wird

Sobald mehrere Leute gleichzeitig pflegen sollen, wird das Herunterladen und Hochladen
lästig. Sinnvolle nächste Stufen:

- **Decap CMS** (früher Netlify CMS): Login über GitHub, Bearbeiten direkt im Browser,
  der Commit passiert automatisch. Bleibt kostenlos und ohne eigenen Server.
- **Supabase oder Firebase**: echte Datenbank mit Benutzerkonten, wenn Vereine selbst
  eintragen sollen. Erst sinnvoll, wenn wirklich mehrere Vereine mitmachen – vorher
  ist redaktionelle Pflege einfacher und die Qualität besser.
