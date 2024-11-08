
const URLDomain = {
    baseURL: "http://shrimppond.runasp.net" + "/api",
    headers: {
        "Content-Type": "application/json",
    },
    validateStatus: (status) => status < 400,
}

export {
    URLDomain,
}
