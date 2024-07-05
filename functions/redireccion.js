
export const Redireccionar = (boton, url) =>{

    boton.addEventListener('click', () => {
        window.location.href = url;
    });

}