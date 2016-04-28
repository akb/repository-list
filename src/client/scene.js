import SideNav from './side-nav';
import Repositories from './repositories';


export default function Scene(props) {
  let Tab = (props) =>
    util.cond(props.model.tab())
      .when('repositories', <Repositories model={props.model.repositories} />)
      .else(<div className="error">{"This tab hasn't been implemented"}</div>);

  return <div className="scene">
    <SideNav tab={props.model.tab} />
    <Tab {...props} />
  </div>;
}
