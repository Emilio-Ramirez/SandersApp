import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; 

import { Box,Grid, Button,  Container, Typography } from '@mui/material';

import dash1 from '../../public/assets/images/covers/dash_1.jpg';
import dash2 from '../../public/assets/images/covers/dash_2.jpg';
import dash3 from '../../public/assets/images/covers/dash_3.jpg';
import dash4 from '../../public/assets/images/covers/dash_4.jpg';
import dash5 from '../../public/assets/images/covers/dash_5.jpg';
import dash6 from '../../public/assets/images/covers/dash_6.jpg';
import Foto1 from '../../public/assets/images/covers/cover_18.jpg';
import Foto2 from '../../public/assets/images/covers/cover_12.jpg';
import Foto3 from '../../public/assets/images/covers/cover_11.jpg';
import Sanders from '../../public/assets/images/covers/cover_25.jpg';


const LandingPage = () => (
  <Container >
    <Box 
      py={6} 
      textAlign="center" 
      sx={{
        backgroundImage: `url(${Sanders})`,  // Imagen de fondo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '0px',
        height: '350px',
      }}
    >
      <Typography variant="h1" component="h1" color="white" gutterBottom>
        Bienvenidos a la Fundación Sanders
      </Typography>
      <Typography variant="h5" color="white" paragraph>
        Ayudamos a comunidades vulnerables que no tienen acceso al agua potable, mejorando su calidad de vida.
      </Typography>
      <Box mt={4}>
        <Button
          component={RouterLink}
          to="/donate"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
        >
          Dona Ahora
        </Button>
        <Button
          component={RouterLink}
          to="/login"
          variant="outlined"
          color="primary"
          size="large"
        >
          Iniciar Sesión
        </Button>
      </Box>
    </Box>

    <Box py={1} sx={{ backgroundColor: '#f9f9f9', padding: '10px' }}>
      <Typography variant="h3" component="h2" gutterBottom textAlign="center" color="black">
        Ya puedes donar a tu proyecto favorito!!
      </Typography>

      <img src={dash2} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />

      <Typography variant="h3" component="h2" gutterBottom textAlign="center" color="black">
        Suscribete a un proyecto
      </Typography>

      <img src={dash2} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />

      <Typography variant="body1" paragraph>
        El Dashboard es una plataforma en línea que te permite:
      </Typography>
    </Box>

    <Box component="ul" sx={{ listStyleType: 'disc', pl: 4 }}>

    <Typography variant="h3" component="h3" color="black" textAlign="center" marginBottom="35px" gutterBottom>
        Que funcionamiento tiene el dashboard y para que sirve?
      </Typography>

        <Typography component="li" variant="body1" sx={{ mb: 2 }}>
          Hacer donaciones únicas o programar donaciones recurrentes para apoyar proyectos a largo plazo.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 2 }}>
          Monitorear el impacto de tus donaciones y ver cómo están ayudando a comunidades vulnerables.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 2 }}>
          Registrarte como voluntario para participar en actividades y eventos de la fundación.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 2 }}>
          Acceder a contenido exclusivo sobre los proyectos que estás apoyando y recibir actualizaciones periódicas.
        </Typography>
        <Typography component="li" variant="body1" sx={{ mb: 2 }}>
          Utilizar una plataforma segura con métodos de pago confiables y la capacidad de gestionar tus contribuciones.
        </Typography>
      </Box>


    <Box py={6} sx={{ backgroundColor: '#ffffff', padding: '40px' }}>
      <Typography variant="h4" textAlign="center" component="h2" gutterBottom>
        Funciones del Dashboard
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cuadro 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
               Visualizacion del Dashboard y estadisticas
            </Typography>
            
            <img src={dash1} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>

        {/* Cuadro 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Manejo y gestion de los usuarios 
            </Typography>
            
            <img src={dash2} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>

        {/* Cuadro 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Crear y publicar proyectos
            </Typography>
            
            <img src={dash3} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>


        {/* Cuadro 4 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Datos adicionales
            </Typography>
            
            <img src={dash4} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>


        {/* Cuadro 5 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Manejo y gestion a los donadores
            </Typography>
            
            <img src={dash5} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>



        {/* Cuadro 6 */}
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Notificaciones y estadisticas
            </Typography>
            
            <img src={dash6} alt="Proyecto 1" style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
          </Box>
        </Grid>



        </Grid>
        </Box>


    <Box py={6} sx={{ backgroundColor: '#f9f9f9', padding: '40px' }}>

      <Typography variant="h4" component="h2" gutterBottom>
        ¿Por qué es importante el acceso al agua potable?
      </Typography>
      <Typography variant="body1" paragraph>
        El agua es un recurso vital para la vida humana y el desarrollo sostenible. Sin embargo, millones de personas en todo el mundo carecen de acceso a agua limpia y segura. Esto tiene graves consecuencias para la salud, la educación y la economía de las comunidades afectadas.
      </Typography>
        </Box>
    <Box py={6} sx={{ backgroundColor: '#ffffff', padding: '40px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        ¿Qué hacemos en la Fundación Sanders?
      </Typography>
      <Typography variant="body1" paragraph>
        Nuestra misión es proporcionar acceso al agua limpia y segura a comunidades que carecen de este recurso esencial. A través de proyectos de infraestructura, educación y sostenibilidad, impactamos positivamente la vida de miles de personas.
      </Typography>

  <div>

  <img 
    src={Foto1} 
    alt="" 
    style={{ 
      width: '300px', 
      height: '200px',
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      transition: 'transform 0.3s ease', 
      marginRight: '60px'
    }}
    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}   
    onFocus={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}   
    onBlur={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}     
  />

<img 
    src={Foto2} 
    alt="" 
    style={{ 
      width: '300px', 
      height: '200px',
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      transition: 'transform 0.3s ease', 
      marginRight: '55px'
    }}
    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}  // Corrección
    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}   // Corrección
    onFocus={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}    // Corrección
    onBlur={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}       // Corrección
    
  />

<img 
    src={Foto3} 
    alt="" 
    style={{ 
      width: '300px', 
      height: '200px',
      borderRadius: '8px', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
      transition: 'transform 0.3s ease', 
      marginRight: '55px'
    }}
    onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}  // Corrección
    onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}   // Corrección
    onFocus={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}    // Corrección
    onBlur={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}       // Corrección
    
  />
  
</div>




     
      <Grid container spacing={4} mt={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Instalación de Pozos
            </Typography>
            <Typography variant="body1">
              Construimos cisternas en áreas rurales en las que no hay agua limpia para garantizar un suministro continuo de agua natural.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Educación Sanitaria
            </Typography>
            <Typography variant="body1">
              Enseñamos a las comunidades sobre la importancia de la higiene y el uso responsable del agua.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h5" component="h3" gutterBottom>
              Innovación Sostenible
            </Typography>
            <Typography variant="body1">
              Desarrollamos soluciones ecológicas para preservar y maximizar los recursos hídricos.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>

    <Box py={6} textAlign="center">
      <Typography variant="h4" component="h2" gutterBottom>
        ¡Únete a nuestra causa!
      </Typography>
      <Typography variant="body1" paragraph>
        Con tu apoyo, podemos marcar la diferencia. Dona ahora o regístrate como voluntario para ayudarnos a continuar con nuestros proyectos.
      </Typography>
      <Box mt={4}>
        <Button
          component={RouterLink}
          to="/donate"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mr: 2 }}
        >
          Dona Ahora
        </Button>
        <Button
          component={RouterLink}
          to="/register"
          variant="outlined"
          color="primary"
          size="large"
        >
          Regístrate como Voluntario
        </Button>
      </Box>
    </Box>
  </Container>
);

export default LandingPage;
