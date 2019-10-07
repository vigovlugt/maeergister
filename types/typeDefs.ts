import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    students: [Student]
    student(id: Int): Student
    absences: [Absence]
    class(id: Int): Class
    classes: [Class]
  }

  type Student {
    Id: ID
    Name: String
    DateOfBirth: Date
    Adress: String
    City: String
    Grade1: Float
    Grade2: Float
    Grade3: Float
    Grade4: Float
    Class: Class
  }

  type Absence {
    Id: ID
    Date: Date
    Class: String
    Reason: String
    Type: String
    Student: Student
  }

  type Class {
    Id: ID
    Name: String
    Students: [Student]
  }

  scalar Date
`;

export default typeDefs;
