const reminderEmail = (username) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Tu apoyo es fundamental!</title>
</head>
<body style="background-color: #f4f4f4; color: #333; font-size: 16px; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 750px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #2c6e49; color: white; text-align: center; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="font-size: 36px; margin-bottom: 5px;">Fundación Sanders</h1>
            <p style="font-size: 18px; margin-bottom: 20px;">¡Tu apoyo es fundamental!</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 30px;">
            <div style="max-width: 400px;">
                <p style="font-size: 22px; font-weight: bold; margin-bottom: 15px;">Hola ${username}, querido amigo de la fundación,</p>
                <p>Queremos recordarte que tu generosidad ha sido clave para que muchos sigan adelante. Pero, hay más por hacer. Las comunidades que aún necesitan tu ayuda dependen de ti para continuar con el proyecto de acceso a agua potable.</p>
                <p>¿Te gustaría seguir marcando la diferencia con tu apoyo?</p>
                <div style="margin-top: 20px; margin-bottom: 20px;">
                    <a href="https://localhost:3030/" style="display: inline-block; padding: 15px 25px; background-color: #2c6e49; color: white; text-decoration: none; border-radius: 25px; font-size: 18px; font-weight: bold; text-align: center; transition: background-color 0.3s ease;">¡Haz tu donación ahora!</a>
                </div>
                <p>Tu contribución no solo ayuda a brindar agua, también promueve salud, educación y bienestar para muchos.</p>
            </div>
        </div>
        <div style="text-align: center; padding: 20px; background-color: #eeeeee; margin-top: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 14px; color: #555;">&copy; 2024 Fundación Sanders | Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = reminderEmail;
