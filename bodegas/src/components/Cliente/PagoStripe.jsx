import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";

const stripePromise = loadStripe("pk_test_51RDg5I2EUd41r5qmYQ5KC11K0e2rqfrnVM1N4fE6RmE1odWxZjSHiuRnN70xSInEBtBJUcvbAVC1HgKVvfAyKWwR00718wm84u"); // Reemplaza con tu public key real

const CheckoutForm = ({ bodega, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      const token = localStorage.getItem("token");
      const idCliente = localStorage.getItem("uuid"); // Usa el UUID si lo tienes

      // 1. Pide el PaymentIntent al backend
      const response = await axios.post(
        "http://localhost:8080/api/pagos/stripe",
        {
          monto: bodega.precio,
          clienteId: idCliente,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret } = response.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Cliente Demo",
          },
        },
      });

      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          Swal.fire("Éxito", "Pago realizado con éxito", "success");
          onClose(); 
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Algo salió mal al procesar el pago", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="mb-2 text-lg font-bold">Pagar Bodega #{bodega.folio}</h2>
      <CardElement className="p-2 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Pagar ${bodega.precio}
      </button>
    </form>
  );
};

const PagoStripe = ({ bodega, onClose }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm bodega={bodega} onClose={onClose} />
  </Elements>
);

export default PagoStripe;