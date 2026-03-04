// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initLoader();
    initNavigation();
    initScrollEffects();
    initCarousel();
    initModal();
    initForm();
    initBackToTop();
    initAnimations();
});

// 加载动画
function initLoader() {
    const loader = document.querySelector('.loader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

//导航栏功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    //滚时动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    //汉菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    //点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    //平滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

//效果
function initScrollEffects() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// 图片轮播
function initCarousel() {
    const carouselImages = document.querySelectorAll('.image-carousel img');
    let currentImage = 0;

    // 设置第一张图片为激活状态
    if (carouselImages.length > 0) {
        carouselImages[0].classList.add('active');
    }

    if (carouselImages.length > 1) {
        setInterval(() => {
            carouselImages[currentImage].classList.remove('active');
            currentImage = (currentImage + 1) % carouselImages.length;
            carouselImages[currentImage].classList.add('active');
        }, 4000);
    }
}

// 模态框功能
function initModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    const viewDetailButtons = document.querySelectorAll('.view-detail');
    const productCards = document.querySelectorAll('.product-card');

    // 为每个产品卡片添加点击事件
    productCards.forEach((card, index) => {
        const viewBtn = card.querySelector('.view-detail');
        const productImage = card.querySelector('.product-image img');
        const productTitle = card.querySelector('.product-info h4');
        const productDescription = card.querySelector('.product-info p');
        const productPrice = card.querySelector('.product-price');

        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // 设置模态框内容
            document.getElementById('modalImg').src = productImage.src;
            document.getElementById('modalTitle').textContent = productTitle.textContent;
            document.getElementById('modalDescription').textContent = productDescription.textContent;
            document.getElementById('modalPrice').textContent = productPrice.textContent;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    //点击模态框外部关闭
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

//表单处理
function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            //简单验证
            if (!name || !email || !message) {
                showMessage('请填写所有必填字段', 'error');
                return;
            }
            
            //格式验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟发送成功
            showMessage('消息发送成功！我们会尽快回复您。', 'success');
            contactForm.reset();
        });
    }
}

// 消息提示
function showMessage(message, type) {
    //移除现有的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message-toast ${type}`;
    messageEl.textContent = message;
    
    // 添加样式
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    
    document.body.appendChild(messageEl);
    
    //显示动画
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, 3000);
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

//动画效果
function initAnimations() {
    // 产品卡片悬停动画
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 分类标题动画
    const categoryTitles = document.querySelectorAll('.category-title');
    
    categoryTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// 产品过滤功能（可选）
function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// 图片预加载
function preloadImages() {
    const images = [
        'Product Jukebox.jpg',
        'Product Jukebox group.jpg',
        'little jukebox.jpg',
        'foldable table .png',
        '1.6meter foldable table.jpg',
        'director chair.jpg',
        'foldable chair .jpg',
        'Product1.jpg',
        'Product2.jpg',
        'all jukebox group.jpg'
    ];
    
    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
}

// 页面可见性API
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面显示时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

//性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

//性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 优化滚动事件
const optimizedScrollHandler = throttle(function() {
    //处理处理逻辑
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

//图片
preloadImages();