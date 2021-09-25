import { createStore } from 'vuex'

export function initStore() {
    return createStore({
        modules: {
            userCenter: {
                state() {
                    return {
                        refreshToken: null,
                        accessToken: null,
                        refreshExpire: null,
                        accessExpire: null,
                        auth: null,
                    }
                },
                mutations: {
                    setLoginInfo(state, payload) {
                        if (Object.prototype.hasOwnProperty.call(payload, "refreshExpire")) {
                            state.refreshExpire = payload.refreshExpire;
                        }
                        if (Object.prototype.hasOwnProperty.call(payload, "refreshToken")) {
                            state.refreshToken = payload.refreshToken;
                        }
                        if (Object.prototype.hasOwnProperty.call(payload, "accessExpire")) {
                            state.accessExpire = payload.accessExpire;
                        }
                        if (Object.prototype.hasOwnProperty.call(payload, "accessToken")) {
                            state.accessToken = payload.accessToken;
                        }
                        if (Object.prototype.hasOwnProperty.call(payload, "auth")) {
                            state.auth = payload.auth;
                        }
                    }
                }
            },
            encodingTransformer: {
                state() {
                    return {
                        selected: [],
                        unselected: [],
                        result: new Map()
                    };
                },
                mutations: {
                    setSelectedFiles(state, payload) {
                        // console.log("state:");
                        // console.dir(state);
                        // console.log("payload in callee:");
                        // console.dir(payload);
                        state.selected.splice(0, state.selected.length);
                        state.unselected.splice(0, state.selected.length);
                        state.selected.push(...payload.selected);
                        state.unselected.push(...payload.unselected);
                    },
                    setResult(state, payload) {
                        state.result.clear();
                        for (const [key, value] of payload) {
                            state.result.set(key, value);
                        }
                    }
                },
            }
        }
    })
}