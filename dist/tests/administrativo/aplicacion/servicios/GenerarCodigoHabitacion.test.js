"use strict";
describe("Generar Codigo de Habitacion", () => {
    it("Genera un codigo de habitacion basado en el piso", () => {
        const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //10 habitaciones por piso
        const piso = "4";
        const numeroHabitaciones = 30;
        const cadenaPiso = (numero) => {
            return numero.padStart(2, '0');
        };
        const codigo = cadenaPiso(piso) + letras[numeroHabitaciones % letras.length];
        expect(codigo).toBe("04A");
    });
});
