export default `<PouchDB name="todoapp" maxListeners={100}>
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
