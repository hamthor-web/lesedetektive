# Lesedetektive

Zwei Spiele unter einer gemeinsamen Spielauswahl:

- **Lesen und im Bild suchen**: zehn Lesekarten und Illustrationen. Suchbild erst nach „gelesen“. Acht Schweine und drei Bienen werden einzeln gezählt. Richtige Treffer lösen einen Funkenregen aus; anschließend bleibt ein Stern an der gespeicherten Position.
- **Was zischt denn da?**: 59 Wörter nach Ich-Laut, Ach-Laut oder SCH sortieren; zusätzlich 20 CH-Wortpaare unter „Wie klingt es? – ich oder ach?“. Optionales Vorlesen über Browser-Sprachausgabe.

Ohne Zeitlimit oder Punktabzug. Begleitung durch Erwachsene vorgesehen.

## Öffnen

[App starten](https://hamthor-web.github.io/lesedetektive/). Reine HTML-/JavaScript-App ohne Build-Abhängigkeiten, als Web-App installierbar. Die Bildsuche enthält die zehn Illustrationen eingebettet; das Offline-Paket ist daher etwa 39 MB groß. Für die erste Einrichtung Internet verwenden und die Offline-Bereitmeldung abwarten.

## Bearbeitung

Die veröffentlichte App enthält ausschließlich die Spiele. Die separate lokale Bearbeitungsvorschau dient zur Pflege der Bilder, Trefferflächen und Sternpositionen.

## Stand 01.11.2026

Nutzerseitige Klickflächen und Sternpositionen übernommen. Neues Biene–Beine-Bild für Karte 2; ausgewählte eigene Bienenillustration für Karte 7 und acht Schweine für Karte 5. CH-/SCH-Wortmaterial und Wortfamilien aus der bisherigen Testversion erhalten.

Prüfung: `node tests/check.cjs`, `node tests/intro.cjs`, `node tests/platform.cjs`, `node tests/offline.cjs`. Die Prüfungen simulieren Oberfläche und Eingaben; sie ersetzen keinen vollständigen Geräte-/Sprachausgabetest.

## Spieloberfläche

Lesekarte, Fortschritt, „gelesen“, Bildsuche und Abschluss. Kein Editor, keine Kartenauswahl und keine Sicherungsfunktionen im Spiel. Bilder bleiben bis „gelesen“ verborgen.

## Würstchen-Begrüßung

Beim Start eines Spiels über die gemeinsame Startseite öffnet sich das zugehörige Würstchenvideo mit Ton. Das Schlussbild bleibt drei Sekunden stehen, anschließend startet das gewählte Spiel automatisch. „Überspringen“ startet sofort; „Spielauswahl“ oder Escape schließt das Video. Falls der Browser die Wiedergabe nicht zulässt, ist „Video starten“ verfügbar. Direkte Spieladressen bleiben ohne vorgeschaltetes Video erreichbar. Beide bereitgestellten MP4-Dateien sind unverändert unter assets/ enthalten.

## Erweiterung CH-Wortpaare

15 bereitgestellte Wortpaare ergänzt (Quelle: „15 Wortpaare mit Ach.docx“). Insgesamt 20 Paare. Pro Paar wird zufällig der Ich- oder Ach-Laut abgefragt. Die Frage bleibt bei einem Fehlversuch gleich. Die zusätzlichen Einzelwörter ergänzen auch die Sortierung; bestehende Wörter werden nicht doppelt aufgenommen. Insgesamt 59 Sortierwörter. Neue Beispielsätze wurden nicht erfunden.

## Bestätigung bei „Wie klingt es?“

Der CH-Hinweis steht direkt unter „Lies beide Wörter“. Richtige Antworten zeigen eine zufällige Bestätigung aus acht Formulierungen auf neutralem Hintergrund; die nächste Aufgabe folgt nach drei Sekunden oder sofort über „Überspringen“. Innerhalb eines gemischten Durchlaufs wiederholen sich die Bestätigungen nicht. Abbruch zur Übungsauswahl beendet den Übergang. Die CH-/SCH-Sortierung bleibt unverändert.

## Profile, Installieren und Aktualisieren

„Wer spielt heute?“ folgt der Profilauswahl aus `hamthor-web/Spielesammlung-fuer-Lesefreude-/home.html`, angepasst an die Lesedetektive-Farben. Vorhandenes lokales Profil wählen oder einen Namen anlegen. Auf der Startseite ist „Profil wechseln“ verfügbar. Kein Passwort, kein Onlinekonto und keine Übertragung von Kindernamen oder Spielständen. Profile anderer Apps auf derselben GitHub-Pages-Domain bleiben unberührt.

Bildkarten einschließlich einzelner Treffer sowie CH-Aufgaben werden je Profil lokal wiederaufgenommen. Spielstände bleiben bei App-Updates erhalten. Profile und Fortschritte sind an den Gerätespeicher gebunden; Löschen der Browser-/Appdaten entfernt sie. Bei gesperrtem Speicher ist Spielen für die aktuelle Sitzung möglich.

Der Button „Installieren“ öffnet in unterstützten Android-/Desktop-Browsern den Systemdialog direkt, sobald der Browser ihn bereitstellt. iPhone/iPad: Der Button erklärt den erforderlichen Apple-Schritt Safari → Teilen → Zum Home-Bildschirm → Hinzufügen. Eine Webseite kann diesen Systemdialog dort nicht selbst aufrufen. Keine Store-App oder APK nötig; Installation und Wiedergabe bleiben von den Möglichkeiten des jeweiligen Browsers abhängig.

„Aktualisieren“ prüft neue Fassungen. Eine fertig geladene Fassung kann über denselben Button aktiviert werden; erst die bewusste Aktion lädt die App neu. Profile werden dabei nicht gelöscht. Das Offline-Paket enthält beide Spiele, die Bilder und Videos. Video-Teilabrufe werden auch offline unterstützt. Der Service Worker verwaltet ausschließlich Cache-Namen mit `lesedetektive-offline-` und Dateien innerhalb dieser App.

Bei künftigen Veröffentlichungen Versionsnummer in `sw.js`, `pwa.js` und `version.json` gemeinsam erhöhen. Im installierten Spiel die Startseite öffnen und „Aktualisieren“ wählen.

## Hochformat und Zoom

Die Arbeitsflächen passen im Hochformat ihre Breite, Mindesthöhe, Abstände und Schriftgrößen an den Bildschirm an. Längere Inhalte können weiterhin gescrollt werden. Die Anpassungen sind auf `orientation: portrait` begrenzt; die Querformat-Regeln bleiben erhalten. Browserzoom und die bestehenden Touch-Einstellungen werden nicht eingeschränkt. Installierte App: neue Gestaltung über „Aktualisieren“ übernehmen (Version 2026.11.01.2).

## Eröffnungsbild

Die gelieferte Illustration „Lesen und suchen Hintergrund.png“ liegt als unverändertes Original unter `assets/startbildschirm.png` (1792 × 2688 Pixel). Sie erscheint in der Profilauswahl und auf der Startseite. Im Querformat sind Bild und Bedienung nebeneinander angeordnet; im Hochformat steht der wichtige obere Bildbereich über der Auswahl. Kopf/Krone, Lupe und Schild bleiben frei von Bedienelementen. Der helle Originalhintergrund wird bis zum Bildschirmrand fortgeführt. Das Bild wird proportional dargestellt, nicht verzerrt oder neu komprimiert; das Offline-Paket enthält das Original. Extremes Vergrößern kann die tatsächliche Rasterauflösung nicht erhöhen. Version 2026.11.01.4.
