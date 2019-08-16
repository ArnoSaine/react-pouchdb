export default function reset(put, resource) {
  put({
    _id: 'en',
    _rev: resource?._rev,
    bundle: {
      header: 'todos',
      resourceEditorHeader: 'Resource Editor',
      resetResource: 'Reset',
      loading: 'loading',
      placeholder: 'What needs to be done?',
      clearCompleted: 'Clear completed ({{length}})',
      todoCount: '{{count}} item left',
      todoCount_plural: '{{count}} items left',
      filter: {
        '': 'All',
        active: 'Active',
        completed: 'Completed'
      }
    }
  });
}
