// =====================================================================
// Rose Laboratories — Auth module (Supabase Auth)
// =====================================================================
(function (global) {
  var SUPABASE_URL = "https://ejymxfwptlsszviuuvfy.supabase.co";
  var SUPABASE_ANON = "sb_publishable_ntC0rOaFWk-T2CEZOy5k-w_Oc1vqpOj";

  var client = null;
  function getClient() {
    if (client) return client;
    if (!global.supabase) {
      console.error("[RoseAuth] Supabase JS library did not load (check network/ad-blocker/CDN access).");
      return null;
    }
    client = global.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
    return client;
  }

  async function register(name, email, phone, password) {
    var sb = getClient();
    if (!sb) return { ok: false, error: "Could not connect to the login service. Please refresh and try again." };
    try {
      var { data, error } = await sb.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
        options: {
          data: { name: name.trim(), phone: phone.trim() },
          emailRedirectTo: window.location.origin + "/login.html",
        },
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true, user: data.user };
    } catch (e) {
      console.error("[RoseAuth] register failed:", e);
      return { ok: false, error: "Something went wrong. Please try again in a moment." };
    }
  }

  async function login(email, password) {
    var sb = getClient();
    if (!sb) return { ok: false, error: "Could not connect to the login service. Please refresh and try again." };
    try {
      var { data, error } = await sb.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true, user: data.user };
    } catch (e) {
      console.error("[RoseAuth] login failed:", e);
      return { ok: false, error: "Something went wrong. Please try again in a moment." };
    }
  }

  async function logout() {
    var sb = getClient();
    if (!sb) return;
    try { await sb.auth.signOut(); } catch (e) { console.error("[RoseAuth] logout failed:", e); }
  }

  async function getCurrentUser() {
    var sb = getClient();
    if (!sb) return null;
    try {
      var { data } = await sb.auth.getUser();
      if (!data.user) return null;
      return {
        id: data.user.id,
        email: data.user.email,
        name: (data.user.user_metadata && data.user.user_metadata.name) || data.user.email,
        phone: (data.user.user_metadata && data.user.user_metadata.phone) || "",
      };
    } catch (e) {
      console.error("[RoseAuth] getCurrentUser failed:", e);
      return null;
    }
  }

  async function getAccessToken() {
    var sb = getClient();
    if (!sb) return null;
    try {
      var { data } = await sb.auth.getSession();
      return data.session ? data.session.access_token : null;
    } catch (e) {
      console.error("[RoseAuth] getAccessToken failed:", e);
      return null;
    }
  }

  async function ordersForCurrentUser() {
    var sb = getClient();
    if (!sb) return [];
    try {
      var { data: userData } = await sb.auth.getUser();
      if (!userData.user) return [];
      var { data, error } = await sb
        .from("orders")
        .select("id, order_code, amount, currency, items, status, created_at, courier_name, tracking_number, tracking_url")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });
      if (error || !data) return [];
      return data.map(function (o) {
        return {
          id: o.order_code,
          createdAt: o.created_at,
          items: o.items || [],
          status: o.status,
          amount: o.amount,
          currency: o.currency,
          courier: o.courier_name,
          trackingNumber: o.tracking_number,
          trackingUrl: o.tracking_url,
        };
      });
    } catch (e) {
      console.error("[RoseAuth] ordersForCurrentUser failed:", e);
      return [];
    }
  }

  async function listAddresses() {
    var sb = getClient();
    if (!sb) return [];
    try {
      var { data: userData } = await sb.auth.getUser();
      if (!userData.user) return [];
      var { data, error } = await sb
        .from("addresses")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });
      if (error || !data) return [];
      return data;
    } catch (e) {
      console.error("[RoseAuth] listAddresses failed:", e);
      return [];
    }
  }

  async function saveAddress(address) {
    var sb = getClient();
    if (!sb) return { ok: false, error: "Could not connect to the service." };
    try {
      var { data: userData } = await sb.auth.getUser();
      if (!userData.user) return { ok: false, error: "Not logged in." };

      if (address.is_default) {
        await sb.from("addresses").update({ is_default: false }).eq("user_id", userData.user.id);
      }

      var payload = Object.assign({}, address, { user_id: userData.user.id });
      var query = address.id
        ? sb.from("addresses").update(payload).eq("id", address.id)
        : sb.from("addresses").insert(payload);
      var { error } = await query;
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (e) {
      console.error("[RoseAuth] saveAddress failed:", e);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  }

  async function deleteAddress(id) {
    var sb = getClient();
    if (!sb) return { ok: false };
    try {
      await sb.from("addresses").delete().eq("id", id);
      return { ok: true };
    } catch (e) {
      console.error("[RoseAuth] deleteAddress failed:", e);
      return { ok: false };
    }
  }

  async function updateProfile(name, phone) {
    var sb = getClient();
    if (!sb) return { ok: false, error: "Could not connect to the service." };
    try {
      var { error } = await sb.auth.updateUser({ data: { name: name, phone: phone } });
      if (error) return { ok: false, error: error.message };
      return { ok: true };
    } catch (e) {
      console.error("[RoseAuth] updateProfile failed:", e);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  }

  async function saveAbandonedCart(items) {
    var sb = getClient();
    if (!sb) return;
    try {
      var { data: userData } = await sb.auth.getUser();
      if (!userData.user) return;
      await sb.from("abandoned_carts").upsert(
        { user_id: userData.user.id, email: userData.user.email, items: items, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    } catch (e) {
      console.error("[RoseAuth] saveAbandonedCart failed:", e);
    }
  }

  async function renderNavAccount() {
    var user = await getCurrentUser();
    document.querySelectorAll("#navAccountText").forEach(function (el) {
      el.textContent = user ? (user.name || "").split(" ")[0] || "Account" : "Login";
    });
    document.querySelectorAll("#navAccountLink").forEach(function (el) {
      el.setAttribute("href", user ? "account.html" : "login.html");
    });
    document.querySelectorAll("#navRegisterLink").forEach(function (el) {
      el.style.display = user ? "none" : "";
    });
  }

  document.addEventListener("DOMContentLoaded", renderNavAccount);

  global.RoseAuth = {
    register: register,
    login: login,
    logout: logout,
    currentUser: getCurrentUser,
    getAccessToken: getAccessToken,
    ordersForCurrentUser: ordersForCurrentUser,
    renderNavAccount: renderNavAccount,
    listAddresses: listAddresses,
    saveAddress: saveAddress,
    deleteAddress: deleteAddress,
    updateProfile: updateProfile,
    saveAbandonedCart: saveAbandonedCart,
  };
})(window);
