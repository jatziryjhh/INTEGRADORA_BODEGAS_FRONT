import React, { useState } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SedesScreen = () => {
  // Estado para almacenar las sedes
  const [sedes, setSedes] = useState([
    { id: '01', ubicacion: 'Cuernavaca', tamano: 'Grande', estado: 'Activo' },
    { id: '02', ubicacion: 'Temixco', tamano: 'Mediana', estado: 'Inactivo' },
    { id: '03', ubicacion: 'Jiutepec', tamano: 'Grande', estado: 'Inactivo' },
    { id: '04', ubicacion: 'Buena vista', tamano: 'Mediana', estado: 'Activo' },
  ]);

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [newSede, setNewSede] = useState({
    id: '',
    ubicacion: '',
    tamano: 'Mediana',
    estado: 'Activo'
  });

  // Manejadores para el modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  // Manejador para el cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSede({
      ...newSede,
      [name]: value
    });
  };

  // Manejador para agregar una nueva sede
  const handleAddSede = () => {
    // Generar un ID nuevo (en producción esto vendría del backend)
    const newId = String(sedes.length + 1).padStart(2, '0');
    
    const sedeToAdd = {
      ...newSede,
      id: newId
    };
    
    setSedes([...sedes, sedeToAdd]);
    setNewSede({
      id: '',
      ubicacion: '',
      tamano: 'Mediana',
      estado: 'Activo'
    });
    handleCloseModal();
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
            <Button variant="link" className="text-white me-3">Inicio</Button>
            <Button variant="link" className="text-white me-3">Sedes</Button>
            <Button variant="link" className="text-white me-3">Administradores</Button>
            <Button variant="link" className="text-white">Salir</Button>
          </div>
        </Container>
      </header>

      {/* Contenido principal */}
      <Container className="mt-4">
        <div className="bg-white rounded-3 p-4 shadow-sm" style={{ border: '1px solid #ddd' }}>
          <h2 className="text-center mb-4" style={{ color: '#FF9B44' }}>Sedes</h2>
          
          <Table bordered hover responsive>
            <thead>
              <tr style={{ backgroundColor: '#FF9B44', color: 'white' }}>
                <th className="text-center">ID</th>
                <th className="text-center">Ubicación</th>
                <th className="text-center">Tamaño</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {sedes.map((sede) => (
                <tr key={sede.id}>
                  <td className="text-center">{sede.id}</td>
                  <td className="text-center">{sede.ubicacion}</td>
                  <td className="text-center">{sede.tamano}</td>
                  <td className="text-center" style={{ color: sede.estado === 'Inactivo' ? 'red' : 'inherit' }}>
                    {sede.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-center mt-4">
            <Button 
              style={{ 
                backgroundColor: '#FF9B44', 
                border: 'none',
                padding: '8px 40px' 
              }}
              onClick={handleShowModal}
            >
              Añadir
            </Button>
          </div>
        </div>
      </Container>

      {/* Modal para agregar sede */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header style={{ backgroundColor: '#FF9B44', color: 'white' }}>
          <Modal.Title>Añadir Nueva Sede</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ubicación</Form.Label>
              <Form.Control 
                type="text" 
                name="ubicacion" 
                value={newSede.ubicacion} 
                onChange={handleInputChange}
                placeholder="Ej: Ciudad de México"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tamaño</Form.Label>
              <Form.Select 
                name="tamano" 
                value={newSede.tamano} 
                onChange={handleInputChange}
              >
                <option value="Pequeña">Pequeña</option>
                <option value="Mediana">Mediana</option>
                <option value="Grande">Grande</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select 
                name="estado" 
                value={newSede.estado} 
                onChange={handleInputChange}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button style={{ backgroundColor: '#FF9B44', border: 'none' }} onClick={handleAddSede}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SedesScreen;