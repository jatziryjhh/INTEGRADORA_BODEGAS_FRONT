import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarCliente from "./NavbarCliente";

// Cargar Stripe con tu clave pública
const stripePromise = loadStripe(
  "pk_test_51RDg5I2EUd41r5qmYQ5KC11K0e2rqfrnVM1N4fE6RmE1odWxZjSHiuRnN70xSInEBtBJUcvbAVC1HgKVvfAyKWwR00718wm84u"
);

const CheckoutForm = ({ bodega }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si Stripe y Elements están listos
    if (!stripe || !elements) return;

    try {
      const token = localStorage.getItem("token"); // Obtener el token de autenticación
      const clienteId = localStorage.getItem("id"); // Obtener el uuid del cliente

      if (!token || !clienteId) {
        Swal.fire("Error", "No se encontró información de cliente", "error");
        return;
      }
      // Hacer la solicitud a tu backend para obtener el clientSecret de Stripe
      const response = await axios.post(
        "http://localhost:8080/api/pagos/stripe",
        {
          monto: bodega.precio,
          clienteId: clienteId, // Usar el clienteId
          bodegaId: bodega.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret } = response.data; // Obtener el clientSecret desde la respuesta
     
      if (!clientSecret) {
        Swal.fire("Error", "No se pudo obtener el clientSecret", "error");
        return;
      }
      // Completar el pago usando el clientSecret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Cliente Demo", // Aquí puedes poner el nombre del cliente real
          },
        },
      });

      // Manejo de la respuesta del pago
      if (result.error) {
        Swal.fire("Error", result.error.message, "error");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          Swal.fire("Éxito", "Pago realizado con éxito", "success");
          // Redirigir a la lista de bodegas
          
          navigate("/cliente/dashboard"); 
        }


      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Algo salió mal al procesar el pago", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Pagar Bodega #{bodega.folio}
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Total a pagar: <strong>${bodega.precio}</strong>
      </p>
      <div className="border p-4 rounded mb-4">
        <CardElement /> {/* Campo para ingresar la tarjeta */}
      </div>
      <button
        type="submit"
        disabled={!stripe} // Deshabilitar el botón hasta que Stripe esté listo
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Pagar
      </button>
    </form>
  );
};

const VistaPagoStripe = () => {
  const location = useLocation();
  const bodega = location.state?.bodega; // Obtener la bodega desde la URL

  // Verifica si la bodega existe y tiene el id
  if (!bodega || !bodega.id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        No hay bodega seleccionada para pagar o el ID de la bodega es inválido.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarCliente />
      <Elements stripe={stripePromise}>
        <CheckoutForm bodega={bodega} />
      </Elements>
    </div>
  );
};

export default VistaPagoStripe;