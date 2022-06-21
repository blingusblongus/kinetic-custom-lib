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
          let checked = visible.includes(field);

          const handleCheck = () => {
            if (checked) {
              setVisible(visible.filter(el => el != field));
            } else {
              setVisible([...visible, field]);
            }
          };

          if (!columnExcludes.includes(field))
            return (
              <div key={field}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheck}
                />
                <label>{field}</label>
              </div>
            );
        })}
      </div>
    );
  },
);

export default Settings;
