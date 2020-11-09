# ella

## Project setup
```
npm install
```

### Configuration
Bearbeiten der Datei `.env`:
- Titel der App (verwendet für ServiceWorker und Tableiste): ``VUE_APP_TITLE``
- URL des API-Roots: ``VUE_APP_API_ROOT_URL``
- ID der Instanz: ``VUE_APP_INSTANCE_ID``
- Theme Color (Hauptfarbe der anwendung, ersetzt unter anderem Bootstraps $primary Variable): ``VUE_APP_THEME_COLOR``

Bearbeiten der Datei ``src/styles.scss``:  
Hier können tiefergehende stilistische Änderungen vorgenommen oder auch ganze neue Themes z. B. von [Bootswatch](https://bootswatch.com/) eingebunden werden. 
### Production Build
```
npm run build
```
