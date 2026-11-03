# Lesedetektive – 2026.11.03.1

Drei getrennte Spieloberflächen: Lesen und im Bild suchen, Was zischt denn da? (CH/SCH) und Wie klingt es? (ich/ach). Ohne Zeit mit 10/15/20 Aufgaben sowie eine Minute und zehn Aufgaben mit Stoppuhr. Auswahl zwischen wiederholbaren Paketen und Zufall; 20 Wortpaare ohne Paket.

Die gelieferten Eingangsfilme und Buttonhintergründe sind übernommen. Schlussbilder der Eingangsfilme bleiben drei Sekunden stehen.

Vollständige normale Runden bringen 1/2/3 Straußblüten. Nach zehn Blüten besucht der Schmetterling den Strauß; erst danach beginnt die neue Vase. Zeitspiele haben ihre Ergebnisleiter, getrennt nach Spiel, Zeitmodus und Paket. Ergebnisanimationen bleiben drei Sekunden stehen; Weiter öffnet die Übersicht sofort. Blüten bleiben ohne Buttonrahmen.

CH/SCH-Pakete haben eine feste gemischte Lautfolge. Zufall mischt jede Runde neu. Die Frage nach ich/ach wird unabhängig von der Paketreihenfolge zufällig gestellt.

24 Bilder, Texte, 82 Trefferflächen und Sternpositionen sind unverändert. Bilder erscheinen nach gelesen, mit Funkenregen und bleibendem Stern. Zoom 35–200 Prozent; Browserzoom bleibt möglich.

Die bisherigen Profil- und Installationsfunktionen bleiben erhalten. Neue Ergebnisse werden pro Profil unter lesedetektive:ergebnisse:v2 gespeichert. Alte Lese-/Lautspielstände werden nicht gelöscht, aber laufende Aufgaben aus der bisherigen Spielmechanik werden nicht in die neuen Runden übertragen. Lokale Dateivorschau-Ergebnisse können nicht automatisch in die Web-App übernommen werden.

Die neue Offline-Version enthält alle drei Spiele, Videos und Fortschrittsgrafiken. Bereits installierte Apps über Aktualisieren umstellen; die vollständige Offline-Vorbereitung benötigt wegen der Bilder etwas Zeit.

Prüfen: node tests/check.cjs; node tests/oberflaeche-pruefen.cjs; node tests/fortschritt-pruefen.cjs; node tests/intro.cjs; node tests/zoom.cjs; node tests/platform.cjs; node tests/offline.cjs.

Die gespeicherten Ergebnissummen bleiben beim Neuladen erhalten; eine gerade laufende Runde wird dabei nicht fortgesetzt. Eine Sicht- und Tonkontrolle auf Android/iPad/iPhone bleibt empfohlen.

## Bildschirmaufteilung (2026.11.03.2)

Im Hochformat verwendet die Spielansicht die verfügbare Bildschirmhöhe, um die Aufgabe vertikal zu zentrieren. Im Querformat stehen Fortschritt und Zeit links, Ergebnisse und Runde beenden rechts. Dazwischen ist die Aufgabe unabhängig scrollbar. Kopfzeile mit Spieltitel und Zoomleiste dürfen nach oben wegscrollen. Beim Wechsel der Aufgabe beginnt die mittlere Scrollfläche wieder oben; beim Wechsel zur Ergebnisübersicht verschwindet die seitliche Spielaufteilung vollständig. Bilder werden im Querformat nicht mehr auf eine winzige Resthöhe verkleinert. Zoom 35–200 Prozent und Browserzoom bleiben erhalten.
