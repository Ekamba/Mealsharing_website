function homeRouter(req, router) {
  document.body.innerHTML = `
  
  <header><h1>Meal Sharing</h1></header> <br><br><br><br><br>

<a href="/meals"><button class="down-arr"> Here you have all meals </button></a>

<br><br><br><br><br><br><br><br><br><br><br><br><br><footer>Meal-Sharing & co.</footer>
  `;
}
export default homeRouter;
