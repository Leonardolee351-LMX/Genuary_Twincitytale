# Twin City Tales: Lives Across the Shenzhen‑Hong Kong Border
# 双城记：跨越深港边界的生活

> **A Data Visualization Narrative of the Greater Bay Area Integration**
> **大湾区融合的数据叙事**

![Project Banner](images/The%20Blueprint.jpg)

## 📖 Project Overview (作品简介)

**Twin City Tides (双城潮汐)** is a comprehensive data visualization project that chronicles the reconnection and deepening integration of Shenzhen and Hong Kong following the border reopening in early 2023. 

The narrative explores the "retaliatory release" of pent-up demand, where the data curve of cross-border traffic didn't just rise—it exploded vertically. This flow represents not merely a recovery of traffic, but a fundamental **reboot of dual-city life**. From the macro-level "Folded City" phenomenon to the micro-level stories of 8 specific archetypes (migratory birds, students, workers), the project visualizes how physical distance is being compressed into daily routines.

**Core Themes:**
*   **Resurgence:** The awakening from the "Emergency Pause".
*   **The Folded City:** How checkpoints evolved into smart hubs, folding distance.
*   **The Human Scale:** 8 archetypes reflecting survival philosophies in a "Twin City" existence.

---

## 🚀 How to View / Installation (安装与阅览)

This project is designed to be accessible to everyone, including those with no programming background.

### Method 1: Direct Web Viewing (Recommended for Everyone)
No installation is required. The project is built as a static web application.

1.  **Download** the project zip file.
2.  **Unzip/Extract** the folder to your computer.
3.  **Double-click** the file named `index.html`.
4.  The project will open in your default web browser (Chrome, Edge, Safari, etc.).

> **Note:** Please ensure you have an **active Internet connection** while viewing. The project uses external libraries (React, Tailwind, D3.js) loaded via CDN to keep the file size small and ensure you always have the latest versions.

### Method 2: Local Development (For Developers)
If you wish to edit or run the project in a local server environment:

1.  Open the project folder in VS Code or your preferred editor.
2.  Use a simple HTTP server to open **index.html** in your browser. It is recommended to use Live Server extension in VS Code, or `python -m http.server` in the project folder.
3.  **Open in Browser:**
    *   Navigate to `http://localhost:8000` (or the port your server shows).
    *   The project should load in your default browser.

### **Requirements:**
    *   No `npm install` is needed (libraries are CDN-based).
    *   Modern Web Browser (Chrome/Edge/Firefox).

---

## 📚 Narrative Framework (叙事框架)

The project is structured into three main chapters, guiding the user from macro data to micro stories:

### **Intro: Dissolving Borders (消融的边界)**
*   A cinematic introduction setting the stage for the post-pandemic reconnection.

### **Chapter 01: RECOVERY (Rebooted Boundary / 重启边界)**
*   **Focus:** The "Vertical Explosion" of traffic.
*   **Content:** Visualizes the immediate aftermath of the reopening, contrasting the "Emergency Pause" to the sudden surge in connectivity.
*   **Key Viz:** Time-series analysis of checkpoint throughput.

### **Chapter 02: THE FOLDED CITY (Folded City / 折叠城市)**
*   **Focus:** Infrastructure and Efficiency.
*   **Content:** How checkpoints (e.g., Shenzhen Bay, Futian) have become "smart hubs". The concept of the "Folded City" illustrates how technology and policy (e.g., "Northbound Travel") compress physical distance.
*   **Key Viz:** Flow analysis, map-based visualization of the "1-hour living circle".

### **Chapter 03: THE HUMAN SCALE (Concrete Lives / 具体生活)**
*   **Focus:** The People.
*   **Content:** 8 distinct personas (Archetypes) representing different modes of cross-border existence.
    *   **The Cross-Border Student (e.g., Leilei):** Living in Shenzhen, schooling in HK.
    *   **The Reverse Commuter (e.g., Zhang):** HK Master's student living in Shenzhen for lower rent.
    *   **The Weekend Consumer (e.g., Polin):** HK residents heading north for "Costco runs" and dining.
    *   **The Cross-Border Worker (e.g., Mr. Hu).**
*   **Key Viz:** Personal timelines, commute routes, and "Day in the Life" storytelling.

---

## 🏗️ Web Architecture (网页架构)

The user journey follows a linear but exploratory path:

1.  **Entry (`index.html`):** 
    *   Hero Section -> Narrative Stepper -> Chapter Navigation.
2.  **Chapter Portals:**
    *   Each chapter (`Chapter1.HTML`, etc.) acts as a landing page with high-level summaries.
3.  **Detail Views:**
    *   **Data Dashboards (`Chapter2.HTML`, `observable.html`):** Interactive D3.js charts.
    *   **Story Cards (`React Components`):** Interactive profile cards for the 8 archetypes (e.g., `港硕女生.tsx`).
4.  **Navigation:**
    *   A global navigation bar and "Next" buttons guide the user through the chronological flow.

---

## 🎨 Design System & Frontend Tech Stack (设计规范与前端技术栈)

### **Design System (设计语言)**

The visual language is designed to balance **data precision** with **human narrative**, employing a "Bento Box" philosophy for modular information density.

*   **Visual Identity:** "Clean, Modern, Data-Centric".
*   **Color Palette (配色体系):**
    *   **Primary:** Teal/Cyan (`#00997A` / `#0E7490`) - Representing the flow, technological connectivity, and the distinctive hue of HK-SZ waters.
    *   **Background:** Clean White (`#FFFFFF`) & Slate (`#F8FAFC`) - To emphasize data readability and provide a "gallery" feel.
    *   **Accents:** Gradients used in "Bento Box" containers to guide visual hierarchy.
*   **Typography (字体排印):**
    *   **Headings/Body:** `Inter` (Modern Sans-serif) - For interface clarity.
    *   **Narrative:** `Noto Serif SC` (Serif) - For emotional, story-driven text blocks.
    *   **Data/Code:** `JetBrains Mono` - For technical precision in charts and stats.
*   **UI Components:**
    *   **Bento Box Style:** Modular, rounded cards (Radius: `13px`) for organizing complex content.
    *   **Glassmorphism:** Translucent layers (`backdrop-blur`) to create depth and context.
    *   **Cinematic Scrolling:** Full-screen transitions that mimic a documentary viewing experience.

### **Frontend Tech Stack (前端技术栈)**

The project utilizes a modern, build-less frontend stack for maximum portability:

*   **Core:** HTML5, CSS3, JavaScript (ES6+).
*   **Framework:** React 18 (via CDN) + Babel (standalone) for component-based UI.
*   **Styling:** Tailwind CSS (via CDN) with custom configuration for typography and color palettes.
*   **Visualization:** 
    *   **D3.js (v7):** For complex data charts and flow diagrams.
    *   **Three.js:** For 3D visual elements.
*   **Animation:** 
    *   **GSAP (GreenSock):** For scroll-triggered animations (ScrollTrigger).
    *   **Framer Motion:** For React component transitions.
*   **Fonts:** Google Fonts (Inter, Noto Serif SC, JetBrains Mono) + FontAwesome.

**Application Scenarios:**
*   Data Journalism.
*   Interactive Storytelling.
*   Urban Planning Visualization.

---

## 📊 Datasets & Sources (数据来源)

The visualizations are powered by real-world data reflecting the cross-border dynamics:

*   **Primary Data:** 
    *   **Hong Kong Immigration Department:** Statistics on Daily Passenger Traffic (Control Points).
    *   **Shenzhen Transport Bureau:** Cross-border transport volume.
*   **Qualitative Data:**
    *   Interviews and field research tracking specific cross-border groups (Students, Workers, Consumers).
*   **Processed Files:**
    *   `dataset/HONG_KONG_Statistics_on_Daily_Passenger_Traffic@3.csv`
    *   `dataset/Deficit.csv`