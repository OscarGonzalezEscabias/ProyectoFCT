# TusViajes+

Integrantes:
- Oscar González Escabias
- Javier Segovia Martínez

## Índice

- [1. Introducción](#1-introducción)
  - [1.1 Resumen del proyecto](#11-resumen-del-proyecto)
  - [1.2 Descripción de la aplicación](#12-descripción-de-la-aplicación)
  - [1.3 Tecnologías utilizadas](#13-tecnologías-utilizadas)
- [2. Especificación de Requisitos](#2-especificación-de-requisitos)
  - [2.1 Requisitos funcionales](#21-requisitos-funcionales)
  - [2.2 Requisitos no funcionales](#22-requisitos-no-funcionales)
- [3. Diseño (diagramas)](#3-diseñodiagramas)
  - [3.1 Diagrama de entidad-relación](#31-diagrama-de-entidad-relación)
  - [3.2 Diagrama UML](#32-diagrama-uml)
- [4. Implementación](#4-implementación)
- [5. Manual del usuario](#5-manual-del-usuario)
- [6. Conclusiones](#6-conclusiones)
  - [6.1 Dificultades](#61-dificultades)
  - [6.2 Mejoras](#62-mejoras)

## 1. Introducción

### 1.1 Resumen del proyecto

TusViajes+ es una plataforma tipo **agencia de viajes** donde los usuarios podran planificar y organizar los viajes que deseen, pudiendo reservar instancias de hoteles, billestes de avión, reservar actividades organizadas por la agencia e incluso organizar un viaje completo con unos poco clicks.

### 1.2 Descripción de la aplicación

La app está dividida en varias partes principales, cada una con su propia funcionalidad:

- **Reservas de hoteles**: Los usuarios pueden buscar y reservar habitaciones. El admin tiene acceso total para ver, modificar y borrar cualquier cosa.
  
- **Reservas de vuelos**: Los usuarios pueden reservar sus vuelos directamente. El admin tiene acceso total para ver, modificar y borrar cualquier cosa.

- **Reservas de actividades**: Los usuarios pueden reservar actividades organizadas por la agencia. El admin tiene acceso total para ver, modificar y borrar cualquier cosa.

- **Reservas de viajes**: Los usuarios pueden reservar viajes completos, eligiendo vuelos de ida y vuelta, reserva en hotel y actividades de la agencia. El admin tiene acceso total para ver y borrar cualquier cosa.

- **Gestion de usuarios**: El admin tiene acceso total para ver, modificar y borrar cualquier cosa.

- **Gestion de reservas**: El admin tiene acceso total para ver, modificar y borrar cualquier reserva de hoteles, vuelos, actividades y viajes, tambien tiene acceso 

En resumen:
- El **usuario** puede hacer sus propias reservas.
- El **administrador** lo ve y controla todo.

### 1.3 Tecnologías utilizadas

Al principio empezamos el proyecto usando **React** para el frontend y **Spring Boot** como backend. Pero más adelante decidimos **rehacerlo todo con Next.js**, porque queríamos hacer algo diferente al resto y, además, **Next.js nos simplifica el desarrollo** al juntar frontend y backend en una misma tecnología. También influyó que en nuestras **prácticas de empresa estamos utilizando Next.js**, así que ya estamos familiarizados con él y nos sentimos cómodos trabajando así.

Las tecnologías que usamos actualmente son:

- **Frontend y Backend**: Next.js
- **Lenguaje principal**: TypeScript
- **Base de datos**: MySQL
- **Control de versiones**: GitHub

## 2. Especificación de Requisitos

### 2.1 Requisitos funcionales

A continuación se detallan las funciones principales que tiene la aplicación:

- **Inicio de sesión (login)**:
  - Nada más entrar en la aplicación, se muestra un formulario de login.
  - El inicio de sesión se hace mediante **JWT**.
  - Se comprueban las credenciales del usuario con los datos guardados en una base de datos **MySQL**.
  - Según el rol del usuario, se muestran diferentes funcionalidades.

- **Gestión de reservas**:
  - Hay tres tipos de reservas: **hoteles**, **vuelos** y **restaurantes**.
  - Cada tipo de usuario tiene distintos permisos:

    - **Usuario normal**:
      - Puede crear, ver, editar y eliminar **sus propias reservas**.
      - Esto aplica tanto a hoteles, como a vuelos y restaurantes.

    - **Recepcionista**:
      - Tiene acceso a **todas las reservas de todos los usuarios**.
      - Puede **verlas, modificarlas, eliminarlas y crear nuevas**.
      - Solo puede gestionar **reservas**, no usuarios.

    - **Administrador**:
      - Tiene acceso completo a la aplicación.
      - Puede hacer todo lo que hace el recepcionista.
      - Además, puede **gestionar los usuarios** del sistema (crear, eliminar, editar...).
      - Tiene una **visión más amplia** y control total.

- **Paneles diferenciados por rol**:
  - Cada tipo de usuario accede a un panel distinto, adaptado a sus permisos.

### 2.2 Requisitos no funcionales

Aunque no forman parte directa de las funciones visibles, también tenemos en cuenta lo siguiente:

- **Seguridad**:
  - El sistema usa JWT para mantener las sesiones seguras.
  - Solo los usuarios con credenciales válidas pueden acceder.
  
- **Organización por roles**:
  - El contenido se adapta automáticamente según el tipo de usuario que ha iniciado sesión.

- **Base de datos bien estructurada**:
  - Toda la información (usuarios, reservas, etc.) se guarda y gestiona desde una base de datos **MySQL**.

- **Accesibilidad y facilidad de uso**:
  - La interfaz está pensada para ser intuitiva y fácil de manejar para cualquier usuario.

- **Desempeño**:
  - Al estar hecho en Next.js, todo está optimizado para que la aplicación cargue rápido y tenga buen rendimiento.

## 3. Diseño(diagramas)

### 3.1 Diagrama de entidad-relación

![Diagrama de entidad-relación](/public/images/readme/DiagramaEntidadRelacion.png)

### 3.2 Diagrama UML

![Diagrama UML](/public/images/readme/DiagramaUML.png)

## 3.3 Diagrama de casos de uso
![Diagrama de casos de uso](/public/images/readme/DiagramaCasoUso.png)

## 3.4 Diagrama de secuencia
![Diagrama de secuencia](/public/images/readme/DiagramaSecuencia.png)

## 4. Implementacion

### 4.1 Endpoints

Hoteles (/api/hotels)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/hotels    | Listar todos los hoteles |
| GET    | api/hotels/${id}   | Lista un hotele |
| POST   | api/hotels/add    | Crear un hotel    |
| DEL    | api/hotels/del/${id} | Eliminar un hotel |
| GET | api/reservation | Listar las reservas de los hoteles      |
| POST   | api/reservation/add    | Crear una reserva de hotel    |
| GET | api/reservation/${id} | Listar una reserva de hotel especifica       |
| PUT | api/reservation/edit/${id} | Editar una reserva de hotel especifica       |
| DEL | api/reservation/del/${id} | Eliminar una reserva de hotel especifica       |


Vuelos (/api/flights)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/flights    | Listar todos los vuelos |
| GET    | api/flights/${id}    | Listar un vuelo especifico |
| POST   | api/flights/add    | Crear un vuelo    |
| DEL    | api/flights/del/${id} | Eliminar un vuelo |
| PUT    | api/flights/edit/${id} | Editar un vuelo |
| GET | api/flight-reservation | Listar las reservas de los vuelos      |
| GET | api/flight-reservation/${id} | Listar una reserva de vuelo especifica       |
| POST   | api/flight-reservation/add/${id} | Crear una reserva de vuelo     |
| PUT | api/flight-reservation/edit/${id} | Editar una reserva de vuelo especifica       |
| DEL | api/flight-reservation/del/${id} | Eliminar una reserva de vuelo especifica       |


Actividades (/api/activities)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/activities    | Listar todas las actividades |
| GET    | api/activities/${id}   | Listar una actividad especifico |
| POST   | api/activities/add    | Crear una actividad    |
| DEL    | api/activities/del/${id} | Eliminar una actividad |
| PUT    | api/activities/edit/${id} | Editar una actividad especifica |
| GET | api/activities-reservation | Listar las reservas de las actividades       |
| GET | api/activities-reservation/${id} | Listar una reserva de actividad especifica       |
| POST   | api/activities-reservation/add | Crear una reserva de actividad     |
| PUT | api/activities-reservation/edit/${id} | Editar una reserva de actividad especifica       |
| DEL | api/activities-reservation/del/${id} | Eliminar una reserva de actividad especifica       |

Aviones (/api/aircrafts)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/aircrafts    | Listar todos los aviones |
| GET    | api/aircrafts/${id}   | Listar un avion especifico |
| POST   | api/aircrafts/add    | Crear una avion    |
| DEL    | api/aircrafts/del/${id} | Eliminar un avion |
| PUT    | api/aircrafts/edit/${id} | Editar un avion especifica |

Aviones (/api/airlines)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/airlines    | Listar todas las aerolineas |
| GET    | api/airlines/${id}   | Listar una aerolinea especifica |
| POST   | api/airlines/add    | Crear una aerolinea    |
| DEL    | api/airlines/del/${id} | Eliminar una aerolinea |
| PUT    | api/airlines/edit/${id} | Editar una aerolineas especifica |

Aviones (/api/airports)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/airports    | Listar todos los aeropuertos |
| GET    | api/airports/${id}   | Listar un aeropuerto especifico |
| POST   | api/airports/add    | Crear un aeropuerto    |
| DEL    | api/airports/del/${id} | Eliminar un aeropuerto |
| PUT    | api/airports/edit/${id} | Editar un aeropuerto especifico |

Asientos (/api/flight_seats)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/flight_seats    | Listar todos los asientos |
| GET    | api/flight_seats/${id}   | Listar un asiento especifico |
| POST   | api/flight_seats/add    | Crear un asiento    |
| DEL    | api/flight_seats/del/${id} | Eliminar un asiento |
| PUT    | api/flight_seats/edit/${id} | Editar un asiento especifico |

Perfil (/api/profile)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/profile/${id}     | Listar un usuario especifico |
| GET    | api/profile/${id}/activities-reservation  | Listar las reservas de actividades de un usuario especifico |
| DEL   | api/profile/${id}/del   | Eliminar la cuenta de ese usuario por si mismo    |
| GET    | api/profile/${id}/flights-reservation | Listar las reservas de vuelos de un usuario especifico |
| GET    | api/profile/${id}/hotels-reservation| Listar las reservas de hoteles de un usuario especifico |
| GET    | api/profile/${id}/travels-reservation| Listar los viajes de un usuario especifico |

Habitaciones (/api/rooms)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/rooms    | Listar todas las habitaciones |
| GET    | api/rooms/${id}   | Listar una habitacion especifica |
| POST   | api/rooms/add    | Crear una habitacion    |
| DEL    | api/rooms/del/${id} | Eliminar una habitacion |
| PUT    | api/rooms/edit/${id} | Editar una habitacion especifica |
| GET    | api/rooms/hotel/${hotelId} | Listar las habitaciones de un hotel especifico |

Asientos (/api/travels)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/travels    | Listar todos los viajes |
| GET    | api/travels/${id}   | Listar un viaje especifico |
| POST   | api/travels/add    | Crear un viaje    |
| DEL    | api/travels/del/${id} | Eliminar un viaje |

Usuarios (/api/users)

| Método | Endpoint       | Descripción               |
|--------|----------------|---------------------------|
| GET    | api/users    | Listar todos los usuarios |
| GET    | api/users/${id}   | Listar un usuario especifico |
| POST   | api/users/add    | Crear un usuario    |
| DEL    | api/users/del/${id} | Eliminar un usuario |
| PUT    | api/users/edit/${id} | Editar un usuario especifico |

### 4.2 Tecnologias

- **Frontend y Backend**: Next.js
- **Lenguaje principal**: TypeScript
- **Base de datos**: MySQL
- **Control de versiones**: GitHub

### 4.3 Codigo

Ahora vamos a ver como hacer un viaje mirando un poco el codigo de la seccion de viajes.

Primero tenemos que crear las distintas interfaces que vamos a necesitar para el viaje.

```tsx
interface TravelFormValues {
    name: string;
    description: string;
    outboundFlightReservationId: number;
    returnFlightReservationId: number;
    hotelReservationId: number;
    activityReservationIds: number[];
    totalPrice: number;
}

interface Flight {
    id: number;
    flight_number: string;
    base_price: number;
    departure_time: string;
    arrival_time: string;
}

interface Hotel {
    id: number;
    namehotel: string;
}

interface Activity {
    id: number;
    name: string;
    types: "RENTING" | "RESERVATION";
    price: number;
}

interface FlightReservationData {
    seatId: number | null;
    total_price: number;
}

interface HotelReservationData {
    checkIn: string;
    checkOut: string;
    roomId: number;
    total_price: number;
}

interface ActivityReservationData {
    initialDate: string;
    finalDate?: string;
    total_price: number;
}
```

Ahora vamos a cargar todos los datos necesarios para hacer el formulario de viajes utilizando useEffect

```tsx
useEffect(() => {
        async function loadData() {
            const [flightsRes, hotelsRes, activitiesRes] = await Promise.all([
                axios.get("/api/flights"),
                axios.get("/api/hotels"),
                axios.get("/api/activities"),
            ]);

            function formatDateTime(dateStr: string): string {
                const date = new Date(dateStr);
                return date.toLocaleString("es-ES", {
                    dateStyle: "short",
                    timeStyle: "short",
                });
            }

            setFlights(flightsRes.data.map((flight: any) => ({
                ...flight,
                departure_time: formatDateTime(flight.departure_time),
                arrival_time: formatDateTime(flight.arrival_time),
            })));
            setHotels(hotelsRes.data);
            setActivities(activitiesRes.data);
        }
        loadData();
    }, [])
```




Ahora vamos a crear el return del formulario, el formulario lo vamos a hacer con una librearia llamada react-hook-form que sirve para gestionar los datos y validaciones del formulario. Utilizaremos FormProvider y useFormContext para gestionar los datos del formulario, FormProvider sirve para todos los componentes hijos accedan al estado y métodos del formulario y useFormContext sirve para acceder a los datos del formulario. El formulario va a estar dividido en pasos, el primer paso va ser seleccionar el nombre y la descripcion del viaje, el segundo paso y tercer paso va ser seleccionar los vuelos de ida y vuelta, el cuarto paso va ser seleccionar la reserva de hotel, el quinto paso va ser seleccionar las actividades y el sexto paso va ser un resumen del viaje con el precio total del viaje.

```tsx
return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="p-6 flex flex-col gap-6 w-1/2 mx-auto"
            >
                <h2 className="text-xl font-bold">Paso {step + 1} de 6</h2>

                {step === 0 && <StepInfo />}
                {step === 1 && (
                    <>
                        <StepFlight
                            direction="ida"
                            flights={flights}
                            selectedFlight={selectedOutboundFlight}
                            setSelectedFlight={setSelectedOutboundFlight}
                        />
                        {selectedOutboundFlight && (
                            <TravelFlightReservationForm
                                flight={selectedOutboundFlight}
                                data={outboundFlightReservation}
                                setData={setOutboundFlightReservation}
                                seats={outboundSeats}
                            />
                        )}
                    </>
                )}
                {step === 2 && (
                    <>
                        <StepFlight
                            direction="vuelta"
                            flights={flights}
                            selectedFlight={selectedReturnFlight}
                            setSelectedFlight={setSelectedReturnFlight}
                        />
                        {selectedReturnFlight && (
                            <TravelFlightReservationForm
                                flight={selectedReturnFlight}
                                data={returnFlightReservation}
                                setData={setReturnFlightReservation}
                                seats={returnSeats}
                            />
                        )}
                    </>
                )}

                {step === 3 && (
                    <>
                        <StepHotel hotels={hotels} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel} />
                        {selectedHotel && (
                            <TravelHotelReservationForm data={hotelReservation} setData={setHotelReservation} rooms={hotelRooms} />
                        )}
                    </>
                )}
                {step === 4 && (
                    <>
                        <StepActivities
                            activities={activities}
                            selectedActivities={selectedActivities}
                            setSelectedActivities={setSelectedActivities}
                        />
                        {selectedActivities.map((activity) => (
                            <TravelActivityReservationForm
                                key={activity.id}
                                activity={activity}
                                data={activitiesReservationData[activity.id]}
                                setData={(data) =>
                                    setActivitiesReservationData((prev) => ({
                                        ...prev,
                                        [activity.id]: data,
                                    }))
                                }
                            />
                        ))}
                    </>
                )}

                {step === 5 && (
                    <>
                        <StepSummary
                            selectedOutboundFlight={selectedOutboundFlight}
                            selectedReturnFlight={selectedReturnFlight}
                            outboundFlightReservation={outboundFlightReservation}
                            returnFlightReservation={returnFlightReservation}
                            selectedHotel={selectedHotel}
                            hotelReservation={hotelReservation}
                            hotelRooms={hotelRooms}
                            selectedActivities={selectedActivities}
                            activitiesReservationData={activitiesReservationData}
                            outboundSeats={outboundSeats}
                            returnSeats={returnSeats}
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">Finalizar viaje</button>
                    </>
                )}

                <div className="flex justify-between">
                    {step === 0 && (
                        <>
                        <button type="button" onClick={() => router.push("/home/travels")} className="bg-red-500 text-white p-2 rounded-lg cursor-pointer">
                            Cancelar
                        </button>

                        <button type="button" onClick={() => setStep((s) => s + 1)} className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">
                            Siguiente
                        </button>
                        </>
                    )}
                    {step > 0 && (
                        <button type="button" onClick={() => setStep((s) => s - 1)} className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">
                            Atrás
                        </button>
                    )}
                    {step < 5 && step > 0 && (
                        <button type="button" onClick={() => setStep((s) => s + 1)} className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">
                            Siguiente
                        </button>
                    )}

                </div>
            </form>
        </FormProvider>
    );
```

Ahora hacemos los useEffects que cargan los datos de los subformularios que se activan al por ejemplo elegir un vuelo u hotel.

```tsx
    useEffect(() => {
        async function fetchSeats() {
            if (selectedOutboundFlight) {
                const res = await axios.get(`/api/flights/${selectedOutboundFlight.id}/seats`);
                setOutboundSeats(res.data);
            }
        }
        fetchSeats();
    }, [selectedOutboundFlight]);

    useEffect(() => {
        async function fetchSeats() {
            if (selectedReturnFlight) {
                const res = await axios.get(`/api/flights/${selectedReturnFlight.id}/seats`);
                setReturnSeats(res.data);
            }
        }
        fetchSeats();
    }, [selectedReturnFlight]);

    useEffect(() => {
        async function fetchRooms() {
            if (selectedHotel) {
                const res = await axios.get(`/api/rooms/hotel/${selectedHotel.id}`);
                setHotelRooms(res.data);
            }
        }
        fetchRooms();
    }, [selectedHotel]);
```

Una vez hecho todo esto, con todos lo datos obtenidos le damos a enviar y utilizamos el onSubmmit, que envia los datos al backend y tras enviarlos redirige a la seccion de viajes con el metodo push de useRouter.

```tsx
const onSubmit = async (data: TravelFormValues) => {
        try {
          const payload = {
            userId: currentUser.id,
            name: data.name,
            description: data.description,
            hotelReservation, 
            outboundFlight: selectedOutboundFlight ? {
              flightId: selectedOutboundFlight.id,
              seatId: outboundFlightReservation.seatId,
              total_price: outboundFlightReservation.total_price,
            } : null,
            returnFlight: selectedReturnFlight ? {
              flightId: selectedReturnFlight.id,
              seatId: returnFlightReservation.seatId,
              total_price: returnFlightReservation.total_price,
            } : null,
            activitiesReservationData, 
            totalPrice: data.totalPrice,
          };          
      
          const response = await fetch("/api/travels/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      
          if (!response.ok) throw new Error("Error al crear el viaje");
      
          const result = await response.json();
          console.log("Viaje creado:", result.travelId);
      
          router.push("/home/travels");
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
          alert("No se pudo crear el viaje. Inténtalo de nuevo.");
        }
      };
```

Por ultimo se envia la peticion al backend y esta compara los datos con los de la base de datos y si todo esta correcto crea el viaje y los datos relacionados.

```tsx
import { NextResponse } from "next/server";
import db from "@/libs/mysql";

export async function POST(request: Request) {
    try {
        const {
            userId,
            name,
            description,
            hotelReservation,
            outboundFlight,
            returnFlight,
            activitiesReservationData,
            totalPrice,
        } = await request.json();

        const hotelResult: any = await db.query(
            `INSERT INTO reservation (user_id, room_id, check_in, check_out, total_price)
       VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                hotelReservation.roomId,
                hotelReservation.checkIn,
                hotelReservation.checkOut,
                hotelReservation.total_price,
            ]
        );
        const hotelReservationId = hotelResult.insertId;

        let outboundFlightReservationId: number | null = null;
        if (outboundFlight) {
            const outboundFlightResult: any = await db.query(
                `INSERT INTO flight_reservations (user_id, flight_id, seat_id, total_price)
         VALUES (?, ?, ?, ?)`,
                [
                    userId,
                    outboundFlight.flightId,
                    outboundFlight.seatId,
                    outboundFlight.total_price,
                ]
            );
            outboundFlightReservationId = outboundFlightResult.insertId;
        }

        let returnFlightReservationId: number | null = null;
        if (returnFlight) {
            const returnFlightResult: any = await db.query(
                `INSERT INTO flight_reservations (user_id, flight_id, seat_id, total_price)
         VALUES (?, ?, ?, ?)`,
                [
                    userId,
                    returnFlight.flightId,
                    returnFlight.seatId,
                    returnFlight.total_price,
                ]
            );
            returnFlightReservationId = returnFlightResult.insertId;
        }

        const travelResult: any = await db.query(
            `INSERT INTO travels (user_id, name, description, outbound_flight_reservation_id, return_flight_reservation_id, hotel_reservation_id, total_price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                name,
                description,
                outboundFlightReservationId,
                returnFlightReservationId,
                hotelReservationId,
                totalPrice,
            ]
        );
        const travelId = travelResult.insertId;

        for (const activityIdStr of Object.keys(activitiesReservationData)) {
            const activityData = activitiesReservationData[activityIdStr];
            const { initialDate, finalDate, total_price } = activityData;
          
            console.log("Procesando actividad:", activityIdStr, activityData);
            console.log("total_price:", total_price, "typeof:", typeof total_price);
          
            const activityIdNum = Number(activityIdStr); 
          
            if (typeof total_price !== 'number' || Number.isNaN(total_price)) {
              console.warn(`total_price inválido para actividad ${activityIdStr}, usando 0`);
            }
          
            const validTotalPrice = typeof total_price === "number" && !Number.isNaN(total_price) ? total_price : 0;
          
            const actResult: any = await db.query(
              `INSERT INTO activity_reservations (user_id, activity_id, total_price, initial_date, final_date)
               VALUES (?, ?, ?, ?, ?)`,
              [userId, activityIdNum, validTotalPrice, initialDate, finalDate || null]
            );
          
            const activityReservationId = actResult.insertId;
          
            await db.query(
              `INSERT INTO travel_activities (travel_id, activity_reservation_id)
               VALUES (?, ?)`,
              [travelId, activityReservationId]
            );
          }
          

        return NextResponse.json({ message: "Viaje creado exitosamente", travelId });

    } catch (error) {
        console.error("Error al crear el viaje:", error);
        return NextResponse.json({ error: "Error al crear el viaje" }, { status: 500 });
    }
}
```

### 4.4 Organizacion del proyecto

Utilizamos una estructura de carpetas utilizando NextRouter para la navegacion y NextAuth para la autenticacion por lo que tenemos tres principales ramas de carpetas a partir de app que son home, api y auth. En la carpeta home tenemos las secciones de la web, en la carpeta api tenemos las rutas de la api y en la carpeta auth tenemos las rutas de autenticacion. Tambien tenenmos una carpeta llamada components que contiene los componentes de la web y una carpeta llamada public que contiene las imagenes de la web.

![Organizacion del proyecto](/public/images/readme/EstructuraCarpetas.png)

![Organizacion del proyecto2](/public/images/readme/EstructuraCarpetas2.png)

Seguimos un patron de diseño Modular Monolith para la organizacion del proyecto porque, aunque toda la aplicación se despliega como una sola unidad, internamente está organizada en módulos bien definidos (como usuarios, hoteles, vuelos, actividades y viajes), cada uno con su propia lógica, componentes y modelos de datos. Esta separación clara por dominios funcionales permite mantener un código limpio, escalable y mantenible, conservando las ventajas de un monolito (sencillez de desarrollo y despliegue) mientras se facilita una posible evolución futura hacia microservicios si el proyecto lo requiere.

## 5. Manual del usuario

Para utilizar la web es necesario tener una cuenta y logearse, sino se tiene una cuenta se puede crear una en la seccion de registro. Una vez logeado dependiendo del rol que tenga el usuario podra acceder a diferentes secciones, en el caso de un usuario normal solo podra acceder a las secciones de hotel, vuelos, actividades, viajes y el perfil. En el caso del admin podra acceder a todas las secciones y ademas podra gestionar los usuarios y las reservas. En las secciones de hotel, vuelos y actividades se podra hacer reservas, en el caso de viajes se podra hacer una reserva completa, eligiendo vuelos de ida y vuelta, reserva en hotel y actividades de la agencia. En el perfil se podra ver y modificar la informacion del usuario.

## 6. Conclusiones

Este proyecto nos ha servido para aplicar lo que aprendimos tanto en clase como en las prácticas. Allí trabajamos bastante con TypeScript, Tailwind y componentes, y eso nos ayudó mucho a montar la parte visual y estructurar bien la app. Ha sido muy completo y nos ha permitido ver cómo encajan todas las piezas de un proyecto real.

### 6.1 Dificultades

Lo más complicado fue manejar el Next Router con tantas rutas, parámetros y funcionalidades. A veces era un lío saber cómo conectar bien todo. También fue difícil mantener el código organizado con tantos formularios y roles distintos.

### 6.2 Mejoras

 - Añadir un método de pago real.
 - Incluir un mapa que indique dónde está el hotel, el aeropuerto o la actividad.
 - Mejorar la experiencia del usuario con historial, valoraciones o notificaciones.