// quiero importar la funcion de crear mi APi desde el fichero generado en unsplash

import { createApi } from 'unsplash-js'

// voy a acceder a la clave generada desde el archivo .env

const unsplash = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
})

// compruebo que me funcione la api con el key
console.log(import.meta.env.VITE_ACCESS_KEY)

//sELECCIONAREMOS LOS ELEmentos del Dom y vamos a crear el contenido de estos de manera dinamica

const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

//header

function crearHeader() {
  // logo que es una palabra titulo
  const logo = document.createElement('h1')
  logo.textContent = 'Pinterest Clone'
  logo.id = 'logo'

  // barra buscadora
  const busquedaInput = document.createElement('input')
  busquedaInput.type = 'text'
  busquedaInput.id = 'busquedainput'
  busquedaInput.placeholder = 'Búsqueda'

  // boton de busqueda

  const busquedaBtn = document.createElement('button')
  busquedaBtn.id = 'busquedabtn'
  const busquedaLupaIcon = document.createElement('img')
  busquedaLupaIcon.src = './assets/lupita-removebg-preview.png'
  busquedaLupaIcon.alt = 'Imagen de lupa'
  busquedaBtn.appendChild(busquedaLupaIcon)

  // boton de modo oscuro
  const modoOscuroBtn = document.createElement('button')

  modoOscuroBtn.id = 'oscuro'

  const modoOscuroIcon = document.createElement('img')

  modoOscuroIcon.src = './assets/o2.png'
  modoOscuroIcon.alt = ' icono para modo oscuro'
  modoOscuroIcon.id = 'oscuroicon'

  modoOscuroBtn.appendChild(modoOscuroIcon)

  const perfilImagen = document.createElement('img')
  perfilImagen.src = './assets/perfil.png'
  perfilImagen.alt = 'Imagen de perfil del user'
  perfilImagen.id = 'usuarioImg'

  // plasmo los elementos que he generado en el header

  header.appendChild(logo)
  header.appendChild(busquedaInput)
  header.appendChild(busquedaBtn)
  header.appendChild(modoOscuroBtn)
  header.appendChild(perfilImagen)
}

// siguiente, tengo que crear la galeria de imagenes en el main del body

function crearGaleria() {
  const galeriaImg = document.createElement('ul')
  galeriaImg.className = 'ImgGaleria'
  galeriaImg.id = 'ImagenesGaleria'
  main.appendChild(galeriaImg)
}

// siguiente es crear el pie de página foooooter

function crearFooter() {
  const footerText = document.createElement('h4')
  footerText.textContent = 'Copyright 2024 - Inspirest - Rock the Code'
  footer.appendChild(footerText)
}

// ejecutamos las funciones para tener una estrucutra donde ir pintando cositas

crearHeader()
crearGaleria()
crearFooter()

// para saber cual es la ruta que sigue la respuesta en el await del async, tengoq ue seleccionar el boton de busqueda y la barra
// para añadirlos a un evento de click, como que por defecto, query es el valor de busqueda y luego lo usare, le pongo el valor de input a query

// selecciono

// const busquedaBtn = document.getElementById('busquedabtn')
// const busquedaInput = document.getElementById('busquedainput')

// los tengo seleccionados y les pongo el click

// busquedaBtn.addEventListener('click', () => {
//   //usare query para el input value
//   const query = busquedaInput.value
//   // me aseguro de que me funcione el event
//   console.log(`Buscando : ${query}`)
//   //TENGO QUE LLAMAR A LA FUNCION PARA OBTENER IMAGENES MEDIA HORA CON ESTO
//   obtenerImagenes(query) // ahora en la funcion puedo ver la ruta del response
// })

// una vez estructurada la base, vamos a generar las funciones para sacar imagenes de unsplash y para pegarlas en la galeria
console.log('Key API:', import.meta.env.VITE_ACCESS_KEY)

async function obtenerImagenes(query) {
  // en la función, la palabra query, sera la palabra clave que se envia a la api para buscar imagenes relacionadas con esa palabra, si el usuario utiliza botas, en query tendriamos botas
  try {
    console.log('inicio solicitud unsplashy')
    const respuesta = await unsplash.search.getPhotos({
      // método predeterminado de unsplash para solicitar imagenes, de seguido le indicamos cuantas
      query: query, // query sera el valor que sera en string que entrara el usuario al hacer la búsqueda
      page: 1, // desde que pagina empieza
      perPage: 30 // y cuantas imágenes quiere por página
    })
    console.log(respuesta)
    return respuesta.response?.results || []
    // el evento de click me ha servido para ver esta jerarquia y poder pedirle que quiero que me devuelva
    return respuesta.results // devuelvo los results de la busqueda
  } catch (error) {
    console.error('Error Obteniendo imagenes', error)
    return []
  }
}

// tenemos las imagenes bien ruteadas pero ahora necesitamos ponerlas en la galeria

function pintarImagenes(imagenes) {
  console.log(imagenes)
  // creo y limpio galeria
  const galeriaImg = document.getElementById('ImagenesGaleria')
  galeriaImg.innerHTML = ''

  // verifico si el array que me llega esta lleno
  // if (!imagenes || imagenes.length === 0) {
  //   console.log('Realiza otra busqueda')
  //   return //nada
  // }
  // quiero crear para cada imagen,
  imagenes.forEach((imagen) => {
    //un li dentro de m i ul
    const itemListado = document.createElement('li')
    itemListado.className = 'item-galeria'

    // tengo que acceder a la imagen si no como llega??????????
    const imagenUrl = imagen.urls.regular
    // imagen de fondo
    itemListado.style.backgroundImage = `url(${imagen.urls.regular})`
    // añado imagen a galeria

    galeriaImg.appendChild(itemListado)
    //div para poner el resto
    const divGeneral = document.createElement('div')
    divGeneral.className = 'general'

    //boton visitar

    const visitarBtn = document.createElement('button')
    visitarBtn.className = 'visitar'
    visitarBtn.textContent = 'Visitar'

    //boton guardar
    const guardarBtn = document.createElement('button')
    guardarBtn.textContent = 'Guardar'
    guardarBtn.className = 'guardar'
    const guardarIcon = document.createElement('img')
    guardarIcon.className = 'miniicon'
    guardarIcon.src = './assets/savee.png'
    guardarBtn.appendChild(guardarIcon)

    //boton mg

    const mgBtn = document.createElement('button')
    mgBtn.className = 'mg'
    mgBtn.textContent = imagen.likes
    const mgIcon = document.createElement('img')
    mgIcon.className = 'miniicon'
    mgIcon.src = './assets/like.png'
    mgBtn.appendChild(mgIcon)

    //boton perfil
    const perfilBtn = document.createElement('button')
    perfilBtn.className = 'perfil'
    const perfilIcon = document.createElement('img')
    perfilIcon.className = 'miniicon'
    perfilIcon.src = 'imagen.user.profile_image.medium'
    perfilBtn.appendChild(perfilIcon)

    // para guardar fecha y autor
    const info = document.createElement('div')
    info.className = 'infoimg'

    //h3
    const autorImg = document.createElement('h3')
    autorImg.className = 'autor'
    autorImg.textContent = imagen.user.name
    //h4, quiero la fecha pero tendre que añadirle estos parametros para que no me muestre mas que la fecha y no la hora
    const fecha = new Date(imagen.created_at).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })

    // Crear el elemento para la fecha
    const fechaImg = document.createElement('h4')
    fechaImg.className = 'fecha'
    fechaImg.textContent = fecha // Usamos la fecha formateada sin horas

    // Plasmo lo generado en cada uno y en el DOM

    itemListado.appendChild(divGeneral)
    divGeneral.appendChild(visitarBtn)
    divGeneral.appendChild(mgBtn)
    divGeneral.appendChild(guardarBtn)
    info.appendChild(autorImg)
    info.appendChild(fechaImg)
    divGeneral.appendChild(info)
    itemListado.appendChild(perfilBtn)
  })
}

// bien, ahora queremos mostrar imagenes de gtos cuando la busqueda no sea efectiva

const busquedaBtn = document.getElementById('busquedabtn')
const busquedaInput = document.getElementById('busquedainput')
// enlazo el evento click con la busqueda como hice antes, por eso debo silenciar el evento anterior que era para encontrar la ruta, ahora le doy click y le mando la funcion async de pintar imagenes, le pedire que espere hasta que las tenga todas cargadas, le mando query, que es lo que delimita la busqueda por el usuario, el valor del input.
busquedaBtn.addEventListener('click', async () => {
  const query = busquedaInput.value
  const imagenes = await obtenerImagenes(query)

  // pintaremos las imagenes si encuentra y sino query sera gato

  if (imagenes && imagenes.length > 0) {
    pintarImagenes(imagenes)
  } else {
    const obtenersinohay = await obtenerImagenes('robots')
    pintarImagenes(obtenersinohay)
    alert('No hay imagenes que cumplan con su busqueda, aqui tiene unos robots')
  }
})

// añadiremos el modo oscuro , selecciono boton e icona para enlazar evento

const modoOscuroBtn = document.getElementById('oscuro')
const modoOscuroIcon = document.getElementById('oscuroicon')

//iniciamos con el modo oscuro visible es decir sin brillo

// modoBrilloIcon.style.display = 'none'

modoOscuroBtn.addEventListener('click', () => {
  document.body.classList.toggle('modooscuro') // toggle activo o desactivo

  if (document.body.classList.contains('modooscuro')) {
    // si lo tengo en oscuro veo el sol
    document.body.style.backgroundColor = '#4f4d4d'
  } else {
    // si tenemos modo brillo veo la luna
    document.body.style.backgroundColor = '#f5f5f5'
  }
})
