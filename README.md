# Ella Frontend
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/educorvi/ella_frontend)](https://github.com/educorvi/ella_frontend/releases/latest)
![Build](https://github.com/educorvi/ella_frontend/actions/workflows/node.js.yml/badge.svg)
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
- Das Logo kann ersetzt werden, indem man die Datei ``src/assets/logo.png`` überschreibt. Das Bild sollte mindestens 512x512 Pixel groß sein.
- Sollte das Logo ersetzt worden sein, muss anschließend der Befehl ``npm run generateIcons`` ausgeführt werden, um die benötigten Icons aus dem Logo zu generieren.

Bearbeiten der Datei ``src/styles.scss``:  
Hier können tiefergehende stilistische Änderungen vorgenommen oder auch ganze neue Themes z. B. von [Bootswatch](https://bootswatch.com/) eingebunden werden. 
### Production Build
```
npm run build
```

### Komponentendokumentation
[https://educorvi.github.io/ella_frontend](https://educorvi.github.io/ella_frontend/)
