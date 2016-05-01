import Header from './header';
import RepositoryList from './repository-list';
import Paginator from './paginator';


export default function Repositories(props) {
  const pageSize  = 10,
        query     = {},
        namespace = props.namespace(),
        offset    = props.offset();

  if (namespace) query.namespace = namespace;
  if (Number.isFinite(offset)) query.offset = offset;
  query.size = pageSize;

  const repositories = api.repositories(query);

  return <section className="repositories" title="Repositories">
    <Header namespace={props.namespace}
            offset={props.offset} />
    <RepositoryList repositories={repositories} />
    <Paginator collection={repositories}
               pageSize={pageSize}
               count="10"
               total={props.total}
               offset={props.offset} />
  </section>;
}
