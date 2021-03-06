import Throbber from './throbber';


export default function RepositoryList(props) {
  if (!props.repositories) return <Throbber />;

  return <div className="repository-list">
    <ul>
      {props.repositories.items.map(
        (repo) => <RepositoryListItem key={repo.id} {...repo} />
      )}
    </ul>
  </div>;
}

const RepositoryListItem = (props) =>
  <li>
    <div className="repository-primary">
      <span className="repository-namespace">{props.namespace}</span>
      <span className="separator">&nbsp;/&nbsp;</span>
      <span className="repository-name">{props.name}</span>
      {props.isPrivate && <span className="repository-private">private</span>}
    </div>
    {props.description && <div className="repository-secondary">{props.description}</div>}
  </li>;
