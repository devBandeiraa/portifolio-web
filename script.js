// ============================================
// PORTFÓLIO INTERATIVO - JORDAN BANDEIRA
// ============================================

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll(); // Inicializa primeiro para garantir que os links funcionem
    initAnimations();
    initScrollEffects();
    initTypingEffect();
    initCardInteractions();
    initNavbarScroll();
    initParticleEffect();
    initSkillAnimations();
});

// ============================================
// 1. ANIMAÇÕES DE ENTRADA (Fade In on Scroll)
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todas as seções e cards
    const elements = document.querySelectorAll('section, .project-card, .skill-category, .experience-item, .contact-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ============================================
// 2. EFEITOS DE SCROLL
// ============================================
function initScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Efeito de parallax no header
        const header = document.querySelector('header');
        if (header) {
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 300);
        }
        
        // Navbar aparece/desaparece no scroll
        if (navbar) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        }
    });
}

// ============================================
// 3. EFEITO DE DIGITAÇÃO NO TÍTULO
// ============================================
function initTypingEffect() {
    const titleElement = document.querySelector('h1');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.borderRight = '3px solid var(--accent-green)';
    
    let i = 0;
    const typingSpeed = 100;
    
    function type() {
        if (i < originalText.length) {
            titleElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            // Remove o cursor após terminar
            setTimeout(() => {
                titleElement.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Inicia após um pequeno delay
    setTimeout(type, 500);
}

// ============================================
// 4. SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO
// ============================================
function initSmoothScroll() {
    // Aguarda um pequeno delay para garantir que o DOM está totalmente carregado
    setTimeout(() => {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    const navbar = document.querySelector('nav');
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    
                    // Calcula a posição do elemento alvo
                    const targetRect = target.getBoundingClientRect();
                    const targetPosition = targetRect.top + window.pageYOffset;
                    const offsetPosition = Math.max(0, targetPosition - navbarHeight - 20);
                    
                    // Faz o scroll suave
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualiza a URL sem recarregar a página
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                } else {
                    console.warn('Elemento não encontrado:', href);
                }
            });
        });
    }, 100);
}

// ============================================
// 5. INTERAÇÕES COM CARDS
// ============================================
function initCardInteractions() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .contact-card');
    
    cards.forEach(card => {
        // Efeito de tilt 3D no hover
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
        
        // Efeito de click
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ============================================
// 6. NAVBAR COM INDICADOR DE SEÇÃO ATIVA
// ============================================
function initNavbarScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// 7. EFEITO DE PARTÍCULAS NO BACKGROUND
// ============================================
function initParticleEffect() {
    const terminalLines = document.querySelector('.terminal-lines');
    if (!terminalLines) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    canvas.id = 'particle-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = '#39d353';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Conectar partículas próximas
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(57, 211, 83, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Redimensionar canvas quando a janela mudar de tamanho
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// 8. ANIMAÇÕES NAS HABILIDADES
// ============================================
function initSkillAnimations() {
    const skillItems = document.querySelectorAll('.skill-category li');
    
    skillItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.color = 'var(--accent-green)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = '';
        });
    });
}

// ============================================
// 9. EFEITO DE CURSOR PERSONALIZADO (Opcional)
// ============================================
function initCustomCursor() {
    // Só ativa em dispositivos com mouse (não touch)
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid var(--accent-green);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.display = 'block';
        });
        
        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// ============================================
// 10. CONTADOR ANIMADO (se houver números)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ============================================
// 11. EFEITO DE GLOW NO HOVER DOS LINKS
// ============================================
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px var(--accent-green)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
});

// ============================================
// 12. ANIMAÇÃO DE SCROLL PROGRESS
// ============================================
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-green), var(--accent-blue));
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Inicializa a barra de progresso
initScrollProgress();

