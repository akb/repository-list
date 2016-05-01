import Throbber from './throbber';


export default function Paginator(props) {
  const collection = props.collection,
        pageSize   = parseInt(props.pageSize);

  const disabled = !(collection && collection.total);

  if (!disabled) props.total(collection.total);

  const total  = props.total(),
        offset = props.offset(),
        count  = parseInt(props.count),
        pages  = Math.ceil(total / pageSize),
        page   = Math.floor(offset / pageSize);

  const onClick = (event) => {
    const total    = props.total(),
          offset   = props.offset(),
          pages    = Math.ceil(total / pageSize),
          pageAttr = event.target.dataset.page;

    const newOffset = util.cond(pageAttr)
      .when('first', 0)
      .when('last', () => (pages - 1) * pageSize)
      .when('previous', () => offset - pageSize)
      .when('next', () => offset + pageSize)
      .else(() => parseInt(pageAttr) * pageSize);

    if (newOffset < 0) {
      props.offset(0);
    } else if (newOffset > total) {
      props.offset(1 + pageSize * pages);
    } else if (Number.isFinite(newOffset)) {
      props.offset(newOffset);
    }

    global.redraw();
  };

  let start = (page - count / 2);
  start = Math.max(0, (start > pages - count ? pages - count : start));

  const end             = Math.min(pages, start + pageSize),
        disableFirst    = page === 0,
        disableLast     = page === pages - 1,
        disablePrevious = offset < 1,
        disableNext     = offset + pageSize > total;

  return <div className={disabled ? "paginator disabled" : "paginator"}
              onClick={onClick}>
    <button title="First Page" data-page="first" disabled={disableFirst}>
      <i className="fa fa-fast-backward"></i>
    </button>
    <button title="Previous Page" data-page="previous" disabled={disablePrevious}>
      <i className="fa fa-chevron-left"></i>
    </button>
    {start > 0 && <span>&hellip;</span>}
    {util.range(start, end).map(
      (p) => <PaginatorButton key={p} current={page} page={p} />
    )}
    {start < pages - count && <span>&hellip;</span>}
    <button title="Next Page" data-page="next" disabled={disableNext}>
      <i className="fa fa-chevron-right"></i>
    </button>
    <button title="Last Page" data-page="last" disabled={disableLast}>
      <i className="fa fa-fast-forward"></i>
    </button>
  </div>;
}

const PaginatorButton = (props) =>
  <button title={`Page ${props.page + 1}`}
          className={props.page === props.current && 'button-primary'}
          data-page={props.page}>
    {props.page + 1}
  </button>;
