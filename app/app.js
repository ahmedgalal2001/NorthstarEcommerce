import "../resources/js/bootstrap.bundle.min.js";
import Authenticator from "../src/authenticator.js";
import Cart from "../src/cart.js";
import Router from "../src/router.js";

let badge_span_header = document.querySelector("#badge-span-header");
const cart = new Cart("cart");
badge_span_header.innerHTML=cart.productIds().length;

const routes = new Router({
  home: {
    linkLabel: "HOME",
    namePage: "home",
    script: "home",
  },
  about: {
    linkLabel: "ABOUT",
    namePage: "about",
    auth: false,
  },
  login: {
    linkLabel: "LOGIN",
    namePage: "login",
    auth: Authenticator.isLoggedIn(),
    script: "login",
  },
  contact: {
    linkLabel: "CONTACT",
    namePage: "contact",
    auth: false,
    script: "contact",
  },
  register: {
    linkLabel: "REGISTER",
    namePage: "register",
    auth: Authenticator.isLoggedIn(),
    script: "register",
  },
  profile: {
    linkLabel: "",
    namePage: "profile",
    auth: !Authenticator.isLoggedIn(),
    script: "profile",
  },
  itempage: {
    linkLabel: "",
    namePage: "itempage",
    auth: !Authenticator.isLoggedIn(),
    script:"itempage"
  },
  logout: {
    linkLabel: "Logout",
    namePage: "logout",
    auth: !Authenticator.isLoggedIn(),
    script: "logout",
  },
  cart: {
    linkLabel: "CART",
    namePage: "cart",
    auth: !Authenticator.isLoggedIn(),
    script: "addCart",
  },
  "edit-profile": {
    linkLabel: "",
    namePage: "edit-profile",
    auth: !Authenticator.isLoggedIn(),
    script: "edit-profile",
  },
  checkout: {
    linkLabel: "",
    namePage: "checkout",
    auth: !Authenticator.isLoggedIn(),
    script: "checkout",
  },
});

(function () {
  routes.loadRouter();
  if (Authenticator.isLoggedIn()) {
    const logout = document.getElementById("logout-nav");
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      Authenticator.logout();
      window.location.href =
        window.location.origin + "/ITI-Javascrit-Project/login";
    });
  }
})();


