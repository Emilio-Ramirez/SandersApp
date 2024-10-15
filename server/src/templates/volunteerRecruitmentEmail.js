const volunteerRecruitmentEmail = (username) => `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Únete a Nuestro Equipo de Voluntarios - Fundación Sanders</title>
</head>
<body style="background-color: #f8f9fa; color: #333; font-size: 16px; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <header style="text-align: center; padding: 40px 20px; background-color: #4CAF50; color: white; border-radius: 10px;">
            <h1 style="font-size: 36px; margin-bottom: 10px;">¡Sé Parte de Nuestro Equipo de Voluntarios!</h1>
            <p style="font-size: 20px;">Ayúdanos a crear un cambio positivo en el mundo. Tu tiempo y esfuerzo pueden marcar la diferencia.</p>
        </header>
        <section style="padding: 40px 20px;">
            <h2 style="text-align: center; font-size: 28px; margin-bottom: 30px; color: #2c6e49;">¿Por Qué Ser Voluntario?</h2>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
                <div style="flex: 1; background-color: #e0f7e9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                    <h3 style="font-size: 22px; color: #4CAF50; margin-bottom: 15px;">Impacta Directamente</h3>
                    <p style="font-size: 16px; color: #666;">Con tu ayuda, podemos llevar ayuda a las comunidades más necesitadas. Cada acción cuenta y tú puedes ser parte de este cambio.</p>
                </div>
                <div style="flex: 1; background-color: #e0f7e9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                    <h3 style="font-size: 22px; color: #4CAF50; margin-bottom: 15px;">Aprende y Crece</h3>
                    <p style="font-size: 16px; color: #666;">Trabajar como voluntario te permitirá aprender nuevas habilidades y conocer personas increíbles que comparten tu pasión por ayudar.</p>
                </div>
                <div style="flex: 1; background-color: #e0f7e9; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
                    <h3 style="font-size: 22px; color: #4CAF50; margin-bottom: 15px;">Haz Nuevas Amistades</h3>
                    <p style="font-size: 16px; color: #666;">El voluntariado es una excelente manera de hacer nuevos amigos que valoran el bienestar común y la solidaridad.</p>
                </div>
            </div>
        </section>
        <section style="background-color: #f1f1f1; padding: 30px 20px; margin-top: 40px; border-radius: 10px;">
            <h2 style="text-align: center; font-size: 28px; margin-bottom: 20px; color: #2c6e49;">Inscríbete Hoy</h2>
            <p style="text-align: center; margin-bottom: 20px;">¿Estás listo para marcar la diferencia, ${username}? Haz clic en el botón de abajo para unirte a nuestro equipo de voluntarios.</p>
            <div style="text-align: center;">
                <a href="https://localhost:3030/volunteer" style="display: inline-block; background-color: #4CAF50; color: white; padding: 15px 30px; border: none; border-radius: 10px; font-size: 18px; text-decoration: none; cursor: pointer; transition: background-color 0.3s;">¡Quiero Voluntariar!</a>
            </div>
        </section>
        <footer style="text-align: center; padding: 20px; background-color: #eeeeee; margin-top: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 14px; color: #555;">&copy; 2024 Fundación Sanders | Todos los derechos reservados</p>
        </footer>
    </div>
</body>
</html>
`;

module.exports = volunteerRecruitmentEmail;
