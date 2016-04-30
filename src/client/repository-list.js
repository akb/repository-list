export default function RepositoryList(props) {
  if (!props.repositories) {
    return <h1>spinner</h1>;
  }

  return <ul>
    {props.repositories.map(
      (repo) => <RepositoryListItem key={repo.id} {...repo} />
    )}
  </ul>;
}

const RepositoryListItem = (props) =>
  <li>
    <div className="repository-primary">
      <span className="repository-namespace">{props.namespace}</span>
      <span className="separator">/</span>
      <span className="repository-name">{props.name}</span>
      {props.isPrivate && <span className="repository-private">private</span>}
    </div>
    <div className="repository-secondary">
      {props.description}
    </div>
  </li>;
