class Either {
    constructor(value) {
        this._value = value
    }

    get value() {
        return this._value
    }

    static left(a) {
        return new Left(a)
    }

    static right(a) {
        return new Right(a)
    }

    static fromNullable(val) {
        return val !== null ? this.right(val) : this.left(val)
    }

    static of(a) {
        return this.right(a)
    }

}

class Left extends Either {
    map(_){
        return this
    }

    get value() {
        throw new TypeError('不能从Left(a)中获取值')
    }

    getOrElse(other){
        return other
    }

    orElse(fn){
        return fn(this.value)
    }

    chain(f){
        return this
    }

    getOrElseThrow(a){
        throw new Error(a)
    }

    filter(f){
        return this
    }

    toString(){
        return `Either.Left(${this.value})`
    }
}

class Right extends Either {
    map(fn){
        return Either.of(fn(this.value))
    }

    getOrElse(other){
        return this.value
    }

    orElse() {
        return this
    }

    chain(fn){
        return fn(this.value)
    }

    getOrElseThrow(_) {
        return this.value
    }

    filter(fn){
        return Either.fromNullable(fn(this.value) ? this.value : null)
    }

    toString(){
        return `Either.Right(${this.value})`
    }
}

module.exports = Either
