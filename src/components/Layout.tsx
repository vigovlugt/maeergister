import { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => (
  <div>
    <header>Header</header>
    {children}
  </div>
);

export default Layout;
