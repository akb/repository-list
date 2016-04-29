export default function RepositoryList(props) {
  return <ul>
    <li>
      <div className="repository-primary">
        <span className="repository-namespace">docker</span>
        <span className="separator">/</span>
        <span className="repository-name">a-cool-repo</span>
        <span className="repository-private">private</span>
      </div>
    </li>
    <li>
      <div className="repository-primary">
        <span className="repository-namespace">awesome-org-right-here</span>
        <span className="separator">/</span>
        <span className="repository-name">master</span>
      </div>
      <div className="repository-secondary">
        This is the description, not the README, of this wonderful repo.
      </div>
    </li>
  </ul>;
}
