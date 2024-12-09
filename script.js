window.addEventListener('scroll', function () {
    const nav = document.querySelector('body > nav');

    if (window.scrollY > 0) {
        nav.style.backgroundColor = 'rgba(250, 250, 250, 0.55)';
        nav.style.backdropFilter = 'blur(8px)';
    } else {
        nav.style.backgroundColor = 'rgb(250, 250, 250)';
        nav.style.backdropFilter = 'none';
    }
});

// sidebar scroll effect

window.addEventListener('scroll', () => {
    const hideBg = document.getElementById('hide-bg');
    hideBg.style.opacity = window.scrollY > 0 ? '0' : '1';
});

document.addEventListener('DOMContentLoaded', function () {
    // 导航栏滚动效果
    window.addEventListener('scroll', function () {
        const nav = document.querySelector('body > nav');
        if (window.scrollY > 0) {
            nav.style.backgroundColor = 'rgba(250, 250, 250, 0.55)';
            nav.style.backdropFilter = 'blur(8px)';
        } else {
            nav.style.backgroundColor = 'rgb(250, 250, 250)';
            nav.style.backdropFilter = 'none';
        }
    });

    // 背景切换效果
    window.addEventListener('scroll', () => {
        const hideBg = document.getElementById('hide-bg');
        hideBg.style.opacity = window.scrollY > 0 ? '0' : '1';
    });

    // 侧边栏导航
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('section[id]');

    // 计算导航栏高度和额外偏移量
    const navHeight = document.querySelector('nav').offsetHeight;
    const extraOffset = 20; // 额外偏移量，可以调整
    const totalOffset = navHeight + extraOffset;

    // 为每个侧边栏链接添加点击事件
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // 获取目标部分的 id
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // 获取目标位置
                const targetPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - totalOffset;

                // 平滑滚动到目标位置
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 更新活动状态
                sidebarLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 滚动监听，更新活动链接
    const observerOptions = {
        threshold: 0.2,
        rootMargin: `-${totalOffset}px 0px -70% 0px`
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${targetId}"]`);

                if (correspondingLink) {
                    sidebarLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // 观察所有章节
    sections.forEach(section => {
        observer.observe(section);
    });
});


/* 添加滚动观察的JavaScript代码 */

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.content-card');
    
    function updateScale() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // 计算卡片中心点
            const cardCenter = rect.top + (rect.height / 2);
            const viewportCenter = windowHeight / 2;
            
            // 计算距离视口中心的距离
            const distance = Math.abs(cardCenter - viewportCenter);
            const maxDistance = windowHeight / 2 + rect.height;
            
            // 计算缩放比例：0.9是最小缩放，1是最大缩放
            const progress = 1 - Math.min(distance / maxDistance, 1);
            const scale = 0.9 + (progress * 0.1); // 从0.9到1.0
            
            // 应用缩放
            card.style.transform = `scale(${scale})`;
        });
    }

    // 初始化时执行一次
    updateScale();

    // 使用requestAnimationFrame优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScale();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 窗口大小改变时重新计算
    window.addEventListener('resize', updateScale);
});