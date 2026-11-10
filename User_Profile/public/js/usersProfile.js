
const profilePhoto = document.querySelector("#profile-photo");
const profileName = document.querySelector("#profile-name");
const birthDate = document.querySelector("#birth-date");
const birthplace = document.querySelector("#birthplace");
const career = document.querySelector("#career");

const matches = document.querySelector("#matches");
const score = document.querySelector("#score");
const fifties = document.querySelector("#fifties");
const centuries = document.querySelector("#centuries");
const wickets = document.querySelector("#wickets");
const average = document.querySelector("#average");

const API_URL = 'http://localhost:3000/users';

async function loadFunction() {

    try {
        const name = decodeURIComponent(
            window.location.pathname.split('/').pop()
        );

        const resp = await axios.get(`${API_URL}`, {
            params: { name }
        });

        const user = resp.data.data;

        profileName.textContent = user.name;

        birthDate.textContent = user.dob;
        birthDate.dateTime = user.dob;

        birthplace.textContent = user.birthPlace;

        career.textContent = user.career;

        profilePhoto.src = user.imgUrl || '/images/profile.jpg';

        matches.textContent = user.match;
        score.textContent = user.score;
        fifties.textContent = user.fifties;
        centuries.textContent = user.centuries;
        wickets.textContent = user.wickets;
        average.textContent = user.average;

    } catch(error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', loadFunction);