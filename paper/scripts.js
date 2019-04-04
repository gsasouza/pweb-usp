let j1 = null;
let j2 = null;

const resultado = () => {
  if (!j1 || !j2) return;
  if (j1 === 1 && j2 === 2) {
    alert('Jogador 2 Ganhou!');
    j1 = null;
    j2 = null;
  }
};

document.getElementById('pedra:j1').addEventListener("click", () => {
  j1 = 1;
  resultado();
});
document.getElementById('papel:j1').addEventListener("click", () => {
  j1 = 2;
  resultado();
});
document.getElementById('tesoura:j1').addEventListener("click", () => {
  j1 = 3;
  resultado();
});
document.getElementById('pedra:j2').addEventListener("click", () => {
  j2 = 1;
  resultado();
});
document.getElementById('papel:j2').addEventListener("click", () => {
  j2 = 2;
  resultado();
});
document.getElementById('tesoura:j2').addEventListener("click", () => {
  j2 = 3;
  resultado();
});

