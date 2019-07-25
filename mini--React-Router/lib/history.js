const his = window.history;
class History {
    constructor() {
        this.push = path => {
            his.pushState({}, "", path);
            this.notifyAll();
        };

        this.listen = listener => {
            this.listeners.push(listener);
            return () => {
                this.listeners = this.listeners.filter(ele => ele !== listener);
            };
        };

        this.notifyAll = () => {
            this.listeners.forEach(lis => {
                lis();
            });
        };

        this.listeners = [];
    }

}

export default new History();