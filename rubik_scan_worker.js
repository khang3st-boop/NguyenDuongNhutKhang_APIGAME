(function dartProgram(){function copyProperties(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
b[q]=a[q]}}function mixinPropertiesHard(a,b){var s=Object.keys(a)
for(var r=0;r<s.length;r++){var q=s[r]
if(!b.hasOwnProperty(q)){b[q]=a[q]}}}function mixinPropertiesEasy(a,b){Object.assign(b,a)}var z=function(){var s=function(){}
s.prototype={p:{}}
var r=new s()
if(!(Object.getPrototypeOf(r)&&Object.getPrototypeOf(r).p===s.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var q=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(q))return true}}catch(p){}return false}()
function inherit(a,b){a.prototype.constructor=a
a.prototype["$i"+a.name]=a
if(b!=null){if(z){Object.setPrototypeOf(a.prototype,b.prototype)
return}var s=Object.create(b.prototype)
copyProperties(a.prototype,s)
a.prototype=s}}function inheritMany(a,b){for(var s=0;s<b.length;s++){inherit(b[s],a)}}function mixinEasy(a,b){mixinPropertiesEasy(b.prototype,a.prototype)
a.prototype.constructor=a}function mixinHard(a,b){mixinPropertiesHard(b.prototype,a.prototype)
a.prototype.constructor=a}function lazy(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){a[b]=d()}a[c]=function(){return this[b]}
return a[b]}}function lazyFinal(a,b,c,d){var s=a
a[b]=s
a[c]=function(){if(a[b]===s){var r=d()
if(a[b]!==s){A.u9(b)}a[b]=r}var q=a[b]
a[c]=function(){return q}
return q}}function makeConstList(a,b){if(b!=null)A.k(a,b)
a.$flags=7
return a}function convertToFastObject(a){function t(){}t.prototype=a
new t()
return a}function convertAllToFastObject(a){for(var s=0;s<a.length;++s){convertToFastObject(a[s])}}var y=0
function instanceTearOffGetter(a,b){var s=null
return a?function(c){if(s===null)s=A.my(b)
return new s(c,this)}:function(){if(s===null)s=A.my(b)
return new s(this,null)}}function staticTearOffGetter(a){var s=null
return function(){if(s===null)s=A.my(a).prototype
return s}}var x=0
function tearOffParameters(a,b,c,d,e,f,g,h,i,j){if(typeof h=="number"){h+=x}return{co:a,iS:b,iI:c,rC:d,dV:e,cs:f,fs:g,fT:h,aI:i||0,nDA:j}}function installStaticTearOff(a,b,c,d,e,f,g,h){var s=tearOffParameters(a,true,false,c,d,e,f,g,h,false)
var r=staticTearOffGetter(s)
a[b]=r}function installInstanceTearOff(a,b,c,d,e,f,g,h,i,j){c=!!c
var s=tearOffParameters(a,false,c,d,e,f,g,h,i,!!j)
var r=instanceTearOffGetter(c,s)
a[b]=r}function setOrUpdateInterceptorsByTag(a){var s=v.interceptorsByTag
if(!s){v.interceptorsByTag=a
return}copyProperties(a,s)}function setOrUpdateLeafTags(a){var s=v.leafTags
if(!s){v.leafTags=a
return}copyProperties(a,s)}function updateTypes(a){var s=v.types
var r=s.length
s.push.apply(s,a)
return r}function updateHolder(a,b){copyProperties(b,a)
return a}var hunkHelpers=function(){var s=function(a,b,c,d,e){return function(f,g,h,i){return installInstanceTearOff(f,g,a,b,c,d,[h],i,e,false)}},r=function(a,b,c,d){return function(e,f,g,h){return installStaticTearOff(e,f,a,b,c,[g],h,d)}}
return{inherit:inherit,inheritMany:inheritMany,mixin:mixinEasy,mixinHard:mixinHard,installStaticTearOff:installStaticTearOff,installInstanceTearOff:installInstanceTearOff,_instance_0u:s(0,0,null,["$0"],0),_instance_1u:s(0,1,null,["$1"],0),_instance_2u:s(0,2,null,["$2"],0),_instance_0i:s(1,0,null,["$0"],0),_instance_1i:s(1,1,null,["$1"],0),_instance_2i:s(1,2,null,["$2"],0),_static_0:r(0,null,["$0"],0),_static_1:r(1,null,["$1"],0),_static_2:r(2,null,["$2"],0),makeConstList:makeConstList,lazy:lazy,lazyFinal:lazyFinal,updateHolder:updateHolder,convertToFastObject:convertToFastObject,updateTypes:updateTypes,setOrUpdateInterceptorsByTag:setOrUpdateInterceptorsByTag,setOrUpdateLeafTags:setOrUpdateLeafTags}}()
function initializeDeferredHunk(a){x=v.types.length
a(hunkHelpers,v,w,$)}var J={
mB(a,b,c,d){return{i:a,p:b,e:c,x:d}},
lb(a){var s,r,q,p,o,n=a[v.dispatchPropertyName]
if(n==null)if($.mz==null){A.tU()
n=a[v.dispatchPropertyName]}if(n!=null){s=n.p
if(!1===s)return n.i
if(!0===s)return a
r=Object.getPrototypeOf(a)
if(s===r)return n.i
if(n.e===r)throw A.h(A.nG("Return interceptor for "+A.E(s(a,n))))}q=a.constructor
if(q==null)p=null
else{o=$.k9
if(o==null)o=$.k9=v.getIsolateTag("_$dart_js")
p=q[o]}if(p!=null)return p
p=A.u_(a)
if(p!=null)return p
if(typeof a=="function")return B.d9
s=Object.getPrototypeOf(a)
if(s==null)return B.c_
if(s===Object.prototype)return B.c_
if(typeof q=="function"){o=$.k9
if(o==null)o=$.k9=v.getIsolateTag("_$dart_js")
Object.defineProperty(q,o,{value:B.aN,enumerable:false,writable:true,configurable:true})
return B.aN}return B.aN},
nf(a,b){if(a<0||a>4294967295)throw A.h(A.ah(a,0,4294967295,"length",null))
return J.ng(new Array(a),b)},
ar(a,b){if(a<0||a>4294967295)throw A.h(A.ah(a,0,4294967295,"length",null))
return J.ng(new Array(a),b)},
hg(a,b){if(a<0)throw A.h(A.bs("Length must be a non-negative integer: "+a,null))
return A.k(new Array(a),b.l("r<0>"))},
bQ(a,b){if(a<0)throw A.h(A.bs("Length must be a non-negative integer: "+a,null))
return A.k(new Array(a),b.l("r<0>"))},
ng(a,b){var s=A.k(a,b.l("r<0>"))
s.$flags=1
return s},
pB(a,b){var s=t.bP
return J.oZ(s.a(a),s.a(b))},
nh(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
pC(a,b){var s,r
for(s=a.length;b<s;){r=a.charCodeAt(b)
if(r!==32&&r!==13&&!J.nh(r))break;++b}return b},
pD(a,b){var s,r,q
for(s=a.length;b>0;b=r){r=b-1
if(!(r<s))return A.a(a,r)
q=a.charCodeAt(r)
if(q!==32&&q!==13&&!J.nh(q))break}return b},
cM(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.ek.prototype
return J.hi.prototype}if(typeof a=="string")return J.cj.prototype
if(a==null)return J.el.prototype
if(typeof a=="boolean")return J.hh.prototype
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.dm.prototype
if(typeof a=="bigint")return J.dl.prototype
return a}if(a instanceof A.C)return a
return J.lb(a)},
a6(a){if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.dm.prototype
if(typeof a=="bigint")return J.dl.prototype
return a}if(a instanceof A.C)return a
return J.lb(a)},
ai(a){if(a==null)return a
if(Array.isArray(a))return J.r.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.dm.prototype
if(typeof a=="bigint")return J.dl.prototype
return a}if(a instanceof A.C)return a
return J.lb(a)},
tP(a){if(typeof a=="number")return J.dk.prototype
if(typeof a=="string")return J.cj.prototype
if(a==null)return a
if(!(a instanceof A.C))return J.dB.prototype
return a},
bq(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bx.prototype
if(typeof a=="symbol")return J.dm.prototype
if(typeof a=="bigint")return J.dl.prototype
return a}if(a instanceof A.C)return a
return J.lb(a)},
ae(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.cM(a).U(a,b)},
c(a,b){if(typeof b==="number")if(Array.isArray(a)||A.tY(a,a[v.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.ai(a).m(a,b)},
x(a,b,c){return J.ai(a).h(a,b,c)},
oV(a,b,c){return J.bq(a).fe(a,b,c)},
mK(a,b,c){return J.bq(a).ff(a,b,c)},
oW(a,b,c){return J.bq(a).fg(a,b,c)},
oX(a,b,c){return J.bq(a).fh(a,b,c)},
lv(a,b,c){return J.bq(a).fi(a,b,c)},
oY(a){return J.bq(a).fj(a)},
mL(a,b,c){return J.bq(a).dc(a,b,c)},
aG(a,b,c){return J.bq(a).fk(a,b,c)},
af(a){return J.bq(a).fl(a)},
a4(a,b,c){return J.bq(a).dd(a,b,c)},
oZ(a,b){return J.tP(a).bz(a,b)},
mM(a,b){return J.ai(a).bp(a,b)},
br(a,b,c,d){return J.ai(a).aF(a,b,c,d)},
bk(a){return J.cM(a).gH(a)},
p_(a){return J.a6(a).gah(a)},
dR(a){return J.ai(a).gF(a)},
bl(a){return J.a6(a).gu(a)},
p0(a){return J.cM(a).gaJ(a)},
mN(a,b,c){return J.bq(a).fT(a,b,c)},
lw(a,b){return J.ai(a).dk(a,b)},
lx(a,b,c){return J.ai(a).be(a,b,c)},
p1(a,b){return J.ai(a).fG(a,b)},
fz(a){return J.cM(a).B(a)},
h4:function h4(){},
hh:function hh(){},
el:function el(){},
em:function em(){},
bS:function bS(){},
hy:function hy(){},
dB:function dB(){},
bx:function bx(){},
dl:function dl(){},
dm:function dm(){},
r:function r(a){this.$ti=a},
hf:function hf(){},
iQ:function iQ(a){this.$ti=a},
c3:function c3(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
dk:function dk(){},
ek:function ek(){},
hi:function hi(){},
cj:function cj(){}},A={lJ:function lJ(){},
p6(a,b,c){if(t.gt.b(a))return new A.f7(a,b.l("@<0>").aG(c).l("f7<1,2>"))
return new A.c4(a,b.l("@<0>").aG(c).l("c4<1,2>"))},
nj(a){return new A.dn("Field '"+a+"' has not been initialized.")},
pE(a){return new A.dn("Field '"+a+"' has already been initialized.")},
bC(a,b){a=a+b&536870911
a=a+((a&524287)<<10)&536870911
return a^a>>>6},
jq(a){a=a+((a&67108863)<<3)&536870911
a^=a>>>11
return a+((a&16383)<<15)&536870911},
cJ(a,b,c){return a},
mA(a){var s,r
for(s=$.aS.length,r=0;r<s;++r)if(a===$.aS[r])return!0
return!1},
bX(a,b,c,d){A.bB(b,"start")
if(c!=null){A.bB(c,"end")
if(b>c)A.ad(A.ah(b,0,c,"start",null))}return new A.cC(a,b,c,d.l("cC<0>"))},
iP(){return new A.dz("No element")},
ne(){return new A.dz("Too few elements")},
dG:function dG(){},
dU:function dU(a,b){this.a=a
this.$ti=b},
c4:function c4(a,b){this.a=a
this.$ti=b},
f7:function f7(a,b){this.a=a
this.$ti=b},
c5:function c5(a,b){this.a=a
this.$ti=b},
iv:function iv(a,b){this.a=a
this.b=b},
dn:function dn(a){this.a=a},
b4:function b4(a){this.a=a},
jo:function jo(){},
D:function D(){},
a5:function a5(){},
cC:function cC(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.$ti=d},
aM:function aM(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
eq:function eq(a,b,c){this.a=a
this.b=b
this.$ti=c},
er:function er(a,b,c){var _=this
_.a=null
_.b=a
_.c=b
_.$ti=c},
ao:function ao(a,b,c){this.a=a
this.b=b
this.$ti=c},
aB:function aB(a,b,c){this.a=a
this.b=b
this.$ti=c},
f5:function f5(a,b,c){this.a=a
this.b=b
this.$ti=c},
dX:function dX(a){this.$ti=a},
dY:function dY(a){this.$ti=a},
au:function au(){},
bG:function bG(){},
dC:function dC(){},
pd(){throw A.h(A.bg("Cannot modify unmodifiable Map"))},
ox(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
tY(a,b){var s
if(b!=null){s=b.x
if(s!=null)return s}return t.dX.b(a)},
E(a){var s
if(typeof a=="string")return a
if(typeof a=="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
s=J.fz(a)
return s},
eR(a){var s,r=$.nu
if(r==null)r=$.nu=Symbol("identityHashCode")
s=a[r]
if(s==null){s=Math.random()*0x3fffffff|0
a[r]=s}return s},
q4(a,b){var s,r=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(r==null)return null
if(3>=r.length)return A.a(r,3)
s=r[3]
if(s!=null)return parseInt(a,10)
if(r[2]!=null)return parseInt(a,16)
return null},
q3(a){var s,r
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return null
s=parseFloat(a)
if(isNaN(s)){r=B.o.e1(a)
if(r==="NaN"||r==="+NaN"||r==="-NaN")return s
return null}return s},
hB(a){var s,r,q,p
if(a instanceof A.C)return A.aR(A.b2(a),null)
s=J.cM(a)
if(s===B.d7||s===B.da||t.cx.b(a)){r=B.aQ(a)
if(r!=="Object"&&r!=="")return r
q=a.constructor
if(typeof q=="function"){p=q.name
if(typeof p=="string"&&p!=="Object"&&p!=="")return p}}return A.aR(A.b2(a),null)},
nv(a){var s,r,q
if(a==null||typeof a=="number"||A.ms(a))return J.fz(a)
if(typeof a=="string")return JSON.stringify(a)
if(a instanceof A.bL)return a.B(0)
if(a instanceof A.aP)return a.f6(!0)
s=$.oU()
for(r=0;r<1;++r){q=s[r].kp(a)
if(q!=null)return q}return"Instance of '"+A.hB(a)+"'"},
pU(){return Date.now()},
q2(){var s,r
if($.ja!==0)return
$.ja=1000
if(typeof window=="undefined")return
s=window
if(s==null)return
if(!!s.dartUseDateNowForTicks)return
r=s.performance
if(r==null)return
if(typeof r.now!="function")return
$.ja=1e6
$.lY=new A.j9(r)},
nt(a){var s,r,q,p,o=a.length
if(o<=500)return String.fromCharCode.apply(null,a)
for(s="",r=0;r<o;r=q){q=r+500
p=q<o?q:o
s+=String.fromCharCode.apply(null,a.slice(r,p))}return s},
q5(a){var s,r,q,p=A.k([],t.t)
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.V)(a),++r){q=a[r]
if(!A.kS(q))throw A.h(A.c1(q))
if(q<=65535)B.c.I(p,q)
else if(q<=1114111){B.c.I(p,55296+(B.a.j(q-65536,10)&1023))
B.c.I(p,56320+(q&1023))}else throw A.h(A.c1(q))}return A.nt(p)},
nw(a){var s,r,q
for(s=a.length,r=0;r<s;++r){q=a[r]
if(!A.kS(q))throw A.h(A.c1(q))
if(q<0)throw A.h(A.c1(q))
if(q>65535)return A.q5(a)}return A.nt(a)},
q6(a,b,c){var s,r,q,p
if(c<=500&&b===0&&c===a.length)return String.fromCharCode.apply(null,a)
for(s=b,r="";s<c;s=q){q=s+500
p=q<c?q:c
r+=String.fromCharCode.apply(null,a.subarray(s,p))}return r},
Z(a){var s
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){s=a-65536
return String.fromCharCode((B.a.j(s,10)|55296)>>>0,s&1023|56320)}throw A.h(A.ah(a,0,1114111,null,null))},
dr(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
q1(a){var s=A.dr(a).getUTCFullYear()+0
return s},
q_(a){var s=A.dr(a).getUTCMonth()+1
return s},
pW(a){var s=A.dr(a).getUTCDate()+0
return s},
pX(a){var s=A.dr(a).getUTCHours()+0
return s},
pZ(a){var s=A.dr(a).getUTCMinutes()+0
return s},
q0(a){var s=A.dr(a).getUTCSeconds()+0
return s},
pY(a){var s=A.dr(a).getUTCMilliseconds()+0
return s},
pV(a){var s=a.$thrownJsError
if(s==null)return null
return A.fy(s)},
q7(a,b){var s
if(a.$thrownJsError==null){s=new Error()
A.a8(a,s)
a.$thrownJsError=s
s.stack=""}},
cN(a){throw A.h(A.c1(a))},
a(a,b){if(a==null)J.bl(a)
throw A.h(A.l2(a,b))},
l2(a,b){var s,r="index"
if(!A.kS(b))return new A.b3(!0,b,r,null)
s=J.bl(a)
if(b<0||b>=s)return A.lF(b,s,a,r)
return A.ny(b,r)},
tH(a,b,c){if(a<0||a>c)return A.ah(a,0,c,"start",null)
if(b!=null)if(b<a||b>c)return A.ah(b,a,c,"end",null)
return new A.b3(!0,b,"end",null)},
c1(a){return new A.b3(!0,a,null,null)},
l_(a){return a},
h(a){return A.a8(a,new Error())},
a8(a,b){var s
if(a==null)a=new A.bD()
b.dartException=a
s=A.ua
if("defineProperty" in Object){Object.defineProperty(b,"message",{get:s})
b.name=""}else b.toString=s
return b},
ua(){return J.fz(this.dartException)},
ad(a,b){throw A.a8(a,b==null?new Error():b)},
b(a,b,c){var s
if(b==null)b=0
if(c==null)c=0
s=Error()
A.ad(A.rL(a,b,c),s)},
rL(a,b,c){var s,r,q,p,o,n,m,l,k
if(typeof b=="string")s=b
else{r="[]=;add;removeWhere;retainWhere;removeRange;setRange;setInt8;setInt16;setInt32;setUint8;setUint16;setUint32;setFloat32;setFloat64".split(";")
q=r.length
p=b
if(p>q){c=p/q|0
p%=q}s=r[p]}o=typeof c=="string"?c:"modify;remove from;add to".split(";")[c]
n=t.j.b(a)?"list":"ByteData"
m=a.$flags|0
l="a "
if((m&4)!==0)k="constant "
else if((m&2)!==0){k="unmodifiable "
l="an "}else k=(m&1)!==0?"fixed-length ":""
return new A.eY("'"+s+"': Cannot "+o+" "+l+k+n)},
V(a){throw A.h(A.aq(a))},
bE(a){var s,r,q,p,o,n
a=A.u6(a.replace(String({}),"$receiver$"))
s=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(s==null)s=A.k([],t.s)
r=s.indexOf("\\$arguments\\$")
q=s.indexOf("\\$argumentsExpr\\$")
p=s.indexOf("\\$expr\\$")
o=s.indexOf("\\$method\\$")
n=s.indexOf("\\$receiver\\$")
return new A.jv(a.replace(new RegExp("\\\\\\$arguments\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$argumentsExpr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$expr\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$method\\\\\\$","g"),"((?:x|[^x])*)").replace(new RegExp("\\\\\\$receiver\\\\\\$","g"),"((?:x|[^x])*)"),r,q,p,o,n)},
jw(a){return function($expr$){var $argumentsExpr$="$arguments$"
try{$expr$.$method$($argumentsExpr$)}catch(s){return s.message}}(a)},
nD(a){return function($expr$){try{$expr$.$method$}catch(s){return s.message}}(a)},
lL(a,b){var s=b==null,r=s?null:b.method
return new A.ho(a,r,s?null:b.receiver)},
bK(a){if(a==null)return new A.j4(a)
if(typeof a!=="object")return a
if("dartException" in a)return A.cP(a,a.dartException)
return A.tx(a)},
cP(a,b){if(t.C.b(b))if(b.$thrownJsError==null)b.$thrownJsError=a
return b},
tx(a){var s,r,q,p,o,n,m,l,k,j,i,h,g
if(!("message" in a))return a
s=a.message
if("number" in a&&typeof a.number=="number"){r=a.number
q=r&65535
if((B.a.j(r,16)&8191)===10)switch(q){case 438:return A.cP(a,A.lL(A.E(s)+" (Error "+q+")",null))
case 445:case 5007:A.E(s)
return A.cP(a,new A.eC())}}if(a instanceof TypeError){p=$.oC()
o=$.oD()
n=$.oE()
m=$.oF()
l=$.oI()
k=$.oJ()
j=$.oH()
$.oG()
i=$.oL()
h=$.oK()
g=p.bA(s)
if(g!=null)return A.cP(a,A.lL(A.b1(s),g))
else{g=o.bA(s)
if(g!=null){g.method="call"
return A.cP(a,A.lL(A.b1(s),g))}else if(n.bA(s)!=null||m.bA(s)!=null||l.bA(s)!=null||k.bA(s)!=null||j.bA(s)!=null||m.bA(s)!=null||i.bA(s)!=null||h.bA(s)!=null){A.b1(s)
return A.cP(a,new A.eC())}}return A.cP(a,new A.hU(typeof s=="string"?s:""))}if(a instanceof RangeError){if(typeof s=="string"&&s.indexOf("call stack")!==-1)return new A.eW()
s=function(b){try{return String(b)}catch(f){}return null}(a)
return A.cP(a,new A.b3(!1,null,null,typeof s=="string"?s.replace(/^RangeError:\s*/,""):s))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof s=="string"&&s==="too much recursion")return new A.eW()
return a},
fy(a){var s
if(a==null)return new A.fo(a)
s=a.$cachedTrace
if(s!=null)return s
s=new A.fo(a)
if(typeof a==="object")a.$cachedTrace=s
return s},
ij(a){if(a==null)return J.bk(a)
if(typeof a=="object")return A.eR(a)
return J.bk(a)},
tC(a){if(typeof a=="number")return B.b.gH(a)
if(a instanceof A.ia)return A.eR(a)
if(a instanceof A.aP)return a.gH(a)
return A.ij(a)},
oq(a,b){var s,r,q,p=a.length
for(s=0;s<p;s=q){r=s+1
q=r+1
b.h(0,a[s],a[r])}return b},
t2(a,b,c,d,e,f){t.Z.a(a)
switch(A.w(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw A.h(new A.jX("Unsupported number of arguments for wrapped closure"))},
dP(a,b){var s=a.$identity
if(!!s)return s
s=A.tD(a,b)
a.$identity=s
return s},
tD(a,b){var s
switch(b){case 0:s=a.$0
break
case 1:s=a.$1
break
case 2:s=a.$2
break
case 3:s=a.$3
break
case 4:s=a.$4
break
default:s=null}if(s!=null)return s.bind(a)
return function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,A.t2)},
pb(a2){var s,r,q,p,o,n,m,l,k,j,i=a2.co,h=a2.iS,g=a2.iI,f=a2.nDA,e=a2.aI,d=a2.fs,c=a2.cs,b=d[0],a=c[0],a0=i[b],a1=a2.fT
a1.toString
s=h?Object.create(new A.hO().constructor.prototype):Object.create(new A.cR(null,null).constructor.prototype)
s.$initialize=s.constructor
r=h?function static_tear_off(){this.$initialize()}:function tear_off(a3,a4){this.$initialize(a3,a4)}
s.constructor=r
r.prototype=s
s.$_name=b
s.$_target=a0
q=!h
if(q)p=A.mV(b,a0,g,f)
else{s.$static_name=b
p=a0}s.$S=A.p7(a1,h,g)
s[a]=p
for(o=p,n=1;n<d.length;++n){m=d[n]
if(typeof m=="string"){l=i[m]
k=m
m=l}else k=""
j=c[n]
if(j!=null){if(q)m=A.mV(k,m,g,f)
s[j]=m}if(n===e)o=m}s.$C=o
s.$R=a2.rC
s.$D=a2.dV
return r},
p7(a,b,c){if(typeof a=="number")return a
if(typeof a=="string"){if(b)throw A.h("Cannot compute signature for static tearoff.")
return function(d,e){return function(){return e(this,d)}}(a,A.p3)}throw A.h("Error in functionType of tearoff")},
p8(a,b,c,d){var s=A.mU
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,s)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,s)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,s)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,s)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,s)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,s)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,s)}},
mV(a,b,c,d){if(c)return A.pa(a,b,d)
return A.p8(b.length,d,a,b)},
p9(a,b,c,d){var s=A.mU,r=A.p4
switch(b?-1:a){case 0:throw A.h(new A.hN("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,r,s)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,r,s)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,r,s)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,r,s)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,r,s)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,r,s)
default:return function(e,f,g){return function(){var q=[g(this)]
Array.prototype.push.apply(q,arguments)
return e.apply(f(this),q)}}(d,r,s)}},
pa(a,b,c){var s,r
if($.mS==null)$.mS=A.mR("interceptor")
if($.mT==null)$.mT=A.mR("receiver")
s=b.length
r=A.p9(s,c,a,b)
return r},
my(a){return A.pb(a)},
p3(a,b){return A.ft(v.typeUniverse,A.b2(a.a),b)},
mU(a){return a.a},
p4(a){return a.b},
mR(a){var s,r,q,p=new A.cR("receiver","interceptor"),o=Object.getOwnPropertyNames(p)
o.$flags=1
s=o
for(o=s.length,r=0;r<o;++r){q=s[r]
if(p[q]===a)return q}throw A.h(A.bs("Field name "+a+" not found.",null))},
os(a){return v.getIsolateTag(a)},
vA(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
u_(a){var s,r,q,p,o,n=A.b1($.ot.$1(a)),m=$.l3[n]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.lf[n]
if(s!=null)return s
r=v.interceptorsByTag[n]
if(r==null){q=A.ml($.ok.$2(a,n))
if(q!=null){m=$.l3[q]
if(m!=null){Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}s=$.lf[q]
if(s!=null)return s
r=v.interceptorsByTag[q]
n=q}}if(r==null)return null
s=r.prototype
p=n[0]
if(p==="!"){m=A.lh(s)
$.l3[n]=m
Object.defineProperty(a,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
return m.i}if(p==="~"){$.lf[n]=s
return s}if(p==="-"){o=A.lh(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}if(p==="+")return A.ou(a,s)
if(p==="*")throw A.h(A.nG(n))
if(v.leafTags[n]===true){o=A.lh(s)
Object.defineProperty(Object.getPrototypeOf(a),v.dispatchPropertyName,{value:o,enumerable:false,writable:true,configurable:true})
return o.i}else return A.ou(a,s)},
ou(a,b){var s=Object.getPrototypeOf(a)
Object.defineProperty(s,v.dispatchPropertyName,{value:J.mB(b,s,null,null),enumerable:false,writable:true,configurable:true})
return b},
lh(a){return J.mB(a,!1,null,!!a.$iaK)},
u1(a,b,c){var s=b.prototype
if(v.leafTags[a]===true)return A.lh(s)
else return J.mB(s,c,null,null)},
tU(){if(!0===$.mz)return
$.mz=!0
A.tV()},
tV(){var s,r,q,p,o,n,m,l
$.l3=Object.create(null)
$.lf=Object.create(null)
A.tT()
s=v.interceptorsByTag
r=Object.getOwnPropertyNames(s)
if(typeof window!="undefined"){window
q=function(){}
for(p=0;p<r.length;++p){o=r[p]
n=$.ov.$1(o)
if(n!=null){m=A.u1(o,s[o],n)
if(m!=null){Object.defineProperty(n,v.dispatchPropertyName,{value:m,enumerable:false,writable:true,configurable:true})
q.prototype=n}}}}for(p=0;p<r.length;++p){o=r[p]
if(/^[A-Za-z_]/.test(o)){l=s[o]
s["!"+o]=l
s["~"+o]=l
s["-"+o]=l
s["+"+o]=l
s["*"+o]=l}}},
tT(){var s,r,q,p,o,n,m=B.cx()
m=A.dO(B.cy,A.dO(B.cz,A.dO(B.aR,A.dO(B.aR,A.dO(B.cA,A.dO(B.cB,A.dO(B.cC(B.aQ),m)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){s=dartNativeDispatchHooksTransformer
if(typeof s=="function")s=[s]
if(Array.isArray(s))for(r=0;r<s.length;++r){q=s[r]
if(typeof q=="function")m=q(m)||m}}p=m.getTag
o=m.getUnknownTag
n=m.prototypeForTag
$.ot=new A.lc(p)
$.ok=new A.ld(o)
$.ov=new A.le(n)},
dO(a,b){return a(b)||b},
rl(a,b){var s,r
for(s=0;s<a.length;++s){r=a[s]
if(!(s<b.length))return A.a(b,s)
if(!J.ae(r,b[s]))return!1}return!0},
tG(a,b){var s=b.length,r=v.rttc[""+s+";"+a]
if(r==null)return null
if(s===0)return r
if(s===r.length)return r.apply(null,b)
return r(b)},
u6(a){if(/[[\]{}()*+?.\\^$|]/.test(a))return a.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
return a},
a_:function a_(a,b){this.a=a
this.b=b},
fm:function fm(a,b){this.a=a
this.b=b},
aQ:function aQ(a,b,c){this.a=a
this.b=b
this.c=c},
aC:function aC(a){this.a=a},
d3:function d3(){},
dW:function dW(a,b,c){this.a=a
this.b=b
this.$ti=c},
fd:function fd(a,b){this.a=a
this.$ti=b},
fe:function fe(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
cb:function cb(a,b){this.a=a
this.$ti=b},
j9:function j9(a){this.a=a},
eU:function eU(){},
jv:function jv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
eC:function eC(){},
ho:function ho(a,b,c){this.a=a
this.b=b
this.c=c},
hU:function hU(a){this.a=a},
j4:function j4(a){this.a=a},
fo:function fo(a){this.a=a
this.b=null},
bL:function bL(){},
fF:function fF(){},
fG:function fG(){},
hP:function hP(){},
hO:function hO(){},
cR:function cR(a,b){this.a=a
this.b=b},
hN:function hN(a){this.a=a},
b9:function b9(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
iW:function iW(a){this.a=a},
j_:function j_(a,b){var _=this
_.a=a
_.b=b
_.d=_.c=null},
by:function by(a,b){this.a=a
this.$ti=b},
U:function U(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
ep:function ep(a,b){this.a=a
this.$ti=b},
ax:function ax(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=null
_.$ti=d},
en:function en(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
lc:function lc(a){this.a=a},
ld:function ld(a){this.a=a},
le:function le(a){this.a=a},
aP:function aP(){},
cH:function cH(){},
dJ:function dJ(){},
dK:function dK(){},
u9(a){throw A.a8(new A.dn("Field '"+a+"' has been assigned during initialization."),new Error())},
d(){throw A.a8(A.nj(""),new Error())},
mC(){throw A.a8(A.pE(""),new Error())},
rb(){var s=new A.jU()
return s.b=s},
jU:function jU(){this.b=null},
aD(a,b,c){},
z(a){var s,r,q
if(t.iy.b(a))return a
s=J.a6(a)
r=A.K(s.gu(a),null,!1,t.z)
for(q=0;q<s.gu(a);++q)B.c.h(r,q,s.m(a,q))
return r},
pF(a,b,c){var s
A.aD(a,b,c)
s=new DataView(a,b,c)
return s},
pG(a){return new Float32Array(a)},
pH(a){return new Float32Array(A.z(a))},
pI(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,4)
return new Float32Array(a,b,c)},
pJ(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,2)
return new Int16Array(a,b,c)},
pK(a){return new Int32Array(a)},
pL(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,4)
return new Int32Array(a,b,c)},
nq(a){return new Int8Array(a)},
pM(a){return new Int8Array(A.z(a))},
pN(a,b,c){A.aD(a,b,c)
return c==null?new Int8Array(a,b):new Int8Array(a,b,c)},
pO(a){return new Uint16Array(a)},
pP(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,2)
return new Uint16Array(a,b,c)},
pQ(a){return new Uint32Array(a)},
pR(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,4)
return new Uint32Array(a,b,c)},
eB(a){return new Uint8Array(a)},
pS(a){return new Uint8Array(A.z(a))},
pT(a,b,c){A.aD(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
bJ(a,b,c){if(a>>>0!==a||a>=c)throw A.h(A.l2(b,a))},
bh(a,b,c){var s
if(!(a>>>0!==a))if(b==null)s=a>c
else s=b>>>0!==b||a>b||b>c
else s=!0
if(s)throw A.h(A.tH(a,b,c))
if(b==null)return c
return b},
cl:function cl(){},
ex:function ex(){},
kk:function kk(a){this.a=a},
ht:function ht(){},
ag:function ag(){},
bT:function bT(){},
aN:function aN(){},
es:function es(){},
et:function et(){},
eu:function eu(){},
ev:function ev(){},
ew:function ew(){},
ey:function ey(){},
ez:function ez(){},
eA:function eA(){},
cm:function cm(){},
fh:function fh(){},
fi:function fi(){},
fj:function fj(){},
fk:function fk(){},
m7(a,b){var s=b.c
return s==null?b.c=A.fr(a,"d5",[b.x]):s},
nz(a){var s=a.w
if(s===6||s===7)return A.nz(a.x)
return s===11||s===12},
qa(a){return a.as},
u2(a,b){var s,r=b.length
for(s=0;s<r;++s)if(!a[s].b(b[s]))return!1
return!0},
a3(a){return A.kj(v.typeUniverse,a,!1)},
cI(a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=a2.w
switch(a0){case 5:case 1:case 2:case 3:case 4:return a2
case 6:s=a2.x
r=A.cI(a1,s,a3,a4)
if(r===s)return a2
return A.nV(a1,r,!0)
case 7:s=a2.x
r=A.cI(a1,s,a3,a4)
if(r===s)return a2
return A.nU(a1,r,!0)
case 8:q=a2.y
p=A.dN(a1,q,a3,a4)
if(p===q)return a2
return A.fr(a1,a2.x,p)
case 9:o=a2.x
n=A.cI(a1,o,a3,a4)
m=a2.y
l=A.dN(a1,m,a3,a4)
if(n===o&&l===m)return a2
return A.mi(a1,n,l)
case 10:k=a2.x
j=a2.y
i=A.dN(a1,j,a3,a4)
if(i===j)return a2
return A.nW(a1,k,i)
case 11:h=a2.x
g=A.cI(a1,h,a3,a4)
f=a2.y
e=A.tu(a1,f,a3,a4)
if(g===h&&e===f)return a2
return A.nT(a1,g,e)
case 12:d=a2.y
a4+=d.length
c=A.dN(a1,d,a3,a4)
o=a2.x
n=A.cI(a1,o,a3,a4)
if(c===d&&n===o)return a2
return A.mj(a1,n,c,!0)
case 13:b=a2.x
if(b<a4)return a2
a=a3[b-a4]
if(a==null)return a2
return a
default:throw A.h(A.fC("Attempted to substitute unexpected RTI kind "+a0))}},
dN(a,b,c,d){var s,r,q,p,o=b.length,n=A.kn(o)
for(s=!1,r=0;r<o;++r){q=b[r]
p=A.cI(a,q,c,d)
if(p!==q)s=!0
n[r]=p}return s?n:b},
tv(a,b,c,d){var s,r,q,p,o,n,m=b.length,l=A.kn(m)
for(s=!1,r=0;r<m;r+=3){q=b[r]
p=b[r+1]
o=b[r+2]
n=A.cI(a,o,c,d)
if(n!==o)s=!0
l.splice(r,3,q,p,n)}return s?l:b},
tu(a,b,c,d){var s,r=b.a,q=A.dN(a,r,c,d),p=b.b,o=A.dN(a,p,c,d),n=b.c,m=A.tv(a,n,c,d)
if(q===r&&o===p&&m===n)return b
s=new A.i3()
s.a=q
s.b=o
s.c=m
return s},
k(a,b){a[v.arrayRti]=b
return a},
on(a){var s=a.$S
if(s!=null){if(typeof s=="number")return A.tR(s)
return a.$S()}return null},
tW(a,b){var s
if(A.nz(b))if(a instanceof A.bL){s=A.on(a)
if(s!=null)return s}return A.b2(a)},
b2(a){if(a instanceof A.C)return A.m(a)
if(Array.isArray(a))return A.W(a)
return A.mr(J.cM(a))},
W(a){var s=a[v.arrayRti],r=t.dG
if(s==null)return r
if(s.constructor!==r.constructor)return r
return s},
m(a){var s=a.$ti
return s!=null?s:A.mr(a)},
mr(a){var s=a.constructor,r=s.$ccache
if(r!=null)return r
return A.rZ(a,s)},
rZ(a,b){var s=a instanceof A.bL?Object.getPrototypeOf(Object.getPrototypeOf(a)).constructor:b,r=A.ru(v.typeUniverse,s.name)
b.$ccache=r
return r},
tR(a){var s,r=v.types,q=r[a]
if(typeof q=="string"){s=A.kj(v.typeUniverse,q,!1)
r[a]=s
return s}return q},
tQ(a){return A.cK(A.m(a))},
mx(a){var s
if(a instanceof A.aP)return A.tJ(a.$r,a.d_())
s=a instanceof A.bL?A.on(a):null
if(s!=null)return s
if(t.aJ.b(a))return J.p0(a).a
if(Array.isArray(a))return A.W(a)
return A.b2(a)},
cK(a){var s=a.r
return s==null?a.r=new A.ia(a):s},
tJ(a,b){var s,r,q=b,p=q.length
if(p===0)return t.aK
if(0>=p)return A.a(q,0)
s=A.ft(v.typeUniverse,A.mx(q[0]),"@<0>")
for(r=1;r<p;++r){if(!(r<q.length))return A.a(q,r)
s=A.nX(v.typeUniverse,s,A.mx(q[r]))}return A.ft(v.typeUniverse,s,a)},
bj(a){return A.cK(A.kj(v.typeUniverse,a,!1))},
rY(a){var s=this
s.b=A.ts(s)
return s.b(a)},
ts(a){var s,r,q,p,o
if(a===t.K)return A.t8
if(A.cO(a))return A.tc
s=a.w
if(s===6)return A.rW
if(s===1)return A.oa
if(s===7)return A.t3
r=A.tr(a)
if(r!=null)return r
if(s===8){q=a.x
if(a.y.every(A.cO)){a.f="$i"+q
if(q==="q")return A.t6
if(a===t.q)return A.t5
return A.tb}}else if(s===10){p=A.tG(a.x,a.y)
o=p==null?A.oa:p
return o==null?A.id(o):o}return A.rU},
tr(a){if(a.w===8){if(a===t.p)return A.kS
if(a===t.i||a===t.R)return A.t7
if(a===t.N)return A.ta
if(a===t.y)return A.ms}return null},
rX(a){var s=this,r=A.rT
if(A.cO(s))r=A.rD
else if(s===t.K)r=A.id
else if(A.dQ(s)){r=A.rV
if(s===t.I)r=A.rB
else if(s===t.jv)r=A.ml
else if(s===t.fU)r=A.rz
else if(s===t.jh)r=A.o2
else if(s===t.jX)r=A.rA
else if(s===t.mU)r=A.rC}else if(s===t.p)r=A.w
else if(s===t.N)r=A.b1
else if(s===t.y)r=A.o0
else if(s===t.R)r=A.ic
else if(s===t.i)r=A.dL
else if(s===t.q)r=A.o1
s.a=r
return s.a(a)},
rU(a){var s=this
if(a==null)return A.dQ(s)
return A.tZ(v.typeUniverse,A.tW(a,s),s)},
rW(a){if(a==null)return!0
return this.x.b(a)},
tb(a){var s,r=this
if(a==null)return A.dQ(r)
s=r.f
if(a instanceof A.C)return!!a[s]
return!!J.cM(a)[s]},
t6(a){var s,r=this
if(a==null)return A.dQ(r)
if(typeof a!="object")return!1
if(Array.isArray(a))return!0
s=r.f
if(a instanceof A.C)return!!a[s]
return!!J.cM(a)[s]},
t5(a){var s=this
if(a==null)return!1
if(typeof a=="object"){if(a instanceof A.C)return!!a[s.f]
return!0}if(typeof a=="function")return!0
return!1},
o9(a){if(typeof a=="object"){if(a instanceof A.C)return t.q.b(a)
return!0}if(typeof a=="function")return!0
return!1},
rT(a){var s=this
if(a==null){if(A.dQ(s))return a}else if(s.b(a))return a
throw A.a8(A.o5(a,s),new Error())},
rV(a){var s=this
if(a==null||s.b(a))return a
throw A.a8(A.o5(a,s),new Error())},
o5(a,b){return new A.fp("TypeError: "+A.nM(a,A.aR(b,null)))},
nM(a,b){return A.fO(a)+": type '"+A.aR(A.mx(a),null)+"' is not a subtype of type '"+b+"'"},
b0(a,b){return new A.fp("TypeError: "+A.nM(a,b))},
t3(a){var s=this
return s.x.b(a)||A.m7(v.typeUniverse,s).b(a)},
t8(a){return a!=null},
id(a){if(a!=null)return a
throw A.a8(A.b0(a,"Object"),new Error())},
tc(a){return!0},
rD(a){return a},
oa(a){return!1},
ms(a){return!0===a||!1===a},
o0(a){if(!0===a)return!0
if(!1===a)return!1
throw A.a8(A.b0(a,"bool"),new Error())},
rz(a){if(!0===a)return!0
if(!1===a)return!1
if(a==null)return a
throw A.a8(A.b0(a,"bool?"),new Error())},
dL(a){if(typeof a=="number")return a
throw A.a8(A.b0(a,"double"),new Error())},
rA(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a8(A.b0(a,"double?"),new Error())},
kS(a){return typeof a=="number"&&Math.floor(a)===a},
w(a){if(typeof a=="number"&&Math.floor(a)===a)return a
throw A.a8(A.b0(a,"int"),new Error())},
rB(a){if(typeof a=="number"&&Math.floor(a)===a)return a
if(a==null)return a
throw A.a8(A.b0(a,"int?"),new Error())},
t7(a){return typeof a=="number"},
ic(a){if(typeof a=="number")return a
throw A.a8(A.b0(a,"num"),new Error())},
o2(a){if(typeof a=="number")return a
if(a==null)return a
throw A.a8(A.b0(a,"num?"),new Error())},
ta(a){return typeof a=="string"},
b1(a){if(typeof a=="string")return a
throw A.a8(A.b0(a,"String"),new Error())},
ml(a){if(typeof a=="string")return a
if(a==null)return a
throw A.a8(A.b0(a,"String?"),new Error())},
o1(a){if(A.o9(a))return a
throw A.a8(A.b0(a,"JSObject"),new Error())},
rC(a){if(a==null)return a
if(A.o9(a))return a
throw A.a8(A.b0(a,"JSObject?"),new Error())},
og(a,b){var s,r,q
for(s="",r="",q=0;q<a.length;++q,r=", ")s+=r+A.aR(a[q],b)
return s},
ti(a,b){var s,r,q,p,o,n,m=a.x,l=a.y
if(""===m)return"("+A.og(l,b)+")"
s=l.length
r=m.split(",")
q=r.length-s
for(p="(",o="",n=0;n<s;++n,o=", "){p+=o
if(q===0)p+="{"
p+=A.aR(l[n],b)
if(q>=0)p+=" "+r[q];++q}return p+"})"},
o7(a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=", ",a2=null
if(a5!=null){s=a5.length
if(a4==null)a4=A.k([],t.s)
else a2=a4.length
r=a4.length
for(q=s;q>0;--q)B.c.I(a4,"T"+(r+q))
for(p=t.X,o="<",n="",q=0;q<s;++q,n=a1){m=a4.length
l=m-1-q
if(!(l>=0))return A.a(a4,l)
o=o+n+a4[l]
k=a5[q]
j=k.w
if(!(j===2||j===3||j===4||j===5||k===p))o+=" extends "+A.aR(k,a4)}o+=">"}else o=""
p=a3.x
i=a3.y
h=i.a
g=h.length
f=i.b
e=f.length
d=i.c
c=d.length
b=A.aR(p,a4)
for(a="",a0="",q=0;q<g;++q,a0=a1)a+=a0+A.aR(h[q],a4)
if(e>0){a+=a0+"["
for(a0="",q=0;q<e;++q,a0=a1)a+=a0+A.aR(f[q],a4)
a+="]"}if(c>0){a+=a0+"{"
for(a0="",q=0;q<c;q+=3,a0=a1){a+=a0
if(d[q+1])a+="required "
a+=A.aR(d[q+2],a4)+" "+d[q]}a+="}"}if(a2!=null){a4.toString
a4.length=a2}return o+"("+a+") => "+b},
aR(a,b){var s,r,q,p,o,n,m,l=a.w
if(l===5)return"erased"
if(l===2)return"dynamic"
if(l===3)return"void"
if(l===1)return"Never"
if(l===4)return"any"
if(l===6){s=a.x
r=A.aR(s,b)
q=s.w
return(q===11||q===12?"("+r+")":r)+"?"}if(l===7)return"FutureOr<"+A.aR(a.x,b)+">"
if(l===8){p=A.tw(a.x)
o=a.y
return o.length>0?p+("<"+A.og(o,b)+">"):p}if(l===10)return A.ti(a,b)
if(l===11)return A.o7(a,b,null)
if(l===12)return A.o7(a.x,b,a.y)
if(l===13){n=a.x
m=b.length
n=m-1-n
if(!(n>=0&&n<m))return A.a(b,n)
return b[n]}return"?"},
tw(a){var s=v.mangledGlobalNames[a]
if(s!=null)return s
return"minified:"+a},
rv(a,b){var s=a.tR[b]
while(typeof s=="string")s=a.tR[s]
return s},
ru(a,b){var s,r,q,p,o,n=a.eT,m=n[b]
if(m==null)return A.kj(a,b,!1)
else if(typeof m=="number"){s=m
r=A.fs(a,5,"#")
q=A.kn(s)
for(p=0;p<s;++p)q[p]=r
o=A.fr(a,b,q)
n[b]=o
return o}else return m},
rt(a,b){return A.nZ(a.tR,b)},
rs(a,b){return A.nZ(a.eT,b)},
kj(a,b,c){var s,r=a.eC,q=r.get(b)
if(q!=null)return q
s=A.nR(A.nP(a,null,b,!1))
r.set(b,s)
return s},
ft(a,b,c){var s,r,q=b.z
if(q==null)q=b.z=new Map()
s=q.get(c)
if(s!=null)return s
r=A.nR(A.nP(a,b,c,!0))
q.set(c,r)
return r},
nX(a,b,c){var s,r,q,p=b.Q
if(p==null)p=b.Q=new Map()
s=c.as
r=p.get(s)
if(r!=null)return r
q=A.mi(a,b,c.w===9?c.y:[c])
p.set(s,q)
return q},
c0(a,b){b.a=A.rX
b.b=A.rY
return b},
fs(a,b,c){var s,r,q=a.eC.get(c)
if(q!=null)return q
s=new A.bd(null,null)
s.w=b
s.as=c
r=A.c0(a,s)
a.eC.set(c,r)
return r},
nV(a,b,c){var s,r=b.as+"?",q=a.eC.get(r)
if(q!=null)return q
s=A.rq(a,b,r,c)
a.eC.set(r,s)
return s},
rq(a,b,c,d){var s,r,q
if(d){s=b.w
r=!0
if(!A.cO(b))if(!(b===t.a||b===t.v))if(s!==6)r=s===7&&A.dQ(b.x)
if(r)return b
else if(s===1)return t.a}q=new A.bd(null,null)
q.w=6
q.x=b
q.as=c
return A.c0(a,q)},
nU(a,b,c){var s,r=b.as+"/",q=a.eC.get(r)
if(q!=null)return q
s=A.ro(a,b,r,c)
a.eC.set(r,s)
return s},
ro(a,b,c,d){var s,r
if(d){s=b.w
if(A.cO(b)||b===t.K)return b
else if(s===1)return A.fr(a,"d5",[b])
else if(b===t.a||b===t.v)return t.gK}r=new A.bd(null,null)
r.w=7
r.x=b
r.as=c
return A.c0(a,r)},
rr(a,b){var s,r,q=""+b+"^",p=a.eC.get(q)
if(p!=null)return p
s=new A.bd(null,null)
s.w=13
s.x=b
s.as=q
r=A.c0(a,s)
a.eC.set(q,r)
return r},
fq(a){var s,r,q,p=a.length
for(s="",r="",q=0;q<p;++q,r=",")s+=r+a[q].as
return s},
rn(a){var s,r,q,p,o,n=a.length
for(s="",r="",q=0;q<n;q+=3,r=","){p=a[q]
o=a[q+1]?"!":":"
s+=r+p+o+a[q+2].as}return s},
fr(a,b,c){var s,r,q,p=b
if(c.length>0)p+="<"+A.fq(c)+">"
s=a.eC.get(p)
if(s!=null)return s
r=new A.bd(null,null)
r.w=8
r.x=b
r.y=c
if(c.length>0)r.c=c[0]
r.as=p
q=A.c0(a,r)
a.eC.set(p,q)
return q},
mi(a,b,c){var s,r,q,p,o,n
if(b.w===9){s=b.x
r=b.y.concat(c)}else{r=c
s=b}q=s.as+(";<"+A.fq(r)+">")
p=a.eC.get(q)
if(p!=null)return p
o=new A.bd(null,null)
o.w=9
o.x=s
o.y=r
o.as=q
n=A.c0(a,o)
a.eC.set(q,n)
return n},
nW(a,b,c){var s,r,q="+"+(b+"("+A.fq(c)+")"),p=a.eC.get(q)
if(p!=null)return p
s=new A.bd(null,null)
s.w=10
s.x=b
s.y=c
s.as=q
r=A.c0(a,s)
a.eC.set(q,r)
return r},
nT(a,b,c){var s,r,q,p,o,n=b.as,m=c.a,l=m.length,k=c.b,j=k.length,i=c.c,h=i.length,g="("+A.fq(m)
if(j>0){s=l>0?",":""
g+=s+"["+A.fq(k)+"]"}if(h>0){s=l>0?",":""
g+=s+"{"+A.rn(i)+"}"}r=n+(g+")")
q=a.eC.get(r)
if(q!=null)return q
p=new A.bd(null,null)
p.w=11
p.x=b
p.y=c
p.as=r
o=A.c0(a,p)
a.eC.set(r,o)
return o},
mj(a,b,c,d){var s,r=b.as+("<"+A.fq(c)+">"),q=a.eC.get(r)
if(q!=null)return q
s=A.rp(a,b,c,r,d)
a.eC.set(r,s)
return s},
rp(a,b,c,d,e){var s,r,q,p,o,n,m,l
if(e){s=c.length
r=A.kn(s)
for(q=0,p=0;p<s;++p){o=c[p]
if(o.w===1){r[p]=o;++q}}if(q>0){n=A.cI(a,b,r,0)
m=A.dN(a,c,r,0)
return A.mj(a,n,m,c!==m)}}l=new A.bd(null,null)
l.w=12
l.x=b
l.y=c
l.as=d
return A.c0(a,l)},
nP(a,b,c,d){return{u:a,e:b,r:c,s:[],p:0,n:d}},
nR(a){var s,r,q,p,o,n,m,l=a.r,k=a.s
for(s=l.length,r=0;r<s;){q=l.charCodeAt(r)
if(q>=48&&q<=57)r=A.rg(r+1,q,l,k)
else if((((q|32)>>>0)-97&65535)<26||q===95||q===36||q===124)r=A.nQ(a,r,l,k,!1)
else if(q===46)r=A.nQ(a,r,l,k,!0)
else{++r
switch(q){case 44:break
case 58:k.push(!1)
break
case 33:k.push(!0)
break
case 59:k.push(A.cG(a.u,a.e,k.pop()))
break
case 94:k.push(A.rr(a.u,k.pop()))
break
case 35:k.push(A.fs(a.u,5,"#"))
break
case 64:k.push(A.fs(a.u,2,"@"))
break
case 126:k.push(A.fs(a.u,3,"~"))
break
case 60:k.push(a.p)
a.p=k.length
break
case 62:A.ri(a,k)
break
case 38:A.rh(a,k)
break
case 63:p=a.u
k.push(A.nV(p,A.cG(p,a.e,k.pop()),a.n))
break
case 47:p=a.u
k.push(A.nU(p,A.cG(p,a.e,k.pop()),a.n))
break
case 40:k.push(-3)
k.push(a.p)
a.p=k.length
break
case 41:A.rf(a,k)
break
case 91:k.push(a.p)
a.p=k.length
break
case 93:o=k.splice(a.p)
A.nS(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-1)
break
case 123:k.push(a.p)
a.p=k.length
break
case 125:o=k.splice(a.p)
A.rk(a.u,a.e,o)
a.p=k.pop()
k.push(o)
k.push(-2)
break
case 43:n=l.indexOf("(",r)
k.push(l.substring(r,n))
k.push(-4)
k.push(a.p)
a.p=k.length
r=n+1
break
default:throw"Bad character "+q}}}m=k.pop()
return A.cG(a.u,a.e,m)},
rg(a,b,c,d){var s,r,q=b-48
for(s=c.length;a<s;++a){r=c.charCodeAt(a)
if(!(r>=48&&r<=57))break
q=q*10+(r-48)}d.push(q)
return a},
nQ(a,b,c,d,e){var s,r,q,p,o,n,m=b+1
for(s=c.length;m<s;++m){r=c.charCodeAt(m)
if(r===46){if(e)break
e=!0}else{if(!((((r|32)>>>0)-97&65535)<26||r===95||r===36||r===124))q=r>=48&&r<=57
else q=!0
if(!q)break}}p=c.substring(b,m)
if(e){s=a.u
o=a.e
if(o.w===9)o=o.x
n=A.rv(s,o.x)[p]
if(n==null)A.ad('No "'+p+'" in "'+A.qa(o)+'"')
d.push(A.ft(s,o,n))}else d.push(p)
return m},
ri(a,b){var s,r=a.u,q=A.nO(a,b),p=b.pop()
if(typeof p=="string")b.push(A.fr(r,p,q))
else{s=A.cG(r,a.e,p)
switch(s.w){case 11:b.push(A.mj(r,s,q,a.n))
break
default:b.push(A.mi(r,s,q))
break}}},
rf(a,b){var s,r,q,p=a.u,o=b.pop(),n=null,m=null
if(typeof o=="number")switch(o){case-1:n=b.pop()
break
case-2:m=b.pop()
break
default:b.push(o)
break}else b.push(o)
s=A.nO(a,b)
o=b.pop()
switch(o){case-3:o=b.pop()
if(n==null)n=p.sEA
if(m==null)m=p.sEA
r=A.cG(p,a.e,o)
q=new A.i3()
q.a=s
q.b=n
q.c=m
b.push(A.nT(p,r,q))
return
case-4:b.push(A.nW(p,b.pop(),s))
return
default:throw A.h(A.fC("Unexpected state under `()`: "+A.E(o)))}},
rh(a,b){var s=b.pop()
if(0===s){b.push(A.fs(a.u,1,"0&"))
return}if(1===s){b.push(A.fs(a.u,4,"1&"))
return}throw A.h(A.fC("Unexpected extended operation "+A.E(s)))},
nO(a,b){var s=b.splice(a.p)
A.nS(a.u,a.e,s)
a.p=b.pop()
return s},
cG(a,b,c){if(typeof c=="string")return A.fr(a,c,a.sEA)
else if(typeof c=="number"){b.toString
return A.rj(a,b,c)}else return c},
nS(a,b,c){var s,r=c.length
for(s=0;s<r;++s)c[s]=A.cG(a,b,c[s])},
rk(a,b,c){var s,r=c.length
for(s=2;s<r;s+=3)c[s]=A.cG(a,b,c[s])},
rj(a,b,c){var s,r,q=b.w
if(q===9){if(c===0)return b.x
s=b.y
r=s.length
if(c<=r)return s[c-1]
c-=r
b=b.x
q=b.w}else if(c===0)return b
if(q!==8)throw A.h(A.fC("Indexed base must be an interface type"))
s=b.y
if(c<=s.length)return s[c-1]
throw A.h(A.fC("Bad index "+c+" for "+b.B(0)))},
tZ(a,b,c){var s,r=b.d
if(r==null)r=b.d=new Map()
s=r.get(c)
if(s==null){s=A.ab(a,b,null,c,null)
r.set(c,s)}return s},
ab(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j,i
if(b===d)return!0
if(A.cO(d))return!0
s=b.w
if(s===4)return!0
if(A.cO(b))return!1
if(b.w===1)return!0
r=s===13
if(r)if(A.ab(a,c[b.x],c,d,e))return!0
q=d.w
p=t.a
if(b===p||b===t.v){if(q===7)return A.ab(a,b,c,d.x,e)
return d===p||d===t.v||q===6}if(d===t.K){if(s===7)return A.ab(a,b.x,c,d,e)
return s!==6}if(s===7){if(!A.ab(a,b.x,c,d,e))return!1
return A.ab(a,A.m7(a,b),c,d,e)}if(s===6)return A.ab(a,p,c,d,e)&&A.ab(a,b.x,c,d,e)
if(q===7){if(A.ab(a,b,c,d.x,e))return!0
return A.ab(a,b,c,A.m7(a,d),e)}if(q===6)return A.ab(a,b,c,p,e)||A.ab(a,b,c,d.x,e)
if(r)return!1
p=s!==11
if((!p||s===12)&&d===t.Z)return!0
o=s===10
if(o&&d===t.lZ)return!0
if(q===12){if(b===t.dY)return!0
if(s!==12)return!1
n=b.y
m=d.y
l=n.length
if(l!==m.length)return!1
c=c==null?n:n.concat(c)
e=e==null?m:m.concat(e)
for(k=0;k<l;++k){j=n[k]
i=m[k]
if(!A.ab(a,j,c,i,e)||!A.ab(a,i,e,j,c))return!1}return A.o8(a,b.x,c,d.x,e)}if(q===11){if(b===t.dY)return!0
if(p)return!1
return A.o8(a,b,c,d,e)}if(s===8){if(q!==8)return!1
return A.t4(a,b,c,d,e)}if(o&&q===10)return A.t9(a,b,c,d,e)
return!1},
o8(a3,a4,a5,a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2
if(!A.ab(a3,a4.x,a5,a6.x,a7))return!1
s=a4.y
r=a6.y
q=s.a
p=r.a
o=q.length
n=p.length
if(o>n)return!1
m=n-o
l=s.b
k=r.b
j=l.length
i=k.length
if(o+j<n+i)return!1
for(h=0;h<o;++h){g=q[h]
if(!A.ab(a3,p[h],a7,g,a5))return!1}for(h=0;h<m;++h){g=l[h]
if(!A.ab(a3,p[o+h],a7,g,a5))return!1}for(h=0;h<i;++h){g=l[m+h]
if(!A.ab(a3,k[h],a7,g,a5))return!1}f=s.c
e=r.c
d=f.length
c=e.length
for(b=0,a=0;a<c;a+=3){a0=e[a]
for(;;){if(b>=d)return!1
a1=f[b]
b+=3
if(a0<a1)return!1
a2=f[b-2]
if(a1<a0){if(a2)return!1
continue}g=e[a+1]
if(a2&&!g)return!1
g=f[b-1]
if(!A.ab(a3,e[a+2],a7,g,a5))return!1
break}}while(b<d){if(f[b+1])return!1
b+=3}return!0},
t4(a,b,c,d,e){var s,r,q,p,o,n=b.x,m=d.x
while(n!==m){s=a.tR[n]
if(s==null)return!1
if(typeof s=="string"){n=s
continue}r=s[m]
if(r==null)return!1
q=r.length
p=q>0?new Array(q):v.typeUniverse.sEA
for(o=0;o<q;++o)p[o]=A.ft(a,b,r[o])
return A.o_(a,p,null,c,d.y,e)}return A.o_(a,b.y,null,c,d.y,e)},
o_(a,b,c,d,e,f){var s,r=b.length
for(s=0;s<r;++s)if(!A.ab(a,b[s],d,e[s],f))return!1
return!0},
t9(a,b,c,d,e){var s,r=b.y,q=d.y,p=r.length
if(p!==q.length)return!1
if(b.x!==d.x)return!1
for(s=0;s<p;++s)if(!A.ab(a,r[s],c,q[s],e))return!1
return!0},
dQ(a){var s=a.w,r=!0
if(!(a===t.a||a===t.v))if(!A.cO(a))if(s!==6)r=s===7&&A.dQ(a.x)
return r},
cO(a){var s=a.w
return s===2||s===3||s===4||s===5||a===t.X},
nZ(a,b){var s,r,q=Object.keys(b),p=q.length
for(s=0;s<p;++s){r=q[s]
a[r]=b[r]}},
kn(a){return a>0?new Array(a):v.typeUniverse.sEA},
bd:function bd(a,b){var _=this
_.a=a
_.b=b
_.r=_.f=_.d=_.c=null
_.w=0
_.as=_.Q=_.z=_.y=_.x=null},
i3:function i3(){this.c=this.b=this.a=null},
ia:function ia(a){this.a=a},
i1:function i1(){},
fp:function fp(a){this.a=a},
r3(){var s,r,q
if(self.scheduleImmediate!=null)return A.tz()
if(self.MutationObserver!=null&&self.document!=null){s={}
r=self.document.createElement("div")
q=self.document.createElement("span")
s.a=null
new self.MutationObserver(A.dP(new A.jP(s),1)).observe(r,{childList:true})
return new A.jO(s,r,q)}else if(self.setImmediate!=null)return A.tA()
return A.tB()},
r4(a){self.scheduleImmediate(A.dP(new A.jQ(t.M.a(a)),0))},
r5(a){self.setImmediate(A.dP(new A.jR(t.M.a(a)),0))},
r6(a){t.M.a(a)
A.rm(0,a)},
rm(a,b){var s=new A.kg()
s.hp(a,b)
return s},
ly(a){var s
if(t.C.b(a)){s=a.gci()
if(s!=null)return s}return B.a4},
t_(a,b){if($.ac===B.A)return null
return null},
t0(a,b){if($.ac!==B.A)A.t_(a,b)
if(t.C.b(a)){b=a.gci()
if(b==null){A.q7(a,B.a4)
b=B.a4}}else b=B.a4
return new A.bm(a,b)},
me(a,b,c){var s,r,q,p,o={},n=o.a=a
for(s=t._;r=n.a,(r&4)!==0;n=a){a=s.a(n.c)
o.a=a}if(n===b){s=A.qd()
b.ei(new A.bm(new A.b3(!0,n,null,"Cannot complete a future with itself"),s))
return}q=b.a&1
s=n.a=r|q
if((s&24)===0){p=t.F.a(b.c)
b.a=b.a&1|4
b.c=n
n.eU(p)
return}if(!c)if(b.c==null)n=(s&16)===0||q!==0
else n=!1
else n=!0
if(n){p=b.d5()
b.cT(o.a)
A.dH(b,p)
return}b.a^=2
A.ie(null,null,b.b,t.M.a(new A.k2(o,b)))},
dH(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d={},c=d.a=a
for(s=t.u,r=t.F;;){q={}
p=c.a
o=(p&16)===0
n=!o
if(b==null){if(n&&(p&1)===0){m=s.a(c.c)
A.mw(m.a,m.b)}return}q.a=b
l=b.a
for(c=b;l!=null;c=l,l=k){c.a=null
A.dH(d.a,c)
q.a=l
k=l.a}p=d.a
j=p.c
q.b=n
q.c=j
if(o){i=c.c
i=(i&1)!==0||(i&15)===8}else i=!0
if(i){h=c.b.b
if(n){p=p.b===h
p=!(p||p)}else p=!1
if(p){s.a(j)
A.mw(j.a,j.b)
return}g=$.ac
if(g!==h)$.ac=h
else g=null
c=c.c
if((c&15)===8)new A.k6(q,d,n).$0()
else if(o){if((c&1)!==0)new A.k5(q,j).$0()}else if((c&2)!==0)new A.k4(d,q).$0()
if(g!=null)$.ac=g
c=q.c
if(c instanceof A.b_){p=q.a.$ti
p=p.l("d5<2>").b(c)||!p.y[1].b(c)}else p=!1
if(p){f=q.a.b
if((c.a&24)!==0){e=r.a(f.c)
f.c=null
b=f.d6(e)
f.a=c.a&30|f.a&1
f.c=c.c
d.a=c
continue}else A.me(c,f,!0)
return}}f=q.a.b
e=r.a(f.c)
f.c=null
b=f.d6(e)
c=q.b
p=q.c
if(!c){f.$ti.c.a(p)
f.a=8
f.c=p}else{s.a(p)
f.a=f.a&1|16
f.c=p}d.a=f
c=f}},
tj(a,b){var s=t.Q
if(s.b(a))return s.a(a)
s=t.E
if(s.b(a))return s.a(a)
throw A.h(A.iq(a,"onError",u.c))},
tg(){var s,r
for(s=$.dM;s!=null;s=$.dM){$.fw=null
r=s.b
$.dM=r
if(r==null)$.fv=null
s.a.$0()}},
tt(){$.mt=!0
try{A.tg()}finally{$.fw=null
$.mt=!1
if($.dM!=null)$.mG().$1(A.ol())}},
oi(a){var s=new A.i_(a),r=$.fv
if(r==null){$.dM=$.fv=s
if(!$.mt)$.mG().$1(A.ol())}else $.fv=r.b=s},
tp(a){var s,r,q,p=$.dM
if(p==null){A.oi(a)
$.fw=$.fv
return}s=new A.i_(a)
r=$.fw
if(r==null){s.b=p
$.dM=$.fw=s}else{q=r.b
s.b=q
$.fw=r.b=s
if(q==null)$.fv=s}},
mw(a,b){A.tp(new A.kY(a,b))},
of(a,b,c,d,e){var s,r=$.ac
if(r===c)return d.$0()
$.ac=c
s=r
try{r=d.$0()
return r}finally{$.ac=s}},
tl(a,b,c,d,e,f,g){var s,r=$.ac
if(r===c)return d.$1(e)
$.ac=c
s=r
try{r=d.$1(e)
return r}finally{$.ac=s}},
tk(a,b,c,d,e,f,g,h,i){var s,r=$.ac
if(r===c)return d.$2(e,f)
$.ac=c
s=r
try{r=d.$2(e,f)
return r}finally{$.ac=s}},
ie(a,b,c,d){t.M.a(d)
if(B.A!==c){d=c.jv(d)
d=d}A.oi(d)},
jP:function jP(a){this.a=a},
jO:function jO(a,b,c){this.a=a
this.b=b
this.c=c},
jQ:function jQ(a){this.a=a},
jR:function jR(a){this.a=a},
kg:function kg(){},
kh:function kh(a,b){this.a=a
this.b=b},
bm:function bm(a,b){this.a=a
this.b=b},
i0:function i0(){},
f6:function f6(a,b){this.a=a
this.$ti=b},
f8:function f8(a,b,c,d,e){var _=this
_.a=null
_.b=a
_.c=b
_.d=c
_.e=d
_.$ti=e},
b_:function b_(a,b){var _=this
_.a=0
_.b=a
_.c=null
_.$ti=b},
k_:function k_(a,b){this.a=a
this.b=b},
k3:function k3(a,b){this.a=a
this.b=b},
k2:function k2(a,b){this.a=a
this.b=b},
k1:function k1(a,b){this.a=a
this.b=b},
k0:function k0(a,b){this.a=a
this.b=b},
k6:function k6(a,b,c){this.a=a
this.b=b
this.c=c},
k7:function k7(a,b){this.a=a
this.b=b},
k8:function k8(a){this.a=a},
k5:function k5(a,b){this.a=a
this.b=b},
k4:function k4(a,b){this.a=a
this.b=b},
i_:function i_(a){this.a=a
this.b=null},
fu:function fu(){},
i7:function i7(){},
kf:function kf(a,b){this.a=a
this.b=b},
kY:function kY(a,b){this.a=a
this.b=b},
nN(a,b){var s=a[b]
return s===a?null:s},
mg(a,b,c){if(c==null)a[b]=a
else a[b]=c},
mf(){var s=Object.create(null)
A.mg(s,"<non-identifier-key>",s)
delete s["<non-identifier-key>"]
return s},
nk(a,b){return new A.b9(a.l("@<0>").aG(b).l("b9<1,2>"))},
aL(a,b,c){return b.l("@<0>").aG(c).l("lM<1,2>").a(A.oq(a,new A.b9(b.l("@<0>").aG(c).l("b9<1,2>"))))},
H(a,b){return new A.b9(a.l("@<0>").aG(b).l("b9<1,2>"))},
nl(a){return new A.ff(a.l("ff<0>"))},
mh(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
hs(a,b,c){var s=A.nk(b,c)
a.aN(0,new A.j0(s,b,c))
return s},
ck(a,b,c){var s=A.nk(b,c)
s.c2(0,a)
return s},
lO(a){var s,r
if(A.mA(a))return"{...}"
s=new A.cB("")
try{r={}
B.c.I($.aS,a)
s.a+="{"
r.a=!0
a.aN(0,new A.j2(r,s))
s.a+="}"}finally{if(0>=$.aS.length)return A.a($.aS,-1)
$.aS.pop()}r=s.a
return r.charCodeAt(0)==0?r:r},
f9:function f9(){},
fc:function fc(a){var _=this
_.a=0
_.e=_.d=_.c=_.b=null
_.$ti=a},
fa:function fa(a,b){this.a=a
this.$ti=b},
fb:function fb(a,b,c){var _=this
_.a=a
_.b=b
_.c=0
_.d=null
_.$ti=c},
ff:function ff(a){var _=this
_.a=0
_.f=_.e=_.d=_.c=_.b=null
_.r=0
_.$ti=a},
i6:function i6(a){this.a=a
this.b=null},
fg:function fg(a,b,c){var _=this
_.a=a
_.b=b
_.d=_.c=null
_.$ti=c},
j0:function j0(a,b,c){this.a=a
this.b=b
this.c=c},
I:function I(){},
Q:function Q(){},
j2:function j2(a,b){this.a=a
this.b=b},
dx:function dx(){},
fn:function fn(){},
th(a,b){var s,r,q,p=null
try{p=JSON.parse(a)}catch(r){s=A.bK(r)
q=A.b7(String(s),null,null)
throw A.h(q)}q=A.kr(p)
return q},
kr(a){var s
if(a==null)return null
if(typeof a!="object")return a
if(!Array.isArray(a))return new A.i4(a,Object.create(null))
for(s=0;s<a.length;++s)a[s]=A.kr(a[s])
return a},
rx(a,b,c){var s,r,q,p,o=c-b
if(o<=4096)s=$.oQ()
else s=new Uint8Array(o)
for(r=0;r<o;++r){q=b+r
if(!(q<a.length))return A.a(a,q)
p=a[q]
if((p&255)!==p)p=255
s[r]=p}return s},
rw(a,b,c,d){var s=a?$.oP():$.oO()
if(s==null)return null
if(0===c&&d===b.length)return A.nY(s,b)
return A.nY(s,b.subarray(c,d))},
nY(a,b){var s,r
try{s=a.decode(b)
return s}catch(r){}return null},
ra(a,b,c,d,e,f,g,a0){var s,r,q,p,o,n,m,l,k,j,i=a0>>>2,h=3-(a0&3)
for(s=b.length,r=a.length,q=f.$flags|0,p=c,o=0;p<d;++p){if(!(p<s))return A.a(b,p)
n=b[p]
o|=n
i=(i<<8|n)&16777215;--h
if(h===0){m=g+1
l=i>>>18&63
if(!(l<r))return A.a(a,l)
q&2&&A.b(f)
k=f.length
if(!(g<k))return A.a(f,g)
f[g]=a.charCodeAt(l)
g=m+1
l=i>>>12&63
if(!(l<r))return A.a(a,l)
if(!(m<k))return A.a(f,m)
f[m]=a.charCodeAt(l)
m=g+1
l=i>>>6&63
if(!(l<r))return A.a(a,l)
if(!(g<k))return A.a(f,g)
f[g]=a.charCodeAt(l)
g=m+1
l=i&63
if(!(l<r))return A.a(a,l)
if(!(m<k))return A.a(f,m)
f[m]=a.charCodeAt(l)
i=0
h=3}}if(o>=0&&o<=255){if(h<3){m=g+1
j=m+1
if(3-h===1){s=i>>>2&63
if(!(s<r))return A.a(a,s)
q&2&&A.b(f)
q=f.length
if(!(g<q))return A.a(f,g)
f[g]=a.charCodeAt(s)
s=i<<4&63
if(!(s<r))return A.a(a,s)
if(!(m<q))return A.a(f,m)
f[m]=a.charCodeAt(s)
g=j+1
if(!(j<q))return A.a(f,j)
f[j]=61
if(!(g<q))return A.a(f,g)
f[g]=61}else{s=i>>>10&63
if(!(s<r))return A.a(a,s)
q&2&&A.b(f)
q=f.length
if(!(g<q))return A.a(f,g)
f[g]=a.charCodeAt(s)
s=i>>>4&63
if(!(s<r))return A.a(a,s)
if(!(m<q))return A.a(f,m)
f[m]=a.charCodeAt(s)
g=j+1
s=i<<2&63
if(!(s<r))return A.a(a,s)
if(!(j<q))return A.a(f,j)
f[j]=a.charCodeAt(s)
if(!(g<q))return A.a(f,g)
f[g]=61}return 0}return(i<<2|3-h)>>>0}for(p=c;p<d;){if(!(p<s))return A.a(b,p)
n=b[p]
if(n>255)break;++p}if(!(p<s))return A.a(b,p)
throw A.h(A.iq(b,"Not a byte value at index "+p+": 0x"+B.a.cH(b[p],16),null))},
r9(a,b,c,d,a0,a1){var s,r,q,p,o,n,m,l,k,j,i="Invalid encoding before padding",h="Invalid character",g=B.a.j(a1,2),f=a1&3,e=$.oN()
for(s=a.length,r=e.length,q=d.$flags|0,p=b,o=0;p<c;++p){if(!(p<s))return A.a(a,p)
n=a.charCodeAt(p)
o|=n
m=n&127
if(!(m<r))return A.a(e,m)
l=e[m]
if(l>=0){g=(g<<6|l)&16777215
f=f+1&3
if(f===0){k=a0+1
q&2&&A.b(d)
m=d.length
if(!(a0<m))return A.a(d,a0)
d[a0]=g>>>16&255
a0=k+1
if(!(k<m))return A.a(d,k)
d[k]=g>>>8&255
k=a0+1
if(!(a0<m))return A.a(d,a0)
d[a0]=g&255
a0=k
g=0}continue}else if(l===-1&&f>1){if(o>127)break
if(f===3){if((g&3)!==0)throw A.h(A.b7(i,a,p))
k=a0+1
q&2&&A.b(d)
s=d.length
if(!(a0<s))return A.a(d,a0)
d[a0]=g>>>10
if(!(k<s))return A.a(d,k)
d[k]=g>>>2}else{if((g&15)!==0)throw A.h(A.b7(i,a,p))
q&2&&A.b(d)
if(!(a0<d.length))return A.a(d,a0)
d[a0]=g>>>4}j=(3-f)*3
if(n===37)j+=2
return A.nL(a,p+1,c,-j-1)}throw A.h(A.b7(h,a,p))}if(o>=0&&o<=127)return(g<<2|f)>>>0
for(p=b;p<c;++p){if(!(p<s))return A.a(a,p)
if(a.charCodeAt(p)>127)break}throw A.h(A.b7(h,a,p))},
r7(a,b,c,d){var s=A.r8(a,b,c),r=(d&3)+(s-b),q=B.a.j(r,2)*3,p=r&3
if(p!==0&&s<c)q+=p-1
if(q>0)return new Uint8Array(q)
return $.oM()},
r8(a,b,c){var s,r=a.length,q=c,p=q,o=0
for(;;){if(!(p>b&&o<2))break
A:{--p
if(!(p>=0&&p<r))return A.a(a,p)
s=a.charCodeAt(p)
if(s===61){++o
q=p
break A}if((s|32)===100){if(p===b)break;--p
if(!(p>=0&&p<r))return A.a(a,p)
s=a.charCodeAt(p)}if(s===51){if(p===b)break;--p
if(!(p>=0&&p<r))return A.a(a,p)
s=a.charCodeAt(p)}if(s===37){++o
q=p
break A}break}}return q},
nL(a,b,c,d){var s,r,q
if(b===c)return d
s=-d-1
for(r=a.length;s>0;){if(!(b<r))return A.a(a,b)
q=a.charCodeAt(b)
if(s===3){if(q===61){s-=3;++b
break}if(q===37){--s;++b
if(b===c)break
if(!(b<r))return A.a(a,b)
q=a.charCodeAt(b)}else break}if((s>3?s-3:s)===2){if(q!==51)break;++b;--s
if(b===c)break
if(!(b<r))return A.a(a,b)
q=a.charCodeAt(b)}if((q|32)!==100)break;++b;--s
if(b===c)break}if(b!==c)throw A.h(A.b7("Invalid padding character",a,b))
return-s-1},
ni(a,b,c){return new A.eo(a,b)},
rK(a){return a.ba()},
rd(a,b){return new A.ka(a,[],A.tE())},
re(a,b,c){var s,r=new A.cB(""),q=A.rd(r,b)
q.di(a)
s=r.a
return s.charCodeAt(0)==0?s:s},
ry(a){switch(a){case 65:return"Missing extension byte"
case 67:return"Unexpected extension byte"
case 69:return"Invalid UTF-8 byte"
case 71:return"Overlong encoding"
case 73:return"Out of unicode range"
case 75:return"Encoded surrogate"
case 77:return"Unfinished UTF-8 octet sequence"
default:return""}},
i4:function i4(a,b){this.a=a
this.b=b
this.c=null},
i5:function i5(a){this.a=a},
km:function km(){},
kl:function kl(){},
ki:function ki(){},
dS:function dS(){},
is:function is(){},
jT:function jT(a){this.a=0
this.b=a},
ir:function ir(){},
jS:function jS(){this.a=0},
ap:function ap(){},
fL:function fL(){},
fN:function fN(){},
eo:function eo(a,b){this.a=a
this.b=b},
hq:function hq(a,b){this.a=a
this.b=b},
hp:function hp(){},
iY:function iY(a){this.b=a},
iX:function iX(a){this.a=a},
kb:function kb(){},
kc:function kc(a,b){this.a=a
this.b=b},
ka:function ka(a,b,c){this.c=a
this.a=b
this.b=c},
hr:function hr(){},
iZ:function iZ(a){this.a=a},
hV:function hV(){},
hW:function hW(a){this.a=a},
ib:function ib(a){this.a=a
this.b=16
this.c=0},
tX(a){var s=A.q4(a,null)
if(s!=null)return s
throw A.h(A.b7(a,null,null))},
aU(a){var s=A.q3(a)
if(s!=null)return s
throw A.h(A.b7("Invalid double",a,null))},
pf(a,b){a=A.a8(a,new Error())
if(a==null)a=A.id(a)
a.stack=b.B(0)
throw a},
K(a,b,c,d){var s,r=c?J.hg(a,d):J.nf(a,d)
if(a!==0&&b!=null)for(s=0;s<r.length;++s)r[s]=b
return r},
lN(a,b,c){var s,r,q=A.k([],c.l("r<0>"))
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.V)(a),++r)B.c.I(q,c.a(a[r]))
if(b)return q
q.$flags=1
return q},
u(a,b){var s,r
if(Array.isArray(a))return A.k(a.slice(0),b.l("r<0>"))
s=A.k([],b.l("r<0>"))
for(r=J.dR(a);r.D();)B.c.I(s,r.gL())
return s},
nm(a,b,c){var s,r=J.hg(a,c)
for(s=0;s<a;++s)B.c.h(r,s,b.$1(s))
return r},
nn(a,b){var s=A.lN(a,!1,b)
s.$flags=3
return s},
dA(a,b,c){var s,r,q,p,o
A.bB(b,"start")
s=c==null
r=!s
if(r){q=c-b
if(q<0)throw A.h(A.ah(c,b,null,"end",null))
if(q===0)return""}if(Array.isArray(a)){p=a
o=p.length
if(s)c=o
return A.nw(b>0||c<o?p.slice(b,c):p)}if(t.hD.b(a))return A.qf(a,b,c)
if(r)a=J.p1(a,c)
if(b>0)a=J.lw(a,b)
s=A.u(a,t.p)
return A.nw(s)},
qf(a,b,c){var s=a.length
if(b>=s)return""
return A.q6(a,b,c==null||c>s?s:c)},
nC(a,b,c){var s=J.dR(b)
if(!s.D())return a
if(c.length===0){do a+=A.E(s.gL())
while(s.D())}else{a+=A.E(s.gL())
while(s.D())a=a+c+A.E(s.gL())}return a},
qd(){return A.fy(new Error())},
pe(a){var s=Math.abs(a),r=a<0?"-":""
if(s>=1000)return""+a
if(s>=100)return r+"0"+s
if(s>=10)return r+"00"+s
return r+"000"+s},
mW(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
fM(a){if(a>=10)return""+a
return"0"+a},
fO(a){if(typeof a=="number"||A.ms(a)||a==null)return J.fz(a)
if(typeof a=="string")return JSON.stringify(a)
return A.nv(a)},
pg(a,b){A.cJ(a,"error",t.K)
A.cJ(b,"stackTrace",t.m)
A.pf(a,b)},
fC(a){return new A.fB(a)},
bs(a,b){return new A.b3(!1,null,b,a)},
iq(a,b,c){return new A.b3(!0,a,b,c)},
q9(a){var s=null
return new A.bA(s,s,!1,s,s,a)},
ny(a,b){return new A.bA(null,null,!0,a,b,"Value not in range")},
ah(a,b,c,d,e){return new A.bA(b,c,!0,a,d,"Invalid value")},
bo(a,b,c){if(0>a||a>c)throw A.h(A.ah(a,0,c,"start",null))
if(b!=null){if(a>b||b>c)throw A.h(A.ah(b,a,c,"end",null))
return b}return c},
bB(a,b){if(a<0)throw A.h(A.ah(a,0,null,b,null))
return a},
lF(a,b,c,d){return new A.h1(b,!0,a,d,"Index out of range")},
bg(a){return new A.eY(a)},
nG(a){return new A.hT(a)},
m8(a){return new A.dz(a)},
aq(a){return new A.fJ(a)},
b7(a,b,c){return new A.aw(a,b,c)},
pA(a,b,c){var s,r
if(A.mA(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}s=A.k([],t.s)
B.c.I($.aS,a)
try{A.td(a,s)}finally{if(0>=$.aS.length)return A.a($.aS,-1)
$.aS.pop()}r=A.nC(b,t.e7.a(s),", ")+c
return r.charCodeAt(0)==0?r:r},
lI(a,b,c){var s,r
if(A.mA(a))return b+"..."+c
s=new A.cB(b)
B.c.I($.aS,a)
try{r=s
r.a=A.nC(r.a,a,", ")}finally{if(0>=$.aS.length)return A.a($.aS,-1)
$.aS.pop()}s.a+=c
r=s.a
return r.charCodeAt(0)==0?r:r},
td(a,b){var s,r,q,p,o,n,m,l=a.gF(a),k=0,j=0
for(;;){if(!(k<80||j<3))break
if(!l.D())return
s=A.E(l.gL())
B.c.I(b,s)
k+=s.length+2;++j}if(!l.D()){if(j<=5)return
if(0>=b.length)return A.a(b,-1)
r=b.pop()
if(0>=b.length)return A.a(b,-1)
q=b.pop()}else{p=l.gL();++j
if(!l.D()){if(j<=4){B.c.I(b,A.E(p))
return}r=A.E(p)
if(0>=b.length)return A.a(b,-1)
q=b.pop()
k+=r.length+2}else{o=l.gL();++j
for(;l.D();p=o,o=n){n=l.gL();++j
if(j>100){for(;;){if(!(k>75&&j>3))break
if(0>=b.length)return A.a(b,-1)
k-=b.pop().length+2;--j}B.c.I(b,"...")
return}}q=A.E(p)
r=A.E(o)
k+=r.length+q.length+4}}if(j>b.length+2){k+=5
m="..."}else m=null
for(;;){if(!(k>80&&b.length>3))break
if(0>=b.length)return A.a(b,-1)
k-=b.pop().length+2
if(m==null){k+=5
m="..."}}if(m!=null)B.c.I(b,m)
B.c.I(b,q)
B.c.I(b,r)},
np(a,b,c,d,e){return new A.c5(a,b.l("@<0>").aG(c).aG(d).aG(e).l("c5<1,2,3,4>"))},
hu(a,b,c,d){var s
if(B.z===c){s=B.a.gH(a)
b=J.bk(b)
return A.jq(A.bC(A.bC($.io(),s),b))}if(B.z===d){s=B.a.gH(a)
b=J.bk(b)
c=J.bk(c)
return A.jq(A.bC(A.bC(A.bC($.io(),s),b),c))}s=B.a.gH(a)
b=J.bk(b)
c=J.bk(c)
d=J.bk(d)
d=A.jq(A.bC(A.bC(A.bC(A.bC($.io(),s),b),c),d))
return d},
n(a){var s,r,q=$.io()
for(s=a.length,r=0;r<a.length;a.length===s||(0,A.V)(a),++r)q=A.bC(q,J.bk(a[r]))
return A.jq(q)},
c7:function c7(a,b,c){this.a=a
this.b=b
this.c=c},
jW:function jW(){},
S:function S(){},
fB:function fB(a){this.a=a},
bD:function bD(){},
b3:function b3(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bA:function bA(a,b,c,d,e,f){var _=this
_.e=a
_.f=b
_.a=c
_.b=d
_.c=e
_.d=f},
h1:function h1(a,b,c,d,e){var _=this
_.f=a
_.a=b
_.b=c
_.c=d
_.d=e},
eY:function eY(a){this.a=a},
hT:function hT(a){this.a=a},
dz:function dz(a){this.a=a},
fJ:function fJ(a){this.a=a},
hv:function hv(){},
eW:function eW(){},
jX:function jX(a){this.a=a},
aw:function aw(a,b,c){this.a=a
this.b=b
this.c=c},
e:function e(){},
ay:function ay(){},
C:function C(){},
i9:function i9(){},
jp:function jp(){this.b=this.a=0},
cB:function cB(a){this.a=a},
j3:function j3(a){this.a=a},
rG(a,b,c){t.Z.a(a)
if(A.w(c)>=1)return a.$1(b)
return a.$0()},
u4(a,b){var s=new A.b_($.ac,b.l("b_<0>")),r=new A.f6(s,b.l("f6<0>"))
a.then(A.dP(new A.li(r,b),1),A.dP(new A.lj(r),1))
return s},
od(a){return a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string"||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Uint8ClampedArray||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof ArrayBuffer||a instanceof DataView},
op(a){if(A.od(a))return a
return new A.l1(new A.fc(t.mp)).$1(a)},
li:function li(a,b){this.a=a
this.b=b},
lj:function lj(a){this.a=a},
l1:function l1(a){this.a=a},
lD(a,b){var s=new A.iF()
s.h7(a,b)
return s},
iF:function iF(){this.a=$
this.b=0
this.c=2147483647},
jN:function jN(){},
ko:function ko(){},
kp:function kp(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iN:function iN(a,b,c){var _=this
_.a=a
_.b=null
_.c=b
_.d=null
_.e=c
_.f=!1
_.w=_.r=0},
jM:function jM(){},
mO(a){return new A.cQ(a,null,null)},
cQ:function cQ(a,b,c){this.a=a
this.b=b
this.c=c},
fA:function fA(){},
ip:function ip(){},
dT:function dT(a,b){this.a=a
this.b=b},
tS(a,b,c,d){var s,r,q,p=!1,o=new A.jV($.mk)
$.mk=o
try{if(d.$0())return!0
if(p){r=A.mO("Invalid "+a+" data")
throw A.h(r)}return!1}catch(q){s=A.bK(q)
r=s
if(!(r instanceof A.cQ||r instanceof A.fA||r instanceof A.aw||t.b0.b(r)||t.do.b(r)))throw q
r=s instanceof A.ip
if(r)throw q
if(s instanceof A.fA)return!1
if(s instanceof A.cQ){if(p)throw q
return!1}if(p){r=A.mO("Invalid "+a+" data: "+A.E(s))
throw A.h(r)}return!1}finally{$.mk=o.a}},
jV:function jV(a){this.a=a},
lG(a,b,c,d){var s,r,q,p,o=new A.h2(b)
if(d==null)d=0
A.bB(d,"offset")
if(d<0)d=0
else{s=a.length
if(d>s)d=s}r=a.length-d
if(c==null)c=r
if(c<0||c>r)c=r
q=t.D.b(a)?a:new Uint8Array(A.z(a))
p=J.a4(B.f.gA(q),q.byteOffset+d,c)
o.b=p
o.d=p.length
return o},
h2:function h2(a){var _=this
_.b=null
_.c=0
_.d=$
_.a=a},
h3:function h3(){},
lP(a){var s=a==null?32768:a
return new A.dp(new Uint8Array(s),B.ar)},
dp:function dp(a,b){this.b=0
this.c=a
this.a=b},
hw:function hw(){},
iw:function iw(a,b){this.a=a
this.b=b},
R:function R(a){this.a=-1
this.b=a},
c6:function c6(a,b){this.a=a
this.b=b},
cS:function cS(a){this.a=a},
cT:function cT(a){this.a=a},
cU:function cU(a){this.a=a},
cV:function cV(a){this.a=a},
cW:function cW(a){this.a=a},
cX:function cX(a){this.a=a},
cZ:function cZ(a,b){this.a=a
this.b=b},
d_:function d_(a){this.a=a},
d0:function d0(a,b){this.a=a
this.b=b},
d1:function d1(a){this.a=a},
d2:function d2(a,b){this.a=a
this.b=b},
pc(a,b,c,d){var s=new A.cY(new Uint8Array(4))
s.h3(a,b,c,d)
return s},
bM:function bM(a){this.a=a},
fH:function fH(a){this.a=a},
cY:function cY(a){this.a=a},
dV:function dV(a){this.a=a},
fK:function fK(a){this.a=a},
ih(a,b,c){var s
if(b===c)return a
switch(b.a){case 0:if(a===0)s=0
else{s=B.bZ.m(0,c)
s.toString}return s
case 1:switch(c.a){case 0:return a===0?0:1
case 1:return a
case 2:return a*5
case 3:return a*75
case 4:return a*21845
case 5:return a*1431655765
case 6:return a*42
case 7:return a*10922
case 8:return a*715827882
case 9:case 10:case 11:return a/3}break
case 2:switch(c.a){case 0:return a===0?0:1
case 1:return B.a.j(A.w(a),1)
case 2:return a
case 3:return a*17
case 4:return a*4369
case 5:return a*286331153
case 6:return a*8
case 7:return a*2184
case 8:return a*143165576
case 9:case 10:case 11:return a/3}break
case 3:switch(c.a){case 0:return a===0?0:1
case 1:return B.a.j(A.w(a),6)
case 2:return B.a.j(A.w(a),4)
case 3:return a
case 4:return a*257
case 5:return a*16843009
case 6:return B.a.j(A.w(a),1)
case 7:return a*128
case 8:return a*8421504
case 9:case 10:case 11:return a/255}break
case 4:switch(c.a){case 0:return a===0?0:1
case 1:return B.a.j(A.w(a),14)
case 2:return B.a.j(A.w(a),12)
case 3:return B.a.j(A.w(a),8)
case 4:return a
case 5:return A.w(a)<<8>>>0
case 6:return B.a.j(A.w(a),9)
case 7:return B.a.j(A.w(a),1)
case 8:return a*524296
case 9:case 10:case 11:return a/65535}break
case 5:switch(c.a){case 0:return a===0?0:1
case 1:return B.a.j(A.w(a),30)
case 2:return B.a.j(A.w(a),28)
case 3:return B.a.j(A.w(a),24)
case 4:return B.a.j(A.w(a),16)
case 5:return a
case 6:return B.a.j(A.w(a),25)
case 7:return B.a.j(A.w(a),17)
case 8:return B.a.j(A.w(a),1)
case 9:case 10:case 11:return a/4294967295}break
case 6:switch(c.a){case 0:return a===0?0:1
case 1:return a<=0?0:B.a.j(A.w(a),5)
case 2:return a<=0?0:B.a.j(A.w(a),3)
case 3:return a<=0?0:A.w(a)<<1>>>0
case 4:return a<=0?0:A.w(a)*516
case 5:return a<=0?0:A.w(a)*33818640
case 6:return a
case 7:return a*258
case 8:return a*16909320
case 9:case 10:case 11:return a/127}break
case 7:switch(c.a){case 0:return a===0?0:1
case 1:return a<=0?0:B.a.j(A.w(a),15)
case 2:return a<=0?0:B.a.j(A.w(a),11)
case 3:return a<=0?0:B.a.j(A.w(a),7)
case 4:return a<=0?0:A.w(a)<<1>>>0
case 5:return a<=0?0:A.w(a)*131076
case 6:return B.a.j(A.w(a),8)
case 7:return a
case 8:return A.w(a)*65538
case 9:case 10:case 11:return a/32767}break
case 8:switch(c.a){case 0:return a===0?0:1
case 1:return a<=0?0:B.a.j(A.w(a),29)
case 2:return a<=0?0:B.a.j(A.w(a),27)
case 3:return a<=0?0:B.a.j(A.w(a),23)
case 4:return a<=0?0:B.a.j(A.w(a),16)
case 5:return a<=0?0:A.w(a)<<1>>>0
case 6:return B.a.j(A.w(a),24)
case 7:return B.a.j(A.w(a),16)
case 8:return a
case 9:case 10:case 11:return a/2147483647}break
case 9:case 10:case 11:switch(c.a){case 0:return a===0?0:1
case 1:return B.b.i(B.b.K(a,0,1)*3)
case 2:return B.b.i(B.b.K(a,0,1)*15)
case 3:return B.b.i(B.b.K(a,0,1)*255)
case 4:return B.b.i(B.b.K(a,0,1)*65535)
case 5:return B.b.i(B.b.K(a,0,1)*4294967295)
case 6:return B.b.i(a<0?B.b.K(a,-1,1)*128:B.b.K(a,-1,1)*127)
case 7:return B.b.i(a<0?B.b.K(a,-1,1)*32768:B.b.K(a,-1,1)*32767)
case 8:return B.b.i(a<0?B.b.K(a,-1,1)*2147483648:B.b.K(a,-1,1)*2147483647)
case 9:case 10:case 11:return a}break}},
av:function av(a,b){this.a=a
this.b=b},
fD:function fD(a,b){this.a=a
this.b=b},
dZ(a){var s,r=new A.c8(A.H(t.N,t.P))
r.h8(a)
s=a.b
if(s!=null)r.b=new Uint8Array(A.z(s))
return r},
iA(a){var s=new A.c8(A.H(t.N,t.P))
s.c6(a)
return s},
c8:function c8(a){this.b=null
this.a=a},
i2:function i2(a,b){this.a=a
this.b=b},
i(a,b,c){return new A.fP(a,b)},
fP:function fP(a,b){this.a=a
this.b=b},
aV:function aV(a){this.a=a},
iH:function iH(a){this.a=a},
n2(a){var s=new A.aJ(A.H(t.p,t.r),new A.aV(A.H(t.N,t.P)))
s.jz(a)
return s},
aJ:function aJ(a,b){this.a=a
this.b=b},
iI:function iI(a){this.a=a},
iJ:function iJ(a){this.a=a},
n9(a,b){var s=new A.ci(new Uint16Array(b))
s.hd(a,b)
return s},
lE(a){var s=new Uint32Array(1)
s[0]=a
return new A.b8(s)},
n4(a,b){var s=new A.b8(new Uint32Array(b))
s.ha(a,b)
return s},
n5(a,b){var s,r=J.bQ(b,t.k)
for(s=0;s<b;++s)r[s]=new A.dw(a.k(),a.k())
return new A.ce(r)},
n8(a,b){var s=new A.ch(new Int16Array(b))
s.hc(a,b)
return s},
n6(a,b){var s=new A.cf(new Int32Array(b))
s.hb(a,b)
return s},
n7(a,b){var s,r,q,p,o=J.bQ(b,t.k)
for(s=0;s<b;++s){r=a.k()
q=$.O()
q.$flags&2&&A.b(q)
q[0]=r
r=$.a9()
if(0>=r.length)return A.a(r,0)
p=r[0]
q[0]=a.k()
o[s]=new A.dw(p,r[0])}return new A.cg(o)},
na(a,b){var s=new A.da(new Float32Array(b))
s.he(a,b)
return s},
n3(a,b){var s=new A.d8(new Float64Array(b))
s.h9(a,b)
return s},
ak:function ak(a,b){this.a=a
this.b=b},
a7:function a7(){},
bv:function bv(a){this.a=a},
cd:function cd(a){this.a=a},
ci:function ci(a){this.a=a},
b8:function b8(a){this.a=a},
ce:function ce(a){this.a=a},
bO:function bO(a){this.a=a},
ch:function ch(a){this.a=a},
cf:function cf(a){this.a=a},
cg:function cg(a){this.a=a},
da:function da(a){this.a=a},
d8:function d8(a){this.a=a},
db:function db(a){this.a=a},
d9:function d9(a){this.a=a},
mP(a){var s,r,q=new A.iu()
if(!A.mQ(a))A.ad(A.o("Not a bitmap file."))
a.d+=2
s=a.k()
r=$.O()
r.$flags&2&&A.b(r)
r[0]=s
s=$.a9()
if(0>=s.length)return A.a(s,0)
a.d+=4
r[0]=a.k()
q.b=s[0]
return q},
mQ(a){if(a.c-a.d<2)return!1
return A.p(a,null,0).p()===19778},
p2(a,b){var s,r,q,p,o=b==null?A.mP(a):b,n=a.d,m=a.k(),l=a.k(),k=$.O()
k.$flags&2&&A.b(k)
k[0]=l
l=$.a9()
if(0>=l.length)return A.a(l,0)
s=l[0]
k[0]=a.k()
l=l[0]
r=a.p()
q=a.p()
p=a.k()
if(p>=14)A.ad(A.o("Unsupported BMP compression type: "+p))
if(!(p<14))return A.a(B.ah,p)
p=B.ah[p]
a.k()
k[0]=a.k()
k[0]=a.k()
k=a.k()
a.k()
n=new A.bt(o,s,l,m,r,q,p,k,n)
n.ea(a,b)
return n},
aj:function aj(a,b){this.a=a
this.b=b},
iu:function iu(){this.b=$},
bt:function bt(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=h
_.ay=_.ax=_.at=_.as=$
_.ch=null
_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=$
_.fy=i},
fE:function fE(a){this.a=$
this.b=null
this.c=a},
it:function it(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
iy:function iy(a){this.a=$
this.b=null
this.c=a},
L:function L(){},
ix:function ix(){},
iz:function iz(){},
fQ:function fQ(){},
eg:function eg(a,b,c,d){var _=this
_.r=a
_.w=b
_.x=c
_.b=_.a=0
_.c=d},
d4:function d4(a,b){this.a=a
this.b=b},
c9:function c9(a,b){this.a=a
this.b=b},
fR:function fR(){var _=this
_.w=_.r=_.f=_.d=_.c=_.b=_.a=$},
mX(a,b,c,d){var s,r
switch(a.a){case 1:return new A.h9(c,b)
case 2:return new A.eh(c,d==null?1:d,b)
case 3:return new A.eh(c,d==null?16:d,b)
case 4:s=d==null?32:d
r=new A.h7(c,s,b)
r.hh(b,c,s)
return r
case 5:return new A.h8(c,d==null?16:d,b)
case 6:return new A.eg(c,d==null?32:d,!1,b)
case 7:return new A.eg(c,d==null?32:d,!0,b)
default:throw A.h(A.o("Invalid compression type: "+a.B(0)))}},
b6:function b6(a,b){this.a=a
this.b=b},
bu:function bu(){},
h5:function h5(){},
pk(a,b,c,d){var s,r,q,p,o,n,m,l
if(b===0){if(d!==0)throw A.h(A.o("Incomplete huffman data"))
return}s=a.d
r=a.k()
q=a.k()
a.d+=4
p=a.k()
o=!0
if(r<65537)o=q>=65537
if(o)throw A.h(A.o("Invalid huffman table size"))
a.d+=4
n=A.K(65537,0,!1,t.p)
m=J.ar(16384,t.ho)
for(l=0;l<16384;++l)m[l]=new A.fS()
A.pl(a,b-20,r,q,n)
if(p>8*(b-(a.d-s)))throw A.h(A.o("Error in header for Huffman-encoded data (invalid number of bits)."))
A.ph(n,r,q,m)
A.pj(n,m,a,p,q,d,c)},
pj(a,b,c,d,e,f,g){var s,r,q,p,o,n,m,l,k,j="Error in Huffman-encoded data (invalid code).",i=A.k([0,0],t.t),h=c.d+B.a.V(d+7,8)
for(s=b.length,r=0;c.d<h;){A.lz(i,c)
while(q=i[1],q>=14){p=B.a.bw(i[0],q-14)&16383
if(!(p<s))return A.a(b,p)
o=b[p]
p=o.a
if(p!==0){B.c.h(i,1,q-p)
r=A.lA(o.b,e,i,c,g,r,f)}else{if(o.c==null)throw A.h(A.o(j))
for(n=0;n<o.b;++n){q=o.c
if(!(n<q.length))return A.a(q,n)
q=q[n]
if(!(q<65537))return A.a(a,q)
m=a[q]&63
for(;;){q=i[1]
if(!(q<m&&c.d<h))break
A.lz(i,c)}if(q>=m){p=o.c
if(!(n<p.length))return A.a(p,n)
p=p[n]
if(!(p<65537))return A.a(a,p)
q-=m
if(a[p]>>>6===(B.a.bw(i[0],q)&B.a.S(1,m)-1)>>>0){B.c.h(i,1,q)
q=o.c
if(!(n<q.length))return A.a(q,n)
l=A.lA(q[n],e,i,c,g,r,f)
r=l
break}}}if(n===o.b)throw A.h(A.o(j))}}}k=8-d&7
B.c.h(i,0,B.a.j(i[0],k))
B.c.h(i,1,i[1]-k)
while(q=i[1],q>0){p=B.a.a_(i[0],14-q)&16383
if(!(p<s))return A.a(b,p)
o=b[p]
p=o.a
if(p!==0){B.c.h(i,1,q-p)
r=A.lA(o.b,e,i,c,g,r,f)}else throw A.h(A.o(j))}if(r!==f)throw A.h(A.o("Error in Huffman-encoded data (decoded data are shorter than expected)."))},
lA(a,b,c,d,e,f,g){var s,r,q,p,o,n,m="Error in Huffman-encoded data (decoded data are longer than expected)."
if(a===b){if(c[1]<8)A.lz(c,d)
B.c.h(c,1,c[1]-8)
s=B.a.bw(c[0],c[1])&255
if(f+s>g)throw A.h(A.o(m))
r=f-1
q=e.length
if(!(r>=0&&r<q))return A.a(e,r)
p=e[r]
for(r=e.$flags|0;o=s-1,s>0;s=o,f=n){n=f+1
r&2&&A.b(e)
if(!(f<q))return A.a(e,f)
e[f]=p}}else{if(f<g){e.toString
n=f+1
e.$flags&2&&A.b(e)
if(!(f<e.length))return A.a(e,f)
e[f]=a}else throw A.h(A.o(m))
f=n}return f},
ph(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i="Error in Huffman-encoded data (invalid code table entry)."
for(s=d.length,r=t.t,q=t.p;b<=c;++b){if(!(b<65537))return A.a(a,b)
p=a[b]
o=p>>>6
n=p&63
if(B.a.a2(o,n)!==0)throw A.h(A.o(i))
if(n>14){p=B.a.a3(o,n-14)
if(!(p<s))return A.a(d,p)
m=d[p]
if(m.a!==0)throw A.h(A.o(i))
p=++m.b
l=m.c
if(l!=null){m.sfC(A.K(p,0,!1,q))
for(k=0;k<m.b-1;++k){p=m.c
p.toString
if(!(k<l.length))return A.a(l,k)
B.c.h(p,k,l[k])}}else m.sfC(A.k([0],r))
p=m.c
p.toString
B.c.h(p,m.b-1,b)}else if(n!==0){p=14-n
j=B.a.a_(o,p)
if(!(j<s))return A.a(d,j)
for(k=B.a.a_(1,p);k>0;--k,++j){if(!(j<s))return A.a(d,j)
m=d[j]
if(m.a!==0||m.c!=null)throw A.h(A.o(i))
m.a=n
m.b=b}}}},
pl(a,b,c,d,e){var s,r,q,p,o,n="Error in Huffman-encoded data (unexpected end of code table data).",m="Error in Huffman-encoded data (code table is longer than expected).",l=a.d,k=A.k([0,0],t.t)
for(s=d+1;c<=d;++c){if(a.d-l>b)throw A.h(A.o(n))
r=A.mY(6,k,a)
B.c.h(e,c,r)
if(r===63){if(a.d-l>b)throw A.h(A.o(n))
q=A.mY(8,k,a)+6
if(c+q>s)throw A.h(A.o(m))
for(;p=q-1,q!==0;q=p,c=o){o=c+1
B.c.h(e,c,0)}--c}else if(r>=59){q=r-59+2
if(c+q>s)throw A.h(A.o(m))
for(;p=q-1,q!==0;q=p,c=o){o=c+1
B.c.h(e,c,0)}--c}}A.pi(e)},
pi(a){var s,r,q,p,o,n=A.K(59,0,!1,t.p)
for(s=0;s<65537;++s){r=a[s]
if(!(r<59))return A.a(n,r)
B.c.h(n,r,n[r]+1)}for(q=0,s=58;s>0;--s,q=p){p=q+n[s]>>>1
B.c.h(n,s,q)}for(s=0;s<65537;++s){o=a[s]
if(o>0){if(!(o<59))return A.a(n,o)
r=n[o]
B.c.h(n,o,r+1)
B.c.h(a,s,(o|r<<6)>>>0)}}},
lz(a,b){B.c.h(a,0,((a[0]<<8|b.G())&-1)>>>0)
B.c.h(a,1,(a[1]+8&-1)>>>0)},
mY(a,b,c){var s
while(s=b[1],s<a){B.c.h(b,0,((b[0]<<8|J.c(c.a,c.d++))&-1)>>>0)
B.c.h(b,1,(b[1]+8&-1)>>>0)}B.c.h(b,1,s-a)
return(B.a.bw(b[0],b[1])&B.a.S(1,a)-1)>>>0},
fS:function fS(){this.b=this.a=0
this.c=null},
pm(a){var s=new A.e_(A.k([],t.W))
s.eb(a)
return s},
pn(a){var s=A.t(a,!1,null,0)
if(s.k()!==20000630)return!1
if(s.G()!==2)return!1
if((s.bi()&4294967289)>>>0!==0)return!1
return!0},
e_:function e_(a){var _=this
_.b=_.a=0
_.c=a
_.d=null
_.e=$},
nc(a,b,c){var s=new A.h6(a,A.k([],t.a_),A.H(t.N,t.iW),B.aY,b)
s.h5(a,b,c)
return s},
e0:function e0(){},
iC:function iC(a,b){this.a=a
this.b=b},
h6:function h6(a,b,c,d,e){var _=this
_.a=a
_.b=null
_.c=b
_.d=0
_.e=c
_.r=$
_.x=_.w=0
_.at=$
_.ax=d
_.ay=null
_.ch=$
_.CW=null
_.cx=0
_.cy=null
_.db=e
_.k1=_.id=_.go=_.fy=_.fx=_.fr=_.dy=_.dx=null
_.k2=$
_.k3=null},
h7:function h7(a,b,c){var _=this
_.r=null
_.w=a
_.x=b
_.y=$
_.z=null
_.b=_.a=0
_.c=c},
fl:function fl(){var _=this
_.f=_.e=_.d=_.c=_.b=_.a=$},
h8:function h8(a,b,c){var _=this
_.w=a
_.x=b
_.y=null
_.b=_.a=0
_.c=c},
h9:function h9(a,b){var _=this
_.r=null
_.w=a
_.b=_.a=0
_.c=b},
eh:function eh(a,b,c){var _=this
_.w=a
_.x=b
_.y=null
_.b=_.a=0
_.c=c},
iB:function iB(){this.a=null},
n_(a){var s=new Uint8Array(a*3)
return new A.e4(A.pu(a),a,null,new A.ba(s,a,3))},
pt(a){return new A.e4(a.a,a.b,a.c,A.nr(a.d))},
pu(a){var s
for(s=1;s<=8;++s)if(B.a.S(1,s)>=a)return s
return 0},
e4:function e4(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
e5:function e5(){},
ha:function ha(){var _=this
_.e=_.d=_.c=_.b=_.a=$
_.f=null
_.r=80
_.w=0
_.x=-1
_.y=$},
e6:function e6(a){var _=this
_.b=_.a=0
_.e=_.c=null
_.r=a},
iE:function iE(){var _=this
_.a=null
_.e=_.d=_.c=_.b=0
_.f=null
_.r=0
_.w=null
_.y=_.x=$
_.z=null
_.Q=0
_.as=null
_.ay=_.ax=_.at=0
_.ch=null
_.dy=_.dx=_.db=_.cy=_.cx=_.CW=0},
n1(a){var s,r,q,p
if(a.p()!==0)return null
s=a.p()
if(s>=3)return null
if(B.dg[s]===B.b_)return null
r=a.p()
q=J.bQ(r,t.aw)
for(p=0;p<r;++p){J.c(a.a,a.d++)
J.c(a.a,a.d++)
J.c(a.a,a.d++);++a.d
a.p()
a.p()
q[p]=new A.h_(a.k(),a.k())}return new A.fZ(r,q)},
d7:function d7(a,b){this.a=a
this.b=b},
fZ:function fZ(a,b){this.d=a
this.e=b},
h_:function h_(a,b){this.d=a
this.e=b},
fY:function fY(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.z=h
_.ay=_.ax=_.at=_.as=$
_.ch=null
_.fx=_.fr=_.dy=_.dx=_.db=_.cy=_.cx=_.CW=$
_.fy=i},
iG:function iG(){this.b=this.a=null},
fI:function fI(a,b,c){this.e=a
this.f=b
this.r=c},
bN:function bN(){},
cc:function cc(a){this.a=a},
ea:function ea(a){this.a=a},
u5(b3,b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2
if($.mm==null){s=new Uint8Array(768)
for(r=0;r<256;++r){q=256+r
if(!(q<768))return A.a(s,q)
s[q]=r}for(r=256;r<512;++r){q=256+r
if(!(q<768))return A.a(s,q)
s[q]=255}$.mm=s}for(q=b6.$flags|0,r=0;r<64;++r){p=b4[r]
o=b3[r]
q&2&&A.b(b6)
if(!(r<64))return A.a(b6,r)
b6[r]=p*o}for(n=0,r=0;r<8;++r,n+=8){p=1+n
if(!(p<64))return A.a(b6,p)
o=b6[p]
m=!1
if(o===0){l=2+n
if(!(l<64))return A.a(b6,l)
if(b6[l]===0){l=3+n
if(!(l<64))return A.a(b6,l)
if(b6[l]===0){l=4+n
if(!(l<64))return A.a(b6,l)
if(b6[l]===0){l=5+n
if(!(l<64))return A.a(b6,l)
if(b6[l]===0){l=6+n
if(!(l<64))return A.a(b6,l)
if(b6[l]===0){m=7+n
if(!(m<64))return A.a(b6,m)
m=b6[m]===0}}}}}}if(m){if(!(n<64))return A.a(b6,n)
p=B.a.j(5793*b6[n]+512,10)
k=(p&2147483647)-((p&2147483648)>>>0)
q&2&&A.b(b6)
if(!(n<64))return A.a(b6,n)
b6[n]=k
p=n+1
if(!(p<64))return A.a(b6,p)
b6[p]=k
p=n+2
if(!(p<64))return A.a(b6,p)
b6[p]=k
p=n+3
if(!(p<64))return A.a(b6,p)
b6[p]=k
p=n+4
if(!(p<64))return A.a(b6,p)
b6[p]=k
p=n+5
if(!(p<64))return A.a(b6,p)
b6[p]=k
p=n+6
if(!(p<64))return A.a(b6,p)
b6[p]=k
p=n+7
if(!(p<64))return A.a(b6,p)
b6[p]=k
continue}if(!(n<64))return A.a(b6,n)
m=B.a.j(5793*b6[n]+128,8)
j=(m&2147483647)-((m&2147483648)>>>0)
m=4+n
if(!(m<64))return A.a(b6,m)
l=B.a.j(5793*b6[m]+128,8)
i=(l&2147483647)-((l&2147483648)>>>0)
l=2+n
if(!(l<64))return A.a(b6,l)
h=b6[l]
g=6+n
if(!(g<64))return A.a(b6,g)
f=b6[g]
e=7+n
if(!(e<64))return A.a(b6,e)
d=b6[e]
c=B.a.j(2896*(o-d)+128,8)
b=(c&2147483647)-((c&2147483648)>>>0)
d=B.a.j(2896*(o+d)+128,8)
a=(d&2147483647)-((d&2147483648)>>>0)
d=3+n
if(!(d<64))return A.a(b6,d)
o=b6[d]<<4
a0=(o&2147483647)-((o&2147483648)>>>0)
o=5+n
if(!(o<64))return A.a(b6,o)
c=b6[o]<<4
a1=(c&2147483647)-((c&2147483648)>>>0)
c=B.a.j(j-i+1,1)
k=(c&2147483647)-((c&2147483648)>>>0)
c=B.a.j(j+i+1,1)
j=(c&2147483647)-((c&2147483648)>>>0)
c=B.a.j(h*3784+f*1567+128,8)
c=(c&2147483647)-((c&2147483648)>>>0)
a2=B.a.j(h*1567-f*3784+128,8)
h=(a2&2147483647)-((a2&2147483648)>>>0)
a2=B.a.j(b-a1+1,1)
a2=(a2&2147483647)-((a2&2147483648)>>>0)
a3=B.a.j(b+a1+1,1)
b=(a3&2147483647)-((a3&2147483648)>>>0)
a3=B.a.j(a+a0+1,1)
a3=(a3&2147483647)-((a3&2147483648)>>>0)
a4=B.a.j(a-a0+1,1)
a0=(a4&2147483647)-((a4&2147483648)>>>0)
a4=B.a.j(j-c+1,1)
a4=(a4&2147483647)-((a4&2147483648)>>>0)
c=B.a.j(j+c+1,1)
j=(c&2147483647)-((c&2147483648)>>>0)
c=B.a.j(k-h+1,1)
c=(c&2147483647)-((c&2147483648)>>>0)
a5=B.a.j(k+h+1,1)
i=(a5&2147483647)-((a5&2147483648)>>>0)
a5=B.a.j(b*2276+a3*3406+2048,12)
k=(a5&2147483647)-((a5&2147483648)>>>0)
a3=B.a.j(b*3406-a3*2276+2048,12)
b=(a3&2147483647)-((a3&2147483648)>>>0)
a3=B.a.j(a0*799+a2*4017+2048,12)
a3=(a3&2147483647)-((a3&2147483648)>>>0)
a2=B.a.j(a0*4017-a2*799+2048,12)
a0=(a2&2147483647)-((a2&2147483648)>>>0)
q&2&&A.b(b6)
if(!(n<64))return A.a(b6,n)
b6[n]=j+k
if(!(e<64))return A.a(b6,e)
b6[e]=j-k
if(!(p<64))return A.a(b6,p)
b6[p]=i+a3
if(!(g<64))return A.a(b6,g)
b6[g]=i-a3
if(!(l<64))return A.a(b6,l)
b6[l]=c+a0
if(!(o<64))return A.a(b6,o)
b6[o]=c-a0
if(!(d<64))return A.a(b6,d)
b6[d]=a4+b
if(!(m<64))return A.a(b6,m)
b6[m]=a4-b}for(r=0;r<8;++r){a6=8+r
a7=16+r
a8=24+r
a9=32+r
b0=40+r
b1=48+r
b2=56+r
p=b6[a6]
if(p===0&&b6[a7]===0&&b6[a8]===0&&b6[a9]===0&&b6[b0]===0&&b6[b1]===0&&b6[b2]===0){p=B.a.j(5793*b6[r]+8192,14)
k=(p&2147483647)-((p&2147483648)>>>0)
q&2&&A.b(b6)
if(!(r<64))return A.a(b6,r)
b6[r]=k
if(!(a6<64))return A.a(b6,a6)
b6[a6]=k
if(!(a7<64))return A.a(b6,a7)
b6[a7]=k
if(!(a8<64))return A.a(b6,a8)
b6[a8]=k
if(!(a9<64))return A.a(b6,a9)
b6[a9]=k
if(!(b0<64))return A.a(b6,b0)
b6[b0]=k
if(!(b1<64))return A.a(b6,b1)
b6[b1]=k
if(!(b2<64))return A.a(b6,b2)
b6[b2]=k
continue}o=B.a.j(5793*b6[r]+2048,12)
j=(o&2147483647)-((o&2147483648)>>>0)
o=B.a.j(5793*b6[a9]+2048,12)
i=(o&2147483647)-((o&2147483648)>>>0)
h=b6[a7]
f=b6[b1]
o=b6[b2]
m=B.a.j(2896*(p-o)+2048,12)
b=(m&2147483647)-((m&2147483648)>>>0)
o=B.a.j(2896*(p+o)+2048,12)
a=(o&2147483647)-((o&2147483648)>>>0)
a0=b6[a8]
a1=b6[b0]
o=B.a.j(j-i+1,1)
k=(o&2147483647)-((o&2147483648)>>>0)
o=B.a.j(j+i+1,1)
j=(o&2147483647)-((o&2147483648)>>>0)
o=B.a.j(h*3784+f*1567+2048,12)
p=(o&2147483647)-((o&2147483648)>>>0)
o=B.a.j(h*1567-f*3784+2048,12)
h=(o&2147483647)-((o&2147483648)>>>0)
o=B.a.j(b-a1+1,1)
o=(o&2147483647)-((o&2147483648)>>>0)
m=B.a.j(b+a1+1,1)
b=(m&2147483647)-((m&2147483648)>>>0)
m=B.a.j(a+a0+1,1)
m=(m&2147483647)-((m&2147483648)>>>0)
l=B.a.j(a-a0+1,1)
a0=(l&2147483647)-((l&2147483648)>>>0)
l=B.a.j(j-p+1,1)
l=(l&2147483647)-((l&2147483648)>>>0)
p=B.a.j(j+p+1,1)
j=(p&2147483647)-((p&2147483648)>>>0)
p=B.a.j(k-h+1,1)
p=(p&2147483647)-((p&2147483648)>>>0)
g=B.a.j(k+h+1,1)
i=(g&2147483647)-((g&2147483648)>>>0)
g=B.a.j(b*2276+m*3406+2048,12)
k=(g&2147483647)-((g&2147483648)>>>0)
m=B.a.j(b*3406-m*2276+2048,12)
b=(m&2147483647)-((m&2147483648)>>>0)
m=B.a.j(a0*799+o*4017+2048,12)
m=(m&2147483647)-((m&2147483648)>>>0)
o=B.a.j(a0*4017-o*799+2048,12)
a0=(o&2147483647)-((o&2147483648)>>>0)
q&2&&A.b(b6)
if(!(r<64))return A.a(b6,r)
b6[r]=j+k
if(!(b2<64))return A.a(b6,b2)
b6[b2]=j-k
b6[a6]=i+m
b6[b1]=i-m
b6[a7]=p+a0
b6[b0]=p-a0
b6[a8]=l+b
b6[a9]=l-b}for(q=$.mm,p=b5.$flags|0,r=0;r<64;++r){q.toString
o=B.a.j(b6[r]+8,4)
o=384+((o&2147483647)-((o&2147483648)>>>0))
if(!(o>=0&&o<768))return A.a(q,o)
o=q[o]
p&2&&A.b(b5)
if(!(r<64))return A.a(b5,r)
b5[r]=o}},
tO(e5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2=null,e3="ifd0",e4=e5.w
if(e4.m(0,e3).a.Z(274)){s=e4.m(0,e3).gc5()
s.toString
r=s}else r=0
s=e5.d
q=s.e
q.toString
s=s.d
s.toString
p=r>=5&&r<=8
if(p)o=s
else o=q
if(p)n=q
else n=s
m=A.P(e2,e2,B.e,0,B.i,n,e2,0,3,e2,B.e,o,!1)
m.e=A.dZ(e4)
m.gbK().m(0,e3).sc5(e2)
m.c=e5.r
l=s-1
k=q-1
switch(r){case 2:j=new A.l4(m,k)
break
case 3:j=new A.l5(m,k,l)
break
case 4:j=new A.l6(m,l)
break
case 5:j=new A.l7(m)
break
case 6:j=new A.l8(m,l)
break
case 7:j=new A.l9(m,l,k)
break
case 8:j=new A.la(m,k)
break
default:j=m.gfV()
break}e4=e5.as
i=e4.length
switch(i){case 1:if(0>=i)return A.a(e4,0)
h=e4[0]
g=h.e
f=h.f
e=h.r
for(e4=g.length,d=0;d<s;++d){c=B.a.a2(d,e)
if(!(c<e4))return A.a(g,c)
b=g[c]
for(a=0;a<q;++a){a0=B.a.a2(a,f)
if(!(a0<b.length))return A.a(b,a0)
a1=b[a0]
j.$5(a,d,a1,a1,a1)}}break
case 3:a2=e5.c
a3=a2==null||a2.d===1
if(0>=i)return A.a(e4,0)
h=e4[0]
if(1>=i)return A.a(e4,1)
a4=e4[1]
if(2>=i)return A.a(e4,2)
a5=e4[2]
a6=h.e
a7=a4.e
a8=a5.e
f=h.f
e=h.r
a9=a4.f
b0=a4.r
b1=a5.f
b2=a5.r
for(e4=a6.length,i=a7.length,a2=a8.length,d=0;d<s;++d){c=B.a.a2(d,e)
b3=B.a.a2(d,b0)
b4=B.a.a2(d,b2)
if(!(c<e4))return A.a(a6,c)
b=a6[c]
if(!(b3<i))return A.a(a7,b3)
b5=a7[b3]
if(!(b4<a2))return A.a(a8,b4)
b6=a8[b4]
for(a=0;a<q;++a){a0=B.a.a2(a,f)
b7=B.a.a2(a,a9)
b8=B.a.a2(a,b1)
if(!(a0<b.length))return A.a(b,a0)
b9=b[a0]
if(!(b7<b5.length))return A.a(b5,b7)
c0=b5[b7]
if(!(b8<b6.length))return A.a(b6,b8)
c1=b6[b8]
if(a3){a1=b9<<8>>>0
c2=c0-128
c3=c1-128
c4=B.a.j(a1+359*c3,8)
b9=B.a.K((c4&2147483647)-((c4&2147483648)>>>0),0,255)
c4=B.a.j(a1-88*c2-183*c3,8)
c0=B.a.K((c4&2147483647)-((c4&2147483648)>>>0),0,255)
c4=B.a.j(a1+454*c2,8)
c1=B.a.K((c4&2147483647)-((c4&2147483648)>>>0),0,255)}j.$5(a,d,b9,c0,c1)}}break
case 4:a2=e5.c
if(a2==null)throw A.h(A.o("Unsupported color mode (4 components)"))
a2=a2.d===0
if(0>=i)return A.a(e4,0)
h=e4[0]
if(1>=i)return A.a(e4,1)
a4=e4[1]
if(2>=i)return A.a(e4,2)
a5=e4[2]
if(3>=i)return A.a(e4,3)
c5=e4[3]
a6=h.e
a7=a4.e
a8=a5.e
c6=c5.e
f=h.f
e=h.r
a9=a4.f
b0=a4.r
b1=a5.f
b2=a5.r
c7=c5.f
c8=c5.r
for(e4=a6.length,i=a7.length,c4=a8.length,c9=c6.length,d=0;d<s;++d){c=B.a.a2(d,e)
b3=B.a.a2(d,b0)
b4=B.a.a2(d,b2)
d0=B.a.a2(d,c8)
if(!(c<e4))return A.a(a6,c)
b=a6[c]
if(!(b3<i))return A.a(a7,b3)
b5=a7[b3]
if(!(b4<c4))return A.a(a8,b4)
b6=a8[b4]
if(!(d0<c9))return A.a(c6,d0)
d1=c6[d0]
for(a=0;a<q;++a){a0=B.a.a2(a,f)
b7=B.a.a2(a,a9)
b8=B.a.a2(a,b1)
d2=B.a.a2(a,c7)
if(a2){if(!(a0<b.length))return A.a(b,a0)
d3=b[a0]
if(!(b7<b5.length))return A.a(b5,b7)
d4=b5[b7]
if(!(b8<b6.length))return A.a(b6,b8)
a1=b6[b8]
if(!(d2<d1.length))return A.a(d1,d2)
d5=d1[d2]}else{if(!(a0<b.length))return A.a(b,a0)
a1=b[a0]
if(!(b7<b5.length))return A.a(b5,b7)
c2=b5[b7]
if(!(b8<b6.length))return A.a(b6,b8)
c3=b6[b8]
if(!(d2<d1.length))return A.a(d1,d2)
d5=d1[d2]
d6=c3-128
d7=c2-128
d8=a1<<8>>>0
d9=B.a.j(d8+359*d6,8)
d3=255-B.a.K((d9&2147483647)-((d9&2147483648)>>>0),0,255)
d9=B.a.j(d8-88*d7-183*d6,8)
d4=255-B.a.K((d9&2147483647)-((d9&2147483648)>>>0),0,255)
d9=B.a.j(d8+454*d7,8)
a1=255-B.a.K((d9&2147483647)-((d9&2147483648)>>>0),0,255)}d9=B.a.j(d3*d5,8)
e0=B.a.j(d4*d5,8)
e1=B.a.j(a1*d5,8)
j.$5(a,d,(d9&2147483647)-((d9&2147483648)>>>0),(e0&2147483647)-((e0&2147483648)>>>0),(e1&2147483647)-((e1&2147483648)>>>0))}}break
default:throw A.h(A.o("Unsupported color mode"))}return m},
l4:function l4(a,b){this.a=a
this.b=b},
l5:function l5(a,b,c){this.a=a
this.b=b
this.c=c},
l6:function l6(a,b){this.a=a
this.b=b},
l7:function l7(a){this.a=a},
l8:function l8(a,b){this.a=a
this.b=b},
l9:function l9(a,b,c){this.a=a
this.b=b
this.c=c},
la:function la(a,b){this.a=a
this.b=b},
iR:function iR(){this.d=null},
bR:function bR(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.y=_.x=_.w=_.r=_.f=_.e=$},
lK(){var s=A.K(4,null,!1,t.jH),r=A.k([],t.gU),q=t.iM,p=J.hg(0,q)
q=J.hg(0,q)
return new A.iT(new A.c8(A.H(t.N,t.P)),s,r,p,q,A.k([],t.an))},
iT:function iT(a,b,c,d,e,f){var _=this
_.b=_.a=$
_.r=_.e=_.d=_.c=null
_.w=a
_.x=b
_.y=c
_.z=d
_.Q=e
_.as=f},
dI:function dI(a){this.a=a
this.b=0},
hl:function hl(a,b){var _=this
_.e=_.d=_.c=_.b=null
_.r=_.f=0
_.x=_.w=$
_.y=a
_.z=b},
hm:function hm(){this.b=this.a=0},
iV:function iV(){this.r=this.f=$},
hn:function hn(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=b
_.f=$
_.r=null
_.y=c
_.z=d
_.Q=e
_.as=f
_.at=g
_.ax=h
_.cx=_.CW=_.ch=_.ay=0
_.cy=$},
hj:function hj(){},
hk(a){var s=null,r=new Uint8Array(64),q=new Uint8Array(64),p=new Float32Array(64),o=new Float32Array(64),n=A.K(65535,s,!1,t.T),m=t.I,l=A.K(65535,s,!1,m),k=A.K(64,s,!1,m)
m=A.K(64,s,!1,m)
r=new A.iU(r,q,p,o,n,l,k,m,new Int32Array(2048))
r.e=r.cU(B.bX,B.a8)
r.f=r.cU(B.bx,B.a8)
q=t.nx
r.r=q.a(r.cU(B.bc,B.bl))
r.w=q.a(r.cU(B.bq,B.bG))
r.iw()
r.iz()
r.fW(a)
return r},
iS:function iS(a,b){this.a=a
this.b=b},
iU:function iU(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.f=_.e=null
_.w=_.r=$
_.x=e
_.y=f
_.z=g
_.Q=h
_.as=i
_.at=null
_.ax=0
_.ay=7},
dq:function dq(a,b){this.a=a
this.b=b},
eP:function eP(a,b){this.a=a
this.b=b},
eQ:function eQ(){},
hb:function hb(a,b,c,d,e,f,g,h,i){var _=this
_.y=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i},
nd(){var s=t.N
return new A.hc(A.H(s,s),A.k([],t.fi),A.k([],t.t))},
bU:function bU(a,b){this.a=a
this.b=b},
hA:function hA(){},
hc:function hc(a,b,c){var _=this
_.c=_.b=_.a=0
_.d=-1
_.r=_.f=0
_.z=_.x=_.w=null
_.Q=""
_.at=null
_.ax=a
_.CW=1
_.cy=b
_.db=c},
hz:function hz(a){var _=this
_.a=a
_.c=_.b=0
_.d=$
_.e=0},
bV:function bV(a,b){this.a=a
this.b=b},
bW:function bW(a){this.b=this.a=0
this.e=a},
j7:function j7(a){this.b=this.a=null
this.c=a},
j8:function j8(){},
hC:function hC(){this.a=null},
hD:function hD(){this.a=null},
bn:function bn(){},
hG:function hG(){this.a=null},
hH:function hH(){this.a=null},
hK:function hK(){this.a=null},
hL:function hL(){this.a=null},
eS:function eS(a){this.b=a},
hJ:function hJ(){},
jb:function jb(){var _=this
_.w=_.r=_.f=_.e=$},
cz:function cz(a){this.a=a
this.c=null},
lZ(a){var s=new A.hE(A.k([],t.k9),A.H(t.p,t.ok))
s.hj(a)
return s},
m2(a,b,c,d){var s=a/255,r=b/255,q=c/255,p=d/255,o=r*(1-q),n=s*(1-p)
return B.b.i(B.b.K((2*s<q?2*r*s+o+n:p*q-2*(q-s)*(p-r)+o+n)*255,0,255))},
jd(a,b){if(b===0)return 0
return B.a.i(B.a.K(B.b.i(255*(1-(1-a/255)/(b/255))),0,255))},
jf(a,b){return B.a.i(B.a.K(a+b-255,0,255))},
m4(a,b){return B.a.i(B.a.K(255-(255-b)*(255-a),0,255))},
je(a,b){if(b===255)return 255
return B.b.i(B.b.K(a/255/(1-b/255)*255,0,255))},
m5(a,b){var s=a/255,r=b/255,q=1-r
return B.b.ap(255*(q*r*s+r*(1-q*(1-s))))},
m0(a,b){var s=b/255,r=a/255
if(r<0.5)return B.b.ap(510*s*r)
else return B.b.ap(255*(1-2*(1-s)*(1-r)))},
m6(a,b){if(b<128)return A.jd(a,2*b)
else return A.je(a,2*(b-128))},
m1(a,b){var s
if(b<128)return A.jf(a,2*b)
else{s=2*(b-128)
return s+a>255?255:a+s}},
m3(a,b){return b<128?Math.min(a,2*b):Math.max(a,2*(b-128))},
m_(a,b){return B.b.ap(b+a-2*b*a/255)},
aH(a,b,c){var s,r,q
if(a==null)s=0
else{s=a.length
if(c===1){if(!(b>=0&&b<s))return A.a(a,b)
s=a[b]}else{if(!(b>=0&&b<s))return A.a(a,b)
r=a[b]
q=b+1
if(!(q<s))return A.a(a,q)
q=(r<<8|a[q])>>>8
s=q}}return s},
nx(b7,b8,b9,c0,c1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=null,b6=A.H(t.p,t.dS)
for(s=c1.length,r=0;q=c1.length,r<q;c1.length===s||(0,A.V)(c1),++r){p=c1[r]
b6.h(0,p.a,p)}if(b8===8)o=1
else o=b8===16?2:-1
n=A.P(b5,b5,B.e,0,B.i,c0,b5,0,q,b5,B.e,b9,!1)
if(o===-1)throw A.h(A.o("PSD: unsupported bit depth: "+A.E(b8)))
m=b6.m(0,0)
l=b6.m(0,1)
k=b6.m(0,2)
j=b6.m(0,-1)
i=A.k([0,0,0],t.t)
h=-o
for(s=n.a,s=s.gF(s),g=q>=5,f=q===4,e=q>=2,q=q>=4;s.D();){d=s.gL()
h+=o
switch(b7){case B.c8:d.sn(A.aH(m.c,h,o))
d.st(A.aH(l.c,h,o))
d.sq(A.aH(k.c,h,o))
d.sv(q?A.aH(j.c,h,o):255)
if(d.gv()!==0){d.sn((d.gn()+d.gv()-255)*255/d.gv())
d.st((d.gt()+d.gv()-255)*255/d.gv())
d.sq((d.gq()+d.gv()-255)*255/d.gv())}break
case B.ca:c=A.aH(m.c,h,o)
b=A.aH(l.c,h,o)
a=A.aH(k.c,h,o)
a0=q?A.aH(j.c,h,o):255
a1=((c*100>>>8)+16)/116
a2=(b-128)/500+a1
a3=a1-(a-128)/200
a4=Math.pow(a1,3)
a1=a4>0.008856?a4:(a1-0.13793103448275862)/7.787
a5=Math.pow(a2,3)
a2=a5>0.008856?a5:(a2-0.13793103448275862)/7.787
a6=Math.pow(a3,3)
a3=a6>0.008856?a6:(a3-0.13793103448275862)/7.787
a2=a2*95.047/100
a1=a1*100/100
a3=a3*108.883/100
a7=a2*3.240454836+a1*-1.53713885+a3*-0.498531547
a8=a2*-0.96926639+a1*1.87601093+a3*0.041556082
a9=a2*0.05564342+a1*-0.20402585+a3*1.05722516
a7=a7>0.0031308?1.055*Math.pow(a7,0.4166666666666667)-0.055:12.92*a7
a8=a8>0.0031308?1.055*Math.pow(a8,0.4166666666666667)-0.055:12.92*a8
a9=a9>0.0031308?1.055*Math.pow(a9,0.4166666666666667)-0.055:12.92*a9
b0=[B.b.ap(B.b.K(a7*255,0,255)),B.b.ap(B.b.K(a8*255,0,255)),B.b.ap(B.b.K(a9*255,0,255))]
d.sn(b0[0])
d.st(b0[1])
d.sq(b0[2])
d.sv(a0)
break
case B.c7:b1=A.aH(m.c,h,o)
a0=e?A.aH(j.c,h,o):255
d.sn(b1)
d.st(b1)
d.sq(b1)
d.sv(a0)
break
case B.c9:b2=A.aH(m.c,h,o)
b3=A.aH(l.c,h,o)
a1=A.aH(k.c,h,o)
b4=A.aH(b6.m(0,f?-1:3).c,h,o)
a0=g?A.aH(j.c,h,o):255
A.oo(255-b2,255-b3,255-a1,255-b4,i)
d.sn(i[0])
d.st(i[1])
d.sq(i[2])
d.sv(a0)
break
default:throw A.h(A.o("Unhandled color mode: "+A.E(b7)))}}return n},
bc:function bc(a,b){this.a=a
this.b=b},
hE:function hE(a,b){var _=this
_.b=_.a=0
_.d=_.c=null
_.e=$
_.r=_.f=null
_.w=a
_.x=$
_.y=null
_.z=b
_.as=$
_.ay=_.ax=_.at=null},
hF:function hF(){},
hI:function hI(a,b,c){var _=this
_.b=_.a=null
_.f=_.e=_.d=_.c=$
_.r=null
_.as=_.y=_.w=$
_.ay=a
_.ch=b
_.cx=null
_.cy=c},
q8(a,b){var s
switch(a){case"lsct":s=b.c-b.d
b.k()
if(s>=12){if(b.ag(4)!=="8BIM")A.ad(A.o("Invalid key in layer additional data"))
b.ag(4)}if(s>=16)b.k()
return new A.hJ()
default:return new A.eS(b)}},
ds:function ds(){},
jc:function jc(){this.a=null},
hM:function hM(){},
dv:function dv(a,b,c){this.a=a
this.b=b
this.c=c},
az:function az(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
dt:function dt(){var _=this
_.Q=_.z=_.y=_.f=_.d=_.b=_.a=0},
du:function du(a){var _=this
_.b=0
_.c=a
_.Q=_.r=_.f=0},
eT:function eT(){this.y=this.b=this.a=0},
bz(a,b){var s,r=a>>>8
if(!(r<256))return A.a(B.Q,r)
r=B.Q[r]
s=b>>>8
if(!(s<256))return A.a(B.Q,s)
return(r<<17|B.Q[s]<<16|B.Q[a&255]<<1|B.Q[b&255])>>>0},
aX:function aX(a){var _=this
_.a=a
_.b=0
_.c=!1
_.d=0
_.e=!1
_.f=0
_.r=!1},
jg:function jg(){this.b=this.a=null},
eX:function eX(a){var _=this
_.b=_.a=0
_.c=a
_.Q=_.z=_.y=_.x=_.f=_.e=0
_.as=null
_.ax=0},
aA:function aA(a,b){this.a=a
this.b=b},
jr:function jr(){this.a=null
this.b=$},
js:function js(a){this.a=a
this.c=this.b=0},
hQ:function hQ(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=null
_.f=e},
m9(a,b,c){var s=new A.ju(b,a),r=t.I
s.e=A.K(b,null,!1,r)
s.f=A.K(b,null,!1,r)
return s},
ju:function ju(a,b){var _=this
_.a=a
_.c=b
_.d=0
_.f=_.e=null
_.r=$
_.x=_.w=null
_.y=0
_.z=2
_.as=0
_.at=null},
hR:function hR(a,b,c,d){var _=this
_.a=a
_.c=_.b=0
_.d=b
_.w=_.r=_.f=_.e=1
_.x=c
_.y=d
_.z=!1
_.Q=1
_.at=_.as=$
_.ch=_.ay=0
_.cx=_.CW=null
_.db=_.cy=$
_.dy=1
_.fx=_.fr=0
_.id=null
_.k3=_.k2=_.k1=$},
cD:function cD(a,b){this.a=a
this.b=b},
aa:function aa(a,b){this.a=a
this.b=b},
aZ:function aZ(a,b){this.a=a
this.b=b},
hS:function hS(a){var _=this
_.b=_.a=0
_.d=null
_.f=a},
no(){return new A.j1(new Uint8Array(4096))},
j1:function j1(a){var _=this
_.a=9
_.d=_.c=_.b=0
_.w=_.r=_.f=_.e=$
_.x=a
_.z=_.y=$
_.Q=null
_.as=$},
jt:function jt(){this.b=this.a=null
this.c=$},
mb(a,b){var s=new Int32Array(4),r=new Int32Array(4),q=new Int8Array(4),p=new Int8Array(4),o=A.K(8,null,!1,t.nX),n=A.K(4,null,!1,t.nk)
return new A.jx(a,b,new A.jD(),new A.jG(),new A.jz(s,r),new A.jI(q,p),o,n,new Uint8Array(4))},
nJ(a,b,c){if(c===0)if(a===0)return b===0?6:5
else return b===0?4:0
return c},
jx:function jx(a,b,c,d,e,f,g,h,i){var _=this
_.a=a
_.b=b
_.c=$
_.d=null
_.e=$
_.f=c
_.r=d
_.w=e
_.x=f
_.as=_.Q=_.z=_.y=0
_.ax=_.at=null
_.ch=_.ay=$
_.cx=_.CW=null
_.cy=$
_.db=g
_.dy=h
_.fr=null
_.fy=_.fx=$
_.go=null
_.id=i
_.p3=_.p2=_.p1=_.ok=_.k4=_.k3=_.k2=_.k1=$
_.R8=_.p4=null
_.x2=_.x1=_.to=_.ry=_.rx=_.RG=$
_.xr=null
_.y2=_.y1=0
_.cw=$
_.c4=null
_.dS=$
_.dT=_.fu=null
_.dU=$},
jJ:function jJ(){},
nH(a){var s=new A.f_(a)
s.b=254
s.c=0
s.d=-8
return s},
f_:function f_(a){var _=this
_.a=a
_.d=_.c=_.b=$
_.e=!1},
F(a,b,c){return B.a.az(B.a.j(a+2*b+c+2,2),32)},
qt(a){var s,r=A.k([A.F(J.c(a.a,a.d+-33),J.c(a.a,a.d+-32),J.c(a.a,a.d+-31)),A.F(J.c(a.a,a.d+-32),J.c(a.a,a.d+-31),J.c(a.a,a.d+-30)),A.F(J.c(a.a,a.d+-31),J.c(a.a,a.d+-30),J.c(a.a,a.d+-29)),A.F(J.c(a.a,a.d+-30),J.c(a.a,a.d+-29),J.c(a.a,a.d+-28))],t.t)
for(s=0;s<4;++s)a.bT(s*32,4,r)},
ql(a){var s=J.c(a.a,a.d+-33),r=J.c(a.a,a.d+-1),q=J.c(a.a,a.d+31),p=J.c(a.a,a.d+63),o=J.c(a.a,a.d+95),n=A.p(a,null,0),m=n.cI(),l=A.F(s,r,q)
m.$flags&2&&A.b(m)
if(0>=m.length)return A.a(m,0)
m[0]=16843009*l
n.d+=32
l=n.cI()
m=A.F(r,q,p)
l.$flags&2&&A.b(l)
if(0>=l.length)return A.a(l,0)
l[0]=16843009*m
n.d+=32
m=n.cI()
l=A.F(q,p,o)
m.$flags&2&&A.b(m)
if(0>=m.length)return A.a(m,0)
m[0]=16843009*l
n.d+=32
l=n.cI()
m=A.F(p,o,o)
l.$flags&2&&A.b(l)
if(0>=l.length)return A.a(l,0)
l[0]=16843009*m},
qj(a){var s,r,q,p
for(s=4,r=0;r<4;++r)s+=J.c(a.a,a.d+(r-32))+J.c(a.a,a.d+(-1+r*32))
s=B.a.j(s,3)
for(r=0;r<4;++r){q=a.a
p=a.d+r*32
J.br(q,p,p+4,s)}},
mc(a,b){var s,r,q,p,o,n,m=255-J.c(a.a,a.d+-33)
for(s=0,r=0;r<b;++r){q=m+J.c(a.a,a.d+(s-1))
for(p=0;p<b;++p){o=$.aI()
n=q+J.c(a.a,a.d+(-32+p))
if(!(n>=0&&n<766))return A.a(o,n)
n=o[n]
J.x(a.a,a.d+(s+p),n)}s+=32}},
qr(a){A.mc(a,4)},
qs(a){A.mc(a,8)},
qq(a){A.mc(a,16)},
qp(a){var s,r=J.c(a.a,a.d+-1),q=J.c(a.a,a.d+31),p=J.c(a.a,a.d+63),o=J.c(a.a,a.d+95),n=J.c(a.a,a.d+-33),m=J.c(a.a,a.d+-32),l=J.c(a.a,a.d+-31),k=J.c(a.a,a.d+-30),j=J.c(a.a,a.d+-29)
a.h(0,96,A.F(q,p,o))
s=A.F(r,q,p)
a.h(0,97,s)
a.h(0,64,s)
s=A.F(n,r,q)
a.h(0,98,s)
a.h(0,65,s)
a.h(0,32,s)
s=A.F(m,n,r)
a.h(0,99,s)
a.h(0,66,s)
a.h(0,33,s)
a.h(0,0,s)
s=A.F(l,m,n)
a.h(0,67,s)
a.h(0,34,s)
a.h(0,1,s)
s=A.F(k,l,m)
a.h(0,35,s)
a.h(0,2,s)
a.h(0,3,A.F(j,k,l))},
qo(a){var s,r=J.c(a.a,a.d+-32),q=J.c(a.a,a.d+-31),p=J.c(a.a,a.d+-30),o=J.c(a.a,a.d+-29),n=J.c(a.a,a.d+-28),m=J.c(a.a,a.d+-27),l=J.c(a.a,a.d+-26),k=J.c(a.a,a.d+-25)
a.h(0,0,A.F(r,q,p))
s=A.F(q,p,o)
a.h(0,32,s)
a.h(0,1,s)
s=A.F(p,o,n)
a.h(0,64,s)
a.h(0,33,s)
a.h(0,2,s)
s=A.F(o,n,m)
a.h(0,96,s)
a.h(0,65,s)
a.h(0,34,s)
a.h(0,3,s)
s=A.F(n,m,l)
a.h(0,97,s)
a.h(0,66,s)
a.h(0,35,s)
s=A.F(m,l,k)
a.h(0,98,s)
a.h(0,67,s)
a.h(0,99,A.F(l,k,k))},
qv(a){var s=J.c(a.a,a.d+-1),r=J.c(a.a,a.d+31),q=J.c(a.a,a.d+63),p=J.c(a.a,a.d+-33),o=J.c(a.a,a.d+-32),n=J.c(a.a,a.d+-31),m=J.c(a.a,a.d+-30),l=J.c(a.a,a.d+-29),k=B.a.az(B.a.j(p+o+1,1),32)
a.h(0,65,k)
a.h(0,0,k)
k=B.a.az(B.a.j(o+n+1,1),32)
a.h(0,66,k)
a.h(0,1,k)
k=B.a.az(B.a.j(n+m+1,1),32)
a.h(0,67,k)
a.h(0,2,k)
a.h(0,3,B.a.az(B.a.j(m+l+1,1),32))
a.h(0,96,A.F(q,r,s))
a.h(0,64,A.F(r,s,p))
k=A.F(s,p,o)
a.h(0,97,k)
a.h(0,32,k)
k=A.F(p,o,n)
a.h(0,98,k)
a.h(0,33,k)
k=A.F(o,n,m)
a.h(0,99,k)
a.h(0,34,k)
a.h(0,35,A.F(n,m,l))},
qu(a){var s,r=J.c(a.a,a.d+-32),q=J.c(a.a,a.d+-31),p=J.c(a.a,a.d+-30),o=J.c(a.a,a.d+-29),n=J.c(a.a,a.d+-28),m=J.c(a.a,a.d+-27),l=J.c(a.a,a.d+-26),k=J.c(a.a,a.d+-25)
a.h(0,0,B.a.az(B.a.j(r+q+1,1),32))
s=B.a.az(B.a.j(q+p+1,1),32)
a.h(0,64,s)
a.h(0,1,s)
s=B.a.az(B.a.j(p+o+1,1),32)
a.h(0,65,s)
a.h(0,2,s)
s=B.a.az(B.a.j(o+n+1,1),32)
a.h(0,66,s)
a.h(0,3,s)
a.h(0,32,A.F(r,q,p))
s=A.F(q,p,o)
a.h(0,96,s)
a.h(0,33,s)
s=A.F(p,o,n)
a.h(0,97,s)
a.h(0,34,s)
s=A.F(o,n,m)
a.h(0,98,s)
a.h(0,35,s)
a.h(0,67,A.F(n,m,l))
a.h(0,99,A.F(m,l,k))},
qm(a){var s,r=J.c(a.a,a.d+-1),q=J.c(a.a,a.d+31),p=J.c(a.a,a.d+63),o=J.c(a.a,a.d+95)
a.h(0,0,B.a.az(B.a.j(r+q+1,1),32))
s=B.a.az(B.a.j(q+p+1,1),32)
a.h(0,32,s)
a.h(0,2,s)
s=B.a.az(B.a.j(p+o+1,1),32)
a.h(0,64,s)
a.h(0,34,s)
a.h(0,1,A.F(r,q,p))
s=A.F(q,p,o)
a.h(0,33,s)
a.h(0,3,s)
s=A.F(p,o,o)
a.h(0,65,s)
a.h(0,35,s)
a.h(0,99,o)
a.h(0,98,o)
a.h(0,97,o)
a.h(0,96,o)
a.h(0,66,o)
a.h(0,67,o)},
qk(a){var s=J.c(a.a,a.d+-1),r=J.c(a.a,a.d+31),q=J.c(a.a,a.d+63),p=J.c(a.a,a.d+95),o=J.c(a.a,a.d+-33),n=J.c(a.a,a.d+-32),m=J.c(a.a,a.d+-31),l=J.c(a.a,a.d+-30),k=B.a.az(B.a.j(s+o+1,1),32)
a.h(0,34,k)
a.h(0,0,k)
k=B.a.az(B.a.j(r+s+1,1),32)
a.h(0,66,k)
a.h(0,32,k)
k=B.a.az(B.a.j(q+r+1,1),32)
a.h(0,98,k)
a.h(0,64,k)
a.h(0,96,B.a.az(B.a.j(p+q+1,1),32))
a.h(0,3,A.F(n,m,l))
a.h(0,2,A.F(o,n,m))
k=A.F(s,o,n)
a.h(0,35,k)
a.h(0,1,k)
k=A.F(r,s,o)
a.h(0,67,k)
a.h(0,33,k)
k=A.F(q,r,s)
a.h(0,99,k)
a.h(0,65,k)
a.h(0,97,A.F(p,q,r))},
qG(a){var s
for(s=0;s<16;++s)a.bg(s*32,16,a,-32)},
qE(a){var s,r,q,p,o
for(s=0,r=16;r>0;--r){q=J.c(a.a,a.d+(s-1))
p=a.a
o=a.d+s
J.br(p,o,o+16,q)
s+=32}},
jB(a,b){var s,r,q
for(s=0;s<16;++s){r=b.a
q=b.d+s*32
J.br(r,q,q+16,a)}},
qw(a){var s,r
for(s=16,r=0;r<16;++r)s+=J.c(a.a,a.d+(-1+r*32))+J.c(a.a,a.d+(r-32))
A.jB(B.a.j(s,5),a)},
qy(a){var s,r
for(s=8,r=0;r<16;++r)s+=J.c(a.a,a.d+(-1+r*32))
A.jB(B.a.j(s,4),a)},
qx(a){var s,r
for(s=8,r=0;r<16;++r)s+=J.c(a.a,a.d+(r-32))
A.jB(B.a.j(s,4),a)},
qz(a){A.jB(128,a)},
qH(a){var s
for(s=0;s<8;++s)a.bg(s*32,8,a,-32)},
qF(a){var s,r,q,p,o
for(s=0,r=0;r<8;++r){q=J.c(a.a,a.d+(s-1))
p=a.a
o=a.d+s
J.br(p,o,o+8,q)
s+=32}},
jC(a,b){var s,r,q
for(s=0;s<8;++s){r=b.a
q=b.d+s*32
J.br(r,q,q+8,a)}},
qA(a){var s,r
for(s=8,r=0;r<8;++r)s+=J.c(a.a,a.d+(r-32))+J.c(a.a,a.d+(-1+r*32))
A.jC(B.a.j(s,4),a)},
qB(a){var s,r
for(s=4,r=0;r<8;++r)s+=J.c(a.a,a.d+(r-32))
A.jC(B.a.j(s,3),a)},
qC(a){var s,r
for(s=4,r=0;r<8;++r)s+=J.c(a.a,a.d+(-1+r*32))
A.jC(B.a.j(s,3),a)},
qD(a){A.jC(128,a)},
bY(a,b,c,d,e){var s=b+c+d*32,r=J.c(a.a,a.d+s)+B.a.j(e,3)
if(!((r&-256)>>>0===0))r=r<0?0:255
a.h(0,s,r)},
jA(a,b,c,d,e){A.bY(a,0,0,b,c+d)
A.bY(a,0,1,b,c+e)
A.bY(a,0,2,b,c-e)
A.bY(a,0,3,b,c-d)},
qn(){var s,r,q,p
if(!$.nI){for(s=-255;s<=255;++s){r=$.il()
q=255+s
p=s<0?-s:s
r.$flags&2&&A.b(r)
r[q]=p
p=$.lr()
r=B.a.j(r[q],1)
p.$flags&2&&A.b(p)
p[q]=r}for(s=-1020;s<=1020;++s){r=$.ls()
if(s<-128)q=-128
else q=s>127?127:s
r.$flags&2&&A.b(r)
r[1020+s]=q}for(s=-112;s<=112;++s){r=$.lt()
if(s<-16)q=-16
else q=s>15?15:s
r.$flags&2&&A.b(r)
r[112+s]=q}for(s=-255;s<=510;++s){r=$.aI()
if(s<0)q=0
else q=s>255?255:s
r.$flags&2&&A.b(r)
r[255+s]=q}$.nI=!0}},
jy:function jy(){},
qi(){var s,r=J.ar(3,t.D)
for(s=0;s<3;++s)r[s]=new Uint8Array(11)
return new A.eZ(r)},
qX(){var s,r,q,p,o=new Uint8Array(3),n=J.ar(4,t.ac)
for(s=t.e6,r=0;r<4;++r){q=J.ar(8,s)
for(p=0;p<8;++p)q[p]=A.qi()
n[r]=q}B.f.aF(o,0,3,255)
return new A.jH(o,n)},
jD:function jD(){this.d=$},
jG:function jG(){},
jI:function jI(a,b){var _=this
_.b=_.a=!1
_.c=!0
_.d=a
_.e=b},
eZ:function eZ(a){this.a=a},
jH:function jH(a,b){this.a=a
this.b=b},
jz:function jz(a,b){var _=this
_.a=$
_.b=null
_.d=_.c=$
_.e=a
_.f=b},
bH:function bH(){var _=this
_.b=_.a=0
_.c=!1
_.d=0},
f1:function f1(){this.b=this.a=0},
hZ:function hZ(a,b,c){this.a=a
this.b=b
this.c=c},
f2:function f2(a,b){var _=this
_.a=a
_.b=$
_.c=b
_.e=_.d=null
_.f=$},
f3:function f3(a,b,c){this.a=a
this.b=b
this.c=c},
md(a,b){var s,r=A.k([],t.c),q=A.k([],t.ip),p=new Uint32Array(2),o=new A.hX(a,p)
p=o.e=J.a4(B.p.gA(p),0,null)
s=a.G()
p.$flags&2&&A.b(p)
if(0>=p.length)return A.a(p,0)
p[0]=s
s=a.G()
p.$flags&2&&A.b(p)
if(1>=p.length)return A.a(p,1)
p[1]=s
s=a.G()
p.$flags&2&&A.b(p)
if(2>=p.length)return A.a(p,2)
p[2]=s
s=a.G()
p.$flags&2&&A.b(p)
if(3>=p.length)return A.a(p,3)
p[3]=s
s=a.G()
p.$flags&2&&A.b(p)
if(4>=p.length)return A.a(p,4)
p[4]=s
s=a.G()
p.$flags&2&&A.b(p)
if(5>=p.length)return A.a(p,5)
p[5]=s
s=a.G()
p.$flags&2&&A.b(p)
if(6>=p.length)return A.a(p,6)
p[6]=s
s=a.G()
p.$flags&2&&A.b(p)
if(7>=p.length)return A.a(p,7)
p[7]=s
o.b=!1
return new A.f0(o,b,r,q)},
bZ(a,b){return B.a.j(a+B.a.S(1,b)-1,b)},
f0:function f0(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=null
_.w=_.r=_.f=0
_.x=null
_.Q=_.z=_.y=0
_.as=null
_.at=0
_.ax=c
_.ay=null
_.ch=d
_.CW=0
_.cx=null
_.cy=$
_.db=0
_.dx=null
_.fr=_.dy=0},
hd:function hd(a,b,c,d){var _=this
_.b=a
_.c=b
_.d=null
_.w=_.r=_.f=0
_.x=null
_.Q=_.z=_.y=0
_.as=null
_.at=0
_.ax=c
_.ay=null
_.ch=d
_.CW=0
_.cx=null
_.cy=$
_.db=0
_.dx=null
_.fr=_.dy=0},
hX:function hX(a,b){var _=this
_.a=0
_.b=!0
_.c=a
_.d=b
_.e=$},
jE:function jE(a,b){this.a=a
this.b=b},
bI(a,b){return((a^b)>>>1&2139062143)+((a&b)>>>0)},
cF(a){if(a<0)return 0
if(a>255)return 255
return a},
jF(a,b,c){return Math.abs(b-c)-Math.abs(a-c)},
qI(a,b,c){return 4278190080},
qJ(a,b,c){return a},
qO(a,b,c){if(!(c>=0&&c<b.length))return A.a(b,c)
return b[c]},
qP(a,b,c){var s=c+1
if(!(s>=0&&s<b.length))return A.a(b,s)
return b[s]},
qQ(a,b,c){var s=c-1
if(!(s>=0&&s<b.length))return A.a(b,s)
return b[s]},
qR(a,b,c){var s,r,q=b.length
if(!(c>=0&&c<q))return A.a(b,c)
s=b[c]
r=c+1
if(!(r<q))return A.a(b,r)
return A.bI(A.bI(a,b[r]),s)},
qS(a,b,c){var s=c-1
if(!(s>=0&&s<b.length))return A.a(b,s)
return A.bI(a,b[s])},
qT(a,b,c){if(!(c>=0&&c<b.length))return A.a(b,c)
return A.bI(a,b[c])},
qU(a,b,c){var s=c-1,r=b.length
if(!(s>=0&&s<r))return A.a(b,s)
s=b[s]
if(!(c>=0&&c<r))return A.a(b,c)
return A.bI(s,b[c])},
qV(a,b,c){var s,r,q=b.length
if(!(c>=0&&c<q))return A.a(b,c)
s=b[c]
r=c+1
if(!(r<q))return A.a(b,r)
return A.bI(s,b[r])},
qK(a,b,c){var s,r,q=c-1,p=b.length
if(!(q>=0&&q<p))return A.a(b,q)
q=b[q]
if(!(c>=0&&c<p))return A.a(b,c)
s=b[c]
r=c+1
if(!(r<p))return A.a(b,r)
r=b[r]
return A.bI(A.bI(a,q),A.bI(s,r))},
qL(a,b,c){var s,r,q=b.length
if(!(c>=0&&c<q))return A.a(b,c)
s=b[c]
r=c-1
if(!(r>=0&&r<q))return A.a(b,r)
r=b[r]
return A.jF(s>>>24,a>>>24,r>>>24)+A.jF(s>>>16&255,a>>>16&255,r>>>16&255)+A.jF(s>>>8&255,a>>>8&255,r>>>8&255)+A.jF(s&255,a&255,r&255)<=0?s:a},
qM(a,b,c){var s,r,q=b.length
if(!(c>=0&&c<q))return A.a(b,c)
s=b[c]
r=c-1
if(!(r>=0&&r<q))return A.a(b,r)
r=b[r]
return(A.cF((a>>>24)+(s>>>24)-(r>>>24))<<24|A.cF((a>>>16&255)+(s>>>16&255)-(r>>>16&255))<<16|A.cF((a>>>8&255)+(s>>>8&255)-(r>>>8&255))<<8|A.cF((a&255)+(s&255)-(r&255)))>>>0},
qN(a,b,c){var s,r,q,p,o,n=b.length
if(!(c>=0&&c<n))return A.a(b,c)
s=b[c]
r=c-1
if(!(r>=0&&r<n))return A.a(b,r)
r=b[r]
q=A.bI(a,s)
s=q>>>24
n=q>>>16&255
p=q>>>8&255
o=q>>>0&255
return(A.cF(s+B.a.V(s-(r>>>24),2))<<24|A.cF(n+B.a.V(n-(r>>>16&255),2))<<16|A.cF(p+B.a.V(p-(r>>>8&255),2))<<8|A.cF(o+B.a.V(o-(r&255),2)))>>>0},
cE:function cE(a,b){this.a=a
this.b=b},
hY:function hY(a){var _=this
_.a=a
_.c=_.b=0
_.d=null
_.e=0},
jK:function jK(a,b,c){var _=this
_.a=a
_.b=b
_.c=c
_.f=_.e=_.d=0
_.r=1
_.w=!1
_.x=$
_.y=!1},
f4:function f4(){},
he:function he(a,b,c){var _=this
_.a=a
_.b=b
_.e=c
_.f=$
_.r=1
_.x=_.w=$},
lC(a){var s,r=J.bQ(a,t.a6)
for(s=0;s<a;++s)r[s]=new A.fU()
return new A.e8(r,0)},
pv(){var s,r,q=J.ar(5,t.lJ)
for(s=0;s<5;++s)q[s]=A.lC(0)
r=J.ar(64,t.lq)
for(s=0;s<64;++s)r[s]=new A.fV()
return new A.e7(q,r)},
fU:function fU(){this.b=this.a=0},
fV:function fV(){this.b=this.a=0},
e8:function e8(a,b){this.a=a
this.b=b},
e7:function e7(a,b){var _=this
_.a=a
_.b=!1
_.c=0
_.e=_.d=!1
_.f=b},
e9:function e9(){var _=this
_.b=_.a=null
_.e=_.d=0},
fW:function fW(a){this.a=a
this.b=null},
dE:function dE(a,b){this.a=a
this.b=b},
dF:function dF(a,b){var _=this
_.b=_.a=0
_.e=_.d=!1
_.f=a
_.w=""
_.z=b
_.as=0
_.at=null
_.ch=_.ay=0},
ei:function ei(a,b){var _=this
_.b=_.a=0
_.e=_.d=!1
_.f=a
_.w=""
_.z=b
_.as=0
_.at=null
_.ch=_.ay=0},
jL:function jL(){this.b=this.a=null},
n0(a){return new A.d6(a.a,a.b,B.f.h0(a.c,0))},
fX:function fX(a,b){this.a=a
this.b=b},
d6:function d6(a,b,c){this.a=a
this.b=b
this.c=c},
P(a,b,c,d,e,f,g,h,i,j,k,l,m){var s,r=new A.bw(null,null,null,a,h,e,d,0)
B.c.I(r.gaH(),r)
r.c=g
if(b!=null)r.e=A.dZ(b)
s=!1
if(j==null)if(m)s=r.gM()===B.w||r.gM()===B.B||r.gM()===B.C||r.gM()===B.e||r.gM()===B.l
r.es(l,f,c,i,s?r.hL(c,k,i):j)
return r},
h0(a,b,c,d){var s,r,q,p=null,o=a.e
o=o==null?p:A.dZ(o)
s=a.c
s=s==null?p:A.n0(s)
r=a.w
q=a.r
o=new A.bw(p,s,o,p,q,r,a.y,a.z)
o.hg(a,b,c,d)
return o},
bP(a,b,c){var s,r,q,p,o=null,n=a.a
n=n==null?o:n.ao(c)
s=a.e
s=s==null?o:A.dZ(s)
r=a.c
r=r==null?o:A.n0(r)
q=a.w
p=a.r
n=new A.bw(n,r,s,o,p,q,a.y,a.z)
n.hf(a,b,c)
return n},
fT:function fT(a,b){this.a=a
this.b=b},
bw:function bw(a,b,c,d,e,f,g,h){var _=this
_.a=a
_.b=null
_.c=b
_.d=null
_.e=c
_.f=d
_.r=e
_.w=f
_.x=$
_.y=g
_.z=h},
iM:function iM(a,b){this.a=a
this.b=b},
iL:function iL(){},
al:function al(){},
pw(a,b,c){return new A.dc(new Uint16Array(a*b*c),a,b,c)},
dc:function dc(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
px(a,b,c){return new A.dd(new Float32Array(a*b*c),a,b,c)},
dd:function dd(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
eb:function eb(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
ec:function ec(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
ed:function ed(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
ee:function ee(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
de:function de(a,b,c,d,e,f){var _=this
_.d=a
_.e=b
_.f=c
_.r=null
_.a=d
_.b=e
_.c=f},
df:function df(a,b,c,d,e){var _=this
_.d=a
_.e=b
_.a=c
_.b=d
_.c=e},
dg:function dg(a,b,c,d,e,f){var _=this
_.d=a
_.e=b
_.f=c
_.r=null
_.a=d
_.b=e
_.c=f},
py(a,b,c){return new A.dh(new Uint32Array(a*b*c),a,b,c)},
dh:function dh(a,b,c,d){var _=this
_.d=a
_.a=b
_.b=c
_.c=d},
di:function di(a,b,c,d,e,f){var _=this
_.d=a
_.e=b
_.f=c
_.r=null
_.a=d
_.b=e
_.c=f},
nb(a,b,c){return new A.dj(new Uint8Array(a*b*c),null,a,b,c)},
dj:function dj(a,b,c,d,e){var _=this
_.d=a
_.e=b
_.a=c
_.b=d
_.c=e},
ej:function ej(a,b){this.a=a
this.b=b},
aW:function aW(){},
eE:function eE(a,b,c){this.c=a
this.a=b
this.b=c},
eF:function eF(a,b,c){this.c=a
this.a=b
this.b=c},
eG:function eG(a,b,c){this.c=a
this.a=b
this.b=c},
eH:function eH(a,b,c){this.c=a
this.a=b
this.b=c},
eI:function eI(a,b,c){this.c=a
this.a=b
this.b=c},
eJ:function eJ(a,b,c){this.c=a
this.a=b
this.b=c},
eK:function eK(a,b,c){this.c=a
this.a=b
this.b=c},
eL:function eL(a,b,c){this.c=a
this.a=b
this.b=c},
nr(a){return new A.ba(new Uint8Array(A.z(a.c)),a.a,a.b)},
ba:function ba(a,b,c){this.c=a
this.a=b
this.b=c},
lQ(a){return new A.cn(-1,0,-a.c,a)},
cn:function cn(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lR(a){return new A.co(-1,0,-a.c,a)},
co:function co(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lS(a){return new A.cp(-1,0,-a.c,a)},
cp:function cp(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lT(a){return new A.cq(-1,0,-a.c,a)},
cq:function cq(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lU(a){return new A.cr(-1,0,-a.c,a)},
cr:function cr(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
lV(a){return new A.cs(-1,0,-a.c,a)},
cs:function cs(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
bb(a,b,c,d,e){a.a1(b-1,c)
return new A.hx(a,b,b+d-1,c+e-1)},
hx:function hx(a,b,c,d){var _=this
_.a=a
_.b=b
_.d=c
_.e=d},
eM(a){return new A.ct(-1,0,0,-1,0,a)},
ct:function ct(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
lW(a){return new A.cu(-1,0,-a.c,a)},
cu:function cu(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eN(a){return new A.cv(-1,0,0,-2,0,a)},
cv:function cv(a,b,c,d,e,f){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f},
lX(a){return new A.cw(-1,0,-a.c,a)},
cw:function cw(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
eO(a){return new A.cx(-1,0,0,-(a.c<<2>>>0),a)},
cx:function cx(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
j6(a){return new A.cy(-1,0,-a.c,a)},
cy:function cy(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
J:function J(){},
tL(a,b){switch(b.a){case 0:A.fx(a)
break
case 1:A.tN(a)
break
case 2:A.tM(a)
break}return a},
tN(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=null,c=a.gaH().length
for(s=t.g,r=0;r<c;++r){q=a.x
if(q===$)q=a.x=A.k([],s)
if(!(r<q.length))return A.a(q,r)
p=q[r]
o=p.a
n=o==null
m=n?d:o.a
if(m==null)m=0
l=n?d:o.b
if(l==null)l=0
k=B.a.V(l,2)
o=a.a
if((o==null?d:o.gT())!=null)for(j=l-1,i=0;i<k;++i,--j)for(h=0;h<m;++h){o=p.a
g=o==null?d:o.O(h,i,d)
if(g==null)g=new A.J()
o=p.a
f=o==null?d:o.O(h,j,d)
if(f==null)f=new A.J()
e=g.gP()
g.sP(f.gP())
f.sP(e)}else for(j=l-1,i=0;i<k;++i,--j)for(h=0;h<m;++h){o=p.a
g=o==null?d:o.O(h,i,d)
if(g==null)g=new A.J()
o=p.a
f=o==null?d:o.O(h,j,d)
if(f==null)f=new A.J()
e=g.gn()
g.sn(f.gn())
f.sn(e)
e=g.gt()
g.st(f.gt())
f.st(e)
e=g.gq()
g.sq(f.gq())
f.sq(e)
e=g.gv()
g.sv(f.gv())
f.sv(e)}}return a},
fx(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=null,b=a.gaH().length
for(s=t.g,r=0;r<b;++r){q=a.x
if(q===$)q=a.x=A.k([],s)
if(!(r<q.length))return A.a(q,r)
p=q[r]
o=p.a
n=o==null
m=n?c:o.a
if(m==null)m=0
l=n?c:o.b
if(l==null)l=0
k=B.a.V(m,2)
o=a.a
if((o==null?c:o.gT())!=null)for(j=m-1,i=0;i<l;++i)for(h=j,g=0;g<k;++g,--h){o=p.a
f=o==null?c:o.O(g,i,c)
if(f==null)f=new A.J()
o=p.a
e=o==null?c:o.O(h,i,c)
if(e==null)e=new A.J()
d=f.gP()
f.sP(e.gP())
e.sP(d)}else for(j=m-1,i=0;i<l;++i)for(h=j,g=0;g<k;++g,--h){o=p.a
f=o==null?c:o.O(g,i,c)
if(f==null)f=new A.J()
o=p.a
e=o==null?c:o.O(h,i,c)
if(e==null)e=new A.J()
d=f.gn()
f.sn(e.gn())
e.sn(d)
d=f.gt()
f.st(e.gt())
e.st(d)
d=f.gq()
f.sq(e.gq())
e.sq(d)
d=f.gv()
f.sv(e.gv())
e.sv(d)}}return a},
tM(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=null,a=a0.gaH().length
for(s=t.g,r=0;r<a;++r){q=a0.x
if(q===$)q=a0.x=A.k([],s)
if(!(r<q.length))return A.a(q,r)
p=q[r]
o=p.a
n=o==null
m=n?b:o.a
if(m==null)m=0
l=n?b:o.b
if(l==null)l=0
k=B.a.V(l,2)
if((n?b:o.gT())!=null)for(j=l-1,i=m-1,h=0;h<k;++h,--j)for(g=i,f=0;f<m;++f,--g){o=p.a
e=o==null?b:o.O(f,h,b)
if(e==null)e=new A.J()
o=p.a
d=o==null?b:o.O(g,j,b)
if(d==null)d=new A.J()
c=e.gP()
e.sP(d.gP())
d.sP(c)}else for(j=l-1,i=m-1,h=0;h<k;++h,--j)for(g=i,f=0;f<m;++f,--g){o=p.a
e=o==null?b:o.O(f,h,b)
if(e==null)e=new A.J()
o=p.a
d=o==null?b:o.O(g,j,b)
if(d==null)d=new A.J()
c=e.gn()
e.sn(d.gn())
d.sn(c)
c=e.gt()
e.st(d.gt())
d.st(c)
c=e.gq()
e.sq(d.gq())
d.sq(c)
c=e.gv()
e.sv(d.gv())
d.sv(c)}}return a0},
iD:function iD(a,b){this.a=a
this.b=b},
o(a){return new A.iK(a)},
iK:function iK(a){this.a=a},
t(a,b,c,d){var s=J.a6(a),r=s.gu(a)
s=c==null?s.gu(a):d+c
return new A.am(a,d,Math.min(r,s),d,b)},
p(a,b,c){var s=a.a,r=a.d,q=a.b,p=J.bl(s),o=b==null?a.c:a.d+c+b
return new A.am(s,q,Math.min(p,o),r+c,a.e)},
am:function am(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
eD(a,b){return new A.j5(a,new Uint8Array(b))},
j5:function j5(a,b){this.a=0
this.b=a
this.c=b},
dw:function dw(a,b){this.a=a
this.b=b},
aY:function aY(a,b,c){this.a=a
this.b=b
this.c=c},
ji:function ji(){},
jh:function jh(){},
cA:function cA(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
qb(a,b,c){var s,r,q,p,o,n,m,l
if(b<24||c<24||a.length<b*c*3)return B.k4
s=b*c
r=new Float32Array(s)
q=new Float32Array(s)
p=new Float32Array(s)
o=new Float32Array(s)
n=new A.jY(b,c,r,q,p,o,new Float32Array(s))
n.ho(a,b,c)
s=t.N
m=A.H(s,t.p)
l=A.k([],t.eH)
r=A.rS(A.rQ(n,m,l),l,n)
q=t.X
p=t.lb.a(A.aL(["regions",m],s,q))
q=A.ck(r.d,s,q)
q.c2(0,p)
s=r.a
if(s!=null)s=new A.be(s,null,9,q)
else{s=r.b
s.toString
q=new A.be(null,s,r.c,q)
s=q}return s},
tf(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h=b*c,g=new Float32Array(h),f=new Float32Array(h)
for(s=a.length,r=b-1,q=0;q<c;++q)for(p=q*b,o=0;o<b;++o){n=Math.max(0,o-d)
m=Math.min(r,o+d)
for(l=n,k=0;l<=m;++l){j=p+l
if(!(j>=0&&j<s))return A.a(a,j)
i=a[j]
if(i>k)k=i}j=p+o
if(!(j>=0&&j<h))return A.a(g,j)
g[j]=k}for(s=c-1,o=0;o<b;++o)for(q=0;q<c;++q){n=Math.max(0,q-d)
m=Math.min(s,q+d)
for(l=n,k=0;l<=m;++l){r=l*b+o
if(!(r>=0&&r<h))return A.a(g,r)
i=g[r]
if(i>k)k=i}r=q*b+o
if(!(r>=0&&r<h))return A.a(f,r)
f[r]=k}return f},
rM(a,b,c){var s,r,q,p,o,n,m,l,k,j,i=b*c,h=new Uint8Array(i)
for(s=a.length,r=0;r<c;++r)for(q=r*b,p=0;p<b;++p){o=q+p
if(!(o>=0&&o<s))return A.a(a,o)
if(a[o]===0)continue
for(n=-1;n<=1;++n){m=r+n
if(m<0||m>=c)continue
for(o=m*b,l=-1;l<=1;++l){k=p+l
if(k>=0&&k<b){j=o+k
if(!(j>=0&&j<i))return A.a(h,j)
h[j]=1}}}}return h},
mv(a){var s,r,q,p,o
for(s=a.length,r=0,q=0;q<s;){p=a[q];++q
o=a[q%s]
r+=p.a*o.b-o.a*p.b}return r/2},
rQ(b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=b4.a,a8=b4.b,a9=a7*a8,b0=Math.max(a7,a8),b1=b4.c,b2=A.tf(b1,a7,a8,8),b3=new Uint8Array(a9)
for(s=b1.length,r=b4.d,q=r.length,p=b2.length,o=a7-3,n=a8-3,m=2*a7,l=0;l<a8;++l)for(k=l*a7,j=l>=2,i=l>n,h=0;h<a7;++h){g=k+h
if(!(g>=0&&g<q))return A.a(r,g)
if(r[g]>=0.45){if(!(g<s))return A.a(b1,g)
f=b1[g]>=0.12}else f=!1
if(!(g<s))return A.a(b1,g)
e=b1[g]
if(!(e<0.09))if(!f){if(!(g<p))return A.a(b2,g)
d=b2[g]
d=e<0.38*d&&d>0.15}else d=!1
else d=!0
if(d){if(!(g<a9))return A.a(b3,g)
b3[g]=1
continue}if(h<2||!j||h>o||i)continue
d=g-2
if(!(d>=0&&d<s))return A.a(b1,d)
d=b1[d]
c=g+2
if(!(c<s))return A.a(b1,c)
if(!(e<0.72*Math.min(d,b1[c]))){d=g-m
if(!(d>=0&&d<s))return A.a(b1,d)
d=b1[d]
c=g+m
if(!(c>=0&&c<s))return A.a(b1,c)
c=e<0.72*Math.min(d,b1[c])
e=c}else e=!0
if(e){if(!(g<a9))return A.a(b3,g)
b3[g]=1
continue}e=new A.kL(b4)
d=e.$2(g-1,g+1)
e=e.$2(g-a7,g+a7)
if(Math.max(A.l_(d),A.l_(e))>15){if(!(g<a9))return A.a(b3,g)
b3[g]=1}}b=new Int32Array(a9)
a=A.k([],t.eg)
a0=Math.max(60,B.b.ap(a9*0.0004))
a1=B.b.ap(a9*0.12)
a2=new Uint8Array(a9)
a3=new A.kw(a2,a9,b,new Int32Array(8),a7,a8,a0,b5,b6,b0,a1,a)
a3.$2(b3,0)
for(a4=b3,a5=0;a5<2;++a5){a6=B.du[a5]
a4=A.rM(a4,a7,a8)
a3.$2(a4,a6)}return a},
mo(a,b,c){var s
A:{if(0===a){s=b
break A}if(1===a){s=c
break A}if(2===a){s=b+c
break A}s=b-c
break A}return s},
mq(a9,b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=a9.length
if(a8<4)return null
if(b1)s=a8>=6||b0
else s=!1
r=J.bQ(8,t.H)
for(a8=t.i,q=0;q<8;++q)r[q]=A.K(9,0,!1,a8)
for(p=a9.length,o=t.g2,n=0;n<a9.length;a9.length===p||(0,A.V)(a9),++n){m=a9[n].a
l=m[0]
k=m[1]
j=m[2]
i=m[3]
m=-l
h=-k
for(m=[new A.a_(A.k([l,k,1,0,0,0,m*j,h*j],o),j),new A.a_(A.k([0,0,0,l,k,1,m*i,h*i],o),i)],g=0;g<2;++g){h=m[g]
f=h.a
e=h.b
for(h=J.ai(f),d=0;d<8;++d){for(c=0;c<8;++c){b=r[d]
B.c.h(b,c,b[c]+h.m(f,d)*h.m(f,c))}b=r[d]
B.c.h(b,8,b[8]+h.m(f,d)*e)}}}p=r[6]
o=p[6]
B.c.h(p,6,o+(s?1e-9:1e6))
p=r[7]
o=p[7]
B.c.h(p,7,o+(s?1e-9:1e6))
for(a=0;a<8;a=a0){for(a0=a+1,a1=a0,a2=a;a1<8;++a1){p=r[a1][a]
if(!(a2>=0&&a2<8))return A.a(r,a2)
if(Math.abs(p)>Math.abs(r[a2][a]))a2=a1}if(!(a2>=0&&a2<8))return A.a(r,a2)
p=r[a2]
if(Math.abs(p[a])<1e-12)return null
a3=r[a]
r[a]=p
r[a2]=a3
for(a1=a0;a1<8;++a1){p=r[a1]
o=p[a]
m=r[a]
a4=o/m[a]
for(a5=a;a5<9;++a5)B.c.h(p,a5,p[a5]-a4*m[a5])}}a6=A.K(8,0,!1,a8)
for(d=7;d>=0;--d){a8=r[d]
a7=a8[8]
for(c=d+1;c<8;++c)a7-=a8[c]*a6[c]
B.c.h(a6,d,a7/a8[d])}if(B.c.dO(a6,new A.kR()))return null
return new A.kd(a6)},
rc(a,b,c,d,e,f,g,h,i,j,k){return new A.bp(k,a,b,c,d,e,f,g,h,i,j,A.K(9,!1,!1,t.y),B.bK)},
oc(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i=t.p,h=A.K(9,-1,!1,i),g=A.K(9,1/0,!1,t.i),f=A.H(i,i)
for(s=0;s<9;++s){if(!(s<b.length))return A.a(b,s)
r=b[s]
q=r.a
p=r.b
for(o=c,n=-1,m=0;m<a.length;++m){i=a[m]
l=i.c/d
if(l<0.5||l>1.9)continue
i=Math.pow(i.a-q,2)
if(!(m<a.length))return A.a(a,m)
k=Math.sqrt(i+Math.pow(a[m].b-p,2))
if(k<o){o=k
n=m}}if(n<0)continue
j=f.m(0,n)
if(j!=null){if(j>>>0!==j||j>=9)return A.a(g,j)
if(g[j]<=o)continue
B.c.h(h,j,-1)}f.h(0,n,s)
B.c.h(h,s,n)
B.c.h(g,s,o)}return h},
o6(a){var s,r=t.p,q=A.nl(r),p=A.nl(r)
for(s=0;s<9;++s){if(a[s]<0)continue
q.I(0,B.a.V(s,3))
p.I(0,B.a.Y(s,3))}return new A.a_(q.a,p.a)},
oe(a,b){var s,r,q,p,o=A.k([],t.a3)
for(s=0;s<9;++s){r=b[s]
if(r>=0){q=B.a.Y(s,3)
p=B.a.V(s,3)
if(!(r<a.length))return A.a(a,r)
r=a[r]
o.push(new A.aC([(q+0.5)/3,(p+0.5)/3,r.a,r.b]))}}return o},
rP(c8,c9,d0,d1,d2,d3,d4,d5,d6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7=null
if(!(c9<c8.length))return A.a(c8,c9)
s=c8[c9]
r=Math.sqrt(d0*d0+d1*d1)
q=Math.sqrt(d2*d2+d3*d3)
p=t.f
o=A.k([],p)
for(n=s.a,m=s.b,l=0;l<3;++l)for(k=l-d4,j=k*d2,k*=d3,i=0;i<3;++i){h=i-d5
o.push(new A.a_(n+h*d0+j,m+h*d1+k))}n=s.c
g=A.oc(c8,o,0.42*((r+q)/2),n)
for(f=c7,e=0;e<4;++e,f=c,g=a){d=A.o6(g)
r=A.oe(c8,g)
c=A.mq(r,!1,d.a===3&&d.b===3)
if(c==null)return c7
b=c.gdZ()
if(!isFinite(b)||b<=0)return c7
r=A.k([],p)
for(l=0;l<3;++l)for(q=(l+0.5)/3,i=0;i<3;++i)r.push(c.aB(0,(i+0.5)/3,q))
a=A.oc(c8,r,(e===0?0.36:0.3)*b,n)
for(a0=!0,a1=0;a1<9;++a1)if(a[a1]!==g[a1])a0=!1
if(a0){f=c
g=a
break}}f.toString
a2=A.o4(c8,g,f,d6)
r=t.n
q=A.k([],r)
for(a3=0;a3<9;++a3){a4=a2[a3]
if(a4!=null)q.push(a4.a)}B.c.bV(q)
p=q.length
o=p/2|0
if(!(o<p))return A.a(q,o)
a5=q[o]
r=A.k([],r)
for(a1=0;a1<9;++a1){q=a2[a1]
if(q!=null){p=g[a1]
if(!(p>=0&&p<c8.length))return A.a(c8,p)
p=!c8[p].y}else p=!1
if(p)r.push(q.a)}B.c.bV(r)
q=r.length
if(q!==0){p=q/2|0
if(!(p<q))return A.a(r,p)
a6=r[p]<0.85}else a6=!1
for(a1=0;a1<9;++a1){a7=a2[a1]
if(a7==null)continue
if(a6){r=g[a1]
if(!(r>=0&&r<c8.length))return A.a(c8,r)
r=c8[r].y}else r=!1
if(r){B.c.h(g,a1,-1)
continue}a8=a7.a/a5
if(a7.b>1.4||a8<0.77||a8>1.3)B.c.h(g,a1,-1)}a9=A.o6(g)
b0=a9.a
b1=a9.b
b2=A.oe(c8,g)
b3=A.mq(b2,!1,b0===3&&b1===3)
if(b3==null)return c7
b=b3.gdZ()
b4=b2.length
if(b4<4||!isFinite(b)||b<=0)return c7
for(b5=0,a1=0;a1<9;++a1){if(g[a1]<0)continue
r=B.a.V(a1,3)
b6=b3.aB(0,(B.a.Y(a1,3)+0.5)/3,(r+0.5)/3)
r=g[a1]
if(!(r>=0&&r<c8.length))return A.a(c8,r)
r=Math.pow(c8[r].a-b6.a,2)
q=g[a1]
if(!(q>=0&&q<c8.length))return A.a(c8,q)
b5+=r+Math.pow(c8[q].b-b6.b,2)}b7=Math.sqrt(b5/b4)/b
if(b7>0.3)return c7
r=A.W(g)
b8=new A.eq(new A.aB(g,r.l("G(1)").a(new A.kt()),r.l("aB<1>")),r.l("j(1)").a(new A.ku(c8)),r.l("eq<1,j>")).kg(0,new A.kv())/b4
for(r=0.3*b,b9=0,l=-1;l<=3;++l)for(q=(l+0.5)/3,p=l>=0,o=l<=2,i=-1;i<=3;++i){if(p&&o&&i>=0&&i<=2)continue
c0=b3.aB(0,(i+0.5)/3,q)
c1=c0.a
c2=c0.b
for(n=c8.length,a3=0;a3<c8.length;c8.length===n||(0,A.V)(c8),++a3){c3=c8[a3]
a8=c3.c/b8
if(a8<0.7||a8>1.4)continue
if(Math.sqrt(Math.pow(c3.a-c1,2)+Math.pow(c3.b-c2,2))<r){c4=b9+1
b9=c4
break}}}for(c5=0,a3=0;a3<9;++a3){a1=g[a3]
if(a1>=0){if(!(a1<c8.length))return A.a(c8,a1)
c5+=Math.pow(c8[a1].c-b8,2)}}c6=Math.sqrt(c5/b4)/b8
a7=A.tq(c8,g,b3,d6)
return A.rc(g,b4,b7,b3,b,b4-12*b7-6*c6-0.25*b9+0.5*Math.min(1,b/0.25)-4*(a7.c-1),b0,b1,b9,c6,a7)},
o4(b1,b2,b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=A.K(9,null,!1,t.cn)
for(s=0;s<9;++s){r=b2[s]
if(r<0)continue
if(!(r<b1.length))return A.a(b1,r)
q=b1[r]
p=(B.a.Y(s,3)+0.5)/3
o=(B.a.V(s,3)+0.5)/3
n=b3.aB(0,p-0.16666666666666666,o)
m=b3.aB(0,p+0.16666666666666666,o)
l=b3.aB(0,p,o-0.16666666666666666)
k=b3.aB(0,p,o+0.16666666666666666)
j=(m.a-n.a)*b4
i=(m.b-n.b)*b4
h=(k.a-l.a)*b4
g=(k.b-l.b)*b4
f=(j*j+h*h)/12
e=(i*i+g*g)/12
d=(j*i+h*g)/12
c=f*e-d*d
if(c<=1e-9){B.c.h(b0,s,B.jX)
continue}b=e/c
a=f/c
a0=-d/c
r=q.r
a1=q.x
a2=a0*a1
a3=b*r+a2
a4=q.w
a5=a2+a*a4
a6=a3+a5
a7=Math.sqrt(Math.max(0,a6*a6/4-(a3*a5-(b*a1+a0*a4)*(a0*r+a*a1))))
a1=a6/2
a8=a1+a7
a9=Math.max(1e-9,a1-a7)
B.c.h(b0,s,new A.a_(Math.pow(Math.max(1e-12,a8*a9),0.25),Math.sqrt(a8/a9)))}return b0},
tq(a,b,c,d){var s,r,q,p,o,n=A.k([],t.n)
for(s=A.o4(a,b,c,d),r=1,q=0;q<9;++q){p=s[q]
if(p==null)continue
B.c.I(n,p.a)
r=Math.max(r,p.b)}B.c.bV(n)
s=n.length
o=s/2|0
if(!(o<s))return A.a(n,o)
return new A.i8(n[o],B.c.gdY(n)/Math.max(1e-9,B.c.gdV(n)),r)},
ob(a,b,c,d){var s,r,q,p=b*d-0.5,o=c*d-0.5
if(p<0||o<0||p>a.a-1||o>a.b-1)return null
s=B.b.bq(p)
r=B.b.bq(o)
q=new A.kT(r,a,s,p-s,Math.min(a.a-1,s+1),Math.min(a.b-1,r+1),o-r)
return new A.aQ(q.$1(a.e),q.$1(a.f),q.$1(a.r))},
mn(a,b){var s=(a.a-b.a)*0.5,r=a.b-b.b,q=a.c-b.c
return Math.sqrt(s*s+r*r+q*q)},
mu(a){var s=new A.kX(),r=A.W(a),q=r.l("j(1)")
r=r.l("ao<1,j>")
return new A.aQ(s.$1(new A.ao(a,q.a(new A.kU()),r)),s.$1(new A.ao(a,q.a(new A.kV()),r)),s.$1(new A.ao(a,q.a(new A.kW()),r)))},
o3(a,b,c,d,e){var s,r,q,p,o,n,m,l,k,j=A.k([],t.kb)
for(s=d+0.5,r=c+0.5,q=-3;q<=3;++q)for(p=(s+q*0.09)/3,o=-3;o<=3;++o){n=b.aB(0,p,(r+o*0.09)/3)
m=A.ob(a,n.a,n.b,e)
if(m!=null)B.c.I(j,m)}if(j.length===0)return B.jY
l=A.mu(j)
s=A.k([],t.n)
for(r=j.length,k=0;k<j.length;j.length===r||(0,A.V)(j),++k)s.push(A.mn(j[k],l))
B.c.bV(s)
r=s.length
p=r/2|0
if(!(p<r))return A.a(s,p)
return new A.a_(l,s[p])},
rH(b1,b2,b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5="ok",a6="reason",a7=B.a.V(b3,3),a8=B.a.Y(b3,3),a9=b2.e,b0=A.aL(["cell",b3+1],t.N,t.X)
for(s=a8/3,r=a7/3,q=(a8+1)/3,p=(a7+1)/3,p=[new A.a_(s,r),new A.a_(q,r),new A.a_(q,p),new A.a_(s,p)],s=b1.a,q=b1.b,o=0;o<4;++o){r=p[o]
n=a9.aB(0,r.a,r.b)
m=n.a
l=n.b
if(m<0||l<0||m*b4>s||l*b4>q){b0.h(0,a5,!1)
b0.h(0,a6,"outside")
return b0}}k=A.o3(b1,a9,a7,a8,b4)
j=k.a
i=k.b
b0.h(0,"spread",A.aU(B.b.aO(i,1)))
if(i>8){b0.h(0,a5,!1)
b0.h(0,a6,"not-uniform")
return b0}h=A.k([],t.s)
for(s=b2.b,r=b2.a.a>=0.85,o=0;o<4;++o){q=B.hG[o]
g=q.a
f=q.b
e=q.c
d=a7+g
c=a8+f
b=d>=0&&d<3&&c>=0&&c<3
if(b){q=d*3+c
if(!(q>=0&&q<9))return A.a(s,q)
q=s[q]>=0}else q=!1
if(q)continue
a=A.rO(b1,a9,a7,a8,g,f,b4)
a0=a.a
a1=a.b
a2=a0>=5||a1>=14
if(!a2&&b&&!b2.at&&r){a3=A.o3(b1,a9,d,c,b4)
a4=a3.b<=8&&A.mn(j,a3.a)<=6
a2=a4}else a4=!1
if(a4)q="merged"
else q=a2?a5:"none"
B.c.I(h,e+":"+q+"(dip "+B.b.aO(a0,1)+", dE "+B.b.aO(a1,1)+")")
if(!a2){b0.h(0,"edges",h)
b0.h(0,a5,!1)
b0.h(0,a6,"no-seam-"+e)
return b0}}b0.h(0,"edges",h)
b0.h(0,a5,!0)
return b0},
rO(a3,a4,a5,a6,a7,a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=A.K(13,0,!1,t.i),a=A.K(13,0,!1,t.p),a0=t.kb,a1=A.k([],a0),a2=A.k([],a0)
for(a0=a7>0,s=a8!==0,r=a5+1,q=a8>0,p=a6+1,o=0;o<5;++o){n=B.fe[o]
for(m=(a6+n)/3,l=(a5+n)/3,k=0;k<13;++k){j=-0.12+k*0.02
if(s){i=(q?p:a6)/3+a8*j
h=l}else{h=(a0?r:a5)/3+a7*j
i=m}g=a4.aB(0,i,h)
f=A.ob(a3,g.a,g.b,a9)
if(f==null)continue
B.c.h(b,k,b[k]+f.a)
B.c.h(a,k,a[k]+1)
if(j<=-0.08)B.c.I(a1,f)
if(j>=0.08)B.c.I(a2,f)}}if(a1.length===0||a2.length===0)return B.jW
e=new A.ks(b,a)
for(d=1/0,k=4;k<=8;++k){a0=a[k]
if(a0>0)d=Math.min(d,b[k]/a0)}a0=e.$2(0,2)
s=e.$2(10,12)
c=Math.min(A.l_(a0),A.l_(s))-d
c=isFinite(c)?c:0
return new A.a_(c,A.mn(A.mu(a1),A.mu(a2)))},
ty(a,b,c){var s,r,q,p,o=A.k([],t.d),n=A.K(9,!1,!1,t.y)
for(s=b.b,r=null,q=0;q<9;++q){if(s[q]>=0)continue
p=A.rH(a,b,q,c)
B.c.I(o,p)
if(J.ae(p.m(0,"ok"),!0))B.c.h(n,q,!0)
else if(r==null)r=A.ml(p.m(0,"reason"))}b.sks(n)
b.sjO(o)
return new A.a_(r==null,r)},
rS(f1,f2,f3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9=null,e0="count",e1="reason",e2=f3.a,e3=f3.b,e4=A.k([e2,e3],t.t),e5=f1.length,e6=A.W(f1),e7=e6.l("G(1)"),e8=e6.l("aB<1>"),e9=new A.aB(f1,e7.a(new A.kN()),e8).gu(0),f0=A.k([],t.bo)
for(s=t.p,e6=A.bX(f1,0,A.cJ(40,e0,s),e6.c),r=e6.$ti,e6=new A.aM(e6,e6.gu(0),r.l("aM<a5.E>")),q=t.h,r=r.l("a5.E");e6.D();){p=e6.d
if(p==null)p=r.a(p)
o=A.k([A.aU(B.b.aO(p.a,3)),A.aU(B.b.aO(p.b,3)),A.aU(B.b.aO(p.c,1))],q)
if(p.y)o.push("merged")
f0.push(o)}e6=t.N
r=t.X
n=A.aL(["analysis",e4,"blobs",e5,"mergedPieces",e9,"stickerRegions",f0],e6,r)
n.h(0,"faceRegions",f2.length)
if(new A.aB(f1,e7.a(new A.kO()),e8).gu(0)<3&&f2.length===0){e4=f1.length
r=A.ck(n,e6,r)
r.h(0,e1,"too-few-sticker-regions")
return new A.be(d9,B.al,e4,r)}m=Math.max(e2,e3)
l=A.k([],t.aQ)
for(e4=t.iq,e5=t.ew,e7=e5.l("aM<a5.E>"),e8=e5.l("a5.E"),e9=t.kY,f0=t.iY,k=0;k<f1.length;++k){j=f1[k]
i=A.k([],f0)
for(q=j.a,p=j.b,o=j.c,h=o/m,g=j.y,f=2.4*h,e=0;e<f1.length;++e){if(k===e||g)continue
d=f1[e]
if(d.y)continue
c=d.c/o
if(c<0.45||c>2.2)continue
b=d.a-q
a=d.b-p
a0=Math.sqrt(b*b+a*a)
if(a0<0.9*h||a0>f)continue
B.c.I(i,new A.aC([e,b,a,a0]))}B.c.dl(i,new A.kP())
q=A.k([],e9)
p=new A.cC(i,0,9,e5)
p.hl(i,0,9,e4)
p=new A.aM(p,p.gu(0),e7)
while(p.D()){a1=p.d
o=(a1==null?e8.a(a1):a1).a
q.push(new A.aQ(o[0],o[1],o[2]))}B.c.I(l,q)}e4=t.l6
a2=A.H(e6,e4)
for(k=0;k<f1.length;++k){if(!(k<l.length))return A.a(l,k)
a3=l[k]
for(a4=0;a4<a3.length;++a4)for(a5=0;e5=a3.length,a5<e5;++a5){if(a4===a5)continue
if(!(a4<e5))return A.a(a3,a4)
a6=a3[a4]
a7=a6.b
a8=a6.c
a9=a3[a5]
b0=a9.b
b1=a9.c
for(e5=b0-a7,e7=b1-a8,e8=a7-b0,e9=a8-b1,e9=[new A.aC([a7,a8,b0,b1]),new A.aC([a7,a8,e5,e7]),new A.aC([a7,a8,e8,e9]),new A.aC([e5,e7,b0,b1]),new A.aC([e8,e9,b0,b1])],b2=0;b2<5;++b2){e5=e9[b2].a
b3=e5[0]
b4=e5[1]
b5=e5[2]
b6=e5[3]
if(b3*b6-b4*b5<=0)continue
b7=Math.sqrt(b3*b3+b4*b4)
b8=Math.sqrt(b5*b5+b6*b6)
c=b7/b8
if(c<0.4||c>2.5)continue
if(Math.abs(b3*b5+b4*b6)/(b7*b8)>0.62)continue
if(!(k<f1.length))return A.a(f1,k)
e5=0.9*(f1[k].c/m)
if(b7<e5||b8<e5)continue
for(b9=0;b9<3;++b9)for(c0=0;c0<3;++c0){c1=A.rP(f1,k,b3,b4,b5,b6,b9,c0,m)
if(c1==null)continue
e5=c1.e
c2=e5.aB(0,0.16666666666666666,0.16666666666666666)
c3=e5.aB(0,0.8333333333333334,0.8333333333333334)
c4=""+B.b.ap(c2.a*200)+","+B.b.ap(c2.b*200)+","+B.b.ap(c3.a*200)+","+B.b.ap(c3.b*200)
c5=a2.m(0,c4)
if(c5==null||c1.r>c5.r)a2.h(0,c4,c1)}}}}e5=a2.$ti.l("ep<2>")
c6=A.u(new A.ep(a2,e5),e5.l("e.E"))
B.c.dl(c6,new A.kQ())
n.h(0,"hypotheses",c6.length)
e5=t.d
e7=A.k([],e5)
for(e8=A.bX(c6,0,A.cJ(5,e0,s),A.W(c6).c),e9=e8.$ti,e8=new A.aM(e8,e8.gu(0),e9.l("aM<a5.E>")),e9=e9.l("a5.E");e8.D();){f0=e8.d
if(f0==null)f0=e9.a(f0)
q=A.H(e6,r)
q.h(0,"seen",f0.c)
q.h(0,"rows",f0.w)
q.h(0,"cols",f0.x)
q.h(0,"rms",A.aU(B.b.aO(f0.d,3)))
q.h(0,"ring",f0.y)
q.h(0,"cv",A.aU(B.b.aO(f0.z,3)))
q.h(0,"score",A.aU(B.b.aO(f0.r,2)))
q.c2(0,f0.a.ba())
e7.push(q)}n.h(0,"top",e7)
e7=t.dx
c7=A.k([],e7)
for(e8=f2.length,e9=t.y,f0=t.a3,b2=0;b2<f2.length;f2.length===e8||(0,A.V)(f2),++b2){c8=f2[b2]
q=c8.length
if(0>=q)return A.a(c8,0)
p=c8[0]
if(1>=q)return A.a(c8,1)
o=c8[1]
if(2>=q)return A.a(c8,2)
g=c8[2]
if(3>=q)return A.a(c8,3)
q=c8[3]
c9=A.mq(A.k([new A.aC([0,0,p.a,p.b]),new A.aC([1,0,o.a,o.b]),new A.aC([1,1,g.a,g.b]),new A.aC([0,1,q.a,q.b])],f0),!0,!0)
if(c9==null)continue
d0=c9.gdZ()
if(!isFinite(d0)||d0<=0)continue
q=new A.bp(B.kO,A.K(9,-1,!1,s),0,0,c9,d0,0.5*Math.min(1,d0/0.25),0,0,0,0,A.K(9,!1,!1,e9),B.bK)
q.at=!0
B.c.I(c7,q)}if(c6.length===0&&c7.length===0){e4=A.ck(n,e6,r)
e4.h(0,e1,"no-grid-structure")
return new A.be(d9,B.al,0,e4)}e7=A.k([],e7)
for(e8=c6.length,b2=0;b2<c6.length;c6.length===e8||(0,A.V)(c6),++b2){d1=c6[b2]
if(d1.c>=4&&d1.w>=2&&d1.x>=2&&d1.d<=0.22&&d1.y<6)e7.push(d1)}d2=A.k([],e5)
e5=A.u(c7,e4)
B.c.c2(e5,A.bX(e7,0,A.cJ(24,e0,s),e4))
e4=e5.length
d3=d9
b2=0
for(;b2<e5.length;e5.length===e4||(0,A.V)(e5),++b2){c1=e5[b2]
e8=c1.c
d4=e8===9?B.jZ:A.ty(f3,c1,m)
if(!d4.a)d5=c1.w===3&&c1.x===3&&e8>=6
else d5=!0
if(!d5){if(d2.length<6)B.c.I(d2,A.aL(["seen",e8,"rows",c1.w,"cols",c1.x,"reason",d4.b,"evidence",c1.as],e6,r))
continue}if(d3==null||c1.r+0.8*c1.gdh()>d3.r+0.8*d3.gdh())d3=c1}n.h(0,"rejected",d2)
e4=d3==null
if(e4&&c6.length===0){e4=A.ck(n,e6,r)
e4.h(0,e1,"face-region-without-seams")
return new A.be(d9,B.aI,0,e4)}if(e4){d6=B.c.gdV(c6)
e4=[]
for(e5=d2.length,b2=0;b2<d2.length;d2.length===e5||(0,A.V)(d2),++b2)e4.push(d2[b2].m(0,e1))
e5=d6.c
if(e5<4||e7.length===0){e4=e5>=4
d7=e4?B.aI:B.al
d8=e4?"irregular-or-repeating-grid":"too-few-stickers"}else if(B.c.aI(e4,"outside")){d7=B.cb
d8="face-cut-by-image-border"}else{d7=B.aI
d8="cells-without-sticker-evidence"}e4=e7.length===0?e5:B.c.gdV(e7).c
r=A.ck(n,e6,r)
r.h(0,e1,d8)
return new A.be(d9,d7,e4,r)}return A.rR(d3,f1,e2,e3,m,n)},
rR(b3,b4,b5,b6,b7,b8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0={},b1=b3.e,b2=[b1.aB(0,0,0),b1.aB(0,1,0),b1.aB(0,1,1),b1.aB(0,0,1)]
for(s=0,r=-2,q=0;q<4;q=o){p=b2[B.a.Y(q,4)]
o=q+1
n=b2[o%4]
m=n.a-p.a
l=n.b-p.b
k=m/Math.sqrt(m*m+l*l)
if(k>r){r=k
s=q}}b0.a=!1
j=new A.kM(b0,b7,b5,b6,0.06)
i=A.k([],t.h3)
for(h=0;h<4;++h)i.push(j.$1(b2[B.a.Y(h+s,4)]))
g=A.nB(i)
if(b0.a||!g.gfK()){b1=A.ck(b8,t.N,t.X)
b1.h(0,"reason","face-cut-by-image-border")
return new A.be(null,B.cb,b3.c,b1)}f=A.nA(g)
e=A.K(9,!1,!1,t.y)
i=A.k([],t.f)
for(d=b3.b,h=0;h<9;++h){c=d[h]
if(c>=0){if(!(c<b4.length))return A.a(b4,c)
c=b4[c]
i.push(new A.a_(c.a,c.b))}else if(b3.Q[h]){c=B.a.V(h,3)
i.push(b1.aB(0,(B.a.Y(h,3)+0.5)/3,(c+0.5)/3))}}b=A.k([],t.d)
for(b1=t.N,d=t.X,c=b3.f,a=0.45*c,h=0;h<9;h=a8){a0=f.aB(0,(B.a.Y(h,3)+0.5)/3,(B.a.V(h,3)+0.5)/3)
a1=a0.a
a2=a1*b5/b7
a3=a0.b
a4=a3*b6/b7
for(a5=i.length,a6=0;a6<i.length;i.length===a5||(0,A.V)(i),++a6){a7=i[a6]
if(Math.sqrt(Math.pow(a7.a-a2,2)+Math.pow(a7.b-a4,2))<a){B.c.h(e,h,!0)
break}}a8=h+1
B.c.I(b,A.aL(["cell",a8,"x",A.aU(B.b.aO(a1,4)),"y",A.aU(B.b.aO(a3,4)),"observed",e[h]],b1,d))}i=b3.c
a=b3.d
a9=B.b.K(0.5*((i+0.8*b3.gdh())/9)+0.3*B.b.K(1-a/0.22,0,1)+0.2*B.b.K(1-b3.z/0.45,0,1),0,1)
a1=A.ck(b8,b1,d)
d=A.H(b1,d)
d.h(0,"stickerRegions",i)
d.h(0,"verifiedCells",b3.gdh())
d.h(0,"rows",b3.w)
d.h(0,"cols",b3.x)
d.h(0,"rms",A.aU(B.b.aO(a,3)))
d.h(0,"ring",b3.y)
d.c2(0,b3.a.ba())
d.h(0,"evidence",b3.as)
a1.h(0,"chosen",d)
a1.h(0,"quad",g.ba())
a1.h(0,"cells",b)
a1.h(0,"confidence",A.aU(B.b.aO(a9,3)))
return new A.be(new A.jj(g,a9,e,a,c),null,9,a1)},
eV:function eV(a,b){this.a=a
this.b=b},
jj:function jj(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
be:function be(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
jY:function jY(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
c_:function c_(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.r=d
_.w=e
_.x=f
_.y=g},
kL:function kL(a){this.a=a},
kw:function kw(a,b,c,d,e,f,g,h,i,j,k,l){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l},
kI:function kI(a,b){this.a=a
this.b=b},
kJ:function kJ(){},
kK:function kK(){},
kG:function kG(a){this.a=a},
kH:function kH(a,b){this.a=a
this.b=b},
kz:function kz(a,b,c,d){var _=this
_.a=a
_.b=b
_.c=c
_.d=d},
kx:function kx(){},
ky:function ky(){},
kE:function kE(a,b){this.a=a
this.b=b},
kF:function kF(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
kA:function kA(){},
kB:function kB(){},
kC:function kC(){},
kD:function kD(){},
kd:function kd(a){this.a=a},
kR:function kR(){},
bp:function bp(a,b,c,d,e,f,g,h,i,j,k,l,m){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g
_.w=h
_.x=i
_.y=j
_.z=k
_.Q=l
_.as=m
_.at=!1},
jZ:function jZ(){},
kt:function kt(){},
ku:function ku(a){this.a=a},
kv:function kv(){},
i8:function i8(a,b,c){this.a=a
this.b=b
this.c=c},
kT:function kT(a,b,c,d,e,f,g){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e
_.f=f
_.r=g},
kX:function kX(){},
kU:function kU(){},
kV:function kV(){},
kW:function kW(){},
ks:function ks(a,b){this.a=a
this.b=b},
kN:function kN(){},
kO:function kO(){},
kP:function kP(){},
kQ:function kQ(){},
kM:function kM(a,b,c,d,e){var _=this
_.a=a
_.b=b
_.c=c
_.d=d
_.e=e},
nB(a){var s=A.nn(a,t.x)
if(a.length!==4)A.ad(B.d_)
return new A.jl(s)},
qc(a){var s,r,q,p,o=A.k([],t.h3)
for(s=J.dR(a),r=t.j;s.D();){q=r.a(s.gL())
p=J.ai(q)
o.push(new A.aO(A.ic(p.m(q,0)),A.ic(p.m(q,1))))}return A.nB(o)},
nA(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=new A.jk()
if(!a.gfK())A.ad(B.cX)
s=a.a
r=s.length
if(1>=r)return A.a(s,1)
q=s[1]
p=q.a
if(2>=r)return A.a(s,2)
o=s[2]
n=o.a
m=p-n
if(3>=r)return A.a(s,3)
r=s[3]
l=r.a
k=l-n
q=q.b
o=o.b
j=q-o
r=r.b
i=r-o
h=s[0]
g=h.a
f=g-p+n-l
h=h.b
e=h-q+o-r
d=m*i-k*j
if(Math.abs(d)<1e-10)A.ad(B.cZ)
o=c.r=(f*i-k*e)/d
n=c.w=(m*e-f*j)/d
c.a=p-g+o*p
c.b=l-g+n*l
c.c=g
c.d=q-h+o*q
c.e=r-h+n*r
c.f=h
return c},
aO:function aO(a,b){this.a=a
this.b=b},
jl:function jl(a){this.a=a},
jm:function jm(){},
jn:function jn(){},
jk:function jk(){var _=this
_.w=_.r=_.f=_.e=_.d=_.c=_.b=_.a=$},
u8(a){var s,r,q,p,o,n,m,l=null,k=a.a,j=a.$ti.l("4?"),i=B.cu.bo(A.b1(j.a(k.m(0,"bytes"))))
if(i.length>16777216)throw A.h(B.d3)
s=A.or(i)
r=s==null?l:s.aA(i)
if(r==null||r.gR()<90||r.gN()<90||r.gR()*r.gN()>2e7)throw A.h(B.cY)
s=A.or(i)
q=s==null?l:s.aY(i,l)
if(q==null)throw A.h(B.d2)
p=A.om(q)
if(J.ae(j.a(k.m(0,"op")),"unmirror")){k=A.fx(p)
k=t.A.l("ap.S").a(A.hk(92).cv(k,B.P))
return A.aL(["image",B.W.gc3().bo(k)],t.N,t.X)}if(J.ae(j.a(k.m(0,"op")),"prepare")){if(Math.max(p.gR(),p.gN())>1200)p=A.mp(p,1200)
k=p.gR()
o=A.P(l,l,B.e,0,B.i,p.gN(),l,0,3,l,B.e,k,!1)
A.ig(o,p,B.V,l,l,l,l,l,l,l,l)
k=o.gR()
j=o.gN()
n=t.A.l("ap.S").a(A.hk(92).cv(o,B.P))
return A.aL(["width",k,"height",j,"image",B.W.gc3().bo(n)],t.N,t.X)}if(J.ae(j.a(k.m(0,"op")),"auto"))return A.rE(p)
m=A.oh(p,A.qc(t.j.a(j.a(k.m(0,"quad")))))
k=m.b
j=A.W(k)
n=j.l("ao<1,Y<B,C?>>")
k=A.u(new A.ao(k,j.l("Y<B,C?>(1)").a(new A.lq()),n),n.l("a5.E"))
j=t.A.l("ap.S").a(A.hk(90).cv(m.a,B.P))
return A.aL(["samples",k,"preview",B.W.gc3().bo(j)],t.N,t.X)},
mp(a,b){var s,r,q,p=null
if(Math.max(a.gR(),a.gN())>b){s=a.gR()>=a.gN()?b:p
r=A.tF(a,a.gN()>a.gR()?b:p,B.b8,s)}else r=a
s=r.gR()
q=A.P(p,p,B.e,0,B.i,r.gN(),p,0,3,p,B.e,s,!1)
A.ig(q,r,B.V,p,p,p,p,p,p,p,p)
return q},
rE(a){var s,r,q,p,o,n,m,l,k,j,i,h=new A.jp()
$.mF()
s=$.lY.$0()
h.a=s
h.b=null
r=A.mp(a,720)
q=A.mp(r,420)
s=q.gbU()
p=3!==s?q.fq(null,3):q
s=p.a
s=s==null?null:s.fO(p!==q,B.cH)
if(s==null)s=q.a4()
o=A.qb(s,q.gR(),q.gN())
s=r.gR()
n=r.gN()
m=t.A.l("ap.S")
l=m.a(A.hk(90).cv(r,B.P))
k=A.aL(["width",s,"height",n,"image",B.W.gc3().bo(l),"visible",o.c,"log",o.d],t.N,t.X)
j=o.a
if(j==null)k.h(0,"failure",o.b.b)
else{i=A.oh(r,j.a)
k.h(0,"detection",j.ba())
s=i.b
n=A.W(s)
l=n.l("ao<1,Y<B,C?>>")
s=A.u(new A.ao(s,n.l("Y<B,C?>(1)").a(new A.kq()),l),l.l("a5.E"))
k.h(0,"samples",s)
s=m.a(A.hk(90).cv(i.a,B.P))
k.h(0,"preview",B.W.gc3().bo(s))}k.h(0,"ms",h.gjK())
return k},
oh(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g=null,f=new A.kZ(A.nA(b),a),e=A.k([],t.c6)
for(s=t.oL,r=0;r<3;++r)for(q=(r+0.5)/3,p=0;p<3;++p){o=A.k([],s)
for(n=(p+0.5)/3,m=-3;m<=3;++m)for(l=q+m*0.022,k=-3;k<=3;++k)B.c.I(o,f.$2(n+k*0.022,l))
B.c.I(e,A.u7(o))}j=A.P(g,g,B.e,0,B.i,270,g,0,3,g,B.e,270,!1)
for(m=0;m<270;++m)for(s=(m+0.5)/270,k=0;k<270;++k){i=f.$2((k+0.5)/270,s)
q=i.a
n=i.b
l=i.c
h=j.a
if(h!=null)h.a5(k,m,q,n,l)}return new A.fm(j,e)},
u7(a){var s,r,q,p,o,n=new A.lp(),m=A.W(a),l=m.l("f(1)"),k=m.l("ao<1,f>"),j=new A.aY(n.$1(new A.ao(a,l.a(new A.lk()),k)),n.$1(new A.ao(a,l.a(new A.ll()),k)),n.$1(new A.ao(a,l.a(new A.lm()),k))),i=j.gdf()
k=A.k([],t.n)
for(l=a.length,s=i.a,r=i.b,q=i.c,p=0;p<a.length;a.length===l||(0,A.V)(a),++p){o=a[p]
k.push(Math.sqrt(Math.pow(o.gdf().a-s,2)+Math.pow(o.gdf().b-r,2)+Math.pow(o.gdf().c-q,2)))}B.c.bV(k)
l=k.length
s=l/2|0
if(!(s<l))return A.a(k,s)
l=m.l("G(1)")
m=m.l("aB<1>")
return new A.cA(j,k[s],new A.aB(a,l.a(new A.ln()),m).gu(0)/a.length,new A.aB(a,l.a(new A.lo()),m).gu(0)/a.length)},
lq:function lq(){},
kq:function kq(){},
kZ:function kZ(a,b){this.a=a
this.b=b},
lp:function lp(){},
lk:function lk(){},
ll:function ll(){},
lm:function lm(){},
ln:function ln(){},
lo:function lo(){},
u0(){var s,r=v.G,q=new A.lg(r)
if(typeof q=="function")A.ad(A.bs("Attempting to rewrap a JS function.",null))
s=function(a,b){return function(c){return a(b,c,arguments.length)}}(A.rG,q)
s[$.mE()]=q
r.onmessage=s},
lg:function lg(a){this.a=a},
qg(a){throw A.h(A.bg("Uint64List not supported on the web."))},
pz(a,b,c){return J.lv(a,b,c)},
nF(a,b,c){var s=a.BYTES_PER_ELEMENT
c=A.bo(b,c,B.a.an(a.byteLength,s))
return J.a4(B.f.gA(a),a.byteOffset+b*s,(c-b)*s)},
nE(a,b){return J.aG(a,b,null)},
pr(a){return J.mK(a,0,null)},
ps(a){return a.kE(0,0,null)},
u3(a,b){return Math.pow(a,b)},
cL(a,b){var s,r,q,p
if(t.D.b(a)&&a.length>=32)return A.rJ(a,b)
s=J.a6(a)
r=s.gu(a)
b^=4294967295
for(q=0;r>=8;){p=q+1
b=B.x[(b^s.m(a,q))&255]^b>>>8
q=p+1
b=B.x[(b^s.m(a,p))&255]^b>>>8
p=q+1
b=B.x[(b^s.m(a,q))&255]^b>>>8
q=p+1
b=B.x[(b^s.m(a,p))&255]^b>>>8
p=q+1
b=B.x[(b^s.m(a,q))&255]^b>>>8
q=p+1
b=B.x[(b^s.m(a,p))&255]^b>>>8
p=q+1
b=B.x[(b^s.m(a,q))&255]^b>>>8
q=p+1
b=B.x[(b^s.m(a,p))&255]^b>>>8
r-=8}if(r>0)do{p=q+1
b=B.x[(b^s.m(a,q))&255]^b>>>8
if(--r,r>0){q=p
continue}else break}while(!0)
return(b^4294967295)>>>0},
rF(a){var s,r,q,p,o,n,m,l=new Uint32Array(8192)
for(s=0;s<256;++s){r=a[s]
if(!(s<8192))return A.a(l,s)
l[s]=r}for(q=1;q<32;++q)for(r=(q-1)*256,p=q*256,s=0;s<256;++s){o=r+s
if(!(o>=0&&o<8192))return A.a(l,o)
n=l[o]
o=p+s
m=l[n&255]
if(!(o<8192))return A.a(l,o)
l[o]=(n>>>8^m)>>>0}return l},
rJ(c8,c9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7=$.oj
if(c7==null)c7=$.oj=A.rF(B.x)
s=c8.length
r=J.oV(B.f.gA(c8),c8.byteOffset,s)
q=c9^4294967295
p=s-32
for(o=0;o<=p;){n=q^r.getUint32(o,!0)
m=r.getUint32(o+4,!0)
l=r.getUint32(o+8,!0)
k=r.getUint32(o+12,!0)
j=r.getUint32(o+16,!0)
i=r.getUint32(o+20,!0)
h=r.getUint32(o+24,!0)
g=r.getUint32(o+28,!0)
f=c7[7936+(n&255)]
e=c7[7680+(n>>>8&255)]
d=c7[7424+(n>>>16&255)]
c=7168+(n>>>24)
if(!(c<8192))return A.a(c7,c)
c=c7[c]
b=c7[6912+(m&255)]
a=c7[6656+(m>>>8&255)]
a0=c7[6400+(m>>>16&255)]
a1=6144+(m>>>24)
if(!(a1<8192))return A.a(c7,a1)
a1=c7[a1]
a2=c7[5888+(l&255)]
a3=c7[5632+(l>>>8&255)]
a4=c7[5376+(l>>>16&255)]
a5=5120+(l>>>24)
if(!(a5<8192))return A.a(c7,a5)
a5=c7[a5]
a6=c7[4864+(k&255)]
a7=c7[4608+(k>>>8&255)]
a8=c7[4352+(k>>>16&255)]
a9=4096+(k>>>24)
if(!(a9<8192))return A.a(c7,a9)
a9=c7[a9]
b0=c7[3840+(j&255)]
b1=c7[3584+(j>>>8&255)]
b2=c7[3328+(j>>>16&255)]
b3=3072+(j>>>24)
if(!(b3<8192))return A.a(c7,b3)
b3=c7[b3]
b4=c7[2816+(i&255)]
b5=c7[2560+(i>>>8&255)]
b6=c7[2304+(i>>>16&255)]
b7=2048+(i>>>24)
if(!(b7<8192))return A.a(c7,b7)
b7=c7[b7]
b8=c7[1792+(h&255)]
b9=c7[1536+(h>>>8&255)]
c0=c7[1280+(h>>>16&255)]
c1=1024+(h>>>24)
if(!(c1<8192))return A.a(c7,c1)
c1=c7[c1]
c2=c7[768+(g&255)]
c3=c7[512+(g>>>8&255)]
c4=c7[256+(g>>>16&255)]
c5=g>>>24
if(!(c5<8192))return A.a(c7,c5)
q=f^e^d^c^b^a^a0^a1^a2^a3^a4^a5^a6^a7^a8^a9^b0^b1^b2^b3^b4^b5^b6^b7^b8^b9^c0^c1^c2^c3^c4^c7[c5]
o+=32}for(;o<s;o=c6){c6=o+1
q=c7[(q^c8[o])&255]^q>>>8}return(q^4294967295)>>>0},
ig(a,b,c,d,e,f,g,h,i,j,k){var s,r,q,p,o,n,m,l
if(f==null)f=0
if(g==null)g=0
if(j==null)j=0
if(k==null)k=0
if(i==null)i=b.gR()
if(h==null)h=b.gN()
if(e==null)e=a.gR()<b.gR()?a.gR():b.gR()
if(d==null)d=a.gN()<b.gN()?a.gN():b.gN()
s=c===B.ao
if(!s&&a.gcz())a=a.fp(a.gbU())
r=h/d
q=i/e
p=t.p
o=J.ar(d,p)
for(n=0;n<d;++n)o[n]=k+B.b.i(n*r)
m=J.ar(e,p)
for(l=0;l<e;++l)m[l]=j+B.b.i(l*q)
if(s)A.rN(b,a,f,g,e,d,m,o,null,B.aW)
else A.rI(b,a,f,g,e,d,m,o,c,!1,null,B.aW)
return a},
rN(a,b,c,d,e,f,a0,a1,a2,a3){var s,r,q,p,o,n,m,l,k,j,i,h=b.gR(),g=b.gN()
for(s=a0.length,r=a1.length,q=null,p=0;p<f;++p)for(o=d+p,n=o>=g,m=0;m<e;++m){l=c+m
if(l>=h||n)continue
if(!(m<s))return A.a(a0,m)
k=a0[m]
if(!(p<r))return A.a(a1,p)
j=a1[p]
i=a.a
q=i==null?null:i.O(k,j,q)
if(q==null)q=new A.J()
b.bM(l,o,q)}},
rI(a,b,c,d,e,f,g,h,i,j,a0,a1){var s,r,q,p,o,n,m,l,k
for(s=g.length,r=h.length,q=null,p=0;p<f;++p)for(o=d+p,n=0;n<e;++n){if(!(n<s))return A.a(g,n)
m=g[n]
if(!(p<r))return A.a(h,p)
l=h[p]
k=a.a
q=k==null?null:k.O(m,l,q)
if(q==null)q=new A.J()
A.tI(b,c+n,o,q,i,!1,a0,a1)}},
tI(a6,a7,a8,a9,b0,b1,b2,b3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5
if(!a6.fw(a7,a8))return a6
if(b0===B.ao||a6.gcz())if(a6.fw(a7,a8)){a6.aM(a7,a8).ad(a9)
return a6}s=a9.gab()
r=a9.ga7()
q=a9.gaa()
p=a9.gu(a9)<4?1:a9.gX()
if(p===0)return a6
o=a6.aM(a7,a8)
n=o.gab()
m=o.ga7()
l=o.gaa()
k=o.gX()
switch(b0.a){case 0:return a6
case 1:break
case 2:s=Math.max(n,s)
r=Math.max(m,r)
q=Math.max(l,q)
break
case 3:s=1-(1-s)*(1-n)
r=1-(1-r)*(1-m)
q=1-(1-q)*(1-l)
break
case 4:j=p*k
i=1-k
h=1-p
g=s*i+n*h
f=r*i+m*h
e=q*i+l*h
h=B.b.K(p,0.01,1)
i=p<0
d=i?0:1
c=B.b.K(s/h*d,0,0.99)
d=B.b.K(p,0.01,1)
h=i?0:1
b=B.b.K(r/d*h,0,0.99)
h=B.b.K(p,0.01,1)
i=i?0:1
a=B.b.K(q/h*i,0,0.99)
i=n*p
h=m*p
d=l*p
a0=j<s*k+i?0:1
a1=j<r*k+h?0:1
a2=j<q*k+d?0:1
s=(j+g)*(1-a0)+(i/(1-c)+g)*a0
r=(j+f)*(1-a1)+(h/(1-b)+f)*a1
q=(j+e)*(1-a2)+(d/(1-a)+e)*a2
break
case 5:s=n+s
r=m+r
q=l+q
break
case 6:s=Math.min(n,s)
r=Math.min(m,r)
q=Math.min(l,q)
break
case 7:s=n*s
r=m*r
q=l*q
break
case 8:s=s!==0?1-(1-n)/s:0
r=r!==0?1-(1-m)/r:0
q=q!==0?1-(1-l)/q:0
break
case 9:i=1-k
h=1-p
d=s*i
a3=n*h
s=2*n<k?2*s*n+d+a3:p*k-2*(k-n)*(p-s)+d+a3
d=r*i
a3=m*h
r=2*m<k?2*r*m+d+a3:p*k-2*(k-m)*(p-r)+d+a3
i=q*i
h=l*h
q=2*l<k?2*q*l+i+h:p*k-2*(k-l)*(p-q)+i+h
break
case 10:i=k===0
if(i)s=0
else{h=n/k
s=n*(p*h+2*s*(1-h))+s*(1-k)+n*(1-p)}if(i)r=0
else{h=m/k
r=m*(p*h+2*r*(1-h))+r*(1-k)+m*(1-p)}if(i)q=0
else{i=l/k
q=l*(p*i+2*q*(1-i))+q*(1-k)+l*(1-p)}break
case 11:i=2*s
h=1-k
d=1-p
a3=s*h
a4=n*d
s=i<p?i*n+a3+a4:p*k-2*(k-n)*(p-s)+a3+a4
i=2*r
a3=r*h
a4=m*d
r=i<p?i*m+a3+a4:p*k-2*(k-m)*(p-r)+a3+a4
i=2*q
h=q*h
d=l*d
q=i<p?i*l+h+d:p*k-2*(k-l)*(p-q)+h+d
break
case 12:s=Math.abs(s-n)
r=Math.abs(r-m)
q=Math.abs(q-l)
break
case 13:s=n-s
r=m-r
q=l-q
break
case 14:s=s!==0?n/s:0
r=r!==0?m/r:0
q=q!==0?l/q:0
break}a5=1-p
o.sab(s*p+n*k*a5)
o.sa7(r*p+m*k*a5)
o.saa(q*p+l*k*a5)
o.sX(p+k*a5)
return a6},
tK(a,b,c,d,e,f,g){var s,r=B.b.K(Math.min(d,e),0,a.gR()-1),q=B.b.K(Math.min(f,g),0,a.gN()-1),p=B.b.K(Math.max(d,e),0,a.gR()-1),o=B.b.K(Math.max(f,g),0,a.gN()-1),n=a.a.bc(0,r,q,p-r+1,o-q+1)
for(s=n.a;n.D();)s.ad(c)
return a},
po(a6,a7,a8,a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=b2<16384,a5=a8>b0?b0:a8
for(s=1;s<=a5;)s=s<<1>>>0
s=s>>>1
r=s>>>1
q=A.k([0,0],t.t)
for(p=a6.length,o=s,s=r;s>=1;o=s,s=r){n=a7+b1*(b0-o)
m=b1*s
l=b1*o
k=a9*s
j=a9*o
for(i=(a8&s)>>>0!==0,h=a9*(a8-o),g=a7;g<=n;g+=l){f=g+h
for(e=g;e<=f;e+=j){d=e+k
c=e+m
b=c+k
if(a4){if(!(e>=0&&e<p))return A.a(a6,e)
a=a6[e]
if(!(c>=0&&c<p))return A.a(a6,c)
A.e1(a,a6[c],q)
a0=q[0]
a1=q[1]
if(!(d>=0&&d<p))return A.a(a6,d)
a=a6[d]
if(!(b>=0&&b<p))return A.a(a6,b)
A.e1(a,a6[b],q)
a2=q[0]
a3=q[1]
A.e1(a0,a2,q)
a=q[0]
a6.$flags&2&&A.b(a6)
a6[e]=a
a6[d]=q[1]
A.e1(a1,a3,q)
a=q[0]
a6.$flags&2&&A.b(a6)
a6[c]=a
a6[b]=q[1]}else{if(!(e>=0&&e<p))return A.a(a6,e)
a=a6[e]
if(!(c>=0&&c<p))return A.a(a6,c)
A.e2(a,a6[c],q)
a0=q[0]
a1=q[1]
if(!(d>=0&&d<p))return A.a(a6,d)
a=a6[d]
if(!(b>=0&&b<p))return A.a(a6,b)
A.e2(a,a6[b],q)
a2=q[0]
a3=q[1]
A.e2(a0,a2,q)
a=q[0]
a6.$flags&2&&A.b(a6)
a6[e]=a
a6[d]=q[1]
A.e2(a1,a3,q)
a=q[0]
a6.$flags&2&&A.b(a6)
a6[c]=a
a6[b]=q[1]}}if(i){c=e+m
if(a4){if(!(e>=0&&e<p))return A.a(a6,e)
a=a6[e]
if(!(c>=0&&c<p))return A.a(a6,c)
A.e1(a,a6[c],q)
a0=q[0]
a=q[1]
a6.$flags&2&&A.b(a6)
a6[c]=a}else{if(!(e>=0&&e<p))return A.a(a6,e)
a=a6[e]
if(!(c>=0&&c<p))return A.a(a6,c)
A.e2(a,a6[c],q)
a0=q[0]
a=q[1]
a6.$flags&2&&A.b(a6)
a6[c]=a}a6.$flags&2&&A.b(a6)
if(!(e>=0&&e<p))return A.a(a6,e)
a6[e]=a0}}if((b0&s)>>>0!==0){f=g+h
for(e=g;e<=f;e+=j){d=e+k
if(a4){if(!(e>=0&&e<p))return A.a(a6,e)
i=a6[e]
if(!(d>=0&&d<p))return A.a(a6,d)
A.e1(i,a6[d],q)
a0=q[0]
i=q[1]
a6.$flags&2&&A.b(a6)
a6[d]=i}else{if(!(e>=0&&e<p))return A.a(a6,e)
i=a6[e]
if(!(d>=0&&d<p))return A.a(a6,d)
A.e2(i,a6[d],q)
a0=q[0]
i=q[1]
a6.$flags&2&&A.b(a6)
a6[d]=i}a6.$flags&2&&A.b(a6)
if(!(e>=0&&e<p))return A.a(a6,e)
a6[e]=a0}}r=s>>>1}},
e1(a,b,c){var s,r,q,p,o=$.as()
o.$flags&2&&A.b(o)
o[0]=a
s=$.aE()
if(0>=s.length)return A.a(s,0)
r=s[0]
o[0]=b
q=s[0]
p=r+(q&1)+B.a.j(q,1)
B.c.h(c,0,p)
B.c.h(c,1,p-q)},
e2(a,b,c){var s=a-B.a.j(b,1)&65535
B.c.h(c,1,s)
B.c.h(c,0,b+s-32768&65535)},
or(a){var s,r,q,p,o,n,m,l,k,j,i,h=null,g=new A.hj()
if(g.br(a))return g
s=new A.hz(A.nd())
if(s.br(a))return s
r=new A.iE()
r.f=A.t(a,!1,h,0)
r.a=new A.e6(A.k([],t.b))
if(r.eH())return r
q=new A.jL()
if(q.br(a))return q
p=new A.jt()
if(p.dK(A.t(a,!1,h,0))!=null)return p
if(A.lZ(a).c===943870035)return new A.jc()
if(A.pn(a))return new A.iB()
o=new A.fE(!1)
if(o.br(a))return o
n=new A.j7(A.k([],t.s))
if(n.br(a))return n
m=new A.jr()
l=A.t(a,!1,h,0)
k=m.a=new A.eX(B.am)
k.c6(l)
if(k.fB())return m
j=new A.iG()
k=A.t(a,!1,h,0)
j.a=k
k=A.n1(k)
j.b=k
if(k!=null)return j
i=new A.jg()
if(i.aA(a)!=null)return i
return h},
r1(a,b,c,d,e,f){A.qZ(f,a,b,c,d,e,!0,f)},
r2(a,b,c,d,e,f){A.r_(f,a,b,c,d,e,!0,f)},
r0(a,b,c,d,e,f){A.qY(f,a,b,c,d,e,!0,f)},
dD(a,b,c,d,e){var s,r,q
for(s=0;s<d;++s){r=J.c(a.a,a.d+s)
q=J.c(b.a,b.d+s)
J.x(c.a,c.d+s,r+q)}},
qZ(a,b,c,d,e,f,g,h){var s,r,q=null,p=e*d,o=e+f,n=A.t(a,!1,q,p),m=A.t(a,!1,q,p),l=A.p(m,q,0)
if(e===0){m.h(0,0,J.c(n.a,n.d))
A.dD(A.p(n,q,1),l,A.p(m,q,1),b-1,!0)
l.d+=d
n.d+=d
m.d+=d
e=1}for(s=-d,r=b-1;e<o;){A.dD(n,A.p(l,q,s),m,1,!0)
A.dD(A.p(n,q,1),l,A.p(m,q,1),r,!0);++e
l.d+=d
n.d+=d
m.d+=d}},
r_(a,b,c,d,e,f,g,h){var s=null,r=e*d,q=e+f,p=A.t(a,!1,s,r),o=A.t(h,!1,s,r),n=A.p(o,s,0)
if(e===0){o.h(0,0,J.c(p.a,p.d))
A.dD(A.p(p,s,1),n,A.p(o,s,1),b-1,!0)
p.d+=d
o.d+=d
e=1}else n.d-=d
while(e<q){A.dD(p,n,o,b,!0);++e
n.d+=d
p.d+=d
o.d+=d}},
qY(a,b,c,d,e,f,g,h){var s,r,q,p,o,n=null,m=e*d,l=e+f,k=A.t(a,!1,n,m),j=A.t(h,!1,n,m),i=A.p(j,n,0)
if(e===0){j.h(0,0,J.c(k.a,k.d))
A.dD(A.p(k,n,1),i,A.p(j,n,1),b-1,!0)
i.d+=d
k.d+=d
j.d+=d
e=1}for(s=-d;e<l;){A.dD(k,A.p(i,n,s),j,1,!0)
for(r=1;r<b;++r){q=r-d
p=J.c(i.a,i.d+(r-1))+J.c(i.a,i.d+q)-J.c(i.a,i.d+(q-1))
if((p&4294967040)>>>0===0)o=p
else o=p<0?0:255
q=J.c(k.a,k.d+r)
J.x(j.a,j.d+r,q+o)}++e
i.d+=d
k.d+=d
j.d+=d}},
om(a){var s="ifd0",r=A.bP(a,!1,!1)
if(!a.gbK().m(0,s).a.Z(274)||a.gbK().m(0,s).gc5()===1)return r
r.e=A.dZ(a.gbK())
r.gbK().m(0,s).sc5(null)
switch(a.gbK().m(0,s).gc5()){case 2:return A.fx(r)
case 3:return A.tL(r,B.cV)
case 4:return A.fx(A.ii(r,180))
case 5:return A.fx(A.ii(r,90))
case 6:return A.ii(r,90)
case 7:return A.fx(A.ii(r,-90))
case 8:return A.ii(r,-90)}return r},
tF(e6,e7,e8,e9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4=null,e5=e9==null
if(e5&&e7==null)throw A.h(A.o("Invalid size"))
if(e6.gcz())e8=B.aw
if(e6.gbK().m(0,"ifd0").a.Z(274)&&e6.gbK().m(0,"ifd0").gc5()!==1)e6=A.om(e6)
if(e7==null||e7<=0){e9.toString
e7=B.b.ap(e9*(e6.gN()/e6.gR()))}if(e5||e9<=0)e9=B.b.ap(e7*(e6.gR()/e6.gN()))
if(e9===e6.gR()&&e7===e6.gN())return A.bP(e6,!1,!1)
s=new Int32Array(e9)
for(e5=e6.a,r=e5==null,q=0;q<e9;++q){p=r?e4:e5.a
p=B.a.an(q*(p==null?0:p),e9)
if(!(q<e9))return A.a(s,q)
s[q]=p}o=new Int32Array(e7)
for(n=0;n<e7;++n){p=r?e4:e5.b
p=B.a.an(n*(p==null?0:p),e7)
if(!(n<e7))return A.a(o,n)
o[n]=p}m=e6.gaH().length
for(e5=e8===B.d8,r=e8===B.aw,p=e8===B.b8,l=t.g,k=e4,j=0;j<m;++j){i=e6.x
if(i===$)i=e6.x=A.k([],l)
if(!(j<i.length))return A.a(i,j)
h=i[j]
g=A.h0(h,e7,!0,e9)
f=k==null
if(!f)k.b5(g)
if(f)k=g
f=h.a
e=f==null
d=e?e4:f.b
c=(d==null?0:d)/e7
d=e?e4:f.a
b=(d==null?0:d)/e9
if(p){a=h.ac(0,0)
for(n=0;n<e7;n=a1){a0=B.b.i(n*c)
a1=n+1
a2=B.b.i(a1*c)
if(a2===a0)++a2
for(q=0;q<e9;q=a4){a3=B.b.i(q*b)
a4=q+1
a5=B.b.i(a4*b)
if(a5===a3)++a5
for(a6=a0,a7=0,a8=0,a9=0,b0=0,b1=0;a6<a2;++a6)for(b2=a3;b2<a5;++b2,++b1){f=h.a
if(f!=null)f.O(b2,a6,a)
a7+=a.gn()
a8+=a.gt()
a9+=a.gq()
b0+=a.gv()}b3=1/b1
f=g.a
if(f!=null)f.aj(q,n,a7*b3,a8*b3,a9*b3,b0*b3)}}}else if(r)if((e?e4:f.gT())!=null)for(n=0;n<e7;++n){if(!(n<e7))return A.a(o,n)
b4=o[n]
for(q=0;q<e9;++q){if(!(q<e9))return A.a(s,q)
f=s[q]
e=h.a
f=e==null?e4:B.b.i(e.aM(f,b4).gP())
if(f==null)f=0
e=g.a
if(e!=null)e.aK(q,n,f)}}else{a=h.ac(0,0)
for(n=0;n<e7;++n){if(!(n<e7))return A.a(o,n)
a6=o[n]
for(q=0;q<e9;++q){if(!(q<e9))return A.a(s,q)
f=s[q]
e=h.a
if(e!=null)e.O(f,a6,a)
f=a.gn()
e=a.gt()
d=a.gq()
b5=a.gv()
b6=g.a
if(b6!=null)b6.aj(q,n,f,e,d,b5)}}}else if(e5){b7=h.ac(0,0)
b8=h.ac(0,0)
b9=h.ac(0,0)
c0=h.ac(0,0)
f=h.a
e=f==null
d=e?e4:f.a
c1=(d==null?0:d)-1
f=e?e4:f.b
c2=(f==null?0:f)-1
for(n=0;n<e7;++n){c3=n*c
c4=B.b.i(c3)
c5=c3-c4
c6=B.a.K(c4+1,0,c2)
for(q=0;q<e9;++q){c7=q*b
c8=B.b.i(c7)
c9=c7-c8
d0=B.a.K(c8+1,0,c1)
f=h.a
if(f!=null)f.O(c8,c4,b7)
f=h.a
if(f!=null)f.O(c8,c6,b8)
f=h.a
if(f!=null)f.O(d0,c4,b9)
f=h.a
if(f!=null)f.O(d0,c6,c0)
f=b7.gn()
e=b9.gn()
d=b8.gn()
b5=c0.gn()
b6=b7.gt()
d1=b9.gt()
d2=b8.gt()
d3=c0.gt()
d4=b7.gq()
d5=b9.gq()
d6=b8.gq()
d7=c0.gq()
d8=b7.gv()
d9=b9.gv()
e0=b8.gv()
e1=c0.gv()
e2=g.a
if(e2!=null)e2.aj(q,n,f+c9*(e-f+c5*(f+b5-d-e))+c5*(d-f),b6+c9*(d1-b6+c5*(b6+d3-d2-d1))+c5*(d2-b6),d4+c9*(d5-d4+c5*(d4+d7-d6-d5))+c5*(d6-d4),d8+c9*(d9-d8+c5*(d8+e1-e0-d9))+c5*(e0-d8))}}}else for(n=0;n<e7;++n){e3=n*c
for(q=0;q<e9;++q)g.bM(q,n,h.e5(q*b,e3,e8))}}k.toString
return k},
ii(a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7=null,a8=B.a.Y(b0,360)
a9.gcz()
if(B.a.Y(a8,90)===0)switch(B.a.V(a8,90)){case 1:return A.to(a9)
case 2:return A.tm(a9)
case 3:return A.tn(a9)
default:return A.bP(a9,!1,!1)}s=a8*3.141592653589793/180
r=Math.cos(s)
q=Math.sin(s)
p=a9.gR()
o=a9.gR()
n=a9.gN()
m=a9.gN()
l=0.5*a9.gR()
k=0.5*a9.gN()
n=Math.abs(p*r)+Math.abs(n*q)
j=0.5*n
m=Math.abs(o*q)+Math.abs(m*r)
i=0.5*m
h=a9.gaH().length
for(p=t.g,g=a7,f=0;f<h;++f){e=a9.x
if(e===$)e=a9.x=A.k([],p)
if(!(f<e.length))return A.a(e,f)
d=e[f]
o=g==null
c=o?a7:g.da()
if(c==null){b=B.b.i(n)
c=A.h0(a9,B.b.i(m),!0,b)}if(o)g=c
for(o=c.a,o=o.gF(o);o.D();){a=o.gL()
a0=a.gaT()
a1=a.gaQ()
b=a0-j
a2=a1-i
a3=l+b*r+a2*q
a4=k-b*q+a2*r
b=!1
if(a3>=0)if(a4>=0){a2=d.a
a5=a2==null
a6=a5?a7:a2.a
if(a3<(a6==null?0:a6)){b=a5?a7:a2.b
b=a4<(b==null?0:b)}}if(b)c.bM(a0,a1,d.e5(a3,a4,B.aw))}}g.toString
return g},
to(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
for(s=a.gaH(),r=s.length,q=f,p=0;p<s.length;s.length===r||(0,A.V)(s),++p){o=s[p]
n=q==null
m=n?f:q.da()
if(m==null){l=o.a
k=l==null
j=k?f:l.b
if(j==null)j=0
l=k?f:l.a
m=A.h0(o,l==null?0:l,!0,j)}if(n)q=m
n=o.a
n=n==null?f:n.b
i=(n==null?0:n)-1
h=0
for(;;){n=m.a
n=n==null?f:n.b
if(!(h<(n==null?0:n)))break
g=0
for(;;){n=m.a
n=n==null?f:n.a
if(!(g<(n==null?0:n)))break
n=o.a
n=n==null?f:n.O(h,i-g,f)
m.bM(g,h,n==null?new A.J():n);++g}++h}}q.toString
return q},
tm(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
for(s=a.gaH(),r=s.length,q=f,p=0;p<s.length;s.length===r||(0,A.V)(s),++p){o=s[p]
n=o.a
m=n==null
l=m?f:n.a
k=(l==null?0:l)-1
n=m?f:n.b
j=(n==null?0:n)-1
n=q==null
i=n?f:q.da()
if(i==null)i=A.bP(o,!0,!0)
if(n)q=i
h=0
for(;;){n=i.a
n=n==null?f:n.b
if(!(h<(n==null?0:n)))break
n=j-h
g=0
for(;;){m=i.a
m=m==null?f:m.a
if(!(g<(m==null?0:m)))break
m=o.a
m=m==null?f:m.O(k-g,n,f)
i.bM(g,h,m==null?new A.J():m);++g}++h}}q.toString
return q},
tn(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=null
for(s=a.gaH(),r=s.length,q=f,p=0;p<s.length;s.length===r||(0,A.V)(s),++p){o=s[p]
n=a.a
n=n==null?f:n.a
m=(n==null?0:n)-1
n=q==null
l=n?f:q.da()
if(l==null){k=o.a
j=k==null
i=j?f:k.b
if(i==null)i=0
k=j?f:k.a
l=A.h0(o,k==null?0:k,!0,i)}if(n)q=l
h=0
for(;;){n=l.a
n=n==null?f:n.b
if(!(h<(n==null?0:n)))break
n=m-h
g=0
for(;;){k=l.a
k=k==null?f:k.a
if(!(g<(k==null?0:k)))break
k=o.a
k=k==null?f:k.O(n,g,f)
l.bM(g,h,k==null?new A.J():k);++g}++h}}q.toString
return q},
l0(a){var s
a=(a&-a)>>>0
s=a!==0?31:32
if((a&65535)!==0)s-=16
if((a&16711935)!==0)s-=8
if((a&252645135)!==0)s-=4
if((a&858993459)!==0)s-=2
return(a&1431655765)!==0?s-1:s},
ub(a){var s
$.mI().h(0,0,a)
s=$.oS()
if(0>=s.length)return A.a(s,0)
return s[0]},
ow(a,b,c,d){return(B.a.K(a,0,255)|B.a.K(b,0,255)<<8|B.a.K(c,0,255)<<16|B.a.K(d,0,255)<<24)>>>0},
bi(a,b,c){var s,r,q,p,o=b.gu(b),n=b.gM(),m=a.gT(),l=m==null?null:m.gM()
if(l==null)l=a.gM()
s=a.gu(a)
if(o===1)b.h(0,0,A.ih(B.b.bq(a.gu(a)>2?a.gai():a.m(0,0)),l,n))
else if(o<=s)for(r=0;r<o;++r)b.h(0,r,A.ih(a.m(0,r),l,n))
else if(s===2){q=A.ih(a.m(0,0),l,n)
if(o===3){b.h(0,0,q)
b.h(0,1,q)
b.h(0,2,q)}else{c=A.ih(a.m(0,1),l,n)
b.h(0,0,q)
b.h(0,1,q)
b.h(0,2,q)
b.h(0,3,c)}}else{for(r=0;r<s;++r)b.h(0,r,A.ih(a.m(0,r),l,n))
p=s===1?b.m(0,0):0
for(r=s;r<o;++r)b.h(0,r,r===3?c:p)}return b},
aT(a,b,c,d,e){var s,r,q=a.gT(),p=q==null?null:q.gM()
if(p==null)p=a.gM()
q=e==null
s=q?null:e.gM()
c=s==null?c:s
if(c==null)c=a.gM()
s=q?null:e.gu(e)
d=s==null?d:s
if(d==null)d=a.gu(a)
if(b==null)b=0
if(c===p&&d===a.gu(a)){if(q)return a.J()
e.ad(a)
return e}switch(c.a){case 3:if(q)r=new A.bM(new Uint8Array(d))
else r=e
return A.bi(a,r,b)
case 0:return A.bi(a,q?new A.cZ(d,0):e,b)
case 1:return A.bi(a,q?new A.d0(d,0):e,b)
case 2:if(q){q=d<3?1:2
r=new A.d2(d,new Uint8Array(q))}else r=e
return A.bi(a,r,b)
case 4:if(q)r=new A.d_(new Uint16Array(d))
else r=e
return A.bi(a,r,b)
case 5:if(q)r=new A.d1(new Uint32Array(d))
else r=e
return A.bi(a,r,b)
case 6:if(q)r=new A.cX(new Int8Array(d))
else r=e
return A.bi(a,r,b)
case 7:if(q)r=new A.cV(new Int16Array(d))
else r=e
return A.bi(a,r,b)
case 8:if(q)r=new A.cW(new Int32Array(d))
else r=e
return A.bi(a,r,b)
case 9:if(q)r=new A.cS(new Uint16Array(d))
else r=e
return A.bi(a,r,b)
case 10:if(q)r=new A.cT(new Float32Array(d))
else r=e
return A.bi(a,r,b)
case 11:if(q)r=new A.cU(new Float64Array(d))
else r=e
return A.bi(a,r,b)}},
a0(a){return 0.299*a.gn()+0.587*a.gt()+0.114*a.gq()},
oo(a,b,c,d,e){var s=1-d/255
B.c.h(e,0,B.b.ap(255*(1-a/255)*s))
B.c.h(e,1,B.b.ap(255*(1-b/255)*s))
B.c.h(e,2,B.b.ap(255*(1-c/255)*s))},
M(a){var s,r,q,p=$.mH()
p.$flags&2&&A.b(p)
p[0]=a
p=$.oR()
if(0>=p.length)return A.a(p,0)
s=p[0]
if(a===0)return s>>>16
if($.T==null)A.X()
r=s>>>23&511
p=$.mZ.j1()
if(!(r<p.length))return A.a(p,r)
r=p[r]
if(r!==0){q=s&8388607
return r+(q+4095+(q>>>13&1)>>>13)}return A.pp(s)},
pp(a){var s,r,q=a>>>16&32768,p=(a>>>23&255)-112,o=a&8388607
if(p<=0){if(p<-10)return q
o|=8388608
s=14-p
return(q|B.a.bw(o+(B.a.a_(1,s-1)-1)+(B.a.a3(o,s)&1),s))>>>0}else if(p===143)if(o===0)return q|31744
else{o=o>>>13
r=o===0?1:0
return q|o|r|31744}else{o=o+4095+(o>>>13&1)
if((o&8388608)!==0){++p
o=0}if(p>30)return q|31744
return(q|p<<10|o>>>13)>>>0}},
X(){var s,r,q,p,o,n=$.T
if(n!=null)return n
s=new Uint32Array(65536)
$.T=J.mK(B.p.gA(s),0,null)
n=new Uint16Array(512)
$.mZ.b=n
for(r=0;r<256;++r){q=(r&255)-112
if(q<=0||q>=30){n[r]=0
p=(r|256)>>>0
if(!(p<512))return A.a(n,p)
n[p]=0}else{p=q<<10>>>0
n[r]=p
o=(r|256)>>>0
if(!(o<512))return A.a(n,o)
n[o]=(p|32768)>>>0}}for(r=0;r<65536;++r)s[r]=A.pq(r)
n=$.T
n.toString
return n},
pq(a){var s,r=a>>>15&1,q=a>>>10&31,p=a&1023
if(q===0)if(p===0)return r<<31>>>0
else{while((p&1024)===0){p=p<<1;--q}++q
p&=4294966271}else if(q===31){s=r<<31
if(p===0)return(s|2139095040)>>>0
else return(s|p<<13|2139095040)>>>0}return(r<<31|q+112<<23|p<<13)>>>0}},B={}
var w=[A,J,B]
var $={}
A.lJ.prototype={}
J.h4.prototype={
U(a,b){return a===b},
gH(a){return A.eR(a)},
B(a){return"Instance of '"+A.hB(a)+"'"},
gaJ(a){return A.cK(A.mr(this))}}
J.hh.prototype={
B(a){return String(a)},
gH(a){return a?519018:218159},
gaJ(a){return A.cK(t.y)},
$iN:1,
$iG:1}
J.el.prototype={
U(a,b){return null==b},
B(a){return"null"},
gH(a){return 0},
$iN:1}
J.em.prototype={$ia1:1}
J.bS.prototype={
gH(a){return 0},
B(a){return String(a)}}
J.hy.prototype={}
J.dB.prototype={}
J.bx.prototype={
B(a){var s=a[$.oy()]
if(s==null)s=a[$.mE()]
if(s==null)return this.h2(a)
return"JavaScript function for "+J.fz(s)},
$ica:1}
J.dl.prototype={
gH(a){return 0},
B(a){return String(a)}}
J.dm.prototype={
gH(a){return 0},
B(a){return String(a)}}
J.r.prototype={
I(a,b){A.W(a).c.a(b)
a.$flags&1&&A.b(a,29)
a.push(b)},
fF(a,b){var s
a.$flags&1&&A.b(a,"removeAt",1)
s=a.length
if(b>=s)throw A.h(A.ny(b,null))
return a.splice(b,1)[0]},
c2(a,b){var s
A.W(a).l("e<1>").a(b)
a.$flags&1&&A.b(a,"addAll",2)
if(Array.isArray(b)){this.hr(a,b)
return}for(s=J.dR(b);s.D();)a.push(s.gL())},
hr(a,b){var s,r
t.dG.a(b)
s=b.length
if(s===0)return
if(a===b)throw A.h(A.aq(a))
for(r=0;r<s;++r)a.push(b[r])},
cs(a){a.$flags&1&&A.b(a,"clear","clear")
a.length=0},
fG(a,b){return A.bX(a,0,A.cJ(b,"count",t.p),A.W(a).c)},
dk(a,b){return A.bX(a,b,null,A.W(a).c)},
dW(a,b,c,d){var s,r,q
d.a(b)
A.W(a).aG(d).l("1(1,2)").a(c)
s=a.length
for(r=b,q=0;q<s;++q){r=c.$2(r,a[q])
if(a.length!==s)throw A.h(A.aq(a))}return r},
bp(a,b){if(!(b>=0&&b<a.length))return A.a(a,b)
return a[b]},
be(a,b,c){if(b<0||b>a.length)throw A.h(A.ah(b,0,a.length,"start",null))
if(c<b||c>a.length)throw A.h(A.ah(c,b,a.length,"end",null))
if(b===c)return A.k([],A.W(a))
return A.k(a.slice(b,c),A.W(a))},
gdV(a){if(a.length>0)return a[0]
throw A.h(A.iP())},
gdY(a){var s=a.length
if(s>0)return a[s-1]
throw A.h(A.iP())},
aq(a,b,c,d,e){var s,r,q,p,o
A.W(a).l("e<1>").a(d)
a.$flags&2&&A.b(a,5)
A.bo(b,c,a.length)
s=c-b
if(s===0)return
A.bB(e,"skipCount")
if(t.j.b(d)){r=d
q=e}else{r=J.lw(d,e).fH(0,!1)
q=0}p=J.a6(r)
if(q+s>p.gu(r))throw A.h(A.ne())
if(q<b)for(o=s-1;o>=0;--o)a[b+o]=p.m(r,q+o)
else for(o=0;o<s;++o)a[b+o]=p.m(r,q+o)},
aF(a,b,c,d){var s
A.W(a).l("1?").a(d)
a.$flags&2&&A.b(a,"fillRange")
A.bo(b,c,a.length)
for(s=b;s<c;++s)a[s]=d},
dO(a,b){var s,r
A.W(a).l("G(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(b.$1(a[r]))return!0
if(a.length!==s)throw A.h(A.aq(a))}return!1},
jN(a,b){var s,r
A.W(a).l("G(1)").a(b)
s=a.length
for(r=0;r<s;++r){if(!b.$1(a[r]))return!1
if(a.length!==s)throw A.h(A.aq(a))}return!0},
dl(a,b){var s,r,q,p,o,n=A.W(a)
n.l("f(1,1)?").a(b)
a.$flags&2&&A.b(a,"sort")
s=a.length
if(s<2)return
if(b==null)b=J.t1()
if(s===2){r=a[0]
q=a[1]
n=b.$2(r,q)
if(typeof n!=="number")return n.fR()
if(n>0){a[0]=q
a[1]=r}return}p=0
if(n.c.b(null))for(o=0;o<a.length;++o)if(a[o]===void 0){a[o]=null;++p}a.sort(A.dP(b,2))
if(p>0)this.jj(a,p)},
bV(a){return this.dl(a,null)},
jj(a,b){var s,r=a.length
for(;s=r-1,r>0;r=s)if(a[s]===null){a[s]=void 0;--b
if(b===0)break}},
aI(a,b){var s
for(s=0;s<a.length;++s)if(J.ae(a[s],b))return!0
return!1},
gah(a){return a.length===0},
gfz(a){return a.length!==0},
B(a){return A.lI(a,"[","]")},
gF(a){return new J.c3(a,a.length,A.W(a).l("c3<1>"))},
gH(a){return A.eR(a)},
gu(a){return a.length},
su(a,b){a.$flags&1&&A.b(a,"set length","change the length of")
if(b<0)throw A.h(A.ah(b,0,null,"newLength",null))
if(b>a.length)A.W(a).c.a(null)
a.length=b},
m(a,b){if(!(b>=0&&b<a.length))throw A.h(A.l2(a,b))
return a[b]},
h(a,b,c){A.W(a).c.a(c)
a.$flags&2&&A.b(a)
if(!(b>=0&&b<a.length))throw A.h(A.l2(a,b))
a[b]=c},
$ian:1,
$iD:1,
$ie:1,
$iq:1}
J.hf.prototype={
kp(a){var s,r,q
if(!Array.isArray(a))return null
s=a.$flags|0
if((s&4)!==0)r="const, "
else if((s&2)!==0)r="unmodifiable, "
else r=(s&1)!==0?"fixed, ":""
q="Instance of '"+A.hB(a)+"'"
if(r==="")return q
return q+" ("+r+"length: "+a.length+")"}}
J.iQ.prototype={}
J.c3.prototype={
gL(){var s=this.d
return s==null?this.$ti.c.a(s):s},
D(){var s,r=this,q=r.a,p=q.length
if(r.b!==p){q=A.V(q)
throw A.h(q)}s=r.c
if(s>=p){r.d=null
return!1}r.d=q[s]
r.c=s+1
return!0},
$iA:1}
J.dk.prototype={
bz(a,b){var s
A.ic(b)
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){s=this.gde(b)
if(this.gde(a)===s)return 0
if(this.gde(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gde(a){return a===0?1/a<0:a<0},
i(a){var s
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){s=a<0?Math.ceil(a):Math.floor(a)
return s+0}throw A.h(A.bg(""+a+".toInt()"))},
b6(a){var s,r
if(a>=0){if(a<=2147483647){s=a|0
return a===s?s:s+1}}else if(a>=-2147483648)return a|0
r=Math.ceil(a)
if(isFinite(r))return r
throw A.h(A.bg(""+a+".ceil()"))},
bq(a){var s,r
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){s=a|0
return a===s?s:s-1}r=Math.floor(a)
if(isFinite(r))return r
throw A.h(A.bg(""+a+".floor()"))},
ap(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw A.h(A.bg(""+a+".round()"))},
K(a,b,c){if(this.bz(b,c)>0)throw A.h(A.c1(b))
if(this.bz(a,b)<0)return b
if(this.bz(a,c)>0)return c
return a},
aO(a,b){var s
if(b>20)throw A.h(A.ah(b,0,20,"fractionDigits",null))
s=a.toFixed(b)
if(a===0&&this.gde(a))return"-"+s
return s},
cH(a,b){var s,r,q,p,o
if(b<2||b>36)throw A.h(A.ah(b,2,36,"radix",null))
s=a.toString(b)
r=s.length
q=r-1
if(!(q>=0))return A.a(s,q)
if(s.charCodeAt(q)!==41)return s
p=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(s)
if(p==null)A.ad(A.bg("Unexpected toString result: "+s))
r=p.length
if(1>=r)return A.a(p,1)
s=p[1]
if(3>=r)return A.a(p,3)
o=+p[3]
r=p[2]
if(r!=null){s+=r
o-=r.length}return s+B.o.dj("0",o)},
B(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gH(a){var s,r,q,p,o=a|0
if(a===o)return o&536870911
s=Math.abs(a)
r=Math.log(s)/0.6931471805599453|0
q=Math.pow(2,r)
p=s<1?s/q:q/s
return((p*9007199254740992|0)+(p*3542243181176521|0))*599197+r*1259&536870911},
Y(a,b){var s=a%b
if(s===0)return 0
if(s>0)return s
if(b<0)return s-b
else return s+b},
an(a,b){A.ic(b)
if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.f5(a,b)},
V(a,b){return(a|0)===a?a/b|0:this.f5(a,b)},
f5(a,b){var s=a/b
if(s>=-2147483648&&s<=2147483647)return s|0
if(s>0){if(s!==1/0)return Math.floor(s)}else if(s>-1/0)return Math.ceil(s)
throw A.h(A.bg("Result of truncating division is "+A.E(s)+": "+A.E(a)+" ~/ "+b))},
a_(a,b){if(b<0)throw A.h(A.c1(b))
return b>31?0:a<<b>>>0},
S(a,b){return b>31?0:a<<b>>>0},
bw(a,b){var s
if(b<0)throw A.h(A.c1(b))
if(a>0)s=this.a2(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
j(a,b){var s
if(a>0)s=this.a2(a,b)
else{s=b>31?31:b
s=a>>s>>>0}return s},
a3(a,b){if(0>b)throw A.h(A.c1(b))
return this.a2(a,b)},
a2(a,b){return b>31?0:a>>>b},
gaJ(a){return A.cK(t.R)},
$ib5:1,
$ij:1,
$il:1}
J.ek.prototype={
az(a,b){var s=this.a_(1,b-1)
return((a&s-1)>>>0)-((a&s)>>>0)},
gaJ(a){return A.cK(t.p)},
$iN:1,
$if:1}
J.hi.prototype={
gaJ(a){return A.cK(t.i)},
$iN:1}
J.cj.prototype={
e8(a,b){var s=b.length
if(s>a.length)return!1
return b===a.substring(0,s)},
c8(a,b,c){return a.substring(b,A.bo(b,c,a.length))},
e1(a){var s,r,q,p=a.trim(),o=p.length
if(o===0)return p
if(0>=o)return A.a(p,0)
if(p.charCodeAt(0)===133){s=J.pC(p,1)
if(s===o)return""}else s=0
r=o-1
if(!(r>=0))return A.a(p,r)
q=p.charCodeAt(r)===133?J.pD(p,r):o
if(s===0&&q===o)return p
return p.substring(s,q)},
dj(a,b){var s,r
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw A.h(B.cD)
for(s=a,r="";;){if((b&1)===1)r=s+r
b=b>>>1
if(b===0)break
s+=s}return r},
bz(a,b){var s
A.b1(b)
if(a===b)s=0
else s=a<b?-1:1
return s},
B(a){return a},
gH(a){var s,r,q
for(s=a.length,r=0,q=0;q<s;++q){r=r+a.charCodeAt(q)&536870911
r=r+((r&524287)<<10)&536870911
r^=r>>6}r=r+((r&67108863)<<3)&536870911
r^=r>>11
return r+((r&16383)<<15)&536870911},
gaJ(a){return A.cK(t.N)},
gu(a){return a.length},
$ian:1,
$iN:1,
$ib5:1,
$ins:1,
$iB:1}
A.dG.prototype={
gF(a){var s=this.a
return new A.dU(s.gF(s),A.m(this).l("dU<1,2>"))},
gu(a){var s=this.a
return s.gu(s)},
gah(a){var s=this.a
return s.gah(s)},
aI(a,b){var s=this.a
return s.aI(s,b)},
B(a){var s=this.a
return s.B(s)}}
A.dU.prototype={
D(){return this.a.D()},
gL(){return this.$ti.y[1].a(this.a.gL())},
$iA:1}
A.c4.prototype={}
A.f7.prototype={$iD:1}
A.c5.prototype={
dP(a,b,c){return new A.c5(this.a,this.$ti.l("@<1,2>").aG(b).aG(c).l("c5<1,2,3,4>"))},
Z(a){return this.a.Z(a)},
m(a,b){return this.$ti.l("4?").a(this.a.m(0,b))},
h(a,b,c){var s=this.$ti
s.y[2].a(b)
s.y[3].a(c)
this.a.h(0,s.c.a(b),s.y[1].a(c))},
aN(a,b){this.a.aN(0,new A.iv(this,this.$ti.l("~(3,4)").a(b)))},
gb9(){var s=this.$ti
return A.p6(this.a.gb9(),s.c,s.y[2])},
gu(a){var s=this.a
return s.gu(s)},
gah(a){var s=this.a
return s.gah(s)}}
A.iv.prototype={
$2(a,b){var s=this.a.$ti
s.c.a(a)
s.y[1].a(b)
this.b.$2(s.y[2].a(a),s.y[3].a(b))},
$S(){return this.a.$ti.l("~(1,2)")}}
A.dn.prototype={
B(a){return"LateInitializationError: "+this.a}}
A.b4.prototype={
gu(a){return this.a.length},
m(a,b){var s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s.charCodeAt(b)}}
A.jo.prototype={}
A.D.prototype={}
A.a5.prototype={
gF(a){var s=this
return new A.aM(s,s.gu(s),A.m(s).l("aM<a5.E>"))},
gah(a){return this.gu(this)===0},
aI(a,b){var s,r=this,q=r.gu(r)
for(s=0;s<q;++s){if(J.ae(r.bp(0,s),b))return!0
if(q!==r.gu(r))throw A.h(A.aq(r))}return!1}}
A.cC.prototype={
hl(a,b,c,d){var s,r=this.b
A.bB(r,"start")
s=this.c
if(s!=null){A.bB(s,"end")
if(r>s)throw A.h(A.ah(r,0,s,"start",null))}},
gih(){var s=J.bl(this.a),r=this.c
if(r==null||r>s)return s
return r},
gjn(){var s=J.bl(this.a),r=this.b
if(r>s)return s
return r},
gu(a){var s,r=J.bl(this.a),q=this.b
if(q>=r)return 0
s=this.c
if(s==null||s>=r)return r-q
return s-q},
bp(a,b){var s=this,r=s.gjn()+b
if(b<0||r>=s.gih())throw A.h(A.lF(b,s.gu(0),s,"index"))
return J.mM(s.a,r)},
dk(a,b){var s,r,q=this
A.bB(b,"count")
s=q.b+b
r=q.c
if(r!=null&&s>=r)return new A.dX(q.$ti.l("dX<1>"))
return A.bX(q.a,s,r,q.$ti.c)},
fH(a,b){var s,r,q,p=this,o=p.b,n=p.a,m=J.a6(n),l=m.gu(n),k=p.c
if(k!=null&&k<l)l=k
s=l-o
if(s<=0){n=p.$ti.c
return b?J.hg(0,n):J.nf(0,n)}r=A.K(s,m.bp(n,o),b,p.$ti.c)
for(q=1;q<s;++q){B.c.h(r,q,m.bp(n,o+q))
if(m.gu(n)<l)throw A.h(A.aq(p))}return r}}
A.aM.prototype={
gL(){var s=this.d
return s==null?this.$ti.c.a(s):s},
D(){var s,r=this,q=r.a,p=J.a6(q),o=p.gu(q)
if(r.b!==o)throw A.h(A.aq(q))
s=r.c
if(s>=o){r.d=null
return!1}r.d=p.bp(q,s);++r.c
return!0},
$iA:1}
A.eq.prototype={
gF(a){return new A.er(J.dR(this.a),this.b,A.m(this).l("er<1,2>"))},
gu(a){return J.bl(this.a)},
gah(a){return J.p_(this.a)}}
A.er.prototype={
D(){var s=this,r=s.b
if(r.D()){s.a=s.c.$1(r.gL())
return!0}s.a=null
return!1},
gL(){var s=this.a
return s==null?this.$ti.y[1].a(s):s},
$iA:1}
A.ao.prototype={
gu(a){return J.bl(this.a)},
bp(a,b){return this.b.$1(J.mM(this.a,b))}}
A.aB.prototype={
gF(a){return new A.f5(J.dR(this.a),this.b,this.$ti.l("f5<1>"))}}
A.f5.prototype={
D(){var s,r
for(s=this.a,r=this.b;s.D();)if(r.$1(s.gL()))return!0
return!1},
gL(){return this.a.gL()},
$iA:1}
A.dX.prototype={
gF(a){return B.cw},
gah(a){return!0},
gu(a){return 0},
aI(a,b){return!1}}
A.dY.prototype={
D(){return!1},
gL(){throw A.h(A.iP())},
$iA:1}
A.au.prototype={}
A.bG.prototype={
h(a,b,c){A.m(this).l("bG.E").a(c)
throw A.h(A.bg("Cannot modify an unmodifiable list"))},
aq(a,b,c,d,e){A.m(this).l("e<bG.E>").a(d)
throw A.h(A.bg("Cannot modify an unmodifiable list"))},
bD(a,b,c,d){return this.aq(0,b,c,d,0)},
aF(a,b,c,d){A.m(this).l("bG.E?").a(d)
throw A.h(A.bg("Cannot modify an unmodifiable list"))}}
A.dC.prototype={}
A.a_.prototype={$r:"+(1,2)",$s:1}
A.fm.prototype={$r:"+preview,samples(1,2)",$s:2}
A.aQ.prototype={$r:"+(1,2,3)",$s:3}
A.aC.prototype={$r:"+(1,2,3,4)",$s:4}
A.d3.prototype={
dP(a,b,c){var s=A.m(this)
return A.np(this,s.c,s.y[1],b,c)},
gah(a){return this.gu(this)===0},
B(a){return A.lO(this)},
h(a,b,c){var s=A.m(this)
s.c.a(b)
s.y[1].a(c)
A.pd()},
$iY:1}
A.dW.prototype={
gu(a){return this.b.length},
geO(){var s=this.$keys
if(s==null){s=Object.keys(this.a)
this.$keys=s}return s},
Z(a){if(typeof a!="string")return!1
if("__proto__"===a)return!1
return this.a.hasOwnProperty(a)},
m(a,b){if(!this.Z(b))return null
return this.b[this.a[b]]},
aN(a,b){var s,r,q,p
this.$ti.l("~(1,2)").a(b)
s=this.geO()
r=this.b
for(q=s.length,p=0;p<q;++p)b.$2(s[p],r[p])},
gb9(){return new A.fd(this.geO(),this.$ti.l("fd<1>"))}}
A.fd.prototype={
gu(a){return this.a.length},
gah(a){return 0===this.a.length},
gF(a){var s=this.a
return new A.fe(s,s.length,this.$ti.l("fe<1>"))}}
A.fe.prototype={
gL(){var s=this.d
return s==null?this.$ti.c.a(s):s},
D(){var s=this,r=s.c
if(r>=s.b){s.d=null
return!1}s.d=s.a[r]
s.c=r+1
return!0},
$iA:1}
A.cb.prototype={
cn(){var s=this,r=s.$map
if(r==null){r=new A.en(s.$ti.l("en<1,2>"))
A.oq(s.a,r)
s.$map=r}return r},
Z(a){return this.cn().Z(a)},
m(a,b){return this.cn().m(0,b)},
aN(a,b){this.$ti.l("~(1,2)").a(b)
this.cn().aN(0,b)},
gb9(){var s=this.cn()
return new A.by(s,A.m(s).l("by<1>"))},
gu(a){return this.cn().a}}
A.j9.prototype={
$0(){return B.b.bq(1000*this.a.now())},
$S:5}
A.eU.prototype={}
A.jv.prototype={
bA(a){var s,r,q=this,p=new RegExp(q.a).exec(a)
if(p==null)return null
s=Object.create(null)
r=q.b
if(r!==-1)s.arguments=p[r+1]
r=q.c
if(r!==-1)s.argumentsExpr=p[r+1]
r=q.d
if(r!==-1)s.expr=p[r+1]
r=q.e
if(r!==-1)s.method=p[r+1]
r=q.f
if(r!==-1)s.receiver=p[r+1]
return s}}
A.eC.prototype={
B(a){return"Null check operator used on a null value"}}
A.ho.prototype={
B(a){var s,r=this,q="NoSuchMethodError: method not found: '",p=r.b
if(p==null)return"NoSuchMethodError: "+r.a
s=r.c
if(s==null)return q+p+"' ("+r.a+")"
return q+p+"' on '"+s+"' ("+r.a+")"}}
A.hU.prototype={
B(a){var s=this.a
return s.length===0?"Error":"Error: "+s}}
A.j4.prototype={
B(a){return"Throw of null ('"+(this.a===null?"null":"undefined")+"' from JavaScript)"}}
A.fo.prototype={
B(a){var s,r=this.b
if(r!=null)return r
r=this.a
s=r!==null&&typeof r==="object"?r.stack:null
return this.b=s==null?"":s},
$idy:1}
A.bL.prototype={
B(a){var s=this.constructor,r=s==null?null:s.name
return"Closure '"+A.ox(r==null?"unknown":r)+"'"},
$ica:1,
gkA(){return this},
$C:"$1",
$R:1,
$D:null}
A.fF.prototype={$C:"$0",$R:0}
A.fG.prototype={$C:"$2",$R:2}
A.hP.prototype={}
A.hO.prototype={
B(a){var s=this.$static_name
if(s==null)return"Closure of unknown static method"
return"Closure '"+A.ox(s)+"'"}}
A.cR.prototype={
U(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof A.cR))return!1
return this.$_target===b.$_target&&this.a===b.a},
gH(a){return(A.ij(this.a)^A.eR(this.$_target))>>>0},
B(a){return"Closure '"+this.$_name+"' of "+("Instance of '"+A.hB(this.a)+"'")}}
A.hN.prototype={
B(a){return"RuntimeError: "+this.a}}
A.b9.prototype={
gu(a){return this.a},
gah(a){return this.a===0},
gb9(){return new A.by(this,A.m(this).l("by<1>"))},
Z(a){var s,r
if(typeof a=="string"){s=this.b
if(s==null)return!1
return s[a]!=null}else if(typeof a=="number"&&(a&0x3fffffff)===a){r=this.c
if(r==null)return!1
return r[a]!=null}else return this.jV(a)},
jV(a){var s=this.d
if(s==null)return!1
return this.cC(s[this.cB(a)],a)>=0},
c2(a,b){A.m(this).l("Y<1,2>").a(b).aN(0,new A.iW(this))},
m(a,b){var s,r,q,p,o=null
if(typeof b=="string"){s=this.b
if(s==null)return o
r=s[b]
q=r==null?o:r.b
return q}else if(typeof b=="number"&&(b&0x3fffffff)===b){p=this.c
if(p==null)return o
r=p[b]
q=r==null?o:r.b
return q}else return this.jW(b)},
jW(a){var s,r,q=this.d
if(q==null)return null
s=q[this.cB(a)]
r=this.cC(s,a)
if(r<0)return null
return s[r].b},
h(a,b,c){var s,r,q=this,p=A.m(q)
p.c.a(b)
p.y[1].a(c)
if(typeof b=="string"){s=q.b
q.ed(s==null?q.b=q.dF():s,b,c)}else if(typeof b=="number"&&(b&0x3fffffff)===b){r=q.c
q.ed(r==null?q.c=q.dF():r,b,c)}else q.jY(b,c)},
jY(a,b){var s,r,q,p,o=this,n=A.m(o)
n.c.a(a)
n.y[1].a(b)
s=o.d
if(s==null)s=o.d=o.dF()
r=o.cB(a)
q=s[r]
if(q==null)s[r]=[o.dG(a,b)]
else{p=o.cC(q,a)
if(p>=0)q[p].b=b
else q.push(o.dG(a,b))}},
ce(a,b){var s=this
if(typeof b=="string")return s.f_(s.b,b)
else if(typeof b=="number"&&(b&0x3fffffff)===b)return s.f_(s.c,b)
else return s.jX(b)},
jX(a){var s,r,q,p,o=this,n=o.d
if(n==null)return null
s=o.cB(a)
r=n[s]
q=o.cC(r,a)
if(q<0)return null
p=r.splice(q,1)[0]
o.f8(p)
if(r.length===0)delete n[s]
return p.b},
aN(a,b){var s,r,q=this
A.m(q).l("~(1,2)").a(b)
s=q.e
r=q.r
while(s!=null){b.$2(s.a,s.b)
if(r!==q.r)throw A.h(A.aq(q))
s=s.c}},
ed(a,b,c){var s,r=A.m(this)
r.c.a(b)
r.y[1].a(c)
s=a[b]
if(s==null)a[b]=this.dG(b,c)
else s.b=c},
f_(a,b){var s
if(a==null)return null
s=a[b]
if(s==null)return null
this.f8(s)
delete a[b]
return s.b},
eP(){this.r=this.r+1&1073741823},
dG(a,b){var s=this,r=A.m(s),q=new A.j_(r.c.a(a),r.y[1].a(b))
if(s.e==null)s.e=s.f=q
else{r=s.f
r.toString
q.d=r
s.f=r.c=q}++s.a
s.eP()
return q},
f8(a){var s=this,r=a.d,q=a.c
if(r==null)s.e=q
else r.c=q
if(q==null)s.f=r
else q.d=r;--s.a
s.eP()},
cB(a){return J.bk(a)&1073741823},
cC(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ae(a[r].a,b))return r
return-1},
B(a){return A.lO(this)},
dF(){var s=Object.create(null)
s["<non-identifier-key>"]=s
delete s["<non-identifier-key>"]
return s},
$ilM:1}
A.iW.prototype={
$2(a,b){var s=this.a,r=A.m(s)
s.h(0,r.c.a(a),r.y[1].a(b))},
$S(){return A.m(this.a).l("~(1,2)")}}
A.j_.prototype={}
A.by.prototype={
gu(a){return this.a.a},
gah(a){return this.a.a===0},
gF(a){var s=this.a
return new A.U(s,s.r,s.e,this.$ti.l("U<1>"))},
aI(a,b){return this.a.Z(b)}}
A.U.prototype={
gL(){return this.d},
D(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.aq(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.a
r.c=s.c
return!0}},
$iA:1}
A.ep.prototype={
gu(a){return this.a.a},
gah(a){return this.a.a===0},
gF(a){var s=this.a
return new A.ax(s,s.r,s.e,this.$ti.l("ax<1>"))}}
A.ax.prototype={
gL(){return this.d},
D(){var s,r=this,q=r.a
if(r.b!==q.r)throw A.h(A.aq(q))
s=r.c
if(s==null){r.d=null
return!1}else{r.d=s.b
r.c=s.c
return!0}},
$iA:1}
A.en.prototype={
cB(a){return A.tC(a)&1073741823},
cC(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ae(a[r].a,b))return r
return-1}}
A.lc.prototype={
$1(a){return this.a(a)},
$S:23}
A.ld.prototype={
$2(a,b){return this.a(a,b)},
$S:54}
A.le.prototype={
$1(a){return this.a(A.b1(a))},
$S:32}
A.aP.prototype={
B(a){return this.f6(!1)},
f6(a){var s,r,q,p,o,n=this.im(),m=this.d_(),l=(a?"Record ":"")+"("
for(s=n.length,r="",q=0;q<s;++q,r=", "){l+=r
p=n[q]
if(typeof p=="string")l=l+p+": "
if(!(q<m.length))return A.a(m,q)
o=m[q]
l=a?l+A.nv(o):l+A.E(o)}l+=")"
return l.charCodeAt(0)==0?l:l},
im(){var s,r=this.$s
while($.ke.length<=r)B.c.I($.ke,null)
s=$.ke[r]
if(s==null){s=this.hG()
B.c.h($.ke,r,s)}return s},
hG(){var s,r,q,p=this.$r,o=p.indexOf("("),n=p.substring(1,o),m=p.substring(o),l=m==="()"?0:m.replace(/[^,]/g,"").length+1,k=t.K,j=J.bQ(l,k)
for(s=0;s<l;++s)j[s]=s
if(n!==""){r=n.split(",")
s=r.length
for(q=l;s>0;){--q;--s
B.c.h(j,q,r[s])}}return A.nn(j,k)}}
A.cH.prototype={
d_(){return[this.a,this.b]},
U(a,b){if(b==null)return!1
return b instanceof A.cH&&this.$s===b.$s&&J.ae(this.a,b.a)&&J.ae(this.b,b.b)},
gH(a){return A.hu(this.$s,this.a,this.b,B.z)}}
A.dJ.prototype={
d_(){return[this.a,this.b,this.c]},
U(a,b){var s=this
if(b==null)return!1
return b instanceof A.dJ&&s.$s===b.$s&&J.ae(s.a,b.a)&&J.ae(s.b,b.b)&&J.ae(s.c,b.c)},
gH(a){var s=this
return A.hu(s.$s,s.a,s.b,s.c)}}
A.dK.prototype={
d_(){return this.a},
U(a,b){if(b==null)return!1
return b instanceof A.dK&&this.$s===b.$s&&A.rl(this.a,b.a)},
gH(a){return A.hu(this.$s,A.n(this.a),B.z,B.z)}}
A.jU.prototype={
j1(){var s=this.b
if(s===this)throw A.h(A.nj(""))
return s}}
A.cl.prototype={
gaJ(a){return B.kx},
dd(a,b,c){A.aD(a,b,c)
return c==null?new Uint8Array(a,b):new Uint8Array(a,b,c)},
fl(a){return this.dd(a,0,null)},
fi(a,b,c){A.aD(a,b,c)
return c==null?new Int8Array(a,b):new Int8Array(a,b,c)},
dc(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,2)
return new Uint16Array(a,b,c)},
fj(a){return this.dc(a,0,null)},
fg(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,2)
return new Int16Array(a,b,c)},
fk(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,4)
return new Uint32Array(a,b,c)},
fh(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,4)
return new Int32Array(a,b,c)},
ff(a,b,c){A.aD(a,b,c)
c=B.a.V(a.byteLength-b,4)
return new Float32Array(a,b,c)},
fe(a,b,c){var s
A.aD(a,b,c)
s=new DataView(a,b,c)
return s},
$iN:1,
$icl:1}
A.ex.prototype={
gA(a){if(((a.$flags|0)&2)!==0)return new A.kk(a.buffer)
else return a.buffer},
iA(a,b,c,d){var s=A.ah(b,0,c,d,null)
throw A.h(s)},
em(a,b,c,d){if(b>>>0!==b||b>c)this.iA(a,b,c,d)},
$ia2:1}
A.kk.prototype={
dd(a,b,c){var s=A.pT(this.a,b,c)
s.$flags=3
return s},
fl(a){return this.dd(0,0,null)},
fi(a,b,c){var s=A.pN(this.a,b,c)
s.$flags=3
return s},
dc(a,b,c){var s=A.pP(this.a,b,c)
s.$flags=3
return s},
fj(a){return this.dc(0,0,null)},
fg(a,b,c){var s=A.pJ(this.a,b,c)
s.$flags=3
return s},
fk(a,b,c){var s=A.pR(this.a,b,c)
s.$flags=3
return s},
fh(a,b,c){var s=A.pL(this.a,b,c)
s.$flags=3
return s},
ff(a,b,c){var s=A.pI(this.a,b,c)
s.$flags=3
return s},
fe(a,b,c){var s=A.pF(this.a,b,c)
s.$flags=3
return s}}
A.ht.prototype={
gaJ(a){return B.ky},
$iN:1}
A.ag.prototype={
gu(a){return a.length},
f0(a,b,c,d,e){var s,r,q
t.dO.a(d)
s=a.length
this.em(a,b,s,"start")
this.em(a,c,s,"end")
if(b>c)throw A.h(A.ah(b,0,c,null,null))
r=c-b
if(e<0)throw A.h(A.bs(e,null))
q=d.length
if(q-e<r)throw A.h(A.m8("Not enough elements"))
if(e!==0||q!==r)d=d.subarray(e,e+r)
a.set(d,b)},
$ian:1,
$iaK:1}
A.bT.prototype={
m(a,b){A.bJ(b,a,a.length)
return a[b]},
h(a,b,c){A.dL(c)
a.$flags&2&&A.b(a)
A.bJ(b,a,a.length)
a[b]=c},
aq(a,b,c,d,e){t.U.a(d)
a.$flags&2&&A.b(a,5)
if(t.dQ.b(d)){this.f0(a,b,c,d,e)
return}this.e9(a,b,c,d,e)},
bD(a,b,c,d){return this.aq(a,b,c,d,0)},
$iD:1,
$ie:1,
$iq:1}
A.aN.prototype={
h(a,b,c){A.w(c)
a.$flags&2&&A.b(a)
A.bJ(b,a,a.length)
a[b]=c},
aq(a,b,c,d,e){t.Y.a(d)
a.$flags&2&&A.b(a,5)
if(t.aj.b(d)){this.f0(a,b,c,d,e)
return}this.e9(a,b,c,d,e)},
bD(a,b,c,d){return this.aq(a,b,c,d,0)},
$iD:1,
$ie:1,
$iq:1}
A.es.prototype={
gaJ(a){return B.kz},
be(a,b,c){return new Float32Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$ie3:1}
A.et.prototype={
gaJ(a){return B.kA},
be(a,b,c){return new Float64Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$ilB:1}
A.eu.prototype={
gaJ(a){return B.kB},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Int16Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$iiO:1}
A.ev.prototype={
gaJ(a){return B.kC},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Int32Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$ief:1}
A.ew.prototype={
gaJ(a){return B.kD},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Int8Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$ilH:1}
A.ey.prototype={
gaJ(a){return B.kF},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Uint16Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$ima:1}
A.ez.prototype={
gaJ(a){return B.kG},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Uint32Array(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1,
$ibF:1}
A.eA.prototype={
gaJ(a){return B.kH},
gu(a){return a.length},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Uint8ClampedArray(a.subarray(b,A.bh(b,c,a.length)))},
$iN:1}
A.cm.prototype={
gaJ(a){return B.kI},
gu(a){return a.length},
m(a,b){A.bJ(b,a,a.length)
return a[b]},
be(a,b,c){return new Uint8Array(a.subarray(b,A.bh(b,c,a.length)))},
h0(a,b){return this.be(a,b,null)},
$iN:1,
$icm:1,
$ibf:1}
A.fh.prototype={}
A.fi.prototype={}
A.fj.prototype={}
A.fk.prototype={}
A.bd.prototype={
l(a){return A.ft(v.typeUniverse,this,a)},
aG(a){return A.nX(v.typeUniverse,this,a)}}
A.i3.prototype={}
A.ia.prototype={
B(a){return A.aR(this.a,null)}}
A.i1.prototype={
B(a){return this.a}}
A.fp.prototype={$ibD:1}
A.jP.prototype={
$1(a){var s=this.a,r=s.a
s.a=null
r.$0()},
$S:16}
A.jO.prototype={
$1(a){var s,r
this.a.a=t.M.a(a)
s=this.b
r=this.c
s.firstChild?s.removeChild(r):s.appendChild(r)},
$S:26}
A.jQ.prototype={
$0(){this.a.$0()},
$S:21}
A.jR.prototype={
$0(){this.a.$0()},
$S:21}
A.kg.prototype={
hp(a,b){if(self.setTimeout!=null)self.setTimeout(A.dP(new A.kh(this,b),0),a)
else throw A.h(A.bg("`setTimeout()` not found."))}}
A.kh.prototype={
$0(){this.b.$0()},
$S:2}
A.bm.prototype={
B(a){return A.E(this.a)},
$iS:1,
gci(){return this.b}}
A.i0.prototype={
fo(a){var s=this.a
if((s.a&30)!==0)throw A.h(A.m8("Future already completed"))
s.ei(A.t0(a,null))}}
A.f6.prototype={}
A.f8.prototype={
k_(a){if((this.c&15)!==6)return!0
return this.b.b.e0(t.nU.a(this.d),a.a,t.y,t.K)},
jT(a){var s,r=this,q=r.e,p=null,o=t.z,n=t.K,m=a.a,l=r.b.b
if(t.Q.b(q))p=l.kj(q,m,a.b,o,n,t.m)
else p=l.e0(t.E.a(q),m,o,n)
try{o=r.$ti.l("2/").a(p)
return o}catch(s){if(t.do.b(A.bK(s))){if((r.c&1)!==0)throw A.h(A.bs("The error handler of Future.then must return a value of the returned future's type","onError"))
throw A.h(A.bs("The error handler of Future.catchError must return a value of the future's type","onError"))}else throw s}}}
A.b_.prototype={
km(a,b,c){var s,r,q=this.$ti
q.aG(c).l("1/(2)").a(a)
s=$.ac
if(s===B.A){if(!t.Q.b(b)&&!t.E.b(b))throw A.h(A.iq(b,"onError",u.c))}else{c.l("@<0/>").aG(q.c).l("1(2)").a(a)
b=A.tj(b,s)}r=new A.b_(s,c.l("b_<0>"))
this.ee(new A.f8(r,3,a,b,q.l("@<1>").aG(c).l("f8<1,2>")))
return r},
jl(a){this.a=this.a&1|16
this.c=a},
cT(a){this.a=a.a&30|this.a&1
this.c=a.c},
ee(a){var s,r=this,q=r.a
if(q<=3){a.a=t.F.a(r.c)
r.c=a}else{if((q&4)!==0){s=t._.a(r.c)
if((s.a&24)===0){s.ee(a)
return}r.cT(s)}A.ie(null,null,r.b,t.M.a(new A.k_(r,a)))}},
eU(a){var s,r,q,p,o,n,m=this,l={}
l.a=a
if(a==null)return
s=m.a
if(s<=3){r=t.F.a(m.c)
m.c=a
if(r!=null){q=a.a
for(p=a;q!=null;p=q,q=o)o=q.a
p.a=r}}else{if((s&4)!==0){n=t._.a(m.c)
if((n.a&24)===0){n.eU(a)
return}m.cT(n)}l.a=m.d6(a)
A.ie(null,null,m.b,t.M.a(new A.k3(l,m)))}},
d5(){var s=t.F.a(this.c)
this.c=null
return this.d6(s)},
d6(a){var s,r,q
for(s=a,r=null;s!=null;r=s,s=q){q=s.a
s.a=r}return r},
hF(a){var s,r=this
r.$ti.c.a(a)
s=r.d5()
r.a=8
r.c=a
A.dH(r,s)},
hE(a){var s,r,q=this
if((a.a&16)!==0){s=q.b===a.b
s=!(s||s)}else s=!1
if(s)return
r=q.d5()
q.cT(a)
A.dH(q,r)},
eq(a){var s=this.d5()
this.jl(a)
A.dH(this,s)},
ht(a){var s=this.$ti
s.l("1/").a(a)
if(s.l("d5<1>").b(a)){this.hC(a)
return}this.hu(a)},
hu(a){var s=this
s.$ti.c.a(a)
s.a^=2
A.ie(null,null,s.b,t.M.a(new A.k1(s,a)))},
hC(a){A.me(this.$ti.l("d5<1>").a(a),this,!1)
return},
ei(a){this.a^=2
A.ie(null,null,this.b,t.M.a(new A.k0(this,a)))},
$id5:1}
A.k_.prototype={
$0(){A.dH(this.a,this.b)},
$S:2}
A.k3.prototype={
$0(){A.dH(this.b,this.a.a)},
$S:2}
A.k2.prototype={
$0(){A.me(this.a.a,this.b,!0)},
$S:2}
A.k1.prototype={
$0(){this.a.hF(this.b)},
$S:2}
A.k0.prototype={
$0(){this.a.eq(this.b)},
$S:2}
A.k6.prototype={
$0(){var s,r,q,p,o,n,m,l,k=this,j=null
try{q=k.a.a
j=q.b.b.ki(t.mY.a(q.d),t.z)}catch(p){s=A.bK(p)
r=A.fy(p)
if(k.c&&t.u.a(k.b.a.c).a===s){q=k.a
q.c=t.u.a(k.b.a.c)}else{q=s
o=r
if(o==null)o=A.ly(q)
n=k.a
n.c=new A.bm(q,o)
q=n}q.b=!0
return}if(j instanceof A.b_&&(j.a&24)!==0){if((j.a&16)!==0){q=k.a
q.c=t.u.a(j.c)
q.b=!0}return}if(j instanceof A.b_){m=k.b.a
l=new A.b_(m.b,m.$ti)
j.km(new A.k7(l,m),new A.k8(l),t.ef)
q=k.a
q.c=l
q.b=!1}},
$S:2}
A.k7.prototype={
$1(a){this.a.hE(this.b)},
$S:16}
A.k8.prototype={
$2(a,b){A.id(a)
t.m.a(b)
this.a.eq(new A.bm(a,b))},
$S:40}
A.k5.prototype={
$0(){var s,r,q,p,o,n,m,l
try{q=this.a
p=q.a
o=p.$ti
n=o.c
m=n.a(this.b)
q.c=p.b.b.e0(o.l("2/(1)").a(p.d),m,o.l("2/"),n)}catch(l){s=A.bK(l)
r=A.fy(l)
q=s
p=r
if(p==null)p=A.ly(q)
o=this.a
o.c=new A.bm(q,p)
o.b=!0}},
$S:2}
A.k4.prototype={
$0(){var s,r,q,p,o,n,m,l=this
try{s=t.u.a(l.a.a.c)
p=l.b
if(p.a.k_(s)&&p.a.e!=null){p.c=p.a.jT(s)
p.b=!1}}catch(o){r=A.bK(o)
q=A.fy(o)
p=t.u.a(l.a.a.c)
if(p.a===r){n=l.b
n.c=p
p=n}else{p=r
n=q
if(n==null)n=A.ly(p)
m=l.b
m.c=new A.bm(p,n)
p=m}p.b=!0}},
$S:2}
A.i_.prototype={}
A.fu.prototype={$inK:1}
A.i7.prototype={
kk(a){var s,r,q
t.M.a(a)
try{if(B.A===$.ac){a.$0()
return}A.of(null,null,this,a,t.ef)}catch(q){s=A.bK(q)
r=A.fy(q)
A.mw(A.id(s),t.m.a(r))}},
jv(a){return new A.kf(this,t.M.a(a))},
ki(a,b){b.l("0()").a(a)
if($.ac===B.A)return a.$0()
return A.of(null,null,this,a,b)},
e0(a,b,c,d){c.l("@<0>").aG(d).l("1(2)").a(a)
d.a(b)
if($.ac===B.A)return a.$1(b)
return A.tl(null,null,this,a,b,c,d)},
kj(a,b,c,d,e,f){d.l("@<0>").aG(e).aG(f).l("1(2,3)").a(a)
e.a(b)
f.a(c)
if($.ac===B.A)return a.$2(b,c)
return A.tk(null,null,this,a,b,c,d,e,f)}}
A.kf.prototype={
$0(){return this.a.kk(this.b)},
$S:2}
A.kY.prototype={
$0(){A.pg(this.a,this.b)},
$S:2}
A.f9.prototype={
gu(a){return this.a},
gah(a){return this.a===0},
gb9(){return new A.fa(this,this.$ti.l("fa<1>"))},
Z(a){var s,r
if(typeof a=="string"&&a!=="__proto__"){s=this.b
return s==null?!1:s[a]!=null}else if(typeof a=="number"&&(a&1073741823)===a){r=this.c
return r==null?!1:r[a]!=null}else return this.hI(a)},
hI(a){var s=this.d
if(s==null)return!1
return this.cc(this.eE(s,a),a)>=0},
m(a,b){var s,r,q
if(typeof b=="string"&&b!=="__proto__"){s=this.b
r=s==null?null:A.nN(s,b)
return r}else if(typeof b=="number"&&(b&1073741823)===b){q=this.c
r=q==null?null:A.nN(q,b)
return r}else return this.hD(b)},
hD(a){var s,r,q=this.d
if(q==null)return null
s=this.eE(q,a)
r=this.cc(s,a)
return r<0?null:s[r+1]},
h(a,b,c){var s,r,q,p,o,n,m=this,l=m.$ti
l.c.a(b)
l.y[1].a(c)
if(typeof b=="string"&&b!=="__proto__"){s=m.b
m.eo(s==null?m.b=A.mf():s,b,c)}else if(typeof b=="number"&&(b&1073741823)===b){r=m.c
m.eo(r==null?m.c=A.mf():r,b,c)}else{q=m.d
if(q==null)q=m.d=A.mf()
p=A.ij(b)&1073741823
o=q[p]
if(o==null){A.mg(q,p,[b,c]);++m.a
m.e=null}else{n=m.cc(o,b)
if(n>=0)o[n+1]=c
else{o.push(b,c);++m.a
m.e=null}}}},
aN(a,b){var s,r,q,p,o,n,m=this,l=m.$ti
l.l("~(1,2)").a(b)
s=m.ep()
for(r=s.length,q=l.c,l=l.y[1],p=0;p<r;++p){o=s[p]
q.a(o)
n=m.m(0,o)
b.$2(o,n==null?l.a(n):n)
if(s!==m.e)throw A.h(A.aq(m))}},
ep(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.e
if(h!=null)return h
h=A.K(i.a,null,!1,t.z)
s=i.b
r=0
if(s!=null){q=Object.getOwnPropertyNames(s)
p=q.length
for(o=0;o<p;++o){h[r]=q[o];++r}}n=i.c
if(n!=null){q=Object.getOwnPropertyNames(n)
p=q.length
for(o=0;o<p;++o){h[r]=+q[o];++r}}m=i.d
if(m!=null){q=Object.getOwnPropertyNames(m)
p=q.length
for(o=0;o<p;++o){l=m[q[o]]
k=l.length
for(j=0;j<k;j+=2){h[r]=l[j];++r}}}return i.e=h},
eo(a,b,c){var s=this.$ti
s.c.a(b)
s.y[1].a(c)
if(a[b]==null){++this.a
this.e=null}A.mg(a,b,c)},
eE(a,b){return a[A.ij(b)&1073741823]}}
A.fc.prototype={
cc(a,b){var s,r,q
if(a==null)return-1
s=a.length
for(r=0;r<s;r+=2){q=a[r]
if(q==null?b==null:q===b)return r}return-1}}
A.fa.prototype={
gu(a){return this.a.a},
gah(a){return this.a.a===0},
gF(a){var s=this.a
return new A.fb(s,s.ep(),this.$ti.l("fb<1>"))},
aI(a,b){return this.a.Z(b)}}
A.fb.prototype={
gL(){var s=this.d
return s==null?this.$ti.c.a(s):s},
D(){var s=this,r=s.b,q=s.c,p=s.a
if(r!==p.e)throw A.h(A.aq(p))
else if(q>=r.length){s.d=null
return!1}else{s.d=r[q]
s.c=q+1
return!0}},
$iA:1}
A.ff.prototype={
gF(a){var s=this,r=new A.fg(s,s.r,s.$ti.l("fg<1>"))
r.c=s.e
return r},
gu(a){return this.a},
gah(a){return this.a===0},
aI(a,b){var s,r
if(b!=="__proto__"){s=this.b
if(s==null)return!1
return t.nF.a(s[b])!=null}else{r=this.hH(b)
return r}},
hH(a){var s=this.d
if(s==null)return!1
return this.cc(s[B.o.gH(a)&1073741823],a)>=0},
I(a,b){var s,r,q=this
q.$ti.c.a(b)
if(typeof b=="string"&&b!=="__proto__"){s=q.b
return q.en(s==null?q.b=A.mh():s,b)}else if(typeof b=="number"&&(b&1073741823)===b){r=q.c
return q.en(r==null?q.c=A.mh():r,b)}else return q.hq(b)},
hq(a){var s,r,q,p=this
p.$ti.c.a(a)
s=p.d
if(s==null)s=p.d=A.mh()
r=J.bk(a)&1073741823
q=s[r]
if(q==null)s[r]=[p.dr(a)]
else{if(p.cc(q,a)>=0)return!1
q.push(p.dr(a))}return!0},
en(a,b){this.$ti.c.a(b)
if(t.nF.a(a[b])!=null)return!1
a[b]=this.dr(b)
return!0},
dr(a){var s=this,r=new A.i6(s.$ti.c.a(a))
if(s.e==null)s.e=s.f=r
else s.f=s.f.b=r;++s.a
s.r=s.r+1&1073741823
return r},
cc(a,b){var s,r
if(a==null)return-1
s=a.length
for(r=0;r<s;++r)if(J.ae(a[r].a,b))return r
return-1}}
A.i6.prototype={}
A.fg.prototype={
gL(){var s=this.d
return s==null?this.$ti.c.a(s):s},
D(){var s=this,r=s.c,q=s.a
if(s.b!==q.r)throw A.h(A.aq(q))
else if(r==null){s.d=null
return!1}else{s.d=s.$ti.l("1?").a(r.a)
s.c=r.b
return!0}},
$iA:1}
A.j0.prototype={
$2(a,b){this.a.h(0,this.b.a(a),this.c.a(b))},
$S:45}
A.I.prototype={
gF(a){return new A.aM(a,this.gu(a),A.b2(a).l("aM<I.E>"))},
bp(a,b){return this.m(a,b)},
gah(a){return this.gu(a)===0},
gfz(a){return this.gu(a)!==0},
aI(a,b){var s,r=this.gu(a)
for(s=0;s<r;++s){if(this.m(a,s)===b)return!0
if(r!==this.gu(a))throw A.h(A.aq(a))}return!1},
dW(a,b,c,d){var s,r,q
d.a(b)
A.b2(a).aG(d).l("1(1,I.E)").a(c)
s=this.gu(a)
for(r=b,q=0;q<s;++q){r=c.$2(r,this.m(a,q))
if(s!==this.gu(a))throw A.h(A.aq(a))}return r},
dk(a,b){return A.bX(a,b,null,A.b2(a).l("I.E"))},
fG(a,b){return A.bX(a,0,A.cJ(b,"count",t.p),A.b2(a).l("I.E"))},
be(a,b,c){var s,r=this.gu(a)
A.bo(b,c,r)
A.bo(b,c,this.gu(a))
s=A.b2(a).l("I.E")
s=A.u(A.bX(a,b,c,s),s)
return s},
aF(a,b,c,d){var s
A.b2(a).l("I.E?").a(d)
A.bo(b,c,this.gu(a))
for(s=b;s<c;++s)this.h(a,s,d)},
aq(a,b,c,d,e){var s,r,q,p,o
A.b2(a).l("e<I.E>").a(d)
A.bo(b,c,this.gu(a))
s=c-b
if(s===0)return
A.bB(e,"skipCount")
if(t.j.b(d)){r=e
q=d}else{q=J.lw(d,e).fH(0,!1)
r=0}p=J.a6(q)
if(r+s>p.gu(q))throw A.h(A.ne())
if(r<b)for(o=s-1;o>=0;--o)this.h(a,b+o,p.m(q,r+o))
else for(o=0;o<s;++o)this.h(a,b+o,p.m(q,r+o))},
bD(a,b,c,d){return this.aq(a,b,c,d,0)},
fT(a,b,c){A.b2(a).l("e<I.E>").a(c)
this.bD(a,b,b+c.length,c)},
B(a){return A.lI(a,"[","]")},
$iD:1,
$ie:1,
$iq:1}
A.Q.prototype={
dP(a,b,c){var s=A.m(this)
return A.np(this,s.l("Q.K"),s.l("Q.V"),b,c)},
aN(a,b){var s,r,q,p=A.m(this)
p.l("~(Q.K,Q.V)").a(b)
for(s=this.gb9(),s=s.gF(s),p=p.l("Q.V");s.D();){r=s.gL()
q=this.m(0,r)
b.$2(r,q==null?p.a(q):q)}},
e2(a,b,c){var s,r=this,q=A.m(r)
q.l("Q.K").a(a)
q.l("Q.V(Q.V)").a(b)
q.l("Q.V()?").a(c)
if(r.Z(a)){s=r.m(0,a)
q=b.$1(s==null?q.l("Q.V").a(s):s)
r.h(0,a,q)
return q}if(c!=null){q=c.$0()
r.h(0,a,q)
return q}throw A.h(A.iq(a,"key","Key not in map."))},
Z(a){return this.gb9().aI(0,a)},
gu(a){var s=this.gb9()
return s.gu(s)},
gah(a){var s=this.gb9()
return s.gah(s)},
B(a){return A.lO(this)},
$iY:1}
A.j2.prototype={
$2(a,b){var s,r=this.a
if(!r.a)this.b.a+=", "
r.a=!1
r=this.b
s=A.E(a)
r.a=(r.a+=s)+": "
s=A.E(b)
r.a+=s},
$S:13}
A.dx.prototype={
gah(a){return this.a===0},
B(a){return A.lI(this,"{","}")},
$iD:1,
$ie:1}
A.fn.prototype={}
A.i4.prototype={
m(a,b){var s,r=this.b
if(r==null)return this.c.m(0,b)
else if(typeof b!="string")return null
else{s=r[b]
return typeof s=="undefined"?this.hJ(b):s}},
gu(a){return this.b==null?this.c.a:this.ck().length},
gah(a){return this.gu(0)===0},
gb9(){if(this.b==null){var s=this.c
return new A.by(s,A.m(s).l("by<1>"))}return new A.i5(this)},
h(a,b,c){var s,r,q=this
A.b1(b)
if(q.b==null)q.c.h(0,b,c)
else if(q.Z(b)){s=q.b
s[b]=c
r=q.a
if(r==null?s!=null:r!==s)r[b]=null}else q.jp().h(0,b,c)},
Z(a){if(this.b==null)return this.c.Z(a)
return Object.prototype.hasOwnProperty.call(this.a,a)},
aN(a,b){var s,r,q,p,o=this
t.lc.a(b)
if(o.b==null)return o.c.aN(0,b)
s=o.ck()
for(r=0;r<s.length;++r){q=s[r]
p=o.b[q]
if(typeof p=="undefined"){p=A.kr(o.a[q])
o.b[q]=p}b.$2(q,p)
if(s!==o.c)throw A.h(A.aq(o))}},
ck(){var s=t.lH.a(this.c)
if(s==null)s=this.c=A.k(Object.keys(this.a),t.s)
return s},
jp(){var s,r,q,p,o,n=this
if(n.b==null)return n.c
s=A.H(t.N,t.z)
r=n.ck()
for(q=0;p=r.length,q<p;++q){o=r[q]
s.h(0,o,n.m(0,o))}if(p===0)B.c.I(r,"")
else B.c.cs(r)
n.a=n.b=null
return n.c=s},
hJ(a){var s
if(!Object.prototype.hasOwnProperty.call(this.a,a))return null
s=A.kr(this.a[a])
return this.b[a]=s}}
A.i5.prototype={
gu(a){return this.a.gu(0)},
bp(a,b){var s=this.a
if(s.b==null)s=s.gb9().bp(0,b)
else{s=s.ck()
if(!(b>=0&&b<s.length))return A.a(s,b)
s=s[b]}return s},
gF(a){var s=this.a
if(s.b==null){s=s.gb9()
s=s.gF(s)}else{s=s.ck()
s=new J.c3(s,s.length,A.W(s).l("c3<1>"))}return s},
aI(a,b){return this.a.Z(b)}}
A.km.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:true})
return s}catch(r){}return null},
$S:25}
A.kl.prototype={
$0(){var s,r
try{s=new TextDecoder("utf-8",{fatal:false})
return s}catch(r){}return null},
$S:25}
A.ki.prototype={
bo(a){var s,r,q,p
t.L.a(a)
s=a.length
r=A.bo(0,null,s)
for(q=0;q<r;++q){if(!(q<s))return A.a(a,q)
p=a[q]
if((p&4294967040)!==0){if(!this.a)throw A.h(A.b7("Invalid value in input: "+p,null,null))
return this.hK(a,0,r)}}return A.dA(a,0,r)},
hK(a,b,c){var s,r,q,p
t.L.a(a)
for(s=a.length,r=b,q="";r<c;++r){if(!(r<s))return A.a(a,r)
p=a[r]
q+=A.Z((p&4294967040)!==0?65533:p)}return q.charCodeAt(0)==0?q:q}}
A.dS.prototype={
gc3(){return B.cv}}
A.is.prototype={
bo(a){var s
t.L.a(a)
s=a.length
if(s===0)return""
s=new A.jT("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").jM(a,0,s,!0)
s.toString
return A.dA(s,0,null)}}
A.jT.prototype={
jM(a,b,c,d){var s,r,q,p,o
t.L.a(a)
s=this.a
r=(s&3)+(c-b)
q=B.a.V(r,3)
p=q*4
if(r-q*3>0)p+=4
o=new Uint8Array(p)
this.a=A.ra(this.b,a,b,c,!0,o,0,s)
if(p>0)return o
return null}}
A.ir.prototype={
bo(a){var s,r,q,p=A.bo(0,null,a.length)
if(0===p)return new Uint8Array(0)
s=new A.jS()
r=s.dR(a,0,p)
r.toString
q=s.a
if(q<-1)A.ad(A.b7("Missing padding character",a,p))
if(q>0)A.ad(A.b7("Invalid length, must be multiple of four",a,p))
s.a=-1
return r}}
A.jS.prototype={
dR(a,b,c){var s,r=this,q=r.a
if(q<0){r.a=A.nL(a,b,c,q)
return null}if(b===c)return new Uint8Array(0)
s=A.r7(a,b,c,q)
r.a=A.r9(a,b,c,s,0,r.a)
return s}}
A.ap.prototype={}
A.fL.prototype={}
A.fN.prototype={}
A.eo.prototype={
B(a){var s=A.fO(this.a)
return(this.b!=null?"Converting object to an encodable object failed:":"Converting object did not return an encodable object:")+" "+s}}
A.hq.prototype={
B(a){return"Cyclic error in JSON stringify"}}
A.hp.prototype={
jB(a,b){var s=A.th(a,this.gjI().a)
return s},
jL(a,b){var s=A.re(a,this.gc3().b,null)
return s},
gc3(){return B.dc},
gjI(){return B.db}}
A.iY.prototype={}
A.iX.prototype={}
A.kb.prototype={
fM(a){var s,r,q,p,o,n,m=a.length
for(s=this.c,r=0,q=0;q<m;++q){p=a.charCodeAt(q)
if(p>92){if(p>=55296){o=p&64512
if(o===55296){n=q+1
n=!(n<m&&(a.charCodeAt(n)&64512)===56320)}else n=!1
if(!n)if(o===56320){o=q-1
o=!(o>=0&&(a.charCodeAt(o)&64512)===55296)}else o=!1
else o=!0
if(o){if(q>r)s.a+=B.o.c8(a,r,q)
r=q+1
o=A.Z(92)
s.a+=o
o=A.Z(117)
s.a+=o
o=A.Z(100)
s.a+=o
o=p>>>8&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
o=p>>>4&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.Z(o<10?48+o:87+o)
s.a+=o}}continue}if(p<32){if(q>r)s.a+=B.o.c8(a,r,q)
r=q+1
o=A.Z(92)
s.a+=o
switch(p){case 8:o=A.Z(98)
s.a+=o
break
case 9:o=A.Z(116)
s.a+=o
break
case 10:o=A.Z(110)
s.a+=o
break
case 12:o=A.Z(102)
s.a+=o
break
case 13:o=A.Z(114)
s.a+=o
break
default:o=A.Z(117)
s.a+=o
o=A.Z(48)
s.a=(s.a+=o)+o
o=p>>>4&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
o=p&15
o=A.Z(o<10?48+o:87+o)
s.a+=o
break}}else if(p===34||p===92){if(q>r)s.a+=B.o.c8(a,r,q)
r=q+1
o=A.Z(92)
s.a+=o
o=A.Z(p)
s.a+=o}}if(r===0)s.a+=a
else if(r<m)s.a+=B.o.c8(a,r,m)},
dn(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<r;++q){p=s[q]
if(a==null?p==null:a===p)throw A.h(new A.hq(a,null))}B.c.I(s,a)},
di(a){var s,r,q,p,o=this
if(o.fL(a))return
o.dn(a)
try{s=o.b.$1(a)
if(!o.fL(s)){q=A.ni(a,null,o.geS())
throw A.h(q)}q=o.a
if(0>=q.length)return A.a(q,-1)
q.pop()}catch(p){r=A.bK(p)
q=A.ni(a,r,o.geS())
throw A.h(q)}},
fL(a){var s,r,q=this
if(typeof a=="number"){if(!isFinite(a))return!1
q.c.a+=B.b.B(a)
return!0}else if(a===!0){q.c.a+="true"
return!0}else if(a===!1){q.c.a+="false"
return!0}else if(a==null){q.c.a+="null"
return!0}else if(typeof a=="string"){s=q.c
s.a+='"'
q.fM(a)
s.a+='"'
return!0}else if(t.j.b(a)){q.dn(a)
q.kx(a)
s=q.a
if(0>=s.length)return A.a(s,-1)
s.pop()
return!0}else if(t.av.b(a)){q.dn(a)
r=q.ky(a)
s=q.a
if(0>=s.length)return A.a(s,-1)
s.pop()
return r}else return!1},
kx(a){var s,r,q=this.c
q.a+="["
s=J.a6(a)
if(s.gfz(a)){this.di(s.m(a,0))
for(r=1;r<s.gu(a);++r){q.a+=","
this.di(s.m(a,r))}}q.a+="]"},
ky(a){var s,r,q,p,o,n,m=this,l={}
if(a.gah(a)){m.c.a+="{}"
return!0}s=a.gu(a)*2
r=A.K(s,null,!1,t.X)
q=l.a=0
l.b=!0
a.aN(0,new A.kc(l,r))
if(!l.b)return!1
p=m.c
p.a+="{"
for(o='"';q<s;q+=2,o=',"'){p.a+=o
m.fM(A.b1(r[q]))
p.a+='":'
n=q+1
if(!(n<s))return A.a(r,n)
m.di(r[n])}p.a+="}"
return!0}}
A.kc.prototype={
$2(a,b){var s,r
if(typeof a!="string")this.a.b=!1
s=this.b
r=this.a
B.c.h(s,r.a++,a)
B.c.h(s,r.a++,b)},
$S:13}
A.ka.prototype={
geS(){var s=this.c.a
return s.charCodeAt(0)==0?s:s}}
A.hr.prototype={
bR(a){var s
t.L.a(a)
s=B.dd.bo(a)
return s}}
A.iZ.prototype={}
A.hV.prototype={
jA(a,b){t.L.a(a)
return(b===!0?B.kK:B.kJ).bo(a)}}
A.hW.prototype={
bo(a){return new A.ib(this.a).er(t.L.a(a),0,null,!0)}}
A.ib.prototype={
er(a,b,c,d){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=A.bo(b,c,a.length)
if(b===s)return""
if(a instanceof Uint8Array){r=a
q=r
p=0}else{q=A.rx(a,b,s)
s-=b
p=b
b=0}if(s-b>=15){o=l.a
n=A.rw(o,q,b,s)
if(n!=null){if(!o)return n
if(n.indexOf("\ufffd")<0)return n}}n=l.du(q,b,s,!0)
o=l.b
if((o&1)!==0){m=A.ry(o)
l.b=0
throw A.h(A.b7(m,a,p+l.c))}return n},
du(a,b,c,d){var s,r,q=this
if(c-b>1000){s=B.a.V(b+c,2)
r=q.du(a,b,s,!1)
if((q.b&1)!==0)return r
return r+q.du(a,s,c,d)}return q.jE(a,b,c,d)},
jE(a,b,a0,a1){var s,r,q,p,o,n,m,l,k=this,j="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFFFFFFFFFFFFFFFFGGGGGGGGGGGGGGGGHHHHHHHHHHHHHHHHHHHHHHHHHHHIHHHJEEBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBKCCCCCCCCCCCCDCLONNNMEEEEEEEEEEE",i=" \x000:XECCCCCN:lDb \x000:XECCCCCNvlDb \x000:XECCCCCN:lDb AAAAA\x00\x00\x00\x00\x00AAAAA00000AAAAA:::::AAAAAGG000AAAAA00KKKAAAAAG::::AAAAA:IIIIAAAAA000\x800AAAAA\x00\x00\x00\x00 AAAAA",h=65533,g=k.b,f=k.c,e=new A.cB(""),d=b+1,c=a.length
if(!(b>=0&&b<c))return A.a(a,b)
s=a[b]
A:for(r=k.a;;){for(;;d=o){if(!(s>=0&&s<256))return A.a(j,s)
q=j.charCodeAt(s)&31
f=g<=32?s&61694>>>q:(s&63|f<<6)>>>0
p=g+q
if(!(p>=0&&p<144))return A.a(i,p)
g=i.charCodeAt(p)
if(g===0){p=A.Z(f)
e.a+=p
if(d===a0)break A
break}else if((g&1)!==0){if(r)switch(g){case 69:case 67:p=A.Z(h)
e.a+=p
break
case 65:p=A.Z(h)
e.a+=p;--d
break
default:p=A.Z(h)
e.a=(e.a+=p)+p
break}else{k.b=g
k.c=d-1
return""}g=0}if(d===a0)break A
o=d+1
if(!(d>=0&&d<c))return A.a(a,d)
s=a[d]}o=d+1
if(!(d>=0&&d<c))return A.a(a,d)
s=a[d]
if(s<128){for(;;){if(!(o<a0)){n=a0
break}m=o+1
if(!(o>=0&&o<c))return A.a(a,o)
s=a[o]
if(s>=128){n=m-1
o=m
break}o=m}if(n-d<20)for(l=d;l<n;++l){if(!(l<c))return A.a(a,l)
p=A.Z(a[l])
e.a+=p}else{p=A.dA(a,d,n)
e.a+=p}if(n===a0)break A
d=o}else d=o}if(a1&&g>32)if(r){c=A.Z(h)
e.a+=c}else{k.b=77
k.c=a0
return""}k.b=g
k.c=f
c=e.a
return c.charCodeAt(0)==0?c:c}}
A.c7.prototype={
U(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.c7)if(this.a===b.a)s=this.b===b.b
return s},
gH(a){return A.hu(this.a,this.b,B.z,B.z)},
bz(a,b){var s
t.cs.a(b)
s=B.a.bz(this.a,b.a)
if(s!==0)return s
return B.a.bz(this.b,b.b)},
B(a){var s=this,r=A.pe(A.q1(s)),q=A.fM(A.q_(s)),p=A.fM(A.pW(s)),o=A.fM(A.pX(s)),n=A.fM(A.pZ(s)),m=A.fM(A.q0(s)),l=A.mW(A.pY(s)),k=s.b,j=k===0?"":A.mW(k)
return r+"-"+q+"-"+p+" "+o+":"+n+":"+m+"."+l+j+"Z"},
$ib5:1}
A.jW.prototype={
B(a){return this.ae()}}
A.S.prototype={
gci(){return A.pV(this)}}
A.fB.prototype={
B(a){var s=this.a
if(s!=null)return"Assertion failed: "+A.fO(s)
return"Assertion failed"}}
A.bD.prototype={}
A.b3.prototype={
gdz(){return"Invalid argument"+(!this.a?"(s)":"")},
gdw(){return""},
B(a){var s=this,r=s.c,q=r==null?"":" ("+r+")",p=s.d,o=p==null?"":": "+A.E(p),n=s.gdz()+q+o
if(!s.a)return n
return n+s.gdw()+": "+A.fO(s.gdX())},
gdX(){return this.b}}
A.bA.prototype={
gdX(){return A.o2(this.b)},
gdz(){return"RangeError"},
gdw(){var s,r=this.e,q=this.f
if(r==null)s=q!=null?": Not less than or equal to "+A.E(q):""
else if(q==null)s=": Not greater than or equal to "+A.E(r)
else if(q>r)s=": Not in inclusive range "+A.E(r)+".."+A.E(q)
else s=q<r?": Valid value range is empty":": Only valid value is "+A.E(r)
return s}}
A.h1.prototype={
gdX(){return A.w(this.b)},
gdz(){return"RangeError"},
gdw(){if(A.w(this.b)<0)return": index must not be negative"
var s=this.f
if(s===0)return": no indices are valid"
return": index should be less than "+s},
$ibA:1,
gu(a){return this.f}}
A.eY.prototype={
B(a){return"Unsupported operation: "+this.a}}
A.hT.prototype={
B(a){return"UnimplementedError: "+this.a}}
A.dz.prototype={
B(a){return"Bad state: "+this.a}}
A.fJ.prototype={
B(a){var s=this.a
if(s==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+A.fO(s)+"."}}
A.hv.prototype={
B(a){return"Out of Memory"},
gci(){return null},
$iS:1}
A.eW.prototype={
B(a){return"Stack Overflow"},
gci(){return null},
$iS:1}
A.jX.prototype={
B(a){return"Exception: "+this.a}}
A.aw.prototype={
B(a){var s,r,q,p,o,n,m,l,k,j,i,h=this.a,g=""!==h?"FormatException: "+h:"FormatException",f=this.c,e=this.b
if(typeof e=="string"){if(f!=null)s=f<0||f>e.length
else s=!1
if(s)f=null
if(f==null){if(e.length>78)e=B.o.c8(e,0,75)+"..."
return g+"\n"+e}for(r=e.length,q=1,p=0,o=!1,n=0;n<f;++n){if(!(n<r))return A.a(e,n)
m=e.charCodeAt(n)
if(m===10){if(p!==n||!o)++q
p=n+1
o=!1}else if(m===13){++q
p=n+1
o=!0}}g=q>1?g+(" (at line "+q+", character "+(f-p+1)+")\n"):g+(" (at character "+(f+1)+")\n")
for(n=f;n<r;++n){if(!(n>=0))return A.a(e,n)
m=e.charCodeAt(n)
if(m===10||m===13){r=n
break}}l=""
if(r-p>78){k="..."
if(f-p<75){j=p+75
i=p}else{if(r-f<75){i=r-75
j=r
k=""}else{i=f-36
j=f+36}l="..."}}else{j=r
i=p
k=""}return g+l+B.o.c8(e,i,j)+k+"\n"+B.o.dj(" ",f-i+l.length)+"^\n"}else return f!=null?g+(" (at offset "+A.E(f)+")"):g}}
A.e.prototype={
aI(a,b){var s
for(s=this.gF(this);s.D();)if(J.ae(s.gL(),b))return!0
return!1},
kg(a,b){var s,r
A.m(this).l("e.E(e.E,e.E)").a(b)
s=this.gF(this)
if(!s.D())throw A.h(A.iP())
r=s.gL()
while(s.D())r=b.$2(r,s.gL())
return r},
gu(a){var s,r=this.gF(this)
for(s=0;r.D();)++s
return s},
gah(a){return!this.gF(this).D()},
bp(a,b){var s,r
A.bB(b,"index")
s=this.gF(this)
for(r=b;s.D();){if(r===0)return s.gL();--r}throw A.h(A.lF(b,b-r,this,"index"))},
B(a){return A.pA(this,"(",")")}}
A.ay.prototype={
gH(a){return A.C.prototype.gH.call(this,0)},
B(a){return"null"}}
A.C.prototype={$iC:1,
U(a,b){return this===b},
gH(a){return A.eR(this)},
B(a){return"Instance of '"+A.hB(this)+"'"},
gaJ(a){return A.tQ(this)},
toString(){return this.B(this)}}
A.i9.prototype={
B(a){return""},
$idy:1}
A.jp.prototype={
gjK(){var s,r=this.b
if(r==null)r=$.lY.$0()
s=r-this.a
if($.mF()===1000)return s
return B.a.V(s,1000)}}
A.cB.prototype={
gu(a){return this.a.length},
B(a){var s=this.a
return s.charCodeAt(0)==0?s:s},
$iqe:1}
A.j3.prototype={
B(a){return"Promise was rejected with a value of `"+(this.a?"undefined":"null")+"`."}}
A.li.prototype={
$1(a){var s=this.a,r=s.$ti
a=r.l("1/?").a(this.b.l("0/?").a(a))
s=s.a
if((s.a&30)!==0)A.ad(A.m8("Future already completed"))
s.ht(r.l("1/").a(a))
return null},
$S:14}
A.lj.prototype={
$1(a){if(a==null)return this.a.fo(new A.j3(a===undefined))
return this.a.fo(a)},
$S:14}
A.l1.prototype={
$1(a){var s,r,q,p,o,n,m,l,k,j,i,h
if(A.od(a))return a
s=this.a
a.toString
if(s.Z(a))return s.m(0,a)
if(a instanceof Date){r=a.getTime()
if(r<-864e13||r>864e13)A.ad(A.ah(r,-864e13,864e13,"millisecondsSinceEpoch",null))
A.cJ(!0,"isUtc",t.y)
return new A.c7(r,0,!0)}if(a instanceof RegExp)throw A.h(A.bs("structured clone of RegExp",null))
if(a instanceof Promise)return A.u4(a,t.X)
q=Object.getPrototypeOf(a)
if(q===Object.prototype||q===null){p=t.X
o=A.H(p,p)
s.h(0,a,o)
n=Object.keys(a)
m=[]
for(s=J.ai(n),p=s.gF(n);p.D();)m.push(A.op(p.gL()))
for(l=0;l<s.gu(n);++l){k=s.m(n,l)
if(!(l<m.length))return A.a(m,l)
j=m[l]
if(k!=null)o.h(0,j,this.$1(a[k]))}return o}if(a instanceof Array){i=a
o=[]
s.h(0,a,o)
h=A.w(a.length)
for(s=J.ai(i),l=0;l<h;++l)o.push(this.$1(s.m(i,l)))
return o}return a},
$S:44}
A.iF.prototype={
h7(a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=a1.length
for(s=0;s<a0;++s){r=a1[s]
if(r>a.b)a.b=r
if(r<a.c)a.c=r}r=a.b
if(r>15)throw A.h(B.cW)
q=r+1
p=new Uint16Array(q)
for(o=0;o<a0;++o){n=a1[o]
if(n!==0){if(!(n>=0&&n<q))return A.a(p,n)
m=p[n]
if(!(n<q))return A.a(p,n)
p[n]=m+1}}for(l=1,k=1;k<=r;++k){l=(l<<1>>>0)-p[k]
if(l<0)throw A.h(B.d1)}if(l>0)q=r>(a2?0:1)
else q=!1
if(q)throw A.h(B.d0)
j=B.a.a_(1,r)
r=a.a=new Uint32Array(j)
for(q=a.b,m=a1.length,i=1,h=0,g=2;i<=q;){for(f=i<<16,s=0;s<a0;++s){if(!(s<m))return A.a(a1,s)
if(a1[s]===i){for(e=h,d=0,c=0;c<i;++c){d=(d<<1|e&1)>>>0
e=e>>>1}for(b=(f|s)>>>0,c=d;c<j;c+=g){if(!(c>=0&&c<j))return A.a(r,c)
r[c]=b}++h}}++i
h=h<<1>>>0
g=g<<1>>>0}}}
A.jN.prototype={}
A.ko.prototype={
jG(a,b,c,d,e){var s,r=!1,q=a.a
a.a=B.as
try{s=A.tS("zlib",!1,r,new A.kp(this,a,b,!1,!1))
return s}finally{a.sjw(q)}},
hM(a,b,c,d){var s,r,q,p,o,n,m=a.c,l=a.d
l===$&&A.d()
if(m>=l)return!1
A:{l=a.b
if((l==null?0:l.length-m)<2)return!1
l.toString
s=a.c=m+1
r=l.length
if(!(m>=0&&m<r))return A.a(l,m)
q=l[m]
a.c=s+1
if(!(s>=0&&s<r))return A.a(l,s)
p=l[s]
if((q&15)!==8)return!1
if(q>>>4>7)return!1
if(B.a.Y(q*256+p,31)!==0)return!1
if((p>>>5&1)!==0){a.k()
return!1}m=new A.dp(new Uint8Array(32768),B.ar)
o=new A.iN(a,m,!0)
o.iu()
m=o.c
n=J.a4(B.f.gA(m.c),m.c.byteOffset,m.b)
if(!o.f){b.aZ(n)
return!1}m=a.b
if((m==null?0:m.length-a.c)<4){b.aZ(n)
return!1}a.k()
break A}if(n!=null)b.aZ(n)
return!0}}
A.kp.prototype={
$0(){var s=this
return s.a.hM(s.b,s.c,s.d,s.e)},
$S:30}
A.iN.prototype={
gbx(){var s=this.a
if(s==null)return s
s.d===$&&A.d()
return s},
iu(){var s,r,q,p=this
p.w=p.r=0
if(p.gbx()==null)return
s=p.c
if(!(s instanceof A.dp)){p.d=s
p.c=A.lP(32768)}try{for(;;){r=p.gbx()
q=r.c
r=r.d
r===$&&A.d()
if(!(q<r))break
if(!p.iG())return
p.eC(32768)}}finally{p.eC(0)
p.c=s
p.d=null}},
eC(a){var s,r,q,p,o=this.d
if(o==null)return
s=this.c
r=s.b-a
if(r<(a===0?1:1048576))return
q=s.e3()
o.aZ(A.nF(q,0,r))
p=A.lP(2097152)
p.aZ(A.nF(q,r,null))
this.c=p},
iG(){var s,r,q,p=this,o=p.gbx()
if(o!=null){s=o.c
r=o.d
r===$&&A.d()
r=s>=r
s=r}else s=!0
if(s)return!1
q=p.bf(3)
s=(q&1)===0
switch(B.a.j(q,1)){case 0:if(p.iQ()===-1)return!1
break
case 1:if(p.ew($.oA(),$.oz())===-1)return!1
break
case 2:if(p.iH()===-1)return!1
break
default:return!1}if(!s)p.f=!0
return s},
bf(a){var s,r,q,p,o=this
if(a===0)return 0
while(s=o.w,s<a){s=o.gbx()
r=s.c
s=s.d
s===$&&A.d()
if(r>=s)return-1
s=o.gbx()
r=s.b
r.toString
s=s.c++
if(!(s>=0&&s<r.length))return A.a(r,s)
q=r[s]
s=o.r
r=o.w
o.r=(s|B.a.a_(q,r))>>>0
o.w=r+8}r=o.r
p=B.a.S(1,a)
o.r=B.a.a2(r,a)
o.w=s-a
return(r&p-1)>>>0},
dJ(a){var s,r,q,p,o,n,m=this,l=a.a
l===$&&A.d()
s=a.b
while(m.w<s){r=m.gbx()
q=r.c
r=r.d
r===$&&A.d()
if(q>=r)break
r=m.gbx()
q=r.b
q.toString
r=r.c++
if(!(r>=0&&r<q.length))return A.a(q,r)
p=q[r]
r=m.r
q=m.w
m.r=(r|B.a.a_(p,q))>>>0
m.w=q+8}r=m.r
q=(r&B.a.a_(1,s)-1)>>>0
if(!(q<l.length))return A.a(l,q)
o=l[q]
n=o>>>16
if(n===0||n>m.w)return-1
m.r=B.a.a2(r,n)
m.w-=n
return o&65535},
iQ(){var s,r,q,p=this
p.w=p.r=0
s=p.bf(16)
if(s!==(p.bf(16)^65535)>>>0)return-1
if(s>p.gbx().gu(0))return-1
r=p.gbx()
q=r.h1(s,r.c)
r.c=r.c+q.gu(0)
p.c.kz(q)
return 0},
iH(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=g.bf(5)
if(f===-1)return-1
f+=257
if(f>286)return-1
s=g.bf(5)
if(s===-1)return-1;++s
if(s>32)return-1
r=g.bf(4)
if(r===-1)return-1
r+=4
if(r>19)return-1
q=new Uint8Array(19)
for(p=0;p<r;++p){o=g.bf(3)
if(o===-1)return-1
n=B.iI[p]
if(!(n<19))return A.a(q,n)
q[n]=o}m=g.f4(q,!0)
if(m==null)return-1
n=f+s
l=new Uint8Array(n)
k=J.a4(B.f.gA(l),0,f)
j=J.a4(B.f.gA(l),f,s)
if(g.iv(n,m,l)===-1)return-1
i=g.f3(k)
n=i==null
h=n?null:g.f3(j)
if(n||h==null)return-1
return g.ew(i,h)},
f4(a,b){var s,r
t.L.a(a)
try{s=A.lD(a,b)
return s}catch(r){if(A.bK(r) instanceof A.aw)throw r
else throw r}},
f3(a){return this.f4(a,!1)},
ew(a,b){var s,r,q,p,o,n,m,l,k,j=this
for(;;){s=j.dJ(a)
if(s<0||s>285)return-1
if(s===256)break
if(s<256){j.c.C(s&255)
continue}r=s-257
if(!(r>=0&&r<31))return A.a(B.bW,r)
q=j.bf(B.bW[r])
if(q<0)return-1
if(!(r<29))return A.a(B.bN,r)
p=B.bN[r]
o=j.dJ(b)
if(o<0||o>29)return-1
if(!(o>=0&&o<30))return A.a(B.bs,o)
n=j.bf(B.bs[o])
if(n<0)return-1
m=B.j2[o]+n
if(m<1||m>j.c.b)return-1
j.c.kt(m,p+q)}while(p=j.w,p>=8){j.w=p-8
p=j.gbx()
l=p.c
if(1>=l)p.c=0
else{k=p.d
k===$&&A.d()
if(1<=l-k)p.c=k
else p.c=l-1}}return 0},
iv(a,b,c){var s,r,q,p,o,n,m,l,k=this
for(s=0,r=0;r<a;){q=k.dJ(b)
if(q===-1)return-1
p=0
switch(q){case 16:if(r===0)return-1
o=k.bf(2)
if(o===-1)return-1
o+=3
if(r+o>a)return-1
for(n=c.$flags|0;m=o-1,o>0;o=m,r=l){l=r+1
n&2&&A.b(c)
if(!(r>=0&&r<c.length))return A.a(c,r)
c[r]=s}break
case 17:o=k.bf(3)
if(o===-1)return-1
o+=3
if(r+o>a)return-1
for(n=c.$flags|0;m=o-1,o>0;o=m,r=l){l=r+1
n&2&&A.b(c)
if(!(r>=0&&r<c.length))return A.a(c,r)
c[r]=0}s=p
break
case 18:o=k.bf(7)
if(o===-1)return-1
o+=11
if(r+o>a)return-1
for(n=c.$flags|0;m=o-1,o>0;o=m,r=l){l=r+1
n&2&&A.b(c)
if(!(r>=0&&r<c.length))return A.a(c,r)
c[r]=0}s=p
break
default:if(q<0||q>15)return-1
l=r+1
c.$flags&2&&A.b(c)
if(!(r>=0&&r<c.length))return A.a(c,r)
c[r]=q
r=l
s=q
break}}return 0}}
A.jM.prototype={
bS(a){var s,r
t.L.a(a)
s=A.lP(32768)
B.cF.jG(A.lG(a,B.as,null,null),s,!1,null,!1)
r=s.e3()
return r}}
A.cQ.prototype={}
A.fA.prototype={}
A.ip.prototype={}
A.dT.prototype={
ae(){return"ByteOrder."+this.b}}
A.jV.prototype={}
A.h2.prototype={
gu(a){var s=this.b
return s==null?0:s.length-this.c},
h1(a,b){var s=this.b
if(s==null)return A.lG(A.k([],t.t),B.ar,null,null)
return A.lG(s,this.a,a,b)},
G(){var s,r=this.b
r.toString
s=this.c++
if(!(s>=0&&s<r.length))return A.a(r,s)
return r[s]}}
A.h3.prototype={
k(){var s=this,r=s.G(),q=s.G(),p=s.G(),o=s.G()
if(s.a===B.as)return(r<<24|q<<16|p<<8|o)>>>0
return(o<<24|p<<16|q<<8|r)>>>0},
sjw(a){this.a=t.aO.a(a)}}
A.dp.prototype={
e3(){return J.a4(B.f.gA(this.c),this.c.byteOffset,this.b)},
C(a){var s,r,q=this
if(q.b===q.c.length)q.iF()
s=q.c
r=q.b++
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=a},
ku(a,b){var s,r,q,p,o=this
t.L.a(a)
b=a.length
while(s=o.b,r=s+b,q=o.c,p=q.length,r>p)o.d1(r-p)
B.f.bD(q,s,r,a)
o.b+=b},
aZ(a){return this.ku(a,null)},
kz(a){var s,r,q,p,o,n,m=this
for(;;){s=m.b
r=a.b
q=r==null
p=q?0:r.length-a.c
o=m.c
n=o.length
if(!(s+p>n))break
m.d1(s+(q?0:r.length-a.c)-n)}if(!q)B.f.aq(o,s,s+a.gu(0),r,a.c)
m.b=m.b+a.gu(0)},
kt(a,b){var s,r,q,p,o,n,m,l,k,j,i=this
while(s=i.b,r=s+b,q=i.c,p=q.length,r>p)i.d1(r-p)
o=s-a
if(a>=b)B.f.aq(q,s,r,q,o)
else for(n=q.$flags|0,m=o;s<r;s=l,m=k){l=s+1
k=m+1
if(!(m>=0&&m<p))return A.a(q,m)
j=q[m]
n&2&&A.b(q)
if(!(s>=0))return A.a(q,s)
q[s]=j}i.b+=b},
d1(a){var s,r=this.c,q=r.length,p=q+(a==null?1:a),o=q===0?32768:q*2
if(o<p)o=p
s=new Uint8Array(o)
B.f.bD(s,0,q,r)
this.c=s},
iF(){return this.d1(null)},
gu(a){return this.b}}
A.hw.prototype={}
A.iw.prototype={
ae(){return"Channel."+this.b}}
A.R.prototype={
D(){var s=this.b
return++this.a<s.gu(s)},
gL(){return this.b.m(0,this.a)},
$iA:1}
A.c6.prototype={
ae(){return"ChannelOrder."+this.b}}
A.cS.prototype={
J(){return new A.cS(new Uint16Array(A.z(this.a)))},
gM(){return B.E},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=A.M(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){return this.gn()},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]}else s=0
return s},
sn(a){var s,r=this.a,q=r.length
if(q!==0){s=A.M(a)
r.$flags&2&&A.b(r)
if(0>=q)return A.a(r,0)
r[0]=s}},
gt(){var s,r=this.a
if(r.length>1){r=r[1]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
st(a){var s,r=this.a
if(r.length>1){s=A.M(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s,r=this.a
if(r.length>2){r=r[2]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
sq(a){var s,r=this.a
if(r.length>2){s=A.M(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s,r=this.a
if(r.length>3){r=r[3]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
gX(){return this.gv()/1},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=A.M(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.cT.prototype={
J(){return new A.cT(new Float32Array(A.z(this.a)))},
gM(){return B.J},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s=this.a,r=s.length
if(b<r){s.$flags&2&&A.b(s)
if(!(b>=0))return A.a(s,b)
s[b]=c}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s=this.a,r=s.length
if(r!==0){s.$flags&2&&A.b(s)
if(0>=r)return A.a(s,0)
s[0]=a}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s=this.a
if(s.length>1){s.$flags&2&&A.b(s)
s[1]=a}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s=this.a
if(s.length>2){s.$flags&2&&A.b(s)
s[2]=a}},
gv(){var s=this.a
return s.length>3?s[3]:1},
gX(){return this.gv()/1},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.cU.prototype={
J(){return new A.cU(new Float64Array(A.z(this.a)))},
gM(){return B.L},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s=this.a,r=s.length
if(b<r){s.$flags&2&&A.b(s)
if(!(b>=0))return A.a(s,b)
s[b]=c}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s=this.a,r=s.length
if(r!==0){s.$flags&2&&A.b(s)
if(0>=r)return A.a(s,0)
s[0]=a}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s=this.a
if(s.length>1){s.$flags&2&&A.b(s)
s[1]=a}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s=this.a
if(s.length>2){s.$flags&2&&A.b(s)
s[2]=a}},
gv(){var s=this.a
return s.length>3?s[3]:1},
gX(){return this.gv()/1},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.cV.prototype={
J(){return new A.cV(new Int16Array(A.z(this.a)))},
gM(){return B.N},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s,r=this.a,q=r.length
if(q!==0){s=B.b.i(a)
r.$flags&2&&A.b(r)
if(0>=q)return A.a(r,0)
r[0]=s}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s,r=this.a
if(r.length>1){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s,r=this.a
if(r.length>2){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s=this.a
return s.length>3?s[3]:0},
gX(){return this.gv()/32767},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=B.b.i(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.cW.prototype={
J(){return new A.cW(new Int32Array(A.z(this.a)))},
gM(){return B.O},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s=this.a,r=s.length
if(r!==0){A.w(a)
s.$flags&2&&A.b(s)
if(0>=r)return A.a(s,0)
s[0]=a}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s,r=this.a
if(r.length>1){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s,r=this.a
if(r.length>2){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s=this.a
return s.length>3?s[3]:0},
gX(){return this.gv()/2147483647},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=B.b.i(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.cX.prototype={
J(){return new A.cX(new Int8Array(A.z(this.a)))},
gM(){return B.M},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s,r=this.a,q=r.length
if(q!==0){s=B.b.i(a)
r.$flags&2&&A.b(r)
if(0>=q)return A.a(r,0)
r[0]=s}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s,r=this.a
if(r.length>1){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s,r=this.a
if(r.length>2){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s=this.a
return s.length>3?s[3]:0},
gX(){return this.gv()/127},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=B.b.i(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.cZ.prototype={
J(){var s=this.b
s===$&&A.d()
return new A.cZ(this.a,s)},
gM(){return B.w},
gT(){return null},
bX(a){var s
if(a<this.a){s=this.b
s===$&&A.d()
s=B.a.a3(s,7-a)&1}else s=0
return s},
bN(a,b){var s
if(a>=this.a)return
a=7-a
s=this.b
s===$&&A.d()
this.b=b!==0?(s|B.a.a_(1,a))>>>0:(s&~(B.a.a_(1,a)&255))>>>0},
m(a,b){return this.bX(b)},
h(a,b,c){return this.bN(b,c)},
gP(){return this.bX(0)},
gn(){return this.bX(0)},
sn(a){this.bN(0,a)},
gt(){return this.bX(1)},
st(a){this.bN(1,a)},
gq(){return this.bX(2)},
sq(a){this.bN(2,a)},
gv(){return this.bX(3)},
gX(){return this.bX(3)/1},
gai(){return A.a0(this)},
ad(a){this.a9(a.gn(),a.gt(),a.gq(),a.gv())},
a9(a,b,c,d){var s=this
s.bN(0,a)
s.bN(1,b)
s.bN(2,c)
s.bN(3,d)},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1,
gu(a){return this.a}}
A.d_.prototype={
J(){return new A.d_(new Uint16Array(A.z(this.a)))},
gM(){return B.l},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s,r=this.a,q=r.length
if(q!==0){s=B.b.i(a)
r.$flags&2&&A.b(r)
if(0>=q)return A.a(r,0)
r[0]=s}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s,r=this.a
if(r.length>1){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s,r=this.a
if(r.length>2){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s=this.a
return s.length>3?s[3]:0},
gX(){return this.gv()/65535},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=B.b.i(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.d0.prototype={
J(){var s=this.b
s===$&&A.d()
return new A.d0(this.a,s)},
gM(){return B.B},
gT(){return null},
bY(a){var s
if(a<this.a){s=this.b
s===$&&A.d()
s=B.a.a3(s,6-(a<<1>>>0))&3}else s=0
return s},
bO(a,b){var s,r,q
if(a>=this.a)return
if(!(a>=0&&a<4))return A.a(B.bg,a)
s=B.bg[a]
r=B.b.i(b)
q=this.b
q===$&&A.d()
this.b=(q&s|B.a.a_(r&3,6-(a<<1>>>0)))>>>0},
m(a,b){return this.bY(b)},
h(a,b,c){return this.bO(b,c)},
gP(){return this.bY(0)},
gn(){return this.bY(0)},
sn(a){this.bO(0,a)},
gt(){return this.bY(1)},
st(a){this.bO(1,a)},
gq(){return this.bY(2)},
sq(a){this.bO(2,a)},
gv(){return this.bY(3)},
gX(){return this.bY(3)/3},
gai(){return A.a0(this)},
ad(a){this.a9(a.gn(),a.gt(),a.gq(),a.gv())},
a9(a,b,c,d){var s=this
s.bO(0,a)
s.bO(1,b)
s.bO(2,c)
s.bO(3,d)},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1,
gu(a){return this.a}}
A.d1.prototype={
J(){return new A.d1(new Uint32Array(A.z(this.a)))},
gM(){return B.K},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s,r=this.a,q=r.length
if(q!==0){s=B.b.i(a)
r.$flags&2&&A.b(r)
if(0>=q)return A.a(r,0)
r[0]=s}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s,r=this.a
if(r.length>1){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s,r=this.a
if(r.length>2){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s=this.a
return s.length>3?s[3]:0},
gX(){return this.gv()/4294967295},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=B.b.i(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.d2.prototype={
J(){return new A.d2(this.a,new Uint8Array(A.z(this.b)))},
gM(){return B.C},
gT(){return null},
bZ(a){var s,r
if(a<0||a>=this.a)s=0
else{s=this.b
r=s.length
if(a<2){if(0>=r)return A.a(s,0)
s=B.a.a3(s[0],4-(a<<2>>>0))&15}else{if(1>=r)return A.a(s,1)
s=B.a.a3(s[1],4-((a&1)<<2))&15}}return s},
bQ(a,b){var s,r,q,p
if(a>=this.a)return
s=B.a.K(B.b.i(b),0,15)
if(a>1){a&=1
r=1}else r=0
if(a===0){q=this.b
if(!(r<q.length))return A.a(q,r)
p=q[r]
q.$flags&2&&A.b(q)
q[r]=(p&15|s<<4)>>>0}else if(a===1){q=this.b
if(!(r<q.length))return A.a(q,r)
p=q[r]
q.$flags&2&&A.b(q)
q[r]=(p&240|s)>>>0}},
m(a,b){return this.bZ(b)},
h(a,b,c){return this.bQ(b,c)},
gP(){return this.bZ(0)},
gn(){return this.bZ(0)},
sn(a){this.bQ(0,a)},
gt(){return this.bZ(1)},
st(a){this.bQ(1,a)},
gq(){return this.bZ(2)},
sq(a){this.bQ(2,a)},
gv(){return this.bZ(3)},
gX(){return this.bZ(3)/15},
gai(){return A.a0(this)},
ad(a){this.a9(a.gn(),a.gt(),a.gq(),a.gv())},
a9(a,b,c,d){var s=this
s.bQ(0,a)
s.bQ(1,b)
s.bQ(2,c)
s.bQ(3,d)},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1,
gu(a){return this.a}}
A.bM.prototype={
h3(a,b,c,d){var s,r=this.a
r.$flags&2&&A.b(r)
s=r.length
if(0>=s)return A.a(r,0)
r[0]=a
if(1>=s)return A.a(r,1)
r[1]=b
if(2>=s)return A.a(r,2)
r[2]=c
if(3>=s)return A.a(r,3)
r[3]=d},
J(){return new A.bM(new Uint8Array(A.z(this.a)))},
gM(){return B.e},
gu(a){return this.a.length},
gT(){return null},
m(a,b){var s=this.a,r=s.length
if(b<r){if(!(b>=0))return A.a(s,b)
s=s[b]}else s=0
return s},
h(a,b,c){var s,r=this.a,q=r.length
if(b<q){s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(b>=0))return A.a(r,b)
r[b]=s}},
gP(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
gn(){var s=this.a,r=s.length
if(r!==0){if(0>=r)return A.a(s,0)
s=s[0]}else s=0
return s},
sn(a){var s,r=this.a,q=r.length
if(q!==0){s=B.b.i(a)
r.$flags&2&&A.b(r)
if(0>=q)return A.a(r,0)
r[0]=s}},
gt(){var s=this.a
return s.length>1?s[1]:0},
st(a){var s,r=this.a
if(r.length>1){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[1]=s}},
gq(){var s=this.a
return s.length>2?s[2]:0},
sq(a){var s,r=this.a
if(r.length>2){s=B.b.i(a)
r.$flags&2&&A.b(r)
r[2]=s}},
gv(){var s=this.a
return s.length>3?s[3]:255},
gX(){return this.gv()/255},
gai(){return A.a0(this)},
ad(a){var s,r,q=this
q.sn(a.gn())
q.st(a.gt())
q.sq(a.gq())
s=a.gv()
r=q.a
if(r.length>3){s=B.b.i(s)
r.$flags&2&&A.b(r)
r[3]=s}},
gF(a){return new A.R(this)},
U(a,b){var s,r
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===this.a.length){s=b.gH(b)
r=A.u(this,A.m(this).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.fH.prototype={}
A.cY.prototype={}
A.dV.prototype={
J(){return new A.dV(this.a)},
gM(){return B.e},
gu(a){return 4},
gT(){return null},
m(a,b){var s
if(b>=0&&b<4){s=b<<3>>>0
s=B.a.a2((this.a&B.a.S(255,s))>>>0,s)}else s=0
return s},
h(a,b,c){},
ad(a){},
gP(){return this.m(0,0)},
gn(){return this.m(0,0)},
sn(a){},
gt(){return this.m(0,1)},
st(a){},
gq(){return this.m(0,2)},
sq(a){},
gv(){return this.m(0,3)},
gX(){return this.gv()/255},
gai(){return A.a0(this)},
gF(a){return new A.R(this)},
U(a,b){var s,r,q=this
if(b==null)return!1
s=!1
if(t.G.b(b))if(b.gu(b)===q.gu(q)){s=b.gH(b)
r=A.u(q,A.m(q).l("e.E"))
s=s===A.n(r)}return s},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
$iy:1}
A.fK.prototype={
gv(){return 255},
gX(){return 1},
gu(a){return 3}}
A.av.prototype={
ae(){return"Format."+this.b}}
A.fD.prototype={
ae(){return"BlendMode."+this.b}}
A.c8.prototype={
cO(a){var s=$.mJ()
if(!s.Z(a))return"<unknown>"
return s.m(0,a).a},
B(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
for(s=e.a,r=new A.U(s,s.r,s.e,A.m(s).l("U<1>")),q=t.p,p=t.r,o=t.N,n=t.P,m="";r.D();){l=r.d
m+=l+"\n"
k=s.m(0,l)
for(l=k.a,l=new A.U(l,l.r,l.e,A.m(l).l("U<1>"));l.D();){j=l.d
i=k.m(0,j)
m=i==null?m+("\t"+e.cO(j)+"\n"):m+("\t"+e.cO(j)+": "+i.B(0)+"\n")}for(l=k.b.a,j=new A.U(l,l.r,l.e,A.m(l).l("U<1>"));j.D();){h=j.d
m+=h+"\n"
if(!l.Z(h))l.h(0,h,new A.aJ(A.H(q,p),new A.aV(A.H(o,n))))
g=l.m(0,h)
for(h=g.a,h=new A.U(h,h.r,h.e,A.m(h).l("U<1>"));h.D();){f=h.d
i=g.m(0,f)
m=i==null?m+("\t"+e.cO(f)+"\n"):m+("\t"+e.cO(f)+": "+i.B(0)+"\n")}}}return m.charCodeAt(0)==0?m:m},
aP(a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6="exif",a7="interop",a8=a9.b
a9.b=!0
a9.aD(19789)
a9.aD(42)
a9.aL(8)
s=a5.a
if(s.m(0,"ifd0")==null)s.h(0,"ifd0",new A.aJ(A.H(t.p,t.r),new A.aV(A.H(t.N,t.P))))
r=s.m(0,"ifd1")
q=a5.b
p=q!=null&&q.length!==0&&r!=null
if(p){r.h(0,513,A.lE(0))
r.h(0,514,A.lE(q.length))}else if(r!=null){o=r.a
o.ce(0,513)
o.ce(0,514)}n=A.k(["ifd0"],t.s)
for(o=new A.U(s,s.r,s.e,A.m(s).l("U<1>"));o.D();){m=o.d
if(m!=="ifd0")B.c.I(n,m)}o=t.N
m=t.p
l=A.H(o,m)
for(k=n.length,j=t.r,i=t.P,h=8,g=0;g<n.length;n.length===k||(0,A.V)(n),++g){f=n[g]
e=s.m(0,f)
e.toString
l.h(0,f,h)
d=e.b.a
if(d.Z(a6)){c=new Uint32Array(1)
c[0]=0
e.h(0,34665,new A.b8(c))}else e.a.ce(0,34665)
if(d.Z(a7)){c=new Uint32Array(1)
c[0]=0
e.h(0,40965,new A.b8(c))}else e.a.ce(0,40965)
if(d.Z("gps")){c=new Uint32Array(1)
c[0]=0
e.h(0,34853,new A.b8(c))}else e.a.ce(0,34853)
e=e.a
h+=2+12*e.a+4
for(e=new A.ax(e,e.r,e.e,A.m(e).l("ax<2>"));e.D();){c=e.d
b=c.gaC().a
if(!(b<14))return A.a(B.t,b)
a=B.t[b]*c.gu(c)
if(a>4)h+=a}for(e=new A.U(d,d.r,d.e,A.m(d).l("U<1>"));e.D();){c=e.d
if(!d.Z(c))d.h(0,c,new A.aJ(A.H(m,j),new A.aV(A.H(o,i))))
b=d.m(0,c)
b.toString
l.h(0,c,h)
b=b.a
a0=2+12*b.a
for(c=new A.ax(b,b.r,b.e,A.m(b).l("ax<2>"));c.D();){b=c.d
a1=b.gaC().a
if(!(a1<14))return A.a(B.t,a1)
a=B.t[a1]*b.gu(b)
if(a>4)a0+=a}h+=a0}}if(p)r.m(0,513).bm(h)
a2=n.length
for(k=a2-1,a3=0;a3<a2;++a3){if(!(a3<n.length))return A.a(n,a3)
f=n[a3]
a4=s.m(0,f)
e=a4.b.a
if(e.Z(a6)){d=a4.m(0,34665)
d.toString
c=l.m(0,a6)
c.toString
d.bm(c)}if(e.Z(a7)){d=a4.m(0,40965)
d.toString
c=l.m(0,a7)
c.toString
d.bm(c)}if(e.Z("gps")){d=a4.m(0,34853)
d.toString
c=l.m(0,"gps")
c.toString
d.bm(c)}d=l.m(0,f)
d.toString
a5.fc(a9,a4,d+2+12*a4.a.a+4)
if(a3===k)a9.aL(0)
else{d=a3+1
if(!(d<n.length))return A.a(n,d)
d=l.m(0,n[d])
d.toString
a9.aL(d)}a5.fd(a9,a4)
for(d=new A.U(e,e.r,e.e,A.m(e).l("U<1>"));d.D();){c=d.d
if(!e.Z(c))e.h(0,c,new A.aJ(A.H(m,j),new A.aV(A.H(o,i))))
b=e.m(0,c)
b.toString
c=l.m(0,c)
c.toString
a5.fc(a9,b,c+2+12*b.a.a)
a5.fd(a9,b)}}if(p)a9.aZ(q)
a9.b=a8},
fc(a,b,c){var s,r,q,p,o,n,m=b.a
a.aD(m.a)
for(m=new A.U(m,m.r,m.e,A.m(m).l("U<1>"));m.D();){s=m.d
r=b.m(0,s)
r.toString
q=s===273
p=q&&r.gaC()===B.F?B.n:r.gaC()
o=q&&r.gaC()===B.F?1:r.gu(r)
a.aD(s)
a.aD(p.a)
a.aL(o)
s=r.gaC().a
if(!(s<14))return A.a(B.t,s)
n=B.t[s]*r.gu(r)
if(n<=4){r.aP(a)
while(n<4){a.C(0);++n}}else{a.aL(c)
c+=n}}return c},
fd(a,b){var s,r,q
for(s=b.a,s=new A.ax(s,s.r,s.e,A.m(s).l("ax<2>"));s.D();){r=s.d
q=r.gaC().a
if(!(q<14))return A.a(B.t,q)
if(B.t[q]*r.gu(r)>4)r.aP(a)}},
c6(c6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3=this,c4="Length must be a non-negative integer: ",c5=c6.e
c6.e=!0
s=c6.d
a2=c6.p()
if(a2===18761){c6.e=!1
if(c6.p()!==42){c6.e=c5
return!1}}else if(a2===19789){c6.e=!0
if(c6.p()!==42){c6.e=c5
return!1}}else return!1
r=c6.k()
q=0
a3=c3.a
a4=t.n0
a5=c6.c
a6=t.p
a7=t.r
a8=t.N
a9=t.P
for(;;){b0=r
if(typeof b0!=="number")return b0.fR()
if(!(b0>0))break
try{b0=s
b1=r
if(typeof b0!=="number")return b0.bb()
if(typeof b1!=="number")return A.cN(b1)
b1=b0+b1
c6.d=b1
if(a5-b1<2)break
p=new A.aJ(A.H(a6,a7),new A.aV(A.H(a8,a9)))
o=c6.p()
b0=o
if(typeof b0!=="number")return b0.dj()
if(b0*12>a5-c6.d)break
n=o
b0=n
if(b0<0)A.ad(A.bs(c4+A.E(b0),null))
m=A.k(new Array(b0),a4)
l=0
for(;;){b0=l
b1=n
if(typeof b0!=="number")return b0.fS()
if(typeof b1!=="number")return A.cN(b1)
if(!(b0<b1))break
J.x(m,l,c3.eW(c6,s))
b0=l
if(typeof b0!=="number")return b0.bb()
l=b0+1}k=m
for(b0=k,b1=b0.length,b2=0;b2<b0.length;b0.length===b1||(0,A.V)(b0),++b2){j=b0[b2]
if(j.b!=null){b3=j.a
b4=j.b
b4.toString
J.x(p,b3,b4)}}a3.h(0,"ifd"+A.E(q),p)
b0=q
if(typeof b0!=="number")return b0.bb()
q=b0+1
i=c6.k()
if(J.ae(i,r))break
else r=i}catch(b5){break}}for(b0=new A.ax(a3,a3.r,a3.e,A.m(a3).l("ax<2>"));b0.D();){h=b0.d
for(b1=B.bY.gb9(),b1=b1.gF(b1);b1.D();){g=b1.gL()
b3=A.w(g)
if(h.a.Z(b3))try{f=J.c(h,g).i(0)
b3=s
b4=f
if(typeof b3!=="number")return b3.bb()
if(typeof b4!=="number")return A.cN(b4)
c6.d=b3+b4
e=new A.aJ(A.H(a6,a7),new A.aV(A.H(a8,a9)))
d=c6.p()
c=d
b4=c
if(b4<0)A.ad(A.bs(c4+A.E(b4),null))
b=A.k(new Array(b4),a4)
a=0
for(;;){b3=a
b4=c
if(typeof b3!=="number")return b3.fS()
if(typeof b4!=="number")return A.cN(b4)
if(!(b3<b4))break
J.x(b,a,c3.eW(c6,s))
b3=a
if(typeof b3!=="number")return b3.bb()
a=b3+1}a0=b
for(b3=a0,b4=b3.length,b2=0;b2<b3.length;b3.length===b4||(0,A.V)(b3),++b2){a1=b3[b2]
if(a1.b!=null){b6=a1.a
b7=a1.b
b7.toString
J.x(e,b6,b7)}}b3=h.b
b4=B.bY.m(0,g)
b4.toString
b3.a.h(0,b4,a9.a(e))}catch(b5){continue}}}c3.b=null
b8=a3.m(0,"ifd1")
if(b8!=null){a3=b8.a
a3=a3.Z(513)&&a3.Z(514)}else a3=!1
if(a3){b9=b8.m(0,513).i(0)
c0=b8.m(0,514).i(0)
a3=s
if(typeof a3!=="number")return a3.bb()
c1=a3+b9
if(c0>0){a3=s
if(typeof a3!=="number")return A.cN(a3)
a3=c1>=a3&&c1+c0<=a5}else a3=!1
if(a3){c2=c6.d
c6.d=c1
c3.b=c6.al(c0).a4()
c6.d=c2}}c6.e=c5
return!1},
eW(a,b){var s,r,q,p,o,n,m,l=a.p(),k=a.p(),j=a.k(),i=new A.i2(l,null)
if(k>=14)return i
s=B.bB[k]
r=j*B.t[k]
q=a.d
if((r>4?a.d=a.k()+b:q)+r>a.c)return i
p=a.al(r)
switch(s.a){case 0:break
case 6:i.b=new A.bO(new Int8Array(A.z(J.lv(B.f.gA(p.a4()),0,j))))
break
case 1:i.b=new A.bv(new Uint8Array(A.z(p.al(j).a4())))
break
case 7:i.b=new A.db(new Uint8Array(A.z(p.al(j).a4())))
break
case 2:i.b=new A.cd(j===0?"":p.ag(j-1))
break
case 3:i.b=A.n9(p,j)
break
case 4:i.b=A.n4(p,j)
break
case 5:i.b=A.n5(p,j)
break
case 10:i.b=A.n7(p,j)
break
case 8:i.b=A.n8(p,j)
break
case 9:i.b=A.n6(p,j)
break
case 11:i.b=A.na(p,j)
break
case 12:i.b=A.n3(p,j)
break
case 13:if(j===1){o=new A.d9(0)
n=p.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=n
n=$.a9()
if(0>=n.length)return A.a(n,0)
o.a=n[0]
i.b=o}break}a.d=q+4
return i}}
A.i2.prototype={}
A.fP.prototype={}
A.aV.prototype={
h8(a){a.a.aN(0,new A.iH(this))},
gah(a){var s,r=this.a
if(r.a===0)return!0
for(r=new A.ax(r,r.r,r.e,A.m(r).l("ax<2>"));r.D();){s=r.d
if(!(s.a.a===0&&s.b.gah(0)))return!1}return!0},
m(a,b){var s=this.a
if(!s.Z(b))s.h(0,b,new A.aJ(A.H(t.p,t.r),new A.aV(A.H(t.N,t.P))))
s=s.m(0,b)
s.toString
return s}}
A.iH.prototype={
$2(a,b){var s
A.b1(a)
s=A.n2(t.P.a(b))
this.a.a.h(0,a,s)
return s},
$S:15}
A.aJ.prototype={
jz(a){a.a.aN(0,new A.iI(this))
a.b.a.aN(0,new A.iJ(this))},
m(a,b){var s=this.a.m(0,b)
return s},
h(a,b,c){this.a.h(0,b,c)},
gc5(){var s=this.a.m(0,274)
return s==null?null:s.i(0)},
sc5(a){this.a.ce(0,274)}}
A.iI.prototype={
$2(a,b){var s
A.w(a)
s=t.r.a(b).J()
this.a.a.h(0,a,s)
return s},
$S:29}
A.iJ.prototype={
$2(a,b){var s
A.b1(a)
s=A.n2(t.P.a(b))
this.a.b.a.h(0,a,s)
return s},
$S:15}
A.ak.prototype={
ae(){return"IfdValueType."+this.b}}
A.a7.prototype={
a6(a,b){A.w(b)
return 0},
i(a){return this.a6(0,0)},
bj(){return new Uint8Array(0)},
B(a){return""},
U(a,b){var s=this
if(b==null)return!1
return b instanceof A.a7&&s.gaC()===b.gaC()&&s.gu(s)===b.gu(b)&&s.gH(s)===b.gH(b)},
gH(a){return 0},
bm(a){}}
A.bv.prototype={
J(){return new A.bv(new Uint8Array(A.z(this.a)))},
gaC(){return B.b0},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.bv){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b]},
i(a){return this.a6(0,0)},
bm(a){var s=this.a
s.$flags&2&&A.b(s)
if(0>=s.length)return A.a(s,0)
s[0]=a},
bj(){return this.a},
aP(a){a.aZ(this.a)},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=""+s[0]}else s=A.E(s)
return s}}
A.cd.prototype={
J(){return new A.cd(this.a)},
gaC(){return B.k},
gu(a){return this.a.length+1},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.cd){s=this.a
r=b.a
s=s.length+1===r.length+1&&B.o.gH(s)===B.o.gH(r)}else s=!1
return s},
gH(a){return B.o.gH(this.a)},
bj(){return new Uint8Array(A.z(new A.b4(this.a)))},
aP(a){a.aZ(new A.b4(this.a))
a.C(0)},
B(a){return this.a}}
A.ci.prototype={
hd(a,b){var s,r,q,p
for(s=this.a,r=s.$flags|0,q=0;q<b;++q){p=a.p()
r&2&&A.b(s)
if(!(q<s.length))return A.a(s,q)
s[q]=p}},
J(){return new A.ci(new Uint16Array(A.z(this.a)))},
gaC(){return B.j},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.ci){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b]},
i(a){return this.a6(0,0)},
bm(a){var s=this.a
s.$flags&2&&A.b(s)
if(0>=s.length)return A.a(s,0)
s[0]=a},
bj(){return J.af(B.a_.gA(this.a))},
aP(a){var s,r=this.a,q=r.length
for(s=0;s<q;++s)a.aD(r[s])},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=""+s[0]}else s=A.E(s)
return s}}
A.b8.prototype={
ha(a,b){var s,r,q,p
for(s=this.a,r=s.$flags|0,q=0;q<b;++q){p=a.k()
r&2&&A.b(s)
if(!(q<s.length))return A.a(s,q)
s[q]=p}},
J(){return new A.b8(new Uint32Array(A.z(this.a)))},
gaC(){return B.n},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.b8){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b]},
i(a){return this.a6(0,0)},
bm(a){var s=this.a
s.$flags&2&&A.b(s)
if(0>=s.length)return A.a(s,0)
s[0]=a},
bj(){return J.af(B.p.gA(this.a))},
aP(a){var s,r=this.a,q=r.length
for(s=0;s<q;++s)a.aL(r[s])},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=""+s[0]}else s=A.E(s)
return s}}
A.ce.prototype={
J(){return new A.ce(A.lN(this.a,!0,t.k))},
gaC(){return B.r},
gu(a){return this.a.length},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b].i(0)},
i(a){return this.a6(0,0)},
U(a,b){var s,r,q
if(b==null)return!1
if(b instanceof A.ce){s=this.a
r=s.length
q=b.a
s=r===q.length&&A.n(s)===A.n(q)}else s=!1
return s},
gH(a){return A.n(this.a)},
aP(a){var s,r,q,p
for(s=this.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.V)(s),++q){p=s[q]
a.aL(p.a)
a.aL(p.b)}},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=s[0].B(0)}else s=A.E(s)
return s}}
A.bO.prototype={
J(){return new A.bO(new Int8Array(A.z(this.a)))},
gaC(){return B.b5},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.bO){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b]},
i(a){return this.a6(0,0)},
bm(a){var s=this.a
s.$flags&2&&A.b(s)
if(0>=s.length)return A.a(s,0)
s[0]=a},
bj(){return J.af(B.aF.gA(this.a))},
aP(a){a.aZ(J.a4(B.aF.gA(this.a),0,null))},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=""+s[0]}else s=A.E(s)
return s}}
A.ch.prototype={
hc(a,b){var s,r,q,p,o
for(s=this.a,r=s.$flags|0,q=0;q<b;++q){p=a.p()
o=$.as()
o.$flags&2&&A.b(o)
o[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
p=p[0]
r&2&&A.b(s)
if(!(q<s.length))return A.a(s,q)
s[q]=p}},
J(){return new A.ch(new Int16Array(A.z(this.a)))},
gaC(){return B.b6},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.ch){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b]},
i(a){return this.a6(0,0)},
bm(a){var s=this.a
s.$flags&2&&A.b(s)
if(0>=s.length)return A.a(s,0)
s[0]=a},
bj(){return J.af(B.aE.gA(this.a))},
aP(a){var s,r,q,p=new Int16Array(1),o=J.mL(B.aE.gA(p),0,null),n=this.a,m=n.length
for(s=o.length,r=0;r<m;++r){q=n[r]
if(0>=1)return A.a(p,0)
p[0]=q
if(0>=s)return A.a(o,0)
a.aD(o[0])}},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=""+s[0]}else s=A.E(s)
return s}}
A.cf.prototype={
hb(a,b){var s,r,q,p,o
for(s=this.a,r=s.$flags|0,q=0;q<b;++q){p=a.k()
o=$.O()
o.$flags&2&&A.b(o)
o[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
p=p[0]
r&2&&A.b(s)
if(!(q<s.length))return A.a(s,q)
s[q]=p}},
J(){return new A.cf(new Int32Array(A.z(this.a)))},
gaC(){return B.b7},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.cf){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b]},
i(a){return this.a6(0,0)},
bm(a){var s=this.a
s.$flags&2&&A.b(s)
if(0>=s.length)return A.a(s,0)
s[0]=a},
bj(){return J.af(B.U.gA(this.a))},
aP(a){var s,r,q,p=this.a,o=p.length
for(s=0;s<o;++s){r=p[s]
q=$.im()
q.$flags&2&&A.b(q)
q[0]=r
r=$.lu()
if(0>=r.length)return A.a(r,0)
a.aL(r[0])}},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=""+s[0]}else s=A.E(s)
return s}}
A.cg.prototype={
J(){return new A.cg(A.lN(this.a,!0,t.k))},
gaC(){return B.b1},
gu(a){return this.a.length},
U(a,b){var s,r,q
if(b==null)return!1
if(b instanceof A.cg){s=this.a
r=s.length
q=b.a
s=r===q.length&&A.n(s)===A.n(q)}else s=!1
return s},
gH(a){return A.n(this.a)},
a6(a,b){var s
A.w(b)
s=this.a
if(!(b>=0&&b<s.length))return A.a(s,b)
return s[b].i(0)},
i(a){return this.a6(0,0)},
aP(a){var s,r,q,p,o,n
for(s=this.a,r=s.length,q=0;q<s.length;s.length===r||(0,A.V)(s),++q){p=s[q]
o=$.im()
o.$flags&2&&A.b(o)
o[0]=p.a
n=$.lu()
if(0>=n.length)return A.a(n,0)
a.aL(n[0])
o[0]=p.b
a.aL(n[0])}},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=s[0].B(0)}else s=A.E(s)
return s}}
A.da.prototype={
he(a,b){var s,r,q,p,o
for(s=this.a,r=s.$flags|0,q=0;q<b;++q){p=a.k()
o=$.O()
o.$flags&2&&A.b(o)
o[0]=p
p=$.c2()
if(0>=p.length)return A.a(p,0)
p=p[0]
r&2&&A.b(s)
if(!(q<s.length))return A.a(s,q)
s[q]=p}},
J(){return new A.da(new Float32Array(A.z(this.a)))},
gaC(){return B.b2},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.da){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
bj(){return J.af(B.aj.gA(this.a))},
aP(a){var s,r=this.a,q=r.length
for(s=0;s<q;++s)a.kv(r[s])},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=A.E(s[0])}else s=A.E(s)
return s}}
A.d8.prototype={
h9(a,b){var s,r
for(s=this.a,r=0;r<b;++r)B.ak.h(s,r,a.dg())},
J(){return new A.d8(new Float64Array(A.z(this.a)))},
gaC(){return B.b3},
gu(a){return this.a.length},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.d8){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
bj(){return J.af(B.ak.gA(this.a))},
aP(a){var s,r=this.a,q=r.length
for(s=0;s<q;++s)a.kw(r[s])},
B(a){var s=this.a,r=s.length
if(r===1){if(0>=r)return A.a(s,0)
s=A.E(s[0])}else s=A.E(s)
return s}}
A.db.prototype={
J(){return new A.db(new Uint8Array(A.z(this.a)))},
gaC(){return B.F},
gu(a){return this.a.length},
bj(){return this.a},
U(a,b){var s,r
if(b==null)return!1
if(b instanceof A.db){s=this.a
r=b.a
s=s.length===r.length&&A.n(s)===A.n(r)}else s=!1
return s},
gH(a){return A.n(this.a)},
aP(a){a.aZ(this.a)},
B(a){return"<data>"}}
A.d9.prototype={
J(){return A.lE(this.a)},
gaC(){return B.b4},
gu(a){return 1},
U(a,b){var s
if(b==null)return!1
s=!1
if(b instanceof A.d9)s=this.a===b.a
return s},
gH(a){return this.a},
a6(a,b){if(A.w(b)!==0)throw A.h(A.q9("Ifd tags must have exactly one entry (the offset)"))
return this.a},
i(a){return this.a6(0,0)},
bm(a){this.a=a},
bj(){var s=this.a
return new Uint8Array(A.z(A.k([B.a.j(s,24),B.a.j(s,16),B.a.j(s,8),s],t.t)))},
aP(a){a.aL(this.a)},
B(a){return"Ifd@"+this.a}}
A.aj.prototype={
ae(){return"BmpCompression."+this.b}}
A.iu.prototype={}
A.bt.prototype={
ea(a,b){var s,r,q,p,o,n,m,l=this,k=l.d,j=k<=40
if(j){s=l.r
s=s===B.ap||s===B.aq}else s=!0
if(s){s=l.as=a.k()
r=A.l0(s)
l.CW=r
q=B.a.a3(s,r)
s=q>0
l.cx=s?255/q:0
r=l.at=a.k()
p=A.l0(r)
l.cy=p
o=B.a.a3(r,p)
l.db=s?255/o:0
r=l.ax=a.k()
p=A.l0(r)
l.dx=p
n=B.a.a3(r,p)
l.dy=s?255/n:0
if(!j||l.r===B.aq){j=l.ay=a.k()
s=A.l0(j)
l.fr=s
m=B.a.a3(j,s)
l.fx=m>0?255/m:0}else if(l.f===16){l.ay=4278190080
l.fr=24
l.fx=1}else{l.ay=4278190080
l.fr=24
l.fx=1}}else if(l.f===16){l.as=31744
l.CW=10
l.cx=8.225806451612904
l.at=992
l.cy=5
l.db=8.225806451612904
l.ax=31
l.dx=0
l.dy=8.225806451612904
l.fx=l.fr=l.ay=0}else{l.as=16711680
l.CW=16
l.cx=1
l.at=65280
l.cy=8
l.db=1
l.ax=255
l.dx=0
l.dy=1
l.ay=4278190080
l.fr=24
l.fx=1}j=a.d
a.d=j+(k-(j-l.fy))
if(l.f<=8)l.ka(a)},
gcA(){var s=this.d
if(s!==40)if(s===124){s=this.ay
s===$&&A.d()
s=s===0}else s=!1
else s=!0
return s},
gN(){return Math.abs(this.c)},
ka(a){var s,r,q,p,o,n=this,m=n.z
if(m===0)m=B.a.S(1,n.f)
n.ch=new A.ba(new Uint8Array(m*3),m,3)
for(s=0;s<m;++s){r=J.c(a.a,a.d++)
q=J.c(a.a,a.d++)
p=J.c(a.a,a.d++)
o=J.c(a.a,a.d++)
n.ch.cP(s,p,q,r,o)}},
jF(a,b){var s,r,q,p,o,n,m,l,k,j=this
t.jO.a(b)
if(j.ch!=null){s=j.f
if(s===1){r=a.G()
for(q=7;q>=0;--q)b.$4(B.a.bw(r,q)&1,0,0,0)
return}else if(s===2){r=a.G()
for(q=6;q>=0;q-=2)b.$4(B.a.bw(r,q)&2,0,0,0)}else if(s===4){r=a.G()
b.$4(B.a.j(r,4)&15,0,0,0)
b.$4(r&15,0,0,0)
return}else if(s===8){b.$4(a.G(),0,0,0)
return}}s=j.r
if(s===B.ap&&j.f===32){p=a.k()
s=j.as
s===$&&A.d()
o=j.CW
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.cx
s===$&&A.d()
n=B.b.i(o*s)
s=j.at
s===$&&A.d()
o=j.cy
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.db
s===$&&A.d()
m=B.b.i(o*s)
s=j.ax
s===$&&A.d()
o=j.dx
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.dy
s===$&&A.d()
l=B.b.i(o*s)
if(j.gcA())k=255
else{s=j.ay
s===$&&A.d()
o=j.fr
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.fx
s===$&&A.d()
k=B.b.i(o*s)}return b.$4(n,m,l,k)}else{o=j.f
if(o===32&&s===B.aP){l=a.G()
m=a.G()
n=a.G()
k=a.G()
return b.$4(n,m,l,j.gcA()?255:k)}else if(o===24){l=a.G()
m=a.G()
return b.$4(a.G(),m,l,255)}else if(o===16){p=a.p()
s=j.as
s===$&&A.d()
o=j.CW
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.cx
s===$&&A.d()
n=B.b.i(o*s)
s=j.at
s===$&&A.d()
o=j.cy
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.db
s===$&&A.d()
m=B.b.i(o*s)
s=j.ax
s===$&&A.d()
o=j.dx
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.dy
s===$&&A.d()
l=B.b.i(o*s)
if(j.gcA())k=255
else{s=j.ay
s===$&&A.d()
o=j.fr
o===$&&A.d()
o=B.a.a3((p&s)>>>0,o)
s=j.fx
s===$&&A.d()
k=B.b.i(o*s)}return b.$4(n,m,l,k)}else throw A.h(A.o("Unsupported bitsPerPixel ("+o+") or compression ("+s.B(0)+")."))}},
$iL:1,
gR(){return this.b}}
A.fE.prototype={
br(a){var s,r
if(!A.mQ(A.t(a,!1,null,0))||a.length<18)return!1
s=A.t(a,!1,null,0)
s.d+=14
r=s.k()
return r>=12&&r<=124},
aA(a){var s
if(!this.br(a))return null
s=A.t(a,!1,null,0)
this.a=s
return this.b=A.p2(s,null)},
ak(a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=b.b
if(a0==null)return new A.bw(a,a,a,a,0,B.i,0,0)
s=b.a
s===$&&A.d()
r=a0.a.b
r===$&&A.d()
s.d=r
q=a0.f
r=a0.b
p=B.a.V(r*q+31,32)*4
s=b.c
if(s)o=4
else if(q===1||q===4||q===8)o=1
else{n=q===32?4:3
o=n}if(s)m=B.e
else if(q===1)m=B.w
else{if(q===2)n=B.B
else if(q===4)n=B.C
else n=B.e
m=n}l=s?a:a0.ch
k=A.P(a,a,m,0,B.i,a0.gN(),a,0,o,l,B.e,r,!1)
for(j=k.gN()-1,s=a0.c,r=1/s<0,n=s<0,s=s===0;j>=0;--j){i={}
if(!(s?r:n))h=j
else{g=k.a
g=g==null?a:g.b
h=(g==null?0:g)-1-j}g=b.a
f=g.am(p)
g.d=g.d+(f.c-f.d)
g=k.a
e=g==null
d=e?a:g.a
if(d==null)d=0
i.a=0
c=e?a:g.O(0,h,a)
if(c==null)c=new A.J()
while(i.a<d)a0.jF(f,new A.it(i,b,d,a0,c))}return k},
aY(a,b){if(this.aA(a)==null)return null
return this.ak(0)}}
A.it.prototype={
$4(a,b,c,d){var s,r,q=this,p=q.a
if(p.a<q.c){s=q.b.c&&q.d.ch!=null
r=q.e
if(s){s=q.d
r.a9(s.ch.aW(a),s.ch.aV(a),s.ch.aU(a),s.ch.b0(a))}else r.a9(a,b,c,d)
r.D();++p.a}},
$S:55}
A.iy.prototype={}
A.L.prototype={}
A.ix.prototype={}
A.iz.prototype={}
A.fQ.prototype={}
A.eg.prototype={
cD(){return this.w},
bk(a,b,c,d,e){throw A.h(A.o("B44 compression not yet supported."))},
cf(a,b,c){return this.bk(a,b,c,null,null)},
B(a){return A.E(this.r)+" "+this.x}}
A.d4.prototype={
ae(){return"ExrChannelType."+this.b}}
A.c9.prototype={
ae(){return"ExrChannelName."+this.b}}
A.fR.prototype={
h4(a){var s=this,r=a.cF()
s.a=r
if(r.length===0)return
r=a.k()
if(!(r<3))return A.a(B.br,r)
s.c=B.br[r]
a.G()
a.d+=3
s.f=a.k()
s.r=a.k()
r=s.a
if(r==="R"){s.w=!0
s.b=B.cJ}else if(r==="G"){s.w=!0
s.b=B.cK}else if(r==="B"){s.w=!0
s.b=B.cL}else if(r==="A"){s.w=!0
s.b=B.cM}else{s.w=!1
s.b=B.cN}switch(s.c.a){case 0:s.d=4
break
case 1:s.d=2
break
case 2:s.d=4
break}}}
A.b6.prototype={
ae(){return"ExrCompressorType."+this.b}}
A.bu.prototype={
bk(a,b,c,d,e){throw A.h(A.o("Unsupported compression type"))},
cf(a,b,c){return this.bk(a,b,c,null,null)}}
A.h5.prototype={}
A.fS.prototype={
sfC(a){this.c=t.T.a(a)}}
A.e_.prototype={
eb(a){var s,r,q,p,o=this,n=A.t(a,!1,null,0)
if(n.k()!==20000630)throw A.h(A.o("File is not an OpenEXR image file."))
s=o.d=n.G()
if(s!==2)throw A.h(A.o("Cannot read version "+s+" image files."))
s=o.e=n.bi()
if((s&4294967289)>>>0!==0)throw A.h(A.o("The file format version number's flag field contains unrecognized flags."))
if((s&16)===0){r=o.c
q=A.nc(r.length,(s&2)!==0,n)
if(q.w>0)B.c.I(r,q)}else for(s=o.c;;){q=A.nc(s.length,(o.e&2)!==0,n)
if(q.w<=0)break
B.c.I(s,q)}s=o.c
r=s.length
if(r===0)throw A.h(A.o("Error reading image header"))
for(p=0;p<s.length;s.length===r||(0,A.V)(s),++p)s[p].k9(n)
o.j7(n)},
j7(a){var s,r,q,p,o=this
for(s=o.c,r=s.length,q=0;q<s.length;s.length===r||(0,A.V)(s),++q){p=s[q]
o.a=Math.max(o.a,p.w)
o.b=Math.max(o.b,p.x)
if(p.db)o.jg(p,a)
else o.jf(p,a)}},
jg(b6,b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=null,b5=this.e
b5===$&&A.d()
s=(b5&16)!==0
b5=b6.b
b5.toString
r=b6.CW
q=b6.ay
p=A.p(b7,b4,0)
o=b6.c
n=b6.a
m=0
l=0
for(;;){k=b6.k1
k.toString
if(!(m<k))break
j=0
for(;;){k=b6.id
k.toString
if(!(j<k))break
k=l!==0
i=0
h=0
for(;;){g=b6.go
if(!(m<g.length))return A.a(g,m)
if(!(i<g[m]))break
f=0
for(;;){g=b6.fy
if(!(j<g.length))return A.a(g,j)
if(!(f<g[j]))break
if(k)break
if(!(l>=0&&l<q.length))return A.a(q,l)
g=q[l]
if(!(h>=0&&h<g.length))return A.a(g,h)
p.d=g[h]
if(s)if(p.k()!==n)throw A.h(A.o("Invalid Image Data"))
e=p.k()
d=p.k()
p.k()
p.k()
c=p.am(p.k())
p.d=p.d+(c.c-c.d)
g=b6.dy
g.toString
b=d*g
a=b6.dx
a.toString
g=r.bk(c,e*a,b,a,g)
a=g.length
a=Math.min(a,a)
a0=new A.am(g,0,a,0,!1)
a1=r.a
a2=r.b
a3=o.length
a4=0
a5=0
for(;;){if(!(a5<a2&&b<this.b))break
for(a6=0;a6<a3;++a6){if(a4>=a)break
if(!(a6<o.length))return A.a(o,a6)
a7=o[a6]
g=b6.dx
g.toString
a8=e*g
for(a9=0;a9<a1;++a9,++a8){g=a7.c
g===$&&A.d()
switch(g.a){case 1:g=a0.p()
b0=$.T
b0=b0!=null?b0:A.X()
if(!(g<b0.length))return A.a(b0,g)
b1=b0[g]
break
case 2:b1=a0.p()
break
case 0:b1=a0.k()
break
default:b1=b4}g=a7.d
g===$&&A.d()
a4+=g
g=a7.w
g===$&&A.d()
if(g){g=b5.a
b2=g==null?b4:g.O(a8,b,b4)
if(b2==null)b2=new A.J()
g=a7.b
g===$&&A.d()
b2.h(0,g.a,b1)}else{g=a7.a
g===$&&A.d()
b0=b5.b
b3=b0!=null?b0.m(0,g):b4
if(b3!=null)b3.a5(a8,b,b1,0,0)}}}++a5;++b}++f;++h}++i}++j;++l}++m}},
jf(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6=null,a7=this.e
a7===$&&A.d()
s=(a7&16)!==0
a7=a8.b
a7.toString
r=a8.CW
q=a8.ay
if(0>=q.length)return A.a(q,0)
p=q[0]
o=a8.cx
n=A.p(a9,a6,0)
for(q=p.length,m=a8.c,l=r!=null,k=0,j=0;j<q;++j){n.d=p[j]
if(s)if(n.k()!==3.141592653589793)throw A.h(A.o("Invalid Image Data"))
i=n.k()
h=$.O()
h.$flags&2&&A.b(h)
h[0]=i
i=$.a9()
if(0>=i.length)return A.a(i,0)
h[0]=n.k()
g=n.am(i[0])
n.d=n.d+(g.c-g.d)
if(l){i=r.cf(g,0,k)
h=i.length
f=new A.am(i,0,Math.min(h,h),0,!1)}else f=g
e=f.c-f.d
d=m.length
c=0
for(;;){if(!(c<o&&k<this.b))break
i=a8.cy
if(!(k>=0&&k<i.length))return A.a(i,k)
b=i[k]
if(b>=e)break
for(a=0;a<d;++a){if(b>=e)break
if(!(a<m.length))return A.a(m,a)
a0=m[a]
a1=a8.w
for(a2=0;a2<a1;++a2){i=a0.c
i===$&&A.d()
switch(i.a){case 1:i=f.p()
h=$.T
h=h!=null?h:A.X()
if(!(i<h.length))return A.a(h,i)
a3=h[i]
break
case 2:a3=f.p()
break
case 0:a3=f.k()
break
default:a3=a6}i=a0.d
i===$&&A.d()
b+=i
i=a0.w
i===$&&A.d()
if(i){i=a7.a
a4=i==null?a6:i.O(a2,k,a6)
if(a4==null)a4=new A.J()
i=a0.b
i===$&&A.d()
a4.h(0,i.a,a3)}else{i=a0.a
i===$&&A.d()
h=a7.b
a5=h!=null?h.m(0,i):a6
if(a5!=null)a5.a5(a2,k,a3,0,0)}}}++c;++k}}},
$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.e0.prototype={
h5(a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3=this,a4=null,a5=A.H(t.N,t.w)
for(s=a3.e,r=t.t,q=t.L,p=a3.c,o=B.E;;){n=a8.cF()
if(n.length===0)break
a8.cF()
m=a8.am(a8.k())
a8.d=a8.d+(m.c-m.d)
s.h(0,n,new A.fQ())
switch(n){case"channels":for(;;){l=new A.fR()
l.h4(m)
k=l.a
k===$&&A.d()
if(k.length===0)break
j=l.w
j===$&&A.d()
if(j){++a3.d
k=l.c
k===$&&A.d()
if(k===B.at)o=B.E
else o=k===B.au?B.J:B.K}else{j=l.c
j===$&&A.d()
if(j===B.at){j=a3.w
i=a3.x
a5.h(0,k,new A.dc(new Uint16Array(j*i),j,i,1))}else if(j===B.au){j=a3.w
i=a3.x
a5.h(0,k,new A.dd(new Float32Array(j*i),j,i,1))}else if(j===B.aX){j=a3.w
i=a3.x
a5.h(0,k,new A.dh(new Uint32Array(j*i),j,i,1))}}B.c.I(p,l)}break
case"chromaticities":k=new Float32Array(8)
a3.at=k
j=m.k()
i=$.O()
i.$flags&2&&A.b(i)
i[0]=j
j=$.c2()
if(0>=j.length)return A.a(j,0)
k[0]=j[0]
k=a3.at
i[0]=m.k()
h=j[0]
k.$flags&2&&A.b(k)
k[1]=h
h=a3.at
i[0]=m.k()
k=j[0]
h.$flags&2&&A.b(h)
h[2]=k
k=a3.at
i[0]=m.k()
h=j[0]
k.$flags&2&&A.b(k)
k[3]=h
h=a3.at
i[0]=m.k()
k=j[0]
h.$flags&2&&A.b(h)
h[4]=k
k=a3.at
i[0]=m.k()
h=j[0]
k.$flags&2&&A.b(k)
k[5]=h
h=a3.at
i[0]=m.k()
k=j[0]
h.$flags&2&&A.b(h)
h[6]=k
k=a3.at
i[0]=m.k()
j=j[0]
k.$flags&2&&A.b(k)
k[7]=j
break
case"compression":k=J.c(m.a,m.d++)
if(!(k>=0&&k<8))return A.a(B.bD,k)
a3.ax=B.bD[k]
break
case"dataWindow":k=m.k()
j=$.O()
j.$flags&2&&A.b(j)
j[0]=k
k=$.a9()
if(0>=k.length)return A.a(k,0)
i=k[0]
j[0]=m.k()
h=k[0]
j[0]=m.k()
g=k[0]
j[0]=m.k()
k=q.a(A.k([i,h,g,k[0]],r))
a3.r=k
a3.w=k[2]-k[0]+1
a3.x=k[3]-k[1]+1
break
case"displayWindow":k=m.k()
j=$.O()
j.$flags&2&&A.b(j)
j[0]=k
k=$.a9()
if(0>=k.length)return A.a(k,0)
j[0]=m.k()
j[0]=m.k()
j[0]=m.k()
break
case"lineOrder":break
case"pixelAspectRatio":k=m.k()
j=$.O()
j.$flags&2&&A.b(j)
j[0]=k
k=$.c2()
if(0>=k.length)return A.a(k,0)
break
case"screenWindowCenter":k=m.k()
j=$.O()
j.$flags&2&&A.b(j)
j[0]=k
k=$.c2()
if(0>=k.length)return A.a(k,0)
j[0]=m.k()
break
case"screenWindowWidth":k=m.k()
j=$.O()
j.$flags&2&&A.b(j)
j[0]=k
k=$.c2()
if(0>=k.length)return A.a(k,0)
break
case"tiles":a3.dx=m.k()
a3.dy=m.k()
f=J.c(m.a,m.d++)
a3.fr=f&15
a3.fx=B.a.j(f,4)&15
break
case"type":e=m.cF()
if(e!=="deepscanline")if(e!=="deeptile")throw A.h(A.o("EXR Invalid type: "+e))
break
default:break}}s=a3.w
a3.b=A.P(a4,a4,o,0,B.i,a3.x,a4,0,a3.d,a4,B.e,s,!1)
for(s=new A.U(a5,a5.r,a5.e,a5.$ti.l("U<1>"));s.D();){r=s.d
q=a3.b
q.toString
k=a5.m(0,r)
k.toString
q.fU(r,k)}if(a3.db){s={}
r=a3.r
r===$&&A.d()
a3.id=a3.hA(r[0],r[2],r[1],r[3])
r=a3.r
a3.k1=a3.hB(r[0],r[2],r[1],r[3])
if(a3.fr!==2)a3.k1=1
r=a3.id
r.toString
q=a3.r
a3.fy=a3.el(r,q[0],q[2],a3.dx,a3.fx)
q=a3.k1
q.toString
r=a3.r
a3.go=a3.el(q,r[1],r[3],a3.dy,a3.fx)
r=a3.hz()
a3.k2=r
q=a3.dx
q.toString
q=r*q
a3.k3=q
a3.CW=A.mX(a3.ax,a3,q,a3.dy)
s.a=s.b=0
q=a3.id
q.toString
r=a3.k1
r.toString
a3.ay=A.nm(q*r,new A.iC(s,a3),t.mC)}else{s=a3.x
r=a3.ch=new Uint32Array(s+1)
for(q=p.length,k=a3.r,j=a3.w,d=0;d<q;++d){c=p[d]
i=c.d
i===$&&A.d()
h=c.f
h===$&&A.d()
b=B.a.an(i*j,h)
for(i=c.r,a=0;a<s;++a){k===$&&A.d()
h=k[1]
i===$&&A.d()
if(B.a.Y(a+h,i)===0)r[a]=r[a]+b}}for(a0=0,a=0;a<s;++a)a0=Math.max(a0,r[a])
s=A.mX(a3.ax,a3,a0,a4)
a3.CW=s
s=a3.cx=s.cD()
r=a3.ch
q=r.length
p=new Uint32Array(q)
a3.cy=p
for(--q,a1=0,a2=0;a2<=q;++a2){if(B.a.Y(a2,s)===0)a1=0
p[a2]=a1
a1+=r[a2]}s=B.a.an(a3.x+s,s)
a3.ay=A.k([new Uint32Array(s-1)],t.mD)}},
hA(a,b,c,d){var s,r,q,p,o=this
switch(o.fr){case 0:s=1
break
case 1:r=Math.max(b-a+1,d-c+1)
q=o.fx
A.w(r)
s=(q===0?o.cY(r):o.cS(r))+1
break
case 2:p=b-a+1
s=(o.fx===0?o.cY(p):o.cS(p))+1
break
default:throw A.h(A.o("Unknown LevelMode format."))}return s},
hB(a,b,c,d){var s,r,q,p,o=this
switch(o.fr){case 0:s=1
break
case 1:r=Math.max(b-a+1,d-c+1)
q=o.fx
A.w(r)
s=(q===0?o.cY(r):o.cS(r))+1
break
case 2:p=d-c+1
s=(o.fx===0?o.cY(p):o.cS(p))+1
break
default:throw A.h(A.o("Unknown LevelMode format."))}return s},
cY(a){var s
for(s=0;a>1;){++s
a=B.a.j(a,1)}return s},
cS(a){var s,r
for(s=0,r=0;a>1;){if((a&1)!==0)r=1;++s
a=B.a.j(a,1)}return s+r},
hz(){var s,r,q,p,o
for(s=this.c,r=s.length,q=0,p=0;p<r;++p){o=s[p].d
o===$&&A.d()
q+=o}return q},
el(a,b,c,d,e){var s,r,q,p,o,n,m=J.ar(a,t.p)
for(s=e===1,r=c-b+1,q=0;q<a;++q){p=B.a.S(1,q)
o=B.a.an(r,p)
if(s&&o*p<r)++o
n=Math.max(o,1)
d.toString
m[q]=B.a.an(n+d-1,d)}return m}}
A.iC.prototype={
$1(a){var s,r,q,p,o=this.b,n=o.fy,m=this.a,l=m.b
if(!(l<n.length))return A.a(n,l)
n=n[l]
s=o.go
r=m.a
if(!(r<s.length))return A.a(s,r)
s=s[r]
q=new Uint32Array(n*s)
p=l+1
m.b=p
if(p===o.id){m.b=0
m.a=r+1}return q},
$S:27}
A.h6.prototype={
k9(a){var s,r,q,p,o,n=this
if(n.db)for(s=0;s<n.ay.length;++s){r=0
for(;;){q=n.ay
if(!(s<q.length))return A.a(q,s)
q=q[s]
if(!(r<q.length))break
p=a.e_()
q.$flags&2&&A.b(q)
q[r]=p;++r}}else{q=n.ay
if(0>=q.length)return A.a(q,0)
o=q[0].length
for(s=0;s<o;++s){q=n.ay
if(0>=q.length)return A.a(q,0)
q=q[0]
p=a.e_()
q.$flags&2&&A.b(q)
if(!(s<q.length))return A.a(q,s)
q[s]=p}}}}
A.h7.prototype={
hh(a,b,c){var s,r,q,p=this,o=a.c.length,n=J.ar(o,t.nA)
for(s=0;s<o;++s)n[s]=new A.fl()
p.y=t.am.a(n)
r=p.w
r.toString
q=B.a.V(r*p.x,2)
p.z=new Uint16Array(q)},
cD(){return this.x},
bk(a6,a7,a8,a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this
if(a9==null)a9=a5.c.w
if(b0==null)b0=a5.c.cx
s=a7+a9-1
r=a8+b0-1
q=a5.c
p=q.w
if(s>p)s=p-1
p=q.x
if(r>p)r=p-1
a5.a=s-a7+1
a5.b=r-a8+1
o=q.c
n=o.length
for(m=0,l=0;l<n;++l){k=o[l]
q=a5.y
q===$&&A.d()
if(!(l<q.length))return A.a(q,l)
j=q[l]
j.b=j.a=m
q=k.f
q===$&&A.d()
i=B.a.an(a7,q)
h=B.a.an(s,q)
q=i*q<a7?0:1
q=h-i+q
j.c=q
p=k.r
p===$&&A.d()
i=B.a.an(a8,p)
h=B.a.an(r,p)
g=i*p<a8?0:1
g=h-i+g
j.d=g
j.e=p
p=k.d
p===$&&A.d()
p=p/2|0
j.f=p
m+=q*g*p}f=a6.p()
e=a6.p()
if(e>=8192)throw A.h(A.o("Error in header for PIZ-compressed data (invalid bitmap size)."))
d=new Uint8Array(8192)
if(f<=e){c=a6.al(e-f+1)
b=c.c-c.d
for(a=f,l=0;l<b;++l,a=a0){a0=a+1
q=J.c(c.a,c.d+l)
if(!(a<8192))return A.a(d,a)
d[a]=q}}a1=new Uint16Array(65536)
a2=a5.jk(d,a1)
A.pk(a6,a6.k(),a5.z,m)
for(l=0;l<n;++l){q=a5.y
q===$&&A.d()
if(!(l<q.length))return A.a(q,l)
j=q[l]
a=0
for(;;){q=j.f
q===$&&A.d()
if(!(a<q))break
p=a5.z
p.toString
g=j.a
g===$&&A.d()
a3=j.c
a3===$&&A.d()
a4=j.d
a4===$&&A.d()
A.po(p,g+a,a3,q,a4,a3*q,a2);++a}}q=a5.z
q.toString
a5.hs(a1,q,m)
q=a5.r
if(q==null){q=a5.w
q.toString
q=a5.r=A.eD(!1,q*a5.x+73728)}q.a=0
for(;a8<=r;++a8)for(l=0;l<n;++l){q=a5.y
q===$&&A.d()
if(!(l<q.length))return A.a(q,l)
j=q[l]
q=j.e
q===$&&A.d()
if(B.a.Y(a8,q)!==0)continue
q=j.c
q===$&&A.d()
p=j.f
p===$&&A.d()
a7=q*p
for(;a7>0;--a7){q=a5.r
q.toString
p=a5.z
p.toString
g=j.b
g===$&&A.d()
j.b=g+1
if(!(g>=0&&g<p.length))return A.a(p,g)
q.aD(p[g])}}q=a5.r
return J.a4(B.f.gA(q.c),0,q.a)},
cf(a,b,c){return this.bk(a,b,c,null,null)},
hs(a,b,c){var s,r,q,p=t.L
p.a(a)
p.a(b)
for(p=b.length,s=b.$flags|0,r=0;r<c;++r){if(!(r<p))return A.a(b,r)
q=b[r]
if(!(q>=0&&q<65536))return A.a(a,q)
q=a[q]
s&2&&A.b(b)
b[r]=q}},
jk(a,b){var s,r,q,p,o,n
for(s=b.$flags|0,r=0,q=0;q<65536;++q){if(q!==0){p=q>>>3
if(!(p<8192))return A.a(a,p)
p=(a[p]&1<<(q&7))>>>0!==0}else p=!0
if(p){o=r+1
s&2&&A.b(b)
if(!(r<65536))return A.a(b,r)
b[r]=q
r=o}}for(o=r;o<65536;o=n){n=o+1
s&2&&A.b(b)
if(!(o<65536))return A.a(b,o)
b[o]=0}return r-1}}
A.fl.prototype={}
A.h8.prototype={
cD(){return this.x},
bk(a4,a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2=B.D.bS(a4.a4()),a3=a1.y
if(a3==null){a3=a1.w
a3.toString
a3=a1.y=A.eD(!1,a1.x*a3)}a3.a=0
s=A.k([0,0,0,0],t.t)
r=new Uint32Array(1)
q=J.a4(B.p.gA(r),0,null)
if(a7==null)a7=a1.c.w
if(a8==null)a8=a1.c.cx
p=a5+a7-1
o=a6+a8-1
a3=a1.c
n=a3.w
if(p>n)p=n-1
n=a3.x
if(o>n)o=n-1
a1.a=p-a5+1
a1.b=o-a6+1
a3=a3.c
m=a3.length
for(n=q.length,l=a2.length,k=a6,j=0;k<=o;++k)for(i=0;i<m;++i){if(!(i<a3.length))return A.a(a3,i)
h=a3[i]
g=h.r
g===$&&A.d()
if(B.a.Y(a6,g)!==0)continue
g=h.f
g===$&&A.d()
f=B.a.an(a5,g)
e=B.a.an(p,g)
g=f*g<a5?0:1
d=e-f+g
if(0>=1)return A.a(r,0)
r[0]=0
g=h.c
g===$&&A.d()
switch(g.a){case 0:B.c.h(s,0,j)
B.c.h(s,1,s[0]+d)
B.c.h(s,2,s[1]+d)
j=s[2]+d
for(c=0;c<d;++c){g=s[0]
B.c.h(s,0,g+1)
if(!(g>=0&&g<l))return A.a(a2,g)
g=a2[g]
b=s[1]
B.c.h(s,1,b+1)
if(!(b>=0&&b<l))return A.a(a2,b)
b=a2[b]
a=s[2]
B.c.h(s,2,a+1)
if(!(a>=0&&a<l))return A.a(a2,a)
a=a2[a]
r[0]=r[0]+((g<<24|b<<16|a<<8)>>>0)
for(a0=0;a0<4;++a0){g=a1.y
g.toString
if(!(a0<n))return A.a(q,a0)
g.C(q[a0])}}break
case 1:B.c.h(s,0,j)
B.c.h(s,1,s[0]+d)
j=s[1]+d
for(c=0;c<d;++c){g=s[0]
B.c.h(s,0,g+1)
if(!(g>=0&&g<l))return A.a(a2,g)
g=a2[g]
b=s[1]
B.c.h(s,1,b+1)
if(!(b>=0&&b<l))return A.a(a2,b)
b=a2[b]
r[0]=r[0]+((g<<8|b)>>>0)
for(a0=0;a0<2;++a0){g=a1.y
g.toString
if(!(a0<n))return A.a(q,a0)
g.C(q[a0])}}break
case 2:B.c.h(s,0,j)
B.c.h(s,1,s[0]+d)
B.c.h(s,2,s[1]+d)
j=s[2]+d
for(c=0;c<d;++c){g=s[0]
B.c.h(s,0,g+1)
if(!(g>=0&&g<l))return A.a(a2,g)
g=a2[g]
b=s[1]
B.c.h(s,1,b+1)
if(!(b>=0&&b<l))return A.a(a2,b)
b=a2[b]
a=s[2]
B.c.h(s,2,a+1)
if(!(a>=0&&a<l))return A.a(a2,a)
a=a2[a]
r[0]=r[0]+((g<<24|b<<16|a<<8)>>>0)
for(a0=0;a0<4;++a0){g=a1.y
g.toString
if(!(a0<n))return A.a(q,a0)
g.C(q[a0])}}break}}a3=a1.y
return J.a4(B.f.gA(a3.c),0,a3.a)},
cf(a,b,c){return this.bk(a,b,c,null,null)}}
A.h9.prototype={
cD(){return 1},
bk(a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=a0.c,a=A.eD(!1,(b-a0.d)*2)
if(a3==null)a3=c.c.w
if(a4==null)a4=c.c.cx
s=a1+a3-1
r=a2+a4-1
q=c.c
p=q.w
if(s>p)s=p-1
q=q.x
if(r>q)r=q-1
c.a=s-a1+1
c.b=r-a2+1
while(q=a0.d,q<b){p=a0.a
a0.d=q+1
q=J.c(p,q)
p=$.at()
p.$flags&2&&A.b(p)
p[0]=q
q=$.aF()
if(0>=q.length)return A.a(q,0)
o=q[0]
if(o<0){n=-o
for(;m=n-1,n>0;n=m)a.C(J.c(a0.a,a0.d++))}else for(n=o;m=n-1,n>=0;n=m)a.C(J.c(a0.a,a0.d++))}l=J.a4(B.f.gA(a.c),0,a.a)
k=l.length
for(b=l.$flags|0,j=1;j<k;++j){q=l[j-1]
p=l[j]
b&2&&A.b(l)
l[j]=q+p-128}b=c.r
if(b==null||b.length!==k)b=c.r=new Uint8Array(k)
q=B.a.V(k+1,2)
for(i=0,h=0;;q=d,i=f){if(h<k){g=h+1
f=i+1
if(!(i<k))return A.a(l,i)
p=l[i]
b.$flags&2&&A.b(b)
e=b.length
if(!(h<e))return A.a(b,h)
b[h]=p}else break
if(g<k){h=g+1
d=q+1
if(!(q<k))return A.a(l,q)
q=l[q]
if(!(g<e))return A.a(b,g)
b[g]=q}else break}return b},
cf(a,b,c){return this.bk(a,b,c,null,null)},
B(a){return A.E(this.w)}}
A.eh.prototype={
cD(){return this.x},
bk(a,b,c,d,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e=B.D.bS(a.a4())
if(d==null)d=f.c.w
if(a0==null)a0=f.c.cx
s=b+d-1
r=c+a0-1
q=f.c
p=q.w
if(s>p)s=p-1
q=q.x
if(r>q)r=q-1
f.a=s-b+1
f.b=r-c+1
o=e.length
for(q=e.$flags|0,n=1;n<o;++n){p=e[n-1]
m=e[n]
q&2&&A.b(e)
e[n]=p+m-128}q=f.y
if(q==null||q.length!==o)q=f.y=new Uint8Array(o)
p=B.a.V(o+1,2)
for(l=0,k=0;;p=g,l=i){if(k<o){j=k+1
i=l+1
if(!(l<o))return A.a(e,l)
m=e[l]
q.$flags&2&&A.b(q)
h=q.length
if(!(k<h))return A.a(q,k)
q[k]=m}else break
if(j<o){k=j+1
g=p+1
if(!(p<o))return A.a(e,p)
p=e[p]
if(!(j<h))return A.a(q,j)
q[j]=p}else break}return q},
cf(a,b,c){return this.bk(a,b,c,null,null)},
B(a){return A.E(this.w)}}
A.iB.prototype={
aA(a){var s=new A.e_(A.k([],t.W))
s.eb(a)
return this.a=s},
ak(a){var s=this.a
if(s==null)return null
s=s.c
if(!(a<s.length))return A.a(s,a)
return s[a].b},
aY(a,b){this.a=A.pm(a)
return this.ak(0)}}
A.e4.prototype={
jR(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
if(d===0&&e.c!=null){s=e.c
s.toString
return s}for(s=e.b,r=e.d,q=-1,p=-1,o=0;o<s;++o){n=r.aW(o)
m=r.aV(o)
l=r.aU(o)
k=r.b0(o)
if(n===a&&m===b&&l===c&&k===d)return o
j=a-n
i=b-m
h=c-l
g=d-k
f=j*j+i*i+h*h+g*g
if(p===-1){p=o
q=f}else if(f<q){p=o
q=f}}return p},
e4(){var s,r,q,p,o,n,m,l=this
if(l.c==null)return l.d
s=l.d
r=s.a
q=new A.ba(new Uint8Array(r*4),r,4)
for(p=0;p<r;++p){o=s.aW(p)
n=s.aV(p)
m=s.aU(p)
q.cP(p,o,n,m,p===l.c?0:255)}return q}}
A.e5.prototype={
h6(a){var s,r,q,p,o,n,m=this
m.a=a.p()
m.b=a.p()
m.c=a.p()
m.d=a.p()
s=a.G()
m.e=(s&64)!==0
if((s&128)!==0){m.f=A.n_(B.a.S(1,(s&7)+1))
for(r=0;q=m.f,r<q.b;++r){p=J.c(a.a,a.d++)
o=J.c(a.a,a.d++)
n=J.c(a.a,a.d++)
q.d.bd(r,p,o,n)}}m.y=a.d-a.b}}
A.ha.prototype={}
A.e6.prototype={$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.iE.prototype={
aA(a){var s,r,q,p,o,n,m,l,k,j,i=this
i.f=A.t(a,!1,null,0)
i.a=new A.e6(A.k([],t.b))
if(!i.eH())return null
try{while(p=i.f,o=p.d,o<p.c){n=p.a
p.d=o+1
s=J.c(n,o)
switch(s){case 44:r=i.f2()
if(r==null){p=i.a
return p}p=r
p.r=i.e
p.w=i.c
if(i.b!==0){if(r.f==null&&i.a.e!=null){p=i.a.e
o=p.a
n=p.b
m=p.c
p=p.d
r.f=new A.e4(o,n,m,new A.ba(new Uint8Array(A.z(p.c)),p.a,p.b))}if(r.f!=null)r.f.c=i.d}B.c.I(i.a.r,r)
break
case 33:p=i.f
q=J.c(p.a,p.d++)
if(J.ae(q,255)){p=i.f
if(p.ag(J.c(p.a,p.d++))==="NETSCAPE2.0"){l=J.c(p.a,p.d++)
k=J.c(p.a,p.d++)
if(l===3&&k===1)i.r=p.p()}else i.d7()}else if(J.ae(q,249)){p=i.f
p.toString
i.j2(p)}else i.d7()
break
case 59:p=i.a
return p
default:break}}}catch(j){}return i.a},
j2(a){var s,r,q,p=this
a.G()
s=a.G()
p.e=a.p()
p.d=a.G()
a.G()
p.c=B.a.j(s,2)&7
p.b=s&1
r=a.cQ(1,0)
if(J.c(r.a,r.d)===44){++a.d
q=p.f2()
if(q==null)return
q.r=p.e
q.w=p.c
r=p.b!==0
q.x=r?p.d:-1
if(r){r=q.f
if(r==null&&p.a.e!=null){r=p.a.e
r.toString
r=q.f=A.pt(r)}if(r!=null)r.c=p.d}B.c.I(p.a.r,q)}},
ak(a){var s,r,q,p=this,o=p.f
if(o==null||p.a==null)return null
s=p.a.r
r=s.length
if(a>=r)return null
q=s[a]
s=q.y
s===$&&A.d()
o.d=s
return p.i_(q)},
aY(a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=null
if(a5.aA(a7)==null)return a6
s=a5.a.r.length
if(s===1)return a5.ak(0)
for(s=t.p,r=a6,q=r,p=0;o=a5.a.r,p<o.length;++p){a8=o[p]
n=a5.ak(p)
if(n==null)return a6
n.y=a8.r*10
if(q==null||r==null){n.r=a5.r
r=n
q=r
continue}o=n.a
m=o==null
l=m?a6:o.a
if(l==null)l=0
k=r.a
j=k==null
i=j?a6:k.a
h=!1
if(l===(i==null?0:i)){o=m?a6:o.b
if(o==null)o=0
m=j?a6:k.b
if(o===(m==null?0:m)){o=a8.a
o===$&&A.d()
if(o===0){o=a8.b
o===$&&A.d()
o=o===0&&a8.w===2}else o=h}else o=h}else o=h
if(o){q.b5(n)
r=n
continue}g=a8.f
if(!(g!=null)){o=a5.a.e
o.toString
g=o}o=j?a6:k.a
if(o==null)o=0
m=j?a6:k.b
if(m==null)m=0
f=A.P(a6,a6,B.e,0,B.i,m,a6,0,1,g.e4(),B.e,o,!1)
o=a8.w
if(o===2){o=f.a
e=o==null?a6:J.af(o.gA(o))
if(e==null){o=f.a
o=o==null?a6:o.gA(o)
if(o==null)o=B.f.gA(new Uint8Array(0))
e=J.af(o)}o=a8.x
m=e.length-1
if(o!==-1)B.f.aF(e,0,m,o)
else{o=a5.a.c.a
l=o.length
if(l!==0){if(0>=l)return A.a(o,0)
o=o[0]}else o=0
B.f.aF(e,0,m,o)}}else if(o!==3)if(a8.f!=null){o=r.a
d=o==null?a6:o.gT()
c=A.H(s,s)
for(o=d.a,b=0;b<o;++b)c.h(0,b,g.jR(d.aW(b),d.aV(b),d.aU(b),d.b0(b)))
o=f.a
a=o==null?a6:J.af(o.gA(o))
if(a==null){o=f.a
o=o==null?a6:o.gA(o)
if(o==null)o=B.f.gA(new Uint8Array(0))
a=J.af(o)}o=r.a
a0=o==null?a6:J.af(o.gA(o))
if(a0==null){o=r.a
o=o==null?a6:o.gA(o)
if(o==null)o=B.f.gA(new Uint8Array(0))
a0=J.af(o)}for(a1=a.length,o=a0.length,m=a.$flags|0,a2=0;a2<a1;++a2){if(!(a2<o))return A.a(a0,a2)
a3=c.m(0,a0[a2])
if(a3!=null&&a3!==-1){m&2&&A.b(a)
a[a2]=a3}}}f.y=n.y
for(o=n.a,o=o.gF(o);o.D();){a4=o.gL()
if(a4.gv()!==0){m=a4.gaT()
l=a8.a
l===$&&A.d()
k=a4.gaQ()
j=a8.b
j===$&&A.d()
f.bM(m+l,k+j,a4)}}q.b5(f)
r=f}return q},
f2(){var s,r=this.f
if(r.d>=r.c)return null
s=new A.ha()
s.h6(r);++this.f.d
this.d7()
return s},
i_(a){var s,r,q,p,o,n,m,l,k,j,i=this,h=null
if(i.w==null){i.w=new Uint8Array(256)
i.x=new Uint8Array(4095)
i.y=new Uint8Array(4096)
i.z=new Uint32Array(4096)}s=i.Q=i.f.G()
r=B.a.a_(1,s)
i.dy=r;++r
i.dx=r
i.db=r+1;++s
i.cy=s
i.cx=B.a.a_(1,s)
i.ay=0
i.CW=4098
i.at=i.ax=0
s=i.w
s.toString
s.$flags&2&&A.b(s)
s[0]=0
s=i.z
s.toString
B.p.aF(s,0,4096,4098)
s=a.c
s===$&&A.d()
r=a.d
r===$&&A.d()
q=a.a
q===$&&A.d()
p=i.a
if(q+s<=p.a){q=a.b
q===$&&A.d()
q=q+r>p.b}else q=!0
if(q)return h
o=a.f
if(!(o!=null)){q=p.e
q.toString
o=q}i.as=s*r
n=A.P(h,h,B.e,0,B.i,r,h,0,1,o.e4(),B.e,s,!1)
m=new Uint8Array(s)
s=a.e
s===$&&A.d()
if(s){s=a.b
s===$&&A.d()
for(r=s+r,l=0,k=0;l<4;++l)for(j=s+B.de[l];j<r;j+=B.ew[l],++k){if(!i.eI(m))return n
i.f9(n,j,o,m)}}else for(j=0;j<r;++j){if(!i.eI(m))return n
i.f9(n,j,o,m)}return n},
f9(a,b,c,d){var s,r,q,p=d.length
for(s=0;s<p;++s){r=d[s]
q=a.a
if(q!=null)q.a5(s,b,r,0,0)}},
eH(){var s,r,q,p,o,n=this,m=n.f.ag(6)
if(m!=="GIF87a"&&m!=="GIF89a")return!1
s=n.a
s.toString
s.a=n.f.p()
s=n.a
s.toString
s.b=n.f.p()
r=n.f.G()
s=n.a
s.toString
s.c=new A.bM(new Uint8Array(A.z(A.k([n.f.G()],t.t))));++n.f.d
if((r&128)!==0){s=n.a
s.toString
s.e=A.n_(B.a.S(1,(r&7)+1))
for(q=0;q<n.a.e.b;++q){s=n.f
p=J.c(s.a,s.d++)
s=n.f
o=J.c(s.a,s.d++)
s=n.f
r=J.c(s.a,s.d++)
n.a.e.d.bd(q,p,o,r)}}n.a.toString
return!0},
eI(a){var s=this,r=s.as
r.toString
s.as=r-a.length
if(!s.ia(a))return!1
if(s.as===0)s.d7()
return!0},
d7(){var s,r,q,p=this.f
if(p.d>=p.c)return!0
s=p.G()
for(;;){if(s!==0){p=this.f
p=p.d<p.c}else p=!1
if(!p)break
p=this.f
r=p.d+=s
if(r>=p.c)return!0
q=p.a
p.d=r+1
s=J.c(q,r)}return!0},
ia(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=g.ay
if(f>4095)return!1
s=a.length
r=0
if(f!==0){q=a.$flags|0
for(;;){if(!(f!==0&&r<s))break
p=r+1
o=g.x
o===$&&A.d()
f=g.ay=f-1
if(!(f>=0))return A.a(o,f)
o=o[f]
q&2&&A.b(a)
if(!(r<s))return A.a(a,r)
a[r]=o
r=p}}for(f=a.$flags|0;r<s;){n=g.ch=g.i9()
if(n==null)return!1
q=g.dx
if(n===q)return!1
o=g.dy
if(n===o){for(o=g.z,m=0;m<=4095;++m){o.toString
o.$flags&2&&A.b(o)
o[m]=4098}g.db=q+1
q=g.Q+1
g.cy=q
g.cx=B.a.a_(1,q)
g.CW=4098}else{if(n<o){p=r+1
f&2&&A.b(a)
if(!(r>=0))return A.a(a,r)
a[r]=n
r=p}else{q=g.z
q.toString
if(n>>>0!==n||n>=4096)return A.a(q,n)
if(q[n]===4098){l=g.db-2
if(n===l){n=g.CW
k=g.y
k===$&&A.d()
j=g.x
j===$&&A.d()
i=g.ay++
o=g.dE(q,n,o)
j.$flags&2&&A.b(j)
if(!(i>=0&&i<4095))return A.a(j,i)
j[i]=o
k.$flags&2&&A.b(k)
if(!(l>=0&&l<4096))return A.a(k,l)
k[l]=o}else return!1}m=0
for(;;){h=m+1
if(!(m<=4095&&n>g.dy&&n<=4095))break
q=g.x
q===$&&A.d()
o=g.ay++
l=g.y
l===$&&A.d()
if(!(n>=0&&n<4096))return A.a(l,n)
l=l[n]
q.$flags&2&&A.b(q)
if(!(o>=0&&o<4095))return A.a(q,o)
q[o]=l
n=g.z[n]
m=h}if(h>=4095||n>4095)return!1
q=g.x
q===$&&A.d()
o=g.ay
l=g.ay=o+1
q.$flags&2&&A.b(q)
if(!(o>=0&&o<4095))return A.a(q,o)
q[o]=n
o=l
for(;;){if(!(o!==0&&r<s))break
p=r+1
o=g.ay=o-1
if(!(o>=0&&o<4095))return A.a(q,o)
l=q[o]
f&2&&A.b(a)
if(!(r>=0&&r<s))return A.a(a,r)
a[r]=l
r=p}}q=g.CW
if(q!==4098){o=g.z
o.toString
l=g.db-2
if(!(l>=0&&l<4096))return A.a(o,l)
l=o[l]===4098
o=l}else o=!1
if(o){o=g.z
o.toString
l=g.db-2
o.$flags&2&&A.b(o)
if(!(l>=0&&l<4096))return A.a(o,l)
o[l]=q
k=g.ch
j=g.y
i=g.dy
if(k===l){j===$&&A.d()
q=g.dE(o,q,i)
j.$flags&2&&A.b(j)
j[l]=q}else{j===$&&A.d()
k.toString
q=g.dE(o,k,i)
j.$flags&2&&A.b(j)
j[l]=q}}q=g.ch
q.toString
g.CW=q}}return!0},
i9(){var s,r,q,p,o=this
if(o.cy>12)return null
while(s=o.ax,r=o.cy,s<r){s=o.hw()
s.toString
r=o.at
q=o.ax
o.at=(r|B.a.a_(s,q))>>>0
o.ax=q+8}q=o.at
if(!(r>=0&&r<13))return A.a(B.bk,r)
p=B.bk[r]
o.at=B.a.a2(q,r)
o.ax=s-r
s=o.db
if(s<4097){++s
o.db=s
s=s>o.cx&&r<12}else s=!1
if(s){o.cx=o.cx<<1>>>0
o.cy=r+1}return q&p},
dE(a,b,c){var s,r,q=0
for(;;){if(b>c){s=q+1
r=q<=4095
q=s}else r=!1
if(!r)break
if(b>4095)return 4098
a.toString
if(!(b>=0))return A.a(a,b)
b=a[b]}return b},
hw(){var s,r,q=this,p=q.w,o=p[0],n=p.$flags|0
if(o===0){o=q.f.G()
n&2&&A.b(p)
p[0]=o
p=q.w
o=p[0]
if(o===0)return null
B.f.bD(p,1,1+o,q.f.al(o).a4())
p=q.w
s=p[1]
p.$flags&2&&A.b(p)
p[1]=2
p[0]=p[0]-1}else{r=p[1]
n&2&&A.b(p)
p[1]=r+1
if(!(r<256))return A.a(p,r)
s=p[r]
p[0]=o-1}return s}}
A.d7.prototype={
ae(){return"IcoType."+this.b}}
A.fZ.prototype={$iL:1,
gR(){return 0},
gN(){return 0}}
A.h_.prototype={}
A.fY.prototype={
gN(){return B.a.V(A.bt.prototype.gN.call(this),2)},
gcA(){return!(this.d===40&&this.f===32)&&A.bt.prototype.gcA.call(this)}}
A.iG.prototype={
aA(a){var s=A.t(a,!1,null,0)
this.a=s
return this.b=A.n1(s)},
aY(a,b){var s,r,q,p=this
if(p.aA(a)==null)return null
s=p.b.e.length
if(s===1)return p.ak(0)
for(r=null,q=0;q<p.b.e.length;++q){b=p.ak(q)
if(b==null)continue
if(r==null){b.w=B.i
r=b}else r.b5(b)}return r},
ak(b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=null,a9=this.a
if(a9!=null){s=this.b
s=s==null||b0>=s.d}else s=!0
if(s)return a8
s=this.b.e
if(!(b0<s.length))return A.a(s,b0)
r=s[b0]
s=a9.a
a9=a9.b+r.e
q=r.d
p=J.lx(s,a9,a9+q)
o=new A.hz(A.nd())
t.D.a(p)
if(o.br(p))return o.bR(p)
n=A.eD(!1,14)
n.aD(19778)
n.aL(q)
n.aL(0)
n.aL(0)
a9=A.t(p,!1,a8,0)
s=A.mP(A.t(J.a4(B.f.gA(n.c),0,n.a),!1,a8,0))
q=a9.d
m=a9.k()
l=a9.k()
k=$.O()
k.$flags&2&&A.b(k)
k[0]=l
l=$.a9()
if(0>=l.length)return A.a(l,0)
j=l[0]
k[0]=a9.k()
l=l[0]
i=a9.p()
h=a9.p()
g=a9.k()
if(g>=14)A.ad(A.o("Unsupported BMP compression type: "+g))
if(!(g<14))return A.a(B.ah,g)
g=B.ah[g]
a9.k()
k[0]=a9.k()
k[0]=a9.k()
k=a9.k()
a9.k()
f=new A.fY(s,j,l,m,i,h,g,k,q)
f.ea(a9,s)
if(m!==40&&i!==1)return a8
e=k===0&&h<=8?40+4*B.a.S(1,h):40+4*k
s.b=e
n.a-=4
n.aL(e)
d=A.t(p,!1,a8,0)
c=new A.iy(!0)
c.a=d
c.b=f
b=c.ak(0)
if(h>=32)return b
a=32-B.a.Y(j,32)
a0=B.a.V(a===32?j:j+a,8)
for(a9=l<0,s=l===0,l=1/l<0,a1=0;a1<B.a.V(A.bt.prototype.gN.call(f),2);++a1){if(!(s?l:a9))a2=a1
else{q=b.a
q=q==null?a8:q.b
a2=(q==null?0:q)-1-a1}a3=d.am(a0)
d.d=d.d+(a3.c-a3.d)
q=b.a
a4=q==null?a8:q.O(0,a2,a8)
if(a4==null)a4=new A.J()
for(a5=0;a5<j;){a6=J.c(a3.a,a3.d++)
a7=7
for(;;){if(!(a7>-1&&a5<j))break
if((a6&B.a.a_(1,a7))>>>0!==0)a4.sv(0)
a4.D();++a5;--a7}}}return b}}
A.fI.prototype={}
A.bN.prototype={}
A.cc.prototype={}
A.ea.prototype={}
A.l4.prototype={
$5(a,b,c,d,e){return this.a.a5(this.b-a,b,c,d,e)},
$S:4}
A.l5.prototype={
$5(a,b,c,d,e){return this.a.a5(this.b-a,this.c-b,c,d,e)},
$S:4}
A.l6.prototype={
$5(a,b,c,d,e){return this.a.a5(a,this.b-b,c,d,e)},
$S:4}
A.l7.prototype={
$5(a,b,c,d,e){return this.a.a5(b,a,c,d,e)},
$S:4}
A.l8.prototype={
$5(a,b,c,d,e){return this.a.a5(this.b-b,a,c,d,e)},
$S:4}
A.l9.prototype={
$5(a,b,c,d,e){return this.a.a5(this.b-b,this.c-a,c,d,e)},
$S:4}
A.la.prototype={
$5(a,b,c,d,e){return this.a.a5(b,this.b-a,c,d,e)},
$S:4}
A.iR.prototype={}
A.bR.prototype={}
A.iT.prototype={
kr(a){var s,r,q,p,o,n=this,m=A.t(t.L.a(a),!0,null,0)
n.a=m
s=m.cQ(2,0)
if(J.c(s.a,s.d)!==255||J.c(s.a,s.d+1)!==216)return!1
if(n.bE()!==216)return!1
r=n.bE()
q=!1
p=!1
for(;;){if(r!==217){m=n.a
m=m.d<m.c}else m=!1
if(!m)break
o=n.a.p()
if(o<2)break
m=n.a
m.d=m.d+(o-2)
switch(r){case 192:case 193:case 194:q=!0
break
case 218:p=!0
break}r=n.bE()}return q&&p},
k8(a){var s,r,q,p,o,n,m,l=this
l.a=A.t(t.L.a(a),!0,null,0)
if(l.bE()!==216)return null
s=new A.hm()
r=l.bE()
q=!1
p=!1
for(;;){if(r!==217){o=l.a
o=o.d<o.c}else o=!1
if(!o)break
switch(r){case 192:case 193:case 194:n=l.a.p()
if(n<2)A.ad(A.o("Invalid Block"))
o=l.a
a=o.am(n-2)
o.d=o.d+(a.c-a.d)
l.eX(r,a)
q=!0
break
case 218:l.f1()
p=!0
break
default:l.f1()
break}r=l.bE()}o=l.d
if(o!=null){m=o.e
m.toString
s.a=m
o=o.d
o.toString
s.b=o}o=l.d=null
B.c.cs(l.y)
return q&&p?s:o},
c6(a){var s,r,q,p,o,n,m,l,k,j,i,h=this
h.a=A.t(t.L.a(a),!0,null,0)
h.iX()
if(h.y.length!==1)throw A.h(A.o("Only single frame JPEGs supported"))
s=h.d
for(r=s.z,q=s.y,p=h.as,o=0;o<r.length;++o){n=q.m(0,r[o])
m=n.a
l=s.f
k=n.b
j=s.r
i=h.hx(s,n)
if(m===l)m=0
else m=m===1&&l===4?2:1
if(k===j)l=0
else l=k===1&&j===4?2:1
B.c.I(p,new A.fI(i,m,l))}},
iX(){var s,r,q,p,o,n,m=this
if(m.bE()!==216)throw A.h(A.o("Start Of Image marker not found."))
s=m.bE()
for(;;){if(s!==217){r=m.a
r===$&&A.d()
r=r.d<r.c}else r=!1
if(!r)break
r=m.a
r===$&&A.d()
q=r.p()
if(q<2)A.ad(A.o("Invalid Block"))
r=m.a
p=r.am(q-2)
o=r.d=r.d+(p.c-p.d)
switch(s){case 224:case 225:case 226:case 227:case 228:case 229:case 230:case 231:case 232:case 233:case 234:case 235:case 236:case 237:case 238:case 239:case 254:m.iY(s,p)
break
case 219:m.j_(p)
break
case 192:case 193:case 194:m.eX(s,p)
break
case 195:case 197:case 198:case 199:case 200:case 201:case 202:case 203:case 205:case 206:case 207:throw A.h(A.o("Unhandled frame type "+B.a.cH(s,16)))
case 196:m.iZ(p)
break
case 221:m.e=p.p()
break
case 218:m.je(p)
break
case 255:if(J.c(r.a,o)!==255)--m.a.d
break
default:n=!1
if(J.c(r.a,o+-3)===255){r=m.a
if(J.c(r.a,r.d+-2)>=192){r=m.a
r=J.c(r.a,r.d+-2)<=254}else r=n}else r=n
if(r){m.a.d-=3
break}if(s!==0)throw A.h(A.o("Unknown JPEG marker "+B.a.cH(s,16)))
break}s=m.bE()}},
f1(){var s,r=this.a
r===$&&A.d()
s=r.p()
if(s<2)throw A.h(A.o("Invalid Block"))
r=this.a
r.d=r.d+(s-2)},
bE(){var s,r=this,q=r.a
q===$&&A.d()
if(q.d>=q.c)return 0
do{do{s=r.a.G()
if(s!==255){q=r.a
q=q.d<q.c}else q=!1}while(q)
q=r.a
if(q.d>=q.c)return s
do{s=r.a.G()
if(s===255){q=r.a
q=q.d<q.c}else q=!1}while(q)
if(s===0){q=r.a
q=q.d<q.c}else q=!1}while(q)
return s},
j6(a){var s
for(s=0;s<12;++s)if(J.c(a.a,a.d++)!==B.jk[s])return
this.r=new A.d6("ICC_PROFILE",B.av,a.a4())},
j0(a){if(a.k()!==1165519206)return
if(a.p()!==0)return
this.w.c6(a)},
iY(a,b){var s,r,q,p,o,n=this,m=b
if(a===224){s=m
r=!1
if(J.c(s.a,s.d)===74){s=m
if(J.c(s.a,s.d+1)===70){s=m
if(J.c(s.a,s.d+2)===73){s=m
if(J.c(s.a,s.d+3)===70){s=m
s=J.c(s.a,s.d+4)===0}else s=r}else s=r}else s=r}else s=r
if(s){s=new A.iV()
r=m
J.c(r.a,r.d+5)
r=m
J.c(r.a,r.d+6)
r=m
J.c(r.a,r.d+7)
r=m
J.c(r.a,r.d+8)
r=m
J.c(r.a,r.d+9)
r=m
J.c(r.a,r.d+10)
r=m
J.c(r.a,r.d+11)
r=m
r=J.c(r.a,r.d+12)
s.f=r
q=m
q=J.c(q.a,q.d+13)
s.r=q
n.b=s
m.cQ(14+3*r*q,14)}}else if(a===225)n.j0(m)
else if(a===226)n.j6(m)
else if(a===238){s=m
r=!1
if(J.c(s.a,s.d)===65){s=m
if(J.c(s.a,s.d+1)===100){s=m
if(J.c(s.a,s.d+2)===111){s=m
if(J.c(s.a,s.d+3)===98){s=m
if(J.c(s.a,s.d+4)===101){s=m
s=J.c(s.a,s.d+5)===0}else s=r}else s=r}else s=r}else s=r}else s=r
if(s){p=new A.iR()
s=m
J.c(s.a,s.d+6)
s=m
J.c(s.a,s.d+7)
s=m
J.c(s.a,s.d+8)
s=m
J.c(s.a,s.d+9)
s=m
J.c(s.a,s.d+10)
s=m
p.d=J.c(s.a,s.d+11)
n.c=p}}else if(a===254)try{m.kd()}catch(o){}},
j_(a){var s,r,q,p,o,n,m,l,k
for(s=a.c,r=this.x;q=a.d,p=q<s,p;){p=a.a
a.d=q+1
o=J.c(p,q)
n=B.a.j(o,4)
o&=15
if(o>=4)throw A.h(A.o("Invalid number of quantization tables"))
if(r[o]==null)B.c.h(r,o,new Int16Array(64))
m=r[o]
for(q=n!==0,l=0;l<64;++l){k=q?a.p():J.c(a.a,a.d++)
m.toString
p=$.ik()
if(!(l<p.length))return A.a(p,l)
p=p[l]
m.$flags&2&&A.b(m)
if(!(p<64))return A.a(m,p)
m[p]=k}}if(p)throw A.h(A.o("Bad length for DQT block"))},
eX(a,b){var s,r,q,p,o,n,m,l,k,j,i=this
if(i.d!=null)throw A.h(A.o("Duplicate JPG frame data found."))
s=A.H(t.p,t.fg)
r=A.k([],t.t)
q=new A.hl(s,r)
q.b=a===194
q.c=b.G()
q.d=b.p()
q.e=b.p()
p=b.G()
for(o=i.x,n=0;n<p;++n){m=J.c(b.a,b.d++)
l=J.c(b.a,b.d++)
k=B.a.j(l,4)
j=J.c(b.a,b.d++)
B.c.I(r,m)
s.h(0,m,new A.bR(k&15,l&15,o,j))}q.k6()
i.d=q
B.c.I(i.y,q)},
iZ(a){var s,r,q,p,o,n,m,l,k,j,i,h
for(s=a.c,r=this.Q,q=this.z;p=a.d,p<s;){o=a.a
a.d=p+1
n=J.c(o,p)
m=new Uint8Array(16)
for(l=0,k=0;k<16;++k){p=J.c(a.a,a.d++)
if(!(k<16))return A.a(m,k)
m[k]=p
l+=m[k]}j=a.am(l)
a.d=a.d+(j.c-j.d)
i=j.a4()
if((n&16)!==0){n-=16
h=q}else h=r
if(h.length<=n)B.c.su(h,n+1)
B.c.h(h,n,this.iD(m,i))}},
je(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=a.G()
if(b<1||b>4)throw A.h(A.o("Invalid SOS block"))
s=c.d
s.toString
r=A.k([],t.ns)
for(q=c.z,p=c.Q,o=s.y,n=t.hQ,m=0;m<b;++m){l=J.c(a.a,a.d++)
k=J.c(a.a,a.d++)
if(!o.Z(l))throw A.h(A.o("Invalid Component in SOS block"))
j=o.m(0,l)
j.toString
i=B.a.j(k,4)&15
h=k&15
g=p.length
if(i<g){if(!(i<g))return A.a(p,i)
g=p[i]
g.toString
j.w=n.a(g)}g=q.length
if(h<g){if(!(h<g))return A.a(q,h)
g=q[h]
g.toString
j.x=n.a(g)}B.c.I(r,j)}f=a.G()
e=a.G()
d=a.G()
q=B.a.j(d,4)
p=c.a
p===$&&A.d()
q=new A.hn(p,s,r,c.e,f,e,q&15,d&15)
p=s.w
p===$&&A.d()
q.f=p
q.r=s.b
q.bJ()},
iD(a,b){var s,r,q,p,o,n,m,l,k=A.k([],t.kv),j=16
for(;;){if(!(j>0&&a[j-1]===0))break;--j}s=t.er
B.c.I(k,new A.dI(A.K(2,null,!1,s)))
if(0>=k.length)return A.a(k,0)
r=k[0]
for(q=b.length,p=0,o=0;o<j;){for(n=0;n<a[o];++n){if(0>=k.length)return A.a(k,-1)
r=k.pop()
m=r.b
if(!(p>=0&&p<q))return A.a(b,p)
B.c.h(r.a,m,new A.ea(b[p]))
while(m=r.b,m>0){if(0>=k.length)return A.a(k,-1)
r=k.pop()}r.b=m+1
B.c.I(k,r)
for(;k.length<=o;r=l){m=A.K(2,null,!1,s)
l=new A.dI(m)
B.c.I(k,l)
B.c.h(r.a,r.b,new A.cc(m))}++p}++o
if(o<j){m=A.K(2,null,!1,s)
l=new A.dI(m)
B.c.I(k,l)
B.c.h(r.a,r.b,new A.cc(m))
r=l}}if(0>=k.length)return A.a(k,0)
return k[0].a},
hx(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=a1.e
a===$&&A.d()
s=a1.f
s===$&&A.d()
r=a<<3>>>0
q=new Int32Array(64)
p=new Uint8Array(64)
o=s*8
n=A.K(o,null,!1,t.nh)
for(m=a1.c,l=a1.d,k=0,j=0;j<s;++j){i=j<<3>>>0
for(h=0;h<8;++h,k=g){g=k+1
B.c.h(n,k,new Uint8Array(r))}for(f=0;f<a;++f){if(!(l>=0&&l<4))return A.a(m,l)
e=m[l]
e.toString
d=a1.r
d===$&&A.d()
if(!(j<d.length))return A.a(d,j)
d=d[j]
if(!(f<d.length))return A.a(d,f)
A.u5(e,d[f],p,q)
c=f<<3>>>0
for(e=c+8,b=0;b<8;++b){d=i+b
if(!(d<o))return A.a(n,d)
d=n[d]
if(d!=null)B.f.aq(d,c,e,p,b<<3>>>0)}}}return n}}
A.dI.prototype={}
A.hl.prototype={
k6(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this
for(s=a.y,r=A.m(s).l("U<1>"),q=new A.U(s,s.r,s.e,r);q.D();){p=s.m(0,q.d)
a.f=Math.max(a.f,p.a)
a.r=Math.max(a.r,p.b)}q=a.e
q.toString
a.w=B.b.b6(q/8/a.f)
q=a.d
q.toString
a.x=B.b.b6(q/8/a.r)
for(r=new A.U(s,s.r,s.e,r),q=t.n5,o=t.bW,n=t.kn;r.D();){m=s.m(0,r.d)
m.toString
l=a.e
l.toString
k=m.a
j=B.b.b6(B.b.b6(l/8)*k/a.f)
l=a.d
l.toString
i=m.b
h=B.b.b6(B.b.b6(l/8)*i/a.r)
g=a.w*k
f=a.x*i
e=J.ar(f,n)
for(d=0;d<f;++d){c=J.ar(g,o)
for(b=0;b<g;++b)c[b]=new Int32Array(64)
e[d]=c}m.e=j
m.f=h
m.r=q.a(e)}}}
A.hm.prototype={$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.iV.prototype={}
A.hn.prototype={
bJ(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=b.y,a0=a.length,a1=b.r
a1.toString
if(a1)if(b.Q===0)s=b.at===0?b.ghW():b.ghY()
else s=b.at===0?b.ghN():b.ghP()
else s=b.ghT()
a1=a0===1
if(a1){if(0>=a0)return A.a(a,0)
r=a[0]
q=r.e
q===$&&A.d()
r=r.f
r===$&&A.d()
p=q*r}else{r=b.f
r===$&&A.d()
q=b.b.x
q===$&&A.d()
p=r*q}r=b.z
if(r==null||r===0)b.z=p
for(r=b.a,q=t.mX,o=0;o<p;){for(n=0;n<a0;++n){if(!(n<a.length))return A.a(a,n)
a[n].y=0}b.CW=0
if(a1){if(0>=a.length)return A.a(a,0)
m=a[0]
l=0
for(;;){k=b.z
k.toString
if(!(l<k))break
q.a(s)
k=m.e
k===$&&A.d()
j=B.a.an(o,k)
i=B.a.Y(o,k)
k=m.r
k===$&&A.d()
if(!(j>=0&&j<k.length))return A.a(k,j)
k=k[j]
if(!(i>=0&&i<k.length))return A.a(k,i)
s.$2(m,k[i]);++o;++l}}else{l=0
for(;;){k=b.z
k.toString
if(!(l<k))break
for(n=0;n<a0;++n){if(!(n<a.length))return A.a(a,n)
m=a[n]
h=m.a
g=m.b
for(f=0;f<g;++f)for(e=0;e<h;++e)b.i0(m,s,o,f,e)}++o;++l}}b.ch=0
if(o>=p)break
d=J.c(r.a,r.d)
c=J.c(r.a,r.d+1)
if(d===255)if(c>=208&&c<=215)r.d+=2
else break}},
c0(){var s,r=this,q=r.ch
if(q>0){--q
r.ch=q
return B.a.bw(r.ay,q)&1}q=r.a
if(q.d>=q.c)return null
s=q.G()
r.ay=s
if(s===255)if(q.G()!==0)return null
r.ch=7
return B.a.j(r.ay,7)&1},
cp(a){var s,r,q=new A.cc(t.hQ.a(a))
while(s=this.c0(),s!=null){if(q instanceof A.cc){r=q.a
if(s>>>0!==s||s>=2)return A.a(r,s)
q=r[s]}if(q instanceof A.ea)return q.a}return null},
dL(a){var s,r
for(s=0;a>0;){r=this.c0()
if(r==null)return null
s=(s<<1|r)>>>0;--a}return s},
cr(a){var s
if(a==null)return 0
if(a===1)return this.c0()===1?1:-1
s=this.dL(a)
if(s==null)return 0
if(s>=B.a.a_(1,a-1))return s
return s+B.a.S(-1,a)+1},
hU(a,b){var s,r,q,p,o,n,m,l,k=this
t.L.a(b)
s=a.w
s===$&&A.d()
r=k.cp(s)
q=r===0?0:k.cr(r)
s=a.y
s===$&&A.d()
s+=q
a.y=s
b.$flags&2&&A.b(b)
b[0]=s
for(p=1;p<64;){s=a.x
s===$&&A.d()
o=k.cp(s)
if(o==null)break
n=o&15
m=o>>>4
if(n===0){if(m<15)break
p+=16
continue}p+=m
n=k.cr(n)
s=$.ik()
if(!(p>=0&&p<s.length))return A.a(s,p)
l=s[p]
b.$flags&2&&A.b(b)
if(!(l<64))return A.a(b,l)
b[l]=n;++p}},
hX(a,b){var s,r,q
t.L.a(b)
s=a.w
s===$&&A.d()
r=this.cp(s)
q=r===0?0:B.a.S(this.cr(r),this.ax)
s=a.y
s===$&&A.d()
s+=q
a.y=s
b.$flags&2&&A.b(b)
b[0]=s},
hZ(a,b){var s,r
t.L.a(b)
s=b[0]
r=this.c0()
r.toString
r=B.a.S(r,this.ax)
b.$flags&2&&A.b(b)
b[0]=(s|r)>>>0},
hO(a,b){var s,r,q,p,o,n,m,l,k=this
t.L.a(b)
s=k.CW
if(s>0){k.CW=s-1
return}r=k.Q
q=k.as
for(s=k.ax;r<=q;){p=a.x
p===$&&A.d()
p=k.cp(p)
p.toString
o=p&15
n=p>>>4
if(o===0){if(n<15){s=k.dL(n)
s.toString
k.CW=s+B.a.S(1,n)-1
break}r+=16
continue}r+=n
p=$.ik()
if(!(r>=0&&r<p.length))return A.a(p,r)
m=p[r]
p=k.cr(o)
l=B.a.S(1,s)
b.$flags&2&&A.b(b)
if(!(m<64))return A.a(b,m)
b[m]=p*l;++r}},
hQ(a,b){var s,r,q,p,o,n,m,l,k,j=this
t.L.a(b)
s=j.Q
r=j.as
A:for(q=j.ax,p=0;s<=r;){o=$.ik()
if(!(s>=0&&s<o.length))return A.a(o,s)
n=o[s]
o=j.cx
switch(o){case 0:o=a.x
o===$&&A.d()
m=j.cp(o)
if(m==null)throw A.h(A.o("Invalid progressive encoding"))
l=m&15
p=m>>>4
if(l===0)if(p<15){o=j.dL(p)
o.toString
j.CW=o+B.a.S(1,p)
j.cx=4}else{j.cx=1
p=16}else{if(l!==1)throw A.h(A.o("invalid ACn encoding"))
j.cy=j.cr(l)
j.cx=p!==0?2:3}continue A
case 1:case 2:if(!(n<64))return A.a(b,n)
k=b[n]
if(k!==0){o=j.c0()
o.toString
o=B.a.S(o,q)
b.$flags&2&&A.b(b)
if(!(n<64))return A.a(b,n)
b[n]=k+o}else{--p
if(p===0)j.cx=o===2?3:0}break
case 3:if(!(n<64))return A.a(b,n)
o=b[n]
if(o!==0){k=j.c0()
k.toString
k=B.a.S(k,q)
b.$flags&2&&A.b(b)
if(!(n<64))return A.a(b,n)
b[n]=o+k}else{o=j.cy
o===$&&A.d()
o=B.a.S(o,q)
b.$flags&2&&A.b(b)
if(!(n<64))return A.a(b,n)
b[n]=o
j.cx=0}break
case 4:if(!(n<64))return A.a(b,n)
o=b[n]
if(o!==0){k=j.c0()
k.toString
k=B.a.S(k,q)
b.$flags&2&&A.b(b)
if(!(n<64))return A.a(b,n)
b[n]=o+k}break}++s}if(j.cx===4)if(--j.CW===0)j.cx=0},
i0(a,b,c,d,e){var s,r,q,p,o
t.mX.a(b)
s=this.f
s===$&&A.d()
r=B.a.an(c,s)*a.b+d
q=B.a.Y(c,s)*a.a+e
s=a.r
s===$&&A.d()
p=s.length
if(r>=p)return
if(!(r>=0))return A.a(s,r)
s=s[r]
o=s.length
if(q>=o)return
if(!(q>=0))return A.a(s,q)
b.$2(a,s[q])}}
A.hj.prototype={
br(a){var s=a.length,r=!0
if(s>=2){if(0>=s)return A.a(a,0)
if(a[0]===255){if(1>=s)return A.a(a,1)
s=a[1]!==216}else s=r}else s=r
if(s)return!1
return A.lK().kr(a)},
aA(a){A.t(a,!0,null,0)
return A.lK().k8(a)},
aY(a,b){var s=A.lK()
s.c6(a)
if(s.y.length!==1)throw A.h(A.o("only single frame JPEGs supported"))
return A.tO(s)},
bR(a){return this.aY(a,null)}}
A.iS.prototype={
ae(){return"JpegChroma."+this.b}}
A.iU.prototype={
fW(a){a=B.a.i(B.a.K(a,1,100))
if(this.at===a)return
this.iy(a<50?B.b.bq(5000/a):B.a.bq(200-a*2))
this.at=a},
cv(b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2=this,b3=A.eD(!0,8192)
b2.bH(b3,216)
b2.bH(b3,224)
b3.aD(16)
b3.C(74)
b3.C(70)
b3.C(73)
b3.C(70)
b3.C(0)
b3.C(1)
b3.C(1)
b3.C(0)
b3.aD(1)
b3.aD(1)
b3.C(0)
b3.C(0)
b2.js(b3,b4.gbK())
s=b4.c
if(s!=null){b2.bH(b3,226)
r=s.jJ()
q=A.k([73,67,67,95,80,82,79,70,73,76,69,0],t.t)
b3.aD(14+r.length)
b3.aZ(q)
b3.aZ(r)}b2.jr(b3)
s=b4.gR()
p=b4.gN()
b2.bH(b3,192)
b3.aD(17)
b3.C(8)
b3.aD(p)
b3.aD(s)
b3.C(3)
b3.C(1)
s=b5===B.P
b3.C(s?17:34)
b3.C(0)
b3.C(2)
b3.C(17)
b3.C(1)
b3.C(3)
b3.C(17)
b3.C(1)
b2.jq(b3)
b2.bH(b3,218)
b3.aD(12)
b3.C(3)
b3.C(1)
b3.C(0)
b3.C(2)
b3.C(17)
b3.C(3)
b3.C(17)
b3.C(0)
b3.C(63)
b3.C(0)
b2.ax=0
b2.ay=7
o=b4.gR()
n=b4.gN()
if(s){m=new Float32Array(64)
l=new Float32Array(64)
k=new Float32Array(64)
for(s=b2.c,p=b2.d,j=0,i=0,h=0,g=0;g<n;g+=8)for(f=0;f<o;f+=8){b2.cj(b4,f,g,o,n,m,l,k,B.X)
e=b2.e
d=b2.r
d===$&&A.d()
j=b2.bF(b3,m,s,j,e,d)
d=b2.f
e=b2.w
e===$&&A.d()
i=b2.bF(b3,l,p,i,d,e)
h=b2.bF(b3,k,p,h,b2.f,b2.w)}}else{s=t.pk
m=J.bQ(4,s)
for(c=0;c<4;++c)m[c]=new Float32Array(64)
l=J.bQ(4,s)
for(c=0;c<4;++c)l[c]=new Float32Array(64)
k=J.bQ(4,s)
for(c=0;c<4;++c)k[c]=new Float32Array(64)
b=new Float32Array(64)
a=new Float32Array(64)
for(s=b2.c,p=b2.d,j=0,i=0,h=0,g=0;g<n;g+=16)for(e=g+8,f=0;f<o;f+=16){d=m[0]
a0=l[0]
a1=k[0]
b2.cj(b4,f,g,o,n,d,a0,a1,B.X)
a2=f+8
a3=m[1]
a4=l[1]
a5=k[1]
b2.cj(b4,a2,g,o,n,a3,a4,a5,B.X)
a6=m[2]
a7=l[2]
a8=k[2]
b2.cj(b4,f,e,o,n,a6,a7,a8,B.X)
a9=m[3]
b0=l[3]
b1=k[3]
b2.cj(b4,a2,e,o,n,a9,b0,b1,B.X)
b2.eB(b,a0,a4,a7,b0)
b2.eB(a,a1,a5,a8,b1)
b1=b2.e
a8=b2.r
a8===$&&A.d()
j=b2.bF(b3,a9,s,b2.bF(b3,a6,s,b2.bF(b3,a3,s,b2.bF(b3,d,s,j,b1,a8),b2.e,b2.r),b2.e,b2.r),b2.e,b2.r)
a8=b2.f
b1=b2.w
b1===$&&A.d()
i=b2.bF(b3,b,p,i,a8,b1)
h=b2.bF(b3,a,p,h,b2.f,b2.w)}}s=b2.ay
if(s>=0){++s
b2.bG(b3,A.k([B.a.a_(1,s)-1,s],t.t))}b2.bH(b3,217)
return J.a4(B.f.gA(b3.c),0,b3.a)},
cj(a,b,c,d,a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
for(s=this.as,r=c+1,q=0;q<64;++q){p=q>>>3
o=c+p
n=b+(q&7)
if(o>=a0)o-=r+p-a0
if(n>=d)n-=n-d+1
m=a.a
l=m==null?null:m.O(n,o,null)
if(l==null)l=new A.J()
if(l.gM()!==B.e)l=l.b7(B.e)
if(l.gu(l)>3){k=l.gX()
j=1-k
l.sn(B.b.ap(l.gn()*k+a4.m(0,0)*j))
l.st(B.b.ap(l.gt()*k+a4.m(0,1)*j))
l.sq(B.b.ap(l.gq()*k+a4.m(0,2)*j))}i=B.b.i(l.gn())
h=B.b.i(l.gt())
g=B.b.i(l.gq())
if(!(i>=0&&i<2048))return A.a(s,i)
m=s[i]
f=h+256
if(!(f>=0&&f<2048))return A.a(s,f)
f=s[f]
e=g+512
if(!(e>=0&&e<2048))return A.a(s,e)
e=B.a.j(m+f+s[e],16)
a1.$flags&2&&A.b(a1)
if(!(q<64))return A.a(a1,q)
a1[q]=e-128
e=i+768
if(!(e<2048))return A.a(s,e)
e=s[e]
f=h+1024
if(!(f>=0&&f<2048))return A.a(s,f)
f=s[f]
m=g+1280
if(!(m>=0&&m<2048))return A.a(s,m)
m=B.a.j(e+f+s[m],16)
a2.$flags&2&&A.b(a2)
if(!(q<64))return A.a(a2,q)
a2[q]=m-128
m=i+1280
if(!(m<2048))return A.a(s,m)
m=s[m]
f=h+1536
if(!(f>=0&&f<2048))return A.a(s,f)
f=s[f]
e=g+1792
if(!(e>=0&&e<2048))return A.a(s,e)
e=B.a.j(m+f+s[e],16)
a3.$flags&2&&A.b(a3)
if(!(q<64))return A.a(a3,q)
a3[q]=e-128}},
eB(a,b,c,d,e){var s,r,q,p,o,n,m,l
for(s=a.$flags|0,r=0;r<64;++r){if(r<32)q=B.a.Y(r,8)<4?b:c
else q=B.a.Y(r,8)<4?d:e
p=(B.a.V(B.a.Y(r,32),8)<<4>>>0)+(B.a.Y(r,4)<<1>>>0)
if(!(p<64))return A.a(q,p)
o=q[p]
n=p+1
if(!(n<64))return A.a(q,n)
n=q[n]
m=p+8
if(!(m<64))return A.a(q,m)
m=q[m]
l=p+9
if(!(l<64))return A.a(q,l)
l=q[l]
s&2&&A.b(a)
if(!(r<64))return A.a(a,r)
a[r]=(o+n+m+l)/4}},
bH(a,b){a.C(255)
a.C(b&255)},
iy(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this
for(s=b.a,r=s.$flags|0,q=0;q<64;++q){p=B.b.bq((B.hU[q]*a+50)/100)
if(p<1)p=1
else if(p>255)p=255
o=B.Y[q]
r&2&&A.b(s)
if(!(o<64))return A.a(s,o)
s[o]=p}for(r=b.b,o=r.$flags|0,n=0;n<64;++n){m=B.b.bq((B.eh[n]*a+50)/100)
if(m<1)m=1
else if(m>255)m=255
l=B.Y[n]
o&2&&A.b(r)
if(!(l<64))return A.a(r,l)
r[l]=m}for(o=b.c,l=o.$flags|0,k=b.d,j=k.$flags|0,i=0,h=0;h<8;++h)for(g=0;g<8;++g){if(!(i>=0&&i<64))return A.a(B.Y,i)
f=B.Y[i]
if(!(f<64))return A.a(s,f)
e=s[f]
d=B.bj[h]
c=B.bj[g]
l&2&&A.b(o)
o[i]=1/(e*d*c*8)
f=r[f]
j&2&&A.b(k)
k[i]=1/(f*d*c*8);++i}},
cU(a,b){var s,r,q,p,o,n,m,l=t.L
l.a(a)
l.a(b)
l=t.t
s=A.k([A.k([],l)],t.iZ)
for(r=b.length,q=0,p=0,o=1;o<=16;++o){for(n=1;n<=a[o];++n){if(!(p>=0&&p<r))return A.a(b,p)
m=b[p]
if(s.length<=m)B.c.su(s,m+1)
B.c.h(s,m,A.k([q,o],l));++p;++q}q*=2}return s},
iw(){var s,r,q,p,o,n,m,l,k,j,i
for(s=this.y,r=this.x,q=t.t,p=1,o=2,n=1;n<=15;++n){for(m=p;m<o;++m){l=32767+m
B.c.h(s,l,n)
B.c.h(r,l,A.k([m,n],q))}for(l=o-1,k=-l,j=-p;k<=j;++k){i=32767+k
B.c.h(s,i,n)
B.c.h(r,i,A.k([l+k,n],q))}p=p<<1>>>0
o=o<<1>>>0}},
iz(){var s,r,q
for(s=this.as,r=s.$flags|0,q=0;q<256;++q){r&2&&A.b(s)
s[q]=19595*q
s[q+256]=38470*q
s[q+512]=7471*q+32768
s[q+768]=-11059*q
s[q+1024]=-21709*q
s[q+1280]=32768*q+8421375
s[q+1536]=-27439*q
s[q+1792]=-5329*q}},
il(d6,d7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5=t.H
d5.a(d6)
d5.a(d7)
for(d5=d6.$flags|0,s=0,r=0;r<8;++r){if(!(s<64))return A.a(d6,s)
q=d6[s]
p=s+1
if(!(p<64))return A.a(d6,p)
o=d6[p]
n=s+2
if(!(n<64))return A.a(d6,n)
m=d6[n]
l=s+3
if(!(l<64))return A.a(d6,l)
k=d6[l]
j=s+4
if(!(j<64))return A.a(d6,j)
i=d6[j]
h=s+5
if(!(h<64))return A.a(d6,h)
g=d6[h]
f=s+6
if(!(f<64))return A.a(d6,f)
e=d6[f]
d=s+7
if(!(d<64))return A.a(d6,d)
c=d6[d]
b=q+c
a=q-c
a0=o+e
a1=o-e
a2=m+g
a3=m-g
a4=k+i
a5=b+a4
a6=b-a4
a7=a0+a2
d5&2&&A.b(d6)
if(!(s<64))return A.a(d6,s)
d6[s]=a5+a7
if(!(j<64))return A.a(d6,j)
d6[j]=a5-a7
a8=(a0-a2+a6)*0.707106781
if(!(n<64))return A.a(d6,n)
d6[n]=a6+a8
if(!(f<64))return A.a(d6,f)
d6[f]=a6-a8
a5=k-i+a3
a9=a1+a
b0=(a5-a9)*0.382683433
b1=0.5411961*a5+b0
b2=1.306562965*a9+b0
b3=(a3+a1)*0.707106781
b4=a+b3
b5=a-b3
if(!(h<64))return A.a(d6,h)
d6[h]=b5+b1
if(!(l<64))return A.a(d6,l)
d6[l]=b5-b1
if(!(p<64))return A.a(d6,p)
d6[p]=b4+b2
if(!(d<64))return A.a(d6,d)
d6[d]=b4-b2
s+=8}for(s=0,r=0;r<8;++r){if(!(s<64))return A.a(d6,s)
q=d6[s]
p=s+8
if(!(p<64))return A.a(d6,p)
o=d6[p]
n=s+16
if(!(n<64))return A.a(d6,n)
m=d6[n]
l=s+24
if(!(l<64))return A.a(d6,l)
k=d6[l]
j=s+32
if(!(j<64))return A.a(d6,j)
i=d6[j]
h=s+40
if(!(h<64))return A.a(d6,h)
g=d6[h]
f=s+48
if(!(f<64))return A.a(d6,f)
e=d6[f]
d=s+56
if(!(d<64))return A.a(d6,d)
c=d6[d]
b6=q+c
b7=q-c
b8=o+e
b9=o-e
c0=m+g
c1=m-g
c2=k+i
c3=b6+c2
c4=b6-c2
c5=b8+c0
d5&2&&A.b(d6)
if(!(s<64))return A.a(d6,s)
d6[s]=c3+c5
if(!(j<64))return A.a(d6,j)
d6[j]=c3-c5
c6=(b8-c0+c4)*0.707106781
if(!(n<64))return A.a(d6,n)
d6[n]=c4+c6
if(!(f<64))return A.a(d6,f)
d6[f]=c4-c6
c3=k-i+c1
c7=b9+b7
c8=(c3-c7)*0.382683433
c9=0.5411961*c3+c8
d0=1.306562965*c7+c8
d1=(c1+b9)*0.707106781
d2=b7+d1
d3=b7-d1
if(!(h<64))return A.a(d6,h)
d6[h]=d3+c9
if(!(l<64))return A.a(d6,l)
d6[l]=d3-c9
if(!(p<64))return A.a(d6,p)
d6[p]=d2+d0
if(!(d<64))return A.a(d6,d)
d6[d]=d2-d0;++s}for(d5=this.z,r=0;r<64;++r){d4=d6[r]*d7[r]
B.c.h(d5,r,d4>0?B.b.i(d4+0.5):B.b.i(d4-0.5))}return d5},
js(a,b){var s,r
if(b.gah(0))return
s=A.eD(!1,8192)
b.aP(s)
r=J.a4(B.f.gA(s.c),0,s.a)
this.bH(a,225)
a.aD(r.length+8)
a.aL(1165519206)
a.aD(0)
a.aZ(r)},
jr(a){var s,r,q
this.bH(a,219)
a.aD(132)
a.C(0)
for(s=this.a,r=0;r<64;++r)a.C(s[r])
a.C(1)
for(s=this.b,q=0;q<64;++q)a.C(s[q])},
jq(a){var s,r,q,p,o,n,m,l
this.bH(a,196)
a.aD(418)
a.C(0)
for(s=0;s<16;){++s
a.C(B.bX[s])}for(r=0;r<=11;++r)a.C(B.a8[r])
a.C(16)
for(q=0;q<16;){++q
a.C(B.bc[q])}for(p=0;p<=161;++p)a.C(B.bl[p])
a.C(1)
for(o=0;o<16;){++o
a.C(B.bx[o])}for(n=0;n<=11;++n)a.C(B.a8[n])
a.C(17)
for(m=0;m<16;){++m
a.C(B.bq[m])}for(l=0;l<=161;++l)a.C(B.bG[l])},
bF(a,a0,a1,a2,a3,a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=this,b=t.H
b.a(a0)
b.a(a1)
t.ia.a(a3)
t.nx.a(a4)
b=a4.length
if(0>=b)return A.a(a4,0)
s=a4[0]
if(240>=b)return A.a(a4,240)
r=a4[240]
q=c.il(a0,a1)
for(b=c.Q,p=0;p<64;++p)B.c.h(b,B.Y[p],q[p])
o=b[0]
o.toString
n=o-a2
if(n===0){if(0>=a3.length)return A.a(a3,0)
m=a3[0]
m.toString
c.bG(a,m)}else{l=32767+n
a3.toString
m=c.y
if(!(l>=0&&l<65535))return A.a(m,l)
m=m[l]
m.toString
if(!(m<a3.length))return A.a(a3,m)
m=a3[m]
m.toString
c.bG(a,m)
m=c.x[l]
m.toString
c.bG(a,m)}k=63
for(;;){if(!(k>0&&b[k]===0))break;--k}if(k===0){s.toString
c.bG(a,s)
return o}for(m=c.y,j=c.x,i=1;i<=k;){h=i
for(;;){if(!(h>=0&&h<64))return A.a(b,h)
if(!(b[h]===0&&h<=k))break;++h}g=h-i
if(g>=16){f=B.a.j(g,4)
for(e=1;e<=f;++e){r.toString
c.bG(a,r)}g&=15}d=b[h]
d.toString
l=32767+d
if(!(l>=0&&l<65535))return A.a(m,l)
d=m[l]
d.toString
d=(g<<4>>>0)+d
if(!(d<a4.length))return A.a(a4,d)
d=a4[d]
d.toString
c.bG(a,d)
d=j[l]
d.toString
c.bG(a,d)
i=h+1}if(k!==63){s.toString
c.bG(a,s)}return o},
bG(a,b){var s,r,q,p=this
t.L.a(b)
s=b.length
if(0>=s)return A.a(b,0)
r=b[0]
if(1>=s)return A.a(b,1)
q=b[1]-1
while(q>=0){if((r&B.a.a_(1,q))>>>0!==0)p.ax=(p.ax|B.a.a_(1,p.ay))>>>0;--q
if(--p.ay<0){s=p.ax
if(s===255){a.C(255)
a.C(0)}else a.C(s)
p.ay=7
p.ax=0}}}}
A.dq.prototype={
ae(){return"PngDisposeMode."+this.b}}
A.eP.prototype={
ae(){return"PngBlendMode."+this.b}}
A.eQ.prototype={}
A.hb.prototype={}
A.bU.prototype={
ae(){return"PngFilterType."+this.b}}
A.hA.prototype={
sT(a){this.w=t.gy.a(a)},
sko(a){this.x=t.T.a(a)},
$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.hc.prototype={}
A.hz.prototype={
br(a){var s,r=A.t(a,!0,null,0).al(8)
for(s=0;s<8;++s)if(J.c(r.a,r.d+s)!==B.bM[s])return!1
return!0},
aA(b7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this,b5=null,b6=A.t(b7,!0,b5,0)
b4.d=b6
s=b6.al(8)
for(r=0;r<8;++r)if(J.c(s.a,s.d+r)!==B.bM[r])return b5
for(b6=b4.a,q=b6.cy,p=t.t,o=b6.db,n=t.L,m=b6.ax;;){l=b4.d
k=l.d-l.b
j=l.k()
i=b4.d.ag(4)
switch(i){case"tEXt":l=b4.d
h=l.am(j)
l.d=l.d+(h.c-h.d)
g=h.a4()
f=g.length
for(r=0;r<f;++r)if(g[r]===0){l=r+1
m.h(0,B.aT.bR(new Uint8Array(g.subarray(0,A.bh(0,r,f)))),B.aT.bR(new Uint8Array(g.subarray(l,A.bh(l,b5,f)))))
break}b4.d.d+=4
break
case"pHYs":l=b4.d
h=l.am(j)
l.d=l.d+(h.c-h.d)
e=A.p(h,b5,0)
e.k()
e.k()
J.c(e.a,e.d++)
b4.d.d+=4
break
case"IHDR":l=b4.d
h=l.am(j)
l.d=l.d+(h.c-h.d)
d=A.p(h,b5,0)
c=d.a4()
b6.a=d.k()
b6.b=d.k()
b6.c=J.c(d.a,d.d++)
b6.d=J.c(d.a,d.d++)
J.c(d.a,d.d++)
b6.f=J.c(d.a,d.d++)
b6.r=J.c(d.a,d.d++)
l=b6.d
if(!(l===0||l===2||l===3||l===4||l===6))return b5
if(b6.f!==0)return b5
switch(l){case 0:if(!B.c.aI(A.k([1,2,4,8,16],p),b6.c))return b5
break
case 2:if(!B.c.aI(A.k([8,16],p),b6.c))return b5
break
case 3:if(!B.c.aI(A.k([1,2,4,8],p),b6.c))return b5
break
case 4:if(!B.c.aI(A.k([8,16],p),b6.c))return b5
break
case 6:if(!B.c.aI(A.k([8,16],p),b6.c))return b5
break}if(b4.d.k()!==A.cL(n.a(c),A.cL(new A.b4(i),0)))throw A.h(A.o("Invalid "+i+" checksum"))
break
case"PLTE":l=b4.d
h=l.am(j)
l.d=l.d+(h.c-h.d)
b6.sT(h.a4())
if(b4.d.k()!==A.cL(n.a(n.a(b6.w)),A.cL(new A.b4(i),0)))throw A.h(A.o("Invalid "+i+" checksum"))
break
case"tRNS":l=b4.d
h=l.am(j)
l.d=l.d+(h.c-h.d)
b6.sko(h.a4())
b=b4.d.k()
l=b6.x
l.toString
if(b!==A.cL(n.a(l),A.cL(new A.b4(i),0)))throw A.h(A.o("Invalid "+i+" checksum"))
break
case"IEND":b4.d.d+=4
break
case"gAMA":if(j!==4)throw A.h(A.o("Invalid gAMA chunk"))
b4.d.k()
b4.d.d+=4
break
case"IDAT":B.c.I(o,k)
l=b4.d
l.d=(l.d+=j)+4
break
case"acTL":b6.CW=b4.d.k()
b4.d.k()
b4.d.d+=4
break
case"fcTL":b4.d.k()
a=b4.d.k()
a0=b4.d.k()
a1=b4.d.k()
a2=b4.d.k()
a3=b4.d.p()
a4=b4.d.p()
l=b4.d
a5=J.c(l.a,l.d++)
l=b4.d
a6=J.c(l.a,l.d++)
if(!(a5>=0&&a5<3))return A.a(B.bb,a5)
l=B.bb[a5]
if(!(a6>=0&&a6<2))return A.a(B.by,a6)
a7=B.by[a6]
B.c.I(q,new A.hb(A.k([],p),a,a0,a1,a2,a3,a4,l,a7))
b4.d.d+=4
break
case"fdAT":b4.d.k()
B.c.I(B.c.gdY(q).y,k)
l=b4.d
l.d=(l.d+=j-4)+4
break
case"bKGD":l=b6.d
if(l===3){l=b4.d
a8=J.c(l.a,l.d++);--j
a9=a8*3
l=b6.w
a7=l.length
if(!(a9>=0&&a9<a7))return A.a(l,a9)
b0=l[a9]
b1=a9+1
if(!(b1<a7))return A.a(l,b1)
b2=l[b1]
b1=a9+2
if(!(b1<a7))return A.a(l,b1)
b3=l[b1]
l=b6.x
if(l!=null){l=B.f.aI(l,a8)?0:255
a7=new Uint8Array(4)
a7[0]=b0
a7[1]=b2
a7[2]=b3
a7[3]=l
b6.z=new A.cY(a7)}else{l=new Uint8Array(3)
l[0]=b0
l[1]=b2
l[2]=b3
b6.z=new A.fH(l)}}else if(l===0||l===4){b4.d.p()
j-=2}else if(l===2||l===6){l=b4.d
l.p()
l.p()
l.p()
j-=24}if(j>0)b4.d.d+=j
b4.d.d+=4
break
case"iCCP":b6.Q=b4.d.cF()
l=b4.d
J.c(l.a,l.d++)
l=b6.Q
a7=b4.d
h=a7.am(j-(l.length+2))
a7.d=a7.d+(h.c-h.d)
b6.at=h.a4()
b4.d.d+=4
break
case"cICP":l=b4.d
a7=l.d
if(j===4){b1=l.a
l.d=a7+1
J.c(b1,a7)
a7=b4.d
J.c(a7.a,a7.d++)
a7=b4.d
J.c(a7.a,a7.d++)
a7=b4.d
J.c(a7.a,a7.d++)}else l.d=a7+j
b4.d.d+=4
break
default:l=b4.d
l.d=(l.d+=j)+4
break}if(i==="IEND")break
l=b4.d
if(l.d>=l.c)return b5}return b6},
ak(c3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5=this,b6=null,b7=null,b8=b5.a,b9=b8.a,c0=b8.b,c1=b8.cy,c2=c1.length
if(c2===0||c3===0){r=A.k([],t.bs)
c1=b8.db
q=c1.length
for(c2=t.L,p=0,o=0;o<q;++o){n=b5.d
n===$&&A.d()
if(!(o<c1.length))return A.a(c1,o)
n.d=c1[o]
m=n.k()
l=b5.d.ag(4)
n=b5.d
k=n.am(m)
n.d=n.d+(k.c-k.d)
j=k.a4()
p+=j.length
B.c.I(r,j)
if(b5.d.k()!==A.cL(c2.a(j),A.cL(new A.b4(l),0)))throw A.h(A.o("Invalid "+l+" checksum"))}b7=new Uint8Array(p)
for(c1=r.length,i=0,h=0;h<r.length;r.length===c1||(0,A.V)(r),++h){j=r[h]
J.mN(b7,i,j)
i+=j.length}}else{if(c3>=c2)throw A.h(A.o("Invalid Frame Number: "+c3))
if(!(c3<c2))return A.a(c1,c3)
g=c1[c3]
b9=g.b
c0=g.c
r=A.k([],t.bs)
for(c1=g.y,p=0,o=0;o<c1.length;++o){c2=b5.d
c2===$&&A.d()
c2.d=c1[o]
m=c2.k()
c2=b5.d
c2.ag(4)
c2.d+=4
c2=b5.d
k=c2.am(m-4)
c2.d=c2.d+(k.c-k.d)
j=k.a4()
p+=j.length
B.c.I(r,j)}b7=new Uint8Array(p)
for(c1=r.length,i=0,h=0;h<r.length;r.length===c1||(0,A.V)(r),++h){j=r[h]
J.mN(b7,i,j)
i+=j.length}}c1=b8.d
f=1
if(!(c1===3))if(!(c1===0)){if(c1===4)c1=2
else c1=c1===6?4:3
f=c1}s=null
try{s=B.D.bS(b7)}catch(e){return b6}d=A.t(s,!0,b6,0)
b5.c=b5.b=0
c=b6
if(b8.d===3){c1=b8.w
if(c1!=null){c2=c1.length
b=c2/3|0
a=b8.x
n=a!=null
a0=n?a.length:0
a1=n?4:3
c=new A.ba(new Uint8Array(b*a1),b,a1)
for(n=a1===4,o=0,a2=0;o<b;++o,a2+=3){if(n&&o<a0){if(!(o<a.length))return A.a(a,o)
a3=a[o]}else a3=255
if(!(a2<c2))return A.a(c1,a2)
a4=c1[a2]
a5=a2+1
if(!(a5<c2))return A.a(c1,a5)
a5=c1[a5]
a6=a2+2
if(!(a6<c2))return A.a(c1,a6)
c.cP(o,a4,a5,c1[a6],a3)}}}if(b8.d===0&&b8.x!=null&&c==null&&b8.c<=8){a=b8.x
a7=a.length
c1=b8.c
b=B.a.a_(1,c1)
c2=b*4
n=new Uint8Array(c2)
c=new A.ba(n,b,4)
if(c1===1)a8=255
else if(c1===2)a8=85
else{c1=c1===4?17:1
a8=c1}for(o=0;o<b;++o){a9=o*a8
c.cP(o,a9,a9,a9,255)}for(o=0;o<a7;o+=2){c1=a[o]
a4=o+1
if(!(a4<a7))return A.a(a,a4)
b0=(c1&255)<<8|a[a4]&255
if(b0<b){c1=b0*4+3
if(!(c1<c2))return A.a(n,c1)
n[c1]=0}}}c1=b8.c
if(c1===1)b1=B.w
else if(c1===2)b1=B.B
else{if(c1===4)c2=B.C
else c2=c1===16?B.l:B.e
b1=c2}c2=b8.d
if(c2===0&&b8.x!=null&&c1>8)f=4
b2=A.P(b6,b6,b1,0,B.i,c0,b6,0,c2===2&&b8.x!=null?4:f,c,B.e,b9,!1)
b3=b8.a
b4=b8.b
b8.a=b9
b8.b=c0
b5.e=0
if(b8.r!==0){c1=c0+7>>>3
b5.c_(d,b2,0,0,8,8,b9+7>>>3,c1)
c2=b9+3
b5.c_(d,b2,4,0,8,8,c2>>>3,c1)
c1=c0+3
b5.c_(d,b2,0,4,4,8,c2>>>2,c1>>>3)
c2=b9+1
b5.c_(d,b2,2,0,4,4,c2>>>2,c1>>>2)
c1=c0+1
b5.c_(d,b2,0,2,2,4,c2>>>1,c1>>>2)
b5.c_(d,b2,1,0,2,2,b9>>>1,c1>>>1)
b5.c_(d,b2,0,1,1,2,b9,c0>>>1)}else b5.iS(d,b2)
b8.a=b3
b8.b=b4
c1=b8.at
if(c1!=null)b2.c=new A.d6(b8.Q,B.d4,c1)
b8=b8.ax
if(b8.a!==0)b2.ju(b8)
return b2},
aY(a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null
if(b.aA(t.D.a(a0))==null)return a
s=b.a
r=s.cy
q=r.length
if(q===0){s=b.ak(0)
s.toString
return s}for(q=t.g,p=a,o=p,n=0;n<s.CW;++n){if(!(n<r.length))return A.a(r,n)
a1=r[n]
m=b.ak(n)
if(m==null)continue
if(o==null||p==null){o=m.fp(m.gbU())
l=a1.f
o.y=B.b.i((l===0||a1.r===0?0:l/a1.r)*1000)
p=o
continue}l=n-1
if(!(l>=0&&l<r.length))return A.a(r,l)
k=r[l]
j=m.a
i=j==null
h=i?a:j.a
if(h==null)h=0
g=p.a
f=g==null
e=f?a:g.a
if(h===(e==null?0:e)){j=i?a:j.b
if(j==null)j=0
i=f?a:g.b
j=j===(i==null?0:i)&&a1.d===0&&a1.e===0&&a1.x===B.c0}else j=!1
if(j){l=a1.f
m.y=B.b.i((l===0||a1.r===0?0:l/a1.r)*1000)
o.b5(m)
p=m
continue}d=o.x
if(d===$)d=o.x=A.k([],q)
if(!(l<d.length))return A.a(d,l)
p=A.bP(d[l],!1,!1)
c=k.w
if(c===B.c2){l=k.d
j=k.e
i=s.z
if(i==null){i=new Uint8Array(4)
h=new A.cY(i)
i[0]=0
i[1]=0
i[2]=0
i[3]=0
i=h}A.tK(p,!1,i,l,l+k.b-1,j,j+k.c-1)}else if(c===B.c3&&n>1){l=n-2
d=o.x
if(d===$)d=o.x=A.k([],q)
if(!(l>=0&&l<d.length))return A.a(d,l)
j=k.d
i=k.e
h=k.b
g=k.c
p=A.ig(p,d[l],B.V,g,h,j,i,g,h,j,i)}l=a1.f
p.y=B.b.i((l===0||a1.r===0?0:l/a1.r)*1000)
l=a1.x===B.c1?B.V:B.ao
p=A.ig(p,m,l,a,a,a1.d,a1.e,a,a,a,a)
o.b5(p)}return o},
bR(a){return this.aY(a,null)},
c_(a4,a5,a6,a7,a8,a9,b0,b1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2=a1.a,a3=a2.d
if(a3===4)s=2
else if(a3===2)s=3
else{a3=a3===6?4:1
s=a3}r=s*a2.c
q=B.a.j(r+7,3)
p=B.a.j(r*b0+7,3)
o=A.k([null,null],t.e5)
n=A.k([0,0,0,0],t.t)
for(a2=a8>1,m=a8-a6,l=a7,k=0,j=0;k<b1;++k,l+=a9,++a1.e){a3=J.c(a4.a,a4.d++)
if(!(a3>=0&&a3<5))return A.a(B.ag,a3)
i=B.ag[a3]
h=a4.am(p)
a4.d=a4.d+(h.c-h.d)
B.c.h(o,j,h.a4())
if(!(j>=0&&j<2))return A.a(o,j)
g=o[j]
j=1-j
f=o[j]
g.toString
a1.f7(i,q,g,f)
a1.c=a1.b=0
a3=g.length
e=new A.am(g,0,Math.min(a3,a3),0,!0)
for(a3=m<=1,d=a6,c=0;c<b0;++c,d+=a8){a1.eZ(e,n)
b=a5.a
b=b==null?null:b.O(d,l,null)
a1.dN(b==null?new A.J():b,n)
if(!a3||a2)for(a=0;a<a8;++a)for(b=l+a,a0=0;a0<m;++a0)a1.dN(a5.ac(d+a0,b),n)}}},
iS(a1,a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=b.a,a0=a.d
if(a0===4)s=2
else if(a0===2)s=3
else{a0=a0===6?4:1
s=a0}r=s*a.c
q=a.a
p=a.b
o=B.a.j(q*r+7,3)
n=B.a.j(r+7,3)
m=A.K(o,0,!1,t.p)
l=A.k([m,m],t.S)
k=A.k([0,0,0,0],t.t)
a=a2.a
j=a.gF(a)
j.D()
for(i=0,h=0;i<p;++i,h=e){a=J.c(a1.a,a1.d++)
if(!(a>=0&&a<5))return A.a(B.ag,a)
g=B.ag[a]
f=a1.am(o)
a1.d=a1.d+(f.c-f.d)
B.c.h(l,h,f.a4())
if(!(h>=0&&h<2))return A.a(l,h)
e=1-h
b.f7(g,n,l[h],l[e])
b.c=b.b=0
a=l[h]
a0=a.length
d=new A.am(a,0,Math.min(a0,a0),0,!0)
for(c=0;c<q;++c){b.eZ(d,k)
b.dN(j.gL(),k)
j.D()}}},
f7(a,b,c,d){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
t.L.a(c)
t.T.a(d)
s=c.length
switch(a.a){case 0:break
case 1:for(r=J.ai(c),q=b;q<s;++q){p=c.length
if(!(q<p))return A.a(c,q)
o=c[q]
n=q-b
if(!(n>=0&&n<p))return A.a(c,n)
r.h(c,q,o+c[n]&255)}break
case 2:for(r=J.ai(c),p=d!=null,q=0;q<s;++q){if(p){if(!(q<d.length))return A.a(d,q)
m=d[q]}else m=0
if(!(q<c.length))return A.a(c,q)
r.h(c,q,c[q]+m&255)}break
case 3:for(r=J.ai(c),p=d!=null,q=0;q<s;++q){if(q<b)l=0
else{o=q-b
if(!(o>=0&&o<c.length))return A.a(c,o)
l=c[o]}if(p){if(!(q<d.length))return A.a(d,q)
m=d[q]}else m=0
if(!(q<c.length))return A.a(c,q)
r.h(c,q,c[q]+B.a.j(l+m,1)&255)}break
case 4:for(r=J.ai(c),p=d==null,o=!p,q=0;q<s;++q){n=q<b
if(n)l=0
else{k=q-b
if(!(k>=0&&k<c.length))return A.a(c,k)
l=c[k]}if(o){if(!(q<d.length))return A.a(d,q)
m=d[q]}else m=0
if(n||p)j=0
else{n=q-b
if(!(n>=0&&n<d.length))return A.a(d,n)
j=d[n]}i=l+m-j
h=Math.abs(i-l)
g=Math.abs(i-m)
f=Math.abs(i-j)
if(h<=g&&h<=f)e=l
else e=g<=f?m:j
if(!(q<c.length))return A.a(c,q)
r.h(c,q,c[q]+e&255)}break}},
bn(a,b){var s,r,q,p,o,n=this
if(b===0)return 0
if(b===8)return a.G()
if(b===16)return a.p()
for(s=a.c;r=n.c,r<b;){r=a.d
if(r>=s)throw A.h(A.o("Invalid PNG data."))
q=a.a
a.d=r+1
p=J.c(q,r)
r=n.c
n.b=B.a.a_(p,r)
n.c=r+8}if(b===1)o=1
else if(b===2)o=3
else{if(b===4)s=15
else s=0
o=s}s=r-b
r=B.a.a3(n.b,s)
n.c=s
return r&o},
eZ(a,b){var s,r,q=this
t.L.a(b)
s=q.a
r=s.d
switch(r){case 0:B.c.h(b,0,q.bn(a,s.c))
return
case 2:B.c.h(b,0,q.bn(a,s.c))
B.c.h(b,1,q.bn(a,s.c))
B.c.h(b,2,q.bn(a,s.c))
return
case 3:B.c.h(b,0,q.bn(a,s.c))
return
case 4:B.c.h(b,0,q.bn(a,s.c))
B.c.h(b,1,q.bn(a,s.c))
return
case 6:B.c.h(b,0,q.bn(a,s.c))
B.c.h(b,1,q.bn(a,s.c))
B.c.h(b,2,q.bn(a,s.c))
B.c.h(b,3,q.bn(a,s.c))
return}throw A.h(A.o("Invalid color type: "+r+"."))},
dN(a,b){var s,r,q,p,o,n,m,l,k,j
t.L.a(b)
s=this.a
r=s.d
switch(r){case 0:r=s.x
if(r!=null&&s.c>8){s=r.length
if(0>=s)return A.a(r,0)
q=r[0]
if(1>=s)return A.a(r,1)
r=r[1]
p=b[0]
a.a9(p,p,p,p!==((q&255)<<24|r&255)>>>0?a.gE():0)
return}a.ar(b[0],0,0)
return
case 2:o=b[0]
p=b[1]
n=b[2]
s=s.x
if(s!=null){r=s.length
if(0>=r)return A.a(s,0)
q=s[0]
if(1>=r)return A.a(s,1)
m=s[1]
if(2>=r)return A.a(s,2)
l=s[2]
if(3>=r)return A.a(s,3)
k=s[3]
if(4>=r)return A.a(s,4)
j=s[4]
if(5>=r)return A.a(s,5)
s=s[5]
if(o!==((q&255)<<8|m&255)||p!==((l&255)<<8|k&255)||n!==((j&255)<<8|s&255)){a.a9(o,p,n,a.gE())
return}}a.ar(o,p,n)
return
case 3:a.sP(b[0])
return
case 4:a.ar(b[0],b[1],0)
return
case 6:a.a9(b[0],b[1],b[2],b[3])
return}throw A.h(A.o("Invalid color type: "+r+"."))}}
A.bV.prototype={
ae(){return"PnmFormat."+this.b}}
A.bW.prototype={
gR(){return this.a},
gN(){return this.b}}
A.j7.prototype={
br(a){var s
this.b=A.t(a,!1,null,0)
s=this.d0()
if(s==="P1"||s==="P2"||s==="P5"||s==="P3"||s==="P6")return!0
return!1},
aY(a,b){if(this.aA(a)==null)return null
return this.ak(0)},
aA(a){var s,r,q=this
q.b=A.t(a,!1,null,0)
s=q.d0()
if(s==="P1"){r=q.a=new A.bW(B.a0)
r.e=B.c4}else if(s==="P2"){r=q.a=new A.bW(B.a0)
r.e=B.c5}else if(s==="P5"){r=q.a=new A.bW(B.a0)
r.e=B.aG}else if(s==="P3"){r=q.a=new A.bW(B.a0)
r.e=B.c6}else if(s==="P6"){r=q.a=new A.bW(B.a0)
r.e=B.aH}else return q.b=null
r.a=q.cq()
r=q.a
r.toString
r.b=q.cq()
r=q.a
if(r.a===0||r.b===0)return q.a=q.b=null
return r},
ak(a){var s,r,q,p,o,n=this,m=null,l=n.a
if(l==null)return m
s=l.e
if(s===B.c4){s=l.a
r=A.P(m,m,B.w,0,B.i,l.b,m,0,1,m,B.e,s,!1)
for(l=r.a,l=l.gF(l);l.D();){q=l.gL()
if(n.d0()==="1")q.ar(1,1,1)
else q.ar(0,0,0)}return r}else if(s===B.c5||s===B.aG){p=n.cq()
if(p===0)return m
l=n.a
s=l.a
l=l.b
r=A.P(m,m,n.fv(p),0,B.i,l,m,0,1,m,B.e,s,!1)
for(l=r.a,l=l.gF(l);l.D();){q=l.gL()
o=n.d4(n.a.e,p)
q.ar(o,o,o)}return r}else if(s===B.c6||s===B.aH){p=n.cq()
if(p===0)return m
l=n.a
s=l.a
l=l.b
r=A.P(m,m,n.fv(p),0,B.i,l,m,0,3,m,B.e,s,!1)
for(l=r.a,l=l.gF(l);l.D();)l.gL().ar(n.d4(n.a.e,p),n.d4(n.a.e,p),n.d4(n.a.e,p))
return r}return m},
fv(a){if(a>255)return B.l
if(a>15)return B.e
if(a>3)return B.C
if(a>1)return B.B
return B.w},
d4(a,b){if(a===B.aG||a===B.aH)return this.b.G()
return this.cq()},
cq(){var s,r,q=this.d0()
if(J.bl(q)===0)return 0
try{s=A.tX(q)
return s}catch(r){return 0}},
d0(){var s,r,q,p,o=this.b
if(o==null)return""
s=this.c
if(s.length!==0)return B.c.fF(s,0)
r=B.o.e1(o.kc())
if(r.length===0)return""
while(B.o.e8(r,"#"))r=B.o.e1(this.b.fE(70))
o=t.cF
q=A.u(new A.aB(A.k(r.split(" "),t.s),t.gS.a(new A.j8()),o),o.l("e.E"))
for(o=q.length,p=0;p<o;++p)if(B.o.e8(q[p],"#")){B.c.su(q,p)
break}B.c.c2(s,q)
if(s.length===0)return""
return B.c.fF(s,0)}}
A.j8.prototype={
$1(a){return A.b1(a)!==""},
$S:36}
A.hC.prototype={
sjU(a){t.T.a(a)},
sfX(a){t.T.a(a)},
ske(a){t.T.a(a)},
skf(a){t.T.a(a)}}
A.hD.prototype={
sbI(a){t.T.a(a)},
sbL(a){t.T.a(a)}}
A.bn.prototype={}
A.hG.prototype={
sbI(a){t.T.a(a)},
sbL(a){t.T.a(a)}}
A.hH.prototype={
sbI(a){t.T.a(a)},
sbL(a){t.T.a(a)}}
A.hK.prototype={
sbI(a){t.T.a(a)},
sbL(a){t.T.a(a)}}
A.hL.prototype={
sbI(a){t.T.a(a)},
sbL(a){t.T.a(a)}}
A.eS.prototype={}
A.hJ.prototype={}
A.jb.prototype={
hi(a){var s,r,q,p,o=this
a.p()
a.p()
a.p()
a.p()
s=B.a.V(a.c-a.d,8)
if(s>0){o.e=new Uint16Array(s)
o.f=new Uint16Array(s)
o.r=new Uint16Array(s)
o.w=new Uint16Array(s)
for(r=0;r<s;++r){q=o.e
p=a.p()
q.$flags&2&&A.b(q)
if(!(r<q.length))return A.a(q,r)
q[r]=p
p=o.f
q=a.p()
p.$flags&2&&A.b(p)
if(!(r<p.length))return A.a(p,r)
p[r]=q
q=o.r
p=a.p()
q.$flags&2&&A.b(q)
if(!(r<q.length))return A.a(q,r)
q[r]=p
p=o.w
q=a.p()
p.$flags&2&&A.b(p)
if(!(r<p.length))return A.a(p,r)
p[r]=q}}}}
A.cz.prototype={
fD(a,b,c,d,e,f,g){if(a.c-a.d<2)return
if(e==null)e=a.p()
switch(e){case 0:d.toString
this.jd(a,b,c,d)
break
case 1:if(f==null)f=this.ja(a,c)
d.toString
this.jc(a,b,c,d,f,g)
break
default:throw A.h(A.o("Unsupported compression: "+e))}},
kb(a,b,c,d){return this.fD(a,b,c,d,null,null,0)},
ja(a,b){var s,r,q=new Uint16Array(b)
for(s=0;s<b;++s){r=a.p()
if(!(s<b))return A.a(q,s)
q[s]=r}return q},
jd(a,b,c,d){var s,r=b*c
if(d===16)r*=2
if(r>a.c-a.d){s=new Uint8Array(r)
this.c=s
B.f.aF(s,0,r,255)
return}this.c=a.al(r).a4()},
jc(a,b,c,d,e,f){var s,r,q,p,o,n,m,l=b*c
if(d===16)l*=2
s=new Uint8Array(l)
this.c=s
r=f*c
q=e.length
if(r>=q){B.f.aF(s,0,l,255)
return}for(p=0,o=0;o<c;++o,r=n){n=r+1
if(!(r>=0&&r<q))return A.a(e,r)
m=a.am(e[r])
a.d=a.d+(m.c-m.d)
s=this.c
s.toString
this.i5(m,s,p)
p+=b}},
i5(a,b,c){var s,r,q,p,o,n,m,l
for(s=a.c,r=b.length;q=a.d,q<s;){p=a.a
a.d=q+1
q=J.c(p,q)
p=$.at()
p.$flags&2&&A.b(p)
p[0]=q
q=$.aF()
if(0>=q.length)return A.a(q,0)
o=q[0]
if(o<0){o=1-o
q=a.d
if(q>=s)break
p=a.a
a.d=q+1
n=J.c(p,q)
if(c+o>r)o=r-c
for(q=b.$flags|0,m=0;m<o;++m,c=l){l=c+1
q&2&&A.b(b)
if(!(c>=0&&c<r))return A.a(b,c)
b[c]=n}}else{++o
if(c+o>r)o=r-c
o=Math.min(o,s-a.d)
for(m=0;m<o;++m,c=l){l=c+1
q=J.c(a.a,a.d++)
b.$flags&2&&A.b(b)
if(!(c>=0&&c<r))return A.a(b,c)
b[c]=q}}}}}
A.bc.prototype={
ae(){return"PsdColorMode."+this.b}}
A.hE.prototype={
hj(a){var s,r,q=this
q.as=A.t(a,!0,null,0)
q.iV()
if(q.c!==943870035)return
s=q.as.k()
q.as.al(s)
s=q.as.k()
q.at=q.as.al(s)
s=q.as.k()
q.ax=q.as.al(s)
r=q.as
q.ay=r.al(r.c-r.d)},
bJ(){var s,r=this
if(r.c===943870035){s=r.as
s===$&&A.d()
s=s==null}else s=!0
if(s)return!1
r.j8()
r.j9()
r.jb()
r.ay=r.ax=r.at=r.as=null
return!0},
ft(){if(!this.bJ())return null
return this.kh()},
kh(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this,a1=null,a2=a0.y
if(a2!=null)return a2
a2=a0.a
a2=A.P(a1,a1,B.e,0,B.i,a0.b,a1,0,4,a1,B.e,a2,!1)
a0.y=a2
a2.cs(0)
for(a2=a0.w,s=0;s<a2.length;++s){r=a2[s]
q=r.y
q===$&&A.d()
if((q&2)!==0)continue
q=r.w
q===$&&A.d()
p=q/255
o=r.r
n=r.cx
q=r.a
q.toString
m=q
l=0
for(;;){q=r.f
q===$&&A.d()
if(!(l<q))break
q=r.a
q.toString
k=q+l
j=r.b
q=m>=0
i=0
for(;;){h=r.e
h===$&&A.d()
if(!(i<h))break
h=n.a
g=h==null?a1:h.O(i,l,a1)
if(g==null)g=new A.J()
f=B.b.i(g.gn())
e=B.b.i(g.gt())
d=B.b.i(g.gq())
c=B.b.i(g.gv())
j.toString
if(j>=0&&j<a0.a&&q&&m<a0.b){h=r.b
h.toString
b=a0.y.a
a=b==null?a1:b.O(h+i,k,a1)
if(a==null)a=new A.J()
a0.hv(B.b.i(a.gn()),B.b.i(a.gt()),B.b.i(a.gq()),B.b.i(a.gv()),f,e,d,c,o,p,a)}++i;++j}++l;++m}}a2=a0.y
a2.toString
return a2},
hv(a,b,c,d,e,f,g,h,i,j,k){var s,r,q,p,o,n=h/255*j
switch(i){case 1885434739:s=d
r=c
q=b
p=a
break
case 1852797549:s=h
r=g
q=f
p=e
break
case 1684632435:s=h
r=g
q=f
p=e
break
case 1684107883:p=Math.min(a,e)
q=Math.min(b,f)
r=Math.min(c,g)
s=h
break
case 1836411936:p=B.a.j(a*e,8)
q=B.a.j(b*f,8)
r=B.a.j(c*g,8)
s=h
break
case 1768188278:p=A.jd(a,e)
q=A.jd(b,f)
r=A.jd(c,g)
s=h
break
case 1818391150:p=A.jf(a,e)
q=A.jf(b,f)
r=A.jf(c,g)
s=h
break
case 1684751212:s=h
r=g
q=f
p=e
break
case 1818850405:p=Math.max(a,e)
q=Math.max(b,f)
r=Math.max(c,g)
s=h
break
case 1935897198:p=A.m4(a,e)
q=A.m4(b,f)
r=A.m4(c,g)
s=h
break
case 1684633120:p=A.je(a,e)
q=A.je(b,f)
r=A.je(c,g)
s=h
break
case 1818518631:p=e+a>255?255:a+e
q=f+b>255?255:b+f
r=g+c>255?255:c+g
s=h
break
case 1818706796:s=h
r=g
q=f
p=e
break
case 1870030194:p=A.m2(a,e,d,h)
q=A.m2(b,f,d,h)
r=A.m2(c,g,d,h)
s=h
break
case 1934387572:p=A.m5(a,e)
q=A.m5(b,f)
r=A.m5(c,g)
s=h
break
case 1749838196:p=A.m0(a,e)
q=A.m0(b,f)
r=A.m0(c,g)
s=h
break
case 1984719220:p=A.m6(a,e)
q=A.m6(b,f)
r=A.m6(c,g)
s=h
break
case 1816947060:p=A.m1(a,e)
q=A.m1(b,f)
r=A.m1(c,g)
s=h
break
case 1884055924:p=A.m3(a,e)
q=A.m3(b,f)
r=A.m3(c,g)
s=h
break
case 1749903736:p=e<255-a?0:255
q=f<255-b?0:255
r=g<255-c?0:255
s=h
break
case 1684629094:p=Math.abs(e-a)
q=Math.abs(f-b)
r=Math.abs(g-c)
s=h
break
case 1936553316:p=A.m_(a,e)
q=A.m_(b,f)
r=A.m_(c,g)
s=h
break
case 1718842722:s=h
r=g
q=f
p=e
break
case 1717856630:s=h
r=g
q=f
p=e
break
case 1752524064:s=h
r=g
q=f
p=e
break
case 1935766560:s=h
r=g
q=f
p=e
break
case 1668246642:s=h
r=g
q=f
p=e
break
case 1819634976:s=h
r=g
q=f
p=e
break
default:s=h
r=g
q=f
p=e}o=1-n
k.sn(B.b.i(a*o+p*n))
k.st(B.b.i(b*o+q*n))
k.sq(B.b.i(c*o+r*n))
k.sv(B.b.i(d*o+s*n))},
iV(){var s,r,q=this,p=q.as
p===$&&A.d()
q.c=p.k()
p=q.as.p()
q.d=p
if(p!==1){q.c=0
return}s=q.as.al(6)
for(r=0;r<6;++r)if(J.c(s.a,s.d+r)!==0){q.c=0
return}q.e=q.as.p()
q.b=q.as.k()
q.a=q.as.k()
q.f=q.as.p()
p=q.as.p()
if(!(p<8))return A.a(B.bV,p)
q.r=B.bV[p]},
j8(){var s,r,q,p,o,n,m=this,l=m.at
l.d=l.b
for(l=m.z;s=m.at,s.d<s.c;){r=s.k()
q=m.at.p()
s=m.at
p=J.c(s.a,s.d++)
m.at.ag(p)
if((p&1)===0)++m.at.d
p=m.at.k()
s=m.at
o=s.am(p)
n=s.d+(o.c-o.d)
s.d=n
if((p&1)===1)s.d=n+1
if(r===943868237)l.h(0,q,new A.hF())}},
j9(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.ax
h.d=h.b
s=h.k()
if((s&1)!==0)++s
r=i.ax.al(s)
h=i.w
B.c.cs(h)
if(s>0){q=r.p()
p=$.as()
p.$flags&2&&A.b(p)
p[0]=q
q=$.aE()
if(0>=q.length)return A.a(q,0)
o=q[0]
if(o<0)o=-o
for(q=t.N,p=t.mi,n=t.k9,m=t.na,l=0;l<o;++l){k=new A.hI(A.H(q,p),A.k([],n),A.k([],m))
k.hk(r)
B.c.I(h,k)}}for(l=0;l<h.length;++l)h[l].k7(r,i)
s=i.ax.k()
j=i.ax.al(s)
if(s>0){j.p()
j.p()
j.p()
j.p()
j.p()
j.p()
j.G()}},
jb(){var s,r,q,p,o,n,m=this,l=m.ay
l.d=l.b
s=l.p()
if(s===1){l=m.b
r=m.e
r===$&&A.d()
q=l*r
p=new Uint16Array(q)
for(o=0;o<q;++o)p[o]=m.ay.p()}else p=null
m.x=t.cf.a(A.k([],t.mS))
o=0
for(;;){l=m.e
l===$&&A.d()
if(!(o<l))break
l=m.x
r=m.ay
r.toString
n=o===3?-1:o
n=new A.cz(n)
n.fD(r,m.a,m.b,m.f,s,p,o)
B.c.I(l,n);++o}m.y=A.nx(m.r,m.f,m.a,m.b,m.x)},
$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.hF.prototype={}
A.hI.prototype={
hk(a4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2=a4.k(),a3=$.O()
a3.$flags&2&&A.b(a3)
a3[0]=a2
a2=$.a9()
if(0>=a2.length)return A.a(a2,0)
a1.a=a2[0]
a3[0]=a4.k()
a1.b=a2[0]
a3[0]=a4.k()
a1.c=a2[0]
a3[0]=a4.k()
a2=a2[0]
a1.d=a2
a3=a1.b
a3.toString
a1.e=a2-a3
a3=a1.c
a2=a1.a
a2.toString
a1.f=a3-a2
a1.as=t.cf.a(A.k([],t.mS))
s=a4.p()
for(r=0;r<s;++r){a2=a4.p()
a3=$.as()
a3.$flags&2&&A.b(a3)
a3[0]=a2
a2=$.aE()
if(0>=a2.length)return A.a(a2,0)
q=a2[0]
a4.k()
B.c.I(a1.as,new A.cz(q))}p=a4.k()
if(p!==943868237)throw A.h(A.o("Invalid PSD layer signature: "+B.a.cH(p,16)))
a1.r=a4.k()
a1.w=a4.G()
a4.G()
a1.y=a4.G()
if(a4.G()!==0)throw A.h(A.o("Invalid PSD layer data"))
o=a4.k()
n=a4.al(o)
if(o>0){o=n.k()
if(o>0){m=n.al(o)
a2=m.d
m.k()
m.k()
m.k()
m.k()
m.G()
m.G()
if(m.c-a2===20)m.d+=2
else{m.G()
m.G()
m.k()
m.k()
m.k()
m.k()}}o=n.k()
if(o>0)new A.jb().hi(n.al(o))
o=n.G()
n.ag(o)
l=4-B.a.Y(o,4)-1
if(l>0)n.d+=l
for(a2=n.c,a3=a1.ay,k=a1.cy,j=t.t,i=t.dM;n.d<a2;){p=n.k()
if(p!==943868237)throw A.h(A.o("PSD invalid signature for layer additional data: "+B.a.cH(p,16)))
h=n.ag(4)
o=n.k()
g=n.am(o)
f=n.d+(g.c-g.d)
n.d=f
if((o&1)===1)n.d=f+1
a3.h(0,h,A.q8(h,g))
if(h==="lrFX"){e=A.p(i.a(a3.m(0,"lrFX")).b,null,0)
e.p()
d=e.p()
for(c=0;c<d;++c){e.ag(4)
b=e.ag(4)
a=e.k()
if(b==="dsdw"){a0=new A.hD()
B.c.I(k,a0)
a0.a=e.k()
e.k()
e.k()
e.k()
e.k()
a0.sbI(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
e.ag(8)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
a0.sbL(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))}else if(b==="isdw"){a0=new A.hH()
B.c.I(k,a0)
a0.a=e.k()
e.k()
e.k()
e.k()
e.k()
a0.sbI(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
e.ag(8)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
a0.sbL(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))}else if(b==="oglw"){a0=new A.hK()
B.c.I(k,a0)
a0.a=e.k()
e.k()
e.k()
a0.sbI(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
e.ag(8)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
if(a0.a===2)a0.sbL(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))}else if(b==="iglw"){a0=new A.hG()
B.c.I(k,a0)
a0.a=e.k()
e.k()
e.k()
a0.sbI(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
e.ag(8)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
if(a0.a===2){J.c(e.a,e.d++)
a0.sbL(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))}}else if(b==="bevl"){a0=new A.hC()
B.c.I(k,a0)
a0.a=e.k()
e.k()
e.k()
e.k()
e.ag(8)
e.ag(8)
a0.sjU(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
a0.sfX(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
J.c(e.a,e.d++)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
J.c(e.a,e.d++)
if(a0.a===2){a0.ske(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
a0.skf(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))}}else if(b==="sofi"){a0=new A.hL()
B.c.I(k,a0)
a0.a=e.k()
e.ag(4)
a0.sbI(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))
J.c(e.a,e.d++)
J.c(e.a,e.d++)
a0.sbL(A.k([e.p(),e.p(),e.p(),e.p(),e.p()],j))}else e.d+=a}}}}},
k7(a,b){var s,r,q,p,o,n=this,m=0
for(;;){s=n.as
s===$&&A.d()
if(!(m<s.length))break
s=s[m]
r=n.e
r===$&&A.d()
q=n.f
q===$&&A.d()
s.kb(a,r,q,b.f);++m}r=b.r
q=b.f
p=n.e
p===$&&A.d()
o=n.f
o===$&&A.d()
n.cx=A.nx(r,q,p,o,s)}}
A.ds.prototype={}
A.jc.prototype={
aY(a,b){var s,r,q,p=null,o=A.lZ(a)
this.a=o
s=1
if(s===1){o=o.ft()
return o}for(r=p,q=0;q<s;++q){o=this.a
b=o==null?p:o.ft()
if(b==null)continue
if(r==null){b.w=B.aZ
r=b}else r.b5(b)}return r},
aA(a){return this.a=A.lZ(a)}}
A.hM.prototype={}
A.dv.prototype={}
A.az.prototype={
bb(a,b){var s=this
return new A.az(s.a+b.a,s.b+b.b,s.c+b.c,s.d+b.d)}}
A.dt.prototype={$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.du.prototype={$iL:1,
gN(){return this.f},
gR(){return this.r}}
A.eT.prototype={$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.aX.prototype={
sct(a){var s=this.a,r=this.b+1
s.$flags&2&&A.b(s)
if(!(r<s.length))return A.a(s,r)
s[r]=a},
cK(){var s,r=this.e,q=this.d
if(r){s=q>>>9
if(!(s<32))return A.a(B.q,s)
return new A.dv(B.q[s],B.q[q>>>4&31],B.v[q&15])}else return new A.dv(B.v[q>>>7&15],B.v[q>>>3&15],B.ai[q&7])},
cM(){var s,r=this.e,q=this.d
if(r){s=q>>>9
if(!(s<32))return A.a(B.q,s)
return new A.az(B.q[s],B.q[q>>>4&31],B.v[q&15],255)}else return new A.az(B.v[q>>>7&15],B.v[q>>>3&15],B.ai[q&7],B.ai[q>>>11&7])},
cL(){var s,r=this.r,q=this.f
if(r){s=q>>>10
if(!(s<32))return A.a(B.q,s)
return new A.dv(B.q[s],B.q[q>>>5&31],B.q[q&31])}else return new A.dv(B.v[q>>>8&15],B.v[q>>>4&15],B.v[q&15])},
cN(){var s,r=this.r,q=this.f
if(r){s=q>>>10
if(!(s<32))return A.a(B.q,s)
return new A.az(B.q[s],B.q[q>>>5&31],B.q[q&31],255)}else return new A.az(B.v[q>>>8&15],B.v[q>>>4&15],B.v[q&15],B.ai[q>>>12&7])},
cm(){var s=this,r=s.c?1:0,q=s.d,p=s.e?1:0,o=s.f,n=s.r?1:0
return(r|(q&16383)<<1|p<<15|(o&32767)<<16|n<<31)>>>0},
by(){var s,r=this,q=r.a,p=r.b+1
if(!(p<q.length))return A.a(q,p)
s=q[p]
r.c=(s&1)===1
r.sct(r.cm())
r.d=s>>>1&16383
r.sct(r.cm())
r.e=(s>>>15&1)===1
r.sct(r.cm())
r.f=s>>>16&32767
r.sct(r.cm())
r.r=(s>>>31&1)===1
r.sct(r.cm())}}
A.jg.prototype={
aA(a){var s,r=this,q=a.length,p=q-(q>>>1&1431655765)>>>0
p=(p&858993459)+(p>>>2&858993459)
if((p+(p>>>4)>>>0&252645135)*16843009>>>0>>>24===1){s=r.hS(a)
if(s!=null){r.a=a
return r.b=s}}s=r.i4(a)
if(s!=null){r.a=a
return r.b=s}s=r.i2(a)
if(s!=null){r.a=a
return r.b=s}return null},
i4(a){var s,r,q=A.t(a,!1,null,0)
if(q.k()!==52)return null
if(q.k()!==55727696)return null
s=A.k([0,0,0,0],t.t)
r=new A.du(s)
q.k()
r.b=q.k()
B.c.h(s,0,q.G())
B.c.h(s,1,q.G())
B.c.h(s,2,q.G())
B.c.h(s,3,q.G())
q.k()
q.k()
r.f=q.k()
r.r=q.k()
q.k()
q.k()
q.k()
q.k()
r.Q=q.k()
return r},
i2(a){var s,r,q=A.t(a,!1,null,0)
if(q.k()!==52)return null
s=new A.dt()
s.b=q.k()
s.a=q.k()
q.k()
s.d=q.k()
q.k()
s.f=q.k()
q.k()
q.k()
q.k()
s.y=q.k()
r=q.k()
s.z=r
s.Q=q.k()
if(r!==559044176)return null
return s},
hS(a){var s,r,q,p,o,n,m=null,l=a.length,k=A.t(a,!1,m,0)
if(k.k()!==0)return m
s=new A.eT()
s.b=k.k()
s.a=k.k()
k.k()
k.k()
k.k()
k.k()
k.k()
k.k()
k.k()
r=k.k()
s.y=r
if(r===559044176)return m
q=0
p=8
if(!(l===32)){o=0
for(;;){if(!(o<10)){q=1
break}n=o<<1>>>0
if((B.a.S(64,n)&l)>>>0!==0){p=B.a.S(16,o)
q=1
break}if((B.a.S(128,n)&l)>>>0!==0){p=B.a.S(16,o)
break}++o}if(o===10)return m}if((q+1)*2===4)return m
s.b=s.a=p
return s},
ak(a){var s,r,q=this,p=q.b
if(p==null||q.a==null)return null
if(p instanceof A.eT){p=p.a
s=q.b.gN()
r=q.a
r.toString
return q.dv(p,s,r)}else if(p instanceof A.dt){p=q.a
p.toString
return q.i1(p)}else if(p instanceof A.du){p=q.a
p.toString
return q.i3(p)}return null},
aY(a,b){if(this.aA(a)==null)return null
return this.ak(0)},
i1(a){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=null,e=a.length
if(e<52||g.b==null)return f
s=g.b
s.toString
t.fF.a(s)
r=A.t(a,!1,f,0)
r.d+=52
q=s.Q
if(q<1)q=(s.d&4096)!==0?6:1
if(q!==1)return f
p=s.a
o=s.b
if(p*o*s.f/8>e-52)return f
switch(s.d&255){case 16:n=A.P(f,f,B.e,0,B.i,o,f,0,4,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
l=J.c(r.a,r.d++)
k=J.c(r.a,r.d++)
m.sn(k&240)
m.st((k&15)<<4)
m.sq(l&240)
m.sv((l&15)<<4)}return n
case 17:n=A.P(f,f,B.e,0,B.i,o,f,0,4,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
j=r.p()
i=(j&1)!==0?255:0
m.sn(j>>>8&248)
m.st(j>>>3&248)
m.sq((j&62)<<2)
m.sv(i)}return n
case 18:n=A.P(f,f,B.e,0,B.i,o,f,0,4,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
m.sn(J.c(r.a,r.d++))
m.st(J.c(r.a,r.d++))
m.sq(J.c(r.a,r.d++))
m.sv(J.c(r.a,r.d++))}return n
case 19:n=A.P(f,f,B.e,0,B.i,o,f,0,3,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
j=r.p()
m.sn(j>>>8&248)
m.st(j>>>3&252)
m.sq((j&31)<<3)}return n
case 20:n=A.P(f,f,B.e,0,B.i,o,f,0,3,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
j=r.p()
m.sn((j&31)<<3)
m.st(j>>>2&248)
m.sq(j>>>7&248)}return n
case 21:n=A.P(f,f,B.e,0,B.i,o,f,0,3,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
m.sn(J.c(r.a,r.d++))
m.st(J.c(r.a,r.d++))
m.sq(J.c(r.a,r.d++))}return n
case 22:n=A.P(f,f,B.e,0,B.i,o,f,0,1,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();)s.gL().sn(J.c(r.a,r.d++))
return n
case 23:n=A.P(f,f,B.e,0,B.i,o,f,0,4,f,B.e,p,!1)
for(s=n.a,s=s.gF(s);s.D();){m=s.gL()
i=J.c(r.a,r.d++)
h=J.c(r.a,r.d++)
m.sn(h)
m.st(h)
m.sq(h)
m.sv(i)}return n
case 24:return f
case 25:return s.y===0?g.ez(p,o,r.a4()):g.dv(p,o,r.a4())}return f},
i3(a){var s,r=this.b
if(!(r instanceof A.du))return null
s=A.t(a,!1,null,0)
s.d=(s.d+=52)+r.Q
if(r.c[0]===0)switch(r.b){case 2:return this.ez(r.r,r.f,s.a4())
case 3:return this.dv(r.r,r.f,s.a4())}return null},
ez(c6,c7,c8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6=null,b7=A.P(b6,b6,B.e,0,B.i,c7,b6,0,3,b6,B.e,c6,!1),b8=c6/4|0,b9=b8-1,c0=J.aG(B.f.gA(c8),0,null),c1=new A.aX(c0),c2=new A.aX(J.aG(B.f.gA(c8),0,null)),c3=new A.aX(J.aG(B.f.gA(c8),0,null)),c4=new A.aX(J.aG(B.f.gA(c8),0,null)),c5=new A.aX(J.aG(B.f.gA(c8),0,null))
for(s=c0.length,r=0,q=0;r<b8;++r,q+=4)for(p=0,o=0;p<b8;++p,o+=4){c1.b=A.bz(p,r)<<1>>>0
c1.by()
n=c1.b
if(!(n<s))return A.a(c0,n)
m=c0[n]
l=c1.c?4:0
for(k=0,j=0;j<4;++j){i=(r+(j<2?-1:0)&b9)>>>0
h=(i+1&b9)>>>0
for(n=j+q,g=0;g<4;++g){f=(p+(g<2?-1:0)&b9)>>>0
e=(f+1&b9)>>>0
c2.b=A.bz(f,i)<<1>>>0
c2.by()
c3.b=A.bz(e,i)<<1>>>0
c3.by()
c4.b=A.bz(f,h)<<1>>>0
c4.by()
c5.b=A.bz(e,h)<<1>>>0
c5.by()
d=c2.cK()
if(!(k>=0&&k<16))return A.a(B.m,k)
c=B.m[k][0]
b=c3.cK()
a=B.m[k][1]
a0=c4.cK()
a1=B.m[k][2]
a2=c5.cK()
a3=B.m[k][3]
a4=c2.cL()
a5=B.m[k][0]
a6=c3.cL()
a7=B.m[k][1]
a8=c4.cL()
a9=B.m[k][2]
b0=c5.cL()
b1=B.m[k][3]
b2=B.bI[l+m&3]
b3=b2[0]
b4=b2[1]
b5=b7.a
if(b5!=null)b5.a5(g+o,n,(d.a*c+b.a*a+a0.a*a1+a2.a*a3)*b3+(a4.a*a5+a6.a*a7+a8.a*a9+b0.a*b1)*b4>>>7,(d.b*c+b.b*a+a0.b*a1+a2.b*a3)*b3+(a4.b*a5+a6.b*a7+a8.b*a9+b0.b*b1)*b4>>>7,(d.c*c+b.c*a+a0.c*a1+a2.c*a3)*b3+(a4.c*a5+a6.c*a7+a8.c*a9+b0.c*b1)*b4>>>7)
m=m>>>2;++k}}}return b7},
dv(b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=null,a5=A.P(a4,a4,B.e,0,B.i,b5,a4,0,4,a4,B.e,b4,!1),a6=b4/4|0,a7=a6-1,a8=J.aG(B.f.gA(b6),0,null),a9=new A.aX(a8),b0=new A.aX(J.aG(B.f.gA(b6),0,null)),b1=new A.aX(J.aG(B.f.gA(b6),0,null)),b2=new A.aX(J.aG(B.f.gA(b6),0,null)),b3=new A.aX(J.aG(B.f.gA(b6),0,null))
for(s=a8.length,r=0,q=0;r<a6;++r,q+=4)for(p=0,o=0;p<a6;++p,o+=4){a9.b=A.bz(p,r)<<1>>>0
a9.by()
n=a9.b
if(!(n<s))return A.a(a8,n)
m=a8[n]
l=a9.c?4:0
for(k=0,j=0;j<4;++j){i=(r+(j<2?-1:0)&a7)>>>0
h=(i+1&a7)>>>0
for(n=j+q,g=0;g<4;++g){f=(p+(g<2?-1:0)&a7)>>>0
e=(f+1&a7)>>>0
b0.b=A.bz(f,i)<<1>>>0
b0.by()
b1.b=A.bz(e,i)<<1>>>0
b1.by()
b2.b=A.bz(f,h)<<1>>>0
b2.by()
b3.b=A.bz(e,h)<<1>>>0
b3.by()
d=b0.cM()
if(!(k>=0&&k<16))return A.a(B.m,k)
c=B.m[k][0]
b=b1.cM()
a=B.m[k][1]
a=new A.az(d.a*c,d.b*c,d.c*c,d.d*c).bb(0,new A.az(b.a*a,b.b*a,b.c*a,b.d*a))
b=b2.cM()
c=B.m[k][2]
c=a.bb(0,new A.az(b.a*c,b.b*c,b.c*c,b.d*c))
b=b3.cM()
a=B.m[k][3]
a0=c.bb(0,new A.az(b.a*a,b.b*a,b.c*a,b.d*a))
a=b0.cN()
b=B.m[k][0]
c=b1.cN()
d=B.m[k][1]
d=new A.az(a.a*b,a.b*b,a.c*b,a.d*b).bb(0,new A.az(c.a*d,c.b*d,c.c*d,c.d*d))
c=b2.cN()
b=B.m[k][2]
b=d.bb(0,new A.az(c.a*b,c.b*b,c.c*b,c.d*b))
c=b3.cN()
d=B.m[k][3]
a1=b.bb(0,new A.az(c.a*d,c.b*d,c.c*d,c.d*d))
a2=B.bI[l+m&3]
d=a2[0]
c=a2[1]
b=a2[2]
a=a2[3]
a3=a5.a
if(a3!=null)a3.aj(g+o,n,a0.a*d+a1.a*c>>>7,a0.b*d+a1.b*c>>>7,a0.c*d+a1.c*c>>>7,a0.d*b+a1.d*a>>>7)
m=m>>>2;++k}}}return a5}}
A.eX.prototype={
c6(a){var s,r,q=this
if(a.c-a.d<18)return
q.a=a.G()
q.b=a.G()
s=a.G()
if(s<12){if(!(s>=0))return A.a(B.bF,s)
r=B.bF[s]}else r=B.am
q.c=r
a.p()
q.e=a.p()
q.f=a.G()
a.p()
a.p()
q.x=a.p()
q.y=a.p()
q.z=a.G()
q.Q=a.G()},
fB(){var s=this,r=s.z
if(r!==8&&r!==16&&r!==24&&r!==32)return!1
r=s.c
if(r===B.H||r===B.I){if(s.e>256||s.b!==1)return!1
r=s.f
if(r!==16&&r!==24&&r!==32)return!1}else if(s.b===1)return!1
return!0},
$iL:1,
gR(){return this.x},
gN(){return this.y}}
A.aA.prototype={
ae(){return"TgaImageType."+this.b}}
A.jr.prototype={
aY(a,b){if(this.aA(a)==null)return null
return this.ak(0)},
aA(a){var s,r,q,p,o=this
o.a=new A.eX(B.am)
s=A.t(a,!1,null,0)
o.b=s
r=s.al(18)
o.a.c6(r)
s=o.a
if(!s.fB())return null
q=o.b
q.d+=s.a
p=s.c
if(p===B.H||p===B.I)s.as=q.al(s.e*B.a.j(s.f,3)).a4()
s=o.a
s.ax=o.b.d
return s},
ak(a){var s=this,r=s.a
if(r==null)return null
r=r.c
if(r===B.cd)return s.ey()
else if(r===B.cc||r===B.I)return s.i6()
else if(r===B.H)return s.ey()
return null},
eu(a,b){var s,r,q,p,o,n,m,l=this,k=A.t(a,!1,null,0),j=l.a.f
if(j===16){j=l.b
j===$&&A.d()
s=j.p()
r=s>>>7&248
q=s>>>2&248
p=(s&31)<<3
o=(s&32768)!==0?0:255
for(n=0;n<l.a.e;++n){b.bv(n,r)
b.bu(n,q)
b.bt(n,p)
b.bs(n,o)}}else{m=j===32
for(n=0;n<l.a.e;++n){p=J.c(k.a,k.d++)
q=J.c(k.a,k.d++)
r=J.c(k.a,k.d++)
o=m?J.c(k.a,k.d++):255
b.bv(n,r)
b.bu(n,q)
b.bt(n,p)
b.bs(n,o)}}},
i6(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=null,c=e.a,b=c.z,a=b===16,a0=a||b===32,a1=c.x,a2=c.y,a3=a0?4:3
c=c.c
s=A.P(d,d,B.e,0,B.i,a2,d,0,a3,d,B.e,a1,c===B.H||c===B.I)
c=s.a
if((c==null?d:c.gT())!=null){c=e.a.as
c.toString
a1=s.a
a1=a1==null?d:a1.gT()
a1.toString
e.eu(c,a1)}r=s.gR()
q=s.gN()-1
c=b===8
p=0
for(;;){a1=e.b
a1===$&&A.d()
a2=a1.d
if(!(a2<a1.c&&q>=0))break
a3=a1.a
a1.d=a2+1
o=J.c(a3,a2)
n=(o&127)+1
m=0
if((o&128)!==0)if(c){a1=e.b
l=J.c(a1.a,a1.d++)
for(k=0;k<n;++k){j=p+1
a1=s.a
if(a1!=null)a1.aK(p,q,l)
if(j>=r){--q
if(q<0){p=m
break}p=0}else p=j}}else{a1=e.b
if(a){i=a1.p()
l=i>>>7&248
h=i>>>2&248
g=(i&31)<<3
f=(i&32768)!==0?0:255
for(k=0;k<n;++k){j=p+1
a1=s.a
if(a1!=null)a1.aj(p,q,l,h,g,f)
if(j>=r){--q
if(q<0){p=m
break}p=0}else p=j}}else{g=J.c(a1.a,a1.d++)
a1=e.b
h=J.c(a1.a,a1.d++)
a1=e.b
l=J.c(a1.a,a1.d++)
if(a0){a1=e.b
f=J.c(a1.a,a1.d++)}else f=255
for(k=0;k<n;++k){j=p+1
a1=s.a
if(a1!=null)a1.aj(p,q,l,h,g,f)
if(j>=r){--q
if(q<0){p=m
break}p=0}else p=j}}}else if(c)for(k=0;k<n;++k){a1=e.b
l=J.c(a1.a,a1.d++)
j=p+1
a1=s.a
if(a1!=null)a1.aK(p,q,l)
if(j>=r){--q
if(q<0){p=m
break}p=0}else p=j}else if(a)for(k=0;k<n;++k){i=e.b.p()
f=(i&32768)!==0?0:255
j=p+1
a1=s.a
if(a1!=null)a1.aj(p,q,i>>>7&248,i>>>2&248,(i&31)<<3,f)
a1=e.b
if(a1.d>=a1.c){p=j
break}if(j>=r){--q
if(q<0){p=m
break}p=0}else p=j}else for(k=0;k<n;++k){a1=e.b
g=J.c(a1.a,a1.d++)
a1=e.b
h=J.c(a1.a,a1.d++)
a1=e.b
l=J.c(a1.a,a1.d++)
if(a0){a1=e.b
f=J.c(a1.a,a1.d++)}else f=255
j=p+1
a1=s.a
if(a1!=null)a1.aj(p,q,l,h,g,f)
if(j>=r){--q
if(q<0){p=m
break}p=0}else p=j}if(p>=r){--q
if(q<0)break
p=0}}return s},
ey(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=null,b=d.b
b===$&&A.d()
s=d.a
b.d=s.ax
r=s.z
b=r===16
q=!0
if(!b)if(r!==32){p=s.c
if(p===B.H||p===B.I){p=s.f
p=p===16||p===32}else p=!1
q=p}p=s.x
o=s.y
n=q?4:3
s=s.c
m=A.P(c,c,B.e,0,B.i,o,c,0,n,c,B.e,p,s===B.H||s===B.I)
s=d.a
p=s.c
if(p===B.H||p===B.I){s=s.as
s.toString
p=m.a
p=p==null?c:p.gT()
p.toString
d.eu(s,p)}if(r===8)for(l=m.gN()-1;l>=0;--l){k=0
for(;;){b=m.a
b=b==null?c:b.a
if(!(k<(b==null?0:b)))break
b=d.b
j=J.c(b.a,b.d++)
b=m.a
if(b!=null)b.aK(k,l,j);++k}}else if(b)for(l=m.gN()-1;l>=0;--l){k=0
for(;;){b=m.a
b=b==null?c:b.a
if(!(k<(b==null?0:b)))break
i=d.b.p()
h=(i&32768)!==0?0:255
b=m.a
if(b!=null)b.aj(k,l,i>>>7&248,i>>>2&248,(i&31)<<3,h);++k}}else for(l=m.gN()-1;l>=0;--l){k=0
for(;;){b=m.a
b=b==null?c:b.a
if(!(k<(b==null?0:b)))break
b=d.b
g=J.c(b.a,b.d++)
b=d.b
f=J.c(b.a,b.d++)
b=d.b
e=J.c(b.a,b.d++)
if(q){b=d.b
h=J.c(b.a,b.d++)}else h=255
b=m.a
if(b!=null)b.aj(k,l,e,f,g,h);++k}}return m}}
A.js.prototype={
af(a){var s,r,q,p,o,n=this
if(a===0)return 0
if(n.c===0){n.c=8
n.b=n.a.G()}for(s=n.a,r=0;q=n.c,a>q;){p=B.a.a_(r,q)
o=n.b
if(!(q>=0&&q<9))return A.a(B.y,q)
r=p+(o&B.y[q])
a-=q
n.c=8
n.b=J.c(s.a,s.d++)}if(a>0){if(q===0){n.c=8
n.b=s.G()}s=B.a.a_(r,a)
q=n.b
p=n.c-a
q=B.a.bw(q,p)
if(!(a<9))return A.a(B.y,a)
r=s+(q&B.y[a])
n.c=p}return r}}
A.hQ.prototype={
B(a){var s=this,r=s.a,q=$.mJ().m(0,r)
if(q!=null)return q.a+": "+s.b.B(0)+" "+s.c
return"<"+r+">: "+s.b.B(0)+" "+s.c},
bh(){var s,r,q,p,o=this,n=o.e
if(n!=null)return n
n=o.f
n.d=o.d
s=o.c
r=o.b
if(r!==B.d){q=r.a
if(!(q<14))return A.a(B.t,q)
q=B.t[q]}else q=0
p=n.al(s*q)
switch(r.a){case 1:return o.e=new A.bv(new Uint8Array(A.z(p.al(s).a4())))
case 2:return o.e=new A.cd(s===0?"":p.ag(s-1))
case 7:return o.e=new A.bv(new Uint8Array(A.z(p.al(s).a4())))
case 3:return o.e=A.n9(p,s)
case 4:return o.e=A.n4(p,s)
case 5:return o.e=A.n5(p,s)
case 11:return o.e=A.na(p,s)
case 12:return o.e=A.n3(p,s)
case 6:return o.e=new A.bO(new Int8Array(A.z(J.lv(B.f.gA(p.a4()),0,s))))
case 8:return o.e=A.n8(p,s)
case 9:return o.e=A.n6(p,s)
case 10:return o.e=A.n7(p,s)
case 13:case 0:return null}}}
A.ju.prototype={
jC(a,b,c,d){var s,r,q,p=this
p.r=b
p.x=p.w=0
s=B.a.V(p.a+7,8)
for(r=0,q=0;q<d;++q){p.dt(a,r,c)
r+=s}},
dt(a,b,c){var s,r,q,p,o,n,m,l,k=this
k.d=0
for(s=k.a,r=!0;c<s;){while(r){q=k.bP(10)
if(!(q<1024))return A.a(B.ad,q)
p=B.ad[q]
o=B.a.j(p,1)&15
if(o===12){q=(q<<2&12|k.aX(2))>>>0
if(!(q<16))return A.a(B.G,q)
p=B.G[q]
n=B.a.j(p,1)
c+=B.a.j(p,4)&4095
k.aE(4-(n&7))}else if(o===0)throw A.h(A.o("TIFFFaxDecoder0"))
else if(o===15)throw A.h(A.o("TIFFFaxDecoder1"))
else{c+=B.a.j(p,5)&2047
k.aE(10-o)
if((p&1)===0){B.c.h(k.f,k.d++,c)
r=!1}}}if(c===s){if(k.z===2)if(k.w!==0){s=k.x
s.toString
k.x=s+1
k.w=0}break}while(!r){q=k.aX(4)
if(!(q<16))return A.a(B.a7,q)
p=B.a7[q]
m=p>>>5&2047
l=!0
if(m===100){q=k.bP(9)
if(!(q<512))return A.a(B.a9,q)
p=B.a9[q]
o=B.a.j(p,1)&15
m=B.a.j(p,5)&2047
if(o===12){k.aE(5)
q=k.aX(4)
if(!(q<16))return A.a(B.G,q)
p=B.G[q]
n=B.a.j(p,1)
m=B.a.j(p,4)&4095
k.b4(a,b,c,m)
c+=m
k.aE(4-(n&7))}else if(o===15)throw A.h(A.o("TIFFFaxDecoder2"))
else{k.b4(a,b,c,m)
c+=m
k.aE(9-o)
if((p&1)===0){B.c.h(k.f,k.d++,c)
r=l}}}else{if(m===200){q=k.aX(2)
if(!(q<4))return A.a(B.a6,q)
p=B.a6[q]
m=p>>>5&2047
k.b4(a,b,c,m)
c+=m
k.aE(2-(p>>>1&15))
B.c.h(k.f,k.d++,c)}else{k.b4(a,b,c,m)
c+=m
k.aE(4-(p>>>1&15))
B.c.h(k.f,k.d++,c)}r=l}}if(c===s){if(k.z===2)if(k.w!==0){s=k.x
s.toString
k.x=s+1
k.w=0}break}}B.c.h(k.f,k.d++,c)},
jD(a1,a2,a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0=this
a0.r=a2
a0.z=3
a0.x=a0.w=0
s=a0.a
r=B.a.V(s+7,8)
q=A.K(2,null,!1,t.I)
a0.at=a5&1
a0.as=a5>>>2&1
if(a0.eV()!==1)throw A.h(A.o("TIFFFaxDecoder3"))
a0.dt(a1,0,a3)
for(p=r,o=1;o<a4;++o){if(a0.eV()===0){n=a0.e
a0.e=a0.f
a0.f=n
a0.y=0
m=a3
l=-1
k=!0
j=0
for(;;){m.toString
if(!(m<s))break
a0.eJ(l,k,q)
i=q[0]
h=q[1]
g=a0.aX(7)
if(!(g<128))return A.a(B.ab,g)
g=B.ab[g]&255
f=g>>>3&15
e=g&7
if(f===0){if(!k){h.toString
a0.b4(a1,p,m,h-m)}a0.aE(7-e)
m=h
l=m}else if(f===1){a0.aE(7-e)
d=j+1
c=d+1
if(k){m+=a0.cW()
B.c.h(a0.f,j,m)
b=a0.cV()
a0.b4(a1,p,m,b)
m+=b
B.c.h(a0.f,d,m)}else{b=a0.cV()
a0.b4(a1,p,m,b)
m+=b
B.c.h(a0.f,j,m)
m+=a0.cW()
B.c.h(a0.f,d,m)}j=c
l=m}else{if(f<=8){i.toString
a=i+(f-5)
d=j+1
B.c.h(a0.f,j,a)
k=!k
if(k)a0.b4(a1,p,m,a-m)
a0.aE(7-e)}else throw A.h(A.o("TIFFFaxDecoder4"))
m=a
j=d
l=m}}B.c.h(a0.f,j,m)
a0.d=j+1}else a0.dt(a1,p,a3)
p+=r}},
jH(a5,a6,a7,a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this
a4.r=a6
a4.z=4
a4.x=a4.w=0
s=a4.a
r=B.a.V(s+7,8)
q=A.K(2,null,!1,t.I)
p=a4.f
a4.d=0
a4.d=1
B.c.h(p,0,s)
B.c.h(p,a4.d++,s)
for(o=0,n=0;n<a8;++n){m=a4.e
a4.e=a4.f
a4.f=m
a4.y=0
l=a7
k=-1
j=!0
i=0
for(;;){l.toString
if(!(l<s))break
a4.eJ(k,j,q)
h=q[0]
g=q[1]
f=a4.aX(7)
if(!(f<128))return A.a(B.ab,f)
f=B.ab[f]&255
e=f>>>3&15
d=f&7
if(e===0){if(!j){g.toString
a4.b4(a5,o,l,g-l)}a4.aE(7-d)
l=g
k=l}else if(e===1){a4.aE(7-d)
c=i+1
b=c+1
if(j){l+=a4.cW()
B.c.h(m,i,l)
a=a4.cV()
a4.b4(a5,o,l,a)
l+=a
B.c.h(m,c,l)}else{a=a4.cV()
a4.b4(a5,o,l,a)
l+=a
B.c.h(m,i,l)
l+=a4.cW()
B.c.h(m,c,l)}i=b
k=l}else if(e<=8){h.toString
a0=h+(e-5)
c=i+1
B.c.h(m,i,a0)
j=!j
if(j)a4.b4(a5,o,l,a0-l)
a4.aE(7-d)
l=a0
i=c
k=l}else if(e===11){if(a4.aX(3)!==7)throw A.h(A.o("TIFFFaxDecoder5"))
for(a1=0,a2=!1;!a2;j=a3){while(a4.aX(1)!==1)++a1
if(a1>5){a1-=6
if(!j&&a1>0){c=i+1
B.c.h(m,i,l)
i=c}l+=a1
if(a1>0)j=!0
a3=a4.aX(1)===0
if(a3){if(!j){c=i+1
B.c.h(m,i,l)
i=c}}else if(j){c=i+1
B.c.h(m,i,l)
i=c}j=a3
a2=!0}a3=a1===5
if(a3){if(!j){c=i+1
B.c.h(m,i,l)
i=c}l+=a1}else{l+=a1
c=i+1
B.c.h(m,i,l)
a4.b4(a5,o,l,1);++l
i=c}}}else throw A.h(A.o("TIFFFaxDecoder5 "+e))}B.c.h(m,i,l)
a4.d=i+1
o+=r}},
cW(){var s,r,q,p,o,n,m=this
for(s=0,r=!0;r;){q=m.bP(10)
if(!(q<1024))return A.a(B.ad,q)
p=B.ad[q]
o=B.a.j(p,1)&15
if(o===12){q=(q<<2&12|m.aX(2))>>>0
if(!(q<16))return A.a(B.G,q)
p=B.G[q]
n=B.a.j(p,1)
s+=B.a.j(p,4)&4095
m.aE(4-(n&7))}else if(o===0)throw A.h(A.o("TIFFFaxDecoder0"))
else if(o===15)throw A.h(A.o("TIFFFaxDecoder1"))
else{s+=B.a.j(p,5)&2047
m.aE(10-o)
if((p&1)===0)r=!1}}return s},
cV(){var s,r,q,p,o,n,m,l=this
for(s=0,r=!1;!r;){q=l.aX(4)
if(!(q<16))return A.a(B.a7,q)
p=B.a7[q]
o=p>>>5&2047
if(o===100){q=l.bP(9)
if(!(q<512))return A.a(B.a9,q)
p=B.a9[q]
n=B.a.j(p,1)&15
m=B.a.j(p,5)
if(n===12){l.aE(5)
q=l.aX(4)
if(!(q<16))return A.a(B.G,q)
p=B.G[q]
m=B.a.j(p,1)
s+=B.a.j(p,4)&4095
l.aE(4-(m&7))}else if(n===15)throw A.h(A.o("TIFFFaxDecoder2"))
else{s+=m&2047
l.aE(9-n)
if((p&1)===0)r=!0}}else{if(o===200){q=l.aX(2)
if(!(q<4))return A.a(B.a6,q)
p=B.a6[q]
s+=p>>>5&2047
l.aE(2-(p>>>1&15))}else{s+=o
l.aE(4-(p>>>1&15))}r=!0}}return s},
eV(){var s,r,q=this,p="TIFFFaxDecoder8",o=q.as
if(o===0){if(q.bP(12)!==1)throw A.h(A.o("TIFFFaxDecoder6"))}else if(o===1){o=q.w
o.toString
s=8-o
if(q.bP(s)!==0)throw A.h(A.o(p))
if(s<4)if(q.bP(8)!==0)throw A.h(A.o(p))
while(r=q.bP(8),r!==1)if(r!==0)throw A.h(A.o(p))}if(q.at===0)return 1
else return q.aX(1)},
eJ(a,b,c){var s,r,q,p,o,n,m=this
t.dW.a(c)
s=m.e
r=m.d
q=m.y
p=q>0?q-1:0
p=b?(p&4294967294)>>>0:(p|1)>>>0
for(q=s.length,o=p;o<r;o+=2){if(!(o<q))return A.a(s,o)
n=s[o]
n.toString
a.toString
if(n>a){m.y=o
B.c.h(c,0,n)
break}}n=o+1
if(n<r){if(!(n<q))return A.a(s,n)
B.c.h(c,1,s[n])}},
b4(a,b,c,d){var s,r,q,p,o,n=8*b+A.w(c),m=n+d,l=B.a.j(n,3),k=n&7
if(k>0){s=B.a.a_(1,7-k)
r=J.c(a.a,a.d+l)
for(;;){if(!(s>0&&n<m))break
r=(r|s)>>>0
s=s>>>1;++n}a.h(0,l,r)}l=B.a.j(n,3)
for(q=m-7;n<q;l=p){p=l+1
J.x(a.a,a.d+l,255)
n+=8}while(n<m){l=B.a.j(n,3)
q=J.c(a.a,a.d+l)
o=B.a.a_(1,7-(n&7))
J.x(a.a,a.d+l,(q|o)>>>0);++n}},
bP(a){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e=f.r
e===$&&A.d()
s=e.d
r=e.c-s-1
q=f.x
p=f.c
o=0
n=0
if(p===1){q.toString
m=J.c(e.a,s+q)
if(!(q===r)){e=q+1
s=f.r
p=s.a
s=s.d
if(e===r)o=J.c(p,s+e)
else{o=J.c(p,s+e)
e=f.r
n=J.c(e.a,e.d+(q+2))}}}else if(p===2){q.toString
m=B.T[J.c(e.a,s+q)&255]
if(!(q===r)){e=q+1
s=f.r
p=s.a
s=s.d
if(e===r)o=B.T[J.c(p,s+e)&255]
else{o=B.T[J.c(p,s+e)&255]
e=f.r
n=B.T[J.c(e.a,e.d+(q+2))&255]}}}else throw A.h(A.o("TIFFFaxDecoder7"))
e=f.w
e.toString
l=8-e
k=a-l
if(k>8){j=k-8
i=8}else{i=k
j=0}e=f.x
e.toString
e=f.x=e+1
if(!(l>=0&&l<9))return A.a(B.y,l)
h=B.a.a_(m&B.y[l],k)
if(!(i>=0))return A.a(B.R,i)
g=B.a.a3(o&B.R[i],8-i)
if(j!==0){g=B.a.a_(g,j)
if(!(j<9))return A.a(B.R,j)
g|=B.a.a3(n&B.R[j],8-j)
f.x=e+1
f.w=j}else if(i===8){f.w=0
f.x=e+1}else f.w=i
return(h|g)>>>0},
aX(a){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.r
h===$&&A.d()
s=h.d
r=h.c-s-1
q=i.x
p=i.c
o=0
if(p===1){q.toString
n=J.c(h.a,s+q)
if(!(q===r)){h=i.r
o=J.c(h.a,h.d+(q+1))}}else if(p===2){q.toString
n=B.T[J.c(h.a,s+q)&255]
if(!(q===r)){h=i.r
o=B.T[J.c(h.a,h.d+(q+1))&255]}}else throw A.h(A.o("TIFFFaxDecoder7"))
h=i.w
h.toString
m=8-h
l=a-m
k=m-a
if(k>=0){if(!(m>=0&&m<9))return A.a(B.y,m)
j=B.a.a3(n&B.y[m],k)
h+=a
i.w=h
if(h===8){i.w=0
h=i.x
h.toString
i.x=h+1}}else{if(!(m>=0&&m<9))return A.a(B.y,m)
j=B.a.a_(n&B.y[m],-k)
if(!(l>=0&&l<9))return A.a(B.R,l)
j=(j|B.a.a3(o&B.R[l],8-l))>>>0
h=i.x
h.toString
i.x=h+1
i.w=l}return j},
aE(a){var s,r=this,q=r.w
q.toString
s=q-a
if(s<0){q=r.x
q.toString
r.x=q-1
r.w=8+s}else r.w=s}}
A.hR.prototype={
hm(a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d=this,c=null,b=A.p(a0,c,0),a=a0.p()
for(s=d.a,r=0;r<a;++r){q=a0.p()
p=a0.p()
o=a0.k()
if(p>13){a0.d+=4
continue}n=B.bB[p]
if(o*B.t[p]>4)m=a0.k()
else{m=a0.d
a0.d=m+4}l=new A.hQ(q,n,o,m,b)
s.h(0,q,l)
if(q===256){k=l.bh()
k=k==null?c:k.i(0)
d.b=k==null?0:k}else if(q===257){k=l.bh()
k=k==null?c:k.i(0)
d.c=k==null?0:k}else if(q===262){j=l.bh()
i=j==null?c:j.i(0)
if(i==null)i=17
if(i<17){if(!(i>=0))return A.a(B.bv,i)
d.d=B.bv[i]}else d.d=B.aL}else if(q===259){k=l.bh()
k=k==null?c:k.i(0)
d.e=k==null?0:k}else if(q===258){k=l.bh()
k=k==null?c:k.i(0)
d.f=k==null?0:k}else if(q===277){k=l.bh()
k=k==null?c:k.i(0)
d.r=k==null?0:k}else if(q===317){k=l.bh()
k=k==null?c:k.i(0)
d.Q=k==null?0:k}else if(q===339){k=l.bh()
j=k==null?c:k.i(0)
if(j==null)j=0
if(!(j>=0&&j<4))return A.a(B.bz,j)
d.x=B.bz[j]}else if(q===320){j=l.bh()
if(j!=null){k=J.oY(B.f.gA(j.bj()))
d.id=k
d.k1=0
k=k.length/3|0
d.k2=k
d.k3=k*2}}}k=d.id
h=k!=null
if(h&&d.d===B.aM)d.r=1
if(d.b===0||d.c===0)return
if(h&&d.f===8){g=k.length
for(h=k.$flags|0,r=0;r<g;++r){f=k[r]
h&2&&A.b(k)
k[r]=f>>>8}}if(d.d===B.aK)d.z=!0
d.w=d.r
if(s.Z(324)){d.ay=d.cd(322)
d.ch=d.cd(323)
d.CW=d.d3(324)
d.cx=d.d3(325)}else{d.ay=d.d2(322,d.b)
if(!s.Z(278))d.ch=d.d2(323,d.c)
else{e=d.cd(278)
if(e===-1)d.ch=d.c
else d.ch=e}d.CW=d.d3(273)
d.cx=d.d3(279)}k=d.b
h=d.ay
d.cy=B.a.an(k+h-1,h)
h=d.c
k=d.ch
d.db=B.a.an(h+k-1,k)
d.dy=d.d2(266,1)
d.fr=d.cd(292)
d.fx=d.cd(293)
d.cd(338)
switch(d.d.a){case 0:case 1:s=d.f
if(s===1&&d.r===1)d.y=B.aJ
else if(s===4&&d.r===1)d.y=B.kd
else if(B.a.Y(s,8)===0){s=d.r
if(s===1)d.y=B.ke
else if(s===2)d.y=B.kf
else d.y=B.a2}break
case 2:if(B.a.Y(d.f,8)===0){s=d.r
if(s===3)d.y=B.cf
else if(s===4)d.y=B.kh
else d.y=B.a2}break
case 3:s=!1
if(d.r===1)if(d.id!=null){s=d.f
s=s===4||s===8||s===16}if(s)d.y=B.kg
break
case 4:if(d.f===1&&d.r===1)d.y=B.aJ
break
case 6:if(d.e===7&&d.f===8&&d.r===3)d.y=B.cf
else{if(s.Z(530)){j=s.m(0,530).bh()
d.as=j.i(0)
s=d.at=j.a6(0,1)}else s=d.at=d.as=2
k=d.as
k===$&&A.d()
if(k*s===1)d.y=B.a2
else if(d.f===8&&d.r===3)d.y=B.ki}break
case 5:if(B.a.Y(d.f,8)===0)d.y=B.a2
s=d.r
if(s===4)d.w=3
else if(s===5)d.w=4
break
default:if(B.a.Y(d.f,8)===0)d.y=B.a2
break}},
bR(a3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=this,a=null,a0=b.x,a1=a0===B.a1,a2=a0===B.h
a0=b.f
if(a0===1)s=B.w
else if(a0===2)s=B.B
else{if(a0===4)a0=B.C
else if(a1&&a0===16)a0=B.E
else if(a1&&a0===32)a0=B.J
else if(a1&&a0===64)a0=B.L
else if(a2&&a0===8)a0=B.M
else if(a2&&a0===16)a0=B.N
else if(a2&&a0===32)a0=B.O
else if(a0===16)a0=B.l
else a0=a0===32?B.K:B.e
s=a0}r=b.id!=null&&b.d===B.aM
q=r?3:b.w
a0=b.b
p=A.P(a,a,s,0,B.i,b.c,a,0,q,a,s,a0,r)
if(r){a0=p.a
a0=a0==null?a:a0.gT()
a0.toString
o=b.id
n=o.length
m=n/3|0
l=b.k1
l===$&&A.d()
k=b.k2
k===$&&A.d()
j=b.k3
j===$&&A.d()
for(i=j,h=k,g=l,f=0;f<m;++f,++g,++h,++i){if(i>=n)break
if(!(g<n))return A.a(o,g)
l=o[g]
if(!(h<n))return A.a(o,h)
a0.bd(f,l,o[h],o[i])}}e=0
d=0
for(;;){a0=b.db
a0===$&&A.d()
if(!(e<a0))break
c=0
for(;;){a0=b.cy
a0===$&&A.d()
if(!(c<a0))break
b.i7(a3,p,c,e);++c;++d}++e}return p},
i7(b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0=this,b1=null
if(b0.y===B.aJ){b0.hV(b2,b3,b4,b5)
return}p=b0.cy
p===$&&A.d()
o=b5*p+b4
p=b0.CW
if(!(o>=0&&o<p.length))return A.a(p,o)
b2.d=p[o]
p=b0.ay
n=b4*p
m=b0.ch
l=b5*m
k=b0.cx
if(!(o<k.length))return A.a(k,o)
s=k[o]
j=p*m*b0.r
p=b0.f
m=p===16
if(m)j*=2
else if(p===32)j*=4
r=null
if(p===8||m||p===32||p===64){p=b0.e
if(p===1)r=b2
else if(p===5){r=A.t(new Uint8Array(j),!1,b1,0)
q=A.no()
try{q.fs(A.p(b2,s,0),r.a)}catch(i){}if(b0.Q===2)for(h=0;h<b0.ch;++h){g=b0.r
p=b0.ay
f=g*(h*p+1)
e=p*g
for(;g<e;++g){p=r
m=J.c(p.a,p.d+f)
k=r
d=b0.r
d=J.c(k.a,k.d+(f-d))
J.x(p.a,p.d+f,m+d);++f}}}else if(p===32773){r=A.t(new Uint8Array(j),!1,b1,0)
b0.ex(b2,j,r.a)}else if(p===32946)r=A.t(B.D.bS(b2.cG(0,0,s)),!1,b1,0)
else if(p===8)r=A.t(B.D.bS(b2.cG(0,0,s)),!1,b1,0)
else if(p===6||p===7){b0.iC(new A.hj().bR(t.D.a(b2.cG(0,0,s))),b3,n,l,b0.ay,b0.ch)
return}else throw A.h(A.o("Unsupported Compression Type: "+p))
c=A.k([0,0,0],t.t)
for(b=l,a=0;a<b0.ch;++a,++b)for(a0=n,a1=0;a1<b0.ay;++a1,++a0){p=r
if(p.d>=p.c||a0>=b0.b||b>=b0.c)break
p=b0.r
if(p===1){p=b0.x
if(p===B.a1){p=b0.f
if(p===32){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.c2()
if(0>=p.length)return A.a(p,0)
a2=p[0]}else if(p===64)a2=r.dg()
else if(p===16){p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a2=m[p]}else a2=0
if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.aK(a0,b,a2)}}else{m=b0.f
if(m===8)if(p===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a2=p[0]}else{p=r
a2=J.c(p.a,p.d++)}else if(m===16)if(p===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a2=p[0]}else a2=r.p()
else if(m===32)if(p===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a2=p[0]}else a2=r.k()
else a2=0
if(b0.d===B.aK){p=b3.a
a3=p==null?b1:p.gE()
a2=(a3==null?0:a3)-a2}if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.aK(a0,b,a2)}}}else if(p===2){p=b0.f
if(p===8){if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a4=p[0]}else{p=r
a4=J.c(p.a,p.d++)}if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a5=p[0]}else{p=r
a5=J.c(p.a,p.d++)}}else if(p===16){if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a4=p[0]}else a4=r.p()
if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a5=p[0]}else a5=r.p()}else if(p===32){if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a4=p[0]}else a4=r.k()
if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a5=p[0]}else a5=r.k()}else{a4=0
a5=0}if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.a5(a0,b,a4,a5,0)}}else if(p===3){p=b0.x
if(p===B.a1){p=b0.f
if(p===32){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.c2()
if(0>=p.length)return A.a(p,0)
a6=p[0]
m[0]=r.k()
a7=p[0]
m[0]=r.k()
a8=p[0]}else{a7=0
a8=0
if(p===64)a6=r.dg()
else if(p===16){p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a6=m[p]
p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a7=m[p]
p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a8=m[p]}else a6=0}if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.a5(a0,b,a6,a7,a8)}}else{m=b0.f
if(m===8){if(p===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a6=p[0]}else{p=r
a6=J.c(p.a,p.d++)}if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a7=p[0]}else{p=r
a7=J.c(p.a,p.d++)}if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a8=p[0]}else{p=r
a8=J.c(p.a,p.d++)}}else if(m===16){if(p===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a6=p[0]}else a6=r.p()
if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a7=p[0]}else a7=r.p()
if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a8=p[0]}else a8=r.p()}else if(m===32){if(p===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a6=p[0]}else a6=r.k()
if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a7=p[0]}else a7=r.k()
if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a8=p[0]}else a8=r.k()}else{a6=0
a7=0
a8=0}if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.a5(a0,b,a6,a7,a8)}}}else if(p>=4)if(b0.x===B.a1){p=b0.f
if(p===32){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.c2()
if(0>=p.length)return A.a(p,0)
a6=p[0]
m[0]=r.k()
a7=p[0]
m[0]=r.k()
a8=p[0]
m[0]=r.k()
a9=p[0]}else{a7=0
a8=0
a9=0
if(p===64)a6=r.dg()
else if(p===16){p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a6=m[p]
p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a7=m[p]
p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a8=m[p]
p=r.p()
m=$.T
m=m!=null?m:A.X()
if(!(p<m.length))return A.a(m,p)
a9=m[p]}else a6=0}if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.aj(a0,b,a6,a7,a8,a9)}}else{p=b3.a
a5=p==null?b1:p.gE()
if(a5==null)a5=0
p=b0.f
if(p===8){if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a6=p[0]}else{p=r
a6=J.c(p.a,p.d++)}if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a7=p[0]}else{p=r
a7=J.c(p.a,p.d++)}if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a8=p[0]}else{p=r
a8=J.c(p.a,p.d++)}if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a9=p[0]}else{p=r
a9=J.c(p.a,p.d++)}if(b0.r===5)if(b0.x===B.h){p=r
p=J.c(p.a,p.d++)
m=$.at()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aF()
if(0>=p.length)return A.a(p,0)
a5=p[0]}else{p=r
a5=J.c(p.a,p.d++)}}else if(p===16){if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a6=p[0]}else a6=r.p()
if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a7=p[0]}else a7=r.p()
if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a8=p[0]}else a8=r.p()
if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a9=p[0]}else a9=r.p()
if(b0.r===5)if(b0.x===B.h){p=r.p()
m=$.as()
m.$flags&2&&A.b(m)
m[0]=p
p=$.aE()
if(0>=p.length)return A.a(p,0)
a5=p[0]}else a5=r.p()}else if(p===32){if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a6=p[0]}else a6=r.k()
if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a7=p[0]}else a7=r.k()
if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a8=p[0]}else a8=r.k()
if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a9=p[0]}else a9=r.k()
if(b0.r===5)if(b0.x===B.h){p=r.k()
m=$.O()
m.$flags&2&&A.b(m)
m[0]=p
p=$.a9()
if(0>=p.length)return A.a(p,0)
a5=p[0]}else a5=r.k()}else{a6=0
a7=0
a8=0
a9=0}if(b0.d===B.cg){A.oo(a6,a7,a8,a9,c)
a6=c[0]
a7=c[1]
a8=c[2]
a9=a5}if(a0<b0.b&&b<b0.c){p=b3.a
if(p!=null)p.aj(a0,b,a6,a7,a8,a9)}}}}else throw A.h(A.o("Unsupported bitsPerSample: "+p))},
iC(a,b,c,d,e,f){var s,r,q,p
for(s=0;s<f;++s)for(r=s+d,q=0;q<e;++q){p=a.a
p=p==null?null:p.O(q,s,null)
if(p==null)p=new A.J()
b.bM(q+c,r,p)}},
hV(a5,a6,a7,a8){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=null,a4=a2.cy
a4===$&&A.d()
r=a8*a4+a7
a4=a2.CW
if(!(r>=0&&r<a4.length))return A.a(a4,r)
a5.d=a4[r]
a4=a2.ay
q=a7*a4
p=a2.ch
o=a8*p
n=a2.cx
if(!(r<n.length))return A.a(n,r)
m=n[r]
s=null
n=a2.e
if(n===32773){l=B.a.Y(a4,8)===0?B.a.V(a4,8)*p:(B.a.V(a4,8)+1)*p
s=A.t(new Uint8Array(a4*p),!1,a3,0)
a2.ex(a5,l,s.a)}else if(n===5){s=A.t(new Uint8Array(a4*p),!1,a3,0)
A.no().fs(A.p(a5,m,0),s.a)
if(a2.Q===2)for(k=0;k<a2.c;++k){j=a2.r
i=j*(k*a2.b+1)
for(;j<a2.b*a2.r;++j){a4=s
p=J.c(a4.a,a4.d+i)
n=s
h=a2.r
h=J.c(n.a,n.d+(i-h))
J.x(a4.a,a4.d+i,p+h);++i}}}else if(n===2){s=A.t(new Uint8Array(a4*p),!1,a3,0)
try{A.m9(a2.dy,a4,p).jC(s,a5,0,a2.ch)}catch(g){}}else if(n===3){s=A.t(new Uint8Array(a4*p),!1,a3,0)
try{A.m9(a2.dy,a4,p).jD(s,a5,0,a2.ch,a2.fr)}catch(g){}}else if(n===4){s=A.t(new Uint8Array(a4*p),!1,a3,0)
try{A.m9(a2.dy,a4,p).jH(s,a5,0,a2.ch,a2.fx)}catch(g){}}else if(n===8)s=A.t(B.D.bS(a5.cG(0,0,m)),!1,a3,0)
else if(n===32946)s=A.t(B.D.bS(a5.cG(0,0,m)),!1,a3,0)
else if(n===1)s=a5
else throw A.h(A.o("Unsupported Compression Type: "+n))
f=new A.js(s)
e=a6.gE()
a4=a2.z
d=a4?e:0
c=a4?0:e
for(b=o,a=0;a<a2.ch;++a,++b){for(a0=q,a1=0;a1<a2.ay;++a1,++a0){a4=a6.a
p=a4==null
n=p?a3:a4.b
if(b<(n==null?0:n)){a4=p?a3:a4.a
a4=a0>=(a4==null?0:a4)}else a4=!0
if(a4)break
a4=f.af(1)
p=a6.a
if(a4===0){if(p!=null)p.a5(a0,b,d,0,0)}else if(p!=null)p.a5(a0,b,c,0,0)}f.c=0}},
ex(a,b,c){var s,r,q,p,o,n,m,l,k,j
t.L.a(c)
for(s=J.ai(c),r=0,q=0;q<b;){p=r+1
o=J.c(a.a,a.d+r)
n=$.at()
n.$flags&2&&A.b(n)
n[0]=o
o=$.aF()
if(0>=o.length)return A.a(o,0)
m=o[0]
if(m>=0&&m<=127)for(o=m+1,r=p,l=0;l<o;++l,q=k,r=p){k=q+1
p=r+1
s.h(c,q,J.c(a.a,a.d+r))}else{o=m<=-1&&m>=-127
r=p+1
if(o){j=J.c(a.a,a.d+p)
for(o=-m+1,l=0;l<o;++l,q=k){k=q+1
s.h(c,q,j)}}}}},
d2(a,b){var s=this.a
if(!s.Z(a))return b
s=s.m(0,a).bh()
s=s==null?null:s.i(0)
return s==null?0:s},
cd(a){return this.d2(a,0)},
d3(a){var s,r=this.a
if(!r.Z(a))return null
s=r.m(0,a)
r=s.bh()
r.toString
return A.nm(s.c,r.gbB(r),t.p)}}
A.cD.prototype={
ae(){return"TiffFormat."+this.b}}
A.aa.prototype={
ae(){return"TiffPhotometricType."+this.b}}
A.aZ.prototype={
ae(){return"TiffImageType."+this.b}}
A.hS.prototype={$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.j1.prototype={
fs(a,b){var s,r,q,p,o,n,m,l,k=this
t.L.a(b)
k.r=b
s=J.bl(b)
k.w=0
r=t.D.a(a.a)
k.e=r
q=k.f=r.length
k.b=a.d
if(0>=q)return A.a(r,0)
if(r[0]===0){if(1>=q)return A.a(r,1)
r=r[1]===1}else r=!1
if(r)throw A.h(A.o("Invalid LZW Data"))
k.eN()
k.d=k.c=0
p=k.dD()
r=k.x
o=0
for(;;){if(!(p!==257&&k.w<s))break
if(p===256){k.eN()
p=k.dD()
k.as=0
if(p===257)break
J.x(k.r,k.w++,p)
o=p}else{q=k.Q
q.toString
if(p<q){k.eL(p)
q=k.as
q===$&&A.d()
n=q-1
for(;n>=0;--n){q=k.r
m=k.w++
if(!(n<4096))return A.a(r,n)
J.x(q,m,r[n])}q=k.as-1
if(!(q>=0&&q<4096))return A.a(r,q)
k.ef(o,r[q])}else{k.eL(o)
q=k.as
q===$&&A.d()
n=q-1
for(;n>=0;--n){q=k.r
m=k.w++
if(!(n<4096))return A.a(r,n)
J.x(q,m,r[n])}q=k.r
m=k.w++
l=k.as-1
if(!(l>=0&&l<4096))return A.a(r,l)
J.x(q,m,r[l])
l=k.as-1
if(!(l>=0&&l<4096))return A.a(r,l)
k.ef(o,r[l])}o=p}p=k.dD()}},
ef(a,b){var s,r=this,q=r.y
q===$&&A.d()
s=r.Q
s.toString
q.$flags&2&&A.b(q)
if(!(s<4096))return A.a(q,s)
q[s]=b
q=r.z
q===$&&A.d()
q.$flags&2&&A.b(q)
q[s]=a
s=r.Q=s+1
if(s===511)r.a=10
else if(s===1023)r.a=11
else if(s===2047)r.a=12},
eL(a){var s,r,q,p,o,n,m,l=this
l.as=0
s=l.x
l.as=1
r=l.y
r===$&&A.d()
if(!(a<4096))return A.a(r,a)
q=r[a]
s.$flags&2&&A.b(s)
s[0]=q
q=l.z
q===$&&A.d()
p=q[a]
for(o=1;p!==4098;o=n){n=o+1
l.as=n
if(!(p>=0&&p<4096))return A.a(r,p)
m=r[p]
if(!(o<4096))return A.a(s,o)
s[o]=m
p=q[p]}},
dD(){var s,r,q,p,o=this,n=o.b,m=o.f
m===$&&A.d()
if(n>=m)return 257
for(;s=o.d,r=o.a,s<r;n=p){if(n>=m)return 257
r=o.c
q=o.e
q===$&&A.d()
p=n+1
o.b=p
if(!(n>=0&&n<q.length))return A.a(q,n)
o.c=(r<<8>>>0)+q[n]>>>0
o.d=s+8}n=s-r
o.d=n
n=B.a.a3(o.c,n)
r-=9
if(!(r>=0&&r<4))return A.a(B.bf,r)
return n&B.bf[r]},
eN(){var s,r,q=this
q.y=new Uint8Array(4096)
s=new Uint32Array(4096)
q.z=s
B.p.aF(s,0,4096,4098)
for(s=q.y,r=0;r<256;++r){s.$flags&2&&A.b(s)
s[r]=r}q.a=9
q.Q=258}}
A.jt.prototype={
aA(a){var s=this,r=A.t(a,!1,null,0)
s.c=r
r=s.dK(r)
s.a=r
if(r!=null)s.b=A.iA(A.t(a,!1,null,0))
return s.a},
ak(a){var s,r,q=this.a
if(q==null)return null
q=q.f
if(!(a<q.length))return A.a(q,a)
q=q[a]
s=this.c
s===$&&A.d()
r=q.bR(s)
q=this.b
if(q!=null)r.e=q
return r},
aY(a,b){var s,r,q,p=this,o=null,n=A.t(a,!1,o,0)
p.c=n
n=p.a=p.dK(n)
if(n==null)return o
s=n.f.length
r=p.ak(0)
if(r==null)return o
r.e=A.iA(A.t(a,!1,o,0))
r.w=B.aZ
for(q=1;q<s;++q)r.b5(p.ak(q))
return r},
dK(a){var s,r,q,p,o,n,m,l,k,j,i=null,h=A.k([],t.fZ),g=new A.hS(h),f=a.p()
if(f!==18761&&f!==19789)return i
if(f===19789)a.e=!0
else a.e=!1
q=a.p()
g.d=q
if(q!==42)return i
p=a.k()
o=A.p(a,i,0)
o.d=p
s=o
for(q=t.p,n=t.e8;p!==0;){r=null
try{m=new A.hR(A.H(q,n),B.aL,B.ce,B.kj)
m.hm(s)
r=m
l=r
if(!(l.b!==0&&l.c!==0))break}catch(k){break}B.c.I(h,r)
l=h.length
if(l===1){if(0>=l)return A.a(h,0)
j=h[0]
g.a=j.b
if(0>=l)return A.a(h,0)
g.b=j.c}p=s.k()
if(p!==0)s.d=p}return h.length!==0?g:i}}
A.jx.prototype={
cu(){var s,r=this.a,q=r.bi()
if((q&1)!==0)return!1
if((q>>>1&7)>3)return!1
if((q>>>4&1)===0)return!1
this.f.d=q>>>5
if(r.bi()!==2752925)return!1
s=this.b
s.a=r.p()
s.b=r.p()
return!0},
bJ(){var s,r,q,p=this,o=null
if(!p.ir())return o
s=p.b
r=s.a
p.d=A.P(o,o,B.e,0,B.i,s.b,o,0,4,o,B.e,r,!1)
p.ix()
if(!p.iJ())return o
s=s.w
if(s.length!==0){q=A.t(new A.b4(s),!1,o,0)
s=p.d
s.toString
s.e=A.iA(q)}return p.d},
ir(){var s,r,q,p,o=this
if(!o.cu())return!1
o.fr=A.qX()
for(s=o.dy,r=0;r<4;++r){q=new Int32Array(2)
p=new Int32Array(2)
B.c.h(s,r,new A.hZ(q,p,new Int32Array(2)))}o.y=o.Q=0
s=o.b
q=s.a
o.z=q
s=s.b
o.as=s
o.at=q+15>>>4
o.ax=s+15>>>4
o.k1=0
s=o.a
q=o.f
p=q.d
p===$&&A.d()
p=A.nH(s.am(p))
o.c=p
s.d+=q.d
p.a0(1)
o.c.a0(1)
o.iP(o.x,o.fr)
o.iI()
if(!o.iL(s))return!1
o.iN()
o.c.a0(1)
o.iM()
return!0},
iP(a,b){var s,r,q,p=this,o=p.c
o===$&&A.d()
o=o.a0(1)!==0
a.a=o
if(o){a.b=p.c.a0(1)!==0
if(p.c.a0(1)!==0){a.c=p.c.a0(1)!==0
for(o=a.d,s=0;s<4;++s){if(p.c.a0(1)!==0){r=p.c
q=r.a0(7)
r=r.a0(1)===1?-q:q}else r=0
o.$flags&2&&A.b(o)
o[s]=r}for(o=a.e,s=0;s<4;++s){if(p.c.a0(1)!==0){r=p.c
q=r.a0(6)
r=r.a0(1)===1?-q:q}else r=0
o.$flags&2&&A.b(o)
o[s]=r}}if(a.b)for(s=0;s<3;++s){o=b.a
r=p.c.a0(1)!==0?p.c.a0(8):255
o.$flags&2&&A.b(o)
o[s]=r}}else a.b=!1
return!0},
iI(){var s,r,q,p=this,o=p.w,n=p.c
n===$&&A.d()
o.a=n.a0(1)!==0
o.b=p.c.a0(6)
o.c=p.c.a0(3)
n=p.c.a0(1)!==0
o.d=n
if(n)if(p.c.a0(1)!==0){for(n=o.e,s=0;s<4;++s)if(p.c.a0(1)!==0){r=p.c
q=r.a0(6)
r=r.a0(1)===1?-q:q
n.$flags&2&&A.b(n)
n[s]=r}for(n=o.f,s=0;s<4;++s)if(p.c.a0(1)!==0){r=p.c
q=r.a0(6)
r=r.a0(1)===1?-q:q
n.$flags&2&&A.b(n)
n[s]=r}}if(o.b===0)n=0
else n=o.a?1:2
p.c4=n
return!0},
iL(a){var s,r,q,p,o,n,m,l=a.c-a.d,k=this.c
k===$&&A.d()
k=B.a.S(1,k.a0(2))
this.cy=k
s=k-1
r=s*3
if(l<r)return!1
for(k=this.db,q=0,p=0;p<s;++p,r=n){o=a.cQ(3,q)
n=r+((J.c(o.a,o.d)|J.c(o.a,o.d+1)<<8|J.c(o.a,o.d+2)<<16)>>>0)
if(n>l)n=l
m=new A.f_(a.bW(n-r,r))
m.b=254
m.c=0
m.d=-8
B.c.h(k,p,m)
q+=3}B.c.h(k,s,A.nH(a.bW(l-r,a.d-a.b+r)))
return r<l},
iN(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=this,e=f.c
e===$&&A.d()
s=e.a0(7)
r=f.c.a0(1)!==0?f.c.cg(4):0
q=f.c.a0(1)!==0?f.c.cg(4):0
p=f.c.a0(1)!==0?f.c.cg(4):0
o=f.c.a0(1)!==0?f.c.cg(4):0
n=f.c.a0(1)!==0?f.c.cg(4):0
m=f.x
for(e=f.dy,l=m.d,k=0;k<4;++k){if(m.a){j=l[k]
if(!m.c)j+=s}else{if(k>0){i=e[0]
if(!(k>=0&&k<4))return A.a(e,k)
e[k]=i
continue}j=s}h=e[k]
i=h.a
g=j+r
if(g<0)g=0
else if(g>127)g=127
g=B.az[g]
i.$flags&2&&A.b(i)
i[0]=g
if(j<0)g=0
else g=j>127?127:j
i[1]=B.aA[g]
g=h.b
i=j+q
if(i<0)i=0
else if(i>127)i=127
i=B.az[i]
g.$flags&2&&A.b(g)
g[0]=i*2
i=j+p
if(i<0)i=0
else if(i>127)i=127
g[1]=B.aA[i]*101581>>>16
if(g[1]<8)g[1]=8
i=h.c
g=j+o
if(g<0)g=0
else if(g>117)g=117
g=B.az[g]
i.$flags&2&&A.b(i)
i[0]=g
g=j+n
if(g<0)g=0
else if(g>127)g=127
i[1]=B.aA[g]}},
iM(){var s,r,q,p,o,n,m=this,l=m.fr
for(s=0;s<4;++s)for(r=0;r<8;++r)for(q=0;q<3;++q)for(p=0;p<11;++p){o=m.c
o===$&&A.d()
n=o.a8(B.iQ[s][r][q][p])!==0?m.c.a0(8):B.e_[s][r][q][p]
o=l.b
if(!(s<o.length))return A.a(o,s)
o=o[s]
if(!(r<o.length))return A.a(o,r)
o=o[r].a
if(!(q<o.length))return A.a(o,q)
o=o[q]
o.$flags&2&&A.b(o)
o[p]=n}o=m.c
o===$&&A.d()
o=o.a0(1)!==0
m.fx=o
if(o)m.fy=m.c.a0(8)},
iR(){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=g.c4
f.toString
if(f>0){s=g.w
for(f=s.e,r=s.f,q=g.x,p=q.e,o=0;o<4;++o){if(q.a){n=p[o]
if(!q.c){m=s.b
m.toString
n+=m}}else n=s.b
for(l=0;l<=1;++l){m=g.dS
m===$&&A.d()
if(!(o<m.length))return A.a(m,o)
k=m[o][l]
m=s.d
m===$&&A.d()
if(m){n.toString
j=n+f[0]
if(l!==0)j+=r[0]}else j=n
j.toString
if(j<0)j=0
else if(j>63)j=63
if(j>0){m=s.c
m===$&&A.d()
if(m>0){i=m>4?B.a.j(j,2):B.a.j(j,1)
h=9-m
if(i>h)i=h}else i=j
if(i<1)i=1
k.b=i
k.a=2*j+i
if(j>=40)m=2
else m=j>=15?1:0
k.d=m}else k.a=0
k.c=l!==0}}}},
ix(){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null,f=h.b,e=f.at
if(e!=null)h.dT=e
s=J.ar(4,t.jz)
for(e=t.by,r=0;r<4;++r)s[r]=A.k([new A.bH(),new A.bH()],e)
h.dS=t.mL.a(s)
e=h.at
e.toString
s=J.ar(e,t.ij)
for(q=0;q<e;++q){p=new Uint8Array(16)
o=new Uint8Array(8)
s[q]=new A.f3(p,o,new Uint8Array(8))}h.k2=t.f4.a(s)
h.ok=new Uint8Array(832)
e=h.at
e.toString
h.go=new Uint8Array(4*e)
p=h.p4=16*e
o=h.R8=8*e
n=h.c4
n.toString
if(!(n<3))return A.a(B.a5,n)
m=B.a5[n]
l=m*p
k=(m/2|0)*o
h.p1=A.t(new Uint8Array(16*p+l),!1,g,l)
p=8*o+k
h.p2=A.t(new Uint8Array(p),!1,g,k)
h.p3=A.t(new Uint8Array(p),!1,g,k)
f=f.a
h.RG=A.t(new Uint8Array(f),!1,g,0)
j=f+1>>>1
h.rx=A.t(new Uint8Array(j),!1,g,0)
h.ry=A.t(new Uint8Array(j),!1,g,0)
if(n===2)h.ch=h.ay=0
else{f=B.a.V(h.y-m,16)
h.ay=f
p=B.a.V(h.Q-m,16)
h.ch=p
if(f<0)h.ay=0
if(p<0)h.ch=0}f=B.a.V(h.as+15+m,16)
h.cx=f
p=B.a.V(h.z+15+m,16)
h.CW=p
if(p>e)h.CW=e
p=h.ax
p.toString
if(f>p)h.cx=p
i=e+1
s=J.ar(i,t.f_)
for(q=0;q<i;++q)s[q]=new A.f1()
h.k3=t.jt.a(s)
f=h.at
f.toString
s=J.ar(f,t.h2)
for(q=0;q<f;++q){e=new Int16Array(384)
s[q]=new A.f2(e,new Uint8Array(16))}h.cw=t.as.a(s)
f=h.at
f.toString
h.k4=t.eL.a(A.K(f,g,!1,t.fA))
h.iR()
A.qn()
h.e=new A.jy()
return!0},
iJ(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this
e.y2=0
s=e.id
r=e.x
q=e.db
p=0
for(;;){o=e.cx
o.toString
if(!(p<o))break
o=e.cy
o===$&&A.d()
o=(p&o-1)>>>0
if(!(o>=0&&o<8))return A.a(q,o)
n=q[o]
for(;;){p=e.y1
o=e.at
o.toString
if(!(p<o))break
o=e.k3
o===$&&A.d()
m=o.length
if(0>=m)return A.a(o,0)
l=o[0]
k=1+p
if(!(k<m))return A.a(o,k)
j=o[k]
k=e.cw
k===$&&A.d()
if(!(p<k.length))return A.a(k,p)
i=k[p]
if(r.b){p=e.c
p===$&&A.d()
p=p.a8(e.fr.a[0])
o=e.c
m=e.fr
e.k1=p===0?o.a8(m.a[1]):2+o.a8(m.a[2])}p=e.fx
p===$&&A.d()
if(p){p=e.c
p===$&&A.d()
o=e.fy
o===$&&A.d()
h=p.a8(o)!==0}else h=!1
e.iK()
if(!h)h=e.iO(j,n)
else{l.a=j.a=0
p=i.b
p===$&&A.d()
if(!p)l.b=j.b=0
i.f=i.e=0}p=e.c4
p.toString
if(p>0){p=e.k4
p===$&&A.d()
o=e.y1
m=e.dS
m===$&&A.d()
k=e.k1
k===$&&A.d()
if(!(k<m.length))return A.a(m,k)
k=m[k]
m=i.b
m===$&&A.d()
B.c.h(p,o,k[m?1:0])
p=e.k4
o=e.y1
if(!(o<p.length))return A.a(p,o)
g=p[o]
g.c=g.c||!h}++e.y1}p=e.k3
p===$&&A.d()
if(0>=p.length)return A.a(p,0)
p=p[0]
p.b=p.a=0
B.f.aF(s,0,4,0)
e.y1=0
e.ji()
p=e.c4
p.toString
f=!1
if(p>0){p=e.y2
o=e.ch
o===$&&A.d()
if(p>=o){o=e.cx
o.toString
o=p<=o
f=o}}if(!e.ip(f))return!1
p=++e.y2}return!0},
ji(){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4=this,a5=null,a6=a4.y2,a7=a4.ok
a7===$&&A.d()
s=A.t(a7,!1,a5,40)
r=A.t(a7,!1,a5,584)
q=A.t(a7,!1,a5,600)
a7=a6>0
p=0
for(;;){o=a4.at
o.toString
if(!(p<o))break
o=a4.cw
o===$&&A.d()
if(!(p<o.length))return A.a(o,p)
n=o[p]
if(p>0){for(m=-1;m<16;++m){o=m*32
s.bg(o-4,4,s,o+12)}for(m=-1;m<8;++m){o=m*32
l=o-4
o+=4
r.bg(l,4,r,o)
q.bg(l,4,q,o)}}else{for(m=0;m<16;++m)J.x(s.a,s.d+(m*32-1),129)
for(m=0;m<8;++m){o=m*32-1
J.x(r.a,r.d+o,129)
J.x(q.a,q.d+o,129)}if(a7){J.x(q.a,q.d+-33,129)
J.x(r.a,r.d+-33,129)
J.x(s.a,s.d+-33,129)}}o=a4.k2
o===$&&A.d()
if(!(p<o.length))return A.a(o,p)
k=o[p]
j=n.a
i=n.e
if(a7){s.bT(-32,16,k.a)
r.bT(-32,8,k.b)
q.bT(-32,8,k.c)}else if(p===0){o=s.a
l=s.d+-33
J.br(o,l,l+21,127)
l=r.a
o=r.d+-33
J.br(l,o,o+9,127)
o=q.a
l=q.d+-33
J.br(o,l,l+9,127)}o=n.b
o===$&&A.d()
if(o){h=A.p(s,a5,-16)
g=h.cI()
if(a7){o=a4.at
o.toString
if(p>=o-1){o=k.a[15]
l=h.a
f=h.d
J.br(l,f,f+4,o)}else{o=a4.k2
l=p+1
if(!(l<o.length))return A.a(o,l)
h.bT(0,4,o[l].a)}}o=g.length
if(0>=o)return A.a(g,0)
e=g[0]
g.$flags&2&&A.b(g)
if(96>=o)return A.a(g,96)
g[96]=e
g[64]=e
g[32]=e
for(o=n.c,d=0;d<16;++d,i=i<<2>>>0){c=A.p(s,a5,B.bT[d])
l=o[d]
if(!(l<10))return A.a(B.bH,l)
B.bH[l].$1(c)
i.toString
l=d*16
a4.eA(i,new A.am(j,l,Math.min(384,384),l,!1),c)}}else{o=A.nJ(p,a6,n.c[0])
o.toString
if(!(o<7))return A.a(B.bS,o)
B.bS[o].$1(s)
if(i!==0)for(d=0;d<16;++d,i=i<<2>>>0){c=A.p(s,a5,B.bT[d])
i.toString
o=d*16
a4.eA(i,new A.am(j,o,Math.min(384,384),o,!1),c)}}o=n.f
o===$&&A.d()
l=A.nJ(p,a6,n.d)
l.toString
if(!(l<7))return A.a(B.aB,l)
B.aB[l].$1(r)
B.aB[l].$1(q)
l=Math.min(384,384)
b=new A.am(j,256,l,256,!1)
if((o&255)!==0){f=a4.e
if((o&170)!==0){f===$&&A.d()
f.bC(b,r)
f.bC(A.p(b,a5,16),A.p(r,a5,4))
a=A.p(b,a5,32)
a0=A.p(r,a5,128)
f.bC(a,a0)
f.bC(A.p(a,a5,16),A.p(a0,a5,4))}else{f===$&&A.d()
f.fJ(b,r)}}a1=new A.am(j,320,l,320,!1)
o=o>>>8
if((o&255)!==0){l=a4.e
if((o&170)!==0){l===$&&A.d()
l.bC(a1,q)
l.bC(A.p(a1,a5,16),A.p(q,a5,4))
o=A.p(a1,a5,32)
f=A.p(q,a5,128)
l.bC(o,f)
l.bC(A.p(o,a5,16),A.p(f,a5,4))}else{l===$&&A.d()
l.fJ(a1,q)}}o=a4.ax
o.toString
if(a6<o-1){B.f.aq(k.a,0,16,s.a4(),480)
B.f.aq(k.b,0,8,r.a4(),224)
B.f.aq(k.c,0,8,q.a4(),224)}a2=p*16
a3=p*8
for(m=0;m<16;++m){o=a4.p4
o.toString
l=a4.p1
l===$&&A.d()
l.bg(a2+m*o,16,s,m*32)}for(m=0;m<8;++m){o=a4.R8
o.toString
l=a4.p2
l===$&&A.d()
f=m*32
l.bg(a3+m*o,8,r,f)
o=a4.R8
o.toString
l=a4.p3
l===$&&A.d()
l.bg(a3+m*o,8,q,f)}++p}},
eA(a,b,c){var s,r,q,p,o,n
switch(a>>>30){case 3:s=this.e
s===$&&A.d()
s.kn(b,c,!1)
break
case 2:this.e===$&&A.d()
r=J.c(b.a,b.d)+4
q=B.a.az(B.a.j(J.c(b.a,b.d+4)*35468,16),32)
p=B.a.az(B.a.j(J.c(b.a,b.d+4)*85627,16),32)
o=B.a.az(B.a.j(J.c(b.a,b.d+1)*35468,16),32)
n=B.a.az(B.a.j(J.c(b.a,b.d+1)*85627,16),32)
A.jA(c,0,r+p,n,o)
A.jA(c,1,r+q,n,o)
A.jA(c,2,r-q,n,o)
A.jA(c,3,r-p,n,o)
break
case 1:s=this.e
s===$&&A.d()
s.cJ(b,c)
break
default:break}},
ic(a,b){var s,r,q,p,o,n,m,l,k,j,i,h=this,g=null,f=h.p4,e=h.k4
e===$&&A.d()
if(!(a>=0&&a<e.length))return A.a(e,a)
e=e[a]
e.toString
s=h.p1
s===$&&A.d()
r=A.p(s,g,a*16)
q=e.b
p=e.a
if(p===0)return
if(h.c4===1){if(a>0){s=h.e
s===$&&A.d()
f.toString
s.e6(r,f,p+4)}if(e.c){s=h.e
s===$&&A.d()
f.toString
s.fY(r,f,p)}if(b>0){s=h.e
s===$&&A.d()
f.toString
s.e7(r,f,p+4)}if(e.c){e=h.e
e===$&&A.d()
f.toString
e.fZ(r,f,p)}}else{o=h.R8
s=h.p2
s===$&&A.d()
n=a*8
m=A.p(s,g,n)
s=h.p3
s===$&&A.d()
l=A.p(s,g,n)
k=e.d
if(a>0){s=h.e
s===$&&A.d()
f.toString
n=p+4
s.cb(r,1,f,16,n,q,k)
o.toString
s.cb(m,1,o,8,n,q,k)
s.cb(l,1,o,8,n,q,k)}if(e.c){s=h.e
s===$&&A.d()
f.toString
s.jS(r,f,p,q,k)
o.toString
j=A.p(m,g,4)
i=A.p(l,g,4)
s.ca(j,1,o,8,p,q,k)
s.ca(i,1,o,8,p,q,k)}if(b>0){s=h.e
s===$&&A.d()
f.toString
n=p+4
s.cb(r,f,1,16,n,q,k)
o.toString
s.cb(m,o,1,8,n,q,k)
s.cb(l,o,1,8,n,q,k)}if(e.c){e=h.e
e===$&&A.d()
f.toString
e.kq(r,f,p,q,k)
o.toString
s=4*o
j=A.p(m,g,s)
i=A.p(l,g,s)
e.ca(j,o,1,8,p,q,k)
e.ca(i,o,1,8,p,q,k)}}},
io(){var s,r=this,q=r.ay
q===$&&A.d()
s=q
for(;;){q=r.CW
q.toString
if(!(s<q))break
r.ic(s,r.y2);++s}},
ip(a2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=a.c4
a1.toString
if(!(a1<3))return A.a(B.a5,a1)
s=B.a5[a1]
a1=a.p4
a1.toString
r=s*a1
a1=a.R8
a1.toString
q=(s/2|0)*a1
a1=a.p1
a1===$&&A.d()
p=-r
o=A.p(a1,a0,p)
a1=a.p2
a1===$&&A.d()
n=-q
m=A.p(a1,a0,n)
a1=a.p3
a1===$&&A.d()
l=A.p(a1,a0,n)
k=a.y2
a1=a.cx
a1.toString
j=k*16
i=(k+1)*16
if(a2)a.io()
if(k!==0){j-=s
a.to=A.p(o,a0,0)
a.x1=A.p(m,a0,0)
a.x2=A.p(l,a0,0)}else{a.to=A.p(a.p1,a0,0)
a.x1=A.p(a.p2,a0,0)
a.x2=A.p(a.p3,a0,0)}a1=k<a1-1
if(a1)i-=s
h=a.as
if(i>h)i=h
a.xr=null
if(a.dT!=null&&j<i){g=a.xr=a.i8(j,i-j)
if(g==null)return!1}else g=a0
f=a.Q
if(j<f){e=f-j
d=a.to
d===$&&A.d()
c=d.d
b=a.p4
b.toString
d.d=c+b*e
b=a.x1
b===$&&A.d()
c=b.d
d=a.R8
d.toString
d*=B.a.j(e,1)
b.d=c+d
c=a.x2
c===$&&A.d()
c.d+=d
if(g!=null)g.d=g.d+a.b.a*e
j=f}if(j<i){d=a.to
d===$&&A.d()
c=d.d
b=a.y
d.d=c+b
c=a.x1
c===$&&A.d()
d=b>>>1
c.d=c.d+d
c=a.x2
c===$&&A.d()
c.d+=d
if(g!=null)g.d+=b
a.iW(j-f,a.z-b,i-j)}if(a1){a1=a.p1
g=a.p4
g.toString
a1.bg(p,r,o,16*g)
g=a.p2
p=a.R8
p.toString
g.bg(n,q,m,8*p)
p=a.p3
g=a.R8
g.toString
p.bg(n,q,l,8*g)}return!0},
iW(a,b,c){if(b<=0||c<=0)return!1
this.ig(a,b,c)
this.ie(a,b,c)
return!0},
dq(a){var s
if((a&-4194304)>>>0===0)s=B.a.j(a,14)
else s=a<0?0:255
return s},
d9(a,b,c,d){var s=19077*a
d.h(0,0,this.dq(s+26149*c+-3644112))
d.h(0,1,this.dq(s-6419*b-13320*c+2229552))
d.h(0,2,this.dq(s+33050*b+-4527440))},
d8(a7,a8,a9,b0,b1,b2,b3,b4,b5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=null,a1=new A.jJ(),a2=b5-1,a3=B.a.j(a2,1),a4=a1.$2(J.c(a9.a,a9.d),J.c(b0.a,b0.d)),a5=a1.$2(J.c(b1.a,b1.d),J.c(b2.a,b2.d)),a6=B.a.j(3*a4+a5+131074,2)
a.d9(J.c(a7.a,a7.d),a6&255,a6>>>16,b3)
b3.h(0,3,255)
s=a8!=null
if(s){a6=B.a.j(3*a5+a4+131074,2)
r=J.c(a8.a,a8.d)
b4.toString
a.d9(r,a6&255,a6>>>16,b4)
b4.h(0,3,255)}for(q=1;q<=a3;++q,a5=o,a4=p){p=a1.$2(J.c(a9.a,a9.d+q),J.c(b0.a,b0.d+q))
o=a1.$2(J.c(b1.a,b1.d+q),J.c(b2.a,b2.d+q))
n=a4+p+a5+o+524296
m=B.a.j(n+2*(p+a5),3)
l=B.a.j(n+2*(a4+o),3)
a6=B.a.j(m+a4,1)
k=B.a.j(l+p,1)
r=2*q
j=r-1
i=J.c(a7.a,a7.d+j)
h=a6&255
g=a6>>>16
f=j*4
e=A.p(b3,a0,f)
i=19077*i
d=i+26149*g+-3644112
if((d&-4194304)>>>0===0)c=B.a.j(d,14)
else c=d<0?0:255
J.x(e.a,e.d,c)
g=i-6419*h-13320*g+2229552
if((g&-4194304)>>>0===0)c=B.a.j(g,14)
else c=g<0?0:255
J.x(e.a,e.d+1,c)
i=i+33050*h+-4527440
if((i&-4194304)>>>0===0)c=B.a.j(i,14)
else c=i<0?0:255
J.x(e.a,e.d+2,c)
J.x(e.a,e.d+3,255)
i=J.c(a7.a,a7.d+r)
h=k&255
g=k>>>16
e=r*4
d=A.p(b3,a0,e)
i=19077*i
b=i+26149*g+-3644112
if((b&-4194304)>>>0===0)c=B.a.j(b,14)
else c=b<0?0:255
J.x(d.a,d.d,c)
g=i-6419*h-13320*g+2229552
if((g&-4194304)>>>0===0)c=B.a.j(g,14)
else c=g<0?0:255
J.x(d.a,d.d+1,c)
i=i+33050*h+-4527440
if((i&-4194304)>>>0===0)c=B.a.j(i,14)
else c=i<0?0:255
J.x(d.a,d.d+2,c)
J.x(d.a,d.d+3,255)
if(s){a6=B.a.j(l+a5,1)
k=B.a.j(m+o,1)
j=J.c(a8.a,a8.d+j)
i=a6&255
h=a6>>>16
b4.toString
f=A.p(b4,a0,f)
j=19077*j
g=j+26149*h+-3644112
if((g&-4194304)>>>0===0)c=B.a.j(g,14)
else c=g<0?0:255
J.x(f.a,f.d,c)
h=j-6419*i-13320*h+2229552
if((h&-4194304)>>>0===0)c=B.a.j(h,14)
else c=h<0?0:255
J.x(f.a,f.d+1,c)
j=j+33050*i+-4527440
if((j&-4194304)>>>0===0)c=B.a.j(j,14)
else c=j<0?0:255
J.x(f.a,f.d+2,c)
J.x(f.a,f.d+3,255)
r=J.c(a8.a,a8.d+r)
j=k&255
i=k>>>16
e=A.p(b4,a0,e)
r=19077*r
h=r+26149*i+-3644112
if((h&-4194304)>>>0===0)c=B.a.j(h,14)
else c=h<0?0:255
J.x(e.a,e.d,c)
i=r-6419*j-13320*i+2229552
if((i&-4194304)>>>0===0)c=B.a.j(i,14)
else c=i<0?0:255
J.x(e.a,e.d+1,c)
r=r+33050*j+-4527440
if((r&-4194304)>>>0===0)c=B.a.j(r,14)
else c=r<0?0:255
J.x(e.a,e.d+2,c)
J.x(e.a,e.d+3,255)}}if((b5&1)===0){a6=B.a.j(3*a4+a5+131074,2)
r=J.c(a7.a,a7.d+a2)
j=a2*4
i=A.p(b3,a0,j)
a.d9(r,a6&255,a6>>>16,i)
i.h(0,3,255)
if(s){a6=B.a.j(3*a5+a4+131074,2)
a2=J.c(a8.a,a8.d+a2)
b4.toString
j=A.p(b4,a0,j)
a.d9(a2,a6&255,a6>>>16,j)
j.h(0,3,255)}}},
ie(a,b,c){var s,r,q,p,o,n,m,l,k=this,j=k.xr
if(j==null)return
s=A.p(j,null,0)
if(a===0){r=c-1
q=a}else{q=a-1
s.d=s.d-k.b.a
r=c}j=k.Q
p=k.as
if(j+a+c===p)r=p-j-q
for(j=k.b,o=0;o<r;++o){for(p=o+q,n=0;n<b;++n){m=J.c(s.a,s.d+n)
l=k.d.a
l=l==null?null:l.O(n,p,null);(l==null?new A.J():l).sv(m)}s.d=s.d+j.a}},
ig(a,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g=this,f=null,e=J.a4(g.d.gA(0),0,null),d=g.b.a,c=A.t(e,!1,f,a*d*4),b=g.to
b===$&&A.d()
s=A.p(b,f,0)
b=g.x1
b===$&&A.d()
r=A.p(b,f,0)
b=g.x2
b===$&&A.d()
q=A.p(b,f,0)
p=a+a1
o=B.a.j(a0+1,1)
n=d*4
d=g.rx
d===$&&A.d()
m=A.p(d,f,0)
d=g.ry
d===$&&A.d()
l=A.p(d,f,0)
if(a===0){g.d8(s,f,r,q,r,q,c,f,a0)
k=a1}else{d=g.RG
d===$&&A.d()
g.d8(d,s,m,l,r,q,A.p(c,f,-n),c,a0)
k=a1+1}m.sA(0,r.a)
l.sA(0,q.a)
for(d=2*n,b=-n,j=a;j+=2,j<p;){m.d=r.d
l.d=q.d
i=r.d
h=g.R8
h.toString
r.d=i+h
q.d+=h
c.d+=d
h=s.d
i=g.p4
i.toString
s.d=h+2*i
g.d8(A.p(s,f,-i),s,m,l,r,q,A.p(c,f,b),c,a0)}d=s.d
b=g.p4
b.toString
s.d=d+b
if(g.Q+p<g.as){d=g.RG
d===$&&A.d()
d.bT(0,a0,s)
g.rx.bT(0,o,r)
g.ry.bT(0,o,q);--k}else if((p&1)===0)g.d8(s,f,r,q,r,q,A.p(c,f,n),f,a0)
return k},
i8(a,b){var s,r,q,p,o,n,m,l,k,j=this,i=j.b,h=i.a,g=i.b
if(a<0||b<=0||a+b>g)return null
if(a===0){i=h*g
j.dU=new Uint8Array(i)
s=j.dT
r=new A.jK(s,h,g)
q=s.G()
p=r.d=q&3
r.e=B.a.j(q,2)&3
r.f=B.a.j(q,4)&3
r.r=B.a.j(q,6)&3
if(r.gfA())if(p===0){if(s.c-s.d<i)r.r=1}else if(p===1){o=new A.dF(B.a3,A.k([],t.J))
o.a=h
o.b=g
i=A.k([],t.c)
p=A.k([],t.ip)
n=new Uint32Array(2)
m=new A.hX(s,n)
n=m.e=J.a4(B.p.gA(n),0,null)
l=s.G()
n.$flags&2&&A.b(n)
if(0>=n.length)return A.a(n,0)
n[0]=l
l=s.G()
n.$flags&2&&A.b(n)
if(1>=n.length)return A.a(n,1)
n[1]=l
l=s.G()
n.$flags&2&&A.b(n)
if(2>=n.length)return A.a(n,2)
n[2]=l
l=s.G()
n.$flags&2&&A.b(n)
if(3>=n.length)return A.a(n,3)
n[3]=l
l=s.G()
n.$flags&2&&A.b(n)
if(4>=n.length)return A.a(n,4)
n[4]=l
l=s.G()
n.$flags&2&&A.b(n)
if(5>=n.length)return A.a(n,5)
n[5]=l
l=s.G()
n.$flags&2&&A.b(n)
if(6>=n.length)return A.a(n,6)
n[6]=l
s=s.G()
n.$flags&2&&A.b(n)
if(7>=n.length)return A.a(n,7)
n[7]=s
m.b=!1
p=new A.hd(m,o,i,p)
p.dy=h
p.fr=g
r.x=p
p.cl(h,g,!0)
i=r.x
s=i.ch
p=s.length
if(p===1){if(0>=p)return A.a(s,0)
i=s[0].a===B.ci&&i.iB()}else i=!1
if(i){r.y=!0
i=r.x
s=i.c
k=s.a*s.b
i.db=0
s=B.a.Y(k,4)
s=new Uint8Array(k+(4-s))
i.cy=s
i.cx=J.aG(B.f.gA(s),0,null)}else{r.y=!1
r.x.eg(h)}}else r.r=1
j.fu=r}i=j.fu
if(i!=null)if(!i.w){s=j.dU
s===$&&A.d()
if(!i.dR(a,b,s))return null}i=j.dU
i===$&&A.d()
return A.t(i,!1,null,a*h)},
iO(a6,a7){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2=this,a3=a2.fr.b,a4=a2.dy,a5=a2.k1
a5===$&&A.d()
if(!(a5<4))return A.a(a4,a5)
s=a4[a5]
a5=a2.cw
a5===$&&A.d()
a4=a2.y1
if(!(a4<a5.length))return A.a(a5,a4)
r=a5[a4]
q=A.t(r.a,!1,null,0)
a4=a2.k3
a4===$&&A.d()
if(0>=a4.length)return A.a(a4,0)
p=a4[0]
q.k0(0,q.c-q.d,0)
a4=r.b
a4===$&&A.d()
if(!a4){o=A.t(new Int16Array(16),!1,null,0)
a4=a6.b
a5=p.b
if(1>=a3.length)return A.a(a3,1)
n=a2.dC(a7,a3[1],a4+a5,s.b,0,o)
a6.b=p.b=n>0?1:0
if(n>1)a2.jo(o,q)
else{m=B.a.j(J.c(o.a,o.d)+3,3)
for(l=0;l<256;l+=16)J.x(q.a,q.d+l,m)}k=a3[0]
j=1}else{if(3>=a3.length)return A.a(a3,3)
k=a3[3]
j=0}i=a6.a&15
h=p.a&15
for(g=0,f=0;f<4;++f){e=h&1
for(d=0,c=0;c<4;++c){n=a2.dC(a7,k,e+(i&1),s.a,j,q)
e=n>j?1:0
i=i>>>1|e<<7
a4=J.c(q.a,q.d)!==0?1:0
if(n>3)a4=3
else if(n>1)a4=2
d=d<<2|a4
q.d+=16}i=i>>>4
h=h>>>1|e<<7
g=(g<<8|d)>>>0}b=h>>>4
for(a4=a3.length,a=i,a0=0,a1=0;a1<4;a1+=2){a5=4+a1
i=B.a.a2(a6.a,a5)
h=B.a.a2(p.a,a5)
for(d=0,f=0;f<2;++f){e=h&1
for(c=0;c<2;++c){if(2>=a4)return A.a(a3,2)
n=a2.dC(a7,a3[2],e+(i&1),s.c,0,q)
e=n>0?1:0
i=i>>>1|e<<3
a5=J.c(q.a,q.d)!==0?1:0
if(n>3)a5=3
else if(n>1)a5=2
d=(d<<2|a5)>>>0
q.d+=16}i=i>>>2
h=h>>>1|e<<5}a0=(a0|B.a.S(d,4*a1))>>>0
a=(a|B.a.S(i<<4>>>0,a1))>>>0
b=(b|B.a.S(h&240,a1))>>>0}a6.a=a
p.a=b
r.e=g
r.f=a0
if((a0&43690)===0)s.toString
return(g|a0)>>>0===0},
jo(a,b){var s,r,q,p,o,n,m,l,k,j,i=new Int32Array(16)
for(s=0;s<4;++s){r=12+s
q=J.c(a.a,a.d+s)+J.c(a.a,a.d+r)
p=4+s
o=8+s
n=J.c(a.a,a.d+p)+J.c(a.a,a.d+o)
m=J.c(a.a,a.d+p)-J.c(a.a,a.d+o)
l=J.c(a.a,a.d+s)-J.c(a.a,a.d+r)
if(!(s<16))return A.a(i,s)
i[s]=q+n
if(!(o<16))return A.a(i,o)
i[o]=q-n
i[p]=l+m
if(!(r<16))return A.a(i,r)
i[r]=l-m}for(k=0,s=0;s<4;++s){r=s*4
if(!(r<16))return A.a(i,r)
j=i[r]+3
p=3+r
if(!(p<16))return A.a(i,p)
p=i[p]
q=j+p
o=1+r
if(!(o<16))return A.a(i,o)
o=i[o]
r=2+r
if(!(r<16))return A.a(i,r)
r=i[r]
n=o+r
m=o-r
l=j-p
p=B.a.j(q+n,3)
J.x(b.a,b.d+k,p)
p=B.a.j(l+m,3)
J.x(b.a,b.d+(k+16),p)
p=B.a.j(q-n,3)
J.x(b.a,b.d+(k+32),p)
p=B.a.j(l-m,3)
J.x(b.a,b.d+(k+48),p)
k+=64}},
is(a,b){var s,r,q,p,o,n,m
t.L.a(b)
if(a.a8(b[3])===0)s=a.a8(b[4])===0?2:3+a.a8(b[5])
else if(a.a8(b[6])===0)s=a.a8(b[7])===0?5+a.a8(159):7+2*a.a8(165)+a.a8(145)
else{r=a.a8(b[8])
q=9+r
if(!(q<11))return A.a(b,q)
p=2*r+a.a8(b[q])
if(!(p<4))return A.a(B.bh,p)
o=B.bh[p]
n=o.length
for(s=0,m=0;m<n;++m)s+=s+a.a8(o[m])
s+=3+B.a.S(8,p)}return s},
dC(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j
t.ac.a(b)
t.L.a(d)
s=b.length
if(!(e<s))return A.a(b,e)
r=b[e].a
if(!(c<r.length))return A.a(r,c)
q=r[c]
for(;e<16;e=p){if(a.a8(q[0])===0)return e
while(a.a8(q[1])===0){++e
if(!(e>=0&&e<17))return A.a(B.af,e)
r=B.af[e]
if(!(r<s))return A.a(b,r)
r=b[r].a
if(0>=r.length)return A.a(r,0)
q=r[0]
if(e===16)return 16}p=e+1
if(!(p>=0&&p<17))return A.a(B.af,p)
r=B.af[p]
if(!(r<s))return A.a(b,r)
o=b[r].a
r=o.length
if(a.a8(q[2])===0){if(1>=r)return A.a(o,1)
q=o[1]
n=1}else{n=this.is(a,q)
if(2>=r)return A.a(o,2)
q=o[2]}if(!(e>=0&&e<16))return A.a(B.bC,e)
r=B.bC[e]
m=a.b
m===$&&A.d()
l=a.ej(B.a.j(m,1))
m=a.b
if(m>>>0!==m||m>=128)return A.a(B.ac,m)
k=B.ac[m]
a.b=B.bJ[m]
m=a.d
m===$&&A.d()
a.d=m-k
m=l!==0?-n:n
j=d[e>0?1:0]
J.x(f.a,f.d+r,m*j)}return 16},
iK(){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.y1,g=4*h,f=i.go,e=i.id,d=i.cw
d===$&&A.d()
if(!(h<d.length))return A.a(d,h)
s=d[h]
h=i.c
h===$&&A.d()
h=h.a8(145)===0
s.b=h
if(!h){if(i.c.a8(156)!==0)r=i.c.a8(128)!==0?1:3
else r=i.c.a8(163)!==0?2:0
h=s.c
h.$flags&2&&A.b(h)
h[0]=r
f.toString
B.f.aF(f,g,g+4,r)
B.f.aF(e,0,4,r)}else{q=s.c
for(p=0,o=0;o<4;++o,p=j){r=e[o]
for(n=0;n<4;++n){h=g+n
if(!(h<f.length))return A.a(f,h)
d=f[h]
if(!(d<10))return A.a(B.bE,d)
d=B.bE[d]
if(!(r>=0&&r<10))return A.a(d,r)
m=d[r]
l=i.c.a8(m[0])
if(!(l<18))return A.a(B.aa,l)
k=B.aa[l]
while(k>0){d=i.c
if(!(k<9))return A.a(m,k)
d=2*k+d.a8(m[k])
if(!(d>=0&&d<18))return A.a(B.aa,d)
k=B.aa[d]}r=-k
f.$flags&2&&A.b(f)
f[h]=r}j=p+4
f.toString
B.f.aq(q,p,j,f,g)
e.$flags&2&&A.b(e)
if(!(o<4))return A.a(e,o)
e[o]=r}}if(i.c.a8(142)===0)h=0
else if(i.c.a8(114)===0)h=2
else h=i.c.a8(183)!==0?1:3
s.d=h}}
A.jJ.prototype={
$2(a,b){return(a|b<<16)>>>0},
$S:38}
A.f_.prototype={
a0(a){var s,r
for(s=0;r=a-1,a>0;a=r)s=(s|B.a.a_(this.a8(128),r))>>>0
return s},
cg(a){var s=this.a0(a)
return this.a0(1)===1?-s:s},
a8(a){var s,r=this,q=r.b
q===$&&A.d()
s=r.ej(B.a.j(q*a,8))
if(r.b<=126)r.jm()
return s},
ej(a){var s,r,q,p,o,n=this,m=n.d
m===$&&A.d()
if(m<0){s=n.a
r=s.c
q=s.d
if(r-q>=1){p=s.G()
m=n.c
m===$&&A.d()
n.c=(p|m<<8)>>>0
m=n.d+8
n.d=m
o=m}else{if(q<r){m=s.G()
s=n.c
s===$&&A.d()
n.c=(m|s<<8)>>>0
s=n.d+8
n.d=s
m=s}else if(!n.e){s=n.c
s===$&&A.d()
n.c=s<<8>>>0
m+=8
n.d=m
n.e=!0}o=m}}else o=m
m=n.c
m===$&&A.d()
if(B.a.bw(m,o)>a){s=n.b
s===$&&A.d()
r=a+1
n.b=s-r
n.c=m-B.a.a_(r,o)
return 1}else{n.b=a
return 0}},
jm(){var s,r=this,q=r.b
q===$&&A.d()
if(!(q>=0&&q<128))return A.a(B.ac,q)
s=B.ac[q]
r.b=B.bJ[q]
q=r.d
q===$&&A.d()
r.d=q-s}}
A.jy.prototype={
e7(a,b,c){var s,r=A.p(a,null,0)
for(s=0;s<16;++s){r.d=a.d+s
if(this.eQ(r,b,c))this.cX(r,b)}},
e6(a,b,c){var s,r=A.p(a,null,0)
for(s=0;s<16;++s){r.d=a.d+s*b
if(this.eQ(r,1,c))this.cX(r,1)}},
fZ(a,b,c){var s,r,q=A.p(a,null,0)
for(s=4*b,r=3;r>0;--r){q.d+=s
this.e7(q,b,c)}},
fY(a,b,c){var s,r=A.p(a,null,0)
for(s=3;s>0;--s){r.d+=4
this.e6(r,b,c)}},
kq(a,b,c,d,e){var s,r,q=A.p(a,null,0)
for(s=4*b,r=3;r>0;--r){q.d+=s
this.ca(q,b,1,16,c,d,e)}},
jS(a,b,c,d,e){var s,r=A.p(a,null,0)
for(s=3;s>0;--s){r.d+=4
this.ca(r,1,b,16,c,d,e)}},
cb(a,a0,a1,a2,a3,a4,a5){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b=A.p(a,null,0)
for(s=-3*a0,r=-2*a0,q=-a0,p=2*a0;o=a2-1,a2>0;a2=o){if(this.eR(b,a0,a3,a4))if(this.eM(b,a0,a5))this.cX(b,a0)
else{n=J.c(b.a,b.d+s)
m=J.c(b.a,b.d+r)
l=J.c(b.a,b.d+q)
k=J.c(b.a,b.d)
j=J.c(b.a,b.d+a0)
i=J.c(b.a,b.d+p)
h=$.ls()
g=1020+m-j
if(!(g>=0&&g<2041))return A.a(h,g)
g=1020+3*(k-l)+h[g]
if(!(g>=0&&g<2041))return A.a(h,g)
f=h[g]
g=B.a.j(27*f+63,7)
e=(g&2147483647)-((g&2147483648)>>>0)
g=B.a.j(18*f+63,7)
d=(g&2147483647)-((g&2147483648)>>>0)
g=B.a.j(9*f+63,7)
c=(g&2147483647)-((g&2147483648)>>>0)
g=$.aI()
h=255+n+c
if(!(h>=0&&h<766))return A.a(g,h)
h=g[h]
J.x(b.a,b.d+s,h)
h=$.aI()
g=255+m+d
if(!(g>=0&&g<766))return A.a(h,g)
g=h[g]
J.x(b.a,b.d+r,g)
g=$.aI()
h=255+l+e
if(!(h>=0&&h<766))return A.a(g,h)
h=g[h]
J.x(b.a,b.d+q,h)
h=$.aI()
g=255+k-e
if(!(g>=0&&g<766))return A.a(h,g)
g=h[g]
J.x(b.a,b.d,g)
g=$.aI()
h=255+j-d
if(!(h>=0&&h<766))return A.a(g,h)
h=g[h]
J.x(b.a,b.d+a0,h)
h=$.aI()
g=255+i-c
if(!(g>=0&&g<766))return A.a(h,g)
g=h[g]
J.x(b.a,b.d+p,g)}b.d+=a1}},
ca(a,b,c,d,e,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f=A.p(a,null,0)
for(s=-2*b,r=-b;q=d-1,d>0;d=q){if(this.eR(f,b,e,a0))if(this.eM(f,b,a1))this.cX(f,b)
else{p=J.c(f.a,f.d+s)
o=J.c(f.a,f.d+r)
n=J.c(f.a,f.d)
m=J.c(f.a,f.d+b)
l=3*(n-o)
k=$.lt()
j=B.a.j(l+4,3)
j=112+((j&2147483647)-((j&2147483648)>>>0))
if(!(j>=0&&j<225))return A.a(k,j)
i=k[j]
j=B.a.j(l+3,3)
j=112+((j&2147483647)-((j&2147483648)>>>0))
if(!(j>=0&&j<225))return A.a(k,j)
h=k[j]
j=B.a.j(i+1,1)
g=(j&2147483647)-((j&2147483648)>>>0)
j=$.aI()
k=255+p+g
if(!(k>=0&&k<766))return A.a(j,k)
k=j[k]
J.x(f.a,f.d+s,k)
k=$.aI()
j=255+o+h
if(!(j>=0&&j<766))return A.a(k,j)
j=k[j]
J.x(f.a,f.d+r,j)
j=$.aI()
k=255+n-i
if(!(k>=0&&k<766))return A.a(j,k)
k=j[k]
J.x(f.a,f.d,k)
k=$.aI()
j=255+m-g
if(!(j>=0&&j<766))return A.a(k,j)
j=k[j]
J.x(f.a,f.d+b,j)}f.d+=c}},
cX(a,b){var s,r,q,p=J.c(a.a,a.d+-2*b),o=-b,n=J.c(a.a,a.d+o),m=J.c(a.a,a.d),l=J.c(a.a,a.d+b),k=$.ls(),j=1020+p-l
if(!(j>=0&&j<2041))return A.a(k,j)
s=3*(m-n)+k[j]
j=$.lt()
k=112+B.a.az(B.a.j(s+4,3),32)
if(!(k>=0&&k<225))return A.a(j,k)
r=j[k]
k=112+B.a.az(B.a.j(s+3,3),32)
if(!(k>=0&&k<225))return A.a(j,k)
q=j[k]
k=$.aI()
j=255+n+q
if(!(j>=0&&j<766))return A.a(k,j)
a.h(0,o,k[j])
j=$.aI()
k=255+m-r
if(!(k>=0&&k<766))return A.a(j,k)
a.h(0,0,j[k])},
eM(a,b,c){var s=J.c(a.a,a.d+-2*b),r=J.c(a.a,a.d+-b),q=J.c(a.a,a.d),p=J.c(a.a,a.d+b),o=$.il(),n=255+s-r
if(!(n>=0&&n<511))return A.a(o,n)
if(o[n]<=c){n=255+p-q
if(!(n>=0&&n<511))return A.a(o,n)
n=o[n]>c
o=n}else o=!0
return o},
eQ(a,b,c){var s,r=J.c(a.a,a.d+-2*b),q=J.c(a.a,a.d+-b),p=J.c(a.a,a.d),o=J.c(a.a,a.d+b),n=$.il(),m=255+q-p
if(!(m>=0&&m<511))return A.a(n,m)
m=n[m]
n=$.lr()
s=255+r-o
if(!(s>=0&&s<511))return A.a(n,s)
return 2*m+n[s]<=c},
eR(a,b,c,d){var s,r,q,p=J.c(a.a,a.d+-4*b),o=J.c(a.a,a.d+-3*b),n=J.c(a.a,a.d+-2*b),m=J.c(a.a,a.d+-b),l=J.c(a.a,a.d),k=J.c(a.a,a.d+b),j=J.c(a.a,a.d+2*b),i=J.c(a.a,a.d+3*b),h=$.il(),g=255+m-l
if(!(g>=0&&g<511))return A.a(h,g)
g=h[g]
s=$.lr()
r=255+n
q=r-k
if(!(q>=0&&q<511))return A.a(s,q)
if(2*g+s[q]>c)return!1
g=255+p-o
if(!(g>=0&&g<511))return A.a(h,g)
s=!1
if(h[g]<=d){g=255+o-n
if(!(g>=0&&g<511))return A.a(h,g)
if(h[g]<=d){g=r-m
if(!(g>=0&&g<511))return A.a(h,g)
if(h[g]<=d){g=255+i-j
if(!(g>=0&&g<511))return A.a(h,g)
if(h[g]<=d){g=255+j-k
if(!(g>=0&&g<511))return A.a(h,g)
if(h[g]<=d){g=255+k-l
if(!(g>=0&&g<511))return A.a(h,g)
g=h[g]<=d
h=g}else h=s}else h=s}else h=s}else h=s}else h=s
return h},
bC(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=new Int32Array(16)
for(s=0,r=0,q=0;q<4;++q){p=s+8
o=J.c(a.a,a.d+s)+J.c(a.a,a.d+p)
n=J.c(a.a,a.d+s)-J.c(a.a,a.d+p)
p=s+4
m=B.a.j(J.c(a.a,a.d+p)*35468,16)
l=s+12
k=B.a.j(J.c(a.a,a.d+l)*85627,16)
j=(m&2147483647)-((m&2147483648)>>>0)-((k&2147483647)-((k&2147483648)>>>0))
p=B.a.j(J.c(a.a,a.d+p)*85627,16)
l=B.a.j(J.c(a.a,a.d+l)*35468,16)
i=(p&2147483647)-((p&2147483648)>>>0)+((l&2147483647)-((l&2147483648)>>>0))
h=r+1
if(!(r<16))return A.a(e,r)
e[r]=o+i
r=h+1
if(!(h<16))return A.a(e,h)
e[h]=n+j
h=r+1
if(!(r<16))return A.a(e,r)
e[r]=n-j
r=h+1
if(!(h<16))return A.a(e,h)
e[h]=o-i;++s}for(g=0,r=0,q=0;q<4;++q){if(!(r<16))return A.a(e,r)
f=e[r]+4
p=r+8
if(!(p<16))return A.a(e,p)
p=e[p]
o=f+p
n=f-p
p=r+4
if(!(p<16))return A.a(e,p)
p=e[p]
m=B.a.j(p*35468,16)
l=r+12
if(!(l<16))return A.a(e,l)
l=e[l]
k=B.a.j(l*85627,16)
j=(m&2147483647)-((m&2147483648)>>>0)-((k&2147483647)-((k&2147483648)>>>0))
p=B.a.j(p*85627,16)
l=B.a.j(l*35468,16)
i=(p&2147483647)-((p&2147483648)>>>0)+((l&2147483647)-((l&2147483648)>>>0))
A.bY(b,g,0,0,o+i)
A.bY(b,g,1,0,n+j)
A.bY(b,g,2,0,n-j)
A.bY(b,g,3,0,o-i);++r
g+=32}},
kn(a,b,c){this.bC(a,b)
if(c)this.bC(A.p(a,null,16),A.p(b,null,4))},
cJ(a,b){var s,r,q=J.c(a.a,a.d)+4
for(s=0;s<4;++s)for(r=0;r<4;++r)A.bY(b,0,r,s,q)},
fJ(a,b){var s=this,r=null
if(J.c(a.a,a.d)!==0)s.cJ(a,b)
if(J.c(a.a,a.d+16)!==0)s.cJ(A.p(a,r,16),A.p(b,r,4))
if(J.c(a.a,a.d+32)!==0)s.cJ(A.p(a,r,32),A.p(b,r,128))
if(J.c(a.a,a.d+48)!==0)s.cJ(A.p(a,r,48),A.p(b,r,132))}}
A.jD.prototype={}
A.jG.prototype={}
A.jI.prototype={}
A.eZ.prototype={}
A.jH.prototype={}
A.jz.prototype={}
A.bH.prototype={}
A.f1.prototype={}
A.hZ.prototype={}
A.f2.prototype={}
A.f3.prototype={}
A.f0.prototype={
cu(){var s,r,q,p,o=this,n=o.b
if(n.af(8)!==47)return!1
s=n.af(14)+1
r=n.af(14)+1
q=n.af(1)
o.dy=s
o.fr=r
p=o.c
p.f=B.an
p.a=s
p.b=r
p.d=q!==0
if(n.af(3)!==0)return!1
return!0},
bJ(){var s,r,q,p,o,n=this,m=null
n.f=0
if(!n.cu())return m
n.cl(n.dy,n.fr,!0)
n.eg(n.dy)
s=n.dy
n.d=A.P(m,m,B.e,0,B.i,n.fr,m,0,4,m,B.e,s,!1)
s=n.cx
s.toString
r=n.c
q=r.a
p=r.b
if(!n.ds(s,q,p,p,n.giT()))return m
s=r.w
if(s.length!==0){o=A.t(new A.b4(s),!1,m,0)
s=n.d
s.toString
s.e=A.iA(o)}return n.d},
eg(a){var s,r=this,q=r.c
q=q.a*q.b+a
s=new Uint32Array(q+a*16)
r.cx=s
r.cy=J.a4(B.p.gA(s),0,null)
r.db=q
return!0},
jh(a){var s,r,q,p,o,n,m,l=this
t.L.a(a)
s=l.b
r=s.af(2)
q=l.CW
p=B.a.S(1,r)
if((q&p)>>>0!==0)return!1
l.CW=(q|p)>>>0
o=new A.hY(B.ch)
B.c.I(l.ch,o)
if(!(r<4))return A.a(B.bP,r)
q=B.bP[r]
o.a=q
o.b=a[0]
o.c=a[1]
switch(q.a){case 0:case 1:s=s.af(3)+2
o.e=s
o.d=l.cl(A.bZ(o.b,s),A.bZ(o.c,o.e),!1)
break
case 3:n=s.af(8)+1
if(n>16)m=0
else if(n>4)m=1
else{s=n>2?2:3
m=s}B.c.h(a,0,A.bZ(o.b,m))
o.e=m
o.d=l.cl(n,1,!1)
l.ij(n,o)
break
case 2:break}return!0},
cl(a,b,c){var s,r,q,p,o,n,m,l,k=this
if(c)for(s=k.b,r=t.t,q=b,p=a;s.af(1)!==0;){o=A.k([p,q],r)
if(!k.jh(o))throw A.h(A.o("Invalid Transform"))
p=o[0]
q=o[1]}else{q=b
p=a}s=k.b
if(s.af(1)!==0){n=s.af(4)
if(!(n>=1&&n<=11))throw A.h(A.o("Invalid Color Cache"))}else n=0
if(!k.j4(p,q,n,c))throw A.h(A.o("Invalid Huffman Codes"))
if(n>0){s=B.a.S(1,n)
k.w=s
k.x=new A.jE(new Uint32Array(s),32-n)}else k.w=0
s=k.c
s.a=p
s.b=q
m=k.z
k.Q=A.bZ(p,m)
k.y=m===0?4294967295:B.a.S(1,m)-1
if(c){k.f=0
return null}l=new Uint32Array(p*q)
if(!k.ds(l,p,q,q,null))throw A.h(A.o("Failed to decode image data."))
k.f=0
return l},
ds(b5,b6,b7,b8,b9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4=this
t.ec.a(b9)
s=b4.f
r=B.a.an(s,b6)
q=B.a.Y(s,b6)
p=b4.eG(q,r)
o=b4.f
n=b6*b7
m=b6*b8
s=b4.w
l=280+s
k=s>0?b4.x:null
j=b4.y
for(s=b5.length,i=b4.b,h=b9!=null,g=b5.$flags|0,f=o;o<m;){if((q&j)>>>0===0){e=b4.co(b4.as,b4.Q,b4.z,q,r)
d=b4.ax
if(!(e<d.length))return A.a(d,e)
p=d[e]}c=0
if(p.d){d=p.c
g&2&&A.b(b5)
if(!(o>=0&&o<s))return A.a(b5,o)
b5[o]=d;++o;++q
if(q>=b6){++r
if(h&&r<=b8)b9.$2(r,!0)
if(k!=null)for(d=k.b,b=k.a,a=b.$flags|0;f<o;){if(!(f>=0&&f<s))return A.a(b5,f)
a0=b5[f]
a1=B.a.a3(a0*506832829>>>0,d)
a&2&&A.b(b)
if(!(a1<b.length))return A.a(b,a1)
b[a1]=a0;++f}q=c}continue}if(i.a>=32)i.c1()
if(p.e){a2=i.cE()&63
d=p.f
if(!(a2<d.length))return A.a(d,a2)
a3=d[a2]
d=a3.a
b=i.a
if(d<256){i.a=b+d
d=a3.b
g&2&&A.b(b5)
if(!(o>=0&&o<s))return A.a(b5,o)
b5[o]=d
a4=0}else{i.a=b+(d-256)
a4=a3.b}if(i.b)break
if(a4===0){++o;++q
if(q>=b6){++r
if(h&&r<=b8)b9.$2(r,!0)
if(k!=null)for(d=k.b,b=k.a,a=b.$flags|0;f<o;){if(!(f>=0&&f<s))return A.a(b5,f)
a0=b5[f]
a1=B.a.a3(a0*506832829>>>0,d)
a&2&&A.b(b)
if(!(a1<b.length))return A.a(b,a1)
b[a1]=a0;++f}q=c}continue}}else a4=p.c7(0,i)
if(a4<256){if(p.b){d=p.c
g&2&&A.b(b5)
if(!(o>=0&&o<s))return A.a(b5,o)
b5[o]=(d|a4<<8)>>>0}else{a5=p.c7(1,i)
if(i.a>=32)i.c1()
a6=A.ow(p.c7(2,i),a4,a5,p.c7(3,i))
g&2&&A.b(b5)
if(!(o>=0&&o<s))return A.a(b5,o)
b5[o]=a6}++o;++q
if(q>=b6){++r
if(h&&r<=b8)b9.$2(r,!0)
if(k!=null)for(d=k.b,b=k.a,a=b.$flags|0;f<o;){if(!(f>=0&&f<s))return A.a(b5,f)
a0=b5[f]
a1=B.a.a3(a0*506832829>>>0,d)
a&2&&A.b(b)
if(!(a1<b.length))return A.a(b,a1)
b[a1]=a0;++f}q=c}}else if(a4<280){a7=b4.cZ(a4-256)
a8=p.c7(4,i)
if(i.a>=32)i.c1()
a9=b4.eT(b6,b4.cZ(a8))
if(o<a9||n-o<a7)return!1
else{b0=o-a9
for(b1=0;b1<a7;++b1){d=o+b1
b=b0+b1
if(!(b>=0&&b<s))return A.a(b5,b)
b=b5[b]
g&2&&A.b(b5)
if(!(d>=0&&d<s))return A.a(b5,d)
b5[d]=b}}o+=a7
q+=a7
while(q>=b6){q-=b6;++r
if(h&&r<=b8)b9.$2(r,!0)}if((q&j)>>>0!==0){e=b4.co(b4.as,b4.Q,b4.z,q,r)
d=b4.ax
if(!(e<d.length))return A.a(d,e)
p=d[e]}if(k!=null)for(d=k.b,b=k.a,a=b.$flags|0;f<o;){if(!(f>=0&&f<s))return A.a(b5,f)
a0=b5[f]
a1=B.a.a3(a0*506832829>>>0,d)
a&2&&A.b(b)
if(!(a1<b.length))return A.a(b,a1)
b[a1]=a0;++f}}else if(a4<l){a1=a4-280
while(f<o){k.toString
if(!(f>=0&&f<s))return A.a(b5,f)
d=b5[f]
b2=B.a.a3(d*506832829>>>0,k.b)
b=k.a
b.$flags&2&&A.b(b)
if(!(b2<b.length))return A.a(b,b2)
b[b2]=d;++f}d=k.a
b=d.length
if(!(a1<b))return A.a(d,a1)
a=d[a1]
g&2&&A.b(b5)
if(!(o>=0&&o<s))return A.a(b5,o)
b5[o]=a;++o;++q
if(q>=b6){++r
if(h&&r<=b8)b9.$2(r,!0)
for(a=k.b,a0=d.$flags|0;f<o;){if(!(f>=0&&f<s))return A.a(b5,f)
b3=b5[f]
a1=B.a.a3(b3*506832829>>>0,a)
a0&2&&A.b(d)
if(!(a1<b))return A.a(d,a1)
d[a1]=b3;++f}q=c}}else return!1}if(h)b9.$2(r>b8?b8:r,!1)
b4.f=o
return!0},
iB(){var s,r,q,p,o,n,m,l
if(this.w>0)return!1
for(s=this.at,r=this.ax,q=r.length,p=0;p<s;++p){if(!(p<q))return A.a(r,p)
o=r[p].a
n=o.length
if(1>=n)return A.a(o,1)
m=o[1]
l=m.a
m=m.b
if(!(m<l.length))return A.a(l,m)
if(l[m].a>0)return!1
if(2>=n)return A.a(o,2)
m=o[2]
l=m.a
m=m.b
if(!(m<l.length))return A.a(l,m)
if(l[m].a>0)return!1
if(3>=n)return A.a(o,3)
n=o[3]
m=n.a
n=n.b
if(!(n<m.length))return A.a(m,n)
if(m[n].a>0)return!1}return!0},
ik(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g=this
if(b&&B.a.Y(a,16)!==0)return
s=g.r
r=a-s
q=g.dy
p=q*s
while(r>0){o=r>16?16:r
n=q*o
m=q*s
l=g.db
g.eh(s,o,p)
for(q=g.dx,k=g.cx,j=0;j<n;++j){q.toString
i=m+j
h=l+j
if(!(h<k.length))return A.a(k,h)
h=k[h]
q.$flags&2&&A.b(q)
if(!(i>=0&&i<q.length))return A.a(q,i)
q[i]=h>>>8&255}r-=o
q=g.dy
p+=o*q
s+=o}g.r=a},
hR(a0,a1,a2){var s,r,q,p,o,n,m,l,k,j,i=this,h=i.f,g=B.a.an(h,a0),f=B.a.Y(h,a0),e=i.eG(f,g),d=i.f,c=a0*a1,b=a0*a2,a=i.y
h=i.b
for(;;){if(!(!h.b&&d<b))break
if((f&a)>>>0===0){s=i.co(i.as,i.Q,i.z,f,g)
r=i.ax
if(!(s<r.length))return A.a(r,s)
e=r[s]}if(h.a>=32)h.c1()
q=e.c7(0,h)
if(q<256){r=i.cy
r===$&&A.d()
r.$flags&2&&A.b(r)
if(!(d>=0&&d<r.length))return A.a(r,d)
r[d]=q;++d;++f
if(f>=a0){++g
if(B.a.Y(g,16)===0)i.dA(g)
f=0}}else if(q<280){p=i.cZ(q-256)
o=e.c7(4,h)
if(h.a>=32)h.c1()
n=i.eT(a0,i.cZ(o))
if(d>=n&&c-d>=p)for(r=i.cy,m=0;m<p;++m){r===$&&A.d()
l=d+m
k=l-n
j=r.length
if(!(k>=0&&k<j))return A.a(r,k)
k=r[k]
r.$flags&2&&A.b(r)
if(!(l>=0&&l<j))return A.a(r,l)
r[l]=k}else{i.f=d
return!0}d+=p
f+=p
while(f>=a0){f-=a0;++g
if(B.a.Y(g,16)===0)i.dA(g)}if(d<b&&(f&a)>>>0!==0){s=i.co(i.as,i.Q,i.z,f,g)
r=i.ax
if(!(s<r.length))return A.a(r,s)
e=r[s]}}else return!1}i.dA(g)
i.f=d
return!0},
dA(a){var s,r,q=this,p=q.r,o=a-p,n=q.cy
n===$&&A.d()
s=A.t(n,!1,null,q.c.a*p)
if(o>0){n=q.dx
n.toString
r=A.t(n,!1,null,q.dy*p)
n=q.ch
if(0>=n.length)return A.a(n,0)
n[0].jx(p,p+o,s,r)}q.r=a},
iU(a,b){var s,r,q,p,o,n,m=this,l=m.c.a,k=m.r
if(b)if(B.a.Y(a,16)!==0)return
s=a-k
if(s<=0){m.r=a
return}m.eh(k,s,l*k)
for(r=m.db,q=m.r,p=0;p<s;++p,++q)for(o=0;o<m.dy;++o,++r){l=m.cx
if(!(r>=0&&r<l.length))return A.a(l,r)
n=l[r]
l=m.d.a
if(l!=null)l.aj(o,q,n>>>16&255,n>>>8&255,n&255,n>>>24&255)}m.r=a},
eh(a,b,c){var s,r=this,q=r.ch,p=q.length,o=r.c.a,n=a+b,m=r.db,l=r.cx
l.toString
B.p.aq(l,m,m+o*b,l,c)
for(;s=p-1,p>0;p=s){if(!(s>=0&&s<q.length))return A.a(q,s)
o=q[s]
l=r.cx
l.toString
o.jZ(a,n,l,m,l,m)}},
j4(a,b,a0,a1){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e=this,d=1,c=null
if(a1&&e.b.af(1)!==0){s=2+e.b.af(3)
r=A.bZ(a,s)
q=A.bZ(b,s)
p=r*q
o=e.cl(r,q,!1)
if(o==null)return!1
e.z=s
for(n=o.length,m=o.$flags|0,l=d,k=0;k<p;++k){if(!(k<n))return A.a(o,k)
j=o[k]>>>8&65535
m&2&&A.b(o)
o[k]=j
if(j>=l)l=j+1}if(l>1000||l>a*b){c=new Int32Array(1)
B.U.aF(c,0,1,255)
for(d=0,k=0;k<p;++k){if(!(k<n))return A.a(o,k)
i=o[k]
if(!(i<1))return A.a(c,i)
if(c[i]===-1){h=d+1
c[i]=d
d=h}g=c[i]
m&2&&A.b(o)
o[k]=g}}else d=l}else{o=null
l=1}if(e.b.b)return!1
f=e.j5(a0,d,l,c)
if(f==null)return!1
e.as=o
e.at=d
e.ax=f
return!0},
dM(a,b,c,d,e,f){var s,r=a.a,q=a.b,p=d
do{p-=c
s=q+(b+p)
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
s.a=e
s.b=f}while(p>0)},
iE(a,b,c){var s=B.a.a_(1,b-c)
while(b<15){s-=a[b]
if(s<=0)break;++b
s=s<<1>>>0}return b-c},
eK(a,b){var s=B.a.a_(1,b-1)
while((a&s)>>>0!==0)s=s>>>1
return s!==0?((a&s-1)>>>0)+s:a},
ek(a5,a6,a7,a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1=this,a2=B.a.S(1,a6),a3=new Int32Array(16),a4=new Int32Array(16)
for(s=a7.length,r=0;r<a8;++r){if(!(r<s))return A.a(a7,r)
q=a7[r]
if(q>15)return 0
if(!(q>=0))return A.a(a3,q)
a3[q]=a3[q]+1}if(a3[0]===a8)return 0
a4[1]=0
for(p=1;p<15;p=o){q=a3[p]
if(q>B.a.S(1,p))return 0
o=p+1
a4[o]=a4[p]+q}for(q=a9!=null,r=0;r<a8;++r){if(!(r<s))return A.a(a7,r)
n=a7[r]
if(n>0)if(q){if(!(n<16))return A.a(a4,n)
m=a4[n]
if(m>=a8)return 0
a4[n]=m+1
a9.$flags&2&&A.b(a9)
if(!(m>=0&&m<a9.length))return A.a(a9,m)
a9[m]=r}else{if(!(n<16))return A.a(a4,n)
a4[n]=a4[n]+1}}if(a4[15]===1){if(q){a5.toString
if(0>=a9.length)return A.a(a9,0)
a1.dM(a5,0,1,a2,0,a9[0])}return a2}l=a2-1
for(s=a5==null,k=0,j=1,i=1,r=0,p=1,h=2;p<=a6;++p,h=h<<1>>>0){i=i<<1>>>0
j+=i
if(!(p<16))return A.a(a3,p)
i-=a3[p]
if(i<0)return 0
if(s)continue
for(g=p&255;a3[p]>0;a3[p]=a3[p]-1,r=f){f=r+1
if(!(r>=0&&r<a9.length))return A.a(a9,r)
a1.dM(a5,k,h,a2,g,a9[r])
k=a1.eK(k,p)}}for(p=a6+1,s=!s,e=a2,d=0,c=4294967295,h=2;p<=15;++p,h=h<<1>>>0){i=i<<1>>>0
j+=i
i-=a3[p]
if(i<0)return 0
for(g=p-a6&255;a3[p]>0;a3[p]=a3[p]-1){b=(k&l)>>>0
if(b!==c){if(s)d+=e
a=a1.iE(a3,p,a6)
e=B.a.a_(1,a)
a2+=e
if(s){q=a5.a
m=a5.b+b
if(!(m>=0&&m<q.length))return A.a(q,m)
m=q[m]
m.a=a+a6&255
m.b=d-b}c=b}if(s){f=r+1
if(!(r>=0&&r<a9.length))return A.a(a9,r)
a0=a9[r]
a1.dM(a5,d+B.a.a2(k,a6),h,e,g,a0)
r=f}k=a1.eK(k,p)}}if(j!==2*a4[15]-1)return 0
return a2},
fa(a,b,c,d){var s,r,q,p,o,n,m=this.ek(null,b,c,d,null)
if(m===0||a==null)return m
s=a.b
r=s.d
q=s.e
if(r+m>=q){p=new A.e9()
if(m>q)q=m
o=A.lC(q)
p.e=q
p.b=p.a=o
a.b=p
s=p}n=new Uint16Array(d)
this.ek(s.b,b,c,d,n)
return m},
j3(a,b,a0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c=new A.fW(new A.e9())
c.ec(128)
if(this.fa(c,7,a,19)===0)return!1
s=this.b
if(s.af(1)!==0){r=2+s.af(2+2*s.af(3))
if(r>b)return!1}else r=b
for(q=8,p=0;p<b;r=o){o=r-1
if(r===0)break
if(s.a>=32)s.c1()
n=c.b.a
n.toString
m=n.a
n=n.b+(s.cE()&127)
if(!(n<m.length))return A.a(m,n)
l=m[n]
s.a=s.a+l.a
k=l.b
if(k<16){j=p+1
a0.$flags&2&&A.b(a0)
if(!(p>=0&&p<a0.length))return A.a(a0,p)
a0[p]=k
if(k!==0)q=k
p=j}else{i=k-16
if(!(i<3))return A.a(B.bd,i)
h=B.bd[i]
g=B.dJ[i]
f=s.af(h)+g
if(p+f>b)return!1
e=k===16?q:0
for(n=a0.$flags|0;d=f-1,f>0;f=d,p=j){j=p+1
n&2&&A.b(a0)
if(!(p>=0&&p<a0.length))return A.a(a0,p)
a0[p]=e}}}return!0},
eY(a,b,c){var s,r,q,p,o,n,m,l=this.b,k=l.af(1)
B.U.aF(b,0,a,0)
if(k!==0){s=l.af(1)
r=l.af(l.af(1)===0?1:8)
b.$flags&2&&A.b(b)
q=b.length
if(!(r<q))return A.a(b,r)
b[r]=1
if(s+1===2){r=l.af(8)
if(!(r<q))return A.a(b,r)
b[r]=1}p=!0}else{o=new Int32Array(19)
n=l.af(4)+4
for(m=0;m<n;++m){if(!(m<19))return A.a(B.bA,m)
s=B.bA[m]
q=l.af(3)
if(!(s<19))return A.a(o,s)
o[s]=q}p=this.j3(o,a,b)}return p&&!l.b?this.fa(c,8,b,a):0},
cR(a,b,c){var s=c.a,r=a.a
c.a=s+r
c.b=(c.b|B.a.S(a.b,b))>>>0
return r},
hy(a){var s,r,q,p,o,n,m,l,k,j,i=this
for(s=a.a,r=s.length,q=a.f,p=q.length,o=0;o<64;++o){if(!(o<p))return A.a(q,o)
n=q[o]
if(0>=r)return A.a(s,0)
m=s[0]
l=m.a
m=m.b+o
if(!(m<l.length))return A.a(l,m)
k=l[m]
m=k.b
if(m>=256){n.a=k.a+256
n.b=m}else{n.b=n.a=0
j=B.a.a2(o,i.cR(k,8,n))
if(1>=r)return A.a(s,1)
m=s[1]
l=m.a
m=m.b+j
if(!(m<l.length))return A.a(l,m)
j=B.a.a2(j,i.cR(l[m],16,n))
if(2>=r)return A.a(s,2)
m=s[2]
l=m.a
m=m.b+j
if(!(m<l.length))return A.a(l,m)
j=B.a.a2(j,i.cR(l[m],0,n))
if(3>=r)return A.a(s,3)
m=s[3]
l=m.a
m=m.b+j
if(!(m<l.length))return A.a(l,m)
B.a.a2(j,i.cR(l[m],24,n))}}},
j5(a9,b0,b1,b2){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=null,a7=a9>0,a8=280+(a7?B.a.S(1,a9):0)
if(!(a9<12))return A.a(B.bm,a9)
s=B.bm[a9]
r=b2==null
if(r&&b0!==b1)return a6
q=new Int32Array(a8)
p=J.ar(b0,t.co)
for(o=0;o<b0;++o)p[o]=A.pv()
n=new A.fW(new A.e9())
n.ec(b0*s)
a5.ay=n
for(n=!r,m=0;m<b1;++m){if(n){if(!(m<b2.length))return A.a(b2,m)
l=b2[m]===-1}else l=!1
if(l)for(k=0;k<5;++k){j=B.bo[k]
if(a5.eY(k===0&&a7?j+B.a.S(1,a9):j,q,a6)===0)return a6}else{if(r)l=m
else{if(!(m<b2.length))return A.a(b2,m)
l=b2[m]}if(!(l>=0&&l<b0))return A.a(p,l)
i=p[l]
h=i.a
for(l=h.length,g=0,f=!0,e=0,k=0;k<5;++k){j=B.bo[k]
if(k===0&&a7)j+=B.a.S(1,a9)
d=a5.eY(j,q,a5.ay)
c=a5.ay.b.b
c.toString
B.c.h(h,k,c)
if(d===0)return a6
if(f&&B.hx[k]===1){if(!(k<l))return A.a(h,k)
c=h[k]
b=c.a
c=c.b
if(!(c<b.length))return A.a(b,c)
f=b[c].a===0}if(!(k<l))return A.a(h,k)
c=h[k]
b=c.a
c=c.b
if(!(c<b.length))return A.a(b,c)
e+=b[c].a
c=a5.ay.b
c.d+=d
b=c.b
c.b=new A.e8(b.a,b.b+d)
if(k<=3){a=q[0]
for(a0=1;a0<j;++a0){if(!(a0<a8))return A.a(q,a0)
a1=q[a0]
if(a1>a)a=a1}g+=a}}i.b=f
i.d=!1
c=!1
if(f){if(1>=l)return A.a(h,1)
b=h[1]
a2=b.a
b=b.b
if(!(b<a2.length))return A.a(a2,b)
a3=a2[b].b
if(2>=l)return A.a(h,2)
b=h[2]
a2=b.a
b=b.b
if(!(b<a2.length))return A.a(a2,b)
a4=a2[b].b
if(3>=l)return A.a(h,3)
l=h[3]
b=l.a
l=l.b
if(!(l<b.length))return A.a(b,l)
l=(b[l].b<<24|a3<<16|a4)>>>0
i.c=l
if(e===0){c=h[0]
b=c.a
c=c.b
if(!(c<b.length))return A.a(b,c)
c=b[c].b<24}if(c){i.d=!0
b=h[0]
a2=b.a
b=b.b
if(!(b<a2.length))return A.a(a2,b)
i.c=(l|a2[b].b<<8)>>>0}l=c}else l=c
l=!l&&g<6
i.e=l
if(l)a5.hy(i)}}return p},
cZ(a){var s
if(a<4)return a+1
s=B.a.j(a-2,1)
return B.a.S(2+(a&1),s)+this.b.af(s)+1},
eT(a,b){var s,r,q
if(b>120)return b-120
else{s=b-1
if(!(s>=0))return A.a(B.bp,s)
r=B.bp[s]
q=(r>>>4)*a+(8-(r&15))
return q>=1?q:1}},
ij(a,b){var s,r,q,p,o,n,m,l,k=B.a.S(1,B.a.a2(8,b.e)),j=new Uint32Array(k),i=b.d
i.toString
s=J.a4(B.p.gA(i),0,null)
r=J.a4(B.p.gA(j),0,null)
i=b.d
if(0>=i.length)return A.a(i,0)
i=i[0]
if(0>=k)return A.a(j,0)
j[0]=i
q=4*a
for(i=s.length,p=r.length,o=r.$flags|0,n=4;n<q;++n){if(!(n<i))return A.a(s,n)
m=s[n]
l=n-4
if(!(l<p))return A.a(r,l)
l=r[l]
o&2&&A.b(r)
if(!(n<p))return A.a(r,n)
r[n]=m+l&255}for(q=4*k;n<q;++n){o&2&&A.b(r)
if(!(n<p))return A.a(r,n)
r[n]=0}b.d=j
return!0},
co(a,b,c,d,e){var s
if(c===0||a==null)return 0
s=b*B.a.j(e,c)+B.a.j(d,c)
if(!(s<a.length))return A.a(a,s)
return a[s]},
eG(a,b){var s=this,r=s.co(s.as,s.Q,s.z,a,b),q=s.ax
if(!(r<q.length))return A.a(q,r)
return q[r]}}
A.hd.prototype={
jQ(a,b){return this.ik(a,b)}}
A.hX.prototype={
cE(){var s,r,q,p=this.a
if(p<32){s=this.d
r=B.a.a3(s[0],p)
s=s[1]
if(!(p>=0))return A.a(B.Z,p)
q=r+((s&B.Z[p])>>>0)*(B.Z[32-p]+1)}else{s=this.d
q=p===32?s[1]:B.a.a3(s[1],p-32)}return q},
af(a){var s,r,q=this
if(!q.b&&a<25){s=q.cE()
if(!(a<33))return A.a(B.Z,a)
r=B.Z[a]
q.a+=a
q.c1()
return(s&r)>>>0}else{q.b=!0
throw A.h(A.o("Not enough data in input."))}},
c1(){var s,r,q,p=this,o=p.c,n=p.d,m=n.$flags|0,l=o.c
for(;;){if(!(p.a>=8&&o.d<l))break
s=J.c(o.a,o.d++)
r=n[0]
q=n[1]
m&2&&A.b(n)
n[0]=(r>>>8)+(q&255)*16777216
n[1]=q>>>8
n[1]=(n[1]|s*16777216)>>>0
p.a-=8}}}
A.jE.prototype={}
A.cE.prototype={
ae(){return"VP8LImageTransformType."+this.b}}
A.hY.prototype={
jZ(a,b,c,d,e,f){var s,r,q,p,o=this,n=o.b
switch(o.a.a){case 2:o.jt(e,f,(b-a)*n)
break
case 0:o.k5(a,b,c,d,e,f)
if(b!==o.c){s=f-n
B.p.aq(e,s,s+n,c,f+(b-a-1)*n)}break
case 1:o.jy(a,b,c,d,e,f)
break
case 3:if(d===f&&o.e>0){r=b-a
q=r*A.bZ(n,o.e)
p=f+r*n-q
B.p.aq(e,p,p+q,c,f)
o.fn(a,b,c,p,e,f)}else o.fn(a,b,c,d,e,f)
break}},
jx(a,b,c,d){var s,r,q,p,o,n,m=this.e,l=B.a.a2(8,m),k=this.b,j=this.d
if(l<8){s=B.a.S(1,m)-1
r=B.a.S(1,l)-1
for(q=a;q<b;++q)for(p=0,o=0;o<k;++o){if((o&s)>>>0===0){p=J.c(c.a,c.d);++c.d}m=(p&r)>>>0
if(!(m>=0&&m<j.length))return A.a(j,m)
m=j[m]
J.x(d.a,d.d,m>>>8&255);++d.d
p=B.a.j(p,l)}}else for(q=a;q<b;++q)for(o=0;o<k;++o){n=J.c(c.a,c.d);++c.d
if(!(n>=0&&n<j.length))return A.a(j,n)
m=j[n]
J.x(d.a,d.d,m>>>8&255);++d.d}},
fn(a,b,c,d,e,f){var s,r,q,p,o,n,m,l,k,j=this.e,i=B.a.a2(8,j),h=this.b,g=this.d
if(i<8){s=B.a.S(1,j)-1
r=B.a.S(1,i)-1
for(j=e.$flags|0,q=c.length,p=a;p<b;++p)for(o=0,n=0;n<h;++n,f=l){if((n&s)>>>0===0){m=d+1
if(!(d>=0&&d<q))return A.a(c,d)
o=c[d]>>>8&255
d=m}l=f+1
k=o&r
if(!(k>=0&&k<g.length))return A.a(g,k)
k=g[k]
j&2&&A.b(e)
if(!(f>=0&&f<e.length))return A.a(e,f)
e[f]=k
o=B.a.a2(o,i)}}else for(j=c.length,q=e.$flags|0,p=a;p<b;++p)for(n=0;n<h;++n,f=l,d=m){l=f+1
g.toString
m=d+1
if(!(d>=0&&d<j))return A.a(c,d)
k=c[d]>>>8&255
if(!(k<g.length))return A.a(g,k)
k=g[k]
q&2&&A.b(e)
if(!(f>=0&&f<e.length))return A.a(e,f)
e[f]=k}},
jy(a5,a6,a7,a8,a9,b0){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a=this,a0=a.b,a1=a.e,a2=B.a.S(1,a1)-1,a3=A.bZ(a0,a1),a4=B.a.j(a5,a.e)*a3
for(a1=a7.length,s=a9.$flags|0,r=a5;r<a6;){q=new Uint8Array(3)
for(p=a4,o=0;o<a0;++o){if((o&a2)>>>0===0){n=a.d
m=p+1
if(!(p<n.length))return A.a(n,p)
n=n[p]
q[0]=n&255
q[1]=n>>>8&255
q[2]=n>>>16&255
p=m}n=b0+o
l=a8+o
if(!(l<a1))return A.a(a7,l)
l=a7[l]
k=l>>>8&255
j=q[0]
i=$.at()
i.$flags&2&&A.b(i)
i[0]=j
j=$.aF()
if(0>=j.length)return A.a(j,0)
h=j[0]
i[0]=k
g=j[0]
f=$.im()
f.$flags&2&&A.b(f)
f[0]=h*g
e=$.lu()
if(0>=e.length)return A.a(e,0)
d=(l>>>16&255)+(e[0]>>>5)>>>0&255
i[0]=q[1]
h=j[0]
i[0]=k
f[0]=h*j[0]
c=e[0]
i[0]=q[2]
h=j[0]
i[0]=d
f[0]=h*j[0]
b=e[0]
s&2&&A.b(a9)
if(!(n<a9.length))return A.a(a9,n)
a9[n]=(l&4278255360|d<<16|((l&255)+(c>>>5)>>>0)+(b>>>5)>>>0&255)>>>0}b0+=a0
a8+=a0;++r
if((r&a2)>>>0===0)a4+=a3}},
c9(a,b){return(((a&4278255360)>>>0)+((b&4278255360)>>>0)&4278255360|(a&16711935)+(b&16711935)&16711935)>>>0},
k5(b1,b2,b3,b4,b5,b6){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8=this,a9=4278190080,b0=a8.b
if(b1===0){s=b3.length
if(!(b4<s))return A.a(b3,b4)
r=a8.c9(b3[b4],a9)
b5.$flags&2&&A.b(b5)
q=b5.length
if(!(b6<q))return A.a(b5,b6)
b5[b6]=r
p=b4+1
o=b6+1
n=b0-1
m=b5[b6]
for(r=b5.$flags|0,l=0;l<n;++l){k=p+l
if(!(k<s))return A.a(b3,k)
m=a8.c9(b3[k],m)
k=o+l
r&2&&A.b(b5)
if(!(k<q))return A.a(b5,k)
b5[k]=m}b4+=b0
b6+=b0;++b1}s=a8.e
j=B.a.S(1,s)
i=j-1
h=A.bZ(b0,s)
g=B.a.j(b1,a8.e)*h
for(s=b3.length,r=~i,q=b5.length,f=b1;f<b2;){k=b6-b0
if(!(k>=0&&k<q))return A.a(b5,k)
e=b5[k]
if(!(b4<s))return A.a(b3,b4)
k=a8.c9(b3[b4],e)
b5.$flags&2&&A.b(b5)
if(!(b6<q))return A.a(b5,b6)
b5[b6]=k
for(d=g,c=1;c<b0;c=a1,d=b){k=a8.d
b=d+1
if(!(d<k.length))return A.a(k,d)
a=k[d]>>>8&15
a0=$.qW[a]
a1=((c&r)>>>0)+j
if(a1>b0)a1=b0
a2=b4+c
k=b6+c
a3=k-b0
a4=a1-c
if(a===0)for(a5=b5.$flags|0,l=0;l<a4;++l){a6=k+l
a7=a2+l
if(!(a7>=0&&a7<s))return A.a(b3,a7)
a7=a8.c9(b3[a7],a9)
a5&2&&A.b(b5)
if(!(a6>=0&&a6<q))return A.a(b5,a6)
b5[a6]=a7}else if(a===1){a5=k-1
if(!(a5>=0&&a5<q))return A.a(b5,a5)
m=b5[a5]
for(a5=b5.$flags|0,l=0;l<a4;++l){a6=a2+l
if(!(a6>=0&&a6<s))return A.a(b3,a6)
m=a8.c9(b3[a6],m)
a6=k+l
a5&2&&A.b(b5)
if(!(a6>=0&&a6<q))return A.a(b5,a6)
b5[a6]=m}}else for(l=0;l<a4;++l){a5=k+l
a6=a5-1
if(!(a6>=0&&a6<q))return A.a(b5,a6)
e=a0.$3(b5[a6],b5,a3+l)
a6=a2+l
if(!(a6>=0&&a6<s))return A.a(b3,a6)
a6=a8.c9(b3[a6],e)
b5.$flags&2&&A.b(b5)
if(!(a5>=0&&a5<q))return A.a(b5,a5)
b5[a5]=a6}}b4+=b0
b6+=b0;++f
if((f&i)>>>0===0)g+=h}},
jt(a,b,c){var s,r,q,p,o,n
for(s=a.length,r=a.$flags|0,q=0;q<c;++q){p=b+q
if(!(p<s))return A.a(a,p)
o=a[p]
n=o>>>8&255
r&2&&A.b(a)
a[p]=(o&4278255360|(o&16711935)+(n<<16|n)&16711935)>>>0}}}
A.jK.prototype={
gfA(){var s=this,r=s.d
if(r>1||s.e>=4||s.f>1||s.r!==0)return!1
return!0},
dR(a,b,c){var s,r,q,p,o,n,m=this
if(!m.gfA())return!1
s=m.e
if(!(s<4))return A.a(B.bU,s)
r=B.bU[s]
if(m.d===0){s=m.b
q=a*s
p=m.a
B.f.aq(c,q,b*s,p.a,p.d-p.b+q)}else{s=a+b
p=m.x
p===$&&A.d()
p.dx=c
o=p.c
if(m.y)s=p.hR(o.a,o.b,s)
else{n=p.cx
n.toString
p=p.ds(n,o.a,o.b,s,t.kX.a(p.gjP()))
s=p}if(!s)return!1}if(r!=null){s=m.b
r.$6(s,m.c,s,a,b,c)}if(m.f===1)if(!m.ib(c,m.b,m.c,a,b))return!1
if(a+b>=m.c)m.w=!0
return!0},
ib(a,b,c,d,e){if(b<=0||c<=0||d<0||e<0||d+e>c)return!1
return!0}}
A.f4.prototype={
hn(a,b){var s=this,r=a.G()
s.r=0
s.f=(r&1)!==0
s.w=a.d-a.b
s.x=b-16}}
A.he.prototype={}
A.fU.prototype={}
A.fV.prototype={}
A.e8.prototype={
gu(a){return this.a.length-this.b}}
A.e7.prototype={
c7(a,b){var s,r,q,p,o,n=b.cE()&255,m=this.a
if(!(a<m.length))return A.a(m,a)
s=m[a]
r=s.a
q=s.b+n
if(!(q<r.length))return A.a(r,q)
p=r[q].a-8
if(p>0){b.a+=8
o=b.cE()
m=m[a]
s=m.a
r=m.b+n
if(!(r<s.length))return A.a(s,r)
n=n+s[r].b+((o&B.a.a_(1,p)-1)>>>0)}else m=s
s=b.a
r=m.a
m=m.b+n
if(!(m>=0&&m<r.length))return A.a(r,m)
m=r[m]
b.a=s+m.a
return m.b}}
A.e9.prototype={}
A.fW.prototype={
ec(a){var s=this.b=this.a,r=A.lC(a)
s.e=a
s.b=s.a=r}}
A.dE.prototype={
ae(){return"WebPFormat."+this.b}}
A.dF.prototype={$iL:1,
gR(){return this.a},
gN(){return this.b}}
A.ei.prototype={}
A.jL.prototype={
br(a){var s=A.t(t.L.a(a),!1,null,0)
this.b=s
if(!this.eF(s))return!1
return!0},
aA(a){var s,r=this,q=null,p=A.t(t.L.a(a),!1,q,0)
r.b=p
if(!r.eF(p))return q
p=new A.ei(B.a3,A.k([],t.J))
r.a=p
s=r.b
s.toString
if(!r.fb(s,p))return q
p=r.a
switch(p.f.a){case 3:p.as=p.z.length
return p
case 2:s=r.b
s.toString
s.d=p.ay
if(!A.md(s,p).cu())return q
p=r.a
p.as=p.z.length
return p
case 1:s=r.b
s.toString
s.d=p.ay
if(!A.mb(s,p).cu())return q
p=r.a
p.as=p.z.length
return p
case 0:throw A.h(A.o("Unknown format for WebP"))}},
ak(a){var s,r,q,p=this,o=p.b
if(o==null||p.a==null)return null
s=p.a
if(s.e){s=s.z
r=s.length
if(a>=r)return null
if(!(a<r))return A.a(s,a)
q=s[a]
s=q.x
s===$&&A.d()
r=q.w
r===$&&A.d()
return p.ev(o.bW(s,r),a)}r=s.f
if(r===B.an)return A.md(o.bW(s.ch,s.ay),s).bJ()
else if(r===B.aO)return A.mb(o.bW(s.ch,s.ay),s).bJ()
return null},
aY(a,b){var s,r,q,p,o,n,m,l,k=this,j=null
if(k.aA(t.L.a(a))==null)return j
s=k.a.e
if(!s)return k.ak(0)
for(r=j,q=r,p=0;s=k.a,p<s.as;++p){s=s.z
if(!(p<s.length))return A.a(s,p)
b=s[p]
o=k.ak(p)
if(o==null)continue
o.y=b.e
if(q==null||r==null){s=k.a
n=s.a
s=s.b
m=o.gbU()
l=o.a
l=l==null?j:l.gM()
if(l==null)l=B.e
q=A.P(j,j,l,o.y,B.i,s,j,0,m,j,B.e,n,!1)
r=q}else{r=A.bP(r,!1,!1)
s=b.f
s===$&&A.d()
if(s){s=r.a
if(s!=null)s.aS(0,j)}}A.ig(r,o,B.V,j,j,b.a,b.b,j,j,j,j)
q.b5(r)}return q},
ev(a,b){var s,r,q,p=null,o=A.k([],t.J),n=new A.ei(B.a3,o)
if(!this.fb(a,n))return p
s=n.f
if(s===B.a3)return p
n.as=this.a.as
if(n.e){s=o.length
if(b>=s)return p
r=o[b]
o=r.x
o===$&&A.d()
s=r.w
s===$&&A.d()
return this.ev(a.bW(o,s),b)}else{q=a.bW(n.ch,n.ay)
if(s===B.an)return A.md(q,n).bJ()
else if(s===B.aO)return A.mb(q,n).bJ()}return p},
eF(a){if(a.ag(4)!=="RIFF")return!1
a.k()
if(a.ag(4)!=="WEBP")return!1
return!0},
fb(a,b){var s,r,q,p,o,n,m,l,k,j,i,h,g
for(s=a.c,r=a.b;a.d<s;){q=a.ag(4)
p=a.k()
o=p+1>>>1<<1>>>0
n=a.d
m=n-r
switch(q){case"VP8X":if(!this.it(a,b))return!1
break
case"VP8 ":b.ay=m
b.ch=p
b.f=B.aO
break
case"VP8L":b.ay=m
b.ch=p
b.f=B.an
break
case"ALPH":b.toString
n=a.a
l=a.e
k=J.a6(n)
j=k.gu(n)
k=k.gu(n)
n=new A.am(n,0,Math.min(j,k),0,l)
b.at=n
n.d=a.d
a.d+=o
break
case"ANIM":b.f=B.kN
i=a.k()
n=new Uint8Array(4)
n[0]=i>>>8&255
n[1]=i>>>16&255
n[2]=i>>>24&255
n[3]=i&255
a.p()
break
case"ANMF":if(!this.iq(a,b,p))return!1
break
case"ICCP":b.toString
h=a.am(p)
a.d=n+(h.c-h.d)
h.a4()
break
case"EXIF":b.toString
b.w=a.ag(p)
break
case"XMP ":b.toString
a.ag(p)
break
default:a.d=n+o
break}n=a.d
g=o-(n-r-m)
if(g>0)a.d=n+g}if(!b.d)b.d=b.at!=null
return b.f!==B.a3},
it(a,b){var s,r,q,p,o=a.G()
if((o&192)!==0)return!1
s=B.a.j(o,4)
r=B.a.j(o,1)
if((o&1)!==0)return!1
if(a.bi()!==0)return!1
q=a.bi()
p=a.bi()
b.a=q+1
b.b=p+1
b.e=(r&1)!==0
b.d=(s&1)!==0
return!0},
iq(a,b,c){var s,r=a.bi(),q=a.bi()
a.bi()
a.bi()
s=new A.he(r*2,q*2,a.bi())
s.hn(a,c)
if(s.r!==0)return!1
B.c.I(b.z,s)
return!0}}
A.fX.prototype={
ae(){return"IccProfileCompression."+this.b}}
A.d6.prototype={
jJ(){var s,r=this
if(r.b===B.av)return r.c
s=B.D.bS(r.c)
r.c=s
r.b=B.av
return s}}
A.fT.prototype={
ae(){return"FrameType."+this.b}}
A.bw.prototype={
gaH(){var s=this.x
return s===$?this.x=A.k([],t.g):s},
hg(a,b,c,d){var s,r,q,p=this,o=a.gM(),n=a.gbU(),m=a.a
p.es(d,b,o,n,m==null?null:m.gT())
o=a.b
if(o!=null)p.b=A.hs(o,t.N,t.w)
o=a.d
if(o!=null){n=t.N
p.d=A.hs(o,n,n)}B.c.I(p.gaH(),p)
if(!c){s=a.gaH().length
for(o=t.g,r=1;r<s;++r){q=a.x
if(q===$)q=a.x=A.k([],o)
if(!(r<q.length))return A.a(q,r)
p.b5(A.h0(q[r],b,!1,d))}}},
hf(a,b,c){var s,r,q,p,o=this,n=a.b
if(n!=null)o.b=A.hs(n,t.N,t.w)
n=a.d
if(n!=null){s=t.N
o.d=A.hs(n,s,s)}B.c.I(o.gaH(),o)
if(!b&&a.gaH().length>1){r=a.gaH().length
for(n=t.g,q=1;q<r;++q){p=a.x
if(p===$)p=a.x=A.k([],n)
if(!(q<p.length))return A.a(p,q)
o.b5(A.bP(p[q],!1,!1))}}},
b5(a){var s=this
if(a==null)a=A.bP(s,!0,!0)
a.z=s.gaH().length
if(s.gaH().length===0||B.c.gdY(s.gaH())!==a)B.c.I(s.gaH(),a)
return a},
da(){return this.b5(null)},
es(a,b,c,d,e){var s,r,q=this,p=null
switch(c.a){case 0:if(e==null){s=B.b.b6(a*d/8)
r=new A.de($,s,p,a,b,d)
s=Math.max(s*b,1)
r.d=new Uint8Array(s)
q.a=r}else{s=B.b.b6(a/8)
r=new A.de($,s,e,a,b,1)
s=Math.max(s*b,1)
r.d=new Uint8Array(s)
q.a=r}break
case 1:if(e==null){s=B.b.b6(a*(d<<1>>>0)/8)
r=new A.dg($,s,p,a,b,d)
s=Math.max(s*b,1)
r.d=new Uint8Array(s)
q.a=r}else{s=B.b.b6(a/4)
r=new A.dg($,s,e,a,b,1)
s=Math.max(s*b,1)
r.d=new Uint8Array(s)
q.a=r}break
case 2:if(e==null){if(d===2)s=a
else if(d===4)s=a*2
else s=d===3?B.b.b6(a*1.5):B.b.b6(a/2)
r=new A.di($,s,p,a,b,d)
s=Math.max(s*b,1)
r.d=new Uint8Array(s)
q.a=r}else{s=B.b.b6(a/2)
r=new A.di($,s,e,a,b,1)
s=Math.max(s*b,1)
r.d=new Uint8Array(s)
q.a=r}break
case 3:if(e==null)q.a=A.nb(a,b,d)
else q.a=new A.dj(new Uint8Array(a*b),e,a,b,1)
break
case 4:s=a*b
if(e==null)q.a=new A.df(new Uint16Array(s*d),p,a,b,d)
else q.a=new A.df(new Uint16Array(s),e,a,b,1)
break
case 5:q.a=A.py(a,b,d)
break
case 6:q.a=new A.ee(new Int8Array(a*b*d),a,b,d)
break
case 7:q.a=new A.ec(new Int16Array(a*b*d),a,b,d)
break
case 8:q.a=new A.ed(new Int32Array(a*b*d),a,b,d)
break
case 9:q.a=A.pw(a,b,d)
break
case 10:q.a=A.px(a,b,d)
break
case 11:q.a=new A.eb(new Float64Array(a*b*4*d),a,b,d)
break}},
B(a){var s=this
return"Image("+s.gR()+", "+s.gN()+", "+s.gM().b+", "+s.gbU()+")"},
gR(){var s=this.a
s=s==null?null:s.a
return s==null?0:s},
gN(){var s=this.a
s=s==null?null:s.b
return s==null?0:s},
gM(){var s=this.a
s=s==null?null:s.gM()
return s==null?B.e:s},
gbK(){var s=this.e
return s==null?this.e=new A.c8(A.H(t.N,t.P)):s},
fU(a,b){var s=this,r=s.b;(r==null?s.b=A.H(t.N,t.w):r).h(0,a,b)
if(s.b.a===0)s.b=null},
gF(a){var s=this.a
return s.gF(s)},
gA(a){var s=this.a
s=s==null?null:s.gA(s)
if(s==null)s=B.f.gA(new Uint8Array(0))
return s},
a4(){var s=this.a
s=s==null?null:J.af(s.gA(s))
return s==null?J.af(this.gA(0)):s},
gbU(){var s=this.a
s=s==null?null:s.gT()
s=s==null?null:s.b
if(s==null){s=this.a
s=s==null?null:s.c}return s==null?0:s},
gcz(){var s=this.a
return(s==null?null:s.gT())!=null},
fw(a,b){return a>=0&&b>=0&&a<this.gR()&&b<this.gN()},
aR(a,b,c,d){var s=this.a
s=s==null?null:s.aR(a,b,c,d)
if(s==null)s=new A.bM(new Uint8Array(0))
return s},
O(a,b,c){var s
A.w(a)
A.w(b)
s=this.a
s=s==null?null:s.O(a,b,c)
return s==null?new A.J():s},
aM(a,b){return this.O(a,b,null)},
ac(a,b){if(a<0||a>=this.gR()||b<0||b>=this.gN())return new A.J()
return this.O(a,b,null)},
e5(a,b,c){switch(c.a){case 0:return this.ac(B.b.i(a),B.b.i(b))
case 1:case 3:return this.fQ(a,b)
case 2:return this.fP(a,b)}},
fQ(a,b){var s,r,q,p,o,n,m=this,l=B.b.i(a),k=l-(a>=0?0:1),j=k+1
l=B.b.i(b)
s=l-(b>=0?0:1)
r=s+1
l=new A.iM(a-k,b-s)
q=m.ac(k,s)
p=r>=m.gN()?q:m.ac(k,r)
o=j>=m.gR()?q:m.ac(j,s)
n=j>=m.gR()||r>=m.gN()?q:m.ac(j,r)
return m.aR(l.$4(q.gn(),o.gn(),p.gn(),n.gn()),l.$4(q.gt(),o.gt(),p.gt(),n.gt()),l.$4(q.gq(),o.gq(),p.gq(),n.gq()),l.$4(q.gv(),o.gv(),p.gv(),n.gv()))},
fP(d2,d3){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6=this,c7=B.b.i(d2),c8=c7-(d2>=0?0:1),c9=c8-1,d0=c8+1,d1=c8+2
c7=B.b.i(d3)
s=c7-(d3>=0?0:1)
r=s-1
q=s+1
p=s+2
o=d2-c8
n=d3-s
c7=new A.iL()
m=c6.ac(c8,s)
l=c9<0
k=!l
j=!k||r<0?m:c6.ac(c9,r)
i=l?m:c6.ac(c8,r)
h=r<0
g=h||d0>=c6.gR()?m:c6.ac(d0,r)
f=d1>=c6.gR()||h?m:c6.ac(d1,r)
e=c7.$5(o,j.gn(),i.gn(),g.gn(),f.gn())
d=c7.$5(o,j.gt(),i.gt(),g.gt(),f.gt())
c=c7.$5(o,j.gq(),i.gq(),g.gq(),f.gq())
b=c7.$5(o,j.gv(),i.gv(),g.gv(),f.gv())
a=l?m:c6.ac(c9,s)
a0=d0>=c6.gR()?m:c6.ac(d0,s)
a1=d1>=c6.gR()?m:c6.ac(d1,s)
a2=c7.$5(o,a.gn(),m.gn(),a0.gn(),a1.gn())
a3=c7.$5(o,a.gt(),m.gt(),a0.gt(),a1.gt())
a4=c7.$5(o,a.gq(),m.gq(),a0.gq(),a1.gq())
a5=c7.$5(o,a.gv(),m.gv(),a0.gv(),a1.gv())
a6=!k||q>=c6.gN()?m:c6.ac(c9,q)
a7=q>=c6.gN()?m:c6.ac(c8,q)
a8=d0>=c6.gR()||q>=c6.gN()?m:c6.ac(d0,q)
a9=d1>=c6.gR()||q>=c6.gN()?m:c6.ac(d1,q)
b0=c7.$5(o,a6.gn(),a7.gn(),a8.gn(),a9.gn())
b1=c7.$5(o,a6.gt(),a7.gt(),a8.gt(),a9.gt())
b2=c7.$5(o,a6.gq(),a7.gq(),a8.gq(),a9.gq())
b3=c7.$5(o,a6.gv(),a7.gv(),a8.gv(),a9.gv())
b4=!k||p>=c6.gN()?m:c6.ac(c9,p)
b5=p>=c6.gN()?m:c6.ac(c8,p)
b6=d0>=c6.gR()||p>=c6.gN()?m:c6.ac(d0,p)
b7=d1>=c6.gR()||p>=c6.gN()?m:c6.ac(d1,p)
b8=c7.$5(o,b4.gn(),b5.gn(),b6.gn(),b7.gn())
b9=c7.$5(o,b4.gt(),b5.gt(),b6.gt(),b7.gt())
c0=c7.$5(o,b4.gq(),b5.gq(),b6.gq(),b7.gq())
c1=c7.$5(o,b4.gv(),b5.gv(),b6.gv(),b7.gv())
c2=c7.$5(n,e,a2,b0,b8)
c3=c7.$5(n,d,a3,b1,b9)
c4=c7.$5(n,c,a4,b2,c0)
c5=c7.$5(n,b,a5,b3,c1)
return c6.aR(B.b.i(c2),B.b.i(c3),B.b.i(c4),B.b.i(c5))},
bM(a,b,c){var s
if(t.mK.b(c))if(c.gb8().gT()!=null)if(this.gcz()){s=this.a
if(s!=null)s.a5(a,b,c.gP(),0,0)
return}s=this.a
if(s!=null)s.aj(a,b,c.gn(),c.gt(),c.gq(),c.gv())},
a5(a,b,c,d,e){var s=this.a
return s==null?null:s.a5(a,b,c,d,e)},
gE(){var s=this.a
s=s==null?null:s.gE()
return s==null?0:s},
aS(a,b){var s=this.a
return s==null?null:s.aS(0,b)},
cs(a){return this.aS(0,null)},
fq(a8,a9){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5=this,a6=null,a7=a5.gM()
if(a9==null)a9=a5.gbU()
s=B.bZ.m(0,a7)
a8=s
r=!1
if(a7===a5.gM())if(a9===a5.gbU()){q=a5.a
r=(q==null?a6:q.gT())==null}if(r){p=A.bP(a5,!1,!1)
return p}for(r=a5.gaH(),q=r.length,o=t.N,n=t.p,m=a6,l=0;l<r.length;r.length===q||(0,A.V)(r),++l,m=d){k=r[l]
j=k.a
i=j==null
h=i?a6:j.a
if(h==null)h=0
j=i?a6:j.b
if(j==null)j=0
i=k.e
i=i==null?a6:A.dZ(i)
g=k.c
if(g==null)g=a6
else{f=g.a
e=g.b
g=g.c
g=new A.d6(f,e,new Uint8Array(g.subarray(0,A.bh(0,a6,g.length))))}f=k.w
e=k.r
p=A.P(a6,i,a7,k.y,f,j,g,e,a9,a6,B.e,h,!1)
j=k.d
p.skl(j!=null?A.hs(j,o,o):a6)
if(m!=null){m.b5(p)
d=m}else d=p
j=p.a
c=j==null?a6:j.gT()
j=p.a
j=j==null?a6:j.gT()
b=j==null?a6:j.gM()
if(b==null)b=a7
j=k.a
if(c!=null){a=A.H(n,n)
a0=j==null?a6:j.O(0,0,a6)
if(a0==null)a0=new A.J()
for(j=p.a,j=j.gF(j),a1=a6,a2=0;j.D();){a3=j.gL()
a4=A.ow(B.b.bq(a0.gab()*255),B.b.bq(a0.ga7()*255),B.b.bq(a0.gaa()*255),0)
if(a.Z(a4)){i=a.m(0,a4)
i.toString
a3.sP(i)}else{a.h(0,a4,a2)
a3.sP(a2)
a1=A.aT(a0,a8,b,a9,a1)
c.bd(a2,a1.gn(),a1.gt(),a1.gq());++a2}a0.D()}}else{a0=j==null?a6:j.O(0,0,a6)
if(a0==null)a0=new A.J()
for(j=p.a,j=j.gF(j);j.D();){A.aT(a0,a8,a6,a6,j.gL())
a0.D()}}}m.toString
return m},
fp(a){return this.fq(null,a)},
ju(a){var s,r,q,p
t.je.a(a)
if(this.d==null){s=t.N
this.d=A.H(s,s)}for(s=new A.U(a,a.r,a.e,A.m(a).l("U<1>"));s.D();){r=s.d
q=this.d
q.toString
p=a.m(0,r)
p.toString
q.h(0,r,p)}},
hL(a,b,c){var s,r=65536
switch(b.a){case 0:return null
case 1:return null
case 2:return null
case 3:s=a===B.l?r:256
return new A.ba(new Uint8Array(s*c),s,c)
case 4:s=a===B.l?r:256
return new A.eK(new Uint16Array(s*c),s,c)
case 5:s=a===B.l?r:256
return new A.eL(new Uint32Array(s*c),s,c)
case 6:s=a===B.l?r:256
return new A.eJ(new Int8Array(s*c),s,c)
case 7:s=a===B.l?r:256
return new A.eH(new Int16Array(s*c),s,c)
case 8:s=a===B.l?r:256
return new A.eI(new Int32Array(s*c),s,c)
case 9:s=a===B.l?r:256
return new A.eE(new Uint16Array(s*c),s,c)
case 10:s=a===B.l?r:256
return new A.eF(new Float32Array(s*c),s,c)
case 11:s=a===B.l?r:256
return new A.eG(new Float64Array(s*c),s,c)}},
skl(a){this.d=t.lG.a(a)}}
A.iM.prototype={
$4(a,b,c,d){var s=this.b
return a+this.a*(b-a+s*(a+d-c-b))+s*(c-a)},
$S:58}
A.iL.prototype={
$5(a,b,c,d,e){var s=-b,r=a*a
return c+0.5*(a*(s+d)+r*(2*b-5*c+4*d-e)+r*a*(s+3*c-3*d+e))},
$S:59}
A.al.prototype={
gT(){return null},
fO(a,b){var s,r,q,p,o,n,m,l=this
if(b==null)return J.af(l.gA(l))
s=l.c
if(s===4){s=b===B.cG
if(s||b===B.aV||b===B.aU){r=a?l:l.J()
if(s)for(s=r.gF(r);s.D();){q=s.gL()
p=q.gn()
o=q.gt()
n=q.gq()
q.sn(q.gv())
q.st(n)
q.sq(o)
q.sv(p)}else if(b===B.aV)for(s=r.gF(r);s.D();){q=s.gL()
p=q.gn()
o=q.gt()
n=q.gq()
q.sn(q.gv())
q.st(p)
q.sq(o)
q.sv(n)}else if(b===B.aU)for(s=r.gF(r);s.D();){q=s.gL()
p=q.gn()
o=q.gt()
n=q.gq()
m=q.gv()
q.sn(n)
q.st(o)
q.sq(p)
q.sv(m)}return J.af(r.gA(r))}}else if(s===3)if(b===B.cI){r=a?l:l.J()
for(s=r.gF(r);s.D();){q=s.gL()
p=q.gn()
q.sn(q.gq())
q.sq(p)}return J.af(r.gA(r))}return J.af(l.gA(l))}}
A.dc.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Uint16Array(r.length)
else r=new Uint16Array(A.z(r))
return new A.dc(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.E},
gA(a){return B.a_.gA(this.d)},
gF(a){return A.lQ(this)},
bc(a,b,c,d,e){return A.bb(A.lQ(this),b,c,d,e)},
gu(a){return this.d.byteLength},
gE(){return 1},
aR(a,b,c,d){var s=new Uint16Array(4),r=new A.cS(s)
s[0]=A.M(a)
s[1]=A.M(b)
s[2]=A.M(c)
s[3]=A.M(d)
s=r
return s},
O(a,b,c){if(c==null||!(c instanceof A.cn)||c.d!==this)c=A.lQ(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*this.a*r+a*r
r=this.d
s=A.M(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=A.M(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=A.M(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=A.M(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=A.M(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=A.M(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=A.M(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=A.M(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataFloat16("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.dd.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Float32Array(r.length)
else r=new Float32Array(A.z(r))
return new A.dd(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.J},
gA(a){return B.aj.gA(this.d)},
gF(a){return A.lR(this)},
bc(a,b,c,d,e){return A.bb(A.lR(this),b,c,d,e)},
gu(a){return this.d.byteLength},
gE(){return 1},
aR(a,b,c,d){var s=new Float32Array(4),r=new A.cT(s)
s[0]=a
s[1]=b
s[2]=c
s[3]=d
s=r
return s},
O(a,b,c){if(c==null||!(c instanceof A.co)||c.d!==this)c=A.lR(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s=this.c,r=b*this.a*s+a*s
s=this.d
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=c},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=c
if(q>1){r=p+1
if(!(r<s))return A.a(o,r)
o[r]=d
if(q>2){q=p+2
if(!(q<s))return A.a(o,q)
o[q]=e}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=c
if(q>1){r=p+1
if(!(r<s))return A.a(o,r)
o[r]=d
if(q>2){r=p+2
if(!(r<s))return A.a(o,r)
o[r]=e
if(q>3){q=p+3
if(!(q<s))return A.a(o,q)
o[q]=f}}}},
B(a){return"ImageDataFloat32("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.eb.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Float64Array(r.length)
else r=new Float64Array(A.z(r))
return new A.eb(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.L},
gA(a){return B.ak.gA(this.d)},
gu(a){return this.d.byteLength},
gF(a){return A.lS(this)},
bc(a,b,c,d,e){return A.bb(A.lS(this),b,c,d,e)},
gE(){return 1},
aR(a,b,c,d){var s=new Float64Array(4),r=new A.cU(s)
s[0]=a
s[1]=b
s[2]=c
s[3]=d
s=r
return s},
O(a,b,c){if(c==null||!(c instanceof A.cp)||c.d!==this)c=A.lS(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s=this.c,r=b*this.a*s+a*s
s=this.d
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=c},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=c
if(q>1){r=p+1
if(!(r<s))return A.a(o,r)
o[r]=d
if(q>2){q=p+2
if(!(q<s))return A.a(o,q)
o[q]=e}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=c
if(q>1){r=p+1
if(!(r<s))return A.a(o,r)
o[r]=d
if(q>2){r=p+2
if(!(r<s))return A.a(o,r)
o[r]=e
if(q>3){q=p+3
if(!(q<s))return A.a(o,q)
o[q]=f}}}},
B(a){return"ImageDataFloat64("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.ec.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Int16Array(r.length)
else r=new Int16Array(A.z(r))
return new A.ec(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.N},
gA(a){return B.aE.gA(this.d)},
gF(a){return A.lT(this)},
bc(a,b,c,d,e){return A.bb(A.lT(this),b,c,d,e)},
gu(a){return this.d.byteLength},
gE(){return 32767},
aR(a,b,c,d){var s=B.b.i(a),r=B.b.i(b),q=B.b.i(c),p=B.b.i(d),o=new Int16Array(4),n=new A.cV(o)
o[0]=s
o[1]=r
o[2]=q
o[3]=p
s=n
return s},
O(a,b,c){if(c==null||!(c instanceof A.cq)||c.d!==this)c=A.lT(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*this.a*r+a*r
r=this.d
s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=B.b.i(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=B.b.i(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=B.b.i(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataInt16("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.ed.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Int32Array(r.length)
else r=new Int32Array(A.z(r))
return new A.ed(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.O},
gA(a){return B.U.gA(this.d)},
gF(a){return A.lU(this)},
bc(a,b,c,d,e){return A.bb(A.lU(this),b,c,d,e)},
gu(a){return this.d.byteLength},
gE(){return 2147483647},
aR(a,b,c,d){var s=B.b.i(a),r=B.b.i(b),q=B.b.i(c),p=B.b.i(d),o=new Int32Array(4),n=new A.cW(o)
o[0]=s
o[1]=r
o[2]=q
o[3]=p
s=n
return s},
O(a,b,c){if(c==null||!(c instanceof A.cr)||c.d!==this)c=A.lU(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*this.a*r+a*r
r=this.d
s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=B.b.i(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=B.b.i(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=B.b.i(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataInt32("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.ee.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Int8Array(r.length)
else r=new Int8Array(A.z(r))
return new A.ee(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.M},
gA(a){return B.aF.gA(this.d)},
gF(a){return A.lV(this)},
bc(a,b,c,d,e){return A.bb(A.lV(this),b,c,d,e)},
gu(a){return this.d.byteLength},
gE(){return 127},
aR(a,b,c,d){var s=B.b.i(a),r=B.b.i(b),q=B.b.i(c),p=B.b.i(d),o=new Int8Array(4),n=new A.cX(o)
o[0]=s
o[1]=r
o[2]=q
o[3]=p
s=n
return s},
O(a,b,c){if(c==null||!(c instanceof A.cs)||c.d!==this)c=A.lV(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*(this.a*r)+a*r
r=this.d
s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*(this.a*q)+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=B.b.i(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*(this.a*q)+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=B.b.i(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=B.b.i(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataInt8("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.de.prototype={
kB(a,b,c){var s=Math.max(this.e*b,1)
s=new Uint8Array(s)
this.d!==$&&A.mC()
this.d=s},
ao(a){var s,r=this,q=r.d
if(a){q===$&&A.d()
q=new Uint8Array(q.length)}else{q===$&&A.d()
q=new Uint8Array(A.z(q))}s=r.f
s=s==null?null:s.J()
return new A.de(q,r.e,s,r.a,r.b,r.c)},
J(){return this.ao(!1)},
gM(){return B.w},
gu(a){var s=this.d
s===$&&A.d()
return s.byteLength},
gE(){var s=this.f
s=s==null?null:s.gE()
return s==null?1:s},
gA(a){var s=this.d
s===$&&A.d()
return B.f.gA(s)},
gF(a){return A.eM(this)},
bc(a,b,c,d,e){return A.bb(A.eM(this),b,c,d,e)},
aR(a,b,c,d){var s=new A.cZ(4,0)
s.a9(B.b.i(a),B.b.i(b),B.b.i(c),B.b.i(d))
return s},
O(a,b,c){if(c==null||!(c instanceof A.ct)||c.f!==this)c=A.eM(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eM(r):s).a1(a,b)
r.r.au(0,c)},
a5(a,b,c,d,e){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eM(r):s).a1(a,b)
r.r.ar(c,d,e)},
aj(a,b,c,d,e,f){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eM(r):s).a1(a,b)
r.r.a9(c,d,e,f)},
B(a){return"ImageDataUint1("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){},
gT(){return this.f}}
A.df.prototype={
ao(a){var s,r=this,q=r.d
if(a)q=new Uint16Array(q.length)
else q=new Uint16Array(A.z(q))
s=r.e
s=s==null?null:s.J()
return new A.df(q,s,r.a,r.b,r.c)},
J(){return this.ao(!1)},
gM(){return B.l},
gA(a){return B.a_.gA(this.d)},
gE(){var s=this.e
s=s==null?null:s.gE()
return s==null?65535:s},
gF(a){return A.lW(this)},
bc(a,b,c,d,e){return A.bb(A.lW(this),b,c,d,e)},
gu(a){return this.d.byteLength},
aR(a,b,c,d){var s=B.b.i(a),r=B.b.i(b),q=B.b.i(c),p=B.b.i(d),o=new Uint16Array(4),n=new A.d_(o)
o[0]=s
o[1]=r
o[2]=q
o[3]=p
s=n
return s},
O(a,b,c){if(c==null||!(c instanceof A.cu)||c.d!==this)c=A.lW(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*this.a*r+a*r
r=this.d
s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=B.b.i(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=B.b.i(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=B.b.i(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataUint16("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){},
gT(){return this.e}}
A.dg.prototype={
kC(a,b,c){var s=Math.max(this.e*b,1)
s=new Uint8Array(s)
this.d!==$&&A.mC()
this.d=s},
ao(a){var s,r=this,q=r.d
if(a){q===$&&A.d()
q=new Uint8Array(q.length)}else{q===$&&A.d()
q=new Uint8Array(A.z(q))}s=r.f
s=s==null?null:s.J()
return new A.dg(q,r.e,s,r.a,r.b,r.c)},
J(){return this.ao(!1)},
gM(){return B.B},
gA(a){var s=this.d
s===$&&A.d()
return B.f.gA(s)},
gF(a){return A.eN(this)},
bc(a,b,c,d,e){return A.bb(A.eN(this),b,c,d,e)},
gu(a){var s=this.d
s===$&&A.d()
return s.byteLength},
gE(){var s=this.f
s=s==null?null:s.gE()
return s==null?3:s},
aR(a,b,c,d){var s=new A.d0(4,0)
s.a9(B.b.i(a),B.b.i(b),B.b.i(c),B.b.i(d))
return s},
O(a,b,c){if(c==null||!(c instanceof A.cv)||c.f!==this)c=A.eN(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eN(r):s).a1(a,b)
r.r.av(0,c)},
a5(a,b,c,d,e){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eN(r):s).a1(a,b)
r.r.ar(c,d,e)},
aj(a,b,c,d,e,f){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eN(r):s).a1(a,b)
r.r.a9(c,d,e,f)},
B(a){return"ImageDataUint2("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){},
gT(){return this.f}}
A.dh.prototype={
ao(a){var s=this,r=s.d
if(a)r=new Uint32Array(r.length)
else r=new Uint32Array(A.z(r))
return new A.dh(r,s.a,s.b,s.c)},
J(){return this.ao(!1)},
gM(){return B.K},
gA(a){return B.p.gA(this.d)},
gE(){return 4294967295},
gF(a){return A.lX(this)},
bc(a,b,c,d,e){return A.bb(A.lX(this),b,c,d,e)},
gu(a){return this.d.byteLength},
aR(a,b,c,d){var s=B.b.i(a),r=B.b.i(b),q=B.b.i(c),p=B.b.i(d),o=new Uint32Array(4),n=new A.d1(o)
o[0]=s
o[1]=r
o[2]=q
o[3]=p
s=n
return s},
O(a,b,c){if(c==null||!(c instanceof A.cw)||c.d!==this)c=A.lX(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*this.a*r+a*r
r=this.d
s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=B.b.i(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*this.a*q+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=B.b.i(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=B.b.i(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataUint32("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){}}
A.di.prototype={
kD(a,b,c){var s=Math.max(this.e*b,1)
s=new Uint8Array(s)
this.d!==$&&A.mC()
this.d=s},
ao(a){var s,r=this,q=r.d
if(a){q===$&&A.d()
q=new Uint8Array(q.length)}else{q===$&&A.d()
q=new Uint8Array(A.z(q))}s=r.f
s=s==null?null:s.J()
return new A.di(q,r.e,s,r.a,r.b,r.c)},
J(){return this.ao(!1)},
gM(){return B.C},
gA(a){var s=this.d
s===$&&A.d()
return B.f.gA(s)},
gF(a){return A.eO(this)},
bc(a,b,c,d,e){return A.bb(A.eO(this),b,c,d,e)},
gu(a){var s=this.d
s===$&&A.d()
return s.byteLength},
gE(){var s=this.f
s=s==null?null:s.gE()
return s==null?15:s},
aR(a,b,c,d){var s=B.b.i(a),r=B.b.i(b),q=B.b.i(c),p=B.b.i(d),o=new A.d2(4,new Uint8Array(2))
o.a9(s,r,q,p)
s=o
return s},
O(a,b,c){if(c==null||!(c instanceof A.cx)||c.e!==this)c=A.eO(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eO(r):s).a1(a,b)
r.r.aw(0,c)},
a5(a,b,c,d,e){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eO(r):s).a1(a,b)
r.r.ar(c,d,e)},
aj(a,b,c,d,e,f){var s,r=this
if(r.c<1)return
s=r.r;(s==null?r.r=A.eO(r):s).a1(a,b)
r.r.a9(c,d,e,f)},
B(a){return"ImageDataUint4("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){},
gT(){return this.f}}
A.dj.prototype={
ao(a){var s,r=this,q=r.d
if(a)q=new Uint8Array(q.length)
else q=new Uint8Array(A.z(q))
s=r.e
s=s==null?null:s.J()
return new A.dj(q,s,r.a,r.b,r.c)},
J(){return this.ao(!1)},
gM(){return B.e},
gA(a){return B.f.gA(this.d)},
gF(a){return A.j6(this)},
bc(a,b,c,d,e){return A.bb(A.j6(this),b,c,d,e)},
gu(a){return this.d.byteLength},
gE(){var s=this.e
s=s==null?null:s.gE()
return s==null?255:s},
aR(a,b,c,d){var s=A.pc(B.b.i(B.b.K(a,0,255)),B.b.i(B.b.K(b,0,255)),B.b.i(B.b.K(c,0,255)),B.b.i(B.b.K(d,0,255)))
return s},
O(a,b,c){if(c==null||!(c instanceof A.cy)||c.d!==this)c=A.j6(this)
c.a1(a,b)
return c},
aM(a,b){return this.O(a,b,null)},
aK(a,b,c){var s,r=this.c,q=b*(this.a*r)+a*r
r=this.d
s=B.b.i(c)
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s},
a5(a,b,c,d,e){var s,r,q=this.c,p=b*(this.a*q)+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){q=p+2
n=B.b.i(e)
if(!(q<s))return A.a(o,q)
o[q]=n}}},
aj(a,b,c,d,e,f){var s,r,q=this.c,p=b*(this.a*q)+a*q,o=this.d,n=B.b.i(c)
o.$flags&2&&A.b(o)
s=o.length
if(!(p>=0&&p<s))return A.a(o,p)
o[p]=n
if(q>1){n=p+1
r=B.b.i(d)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>2){n=p+2
r=B.b.i(e)
if(!(n<s))return A.a(o,n)
o[n]=r
if(q>3){q=p+3
n=B.b.i(f)
if(!(q<s))return A.a(o,q)
o[q]=n}}}},
B(a){return"ImageDataUint8("+this.a+", "+this.b+", "+this.c+")"},
aS(a,b){var s,r,q,p,o,n,m,l=this,k=l.c
if(k===1){k=l.d
B.f.aF(k,0,k.length,0)}else if(k===2){s=J.mL(B.f.gA(l.d),0,null)
B.a_.aF(s,0,s.length,0)}else if(k===4){r=J.aG(B.f.gA(l.d),0,null)
B.p.aF(r,0,r.length,0)}else for(q=A.j6(l),k=q.d,p=k.c>0,k=k.d,o=k.$flags|0;q.D();){if(p){n=q.c
m=B.b.i(B.a.K(0,0,255))
o&2&&A.b(k)
if(!(n>=0&&n<k.length))return A.a(k,n)
k[n]=m}q.st(0)
q.sq(0)}},
gT(){return this.e}}
A.ej.prototype={
ae(){return"Interpolation."+this.b}}
A.aW.prototype={}
A.eE.prototype={
J(){return new A.eE(new Uint16Array(A.z(this.c)),this.a,this.b)},
gM(){return B.E},
gE(){return 1},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=A.M(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=A.M(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=A.M(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=A.M(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s,r
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
s=s[a]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
return r[s]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]
s=$.T
s=s!=null?s:A.X()
if(!(r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eF.prototype={
J(){return new A.eF(new Float32Array(A.z(this.c)),this.a,this.b)},
gM(){return B.J},
gE(){return 1},
W(a,b,c){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=c}},
bd(a,b,c,d){var s,r,q,p=this.b
a*=p
s=this.c
s.$flags&2&&A.b(s)
r=s.length
if(!(a>=0&&a<r))return A.a(s,a)
s[a]=b
if(p>1){q=a+1
if(!(q<r))return A.a(s,q)
s[q]=c
if(p>2){p=a+2
if(!(p<r))return A.a(s,p)
s[p]=d}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eG.prototype={
J(){return new A.eG(new Float64Array(A.z(this.c)),this.a,this.b)},
gM(){return B.L},
gE(){return 1},
W(a,b,c){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=c}},
bd(a,b,c,d){var s,r,q,p=this.b
a*=p
s=this.c
s.$flags&2&&A.b(s)
r=s.length
if(!(a>=0&&a<r))return A.a(s,a)
s[a]=b
if(p>1){q=a+1
if(!(q<r))return A.a(s,q)
s[q]=c
if(p>2){p=a+2
if(!(p<r))return A.a(s,p)
s[p]=d}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eH.prototype={
J(){return new A.eH(new Int16Array(A.z(this.c)),this.a,this.b)},
gM(){return B.N},
gE(){return 32767},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=B.a.i(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.b.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.b.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=B.b.i(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eI.prototype={
J(){return new A.eI(new Int32Array(A.z(this.c)),this.a,this.b)},
gM(){return B.O},
gE(){return 2147483647},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=B.a.i(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.b.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.b.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=B.b.i(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eJ.prototype={
J(){return new A.eJ(new Int8Array(A.z(this.c)),this.a,this.b)},
gM(){return B.M},
gE(){return 127},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=B.a.i(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.b.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.b.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=B.b.i(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eK.prototype={
J(){return new A.eK(new Uint16Array(A.z(this.c)),this.a,this.b)},
gM(){return B.l},
gE(){return 65535},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=B.a.i(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.b.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.b.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=B.b.i(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.eL.prototype={
J(){return new A.eL(new Uint32Array(A.z(this.c)),this.a,this.b)},
gM(){return B.K},
gE(){return 4294967295},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=B.a.i(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.b.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.b.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=B.b.i(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s
a*=this.b
s=this.c
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a]},
aV(a){var s,r=this.b
if(r<2)return 0
s=this.c
r=a*r+1
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
aU(a){var s,r=this.b
if(r<3)return 0
s=this.c
r=a*r+2
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
b0(a){var s,r=this.b
if(r<4)return 0
s=this.c
r=a*r+3
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.ba.prototype={
J(){return A.nr(this)},
gM(){return B.e},
gE(){return 255},
W(a,b,c){var s,r,q=this.b
if(b<q){s=this.c
q=a*q+b
r=B.a.i(c)
s.$flags&2&&A.b(s)
if(!(q>=0&&q<s.length))return A.a(s,q)
s[q]=r}},
bd(a,b,c,d){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.b.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.b.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){o=a+2
r=B.b.i(d)
if(!(o<q))return A.a(s,o)
s[o]=r}}},
cP(a,b,c,d,e){var s,r,q,p,o=this.b
a*=o
s=this.c
r=B.a.i(b)
s.$flags&2&&A.b(s)
q=s.length
if(!(a>=0&&a<q))return A.a(s,a)
s[a]=r
if(o>1){r=a+1
p=B.a.i(c)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>2){r=a+2
p=B.a.i(d)
if(!(r<q))return A.a(s,r)
s[r]=p
if(o>3){o=a+3
r=B.a.i(e)
if(!(o<q))return A.a(s,o)
s[o]=r}}}},
b_(a,b){var s,r=this.b
if(b<r){s=this.c
r=a*r+b
if(!(r>=0&&r<s.length))return A.a(s,r)
r=s[r]}else r=0
return r},
aW(a){var s,r
a*=this.b
s=this.c
r=s.length
if(a>=r)return 0
if(!(a>=0))return A.a(s,a)
return s[a]},
aV(a){var s,r,q=this.b
if(q<2)return 0
a*=q
q=this.c
s=q.length
if(a>=s)return 0
r=a+1
if(!(r>=0&&r<s))return A.a(q,r)
return q[r]},
aU(a){var s,r,q=this.b
if(q<3)return 0
a*=q
q=this.c
s=q.length
if(a>=s)return 0
r=a+2
if(!(r>=0&&r<s))return A.a(q,r)
return q[r]},
b0(a){var s,r,q=this.b
if(q<4)return 255
a*=q
q=this.c
s=q.length
if(a>=s)return 0
r=a+3
if(!(r>=0&&r<s))return A.a(q,r)
return q[r]},
bv(a,b){return this.W(a,0,b)},
bu(a,b){return this.W(a,1,b)},
bt(a,b){return this.W(a,2,b)},
bs(a,b){return this.W(a,3,b)}}
A.cn.prototype={
J(){var s=this
return new A.cn(s.a,s.b,s.c,s.d)},
gM(){return B.E},
gu(a){return this.d.c},
gT(){return null},
gE(){return 1},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=A.M(c)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=A.M(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r,q=this.d
if(q.c>1){q=q.d
s=this.c+1
r=A.M(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r,q=this.d
if(q.c>2){q=q.d
s=this.c+2
r=A.M(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=$.T
r=r!=null?r:A.X()
if(!(s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sv(a){var s,r,q,p=this.d
if(p.c>3){s=this.gt()
p=p.d
r=this.c+3
q=A.M(s)
p.$flags&2&&A.b(p)
if(!(r>=0&&r<p.length))return A.a(p,r)
p[r]=q}},
gab(){return this.gn()/1},
sab(a){this.sn(a)},
ga7(){return this.gt()/1},
sa7(a){this.st(a)},
gaa(){return this.gq()/1},
saa(a){this.sq(a)},
gX(){return this.gv()/1},
sX(a){this.sv(a)},
gai(){return A.a0(this)},
ad(a){var s=this
if(s.d.c>0){s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())}},
ar(a,b,c){var s,r,q,p=this,o=p.d,n=o.c
if(n>0){o=o.d
s=p.c
r=A.M(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){s=p.c+1
r=A.M(b)
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>2){n=p.c+2
s=A.M(c)
if(!(n>=0&&n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p=this,o=p.d,n=o.c
if(n>0){o=o.d
s=p.c
r=A.M(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){s=p.c+1
r=A.M(b)
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>2){s=p.c+2
r=A.M(c)
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>3){n=p.c+3
s=A.M(d)
if(!(n>=0&&n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.cn){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.co.prototype={
J(){var s=this
return new A.co(s.a,s.b,s.c,s.d)},
gu(a){return this.d.c},
gT(){return null},
gE(){return 1},
gM(){return B.J},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=c}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=1
return r},
sv(a){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gab(){return this.gn()/1},
sab(a){this.sn(a)},
ga7(){return this.gt()/1},
sa7(a){this.st(a)},
gaa(){return this.gq()/1},
saa(a){this.sq(a)},
gX(){return this.gv()/1},
sX(a){this.sv(a)},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q=this.d,p=q.d,o=this.c
p.$flags&2&&A.b(p)
s=p.length
if(!(o>=0&&o<s))return A.a(p,o)
p[o]=a
q=q.c
if(q>1){r=o+1
if(!(r<s))return A.a(p,r)
p[r]=b
if(q>2){q=o+2
if(!(q<s))return A.a(p,q)
p[q]=c}}},
a9(a,b,c,d){var s,r,q=this.d,p=q.d,o=this.c
p.$flags&2&&A.b(p)
s=p.length
if(!(o>=0&&o<s))return A.a(p,o)
p[o]=a
q=q.c
if(q>1){r=o+1
if(!(r<s))return A.a(p,r)
p[r]=b
if(q>2){r=o+2
if(!(r<s))return A.a(p,r)
p[r]=c
if(q>3){q=o+3
if(!(q<s))return A.a(p,q)
p[q]=d}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.co){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.cp.prototype={
J(){var s=this
return new A.cp(s.a,s.b,s.c,s.d)},
gu(a){return this.d.c},
gT(){return null},
gE(){return 1},
gM(){return B.L},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=c}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sv(a){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
r.$flags&2&&A.b(r)
if(!(s>=0&&s<r.length))return A.a(r,s)
r[s]=a}},
gab(){return this.gn()/1},
sab(a){this.sn(a)},
ga7(){return this.gt()/1},
sa7(a){this.st(a)},
gaa(){return this.gq()/1},
saa(a){this.sq(a)},
gX(){return this.gv()/1},
sX(a){this.sv(a)},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q=this.d,p=q.d,o=this.c
p.$flags&2&&A.b(p)
s=p.length
if(!(o>=0&&o<s))return A.a(p,o)
p[o]=a
q=q.c
if(q>1){r=o+1
if(!(r<s))return A.a(p,r)
p[r]=b
if(q>2){q=o+2
if(!(q<s))return A.a(p,q)
p[q]=c}}},
a9(a,b,c,d){var s,r,q=this.d,p=q.d,o=this.c
p.$flags&2&&A.b(p)
s=p.length
if(!(o>=0&&o<s))return A.a(p,o)
p[o]=a
q=q.c
if(q>1){r=o+1
if(!(r<s))return A.a(p,r)
p[r]=b
if(q>2){r=o+2
if(!(r<s))return A.a(p,r)
p[r]=c
if(q>3){q=o+3
if(!(q<s))return A.a(p,q)
p[q]=d}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.cp){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.cq.prototype={
J(){var s=this
return new A.cq(s.a,s.b,s.c,s.d)},
gu(a){return this.d.c},
gT(){return null},
gE(){return 32767},
gM(){return B.N},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=B.b.i(c)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r,q=this.d
if(q.c>1){q=q.d
s=this.c+1
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r,q=this.d
if(q.c>2){q=q.d
s=this.c+2
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sv(a){var s,r,q=this.d
if(q.c>3){q=q.d
s=this.c+3
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gab(){return this.gn()/32767},
sab(a){this.sn(a*32767)},
ga7(){return this.gt()/32767},
sa7(a){this.st(a*32767)},
gaa(){return this.gq()/32767},
saa(a){this.sq(a*32767)},
gX(){return this.gv()/32767},
sX(a){this.sv(a*32767)},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){n=s+2
s=B.a.i(c)
if(!(n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){r=s+2
p=B.a.i(c)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>3){n=s+3
s=B.a.i(d)
if(!(n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.cq){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.cr.prototype={
J(){var s=this
return new A.cr(s.a,s.b,s.c,s.d)},
gu(a){return this.d.c},
gT(){return null},
gE(){return 2147483647},
gM(){return B.O},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=B.b.i(c)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r,q=this.d
if(q.c>1){q=q.d
s=this.c+1
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r,q=this.d
if(q.c>2){q=q.d
s=this.c+2
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sv(a){var s,r,q=this.d
if(q.c>3){q=q.d
s=this.c+3
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gab(){return this.gn()/2147483647},
sab(a){this.sn(a*2147483647)},
ga7(){return this.gt()/2147483647},
sa7(a){this.st(a*2147483647)},
gaa(){return this.gq()/2147483647},
saa(a){this.sq(a*2147483647)},
gX(){return this.gv()/2147483647},
sX(a){this.sv(a*2147483647)},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){n=s+2
s=B.a.i(c)
if(!(n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){r=s+2
p=B.a.i(c)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>3){n=s+3
s=B.a.i(d)
if(!(n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.cr){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.cs.prototype={
J(){var s=this
return new A.cs(s.a,s.b,s.c,s.d)},
gu(a){return this.d.c},
gT(){return null},
gE(){return 127},
gM(){return B.M},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=B.b.i(c)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r,q=this.d
if(q.c>1){q=q.d
s=this.c+1
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r,q=this.d
if(q.c>2){q=q.d
s=this.c+2
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sv(a){var s,r,q=this.d
if(q.c>3){q=q.d
s=this.c+3
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gab(){return this.gn()/127},
sab(a){this.sn(a*127)},
ga7(){return this.gt()/127},
sa7(a){this.st(a*127)},
gaa(){return this.gq()/127},
saa(a){this.sq(a*127)},
gX(){return this.gv()/127},
sX(a){this.sv(a*127)},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){n=s+2
s=B.a.i(c)
if(!(n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){r=s+2
p=B.a.i(c)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>3){n=s+3
s=B.a.i(d)
if(!(n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.cs){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.hx.prototype={
D(){var s=this,r=s.a
if(r.gaT()+1>s.d){r.a1(s.b,r.gaQ()+1)
return r.gaQ()<=s.e}return r.D()},
gL(){return this.a},
$iA:1}
A.ct.prototype={
J(){var s=this
return new A.ct(s.a,s.b,s.c,s.d,s.e,s.f)},
gu(a){var s=this.f,r=s.f
r=r==null?null:r.b
return r==null?s.c:r},
gT(){return this.f.f},
gE(){return this.f.gE()},
gM(){return B.w},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.f
r=b*s.e
q.e=r
s=a*s.c
q.c=r+B.a.j(s,3)
q.d=s&7},
gL(){return this},
D(){var s,r=this,q=++r.a,p=r.f
if(q===p.a){r.a=0
q=++r.b
r.d=0;++r.c
r.e=r.e+p.e
return q<p.b}s=p.c
if(p.f!=null||s===1){if(++r.d>7){r.d=0;++r.c}}else{q*=s
r.d=q&7
r.c=r.e+B.a.j(q,3)}q=r.c
p=p.d
p===$&&A.d()
return q<p.byteLength},
dH(a){var s,r,q=this.c,p=7-(this.d+a)
if(p<0){p+=8;++q}s=this.f.d
s===$&&A.d()
r=s.length
if(q>=r)return 0
if(!(q>=0))return A.a(s,q)
return B.a.a3(s[q],p)&1},
b1(a){var s=this.f,r=s.f
if(r==null)s=s.c>a?this.dH(a):0
else s=r.b_(this.dH(0),a)
return s},
au(a,b){var s,r,q,p,o,n,m=this.f
if(a>=m.c)return
s=this.c
r=7-(this.d+a)
if(r<0){++s
r+=8}q=m.d
q===$&&A.d()
if(!(s>=0&&s<q.length))return A.a(q,s)
p=q[s]
o=B.a.K(B.b.i(b),0,1)
if(!(r>=0&&r<8))return A.a(B.bt,r)
n=B.bt[r]
q=B.a.a_(o,r)
m=m.d
m.$flags&2&&A.b(m)
if(!(s<m.length))return A.a(m,s)
m[s]=(p&n|q)>>>0},
m(a,b){return this.b1(b)},
h(a,b,c){return this.au(b,c)},
gP(){return this.dH(0)},
sP(a){this.au(0,a)},
gn(){return this.b1(0)},
sn(a){this.au(0,a)},
gt(){return this.b1(1)},
st(a){this.au(1,a)},
gq(){return this.b1(2)},
sq(a){this.au(2,a)},
gv(){return this.b1(3)},
sv(a){this.au(3,a)},
gab(){return this.b1(0)/this.f.gE()},
sab(a){this.au(0,a*this.f.gE())},
ga7(){return this.b1(1)/this.f.gE()},
sa7(a){this.au(1,a*this.f.gE())},
gaa(){return this.b1(2)/this.f.gE()},
saa(a){this.au(2,a*this.f.gE())},
gX(){return this.b1(3)/this.f.gE()},
sX(a){this.au(3,a*this.f.gE())},
gai(){return A.a0(this)},
ad(a){var s=this
s.au(0,a.gn())
s.au(1,a.gt())
s.au(2,a.gq())
s.au(3,a.gv())},
ar(a,b,c){var s=this,r=s.f.c
if(r>0){s.au(0,a)
if(r>1){s.au(1,b)
if(r>2)s.au(2,c)}}},
a9(a,b,c,d){var s=this,r=s.f.c
if(r>0){s.au(0,a)
if(r>1){s.au(1,b)
if(r>2){s.au(2,c)
if(r>3)s.au(3,d)}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p=this
if(b==null)return!1
if(b instanceof A.ct){s=A.u(p,A.m(p).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=p.f
r=s.f
q=r!=null?r.b:s.c
s=J.a6(b)
if(s.gu(b)!==q)return!1
if(p.b1(0)!==s.m(b,0))return!1
if(q>1){if(p.b1(1)!==s.m(b,1))return!1
if(q>2){if(p.b1(2)!==s.m(b,2))return!1
if(q>3)if(p.b1(3)!==s.m(b,3))return!1}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.f}}
A.cu.prototype={
J(){var s=this
return new A.cu(s.a,s.b,s.c,s.d)},
gu(a){var s=this.d,r=s.e
r=r==null?null:r.b
return r==null?s.c:r},
gT(){return this.d.e},
gE(){return this.d.gE()},
gM(){return B.l},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c
s+=q.e==null?q.c:1
r.c=s
return s<q.d.length},
bl(a){var s,r=this.d,q=r.e
if(q!=null){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.b_(r[s],a)
r=s}else if(a<r.c){r=r.d
q=this.c+a
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
return r},
m(a,b){return this.bl(b)},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=B.b.i(c)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d,q=r.e
if(q==null)if(r.c>0){r=r.d
q=this.c
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
else{r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.aW(r[s])
r=s}return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this.d,q=r.e
if(q==null)if(r.c>1){r=r.d
q=this.c+1
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
else{r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.aV(r[s])
r=s}return r},
st(a){var s,r,q=this.d
if(q.c>1){q=q.d
s=this.c+1
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gq(){var s,r=this.d,q=r.e
if(q==null)if(r.c>2){r=r.d
q=this.c+2
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
else{r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.aU(r[s])
r=s}return r},
sq(a){var s,r,q=this.d
if(q.c>2){q=q.d
s=this.c+2
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gv(){var s,r=this.d,q=r.e
if(q==null)if(r.c>3){r=r.d
q=this.c+3
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
else{r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.b0(r[s])
r=s}return r},
sv(a){var s,r,q=this.d
if(q.c>3){q=q.d
s=this.c+3
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gab(){return this.gn()/this.d.gE()},
sab(a){this.sn(a*this.d.gE())},
ga7(){return this.gt()/this.d.gE()},
sa7(a){this.st(a*this.d.gE())},
gaa(){return this.gq()/this.d.gE()},
saa(a){this.sq(a*this.d.gE())},
gX(){return this.gv()/this.d.gE()},
sX(a){this.sv(a*this.d.gE())},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){n=s+2
s=B.a.i(c)
if(!(n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){r=s+2
p=B.a.i(c)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>3){n=s+3
s=B.a.i(d)
if(!(n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p=this
if(b==null)return!1
if(b instanceof A.cu){s=A.u(p,A.m(p).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=p.d
r=s.e
q=r!=null?r.b:s.c
s=J.a6(b)
if(s.gu(b)!==q)return!1
if(p.bl(0)!==s.m(b,0))return!1
if(q>1){if(p.bl(1)!==s.m(b,1))return!1
if(q>2){if(p.bl(2)!==s.m(b,2))return!1
if(q>3)if(p.bl(3)!==s.m(b,3))return!1}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.cv.prototype={
J(){var s=this
return new A.cv(s.a,s.b,s.c,s.d,s.e,s.f)},
gu(a){var s=this.f,r=s.f
r=r==null?null:r.b
return r==null?s.c:r},
gT(){return this.f.f},
gE(){return this.f.gE()},
gM(){return B.B},
gfm(){var s=this.f
return s.f!=null?2:s.c<<1>>>0},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q,p=this
p.a=a
p.b=b
s=p.gfm()
r=b*p.f.e
p.e=r
q=a*s
p.c=r+B.a.j(q,3)
p.d=q&7},
gL(){return this},
D(){var s=this,r=++s.a,q=s.f
if(r===q.a){s.a=0
r=++s.b
s.d=0;++s.c
s.e=s.e+q.e
return r<q.b}if(q.f!=null||q.c===1){if((s.d+=2)>7){s.d=0;++s.c}}else{r*=s.gfm()
s.d=r&7
s.c=s.e+B.a.j(r,3)}r=s.c
q=q.d
q===$&&A.d()
return r<q.length},
dI(a){var s,r=this.c,q=6-(this.d+(a<<1>>>0))
if(q<0){q+=8;++r}s=this.f.d
s===$&&A.d()
if(!(r>=0&&r<s.length))return A.a(s,r)
return B.a.a3(s[r],q)&3},
b2(a){var s=this.f,r=s.f
if(r==null)s=s.c>a?this.dI(a):0
else s=r.b_(this.dI(0),a)
return s},
av(a,b){var s,r,q,p,o,n,m=this.f
if(a>=m.c)return
s=this.c
r=6-(this.d+(a<<1>>>0))
if(r<0){++s
r+=8}q=m.d
q===$&&A.d()
if(!(s>=0&&s<q.length))return A.a(q,s)
p=q[s]
o=B.a.K(B.b.i(b),0,3)
q=B.a.j(r,1)
if(!(q<4))return A.a(B.ba,q)
n=B.ba[q]
q=B.a.a_(o,r)
m=m.d
m.$flags&2&&A.b(m)
if(!(s<m.length))return A.a(m,s)
m[s]=(p&n|q)>>>0},
m(a,b){return this.b2(b)},
h(a,b,c){return this.av(b,c)},
gP(){return this.dI(0)},
sP(a){this.av(0,a)},
gn(){return this.b2(0)},
sn(a){this.av(0,a)},
gt(){return this.b2(1)},
st(a){this.av(1,a)},
gq(){return this.b2(2)},
sq(a){this.av(2,a)},
gv(){return this.b2(3)},
sv(a){this.av(3,a)},
gab(){return this.b2(0)/this.f.gE()},
sab(a){this.av(0,a*this.f.gE())},
ga7(){return this.b2(1)/this.f.gE()},
sa7(a){this.av(1,a*this.f.gE())},
gaa(){return this.b2(2)/this.f.gE()},
saa(a){this.av(2,a*this.f.gE())},
gX(){return this.b2(3)/this.f.gE()},
sX(a){this.av(3,a*this.f.gE())},
gai(){return A.a0(this)},
ad(a){var s=this
s.av(0,a.gn())
s.av(1,a.gt())
s.av(2,a.gq())
s.av(3,a.gv())},
ar(a,b,c){var s=this,r=s.f.c
if(r>0){s.av(0,a)
if(r>1){s.av(1,b)
if(r>2)s.av(2,c)}}},
a9(a,b,c,d){var s=this,r=s.f.c
if(r>0){s.av(0,a)
if(r>1){s.av(1,b)
if(r>2){s.av(2,c)
if(r>3)s.av(3,d)}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p=this
if(b==null)return!1
if(b instanceof A.cv){s=A.u(p,A.m(p).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=p.f
r=s.f
q=r!=null?r.b:s.c
s=J.a6(b)
if(s.gu(b)!==q)return!1
if(p.b2(0)!==s.m(b,0))return!1
if(q>1){if(p.b2(1)!==s.m(b,1))return!1
if(q>2){if(p.b2(2)!==s.m(b,2))return!1
if(q>3)if(p.b2(3)!==s.m(b,3))return!1}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.f}}
A.cw.prototype={
J(){var s=this
return new A.cw(s.a,s.b,s.c,s.d)},
gu(a){return this.d.c},
gT(){return null},
gE(){return 4294967295},
gM(){return B.K},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c+q.c
r.c=s
return s<q.d.length},
m(a,b){var s,r=this.d
if(b<r.c){r=r.d
s=this.c+b
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=B.b.i(c)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){return this.gn()},
sP(a){this.sn(a)},
gn(){var s,r=this.d
if(r.c>0){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this.d
if(r.c>1){r=r.d
s=this.c+1
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
st(a){var s,r,q=this.d
if(q.c>1){q=q.d
s=this.c+1
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gq(){var s,r=this.d
if(r.c>2){r=r.d
s=this.c+2
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sq(a){var s,r,q=this.d
if(q.c>2){q=q.d
s=this.c+2
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gv(){var s,r=this.d
if(r.c>3){r=r.d
s=this.c+3
if(!(s>=0&&s<r.length))return A.a(r,s)
s=r[s]
r=s}else r=0
return r},
sv(a){var s,r,q=this.d
if(q.c>3){q=q.d
s=this.c+3
r=B.b.i(a)
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gab(){return this.gn()/4294967295},
sab(a){this.sn(a*4294967295)},
ga7(){return this.gt()/4294967295},
sa7(a){this.st(a*4294967295)},
gaa(){return this.gq()/4294967295},
saa(a){this.sq(a*4294967295)},
gX(){return this.gv()/4294967295},
sX(a){this.sv(a*4294967295)},
gai(){return A.a0(this)},
ad(a){var s=this
s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())},
ar(a,b,c){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){n=s+2
s=B.a.i(c)
if(!(n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){r=s+2
p=B.a.i(c)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>3){n=s+3
s=B.a.i(d)
if(!(n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p,o,n=this
if(b==null)return!1
if(b instanceof A.cw){s=A.u(n,A.m(n).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=J.a6(b)
r=n.d
q=r.c
if(s.gu(b)!==q)return!1
r=r.d
p=n.c
o=r.length
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,0))return!1
if(q>1){p=n.c+1
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,1))return!1
if(q>2){p=n.c+2
if(!(p>=0&&p<o))return A.a(r,p)
if(r[p]!==s.m(b,2))return!1
if(q>3){q=n.c+3
if(!(q>=0&&q<o))return A.a(r,q)
if(r[q]!==s.m(b,3))return!1}}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.cx.prototype={
J(){var s=this
return new A.cx(s.a,s.b,s.c,s.d,s.e)},
gu(a){var s=this.e,r=s.f
r=r==null?null:r.b
return r==null?s.c:r},
gT(){return this.e.f},
gE(){return this.e.gE()},
gM(){return B.C},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q,p=this
p.a=a
p.b=b
s=p.e
r=s.c*4
q=s.e
if(r===4)s=b*q+B.a.j(a,1)
else if(r===8)s=b*s.a+a
else{s=b*q
s=r===16?s+(a<<1>>>0):s+B.a.j(a*r,3)}p.c=s
s=a*r
p.d=r>7?s&4:s&7},
gL(){return this},
D(){var s,r,q,p=this,o=p.e
if(++p.a===o.a){p.a=0
s=++p.b
p.d=0
p.c=s*o.e
return s<o.b}r=o.c
s=o.f!=null||r===1
q=p.d
if(s){s=q+4
p.d=s
if(s>7){p.d=0;++p.c}}else{s=p.d=q+(r<<2>>>0)
while(s>7){s-=8
p.d=s;++p.c}}s=p.c
o=o.d
o===$&&A.d()
return s<o.length},
dB(a){var s,r=this.c,q=4-(this.d+(a<<2>>>0))
if(q<0){q+=8;++r}s=this.e.d
s===$&&A.d()
if(!(r>=0&&r<s.length))return A.a(s,r)
return B.a.a3(s[r],q)&15},
b3(a){var s=this.e,r=s.f
if(r==null)s=s.c>a?this.dB(a):0
else s=r.b_(this.dB(0),a)
return s},
aw(a,b){var s,r,q,p,o,n,m=this.e
if(a>=m.c)return
s=this.c
r=4-(this.d+(a<<2>>>0))
if(r<0){r+=8;++s}q=m.d
q===$&&A.d()
if(!(s>=0&&s<q.length))return A.a(q,s)
p=q[s]
o=B.a.K(B.b.i(b),0,15)
n=r===4?15:240
q=B.a.a_(o,r)
m=m.d
m.$flags&2&&A.b(m)
if(!(s<m.length))return A.a(m,s)
m[s]=(p&n|q)>>>0},
m(a,b){return this.b3(b)},
h(a,b,c){return this.aw(b,c)},
gP(){return this.dB(0)},
sP(a){this.aw(0,a)},
gn(){return this.b3(0)},
sn(a){this.aw(0,a)},
gt(){return this.b3(1)},
st(a){this.aw(1,a)},
gq(){return this.b3(2)},
sq(a){this.aw(2,a)},
gv(){return this.b3(3)},
sv(a){this.aw(3,a)},
gab(){return this.b3(0)/this.e.gE()},
sab(a){this.aw(0,a*this.e.gE())},
ga7(){return this.b3(1)/this.e.gE()},
sa7(a){this.aw(1,a*this.e.gE())},
gaa(){return this.b3(2)/this.e.gE()},
saa(a){this.aw(2,a*this.e.gE())},
gX(){return this.b3(3)/this.e.gE()},
sX(a){this.aw(3,a*this.e.gE())},
gai(){return A.a0(this)},
ad(a){var s=this
s.aw(0,a.gn())
s.aw(1,a.gt())
s.aw(2,a.gq())
s.aw(3,a.gv())},
ar(a,b,c){var s=this,r=s.e.c
if(r>0){s.aw(0,a)
if(r>1){s.aw(1,b)
if(r>2)s.aw(2,c)}}},
a9(a,b,c,d){var s=this,r=s.e.c
if(r>0){s.aw(0,a)
if(r>1){s.aw(1,b)
if(r>2){s.aw(2,c)
if(r>3)s.aw(3,d)}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p=this
if(b==null)return!1
if(b instanceof A.cx){s=A.u(p,A.m(p).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){q=p.e.c
s=J.a6(b)
if(s.gu(b)!==q)return!1
if(p.b3(0)!==s.m(b,0))return!1
if(q>1){if(p.b3(1)!==s.m(b,1))return!1
if(q>2){if(p.b3(2)!==s.m(b,2))return!1
if(q>3)if(p.b3(3)!==s.m(b,3))return!1}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.e}}
A.cy.prototype={
J(){var s=this
return new A.cy(s.a,s.b,s.c,s.d)},
gu(a){var s=this.d,r=s.e
r=r==null?null:r.b
return r==null?s.c:r},
gT(){return this.d.e},
gE(){return this.d.gE()},
gM(){return B.e},
gaT(){return this.a},
gaQ(){return this.b},
a1(a,b){var s,r,q=this
q.a=a
q.b=b
s=q.d
r=s.c
q.c=b*s.a*r+a*r},
gL(){return this},
D(){var s,r=this,q=r.d
if(++r.a===q.a){r.a=0
if(++r.b===q.b)return!1}s=r.c
s+=q.e==null?q.c:1
r.c=s
return s<q.d.length},
bl(a){var s,r=this.d,q=r.e
if(q!=null){r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.b_(r[s],a)
r=s}else if(a<r.c){r=r.d
q=this.c+a
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
return r},
m(a,b){return this.bl(b)},
h(a,b,c){var s,r,q=this.d
if(b<q.c){q=q.d
s=this.c+b
r=B.b.i(B.b.K(c,0,255))
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gP(){var s=this.d.d,r=this.c
if(!(r>=0&&r<s.length))return A.a(s,r)
return s[r]},
sP(a){var s=this.d.d,r=this.c,q=B.b.i(B.b.K(a,0,255))
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=q},
gn(){var s,r=this.d,q=r.e
if(q==null)if(r.c>0){r=r.d
q=this.c
if(!(q>=0&&q<r.length))return A.a(r,q)
q=r[q]
r=q}else r=0
else{r=r.d
s=this.c
if(!(s>=0&&s<r.length))return A.a(r,s)
s=q.aW(r[s])
r=s}return r},
sn(a){var s,r,q=this.d
if(q.c>0){q=q.d
s=this.c
r=B.b.i(B.b.K(a,0,255))
q.$flags&2&&A.b(q)
if(!(s>=0&&s<q.length))return A.a(q,s)
q[s]=r}},
gt(){var s,r=this,q=r.d,p=q.e
if(p==null){p=q.c
if(p===2){q=q.d
p=r.c
if(!(p>=0&&p<q.length))return A.a(q,p)
p=q[p]
q=p}else if(p>1){q=q.d
p=r.c+1
if(!(p>=0&&p<q.length))return A.a(q,p)
p=q[p]
q=p}else q=0}else{q=q.d
s=r.c
if(!(s>=0&&s<q.length))return A.a(q,s)
s=p.aV(q[s])
q=s}return q},
st(a){var s,r=this.d,q=r.c
if(q===2){r=r.d
q=this.c
s=B.b.i(B.b.K(a,0,255))
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s}else if(q>1){r=r.d
q=this.c+1
s=B.b.i(B.b.K(a,0,255))
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s}},
gq(){var s,r=this,q=r.d,p=q.e
if(p==null){p=q.c
if(p===2){q=q.d
p=r.c
if(!(p>=0&&p<q.length))return A.a(q,p)
p=q[p]
q=p}else if(p>2){q=q.d
p=r.c+2
if(!(p>=0&&p<q.length))return A.a(q,p)
p=q[p]
q=p}else q=0}else{q=q.d
s=r.c
if(!(s>=0&&s<q.length))return A.a(q,s)
s=p.aU(q[s])
q=s}return q},
sq(a){var s,r=this.d,q=r.c
if(q===2){r=r.d
q=this.c
s=B.b.i(B.b.K(a,0,255))
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s}else if(q>2){r=r.d
q=this.c+2
s=B.b.i(B.b.K(a,0,255))
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s}},
gv(){var s,r=this,q=r.d,p=q.e
if(p==null){p=q.c
if(p===2){q=q.d
p=r.c+1
if(!(p>=0&&p<q.length))return A.a(q,p)
p=q[p]
q=p}else if(p>3){q=q.d
p=r.c+3
if(!(p>=0&&p<q.length))return A.a(q,p)
p=q[p]
q=p}else q=255}else{q=q.d
s=r.c
if(!(s>=0&&s<q.length))return A.a(q,s)
s=p.b0(q[s])
q=s}return q},
sv(a){var s,r=this.d,q=r.c
if(q===2){r=r.d
q=this.c+1
s=B.b.i(B.b.K(a,0,255))
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s}else if(q>3){r=r.d
q=this.c+3
s=B.b.i(B.b.K(a,0,255))
r.$flags&2&&A.b(r)
if(!(q>=0&&q<r.length))return A.a(r,q)
r[q]=s}},
gab(){return this.gn()/this.d.gE()},
sab(a){this.sn(a*this.d.gE())},
ga7(){return this.gt()/this.d.gE()},
sa7(a){this.st(a*this.d.gE())},
gaa(){return this.gq()/this.d.gE()},
saa(a){this.sq(a*this.d.gE())},
gX(){return this.gv()/this.d.gE()},
sX(a){this.sv(a*this.d.gE())},
gai(){return this.d.c===2?this.gn():A.a0(this)},
ad(a){var s=this
if(s.d.e!=null)s.sP(a.gP())
else{s.sn(a.gn())
s.st(a.gt())
s.sq(a.gq())
s.sv(a.gv())}},
ar(a,b,c){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){n=s+2
s=B.a.i(c)
if(!(n<q))return A.a(o,n)
o[n]=s}}}},
a9(a,b,c,d){var s,r,q,p,o=this.d,n=o.c
if(n>0){o=o.d
s=this.c
r=B.a.i(a)
o.$flags&2&&A.b(o)
q=o.length
if(!(s>=0&&s<q))return A.a(o,s)
o[s]=r
if(n>1){r=s+1
p=B.a.i(b)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>2){r=s+2
p=B.a.i(c)
if(!(r<q))return A.a(o,r)
o[r]=p
if(n>3){n=s+3
s=B.a.i(d)
if(!(n<q))return A.a(o,n)
o[n]=s}}}}},
gF(a){return new A.R(this)},
U(a,b){var s,r,q,p=this
if(b==null)return!1
if(b instanceof A.cy){s=A.u(p,A.m(p).l("e.E"))
s=A.n(s)
r=A.u(b,A.m(b).l("e.E"))
return s===A.n(r)}if(t.L.b(b)){s=p.d
r=s.e
q=r!=null?r.b:s.c
s=J.a6(b)
if(s.gu(b)!==q)return!1
if(p.bl(0)!==s.m(b,0))return!1
if(q>1){if(p.bl(1)!==s.m(b,1))return!1
if(q>2){if(p.bl(2)!==s.m(b,2))return!1
if(q>3)if(p.bl(3)!==s.m(b,3))return!1}}return!0}return!1},
gH(a){var s=A.u(this,A.m(this).l("e.E"))
return A.n(s)},
b7(a){return A.aT(this,null,a,null,null)},
$iA:1,
$iy:1,
$iv:1,
gb8(){return this.d}}
A.J.prototype={
J(){return new A.J()},
gb8(){return $.oB()},
gaT(){return 0},
gaQ(){return 0},
gu(a){return 0},
gE(){return 0},
gM(){return B.e},
gT(){return null},
m(a,b){return 0},
h(a,b,c){},
gP(){return 0},
sP(a){},
gn(){return 0},
sn(a){},
gt(){return 0},
st(a){},
gq(){return 0},
sq(a){},
gv(){return 0},
sv(a){},
gab(){return 0},
sab(a){},
ga7(){return 0},
sa7(a){},
gaa(){return 0},
saa(a){},
gX(){return 0},
sX(a){},
gai(){return 0},
ad(a){},
ar(a,b,c){},
a9(a,b,c,d){},
a1(a,b){},
gL(){return this},
D(){return!1},
U(a,b){if(b==null)return!1
return b instanceof A.J},
gH(a){return 0},
gF(a){return new A.R(this)},
b7(a){return this},
$iA:1,
$iy:1,
$iv:1}
A.iD.prototype={
ae(){return"FlipDirection."+this.b}}
A.iK.prototype={
B(a){return"ImageException: "+this.a}}
A.am.prototype={
gu(a){return this.c-this.d},
h(a,b,c){J.x(this.a,this.d+b,c)
return c},
bg(a,b,c,d){var s=this.a,r=J.ai(s),q=this.d+a
if(c instanceof A.am)r.aq(s,q,q+b,c.a,c.d+d)
else r.aq(s,q,q+b,t.L.a(c),d)},
bT(a,b,c){return this.bg(a,b,c,0)},
k0(a,b,c){var s=this.a,r=this.d+a
J.br(s,r,r+b,c)},
dm(a,b,c){var s=this,r=c!=null?s.b+c:s.d
return A.t(s.a,s.e,a,r+b)},
am(a){return this.dm(a,0,null)},
bW(a,b){return this.dm(a,0,b)},
cQ(a,b){return this.dm(a,b,null)},
G(){return J.c(this.a,this.d++)},
al(a){var s=this.am(a)
this.d=this.d+(s.c-s.d)
return s},
ag(a){var s,r,q,p,o,n=this
if(a==null){s=A.k([],t.t)
for(r=n.c;q=n.d,q<r;){p=n.a
n.d=q+1
o=J.c(p,q)
if(o===0)return A.dA(s,0,null)
B.c.I(s,o)}throw A.h(A.o("EOF reached without finding string terminator (length: "+A.E(a)+")"))}return A.dA(n.al(a).a4(),0,null)},
cF(){return this.ag(null)},
fE(a){var s,r,q,p,o=this,n=A.k([],t.t)
for(s=o.c;r=o.d,r<s;){q=o.a
o.d=r+1
p=J.c(q,r)
B.c.I(n,p)
if(p===10||n.length>=a)return A.dA(n,0,null)}return A.dA(n,0,null)},
kc(){return this.fE(256)},
kd(){var s,r,q,p,o=this,n=A.k([],t.t)
for(s=o.c;r=o.d,r<s;){q=o.a
o.d=r+1
p=J.c(q,r)
if(p===0){t.L.a(n)
return new A.ib(!0).er(n,0,null,!0)}B.c.I(n,p)}return B.cE.jA(n,!0)},
p(){var s=this,r=J.c(s.a,s.d++)&255,q=J.c(s.a,s.d++)&255
if(s.e)return r<<8|q
return q<<8|r},
bi(){var s=this,r=J.c(s.a,s.d++)&255,q=J.c(s.a,s.d++)&255,p=J.c(s.a,s.d++)&255
if(s.e)return p|q<<8|r<<16
return r|q<<8|p<<16},
k(){var s=this,r=J.c(s.a,s.d++)&255,q=J.c(s.a,s.d++)&255,p=J.c(s.a,s.d++)&255,o=J.c(s.a,s.d++)&255
if(s.e)return(r<<24|q<<16|p<<8|o)>>>0
return(o<<24|p<<16|q<<8|r)>>>0},
dg(){return A.ub(this.e_())},
e_(){var s=this,r=J.c(s.a,s.d++)&255,q=J.c(s.a,s.d++)&255,p=J.c(s.a,s.d++)&255,o=J.c(s.a,s.d++)&255,n=J.c(s.a,s.d++)&255,m=J.c(s.a,s.d++)&255,l=J.c(s.a,s.d++)&255,k=J.c(s.a,s.d++)&255
if(s.e)return(B.a.S(r,56)|B.a.S(q,48)|B.a.S(p,40)|B.a.S(o,32)|n<<24|m<<16|l<<8|k)>>>0
return(B.a.S(k,56)|B.a.S(l,48)|B.a.S(m,40)|B.a.S(n,32)|o<<24|p<<16|q<<8|r)>>>0},
cG(a,b,c){var s,r=this,q=r.a
if(t.D.b(q))return r.fI(b,c)
s=r.b+r.d+b
return J.lx(q,s,c<=0?r.c:s+c)},
fI(a,b){var s,r=this,q=b==null?r.c-r.d-a:b,p=r.a
if(t.D.b(p))return J.a4(B.f.gA(p),p.byteOffset+r.d+a,q)
s=r.d+a
s=J.lx(p,s,s+q)
return new Uint8Array(A.z(s))},
a4(){return this.fI(0,null)},
cI(){var s=this.a
if(t.D.b(s))return J.aG(B.f.gA(s),s.byteOffset+this.d,null)
return J.aG(B.f.gA(this.a4()),0,null)},
sA(a,b){this.a=t.L.a(b)}}
A.j5.prototype={
C(a){var s,r,q=this
if(q.a===q.c.length)q.ii()
s=q.c
r=q.a++
s.$flags&2&&A.b(s)
if(!(r>=0&&r<s.length))return A.a(s,r)
s[r]=a&255},
aZ(a){var s,r,q,p,o,n=this
t.L.a(a)
s=J.bl(a)
while(r=n.a,q=r+s,p=n.c,o=p.length,q>o)n.eD(q-o)
B.f.bD(p,r,q,a)
n.a+=s},
aD(a){var s=this
if(s.b){s.C(B.a.j(a,8)&255)
s.C(a&255)
return}s.C(a&255)
s.C(B.a.j(a,8)&255)},
aL(a){var s=this
if(s.b){s.C(B.a.j(a,24)&255)
s.C(B.a.j(a,16)&255)
s.C(B.a.j(a,8)&255)
s.C(a&255)
return}s.C(a&255)
s.C(B.a.j(a,8)&255)
s.C(B.a.j(a,16)&255)
s.C(B.a.j(a,24)&255)},
kv(a){var s,r,q=this,p=new Float32Array(1)
p[0]=a
s=J.a4(B.aj.gA(p),0,null)
if(q.b){if(3>=s.length)return A.a(s,3)
q.C(s[3])
q.C(s[2])
q.C(s[1])
q.C(s[0])
return}r=s.length
if(0>=r)return A.a(s,0)
q.C(s[0])
if(1>=r)return A.a(s,1)
q.C(s[1])
if(2>=r)return A.a(s,2)
q.C(s[2])
if(3>=r)return A.a(s,3)
q.C(s[3])},
kw(a){var s,r,q=this,p=new Float64Array(1)
p[0]=a
s=J.a4(B.ak.gA(p),0,null)
if(q.b){if(7>=s.length)return A.a(s,7)
q.C(s[7])
q.C(s[6])
q.C(s[5])
q.C(s[4])
q.C(s[3])
q.C(s[2])
q.C(s[1])
q.C(s[0])
return}r=s.length
if(0>=r)return A.a(s,0)
q.C(s[0])
if(1>=r)return A.a(s,1)
q.C(s[1])
if(2>=r)return A.a(s,2)
q.C(s[2])
if(3>=r)return A.a(s,3)
q.C(s[3])
if(4>=r)return A.a(s,4)
q.C(s[4])
if(5>=r)return A.a(s,5)
q.C(s[5])
if(6>=r)return A.a(s,6)
q.C(s[6])
if(7>=r)return A.a(s,7)
q.C(s[7])},
eD(a){var s,r,q,p
if(a!=null)s=a
else{r=this.c.length
s=r===0?8192:r*2}r=this.c
q=r.length
p=new Uint8Array(q+s)
B.f.bD(p,0,q,r)
this.c=p},
ii(){return this.eD(null)},
gu(a){return this.a}}
A.dw.prototype={
i(a){var s=this.b
return s===0?0:B.a.an(this.a,s)},
U(a,b){if(b==null)return!1
return b instanceof A.dw&&this.a===b.a&&this.b===b.b},
gH(a){return A.hu(this.a,this.b,B.z,B.z)},
B(a){return""+this.a+"/"+this.b}}
A.aY.prototype={
ba(){return A.k([this.a,this.b,this.c],t.t)},
gdf(){var s,r,q,p,o=new A.ji(),n=o.$1(this.a),m=o.$1(this.b),l=o.$1(this.c),k=0.2126729*n+0.7151522*m+0.072175*l
o=new A.jh()
s=o.$1(k)
if(typeof s!=="number")return A.cN(s)
r=o.$1((0.4124564*n+0.3575761*m+0.1804375*l)/0.95047)
q=o.$1(k)
if(typeof r!=="number")return r.h_()
if(typeof q!=="number")return A.cN(q)
p=o.$1(k)
o=o.$1((0.0193339*n+0.119192*m+0.9503041*l)/1.08883)
if(typeof p!=="number")return p.h_()
if(typeof o!=="number")return A.cN(o)
return new A.aQ(116*s-16,500*(r-q),200*(p-o))}}
A.ji.prototype={
$1(a){var s=a/255
return s<=0.04045?s/12.92:Math.pow((s+0.055)/1.055,2.4)},
$S:19}
A.jh.prototype={
$1(a){return a>0.008856451679035631?Math.pow(a,0.3333333333333333):a*841/108+0.13793103448275862},
$S:28}
A.cA.prototype={
ba(){var s=this,r=s.a
return A.aL(["rgb",A.k([r.a,r.b,r.c],t.t),"spread",s.b,"dark",s.c,"glare",s.d],t.N,t.X)}}
A.eV.prototype={
ae(){return"ScanDetectFailure."+this.b}}
A.jj.prototype={
ba(){var s=this
return A.aL(["quad",s.a.ba(),"confidence",s.b,"observed",s.c,"residual",s.d,"pitch",s.e],t.N,t.X)}}
A.be.prototype={}
A.jY.prototype={
ho(b2,b3,b4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1=this
for(s=b1.a*b1.b,r=b1.e,q=r.$flags|0,p=b1.f,o=p.$flags|0,n=b1.r,m=n.$flags|0,l=b2.length,k=b1.c,j=k.$flags|0,i=b1.d,h=i.$flags|0,g=0,f=0;g<s;++g,f+=3){if(!(f<l))return A.a(b2,f)
e=b2[f]
d=f+1
if(!(d<l))return A.a(b2,d)
c=b2[d]
d=f+2
if(!(d<l))return A.a(b2,d)
b=b2[d]
a=Math.max(e,Math.max(c,b))
a0=Math.min(e,Math.min(c,b))
j&2&&A.b(k)
if(!(g<k.length))return A.a(k,g)
k[g]=a/255
d=a===0?0:(a-a0)/a
h&2&&A.b(i)
if(!(g<i.length))return A.a(i,g)
i[g]=d
d=$.oT()
a1=d.length
if(!(e<a1))return A.a(d,e)
a2=d[e]
if(!(c<a1))return A.a(d,c)
a3=d[c]
if(!(b<a1))return A.a(d,b)
a4=d[b]
a5=(0.4124564*a2+0.3575761*a3+0.1804375*a4)/0.95047
a6=0.2126729*a2+0.7151522*a3+0.072175*a4
a7=(0.0193339*a2+0.119192*a3+0.9503041*a4)/1.08883
a8=a5>0.008856451679035631?Math.pow(a5,0.3333333333333333):a5*841/108+0.13793103448275862
a9=a6>0.008856451679035631?Math.pow(a6,0.3333333333333333):a6*841/108+0.13793103448275862
b0=a7>0.008856451679035631?Math.pow(a7,0.3333333333333333):a7*841/108+0.13793103448275862
q&2&&A.b(r)
if(!(g<r.length))return A.a(r,g)
r[g]=116*a9-16
o&2&&A.b(p)
if(!(g<p.length))return A.a(p,g)
p[g]=500*(a8-a9)
m&2&&A.b(n)
if(!(g<n.length))return A.a(n,g)
n[g]=200*(a9-b0)}}}
A.c_.prototype={}
A.kL.prototype={
$2(a,b){var s,r,q,p,o=this.a,n=o.e,m=n.length
if(!(b>=0&&b<m))return A.a(n,b)
s=n[b]
if(!(a>=0&&a<m))return A.a(n,a)
r=(s-n[a])*0.5
n=o.f
s=n.length
if(!(b<s))return A.a(n,b)
m=n[b]
if(!(a<s))return A.a(n,a)
q=m-n[a]
o=o.r
n=o.length
if(!(b<n))return A.a(o,b)
m=o[b]
if(!(a<n))return A.a(o,a)
p=m-o[a]
return Math.sqrt(r*r+q*q+p*p)},
$S:20}
A.kw.prototype={
$2(g3,g4){var s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4,e5,e6,e7,e8,e9,f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,g0=this,g1=g0.a,g2=g0.b
B.f.aF(g1,0,g2,0)
for(s=g0.w,r=g0.Q,q=g0.y,p=2*g4,o=g0.z,n=g0.r,m=9*n,l=g0.f-1,k=g0.e,j=k-1,i=g0.d,h=i.$flags|0,g=g0.c,f=g.length,e=g3.length,d=g1.length,c=g1.$flags|0,b=g.$flags|0,a=g2*0.6,a0=g0.x,a1=t.f,a2=g4>0,a3=0;a3<g2;++a3){a4={}
if(!(a3<e))return A.a(g3,a3)
if(g3[a3]!==1){if(!(a3<d))return A.a(g1,a3)
a5=g1[a3]===1}else a5=!0
if(a5)continue
b&2&&A.b(g)
if(0>=f)return A.a(g,0)
g[0]=a3
c&2&&A.b(g1)
if(!(a3<d))return A.a(g1,a3)
g1[a3]=1
a4.a=0
B.U.aF(i,0,8,a3)
for(a6=1,a7=0,a8=0,a9=0,b0=0,b1=0,b2=!1,a5=0;a6>0;){--a6
if(!(a6<f))return A.a(g,a6)
b3=g[a6]
b4=B.a.Y(b3,k)
b5=B.a.an(b3,k)
for(b6=0;b6<4;++b6){b7=A.mo(b6,b4,b5)
b8=i[b6]
a5=b6+4
b9=i[a5]
if(b7>A.mo(b6,B.a.Y(b8,k),B.a.an(b8,k))){h&2&&A.b(i)
i[b6]=b3}if(b7<A.mo(b6,B.a.Y(b9,k),B.a.an(b9,k))){h&2&&A.b(i)
i[a5]=b3}}a5=++a4.a
a7+=b4
a8+=b5
a9+=b4*b4
b0+=b5*b5
b1+=b4*b5
if(b4===0||b5===0||b4===j||b5===l)b2=!0
c0=!1
if(b4>0){c1=b3-1
if(!(c1>=0&&c1<e))return A.a(g3,c1)
if(g3[c1]===0){if(!(c1<d))return A.a(g1,c1)
c0=g1[c1]===0}}if(c0){c0=b3-1
if(!(c0>=0&&c0<d))return A.a(g1,c0)
g1[c0]=1
c2=a6+1
g[a6]=c0
a6=c2}c0=!1
if(b4<j){c1=b3+1
if(!(c1>=0&&c1<e))return A.a(g3,c1)
if(g3[c1]===0){if(!(c1<d))return A.a(g1,c1)
c0=g1[c1]===0}}if(c0){c0=b3+1
if(!(c0>=0&&c0<d))return A.a(g1,c0)
g1[c0]=1
c2=a6+1
if(!(a6<f))return A.a(g,a6)
g[a6]=c0
a6=c2}c0=!1
if(b5>0){c1=b3-k
if(!(c1>=0&&c1<e))return A.a(g3,c1)
if(g3[c1]===0){if(!(c1<d))return A.a(g1,c1)
c0=g1[c1]===0}}if(c0){c0=b3-k
if(!(c0>=0&&c0<d))return A.a(g1,c0)
g1[c0]=1
c2=a6+1
if(!(a6<f))return A.a(g,a6)
g[a6]=c0
a6=c2}c0=!1
if(b5<l){c1=b3+k
if(!(c1>=0&&c1<e))return A.a(g3,c1)
if(g3[c1]===0){if(!(c1<d))return A.a(g1,c1)
c0=g1[c1]===0}}if(c0){c0=b3+k
if(!(c0>=0&&c0<d))return A.a(g1,c0)
g1[c0]=1
c2=a6+1
if(!(a6<f))return A.a(g,a6)
g[a6]=c0
a6=c2}}if(a5<n)continue
c3=new A.kI(g4,s)
if(a5>=m&&a5<=a&&!b2){c4=new A.kH(new A.kG(k),i)
c5=c4.$4(6,3,2,7)
c6=c4.$4(5,0,1,4)
c7=Math.abs(A.mv(c5))>=Math.abs(A.mv(c6))?c5:c6
c8=A.mv(c7)
a5=a4.a
c9=B.c.jN(a0,new A.kz(a4,q,a7/a5,a8/a5))
if(c8>0){a5=a4.a/c8
a5=a5>0.88&&a5<1.1&&c9}else a5=!1
if(a5){a5=A.k([],a1)
for(c0=c7.length,d0=0;d0<c7.length;c7.length===c0||(0,A.V)(c7),++d0){c1=c7[d0]
a5.push(new A.a_(c1.a/q,c1.b/q))}B.c.I(a0,a5)}}a5=a4.a
if(a5>o){c3.$1("tooLarge")
continue}d1=a7/a5
d2=a8/a5
d3=a9/a5-d1*d1+0.08333333333333333
d4=b0/a5-d2*d2+0.08333333333333333
d5=b1/a5-d1*d2
d6=d3+d4
a5=d5*d5
d7=Math.sqrt(Math.max(0,d6*d6/4-(d3*d4-a5)))
c0=d6/2
d8=c0+d7
d9=Math.max(0.000001,c0-d7)
e0=Math.sqrt(12*d8)
e1=Math.sqrt(12*d9)
c0=a4.a
e2=c0/(e0*e1)
e3=e0/e1
if(e3>3.6){c3.$1("elongated")
continue}if(e2<0.72||e2>1.2){c3.$1("notSquare")
continue}e4=new A.kE(r,q)
e5=Math.pow(1+p/Math.sqrt(c0),2)
c0=e3<=2.6
if(c0){e6=Math.sqrt(a4.a)+p
e7=d1/q
e8=d2/q
if(!e4.$3(e7,e8,e6)){B.c.I(r,new A.c_(e7,e8,e6,d3*e5,d4*e5,d5*e5,!1))
if(a2)s.e2("recoveredByClosing",new A.kA(),new A.kB())}}if(e3>=1.6&&c0)e9=2
else e9=e3>2.6?3:0
if(e9===0)continue
f0=d8-d3
f1=Math.sqrt(a5+f0*f0)
if(f1<1e-9){a5=d3>=d4
f2=a5?1:0
f0=a5?0:1}else{f2=d5/f1
f0/=f1}f3=(e0+p)/e9
f4=e1+p
f5=f3*f3/12
f6=f4*f4/12
e6=Math.sqrt(f3*f4)
for(a5=f5*f2*f2+f6*f0*f0,c0=f5*f0*f0+f6*f2*f2,c1=(f5-f6)*f2*f0,f7=(e9-1)/2,f8=0;f8<e9;++f8){f9=(f8-f7)*f3
e7=(d1+f2*f9)/q
e8=(d2+f0*f9)/q
if(e4.$4$merged(e7,e8,e6,!0))continue
B.c.I(r,new A.c_(e7,e8,e6,a5,c0,c1,!0))}s.e2("mergedSplit",new A.kC(),new A.kD())}},
$S:61}
A.kI.prototype={
$1(a){if(this.a===0)this.b.e2(a,new A.kJ(),new A.kK())},
$S:31}
A.kJ.prototype={
$1(a){return A.w(a)+1},
$S:7}
A.kK.prototype={
$0(){return 1},
$S:5}
A.kG.prototype={
$1(a){var s=this.a
return new A.a_(B.a.Y(a,s),B.a.an(a,s))},
$S:33}
A.kH.prototype={
$4(a,b,c,d){var s,r,q,p=this.a,o=this.b
if(!(a<8))return A.a(o,a)
s=p.$1(o[a])
if(!(b<8))return A.a(o,b)
r=p.$1(o[b])
if(!(c<8))return A.a(o,c)
q=p.$1(o[c])
if(!(d<8))return A.a(o,d)
return A.k([s,r,q,p.$1(o[d])],t.f)},
$S:34}
A.kz.prototype={
$1(a){var s,r,q,p,o=this
t.nE.a(a)
s=t.i
r=J.ai(a)
q=r.dW(a,0,new A.kx(),s)
if(typeof q!=="number")return q.fN()
p=o.b
s=r.dW(a,0,new A.ky(),s)
if(typeof s!=="number")return s.fN()
return Math.sqrt(Math.pow(q/4*p-o.c,2)+Math.pow(s/4*p-o.d,2))>0.1*Math.sqrt(o.a.a)},
$S:35}
A.kx.prototype={
$2(a,b){return A.dL(a)+t.aL.a(b).a},
$S:22}
A.ky.prototype={
$2(a,b){return A.dL(a)+t.aL.a(b).b},
$S:22}
A.kE.prototype={
$4$merged(a,b,c,d){return B.c.dO(this.a,new A.kF(c,d,a,b,this.b))},
$3(a,b,c){return this.$4$merged(a,b,c,!1)},
$S:37}
A.kF.prototype={
$1(a){var s,r,q=this
t.V.a(a)
s=q.a
r=a.c/s
return a.y===q.b&&r>0.7&&r<1.4&&Math.sqrt(Math.pow(a.a-q.c,2)+Math.pow(a.b-q.d,2))*q.e<0.3*s},
$S:8}
A.kA.prototype={
$1(a){return A.w(a)+1},
$S:7}
A.kB.prototype={
$0(){return 1},
$S:5}
A.kC.prototype={
$1(a){return A.w(a)+1},
$S:7}
A.kD.prototype={
$0(){return 1},
$S:5}
A.kd.prototype={
aB(a,b,c){var s=this.a,r=s[6]*b+s[7]*c+1
return new A.a_((s[0]*b+s[1]*c+s[2])/r,(s[3]*b+s[4]*c+s[5])/r)},
dQ(a,b){return this.aB(0,(b+0.5)/3,(a+0.5)/3)},
gdZ(){var s=this.dQ(1,1),r=this.dQ(1,2),q=this.dQ(2,1),p=s.a,o=s.b
return(Math.sqrt(Math.pow(r.a-p,2)+Math.pow(r.b-o,2))+Math.sqrt(Math.pow(q.a-p,2)+Math.pow(q.b-o,2)))/2}}
A.kR.prototype={
$1(a){return!isFinite(A.dL(a))},
$S:39}
A.bp.prototype={
gdh(){var s=this.Q,r=A.W(s)
return new A.aB(s,r.l("G(1)").a(new A.jZ()),r.l("aB<1>")).gu(0)},
sks(a){this.Q=t.cq.a(a)},
sjO(a){this.as=t.fS.a(a)}}
A.jZ.prototype={
$1(a){return A.o0(a)},
$S:51}
A.kt.prototype={
$1(a){return A.w(a)>=0},
$S:41}
A.ku.prototype={
$1(a){var s
A.w(a)
s=this.a
if(!(a>=0&&a<s.length))return A.a(s,a)
return s[a].c},
$S:19}
A.kv.prototype={
$2(a,b){return A.dL(a)+A.dL(b)},
$S:42}
A.i8.prototype={
ba(){return A.aL(["fill",A.aU(B.b.aO(this.a,3)),"fillSpread",A.aU(B.b.aO(this.b,2)),"aniso",A.aU(B.b.aO(this.c,2))],t.N,t.X)}}
A.kT.prototype={
$1(a){var s,r,q,p=this,o=p.b.a,n=p.a*o,m=p.c,l=n+m,k=a.length
if(!(l>=0&&l<k))return A.a(a,l)
l=a[l]
s=p.d
r=1-s
q=p.e
n+=q
if(!(n>=0&&n<k))return A.a(a,n)
n=a[n]
o=p.f*o
m=o+m
if(!(m>=0&&m<k))return A.a(a,m)
m=a[m]
q=o+q
if(!(q>=0&&q<k))return A.a(a,q)
k=p.r
return(l*r+n*s)*(1-k)+(m*r+a[q]*s)*k},
$S:43}
A.kX.prototype={
$1(a){var s,r,q
t.U.a(a)
s=A.u(a,a.$ti.l("a5.E"))
B.c.bV(s)
r=s.length
q=r/2|0
if(!(q<r))return A.a(s,q)
return s[q]},
$S:60}
A.kU.prototype={
$1(a){return t.O.a(a).a},
$S:10}
A.kV.prototype={
$1(a){return t.O.a(a).b},
$S:10}
A.kW.prototype={
$1(a){return t.O.a(a).c},
$S:10}
A.ks.prototype={
$2(a,b){var s,r,q,p,o
for(s=this.a,r=this.b,q=a,p=0,o=0;q<=b;++q){if(!(q<13))return A.a(s,q)
p+=s[q]
o+=r[q]}return o===0?0/0:p/o},
$S:20}
A.kN.prototype={
$1(a){return t.V.a(a).y},
$S:8}
A.kO.prototype={
$1(a){return!t.V.a(a).y},
$S:8}
A.kP.prototype={
$2(a,b){var s=t.iq
s.a(a)
s.a(b)
return B.b.bz(a.a[3],b.a[3])},
$S:46}
A.kQ.prototype={
$2(a,b){var s=t.l6
s.a(a)
return B.b.bz(s.a(b).r,a.r)},
$S:47}
A.kM.prototype={
$1(a){var s,r=this,q=r.b,p=a.a*q/r.c,o=a.b*q/r.d
q=r.e
s=-q
if(!(p<s)){q=1+q
q=p>q||o<s||o>q}else q=!0
if(q)r.a.a=!0
return new A.aO(B.b.K(p,0,1),B.b.K(o,0,1))},
$S:48}
A.aO.prototype={
ba(){return A.k([this.a,this.b],t.n)}}
A.jl.prototype={
ba(){var s=this.a,r=A.W(s),q=r.l("ao<1,q<j>>")
s=A.u(new A.ao(s,r.l("q<j>(1)").a(new A.jm()),q),q.l("a5.E"))
return s},
gfK(){var s,r,q,p,o,n,m,l,k,j,i,h=this.a
if(B.c.dO(h,new A.jn()))return!1
for(s=h.length,r=0,q=0;q<4;q=o){if(!(q<s))return A.a(h,q)
p=h[q]
o=q+1
n=o%4
if(!(n<s))return A.a(h,n)
m=h[n]
n=(q+2)%4
if(!(n<s))return A.a(h,n)
l=h[n]
n=m.a
k=p.a
j=m.b
i=p.b
if((n-k)*(l.b-j)-(j-i)*(l.a-n)<=0.001)return!1
r+=k*j-n*i
if(Math.pow(k-n,2)+Math.pow(i-j,2)<0.0025)return!1}return r/2>0.012}}
A.jm.prototype={
$1(a){t.x.a(a)
return A.k([a.a,a.b],t.n)},
$S:49}
A.jn.prototype={
$1(a){var s,r
t.x.a(a)
s=a.a
if(isFinite(s)){r=a.b
s=!isFinite(r)||s<0||s>1||r<0||r>1}else s=!0
return s},
$S:50}
A.jk.prototype={
aB(a,b,c){var s,r,q,p,o,n,m=this,l=m.r
l===$&&A.d()
s=m.w
s===$&&A.d()
r=l*b+s*c+1
s=m.a
s===$&&A.d()
l=m.b
l===$&&A.d()
q=m.c
q===$&&A.d()
p=m.d
p===$&&A.d()
o=m.e
o===$&&A.d()
n=m.f
n===$&&A.d()
return new A.aO((s*b+l*c+q)/r,(p*b+o*c+n)/r)}}
A.lq.prototype={
$1(a){return t.jB.a(a).ba()},
$S:17}
A.kq.prototype={
$1(a){return t.jB.a(a).ba()},
$S:17}
A.kZ.prototype={
$2(a,b){var s=this.a.aB(0,a,b),r=this.b,q=r.aM(B.a.K(B.b.ap(s.a*(r.gR()-1)),0,r.gR()-1),B.a.K(B.b.ap(s.b*(r.gN()-1)),0,r.gN()-1))
return new A.aY(B.b.i(q.gn()),B.b.i(q.gt()),B.b.i(q.gq()))},
$S:52}
A.lp.prototype={
$1(a){var s,r,q
t.Y.a(a)
s=A.u(a,a.$ti.l("a5.E"))
B.c.bV(s)
r=s.length
q=r/2|0
if(!(q<r))return A.a(s,q)
return s[q]},
$S:53}
A.lk.prototype={
$1(a){return t.l.a(a).a},
$S:11}
A.ll.prototype={
$1(a){return t.l.a(a).b},
$S:11}
A.lm.prototype={
$1(a){return t.l.a(a).c},
$S:11}
A.ln.prototype={
$1(a){var s,r,q,p,o,n
t.l.a(a)
s=a.a/255
r=a.b/255
q=a.c/255
p=Math.max(s,Math.max(r,q))
o=p-Math.min(s,Math.min(r,q))
if(o>1e-9)if(p===s)n=60*B.b.Y((r-q)/o,6)
else n=p===r?60*((q-s)/o+2):60*((s-r)/o+4)
else n=0
B.b.Y(n+360,360)
return p<0.1},
$S:24}
A.lo.prototype={
$1(a){t.l.a(a)
return a.a>250&&a.b>250&&a.c>250},
$S:24}
A.lg.prototype={
$1(a){var s,r,q,p,o,n,m=A.op(A.o1(a).data)
if(typeof m!="string")return
p=t.N
o=t.X
s=t.av.a(B.aS.jB(m,null)).dP(0,p,o)
r=null
try{r=A.u8(s)}catch(n){q=A.bK(n)
r=A.aL(["error",A.E(q)],p,o)}p=A.ck(r,p,o)
o=s
p.h(0,"id",o.$ti.l("4?").a(o.a.m(0,"id")))
this.a.postMessage(B.aS.jL(p,null))},
$S:56};(function aliases(){var s=J.bS.prototype
s.h2=s.B
s=A.I.prototype
s.e9=s.aq})();(function installTearOffs(){var s=hunkHelpers._static_2,r=hunkHelpers._static_0,q=hunkHelpers._static_1,p=hunkHelpers.installInstanceTearOff,o=hunkHelpers._instance_2u,n=hunkHelpers.installStaticTearOff
s(J,"t1","pB",57)
r(A,"te","pU",5)
q(A,"tz","r4",12)
q(A,"tA","r5",12)
q(A,"tB","r6",12)
r(A,"ol","tt",2)
q(A,"tE","rK",23)
p(A.a7.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.bv.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.ci.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.b8.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.ce.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.bO.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.ch.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.cf.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.cg.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
p(A.d9.prototype,"gbB",1,0,null,["$1","$0"],["a6","i"],3,0,0)
var m
o(m=A.hn.prototype,"ghT","hU",6)
o(m,"ghW","hX",6)
o(m,"ghY","hZ",6)
o(m,"ghN","hO",6)
o(m,"ghP","hQ",6)
q(A,"ul","qt",0)
q(A,"ue","ql",0)
q(A,"uc","qj",0)
q(A,"uj","qr",0)
q(A,"uk","qs",0)
q(A,"ui","qq",0)
q(A,"uh","qp",0)
q(A,"ug","qo",0)
q(A,"un","qv",0)
q(A,"um","qu",0)
q(A,"uf","qm",0)
q(A,"ud","qk",0)
q(A,"uy","qG",0)
q(A,"uw","qE",0)
q(A,"uo","qw",0)
q(A,"uq","qy",0)
q(A,"up","qx",0)
q(A,"ur","qz",0)
q(A,"uz","qH",0)
q(A,"ux","qF",0)
q(A,"us","qA",0)
q(A,"ut","qB",0)
q(A,"uu","qC",0)
q(A,"uv","qD",0)
o(A.f0.prototype,"giT","iU",18)
o(A.hd.prototype,"gjP","jQ",18)
n(A,"mD",3,null,["$3"],["qI"],1,0)
n(A,"uA",3,null,["$3"],["qJ"],1,0)
n(A,"uF",3,null,["$3"],["qO"],1,0)
n(A,"uG",3,null,["$3"],["qP"],1,0)
n(A,"uH",3,null,["$3"],["qQ"],1,0)
n(A,"uI",3,null,["$3"],["qR"],1,0)
n(A,"uJ",3,null,["$3"],["qS"],1,0)
n(A,"uK",3,null,["$3"],["qT"],1,0)
n(A,"uL",3,null,["$3"],["qU"],1,0)
n(A,"uM",3,null,["$3"],["qV"],1,0)
n(A,"uB",3,null,["$3"],["qK"],1,0)
n(A,"uC",3,null,["$3"],["qL"],1,0)
n(A,"uD",3,null,["$3"],["qM"],1,0)
n(A,"uE",3,null,["$3"],["qN"],1,0)
p(A.bw.prototype,"gfV",0,5,null,["$5"],["a5"],4,0,0)
n(A,"uO",6,null,["$6"],["r1"],9,0)
n(A,"uP",6,null,["$6"],["r2"],9,0)
n(A,"uN",6,null,["$6"],["r0"],9,0)})();(function inheritance(){var s=hunkHelpers.mixin,r=hunkHelpers.inherit,q=hunkHelpers.inheritMany
r(A.C,null)
q(A.C,[A.lJ,J.h4,A.eU,J.c3,A.e,A.dU,A.Q,A.bL,A.S,A.I,A.jo,A.aM,A.er,A.f5,A.dY,A.au,A.bG,A.aP,A.d3,A.fe,A.jv,A.j4,A.fo,A.j_,A.U,A.ax,A.jU,A.kk,A.bd,A.i3,A.ia,A.kg,A.bm,A.i0,A.f8,A.b_,A.i_,A.fu,A.fb,A.dx,A.i6,A.fg,A.fL,A.ap,A.jT,A.jS,A.kb,A.ib,A.c7,A.jW,A.hv,A.eW,A.jX,A.aw,A.ay,A.i9,A.jp,A.cB,A.j3,A.iF,A.jN,A.iN,A.jM,A.jV,A.h3,A.hw,A.R,A.aV,A.i2,A.fP,A.aJ,A.a7,A.iu,A.bt,A.ix,A.L,A.iz,A.fQ,A.bu,A.fR,A.fS,A.e_,A.e0,A.fl,A.e4,A.e5,A.e6,A.fZ,A.h_,A.fI,A.bN,A.iR,A.bR,A.iT,A.dI,A.hl,A.hm,A.iV,A.hn,A.eQ,A.hA,A.bn,A.ds,A.jb,A.cz,A.hE,A.hF,A.hI,A.hM,A.dt,A.du,A.eT,A.aX,A.eX,A.js,A.hQ,A.ju,A.hR,A.hS,A.j1,A.jx,A.f_,A.jy,A.jD,A.jG,A.jI,A.eZ,A.jH,A.jz,A.bH,A.f1,A.hZ,A.f2,A.f3,A.f0,A.hX,A.jE,A.hY,A.jK,A.f4,A.fU,A.fV,A.e8,A.e7,A.e9,A.fW,A.dF,A.d6,A.aW,A.hx,A.iK,A.am,A.j5,A.dw,A.aY,A.cA,A.jj,A.be,A.jY,A.c_,A.kd,A.bp,A.i8,A.aO,A.jl,A.jk])
q(J.h4,[J.hh,J.el,J.em,J.dl,J.dm,J.dk,J.cj])
q(J.em,[J.bS,J.r,A.cl,A.ex])
q(J.bS,[J.hy,J.dB,J.bx])
r(J.hf,A.eU)
r(J.iQ,J.r)
q(J.dk,[J.ek,J.hi])
q(A.e,[A.dG,A.D,A.eq,A.aB,A.fd,A.cS,A.cT,A.cU,A.cV,A.cW,A.cX,A.cZ,A.d_,A.d0,A.d1,A.d2,A.bM,A.dV,A.bw,A.al,A.cn,A.co,A.cp,A.cq,A.cr,A.cs,A.ct,A.cu,A.cv,A.cw,A.cx,A.cy,A.J])
r(A.c4,A.dG)
r(A.f7,A.c4)
q(A.Q,[A.c5,A.b9,A.f9,A.i4])
q(A.bL,[A.fG,A.fF,A.hP,A.lc,A.le,A.jP,A.jO,A.k7,A.li,A.lj,A.l1,A.it,A.iC,A.l4,A.l5,A.l6,A.l7,A.l8,A.l9,A.la,A.j8,A.iM,A.iL,A.ji,A.jh,A.kI,A.kJ,A.kG,A.kH,A.kz,A.kE,A.kF,A.kA,A.kC,A.kR,A.jZ,A.kt,A.ku,A.kT,A.kX,A.kU,A.kV,A.kW,A.kN,A.kO,A.kM,A.jm,A.jn,A.lq,A.kq,A.lp,A.lk,A.ll,A.lm,A.ln,A.lo,A.lg])
q(A.fG,[A.iv,A.iW,A.ld,A.k8,A.j0,A.j2,A.kc,A.iH,A.iI,A.iJ,A.jJ,A.kL,A.kw,A.kx,A.ky,A.kv,A.ks,A.kP,A.kQ,A.kZ])
q(A.S,[A.dn,A.bD,A.ho,A.hU,A.hN,A.i1,A.eo,A.fB,A.b3,A.eY,A.hT,A.dz,A.fJ])
r(A.dC,A.I)
r(A.b4,A.dC)
q(A.D,[A.a5,A.dX,A.by,A.ep,A.fa])
q(A.a5,[A.cC,A.ao,A.i5])
q(A.aP,[A.cH,A.dJ,A.dK])
q(A.cH,[A.a_,A.fm])
r(A.aQ,A.dJ)
r(A.aC,A.dK)
q(A.d3,[A.dW,A.cb])
q(A.fF,[A.j9,A.jQ,A.jR,A.kh,A.k_,A.k3,A.k2,A.k1,A.k0,A.k6,A.k5,A.k4,A.kf,A.kY,A.km,A.kl,A.kp,A.kK,A.kB,A.kD])
r(A.eC,A.bD)
q(A.hP,[A.hO,A.cR])
r(A.en,A.b9)
q(A.ex,[A.ht,A.ag])
q(A.ag,[A.fh,A.fj])
r(A.fi,A.fh)
r(A.bT,A.fi)
r(A.fk,A.fj)
r(A.aN,A.fk)
q(A.bT,[A.es,A.et])
q(A.aN,[A.eu,A.ev,A.ew,A.ey,A.ez,A.eA,A.cm])
r(A.fp,A.i1)
r(A.f6,A.i0)
r(A.i7,A.fu)
r(A.fc,A.f9)
r(A.fn,A.dx)
r(A.ff,A.fn)
q(A.fL,[A.ki,A.is,A.ir,A.iY,A.iX,A.hW])
q(A.ap,[A.dS,A.fN,A.hp])
r(A.hq,A.eo)
r(A.ka,A.kb)
q(A.fN,[A.hr,A.hV])
r(A.iZ,A.ki)
q(A.b3,[A.bA,A.h1])
r(A.ko,A.jN)
r(A.cQ,A.aw)
q(A.cQ,[A.fA,A.ip])
q(A.jW,[A.dT,A.iw,A.c6,A.av,A.fD,A.ak,A.aj,A.d4,A.c9,A.b6,A.d7,A.iS,A.dq,A.eP,A.bU,A.bV,A.bc,A.aA,A.cD,A.aa,A.aZ,A.cE,A.dE,A.fX,A.fT,A.ej,A.iD,A.eV])
r(A.h2,A.h3)
r(A.dp,A.hw)
q(A.bM,[A.fH,A.cY])
r(A.fK,A.dV)
r(A.c8,A.aV)
q(A.a7,[A.bv,A.cd,A.ci,A.b8,A.ce,A.bO,A.ch,A.cf,A.cg,A.da,A.d8,A.db,A.d9])
q(A.ix,[A.fE,A.iB,A.iE,A.iG,A.hj,A.hz,A.j7,A.jc,A.jg,A.jr,A.jt,A.jL])
r(A.iy,A.fE)
r(A.h5,A.bu)
q(A.h5,[A.eg,A.h7,A.h8,A.h9,A.eh])
r(A.h6,A.e0)
r(A.ha,A.e5)
r(A.fY,A.bt)
q(A.bN,[A.cc,A.ea])
r(A.iU,A.iz)
r(A.hb,A.eQ)
r(A.hc,A.hA)
r(A.bW,A.L)
q(A.bn,[A.hC,A.hD,A.hG,A.hH,A.hK,A.hL])
q(A.ds,[A.eS,A.hJ])
q(A.hM,[A.dv,A.az])
r(A.hd,A.f0)
r(A.he,A.f4)
r(A.ei,A.dF)
q(A.al,[A.dc,A.dd,A.eb,A.ec,A.ed,A.ee,A.de,A.df,A.dg,A.dh,A.di,A.dj])
q(A.aW,[A.eE,A.eF,A.eG,A.eH,A.eI,A.eJ,A.eK,A.eL,A.ba])
s(A.dC,A.bG)
s(A.fh,A.I)
s(A.fi,A.au)
s(A.fj,A.I)
s(A.fk,A.au)})()
var v={G:typeof self!="undefined"?self:globalThis,typeUniverse:{eC:new Map(),tR:{},eT:{},tPV:{},sEA:[]},mangledGlobalNames:{f:"int",j:"double",l:"num",B:"String",G:"bool",ay:"Null",q:"List",C:"Object",Y:"Map",a1:"JSObject"},mangledNames:{},types:["~(am)","f(f,bF,f)","~()","f([f])","~(f,f,l,l,l)","f()","~(bR,q<f>)","f(f)","G(c_)","~(f,f,f,f,f,bf)","j(+(j,j,j))","f(aY)","~(~())","~(C?,C?)","~(@)","~(B,aJ)","ay(@)","Y<B,C?>(cA)","~(f,G)","j(f)","j(f,f)","ay()","j(j,+(j,j))","@(@)","G(aY)","@()","ay(~())","bF(f)","j(j)","~(f,a7)","G()","~(B)","@(B)","+(j,j)(f)","q<+(j,j)>(f,f,f,f)","G(q<+(j,j)>)","G(B)","G(j,j,j{merged:G})","f(f,f)","G(j)","ay(C,dy)","G(f)","j(j,j)","j(e3)","C?(C?)","~(@,@)","f(+(f,j,j,j),+(f,j,j,j))","f(bp,bp)","aO(+(j,j))","q<j>(aO)","G(aO)","G(G)","aY(j,j)","f(e<f>)","@(@,B)","~(l,l,l,l)","ay(a1)","f(@,@)","l(l,l,l,l)","l(l,l,l,l,l)","j(e<j>)","~(bf,f)"],interceptorsByTag:null,leafTags:null,arrayRti:Symbol("$ti"),rttc:{"2;":(a,b)=>c=>c instanceof A.a_&&a.b(c.a)&&b.b(c.b),"2;preview,samples":(a,b)=>c=>c instanceof A.fm&&a.b(c.a)&&b.b(c.b),"3;":(a,b,c)=>d=>d instanceof A.aQ&&a.b(d.a)&&b.b(d.b)&&c.b(d.c),"4;":a=>b=>b instanceof A.aC&&A.u2(a,b.a)}}
A.rt(v.typeUniverse,JSON.parse('{"bx":"bS","hy":"bS","dB":"bS","uW":"cl","hh":{"G":[],"N":[]},"el":{"N":[]},"em":{"a1":[]},"bS":{"a1":[]},"r":{"q":["1"],"D":["1"],"a1":[],"e":["1"],"an":["1"]},"hf":{"eU":[]},"iQ":{"r":["1"],"q":["1"],"D":["1"],"a1":[],"e":["1"],"an":["1"]},"c3":{"A":["1"]},"dk":{"j":[],"l":[],"b5":["l"]},"ek":{"j":[],"f":[],"l":[],"b5":["l"],"N":[]},"hi":{"j":[],"l":[],"b5":["l"],"N":[]},"cj":{"B":[],"b5":["B"],"ns":[],"an":["@"],"N":[]},"dG":{"e":["2"]},"dU":{"A":["2"]},"c4":{"dG":["1","2"],"e":["2"],"e.E":"2"},"f7":{"c4":["1","2"],"dG":["1","2"],"D":["2"],"e":["2"],"e.E":"2"},"c5":{"Q":["3","4"],"Y":["3","4"],"Q.K":"3","Q.V":"4"},"dn":{"S":[]},"b4":{"I":["f"],"bG":["f"],"q":["f"],"D":["f"],"e":["f"],"I.E":"f","bG.E":"f"},"D":{"e":["1"]},"a5":{"D":["1"],"e":["1"]},"cC":{"a5":["1"],"D":["1"],"e":["1"],"a5.E":"1","e.E":"1"},"aM":{"A":["1"]},"eq":{"e":["2"],"e.E":"2"},"er":{"A":["2"]},"ao":{"a5":["2"],"D":["2"],"e":["2"],"a5.E":"2","e.E":"2"},"aB":{"e":["1"],"e.E":"1"},"f5":{"A":["1"]},"dX":{"D":["1"],"e":["1"],"e.E":"1"},"dY":{"A":["1"]},"dC":{"I":["1"],"bG":["1"],"q":["1"],"D":["1"],"e":["1"]},"a_":{"cH":[],"aP":[]},"fm":{"cH":[],"aP":[]},"aQ":{"dJ":[],"aP":[]},"aC":{"dK":[],"aP":[]},"d3":{"Y":["1","2"]},"dW":{"d3":["1","2"],"Y":["1","2"]},"fd":{"e":["1"],"e.E":"1"},"fe":{"A":["1"]},"cb":{"d3":["1","2"],"Y":["1","2"]},"eC":{"bD":[],"S":[]},"ho":{"S":[]},"hU":{"S":[]},"fo":{"dy":[]},"bL":{"ca":[]},"fF":{"ca":[]},"fG":{"ca":[]},"hP":{"ca":[]},"hO":{"ca":[]},"cR":{"ca":[]},"hN":{"S":[]},"b9":{"Q":["1","2"],"lM":["1","2"],"Y":["1","2"],"Q.K":"1","Q.V":"2"},"by":{"D":["1"],"e":["1"],"e.E":"1"},"U":{"A":["1"]},"ep":{"D":["1"],"e":["1"],"e.E":"1"},"ax":{"A":["1"]},"en":{"b9":["1","2"],"Q":["1","2"],"lM":["1","2"],"Y":["1","2"],"Q.K":"1","Q.V":"2"},"cH":{"aP":[]},"dJ":{"aP":[]},"dK":{"aP":[]},"cl":{"a1":[],"N":[]},"ex":{"a1":[],"a2":[]},"ht":{"a1":[],"a2":[],"N":[]},"ag":{"aK":["1"],"a1":[],"a2":[],"an":["1"]},"bT":{"I":["j"],"ag":["j"],"q":["j"],"aK":["j"],"D":["j"],"a1":[],"a2":[],"an":["j"],"e":["j"],"au":["j"]},"aN":{"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"]},"es":{"bT":[],"e3":[],"I":["j"],"ag":["j"],"q":["j"],"aK":["j"],"D":["j"],"a1":[],"a2":[],"an":["j"],"e":["j"],"au":["j"],"N":[],"I.E":"j"},"et":{"bT":[],"lB":[],"I":["j"],"ag":["j"],"q":["j"],"aK":["j"],"D":["j"],"a1":[],"a2":[],"an":["j"],"e":["j"],"au":["j"],"N":[],"I.E":"j"},"eu":{"aN":[],"iO":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"ev":{"aN":[],"ef":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"ew":{"aN":[],"lH":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"ey":{"aN":[],"ma":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"ez":{"aN":[],"bF":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"eA":{"aN":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"cm":{"aN":[],"bf":[],"I":["f"],"ag":["f"],"q":["f"],"aK":["f"],"D":["f"],"a1":[],"a2":[],"an":["f"],"e":["f"],"au":["f"],"N":[],"I.E":"f"},"i1":{"S":[]},"fp":{"bD":[],"S":[]},"bm":{"S":[]},"f6":{"i0":["1"]},"b_":{"d5":["1"]},"fu":{"nK":[]},"i7":{"fu":[],"nK":[]},"f9":{"Q":["1","2"],"Y":["1","2"]},"fc":{"f9":["1","2"],"Q":["1","2"],"Y":["1","2"],"Q.K":"1","Q.V":"2"},"fa":{"D":["1"],"e":["1"],"e.E":"1"},"fb":{"A":["1"]},"ff":{"dx":["1"],"D":["1"],"e":["1"]},"fg":{"A":["1"]},"I":{"q":["1"],"D":["1"],"e":["1"]},"Q":{"Y":["1","2"]},"dx":{"D":["1"],"e":["1"]},"fn":{"dx":["1"],"D":["1"],"e":["1"]},"i4":{"Q":["B","@"],"Y":["B","@"],"Q.K":"B","Q.V":"@"},"i5":{"a5":["B"],"D":["B"],"e":["B"],"a5.E":"B","e.E":"B"},"dS":{"ap":["q<f>","B"],"ap.S":"q<f>"},"fN":{"ap":["B","q<f>"]},"eo":{"S":[]},"hq":{"S":[]},"hp":{"ap":["C?","B"],"ap.S":"C?"},"hr":{"ap":["B","q<f>"],"ap.S":"B"},"hV":{"ap":["B","q<f>"],"ap.S":"B"},"c7":{"b5":["c7"]},"j":{"l":[],"b5":["l"]},"f":{"l":[],"b5":["l"]},"q":{"D":["1"],"e":["1"]},"l":{"b5":["l"]},"B":{"b5":["B"],"ns":[]},"fB":{"S":[]},"bD":{"S":[]},"b3":{"S":[]},"bA":{"S":[]},"h1":{"bA":[],"S":[]},"eY":{"S":[]},"hT":{"S":[]},"dz":{"S":[]},"fJ":{"S":[]},"hv":{"S":[]},"eW":{"S":[]},"i9":{"dy":[]},"cB":{"qe":[]},"h2":{"h3":[]},"dp":{"hw":[]},"R":{"A":["l"]},"cS":{"y":[],"e":["l"],"e.E":"l"},"cT":{"y":[],"e":["l"],"e.E":"l"},"cU":{"y":[],"e":["l"],"e.E":"l"},"cV":{"y":[],"e":["l"],"e.E":"l"},"cW":{"y":[],"e":["l"],"e.E":"l"},"cX":{"y":[],"e":["l"],"e.E":"l"},"cZ":{"y":[],"e":["l"],"e.E":"l"},"d_":{"y":[],"e":["l"],"e.E":"l"},"d0":{"y":[],"e":["l"],"e.E":"l"},"d1":{"y":[],"e":["l"],"e.E":"l"},"d2":{"y":[],"e":["l"],"e.E":"l"},"bM":{"y":[],"e":["l"],"e.E":"l"},"fH":{"y":[],"e":["l"],"e.E":"l"},"cY":{"y":[],"e":["l"],"e.E":"l"},"dV":{"y":[],"e":["l"],"e.E":"l"},"fK":{"y":[],"e":["l"],"e.E":"l"},"c8":{"aV":[]},"bv":{"a7":[]},"cd":{"a7":[]},"ci":{"a7":[]},"b8":{"a7":[]},"ce":{"a7":[]},"bO":{"a7":[]},"ch":{"a7":[]},"cf":{"a7":[]},"cg":{"a7":[]},"da":{"a7":[]},"d8":{"a7":[]},"db":{"a7":[]},"d9":{"a7":[]},"bt":{"L":[]},"eg":{"bu":[]},"h5":{"bu":[]},"e_":{"L":[]},"h6":{"e0":[]},"h7":{"bu":[]},"h8":{"bu":[]},"h9":{"bu":[]},"eh":{"bu":[]},"ha":{"e5":[]},"e6":{"L":[]},"fZ":{"L":[]},"fY":{"bt":[],"L":[]},"cc":{"bN":[]},"ea":{"bN":[]},"hm":{"L":[]},"hb":{"eQ":[]},"hA":{"L":[]},"hc":{"L":[]},"bW":{"L":[]},"hC":{"bn":[]},"hD":{"bn":[]},"hG":{"bn":[]},"hH":{"bn":[]},"hK":{"bn":[]},"hL":{"bn":[]},"eS":{"ds":[]},"hJ":{"ds":[]},"hE":{"L":[]},"dt":{"L":[]},"du":{"L":[]},"eT":{"L":[]},"eX":{"L":[]},"hS":{"L":[]},"he":{"f4":[]},"dF":{"L":[]},"ei":{"dF":[],"L":[]},"bw":{"e":["v"],"e.E":"v"},"al":{"e":["v"]},"dc":{"al":[],"e":["v"],"e.E":"v"},"dd":{"al":[],"e":["v"],"e.E":"v"},"eb":{"al":[],"e":["v"],"e.E":"v"},"ec":{"al":[],"e":["v"],"e.E":"v"},"ed":{"al":[],"e":["v"],"e.E":"v"},"ee":{"al":[],"e":["v"],"e.E":"v"},"de":{"al":[],"e":["v"],"e.E":"v"},"df":{"al":[],"e":["v"],"e.E":"v"},"dg":{"al":[],"e":["v"],"e.E":"v"},"dh":{"al":[],"e":["v"],"e.E":"v"},"di":{"al":[],"e":["v"],"e.E":"v"},"dj":{"al":[],"e":["v"],"e.E":"v"},"eE":{"aW":[]},"eF":{"aW":[]},"eG":{"aW":[]},"eH":{"aW":[]},"eI":{"aW":[]},"eJ":{"aW":[]},"eK":{"aW":[]},"eL":{"aW":[]},"ba":{"aW":[]},"cn":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"co":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cp":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cq":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cr":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cs":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"hx":{"A":["v"]},"ct":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cu":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cv":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cw":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cx":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"cy":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"J":{"v":[],"y":[],"e":["l"],"A":["v"],"e.E":"l"},"p5":{"a2":[]},"lH":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"bf":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"qh":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"iO":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"ma":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"ef":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"bF":{"q":["f"],"D":["f"],"a2":[],"e":["f"]},"e3":{"q":["j"],"D":["j"],"a2":[],"e":["j"]},"lB":{"q":["j"],"D":["j"],"a2":[],"e":["j"]},"v":{"y":[],"A":["v"],"e":["l"]}}'))
A.rs(v.typeUniverse,JSON.parse('{"dC":1,"ag":1,"fn":1,"fL":2,"hM":1}'))
var u={c:"Error handler must accept one Object or one Object and a StackTrace as arguments, and return a value of the returned future's type"}
var t=(function rtii(){var s=A.a3
return{u:s("bm"),A:s("dS"),aO:s("dT"),G:s("y"),bP:s("b5<@>"),cs:s("c7"),gt:s("D<@>"),C:s("S"),iW:s("fQ"),ho:s("fS"),pk:s("e3"),Z:s("ca"),co:s("e7"),a6:s("fU"),lq:s("fV"),lJ:s("e8"),aw:s("h_"),P:s("aJ"),r:s("a7"),w:s("al"),bW:s("ef"),U:s("e<j>"),e7:s("e<@>"),Y:s("e<f>"),an:s("r<fI>"),a_:s("r<fR>"),W:s("r<e0>"),b:s("r<e5>"),c:s("r<e7>"),g:s("r<bw>"),ns:s("r<bR>"),e:s("r<q<q<q<f>>>>"),o:s("r<q<q<f>>>"),bo:s("r<q<C>>"),eH:s("r<q<+(j,j)>>"),aQ:s("r<q<+(f,j,j)>>"),S:s("r<q<f>>"),d:s("r<Y<B,C?>>"),h:s("r<C>"),fi:s("r<eQ>"),mS:s("r<cz>"),na:s("r<bn>"),k9:s("r<hI>"),f:s("r<+(j,j)>"),kb:s("r<+(j,j,j)>"),kY:s("r<+(f,j,j)>"),a3:s("r<+(j,j,j,j)>"),iY:s("r<+(f,j,j,j)>"),oL:s("r<aY>"),h3:s("r<aO>"),c6:s("r<cA>"),s:s("r<B>"),fZ:s("r<hR>"),bs:s("r<bf>"),by:s("r<bH>"),ip:s("r<hY>"),J:s("r<f4>"),eg:s("r<c_>"),n0:s("r<i2>"),dx:s("r<bp>"),kv:s("r<dI>"),n:s("r<j>"),dG:s("r<@>"),t:s("r<f>"),gU:s("r<hl?>"),iZ:s("r<q<f>?>"),mD:s("r<bF?>"),e5:s("r<bf?>"),g2:s("r<l>"),B:s("r<~(am)>"),iy:s("an<@>"),v:s("el"),q:s("a1"),dY:s("bx"),dX:s("aK<@>"),fg:s("bR"),kn:s("q<ef>"),n5:s("q<q<ef>>"),mL:s("q<q<bH>>"),fS:s("q<Y<B,C?>>"),cf:s("q<cz>"),nE:s("q<+(j,j)>"),ac:s("q<eZ>"),jz:s("q<bH>"),jt:s("q<f1>"),as:s("q<f2>"),f4:s("q<f3>"),cq:s("q<G>"),H:s("q<j>"),j:s("q<@>"),L:s("q<f>"),hQ:s("q<bN?>"),nx:s("q<q<f>?>"),eL:s("q<bH?>"),am:s("q<fl?>"),dW:s("q<f?>"),je:s("Y<B,B>"),av:s("Y<@,@>"),lb:s("Y<B,C?>"),dQ:s("bT"),aj:s("aN"),dO:s("ag<@>"),hD:s("cm"),a:s("ay"),K:s("C"),mK:s("v"),dS:s("cz"),ok:s("hF"),dM:s("eS"),mi:s("ds"),fF:s("dt"),b0:s("bA"),k:s("dw"),lZ:s("uY"),aK:s("+()"),aL:s("+(j,j)"),O:s("+(j,j,j)"),iq:s("+(f,j,j,j)"),l:s("aY"),x:s("aO"),m:s("dy"),jB:s("cA"),N:s("B"),ew:s("cC<+(f,j,j,j)>"),e8:s("hQ"),aJ:s("N"),do:s("bD"),mC:s("bF"),D:s("bf"),cx:s("dB"),e6:s("eZ"),f_:s("f1"),h2:s("f2"),ij:s("f3"),cF:s("aB<B>"),V:s("c_"),l6:s("bp"),_:s("b_<@>"),mp:s("fc<C?,C?>"),nA:s("fl"),y:s("G"),nU:s("G(C)"),gS:s("G(B)"),i:s("j"),z:s("@"),mY:s("@()"),E:s("@(C)"),Q:s("@(C,dy)"),p:s("f"),gK:s("d5<ay>?"),er:s("bN?"),jH:s("iO?"),mU:s("a1?"),lH:s("q<@>?"),T:s("q<f>?"),iM:s("q<bN?>?"),ia:s("q<q<f>?>?"),gy:s("q<f?>?"),lG:s("Y<B,B>?"),X:s("C?"),cn:s("+(j,j)?"),jv:s("B?"),nh:s("bf?"),nX:s("f_?"),fA:s("bH?"),nk:s("hZ?"),F:s("f8<@,@>?"),nF:s("i6?"),fU:s("G?"),jX:s("j?"),I:s("f?"),jh:s("l?"),ec:s("~(f,G)?"),R:s("l"),ef:s("~"),M:s("~()"),mX:s("~(bR,q<f>)"),lc:s("~(B,@)"),kX:s("~(f,G)"),jO:s("~(l,l,l,l)")}})();(function constants(){var s=hunkHelpers.makeConstList
B.d7=J.h4.prototype
B.c=J.r.prototype
B.a=J.ek.prototype
B.b=J.dk.prototype
B.o=J.cj.prototype
B.d9=J.bx.prototype
B.da=J.em.prototype
B.aj=A.es.prototype
B.ak=A.et.prototype
B.aE=A.eu.prototype
B.U=A.ev.prototype
B.aF=A.ew.prototype
B.a_=A.ey.prototype
B.p=A.ez.prototype
B.f=A.cm.prototype
B.c_=J.hy.prototype
B.aN=J.dB.prototype
B.ao=new A.fD(0,"direct")
B.V=new A.fD(1,"alpha")
B.aP=new A.aj(0,"none")
B.ap=new A.aj(3,"bitfields")
B.aq=new A.aj(6,"alphaBitfields")
B.ar=new A.dT(0,"littleEndian")
B.as=new A.dT(1,"bigEndian")
B.cv=new A.is()
B.W=new A.dS()
B.cu=new A.ir()
B.cw=new A.dY(A.a3("dY<0&>"))
B.aQ=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
B.cx=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof HTMLElement == "function";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
B.cC=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var userAgent = navigator.userAgent;
    if (typeof userAgent != "string") return hooks;
    if (userAgent.indexOf("DumpRenderTree") >= 0) return hooks;
    if (userAgent.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
B.cy=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
B.cB=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
B.cA=function(hooks) {
  if (typeof navigator != "object") return hooks;
  var userAgent = navigator.userAgent;
  if (typeof userAgent != "string") return hooks;
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
B.cz=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
B.aR=function(hooks) { return hooks; }

B.aS=new A.hp()
B.aT=new A.hr()
B.cD=new A.hv()
B.z=new A.jo()
B.cE=new A.hV()
B.D=new A.jM()
B.A=new A.i7()
B.a4=new A.i9()
B.cF=new A.ko()
B.aU=new A.c6(1,"bgra")
B.cG=new A.c6(2,"abgr")
B.aV=new A.c6(3,"argb")
B.cH=new A.c6(4,"rgb")
B.cI=new A.c6(5,"bgr")
B.aW=new A.iw(4,"luminance")
B.X=new A.fK(4294967295)
B.cJ=new A.c9(0,"red")
B.cK=new A.c9(1,"green")
B.cL=new A.c9(2,"blue")
B.cM=new A.c9(3,"alpha")
B.cN=new A.c9(4,"other")
B.aX=new A.d4(0,"uint")
B.at=new A.d4(1,"half")
B.au=new A.d4(2,"float")
B.aY=new A.b6(0,"none")
B.cV=new A.iD(2,"both")
B.cW=new A.aw("Invalid Huffman code length",null,null)
B.cX=new A.aw("Khung ph\u1ea3i l\u1ed3i, \u0111\u1ee7 l\u1edbn v\xe0 kh\xf4ng giao nhau.",null,null)
B.cY=new A.aw("C\u1ea7n \u1ea3nh JPEG/PNG r\xf5 n\xe9t, t\u1eeb 90 px v\xe0 kh\xf4ng qu\xe1 20 megapixel.",null,null)
B.cZ=new A.aw("G\xf3c \u1ea3nh qu\xe1 h\u1eb9p",null,null)
B.d_=new A.aw("C\u1ea7n b\u1ed1n g\xf3c",null,null)
B.d0=new A.aw("Incomplete Huffman table",null,null)
B.d1=new A.aw("Oversubscribed Huffman table",null,null)
B.d2=new A.aw("Kh\xf4ng \u0111\u1ecdc \u0111\u01b0\u1ee3c \u1ea3nh. D\xf9ng JPEG ho\u1eb7c PNG.",null,null)
B.d3=new A.aw("\u1ea2nh v\u01b0\u1ee3t 16 MB. H\xe3y ch\u1ecdn \u1ea3nh nh\u1ecf h\u01a1n.",null,null)
B.w=new A.av(0,"uint1")
B.B=new A.av(1,"uint2")
B.J=new A.av(10,"float32")
B.L=new A.av(11,"float64")
B.C=new A.av(2,"uint4")
B.e=new A.av(3,"uint8")
B.l=new A.av(4,"uint16")
B.K=new A.av(5,"uint32")
B.M=new A.av(6,"int8")
B.N=new A.av(7,"int16")
B.O=new A.av(8,"int32")
B.E=new A.av(9,"float16")
B.aZ=new A.fT(1,"page")
B.i=new A.fT(2,"sequence")
B.av=new A.fX(0,"none")
B.d4=new A.fX(1,"deflate")
B.b_=new A.d7(2,"cur")
B.d=new A.ak(0,"none")
B.b0=new A.ak(1,"byte")
B.b1=new A.ak(10,"sRational")
B.b2=new A.ak(11,"single")
B.b3=new A.ak(12,"double")
B.b4=new A.ak(13,"ifd")
B.k=new A.ak(2,"ascii")
B.j=new A.ak(3,"short")
B.n=new A.ak(4,"long")
B.r=new A.ak(5,"rational")
B.b5=new A.ak(6,"sByte")
B.F=new A.ak(7,"undefined")
B.b6=new A.ak(8,"sShort")
B.b7=new A.ak(9,"sLong")
B.aw=new A.ej(0,"nearest")
B.d8=new A.ej(1,"linear")
B.b8=new A.ej(3,"average")
B.P=new A.iS(0,"yuv444")
B.db=new A.iX(null)
B.dc=new A.iY(null)
B.dd=new A.iZ(!1)
B.a5=s([0,2,8],t.t)
B.de=s([0,4,2,1],t.t)
B.d5=new A.d7(0,"invalid")
B.d6=new A.d7(1,"ico")
B.dg=s([B.d5,B.d6,B.b_],A.a3("r<d7>"))
B.du=s([1,2],t.t)
B.ba=s([252,243,207,63],t.t)
B.jM=new A.dq(0,"none")
B.c2=new A.dq(1,"background")
B.c3=new A.dq(2,"previous")
B.bb=s([B.jM,B.c2,B.c3],A.a3("r<dq>"))
B.a6=s([292,260,226,226],t.t)
B.bc=s([0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],t.t)
B.bd=s([2,3,7],t.t)
B.a7=s([3226,6412,200,168,38,38,134,134,100,100,100,100,68,68,68,68],t.t)
B.dJ=s([3,3,11],t.t)
B.aC=s([128,128,128,128,128,128,128,128,128,128,128],t.t)
B.bi=s([B.aC,B.aC,B.aC],t.S)
B.et=s([253,136,254,255,228,219,128,128,128,128,128],t.t)
B.fn=s([189,129,242,255,227,213,255,219,128,128,128],t.t)
B.fs=s([106,126,227,252,214,209,255,255,128,128,128],t.t)
B.hP=s([B.et,B.fn,B.fs],t.S)
B.hW=s([1,98,248,255,236,226,255,255,128,128,128],t.t)
B.dP=s([181,133,238,254,221,234,255,154,128,128,128],t.t)
B.dN=s([78,134,202,247,198,180,255,219,128,128,128],t.t)
B.ik=s([B.hW,B.dP,B.dN],t.S)
B.eo=s([1,185,249,255,243,255,128,128,128,128,128],t.t)
B.hT=s([184,150,247,255,236,224,128,128,128,128,128],t.t)
B.j9=s([77,110,216,255,236,230,128,128,128,128,128],t.t)
B.hk=s([B.eo,B.hT,B.j9],t.S)
B.hs=s([1,101,251,255,241,255,128,128,128,128,128],t.t)
B.er=s([170,139,241,252,236,209,255,255,128,128,128],t.t)
B.hy=s([37,116,196,243,228,255,255,255,128,128,128],t.t)
B.ea=s([B.hs,B.er,B.hy],t.S)
B.fE=s([1,204,254,255,245,255,128,128,128,128,128],t.t)
B.jo=s([207,160,250,255,238,128,128,128,128,128,128],t.t)
B.jn=s([102,103,231,255,211,171,128,128,128,128,128],t.t)
B.eO=s([B.fE,B.jo,B.jn],t.S)
B.e3=s([1,152,252,255,240,255,128,128,128,128,128],t.t)
B.jt=s([177,135,243,255,234,225,128,128,128,128,128],t.t)
B.hf=s([80,129,211,255,194,224,128,128,128,128,128],t.t)
B.hO=s([B.e3,B.jt,B.hf],t.S)
B.bn=s([1,1,255,128,128,128,128,128,128,128,128],t.t)
B.ia=s([246,1,255,128,128,128,128,128,128,128,128],t.t)
B.h0=s([255,128,128,128,128,128,128,128,128,128,128],t.t)
B.jC=s([B.bn,B.ia,B.h0],t.S)
B.eI=s([B.bi,B.hP,B.ik,B.hk,B.ea,B.eO,B.hO,B.jC],t.o)
B.jb=s([198,35,237,223,193,187,162,160,145,155,62],t.t)
B.es=s([131,45,198,221,172,176,220,157,252,221,1],t.t)
B.ja=s([68,47,146,208,149,167,221,162,255,223,128],t.t)
B.fN=s([B.jb,B.es,B.ja],t.S)
B.il=s([1,149,241,255,221,224,255,255,128,128,128],t.t)
B.iB=s([184,141,234,253,222,220,255,199,128,128,128],t.t)
B.fX=s([81,99,181,242,176,190,249,202,255,255,128],t.t)
B.iY=s([B.il,B.iB,B.fX],t.S)
B.iP=s([1,129,232,253,214,197,242,196,255,255,128],t.t)
B.jl=s([99,121,210,250,201,198,255,202,128,128,128],t.t)
B.hQ=s([23,91,163,242,170,187,247,210,255,255,128],t.t)
B.h2=s([B.iP,B.jl,B.hQ],t.S)
B.f2=s([1,200,246,255,234,255,128,128,128,128,128],t.t)
B.iM=s([109,178,241,255,231,245,255,255,128,128,128],t.t)
B.dz=s([44,130,201,253,205,192,255,255,128,128,128],t.t)
B.j1=s([B.f2,B.iM,B.dz],t.S)
B.dY=s([1,132,239,251,219,209,255,165,128,128,128],t.t)
B.dh=s([94,136,225,251,218,190,255,255,128,128,128],t.t)
B.iR=s([22,100,174,245,186,161,255,199,128,128,128],t.t)
B.hq=s([B.dY,B.dh,B.iR],t.S)
B.iA=s([1,182,249,255,232,235,128,128,128,128,128],t.t)
B.hI=s([124,143,241,255,227,234,128,128,128,128,128],t.t)
B.fk=s([35,77,181,251,193,211,255,205,128,128,128],t.t)
B.fu=s([B.iA,B.hI,B.fk],t.S)
B.jD=s([1,157,247,255,236,231,255,255,128,128,128],t.t)
B.eH=s([121,141,235,255,225,227,255,255,128,128,128],t.t)
B.iN=s([45,99,188,251,195,217,255,224,128,128,128],t.t)
B.e9=s([B.jD,B.eH,B.iN],t.S)
B.di=s([1,1,251,255,213,255,128,128,128,128,128],t.t)
B.dD=s([203,1,248,255,255,128,128,128,128,128,128],t.t)
B.iC=s([137,1,177,255,224,255,128,128,128,128,128],t.t)
B.e4=s([B.di,B.dD,B.iC],t.S)
B.it=s([B.fN,B.iY,B.h2,B.j1,B.hq,B.fu,B.e9,B.e4],t.o)
B.eS=s([253,9,248,251,207,208,255,192,128,128,128],t.t)
B.ib=s([175,13,224,243,193,185,249,198,255,255,128],t.t)
B.jB=s([73,17,171,221,161,179,236,167,255,234,128],t.t)
B.i3=s([B.eS,B.ib,B.jB],t.S)
B.iq=s([1,95,247,253,212,183,255,255,128,128,128],t.t)
B.h8=s([239,90,244,250,211,209,255,255,128,128,128],t.t)
B.j8=s([155,77,195,248,188,195,255,255,128,128,128],t.t)
B.iz=s([B.iq,B.h8,B.j8],t.S)
B.fG=s([1,24,239,251,218,219,255,205,128,128,128],t.t)
B.id=s([201,51,219,255,196,186,128,128,128,128,128],t.t)
B.h7=s([69,46,190,239,201,218,255,228,128,128,128],t.t)
B.io=s([B.fG,B.id,B.h7],t.S)
B.fq=s([1,191,251,255,255,128,128,128,128,128,128],t.t)
B.hw=s([223,165,249,255,213,255,128,128,128,128,128],t.t)
B.hV=s([141,124,248,255,255,128,128,128,128,128,128],t.t)
B.iO=s([B.fq,B.hw,B.hV],t.S)
B.fP=s([1,16,248,255,255,128,128,128,128,128,128],t.t)
B.eF=s([190,36,230,255,236,255,128,128,128,128,128],t.t)
B.eu=s([149,1,255,128,128,128,128,128,128,128,128],t.t)
B.dZ=s([B.fP,B.eF,B.eu],t.S)
B.hS=s([1,226,255,128,128,128,128,128,128,128,128],t.t)
B.i6=s([247,192,255,128,128,128,128,128,128,128,128],t.t)
B.j7=s([240,128,255,128,128,128,128,128,128,128,128],t.t)
B.dF=s([B.hS,B.i6,B.j7],t.S)
B.j0=s([1,134,252,255,255,128,128,128,128,128,128],t.t)
B.hH=s([213,62,250,255,255,128,128,128,128,128,128],t.t)
B.jr=s([55,93,255,128,128,128,128,128,128,128,128],t.t)
B.hR=s([B.j0,B.hH,B.jr],t.S)
B.ek=s([B.i3,B.iz,B.io,B.iO,B.dZ,B.dF,B.hR,B.bi],t.o)
B.hJ=s([202,24,213,235,186,191,220,160,240,175,255],t.t)
B.eq=s([126,38,182,232,169,184,228,174,255,187,128],t.t)
B.e0=s([61,46,138,219,151,178,240,170,255,216,128],t.t)
B.ix=s([B.hJ,B.eq,B.e0],t.S)
B.he=s([1,112,230,250,199,191,247,159,255,255,128],t.t)
B.e8=s([166,109,228,252,211,215,255,174,128,128,128],t.t)
B.hu=s([39,77,162,232,172,180,245,178,255,255,128],t.t)
B.iv=s([B.he,B.e8,B.hu],t.S)
B.hg=s([1,52,220,246,198,199,249,220,255,255,128],t.t)
B.eM=s([124,74,191,243,183,193,250,221,255,255,128],t.t)
B.fj=s([24,71,130,219,154,170,243,182,255,255,128],t.t)
B.iu=s([B.hg,B.eM,B.fj],t.S)
B.fh=s([1,182,225,249,219,240,255,224,128,128,128],t.t)
B.jq=s([149,150,226,252,216,205,255,171,128,128,128],t.t)
B.jH=s([28,108,170,242,183,194,254,223,255,255,128],t.t)
B.ji=s([B.fh,B.jq,B.jH],t.S)
B.jI=s([1,81,230,252,204,203,255,192,128,128,128],t.t)
B.iJ=s([123,102,209,247,188,196,255,233,128,128,128],t.t)
B.j5=s([20,95,153,243,164,173,255,203,128,128,128],t.t)
B.iK=s([B.jI,B.iJ,B.j5],t.S)
B.fU=s([1,222,248,255,216,213,128,128,128,128,128],t.t)
B.hF=s([168,175,246,252,235,205,255,255,128,128,128],t.t)
B.fm=s([47,116,215,255,211,212,255,255,128,128,128],t.t)
B.eB=s([B.fU,B.hF,B.fm],t.S)
B.fT=s([1,121,236,253,212,214,255,255,128,128,128],t.t)
B.hh=s([141,84,213,252,201,202,255,219,128,128,128],t.t)
B.i1=s([42,80,160,240,162,185,255,205,128,128,128],t.t)
B.fw=s([B.fT,B.hh,B.i1],t.S)
B.jx=s([244,1,255,128,128,128,128,128,128,128,128],t.t)
B.df=s([238,1,255,128,128,128,128,128,128,128,128],t.t)
B.i7=s([B.bn,B.jx,B.df],t.S)
B.dx=s([B.ix,B.iv,B.iu,B.ji,B.iK,B.eB,B.fw,B.i7],t.o)
B.e_=s([B.eI,B.it,B.ek,B.dx],t.e)
B.bf=s([511,1023,2047,4095],t.t)
B.bg=s([63,207,243,252],t.t)
B.eh=s([17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],t.t)
B.a8=s([0,1,2,3,4,5,6,7,8,9,10,11],t.t)
B.ew=s([8,8,4,2],t.t)
B.ds=s([173,148,140],t.t)
B.dt=s([176,155,140,135],t.t)
B.dq=s([180,157,141,134,130],t.t)
B.dC=s([254,254,243,230,196,177,153,140,133,130,129],t.t)
B.bh=s([B.ds,B.dt,B.dq,B.dC],t.S)
B.bj=s([1,1.387039845,1.306562965,1.175875602,1,0.785694958,0.5411961,0.275899379],t.n)
B.bk=s([0,1,3,7,15,31,63,127,255,511,1023,2047,4095],t.t)
B.bl=s([1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],t.t)
B.t=s([0,1,1,2,4,8,1,1,2,4,8,4,8,4],t.t)
B.bm=s([2954,2956,2958,2962,2970,2986,3018,3082,3212,3468,3980,5004],t.t)
B.bo=s([280,256,256,256,40],t.t)
B.Y=s([0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],t.t)
B.a9=s([62,62,30,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,3225,588,588,588,588,588,588,588,588,1680,1680,20499,22547,24595,26643,1776,1776,1808,1808,-24557,-22509,-20461,-18413,1904,1904,1936,1936,-16365,-14317,782,782,782,782,814,814,814,814,-12269,-10221,10257,10257,12305,12305,14353,14353,16403,18451,1712,1712,1744,1744,28691,30739,-32749,-30701,-28653,-26605,2061,2061,2061,2061,2061,2061,2061,2061,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,424,750,750,750,750,1616,1616,1648,1648,1424,1424,1456,1456,1488,1488,1520,1520,1840,1840,1872,1872,1968,1968,8209,8209,524,524,524,524,524,524,524,524,556,556,556,556,556,556,556,556,1552,1552,1584,1584,2000,2000,2032,2032,976,976,1008,1008,1040,1040,1072,1072,1296,1296,1328,1328,718,718,718,718,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,456,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,326,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,358,490,490,490,490,490,490,490,490,490,490,490,490,490,490,490,490,4113,4113,6161,6161,848,848,880,880,912,912,944,944,622,622,622,622,654,654,654,654,1104,1104,1136,1136,1168,1168,1200,1200,1232,1232,1264,1264,686,686,686,686,1360,1360,1392,1392,12,12,12,12,12,12,12,12,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390,390],t.t)
B.az=s([4,5,6,7,8,9,10,10,11,12,13,14,15,16,17,17,18,19,20,20,21,21,22,22,23,23,24,25,25,26,27,28,29,30,31,32,33,34,35,36,37,37,38,39,40,41,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,93,95,96,98,100,101,102,104,106,108,110,112,114,116,118,122,124,126,128,130,132,134,136,138,140,143,145,148,151,154,157],t.t)
B.bp=s([24,7,23,25,40,6,39,41,22,26,38,42,56,5,55,57,21,27,54,58,37,43,72,4,71,73,20,28,53,59,70,74,36,44,88,69,75,52,60,3,87,89,19,29,86,90,35,45,68,76,85,91,51,61,104,2,103,105,18,30,102,106,34,46,84,92,67,77,101,107,50,62,120,1,119,121,83,93,17,31,100,108,66,78,118,122,33,47,117,123,49,63,99,109,82,94,0,116,124,65,79,16,32,98,110,48,115,125,81,95,64,114,126,97,111,80,113,127,96,112],t.t)
B.aA=s([4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,234,239,245,249,254,259,264,269,274,279,284],t.t)
B.bq=s([0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],t.t)
B.br=s([B.aX,B.at,B.au],A.a3("r<d4>"))
B.fe=s([0.2,0.35,0.5,0.65,0.8],t.n)
B.bs=s([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],t.t)
B.bt=s([254,253,251,247,239,223,191,127],t.t)
B.aB=s([A.us(),A.uk(),A.uz(),A.ux(),A.uu(),A.ut(),A.uv()],t.B)
B.aK=new A.aa(0,"whiteIsZero")
B.kk=new A.aa(1,"blackIsZero")
B.kr=new A.aa(2,"rgb")
B.aM=new A.aa(3,"palette")
B.ks=new A.aa(4,"transparencyMask")
B.cg=new A.aa(5,"cmyk")
B.kt=new A.aa(6,"yCbCr")
B.ku=new A.aa(7,"reserved7")
B.kv=new A.aa(8,"cieLab")
B.kw=new A.aa(9,"iccLab")
B.kl=new A.aa(10,"ituLab")
B.km=new A.aa(11,"logL")
B.kn=new A.aa(12,"logLuv")
B.ko=new A.aa(13,"colorFilterArray")
B.kp=new A.aa(14,"linearRaw")
B.kq=new A.aa(15,"depth")
B.aL=new A.aa(16,"unknown")
B.bv=s([B.aK,B.kk,B.kr,B.aM,B.ks,B.cg,B.kt,B.ku,B.kv,B.kw,B.kl,B.km,B.kn,B.ko,B.kp,B.kq,B.aL],A.a3("r<aa>"))
B.bx=s([0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],t.t)
B.c0=new A.eP(0,"source")
B.c1=new A.eP(1,"over")
B.by=s([B.c0,B.c1],A.a3("r<eP>"))
B.kc=new A.cD(0,"invalid")
B.ce=new A.cD(1,"uint")
B.h=new A.cD(2,"int")
B.a1=new A.cD(3,"float")
B.bz=s([B.kc,B.ce,B.h,B.a1],A.a3("r<cD>"))
B.bA=s([17,18,0,1,2,3,4,5,16,6,7,8,9,10,11,12,13,14,15],t.t)
B.aa=s([-0.0,1,-1,2,-2,3,4,6,-3,5,-4,-5,-6,7,-7,8,-8,-9],t.t)
B.bB=s([B.d,B.b0,B.k,B.j,B.n,B.r,B.b5,B.F,B.b6,B.b7,B.b1,B.b2,B.b3,B.b4],A.a3("r<ak>"))
B.bC=s([0,1,4,8,5,2,3,6,9,12,13,10,7,11,14,15],t.t)
B.cO=new A.b6(1,"rle")
B.cP=new A.b6(2,"zips")
B.cQ=new A.b6(3,"zip")
B.cR=new A.b6(4,"piz")
B.cS=new A.b6(5,"pxr24")
B.cT=new A.b6(6,"b44")
B.cU=new A.b6(7,"b44a")
B.bD=s([B.aY,B.cO,B.cP,B.cQ,B.cR,B.cS,B.cT,B.cU],A.a3("r<b6>"))
B.hZ=s([231,120,48,89,115,113,120,152,112],t.t)
B.dy=s([152,179,64,126,170,118,46,70,95],t.t)
B.h6=s([175,69,143,80,85,82,72,155,103],t.t)
B.dS=s([56,58,10,171,218,189,17,13,152],t.t)
B.ht=s([114,26,17,163,44,195,21,10,173],t.t)
B.hE=s([121,24,80,195,26,62,44,64,85],t.t)
B.hp=s([144,71,10,38,171,213,144,34,26],t.t)
B.iT=s([170,46,55,19,136,160,33,206,71],t.t)
B.f3=s([63,20,8,114,114,208,12,9,226],t.t)
B.fF=s([81,40,11,96,182,84,29,16,36],t.t)
B.dj=s([B.hZ,B.dy,B.h6,B.dS,B.ht,B.hE,B.hp,B.iT,B.f3,B.fF],t.S)
B.eE=s([134,183,89,137,98,101,106,165,148],t.t)
B.iE=s([72,187,100,130,157,111,32,75,80],t.t)
B.hM=s([66,102,167,99,74,62,40,234,128],t.t)
B.dE=s([41,53,9,178,241,141,26,8,107],t.t)
B.fB=s([74,43,26,146,73,166,49,23,157],t.t)
B.fb=s([65,38,105,160,51,52,31,115,128],t.t)
B.ff=s([104,79,12,27,217,255,87,17,7],t.t)
B.h4=s([87,68,71,44,114,51,15,186,23],t.t)
B.iw=s([47,41,14,110,182,183,21,17,194],t.t)
B.i9=s([66,45,25,102,197,189,23,18,22],t.t)
B.j6=s([B.eE,B.iE,B.hM,B.dE,B.fB,B.fb,B.ff,B.h4,B.iw,B.i9],t.S)
B.hY=s([88,88,147,150,42,46,45,196,205],t.t)
B.hv=s([43,97,183,117,85,38,35,179,61],t.t)
B.fl=s([39,53,200,87,26,21,43,232,171],t.t)
B.h_=s([56,34,51,104,114,102,29,93,77],t.t)
B.hl=s([39,28,85,171,58,165,90,98,64],t.t)
B.f7=s([34,22,116,206,23,34,43,166,73],t.t)
B.dk=s([107,54,32,26,51,1,81,43,31],t.t)
B.iW=s([68,25,106,22,64,171,36,225,114],t.t)
B.eD=s([34,19,21,102,132,188,16,76,124],t.t)
B.jf=s([62,18,78,95,85,57,50,48,51],t.t)
B.eQ=s([B.hY,B.hv,B.fl,B.h_,B.hl,B.f7,B.dk,B.iW,B.eD,B.jf],t.S)
B.hi=s([193,101,35,159,215,111,89,46,111],t.t)
B.ej=s([60,148,31,172,219,228,21,18,111],t.t)
B.dX=s([112,113,77,85,179,255,38,120,114],t.t)
B.jc=s([40,42,1,196,245,209,10,25,109],t.t)
B.fR=s([88,43,29,140,166,213,37,43,154],t.t)
B.f9=s([61,63,30,155,67,45,68,1,209],t.t)
B.fr=s([100,80,8,43,154,1,51,26,71],t.t)
B.dH=s([142,78,78,16,255,128,34,197,171],t.t)
B.hd=s([41,40,5,102,211,183,4,1,221],t.t)
B.eW=s([51,50,17,168,209,192,23,25,82],t.t)
B.eP=s([B.hi,B.ej,B.dX,B.jc,B.fR,B.f9,B.fr,B.dH,B.hd,B.eW],t.S)
B.fi=s([138,31,36,171,27,166,38,44,229],t.t)
B.eN=s([67,87,58,169,82,115,26,59,179],t.t)
B.ij=s([63,59,90,180,59,166,93,73,154],t.t)
B.j3=s([40,40,21,116,143,209,34,39,175],t.t)
B.dM=s([47,15,16,183,34,223,49,45,183],t.t)
B.ep=s([46,17,33,183,6,98,15,32,183],t.t)
B.jJ=s([57,46,22,24,128,1,54,17,37],t.t)
B.ft=s([65,32,73,115,28,128,23,128,205],t.t)
B.hL=s([40,3,9,115,51,192,18,6,223],t.t)
B.fz=s([87,37,9,115,59,77,64,21,47],t.t)
B.hc=s([B.fi,B.eN,B.ij,B.j3,B.dM,B.ep,B.jJ,B.ft,B.hL,B.fz],t.S)
B.jw=s([104,55,44,218,9,54,53,130,226],t.t)
B.e7=s([64,90,70,205,40,41,23,26,57],t.t)
B.ii=s([54,57,112,184,5,41,38,166,213],t.t)
B.f8=s([30,34,26,133,152,116,10,32,134],t.t)
B.i4=s([39,19,53,221,26,114,32,73,255],t.t)
B.eU=s([31,9,65,234,2,15,1,118,73],t.t)
B.hb=s([75,32,12,51,192,255,160,43,51],t.t)
B.fa=s([88,31,35,67,102,85,55,186,85],t.t)
B.fK=s([56,21,23,111,59,205,45,37,192],t.t)
B.fL=s([55,38,70,124,73,102,1,34,98],t.t)
B.jA=s([B.jw,B.e7,B.ii,B.f8,B.i4,B.eU,B.hb,B.fa,B.fK,B.fL],t.S)
B.fJ=s([125,98,42,88,104,85,117,175,82],t.t)
B.fd=s([95,84,53,89,128,100,113,101,45],t.t)
B.hz=s([75,79,123,47,51,128,81,171,1],t.t)
B.e5=s([57,17,5,71,102,57,53,41,49],t.t)
B.ic=s([38,33,13,121,57,73,26,1,85],t.t)
B.jp=s([41,10,67,138,77,110,90,47,114],t.t)
B.h9=s([115,21,2,10,102,255,166,23,6],t.t)
B.eG=s([101,29,16,10,85,128,101,196,26],t.t)
B.fp=s([57,18,10,102,102,213,34,20,43],t.t)
B.fQ=s([117,20,15,36,163,128,68,1,26],t.t)
B.h3=s([B.fJ,B.fd,B.hz,B.e5,B.ic,B.jp,B.h9,B.eG,B.fp,B.fQ],t.S)
B.fx=s([102,61,71,37,34,53,31,243,192],t.t)
B.jm=s([69,60,71,38,73,119,28,222,37],t.t)
B.fA=s([68,45,128,34,1,47,11,245,171],t.t)
B.dp=s([62,17,19,70,146,85,55,62,70],t.t)
B.jF=s([37,43,37,154,100,163,85,160,1],t.t)
B.jj=s([63,9,92,136,28,64,32,201,85],t.t)
B.iH=s([75,15,9,9,64,255,184,119,16],t.t)
B.eL=s([86,6,28,5,64,255,25,248,1],t.t)
B.i8=s([56,8,17,132,137,255,55,116,128],t.t)
B.e1=s([58,15,20,82,135,57,26,121,40],t.t)
B.ho=s([B.fx,B.jm,B.fA,B.dp,B.jF,B.jj,B.iH,B.eL,B.i8,B.e1],t.S)
B.hC=s([164,50,31,137,154,133,25,35,218],t.t)
B.eK=s([51,103,44,131,131,123,31,6,158],t.t)
B.jh=s([86,40,64,135,148,224,45,183,128],t.t)
B.h5=s([22,26,17,131,240,154,14,1,209],t.t)
B.em=s([45,16,21,91,64,222,7,1,197],t.t)
B.j4=s([56,21,39,155,60,138,23,102,213],t.t)
B.jz=s([83,12,13,54,192,255,68,47,28],t.t)
B.hN=s([85,26,85,85,128,128,32,146,171],t.t)
B.h1=s([18,11,7,63,144,171,4,4,246],t.t)
B.eR=s([35,27,10,146,174,171,12,26,128],t.t)
B.fV=s([B.hC,B.eK,B.jh,B.h5,B.em,B.j4,B.jz,B.hN,B.h1,B.eR],t.S)
B.is=s([190,80,35,99,180,80,126,54,45],t.t)
B.iS=s([85,126,47,87,176,51,41,20,32],t.t)
B.ie=s([101,75,128,139,118,146,116,128,85],t.t)
B.iD=s([56,41,15,176,236,85,37,9,62],t.t)
B.e2=s([71,30,17,119,118,255,17,18,138],t.t)
B.hn=s([101,38,60,138,55,70,43,26,142],t.t)
B.fY=s([146,36,19,30,171,255,97,27,20],t.t)
B.hX=s([138,45,61,62,219,1,81,188,64],t.t)
B.jd=s([32,41,20,117,151,142,20,21,163],t.t)
B.iU=s([112,19,12,61,195,128,48,4,24],t.t)
B.im=s([B.is,B.iS,B.ie,B.iD,B.e2,B.hn,B.fY,B.hX,B.jd,B.iU],t.S)
B.bE=s([B.dj,B.j6,B.eQ,B.eP,B.hc,B.jA,B.h3,B.ho,B.fV,B.im],t.o)
B.am=new A.aA(0,"none")
B.H=new A.aA(1,"palette")
B.cd=new A.aA(2,"rgb")
B.k6=new A.aA(3,"gray")
B.k7=new A.aA(4,"reserved4")
B.k8=new A.aA(5,"reserved5")
B.k9=new A.aA(6,"reserved6")
B.ka=new A.aA(7,"reserved7")
B.kb=new A.aA(8,"reserved8")
B.I=new A.aA(9,"paletteRle")
B.cc=new A.aA(10,"rgbRle")
B.k5=new A.aA(11,"grayRle")
B.bF=s([B.am,B.H,B.cd,B.k6,B.k7,B.k8,B.k9,B.ka,B.kb,B.I,B.cc,B.k5],A.a3("r<aA>"))
B.bG=s([0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250],t.t)
B.hx=s([0,1,1,1,0],t.t)
B.bH=s([A.uc(),A.uj(),A.ul(),A.ue(),A.uh(),A.un(),A.ug(),A.um(),A.ud(),A.uf()],t.B)
B.k3=new A.aQ(-1,0,"top")
B.k2=new A.aQ(1,0,"bottom")
B.k1=new A.aQ(0,-1,"left")
B.k0=new A.aQ(0,1,"right")
B.hG=s([B.k3,B.k2,B.k1,B.k0],A.a3("r<+(f,f,B)>"))
B.ay=s([8,0,8,0],t.t)
B.e6=s([5,3,5,3],t.t)
B.dK=s([3,5,3,5],t.t)
B.b9=s([0,8,0,8],t.t)
B.be=s([4,4,4,4],t.t)
B.dW=s([4,4,0,0],t.t)
B.bI=s([B.ay,B.e6,B.dK,B.b9,B.ay,B.be,B.dW,B.b9],t.S)
B.ab=s([80,88,23,71,30,30,62,62,4,4,4,4,4,4,4,4,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41],t.t)
B.hU=s([16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],t.t)
B.Q=s([0,1,4,5,16,17,20,21,64,65,68,69,80,81,84,85,256,257,260,261,272,273,276,277,320,321,324,325,336,337,340,341,1024,1025,1028,1029,1040,1041,1044,1045,1088,1089,1092,1093,1104,1105,1108,1109,1280,1281,1284,1285,1296,1297,1300,1301,1344,1345,1348,1349,1360,1361,1364,1365,4096,4097,4100,4101,4112,4113,4116,4117,4160,4161,4164,4165,4176,4177,4180,4181,4352,4353,4356,4357,4368,4369,4372,4373,4416,4417,4420,4421,4432,4433,4436,4437,5120,5121,5124,5125,5136,5137,5140,5141,5184,5185,5188,5189,5200,5201,5204,5205,5376,5377,5380,5381,5392,5393,5396,5397,5440,5441,5444,5445,5456,5457,5460,5461,16384,16385,16388,16389,16400,16401,16404,16405,16448,16449,16452,16453,16464,16465,16468,16469,16640,16641,16644,16645,16656,16657,16660,16661,16704,16705,16708,16709,16720,16721,16724,16725,17408,17409,17412,17413,17424,17425,17428,17429,17472,17473,17476,17477,17488,17489,17492,17493,17664,17665,17668,17669,17680,17681,17684,17685,17728,17729,17732,17733,17744,17745,17748,17749,20480,20481,20484,20485,20496,20497,20500,20501,20544,20545,20548,20549,20560,20561,20564,20565,20736,20737,20740,20741,20752,20753,20756,20757,20800,20801,20804,20805,20816,20817,20820,20821,21504,21505,21508,21509,21520,21521,21524,21525,21568,21569,21572,21573,21584,21585,21588,21589,21760,21761,21764,21765,21776,21777,21780,21781,21824,21825,21828,21829,21840,21841,21844,21845],t.t)
B.bJ=s([127,127,191,127,159,191,223,127,143,159,175,191,207,223,239,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,127,131,135,139,143,147,151,155,159,163,167,171,175,179,183,187,191,195,199,203,207,211,215,219,223,227,231,235,239,243,247,251,127,129,131,133,135,137,139,141,143,145,147,149,151,153,155,157,159,161,163,165,167,169,171,173,175,177,179,181,183,185,187,189,191,193,195,197,199,201,203,205,207,209,211,213,215,217,219,221,223,225,227,229,231,233,235,237,239,241,243,245,247,249,251,253,127],t.t)
B.ac=s([7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],t.t)
B.G=s([28679,28679,31752,-32759,-31735,-30711,-29687,-28663,29703,29703,30727,30727,-27639,-26615,-25591,-24567],t.t)
B.ad=s([6430,6400,6400,6400,3225,3225,3225,3225,944,944,944,944,976,976,976,976,1456,1456,1456,1456,1488,1488,1488,1488,718,718,718,718,718,718,718,718,750,750,750,750,750,750,750,750,1520,1520,1520,1520,1552,1552,1552,1552,428,428,428,428,428,428,428,428,428,428,428,428,428,428,428,428,654,654,654,654,654,654,654,654,1072,1072,1072,1072,1104,1104,1104,1104,1136,1136,1136,1136,1168,1168,1168,1168,1200,1200,1200,1200,1232,1232,1232,1232,622,622,622,622,622,622,622,622,1008,1008,1008,1008,1040,1040,1040,1040,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,396,1712,1712,1712,1712,1744,1744,1744,1744,846,846,846,846,846,846,846,846,1264,1264,1264,1264,1296,1296,1296,1296,1328,1328,1328,1328,1360,1360,1360,1360,1392,1392,1392,1392,1424,1424,1424,1424,686,686,686,686,686,686,686,686,910,910,910,910,910,910,910,910,1968,1968,1968,1968,2000,2000,2000,2000,2032,2032,2032,2032,16,16,16,16,10257,10257,10257,10257,12305,12305,12305,12305,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,330,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,362,878,878,878,878,878,878,878,878,1904,1904,1904,1904,1936,1936,1936,1936,-18413,-18413,-16365,-16365,-14317,-14317,-10221,-10221,590,590,590,590,590,590,590,590,782,782,782,782,782,782,782,782,1584,1584,1584,1584,1616,1616,1616,1616,1648,1648,1648,1648,1680,1680,1680,1680,814,814,814,814,814,814,814,814,1776,1776,1776,1776,1808,1808,1808,1808,1840,1840,1840,1840,1872,1872,1872,1872,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,6157,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,-12275,14353,14353,14353,14353,16401,16401,16401,16401,22547,22547,24595,24595,20497,20497,20497,20497,18449,18449,18449,18449,26643,26643,28691,28691,30739,30739,-32749,-32749,-30701,-30701,-28653,-28653,-26605,-26605,-24557,-24557,-22509,-22509,-20461,-20461,8207,8207,8207,8207,8207,8207,8207,8207,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,72,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,104,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,4107,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,266,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,298,524,524,524,524,524,524,524,524,524,524,524,524,524,524,524,524,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,556,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,136,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,460,492,492,492,492,492,492,492,492,492,492,492,492,492,492,492,492,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,2059,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232,232],t.t)
B.bK=s([],t.d)
B.ig=s([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],t.t)
B.af=s([0,1,2,3,6,4,5,6,6,6,6,6,6,6,6,7,0],t.t)
B.jN=new A.bU(0,"none")
B.jO=new A.bU(1,"sub")
B.jP=new A.bU(2,"up")
B.jQ=new A.bU(3,"average")
B.jR=new A.bU(4,"paeth")
B.ag=s([B.jN,B.jO,B.jP,B.jQ,B.jR],A.a3("r<bU>"))
B.x=s([0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],t.t)
B.y=s([0,1,3,7,15,31,63,127,255],t.t)
B.iI=s([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],t.t)
B.u=s([255,255,255,255,255,255,255,255,255,255,255],t.t)
B.S=s([B.u,B.u,B.u],t.S)
B.fZ=s([176,246,255,255,255,255,255,255,255,255,255],t.t)
B.js=s([223,241,252,255,255,255,255,255,255,255,255],t.t)
B.eA=s([249,253,253,255,255,255,255,255,255,255,255],t.t)
B.ha=s([B.fZ,B.js,B.eA],t.S)
B.fH=s([255,244,252,255,255,255,255,255,255,255,255],t.t)
B.fv=s([234,254,254,255,255,255,255,255,255,255,255],t.t)
B.bO=s([253,255,255,255,255,255,255,255,255,255,255],t.t)
B.eJ=s([B.fH,B.fv,B.bO],t.S)
B.jg=s([255,246,254,255,255,255,255,255,255,255,255],t.t)
B.i5=s([239,253,254,255,255,255,255,255,255,255,255],t.t)
B.bL=s([254,255,254,255,255,255,255,255,255,255,255],t.t)
B.iF=s([B.jg,B.i5,B.bL],t.S)
B.bu=s([255,248,254,255,255,255,255,255,255,255,255],t.t)
B.f_=s([251,255,254,255,255,255,255,255,255,255,255],t.t)
B.hD=s([B.bu,B.f_,B.u],t.S)
B.ax=s([255,253,254,255,255,255,255,255,255,255,255],t.t)
B.hB=s([251,254,254,255,255,255,255,255,255,255,255],t.t)
B.f6=s([B.ax,B.hB,B.bL],t.S)
B.dQ=s([255,254,253,255,254,255,255,255,255,255,255],t.t)
B.fD=s([250,255,254,255,254,255,255,255,255,255,255],t.t)
B.ae=s([254,255,255,255,255,255,255,255,255,255,255],t.t)
B.fS=s([B.dQ,B.fD,B.ae],t.S)
B.fo=s([B.S,B.ha,B.eJ,B.iF,B.hD,B.f6,B.fS,B.S],t.o)
B.dw=s([217,255,255,255,255,255,255,255,255,255,255],t.t)
B.fW=s([225,252,241,253,255,255,254,255,255,255,255],t.t)
B.ih=s([234,250,241,250,253,255,253,254,255,255,255],t.t)
B.iV=s([B.dw,B.fW,B.ih],t.S)
B.aD=s([255,254,255,255,255,255,255,255,255,255,255],t.t)
B.eC=s([223,254,254,255,255,255,255,255,255,255,255],t.t)
B.en=s([238,253,254,254,255,255,255,255,255,255,255],t.t)
B.i2=s([B.aD,B.eC,B.en],t.S)
B.fy=s([249,254,255,255,255,255,255,255,255,255,255],t.t)
B.je=s([B.bu,B.fy,B.u],t.S)
B.iX=s([255,253,255,255,255,255,255,255,255,255,255],t.t)
B.hA=s([247,254,255,255,255,255,255,255,255,255,255],t.t)
B.hr=s([B.iX,B.hA,B.u],t.S)
B.ei=s([252,255,255,255,255,255,255,255,255,255,255],t.t)
B.dG=s([B.ax,B.ei,B.u],t.S)
B.bQ=s([255,254,254,255,255,255,255,255,255,255,255],t.t)
B.el=s([B.bQ,B.bO,B.u],t.S)
B.i0=s([255,254,253,255,255,255,255,255,255,255,255],t.t)
B.bw=s([250,255,255,255,255,255,255,255,255,255,255],t.t)
B.eg=s([B.i0,B.bw,B.ae],t.S)
B.dT=s([B.iV,B.i2,B.je,B.hr,B.dG,B.el,B.eg,B.S],t.o)
B.ip=s([186,251,250,255,255,255,255,255,255,255,255],t.t)
B.eX=s([234,251,244,254,255,255,255,255,255,255,255],t.t)
B.iG=s([251,251,243,253,254,255,254,255,255,255,255],t.t)
B.f4=s([B.ip,B.eX,B.iG],t.S)
B.f1=s([236,253,254,255,255,255,255,255,255,255,255],t.t)
B.i_=s([251,253,253,254,254,255,255,255,255,255,255],t.t)
B.fM=s([B.ax,B.f1,B.i_],t.S)
B.ir=s([254,254,254,255,255,255,255,255,255,255,255],t.t)
B.eY=s([B.bQ,B.ir,B.u],t.S)
B.iL=s([254,254,255,255,255,255,255,255,255,255,255],t.t)
B.f0=s([B.aD,B.iL,B.ae],t.S)
B.bR=s([B.u,B.ae,B.u],t.S)
B.dR=s([B.f4,B.fM,B.eY,B.f0,B.bR,B.S,B.S,B.S],t.o)
B.fC=s([248,255,255,255,255,255,255,255,255,255,255],t.t)
B.fc=s([250,254,252,254,255,255,255,255,255,255,255],t.t)
B.eV=s([248,254,249,253,255,255,255,255,255,255,255],t.t)
B.fO=s([B.fC,B.fc,B.eV],t.S)
B.dO=s([255,253,253,255,255,255,255,255,255,255,255],t.t)
B.j_=s([246,253,253,255,255,255,255,255,255,255,255],t.t)
B.f5=s([252,254,251,254,254,255,255,255,255,255,255],t.t)
B.iZ=s([B.dO,B.j_,B.f5],t.S)
B.jE=s([255,254,252,255,255,255,255,255,255,255,255],t.t)
B.eT=s([248,254,253,255,255,255,255,255,255,255,255],t.t)
B.ef=s([253,255,254,254,255,255,255,255,255,255,255],t.t)
B.hK=s([B.jE,B.eT,B.ef],t.S)
B.jy=s([255,251,254,255,255,255,255,255,255,255,255],t.t)
B.hj=s([245,251,254,255,255,255,255,255,255,255,255],t.t)
B.hm=s([253,253,254,255,255,255,255,255,255,255,255],t.t)
B.ex=s([B.jy,B.hj,B.hm],t.S)
B.ey=s([255,251,253,255,255,255,255,255,255,255,255],t.t)
B.fI=s([252,253,254,255,255,255,255,255,255,255,255],t.t)
B.iy=s([B.ey,B.fI,B.aD],t.S)
B.eb=s([255,252,255,255,255,255,255,255,255,255,255],t.t)
B.jv=s([249,255,254,255,255,255,255,255,255,255,255],t.t)
B.fg=s([255,255,254,255,255,255,255,255,255,255,255],t.t)
B.dn=s([B.eb,B.jv,B.fg],t.S)
B.jG=s([255,255,253,255,255,255,255,255,255,255,255],t.t)
B.eZ=s([B.jG,B.bw,B.u],t.S)
B.ee=s([B.fO,B.iZ,B.hK,B.ex,B.iy,B.dn,B.eZ,B.bR],t.o)
B.iQ=s([B.fo,B.dT,B.dR,B.ee],t.e)
B.cj=new A.aj(1,"rle8")
B.co=new A.aj(2,"rle4")
B.cp=new A.aj(4,"jpeg")
B.cq=new A.aj(5,"png")
B.cr=new A.aj(7,"reserved7")
B.cs=new A.aj(8,"reserved8")
B.ct=new A.aj(9,"reserved9")
B.ck=new A.aj(10,"reserved10")
B.cl=new A.aj(11,"cmyk")
B.cm=new A.aj(12,"cmykRle8")
B.cn=new A.aj(13,"cmykRle4")
B.ah=s([B.aP,B.cj,B.co,B.ap,B.cp,B.cq,B.aq,B.cr,B.cs,B.ct,B.ck,B.cl,B.cm,B.cn],A.a3("r<aj>"))
B.R=s([0,128,192,224,240,248,252,254,255],t.t)
B.bM=s([137,80,78,71,13,10,26,10],t.t)
B.Z=s([0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215,33554431,67108863,134217727,268435455,536870911,1073741823,2147483647,4294967295],t.t)
B.bN=s([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258],t.t)
B.j2=s([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],t.t)
B.ch=new A.cE(0,"predictor")
B.kL=new A.cE(1,"crossColor")
B.kM=new A.cE(2,"subtractGreen")
B.ci=new A.cE(3,"colorIndexing")
B.bP=s([B.ch,B.kL,B.kM,B.ci],A.a3("r<cE>"))
B.v=s([0,17,34,51,68,85,102,119,136,153,170,187,204,221,238,255],t.t)
B.jk=s([73,67,67,95,80,82,79,70,73,76,69,0],t.t)
B.bS=s([A.uo(),A.ui(),A.uy(),A.uw(),A.uq(),A.up(),A.ur()],t.B)
B.bT=s([0,4,8,12,128,132,136,140,256,260,264,268,384,388,392,396],t.t)
B.bU=s([null,A.uO(),A.uP(),A.uN()],A.a3("r<~(f,f,f,f,f,bf)?>"))
B.ai=s([0,36,72,109,145,182,218,255],t.t)
B.q=s([0,8,16,24,32,41,49,57,65,74,82,90,98,106,115,123,131,139,148,156,164,172,180,189,197,205,213,222,230,238,246,255],t.t)
B.ju=s([8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8],t.t)
B.jS=new A.bc(0,"bitmap")
B.c7=new A.bc(1,"grayscale")
B.jT=new A.bc(2,"indexed")
B.c8=new A.bc(3,"rgb")
B.c9=new A.bc(4,"cmyk")
B.jU=new A.bc(5,"multiChannel")
B.jV=new A.bc(6,"duoTone")
B.ca=new A.bc(7,"lab")
B.bV=s([B.jS,B.c7,B.jT,B.c8,B.c9,B.jU,B.jV,B.ca],A.a3("r<bc>"))
B.bW=s([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],t.t)
B.bX=s([0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],t.t)
B.dB=s([2,6,2,6],t.t)
B.ec=s([6,2,6,2],t.t)
B.dA=s([2,2,6,6],t.t)
B.dv=s([1,3,3,9],t.t)
B.dU=s([4,0,12,0],t.t)
B.dI=s([3,1,9,3],t.t)
B.ev=s([8,8,0,0],t.t)
B.dV=s([4,12,0,0],t.t)
B.dr=s([16,0,0,0],t.t)
B.dm=s([12,4,0,0],t.t)
B.ed=s([6,6,2,2],t.t)
B.dL=s([3,9,1,3],t.t)
B.dl=s([12,0,4,0],t.t)
B.ez=s([9,3,3,1],t.t)
B.m=s([B.be,B.dB,B.ay,B.ec,B.dA,B.dv,B.dU,B.dI,B.ev,B.dV,B.dr,B.dm,B.ed,B.dL,B.dl,B.ez],t.S)
B.T=s([0,-128,64,-64,32,-96,96,-32,16,-112,80,-48,48,-80,112,-16,8,-120,72,-56,40,-88,104,-24,24,-104,88,-40,56,-72,120,-8,4,-124,68,-60,36,-92,100,-28,20,-108,84,-44,52,-76,116,-12,12,-116,76,-52,44,-84,108,-20,28,-100,92,-36,60,-68,124,-4,2,-126,66,-62,34,-94,98,-30,18,-110,82,-46,50,-78,114,-14,10,-118,74,-54,42,-86,106,-22,26,-102,90,-38,58,-70,122,-6,6,-122,70,-58,38,-90,102,-26,22,-106,86,-42,54,-74,118,-10,14,-114,78,-50,46,-82,110,-18,30,-98,94,-34,62,-66,126,-2,1,-127,65,-63,33,-95,97,-31,17,-111,81,-47,49,-79,113,-15,9,-119,73,-55,41,-87,105,-23,25,-103,89,-39,57,-71,121,-7,5,-123,69,-59,37,-91,101,-27,21,-107,85,-43,53,-75,117,-11,13,-115,77,-51,45,-83,109,-19,29,-99,93,-35,61,-67,125,-3,3,-125,67,-61,35,-93,99,-29,19,-109,83,-45,51,-77,115,-13,11,-117,75,-53,43,-85,107,-21,27,-101,91,-37,59,-69,123,-5,7,-121,71,-57,39,-89,103,-25,23,-105,87,-41,55,-73,119,-9,15,-113,79,-49,47,-81,111,-17,31,-97,95,-33,63,-65,127,-1],t.t)
B.bY=new A.cb([34665,"exif",40965,"interop",34853,"gps"],A.a3("cb<f,B>"))
B.bZ=new A.cb([B.w,1,B.B,3,B.C,15,B.e,255,B.l,65535,B.K,4294967295,B.M,127,B.N,32767,B.O,2147483647,B.E,1,B.J,1,B.L,1],A.a3("cb<av,f>"))
B.a0=new A.bV(0,"invalid")
B.c4=new A.bV(1,"pbm")
B.c5=new A.bV(2,"pgm2")
B.aG=new A.bV(3,"pgm5")
B.c6=new A.bV(4,"ppm3")
B.aH=new A.bV(5,"ppm6")
B.jW=new A.a_(0,0)
B.jX=new A.a_(0,99)
B.k_=new A.aQ(0,0,0)
B.jY=new A.a_(B.k_,1/0)
B.jZ=new A.a_(!0,null)
B.al=new A.eV(0,"noCube")
B.cb=new A.eV(1,"partial")
B.aI=new A.eV(2,"occluded")
B.jL={}
B.jK=new A.dW(B.jL,[],A.a3("dW<B,C?>"))
B.k4=new A.be(null,B.al,0,B.jK)
B.aJ=new A.aZ(0,"bilevel")
B.kd=new A.aZ(1,"gray4bit")
B.ke=new A.aZ(2,"gray")
B.kf=new A.aZ(3,"grayAlpha")
B.kg=new A.aZ(4,"palette")
B.cf=new A.aZ(5,"rgb")
B.kh=new A.aZ(6,"rgba")
B.ki=new A.aZ(7,"yCbCrSub")
B.a2=new A.aZ(8,"generic")
B.kj=new A.aZ(9,"invalid")
B.kx=A.bj("uQ")
B.ky=A.bj("p5")
B.kz=A.bj("e3")
B.kA=A.bj("lB")
B.kB=A.bj("iO")
B.kC=A.bj("ef")
B.kD=A.bj("lH")
B.kE=A.bj("C")
B.kF=A.bj("ma")
B.kG=A.bj("bF")
B.kH=A.bj("qh")
B.kI=A.bj("bf")
B.kJ=new A.hW(!1)
B.kK=new A.hW(!0)
B.a3=new A.dE(0,"undefined")
B.aO=new A.dE(1,"lossy")
B.an=new A.dE(2,"lossless")
B.kN=new A.dE(3,"animated")
B.kO=new A.i8(1,1,1)})();(function staticFields(){$.k9=null
$.aS=A.k([],t.h)
$.nu=null
$.ja=0
$.lY=A.te()
$.mT=null
$.mS=null
$.ot=null
$.ok=null
$.ov=null
$.l3=null
$.lf=null
$.mz=null
$.ke=A.k([],A.a3("r<q<C>?>"))
$.dM=null
$.fv=null
$.fw=null
$.mt=!1
$.ac=B.A
$.oj=null
$.mk=null
$.mm=null
$.nI=!1
$.qW=A.k([A.mD(),A.uA(),A.uF(),A.uG(),A.uH(),A.uI(),A.uJ(),A.uK(),A.uL(),A.uM(),A.uB(),A.uC(),A.uD(),A.uE(),A.mD(),A.mD()],A.a3("r<f(f,bF,f)>"))
$.T=null
$.mZ=A.rb()})();(function lazyInitializers(){var s=hunkHelpers.lazyFinal,r=hunkHelpers.lazy
s($,"uS","oy",()=>A.os("_$dart_dartClosure"))
s($,"uR","mE",()=>A.os("_$dart_dartClosure_dartJSInterop"))
s($,"vz","oU",()=>A.k([new J.hf()],A.a3("r<eU>")))
s($,"v_","oC",()=>A.bE(A.jw({
toString:function(){return"$receiver$"}})))
s($,"v0","oD",()=>A.bE(A.jw({$method$:null,
toString:function(){return"$receiver$"}})))
s($,"v1","oE",()=>A.bE(A.jw(null)))
s($,"v2","oF",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{null.$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"v5","oI",()=>A.bE(A.jw(void 0)))
s($,"v6","oJ",()=>A.bE(function(){var $argumentsExpr$="$arguments$"
try{(void 0).$method$($argumentsExpr$)}catch(q){return q.message}}()))
s($,"v4","oH",()=>A.bE(A.nD(null)))
s($,"v3","oG",()=>A.bE(function(){try{null.$method$}catch(q){return q.message}}()))
s($,"v8","oL",()=>A.bE(A.nD(void 0)))
s($,"v7","oK",()=>A.bE(function(){try{(void 0).$method$}catch(q){return q.message}}()))
s($,"ve","mG",()=>A.r3())
s($,"vj","oQ",()=>A.eB(4096))
s($,"vh","oO",()=>new A.km().$0())
s($,"vi","oP",()=>new A.kl().$0())
s($,"vg","oN",()=>A.pM(A.k([-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-2,-2,-2,-2,-2,62,-2,62,-2,63,52,53,54,55,56,57,58,59,60,61,-2,-2,-2,-1,-2,-2,-2,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-2,-2,-2,-2,63,-2,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-2,-2,-2,-2,-2],t.t)))
s($,"vf","oM",()=>A.eB(0))
s($,"vx","io",()=>A.ij(B.kE))
s($,"uZ","mF",()=>{A.q2()
return $.ja})
s($,"uU","oA",()=>A.lD(B.ju,!1))
s($,"uT","oz",()=>A.lD(B.ig,!1))
s($,"vB","mJ",()=>{var q=null,p="ISOSpeed"
return A.aL([11,A.i("ProcessingSoftware",B.k,q),254,A.i("SubfileType",B.n,1),255,A.i("OldSubfileType",B.n,1),256,A.i("ImageWidth",B.n,1),257,A.i("ImageLength",B.n,1),258,A.i("BitsPerSample",B.j,1),259,A.i("Compression",B.j,1),262,A.i("PhotometricInterpretation",B.j,1),263,A.i("Thresholding",B.j,1),264,A.i("CellWidth",B.j,1),265,A.i("CellLength",B.j,1),266,A.i("FillOrder",B.j,1),269,A.i("DocumentName",B.k,q),270,A.i("ImageDescription",B.k,q),271,A.i("Make",B.k,q),272,A.i("Model",B.k,q),273,A.i("StripOffsets",B.n,q),274,A.i("Orientation",B.j,1),277,A.i("SamplesPerPixel",B.j,1),278,A.i("RowsPerStrip",B.n,1),279,A.i("StripByteCounts",B.n,1),280,A.i("MinSampleValue",B.j,1),281,A.i("MaxSampleValue",B.j,1),282,A.i("XResolution",B.r,1),283,A.i("YResolution",B.r,1),284,A.i("PlanarConfiguration",B.j,1),285,A.i("PageName",B.k,q),286,A.i("XPosition",B.r,1),287,A.i("YPosition",B.r,1),290,A.i("GrayResponseUnit",B.j,1),291,A.i("GrayResponseCurve",B.d,q),292,A.i("T4Options",B.d,q),293,A.i("T6Options",B.d,q),296,A.i("ResolutionUnit",B.j,1),297,A.i("PageNumber",B.j,2),300,A.i("ColorResponseUnit",B.d,q),301,A.i("TransferFunction",B.j,768),305,A.i("Software",B.k,q),306,A.i("DateTime",B.k,q),315,A.i("Artist",B.k,q),316,A.i("HostComputer",B.k,q),317,A.i("Predictor",B.j,1),318,A.i("WhitePoint",B.r,2),319,A.i("PrimaryChromaticities",B.r,6),320,A.i("ColorMap",B.j,q),321,A.i("HalftoneHints",B.j,2),322,A.i("TileWidth",B.n,1),323,A.i("TileLength",B.n,1),324,A.i("TileOffsets",B.n,q),325,A.i("TileByteCounts",B.d,q),326,A.i("BadFaxLines",B.d,q),327,A.i("CleanFaxData",B.d,q),328,A.i("ConsecutiveBadFaxLines",B.d,q),332,A.i("InkSet",B.d,q),333,A.i("InkNames",B.d,q),334,A.i("NumberofInks",B.d,q),336,A.i("DotRange",B.d,q),337,A.i("TargetPrinter",B.k,q),338,A.i("ExtraSamples",B.d,q),339,A.i("SampleFormat",B.j,1),340,A.i("SMinSampleValue",B.d,q),341,A.i("SMaxSampleValue",B.d,q),342,A.i("TransferRange",B.d,q),343,A.i("ClipPath",B.d,q),512,A.i("JPEGProc",B.d,q),513,A.i("JPEGInterchangeFormat",B.d,q),514,A.i("JPEGInterchangeFormatLength",B.d,q),529,A.i("YCbCrCoefficients",B.r,3),530,A.i("YCbCrSubSampling",B.j,1),531,A.i("YCbCrPositioning",B.j,1),532,A.i("ReferenceBlackWhite",B.r,6),700,A.i("ApplicationNotes",B.j,1),18246,A.i("Rating",B.j,1),33421,A.i("CFARepeatPatternDim",B.d,q),33422,A.i("CFAPattern",B.d,q),33423,A.i("BatteryLevel",B.d,q),33432,A.i("Copyright",B.k,q),33434,A.i("ExposureTime",B.r,1),33437,A.i("FNumber",B.r,q),33723,A.i("IPTC-NAA",B.n,1),34665,A.i("ExifOffset",B.d,q),34675,A.i("InterColorProfile",B.d,q),34850,A.i("ExposureProgram",B.j,1),34852,A.i("SpectralSensitivity",B.k,q),34853,A.i("GPSOffset",B.d,q),34855,A.i(p,B.n,1),34856,A.i("OECF",B.d,q),34864,A.i("SensitivityType",B.j,1),34866,A.i("RecommendedExposureIndex",B.n,1),34867,A.i(p,B.n,1),36864,A.i("ExifVersion",B.F,q),36867,A.i("DateTimeOriginal",B.k,q),36868,A.i("DateTimeDigitized",B.k,q),36880,A.i("OffsetTime",B.k,q),36881,A.i("OffsetTimeOriginal",B.k,q),36882,A.i("OffsetTimeDigitized",B.k,q),37121,A.i("ComponentsConfiguration",B.F,q),37122,A.i("CompressedBitsPerPixel",B.d,q),37377,A.i("ShutterSpeedValue",B.d,q),37378,A.i("ApertureValue",B.d,q),37379,A.i("BrightnessValue",B.d,q),37380,A.i("ExposureBiasValue",B.d,q),37381,A.i("MaxApertureValue",B.d,q),37382,A.i("SubjectDistance",B.d,q),37383,A.i("MeteringMode",B.d,q),37384,A.i("LightSource",B.d,q),37385,A.i("Flash",B.d,q),37386,A.i("FocalLength",B.d,q),37396,A.i("SubjectArea",B.d,q),37500,A.i("MakerNote",B.F,q),37510,A.i("UserComment",B.F,q),37520,A.i("SubSecTime",B.d,q),37521,A.i("SubSecTimeOriginal",B.d,q),37522,A.i("SubSecTimeDigitized",B.d,q),40091,A.i("XPTitle",B.d,q),40092,A.i("XPComment",B.d,q),40093,A.i("XPAuthor",B.d,q),40094,A.i("XPKeywords",B.d,q),40095,A.i("XPSubject",B.d,q),40960,A.i("FlashPixVersion",B.d,q),40961,A.i("ColorSpace",B.j,1),40962,A.i("ExifImageWidth",B.j,1),40963,A.i("ExifImageLength",B.j,1),40964,A.i("RelatedSoundFile",B.d,q),40965,A.i("InteroperabilityOffset",B.d,q),41483,A.i("FlashEnergy",B.d,q),41484,A.i("SpatialFrequencyResponse",B.d,q),41486,A.i("FocalPlaneXResolution",B.d,q),41487,A.i("FocalPlaneYResolution",B.d,q),41488,A.i("FocalPlaneResolutionUnit",B.d,q),41492,A.i("SubjectLocation",B.d,q),41493,A.i("ExposureIndex",B.d,q),41495,A.i("SensingMethod",B.d,q),41728,A.i("FileSource",B.d,q),41729,A.i("SceneType",B.d,q),41730,A.i("CVAPattern",B.d,q),41985,A.i("CustomRendered",B.d,q),41986,A.i("ExposureMode",B.d,q),41987,A.i("WhiteBalance",B.d,q),41988,A.i("DigitalZoomRatio",B.d,q),41989,A.i("FocalLengthIn35mmFilm",B.d,q),41990,A.i("SceneCaptureType",B.d,q),41991,A.i("GainControl",B.d,q),41992,A.i("Contrast",B.d,q),41993,A.i("Saturation",B.d,q),41994,A.i("Sharpness",B.d,q),41995,A.i("DeviceSettingDescription",B.d,q),41996,A.i("SubjectDistanceRange",B.d,q),42016,A.i("ImageUniqueID",B.d,q),42032,A.i("CameraOwnerName",B.k,q),42033,A.i("BodySerialNumber",B.k,q),42034,A.i("LensSpecification",B.d,q),42035,A.i("LensMake",B.k,q),42036,A.i("LensModel",B.k,q),42037,A.i("LensSerialNumber",B.k,q),42240,A.i("Gamma",B.r,1),50341,A.i("PrintIM",B.d,q),59932,A.i("Padding",B.d,q),59933,A.i("OffsetSchema",B.d,q),65e3,A.i("OwnerName",B.k,q),65001,A.i("SerialNumber",B.k,q)],t.p,A.a3("fP"))})
s($,"uV","ik",()=>A.pS(A.k([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63,63],t.t)))
r($,"v9","il",()=>A.eB(511))
r($,"va","lr",()=>A.eB(511))
r($,"vc","ls",()=>A.nq(2041))
r($,"vd","lt",()=>A.nq(225))
r($,"vb","aI",()=>A.eB(766))
s($,"uX","oB",()=>A.nb(0,0,0))
s($,"vv","at",()=>A.eB(1))
s($,"vw","aF",()=>A.pz(B.f.gA($.at()),0,null))
s($,"vo","as",()=>A.pO(1))
s($,"vp","aE",()=>J.oW(B.a_.gA($.as()),0,null))
s($,"vq","O",()=>A.pQ(1))
s($,"vs","a9",()=>J.oX(B.p.gA($.O()),0,null))
s($,"vr","c2",()=>A.pr(B.p.gA($.O())))
s($,"vm","im",()=>A.pK(1))
s($,"vn","lu",()=>A.nE(B.U.gA($.im()),0))
s($,"vk","mH",()=>A.pG(1))
s($,"vl","oR",()=>A.nE(B.aj.gA($.mH()),0))
s($,"vt","mI",()=>A.qg(1))
s($,"vu","oS",()=>{var q=$.mI()
return A.ps(q.gA(q))})
s($,"vy","oT",()=>{var q,p,o=A.k([],t.n)
for(q=0;q<256;++q){p=q/255
o.push(p<=0.04045?p/12.92:A.u3((p+0.055)/1.055,2.4))}return A.pH(o)})})();(function nativeSupport(){!function(){var s=function(a){var m={}
m[a]=1
return Object.keys(hunkHelpers.convertToFastObject(m))[0]}
v.getIsolateTag=function(a){return s("___dart_"+a+v.isolateTag)}
var r="___dart_isolate_tags_"
var q=Object[r]||(Object[r]=Object.create(null))
var p="_ZxYxX"
for(var o=0;;o++){var n=s(p+"_"+o+"_")
if(!(n in q)){q[n]=1
v.isolateTag=n
break}}v.dispatchPropertyName=v.getIsolateTag("dispatch_record")}()
hunkHelpers.setOrUpdateInterceptorsByTag({ArrayBuffer:A.cl,SharedArrayBuffer:A.cl,ArrayBufferView:A.ex,DataView:A.ht,Float32Array:A.es,Float64Array:A.et,Int16Array:A.eu,Int32Array:A.ev,Int8Array:A.ew,Uint16Array:A.ey,Uint32Array:A.ez,Uint8ClampedArray:A.eA,CanvasPixelArray:A.eA,Uint8Array:A.cm})
hunkHelpers.setOrUpdateLeafTags({ArrayBuffer:true,SharedArrayBuffer:true,ArrayBufferView:false,DataView:true,Float32Array:true,Float64Array:true,Int16Array:true,Int32Array:true,Int8Array:true,Uint16Array:true,Uint32Array:true,Uint8ClampedArray:true,CanvasPixelArray:true,Uint8Array:false})
A.ag.$nativeSuperclassTag="ArrayBufferView"
A.fh.$nativeSuperclassTag="ArrayBufferView"
A.fi.$nativeSuperclassTag="ArrayBufferView"
A.bT.$nativeSuperclassTag="ArrayBufferView"
A.fj.$nativeSuperclassTag="ArrayBufferView"
A.fk.$nativeSuperclassTag="ArrayBufferView"
A.aN.$nativeSuperclassTag="ArrayBufferView"})()
Function.prototype.$1=function(a){return this(a)}
Function.prototype.$2=function(a,b){return this(a,b)}
Function.prototype.$0=function(){return this()}
Function.prototype.$2$0=function(){return this()}
Function.prototype.$5=function(a,b,c,d,e){return this(a,b,c,d,e)}
Function.prototype.$3=function(a,b,c){return this(a,b,c)}
Function.prototype.$4=function(a,b,c,d){return this(a,b,c,d)}
Function.prototype.$1$2=function(a,b){return this(a,b)}
Function.prototype.$6=function(a,b,c,d,e,f){return this(a,b,c,d,e,f)}
convertAllToFastObject(w)
convertToFastObject($);(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!="undefined"){a(document.currentScript)
return}var s=document.scripts
function onLoad(b){for(var q=0;q<s.length;++q){s[q].removeEventListener("load",onLoad,false)}a(b.target)}for(var r=0;r<s.length;++r){s[r].addEventListener("load",onLoad,false)}})(function(a){v.currentScript=a
var s=A.u0
if(typeof dartMainRunner==="function"){dartMainRunner(s,[])}else{s([])}})})()
//# sourceMappingURL=rubik_scan_worker.js.map
