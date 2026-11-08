document.addEventListener("DOMContentLoaded", function () {


    /* =========================================================
       TYPING TEXT
    ========================================================= */

    const typingText =
        document.getElementById("typingText");


    const words = [
        "SISTEM INFORMASI PENYEDIAAN KONSUMSI RAPAT",
        "WALI KOTA MEDAN",
        "RASA MANADO"
    ];


    let wordIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    const typingSpeed = 75;

    const deletingSpeed = 45;

    const pauseAfterTyping = 1800;

    const pauseAfterDeleting = 450;


    function typingAnimation() {

        if (!typingText) {
            return;
        }


        const currentWord =
            words[wordIndex];


        /* MENGETIK */

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    characterIndex + 1
                );


            characterIndex++;


            if (
                characterIndex ===
                currentWord.length
            ) {

                deleting = true;


                setTimeout(
                    typingAnimation,
                    pauseAfterTyping
                );


                return;
            }


            setTimeout(
                typingAnimation,
                typingSpeed
            );


            return;
        }


        /* MENGHAPUS */

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );


        characterIndex--;


        if (characterIndex <= 0) {

            characterIndex = 0;

            deleting = false;

            wordIndex++;


            if (
                wordIndex >=
                words.length
            ) {

                wordIndex = 0;
            }


            setTimeout(
                typingAnimation,
                pauseAfterDeleting
            );


            return;
        }


        setTimeout(
            typingAnimation,
            deletingSpeed
        );
    }


    setTimeout(
        typingAnimation,
        900
    );



    /* =========================================================
       MAKANAN MENGHINDARI MOUSE
    ========================================================= */

    const foods =
        document.querySelectorAll(".food");


    foods.forEach(function (food) {


        let offsetX = 0;

        let offsetY = 0;

        let targetX = 0;

        let targetY = 0;


        let rotation = 0;

        let targetRotation = 0;


        /* -----------------------------------------------------
           SMOOTH MOVEMENT
        ----------------------------------------------------- */

        function smoothMove() {

            offsetX +=
                (targetX - offsetX) *
                .08;


            offsetY +=
                (targetY - offsetY) *
                .08;


            rotation +=
                (targetRotation - rotation) *
                .08;


            food.style.setProperty(
                "--mouse-x",
                `${offsetX}px`
            );


            food.style.setProperty(
                "--mouse-y",
                `${offsetY}px`
            );


            food.style.setProperty(
                "--mouse-rotate",
                `${rotation}deg`
            );


            requestAnimationFrame(
                smoothMove
            );
        }


        smoothMove();



        /* -----------------------------------------------------
           MOUSE
        ----------------------------------------------------- */

        document.addEventListener(
            "mousemove",
            function (event) {


                const rect =
                    food.getBoundingClientRect();


                const foodX =
                    rect.left +
                    rect.width / 2;


                const foodY =
                    rect.top +
                    rect.height / 2;


                const mouseX =
                    event.clientX;


                const mouseY =
                    event.clientY;


                const distanceX =
                    mouseX - foodX;


                const distanceY =
                    mouseY - foodY;


                const distance =
                    Math.sqrt(
                        distanceX *
                        distanceX +
                        distanceY *
                        distanceY
                    );


                const dangerDistance =
                    150;


                if (
                    distance <
                    dangerDistance &&
                    rect.top > -100 &&
                    rect.bottom <
                    window.innerHeight + 100
                ) {


                    let directionX =
                        -distanceX;


                    let directionY =
                        -distanceY;


                    const length =
                        Math.sqrt(
                            directionX *
                            directionX +
                            directionY *
                            directionY
                        );


                    if (length > 0) {

                        directionX /=
                            length;

                        directionY /=
                            length;
                    }


                    const strength =
                        (
                            dangerDistance -
                            distance
                        ) /
                        dangerDistance;


                    targetX =
                        directionX *
                        120 *
                        strength;


                    targetY =
                        directionY *
                        55 *
                        strength -
                        30 *
                        strength;


                    targetRotation =
                        directionX *
                        20;

                } else {


                    targetX *= .92;

                    targetY *= .92;

                    targetRotation *= .90;
                }

            }
        );



        /* -----------------------------------------------------
           TOUCH HP
        ----------------------------------------------------- */

        food.addEventListener(
            "touchstart",
            function () {

                targetX =
                    (
                        Math.random() > .5
                            ? 1
                            : -1
                    ) *
                    (
                        90 +
                        Math.random() * 60
                    );


                targetY =
                    -70 -
                    Math.random() * 50;


                targetRotation =
                    (
                        Math.random() > .5
                            ? 1
                            : -1
                    ) *
                    20;
            }
        );



        /* -----------------------------------------------------
           MOUSE MASUK KE MAKANAN
        ----------------------------------------------------- */

        food.addEventListener(
            "mouseenter",
            function () {

                targetX =
                    (
                        Math.random() > .5
                            ? 1
                            : -1
                    ) *
                    (
                        100 +
                        Math.random() * 70
                    );


                targetY =
                    -60 -
                    Math.random() * 50;


                targetRotation =
                    (
                        Math.random() > .5
                            ? 1
                            : -1
                    ) *
                    (
                        15 +
                        Math.random() * 20
                    );
            }
        );

    });



    /* =========================================================
       HERO PARALLAX
    ========================================================= */

    const heroContent =
        document.querySelector(
            ".hero-content"
        );


    if (heroContent) {

        let currentX = 0;

        let currentY = 0;

        let targetX = 0;

        let targetY = 0;


        document.addEventListener(
            "mousemove",
            function (event) {


                if (
                    window.innerWidth <= 900
                ) {
                    return;
                }


                const centerX =
                    window.innerWidth / 2;


                const centerY =
                    window.innerHeight / 2;


                targetX =
                    (
                        event.clientX -
                        centerX
                    ) /
                    centerX *
                    5;


                targetY =
                    (
                        event.clientY -
                        centerY
                    ) /
                    centerY *
                    4;
            }
        );


        function animateParallax() {

            currentX +=
                (
                    targetX -
                    currentX
                ) *
                .06;


            currentY +=
                (
                    targetY -
                    currentY
                ) *
                .06;


            heroContent.style.transform =
                `
                translate(
                    calc(-50% + ${currentX}px),
                    calc(-48% + ${currentY}px)
                )
                `;


            requestAnimationFrame(
                animateParallax
            );
        }


        animateParallax();
    }



    /* =========================================================
       NAV LOGIN
    ========================================================= */

    const navLogin =
        document.querySelector(
            ".nav-login"
        );


    if (navLogin) {

        navLogin.addEventListener(
            "mouseenter",
            function () {

                navLogin.style.transform =
                    "translateY(-3px)";
            }
        );


        navLogin.addEventListener(
            "mouseleave",
            function () {

                navLogin.style.transform =
                    "translateY(0)";
            }
        );
    }



    /* =========================================================
       HERO BUTTON
    ========================================================= */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach(
        function (button) {


            button.addEventListener(
                "mouseenter",
                function () {

                    button.style.transform =
                        "translateY(-5px)";
                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.style.transform =
                        "translateY(0)";
                }
            );


            /* Ripple */

            button.addEventListener(
                "click",
                function (event) {


                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.style.position =
                        "absolute";


                    ripple.style.width =
                        "20px";


                    ripple.style.height =
                        "20px";


                    ripple.style.borderRadius =
                        "50%";


                    ripple.style.background =
                        "rgba(255,255,255,.35)";


                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left
                        ) + "px";


                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top
                        ) + "px";


                    ripple.style.transform =
                        "translate(-50%, -50%) scale(0)";


                    ripple.style.pointerEvents =
                        "none";


                    ripple.style.animation =
                        "heroRipple .65s ease-out forwards";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        function () {

                            ripple.remove();

                        },
                        700
                    );
                }
            );

        }
    );



    /* =========================================================
       TAMBAHKAN RIPPLE KEYFRAME
    ========================================================= */

    const style =
        document.createElement("style");


    style.textContent = `

        @keyframes heroRipple {

            from {
                opacity: .7;

                transform:
                    translate(-50%, -50%)
                    scale(0);
            }

            to {
                opacity: 0;

                transform:
                    translate(-50%, -50%)
                    scale(15);
            }

        }

    `;


    document.head.appendChild(style);



    /* =========================================================
       PREVENT SCROLL
    ========================================================= */

    document.addEventListener(
        "wheel",
        function (event) {

            event.preventDefault();

        },
        {
            passive: false
        }
    );


    document.addEventListener(
        "touchmove",
        function (event) {

            event.preventDefault();

        },
        {
            passive: false
        }
    );



    /* =========================================================
       KEYBOARD
    ========================================================= */

    window.addEventListener(
        "keydown",
        function (event) {


            const blockedKeys = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                " ",
                "PageUp",
                "PageDown",
                "Home",
                "End"
            ];


            if (
                blockedKeys.includes(
                    event.key
                )
            ) {

                event.preventDefault();
            }

        }
    );

});