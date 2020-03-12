export const request = function(params){
    return new Promise((resolve,rej)=>{
        wx.request({
            ...params,
            success(res){
                resolve(res)
            },
            fail(err){
                rej(err)
            }
        })
    })
}