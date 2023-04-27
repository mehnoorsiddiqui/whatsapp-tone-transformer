class User {
    #number;
    #tone;

    constructor(number, tone = 'default') {
        this.#number = number;
        this.#tone = tone;
    }

    getNumber() {
        return this.#number;
    }

    getTone() {
        return this.#tone;
    }

    setTone(tone) {
        this.#tone = tone;
    }
}

module.exports = User;
