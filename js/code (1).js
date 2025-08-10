document.addEventListener('DOMContentLoaded', () => {

    // --- 데이터 정의 ---
    const state = {
        totalStardust: 40,
        remainingStardust: 40,
        charms: {},
        costTable: { 0: 0, 1: 1, 2: 2, 3: 3, 4: 5, 5: 7, 6: 10 },
        drawMode: false,
        startStar: null,
        lines: []
    };

    const categoryInfo = {
        "이해심 및 공감 능력": { color: "#F472B6", starImage: "star-pink.png" },
        "성실성 및 책임감": { color: "#60A5FA", starImage: "star-skyblue.png" },
        "지적 호기심 및 개방성": { color: "#FBBF24", starImage: "star-yellow.png" },
        "정서적 안정 및 자기 인식": { color: "#4ADE80", starImage: "star-green.png" },
        "도덕성 및 양심": { color: "#4F46E5", starImage: "star-blue.png" },
        "유머감각 및 사교성": { color: "#F97316", starImage: "star-orange.png" },
        "목표 지향성 및 야망": { color: "#EF4444", starImage: "star-red.png" }
    };
    
    const categoryDataForPanel = [
        { name: "이해심 및 공감 능력", charms: ["다정함", "공감 능력", "이해심", "배려심", "경청 능력", "위로 능력", "섬세함"] },
        { name: "성실성 및 책임감", charms: ["성실함", "책임감", "인내심", "계획성", "세심함", "신중함", "절제력"] },
        { name: "지적 호기심 및 개방성", charms: ["호기심", "창의성", "열린 마음", "모험심", "비판적 사고력", "통찰력", "넓은 시야", "집중력"] },
        { name: "정서적 안정 및 자기 인식", charms: ["침착함", "안정감", "자기 성찰", "긍정적", "현실 감각", "자기 객관화", "자존감", "겸손"] },
        { name: "도덕성 및 양심", charms: ["정직함", "양심", "일관성", "원칙 준수", "진정성", "약자보호"] },
        { name: "유머감각 및 사교성", charms: ["유머 감각", "분위기 메이커", "다양한 친분", "타인을 편하게 해주는 능력", "연락 등 관계를 이어가는 능력", "사교적 에너지"] },
        { name: "목표 지향성 및 야망", charms: ["목표 의식", "열정", "자기 계발 의지", "리더십", "야망", "경쟁심", "전략적 사고"] }
    ];

    const shuffledCharmLayout = [
        { name: "정직함", category: "도덕성 및 양심" }, { name: "성실함", category: "성실성 및 책임감" }, { name: "호기심", category: "지적 호기심 및 개방성" }, { name: "침착함", category: "정서적 안정 및 자기 인식" }, { name: "유머 감각", category: "유머감각 및 사교성" }, { name: "다정함", category: "이해심 및 공감 능력" }, { name: "목표 의식", category: "목표 지향성 및 야망" },
        { name: "창의성", category: "지적 호기심 및 개방성" }, { name: "안정감", category: "정서적 안정 및 자기 인식" }, { name: "분위기 메이커", category: "유머감각 및 사교성" }, { name: "열정", category: "목표 지향성 및 야망" }, { name: "공감 능력", category: "이해심 및 공감 능력" }, { name: "양심", category: "도덕성 및 양심" }, { name: "책임감", category: "성실성 및 책임감" },
        { name: "다양한 친분", category: "유머감각 및 사교성" }, { name: "이해심", category: "이해심 및 공감 능력" }, { name: "자기 성찰", category: "정서적 안정 및 자기 인식" }, { name: "열린 마음", category: "지적 호기심 및 개방성" }, { name: "일관성", category: "도덕성 및 양심" }, { name: "자기 계발 의지", category: "목표 지향성 및 야망" }, { name: "인내심", category: "성실성 및 책임감" },
        { name: "긍정적", category: "정서적 안정 및 자기 인식" }, { name: "모험심", category: "지적 호기심 및 개방성" }, { name: "배려심", category: "이해심 및 공감 능력" }, { name: "타인을 편하게 해주는 능력", category: "유머감각 및 사교성" }, { name: "리더십", category: "목표 지향성 및 야망" }, { name: "계획성", category: "성실성 및 책임감" }, { name: "원칙 준수", category: "도덕성 및 양심" },
        { name: "진정성", category: "도덕성 및 양심" }, { name: "세심함", category: "성실성 및 책임감" }, { name: "비판적 사고력", category: "지적 호기심 및 개방성" }, { name: "현실 감각", category: "정서적 안정 및 자기 인식" }, { name: "경청 능력", category: "이해심 및 공감 능력" }, { name: "야망", category: "목표 지향성 및 야망" }, { name: "집중력", category: "지적 호기심 및 개방성" },
        { name: "연락 등 관계를 이어가는 능력", category: "유머감각 및 사교성" }, { name: "위로 능력", category: "이해심 및 공감 능력" }, { name: "신중함", category: "성실성 및 책임감" }, { name: "자기 객관화", category: "정서적 안정 및 자기 인식" }, { name: "경쟁심", category: "목표 지향성 및 야망" }, { name: "통찰력", category: "지적 호기심 및 개방성" }, { name: "약자보호", category: "도덕성 및 양심" },
        { name: "전략적 사고", category: "목표 지향성 및 야망" }, { name: "자존감", category: "정서적 안정 및 자기 인식" }, { name: "넓은 시야", category: "지적 호기심 및 개방성" }, { name: "섬세함", category: "이해심 및 공감 능력" }, { name: "사교적 에너지", category: "유머감각 및 사교성" }, { name: "절제력", category: "성실성 및 책임감" }, { name: "겸손", category: "정서적 안정 및 자기 인식" }
    ];

    const starField = document.getElementById('starField');
    const charmListContainer = document.getElementById('charmListContainer');
    const remainingStardustEl = document.getElementById('remaining-stardust');
    const connectionSvg = document.getElementById('connectionSvg');
    const drawModeBtn = document.getElementById('drawModeBtn');
    const undoLineBtn = document.getElementById('undoLineBtn');
    const clearLinesBtn = document.getElementById('clearLinesBtn');
    const resetAllBtn = document.getElementById('resetAllBtn');
    const replayOnboardingBtn = document.getElementById('replayOnboardingBtn');
    const saveAsPngBtn = document.getElementById('saveAsPngBtn');
    
    function init() {
    // 1단계에서 선택한 매력 데이터 가져오기
    const savedCharmsJSON = localStorage.getItem('userSelectedCharms');

    // 데이터가 없으면, 1단계로 가라는 안내창 보여주고 실행 중단
    if (!savedCharmsJSON) {
        document.getElementById('redirect-overlay').style.display = 'flex';
        return;
    }

    // 데이터가 있으면, 화면 그리기 시작
    const selectedCharmNames = JSON.parse(savedCharmsJSON);
    
    createControlPanel(selectedCharmNames); // 선택된 매력만 그리도록 인자 전달
    createStars(selectedCharmNames);      // 선택된 별만 그리도록 인자 전달
    
    addEventListeners();
    setupOnboarding();
    setupDragScroll();
    updateDisplay();
    updateUndoButtonState();
    
    if (selectedCharmNames.length > 0) {
        startOnboarding();
    }
}

    function createControlPanel(selectedCharmNames) {
    categoryDataForPanel.forEach((category) => {
        const charmsInThisCategory = category.charms.filter(charm => selectedCharmNames.includes(charm));

        if (charmsInThisCategory.length === 0) return;

        const categoryGroup = document.createElement('div');
        // ... (이하 로직은 기존과 거의 동일하나, charmsInThisCategory를 사용)
        categoryGroup.className = 'category-group';
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;
        categoryTitle.style.borderColor = categoryInfo[category.name].color;
        categoryGroup.appendChild(categoryTitle);
        
        const itemsWrapper = document.createElement('div');
        itemsWrapper.className = 'charm-items-wrapper';
        
        charmsInThisCategory.forEach(charmName => {
            const charmItem = document.createElement('div');
            charmItem.className = 'charm-item';
            const nameEl = document.createElement('span');
            nameEl.className = 'charm-name';
            nameEl.textContent = charmName;
            const buttonsEl = document.createElement('div');
            buttonsEl.className = 'level-buttons';
            for (let level = 0; level <= 6; level++) {
                const btn = document.createElement('button');
                btn.className = 'level-btn';
                btn.textContent = level;
                btn.dataset.level = level;
                btn.addEventListener('click', () => handleLevelButtonClick(charmName, level));
                buttonsEl.appendChild(btn);
            }
            charmItem.appendChild(nameEl);
            charmItem.appendChild(buttonsEl);
            itemsWrapper.appendChild(charmItem);
        });
        categoryGroup.appendChild(itemsWrapper);
        charmListContainer.appendChild(categoryGroup);
    });
}

    function createStars(selectedCharmNames) {
    shuffledCharmLayout.forEach((charm, index) => {
        if (!selectedCharmNames.includes(charm.name)) return;
        
        // ... (이하 별 생성 로직은 기존과 동일)
        const charmName = charm.name;
        const charmCategory = charm.category;
        const info = categoryInfo[charmCategory];

        const row = Math.floor(index / 7);
        const col = index % 7;
        
        let gridX = 8 + (col * (100 - 8 * 2) / (7 - 1));
        let gridY = 8 + (row * (100 - 8 * 2) / (7 - 1));

        const randomJitter = 4;
        const offsetX = gridX + (Math.random() - 0.5) * randomJitter;
        const offsetY = gridY + (Math.random() - 0.5) * randomJitter;
        
        const starEl = document.createElement('div');
        starEl.className = 'star';
        starEl.style.left = `${offsetX}%`;
        starEl.style.top = `${offsetY}%`;
        starEl.style.backgroundImage = `url("images/${info.starImage}")`;

        const clickableArea = document.createElement('div');
        clickableArea.className = 'star-clickable-area';
        clickableArea.addEventListener('click', () => handleStarClick(charmName));

        starEl.appendChild(clickableArea);
        starField.appendChild(starEl);

        state.charms[charmName] = {
            name: charmName,
            level: 0,
            category: charmCategory,
            color: info.color, 
            element: starEl, 
            clickableElement: clickableArea,
            position: { x: offsetX, y: offsetY }
        };
    });
}
    
    function addEventListeners() {
        drawModeBtn.addEventListener('click', toggleDrawMode);
        undoLineBtn.addEventListener('click', handleUndoLine);
        clearLinesBtn.addEventListener('click', clearAllLines);
        resetAllBtn.addEventListener('click', resetAll);
        replayOnboardingBtn.addEventListener('click', startOnboarding);
        saveAsPngBtn.addEventListener('click', saveConstellationAsPng);
    }

    function saveConstellationAsPng() {
    const starContainer = document.getElementById('starContainer');
    const originalBackground = starContainer.style.background;
    const originalBoxShadow = starContainer.style.boxShadow; // Get original box-shadow

    saveAsPngBtn.disabled = true;
    saveAsPngBtn.textContent = '저장 중...';
    
    // Temporarily remove background and box-shadow
    starContainer.style.background = 'transparent';
    starContainer.style.boxShadow = 'none'; 

    html2canvas(starContainer, {
        backgroundColor: null,
        scale: 2,
        useCORS: true
    }).then(canvas => {
        // Restore original styles immediately after capture
        starContainer.style.background = originalBackground;
        starContainer.style.boxShadow = originalBoxShadow;

        const link = document.createElement('a');
        link.download = '나만의-별자리.png';
        link.href = canvas.toDataURL('image/png'); // Use the original canvas, no cropping
        link.click();
        
        saveAsPngBtn.disabled = false;
        saveAsPngBtn.textContent = 'PNG로 저장';

    }).catch(err => {
        // Also restore in case of error
        starContainer.style.background = originalBackground;
        starContainer.style.boxShadow = originalBoxShadow;
        console.error('PNG 저장 중 오류 발생:', err);
        alert('이미지 저장에 실패했습니다. 다시 시도해주세요.');
        saveAsPngBtn.disabled = false;
        saveAsPngBtn.textContent = 'PNG로 저장';
    });
}

    function handleLevelButtonClick(charmName, newLevel) {
        const charm = state.charms[charmName];
        if (charm.level === newLevel) return;
        const costDiff = state.costTable[newLevel] - state.costTable[charm.level];
        if (state.remainingStardust < costDiff) { alert("별가루가 부족합니다!"); return; }
        charm.level = newLevel;
        state.remainingStardust -= costDiff;
        updateDisplay();
    }

    function handleStarClick(charmName) {
        if (!state.drawMode) return;
        const clickedStar = state.charms[charmName];
        if (clickedStar.level === 0) return;
        if (!state.startStar) {
            state.startStar = clickedStar;
            updateStarAppearance(clickedStar.element, clickedStar.clickableElement, clickedStar.level, true);
        } else {
            if (state.startStar.name === clickedStar.name) {
                updateStarAppearance(clickedStar.element, clickedStar.clickableElement, clickedStar.level, false);
                state.startStar = null;
                return;
            }
            drawLine(state.startStar, clickedStar);
            updateStarAppearance(state.startStar.element, state.startStar.clickableElement, state.startStar.level, false);
            state.startStar = null;
        }
    }
    
    function toggleDrawMode() {
        state.drawMode = !state.drawMode;
        drawModeBtn.classList.toggle('active', state.drawMode);
        drawModeBtn.textContent = state.drawMode ? '선 연결 모드 끄기' : '선 연결 모드 켜기';
        if (!state.drawMode && state.startStar) {
            updateStarAppearance(state.startStar.element, state.startStar.clickableElement, state.startStar.level, false);
            state.startStar = null;
        }
    }

    function drawLine(startCharm, endCharm) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', `${startCharm.position.x}%`);
        line.setAttribute('y1', `${startCharm.position.y}%`);
        line.setAttribute('x2', `${endCharm.position.x}%`);
        line.setAttribute('y2', `${endCharm.position.y}%`);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.7)');
        line.setAttribute('stroke-width', '3.5');
        connectionSvg.appendChild(line);
        state.lines.push({ element: line, start: startCharm.name, end: endCharm.name });
        updateUndoButtonState();
    }

    function handleUndoLine() {
        if (state.lines.length === 0) return;
        const lastLine = state.lines.pop();
        lastLine.element.remove();
        updateUndoButtonState();
    }

    function clearAllLines() {
        connectionSvg.innerHTML = '';
        state.lines = [];
        updateUndoButtonState();
    }
    
    function resetAll() {
    if (!confirm("정말 모든 선택을 초기화하고 처음(1단계)부터 다시 시작하시겠습니까?")) return;
    // 저장된 선택 데이터를 삭제하고, 1단계 페이지로 이동
    localStorage.removeItem('userSelectedCharms');
    window.location.href = 'select.html';
}

    function updateUndoButtonState() {
        undoLineBtn.disabled = state.lines.length === 0;
    }
    
    function getVisualSize(level) {
        const sizeMap = { 0: 0, 1: 50, 2: 80, 3: 120, 4: 170, 5: 220, 6: 280 };
        return sizeMap[level] || 0;
    }

    function getClickableSize(level) {
        const sizeMap = { 0: 0, 1: 40, 2: 60, 3: 70, 4: 80, 5: 90, 6: 100 };
        return sizeMap[level] || 0;
    }

    function updateStarAppearance(starEl, clickableEl, level, isHighlighted) {
        const visualSize = getVisualSize(level);
        const clickableSize = getClickableSize(level);
        starEl.style.width = `${visualSize}px`;
        starEl.style.height = `${visualSize}px`;
        clickableEl.style.width = `${clickableSize}px`;
        clickableEl.style.height = `${clickableSize}px`;
        starEl.style.transform = 'translate(-50%, -50%)';
    }

    function updateDisplay() {
        remainingStardustEl.textContent = state.remainingStardust;
        document.querySelectorAll('.charm-item').forEach(item => {
            const charmName = item.querySelector('.charm-name').textContent;
            const charm = state.charms[charmName];
            item.querySelectorAll('.level-btn').forEach(btn => {
                const btnLevel = parseInt(btn.dataset.level);
                const isSelected = (btnLevel === charm.level);
                btn.classList.toggle('active', isSelected);
                if (isSelected) {
                    btn.style.backgroundColor = charm.color;
                } else {
                    btn.style.backgroundColor = '';
                }
                const costDiff = state.costTable[btnLevel] - state.costTable[charm.level];
                const isDisabled = state.remainingStardust < costDiff;
                btn.classList.toggle('disabled', !isSelected && isDisabled);
            });
        });
        Object.values(state.charms).forEach(charm => {
            const isHighlighted = state.startStar ? state.startStar.name === charm.name : false;
            updateStarAppearance(charm.element, charm.clickableElement, charm.level, isHighlighted);
            charm.element.style.opacity = charm.level > 0 ? '1' : '0';
        });
    }

    function setupDragScroll() {
        const slider = charmListContainer;
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            if (e.target.closest('.level-btn')) return;
            isDown = true;
            slider.classList.add('active-drag');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active-drag');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active-drag');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    let onboardingElements = {};
    let onboardingSteps = [];
    let currentOnboardingStep = 0;

    function setupOnboarding() {
        onboardingElements = {
            overlay: document.getElementById('onboarding-overlay'),
            highlight: document.getElementById('onboardingHighlight'),
            tooltip: document.getElementById('onboardingTooltip'),
            tooltipText: document.getElementById('onboardingText'),
            nextBtn: document.getElementById('next-onboarding'),
            skipBtn: document.getElementById('skip-onboarding')
        };
        
        onboardingSteps = [
            { element: document.getElementById('budgetPanel'), text: "이곳에서 '별가루'를 사용해 당신의 매력을 선택할 수 있습니다.<br>박스 안을 드래그하여 더 많은 매력을 탐색해 보세요!", tooltipPosition: 'left' },
            { element: document.getElementById('panelHeader'), text: "<b>별가루는 40개로 제한</b>되어 있으니 비용을 확인하며 신중히 선택하세요!", tooltipPosition: 'left' },
            { element: document.getElementById('starContainer'), text: "매력을 선택하면 왼쪽 밤하늘에 당신만의 별이 빛나기 시작합니다.", tooltipPosition: 'right' },
            { element: document.getElementById('visualization-controls'), text: "모든 선택이 끝나면, 이 버튼으로 별들을 연결해 당신만의 별자리를 완성할 수 있습니다.", tooltipPosition: 'top' }
        ];

        onboardingElements.nextBtn.addEventListener('click', () => {
            currentOnboardingStep++;
            if (currentOnboardingStep < onboardingSteps.length) {
                showOnboardingStep(currentOnboardingStep);
            } else {
                endOnboarding();
            }
        });
        onboardingElements.skipBtn.addEventListener('click', endOnboarding);
    }
    
    // ▼▼▼ 이 함수가 핵심 수정 부분입니다 ▼▼▼
    function showOnboardingStep(stepIndex) {
        const step = onboardingSteps[stepIndex];
        if (!step || !step.element) {
            endOnboarding();
            return;
        }
        
        const targetElement = step.element;
        const isMobile = window.innerWidth <= 768;

        const updateUI = () => {
            const rect = targetElement.getBoundingClientRect();
            const padding = 10;
            
            onboardingElements.highlight.style.width = `${rect.width + padding * 2}px`;
            onboardingElements.highlight.style.height = `${rect.height + padding * 2}px`;
            onboardingElements.highlight.style.top = `${rect.top - padding}px`;
            onboardingElements.highlight.style.left = `${rect.left - padding}px`;
            onboardingElements.tooltipText.innerHTML = step.text;

            if (!isMobile) {
                // 데스크탑 전용 툴팁 위치 계산
                onboardingElements.tooltip.style.bottom = '';
                onboardingElements.tooltip.style.transform = '';
                const tooltipRect = onboardingElements.tooltip.getBoundingClientRect();
                let top, left;
                switch (step.tooltipPosition) {
                    case 'left':
                        left = rect.left - tooltipRect.width - 20 - padding;
                        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                        break;
                    case 'right':
                        left = rect.right + 20 + padding;
                        top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                        break;
                    case 'top':
                        top = rect.top - tooltipRect.height - 20 - padding;
                        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
                        break;
                    default:
                        top = rect.bottom + 20 + padding;
                        left = rect.left + rect.width / 2 - tooltipRect.width / 2;
                        break;
                }
                if (left < 10) left = 10;
                if (top < 10) top = 10;
                if (left + tooltipRect.width > window.innerWidth - 10) left = window.innerWidth - tooltipRect.width - 10;
                if (top + tooltipRect.height > window.innerHeight - 10) top = window.innerHeight - tooltipRect.height - 10;

                onboardingElements.tooltip.style.top = `${top}px`;
                onboardingElements.tooltip.style.left = `${left}px`;
            }
        };

        if (isMobile) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(updateUI, 500); // 스크롤 애니메이션(0.5초) 후 UI 업데이트
        } else {
            updateUI(); // 데스크탑은 즉시 UI 업데이트
        }

        if (stepIndex === onboardingSteps.length - 1) {
            onboardingElements.nextBtn.textContent = '시작하기';
        } else {
            onboardingElements.nextBtn.textContent = '다음';
        }
    }

    function startOnboarding() {
        onboardingElements.overlay.style.display = 'block';
        currentOnboardingStep = 0;
        setTimeout(() => showOnboardingStep(currentOnboardingStep), 100);
    }

    function endOnboarding() {
        onboardingElements.overlay.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    init();
});