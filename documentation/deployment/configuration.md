# Configuration

Anatomy2.0 expects to find two files called `config.php` and `database.php` in `src/config/` folder.

Note: You can copy and rename `config_placeholder.php` and `database_placeholder.php` to get the config files. Then you just have to change some values.

### config.php

1. As `$baseUrl` provide the URL to where the Anatomy2.0 system is deployed.
E.g. 
```
$baseUrl = "http://eiche.informatik.rwth-aachen.de/3dnrt/Anatomy2.0-test";
```
2. Configure admins. To found out about the purpose of admins, please read admins.md. Fill an array with email address, firstname and lastname of an admin. Add the variable to the $admins array.
E.g. 
```
  $admin1 = array("max.mustermann@dbis.rwth-aachen.de", "Max", "Mustermann");
  $admins = array($admin1);
```
3. Set `$oidcClientId` to the client ID you received when creating your learning layers service. E.g.
```
$oidcClientId = "bced4d7b-9e63-4984-af35-c568e68b208e"
```

### database.php

1. Provide host, database name, database user and user password in "src/config/database.php".
  E.g. 
```
$host = "buche.informatik.rwth-aachen.de";
```

### Widgets

Anatomy2.0 widgets contain hard coded addresses to the Anatomy2.0 service. You have to update those addresses.

1. Navigate to the `src/widgets` folder
2. For each widget (`*.xml` file): Replace `http://eiche.informatik.rwth-aachen.de/3dnrt/Anatomy2.0/` by your base URL. (The base URL is the URL you also provided in `config.php` as `$baseUrl`)
E.g. replace
```
  src="http://eiche.informatik.rwth-aachen.de/3dnrt/Anatomy2.0/src/views/model_viewer.php?widget=true"
  ```
by
```
  src="http://eiche.informatik.rwth-aachen.de/3dnrt/Anatomy2.0-test/src/views/model_viewer.php?widget=true"
  ```

