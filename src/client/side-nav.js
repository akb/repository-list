export default function SideNav(props) {
  var tab = props.tab;

  const onClick = (name) => {
    tab(name);
    global.redraw();
  };

  const NavItem = (props) => {
    let itemClass;
    if (props.name === tab()) {
      itemClass = 'nav-item nav-item-selected';
    } else {
      itemClass = 'nav-item';
    }

    return <div className={itemClass}
                title={props.title}
                onClick={onClick.bind(null, props.name)}>
      <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
    </div>;
  };

  return <nav className="side-nav">
    <NavItem name="dashboard" title="Dashboard" icon="tachometer" />
    <NavItem name="repositories" title="Repositories" icon="tasks" />
    <NavItem name="data-centers" title="Data Centers" icon="building" />
    <NavItem name="user-management" title="User Management" icon="user" />
    <NavItem name="configuration" title="Configuration" icon="cog" />
    <NavItem name="documentation" title="Documentation" icon="align-left" />
  </nav>;
}
