import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardSuperAdmin = () => {
  // Datos de ejemplo para el dashboard
  const resumen = {
    totalSedes: 4,
    sedesActivas: 2,
    sedesInactivas: 2,
    totalAdministradores: 8,
    ultimosMovimientos: [
      { fecha: '05/04/2025', accion: 'Nueva sede agregada', usuario: 'Juan Pérez' },
      { fecha: '03/04/2025', accion: 'Administrador modificado', usuario: 'María García' },
      { fecha: '01/04/2025', accion: 'Sede desactivada', usuario: 'Pedro Sánchez' }
    ]
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
          <h2 className="text-center mb-4" style={{ color: '#FF9B44' }}>Dashboard Superadministrador</h2>
          
          <Row>
            <Col md={8}>
              <Row>
                <Col md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>Resumen de Sedes</Card.Title>
                      <div className="d-flex justify-content-around mt-4 mb-3">
                        <div className="text-center">
                          <h3>{resumen.totalSedes}</h3>
                          <p className="text-muted">Total</p>
                        </div>
                        <div className="text-center">
                          <h3 className="text-success">{resumen.sedesActivas}</h3>
                          <p className="text-muted">Activas</p>
                        </div>
                        <div className="text-center">
                          <h3 className="text-danger">{resumen.sedesInactivas}</h3>
                          <p className="text-muted">Inactivas</p>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <Link to="/sedes" className="btn" style={{ backgroundColor: '#FF9B44', color: 'white' }}>
                          Gestionar Sedes
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>Administradores</Card.Title>
                      <div className="text-center my-4">
                        <h1>{resumen.totalAdministradores}</h1>
                        <p className="text-muted">Administradores Registrados</p>
                      </div>
                      <div className="text-center mt-4">
                        <Link to="/administradores" className="btn" style={{ backgroundColor: '#FF9B44', color: 'white' }}>
                          Gestionar Administradores
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <Row>
                <Col md={12}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>Acciones Rápidas</Card.Title>
                      <div className="d-flex flex-wrap justify-content-between mt-3">
                        <Link to="/sedes/nuevo" className="btn btn-light border mb-2 mb-md-0" style={{ minWidth: '120px' }}>
                          Nueva Sede
                        </Link>
                        <Link to="/administradores/nuevo" className="btn btn-light border mb-2 mb-md-0" style={{ minWidth: '120px' }}>
                          Nuevo Administrador
                        </Link>
                        <Button variant="light" className="border mb-2 mb-md-0" style={{ minWidth: '120px' }}>
                          Exportar Datos
                        </Button>
                        <Button variant="light" className="border mb-2 mb-md-0" style={{ minWidth: '120px' }}>
                          Configuración
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            
            <Col md={4}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>Últimos Movimientos</Card.Title>
                  <div className="mt-3">
                    {resumen.ultimosMovimientos.map((movimiento, index) => (
                      <div key={index} className="mb-3 pb-2 border-bottom">
                        <div className="d-flex justify-content-between">
                          <small className="text-muted">{movimiento.fecha}</small>
                          <small className="text-muted">{movimiento.usuario}</small>
                        </div>
                        <p className="mb-0">{movimiento.accion}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-4">
                    <Button variant="outline-secondary" size="sm">
                      Ver todos los movimientos
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default DashboardSuperAdmin;