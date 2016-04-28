import Header from './header';
import RepositoryList from './repository-list';
import Paginator from './paginator';


export default function Repositories(props) {
  return <section className="repositories" title="Repositories">
    <Header />
    <RepositoryList />
    <Paginator />
  </section>;
}
