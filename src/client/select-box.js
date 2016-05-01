export default function SelectBox(props) {
  return <div className="select-box">
    <select name={props.name}
            disabled={!props.options}
            defaultValue={props.defaultValue}
            onChange={props.onChange}>
      {props.nullOption && <option value="">{props.nullOption}</option>}
      {props.options && props.options.map(
        (n) => <option key={n} value={n}>{n}</option>
      )}
    </select>
    <i className="fa fa-caret-down"></i>
  </div>;
}
