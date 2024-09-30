import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Grid, Button, Container,CardMedia, Typography  } from '@mui/material';

const LandingPage = () => (
  <Container>
    <Box
      py={6}
      textAlign="center"
      sx={{
        backgroundImage: `url('/assets/images/covers/cover_25.jpg')`,
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
          to="/donar"
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

    <Grid container spacing={4} mt={4}>
  {/* Primera imagen con título */}
  <Grid item xs={120} sm={60}>
    <Typography textAlign="center" variant="h2" component="h3" padding="30px" gutterBottom>
      Dona por proyecto
    </Typography>
    <CardMedia
      component="img"
      image="/assets/images/covers/dash_7.jpg"  // Reemplaza con tu URL o ruta local
      alt="Proyecto de Pozos de Agua"
      sx={{ width: '100%', borderRadius: '8px' }}
    />
  </Grid>

  {/* Segunda imagen con título */}
  <Grid item xs={120} sm={60}>
    <Typography textAlign="center" variant="h2" component="h3" padding="30px" gutterBottom>
      Suscribete a un proyecto
    </Typography>
    <CardMedia
      component="img"
      image="/assets/images/covers/dash_1.jpg"  // Reemplaza con tu URL o ruta local
      alt="Instalación de Sistemas de Filtrado"
      sx={{ width: '100%', borderRadius: '8px' }}
    />
  </Grid>
</Grid>


    <Box component="ul" sx={{ listStyleType: 'disc', pl: 4 }}>
      <Typography variant="h3" component="h3" color="black" textAlign="center" marginBottom="35px" gutterBottom>
        ¿Qué funcionamiento tiene el dashboard y para qué sirve?
      </Typography>

      {['Hacer donaciones únicas o programar donaciones recurrentes para apoyar proyectos a largo plazo.',
        'Monitorear el impacto de tus donaciones y ver cómo están ayudando a comunidades vulnerables.',
        'Registrarte como voluntario para participar en actividades y eventos de la fundación.',
        'Acceder a contenido exclusivo sobre los proyectos que estás apoyando y recibir actualizaciones periódicas.',
        'Utilizar una plataforma segura con métodos de pago confiables y la capacidad de gestionar tus contribuciones.'
      ].map((text, index) => (
        <Typography key={index} component="li" variant="body1" sx={{ mb: 2 }}>
          {text}
        </Typography>
      ))}
    </Box>

    <Box py={6} sx={{ backgroundColor: '#ffffff', padding: '40px' }}>
      <Typography variant="h4" textAlign="center" component="h2" gutterBottom>
        Funciones del Dashboard
      </Typography>

      <Grid container spacing={4}>
        {[
          { title: 'Visualización del Dashboard y estadísticas', image: '/assets/images/covers/dash_1.jpg' },
          { title: 'Manejo y gestión de los usuarios', image: '/assets/images/covers/dash_2.jpg' },
          { title: 'Crear y publicar proyectos', image: '/assets/images/covers/dash_3.jpg' },
          { title: 'Datos adicionales', image: '/assets/images/covers/dash_4.jpg' },
          { title: 'Manejo y gestión a los donadores', image: '/assets/images/covers/dash_5.jpg' },
          { title: 'Notificaciones y estadísticas', image: '/assets/images/covers/dash_6.jpg' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                {item.title}
              </Typography>
              <img src={item.image} alt={`Dashboard ${index + 1}`} style={{ width: '100%', maxHeight: '100%', objectFit: 'cover' }} />
            </Box>
          </Grid>
        ))}
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

      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        {['/assets/images/covers/cover_18.jpg', '/assets/images/covers/cover_12.jpg', '/assets/images/covers/cover_11.jpg'].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Proyecto ${index + 1}`}
            style={{
              width: '300px',
              height: '200px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.3s ease',
              margin: '10px',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            onFocus={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onBlur={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        ))}
      </Box>

      <Grid container spacing={4} mt={4}>
        {[
          { title: 'Instalación de Pozos', description: 'Construimos cisternas en áreas rurales en las que no hay agua limpia para garantizar un suministro continuo de agua natural.' },
          { title: 'Educación Sanitaria', description: 'Enseñamos a las comunidades sobre la importancia de la higiene y el uso responsable del agua.' },
          { title: 'Innovación Sostenible', description: 'Desarrollamos soluciones ecológicas para preservar y maximizar los recursos hídricos.' },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box sx={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                {item.title}
              </Typography>
              <Typography variant="body1">
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
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
