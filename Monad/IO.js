class IO {
    constructor(effect) {
        if (typeof effect !== 'function') {
            throw 'IO 需要使用函数'
        }
        this.effect = effect
    }

    static of(a) {
        return new IO(() => a)
    }

    static from(fn) {
        return new IO(fn)
    }

    map(fn) {
        const self = this
        return new IO(() => fn(self.effect))
    }

    chain(fn) {
        return fn(this.effect())
    }

    run() {
        return this.effect()
    }
}

module.exports = IO
