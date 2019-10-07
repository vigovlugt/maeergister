import { getAbsences } from "../services/absenceService";
import { getStudent } from "../services/studentService";

const absenceResolver = {
  Query: {
    absences: () => getAbsences()
  },
  Absence: {
    Student: absence => getStudent(absence.StudentId)
  }
};

export default absenceResolver;
