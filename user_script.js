// ==UserScript==  
// @name            xxx插件   
// @namespace       
// @author          move11@126.com 
// @developer       movejs 
// @contributor       
// @description        
// @match           
// @match           
// @match            
// @require         http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js  
// @icon           
// @run-at          document-idle  
// @version         4.2.4  
// @updateURL       
// @supportURL      
// @homepage         
// @contributionURL    
// @contributionAmount     
// ==UserScript==  4
//=======START======= 
var renderCss = '<style type="text/css" media="screen">' +
'.movejs_content{  margin-bottom:100px; background:#fff; box-shadow:0 0 5px #444; box-sizing:border-box;  position:fixed; top:0;left:0; width:100%;z-index:9999;}' +
'.movejs_content input{ padding:5px; border:1px solid #ddd; width:50px; font-size:13px; font-weight:bold;}' +
'.movejs_content .movejs_warp_box{ padding:2px 0;  position:relative;text-align:center; width:960px; margin:0 auto;}' +
'.movejs_content .movejs_warp_box .movejs_btn{ text-shadow: 1px 1px 1px #666666;   margin:2px; background:#d33;   color:#fff; text-align:center; padding:5px;display:inline-block; font-size:12px; border-radius:5px; text-decoration:none; box-shadow:0 0 5px #d09;}' +
'.movejs_content .movejs_warp_box .movejs_btn:hover{ background:#f60;}' +
'.movejs_content .movejs_warp_box p{color:#f78;font-size:11px;    font-family:微软雅黑;letter-spacing:-1px; }' +
'.movejs_content .movejs_warp_box p span{ margin-right:3px; background:#c38; color:#fff;  padding:0 10px; text-align:center;}' +
'.movejs_content .movejs_silde { left:0; bottom:0; position:absolute; transform: rotate(45deg); display:block; width:20px; height:20px; border-top:2px solid #ccc; border-left:2px solid #ccc; background:transparent;}' +
'</style>',
renderDom = '<div class="movejs_content">' +
' <div class="movejs_warp_box">' +
' <div><a href="javascript:;" class="movejs_btn get">获取值</a><a href="javascript:;" class="movejs_btn setLenght">设置长度</a><a href="javascript:;" class="movejs_btn dislable">禁用事件</a></div>' +
' <p><input type="text" id="m_v_j_s_size"> </p>' +
' <p><span>文件：</span>http://lib.sinaapp.com/js/jquery/1.8.3/jquery.min.js</p> ' +
' </div>' +
'<a href="javascript:;"  class="movejs_silde"></a>' +
' </div>';
$(document).ready(function () {
  $('body').prepend('<div class="movejs_auhei"></div> ');
  $('body').append(renderCss + renderDom);
  var _inputEle = $('.tucao-input');
  /*$("body").on("click",".movejs_content .get",function(e){
        var tucaoText = _inputEle.val(); 
        alert(_inputEle.length);
        if (_inputEle.length==0)  alert("没有找到元素"); 
    });

    $("body").on("click",".movejs_content .setLenght",function(e){
        _inputEle.attr("maxlength",$("#m_v_j_s_size").val()?500:$("#m_v_j_s_size").val());
        
    });

    $("body").on("click",".movejs_content .dislable",function(e){
        var tucaoText = $(".tucao-input").val();
       
    });*/
  $('body').on('click', function (e) {
    //console.log(e.target.nodeName.toLowerCase());
    var _e = e.target;
    if (_e.nodeName.toLowerCase() == 'a') {
      var _class = _e.getAttribute('class');
      //console.log(_class) ;
      switch (_class) {
        case 'movejs_btn get':
          var tucaoText = _inputEle.val();
          console.log(_inputEle.length);
          if (_inputEle.length == 0) alert('没有找到元素');
          break;
        case 'movejs_btn setLenght':
          console.log(typeof $('#m_v_j_s_size').val());
          _inputEle.attr('maxlength', $('#m_v_j_s_size').val() ? 500 : $('#m_v_j_s_size').val());
          break;
        case 'movejs_btn dislable':
          var tucaoText = $('.tucao-input').val();
          return;
          break;
        case 'movejs_silde':
          $('.movejs_content').animate({
            'top': '-100px'
          }, 600);
          //$(".movejs_silde").animate({'top':0,'left':0,'z-index':'99999'},600);
          break;
      }
    };
  })
  _inputEle.on('keydown', function (e) {
    console.log('s________________');
    if ((event.ctrlKey && event.which == 67) || (event.ctrlKey && event.which == 86)) {
      return false;
    }
  })
});
