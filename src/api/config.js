export const ERR_Ok = 0//请求成功
export const ERR_NO = 8001//购买时-创建订单失败,请重试
export const ERR_WAIT = 9000//年輕人再等等，總會出來的
export const ASSETSURL = 'https://res.whatthebet.com/games/assets'//静态资源CDN地址

export const TOAST = ['服务器异常，请稍后再试', '网络异常，请稍后再试', '网络异常，开奖失败']

export function combination(m, n) {
    return factorial(m,n)/factorial(n,n)
}

function factorial(m, n) {
    var num = 1
    var count = 0
    for(var i = m; i > 0; i--){
        if (count == n) {
        break
        }
        num = num * i
        count++
    }
    return num
}