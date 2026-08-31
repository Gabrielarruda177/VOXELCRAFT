(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const Ya=new Set;function qp(t=document){t.addEventListener("keydown",e=>{Ya.add(e.code)}),t.addEventListener("keyup",e=>{Ya.delete(e.code)}),t.addEventListener("contextmenu",e=>{document.pointerLockElement&&e.preventDefault()}),window.addEventListener("blur",()=>{Ya.clear()})}function ti(t){return Ya.has(t)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uf="170",Yp=0,gu=1,$p=2,sh=1,Zp=2,bi=3,dr=0,dn=1,Vn=2,or=0,ks=1,vu=2,xu=3,Eu=4,jp=5,Dr=100,Qp=101,Jp=102,e0=103,t0=104,n0=200,i0=201,r0=202,s0=203,Lc=204,Pc=205,o0=206,a0=207,l0=208,c0=209,f0=210,u0=211,d0=212,h0=213,p0=214,Uc=0,Fc=1,Bc=2,Ys=3,Gc=4,Hc=5,zc=6,Wc=7,Ff=0,m0=1,_0=2,ar=0,g0=1,v0=2,x0=3,E0=4,S0=5,M0=6,y0=7,oh=300,$s=301,Zs=302,kc=303,Vc=304,yl=306,Xc=1e3,Hr=1001,Kc=1002,en=1003,T0=1004,ha=1005,di=1006,Ll=1007,zr=1008,Gi=1009,ah=1010,lh=1011,Qo=1012,Bf=1013,fs=1014,Li=1015,ra=1016,Gf=1017,Hf=1018,js=1020,ch=35902,fh=1021,uh=1022,Yn=1023,dh=1024,hh=1025,Vs=1026,Qs=1027,ph=1028,zf=1029,mh=1030,Wf=1031,kf=1033,$a=33776,Za=33777,ja=33778,Qa=33779,qc=35840,Yc=35841,$c=35842,Zc=35843,jc=36196,Qc=37492,Jc=37496,ef=37808,tf=37809,nf=37810,rf=37811,sf=37812,of=37813,af=37814,lf=37815,cf=37816,ff=37817,uf=37818,df=37819,hf=37820,pf=37821,Ja=36492,mf=36494,_f=36495,_h=36283,gf=36284,vf=36285,xf=36286,A0=3200,b0=3201,Vf=0,R0=1,rr="",xn="srgb",so="srgb-linear",Tl="linear",ot="srgb",hs=7680,Su=519,w0=512,O0=513,C0=514,gh=515,D0=516,I0=517,N0=518,L0=519,Mu=35044,yu="300 es",Pi=2e3,sl=2001;class oo{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,l=r.length;s<l;s++)r[s].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Tu=1234567;const Xs=Math.PI/180,Jo=180/Math.PI;function ao(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[t&255]+zt[t>>8&255]+zt[t>>16&255]+zt[t>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[n&63|128]+zt[n>>8&255]+"-"+zt[n>>16&255]+zt[n>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Qt(t,e,n){return Math.max(e,Math.min(n,t))}function Xf(t,e){return(t%e+e)%e}function P0(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function U0(t,e,n){return t!==e?(n-t)/(e-t):0}function Fo(t,e,n){return(1-n)*t+n*e}function F0(t,e,n,i){return Fo(t,e,1-Math.exp(-n*i))}function B0(t,e=1){return e-Math.abs(Xf(t,e*2)-e)}function G0(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function H0(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function z0(t,e){return t+Math.floor(Math.random()*(e-t+1))}function W0(t,e){return t+Math.random()*(e-t)}function k0(t){return t*(.5-Math.random())}function V0(t){t!==void 0&&(Tu=t);let e=Tu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function X0(t){return t*Xs}function K0(t){return t*Jo}function q0(t){return(t&t-1)===0&&t!==0}function Y0(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function $0(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function Z0(t,e,n,i,r){const s=Math.cos,l=Math.sin,a=s(n/2),c=l(n/2),f=s((e+i)/2),d=l((e+i)/2),p=s((e-i)/2),u=l((e-i)/2),h=s((i-e)/2),m=l((i-e)/2);switch(r){case"XYX":t.set(a*d,c*p,c*u,a*f);break;case"YZY":t.set(c*u,a*d,c*p,a*f);break;case"ZXZ":t.set(c*p,c*u,a*d,a*f);break;case"XZX":t.set(a*d,c*m,c*h,a*f);break;case"YXY":t.set(c*h,a*d,c*m,a*f);break;case"ZYZ":t.set(c*m,c*h,a*d,a*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Cs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function qt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const el={DEG2RAD:Xs,RAD2DEG:Jo,generateUUID:ao,clamp:Qt,euclideanModulo:Xf,mapLinear:P0,inverseLerp:U0,lerp:Fo,damp:F0,pingpong:B0,smoothstep:G0,smootherstep:H0,randInt:z0,randFloat:W0,randFloatSpread:k0,seededRandom:V0,degToRad:X0,radToDeg:K0,isPowerOfTwo:q0,ceilPowerOfTwo:Y0,floorPowerOfTwo:$0,setQuaternionFromProperEuler:Z0,normalize:qt,denormalize:Cs};class Ye{constructor(e=0,n=0){Ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,l=this.y-e.y;return this.x=s*i-l*r+e.x,this.y=s*r+l*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,n,i,r,s,l,a,c,f){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,l,a,c,f)}set(e,n,i,r,s,l,a,c,f){const d=this.elements;return d[0]=e,d[1]=r,d[2]=a,d[3]=n,d[4]=s,d[5]=c,d[6]=i,d[7]=l,d[8]=f,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,l=i[0],a=i[3],c=i[6],f=i[1],d=i[4],p=i[7],u=i[2],h=i[5],m=i[8],v=r[0],g=r[3],_=r[6],y=r[1],x=r[4],S=r[7],I=r[2],R=r[5],w=r[8];return s[0]=l*v+a*y+c*I,s[3]=l*g+a*x+c*R,s[6]=l*_+a*S+c*w,s[1]=f*v+d*y+p*I,s[4]=f*g+d*x+p*R,s[7]=f*_+d*S+p*w,s[2]=u*v+h*y+m*I,s[5]=u*g+h*x+m*R,s[8]=u*_+h*S+m*w,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],l=e[4],a=e[5],c=e[6],f=e[7],d=e[8];return n*l*d-n*a*f-i*s*d+i*a*c+r*s*f-r*l*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],l=e[4],a=e[5],c=e[6],f=e[7],d=e[8],p=d*l-a*f,u=a*c-d*s,h=f*s-l*c,m=n*p+i*u+r*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=p*v,e[1]=(r*f-d*i)*v,e[2]=(a*i-r*l)*v,e[3]=u*v,e[4]=(d*n-r*c)*v,e[5]=(r*s-a*n)*v,e[6]=h*v,e[7]=(i*c-f*n)*v,e[8]=(l*n-i*s)*v,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,l,a){const c=Math.cos(s),f=Math.sin(s);return this.set(i*c,i*f,-i*(c*l+f*a)+l+e,-r*f,r*c,-r*(-f*l+c*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Pl.makeScale(e,n)),this}rotate(e){return this.premultiply(Pl.makeRotation(-e)),this}translate(e,n){return this.premultiply(Pl.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pl=new ze;function vh(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ol(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function j0(){const t=ol("canvas");return t.style.display="block",t}const Au={};function Oo(t){t in Au||(Au[t]=!0,console.warn(t))}function Q0(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function J0(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function em(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const et={enabled:!0,workingColorSpace:so,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===ot&&(t.r=Bi(t.r),t.g=Bi(t.g),t.b=Bi(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===ot&&(t.r=Ks(t.r),t.g=Ks(t.g),t.b=Ks(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===rr?Tl:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function Bi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Ks(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}const bu=[.64,.33,.3,.6,.15,.06],Ru=[.2126,.7152,.0722],wu=[.3127,.329],Ou=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cu=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);et.define({[so]:{primaries:bu,whitePoint:wu,transfer:Tl,toXYZ:Ou,fromXYZ:Cu,luminanceCoefficients:Ru,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:bu,whitePoint:wu,transfer:ot,toXYZ:Ou,fromXYZ:Cu,luminanceCoefficients:Ru,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}});let ps;class tm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ps===void 0&&(ps=ol("canvas")),ps.width=e.width,ps.height=e.height;const i=ps.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ps}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ol("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let l=0;l<s.length;l++)s[l]=Bi(s[l]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Bi(n[i]/255)*255):n[i]=Bi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let nm=0;class xh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=ao(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let l=0,a=r.length;l<a;l++)r[l].isDataTexture?s.push(Ul(r[l].image)):s.push(Ul(r[l]))}else s=Ul(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Ul(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?tm.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let im=0;class tn extends oo{constructor(e=tn.DEFAULT_IMAGE,n=tn.DEFAULT_MAPPING,i=Hr,r=Hr,s=di,l=zr,a=Yn,c=Gi,f=tn.DEFAULT_ANISOTROPY,d=rr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=ao(),this.name="",this.source=new xh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=l,this.anisotropy=f,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==oh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xc:e.x=e.x-Math.floor(e.x);break;case Hr:e.x=e.x<0?0:1;break;case Kc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xc:e.y=e.y-Math.floor(e.y);break;case Hr:e.y=e.y<0?0:1;break;case Kc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=oh;tn.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,n=0,i=0,r=1){at.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,l=e.elements;return this.x=l[0]*n+l[4]*i+l[8]*r+l[12]*s,this.y=l[1]*n+l[5]*i+l[9]*r+l[13]*s,this.z=l[2]*n+l[6]*i+l[10]*r+l[14]*s,this.w=l[3]*n+l[7]*i+l[11]*r+l[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,f=c[0],d=c[4],p=c[8],u=c[1],h=c[5],m=c[9],v=c[2],g=c[6],_=c[10];if(Math.abs(d-u)<.01&&Math.abs(p-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+v)<.1&&Math.abs(m+g)<.1&&Math.abs(f+h+_-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const x=(f+1)/2,S=(h+1)/2,I=(_+1)/2,R=(d+u)/4,w=(p+v)/4,D=(m+g)/4;return x>S&&x>I?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=R/i,s=w/i):S>I?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=R/r,s=D/r):I<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),i=w/s,r=D/s),this.set(i,r,s,n),this}let y=Math.sqrt((g-m)*(g-m)+(p-v)*(p-v)+(u-d)*(u-d));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(p-v)/y,this.z=(u-d)/y,this.w=Math.acos((f+h+_-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rm extends oo{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new at(0,0,e,n),this.scissorTest=!1,this.viewport=new at(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new tn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const l=i.count;for(let a=0;a<l;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new xh(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends rm{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Eh extends tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Hr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class sm extends tn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Hr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sa{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,l,a){let c=i[r+0],f=i[r+1],d=i[r+2],p=i[r+3];const u=s[l+0],h=s[l+1],m=s[l+2],v=s[l+3];if(a===0){e[n+0]=c,e[n+1]=f,e[n+2]=d,e[n+3]=p;return}if(a===1){e[n+0]=u,e[n+1]=h,e[n+2]=m,e[n+3]=v;return}if(p!==v||c!==u||f!==h||d!==m){let g=1-a;const _=c*u+f*h+d*m+p*v,y=_>=0?1:-1,x=1-_*_;if(x>Number.EPSILON){const I=Math.sqrt(x),R=Math.atan2(I,_*y);g=Math.sin(g*R)/I,a=Math.sin(a*R)/I}const S=a*y;if(c=c*g+u*S,f=f*g+h*S,d=d*g+m*S,p=p*g+v*S,g===1-a){const I=1/Math.sqrt(c*c+f*f+d*d+p*p);c*=I,f*=I,d*=I,p*=I}}e[n]=c,e[n+1]=f,e[n+2]=d,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,r,s,l){const a=i[r],c=i[r+1],f=i[r+2],d=i[r+3],p=s[l],u=s[l+1],h=s[l+2],m=s[l+3];return e[n]=a*m+d*p+c*h-f*u,e[n+1]=c*m+d*u+f*p-a*h,e[n+2]=f*m+d*h+a*u-c*p,e[n+3]=d*m-a*p-c*u-f*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,l=e._order,a=Math.cos,c=Math.sin,f=a(i/2),d=a(r/2),p=a(s/2),u=c(i/2),h=c(r/2),m=c(s/2);switch(l){case"XYZ":this._x=u*d*p+f*h*m,this._y=f*h*p-u*d*m,this._z=f*d*m+u*h*p,this._w=f*d*p-u*h*m;break;case"YXZ":this._x=u*d*p+f*h*m,this._y=f*h*p-u*d*m,this._z=f*d*m-u*h*p,this._w=f*d*p+u*h*m;break;case"ZXY":this._x=u*d*p-f*h*m,this._y=f*h*p+u*d*m,this._z=f*d*m+u*h*p,this._w=f*d*p-u*h*m;break;case"ZYX":this._x=u*d*p-f*h*m,this._y=f*h*p+u*d*m,this._z=f*d*m-u*h*p,this._w=f*d*p+u*h*m;break;case"YZX":this._x=u*d*p+f*h*m,this._y=f*h*p+u*d*m,this._z=f*d*m-u*h*p,this._w=f*d*p-u*h*m;break;case"XZY":this._x=u*d*p-f*h*m,this._y=f*h*p-u*d*m,this._z=f*d*m+u*h*p,this._w=f*d*p+u*h*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],l=n[1],a=n[5],c=n[9],f=n[2],d=n[6],p=n[10],u=i+a+p;if(u>0){const h=.5/Math.sqrt(u+1);this._w=.25/h,this._x=(d-c)*h,this._y=(s-f)*h,this._z=(l-r)*h}else if(i>a&&i>p){const h=2*Math.sqrt(1+i-a-p);this._w=(d-c)/h,this._x=.25*h,this._y=(r+l)/h,this._z=(s+f)/h}else if(a>p){const h=2*Math.sqrt(1+a-i-p);this._w=(s-f)/h,this._x=(r+l)/h,this._y=.25*h,this._z=(c+d)/h}else{const h=2*Math.sqrt(1+p-i-a);this._w=(l-r)/h,this._x=(s+f)/h,this._y=(c+d)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,l=e._w,a=n._x,c=n._y,f=n._z,d=n._w;return this._x=i*d+l*a+r*f-s*c,this._y=r*d+l*c+s*a-i*f,this._z=s*d+l*f+i*c-r*a,this._w=l*d-i*a-r*c-s*f,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,l=this._w;let a=l*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=l,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const h=1-n;return this._w=h*l+n*this._w,this._x=h*i+n*this._x,this._y=h*r+n*this._y,this._z=h*s+n*this._z,this.normalize(),this}const f=Math.sqrt(c),d=Math.atan2(f,a),p=Math.sin((1-n)*d)/f,u=Math.sin(n*d)/f;return this._w=l*p+this._w*u,this._x=i*p+this._x*u,this._y=r*p+this._y*u,this._z=s*p+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,n=0,i=0){C.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Du.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Du.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,l=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*l,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*l,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*l,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,l=e.y,a=e.z,c=e.w,f=2*(l*r-a*i),d=2*(a*n-s*r),p=2*(s*i-l*n);return this.x=n+c*f+l*p-a*d,this.y=i+c*d+a*f-s*p,this.z=r+c*p+s*d-l*f,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,l=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*l-i*c,this.z=i*a-r*l,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Fl.copy(this).projectOnVector(e),this.sub(Fl)}reflect(e){return this.sub(Fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fl=new C,Du=new sa;class oa{constructor(e=new C(1/0,1/0,1/0),n=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Nn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Nn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Nn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let l=0,a=s.count;l<a;l++)e.isMesh===!0?e.getVertexPosition(l,Nn):Nn.fromBufferAttribute(s,l),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pa.copy(i.boundingBox)),pa.applyMatrix4(e.matrixWorld),this.union(pa)}const r=e.children;for(let s=0,l=r.length;s<l;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(go),ma.subVectors(this.max,go),ms.subVectors(e.a,go),_s.subVectors(e.b,go),gs.subVectors(e.c,go),Wi.subVectors(_s,ms),ki.subVectors(gs,_s),vr.subVectors(ms,gs);let n=[0,-Wi.z,Wi.y,0,-ki.z,ki.y,0,-vr.z,vr.y,Wi.z,0,-Wi.x,ki.z,0,-ki.x,vr.z,0,-vr.x,-Wi.y,Wi.x,0,-ki.y,ki.x,0,-vr.y,vr.x,0];return!Bl(n,ms,_s,gs,ma)||(n=[1,0,0,0,1,0,0,0,1],!Bl(n,ms,_s,gs,ma))?!1:(_a.crossVectors(Wi,ki),n=[_a.x,_a.y,_a.z],Bl(n,ms,_s,gs,ma))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Si=[new C,new C,new C,new C,new C,new C,new C,new C],Nn=new C,pa=new oa,ms=new C,_s=new C,gs=new C,Wi=new C,ki=new C,vr=new C,go=new C,ma=new C,_a=new C,xr=new C;function Bl(t,e,n,i,r){for(let s=0,l=t.length-3;s<=l;s+=3){xr.fromArray(t,s);const a=r.x*Math.abs(xr.x)+r.y*Math.abs(xr.y)+r.z*Math.abs(xr.z),c=e.dot(xr),f=n.dot(xr),d=i.dot(xr);if(Math.max(-Math.max(c,f,d),Math.min(c,f,d))>a)return!1}return!0}const om=new oa,vo=new C,Gl=new C;class aa{constructor(e=new C,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):om.setFromPoints(e).getCenter(i);let r=0;for(let s=0,l=e.length;s<l;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vo.subVectors(e,this.center);const n=vo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(vo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vo.copy(e.center).add(Gl)),this.expandByPoint(vo.copy(e.center).sub(Gl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mi=new C,Hl=new C,ga=new C,Vi=new C,zl=new C,va=new C,Wl=new C;class Kf{constructor(e=new C,n=new C(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Mi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,n),Mi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Hl.copy(e).add(n).multiplyScalar(.5),ga.copy(n).sub(e).normalize(),Vi.copy(this.origin).sub(Hl);const s=e.distanceTo(n)*.5,l=-this.direction.dot(ga),a=Vi.dot(this.direction),c=-Vi.dot(ga),f=Vi.lengthSq(),d=Math.abs(1-l*l);let p,u,h,m;if(d>0)if(p=l*c-a,u=l*a-c,m=s*d,p>=0)if(u>=-m)if(u<=m){const v=1/d;p*=v,u*=v,h=p*(p+l*u+2*a)+u*(l*p+u+2*c)+f}else u=s,p=Math.max(0,-(l*u+a)),h=-p*p+u*(u+2*c)+f;else u=-s,p=Math.max(0,-(l*u+a)),h=-p*p+u*(u+2*c)+f;else u<=-m?(p=Math.max(0,-(-l*s+a)),u=p>0?-s:Math.min(Math.max(-s,-c),s),h=-p*p+u*(u+2*c)+f):u<=m?(p=0,u=Math.min(Math.max(-s,-c),s),h=u*(u+2*c)+f):(p=Math.max(0,-(l*s+a)),u=p>0?s:Math.min(Math.max(-s,-c),s),h=-p*p+u*(u+2*c)+f);else u=l>0?-s:s,p=Math.max(0,-(l*u+a)),h=-p*p+u*(u+2*c)+f;return i&&i.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(Hl).addScaledVector(ga,u),h}intersectSphere(e,n){Mi.subVectors(e.center,this.origin);const i=Mi.dot(this.direction),r=Mi.dot(Mi)-i*i,s=e.radius*e.radius;if(r>s)return null;const l=Math.sqrt(s-r),a=i-l,c=i+l;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,l,a,c;const f=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return f>=0?(i=(e.min.x-u.x)*f,r=(e.max.x-u.x)*f):(i=(e.max.x-u.x)*f,r=(e.min.x-u.x)*f),d>=0?(s=(e.min.y-u.y)*d,l=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,l=(e.min.y-u.y)*d),i>l||s>r||((s>i||isNaN(i))&&(i=s),(l<r||isNaN(r))&&(r=l),p>=0?(a=(e.min.z-u.z)*p,c=(e.max.z-u.z)*p):(a=(e.max.z-u.z)*p,c=(e.min.z-u.z)*p),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,n,i,r,s){zl.subVectors(n,e),va.subVectors(i,e),Wl.crossVectors(zl,va);let l=this.direction.dot(Wl),a;if(l>0){if(r)return null;a=1}else if(l<0)a=-1,l=-l;else return null;Vi.subVectors(this.origin,e);const c=a*this.direction.dot(va.crossVectors(Vi,va));if(c<0)return null;const f=a*this.direction.dot(zl.cross(Vi));if(f<0||c+f>l)return null;const d=-a*Vi.dot(Wl);return d<0?null:this.at(d/l,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,n,i,r,s,l,a,c,f,d,p,u,h,m,v,g){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,l,a,c,f,d,p,u,h,m,v,g)}set(e,n,i,r,s,l,a,c,f,d,p,u,h,m,v,g){const _=this.elements;return _[0]=e,_[4]=n,_[8]=i,_[12]=r,_[1]=s,_[5]=l,_[9]=a,_[13]=c,_[2]=f,_[6]=d,_[10]=p,_[14]=u,_[3]=h,_[7]=m,_[11]=v,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/vs.setFromMatrixColumn(e,0).length(),s=1/vs.setFromMatrixColumn(e,1).length(),l=1/vs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*l,n[9]=i[9]*l,n[10]=i[10]*l,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,l=Math.cos(i),a=Math.sin(i),c=Math.cos(r),f=Math.sin(r),d=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const u=l*d,h=l*p,m=a*d,v=a*p;n[0]=c*d,n[4]=-c*p,n[8]=f,n[1]=h+m*f,n[5]=u-v*f,n[9]=-a*c,n[2]=v-u*f,n[6]=m+h*f,n[10]=l*c}else if(e.order==="YXZ"){const u=c*d,h=c*p,m=f*d,v=f*p;n[0]=u+v*a,n[4]=m*a-h,n[8]=l*f,n[1]=l*p,n[5]=l*d,n[9]=-a,n[2]=h*a-m,n[6]=v+u*a,n[10]=l*c}else if(e.order==="ZXY"){const u=c*d,h=c*p,m=f*d,v=f*p;n[0]=u-v*a,n[4]=-l*p,n[8]=m+h*a,n[1]=h+m*a,n[5]=l*d,n[9]=v-u*a,n[2]=-l*f,n[6]=a,n[10]=l*c}else if(e.order==="ZYX"){const u=l*d,h=l*p,m=a*d,v=a*p;n[0]=c*d,n[4]=m*f-h,n[8]=u*f+v,n[1]=c*p,n[5]=v*f+u,n[9]=h*f-m,n[2]=-f,n[6]=a*c,n[10]=l*c}else if(e.order==="YZX"){const u=l*c,h=l*f,m=a*c,v=a*f;n[0]=c*d,n[4]=v-u*p,n[8]=m*p+h,n[1]=p,n[5]=l*d,n[9]=-a*d,n[2]=-f*d,n[6]=h*p+m,n[10]=u-v*p}else if(e.order==="XZY"){const u=l*c,h=l*f,m=a*c,v=a*f;n[0]=c*d,n[4]=-p,n[8]=f*d,n[1]=u*p+v,n[5]=l*d,n[9]=h*p-m,n[2]=m*p-h,n[6]=a*d,n[10]=v*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(am,e,lm)}lookAt(e,n,i){const r=this.elements;return mn.subVectors(e,n),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Xi.crossVectors(i,mn),Xi.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Xi.crossVectors(i,mn)),Xi.normalize(),xa.crossVectors(mn,Xi),r[0]=Xi.x,r[4]=xa.x,r[8]=mn.x,r[1]=Xi.y,r[5]=xa.y,r[9]=mn.y,r[2]=Xi.z,r[6]=xa.z,r[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,l=i[0],a=i[4],c=i[8],f=i[12],d=i[1],p=i[5],u=i[9],h=i[13],m=i[2],v=i[6],g=i[10],_=i[14],y=i[3],x=i[7],S=i[11],I=i[15],R=r[0],w=r[4],D=r[8],A=r[12],M=r[1],O=r[5],H=r[9],F=r[13],Y=r[2],q=r[6],K=r[10],J=r[14],V=r[3],se=r[7],ae=r[11],ve=r[15];return s[0]=l*R+a*M+c*Y+f*V,s[4]=l*w+a*O+c*q+f*se,s[8]=l*D+a*H+c*K+f*ae,s[12]=l*A+a*F+c*J+f*ve,s[1]=d*R+p*M+u*Y+h*V,s[5]=d*w+p*O+u*q+h*se,s[9]=d*D+p*H+u*K+h*ae,s[13]=d*A+p*F+u*J+h*ve,s[2]=m*R+v*M+g*Y+_*V,s[6]=m*w+v*O+g*q+_*se,s[10]=m*D+v*H+g*K+_*ae,s[14]=m*A+v*F+g*J+_*ve,s[3]=y*R+x*M+S*Y+I*V,s[7]=y*w+x*O+S*q+I*se,s[11]=y*D+x*H+S*K+I*ae,s[15]=y*A+x*F+S*J+I*ve,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],l=e[1],a=e[5],c=e[9],f=e[13],d=e[2],p=e[6],u=e[10],h=e[14],m=e[3],v=e[7],g=e[11],_=e[15];return m*(+s*c*p-r*f*p-s*a*u+i*f*u+r*a*h-i*c*h)+v*(+n*c*h-n*f*u+s*l*u-r*l*h+r*f*d-s*c*d)+g*(+n*f*p-n*a*h-s*l*p+i*l*h+s*a*d-i*f*d)+_*(-r*a*d-n*c*p+n*a*u+r*l*p-i*l*u+i*c*d)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],l=e[4],a=e[5],c=e[6],f=e[7],d=e[8],p=e[9],u=e[10],h=e[11],m=e[12],v=e[13],g=e[14],_=e[15],y=p*g*f-v*u*f+v*c*h-a*g*h-p*c*_+a*u*_,x=m*u*f-d*g*f-m*c*h+l*g*h+d*c*_-l*u*_,S=d*v*f-m*p*f+m*a*h-l*v*h-d*a*_+l*p*_,I=m*p*c-d*v*c-m*a*u+l*v*u+d*a*g-l*p*g,R=n*y+i*x+r*S+s*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/R;return e[0]=y*w,e[1]=(v*u*s-p*g*s-v*r*h+i*g*h+p*r*_-i*u*_)*w,e[2]=(a*g*s-v*c*s+v*r*f-i*g*f-a*r*_+i*c*_)*w,e[3]=(p*c*s-a*u*s-p*r*f+i*u*f+a*r*h-i*c*h)*w,e[4]=x*w,e[5]=(d*g*s-m*u*s+m*r*h-n*g*h-d*r*_+n*u*_)*w,e[6]=(m*c*s-l*g*s-m*r*f+n*g*f+l*r*_-n*c*_)*w,e[7]=(l*u*s-d*c*s+d*r*f-n*u*f-l*r*h+n*c*h)*w,e[8]=S*w,e[9]=(m*p*s-d*v*s-m*i*h+n*v*h+d*i*_-n*p*_)*w,e[10]=(l*v*s-m*a*s+m*i*f-n*v*f-l*i*_+n*a*_)*w,e[11]=(d*a*s-l*p*s-d*i*f+n*p*f+l*i*h-n*a*h)*w,e[12]=I*w,e[13]=(d*v*r-m*p*r+m*i*u-n*v*u-d*i*g+n*p*g)*w,e[14]=(m*a*r-l*v*r-m*i*c+n*v*c+l*i*g-n*a*g)*w,e[15]=(l*p*r-d*a*r+d*i*c-n*p*c-l*i*u+n*a*u)*w,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,l=e.x,a=e.y,c=e.z,f=s*l,d=s*a;return this.set(f*l+i,f*a-r*c,f*c+r*a,0,f*a+r*c,d*a+i,d*c-r*l,0,f*c-r*a,d*c+r*l,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,l){return this.set(1,i,s,0,e,1,l,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,l=n._y,a=n._z,c=n._w,f=s+s,d=l+l,p=a+a,u=s*f,h=s*d,m=s*p,v=l*d,g=l*p,_=a*p,y=c*f,x=c*d,S=c*p,I=i.x,R=i.y,w=i.z;return r[0]=(1-(v+_))*I,r[1]=(h+S)*I,r[2]=(m-x)*I,r[3]=0,r[4]=(h-S)*R,r[5]=(1-(u+_))*R,r[6]=(g+y)*R,r[7]=0,r[8]=(m+x)*w,r[9]=(g-y)*w,r[10]=(1-(u+v))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=vs.set(r[0],r[1],r[2]).length();const l=vs.set(r[4],r[5],r[6]).length(),a=vs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Ln.copy(this);const f=1/s,d=1/l,p=1/a;return Ln.elements[0]*=f,Ln.elements[1]*=f,Ln.elements[2]*=f,Ln.elements[4]*=d,Ln.elements[5]*=d,Ln.elements[6]*=d,Ln.elements[8]*=p,Ln.elements[9]*=p,Ln.elements[10]*=p,n.setFromRotationMatrix(Ln),i.x=s,i.y=l,i.z=a,this}makePerspective(e,n,i,r,s,l,a=Pi){const c=this.elements,f=2*s/(n-e),d=2*s/(i-r),p=(n+e)/(n-e),u=(i+r)/(i-r);let h,m;if(a===Pi)h=-(l+s)/(l-s),m=-2*l*s/(l-s);else if(a===sl)h=-l/(l-s),m=-l*s/(l-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=f,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=h,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,l,a=Pi){const c=this.elements,f=1/(n-e),d=1/(i-r),p=1/(l-s),u=(n+e)*f,h=(i+r)*d;let m,v;if(a===Pi)m=(l+s)*p,v=-2*p;else if(a===sl)m=s*p,v=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*f,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*d,c[9]=0,c[13]=-h,c[2]=0,c[6]=0,c[10]=v,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const vs=new C,Ln=new gt,am=new C(0,0,0),lm=new C(1,1,1),Xi=new C,xa=new C,mn=new C,Iu=new gt,Nu=new sa;class jn{constructor(e=0,n=0,i=0,r=jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],l=r[4],a=r[8],c=r[1],f=r[5],d=r[9],p=r[2],u=r[6],h=r[10];switch(n){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,h),this._z=Math.atan2(-l,s)):(this._x=Math.atan2(u,f),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(c,f)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,h),this._z=Math.atan2(-l,f)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Qt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,h),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-l,f));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,f),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(u,f),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-d,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Iu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Iu,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Nu.setFromEuler(this),this.setFromQuaternion(Nu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}jn.DEFAULT_ORDER="XYZ";class Sh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let cm=0;const Lu=new C,xs=new sa,yi=new gt,Ea=new C,xo=new C,fm=new C,um=new sa,Pu=new C(1,0,0),Uu=new C(0,1,0),Fu=new C(0,0,1),Bu={type:"added"},dm={type:"removed"},Es={type:"childadded",child:null},kl={type:"childremoved",child:null};class wt extends oo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=ao(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new C,n=new jn,i=new sa,r=new C(1,1,1);function s(){i.setFromEuler(n,!1)}function l(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new gt},normalMatrix:{value:new ze}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return xs.setFromAxisAngle(e,n),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,n){return xs.setFromAxisAngle(e,n),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Pu,e)}rotateY(e){return this.rotateOnAxis(Uu,e)}rotateZ(e){return this.rotateOnAxis(Fu,e)}translateOnAxis(e,n){return Lu.copy(e).applyQuaternion(this.quaternion),this.position.add(Lu.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Pu,e)}translateY(e){return this.translateOnAxis(Uu,e)}translateZ(e){return this.translateOnAxis(Fu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ea.copy(e):Ea.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),xo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(xo,Ea,this.up):yi.lookAt(Ea,xo,this.up),this.quaternion.setFromRotationMatrix(yi),r&&(yi.extractRotation(r.matrixWorld),xs.setFromRotationMatrix(yi),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bu),Es.child=e,this.dispatchEvent(Es),Es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(dm),kl.child=e,this.dispatchEvent(kl),kl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bu),Es.child=e,this.dispatchEvent(Es),Es.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const l=this.children[i].getObjectByProperty(e,n);if(l!==void 0)return l}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,l=r.length;s<l;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,e,fm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xo,um,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,l=r.length;s<l;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let f=0,d=c.length;f<d;f++){const p=c[f];s(e.shapes,p)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,f=this.material.length;c<f;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(n){const a=l(e.geometries),c=l(e.materials),f=l(e.textures),d=l(e.images),p=l(e.shapes),u=l(e.skeletons),h=l(e.animations),m=l(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),f.length>0&&(i.textures=f),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=r,i;function l(a){const c=[];for(const f in a){const d=a[f];delete d.metadata,c.push(d)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}wt.DEFAULT_UP=new C(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new C,Ti=new C,Vl=new C,Ai=new C,Ss=new C,Ms=new C,Gu=new C,Xl=new C,Kl=new C,ql=new C,Yl=new at,$l=new at,Zl=new at;class wn{constructor(e=new C,n=new C,i=new C){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Pn.subVectors(e,n),r.cross(Pn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Pn.subVectors(r,n),Ti.subVectors(i,n),Vl.subVectors(e,n);const l=Pn.dot(Pn),a=Pn.dot(Ti),c=Pn.dot(Vl),f=Ti.dot(Ti),d=Ti.dot(Vl),p=l*f-a*a;if(p===0)return s.set(0,0,0),null;const u=1/p,h=(f*c-a*d)*u,m=(l*d-a*c)*u;return s.set(1-h-m,m,h)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(e,n,i,r,s,l,a,c){return this.getBarycoord(e,n,i,r,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ai.x),c.addScaledVector(l,Ai.y),c.addScaledVector(a,Ai.z),c)}static getInterpolatedAttribute(e,n,i,r,s,l){return Yl.setScalar(0),$l.setScalar(0),Zl.setScalar(0),Yl.fromBufferAttribute(e,n),$l.fromBufferAttribute(e,i),Zl.fromBufferAttribute(e,r),l.setScalar(0),l.addScaledVector(Yl,s.x),l.addScaledVector($l,s.y),l.addScaledVector(Zl,s.z),l}static isFrontFacing(e,n,i,r){return Pn.subVectors(i,n),Ti.subVectors(e,n),Pn.cross(Ti).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),Pn.cross(Ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return wn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return wn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let l,a;Ss.subVectors(r,i),Ms.subVectors(s,i),Xl.subVectors(e,i);const c=Ss.dot(Xl),f=Ms.dot(Xl);if(c<=0&&f<=0)return n.copy(i);Kl.subVectors(e,r);const d=Ss.dot(Kl),p=Ms.dot(Kl);if(d>=0&&p<=d)return n.copy(r);const u=c*p-d*f;if(u<=0&&c>=0&&d<=0)return l=c/(c-d),n.copy(i).addScaledVector(Ss,l);ql.subVectors(e,s);const h=Ss.dot(ql),m=Ms.dot(ql);if(m>=0&&h<=m)return n.copy(s);const v=h*f-c*m;if(v<=0&&f>=0&&m<=0)return a=f/(f-m),n.copy(i).addScaledVector(Ms,a);const g=d*m-h*p;if(g<=0&&p-d>=0&&h-m>=0)return Gu.subVectors(s,r),a=(p-d)/(p-d+(h-m)),n.copy(r).addScaledVector(Gu,a);const _=1/(g+v+u);return l=v*_,a=u*_,n.copy(i).addScaledVector(Ss,l).addScaledVector(Ms,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Sa={h:0,s:0,l:0};function jl(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class we{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=xn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=et.workingColorSpace){return this.r=e,this.g=n,this.b=i,et.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=et.workingColorSpace){if(e=Xf(e,1),n=Qt(n,0,1),i=Qt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,l=2*i-s;this.r=jl(l,s,e+1/3),this.g=jl(l,s,e),this.b=jl(l,s,e-1/3)}return et.toWorkingColorSpace(this,r),this}setStyle(e,n=xn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const l=r[1],a=r[2];switch(l){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],l=s.length;if(l===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(l===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=xn){const i=Mh[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=Ks(e.r),this.g=Ks(e.g),this.b=Ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xn){return et.fromWorkingColorSpace(Wt.copy(this),e),Math.round(Qt(Wt.r*255,0,255))*65536+Math.round(Qt(Wt.g*255,0,255))*256+Math.round(Qt(Wt.b*255,0,255))}getHexString(e=xn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=et.workingColorSpace){et.fromWorkingColorSpace(Wt.copy(this),n);const i=Wt.r,r=Wt.g,s=Wt.b,l=Math.max(i,r,s),a=Math.min(i,r,s);let c,f;const d=(a+l)/2;if(a===l)c=0,f=0;else{const p=l-a;switch(f=d<=.5?p/(l+a):p/(2-l-a),l){case i:c=(r-s)/p+(r<s?6:0);break;case r:c=(s-i)/p+2;break;case s:c=(i-r)/p+4;break}c/=6}return e.h=c,e.s=f,e.l=d,e}getRGB(e,n=et.workingColorSpace){return et.fromWorkingColorSpace(Wt.copy(this),n),e.r=Wt.r,e.g=Wt.g,e.b=Wt.b,e}getStyle(e=xn){et.fromWorkingColorSpace(Wt.copy(this),e);const n=Wt.r,i=Wt.g,r=Wt.b;return e!==xn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ki),this.setHSL(Ki.h+e,Ki.s+n,Ki.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ki),e.getHSL(Sa);const i=Fo(Ki.h,Sa.h,n),r=Fo(Ki.s,Sa.s,n),s=Fo(Ki.l,Sa.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Wt=new we;we.NAMES=Mh;let hm=0;class mr extends oo{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=ao(),this.name="",this.blending=ks,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lc,this.blendDst=Pc,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Su,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==dr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Lc&&(i.blendSrc=this.blendSrc),this.blendDst!==Pc&&(i.blendDst=this.blendDst),this.blendEquation!==Dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Su&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const l=[];for(const a in s){const c=s[a];delete c.metadata,l.push(c)}return l}if(n){const s=r(e.textures),l=r(e.images);s.length>0&&(i.textures=s),l.length>0&&(i.images=l)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class On extends mr{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Ff,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new C,Ma=new Ye;class Zn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Mu,this.updateRanges=[],this.gpuType=Li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ma.fromBufferAttribute(this,n),Ma.applyMatrix3(e),this.setXY(n,Ma.x,Ma.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix3(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyMatrix4(e),this.setXYZ(n,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.applyNormalMatrix(e),this.setXYZ(n,At.x,At.y,At.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)At.fromBufferAttribute(this,n),At.transformDirection(e),this.setXYZ(n,At.x,At.y,At.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Cs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=qt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Cs(n,this.array)),n}setX(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Cs(n,this.array)),n}setY(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Cs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Cs(n,this.array)),n}setW(e,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array),r=qt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=qt(n,this.array),i=qt(i,this.array),r=qt(r,this.array),s=qt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Mu&&(e.usage=this.usage),e}}class yh extends Zn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Th extends Zn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Ot extends Zn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let pm=0;const bn=new gt,Ql=new wt,ys=new C,_n=new oa,Eo=new oa,It=new C;class hn extends oo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=ao(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vh(e)?Th:yh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,n,i){return bn.makeTranslation(e,n,i),this.applyMatrix4(bn),this}scale(e,n,i){return bn.makeScale(e,n,i),this.applyMatrix4(bn),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const l=e[r];i.push(l.x,l.y,l.z||0)}this.setAttribute("position",new Ot(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=e[i];n.setXYZ(i,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oa);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];_n.setFromBufferAttribute(s),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new aa);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(e){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),n)for(let s=0,l=n.length;s<l;s++){const a=n[s];Eo.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(_n.min,Eo.min),_n.expandByPoint(It),It.addVectors(_n.max,Eo.max),_n.expandByPoint(It)):(_n.expandByPoint(Eo.min),_n.expandByPoint(Eo.max))}_n.getCenter(i);let r=0;for(let s=0,l=e.count;s<l;s++)It.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(It));if(n)for(let s=0,l=n.length;s<l;s++){const a=n[s],c=this.morphTargetsRelative;for(let f=0,d=a.count;f<d;f++)It.fromBufferAttribute(a,f),c&&(ys.fromBufferAttribute(e,f),It.add(ys)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zn(new Float32Array(4*i.count),4));const l=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<i.count;D++)a[D]=new C,c[D]=new C;const f=new C,d=new C,p=new C,u=new Ye,h=new Ye,m=new Ye,v=new C,g=new C;function _(D,A,M){f.fromBufferAttribute(i,D),d.fromBufferAttribute(i,A),p.fromBufferAttribute(i,M),u.fromBufferAttribute(s,D),h.fromBufferAttribute(s,A),m.fromBufferAttribute(s,M),d.sub(f),p.sub(f),h.sub(u),m.sub(u);const O=1/(h.x*m.y-m.x*h.y);isFinite(O)&&(v.copy(d).multiplyScalar(m.y).addScaledVector(p,-h.y).multiplyScalar(O),g.copy(p).multiplyScalar(h.x).addScaledVector(d,-m.x).multiplyScalar(O),a[D].add(v),a[A].add(v),a[M].add(v),c[D].add(g),c[A].add(g),c[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let D=0,A=y.length;D<A;++D){const M=y[D],O=M.start,H=M.count;for(let F=O,Y=O+H;F<Y;F+=3)_(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const x=new C,S=new C,I=new C,R=new C;function w(D){I.fromBufferAttribute(r,D),R.copy(I);const A=a[D];x.copy(A),x.sub(I.multiplyScalar(I.dot(A))).normalize(),S.crossVectors(R,A);const O=S.dot(c[D])<0?-1:1;l.setXYZW(D,x.x,x.y,x.z,O)}for(let D=0,A=y.length;D<A;++D){const M=y[D],O=M.start,H=M.count;for(let F=O,Y=O+H;F<Y;F+=3)w(e.getX(F+0)),w(e.getX(F+1)),w(e.getX(F+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Zn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,h=i.count;u<h;u++)i.setXYZ(u,0,0,0);const r=new C,s=new C,l=new C,a=new C,c=new C,f=new C,d=new C,p=new C;if(e)for(let u=0,h=e.count;u<h;u+=3){const m=e.getX(u+0),v=e.getX(u+1),g=e.getX(u+2);r.fromBufferAttribute(n,m),s.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),d.subVectors(l,s),p.subVectors(r,s),d.cross(p),a.fromBufferAttribute(i,m),c.fromBufferAttribute(i,v),f.fromBufferAttribute(i,g),a.add(d),c.add(d),f.add(d),i.setXYZ(m,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(g,f.x,f.y,f.z)}else for(let u=0,h=n.count;u<h;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),l.fromBufferAttribute(n,u+2),d.subVectors(l,s),p.subVectors(r,s),d.cross(p),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)It.fromBufferAttribute(e,n),It.normalize(),e.setXYZ(n,It.x,It.y,It.z)}toNonIndexed(){function e(a,c){const f=a.array,d=a.itemSize,p=a.normalized,u=new f.constructor(c.length*d);let h=0,m=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?h=c[v]*a.data.stride+a.offset:h=c[v]*d;for(let _=0;_<d;_++)u[m++]=f[h++]}return new Zn(u,d,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new hn,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],f=e(c,i);n.setAttribute(a,f)}const s=this.morphAttributes;for(const a in s){const c=[],f=s[a];for(let d=0,p=f.length;d<p;d++){const u=f[d],h=e(u,i);c.push(h)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let a=0,c=l.length;a<c;a++){const f=l[a];n.addGroup(f.start,f.count,f.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const f in c)c[f]!==void 0&&(e[f]=c[f]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const f=i[c];e.data.attributes[c]=f.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const f=this.morphAttributes[c],d=[];for(let p=0,u=f.length;p<u;p++){const h=f[p];d.push(h.toJSON(e.data))}d.length>0&&(r[c]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const f in r){const d=r[f];this.setAttribute(f,d.clone(n))}const s=e.morphAttributes;for(const f in s){const d=[],p=s[f];for(let u=0,h=p.length;u<h;u++)d.push(p[u].clone(n));this.morphAttributes[f]=d}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let f=0,d=l.length;f<d;f++){const p=l[f];this.addGroup(p.start,p.count,p.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hu=new gt,Er=new Kf,ya=new aa,zu=new C,Ta=new C,Aa=new C,ba=new C,Jl=new C,Ra=new C,Wu=new C,wa=new C;class B extends wt{constructor(e=new hn,n=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,l=r.length;s<l;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,l=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ra.set(0,0,0);for(let c=0,f=s.length;c<f;c++){const d=a[c],p=s[c];d!==0&&(Jl.fromBufferAttribute(p,e),l?Ra.addScaledVector(Jl,d):Ra.addScaledVector(Jl.sub(n),d))}n.add(Ra)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ya.copy(i.boundingSphere),ya.applyMatrix4(s),Er.copy(e.ray).recast(e.near),!(ya.containsPoint(Er.origin)===!1&&(Er.intersectSphere(ya,zu)===null||Er.origin.distanceToSquared(zu)>(e.far-e.near)**2))&&(Hu.copy(s).invert(),Er.copy(e.ray).applyMatrix4(Hu),!(i.boundingBox!==null&&Er.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Er)))}_computeIntersections(e,n,i){let r;const s=this.geometry,l=this.material,a=s.index,c=s.attributes.position,f=s.attributes.uv,d=s.attributes.uv1,p=s.attributes.normal,u=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(l))for(let m=0,v=u.length;m<v;m++){const g=u[m],_=l[g.materialIndex],y=Math.max(g.start,h.start),x=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let S=y,I=x;S<I;S+=3){const R=a.getX(S),w=a.getX(S+1),D=a.getX(S+2);r=Oa(this,_,e,i,f,d,p,R,w,D),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,h.start),v=Math.min(a.count,h.start+h.count);for(let g=m,_=v;g<_;g+=3){const y=a.getX(g),x=a.getX(g+1),S=a.getX(g+2);r=Oa(this,l,e,i,f,d,p,y,x,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(l))for(let m=0,v=u.length;m<v;m++){const g=u[m],_=l[g.materialIndex],y=Math.max(g.start,h.start),x=Math.min(c.count,Math.min(g.start+g.count,h.start+h.count));for(let S=y,I=x;S<I;S+=3){const R=S,w=S+1,D=S+2;r=Oa(this,_,e,i,f,d,p,R,w,D),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const m=Math.max(0,h.start),v=Math.min(c.count,h.start+h.count);for(let g=m,_=v;g<_;g+=3){const y=g,x=g+1,S=g+2;r=Oa(this,l,e,i,f,d,p,y,x,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function mm(t,e,n,i,r,s,l,a){let c;if(e.side===dn?c=i.intersectTriangle(l,s,r,!0,a):c=i.intersectTriangle(r,s,l,e.side===dr,a),c===null)return null;wa.copy(a),wa.applyMatrix4(t.matrixWorld);const f=n.ray.origin.distanceTo(wa);return f<n.near||f>n.far?null:{distance:f,point:wa.clone(),object:t}}function Oa(t,e,n,i,r,s,l,a,c,f){t.getVertexPosition(a,Ta),t.getVertexPosition(c,Aa),t.getVertexPosition(f,ba);const d=mm(t,e,n,i,Ta,Aa,ba,Wu);if(d){const p=new C;wn.getBarycoord(Wu,Ta,Aa,ba,p),r&&(d.uv=wn.getInterpolatedAttribute(r,a,c,f,p,new Ye)),s&&(d.uv1=wn.getInterpolatedAttribute(s,a,c,f,p,new Ye)),l&&(d.normal=wn.getInterpolatedAttribute(l,a,c,f,p,new C),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a,b:c,c:f,normal:new C,materialIndex:0};wn.getNormal(Ta,Aa,ba,u.normal),d.face=u,d.barycoord=p}return d}class k extends hn{constructor(e=1,n=1,i=1,r=1,s=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:l};const a=this;r=Math.floor(r),s=Math.floor(s),l=Math.floor(l);const c=[],f=[],d=[],p=[];let u=0,h=0;m("z","y","x",-1,-1,i,n,e,l,s,0),m("z","y","x",1,-1,i,n,-e,l,s,1),m("x","z","y",1,1,e,i,n,r,l,2),m("x","z","y",1,-1,e,i,-n,r,l,3),m("x","y","z",1,-1,e,n,i,r,s,4),m("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Ot(f,3)),this.setAttribute("normal",new Ot(d,3)),this.setAttribute("uv",new Ot(p,2));function m(v,g,_,y,x,S,I,R,w,D,A){const M=S/w,O=I/D,H=S/2,F=I/2,Y=R/2,q=w+1,K=D+1;let J=0,V=0;const se=new C;for(let ae=0;ae<K;ae++){const ve=ae*O-F;for(let Fe=0;Fe<q;Fe++){const nt=Fe*M-H;se[v]=nt*y,se[g]=ve*x,se[_]=Y,f.push(se.x,se.y,se.z),se[v]=0,se[g]=0,se[_]=R>0?1:-1,d.push(se.x,se.y,se.z),p.push(Fe/w),p.push(1-ae/D),J+=1}}for(let ae=0;ae<D;ae++)for(let ve=0;ve<w;ve++){const Fe=u+ve+q*ae,nt=u+ve+q*(ae+1),$=u+(ve+1)+q*(ae+1),ie=u+(ve+1)+q*ae;c.push(Fe,nt,ie),c.push(nt,$,ie),V+=6}a.addGroup(h,V,A),h+=V,u+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new k(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Js(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Yt(t){const e={};for(let n=0;n<t.length;n++){const i=Js(t[n]);for(const r in i)e[r]=i[r]}return e}function _m(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ah(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const gm={clone:Js,merge:Yt};var vm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hr extends mr{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vm,this.fragmentShader=xm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=_m(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const l=this.uniforms[r].value;l&&l.isTexture?n.uniforms[r]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?n.uniforms[r]={type:"c",value:l.getHex()}:l&&l.isVector2?n.uniforms[r]={type:"v2",value:l.toArray()}:l&&l.isVector3?n.uniforms[r]={type:"v3",value:l.toArray()}:l&&l.isVector4?n.uniforms[r]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?n.uniforms[r]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?n.uniforms[r]={type:"m4",value:l.toArray()}:n.uniforms[r]={value:l}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class bh extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=Pi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qi=new C,ku=new Ye,Vu=new Ye;class an extends bh{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Jo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jo*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,n){return this.getViewBounds(e,ku,Vu),n.subVectors(Vu,ku)}setViewOffset(e,n,i,r,s,l){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Xs*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const l=this.view;if(this.view!==null&&this.view.enabled){const c=l.fullWidth,f=l.fullHeight;s+=l.offsetX*r/c,n-=l.offsetY*i/f,r*=l.width/c,i*=l.height/f}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ts=-90,As=1;class Em extends wt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Ts,As,e,n);r.layers=this.layers,this.add(r);const s=new an(Ts,As,e,n);s.layers=this.layers,this.add(s);const l=new an(Ts,As,e,n);l.layers=this.layers,this.add(l);const a=new an(Ts,As,e,n);a.layers=this.layers,this.add(a);const c=new an(Ts,As,e,n);c.layers=this.layers,this.add(c);const f=new an(Ts,As,e,n);f.layers=this.layers,this.add(f)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,l,a,c]=n;for(const f of n)this.remove(f);if(e===Pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===sl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const f of n)this.add(f),f.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,l,a,c,f,d]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,l),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,c),e.setRenderTarget(i,4,r),e.render(n,f),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(n,d),e.setRenderTarget(p,u,h),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Rh extends tn{constructor(e,n,i,r,s,l,a,c,f,d){e=e!==void 0?e:[],n=n!==void 0?n:$s,super(e,n,i,r,s,l,a,c,f,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Sm extends us{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Rh(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:di}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new k(5,5,5),s=new hr({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:or});s.uniforms.tEquirect.value=n;const l=new B(r,s),a=n.minFilter;return n.minFilter===zr&&(n.minFilter=di),new Em(1,10,this).update(e,l),n.minFilter=a,l.geometry.dispose(),l.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(n,i,r);e.setRenderTarget(s)}}const ec=new C,Mm=new C,ym=new ze;class br{constructor(e=new C(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=ec.subVectors(i,n).cross(Mm.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(ec),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||ym.getNormalMatrix(e),r=this.coplanarPoint(ec).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sr=new aa,Ca=new C;class qf{constructor(e=new br,n=new br,i=new br,r=new br,s=new br,l=new br){this.planes=[e,n,i,r,s,l]}set(e,n,i,r,s,l){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(l),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Pi){const i=this.planes,r=e.elements,s=r[0],l=r[1],a=r[2],c=r[3],f=r[4],d=r[5],p=r[6],u=r[7],h=r[8],m=r[9],v=r[10],g=r[11],_=r[12],y=r[13],x=r[14],S=r[15];if(i[0].setComponents(c-s,u-f,g-h,S-_).normalize(),i[1].setComponents(c+s,u+f,g+h,S+_).normalize(),i[2].setComponents(c+l,u+d,g+m,S+y).normalize(),i[3].setComponents(c-l,u-d,g-m,S-y).normalize(),i[4].setComponents(c-a,u-p,g-v,S-x).normalize(),n===Pi)i[5].setComponents(c+a,u+p,g+v,S+x).normalize();else if(n===sl)i[5].setComponents(a,p,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sr)}intersectsSprite(e){return Sr.center.set(0,0,0),Sr.radius=.7071067811865476,Sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ca.x=r.normal.x>0?e.max.x:e.min.x,Ca.y=r.normal.y>0?e.max.y:e.min.y,Ca.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wh(){let t=null,e=!1,n=null,i=null;function r(s,l){n(s,l),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Tm(t){const e=new WeakMap;function n(a,c){const f=a.array,d=a.usage,p=f.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,f,d),a.onUploadCallback();let h;if(f instanceof Float32Array)h=t.FLOAT;else if(f instanceof Uint16Array)a.isFloat16BufferAttribute?h=t.HALF_FLOAT:h=t.UNSIGNED_SHORT;else if(f instanceof Int16Array)h=t.SHORT;else if(f instanceof Uint32Array)h=t.UNSIGNED_INT;else if(f instanceof Int32Array)h=t.INT;else if(f instanceof Int8Array)h=t.BYTE;else if(f instanceof Uint8Array)h=t.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)h=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:u,type:h,bytesPerElement:f.BYTES_PER_ELEMENT,version:a.version,size:p}}function i(a,c,f){const d=c.array,p=c.updateRanges;if(t.bindBuffer(f,a),p.length===0)t.bufferSubData(f,0,d);else{p.sort((h,m)=>h.start-m.start);let u=0;for(let h=1;h<p.length;h++){const m=p[u],v=p[h];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,p[u]=v)}p.length=u+1;for(let h=0,m=p.length;h<m;h++){const v=p[h];t.bufferSubData(f,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(t.deleteBuffer(c.buffer),e.delete(a))}function l(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const f=e.get(a);if(f===void 0)e.set(a,n(a,c));else if(f.version<a.version){if(f.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(f.buffer,a,c),f.version=a.version}}return{get:r,remove:s,update:l}}class Al extends hn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,l=n/2,a=Math.floor(i),c=Math.floor(r),f=a+1,d=c+1,p=e/a,u=n/c,h=[],m=[],v=[],g=[];for(let _=0;_<d;_++){const y=_*u-l;for(let x=0;x<f;x++){const S=x*p-s;m.push(S,-y,0),v.push(0,0,1),g.push(x/a),g.push(1-_/c)}}for(let _=0;_<c;_++)for(let y=0;y<a;y++){const x=y+f*_,S=y+f*(_+1),I=y+1+f*(_+1),R=y+1+f*_;h.push(x,S,R),h.push(S,I,R)}this.setIndex(h),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(v,3)),this.setAttribute("uv",new Ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Al(e.width,e.height,e.widthSegments,e.heightSegments)}}var Am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Om=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Nm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Lm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Um=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Km=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ym=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$m=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Qm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,e_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,t_="gl_FragColor = linearToOutputTexel( gl_FragColor );",n_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,r_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,s_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,o_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,a_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,l_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,c_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,f_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,h_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,__=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,g_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,v_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,S_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,M_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,y_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,T_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,A_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,b_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,R_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,w_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,O_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,D_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,I_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,N_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,L_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,P_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,U_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,F_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,G_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,z_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,k_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,V_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,K_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,q_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Y_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Z_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Q_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,J_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,eg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ng=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ig=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,og=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ag=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ug=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,dg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Tg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ag=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Og=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Dg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ig=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ng=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ug=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,kg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Kg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$g=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ev=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,iv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:Am,alphahash_pars_fragment:bm,alphamap_fragment:Rm,alphamap_pars_fragment:wm,alphatest_fragment:Om,alphatest_pars_fragment:Cm,aomap_fragment:Dm,aomap_pars_fragment:Im,batching_pars_vertex:Nm,batching_vertex:Lm,begin_vertex:Pm,beginnormal_vertex:Um,bsdfs:Fm,iridescence_fragment:Bm,bumpmap_pars_fragment:Gm,clipping_planes_fragment:Hm,clipping_planes_pars_fragment:zm,clipping_planes_pars_vertex:Wm,clipping_planes_vertex:km,color_fragment:Vm,color_pars_fragment:Xm,color_pars_vertex:Km,color_vertex:qm,common:Ym,cube_uv_reflection_fragment:$m,defaultnormal_vertex:Zm,displacementmap_pars_vertex:jm,displacementmap_vertex:Qm,emissivemap_fragment:Jm,emissivemap_pars_fragment:e_,colorspace_fragment:t_,colorspace_pars_fragment:n_,envmap_fragment:i_,envmap_common_pars_fragment:r_,envmap_pars_fragment:s_,envmap_pars_vertex:o_,envmap_physical_pars_fragment:g_,envmap_vertex:a_,fog_vertex:l_,fog_pars_vertex:c_,fog_fragment:f_,fog_pars_fragment:u_,gradientmap_pars_fragment:d_,lightmap_pars_fragment:h_,lights_lambert_fragment:p_,lights_lambert_pars_fragment:m_,lights_pars_begin:__,lights_toon_fragment:v_,lights_toon_pars_fragment:x_,lights_phong_fragment:E_,lights_phong_pars_fragment:S_,lights_physical_fragment:M_,lights_physical_pars_fragment:y_,lights_fragment_begin:T_,lights_fragment_maps:A_,lights_fragment_end:b_,logdepthbuf_fragment:R_,logdepthbuf_pars_fragment:w_,logdepthbuf_pars_vertex:O_,logdepthbuf_vertex:C_,map_fragment:D_,map_pars_fragment:I_,map_particle_fragment:N_,map_particle_pars_fragment:L_,metalnessmap_fragment:P_,metalnessmap_pars_fragment:U_,morphinstance_vertex:F_,morphcolor_vertex:B_,morphnormal_vertex:G_,morphtarget_pars_vertex:H_,morphtarget_vertex:z_,normal_fragment_begin:W_,normal_fragment_maps:k_,normal_pars_fragment:V_,normal_pars_vertex:X_,normal_vertex:K_,normalmap_pars_fragment:q_,clearcoat_normal_fragment_begin:Y_,clearcoat_normal_fragment_maps:$_,clearcoat_pars_fragment:Z_,iridescence_pars_fragment:j_,opaque_fragment:Q_,packing:J_,premultiplied_alpha_fragment:eg,project_vertex:tg,dithering_fragment:ng,dithering_pars_fragment:ig,roughnessmap_fragment:rg,roughnessmap_pars_fragment:sg,shadowmap_pars_fragment:og,shadowmap_pars_vertex:ag,shadowmap_vertex:lg,shadowmask_pars_fragment:cg,skinbase_vertex:fg,skinning_pars_vertex:ug,skinning_vertex:dg,skinnormal_vertex:hg,specularmap_fragment:pg,specularmap_pars_fragment:mg,tonemapping_fragment:_g,tonemapping_pars_fragment:gg,transmission_fragment:vg,transmission_pars_fragment:xg,uv_pars_fragment:Eg,uv_pars_vertex:Sg,uv_vertex:Mg,worldpos_vertex:yg,background_vert:Tg,background_frag:Ag,backgroundCube_vert:bg,backgroundCube_frag:Rg,cube_vert:wg,cube_frag:Og,depth_vert:Cg,depth_frag:Dg,distanceRGBA_vert:Ig,distanceRGBA_frag:Ng,equirect_vert:Lg,equirect_frag:Pg,linedashed_vert:Ug,linedashed_frag:Fg,meshbasic_vert:Bg,meshbasic_frag:Gg,meshlambert_vert:Hg,meshlambert_frag:zg,meshmatcap_vert:Wg,meshmatcap_frag:kg,meshnormal_vert:Vg,meshnormal_frag:Xg,meshphong_vert:Kg,meshphong_frag:qg,meshphysical_vert:Yg,meshphysical_frag:$g,meshtoon_vert:Zg,meshtoon_frag:jg,points_vert:Qg,points_frag:Jg,shadow_vert:ev,shadow_frag:tv,sprite_vert:nv,sprite_frag:iv},oe={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},oi={basic:{uniforms:Yt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Yt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new we(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Yt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Yt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Yt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new we(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Yt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Yt([oe.points,oe.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Yt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Yt([oe.common,oe.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Yt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Yt([oe.sprite,oe.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Yt([oe.common,oe.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Yt([oe.lights,oe.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};oi.physical={uniforms:Yt([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const Da={r:0,b:0,g:0},Mr=new jn,rv=new gt;function sv(t,e,n,i,r,s,l){const a=new we(0);let c=s===!0?0:1,f,d,p=null,u=0,h=null;function m(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?n:e).get(x)),x}function v(y){let x=!1;const S=m(y);S===null?_(a,c):S&&S.isColor&&(_(S,1),x=!0);const I=t.xr.getEnvironmentBlendMode();I==="additive"?i.buffers.color.setClear(0,0,0,1,l):I==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,l),(t.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(y,x){const S=m(x);S&&(S.isCubeTexture||S.mapping===yl)?(d===void 0&&(d=new B(new k(1,1,1),new hr({name:"BackgroundCubeMaterial",uniforms:Js(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),Mr.copy(x.backgroundRotation),Mr.x*=-1,Mr.y*=-1,Mr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Mr.y*=-1,Mr.z*=-1),d.material.uniforms.envMap.value=S,d.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(rv.makeRotationFromEuler(Mr)),d.material.toneMapped=et.getTransfer(S.colorSpace)!==ot,(p!==S||u!==S.version||h!==t.toneMapping)&&(d.material.needsUpdate=!0,p=S,u=S.version,h=t.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null)):S&&S.isTexture&&(f===void 0&&(f=new B(new Al(2,2),new hr({name:"BackgroundMaterial",uniforms:Js(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),Object.defineProperty(f.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(f)),f.material.uniforms.t2D.value=S,f.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,f.material.toneMapped=et.getTransfer(S.colorSpace)!==ot,S.matrixAutoUpdate===!0&&S.updateMatrix(),f.material.uniforms.uvTransform.value.copy(S.matrix),(p!==S||u!==S.version||h!==t.toneMapping)&&(f.material.needsUpdate=!0,p=S,u=S.version,h=t.toneMapping),f.layers.enableAll(),y.unshift(f,f.geometry,f.material,0,0,null))}function _(y,x){y.getRGB(Da,Ah(t)),i.buffers.color.setClear(Da.r,Da.g,Da.b,x,l)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,_(a,c)},render:v,addToRenderList:g}}function ov(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,l=!1;function a(M,O,H,F,Y){let q=!1;const K=p(F,H,O);s!==K&&(s=K,f(s.object)),q=h(M,F,H,Y),q&&m(M,F,H,Y),Y!==null&&e.update(Y,t.ELEMENT_ARRAY_BUFFER),(q||l)&&(l=!1,S(M,O,H,F),Y!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function c(){return t.createVertexArray()}function f(M){return t.bindVertexArray(M)}function d(M){return t.deleteVertexArray(M)}function p(M,O,H){const F=H.wireframe===!0;let Y=i[M.id];Y===void 0&&(Y={},i[M.id]=Y);let q=Y[O.id];q===void 0&&(q={},Y[O.id]=q);let K=q[F];return K===void 0&&(K=u(c()),q[F]=K),K}function u(M){const O=[],H=[],F=[];for(let Y=0;Y<n;Y++)O[Y]=0,H[Y]=0,F[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:F,object:M,attributes:{},index:null}}function h(M,O,H,F){const Y=s.attributes,q=O.attributes;let K=0;const J=H.getAttributes();for(const V in J)if(J[V].location>=0){const ae=Y[V];let ve=q[V];if(ve===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor)),ae===void 0||ae.attribute!==ve||ve&&ae.data!==ve.data)return!0;K++}return s.attributesNum!==K||s.index!==F}function m(M,O,H,F){const Y={},q=O.attributes;let K=0;const J=H.getAttributes();for(const V in J)if(J[V].location>=0){let ae=q[V];ae===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor));const ve={};ve.attribute=ae,ae&&ae.data&&(ve.data=ae.data),Y[V]=ve,K++}s.attributes=Y,s.attributesNum=K,s.index=F}function v(){const M=s.newAttributes;for(let O=0,H=M.length;O<H;O++)M[O]=0}function g(M){_(M,0)}function _(M,O){const H=s.newAttributes,F=s.enabledAttributes,Y=s.attributeDivisors;H[M]=1,F[M]===0&&(t.enableVertexAttribArray(M),F[M]=1),Y[M]!==O&&(t.vertexAttribDivisor(M,O),Y[M]=O)}function y(){const M=s.newAttributes,O=s.enabledAttributes;for(let H=0,F=O.length;H<F;H++)O[H]!==M[H]&&(t.disableVertexAttribArray(H),O[H]=0)}function x(M,O,H,F,Y,q,K){K===!0?t.vertexAttribIPointer(M,O,H,Y,q):t.vertexAttribPointer(M,O,H,F,Y,q)}function S(M,O,H,F){v();const Y=F.attributes,q=H.getAttributes(),K=O.defaultAttributeValues;for(const J in q){const V=q[J];if(V.location>=0){let se=Y[J];if(se===void 0&&(J==="instanceMatrix"&&M.instanceMatrix&&(se=M.instanceMatrix),J==="instanceColor"&&M.instanceColor&&(se=M.instanceColor)),se!==void 0){const ae=se.normalized,ve=se.itemSize,Fe=e.get(se);if(Fe===void 0)continue;const nt=Fe.buffer,$=Fe.type,ie=Fe.bytesPerElement,Me=$===t.INT||$===t.UNSIGNED_INT||se.gpuType===Bf;if(se.isInterleavedBufferAttribute){const ce=se.data,Ne=ce.stride,Be=se.offset;if(ce.isInstancedInterleavedBuffer){for(let Xe=0;Xe<V.locationSize;Xe++)_(V.location+Xe,ce.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Xe=0;Xe<V.locationSize;Xe++)g(V.location+Xe);t.bindBuffer(t.ARRAY_BUFFER,nt);for(let Xe=0;Xe<V.locationSize;Xe++)x(V.location+Xe,ve/V.locationSize,$,ae,Ne*ie,(Be+ve/V.locationSize*Xe)*ie,Me)}else{if(se.isInstancedBufferAttribute){for(let ce=0;ce<V.locationSize;ce++)_(V.location+ce,se.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ce=0;ce<V.locationSize;ce++)g(V.location+ce);t.bindBuffer(t.ARRAY_BUFFER,nt);for(let ce=0;ce<V.locationSize;ce++)x(V.location+ce,ve/V.locationSize,$,ae,ve*ie,ve/V.locationSize*ce*ie,Me)}}else if(K!==void 0){const ae=K[J];if(ae!==void 0)switch(ae.length){case 2:t.vertexAttrib2fv(V.location,ae);break;case 3:t.vertexAttrib3fv(V.location,ae);break;case 4:t.vertexAttrib4fv(V.location,ae);break;default:t.vertexAttrib1fv(V.location,ae)}}}}y()}function I(){D();for(const M in i){const O=i[M];for(const H in O){const F=O[H];for(const Y in F)d(F[Y].object),delete F[Y];delete O[H]}delete i[M]}}function R(M){if(i[M.id]===void 0)return;const O=i[M.id];for(const H in O){const F=O[H];for(const Y in F)d(F[Y].object),delete F[Y];delete O[H]}delete i[M.id]}function w(M){for(const O in i){const H=i[O];if(H[M.id]===void 0)continue;const F=H[M.id];for(const Y in F)d(F[Y].object),delete F[Y];delete H[M.id]}}function D(){A(),l=!0,s!==r&&(s=r,f(s.object))}function A(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:A,dispose:I,releaseStatesOfGeometry:R,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function av(t,e,n){let i;function r(f){i=f}function s(f,d){t.drawArrays(i,f,d),n.update(d,i,1)}function l(f,d,p){p!==0&&(t.drawArraysInstanced(i,f,d,p),n.update(d,i,p))}function a(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,f,0,d,0,p);let h=0;for(let m=0;m<p;m++)h+=d[m];n.update(h,i,1)}function c(f,d,p,u){if(p===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<f.length;m++)l(f[m],d[m],u[m]);else{h.multiDrawArraysInstancedWEBGL(i,f,0,d,0,u,0,p);let m=0;for(let v=0;v<p;v++)m+=d[v]*u[v];n.update(m,i,1)}}this.setMode=r,this.render=s,this.renderInstances=l,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function lv(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function l(w){return!(w!==Yn&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const D=w===ra&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Gi&&i.convert(w)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Li&&!D)}function c(w){if(w==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let f=n.precision!==void 0?n.precision:"highp";const d=c(f);d!==f&&(console.warn("THREE.WebGLRenderer:",f,"not supported, using",d,"instead."),f=d);const p=n.logarithmicDepthBuffer===!0,u=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),m=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),_=t.getParameter(t.MAX_VERTEX_ATTRIBS),y=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,R=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:l,textureTypeReadable:a,precision:f,logarithmicDepthBuffer:p,reverseDepthBuffer:u,maxTextures:h,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:S,vertexTextures:I,maxSamples:R}}function cv(t){const e=this;let n=null,i=0,r=!1,s=!1;const l=new br,a=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const h=p.length!==0||u||i!==0||r;return r=u,i=p.length,h},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){n=d(p,u,0)},this.setState=function(p,u,h){const m=p.clippingPlanes,v=p.clipIntersection,g=p.clipShadows,_=t.get(p);if(!r||m===null||m.length===0||s&&!g)s?d(null):f();else{const y=s?0:i,x=y*4;let S=_.clippingState||null;c.value=S,S=d(m,u,x,h);for(let I=0;I!==x;++I)S[I]=n[I];_.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function f(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(p,u,h,m){const v=p!==null?p.length:0;let g=null;if(v!==0){if(g=c.value,m!==!0||g===null){const _=h+v*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<_)&&(g=new Float32Array(_));for(let x=0,S=h;x!==v;++x,S+=4)l.copy(p[x]).applyMatrix4(y,a),l.normal.toArray(g,S),g[S+3]=l.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function fv(t){let e=new WeakMap;function n(l,a){return a===kc?l.mapping=$s:a===Vc&&(l.mapping=Zs),l}function i(l){if(l&&l.isTexture){const a=l.mapping;if(a===kc||a===Vc)if(e.has(l)){const c=e.get(l).texture;return n(c,l.mapping)}else{const c=l.image;if(c&&c.height>0){const f=new Sm(c.height);return f.fromEquirectangularTexture(t,l),e.set(l,f),l.addEventListener("dispose",r),n(f.texture,l.mapping)}else return null}}return l}function r(l){const a=l.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Oh extends bh{constructor(e=-1,n=1,i=1,r=-1,s=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=l,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,l=i+e,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const f=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=f*this.view.offsetX,l=s+f*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(s,l,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Ls=4,Xu=[.125,.215,.35,.446,.526,.582],Ir=20,tc=new Oh,Ku=new we;let nc=null,ic=0,rc=0,sc=!1;const Rr=(1+Math.sqrt(5))/2,bs=1/Rr,qu=[new C(-Rr,bs,0),new C(Rr,bs,0),new C(-bs,0,Rr),new C(bs,0,Rr),new C(0,Rr,-bs),new C(0,Rr,bs),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Yu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){nc=this._renderer.getRenderTarget(),ic=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ju(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nc,ic,rc),this._renderer.xr.enabled=sc,e.scissorTest=!1,Ia(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===$s||e.mapping===Zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nc=this._renderer.getRenderTarget(),ic=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:di,minFilter:di,generateMipmaps:!1,type:ra,format:Yn,colorSpace:so,depthBuffer:!1},r=$u(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$u(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=uv(s)),this._blurMaterial=dv(s,e,n)}return r}_compileMaterial(e){const n=new B(this._lodPlanes[0],e);this._renderer.compile(n,tc)}_sceneToCubeUV(e,n,i,r){const a=new an(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,p=d.autoClear,u=d.toneMapping;d.getClearColor(Ku),d.toneMapping=ar,d.autoClear=!1;const h=new On({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),m=new B(new k,h);let v=!1;const g=e.background;g?g.isColor&&(h.color.copy(g),e.background=null,v=!0):(h.color.copy(Ku),v=!0);for(let _=0;_<6;_++){const y=_%3;y===0?(a.up.set(0,c[_],0),a.lookAt(f[_],0,0)):y===1?(a.up.set(0,0,c[_]),a.lookAt(0,f[_],0)):(a.up.set(0,c[_],0),a.lookAt(0,0,f[_]));const x=this._cubeSize;Ia(r,y*x,_>2?x:0,x,x),d.setRenderTarget(r),v&&d.render(m,a),d.render(e,a)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=u,d.autoClear=p,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===$s||e.mapping===Zs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ju()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zu());const s=r?this._cubemapMaterial:this._equirectMaterial,l=new B(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;Ia(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(l,tc)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const l=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=qu[(r-s-1)%qu.length];this._blur(e,s-1,s,l,a)}n.autoClear=i}_blur(e,n,i,r,s){const l=this._pingPongRenderTarget;this._halfBlur(e,l,n,i,r,"latitudinal",s),this._halfBlur(l,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,l,a){const c=this._renderer,f=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,p=new B(this._lodPlanes[r],f),u=f.uniforms,h=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ir-1),v=s/m,g=isFinite(s)?1+Math.floor(d*v):Ir;g>Ir&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ir}`);const _=[];let y=0;for(let w=0;w<Ir;++w){const D=w/v,A=Math.exp(-D*D/2);_.push(A),w===0?y+=A:w<g&&(y+=2*A)}for(let w=0;w<_.length;w++)_[w]=_[w]/y;u.envMap.value=e.texture,u.samples.value=g,u.weights.value=_,u.latitudinal.value=l==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:x}=this;u.dTheta.value=m,u.mipInt.value=x-i;const S=this._sizeLods[r],I=3*S*(r>x-Ls?r-x+Ls:0),R=4*(this._cubeSize-S);Ia(n,I,R,3*S,2*S),c.setRenderTarget(n),c.render(p,tc)}}function uv(t){const e=[],n=[],i=[];let r=t;const s=t-Ls+1+Xu.length;for(let l=0;l<s;l++){const a=Math.pow(2,r);n.push(a);let c=1/a;l>t-Ls?c=Xu[l-t+Ls-1]:l===0&&(c=0),i.push(c);const f=1/(a-2),d=-f,p=1+f,u=[d,d,p,d,p,p,d,d,p,p,d,p],h=6,m=6,v=3,g=2,_=1,y=new Float32Array(v*m*h),x=new Float32Array(g*m*h),S=new Float32Array(_*m*h);for(let R=0;R<h;R++){const w=R%3*2/3-1,D=R>2?0:-1,A=[w,D,0,w+2/3,D,0,w+2/3,D+1,0,w,D,0,w+2/3,D+1,0,w,D+1,0];y.set(A,v*m*R),x.set(u,g*m*R);const M=[R,R,R,R,R,R];S.set(M,_*m*R)}const I=new hn;I.setAttribute("position",new Zn(y,v)),I.setAttribute("uv",new Zn(x,g)),I.setAttribute("faceIndex",new Zn(S,_)),e.push(I),r>Ls&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function $u(t,e,n){const i=new us(t,e,n);return i.texture.mapping=yl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ia(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function dv(t,e,n){const i=new Float32Array(Ir),r=new C(0,1,0);return new hr({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:or,depthTest:!1,depthWrite:!1})}function Zu(){return new hr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:or,depthTest:!1,depthWrite:!1})}function ju(){return new hr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:or,depthTest:!1,depthWrite:!1})}function Yf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hv(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,f=c===kc||c===Vc,d=c===$s||c===Zs;if(f||d){let p=e.get(a);const u=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return n===null&&(n=new Yu(t)),p=f?n.fromEquirectangular(a,p):n.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,e.set(a,p),p.texture;if(p!==void 0)return p.texture;{const h=a.image;return f&&h&&h.height>0||d&&h&&r(h)?(n===null&&(n=new Yu(t)),p=f?n.fromEquirectangular(a):n.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,e.set(a,p),a.addEventListener("dispose",s),p.texture):null}}}return a}function r(a){let c=0;const f=6;for(let d=0;d<f;d++)a[d]!==void 0&&c++;return c===f}function s(a){const c=a.target;c.removeEventListener("dispose",s);const f=e.get(c);f!==void 0&&(e.delete(c),f.dispose())}function l(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:l}}function pv(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Oo("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function mv(t,e,n,i){const r={},s=new WeakMap;function l(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);for(const m in u.morphAttributes){const v=u.morphAttributes[m];for(let g=0,_=v.length;g<_;g++)e.remove(v[g])}u.removeEventListener("dispose",l),delete r[u.id];const h=s.get(u);h&&(e.remove(h),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function a(p,u){return r[u.id]===!0||(u.addEventListener("dispose",l),r[u.id]=!0,n.memory.geometries++),u}function c(p){const u=p.attributes;for(const m in u)e.update(u[m],t.ARRAY_BUFFER);const h=p.morphAttributes;for(const m in h){const v=h[m];for(let g=0,_=v.length;g<_;g++)e.update(v[g],t.ARRAY_BUFFER)}}function f(p){const u=[],h=p.index,m=p.attributes.position;let v=0;if(h!==null){const y=h.array;v=h.version;for(let x=0,S=y.length;x<S;x+=3){const I=y[x+0],R=y[x+1],w=y[x+2];u.push(I,R,R,w,w,I)}}else if(m!==void 0){const y=m.array;v=m.version;for(let x=0,S=y.length/3-1;x<S;x+=3){const I=x+0,R=x+1,w=x+2;u.push(I,R,R,w,w,I)}}else return;const g=new(vh(u)?Th:yh)(u,1);g.version=v;const _=s.get(p);_&&e.remove(_),s.set(p,g)}function d(p){const u=s.get(p);if(u){const h=p.index;h!==null&&u.version<h.version&&f(p)}else f(p);return s.get(p)}return{get:a,update:c,getWireframeAttribute:d}}function _v(t,e,n){let i;function r(u){i=u}let s,l;function a(u){s=u.type,l=u.bytesPerElement}function c(u,h){t.drawElements(i,h,s,u*l),n.update(h,i,1)}function f(u,h,m){m!==0&&(t.drawElementsInstanced(i,h,s,u*l,m),n.update(h,i,m))}function d(u,h,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,s,u,0,m);let g=0;for(let _=0;_<m;_++)g+=h[_];n.update(g,i,1)}function p(u,h,m,v){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let _=0;_<u.length;_++)f(u[_]/l,h[_],v[_]);else{g.multiDrawElementsInstancedWEBGL(i,h,0,s,u,0,v,0,m);let _=0;for(let y=0;y<m;y++)_+=h[y]*v[y];n.update(_,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function gv(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,l,a){switch(n.calls++,l){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function vv(t,e,n){const i=new WeakMap,r=new at;function s(l,a,c){const f=l.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=d!==void 0?d.length:0;let u=i.get(a);if(u===void 0||u.count!==p){let M=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var h=M;u!==void 0&&u.texture.dispose();const m=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let S=0;m===!0&&(S=1),v===!0&&(S=2),g===!0&&(S=3);let I=a.attributes.position.count*S,R=1;I>e.maxTextureSize&&(R=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const w=new Float32Array(I*R*4*p),D=new Eh(w,I,R,p);D.type=Li,D.needsUpdate=!0;const A=S*4;for(let O=0;O<p;O++){const H=_[O],F=y[O],Y=x[O],q=I*R*4*O;for(let K=0;K<H.count;K++){const J=K*A;m===!0&&(r.fromBufferAttribute(H,K),w[q+J+0]=r.x,w[q+J+1]=r.y,w[q+J+2]=r.z,w[q+J+3]=0),v===!0&&(r.fromBufferAttribute(F,K),w[q+J+4]=r.x,w[q+J+5]=r.y,w[q+J+6]=r.z,w[q+J+7]=0),g===!0&&(r.fromBufferAttribute(Y,K),w[q+J+8]=r.x,w[q+J+9]=r.y,w[q+J+10]=r.z,w[q+J+11]=Y.itemSize===4?r.w:1)}}u={count:p,texture:D,size:new Ye(I,R)},i.set(a,u),a.addEventListener("dispose",M)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",l.morphTexture,n);else{let m=0;for(let g=0;g<f.length;g++)m+=f[g];const v=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(t,"morphTargetBaseInfluence",v),c.getUniforms().setValue(t,"morphTargetInfluences",f)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function xv(t,e,n,i){let r=new WeakMap;function s(c){const f=i.render.frame,d=c.geometry,p=e.get(c,d);if(r.get(p)!==f&&(e.update(p),r.set(p,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),r.set(c,f))),c.isSkinnedMesh){const u=c.skeleton;r.get(u)!==f&&(u.update(),r.set(u,f))}return p}function l(){r=new WeakMap}function a(c){const f=c.target;f.removeEventListener("dispose",a),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:s,dispose:l}}class Ch extends tn{constructor(e,n,i,r,s,l,a,c,f,d=Vs){if(d!==Vs&&d!==Qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===Vs&&(i=fs),i===void 0&&d===Qs&&(i=js),super(null,r,s,l,a,c,d,i,f),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:en,this.minFilter=c!==void 0?c:en,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const Dh=new tn,Qu=new Ch(1,1),Ih=new Eh,Nh=new sm,Lh=new Rh,Ju=[],ed=[],td=new Float32Array(16),nd=new Float32Array(9),id=new Float32Array(4);function lo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Ju[r];if(s===void 0&&(s=new Float32Array(r),Ju[r]=s),e!==0){i.toArray(s,0);for(let l=1,a=0;l!==e;++l)a+=n,t[l].toArray(s,a)}return s}function Ct(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Dt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function bl(t,e){let n=ed[e];n===void 0&&(n=new Int32Array(e),ed[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Ev(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Sv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2fv(this.addr,e),Dt(n,e)}}function Mv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ct(n,e))return;t.uniform3fv(this.addr,e),Dt(n,e)}}function yv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4fv(this.addr,e),Dt(n,e)}}function Tv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Dt(n,e)}else{if(Ct(n,i))return;id.set(i),t.uniformMatrix2fv(this.addr,!1,id),Dt(n,i)}}function Av(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Dt(n,e)}else{if(Ct(n,i))return;nd.set(i),t.uniformMatrix3fv(this.addr,!1,nd),Dt(n,i)}}function bv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Dt(n,e)}else{if(Ct(n,i))return;td.set(i),t.uniformMatrix4fv(this.addr,!1,td),Dt(n,i)}}function Rv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function wv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2iv(this.addr,e),Dt(n,e)}}function Ov(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3iv(this.addr,e),Dt(n,e)}}function Cv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4iv(this.addr,e),Dt(n,e)}}function Dv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Iv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2uiv(this.addr,e),Dt(n,e)}}function Nv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3uiv(this.addr,e),Dt(n,e)}}function Lv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4uiv(this.addr,e),Dt(n,e)}}function Pv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Qu.compareFunction=gh,s=Qu):s=Dh,n.setTexture2D(e||s,r)}function Uv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Nh,r)}function Fv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Lh,r)}function Bv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Ih,r)}function Gv(t){switch(t){case 5126:return Ev;case 35664:return Sv;case 35665:return Mv;case 35666:return yv;case 35674:return Tv;case 35675:return Av;case 35676:return bv;case 5124:case 35670:return Rv;case 35667:case 35671:return wv;case 35668:case 35672:return Ov;case 35669:case 35673:return Cv;case 5125:return Dv;case 36294:return Iv;case 36295:return Nv;case 36296:return Lv;case 35678:case 36198:case 36298:case 36306:case 35682:return Pv;case 35679:case 36299:case 36307:return Uv;case 35680:case 36300:case 36308:case 36293:return Fv;case 36289:case 36303:case 36311:case 36292:return Bv}}function Hv(t,e){t.uniform1fv(this.addr,e)}function zv(t,e){const n=lo(e,this.size,2);t.uniform2fv(this.addr,n)}function Wv(t,e){const n=lo(e,this.size,3);t.uniform3fv(this.addr,n)}function kv(t,e){const n=lo(e,this.size,4);t.uniform4fv(this.addr,n)}function Vv(t,e){const n=lo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Xv(t,e){const n=lo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Kv(t,e){const n=lo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function qv(t,e){t.uniform1iv(this.addr,e)}function Yv(t,e){t.uniform2iv(this.addr,e)}function $v(t,e){t.uniform3iv(this.addr,e)}function Zv(t,e){t.uniform4iv(this.addr,e)}function jv(t,e){t.uniform1uiv(this.addr,e)}function Qv(t,e){t.uniform2uiv(this.addr,e)}function Jv(t,e){t.uniform3uiv(this.addr,e)}function e1(t,e){t.uniform4uiv(this.addr,e)}function t1(t,e,n){const i=this.cache,r=e.length,s=bl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let l=0;l!==r;++l)n.setTexture2D(e[l]||Dh,s[l])}function n1(t,e,n){const i=this.cache,r=e.length,s=bl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let l=0;l!==r;++l)n.setTexture3D(e[l]||Nh,s[l])}function i1(t,e,n){const i=this.cache,r=e.length,s=bl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let l=0;l!==r;++l)n.setTextureCube(e[l]||Lh,s[l])}function r1(t,e,n){const i=this.cache,r=e.length,s=bl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let l=0;l!==r;++l)n.setTexture2DArray(e[l]||Ih,s[l])}function s1(t){switch(t){case 5126:return Hv;case 35664:return zv;case 35665:return Wv;case 35666:return kv;case 35674:return Vv;case 35675:return Xv;case 35676:return Kv;case 5124:case 35670:return qv;case 35667:case 35671:return Yv;case 35668:case 35672:return $v;case 35669:case 35673:return Zv;case 5125:return jv;case 36294:return Qv;case 36295:return Jv;case 36296:return e1;case 35678:case 36198:case 36298:case 36306:case 35682:return t1;case 35679:case 36299:case 36307:return n1;case 35680:case 36300:case 36308:case 36293:return i1;case 36289:case 36303:case 36311:case 36292:return r1}}class o1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Gv(n.type)}}class a1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=s1(n.type)}}class l1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,l=r.length;s!==l;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const oc=/(\w+)(\])?(\[|\.)?/g;function rd(t,e){t.seq.push(e),t.map[e.id]=e}function c1(t,e,n){const i=t.name,r=i.length;for(oc.lastIndex=0;;){const s=oc.exec(i),l=oc.lastIndex;let a=s[1];const c=s[2]==="]",f=s[3];if(c&&(a=a|0),f===void 0||f==="["&&l+2===r){rd(n,f===void 0?new o1(a,t,e):new a1(a,t,e));break}else{let p=n.map[a];p===void 0&&(p=new l1(a),rd(n,p)),n=p}}}class tl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),l=e.getUniformLocation(n,s.name);c1(s,l,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,l=n.length;s!==l;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const l=e[r];l.id in n&&i.push(l)}return i}}function sd(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const f1=37297;let u1=0;function d1(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let l=r;l<s;l++){const a=l+1;i.push(`${a===e?">":" "} ${a}: ${n[l]}`)}return i.join(`
`)}const od=new ze;function h1(t){et._getMatrix(od,et.workingColorSpace,t);const e=`mat3( ${od.elements.map(n=>n.toFixed(4))} )`;switch(et.getTransfer(t)){case Tl:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function ad(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const l=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+d1(t.getShaderSource(e),l)}else return r}function p1(t,e){const n=h1(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function m1(t,e){let n;switch(e){case g0:n="Linear";break;case v0:n="Reinhard";break;case x0:n="Cineon";break;case E0:n="ACESFilmic";break;case M0:n="AgX";break;case y0:n="Neutral";break;case S0:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Na=new C;function _1(){et.getLuminanceCoefficients(Na);const t=Na.x.toFixed(4),e=Na.y.toFixed(4),n=Na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function g1(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Co).join(`
`)}function v1(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function x1(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),l=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[l]={type:s.type,location:t.getAttribLocation(e,l),locationSize:a}}return n}function Co(t){return t!==""}function ld(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cd(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const E1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ef(t){return t.replace(E1,M1)}const S1=new Map;function M1(t,e){let n=ke[e];if(n===void 0){const i=S1.get(e);if(i!==void 0)n=ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ef(n)}const y1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fd(t){return t.replace(y1,T1)}function T1(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ud(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function A1(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===sh?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Zp?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===bi&&(e="SHADOWMAP_TYPE_VSM"),e}function b1(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case $s:case Zs:e="ENVMAP_TYPE_CUBE";break;case yl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function R1(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Zs:e="ENVMAP_MODE_REFRACTION";break}return e}function w1(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Ff:e="ENVMAP_BLENDING_MULTIPLY";break;case m0:e="ENVMAP_BLENDING_MIX";break;case _0:e="ENVMAP_BLENDING_ADD";break}return e}function O1(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function C1(t,e,n,i){const r=t.getContext(),s=n.defines;let l=n.vertexShader,a=n.fragmentShader;const c=A1(n),f=b1(n),d=R1(n),p=w1(n),u=O1(n),h=g1(n),m=v1(s),v=r.createProgram();let g,_,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Co).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m].filter(Co).join(`
`),_.length>0&&(_+=`
`)):(g=[ud(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Co).join(`
`),_=[ud(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,m,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ar?"#define TONE_MAPPING":"",n.toneMapping!==ar?ke.tonemapping_pars_fragment:"",n.toneMapping!==ar?m1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,p1("linearToOutputTexel",n.outputColorSpace),_1(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Co).join(`
`)),l=Ef(l),l=ld(l,n),l=cd(l,n),a=Ef(a),a=ld(a,n),a=cd(a,n),l=fd(l),a=fd(a),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",n.glslVersion===yu?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===yu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const x=y+g+l,S=y+_+a,I=sd(r,r.VERTEX_SHADER,x),R=sd(r,r.FRAGMENT_SHADER,S);r.attachShader(v,I),r.attachShader(v,R),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function w(O){if(t.debug.checkShaderErrors){const H=r.getProgramInfoLog(v).trim(),F=r.getShaderInfoLog(I).trim(),Y=r.getShaderInfoLog(R).trim();let q=!0,K=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,I,R);else{const J=ad(r,I,"vertex"),V=ad(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+H+`
`+J+`
`+V)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(F===""||Y==="")&&(K=!1);K&&(O.diagnostics={runnable:q,programLog:H,vertexShader:{log:F,prefix:g},fragmentShader:{log:Y,prefix:_}})}r.deleteShader(I),r.deleteShader(R),D=new tl(r,v),A=x1(r,v)}let D;this.getUniforms=function(){return D===void 0&&w(this),D};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,f1)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=u1++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=I,this.fragmentShader=R,this}let D1=0;class I1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),l=this._getShaderCacheForMaterial(e);return l.has(r)===!1&&(l.add(r),r.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new N1(e),n.set(e,i)),i}}class N1{constructor(e){this.id=D1++,this.code=e,this.usedTimes=0}}function L1(t,e,n,i,r,s,l){const a=new Sh,c=new I1,f=new Set,d=[],p=r.logarithmicDepthBuffer,u=r.vertexTextures;let h=r.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(A){return f.add(A),A===0?"uv":`uv${A}`}function g(A,M,O,H,F){const Y=H.fog,q=F.geometry,K=A.isMeshStandardMaterial?H.environment:null,J=(A.isMeshStandardMaterial?n:e).get(A.envMap||K),V=J&&J.mapping===yl?J.image.height:null,se=m[A.type];A.precision!==null&&(h=r.getMaxPrecision(A.precision),h!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",h,"instead."));const ae=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ve=ae!==void 0?ae.length:0;let Fe=0;q.morphAttributes.position!==void 0&&(Fe=1),q.morphAttributes.normal!==void 0&&(Fe=2),q.morphAttributes.color!==void 0&&(Fe=3);let nt,$,ie,Me;if(se){const st=oi[se];nt=st.vertexShader,$=st.fragmentShader}else nt=A.vertexShader,$=A.fragmentShader,c.update(A),ie=c.getVertexShaderID(A),Me=c.getFragmentShaderID(A);const ce=t.getRenderTarget(),Ne=t.state.buffers.depth.getReversed(),Be=F.isInstancedMesh===!0,Xe=F.isBatchedMesh===!0,xt=!!A.map,Qe=!!A.matcap,Tt=!!J,U=!!A.aoMap,Tn=!!A.lightMap,$e=!!A.bumpMap,Ze=!!A.normalMap,Ce=!!A.displacementMap,ht=!!A.emissiveMap,Oe=!!A.metalnessMap,b=!!A.roughnessMap,E=A.anisotropy>0,G=A.clearcoat>0,j=A.dispersion>0,ee=A.iridescence>0,Z=A.sheen>0,Te=A.transmission>0,fe=E&&!!A.anisotropyMap,me=G&&!!A.clearcoatMap,Je=G&&!!A.clearcoatNormalMap,te=G&&!!A.clearcoatRoughnessMap,_e=ee&&!!A.iridescenceMap,De=ee&&!!A.iridescenceThicknessMap,Pe=Z&&!!A.sheenColorMap,ge=Z&&!!A.sheenRoughnessMap,je=!!A.specularMap,We=!!A.specularColorMap,ut=!!A.specularIntensityMap,N=Te&&!!A.transmissionMap,le=Te&&!!A.thicknessMap,X=!!A.gradientMap,Q=!!A.alphaMap,he=A.alphaTest>0,ue=!!A.alphaHash,Ge=!!A.extensions;let Mt=ar;A.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(Mt=t.toneMapping);const Ht={shaderID:se,shaderType:A.type,shaderName:A.name,vertexShader:nt,fragmentShader:$,defines:A.defines,customVertexShaderID:ie,customFragmentShaderID:Me,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:h,batching:Xe,batchingColor:Xe&&F._colorsTexture!==null,instancing:Be,instancingColor:Be&&F.instanceColor!==null,instancingMorph:Be&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:ce===null?t.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:so,alphaToCoverage:!!A.alphaToCoverage,map:xt,matcap:Qe,envMap:Tt,envMapMode:Tt&&J.mapping,envMapCubeUVHeight:V,aoMap:U,lightMap:Tn,bumpMap:$e,normalMap:Ze,displacementMap:u&&Ce,emissiveMap:ht,normalMapObjectSpace:Ze&&A.normalMapType===R0,normalMapTangentSpace:Ze&&A.normalMapType===Vf,metalnessMap:Oe,roughnessMap:b,anisotropy:E,anisotropyMap:fe,clearcoat:G,clearcoatMap:me,clearcoatNormalMap:Je,clearcoatRoughnessMap:te,dispersion:j,iridescence:ee,iridescenceMap:_e,iridescenceThicknessMap:De,sheen:Z,sheenColorMap:Pe,sheenRoughnessMap:ge,specularMap:je,specularColorMap:We,specularIntensityMap:ut,transmission:Te,transmissionMap:N,thicknessMap:le,gradientMap:X,opaque:A.transparent===!1&&A.blending===ks&&A.alphaToCoverage===!1,alphaMap:Q,alphaTest:he,alphaHash:ue,combine:A.combine,mapUv:xt&&v(A.map.channel),aoMapUv:U&&v(A.aoMap.channel),lightMapUv:Tn&&v(A.lightMap.channel),bumpMapUv:$e&&v(A.bumpMap.channel),normalMapUv:Ze&&v(A.normalMap.channel),displacementMapUv:Ce&&v(A.displacementMap.channel),emissiveMapUv:ht&&v(A.emissiveMap.channel),metalnessMapUv:Oe&&v(A.metalnessMap.channel),roughnessMapUv:b&&v(A.roughnessMap.channel),anisotropyMapUv:fe&&v(A.anisotropyMap.channel),clearcoatMapUv:me&&v(A.clearcoatMap.channel),clearcoatNormalMapUv:Je&&v(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&v(A.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&v(A.iridescenceMap.channel),iridescenceThicknessMapUv:De&&v(A.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&v(A.sheenColorMap.channel),sheenRoughnessMapUv:ge&&v(A.sheenRoughnessMap.channel),specularMapUv:je&&v(A.specularMap.channel),specularColorMapUv:We&&v(A.specularColorMap.channel),specularIntensityMapUv:ut&&v(A.specularIntensityMap.channel),transmissionMapUv:N&&v(A.transmissionMap.channel),thicknessMapUv:le&&v(A.thicknessMap.channel),alphaMapUv:Q&&v(A.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ze||E),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!q.attributes.uv&&(xt||Q),fog:!!Y,useFog:A.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Ne,skinning:F.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Fe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:A.dithering,shadowMapEnabled:t.shadowMap.enabled&&O.length>0,shadowMapType:t.shadowMap.type,toneMapping:Mt,decodeVideoTexture:xt&&A.map.isVideoTexture===!0&&et.getTransfer(A.map.colorSpace)===ot,decodeVideoTextureEmissive:ht&&A.emissiveMap.isVideoTexture===!0&&et.getTransfer(A.emissiveMap.colorSpace)===ot,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Vn,flipSided:A.side===dn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Ge&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&A.extensions.multiDraw===!0||Xe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Ht.vertexUv1s=f.has(1),Ht.vertexUv2s=f.has(2),Ht.vertexUv3s=f.has(3),f.clear(),Ht}function _(A){const M=[];if(A.shaderID?M.push(A.shaderID):(M.push(A.customVertexShaderID),M.push(A.customFragmentShaderID)),A.defines!==void 0)for(const O in A.defines)M.push(O),M.push(A.defines[O]);return A.isRawShaderMaterial===!1&&(y(M,A),x(M,A),M.push(t.outputColorSpace)),M.push(A.customProgramCacheKey),M.join()}function y(A,M){A.push(M.precision),A.push(M.outputColorSpace),A.push(M.envMapMode),A.push(M.envMapCubeUVHeight),A.push(M.mapUv),A.push(M.alphaMapUv),A.push(M.lightMapUv),A.push(M.aoMapUv),A.push(M.bumpMapUv),A.push(M.normalMapUv),A.push(M.displacementMapUv),A.push(M.emissiveMapUv),A.push(M.metalnessMapUv),A.push(M.roughnessMapUv),A.push(M.anisotropyMapUv),A.push(M.clearcoatMapUv),A.push(M.clearcoatNormalMapUv),A.push(M.clearcoatRoughnessMapUv),A.push(M.iridescenceMapUv),A.push(M.iridescenceThicknessMapUv),A.push(M.sheenColorMapUv),A.push(M.sheenRoughnessMapUv),A.push(M.specularMapUv),A.push(M.specularColorMapUv),A.push(M.specularIntensityMapUv),A.push(M.transmissionMapUv),A.push(M.thicknessMapUv),A.push(M.combine),A.push(M.fogExp2),A.push(M.sizeAttenuation),A.push(M.morphTargetsCount),A.push(M.morphAttributeCount),A.push(M.numDirLights),A.push(M.numPointLights),A.push(M.numSpotLights),A.push(M.numSpotLightMaps),A.push(M.numHemiLights),A.push(M.numRectAreaLights),A.push(M.numDirLightShadows),A.push(M.numPointLightShadows),A.push(M.numSpotLightShadows),A.push(M.numSpotLightShadowsWithMaps),A.push(M.numLightProbes),A.push(M.shadowMapType),A.push(M.toneMapping),A.push(M.numClippingPlanes),A.push(M.numClipIntersection),A.push(M.depthPacking)}function x(A,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),A.push(a.mask)}function S(A){const M=m[A.type];let O;if(M){const H=oi[M];O=gm.clone(H.uniforms)}else O=A.uniforms;return O}function I(A,M){let O;for(let H=0,F=d.length;H<F;H++){const Y=d[H];if(Y.cacheKey===M){O=Y,++O.usedTimes;break}}return O===void 0&&(O=new C1(t,M,A,s),d.push(O)),O}function R(A){if(--A.usedTimes===0){const M=d.indexOf(A);d[M]=d[d.length-1],d.pop(),A.destroy()}}function w(A){c.remove(A)}function D(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:S,acquireProgram:I,releaseProgram:R,releaseShaderCache:w,programs:d,dispose:D}}function P1(){let t=new WeakMap;function e(l){return t.has(l)}function n(l){let a=t.get(l);return a===void 0&&(a={},t.set(l,a)),a}function i(l){t.delete(l)}function r(l,a,c){t.get(l)[a]=c}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function U1(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function dd(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function hd(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function l(p,u,h,m,v,g){let _=t[e];return _===void 0?(_={id:p.id,object:p,geometry:u,material:h,groupOrder:m,renderOrder:p.renderOrder,z:v,group:g},t[e]=_):(_.id=p.id,_.object=p,_.geometry=u,_.material=h,_.groupOrder=m,_.renderOrder=p.renderOrder,_.z=v,_.group=g),e++,_}function a(p,u,h,m,v,g){const _=l(p,u,h,m,v,g);h.transmission>0?i.push(_):h.transparent===!0?r.push(_):n.push(_)}function c(p,u,h,m,v,g){const _=l(p,u,h,m,v,g);h.transmission>0?i.unshift(_):h.transparent===!0?r.unshift(_):n.unshift(_)}function f(p,u){n.length>1&&n.sort(p||U1),i.length>1&&i.sort(u||dd),r.length>1&&r.sort(u||dd)}function d(){for(let p=e,u=t.length;p<u;p++){const h=t[p];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:d,sort:f}}function F1(){let t=new WeakMap;function e(i,r){const s=t.get(i);let l;return s===void 0?(l=new hd,t.set(i,[l])):r>=s.length?(l=new hd,s.push(l)):l=s[r],l}function n(){t=new WeakMap}return{get:e,dispose:n}}function B1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new C,color:new we};break;case"SpotLight":n={position:new C,direction:new C,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new C,color:new we,distance:0,decay:0};break;case"HemisphereLight":n={direction:new C,skyColor:new we,groundColor:new we};break;case"RectAreaLight":n={color:new we,position:new C,halfWidth:new C,halfHeight:new C};break}return t[e.id]=n,n}}}function G1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let H1=0;function z1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function W1(t){const e=new B1,n=G1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let f=0;f<9;f++)i.probe.push(new C);const r=new C,s=new gt,l=new gt;function a(f){let d=0,p=0,u=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let h=0,m=0,v=0,g=0,_=0,y=0,x=0,S=0,I=0,R=0,w=0;f.sort(z1);for(let A=0,M=f.length;A<M;A++){const O=f[A],H=O.color,F=O.intensity,Y=O.distance,q=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)d+=H.r*F,p+=H.g*F,u+=H.b*F;else if(O.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(O.sh.coefficients[K],F);w++}else if(O.isDirectionalLight){const K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const J=O.shadow,V=n.get(O);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.directionalShadow[h]=V,i.directionalShadowMap[h]=q,i.directionalShadowMatrix[h]=O.shadow.matrix,y++}i.directional[h]=K,h++}else if(O.isSpotLight){const K=e.get(O);K.position.setFromMatrixPosition(O.matrixWorld),K.color.copy(H).multiplyScalar(F),K.distance=Y,K.coneCos=Math.cos(O.angle),K.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),K.decay=O.decay,i.spot[v]=K;const J=O.shadow;if(O.map&&(i.spotLightMap[I]=O.map,I++,J.updateMatrices(O),O.castShadow&&R++),i.spotLightMatrix[v]=J.matrix,O.castShadow){const V=n.get(O);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.spotShadow[v]=V,i.spotShadowMap[v]=q,S++}v++}else if(O.isRectAreaLight){const K=e.get(O);K.color.copy(H).multiplyScalar(F),K.halfWidth.set(O.width*.5,0,0),K.halfHeight.set(0,O.height*.5,0),i.rectArea[g]=K,g++}else if(O.isPointLight){const K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),K.distance=O.distance,K.decay=O.decay,O.castShadow){const J=O.shadow,V=n.get(O);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,i.pointShadow[m]=V,i.pointShadowMap[m]=q,i.pointShadowMatrix[m]=O.shadow.matrix,x++}i.point[m]=K,m++}else if(O.isHemisphereLight){const K=e.get(O);K.skyColor.copy(O.color).multiplyScalar(F),K.groundColor.copy(O.groundColor).multiplyScalar(F),i.hemi[_]=K,_++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=u;const D=i.hash;(D.directionalLength!==h||D.pointLength!==m||D.spotLength!==v||D.rectAreaLength!==g||D.hemiLength!==_||D.numDirectionalShadows!==y||D.numPointShadows!==x||D.numSpotShadows!==S||D.numSpotMaps!==I||D.numLightProbes!==w)&&(i.directional.length=h,i.spot.length=v,i.rectArea.length=g,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=S+I-R,i.spotLightMap.length=I,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=w,D.directionalLength=h,D.pointLength=m,D.spotLength=v,D.rectAreaLength=g,D.hemiLength=_,D.numDirectionalShadows=y,D.numPointShadows=x,D.numSpotShadows=S,D.numSpotMaps=I,D.numLightProbes=w,i.version=H1++)}function c(f,d){let p=0,u=0,h=0,m=0,v=0;const g=d.matrixWorldInverse;for(let _=0,y=f.length;_<y;_++){const x=f[_];if(x.isDirectionalLight){const S=i.directional[p];S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),p++}else if(x.isSpotLight){const S=i.spot[h];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),h++}else if(x.isRectAreaLight){const S=i.rectArea[m];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(g),l.identity(),s.copy(x.matrixWorld),s.premultiply(g),l.extractRotation(s),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(l),S.halfHeight.applyMatrix4(l),m++}else if(x.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:i}}function pd(t){const e=new W1(t),n=[],i=[];function r(d){f.camera=d,n.length=0,i.length=0}function s(d){n.push(d)}function l(d){i.push(d)}function a(){e.setup(n)}function c(d){e.setupView(n,d)}const f={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:f,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:l}}function k1(t){let e=new WeakMap;function n(r,s=0){const l=e.get(r);let a;return l===void 0?(a=new pd(t),e.set(r,[a])):s>=l.length?(a=new pd(t),l.push(a)):a=l[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class V1 extends mr{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=A0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class X1 extends mr{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const K1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,q1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Y1(t,e,n){let i=new qf;const r=new Ye,s=new Ye,l=new at,a=new V1({depthPacking:b0}),c=new X1,f={},d=n.maxTextureSize,p={[dr]:dn,[dn]:dr,[Vn]:Vn},u=new hr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:K1,fragmentShader:q1}),h=u.clone();h.defines.HORIZONTAL_PASS=1;const m=new hn;m.setAttribute("position",new Zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new B(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sh;let _=this.type;this.render=function(R,w,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const A=t.getRenderTarget(),M=t.getActiveCubeFace(),O=t.getActiveMipmapLevel(),H=t.state;H.setBlending(or),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const F=_!==bi&&this.type===bi,Y=_===bi&&this.type!==bi;for(let q=0,K=R.length;q<K;q++){const J=R[q],V=J.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const se=V.getFrameExtents();if(r.multiply(se),s.copy(V.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/se.x),r.x=s.x*se.x,V.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/se.y),r.y=s.y*se.y,V.mapSize.y=s.y)),V.map===null||F===!0||Y===!0){const ve=this.type!==bi?{minFilter:en,magFilter:en}:{};V.map!==null&&V.map.dispose(),V.map=new us(r.x,r.y,ve),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}t.setRenderTarget(V.map),t.clear();const ae=V.getViewportCount();for(let ve=0;ve<ae;ve++){const Fe=V.getViewport(ve);l.set(s.x*Fe.x,s.y*Fe.y,s.x*Fe.z,s.y*Fe.w),H.viewport(l),V.updateMatrices(J,ve),i=V.getFrustum(),S(w,D,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===bi&&y(V,D),V.needsUpdate=!1}_=this.type,g.needsUpdate=!1,t.setRenderTarget(A,M,O)};function y(R,w){const D=e.update(v);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,h.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,h.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new us(r.x,r.y)),u.uniforms.shadow_pass.value=R.map.texture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(w,null,D,u,v,null),h.uniforms.shadow_pass.value=R.mapPass.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(w,null,D,h,v,null)}function x(R,w,D,A){let M=null;const O=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(O!==void 0)M=O;else if(M=D.isPointLight===!0?c:a,t.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const H=M.uuid,F=w.uuid;let Y=f[H];Y===void 0&&(Y={},f[H]=Y);let q=Y[F];q===void 0&&(q=M.clone(),Y[F]=q,w.addEventListener("dispose",I)),M=q}if(M.visible=w.visible,M.wireframe=w.wireframe,A===bi?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:p[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=t.properties.get(M);H.light=D}return M}function S(R,w,D,A,M){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===bi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);const F=e.update(R),Y=R.material;if(Array.isArray(Y)){const q=F.groups;for(let K=0,J=q.length;K<J;K++){const V=q[K],se=Y[V.materialIndex];if(se&&se.visible){const ae=x(R,se,A,M);R.onBeforeShadow(t,R,w,D,F,ae,V),t.renderBufferDirect(D,null,F,ae,R,V),R.onAfterShadow(t,R,w,D,F,ae,V)}}}else if(Y.visible){const q=x(R,Y,A,M);R.onBeforeShadow(t,R,w,D,F,q,null),t.renderBufferDirect(D,null,F,q,R,null),R.onAfterShadow(t,R,w,D,F,q,null)}}const H=R.children;for(let F=0,Y=H.length;F<Y;F++)S(H[F],w,D,A,M)}function I(R){R.target.removeEventListener("dispose",I);for(const D in f){const A=f[D],M=R.target.uuid;M in A&&(A[M].dispose(),delete A[M])}}}const $1={[Uc]:Fc,[Bc]:zc,[Gc]:Wc,[Ys]:Hc,[Fc]:Uc,[zc]:Bc,[Wc]:Gc,[Hc]:Ys};function Z1(t,e){function n(){let N=!1;const le=new at;let X=null;const Q=new at(0,0,0,0);return{setMask:function(he){X!==he&&!N&&(t.colorMask(he,he,he,he),X=he)},setLocked:function(he){N=he},setClear:function(he,ue,Ge,Mt,Ht){Ht===!0&&(he*=Mt,ue*=Mt,Ge*=Mt),le.set(he,ue,Ge,Mt),Q.equals(le)===!1&&(t.clearColor(he,ue,Ge,Mt),Q.copy(le))},reset:function(){N=!1,X=null,Q.set(-1,0,0,0)}}}function i(){let N=!1,le=!1,X=null,Q=null,he=null;return{setReversed:function(ue){if(le!==ue){const Ge=e.get("EXT_clip_control");le?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const Mt=he;he=null,this.setClear(Mt)}le=ue},getReversed:function(){return le},setTest:function(ue){ue?ce(t.DEPTH_TEST):Ne(t.DEPTH_TEST)},setMask:function(ue){X!==ue&&!N&&(t.depthMask(ue),X=ue)},setFunc:function(ue){if(le&&(ue=$1[ue]),Q!==ue){switch(ue){case Uc:t.depthFunc(t.NEVER);break;case Fc:t.depthFunc(t.ALWAYS);break;case Bc:t.depthFunc(t.LESS);break;case Ys:t.depthFunc(t.LEQUAL);break;case Gc:t.depthFunc(t.EQUAL);break;case Hc:t.depthFunc(t.GEQUAL);break;case zc:t.depthFunc(t.GREATER);break;case Wc:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Q=ue}},setLocked:function(ue){N=ue},setClear:function(ue){he!==ue&&(le&&(ue=1-ue),t.clearDepth(ue),he=ue)},reset:function(){N=!1,X=null,Q=null,he=null,le=!1}}}function r(){let N=!1,le=null,X=null,Q=null,he=null,ue=null,Ge=null,Mt=null,Ht=null;return{setTest:function(st){N||(st?ce(t.STENCIL_TEST):Ne(t.STENCIL_TEST))},setMask:function(st){le!==st&&!N&&(t.stencilMask(st),le=st)},setFunc:function(st,Dn,xi){(X!==st||Q!==Dn||he!==xi)&&(t.stencilFunc(st,Dn,xi),X=st,Q=Dn,he=xi)},setOp:function(st,Dn,xi){(ue!==st||Ge!==Dn||Mt!==xi)&&(t.stencilOp(st,Dn,xi),ue=st,Ge=Dn,Mt=xi)},setLocked:function(st){N=st},setClear:function(st){Ht!==st&&(t.clearStencil(st),Ht=st)},reset:function(){N=!1,le=null,X=null,Q=null,he=null,ue=null,Ge=null,Mt=null,Ht=null}}}const s=new n,l=new i,a=new r,c=new WeakMap,f=new WeakMap;let d={},p={},u=new WeakMap,h=[],m=null,v=!1,g=null,_=null,y=null,x=null,S=null,I=null,R=null,w=new we(0,0,0),D=0,A=!1,M=null,O=null,H=null,F=null,Y=null;const q=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,J=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),K=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),K=J>=2);let se=null,ae={};const ve=t.getParameter(t.SCISSOR_BOX),Fe=t.getParameter(t.VIEWPORT),nt=new at().fromArray(ve),$=new at().fromArray(Fe);function ie(N,le,X,Q){const he=new Uint8Array(4),ue=t.createTexture();t.bindTexture(N,ue),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ge=0;Ge<X;Ge++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(le,0,t.RGBA,1,1,Q,0,t.RGBA,t.UNSIGNED_BYTE,he):t.texImage2D(le+Ge,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,he);return ue}const Me={};Me[t.TEXTURE_2D]=ie(t.TEXTURE_2D,t.TEXTURE_2D,1),Me[t.TEXTURE_CUBE_MAP]=ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[t.TEXTURE_2D_ARRAY]=ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Me[t.TEXTURE_3D]=ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),l.setClear(1),a.setClear(0),ce(t.DEPTH_TEST),l.setFunc(Ys),$e(!1),Ze(gu),ce(t.CULL_FACE),U(or);function ce(N){d[N]!==!0&&(t.enable(N),d[N]=!0)}function Ne(N){d[N]!==!1&&(t.disable(N),d[N]=!1)}function Be(N,le){return p[N]!==le?(t.bindFramebuffer(N,le),p[N]=le,N===t.DRAW_FRAMEBUFFER&&(p[t.FRAMEBUFFER]=le),N===t.FRAMEBUFFER&&(p[t.DRAW_FRAMEBUFFER]=le),!0):!1}function Xe(N,le){let X=h,Q=!1;if(N){X=u.get(le),X===void 0&&(X=[],u.set(le,X));const he=N.textures;if(X.length!==he.length||X[0]!==t.COLOR_ATTACHMENT0){for(let ue=0,Ge=he.length;ue<Ge;ue++)X[ue]=t.COLOR_ATTACHMENT0+ue;X.length=he.length,Q=!0}}else X[0]!==t.BACK&&(X[0]=t.BACK,Q=!0);Q&&t.drawBuffers(X)}function xt(N){return m!==N?(t.useProgram(N),m=N,!0):!1}const Qe={[Dr]:t.FUNC_ADD,[Qp]:t.FUNC_SUBTRACT,[Jp]:t.FUNC_REVERSE_SUBTRACT};Qe[e0]=t.MIN,Qe[t0]=t.MAX;const Tt={[n0]:t.ZERO,[i0]:t.ONE,[r0]:t.SRC_COLOR,[Lc]:t.SRC_ALPHA,[f0]:t.SRC_ALPHA_SATURATE,[l0]:t.DST_COLOR,[o0]:t.DST_ALPHA,[s0]:t.ONE_MINUS_SRC_COLOR,[Pc]:t.ONE_MINUS_SRC_ALPHA,[c0]:t.ONE_MINUS_DST_COLOR,[a0]:t.ONE_MINUS_DST_ALPHA,[u0]:t.CONSTANT_COLOR,[d0]:t.ONE_MINUS_CONSTANT_COLOR,[h0]:t.CONSTANT_ALPHA,[p0]:t.ONE_MINUS_CONSTANT_ALPHA};function U(N,le,X,Q,he,ue,Ge,Mt,Ht,st){if(N===or){v===!0&&(Ne(t.BLEND),v=!1);return}if(v===!1&&(ce(t.BLEND),v=!0),N!==jp){if(N!==g||st!==A){if((_!==Dr||S!==Dr)&&(t.blendEquation(t.FUNC_ADD),_=Dr,S=Dr),st)switch(N){case ks:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case vu:t.blendFunc(t.ONE,t.ONE);break;case xu:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Eu:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ks:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case vu:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case xu:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Eu:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,x=null,I=null,R=null,w.set(0,0,0),D=0,g=N,A=st}return}he=he||le,ue=ue||X,Ge=Ge||Q,(le!==_||he!==S)&&(t.blendEquationSeparate(Qe[le],Qe[he]),_=le,S=he),(X!==y||Q!==x||ue!==I||Ge!==R)&&(t.blendFuncSeparate(Tt[X],Tt[Q],Tt[ue],Tt[Ge]),y=X,x=Q,I=ue,R=Ge),(Mt.equals(w)===!1||Ht!==D)&&(t.blendColor(Mt.r,Mt.g,Mt.b,Ht),w.copy(Mt),D=Ht),g=N,A=!1}function Tn(N,le){N.side===Vn?Ne(t.CULL_FACE):ce(t.CULL_FACE);let X=N.side===dn;le&&(X=!X),$e(X),N.blending===ks&&N.transparent===!1?U(or):U(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),s.setMask(N.colorWrite);const Q=N.stencilWrite;a.setTest(Q),Q&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),ht(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ce(t.SAMPLE_ALPHA_TO_COVERAGE):Ne(t.SAMPLE_ALPHA_TO_COVERAGE)}function $e(N){M!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),M=N)}function Ze(N){N!==Yp?(ce(t.CULL_FACE),N!==O&&(N===gu?t.cullFace(t.BACK):N===$p?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ne(t.CULL_FACE),O=N}function Ce(N){N!==H&&(K&&t.lineWidth(N),H=N)}function ht(N,le,X){N?(ce(t.POLYGON_OFFSET_FILL),(F!==le||Y!==X)&&(t.polygonOffset(le,X),F=le,Y=X)):Ne(t.POLYGON_OFFSET_FILL)}function Oe(N){N?ce(t.SCISSOR_TEST):Ne(t.SCISSOR_TEST)}function b(N){N===void 0&&(N=t.TEXTURE0+q-1),se!==N&&(t.activeTexture(N),se=N)}function E(N,le,X){X===void 0&&(se===null?X=t.TEXTURE0+q-1:X=se);let Q=ae[X];Q===void 0&&(Q={type:void 0,texture:void 0},ae[X]=Q),(Q.type!==N||Q.texture!==le)&&(se!==X&&(t.activeTexture(X),se=X),t.bindTexture(N,le||Me[N]),Q.type=N,Q.texture=le)}function G(){const N=ae[se];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function j(){try{t.compressedTexImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{t.compressedTexImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{t.texSubImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Te(){try{t.texSubImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Je(){try{t.texStorage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function te(){try{t.texStorage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function _e(){try{t.texImage2D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{t.texImage3D.apply(t,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pe(N){nt.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),nt.copy(N))}function ge(N){$.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),$.copy(N))}function je(N,le){let X=f.get(le);X===void 0&&(X=new WeakMap,f.set(le,X));let Q=X.get(N);Q===void 0&&(Q=t.getUniformBlockIndex(le,N.name),X.set(N,Q))}function We(N,le){const Q=f.get(le).get(N);c.get(le)!==Q&&(t.uniformBlockBinding(le,Q,N.__bindingPointIndex),c.set(le,Q))}function ut(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),l.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),d={},se=null,ae={},p={},u=new WeakMap,h=[],m=null,v=!1,g=null,_=null,y=null,x=null,S=null,I=null,R=null,w=new we(0,0,0),D=0,A=!1,M=null,O=null,H=null,F=null,Y=null,nt.set(0,0,t.canvas.width,t.canvas.height),$.set(0,0,t.canvas.width,t.canvas.height),s.reset(),l.reset(),a.reset()}return{buffers:{color:s,depth:l,stencil:a},enable:ce,disable:Ne,bindFramebuffer:Be,drawBuffers:Xe,useProgram:xt,setBlending:U,setMaterial:Tn,setFlipSided:$e,setCullFace:Ze,setLineWidth:Ce,setPolygonOffset:ht,setScissorTest:Oe,activeTexture:b,bindTexture:E,unbindTexture:G,compressedTexImage2D:j,compressedTexImage3D:ee,texImage2D:_e,texImage3D:De,updateUBOMapping:je,uniformBlockBinding:We,texStorage2D:Je,texStorage3D:te,texSubImage2D:Z,texSubImage3D:Te,compressedTexSubImage2D:fe,compressedTexSubImage3D:me,scissor:Pe,viewport:ge,reset:ut}}function md(t,e,n,i){const r=j1(i);switch(n){case fh:return t*e;case dh:return t*e;case hh:return t*e*2;case ph:return t*e/r.components*r.byteLength;case zf:return t*e/r.components*r.byteLength;case mh:return t*e*2/r.components*r.byteLength;case Wf:return t*e*2/r.components*r.byteLength;case uh:return t*e*3/r.components*r.byteLength;case Yn:return t*e*4/r.components*r.byteLength;case kf:return t*e*4/r.components*r.byteLength;case $a:case Za:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ja:case Qa:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Yc:case Zc:return Math.max(t,16)*Math.max(e,8)/4;case qc:case $c:return Math.max(t,8)*Math.max(e,8)/2;case jc:case Qc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Jc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ef:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case tf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case nf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case rf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case sf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case of:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case af:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case lf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case cf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case ff:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case uf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case df:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case hf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case pf:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Ja:case mf:case _f:return Math.ceil(t/4)*Math.ceil(e/4)*16;case _h:case gf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case vf:case xf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function j1(t){switch(t){case Gi:case ah:return{byteLength:1,components:1};case Qo:case lh:case ra:return{byteLength:2,components:1};case Gf:case Hf:return{byteLength:2,components:4};case fs:case Bf:case Li:return{byteLength:4,components:1};case ch:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function Q1(t,e,n,i,r,s,l){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),f=new Ye,d=new WeakMap;let p;const u=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(b,E){return h?new OffscreenCanvas(b,E):ol("canvas")}function v(b,E,G){let j=1;const ee=Oe(b);if((ee.width>G||ee.height>G)&&(j=G/Math.max(ee.width,ee.height)),j<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Z=Math.floor(j*ee.width),Te=Math.floor(j*ee.height);p===void 0&&(p=m(Z,Te));const fe=E?m(Z,Te):p;return fe.width=Z,fe.height=Te,fe.getContext("2d").drawImage(b,0,0,Z,Te),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Z+"x"+Te+")."),fe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function g(b){return b.generateMipmaps}function _(b){t.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(b,E,G,j,ee=!1){if(b!==null){if(t[b]!==void 0)return t[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Z=E;if(E===t.RED&&(G===t.FLOAT&&(Z=t.R32F),G===t.HALF_FLOAT&&(Z=t.R16F),G===t.UNSIGNED_BYTE&&(Z=t.R8)),E===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.R8UI),G===t.UNSIGNED_SHORT&&(Z=t.R16UI),G===t.UNSIGNED_INT&&(Z=t.R32UI),G===t.BYTE&&(Z=t.R8I),G===t.SHORT&&(Z=t.R16I),G===t.INT&&(Z=t.R32I)),E===t.RG&&(G===t.FLOAT&&(Z=t.RG32F),G===t.HALF_FLOAT&&(Z=t.RG16F),G===t.UNSIGNED_BYTE&&(Z=t.RG8)),E===t.RG_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.RG8UI),G===t.UNSIGNED_SHORT&&(Z=t.RG16UI),G===t.UNSIGNED_INT&&(Z=t.RG32UI),G===t.BYTE&&(Z=t.RG8I),G===t.SHORT&&(Z=t.RG16I),G===t.INT&&(Z=t.RG32I)),E===t.RGB_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.RGB8UI),G===t.UNSIGNED_SHORT&&(Z=t.RGB16UI),G===t.UNSIGNED_INT&&(Z=t.RGB32UI),G===t.BYTE&&(Z=t.RGB8I),G===t.SHORT&&(Z=t.RGB16I),G===t.INT&&(Z=t.RGB32I)),E===t.RGBA_INTEGER&&(G===t.UNSIGNED_BYTE&&(Z=t.RGBA8UI),G===t.UNSIGNED_SHORT&&(Z=t.RGBA16UI),G===t.UNSIGNED_INT&&(Z=t.RGBA32UI),G===t.BYTE&&(Z=t.RGBA8I),G===t.SHORT&&(Z=t.RGBA16I),G===t.INT&&(Z=t.RGBA32I)),E===t.RGB&&G===t.UNSIGNED_INT_5_9_9_9_REV&&(Z=t.RGB9_E5),E===t.RGBA){const Te=ee?Tl:et.getTransfer(j);G===t.FLOAT&&(Z=t.RGBA32F),G===t.HALF_FLOAT&&(Z=t.RGBA16F),G===t.UNSIGNED_BYTE&&(Z=Te===ot?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT_4_4_4_4&&(Z=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(Z=t.RGB5_A1)}return(Z===t.R16F||Z===t.R32F||Z===t.RG16F||Z===t.RG32F||Z===t.RGBA16F||Z===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function S(b,E){let G;return b?E===null||E===fs||E===js?G=t.DEPTH24_STENCIL8:E===Li?G=t.DEPTH32F_STENCIL8:E===Qo&&(G=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===fs||E===js?G=t.DEPTH_COMPONENT24:E===Li?G=t.DEPTH_COMPONENT32F:E===Qo&&(G=t.DEPTH_COMPONENT16),G}function I(b,E){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==en&&b.minFilter!==di?Math.log2(Math.max(E.width,E.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?E.mipmaps.length:1}function R(b){const E=b.target;E.removeEventListener("dispose",R),D(E),E.isVideoTexture&&d.delete(E)}function w(b){const E=b.target;E.removeEventListener("dispose",w),M(E)}function D(b){const E=i.get(b);if(E.__webglInit===void 0)return;const G=b.source,j=u.get(G);if(j){const ee=j[E.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&A(b),Object.keys(j).length===0&&u.delete(G)}i.remove(b)}function A(b){const E=i.get(b);t.deleteTexture(E.__webglTexture);const G=b.source,j=u.get(G);delete j[E.__cacheKey],l.memory.textures--}function M(b){const E=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(E.__webglFramebuffer[j]))for(let ee=0;ee<E.__webglFramebuffer[j].length;ee++)t.deleteFramebuffer(E.__webglFramebuffer[j][ee]);else t.deleteFramebuffer(E.__webglFramebuffer[j]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[j])}else{if(Array.isArray(E.__webglFramebuffer))for(let j=0;j<E.__webglFramebuffer.length;j++)t.deleteFramebuffer(E.__webglFramebuffer[j]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let j=0;j<E.__webglColorRenderbuffer.length;j++)E.__webglColorRenderbuffer[j]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[j]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const G=b.textures;for(let j=0,ee=G.length;j<ee;j++){const Z=i.get(G[j]);Z.__webglTexture&&(t.deleteTexture(Z.__webglTexture),l.memory.textures--),i.remove(G[j])}i.remove(b)}let O=0;function H(){O=0}function F(){const b=O;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),O+=1,b}function Y(b){const E=[];return E.push(b.wrapS),E.push(b.wrapT),E.push(b.wrapR||0),E.push(b.magFilter),E.push(b.minFilter),E.push(b.anisotropy),E.push(b.internalFormat),E.push(b.format),E.push(b.type),E.push(b.generateMipmaps),E.push(b.premultiplyAlpha),E.push(b.flipY),E.push(b.unpackAlignment),E.push(b.colorSpace),E.join()}function q(b,E){const G=i.get(b);if(b.isVideoTexture&&Ce(b),b.isRenderTargetTexture===!1&&b.version>0&&G.__version!==b.version){const j=b.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(G,b,E);return}}n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+E)}function K(b,E){const G=i.get(b);if(b.version>0&&G.__version!==b.version){$(G,b,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+E)}function J(b,E){const G=i.get(b);if(b.version>0&&G.__version!==b.version){$(G,b,E);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+E)}function V(b,E){const G=i.get(b);if(b.version>0&&G.__version!==b.version){ie(G,b,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+E)}const se={[Xc]:t.REPEAT,[Hr]:t.CLAMP_TO_EDGE,[Kc]:t.MIRRORED_REPEAT},ae={[en]:t.NEAREST,[T0]:t.NEAREST_MIPMAP_NEAREST,[ha]:t.NEAREST_MIPMAP_LINEAR,[di]:t.LINEAR,[Ll]:t.LINEAR_MIPMAP_NEAREST,[zr]:t.LINEAR_MIPMAP_LINEAR},ve={[w0]:t.NEVER,[L0]:t.ALWAYS,[O0]:t.LESS,[gh]:t.LEQUAL,[C0]:t.EQUAL,[N0]:t.GEQUAL,[D0]:t.GREATER,[I0]:t.NOTEQUAL};function Fe(b,E){if(E.type===Li&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===di||E.magFilter===Ll||E.magFilter===ha||E.magFilter===zr||E.minFilter===di||E.minFilter===Ll||E.minFilter===ha||E.minFilter===zr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,se[E.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,se[E.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,se[E.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,ae[E.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,ae[E.minFilter]),E.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,ve[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===en||E.minFilter!==ha&&E.minFilter!==zr||E.type===Li&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function nt(b,E){let G=!1;b.__webglInit===void 0&&(b.__webglInit=!0,E.addEventListener("dispose",R));const j=E.source;let ee=u.get(j);ee===void 0&&(ee={},u.set(j,ee));const Z=Y(E);if(Z!==b.__cacheKey){ee[Z]===void 0&&(ee[Z]={texture:t.createTexture(),usedTimes:0},l.memory.textures++,G=!0),ee[Z].usedTimes++;const Te=ee[b.__cacheKey];Te!==void 0&&(ee[b.__cacheKey].usedTimes--,Te.usedTimes===0&&A(E)),b.__cacheKey=Z,b.__webglTexture=ee[Z].texture}return G}function $(b,E,G){let j=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(j=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(j=t.TEXTURE_3D);const ee=nt(b,E),Z=E.source;n.bindTexture(j,b.__webglTexture,t.TEXTURE0+G);const Te=i.get(Z);if(Z.version!==Te.__version||ee===!0){n.activeTexture(t.TEXTURE0+G);const fe=et.getPrimaries(et.workingColorSpace),me=E.colorSpace===rr?null:et.getPrimaries(E.colorSpace),Je=E.colorSpace===rr||fe===me?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let te=v(E.image,!1,r.maxTextureSize);te=ht(E,te);const _e=s.convert(E.format,E.colorSpace),De=s.convert(E.type);let Pe=x(E.internalFormat,_e,De,E.colorSpace,E.isVideoTexture);Fe(j,E);let ge;const je=E.mipmaps,We=E.isVideoTexture!==!0,ut=Te.__version===void 0||ee===!0,N=Z.dataReady,le=I(E,te);if(E.isDepthTexture)Pe=S(E.format===Qs,E.type),ut&&(We?n.texStorage2D(t.TEXTURE_2D,1,Pe,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,Pe,te.width,te.height,0,_e,De,null));else if(E.isDataTexture)if(je.length>0){We&&ut&&n.texStorage2D(t.TEXTURE_2D,le,Pe,je[0].width,je[0].height);for(let X=0,Q=je.length;X<Q;X++)ge=je[X],We?N&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,ge.width,ge.height,_e,De,ge.data):n.texImage2D(t.TEXTURE_2D,X,Pe,ge.width,ge.height,0,_e,De,ge.data);E.generateMipmaps=!1}else We?(ut&&n.texStorage2D(t.TEXTURE_2D,le,Pe,te.width,te.height),N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,te.width,te.height,_e,De,te.data)):n.texImage2D(t.TEXTURE_2D,0,Pe,te.width,te.height,0,_e,De,te.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){We&&ut&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,Pe,je[0].width,je[0].height,te.depth);for(let X=0,Q=je.length;X<Q;X++)if(ge=je[X],E.format!==Yn)if(_e!==null)if(We){if(N)if(E.layerUpdates.size>0){const he=md(ge.width,ge.height,E.format,E.type);for(const ue of E.layerUpdates){const Ge=ge.data.subarray(ue*he/ge.data.BYTES_PER_ELEMENT,(ue+1)*he/ge.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,ue,ge.width,ge.height,1,_e,Ge)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,ge.width,ge.height,te.depth,_e,ge.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,X,Pe,ge.width,ge.height,te.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?N&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,ge.width,ge.height,te.depth,_e,De,ge.data):n.texImage3D(t.TEXTURE_2D_ARRAY,X,Pe,ge.width,ge.height,te.depth,0,_e,De,ge.data)}else{We&&ut&&n.texStorage2D(t.TEXTURE_2D,le,Pe,je[0].width,je[0].height);for(let X=0,Q=je.length;X<Q;X++)ge=je[X],E.format!==Yn?_e!==null?We?N&&n.compressedTexSubImage2D(t.TEXTURE_2D,X,0,0,ge.width,ge.height,_e,ge.data):n.compressedTexImage2D(t.TEXTURE_2D,X,Pe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?N&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,ge.width,ge.height,_e,De,ge.data):n.texImage2D(t.TEXTURE_2D,X,Pe,ge.width,ge.height,0,_e,De,ge.data)}else if(E.isDataArrayTexture)if(We){if(ut&&n.texStorage3D(t.TEXTURE_2D_ARRAY,le,Pe,te.width,te.height,te.depth),N)if(E.layerUpdates.size>0){const X=md(te.width,te.height,E.format,E.type);for(const Q of E.layerUpdates){const he=te.data.subarray(Q*X/te.data.BYTES_PER_ELEMENT,(Q+1)*X/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Q,te.width,te.height,1,_e,De,he)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,_e,De,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pe,te.width,te.height,te.depth,0,_e,De,te.data);else if(E.isData3DTexture)We?(ut&&n.texStorage3D(t.TEXTURE_3D,le,Pe,te.width,te.height,te.depth),N&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,_e,De,te.data)):n.texImage3D(t.TEXTURE_3D,0,Pe,te.width,te.height,te.depth,0,_e,De,te.data);else if(E.isFramebufferTexture){if(ut)if(We)n.texStorage2D(t.TEXTURE_2D,le,Pe,te.width,te.height);else{let X=te.width,Q=te.height;for(let he=0;he<le;he++)n.texImage2D(t.TEXTURE_2D,he,Pe,X,Q,0,_e,De,null),X>>=1,Q>>=1}}else if(je.length>0){if(We&&ut){const X=Oe(je[0]);n.texStorage2D(t.TEXTURE_2D,le,Pe,X.width,X.height)}for(let X=0,Q=je.length;X<Q;X++)ge=je[X],We?N&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,_e,De,ge):n.texImage2D(t.TEXTURE_2D,X,Pe,_e,De,ge);E.generateMipmaps=!1}else if(We){if(ut){const X=Oe(te);n.texStorage2D(t.TEXTURE_2D,le,Pe,X.width,X.height)}N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,_e,De,te)}else n.texImage2D(t.TEXTURE_2D,0,Pe,_e,De,te);g(E)&&_(j),Te.__version=Z.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function ie(b,E,G){if(E.image.length!==6)return;const j=nt(b,E),ee=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+G);const Z=i.get(ee);if(ee.version!==Z.__version||j===!0){n.activeTexture(t.TEXTURE0+G);const Te=et.getPrimaries(et.workingColorSpace),fe=E.colorSpace===rr?null:et.getPrimaries(E.colorSpace),me=E.colorSpace===rr||Te===fe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Je=E.isCompressedTexture||E.image[0].isCompressedTexture,te=E.image[0]&&E.image[0].isDataTexture,_e=[];for(let Q=0;Q<6;Q++)!Je&&!te?_e[Q]=v(E.image[Q],!0,r.maxCubemapSize):_e[Q]=te?E.image[Q].image:E.image[Q],_e[Q]=ht(E,_e[Q]);const De=_e[0],Pe=s.convert(E.format,E.colorSpace),ge=s.convert(E.type),je=x(E.internalFormat,Pe,ge,E.colorSpace),We=E.isVideoTexture!==!0,ut=Z.__version===void 0||j===!0,N=ee.dataReady;let le=I(E,De);Fe(t.TEXTURE_CUBE_MAP,E);let X;if(Je){We&&ut&&n.texStorage2D(t.TEXTURE_CUBE_MAP,le,je,De.width,De.height);for(let Q=0;Q<6;Q++){X=_e[Q].mipmaps;for(let he=0;he<X.length;he++){const ue=X[he];E.format!==Yn?Pe!==null?We?N&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he,0,0,ue.width,ue.height,Pe,ue.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he,je,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he,0,0,ue.width,ue.height,Pe,ge,ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he,je,ue.width,ue.height,0,Pe,ge,ue.data)}}}else{if(X=E.mipmaps,We&&ut){X.length>0&&le++;const Q=Oe(_e[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,le,je,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(te){We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,_e[Q].width,_e[Q].height,Pe,ge,_e[Q].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,je,_e[Q].width,_e[Q].height,0,Pe,ge,_e[Q].data);for(let he=0;he<X.length;he++){const Ge=X[he].image[Q].image;We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he+1,0,0,Ge.width,Ge.height,Pe,ge,Ge.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he+1,je,Ge.width,Ge.height,0,Pe,ge,Ge.data)}}else{We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pe,ge,_e[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,je,Pe,ge,_e[Q]);for(let he=0;he<X.length;he++){const ue=X[he];We?N&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he+1,0,0,Pe,ge,ue.image[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,he+1,je,Pe,ge,ue.image[Q])}}}g(E)&&_(t.TEXTURE_CUBE_MAP),Z.__version=ee.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function Me(b,E,G,j,ee,Z){const Te=s.convert(G.format,G.colorSpace),fe=s.convert(G.type),me=x(G.internalFormat,Te,fe,G.colorSpace),Je=i.get(E),te=i.get(G);if(te.__renderTarget=E,!Je.__hasExternalTextures){const _e=Math.max(1,E.width>>Z),De=Math.max(1,E.height>>Z);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,Z,me,_e,De,E.depth,0,Te,fe,null):n.texImage2D(ee,Z,me,_e,De,0,Te,fe,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),Ze(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,ee,te.__webglTexture,0,$e(E)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,j,ee,te.__webglTexture,Z),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ce(b,E,G){if(t.bindRenderbuffer(t.RENDERBUFFER,b),E.depthBuffer){const j=E.depthTexture,ee=j&&j.isDepthTexture?j.type:null,Z=S(E.stencilBuffer,ee),Te=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=$e(E);Ze(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,fe,Z,E.width,E.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,fe,Z,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,Z,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Te,t.RENDERBUFFER,b)}else{const j=E.textures;for(let ee=0;ee<j.length;ee++){const Z=j[ee],Te=s.convert(Z.format,Z.colorSpace),fe=s.convert(Z.type),me=x(Z.internalFormat,Te,fe,Z.colorSpace),Je=$e(E);G&&Ze(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Je,me,E.width,E.height):Ze(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Je,me,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,me,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ne(b,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(E.depthTexture);j.__renderTarget=E,(!j.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),q(E.depthTexture,0);const ee=j.__webglTexture,Z=$e(E);if(E.depthTexture.format===Vs)Ze(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(E.depthTexture.format===Qs)Ze(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,Z):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Be(b){const E=i.get(b),G=b.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==b.depthTexture){const j=b.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),j){const ee=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,j.removeEventListener("dispose",ee)};j.addEventListener("dispose",ee),E.__depthDisposeCallback=ee}E.__boundDepthTexture=j}if(b.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ne(E.__webglFramebuffer,b)}else if(G){E.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[j]),E.__webglDepthbuffer[j]===void 0)E.__webglDepthbuffer[j]=t.createRenderbuffer(),ce(E.__webglDepthbuffer[j],b,!1);else{const ee=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[j];t.bindRenderbuffer(t.RENDERBUFFER,Z),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,Z)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),ce(E.__webglDepthbuffer,b,!1);else{const j=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ee=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ee),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,ee)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Xe(b,E,G){const j=i.get(b);E!==void 0&&Me(j.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&Be(b)}function xt(b){const E=b.texture,G=i.get(b),j=i.get(E);b.addEventListener("dispose",w);const ee=b.textures,Z=b.isWebGLCubeRenderTarget===!0,Te=ee.length>1;if(Te||(j.__webglTexture===void 0&&(j.__webglTexture=t.createTexture()),j.__version=E.version,l.memory.textures++),Z){G.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[fe]=[];for(let me=0;me<E.mipmaps.length;me++)G.__webglFramebuffer[fe][me]=t.createFramebuffer()}else G.__webglFramebuffer[fe]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let fe=0;fe<E.mipmaps.length;fe++)G.__webglFramebuffer[fe]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(Te)for(let fe=0,me=ee.length;fe<me;fe++){const Je=i.get(ee[fe]);Je.__webglTexture===void 0&&(Je.__webglTexture=t.createTexture(),l.memory.textures++)}if(b.samples>0&&Ze(b)===!1){G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let fe=0;fe<ee.length;fe++){const me=ee[fe];G.__webglColorRenderbuffer[fe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[fe]);const Je=s.convert(me.format,me.colorSpace),te=s.convert(me.type),_e=x(me.internalFormat,Je,te,me.colorSpace,b.isXRRenderTarget===!0),De=$e(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,De,_e,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+fe,t.RENDERBUFFER,G.__webglColorRenderbuffer[fe])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),ce(G.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Z){n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),Fe(t.TEXTURE_CUBE_MAP,E);for(let fe=0;fe<6;fe++)if(E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)Me(G.__webglFramebuffer[fe][me],b,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else Me(G.__webglFramebuffer[fe],b,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);g(E)&&_(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Te){for(let fe=0,me=ee.length;fe<me;fe++){const Je=ee[fe],te=i.get(Je);n.bindTexture(t.TEXTURE_2D,te.__webglTexture),Fe(t.TEXTURE_2D,Je),Me(G.__webglFramebuffer,b,Je,t.COLOR_ATTACHMENT0+fe,t.TEXTURE_2D,0),g(Je)&&_(t.TEXTURE_2D)}n.unbindTexture()}else{let fe=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(fe=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(fe,j.__webglTexture),Fe(fe,E),E.mipmaps&&E.mipmaps.length>0)for(let me=0;me<E.mipmaps.length;me++)Me(G.__webglFramebuffer[me],b,E,t.COLOR_ATTACHMENT0,fe,me);else Me(G.__webglFramebuffer,b,E,t.COLOR_ATTACHMENT0,fe,0);g(E)&&_(fe),n.unbindTexture()}b.depthBuffer&&Be(b)}function Qe(b){const E=b.textures;for(let G=0,j=E.length;G<j;G++){const ee=E[G];if(g(ee)){const Z=y(b),Te=i.get(ee).__webglTexture;n.bindTexture(Z,Te),_(Z),n.unbindTexture()}}}const Tt=[],U=[];function Tn(b){if(b.samples>0){if(Ze(b)===!1){const E=b.textures,G=b.width,j=b.height;let ee=t.COLOR_BUFFER_BIT;const Z=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Te=i.get(b),fe=E.length>1;if(fe)for(let me=0;me<E.length;me++)n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let me=0;me<E.length;me++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),fe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Te.__webglColorRenderbuffer[me]);const Je=i.get(E[me]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Je,0)}t.blitFramebuffer(0,0,G,j,0,0,G,j,ee,t.NEAREST),c===!0&&(Tt.length=0,U.length=0,Tt.push(t.COLOR_ATTACHMENT0+me),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Tt.push(Z),U.push(Z),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,U)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Tt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),fe)for(let me=0;me<E.length;me++){n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.RENDERBUFFER,Te.__webglColorRenderbuffer[me]);const Je=i.get(E[me]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Te.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+me,t.TEXTURE_2D,Je,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const E=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function $e(b){return Math.min(r.maxSamples,b.samples)}function Ze(b){const E=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ce(b){const E=l.render.frame;d.get(b)!==E&&(d.set(b,E),b.update())}function ht(b,E){const G=b.colorSpace,j=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||G!==so&&G!==rr&&(et.getTransfer(G)===ot?(j!==Yn||ee!==Gi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function Oe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(f.width=b.naturalWidth||b.width,f.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(f.width=b.displayWidth,f.height=b.displayHeight):(f.width=b.width,f.height=b.height),f}this.allocateTextureUnit=F,this.resetTextureUnits=H,this.setTexture2D=q,this.setTexture2DArray=K,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=Xe,this.setupRenderTarget=xt,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=Tn,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=Ze}function J1(t,e){function n(i,r=rr){let s;const l=et.getTransfer(r);if(i===Gi)return t.UNSIGNED_BYTE;if(i===Gf)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Hf)return t.UNSIGNED_SHORT_5_5_5_1;if(i===ch)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===ah)return t.BYTE;if(i===lh)return t.SHORT;if(i===Qo)return t.UNSIGNED_SHORT;if(i===Bf)return t.INT;if(i===fs)return t.UNSIGNED_INT;if(i===Li)return t.FLOAT;if(i===ra)return t.HALF_FLOAT;if(i===fh)return t.ALPHA;if(i===uh)return t.RGB;if(i===Yn)return t.RGBA;if(i===dh)return t.LUMINANCE;if(i===hh)return t.LUMINANCE_ALPHA;if(i===Vs)return t.DEPTH_COMPONENT;if(i===Qs)return t.DEPTH_STENCIL;if(i===ph)return t.RED;if(i===zf)return t.RED_INTEGER;if(i===mh)return t.RG;if(i===Wf)return t.RG_INTEGER;if(i===kf)return t.RGBA_INTEGER;if(i===$a||i===Za||i===ja||i===Qa)if(l===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===$a)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===$a)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Za)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ja)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===qc||i===Yc||i===$c||i===Zc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===qc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$c)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jc||i===Qc||i===Jc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===jc||i===Qc)return l===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Jc)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ef||i===tf||i===nf||i===rf||i===sf||i===of||i===af||i===lf||i===cf||i===ff||i===uf||i===df||i===hf||i===pf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ef)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===tf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===nf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===rf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===sf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===of)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===af)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===lf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===cf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ff)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===uf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===df)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pf)return l===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ja||i===mf||i===_f)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ja)return l===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===mf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_f)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_h||i===gf||i===vf||i===xf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ja)return s.COMPRESSED_RED_RGTC1_EXT;if(i===gf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===vf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===js?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class ex extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ke extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tx={type:"move"};class ac{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,l=null;const a=this._targetRay,c=this._grip,f=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(f&&e.hand){l=!0;for(const v of e.hand.values()){const g=n.getJointPose(v,i),_=this._getHandJoint(f,v);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}const d=f.joints["index-finger-tip"],p=f.joints["thumb-tip"],u=d.position.distanceTo(p.position),h=.02,m=.005;f.inputState.pinching&&u>h+m?(f.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!f.inputState.pinching&&u<=h-m&&(f.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(tx)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),f!==null&&(f.visible=l!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ke;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ix=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new tn,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new hr({vertexShader:nx,fragmentShader:ix,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new B(new Al(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sx extends oo{constructor(e,n){super();const i=this;let r=null,s=1,l=null,a="local-floor",c=1,f=null,d=null,p=null,u=null,h=null,m=null;const v=new rx,g=n.getContextAttributes();let _=null,y=null;const x=[],S=[],I=new Ye;let R=null;const w=new an;w.viewport=new at;const D=new an;D.viewport=new at;const A=[w,D],M=new ex;let O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ie=x[$];return ie===void 0&&(ie=new ac,x[$]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function($){let ie=x[$];return ie===void 0&&(ie=new ac,x[$]=ie),ie.getGripSpace()},this.getHand=function($){let ie=x[$];return ie===void 0&&(ie=new ac,x[$]=ie),ie.getHandSpace()};function F($){const ie=S.indexOf($.inputSource);if(ie===-1)return;const Me=x[ie];Me!==void 0&&(Me.update($.inputSource,$.frame,f||l),Me.dispatchEvent({type:$.type,data:$.inputSource}))}function Y(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",q);for(let $=0;$<x.length;$++){const ie=S[$];ie!==null&&(S[$]=null,x[$].disconnect(ie))}O=null,H=null,v.reset(),e.setRenderTarget(_),h=null,u=null,p=null,r=null,y=null,nt.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(I.width,I.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return f||l},this.setReferenceSpace=function($){f=$},this.getBaseLayer=function(){return u!==null?u:h},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(I),r.renderState.layers===void 0){const ie={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,n,ie),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),y=new us(h.framebufferWidth,h.framebufferHeight,{format:Yn,type:Gi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ie=null,Me=null,ce=null;g.depth&&(ce=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=g.stencil?Qs:Vs,Me=g.stencil?js:fs);const Ne={colorFormat:n.RGBA8,depthFormat:ce,scaleFactor:s};p=new XRWebGLBinding(r,n),u=p.createProjectionLayer(Ne),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new us(u.textureWidth,u.textureHeight,{format:Yn,type:Gi,depthTexture:new Ch(u.textureWidth,u.textureHeight,Me,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),f=null,l=await r.requestReferenceSpace(a),nt.setContext(r),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function q($){for(let ie=0;ie<$.removed.length;ie++){const Me=$.removed[ie],ce=S.indexOf(Me);ce>=0&&(S[ce]=null,x[ce].disconnect(Me))}for(let ie=0;ie<$.added.length;ie++){const Me=$.added[ie];let ce=S.indexOf(Me);if(ce===-1){for(let Be=0;Be<x.length;Be++)if(Be>=S.length){S.push(Me),ce=Be;break}else if(S[Be]===null){S[Be]=Me,ce=Be;break}if(ce===-1)break}const Ne=x[ce];Ne&&Ne.connect(Me)}}const K=new C,J=new C;function V($,ie,Me){K.setFromMatrixPosition(ie.matrixWorld),J.setFromMatrixPosition(Me.matrixWorld);const ce=K.distanceTo(J),Ne=ie.projectionMatrix.elements,Be=Me.projectionMatrix.elements,Xe=Ne[14]/(Ne[10]-1),xt=Ne[14]/(Ne[10]+1),Qe=(Ne[9]+1)/Ne[5],Tt=(Ne[9]-1)/Ne[5],U=(Ne[8]-1)/Ne[0],Tn=(Be[8]+1)/Be[0],$e=Xe*U,Ze=Xe*Tn,Ce=ce/(-U+Tn),ht=Ce*-U;if(ie.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ht),$.translateZ(Ce),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ne[10]===-1)$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Oe=Xe+Ce,b=xt+Ce,E=$e-ht,G=Ze+(ce-ht),j=Qe*xt/b*Oe,ee=Tt*xt/b*Oe;$.projectionMatrix.makePerspective(E,G,j,ee,Oe,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function se($,ie){ie===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ie.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ie=$.near,Me=$.far;v.texture!==null&&(v.depthNear>0&&(ie=v.depthNear),v.depthFar>0&&(Me=v.depthFar)),M.near=D.near=w.near=ie,M.far=D.far=w.far=Me,(O!==M.near||H!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),O=M.near,H=M.far),w.layers.mask=$.layers.mask|2,D.layers.mask=$.layers.mask|4,M.layers.mask=w.layers.mask|D.layers.mask;const ce=$.parent,Ne=M.cameras;se(M,ce);for(let Be=0;Be<Ne.length;Be++)se(Ne[Be],ce);Ne.length===2?V(M,w,D):M.projectionMatrix.copy(w.projectionMatrix),ae($,M,ce)};function ae($,ie,Me){Me===null?$.matrix.copy(ie.matrixWorld):($.matrix.copy(Me.matrixWorld),$.matrix.invert(),$.matrix.multiply(ie.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Jo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&h===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=$)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let ve=null;function Fe($,ie){if(d=ie.getViewerPose(f||l),m=ie,d!==null){const Me=d.views;h!==null&&(e.setRenderTargetFramebuffer(y,h.framebuffer),e.setRenderTarget(y));let ce=!1;Me.length!==M.cameras.length&&(M.cameras.length=0,ce=!0);for(let Be=0;Be<Me.length;Be++){const Xe=Me[Be];let xt=null;if(h!==null)xt=h.getViewport(Xe);else{const Tt=p.getViewSubImage(u,Xe);xt=Tt.viewport,Be===0&&(e.setRenderTargetTextures(y,Tt.colorTexture,u.ignoreDepthValues?void 0:Tt.depthStencilTexture),e.setRenderTarget(y))}let Qe=A[Be];Qe===void 0&&(Qe=new an,Qe.layers.enable(Be),Qe.viewport=new at,A[Be]=Qe),Qe.matrix.fromArray(Xe.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(Xe.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(xt.x,xt.y,xt.width,xt.height),Be===0&&(M.matrix.copy(Qe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ce===!0&&M.cameras.push(Qe)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")){const Be=p.getDepthInformation(Me[0]);Be&&Be.isValid&&Be.texture&&v.init(e,Be,r.renderState)}}for(let Me=0;Me<x.length;Me++){const ce=S[Me],Ne=x[Me];ce!==null&&Ne!==void 0&&Ne.update(ce,ie,f||l)}ve&&ve($,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),m=null}const nt=new wh;nt.setAnimationLoop(Fe),this.setAnimationLoop=function($){ve=$},this.dispose=function(){}}}const yr=new jn,ox=new gt;function ax(t,e){function n(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function i(g,_){_.color.getRGB(g.fogColor.value,Ah(t)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function r(g,_,y,x,S){_.isMeshBasicMaterial||_.isMeshLambertMaterial?s(g,_):_.isMeshToonMaterial?(s(g,_),p(g,_)):_.isMeshPhongMaterial?(s(g,_),d(g,_)):_.isMeshStandardMaterial?(s(g,_),u(g,_),_.isMeshPhysicalMaterial&&h(g,_,S)):_.isMeshMatcapMaterial?(s(g,_),m(g,_)):_.isMeshDepthMaterial?s(g,_):_.isMeshDistanceMaterial?(s(g,_),v(g,_)):_.isMeshNormalMaterial?s(g,_):_.isLineBasicMaterial?(l(g,_),_.isLineDashedMaterial&&a(g,_)):_.isPointsMaterial?c(g,_,y,x):_.isSpriteMaterial?f(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,n(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,n(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,n(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===dn&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,n(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===dn&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,n(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,n(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,n(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);const y=e.get(_),x=y.envMap,S=y.envMapRotation;x&&(g.envMap.value=x,yr.copy(S),yr.x*=-1,yr.y*=-1,yr.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(yr.y*=-1,yr.z*=-1),g.envMapRotation.value.setFromMatrix4(ox.makeRotationFromEuler(yr)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap&&(g.lightMap.value=_.lightMap,g.lightMapIntensity.value=_.lightMapIntensity,n(_.lightMap,g.lightMapTransform)),_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,n(_.aoMap,g.aoMapTransform))}function l(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,n(_.map,g.mapTransform))}function a(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function c(g,_,y,x){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*y,g.scale.value=x*.5,_.map&&(g.map.value=_.map,n(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,n(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function f(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,n(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,n(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function d(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function p(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function u(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,n(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,n(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function h(g,_,y){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,n(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,n(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,n(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,n(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,n(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===dn&&g.clearcoatNormalScale.value.negate())),_.dispersion>0&&(g.dispersion.value=_.dispersion),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,n(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,n(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,n(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,n(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,n(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,n(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,n(_.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,_){_.matcap&&(g.matcap.value=_.matcap)}function v(g,_){const y=e.get(_).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function lx(t,e,n,i){let r={},s={},l=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const S=x.program;i.uniformBlockBinding(y,S)}function f(y,x){let S=r[y.id];S===void 0&&(m(y),S=d(y),r[y.id]=S,y.addEventListener("dispose",g));const I=x.program;i.updateUBOMapping(y,I);const R=e.render.frame;s[y.id]!==R&&(u(y),s[y.id]=R)}function d(y){const x=p();y.__bindingPointIndex=x;const S=t.createBuffer(),I=y.__size,R=y.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,I,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,S),S}function p(){for(let y=0;y<a;y++)if(l.indexOf(y)===-1)return l.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const x=r[y.id],S=y.uniforms,I=y.__cache;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let R=0,w=S.length;R<w;R++){const D=Array.isArray(S[R])?S[R]:[S[R]];for(let A=0,M=D.length;A<M;A++){const O=D[A];if(h(O,R,A,I)===!0){const H=O.__offset,F=Array.isArray(O.value)?O.value:[O.value];let Y=0;for(let q=0;q<F.length;q++){const K=F[q],J=v(K);typeof K=="number"||typeof K=="boolean"?(O.__data[0]=K,t.bufferSubData(t.UNIFORM_BUFFER,H+Y,O.__data)):K.isMatrix3?(O.__data[0]=K.elements[0],O.__data[1]=K.elements[1],O.__data[2]=K.elements[2],O.__data[3]=0,O.__data[4]=K.elements[3],O.__data[5]=K.elements[4],O.__data[6]=K.elements[5],O.__data[7]=0,O.__data[8]=K.elements[6],O.__data[9]=K.elements[7],O.__data[10]=K.elements[8],O.__data[11]=0):(K.toArray(O.__data,Y),Y+=J.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,H,O.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function h(y,x,S,I){const R=y.value,w=x+"_"+S;if(I[w]===void 0)return typeof R=="number"||typeof R=="boolean"?I[w]=R:I[w]=R.clone(),!0;{const D=I[w];if(typeof R=="number"||typeof R=="boolean"){if(D!==R)return I[w]=R,!0}else if(D.equals(R)===!1)return D.copy(R),!0}return!1}function m(y){const x=y.uniforms;let S=0;const I=16;for(let w=0,D=x.length;w<D;w++){const A=Array.isArray(x[w])?x[w]:[x[w]];for(let M=0,O=A.length;M<O;M++){const H=A[M],F=Array.isArray(H.value)?H.value:[H.value];for(let Y=0,q=F.length;Y<q;Y++){const K=F[Y],J=v(K),V=S%I,se=V%J.boundary,ae=V+se;S+=se,ae!==0&&I-ae<J.storage&&(S+=I-ae),H.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=J.storage}}}const R=S%I;return R>0&&(S+=I-R),y.__size=S,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const S=l.indexOf(x.__bindingPointIndex);l.splice(S,1),t.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function _(){for(const y in r)t.deleteBuffer(r[y]);l=[],r={},s={}}return{bind:c,update:f,dispose:_}}class Ph{constructor(e={}){const{canvas:n=j0(),context:i=null,depth:r=!0,stencil:s=!1,alpha:l=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:f=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:u=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=l;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,_=null;const y=[],x=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=xn,this.toneMapping=ar,this.toneMappingExposure=1;const S=this;let I=!1,R=0,w=0,D=null,A=-1,M=null;const O=new at,H=new at;let F=null;const Y=new we(0);let q=0,K=n.width,J=n.height,V=1,se=null,ae=null;const ve=new at(0,0,K,J),Fe=new at(0,0,K,J);let nt=!1;const $=new qf;let ie=!1,Me=!1;const ce=new gt,Ne=new gt,Be=new C,Xe=new at,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function Tt(){return D===null?V:1}let U=i;function Tn(T,L){return n.getContext(T,L)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:f,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Uf}`),n.addEventListener("webglcontextlost",Q,!1),n.addEventListener("webglcontextrestored",he,!1),n.addEventListener("webglcontextcreationerror",ue,!1),U===null){const L="webgl2";if(U=Tn(L,T),U===null)throw Tn(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let $e,Ze,Ce,ht,Oe,b,E,G,j,ee,Z,Te,fe,me,Je,te,_e,De,Pe,ge,je,We,ut,N;function le(){$e=new pv(U),$e.init(),We=new J1(U,$e),Ze=new lv(U,$e,e,We),Ce=new Z1(U,$e),Ze.reverseDepthBuffer&&u&&Ce.buffers.depth.setReversed(!0),ht=new gv(U),Oe=new P1,b=new Q1(U,$e,Ce,Oe,Ze,We,ht),E=new fv(S),G=new hv(S),j=new Tm(U),ut=new ov(U,j),ee=new mv(U,j,ht,ut),Z=new xv(U,ee,j,ht),Pe=new vv(U,Ze,b),te=new cv(Oe),Te=new L1(S,E,G,$e,Ze,ut,te),fe=new ax(S,Oe),me=new F1,Je=new k1($e),De=new sv(S,E,G,Ce,Z,h,c),_e=new Y1(S,Z,Ze),N=new lx(U,ht,Ze,Ce),ge=new av(U,$e,ht),je=new _v(U,$e,ht),ht.programs=Te.programs,S.capabilities=Ze,S.extensions=$e,S.properties=Oe,S.renderLists=me,S.shadowMap=_e,S.state=Ce,S.info=ht}le();const X=new sx(S,U);this.xr=X,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=$e.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=$e.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(K,J,!1))},this.getSize=function(T){return T.set(K,J)},this.setSize=function(T,L,z=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=T,J=L,n.width=Math.floor(T*V),n.height=Math.floor(L*V),z===!0&&(n.style.width=T+"px",n.style.height=L+"px"),this.setViewport(0,0,T,L)},this.getDrawingBufferSize=function(T){return T.set(K*V,J*V).floor()},this.setDrawingBufferSize=function(T,L,z){K=T,J=L,V=z,n.width=Math.floor(T*z),n.height=Math.floor(L*z),this.setViewport(0,0,T,L)},this.getCurrentViewport=function(T){return T.copy(O)},this.getViewport=function(T){return T.copy(ve)},this.setViewport=function(T,L,z,W){T.isVector4?ve.set(T.x,T.y,T.z,T.w):ve.set(T,L,z,W),Ce.viewport(O.copy(ve).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(Fe)},this.setScissor=function(T,L,z,W){T.isVector4?Fe.set(T.x,T.y,T.z,T.w):Fe.set(T,L,z,W),Ce.scissor(H.copy(Fe).multiplyScalar(V).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(T){Ce.setScissorTest(nt=T)},this.setOpaqueSort=function(T){se=T},this.setTransparentSort=function(T){ae=T},this.getClearColor=function(T){return T.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(T=!0,L=!0,z=!0){let W=0;if(T){let P=!1;if(D!==null){const ne=D.texture.format;P=ne===kf||ne===Wf||ne===zf}if(P){const ne=D.texture.type,de=ne===Gi||ne===fs||ne===Qo||ne===js||ne===Gf||ne===Hf,xe=De.getClearColor(),Ee=De.getClearAlpha(),Ue=xe.r,He=xe.g,Se=xe.b;de?(m[0]=Ue,m[1]=He,m[2]=Se,m[3]=Ee,U.clearBufferuiv(U.COLOR,0,m)):(v[0]=Ue,v[1]=He,v[2]=Se,v[3]=Ee,U.clearBufferiv(U.COLOR,0,v))}else W|=U.COLOR_BUFFER_BIT}L&&(W|=U.DEPTH_BUFFER_BIT),z&&(W|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Q,!1),n.removeEventListener("webglcontextrestored",he,!1),n.removeEventListener("webglcontextcreationerror",ue,!1),me.dispose(),Je.dispose(),Oe.dispose(),E.dispose(),G.dispose(),Z.dispose(),ut.dispose(),N.dispose(),Te.dispose(),X.dispose(),X.removeEventListener("sessionstart",cu),X.removeEventListener("sessionend",fu),gr.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function he(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const T=ht.autoReset,L=_e.enabled,z=_e.autoUpdate,W=_e.needsUpdate,P=_e.type;le(),ht.autoReset=T,_e.enabled=L,_e.autoUpdate=z,_e.needsUpdate=W,_e.type=P}function ue(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ge(T){const L=T.target;L.removeEventListener("dispose",Ge),Mt(L)}function Mt(T){Ht(T),Oe.remove(T)}function Ht(T){const L=Oe.get(T).programs;L!==void 0&&(L.forEach(function(z){Te.releaseProgram(z)}),T.isShaderMaterial&&Te.releaseShaderCache(T))}this.renderBufferDirect=function(T,L,z,W,P,ne){L===null&&(L=xt);const de=P.isMesh&&P.matrixWorld.determinant()<0,xe=Vp(T,L,z,W,P);Ce.setMaterial(W,de);let Ee=z.index,Ue=1;if(W.wireframe===!0){if(Ee=ee.getWireframeAttribute(z),Ee===void 0)return;Ue=2}const He=z.drawRange,Se=z.attributes.position;let tt=He.start*Ue,dt=(He.start+He.count)*Ue;ne!==null&&(tt=Math.max(tt,ne.start*Ue),dt=Math.min(dt,(ne.start+ne.count)*Ue)),Ee!==null?(tt=Math.max(tt,0),dt=Math.min(dt,Ee.count)):Se!=null&&(tt=Math.max(tt,0),dt=Math.min(dt,Se.count));const pt=dt-tt;if(pt<0||pt===1/0)return;ut.setup(P,W,xe,z,Ee);let nn,it=ge;if(Ee!==null&&(nn=j.get(Ee),it=je,it.setIndex(nn)),P.isMesh)W.wireframe===!0?(Ce.setLineWidth(W.wireframeLinewidth*Tt()),it.setMode(U.LINES)):it.setMode(U.TRIANGLES);else if(P.isLine){let Ae=W.linewidth;Ae===void 0&&(Ae=1),Ce.setLineWidth(Ae*Tt()),P.isLineSegments?it.setMode(U.LINES):P.isLineLoop?it.setMode(U.LINE_LOOP):it.setMode(U.LINE_STRIP)}else P.isPoints?it.setMode(U.POINTS):P.isSprite&&it.setMode(U.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)it.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))it.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{const Ae=P._multiDrawStarts,Ei=P._multiDrawCounts,rt=P._multiDrawCount,In=Ee?j.get(Ee).bytesPerElement:1,ds=Oe.get(W).currentProgram.getUniforms();for(let pn=0;pn<rt;pn++)ds.setValue(U,"_gl_DrawID",pn),it.render(Ae[pn]/In,Ei[pn])}else if(P.isInstancedMesh)it.renderInstances(tt,pt,P.count);else if(z.isInstancedBufferGeometry){const Ae=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Ei=Math.min(z.instanceCount,Ae);it.renderInstances(tt,pt,Ei)}else it.render(tt,pt)};function st(T,L,z){T.transparent===!0&&T.side===Vn&&T.forceSinglePass===!1?(T.side=dn,T.needsUpdate=!0,da(T,L,z),T.side=dr,T.needsUpdate=!0,da(T,L,z),T.side=Vn):da(T,L,z)}this.compile=function(T,L,z=null){z===null&&(z=T),_=Je.get(z),_.init(L),x.push(_),z.traverseVisible(function(P){P.isLight&&P.layers.test(L.layers)&&(_.pushLight(P),P.castShadow&&_.pushShadow(P))}),T!==z&&T.traverseVisible(function(P){P.isLight&&P.layers.test(L.layers)&&(_.pushLight(P),P.castShadow&&_.pushShadow(P))}),_.setupLights();const W=new Set;return T.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;const ne=P.material;if(ne)if(Array.isArray(ne))for(let de=0;de<ne.length;de++){const xe=ne[de];st(xe,z,P),W.add(xe)}else st(ne,z,P),W.add(ne)}),x.pop(),_=null,W},this.compileAsync=function(T,L,z=null){const W=this.compile(T,L,z);return new Promise(P=>{function ne(){if(W.forEach(function(de){Oe.get(de).currentProgram.isReady()&&W.delete(de)}),W.size===0){P(T);return}setTimeout(ne,10)}$e.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let Dn=null;function xi(T){Dn&&Dn(T)}function cu(){gr.stop()}function fu(){gr.start()}const gr=new wh;gr.setAnimationLoop(xi),typeof self<"u"&&gr.setContext(self),this.setAnimationLoop=function(T){Dn=T,X.setAnimationLoop(T),T===null?gr.stop():gr.start()},X.addEventListener("sessionstart",cu),X.addEventListener("sessionend",fu),this.render=function(T,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(L),L=X.getCamera()),T.isScene===!0&&T.onBeforeRender(S,T,L,D),_=Je.get(T,x.length),_.init(L),x.push(_),Ne.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),$.setFromProjectionMatrix(Ne),Me=this.localClippingEnabled,ie=te.init(this.clippingPlanes,Me),g=me.get(T,y.length),g.init(),y.push(g),X.enabled===!0&&X.isPresenting===!0){const ne=S.xr.getDepthSensingMesh();ne!==null&&Nl(ne,L,-1/0,S.sortObjects)}Nl(T,L,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(se,ae),Qe=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Qe&&De.addToRenderList(g,T),this.info.render.frame++,ie===!0&&te.beginShadows();const z=_.state.shadowsArray;_e.render(z,T,L),ie===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,P=g.transmissive;if(_.setupLights(),L.isArrayCamera){const ne=L.cameras;if(P.length>0)for(let de=0,xe=ne.length;de<xe;de++){const Ee=ne[de];du(W,P,T,Ee)}Qe&&De.render(T);for(let de=0,xe=ne.length;de<xe;de++){const Ee=ne[de];uu(g,T,Ee,Ee.viewport)}}else P.length>0&&du(W,P,T,L),Qe&&De.render(T),uu(g,T,L);D!==null&&(b.updateMultisampleRenderTarget(D),b.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(S,T,L),ut.resetDefaultState(),A=-1,M=null,x.pop(),x.length>0?(_=x[x.length-1],ie===!0&&te.setGlobalState(S.clippingPlanes,_.state.camera)):_=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Nl(T,L,z,W){if(T.visible===!1)return;if(T.layers.test(L.layers)){if(T.isGroup)z=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(L);else if(T.isLight)_.pushLight(T),T.castShadow&&_.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){W&&Xe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ne);const de=Z.update(T),xe=T.material;xe.visible&&g.push(T,de,xe,z,Xe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const de=Z.update(T),xe=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Xe.copy(T.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Xe.copy(de.boundingSphere.center)),Xe.applyMatrix4(T.matrixWorld).applyMatrix4(Ne)),Array.isArray(xe)){const Ee=de.groups;for(let Ue=0,He=Ee.length;Ue<He;Ue++){const Se=Ee[Ue],tt=xe[Se.materialIndex];tt&&tt.visible&&g.push(T,de,tt,z,Xe.z,Se)}}else xe.visible&&g.push(T,de,xe,z,Xe.z,null)}}const ne=T.children;for(let de=0,xe=ne.length;de<xe;de++)Nl(ne[de],L,z,W)}function uu(T,L,z,W){const P=T.opaque,ne=T.transmissive,de=T.transparent;_.setupLightsView(z),ie===!0&&te.setGlobalState(S.clippingPlanes,z),W&&Ce.viewport(O.copy(W)),P.length>0&&ua(P,L,z),ne.length>0&&ua(ne,L,z),de.length>0&&ua(de,L,z),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function du(T,L,z,W){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[W.id]===void 0&&(_.state.transmissionRenderTarget[W.id]=new us(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?ra:Gi,minFilter:zr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const ne=_.state.transmissionRenderTarget[W.id],de=W.viewport||O;ne.setSize(de.z,de.w);const xe=S.getRenderTarget();S.setRenderTarget(ne),S.getClearColor(Y),q=S.getClearAlpha(),q<1&&S.setClearColor(16777215,.5),S.clear(),Qe&&De.render(z);const Ee=S.toneMapping;S.toneMapping=ar;const Ue=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),_.setupLightsView(W),ie===!0&&te.setGlobalState(S.clippingPlanes,W),ua(T,z,W),b.updateMultisampleRenderTarget(ne),b.updateRenderTargetMipmap(ne),$e.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Se=0,tt=L.length;Se<tt;Se++){const dt=L[Se],pt=dt.object,nn=dt.geometry,it=dt.material,Ae=dt.group;if(it.side===Vn&&pt.layers.test(W.layers)){const Ei=it.side;it.side=dn,it.needsUpdate=!0,hu(pt,z,W,nn,it,Ae),it.side=Ei,it.needsUpdate=!0,He=!0}}He===!0&&(b.updateMultisampleRenderTarget(ne),b.updateRenderTargetMipmap(ne))}S.setRenderTarget(xe),S.setClearColor(Y,q),Ue!==void 0&&(W.viewport=Ue),S.toneMapping=Ee}function ua(T,L,z){const W=L.isScene===!0?L.overrideMaterial:null;for(let P=0,ne=T.length;P<ne;P++){const de=T[P],xe=de.object,Ee=de.geometry,Ue=W===null?de.material:W,He=de.group;xe.layers.test(z.layers)&&hu(xe,L,z,Ee,Ue,He)}}function hu(T,L,z,W,P,ne){T.onBeforeRender(S,L,z,W,P,ne),T.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),P.onBeforeRender(S,L,z,W,T,ne),P.transparent===!0&&P.side===Vn&&P.forceSinglePass===!1?(P.side=dn,P.needsUpdate=!0,S.renderBufferDirect(z,L,W,P,T,ne),P.side=dr,P.needsUpdate=!0,S.renderBufferDirect(z,L,W,P,T,ne),P.side=Vn):S.renderBufferDirect(z,L,W,P,T,ne),T.onAfterRender(S,L,z,W,P,ne)}function da(T,L,z){L.isScene!==!0&&(L=xt);const W=Oe.get(T),P=_.state.lights,ne=_.state.shadowsArray,de=P.state.version,xe=Te.getParameters(T,P.state,ne,L,z),Ee=Te.getProgramCacheKey(xe);let Ue=W.programs;W.environment=T.isMeshStandardMaterial?L.environment:null,W.fog=L.fog,W.envMap=(T.isMeshStandardMaterial?G:E).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?L.environmentRotation:T.envMapRotation,Ue===void 0&&(T.addEventListener("dispose",Ge),Ue=new Map,W.programs=Ue);let He=Ue.get(Ee);if(He!==void 0){if(W.currentProgram===He&&W.lightsStateVersion===de)return mu(T,xe),He}else xe.uniforms=Te.getUniforms(T),T.onBeforeCompile(xe,S),He=Te.acquireProgram(xe,Ee),Ue.set(Ee,He),W.uniforms=xe.uniforms;const Se=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Se.clippingPlanes=te.uniform),mu(T,xe),W.needsLights=Kp(T),W.lightsStateVersion=de,W.needsLights&&(Se.ambientLightColor.value=P.state.ambient,Se.lightProbe.value=P.state.probe,Se.directionalLights.value=P.state.directional,Se.directionalLightShadows.value=P.state.directionalShadow,Se.spotLights.value=P.state.spot,Se.spotLightShadows.value=P.state.spotShadow,Se.rectAreaLights.value=P.state.rectArea,Se.ltc_1.value=P.state.rectAreaLTC1,Se.ltc_2.value=P.state.rectAreaLTC2,Se.pointLights.value=P.state.point,Se.pointLightShadows.value=P.state.pointShadow,Se.hemisphereLights.value=P.state.hemi,Se.directionalShadowMap.value=P.state.directionalShadowMap,Se.directionalShadowMatrix.value=P.state.directionalShadowMatrix,Se.spotShadowMap.value=P.state.spotShadowMap,Se.spotLightMatrix.value=P.state.spotLightMatrix,Se.spotLightMap.value=P.state.spotLightMap,Se.pointShadowMap.value=P.state.pointShadowMap,Se.pointShadowMatrix.value=P.state.pointShadowMatrix),W.currentProgram=He,W.uniformsList=null,He}function pu(T){if(T.uniformsList===null){const L=T.currentProgram.getUniforms();T.uniformsList=tl.seqWithValue(L.seq,T.uniforms)}return T.uniformsList}function mu(T,L){const z=Oe.get(T);z.outputColorSpace=L.outputColorSpace,z.batching=L.batching,z.batchingColor=L.batchingColor,z.instancing=L.instancing,z.instancingColor=L.instancingColor,z.instancingMorph=L.instancingMorph,z.skinning=L.skinning,z.morphTargets=L.morphTargets,z.morphNormals=L.morphNormals,z.morphColors=L.morphColors,z.morphTargetsCount=L.morphTargetsCount,z.numClippingPlanes=L.numClippingPlanes,z.numIntersection=L.numClipIntersection,z.vertexAlphas=L.vertexAlphas,z.vertexTangents=L.vertexTangents,z.toneMapping=L.toneMapping}function Vp(T,L,z,W,P){L.isScene!==!0&&(L=xt),b.resetTextureUnits();const ne=L.fog,de=W.isMeshStandardMaterial?L.environment:null,xe=D===null?S.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:so,Ee=(W.isMeshStandardMaterial?G:E).get(W.envMap||de),Ue=W.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,He=!!z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Se=!!z.morphAttributes.position,tt=!!z.morphAttributes.normal,dt=!!z.morphAttributes.color;let pt=ar;W.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(pt=S.toneMapping);const nn=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,it=nn!==void 0?nn.length:0,Ae=Oe.get(W),Ei=_.state.lights;if(ie===!0&&(Me===!0||T!==M)){const An=T===M&&W.id===A;te.setState(W,T,An)}let rt=!1;W.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Ei.state.version||Ae.outputColorSpace!==xe||P.isBatchedMesh&&Ae.batching===!1||!P.isBatchedMesh&&Ae.batching===!0||P.isBatchedMesh&&Ae.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&Ae.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&Ae.instancing===!1||!P.isInstancedMesh&&Ae.instancing===!0||P.isSkinnedMesh&&Ae.skinning===!1||!P.isSkinnedMesh&&Ae.skinning===!0||P.isInstancedMesh&&Ae.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Ae.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&Ae.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&Ae.instancingMorph===!1&&P.morphTexture!==null||Ae.envMap!==Ee||W.fog===!0&&Ae.fog!==ne||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==te.numPlanes||Ae.numIntersection!==te.numIntersection)||Ae.vertexAlphas!==Ue||Ae.vertexTangents!==He||Ae.morphTargets!==Se||Ae.morphNormals!==tt||Ae.morphColors!==dt||Ae.toneMapping!==pt||Ae.morphTargetsCount!==it)&&(rt=!0):(rt=!0,Ae.__version=W.version);let In=Ae.currentProgram;rt===!0&&(In=da(W,L,P));let ds=!1,pn=!1,mo=!1;const mt=In.getUniforms(),Jn=Ae.uniforms;if(Ce.useProgram(In.program)&&(ds=!0,pn=!0,mo=!0),W.id!==A&&(A=W.id,pn=!0),ds||M!==T){Ce.buffers.depth.getReversed()?(ce.copy(T.projectionMatrix),J0(ce),em(ce),mt.setValue(U,"projectionMatrix",ce)):mt.setValue(U,"projectionMatrix",T.projectionMatrix),mt.setValue(U,"viewMatrix",T.matrixWorldInverse);const Hi=mt.map.cameraPosition;Hi!==void 0&&Hi.setValue(U,Be.setFromMatrixPosition(T.matrixWorld)),Ze.logarithmicDepthBuffer&&mt.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&mt.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,pn=!0,mo=!0)}if(P.isSkinnedMesh){mt.setOptional(U,P,"bindMatrix"),mt.setOptional(U,P,"bindMatrixInverse");const An=P.skeleton;An&&(An.boneTexture===null&&An.computeBoneTexture(),mt.setValue(U,"boneTexture",An.boneTexture,b))}P.isBatchedMesh&&(mt.setOptional(U,P,"batchingTexture"),mt.setValue(U,"batchingTexture",P._matricesTexture,b),mt.setOptional(U,P,"batchingIdTexture"),mt.setValue(U,"batchingIdTexture",P._indirectTexture,b),mt.setOptional(U,P,"batchingColorTexture"),P._colorsTexture!==null&&mt.setValue(U,"batchingColorTexture",P._colorsTexture,b));const _o=z.morphAttributes;if((_o.position!==void 0||_o.normal!==void 0||_o.color!==void 0)&&Pe.update(P,z,In),(pn||Ae.receiveShadow!==P.receiveShadow)&&(Ae.receiveShadow=P.receiveShadow,mt.setValue(U,"receiveShadow",P.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Jn.envMap.value=Ee,Jn.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&L.environment!==null&&(Jn.envMapIntensity.value=L.environmentIntensity),pn&&(mt.setValue(U,"toneMappingExposure",S.toneMappingExposure),Ae.needsLights&&Xp(Jn,mo),ne&&W.fog===!0&&fe.refreshFogUniforms(Jn,ne),fe.refreshMaterialUniforms(Jn,W,V,J,_.state.transmissionRenderTarget[T.id]),tl.upload(U,pu(Ae),Jn,b)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(tl.upload(U,pu(Ae),Jn,b),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&mt.setValue(U,"center",P.center),mt.setValue(U,"modelViewMatrix",P.modelViewMatrix),mt.setValue(U,"normalMatrix",P.normalMatrix),mt.setValue(U,"modelMatrix",P.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const An=W.uniformsGroups;for(let Hi=0,zi=An.length;Hi<zi;Hi++){const _u=An[Hi];N.update(_u,In),N.bind(_u,In)}}return In}function Xp(T,L){T.ambientLightColor.needsUpdate=L,T.lightProbe.needsUpdate=L,T.directionalLights.needsUpdate=L,T.directionalLightShadows.needsUpdate=L,T.pointLights.needsUpdate=L,T.pointLightShadows.needsUpdate=L,T.spotLights.needsUpdate=L,T.spotLightShadows.needsUpdate=L,T.rectAreaLights.needsUpdate=L,T.hemisphereLights.needsUpdate=L}function Kp(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,L,z){Oe.get(T.texture).__webglTexture=L,Oe.get(T.depthTexture).__webglTexture=z;const W=Oe.get(T);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=z===void 0,W.__autoAllocateDepthBuffer||$e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,L){const z=Oe.get(T);z.__webglFramebuffer=L,z.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(T,L=0,z=0){D=T,R=L,w=z;let W=!0,P=null,ne=!1,de=!1;if(T){const Ee=Oe.get(T);if(Ee.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(U.FRAMEBUFFER,null),W=!1;else if(Ee.__webglFramebuffer===void 0)b.setupRenderTarget(T);else if(Ee.__hasExternalTextures)b.rebindTextures(T,Oe.get(T.texture).__webglTexture,Oe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Se=T.depthTexture;if(Ee.__boundDepthTexture!==Se){if(Se!==null&&Oe.has(Se)&&(T.width!==Se.image.width||T.height!==Se.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(T)}}const Ue=T.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(de=!0);const He=Oe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[L])?P=He[L][z]:P=He[L],ne=!0):T.samples>0&&b.useMultisampledRTT(T)===!1?P=Oe.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?P=He[z]:P=He,O.copy(T.viewport),H.copy(T.scissor),F=T.scissorTest}else O.copy(ve).multiplyScalar(V).floor(),H.copy(Fe).multiplyScalar(V).floor(),F=nt;if(Ce.bindFramebuffer(U.FRAMEBUFFER,P)&&W&&Ce.drawBuffers(T,P),Ce.viewport(O),Ce.scissor(H),Ce.setScissorTest(F),ne){const Ee=Oe.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+L,Ee.__webglTexture,z)}else if(de){const Ee=Oe.get(T.texture),Ue=L||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ee.__webglTexture,z||0,Ue)}A=-1},this.readRenderTargetPixels=function(T,L,z,W,P,ne,de){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(xe=xe[de]),xe){Ce.bindFramebuffer(U.FRAMEBUFFER,xe);try{const Ee=T.texture,Ue=Ee.format,He=Ee.type;if(!Ze.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ze.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=T.width-W&&z>=0&&z<=T.height-P&&U.readPixels(L,z,W,P,We.convert(Ue),We.convert(He),ne)}finally{const Ee=D!==null?Oe.get(D).__webglFramebuffer:null;Ce.bindFramebuffer(U.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(T,L,z,W,P,ne,de){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Oe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&de!==void 0&&(xe=xe[de]),xe){const Ee=T.texture,Ue=Ee.format,He=Ee.type;if(!Ze.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ze.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=T.width-W&&z>=0&&z<=T.height-P){Ce.bindFramebuffer(U.FRAMEBUFFER,xe);const Se=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Se),U.bufferData(U.PIXEL_PACK_BUFFER,ne.byteLength,U.STREAM_READ),U.readPixels(L,z,W,P,We.convert(Ue),We.convert(He),0);const tt=D!==null?Oe.get(D).__webglFramebuffer:null;Ce.bindFramebuffer(U.FRAMEBUFFER,tt);const dt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Q0(U,dt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Se),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ne),U.deleteBuffer(Se),U.deleteSync(dt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,L=null,z=0){T.isTexture!==!0&&(Oo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,T=arguments[1]);const W=Math.pow(2,-z),P=Math.floor(T.image.width*W),ne=Math.floor(T.image.height*W),de=L!==null?L.x:0,xe=L!==null?L.y:0;b.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,z,0,0,de,xe,P,ne),Ce.unbindTexture()},this.copyTextureToTexture=function(T,L,z=null,W=null,P=0){T.isTexture!==!0&&(Oo("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1],L=arguments[2],P=arguments[3]||0,z=null);let ne,de,xe,Ee,Ue,He,Se,tt,dt;const pt=T.isCompressedTexture?T.mipmaps[P]:T.image;z!==null?(ne=z.max.x-z.min.x,de=z.max.y-z.min.y,xe=z.isBox3?z.max.z-z.min.z:1,Ee=z.min.x,Ue=z.min.y,He=z.isBox3?z.min.z:0):(ne=pt.width,de=pt.height,xe=pt.depth||1,Ee=0,Ue=0,He=0),W!==null?(Se=W.x,tt=W.y,dt=W.z):(Se=0,tt=0,dt=0);const nn=We.convert(L.format),it=We.convert(L.type);let Ae;L.isData3DTexture?(b.setTexture3D(L,0),Ae=U.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(b.setTexture2DArray(L,0),Ae=U.TEXTURE_2D_ARRAY):(b.setTexture2D(L,0),Ae=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,L.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,L.unpackAlignment);const Ei=U.getParameter(U.UNPACK_ROW_LENGTH),rt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),In=U.getParameter(U.UNPACK_SKIP_PIXELS),ds=U.getParameter(U.UNPACK_SKIP_ROWS),pn=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,pt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,pt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ee),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ue),U.pixelStorei(U.UNPACK_SKIP_IMAGES,He);const mo=T.isDataArrayTexture||T.isData3DTexture,mt=L.isDataArrayTexture||L.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Jn=Oe.get(T),_o=Oe.get(L),An=Oe.get(Jn.__renderTarget),Hi=Oe.get(_o.__renderTarget);Ce.bindFramebuffer(U.READ_FRAMEBUFFER,An.__webglFramebuffer),Ce.bindFramebuffer(U.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let zi=0;zi<xe;zi++)mo&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Oe.get(T).__webglTexture,P,He+zi),T.isDepthTexture?(mt&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Oe.get(L).__webglTexture,P,dt+zi),U.blitFramebuffer(Ee,Ue,ne,de,Se,tt,ne,de,U.DEPTH_BUFFER_BIT,U.NEAREST)):mt?U.copyTexSubImage3D(Ae,P,Se,tt,dt+zi,Ee,Ue,ne,de):U.copyTexSubImage2D(Ae,P,Se,tt,dt+zi,Ee,Ue,ne,de);Ce.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else mt?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Ae,P,Se,tt,dt,ne,de,xe,nn,it,pt.data):L.isCompressedArrayTexture?U.compressedTexSubImage3D(Ae,P,Se,tt,dt,ne,de,xe,nn,pt.data):U.texSubImage3D(Ae,P,Se,tt,dt,ne,de,xe,nn,it,pt):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,P,Se,tt,ne,de,nn,it,pt.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,P,Se,tt,pt.width,pt.height,nn,pt.data):U.texSubImage2D(U.TEXTURE_2D,P,Se,tt,ne,de,nn,it,pt);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ei),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,rt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,In),U.pixelStorei(U.UNPACK_SKIP_ROWS,ds),U.pixelStorei(U.UNPACK_SKIP_IMAGES,pn),P===0&&L.generateMipmaps&&U.generateMipmap(Ae),Ce.unbindTexture()},this.copyTextureToTexture3D=function(T,L,z=null,W=null,P=0){return T.isTexture!==!0&&(Oo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,W=arguments[1]||null,T=arguments[2],L=arguments[3],P=arguments[4]||0),Oo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,L,z,W,P)},this.initRenderTarget=function(T){Oe.get(T).__webglFramebuffer===void 0&&b.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?b.setTextureCube(T,0):T.isData3DTexture?b.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?b.setTexture2DArray(T,0):b.setTexture2D(T,0),Ce.unbindTexture()},this.resetState=function(){R=0,w=0,D=null,Ce.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=et._getDrawingBufferColorSpace(e),n.unpackColorSpace=et._getUnpackColorSpace()}}class $f{constructor(e,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new we(e),this.near=n,this.far=i}clone(){return new $f(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Uh extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Fh extends mr{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const al=new C,ll=new C,_d=new gt,So=new Kf,La=new aa,lc=new C,gd=new C;class cx extends wt{constructor(e=new hn,n=new Fh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)al.fromBufferAttribute(n,r-1),ll.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=al.distanceTo(ll);e.setAttribute("lineDistance",new Ot(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,l=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),La.copy(i.boundingSphere),La.applyMatrix4(r),La.radius+=s,e.ray.intersectsSphere(La)===!1)return;_d.copy(r).invert(),So.copy(e.ray).applyMatrix4(_d);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,f=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const h=Math.max(0,l.start),m=Math.min(d.count,l.start+l.count);for(let v=h,g=m-1;v<g;v+=f){const _=d.getX(v),y=d.getX(v+1),x=Pa(this,e,So,c,_,y);x&&n.push(x)}if(this.isLineLoop){const v=d.getX(m-1),g=d.getX(h),_=Pa(this,e,So,c,v,g);_&&n.push(_)}}else{const h=Math.max(0,l.start),m=Math.min(u.count,l.start+l.count);for(let v=h,g=m-1;v<g;v+=f){const _=Pa(this,e,So,c,v,v+1);_&&n.push(_)}if(this.isLineLoop){const v=Pa(this,e,So,c,m-1,h);v&&n.push(v)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,l=r.length;s<l;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pa(t,e,n,i,r,s){const l=t.geometry.attributes.position;if(al.fromBufferAttribute(l,r),ll.fromBufferAttribute(l,s),n.distanceSqToSegment(al,ll,lc,gd)>i)return;lc.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(lc);if(!(c<e.near||c>e.far))return{distance:c,point:gd.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const vd=new C,xd=new C;class fx extends cx{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)vd.fromBufferAttribute(n,r),xd.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+vd.distanceTo(xd);e.setAttribute("lineDistance",new Ot(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bh extends mr{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ed=new gt,Sf=new Kf,Ua=new aa,Fa=new C;class ux extends wt{constructor(e=new hn,n=new Bh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,l=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ua.copy(i.boundingSphere),Ua.applyMatrix4(r),Ua.radius+=s,e.ray.intersectsSphere(Ua)===!1)return;Ed.copy(r).invert(),Sf.copy(e.ray).applyMatrix4(Ed);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,f=i.index,p=i.attributes.position;if(f!==null){const u=Math.max(0,l.start),h=Math.min(f.count,l.start+l.count);for(let m=u,v=h;m<v;m++){const g=f.getX(m);Fa.fromBufferAttribute(p,g),Sd(Fa,g,c,r,e,n,this)}}else{const u=Math.max(0,l.start),h=Math.min(p.count,l.start+l.count);for(let m=u,v=h;m<v;m++)Fa.fromBufferAttribute(p,m),Sd(Fa,m,c,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,l=r.length;s<l;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Sd(t,e,n,i,r,s,l){const a=Sf.distanceSqToPoint(t);if(a<n){const c=new C;Sf.closestPointToPoint(t,c),c.applyMatrix4(i);const f=r.ray.origin.distanceTo(c);if(f<r.near||f>r.far)return;s.push({distance:f,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:l})}}class Gh extends tn{constructor(e,n,i,r,s,l,a,c,f){super(e,n,i,r,s,l,a,c,f),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zf extends hn{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],l=[];a(r),f(i),d(),this.setAttribute("position",new Ot(s,3)),this.setAttribute("normal",new Ot(s.slice(),3)),this.setAttribute("uv",new Ot(l,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const x=new C,S=new C,I=new C;for(let R=0;R<n.length;R+=3)h(n[R+0],x),h(n[R+1],S),h(n[R+2],I),c(x,S,I,y)}function c(y,x,S,I){const R=I+1,w=[];for(let D=0;D<=R;D++){w[D]=[];const A=y.clone().lerp(S,D/R),M=x.clone().lerp(S,D/R),O=R-D;for(let H=0;H<=O;H++)H===0&&D===R?w[D][H]=A:w[D][H]=A.clone().lerp(M,H/O)}for(let D=0;D<R;D++)for(let A=0;A<2*(R-D)-1;A++){const M=Math.floor(A/2);A%2===0?(u(w[D][M+1]),u(w[D+1][M]),u(w[D][M])):(u(w[D][M+1]),u(w[D+1][M+1]),u(w[D+1][M]))}}function f(y){const x=new C;for(let S=0;S<s.length;S+=3)x.x=s[S+0],x.y=s[S+1],x.z=s[S+2],x.normalize().multiplyScalar(y),s[S+0]=x.x,s[S+1]=x.y,s[S+2]=x.z}function d(){const y=new C;for(let x=0;x<s.length;x+=3){y.x=s[x+0],y.y=s[x+1],y.z=s[x+2];const S=g(y)/2/Math.PI+.5,I=_(y)/Math.PI+.5;l.push(S,1-I)}m(),p()}function p(){for(let y=0;y<l.length;y+=6){const x=l[y+0],S=l[y+2],I=l[y+4],R=Math.max(x,S,I),w=Math.min(x,S,I);R>.9&&w<.1&&(x<.2&&(l[y+0]+=1),S<.2&&(l[y+2]+=1),I<.2&&(l[y+4]+=1))}}function u(y){s.push(y.x,y.y,y.z)}function h(y,x){const S=y*3;x.x=e[S+0],x.y=e[S+1],x.z=e[S+2]}function m(){const y=new C,x=new C,S=new C,I=new C,R=new Ye,w=new Ye,D=new Ye;for(let A=0,M=0;A<s.length;A+=9,M+=6){y.set(s[A+0],s[A+1],s[A+2]),x.set(s[A+3],s[A+4],s[A+5]),S.set(s[A+6],s[A+7],s[A+8]),R.set(l[M+0],l[M+1]),w.set(l[M+2],l[M+3]),D.set(l[M+4],l[M+5]),I.copy(y).add(x).add(S).divideScalar(3);const O=g(I);v(R,M+0,y,O),v(w,M+2,x,O),v(D,M+4,S,O)}}function v(y,x,S,I){I<0&&y.x===1&&(l[x]=y.x-1),S.x===0&&S.z===0&&(l[x]=I/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function _(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zf(e.vertices,e.indices,e.radius,e.details)}}const Ba=new C,Ga=new C,cc=new C,Ha=new wn;class dx extends hn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const r=Math.pow(10,4),s=Math.cos(Xs*n),l=e.getIndex(),a=e.getAttribute("position"),c=l?l.count:a.count,f=[0,0,0],d=["a","b","c"],p=new Array(3),u={},h=[];for(let m=0;m<c;m+=3){l?(f[0]=l.getX(m),f[1]=l.getX(m+1),f[2]=l.getX(m+2)):(f[0]=m,f[1]=m+1,f[2]=m+2);const{a:v,b:g,c:_}=Ha;if(v.fromBufferAttribute(a,f[0]),g.fromBufferAttribute(a,f[1]),_.fromBufferAttribute(a,f[2]),Ha.getNormal(cc),p[0]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,p[1]=`${Math.round(g.x*r)},${Math.round(g.y*r)},${Math.round(g.z*r)}`,p[2]=`${Math.round(_.x*r)},${Math.round(_.y*r)},${Math.round(_.z*r)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let y=0;y<3;y++){const x=(y+1)%3,S=p[y],I=p[x],R=Ha[d[y]],w=Ha[d[x]],D=`${S}_${I}`,A=`${I}_${S}`;A in u&&u[A]?(cc.dot(u[A].normal)<=s&&(h.push(R.x,R.y,R.z),h.push(w.x,w.y,w.z)),u[A]=null):D in u||(u[D]={index0:f[y],index1:f[x],normal:cc.clone()})}}for(const m in u)if(u[m]){const{index0:v,index1:g}=u[m];Ba.fromBufferAttribute(a,v),Ga.fromBufferAttribute(a,g),h.push(Ba.x,Ba.y,Ba.z),h.push(Ga.x,Ga.y,Ga.z)}this.setAttribute("position",new Ot(h,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class cl extends Zf{constructor(e=1,n=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,n),this.type="OctahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new cl(e.radius,e.detail)}}class jf extends hn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,l=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:l,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(l+a,Math.PI);let f=0;const d=[],p=new C,u=new C,h=[],m=[],v=[],g=[];for(let _=0;_<=i;_++){const y=[],x=_/i;let S=0;_===0&&l===0?S=.5/n:_===i&&c===Math.PI&&(S=-.5/n);for(let I=0;I<=n;I++){const R=I/n;p.x=-e*Math.cos(r+R*s)*Math.sin(l+x*a),p.y=e*Math.cos(l+x*a),p.z=e*Math.sin(r+R*s)*Math.sin(l+x*a),m.push(p.x,p.y,p.z),u.copy(p).normalize(),v.push(u.x,u.y,u.z),g.push(R+S,1-x),y.push(f++)}d.push(y)}for(let _=0;_<i;_++)for(let y=0;y<n;y++){const x=d[_][y+1],S=d[_][y],I=d[_+1][y],R=d[_+1][y+1];(_!==0||l>0)&&h.push(x,S,R),(_!==i-1||c<Math.PI)&&h.push(S,I,R)}this.setIndex(h),this.setAttribute("position",new Ot(m,3)),this.setAttribute("normal",new Ot(v,3)),this.setAttribute("uv",new Ot(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jf(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ct extends mr{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vf,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ye extends mr{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vf,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Ff,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rl extends wt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class hx extends Rl{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const fc=new gt,Md=new C,yd=new C;class Hh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qf,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Md.setFromMatrixPosition(e.matrixWorld),n.position.copy(Md),yd.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(yd),n.updateMatrixWorld(),fc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fc),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Td=new gt,Mo=new C,uc=new C;class px extends Hh{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ye(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,n=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),Mo.setFromMatrixPosition(e.matrixWorld),i.position.copy(Mo),uc.copy(i.position),uc.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(uc),i.updateMatrixWorld(),r.makeTranslation(-Mo.x,-Mo.y,-Mo.z),Td.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Td)}}class mx extends Rl{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new px}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class _x extends Hh{constructor(){super(new Oh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zh extends Rl{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new _x}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Wh extends Rl{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uf);let Rs=null;function vt(){if(!Rs){const t=window.AudioContext||window.webkitAudioContext;t&&(Rs=new t)}return Rs&&Rs.state==="suspended"&&Rs.resume(),Rs}if(typeof window<"u"){const t=()=>{vt(),window.removeEventListener("click",t),window.removeEventListener("keydown",t)};window.addEventListener("click",t),window.addEventListener("keydown",t)}function kh(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="triangle",n.frequency.setValueAtTime(140,e),n.frequency.exponentialRampToValueAtTime(320,e+.12),i.gain.setValueAtTime(.2,e),i.gain.exponentialRampToValueAtTime(.01,e+.12),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.12)}function gx(t){const e=vt();if(!e)return;const n=e.currentTime,i=e.createOscillator(),r=e.createGain();i.type="sine",t?(i.frequency.setValueAtTime(300,n),i.frequency.exponentialRampToValueAtTime(750,n+.18)):(i.frequency.setValueAtTime(600,n),i.frequency.exponentialRampToValueAtTime(200,n+.18)),r.gain.setValueAtTime(.22,n),r.gain.exponentialRampToValueAtTime(.01,n+.2),i.connect(r),r.connect(e.destination),i.start(n),i.stop(n+.2)}function vx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.sampleRate*.08,i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let c=0;c<n;c++)r[c]=(Math.random()*2-1)*Math.exp(-c/(n*.3));const s=t.createBufferSource();s.buffer=i;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(800,e),l.frequency.exponentialRampToValueAtTime(150,e+.08);const a=t.createGain();a.gain.setValueAtTime(.35,e),a.gain.exponentialRampToValueAtTime(.01,e+.08),s.connect(l),l.connect(a),a.connect(t.destination),s.start(e)}function dc(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(220,e),n.frequency.exponentialRampToValueAtTime(80,e+.07),i.gain.setValueAtTime(.28,e),i.gain.exponentialRampToValueAtTime(.01,e+.07),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.07)}function xx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sawtooth",n.frequency.setValueAtTime(160,e),n.frequency.exponentialRampToValueAtTime(60,e+.15),i.gain.setValueAtTime(.3,e),i.gain.exponentialRampToValueAtTime(.01,e+.15),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.15)}function Vh(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(450,e),n.frequency.exponentialRampToValueAtTime(120,e+.1),i.gain.setValueAtTime(.25,e),i.gain.exponentialRampToValueAtTime(.01,e+.1),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.1)}function Ex(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="triangle",n.frequency.setValueAtTime(280,e),n.frequency.exponentialRampToValueAtTime(80,e+.14),i.gain.setValueAtTime(.35,e),i.gain.exponentialRampToValueAtTime(.01,e+.14),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.14)}function Sx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sawtooth",n.frequency.setValueAtTime(95,e),n.frequency.linearRampToValueAtTime(80,e+.25),n.frequency.exponentialRampToValueAtTime(50,e+.5),i.gain.setValueAtTime(.22,e),i.gain.exponentialRampToValueAtTime(.01,e+.5),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.5)}function Mx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="triangle",n.frequency.setValueAtTime(320,e),n.frequency.linearRampToValueAtTime(250,e+.08),n.frequency.linearRampToValueAtTime(360,e+.18),i.gain.setValueAtTime(.25,e),i.gain.exponentialRampToValueAtTime(.01,e+.18),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.18)}function Rt(t=!0){const e=vt();if(!e)return;const n=e.currentTime,i=e.createOscillator(),r=e.createGain();i.type="sine",t?(i.frequency.setValueAtTime(260,n),i.frequency.exponentialRampToValueAtTime(420,n+.08)):(i.frequency.setValueAtTime(420,n),i.frequency.exponentialRampToValueAtTime(260,n+.08)),r.gain.setValueAtTime(.2,n),r.gain.exponentialRampToValueAtTime(.01,n+.08),i.connect(r),r.connect(e.destination),i.start(n),i.stop(n+.08)}function yx(t=!0){Rt(t)}function Xh(t=1){const e=vt();if(!e)return;const n=e.currentTime,i=e.createOscillator(),r=e.createGain();i.type="triangle";const s=t===3||t===8||t===9||t===13?280:180;i.frequency.setValueAtTime(s,n),i.frequency.exponentialRampToValueAtTime(60,n+.03),r.gain.setValueAtTime(.06,n),r.gain.exponentialRampToValueAtTime(.001,n+.03),i.connect(r),r.connect(e.destination),i.start(n),i.stop(n+.03)}function Tx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(440,e),n.frequency.exponentialRampToValueAtTime(880,e+.09),i.gain.setValueAtTime(.22,e),i.gain.exponentialRampToValueAtTime(.01,e+.09),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.09)}function yn(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createOscillator(),r=t.createGain();n.type="triangle",i.type="sine",n.frequency.setValueAtTime(523.25,e),n.frequency.setValueAtTime(659.25,e+.07),i.frequency.setValueAtTime(783.99,e+.07),r.gain.setValueAtTime(.25,e),r.gain.exponentialRampToValueAtTime(.01,e+.22),n.connect(r),i.connect(r),r.connect(t.destination),n.start(e),i.start(e+.07),n.stop(e+.22),i.stop(e+.22)}function Ax(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sawtooth",n.frequency.setValueAtTime(550,e),n.frequency.exponentialRampToValueAtTime(160,e+.14),i.gain.setValueAtTime(.3,e),i.gain.exponentialRampToValueAtTime(.01,e+.14),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.14)}function Kh(){const t=vt();if(!t)return;const e=t.currentTime,n=Math.floor(t.sampleRate*.45),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let c=0;c<n;c++)r[c]=(Math.random()*2-1)*.7;const s=t.createBufferSource();s.buffer=i;const l=t.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(3200,e),l.Q.setValueAtTime(4,e);const a=t.createGain();a.gain.setValueAtTime(.25,e),a.gain.exponentialRampToValueAtTime(.01,e+.45),s.connect(l),l.connect(a),a.connect(t.destination),s.start(e)}function bx(){const t=vt();if(!t)return;const e=t.currentTime,n=Math.floor(t.sampleRate*.85),i=t.createBuffer(1,n,t.sampleRate),r=i.getChannelData(0);for(let d=0;d<n;d++)r[d]=(Math.random()*2-1)*Math.exp(-d/(n*.4));const s=t.createBufferSource();s.buffer=i;const l=t.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(450,e),l.frequency.exponentialRampToValueAtTime(40,e+.85);const a=t.createGain();a.gain.setValueAtTime(.7,e),a.gain.exponentialRampToValueAtTime(.001,e+.85),s.connect(l),l.connect(a),a.connect(t.destination),s.start(e);const c=t.createOscillator(),f=t.createGain();c.type="sine",c.frequency.setValueAtTime(120,e),c.frequency.exponentialRampToValueAtTime(25,e+.5),f.gain.setValueAtTime(.6,e),f.gain.exponentialRampToValueAtTime(.01,e+.5),c.connect(f),f.connect(t.destination),c.start(e),c.stop(e+.5)}function Rx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="triangle",n.frequency.setValueAtTime(280,e),n.frequency.exponentialRampToValueAtTime(90,e+.08),i.gain.setValueAtTime(.2,e),i.gain.exponentialRampToValueAtTime(.01,e+.08),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.08)}function qh(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sawtooth",n.frequency.setValueAtTime(240,e),n.frequency.linearRampToValueAtTime(210,e+.35);const r=t.createBiquadFilter();r.type="lowpass",r.frequency.setValueAtTime(700,e),r.frequency.linearRampToValueAtTime(450,e+.35),i.gain.setValueAtTime(.14,e),i.gain.exponentialRampToValueAtTime(.01,e+.35),n.connect(r),r.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.35)}function wx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(320,e),n.frequency.exponentialRampToValueAtTime(160,e+.6),i.gain.setValueAtTime(.25,e),i.gain.exponentialRampToValueAtTime(.001,e+.6),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.6)}function Ox(t){const e=vt();if(!e)return;const n=e.currentTime,i=e.sampleRate*.05,r=e.createBuffer(1,i,e.sampleRate),s=r.getChannelData(0);for(let f=0;f<i;f++)s[f]=(Math.random()*2-1)*Math.exp(-f/(i*.35));const l=e.createBufferSource();l.buffer=r;const a=e.createBiquadFilter(),c=e.createGain();t===3||t===13||t===28||t===36||t===37?(a.type="bandpass",a.frequency.setValueAtTime(1100,n),a.Q.value=3,c.gain.setValueAtTime(.16,n)):t===6||t===12||t===16||t===20?(a.type="lowpass",a.frequency.setValueAtTime(320,n),c.gain.setValueAtTime(.18,n)):t===4||t===2||t===33?(a.type="lowpass",a.frequency.setValueAtTime(550,n),c.gain.setValueAtTime(.12,n)):t===31||t===32?(a.type="bandpass",a.frequency.setValueAtTime(800,n),a.Q.value=1.8,c.gain.setValueAtTime(.15,n)):(a.type="lowpass",a.frequency.setValueAtTime(450,n),c.gain.setValueAtTime(.13,n)),c.gain.exponentialRampToValueAtTime(.001,n+.05),l.connect(a),a.connect(c),c.connect(e.destination),l.start(n)}function Cx(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="sine",n.frequency.setValueAtTime(2400,e),n.frequency.exponentialRampToValueAtTime(800,e+.06),i.gain.setValueAtTime(.3,e),i.gain.exponentialRampToValueAtTime(.01,e+.06),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.06);const r=t.sampleRate*.15,s=t.createBuffer(1,r,t.sampleRate),l=s.getChannelData(0);for(let d=0;d<r;d++)l[d]=(Math.random()*2-1)*Math.exp(-d/(r*.4));const a=t.createBufferSource();a.buffer=s;const c=t.createBiquadFilter();c.type="bandpass",c.frequency.setValueAtTime(1400,e),c.frequency.exponentialRampToValueAtTime(300,e+.15);const f=t.createGain();f.gain.setValueAtTime(.2,e),f.gain.exponentialRampToValueAtTime(.01,e+.15),a.connect(c),c.connect(f),f.connect(t.destination),a.start(e+.02)}function Yh(){const t=vt();if(!t)return;const e=t.currentTime,n=t.createOscillator(),i=t.createGain();n.type="triangle",n.frequency.setValueAtTime(880,e),n.frequency.exponentialRampToValueAtTime(1400,e+.08),i.gain.setValueAtTime(.3,e),i.gain.exponentialRampToValueAtTime(.01,e+.12),n.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.12)}let hc=20;const Ad=[261.63,293.66,329.63,392,440,523.25,587.33,659.25];function Dx(t){hc-=t,hc<=0&&(hc=65+Math.random()*45,Ix())}function Ix(){const t=vt();if(!t)return;const e=4+Math.floor(Math.random()*3);let n=t.currentTime;for(let i=0;i<e;i++){const r=Ad[Math.floor(Math.random()*Ad.length)],s=1.6+Math.random()*1.2,l=t.createOscillator(),a=t.createGain();l.type="sine",l.frequency.setValueAtTime(r,n),a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(.04,n+.3),a.gain.exponentialRampToValueAtTime(.001,n+s),l.connect(a),a.connect(t.destination),l.start(n),l.stop(n+s),n+=.8+Math.random()*.6}}const cn={TITLE_SCREEN:"title_screen",PLAYING:"playing",PAUSED:"paused"},yt={NONE:"none",INVENTORY:"inventory",CRAFTING_TABLE:"crafting_table",FURNACE:"furnace",CHEST:"chest",RECIPE_BOOK:"recipe_book",CONTROLS:"controls",SETTINGS:"settings"};let co=cn.TITLE_SCREEN,eo=yt.NONE,ea=null;function Nx(t){ea=t}function Do(){return co}function wl(t){co=t}function Lx(){return co===cn.TITLE_SCREEN}function Px(){return co===cn.PAUSED}function $h(t){return eo===t}function Bo(){return eo!==yt.NONE}function fo(t){eo=t,document.pointerLockElement&&document.exitPointerLock()}function Ui(t=null){t&&eo!==t||(eo=yt.NONE,co===cn.PLAYING&&ea&&ea.requestPointerLock())}function Ux(){eo=yt.NONE,co===cn.PLAYING&&ea&&ea.requestPointerLock()}let rn=null,gn=null,Ps=null,Mf=!1;const er={renderDistance:5,fov:75,mouseSensitivity:1};function Fx(t){Ps=t||document.querySelector("canvas"),Nx(Ps),document.getElementById("title-screen"),document.getElementById("pause-menu"),rn=document.getElementById("modal-controls"),gn=document.getElementById("modal-settings"),window.startGame=bd,window.resumeGame=pc,window.returnToMainMenu=wd,window.openControls=()=>ws(rn),window.openSettings=()=>ws(gn);const e=["Cavernas 3D & Entradas Naturais!","Fornalha e Fundição de Ferro!","Armaduras, Esqueletos e Aranhas!","Mundo infinito com Biomas!","Construa e explore em 60 FPS!","Receitas reais de sobrevivência!"],n=document.getElementById("splash-text");n&&(n.textContent=e[Math.floor(Math.random()*e.length)]);const i=document.getElementById("btn-play");i&&i.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation();try{kh()}catch{}bd()});const r=document.getElementById("btn-controls");r&&r.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),ws(rn)});const s=document.getElementById("btn-settings");s&&s.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),ws(gn)});const l=document.getElementById("btn-close-controls");l&&l.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),rn&&(rn.style.display="none"),Ui(yt.CONTROLS)});const a=document.getElementById("btn-close-settings");a&&a.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),gn&&(gn.style.display="none"),Ui(yt.SETTINGS)});const c=document.getElementById("btn-resume");c&&c.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),pc()});const f=document.getElementById("btn-pause-controls");f&&f.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),ws(rn)});const d=document.getElementById("btn-pause-settings")||document.getElementById("btn-pause-options");d&&d.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),ws(gn)});const p=document.getElementById("btn-quit-menu")||document.getElementById("btn-exit-main");p&&p.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation(),wd()});const u=document.getElementById("setting-fov"),h=document.getElementById("fov-val");u&&h&&u.addEventListener("input",x=>{er.fov=parseInt(x.target.value,10),h.textContent=`${er.fov}°`});const m=document.getElementById("setting-distance"),v=document.getElementById("distance-val");m&&v&&m.addEventListener("input",x=>{er.renderDistance=parseInt(x.target.value,10),v.textContent=`${er.renderDistance} Chunks`});const g=document.getElementById("setting-sens"),_=document.getElementById("sens-val");g&&_&&g.addEventListener("input",x=>{er.mouseSensitivity=parseFloat(x.target.value),_.textContent=`${er.mouseSensitivity.toFixed(1)}x`}),document.addEventListener("pointerlockchange",()=>{const x=document.pointerLockElement===(Ps||document.querySelector("canvas"));Mf&&!x&&Do()===cn.PLAYING&&!Bo()&&Rd(),Mf=x}),window.addEventListener("keydown",x=>{if(x.code==="Escape"){if(rn&&rn.style.display==="flex"){rn.style.display="none",Ui(yt.CONTROLS);return}if(gn&&gn.style.display==="flex"){gn.style.display="none",Ui(yt.SETTINGS);return}if(Bo()){Ux();return}Do()===cn.PLAYING?(document.exitPointerLock(),Rd()):Do()===cn.PAUSED&&pc()}});const y=Ps||document.querySelector("canvas");y&&y.addEventListener("click",()=>{if(Do()===cn.PLAYING&&!Bo()&&!document.pointerLockElement)try{y.requestPointerLock()}catch{}})}function ws(t){t&&(t.style.display="flex",fo(t===rn?yt.CONTROLS:yt.SETTINGS))}function bd(){wl(cn.PLAYING);const t=document.getElementById("title-screen");t&&(t.style.display="none",t.style.pointerEvents="none",t.style.visibility="hidden",t.style.opacity="0");const e=document.getElementById("pause-menu");e&&(e.style.display="none");const n=document.getElementById("crosshair");n&&(n.style.display="block");const i=document.getElementById("controls-hint");i&&(i.style.display="block");const r=Ps||document.querySelector("canvas");if(r&&typeof r.requestPointerLock=="function")try{const s=r.requestPointerLock();s&&typeof s.catch=="function"&&s.catch(()=>{})}catch{}}function Rd(){if(Do()===cn.TITLE_SCREEN)return;wl(cn.PAUSED);const t=document.getElementById("pause-menu");t&&(t.style.display="flex");const e=document.getElementById("crosshair");e&&(e.style.display="none");const n=document.getElementById("controls-hint");n&&(n.style.display="none")}function pc(){wl(cn.PLAYING);const t=document.getElementById("pause-menu");t&&(t.style.display="none"),rn&&(rn.style.display="none"),gn&&(gn.style.display="none");const e=document.getElementById("crosshair");e&&(e.style.display="block");const n=document.getElementById("controls-hint");n&&(n.style.display="block");const i=Ps||document.querySelector("canvas");if(i&&typeof i.requestPointerLock=="function")try{const r=i.requestPointerLock();r&&typeof r.catch=="function"&&r.catch(()=>{})}catch{}}function wd(){wl(cn.TITLE_SCREEN),Mf=!1;const t=document.getElementById("pause-menu");t&&(t.style.display="none"),rn&&(rn.style.display="none"),gn&&(gn.style.display="none");const e=document.getElementById("title-screen");e&&(e.style.display="flex",e.style.pointerEvents="auto",e.style.visibility="visible",e.style.opacity="1");const n=document.getElementById("crosshair");n&&(n.style.display="none");const i=document.getElementById("controls-hint");i&&(i.style.display="none")}const Bx=.0022,Od=1.55,os={FIRST_PERSON:0,THIRD_PERSON_BACK:1,THIRD_PERSON_FRONT:2};let jt=null,ai=0,sn=-.15,yf=!1,lr=os.FIRST_PERSON;function Gx(t,e={x:0,y:20,z:0}){return jt=new an(er.fov||75,t,.05,500),jt.rotation.order="YXZ",jt.position.set(e.x,e.y,e.z),jt.rotation.set(sn,ai,0),jt}function Hx(t){document.addEventListener("pointerlockchange",()=>{yf=document.pointerLockElement===t}),document.addEventListener("mousemove",e=>{if(!yf||!jt||Math.abs(e.movementX)>250||Math.abs(e.movementY)>250)return;const n=Bx*(er.mouseSensitivity||1);ai-=e.movementX*n,sn-=e.movementY*n,sn=Math.max(-Od,Math.min(Od,sn)),lr!==os.THIRD_PERSON_FRONT&&jt.rotation.set(sn,ai,0)})}function la(){return jt}function ca(){return yf}function Cd(){return ai}function zx(){return sn}function Zh(){return lr}function Wx(){return lr=(lr+1)%3,lr}function kx(t,e=1.62,n=null){if(!jt)return;const i=t.x,r=t.y+e,s=t.z;if(lr===os.FIRST_PERSON)jt.position.set(i,r,s),jt.rotation.set(sn,ai,0);else if(lr===os.THIRD_PERSON_BACK){const a=-Math.sin(ai)*Math.cos(sn),c=Math.sin(sn),f=-Math.cos(ai)*Math.cos(sn);let d=3.4;if(n)for(let u=1;u<=16;u++){const h=u/16*3.4,m=i-a*h,v=r-c*h,g=s-f*h;if(n(Math.floor(m),Math.floor(v),Math.floor(g))){d=Math.max(.4,(u-1)/16*3.4);break}}jt.position.set(i-a*d,r-c*d,s-f*d),jt.rotation.set(sn,ai,0)}else if(lr===os.THIRD_PERSON_FRONT){const a=-Math.sin(ai)*Math.cos(sn),c=Math.sin(sn),f=-Math.cos(ai)*Math.cos(sn);let d=3;if(n)for(let u=1;u<=16;u++){const h=u/16*3,m=i+a*h,v=r+c*h,g=s+f*h;if(n(Math.floor(m),Math.floor(v),Math.floor(g))){d=Math.max(.4,(u-1)/16*3);break}}jt.position.set(i+a*d,r+c*d+.15,s+f*d),jt.lookAt(i,r-.1,s)}}let jh=!1,Tf=0,Af=null,bf=null;function Qh(t){if(!jh)return;const e=Math.min((t-Tf)/1e3,.1);Tf=t,Af&&Af(e,t/1e3),bf&&bf(e),requestAnimationFrame(Qh)}function Vx(t,e){Af=t,bf=e,jh=!0,Tf=performance.now(),requestAnimationFrame(Qh)}let vn=null,tr=null;function Xx(){return vn=new Ph({antialias:!0}),vn.domElement.id="game-canvas",vn.setSize(window.innerWidth,window.innerHeight),vn.setPixelRatio(Math.min(window.devicePixelRatio,2)),vn.setClearColor(7911912),vn.shadowMap.enabled=!1,document.body.appendChild(vn.domElement),window.addEventListener("resize",()=>{vn.setSize(window.innerWidth,window.innerHeight)}),vn}let Rf=null,wf=null,nl=null;function Kx(){return tr=new Uh,Rf=new hx(8900331,5596723,.6),tr.add(Rf),wf=new Wh(16777215,.3),tr.add(wf),nl=new zh(16774624,1),nl.position.set(80,120,50),tr.add(nl),tr.fog=new $f(7911912,50,160),tr}function qx(){return{hemiLight:Rf,ambientLight:wf,dirLight:nl}}function Yx(t){vn&&tr&&t&&vn.render(tr,t)}function Jh(){return vn?vn.domElement:null}function $x(t){window.addEventListener("resize",()=>{t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix()})}const as=16;function St(t){let e=t|0;return()=>(e=e*1103515245+12345&2147483647,e/2147483647)}function Zx(t){const e=document.createElement("canvas");e.width=as,e.height=as;const n=e.getContext("2d");return t(n,as),e}function ft(t,e,n,i,r,s){const l=St(s);t.fillStyle=n,t.fillRect(0,0,e,e);for(let a=0;a<e;a++)for(let c=0;c<e;c++)if(l()<r){const f=Math.floor(l()*i.length);t.fillStyle=i[f],t.fillRect(c,a,1,1)}}function jx(t,e){ft(t,e,"#5ba638",["#4f9430","#6bc043","#458528","#75cc4a"],.4,101);const n=St(202);for(let i=0;i<2;i++){const r=Math.floor(n()*(e-2))+1,s=Math.floor(n()*(e-2))+1;t.fillStyle="#f6e05e",t.fillRect(r,s,1,1)}}function Qx(t,e){ft(t,e,"#86652d",["#775924","#957134","#664c1e","#a37d3a"],.35,301);const n=St(302);for(let i=0;i<5;i++)for(let r=0;r<e;r++)i<2?(t.fillStyle=n()>.3?"#5ba638":"#4f9430",t.fillRect(r,i,1,1)):i<3?n()>.35&&(t.fillStyle=n()>.5?"#5ba638":"#4f9430",t.fillRect(r,i,1,1)):i<4&&n()>.65&&(t.fillStyle="#458528",t.fillRect(r,i,1,1))}function Jx(t,e){ft(t,e,"#86652d",["#775924","#957134","#664c1e","#a37d3a","#584117"],.4,401);const n=St(402);for(let i=0;i<3;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*(e-1));t.fillStyle="#584117",t.fillRect(r,s,2,1)}}function uo(t,e){ft(t,e,"#828282",["#737373","#919191","#656565","#9e9e9e","#595959"],.45,501);const n=St(502);for(let i=0;i<4;i++){const r=Math.floor(n()*(e-3)),s=Math.floor(n()*e);t.fillStyle="#505050",t.fillRect(r,s,2+Math.floor(n()*2),1)}}function eE(t,e){ft(t,e,"#e5d38a",["#dac67c","#eedd98","#cfbc6f","#f5e6a4","#c5b161"],.45,601)}function tE(t,e){ft(t,e,"#f5f7fa",["#e9ecf2","#ffffff","#dfe3ec","#edf0f7"],.35,701);const n=St(702);for(let i=0;i<3;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*e);t.fillStyle="#cbd5e1",t.fillRect(r,s,2,1)}}function nE(t,e){ft(t,e,"#86652d",["#775924","#957134","#664c1e"],.35,1401);const n=St(1402);for(let i=0;i<4;i++)for(let r=0;r<e;r++)i<2?(t.fillStyle="#f5f7fa",t.fillRect(r,i,1,1)):i<3?n()>.3&&(t.fillStyle="#e9ecf2",t.fillRect(r,i,1,1)):n()>.7&&(t.fillStyle="#dfe3ec",t.fillRect(r,i,1,1))}function iE(t,e){t.fillStyle="#888888",t.fillRect(0,0,e,e),t.fillStyle="#555555",t.fillRect(0,3,e,1),t.fillRect(0,7,e,1),t.fillRect(0,11,e,1),t.fillRect(0,15,e,1);for(let i=0;i<4;i++){const r=i%2===0?0:8,s=i*4;t.fillRect(r,s,1,4),t.fillRect(r+8,s,1,4)}const n=St(801);for(let i=0;i<e;i++)for(let r=0;r<e;r++)n()<.2&&(t.fillStyle=n()>.5?"#9e9e9e":"#737373",t.fillRect(r,i,1,1))}function rE(t,e){ft(t,e,"#6b4524",["#5a391d","#7c512c","#4e3016","#8d5c32"],.35,901);for(let n=0;n<e;n+=3)t.fillStyle="#472c14",t.fillRect(n,0,1,e)}function sE(t,e){t.fillStyle="#c5a368",t.fillRect(0,0,e,e),t.fillStyle="#6b4524",t.fillRect(0,0,e,2),t.fillRect(0,14,e,2),t.fillRect(0,0,2,e),t.fillRect(14,0,2,e);const n=7.5,i=7.5,r=[2,4,6];t.fillStyle="#9e804f";for(const s of r)for(let l=0;l<e;l++)for(let a=0;a<e;a++){const c=Math.hypot(a-n,l-i);Math.abs(c-s)<.65&&t.fillRect(a,l,1,1)}t.fillStyle="#7a6036",t.fillRect(7,7,2,2)}function oE(t,e){ft(t,e,"#3c8524",["#2f6d1b","#4fa631","#245614","#5dbd3c","#1b400e"],.5,1001);const n=St(1002);for(let i=0;i<5;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*(e-1));t.fillStyle="#1b400e",t.fillRect(r,s,1,1)}}function aE(t,e){uo(t,e);const n=St(1101);for(let i=0;i<4;i++){const r=2+Math.floor(n()*(e-5)),s=2+Math.floor(n()*(e-5));t.fillStyle="#222222",t.fillRect(r,s,2,2),t.fillStyle="#111111",t.fillRect(r+1,s+1,1,1)}}function lE(t,e){uo(t,e);const n=St(1201);for(let i=0;i<4;i++){const r=2+Math.floor(n()*(e-5)),s=2+Math.floor(n()*(e-5));t.fillStyle="#d4a373",t.fillRect(r,s,2,2),t.fillStyle="#faedcd",t.fillRect(r,s,1,1)}}function cE(t,e){ft(t,e,"#2c75d8",["#2565bf","#3b86e8","#1e52a0","#4a95f5"],.4,1301);const n=St(1302);for(let i=0;i<3;i++){const r=Math.floor(n()*(e-3)),s=Math.floor(n()*e);t.fillStyle="#8bc3f7",t.fillRect(r,s,3,1)}}function fE(t,e){ft(t,e,"#15803d",["#166534","#14532d","#22c55e"],.4,1501),t.fillStyle="#14532d",t.fillRect(7,7,2,2)}function uE(t,e){ft(t,e,"#15803d",["#166534","#15803d","#22c55e","#14532d"],.35,1601);const n=St(1602);for(let i=0;i<e;i+=4)t.fillStyle="#14532d",t.fillRect(i,0,1,e);for(let i=0;i<6;i++){const r=Math.floor(n()*(e-2))+1,s=Math.floor(n()*(e-2))+1;t.fillStyle="#fef08a",t.fillRect(r,s,1,1)}}function _r(t,e){ft(t,e,"#b45309",["#92400e","#78350f","#d97706","#a16207"],.35,1701),t.fillStyle="#451a03",t.fillRect(0,3,e,1),t.fillRect(0,7,e,1),t.fillRect(0,11,e,1),t.fillRect(0,15,e,1),t.fillRect(5,0,1,3),t.fillRect(11,4,1,3),t.fillRect(4,8,1,3),t.fillRect(12,12,1,3)}function ho(t,e){ft(t,e,"#64748b",["#475569","#334155","#94a3b8","#1e293b"],.45,1801);const n=St(1802);t.fillStyle="#1e293b";for(let i=0;i<5;i++){const r=Math.floor(n()*(e-4)),s=Math.floor(n()*(e-4));t.fillRect(r,s,3,2)}}function dE(t,e){t.clearRect(0,0,e,e),t.fillStyle="#15803d",t.fillRect(7,7,2,9),t.fillRect(5,11,2,2),t.fillRect(9,9,2,2),t.fillStyle="#dc2626",t.fillRect(6,3,4,4),t.fillStyle="#ef4444",t.fillRect(7,2,2,1),t.fillRect(5,4,1,2),t.fillRect(10,4,1,2),t.fillStyle="#450a0a",t.fillRect(7,4,2,2)}function hE(t,e){t.clearRect(0,0,e,e),t.fillStyle="#15803d",t.fillRect(7,6,2,10),t.fillRect(5,10,2,2),t.fillRect(9,12,2,2),t.fillStyle="#eab308",t.fillRect(6,2,4,4),t.fillStyle="#facc15",t.fillRect(7,1,2,1),t.fillRect(5,3,1,2),t.fillRect(10,3,1,2),t.fillStyle="#ca8a04",t.fillRect(7,3,2,2)}function pE(t,e){_r(t,e),t.strokeStyle="#451a03",t.lineWidth=1,t.strokeRect(2.5,2.5,11,11),t.beginPath(),t.moveTo(6.5,2.5),t.lineTo(6.5,13.5),t.moveTo(10.5,2.5),t.lineTo(10.5,13.5),t.moveTo(2.5,6.5),t.lineTo(13.5,6.5),t.moveTo(2.5,10.5),t.lineTo(13.5,10.5),t.stroke(),t.fillStyle="#fef08a",t.fillRect(3,3,1,1),t.fillRect(12,3,1,1),t.fillRect(3,12,1,1),t.fillRect(12,12,1,1)}function mE(t,e){_r(t,e),t.fillStyle="#1e293b",t.fillRect(3,4,3,8),t.fillStyle="#94a3b8",t.fillRect(3,4,2,6),t.fillStyle="#78350f",t.fillRect(4,9,1,3),t.fillStyle="#cbd5e1",t.fillRect(10,5,2,2),t.fillStyle="#78350f",t.fillRect(9,7,1,4),t.fillRect(12,7,1,4)}function _E(t,e){t.clearRect(0,0,e,e),t.fillStyle="#78350f",t.fillRect(7,6,2,10),t.fillStyle="#451a03",t.fillRect(7,6,1,10),t.fillStyle="#f97316",t.fillRect(6,2,4,4),t.fillStyle="#fef08a",t.fillRect(7,3,2,2),t.fillStyle="#ea580c",t.fillRect(7,1,2,1)}function gE(t,e){ho(t,e),t.strokeStyle="#1e293b",t.lineWidth=1,t.strokeRect(1.5,1.5,13,13)}function vE(t,e){ho(t,e),t.fillStyle="#0f172a",t.fillRect(4,7,8,7),t.fillStyle="#334155",t.fillRect(5,10,6,1),t.fillRect(5,12,6,1)}function xE(t,e){ho(t,e),t.fillStyle="#f97316",t.fillRect(4,7,8,7),t.fillStyle="#fef08a",t.fillRect(5,9,6,4),t.fillStyle="#ef4444",t.fillRect(6,11,4,2)}function EE(t,e){_r(t,e),t.strokeStyle="#451a03",t.lineWidth=1,t.strokeRect(1.5,1.5,13,13)}function SE(t,e){_r(t,e),t.strokeStyle="#451a03",t.lineWidth=1,t.strokeRect(1.5,1.5,13,13),t.fillStyle="#cbd5e1",t.fillRect(7,6,2,4),t.fillStyle="#475569",t.fillRect(7,8,2,1)}function ME(t,e){ft(t,e,"#3b1d0c",["#2e1507","#45220e","#230f04","#4d2812"],.4,2101),t.fillStyle="#1c0b03",t.fillRect(0,3,e,1),t.fillRect(0,7,e,1),t.fillRect(0,11,e,1),t.fillRect(0,15,e,1)}function yE(t,e){ft(t,e,"#86652d",["#775924","#957134","#664c1e"],.35,2201),t.fillStyle="#3b1d0c",t.fillRect(0,0,e,3),t.fillStyle="#230f04",t.fillRect(0,2,e,1)}function TE(t,e){t.clearRect(0,0,e,e),t.fillStyle="#65a30d";for(let n=2;n<e;n+=3)t.fillRect(n,12,1,4),t.fillRect(n-1,11,1,2)}function AE(t,e){t.clearRect(0,0,e,e),t.fillStyle="#84cc16";for(let n=1;n<e;n+=3)t.fillRect(n,6,2,10),t.fillStyle="#ca8a04",t.fillRect(n,6,2,3),t.fillStyle="#84cc16"}function bE(t,e){t.clearRect(0,0,e,e);for(let n=1;n<e;n+=2)t.fillStyle="#ca8a04",t.fillRect(n,4,1,12),t.fillStyle="#eab308",t.fillRect(n-(n>1?1:0),1,2,5),t.fillStyle="#fef08a",t.fillRect(n,2,1,3)}function RE(t,e){t.fillStyle="#dc2626",t.fillRect(0,0,e,e),t.fillStyle="#475569",t.beginPath(),t.arc(8,8,4,0,Math.PI*2),t.fill(),t.fillStyle="#0f172a",t.fillRect(7,7,2,2)}function wE(t,e){t.fillStyle="#dc2626",t.fillRect(0,0,e,e),t.fillStyle="#f8fafc",t.fillRect(0,5,e,6),t.fillStyle="#0f172a",t.fillRect(1,6,4,1),t.fillRect(2,7,2,3),t.fillRect(6,6,1,4),t.fillRect(7,7,1,2),t.fillRect(8,6,1,4),t.fillRect(10,6,4,1),t.fillRect(11,7,2,3)}function OE(t,e){t.fillStyle="#b91c1c",t.fillRect(0,0,e,e),t.fillStyle="#7f1d1d",t.fillRect(3,3,10,10),t.fillStyle="#450a0a",t.fillRect(7,7,2,2)}function CE(t,e){ft(t,e,"#ea580c",["#f97316","#c2410c","#facc15","#b45309","#7c2d12"],.45,2301);const n=St(2302);for(let i=0;i<4;i++){const r=Math.floor(n()*(e-3)),s=Math.floor(n()*(e-2));t.fillStyle="#fef08a",t.fillRect(r,s,3,2),t.fillStyle="#ea580c",t.fillRect(r+1,s,1,1)}}function DE(t,e){uo(t,e);const n=St(2401);for(let i=0;i<4;i++){const r=2+Math.floor(n()*(e-5)),s=2+Math.floor(n()*(e-5));t.fillStyle="#06b6d4",t.fillRect(r,s,2,2),t.fillStyle="#67e8f9",t.fillRect(r,s,1,1),t.fillStyle="#e0f2fe",t.fillRect(r+1,s+1,1,1)}}function Qf(t,e){ft(t,e,"#0f172a",["#1e1b4b","#020617","#312e81","#4c1d95","#1e293b"],.45,2501);const n=St(2502);for(let i=0;i<5;i++){const r=Math.floor(n()*(e-2)),s=Math.floor(n()*(e-2));t.fillStyle="#6366f1",t.fillRect(r,s,1,2),t.fillStyle="#a855f7",t.fillRect(r+1,s+1,1,1)}}function IE(t,e){t.fillStyle="#dc2626",t.fillRect(0,0,e,e),t.fillStyle="#b91c1c",t.fillRect(1,6,e-2,e-7),t.fillStyle="#f8fafc",t.fillRect(2,1,12,4),t.fillStyle="#cbd5e1",t.fillRect(2,4,12,1)}function NE(t,e){t.fillStyle="#dc2626",t.fillRect(0,0,e,6),t.fillStyle="#b91c1c",t.fillRect(0,5,e,1),t.fillStyle="#78350f",t.fillRect(0,6,e,10),t.fillStyle="#451a03",t.fillRect(2,9,e-4,7)}function LE(t,e){ft(t,e,"#f8fafc",["#f1f5f9","#e2e8f0","#cbd5e1","#ffffff"],.35,2601);const n=St(2602);for(let i=0;i<6;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*(e-1));t.fillStyle="#e2e8f0",t.fillRect(r,s,1,1)}}function PE(t,e){ft(t,e,"#6b7280",["#4b5563","#9ca3af","#374151","#d1d5db"],.5,3101);const n=St(3102);for(let i=0;i<8;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*(e-1));t.fillStyle="#1f2937",t.fillRect(r,s,1,1)}}function ep(t,e){ft(t,e,"#6b1717",["#450a0a","#7f1d1d","#991b1b","#3b0707"],.5,3201);const n=St(3202);for(let i=0;i<6;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*(e-1));t.fillStyle="#b91c1c",t.fillRect(r,s,1,1)}}function UE(t,e){ft(t,e,"#451a03",["#381e11","#2e180c","#54260f"],.4,3301),t.fillStyle="#1c0d06",t.fillRect(3,4,1,2),t.fillRect(5,4,1,2),t.fillRect(4,7,1,2),t.fillRect(10,8,1,2),t.fillRect(12,8,1,2),t.fillRect(11,11,1,2)}function FE(t,e){ft(t,e,"#eab308",["#ca8a04","#facc15","#fef08a","#a16207"],.55,3401);const n=St(3402);for(let i=0;i<10;i++){const r=Math.floor(n()*(e-1)),s=Math.floor(n()*(e-1));t.fillStyle="#ffffff",t.fillRect(r,s,1,1)}}function BE(t,e){ep(t,e),[[3,3],[4,3],[4,4],[5,4],[4,5],[9,9],[10,9],[10,10],[11,10],[10,11],[11,3],[12,3],[12,4],[3,11],[4,11],[4,12]].forEach(([i,r])=>{t.fillStyle="#f8fafc",t.fillRect(i,r,1,1)}),t.fillStyle="#e2e8f0",t.fillRect(3,2,1,1),t.fillRect(9,8,1,1)}function GE(t,e){ft(t,e,"#f8fafc",["#f1f5f9","#ffffff","#e2e8f0"],.25,3601),t.fillStyle="#cbd5e1",t.fillRect(0,0,e,1),t.fillRect(0,0,1,e),t.fillStyle="#94a3b8",t.fillRect(0,e-1,e,1),t.fillRect(e-1,0,1,e)}function HE(t,e){ft(t,e,"#4c1d95",["#6b21a8","#7e22ce","#3b0764","#9333ea"],.5,3701),t.fillStyle="#c084fc",t.fillRect(2,3,3,1),t.fillRect(4,4,2,1),t.fillRect(8,7,4,1),t.fillRect(10,8,3,1),t.fillRect(4,11,5,1),t.fillRect(1,12,3,1),t.fillStyle="#f3e8ff",t.fillRect(3,3,1,1),t.fillRect(9,7,1,1)}function zE(t,e){uo(t,e);const n=St(3801);for(let i=0;i<5;i++){const r=2+Math.floor(n()*(e-5)),s=2+Math.floor(n()*(e-5));t.fillStyle="#b91c1c",t.fillRect(r,s,3,3),t.fillStyle="#ef4444",t.fillRect(r,s,2,2),t.fillStyle="#fca5a5",t.fillRect(r+1,s+1,1,1)}}function WE(t,e){t.clearRect(0,0,e,e),t.fillStyle="#991b1b",t.fillRect(6,0,4,e),t.fillRect(0,6,e,4),t.fillStyle="#ef4444",t.fillRect(7,0,2,e),t.fillRect(0,7,e,2),t.fillStyle="#fca5a5",t.fillRect(7,7,2,2)}function kE(t,e){t.clearRect(0,0,e,e),t.fillStyle="#78350f",t.fillRect(7,7,2,9),t.fillStyle="#991b1b",t.fillRect(6,2,4,5),t.fillStyle="#ef4444",t.fillRect(6,2,4,3),t.fillStyle="#fca5a5",t.fillRect(7,3,2,2)}function VE(t,e){ho(t,e),t.fillStyle="#334155",t.fillRect(5,5,6,6),t.fillStyle="#78350f",t.fillRect(7,3,2,6),t.fillStyle="#d97706",t.fillRect(7,2,2,2)}function XE(t,e){uo(t,e),t.fillStyle="#475569",t.fillRect(2,2,12,12),t.fillStyle="#64748b",t.fillRect(3,3,10,10)}function KE(t,e){_r(t,e),t.fillStyle="#451a03",t.strokeRect(1,1,14,14),t.fillStyle="#0f172a",t.fillRect(12,4,2,3)}function qE(t,e){_r(t,e),t.fillStyle="#451a03",t.strokeRect(1,1,14,14),t.fillStyle="#bae6fd",t.fillRect(3,3,4,4),t.fillRect(9,3,4,4),t.fillRect(3,9,4,4),t.fillRect(9,9,4,4)}function YE(t,e){ft(t,e,"#e2e8f0",["#cbd5e1","#f1f5f9","#94a3b8"],.35,3901),t.fillStyle="#334155",t.strokeRect(1,1,14,14),t.fillRect(12,4,2,3)}function $E(t,e){ft(t,e,"#e2e8f0",["#cbd5e1","#f1f5f9","#94a3b8"],.35,3902),t.fillStyle="#334155",t.strokeRect(1,1,14,14),t.fillStyle="#1e293b",t.fillRect(4,4,8,2),t.fillRect(4,8,8,2)}function ZE(t,e){Qf(t,e),t.fillStyle="#991b1b",t.fillRect(3,3,10,10),t.fillStyle="#dc2626",t.fillRect(4,4,8,8),t.fillStyle="#22d3ee",t.fillRect(1,1,2,2),t.fillRect(13,1,2,2),t.fillRect(1,13,2,2),t.fillRect(13,13,2,2)}function jE(t,e){Qf(t,e),t.fillStyle="#22d3ee",t.fillRect(0,0,e,2),t.fillStyle="#06b6d4",t.fillRect(2,6,4,4),t.fillRect(10,6,4,4)}function QE(t,e){ho(t,e);const n=St(4001);for(let i=0;i<6;i++){const r=Math.floor(n()*(e-3)),s=Math.floor(n()*(e-3));t.fillStyle="#15803d",t.fillRect(r,s,3,3),t.fillStyle="#4ade80",t.fillRect(r+1,s+1,1,1)}}function JE(t,e){t.fillStyle="#0f172a",t.fillRect(0,0,e,e),t.fillStyle="#475569",t.fillRect(0,0,e,2),t.fillRect(0,e-2,e,2),t.fillRect(0,0,2,e),t.fillRect(e-2,0,2,e),t.fillRect(6,0,2,e),t.fillRect(0,6,e,2),t.fillStyle="#ea580c",t.fillRect(7,7,2,2)}function eS(t,e){_r(t,e),t.fillStyle="#1e293b",t.fillRect(2,2,12,5),t.fillStyle="#dc2626",t.fillRect(3,2,2,5),t.fillStyle="#2563eb",t.fillRect(5,2,3,5),t.fillStyle="#16a34a",t.fillRect(8,2,2,5),t.fillStyle="#d97706",t.fillRect(10,2,3,5),t.fillStyle="#1e293b",t.fillRect(2,9,12,5),t.fillStyle="#9333ea",t.fillRect(3,9,3,5),t.fillStyle="#ca8a04",t.fillRect(6,9,2,5),t.fillStyle="#0891b2",t.fillRect(8,9,3,5),t.fillStyle="#e11d48",t.fillRect(11,9,2,5)}const tS=[{name:"grass_top",draw:jx},{name:"grass_side",draw:Qx},{name:"dirt",draw:Jx},{name:"stone",draw:uo},{name:"sand",draw:eE},{name:"snow",draw:tE},{name:"wood_log",draw:rE},{name:"wood_log_top",draw:sE},{name:"leaves",draw:oE},{name:"coal_ore",draw:aE},{name:"iron_ore",draw:lE},{name:"water",draw:cE},{name:"stone_bricks",draw:iE},{name:"snow_side",draw:nE},{name:"cactus_top",draw:fE},{name:"cactus_side",draw:uE},{name:"wood_planks",draw:_r},{name:"cobblestone",draw:ho},{name:"flower_red",draw:dE},{name:"flower_yellow",draw:hE},{name:"crafting_table_top",draw:pE},{name:"crafting_table_side",draw:mE},{name:"torch",draw:_E},{name:"furnace_side",draw:gE},{name:"furnace_front",draw:vE},{name:"furnace_front_lit",draw:xE},{name:"chest_top",draw:EE},{name:"chest_side",draw:SE},{name:"farmland_top",draw:ME},{name:"farmland_side",draw:yE},{name:"wheat_stage1",draw:TE},{name:"wheat_stage2",draw:AE},{name:"wheat_stage3",draw:bE},{name:"tnt_top",draw:RE},{name:"tnt_side",draw:wE},{name:"tnt_bottom",draw:OE},{name:"lava",draw:CE},{name:"diamond_ore",draw:DE},{name:"obsidian",draw:Qf},{name:"bed_top",draw:IE},{name:"bed_side",draw:NE},{name:"wool",draw:LE},{name:"gravel",draw:PE},{name:"netherrack",draw:ep},{name:"soul_sand",draw:UE},{name:"glowstone",draw:FE},{name:"nether_quartz_ore",draw:BE},{name:"quartz_block",draw:GE},{name:"nether_portal",draw:HE},{name:"redstone_ore",draw:zE},{name:"redstone_wire",draw:WE},{name:"redstone_torch",draw:kE},{name:"lever",draw:VE},{name:"pressure_plate",draw:XE},{name:"wooden_door_bottom",draw:KE},{name:"wooden_door_top",draw:qE},{name:"iron_door_bottom",draw:YE},{name:"iron_door_top",draw:$E},{name:"enchanting_table_top",draw:ZE},{name:"enchanting_table_side",draw:jE},{name:"mossy_cobblestone",draw:QE},{name:"monster_spawner",draw:JE},{name:"bookshelf_side",draw:eS}];function tp(){return tS.map(t=>Zx(t.draw))}const Wr=4,Of=16,Dd=Wr*as,Id=Of*as;let Zi=null;function nS(){const t=tp(),e=document.createElement("canvas");e.width=Dd,e.height=Id;const n=e.getContext("2d");return n.clearRect(0,0,Dd,Id),t.forEach((i,r)=>{const s=r%Wr,l=Math.floor(r/Wr),a=s*as,c=l*as;n.drawImage(i,a,c)}),Zi=new Gh(e),Zi.magFilter=en,Zi.minFilter=en,Zi.generateMipmaps=!1,Zi.colorSpace=xn,Zi.needsUpdate=!0,Zi}function Go(t){const e=t%Wr,n=Math.floor(t/Wr),i=5e-4,r=e/Wr+i,s=(e+1)/Wr-i,l=1-n/Of-i,a=1-(n+1)/Of+i;return{uMin:r,uMax:s,vMin:a,vMax:l}}function Ol(){return Zi}const o={AIR:0,GRASS:1,DIRT:2,STONE:3,SAND:4,SNOW:5,WOOD_LOG:6,LEAVES:7,COAL_ORE:8,IRON_ORE:9,WATER:10,CACTUS:11,WOOD_PLANKS:12,COBBLESTONE:13,FLOWER_RED:14,FLOWER_YELLOW:15,CRAFTING_TABLE:16,TORCH:17,FURNACE:18,FURNACE_LIT:19,CHEST:20,FARMLAND:21,WHEAT_STAGE_1:22,WHEAT_STAGE_2:23,WHEAT_STAGE_3:24,TNT:25,LAVA:26,DIAMOND_ORE:27,OBSIDIAN:28,BED:29,WOOL:30,GRAVEL:31,NETHERRACK:32,SOUL_SAND:33,GLOWSTONE:34,NETHER_QUARTZ_ORE:35,QUARTZ_BLOCK:36,NETHER_PORTAL:37,IRON_SWORD:101,IRON_PICKAXE:102,PORKCHOP:103,ROTTEN_FLESH:104,STICK:105,WOODEN_SWORD:106,WOODEN_PICKAXE:107,STONE_SWORD:108,STONE_PICKAXE:109,IRON_INGOT:110,COOKED_PORKCHOP:111,IRON_HELMET:112,IRON_CHESTPLATE:113,IRON_LEGGINGS:114,IRON_BOOTS:115,ARROW:116,BONE:117,STRING:118,SPIDER_EYE:119,BOW:120,WOODEN_HOE:121,STONE_HOE:122,IRON_HOE:123,WHEAT_SEEDS:124,WHEAT:125,BREAD:126,GUNPOWDER:127,DIAMOND:128,DIAMOND_SWORD:129,DIAMOND_PICKAXE:130,DIAMOND_HELMET:131,DIAMOND_CHESTPLATE:132,DIAMOND_LEGGINGS:133,DIAMOND_BOOTS:134,MUTTON:135,COOKED_MUTTON:136,FLINT:137,FLINT_AND_STEEL:138,QUARTZ:139,REDSTONE_ORE:38,REDSTONE_WIRE:39,REDSTONE_TORCH:40,LEVER:41,PRESSURE_PLATE:42,WOODEN_DOOR_BOTTOM:43,WOODEN_DOOR_TOP:44,IRON_DOOR_BOTTOM:45,IRON_DOOR_TOP:46,ENCHANTING_TABLE:47,MOSSY_COBBLESTONE:48,MONSTER_SPAWNER:49,BOOKSHELF:50,REDSTONE_DUST:140,WOODEN_SHIELD:141,IRON_SHIELD:142,BOOK:143,GOLDEN_APPLE:144,BOAT:145,EXPERIENCE_BOTTLE:146},pr={[o.GRASS]:"Grama",[o.DIRT]:"Terra",[o.STONE]:"Pedra",[o.SAND]:"Areia",[o.SNOW]:"Neve",[o.WOOD_LOG]:"Tronco de Carvalho",[o.LEAVES]:"Folhas",[o.COAL_ORE]:"Minério de Carvão",[o.IRON_ORE]:"Minério de Ferro",[o.WATER]:"Balde de Água",[o.CACTUS]:"Cacto",[o.WOOD_PLANKS]:"Tábuas de Madeira",[o.COBBLESTONE]:"Pedregulho",[o.FLOWER_RED]:"Flor Vermelha (Papoula)",[o.FLOWER_YELLOW]:"Flor Amarela (Dente-de-Leão)",[o.CRAFTING_TABLE]:"Bancada de Trabalho",[o.TORCH]:"Tocha",[o.FURNACE]:"Fornalha",[o.FURNACE_LIT]:"Fornalha (Acesa)",[o.CHEST]:"Baú de Madeira",[o.FARMLAND]:"Terra Arada",[o.WHEAT_STAGE_1]:"Brotos de Trigo",[o.WHEAT_STAGE_2]:"Trigo em Crescimento",[o.WHEAT_STAGE_3]:"Trigo Maduro",[o.TNT]:"Bloco de TNT",[o.LAVA]:"Balde de Lava",[o.DIAMOND_ORE]:"Minério de Diamante",[o.OBSIDIAN]:"Bloco de Obsidiana",[o.BED]:"Cama Confortável",[o.WOOL]:"Bloco de Lã Branca",[o.IRON_SWORD]:"Espada de Ferro",[o.IRON_PICKAXE]:"Picareta de Ferro",[o.PORKCHOP]:"Costela de Porco Crua",[o.ROTTEN_FLESH]:"Carne Podre",[o.STICK]:"Graveto",[o.WOODEN_SWORD]:"Espada de Madeira",[o.WOODEN_PICKAXE]:"Picareta de Madeira",[o.STONE_SWORD]:"Espada de Pedra",[o.STONE_PICKAXE]:"Picareta de Pedra",[o.IRON_INGOT]:"Barra de Ferro",[o.COOKED_PORKCHOP]:"Bife de Porco Assado",[o.IRON_HELMET]:"Capacete de Ferro",[o.IRON_CHESTPLATE]:"Peitoral de Ferro",[o.IRON_LEGGINGS]:"Calças de Ferro",[o.IRON_BOOTS]:"Botas de Ferro",[o.ARROW]:"Flecha",[o.BONE]:"Osso",[o.STRING]:"Linha de Teia",[o.SPIDER_EYE]:"Olho de Aranha",[o.BOW]:"Arco e Flecha",[o.WOODEN_HOE]:"Enxada de Madeira",[o.STONE_HOE]:"Enxada de Pedra",[o.IRON_HOE]:"Enxada de Ferro",[o.WHEAT_SEEDS]:"Sementes de Trigo",[o.WHEAT]:"Trigo",[o.BREAD]:"Pão Dourado",[o.GUNPOWDER]:"Pólvora",[o.DIAMOND]:"Gema de Diamante",[o.DIAMOND_SWORD]:"Espada de Diamante",[o.DIAMOND_PICKAXE]:"Picareta de Diamante",[o.DIAMOND_HELMET]:"Capacete de Diamante",[o.DIAMOND_CHESTPLATE]:"Peitoral de Diamante",[o.DIAMOND_LEGGINGS]:"Calças de Diamante",[o.DIAMOND_BOOTS]:"Botas de Diamante",[o.MUTTON]:"Carneiro Cru",[o.COOKED_MUTTON]:"Carneiro Assado",[o.GRAVEL]:"Cascalho",[o.NETHERRACK]:"Rocha do Nether",[o.SOUL_SAND]:"Areia das Almas",[o.GLOWSTONE]:"Pedra Luminosa (Glowstone)",[o.NETHER_QUARTZ_ORE]:"Minério de Quartzo do Nether",[o.QUARTZ_BLOCK]:"Bloco de Quartzo Polido",[o.NETHER_PORTAL]:"Portal do Nether",[o.FLINT]:"Pederneira",[o.FLINT_AND_STEEL]:"Isqueiro de Pederneira",[o.QUARTZ]:"Cristal de Quartzo",[o.REDSTONE_ORE]:"Minério de Redstone",[o.REDSTONE_WIRE]:"Fio de Redstone",[o.REDSTONE_TORCH]:"Tocha de Redstone",[o.LEVER]:"Alavanca de Redstone",[o.PRESSURE_PLATE]:"Placa de Pressão de Pedra",[o.WOODEN_DOOR_BOTTOM]:"Porta de Madeira",[o.WOODEN_DOOR_TOP]:"Porta de Madeira (Topo)",[o.IRON_DOOR_BOTTOM]:"Porta de Ferro",[o.IRON_DOOR_TOP]:"Porta de Ferro (Topo)",[o.ENCHANTING_TABLE]:"Mesa de Encantamentos",[o.MOSSY_COBBLESTONE]:"Pedregulho com Musgo",[o.MONSTER_SPAWNER]:"Gerador de Monstros (Spawner)",[o.BOOKSHELF]:"Estante de Livros",[o.REDSTONE_DUST]:"Pó de Redstone",[o.WOODEN_SHIELD]:"Escudo de Carvalho",[o.IRON_SHIELD]:"Escudo Reforçado de Ferro",[o.BOOK]:"Livro Arcano",[o.GOLDEN_APPLE]:"Maçã Dourada Encantada",[o.BOAT]:"Barco de Carvalho",[o.EXPERIENCE_BOTTLE]:"Frasco de Experiência"},ta={[o.GRASS]:{top:0,side:1,bottom:2},[o.DIRT]:{top:2,side:2,bottom:2},[o.STONE]:{top:3,side:3,bottom:3},[o.SAND]:{top:4,side:4,bottom:4},[o.SNOW]:{top:5,side:13,bottom:2},[o.WOOD_LOG]:{top:7,side:6,bottom:7},[o.LEAVES]:{top:8,side:8,bottom:8},[o.COAL_ORE]:{top:9,side:9,bottom:9},[o.IRON_ORE]:{top:10,side:10,bottom:10},[o.WATER]:{top:11,side:11,bottom:11},[o.CACTUS]:{top:14,side:15,bottom:14},[o.WOOD_PLANKS]:{top:16,side:16,bottom:16},[o.COBBLESTONE]:{top:17,side:17,bottom:17},[o.FLOWER_RED]:{top:18,side:18,bottom:18},[o.FLOWER_YELLOW]:{top:19,side:19,bottom:19},[o.CRAFTING_TABLE]:{top:20,side:21,bottom:16},[o.TORCH]:{top:22,side:22,bottom:22},[o.FURNACE]:{top:3,side:23,bottom:3},[o.FURNACE_LIT]:{top:3,side:25,bottom:3},[o.CHEST]:{top:26,side:27,bottom:16},[o.FARMLAND]:{top:28,side:29,bottom:2},[o.WHEAT_STAGE_1]:{top:30,side:30,bottom:30},[o.WHEAT_STAGE_2]:{top:31,side:31,bottom:31},[o.WHEAT_STAGE_3]:{top:32,side:32,bottom:32},[o.TNT]:{top:33,side:34,bottom:35},[o.LAVA]:{top:36,side:36,bottom:36},[o.DIAMOND_ORE]:{top:37,side:37,bottom:37},[o.OBSIDIAN]:{top:38,side:38,bottom:38},[o.BED]:{top:39,side:40,bottom:16},[o.WOOL]:{top:41,side:41,bottom:41},[o.GRAVEL]:{top:42,side:42,bottom:42},[o.NETHERRACK]:{top:43,side:43,bottom:43},[o.SOUL_SAND]:{top:44,side:44,bottom:44},[o.GLOWSTONE]:{top:45,side:45,bottom:45},[o.NETHER_QUARTZ_ORE]:{top:46,side:46,bottom:46},[o.QUARTZ_BLOCK]:{top:47,side:47,bottom:47},[o.NETHER_PORTAL]:{top:48,side:48,bottom:48},[o.REDSTONE_ORE]:{top:49,side:49,bottom:49},[o.REDSTONE_WIRE]:{top:50,side:50,bottom:50},[o.REDSTONE_TORCH]:{top:51,side:51,bottom:51},[o.LEVER]:{top:52,side:52,bottom:52},[o.PRESSURE_PLATE]:{top:53,side:53,bottom:53},[o.WOODEN_DOOR_BOTTOM]:{top:54,side:54,bottom:54},[o.WOODEN_DOOR_TOP]:{top:55,side:55,bottom:55},[o.IRON_DOOR_BOTTOM]:{top:56,side:56,bottom:56},[o.IRON_DOOR_TOP]:{top:57,side:57,bottom:57},[o.ENCHANTING_TABLE]:{top:58,side:59,bottom:38},[o.MOSSY_COBBLESTONE]:{top:60,side:60,bottom:60},[o.MONSTER_SPAWNER]:{top:61,side:61,bottom:61},[o.BOOKSHELF]:{top:16,side:62,bottom:16}};function Jf(t){return t>o.AIR&&t<100&&t!==o.WATER&&t!==o.LAVA&&t!==o.NETHER_PORTAL&&t!==o.FLOWER_RED&&t!==o.FLOWER_YELLOW&&t!==o.TORCH&&t!==o.REDSTONE_WIRE&&t!==o.REDSTONE_TORCH&&t!==o.LEVER&&t!==o.PRESSURE_PLATE&&t!==o.WHEAT_STAGE_1&&t!==o.WHEAT_STAGE_2&&t!==o.WHEAT_STAGE_3}function iS(t){return t>=o.GRASS&&t<100}function fa(t){return t===o.DIAMOND_SWORD||t===o.IRON_SWORD||t===o.STONE_SWORD||t===o.WOODEN_SWORD||t===o.BOW}function rS(t){return t===o.WOODEN_DOOR_BOTTOM||t===o.WOODEN_DOOR_TOP||t===o.IRON_DOOR_BOTTOM||t===o.IRON_DOOR_TOP}function np(t){return t===o.DIAMOND_PICKAXE||t===o.IRON_PICKAXE||t===o.STONE_PICKAXE||t===o.WOODEN_PICKAXE}function eu(t){return t===o.IRON_HOE||t===o.STONE_HOE||t===o.WOODEN_HOE}function ip(t){return t===o.PORKCHOP||t===o.COOKED_PORKCHOP||t===o.MUTTON||t===o.COOKED_MUTTON||t===o.ROTTEN_FLESH||t===o.BREAD||t===o.GOLDEN_APPLE}function rp(t){return t===o.IRON_HELMET||t===o.IRON_CHESTPLATE||t===o.IRON_LEGGINGS||t===o.IRON_BOOTS||t===o.DIAMOND_HELMET||t===o.DIAMOND_CHESTPLATE||t===o.DIAMOND_LEGGINGS||t===o.DIAMOND_BOOTS}function sS(t){switch(t){case o.DIAMOND_SWORD:return 8;case o.IRON_SWORD:return 6;case o.STONE_SWORD:return 5;case o.WOODEN_SWORD:return 4;case o.BOW:return 6;case o.DIAMOND_PICKAXE:return 5;case o.IRON_PICKAXE:return 4;case o.STONE_PICKAXE:return 3;case o.WOODEN_PICKAXE:return 2;default:return 1}}function oS(t){const e={isWeapon:fa(t),isArmor:rp(t),isFood:ip(t),isTool:np(t)||eu(t),damage:sS(t),defense:sp(t),hunger:op(t),slotName:null,toolTier:null};return t===o.IRON_HELMET||t===o.DIAMOND_HELMET?e.slotName="Capacete (Cabeça)":t===o.IRON_CHESTPLATE||t===o.DIAMOND_CHESTPLATE?e.slotName="Peitoral (Tronco)":t===o.IRON_LEGGINGS||t===o.DIAMOND_LEGGINGS?e.slotName="Calças (Pernas)":(t===o.IRON_BOOTS||t===o.DIAMOND_BOOTS)&&(e.slotName="Botas (Pés)"),t===o.DIAMOND_PICKAXE?e.toolTier="Suprema (Diamante)":t===o.IRON_PICKAXE?e.toolTier="Alta (Ferro)":t===o.STONE_PICKAXE?e.toolTier="Média (Pedra)":t===o.WOODEN_PICKAXE?e.toolTier="Básica (Madeira)":t===o.IRON_HOE?e.toolTier="Arado de Ferro":t===o.STONE_HOE?e.toolTier="Arado de Pedra":t===o.WOODEN_HOE&&(e.toolTier="Arado de Madeira"),e}function sp(t){switch(t){case o.DIAMOND_HELMET:return 3;case o.DIAMOND_CHESTPLATE:return 8;case o.DIAMOND_LEGGINGS:return 6;case o.DIAMOND_BOOTS:return 3;case o.IRON_HELMET:return 2;case o.IRON_CHESTPLATE:return 6;case o.IRON_LEGGINGS:return 5;case o.IRON_BOOTS:return 2;default:return 0}}function op(t){switch(t){case o.GOLDEN_APPLE:return 10;case o.COOKED_PORKCHOP:return 8;case o.COOKED_MUTTON:return 6;case o.BREAD:return 5;case o.PORKCHOP:return 3;case o.MUTTON:return 2;case o.ROTTEN_FLESH:return 1;default:return 0}}function aS(t){return t===o.AIR||t===o.WATER||t===o.LAVA||t===o.FLOWER_RED||t===o.FLOWER_YELLOW||t===o.TORCH||t===o.REDSTONE_WIRE||t===o.REDSTONE_TORCH||t===o.LEVER||t===o.PRESSURE_PLATE||t===o.WOODEN_DOOR_BOTTOM||t===o.WOODEN_DOOR_TOP||t===o.IRON_DOOR_BOTTOM||t===o.IRON_DOOR_TOP||t===o.WHEAT_STAGE_1||t===o.WHEAT_STAGE_2||t===o.WHEAT_STAGE_3||t>=100}function lS(t){switch(t){case o.LEAVES:case o.FLOWER_RED:case o.FLOWER_YELLOW:case o.WHEAT_STAGE_1:case o.WHEAT_STAGE_2:case o.WHEAT_STAGE_3:return .15;case o.DIRT:case o.GRASS:case o.SAND:case o.SNOW:case o.FARMLAND:return .55;case o.TNT:case o.BED:case o.WOOL:return .4;case o.WOOD_LOG:case o.WOOD_PLANKS:case o.CRAFTING_TABLE:case o.CHEST:case o.CACTUS:return 1.4;case o.STONE:case o.COBBLESTONE:case o.FURNACE:case o.FURNACE_LIT:return 2.5;case o.COAL_ORE:case o.IRON_ORE:return 3.5;case o.DIAMOND_ORE:return 4.5;case o.OBSIDIAN:return 9;case o.GRAVEL:return .6;case o.NETHERRACK:return .8;case o.SOUL_SAND:return .7;case o.GLOWSTONE:return .5;case o.NETHER_QUARTZ_ORE:return 3;case o.QUARTZ_BLOCK:return 2;case o.TORCH:case o.NETHER_PORTAL:return .05;default:return 1}}function cS(t,e){const n=e===o.DIAMOND_PICKAXE,i=e===o.IRON_PICKAXE,r=e===o.STONE_PICKAXE,s=e===o.WOODEN_PICKAXE,l=e===o.DIAMOND_SWORD,a=e===o.IRON_SWORD,c=e===o.STONE_SWORD,f=e===o.WOODEN_SWORD;return t===o.OBSIDIAN?n?4:.2:t===o.DIAMOND_ORE||t===o.NETHER_QUARTZ_ORE?n?8:i?6:.4:t===o.NETHERRACK||t===o.GLOWSTONE||t===o.QUARTZ_BLOCK?n?12:i?9:r?6:2.5:t===o.STONE||t===o.COBBLESTONE||t===o.COAL_ORE||t===o.IRON_ORE||t===o.FURNACE||t===o.FURNACE_LIT?n?9.5:i?6.5:r?4.2:s?2.6:.65:t===o.LEAVES||t===o.WOOL||t===o.FLOWER_RED||t===o.FLOWER_YELLOW||t===o.WHEAT_STAGE_1||t===o.WHEAT_STAGE_2||t===o.WHEAT_STAGE_3?l?8.5:a||c||f?6:2:t===o.WOOD_LOG||t===o.WOOD_PLANKS||t===o.CRAFTING_TABLE||t===o.CHEST||t===o.BED?n?2.2:i||r||s?1.6:1:1}function ap(t){switch(t){case o.STONE:return o.COBBLESTONE;case o.GRASS:return o.DIRT;case o.COAL_ORE:return o.COAL_ORE;case o.IRON_ORE:return o.IRON_ORE;case o.DIAMOND_ORE:return o.DIAMOND;case o.OBSIDIAN:return o.OBSIDIAN;case o.GRAVEL:return Math.random()<.25?o.FLINT:o.GRAVEL;case o.NETHERRACK:return o.NETHERRACK;case o.SOUL_SAND:return o.SOUL_SAND;case o.GLOWSTONE:return o.GLOWSTONE;case o.NETHER_QUARTZ_ORE:return o.QUARTZ;case o.QUARTZ_BLOCK:return o.QUARTZ_BLOCK;case o.NETHER_PORTAL:return o.AIR;case o.FURNACE:case o.FURNACE_LIT:return o.FURNACE;case o.FARMLAND:return o.DIRT;case o.WHEAT_STAGE_3:return o.WHEAT;case o.WHEAT_STAGE_1:case o.WHEAT_STAGE_2:return o.WHEAT_SEEDS;case o.LEAVES:return Math.random()<.35?o.LEAVES:0;case o.TNT:return o.TNT;case o.BED:return o.BED;case o.WOOL:return o.WOOL;case o.REDSTONE_ORE:return o.REDSTONE_DUST;case o.REDSTONE_WIRE:return o.REDSTONE_DUST;case o.REDSTONE_TORCH:return o.REDSTONE_TORCH;case o.LEVER:return o.LEVER;case o.PRESSURE_PLATE:return o.PRESSURE_PLATE;case o.WOODEN_DOOR_BOTTOM:case o.WOODEN_DOOR_TOP:return o.WOODEN_DOOR_BOTTOM;case o.IRON_DOOR_BOTTOM:case o.IRON_DOOR_TOP:return o.IRON_DOOR_BOTTOM;case o.ENCHANTING_TABLE:return o.ENCHANTING_TABLE;case o.MOSSY_COBBLESTONE:return o.MOSSY_COBBLESTONE;case o.BOOKSHELF:return o.BOOK;case o.MONSTER_SPAWNER:return o.AIR;default:return t}}const be=16,Et=64,fS=[{name:"top",dir:[0,1,0],colorKey:"top",vertices:[[0,1,1],[1,1,1],[1,1,0],[0,1,0]],localUVs:[[0,0],[1,0],[1,1],[0,1]]},{name:"bottom",dir:[0,-1,0],colorKey:"bottom",vertices:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],localUVs:[[0,0],[1,0],[1,1],[0,1]]},{name:"north",dir:[0,0,-1],colorKey:"side",vertices:[[1,0,0],[0,0,0],[0,1,0],[1,1,0]],localUVs:[[0,0],[1,0],[1,1],[0,1]]},{name:"south",dir:[0,0,1],colorKey:"side",vertices:[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],localUVs:[[0,0],[1,0],[1,1],[0,1]]},{name:"east",dir:[1,0,0],colorKey:"side",vertices:[[1,0,1],[1,0,0],[1,1,0],[1,1,1]],localUVs:[[0,0],[1,0],[1,1],[0,1]]},{name:"west",dir:[-1,0,0],colorKey:"side",vertices:[[0,0,0],[0,0,1],[0,1,1],[0,1,0]],localUVs:[[0,0],[1,0],[1,1],[0,1]]}];let mc=null,_c=null;function uS(){return mc||(mc=new ye({map:Ol(),alphaTest:.2,side:Vn})),mc}function dS(){return _c||(_c=new ye({map:Ol(),transparent:!0,opacity:.65,side:Vn,depthWrite:!1})),_c}class hS{constructor(e=0,n=0,i=0){this.cx=e,this.cy=n,this.cz=i,this.blocks=new Uint8Array(be*be*Et),this.mesh=null}_index(e,n,i){return e+i*be+n*be*be}getBlock(e,n,i){return e<0||e>=be||n<0||n>=Et||i<0||i>=be?o.AIR:this.blocks[this._index(e,n,i)]}setBlock(e,n,i,r){e<0||e>=be||n<0||n>=Et||i<0||i>=be||(this.blocks[this._index(e,n,i)]=r)}buildMesh(e){const n=[],i=[],r=[],s=[],l=[],a=[],c=[],f=[];let d=0,p=0;const u=this.cx*be,h=this.cy*Et,m=this.cz*be;for(let _=0;_<Et;_++)for(let y=0;y<be;y++)for(let x=0;x<be;x++){const S=this.getBlock(x,_,y);if(S===o.AIR)continue;const I=S===o.WATER,R=ta[S];if(!R)continue;const w=S===o.FLOWER_RED||S===o.FLOWER_YELLOW||S===o.WHEAT_STAGE_1||S===o.WHEAT_STAGE_2||S===o.WHEAT_STAGE_3,D=S===o.TORCH;if(w){const A=R.top,M=Go(A),O=[[[.12,0,.12,0,0],[.88,0,.88,1,0],[.88,1,.88,1,1],[.12,1,.12,0,1]],[[.12,0,.88,0,0],[.88,0,.12,1,0],[.88,1,.12,1,1],[.12,1,.88,0,1]]];for(const H of O){for(let F=0;F<4;F++){const[Y,q,K,J,V]=H[F];n.push(x+Y,_+q,y+K),i.push(0,1,0),r.push(M.uMin+J*(M.uMax-M.uMin),M.vMin+V*(M.vMax-M.vMin))}s.push(d,d+1,d+2,d,d+2,d+3),d+=4}continue}if(D){const A=R.top,M=Go(A),O=.42,H=.58,F=.42,Y=.58,q=0,K=.65,J=[[[O,K,Y,0,1],[H,K,Y,1,1],[H,K,F,1,0],[O,K,F,0,0],0,1,0],[[O,q,Y,0,0],[H,q,Y,1,0],[H,K,Y,1,1],[O,K,Y,0,1],0,0,1],[[H,q,F,0,0],[O,q,F,1,0],[O,K,F,1,1],[H,K,F,0,1],0,0,-1],[[O,q,F,0,0],[O,q,Y,1,0],[O,K,Y,1,1],[O,K,F,0,1],-1,0,0],[[H,q,Y,0,0],[H,q,F,1,0],[H,K,F,1,1],[H,K,Y,0,1],1,0,0]];for(const V of J){for(let se=0;se<4;se++){const[ae,ve,Fe,nt,$]=V[se];n.push(x+ae,_+ve,y+Fe),i.push(V[4],V[5],V[6]),r.push(M.uMin+nt*(M.uMax-M.uMin),M.vMin+$*(M.vMax-M.vMin))}s.push(d,d+1,d+2,d,d+2,d+3),d+=4}continue}for(const A of fS){const M=x+A.dir[0],O=_+A.dir[1],H=y+A.dir[2];let F;if(M>=0&&M<be&&O>=0&&O<Et&&H>=0&&H<be?F=this.getBlock(M,O,H):e?F=e(u+M,h+O,m+H):F=o.AIR,I){if(F!==o.AIR)continue}else if(!aS(F))continue;const Y=R[A.colorKey],q=Go(Y),K=I?l:n,J=I?a:i,V=I?c:r,se=I?f:s,ae=I?p:d;for(let ve=0;ve<4;ve++){const Fe=A.vertices[ve];K.push(x+Fe[0],_+Fe[1],y+Fe[2]),J.push(A.dir[0],A.dir[1],A.dir[2]);const nt=A.localUVs[ve][0],$=A.localUVs[ve][1];V.push(q.uMin+nt*(q.uMax-q.uMin),q.vMin+$*(q.vMax-q.vMin))}se.push(ae,ae+1,ae+2,ae,ae+2,ae+3),I?p+=4:d+=4}}let v=this._makeMesh(n,i,r,s,uS());v.position.set(u,h,m),this.mesh=v;let g=null;return l.length>0&&(g=this._makeMesh(l,a,c,f,dS()),g.position.set(u,h,m),g.renderOrder=1),{solidMesh:v,waterMesh:g}}_makeMesh(e,n,i,r,s){const l=new hn;return l.setAttribute("position",new Ot(e,3)),l.setAttribute("normal",new Ot(n,3)),l.setAttribute("uv",new Ot(i,2)),l.setIndex(r),new B(l,s)}dispose(){this.mesh&&(this.mesh.geometry.dispose(),this.mesh=null)}}const Xn=new Map,fl=new Map,ul=new Map,Mn=18,sr=5,pS=7;let Nd=NaN,Ld=NaN;const gc=[];function zn(t,e){let n=t*374761393+e*668265263+1234567|0;return n=(n^n>>13)*1274126177|0,(n&2147483647)/2147483647}function mS(t,e){const n=Math.floor(t),i=Math.floor(e),r=t-n,s=e-i,l=r*r*(3-2*r),a=s*s*(3-2*s),c=zn(n,i),f=zn(n+1,i),d=zn(n,i+1),p=zn(n+1,i+1),u=c*(1-l)+f*l,h=d*(1-l)+p*l;return u*(1-a)+h*a}function qs(t,e,n=4,i=.5,r=2){let s=0,l=1,a=1,c=0;for(let f=0;f<n;f++)s+=mS(t*l,e*l)*a,c+=a,a*=i,l*=r;return s/c}const lt={OCEAN:"ocean",PLAINS:"plains",FOREST:"forest",DESERT:"desert",SNOWY_MOUNTAINS:"snowy_mountains"};function to(t,e){const n=qs(t*.0025,e*.0025,3);if(n<.32)return lt.OCEAN;const i=qs(t*.0035+150,e*.0035+150,3),r=qs(t*.004+300,e*.004+300,3);return n>.58&&i<.38?lt.SNOWY_MOUNTAINS:i>.62&&r<.48?lt.DESERT:r>.52?lt.FOREST:lt.PLAINS}function cr(t,e){const n=to(t,e),i=qs(t*.025,e*.025,3);switch(n){case lt.OCEAN:{const r=qs(t*.01,e*.01,2),s=Mn-2-r*10+i*3;return Math.max(3,Math.min(Et-6,Math.floor(s)))}case lt.DESERT:{const s=21+(Math.sin(t*.03+e*.015)*4+Math.cos(e*.03)*3)+i*2.5;return Math.max(Mn+1,Math.min(Et-6,Math.floor(s)))}case lt.SNOWY_MOUNTAINS:{const r=qs(t*.015,e*.015,4),s=28+Math.pow(r,1.8)*32+i*4;return Math.max(24,Math.min(Et-4,Math.floor(s)))}case lt.FOREST:{const s=23+(Math.sin(t*.022)*5+Math.cos(e*.028)*4+Math.sin((t-e)*.035)*2.5)+i*3;return Math.max(Mn+1,Math.min(Et-6,Math.floor(s)))}case lt.PLAINS:default:{const s=22+(Math.sin(t*.02)*4+Math.cos(e*.025)*4+Math.sin((t+e)*.04)*2)+i*2.5;return Math.max(Mn+1,Math.min(Et-6,Math.floor(s)))}}}function Pd(t,e,n,i,r){for(let l=i;l<i+r;l++)l<Et&&t.setBlock(e,l,n,o.WOOD_LOG);const s=i+r-1;for(let l=0;l<3;l++){const a=l<2?2:1;for(let c=-a;c<=a;c++)for(let f=-a;f<=a;f++){if(Math.abs(c)===a&&Math.abs(f)===a&&l<2)continue;const d=e+c,p=s+l,u=n+f;d>=0&&d<be&&p>=0&&p<Et&&u>=0&&u<be&&t.getBlock(d,p,u)===o.AIR&&t.setBlock(d,p,u,o.LEAVES)}}}function _S(t,e,n,i,r){for(let l=i;l<i+r;l++)l<Et&&t.setBlock(e,l,n,o.WOOD_LOG);const s=i+r;for(let l=i+2;l<=s+1;l++){const c=(s+1-l)%2===0?2:1;for(let f=-c;f<=c;f++)for(let d=-c;d<=c;d++){if(Math.abs(f)===c&&Math.abs(d)===c&&c>1)continue;const p=e+f,u=l,h=n+d;p>=0&&p<be&&u>=0&&u<Et&&h>=0&&h<be&&t.getBlock(p,u,h)===o.AIR&&t.setBlock(p,u,h,o.LEAVES)}}}function gS(t,e,n,i,r){for(let s=i;s<i+r;s++)s<Et&&t.getBlock(e,s,n)===o.AIR&&t.setBlock(e,s,n,o.CACTUS)}function vc(t,e,n,i,r){e>=0&&e<be&&i>=0&&i<be&&n<Et&&t.getBlock(e,n,i)===o.AIR&&t.setBlock(e,n,i,r)}function Yi(t,e,n){let i=t*374761393+e*668265263+n*982451653+1234567|0;return i=(i^i>>13)*1274126177|0,(i&2147483647)/2147483647}function Ud(t,e,n){const i=Math.floor(t),r=Math.floor(e),s=Math.floor(n),l=t-i,a=e-r,c=n-s,f=l*l*(3-2*l),d=a*a*(3-2*a),p=c*c*(3-2*c),u=Yi(i,r,s),h=Yi(i+1,r,s),m=Yi(i,r+1,s),v=Yi(i+1,r+1,s),g=Yi(i,r,s+1),_=Yi(i+1,r,s+1),y=Yi(i,r+1,s+1),x=Yi(i+1,r+1,s+1),S=u*(1-f)+h*f,I=m*(1-f)+v*f,R=g*(1-f)+_*f,w=y*(1-f)+x*f,D=S*(1-d)+I*d,A=R*(1-d)+w*d;return D*(1-p)+A*p}function lp(t,e,n,i){if(e<2||e>i||i<=Mn+1&&e>=i-2)return!1;const r=Ud(t*.045,e*.075,n*.045)-.5,s=Ud(t*.045+137,e*.075+137,n*.045+137)-.5;return r*r+s*s<.022}function cp(t,e){const n=new hS(t,0,e),i=t*be,r=e*be;for(let l=0;l<be;l++)for(let a=0;a<be;a++){const c=i+a,f=r+l,d=cr(c,f),p=to(c,f);for(let u=0;u<=d;u++){let h;u===0||u<d-4?h=o.STONE:u<d?p===lt.DESERT||p===lt.OCEAN&&d<=Mn+1?h=o.SAND:h=o.DIRT:p===lt.DESERT?h=o.SAND:p===lt.SNOWY_MOUNTAINS?h=d>=36?o.SNOW:o.GRASS:p===lt.OCEAN||d<=Mn+1?h=o.SAND:h=o.GRASS,u>=2&&lp(c,u,f,d)&&(u<=8?h=o.LAVA:u<=Mn-8?h=o.WATER:h=o.AIR),n.setBlock(a,u,l,h)}for(let u=d+1;u<=Mn;u++)n.getBlock(a,u,l)===o.AIR&&n.setBlock(a,u,l,o.WATER)}for(let l=1;l<be-1;l++)for(let a=1;a<be-1;a++){const c=i+a,f=r+l,d=cr(c,f),p=to(c,f),u=n.getBlock(a,d,l),h=zn(c,f);if(d>Mn){if(p===lt.PLAINS&&u===o.GRASS)if(h<.025&&a>=2&&a<be-2&&l>=2&&l<be-2){const m=4+Math.floor(zn(c+555,f+777)*3);d+m+4<Et&&Pd(n,a,l,d+1,m)}else h>.94&&h<.97?vc(n,a,d+1,l,o.FLOWER_RED):h>=.97&&vc(n,a,d+1,l,o.FLOWER_YELLOW);else if(p===lt.FOREST&&u===o.GRASS)if(h<.085&&a>=2&&a<be-2&&l>=2&&l<be-2){const m=4+Math.floor(zn(c+444,f+666)*4);d+m+4<Et&&Pd(n,a,l,d+1,m)}else h>.96&&vc(n,a,d+1,l,o.FLOWER_RED);else if(p===lt.DESERT&&u===o.SAND){if(h<.028){const m=2+(h>.015?1:0);gS(n,a,l,d+1,m)}}else if(p===lt.SNOWY_MOUNTAINS&&(u===o.GRASS||u===o.SNOW)&&h<.035&&a>=2&&a<be-2&&l>=2&&l<be-2){const m=5+Math.floor(zn(c+333,f+888)*4);d+m+4<Et&&_S(n,a,l,d+1,m)}}}for(let l=0;l<be;l++)for(let a=0;a<be;a++){const c=i+a,f=r+l,d=cr(c,f);for(let p=1;p<d-3;p++)if(n.getBlock(a,p,l)===o.STONE){const u=zn(c*31+p*97,f*53+p*13);p<=16&&u>.992?n.setBlock(a,p,l,o.DIAMOND_ORE):p<=16&&u>.987?n.setBlock(a,p,l,o.REDSTONE_ORE):u<.018?n.setBlock(a,p,l,o.COAL_ORE):u>.982?n.setBlock(a,p,l,o.IRON_ORE):u>.965&&u<=.982&&n.setBlock(a,p,l,o.GRAVEL)}}if(zn(t*911+43,e*317+89)>.92){for(let a=4;a<=11;a++)for(let c=4;c<=11;c++)for(let f=12;f<=16;f++)if(f===12||f===16||(a===4||a===11||c===4||c===11)){const h=zn(i+a,r+c+f)>.5;n.setBlock(a,f,c,h?o.MOSSY_COBBLESTONE:o.COBBLESTONE)}else n.setBlock(a,f,c,o.AIR);n.setBlock(7,13,7,o.MONSTER_SPAWNER),n.setBlock(5,13,7,o.CHEST),n.setBlock(10,13,7,o.CHEST)}return n}function Nt(t,e,n){if(e<0||e>=Et)return o.AIR;const i=Math.floor(t/be),r=Math.floor(n/be),s=`${i},0,${r}`,l=Xn.get(s);if(l){const c=(t%be+be)%be,f=(n%be+be)%be;return l.getBlock(c,e,f)}const a=cr(t,n);if(e>a)return e<=Mn?o.WATER:o.AIR;if(e>=2&&lp(t,e,n,a))return e<=8?o.LAVA:e<=Mn-8?o.WATER:o.AIR;if(e===a){const c=to(t,n);return c===lt.DESERT||a<=Mn+1?o.SAND:c===lt.SNOWY_MOUNTAINS&&a>=36?o.SNOW:o.GRASS}return e>=a-4?to(t,n)===lt.DESERT?o.SAND:o.DIRT:o.STONE}function Ho(t,e,n){return Jf(Nt(t,e,n))}function Cl(t,e){const n=`${t.cx},0,${t.cz}`,i=fl.get(n),r=ul.get(n);i&&(e.remove(i),i.geometry.dispose()),r&&(e.remove(r),r.geometry.dispose());const{solidMesh:s,waterMesh:l}=t.buildMesh(Nt);fl.set(n,s),e.add(s),l&&(ul.set(n,l),e.add(l))}function vS(t){console.log("[World] Generating starting biomes and chunks...");for(let e=-sr;e<=sr;e++)for(let n=-sr;n<=sr;n++){const i=cp(n,e);Xn.set(`${n},0,${e}`,i)}for(const e of Xn.values())Cl(e,t);console.log(`[World] Ready! ${Xn.size} chunks generated.`)}function Fd(t,e){if(!e)return;const n=Math.floor(t.x/be),i=Math.floor(t.z/be);if(n!==Nd||i!==Ld){Nd=n,Ld=i;for(const[s,l]of Xn.entries())if(Math.max(Math.abs(l.cx-n),Math.abs(l.cz-i))>pS){const c=fl.get(s),f=ul.get(s);c&&(e.remove(c),c.geometry.dispose(),fl.delete(s)),f&&(e.remove(f),f.geometry.dispose(),ul.delete(s)),l.dispose(),Xn.delete(s)}for(let s=-sr;s<=sr;s++)for(let l=-sr;l<=sr;l++){const a=n+l,c=i+s,f=`${a},0,${c}`;if(!Xn.has(f)){const d=cp(a,c);Xn.set(f,d),gc.push(d)}}}const r=Math.min(2,gc.length);for(let s=0;s<r;s++){const l=gc.shift();Xn.has(`${l.cx},0,${l.cz}`)&&Cl(l,e)}}function tu(){return{x:.5,y:cr(0,0)+2,z:.5}}function Kn(t,e,n,i,r){if(n<0||n>=Et)return;if(r===o.WATER){const p=[[e+1,n,i],[e-1,n,i],[e,n+1,i],[e,n-1,i],[e,n,i+1],[e,n,i-1]];for(const[u,h,m]of p)Nt(u,h,m)===o.LAVA&&Kn(t,u,h,m,o.OBSIDIAN)}else if(r===o.LAVA){const p=[[e+1,n,i],[e-1,n,i],[e,n+1,i],[e,n-1,i],[e,n,i+1],[e,n,i-1]];for(const[u,h,m]of p)if(Nt(u,h,m)===o.WATER){r=o.OBSIDIAN;break}}const s=Math.floor(e/be),l=Math.floor(i/be),a=`${s},0,${l}`,c=Xn.get(a);if(!c)return;const f=(e%be+be)%be,d=(i%be+be)%be;c.setBlock(f,n,d,r),Cl(c,t),f===0&&za(t,s-1,l),f===be-1&&za(t,s+1,l),d===0&&za(t,s,l-1),d===be-1&&za(t,s,l+1)}function za(t,e,n){const i=Xn.get(`${e},0,${n}`);i&&Cl(i,t)}const yo=6;function xS(t,e){const n=e.clone().normalize();let i=Math.floor(t.x),r=Math.floor(t.y),s=Math.floor(t.z);const l=n.x>=0?1:-1,a=n.y>=0?1:-1,c=n.z>=0?1:-1,f=n.x!==0?Math.abs(1/n.x):1/0,d=n.y!==0?Math.abs(1/n.y):1/0,p=n.z!==0?Math.abs(1/n.z):1/0;let u=n.x!==0?(n.x>0?i+1-t.x:t.x-i)*f:1/0,h=n.y!==0?(n.y>0?r+1-t.y:t.y-r)*d:1/0,m=n.z!==0?(n.z>0?s+1-t.z:t.z-s)*p:1/0,v=i,g=r,_=s,y=0,x=0,S=0;for(let I=0;I<yo*3;I++){if(r>=0&&r<Et){const R=Nt(i,r,s);if(Jf(R))return{hit:{x:i,y:r,z:s},normal:{x:y,y:x,z:S},prev:{x:v,y:g,z:_}}}if(v=i,g=r,_=s,u<h)if(u<m){if(u>yo)break;i+=l,u+=f,y=-l,x=0,S=0}else{if(m>yo)break;s+=c,m+=p,y=0,x=0,S=-c}else if(h<m){if(h>yo)break;r+=a,h+=d,y=0,x=-a,S=0}else{if(m>yo)break;s+=c,m+=p,y=0,x=0,S=-c}}return null}const ES=480;let hi=.2,dl=null,hl=null,Us=null,Di=null,ji=null,Ds=null;const SS={dawn:new we(16096779),morning:new we(9684477),noon:new we(6333946),sunset:new we(14753096),dusk:new we(4405450),midnight:new we(329750),predawn:new we(1973067)},MS={dawn:new we(16498468),morning:new we(9684477),noon:new we(7911912),sunset:new we(16007006),dusk:new we(3223169),midnight:new we(329489),predawn:new we(1973067)};function yS(t,e={}){Di=e.dirLight||null,ji=e.hemiLight||null,Ds=e.ambientLight||null,Us=new Ke,t.add(Us);const n=new k(20,20,20),i=new On({color:16776171});dl=new B(n,i),Us.add(dl);const r=new k(16,16,16),s=new On({color:15857145});hl=new B(r,s),Us.add(hl),fp(0,t,null)}function Bd(t,e,n,i=null){hi+=t/ES,hi>=1&&(hi-=1),n&&Us&&Us.position.copy(n.position);const r=hi*Math.PI*2-Math.PI/2,s=260,l=Math.cos(r)*s,a=Math.sin(r)*s,c=20;dl&&dl.position.set(l,a,c),hl&&hl.position.set(-l,-a,-c),Di&&(no()?Di.position.set(l,Math.max(15,a),c):Di.position.set(-l,Math.max(15,-a),-c)),fp(t,e,i)}function Gd(t,e){if(e<.15){const n=e/.15;return t.dawn.clone().lerp(t.morning,n)}else if(e<.25){const n=(e-.15)/.1;return t.morning.clone().lerp(t.noon,n)}else if(e<.5){const n=(e-.25)/.25;return t.noon.clone().lerp(t.sunset,n)}else if(e<.58){const n=(e-.5)/.08;return t.sunset.clone().lerp(t.dusk,n)}else if(e<.75){const n=(e-.58)/.17;return t.dusk.clone().lerp(t.midnight,n)}else if(e<.92){const n=(e-.75)/.17;return t.midnight.clone().lerp(t.predawn,n)}else{const n=(e-.92)/.08;return t.predawn.clone().lerp(t.dawn,n)}}function fp(t,e,n){const i=Gd(SS,hi),r=Gd(MS,hi);e&&e.fog&&e.fog.color.copy(r),n&&n.setClearColor(i);const s=Math.sin(hi*Math.PI*2);Di&&(s>0?(Di.color.set(16774624),Di.intensity=.4+s*.85):(Di.color.set(9741240),Di.intensity=Math.max(.12,-s*.28))),ji&&(s>0?(ji.color.set(8900331),ji.groundColor.set(5596723),ji.intensity=.3+s*.4):(ji.color.set(1976635),ji.groundColor.set(988970),ji.intensity=.15)),Ds&&(s>0?(Ds.color.set(16777215),Ds.intensity=.25+s*.2):(Ds.color.set(6583435),Ds.intensity=.12))}function no(){return hi<.5}function TS(){return!no()}function AS(){const t=(hi*24+6)%24,e=Math.floor(t),n=Math.floor((t-e)*60),i=e<10?"0"+e:""+e,r=n<10?"0"+n:""+n;return`${i}:${r}`}function bS(){hi=.05}const RS={[o.GRASS]:5938743,[o.DIRT]:9136404,[o.STONE]:8947848,[o.SAND]:15259274,[o.SNOW]:15790320,[o.WOOD_LOG]:7029286,[o.LEAVES]:3832352,[o.COAL_ORE]:4473924,[o.IRON_ORE]:12096874,[o.WATER]:3702992,[o.CACTUS]:1483594,[o.WOOD_PLANKS]:11817737,[o.COBBLESTONE]:6583435,[o.FLOWER_RED]:14427686,[o.FLOWER_YELLOW]:15381256,[o.DIAMOND_ORE]:2282478,[o.OBSIDIAN]:1973067,[o.LAVA]:16347926,[o.GRAVEL]:7041664,[o.NETHERRACK]:8330525,[o.SOUL_SAND]:4528643,[o.GLOWSTONE]:16436245,[o.NETHER_QUARTZ_ORE]:16317180,[o.QUARTZ_BLOCK]:15857145,[o.NETHER_PORTAL]:11032055};let gi=null;const ls=[],wS=new k(.12,.12,.12),up=new k(.08,.08,.08),OS=new k(.09,.09,.09);function CS(t){gi=t}function Cf(t,e,n,i){if(!gi)return;const r=RS[i]||11184810,s=12;for(let l=0;l<s;l++){const a=new ye({color:r}),c=new B(wS,a);c.position.set(t+.2+Math.random()*.6,e+.2+Math.random()*.6,n+.2+Math.random()*.6);const f=(Math.random()-.5)*4.5,d=Math.random()*4+1.5,p=(Math.random()-.5)*4.5,u=(Math.random()-.5)*10,h=(Math.random()-.5)*10;gi.add(c),ls.push({mesh:c,vx:f,vy:d,vz:p,rx:u,ry:h,life:.6+Math.random()*.3,age:0})}}function dp(t,e,n,i=15680580){if(!gi)return;const r=8;for(let s=0;s<r;s++){const l=new ye({color:i}),a=new B(up,l);a.position.set(t,e,n);const c=(Math.random()-.5)*5,f=Math.random()*3.5+1,d=(Math.random()-.5)*5;gi.add(a),ls.push({mesh:a,vx:c,vy:f,vz:d,rx:(Math.random()-.5)*8,ry:(Math.random()-.5)*8,life:.45+Math.random()*.2,age:0})}}function hp(t,e,n){if(!gi)return;const i=[16436245,16707722,16096779,16777215],r=16;for(let s=0;s<r;s++){const l=i[Math.floor(Math.random()*i.length)],a=new On({color:l}),c=new B(OS,a);c.position.set(t+(Math.random()-.5)*.4,e+(Math.random()-.5)*.4,n+(Math.random()-.5)*.4);const f=Math.random()*Math.PI*2,d=2.5+Math.random()*3.5,p=Math.cos(f)*d,u=Math.random()*3+1.2,h=Math.sin(f)*d;gi.add(c),ls.push({mesh:c,vx:p,vy:u,vz:h,rx:8,ry:8,life:.55+Math.random()*.25,age:0})}}function DS(t,e,n){if(!gi)return;const i=[11032055,12616956,8266446,15324671],r=i[Math.floor(Math.random()*i.length)],s=new On({color:r}),l=new B(up,s);l.position.set(t+(Math.random()-.5)*.8,e+(Math.random()-.5)*.8,n+(Math.random()-.5)*.8);const a=(Math.random()-.5)*.8,c=.4+Math.random()*.8,f=(Math.random()-.5)*.8;gi.add(l),ls.push({mesh:l,vx:a,vy:c,vz:f,rx:4,ry:4,life:.8+Math.random()*.4,age:0})}function IS(t){for(let e=ls.length-1;e>=0;e--){const n=ls[e];if(n.age+=t,n.age>=n.life){gi.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),ls.splice(e,1);continue}n.vy-=9.8*t,n.mesh.position.x+=n.vx*t,n.mesh.position.y+=n.vy*t,n.mesh.position.z+=n.vz*t,n.mesh.rotation.x+=n.rx*t,n.mesh.rotation.y+=n.ry*t;const i=n.age/n.life,r=Math.max(.01,1-i);n.mesh.scale.set(r,r,r)}}let cs=null;const kr=[],NS=new k(.26,.26,.26),LS=30;function PS(t){cs=t}function Kt(t,e,n,i){if(!cs)return;let r,s,l,a;if(typeof t=="number"&&typeof i=="number"?(s=t,l=e,a=n,r=i):(r=t,s=e,l=n,a=i),!r||r===o.AIR)return;if(kr.length>=LS){const p=kr.shift();p&&p.mesh&&cs.remove(p.mesh)}const c=ta[r]||{side:1};Go(c.side||0);const f=new ye({map:Ol()}),d=new B(NS,f);d.position.set(s+(Math.random()-.5)*.2,l+.3,a+(Math.random()-.5)*.2),cs.add(d),kr.push({itemType:r,mesh:d,pos:d.position.clone(),vel:new C((Math.random()-.5)*1.8,3,(Math.random()-.5)*1.8),age:0,bobOffset:Math.random()*Math.PI*2,collected:!1})}function US(t,e){if(!cs)return;const i=vi().clone().add(new C(0,.9,0));for(let r=kr.length-1;r>=0;r--){const s=kr[r];if(s.age+=t,s.age>120){cs.remove(s.mesh),kr.splice(r,1);continue}const l=s.pos.distanceTo(i);if(l<2.5&&s.age>.3){const a=Math.min(14,1/(l*.15+.05));if(s.pos.lerp(i,t*a),l<.65&&Qn(s.itemType)){Tx(),cs.remove(s.mesh),kr.splice(r,1);continue}}else{s.vel.y-=18*t,s.pos.x+=s.vel.x*t,s.pos.z+=s.vel.z*t,s.pos.y+=s.vel.y*t,s.vel.x*=Math.exp(-6*t),s.vel.z*=Math.exp(-6*t);const a=cr(Math.floor(s.pos.x),Math.floor(s.pos.z))+1.15;s.pos.y<=a&&(s.pos.y=a,s.vel.set(0,0,0))}s.mesh.position.copy(s.pos),s.mesh.position.y+=Math.sin(e*3.5+s.bobOffset)*.06,s.mesh.rotation.y+=t*2.2,s.mesh.rotation.x=Math.sin(e*2+s.bobOffset)*.15}}function Cn(t,e,n){const i=document.createElement("canvas");i.width=t,i.height=e;const r=i.getContext("2d");n(r,(c,f,d)=>{r.fillStyle=d,r.fillRect(c,f,1,1)},(c,f,d,p,u)=>{r.fillStyle=u,r.fillRect(c,f,d,p)},t,e);const a=new Gh(i);return a.magFilter=en,a.minFilter=en,a.generateMipmaps=!1,a}function FS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#2d5a27"),n(1,1,4,4,"#1e3f1a"),n(10,1,5,4,"#1e3f1a"),n(2,10,12,5,"#3b6e32"),n(2,3,5,5,"#450a0a"),n(9,3,5,5,"#450a0a"),e(3,4,"#7f1d1d"),e(10,4,"#7f1d1d"),e(4,5,"#991b1b"),e(11,5,"#991b1b"),n(3,4,3,3,"#fef08a"),e(4,5,"#eab308"),e(4,5,"#ef4444"),n(10,4,3,3,"#fef08a"),e(11,5,"#eab308"),e(11,5,"#ef4444"),e(7,8,"#0f172a"),e(8,8,"#0f172a"),n(3,10,10,4,"#0f172a"),e(4,10,"#fef08a"),e(6,10,"#ffffff"),e(8,10,"#fef08a"),e(10,10,"#ffffff"),e(5,13,"#ffffff"),e(7,13,"#fef08a"),e(9,13,"#ffffff"),e(5,14,"#991b1b"),e(8,14,"#7f1d1d"),e(8,15,"#991b1b")})}function BS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#0891b2"),n(0,0,16,2,"#0e7490"),n(4,3,8,10,"#450a0a"),n(5,4,6,8,"#1c1917"),n(7,3,2,8,"#f8fafc"),e(5,4,"#f8fafc"),e(6,4,"#e2e8f0"),e(4,6,"#f8fafc"),e(5,6,"#e2e8f0"),e(6,6,"#e2e8f0"),e(4,8,"#f8fafc"),e(5,8,"#e2e8f0"),e(6,8,"#e2e8f0"),e(5,10,"#f8fafc"),e(6,10,"#e2e8f0"),e(9,4,"#e2e8f0"),e(10,4,"#f8fafc"),e(9,6,"#e2e8f0"),e(10,6,"#f8fafc"),e(11,6,"#f8fafc"),e(9,8,"#e2e8f0"),e(10,8,"#f8fafc"),e(11,8,"#f8fafc"),e(9,10,"#e2e8f0"),e(10,10,"#f8fafc"),e(3,5,"#991b1b"),e(12,7,"#991b1b"),e(2,9,"#7f1d1d"),e(7,12,"#991b1b"),e(8,12,"#7f1d1d")})}function GS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#2d5a27"),n(2,3,12,3,"#1e3f1a"),n(4,8,8,4,"#3b6e32"),e(3,5,"#991b1b"),e(4,6,"#7f1d1d"),e(11,10,"#991b1b"),e(12,11,"#7f1d1d")})}function HS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,10,"#1e3a8a"),n(1,1,14,3,"#172554"),n(0,8,16,2,"#451a03"),e(3,7,"#451a03"),e(11,7,"#451a03"),n(0,10,16,6,"#2d5a27"),e(4,12,"#1e3f1a"),e(10,13,"#1e3f1a")})}function zS(){return Cn(16,16,(t,e,n)=>{const i=["#15803d","#16a34a","#22c55e","#4ade80","#14532d","#166534"];for(let r=0;r<16;r++)for(let s=0;s<16;s++)e(s,r,i[(s*7+r*13)%i.length]);n(3,4,3,3,"#0f172a"),n(10,4,3,3,"#0f172a"),n(6,6,4,3,"#0f172a"),n(5,9,6,4,"#0f172a"),n(3,11,2,3,"#0f172a"),n(11,11,2,3,"#0f172a")})}function WS(){return Cn(16,16,(t,e,n)=>{const i=["#15803d","#16a34a","#22c55e","#4ade80","#14532d"];for(let r=0;r<16;r++)for(let s=0;s<16;s++)e(s,r,i[(s*11+r*17)%i.length])})}function kS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#e2e8f0"),n(1,1,14,2,"#f8fafc"),n(2,14,12,2,"#cbd5e1"),n(2,4,4,4,"#0f172a"),n(10,4,4,4,"#0f172a"),e(3,6,"#ef4444"),e(11,6,"#ef4444"),e(7,8,"#0f172a"),e(8,8,"#0f172a"),n(3,11,10,2,"#0f172a"),e(4,11,"#ffffff"),e(6,11,"#ffffff"),e(8,11,"#ffffff"),e(10,11,"#ffffff")})}function VS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#0f172a"),n(7,0,2,16,"#f8fafc"),n(2,2,12,1,"#f8fafc"),n(2,5,12,1,"#e2e8f0"),n(3,8,10,1,"#cbd5e1"),n(4,11,8,1,"#94a3b8"),n(5,14,6,1,"#94a3b8")})}function XS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#1e293b"),n(1,1,14,3,"#0f172a"),n(5,7,2,2,"#ef4444"),e(5,7,"#ffffff"),n(9,7,2,2,"#ef4444"),e(9,7,"#ffffff"),n(2,6,2,2,"#dc2626"),n(12,6,2,2,"#dc2626"),e(6,5,"#f87171"),e(9,5,"#f87171"),e(4,10,"#b91c1c"),e(11,10,"#b91c1c")})}function KS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#0f172a"),n(3,2,10,3,"#1e293b"),n(2,6,12,4,"#334155"),n(4,11,8,3,"#1e293b"),e(7,7,"#dc2626"),e(8,7,"#dc2626")})}function qS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#f472b6"),n(1,1,14,2,"#fbcfe8"),n(1,6,2,3,"#ffffff"),e(1,7,"#0f172a"),n(13,6,2,3,"#ffffff"),e(14,7,"#0f172a"),n(4,9,8,5,"#fb7185"),e(6,11,"#450a0a"),e(9,11,"#450a0a")})}function YS(){return Cn(16,16,(t,e,n)=>{n(0,0,16,16,"#e2e8f0"),n(0,0,16,4,"#f8fafc"),n(2,4,12,10,"#cbd5e1"),n(2,6,3,2,"#ffffff"),e(3,7,"#0f172a"),n(11,6,3,2,"#ffffff"),e(12,7,"#0f172a"),n(6,10,4,3,"#f472b6")})}const qe={PIG:"pig",SHEEP:"sheep",ZOMBIE:"zombie",SKELETON:"skeleton",SPIDER:"spider",CREEPER:"creeper"};let Pt=null;const $n=[],Nr=[],il=[];let xc=0;const $S=10;function ZS(t,e,n,i,r,s){const l=i-t,a=r-e,c=s-n,f=Math.hypot(l,a,c);if(f<.3)return!0;const d=Math.ceil(f*2.2),p=l/d,u=a/d,h=c/d;for(let m=1;m<d;m++){const v=Math.floor(t+p*m),g=Math.floor(e+u*m),_=Math.floor(n+h*m);if(Ho(v,g,_))return!1}return!0}function jS(){const t=new Ke,e=qS(),n=new ye({map:e}),i=new ye({color:16020150}),r=new ye({color:16478597}),s=new B(new k(.7,.5,.9),i);s.position.set(0,.45,0),t.add(s);const l=new B(new k(.45,.45,.45),[i,i,i,i,i,n]);l.position.set(0,.65,-.55),t.add(l);const a=new B(new k(.24,.16,.12),r);a.position.set(0,.58,-.8),t.add(a);const c=new k(.18,.35,.18),f=[],d=[[-.24,.18,-.3],[.24,.18,-.3],[-.24,.18,.3],[.24,.18,.3]];for(const p of d){const u=new B(c,i);u.position.set(...p),t.add(u),f.push(u)}return{group:t,legs:f,head:l,body:s,originalMats:[i,r,n]}}function QS(){const t=new Ke,e=YS(),n=new ye({map:e}),i=new ye({color:16317180}),r=new ye({color:3359061}),s=new B(new k(.75,.6,.95),i);s.position.set(0,.5,0),t.add(s);const l=new B(new k(.42,.42,.42),[r,r,i,r,r,n]);l.position.set(0,.68,-.55),t.add(l);const a=new k(.16,.36,.16),c=[],f=[[-.24,.18,-.3],[.24,.18,-.3],[-.24,.18,.3],[.24,.18,.3]];for(const d of f){const p=new B(a,r);p.position.set(...d),t.add(p),c.push(p)}return{group:t,legs:c,head:l,body:s,originalMats:[i,r,n]}}function JS(){const t=new Ke,e=FS(),n=BS(),i=GS(),r=HS(),s=new ye({map:e}),l=new ye({map:n}),a=new ye({map:i}),c=new ye({map:r}),f=new ye({color:2972199}),d=new B(new k(.44,.44,.44),[f,f,f,f,f,s]);d.position.set(0,1.45,0),t.add(d);const p=new B(new k(.5,.65,.28),[f,f,f,f,f,l]);p.position.set(0,.9,0),t.add(p);const u=new k(.16,.16,.55),h=new B(u,a);h.position.set(-.35,1.05,-.26);const m=new B(u,a);m.position.set(.35,1.05,-.26),t.add(h),t.add(m);const v=new k(.2,.6,.22),g=new B(v,c);g.position.set(-.13,.3,0);const _=new B(v,c);return _.position.set(.13,.3,0),t.add(g),t.add(_),{group:t,legs:[g,_],arms:[h,m],head:d,body:p,originalMats:[s,l,a,c,f]}}function eM(){const t=new Ke,e=kS(),n=VS(),i=new ye({map:e}),r=new ye({map:n}),s=new ye({color:14870768}),l=new ye({color:7877903}),a=new B(new k(.42,.42,.42),[s,s,s,s,s,i]);a.position.set(0,1.45,0),t.add(a);const c=new B(new k(.42,.6,.22),[s,s,s,s,s,r]);c.position.set(0,.9,0),t.add(c);const f=new k(.12,.6,.12),d=new B(f,s);d.position.set(-.3,.9,0);const p=new B(f,s);p.position.set(.3,.9,0),t.add(d),t.add(p);const u=new B(new k(.08,.5,.08),l);u.position.set(-.3,.85,-.2),u.rotation.x=.4,t.add(u);const h=new k(.14,.6,.14),m=new B(h,s);m.position.set(-.12,.3,0);const v=new B(h,s);return v.position.set(.12,.3,0),t.add(m),t.add(v),{group:t,legs:[m,v],arms:[d,p],head:a,body:c,bow:u,originalMats:[i,r,s,l]}}function tM(){const t=new Ke,e=XS(),n=KS(),i=new ye({map:e}),r=new ye({map:n}),s=new ye({color:1976635}),l=new B(new k(.65,.45,.7),[s,s,s,s,r,s]);l.position.set(0,.35,.4),t.add(l);const a=new B(new k(.45,.35,.45),[s,s,s,s,s,i]);a.position.set(0,.3,-.25),t.add(a);const c=new k(.6,.08,.08),f=[];for(let d=0;d<4;d++){const p=new B(c,s);p.position.set(-.45,.22,-.3+d*.22),p.rotation.z=.35,t.add(p),f.push(p);const u=new B(c,s);u.position.set(.45,.22,-.3+d*.22),u.rotation.z=-.35,t.add(u),f.push(u)}return{group:t,legs:f,head:a,body:l,originalMats:[i,r,s]}}function nM(){const t=new Ke,e=zS(),n=WS(),i=new ye({map:e}),r=new ye({map:n}),s=new ye({color:1483594}),l=new B(new k(.46,.46,.46),[r,r,r,r,r,i]);l.position.set(0,1.45,0),t.add(l);const a=new B(new k(.46,.65,.26),r);a.position.set(0,.9,0),t.add(a);const c=new k(.2,.45,.2),f=[],d=[[-.14,.22,-.16],[.14,.22,-.16],[-.14,.22,.16],[.14,.22,.16]];for(const p of d){const u=new B(c,r);u.position.set(...p),t.add(u),f.push(u)}return{group:t,legs:f,head:l,body:a,originalMats:[i,r,s]}}function iM(t){Pt=t}function Lr(t,e,n,i){if(!Pt)return null;let r,s=10,l=1.4;t===qe.PIG?(r=jS(),s=10,l=.6):t===qe.SHEEP?(r=QS(),s=10,l=.65):t===qe.SKELETON?(r=eM(),s=16,l=1.45):t===qe.SPIDER?(r=tM(),s=14,l=.35):t===qe.CREEPER?(r=nM(),s=18,l=1.45):(r=JS(),s=20,l=1.45),r.group.position.set(e,n,i),Pt.add(r.group);const a={type:t,model:r,pos:new C(e,n,i),vel:new C(0,0,0),yaw:0,health:s,maxHealth:s,eyeHeight:l,state:"idle",stateTimer:Math.random()*2,lastSeenPos:null,canSeePlayer:!1,losCheckTimer:Math.random()*.25,attackCooldown:0,shootCooldown:2,fuseTimer:0,isFusing:!1,isAngered:!1,burnTimer:0,onGround:!0,flashRedTimer:0};return $n.push(a),a}function nu(t,e,n){if(!t||t.health<=0)return;t.health-=e,t.flashRedTimer=.22,Ex(),dp(t.pos.x,t.pos.y+t.eyeHeight*.5,t.pos.z);const i=n.clone().multiplyScalar(4.5);t.vel.x+=i.x,t.vel.z+=i.z,t.vel.y=3.5,t.isAngered=!0,t.type===qe.PIG?(t.state="flee",t.stateTimer=4.5,Mx()):t.type===qe.SHEEP?(t.state="flee",t.stateTimer=4.5,qh()):(t.state="chase",t.lastSeenPos=vi().clone(),t.type===qe.ZOMBIE&&Sx()),t.health<=0&&pl(t)}function pl(t){Pt.remove(t.model.group);const e=$n.indexOf(t);e!==-1&&$n.splice(e,1),t.type===qe.PIG?Kt(o.PORKCHOP,t.pos.x,t.pos.y+.5,t.pos.z):t.type===qe.SHEEP?(Kt(o.WOOL,t.pos.x,t.pos.y+.5,t.pos.z),Kt(o.MUTTON,t.pos.x,t.pos.y+.5,t.pos.z)):t.type===qe.ZOMBIE?(Kt(o.ROTTEN_FLESH,t.pos.x,t.pos.y+.5,t.pos.z),Math.random()<.25&&Kt(o.IRON_INGOT,t.pos.x,t.pos.y+.5,t.pos.z)):t.type===qe.SKELETON?(Kt(o.BONE,t.pos.x,t.pos.y+.5,t.pos.z),Kt(o.ARROW,t.pos.x,t.pos.y+.5,t.pos.z)):t.type===qe.SPIDER?(Kt(o.STRING,t.pos.x,t.pos.y+.5,t.pos.z),Kt(o.SPIDER_EYE,t.pos.x,t.pos.y+.5,t.pos.z)):t.type===qe.CREEPER&&Kt(o.GUNPOWDER,t.pos.x,t.pos.y+.5,t.pos.z)}function pp(t,e,n,i=2.8,r=16){if(!Pt)return;bx();const s=new C(t,e,n),a=vi().clone().add(new C(0,.9,0)).sub(s),c=a.length();if(c<i*2.2){const v=1-c/(i*2.2),g=Math.max(2,Math.round(r*v));ro(g,a.clone().normalize())}for(const v of $n)v.pos.distanceTo(s)<i*2&&nu(v,14,v.pos.clone().sub(s).normalize());const f=Math.floor(t-i),d=Math.ceil(t+i),p=Math.max(1,Math.floor(e-i)),u=Math.min(63,Math.ceil(e+i)),h=Math.floor(n-i),m=Math.ceil(n+i);for(let v=h;v<=m;v++)for(let g=f;g<=d;g++)for(let _=p;_<=u;_++)if(Math.hypot(g+.5-t,_+.5-e,v+.5-n)<=i){const x=Nt(g,_,v);if(x!==o.AIR&&x!==o.WATER&&(Cf(g,_,v,x),Kn(Pt,g,_,v,o.AIR),Math.random()<.4)){const S=ap(x);S>0&&Kt(S,g+.5,_+.5,v+.5)}}}function rM(t,e,n){if(!Pt)return;Kn(Pt,t,e,n,o.AIR);const i=new k(.98,.98,.98),r=new ye({color:15680580}),s=new B(i,r);s.position.set(t+.5,e+.5,n+.5),Pt.add(s),Kh(),il.push({mesh:s,mat:r,pos:new C(t+.5,e+.5,n+.5),timer:2.2,blinkTimer:0})}function sM(t){for(let e=il.length-1;e>=0;e--){const n=il[e];n.timer-=t,n.blinkTimer+=t*10,Math.floor(n.blinkTimer)%2===0?n.mat.color.setHex(16777215):n.mat.color.setHex(15680580),n.timer<=0&&(Pt.remove(n.mesh),il.splice(e,1),pp(n.pos.x,n.pos.y,n.pos.z,3.8,20))}}function oM(t,e){if(!Pt)return;Ax();const n=new k(.08,.08,.6),i=new On({color:16317180}),r=new B(n,i);r.position.copy(t),Pt.add(r);const s=e.clone().multiplyScalar(24);Nr.push({mesh:r,pos:t.clone(),vel:s,life:5,isPlayerShot:!0})}function aM(t,e){if(!Pt)return;const n=new k(.08,.08,.5),i=new On({color:14870768}),r=new B(n,i);r.position.copy(t),Pt.add(r);const l=e.clone().sub(t).normalize().multiplyScalar(16);Nr.push({mesh:r,pos:t.clone(),vel:l,life:4,isPlayerShot:!1})}function lM(t){const e=vi();for(let n=Nr.length-1;n>=0;n--){const i=Nr[n];if(i.life-=t,i.vel.y-=12*t,i.pos.addScaledVector(i.vel,t),i.mesh.position.copy(i.pos),i.isPlayerShot){let r=!1;for(const s of $n){const l=s.pos.clone().add(new C(0,s.eyeHeight*.5,0));if(i.pos.distanceTo(l)<.9){nu(s,9,i.vel.clone().normalize()),Pt.remove(i.mesh),Nr.splice(n,1),r=!0;break}}if(r)continue}else if(i.pos.distanceTo(e.clone().add(new C(0,.9,0)))<.75){ro(4,i.vel.clone().normalize()),Pt.remove(i.mesh),Nr.splice(n,1);continue}(Ho(Math.floor(i.pos.x),Math.floor(i.pos.y),Math.floor(i.pos.z))||i.life<=0)&&(Pt.remove(i.mesh),Nr.splice(n,1))}}function cM(t){const e=vi();xc+=t,xc>4&&$n.length<$S&&(xc=0,fM(e)),lM(t),sM(t);for(let n=$n.length-1;n>=0;n--){const i=$n[n],r=i.pos.distanceTo(e);if(r>52){Pt.remove(i.model.group),$n.splice(n,1);continue}uM(i,t,e,r)}}function fM(t){const e=Math.random()*Math.PI*2,n=24+Math.random()*14,i=Math.floor(t.x+Math.cos(e)*n),r=Math.floor(t.z+Math.sin(e)*n),s=cr(i,r);if(s>15&&s<55)if(no()){if($n.filter(c=>c.type===qe.PIG||c.type===qe.SHEEP).length<5){const c=Math.random()<.5?qe.PIG:qe.SHEEP;Lr(c,i+.5,s+1,r+.5)}}else{const a=Math.random();a<.35?Lr(qe.ZOMBIE,i+.5,s+1,r+.5):a<.6?Lr(qe.SKELETON,i+.5,s+1,r+.5):a<.8?Lr(qe.CREEPER,i+.5,s+1,r+.5):Lr(qe.SPIDER,i+.5,s+1,r+.5)}}function uM(t,e,n,i){if((t.type===qe.ZOMBIE||t.type===qe.SKELETON)&&no()){const v=cr(Math.floor(t.pos.x),Math.floor(t.pos.z));if(t.pos.y>=v&&(t.burnTimer+=e,t.burnTimer>=1&&(t.burnTimer=0,t.health-=2,dp(t.pos.x,t.pos.y+1,t.pos.z),t.health<=0))){pl(t);return}}if(t.losCheckTimer-=e,t.losCheckTimer<=0){t.losCheckTimer=.3;const v=ZS(t.pos.x,t.pos.y+t.eyeHeight,t.pos.z,n.x,n.y+1.2,n.z);t.canSeePlayer=v&&i<16,t.canSeePlayer?(t.lastSeenPos=n.clone(),t.type!==qe.PIG&&(t.type===qe.SPIDER&&no()&&!t.isAngered?t.state="idle":t.state="chase")):i>22&&t.state==="chase"&&(t.state="idle")}t.type===qe.PIG?_M(t,e,n):t.type===qe.SHEEP?gM(t,e,n):t.type===qe.SKELETON?pM(t,e,n,i):t.type===qe.SPIDER?mM(t,e,n,i):t.type===qe.CREEPER?dM(t,e,n,i):hM(t,e,n,i),t.vel.y-=24*e,t.pos.addScaledVector(t.vel,e);const r=Math.floor(t.pos.x),s=Math.floor(t.pos.z),l=Math.floor(t.pos.y);let a=-999;const c=Math.min(63,l+1);for(let v=c;v>=0;v--)if(Ho(r,v,s)){a=v+1;break}if(a>=0&&t.pos.y<=a)t.pos.y=a,t.vel.y=0,t.onGround=!0;else if(t.pos.y<-10){pl(t);return}else t.onGround=!1;const f=t.pos.x+t.vel.x*e,d=t.pos.z+t.vel.z*e,p=Math.floor(t.pos.y);Ho(Math.floor(f),p,Math.floor(d))&&(Ho(Math.floor(f),p+1,Math.floor(d))?(t.vel.x=0,t.vel.z=0):t.onGround&&(t.vel.y=5.8,t.onGround=!1)),t.vel.x*=Math.exp(-8*e),t.vel.z*=Math.exp(-8*e),t.model.group.position.copy(t.pos),t.model.group.rotation.y=t.yaw+Math.PI,t.flashRedTimer>0?(t.flashRedTimer-=e,t.model.group.traverse(v=>{v.isMesh&&v.material&&(Array.isArray(v.material)?v.material:[v.material]).forEach(_=>{_.emissive&&(_.emissive.setHex(15680580),_.emissiveIntensity=.85)})}),t.model.group.rotation.x=-.22):(t.model.group.traverse(v=>{v.isMesh&&v.material&&(Array.isArray(v.material)?v.material:[v.material]).forEach(_=>{_.emissive&&(_.emissive.setHex(0),_.emissiveIntensity=0)})}),t.model.group.rotation.x=0);const h=t.vel.x*t.vel.x+t.vel.z*t.vel.z>.05,m=performance.now()*.005;if(t.model.legs&&t.model.legs.length>=2)if(t.type===qe.SPIDER)for(let v=0;v<t.model.legs.length;v++)t.model.legs[v].rotation.x=h?Math.sin(m*2+v)*.35:0;else t.model.legs.length===4?(t.model.legs[0].rotation.x=h?Math.sin(m*1.5)*.5:0,t.model.legs[1].rotation.x=h?-Math.sin(m*1.5)*.5:0,t.model.legs[2].rotation.x=h?-Math.sin(m*1.5)*.5:0,t.model.legs[3].rotation.x=h?Math.sin(m*1.5)*.5:0):t.model.legs.length===2&&(t.model.legs[0].rotation.x=h?Math.sin(m*1.5)*.5:0,t.model.legs[1].rotation.x=h?-Math.sin(m*1.5)*.5:0);t.type===qe.ZOMBIE&&t.model.arms&&t.model.arms.length===2&&(i<2?(t.model.arms[0].rotation.x=-Math.PI*.45+Math.sin(m*3)*.5,t.model.arms[1].rotation.x=-Math.PI*.45+Math.cos(m*3)*.5):(t.model.arms[0].rotation.x=-Math.PI*.5,t.model.arms[1].rotation.x=-Math.PI*.5))}function dM(t,e,n,i){if(t.state==="chase"){t.yaw=Math.atan2(n.x-t.pos.x,n.z-t.pos.z);const r=1.8;if(t.vel.x=Math.sin(t.yaw)*r,t.vel.z=Math.cos(t.yaw)*r,i<2.4){t.isFusing||(t.isFusing=!0,Kh()),t.fuseTimer+=e,t.vel.x=0,t.vel.z=0;const s=1+t.fuseTimer/1.8*.35;if(t.model.group.scale.set(s,s,s),t.fuseTimer>=1.8){pp(t.pos.x,t.pos.y+.5,t.pos.z,2.8,16),pl(t);return}}else i>4.5&&t.isFusing&&(t.isFusing=!1,t.fuseTimer=0,t.model.group.scale.set(1,1,1))}}function hM(t,e,n,i){if(t.state==="chase"){t.yaw=Math.atan2(n.x-t.pos.x,n.z-t.pos.z);const r=1.8;t.vel.x=Math.sin(t.yaw)*r,t.vel.z=Math.cos(t.yaw)*r,i<1.4&&(t.attackCooldown-=e,t.attackCooldown<=0&&(t.attackCooldown=1.2,ro(3,new C(Math.sin(t.yaw),0,Math.cos(t.yaw)))))}}function pM(t,e,n,i){t.yaw=Math.atan2(n.x-t.pos.x,n.z-t.pos.z),t.canSeePlayer&&(i<8?(t.vel.x=-Math.sin(t.yaw)*1.8,t.vel.z=-Math.cos(t.yaw)*1.8):i>14&&(t.vel.x=Math.sin(t.yaw)*1.8,t.vel.z=Math.cos(t.yaw)*1.8),t.shootCooldown-=e,t.shootCooldown<=0&&i<18&&(t.shootCooldown=2.8,Vh(),aM(t.pos.clone().add(new C(0,1.2,0)),n.clone().add(new C(0,.9,0)))))}function mM(t,e,n,i){if(t.state==="chase"){t.yaw=Math.atan2(n.x-t.pos.x,n.z-t.pos.z);const r=2.8;t.vel.x=Math.sin(t.yaw)*r,t.vel.z=Math.cos(t.yaw)*r,i<4&&t.onGround&&Math.random()<.04&&(t.vel.y=4.8,t.vel.x*=1.4,t.vel.z*=1.4,t.onGround=!1),i<1.3&&(t.attackCooldown-=e,t.attackCooldown<=0&&(t.attackCooldown=1,ro(2,new C(Math.sin(t.yaw),0,Math.cos(t.yaw)))))}}function _M(t,e,n,i){if(t.state==="flee"){t.stateTimer-=e;const r=t.pos.clone().sub(n).normalize();t.yaw=Math.atan2(r.x,r.z),t.vel.x=Math.sin(t.yaw)*2.8,t.vel.z=Math.cos(t.yaw)*2.8,t.stateTimer<=0&&(t.state="idle")}else t.stateTimer-=e,t.stateTimer<=0&&(t.stateTimer=2.5+Math.random()*3.5,t.yaw+=(Math.random()-.5)*1.8),t.vel.x=Math.sin(t.yaw)*.9,t.vel.z=Math.cos(t.yaw)*.9}function gM(t,e,n,i){if(t.state==="flee"){t.stateTimer-=e;const r=t.pos.clone().sub(n).normalize();t.yaw=Math.atan2(r.x,r.z),t.vel.x=Math.sin(t.yaw)*2.8,t.vel.z=Math.cos(t.yaw)*2.8,t.stateTimer<=0&&(t.state="idle")}else{if(t.stateTimer-=e,t.stateTimer<=0&&(t.stateTimer=3+Math.random()*4,t.yaw+=(Math.random()-.5)*1.8,Math.random()<.25))try{qh()}catch{}t.vel.x=Math.sin(t.yaw)*.85,t.vel.z=Math.cos(t.yaw)*.85}}function vM(t,e,n=3.8){let i=null,r=n;for(const s of $n){if(s.health<=0)continue;const a=s.pos.clone().add(new C(0,s.eyeHeight*.5,0)).clone().sub(t),c=a.dot(e);c>0&&c<r&&a.clone().sub(e.clone().multiplyScalar(c)).length()<.9&&(r=c,i=s)}return i}const Is=new Map,Vr=new Map,ml=new Map,zo=new Map;function xM(t){Is.clear(),Vr.clear(),ml.clear(),zo.clear()}function Wo(t,e,n){return`${t},${e},${n}`}function EM(t,e,n){const i=Wo(t,e,n),s=!!!ml.get(i);return ml.set(i,s),_l(),s}function SM(t,e,n){const i=Wo(t,e,n),r=!Vr.get(i);Vr.set(i,r);const s=Nt(t,e,n);return s===o.WOODEN_DOOR_BOTTOM||s===o.IRON_DOOR_BOTTOM?Vr.set(Wo(t,e+1,n),r):(s===o.WOODEN_DOOR_TOP||s===o.IRON_DOOR_TOP)&&Vr.set(Wo(t,e-1,n),r),yx(r),r}function _l(){Is.clear();const t=[];for(const[n,i]of ml.entries())if(i){const[r,s,l]=n.split(",").map(Number);Is.set(n,15),t.push({x:r,y:s,z:l,power:15})}for(const[n]of zo.entries()){const[i,r,s]=n.split(",").map(Number);Is.set(n,15),t.push({x:i,y:r,z:s,power:15})}const e=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1],[1,-1,0],[-1,-1,0],[0,-1,1],[0,-1,-1],[1,1,0],[-1,1,0],[0,1,1],[0,1,-1]];for(;t.length>0;){const n=t.shift();if(!(n.power<=1))for(const[i,r,s]of e){const l=n.x+i,a=n.y+r,c=n.z+s,f=Wo(l,a,c),d=Nt(l,a,c);if(d===o.REDSTONE_WIRE){const p=n.power-1,u=Is.get(f)||0;p>u&&(Is.set(f,p),t.push({x:l,y:a,z:c,power:p}))}d===o.TNT&&n.power>0,(d===o.WOODEN_DOOR_BOTTOM||d===o.WOODEN_DOOR_TOP||d===o.IRON_DOOR_BOTTOM||d===o.IRON_DOOR_TOP)&&(Vr.get(f)||Vr.set(f,!0))}}}function MM(t){let e=!1;for(const[n,i]of zo.entries()){const r=i-t;r<=0?(zo.delete(n),e=!0):zo.set(n,r)}e&&_l()}let Ec=null;function Hd(){return Ec||(Ec=tp()),Ec}function Sc(t,e,n,i){const[r,s,l,a]=e,c=(s[0]-r[0])/16,f=(s[1]-r[1])/16,d=(a[0]-r[0])/16,p=(a[1]-r[1])/16;t.save(),t.filter=`brightness(${i})`,t.setTransform(c,f,d,p,r[0],r[1]),t.drawImage(n,0,0,16,16,0,0,16,16),t.restore()}function Ve(t,e){const n=document.createElement("canvas");n.width=16,n.height=16;const i=n.getContext("2d");e(i,(c,f,d)=>{i.fillStyle=d,i.fillRect(c,f,1,1)},(c,f,d,p,u)=>{i.fillStyle=u,i.fillRect(c,f,d,p)});const l=document.createElement("canvas");l.width=t,l.height=t;const a=l.getContext("2d");return a.imageSmoothingEnabled=!1,a.drawImage(n,0,0,16,16,0,0,t,t),l}function Lt(t,e=46){if(t===o.DIAMOND_SWORD||t===o.IRON_SWORD||t===o.STONE_SWORD||t===o.WOODEN_SWORD){let u,h,m,v,g,_;return t===o.DIAMOND_SWORD?(u="#083344",h="#0891b2",m="#22d3ee",v="#e0f2fe",g="#0f172a",_="#78350f"):t===o.IRON_SWORD?(u="#1e293b",h="#64748b",m="#cbd5e1",v="#ffffff",g="#334155",_="#854d0e"):t===o.STONE_SWORD?(u="#0f172a",h="#475569",m="#64748b",v="#94a3b8",g="#1e293b",_="#78350f"):(u="#451a03",h="#78350f",m="#b45309",v="#fbbf24",g="#451a03",_="#451a03"),Ve(e,(y,x,S)=>{x(14,1,v),x(13,1,h),x(14,2,h);for(let I=0;I<7;I++){const R=13-I,w=2+I;x(R+1,w,u),x(R,w,v),x(R-1,w,m),x(R,w+1,m),x(R-1,w+1,h),x(R-2,w+1,u),x(R-1,w+2,u)}x(8,6,g),x(9,7,g),x(5,9,g),x(6,10,g),x(5,8,u),x(4,9,u),x(6,11,u),x(7,10,u),x(9,6,u),x(10,7,u),x(5,10,_),x(4,11,_),x(3,12,_),x(4,10,u),x(5,11,u),x(3,11,u),x(4,12,u),x(2,13,g),x(1,14,g),x(2,14,u),x(1,13,u),x(0,14,u),x(1,15,u),x(2,15,u)})}if(t===o.DIAMOND_PICKAXE||t===o.IRON_PICKAXE||t===o.STONE_PICKAXE||t===o.WOODEN_PICKAXE){let u,h,m;return t===o.DIAMOND_PICKAXE?(u="#0891b2",h="#22d3ee",m="#e0f2fe"):t===o.IRON_PICKAXE?(u="#64748b",h="#cbd5e1",m="#ffffff"):t===o.STONE_PICKAXE?(u="#334155",h="#64748b",m="#94a3b8"):(u="#78350f",h="#b45309",m="#fbbf24"),Ve(e,(v,g,_)=>{g(5,3,m),g(6,2,m),g(7,2,u),g(8,2,m),g(9,2,m),g(10,3,u),g(11,4,h),g(12,5,h),g(13,6,m),g(14,7,u),g(4,4,h),g(3,5,h),g(2,6,m),g(1,7,u),g(8,3,u),g(9,4,u),g(7,4,u);for(let y=0;y<9;y++)g(8-y,4+y,"#78350f"),g(9-y,4+y,"#451a03")})}if(t===o.IRON_HOE||t===o.STONE_HOE||t===o.WOODEN_HOE){const u=t===o.IRON_HOE,h=t===o.STONE_HOE,m=u?"#cbd5e1":h?"#64748b":"#b45309",v=u?"#ffffff":h?"#94a3b8":"#fbbf24";return Ve(e,(g,_,y)=>{y(8,2,5,2,m),y(12,4,2,3,m),_(9,2,v),_(10,2,v),_(13,4,v);for(let x=0;x<10;x++)_(8-x,4+x,"#78350f")})}if(t===o.BOW)return Ve(e,(u,h,m)=>{h(13,2,"#451a03"),h(12,1,"#78350f"),h(11,2,"#b45309"),h(9,4,"#78350f"),h(7,6,"#b45309"),h(5,8,"#78350f"),h(3,10,"#b45309"),h(2,11,"#78350f"),h(1,12,"#451a03"),h(2,13,"#78350f");for(let v=0;v<11;v++)h(13-v,3+v,"#f8fafc")});if(t===o.ARROW)return Ve(e,(u,h,m)=>{h(13,2,"#334155"),h(14,1,"#475569"),h(12,3,"#94a3b8"),h(13,3,"#e2e8f0");for(let v=0;v<8;v++)h(11-v,4+v,"#78350f");h(3,12,"#f8fafc"),h(2,13,"#cbd5e1"),h(4,13,"#94a3b8"),h(2,14,"#94a3b8")});if(t===o.WOODEN_SHIELD||t===o.IRON_SHIELD){const u=t===o.IRON_SHIELD;return Ve(e,(h,m,v)=>{v(3,1,10,1,u?"#334155":"#451a03"),v(2,2,12,8,u?"#475569":"#5c2207"),v(3,10,10,2,u?"#475569":"#5c2207"),v(4,12,8,2,u?"#475569":"#5c2207"),v(6,14,4,1,u?"#334155":"#451a03"),v(4,3,8,6,u?"#cbd5e1":"#b45309"),v(5,9,6,2,u?"#cbd5e1":"#b45309"),v(6,11,4,2,u?"#cbd5e1":"#b45309"),v(7,5,2,2,u?"#ffffff":"#f59e0b"),m(4,3,u?"#f8fafc":"#d97706")})}if(t===o.DIAMOND_HELMET||t===o.IRON_HELMET){const u=t===o.DIAMOND_HELMET,h=u?"#e0f2fe":"#ffffff",m=u?"#22d3ee":"#cbd5e1",v=u?"#0891b2":"#64748b",g=u?"#083344":"#1e293b";return Ve(e,(_,y,x)=>{x(4,3,8,6,m),x(5,2,6,1,h),x(3,5,10,6,m),x(6,7,4,4,"#0f172a"),x(4,4,2,2,h),x(3,10,3,3,v),x(10,10,3,3,v),_.strokeStyle=g,_.strokeRect(3.5,2.5,9,10)})}if(t===o.DIAMOND_CHESTPLATE||t===o.IRON_CHESTPLATE){const u=t===o.DIAMOND_CHESTPLATE,h=u?"#e0f2fe":"#ffffff",m=u?"#22d3ee":"#cbd5e1",v=u?"#0891b2":"#64748b";return Ve(e,(g,_,y)=>{y(2,2,4,4,m),y(10,2,4,4,m),_(3,2,h),_(11,2,h),y(6,2,4,2,"#00000000"),y(4,4,8,8,m),y(5,5,2,2,h),y(4,12,8,2,v),y(1,5,3,5,v),y(12,5,3,5,v)})}if(t===o.DIAMOND_LEGGINGS||t===o.IRON_LEGGINGS){const u=t===o.DIAMOND_LEGGINGS,h=u?"#e0f2fe":"#ffffff",m=u?"#22d3ee":"#cbd5e1",v=u?"#0891b2":"#64748b";return Ve(e,(g,_,y)=>{y(3,3,10,3,m),_(4,3,h),y(3,6,4,8,m),y(9,6,4,8,m),y(3,12,4,2,v),y(9,12,4,2,v)})}if(t===o.DIAMOND_BOOTS||t===o.IRON_BOOTS){const u=t===o.DIAMOND_BOOTS,h=u?"#e0f2fe":"#ffffff",m=u?"#22d3ee":"#cbd5e1",v=u?"#0891b2":"#64748b";return Ve(e,(g,_,y)=>{y(2,6,4,5,m),y(1,11,5,3,m),_(2,6,h),y(1,13,5,1,v),y(10,6,4,5,m),y(10,11,5,3,m),_(11,6,h),y(10,13,5,1,v)})}if(t===o.DIAMOND)return Ve(e,(u,h,m)=>{m(5,3,6,1,"#e0f2fe"),m(3,4,10,2,"#67e8f9"),m(2,6,12,3,"#22d3ee"),m(3,9,10,2,"#06b6d4"),m(5,11,6,2,"#0891b2"),m(7,13,2,1,"#083344"),h(6,5,"#ffffff"),h(7,5,"#ffffff"),h(6,6,"#ffffff")});if(t===o.IRON_INGOT)return Ve(e,(u,h,m)=>{m(4,5,8,1,"#ffffff"),m(3,6,10,4,"#e2e8f0"),m(2,10,11,2,"#94a3b8"),m(3,12,10,1,"#475569"),h(4,7,"#ffffff"),h(5,7,"#ffffff")});if(t===o.FLINT)return Ve(e,(u,h,m)=>{m(7,3,2,2,"#64748b"),m(5,5,6,4,"#334155"),m(4,9,8,3,"#1e293b"),m(6,12,4,2,"#0f172a"),h(6,5,"#94a3b8"),h(7,6,"#e2e8f0")});if(t===o.QUARTZ)return Ve(e,(u,h,m)=>{m(7,2,2,2,"#ffffff"),m(6,4,4,3,"#f8fafc"),m(5,7,6,4,"#e2e8f0"),m(6,11,4,3,"#cbd5e1"),m(7,14,2,1,"#94a3b8"),h(7,4,"#ffffff"),h(8,7,"#ffffff")});if(t===o.REDSTONE_DUST)return Ve(e,(u,h,m)=>{m(6,5,4,6,"#ef4444"),m(4,7,8,4,"#dc2626"),m(3,9,10,3,"#991b1b"),h(7,6,"#fca5a5"),h(8,6,"#ffffff"),h(4,11,"#ef4444"),h(11,11,"#ef4444")});if(t===o.GOLDEN_APPLE)return Ve(e,(u,h,m)=>{h(8,2,"#78350f"),h(7,1,"#78350f"),h(9,2,"#16a34a"),h(10,1,"#22c55e"),m(5,3,6,1,"#fef08a"),m(3,4,10,2,"#facc15"),m(2,6,12,5,"#eab308"),m(3,11,10,2,"#ca8a04"),m(5,13,6,1,"#a16207"),h(4,5,"#ffffff"),h(5,5,"#ffffff"),h(4,6,"#ffffff")});if(t===o.BREAD)return Ve(e,(u,h,m)=>{m(4,6,8,1,"#fef08a"),m(3,7,10,3,"#d97706"),m(2,10,11,2,"#b45309"),m(4,12,8,1,"#78350f"),h(5,7,"#fef08a"),h(8,7,"#fef08a"),h(11,7,"#fef08a")});if(t===o.WHEAT)return Ve(e,(u,h,m)=>{h(8,2,"#fef08a"),h(7,3,"#facc15"),h(9,3,"#facc15"),m(6,4,4,3,"#eab308"),m(5,7,6,3,"#ca8a04"),m(7,10,2,2,"#78350f"),m(6,12,4,3,"#eab308")});if(t===o.WHEAT_SEEDS)return Ve(e,(u,h,m)=>{m(4,4,2,2,"#ca8a04"),h(4,4,"#fef08a"),m(10,5,2,2,"#ca8a04"),h(10,5,"#fef08a"),m(6,9,2,2,"#ca8a04"),h(6,9,"#fef08a"),m(11,11,2,2,"#ca8a04"),h(11,11,"#fef08a")});if(t===o.PORKCHOP||t===o.MUTTON)return Ve(e,(u,h,m)=>{m(4,5,7,2,"#fda4af"),m(3,7,9,4,"#f43f5e"),m(5,11,6,2,"#be123c"),m(10,4,2,2,"#ffffff"),h(11,5,"#cbd5e1")});if(t===o.COOKED_PORKCHOP||t===o.COOKED_MUTTON)return Ve(e,(u,h,m)=>{m(4,5,7,2,"#b45309"),m(3,7,9,4,"#9a3412"),m(5,11,6,2,"#7c2d12"),h(5,8,"#451a03"),h(8,8,"#451a03")});if(t===o.ROTTEN_FLESH)return Ve(e,(u,h,m)=>{m(4,5,8,3,"#65a30d"),m(3,8,9,4,"#4d7c0f"),m(5,12,6,2,"#365314"),h(5,7,"#84cc16"),h(9,9,"#15803d")});if(t===o.EXPERIENCE_BOTTLE)return Ve(e,(u,h,m)=>{m(7,2,2,1,"#78350f"),m(6,3,4,2,"#bae6fd"),m(4,5,8,3,"#7dd3fc"),m(3,8,10,5,"#22c55e"),m(4,13,8,1,"#15803d"),h(6,9,"#86efac"),h(9,10,"#86efac"),h(7,11,"#ffffff")});if(t===o.BONE)return Ve(e,(u,h,m)=>{m(12,2,2,2,"#ffffff"),h(13,1,"#cbd5e1"),h(14,2,"#cbd5e1");for(let v=0;v<7;v++)h(11-v,4+v,"#f8fafc"),h(10-v,5+v,"#cbd5e1");m(2,12,2,2,"#ffffff"),h(1,13,"#94a3b8"),h(2,14,"#94a3b8")});if(t===o.GUNPOWDER)return Ve(e,(u,h,m)=>{m(6,6,4,3,"#64748b"),m(4,9,8,3,"#475569"),m(3,12,10,2,"#334155"),h(5,8,"#94a3b8"),h(9,10,"#1e293b")});if(t===o.STRING)return Ve(e,(u,h,m)=>{for(let v=0;v<9;v++)h(3+v,3+v,"#ffffff"),h(12-v,3+v,"#ffffff");m(6,6,4,4,"#cbd5e1")});if(t===o.SPIDER_EYE)return Ve(e,(u,h,m)=>{m(5,4,6,2,"#ef4444"),m(4,6,8,4,"#b91c1c"),m(5,10,6,2,"#7f1d1d"),h(7,7,"#450a0a"),h(6,5,"#ffffff")});if(t===o.BOOK)return Ve(e,(u,h,m)=>{m(3,3,9,10,"#831843"),m(4,4,8,8,"#fef08a"),m(3,3,2,10,"#4c0519"),m(7,3,1,11,"#facc15"),h(4,4,"#facc15"),h(11,4,"#facc15")});if(t===o.FLINT_AND_STEEL)return Ve(e,(u,h,m)=>{m(4,4,4,8,"#cbd5e1"),m(5,5,2,6,"#00000000"),m(9,8,4,4,"#1e293b"),h(8,7,"#f97316"),h(8,6,"#facc15")});if(t===o.STICK)return Ve(e,(u,h,m)=>{for(let v=0;v<11;v++)h(13-v,2+v,"#78350f"),h(12-v,3+v,"#451a03")});if(t===o.REDSTONE_TORCH)return Ve(e,(u,h,m)=>{m(7,7,2,7,"#78350f"),m(6,3,4,4,"#ef4444"),h(7,4,"#ffffff")});if(t===o.LEVER)return Ve(e,(u,h,m)=>{m(4,10,8,4,"#64748b");for(let v=0;v<6;v++)h(9-v,4+v,"#78350f");h(10,3,"#b45309")});if(t===o.PRESSURE_PLATE)return Ve(e,(u,h,m)=>{m(2,9,12,4,"#64748b"),m(3,8,10,1,"#94a3b8")});if(t===o.WOODEN_DOOR_BOTTOM||t===o.WOODEN_DOOR_TOP)return Ve(e,(u,h,m)=>{m(4,1,8,14,"#b45309"),u.strokeStyle="#451a03",u.strokeRect(4.5,1.5,7,13),m(6,3,4,4,"#bae6fd"),h(10,8,"#0f172a")});if(t===o.IRON_DOOR_BOTTOM||t===o.IRON_DOOR_TOP)return Ve(e,(u,h,m)=>{m(4,1,8,14,"#cbd5e1"),u.strokeStyle="#334155",u.strokeRect(4.5,1.5,7,13),m(6,4,4,2,"#1e293b"),m(6,7,4,2,"#1e293b"),h(10,9,"#334155")});if(t===o.BOAT)return Ve(e,(u,h,m)=>{m(2,7,12,5,"#78350f"),m(3,8,10,3,"#b45309"),h(5,5,"#451a03"),h(4,6,"#451a03"),h(3,10,"#451a03"),h(10,5,"#451a03"),h(11,6,"#451a03"),h(12,10,"#451a03")});if(t===o.WATER)return Ve(e,(u,h,m)=>{m(4,5,8,7,"#94a3b8"),m(5,5,6,3,"#38bdf8"),m(6,6,4,2,"#0284c7")});if(t===o.LAVA)return Ve(e,(u,h,m)=>{m(4,5,8,7,"#94a3b8"),m(5,5,6,3,"#f97316"),m(6,6,4,2,"#facc15")});if(t===o.FLOWER_RED||t===o.FLOWER_YELLOW||t===o.TORCH||t===o.WHEAT_STAGE_1||t===o.WHEAT_STAGE_2||t===o.WHEAT_STAGE_3){const u=Hd(),h=ta[t];if(h){const m=u[h.top],v=document.createElement("canvas");v.width=e,v.height=e;const g=v.getContext("2d");g.imageSmoothingEnabled=!1;const _=e*.08;return g.drawImage(m,_,_,e-_*2,e-_*2),v}}const n=Hd(),i=ta[t];if(!i)return null;const r=document.createElement("canvas");r.width=e,r.height=e;const s=r.getContext("2d");s.imageSmoothingEnabled=!1;const l=n[i.top],a=n[i.side],c=e/4,f=[[e/2,0],[e/2+c,c/2],[e/2,c],[e/2-c,c/2]],d=[[e/2-c,c/2],[e/2,c],[e/2,2*c],[e/2-c,3*c/2]],p=[[e/2,c],[e/2+c,c/2],[e/2+c,3*c/2],[e/2,2*c]];return Sc(s,p,a,.82),Sc(s,d,a,.68),Sc(s,f,l,1.05),s.strokeStyle="rgba(0,0,0,0.55)",s.lineWidth=1.5,[f,d,p].forEach(u=>{s.beginPath(),s.moveTo(u[0][0],u[0][1]);for(let h=1;h<u.length;h++)s.lineTo(u[h][0],u[h][1]);s.closePath(),s.stroke()}),r}let pe={type:0,count:0},Bt=null;function po(t){return!t||t===o.AIR?0:fa(t)||np(t)||eu(t)||rp(t)||t===o.BOW?1:64}function yM(){Bt||(Bt=document.createElement("div"),Bt.id="cursor-floating-item",Bt.className="fixed pointer-events-none z-[9999] hidden items-center justify-center",Object.assign(Bt.style,{width:"46px",height:"46px",transform:"translate(-50%, -50%)",transition:"none"}),document.body.appendChild(Bt),window.addEventListener("mousemove",t=>{pe.type>0&&pe.count>0?(Bt.style.display="flex",Bt.style.left=`${t.clientX}px`,Bt.style.top=`${t.clientY}px`):Bt.style.display="none"}))}function Fi(){if(Bt||yM(),pe.type>0&&pe.count>0){Bt.innerHTML="";const t=Lt(pe.type,42);if(t&&Bt.appendChild(t),pe.count>1){const e=document.createElement("span");e.className="absolute bottom-0 right-0 font-label-caps text-xs font-bold bg-primary text-on-primary px-1.5 py-0.2 rounded shadow-[0_2px_4px_rgba(0,0,0,0.8)]",e.textContent=pe.count,Bt.appendChild(e)}Bt.style.display="flex"}else pe.type=0,pe.count=0,Bt&&(Bt.style.display="none")}function si(t,e){pe.type=t,pe.count=t===0?0:e,Fi()}function Dl(){pe={type:0,count:0},Fi()}function pi(t,e,n){e.preventDefault(),e.stopPropagation();const i=t.get(),r=i.type||0,s=i.count||0,l=t.maxStack||po(pe.type||r);if(e.shiftKey&&e.button===0&&r>0&&t.onShiftClick){t.onShiftClick(r,s),n&&n();return}if(e.button===0){if(pe.type===0&&r>0)si(r,s),t.set(0,0),Rt(!0);else if(pe.type>0&&r===0){if(t.allowEquip&&!t.allowEquip(pe.type))return;const a=Math.min(pe.count,l);t.set(pe.type,a),pe.count-=a,pe.count<=0?si(0,0):Fi(),Rt(!1)}else if(pe.type>0&&r===pe.type){const a=l-s;if(a>0){const c=Math.min(a,pe.count);t.set(r,s+c),pe.count-=c,pe.count<=0?si(0,0):Fi(),Rt(!1)}}else if(pe.type>0&&r>0&&pe.type!==r){if(t.allowEquip&&!t.allowEquip(pe.type))return;const a=r,c=s;t.set(pe.type,pe.count),si(a,c),Rt(!1)}}else if(e.button===2)if(pe.type===0&&r>0){const a=Math.ceil(s/2),c=s-a;si(r,a),t.set(c>0?r:0,c),Rt(!0)}else if(pe.type>0&&r===0){if(t.allowEquip&&!t.allowEquip(pe.type))return;t.set(pe.type,1),pe.count-=1,pe.count<=0?si(0,0):Fi(),Rt(!1)}else pe.type>0&&r===pe.type&&s<l&&(t.set(r,s+1),pe.count-=1,pe.count<=0?si(0,0):Fi(),Rt(!1));n&&n()}let Jt=null;function TM(){Jt||(Jt=document.createElement("div"),Jt.id="voxelcraft-universal-tooltip",Jt.style.cssText=`
    position: fixed;
    z-index: 10000;
    pointer-events: none;
    display: none;
    max-width: 260px;
    padding: 8px 12px;
    background: rgba(15, 23, 42, 0.95);
    border: 2px solid rgba(74, 222, 128, 0.6);
    border-radius: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85), inset 0 0 12px rgba(34, 197, 94, 0.15);
    backdrop-filter: blur(8px);
    color: #f8fafc;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 12px;
    line-height: 1.4;
    transition: opacity 0.08s ease-out;
  `,document.body.appendChild(Jt),window.addEventListener("mousemove",mp,{passive:!0}))}function mp(t){if(!Jt||Jt.style.display==="none")return;const e=14;let n=t.clientX+e,i=t.clientY+e;const r=Jt.getBoundingClientRect();n+r.width>window.innerWidth-8&&(n=t.clientX-r.width-e),i+r.height>window.innerHeight-8&&(i=t.clientY-r.height-e),Jt.style.left=`${Math.max(8,n)}px`,Jt.style.top=`${Math.max(8,i)}px`}function AM(t,e=1,n=null){if(Jt||TM(),!t||t===0){_p();return}const i=pr[t]||`Item #${t}`,r=oS(t);let s='<span style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Bloco / Item</span>',l="",a='<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #64748b; font-size: 10px;">[Clique]: Selecionar &bull; [Shift+Clique]: Mover</div>';if(r.isWeapon)s='<span style="color: #f87171; font-weight: bold; font-size: 10px; text-transform: uppercase;">⚔ Arma de Combate</span>',l=`
      <div style="color: #fca5a5; font-weight: 600;">⚔ Dano de Ataque: +${r.damage}</div>
      <div style="color: #cbd5e1; font-size: 11px;">⚡ Velocidade: 1.6</div>
    `,a='<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 10px;">[Clique Esquerdo]: Atacar &bull; [Pulo+Golpe]: Crítico (+50%)</div>';else if(r.isArmor){s='<span style="color: #38bdf8; font-weight: bold; font-size: 10px; text-transform: uppercase;">🛡 Peça de Armadura</span>';const c=Math.min(80,r.defense*4);l=`
      <div style="color: #7dd3fc; font-weight: 600;">🛡 Proteção: +${r.defense} (${c}% Redução)</div>
      <div style="color: #cbd5e1; font-size: 11px;">Slot: ${r.slotName||"Armadura"}</div>
    `,a='<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 10px;">[Clique]: Equipar no Slot de Defesa</div>'}else r.isFood?(s='<span style="color: #fbbf24; font-weight: bold; font-size: 10px; text-transform: uppercase;">🍗 Alimento</span>',l=`
      <div style="color: #fde68a; font-weight: 600;">🍗 Restaura: +${r.hunger} Fome</div>
      <div style="color: #86efac; font-size: 11px;">✨ Saturação Alta (Cura Natural)</div>
    `,a='<div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); color: #94a3b8; font-size: 10px;">[Segurar Botão Direito]: Consumir</div>'):r.isTool&&(s='<span style="color: #a78bfa; font-weight: bold; font-size: 10px; text-transform: uppercase;">⛏ Ferramenta</span>',l=`
      <div style="color: #c4b5fd; font-weight: 600;">⛏ Eficiência: ${r.toolTier||"Média"}</div>
      <div style="color: #cbd5e1; font-size: 11px;">Mineração Acelerada</div>
    `);Jt.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
      <span style="font-weight: 700; font-size: 13px; color: #fff;">${i}</span>
      ${e>1?`<span style="color: #4ade80; font-weight: bold; font-size: 11px;">x${e}</span>`:""}
    </div>
    <div style="margin-bottom: 4px;">${s}</div>
    ${l?`<div style="margin-top: 4px;">${l}</div>`:""}
    ${a}
  `,Jt.style.display="block",n&&mp(n)}function _p(){Jt&&(Jt.style.display="none")}function fn(t,e){t.addEventListener("mouseenter",n=>{const i=e();i&&i.type>0&&AM(i.type,i.count||1,n)}),t.addEventListener("mouseleave",()=>{_p()})}let li=null,ci=null;const Ft=new Array(9).fill(null).map(()=>({type:0,count:0})),$t=new Array(4).fill(null).map(()=>({type:0,count:0}));let kt=null;const gp=[{id:"planks",name:"Tábuas de Madeira",category:"Blocos",result:o.WOOD_PLANKS,count:4,gridSize:2,layout:[o.WOOD_LOG,0,0,0],desc:"Coloque 1 Tronco de Carvalho em qualquer espaço da grade.",check:t=>{const e=t.filter(i=>i===o.WOOD_LOG).length,n=t.filter(i=>i!==0&&i!==o.WOOD_LOG).length;return e===1&&n===0}},{id:"sticks",name:"Gravetos",category:"Materiais",result:o.STICK,count:4,gridSize:2,layout:[o.WOOD_PLANKS,0,o.WOOD_PLANKS,0],desc:"Coloque 2 Tábuas de Madeira verticalmente.",check:(t,e,n)=>{if(e===2&&n===2)return t[0]===o.WOOD_PLANKS&&t[2]===o.WOOD_PLANKS&&t[1]===0&&t[3]===0||t[1]===o.WOOD_PLANKS&&t[3]===o.WOOD_PLANKS&&t[0]===0&&t[2]===0;if(e===3&&n===3)for(let i=0;i<3;i++)for(let r=0;r<2;r++){const s=r*3+i,l=(r+1)*3+i;if(t[s]===o.WOOD_PLANKS&&t[l]===o.WOOD_PLANKS&&t.every((c,f)=>f===s||f===l?!0:c===0))return!0}return!1}},{id:"crafting_table",name:"Bancada de Trabalho",category:"Blocos",result:o.CRAFTING_TABLE,count:1,gridSize:2,layout:[o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS],desc:"Preencha os 4 espaços (2×2) com Tábuas de Madeira.",check:(t,e,n)=>{if(e===2&&n===2)return t.every(i=>i===o.WOOD_PLANKS);if(e===3&&n===3){const i=[0,1,3,4];for(const r of i){const s=r,l=r+1,a=r+3,c=r+4;if(t[s]===o.WOOD_PLANKS&&t[l]===o.WOOD_PLANKS&&t[a]===o.WOOD_PLANKS&&t[c]===o.WOOD_PLANKS&&t.every((d,p)=>p===s||p===l||p===a||p===c?!0:d===0))return!0}}return!1}},{id:"furnace",name:"Fornalha",category:"Blocos",result:o.FURNACE,count:1,gridSize:3,layout:[o.COBBLESTONE,o.COBBLESTONE,o.COBBLESTONE,o.COBBLESTONE,0,o.COBBLESTONE,o.COBBLESTONE,o.COBBLESTONE,o.COBBLESTONE],desc:"Disponha 8 Pedregulhos ao redor das bordas da grade 3×3, deixando o centro vazio.",check:(t,e,n)=>e!==3||n!==3?!1:[0,1,2,3,5,6,7,8].every(r=>t[r]===o.COBBLESTONE)&&t[4]===0},{id:"chest",name:"Baú de Madeira",category:"Blocos",result:o.CHEST,count:1,gridSize:3,layout:[o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,0,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS],desc:"Disponha 8 Tábuas de Madeira ao redor da grade 3×3 com centro vazio.",check:(t,e,n)=>e!==3||n!==3?!1:[0,1,2,3,5,6,7,8].every(r=>t[r]===o.WOOD_PLANKS)&&t[4]===0},{id:"torches",name:"Tochas (4x)",category:"Iluminação",result:o.TORCH,count:4,gridSize:2,layout:[o.COAL_ORE,0,o.STICK,0],desc:"1 Carvão em cima e 1 Graveto logo abaixo.",check:(t,e,n)=>{if(e===2&&n===2)return t[0]===o.COAL_ORE&&t[2]===o.STICK&&t[1]===0&&t[3]===0||t[1]===o.COAL_ORE&&t[3]===o.STICK&&t[0]===0&&t[2]===0;if(e===3&&n===3)for(let i=0;i<3;i++)for(let r=0;r<2;r++){const s=r*3+i,l=(r+1)*3+i;if(t[s]===o.COAL_ORE&&t[l]===o.STICK&&t.every((c,f)=>f===s||f===l?!0:c===0))return!0}return!1}},{id:"wooden_pickaxe",name:"Picareta de Madeira",category:"Ferramentas",result:o.WOODEN_PICKAXE,count:1,gridSize:3,layout:[o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,0,o.STICK,0,0,o.STICK,0],desc:"3 Tábuas no topo e 2 Gravetos no meio (grade 3×3).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.WOOD_PLANKS&&t[1]===o.WOOD_PLANKS&&t[2]===o.WOOD_PLANKS&&t[4]===o.STICK&&t[7]===o.STICK&&t[3]===0&&t[5]===0&&t[6]===0&&t[8]===0},{id:"wooden_sword",name:"Espada de Madeira",category:"Armas",result:o.WOODEN_SWORD,count:1,gridSize:3,layout:[0,o.WOOD_PLANKS,0,0,o.WOOD_PLANKS,0,0,o.STICK,0],desc:"2 Tábuas verticais com 1 Graveto embaixo.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;for(let i=0;i<3;i++){const r=t[i]===o.WOOD_PLANKS&&t[3+i]===o.WOOD_PLANKS&&t[6+i]===o.STICK,s=t.every((l,a)=>a===i||a===3+i||a===6+i?!0:l===0);if(r&&s)return!0}return!1}},{id:"stone_pickaxe",name:"Picareta de Pedra",category:"Ferramentas",result:o.STONE_PICKAXE,count:1,gridSize:3,layout:[o.COBBLESTONE,o.COBBLESTONE,o.COBBLESTONE,0,o.STICK,0,0,o.STICK,0],desc:"3 Pedregulhos no topo e 2 Gravetos no meio.",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.COBBLESTONE&&t[1]===o.COBBLESTONE&&t[2]===o.COBBLESTONE&&t[4]===o.STICK&&t[7]===o.STICK&&t[3]===0&&t[5]===0&&t[6]===0&&t[8]===0},{id:"stone_sword",name:"Espada de Pedra",category:"Armas",result:o.STONE_SWORD,count:1,gridSize:3,layout:[0,o.COBBLESTONE,0,0,o.COBBLESTONE,0,0,o.STICK,0],desc:"2 Pedregulhos verticais com 1 Graveto embaixo.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;for(let i=0;i<3;i++){const r=t[i]===o.COBBLESTONE&&t[3+i]===o.COBBLESTONE&&t[6+i]===o.STICK,s=t.every((l,a)=>a===i||a===3+i||a===6+i?!0:l===0);if(r&&s)return!0}return!1}},{id:"iron_pickaxe",name:"Picareta de Ferro",category:"Ferramentas",result:o.IRON_PICKAXE,count:1,gridSize:3,layout:[o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,0,o.STICK,0,0,o.STICK,0],desc:"3 Barras de Ferro fundidas no topo e 2 Gravetos no centro.",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.IRON_INGOT&&t[1]===o.IRON_INGOT&&t[2]===o.IRON_INGOT&&t[4]===o.STICK&&t[7]===o.STICK&&t[3]===0&&t[5]===0&&t[6]===0&&t[8]===0},{id:"iron_sword",name:"Espada de Ferro",category:"Armas",result:o.IRON_SWORD,count:1,gridSize:3,layout:[0,o.IRON_INGOT,0,0,o.IRON_INGOT,0,0,o.STICK,0],desc:"2 Barras de Ferro verticais com 1 Graveto embaixo.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;for(let i=0;i<3;i++){const r=t[i]===o.IRON_INGOT&&t[3+i]===o.IRON_INGOT&&t[6+i]===o.STICK,s=t.every((l,a)=>a===i||a===3+i||a===6+i?!0:l===0);if(r&&s)return!0}return!1}},{id:"iron_helmet",name:"Capacete de Ferro",category:"Armaduras",result:o.IRON_HELMET,count:1,gridSize:3,layout:[o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,0,o.IRON_INGOT,0,0,0],desc:"5 Barras de Ferro em arco no topo da grade 3×3 (+2 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.IRON_INGOT&&t[1]===o.IRON_INGOT&&t[2]===o.IRON_INGOT&&t[3]===o.IRON_INGOT&&t[4]===0&&t[5]===o.IRON_INGOT&&t[6]===0&&t[7]===0&&t[8]===0},{id:"iron_chestplate",name:"Peitoral de Ferro",category:"Armaduras",result:o.IRON_CHESTPLATE,count:1,gridSize:3,layout:[o.IRON_INGOT,0,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT],desc:"8 Barras de Ferro em formato de colete com espaço superior central (+6 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.IRON_INGOT&&t[1]===0&&t[2]===o.IRON_INGOT&&t[3]===o.IRON_INGOT&&t[4]===o.IRON_INGOT&&t[5]===o.IRON_INGOT&&t[6]===o.IRON_INGOT&&t[7]===o.IRON_INGOT&&t[8]===o.IRON_INGOT},{id:"iron_leggings",name:"Calças de Ferro",category:"Armaduras",result:o.IRON_LEGGINGS,count:1,gridSize:3,layout:[o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,o.IRON_INGOT,0,o.IRON_INGOT,o.IRON_INGOT,0,o.IRON_INGOT],desc:"7 Barras de Ferro em formato de calças (+5 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.IRON_INGOT&&t[1]===o.IRON_INGOT&&t[2]===o.IRON_INGOT&&t[3]===o.IRON_INGOT&&t[4]===0&&t[5]===o.IRON_INGOT&&t[6]===o.IRON_INGOT&&t[7]===0&&t[8]===o.IRON_INGOT},{id:"iron_boots",name:"Botas de Ferro",category:"Armaduras",result:o.IRON_BOOTS,count:1,gridSize:3,layout:[o.IRON_INGOT,0,o.IRON_INGOT,o.IRON_INGOT,0,o.IRON_INGOT,0,0,0],desc:"4 Barras de Ferro em formato de botas (+2 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.IRON_INGOT&&t[1]===0&&t[2]===o.IRON_INGOT&&t[3]===o.IRON_INGOT&&t[4]===0&&t[5]===o.IRON_INGOT&&t[6]===0&&t[7]===0&&t[8]===0},{id:"bow",name:"Arco de Caça",category:"Armas",result:o.BOW,count:1,gridSize:3,layout:[0,o.STICK,o.STRING,o.STICK,0,o.STRING,0,o.STICK,o.STRING],desc:"3 Gravetos e 3 Linhas de Teia na bancada 3×3.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t.filter(l=>l===o.STICK).length,r=t.filter(l=>l===o.STRING).length,s=t.filter(l=>l!==0&&l!==o.STICK&&l!==o.STRING).length;return i===3&&r===3&&s===0}},{id:"wooden_hoe",name:"Enxada de Madeira",category:"Ferramentas",result:o.WOODEN_HOE,count:1,gridSize:3,layout:[o.WOOD_PLANKS,o.WOOD_PLANKS,0,0,o.STICK,0,0,o.STICK,0],desc:"2 Tábuas no topo e 2 Gravetos verticais.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t[0]===o.WOOD_PLANKS&&t[1]===o.WOOD_PLANKS&&t[4]===o.STICK&&t[7]===o.STICK||t[1]===o.WOOD_PLANKS&&t[2]===o.WOOD_PLANKS&&t[4]===o.STICK&&t[7]===o.STICK,r=t.filter(a=>a===o.STICK).length,s=t.filter(a=>a===o.WOOD_PLANKS).length,l=t.filter(a=>a!==0&&a!==o.STICK&&a!==o.WOOD_PLANKS).length;return i&&r===2&&s===2&&l===0}},{id:"stone_hoe",name:"Enxada de Pedra",category:"Ferramentas",result:o.STONE_HOE,count:1,gridSize:3,layout:[o.COBBLESTONE,o.COBBLESTONE,0,0,o.STICK,0,0,o.STICK,0],desc:"2 Pedregulhos no topo e 2 Gravetos verticais.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t[0]===o.COBBLESTONE&&t[1]===o.COBBLESTONE&&t[4]===o.STICK&&t[7]===o.STICK||t[1]===o.COBBLESTONE&&t[2]===o.COBBLESTONE&&t[4]===o.STICK&&t[7]===o.STICK,r=t.filter(a=>a===o.STICK).length,s=t.filter(a=>a===o.COBBLESTONE).length,l=t.filter(a=>a!==0&&a!==o.STICK&&a!==o.COBBLESTONE).length;return i&&r===2&&s===2&&l===0}},{id:"iron_hoe",name:"Enxada de Ferro",category:"Ferramentas",result:o.IRON_HOE,count:1,gridSize:3,layout:[o.IRON_INGOT,o.IRON_INGOT,0,0,o.STICK,0,0,o.STICK,0],desc:"2 Barras de Ferro no topo e 2 Gravetos verticais.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t[0]===o.IRON_INGOT&&t[1]===o.IRON_INGOT&&t[4]===o.STICK&&t[7]===o.STICK||t[1]===o.IRON_INGOT&&t[2]===o.IRON_INGOT&&t[4]===o.STICK&&t[7]===o.STICK,r=t.filter(a=>a===o.STICK).length,s=t.filter(a=>a===o.IRON_INGOT).length,l=t.filter(a=>a!==0&&a!==o.STICK&&a!==o.IRON_INGOT).length;return i&&r===2&&s===2&&l===0}},{id:"bread",name:"Pão Dourado",category:"Alimentação",result:o.BREAD,count:1,gridSize:3,layout:[0,0,0,o.WHEAT,o.WHEAT,o.WHEAT,0,0,0],desc:"3 Trigos colhidos em linha horizontal (+5 Vida).",check:(t,e,n)=>{if(e!==3||n!==3)return!1;for(let i=0;i<3;i++){const r=i*3,s=i*3+1,l=i*3+2;if(t[r]===o.WHEAT&&t[s]===o.WHEAT&&t[l]===o.WHEAT&&t.every((c,f)=>f===r||f===s||f===l?!0:c===0))return!0}return!1}},{id:"tnt",name:"Bloco de TNT",category:"Explosivos",result:o.TNT,count:1,gridSize:3,layout:[o.GUNPOWDER,o.SAND,o.GUNPOWDER,o.SAND,o.GUNPOWDER,o.SAND,o.GUNPOWDER,o.SAND,o.GUNPOWDER],desc:"5 Pólvoras (drop de Creeper) intercaladas com 4 Areias.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t.filter(l=>l===o.GUNPOWDER).length,r=t.filter(l=>l===o.SAND).length,s=t.filter(l=>l!==0&&l!==o.GUNPOWDER&&l!==o.SAND).length;return i===5&&r===4&&s===0}},{id:"diamond_sword",name:"Espada de Diamante",category:"Armas",result:o.DIAMOND_SWORD,count:1,gridSize:3,layout:[0,o.DIAMOND,0,0,o.DIAMOND,0,0,o.STICK,0],desc:"2 Diamantes verticais e 1 Graveto na base (+9 Dano).",check:(t,e,n)=>{if(e===3&&n===3){for(let i=0;i<3;i++)if(t[i]===o.DIAMOND&&t[i+3]===o.DIAMOND&&t[i+6]===o.STICK&&t.filter((s,l)=>l===i||l===i+3||l===i+6?!1:s!==0).length===0)return!0}return!1}},{id:"diamond_pickaxe",name:"Picareta de Diamante",category:"Ferramentas",result:o.DIAMOND_PICKAXE,count:1,gridSize:3,layout:[o.DIAMOND,o.DIAMOND,o.DIAMOND,0,o.STICK,0,0,o.STICK,0],desc:"3 Diamantes na linha superior e 2 Gravetos no centro vertical (Capaz de minerar Obsidiana).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.DIAMOND&&t[1]===o.DIAMOND&&t[2]===o.DIAMOND&&t[3]===0&&t[4]===o.STICK&&t[5]===0&&t[6]===0&&t[7]===o.STICK&&t[8]===0},{id:"diamond_helmet",name:"Capacete de Diamante",category:"Armaduras",result:o.DIAMOND_HELMET,count:1,gridSize:3,layout:[o.DIAMOND,o.DIAMOND,o.DIAMOND,o.DIAMOND,0,o.DIAMOND,0,0,0],desc:"5 Diamantes em formato de arco/U invertido (+3 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.DIAMOND&&t[1]===o.DIAMOND&&t[2]===o.DIAMOND&&t[3]===o.DIAMOND&&t[4]===0&&t[5]===o.DIAMOND&&t[6]===0&&t[7]===0&&t[8]===0},{id:"diamond_chestplate",name:"Peitoral de Diamante",category:"Armaduras",result:o.DIAMOND_CHESTPLATE,count:1,gridSize:3,layout:[o.DIAMOND,0,o.DIAMOND,o.DIAMOND,o.DIAMOND,o.DIAMOND,o.DIAMOND,o.DIAMOND,o.DIAMOND],desc:"8 Diamantes em formato de colete com espaço superior central (+8 Defesa máxima).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.DIAMOND&&t[1]===0&&t[2]===o.DIAMOND&&t[3]===o.DIAMOND&&t[4]===o.DIAMOND&&t[5]===o.DIAMOND&&t[6]===o.DIAMOND&&t[7]===o.DIAMOND&&t[8]===o.DIAMOND},{id:"diamond_leggings",name:"Calças de Diamante",category:"Armaduras",result:o.DIAMOND_LEGGINGS,count:1,gridSize:3,layout:[o.DIAMOND,o.DIAMOND,o.DIAMOND,o.DIAMOND,0,o.DIAMOND,o.DIAMOND,0,o.DIAMOND],desc:"7 Diamantes em formato de calças (+6 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.DIAMOND&&t[1]===o.DIAMOND&&t[2]===o.DIAMOND&&t[3]===o.DIAMOND&&t[4]===0&&t[5]===o.DIAMOND&&t[6]===o.DIAMOND&&t[7]===0&&t[8]===o.DIAMOND},{id:"diamond_boots",name:"Botas de Diamante",category:"Armaduras",result:o.DIAMOND_BOOTS,count:1,gridSize:3,layout:[o.DIAMOND,0,o.DIAMOND,o.DIAMOND,0,o.DIAMOND,0,0,0],desc:"4 Diamantes em formato de botas (+3 Defesa).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.DIAMOND&&t[1]===0&&t[2]===o.DIAMOND&&t[3]===o.DIAMOND&&t[4]===0&&t[5]===o.DIAMOND&&t[6]===0&&t[7]===0&&t[8]===0},{id:"bed",name:"Cama Confortável",category:"Mobiliário",result:o.BED,count:1,gridSize:3,layout:[0,0,0,o.WOOL,o.WOOL,o.WOOL,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS],desc:"3 Blocos de Lã de Ovelha sobre 3 Tábuas de Madeira (Permite dormir e pular a noite).",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t[0]===o.WOOL&&t[1]===o.WOOL&&t[2]===o.WOOL&&t[3]===o.WOOD_PLANKS&&t[4]===o.WOOD_PLANKS&&t[5]===o.WOOD_PLANKS&&t[6]===0&&t[7]===0&&t[8]===0,r=t[0]===0&&t[1]===0&&t[2]===0&&t[3]===o.WOOL&&t[4]===o.WOOL&&t[5]===o.WOOL&&t[6]===o.WOOD_PLANKS&&t[7]===o.WOOD_PLANKS&&t[8]===o.WOOD_PLANKS;return i||r}},{id:"flint_and_steel",name:"Isqueiro de Pederneira",category:"Ferramentas",result:o.FLINT_AND_STEEL,count:1,gridSize:2,layout:[o.IRON_INGOT,0,0,o.FLINT],desc:"1 Barra de Ferro e 1 Pederneira diagonalmente (Acende o Portal do Nether e Fogueiras).",check:t=>{const e=t.filter(r=>r===o.IRON_INGOT).length,n=t.filter(r=>r===o.FLINT).length,i=t.filter(r=>r!==0&&r!==o.IRON_INGOT&&r!==o.FLINT).length;return e===1&&n===1&&i===0}},{id:"quartz_block",name:"Bloco de Quartzo Polido",category:"Blocos",result:o.QUARTZ_BLOCK,count:1,gridSize:2,layout:[o.QUARTZ,o.QUARTZ,o.QUARTZ,o.QUARTZ],desc:"4 Cristais de Quartzo do Nether dispostos em quadrado 2×2.",check:(t,e,n)=>{if(e===2&&n===2)return t.every(i=>i===o.QUARTZ);if(e===3&&n===3){const i=[0,1,3,4];for(const r of i){const s=r,l=r+1,a=r+3,c=r+4;if(t[s]===o.QUARTZ&&t[l]===o.QUARTZ&&t[a]===o.QUARTZ&&t[c]===o.QUARTZ&&t.every((d,p)=>p===s||p===l||p===a||p===c?!0:d===0))return!0}}return!1}},{id:"wooden_shield",name:"Escudo de Carvalho",category:"Armaduras",result:o.WOODEN_SHIELD,count:1,gridSize:3,layout:[o.WOOD_PLANKS,o.IRON_INGOT,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,0,o.WOOD_PLANKS,0],desc:"6 Tábuas de Madeira e 1 Barra de Ferro no topo central.",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.WOOD_PLANKS&&t[1]===o.IRON_INGOT&&t[2]===o.WOOD_PLANKS&&t[3]===o.WOOD_PLANKS&&t[4]===o.WOOD_PLANKS&&t[5]===o.WOOD_PLANKS&&t[6]===0&&t[7]===o.WOOD_PLANKS&&t[8]===0},{id:"redstone_torch",name:"Tocha de Redstone",category:"Redstone",result:o.REDSTONE_TORCH,count:1,gridSize:2,layout:[o.REDSTONE_DUST,0,o.STICK,0],desc:"1 Pó de Redstone sobre 1 Graveto (Emite sinal constante de energia).",check:t=>{const e=t.filter(r=>r===o.REDSTONE_DUST).length,n=t.filter(r=>r===o.STICK).length,i=t.filter(r=>r!==0&&r!==o.REDSTONE_DUST&&r!==o.STICK).length;return e===1&&n===1&&i===0}},{id:"lever",name:"Alavanca de Redstone",category:"Redstone",result:o.LEVER,count:1,gridSize:2,layout:[o.STICK,0,o.COBBLESTONE,0],desc:"1 Graveto sobre 1 Pedregulho (Liga e desliga circuitos).",check:t=>{const e=t.filter(r=>r===o.STICK).length,n=t.filter(r=>r===o.COBBLESTONE).length,i=t.filter(r=>r!==0&&r!==o.STICK&&r!==o.COBBLESTONE).length;return e===1&&n===1&&i===0}},{id:"pressure_plate",name:"Placa de Pressão de Pedra",category:"Redstone",result:o.PRESSURE_PLATE,count:1,gridSize:2,layout:[o.STONE,o.STONE,0,0],desc:"2 Pedras lado a lado (Ativa ao pisar).",check:t=>{const e=t.filter(i=>i===o.STONE).length,n=t.filter(i=>i!==0&&i!==o.STONE).length;return e===2&&n===0}},{id:"wooden_door",name:"Porta de Madeira",category:"Blocos",result:o.WOODEN_DOOR_BOTTOM,count:1,gridSize:3,layout:[o.WOOD_PLANKS,o.WOOD_PLANKS,0,o.WOOD_PLANKS,o.WOOD_PLANKS,0,o.WOOD_PLANKS,o.WOOD_PLANKS,0],desc:"6 Tábuas de Madeira em duas colunas verticais.",check:(t,e,n)=>{if(e!==3||n!==3)return!1;const i=t[0]===o.WOOD_PLANKS&&t[1]===o.WOOD_PLANKS&&t[2]===0&&t[3]===o.WOOD_PLANKS&&t[4]===o.WOOD_PLANKS&&t[5]===0&&t[6]===o.WOOD_PLANKS&&t[7]===o.WOOD_PLANKS&&t[8]===0,r=t[0]===0&&t[1]===o.WOOD_PLANKS&&t[2]===o.WOOD_PLANKS&&t[3]===0&&t[4]===o.WOOD_PLANKS&&t[5]===o.WOOD_PLANKS&&t[6]===0&&t[7]===o.WOOD_PLANKS&&t[8]===o.WOOD_PLANKS;return i||r}},{id:"enchanting_table",name:"Mesa de Encantamentos",category:"Magia",result:o.ENCHANTING_TABLE,count:1,gridSize:3,layout:[0,o.BOOK,0,o.DIAMOND,o.OBSIDIAN,o.DIAMOND,o.OBSIDIAN,o.OBSIDIAN,o.OBSIDIAN],desc:"1 Livro no topo central, 2 Diamantes nas laterais e 4 Obsidianas.",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===0&&t[1]===o.BOOK&&t[2]===0&&t[3]===o.DIAMOND&&t[4]===o.OBSIDIAN&&t[5]===o.DIAMOND&&t[6]===o.OBSIDIAN&&t[7]===o.OBSIDIAN&&t[8]===o.OBSIDIAN},{id:"boat",name:"Barco de Carvalho",category:"Veículos",result:o.BOAT,count:1,gridSize:3,layout:[0,0,0,o.WOOD_PLANKS,0,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS],desc:"5 Tábuas de Madeira dispostas em formato de barco (Permite navegar na água).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===0&&t[1]===0&&t[2]===0&&t[3]===o.WOOD_PLANKS&&t[4]===0&&t[5]===o.WOOD_PLANKS&&t[6]===o.WOOD_PLANKS&&t[7]===o.WOOD_PLANKS&&t[8]===o.WOOD_PLANKS},{id:"book",name:"Livro Arcano",category:"Magia",result:o.BOOK,count:1,gridSize:2,layout:[o.WHEAT,o.WHEAT,o.WHEAT,0],desc:"3 Trigos processados em livro de couro.",check:t=>{const e=t.filter(i=>i===o.WHEAT).length,n=t.filter(i=>i!==0&&i!==o.WHEAT).length;return e===3&&n===0}},{id:"bookshelf",name:"Estante de Livros",category:"Blocos",result:o.BOOKSHELF,count:1,gridSize:3,layout:[o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS,o.BOOK,o.BOOK,o.BOOK,o.WOOD_PLANKS,o.WOOD_PLANKS,o.WOOD_PLANKS],desc:"3 Livros no centro entre 6 Tábuas de Madeira (Aumenta o poder da Mesa de Encantamentos).",check:(t,e,n)=>e!==3||n!==3?!1:t[0]===o.WOOD_PLANKS&&t[1]===o.WOOD_PLANKS&&t[2]===o.WOOD_PLANKS&&t[3]===o.BOOK&&t[4]===o.BOOK&&t[5]===o.BOOK&&t[6]===o.WOOD_PLANKS&&t[7]===o.WOOD_PLANKS&&t[8]===o.WOOD_PLANKS}];function vp(t,e,n){const i=t.map(r=>r&&typeof r=="object"?r.type||0:r||0);for(const r of gp)if(r.check(i,e,n))return{result:r.result,count:r.count,name:r.name};return null}function xp(){li||(li=document.createElement("div"),li.id="crafting-table-modal",li.className="fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none",li.innerHTML=`
    <div class="glass-panel w-full max-w-xl bg-surface/90 backdrop-blur-xl border border-outline-variant rounded-xl shadow-[0_0_30px_rgba(15,21,14,0.9)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">construction</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">Bancada de Trabalho (3×3)</h2>
        </div>
        <div class="flex items-center gap-3">
          <button id="open-recipe-book-table" class="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-3 py-1.5 rounded-lg text-xs font-label-caps flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(120,220,119,0.2)] cursor-pointer">
            <span class="material-symbols-outlined text-sm">menu_book</span>
            <span>Receitas</span>
          </button>
          <button id="close-table-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Crafting Matrix & Output Area -->
      <div class="flex items-center justify-center gap-6 mb-6 bg-surface-container/50 p-6 rounded-xl border border-outline-variant">
        <!-- 3×3 Grid -->
        <div id="table-craft-grid" class="grid grid-cols-3 gap-2"></div>

        <!-- Arrow -->
        <div class="flex items-center justify-center">
          <span class="material-symbols-outlined text-4xl text-primary drop-shadow-[0_0_8px_rgba(120,220,119,0.6)]">east</span>
        </div>

        <!-- Output Slot -->
        <div class="flex flex-col items-center gap-2">
          <div id="table-output-slot" class="w-20 h-20 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-[0_0_16px_rgba(120,220,119,0.5)] flex items-center justify-center cursor-pointer relative" title="Clique para coletar o produto forjado"></div>
          <span class="font-label-caps text-[11px] text-primary uppercase font-semibold">PRODUTO</span>
        </div>
      </div>

      <!-- Player Quick Hotbar Transfer -->
      <div class="pt-4 border-t border-outline-variant/60">
        <span class="font-label-caps text-xs text-secondary uppercase font-semibold block mb-2">Seu Inventário (Botão Esq: Pegar/Colocar • Botão Dir: Colocar 1)</span>
        <div id="table-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
      </div>
    </div>
  `,document.body.appendChild(li),document.getElementById("close-table-btn").addEventListener("click",RM),document.getElementById("open-recipe-book-table").addEventListener("click",Sp),Ep(),nr())}function bM(){li||xp(),li.style.display="flex",fo(yt.CRAFTING_TABLE),Rt(!0),Pr(),nr()}function RM(){if(li){li.style.display="none",Ui(yt.CRAFTING_TABLE),Rt(!1),pe.type>0&&pe.count>0&&(Qn(pe.type,pe.count),Dl());for(let t=0;t<9;t++){const e=Ft[t];e&&e.type>0&&e.count>0&&(Qn(e.type,e.count),Ft[t]={type:0,count:0})}Pr()}}function nr(){const t=document.getElementById("table-craft-grid"),e=document.getElementById("table-output-slot"),n=document.getElementById("table-hotbar-grid");if(!(!t||!e||!n)){if(t.innerHTML="",Ft.forEach((i,r)=>{const s=document.createElement("div");s.className="slot w-14 h-14 rounded-xl bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative transition-all";const l=i||{type:0,count:0};if(l.type>0&&l.count>0){const c=Lt(l.type,38);if(c&&s.appendChild(c),l.count>1){const f=document.createElement("span");f.className="absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",f.textContent=l.count,s.appendChild(f)}}const a={get:()=>Ft[r]||{type:0,count:0},set:(c,f)=>{Ft[r]={type:c,count:c===0?0:f},Pr()}};s.addEventListener("mousedown",c=>pi(a,c,nr)),s.addEventListener("contextmenu",c=>c.preventDefault()),fn(s,a.get),t.appendChild(s)}),e.innerHTML="",kt&&kt.result>0){const i=Lt(kt.result,48);if(i&&e.appendChild(i),kt.count>1){const r=document.createElement("span");r.className="absolute -top-2 -right-2 bg-primary text-on-primary font-label-caps text-xs px-2 py-0.5 rounded shadow font-bold",r.textContent=kt.count,e.appendChild(r)}}fn(e,()=>({type:(kt==null?void 0:kt.result)||0,count:(kt==null?void 0:kt.count)||0})),e.onmousedown=i=>{if(i.preventDefault(),kt&&kt.result>0){const r=kt.result,s=kt.count;if(i.shiftKey){if(Qn(r,s)){yn();for(let l=0;l<9;l++)Ft[l].count>1?Ft[l].count-=1:Ft[l]={type:0,count:0};Pr(),nr()}}else{const l=po(r);if(pe.type===0){si(r,s),yn();for(let a=0;a<9;a++)Ft[a].count>1?Ft[a].count-=1:Ft[a]={type:0,count:0};Pr(),nr()}else if(pe.type===r&&pe.count+s<=l){pe.count+=s,Fi(),yn();for(let a=0;a<9;a++)Ft[a].count>1?Ft[a].count-=1:Ft[a]={type:0,count:0};Pr(),nr()}}}},e.oncontextmenu=i=>i.preventDefault(),n.innerHTML="";for(let i=0;i<9;i++){const r=document.createElement("div");r.className="slot w-full h-11 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer transition-all relative";const s=Le[i]||{type:0,count:0};if(s.type>0&&s.count>0){const a=Lt(s.type,30);if(a&&r.appendChild(a),r.title=`${pr[s.type]||"Item"}`,s.count>1){const c=document.createElement("span");c.className="absolute bottom-0.5 right-1 font-label-caps text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",c.textContent=s.count,r.appendChild(c)}}const l={get:()=>Le[i]||{type:0,count:0},set:(a,c)=>{Le[i]={type:a,count:a===0?0:c}},onShiftClick:(a,c)=>{const f=Ft.findIndex(d=>d.type===0||d.count===0);f!==-1&&(Ft[f]={type:a,count:c},Le[i]={type:0,count:0},Pr(),nr())}};r.addEventListener("mousedown",a=>pi(l,a,nr)),r.addEventListener("contextmenu",a=>a.preventDefault()),fn(r,l.get),n.appendChild(r)}}}function Pr(){kt=vp(Ft,3,3)}function Ep(){ci||(ci=document.createElement("div"),ci.id="recipe-book-modal",ci.className="fixed inset-0 z-[200] hidden items-center justify-center p-4 bg-black/70 backdrop-blur-lg select-none",ci.innerHTML=`
    <div class="glass-panel w-full max-w-2xl max-h-[85vh] bg-surface/95 backdrop-blur-2xl border border-primary/40 rounded-xl shadow-[0_0_40px_rgba(120,220,119,0.2)] overflow-hidden flex flex-col p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-4">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">auto_stories</span>
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter uppercase font-bold">Livro de Receitas (Guia de Fabricação)</h2>
        </div>
        <button id="close-recipe-book-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="font-label-caps text-xs text-on-surface-variant mb-4">
        Veja como organizar os blocos e materiais na grade para forjar cada item:
      </div>

      <!-- Recipe Cards List -->
      <div id="recipe-cards-container" class="overflow-y-auto max-h-[60vh] pr-2 flex flex-col gap-3"></div>
    </div>
  `,document.body.appendChild(ci),document.getElementById("close-recipe-book-btn").addEventListener("click",OM),wM())}function wM(){const t=document.getElementById("recipe-cards-container");t&&(t.innerHTML="",gp.forEach(e=>{const n=document.createElement("div");n.className="flex items-center justify-between bg-surface-container/60 p-3.5 rounded-xl border border-outline-variant hover:border-primary/50 transition-all";const i=document.createElement("div");i.className="flex items-center gap-3.5 max-w-[340px]";const r=document.createElement("div");r.className="w-12 h-12 rounded-xl bg-surface-container-lowest border-2 border-primary flex items-center justify-center relative shrink-0 shadow-[0_0_8px_rgba(120,220,119,0.3)]";const s=Lt(e.result,36);if(r.appendChild(s),e.count>1){const p=document.createElement("span");p.className="absolute -bottom-1 -right-1 bg-primary text-on-primary font-label-caps text-[10px] font-bold px-1 rounded",p.textContent=e.count,r.appendChild(p)}i.appendChild(r);const l=document.createElement("div");l.innerHTML=`
      <div class="font-headline-lg-mobile text-sm font-bold text-on-surface">${e.name}</div>
      <div class="font-label-caps text-[10px] font-semibold text-primary uppercase mb-0.5">${e.category}</div>
      <div class="font-body-md text-xs text-on-surface-variant leading-snug">${e.desc}</div>
    `,i.appendChild(l);const a=document.createElement("div");a.className="flex flex-col items-center gap-1 shrink-0";const c=document.createElement("span");c.className="font-label-caps text-[9px] font-bold text-on-surface-variant uppercase tracking-wider",c.textContent=`Grade ${e.gridSize}×${e.gridSize}`,a.appendChild(c);const f=document.createElement("div"),d=e.gridSize;f.className=`grid grid-cols-${d} gap-1 bg-surface-container-lowest p-1.5 rounded-lg border border-outline-variant`,f.style.gridTemplateColumns=`repeat(${d}, 28px)`,e.layout.forEach(p=>{const u=document.createElement("div");if(u.className="w-7 h-7 rounded bg-surface-container/80 border border-outline-variant/60 flex items-center justify-center",p>0){const h=Lt(p,22);u.appendChild(h),u.title=pr[p]||""}f.appendChild(u)}),a.appendChild(f),n.appendChild(i),n.appendChild(a),t.appendChild(n)}))}function Sp(){ci||Ep(),ci.style.display="flex",fo(yt.RECIPE_BOOK)}function OM(){ci&&(ci.style.display="none",Ui(yt.RECIPE_BOOK))}const ko={[o.IRON_ORE]:{output:o.IRON_INGOT,time:3.5},[o.PORKCHOP]:{output:o.COOKED_PORKCHOP,time:2.5},[o.MUTTON]:{output:o.COOKED_MUTTON,time:2.5},[o.COBBLESTONE]:{output:o.STONE,time:3}},gl={[o.LAVA]:60,[o.COAL_ORE]:16,[o.WOOD_LOG]:6,[o.WOOD_PLANKS]:3,[o.STICK]:1.5},Vo=new Map;let na=null,Ii=null;function CM(t,e,n){const i=`${t},${e},${n}`;return Vo.has(i)||Vo.set(i,{x:t,y:e,z:n,inputItem:0,inputCount:0,fuelItem:0,fuelCount:0,outputItem:0,outputCount:0,burnTimeRemaining:0,maxBurnTime:0,cookProgress:0}),Vo.get(i)}function DM(t,e,n){na=`${t},${e},${n}`,CM(t,e,n),Ii||PM(),Ii.style.display="flex",fo(yt.FURNACE),Rt(!0),ni()}function IM(){Ii&&(Ii.style.display="none",na=null,Ui(yt.FURNACE),Rt(!1),pe.type>0&&pe.count>0&&(Qn(pe.type,pe.count),Dl()))}function NM(){return $h(yt.FURNACE)}function LM(t){for(const[e,n]of Vo.entries()){const r=n.inputItem>0&&ko[n.inputItem]?ko[n.inputItem]:null;n.burnTimeRemaining>0&&(n.burnTimeRemaining=Math.max(0,n.burnTimeRemaining-t)),r&&(n.outputItem===0||n.outputItem===r.output)?(n.burnTimeRemaining<=0&&n.fuelCount>0&&gl[n.fuelItem]&&(n.maxBurnTime=gl[n.fuelItem],n.burnTimeRemaining=n.maxBurnTime,n.fuelCount--,n.fuelCount<=0&&(n.fuelItem=0)),n.burnTimeRemaining>0?(n.cookProgress+=t,n.cookProgress>=r.time&&(n.cookProgress=0,n.inputCount--,n.inputCount<=0&&(n.inputItem=0),n.outputItem=r.output,n.outputCount=(n.outputCount||0)+1)):n.cookProgress=Math.max(0,n.cookProgress-t*.5)):n.cookProgress=0}na&&NM()&&ni()}function PM(){Ii=document.createElement("div"),Ii.id="furnace-modal",Ii.className="fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none",Ii.innerHTML=`
    <div class="glass-panel w-full max-w-xl bg-surface/90 backdrop-blur-xl border border-outline-variant rounded-xl shadow-[0_0_30px_rgba(15,21,14,0.9)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-error text-2xl" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">Fornalha de Fundição</h2>
        </div>
        <button id="close-furnace-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Smelting Chamber View -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-8 py-6 px-4 bg-surface-container/50 rounded-xl border border-outline-variant relative">
        <!-- Input & Fuel Column -->
        <div class="flex flex-col items-center gap-4">
          <!-- Input Ore / Raw Food -->
          <div id="furnace-input-slot" class="w-16 h-16 rounded-xl bg-surface-container-lowest border-2 border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative" title="Minério Bruto ou Carne Crua"></div>

          <!-- Fire Animated Icon -->
          <div class="relative w-8 h-8 flex items-center justify-center">
            <span class="material-symbols-outlined text-outline-variant text-3xl">local_fire_department</span>
            <div id="furnace-flame-active" class="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-200" style="height: 0%;">
              <span class="material-symbols-outlined text-error text-3xl drop-shadow-[0_0_8px_rgba(255,108,92,0.8)]" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
            </div>
          </div>

          <!-- Fuel Slot (Coal / Wood / Lava) -->
          <div id="furnace-fuel-slot" class="w-16 h-16 rounded-xl bg-surface-container-lowest border-2 border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative" title="Combustível (Carvão, Madeira ou Lava)"></div>
        </div>

        <!-- Progress Arrow Center -->
        <div class="flex flex-col items-center gap-2">
          <div class="w-24 h-4 bg-surface-container-lowest rounded-full overflow-hidden border border-outline-variant relative">
            <div id="furnace-progress-bar" class="h-full bg-gradient-to-r from-error to-primary rounded-full transition-all duration-150" style="width: 0%;"></div>
          </div>
          <span class="font-label-caps text-[10px] text-secondary tracking-widest uppercase">FUNDIÇÃO</span>
        </div>

        <!-- Output Slot -->
        <div class="flex flex-col items-center gap-2">
          <div id="furnace-output-slot" class="w-24 h-24 rounded-2xl bg-surface-container-lowest border-2 border-primary shadow-[0_0_20px_rgba(120,220,119,0.4)] flex items-center justify-center cursor-pointer relative" title="Clique para coletar o lingote forjado ou carne assada"></div>
        </div>
      </div>

      <!-- Quick Player Hotbar Transfer -->
      <div class="mt-6 pt-4 border-t border-outline-variant/60">
        <div class="flex justify-between items-center mb-2">
          <span class="font-label-caps text-xs text-secondary uppercase font-semibold">Seu Inventário Rápido (Shift+Clique para carregar na Fornalha)</span>
        </div>
        <div id="furnace-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
      </div>
    </div>
  `,document.body.appendChild(Ii),document.getElementById("close-furnace-btn").addEventListener("click",IM)}function ni(){if(!na)return;const t=Vo.get(na);if(!t)return;const e=document.getElementById("furnace-input-slot"),n=document.getElementById("furnace-fuel-slot"),i=document.getElementById("furnace-output-slot"),r=document.getElementById("furnace-flame-active"),s=document.getElementById("furnace-progress-bar"),l=document.getElementById("furnace-hotbar-grid");if(!e||!n||!i||!r||!s||!l)return;if(e.innerHTML="",t.inputItem>0&&t.inputCount>0){const u=Lt(t.inputItem,44);if(u&&e.appendChild(u),t.inputCount>1){const h=document.createElement("span");h.className="absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",h.textContent=t.inputCount,e.appendChild(h)}}else{const u=document.createElement("span");u.className="font-label-caps text-[10px] text-on-surface-variant uppercase",u.textContent="MINÉRIO",e.appendChild(u)}const a={get:()=>({type:t.inputItem,count:t.inputCount}),set:(u,h)=>{t.inputItem=u,t.inputCount=u===0?0:h,t.inputCount<=0&&(t.inputItem=0)},allowEquip:u=>!!ko[u]};if(e.onmousedown=u=>pi(a,u,ni),e.oncontextmenu=u=>u.preventDefault(),fn(e,a.get),n.innerHTML="",t.fuelItem>0&&t.fuelCount>0){const u=Lt(t.fuelItem,44);if(u&&n.appendChild(u),t.fuelCount>1){const h=document.createElement("span");h.className="absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",h.textContent=t.fuelCount,n.appendChild(h)}}else{const u=document.createElement("span");u.className="font-label-caps text-[10px] text-on-surface-variant uppercase",u.textContent="CARVÃO",n.appendChild(u)}const c={get:()=>({type:t.fuelItem,count:t.fuelCount}),set:(u,h)=>{t.fuelItem=u,t.fuelCount=u===0?0:h,t.fuelCount<=0&&(t.fuelItem=0)},allowEquip:u=>!!gl[u]};n.onmousedown=u=>pi(c,u,ni),n.oncontextmenu=u=>u.preventDefault(),fn(n,c.get);const f=t.maxBurnTime>0?Math.min(100,Math.round(t.burnTimeRemaining/t.maxBurnTime*100)):0;r.style.height=`${f}%`;const d=t.inputItem>0?ko[t.inputItem]:null,p=d?Math.min(100,Math.round(t.cookProgress/d.time*100)):0;if(s.style.width=`${p}%`,i.innerHTML="",t.outputItem>0&&t.outputCount>0){const u=Lt(t.outputItem,56);if(u&&i.appendChild(u),t.outputCount>1){const h=document.createElement("span");h.className="absolute -top-2 -right-2 bg-primary text-on-primary font-label-caps text-xs px-2 py-0.5 rounded shadow-[0_0_10px_rgba(120,220,119,0.8)] font-bold",h.textContent=t.outputCount,i.appendChild(h)}}else{const u=document.createElement("span");u.className="font-label-caps text-[11px] text-primary/70 uppercase",u.textContent="PRODUTO",i.appendChild(u)}fn(i,()=>({type:t.outputItem,count:t.outputCount})),i.onmousedown=u=>{if(u.preventDefault(),t.outputItem>0&&t.outputCount>0){if(u.shiftKey)Qn(t.outputItem,t.outputCount)&&(yn(),t.outputItem=0,t.outputCount=0,ni());else if(pe.type===0)si(t.outputItem,t.outputCount),yn(),t.outputItem=0,t.outputCount=0,ni();else if(pe.type===t.outputItem){const h=po(t.outputItem),m=Math.min(t.outputCount,h-pe.count);m>0&&(pe.count+=m,t.outputCount-=m,t.outputCount<=0&&(t.outputItem=0),Fi(),yn(),ni())}}},i.oncontextmenu=u=>u.preventDefault(),l.innerHTML="";for(let u=0;u<9;u++){const h=document.createElement("div"),m=Le[u]||{type:0,count:0};if(h.className="slot w-full h-11 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer transition-all relative",m.type>0&&m.count>0){const g=Lt(m.type,30);if(g&&h.appendChild(g),h.title=`${pr[m.type]||"Item"}`,m.count>1){const _=document.createElement("span");_.className="absolute bottom-0.5 right-1 font-label-caps text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",_.textContent=m.count,h.appendChild(_)}}const v={get:()=>Le[u]||{type:0,count:0},set:(g,_)=>{Le[u]={type:g,count:g===0?0:_},mi()},onShiftClick:(g,_)=>{ko[g]?(t.inputItem===0||t.inputItem===g)&&(t.inputItem=g,t.inputCount=(t.inputCount||0)+_,Le[u]={type:0,count:0},mi(),ni()):gl[g]&&(t.fuelItem===0||t.fuelItem===g)&&(t.fuelItem=g,t.fuelCount=(t.fuelCount||0)+_,Le[u]={type:0,count:0},mi(),ni())}};h.addEventListener("mousedown",g=>pi(v,g,ni)),h.addEventListener("contextmenu",g=>g.preventDefault()),fn(h,v.get),l.appendChild(h)}}const fr=new Map;let vl=null,Ni=null;function UM(t,e,n){const i=`${t},${e},${n}`;return fr.has(i)||fr.set(i,new Array(27).fill(null).map(()=>({type:0,count:0}))),fr.get(i)}function FM(t,e,n){const i=`${t},${e},${n}`;return fr.has(i)?fr.get(i).filter(s=>s&&s.type>0&&s.count>0):[]}function BM(t,e,n){const i=`${t},${e},${n}`;fr.has(i)&&fr.delete(i)}function GM(t,e,n){vl=`${t},${e},${n}`,UM(t,e,n),Ni||zM(),Ni.style.display="flex",fo(yt.CHEST),Rt(!0),Df()}function HM(){Ni&&(Ni.style.display="none",vl=null,Ui(yt.CHEST),Rt(!1),pe.type>0&&pe.count>0&&(Qn(pe.type,pe.count),Dl()))}function zM(){Ni=document.createElement("div"),Ni.id="chest-modal",Ni.className="fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none",Ni.innerHTML=`
    <div class="glass-panel w-full max-w-xl bg-surface/90 backdrop-blur-xl border border-outline-variant rounded-xl shadow-[0_0_30px_rgba(15,21,14,0.9)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-outline-variant pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-tertiary text-2xl" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">Baú de Armazenamento (27 slots)</h2>
        </div>
        <button id="close-chest-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Chest 27 Storage Slots -->
      <div class="mb-6 bg-surface-container/50 p-4 rounded-xl border border-outline-variant">
        <span class="font-label-caps text-xs text-secondary uppercase font-semibold block mb-2">Conteúdo do Baú (Botão Esq: Pegar/Colocar • Botão Dir: Dividir/Colocar 1)</span>
        <div id="chest-grid" class="grid grid-cols-9 gap-2"></div>
      </div>

      <!-- Quick Player Hotbar Transfer -->
      <div class="pt-4 border-t border-outline-variant/60">
        <span class="font-label-caps text-xs text-primary uppercase font-semibold block mb-2">Seu Inventário (Shift+Clique para transferência rápida)</span>
        <div id="chest-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
      </div>
    </div>
  `,document.body.appendChild(Ni),document.getElementById("close-chest-btn").addEventListener("click",HM)}function Df(){if(!vl)return;const t=fr.get(vl);if(!t)return;const e=document.getElementById("chest-grid"),n=document.getElementById("chest-hotbar-grid");if(!(!e||!n)){e.innerHTML="",t.forEach((i,r)=>{const s=document.createElement("div"),l=i||{type:0,count:0};if(s.className=`slot w-full h-11 rounded-lg bg-surface-container-lowest border ${l.type>0?"border-tertiary/70 shadow-[0_0_8px_rgba(255,180,169,0.2)]":"border-outline-variant"} hover:border-primary flex items-center justify-center cursor-pointer transition-all relative`,l.type>0&&l.count>0){const c=Lt(l.type,32);if(c&&s.appendChild(c),s.title=`${pr[l.type]||"Item"}`,l.count>1){const f=document.createElement("span");f.className="absolute bottom-0.5 right-1 font-label-caps text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",f.textContent=l.count,s.appendChild(f)}}const a={get:()=>t[r]||{type:0,count:0},set:(c,f)=>{t[r]={type:c,count:c===0?0:f}},onShiftClick:(c,f)=>{Qn(c,f)&&(t[r]={type:0,count:0},Rt(!1))}};s.addEventListener("mousedown",c=>pi(a,c,Df)),s.addEventListener("contextmenu",c=>c.preventDefault()),fn(s,a.get),e.appendChild(s)}),n.innerHTML="";for(let i=0;i<9;i++){const r=document.createElement("div"),s=Le[i]||{type:0,count:0};if(r.className=`slot w-full h-11 rounded-lg bg-surface-container-lowest border ${s.type>0?"border-primary/60":"border-outline-variant"} hover:border-primary flex items-center justify-center cursor-pointer transition-all relative`,s.type>0&&s.count>0){const a=Lt(s.type,32);if(a&&r.appendChild(a),r.title=`${pr[s.type]||"Item"}`,s.count>1){const c=document.createElement("span");c.className="absolute bottom-0.5 right-1 font-label-caps text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",c.textContent=s.count,r.appendChild(c)}}const l={get:()=>Le[i]||{type:0,count:0},set:(a,c)=>{Le[i]={type:a,count:a===0?0:c},mi()},onShiftClick:(a,c)=>{const f=po(a);let d=c;for(let p=0;p<27;p++)if(t[p].type===a&&t[p].count<f){const u=f-t[p].count,h=Math.min(u,d);if(t[p].count+=h,d-=h,d<=0)break}if(d>0){for(let p=0;p<27;p++)if(t[p].type===0||t[p].count===0){t[p]={type:a,count:d},d=0;break}}Le[i]=d>0?{type:a,count:d}:{type:0,count:0},mi(),Rt(!1)}};r.addEventListener("mousedown",a=>pi(l,a,Df)),r.addEventListener("contextmenu",a=>a.preventDefault()),fn(r,l.get),n.appendChild(r)}}}const Wa={SHARPNESS:"sharpness",PROTECTION:"protection",EFFICIENCY:"efficiency",FIRE_ASPECT:"fire_aspect"};let WM=0,If=1;const zd=new Map;function kM(){return WM}function Mp(){return If}function VM(t){return If>t?(If-=t,!0):!1}function XM(t,e,n=1){const r=(zd.get(t)||[]).filter(s=>s.type!==e);r.push({type:e,level:n}),zd.set(t,r)}let kn=null;function yp(){kn||(kn=document.createElement("div"),kn.id="enchanting-modal",kn.className="fixed inset-0 z-[160] hidden items-center justify-center p-4 bg-black/70 backdrop-blur-md select-none",kn.innerHTML=`
    <div class="glass-panel w-full max-w-lg bg-surface/95 backdrop-blur-2xl border border-purple-500/40 rounded-2xl shadow-[0_0_40px_rgba(147,51,234,0.35)] overflow-hidden p-6 text-on-surface">
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-purple-500/30 pb-3 mb-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-purple-400 text-3xl animate-pulse">auto_fix_high</span>
          <h2 class="font-headline-lg-mobile md:font-headline-lg text-purple-300 tracking-tighter uppercase font-bold">Mesa de Encantamentos</h2>
        </div>
        <button id="close-enchant-modal" class="text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-xl font-bold p-1">&times;</button>
      </div>

      <p class="text-xs text-purple-200/80 mb-5 tracking-wide">
        Canalize seus pontos de experiência arcanos para forjar encantamentos lendários em seus equipamentos.
      </p>

      <!-- Player XP Indicator -->
      <div class="flex items-center justify-between bg-purple-950/40 border border-purple-500/30 rounded-xl px-4 py-3 mb-6">
        <span class="text-xs font-label-caps text-purple-300">Nível Arcano do Jogador:</span>
        <span id="enchant-player-level" class="text-lg font-bold text-green-400 font-mono">Nível 1</span>
      </div>

      <!-- Enchantment Options -->
      <div class="flex flex-col gap-3.5 mb-6">
        <button id="btn-enchant-sharpness" class="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/40 transition-all group cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-cyan-400 group-hover:scale-110 transition-transform">swords</span>
            <div class="text-left">
              <div class="font-bold text-sm text-cyan-200">Afiação Arcana (Sharpness II)</div>
              <div class="text-[11px] text-purple-300/70">+5 Dano de Ataque na Espada</div>
            </div>
          </div>
          <span class="bg-purple-950 px-3 py-1 rounded-lg text-xs font-bold text-green-400 border border-green-500/30">Custa 2 Níveis</span>
        </button>

        <button id="btn-enchant-fire" class="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-orange-500/40 transition-all group cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-orange-400 group-hover:scale-110 transition-transform">local_fire_department</span>
            <div class="text-left">
              <div class="font-bold text-sm text-orange-200">Aspecto Flamejante (Fire Aspect)</div>
              <div class="text-[11px] text-purple-300/70">Incendeia monstros e mobs ao golpear</div>
            </div>
          </div>
          <span class="bg-purple-950 px-3 py-1 rounded-lg text-xs font-bold text-green-400 border border-green-500/30">Custa 3 Níveis</span>
        </button>

        <button id="btn-enchant-efficiency" class="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-emerald-500/40 transition-all group cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-emerald-400 group-hover:scale-110 transition-transform">bolt</span>
            <div class="text-left">
              <div class="font-bold text-sm text-emerald-200">Eficiência (Efficiency III)</div>
              <div class="text-[11px] text-purple-300/70">+90% Velocidade de Mineração na Picareta</div>
            </div>
          </div>
          <span class="bg-purple-950 px-3 py-1 rounded-lg text-xs font-bold text-green-400 border border-green-500/30">Custa 2 Níveis</span>
        </button>

        <button id="btn-enchant-protection" class="w-full flex items-center justify-between p-3.5 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-blue-500/40 transition-all group cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-blue-400 group-hover:scale-110 transition-transform">shield</span>
            <div class="text-left">
              <div class="font-bold text-sm text-blue-200">Proteção Mística (Protection II)</div>
              <div class="text-[11px] text-purple-300/70">+30% Redução de Dano em Armaduras</div>
            </div>
          </div>
          <span class="bg-purple-950 px-3 py-1 rounded-lg text-xs font-bold text-green-400 border border-green-500/30">Custa 2 Níveis</span>
        </button>
      </div>
    </div>
  `,document.body.appendChild(kn),document.getElementById("close-enchant-modal").addEventListener("click",qM),document.getElementById("btn-enchant-sharpness").addEventListener("click",()=>ka(Wa.SHARPNESS,2,2)),document.getElementById("btn-enchant-fire").addEventListener("click",()=>ka(Wa.FIRE_ASPECT,1,3)),document.getElementById("btn-enchant-efficiency").addEventListener("click",()=>ka(Wa.EFFICIENCY,3,2)),document.getElementById("btn-enchant-protection").addEventListener("click",()=>ka(Wa.PROTECTION,2,2)))}function ka(t,e,n){if(VM(n)){XM("active_weapon",t,e),Yh();const i=vi();hp(i.x,i.y+1,i.z),Tp()}else yn()}function Tp(){const t=document.getElementById("enchant-player-level");t&&(t.textContent=`Nível ${Mp()}`)}function KM(){yp(),Tp(),kn.classList.remove("hidden"),kn.classList.add("flex")}function qM(){kn&&(kn.classList.add("hidden"),kn.classList.remove("flex"))}let qn=null,Xr=null,on=null,Ie=null,_t=o.WOODEN_SWORD,ia=!1,Kr=!1,Bn=0,Io={x:NaN,y:NaN,z:NaN},Mc=0;const iu=new Map,YM=new k(1.002,1.002,1.002),$M=new dx(YM),ZM=new Fh({color:0,linewidth:2,transparent:!0,opacity:.6}),jM=new k(1.006,1.006,1.006),Ap=new On({color:1973067,wireframe:!0,transparent:!0,opacity:0});function QM(t){qn=t,Xr=new fx($M,ZM),Xr.visible=!1,qn.add(Xr),on=new B(jM,Ap),on.visible=!1,qn.add(on),window.addEventListener("mousedown",ty),window.addEventListener("mouseup",ny),window.addEventListener("blur",()=>{ia=!1,Kr=!1,Bn=0,on&&(on.visible=!1)})}function JM(t=.016){if(ey(t),!ca()||Bo()){Xr.visible=!1,on.visible=!1,Ie=null,Kr=!1,ia=!1,Bn=0;return}const e=la();if(!e)return;const n=new C(0,0,-1);n.applyQuaternion(e.quaternion);const i=xS(e.position,n);if(i)if(Ie=i,Xr.position.set(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5),Xr.visible=!0,(i.hit.x!==Io.x||i.hit.y!==Io.y||i.hit.z!==Io.z)&&(Io={x:i.hit.x,y:i.hit.y,z:i.hit.z},Bn=0),ia&&Kr){const r=Nt(i.hit.x,i.hit.y,i.hit.z);if(r!==o.AIR&&r!==o.WATER){const s=lS(r),l=cS(r,_t);if(Bn+=t*l/s,Mc+=t,Mc>=.22&&(Mc=0,Xh(r),Cf(i.hit.x,i.hit.y,i.hit.z,r)),on.position.set(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5),on.visible=!0,Ap.opacity=el.clamp(Bn*.85,.15,.9),Bn>=1){if(vx(),Cf(i.hit.x,i.hit.y,i.hit.z,r),r===o.CHEST&&(FM(i.hit.x,i.hit.y,i.hit.z).forEach(c=>{Kt(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5,c)}),BM(i.hit.x,i.hit.y,i.hit.z)),r===o.GRASS&&Math.random()<.35&&Kt(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5,o.WHEAT_SEEDS),r===o.WHEAT_STAGE_3)Kt(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5,o.WHEAT),Kt(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5,o.WHEAT_SEEDS),iu.delete(`${i.hit.x},${i.hit.y},${i.hit.z}`);else{const a=ap(r);a>0&&Kt(i.hit.x+.5,i.hit.y+.5,i.hit.z+.5,a)}Kn(qn,i.hit.x,i.hit.y,i.hit.z,o.AIR),Bn=0,Kr=!1,on.visible=!1}}else Bn=0,on.visible=!1}else Bn=0,on.visible=!1;else Ie=null,Xr.visible=!1,on.visible=!1,Bn=0,Kr=!1}function ey(t){for(const[e,n]of iu.entries())n.timer+=t,n.timer>=16&&(n.timer=0,n.stage===1?(n.stage=2,Kn(qn,n.x,n.y,n.z,o.WHEAT_STAGE_2)):n.stage===2&&(n.stage=3,Kn(qn,n.x,n.y,n.z,o.WHEAT_STAGE_3)))}function ty(t){if(!ca()||Bo())return;const e=la();if(!e)return;const n=new C(0,0,-1);if(n.applyQuaternion(e.quaternion),t.button===0){ia=!0;const i=vM(e.position,n,3.8);if(i){const r=_t===o.DIAMOND_SWORD,s=_t===o.IRON_SWORD,l=_t===o.STONE_SWORD,a=_t===o.WOODEN_SWORD,c=_t===o.DIAMOND_PICKAXE||_t===o.IRON_PICKAXE||_t===o.STONE_PICKAXE||_t===o.WOODEN_PICKAXE;let f=r?9:s?7:l?5:a?4:c?3:2;const d=Hp();d&&!d.onGround&&!d.isFlying?(f=Math.floor(f*1.5),Yh(),hp(i.x,i.y+.8,i.z)):Vh(),nu(i,f,n);return}if(Ie){if(Nt(Ie.hit.x,Ie.hit.y,Ie.hit.z)===o.TNT){rM(Ie.hit.x,Ie.hit.y,Ie.hit.z);return}Kr=!0,Io={x:Ie.hit.x,y:Ie.hit.y,z:Ie.hit.z}}}else if(t.button===2){if(t.preventDefault(),_t===o.FLINT_AND_STEEL&&(Cx(),Ie)){const i=Nt(Ie.hit.x,Ie.hit.y,Ie.hit.z),{prev:r}=Ie;if(i===o.OBSIDIAN||i===o.NETHERRACK){Kn(qn,r.x,r.y,r.z,o.NETHER_PORTAL),DS(r.x+.5,r.y+.5,r.z+.5);return}}if(_t===o.BOW&&Op(o.ARROW)){To(o.ARROW),oM(e.position,n);return}if(ip(_t)){const i=op(_t);if(i>0){Jd(i),yn(),To(_t);return}}if(Ie){const i=Nt(Ie.hit.x,Ie.hit.y,Ie.hit.z);if(i===o.BED)if(TS()){wx(),bS(),Jd(4);return}else{yn();return}if(eu(_t)&&(i===o.GRASS||i===o.DIRT)){Rx(),Kn(qn,Ie.hit.x,Ie.hit.y,Ie.hit.z,o.FARMLAND);return}if(_t===o.WHEAT_SEEDS&&i===o.FARMLAND){const r=Ie.hit.y+1;if(r<64&&Nt(Ie.hit.x,r,Ie.hit.z)===o.AIR){dc(),Kn(qn,Ie.hit.x,r,Ie.hit.z,o.WHEAT_STAGE_1),iu.set(`${Ie.hit.x},${r},${Ie.hit.z}`,{x:Ie.hit.x,y:r,z:Ie.hit.z,stage:1,timer:0}),To(o.WHEAT_SEEDS);return}}if(i===o.LEVER){EM(Ie.hit.x,Ie.hit.y,Ie.hit.z),Xh(o.STONE);return}if(rS(i)){SM(Ie.hit.x,Ie.hit.y,Ie.hit.z);return}if(i===o.ENCHANTING_TABLE){KM();return}if(i===o.CRAFTING_TABLE){bM();return}if(i===o.FURNACE||i===o.FURNACE_LIT){DM(Ie.hit.x,Ie.hit.y,Ie.hit.z);return}if(i===o.CHEST){GM(Ie.hit.x,Ie.hit.y,Ie.hit.z);return}if(_t===o.REDSTONE_DUST){const{prev:r}=Ie;if(r.y>=0&&r.y<64&&Nt(r.x,r.y,r.z)===o.AIR){dc(),Kn(qn,r.x,r.y,r.z,o.REDSTONE_WIRE),To(o.REDSTONE_DUST,1),_l();return}}if(iS(_t)){const{prev:r}=Ie;r.y>=0&&r.y<64&&Nt(r.x,r.y,r.z)===o.AIR&&(dc(),Kn(qn,r.x,r.y,r.z,_t),To(_t,1),(_t===o.REDSTONE_TORCH||_t===o.LEVER||_t===o.PRESSURE_PLATE)&&_l())}}}}function ny(t){t.button===0&&(ia=!1,Kr=!1,Bn=0,on&&(on.visible=!1))}function iy(t){_t=t}function ru(){return _t}const Wd=[{type:o.WOODEN_SWORD,count:1},{type:o.WOODEN_PICKAXE,count:1},{type:o.GRASS,count:64},{type:o.DIRT,count:64},{type:o.WOOD_LOG,count:32},{type:o.COBBLESTONE,count:64},{type:o.TORCH,count:32},{type:o.WATER,count:1},{type:0,count:0}],Le=new Array(36).fill(null).map(()=>({type:0,count:0}));for(let t=0;t<Wd.length;t++)Le[t]={...Wd[t]};const Gt=[0,0,0,0];let su=0,Vt=null,fi=null,Xo=null,Fs=null,Ko=null,Ut=null,qr=null,Yr=null,$r=null,Zr=null,jr=null,Qr=null,Jr=null,Nf=-.3,rl=!1,yc=0;function bp(){fi||(fi=document.createElement("div"),fi.id="inventory-modal",fi.className="fixed inset-0 z-[150] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-md select-none",fi.innerHTML=`
    <div class="glass-panel w-full max-w-[840px] flex flex-col rounded-xl overflow-hidden shadow-2xl bg-surface/90 border border-outline-variant text-on-surface">
      <!-- Header -->
      <div class="px-6 py-3.5 border-b border-outline-variant bg-surface-container-high/80 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl" style="font-variation-settings: 'FILL' 1;">backpack</span>
          <h1 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tighter uppercase font-bold">INVENTÁRIO &amp; CRIAÇÃO</h1>
        </div>
        <div class="flex items-center gap-3">
          <button id="open-recipe-book-inv" class="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40 px-3 py-1.5 rounded-lg text-xs font-label-caps flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(120,220,119,0.2)] cursor-pointer">
            <span class="material-symbols-outlined text-sm">menu_book</span>
            <span>Receitas</span>
          </button>
          <button id="close-inventory-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg hover:bg-surface-container cursor-pointer">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="p-6 flex flex-col gap-6">
        <!-- Top Section: Crafting & Character -->
        <div class="flex flex-col md:flex-row justify-between gap-6">
          <!-- 2x2 Crafting Matrix -->
          <div class="flex-1 flex flex-col items-center justify-center bg-surface-container/50 p-4 rounded-xl border border-outline-variant">
            <span class="font-label-caps text-label-caps text-secondary mb-3 self-start font-semibold">Criação Básica (2×2)</span>
            <div class="flex items-center gap-5">
              <!-- 2x2 Grid -->
              <div id="inv-craft-2x2-grid" class="grid grid-cols-2 gap-2"></div>
              <!-- Arrow -->
              <div class="flex items-center justify-center">
                <span class="material-symbols-outlined text-3xl text-primary">east</span>
              </div>
              <!-- Output Slot -->
              <div id="inv-craft-2x2-output" class="slot w-16 h-16 rounded-xl active cursor-pointer relative bg-surface-container-lowest border-2 border-primary shadow-[0_0_12px_rgba(120,220,119,0.4)]" title="Clique para coletar o item criado"></div>
            </div>
          </div>

          <!-- Character & Armor -->
          <div class="flex-1 flex items-center justify-center gap-5 bg-surface-container/50 p-4 rounded-xl border border-outline-variant">
            <!-- Armor Slots -->
            <div class="flex flex-col gap-2">
              <span class="font-label-caps text-[11px] text-secondary font-semibold uppercase">Armadura</span>
              <div id="inv-armor-grid" class="flex flex-col gap-2"></div>
            </div>
            <!-- Player Preview (3D Viewport) -->
            <div class="w-36 h-52 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-1">
              <canvas id="inv-char-preview-canvas" width="140" height="200" class="w-full h-full cursor-grab active:cursor-grabbing" title="Arraste com o mouse para girar"></canvas>
              <div class="absolute bottom-1 right-2 flex items-center gap-1 font-label-caps text-[10px] font-bold text-primary bg-surface-container/90 border border-outline-variant px-2 py-0.5 rounded shadow">
                <span class="material-symbols-outlined text-xs" style="font-variation-settings: 'FILL' 1;">shield</span>
                <span id="inv-defense-badge">DEF: 0</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="h-px bg-outline-variant w-full"></div>

        <!-- Main 27 Inventory Slots -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <span class="font-label-caps text-label-caps text-secondary font-semibold">Mochila / Armazenamento Geral (27 slots)</span>
            <span class="font-label-caps text-[11px] text-on-surface-variant">Botão Esq: Pegar tudo • Botão Dir: Dividir/Colocar 1</span>
          </div>
          <div id="inv-storage-grid" class="grid grid-cols-9 gap-2"></div>
        </div>

        <!-- Hotbar -->
        <div class="flex flex-col gap-2 pt-1 border-t border-outline-variant/60">
          <span class="font-label-caps text-label-caps text-primary font-semibold">Barra Rápida (1 a 9)</span>
          <div id="inv-hotbar-grid" class="grid grid-cols-9 gap-2"></div>
        </div>
      </div>
    </div>
  `,document.body.appendChild(fi),document.getElementById("close-inventory-btn").addEventListener("click",Rp),document.getElementById("open-recipe-book-inv").addEventListener("click",Sp),window.addEventListener("keydown",t=>{t.code==="KeyE"&&oy()}),ry(),ui())}function ry(){const t=document.getElementById("inv-char-preview-canvas");if(!t)return;Xo=new Ph({canvas:t,alpha:!0,antialias:!0}),Xo.setSize(140,200),Xo.setPixelRatio(Math.min(window.devicePixelRatio,2)),Fs=new Uh,Ko=new an(40,140/200,.1,20),Ko.position.set(0,1,3.2),Ko.lookAt(0,.9,0);const e=new Wh(16777215,1.4);Fs.add(e);const n=new zh(16777215,1.8);n.position.set(2,4,3),Fs.add(n),Ut=new Ke,Fs.add(Ut);const i=new ye({color:13011801}),r=new ye({color:4528643}),s=new ye({color:43176}),l=new ye({color:1981066}),a=new ct({color:14870768,roughness:.35,metalness:.85}),c=new B(new k(.38,.38,.38),i);c.position.set(0,1.38,0),Ut.add(c);const f=new B(new k(.4,.15,.4),r);f.position.set(0,1.48,-.01),Ut.add(f),qr=new B(new k(.44,.44,.44),a),qr.position.set(0,1.38,0),qr.visible=!1,Ut.add(qr);const d=new B(new k(.42,.5,.2),s);d.position.set(0,.94,0),Ut.add(d),Yr=new B(new k(.48,.54,.26),a),Yr.position.set(0,.94,0),Yr.visible=!1,Ut.add(Yr);const p=new B(new k(.16,.48,.16),i);p.position.set(-.29,.93,0),Ut.add(p);const u=new B(new k(.16,.48,.16),i);u.position.set(.29,.93,0),Ut.add(u);const h=new B(new k(.18,.58,.18),l);h.position.set(-.1,.4,0),Ut.add(h);const m=new B(new k(.18,.58,.18),l);m.position.set(.1,.4,0),Ut.add(m),$r=new B(new k(.2,.38,.2),a),$r.position.set(-.1,.48,0),$r.visible=!1,Ut.add($r),Zr=new B(new k(.2,.38,.2),a),Zr.position.set(.1,.48,0),Zr.visible=!1,Ut.add(Zr),jr=new B(new k(.21,.18,.23),a),jr.position.set(-.1,.2,.015),jr.visible=!1,Ut.add(jr),Qr=new B(new k(.21,.18,.23),a),Qr.position.set(.1,.2,.015),Qr.visible=!1,Ut.add(Qr),t.addEventListener("mousedown",v=>{rl=!0,yc=v.clientX}),window.addEventListener("mousemove",v=>{if(!rl)return;const g=v.clientX-yc;yc=v.clientX,Nf+=g*.02}),window.addEventListener("mouseup",()=>{rl=!1})}function sy(){if(Jr)return;function t(){if(!Il()){Jr=null;return}rl||(Nf+=.012),Ut&&(Ut.rotation.y=Nf),Xo&&Fs&&Ko&&Xo.render(Fs,Ko),Jr=requestAnimationFrame(t)}Jr=requestAnimationFrame(t)}function kd(){const t=new ct({color:14870768,roughness:.35,metalness:.85}),e=new ct({color:2282478,roughness:.2,metalness:.65,emissive:537412,emissiveIntensity:.35});if(qr){const i=Gt[0]||0;qr.visible=i>0,i>0&&(qr.material=i===o.DIAMOND_HELMET?e:t)}if(Yr){const i=Gt[1]||0;Yr.visible=i>0,i>0&&(Yr.material=i===o.DIAMOND_CHESTPLATE?e:t)}if($r&&Zr){const i=Gt[2]||0;if($r.visible=i>0,Zr.visible=i>0,i>0){const r=i===o.DIAMOND_LEGGINGS?e:t;$r.material=r,Zr.material=r}}if(jr&&Qr){const i=Gt[3]||0;if(jr.visible=i>0,Qr.visible=i>0,i>0){const r=i===o.DIAMOND_BOOTS?e:t;jr.material=r,Qr.material=r}}const n=document.getElementById("inv-defense-badge");n&&(n.textContent=`DEF: ${ou()}`)}function oy(){Il()?Rp():ay()}function ay(){fi||bp(),fi.style.display="flex",fo(yt.INVENTORY),Rt(!0),Bs(),ui(),sy()}function Rp(){if(fi){fi.style.display="none",Ui(yt.INVENTORY),Rt(!1),Jr&&(cancelAnimationFrame(Jr),Jr=null),pe.type>0&&pe.count>0&&(Qn(pe.type,pe.count),Dl());for(let t=0;t<4;t++){const e=$t[t];e&&e.type>0&&e.count>0&&(Qn(e.type,e.count),$t[t]={type:0,count:0})}Bs(),mi()}}function Il(){return $h(yt.INVENTORY)}function ly(){return Le.slice(0,9).map(t=>t.type)}function wp(){return Le.slice(0,9)}function cy(t){su=t,mi()}function ou(){let t=0;for(let e=0;e<4;e++)Gt[e]>0&&(t+=sp(Gt[e]));return t}function Qn(t,e=1){if(!t||t===0||e<=0)return!1;let n=e;const i=po(t);if(i>1){for(let r=0;r<36;r++)if(Le[r].type===t&&Le[r].count<i){const s=i-Le[r].count,l=Math.min(s,n);if(Le[r].count+=l,n-=l,n<=0)break}}if(n>0){for(let r=0;r<36;r++)if(Le[r].type===0||Le[r].count===0){const s=Math.min(i,n);if(Le[r]={type:t,count:s},n-=s,n<=0)break}}return ui(),mi(),n===0}function Op(t,e=1){let n=0;for(let i=0;i<36;i++)Le[i].type===t&&(n+=Le[i].count);return n>=e}function To(t,e=1){if(!Op(t,e))return!1;let n=e;for(let i=0;i<36;i++)if(Le[i].type===t){const r=Math.min(Le[i].count,n);if(Le[i].count-=r,n-=r,Le[i].count<=0&&(Le[i]={type:0,count:0}),n<=0)break}return ui(),mi(),!0}function mi(){var e;const t=((e=Le[su])==null?void 0:e.type)||0;iy(t);for(let n=0;n<9;n++){const i=document.getElementById(`hotbar-slot-${n}`);if(i&&(i.innerHTML="",Le[n].type>0)){const r=Lt(Le[n].type,38);if(r&&i.appendChild(r),Le[n].count>1){const s=document.createElement("span");s.className="absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",s.textContent=Le[n].count,i.appendChild(s)}}}}function ui(){const t=document.getElementById("inv-armor-grid"),e=document.getElementById("inv-craft-2x2-grid"),n=document.getElementById("inv-craft-2x2-output"),i=document.getElementById("inv-storage-grid"),r=document.getElementById("inv-hotbar-grid");if(!t||!e||!n||!i||!r)return;kd(),t.innerHTML="";const s=["security","checkroom","accessibility","directions_run"],l=["Capacete","Peitoral","Calças","Botas"],a=[[o.IRON_HELMET,o.DIAMOND_HELMET],[o.IRON_CHESTPLATE,o.DIAMOND_CHESTPLATE],[o.IRON_LEGGINGS,o.DIAMOND_LEGGINGS],[o.IRON_BOOTS,o.DIAMOND_BOOTS]];for(let c=0;c<4;c++){const f=document.createElement("div");if(f.className="slot w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer transition-all relative",f.title=`Slot de ${l[c]}`,Gt[c]>0){const p=Lt(Gt[c],30);p&&f.appendChild(p)}else{const p=document.createElement("span");p.className="material-symbols-outlined text-on-surface-variant text-base opacity-60",p.textContent=s[c],f.appendChild(p)}const d={get:()=>({type:Gt[c],count:Gt[c]>0?1:0}),set:(p,u)=>{Gt[c]=p,kd()},allowEquip:p=>a[c].includes(p),maxStack:1};f.addEventListener("mousedown",p=>pi(d,p,ui)),f.addEventListener("contextmenu",p=>p.preventDefault()),fn(f,d.get),t.appendChild(f)}e.innerHTML="";for(let c=0;c<4;c++){const f=document.createElement("div");f.className="slot w-12 h-12 rounded-lg bg-surface-container-lowest border border-outline-variant hover:border-primary flex items-center justify-center cursor-pointer relative transition-all";const d=$t[c]||{type:0,count:0};if(d.type>0&&d.count>0){const u=Lt(d.type,32);if(u&&f.appendChild(u),d.count>1){const h=document.createElement("span");h.className="absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",h.textContent=d.count,f.appendChild(h)}}const p={get:()=>$t[c]||{type:0,count:0},set:(u,h)=>{$t[c]={type:u,count:u===0?0:h},Bs()}};f.addEventListener("mousedown",u=>pi(p,u,ui)),f.addEventListener("contextmenu",u=>u.preventDefault()),fn(f,p.get),e.appendChild(f)}if(n.innerHTML="",Vt&&Vt.result>0){const c=Lt(Vt.result,40);if(c&&n.appendChild(c),Vt.count>1){const f=document.createElement("span");f.className="slot-count font-label-caps text-xs font-bold bg-primary text-on-primary px-1.5 py-0.5 rounded shadow absolute bottom-1 right-1",f.textContent=Vt.count,n.appendChild(f)}}fn(n,()=>({type:(Vt==null?void 0:Vt.result)||0,count:(Vt==null?void 0:Vt.count)||0})),n.onmousedown=c=>{if(c.preventDefault(),Vt&&Vt.result>0){const f=Vt.result,d=Vt.count;if(c.shiftKey){if(Qn(f,d)){yn();for(let p=0;p<4;p++)$t[p].count>1?$t[p].count-=1:$t[p]={type:0,count:0};Bs(),ui()}}else{const p=po(f);if(pe.type===0){si(f,d),yn();for(let u=0;u<4;u++)$t[u].count>1?$t[u].count-=1:$t[u]={type:0,count:0};Bs(),ui()}else if(pe.type===f&&pe.count+d<=p){pe.count+=d,Fi(),yn();for(let u=0;u<4;u++)$t[u].count>1?$t[u].count-=1:$t[u]={type:0,count:0};Bs(),ui()}}}},n.oncontextmenu=c=>c.preventDefault(),i.innerHTML="";for(let c=9;c<36;c++)Vd(c,i);r.innerHTML="";for(let c=0;c<9;c++)Vd(c,r,!0,c===su)}function Vd(t,e,n=!1,i=!1){const r=document.createElement("div");r.className=`slot w-full h-11 md:h-12 rounded-lg bg-surface-container-lowest border ${i?"border-primary shadow-[0_0_10px_rgba(120,220,119,0.5)] active":"border-outline-variant hover:border-primary/80"} flex items-center justify-center cursor-pointer relative transition-all`;const s=Le[t]||{type:0,count:0};if(s.type>0&&s.count>0){const a=Lt(s.type,34);if(a&&r.appendChild(a),r.title=pr[s.type]||"Item",s.count>1){const c=document.createElement("span");c.className="absolute bottom-0.5 right-1 font-label-caps text-[11px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",c.textContent=s.count,r.appendChild(c)}}const l={get:()=>Le[t]||{type:0,count:0},set:(a,c)=>{Le[t]={type:a,count:a===0?0:c},mi()},onShiftClick:(a,c)=>{if(t>=9){for(let f=0;f<9;f++)if(Le[f].type===0||Le[f].count===0){Le[f]={type:a,count:c},Le[t]={type:0,count:0},Rt(!1);return}}else for(let f=9;f<36;f++)if(Le[f].type===0||Le[f].count===0){Le[f]={type:a,count:c},Le[t]={type:0,count:0},Rt(!1);return}}};r.addEventListener("mousedown",a=>pi(l,a,ui)),r.addEventListener("contextmenu",a=>a.preventDefault()),fn(r,l.get),e.appendChild(r)}function Bs(){const t=$t.map(e=>(e==null?void 0:e.type)||0);Vt=vp(t,2,2)}const Tc=new Map;function fy(t=o.IRON_SWORD){const e=new Ke;let n,i,r,s,l,a,c;t===o.DIAMOND_SWORD?(n=561586,i=2282478,r=15793652,s=988970,l=440020,a=7877903,c=988970):t===o.IRON_SWORD?(n=6583435,i=14870768,r=16777215,s=3359061,l=9741240,a=8736014,c=3359061):t===o.STONE_SWORD?(n=3359061,i=6583435,r=9741240,s=1976635,l=4674921,a=7877903,c=1976635):(n=7877903,i=11817737,r=16498468,s=4528643,l=14251782,a=4528643,c=4528643);const f=new ct({color:n,roughness:.3,metalness:.7}),d=new ct({color:i,roughness:.25,metalness:.8}),p=new ct({color:r,roughness:.2,metalness:.9,emissive:t===o.DIAMOND_SWORD?537412:0,emissiveIntensity:.3}),u=new ct({color:s,roughness:.4,metalness:.85}),h=new ct({color:l,roughness:.2,metalness:.6}),m=new ye({color:a}),v=new ct({color:c,roughness:.4,metalness:.85}),g=new B(new k(.048,.52,.032),p);g.position.set(0,.32,0),e.add(g);const _=new B(new k(.024,.48,.024),d);_.position.set(-.034,.3,0),e.add(_);const y=new B(new k(.024,.48,.024),d);y.position.set(.034,.3,0),e.add(y);const x=new B(new k(.012,.44,.016),f);x.position.set(-.048,.28,0),e.add(x);const S=new B(new k(.012,.44,.016),f);S.position.set(.048,.28,0),e.add(S);const I=new B(new k(.032,.055,.028),d);I.position.set(0,.6,0),e.add(I);const R=new B(new k(.018,.035,.034),p);R.position.set(0,.6,0),e.add(R);const w=new B(new k(.22,.044,.052),u);w.position.set(0,.05,0),e.add(w);const D=new B(new k(.038,.075,.056),u);D.position.set(-.115,.07,0),e.add(D);const A=new B(new k(.038,.075,.056),u);A.position.set(.115,.07,0),e.add(A);const M=new B(new k(.042,.042,.062),h);M.position.set(0,.05,0),e.add(M);const O=new B(new k(.036,.16,.036),m);O.position.set(0,-.055,0),e.add(O);const H=new B(new k(.042,.024,.042),v);H.position.set(0,-.02,0),e.add(H);const F=new B(new k(.042,.024,.042),v);F.position.set(0,-.08,0),e.add(F);const Y=new B(new k(.07,.048,.07),v);Y.position.set(0,-.155,0),e.add(Y);const q=new B(new k(.036,.022,.036),h);return q.position.set(0,-.18,0),e.add(q),e}function uy(t=o.IRON_PICKAXE){const e=new Ke;let n,i;t===o.DIAMOND_PICKAXE?(n=2282478,i=14742270):t===o.IRON_PICKAXE?(n=14870768,i=16777215):t===o.STONE_PICKAXE?(n=6583435,i=9741240):(n=11817737,i=16498468);const r=new ct({color:n,roughness:.35,metalness:.75}),s=new ct({color:i,roughness:.25,metalness:.85}),l=new ye({color:7877903}),a=new ct({color:3359061,roughness:.5,metalness:.8}),c=new B(new k(.038,.58,.038),l);c.position.set(0,.12,0),e.add(c);const f=new B(new k(.046,.06,.046),a);f.position.set(0,.34,0),e.add(f);const d=new B(new k(.12,.07,.055),r);d.position.set(0,.37,0),e.add(d);const p=new B(new k(.14,.05,.045),r);p.position.set(-.11,.34,0),p.rotation.z=.22,e.add(p);const u=new B(new k(.07,.032,.038),s);u.position.set(-.2,.3,0),u.rotation.z=.44,e.add(u);const h=new B(new k(.14,.05,.045),r);h.position.set(.11,.34,0),h.rotation.z=-.22,e.add(h);const m=new B(new k(.07,.032,.038),s);return m.position.set(.2,.3,0),m.rotation.z=-.44,e.add(m),e}function dy(t=o.IRON_HOE){const e=new Ke;let n;t===o.IRON_HOE?n=14870768:t===o.STONE_HOE?n=6583435:n=11817737;const i=new ct({color:n,roughness:.35,metalness:.75}),r=new ye({color:7877903}),s=new B(new k(.038,.54,.038),r);s.position.set(0,.1,0),e.add(s);const l=new B(new k(.2,.065,.05),i);l.position.set(.08,.34,0),e.add(l);const a=new B(new k(.05,.12,.045),i);return a.position.set(.16,.29,0),e.add(a),e}function hy(){const t=new Ke,e=new ye({color:7877903}),n=new On({color:16317180}),i=new B(new k(.035,.28,.035),e);i.position.set(.06,.14,0),i.rotation.z=-.35,t.add(i);const r=new B(new k(.035,.28,.035),e);r.position.set(.06,-.14,0),r.rotation.z=.35,t.add(r);const s=new B(new k(.048,.12,.048),e);s.position.set(.11,0,0),t.add(s);const l=new B(new k(.012,.54,.012),n);return l.position.set(0,0,0),t.add(l),t}function Xd(t=!1){const e=new Ke,n=new ct({color:t?3359061:4528643,roughness:.4,metalness:.8}),i=new ct({color:t?14870768:11817737,roughness:.35,metalness:t?.85:.2}),r=new ct({color:3359061,roughness:.3,metalness:.9}),s=new B(new k(.32,.46,.04),n);s.position.set(0,.12,0),e.add(s);const l=new B(new k(.28,.42,.046),i);l.position.set(0,.12,.005),e.add(l);const a=new B(new k(.08,.08,.06),r);a.position.set(0,.12,.015),e.add(a);const c=new B(new k(.12,.04,.03),n);return c.position.set(0,.12,-.03),e.add(c),e}function Kd(){const t=new Ke,e=new ye({color:8591427}),n=new ye({color:16707722}),i=new ct({color:16436245,roughness:.2,metalness:.8}),r=new B(new k(.14,.02,.2),n);r.position.set(-.075,.02,0),r.rotation.z=-.15,t.add(r);const s=new B(new k(.14,.02,.2),n);s.position.set(.075,.02,0),s.rotation.z=.15,t.add(s);const l=new B(new k(.3,.015,.22),e);l.position.set(0,0,0),t.add(l);const a=new B(new k(.03,.025,.03),i);return a.position.set(.12,.01,.09),t.add(a),t}function py(){const t=new Ke,e=new ye({color:7877903}),n=new ye({color:11817737}),i=new B(new k(.38,.04,.54),n);i.position.set(0,0,0),t.add(i);const r=new B(new k(.04,.14,.54),e);r.position.set(-.2,.07,0),t.add(r);const s=new B(new k(.04,.14,.54),e);s.position.set(.2,.07,0),t.add(s);const l=new B(new k(.44,.14,.04),e);l.position.set(0,.07,-.27),t.add(l);const a=new B(new k(.44,.14,.04),e);return a.position.set(0,.07,.27),t.add(a),t}function my(){const t=new Ke,e=new ct({color:14870768,roughness:.3,metalness:.85}),n=new ct({color:1976635,roughness:.7,metalness:.2}),i=new B(new k(.14,.18,.04),e);i.position.set(-.04,.05,0),t.add(i);const r=new B(new k(.1,.12,.045),n);return r.position.set(.05,.02,0),t.add(r),t}function Cp(t,e=.22){if(t===o.DIAMOND_SWORD||t===o.IRON_SWORD||t===o.STONE_SWORD||t===o.WOODEN_SWORD)return fy(t);if(t===o.DIAMOND_PICKAXE||t===o.IRON_PICKAXE||t===o.STONE_PICKAXE||t===o.WOODEN_PICKAXE)return uy(t);if(t===o.IRON_HOE||t===o.STONE_HOE||t===o.WOODEN_HOE)return dy(t);if(t===o.BOW)return hy();if(t===o.FLINT_AND_STEEL)return my();if(t===o.WOODEN_SHIELD)return Xd(!1);if(t===o.IRON_SHIELD)return Xd(!0);if(t===o.BOOK)return Kd();if(t===o.BOAT)return py();if(t===o.TORCH||t===o.REDSTONE_TORCH){const f=t===o.REDSTONE_TORCH,d=new Ke,p=new ye({color:7877903}),u=new ct({color:f?15680580:16347926,emissive:f?12131356:16436245,emissiveIntensity:.95}),h=new B(new k(.04,.32,.04),p);h.position.set(0,.1,0),d.add(h);const m=new B(new k(.055,.09,.055),u);return m.position.set(0,.27,0),d.add(m),d}if(t===o.LEVER){const f=new Ke,d=new ye({color:6583435}),p=new ye({color:7877903}),u=new B(new k(.12,.04,.16),d);f.add(u);const h=new B(new k(.03,.22,.03),p);return h.position.set(0,.1,0),h.rotation.z=-.35,f.add(h),f}if(t===o.PRESSURE_PLATE){const f=new ye({color:6583435});return new B(new k(e*.9,e*.15,e*.9),f)}if(t===o.ENCHANTING_TABLE){const f=new Ke,d=new ye({color:1973067}),p=Kd(),u=new B(new k(e,e*.75,e),d);return u.position.set(0,e*.375,0),f.add(u),p.position.set(0,e*.82,0),p.scale.set(.65,.65,.65),f.add(p),f}if(t===o.GOLDEN_APPLE){const f=new ct({color:16436245,emissive:8736014,emissiveIntensity:.3,roughness:.2,metalness:.7});return new B(new jf(e*.42,8,8),f)}if(t===o.BREAD){const f=new ye({color:11817737});return new B(new k(e*.9,e*.45,e*.6),f)}if(t===o.WHEAT){const f=new ye({color:15381256});return new B(new k(e*.35,e*.9,e*.35),f)}if(t===o.PORKCHOP||t===o.MUTTON){const f=new ye({color:16020150});return new B(new k(e,e*.4,e*.8),f)}if(t===o.COOKED_PORKCHOP||t===o.COOKED_MUTTON){const f=new ye({color:10105874});return new B(new k(e,e*.4,e*.8),f)}if(t===o.ROTTEN_FLESH){const f=new ye({color:8702998});return new B(new k(e,e*.4,e*.8),f)}if(t===o.DIAMOND){const f=new ct({color:2282478,emissive:537412,emissiveIntensity:.4,roughness:.15,metalness:.7});return new B(new cl(e*.5),f)}if(t===o.IRON_INGOT){const f=new ct({color:14870768,roughness:.3,metalness:.85});return new B(new k(e*.8,e*.3,e*.5),f)}if(t===o.FLINT){const f=new ct({color:1976635,roughness:.6,metalness:.3});return new B(new k(e*.6,e*.6,e*.3),f)}if(t===o.QUARTZ){const f=new ct({color:16317180,roughness:.2,metalness:.4});return new B(new cl(e*.45),f)}const n=`${t}:${e}`;if(Tc.has(n))return Tc.get(n);const i=ta[t];if(!i)return null;const r=new k(e,e,e),s=r.attributes.uv.array,l=[i.side,i.side,i.top,i.bottom,i.side,i.side];for(let f=0;f<6;f++){const d=l[f],p=Go(d),u=f*8;s[u+0]=p.uMin,s[u+1]=p.vMax,s[u+2]=p.uMax,s[u+3]=p.vMax,s[u+4]=p.uMin,s[u+5]=p.vMin,s[u+6]=p.uMax,s[u+7]=p.vMin}r.attributes.uv.needsUpdate=!0;const a=new ye({map:Ol(),transparent:!0,alphaTest:.2}),c=new B(r,a);return Tc.set(n,c),c}let Gn=null,Ri=null,Rn=null,Ao=null,wr=null,En=null,Or=null,Cr=null,Hn=null,Oi=null,es=null,ts=null,ns=null,is=null,rs=null,ss=null,qo=null,qd=-1,Xt=null,Dp=null,Ac=0;function _y(t){Gn&&t.remove(Gn),Gn=new Ke,Gn.name="player-3d-character",Ri=new Ke,Gn.add(Ri);const e=new ye({color:13011801}),n=new ye({color:4528643}),i=new ye({color:43176}),r=new ye({color:1981066}),s=new On({color:16777215}),l=new On({color:2450411}),a=new ye({color:8736014});Xt=new ct({color:14870768,roughness:.35,metalness:.85}),Dp=new ct({color:2282478,roughness:.2,metalness:.65,emissive:537412,emissiveIntensity:.35}),Rn=new Ke,Rn.position.set(0,1.42,0);const c=new B(new k(.4,.4,.4),e);c.position.set(0,.2,0),Rn.add(c);const f=new B(new k(.42,.16,.42),n);f.position.set(0,.33,-.01),Rn.add(f);const d=new B(new k(.08,.05,.02),s);d.position.set(-.09,.21,.205),Rn.add(d);const p=new B(new k(.04,.05,.022),l);p.position.set(-.11,.21,.206),Rn.add(p);const u=new B(new k(.08,.05,.02),s);u.position.set(.09,.21,.205),Rn.add(u);const h=new B(new k(.04,.05,.022),l);h.position.set(.07,.21,.206),Rn.add(h);const m=new B(new k(.12,.03,.02),a);m.position.set(0,.11,.205),Rn.add(m),Hn=new Ke;const v=new B(new k(.46,.22,.46),Xt);v.position.set(0,.31,0),Hn.add(v);const g=new B(new k(.04,.24,.44),Xt);g.position.set(-.21,.18,0),Hn.add(g);const _=new B(new k(.04,.24,.44),Xt);_.position.set(.21,.18,0),Hn.add(_);const y=new B(new k(.44,.24,.04),Xt);y.position.set(0,.18,-.21),Hn.add(y);const x=new B(new k(.08,.1,.04),Xt);x.position.set(0,.22,.21),Hn.add(x),Hn.visible=!1,Rn.add(Hn),Ri.add(Rn),Ao=new Ke,Ao.position.set(0,.9,0);const S=new B(new k(.44,.52,.22),i);S.position.set(0,.26,0),Ao.add(S),Oi=new Ke;const I=new B(new k(.48,.54,.26),Xt);I.position.set(0,.26,0),Oi.add(I);const R=new B(new k(.18,.14,.26),Xt);R.position.set(-.3,.46,0),Oi.add(R);const w=new B(new k(.18,.14,.26),Xt);w.position.set(.3,.46,0),Oi.add(w),Oi.visible=!1,Ao.add(Oi),Ri.add(Ao),wr=new Ke,wr.position.set(-.31,1.38,0);const D=new B(new k(.18,.5,.18),e);D.position.set(0,-.25,0),wr.add(D);const A=new B(new k(.186,.18,.186),i);A.position.set(0,-.1,0),wr.add(A),es=new B(new k(.2,.26,.2),Xt),es.position.set(0,-.14,0),es.visible=!1,wr.add(es),Ri.add(wr),En=new Ke,En.position.set(.31,1.38,0);const M=new B(new k(.18,.5,.18),e);M.position.set(0,-.25,0),En.add(M);const O=new B(new k(.186,.18,.186),i);O.position.set(0,-.1,0),En.add(O),ts=new B(new k(.2,.26,.2),Xt),ts.position.set(0,-.14,0),ts.visible=!1,En.add(ts),qo=new Ke,qo.position.set(0,-.42,.12),En.add(qo),Ri.add(En),Or=new Ke,Or.position.set(-.11,.9,0);const H=new B(new k(.2,.6,.2),r);H.position.set(0,-.3,0),Or.add(H),ns=new B(new k(.22,.36,.22),Xt),ns.position.set(0,-.18,0),ns.visible=!1,Or.add(ns),rs=new B(new k(.23,.2,.25),Xt),rs.position.set(0,-.48,.015),rs.visible=!1,Or.add(rs),Ri.add(Or),Cr=new Ke,Cr.position.set(.11,.9,0);const F=new B(new k(.2,.6,.2),r);return F.position.set(0,-.3,0),Cr.add(F),is=new B(new k(.22,.36,.22),Xt),is.position.set(0,-.18,0),is.visible=!1,Cr.add(is),ss=new B(new k(.23,.2,.25),Xt),ss.position.set(0,-.48,.015),ss.visible=!1,Cr.add(ss),Ri.add(Cr),Gn.visible=!1,t.add(Gn),Gn}function gy(t,e,n,i,r,s,l,a,c,f){if(!Gn||(Gn.visible=f,!f))return;Gn.position.copy(e),Ri.rotation.y=n+Math.PI,Rn.rotation.x=-i,r?Ac+=t*(l?4:10):Ac=0;const d=Math.sin(Ac)*.65;if(Or.rotation.x=-d,Cr.rotation.x=d,wr.rotation.x=d*.75,a<1){const p=Math.sin(a*Math.PI);En.rotation.x=-1.4*p,En.rotation.z=-.3*p,En.rotation.y=.4*p}else En.rotation.x=-d*.75,En.rotation.z=0,En.rotation.y=0;if(vy(),c!==qd&&(qd=c,qo.clear(),c>0)){const p=Cp(c,.28);p&&(fa(c)?(p.position.set(0,-.3,-.14),p.rotation.set(-.85,0,0)):c===o.TORCH||c===o.FLINT_AND_STEEL?(p.position.set(0,-.3,-.12),p.rotation.set(-.5,0,0)):(p.position.set(0,-.26,-.1),p.rotation.set(.15,.4,0)),qo.add(p))}}function $i(t,e){const n=e===o.DIAMOND_HELMET||e===o.DIAMOND_CHESTPLATE||e===o.DIAMOND_LEGGINGS||e===o.DIAMOND_BOOTS?Dp:Xt;t.isMesh?t.material=n:t.children&&t.children.forEach(i=>{i.isMesh&&(i.material=n)})}function vy(){const t=Gt[0]||0;t>0?(Hn.visible=!0,$i(Hn,t)):Hn.visible=!1;const e=Gt[1]||0;e>0?(Oi.visible=!0,es.visible=!0,ts.visible=!0,$i(Oi,e),$i(es,e),$i(ts,e)):(Oi.visible=!1,es.visible=!1,ts.visible=!1);const n=Gt[2]||0;n>0?(ns.visible=!0,is.visible=!0,$i(ns,n),$i(is,n)):(ns.visible=!1,is.visible=!1);const i=Gt[3]||0;i>0?(rs.visible=!0,ss.visible=!0,$i(rs,i),$i(ss,i)):(rs.visible=!1,ss.visible=!1)}const Ip=.36,Np=-.3,Lp=-.44,Pp=-.3,Up=.32,Fp=-.1;let Sn=null,bc=null,Rc=null,Un=null,Qi=-1,Gs=1,xy=5.8,Tr=0;function Ey(){const t=la();if(!t)return;Sn=new Ke;const e=new ye({color:13011801,depthTest:!0}),n=new ye({color:43176,depthTest:!0});bc=new B(new k(.1,.1,.36),e),bc.position.set(0,0,.1),Sn.add(bc),Rc=new B(new k(.108,.108,.14),n),Rc.position.set(0,0,.23),Sn.add(Rc),Bp(),Sn.position.set(Ip,Np,Lp),Sn.rotation.set(Pp,Up,Fp),Sn.renderOrder=999,t.add(Sn),document.addEventListener("mousedown",Sy)}function Sy(t){ca()&&(t.button===0||t.button===2)&&(Gs=0)}function Bp(){const t=ru();if(t!==Qi&&(Qi=t,Un&&(Sn.remove(Un),Un=null),Qi>0)){const e=Cp(Qi,.22);e&&(Un=e,fa(Qi)?(Un.position.set(.01,.04,-.09),Un.rotation.set(-.62,.2,-.12)):Qi===o.TORCH||Qi===o.FLINT_AND_STEEL?(Un.position.set(.01,.04,-.09),Un.rotation.set(-.4,.2,-.1)):(Un.position.set(.02,.06,-.12),Un.rotation.set(.25,.55,-.08)),Sn.add(Un))}}function My(t,e){if(!Sn)return;const n=Zh()===os.FIRST_PERSON;if(Sn.visible=n,!n)return;Bp();let i=0,r=0,s=0,l=0,a=0;if(Gs<1){const p=fa(Qi)?6.2:xy;Gs=Math.min(1,Gs+t*p);const u=Math.sin(Gs*Math.PI);i=-u*1.05,r=u*.6,s=-u*.4,l=-u*.09,a=-u*.14}const c=Hp();let f=0,d=0;c.onGround&&c.moving?(Tr+=t*10,f=Math.cos(Tr*.5)*.025,d=Math.abs(Math.sin(Tr))*.035):c.isFlying&&c.moving?(Tr+=t*6,f=Math.cos(Tr*.5)*.015,d=Math.sin(Tr)*.015):Tr=0,Sn.position.set(Ip+f,Np+d+l,Lp+a),Sn.rotation.set(Pp+i,Up+r,Fp+s)}function yy(){return Gs}const bt=.3,No=1.8,xl=1.62,Yd=28,Ty=8.6,Ay=5.8,by=14,$d=10,Ry=3.6;let bo=0;const io=20,wy=6,Oy=2,Cy=5,Dy=.5,Zd=3.2;let ur=null;const re=new C;let Re=new C,ln=io,Iy=20,ii=!1,Wn=!1,wi=!1,Lo=!1,Po=0,Ns=!1,El=0,Sl=0,Va=0,Ur=0,ri=!1,Ro=0,wo=0;const Os=[];let jd=!1;function Ny(){return Iy}let Qd=!1;function Ly(){ur=la(),ln=io,Re.set(0,0,0),Wn=!1;const t=tu();re.set(t.x,t.y,t.z),Ur=re.y,ri=!1,ur&&ur.position.set(re.x,re.y+xl,re.z),Qd||(Qd=!0,window.addEventListener("keydown",e=>{if(e.code==="F4"||e.code==="F5"){e.preventDefault();const n=Wx();Wy(["👁 Perspectiva: 1ª Pessoa","🎥 Perspectiva: 3ª Pessoa (Costas)","📸 Perspectiva: 3ª Pessoa (Frontal)"][n]);try{yn()}catch{}}}))}function Gp(){return ln}function Py(){return El}function Uy(){return Wn}function vi(){return re}function Hp(){return{onGround:ii,moving:Ns,inWater:wi,submerged:Lo,isFlying:Wn}}function ro(t,e=null){if(ln<=0)return;const n=ou(),i=Math.min(.8,n*.04),r=Math.max(1,t*(1-i));ln=Math.max(0,ln-r),El=1,Sl=0,xx(),e&&(Re.x+=e.x*5,Re.z+=e.z*5,Re.y=3.5)}function Fy(t){ln<=0||(ln=Math.min(io,ln+t))}function Jd(t){Fy(t)}function eh(){ln=io,Re.set(0,0,0),ii=!1,Wn=!1,Po=0,Sl=0;const t=tu();re.set(t.x,t.y,t.z),Ur=re.y,ri=!1,ur&&ur.position.set(re.x,re.y+xl,re.z)}function zp(t,e,n){return e<0?!0:Jf(Nt(t,e,n))}function Ar(t,e,n){const i=Math.floor(t-bt+.001),r=Math.floor(t+bt-.001),s=Math.floor(e),l=Math.floor(e+No-.001),a=Math.floor(n-bt+.001),c=Math.floor(n+bt-.001);for(let f=s;f<=l;f++)for(let d=a;d<=c;d++)for(let p=i;p<=r;p++)if(zp(p,f,d))return!0;return!1}function th(t,e,n){return Nt(t,e,n)===o.WATER}function By(t){if(ur||(ur=la()),!ur)return;const e=ca();El=Math.max(0,El-t*2),wi=th(Math.floor(re.x),Math.floor(re.y+.2),Math.floor(re.z)),Lo=th(Math.floor(re.x),Math.floor(re.y+xl),Math.floor(re.z));const n=e&&ti("Space"),i=performance.now()/1e3;if(n&&!jd){for(wo=.15,Os.push(i);Os.length>0&&i-Os[0]>.55;)Os.shift();Os.length>=3&&(Wn=!Wn,Re.set(0,0,0),Os.length=0,ri=!1,gx(Wn))}jd=n,wo>0&&(wo-=t),ii?Ro=.12:Ro=Math.max(0,Ro-t);let r=0,s=0;e&&(ti("KeyW")&&(r+=1),ti("KeyS")&&(r-=1),ti("KeyD")&&(s+=1),ti("KeyA")&&(s-=1));const l=Cd(),a=-Math.sin(l),c=-Math.cos(l),f=Math.cos(l),d=-Math.sin(l);let p=0,u=0;if(r!==0||s!==0){p=a*r+f*s,u=c*r+d*s;const m=Math.hypot(p,u);m>.001&&(p/=m,u/=m)}if(Ns=r!==0||s!==0,Wn){ri=!1;const m=by,v=1-Math.exp(-65*t);Re.x+=(p*(Ns?m:0)-Re.x)*v,Re.z+=(u*(Ns?m:0)-Re.z)*v;let g=0;e&&(ti("Space")&&(g+=$d),(ti("ShiftLeft")||ti("ShiftRight"))&&(g-=$d)),Re.y+=(g-Re.y)*v,re.x+=Re.x*t,Ar(re.x,re.y,re.z)&&(Re.x>0?re.x=Math.floor(re.x+bt)-bt-.001:Re.x<0&&(re.x=Math.floor(re.x-bt)+1+bt+.001),Re.x=0),re.z+=Re.z*t,Ar(re.x,re.y,re.z)&&(Re.z>0?re.z=Math.floor(re.z+bt)-bt-.001:Re.z<0&&(re.z=Math.floor(re.z-bt)+1+bt+.001),Re.z=0),re.y+=Re.y*t,Ar(re.x,re.y,re.z)&&(Re.y>0?re.y=Math.floor(re.y+No)-No-.001:Re.y<0&&(re.y=Math.floor(re.y)+1),Re.y=0)}else{const m=(ii||Ro>0)&&!wi;wo>0&&m?(Re.y=Ty,ii=!1,Ro=0,wo=0,Ur=re.y,ri=!1,kh()):wi&&n&&(Re.y=Math.max(Re.y,4.5),ri=!1);const v=wi?Yd*.3:Yd;Re.y-=v*t;const g=wi?8:36;Re.y<-g&&(Re.y=-g),Re.y<0?ri||(ri=!0,Ur=re.y):(ri=!1,Ur=re.y);const _=(Lo?.7:1)*(wi?Ry:Ay);if(Ns){const S=1-Math.exp(-65*t);Re.x+=(p*_-Re.x)*S,Re.z+=(u*_-Re.z)*S;const I=Math.hypot(Re.x,Re.z);if(ii&&!wi&&I>1.2&&!Wn){if(bo+=t,bo>=.42){bo=0;const R=Nt(Math.floor(re.x),Math.floor(re.y-.2),Math.floor(re.z));Ox(R)}}else bo=0}else{const S=Math.exp(-14*t);Re.x*=S,Re.z*=S,bo=0}const y=(S,I)=>{if(!ii)return!1;const R=.55;return Ar(re.x+S,re.y+R,re.z+I)?!1:(re.y+=R,!0)};re.x+=Re.x*t,Ar(re.x,re.y,re.z)&&(y(0,0)||(Re.x>0?re.x=Math.floor(re.x+bt)-bt-.001:Re.x<0&&(re.x=Math.floor(re.x-bt)+1+bt+.001),Re.x=0)),re.z+=Re.z*t,Ar(re.x,re.y,re.z)&&(y(0,0)||(Re.z>0?re.z=Math.floor(re.z+bt)-bt-.001:Re.z<0&&(re.z=Math.floor(re.z-bt)+1+bt+.001),Re.z=0));const x=Re.y<0;if(re.y+=Re.y*t,ii=!1,Ar(re.x,re.y,re.z))if(x){ii=!0;const S=Math.floor(re.y)+1,I=Math.max(0,Ur-S);if(re.y=S,Re.y=0,!wi&&I>Zd){const R=Math.floor((I-Zd)*1.5);R>0&&ro(R)}ri=!1,Ur=re.y}else re.y=Math.floor(re.y+No)-No-.001,Re.y=0}re.y<-10&&eh(),kx(re,xl,zp);const h=Zh()!==os.FIRST_PERSON;gy(t,re,Cd(),zx(),Ns,ii,Wn,yy(),ru(),h),Lo&&!Wn?(Po+=t,Po>wy&&ro(Oy*t)):Po=Math.max(0,Po-t*2.5),ln>0&&ln<io&&!Lo&&(Sl+=t,Sl>Cy&&(ln=Math.min(io,ln+Dy*t))),ln<=0?(Va+=t,e&&ti("Space")&&Va>.8&&(eh(),Va=0)):Va=0}const nh=document.getElementById("debug-info");let ir=null,wc=0,Xa=0,Oc=60;const Gy={[lt.PLAINS]:"Planície Florida",[lt.FOREST]:"Floresta Densa",[lt.DESERT]:"Deserto de Dunas",[lt.SNOWY_MOUNTAINS]:"Picos Nevados",[lt.OCEAN]:"Costa / Oceano"};function Hy(){if(!ir){ir=document.createElement("div"),ir.id="fly-badge",Object.assign(ir.style,{position:"absolute",top:"58px",left:"50%",transform:"translateX(-50%)",padding:"4px 14px",borderRadius:"20px",background:"linear-gradient(135deg, rgba(37,99,235,0.85), rgba(147,51,234,0.85))",border:"1px solid rgba(255,255,255,0.4)",boxShadow:"0 0 15px rgba(59,130,246,0.6)",color:"#ffffff",fontSize:"12px",fontWeight:"bold",letterSpacing:"1px",textTransform:"uppercase",pointerEvents:"none",zIndex:"25",display:"none",backdropFilter:"blur(4px)",animation:"pulse 1.8s infinite"}),ir.innerHTML='⚡ MODO VOO ATIVO &nbsp;<span style="opacity:0.75; font-size:10px;">(Espaço: subir | Shift: descer)</span>';const t=document.getElementById("hud");t&&t.appendChild(ir)}}function zy(t,e){if(Hy(),wc++,Xa+=t,Xa>=.5&&(Oc=Math.round(wc/Xa),wc=0,Xa=0),nh&&e.position){const n=e.position,i=to(Math.floor(n.x),Math.floor(n.z)),r=Gy[i]||"Desconhecido",s=AS(),l=no(),a=l?"☀️":"🌙";nh.innerHTML=`<b>FPS:</b> <span style="color:${Oc>=50?"#4ade80":"#f87171"}">${Oc}</span><br><b>XYZ:</b> ${n.x.toFixed(1)} / ${n.y.toFixed(1)} / ${n.z.toFixed(1)}<br><b>Bioma:</b> <span style="color:#38bdf8;">${r}</span><br><b>Hora:</b> ${a} <span style="color:#fde047;">${s}</span> (${l?"Dia":"Noite"})`}ir&&(ir.style.display=Uy()?"block":"none")}let Fn=null,Cc=null;function Wy(t){if(!Fn){Fn=document.createElement("div"),Fn.id="camera-mode-toast",Object.assign(Fn.style,{position:"absolute",top:"24px",left:"50%",transform:"translateX(-50%)",padding:"6px 18px",borderRadius:"24px",background:"rgba(15, 23, 42, 0.85)",border:"1px solid rgba(74, 222, 128, 0.5)",boxShadow:"0 0 20px rgba(74, 222, 128, 0.3)",color:"#4ade80",fontSize:"13px",fontWeight:"bold",letterSpacing:"0.8px",pointerEvents:"none",zIndex:"100",transition:"opacity 0.3s ease, transform 0.3s ease",opacity:"0",backdropFilter:"blur(6px)"});const e=document.getElementById("hud");e&&e.appendChild(Fn)}Fn.textContent=t,Fn.style.opacity="1",Fn.style.transform="translateX(-50%) translateY(4px)",Cc&&clearTimeout(Cc),Cc=setTimeout(()=>{Fn&&(Fn.style.opacity="0",Fn.style.transform="translateX(-50%) translateY(0px)")},2200)}let Ml=0,Lf=null,Hs=null,ih=!1;function ky(){const t=document.getElementById("hud"),e=document.createElement("div");e.id="hotbar-frame",Object.assign(e.style,{position:"absolute",bottom:"14px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"4px",padding:"5px",borderRadius:"8px",background:"rgba(15, 23, 42, 0.85)",border:"2px solid rgba(255,255,255,0.15)",boxShadow:"0 8px 24px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)",backdropFilter:"blur(8px)",pointerEvents:"none",zIndex:"20"}),Lf=e;for(let n=0;n<9;n++){const i=document.createElement("div");i.className="hotbar-slot",i.dataset.index=n,Object.assign(i.style,{width:"46px",height:"46px",borderRadius:"6px",border:"2px solid rgba(0,0,0,0.55)",background:"rgba(30, 41, 59, 0.9)",backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"75% 75%",position:"relative",transition:"border-color 0.15s, transform 0.15s, box-shadow 0.15s",cursor:"pointer"});const r=document.createElement("span");r.className="hotbar-slot-num",Object.assign(r.style,{position:"absolute",top:"1px",left:"3px",fontSize:"10px",color:"#94a3b8",fontWeight:"bold",opacity:"0.6"}),r.textContent=n+1,i.appendChild(r);const s=document.createElement("span");s.className="hotbar-slot-count",Object.assign(s.style,{position:"absolute",bottom:"1px",right:"3px",fontSize:"11px",color:"#fff",textShadow:"0 1px 2px #000",fontWeight:"bold",display:"none"}),i.appendChild(s),fn(i,()=>wp()[n]),e.appendChild(i)}t.appendChild(e),Hs=document.createElement("div"),Hs.id="hotbar-name",Object.assign(Hs.style,{position:"absolute",bottom:"72px",left:"50%",transform:"translateX(-50%)",color:"#fff",fontSize:"13px",fontWeight:"600",letterSpacing:"0.5px",padding:"4px 14px",borderRadius:"12px",background:"rgba(15, 23, 42, 0.75)",border:"1px solid rgba(255,255,255,0.18)",backdropFilter:"blur(4px)",pointerEvents:"none",zIndex:"20",textAlign:"center",whiteSpace:"nowrap"}),t.appendChild(Hs),au()}function Vy(){if(!Il()){for(let t=0;t<9;t++)ti(`Digit${t+1}`)&&Wp(t);ih||(ih=!0,document.addEventListener("wheel",Xy,{passive:!1})),au()}}let Ka=0;function Xy(t){if(!(!ca()||Il())&&(t.preventDefault(),Ka+=Math.sign(t.deltaY),Math.abs(Ka)>=1)){const e=Ka>0?1:-1;Ka=0;const n=(Ml+e+9)%9;Wp(n)}}function Wp(t){Ml=t,cy(t),au()}function au(){var n;if(!Lf)return;const t=wp(),e=Lf.children;for(let i=0;i<e.length;i++){const r=i===Ml,s=t[i]||{type:0,count:0},l=s.type||0,a=s.count||0;if(e[i].style.borderColor=r?"rgba(74, 222, 128, 0.95)":"rgba(0,0,0,0.55)",e[i].style.transform=r?"scale(1.14) translateY(-3px)":"scale(1)",e[i].style.boxShadow=r?"0 0 14px rgba(74, 222, 128, 0.4), 0 6px 14px rgba(0,0,0,0.6)":"none",e[i].style.zIndex=r?"2":"1",l>0){const f=Lt(l,38);f&&(e[i].style.backgroundImage=`url(${f.toDataURL()})`)}else e[i].style.backgroundImage="none";const c=e[i].querySelector(".hotbar-slot-count");c&&(a>1?(c.textContent=a,c.style.display="block"):c.style.display="none")}if(Hs){const i=((n=t[Ml])==null?void 0:n.type)||0;Hs.textContent=pr[i]||""}}let Zt=null,ei=0;function Ky(t){Zt&&t.remove(Zt),Zt=new mx(16752964,0,20,1.6),Zt.castShadow=!1,t.add(Zt)}function qy(t,e,n,i,r){if(!Zt)return;const s=i===o.TORCH,l=i===o.LAVA,a=i===o.GLOWSTONE;if(s||l||a){const c=r?r.x:n.x,f=r?r.y-.2:n.y+1.2,d=r?r.z:n.z;if(Zt.position.set(c,f,d),s){Zt.color.setHex(16752187);const u=2.4*(1+.12*Math.sin(e*16)+.08*Math.sin(e*31)+.04*(Math.random()-.5));ei=el.lerp(ei,u,t*14),Zt.distance=20}else if(l){Zt.color.setHex(16733457);const u=2*(1+.06*Math.sin(e*8));ei=el.lerp(ei,u,t*10),Zt.distance=18}else a&&(Zt.color.setHex(16771635),ei=el.lerp(ei,2.8,t*12),Zt.distance=24);Zt.intensity=ei}else ei=Math.max(0,ei-t*8),Zt.intensity=ei}let Ji=null,Yo=null,$o=null,Zo=null,Fr=null,zs=null,Ws=null,Br=null;const qa=18;function lu(t,e,n){const i=document.createElement("canvas");i.width=t,i.height=e;const r=i.getContext("2d");n(r,(f,d,p)=>{r.fillStyle=p,r.fillRect(f,d,1,1)},(f,d,p,u,h)=>{r.fillStyle=h,r.fillRect(f,d,p,u)});const a=document.createElement("canvas");a.width=qa,a.height=qa;const c=a.getContext("2d");return c.imageSmoothingEnabled=!1,c.drawImage(i,0,0,t,e,0,0,qa,qa),a}function Yy(t="empty"){const e=t==="full",n=e?"#ffffff":"#475569",i=e?"#cbd5e1":"#334155",r=e?"#64748b":"#1e293b",s=e?"#0f172a":"#090d16";return lu(9,9,(l,a,c)=>{a(1,1,i),a(2,1,i),a(6,1,i),a(7,1,i),a(1,2,n),a(7,2,i),a(3,1,"#00000000"),a(4,1,"#00000000"),a(5,1,"#00000000"),c(2,2,5,5,i),a(3,2,n),a(3,3,n),c(3,7,3,1,r),a(0,3,r),a(8,3,r),a(1,0,s),a(2,0,s),a(6,0,s),a(7,0,s),a(0,1,s),a(8,1,s),a(0,2,s),a(8,2,s),a(0,4,s),a(8,4,s),a(1,5,s),a(7,5,s),a(2,7,s),a(6,7,s),a(3,8,s),a(4,8,s),a(5,8,s)})}function $y(t="full"){const e=t==="full",n=t==="empty";return lu(9,9,(i,r,s)=>{if(s(1,0,2,1,"#0f172a"),s(5,0,2,1,"#0f172a"),r(0,1,"#0f172a"),r(3,1,"#0f172a"),r(4,1,"#0f172a"),r(7,1,"#0f172a"),r(0,2,"#0f172a"),r(0,3,"#0f172a"),r(7,2,"#0f172a"),r(7,3,"#0f172a"),r(1,4,"#0f172a"),r(6,4,"#0f172a"),r(2,5,"#0f172a"),r(5,5,"#0f172a"),r(3,6,"#0f172a"),r(4,6,"#0f172a"),r(3,7,"#0f172a"),n){s(1,1,2,3,"#1e293b"),s(5,1,2,3,"#1e293b"),s(2,4,4,1,"#1e293b"),s(3,5,2,1,"#1e293b");return}s(1,1,2,3,"#ef4444"),r(1,1,"#ffffff"),r(2,4,"#dc2626"),r(3,5,"#991b1b"),e?(s(5,1,2,3,"#ef4444"),r(4,4,"#dc2626"),r(5,4,"#dc2626"),r(4,5,"#991b1b")):(s(5,1,2,3,"#1e293b"),r(4,4,"#1e293b"),r(5,4,"#1e293b"),r(4,5,"#1e293b"))})}function Zy(t="full"){const e=t==="half",n=t==="empty";return lu(9,9,(i,r,s)=>{if(s(4,1,3,1,"#0f172a"),r(3,2,"#0f172a"),r(7,2,"#0f172a"),r(2,3,"#0f172a"),r(8,3,"#0f172a"),r(2,4,"#0f172a"),r(8,4,"#0f172a"),r(3,5,"#0f172a"),r(7,5,"#0f172a"),r(4,6,"#0f172a"),r(6,6,"#0f172a"),r(2,7,"#0f172a"),r(1,8,"#0f172a"),n){s(3,2,4,3,"#1e293b"),s(4,4,3,2,"#1e293b"),r(2,7,"#334155");return}s(3,2,4,3,"#b45309"),r(4,2,"#f59e0b"),r(5,2,"#dc2626"),r(4,3,"#f59e0b"),s(4,5,2,1,"#78350f"),r(2,7,"#f8fafc"),r(1,7,"#e2e8f0"),r(2,8,"#cbd5e1"),e&&(r(6,2,"#1e293b"),r(6,3,"#1e293b"),r(6,4,"#1e293b"))})}function jy(){const t=document.getElementById("hud");Ws=document.createElement("div"),Ws.id="damage-vignette",Ws.style.opacity="0",t.appendChild(Ws),Ji=document.createElement("div"),Ji.id="voxelcraft-pixel-hud",Ji.style.cssText=`
    position: fixed;
    bottom: 74px;
    left: 50%;
    transform: translateX(-50%);
    width: 480px;
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    pointer-events: none;
    z-index: 30;
    user-select: none;
  `;const e=document.createElement("div");e.style.cssText="width: 100%; display: flex; justify-content: space-between; align-items: flex-end; padding: 0 4px;";const n=document.createElement("div");n.style.cssText="display: flex; flex-direction: column; gap: 3px;",Yo=document.createElement("div"),Yo.style.cssText="display: flex; gap: 1px; min-height: 18px;",$o=document.createElement("div"),$o.style.cssText="display: flex; gap: 1px; min-height: 18px;",n.appendChild(Yo),n.appendChild($o),e.appendChild(n);const i=document.createElement("div");i.style.cssText="display: flex; flex-direction: column; gap: 3px; align-items: flex-end;";const r=document.createElement("div");r.style.cssText="min-height: 18px;",i.appendChild(r),Zo=document.createElement("div"),Zo.style.cssText="display: flex; gap: 1px; min-height: 18px;",i.appendChild(Zo),e.appendChild(i),Ji.appendChild(e),Fr=document.createElement("div"),Fr.id="hud-xp-level",Fr.style.cssText=`
    font-family: monospace, sans-serif;
    font-size: 14px;
    font-weight: 900;
    color: #4ade80;
    text-shadow: -1px -1px 0 #052e16, 1px -1px 0 #052e16, -1px 1px 0 #052e16, 1px 1px 0 #052e16, 0 2px 4px #000;
    margin-bottom: -6px;
    z-index: 2;
  `,Fr.textContent="1",Ji.appendChild(Fr);const s=document.createElement("div");s.id="hud-xp-bar-container",s.style.cssText=`
    width: 100%;
    height: 7px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2px 6px rgba(0,0,0,0.8);
  `,zs=document.createElement("div"),zs.id="hud-xp-bar-fill",zs.style.cssText=`
    width: 0%;
    height: 100%;
    background: linear-gradient(180deg, #86efac 0%, #22c55e 50%, #15803d 100%);
    box-shadow: 0 0 8px #22c55e;
    transition: width 0.2s ease-out;
  `,s.appendChild(zs);const l=document.createElement("div");l.style.cssText=`
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: space-between;
    pointer-events: none;
  `;for(let a=0;a<18;a++){const c=document.createElement("div");c.style.cssText="width: 1px; height: 100%; background: rgba(0,0,0,0.65);",l.appendChild(c)}s.appendChild(l),Ji.appendChild(s),t.appendChild(Ji),Br=document.createElement("div"),Br.id="death-overlay",Br.innerHTML='<div class="death-title">☠ VOCÊ MORREU</div><div class="death-hint">Pressione ESPAÇO para renascer</div>',Br.style.display="none",t.appendChild(Br)}function Qy(){if(!Ji)return;const t=Gp(),e=ou(),n=Ny(),i=Mp(),r=kM(),s=i*25;Yo.innerHTML="";const l=Math.floor(e/2),a=e%2!==0;for(let c=0;c<10;c++){let f="empty";(c<l||c===l&&a)&&(f="full"),Yo.appendChild(Yy(f))}$o.innerHTML="";for(let c=0;c<10;c++){const f=t-c*2,d=f>=2?"full":f===1?"half":"empty";$o.appendChild($y(d))}Zo.innerHTML="";for(let c=0;c<10;c++){const f=n-c*2,d=f>=2?"full":f===1?"half":"empty",p=Zy(d);Zo.appendChild(p)}if(Fr&&(Fr.textContent=i),zs){const c=Math.min(100,Math.max(0,r/s*100));zs.style.width=`${c}%`}if(Ws){let c=Py()*.75;if(t>0&&t<=6){const f=(Math.sin(performance.now()*.008)*.5+.5)*.35;c=Math.max(c,f)}Ws.style.opacity=c.toString()}Br&&(Br.style.display=t<=0?"flex":"none")}const Uo={SUNNY:"sunny",RAIN:"rain"};let Dc=Uo.SUNNY,Ic=120+Math.random()*60,Gr=null,jo=null;const Pf=800;function Jy(t){jo=new hn;const e=new Float32Array(Pf*3);for(let i=0;i<Pf*3;i+=3)e[i]=(Math.random()-.5)*40,e[i+1]=Math.random()*25,e[i+2]=(Math.random()-.5)*40;jo.setAttribute("position",new Zn(e,3));const n=new Bh({color:9684477,size:.12,transparent:!0,opacity:0});Gr=new ux(jo,n),t.add(Gr)}function eT(t,e){if(Ic-=t,Ic<=0&&(Ic=90+Math.random()*120,Dc=Dc===Uo.SUNNY?Uo.RAIN:Uo.SUNNY),Gr&&e){Gr.position.set(e.x,e.y,e.z);const i=Dc!==Uo.SUNNY?.65:0;if(Gr.material.opacity+=(i-Gr.material.opacity)*t*2,Gr.material.opacity>.01){const r=jo.attributes.position.array;for(let s=1;s<Pf*3;s+=3)r[s]-=32*t,r[s]<-5&&(r[s]=20+Math.random()*5);jo.attributes.position.needsUpdate=!0}}}const kp="voxelcraft_world_save_v03";function tT(){try{const t=vi(),e=ly(),n=Gp(),i={timestamp:Date.now(),player:{x:t.x,y:t.y,z:t.z,health:n,hotbar:e,armor:[...Gt]}};localStorage.setItem(kp,JSON.stringify(i))}catch(t){console.warn("Could not save world data:",t)}}function nT(){try{const t=localStorage.getItem(kp);if(!t)return!1;const e=JSON.parse(t);if(!e||!e.player)return!1;const n=vi();if(n&&e.player.x!==void 0&&n.set(e.player.x,e.player.y,e.player.z),e.player.armor)for(let i=0;i<4;i++)Gt[i]=e.player.armor[i]||0;return!0}catch(t){return console.warn("Could not load world data:",t),!1}}window.addEventListener("contextmenu",t=>t.preventDefault());qp(document);console.log("[VoxelCraft] Building texture atlas...");nS();const rh=Xx(),un=Kx();yS(un,qx());Jy(un);CS(un);PS(un);console.log("[VoxelCraft] Generating world biomes & 3D caves...");vS(un);const _i=tu(),Ci=Gx(window.innerWidth/window.innerHeight,_i);un.add(Ci);$x(Ci);Hx(Jh());Fx(Jh());iM(un);Lr(qe.PIG,_i.x+4,_i.y,_i.z+4);Lr(qe.SHEEP,_i.x-3,_i.y,_i.z+5);QM(un);bp();xp();ky();Ky(un);xM();yp();_y(un);Ly();jy();Ey();nT();console.log(`[VoxelCraft v0.6.0] Ready! Spawn at (${_i.x}, ${_i.y}, ${_i.z})`);let Nc=0;function iT(t,e){if(Lx()){Fd(Ci.position,un),Bd(t,un,Ci,rh);return}Px()||(By(t),Fd(Ci.position,un),Bd(t,un,Ci,rh),eT(t,vi()),qy(t,e,vi(),ru(),Ci.position),MM(t),LM(t),cM(t),US(t,e),IS(t),JM(t),Vy(),Qy(),My(t),Dx(t),zy(t,{position:Ci.position}),Nc+=t,Nc>=30&&(Nc=0,tT()))}function rT(){Yx(Ci)}Vx(iT,rT);
