// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initMobileMenu();
});

// 导航栏滚动效果
function initNavigation() {
    const navbar = document.querySelector('.navbar-modern');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1.5rem 2rem';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
        }
    });
}

// 平滑滚动
function initScrollEffects() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时显示/隐藏导航栏
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// 移动端菜单
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // 点击链接时关闭菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// 动画效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.product-card-modern, .info-card, .feature-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 表单提交处理
const contactForm = document.querySelector('.contact-form-modern form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(this);
        const name = formData.get('name') || 'Visitor';
        const email = formData.get('email') || '';
        const message = formData.get('message') || '';
        
        // 简单验证
        if (!email || !message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // 邮件格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // 模拟发送成功
        showMessage('Message sent successfully! We will get back to you soon.', 'success');
        this.reset();
    });
}

// 消息提示
function showMessage(message, type) {
    // 移除现有的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建消息元素
    const messageEl = document.createElement('div');
    messageEl.className = `message-toast ${type}`;
    messageEl.textContent = message;
    
    // 添加样式
    Object.assign(messageEl.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '3000',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        background: type === 'success' ? '#27ae60' : '#e74c3c'
    });
    
    document.body.appendChild(messageEl);
    
    // 显示动画
    setTimeout(() => {
        messageEl.style.transform = 'translateX(0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        messageEl.style.transform = 'translateX(100%)';
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, 3000);
}

// 性能优化：防抖函数
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

// 性能优化：节流函数
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
    // 处理滚动逻辑
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);
