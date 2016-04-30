import SideNav from './side-nav';
import Repositories from './repositories';


export default function Scene(props) {
  let Tab = (props) =>
    util.cond(props.tab())
      .when('repositories', <Repositories {...props.repositories} />)
      .else(<div className="error">{"This tab hasn't been implemented"}</div>);

  return <div className="scene">
    <SideNav tab={props.tab} />
    <Tab {...props} />
  </div>;
}
