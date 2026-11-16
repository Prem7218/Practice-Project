
const host = 'http://localhost:3000';

const ask = document.getElementById('query');
const form = document.getElementById('form');
const answer = document.getElementById('answer');
const answerBox = document.getElementById('answer-box');
const submitBtn = document.getElementById('submit');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = ask.value.trim();

    if (!question) return;

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Generating...';

        const response = await axios.post(host, {
            ask: question
        });

        // Supports common custom response structures
        const generatedAnswer =
            response.data.data?.answer ??
            response.data.answer;

        answer.innerText = generatedAnswer;
        answerBox.hidden = false;

    } catch (error) {
        console.error(
            error.response?.data || error.message
        );

        answer.innerText = 'Unable to generate response.';
        answerBox.hidden = false;

    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
    }
});
