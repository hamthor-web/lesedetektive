# Lesedetektive

Zwei Spiele unter einer gemeinsamen Spielauswahl:

- **Lesen und im Bild suchen**: zehn Lesekarten und Illustrationen. Suchbild erst nach „gelesen“. Acht Schweine und drei Bienen werden einzeln gezählt. Richtige Treffer lösen einen Funkenregen aus; anschließend bleibt ein Stern an der gespeicherten Position.
- **Was zischt den da**: 59 Wörter nach Ich-Laut, Ach-Laut oder SCH sortieren; zusätzlich 20 CH-Wortpaare unter „Wie klingt es? – ich oder ach?“. Optionales Vorlesen über Browser-Sprachausgabe.

Ohne Zeitlimit oder Punktabzug. Begleitung durch Erwachsene vorgesehen.

## Öffnen

[App starten](https://hamthor-web.github.io/lesedetektive/). Alternativ Dateien herunterladen und index.html öffnen. Reine HTML-/JavaScript-App ohne Installation oder Build-Abhängigkeiten. Die Bildsuche enthält die zehn Illustrationen eingebettet; der erste Download ist daher etwa 38 MB groß.

## Bearbeitung

Die veröffentlichte App enthält ausschließlich die Spiele. Die separate lokale Bearbeitungsvorschau dient zur Pflege der Bilder, Trefferflächen und Sternpositionen.

## Stand 01.11.2026

Nutzerseitige Klickflächen und Sternpositionen übernommen. Neues Biene–Beine-Bild für Karte 2; ausgewählte eigene Bienenillustration für Karte 7 und acht Schweine für Karte 5. CH-/SCH-Wortmaterial und Wortfamilien aus der bisherigen Testversion erhalten.

Prüfung: node tests/check.cjs. Die Prüfung simuliert Oberfläche und Eingaben; sie ersetzt keinen vollständigen Geräte-/Sprachausgabetest.

## Spieloberfläche

Lesekarte, Fortschritt, „gelesen“, Bildsuche und Abschluss. Kein Editor, keine Kartenauswahl und keine Sicherungsfunktionen im Spiel. Bilder bleiben bis „gelesen“ verborgen.

## Würstchen-Begrüßung

Beim Start eines Spiels über die gemeinsame Startseite öffnet sich das zugehörige Würstchenvideo mit Ton und Videosteuerung. Nach Videoende startet das gewählte Spiel automatisch. „Überspringen“ startet sofort; „Spielauswahl“ oder Escape schließt das Video. Falls der Browser die Wiedergabe nicht zulässt, ist „Video starten“ verfügbar. Direkte Spieladressen bleiben ohne vorgeschaltetes Video erreichbar. Beide bereitgestellten MP4-Dateien sind unverändert unter assets/ enthalten.

## Erweiterung CH-Wortpaare

15 bereitgestellte Wortpaare ergänzt (Quelle: „15 Wortpaare mit Ach.docx“). Insgesamt 20 Paare. Pro Paar wird zufällig der Ich- oder Ach-Laut abgefragt. Die Frage bleibt bei einem Fehlversuch gleich. Die zusätzlichen Einzelwörter ergänzen auch die Sortierung; bestehende Wörter werden nicht doppelt aufgenommen. Insgesamt 59 Sortierwörter. Neue Beispielsätze wurden nicht erfunden.

## Bestätigung bei „Wie klingt es?“

Der CH-Hinweis steht direkt unter „Lies beide Wörter“. Richtige Antworten zeigen eine zufällige Bestätigung aus acht Formulierungen auf neutralem Hintergrund; die nächste Aufgabe folgt nach drei Sekunden oder sofort über „Überspringen“. Innerhalb eines gemischten Durchlaufs wiederholen sich die Bestätigungen nicht. Abbruch zur Übungsauswahl beendet den Übergang. Die CH-/SCH-Sortierung bleibt unverändert.
