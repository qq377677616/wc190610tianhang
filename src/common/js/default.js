/*页面默认js*/
//VConsole配置
import Vue from 'vue'
import VConsole from 'vconsole'
//if (process.env.NODE_ENV !== 'production') {
  var vConsole = new VConsole()
//}
//埋点配置
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-129594456-3');
Vue.prototype.$buryPoint = function(name,type,tag){
  gtag('event', name, { 
    'event_category' : type,
    'event_label' : tag 
  });
}