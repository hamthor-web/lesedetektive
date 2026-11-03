# Änderungsstand · Lesedetektive

## 01.11.2026 · Version 2026.11.01.5

- 14 Ei/ie-Karten aus der nutzerbearbeiteten Sicherung ergänzt: jetzt 24 Karten, 82 Trefferflächen, 25 eigene Sternpositionen.
- Alle Bilder unverändert in einzelne Bilddateien ausgelagert und offline verfügbar.
- Alte abgeschlossene Zehner-Runden starten bei der ersten neuen Karte; Teilfortschritte bleiben erhalten.
- Alle vier Prüfprogramme bestanden; Projektübersicht und Übernahmenachweis aktualisiert.

## 01.11.2026 · veröffentlichter Spielcode 134017d

- Titel überall „Was zischt denn da?“; zuletzt geliefertes Original-Hintergrundbild mit 1792 × 2688 Pixeln.
- Hochformat-Arbeitsflächen vergrößert; Zoom und vorhandene Querformat-Arbeitsflächen erhalten.
- Eröffnung mit sicher sichtbarem Kopf, Lupe und Schild; passende Bildanordnung in beiden Ausrichtungen.
- Lokale Profile, getrennte Wiederaufnahme, Installieren, Aktualisieren und vollständiges Offline-Paket. Aktuelle Version 2026.11.01.4.
- Zwei Würstchenvideos; Schlussbild jeweils drei Sekunden, Überspringen möglich.
- „Wie klingt es?“: 20 Paare, zufällige Ich-/Ach-Frage, animierte Bestätigungen für drei Sekunden mit Überspringen und automatischem Wechsel.
- CH-/SCH-Sortierung mit 59 unterschiedlichen Wörtern. Hinweis: „Die Buchstaben ch bleiben gleich. Lies dann den Text darunter.“
- Bildsuche mit zehn Bildern, 34 Trefferflächen und 14 individuellen Sternpositionen; acht Schweine und drei Bienen einzeln zählen. Bild erst nach „gelesen“. „Suche“ vor den Kästchen; Treffer mit Funkenregen und bleibendem Stern.
- Sämtliche Editier-/Sicherungswerkzeuge aus der veröffentlichten Kinderoberfläche entfernt; getrennte lokale Bearbeitungsvorschau erhalten.

## Dokumentationsfortschreibung 01.11.2026

Spielakte, Aufgaben und Gesamtverwaltung auf den aktuellen bestätigten Stand gebracht; Quellcode-Sicherung und Nachweise bereitgestellt. Dies verändert weder die Spiel-/Cacheversion noch den Spielcode. Umfang und Prüfgrenzen: PROJEKTSTAND.md.


## Zufällige Kartenfolge · Version 2026.11.01.6

Jede neue Leserunde mischt alle 24 Karten nach dem Zufallsprinzip. Jede Karte kann zuerst erscheinen; innerhalb einer Runde kommt jede Karte genau einmal vor. Die Reihenfolge wird je Profil zusammen mit den Treffern gespeichert und beim Fortsetzen wiederhergestellt. Bestehende Spielstände behalten die aktuelle Karte und bereits bearbeitete Karten; noch ausstehende Karten werden gemischt.


## Zoom auf allen Seiten · Version 2026.11.01.7

Eine gemeinsame Zoomleiste mit Minus, Prozentanzeige/Zurücksetzen und Plus vergrößert oder verkleinert die gesamte Arbeitsfläche einschließlich Lesekarten, Suchbildern und Lautübungen. Bereich: 75 bis 200 Prozent. Die Einstellung bleibt auf diesem Gerät bei Seitenwechsel und Neustart gespeichert. Auch Profilauswahl und Videobegrüßung haben eigene erreichbare Bedienelemente. Bei vergrößerten Arbeitsflächen ist Scrollen möglich; Trefferflächen bleiben am Bild ausgerichtet. Die vorhandene Browser-/Zweifinger-Zoomfunktion bleibt erlaubt. Zusätzliche Prüfung: `node tests/zoom.cjs`.

## 2026.11.03.1 – 03.11.2026

Drei Spieloberflächen mit Paketen, Zufall und Zeitvarianten; eigene Profil-Ergebnisse, Blumenstrauß und Ergebnisleiter mit drei Sekunden Standzeit und Weiter-Button; neue Filme und Schmuckbuttons, korrigierte Blüten und Lautfolge; vollständiges Offline-Paket.

## 2026.11.03.2 – 03.11.2026

Spielaufgaben im Hochformat vertikal zentriert. Querformat mit seitlichen Anzeigen und Bedienknöpfen sowie unabhängig scrollbarerer Aufgabenfläche. Spieltitel und Zoomleiste scrollen weg und verdecken keine Aufgabe. Zoomstufen bleiben erhalten.

## 2026.11.03.3 – 03.11.2026

Feste Höhe für die Zentrierung im Hochformat; Zoom nur für Suchbilder; interne Zurücknavigation und Rechtswischen; direkt erreichbare Variantenwahl mit Rückkehr zur laufenden Runde.

## 2026.11.03.4 – 03.11.2026

Zoomleiste direkt im Spielbedienbereich: im Querformat links unter den Anzeigen, im Hochformat zusammen mit dem Fortschritt. Sie scrollt nicht mehr mit der Kopfzeile aus dem Spiel.

## 2026.11.03.5 – 03.11.2026

Suchwörter mindestens 22 px statt bisher 15/16 px; eigene Schriftsteuerung von 100 bis 200 Prozent, getrennt vom Bildzoom. Hauptauswahl der Spiele nutzt die Bildschirmhöhe zur Zentrierung.
