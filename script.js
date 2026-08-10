/* =========================================================================
   Next Vision Painting — landing page behavior
   - Pre-selects a pricing package when a "Choose ___" button is clicked
   - Validates and submits the free-quote form
   - Shows an inline thank-you state (with a mailto fallback)
   ========================================================================= */
(function () {
  "use strict";

  // ---- Current year in footer ----------------------------------------------
  var yearEl = document.getElementById("year");
  if (yearEl) {
    // Static-friendly: only update if the environment allows it.
    try { yearEl.textContent = String(new Date().getFullYear()); } catch (e) {}
  }

  // ---- Business contact (single source of truth) ---------------------------
  var BUSINESS_EMAIL = "quotes@nextvisionpainting.com";

  // ---- Package pre-selection from pricing cards -----------------------------
  var pkgSelect = document.getElementById("package");
  document.querySelectorAll("[data-package]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wanted = btn.getAttribute("data-package");
      if (pkgSelect) {
        for (var i = 0; i < pkgSelect.options.length; i++) {
          if (pkgSelect.options[i].value.indexOf(wanted.split(" — ")[0]) !== -1) {
            pkgSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // ---- Quote form -----------------------------------------------------------
  var form = document.getElementById("quoteForm");
  var success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    // Basic required-field validation.
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    if (!name || !phone) {
      if (!name) form.name.focus();
      else form.phone.focus();
      form.reportValidity && form.reportValidity();
      return;
    }

    /* -----------------------------------------------------------------------
       Where the lead goes:
       This is a static site, so by default we open the visitor's email client
       pre-filled to the business (a reliable, no-backend fallback) and show the
       thank-you panel. To collect leads automatically instead, drop in a form
       endpoint (e.g. Formspree, Netlify Forms, or your own handler): set
       FORM_ENDPOINT below and this will POST there via fetch.
    ----------------------------------------------------------------------- */
    var FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxxx"

    var data = {
      name: name,
      phone: phone,
      email: form.email.value.trim(),
      address: form.address.value.trim(),
      package: form.package.value,
      details: form.details.value.trim()
    };

    function showSuccess() {
      form.style.display = "none";
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(showSuccess)
        .catch(function () { mailtoFallback(data); showSuccess(); });
    } else {
      mailtoFallback(data);
      showSuccess();
    }
  });

  function mailtoFallback(d) {
    var subject = "Free Quote Request — " + d.name;
    var body =
      "New quote request from nextvisionpainting.com\n\n" +
      "Name: " + d.name + "\n" +
      "Phone: " + d.phone + "\n" +
      "Email: " + (d.email || "—") + "\n" +
      "Address: " + (d.address || "—") + "\n" +
      "Package: " + d.package + "\n" +
      "Details: " + (d.details || "—") + "\n";
    var href =
      "mailto:" + BUSINESS_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    // Open in a new context so the thank-you panel stays visible.
    window.location.href = href;
  }
})();
