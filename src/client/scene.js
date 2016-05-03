import SideNav from './side-nav';
import Repositories from './repositories';


export const Scene = (props) =>
  <div className="scene">
    <SideNav tab={props.tab} />
    <Tab {...props} />
  </div>;


const Tab = (props) =>
  util.cond(props.tab())
    .when('repositories', <Repositories {...props.repositories} />)
    .else(<section className="error">{"This tab hasn't been implemented"}</section>);
