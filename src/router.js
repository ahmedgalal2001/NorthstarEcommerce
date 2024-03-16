export default class Router {
  constructor(routes) {
    this.abs_path_pages = window.location.origin + "/ITI-Javascrit-Project/pages/";
    this.abs_path_scripts = window.location.origin + "/ITI-Javascrit-Project/app/";
    this.routes = routes;
    this.links = document.getElementById("links");
  }

  loadRouter() {
    Object.keys(this.routes).forEach(route => {
      const { linkLabel, auth } = this.routes[route];
      if (!auth) {
        let str = `
          <li class="nav-item">
            <a class="nav-link link text-dark" aria-current="page" href="${route}">${linkLabel}</a>
          </li>
        `;
        this.links.insertAdjacentHTML("beforeend", str);
      }
    });

    this.links_a = document.querySelectorAll(".link");

    this.links_a.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const { href } = e.target;
        this.links_a.forEach(link => {
          link.classList.remove("active");
        });
        e.target.classList.add("active");
        history.pushState({}, "", href);
        this.loadContent();
      });
    });

    this.loadContent();
  }

  loadContent() {
    let route = window.location.pathname.split("/")[2].toLowerCase();
    const { auth, script } = this.routes[route] || {};
    let html = this.abs_path_pages + (route === "" ? "home" : this.routes[route].namePage) + ".html";

    if (auth) {
      window.location.href = "/ITI-Javascrit-Project/login";
      return; // Stop further execution
    }

    fetch(html)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load page");
        }
        return response.text();
      })
      .then((htmlRoutes) => {
        document.getElementById("app").innerHTML = htmlRoutes;
        this.setActiveLink(route);
        this.loadScript(script);
      })
      .catch((error) => {
        console.error("Error loading page:", error);
      });
  }

  setActiveLink(route) {
    let links_a = document.querySelectorAll(".link");
    if (route == "") {
      links_a[0].classList.add("active");
    } else {
      links_a.forEach(link => {
        if (route === link.getAttribute("href")) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }

  loadScript(script) {
    if (script) {
      let scriptTag = document.createElement("script");
      scriptTag.src = this.abs_path_scripts + script;
      scriptTag.type = "module";
      document.body.appendChild(scriptTag);
    }
  }
}