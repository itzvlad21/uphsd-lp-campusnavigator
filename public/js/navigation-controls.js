document.addEventListener('DOMContentLoaded', () => {
    const navigationControls = document.getElementById('path-navigation-controls');
    const minimizeBtn = document.getElementById('minimize-nav-btn');
    const navigationSelectorsContainer = document.querySelector('.navigation-selectors');
    const navigationActionsContainer = document.querySelector('.navigation-actions');
    const navigationControlsContainer = document.getElementById('navigation-controls');

    let isMinimized = false;

    function handleResponsiveMinimization() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            isMinimized = true;
            navigationSelectorsContainer.style.display = 'none';
            navigationActionsContainer.style.display = 'none';
            navigationControlsContainer.style.display = 'none';
            minimizeBtn.textContent = '☰';
            navigationControls.style.maxHeight = '60px';
            
            navigationControls.style.position = 'fixed';
            navigationControls.style.bottom = '10px';
            navigationControls.style.left = '50px';
            navigationControls.style.width = 'calc(100% - 100px)';
            navigationControls.style.zIndex = '1000';
        } else {
            isMinimized = false;
            navigationSelectorsContainer.style.display = 'block';
            navigationActionsContainer.style.display = 'block';
            navigationControlsContainer.style.display = 'grid';
            minimizeBtn.textContent = '−';
            navigationControls.style.maxHeight = '100%';
            
            navigationControls.style.position = 'fixed';
            navigationControls.style.bottom = '20px';
            navigationControls.style.left = '20px';
            navigationControls.style.width = '350px';
            navigationControls.style.zIndex = '1000';
        }
    }

    handleResponsiveMinimization();

    window.addEventListener('load', handleResponsiveMinimization);
    window.addEventListener('resize', handleResponsiveMinimization);

    minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        if (isMinimized) {
            navigationControls.style.maxHeight = '60px';
            minimizeBtn.textContent = '☰';
            navigationControlsContainer.style.display = 'none';
            navigationActionsContainer.style.display = 'none';
            navigationSelectorsContainer.style.display = 'none';
        } else {
            navigationSelectorsContainer.style.display = 'block';
            navigationActionsContainer.style.display = 'block';
            navigationControlsContainer.style.display = 'grid';
            minimizeBtn.textContent = '−';
            navigationControls.style.maxHeight = '100%';
        }
        navigationControls.style.transition = 'max-height 0.3s ease-in-out';
    });
});