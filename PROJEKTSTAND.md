# Z2 – Lesedetektive

Dokumentationsstand: **01.11.2026** · veröffentlichte Web-App: **2026.11.01.5**

Die frühere Projektbezeichnung **Buchstaben-Detektive** wird unter der bestehenden Kennung **Z2** als **Lesedetektive** fortgeführt. Es handelt sich um eine eigenständige App mit zwei Spielen. Sie wurde nicht in die große Spielesammlung integriert. Deren Profilauswahl diente als Gestaltungs- und Funktionsreferenz.

| Bezug | Aktueller Stand |
|---|---|
| Spieladresse | https://hamthor-web.github.io/lesedetektive/ |
| Repository | https://github.com/hamthor-web/lesedetektive |
| Branch | main |
| Maßgeblicher Spielcode | main, App-Version 2026.11.01.5 |
| Versionsdatei | version.json: 2026.11.01.5; gleiche Versionsnummer in pwa.js und sw.js |
| Veröffentlichung | GitHub Pages, Aufbau erfolgreich; Repository und Seitenstatus für diese Dokumentation zurückgelesen |
| Plattform | Installierbare Web-App mit Offline-Paket; keine APK-/App-Store-Veröffentlichung |

Der genannte Commit bezeichnet den letzten Spielcode-Stand. Eine nachfolgende reine Dokumentationsaktualisierung verändert diese Spielversion nicht.

## Erweiterung Ei/ie · Version 2026.11.01.5

Die freigegebene Arbeitsfassung wurde aus `Ei_Ie_Arbeitsfassung_Sicherung.json` übernommen. Die 14 neuen Karten folgen als Karten 11–24 auf die bisherigen zehn Karten. Insgesamt: **24 Bilder, 82 Trefferflächen und 25 ausdrücklich gesetzte Sternpositionen**. Die neuen 48 Flächen und elf Sternpositionen bleiben unverändert. Bilder sind bytegleich als separate Dateien gespeichert. Der Editor bleibt in der getrennten Arbeitsfassung.

Bereits abgeschlossene Zehner-Runden setzen bei Karte 11 fort. Laufende Spielstände bleiben erhalten. Alle 24 Bilder sind im Offline-Paket enthalten. Nach der Veröffentlichung auf der Startseite „Aktualisieren“ wählen und den vollständigen Download abwarten.

| Neue Karte | Lesetext | Suchwörter |
|---|---|---|
| 11 | Die kleine Ziege spielt mit einem Stein. | Ziege, Stein |
| 12 | Ein feines Schwein liegt auf der weiten Wiese. | Schwein, Wiese |
| 13 | Die Biene fliegt mit einem zweiten Eis nach Hause. | Biene, Eis, Haus |
| 14 | Sieben Ameisen ziehen einen riesigen Käse im Kreis. | Sieben Ameisen, Käse, Kreis |
| 15 | Ein Riese niest nie in einen kleinen Eimer. | Riese, Eimer |
| 16 | Meine Katze schiebt die Seife unter die Liege. | Katze, Seife, Liege |
| 17 | Die kleine Fliege reist auf einer Banane. | Fliege, Banane |
| 18 | Ein Ei spielt mit vier Bienen Fußball. | Ei, Vier Bienen, Fußball |
| 19 | Die Ziege leiht dem Schwein einen Hut. | Ziege, Schwein, Hut |
| 20 | Mein Knie sieht wie ein Spiegelei aus. | Knie, Spiegelei |
| 21 | Auf diese Weise liegt der weiße Ball auf einer Wiese. | Weißer Ball, Wiese |
| 22 | Viele Fliegen fliegen fleißig auf der Seite. | Fliegen, Seite |
| 23 | Das Schwein ist fein rein und kommt zur Tür herein. | Schwein, Tür |
| 24 | Die Ziege trägt ein Kleid aus Seide und hüpft auf die andere Seite. | Ziege, Seidenkleid |

Übernahme-Nachweis mit Quellenprüfsumme: `EI_IE_UEBERNAHME.json`. Alle vier automatisierten Prüfprogramme wurden für diese Erweiterung erneut erfolgreich ausgeführt; sie prüfen insbesondere die unveränderten Daten beider Kartensätze, alle 82 Treffer und die Wiederaufnahme alter und neuer Spielstände. Reale Geräteprüfungen bleiben offen.

## 1. Lesen und im Bild suchen

24 Lesekarten und 24 zugeordnete Illustrationen sind eingebaut. Zuerst erscheint die Lesekarte. Erst nach dem Button **„gelesen“** wird das Suchbild sichtbar. Über den farbigen Kästchen steht **„Suche“**; das gelb hervorgehobene Kästchen bezeichnet das aktuell gesuchte Element, gefundene Elemente werden grün. Der frühere sichtbare Suchhinweis unter dem Bild ist entfernt; eine Rückmeldung für Vorlesehilfen bleibt erhalten.

Die Nutzerin hat die Trefferflächen und Endpositionen der Sterne selbst bearbeitet und als Sicherungen übergeben. Der veröffentlichte Stand enthält **82 Trefferflächen**, davon **25 mit ausdrücklich gespeicherter Sternposition**; die übrigen Sterne verwenden die Feldmitte. Richtige Treffer lösen einen großen gold-weißen Funkenregen aus. Anschließend bleibt ein goldener Stern an der festgelegten Stelle stehen. Ein Objekt wird nicht mehrfach gezählt. Nach 24 Karten erscheint ein Abschluss mit „Noch eine Runde“.

| Karte | Inhalt | Suchaufträge |
|---|---|---|
| 1 | Teich – Tisch | Teich, Tisch, Frosch |
| 2 | Biene – Beine | Biene, Beine, Blume |
| 3 | Die Ziege zieht einen Wagen am Seil. | Ziege, Wagen, Seil |
| 4 | Ei – Eis | Ei, Eis |
| 5 | Acht kleine Schweine spielen im Schnee. | Acht Schweine, einzeln zählen |
| 6 | Seil – Sieb | Seil, Sieb, Maus |
| 7 | Drei Bienen fliegen über die Wiese. | Drei Bienen, einzeln zählen; Wiese |
| 8 | Riese – Reise / Der Riese macht eine Reise. | Riese, Koffer, Auto |
| 9 | Fiep – Feip / Der Fiep sitzt auf einem Stein. | Fiep, Stein |
| 10 | Mini-Geschichte mit Mia, Fisch, Sieb und Eis | Fisch, Sieb, Eis |

**Verbindliche Bildentscheidungen:** Das eigene Schweinchenbild der Nutzerin bleibt auf Karte 5; der Text wurde ausdrücklich von sieben auf **acht Schweine** geändert. Das ausgewählte eigene Bienenbild bleibt auf Karte 7. Karte 2 verwendet die zuletzt gelieferte Fassung **„Biene-Beine für Wortdetektive.png“**, um die Verwechslungsgefahr durch viele Blumen zu verringern. Klickflächen und Sternpositionen wurden bei diesem Bildtausch übernommen. Die übrigen acht Illustrationen stammen aus **Buchstaben_Detektiv_10_Grundbilder.zip**. Die frühere Dokumentationslücke zu fehlenden Bildern ist damit für den aktuellen Stand erledigt.

**Kein Editor im Spiel:** Editor, Kartenauswahl und JSON-/HTML-Sicherungen sind vollständig aus der veröffentlichten Bildsuche entfernt. Die getrennte lokale Bearbeitungsvorschau bleibt erhalten. Die Datei `Buchstaben-Detektive_Vorschau_2026-11-01/START_Spielvorschau_Neues_Biene_Beine_Bild.html` enthält weiterhin den Editor und die ursprünglichen zehn Bildkarten mit ihren Trefferflächen und Sternpositionen; dieser Datenabgleich wurde für die Dokumentation bestätigt. Sie ist eine separate Arbeitsdatei und kein Bestandteil der Kinderoberfläche.

## 2. Was zischt denn da?

Die Schreibweise **„Was zischt denn da?“** gilt für Startseite, Übungsauswahl, Spielkopf, Seitentitel und die Beschriftung der Videobegrüßung.

- **CH oder SCH? – Wörter sortieren:** 59 unterschiedliche Wörter werden den Gruppen Ich-Laut, Ach-Laut oder SCH zugeordnet. Optionale Browser-Sprachausgabe. Fehlversuche sind korrigierbar.
- **Wie klingt es? / ich oder ach?:** 20 Wortpaare, einschließlich der 15 Paare aus der übergebenen Word-Datei **„15 Wortpaare mit Ach.docx“**. Pro Aufgabe wird zufällig nach dem Klang wie in **„ich“** oder **„ach“** gefragt. Bei einem Fehlversuch bleibt die Frage gleich. Vorhandene fünf Beispielsätze sind erhalten; zu den neuen Paaren wurden keine Sätze erfunden.

Die 15 ergänzten Paare: Strauch/Sträucher, flach/Fläche, Fach/Fächer, Nacht/Nächte, acht/echt, wachen/Wächter, lachen/lächeln, Sprache/sprechen, schwach/schwächer, wach/weich, Rauch/räuchern, Tuch/Tücher, Kuchen/Küche, brauchen/Bräuche, kochen/Köche.

Direkt unter **„Lies beide Wörter.“** steht der aktuell freigegebene Hinweis:

> Die Buchstaben **ch** bleiben gleich. Lies dann den Text darunter.

Bei den Wortpaaren gibt es keinen Weiter-Button. Nach einer richtigen Antwort erscheint animiert auf neutralem Hintergrund eine Bestätigung aus: **Prima!**, **Gut gemacht!**, **weiter so**, **Richtig!**, **Klasse!**, **Toll!**, **weiter gehts!**, **Gut erkannt!**. Die Formulierungen werden in gemischten Durchläufen verwendet, innerhalb eines Durchlaufs ohne Wiederholung. Nach ungefähr drei Sekunden folgt die nächste Aufgabe automatisch; **„Überspringen“** wechselt sofort. Ein Abbruch verwirft den ausstehenden Übergang. Nach dem letzten Paar erscheint der Abschluss. Die separate Sortierübung behält ihren bisherigen Weiter-Ablauf.

## 3. Startseite, Bild und Begrüßungsvideos

Die gemeinsame Startseite bietet die beiden Spiele an. Beim Start einer Kategorie erscheint das zugehörige, unverändert gelieferte Würstchenvideo. **Das letzte Videobild bleibt drei Sekunden stehen**, danach öffnet sich das Spiel automatisch. „Überspringen“ führt sofort weiter. „Spielauswahl“ bzw. Escape schließt das Video. Wenn der Browser den Start blockiert, erscheint „Video starten“. Dunkler Videohintergrund und schwarze native Bedienleiste wurden entfernt.

| Material | Verwendung |
|---|---|
| Würstchenanimation Lesen und suchen.mp4 | assets/intro-lesen.mp4, Einstieg in die Bildsuche |
| Würstchenanimation Was zischt den da.mp4 | assets/intro-zischlaute.mp4, Einstieg in die Lautübungen; historischer Dateiname unverändert |
| Lesen und suchen Hintergrund.png | assets/startbildschirm.png; aktueller Eröffnungshintergrund, **1792 × 2688 Pixel** |

Die zuerst verwendete kleinere Datei „Lesen und suchen Startbildschirm.png“ mit 1024 × 1536 Pixeln ist durch die zuletzt gelieferte höhere Auflösung ersetzt. Das neue PNG wurde unverändert kopiert; die Datei-Hashes von Quelle und App-Datei stimmen überein.

Das Bild erscheint in Profilauswahl und Startseite. Im Querformat stehen Bild und Auswahl nebeneinander, im Hochformat liegt der wichtige obere Bildbereich über der Auswahl. Kopf/Krone, Lupe und Schild bleiben sichtbar und werden nicht von Bedienelementen verdeckt. Die helle Originalfarbe füllt die übrige Bildschirmfläche. Keine Verzerrung, keine zusätzliche Bildkompression; starker Zoom bleibt durch die tatsächliche Rasterauflösung begrenzt.

## 4. Profilauswahl, Spielstände, Installation und Aktualisierung

„Wer spielt heute?“ mit Profilliste und „Profil anlegen“ wurde nach der Vorlage der großen Spielesammlung in den Farben der Lesedetektive umgesetzt. Es handelt sich um **lokale Profile ohne Passwort oder Onlinekonto**. Kindernamen und Fortschritte werden nicht an einen Profilserver übertragen. Jedes Profil hat eigene Spielstände in beiden Spielen; einzelne Bildtreffer und aktuelle Lautaufgaben können wiederaufgenommen werden. Auf der Startseite ist „Profil wechseln“ verfügbar.

Die Daten bleiben im Browser-/Appspeicher dieses Geräts. Es gibt keine automatische geräteübergreifende Synchronisierung. Löschen der Browser-/Appdaten entfernt diese Daten. Bei gesperrtem Speicher ist Spielen für die aktuelle Sitzung möglich. Speicher- und Cache-Namen sind von den anderen Lesespiel-Apps getrennt.

**Installieren:** Unterstützte Android-/Desktop-Browser öffnen den Installationsdialog über den App-Button, sobald er bereitsteht. Auf iPhone/iPad bleibt Apples Schritt **Safari → Teilen → Zum Home-Bildschirm → Hinzufügen** erforderlich; der Button erläutert ihn. Kein Versprechen einer Installation ohne Betriebssystembestätigung. Die App ist keine veröffentlichte APK oder Store-App.

**Aktualisieren:** Der Button prüft neue Fassungen und übernimmt eine fertig geladene Aktualisierung nach bewusster Betätigung. Profile und Fortschritte werden dabei nicht gelöscht. Nach dem ersten vollständigen Download steht ein Offline-Paket einschließlich Spielen, Bildern und Videos bereit. Offline-Videos unterstützen Teilabrufe. Der Service Worker verwaltet nur Dateien und Caches dieser App.

Bei späteren Spielcode-Änderungen die Versionsnummern in `version.json`, `pwa.js` und `sw.js` gemeinsam erhöhen. Reine Dokumentationsänderungen erfordern keine neue App-/Cacheversion.

## 5. Hochformat, Querformat und Zoom

Die Arbeitsflächen im Hochformat verwenden größere Wörter und Schaltflächen, mehr Abstand und eine bessere Verteilung über die verfügbare Höhe. Längere Inhalte bleiben scrollbar. Die Arbeitsflächen-Anpassungen gelten nur für Hochformat; die zuvor von der Nutzerin als passend gemeldete Querformat-Darstellung auf Android-Tablet und iPad bleibt erhalten. Die Eröffnungsseite hat zusätzlich die oben beschriebene eigene Bildanordnung je Ausrichtung.

Die bestehende Zoomfunktion wurde nicht eingeschränkt: keine Sperre durch `user-scalable=no` oder `maximum-scale`, keine neu eingeführte Touch-Blockierung. Die Bildsuche behält ihre vorhandenen Touch-Einstellungen.

## 6. Nachweise und Grenzen der Prüfung

Automatisierte Prüfungen im maßgeblichen Spielcode-Stand bestanden:

- `tests/check.cjs`: beide Spiele, unveränderte Bild-/Treffer-/Sternpositionsdaten, alle 82 Treffer, Bildfreigabe, 59 Sortierwörter, alle 20 Paare in beiden Fragerichtungen, Bestätigungen, Timer/Überspringen, Abschluss, Verlinkung und profilbezogene Wiederaufnahme.
- `tests/intro.cjs`: Videozuordnung, drei Sekunden Schlussbild, Ende/Überspringen/Abbruch, blockierte Wiedergabe und Ladefehler.
- `tests/platform.cjs`: Profilanlage und -wahl, getrennte Fortschritte, gesperrter Speicher, Installationsereignis, iPhone-Anleitung und kontrollierte Aktualisierung.
- `tests/offline.cjs`: Dateien des Offline-Pakets, Navigation ohne Netz, Video-Teilabrufe und Schutz der Caches anderer Apps.

Auf der veröffentlichten Seite wurden in den vorausgegangenen Arbeitsschritten zusätzlich Profilauswahl, Aktualisieren, Offline-Bereitmeldung, Videostart und Übergang, Bildfreigabe, Lautübungen, Rückmeldungen und automatischer Aufgabenwechsel beobachtet. Hochformat-Messungen erfolgten unter anderem bei 390 × 844 und 820 × 1180, Querformat bei 1280 × 720 bzw. 1180 × 820. Das aktuelle Hintergrundbild wurde mit seiner tatsächlichen Auflösung im Browser bestätigt und die wesentlichen Bildteile wurden in beiden Ausrichtungen geprüft.

Für die Ei/ie-Erweiterung wurden alle vier Prüfprogramme erneut erfolgreich ausgeführt. Die früheren Browserbeobachtungen belegen die Grundfunktionen; die neue Erweiterung wird zusätzlich über Datenabgleich und simulierte Spieleingaben geprüft.

**Weiter offen:** vollständige Installation auf realem Android und iPhone/iPad, tatsächlicher Offline-Neustart nach Installation, Prüfung mit echten Geräten einschließlich Touch/Pinch-Zoom und Sprachausgabe sowie didaktische/redaktionelle Endfreigabe. Die Rückmeldung der Nutzerin zum passenden Querformat ist ein Nutzungsbericht, kein vollständiger geräteübergreifender Testnachweis.

## 7. Aufgabenstand Z2

| Aufgabe | Stand | Bedeutung |
|---|---|---|
| BD-01 – Materialien und Quellstand zuordnen | Für den aktuellen Stand erledigt | Alle 24 Bilder, aktuelle Sicherungen und Repository zugeordnet. Eine lückenlose ursprüngliche Chat-Historie wurde damit nicht rekonstruiert. |
| BD-02 – Fortführung/Einsatz entscheiden | Erledigt für diese App | Eigenständige Weiterentwicklung und Veröffentlichung ausdrücklich beauftragt und umgesetzt. Keine Integration in die große App beschlossen. |
| BD-03 – Reale Geräte-/Installationsprüfung | Offen | Android und iPhone/iPad: installieren, aktualisieren, offline neu starten, Touch/Zoom und Vorlesen prüfen; Profile erhalten. |
| BD-04 – Inhaltliche Endfreigabe | Offen | Lesetexte, Lautzuordnungen, Bilder, Trefferflächen und Sternpositionen in einem vollständigen Durchlauf abnehmen. |

Die Verwendung der beiden gelieferten Würstchenvideos ist für diese App umgesetzt. Daraus folgt kein neuer allgemeiner Weiterentwicklungsauftrag für das übergreifende Maskottchenprojekt.

## 8. Quellen und Einordnung

Grundlagen sind die Nutzerentscheidungen und bereitgestellten Materialien dieses Entwicklungsverlaufs, der referenzierte Chat „Bildzuordnungssätze auflisten“ (6ae63cfd-8698-83eb-a023-addf8092b227), die vorhandene CH-/SCH-Testversion, die beiden nutzerbearbeiteten JSON-Sicherungen, das Grundbilder-ZIP, die einzeln gewählten Bilddateien, die Word-Wortpaare und die beiden MP4-Dateien. Die Verwaltungsgrundlage für die Einordnung in die Gesamtübersicht ist `Lesespiele_Projektverwaltung_90_Saetze_3_Bildpakete_2026-10-31.zip`.

Aktueller lokaler Pflegeort des Spielcodes ist `lesedetektive/`. Die neue Gesamtverwaltung schreibt Z2 fort und erhält die anderen 17 Mastereinträge und deren Materialien. Deren technische Stände wurden in dieser Runde nicht neu geprüft. Ältere Projektakten und Vorschauen bleiben als Historie erhalten; sie haben bei den hier ausdrücklich aktualisierten Punkten keinen Vorrang vor diesem Stand.
