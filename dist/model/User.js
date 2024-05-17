"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, fullname, document, password, phone, email, street, number, complement, neighborhood, city, state, postalCode) {
        if (id !== null)
            this.id = id;
        this.fullname = fullname;
        this.document = document;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.address = { street, number, complement, neighborhood, city, state, postalCode };
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map