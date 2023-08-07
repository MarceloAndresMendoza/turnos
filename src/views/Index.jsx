import { Shifts } from '../components/Shifts'

export const Index = () => {
    // Ahora contamos de 1 a 10 en una variable y la ponemos en un array

    return (
        <>
            <h1 className='p-4 font-bold text-white bg-sky-700 fixed top-0 left-0 w-full'>PROTOTIPO: Editor de Turnos</h1>
            <div className="h-[60px]"></div>
            <h2 className='m-4'>Vista del administrador</h2>
            <Shifts />


        </>
    )
}
