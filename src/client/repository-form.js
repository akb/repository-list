import * as uuid from 'uuid';

export default function RepositoryForm(props) {
  const changeNamespace = (event) => {
    props.namespace(event.target.value);
    global.redraw();
  };

  const changeName = (event) => {
    props.name(event.target.value);
    global.redraw();
  };

  const changePrivate = (event) => {
    props.isPrivate(event.target.checked);
    global.redraw();
  };

  const changeDescription = (event) => {
    props.description(event.target.value);
    global.redraw();
  };

  const submit = () => {
    if (!props.name() || !props.namespace()) {
      alert('A name and namespace are required to add a repository.');
      return;
    }
    const payload = util.pick(props, 'namespace', 'name', 'isPrivate', 'description');
    payload.id = uuid.v4();
    api.repositories.upsert(payload).then((request) => {
      if (request.status < 300) {
        alert('saved');
        reset();
      } else {
        alert('error', request.response);
        global.redraw();
      }
    });
  };

  const reset = () => {
    props.namespace('');
    props.name('');
    props.isPrivate(false);
    props.description('');
    props.visible(false);
    global.redraw();
  };

  return <div className="dialog">
    <h1>New Repository</h1>
    <div className="repository-form">
      <div className="repository-form-field-row">
        <div className="repository-form-field">
          <label for="namespace">Namespace</label>
          <input name="namespace"
                 type="text"
                 value={props.namespace()}
                 onChange={changeNamespace} />
        </div>
        <div className="repository-form-field">
          <label for="name">Name</label>
          <input name="name"
                 type="text"
                 value={props.name()}
                 onChange={changeName} />
        </div>
        <div className="repository-form-field">
          <input name="is-private"
                 type="checkbox"
                 checked={props.isPrivate()}
                 onChange={changePrivate} />
          <label name="is-private">Private?</label>
        </div>
      </div>
      <div className="repository-form-field-row">
        <div className="repository-form-field">
          <label for="description">Description</label>
          <input name="description"
                 type="text"
                 value={props.description()}
                 onChange={changeDescription} />
        </div>
      </div>
      <div className="repository-form-field-row">
        <button className="button-primary" onClick={submit}>
          Save
        </button>
        <button onClick={reset}>Cancel</button>
      </div>
    </div>
  </div>;
}
