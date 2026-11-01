# Z2 – Lesedetektive · 01.11.2026

Zusammengeführte eigenständige App mit zwei Spielen und gemeinsamer Startseite. Repository: https://github.com/hamthor-web/lesedetektive. Kein Zusammenhang mit einem Auftrag zur Integration in die große Spielesammlung.

Bestätigt: zehn Bildkarten; Karte 5 acht Schweine; Karte 7 drei Bienen; Karte 2 neues Biene–Beine-Bild. Gespeicherte 34 Trefferflächen und individuelle Sternpositionen unverändert übernommen. Suchbild bis „gelesen“ verborgen. Funkenregen und bleibender Stern erhalten. Der Editor bleibt in einer getrennten lokalen Bearbeitungsvorschau; die veröffentlichte App enthält keine Bearbeitungs- oder Sicherungswerkzeuge.

Zweites Spiel: CH/SCH-Sortierung mit 59 Wörtern und 20 CH-Wortpaaren als weitere Übung. Alle vorhandenen Lautübungen bleiben zugänglich. Historische Symbol-Bildsuche wird nicht als zusätzliches Spiel angeboten.

BD-01: Material für aktuelle Fassung zusammengeführt. BD-02: Veröffentlichung im oben genannten eigenständigen Repository durch Nutzerauftrag freigegeben. BD-03: vollständige Geräte-/Touch-/Vorlesestimmenprüfung und didaktische Endfreigabe weiter offen.

## CH-Erweiterung

15 Wortpaare aus der bereitgestellten Word-Datei hinzugefügt; insgesamt 20 Paare und 59 Sortierwörter. Abfrage zufällig nach Ich- oder Ach-Laut, passende Antwortauswertung und Rückmeldung.

## Profilauswahl und installierbare Web-App

Auf ausdrücklichen Folgeauftrag Profilauswahl der großen Spielesammlung geprüft und in angepasster Gestaltung übernommen. Geprüfte Referenzdateien: home.html (Profil-Overlay und lokale Profilverwaltung), index.html, spieler.html, native-runtime.js, web-install.js/.css, web-update.js, manifest.webmanifest, sw.js. Die große App selbst wurde nicht verändert und keine Profile aus ihr automatisch übernommen.

Implementiert: eigene lokale Profile und profilgetrennte Wiederaufnahme beider Spiele; Installieren-/Aktualisieren-Buttons auf der Auswahl und im Profilbildschirm; Manifest, App-Symbole, eigener Service Worker und vollständiges Offline-Paket einschließlich Videobereichsabrufen. Eigenständige Speicher-/Cache-Namen verhindern Eingriffe in andere Apps derselben Domain. Keine APK-/App-Store-Veröffentlichung.

Plattformgrenze: unterstützte Android-/Desktop-Browser erlauben den direkten Installationsdialog nach Buttonklick; iPhone/iPad erfordern weiterhin Apples „Zum Home-Bildschirm“-Bestätigung. Der Button bietet dafür die Anleitung. Allgemeine Installation ohne Browser-/Betriebssystembestätigung wird nicht behauptet.

Automatisiert geprüft: Profilerstellung/-wechsel, getrennte Speicher, gesperrter Speicher, Spielfortschritte, Installationsdialog und iOS-Anleitung, Updateaktivierung, Offline-Routen und Video-Teilabrufe. Vollständige reale Android-/iPhone-Installation sowie Gerätetest bleiben offen.
