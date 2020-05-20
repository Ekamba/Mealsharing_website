function FetchAllMeals(req, router) {
  fetch("api/meals")
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);
      let root = `<main>
      <p>
      “Have you eaten today? Don't cook let us offert the best you have never
         eaten before, just one click on Meal ID to book a seat!”
      </p>
    </main>`;
      data.map(meal => {
        const { id, title, description, price } = meal;
        root += `<div>
<h5><a href="/meals/${id}">meal ID: ${id}<a/></h5>
<img src="./images/${id}.jpg" alt=""></img>
<ul class="w3-ul">
<ol>title : ${title}</ol>
<ol>description : ${description}</ol>
<ol>price : ${price}</ol>
</ul>
</div>
`;
        document.getElementById("root").innerHTML = root;
      });
    });
}

export default FetchAllMeals;
