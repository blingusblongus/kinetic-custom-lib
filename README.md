# vTEAMS Client / Fulfiller Portal

*Prod Address:* https://esolutionsone.kinops.io/

*Dev Address:* https://esolutionsone-dev.kinops.io/

## Deployment
  Backend:
  1. Clone platform-template repo: `git clone https://github.com/kineticdata/platform-template.git` (may require KD member to grant access)
  2. Edit `config/servername_environment_export_config.yml` and `config/servername_enviroment_import_config.yml` with space name, slug, and login info for both dev and prod instances
  3. run `export.rb -c "./config/servername_environment_export_config.yml"`
  4. run `import.rb -c "./config/servername_environment_import_config.yml"`

  Frontend:
  1. `git pull` any changes from the github repo
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
