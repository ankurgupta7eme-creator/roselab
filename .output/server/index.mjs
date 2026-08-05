globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/about.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"94f5-ujtUbrLGTNpi8mvjzAtDx+oBPsc\"",
		"mtime": "2026-08-04T08:17:58.225Z",
		"size": 38133,
		"path": "../public/about.html"
	},
	"/b2b.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"6638-0ftgEjvNlDCVCLYThif9+qX5s2k\"",
		"mtime": "2026-08-04T08:17:58.289Z",
		"size": 26168,
		"path": "../public/b2b.html"
	},
	"/careers.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"4b85-MQRnsun72ZKe7k9bZQ6ZM4dM7AA\"",
		"mtime": "2026-08-04T08:17:58.390Z",
		"size": 19333,
		"path": "../public/careers.html"
	},
	"/account.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"55ee-sdVdOVy4dxcOFF+S0Oy1DWfZaJg\"",
		"mtime": "2026-08-04T08:17:58.336Z",
		"size": 21998,
		"path": "../public/account.html"
	},
	"/admin.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"6752-aK6JSGV2eOdgSSYCJUAjNYnPzck\"",
		"mtime": "2026-08-04T08:17:58.210Z",
		"size": 26450,
		"path": "../public/admin.html"
	},
	"/apple-touch-icon.png": {
		"type": "image/png",
		"etag": "\"8a6d-hKlL6oaSNqYBJVSXfppj511MPg8\"",
		"mtime": "2026-08-04T08:17:58.336Z",
		"size": 35437,
		"path": "../public/apple-touch-icon.png"
	},
	"/cart.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"34ae-rawmXf7FN3RM3A/Q/oOzOwlNkIg\"",
		"mtime": "2026-08-04T08:17:58.198Z",
		"size": 13486,
		"path": "../public/cart.html"
	},
	"/checkout.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"67cb-YE1qTZE4vFXlZko0ZDFmiTd5FSA\"",
		"mtime": "2026-08-04T08:17:58.322Z",
		"size": 26571,
		"path": "../public/checkout.html"
	},
	"/certifications.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"4133-vWHJFXg/qOvETARHq3aguTkSyHk\"",
		"mtime": "2026-08-04T08:17:58.314Z",
		"size": 16691,
		"path": "../public/certifications.html"
	},
	"/home.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"7fb9-u0upoYG2/zg6+LcF0Zm8nRLcTbI\"",
		"mtime": "2026-08-04T08:17:58.182Z",
		"size": 32697,
		"path": "../public/home.html"
	},
	"/login.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"2c11-SU5u7sRPx7phlJnJFB1heWZoBMM\"",
		"mtime": "2026-08-04T08:17:58.273Z",
		"size": 11281,
		"path": "../public/login.html"
	},
	"/contact.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"5b16-OsgJOgpFS1+WYxdNYNJk7nwjn8Q\"",
		"mtime": "2026-08-04T08:17:58.241Z",
		"size": 23318,
		"path": "../public/contact.html"
	},
	"/products.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"4855-ivnds9jPwdnuSS910RNCwxfOBWw\"",
		"mtime": "2026-08-04T08:17:58.388Z",
		"size": 18517,
		"path": "../public/products.html"
	},
	"/register.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"2fdd-A821HcD/YY1HD0eJCD/Qu6P2u2Y\"",
		"mtime": "2026-08-04T08:17:58.352Z",
		"size": 12253,
		"path": "../public/register.html"
	},
	"/privacy-policy.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"4162-/nFiyax87K940NNPVcGDCPNzXvo\"",
		"mtime": "2026-08-04T08:17:58.380Z",
		"size": 16738,
		"path": "../public/privacy-policy.html"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"26efc-/ByOc/cJZpSdEDQFfNSPddz5clE\"",
		"mtime": "2026-08-04T08:17:58.271Z",
		"size": 159484,
		"path": "../public/favicon.ico"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"4b6-F/jZqgLwnbjq+xY0/BUimetTWx4\"",
		"mtime": "2026-08-04T08:17:58.289Z",
		"size": 1206,
		"path": "../public/sitemap.xml"
	},
	"/resources.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"63f8-8oOOcrusJRqy+KiicutpsV6ZPqM\"",
		"mtime": "2026-08-04T08:17:58.259Z",
		"size": 25592,
		"path": "../public/resources.html"
	},
	"/assets/account-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-08-04T17:42:18.075Z",
		"size": 38,
		"path": "../public/assets/account-DJ7LAi8J.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a1-O53jr0AlbP5HTpKrDXq1LnK7xRs\"",
		"mtime": "2026-08-04T08:17:58.352Z",
		"size": 161,
		"path": "../public/robots.txt"
	},
	"/assets/login-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-08-04T17:42:18.075Z",
		"size": 38,
		"path": "../public/assets/login-DJ7LAi8J.js"
	},
	"/terms-conditions.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"3f9a-JBUVtjeJDl+jR7/ACNxOKi+D9Bw\"",
		"mtime": "2026-08-04T08:17:58.213Z",
		"size": 16282,
		"path": "../public/terms-conditions.html"
	},
	"/assets/logo-transparent.png": {
		"type": "image/png",
		"etag": "\"3fc32-qOwh2e2O7gGIeVnbY/sRGB5Zn/I\"",
		"mtime": "2026-08-04T08:17:58.421Z",
		"size": 261170,
		"path": "../public/assets/logo-transparent.png"
	},
	"/assets/index-CpYZDhLV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"86311-JDKPmEcQREYKM2xRYz6cdECnoa0\"",
		"mtime": "2026-08-04T17:42:18.075Z",
		"size": 549649,
		"path": "../public/assets/index-CpYZDhLV.js"
	},
	"/assets/bot-logo-transparent.png": {
		"type": "image/png",
		"etag": "\"e1b54-l3HIWlEkDudItA/lblfiTFCOCKo\"",
		"mtime": "2026-08-04T08:17:58.452Z",
		"size": 924500,
		"path": "../public/assets/bot-logo-transparent.png"
	},
	"/assets/routes-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-08-04T17:42:18.081Z",
		"size": 38,
		"path": "../public/assets/routes-DJ7LAi8J.js"
	},
	"/assets/register-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-08-04T17:42:18.075Z",
		"size": 38,
		"path": "../public/assets/register-DJ7LAi8J.js"
	},
	"/css/extra.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"ab99-V3GggvOB6UMAqSNesHVkSOjm1mQ\"",
		"mtime": "2026-08-04T08:17:59.708Z",
		"size": 43929,
		"path": "../public/css/extra.css"
	},
	"/assets/styles-kv7HdEMh.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"11573-Poyb3crlOPOdMgrBCpXg12jGUnA\"",
		"mtime": "2026-08-04T17:42:18.081Z",
		"size": 71027,
		"path": "../public/assets/styles-kv7HdEMh.css"
	},
	"/js/auth.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f1e-PO/BX//DmAN/xWzmihH67MgTBpk\"",
		"mtime": "2026-08-04T08:17:59.816Z",
		"size": 7966,
		"path": "../public/js/auth.js"
	},
	"/js/careers-chat-embed.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19dd-MPnDZATWRGU3QaLfhfxtadDNX4Y\"",
		"mtime": "2026-08-04T08:17:59.731Z",
		"size": 6621,
		"path": "../public/js/careers-chat-embed.js"
	},
	"/js/certifications-loader.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1813-sxXY5MSnRcvscc/fcA6l0iSd2V8\"",
		"mtime": "2026-08-04T08:17:59.779Z",
		"size": 6163,
		"path": "../public/js/certifications-loader.js"
	},
	"/js/careers-chat-config.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59a-DeM+nzjdGWi8Ikwtx0HJJrJFhmc\"",
		"mtime": "2026-08-04T08:17:59.737Z",
		"size": 1434,
		"path": "../public/js/careers-chat-config.js"
	},
	"/css/style.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"8057-xaDyUK+nTEKs4sBWGs+GgOoEujM\"",
		"mtime": "2026-08-04T08:17:59.695Z",
		"size": 32855,
		"path": "../public/css/style.css"
	},
	"/js/cart.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d0-IoAddWGU59q/KEneWYrN44UwNyw\"",
		"mtime": "2026-08-04T08:17:59.827Z",
		"size": 2512,
		"path": "../public/js/cart.js"
	},
	"/js/chat-widget.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c42-nssCioxFE08p5j1IyFCQihYF+/E\"",
		"mtime": "2026-08-04T08:17:59.763Z",
		"size": 7234,
		"path": "../public/js/chat-widget.js"
	},
	"/assets/zed-certificate.jpg": {
		"type": "image/jpeg",
		"etag": "\"2387b-0+/zgTs4HoD+SJslNHwbqDha4V8\"",
		"mtime": "2026-08-04T08:17:58.432Z",
		"size": 145531,
		"path": "../public/assets/zed-certificate.jpg"
	},
	"/js/products-api.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"849-7X552ZER3idv85V5NK2iOtf1BHA\"",
		"mtime": "2026-08-04T08:17:59.805Z",
		"size": 2121,
		"path": "../public/js/products-api.js"
	},
	"/js/hero-showreel.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"697-MflhTP+FDKxm00HMavKg+GPgJAg\"",
		"mtime": "2026-08-04T08:17:59.749Z",
		"size": 1687,
		"path": "../public/js/hero-showreel.js"
	},
	"/js/main.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c02-Dg/P99+Rgt+xsJF6Duc10tf0RPo\"",
		"mtime": "2026-08-04T08:17:59.842Z",
		"size": 3074,
		"path": "../public/js/main.js"
	},
	"/js/site-extras.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9d-TtsEK5x4mk1AEiFJ8xpaTJoNnig\"",
		"mtime": "2026-08-04T08:17:59.799Z",
		"size": 3997,
		"path": "../public/js/site-extras.js"
	},
	"/js/products-app.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3acc-sy9KGU2fVdwhW2w3c0+BjwS8yMg\"",
		"mtime": "2026-08-04T08:17:59.789Z",
		"size": 15052,
		"path": "../public/js/products-app.js"
	},
	"/js/chat-config.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"510-bvNJRLA27NmKYFaZGvTvq9PPDug\"",
		"mtime": "2026-08-04T08:17:59.860Z",
		"size": 1296,
		"path": "../public/js/chat-config.js"
	},
	"/js/products-data.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9400-5GZJKpFnFk3maEzIp0mHuDQ+H/c\"",
		"mtime": "2026-08-04T08:17:59.722Z",
		"size": 37888,
		"path": "../public/js/products-data.js"
	},
	"/js/trust-platform.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f6-BZKzmk+O0Hi1iYVJ+BVDFxY1/4U\"",
		"mtime": "2026-08-04T08:17:59.749Z",
		"size": 5110,
		"path": "../public/js/trust-platform.js"
	},
	"/js/ui-enhancements.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109c-2bJXD84lDufCkDzG1F2sHxpzrKI\"",
		"mtime": "2026-08-04T08:17:59.827Z",
		"size": 4252,
		"path": "../public/js/ui-enhancements.js"
	},
	"/assets/documents/rose-laboratories-b2b-oem-capability-brochure.pdf": {
		"type": "application/pdf",
		"etag": "\"5471a-2FP16i1NcNGHCvH5QdJqDwwHpdY\"",
		"mtime": "2026-08-04T08:17:59.489Z",
		"size": 345882,
		"path": "../public/assets/documents/rose-laboratories-b2b-oem-capability-brochure.pdf"
	},
	"/assets/catalogues/rose-laboratories-full-catalogue.pdf": {
		"type": "application/pdf",
		"etag": "\"99c10-4sctlrZ0uAj3yqMBeB+LiaEkm10\"",
		"mtime": "2026-08-04T08:17:58.733Z",
		"size": 629776,
		"path": "../public/assets/catalogues/rose-laboratories-full-catalogue.pdf"
	},
	"/assets/catalogues/rose-laboratories-private-label-catalogue.pdf": {
		"type": "application/pdf",
		"etag": "\"97e57-S5pFCYBFfsydMs9GcHTukPf7NVg\"",
		"mtime": "2026-08-04T08:17:58.758Z",
		"size": 622167,
		"path": "../public/assets/catalogues/rose-laboratories-private-label-catalogue.pdf"
	},
	"/assets/documents/rose-laboratories-traditional-formulations-brochure.pdf": {
		"type": "application/pdf",
		"etag": "\"5666a-PORK9YYUKw2CNLZhP57v1hVzAho\"",
		"mtime": "2026-08-04T08:17:59.545Z",
		"size": 353898,
		"path": "../public/assets/documents/rose-laboratories-traditional-formulations-brochure.pdf"
	},
	"/assets/products/betsolin-capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"b7fa-JgS9h4hEHA7oYOd3JvmHXicgrLc\"",
		"mtime": "2026-08-04T08:17:58.875Z",
		"size": 47098,
		"path": "../public/assets/products/betsolin-capsule.jpg"
	},
	"/assets/documents/rose-laboratories-company-profile.pdf": {
		"type": "application/pdf",
		"etag": "\"547b7-7IzOveNw9a8MAkRTk0ejpLYkYus\"",
		"mtime": "2026-08-04T08:17:59.557Z",
		"size": 346039,
		"path": "../public/assets/documents/rose-laboratories-company-profile.pdf"
	},
	"/assets/products/forest-rose-baby-massage-oil.jpg": {
		"type": "image/jpeg",
		"etag": "\"8321-ZpL7wDBiu8dYA7GgdU2aaGez+3c\"",
		"mtime": "2026-08-04T08:17:58.954Z",
		"size": 33569,
		"path": "../public/assets/products/forest-rose-baby-massage-oil.jpg"
	},
	"/assets/documents/rose-laboratories-manufacturing-fact-sheet.pdf": {
		"type": "application/pdf",
		"etag": "\"54581-qFTm0USpZ72wzzDhX96M6by8VIU\"",
		"mtime": "2026-08-04T08:17:59.525Z",
		"size": 345473,
		"path": "../public/assets/documents/rose-laboratories-manufacturing-fact-sheet.pdf"
	},
	"/assets/documents/rose-laboratories-proprietary-therapeutics-brochure.pdf": {
		"type": "application/pdf",
		"etag": "\"57268-wxGaIoagR57JWYTya3uxJBaoLZE\"",
		"mtime": "2026-08-04T08:17:59.504Z",
		"size": 356968,
		"path": "../public/assets/documents/rose-laboratories-proprietary-therapeutics-brochure.pdf"
	},
	"/assets/products/haven-body-massage-oil.jpg": {
		"type": "image/jpeg",
		"etag": "\"d156-4ZS2NENrIFty7GeQsvqf0kM11mM\"",
		"mtime": "2026-08-04T08:17:59.099Z",
		"size": 53590,
		"path": "../public/assets/products/haven-body-massage-oil.jpg"
	},
	"/assets/products/livrose-drops.jpg": {
		"type": "image/jpeg",
		"etag": "\"ab74-1JJHCXhADtFU1lXRnUTF034fSPE\"",
		"mtime": "2026-08-04T08:17:59.054Z",
		"size": 43892,
		"path": "../public/assets/products/livrose-drops.jpg"
	},
	"/assets/products/haven-hair-lotion.jpg": {
		"type": "image/jpeg",
		"etag": "\"ad9d-V3duiIRCvXwOemgVOm3HsEb0ERo\"",
		"mtime": "2026-08-04T08:17:59.002Z",
		"size": 44445,
		"path": "../public/assets/products/haven-hair-lotion.jpg"
	},
	"/assets/products/kshar-sutra.jpg": {
		"type": "image/jpeg",
		"etag": "\"9e1c-ATbPXzGlr4upB6AtLrY3KlfiIgM\"",
		"mtime": "2026-08-04T08:17:59.046Z",
		"size": 40476,
		"path": "../public/assets/products/kshar-sutra.jpg"
	},
	"/assets/products/pd-0-90-drops.jpg": {
		"type": "image/jpeg",
		"etag": "\"b898-OFckUeREHD+cmjSFxlC65Uw5VAw\"",
		"mtime": "2026-08-04T08:17:58.888Z",
		"size": 47256,
		"path": "../public/assets/products/pd-0-90-drops.jpg"
	},
	"/assets/products/pidana-oil.jpg": {
		"type": "image/jpeg",
		"etag": "\"a5fa-wecQe+bMKHJ7VqxSuJW35PRC9Sk\"",
		"mtime": "2026-08-04T08:17:58.940Z",
		"size": 42490,
		"path": "../public/assets/products/pidana-oil.jpg"
	},
	"/assets/products/kesh-hari-oil.jpg": {
		"type": "image/jpeg",
		"etag": "\"24031-u82WnUC2Zi48xwvVpw0uYn9TVTw\"",
		"mtime": "2026-08-04T08:17:59.024Z",
		"size": 147505,
		"path": "../public/assets/products/kesh-hari-oil.jpg"
	},
	"/assets/products/rose-gynosol-capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4da-9x1tj0ICwCuYo0u5VadnOjBAL2U\"",
		"mtime": "2026-08-04T08:17:58.950Z",
		"size": 50394,
		"path": "../public/assets/products/rose-gynosol-capsule.jpg"
	},
	"/assets/products/livrose-syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"24964-75evERiXGf6I3BWVRqRO+wuELuM\"",
		"mtime": "2026-08-04T08:17:59.034Z",
		"size": 149860,
		"path": "../public/assets/products/livrose-syrup.jpg"
	},
	"/assets/products/rahat-cough-syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"22e67-ab2xgR+9o2S/GQPrLJoXiO6+H5s\"",
		"mtime": "2026-08-04T08:17:58.827Z",
		"size": 142951,
		"path": "../public/assets/products/rahat-cough-syrup.jpg"
	},
	"/assets/products/livrose-capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"12c3c-ndLnPizmGc3U9RRUWqcVw/L2AxA\"",
		"mtime": "2026-08-04T08:17:58.990Z",
		"size": 76860,
		"path": "../public/assets/products/livrose-capsule.jpg"
	},
	"/assets/documents/rose-laboratories-brand-logo-pack.zip": {
		"type": "application/zip",
		"etag": "\"120b5b-mtg1EgzUWQNsWmSImDgcOq3vTdw\"",
		"mtime": "2026-08-04T08:17:59.461Z",
		"size": 1182555,
		"path": "../public/assets/documents/rose-laboratories-brand-logo-pack.zip"
	},
	"/assets/products/rositone-s-capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"d024-FCl20ttp3tRDyLbzhRSizuv6RTU\"",
		"mtime": "2026-08-04T08:17:59.089Z",
		"size": 53284,
		"path": "../public/assets/products/rositone-s-capsule.jpg"
	},
	"/assets/products/rose-gynosol-syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"fc28-wQjlHlkDSkDi8M7iLXckpYU8vac\"",
		"mtime": "2026-08-04T08:17:58.843Z",
		"size": 64552,
		"path": "../public/assets/products/rose-gynosol-syrup.jpg"
	},
	"/assets/products/rositone-s-syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"13c03-cTeUz/9Gg6Hxn+NyZD9PqUJ4Gxo\"",
		"mtime": "2026-08-04T08:17:58.923Z",
		"size": 80899,
		"path": "../public/assets/products/rositone-s-syrup.jpg"
	},
	"/assets/products/rubina-capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"b5d7-Fmxrm8o19oEpY9rr0TdjhawNMuo\"",
		"mtime": "2026-08-04T08:17:58.859Z",
		"size": 46551,
		"path": "../public/assets/products/rubina-capsule.jpg"
	},
	"/assets/products/rubina-syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"23e18-uG277RVaNZtzDeDmK4T1e3BehAY\"",
		"mtime": "2026-08-04T08:17:59.071Z",
		"size": 146968,
		"path": "../public/assets/products/rubina-syrup.jpg"
	},
	"/assets/products/strength-fort-capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"870a-22P/MzSIGqs0K6Lgq/aZOn4qM1w\"",
		"mtime": "2026-08-04T08:17:58.972Z",
		"size": 34570,
		"path": "../public/assets/products/strength-fort-capsule.jpg"
	},
	"/assets/products/zymol-syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"248d3-bYhNMazJuJ+YhxaKW6PWqjHLGcs\"",
		"mtime": "2026-08-04T08:17:58.907Z",
		"size": 149715,
		"path": "../public/assets/products/zymol-syrup.jpg"
	},
	"/assets/people/alok-gupta.jpg": {
		"type": "image/jpeg",
		"etag": "\"c4ad-1XK8C4uk4kvcQXf+TctTpKyUJWw\"",
		"mtime": "2026-08-04T08:17:59.609Z",
		"size": 50349,
		"path": "../public/assets/people/alok-gupta.jpg"
	},
	"/assets/people/founders-ramesh-usha-gupta.jpg": {
		"type": "image/jpeg",
		"etag": "\"24d8f-xU+D2GkOKBDWWhWFYCP8d4H9F+o\"",
		"mtime": "2026-08-04T08:17:59.573Z",
		"size": 150927,
		"path": "../public/assets/people/founders-ramesh-usha-gupta.jpg"
	},
	"/assets/people/ishita-gupta.jpg": {
		"type": "image/jpeg",
		"etag": "\"5a74-ITSiSDaFxJZe7tbCLXNuBcNu5bY\"",
		"mtime": "2026-08-04T08:17:59.589Z",
		"size": 23156,
		"path": "../public/assets/people/ishita-gupta.jpg"
	},
	"/assets/home/guide-classical.jpg": {
		"type": "image/jpeg",
		"etag": "\"20da9-gBxgZ/JpNFJ7O8k6uF5p8+9NiJw\"",
		"mtime": "2026-08-04T08:17:58.782Z",
		"size": 134569,
		"path": "../public/assets/home/guide-classical.jpg"
	},
	"/assets/home/guide-heritage.jpg": {
		"type": "image/jpeg",
		"etag": "\"25ac9-KBcr0NUMV1h7BxBo6TlwyrSTPFw\"",
		"mtime": "2026-08-04T08:17:58.807Z",
		"size": 154313,
		"path": "../public/assets/home/guide-heritage.jpg"
	},
	"/assets/home/guide-science.jpg": {
		"type": "image/jpeg",
		"etag": "\"167d6-fQPiOSlYt4eq9Rz0LODPBjVqWEA\"",
		"mtime": "2026-08-04T08:17:58.795Z",
		"size": 92118,
		"path": "../public/assets/home/guide-science.jpg"
	},
	"/assets/values/classical-fidelity.jpg": {
		"type": "image/jpeg",
		"etag": "\"c57a-Ocyvyd0WiUAH/BAFPiSH75k4Lgk\"",
		"mtime": "2026-08-04T08:17:58.686Z",
		"size": 50554,
		"path": "../public/assets/values/classical-fidelity.jpg"
	},
	"/assets/values/partner-commitment.jpg": {
		"type": "image/jpeg",
		"etag": "\"a14c-COrqi48mAt1K4UhS2ryzrFkp9a8\"",
		"mtime": "2026-08-04T08:17:58.668Z",
		"size": 41292,
		"path": "../public/assets/values/partner-commitment.jpg"
	},
	"/assets/values/four-decades.jpg": {
		"type": "image/jpeg",
		"etag": "\"a109-OV8ZKP2RPQaa8bjZrMyQEjL9Jw0\"",
		"mtime": "2026-08-04T08:17:58.704Z",
		"size": 41225,
		"path": "../public/assets/values/four-decades.jpg"
	},
	"/assets/values/research-integrity.jpg": {
		"type": "image/jpeg",
		"etag": "\"b50b-DsQWdWgYndm9eqDfueHkYwb/8pc\"",
		"mtime": "2026-08-04T08:17:58.677Z",
		"size": 46347,
		"path": "../public/assets/values/research-integrity.jpg"
	},
	"/assets/values/responsible-growth.jpg": {
		"type": "image/jpeg",
		"etag": "\"b824-LQvjNAFSCMz9aiYrHFrEqNCJvSA\"",
		"mtime": "2026-08-04T08:17:58.638Z",
		"size": 47140,
		"path": "../public/assets/values/responsible-growth.jpg"
	},
	"/assets/values/disciplined-quality.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae54-A9Bm0L4zvY+5DLjG4OkVPtT51dA\"",
		"mtime": "2026-08-04T08:17:58.658Z",
		"size": 44628,
		"path": "../public/assets/values/disciplined-quality.jpg"
	},
	"/assets/videos/poster-showreel.jpg": {
		"type": "image/jpeg",
		"etag": "\"843d-1Jfcq6CsJwJZ2Wu3OkNEN2bVgFM\"",
		"mtime": "2026-08-04T08:17:58.471Z",
		"size": 33853,
		"path": "../public/assets/videos/poster-showreel.jpg"
	},
	"/assets/js/account.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
		"mtime": "2026-08-04T08:17:59.405Z",
		"size": 0,
		"path": "../public/assets/js/account.js"
	},
	"/assets/js/register.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"211-34d6x642OrJvjGnImWRD2++f6LY\"",
		"mtime": "2026-08-04T08:17:59.398Z",
		"size": 529,
		"path": "../public/assets/js/register.js"
	},
	"/assets/js/login.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e4-wgnR5qM9gRSOkEOUgnxR9uiIt3A\"",
		"mtime": "2026-08-04T08:17:59.424Z",
		"size": 484,
		"path": "../public/assets/js/login.js"
	},
	"/assets/videos/forest-rose-baby-massage-oil.mp4": {
		"type": "video/mp4",
		"etag": "\"a6ab5-vbV0YomKyUlSYr7I7xib2hrquc4\"",
		"mtime": "2026-08-04T08:17:58.598Z",
		"size": 682677,
		"path": "../public/assets/videos/forest-rose-baby-massage-oil.mp4"
	},
	"/uploads/certificates/iso-9001-2015-certificate.pdf": {
		"type": "application/pdf",
		"etag": "\"ccf57-gYD9+xHWzmQ6gKEC5O3BNyQ92kk\"",
		"mtime": "2026-08-04T08:17:59.648Z",
		"size": 839511,
		"path": "../public/uploads/certificates/iso-9001-2015-certificate.pdf"
	},
	"/assets/products/placeholder/avaleha.jpg": {
		"type": "image/jpeg",
		"etag": "\"18fb3-Hb+ZU+3AhzP13wfXOs/WZHGA0vk\"",
		"mtime": "2026-08-04T08:17:59.192Z",
		"size": 102323,
		"path": "../public/assets/products/placeholder/avaleha.jpg"
	},
	"/uploads/certificates/who-gmp-certificate.pdf": {
		"type": "application/pdf",
		"etag": "\"134f22-YuyADuuOjSe+ow9o4T/Im9r8x1c\"",
		"mtime": "2026-08-04T08:17:59.670Z",
		"size": 1265442,
		"path": "../public/uploads/certificates/who-gmp-certificate.pdf"
	},
	"/assets/videos/haven-massage-oil.mp4": {
		"type": "video/mp4",
		"etag": "\"15dd22-PPBAukDE4oHYuG6aPOhjVhVdJqc\"",
		"mtime": "2026-08-04T08:17:58.626Z",
		"size": 1432866,
		"path": "../public/assets/videos/haven-massage-oil.mp4"
	},
	"/assets/products/placeholder/bhasma.jpg": {
		"type": "image/jpeg",
		"etag": "\"1c74f-ixg1jr/5dro/ZT9A5bG1dKnOSuo\"",
		"mtime": "2026-08-04T08:17:59.192Z",
		"size": 116559,
		"path": "../public/assets/products/placeholder/bhasma.jpg"
	},
	"/assets/products/placeholder/capsule.jpg": {
		"type": "image/jpeg",
		"etag": "\"101d6-7ur46eG9DZnoHNupUkL1IDUU0lk\"",
		"mtime": "2026-08-04T08:17:59.177Z",
		"size": 66006,
		"path": "../public/assets/products/placeholder/capsule.jpg"
	},
	"/assets/products/placeholder/drops.jpg": {
		"type": "image/jpeg",
		"etag": "\"f86e-8WPGxdSmC5iIVctWuL4SvIBzxnI\"",
		"mtime": "2026-08-04T08:17:59.171Z",
		"size": 63598,
		"path": "../public/assets/products/placeholder/drops.jpg"
	},
	"/assets/products/placeholder/ointment.jpg": {
		"type": "image/jpeg",
		"etag": "\"11ada-iqzG0w5w7TixRJX+kEcp+qfz6Gs\"",
		"mtime": "2026-08-04T08:17:59.215Z",
		"size": 72410,
		"path": "../public/assets/products/placeholder/ointment.jpg"
	},
	"/assets/products/placeholder/syrup.jpg": {
		"type": "image/jpeg",
		"etag": "\"ef43-QLGgd6G+3SEtC704+nLC01kAuXQ\"",
		"mtime": "2026-08-04T08:17:59.117Z",
		"size": 61251,
		"path": "../public/assets/products/placeholder/syrup.jpg"
	},
	"/assets/products/placeholder/chawan.jpg": {
		"type": "image/jpeg",
		"etag": "\"180b9-4VnJa1mTYQwT7LZ7ZJBQdqfkXYE\"",
		"mtime": "2026-08-04T08:17:59.256Z",
		"size": 98489,
		"path": "../public/assets/products/placeholder/chawan.jpg"
	},
	"/assets/products/placeholder/tablet.jpg": {
		"type": "image/jpeg",
		"etag": "\"168d1-k50pXBAf4SP72RQwXP2cSXubMCE\"",
		"mtime": "2026-08-04T08:17:59.129Z",
		"size": 92369,
		"path": "../public/assets/products/placeholder/tablet.jpg"
	},
	"/assets/products/placeholder/tonic.jpg": {
		"type": "image/jpeg",
		"etag": "\"11a04-Ar+3JJyujgwrY4WpbIUPBclX8hE\"",
		"mtime": "2026-08-04T08:17:59.145Z",
		"size": 72196,
		"path": "../public/assets/products/placeholder/tonic.jpg"
	},
	"/assets/products/placeholder/thread.jpg": {
		"type": "image/jpeg",
		"etag": "\"39f41-rsT20quR1g1eN9pax4TpeSkXJv4\"",
		"mtime": "2026-08-04T08:17:59.145Z",
		"size": 237377,
		"path": "../public/assets/products/placeholder/thread.jpg"
	},
	"/assets/products/placeholder/churna.jpg": {
		"type": "image/jpeg",
		"etag": "\"1af89-InrZbt0J4HJrPwtc/42L7riqYpk\"",
		"mtime": "2026-08-04T08:17:59.240Z",
		"size": 110473,
		"path": "../public/assets/products/placeholder/churna.jpg"
	},
	"/assets/products/placeholder/oil.jpg": {
		"type": "image/jpeg",
		"etag": "\"f615-7Ax53RuiRx+iHVumRro2TaAGta4\"",
		"mtime": "2026-08-04T08:17:59.272Z",
		"size": 62997,
		"path": "../public/assets/products/placeholder/oil.jpg"
	},
	"/assets/products/placeholder/New folder/churna.jpg": {
		"type": "image/jpeg",
		"etag": "\"138e6-mqBfAtD34KDiElxslrxQxmLYRGA\"",
		"mtime": "2026-08-04T08:17:59.363Z",
		"size": 80102,
		"path": "../public/assets/products/placeholder/New folder/churna.jpg"
	},
	"/assets/products/placeholder/New folder/tablet.jpg": {
		"type": "image/jpeg",
		"etag": "\"12eb8-SF0MBbMbksJDvRLXQn4SSeMkqnw\"",
		"mtime": "2026-08-04T08:17:59.330Z",
		"size": 77496,
		"path": "../public/assets/products/placeholder/New folder/tablet.jpg"
	},
	"/assets/products/placeholder/New folder/drops.jpg": {
		"type": "image/jpeg",
		"etag": "\"f42e-Uyn4sVrzsYS11ncpwlRO2Je8xx8\"",
		"mtime": "2026-08-04T08:17:59.353Z",
		"size": 62510,
		"path": "../public/assets/products/placeholder/New folder/drops.jpg"
	},
	"/assets/products/placeholder/New folder/tonic.jpg": {
		"type": "image/jpeg",
		"etag": "\"f2a7-XkfcSRwSgDznSI5sstPY979D/Yw\"",
		"mtime": "2026-08-04T08:17:59.343Z",
		"size": 62119,
		"path": "../public/assets/products/placeholder/New folder/tonic.jpg"
	},
	"/assets/videos/haven-hair-lotion.mp4": {
		"type": "video/mp4",
		"etag": "\"2793c6-zsbj2KsD5TNO3vSGyCKjmAxPVnc\"",
		"mtime": "2026-08-04T08:17:58.514Z",
		"size": 2593734,
		"path": "../public/assets/videos/haven-hair-lotion.mp4"
	},
	"/assets/products/placeholder/New folder/chawan.png": {
		"type": "image/png",
		"etag": "\"dc6b8-S12Nmu/kR5t4U69LiieR5iOnGZE\"",
		"mtime": "2026-08-04T08:17:59.319Z",
		"size": 902840,
		"path": "../public/assets/products/placeholder/New folder/chawan.png"
	},
	"/assets/products/placeholder/New folder/avaleha.png": {
		"type": "image/png",
		"etag": "\"e3dc2-/liEf73zH/9WbLM7LYGOWIR5K2M\"",
		"mtime": "2026-08-04T08:17:59.382Z",
		"size": 933314,
		"path": "../public/assets/products/placeholder/New folder/avaleha.png"
	},
	"/assets/videos/pd-090-instagram-ad.mp4": {
		"type": "video/mp4",
		"etag": "\"40a35b-EB+bZQVTz8W3AlDs/XBBYGrFcZc\"",
		"mtime": "2026-08-04T08:17:58.579Z",
		"size": 4236123,
		"path": "../public/assets/videos/pd-090-instagram-ad.mp4"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_f2CKrZ = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_f2CKrZ
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
