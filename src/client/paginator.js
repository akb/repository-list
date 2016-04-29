export default function Paginator(props) {
  return <div className="paginator">
    <button title="previous">
      <i className="fa fa-chevron-left"></i>
    </button>
    <button title="page 1">1</button>
    <button title="page 2">2</button>
    <button title="page 3">3</button>
    <button title="page 4">4</button>
    <button title="next">
      <i className="fa fa-chevron-right"></i>
    </button>
  </div>;
}
