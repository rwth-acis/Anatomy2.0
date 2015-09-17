# Readme

To deploy Anatomy2.0 on a server, do the following steps:

1. Install an HTTP server (e.g. Apache Server) or use an existing installation
2. Install MySQL RDBMS or use an existing installation
3. Clone master or develop branch from https://github.com/rwth-acis/Anatomy2.0
4. Create a 'models' folder in the root directory of your git directory
5. Create a database in MySQL and create database tables as described in database.md
6. Create a learning layers service for Anatomy2.0 as described at https://github.com/learning-layers/openid-connect-button
7. Configure Anatomy2.0 as described in configuration.md

If you want to deploy Anatomy2.0 locally for development purposes, do these steps:

1. Install XAMPP or use an existing installation
2. Clone master or develop branch from https://github.com/rwth-acis/Anatomy2.0
3. Run XAMPP Control Panel
4.  Start Apache and MySQL
5. Create a 'models' folder in the root directory of your git directory
6. Create a database in MySQL and create database tables as described in database.md (use phpmyadmin)
7. Create a learning layers service for Anatomy2.0 as described at https://github.com/learning-layers/openid-connect-button
8. On Windows OS: Configure virtual hosts as in windows-virtual-hosts.md
9. Configure Anatomy2.0 as described in configuration.md