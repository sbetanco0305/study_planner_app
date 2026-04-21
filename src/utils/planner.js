export function formatShortDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatLongDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatMonthYear(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function formatFullDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatTimeRange(startTime, endTime) {
  const formatTime = (value) =>
    new Date(`2026-01-01T${value}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
}

export function getMonthGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const previousMonthLastDate = new Date(year, month, 0).getDate();
  const cells = [];

  for (let index = startOffset - 1; index >= 0; index -= 1) {
    cells.push({
      key: `prev-${index}`,
      inMonth: false,
      date: new Date(year, month - 1, previousMonthLastDate - index),
    });
  }

  for (let day = 1; day <= lastDate; day += 1) {
    cells.push({
      key: `current-${day}`,
      inMonth: true,
      date: new Date(year, month, day),
    });
  }

  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - (startOffset + lastDate) + 1;

    cells.push({
      key: `next-${nextDay}`,
      inMonth: false,
      date: new Date(year, month + 1, nextDay),
    });
  }

  return cells;
}

export function toDateKey(date) {
  return date.toLocaleDateString("en-CA");
}

export function formatMinutesAsHours(totalMinutes) {
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}
