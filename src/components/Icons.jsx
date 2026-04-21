function IconBase({ children, className = "", size = 24 }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}

export function HomeIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </IconBase>
  );
}

export function AssignmentIcon(props) {
  return (
    <IconBase {...props}>
      <rect height="18" rx="2" width="14" x="5" y="3" />
      <path d="M9 3.5V6" />
      <path d="M15 3.5V6" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </IconBase>
  );
}

export function CalendarIcon(props) {
  return (
    <IconBase {...props}>
      <rect height="18" rx="2" width="18" x="3" y="4" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M3 9h18" />
      <path d="M8 13h.01" />
      <path d="M12 13h.01" />
      <path d="M16 13h.01" />
      <path d="M8 17h.01" />
      <path d="M12 17h.01" />
      <path d="M16 17h.01" />
    </IconBase>
  );
}

export function TimerIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 13V9" />
      <path d="M9 2h6" />
      <path d="M12 5V2" />
    </IconBase>
  );
}

export function StatisticsIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-8" />
      <path d="M22 20v-14" />
    </IconBase>
  );
}

export function ResourceIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </IconBase>
  );
}

export function ProfileIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.8-3.6 5-5.4 8-5.4s6.2 1.8 8 5.4" />
    </IconBase>
  );
}

export function BookIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21z" />
      <path d="M4 5.5V21" />
    </IconBase>
  );
}

export function ClockIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </IconBase>
  );
}

export function CheckCircleIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.2 2.2 4.8-5.2" />
    </IconBase>
  );
}

export function PlusIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function LinkIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M10 13a5 5 0 0 0 7.1 0l2.1-2.1a5 5 0 1 0-7.1-7.1L10.8 5" />
      <path d="M14 11a5 5 0 0 0-7.1 0L4.8 13.1a5 5 0 1 0 7.1 7.1L13.2 19" />
    </IconBase>
  );
}

export function VideoIcon(props) {
  return (
    <IconBase {...props}>
      <rect height="12" rx="2" width="11" x="3" y="6" />
      <path d="m14 10 7-4v12l-7-4" />
    </IconBase>
  );
}

export function ExternalLinkIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M14 4h6v6" />
      <path d="M10 14 20 4" />
      <path d="M20 14v6H4V4h6" />
    </IconBase>
  );
}

export function EditIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m4 20 4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L4 20Z" />
    </IconBase>
  );
}

export function SchoolIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m3 9 9-5 9 5" />
      <path d="M5 10v8h14v-8" />
      <path d="M9 22v-6h6v6" />
    </IconBase>
  );
}

export function HeartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </IconBase>
  );
}

export function SettingsIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z" />
    </IconBase>
  );
}

export function PlayIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m8 5 11 7-11 7z" />
    </IconBase>
  );
}

export function ResetIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 12a8 8 0 1 0 2.3-5.7" />
      <path d="M4 4v5h5" />
    </IconBase>
  );
}

export function CupIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 6h9v6a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4Z" />
      <path d="M15 8h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 20h6" />
      <path d="M9 3v2" />
      <path d="M12 2v3" />
      <path d="M15 3v2" />
    </IconBase>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

export function ChevronRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

export function TargetIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </IconBase>
  );
}

export function TrendUpIcon(props) {
  return (
    <IconBase {...props}>
      <path d="m4 16 6-6 4 4 6-7" />
      <path d="M15 7h5v5" />
    </IconBase>
  );
}

export function DocumentIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </IconBase>
  );
}
