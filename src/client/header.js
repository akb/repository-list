export default function Header(props) {
  const namespace  = props.namespace,
        namespaces = api.namespaces();

  if (!namespaces) {
    return <h1>spinner</h1>;
  }

  const onChange = (event) => {
    namespace(event.target.value);
    global.redraw();
  };

  return <header>
    <div className="filter">
      <label for="filter-by">Filter by</label>
      <select name="filter-by"
              defaultValue={namespace() || 0}
              onChange={onChange}>
        <option value="">All accounts</option>
        {namespaces.map(
          (n) => <option key={n} value={n}>{n}</option>
        )}
      </select>
    </div>
    <button className="button-primary">New repository</button>
  </header>;
}
