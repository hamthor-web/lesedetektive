# Lesedetektive

Zwei Spiele unter einer gemeinsamen Spielauswahl:

- **Lesen und im Bild suchen**: zehn Lesekarten und Illustrationen. Suchbild erst nach „gelesen“. Acht Schweine und drei Bienen werden einzeln gezählt. Richtige Treffer lösen einen Funkenregen aus; anschließend bleibt ein Stern an der gespeicherten Position.
- **Was zischt den da**: 35 Wörter nach Ich-Laut, Ach-Laut oder SCH sortieren; zusätzlich fünf CH-Wortfamilien unter „Wie klingt es? – ich oder ach?“. Optionales Vorlesen über Browser-Sprachausgabe.

Ohne Zeitlimit oder Punktabzug. Begleitung durch Erwachsene vorgesehen.

## Öffnen

[App starten](https://hamthor-web.github.io/lesedetektive/). Alternativ Dateien herunterladen und index.html öffnen. Reine HTML-/JavaScript-App ohne Installation oder Build-Abhängigkeiten. Die Bildsuche enthält die zehn Illustrationen eingebettet; der erste Download ist daher etwa 38 MB groß.

## Editor und Sicherung

In der Bildsuche lassen sich Trefferflächen und Endpositionen der Sterne bearbeiten und testen. JSON-/HTML-Sicherungen enthalten Bilder und Konfiguration. Änderungen im Editor bleiben bis zum Export im Arbeitsspeicher. Kein automatisches Speichern von Spielständen und keine Erhebung von Nutzerprofilen.

## Stand 01.11.2026

Nutzerseitige Klickflächen und Sternpositionen übernommen. Neues Biene–Beine-Bild für Karte 2; ausgewählte eigene Bienenillustration für Karte 7 und acht Schweine für Karte 5. CH-/SCH-Wortmaterial und Wortfamilien aus der bisherigen Testversion erhalten.

Prüfung: node tests/check.cjs. Die Prüfung simuliert Oberfläche und Eingaben; sie ersetzt keinen vollständigen Geräte-/Sprachausgabetest.

## Spieloberfläche

Im Bildspiel sind Lesekarte, Fortschritt, „gelesen“ und Bildsuche sichtbar. Unter „Für Erwachsene“ liegen Kartenauswahl, Trefferflächen-/Sterneditor und Sicherungen. Nach zehn Karten erscheint ein Abschluss mit Neustart. Bilder bleiben bis „gelesen“ verborgen.
