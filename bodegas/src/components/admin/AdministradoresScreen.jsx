import React, { useState } from 'react';
import { Container, Form, Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdministradoresScreen = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: '',
    sedeAdministrativa: ''
  });

  // Estado para la lista de administradores
  const [administradores, setAdministradores] = useState([
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@ejemplo.com', telefono: '555-1234', sede: 'Cuernavaca' },
    { id: 2, nombre: 'María García', correo: 'maria@ejemplo.com', telefono: '555-5678', sede: 'Temixco' },
    { id: 3, nombre: 'Carlos López', correo: 'carlos@ejemplo.com', telefono: '555-9012', sede: 'Jiutepec' }
  ]);

  // Manejador para cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Agregar nuevo administrador
    const newAdmin = {
      id: administradores.length + 1,
      nombre: formData.nombreCompleto,
      correo: formData.correo,
      telefono: formData.telefono,
      sede: formData.sedeAdministrativa
    };
    
    setAdministradores([...administradores, newAdmin]);
    
    // Limpiar el formulario
    setFormData({
      nombreCompleto: '',
      correo: '',
      telefono: '',
      sedeAdministrativa: ''
    });
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#FF9B44', padding: '15px' }}>
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="/placeholder-icon.png" alt="Logo" width="30" height="30" className="me-2" />
            <h4 className="mb-0 text-white">BODEGAS SIGEBO</h4>
          </div>
          <div>
            <Link to="/" className="btn btn-link text-white me-3">Inicio</Link>
            <Link to="/sedes" className="btn btn-link text-white me-3">Sedes</Link>
            <Link to="/administradores" className="btn btn-link text-white me-3">Administradores</Link>
            <Link to="/logout" className="btn btn-link text-white">Salir</Link>
          </div>
        </Container>
      </header>

      {/* Contenido principal */}
      <Container className="mt-4">
        <div className="bg-white rounded-3 p-4 shadow-sm" style={{ border: '1px solid #ddd' }}>
          <h2 className="text-center mb-4" style={{ color: '#FF9B44' }}>Administradores</h2>
          
          <Row className="justify-content-center">
            <div className="col-md-8 col-lg-6">
              <Card className="shadow-sm mb-4">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="text" 
                        placeholder="Nombre Completo" 
                        name="nombreCompleto"
                        value={formData.nombreCompleto}
                        onChange={handleInputChange}
                        required
                        style={{ borderColor: '#FF9B44' }}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="email" 
                        placeholder="Correo electrónico" 
                        name="correo"
                        value={formData.correo}
                        onChange={handleInputChange}
                        required
                        style={{ borderColor: '#FF9B44' }}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Control 
                        type="tel" 
                        placeholder="Teléfono" 
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-4">
                      <Form.Control 
                        type="text" 
                        placeholder="Sede administrativa" 
                        name="sedeAdministrativa"
                        value={formData.sedeAdministrativa}
                        onChange={handleInputChange}
                        required
                        style={{ borderColor: '#FF9B44' }}
                      />
                    </Form.Group>
                    
                    <div className="d-grid">
                      <Button 
                        type="submit"
                        variant="secondary" 
                        style={{ backgroundColor: '#888', border: 'none' }}
                      >
                        Aceptar
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Row>

          <h4 className="mt-4 mb-3">Listado de Administradores</h4>
          <Table bordered hover responsive>
            <thead>
              <tr style={{ backgroundColor: '#FF9B44', color: 'white' }}>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Sede</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.nombre}</td>
                  <td>{admin.correo}</td>
                  <td>{admin.telefono}</td>
                  <td>{admin.sede}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">Editar</Button>
                    <Button variant="outline-danger" size="sm">Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

// Workaround para el componente Row que no está definido fuera del artifact
const Row = ({ children, className }) => {
  return (
    <div className={`row ${className || ''}`}>
      {children}
    </div>
  );
};

export default AdministradoresScreen;