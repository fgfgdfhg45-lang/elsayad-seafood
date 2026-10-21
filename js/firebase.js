import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore,collection,addDoc,serverTimestamp,query,where,limit,getDocs} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const c=window.FIREBASE_CONFIG||{};
const on=!!c.apiKey&&!c.apiKey.startsWith('PASTE');
const SY=window.SY={enabled:on};
const keep=(u,n)=>{try{localStorage.setItem('sy_cur',JSON.stringify({name:n||u.displayName||u.email.split('@')[0],email:u.email,uid:u.uid}))}catch(e){}};
if(on){
 const app=initializeApp(c),auth=getAuth(app),db=getFirestore(app);
 SY.signup=async(e,p,n)=>{const r=await createUserWithEmailAndPassword(auth,e,p);await updateProfile(r.user,{displayName:n});keep(r.user,n)};
 SY.login=async(e,p)=>{const r=await signInWithEmailAndPassword(auth,e,p);keep(r.user)};
 SY.logout=()=>signOut(auth);
 SY.order=async o=>{const d=await addDoc(collection(db,'orders'),{...o,uid:auth.currentUser?auth.currentUser.uid:null,status:'new',createdAt:serverTimestamp()});return d.id};
 SY.addReview=async r=>{await addDoc(collection(db,'reviews'),{name:String(r.name).slice(0,40),text:String(r.text).slice(0,400),rating:Math.min(5,Math.max(1,r.rating|0)),approved:false,uid:auth.currentUser?auth.currentUser.uid:null,createdAt:serverTimestamp()})};
 SY.getReviews=async()=>{const s=await getDocs(query(collection(db,'reviews'),where('approved','==',true),limit(30)));return s.docs.map(d=>d.data()).sort((a,b)=>((b.createdAt&&b.createdAt.seconds)||0)-((a.createdAt&&a.createdAt.seconds)||0))};
 onAuthStateChanged(auth,u=>{if(u)keep(u);else{try{localStorage.removeItem('sy_cur')}catch(e){}}dispatchEvent(new Event('sy-auth'))});
}
SY.loaded=true;dispatchEvent(new Event('sy-ready'));
