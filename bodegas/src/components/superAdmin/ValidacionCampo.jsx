

const ValidacionCampo = ({ valido, mensaje }) => {
    if (valido === null) return null;
  
    return (
      <p className={`text-sm mt-1 flex items-center ${valido ? 'text-green-600' : 'text-red-600'}`}>
        {valido ? '✔️' : '✖️'} {mensaje}
      </p>
    );
};

export default ValidacionCampo;