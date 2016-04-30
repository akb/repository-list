import Header from './header';
import RepositoryList from './repository-list';
import Paginator from './paginator';


export default function Repositories(props) {
  const query     = {},
        namespace = props.namespace();

  if (namespace) query.namespace = namespace;

  return <section className="repositories" title="Repositories">
    <Header namespace={props.namespace} />
    <RepositoryList repositories={api.repositories(query)} />
    <Paginator />
  </section>;
}
