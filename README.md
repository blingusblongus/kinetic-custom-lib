# vTEAMS Client / Fulfiller Portal

*Prod Address:* https://esolutionsone.kinops.io/

*Dev Address:* https://esolutionsone-dev.kinops.io/


## Usage

Clients:

1. Login using the credentials supplied by a spaceAdmin or vTeams fulfiller
2. Click the profile icon > profile submenu in the upper-right to view details about your profile, such as the organization you're associated with within vTEAMS, and change your password.
3. On login, the home screen displays active tickets you've submitted, as well as tickets from others in your organization.
4. Click on any ticket to view the details of the tickets, as well as its comment feed.
5. When viewing a ticket, type in the 'Comment' box below the main ticket view and click 'Submit' to leave a comment or ask a question.
6. From any screen, clicking 'Add Ticket' on the sidebar navigation will open the Ticket Submission screen. Filling the required fields and clicking submit will log a ticket in the system.
7. Navigating to 'Reports' from the sidebar allows for generation of reports for tickets/clients that the user has access to.
8. Reports can be saved by clicking the 'Generate' button, and then clicking the 'Save' button as it appears.
9. Logout via the Profile menu in the upper-right. Users will also be logged out after a period of inactivity.


Fulfillers:

1. Login using the credentials supplied by a spaceAdmin or vTeams fulfiller.
2. Click the profile icon > profile submenu in the upper-right to view details about your profile, such as the organization you're associated with within vTEAMS, and change your password.
3. Upon logging in, the default 'Dashboard' screen shows a list of vTeams tickets.
4. Click the 'Column' or 'Filter' icons in the upper-right of the ticket table to adjust the visible columns or filter by a specific value.
5. Edit and work tickets by clicking on a ticket entry in a table.
6. In the comments section of a ticket, fulfillers can log three types of information:
    1. Comments - general notes or messages that are visible to everyone with access to the ticket.
    2. Work Logs - Notes describing work done, and associated with a duration worked. These logs are visible to clients, and are used to calculate burndown and generate reports. A message can be marked as a work log by clicking the 'Mark Work Log' checkbox when composing a message.
    3. Internal Notes - Notes or messages that are visible only to other fulfillers, and don't show up in a client's comment feed. Clicking the 'Internal Notes' button will enable the feature, and a red background confirms that the message is Internal.
7. Navigate to the 'Reports' view via the sidebar to generate reports (based on work logs) for one or all clients. After generation, reports can be optionally saved to pdf.
8. Navigate to the 'Clients' view via the sidebar to:
    1. View general information about each client, such as Billing Period, Billing Period Start Date, Hours Carried Over (from the last billing period), and burndown.
    2. Add New Clients by clicking the button in the upper-right, and filling out the resulting form.
9. Logout via the profile dropdown menu in the upper right of the screen. 

## Deployment
  Backend:
  1. Clone platform-template repo: `git clone https://github.com/kineticdata/platform-template.git` (may require KD member to grant access)
  2. Edit `config/servername_environment_export_config.yml` and `config/servername_enviroment_import_config.yml` with space name, slug, and login info for both dev and prod instances
  3. run `export.rb -c "./config/servername_environment_export_config.yml"`
  4. run `import.rb -c "./config/servername_environment_import_config.yml"`
  5. If updates require stored resources (like email templates), clone and copy them manually:
      1. If the resources are new (not present in the target datastore), export submissions for the datastore form on the source instance, and import them on the matching target datastore form. Errors will display for templates, etc. that already exist on the target instance, but the new templates will be successfully added. (This can also be avoided by opening the exported .csv in a spreadsheet app and editing it).
      2. If the resources are already present on the target instance, and just require updating, they must be deleted from the target instance before importing from the source instance.

  Frontend:
  1. `git pull` any changes from the github repo
  . `export NODE_OPTIONS=--max_old_space_size=4096` to increase javascript heap size
  2. `yarn build`
  3. If pushing dev frontend, rename bundle/packages/app/build/ to build-dev/
  4. Sign into s3 bucket
  5. Click 'Upload Folder' and upload build/ folder (for prod) or build-dev (for dev)

## Bugs & Questions

 - [5.13.22]: After dev => prod migration, the value from the 'f3' field on the Clients form (which previously was a Billing Start Date) was automatically mapped to the new 'f3' field, 'Logo Url.'
    <details>
      <summary>Example image</summary>
      <img src='./images/bug_screen_001.png' height='300px' />
    </details>
    - Questions: What's the best practice for keeping things in sync when the data model on prod changes? Do we need scripting to cover our bases?
  - The bridge models broke after migration (though everything somehow still worked enough that I didn't notice until I tried to utilize the bridge models again). It seems the bridge plugins etc. don't get set-up or updated by default.
  - Templates, and other resources that need to be specifically configured to work on the back-end, are not part of the normal development flow - they're easy to configure by a pro-code worker on a prod instance, but require being manually brought over/updated if they're designed on a dev instance (which seems important,  as they're likely included in flows that need to be tested).
 
 
## QA Testing

A client should be able to:

- [ ] Log in
- [ ] View a list of their submitted tickets
- [ ] Sort submitted tickets by Status, Date Submitted, etc.
- [ ] Submit a new Ticket
  - [ ] with Title, Description, Requested Due Date
  - [ ] with Attachments
- [ ] Leave a comment on a ticket for a vTeams member

A fulfiller should be able to:

- [ ] Log in
- [ ] View a list of all tickets from all organizations
- [ ] Update the details of a ticket
  - [ ] Update the state of the ticket
  - [ ] Assign the ticket to a vTeams member
  - [ ] Adjust other details of a ticket
- [ ] Communicate with the client via comments attached to the ticket
- [ ] Log hours worked with a 'Work Log' comment
- [ ] Store private, internal notes in the comment section
- [ ] View a dashboard showing all clients and burndown information associated with them
- [ ] Add a new client

## Troubleshooting

- Failed Webhook migration during export.rb run
  - Solution: Ensure the version of Ruby being used is up to date
    1. Use rvm, homebrew, etc. to install an up-to-date version of ruby
    2. (And/or) make sure that latest ruby is in the PATH
        1. `open ~/.zshrc` (or ~/.bashrc, bash_profile, depending)
        2. Add `export PATH="/opt/homebrew/opt/ruby/bin:$PATH"` and save
        3. `source ~/.zshrc`
        4. `ruby -v` to check version (should NOT be 2.6.xx)
        5. Attempt export again
