(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(t,n){t.exports={KakaoAK:"608b513f89e46075473ef312d8ea7a39"}},415:function(t,n,e){t.exports=e(921)},921:function(t,n,e){"use strict";e.r(n);var a=e(0),r=e.n(a),o=e(23),i=e.n(o),c=e(5),u=e(409),l=e(62),s=e(4),d=e(395),f=e.n(d);function m(){var t=Object(c.a)(["\n",";\n@import url(\"https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.6/antd.min.css\");\n\n* {\n    box-sizing: border-box;\n}\n\nbody{\n  font-family: 'Nanum Gothic', sans-serif;\n}\n\n#root{\n  width: 100%;\n  height: 100%;\n}\n\na{\n  color: unset;\n  &:hover{\n    color: unset;\n  }\n}\n\nstrong{\n  font-weight: 700;\n}\n\nbutton{\n  cursor: pointer;\n  background-color: white;\n  outline: none;\n  border: none;\n  &:active {\n    outline: none;\n    border: none;\n  }\n}\n"]);return m=function(){return t},t}var h=Object(s.createGlobalStyle)(m(),f.a),b=e(46),p=e(47),g=e(51),v=e(48),y=e(52),j=e(923),O=e(924),w=e(152),k=e(88),x=e.n(k),E=e(146),S=e.n(E);function I(){var t=Object(c.a)(["\n  width: 90%;\n  height: 2.2rem;\n  color: #000033;\n  border-radius: 1.5rem;\n  margin-bottom: 1.3rem;\n  backgrouncolor: #000;\n  font-weight: bold;\n"]);return I=function(){return t},t}function F(){var t=Object(c.a)(["\n  display: flex;\n  width: 100%;\n  postion: fixed;\n  bottom: 0;\n  justify-content: center;\n"]);return F=function(){return t},t}function z(){var t=Object(c.a)(["\n  width: 15rem;\n  border: none;\n  background: #000033;\n  text-align: center;\n  color: white;\n  border-bottom: 1px solid white;\n  &#address_address {\n    border-bottom: 1px solid white;\n  }\n  transition: none;\n  border-radius: 0;\n"]);return z=function(){return t},t}function P(){var t=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return P=function(){return t},t}function C(){var t=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  width: 100%;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"]);return C=function(){return t},t}function L(){var t=Object(c.a)(["\n  background: #000033;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);return L=function(){return t},t}var T=j.a.Item,A=s.default.div(L()),D=Object(s.default)(j.a)(C()),X=Object(s.default)(T)(P()),B=Object(s.default)(O.a)(z()),K=s.default.div(F()),Y=Object(s.default)(w.a)(I()),N=function(t){function n(){var t,e;Object(b.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=Object(g.a)(this,(t=Object(v.a)(n)).call.apply(t,[this].concat(r)))).handleSubmit=function(t){t.preventDefault(),e.props.form.validateFields(function(t,n){t?console.log(t):e.getPosFromAddr(n.address)})},e}return Object(y.a)(n,t),Object(p.a)(n,[{key:"componentDidMount",value:function(){this.props.form.validateFields()}},{key:"getPosFromAddr",value:function(t){var n="https://dapi.kakao.com/v2/local/search/",e={Authorization:"KakaoAK ".concat(S.a.KakaoAK)};Promise.race([new Promise(function(a){return x.a.get(n+"address.json?query=".concat(t),{headers:e}).then(function(t){t.data.documents.length&&a(t.data.documents)})}),new Promise(function(a){return x.a.get(n+"keyword.json?query=".concat(t),{headers:e}).then(function(t){t.data.documents.length&&a(t.data.documents)})})]).then(function(t){var n={endX:t[0].x,endY:t[0].y},e=t[0].address_name;localStorage.setItem("loc",JSON.stringify({endLocation:n,addr:e}))}).then(this.props.toggleComponent)}},{key:"render",value:function(){var t=this.props.form,n=t.getFieldDecorator,e=t.getFieldError,a=(0,t.isFieldTouched)("address")&&e("address");return r.a.createElement(A,null,r.a.createElement(D,null,r.a.createElement(X,{validateStatus:a?"error":"",help:a||""},n("address",{rules:[{required:!1,message:"\uc9d1 \uc8fc\uc18c\ub97c \uc785\ub825\ud574 \uc8fc\uc138\uc694!"}]})(r.a.createElement(B,{placeholder:"\uc9d1 \uc8fc\uc18c \uc785\ub825"})))),r.a.createElement(K,null,r.a.createElement(Y,{type:"secondary",onClick:this.handleSubmit},"\ud655\uc778")))}}]),n}(a.Component),M=j.a.create({name:"address"})(N),G=e(413),J=e(38),U=e(922),_=e(405),q=e.n(_),W=768,R=576,$={smallFontSize:"0.7rem",normalFontSize:"1rem",largeFontSize:"1.2rem",extraLargeFontSize:"3rem"},H={"\ub3c4\ubcf4":"#ccc",1:"#052f93",2:"#10a643",3:"#ea8406",4:"#00a8e6",5:"#a95094",6:"#d08d1a",7:"#657931",8:"#e74e6d",9:"#be941c",kyeongkang:"#004ea7",kyung:"#79c0a0",chun:"#33C7A7",kong:"#038fa0",bun:"#fcd204","\uc11c\ud574\uc120":"#8be800",suin:"#fbb901",sinbun:"#cd2234",yongin:"#56ab32","\uc6b0\uc774\uc2e0\uc124\uacbd\uc804\ucca0":"#b7b7b7","\uacbd\uc804\ucca0\uc758\uc815\ubd80":"#f6ba02",in:"#6496df",in2:"#fd9800"},Q=function(t){return"@media (max-width: ".concat(t,"px)")};Q(922),Q(W),Q(R),e(178);function V(){var t=Object(c.a)(["\n  width: 90%;\n  height: 3rem;\n  color: white;\n  background: #000033;\n  border-radius: 1.5rem;\n  margin-bottom: 1.3rem;\n  backgrouncolor: #000;\n  font-weight: bold;\n"]);return V=function(){return t},t}function Z(){var t=Object(c.a)(["\n  display: flex;\n  position: fixed;\n  justify-content: center;\n  width: 100%;\n  bottom: 0;\n"]);return Z=function(){return t},t}function tt(){var t=Object(c.a)(["\n  margin: 0.5rem 0;\n  width: 90%;\n  font-weight: 700;\n"]);return tt=function(){return t},t}function nt(){var t=Object(c.a)(["\n  width: 90%;\n  margin: 1rem 0;\n"]);return nt=function(){return t},t}function et(){var t=Object(c.a)(["\n  text-align: center;\n  height: 20px;\n  &:first-of-type {\n    border-top-left-radius: 3rem;\n    border-bottom-left-radius: 3rem;\n  }\n  &:last-of-type {\n    border-top-right-radius: 3rem;\n    border-bottom-right-radius: 3rem;\n  }\n"]);return et=function(){return t},t}function at(){var t=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n  margin-bottom: 1rem;\n  width: 90%;\n  max-width: 90%;\n  height: 1rem;\n  background: sky-blue;\n  // &:first-child {\n  //   border-top-left-radius: 5px;\n  //   border-bottom-left-radius: 5px;\n  // }\n"]);return at=function(){return t},t}function rt(){var t=Object(c.a)(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border-bottom: 1px solid #ccc;\n"]);return rt=function(){return t},t}function ot(){var t=Object(c.a)(["\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  align-items: center;\n"]);return ot=function(){return t},t}var it=s.default.div(ot()),ct=s.default.div(rt()),ut=s.default.div(at()),lt=s.default.div(et()),st=s.default.div(nt()),dt=s.default.p(tt()),ft=s.default.div(Z()),mt=Object(s.default)(w.a)(V()),ht=function(t){function n(t){var e;Object(b.a)(this,n);var a=(e=Object(g.a)(this,Object(v.a)(n).call(this,t))).props,r=a.taxiInfo,o=a.subwayPathOptionList,i=a.defaultInfo;return e.state={taxiInfo:r,subwayPathOptionList:o,defaultInfo:i,runTime:{total:null,runTime:{}}},e}return Object(y.a)(n,t),Object(p.a)(n,[{key:"componentDidUpdate",value:function(t,n){if(t.taxiInfo!==this.props.taxiInfo){var e=this.props.data,a=e.taxiInfo,r=e.subwayPathOptionList;this.getTime(0),this.setState({taxiInfo:a,subwayPathOptionList:r})}}},{key:"getTime",value:function(t){var n=this.state.subwayPathOptionList.routeList[t].pathStationList,e=0,a={};n.map(function(t){var n=t.runTime;null!==n?(n=60*parseInt(n.slice(0,2))+parseInt(n.slice(3)),e+=n,a[t.line]=e):(a[t.line]=e,e=0)});var r=0;Object.keys(a).forEach(function(t){return r+=a[t]}),this.setState({runTime:{runTime:a,total:r}})}},{key:"renderBar",value:function(){var t=this.state.runTime,n=t.total,e=t.runTime,a=[];return Object.keys(e).forEach(function(t){var o=Math.floor(Number(e[t])/n*100);o=String(o)+"%",a.push(r.a.createElement(lt,{className:"haha",key:q()(),style:{width:o,backgroundColor:H[t],color:"white"}},e[t],"\ubd84"))}),a.map(function(t){return t})}},{key:"render",value:function(){var t=this.state,n=t.taxiInfo,e=t.defaultInfo,a=this.state.runTime,o=a.total;a.runTime;return console.log(this.state),r.a.createElement(it,{speed:.8,horizontal:!1},r.a.createElement(ct,null,r.a.createElement(st,null,r.a.createElement(dt,null,"\uc9c0\ud558\ucca0 ",Math.floor(o/60),"\ubd84 | \ub9c9\ucc28 ",e.lastTime)),r.a.createElement(ut,{className:"nana",style:{marginBottom:0}},this.renderBar()),r.a.createElement(ut,{style:{marginTop:0}})),r.a.createElement(ct,null,r.a.createElement(st,null,r.a.createElement(dt,null,"\ud0dd\uc2dc ",n.time,"\ubd84"),r.a.createElement("p",null,(n.distance/1e3).toFixed(1),"km | \uc57d"," ",String(Math.floor(n.price/1e3))+","+String(n.price%1e3),"\uc6d0")),r.a.createElement(ut,null,r.a.createElement(lt,{style:{width:"100%",backgroundColor:"#ffd300",color:"white"}},n.time,"\ubd84"))),r.a.createElement(ft,null,r.a.createElement(mt,{size:"large",onClick:this.props.onButtonPress},"\ubaa9\uc801\uc9c0 \uc7ac\uc124\uc815")))}}]),n}(a.Component),bt=e(925);function pt(){var t=Object(c.a)(["\n  font-size: ",";\n  font-weight: ",";\n"]);return pt=function(){return t},t}var gt=s.default.p(pt(),function(t){return $[t.size]||$.normalFontSize},function(t){return t.weight}),vt={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",kyeongkang:"\uacbd\uac15",kyung:"\uc911\uc559",chun:"\uacbd\ucd98",kong:"\uacf5\ud56d",bun:"\ubd84","\uc11c\ud574\uc120":"\uc11c\ud574",suin:"\uc218\uc778",sinbun:"\uc2e0\ubd84",yongin:"\uc6a9\uc778","\uc6b0\uc774\uc2e0\uc124\uacbd\uc804\ucca0":"\uc6b0\uc774","\uacbd\uc804\ucca0\uc758\uc815\ubd80":"\uc758\uc815",in:"\uc7781",in2:"\uc7782"};function yt(){var t=Object(c.a)(["\n  color: white;\n  position: absolute;\n  right: 1rem;\n"]);return yt=function(){return t},t}function jt(){var t=Object(c.a)(["\n  width: 2.4rem;\n  height: 2.4rem;\n  border-radius: 2.4rem;\n  background: ",";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);return jt=function(){return t},t}function Ot(){var t=Object(c.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 3rem;\n  height: 3rem;\n  border-radius: 3rem;\n  background: white;\n  margin-right: 1rem;\n"]);return Ot=function(){return t},t}function wt(){var t=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  align-items: center;\n"]);return wt=function(){return t},t}function kt(){var t=Object(c.a)(["\n  display: flex;\n  flex: 2;\n  justify-content: space-between;\n  align-items: center;\n"]);return kt=function(){return t},t}function xt(){var t=Object(c.a)(["\n  display: flex;\n  flex: 1;\n"]);return xt=function(){return t},t}function Et(){var t=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 1rem;\n  color: white;\n  flex: inherit;\n  background: #000033;\n"]);return Et=function(){return t},t}var St=bt.a.Countdown,It=s.default.div(Et()),Ft=s.default.div(xt()),zt=s.default.div(kt()),Pt=s.default.div(wt()),Ct=s.default.div(Ot()),Lt=s.default.div(jt(),function(t){return H[t.line]}),Tt=Object(s.default)(w.a)(yt()),At=function(t){function n(t){var e;Object(b.a)(this,n),e=Object(g.a)(this,Object(v.a)(n).call(this,t));var a=t.defaultInfo,r=t.addr;return e.state={defaultInfo:a,remain:a.remain||0,addr:r},e}return Object(y.a)(n,t),Object(p.a)(n,[{key:"componentDidUpdate",value:function(t,n){if(t.defaultInfo!==this.props.defaultInfo||t.addr!==this.props.addr){var e=this.props,a=e.defaultInfo,r=e.addr;this.setState({defaultInfo:a,addr:r,remain:a.remain})}}},{key:"onFinish",value:function(){console.log("Finished")}},{key:"renderDetail",value:function(){var t=this.state,n=t.defaultInfo,e=t.remain,a=t.addr,o=Date.now()+1e3*e;if(e){var i=n.pathStationList[0],c=i.startStationName,u=i.line,l=i.endStationName;return r.a.createElement(r.a.Fragment,null,r.a.createElement(Ft,null,r.a.createElement(J.a,{type:"environment",theme:"filled",style:{marginRight:"1rem"}}),r.a.createElement(gt,{size:"normalFontSize"},a)),r.a.createElement(zt,null,r.a.createElement(r.a.Fragment,null,r.a.createElement(gt,{size:"largeFontSize",weight:"bold"},"\ub9c9\ucc28\uae4c\uc9c0"),r.a.createElement(St,{value:o,onFinish:this.onFinish,valueStyle:{color:"white",fontSize:$.extraLargeFontSize}}))),r.a.createElement(Pt,null,r.a.createElement(Ct,null,r.a.createElement(Lt,{line:u},vt[u])),r.a.createElement(gt,{size:"largeFontSize",weight:"bold"},c+"\uc5ed"),r.a.createElement(gt,{size:"smallFontSize",style:{marginLeft:"0.6rem"}},l+" \ubc29\ud5a5"),r.a.createElement(Tt,{type:"ghost",shape:"round",onClick:function(){return window.alert("\uc54c\ub9bc\uc744 \uc124\uc815\ud588\uc2b5\ub2c8\ub2e4")}},"\uc54c\ub9bc \ubc1b\uae30")))}return null}},{key:"render",value:function(){return r.a.createElement(It,null,this.renderDetail())}}]),n}(a.Component);function Dt(){var t=Object(c.a)(["\n  width: 90%;\n  height: 3rem;\n  color: white;\n  background: #000033;\n  border-radius: 1.5rem;\n  margin-bottom: 1.3rem;\n  backgrouncolor: #000;\n  font-weight: bold;\n"]);return Dt=function(){return t},t}function Xt(){var t=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  height: 60%;\n  color: #000033;\n"]);return Xt=function(){return t},t}function Bt(){var t=Object(c.a)(["\n  display: flex;\n  flex: 3;\n"]);return Bt=function(){return t},t}function Kt(){var t=Object(c.a)(["\n  flex: 10;\n  display: flex;\n  justify-content: center;\n  & .anticon-spin {\n    position: absolute;\n    top: 3rem;\n  }\n"]);return Kt=function(){return t},t}function Yt(){var t=Object(c.a)(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"]);return Yt=function(){return t},t}var Nt=s.default.div(Yt()),Mt=s.default.div(Kt()),Gt=s.default.div(Bt()),Jt=s.default.div(Xt()),Ut=Object(s.default)(w.a)(Dt()),_t=r.a.createElement(J.a,{type:"loading",style:{fontSize:24},spin:!0}),qt=function(t){function n(t){var e;return Object(b.a)(this,n),(e=Object(g.a)(this,Object(v.a)(n).call(this,t))).state={endX:126.91509963231,endY:37.568565387939,currentAddr:"\ud655\uc778\uc911...",startX:"",startY:"",data:{taxiInfo:{},subwayPathOptionList:{routeList:[]},defaultInfo:{}}},e}return Object(y.a)(n,t),Object(p.a)(n,[{key:"componentDidMount",value:function(){var t=this;if(localStorage.getItem("loc")){var n=JSON.parse(localStorage.getItem("loc")).endLocation,e=n.endX,a=n.endY;this.setState({endX:e,endY:a})}navigator.geolocation.getCurrentPosition(function(n){var e=n.coords,a=e.latitude,r=e.longitude;t.setState({startX:r,startY:a}),t.getTrainData(a,r)})}},{key:"componentDidUpdate",value:function(t,n){if(n.startX!==this.state.startX){var e=this.state,a=e.startX,r=e.startY;this.getTrainData(r,a),this.getCurrentPosFromGPS(a,r)}}},{key:"getTrainData",value:function(t,n){var e=this,a=this.state,r=a.endX,o=a.endY,i="https://api.makkcha.com/searchMakcha?startX=".concat(n,"&startY=").concat(t,"&endX=").concat(r,"&endY=").concat(o);x.a.get(i).then(function(t){return e.setState({data:Object(G.a)({},t.data,{defaultInfo:t.data.subwayPathOptionList.routeList[0]||{}})})})}},{key:"getCurrentPosFromGPS",value:function(t,n){var e=this,a="https://dapi.kakao.com/v2/local/geo/coord2address.json?x=".concat(t,"&y=").concat(n,"&input_coord=WGS84"),r={Authorization:"KakaoAK ".concat(S.a.KakaoAK)};x.a.get(a,{headers:r}).then(function(t){e.setState({currentAddr:t.data.documents[0].address.address_name})})}},{key:"onButtonPress",value:function(){localStorage.setItem("loc",""),this.props.toggleComponent()}},{key:"render",value:function(){var t=this.state.data,n=t.taxiInfo,e=t.subwayPathOptionList,a=t.defaultInfo,o=this.state.currentAddr;return r.a.createElement(Nt,null,r.a.createElement(Gt,null,r.a.createElement(At,{defaultInfo:a,addr:o})),r.a.createElement(Mt,null,e.routeList.length?r.a.createElement(ht,{taxiInfo:n,subwayPathOptionList:e,defaultInfo:e.routeList[0],data:this.state.data,onButtonPress:this.onButtonPress.bind(this)}):r.a.createElement(Jt,null,r.a.createElement(U.a,{indicator:_t,style:{}}),r.a.createElement(gt,{size:"largeFontSize"},"\uacbd\ub85c\ub97c \ud0d0\uc0c9 \uc911\uc785\ub2c8\ub2e4..."),r.a.createElement(Ut,{onClick:this.onButtonPress.bind(this)},"\ubaa9\uc801\uc9c0 \ub2e4\uc2dc \uc785\ub825\ud558\uae30"))))}}]),n}(a.Component);function Wt(){var t=Object(c.a)(["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"]);return Wt=function(){return t},t}var Rt=s.default.div(Wt()),$t=function(t){function n(){var t,e;Object(b.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=Object(g.a)(this,(t=Object(v.a)(n)).call.apply(t,[this].concat(r)))).state={component:"form"},e}return Object(y.a)(n,t),Object(p.a)(n,[{key:"componentDidMount",value:function(){localStorage.getItem("loc")&&this.setState({component:"main"})}},{key:"componentDidUpdate",value:function(t,n){t!==this.props&&console.log(this.props)}},{key:"toggleComponent",value:function(){"form"===this.state.component?this.setState({component:"main"}):this.setState({component:"form"})}},{key:"render",value:function(){return r.a.createElement(Rt,null,"form"===this.state.component?r.a.createElement(M,{toggleComponent:this.toggleComponent.bind(this)}):r.a.createElement(qt,{toggleComponent:this.toggleComponent.bind(this)}))}}]),n}(a.Component);function Ht(){var t=Object(c.a)(["\n  height: 100%;\n  width: 100%;\n"]);return Ht=function(){return t},t}var Qt=s.default.div(Ht()),Vt=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(h,null),r.a.createElement(u.a,null,r.a.createElement(Qt,{className:"app"},r.a.createElement(l.a,{exact:!0,path:"/",component:$t}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(Vt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[415,1,2]]]);
//# sourceMappingURL=main.fc877fb8.chunk.js.map