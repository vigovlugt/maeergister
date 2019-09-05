import { createContext } from "react";
import AccountType from "../../models/AccountType";

const AppContext = createContext({ accountType: AccountType.none });

export default AppContext;
