### 5.6.2015
Erste Versuche mit `y.js`(https://dadamonad.github.io/yjs/tutorial/):
client1:
```php
<script src="./y.js"></script>
<script src="./y-xmpp/y-xmpp.js"></script>
<script>
	// Connect to our testing server, and join an XMPP multi user chat room.
	var connector = new Y.XMPP().join("ehtttt");
	var y = new Y(connector);
	// set a property
	y.val("name",42)
	// retrieve a property
	console.log(y.val("name")) // => 42
	// retrieve all properties of y
	setInterval( function() {
			console.log(y.val()) // => {name: 42}
		}, 1000);
</script>
```
client2:
```php
<script src="./y.js"></script>
<script src="./y-xmpp/y-xmpp.js"></script>
<script>
	var connector = new Y.XMPP().join("ehtttt");
	var y = new Y(connector);
	y.val("name",80)
	console.log(y.val("name")) // => 80
</script>
```
Zuerst client1 starten (`sudo php ...`), dann client2 und Konsole beobachten: Funktioniert!

`y-js` ist modular aufgebaut und es lohnt sich sehr wahrscheinlich, es mit `Node.js` zu verwenden.

Dafür wird `npm` und `bower` verwendet. 


##### `npm`

`npm` ist bundled mit `node`, also reicht Installation von `node`.

https://docs.npmjs.com/getting-started/what-is-npm
Nicht ausreichend:
```bash
sudo chown -R adabru /usr/local/
```
Funktioniert nicht in meinem Setup. Z.B Versuch, `npm` zu updaten:
```bash
npm install npm -g
```
zeigt `Error: EACCES, mkdir '/usr/lib/node_modules'`. Ich werds so lassen, wie es momentan ist.
Die `-g` Option installiert Packages global, während ohne diese Option in den aktuellen Ordner installiert wird. `npm` gebraucht den Ordner `node_modules/` und die Datei `package.json`.
Um installierte Packages festzuhalten, kann man folgendes machen:
- `packge.json` erzeugen mit Inhalt:
	```json
    {
    	"name": "adabru-app",
        "version": "0.1"
    }
    ```
- Die festzuhaltenden Packages installieren mit
	```bash
    npm install lodash --save
    ```
- Jetzt kann man alle Packages zusammen installieren mit
	```bash
    npm install
    ```
- Zum Updaten verwendet man
	```bash
    npm update
    ```
    Um das Update zu testen:
    ```bash
    npm outdated
    ```

##### `bower`

Fast das gleiche wie `npm`, mit dem einzigen größeren Unterschied, dass die Packages statt
```
project root
[node_modules] // default directory for dependencies
 -> dependency A
 -> dependency B
    [node_modules]
    -> dependency A

 -> dependency C
    [node_modules]
    -> dependency B
      [node_modules]
       -> dependency A 
    -> dependency D
```
so verwaltet werden:
```
project root
[bower_components] // default directory for dependencies
 -> dependency A
 -> dependency B // needs A
 -> dependency C // needs B and D
 -> dependency D
```
Dadurch entstehen Konflikte bei Versionsunterschieden, allerdings vebraucht das weniger Speicher. `bower` ist einzig auf Frontendentwicklung ausgerichtet.
http://bower.io/

##### Aktueller Stand

Stand bis jetzt der Synchronisation:
- `init-subsite.js`
    Name|Aufgabe
    ---|---
    `subscribeIWC(topic, callback)`|Registriert eine IWC-Message bei Role
    `publishIWC(topic, content)`|Sendet eine Message an Role und damit an alle Widgets in diesem Raum
    `receiveMessage(event)`|Bearbeitet Eintritt in den Lernraum, leitet das `event` sonst an Callbacks weiter
    Kümmert sich um die bei Eintritt in den Lernraum empfangenen Nachrichten, gibt ein Lebenszeichen an die anderen und verwaltet die Referenzen auf die Callbacks für die einzelnen IWC-Messages in `subscribeCallbacks = new Map();`
- `model-viewer-widget.js`
    Name|Aufgabe
    ---|---
    `initWidget()`|keine
    `receiveModelSelectedByOverview(msgContent)`|Lade das Modell in den Viewer, welches in `msgContent` angegeben ist
    `initWidget` wird von `model_viewer.php` ausgeführt, `receiveMo...iew` wird als IWC-Message registriert.
- `viewer.js`
	Name|Aufgabe
    ---|---
	`getParameterByName(name)`|Query Parameter aus der URL
	`onReloadRequest()`|"Function for reloading synchronously with other widgets"
    `onUserConnected(extras)`|"Function for initial state sync from other clients"
    `initializeModelViewer()`|"Sets up the X3D viewport and subscribes to mouse callbacks for propagating changes."
    `onKeyDown(e)`|Debuggingzweck
    `onUserConnected(message)`|Benachrichtigt neue User über aktuelle View
    `onRemoteUpdate(extras)`|Synchronisiert View mit Änderung eines anderen Clients
    `onLocalUpdate()`|Sendet eigene Position an andere Clients
    `viewpointChanged(evt)`|`x3dom`-EventListener, ruft `onLocalUpdate()` in einem Callback auf
    `log(message)`|Debugzweck
    `receiveModelSelectedByOverview(msgContent)`|Lade das Modell in den Viewer, welches in `msgContent` angegeben ist
    `synchronizePositionAndOrientation()`|Setzt `x3dom`-View auf zuletzt erhaltene Werte
   `savePositionAndOrientation()`|Speichert aktuelle View zwischen
   `finishedSettingView()`|Callback aufgerufen, wenn die Bewegung zu einer View beendet ist ("interpolation")
   `onRemoteLecturerMode(extras)`|Setzt Lecturer-Mode, verändert den Button und setzt das Flag
	`toggleLecturerMode()`|`onclick`-Funktion des Buttons in `toolbar.php`, wird auch bei verlassen des Raumes aufgerufen (über `window.onbeforeunload`)
- (nicht direkt Synchronisation) `x3d-extensions.js`
	- Kamera auf ganze Szene setzen (kann evtl. durch `x3dom`'s `showAll` ersetzt werden
	- Setzen und Abfrage der aktuellen View: Translation und Rotation
	- Interpolation aus einer aktuellen in eine neue View

Zusammenfassung: Einige Aufgaben werden auf jeden Fall erhalten bleiben, so z.B. das wechseln des Lecturer-modes. Die Synchronisationsaufgaben können hoffentlich durch `y.js` gelöst werden.
Eventuell kann man den Code auf vielleicht ⅓ des Umfanges reduzieren?

##### Test auf lokaler Maschine

Zuerst noch ein weiterer Test von `y.js` aus dem Tutorial