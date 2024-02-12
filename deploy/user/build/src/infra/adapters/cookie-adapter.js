"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieAdapter = void 0;
class CookieAdapter {
    constructor(session, sessionOptions) {
        this.session = null;
        this.sessionOptions = null;
        this.session = session;
        this.sessionOptions = sessionOptions;
    }
    static build(session, sessionOptions) {
        return new CookieAdapter(session, sessionOptions);
    }
    set(options) {
        if (this.session !== undefined && this.session !== null) {
            this.session[options.sessionName] = options.value;
            this.sessionOptions = { ...this.sessionOptions, maxAge: 24 * 60 * 1000 * 24 };
        }
    }
    destroy(sessionName) {
        if (this.session !== undefined && this.session !== null) {
            this.session = {};
        }
        return this.session;
    }
}
exports.CookieAdapter = CookieAdapter;
