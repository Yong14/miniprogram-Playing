
module.exports = (url,data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data,
            success: resolve,
            fail:reject
        })
    })
}