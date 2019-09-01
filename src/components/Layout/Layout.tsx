import { FunctionComponent, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./Layout.css";
import AppContext from "../Context/AppContext";

const sideBarItems = [
  { icon: faUsers, name: "Klas", href: "class" },
  { icon: faCalendarAlt, name: "Rooster", href: "schedule" }
];

interface IProps {
  container?: boolean;
}

const Layout: FunctionComponent<IProps> = ({ children, container }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const { accountType } = useContext(AppContext);

  return (
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
      <h1>{accountType}</h1>
      <nav
        className="navbar navbar-light"
        style={{ backgroundColor: "#00dfc8" }}
      >
        <div className="nav-content">
          <button className="btn btn-light" onClick={toggleSidebar}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link href="/">
            <a className="navbar-brand font-weight-bold text-white">
              Maeergister
            </a>
          </Link>
          <div style={{ width: "50px" }}></div>
        </div>
      </nav>
      <div className="main">
        <div
          className={"sidebar bg-light" + (!showSidebar ? " collapsed" : "")}
        >
          <div className="sidebar-content">
            {sideBarItems.map((item, i) => (
              <Link href={item.href} key={i}>
                <div className="sidebar-item">
                  <div className="sidebar-icon-holder">
                    <FontAwesomeIcon
                      icon={item.icon}
                      size="3x"
                    ></FontAwesomeIcon>
                  </div>

                  <a className="sidebar-item-link">{item.name}</a>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className={container ? "container" : ""}>{children}</div>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  container: true
};

export default Layout;
