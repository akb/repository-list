import SelectBox from './select-box';
import Throbber from './throbber';


export default function Header(props) {
  const namespace  = props.namespace,
        namespaces = api.namespaces();

  const onChange = (event) => {
    namespace(event.target.value);
    props.offset(0);
    global.redraw();
  };

  return <header>
    <div className="layout-split">
      <div className="filter">
        <label for="filter-by">Filter&nbsp;by</label>
        <SelectBox
          name="filter-by"
          defaultValue={namespace() || 0}
          onChange={onChange}
          nullOption="All accounts"
          options={namespaces} />
      </div>
      <button className="button-primary">New repository</button>
    </div>
  </header>;
}
