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
            url: 'Chapter2_Recovery_Redesign.html', 
            match: (path, step) => path.includes("Chapter2.HTML") || path.toLowerCase().includes("chapter2_recovery.html") || path.toLowerCase().includes("chapter2_counterflow.html") || path.toLowerCase().includes("chapter2_recovery_redesign.html") || path.toLowerCase().includes("chapter2_counterflow_redesign.html") || (path.includes("index.html") && step === '3'),
            subchapters: [
                { title: '2.1 RECOVERY', url: 'Chapter2_Recovery_Redesign.html' },
                { title: '2.2 COUNTERFLOW', url: 'Chapter2_Counterflow_Redesign.html' }
            ]
        },
        { 
            id: 'ch3', 
            title: 'CHAPTER 3', 
            subtitle: 'CONCRETE LIVES', 
            url: 'Chapter3_Persona.HTML', 
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

    const segmentMeta = [
        { label: 'INTRO', url: 'index.html?step=0' },
        { label: 'PROLOGUE', url: 'index.html?step=1' },
        { label: '1.1 FLOWS', url: 'chapter1-1.html?section=1' },
        { label: '1.2 ANALYSIS', url: 'chapter1-1.html?section=2' },
        { label: '1.3 DUAL CITY', url: 'chapter1_DualCity.html' },
        { label: '2.1 RECOVERY', url: 'Chapter2_Recovery_Redesign.html' },
        { label: '2.2 COUNTERFLOW', url: 'Chapter2_Counterflow_Redesign.html' },
        { label: '3.1 PERSONA', url: 'Chapter3_Persona.HTML' },
        { label: '3.2 TIMELINE', url: 'Chapter3_Timeline.HTML' },
        { label: 'REFLECTION', url: 'Chapter3_Phenomenon.HTML' },
        { label: 'EPILOGUE · REVIEW', url: 'index.html?step=5' },
        { label: 'EPILOGUE · REF', url: 'index.html?step=6' }
    ];

    const TOTAL_SEGMENTS = segmentMeta.length;
    const boundaryTickIndex = new Set([0, 1, 2, 5, 7, 9, 10, TOTAL_SEGMENTS]);

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
            isolation: isolate;
            
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
            gap: 10px;
            padding-right: 20px;
            width: auto;
            min-width: 80px;
            flex-shrink: 0;
            z-index: 10001;
            background-color: white;
        }

        .nav-progress-chip {
            display: inline-flex;
            align-items: center;
            height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(15, 23, 42, 0.92);
            background: rgba(255, 255, 255, 0.92);
            border: 1px solid rgba(15, 23, 42, 0.10);
            box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
            margin-right: 10px;
            white-space: nowrap;
            max-width: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            pointer-events: none;
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
            gap: clamp(6px, 1.4vw, 18px);
            padding-left: clamp(8px, 1.4vw, 22px);
            padding-right: clamp(8px, 1.4vw, 22px);
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
            height: 12px;
            background: rgba(224, 242, 254, 0.95);
            transition: opacity 0.3s;
            z-index: 10006;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(14, 165, 233, 0.28);
            cursor: pointer;
        }

        .progress-bar {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #06B6D4 0%, #00997A 55%, #0EA5E9 100%);
            transition: width 0.18s ease-out;
            box-shadow: 0 10px 22px rgba(0, 153, 122, 0.20);
        }

        .progress-ticks {
            position: absolute;
            inset: 0;
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            pointer-events: none;
        }
        .progress-tick {
            width: 1px;
            background: rgba(15, 23, 42, 0.18);
            opacity: 0.5;
        }
        .progress-tick.strong {
            opacity: 0.85;
        }

        .progress-segments {
            position: absolute;
            inset: 0;
            pointer-events: auto;
        }
        .progress-segment {
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.78);
            background: rgba(15, 23, 42, 0.42);
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.55), 0 10px 22px rgba(15, 23, 42, 0.14);
            pointer-events: auto;
            cursor: pointer;
        }
        .progress-segment.active {
            background: rgba(255, 255, 255, 0.98);
            border-color: rgba(0, 153, 122, 0.78);
            box-shadow: 0 0 0 3px rgba(0, 153, 122, 0.22), 0 12px 26px rgba(0, 153, 122, 0.18);
        }
        .progress-bar-container:focus-visible {
            outline: 2px solid rgba(14, 165, 233, 0.55);
            outline-offset: 3px;
        }

        /* Nav Items Styles */
        .nav-item-wrapper {
             position: relative;
             display: flex;
             align-items: stretch;
             justify-content: center;
             flex-direction: column;
             margin: 0;
             padding: 0 2px;
             min-width: clamp(92px, 10vw, 160px);
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
            white-space: nowrap;
        }
        .nav-subtitle {
            font-family: 'Inter', sans-serif; /* Changed to Sans-serif */
            font-size: 9px;
            font-weight: 500;
            letter-spacing: 0.1em;
            margin-top: 4px;
            opacity: 0.7;
            white-space: nowrap;
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

        body[data-no-hover="true"] .nav-item-wrapper:hover {
            background-color: transparent;
        }
        body[data-no-hover="true"] .nav-item-wrapper:hover .subchapter-dropdown {
            opacity: 0;
            visibility: hidden;
            transform: translateX(-50%) translateY(10px);
        }
        body[data-no-hover="true"] .nav-pin-button:hover {
            color: #ccc;
            transform: none;
        }
        body[data-no-hover="true"] .subchapter-item:hover {
            background-color: transparent;
            color: #666;
            border-left-color: transparent;
        }

        .nav-capsule {
            display: none !important;
        }

        @media (max-width: 1100px) {
            .nav-progress-chip {
                display: none;
            }
            .nav-logo-wrapper {
                width: 160px;
                min-width: 160px;
                padding-left: 14px;
            }
            .nav-pin-wrapper {
                min-width: 56px;
                padding-right: 10px;
            }
            .nav-subtitle {
                display: none;
            }
            .main-nav-bar {
                justify-content: flex-start;
                overflow-x: auto;
                overscroll-behavior-x: contain;
                scrollbar-width: none;
            }
            .main-nav-bar::-webkit-scrollbar {
                display: none;
            }
        }

        @media (max-width: 720px) {
            .nav-logo-title {
                font-size: 14px;
            }
            .nav-logo-subtitle {
                font-size: 9px;
            }
            .nav-item-wrapper {
                min-width: 96px;
            }
            .nav-title {
                font-size: 10px;
            }
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // BUILD DOM
    // ==========================================
    const navContainer = document.createElement('div');
    navContainer.className = 'global-nav-container pinned'; // Default to pinned for now

    if (path.includes('chapter3_phenomenon.html')) {
        document.body.setAttribute('data-no-hover', 'true');
    }

    // Progress Bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'progress-bar-container';
    progressBarContainer.setAttribute('tabindex', '0');
    progressBarContainer.setAttribute('role', 'slider');
    progressBarContainer.setAttribute('aria-label', 'Reading progress');
    progressBarContainer.setAttribute('aria-valuemin', '0');
    progressBarContainer.setAttribute('aria-valuemax', '100');
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBarContainer.appendChild(progressBar);
    progressBar.setAttribute('aria-hidden', 'true');
    const progressTicks = document.createElement('div');
    progressTicks.className = 'progress-ticks';
    for (let i = 0; i <= TOTAL_SEGMENTS; i++) {
        const tick = document.createElement('div');
        tick.className = `progress-tick ${boundaryTickIndex.has(i) ? 'strong' : ''}`;
        progressTicks.appendChild(tick);
    }
    const progressSegments = document.createElement('div');
    progressSegments.className = 'progress-segments';
    progressBarContainer.appendChild(progressTicks);
    progressBarContainer.appendChild(progressSegments);
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
    const progressChip = document.createElement('div');
    progressChip.className = 'nav-progress-chip';
    progressChip.textContent = 'Progress · 0%';
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
        if (pinned) navContainer.classList.remove('nav-hidden');
    };
    pinWrapper.appendChild(progressChip);
    pinWrapper.appendChild(pinButton);
    navContainer.appendChild(pinWrapper);

    document.body.appendChild(navContainer);

    // ==========================================
    // SCROLL & PROGRESS LOGIC
    // ==========================================
    let lastScrollTop = 0;
    let ticking = false;

    const getScrollContext = () => {
        const content = document.getElementById('contentSection');
        if (content && content.scrollHeight > content.clientHeight) {
            return {
                getTop: () => content.scrollTop,
                getHeight: () => content.scrollHeight,
                getClient: () => content.clientHeight,
                setTop: (v, behavior = 'auto') => { content.scrollTo({ top: v, behavior }); }
            };
        }
        return {
            getTop: () => (window.scrollY || document.documentElement.scrollTop || 0),
            getHeight: () => (document.documentElement.scrollHeight || 0),
            getClient: () => (document.documentElement.clientHeight || 0),
            setTop: (v, behavior = 'smooth') => { window.scrollTo({ top: v, behavior }); }
        };
    };

    const buildSegmentButtons = () => {
        progressSegments.innerHTML = '';
        const len = segmentMeta.length;
        for (let i = 0; i < len; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'progress-segment';
            btn.style.left = `${((i + 0.5) / len) * 100}%`;
            btn.title = segmentMeta[i].label;
            btn.setAttribute('aria-label', `Go to ${segmentMeta[i].label}`);
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.href = segmentMeta[i].url;
            });
            progressSegments.appendChild(btn);
        }
    };

    buildSegmentButtons();

    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const updateState = () => {
        // 1. Smart Hide Logic
        const scrollCtx = getScrollContext();
        let currentScrollTop = scrollCtx.getTop();
        
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
        let segmentIndex = 0;
        let localPercent = 0;

        let currentTitle = '';
        if (currentParentIndex !== -1) {
            const currentChapter = navStructure[currentParentIndex];
            currentTitle = currentChapter.title || '';

            const localScrollHeight = scrollCtx.getHeight();
            const localClientHeight = scrollCtx.getClient();
            if (localScrollHeight > localClientHeight + 2) {
                localPercent = scrollCtx.getTop() / (localScrollHeight - localClientHeight);
            } else {
                localPercent = 1;
            }

            if (currentChapter.id === 'intro') {
                segmentIndex = 0;
            }
            else if (currentChapter.id === 'prologue') {
                segmentIndex = 1;
            }
            else if (currentChapter.id === 'ch2') {
                if (path.includes('chapter1_dualcity.html')) {
                    segmentIndex = 4;
                } else {
                    const section = urlParams.get('section') || '1';
                    const subIndex = Math.max(0, Math.min(1, parseInt(section) - 1));
                    segmentIndex = 2 + subIndex;
                }
            }
            else if (currentChapter.id === 'ch1') {
                if (path.includes('chapter2_counterflow_redesign.html') || path.includes('chapter2_counterflow.html')) {
                    segmentIndex = 6;
                } else {
                    segmentIndex = 5;
                }
            }
            else if (currentChapter.id === 'ch3') {
                segmentIndex = path.includes('timeline') ? 8 : 7;
            }
            else if (currentChapter.id === 'reflection') {
                segmentIndex = 9;
            }
            else if (currentChapter.id === 'epilogue') {
                segmentIndex = stepParam === '6' ? 11 : 10;
            }
        }

        // Clamp
        localPercent = Math.max(0, Math.min(1, localPercent));
        globalProgress = Math.max(0, Math.min(1, (segmentIndex + localPercent) / TOTAL_SEGMENTS));
        progressBar.style.width = `${globalProgress * 100}%`;
        const pct = Math.round(globalProgress * 100);
        progressBarContainer.setAttribute('aria-valuenow', String(pct));
        const segLabel = segmentMeta[Math.max(0, Math.min(TOTAL_SEGMENTS - 1, segmentIndex))]?.label || currentTitle || 'Progress';
        const labelText = `${segLabel} · ${pct}%`;
        progressChip.textContent = labelText;
        Array.from(progressSegments.children).forEach((el, i) => {
            el.classList.toggle('active', i === segmentIndex);
            if (i === segmentIndex) {
                el.setAttribute('aria-current', 'true');
            } else {
                el.removeAttribute('aria-current');
            }
        });

        ticking = false;
    };

    const getRatioFromClientX = (clientX) => {
        const rect = progressBarContainer.getBoundingClientRect();
        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        return rect.width ? (x / rect.width) : 0;
    };

    const seekToRatio = (ratio, behavior = 'smooth') => {
        const r = clamp01(ratio);
        const scrollCtx = getScrollContext();
        const h = scrollCtx.getHeight();
        const c = scrollCtx.getClient();
        if (h <= c) return;
        scrollCtx.setTop(r * (h - c), behavior);
    };

    let suppressClickUntil = 0;
    let isPointerSeeking = false;
    progressBarContainer.addEventListener('pointerdown', (e) => {
        suppressClickUntil = Date.now() + 450;
        isPointerSeeking = true;
        try { progressBarContainer.setPointerCapture(e.pointerId); } catch (_) {}
        seekToRatio(getRatioFromClientX(e.clientX), 'auto');
    });
    progressBarContainer.addEventListener('pointermove', (e) => {
        if (!isPointerSeeking) return;
        seekToRatio(getRatioFromClientX(e.clientX), 'auto');
    });
    const endPointerSeek = (e) => {
        if (!isPointerSeeking) return;
        isPointerSeeking = false;
        seekToRatio(getRatioFromClientX(e.clientX), 'smooth');
        try { progressBarContainer.releasePointerCapture(e.pointerId); } catch (_) {}
    };
    progressBarContainer.addEventListener('pointerup', endPointerSeek);
    progressBarContainer.addEventListener('pointercancel', () => { isPointerSeeking = false; });

    progressBarContainer.addEventListener('click', (e) => {
        if (Date.now() < suppressClickUntil) return;
        seekToRatio(getRatioFromClientX(e.clientX), 'smooth');
    });

    progressBarContainer.addEventListener('keydown', (e) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) return;
        e.preventDefault();
        const current = parseFloat(progressBar.style.width) / 100 || 0;
        const big = e.shiftKey ? 0.2 : 0.05;
        const delta = (e.key === 'ArrowRight' || e.key === 'PageDown') ? big : (e.key === 'ArrowLeft' || e.key === 'PageUp') ? -big : 0;
        if (e.key === 'Home') seekToRatio(0, 'smooth');
        else if (e.key === 'End') seekToRatio(1, 'smooth');
        else seekToRatio(current + delta, 'smooth');
    });

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
