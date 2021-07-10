module.exports = class Verif {
    static regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
    static emailVerif(email) {
        if (this.regexEmail.test(email)) {
            return true;
        }
        return false;
    }
};