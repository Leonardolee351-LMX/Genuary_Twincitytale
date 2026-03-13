(function() {
    // Prevent double navigation bars if loaded inside an iframe (e.g., in index.html)
    if (window.self !== window.top) {
        return;
    }

    // ==========================================
    // DATA & STATE
    // ==========================================
    const navStructure = [
        { 
            id: 'intro', 
            title: 'INTRO', 
            url: 'index.html', 
            match: (path, step) => path.includes("index.html") && (!step || step === '0') 
        },
        { 
            id: 'prologue', 
            title: 'PROLOGUE', 
            subtitle: 'DIVIDED DAY', 
            url: 'index.html?step=1', 
            match: (path, step) => path.includes("prologue.html") || (path.includes("index.html") && step === '1') 
        },
        { 
            id: 'ch2', 
            title: 'CHAPTER 1', 
            subtitle: 'THE FOLDED CITY', 
            url: 'index.html?step=2', 
            match: (path, step) => path.includes("Chapter1.HTML") || path.toLowerCase().includes("chapter1-1.html") || path.toLowerCase().includes("chapter1_dualcity.html") || (path.includes("index.html") && step === '2'),
            subchapters: [
                { title: '1.1 FLOWS', url: 'chapter1-1.html?section=1' },
                { title: '1.2 ANALYSIS', url: 'chapter1-1.html?section=2' },
                { title: '1.3 DUAL CITY', url: 'chapter1_DualCity.html' }
            ]
        },
        { 
            id: 'ch1', 
            title: 'CHAPTER 2', 
            subtitle: 'RECOVERY', 
            url: 'index.html?step=3', 
            match: (path, step) => path.includes("Chapter2.HTML") || path.toLowerCase().includes("chapter2_recovery.html") || path.toLowerCase().includes("chapter2_counterflow.html") || (path.includes("index.html") && step === '3'),
            subchapters: [
                { title: '2.1 RECOVERY', url: 'Chapter2_Recovery.html' },
                { title: '2.2 COUNTERFLOW', url: 'Chapter2_Counterflow.html' }
            ]
        },
        { 
            id: 'ch3', 
            title: 'CHAPTER 3', 
            subtitle: 'CONCRETE LIVES', 
            url: 'index.html?step=4', 
            match: (path, step) => path.includes("chapter3_persona.html") || path.includes("chapter3_timeline.html") || (path.includes("index.html") && step === '4'),
            subchapters: [
                { title: '3.1 PERSONA', url: 'Chapter3_Persona.HTML' },
                { title: '3.2 TIMELINE', url: 'Chapter3_Timeline.HTML' }
            ]
        },
        { 
            id: 'reflection', 
            title: 'REFLECTION', 
            subtitle: 'MINOR CRITICAL NOTES', 
            url: 'Chapter3_Phenomenon.HTML', 
            match: (path, step) => path.includes("chapter3_phenomenon.html")
        },
        { 
            id: 'epilogue', 
            title: 'EPILOGUE', 
            url: 'index.html?step=5', 
            match: (path, step) => path.includes("index.html") && step === '5',
            subchapters: [
                { title: 'Review', url: 'index.html?step=5' },
                { title: 'Reference', url: 'index.html?step=6' }
            ]
        }
    ];

    const path = window.location.pathname.toLowerCase();
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');
    // Find current active parent
    const currentParentIndex = navStructure.findIndex(item => item.match && item.match(path, stepParam));

    // ==========================================
    // CLEANUP & PREP
    // ==========================================
    document.querySelectorAll('.global-nav-container, .chapter-nav-container').forEach(el => el.remove());

    // ==========================================
    // STYLES
    // ==========================================
    // Inject Google Fonts if not present
    if (!document.getElementById('global-nav-fonts')) {
        const link = document.createElement('link');
        link.id = 'global-nav-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap';
        document.head.appendChild(link);
    }

    const style = document.createElement('style');
    style.innerHTML = `
        /* LAYOUT & OVERLAP FIX */
        .global-nav-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9999;
            height: 75px;
            background-color: white;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: transform 0.3s ease-in-out;
            transform: translateY(0);
            
            /* Flexbox layout to prevent overlap */
            display: flex;
            align-items: stretch;
            justify-content: space-between;
            padding: 0;
        }
        
        /* BODY PADDING FIX for all pages - FORCE override */
        body {
            padding-top: 75px !important; 
        }

        /* LOGO WRAPPER */
        .nav-logo-wrapper {
            display: flex;
            align-items: center;
            padding-left: 20px;
            width: 200px; /* Fixed width to prevent overlap */
            min-width: 200px;
            flex-shrink: 0;
            z-index: 10002;
            background-color: white; /* Ensure opaque */
        }

        /* PIN BUTTON WRAPPER */
        .nav-pin-wrapper {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 20px;
            width: 80px;
            min-width: 80px;
            flex-shrink: 0;
            z-index: 10001;
            background-color: white;
        }

        .nav-logo {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            text-decoration: none;
            cursor: pointer;
        }
        .nav-logo-title {
            font-family: 'Inter', sans-serif;
            font-weight: 900;
            font-size: 16px;
            letter-spacing: -0.02em;
            color: #1a1a1a;
            line-height: 1.1;
        }
        .nav-logo-subtitle {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-size: 10px;
            letter-spacing: 0.1em;
            color: #666;
            margin-top: 2px;
            text-transform: uppercase;
        }

        .nav-pin-button {
            background: none;
            border: none;
            cursor: pointer;
            color: #ccc;
            font-size: 14px;
            transition: all 0.3s ease;
            padding: 10px;
        }
        .nav-pin-button:hover, .global-nav-container.pinned .nav-pin-button {
            color: #00997A;
            transform: scale(1.1);
        }

        .main-nav-bar {
            display: flex;
            justify-content: center;
            align-items: stretch;
            flex-grow: 1;
            height: 100%;
            padding-top: 5px;
            min-width: 0;
            overflow: visible; /* Allow dropdowns to show */
        }

        /* Hidden state for smart hide (unpinned & scrolling down) */
        .global-nav-container.nav-hidden {
            transform: translateY(-100%);
        }

        .progress-bar-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: #f0f0f0;
            transition: opacity 0.3s;
            z-index: 10003; /* Above everything */
        }

        .progress-bar {
            width: 0%;
            height: 100%;
            background-color: #00997A; /* Green progress */
            transition: width 0.2s ease-out;
        }

        /* Nav Items Styles */
        .nav-item-wrapper {
             position: relative;
             display: flex;
             align-items: stretch;
             justify-content: center;
             flex-direction: column;
             margin: 0 8px; /* Reduced margin further */
             padding: 0 4px; /* Very small padding */
             min-width: 160px; /* Increased width significantly */
             cursor: pointer;
        }
        .nav-item-wrapper:hover {
            background-color: rgba(0,0,0,0.02);
        }

        .nav-item-link {
            text-decoration: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #999;
            transition: color 0.3s;
        }

        .nav-item-wrapper.active .nav-item-link {
            color: #00997A;
        }

        .nav-title {
            font-family: 'Inter', sans-serif; /* Changed to Sans-serif */
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
        .nav-subtitle {
            font-family: 'Inter', sans-serif; /* Changed to Sans-serif */
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.1em;
            margin-top: 4px;
            opacity: 0.7;
        }

        /* SUBCHAPTER DROPDOWN */
        .subchapter-dropdown {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0,0,0,0.05);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 8px;
            padding: 8px 0;
            min-width: 160px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 10005;
        }
        
        .subchapter-dropdown::before {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid rgba(255, 255, 255, 0.95);
        }

        .nav-item-wrapper:hover .subchapter-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }

        .subchapter-item {
            display: block;
            padding: 8px 16px;
            font-family: 'Inter', sans-serif; /* Changed to Sans-serif */
            font-size: 10px;
            color: #666;
            text-decoration: none;
            transition: all 0.2s;
            border-left: 2px solid transparent;
            white-space: nowrap;
            text-align: center;
        }

        .subchapter-item:hover {
            background-color: rgba(0, 153, 122, 0.05);
            color: #00997A;
            border-left-color: #00997A;
        }

        /* CARET INDICATOR */
        .nav-caret {
            font-size: 8px;
            margin-left: 4px;
            opacity: 0.5;
            transition: transform 0.3s;
        }
        .nav-item-wrapper:hover .nav-caret {
            transform: rotate(180deg);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // BUILD DOM
    // ==========================================
    const navContainer = document.createElement('div');
    navContainer.className = 'global-nav-container pinned'; // Default to pinned for now

    // Progress Bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBarContainer.appendChild(progressBar);
    navContainer.appendChild(progressBarContainer);

    // Logo
    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'nav-logo-wrapper';
    const logo = document.createElement('a');
    logo.className = 'nav-logo';
    logo.href = 'index.html';
    logo.innerHTML = `
        <span class="nav-logo-title">TWIN CITY</span>
        <span class="nav-logo-subtitle">TALES</span>
    `;
    logoWrapper.appendChild(logo);
    navContainer.appendChild(logoWrapper);

    // Main Nav Items
    const mainNavBar = document.createElement('div');
    mainNavBar.className = 'main-nav-bar';
    
    navStructure.forEach((item, index) => {
        // Skip items without titles (if any)
        if (!item.title) return;

        const navItemWrapper = document.createElement('div');
        navItemWrapper.className = `nav-item-wrapper ${index === currentParentIndex ? 'active' : ''}`;
        
        // Main Link (Parent)
        const link = document.createElement('a');
        link.className = 'nav-item-link';
        link.href = item.url;
        link.innerHTML = `
            <span class="nav-title">${item.title} ${item.subchapters ? '<i class="fas fa-chevron-down nav-caret"></i>' : ''}</span>
            ${item.subtitle ? `<span class="nav-subtitle">${item.subtitle}</span>` : ''}
        `;
        navItemWrapper.appendChild(link);

        // Subchapters Dropdown
        if (item.subchapters && item.subchapters.length > 0) {
            const dropdown = document.createElement('div');
            dropdown.className = 'subchapter-dropdown';
            
            item.subchapters.forEach(sub => {
                const subLink = document.createElement('a');
                subLink.className = 'subchapter-item';
                subLink.href = sub.url;
                subLink.textContent = sub.title;
                dropdown.appendChild(subLink);
            });
            navItemWrapper.appendChild(dropdown);
        }

        mainNavBar.appendChild(navItemWrapper);
    });
    navContainer.appendChild(mainNavBar);

    // Pin Button
    const pinWrapper = document.createElement('div');
    pinWrapper.className = 'nav-pin-wrapper';
    const pinButton = document.createElement('button');
    pinButton.className = 'nav-pin-button';
    pinButton.innerHTML = '<i class="fas fa-thumbtack"></i>';
    pinButton.title = "Toggle Sticky Nav";
    
    // Pin Logic
    const isPinned = localStorage.getItem('navPinned') === 'true';
    if (isPinned) {
        navContainer.classList.add('pinned');
        pinButton.style.color = '#00997A';
    } else {
        navContainer.classList.remove('pinned');
    }

    pinButton.onclick = () => {
        navContainer.classList.toggle('pinned');
        const pinned = navContainer.classList.contains('pinned');
        localStorage.setItem('navPinned', pinned);
        pinButton.style.color = pinned ? '#00997A' : '#ccc';
    };
    pinWrapper.appendChild(pinButton);
    navContainer.appendChild(pinWrapper);

    document.body.appendChild(navContainer);

    // ==========================================
    // SCROLL & PROGRESS LOGIC
    // ==========================================
    let lastScrollTop = 0;
    let ticking = false;

    // Total segments calculation
    // Ch1: 2 segments
    // Ch2: 3 segments
    // Ch3: 2 segments
    // Reflection: 1 segment
    // Total = 8 segments for the main content
    // We map the progress bar 0-100% to these 8 segments.
    // Intro/Prologue/Epilogue are ignored for the "reading progress" or we can map them to 0% and 100%.
    // Let's stick to the user's request: "2.1 is 1/3 of Chapter 2".
    
    const TOTAL_SEGMENTS = 8; 

    const updateState = () => {
        // 1. Smart Hide Logic
        let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (!navContainer.classList.contains('pinned')) {
            if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                navContainer.classList.add('nav-hidden');
            } else {
                navContainer.classList.remove('nav-hidden');
            }
        }
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;

        // 2. Global Progress Logic
        let globalProgress = 0;
        let segmentIndex = 0; // 0 to 7
        let localPercent = 0;
        let isValidChapter = false;

        if (currentParentIndex !== -1) {
            const currentChapter = navStructure[currentParentIndex];

            // CHAPTER 1
            if (currentChapter.id === 'ch1') {
                isValidChapter = true;
                // Detect if we are in 1.1 or 1.2
                // Since 1.2 is an anchor #section-4, we use scroll position approximation if on same page
                // Or if we assume the user just scrolls down.
                // Let's treat Ch1 as one big page with 2 segments.
                // So localPercent of the page maps to 2 segments.
                const localScrollTop = window.scrollY || document.documentElement.scrollTop;
                const localScrollHeight = document.documentElement.scrollHeight;
                const localClientHeight = document.documentElement.clientHeight;
                
                if (localScrollHeight > localClientHeight) {
                    localPercent = localScrollTop / (localScrollHeight - localClientHeight);
                }

                // Ch1 is segment 0 and 1.
                // So progress = (0 + localPercent * 2) / 8
                segmentIndex = 0;
                globalProgress = (segmentIndex + (localPercent * 2)) / TOTAL_SEGMENTS;
            }
            // CHAPTER 2
            else if (currentChapter.id === 'ch2') {
                isValidChapter = true;
                // Ch2 has 3 segments: 2.1 (Index 2), 2.2 (Index 3), 2.3 (Index 4)
                let subIndex = 0;
                
                if (path.toLowerCase().includes('chapter1_dualcity.html')) {
                    subIndex = 2;
                } else {
                    const section = urlParams.get('section') || '1';
                    subIndex = parseInt(section) - 1; // 0, 1
                }
                
                segmentIndex = 2 + subIndex;
                
                let localScrollTop = window.scrollY || document.documentElement.scrollTop;
                let localScrollHeight = document.documentElement.scrollHeight;
                let localClientHeight = document.documentElement.clientHeight;
                
                if (localScrollHeight > localClientHeight) {
                    localPercent = localScrollTop / (localScrollHeight - localClientHeight);
                }

                globalProgress = (segmentIndex + localPercent) / TOTAL_SEGMENTS;
            }
            // CHAPTER 3
            else if (currentChapter.id === 'ch3') {
                isValidChapter = true;
                // Ch3 has 2 segments: 3.1 (Index 5), 3.2 (Index 6)
                let subIndex = 0;
                if (path.includes('timeline')) subIndex = 1;

                segmentIndex = 5 + subIndex;

                let localScrollTop = window.scrollY || document.documentElement.scrollTop;
                let localScrollHeight = document.documentElement.scrollHeight;
                let localClientHeight = document.documentElement.clientHeight;

                const content = document.getElementById('contentSection');
                if (content && content.scrollHeight > content.clientHeight) {
                     localScrollTop = content.scrollTop;
                     localScrollHeight = content.scrollHeight;
                     localClientHeight = content.clientHeight;
                     currentScrollTop = localScrollTop;
                }

                if (localScrollHeight > localClientHeight) {
                    localPercent = localScrollTop / (localScrollHeight - localClientHeight);
                }

                globalProgress = (segmentIndex + localPercent) / TOTAL_SEGMENTS;
            }
            // REFLECTION PAGE
            else if (currentChapter.id === 'reflection') {
                isValidChapter = true;
                segmentIndex = 7;

                let localScrollTop = window.scrollY || document.documentElement.scrollTop;
                let localScrollHeight = document.documentElement.scrollHeight;
                let localClientHeight = document.documentElement.clientHeight;

                if (localScrollHeight > localClientHeight) {
                    localPercent = localScrollTop / (localScrollHeight - localClientHeight);
                }

                globalProgress = (segmentIndex + localPercent) / TOTAL_SEGMENTS;
            }
        }

        // Clamp
        globalProgress = Math.max(0, Math.min(1, globalProgress));
        progressBar.style.width = `${globalProgress * 100}%`;

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateState);
            ticking = true;
        }
    });
    
    // Check for internal scrollers
    setInterval(() => {
        const containers = document.querySelectorAll('.panel-scroll-area, #contentSection');
        containers.forEach(c => {
            if (!c.hasAttribute('data-scroll-listener')) {
                c.addEventListener('scroll', () => {
                    if (!ticking) {
                        window.requestAnimationFrame(updateState);
                        ticking = true;
                    }
                });
                c.setAttribute('data-scroll-listener', 'true');
            }
        });
    }, 2000);
    
    // Initial call
    updateState();

})();
