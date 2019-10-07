import { getStudents, getStudent } from "../services/studentService";
import { getClass } from "../services/classService";

const studentResolver = {
  Query: {
    students: () => getStudents(),
    student: (_, { id }) => getStudent(id)
  },
  Student: {
    Class: student => getClass(student.ClassId)
  }
};

export default studentResolver;
