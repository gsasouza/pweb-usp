const randomize = document.querySelector('.randomize');

const names = ['Willy the Goblin','Big Daddy', 'Father Christmas'];
const places = ['the soup kitchen', 'Disneyland', 'the White House'];
const actions = ['spontaneously combusted', 'melted into a puddle on the sidewalk', 'turned into a slug and crawled away'];

const randomValueFromArray = array => array[Math.floor(Math.random()*array.length)];

const generateStory = (
  name,
  place,
  action,
  customName = 'Bob',
  temperature = '94 fahrenheit',
  weight = '300 pounds'
) => `It was ${temperature} outside, so ${name} went for a walk. When they got to ${place}, they stared in horror for a few moments, then ${action}. ${customName} saw the whole thing, but was not surprised — ${name} weighs ${weight}, and it was a hot day.`;

const fahrenheitToCelsius = (value) => ((value - 32) * 5/9);
const poundsToKilograms = (value) => (value/2.205);

const getPhysicValues = (isChecked) => {
  return {
    weight: isChecked ? `${Math.round(poundsToKilograms(300))} kilograms` : undefined,
    temperature: isChecked ? `${Math.round(fahrenheitToCelsius(94))} degrees Celsius` : undefined,
  }
};

const result = () => {
  const customName = document.getElementById('customname').value;
  const isUkChecked = document.getElementById('uk').checked;
  const { temperature, weight } = getPhysicValues(isUkChecked);
  const generatedStory = generateStory(
    randomValueFromArray(names),
    randomValueFromArray(places),
    randomValueFromArray(actions),
    !!customName ? customName : undefined,
    temperature,
    weight,
  );
  const story = document.querySelector('.story');
  story.innerHTML = generatedStory;
  story.style.visibility = 'visible';
};

randomize.addEventListener('click', result);

