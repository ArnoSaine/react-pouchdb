export default `<aside className="learn">
  <header>
    <h3>react-pouchdb</h3>
    <h5>{t('example')}</h5>
    <a href="https://github.com/ArnoSaine/react-pouchdb/tree/master/todoapp">
      {t('source')}
    </a>
    <hr />
    <ul>
      <Dynamic id="asideLink" href="https://github.com/ArnoSaine/react-pouchdb">
        react-pouchdb
      </Dynamic>
      <Dynamic id="asideLink" href="https://pouchdb.com">
        PouchDB
      </Dynamic>
      <Dynamic id="asideLink" href="http://couchdb.apache.org">
        CouchDB
      </Dynamic>
    </ul>
    <hr />
    <h5>{t('shortcuts')}</h5>
    <ul>
      <li>
        <Link to="/resource-editor">{t('resourceEditor')}</Link>
      </li>
      <li>
        <code>SHIFT+E</code>: {t('toggleEditMode')}
      </li>
    </ul>
    <hr />
    <h5>{t('changeLanguage')}</h5>
    <LanguageSelector availableLanguages={availableLanguages}/>
  </header>
</aside>`;
