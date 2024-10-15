// server/src/templates/welcomeEmail.js

const welcomeEmailTemplate = (username) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Fundación Sanders</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                text-align: center;
            }
            body {
                background-color: #e0f7fa;
                color: #004d40;
                line-height: 1.6;
                font-size: 16px;
            }
            .welcome-container {
                max-width: 800px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            header {
                background-color: #004d40;
                color: #ffffff;
                text-align: center;
                padding: 30px;
                border-radius: 10px 10px 0 0gg
            }
            header h1 {
                font-size: 36px;
                margin-bottom: 10px;
            }
            .subtitle {
                font-size: 20px;
                font-weight: 300;
                color: #b2dfdb;
            }
            .hero {
                margin-top: 20px;
                display: flex;
                margin: 5px;
                padding: 10px;
            }
            .hero-image {
                width: 45%;
                height: auto;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                content: center;
            }
            .content {
                padding: 30px;
                background-color: #b2dfdb;
                border-radius: 0 0 10px 10px;
            }
            .content h2 {
                font-size: 28px;
                color: #004d40;
                margin-bottom: 15px;
            }
            .content p {
                font-size: 18px;
                margin-bottom: 20px;
                color: #004d40;
            }
            .cta {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .cta ul {
                list-style-type: none;
                padding-left: 20px;
                margin-bottom: 20px;
            }
            .cta ul li {
                font-size: 18px;
                color: #004d40;
                margin-bottom: 10px;
            }
            .cta ul li .icon {
                margin-right: 10px;
                font-size: 24px;
            }
            .btn {
                display: inline-block;
                padding: 12px 30px;
                background-color: #004d40;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 18px;
                text-align: center;
                transition: background-color 0.3s ease;
            }
            .btn:hover {
                background-color: #00332b;
            }
            footer {
                margin-top: 40px;
                text-align: center;
                padding: 10px;
                font-size: 14px;
                color: #004d40;
            }
            .image {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                justify-content: space-between;
            }
        </style>
    </head>
    <body>
        <div class="welcome-container">
            <header>
                <h1>Fundación Sanders</h1>
                <p class="subtitle">Unidos por el acceso al agua para todos</p>
            </header>
            <section class="hero">
                <div class="image">
                <img src="https://example.com/cover_10.jpg" alt="Bienvenido a Fundación Sanders" class="hero-image">
                <img src="https://example.com/cover_13.jpg" alt="Bienvenido a Fundación Sanders" class="hero-image">
                </div>
            </section>
            <section class="content">
                <h2>¡Hola ${username}, estamos emocionados de que te unas a nosotros!</h2>
                <p>Tu apoyo es clave para que juntos sigamos mejorando el acceso al agua en comunidades que más lo necesitan. Gracias por sumarte a nuestra misión de crear un impacto positivo en el mundo.</p>
                <div class="cta">
                    <p>Como nuevo miembro de nuestra familia, tu contribución será invaluable para:</p>
                    <ul>
                        <li><span class="icon">💧</span> Proyectos de abastecimiento de agua</li>
                        <li><span class="icon">🎓</span> Educación y concienciación sobre el uso responsable del agua</li>
                        <li><span class="icon">🤝</span> Voluntariado y apoyo directo en nuestras comunidades</li>
                    </ul>
                    <a href="https://localhost:3030/" class="btn">Descubre más sobre nuestros proyectos</a>
                </div>
            </section>
            <footer>
                <p>&copy; 2024 Fundación Sanders. Todos los derechos reservados.</p>
            </footer>
        </div>
    </body>
    </html>
  `;
};

module.exports = welcomeEmailTemplate;
