import { FunctionComponent, useState, useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./Layout.css";
import AppContext from "../Context/AppContext";
import AccountType from "../../models/AccountType";
import { useRouter } from "next/router";

const sideBarItems = {
  [AccountType.none]: [],
  [AccountType.student]: [
    { icon: faUsers, name: "Klas", href: "/class" },
    { icon: faCalendarAlt, name: "Rooster", href: "/schedule" }
  ],
  [AccountType.teacher]: [
    { icon: faUsers, name: "Klassen", href: "/class" },
    { icon: faCalendarAlt, name: "Rooster", href: "/schedule" }
  ]
};

interface IProps {
  container?: boolean;
}

const Layout: FunctionComponent<IProps> = ({ children, container }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const { accountType } = useContext(AppContext);

  return (
    <div>
      <nav className="navbar navbar-light bg-primary">
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
            {sideBarItems[accountType.toString()].map((item, i) => (
              <Link href={item.href} key={i}>
                <div
                  className={
                    "sidebar-item " +
                    (router.pathname === item.href ? "sidebar-item-active" : "")
                  }
                >
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
