/* =====================================================
   LOGIN PAGE - WALIKOTA MEDAN
   INTERACTION & ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENT
    ================================================= */

    const page = document.querySelector(".login-page");

    const loginBox = document.querySelector(".login-box");

    const passwordInput =
        document.getElementById("password");

    const togglePassword =
        document.getElementById("togglePassword");

    const loginForm =
        document.querySelector("form");

    const loginButton =
        document.getElementById("loginButton");

    const buttonText =
        loginButton?.querySelector(".button-text");

    const buttonLoading =
        loginButton?.querySelector(".button-loading");

    const inputs =
        document.querySelectorAll(
            ".form-group input"
        );


    /* =================================================
       PASSWORD TOGGLE
    ================================================= */

    if (
        passwordInput &&
        togglePassword
    ) {

        togglePassword.addEventListener(
            "click",
            function () {

                const isPassword =
                    passwordInput.type === "password";

                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";


                /* Change icon */

                if (isPassword) {

                    togglePassword.textContent = "🙈";

                    togglePassword.classList.add(
                        "password-visible"
                    );

                } else {

                    togglePassword.textContent = "👁";

                    togglePassword.classList.remove(
                        "password-visible"
                    );
                }


                /* Keep focus */

                passwordInput.focus();
            }
        );
    }


    /* =================================================
       INPUT MICRO INTERACTION
    ================================================= */

    inputs.forEach(function (input) {

        input.addEventListener(
            "focus",
            function () {

                const group =
                    input.closest(".form-group");

                if (group) {
                    group.classList.add(
                        "input-focused"
                    );
                }
            }
        );


        input.addEventListener(
            "blur",
            function () {

                const group =
                    input.closest(".form-group");

                if (group) {
                    group.classList.remove(
                        "input-focused"
                    );
                }
            }
        );


        /* Typing effect */

        input.addEventListener(
            "input",
            function () {

                if (input.value.length > 0) {

                    input.classList.add(
                        "has-value"
                    );

                } else {

                    input.classList.remove(
                        "has-value"
                    );
                }
            }
        );
    });


    /* =================================================
       BUTTON RIPPLE
    ================================================= */

    if (loginButton) {

        loginButton.addEventListener(
            "click",
            function (event) {

                const rect =
                    loginButton.getBoundingClientRect();

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "button-ripple";


                ripple.style.left =
                    (event.clientX - rect.left) + "px";

                ripple.style.top =
                    (event.clientY - rect.top) + "px";


                loginButton.appendChild(
                    ripple
                );


                setTimeout(function () {

                    ripple.remove();

                }, 700);
            }
        );
    }


    /* =================================================
       LOGIN SUBMIT LOADING
    ================================================= */

    if (loginForm && loginButton) {

        loginForm.addEventListener(
            "submit",
            function () {

                loginButton.disabled = true;

                loginButton.classList.add(
                    "is-loading"
                );


                if (buttonText) {
                    buttonText.style.display =
                        "none";
                }


                if (buttonLoading) {
                    buttonLoading.style.display =
                        "inline";
                }
            }
        );
    }


    /* =================================================
       ENTER KEY
    ================================================= */

    if (loginForm) {

        loginForm.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    const activeElement =
                        document.activeElement;

                    if (
                        activeElement &&
                        activeElement.tagName === "INPUT"
                    ) {

                        event.preventDefault();

                        loginForm.requestSubmit();
                    }
                }
            }
        );
    }


    /* =================================================
       CREATE FLOATING PARTICLES
    ================================================= */

    if (page) {

        const particleCount = 18;

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            const particle =
                document.createElement("span");

            particle.classList.add(
                "login-particle"
            );


            /* Random size */

            const randomSize =
                Math.random();

            if (randomSize < .45) {

                particle.classList.add(
                    "small"
                );

            } else if (
                randomSize < .85
            ) {

                particle.classList.add(
                    "medium"
                );

            } else {

                particle.classList.add(
                    "large"
                );
            }


            /* Random position */

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.top =
                Math.random() * 100 + "%";


            /* Random animation */

            particle.style.setProperty(
                "--duration",
                (5 + Math.random() * 7) + "s"
            );

            particle.style.setProperty(
                "--delay",
                (-Math.random() * 8) + "s"
            );


            page.appendChild(
                particle
            );
        }
    }


    /* =================================================
       MOUSE PARALLAX
    ================================================= */

    if (
        page &&
        loginBox &&
        window.matchMedia(
            "(min-width: 901px)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        document.addEventListener(
            "mousemove",
            function (event) {

                mouseX =
                    (event.clientX /
                        window.innerWidth -
                        .5) * 2;

                mouseY =
                    (event.clientY /
                        window.innerHeight -
                        .5) * 2;
            }
        );


        function animateParallax() {

            currentX +=
                (mouseX - currentX) * .035;

            currentY +=
                (mouseY - currentY) * .035;


            loginBox.style.transform =
                `
                translate3d(
                    ${currentX * 4}px,
                    ${currentY * 3}px,
                    0
                )
                rotateY(${currentX * 1.2}deg)
                rotateX(${currentY * -1.2}deg)
                `;


            requestAnimationFrame(
                animateParallax
            );
        }


        animateParallax();
    }


    /* =================================================
       INPUT CURSOR GLOW EFFECT
    ================================================= */

    inputs.forEach(function (input) {

        input.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    input.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                input.style.background =
                    `
                    radial-gradient(
                        circle at
                        ${x}px ${y}px,
                        rgba(163,38,59,.035),
                        rgba(255,255,255,.95)
                        150px
                    )
                    `;
            }
        );


        input.addEventListener(
            "mouseleave",
            function () {

                if (
                    document.activeElement !== input
                ) {

                    input.style.background =
                        "rgba(255,255,255,.85)";
                }
            }
        );
    });


    /* =================================================
       ERROR ALERT AUTO ANIMATION
    ================================================= */

    const errorAlert =
        document.querySelector(".alert-error");

    if (errorAlert) {

        setTimeout(function () {

            errorAlert.classList.add(
                "error-active"
            );

        }, 100);


        /* Optional: remove after 8 seconds */

        setTimeout(function () {

            errorAlert.style.transition =
                "opacity .5s ease, transform .5s ease";

            errorAlert.style.opacity = "0";

            errorAlert.style.transform =
                "translateY(-8px)";


            setTimeout(function () {

                errorAlert.style.display =
                    "none";

            }, 500);

        }, 8000);
    }


    /* =================================================
       AUTO FOCUS USERNAME
    ================================================= */

    const usernameInput =
        document.getElementById("username");

    if (
        usernameInput &&
        window.innerWidth > 600
    ) {

        setTimeout(function () {

            usernameInput.focus();

        }, 1100);
    }


    /* =================================================
       PAGE VISIBILITY
    ================================================= */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden
            ) {

                document.title =
                    "Kembali ke Login | Walikota Medan";

            } else {

                document.title =
                    "Login | Walikota Medan";
            }
        }
    );


    /* =================================================
       PREVENT DOUBLE CLICK
    ================================================= */

    if (loginButton) {

        let clicked = false;

        loginButton.addEventListener(
            "click",
            function () {

                if (clicked) {
                    return;
                }

                clicked = true;

                setTimeout(function () {

                    clicked = false;

                }, 1500);
            }
        );
    }

});