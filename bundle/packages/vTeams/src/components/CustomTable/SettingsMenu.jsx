import React from 'react';

const Settings = React.forwardRef(
  (
    { settingsPos, visible, setVisible, fields, setShowSettings },
    settingsRef,
  ) => {
    const columnExcludes = [
      'Attachments',
      'Organization - deprecated',
      'Number',
      'Organization ID',
    ];

    // const closeModal = e => {
    //   if (settingsRef.current && !settingsRef.current.contains(e.target)) {
    //     console.log('you clicked outside of me!');
    //   } else {
    //     console.log('you clicked inside me?');
    //   }
    // };
    console.log(fields);

    return (
      <div
        className="table-settings"
        style={{ position: 'absolute', ...settingsPos }}
        ref={settingsRef}
        // onMouseUp={closeModal}
      >
        <div className="settings-header">
          <span>Columns</span>
          <span
            className="settings-close"
            onClick={() => setShowSettings(false)}
          >
            [X] Close
          </span>
        </div>
        {fields.map(field => {
          const name = field.name;
          let checked = visible.includes(name);

          const handleCheck = () => {
            if (checked) {
              setVisible(visible.filter(el => el != name));
            } else {
              setVisible([...visible, name]);
            }
          };

          if (!columnExcludes.includes(name))
            return (
              <div key={name}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheck}
                />
                <label>{name}</label>
              </div>
            );
        })}
      </div>
    );
  },
);

export default Settings;
