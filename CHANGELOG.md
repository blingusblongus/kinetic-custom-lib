# Changelog

## [1.0.0] - WIP

### Changed

## [0.6.1] - WIP

### Added

- CustomTable now includes pagination elements (clickable page numbers, and adjustable tickets per page)

### Changed

- Better Filters Added on Fulfiller view, deactivated on client view (due to accessing form definitions being forbidden)
- Fullfiller CustomTable label now a `<select>`, allowing general filters to be applied

## [0.6.0] - 2022-06-28

### Changed

- Comment dates are now localized, with better formatting.
- Ticket form now requires an Assignee to be provided when Status is set to 'In Progress'
- Organization field now only visible to fulfillers, never to Clients
- Fixed bug where Requested By field was being overwritten when non-editable
- Fixed bug where Assignee was not being properly populated on ticket load

## [0.5.0] - 2022-06-24

### Added

- 'Clients' form allows differentiation between monthly and annual billing cycles.
- Add more visibility to ClientOverview Panels: Billing Period, Billing Period Start.
- Add behind-the-scenes code to ReportTemplate to support future Billing Period Metrics
- Add ability to automatically calculate and carry over unused hours from one period to the next, either by percentage or fixed maximum.
- ClientOverview Cards now also show the carryover hours and related info.
- Add automatically-set 'Requested By' Field to vteams-ticket form.
- Add dynamic page titles based on hash location
- Add optional Request Type (Bug, Feature, Enhancement) to Ticket form
- Add ability for clients to generate their own reports via 'Reports' view accessible from the sidebar

### Changed

- 'Clients' form annual/monthly input now displays conditionally, and is required when displayed.
- ClientOverview Panels now accurately show only hours worked since the Billing Period Start
- Refactored ClientPanelItems into own subcomponents.
- BurndownChart now charts from the Billing Period start until the current day.
- BurndownChart updated to handle Annual Billing Data as well.
- getAttachmentDownload util accepts the referenced attachment object, rather than the submission (allows for more flexible usage).
- BurndownChart will use the Combined Hours if hours are carried over from a previous month.
- Assignee field now displays displayName and stores userName in hidden field
- Changed Client Report title, as it's no longer necessarily weekly
- Fixed uneven BurndownChart margins

### Removed

- Deactivated Notifications link in header
- Deactivated leftover Queue search bar
- Deactivated unnecessary items in Profile Menu and EditProfile page
- Deactivated Settings tab from sidebar for clients

## [0.4.0] - 2022-06-17

### Added

- Attachment field for stable logo image references
- getAttachmentDownload handler to customUtils. This handler takes the link string from a submission with an attachment field and parses the link into a useable url.
- Add front-end report generation solution, accessible via sidebar menu as an authorized fulfiller.
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
- Custom Table now sorts status in proper order, rather than alphabetically

### Removed

- Removed drop-shadow from Client Management Cards

## [0.3.2] - 2022-06-10

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
