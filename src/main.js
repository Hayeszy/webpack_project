// // 轮播图逻辑
// console.log('实现轮播图的业务逻辑')
// // tab栏切换的逻辑
// console.log('实现tabs标签页的逻辑')

// 引入banner.js和tabs.js
import './banner.js'
import './tabs.js'

// 先引入jquery
import $ from 'jquery';
$('#swiper').css('background-color', 'red')

// // 处理css
// import './styles/index.css'

// 引入less样式
import './styles/index.less';

// 引入1张图片，生成一张图 挂到html
import imgUrl from './assets/1.gif';

let img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

import imgUrl1 from './assets/logo_small.png';
const img1 = document.createElement('img');
img1.src = imgUrl1
document.body.appendChild(img1)
