const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const changeDisplayedImage = (index) => {
  displayedImage.setAttribute('src', `images/pic${index}.jpg`)
};

/* Looping through images */
for (const i of Array(5).keys()){
  const newImage = document.createElement('img');
  newImage.setAttribute('src', `images/pic${i+1}.jpg`);
  thumbBar.appendChild(newImage);
  newImage.addEventListener('click', () => changeDisplayedImage(i + 1))
}

/* Wiring up the Darken/Lighten button */

const changeStyle = () => {
  if (overlay.style.backgroundColor === 'rgba(0, 0, 0, 0.5)') {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    btn.innerHTML = 'Darken';
    return;
  }
  btn.innerHTML = 'Lighten';
  return overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
};

btn.addEventListener('click', changeStyle);
