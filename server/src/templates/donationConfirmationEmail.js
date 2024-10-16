const donationConfirmationEmail = (username, amount) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por tu donación</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #fff3e6; color: #5d4037; line-height: 1.6; font-size: 16px; margin: 0; padding: 0;">
    <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); padding: 20px;">
        <header style="background-color: #5d4037; color: #ffffff; text-align: center; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="font-size: 36px; margin-bottom: 10px;">Fundación Sanders</h1>
            <p style="font-size: 20px; font-weight: 300; color: #d7ccc8;">Juntos estamos haciendo la diferencia</p>
        </header>
        <section style="padding: 30px; background-color: #ffccbc; border-radius: 0 0 10px 10px;">
            <h2 style="font-size: 28px; color: #5d4037; margin-bottom: 15px;">¡Gracias ${username} por tu donación de $${amount}!</h2>
            <p style="font-size: 18px; margin-bottom: 20px; color: #5d4037;">Tu generosa contribución ha marcado una gran diferencia. Gracias a ti, estamos un paso más cerca de llevar agua a comunidades necesitadas y crear un impacto duradero.</p>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                <p style="font-size: 18px; color: #5d4037; margin-bottom: 10px;">Con tu apoyo, estos son algunos de los beneficios que podrás ver pronto:</p>
                <ul style="list-style-type: none; padding-left: 20px; margin-bottom: 20px;">
                    <li style="font-size: 18px; color: #5d4037; margin-bottom: 10px;">💦 Proyectos de instalación de pozos en zonas rurales</li>
                    <li style="font-size: 18px; color: #5d4037; margin-bottom: 10px;">🌍 Educación sobre el uso responsable del agua</li>
                    <li style="font-size: 18px; color: #5d4037; margin-bottom: 10px;">🚰 Acceso sostenible a fuentes de agua potable</li>
                </ul>
                <a href="https://localhost:3030/donar" style="display: inline-block; padding: 12px 30px; background-color: #5d4037; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 18px; text-align: center; transition: background-color 0.3s ease;">Sigue contribuyendo a nuestros proyectos</a>
            </div>
        </section>
        <footer style="margin-top: 40px; text-align: center; padding: 10px; font-size: 14px; color: #5d4037;">
            <p>&copy; 2024 Fundación Sanders. Todos los derechos reservados.</p>
        </footer>
    </div>
</body>
</html>
`;

module.exports = donationConfirmationEmail;
