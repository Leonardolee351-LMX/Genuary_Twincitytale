(function() {
    // Tailwind Custom Colors
    const accentCyan = '#00997A';

    // Chapters Data (Must match index.html exactly for step indices)
    const chapters = [
        { 
            id: 0, 
            title: "Title Page", 
            subtitle: "Intro",
            subchapters: [
                { title: "PREFACE", stepIndex: 1 }
            ]
        },
        { id: 0.5, title: "Dissolving Borders", subtitle: "Prologue", hiddenInNav: true },
        { 
            id: 1, 
            title: "RECOVERY", 
            subtitle: "Chapter 1\nREBOOTED BOUNDARY", 
            subchapters: [
                { title: "1.1 Recovery", url: "Chapter1.HTML" },
                { title: "1.2 Counterflow", url: "Chapter1.HTML" }
            ]
        },
        { 
            id: 2, 
            title: "THE FOLDED CITY", 
            subtitle: "Chapter 2\nFOLDED CITY", 
            subchapters: [
                { title: "2.1 Flows", url: "chapter2-1.html" },
                { title: "2.2 Analysis", url: "chapter2-1.html" },
                { title: "2.3 Dual City", url: "chapter2-1.html" }
            ]
        },
        { 
            id: 3, 
            title: "CONCRETE LIVES", 
            subtitle: "Chapter 3\nCONCRETE LIVES", 
            subchapters: [
                { title: "3.1 Persona", url: "Chapter3_Persona.HTML" },
                { title: "3.2 Timeline", url: "Chapter3_Timeline.HTML" },
                { title: "3.3 Phenomenon", url: "Chapter3_Phenomenon.HTML" }
            ]
        },
        { id: 4, title: "Epilogue", subtitle: "Epilogue" }
    ];

    // Determine current chapter
    let currentStep = 0; 
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');

    if (stepParam !== null) {
        currentStep = parseFloat(stepParam);
    } else if (path.includes("Chapter1.HTML") || path.includes("1-1")) {
        currentStep = 2; // Chapter 1
    } else if (path.includes("Chapter2.HTML") || path.toLowerCase().includes("chapter2-1.html")) {
        currentStep = 3; // Chapter 2
    } else if (path.includes("Chapter3_Persona.HTML") || path.includes("Chapter3_Timeline.HTML") || path.includes("Chapter3_Phenomenon.HTML")) {
        currentStep = 4; // Chapter 3
    } 

    // Filtered Nav Items (to handle original indices correctly)
    const navItems = chapters
        .map((chapter, index) => ({ ...chapter, originalIndex: index }))
        .filter(chapter => !chapter.hiddenInNav);

    // Remove existing nav if any
    const existingNav = document.querySelector('nav');
    if (existingNav) existingNav.remove();

    // Create Nav Container
    const nav = document.createElement('nav');
    nav.className = "fixed bottom-0 left-0 w-full z-[100] flex justify-center transition-all duration-500 ease-out group pb-6 pt-4 hover:pb-12 hover:pt-20 hover:bg-gradient-to-t hover:from-white hover:via-white/90 hover:to-transparent";
    
    const container = document.createElement('div');
    container.className = "flex items-end gap-12 md:gap-24 pointer-events-auto";
    nav.appendChild(container);

    navItems.forEach((chapter) => {
        const index = chapter.originalIndex;
        const item = document.createElement('div');
        item.className = "relative group/item flex flex-col items-center cursor-pointer";

        // Label
        const label = document.createElement('div');
        const isActive = index === Math.floor(currentStep); // Approximate active state
        label.className = `text-[10px] font-mono tracking-widest uppercase transition-all duration-500 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-center leading-tight whitespace-pre-line ${isActive ? 'text-[#00997A] font-bold' : 'text-black/40 group-hover/item:text-black/80'}`;
        label.textContent = chapter.subtitle;
        
        // Dot
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full mt-3 transition-all duration-300 ${isActive ? 'bg-[#00997A] scale-125' : 'bg-slate-300 group-hover/item:bg-slate-400'}`;

        // Wrapper for Label + Dot to separate from Subchapters click
        const mainClickArea = document.createElement('div');
        mainClickArea.className = "flex flex-col items-center";
        mainClickArea.appendChild(label);
        mainClickArea.appendChild(dot);
        mainClickArea.onclick = (e) => {
            e.stopPropagation();
            window.location.href = `index.html?step=${index}`;
        };
        item.appendChild(mainClickArea);

        // Subchapters (Hover)
        if (chapter.subchapters) {
            const subContainer = document.createElement('div');
            subContainer.className = "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col-reverse items-center transition-all duration-300 pointer-events-none group-hover/item:pointer-events-auto";
            subContainer.onclick = (e) => e.stopPropagation();
            
            // Line
            const line = document.createElement('div');
            line.className = "w-px h-[16rem] bg-gradient-to-t from-[#00997A]/50 to-transparent origin-bottom scale-y-0 group-hover/item:scale-y-100 transition-transform duration-500 ease-out";
            subContainer.appendChild(line);

            // Sub-items Wrapper
            const itemsWrapper = document.createElement('div');
            itemsWrapper.className = "absolute bottom-0 w-64 h-[16rem] flex flex-col-reverse justify-around items-center pt-6 pb-12";

            chapter.subchapters.forEach((sub, subIndex) => {
                const subItem = document.createElement('div');
                subItem.className = "relative flex items-center justify-center w-full transform translate-y-4 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300";
                subItem.style.transitionDelay = `${150 + subIndex * 100}ms`;
                
                subItem.onclick = (e) => {
                    e.stopPropagation();
                    if (sub.stepIndex !== undefined) {
                        window.location.href = `index.html?step=${sub.stepIndex}`;
                    } else {
                        window.location.href = sub.url;
                    }
                };

                // Determine if this specific subchapter is active based on current URL
                let isSubActive = false;
                if (sub.stepIndex !== undefined) {
                     isSubActive = (currentStep === sub.stepIndex);
                } else if (sub.url) {
                     isSubActive = path.toLowerCase().includes(sub.url.toLowerCase());
                }

                const subLabel = document.createElement('div');
                subLabel.className = `bg-white/80 backdrop-blur-sm px-6 py-2 rounded-xl text-xs font-mono tracking-widest uppercase border border-slate-200 transition-all duration-300 cursor-pointer hover:scale-110 whitespace-nowrap ${isSubActive ? 'text-[#00997A] font-bold' : 'text-slate-400 font-medium hover:text-[#00997A] hover:font-bold'}`;
                subLabel.textContent = sub.title;

                subItem.appendChild(subLabel);
                itemsWrapper.appendChild(subItem);
            });

            subContainer.appendChild(itemsWrapper);
            item.appendChild(subContainer);
        }

        container.appendChild(item);
    });

    document.body.appendChild(nav);
})();
