CREATE DATABASE Maeergister;
CREATE TABLE Students (
  Id int AUTO_INCREMENT,
  Name VARCHAR(255),
  DateOfBirth VARCHAR(255),
  Adress VARCHAR(255),
  City VARCHAR(255),
  Grade1 FLOAT,
  Grade2 FLOAT,
  Grade3 FLOAT,
  Grade4 FLOAT,
  ClassId INT,
  PRIMARY KEY (Id)
)
CREATE TABLE Classes (
  Id int AUTO_INCREMENT,
  Name VARCHAR(255),
  PRIMARY KEY (Id)
)
CREATE TABLE Absences (
  Id int AUTO_INCREMENT,
  Date DATETIME,
  Class VARCHAR(255),
  Reason VARCHAR(255),
  Type VARCHAR(255),
  StudentId INT,
  PRIMARY KEY (Id)
)
CREATE TABLE Accounts (
  Id int AUTO_INCREMENT,
  Username VARCHAR(255),
  FullName VARCHAR(255),
  Password VARCHAR(255),
  AccountType VARCHAR(255),
  PRIMARY KEY (Id)
)

INSERT INTO Accounts (
  Username,
  FullName,
  Password,
  AccountType
) VALUES (
  "admin",
  "Admin",
  "admin",
  "ADMIN"
),
(
  "manager",
  "Manager",
  "manager",
  "MANAGEMENT"
),
(
  "absentie",
  "Absentie Manager",
  "absentie",
  "ABSENT_MANAGEMENT"
)