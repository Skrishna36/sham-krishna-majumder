/* ==========================================================================
   SITE CONTENT — edit this file to update the website.
   Set a value to null (or "") to hide it. Anything marked PLACEHOLDER should
   be replaced when you have the real information.
   ========================================================================== */
window.SITE = {
  lastUpdated: "2026-10-28", // edit manually (YYYY-MM-DD)

  person: {
    name: "Sham Krishna Majumder",
    role: "M.S. Candidate in Physics",
    affiliation: "University of Dhaka, Bangladesh",
    headline: "Exploring critical phenomena and emergent behaviour in complex systems.",
    intro:
      "I am a physics researcher interested in statistical physics, percolation theory, critical phenomena, and non-equilibrium statistical mechanics. My work combines computational simulations, numerical analysis, and finite-size scaling to investigate phase transitions in disordered spatial networks.",
    portrait: "assets/img/profile2.jpeg" // e.g. "assets/img/portrait.jpg" — a labelled placeholder shows when null
  },

  links: {
    email: "shamkm00@gmail.com",// from CV
    github: "https://github.com/Skrishna36",
    linkedin: "https://www.linkedin.com/in/sham-krishna-majumder-5879443b8/", // from CV
    instagram: "https://www.instagram.com/krishnart0_0/", // art and other activities
    scholar: null, // optional: Google Scholar URL, shown only if set
    cv: "assets/cv/Sham_Krishna_Majumder_CV.pdf" // your CV PDF
  },

  research: [
    {
      id: "wpsl",
      status: "Ongoing",
      title: "Critical Phenomena and Phase Transitions on Weighted Planar Stochastic Lattices (WPSL)",
      summary:
        "A weighted planar stochastic lattice is a disordered planar network built by repeatedly splitting blocks at random. My work is on variants of the WPSL: I use bond and site percolation to determine which universality class each variant belongs to, and study how the class changes as the model shifts from one variant to another and for mixtures of them.",
      questions: [
        "Where are the critical thresholds of site and bond percolation on the WPSL and its variants?",
        "How do order parameters behave near the transition, and what are the scaling relations among the exponents?",
        "Which universal exponent sets describe these lattices, and are they consistent with scaling and universality?"
      ],
      methods: ["Monte Carlo simulation", "Newman–Ziff algorithm", "Parallel C++/OpenMP on Linux servers", "Shannon entropy", "Binder cumulants", "Finite-size scaling", "Data collapse"]
    },
    {
      id: "percolation",
      status: "Ongoing",
      title: "Site and Bond Percolation: Thresholds, Order Parameters, and Universal Exponents",
      summary:
        "Percolation asks when a random system first becomes connected across its whole extent. It is a minimal model of a continuous phase transition, and its critical exponents are used to sort systems into universality classes.",
      questions: [
        "How can critical thresholds be located reliably from finite-size data?",
        "How do the order parameter and related observables scale near the threshold?",
        "Which exponents are universal, and which depend on the underlying structure?"
      ],
      methods: ["Site and bond percolation", "Critical-exponent and threshold analysis", "Finite-size scaling", "Data collapse"]
    },
    {
      id: "noneq",
      status: "Interest",
      title: "Non-equilibrium Statistical Mechanics and Disordered Systems",
      summary:
        "Many real systems are driven, irreversible, or structurally disordered, and so lie outside equilibrium statistical mechanics. My interest is in how collective behaviour emerges in disordered systems on complex spatial networks.",
      questions: [
        "How does disorder change collective and critical behaviour?",
        "What can stochastic processes such as random walks reveal about disordered media?"
      ],
      methods: ["Monte Carlo simulation", "Stochastic processes", "Numerical analysis"]
    },
    {
      id: "related",
      status: "Interest",
      title: "Related Interests: Condensed Matter Physics, Biophysics, and Non-linear Dynamics",
      summary:
        "The ideas of critical phenomena and complex systems carry naturally into condensed matter physics, biological systems and non-linear dynamics. I follow these areas as directions for future study.",
      questions: [
        "Where do the tools of statistical physics transfer to biological and condensed-matter problems?",
        "How do non-linear interactions produce emergent structure?"
      ],
      methods: ["Computational modelling", "Statistical-physics methods"]
    }
  ],

  featured: {
    title: "Percolation on the Mixed Weighted Planar Stochastic Lattice, WPSL(0.5)",
    status: "Ongoing M.S. thesis research. Not yet published; results pending.",
    supervisor: "Dr. Md. Kamrul Hassan, University of Dhaka",
    period: "May 2025 – present",
    description:
      "My work is on variants of the WPSL, using bond and site percolation to determine the universality class of each and to see how that class changes with the shift between models and with mixtures of them. The two limiting members are WPSL2, where each chosen block is split by two perpendicular cracks, and WPSL1, where it is split by one; earlier work places them in different universality classes. My thesis asks what happens on a hybrid lattice, WPSL(0.5), where the two generators are applied with equal probability at each step: does it interpolate between the parent classes, follow one of them, or define a new class?",
    objectivesTitle: "Thesis objectives",
    objectives: [
      "Construct the mixed lattice WPSL(0.5) by Monte Carlo simulation.",
      "Locate the site-percolation threshold from the spanning probability.",
      "Determine the exponents ν, β and γ by finite-size scaling and data collapse.",
      "Determine the specific-heat exponent α, not previously reported for WPSL variants, from the percolation entropy.",
      "Test the Rushbrooke inequality α + 2β + γ ≥ 2.",
      "Compare with WPSL1, WPSL2 and ordinary two-dimensional lattice percolation."
    ],
    methods: [
      "Monte Carlo simulation using the Newman–Ziff algorithm",
      "Parallel C++/OpenMP implementations on Linux servers",
      "Percolation observables and order parameters",
      "Shannon (percolation) entropy",
      "Binder cumulants",
      "Finite-size scaling and data collapse"
    ],
    figures: [
      { src: "assets/img/wpsl-lattice.png", label: "Lattice configuration", caption: "A configuration of the weighted planar stochastic lattice.", alt: "Black and white plot of a planar lattice of many rectangular blocks of varying size and aspect ratio" },
      { src: "assets/img/wpsl-spanning-probability.png", label: "Spanning probability", caption: "Spanning probability against occupation probability for several system sizes.", alt: "Plot of spanning probability against occupation probability with curves for four system sizes crossing near the threshold" },
      { src: "assets/img/wpsl-binder-cumulant.png", label: "Binder cumulant", caption: "Binder cumulant against occupation probability for several system sizes.", alt: "Plot of the Binder cumulant against occupation probability with curves for four system sizes crossing near the threshold" },
      { src: "assets/img/wpsl-spanning-collapse.png", label: "Spanning probability collapse", caption: "Data collapse of the spanning probability for several system sizes.", alt: "Spanning probability curves for four system sizes collapsing onto a single curve against the rescaled occupation probability" },
      { src: "assets/img/wpsl-binder-collapse.png", label: "Binder cumulant collapse", caption: "Data collapse of the Binder cumulant for several system sizes.", alt: "Binder cumulant curves for four system sizes collapsing onto a single curve against the rescaled occupation probability" },
      { src: "assets/img/wpsl-order-entropy.png", label: "Order parameter and entropy", caption: "Order parameter and percolation entropy against 1 \u2212 p.", alt: "Plot of the order parameter falling and the entropy rising as 1 minus the occupation probability increases" }
    ]
  },

  projectsMeta: "Selected academic project · Jan 2024 – Apr 2025 · Supervisor: Dr. Md. Kamrul Hassan", // from CV
  projects: [
    {
      id: "rw",
      title: "Monte Carlo Simulations of Random-Walk Variations",
      description: "One-dimensional random-walk simulations in C++ and Python: the distribution of the walker's position after N = 50, 100 and 200 steps compared with a Gaussian, and the first-return probability f(2k) compared with the exact result.",
      methods: ["Monte Carlo simulation", "C++ and Python implementations", "Comparison with exact results"],
      figures: [
        { src: "assets/img/rw-gaussian-collapse.png", label: "Position distribution for N = 50, 100, 200 against a Gaussian", alt: "Rescaled position distributions of a one-dimensional random walk for three step counts collapsing onto a Gaussian curve" },
        { src: "assets/img/rw-first-return-loglog.png", label: "First-return probability f(2k), simulation and exact, log-log", alt: "Log-log plot of the first-return probability of a random walk, simulation points on the exact curve" },
        { src: "assets/img/rw-first-return-cpp-python.png", label: "First-return probability f(2k): C++, Python and exact", alt: "Plot of the first-return probability from C++ and Python simulations agreeing with the exact curve" }
      ],
      link: "https://github.com/Skrishna36/Random-walk"
    },
    {
      id: "wpsl-deg",
      title: "Construction and Degree Distribution of the Weighted Planar Stochastic Lattice, WPSL1",
      description: "Constructing WPSL1 and measuring the degree distribution of its associated network.",
      methods: ["Lattice construction", "Degree-distribution analysis"],
      figure: { src: "assets/img/wpsl-lattice-wide.png", label: "WPSL1 lattice configuration", alt: "Black and white plot of a WPSL1 lattice made of many rectangular blocks" },
      link: "https://github.com/Skrishna36/weighted-planar-stochastic-lattice-"
    },
    {
      id: "wpsl2-spanning",
      meta: "",
      title: "Lattice, Degree Distribution and Spanning Probability of WPSL2",
      description: "A WPSL2 lattice configuration, the degree distribution of its network, and the spanning probability against occupation probability for lattice sizes L = 5000, 10000 and 15000.",
      methods: ["Lattice construction", "Degree-distribution analysis", "Monte Carlo simulation", "Spanning probability"],
      figures: [
        { src: "assets/img/wpsl2-lattice.png", label: "WPSL2 lattice configuration", alt: "Black and white plot of a WPSL2 lattice made of many rectangular blocks" },
        { src: "assets/img/wpsl2-degree-distribution.png", label: "WPSL2 degree distribution", alt: "Log-log plot of the degree distribution P(k) of the WPSL2 network with a straight-line fit" },
        { src: "assets/img/wpsl-spanning-large-sizes.png", label: "WPSL2 spanning probability, L = 5000, 10000, 15000", alt: "Spanning probability against occupation probability on WPSL2 for three lattice sizes" }
      ],
      link: "https://github.com/Skrishna36/weighted-planar-stochastic-lattice-"
    },
    {
      id: "sq-lattice",
      meta: "",
      title: "Percolation on the Square Lattice: Test Codes",
      description: "Test codes written to check that the percolation simulation procedures work correctly on the square lattice.",
      methods: ["Percolation simulation", "Code validation"],
      figure: { src: "assets/img/square-lattice-fss.png", label: "Square-lattice spanning probability and scaling", alt: "Four-panel plot of spanning probability, width scaling, shift versus width and data collapse for the square lattice" },
      link: "https://github.com/Skrishna36/percolation-on-square-lattice"
    }
  ],

  fellowships: [
    {
      date: "2025",
      title: "National Science and Technology (NST) Fellowship",
      org: "Ministry of Science and Technology, Government of Bangladesh",
      detail: "Awarded for M.S. thesis research.",
      kind: "Fellowship"
    }
  ],

  timeline: [
    {
      date: "May 2025 – expected December 2026",
      title: "M.S. in Physics",
      org: "University of Dhaka",
      detail: "Research areas: non-equilibrium statistical mechanics, percolation theory, and WPSL.",
      kind: "Education",
      courses: {
        credits: "Total credits: 30",
        groups: [
          { label: "Courses taken", items: ["Non-equilibrium Statistical Mechanics", "Condensed Matter and Material Science", "Quantum Field Theory I", "Advanced Laser Physics", "Atmospheric Physics"] }
        ]
      }
    },
    {
      date: "January 2020 – May 2025",
      title: "B.S. in Physics",
      org: "University of Dhaka",
      detail: "CGPA: 3.41/4.00.",
      kind: "Education",
      courses: {
        credits: "Total credits: 136",
        groups: [
          { label: "Statistical physics and computation", items: ["Statistical Mechanics", "Computational Physics", "Introduction to Computer Programming", "Mathematical Physics"] },
          { label: "Minor in Mathematics", items: ["Differential Calculus I+II", "Linear Algebra", "Ordinary Differential Equation", "Numerical Analysis", "Analytic and Vector Geometry"] },
          { label: "Minor in Statistics", items: ["Principle of Statistics", "Introduction to Probability"] },
          { label: "Condensed matter and materials", items: ["Solid State Physics I+II", "Introduction to Material Science and Nanotechnology"] },
          { label: "Quantum physics, optics and photonics", items: ["Quantum Mechanics I+II", "Laser and Photonics", "Optics", "Atomic and Molecular Physics"] },
          { label: "Classical and thermal physics", items: ["Classical Mechanics and Special Theory of Relativity", "Classical Electrodynamics", "Waves Oscillations Advanced Mechanics", "Mechanics and Properties of Matter", "Thermal Physics", "Electricity and Magnetism"] },
          { label: "Nuclear, particle and astrophysics", items: ["Nuclear and Particle Physics", "Nuclear Physics", "Introduction to Astrophysics"] },
          { label: "Electronics and experimental physics", items: ["Electronics I+II", "Methods of Experimental Physics", "Physics Lab (8 credits in every year)"] },
          { label: "Minor in Chemistry", items: ["Fundamentals of Chemistry, with a 4-credit Chemistry lab"] }
        ]
      }
    }
  ],

  teaching: [
    {
      date: "2024 – 2025",
      title: "Programming Instructor",
      org: "Physics Department Career Club, University of Dhaka",
      detail: "Taught C++ programming, object-oriented programming, memory management, and algorithmic problem-solving."
    },
    {
      date: "2022 – 2025",
      title: "Physics Instructor and Academic Tutor",
      org: "HSC-level physics coaching",
      detail: "Taught mechanics, electromagnetism, thermodynamics, and modern physics."
    }
  ],

  skills: [
    { group: "Programming", items: ["C++", "Python", "NumPy", "Matplotlib", "R", "MATLAB", "SQL"] },
    { group: "Scientific computing", items: ["Monte Carlo simulations", "OpenMP parallelization", "Finite-size scaling", "Data collapse", "Critical-exponent and threshold analysis"] },
    { group: "Tools", items: ["Linux/Bash", "Git", "Gnuplot", "LaTeX", "Remote high-performance computing workflows"] },
    { group: "Languages", items: ["Bengali (native)", "English (proficient; IELTS 7.5)"] }
  ],

  about: [
    "I am an M.S. candidate in Physics at the University of Dhaka, where I also completed my B.S. My central interest is statistical physics: how simple local rules in disordered systems give rise to collective behaviour and sharp phase transitions.",
    "Most of my research is computational. I study percolation and critical phenomena on weighted planar stochastic lattices under the supervision of Dr. Md. Kamrul Hassan, using Monte Carlo simulation, parallel C++ code, and finite-size scaling to extract thresholds and critical exponents from numerical data.",
    "Writing scientific code is a part of physics I enjoy for its own sake. I have taught C++, object-oriented programming and algorithmic problem-solving to fellow students, and physics to HSC-level students. Explaining an idea clearly is one of the best ways I know to understand it properly.",
    "Outside research I paint, draw, read, write, and sing. I hope to continue this work in a PhD programme and to collaborate with researchers who share these interests."
  ],

  interestsBlurb: "Painting and drawing in traditional and digital media, reading, creative writing, and singing.",
  interests: [
    { title: "Goddess Durga", caption: "Digital illustration of the Hindu goddess Durga.", src: "assets/img/art-durga.jpg", alt: "Digital painting of a woman in a red sari holding a glowing trident, standing on a fallen buffalo with a lion beside it" },
    { title: "Feluda illustration", caption: "Digital illustration of a scene from Satyajit Ray's film Joi Baba Felunath.", src: "assets/img/art-comic-page.jpg", alt: "Digital illustration from Joi Baba Felunath with a red-robed sadhu and a man in black", pos: "center top" },
    { title: "Book cover illustration", caption: "Digital cover art for the book \u09ac\u09bf\u09a6\u09cd\u09af\u09c1\u09ce\u09aa\u09b0\u09cd\u09a3\u09be.", src: "assets/img/art-cover-bidyutparna.jpg", alt: "Digital illustration of a woman seen through a cracked mirror, with coloured sticky notes", pos: "center 30%" },
    { title: "A preserved butterfly", caption: "An attempt at preserving and framing a butterfly I found.", src: "assets/img/craft-butterfly.jpg", alt: "A black and teal butterfly mounted in a black frame" }
  ],
  // Recognition for creative work (shown in the "Beyond research" section)
  recognition: {
    title: "Char Patar Comics: prize-winning short comic",
    text: "I made a short comic that won a prize in the Char Patar Comics competition run by Cartoon People Comics. The certificate records my selection as one of the top 10 entries of that edition, and the trophy is inscribed \u201cWinner\u201d (\u09ac\u09bf\u099c\u09af\u09bc\u09c0).",
    images: [
      { src: "assets/img/award-presentation.jpg", label: "Award presentation", caption: "The award presentation.", alt: "Four men standing together holding a framed certificate and a trophy" },
      { src: "assets/img/award-certificate.jpg", label: "Certificate", caption: "The certificate (in Bengali).", alt: "Black and white illustrated certificate in Bengali" },
      { src: "assets/img/award-trophy.jpg", label: "Trophy", caption: "The trophy.", alt: "An acrylic trophy reading Char Patar Comics, inscribed Winner in Bengali" }
    ],
    links: [
      { label: "Read the comic", href: "https://cartoonpeoplecomics.com/%e0%a6%86%e0%a6%97%e0%a7%81%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%a6%e0%a6%bf%e0%a6%a8/" }
    ]
  }
};
