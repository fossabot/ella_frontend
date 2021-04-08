# Ella Frontend
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/educorvi/ella_frontend)](https://github.com/educorvi/ella_frontend/releases/latest)
[![Build](https://github.com/educorvi/ella_frontend/actions/workflows/node.js.yml/badge.svg)](https://github.com/educorvi/ella_frontend/actions/workflows/node.js.yml)
[![GitHub issues](https://img.shields.io/github/issues/educorvi/ella_frontend)](https://github.com/educorvi/ella_frontend/issues)
## Project setup
```
npm install
```

### Configuration
#### Grundeinstellungen
Die Grundeinstellungen können auf zwei Weisen festgelegt werden. Entweder durch den Konfigurator, der automatisch während des Installationsprozesses startet, oder durch Kopieren der Datei `config/ella.config.example.js` nach `config/ella.config.js` und anschließendes manuelles Bearbeiten der letzteren Datei.
[Hier mehr Details zu den Einstellungen](https://educorvi.github.io/ella_frontend/module-config.html).  
Der Konfigurator kann durch Löschen von `config/ella.config.js` und anschließendes Ausführen von `npm run createSettings` neu gestartet werden.  
Ein Beispiel befindet sich in `config/ella.config.example.js`.
  
Änderung des Logos
- Das Logo kann ersetzt werden, indem man die entsprechenden Dateien überschrieben werden. Die Bild sollte mindestens 512x512 Pixel groß sein.
  - Generelles Logo der App: ``src/assets/AppLogo.png``
  - Logo für die Navbar: ``src/assets/HeadLogo.png``
- Sollte das AppLogo ersetzt worden sein, muss anschließend der Befehl ``npm run generateIcons`` ausgeführt werden, um die benötigten Icons aus dem Logo zu generieren.

#### Styling
Im Ordner ``src/theme`` befinden sich nach der Installation die Dateien ``variables.scss`` und ``theme.scss`` in der entsprechend Variablen hinzugefügt und überschrieben werden können, sowie ein Änderungen am Theme gemacht werden können.

Sollte der Ordner ``src/theme`` gelöscht worden sein, muss er mit ``npm run theme:init`` wieder initialisiert werden. Weiterhin gibt es auch einige weitere Befehle zur Theme-Verwaltung, hier eine Übersicht:
``` bash
npm run theme:init     #Initialisiert den Theme Ordner
npm run theme:select   #Stellt alle bereitgestellten Themes zur Auswahl und installiert das gewählte
npm run theme:update   #Updated ein mittels 'npm run theme:select' installiertes Theme
npm run theme:install  #Installiert ein Theme von einer URL, die auf eine zip Datei zeigt
```

Neue Themes können zur Auswahl bereitgestellt werden, indem sie als Repository in der Educorvi Organization auf Github veröffentlicht werden. Hierbei muss der Name des Repositorys dem Schema ``ef_theme-<name>`` entsprechen. Es wird immer der neueste Release heruntergeladen.
### Production Build
```
npm run build
```

### Komponentendokumentation
[https://educorvi.github.io/ella_frontend](https://educorvi.github.io/ella_frontend/)
