export default function Header(props) {
  return <header>
    <div className="filter">
      <label for="filter-by">Filter by</label>
      <select name="filter-by">
        <option value="0">All accounts</option>
        <option value="1">Acme</option>
        <option value="2">Docker</option>
      </select>
    </div>
    <button className="button-primary">New repository</button>
  </header>;
}
