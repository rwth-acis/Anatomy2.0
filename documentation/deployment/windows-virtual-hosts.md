# Virtual hosts on Windows OS

See also http://www.php.de/tutorials/42725-virtual-hosts-vhosts-einrichten-unter-windows.html

Note: `$XAMPP_ROOT` is the directory you installed XAMPP into. You have to replace `$XAMPP_ROOT` by the actual directory name.

1. Open `$XAMPP_ROOT/apache/conf/httpd.conf`
2. Make sure `Include conf/extra/httpd-vhosts.conf` is not commented out
3. Open `$XAMPP_ROOT/apache/conf/extra/httpd-vhosts.conf`
4. Insert the following code (Note, that you can replace `ServerName anatomy` by another name). Instead of `C:/Homepage` put the absolute path to your local Anatomy2.0 git repository.
```
<Directory C:/Homepage>
 Require all granted 
</Directory>

<VirtualHost *:80>
 DocumentRoot $XAMPP_ROOT/htdocs
 ServerName localhost 
</VirtualHost>

<VirtualHost *:80>
 DocumentRoot c:/Homepage
 ServerName anatomy
</VirtualHost>
```

5. Uncomment `NameVirtualHost *:80`
6. Open `C:\WINDOWS\system32\drivers\etc\hosts` in a text editor
7. Add `127.0.0.1   3dmodels.local` after `127.0.0.1   localhost` (make sure lines are not commented out)
 (You may not be allowed to save the file to this directory. You may then just save anywhere else and copy the file back with administrator rights)
 (You have to restart Apache for changes in config files to take effect)

