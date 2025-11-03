// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainScreen = document.getElementById('main-screen');
    const enterButton = document.getElementById('enter-button');
    const slideshow = document.getElementById('slideshow');
    const slideshowIndicators = document.querySelector('.slideshow-indicators');
    const floatingMessages = document.getElementById('floating-messages');
    const backgroundMusic = document.getElementById('background-music');
    const balloonsContainer = document.getElementById('balloons-container');
    const bubblesContainer = document.getElementById('bubbles-container');

    // 爱情宣言数组
    const loveMessages = [
        "姿妤，遇见你是我生命中最美的奇迹 ❤️",
        "每一天爱你多一点，直到永远 💖",
        "你的笑容是我每天最大的幸福 😊",
        "感谢你出现在我的生命里 💫",
        "我对你的爱，如同繁星永不熄灭 🌟",
        "有你的地方，就是我的天堂 🏰",
        "你是我生命中最美好的礼物 🎁",
        "爱你，是我做过最正确的事 💗",
        "和你在一起的每一刻都值得珍藏 📸",
        "我愿意用一生的时间来爱你 💕",
        "你是我的阳光，温暖我的每一天 ☀️",
        "有你在身边，一切都变得美好 ✨",
        "我对你的爱，超越时间和空间 ⏳",
        "你是我的唯一，我心中的宝贝 💝",
        "和你一起慢慢变老，是我最大的愿望 🕰️"
    ];

    // 照片数据
    const photos = [
        { path: 'photos/1.jpg', alt: '姿妤的照片1' },
        { path: 'photos/2.jpg', alt: '姿妤的照片2' },
        { path: 'photos/3.jpg', alt: '姿妤的照片3' },
        { path: 'photos/4.jpg', alt: '姿妤的照片4' },
        { path: 'photos/5.jpg', alt: '姿妤的照片5' },
        { path: 'photos/6.jpg', alt: '姿妤的照片6' },
        { path: 'photos/7.jpg', alt: '姿妤的照片7' }
    ];

    // 进入主页面
    enterButton.addEventListener('click', function() {
        welcomeScreen.style.opacity = '0';
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainScreen.classList.remove('hidden');
            
            setTimeout(() => {
                mainScreen.classList.add('visible');
                // 播放背景音乐
                backgroundMusic.play().catch(e => {
                    console.log('背景音乐播放失败:', e);
                });
                
                // 开始生成装饰
                createBalloons();
                createBubbles();
                
                // 开始显示浮动消息
                showFloatingMessages();
                
                // 初始化轮播图
                initSlideshow();
            }, 100);
        }, 1000);
    });

    // 轮播图功能
    let currentSlide = 0;
    let slideshowInterval;

    function initSlideshow() {
        // 创建轮播图片
        photos.forEach((photo, index) => {
            // 创建幻灯片
            const slide = document.createElement('div');
            slide.classList.add('slide');
            if (index === 0) slide.classList.add('active');
            
            const img = document.createElement('img');
            img.src = photo.path;
            img.alt = photo.alt;
            
            slide.appendChild(img);
            slideshow.appendChild(slide);
            
            // 创建指示器
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                showSlide(index);
                // 重置自动播放
                resetSlideshowInterval();
            });
            
            slideshowIndicators.appendChild(indicator);
        });
        
        // 开始自动轮播
        startSlideshow();
    }

    function showSlide(index) {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.indicator');
        
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % photos.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideshowInterval = setInterval(nextSlide, 5000); // 每5秒切换一张
    }

    function resetSlideshowInterval() {
        clearInterval(slideshowInterval);
        startSlideshow();
    }

    // 生成苹果风格气球
    function createBalloons() {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink'];
        
        function addBalloon() {
            const balloon = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 40 + 30; // 30-70px
            
            balloon.classList.add('balloon', `balloon-${color}`);
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.3}px`; // 保持气球比例
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.animationDuration = `${Math.random() * 15 + 20}s`; // 更慢的上升速度
            balloon.style.opacity = `${Math.random() * 0.3 + 0.7}`; // 更高的不透明度
            balloon.style.transform = `scale(${Math.random() * 0.3 + 0.8}) rotate(${Math.random() * 10 - 5}deg)`; // 轻微旋转
            
            // 添加轻微的摇摆动画
            balloon.style.animationName = 'float';
            balloon.style.animationTimingFunction = 'ease-in-out';
            
            balloonsContainer.appendChild(balloon);
            
            // 气球飞出屏幕后移除
            setTimeout(() => {
                // 添加淡出效果
                balloon.style.transition = 'opacity 1s ease-out';
                balloon.style.opacity = '0';
                setTimeout(() => balloon.remove(), 1000);
            }, 30000);
        }
        
        // 初始生成15个气球
        for (let i = 0; i < 15; i++) {
            setTimeout(addBalloon, i * 800);
        }
        
        // 每隔4秒生成一个新气球
        setInterval(addBalloon, 4000);
    }

    // 生成苹果风格泡泡
    function createBubbles() {
        function addBubble() {
            const bubble = document.createElement('div');
            const size = Math.random() * 50 + 15; // 15-65px
            
            bubble.classList.add('bubble');
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.animationDuration = `${Math.random() * 8 + 12}s`; // 更自然的上升速度
            bubble.style.opacity = `${Math.random() * 0.3 + 0.4}`; // 更真实的透明度
            
            // 添加随机的水平移动
            bubble.style.transform = `translateX(${Math.random() * 20 - 10}px)`;
            
            bubblesContainer.appendChild(bubble);
            
            // 泡泡消失后移除
            setTimeout(() => {
                // 添加淡出效果
                bubble.style.transition = 'opacity 1.5s ease-out';
                bubble.style.opacity = '0';
                setTimeout(() => bubble.remove(), 1500);
            }, 15000);
        }
        
        // 初始生成20个泡泡
        for (let i = 0; i < 20; i++) {
            setTimeout(addBubble, i * 400);
        }
        
        // 每隔800毫秒生成一个新泡泡
        setInterval(addBubble, 800);
    }

    // 显示苹果风格浮动消息
    function showFloatingMessages() {
        function showMessage() {
            const message = document.createElement('div');
            const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            
            message.classList.add('floating-message');
            message.textContent = randomMessage;
            
            // 随机位置，但更集中在轮播图周围
            const side = Math.floor(Math.random() * 4); // 0: 上, 1: 右, 2: 下, 3: 左
            let left, top;
            
            switch(side) {
                case 0: // 上方
                    left = `${Math.random() * 70 + 15}%`; // 15%-85%
                    top = '5%';
                    break;
                case 1: // 右侧
                    left = '85%';
                    top = `${Math.random() * 60 + 20}%`; // 20%-80%
                    break;
                case 2: // 下方
                    left = `${Math.random() * 70 + 15}%`; // 15%-85%
                    top = '80%';
                    break;
                case 3: // 左侧
                    left = '5%';
                    top = `${Math.random() * 60 + 20}%`; // 20%-80%
                    break;
            }
            
            message.style.left = left;
            message.style.top = top;
            message.style.animationDuration = `${Math.random() * 2 + 4}s`; // 4-6秒
            
            floatingMessages.appendChild(message);
            
            // 消息动画结束后移除
            setTimeout(() => {
                message.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                message.style.opacity = '0';
                message.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    message.remove();
                }, 500);
            }, 6000);
        }
        
        // 初始密集显示5条消息
        for (let i = 0; i < 5; i++) {
            setTimeout(showMessage, i * 500);
        }
        
        // 每隔800毫秒显示一条新消息（更紧密的间隔）
        setInterval(showMessage, 800);
    }

    // 处理键盘事件
    document.addEventListener('keydown', function(e) {
        // 左右箭头控制轮播图
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetSlideshowInterval();
        } else if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + photos.length) % photos.length;
            showSlide(currentSlide);
            resetSlideshowInterval();
        }
    });

    // 防止右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // 添加响应式处理
    function handleResize() {
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            if (viewportWidth < 768) {
                slideshowContainer.style.width = '90%';
                slideshowContainer.style.height = '50vh';
            } else {
                slideshowContainer.style.width = '80%';
                slideshowContainer.style.height = '70vh';
            }
        }
    }

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 初始执行一次
    handleResize();
});