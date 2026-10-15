# Un jardín para Helena 🌻

Proyecto estático listo para GitHub Pages. No necesita servidor ni instalación.

## Contenido
- `index.html`: estructura de la página.
- `style.css`: diseño adaptable y animaciones.
- `script.js`: 23 mensajes aprobados, flores interactivas, contador, carta automática de 8 segundos y efecto de ladrido.
- `perrito-helena.jpg`: foto del perrito que compartiste; va directamente en la raíz del repositorio.

## Publicarlo en GitHub Pages
1. Entra en https://github.com e inicia sesión.
2. Pulsa **New repository**.
3. Ponle un nombre, por ejemplo `jardin-para-helena`.
4. Selecciona **Public** y crea el repositorio.
5. Sube los archivos de esta carpeta al nivel principal del repositorio. Debe quedar `index.html`, `style.css`, `script.js`, `README.md` y `perrito-helena.jpg` en la raíz del repositorio.
6. En el repositorio abre **Settings → Pages**.
7. En **Build and deployment**, selecciona **Deploy from a branch**.
8. Elige la rama `main` y la carpeta `/ (root)`, y pulsa **Save**.
9. Espera unos minutos. GitHub mostrará el enlace público en la misma sección Pages.

## Personalización
- Los 23 textos están al inicio de `script.js`, dentro del arreglo `messages`.
- El tiempo de cada carta está configurado en `8000` milisegundos en `script.js`. La barra también dura 8 segundos.
- La foto se puede cambiar reemplazando `perrito-helena.jpg` por otra imagen con el mismo nombre.

## Nota sobre el perrito y el sonido
La primera versión usa la foto original del perrito, con movimiento CSS de balanceo y ladrido visual. El sonido es un pequeño efecto sintetizado por el navegador, no una grabación real de su ladrido. Para una animación 2D dibujada cuadro por cuadro o un ladrido auténtico, habría que añadir un sprite/ilustración animada y un archivo de audio real.
