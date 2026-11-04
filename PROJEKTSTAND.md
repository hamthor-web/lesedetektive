# Lesedetektive – 2026.11.04.1

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

## 2026.11.03.7: Buttontexte und wirksame Zoomregler

Schmuckbuttons verwenden kleinere, sichere Innenabstände und dürfen ihre Beschriftung umbrechen. Der Ansichtszoom verändert Auswahl und Profilpanel tatsächlich und hat einen eigenen gespeicherten Wert. Der Bildzoom verändert nur das sichtbare Suchbild; Schrift und Bedienung der laufenden Runde bleiben unverändert. Bild- und Suchwort-Schriftregler erscheinen erst, wenn das Suchbild angezeigt wird. In Eingangsfilmen und Lautaufgaben wird kein wirkungsloser Bildzoom angeboten.

## 2026.11.03.8: Dauerhaft Platz für den Bildregler

Die laufende Uhr zeigt Minuten:Sekunden, Ergebnisse behalten die ausgeschriebene Zeit. Der Bildregler beansprucht in der seitlichen Spalte nur seine eigene Höhe. Dies verhindert ein Herausrutschen der Regler bei längeren Zeitrunden.

## 2026.11.03.9: Kindgerechte Schrift und Logo

Profilnamen sind waagerecht und senkrecht im Button zentriert. Das gelieferte PNG wird ohne zeichnerische Veränderung als Logo eingesetzt; lediglich transparente Außenränder wurden entfernt und passende Größen für Favicon, Android, iOS und maskierbare App-Symbole erzeugt. Das bisherige große Begrüßungsbild bleibt erhalten.

Lesewörter beginnen mit 36 px, längere Lesetexte mit 28 px, Fragen mit 24 px, Antwortbuttons mit 28 px und Suchwörter mit 26 px. Suchwörter bleiben unabhängig auf bis zu 52 px vergrößerbar. Die wichtigsten Bedienknöpfe verwenden 18 px. Enge Wortpaare stehen bei Bedarf untereinander. Texte werden nicht automatisch verkleinert; die Aufgabenfläche bleibt scrollbar.


## 2026.11.04.1: Mobile Lesbarkeit

Anlass: Auf dem Handy sind Hauptauswahl, Ansichtsregler und Speicherhinweis zu klein. Bestätigte Vorgabe vom 04.11.: Vergrößerte Schrift muss innerhalb der Bildschirmbreite umbrechen; Spielbalken wachsen in der Höhe. Der Regler muss gut sichtbar und bedienbar sein. Der Speicherhinweis wird zusammenhängend gestaltet. Die spätere Klarstellung zum PC bezog sich auf die Auffindbarkeit des Chats, nicht auf einen zusätzlichen Spielentwurf.

Die frühere Ganzseiten-Vergrößerung wird in Auswahl, Variantenwahl und Profilen durch Schriftvergrößerung mit Umbruch ersetzt. Schriftgröße 100–200 Prozent; frühere gespeicherte Werte unter 100 werden auf 100 angehoben. Der Bildzoom bleibt unabhängig bei 35–200 Prozent. Schriftregler: gut sichtbare Beschriftung und mindestens 52 Pixel hohe Tasten. Hauptauswahl ohne erzwungene Bildschirmhöhe; große Texte verlängern die Seite nach unten. Speicherhinweise stehen in lesbaren, farblich hinterlegten Bereichen. Bilder und Aufgaben bleiben unverändert.

Technische Prüfungen für Datenintegrität, Spielabläufe, Fortschritt, Intro, Profile, Navigation, Schrift, Zoom und Offline-Paket bestehen. Der Browser-Test `tests/mobile-layout.cjs` besteht mit Chromium: 320/393/412/844/1440 Pixel bei 100/150/200 Prozent, alle drei Variantenwahlen und laufenden Spiele einschließlich Bildsuche, Profilwechsel, Schriftregler und gespeicherte Schriftgröße. Kein horizontales Überlaufen der Seite, keine JavaScript-Fehler. Handyansicht bei 150 Prozent und PC-Ansicht visuell kontrolliert. Die besonders lange Überschrift in der Variantenwahl bricht jetzt auch bei 320 Pixeln um. Die Spielbalken verwenden eine zusätzliche Kopie des gelieferten Hintergrundes ohne transparente Außenränder; das Original bleibt erhalten. Suchbild- und Suchwortregler haben mindestens 44 Pixel große Tasten.

Ein während der Prüfung entdeckter Fehler beim schnellen Verlassen der Bildsuche ist korrigiert: verspätete Bild-Ladeereignisse greifen nicht mehr auf eine bereits beendete Runde zu.

Auf ausdrücklichen Auftrag vom 04.11.2026 fertiggestellt und zur Übernahme in die veröffentlichte Spielversion vorbereitet. Veröffentlichung erfolgt über Pull Request 1. Profile und Ergebnisse werden durch das Update nicht gelöscht. Eine Prüfung auf physischen Android-/iOS-Geräten wurde nicht durchgeführt.
