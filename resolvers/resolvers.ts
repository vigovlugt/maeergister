import absenceResolver from "./absenceResolver";
import studentResolver from "./studentResolver";
import classResolver from "./classResolver";

const resolvers = {
  ...absenceResolver,
  ...studentResolver,
  ...classResolver,
  Query: {
    ...absenceResolver.Query,
    ...studentResolver.Query,
    ...classResolver.Query
  }
};

export default resolvers;
