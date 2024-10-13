// Ensure DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedDropdown = document.getElementById('breed-dropdown');
    const breedList = document.getElementById('dog-breeds');

    // Challenge 1: Fetch images from API and display them
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const dogImageContainer = document.getElementById('dog-image-container');
            data.message.forEach(imgUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.style.width = '200px';
                imgElement.style.margin = '10px';
                dogImageContainer.appendChild(imgElement);
            });
        });

    // Challenge 2: Fetch breeds from API and display in list
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            breeds.forEach(breed => addBreedToList(breed));
        });

    // Challenge 3: Change font color when breed is clicked
    function addBreedToList(breed) {
        const li = document.createElement('li');
        li.textContent = breed;
        li.style.cursor = 'pointer'; // Change cursor on hover
        li.addEventListener('click', function () {
            li.style.color = 'blue'; // Change font color on click
        });
        breedList.appendChild(li);
    }

    // Challenge 4: Filter breeds based on dropdown selection
    breedDropdown.addEventListener('change', function (event) {
        const selectedLetter = event.target.value;
        filterBreeds(selectedLetter);
    });

    function filterBreeds(letter) {
        breedList.innerHTML = ''; // Clear current list
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message).filter(breed => breed.startsWith(letter));
                breeds.forEach(breed => addBreedToList(breed));
            });
    }
});
