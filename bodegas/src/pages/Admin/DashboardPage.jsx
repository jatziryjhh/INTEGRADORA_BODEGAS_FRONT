import React from "react";
import { MdAttachMoney, MdPeople, MdShoppingCart } from "react-icons/md";
import DashboardCard from "../../Components/admin/DashboardCard";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <DashboardCard 
        title="Ingresos Totales"
        value="$12,500"
        description="Total de ventas este mes"
        icon={MdAttachMoney}
        onClick={() => console.log("Ingresos Totales Clicked")}
      />
      
      <DashboardCard 
        title="Usuarios Registrados"
        value="1,245"
        description="Usuarios activos en la plataforma"
        icon={MdPeople}
        onClick={() => console.log("Usuarios Registrados Clicked")}
      />

<DashboardCard 
        title="Rentas"
        value="320"
        description="Rentas pagadas este mes"
        icon={MdShoppingCart}
        onClick={() => console.log("Órdenes Procesadas Clicked")}
      />
    </div>
  );
};

export default Dashboard;
