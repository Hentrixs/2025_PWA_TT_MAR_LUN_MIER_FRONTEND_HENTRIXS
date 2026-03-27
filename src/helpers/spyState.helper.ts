

const spyState = ({ formState }: any) => {
    console.log('spystate working')
    const { name, email, password } = formState;

    if (!name || !email || !password) {
        console.log('Asegurate de rellenar todos los campos');
        // NOTA: aca estoy intentando hacer validacion del lado del cliente, 
        // pero no se como hacerla
        // aprendi a hacerlo desde el server pero desde aca no, 
        // despues debere aprender a hacerlo desde el ciente.
    }
    console.log(`REGISTRO DE ESTADO HOOK: ${name}, ${email}, ${password}`);
};
// esto anda, mas o menos, hay un retraso de una tecla, despues veo como se arregla
// igual esto es experimental y no tengo necesidad de hacerlo ahora

export default spyState;