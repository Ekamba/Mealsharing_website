function FetchMealsId(req, router) {
  console.log(req.param.id);
  const id = req.param.id;
  const url = `api/meals/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // render meal by Id
      let rootId = `<main>
       <p>
       “Have you eaten today? Don't cook let us offert the best you have never
       eaten before, just one click on 'Book Seat' below!”
       </p>
     </main>`;
      data.map(meal => {
        const { id, title, description, price } = meal;
        rootId += `<div>
 <h5>meal ID: ${id}</h5>
 <img src="./images/${id}.jpg" alt=""></<img>
 <ul class="w3-ul">
 <ol>title : ${title}</ol>
 <ol>description : ${description}</ol>
 <ol>price : ${price}</ol>
 </ul>
 <button class="open-button" onclick="openForm()">Book seat</button>
 </div>
  
  `;
        document.getElementById("root").innerHTML = rootId;

        const number_of_guests = document.getElementById("number_of_guests")
          .value;
        const meal_id = document.getElementById("meal_id").value;
        const Email = document.getElementById("email").value;
        const Phone = document.getElementById("phone").value;
        const Name = document.getElementById("name").value;

        let booking = {
          number_of_guests,
          meal_id,
          Email,
          Phone,
          Name
        };
        const Book = () => {
          console.log(data);
          return fetch("/api/add-todo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
          })
            .then(res => {
              return res.text();
            })
            .then(text => {
              const message = document.getElementById("message");
              message.innerHTML = text;
            });
        };
      });
    });
}

export default FetchMealsId;
