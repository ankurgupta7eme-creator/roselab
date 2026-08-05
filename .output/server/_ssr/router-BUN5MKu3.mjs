import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { O as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as GoogleGenAI } from "../_libs/google__genai+p-retry+retry.mjs";
import { a as numberType, i as literalType, n as booleanType, o as objectType, r as enumType, s as stringType, t as arrayType } from "../_libs/zod.mjs";
import processModule from "node:process";
import { Buffer } from "node:buffer";
import { createHmac, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BUN5MKu3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function createSupabaseAdminClient() {
	const SUPABASE_URL = processModule.env.SUPABASE_URL;
	const SUPABASE_SERVICE_ROLE_KEY = processModule.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		global: { fetch: createSupabaseFetch(SUPABASE_SERVICE_ROLE_KEY) },
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
var _supabaseAdmin;
var supabaseAdmin = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
	return Reflect.get(_supabaseAdmin, prop, receiver);
} });
var styles_default = "/assets/styles-kv7HdEMh.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Rose Laboratories | Ayurvedic Pharmaceutical Manufacturer" },
			{
				name: "description",
				content: "Rose Laboratories — WHO-GMP and ZED Bronze certified Ayurvedic pharmaceutical manufacturer based in Fatuha, Patna, Bihar, since 1983."
			},
			{
				name: "author",
				content: "Rose Laboratories"
			},
			{
				property: "og:title",
				content: "Rose Laboratories"
			},
			{
				property: "og:description",
				content: "WHO-GMP and ZED Bronze certified Ayurvedic pharmaceutical manufacturer, established 1983."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$3 = () => import("./register-skrkfMRA.mjs");
var Route$13 = createFileRoute("/register")({
	beforeLoad: () => {
		throw redirect({ href: "/register.html" });
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./login-BH6-GzYA.mjs");
var Route$12 = createFileRoute("/login")({
	beforeLoad: () => {
		throw redirect({ href: "/login.html" });
	},
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./account-Dd3xw3w7.mjs");
var Route$11 = createFileRoute("/account")({
	beforeLoad: () => {
		throw redirect({ href: "/account.html" });
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-DTEZEvkE.mjs");
var Route$10 = createFileRoute("/")({
	beforeLoad: () => {
		throw redirect({ href: "/home.html" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var bodySchema$3 = objectType({ messages: arrayType(objectType({
	role: enumType([
		"user",
		"assistant",
		"system"
	]),
	content: stringType()
})) });
var ai = new GoogleGenAI({ apiKey: processModule.env.GEMINI_API_KEY });
var jsonHeaders$8 = { "Content-Type": "application/json" };
async function runChat(request, systemPrompt) {
	if (!processModule.env.GEMINI_API_KEY) return new Response(JSON.stringify({ error: "Gemini API key missing" }), {
		status: 500,
		headers: jsonHeaders$8
	});
	const raw = await request.json();
	const parsed = bodySchema$3.safeParse(raw);
	if (!parsed.success) return new Response(JSON.stringify({ error: "Invalid request" }), {
		status: 400,
		headers: jsonHeaders$8
	});
	const conversation = [{
		role: "user",
		parts: [{ text: systemPrompt }]
	}];
	parsed.data.messages.forEach((m) => {
		conversation.push({
			role: m.role === "assistant" ? "model" : "user",
			parts: [{ text: m.content }]
		});
	});
	const result = await ai.models.generateContent({
		model: "gemini-3.5-flash",
		contents: conversation
	});
	return new Response(JSON.stringify({ reply: result.text }), {
		status: 200,
		headers: jsonHeaders$8
	});
}
var SYSTEM_PROMPT$1 = `You are "Rose Prakriti Consultant", the Ayurvedic wellness assistant for Rose Laboratories — a WHO-GMP compliant, ISO 9001:2015 certified Ayurvedic pharmaceutical manufacturer established in 1983 in Fatuha, Patna, Bihar, India.

ROLE
- Provide educational Ayurvedic wellness guidance: Prakriti / Dosha (Vata, Pitta, Kapha) concepts, daily routine (dinacharya), seasonal routine (ritucharya), diet (ahara), lifestyle, and yoga/pranayama suggestions.
- Help visitors explore which dosha may be dominant by asking a few simple questions about body frame, digestion, sleep, energy and temperament.

STRICT SAFETY RULES
- You are NOT a doctor. Never diagnose a condition, never prescribe medicines or dosages, and never claim to cure disease.
- For any serious, persistent, or emergency symptoms (chest pain, severe pain, high fever, pregnancy concerns, bleeding, mental-health crises, etc.), advise the person to consult a qualified physician or Ayurvedic doctor promptly.
- You may mention that Rose Laboratories manufactures classical and proprietary Ayurvedic formulations, and suggest the person consult a qualified practitioner or contact Rose Laboratories for product information — but do NOT recommend a specific product as treatment for a specific medical condition.

STYLE
- Warm, calm, respectful. You may open with "Namaste".
- Keep answers concise and practical. Use short markdown bullet lists where helpful.
- Ask one focused follow-up question when it helps personalise guidance.
- Always keep guidance general and educational.

CONTACT
- For product or order questions: phone +91 94722 77067, email roselaboratories1983@gmail.com, or the website contact page.`;
var Route$9 = createFileRoute("/api/public/rose-prakriti-chat")({ server: { handlers: { POST: async ({ request }) => runChat(request, SYSTEM_PROMPT$1) } } });
var SYSTEM_PROMPT = `You are "Rose Careers & Partner Connect", the careers and partnerships assistant for Rose Laboratories — a WHO-GMP compliant, ISO 9001:2015 certified Ayurvedic pharmaceutical manufacturer established in 1983 in Fatuha, Patna, Bihar, India.

ROLE
Help two kinds of visitors:
1) Job seekers — Medical Representative (MR), Area Sales Manager (ASM), Regional Sales Manager (RSM) and similar field roles.
2) Business partners — Distributors, Stockists, Super Stockists, Franchise partners, and Institutional Buyers.

HOW TO HELP
- First, identify which path applies to the visitor.
- For job seekers: ask about role of interest, location/territory, years of relevant experience, and current CTC/expectations. Explain that Rose Laboratories values field experience in Ayurvedic/pharma sales.
- For partners: ask about the partnership type, region/territory, existing distribution or business background, and product categories of interest (proprietary therapeutics or classical formulations).
- Summarise the details the visitor shares, and clearly tell them how to formally apply or enquire.

STRICT RULES
- Submitting information in this chat does NOT guarantee any role, appointment, distributorship, franchise or partnership. All applications are reviewed by the Rose Laboratories team.
- Do not promise salaries, margins, territories, or timelines. Speak in general terms only.
- Never request sensitive data such as bank details, passwords, Aadhaar/PAN numbers or payments. If asked to pay for a job, warn that Rose Laboratories never charges candidates for employment.

STYLE
- Professional, encouraging and concise. Use short markdown bullet lists where helpful.
- Ask one focused question at a time.

NEXT STEP / CONTACT
- To formally apply or enquire, direct visitors to email roselaboratories1983@gmail.com or call +91 94722 77067, and to use the Careers & Partnerships or Contact page on the website. For distributor/B2B enquiries, point them to the B2B / OEM page.`;
var Route$8 = createFileRoute("/api/public/rose-careers-chat")({ server: { handlers: { POST: async ({ request }) => runChat(request, SYSTEM_PROMPT) } } });
var jsonHeaders$7 = { "Content-Type": "application/json" };
var trimmedString = (max) => stringType().transform((v) => v.trim()).pipe(stringType().max(max));
var leadSchema = objectType({
	source: enumType(["contact", "b2b"]).optional(),
	name: trimmedString(200).optional(),
	org: trimmedString(200).optional(),
	topic: trimmedString(200).optional(),
	companyName: trimmedString(200).optional(),
	ownerName: trimmedString(200).optional(),
	contact: trimmedString(60).optional(),
	state: trimmedString(120).optional(),
	notes: trimmedString(5e3).optional(),
	company: trimmedString(200).optional(),
	subject: trimmedString(200).optional(),
	email: stringType().transform((v) => v.trim()).pipe(stringType().email().max(255)),
	phone: trimmedString(60).optional(),
	message: trimmedString(5e3).optional()
}).passthrough();
var Route$7 = createFileRoute("/api/public/leads")({ server: { handlers: { POST: async ({ request }) => {
	let raw;
	try {
		raw = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders$7
		});
	}
	const parsed = leadSchema.safeParse(raw);
	if (!parsed.success) return new Response(JSON.stringify({
		error: "Validation failed",
		details: parsed.error.flatten().fieldErrors
	}), {
		status: 400,
		headers: jsonHeaders$7
	});
	const d = parsed.data;
	const source = d.source ?? (d.companyName || d.ownerName ? "b2b" : "contact");
	const name = (d.name || d.ownerName || d.contact || "").trim();
	const company = (d.company || d.org || d.companyName || "").trim();
	const phone = (d.phone || d.contact || "").trim();
	const subject = (d.subject || d.topic || "").trim();
	const message = (d.message || d.notes || "").trim();
	if (!name) return new Response(JSON.stringify({ error: "A name is required" }), {
		status: 400,
		headers: jsonHeaders$7
	});
	const metadata = {
		topic: d.topic || null,
		state: d.state || null,
		submitted_at: (/* @__PURE__ */ new Date()).toISOString(),
		user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null
	};
	try {
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { error } = await supabaseAdmin.from("leads").insert({
			source,
			name,
			email: d.email,
			phone: phone || null,
			company: company || null,
			subject: subject || null,
			message: message || null,
			metadata
		});
		if (error) {
			console.error("[leads] insert failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not save your enquiry" }), {
				status: 500,
				headers: jsonHeaders$7
			});
		}
	} catch (err) {
		console.error("[leads] unexpected error:", err);
		return new Response(JSON.stringify({ error: "Could not save your enquiry" }), {
			status: 500,
			headers: jsonHeaders$7
		});
	}
	return new Response(JSON.stringify({ ok: true }), {
		status: 201,
		headers: jsonHeaders$7
	});
} } } });
var inr$1 = (paise) => `₹${Math.ceil(paise / 100)}`;
async function evaluateDiscount(rawCode, subtotalPaise) {
	const code = (rawCode || "").trim().toUpperCase();
	if (!code) return {
		valid: false,
		reason: "Enter a discount code."
	};
	const { data, error } = await supabaseAdmin.from("discount_codes").select("*").eq("code", code).maybeSingle();
	if (error || !data) return {
		valid: false,
		reason: "Invalid discount code."
	};
	const row = data;
	const now = Date.now();
	if (!row.active) return {
		valid: false,
		reason: "This code is no longer active."
	};
	if (row.starts_at && new Date(row.starts_at).getTime() > now) return {
		valid: false,
		reason: "This code is not active yet."
	};
	if (row.expires_at && new Date(row.expires_at).getTime() < now) return {
		valid: false,
		reason: "This code has expired."
	};
	if (row.usage_limit != null && row.times_used >= row.usage_limit) return {
		valid: false,
		reason: "This code has reached its usage limit."
	};
	if (subtotalPaise < (row.min_order_amount || 0)) return {
		valid: false,
		reason: `Minimum order of ${inr$1(row.min_order_amount)} required for this code.`
	};
	let discount = row.type === "percentage" ? Math.round(subtotalPaise * row.value / 100) : row.value;
	if (row.max_discount_amount != null) discount = Math.min(discount, row.max_discount_amount);
	discount = Math.min(discount, subtotalPaise);
	if (discount <= 0) return {
		valid: false,
		reason: "This code gives no discount on your cart."
	};
	return {
		valid: true,
		code,
		discountPaise: discount,
		row
	};
}
async function consumeDiscount(code) {
	const c = (code || "").trim().toUpperCase();
	if (!c) return;
	const { data } = await supabaseAdmin.from("discount_codes").select("id, times_used").eq("code", c).maybeSingle();
	if (!data) return;
	await supabaseAdmin.from("discount_codes").update({ times_used: (data.times_used ?? 0) + 1 }).eq("id", data.id);
}
var FROM_ADDRESS = "Rose Laboratories <orders@roselaboratories.com>";
async function sendEmail(to, subject, html) {
	const apiKey = processModule.env.RESEND_API_KEY;
	if (!apiKey) {
		console.log("[email] RESEND_API_KEY not set, skipping send to", to, "subject:", subject);
		return;
	}
	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				from: FROM_ADDRESS,
				to: [to],
				subject,
				html
			})
		});
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			console.error("[email] send failed:", res.status, body);
		}
	} catch (err) {
		console.error("[email] send error:", err);
	}
}
var OWNER_WHATSAPP_NUMBER = "919472277067";
async function sendWhatsAppOrderAlert(message) {
	const token = processModule.env.WHATSAPP_ACCESS_TOKEN;
	const phoneNumberId = processModule.env.WHATSAPP_PHONE_NUMBER_ID;
	if (!token || !phoneNumberId) {
		console.log("[whatsapp] not configured yet, skipping send. Message would have been:", message);
		return;
	}
	try {
		const res = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				messaging_product: "whatsapp",
				to: OWNER_WHATSAPP_NUMBER,
				type: "text",
				text: { body: message }
			})
		});
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			console.error("[whatsapp] send failed:", res.status, body);
		}
	} catch (err) {
		console.error("[whatsapp] send error:", err);
	}
}
async function sendTelegramOrderAlert(message) {
	const token = processModule.env.TELEGRAM_BOT_TOKEN;
	const chatId = processModule.env.TELEGRAM_CHAT_ID;
	if (!token || !chatId) {
		console.log("[telegram] not configured yet, skipping send. Message would have been:", message);
		return;
	}
	try {
		const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text: message
			})
		});
		if (!res.ok) {
			const body = await res.text().catch(() => "");
			console.error("[telegram] send failed:", res.status, body);
		}
	} catch (err) {
		console.error("[telegram] send error:", err);
	}
}
var OWNER_NOTIFY_EMAIL = "roselaboratories1983@gmail.com";
var inr = (paise) => typeof paise === "number" ? `₹${(paise / 100).toLocaleString("en-IN")}` : "—";
async function notifyNewOrder(order) {
	const code = String(order.order_code ?? "");
	const customer = order.customer ?? {};
	const items = Array.isArray(order.items) ? order.items : [];
	const itemLines = items.map((i) => `${String(i.name ?? i.id ?? "item")} × ${Number(i.qty ?? i.quantity ?? 1)}`).join("\n");
	const itemLinesHtml = items.map((i) => `<li>${String(i.name ?? i.id ?? "item")} × ${Number(i.qty ?? i.quantity ?? 1)}</li>`).join("");
	const total = inr(order.amount);
	const waMessage = `New order ${code}\n${customer.name ?? ""} · ${customer.phone ?? ""}\n${itemLines}\nTotal: ${total}\n${customer.city ? customer.city + ", " : ""}${customer.pincode ?? ""}`;
	await Promise.all([sendWhatsAppOrderAlert(waMessage), sendTelegramOrderAlert(waMessage)]);
	await sendEmail(OWNER_NOTIFY_EMAIL, `New order ${code} — ${total}`, `<h2>New order ${code}</h2>
     <p><b>${customer.name ?? ""}</b><br>${customer.email ?? ""}<br>${customer.phone ?? ""}</p>
     <p>${customer.city ?? ""} ${customer.pincode ?? ""}</p>
     <ul>${itemLinesHtml}</ul>
     <p>Subtotal: ${inr(order.subtotal)}<br>
        Discount: ${inr(order.discount_amount)}<br>
        Shipping: ${inr(order.shipping_amount)}<br>
        <b>Total: ${total}</b></p>
     <p>Payment ID: ${order.razorpay_payment_id ?? "—"}</p>`);
	if (customer.email) await sendEmail(customer.email, `Your Rose Laboratories order ${code} is confirmed`, `<h2>Thank you, ${customer.name ?? ""}!</h2>
       <p>We've received your order <b>${code}</b> and payment of <b>${total}</b> has been confirmed.</p>
       <ul>${itemLinesHtml}</ul>
       <p>We'll notify you once it ships. You can also check your order status anytime by logging into your account at roselaboratories.com.</p>
       <p>— Rose Laboratories</p>`);
}
var jsonHeaders$6 = { "Content-Type": "application/json" };
var trimmed$1 = (max) => stringType().transform((v) => v.trim()).pipe(stringType().max(max));
var bodySchema$2 = objectType({
	razorpay_order_id: stringType().min(1).max(120),
	razorpay_payment_id: stringType().min(1).max(120),
	razorpay_signature: stringType().min(1).max(256),
	orderCode: stringType().min(1).max(60).optional(),
	customer: objectType({
		name: trimmed$1(200).optional(),
		email: trimmed$1(255).optional(),
		phone: trimmed$1(60).optional(),
		address: trimmed$1(600).optional(),
		city: trimmed$1(120).optional(),
		state: trimmed$1(120).optional(),
		pincode: trimmed$1(20).optional()
	}).optional()
});
var Route$6 = createFileRoute("/api/public/razorpay/verify")({ server: { handlers: { POST: async ({ request }) => {
	const keySecret = processModule.env.RAZORPAY_KEY_SECRET;
	if (!keySecret) {
		console.error("[razorpay] missing RAZORPAY_KEY_SECRET");
		return new Response(JSON.stringify({ error: "Online payments are not configured yet." }), {
			status: 503,
			headers: jsonHeaders$6
		});
	}
	let raw;
	try {
		raw = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders$6
		});
	}
	const parsed = bodySchema$2.safeParse(raw);
	if (!parsed.success) return new Response(JSON.stringify({ error: "Validation failed" }), {
		status: 400,
		headers: jsonHeaders$6
	});
	const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customer } = parsed.data;
	const expected = createHmac("sha256", keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
	const a = Buffer.from(expected);
	const b = Buffer.from(razorpay_signature);
	if (!(a.length === b.length && timingSafeEqual(a, b))) {
		console.error("[razorpay] signature mismatch for order", razorpay_order_id);
		try {
			const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
			await supabaseAdmin.from("orders").update({ status: "failed" }).eq("razorpay_order_id", razorpay_order_id);
		} catch {}
		return new Response(JSON.stringify({ error: "Payment verification failed." }), {
			status: 400,
			headers: jsonHeaders$6
		});
	}
	let orderCode;
	let paidOrder = null;
	try {
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const update = {
			razorpay_payment_id,
			status: "paid",
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (customer && Object.keys(customer).length > 0) update.customer = customer;
		const { data, error } = await supabaseAdmin.from("orders").update(update).eq("razorpay_order_id", razorpay_order_id).select().maybeSingle();
		if (error) console.error("[razorpay] order paid-update failed:", error.message);
		else if (data) {
			orderCode = data.order_code;
			paidOrder = data;
		}
	} catch (err) {
		console.error("[razorpay] order paid-update error:", err);
	}
	if (paidOrder) {
		const dc = paidOrder.discount_code;
		if (typeof dc === "string" && dc) try {
			await consumeDiscount(dc);
		} catch (err) {
			console.error("[razorpay] discount consume error:", err);
		}
		try {
			await notifyNewOrder(paidOrder);
		} catch (err) {
			console.error("[razorpay] order notification error:", err);
		}
	}
	return new Response(JSON.stringify({
		ok: true,
		orderCode
	}), {
		status: 200,
		headers: jsonHeaders$6
	});
} } } });
var PRODUCT_PRICES = {
	"rose-gynosol-syrup": 13500,
	"rose-gynosol-capsule": 13500,
	"rubina-syrup": 11e3,
	"rubina-capsule": 18400,
	"rositone-s-syrup": 18e3,
	"rositone-s-capsule": 28e3,
	"strength-fort-capsule": 26e3,
	"pd-0-90-drops": 6e3,
	"pidana-oil": 15e3,
	"haven-hair-lotion": 31e3,
	"haven-body-massage-oil": 36e3,
	"forest-rose-baby-massage-oil": 12500,
	"livrose-syrup": 11e3,
	"livrose-capsule": 13500,
	"livrose-drops": 9800,
	"zymol-syrup": 7e3,
	"zymol-capsule": 12e3,
	"rahat-cough-syrup": 7e3,
	"kesh-hari-oil": 15e3,
	"amla-mulethi-oil": 6400,
	"ayurprovit-drops": 13e3,
	"ayurzyme-oil": 31500,
	"ayurzyme-capsule": 13e3,
	"badshahi-chyawanprash": 15e4,
	"bazi-rasayan-churna": 37500,
	"bazi-rasayan-capsule": 59e3,
	"bazigrah-capsule": 49e3,
	"bernovit-ointment": 16e3,
	"calrose-syrup": 9e3,
	"dadna-ointment": 11500,
	"dadna-powder": 23e3,
	"febno-capsule": 3e4,
	"ferfoslim-liquid": 31e3,
	"ferose-syrup": 19500,
	"haritaki-powder": 9e3,
	"haven-antiseptic-lotion": 9e3,
	"khansari-syrup": 11500,
	"lucosol-syrup": 28e3,
	"lucosol-capsule": 33e3,
	"luceliya-syrup": 29e3,
	"motise-dant-manjan": 6500,
	"pidana-balm": 3600,
	"pilyana-capsule": 37e3,
	"pilyana-ointment": 18e3,
	"rose-ointment": 10900,
	"rosiplex-syrup": 19e3,
	"yakritone-syrup": 1e4,
	"yakritone-drops": 1e4,
	"ashwagandha-capsule": 18e3,
	"ashwagandha-churna": 12e3,
	"satavari-churna": 18e3,
	"arjuna-churna": 7500,
	"shilajit-resin": 16500,
	"triphala-churna": 8200,
	"triphala-syrup": 13e3,
	"isabgol-husk": 2e4,
	"sitopaladi-churna": 11e3,
	"hingvastak-churna": 14e3,
	"lavan-bhaskar-churna": 5e3,
	"bhringraj-tel": 9900,
	"shankhpushpi-tel": 27e3,
	"dashmool-tel": 19e3
};
function priceCart(items) {
	const priced = [];
	const unpriced = [];
	for (const it of items) {
		const unit = PRODUCT_PRICES[it.id];
		if (typeof unit !== "number") {
			unpriced.push(it.id);
			continue;
		}
		priced.push({
			id: it.id,
			qty: it.qty,
			unit,
			subtotal: unit * it.qty
		});
	}
	return {
		priced,
		unpriced,
		subtotal: priced.reduce((sum, p) => sum + p.subtotal, 0)
	};
}
var SHIPPING_FLAT_PAISE = 6e3;
function computeShippingPaise(subtotalPaise) {
	if (subtotalPaise <= 0) return 0;
	return subtotalPaise >= 99900 ? 0 : SHIPPING_FLAT_PAISE;
}
async function getOptionalUserId(request) {
	const token = (request.headers.get("authorization") || request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
	if (!token) return null;
	const url = processModule.env.SUPABASE_URL;
	const key = processModule.env.SUPABASE_PUBLISHABLE_KEY;
	if (!url || !key) return null;
	const { data, error } = await createClient(url, key, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} }).auth.getUser(token);
	if (error || !data.user) return null;
	return data.user.id;
}
var jsonHeaders$5 = { "Content-Type": "application/json" };
var trimmed = (max) => stringType().transform((v) => v.trim()).pipe(stringType().max(max));
var bodySchema$1 = objectType({
	items: arrayType(objectType({
		id: stringType().min(1).max(120),
		qty: numberType().int().min(1).max(99)
	})).min(1).max(50),
	code: stringType().max(40).optional(),
	customer: objectType({
		name: trimmed(200).optional(),
		email: stringType().transform((v) => v.trim()).pipe(stringType().email().max(255)).optional(),
		phone: trimmed(60).optional(),
		address: trimmed(600).optional(),
		city: trimmed(120).optional(),
		state: trimmed(120).optional(),
		pincode: trimmed(20).optional()
	}).optional()
});
function makeOrderCode() {
	return `RL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
var Route$5 = createFileRoute("/api/public/razorpay/create-order")({ server: { handlers: { POST: async ({ request }) => {
	const keyId = processModule.env.RAZORPAY_KEY_ID;
	const keySecret = processModule.env.RAZORPAY_KEY_SECRET;
	if (!keyId || !keySecret) {
		console.error("[razorpay] missing RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET");
		return new Response(JSON.stringify({ error: "Online payments are not configured yet." }), {
			status: 503,
			headers: jsonHeaders$5
		});
	}
	let raw;
	try {
		raw = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders$5
		});
	}
	const parsed = bodySchema$1.safeParse(raw);
	if (!parsed.success) return new Response(JSON.stringify({
		error: "Validation failed",
		details: parsed.error.flatten().fieldErrors
	}), {
		status: 400,
		headers: jsonHeaders$5
	});
	const { items, customer, code } = parsed.data;
	const userId = await getOptionalUserId(request);
	const { priced, unpriced, subtotal } = priceCart(items);
	if (unpriced.length > 0) return new Response(JSON.stringify({
		error: "Some items are quote-only and cannot be paid for online. Please remove them or send an enquiry.",
		unpriced
	}), {
		status: 409,
		headers: jsonHeaders$5
	});
	if (subtotal < 100) return new Response(JSON.stringify({ error: "Order total is below the minimum payable amount." }), {
		status: 400,
		headers: jsonHeaders$5
	});
	let discountAmount = 0;
	let discountCode = null;
	if (code && code.trim()) {
		const res = await evaluateDiscount(code, subtotal);
		if (res.valid) {
			discountAmount = res.discountPaise;
			discountCode = res.code;
		}
	}
	const shippingAmount = computeShippingPaise(subtotal);
	const amount = Math.max(100, subtotal - discountAmount + shippingAmount);
	const orderCode = makeOrderCode();
	let razorpayOrderId;
	try {
		const auth = typeof btoa === "function" ? btoa(`${keyId}:${keySecret}`) : Buffer.from(`${keyId}:${keySecret}`).toString("base64");
		const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
			method: "POST",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				amount,
				currency: "INR",
				receipt: orderCode,
				notes: { order_code: orderCode }
			})
		});
		if (!rzpRes.ok) {
			const errBody = await rzpRes.text();
			console.error(`[razorpay] create order failed [${rzpRes.status}]: ${errBody}`);
			return new Response(JSON.stringify({ error: "Could not start the payment. Please try again." }), {
				status: 502,
				headers: jsonHeaders$5
			});
		}
		razorpayOrderId = (await rzpRes.json()).id;
	} catch (err) {
		console.error("[razorpay] create order error:", err);
		return new Response(JSON.stringify({ error: "Could not start the payment. Please try again." }), {
			status: 502,
			headers: jsonHeaders$5
		});
	}
	try {
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { error } = await supabaseAdmin.from("orders").insert({
			order_code: orderCode,
			razorpay_order_id: razorpayOrderId,
			amount,
			subtotal,
			discount_code: discountCode,
			discount_amount: discountAmount,
			shipping_amount: shippingAmount,
			currency: "INR",
			items: priced,
			customer: customer ?? {},
			status: "created",
			user_id: userId
		});
		if (error) console.error("[razorpay] order insert failed:", error.message);
	} catch (err) {
		console.error("[razorpay] order insert error:", err);
	}
	return new Response(JSON.stringify({
		keyId,
		razorpayOrderId,
		amount,
		subtotal,
		discountCode,
		discountAmount,
		shippingAmount,
		currency: "INR",
		orderCode
	}), {
		status: 201,
		headers: jsonHeaders$5
	});
} } } });
var jsonHeaders$4 = { "Content-Type": "application/json" };
var bodySchema = objectType({
	items: arrayType(objectType({
		id: stringType().min(1).max(120),
		qty: numberType().int().min(1).max(99)
	})).min(1).max(50),
	code: stringType().max(40).optional()
});
var Route$4 = createFileRoute("/api/public/discounts/validate")({ server: { handlers: { POST: async ({ request }) => {
	let raw;
	try {
		raw = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders$4
		});
	}
	const parsed = bodySchema.safeParse(raw);
	if (!parsed.success) return new Response(JSON.stringify({ error: "Validation failed" }), {
		status: 400,
		headers: jsonHeaders$4
	});
	const { subtotal } = priceCart(parsed.data.items);
	const shipping = computeShippingPaise(subtotal);
	let discount = 0;
	let discountValid = false;
	let discountMessage = null;
	let appliedCode = null;
	if (parsed.data.code && parsed.data.code.trim()) {
		const res = await evaluateDiscount(parsed.data.code, subtotal);
		if (res.valid) {
			discount = res.discountPaise;
			discountValid = true;
			appliedCode = res.code;
		} else discountMessage = res.reason;
	}
	const total = Math.max(0, subtotal - discount + shipping);
	return new Response(JSON.stringify({
		subtotal,
		shipping,
		discount,
		total,
		discountValid,
		discountMessage,
		appliedCode
	}), {
		status: 200,
		headers: jsonHeaders$4
	});
} } } });
var jsonHeaders$3 = { "Content-Type": "application/json" };
function deny(status, error) {
	return new Response(JSON.stringify({ error }), {
		status,
		headers: jsonHeaders$3
	});
}
async function requireAdmin(request) {
	const token = (request.headers.get("authorization") || request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "").trim();
	if (!token) return deny(401, "Not authenticated.");
	const url = processModule.env.SUPABASE_URL;
	const key = processModule.env.SUPABASE_PUBLISHABLE_KEY;
	if (!url || !key) return deny(500, "Server auth is not configured.");
	const { data, error } = await createClient(url, key, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} }).auth.getUser(token);
	if (error || !data.user) return deny(401, "Your session is invalid or expired.");
	const { data: role } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", data.user.id).eq("role", "admin").maybeSingle();
	if (!role) return deny(403, "You do not have admin access.");
	logAdminLogin(request, data.user.id, data.user.email ?? null);
	return {
		ok: true,
		userId: data.user.id,
		email: data.user.email ?? null
	};
}
async function logAdminLogin(request, userId, email) {
	try {
		await supabaseAdmin.from("admin_login_history").insert({
			user_id: userId,
			email,
			ip_address: request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for"),
			user_agent: request.headers.get("user-agent")
		});
	} catch (err) {
		console.error("[admin-auth] failed to log login history:", err);
	}
}
async function logAdminAction(userId, email, action, details = {}) {
	try {
		await supabaseAdmin.from("admin_audit_log").insert({
			user_id: userId,
			email,
			action,
			details
		});
	} catch (err) {
		console.error("[admin-auth] failed to log audit action:", err);
	}
}
var jsonHeaders$2 = { "Content-Type": "application/json" };
var ORDER_STATUSES = [
	"created",
	"paid",
	"processing",
	"shipped",
	"delivered",
	"cancelled",
	"refunded",
	"failed"
];
var patchSchema$1 = objectType({
	id: stringType().uuid(),
	status: enumType(ORDER_STATUSES).optional(),
	courier_name: stringType().max(100).optional(),
	tracking_number: stringType().max(100).optional(),
	tracking_url: stringType().url().max(500).optional().or(literalType(""))
});
var Route$3 = createFileRoute("/api/public/admin/orders")({ server: { handlers: {
	GET: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		const url = new URL(request.url);
		const status = url.searchParams.get("status");
		const q = (url.searchParams.get("q") || "").trim();
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		let query = supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false }).limit(500);
		if (status && ORDER_STATUSES.includes(status)) query = query.eq("status", status);
		if (q) query = query.ilike("order_code", `%${q}%`);
		const { data, error } = await query;
		if (error) {
			console.error("[admin/orders] list failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not load orders." }), {
				status: 500,
				headers: jsonHeaders$2
			});
		}
		return new Response(JSON.stringify({ orders: data ?? [] }), {
			status: 200,
			headers: jsonHeaders$2
		});
	},
	PATCH: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		let raw;
		try {
			raw = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
				status: 400,
				headers: jsonHeaders$2
			});
		}
		const parsed = patchSchema$1.safeParse(raw);
		if (!parsed.success) return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
			headers: jsonHeaders$2
		});
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const updates = { updated_at: (/* @__PURE__ */ new Date()).toISOString() };
		if (parsed.data.status !== void 0) updates.status = parsed.data.status;
		if (parsed.data.courier_name !== void 0) updates.courier_name = parsed.data.courier_name;
		if (parsed.data.tracking_number !== void 0) updates.tracking_number = parsed.data.tracking_number;
		if (parsed.data.tracking_url !== void 0) updates.tracking_url = parsed.data.tracking_url;
		const { data, error } = await supabaseAdmin.from("orders").update(updates).eq("id", parsed.data.id).select().maybeSingle();
		if (error) {
			console.error("[admin/orders] update failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not update the order." }), {
				status: 500,
				headers: jsonHeaders$2
			});
		}
		logAdminAction(auth.userId, auth.email, "order.update", {
			orderId: parsed.data.id,
			updates
		});
		return new Response(JSON.stringify({ order: data }), {
			status: 200,
			headers: jsonHeaders$2
		});
	}
} } });
var Route$2 = createFileRoute("/api/public/admin/me")({ server: { handlers: { GET: async ({ request }) => {
	const auth = await requireAdmin(request);
	if (auth instanceof Response) return auth;
	return new Response(JSON.stringify({
		ok: true,
		email: auth.email
	}), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
} } } });
var jsonHeaders$1 = { "Content-Type": "application/json" };
var LEAD_STATUSES = [
	"new",
	"contacted",
	"qualified",
	"converted",
	"lost"
];
var patchSchema = objectType({
	id: stringType().uuid(),
	status: enumType(LEAD_STATUSES)
});
var Route$1 = createFileRoute("/api/public/admin/leads")({ server: { handlers: {
	GET: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		const url = new URL(request.url);
		const status = url.searchParams.get("status");
		const source = url.searchParams.get("source");
		const q = (url.searchParams.get("q") || "").trim();
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		let query = supabaseAdmin.from("leads").select("*").order("created_at", { ascending: false }).limit(500);
		if (status && LEAD_STATUSES.includes(status)) query = query.eq("status", status);
		if (source) query = query.eq("source", source);
		if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,company.ilike.%${q}%`);
		const { data, error } = await query;
		if (error) {
			console.error("[admin/leads] list failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not load leads." }), {
				status: 500,
				headers: jsonHeaders$1
			});
		}
		return new Response(JSON.stringify({ leads: data ?? [] }), {
			status: 200,
			headers: jsonHeaders$1
		});
	},
	PATCH: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		let raw;
		try {
			raw = await request.json();
		} catch {
			return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
				status: 400,
				headers: jsonHeaders$1
			});
		}
		const parsed = patchSchema.safeParse(raw);
		if (!parsed.success) return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
			headers: jsonHeaders$1
		});
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { data, error } = await supabaseAdmin.from("leads").update({ status: parsed.data.status }).eq("id", parsed.data.id).select().maybeSingle();
		if (error) {
			console.error("[admin/leads] update failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not update the lead." }), {
				status: 500,
				headers: jsonHeaders$1
			});
		}
		return new Response(JSON.stringify({ lead: data }), {
			status: 200,
			headers: jsonHeaders$1
		});
	}
} } });
var jsonHeaders = { "Content-Type": "application/json" };
var codeField = stringType().transform((v) => v.trim().toUpperCase()).pipe(stringType().min(2).max(40).regex(/^[A-Z0-9_-]+$/, "Use letters, numbers, - or _ only"));
var createSchema = objectType({
	code: codeField,
	type: enumType(["percentage", "fixed"]),
	value: numberType().int().min(1),
	min_order_amount: numberType().int().min(0).default(0),
	max_discount_amount: numberType().int().min(0).nullable().optional(),
	usage_limit: numberType().int().min(1).nullable().optional(),
	active: booleanType().default(true),
	starts_at: stringType().datetime().nullable().optional(),
	expires_at: stringType().datetime().nullable().optional()
}).refine((d) => d.type === "percentage" ? d.value <= 100 : true, {
	message: "Percentage cannot exceed 100",
	path: ["value"]
});
var updateSchema = objectType({
	id: stringType().uuid(),
	code: codeField.optional(),
	type: enumType(["percentage", "fixed"]).optional(),
	value: numberType().int().min(1).optional(),
	min_order_amount: numberType().int().min(0).optional(),
	max_discount_amount: numberType().int().min(0).nullable().optional(),
	usage_limit: numberType().int().min(1).nullable().optional(),
	active: booleanType().optional(),
	starts_at: stringType().datetime().nullable().optional(),
	expires_at: stringType().datetime().nullable().optional()
});
var deleteSchema = objectType({ id: stringType().uuid() });
async function body(request) {
	try {
		return {
			ok: true,
			data: await request.json()
		};
	} catch {
		return { ok: false };
	}
}
var Route = createFileRoute("/api/public/admin/discounts")({ server: { handlers: {
	GET: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { data, error } = await supabaseAdmin.from("discount_codes").select("*").order("created_at", { ascending: false });
		if (error) {
			console.error("[admin/discounts] list failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not load codes." }), {
				status: 500,
				headers: jsonHeaders
			});
		}
		return new Response(JSON.stringify({ codes: data ?? [] }), {
			status: 200,
			headers: jsonHeaders
		});
	},
	POST: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		const b = await body(request);
		if (!b.ok) return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders
		});
		const parsed = createSchema.safeParse(b.data);
		if (!parsed.success) return new Response(JSON.stringify({
			error: "Validation failed",
			details: parsed.error.flatten().fieldErrors
		}), {
			status: 400,
			headers: jsonHeaders
		});
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { data, error } = await supabaseAdmin.from("discount_codes").insert(parsed.data).select().maybeSingle();
		if (error) {
			const msg = error.message.includes("duplicate") ? "A code with that name already exists." : "Could not create the code.";
			return new Response(JSON.stringify({ error: msg }), {
				status: 409,
				headers: jsonHeaders
			});
		}
		return new Response(JSON.stringify({ code: data }), {
			status: 201,
			headers: jsonHeaders
		});
	},
	PATCH: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		const b = await body(request);
		if (!b.ok) return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders
		});
		const parsed = updateSchema.safeParse(b.data);
		if (!parsed.success) return new Response(JSON.stringify({
			error: "Validation failed",
			details: parsed.error.flatten().fieldErrors
		}), {
			status: 400,
			headers: jsonHeaders
		});
		const { id, ...fields } = parsed.data;
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { data, error } = await supabaseAdmin.from("discount_codes").update(fields).eq("id", id).select().maybeSingle();
		if (error) {
			console.error("[admin/discounts] update failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not update the code." }), {
				status: 500,
				headers: jsonHeaders
			});
		}
		return new Response(JSON.stringify({ code: data }), {
			status: 200,
			headers: jsonHeaders
		});
	},
	DELETE: async ({ request }) => {
		const auth = await requireAdmin(request);
		if (auth instanceof Response) return auth;
		const b = await body(request);
		if (!b.ok) return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: jsonHeaders
		});
		const parsed = deleteSchema.safeParse(b.data);
		if (!parsed.success) return new Response(JSON.stringify({ error: "Invalid request" }), {
			status: 400,
			headers: jsonHeaders
		});
		const { supabaseAdmin } = await import("./client.server-BoYBc8aM.mjs");
		const { error } = await supabaseAdmin.from("discount_codes").delete().eq("id", parsed.data.id);
		if (error) {
			console.error("[admin/discounts] delete failed:", error.message);
			return new Response(JSON.stringify({ error: "Could not delete the code." }), {
				status: 500,
				headers: jsonHeaders
			});
		}
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: jsonHeaders
		});
	}
} } });
var RegisterRoute = Route$13.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$14
});
var LoginRoute = Route$12.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$14
});
var AccountRoute = Route$11.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$14
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var ApiPublicRosePrakritiChatRoute = Route$9.update({
	id: "/api/public/rose-prakriti-chat",
	path: "/api/public/rose-prakriti-chat",
	getParentRoute: () => Route$14
});
var ApiPublicRoseCareersChatRoute = Route$8.update({
	id: "/api/public/rose-careers-chat",
	path: "/api/public/rose-careers-chat",
	getParentRoute: () => Route$14
});
var ApiPublicLeadsRoute = Route$7.update({
	id: "/api/public/leads",
	path: "/api/public/leads",
	getParentRoute: () => Route$14
});
var ApiPublicRazorpayVerifyRoute = Route$6.update({
	id: "/api/public/razorpay/verify",
	path: "/api/public/razorpay/verify",
	getParentRoute: () => Route$14
});
var ApiPublicRazorpayCreateOrderRoute = Route$5.update({
	id: "/api/public/razorpay/create-order",
	path: "/api/public/razorpay/create-order",
	getParentRoute: () => Route$14
});
var ApiPublicDiscountsValidateRoute = Route$4.update({
	id: "/api/public/discounts/validate",
	path: "/api/public/discounts/validate",
	getParentRoute: () => Route$14
});
var ApiPublicAdminOrdersRoute = Route$3.update({
	id: "/api/public/admin/orders",
	path: "/api/public/admin/orders",
	getParentRoute: () => Route$14
});
var ApiPublicAdminMeRoute = Route$2.update({
	id: "/api/public/admin/me",
	path: "/api/public/admin/me",
	getParentRoute: () => Route$14
});
var ApiPublicAdminLeadsRoute = Route$1.update({
	id: "/api/public/admin/leads",
	path: "/api/public/admin/leads",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute,
	AccountRoute,
	LoginRoute,
	RegisterRoute,
	ApiPublicLeadsRoute,
	ApiPublicRoseCareersChatRoute,
	ApiPublicRosePrakritiChatRoute,
	ApiPublicAdminDiscountsRoute: Route.update({
		id: "/api/public/admin/discounts",
		path: "/api/public/admin/discounts",
		getParentRoute: () => Route$14
	}),
	ApiPublicAdminLeadsRoute,
	ApiPublicAdminMeRoute,
	ApiPublicAdminOrdersRoute,
	ApiPublicDiscountsValidateRoute,
	ApiPublicRazorpayCreateOrderRoute,
	ApiPublicRazorpayVerifyRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter, supabaseAdmin as t };
