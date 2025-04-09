// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 导航栏滚动效果
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop) {
            // 向下滚动
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    // 场景轮播
    const scenesSlider = document.querySelector('.scenes-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (scenesSlider && prevBtn && nextBtn) {
        const sceneCards = document.querySelectorAll('.scene-card');
        const cardWidth = sceneCards[0].offsetWidth + 32; // 加上margin
        
        prevBtn.addEventListener('click', function() {
            scenesSlider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', function() {
            scenesSlider.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 如果移动菜单是打开的，点击后关闭
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // 添加CSS类以显示移动菜单
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: white;
                padding: 1rem 0;
                box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
            }
            
            .mobile-menu-btn.active i:before {
                content: '\\f00d';
            }
            
            header.scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                background-color: rgba(255, 255, 255, 0.98);
            }
        }
    `;
    document.head.appendChild(style);

    // 创建并添加英雄区域的SVG图片
    createHeroMockup();
    createQRCode();
});

// 创建英雄区域的SVG图片 - 基于实际应用界面更新
function createHeroMockup() {
    const heroImageContainer = document.querySelector('.hero-image');
    if (!heroImageContainer) return;
    
    // 创建website/images目录
    const imagesDir = document.createElement('div');
    imagesDir.style.display = 'none';
    document.body.appendChild(imagesDir);
    
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '600');
    svg.setAttribute('viewBox', '0 0 300 600');
    svg.setAttribute('class', 'hero-mockup');
    
    // 手机外壳
    const phone = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    phone.setAttribute('x', '50');
    phone.setAttribute('y', '50');
    phone.setAttribute('width', '200');
    phone.setAttribute('height', '400');
    phone.setAttribute('rx', '20');
    phone.setAttribute('ry', '20');
    phone.setAttribute('fill', '#292f36');
    svg.appendChild(phone);
    
    // 手机屏幕 - 使用紫色背景，对应截图中的磨皮感场景
    const screen = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    screen.setAttribute('x', '60');
    screen.setAttribute('y', '80');
    screen.setAttribute('width', '180');
    screen.setAttribute('height', '340');
    screen.setAttribute('rx', '5');
    screen.setAttribute('ry', '5');
    screen.setAttribute('fill', '#8e44ad'); // 紫色背景
    svg.appendChild(screen);
    
    // 应用标题
    const appTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    appTitle.setAttribute('x', '150');
    appTitle.setAttribute('y', '120');
    appTitle.setAttribute('text-anchor', 'middle');
    appTitle.setAttribute('fill', 'white');
    appTitle.setAttribute('font-size', '16');
    appTitle.setAttribute('font-weight', 'bold');
    appTitle.textContent = '猫爪补光';
    svg.appendChild(appTitle);
    
    // 灯光按钮
    const lightButton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    lightButton.setAttribute('x', '170');
    lightButton.setAttribute('y', '100');
    lightButton.setAttribute('width', '40');
    lightButton.setAttribute('height', '40');
    lightButton.setAttribute('rx', '8');
    lightButton.setAttribute('ry', '8');
    lightButton.setAttribute('fill', 'rgba(255, 255, 255, 0.2)');
    svg.appendChild(lightButton);
    
    // 灯光图标
    const lightIcon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    lightIcon.setAttribute('cx', '190');
    lightIcon.setAttribute('cy', '120');
    lightIcon.setAttribute('r', '10');
    lightIcon.setAttribute('fill', '#9b59b6');
    svg.appendChild(lightIcon);
    
    // 猫爪星形光效
    const starLight = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    starLight.setAttribute('d', 'M150,250 L170,200 L150,150 L130,200 Z M120,230 L170,230 L190,270 L100,270 Z');
    starLight.setAttribute('fill', 'url(#starGradient)');
    starLight.setAttribute('opacity', '0.8');
    svg.appendChild(starLight);
    
    // 创建渐变
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', 'starGradient');
    gradient.setAttribute('cx', '50%');
    gradient.setAttribute('cy', '50%');
    gradient.setAttribute('r', '50%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#d35ef5'); // 亮紫色
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#9b59b6'); // 暗紫色
    stop2.setAttribute('stop-opacity', '0.5');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // 控制面板背景
    const controlPanel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    controlPanel.setAttribute('x', '70');
    controlPanel.setAttribute('y', '320');
    controlPanel.setAttribute('width', '160');
    controlPanel.setAttribute('height', '90');
    controlPanel.setAttribute('rx', '10');
    controlPanel.setAttribute('ry', '10');
    controlPanel.setAttribute('fill', 'rgba(255, 255, 255, 0.2)');
    svg.appendChild(controlPanel);
    
    // 颜色选择器
    const colorSlider = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    colorSlider.setAttribute('x', '80');
    colorSlider.setAttribute('y', '340');
    colorSlider.setAttribute('width', '140');
    colorSlider.setAttribute('height', '15');
    colorSlider.setAttribute('rx', '7.5');
    colorSlider.setAttribute('ry', '7.5');
    colorSlider.setAttribute('fill', 'url(#colorGradient)');
    svg.appendChild(colorSlider);
    
    // 颜色选择器渐变
    const colorGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    colorGradient.setAttribute('id', 'colorGradient');
    colorGradient.setAttribute('x1', '0%');
    colorGradient.setAttribute('y1', '0%');
    colorGradient.setAttribute('x2', '100%');
    colorGradient.setAttribute('y2', '0%');
    
    const colors = ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9900ff', '#ff00ff'];
    colors.forEach((color, index) => {
        const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop.setAttribute('offset', `${index * (100 / (colors.length - 1))}%`);
        stop.setAttribute('stop-color', color);
        colorGradient.appendChild(stop);
    });
    
    defs.appendChild(colorGradient);
    
    // 颜色选择器滑块
    const colorSliderHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    colorSliderHandle.setAttribute('cx', '150');
    colorSliderHandle.setAttribute('cy', '347.5');
    colorSliderHandle.setAttribute('r', '10');
    colorSliderHandle.setAttribute('fill', 'white');
    colorSliderHandle.setAttribute('stroke', '#ddd');
    colorSliderHandle.setAttribute('stroke-width', '2');
    svg.appendChild(colorSliderHandle);
    
    // 亮度文本
    const brightnessText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    brightnessText.setAttribute('x', '80');
    brightnessText.setAttribute('y', '375');
    brightnessText.setAttribute('fill', 'white');
    brightnessText.setAttribute('font-size', '12');
    brightnessText.textContent = '亮度';
    svg.appendChild(brightnessText);
    
    // 亮度滑块
    const brightnessSlider = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    brightnessSlider.setAttribute('x', '80');
    brightnessSlider.setAttribute('y', '385');
    brightnessSlider.setAttribute('width', '140');
    brightnessSlider.setAttribute('height', '8');
    brightnessSlider.setAttribute('rx', '4');
    brightnessSlider.setAttribute('ry', '4');
    brightnessSlider.setAttribute('fill', '#ddd');
    svg.appendChild(brightnessSlider);
    
    // 亮度滑块填充部分
    const brightnessSliderFill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    brightnessSliderFill.setAttribute('x', '80');
    brightnessSliderFill.setAttribute('y', '385');
    brightnessSliderFill.setAttribute('width', '70');
    brightnessSliderFill.setAttribute('height', '8');
    brightnessSliderFill.setAttribute('rx', '4');
    brightnessSliderFill.setAttribute('ry', '4');
    brightnessSliderFill.setAttribute('fill', '#d35ef5'); // 紫色
    svg.appendChild(brightnessSliderFill);
    
    // 亮度滑块手柄
    const brightnessSliderHandle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    brightnessSliderHandle.setAttribute('cx', '150');
    brightnessSliderHandle.setAttribute('cy', '389');
    brightnessSliderHandle.setAttribute('r', '8');
    brightnessSliderHandle.setAttribute('fill', '#d35ef5');
    svg.appendChild(brightnessSliderHandle);
    
    // 添加到容器
    heroImageContainer.innerHTML = '';
    heroImageContainer.appendChild(svg);
    
    // 保存SVG到images目录
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // 创建images目录
    const imagesFolder = document.createElement('div');
    imagesFolder.id = 'images-folder';
    imagesFolder.style.display = 'none';
    document.body.appendChild(imagesFolder);
    
    // 创建一个链接元素，用于保存SVG
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = 'hero-mockup.svg';
    imagesFolder.appendChild(link);
}

// 创建二维码SVG
function createQRCode() {
    const qrCodeContainer = document.querySelector('.qr-code img');
    if (!qrCodeContainer) return;
    
    // 创建SVG元素
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '150');
    svg.setAttribute('height', '150');
    svg.setAttribute('viewBox', '0 0 150 150');
    svg.setAttribute('class', 'qr-code-svg');
    
    // 背景
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', '150');
    background.setAttribute('height', '150');
    background.setAttribute('fill', 'white');
    svg.appendChild(background);
    
    // 简单的QR码模式
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if ((i === 0 || i === 6) || (j === 0 || j === 6) || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
                const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                square.setAttribute('x', 20 + j * 15);
                square.setAttribute('y', 20 + i * 15);
                square.setAttribute('width', '15');
                square.setAttribute('height', '15');
                square.setAttribute('fill', 'black');
                svg.appendChild(square);
            }
        }
    }
    
    // 添加到容器
    qrCodeContainer.parentNode.replaceChild(svg, qrCodeContainer);
    
    // 保存SVG到images目录
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // 创建一个链接元素，用于保存SVG
    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = 'qr-code.svg';
    document.getElementById('images-folder').appendChild(link);
}