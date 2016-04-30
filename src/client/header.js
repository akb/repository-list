export default function Header(props) {
  const namespaces = api.namespaces();

  if (!namespaces) {
    return <h1>spinner</h1>;
  }

  return <header>
    <div className="filter">
      <label for="filter-by">Filter by</label>
      <select name="filter-by">
        {namespaces.map(
          (n) => <option key={n} value={n}>{n}</option>
        )}
      </select>
    </div>
    <button className="button-primary">New repository</button>
  </header>;
}
