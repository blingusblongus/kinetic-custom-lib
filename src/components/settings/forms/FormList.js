import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { connect } from '../../../redux/store';
import {
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import {
  I18n,
  FormTable,
  FormForm,
  fetchForm,
  refetchTable,
  submitForm,
  isValueEmpty,
  mountTable,
  unmountTable,
} from '@kineticdata/react';
import {
  FormComponents,
  ErrorMessage,
  LoadingMessage,
  addToast,
  openConfirm,
} from '@kineticdata/bundle-common';
import { PageTitle } from '../../shared/PageTitle';
import { TableComponents } from '@kineticdata/bundle-common';
import { actions } from '../../../redux/modules/settingsForms';
import { actions as queueActions } from '../../../redux/modules/settingsQueue';

const tableKey = 'queue-settings-form-list';

const ActionsCell = ({ deleteForm, toggleModal, processing }) => ({
  tableOptions: { kappSlug },
  row,
  tableKey,
}) => (
  <td className="text-right" style={{ width: '1%' }}>
    {processing.has(row.get('slug')) ? (
      <button type="button" className="btn btn-sm btn-link" disabled="disabled">
        <span className="fa fa-spinner fa-spin fa-fw" role="presentation" />
      </button>
    ) : (
      <UncontrolledDropdown className="more-actions">
        <DropdownToggle tag="button" className="btn btn-sm btn-link">
          <span className="sr-only">More Actions</span>
          <span className="fa fa-chevron-down fa-fw" role="presentation" />
        </DropdownToggle>
        <DropdownMenu right>
          <Link to={`${row.get('slug')}/settings`} className="dropdown-item">
            Settings
          </Link>
          <DropdownItem onClick={() => toggleModal(row.get('slug'))}>
            Clone
          </DropdownItem>
          <DropdownItem
            onClick={() =>
              deleteForm(row.get('slug'), () => refetchTable(tableKey))
            }
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )}
  </td>
);

const FormNameCell = ({ row, value }) => (
  <td>
    <Link to={row.get('slug')}>{value}</Link>
    <br />
    <small>{row.get('slug')}</small>
  </td>
);

const FormLayout = ({ fields, error, buttons, bindings: { cloneForm } }) => (
  <Fragment>
    <ModalBody className="form">
      {cloneForm && (
        <div className="alert alert-info text-center">
          <div className="alert-heading">
            <I18n>Cloning Form</I18n>{' '}
            <strong>
              <I18n>{cloneForm.get('name')}</I18n>
            </strong>
          </div>
          <hr className="my-2" />
          <small>
            <I18n
              render={translate =>
                translate(
                  'The attributes, categories, security policies, and all form content will be copied from the %s form into this new form.',
                ).replace('%s', translate(cloneForm.get('name')))
              }
            />
          </small>
        </div>
      )}
      <div className="form-group__columns">
        {fields.get('name')}
        {fields.get('slug')}
      </div>
      <div className="form-group__columns">
        {fields.get('status')}
        {fields.get('type')}
      </div>
      {fields.get('submissionLabelExpression')}
      {fields.get('description')}
      {error}
    </ModalBody>
    <ModalFooter className="modal-footer--full-width">{buttons}</ModalFooter>
  </Fragment>
);

const FormButtons = props => (
  <button
    className="btn btn-success"
    type="submit"
    disabled={!props.dirty || props.submitting}
    onClick={props.submit}
  >
    {props.submitting && (
      <span
        className="fa fa-circle-o-notch fa-spin fa-fw"
        role="presentation"
      />
    )}{' '}
    <I18n>Create Form</I18n>
  </button>
);

const LoadingFormLayout = () => (
  <Fragment>
    <ModalBody className="form">
      <LoadingMessage />
    </ModalBody>
    <ModalFooter className="modal-footer--full-width">
      <button className="btn btn-success" type="button" disabled={true}>
        <I18n>Create Form</I18n>
      </button>
    </ModalFooter>
  </Fragment>
);

const CloneErrorFormLayout = () => (
  <Fragment>
    <ModalBody className="form">
      <ErrorMessage message="Failed to load form to clone." />
    </ModalBody>
    <ModalFooter className="modal-footer--full-width">
      <button className="btn btn-success" type="button" disabled={true}>
        <I18n>Create Form</I18n>
      </button>
    </ModalFooter>
  </Fragment>
);

const FilterPill = props => (
  <div className="btn-group">
    <button type="button" className="btn btn-xs btn-subtle">
      {props.name}
    </button>
    <button
      type="button"
      className="btn btn-xs btn-subtle"
      onClick={props.onRemove}
    >
      <span className="fa fa-fw fa-times" />
    </button>
  </div>
);

export const FormListComponent = ({
  kapp,
  processing,
  modalOpen,
  toggleModal,
  filterModalOpen,
  setFilterModalOpen,
  deleteForm,
  cloneFormRequest,
  navigate,
  queueSettings,
  loading,
}) => {
  const EmptyBodyRow = TableComponents.generateEmptyBodyRow({
    loadingMessage: 'Loading Forms...',
    noSearchResultsMessage:
      'No forms were found - please modify your search criteria',
    noItemsMessage: 'There are no forms to display.',
    noItemsLinkTo: `/kapps/${kapp.slug}/settings/forms/new`,
    noItemsLinkToMessage: 'Add New Form',
  });

  const FilterFormLayout = ({ buttons, fields }) => (
    <Dropdown
      direction="left"
      size="sm"
      isOpen={filterModalOpen}
      toggle={() => setFilterModalOpen(!filterModalOpen)}
    >
      <DropdownToggle color="primary">Filter</DropdownToggle>
      <DropdownMenu modifiers={{ preventOverflow: { enabled: true } }}>
        <div className="filter-menu">
          <form>
            <div className="row">
              <div className="col-12">{fields.get('name')}</div>
              <div className="col-12">{fields.get('type')}</div>
              <div className="col-12">{fields.get('status')}</div>
            </div>
            <span className="text-right">{buttons}</span>
          </form>
        </div>
      </DropdownMenu>
    </Dropdown>
  );

  const FilterFormButtons = ({ fields, formKey, ...props }) => {
    const resetFilterForm = () => () => {
      const values = fields.map(() => null);
      submitForm(formKey, { values });
    };
    return (
      <div className="form-buttons__right">
        <button className="btn btn-link" onClick={resetFilterForm()}>
          Reset
        </button>
        <button
          className="btn btn-success"
          type="submit"
          disabled={!props.dirty || props.submitting}
          onClick={props.submit}
        >
          {props.submitting ? (
            <span className="fa fa-circle-o-notch fa-spin fa-fw" />
          ) : (
            <span className="fa fa-check fa-fw" />
          )}
          Apply
        </button>
      </div>
    );
  };

  return (
    !loading && (
      <FormTable
        tableKey={tableKey}
        kappSlug={kapp.slug}
        components={{
          EmptyBodyRow,
          FilterFormLayout,
          FilterFormButtons,
        }}
        columnSet={[
          'name',
          'description',
          'type',
          'updatedAt',
          'createdAt',
          'status',
          'actions',
        ]}
        defaultSortColumn="name"
        defaultSortDirection="asc"
        addColumns={[
          { value: 'description', title: 'Description', sortable: false },
          {
            value: 'actions',
            title: ' ',
            sortable: false,
            components: {
              BodyCell: ActionsCell({ deleteForm, toggleModal, processing }),
            },
            className: 'text-right',
          },
        ]}
        alterColumns={{
          updatedAt: { components: { BodyCell: TableComponents.TimeAgoCell } },
          createdAt: { components: { BodyCell: TableComponents.TimeAgoCell } },
          name: { components: { BodyCell: FormNameCell } },
          status: {
            components: {
              BodyCell: TableComponents.StatusBadgeCell,
            },
          },
        }}
        filterSet={['name', 'type', 'status']}
        alterFilters={{
          type: {
            options: queueSettings.queueSettingsKapp.formTypes.map(
              ({ name }) => ({
                value: name,
                label: name,
              }),
            ),
          },
        }}
        onSearch={() => () => setFilterModalOpen(false)}
      >
        {({ pagination, table, filter, appliedFilters, filterFormKey }) => {
          const handleClearFilter = filter => () =>
            submitForm(filterFormKey, { values: { [filter]: null } });

          const filterPills = appliedFilters
            .filter(filter => !isValueEmpty(filter))
            .keySeq()
            .map(filterName => (
              <FilterPill
                key={filterName}
                name={filterName}
                onRemove={handleClearFilter(filterName)}
              />
            ));

          return (
            <div className="page-container">
              <PageTitle parts={[`Forms`]} />
              <div className="page-panel page-panel--white">
                <div className="page-title">
                  <div
                    role="navigation"
                    aria-label="breadcrumbs"
                    className="page-title__breadcrumbs"
                  >
                    <span className="breadcrumb-item">
                      <Link to="../../">
                        <I18n>queue</I18n>
                      </Link>{' '}
                    </span>
                    <span aria-hidden="true">/ </span>
                    <span className="breadcrumb-item">
                      <Link to="../">
                        <I18n>settings</I18n>
                      </Link>{' '}
                    </span>
                    <span aria-hidden="true">/ </span>

                    <h1>
                      <I18n>Forms</I18n>
                    </h1>
                  </div>
                  <div className="page-title__actions">
                    <I18n
                      render={translate => (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          title={translate('New Form')}
                          onClick={() => toggleModal(true)}
                        >
                          <span className="fa fa-plus fa-fw" />{' '}
                          {translate('New Form')}
                        </button>
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-right">{filter}</div>
                  {filterPills.size > 0 && (
                    <div className="filter-pills">{filterPills}</div>
                  )}
                  {table}
                  {pagination}
                </div>
              </div>

              {/* Modal for creating a new form */}
              <Modal
                isOpen={!!modalOpen}
                toggle={() => toggleModal()}
                size="lg"
              >
                <div className="modal-header">
                  <h4 className="modal-title">
                    <button
                      type="button"
                      className="btn btn-link btn-delete"
                      onClick={() => toggleModal()}
                    >
                      <I18n>Close</I18n>
                    </button>
                    <span>
                      <I18n>New Form</I18n>
                    </span>
                  </h4>
                </div>
                <FormForm
                  kappSlug={kapp.slug}
                  fieldSet={[
                    'name',
                    'slug',
                    'status',
                    'type',
                    'submissionLabelExpression',
                    'description',
                  ]}
                  onSave={() => form => {
                    if (typeof modalOpen === 'string') {
                      cloneFormRequest({
                        kappSlug: kapp.slug,
                        formSlug: form.slug,
                        cloneFormSlug: modalOpen,
                        callback: () => navigate(`${form.slug}/settings`),
                      });
                    } else {
                      addToast(`${form.name} created successfully.`);
                      navigate(`${form.slug}/settings`);
                    }
                  }}
                  components={{ FormLayout, FormButtons }}
                  alterFields={{
                    description: { component: FormComponents.TextAreaField },
                  }}
                  addDataSources={
                    typeof modalOpen === 'string'
                      ? {
                          cloneForm: {
                            fn: fetchForm,
                            params: [
                              { kappSlug: kapp.slug, formSlug: modalOpen },
                            ],
                            transform: result => result.form || result,
                          },
                        }
                      : undefined // Set to the form, or the result in case of an error
                  }
                >
                  {({ form, initialized, bindings: { cloneForm } }) => {
                    const isClone = typeof modalOpen === 'string';
                    const cloneError = cloneForm && cloneForm.get('error');
                    return initialized && (!isClone || cloneForm) ? (
                      cloneError ? (
                        <CloneErrorFormLayout />
                      ) : (
                        form
                      )
                    ) : (
                      <LoadingFormLayout />
                    );
                  }}
                </FormForm>
              </Modal>
            </div>
          );
        }}
      </FormTable>
    )
  );
};

const mapStateToProps = state => ({
  kapp: state.app.kapp,
  processing: state.settingsForms.processing,
  queueSettings: state.queueSettings,
  loading: state.queueSettings.loading,
});

const mapDispatchToProps = {
  deleteFormRequest: actions.deleteFormRequest,
  cloneFormRequest: actions.cloneFormRequest,
  fetchQueueSettings: queueActions.fetchQueueSettings,
};

// Settings Container
export const FormList = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('modalOpen', 'setModalOpen', false),
  withState('filterModalOpen', 'setFilterModalOpen', false),
  withHandlers({
    toggleModal: props => slug =>
      !slug || slug === props.modalOpen
        ? props.setModalOpen(false)
        : props.setModalOpen(slug),
    deleteForm: props => (formSlug, onSuccess) =>
      openConfirm({
        title: 'Delete Form',
        body: 'Are you sure you want to delete this form?',
        confirmationText: formSlug,
        confirmationTextLabel: 'form slug',
        actionName: 'Delete',
        ok: () =>
          props.deleteFormRequest({
            kappSlug: props.kapp.slug,
            formSlug,
            onSuccess,
          }),
      }),
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchQueueSettings();
      mountTable(tableKey);
    },
    componentWillUnmount() {
      unmountTable(tableKey);
    },
  }),
)(FormListComponent);
