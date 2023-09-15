document.getElementById("btnReiniciar").addEventListener("click", (e) => {
  e.preventDefault();

  // Remover o localStorage
  const localStorageItems = ["Times", "Camp"];
  localStorageItems.forEach((item) => localStorage.removeItem(item));

  // Redirecionar para a página de configuração se os dados não existirem
  window.location.href = "../index.html";
});
