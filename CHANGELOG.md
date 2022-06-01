# Changelog

## [0.3.0] - 2022-06-01 
### Changed
- Implemented new basic styling for
    - Header
    - Sidebar
    - App Body
    - Charts
- `Organization` field of a ticket is now populated by a bridged resource, automatically set if client, manually set if fulfiller
- Weekly Report Now sorts all worklogs by the day they were completed, and generated a separate section and table in the email for each day.
- `Activities` and `Client` form fetches moved from `Dashboard.jsx` into redux/saga.
- Replaced chart-js graphs with recharts

### Fixed
- Bug where app would crash if user had neither an `Organization` attribute or `spaceAdmin` status.
- Bug where final table row in automatically generated email reports would appear unreadable.
- Bug where Burndown Chart data would sometimes fail to display fetched data

### Added
- Add ability for vTeams members to edit comments after leaving them.
- `Last Updated` field now exposed on ticket forms
- Comments attached to a ticket will now affect the `Last Updated` field of the ticket.
- Add `Hours Remaining` to Weekly Email Report

### Removed
- Cleared old/unnecessary dev logs
- Removed proof-of-concept/experimental/outdated kapps
    - Scaffold
    - CustomQueue
- Moved proof-of-concept/experimental/outdated components out of app flow and into `vteams/src/component-archive`
    - BreadCrumbs
    - BurndownClient
    - BurndownDash
    - ClientManagement
    - CommentFeed
    - CustomTabs
    - Dashboard
    - Dashboard_v2
    - KnowledgeWidget
    - LabelWithIcon
    - Navbar
    - NavIcon
    - Queue
    - RecentlyViewed
    - TicketSubmission
    - TicketUserView

### Security

- Resolve `target _blank noopener` security warning in core `Kapp.js` file.