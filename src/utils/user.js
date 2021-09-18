import axios from 'axios';

const userCenter_baseUrl = "http://localhost:8001";

async function getNewTempAccountAsync() {
    let response = await axios.post(userCenter_baseUrl + "/temp/create");
    let data = response.data;
    return data;
}

async function getAccessTokenFromRefreshTokenAsync(refreshToken) {
    let response = await axios.post(userCenter_baseUrl + "/token/access", {
        refreshToken: refreshToken
    });
    let data = response.data;
    return {
        accessToken: data.accessToken,
        accessExpire: data.accessExpire,
        auth: data.auth
    };
}

async function getNewRefreshTokenfromOldAsync(refreshToken) {
    let response = await axios.post(userCenter_baseUrl + "/token/access", {
        refreshToken: refreshToken
    });
    let data = response.data;
    return {
        refreshToken: data.refreshToken,
        refreshExpire: data.refreshExpire,
        auth: data.auth
    };
}

function willExpireAfterSecond(expireTimestamp, second) {
    return Number(expireTimestamp) < Date.now() + second * 1000;
}

function save(store, payload) {
    store.commit("setLoginInfo", payload);
}


export async function ensureLoginAsync(store) {
    console.log("calling ensureLoginAsync");
    // console.log("store.state:");
    // console.dir(store.state);
    // console.log("localStorage:");
    // console.dir(localStorage);
    let state = store.state.userCenter;
    let v_state = {
        refreshToken: state.refreshToken,
        refreshExpire: state.refreshExpire,
        accessToken: state.accessToken,
        accessExpire: state.accessExpire,
        auth: state.auth,
    };
    try {
        if (!v_state.refreshToken || !v_state.refreshExpire || willExpireAfterSecond(v_state.refreshExpire, 60)) { 
            // no refreshToken or it is still in localStorage or it has already expired
            let l_refreshToken = localStorage.getItem("refreshToken");
            let l_refreshExpire = localStorage.getItem("refreshExpire");
            if (l_refreshToken != null 
                && l_refreshExpire != null 
                && !willExpireAfterSecond(l_refreshExpire, 60)) {
                let accessInfo = await getAccessTokenFromRefreshTokenAsync(l_refreshToken);
                v_state = {
                    refreshToken: l_refreshToken,
                    refreshExpire: l_refreshExpire,
                    ...accessInfo
                }
                save(store, v_state);
            }
            else {
                // now, need to create a new temp account
                let data = await getNewTempAccountAsync();
                save(store, data);
                localStorage.setItem("refreshToken", data.refreshToken);
                localStorage.setItem("refreshExpire", data.refreshExpire);
                store.commit("setLoginInfo", data);
                return;
            }
        }
        // now refreshToken is not null and not expired
        if (willExpireAfterSecond(v_state.refreshExpire, 24 * 60 * 60)) {
            let newTokenInfo = await getNewRefreshTokenfromOldAsync(v_state.refreshToken);
            v_state.refreshToken = newTokenInfo.refreshToken;
            v_state.refreshExpire = newTokenInfo.refreshExpire;
            v_state.auth = newTokenInfo.auth;
            save(store, newTokenInfo);
            localStorage.setItem("refreshToken", newTokenInfo.refreshToken);
            localStorage.setItem("refreshExpire", newTokenInfo.refreshExpire);
        }
        if (!v_state.accessToken || !v_state.accessExpire || willExpireAfterSecond(v_state.accessExpire, 60)) {
            let tokenInfo = await getAccessTokenFromRefreshTokenAsync(v_state.refreshToken);
            save(store, tokenInfo);
        }
    }
    finally {
        console.log("called ensureLoginAsync");
        // console.log("store.state:");
        // console.dir(store.state);
        // console.log("localStorage:");
        // console.dir(localStorage);
    }
}