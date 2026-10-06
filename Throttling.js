
let scroll = false;

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, `0`)
    }`;
}

window.addEventListener('scroll', function () {

    if(scroll) return ;
    
    scroll = true;

    setTimeout(() => {
        const scrollY = window.scrollY;
        const div = document.getElementById('scroll-display');
        const box = document.querySelector('.scroll-indicator');
        div.textContent = scrollY.toFixed(0);
        box.style.backgroundColor = getRandomColor();
        scroll = false;
    }, 10000);
});