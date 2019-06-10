//时间格式
export function time(value) {
  let date
  const ua = navigator.userAgent.toLowerCase() 
  if (/iphone|ipad|ipod/.test(ua)) {
    date = new Date(value.replace(/-/g, "/"))   
  }  else {
     date = new Date(value)
  }
  const Y = date.getFullYear() + '-',
  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
  D = date.getDate() + ' ',
  h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
  m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':',
  s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds()) 
  return h+m+s    
}
//是否有数据
export function station(value) {
  if (value) {
    return value
  } else {
    return '暂无数据'
  }    
}
//字符串提取
export function changeTime(value) {
  if (value) {
    return value.substring(10)
  }    
}
//保留n位小数
export function retainedDecimal(x, n, math) {
  n = n || 2 
  math = math || 'floor'
  var f_x = parseFloat(x)
  if (isNaN(f_x)) {
    return 0
  }
  var _n = '1'
  for (var i = 0; i < n; i++) {
    _n += '0'
  }
  _n = Number(_n)
  if (math == 'none') {
    f_x = parseInt(x * _n) / _n
  } else if (math == 'round'){
    f_x = Math.round(x * _n) / _n
  } else if (math == 'floor'){
    f_x = Math.floor(x * _n) / _n
  } else if (math == 'ceil'){
    f_x = Math.ceil(x * _n) / _n
  }
  var s_x = f_x.toString()
  var pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + n) {
    s_x += '0'
  }                                     
  return s_x
}