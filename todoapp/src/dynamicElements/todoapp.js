export default `<PouchDB name="todoapp">
  <Container>
    <section className="todoapp">
      <header>
        <h1>{t('header')}</h1>
      </header>
      <Input />
      <section className="main">
        <ToggleAll />
        <List />
        <Footer />
      </section>
    </section>
  </Container>
</PouchDB>`;
