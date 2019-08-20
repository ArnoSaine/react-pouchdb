export default `<ul className="filters">
  <Dynamic id="filterLink" to="/">
    {t('filter.all')}
  </Dynamic>
  <Dynamic id="filterLink" to="/active">
    {t('filter.active')}
  </Dynamic>
  <Dynamic id="filterLink" to="/completed">
    {t('filter.completed')}
  </Dynamic>
</ul>`;
