import { NavLink } from "react-router-dom";
import {
  AssignmentIcon,
  CalendarIcon,
  HomeIcon,
  ProfileIcon,
  ResourceIcon,
  StatisticsIcon,
  TimerIcon,
} from "./Icons";

const links = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/assignments", label: "Assignments", icon: AssignmentIcon },
  { to: "/calendar", label: "Calendar", icon: CalendarIcon },
  { to: "/timer", label: "Timer", icon: TimerIcon },
  { to: "/statistics", label: "Statistics", icon: StatisticsIcon },
  { to: "/resources", label: "Resources", icon: ResourceIcon },
  { to: "/profile", label: "Profile", icon: ProfileIcon },
];

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="brand-block">
        <div className="brand-mark" />
        <span className="brand-name">StudyPlanner</span>
      </div>

      <nav className="site-nav">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              end={link.end}
              key={link.to}
              to={link.to}
            >
              <Icon className="nav-icon" size={26} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
