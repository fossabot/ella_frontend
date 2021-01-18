# ella
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/educorvi/ella_frontend)](https://github.com/educorvi/ella_frontend/releases/latest)
[![Build Status](https://jenkins.jp-studios.de/job/ella_frontend/job/master/badge/icon)](https://jenkins.jp-studios.de/blue/organizations/jenkins/ella_frontend/branches/)
[![GitHub issues](https://img.shields.io/github/issues/educorvi/ella_frontend)](https://github.com/educorvi/ella_frontend/issues)
## Project setup
```
npm install
```

### Configuration
Bearbeiten der Datei `config/ella.config.js`:
- Titel der App (verwendet für ServiceWorker und Tableiste): ``TITLE``
- URL des API-Roots: ``API_ROOT_URL``
- ID der Instanz: ``INSTANCE_ID``
- Theme Color (Hauptfarbe der Anwendung, ersetzt unter anderem Bootstraps $primary Variable): ``THEME_COLOR``
- Für alle Einstellungen siehe Dokumentation in der Datei selbst
  
Änderung des Logos
- Das Logo kann ersetzt werden, indem man die Datei ``src/assets/logo.png`` überschreibt. Das Bild sollte mindestens 512x512 Pixel groß sein.
- Sollte das Logo ersetzt worden sein, muss anschließend der Befehl ``npm run generateIcons`` ausgeführt werden, um die benötigten Icons aus dem Logo zu generieren.

Bearbeiten der Datei ``src/styles.scss``:  
Hier können tiefergehende stilistische Änderungen vorgenommen oder auch ganze neue Themes z. B. von [Bootswatch](https://bootswatch.com/) eingebunden werden. 
### Production Build
```
npm run build
```
