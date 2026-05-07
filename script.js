// script.js - Efeitos visuais refinados + doce flutuante

document.addEventListener('DOMContentLoaded', () => {
    // Lista de docinhos para flutuar
    const docinhos = ['🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯'];
    
    // Criar elemento de ondulação SVG
    createWaveOrnament();
    
    // Função para criar o ondulado SVG com altura aumentada
    function createWaveOrnament() {
        const waveDiv = document.createElement('div');
        waveDiv.className = 'wave-ornament';
        waveDiv.innerHTML = `
            <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" style="min-height: 400px;">
                <path fill="#f6b7d4" fill-opacity="0.25" d="M0,96L48,101.3C96,107,192,117,288,112C384,107,480,85,576,90.7C672,96,768,128,864,133.3C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                <path fill="#f6b7d4" fill-opacity="0.15" d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,138.7C672,149,768,139,864,117.3C960,96,1056,64,1152,64C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                <path fill="#f6b7d4" fill-opacity="0.08" d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,138.7C672,128,768,128,864,138.7C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        `;
        document.body.appendChild(waveDiv);
    }
    
    // Sistema de docinhos flutuantes que sobem pela tela
    function criarDocinhoFlutuante() {
        const docinho = document.createElement('div');
        const docinhoAleatorio = docinhos[Math.floor(Math.random() * docinhos.length)];
        docinho.textContent = docinhoAleatorio;
        docinho.className = 'docinho-flutuante';
        
        // Posição horizontal aleatória (sempre nas laterais ou espalhado, mas preferencialmente laterais)
        const isLeftSide = Math.random() > 0.5;
        let leftPosition;
        if (isLeftSide) {
            leftPosition = Math.random() * 15; // 0% a 15% da esquerda
        } else {
            leftPosition = 85 + Math.random() * 15; // 85% a 100% da esquerda
        }
        
        // Tamanho aleatório entre 24px e 48px
        const tamanho = 24 + Math.random() * 24;
        
        // Duração da animação entre 6 e 12 segundos
        const duracao = 6 + Math.random() * 6;
        
        // Atraso inicial aleatório
        const atraso = Math.random() * 5;
        
        docinho.style.cssText = `
            position: fixed;
            bottom: -50px;
            left: ${leftPosition}%;
            font-size: ${tamanho}px;
            opacity: 0;
            z-index: 1000;
            pointer-events: none;
            animation: subirDocinho ${duracao}s linear ${atraso}s infinite;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        `;
        
        document.body.appendChild(docinho);
        
        // Remover o elemento após a animação para não acumular
        setTimeout(() => {
            if (docinho && docinho.remove) {
                docinho.remove();
            }
        }, (duracao + atraso) * 1000);
    }
    
    // Adicionar keyframe da animação de subir
    const style = document.createElement('style');
    style.textContent = `
        @keyframes subirDocinho {
            0% {
                bottom: -50px;
                opacity: 0;
                transform: rotate(0deg) translateX(0);
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                bottom: 100vh;
                opacity: 0;
                transform: rotate(360deg) translateX(${Math.random() * 30 - 15}px);
            }
        }
        
        .docinho-flutuante {
            will-change: transform, bottom;
        }
        
        /* Ondulação responsiva */
        .wave-ornament {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 1;
            pointer-events: none;
        }
        
        .wave-svg {
            display: block;
            width: 100%;
            height: auto;
            min-height: 80px;
        }
        
        @media (max-width: 768px) {
            .wave-svg {
                min-height: 60px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Criar docinhos em intervalos regulares
    let intervaloDocinhos;
    
    function iniciarDocinhos() {
        // Criar poucos docinhos imediatamente (mude de 5 para 2)
        for (let i = 0; i < 2; i++) {  // ← Antes era 5, agora é 2
            setTimeout(() => criarDocinhoFlutuante(), i * 300);
        }
        
        // Aumentar o intervalo entre cada docinho (mude de 1500 para 4000 ou mais)
        intervaloDocinhos = setInterval(() => {
            criarDocinhoFlutuante();
        }, 4000);  // ← Antes era 1500 (1.5 segundos), agora é 4000 (4 segundos)
    }
    
    function pararDocinhos() {
        if (intervaloDocinhos) {
            clearInterval(intervaloDocinhos);
        }
    }
    
    // Iniciar os docinhos flutuantes
    iniciarDocinhos();
    
    // Parar docinhos quando a página não estiver visível para economizar recursos
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pararDocinhos();
        } else {
            iniciarDocinhos();
        }
    });
    
    // CONFIGURAÇÕES DOS LINKS
    const ifoodLink = document.getElementById('ifood-link');
    const ninenineLink = document.getElementById('ninenine-link');
    const keetaLink = document.getElementById('keeta-link');
    
    // Feedback visual ao clicar em links vazios
    const emptyLinks = [ifoodLink, ninenineLink, keetaLink];
    
    emptyLinks.forEach(link => {
        if (link && (!link.href || link.href === '#' || link.href.includes('#'))) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platformName = link.querySelector('.platform')?.innerText || 'plataforma';
                showToast(`📢 ${platformName} estará disponível em breve!`, '#f6b7d4');
            });
        }
    });
    
    // Função para mostrar notificação temporária (toast)
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
        toast.style.bottom = '20px';
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
    
    // Adiciona as animações CSS para o toast
    const toastStyle = document.createElement('style');
    toastStyle.textContent = `
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
    document.head.appendChild(toastStyle);
    
    // Efeito de ripple nos cards
    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#')) {
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.backgroundColor = 'rgba(246, 183, 212, 0.3)';
                ripple.style.width = '100px';
                ripple.style.height = '100px';
                ripple.style.transform = 'translate(-50%, -50%) scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out';
                ripple.style.pointerEvents = 'none';
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            from {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Verificação da logo
    const logoImg = document.querySelector('.avatar-logo');
    if (logoImg) {
        logoImg.addEventListener('error', () => {
            console.log('logo.png não encontrada - usando placeholder');
        });
    }
    
    // Verificação das imagens dos apps
    const platformIcons = document.querySelectorAll('.platform-icon');
    platformIcons.forEach(icon => {
        icon.addEventListener('error', () => {
            console.log(`Imagem não encontrada: ${icon.alt} - usando fallback`);
        });
    });
    
    // Efeito fluido de esticar e comprimir verticalmente os cards no scroll
    function addFluidScrollEffect() {
        const cards = document.querySelectorAll('.link-card');
        let scrollVelocity = 0;
        let lastScrollY = window.scrollY;
        let lastTimestamp = Date.now();
        let rafId = null;
        let currentScaleY = 1;
        let targetScaleY = 1;
        let currentScaleX = 1;
        let targetScaleX = 1;
        
        // Função de easing para movimento fluido
        const easeOutElastic = (t) => {
            const c4 = (2 * Math.PI) / 3;
            return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
        };
        
        // Atualiza as escalas suavemente
        function smoothUpdate() {
            // Suaviza a transição das escalas
            currentScaleY += (targetScaleY - currentScaleY) * 0.25;
            currentScaleX += (targetScaleX - currentScaleX) * 0.25;
            
            // Aplica a transformação com easing
            cards.forEach((card, index) => {
                const delay = index * 0.02;
                card.style.transition = 'transform 0.15s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
                card.style.transform = `scaleY(${currentScaleY}) scaleX(${currentScaleX})`;
            });
            
            rafId = requestAnimationFrame(smoothUpdate);
        }
        
        // Detecta scroll e calcula velocidade
        window.addEventListener('scroll', () => {
            const now = Date.now();
            const currentScrollY = window.scrollY;
            const deltaTime = Math.max(16, now - lastTimestamp);
            const deltaY = Math.abs(currentScrollY - lastScrollY);
            
            // Calcula velocidade em pixels por segundo
            scrollVelocity = deltaY / deltaTime * 1000;
            
            // Efeito baseado na velocidade do scroll
            if (scrollVelocity > 200) {
                // Estica verticalmente quando rola rápido
                const stretchAmount = Math.min(scrollVelocity / 1200, 0.08);
                targetScaleY = 1 + stretchAmount;
                targetScaleX = 1 - stretchAmount * 0.3;
            } 
            else if (scrollVelocity < 50 && deltaY > 3) {
                // Comprime verticalmente quando para de repente
                targetScaleY = 0.94;
                targetScaleX = 1.02;
                
                // Volta ao normal com bounce elástico após a compressão
                setTimeout(() => {
                    targetScaleY = 1;
                    targetScaleX = 1;
                }, 100);
            }
            else {
                // Volta ao normal suavemente
                targetScaleY = 1;
                targetScaleX = 1;
            }
            
            lastScrollY = currentScrollY;
            lastTimestamp = now;
        });
        
        // Inicia o loop de animação suave
        smoothUpdate();
        
        // Limpa ao sair
        window.addEventListener('beforeunload', () => {
            if (rafId) cancelAnimationFrame(rafId);
        });
    }

    // Chama a função
    addFluidScrollEffect();

    console.log('✨ Sweet Iza - Página com docinhos flutuantes e ícones personalizados ✨');
});

// Limpeza ao recarregar a página
window.addEventListener('beforeunload', () => {
    const docinhos = document.querySelectorAll('.docinho-flutuante');
    docinhos.forEach(docinho => docinho.remove());
});