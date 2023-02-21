/**
 * 全局发布订阅事件
 */
class EventBus {
  events: any;

  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(name: string, fn: Function) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }

  // 发布事件
  emit(name: string, ...args: any) {
    if (this.events[name]) {
      this.events[name].forEach((fn: Function) => fn(...args));
    }
  }

  // 移除某个事件名下的某个事件
  off(name: string, fn: Function) {
    if (this.events[name]) {
      // 只有当这两个方法是同一个内存地址时才相等
      const targetIndex = this.events[name].findIndex((item: Function) => item === fn);

      // 删除该事件下指定的订阅行为
      if (targetIndex !== -1) {
        this.events[name].splice(targetIndex, 1);
      }
      // 该事件下无订阅行为时直接删除该订阅事件
      if (this.events[name].length === 0) {
        delete this.events[name];
      }
    }
  }

  // 移除某个事件名下的所有事件
  offAll(name: string) {
    if (this.events[name]) {
      delete this.events[name];
    }
  }
}

export default new EventBus();
