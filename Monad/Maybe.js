class Maybe {
    static just(v) {
        return new Just(v)
    }

    static nothing() {
        return new Nothing()
    }

    static fromNullAble(v) {
        return v !== null ? this.just(v) : this.nothing()
    }

    static of(v) {
        return this.just(v)
    }

    get isNothing() {
        return false
    }

    get isJust() {
        return false
    }
}

class Just extends Maybe {
    constructor(value) {
        super()
        this._value = value
    }

    get value() {
        return this._value
    }

    map(f) {
        return Just.of(this.value)
    }

    getOrElse() {
        return this.value
    }

    filter(f) {
        Maybe.fromNullAble(f(this.value) ? this.value : null)
    }

    get isJust() {
        return true
    }

    toString() {
        return `Maybe.Just(${this.value})`
    }

}

class Nothing extends Maybe {
    map(f) {
        return this
    }

    get value() {
        throw new TypeError('不能从Nothing中获取值')
    }

    getOrElse(other) {
        return other
    }

    filter() {
        return this.value
    }

    get isNothing() {
        return true
    }

    toString() {
        return 'Maybe.Nothing'
    }

}

module.exports = Maybe


