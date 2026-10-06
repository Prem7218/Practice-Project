
let paragraph = document.getElementById('output');
let timer = 0;
let count = 0;
let resetTimer = 0;;

function debounceFunction() {
    
    console.log('Timer reset: ' + resetTimer++ + ` Comes Timer value: ${timer}`);

    clearTimeout(timer);

    console.log(`After cleared: Timer value: ${timer}`);

    timer = setTimeout(() => {
        console.log(`I am here now: Timer value: ${timer}`);
        paragraph.textContent = `Debounced function executed! Count: ${++count}`;
    }, 1000);

    console.log('Timer set: ' + resetTimer + ` Timer value: ${timer}`);
    console.log('----------------------------------');
}