(function(n){function t(t){for(var a,i,s=t[0],l=t[1],u=t[2],d=0,m=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&m.push(r[i][0]),r[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(n[a]=l[a]);c&&c(t);while(m.length)m.shift()();return o.push.apply(o,u||[]),e()}function e(){for(var n,t=0;t<o.length;t++){for(var e=o[t],a=!0,s=1;s<e.length;s++){var l=e[s];0!==r[l]&&(a=!1)}a&&(o.splice(t--,1),n=i(i.s=e[0]))}return n}var a={},r={app:0},o=[];function i(t){if(a[t])return a[t].exports;var e=a[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.m=n,i.c=a,i.d=function(n,t,e){i.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:e})},i.r=function(n){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},i.t=function(n,t){if(1&t&&(n=i(n)),8&t)return n;if(4&t&&"object"===typeof n&&n&&n.__esModule)return n;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var a in n)i.d(e,a,function(t){return n[t]}.bind(null,a));return e},i.n=function(n){var t=n&&n.__esModule?function(){return n["default"]}:function(){return n};return i.d(t,"a",t),t},i.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=l;o.push([0,"chunk-vendors"]),e()})({0:function(n,t,e){n.exports=e("56d7")},"0cb9":function(n,t,e){var a=e("e292");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("4da78346",a,!0,{})},"1ae6":function(n,t,e){var a=e("1cb2");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("2b5912e7",a,!0,{})},"1cb2":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"2d9b":function(n,t,e){var a=e("3b57");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("4ffdc2f1",a,!0,{})},"3b57":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"49b1":function(n,t,e){},"4bc9":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"56d7":function(n,t,e){"use strict";e.r(t);var a=e("2b0e"),r=e("2f62");const o={name:"Navbar",methods:{logOut(){this.$store.dispatch("logout_user")}},computed:{...Object(r["b"])(["loggedIn"])}};var i=o,s=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",{staticStyle:{position:"fixed",width:"100%","z-index":"10"}},[a("b-navbar",{staticStyle:{height:"85px","border-radius":"0 0 15px 15px"},attrs:{toggleable:"md",variant:"info",type:"light"}},[a("b-navbar-brand",{staticClass:"d-flex justify-content-center",staticStyle:{width:"100%"}},[a("b-link",{staticClass:"navbar-item",attrs:{to:"/"}},[a("b-img",{staticClass:"filter-white",staticStyle:{"max-height":"50px","margin-left":"10px"},attrs:{src:e("c10c"),fluid:"",alt:"GetUP Logo"}})],1)],1),n._v(" "),"Workout"!=this.$route.name?a("div"):n._e(),n._v(" "),"Workout"==this.$route.name?a("b-button",{staticClass:"d-md-none",staticStyle:{"margin-top":"-50px",float:"left"},attrs:{variant:"secondary",size:"md"},on:{click:function(t){return n.$router.push("/")}}},[a("i",{staticClass:"fas fa-arrow-left fa-3x"})]):n._e(),n._v(" "),n.loggedIn?a("div",{staticClass:"d-flex flex-column align-items-center d-md-none",staticStyle:{"margin-top":"-50px",float:"right"}},[a("h6",{staticClass:"text-white p-0 mb-2"},[a("i",{staticClass:"fas fa-user"}),n._v("\n                "+n._s(this.$store.state.firstName)+"\n            ")]),n._v(" "),a("b-button",{attrs:{variant:"primary",size:"md"},on:{click:function(t){return n.logOut()}}},[n._v("Logout")])],1):n._e()],1),n._v(" "),"Workout"==this.$route.name?a("b-button",{staticClass:"d-none d-md-flex",staticStyle:{"margin-top":"-65px",float:"left","z-index":"2",position:"relative","margin-left":"10px"},attrs:{variant:"secondary",size:"md"},on:{click:function(t){return n.$router.push("/")}}},[a("i",{staticClass:"fas fa-arrow-left fa-3x"})]):n._e(),n._v(" "),this.$store.state.loggedIn?a("div",{staticClass:"flex-column align-items-center d-none d-md-flex",staticStyle:{"margin-top":"-65px","margin-right":"10px",float:"right","z-index":"2",position:"relative"}},[a("h6",{staticClass:"text-white p-0 mb-2"},[a("i",{staticClass:"fas fa-user"}),n._v("\n            "+n._s(this.$store.state.firstName)+"\n        ")]),n._v(" "),a("b-button",{attrs:{variant:"primary",size:"md"},on:{click:function(t){return n.logOut()}}},[n._v("Logout")])],1):n._e()],1)},l=[],u=e("2455");function c(n){e("b5ee")}var d=!1,m=c,v="data-v-76fb792e",f=null,p=Object(u["a"])(i,s,l,d,m,v,f),h=p.exports,b={data(){return{}},components:{Navbar:h},computed:{...Object(r["b"])(["loggedIn"])},methods:{},created(){this.$store.state.token;var n=this.$store.state.token?this.JwtDecode(this.$store.state.token):"",t=!!n&&n.admin;this.$store.dispatch("update_admin",t),this.loggedIn||"/"==this.$route.path||this.$router.push("/")},watch:{loggedIn(n,t){n&&this.$store.dispatch("read_workouts");this.$store.state.token;var e=this.$store.state.token?this.JwtDecode(this.$store.state.token):"",a=!!e&&e.admin;this.$store.dispatch("update_admin",a)}}},w=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{attrs:{id:"app"}},[e("Navbar"),n._v(" "),e("router-view",{staticStyle:{"padding-top":"67px"}})],1)},g=[];function k(n){e("e7be")}var _=!1,x=k,y=null,C=null,I=Object(u["a"])(b,w,g,_,x,y,C),S=I.exports,$=e("8c4f"),N={},O=function(){var n=this,t=n.$createElement;n._self._c;return n._m(0)},j=[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"sec-hero"},[e("div",{staticClass:"hero-container col-md-6 col-sm-12 d-flex flex-column justify-content-end"},[e("h1",[n._v("\n            Integrate a healthy lifestyle into your daily student routine\n            now.\n        ")]),n._v(" "),e("p",[n._v("\n            With GetUP, you have access to dynamic workouts that are\n            suitable within the university.\n        ")])])])}];function q(n){e("1ae6")}var P=!1,T=q,D=null,A=null,W=Object(u["a"])(N,O,j,P,T,D,A),E=W.exports;const M={name:"Card",props:{img:{type:String,default:null},title:{type:String,default:null},location:{type:String,default:null},big:{type:Boolean,default:!1}},created(){},methods:{getImageUrl(n){return window.location.href.indexOf("localhost")>=0||window.location.href.indexOf("0.0.0.0")>=0?"/uploads/"+n:"https://getup-192.s3-ap-southeast-1.amazonaws.com/"+n}}};var z=M,L=function(){var n=this,t=n.$createElement,e=n._self._c||t;return this.big?e("div",{staticClass:"card m-2 hover-pointer hover-shadow",staticStyle:{"min-width":"250px","max-width":"300px"}},[e("img",{staticClass:"card-img-top card-image",attrs:{src:n.getImageUrl(this.img),alt:"..."}}),n._v(" "),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title"},[n._v(n._s(this.title))]),n._v(" "),e("h6",{staticClass:"card-title"},[n._v("At the "+n._s(this.location))])])]):e("div",{staticClass:"card m-2 hover-pointer hover-shadow",staticStyle:{"min-width":"150px","max-width":"200px"}},[e("img",{staticClass:"card-img-top",attrs:{src:n.getImageUrl(this.img),alt:"..."}}),n._v(" "),e("div",{staticClass:"card-body"},[e("h5",{staticClass:"card-title"},[n._v(n._s(this.title))]),n._v(" "),e("h6",{staticClass:"card-title"},[n._v("At the "+n._s(this.location))])])])},U=[];function B(n){e("0cb9")}var J=!1,F=B,X="data-v-608cfe7e",H=null,R=Object(u["a"])(z,L,U,J,F,X,H),G=R.exports,Y={data(){return{firstName:null,lastName:null,email:null,password:null,signUpError:null,logInError:null}},methods:{async signUp(){await this.$validator.validateAll("signup").then(n=>{if(n){var t={password:this.password,email:this.email,first_name:this.firstName,last_name:this.lastName};this.$store.dispatch("register_user",t).then(()=>{}).catch(n=>{this.signUpError=n.data})}})},logIn(){this.$validator.validateAll("login").then(n=>{if(n){var t={password:this.password,email:this.email};this.$store.dispatch("login_user",t).then(()=>{}).catch(n=>{this.logInError=n.data})}})}}},Z=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"signup-login-container p-4"},[e("b-tabs",{attrs:{align:"center"}},[e("b-tab",{attrs:{active:""},scopedSlots:n._u([{key:"title",fn:function(){return[e("h1",[n._v("Login")])]},proxy:!0}])},[n._v(" "),e("form",{attrs:{"data-vv-scope":"login"},on:{submit:function(t){return t.preventDefault(),n.logIn()}}},[e("b-form-group",{staticClass:"mt-3",attrs:{label:"Email","invalid-feedback":n.errors.first("email","login")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{name:"email",state:!n.errors.has("email","login")&&null},model:{value:n.email,callback:function(t){n.email=t},expression:"email"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Password","invalid-feedback":n.errors.first("password","login")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"password",type:"password",state:!n.errors.has("password","login")&&null},model:{value:n.password,callback:function(t){n.password=t},expression:"password"}})],1),n._v(" "),this.logInError?e("div",{staticClass:"text-danger"},[n._v("\n                    * "+n._s(this.logInError)+"\n                ")]):n._e(),n._v(" "),e("b-button",{staticStyle:{float:"right"},attrs:{variant:"secondary",size:"large",type:"submit"}},[n._v("Login")])],1)]),n._v(" "),e("b-tab",{scopedSlots:n._u([{key:"title",fn:function(){return[e("h1",[n._v("Sign Up")])]},proxy:!0}])},[n._v(" "),e("form",{attrs:{"data-vv-scope":"signup"},on:{submit:function(t){return t.preventDefault(),n.signUp()}}},[e("b-form-group",{staticClass:"mt-3",attrs:{label:"First Name","invalid-feedback":n.errors.first("first name","signup")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"first name",state:!n.errors.has("first name","signup")&&null},model:{value:n.firstName,callback:function(t){n.firstName=t},expression:"firstName"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Last Name","invalid-feedback":n.errors.first("last name","signup")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"last name",state:!n.errors.has("last name","signup")&&null},model:{value:n.lastName,callback:function(t){n.lastName=t},expression:"lastName"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Email","invalid-feedback":n.errors.first("email","signup")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],attrs:{name:"email",state:!n.errors.has("email","signup")&&null},model:{value:n.email,callback:function(t){n.email=t},expression:"email"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Password","invalid-feedback":n.errors.first("password","signup")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"password",type:"password",state:!n.errors.has("password","signup")&&null},model:{value:n.password,callback:function(t){n.password=t},expression:"password"}})],1),n._v(" "),this.signUpError?e("div",{staticClass:"text-danger"},[n._v("\n                    * "+n._s(this.signUpError)+"\n                ")]):n._e(),n._v(" "),e("b-button",{staticStyle:{float:"right"},attrs:{variant:"secondary",size:"large",type:"submit"}},[n._v("Sign up")])],1)])],1)],1)},K=[];function Q(n){e("57f3")}var V=!1,nn=Q,tn=null,en=null,an=Object(u["a"])(Y,Z,K,V,nn,tn,en),rn=an.exports,on={name:"home",components:{Header:E,Card:G,Auth:rn},data(){return{workoutTitle:null,workoutLocation:null,workoutTimes:null,workoutMaterials:null,workoutDuration:null,workoutPeople:null,workoutDifficulty:null,workoutInstructions:null,workoutImage:null,workoutStatus:"Pending",difficultyOptions:[{value:null,text:"Select one",disabled:!0},{value:"Beginner",text:"Beginner"},{value:"Intermediate",text:"Intermediate"},{value:"Advanced",text:"Advanced"}],statusOptions:[{value:"Pending",text:"Pending"},{value:"Approved",text:"Approved"}]}},methods:{gotoPage(n,t){this.$router.push("/"+n+"/"+t)},openModal(){this.$refs.addWorkout.show()},addWorkout(){this.$validator.validateAll().then(n=>{if(n){var t=new FormData;t.append("title",this.workoutTitle),t.append("location",this.workoutLocation),t.append("duration",this.workoutDuration),t.append("best_times",this.workoutTimes),t.append("materials",this.workoutMaterials),t.append("people_count",this.workoutPeople),t.append("difficulty",this.workoutDifficulty),t.append("instructions",this.workoutInstructions),t.append("status",this.workoutStatus),t.append("file",document.getElementById("image_upload").files[0]),this.$store.dispatch("create_workout",t).then(()=>{}),this.$refs.addWorkout.hide()}})}},computed:{...Object(r["b"])(["workouts","loggedIn"])},async created(){this.$store.state.loggedIn&&await this.$store.dispatch("read_workouts")}},sn=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"home"},[e("Header"),n._v(" "),n.loggedIn?e("div",[e("div",{staticClass:"mt-5 ml-3 mr-3"},[e("div",{staticClass:"d-flex justify-content-between"},[e("h1",[n._v("Workouts")]),n._v(" "),e("b-button",{attrs:{variant:"secondary",size:"md"},on:{click:function(t){return n.openModal()}}},[n._v("\n                    Add Workout\n                ")])],1),n._v(" "),e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row flex-row flex-nowrap overflow-auto"},n._l(this.workouts,(function(t){return e("div",{key:t.id},["Approved"==t.status?e("Card",{attrs:{big:!0,img:t.image,title:t.title,location:t.location},nativeOn:{click:function(e){return n.gotoPage("workouts",t.id)}}}):n._e()],1)})),0)])]),n._v(" "),e("b-modal",{ref:"addWorkout",attrs:{"hide-footer":"",title:"New Workout"}},[e("b-form-group",{attrs:{label:"Title","invalid-feedback":n.errors.first("title")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"title",state:!n.errors.has("title")&&null},model:{value:n.workoutTitle,callback:function(t){n.workoutTitle=t},expression:"workoutTitle"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Location","invalid-feedback":n.errors.first("location")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"location",state:!n.errors.has("location")&&null},model:{value:n.workoutLocation,callback:function(t){n.workoutLocation=t},expression:"workoutLocation"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Duration (in Mins)","invalid-feedback":n.errors.first("duration")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|between:1,120",expression:"'required|between:1,120'"}],attrs:{type:"number",name:"duration",state:!n.errors.has("duration")&&null},model:{value:n.workoutDuration,callback:function(t){n.workoutDuration=t},expression:"workoutDuration"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Best Times","invalid-feedback":n.errors.first("best times")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"best times",state:!n.errors.has("best times")&&null},model:{value:n.workoutTimes,callback:function(t){n.workoutTimes=t},expression:"workoutTimes"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Materials","invalid-feedback":n.errors.first("materials")}},[e("b-form-textarea",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"materials",rows:"2","max-rows":"4",state:!n.errors.has("materials")&&null},model:{value:n.workoutMaterials,callback:function(t){n.workoutMaterials=t},expression:"workoutMaterials"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Difficulty","invalid-feedback":n.errors.first("difficulty")}},[e("b-form-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{options:n.difficultyOptions,name:"difficulty",state:!n.errors.has("difficulty")&&null},model:{value:n.workoutDifficulty,callback:function(t){n.workoutDifficulty=t},expression:"workoutDifficulty"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Minimum Number of Participants","invalid-feedback":n.errors.first("participant count")}},[e("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required|between:1,30",expression:"'required|between:1,30'"}],attrs:{name:"participant count",type:"number",state:!n.errors.has("participant count")&&null},model:{value:n.workoutPeople,callback:function(t){n.workoutPeople=t},expression:"workoutPeople"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Instructions","invalid-feedback":n.errors.first("instructions")}},[e("b-form-textarea",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{name:"instructions",state:!n.errors.has("instructions")&&null,rows:"2","max-rows":"4"},model:{value:n.workoutInstructions,callback:function(t){n.workoutInstructions=t},expression:"workoutInstructions"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Status"}},[e("b-form-select",{attrs:{options:n.statusOptions,name:"status"},model:{value:n.workoutStatus,callback:function(t){n.workoutStatus=t},expression:"workoutStatus"}})],1),n._v(" "),e("b-form-group",{attrs:{label:"Image","invalid-feedback":n.errors.first("image"),state:!n.errors.has("image")}},[e("div",{staticClass:"dropZone"},[e("b-form-file",{directives:[{name:"validate",rawName:"v-validate",value:"required|mimes:image/*",expression:"'required|mimes:image/*'"}],ref:"image_upload",attrs:{accept:"image/*",placeholder:"Choose a file or drop it here...","drop-placeholder":"Drop file here...",name:"image",state:!n.errors.has("image")&&null,id:"image_upload"},model:{value:n.workoutImage,callback:function(t){n.workoutImage=t},expression:"workoutImage"}})],1)]),n._v(" "),(this.$store.state.admin,e("div",{staticStyle:{float:"right"}},[e("b-button",{attrs:{variant:"secondary",size:"large",type:"submit"},on:{click:function(t){return n.addWorkout()}}},[n._v("Submit")])],1))],1)],1):e("div",{staticClass:"d-flex justify-content-center mt-4"},[e("Auth")],1)],1)},ln=[];function un(n){e("73bf")}var cn=!1,dn=un,mn=null,vn=null,fn=Object(u["a"])(on,sn,ln,cn,dn,mn,vn),pn=fn.exports;const hn={};var bn=hn,wn=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[e("div",{staticClass:"d-flex flex-column align-items-center",staticStyle:{margin:"80px 0"}},[e("h1",{staticClass:"display-1"},[n._v("404")]),n._v(" "),e("h4",{staticStyle:{"margin-bottom":"15px"}},[n._v("\n            The page you are looking for does not exist.\n        ")]),n._v(" "),e("router-link",{attrs:{to:"/"}},[n._v("Back to Home")])],1)])},gn=[];function kn(n){e("c2cc")}var _n=!1,xn=kn,yn=null,Cn=null,In=Object(u["a"])(bn,wn,gn,_n,xn,yn,Cn),Sn=In.exports;const $n={name:"Workout",props:{},data(){return{id:null,reviewBody:null,reviewRating:null,currentReview:null,workoutTitle:null,workoutLocation:null,workoutTimes:null,workoutMaterials:null,workoutDuration:null,workoutPeople:null,workoutDifficulty:null,workoutInstructions:null,workoutImage:null,workoutStatus:null,difficultyOptions:[{value:null,text:"Select one",disabled:!0},{value:"Beginner",text:"Beginner"},{value:"Intermediate",text:"Intermediate"},{value:"Advanced",text:"Advanced"}],statusOptions:[{value:"Pending",text:"Pending"},{value:"Approved",text:"Approved"}]}},computed:{...Object(r["b"])(["workout"])},async created(){this.id=this.$route.params.id,await this.$store.dispatch("read_workout",this.$route.params.id),null!=this.workout?(this.workoutTitle=this.workout.title,this.workoutLocation=this.workout.location,this.workoutTimes=this.workout.best_times,this.workoutMaterials=this.workout.materials,this.workoutDuration=this.workout.duration,this.workoutPeople=this.workout.people_count,this.workoutDifficulty=this.workout.difficulty,this.workoutInstructions=this.workout.instructions,this.workoutStatus=this.workout.status):this.$router.push("/404")},methods:{getImageUrl(n){return window.location.href.indexOf("localhost")>=0||window.location.href.indexOf("0.0.0.0")>=0?"/uploads/"+n:"https://getup-192.s3-ap-southeast-1.amazonaws.com/"+n},deleteWorkout(){this.$store.dispatch("delete_workout",this.id)}}};var Nn=$n,On=function(){var n=this,t=n.$createElement,e=n._self._c||t;return this.workout?e("div",[e("img",{staticStyle:{width:"100%","z-index":"0","margin-bottom":"-15px",height:"75vh","object-fit":"cover"},attrs:{src:n.getImageUrl(this.workout.image)}}),n._v(" "),e("div",{staticClass:"workout-details-container"},[e("div",{staticClass:"d-flex justify-content-between"},[e("h2",[n._v(n._s(this.workout.title))]),n._v(" "),e("div",{staticClass:"d-flex flex-column"},[e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.deleteWorkout",modifiers:{deleteWorkout:!0}}],attrs:{variant:"secondary",size:"md"}},[e("i",{staticClass:"fas fa-trash"})])],1)]),n._v(" "),e("div",{staticClass:"d-flex justify-content-between"},[e("h5",[n._v("At "+n._s(this.workout.location))]),n._v(" "),e("h5",[n._v("Level: "+n._s(this.workout.difficulty))])]),n._v(" "),e("div",{staticClass:"rectangle"}),n._v(" "),e("div",{staticClass:"d-flex justify-content-between"},[e("div",[e("h5",[n._v("Best Times")]),n._v("\n                "+n._s(this.workout.best_times)+"\n            ")]),n._v(" "),e("div",[e("h5",[n._v("Duration")]),n._v(" "),e("div",{staticClass:"text-right"},[n._v("\n                    "+n._s(this.workout.duration)+" minutes\n                ")])])]),n._v(" "),e("div",{staticClass:"d-flex justify-content-between mt-3"},[e("div",[e("h5",[n._v("Materials")]),n._v("\n                "+n._s(this.workout.materials)+"\n            ")]),n._v(" "),e("div",[e("h5",[n._v("Minimum Number of Participants")]),n._v(" "),e("div",{staticClass:"text-right"},[n._v("\n                    "+n._s(this.workout.people_count)+" people\n                ")])])]),n._v(" "),e("div",{staticClass:"mt-3"},[e("h5",[n._v("Instructions")]),n._v("\n            "+n._s(this.workout.instructions)+"\n        ")]),n._v(" "),e("div",{staticClass:"rectangle"}),n._v(" "),n._m(0)]),n._v(" "),e("b-modal",{ref:"deleteWorkout",attrs:{id:"deleteWorkout","hide-footer":"",title:"Delete this Workout?"}},[e("div",{staticClass:"d-flex justify-content-around"},[e("b-button",{attrs:{variant:"primary",size:"large"},on:{click:function(t){return n.$refs.deleteWorkout.hide()}}},[n._v("No")]),n._v(" "),e("b-button",{attrs:{variant:"secondary",size:"large",type:"submit"},on:{click:function(t){return n.deleteWorkout()}}},[n._v("Yes")])],1)])],1):n._e()},jn=[function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"d-flex justify-content-between mb-3"},[e("h5",[n._v("Reviews")])])}];function qn(n){e("2d9b")}var Pn=!1,Tn=qn,Dn="data-v-7baa58aa",An=null,Wn=Object(u["a"])(Nn,On,jn,Pn,Tn,Dn,An),En=Wn.exports;a["default"].use($["a"]);var Mn=new $["a"]({mode:"history",routes:[{path:"/",name:"home",component:pn},{path:"/workouts/:id",name:"Workout",component:En},{path:"/404",alias:"*",name:"NotFound",component:Sn}]}),zn=e("bc3a"),Ln=e.n(zn);a["default"].use(r["a"]);var Un=new r["a"].Store({state:{workouts:null,workout:null,token:localStorage.getItem("token"),firstName:localStorage.getItem("firstName"),loggedIn:!!localStorage.getItem("token"),admin:!!localStorage.getItem("admin")&&localStorage.getItem("admin")},mutations:{set_admin(n,t){n.admin=t},set_token(n,t){n.token=t,n.loggedIn=!!t},set_firstName(n,t){n.firstName=t},set_workouts(n,t){n.workouts=t},set_workout(n,t){n.workout=t}},actions:{read_workout:async({state:n,commit:t},e)=>(t("set_workout",null),await Ln.a.get("/workout/"+e,{headers:{"X-Access-Token":n.token}}).then(n=>{t("set_workout",n.data)}).catch(n=>{})),read_workouts:async({state:n,commit:t})=>await Ln.a.get("/workout",{headers:{"X-Access-Token":n.token}}).then(n=>{t("set_workouts",n.data)}),create_workout:async({state:n,dispatch:t},e)=>await Ln.a.post("/workout",e,{headers:{"X-Access-Token":n.token}}).then(n=>{t("read_workouts")}).catch(n=>{}),delete_workout:async({state:n},t)=>await Ln.a.delete("/workout/"+t,{headers:{"X-Access-Token":n.token}}).then(n=>{Mn.push("/")}).catch(n=>{}),register_user:async({commit:n},t)=>await Ln.a.post("/user/register",t).then(t=>{n("set_token",t.data.token),n("set_firstName",t.data.first_name),localStorage.setItem("token",t.data.token),localStorage.setItem("firstName",t.data.first_name)}).catch(n=>{throw n.response}),login_user:async({commit:n},t)=>await Ln.a.post("/user/login",t).then(t=>{n("set_token",t.data.token),n("set_firstName",t.data.first_name),localStorage.setItem("token",t.data.token),localStorage.setItem("firstName",t.data.first_name)}).catch(n=>{throw n.response}),logout_user:({commit:n})=>(localStorage.removeItem("token"),localStorage.removeItem("firstName"),n("set_token",null),n("set_firstName",""),n("set_admin",!1),Mn.push("/")),update_admin:({commit:n},t)=>{n("set_admin",t)}}}),Bn=e("7923"),Jn=e("f5af"),Fn=e.n(Jn),Xn=(e("e829"),e("7bb1")),Hn=e("5f5b"),Rn=e("04e1"),Gn=e.n(Rn);e("49b1");a["default"].component("tabs",Bn["Tabs"]),a["default"].component("tab",Bn["Tab"]),a["default"].prototype.JwtDecode=Gn.a,a["default"].use(Hn["a"]),a["default"].use(Xn["a"],{fieldsBagName:"veeFields"}),a["default"].prototype.$http=Ln.a,a["default"].config.productionTip=!1,Fn.a.init(),new a["default"]({router:Mn,store:Un,render:n=>n(S)}).$mount("#app")},"57f3":function(n,t,e){var a=e("f5be");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("de7e0172",a,!0,{})},"73bf":function(n,t,e){var a=e("cb3d");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("13e065e5",a,!0,{})},"803a":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},"98b9":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},b5ee:function(n,t,e){var a=e("4bc9");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("83d0fb4a",a,!0,{})},c10c:function(n,t,e){n.exports=e.p+"img/getuplogo.8fea8e61.png"},c2cc:function(n,t,e){var a=e("803a");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("5ef9bdf2",a,!0,{})},cb3d:function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},e292:function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},e7be:function(n,t,e){var a=e("98b9");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var r=e("499e").default;r("474b47a6",a,!0,{})},f5be:function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])}});
//# sourceMappingURL=app.c75d47e4.js.map