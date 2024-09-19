import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Sanders from './Sanders.png';
import Aba from './aba.png';

const LandingPage = () => (
  <Container maxWidth="lg">
    {/* Sección Hero con imagen de fondo */}
    <Box 
      py={6} 
      textAlign="center" 
      sx={{
        backgroundImage: `url(${Sanders})`,  // Imagen de fondo
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f5f5f5',  // Color de fondo por si la imagen no carga
        padding: '40px'
      }}
    >



      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenidos a la Fundación Sanders
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
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

    {/* Otras secciones */}
    <Box py={6} sx={{ backgroundColor: '#ffffff', padding: '40px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        ¿Qué hacemos en la Fundación Sanders?
      </Typography>
      <Typography variant="body1" paragraph>
        Nuestra misión es proporcionar acceso al agua limpia y segura a comunidades que carecen de este recurso esencial. A través de proyectos de infraestructura, educación y sostenibilidad, impactamos positivamente la vida de miles de personas.
      </Typography>

      <img src={Aba} alt="" className="customImage" />  
      
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
