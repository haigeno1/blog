// https://juejin.im/post/5ccf8e13e51d453aa44ad6c9
function render(tpl,data){
    tpl=tpl.replace(/(\r|\n)/ig,"");
    var arr=tpl.split(/(\<%=?|%\>)/gm);//拆分模板
    var funcBody=["with(this){\r\nvar result=[];"];
    var item,codeType;
    codeType=0;
    for(var i=0;i<arr.length;i++){
        item=arr[i];
        //将代码片段分为3类
        if(item=="<%"){
           codeType=1;
           continue;
        }else if(item=="<%="){
           codeType=2;
           continue;
        }else if(item=="%>"){
            codeType=0;
            continue;
        } 
        //为3类代码片段生成最终可被eval的函数体
        if(codeType==0){ //字符
            funcBody.push("result.push(\"");
            funcBody.push(item);
            funcBody.push("\");\r\n");
        }else if(codeType==1){ //代码
            funcBody.push(item);
            funcBody.push("\r\n");
        }else if (codeType==2){ //代码输出
            funcBody.push("result.push(");
            funcBody.push(item);
            funcBody.push(");\r\n");
        }
    }
    funcBody.push("return result.join('')\r\n}");
    var template_func=new Function(["renderData"],funcBody.join(""));
    return template_func.apply(data,[data]);
 }


 var html=render("<% list.forEach(function (item,idx){ %>"
+" <div><%=idx+1+'、'+item%></div>"
+" <%})%>",
{list:["javascript","css","node.js"]})
document.write(html)
