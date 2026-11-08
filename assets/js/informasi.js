/* =====================================================
   INFORMASI.JS
===================================================== */


/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById("navbar");


function navbarScroll() {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    navbarScroll,
    { passive: true }
);

navbarScroll();



/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll(
    '.nav-menu a[href^="#"], .hero-btn'
).forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const href =
                this.getAttribute("href");

            const target =
                document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const offset =
                navbar
                    ? navbar.offsetHeight
                    : 0;

            window.scrollTo({

                top:
                    target.offsetTop -
                    offset -
                    10,

                behavior: "smooth"

            });

        }
    );

});



/* =====================================================
   ACTIVE NAV
===================================================== */

const pageSections =
    document.querySelectorAll(
        "section[id]"
    );

const navigationLinks =
    document.querySelectorAll(
        ".nav-menu a[href^='#']"
    );


function updateNavigation() {

    let current = "";

    const position =
        window.scrollY +
        window.innerHeight * .35;


    pageSections.forEach(section => {

        if (
            position >= section.offsetTop &&
            position <
            section.offsetTop +
            section.offsetHeight
        ) {

            current =
                section.id;

        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
);

updateNavigation();



/* =====================================================
   REMPAH JATUH
===================================================== */

const spices =
    document.querySelectorAll(".spice");

const spiceData = [];

const hero =
    document.querySelector(".info-hero");


if (hero && spices.length) {

    const heroHeight =
        hero.offsetHeight;


    spices.forEach((spice, index) => {

        const data = {

            element: spice,

            x:
                Math.random() *
                window.innerWidth,

            y:
                -100 -
                Math.random() * 600,

            speed:
                0.7 +
                Math.random() * 1.2,

            rotation:
                Math.random() * 360,

            rotationSpeed:
                -1.5 +
                Math.random() * 3,

            size:
                38 +
                Math.random() * 25,

            dodgeX: 0,

            dodgeY: 0

        };


        spice.style.width =
            data.size + "px";

        spice.style.height =
            data.size + "px";


        spiceData.push(data);

    });



    function animateSpices() {

        const rect =
            hero.getBoundingClientRect();


        spiceData.forEach(data => {

            data.y += data.speed;

            data.rotation +=
                data.rotationSpeed;


            /*
             * Kalau sudah melewati
             * bawah hero, kembali ke atas
             */

            if (
                data.y >
                heroHeight + 100
            ) {

                data.y =
                    -120 -
                    Math.random() * 300;

                data.x =
                    Math.random() *
                    window.innerWidth;

            }


            /*
             * Perlahan kembalikan
             * posisi dodge
             */

            data.dodgeX *= .92;
            data.dodgeY *= .92;


            data.element.style.transform =
                `
                translate3d(
                    ${data.dodgeX}px,
                    ${data.dodgeY}px,
                    0
                )
                rotate(${data.rotation}deg)
                `;


            data.element.style.left =
                data.x + "px";

            data.element.style.top =
                data.y + "px";

        });


        requestAnimationFrame(
            animateSpices
        );

    }


    animateSpices();



    /* =================================================
       KURSOR → REMPAH MENGHINDAR
    ================================================= */

    hero.addEventListener(
        "mousemove",
        function(event) {

            spiceData.forEach(data => {

                const rect =
                    data.element.getBoundingClientRect();


                const spiceX =
                    rect.left +
                    rect.width / 2;


                const spiceY =
                    rect.top +
                    rect.height / 2;


                const mouseX =
                    event.clientX;


                const mouseY =
                    event.clientY;


                const dx =
                    spiceX - mouseX;


                const dy =
                    spiceY - mouseY;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                const dangerDistance =
                    110;


                if (
                    distance <
                    dangerDistance
                ) {

                    const force =
                        (
                            dangerDistance -
                            distance
                        ) /
                        dangerDistance;


                    const angle =
                        Math.atan2(
                            dy,
                            dx
                        );


                    data.dodgeX +=
                        Math.cos(angle) *
                        force *
                        15;


                    data.dodgeY +=
                        Math.sin(angle) *
                        force *
                        15;

                }

            });

        }
    );

}



/* =====================================================
   TOUCH HP
===================================================== */

hero?.addEventListener(
    "touchmove",
    function(event) {

        const touch =
            event.touches[0];

        if (!touch) return;


        spiceData.forEach(data => {

            const rect =
                data.element.getBoundingClientRect();


            const spiceX =
                rect.left +
                rect.width / 2;


            const spiceY =
                rect.top +
                rect.height / 2;


            const dx =
                spiceX -
                touch.clientX;


            const dy =
                spiceY -
                touch.clientY;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (distance < 120) {

                const angle =
                    Math.atan2(dy, dx);


                data.dodgeX +=
                    Math.cos(angle) * 18;


                data.dodgeY +=
                    Math.sin(angle) * 18;

            }

        });

    },
    {
        passive: true
    }
);



/* =====================================================
   MODAL DETAIL
===================================================== */

const modal =
    document.getElementById(
        "detailModal"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalDescription =
    document.getElementById(
        "modalDescription"
    );

const modalPrice =
    document.getElementById(
        "modalPrice"
    );


document.querySelectorAll(
    ".detail-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        function() {

            if (!modal) return;


            modalTitle.textContent =
                this.dataset.title ||
                "Detail Menu";


            modalDescription.textContent =
                this.dataset.detail ||
                "Informasi menu";


            modalPrice.textContent =
                this.dataset.price ||
                "Harga belum tersedia";


            modal.classList.add("show");


            document.body.style.overflow =
                "hidden";

        }
    );

});



function closeModal() {

    if (!modal) return;

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

}


modalClose?.addEventListener(
    "click",
    closeModal
);


modal?.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);



/* =====================================================
   ANIMASI SAAT SCROLL
===================================================== */

const animated =
    document.querySelectorAll(
        ".menu-card, .leader-card, .news-card, .review-card, .flow-card, .location-section, .rasa-intro"
    );


animated.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

});


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    !entry.isIntersecting
                ) {

                    return;

                }


                entry.target.style.opacity =
                    "1";


                entry.target.style.transform =
                    "translateY(0)";


                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: .12
        }
    );


animated.forEach(element => {

    observer.observe(element);

});



/* =====================================================
   HENTIKAN ANIMASI SAAT REDUCED MOTION
===================================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    document
        .querySelectorAll(
            ".moving-track, .news-track"
        )
        .forEach(element => {

            element.style.animation =
                "none";

        });

}
/* =====================================================
   RASA MANADO AUTO SLIDER
===================================================== */

const rasaSlides =
    document.querySelectorAll(".rasa-slide");

const rasaCurrent =
    document.getElementById("rasaCurrent");


if (rasaSlides.length) {

    let rasaIndex = 0;

    const rasaDuration = 5500;


    function changeRasaSlide() {

        const currentSlide =
            rasaSlides[rasaIndex];


        currentSlide.classList.remove("active");


        rasaIndex++;


        if (
            rasaIndex >=
            rasaSlides.length
        ) {

            rasaIndex = 0;

        }


        const nextSlide =
            rasaSlides[rasaIndex];


        nextSlide.classList.add("active");


        if (rasaCurrent) {

            rasaCurrent.textContent =
                String(rasaIndex + 1)
                .padStart(2, "0");

        }

    }


    setInterval(
        changeRasaSlide,
        rasaDuration
    );

}
/* =====================================================
   MODERN MAP — KANTOR WALI KOTA MEDAN
   MAPCN STYLE
===================================================== */

const medanMapElement =
    document.getElementById("medanMap");


if (medanMapElement) {

    import(
        "https://unpkg.com/maplibre-gl@6.7.0/dist/maplibre-gl.mjs"
    )
    .then(maplibregl => {

       const medanCenter = [
    98.6748504,
    3.5904796
];

        const medanMap =
            new maplibregl.Map({

                container:
                    "medanMap",

                style:
                    "https://tiles.openfreemap.org/styles/dark",

                center:
                    medanCenter,

                zoom:
                    15.2,

                pitch:
                    38,

                bearing:
                    -12,

                maxZoom:
                    19,

                minZoom:
                    11,

                attributionControl:
                    true

            });


        /* =================================================
           CONTROL
        ================================================= */

        medanMap.addControl(

            new maplibregl.NavigationControl({
                showCompass: true,
                showZoom: true,
                visualizePitch: true
            }),

            "bottom-right"

        );


        medanMap.addControl(

            new maplibregl.ScaleControl({
                maxWidth: 100,
                unit: "metric"
            }),

            "bottom-left"

        );


        /* =================================================
           CUSTOM MARKER
        ================================================= */

        const markerElement =
            document.createElement("div");

        markerElement.className =
            "medan-map-marker";


        const popup =
            new maplibregl.Popup({

                offset: 22,

                closeButton: false,

                closeOnClick: false

            })
            .setHTML(`

                <div style="
                    font-family:Poppins,sans-serif;
                    min-width:180px;
                ">

                    <div style="
                        color:#ff526d;
                        font-size:8px;
                        font-weight:800;
                        letter-spacing:2px;
                        margin-bottom:5px;
                    ">
                        LOKASI
                    </div>

                    <div style="
                        font-size:13px;
                        font-weight:800;
                        margin-bottom:5px;
                    ">
                        Kantor Wali Kota Medan
                    </div>

                    <div style="
                        color:#98a2b3;
                        font-size:9px;
                        line-height:1.6;
                    ">
                        Jl. Kapten Maulana Lubis No. 1,
                        Medan
                    </div>

                </div>

            `);


        new maplibregl.Marker({
            element:
                markerElement,

            anchor:
                "center"
        })

        .setLngLat(
            medanCenter
        )

        .setPopup(
            popup
        )

        .addTo(
            medanMap
        );


        /* =================================================
           LOAD
        ================================================= */

        medanMap.on(
            "load",
            function() {

                medanMap.resize();

                setTimeout(
                    function() {

                        medanMap.resize();

                    },
                    300
                );

            }
        );


        /* =================================================
           RESIZE
        ================================================= */

        window.addEventListener(
            "resize",
            function() {

                medanMap.resize();

            },
            {
                passive: true
            }
        );


    })

    .catch(error => {

        console.error(
            "Map Kantor Wali Kota gagal dimuat:",
            error
        );

    });

}