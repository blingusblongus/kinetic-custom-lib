export default (
  <form onSubmit={handleSubmit} onSubmitCapture={handleSubmit}>
    <div className="label-description">Ticket #{ticket?.number}</div>
    <div className="submission-grid">
      {/* <InputLabel id="estimate-label">Estimate</InputLabel>

            <TextField
              name="Estimated Duration"
              variant="standard"
              type="number"
              placeholder="Estimated Hours"
              sx={{
                "input[type='number']:not(.form-control)": {
                  padding: 0,
                  border: 'none',
                  height: '2.1rem',
                },
              }}
            />
            <div /> */}

      <div className="submission-subgrid">
        <InputLabel htmlFor="date" id="date-label">
          Due Date
        </InputLabel>
        <input type="date" name="date" />
      </div>

      <div className="submission-subgrid" />

      <div className="submission-subgrid">
        <InputLabel htmlFor="ticket-submission-priority" id="priority-label">
          Priority
        </InputLabel>

        <Select
          variant="standard"
          labelId="priority-label"
          defaultValue={1}
          name="priority"
        >
          {prioritySelections}
        </Select>
      </div>

      <div className="submission-subgrid">
        <a className="icon-link">
          <AttachFileIcon />Attach File
        </a>
      </div>
    </div>

    <div className="flex flex-column form-section">
      <label className="label-description" htmlFor="short-description">
        Short Description
      </label>
      <textarea
        name="short-description"
        rows={4}
        placeholder="Add a more detailed description..."
      />
    </div>

    <div className="flex flex-column form-section">
      <label className="label-description" htmlFor="full-description">
        Full Description
      </label>
      <textarea
        name="full-description"
        rows={8}
        placeholder="Add a more detailed description..."
      />
    </div>

    <div className="flex flex-right">
      <TeamsButton type="submit">Submit</TeamsButton>
    </div>
  </form>
);
