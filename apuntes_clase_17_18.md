# Apuntes y Explicaciones de la Clase 17-18 (Frontend)

Este documento recopila todos los comentarios, deducciones y conceptos clave implementados durante la conexión del Frontend (React/TypeScript) con el Backend.

## 1. Custom Hook `useForm` (`src/hooks/useForm/useForm.tsx`)

**Objetivo:** Evitar crear múltiples estados (`useState`) para cada input de un formulario. Este hook centraliza todos los inputs en un solo estado maestro (`formState`).

### Conceptos Clave:
- **`interface useFormProps<T>`**: Obliga a que siempre se manden ÚNICAMENTE las 2 piezas del motor principales (`initialFormState` y `submitFn`). Pero gracias a la `<T>` (Genérico de TypeScript), lo que venga adentro del `initialFormState` puede ser infinito e ilimitado (correos, contraseñas, edades, nombres). TypeScript se adapta solo a la "forma" de tu formulario.

- **La coma en `<T,>`**: Obliga a React (JSX) a entender que es un genérico de TS y no una etiqueta HTML abierta por accidente.

- **`React.ChangeEvent<HTMLInputElement>`**: Especifica que el evento fue disparado por un usuario interactuando específicamente con una etiqueta HTML de tipo `<input>`.

- **Propiedades Computadas (`[field_name]: field_value`)**: Los corchetes permiten que la propiedad a modificar sea dinámica (ej: si `field_name` es "email", se actualizará la propiedad internamente llamándose "email"). Si no usamos corchetes, JS guardaría literalmente una propiedad llamada "field_name".

- **Flujo:** Javascript reconoce qué prop del parámetro va a cada lugar de la interface por el simple **nombre de la propiedad**. Se desestructura el objeto que nos envían por coincidencia de llaves.

## 2. Custom Hook `useRequest` (`src/hooks/useRequest/useRequest.tsx`)

**Objetivo:** Automatizar la gestión de los estados de una petición HTTP (Cargando, Éxito, Error) para evitar repetir bloques `try/catch` de carga en todos los componentes visuales.

### Conceptos Clave:
- **`requestCb: () => Promise<any>`**: La propiedad `requestCb` obliga a enviar estrictamente una función que retorne una Promesa (ej: una petición `fetch` asíncrona a internet).

- **Manejo de Estados Automático**:
  - Antes del `fetch`: Se limpian estados viejos (`setResponse(null)`, `setError(null)`) y se activa `setLoading(true)`.
  - Si hay éxito (`try`): Se almacena en `res` el retorno exitoso de `requestCb()` y se guarda en el estado general (`setResponse(res)`).
  - Si hay un fallo (`catch`): Se atrapa el fallo devuelto por el servidor y se guarda en el estado de error (`setError(err)`).
  - Pase lo que pase (`finally`): Se detiene la rueda de carga (`setLoading(false)`).

## 3. Servicios Base `authService.ts` (`src/services/authService.ts`)

**Objetivo:** En el Frontend, las llamadas al backend se realizan exclusivamente en la carpeta `services`. Ningún componente de React (pantallas) debe tener operaciones crudas de lectura/escritura a internet.

### Conceptos Clave:
- **`JSON.stringify({ email, password })`**: Hace uso del atajo de propiedades de JavaScript moderno (Shorthand Property). Decir `{ email, password }` es un atajo universal que equivale a enviar `{ email: email, password: password }`.

- **Responsabilidad**: Su único trabajo es apuntar a `http://localhost:8080/api/auth/...`, mandar los datos empaquetados como JSON, y retornar la respuesta convertida de vuelta a diccionario JS (`.json()`). 

- **Anotación Futura (TODO)**: Se debe extraer la URL quemada dura (`http://localhost...`) a un archivo de variables entorno (`.env`) e importarla allí.

## 4. Componentes Visuales (`Login.tsx` & `Register.tsx`)

**Objetivo:** Ensamblar los Hooks y Servicios creados en las etiquetas HTML que ve el usuario.

### Conceptos Clave:
- **`FORM_FIELDS` (Diccionario)**: Se utiliza un objeto con los strings exactos de los nombres de los inputs (`name`). Sirve para que en caso de querer modificar el nombre solamente cambiemos el string 'email' aquí arriba una sola vez, previniendo errores de tipeo.

- **Conectando `useForm`**:
  - `initialFormState`: Se nutre de los campos del diccionario e inicia todos los valores en vacío `''`.
  - `onChange={handleChangeInput}`: Al pasarlo en cada `<input>`, React escucha automáticamente cada tecla presionada sin requerir lógica extra en el componente.

- **Conectando `useRequest` & `authService`**:
  - Extraemos todo pidiendo a nuestro hook generador `const { sendRequest, error, response, loading } = useRequest()`.
  - En la función `onSubmit` (ej: `onLogin`), no procesamos fetchs ahí. Solamente envolvemos todo delegándoselo a `sendRequest({ requestCb: async () => await login({ ... }) })`.

- **Atributo `htmlFor`**: En el HTML (JSX), es el equivalente al viejo `for`. Vincula visual y estructuralmente un `<label>` con el `<input>` que tiene ese mismo `id`. Permite, entre otras cosas, dar foco automático a la caja con solo hacer click encima del texto.
