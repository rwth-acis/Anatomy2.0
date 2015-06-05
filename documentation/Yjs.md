### 5.6.2015
Erste Versuche mit `y.js`:
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

##### `Node.js`

Jetzt 