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

## 2026.11.03.3: Zoom und Navigation

Die Spielansicht hat nun eine feste Bildschirmhöhe und eine darin zentrierte Aufgabenfläche. Zoom verändert ausschließlich das Suchbild, nicht Schrift, Buttons oder Anzeigen. Die seitliche Bedienung im Querformat bleibt gleich groß.

Die App legt eigene Navigationsschritte an: Alle Spiele → Variantenwahl → Spiel → Ergebnisse. Browser-Zurück und Rechtswischen führen zur vorherigen App-Ansicht. Das Verschieben eines vergrößerten Bildes löst keinen eigenen App-Swipe aus. Auf der Hauptauswahl kann der nächste System-Zurück-Schritt die App wie gewohnt verlassen.

Andere Variante des Spiels ist direkt im Spiel erreichbar. Die laufende Runde lässt sich aus der Auswahl fortsetzen. Erst Los! beendet eine noch laufende vorherige Runde und dokumentiert sie als abgebrochen, ohne Erfolgsblüte. Bei Zeitrunden läuft die Uhr während der Variantenwahl weiter; ein Hinweis zeigt dies an. Beim Wechsel zur Hauptauswahl wird die laufende Runde beendet.

## 2026.11.03.4: Zoom dauerhaft im Spiel erreichbar

Eine eigene synchronisierte Zoomleiste befindet sich jetzt im Bedienbereich des Spiels. Im Querformat steht sie links unter Zeit und Fortschritt; im Hochformat gehört sie zum oberen Bedienbereich. Die zusätzliche allgemeine Zoomleiste ist während des Spiels ausgeblendet. Sie kehrt in der Auswahl zurück. Bildzoom verändert weiterhin weder Schrift noch Buttonmaße.

## 2026.11.03.5: Suchwort-Schrift und Hauptauswahl

Die Suchwort-Kästchen beginnen mit 22 px und lassen sich unabhängig vom Bildzoom auf bis zu 44 px vergrößern. Die Schriftsteuerung steht im Spielbedienbereich, ihre Einstellung bleibt auf dem Gerät gespeichert. Minus verkleinert bis zur neuen größeren Grundschrift. Die Hauptauswahl verwendet nun ebenfalls die freie Bildschirmhöhe zur vertikalen Zentrierung; ihre Installationsfunktionen stehen unter den Spielbuttons.

## 2026.11.03.6: Erreichbare Regler beim Drehen

Im Querformat steht der Bildzoom links unter dem Fortschritt, die Schriftsteuerung rechts unter den Bedienknöpfen. Dadurch passen beide Steuerbereiche auch bei laufender Stoppuhr auf den Bildschirm. Ein Wechsel zwischen Hoch- und Querformat richtet die laufende Spielansicht wieder am sichtbaren Bereich aus.
