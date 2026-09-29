NUNNA'S PICKLES - WEBSITE GUIDE
================================
FOLDER: NUNNAS-PICKLES/ index.html, style.css, script.js, images/, README.txt, IMAGE-CREDITS.md

IMAGES (exact names, inside images/)
 avakaya.jpg = Avakaya (Andhra mango pickle)   lemon-pickle.jpg = Lemon Pickle
 red-chilli-pickle.jpg = Red Chilli Pickle     tomato-pickle.jpg = Tomato Pickle
 prawns-pickle.jpg = Prawns Pickle             pickle-background.jpg = hero background (pickle jars)
Until a photo exists, the card shows a maroon box with the product name. No wrong image is ever shown.
Best: photograph your own jars (daylight, plain background). Otherwise use free-for-commercial-use sites
(Pexels, Unsplash, Pixabay), check each licence, inspect that the photo truly matches the name, and list it in IMAGE-CREDITS.md.
Keep each image under about 300 KB (squoosh.app can shrink them).

RUN ON YOUR COMPUTER (VS Code)
 1 Install VS Code (code.visualstudio.com).   2 Make a folder NUNNAS-PICKLES.
 3 Put index.html, style.css, script.js in it. 4 Make a folder "images" and add the 6 photos.
 5 VS Code > File > Open Folder > NUNNAS-PICKLES.
 6 Extensions icon (left bar) > search "Live Server" (Ritwick Dey) > Install.
 7 Right-click index.html > "Open with Live Server". 8 The site opens in your browser and refreshes when you save.
 (Double-clicking index.html also works.)
TEST: add 2 pickles, change quantity, remove one, leave name empty (error should show), then send. WhatsApp opens with the order.
Try phone widths using browser DevTools (F12 > phone icon): 320, 375, 425, 768, 1024, 1440.

CHANGE PRICES/TEXT: prices and descriptions are at the top of script.js (PRODUCTS list). Number is WHATSAPP_NUMBER.

FREE HOSTING (GitHub Pages) - free, URL looks like yourname.github.io/repo
 1 Sign up at github.com.  2 New repository, name e.g. nunnas-pickles, Public.
 3 "uploading an existing file": drag index.html, style.css, script.js and the images folder, Commit.
 4 Settings > Pages > Source: "Deploy from a branch", branch main, folder / (root), Save.
 5 Wait 1-2 minutes; the URL appears on that page. Open it and test ordering.
 Cloudflare Pages alternative: dash.cloudflare.com > Workers & Pages > Create > Pages > Upload assets > drag the folder > Deploy.
 A free URL is fine for testing and early sharing. A custom domain looks better for customers.

CUSTOM DOMAIN - PAID (about Rs 500-1,500/year for .in/.com; not free)
 I have NOT checked whether nunnaspickles.in / .com / .co.in are available. Search them on a registrar
 (GoDaddy, Namecheap, BigRock, Cloudflare Registrar).
 GitHub Pages: Settings > Pages > Custom domain: www.nunnaspickles.in > Save; at the registrar add a CNAME record
 www -> YOURUSERNAME.github.io ; tick "Enforce HTTPS" when it appears (can take up to 24 hours).
 Cloudflare Pages: project > Custom domains > Set up; follow the DNS prompts.
 Then change og:image in index.html to https://www.nunnaspickles.in/images/pickle-background.jpg

REPLACING IMAGES: overwrite the file in images/ with the same name (keep .jpg), refresh the browser.

PAYMENT: none built in. You confirm payment and delivery charges on WhatsApp. A gateway (Razorpay etc.) can later be added inside sendOrder() in script.js.

PRE-LAUNCH CHECKLIST
 [ ] 6 real, matching photos + IMAGE-CREDITS.md   [ ] Prices confirmed   [ ] Test order on Android and iPhone
 [ ] Phone/WhatsApp/email correct                  [ ] HTTPS working     [ ] og:image URL updated
 [ ] Replace the [Add ...] placeholders in index.html (address, FSSAI, Privacy, Terms, Refund) or remove them.
     FSSAI registration is generally required for selling food in India; confirm what applies to you.
 [ ] Shipping areas, delivery charges, shelf life and storage details (add only when you know them)

YOU STILL NEED TO PROVIDE: photos, business address (optional), FSSAI number, policies, domain purchase, GitHub account.
