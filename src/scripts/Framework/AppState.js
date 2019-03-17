class AppState {
  constructor() {
    this.watchers = {
      // []
    };
  }

  watch(entity, watcher) {
    if (this.watchers[entity]) {
      this.watchers[entity].push(watcher);
    } else {
      this.watchers[entity] = [watcher];
    }
  }

  update(entity, state) {
    this.watchers[entity].forEach(watcher => watcher(state));
  }
}

export default new AppState();
