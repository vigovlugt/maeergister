import { FunctionComponent } from "react";
import Head from "next/head";

import "./Layout.css";

const Layout: FunctionComponent = ({ children }) => (
  <div>
    <Head>
      <title>Maeergister Dashboard</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </Head>
    <header>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#00dfc8" }}
      >
        <div className="nav-content">
          <button className="btn btn-outline-light">
            <span className="text-white navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand font-weight-bold text-white">
            Maeergister
          </a>
        </div>
      </nav>
    </header>
    {children}
  </div>
);

export default Layout;
