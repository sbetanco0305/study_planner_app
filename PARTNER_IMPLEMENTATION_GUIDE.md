# Study Planner Project Handoff Guide
## Person 3, Person 4, and Person 5 Implementation Packet

Prepared for the trimmed Study Planner codebase after Person 1 and Person 2 work was preserved.

---

## 1. Purpose of This Guide

This document explains:

1. What is already completed in the current project.
2. How the remaining teammates should rebuild the removed features.
3. What files each person should work in.
4. How to restore the project to approximately the state it was in before the app was trimmed down.

This is intentionally a build guide, not a code dump. The goal is to help each teammate understand what to create, why it belongs there, and how to connect it into the existing app structure.

---

## 2. Current State of the Project

The current codebase is a unfinished version of the Study Planner app. It keeps the shared app shell and the dashboard, lacks the pages belonging to Persons 3 to 5.

### What still exists right now

- React app setup is complete.
- Routing is complete.
- Navigation is complete.
- Shared layout and global styling are complete.
- Dashboard homepage is complete enough to serve as the visual and structural reference.
- Placeholder pages exist for unfinished routes so links do not break.



## 3. What Person 1 (gavin) Already Completed

Person 1's work is the project foundation. Everyone else should build on top of it rather than replacing it.

### Person 1 responsibilities already done

- Set up the React app and project structure.
- Connected the app with `react-router-dom`.
- Established the main page shell in `src/App.jsx`.
- Kept all route paths connected:
  - `/`
  - `/assignments`
  - `/calendar`
  - `/timer`
  - `/statistics`
  - `/resources`
  - `/profile`
- Added the shared `StudyPlannerProvider` wrapper around the app.
- Preserved the persistent app shell layout:
  - top navbar
  - main content area
  - floating help button

### Files Person 1 owns conceptually

- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/context/StudyPlannerContext.jsx`
- `src/context/StudyPlannerContextObject.js`
- `src/context/useStudyPlanner.js`
- `src/App.css`
- `src/index.css`

### Important note for Persons 3 to 5

Do not redesign the app shell unless the whole team agrees to it. The routes, provider wrapper, and navbar are already wired correctly. Your job is to plug features into the existing structure.

---

## 4. What Person 2 (gavin) Already Completed

Person 2's work is the current dashboard implementation. It is the clearest example of how the rest of the app should look and feel.

### Person 2 responsibilities already done

- Built the homepage dashboard in `src/pages/Home.jsx`.
- Preserved the visual style inspired by the Figma.
- Uses shared cards, spacing, stat panels, progress bars, and section headings.
- Displays:
  - overview metric cards
  - upcoming tasks cards
  - subject overview cards
  - next deadlines sidebar widget

### Files Person 2 owns conceptually

- `src/pages/Home.jsx`
- Dashboard-related styles inside `src/App.css`
- Dashboard data shaping inside `src/context/StudyPlannerContext.jsx`

### What the dashboard currently teaches the rest of the team

- How data should come from context into a page.
- How cards are styled.
- How subject colors are used.
- How assignments and subjects are related.
- How the project currently expects display data to be prepared before rendering.

---

## 5. Current Architecture: How the App Works Right Now

Before anyone adds features back, they should understand the current data flow.

### Routing

`src/App.jsx` renders:

- `Navbar`
- `Routes`
- each page component

That means each person should only need to focus on their own page and the shared context logic that feeds it.

### Shared data source

`src/context/StudyPlannerContext.jsx` currently provides:

- `subjects`
- `upcomingAssignments`
- `dashboardStats`


### Seed data

`src/data/initialData.js` currently contains:

- `initialSubjects`
- `initialAssignments`

This file should grow again when the full app is complete.

### Utility helpers

`src/utils/planner.js` already gives useful helpers for:

- date formatting
- month labels
- calendar grid generation
- time range formatting
- hour/minute display formatting

These helpers should be reused instead of rewritten.

---

## 6. Recommended Team Redistribution

To get the app to a finished state we should split the work up like this.

### Person 3

- Assignments page
- Assignment add/delete/toggle logic
- Resource page
- Resource add/delete logic

Reason: assignments and resources are both content-management style pages driven by forms and lists.

### Person 4

- Calendar page
- Monthly view
- Event creation and deletion
- Assignment deadline display inside calendar

Reason: this is one complete planning/date-based feature area.

### Person 5

- Timer page
- Study session tracking
- Statistics page
- Profile page
- Settings and dark mode logic

Reason: these pages all depend on user-specific state, study metrics, and app personalization.

If we want to keep the original split exactly as written, Resources can stay unassigned and be treated as extra credit. But if the goal is to keep it identical to the figma, someone needs to own it, and Person 3 is the cleanest fit.


## 7. The First Shared Step for Everyone

Before separate page work starts, the team should restore the full shared state layer.

### The context must expand again

`src/context/StudyPlannerContext.jsx` should eventually provide:

- `subjects`
- `assignments`
- `calendarEvents`
- `resources`
- `profile`
- `settings`
- `studyStats`
- derived stats like completion rate and resource counts
- action functions to mutate each part of the state

### The initial data file should expand again

`src/data/initialData.js` should eventually include:

- `initialSubjects`
- `initialAssignments`
- `initialCalendarEvents`
- `initialResources`
- `initialProfile`
- `initialSettings`
- `initialStudyStats`

### Persistence should return

restore local storage persistence in context so changes survive refreshes.

This means:

- loading saved state on startup
- merging saved state with defaults
- saving state whenever it changes

### Suggested order

1. Restore the full state shape.
2. Add the action functions back one feature area at a time.
3. Rebuild each page against the context API.
4. Test that all pages still work together.

---

## 8. Person 3 Guide: Assignments and Resources

## Goal

Build the academic task-management section of the app.

### Pages Person 3 should complete

- `src/pages/Assignments.jsx`
- `src/pages/Resources.jsx`

### Context/data areas Person 3 depends on

- `assignments`
- `subjects`
- `resources`
- `addAssignment`
- `toggleAssignment`
- `deleteAssignment`
- `addResource`
- `deleteResource`

### What the Assignments page should do

The assignments page should show two clearly separated sections:

- Upcoming and in-progress assignments
- Completed assignments

Each assignment card should display:

- subject name
- subject color dot
- assignment title
- due date
- progress
- completion state

### Functional requirements for Assignments

- User can add an assignment through a form.
- User can choose a subject for the assignment.
- User can set a due date.
- User can mark an assignment complete.
- User can move a completed assignment back to active.
- User can delete an assignment.

### Recommended build order for Assignments

1. Expand context with `assignments` state and actions.
2. Build the add-assignment form UI.
3. Derive two arrays:
   - active assignments
   - completed assignments
4. Sort active assignments by nearest due date first.
5. Sort completed assignments by most recently due first.
6. Build card UI for active items.
7. Build card UI for completed items.
8. Connect action buttons.

### UI guidance for Assignments

- Match the dashboard card spacing and border radius.
- Reuse progress bars from the dashboard instead of inventing a new visual style.
- Keep the subject color system consistent with the homepage.
- Use the muted gray metadata style already established in `App.css`.

### Common mistakes to avoid on Assignments

- Do not keep page-level state as the source of truth for assignments.
- Do not duplicate subject data inside assignments unless needed for display shaping.
- Do not hardcode course names in the page.
- Do not sort dates as plain text unless they stay in `YYYY-MM-DD` format.

### What the Resources page should do

The resources page should act like a study-material library connected to subjects.

Each resource should include:

- title
- subject
- type
- URL
- added date

Recommended resource types:

- document
- link
- video
- book

### Functional requirements for Resources

- User can add a resource.
- User can pick the related subject.
- User can pick a resource type.
- User can store a URL.
- User can delete a resource.
- Resources should render in styled cards or list sections.

### Recommended build order for Resources

1. Add `initialResources` to the data file.
2. Add `resources` state and `addResource`/`deleteResource` to context.
3. Build a resource form at the top of the page.
4. Render resources below the form.
5. Add visual treatment by resource type if desired.
6. Keep filtering simple unless the team has extra time.

### Person 3 testing checklist

- Adding an assignment updates:
  - Assignments page
  - Dashboard open-task counts if derived from shared state
- Completing an assignment updates:
  - progress state
  - completed section
  - dashboard metrics if connected
- Deleting an assignment removes it everywhere.
- Adding a resource displays immediately.
- Refreshing the app keeps changes if persistence is restored.

---

## 9. Person 4 Guide: Calendar

## Goal

Build the planner view that combines calendar events with assignment deadlines.

### Page Person 4 should complete

- `src/pages/Calendar.jsx`

### Context/data areas Person 4 depends on

- `calendarEvents`
- `assignments`
- `subjects`
- `addCalendarEvent`
- `deleteCalendarEvent`

### What the Calendar page should do

The calendar page should display:

- a month header
- previous/next month controls
- weekday labels
- a month grid
- event pills inside each day cell
- assignment deadlines visible in the grid
- an upcoming events list below or beside the calendar

### Functional requirements for Calendar

- User can navigate months.
- User can add a calendar event.
- User can assign the event to a subject.
- User can choose date and time.
- User can delete events from the upcoming list.
- Incomplete assignments should appear as due items on the calendar.

### Utilities already available to Person 4

`src/utils/planner.js` already contains helpers for:

- `formatMonthYear`
- `formatLongDate`
- `formatTimeRange`
- `getMonthGrid`
- `toDateKey`

These should be used directly for the calendar logic.

### Recommended build order for Calendar

1. Add `initialCalendarEvents` to `initialData.js`.
2. Restore `calendarEvents` state in context.
3. Add `addCalendarEvent` and `deleteCalendarEvent`.
4. Create a local `viewDate` state in the page for month navigation.
5. Use `getMonthGrid(viewDate)` to build visible day cells.
6. Build a date-keyed map that combines:
   - calendar events
   - incomplete assignment due dates
7. Render pills inside each day cell.
8. Build the upcoming events list section.
9. Connect form submission and deletion.

### Calendar display guidance

- Use subject colors for event pills.
- Distinguish manual calendar events from assignment due dates if possible.
- Keep the visual structure light and clean to match the dashboard.
- Use the dashboard spacing system rather than creating a dense table.

### Common mistakes to avoid on Calendar

- Do not mutate the month grid directly.
- Do not mix event data and assignment data permanently in state.
- Combine them for display only.
- Do not forget to filter out completed assignments when showing due items.

### Person 4 testing checklist

- Month navigation updates the heading and visible days.
- Events appear on the correct date.
- Incomplete assignments show on their due dates.
- Completed assignments do not show as pending deadlines.
- Deleting an event removes it from both the list and the calendar grid.

---

## 10. Person 5 Guide: Timer, Statistics, and Profile

## Goal

Build the user-focused productivity layer of the app.

### Pages Person 5 should complete

- `src/pages/Timer.jsx`
- `src/pages/Statistics.jsx`
- `src/pages/Profile.jsx`

### Context/data areas Person 5 depends on

- `studyStats`
- `recordFocusSession`
- `profile`
- `updateProfile`
- `settings`
- `toggleSetting`
- possibly derived assignment metrics from shared state

---

## 10A. Timer Guide

### What the Timer page should do

The timer page should support study sessions, likely in a Pomodoro-style format.

Recommended modes:

- Focus session
- Short break
- Long break

### Functional requirements for Timer

- User can switch timer modes.
- User can start the timer.
- User can pause/reset the timer.
- When a focus session is completed, study statistics update.
- The timer page should visibly show the remaining time.

### Recommended build order for Timer

1. Add `initialStudyStats` back into the data file.
2. Add `studyStats` state in context.
3. Add `recordFocusSession(minutes)` action in context.
4. Build local timer state in `Timer.jsx`:
   - selected mode
   - remaining seconds
   - isRunning
5. On session completion:
   - call `recordFocusSession`
   - only do this for focus mode, not breaks
6. Display summary metrics below the timer.

### Timer design guidance

- Keep the timer as the main visual focal point.
- Use a large time display.
- Reuse color accents already established in the app.
- Keep controls obvious and large enough to tap.

### Common mistakes to avoid on Timer

- Do not record stats on every second tick.
- Only record stats when a session is completed successfully.
- Do not mix local timer countdown state with persistent app stats.

---

## 10B. Statistics Guide

### What the Statistics page should do

The statistics page should summarize study behavior and task completion.

Recommended content:

- focus sessions today
- study minutes today
- total study minutes
- streak days
- completed tasks
- assignment completion rate
- weekly study time summary

### Functional requirements for Statistics

- Read values from shared context, not hardcoded local constants.
- Show multiple stat cards.
- Include at least one section for weekly study progress.
- Reflect timer changes if a study session was recorded.
- Reflect assignment completion if shared metrics are derived in context.

### Recommended build order for Statistics

1. Make sure context derives assignment-based metrics.
2. Make sure timer writes into `studyStats`.
3. Create summary cards first.
4. Add a weekly breakdown section next.
5. Add softer secondary cards or type cards last.

### Visual guidance for Statistics

- Match dashboard card style.
- Use consistent color coding for major metrics.
- Avoid making the page feel like a spreadsheet.
- Use grouped cards and clean spacing.

### Person 5 stats checklist

- Completing a focus session changes the statistics page.
- Completing assignments changes any completion-related stats.
- Refreshing the app preserves stats if persistence is enabled.

---

## 10C. Profile Guide

Profile was not originally assigned in the split, but it should be treated as part of Person 5's scope because it belongs to user settings and personalization.

### What the Profile page should do

The profile page should let the user view and edit their personal information.

Recommended fields:

- username
- email
- school
- major
- year
- hobbies

### Settings that should live with Profile

- dark mode
- email notifications
- study reminders

### Functional requirements for Profile

- Display current profile information in readable cards or rows.
- Provide an edit mode or editable form.
- Save profile updates to shared context.
- Allow settings toggles.
- Dark mode toggle should affect the whole app.

### Recommended build order for Profile

1. Add `initialProfile` to the data file.
2. Add `initialSettings` to the data file.
3. Add `profile` and `settings` to context state.
4. Add `updateProfile(updates)` in context.
5. Add `toggleSetting(settingKey)` in context.
6. Restore the page UI:
   - profile summary
   - edit form
   - settings section
7. Reconnect dark mode behavior through the document root if desired.

### Dark mode guidance

If dark mode returns, the simplest architecture is:

- store a boolean in `settings.darkMode`
- in context, update `document.documentElement.dataset.theme`
- reuse CSS selectors already designed to react to the theme attribute

### Common mistakes to avoid on Profile

- Do not store form edits only in page-local state permanently.
- Use local state while editing, but commit back to context on save.
- Do not let dark mode become page-specific; it should affect the entire app.

### Person 5 testing checklist

- Editing profile fields updates the displayed information.
- Toggling dark mode affects the whole app.
- Notification toggles stay consistent after refresh if persistence exists.
- Timer activity updates statistics correctly.

---

## 11. Shared Data Shapes the Team Should Use

These are the important data relationships to preserve.

### Subject

- `id`
- `name`
- `color`

### Assignment

- `id`
- `subjectId`
- `title`
- `dueDate`
- `completed`
- `progress`

### Calendar Event

- `id`
- `subjectId`
- `title`
- `date`
- `startTime`
- `endTime`

### Resource

- `id`
- `subjectId`
- `title`
- `type`
- `url`
- `addedDate`

### Profile

- `username`
- `email`
- `school`
- `major`
- `year`
- `hobbies`

### Settings

- `darkMode`
- `emailNotifications`
- `studyReminders`

### Study Stats

- `focusSessionsToday`
- `studyMinutesToday`
- `totalStudyMinutes`
- `streakDays`
- `weeklyMinutes`

---

## 12. File-by-File Pickup Map

This section tells each teammate exactly where to start.

### Shared files everyone should understand

- `src/App.jsx`
- `src/components/Navbar.jsx`
- `src/context/StudyPlannerContext.jsx`
- `src/context/useStudyPlanner.js`
- `src/data/initialData.js`
- `src/utils/planner.js`
- `src/App.css`

### Person 3 main files

- `src/pages/Assignments.jsx`
- `src/pages/Resources.jsx`
- `src/context/StudyPlannerContext.jsx`
- `src/data/initialData.js`

### Person 4 main files

- `src/pages/Calendar.jsx`
- `src/context/StudyPlannerContext.jsx`
- `src/data/initialData.js`
- `src/utils/planner.js`

### Person 5 main files

- `src/pages/Timer.jsx`
- `src/pages/Statistics.jsx`
- `src/pages/Profile.jsx`
- `src/context/StudyPlannerContext.jsx`
- `src/data/initialData.js`
- `src/App.css`

---

## 13. Integration Rules So the Team Does Not Break Each Other's Work

### Rule 1

Keep the route paths exactly the same unless the whole team agrees to rename them.

### Rule 2

Add shared state in context instead of keeping isolated duplicate state on each page.

### Rule 3

Reuse existing card, typography, spacing, and color patterns from the dashboard.

### Rule 4

When adding CSS, extend the current style system instead of replacing the whole stylesheet.

### Rule 5

If two pages need the same derived value, compute it in context once instead of in multiple pages.

### Rule 6

Test every page after context changes, because one broken provider value can affect the whole app.

---

## 14. Suggested Team Workflow

### Phase 1

One person restores the full context state shape first.

### Phase 2

Persons 3 to 5 build their pages in parallel.

### Phase 3

As a team, reconnect derived stats and cross-page updates.

### Phase 4

Polish the UI so all pages visually match the dashboard and navbar.

### Phase 5

Run a full test sweep:

- navigate every route
- add/edit/delete data
- refresh the app
- verify persistence
- verify dark mode if implemented

---

## 15. Minimum Definition of Done

The project is back to approximately its previous full version when:

- dashboard still works
- assignments page is functional
- calendar page is functional
- timer is functional
- statistics page is functional
- profile page is functional
- resources page is functional
- data updates correctly across pages
- local storage works again if you restore it
- the UI still feels like one app rather than separate mini-projects

---

## 16. Final Advice to the Team

- Build from the existing dashboard style, not from scratch.
- Use the current context/provider pattern as the backbone.
- Restore features one vertical slice at a time.
- Keep data logic centralized.
- Favor consistency over adding extra features.

If the team follows this guide, the project should end up very close to the fuller version that existed before trimming, while still keeping the cleaner shared structure that is in the repo now.
