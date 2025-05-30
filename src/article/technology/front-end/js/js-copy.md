---
title: js实现复制功能
date: 2019-11-23
category: 技术文章
tag:
    - 复制功能
---

本文来讲一下js实现复制功能的几种方法。

<!-- more -->

## 1、实现点击按钮，复制文本框中的的内容

``` html
<script type="text/javascript">
function copy() {
  var dom = document.getElementById('id')
  dom.select()  // 选择对象
  document.execCommand('Copy')  // 执行浏览器复制命令
  alert('已复制好，可贴粘。')
}
</script>

<textarea cols="20" rows="10" id="id">用户定义的代码区域</textarea>
<input type="button" onClick="copy()" value="点击复制代码" />
```

原理：点击按钮的时候触发copy函数，根据id ID选中对象，然后在根据execCommand复制选中内容，所以此时选择的内容必须是可视的，也就是说不能是隐藏的文本域。

## 2、复制专题地址和 url 地址，传给 QQ/MSN 上的好友

``` html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
  <title>Js复制代码</title>
</head>
<body>
  <input type="button" name="btn" onClick='copyToClipBoard()' value="复制专题地址和url地址，传给QQ/MSN上的好友">
  <script language="javascript">
  function copyToClipBoard() {
    var clipBoardContent = ''
    clipBoardContent += document.title
    clipBoardContent += this.location.href
    window.clipboardData.setData('Text', clipBoardContent)
    alert('复制成功，请粘贴到你的QQ/MSN上推荐给你的好友')
  }
  </script>
</body>
```

## 3、直接复制 url

``` html
<input type="button" name="btn" onClick='copyUrl()' value="复制URL地址">

<script language="javascript">
function copyUrl() {
  var clipBoardContent = this.location.href
  window.clipboardData.setData('Text', clipBoardContent)
  alert('复制成功!')
}
</script>
```

## 4、点击文本框时，复制文本框里面的内容

``` html
<input onclick="oCopy(this)" value="你好.要copy的内容!">
<script language="javascript">
function oCopy(obj) {
  obj.select()
  js = obj.createTextRange()
  js.execCommand('Copy')
  alert('复制成功!')
}
</script>
```

5、复制文本框或者隐藏域中的内容

``` html
<script language="javascript">
function CopyUrl(target) {
  target.value = myImg.value
  target.select()
  js = myImg.createTextRange()
  js.execCommand('Copy')
  alert('复制成功!')
}

function AddImg(target) {
  target.value = '[IMG]' + myImg.value + '[/ img]'
  target.select()
  js = target.createTextRange()
  js.execCommand('Copy')
  alert('复制成功!')
}
</script>
```

6、复制 span 标记中的内容

``` html
<script type="text/javascript">
  function copyText(obj) {
  var rng = document.body.createTextRange()
  rng.moveToElementText(obj)
  rng.scrollIntoView()
  rng.select()
  rng.execCommand('Copy')
  rng.collapse(false)
  alert('复制成功!')
}
</script>
```

## 7、浏览器兼容 copyToClipboard("拷贝内容")

``` js
function copyToClipboard(txt) {
  if (window.clipboardData) {
    window.clipboardData.clearData()
    clipboardData.setData('Text', txt)
    alert('复制成功！')
  } else if (navigator.userAgent.indexOf('Opera') != -1) {
    window.location = txt
  } else if (window.netscape) {
    try {
      netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect')
    } catch (e) {
      alert('被浏览器拒绝！\n请在浏览器地址栏输入"about:config"并回车\n然后将 "signed.applets.codebase_principal_support"设置为"true"')
    }
    var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard)
    if (!clip) {
      return
    }
    var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable)
    if (!trans) {
      return
    }
    trans.addDataFlavor('text/unicode')
    var str = new Object()
    var len = new Object()
    var str = Components.classes['@mozilla.org/supports-string;1'].createInstance(Components.interfaces.nsISupportsString)
    var copyText = txt
    str.data = copyText
    trans.setTransferData('text/unicode', str, copyText.length * 2)
    var clipId = Components.interfaces.nsIClipboard
    if (!clip) {
      return false
    }
    clip.setData(trans, null, clipId.kGlobalClipboard)
    alert('复制成功！')
  }
}
```

## 8、兼容各大浏览器的复制代码（结合ZeroClipboard.js）

``` html
<html>
<head>
  <title>Zero Clipboard Test</title>
  <script type="text/javascript" src="ZeroClipboard.js"></script>
  <script language="JavaScript">
  var clip = null
  function $(id) {
    return document.getElementById(id)
  }
  function init() {
    clip = new ZeroClipboard.Client()
    clip.setHandCursor(true)
    clip.addEventListener('mouseOver', function(client) {
      clip.setText( $('fe_text').value )
    })

    clip.addEventListener('complete', function(client, text) {
      alert('该地址已经复制，你可以使用Ctrl+V 粘贴。')
    })
    clip.glue('clip_button', 'clip_container')
  }
  </script>
</head>
<body onLoad="init()">
  <input id="fe_text" cols=50 rows=5 value=复制内容文本1 >
  <div id="clip_container">
    <span id="clip_button">
      <b>复制</b>
    </span>
  </div>
</body>
</html>
```