(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{677:function(t,n,e){},811:function(t,n,e){"use strict";var r=e(677);e.n(r).a},876:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return a}));var r=e(269),i=e.n(r),o={name:"Print",methods:{print1:function(t){var n=document.body.innerHTML,e=document.querySelector("#print").innerHTML;document.body.innerHTML=e,window.print(),document.body.innerHTML=n,location.reload()},print2:function(){var t=document.createElement("iframe");t.setAttribute("style","overflow:hidden;width:0px;height:0px; "),document.body.appendChild(t);var n=t.contentWindow.document,e=document.querySelector("#print").innerHTML;n.write(e),n.close(),t.contentWindow.focus(),t.contentWindow.print(),document.body.removeChild(t)},print3:function(){var t=document.querySelector("#print").innerHTML,n=window.open("","printwindow","height=300, width=700, top=100, left=100, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no");n.document.body.innerHTML=t,n.print()},print4:function(){for(var t=document.querySelector("#print").cloneNode(!0),n=i()(document.body.children).filter((function(t){return"SCRIPT"!=t.nodeName})),e=n.length;e--;)n[e].style.display="none";document.body.appendChild(t),window.print();for(var r=n.length;r--;)n[r].style.display="block";document.body.removeChild(t)},print5:function(){document.querySelector("#printFrame").setAttribute("src","./static/print/print.html")}}},c=(e(811),e(51)),a=Object(c.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[t._m(0),t._v(" "),e("br"),t._v(" "),e("h3",[t._v("1.替换body内容的方式")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(n){return t.print1("print")}}},[t._v("替换body内容")]),t._v(" "),t._m(1),t._v(" "),e("p",[t._v("\n    #如果打印内容的样式是继承而来的将会无效，比如父元素设置了文字颜色，打印时这个CSS属性不会生效。\n  ")]),t._v(" "),e("br"),t._v(" "),e("h3",[t._v("2.动态创建iframe")]),t._v(" "),t._m(2),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.print2}},[t._v("动态创建iframe")]),t._v(" "),e("p"),t._v(" "),e("br"),t._v(" "),e("h3",[t._v("3.在新窗口中进行打印")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.print3}},[t._v("新窗口打印")]),t._v(" "),e("p"),t._v(" "),e("br"),t._v(" "),e("h3",[t._v("4.隐藏body子元素的方式")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.print4}},[t._v("隐藏body子元素")]),t._v(" "),e("p"),t._v(" "),e("br"),t._v(" "),e("h3",[t._v("5.iframe中引入要打印的页面")]),t._v(" "),e("iframe",{staticStyle:{display:"none"},attrs:{id:"printFrame",src:""}}),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.print5}},[t._v("静态iframe")]),t._v(" "),e("p",[t._v("#需要将要打印的页面放在static文件夹中")]),t._v(" "),e("br"),t._v(" "),e("div",[t._v("\n    综合以上，个人认为方法2最优，可以做成一个组件，要打印的数据通过props传入。实际开发可根据具体业务需求选择。\n  ")])],1)}),[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"print"}},[n("div",{staticClass:"print",staticStyle:{"font-size":"18px","text-indent":"2em",color:"brown"}},[this._v("\n      要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容要打印的内容...\n    ")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("\n    #这种方式在打印之后回到页面，"),n("strong",[this._v("页面中的一切操作都会失效")]),this._v("\n    。比如点击打印按钮，打印完成后后，打印按钮就会失效。可以在打印完成后执行location.reload方法来刷新一遍页面。\n  ")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[this._v("使用这种方式"),n("strong",[this._v("需要将要打印的内容的样式编写为内联样式,注意字体单位为pt")]),this._v(" 。")])}],!1,null,"5a651e91",null).exports}}]);