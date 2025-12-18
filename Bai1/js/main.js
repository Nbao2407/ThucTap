// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    const mobileLinks = document.querySelectorAll('.header__mobile-link');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('is-open');
            
            const menuIcons = menuToggle.querySelectorAll('.header__menu-icon');
            if (mobileMenu.classList.contains('is-open')) {
                menuIcons[0].style.transform = 'rotate(45deg) translateY(8px)';
                menuIcons[1].style.opacity = '0';
                menuIcons[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                menuIcons[0].style.transform = '';
                menuIcons[1].style.opacity = '';
                menuIcons[2].style.transform = '';
            }
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                
                const menuIcons = menuToggle.querySelectorAll('.header__menu-icon');
                menuIcons[0].style.transform = '';
                menuIcons[1].style.opacity = '';
                menuIcons[2].style.transform = '';
            });
        });
    }
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '' && href !== '#new-version') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.borderBottom = '1px solid rgba(128, 128, 128, 0.3)';
        } else {
            header.style.borderBottom = '1px solid rgba(128, 128, 128, 0.2)';
        }
        
        lastScroll = currentScroll;
    });
    
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
    
    const animateElements = document.querySelectorAll('.hero__badge, .hero__title, .hero__description, .hero__cta, .hero__preview');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
    
    // Language Selector Functionality
    function initLanguageSelector(selectorId, triggerId, dropdownId, flagId, labelId) {
        const languageSelector = document.getElementById(selectorId);
        const languageTrigger = document.getElementById(triggerId);
        const languageDropdown = document.getElementById(dropdownId);
        const selectedFlag = document.getElementById(flagId);
        const selectedLabel = document.getElementById(labelId);
        const languageOptions = languageSelector?.querySelectorAll('.language-selector__option');
        
        if (!languageSelector || !languageTrigger || !languageDropdown) return;
        
        // Toggle dropdown
        languageTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = languageTrigger.getAttribute('aria-expanded') === 'true';
            
            languageTrigger.setAttribute('aria-expanded', !isOpen);
            languageDropdown.classList.toggle('is-open');
        });
        
        // Select language option
        languageOptions.forEach(option => {
            option.addEventListener('click', function() {
                const code = this.getAttribute('data-code');
                const flag = this.getAttribute('data-flag');
                const label = this.getAttribute('data-label');
                
                if (selectedFlag) selectedFlag.textContent = flag;
                if (selectedLabel) selectedLabel.textContent = label;
                
                languageOptions.forEach(opt => opt.classList.remove('is-selected'));
                this.classList.add('is-selected');
                
                languageDropdown.classList.remove('is-open');
                languageTrigger.setAttribute('aria-expanded', 'false');
                
                localStorage.setItem('selectedLanguage', code);
                syncLanguageSelectors(code, flag, label);
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!languageSelector.contains(e.target)) {
                languageDropdown.classList.remove('is-open');
                languageTrigger.setAttribute('aria-expanded', 'false');
            }
        });
        
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            const savedOption = languageSelector.querySelector(`[data-code="${savedLanguage}"]`);
            if (savedOption) {
                savedOption.click();
            }
        }
    }
    
    function syncLanguageSelectors(code, flag, label) {
        const desktopFlag = document.getElementById('selected-flag');
        const desktopLabel = document.getElementById('selected-label');
        if (desktopFlag) desktopFlag.textContent = flag;
        if (desktopLabel) desktopLabel.textContent = label;
        
        const mobileLabel = document.getElementById('selected-label-mobile');
        if (mobileLabel) mobileLabel.textContent = flag;
    }
    
    initLanguageSelector('language-selector', 'language-trigger', 'language-dropdown', 'selected-flag', 'selected-label');
    initLanguageSelector('language-selector-mobile', 'language-trigger-mobile', 'language-dropdown-mobile', null, 'selected-label-mobile');
});
