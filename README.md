# vTEAMS Client / Fulfiller Portal

1. 

## Bugs & Questions

 ### Deployment

 - [5.13.22]: After dev => prod migration, the value from the 'f3' field on the Clients form (which previously was a Billing Start Date) was automatically mapped to the new 'f3' field, 'Logo Url.'
    <details>
      <summary>Example image</summary>
      <img src='./images/bug_screen_001.png' height='300px' />
    </details>
    - Questions: What's the best practice for keeping things in sync when the data model on prod changes? Do we need scripting to cover our bases?
 
 

## QA Testing

A client should be able to:

[ ] Log in
[ ] View a list of their submitted tickets

## Troubleshooting

<!-- <details>
  <summary>Failed Webhook Migration while running export.rb</summary>
  <h3>Solution:</h3>
  <p>Ensure Ruby is up to date.</p>
  `install ruby`
</details> -->

- Failed Webhook migration during export.rb run
  - Solution: Ensure the version of Ruby being used is up to date
    1. Use rvm, homebrew, etc. to install an up-to-date version of ruby
    2. (And/or) make sure that latest ruby is in the PATH
        1. `open ~/.zshrc` (or ~/.bashrc, bash_profile, depending)
        2. Add `export PATH="/opt/homebrew/opt/ruby/bin:$PATH"` and save
        3. `source ~/.zshrc`
        4. `ruby -v` to check version (should NOT be 2.6.xx)
        5. Attempt export again
