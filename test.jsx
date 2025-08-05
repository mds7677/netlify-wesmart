class Dispatcher {
  _stores = [];

  register(store) {
    this._stores.push(store);
  }

  dispatch(action) {
    this._stores.forEach((store) => {
      store.update(action);
    });
  }
}

class ToDoStore {
  _attachComponents = [];
  _todos = [];

  constructor(dispatcher) {
    dispatcher.register(this);
  }

  attachComponent(component) {
    this._attachComponents.push(component);
  }

  update(action) {
    if (action.type === ActionTypes.ADD_TODO) {
      this._todos.push(action.title);
    }
    this._attachComponents.forEach((component) => {
      component.render(this._todos);
    });
  }
}

const Actions = {
  addTodo(title) {
    dispatcher.dispatch({
      type: ActionTypes.ADD_TODO,
      title,
    });
  },
};
