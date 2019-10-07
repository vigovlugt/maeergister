import { getStudent, getStudentsByClass } from "../services/studentService";
import { getClass, getClasses } from "../services/classService";

const classResolver = {
  Query: {
    classes: () => getClasses(),
    class: (_, { id }) => getClass(id)
  },
  Class: {
    Students: Class => getStudentsByClass(Class.Id)
  }
};

export default classResolver;
