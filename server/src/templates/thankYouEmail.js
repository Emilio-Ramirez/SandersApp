const thankYouEmail = (username) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por tu donación</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #0288d1; color: #ffffff; text-align: center; padding: 20px;">
            <h1 style="margin: 0; font-size: 26px; font-weight: bold;">Fundación Sanders</h1>
        </div>
        <div style="padding: 25px; line-height: 1.6; text-align: center;">
            <h2 style="font-size: 22px; color: #0288d1; margin-bottom: 10px;">¡Gracias por tu generosa donación, ${username}!</h2>
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Gracias por apoyar a la Fundación Sanders. Tu generosidad hace posible que sigamos trabajando para llevar agua potable a las comunidades que más lo necesitan.</p>
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Tu contribución es vital para cambiar vidas y mejorar el acceso a recursos esenciales. ¡Nos sentimos muy agradecidos!</p>
            <a href="https://localhost:3030/" style="display: inline-block; margin-top: 20px; background-color: #0288d1; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-size: 18px; text-align: center; transition: background-color 0.3s ease;">Conoce más sobre nuestros proyectos</a>
        </div>
        <div style="text-align: center; padding: 15px; font-size: 12px; color: #888; background-color: #f9f9f9; border-top: 1px solid #e0e0e0;">
            <p>&copy; 2024 Fundación Sanders. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = thankYouEmail;
