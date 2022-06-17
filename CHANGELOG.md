# Changelog

## [0.4.0] - WIP

### Added

- Attachment field for stable logo image references
- getAttachmentDownload handler to customUtils. This handler takes the link string from a submission with an attachment field and parses the link into a useable url.
- Add front-end report generation solution, accessible via sidebar menu.
- Add ability to display/print reports by client, or all together
- Add QuickLook component to display tickets raised and resolved in the past 7 days
- SubmittedAt now copied to values; appears as optional customTable field.

### Changed

- Switched logo image references from external web resource to kinetic-hosted resource (stored on client form)
- Fixed heading color on ClientOverview component
- Reports better fit pdfs, and split at better breakpoints
- Fixed bug where vteams-ticket 'Submission Updated' workflow was failing to update 'Marked Resolved' field properly
- Switched .dashboard-row class to flexbox with flex-grow to manage sizing on both client and fulfiller views
- Adjusted customTable to format all dates in similar, more succinct format

### Removed

- Removed drop-shadow from Client Management Cards

## [0.3.2] - WIP

### Added

- Custom Table columns are sortable by clicking on the column header
- Custom Tables Display placeholder message when empty.
- Added new prop to CustomTable (submitter; accepts 'me'/'others'/'all') to easily create a table with an initial filter 

### Changed

- Custom Table Settings menu now triggered by the column icon on the right side of the header row.
- Ticket Submission: 'Organization' and 'Title' fields are now required
- Fixed Ticket 'Submission Update' workflow to avoid possible looping.
- Moved misleading filter icons from CustomTable headers to last table header.
- Adjusted positioning on CustomTable Settings to prevent overflowing offscreen 
- Fixed overflowing table styles from Reports/ReportTemplate.jsx

## [0.3.1] - 2022-06-06

### Added

- New Custom Table with new theme and REST pattern.
- Table hide/show columns menu to tableHeader onClick
- Settings Reducer for holding custom user settings (not activated)

### Changed

- Card containers no longer have the box-shadow property

### Removed

- Removed MUI datatable

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