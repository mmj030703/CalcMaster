import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    quantity: 0,
    price: 0,
    total: 0,
    profit: 0,
  });

  async function getRandomValues() {
    const res = await fetch(
      "https://calcmaster.onrender.com/get-random-values"
    );
    const resJson = await res.json();

    setFormData(resJson.data);
  }

  function handleDataChange(e) {
    const { name, value } = e.target;

    // Making new state variable for changed data
    const newState = {
      [name]: value,
    };

    // Finding total field on data change i.e quantity or price
    if (name === "quantity" || name === "price") {
      newState["total"] =
        name === "quantity"
          ? value * formData.price
          : value * formData.quantity;
    }

    // Appending the changed data with previous data to update the state variable
    setFormData((prevState) => {
      return {
        ...prevState,
        ...newState,
      };
    });
  }

  return (
    <>
      <section>
        <h1>Calculator</h1>
        <form>
          <fieldset className="field">
            <label>Quantity</label>
            <input
              value={formData.quantity}
              onChange={handleDataChange}
              name="quantity"
              type="number"
              className="input"
            />
          </fieldset>

          <fieldset className="field">
            <label>Price</label>
            <input
              value={formData.price}
              onChange={handleDataChange}
              type="number"
              name="price"
              className="input"
            />
          </fieldset>

          <fieldset className="field">
            <label>Total</label>
            <input
              value={formData.total}
              onChange={handleDataChange}
              type="number"
              name="total"
              className="input"
            />
          </fieldset>

          <fieldset className="field">
            <label>Profit</label>
            <input
              value={`${formData.profit}`}
              onChange={handleDataChange}
              type="number"
              name="profit"
              className="input"
            />
          </fieldset>
        </form>

        <button onClick={getRandomValues} className="button">
          Get Random Values
        </button>
      </section>
    </>
  );
}

export default App;
