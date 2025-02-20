document.addEventListener('DOMContentLoaded', () => {
    const menuSidebar = document.getElementById('menu-sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    const restoreBtn = document.createElement('button');
    restoreBtn.id = 'minimize-restore-btn';
    restoreBtn.className = 'minimize-restore-btn';
    restoreBtn.innerHTML = '<i class="fas fa-window-restore"></i> Restore Menu';
    document.body.appendChild(restoreBtn);

    // Close Menu Functionality
    closeMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        menuSidebar.classList.remove('open');
        menuSidebar.classList.remove('minimized');
        restoreBtn.classList.remove('show');
        menuToggle.classList.remove('active');
    });

    menuToggle.addEventListener('click', () => {
        menuSidebar.classList.remove('minimized');
        restoreBtn.classList.remove('show');
        
        menuSidebar.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });
});