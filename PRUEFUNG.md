# Prüfung vom 8. November 2026

Die Aufgaben, Wortdaten, Trefferflächen und Blütenregeln bleiben unverändert.
Normale Runden bringen bei vollständigem Abschluss 1/2/3 Blüten für 10/15/20 Aufgaben. Fehlversuche lösen keine Aufgabe. Bei der Bildsuche zählt die gesamte Karte. Zeitrunden laufen beim Verlassen weiter.

## Änderungen und Handytest

- Je Profil und Spiel bleibt eine laufende Runde erhalten. Spielauswahl öffnen oder App schließen, dasselbe Profil und Spiel auswählen, „Runde fortsetzen“ tippen.
- Reihenfolge, aktuelle Aufgabe, Fehlversuche, bereits gefundene Bildobjekte und ich/ach-Frage bleiben erhalten. Ein neues „Los!“ ersetzt die gespeicherte Runde desselben Spiels. „Runde beenden“ beendet sie ausdrücklich.
- Zeitrunden berücksichtigen die verstrichene Zeit auch nach dem Schließen. Eine abgelaufene Minutenrunde wird beim Fortsetzen abgeschlossen. Technische Bildladepausen werden ausgenommen.
- Das Spielmenü ist beim Start geschlossen und verdeckt die Aufgabe nicht mehr. „Meine Fortschritte“, „Runde auswählen“ und „Runde fortsetzen“ bezeichnen dieselben Aktionen an den jeweiligen Stellen.
- „Gelesen – Bild öffnen“ erklärt den Übergang vom Text zum Suchbild.
- Die Offline-Versionsnummer wurde erhöht, damit installierte Web-Apps das neue Paket erhalten können.

## Offline

Das vorhandene Service-Worker-Paket enthält alle Spielskripte, Bilder, Einführungsfilme und Fortschrittsdateien. Erst nach der Meldung „auch ohne Internet bereit“ den Flugmodus einschalten. Alle drei Spiele, Profilwechsel, Ergebnisse und erneutes Öffnen testen. Vorlesen benötigt eine auf dem Gerät verfügbare deutsche Systemstimme; ein Web-Speech-Aufruf garantiert keine Offline-Stimme. Profile und Spielstände sind gerätelokal; Löschen der Browser-/Appdaten entfernt sie.

## Android / Play Store

Eine Android-App ist aus dieser statischen Web-App schlüssig mit einem Wrapper wie Capacitor baubar. Für garantierten Erststart ohne Netz müssen alle Dateien im App-Paket liegen. Es gibt derzeit kein Android-Projekt, keinen Gradle-Build und kein signiertes AAB im Repository. Vor einer Store-Veröffentlichung fehlen insbesondere Paketkennung, Versionierung, Signierung, native Zurück-/Lebenszyklusprüfung, Android-Gerätetests sowie Datenschutzerklärung, Angaben zur Datensicherheit und Zielgruppe/Familienrichtlinien. Das Webmanifest und die Browserinstallation allein erzeugen keine Play-Store-App.

## Grenzen der Prüfung

Automatisierte Chromium-Tests prüfen mobile Layouts und Speicher-/Navigationsabläufe. Ein echtes Android-Gerät, die Zuverlässigkeit seiner Offline-Stimme und eine Play-Store-Freigabe sind damit nicht geprüft. Für Zweitklässler sind die großen Ziele und die getrennten Leseschritte passend; die Variantenwahl bleibt relativ textreich und sollte im Praxistest mit einem Kind beobachtet werden.
