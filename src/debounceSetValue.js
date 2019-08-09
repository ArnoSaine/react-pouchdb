import { debounce } from 'lodash';

export default ({
  reactPouchDBOptions,
  reactPouchDBOptions: {
    debounceUpdatesWait: wait = 100,
    debounceUpdatesMaxWait: maxWait = 1000
  }
}) =>
  reactPouchDBOptions.debounceUpdatesWait === null
    ? x => x
    : setValue =>
        // For batch of changes from bulkDocs, update only every `maxWait`.
        // If there were more updates, update also finally after `wait`.
        debounce(setValue, wait, {
          leading: true,
          trailing: true,
          maxWait
        });
