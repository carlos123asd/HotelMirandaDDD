import { GenerarCodigoEmpleado } from "../../../../contexts/administrativo/aplicacion/servicios-de-dominio/GenerarCodigoEmpleado";

describe("Generar Codigo Empleado", () => {
    it("deberia generar un codigo con la combinacion de su email y telefono", () => {
        const codigo = GenerarCodigoEmpleado("empleado@ejemplo.com", "123456789");
        expect(codigo).toBe("empleado6789");
    });
});