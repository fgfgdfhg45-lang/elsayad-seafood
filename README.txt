خطوات تشغيل Firebase وSearch Console

1) Firebase:
 - console.firebase.google.com > Add project.
 - Build > Authentication > Sign-in method > فعّل Email/Password.
 - Build > Firestore Database > Create database (Production mode).
 - Firestore > Rules: الصق محتوى firestore.rules (وغيّر OWNER_UID) ثم Publish.
 - Project settings > Your apps > Web (</>) > انسخ الإعدادات وحطها في js/firebase-config.js.
 - Authentication > Settings > Authorized domains: ضيف دومين موقعك.
 - مهم: الموقع لازم يتفتح من استضافة (Firebase Hosting أو غيرها) مش بدبل-كليك على الملف.
 - الطلبات بتظهر في Firestore > orders.

2) Search Console:
 - في sitemap.xml وrobots.txt بدّل YOUR-DOMAIN.com بدومينك الحقيقي.
 - ارفع الموقع، ثم في Search Console أضف الدومين وأرسل https://دومينك/sitemap.xml من قسم Sitemaps.

3) التقييمات:
 - التقييمات الجديدة بتتسجل في Firestore > reviews بحالة approved=false.
 - عشان تظهر على الموقع: افتح التقييم وغيّر approved إلى true.
 - التقييمات الظاهرة حالياً في js/reviews-data.js تجريبية، استبدلها بتقييمات حقيقية.

4) تقييمات Google Maps على الموقع:
 - console.cloud.google.com: اعمل مشروع وفعّل الفوترة (فيه رصيد مجاني شهري)، وفعّل Places API (New).
 - Credentials > Create API key: قيّده HTTP referrers بدومين موقعك، وقيّده API restrictions على Places API (New) فقط.
 - جيب Place ID لمطعمك من developers.google.com/maps/documentation/places/web-service/place-id (Place ID Finder).
 - الصقهم في js/google-config.js.
 - جوجل بترجّع حتى 5 تقييمات فقط (الأكثر صلة)، ولازم تظهر مع علامة Google ولينك صاحب التقييم، وده متعمل.

5) تسجيل الدخول بجوجل:
 - Firebase Console > Authentication > Sign-in method > Google > Enable (اختار إيميل الدعم) > Save.
 - تأكد إن دومين موقعك في Authentication > Settings > Authorized domains.
