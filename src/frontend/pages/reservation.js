function reservation(req, router) {
  console.log(req.param.id);
  const id = req.param.id;
  document
    .getElementById("cmdReservation")
    .addEventListener("click", () =>
      console.log("reservation booked successfull")
    );
}

export default reservation;
