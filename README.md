![Header](./assets/ReadMeImage.png)


![Vue with TypeScript Badge](https://img.shields.io/badge/Vue-%20TypeScript-2c7873?style=flat&logo=vue.js&logoColor=4FC08D) ![.NET Core with C# Badge](https://img.shields.io/badge/.NET%20Core-C%23-2c7873?style=flat&logo=.net&logoColor=white) ![MSSQL Badge](https://img.shields.io/badge/MSSQL-Microsoft%20SQL%20Server-2c7873?style=flat&logo=microsoft-sql-server&logoColor=white) 

<p>
Housekeeping Book is a user-friendly application for monitoring monthly household expenses. In addition to calculating the average amount per month and the individual contribution per person, it also offers several other useful features.</p>


## Setting Up

I'm working with: <br />
![Visual Studio Badge](https://img.shields.io/badge/Visual%20Studio-2c7873?style=flat&logo=visual-studio&logoColor=white) ![Visual Studio Code Badge](https://img.shields.io/badge/Visual%20Studio%20Code-2c7873?style=flat&logo=visual-studio-code&logoColor=white) ![MSSQL Badge](https://img.shields.io/badge/MSSQL-2c7873?style=flat&logo=microsoft-sql-server&logoColor=white)

<br />
Make sure that you have the needed technologies installed: 
- .Net Core SDK (check in terminal: dotnet --version)
- Entity Framework Core CLI (ckeck in terminal: dotnet ef)
- ...

### Backend
- Create a local database
- Change the connection string in appsettings.json/appsettings.Development.json to your database 
- Execute in terminal:
    - dotnet restore
    - dotnet ef database
- Check if your database has new tables
- Build and run project (change launchUrl if needed)

### Frontend
- Open "clientApp" folder in VS Code
- Execute in terminal:
    - npm install
    - npm run build
    - npm run test:unit (if you want to)
    - npm run dev
- Test it: Go to "Edit Month" and add a invoice
- Check if your database has a new entry in Invoices (select * from Invoices)
