# CardGame
## Back-end
To run this project:

make sure you have a database named "CGDB" in MSMM SQL

if not, create empty database named "CGDB" in MS SQL
and use comand Update-Database in Package Manager Console (Visual Studio) to update your database

when you run a project in IIS, you can manage the database with the swagger UI

## React Application
React application will not start automatically when starting dotnet project.
It will have to be started manually, and thanks to that starting and hot reloading the application will be a lot faster.

In order to run React Application use this command inside ClientApp
```
npm start
```