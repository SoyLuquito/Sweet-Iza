// Landing Page Sweet Iza

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa AOS (CORRIGIDO - verifica se existe)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Menu mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = '';
                navLinks.style.position = '';
                navLinks.style.top = '';
                navLinks.style.left = '';
                navLinks.style.width = '';
                navLinks.style.background = '';
                navLinks.style.backdropFilter = '';
                navLinks.style.padding = '';
                navLinks.style.gap = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(229, 219, 209, 0.98)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.padding = '20px';
                navLinks.style.gap = '20px';
                navLinks.style.textAlign = 'center';
            }
        });
    }
    
    // Botões de pedido via WhatsApp
    const orderBtns = document.querySelectorAll('.order-btn');
    const phoneNumber = '5511925324479';
    
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const produto = btn.getAttribute('data-produto') || 'doce artesanal';
            const message = `Olá! Gostaria de pedir o *${produto}* da Sweet Iza. Poderia me ajudar? 🍰`;
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        });
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            showToast(`📧 Obrigado! Enviamos um desconto de 10% para ${email}`, '#f6b7d4');
            newsletterForm.reset();
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(229, 219, 209, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.background = 'rgba(229, 219, 209, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        lastScroll = currentScroll;
    });
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Fecha menu mobile se estiver aberto
                if (window.innerWidth <= 768 && navLinks && navLinks.style.display === 'flex') {
                    navLinks.style.display = '';
                    navLinks.style.position = '';
                    navLinks.style.top = '';
                    navLinks.style.left = '';
                    navLinks.style.width = '';
                    navLinks.style.background = '';
                    navLinks.style.backdropFilter = '';
                    navLinks.style.padding = '';
                    navLinks.style.gap = '';
                }
            }
        });
    });
    
    // Toast function
    function showToast(message, bgColor) {
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <div style="
                background: ${bgColor};
                color: #1f2440;
                padding: 12px 20px;
                border-radius: 50px;
                font-size: 0.85rem;
                font-weight: 500;
                box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255,255,255,0.3);
            ">
                ${message}
            </div>
        `;
        toast.style.position = 'fixed';
        toast.style.bottom = '100px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.zIndex = '10000';
        toast.style.animation = 'toastSlideUp 0.3s ease-out';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlideDown 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    
    // Contador animado dos stats
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.innerText;
                const number = parseInt(text);
                
                if (!isNaN(number) && el.getAttribute('data-counted') !== 'true') {
                    el.setAttribute('data-counted', 'true');
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            el.innerText = text;
                            clearInterval(timer);
                        } else {
                            el.innerText = Math.floor(current);
                        }
                    }, 20);
                }
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        if (stat) observer.observe(stat);
    });
    
    // Animação de entrada para o hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    console.log('✨ Sweet Iza - Landing Page carregada com sucesso ✨');
});

// Adiciona estilos para animações
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes toastSlideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes toastSlideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(toastStyles);